import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import fs from 'fs'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()
import { checkAuth } from './utils/index.js'
//import { getFileStream, s3Storage } from './s3Storage.js'
import serverRouter from './routes/servers.js'
import {
  productRouter,
  reviewRouter,
  orderRouter,
} from './routes/products/index.js'
import postRouter from './routes/posts/posts.js'
import authRouter from './routes/auth.js'
import navigationRouter from './routes/navigation.js'
import orderRouterAdmin from './routes/admin/orders.js'
import productRouterAdmin from './routes/admin/products.js'
import reviewRouterAdmin from './routes/admin/review.js'
import postRouterAdmin from './routes/admin/posts.js'
import noteRouter from './routes/club/notes.js'
import userRouter from './routes/club/users.js'
import groupRouter from './routes/club/groups.js'
import http from 'http'
import { Server } from 'socket.io'
import messageRouter from './routes/club/messages.js'
import roomRouter from './routes/club/rooms.js'



mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected successfully'))
  .catch((err) => console.log('DB error', err))

export const app = express()
const server = http.Server(app)
const socketIO = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL },
})

socketIO.on('connection', (socket) => {
  socket.on('message', (data) => {
    socketIO.emit(data.roomID, data)
  })
})

app.use(cors())
app.use(express.json()) // чтение json данных
app.set('json spaces', 2)

// local storage
const storage = multer.diskStorage({ // создание хранилища изображений
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {// путь сохранения изображений
      fs.mkdirSync('uploads')
    }
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname) // имя сохранённого файла
  },
})
// /local storage

// AWS storage
// const storage = multer.memoryStorage()

// app.get('/uploads/:key', (req, res) => {
//   const readStream = getFileStream(req.url)
//   res.append('Content-Type', 'image/jpeg')
//   return readStream.pipe(res)
// })
// /AWS storage

const upload = multer({ storage }) // соединяем хранилище с multer
app.post('/api/upload', checkAuth, upload.single('image'), async (req, res) => {
  //const result = await s3Storage(req.file) // S3 storage
  return res.json({ url: `/uploads/${req.file.originalname}` }) //, result
})

app.use('/uploads', express.static('uploads')) // по запросу на адрес проверить есть ли файл

server.listen(process.env.PORT || 4444, (err) => {
  if (err) console.warn(err)
  console.log('Server started...')
})

app.use(serverRouter)

app.use(productRouter)
app.use(reviewRouter)
app.use(orderRouter)

app.use(postRouter)

app.use(userRouter)
app.use(noteRouter)
app.use(groupRouter)
app.use(messageRouter)
app.use(roomRouter)

app.use(authRouter)

app.use(navigationRouter)

app.use(productRouterAdmin)
app.use(reviewRouterAdmin)
app.use(orderRouterAdmin)
app.use(postRouterAdmin)
