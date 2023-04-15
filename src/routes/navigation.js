import { Router } from 'express'
import { NavigationController } from '../controllers/index.js'

const navigationRouter = Router()

navigationRouter.get('/navigation', NavigationController.get)
navigationRouter.post('/navigation', NavigationController.create)
navigationRouter.get('/navigation/:id', NavigationController.getOne)
navigationRouter.patch('/navigation/:id', NavigationController.update)
export default navigationRouter
