import { Router } from 'express'
import { NavigationController } from '../controllers/index.js'

const navigationRouter = Router()

navigationRouter.get('/navigation', NavigationController.get)
navigationRouter.post('/navigation', NavigationController.create)

export default navigationRouter