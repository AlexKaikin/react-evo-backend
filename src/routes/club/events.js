import { Router } from 'express'
import { EventController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'

const eventRouter = Router()

eventRouter.get('/api/events/', checkAuth, EventController.getAll)
eventRouter.get('/api/events/:noteId', checkAuth, EventController.getOne)

export default eventRouter
