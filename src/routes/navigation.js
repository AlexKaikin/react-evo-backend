import { Router } from 'express'
import { NavigationController } from '../controllers/index.js'

const navigationRouter = Router()

navigationRouter.get('/api/navigation', NavigationController.get)
navigationRouter.post('/api/navigation', NavigationController.create)
navigationRouter.get('/api/navigation/:id', NavigationController.getOne)
navigationRouter.patch('/api/navigation/:id', NavigationController.update)
export default navigationRouter
