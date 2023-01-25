import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
  productCreateValidation,
} from './validations/validations.js'
import { handleValidationErrors, checkAuth } from './utils/index.js'
import {
  UserController,
  PostController,
  ProductController,
  NavigationController,
} from './controllers/index.js'

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected successfully'))
  .catch((err) => console.log('DB error', err))

const app = express()

const storage = multer.diskStorage({ // создание хранилища изображений
  destination: (_, __, cb) => { // путь сохранения изображений
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => { // имя сохранённого файла
    cb(null, file.originalname)
  },
})
const upload = multer({ storage }) // соединяем хранилище с multer
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {//@ts-ignore
  res.json({ url: `/uploads/${req.file.originalname}` })
})

app.use('/uploads', express.static('uploads')) // по запросу на адрес проверить есть ли файл
app.use(express.json()) // чтение json данных
app.use(cors())
app.set('json spaces', 2)

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
