import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import fs from 'fs'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
  productCreateValidation,
  orderCreateValidation,
} from './validations/validations.js'
import { handleValidationErrors, checkAuth } from './utils/index.js'
import {
  UserController,
  PostController,
  ProductController,
  NavigationController,
  OrderController,
} from './controllers/index.js'
import { getFileStream, s3Storage } from './s3Storage.js'

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected successfully'))
  .catch((err) => console.log('DB error', err))

const app = express()
app.use(cors())
app.use(express.json()) // чтение json данных
app.set('json spaces', 2)

// local storage
// const storage = multer.diskStorage({ // создание хранилища изображений
//   destination: (_, __, cb) => {
//     if (!fs.existsSync('uploads')) {// путь сохранения изображений
//       fs.mkdirSync('uploads')
//     }
//     cb(null, 'uploads')
//   },
//   filename: (_, file, cb) => {
//     cb(null, file.originalname) // имя сохранённого файла
//   },
// })

// AWS storage
const storage = multer.memoryStorage()

app.get('/uploads/:key', (req, res) => {
  const readStream = getFileStream(req.url)
  res.append("Content-Type", "image/jpeg")
  return readStream.pipe(res)

})
// /AWS storage

const upload = multer({ storage }) // соединяем хранилище с multer
app.post('/upload', checkAuth, upload.single('image'), async (req, res) => {
  //@ts-ignore
  const result = await s3Storage(req.file) // S3 storage
  return res.json({ url: `/uploads/${req.file.originalname}`, result })
})

app.use('/uploads', express.static('uploads')) // по запросу на адрес проверить есть ли файл

app.listen(process.env.PORT || 4444, (err) => {
  if (err) console.log(err)
  console.log('Server started...')
})

app.get('/', (req, res) => {
  res.send('Server working')
})

app.get('/navigation', NavigationController.get)
app.post('/navigation', NavigationController.create)

app.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  UserController.register
)
app.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', checkAuth, postCreateValidation, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update)

app.get('/products', ProductController.getAll)
app.get('/products/:id', ProductController.getOne)
app.post(
  '/products',
  checkAuth,
  productCreateValidation,
  ProductController.create
)
app.delete('/products/:id', checkAuth, ProductController.remove)
app.patch(
  '/products/:id',
  checkAuth,
  productCreateValidation,
  ProductController.update
)

app.get('/orders', checkAuth, OrderController.getAll)
app.get('/orders/:id', checkAuth, OrderController.getOne)
app.post(
  '/orders',
  checkAuth,
  orderCreateValidation,
  OrderController.create
)
app.delete('/orders/:id', checkAuth, OrderController.remove)
app.patch(
  '/orders/:id',
  checkAuth,
  orderCreateValidation,
  OrderController.update
)
