import { Router } from 'express'
import { RoomController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'

const roomRouter = Router()

roomRouter.get('/api/rooms/', checkAuth, RoomController.getAll)
roomRouter.get(
  '/api/rooms/search',
  checkAuth,
  RoomController.searchUser
)
roomRouter.get('/api/rooms/:user_id', checkAuth, RoomController.getOne)
roomRouter.post('/api/rooms', checkAuth, RoomController.create)
roomRouter.delete('/api/rooms/:id', checkAuth, RoomController.remove)

export default roomRouter
