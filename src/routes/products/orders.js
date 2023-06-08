import { Router } from 'express'
import { OrderController } from '../../controllers/index.js'
import { orderCreateValidation } from '../../validations/validations.js'
import checkAuth from '../../utils/checkAuth.js'

const orderRouter = Router()

orderRouter.get('/api/orders/:id', checkAuth, OrderController.getOne)
orderRouter.get('/api/orders', checkAuth, OrderController.getAll)
orderRouter.post('/api/orders', checkAuth, orderCreateValidation, OrderController.create)
orderRouter.delete('/api/orders/:id', checkAuth, OrderController.remove)
orderRouter.patch(
  '/api/orders/:id',
  checkAuth,
  orderCreateValidation,
  OrderController.update
)

export default orderRouter
