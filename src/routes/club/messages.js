import { Router } from 'express'
import { MessageController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'

const messageRouter = Router()

messageRouter.get('/api/messages/:userId', checkAuth, MessageController.getAll)
messageRouter.post(
  '/api/messages',
  checkAuth,
  MessageController.create
)
messageRouter.delete('/api/messages/:id', checkAuth, MessageController.remove)

export default messageRouter
