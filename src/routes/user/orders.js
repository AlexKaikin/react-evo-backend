import { Router } from 'express'
import { OrderController } from '../../controllers/index.js'
import { orderCreateValidation } from '../../validations/validations.js'
import checkAuth from '../../utils/checkAuth.js'

const orderRouter = Router()

orderRouter.get('/orders', checkAuth, OrderController.getAll)
orderRouter.get('/orders/:id', checkAuth, OrderController.getOne)
orderRouter.post('/orders', checkAuth, orderCreateValidation, OrderController.create)
orderRouter.delete('/orders/:id', checkAuth, OrderController.remove)
orderRouter.patch(
  '/orders/:id',
  checkAuth,
  orderCreateValidation,
  OrderController.update
)

export default orderRouter
