import { Router } from 'express'
import { AdminOrderController } from '../../controllers/index.js'
import { orderCreateValidation } from '../../validations/validations.js'
import checkAuth from '../../utils/checkAuth.js'

const orderRouterAdmin = Router()

orderRouterAdmin.get('/admin/orders', checkAuth, AdminOrderController.getAll)
orderRouterAdmin.get('/admin/orders/:id', checkAuth, AdminOrderController.getOne)
orderRouterAdmin.post(
  '/admin/orders',
  checkAuth,
  orderCreateValidation,
  AdminOrderController.create
)
orderRouterAdmin.delete('/admin/orders/:id', checkAuth, AdminOrderController.remove)
orderRouterAdmin.patch(
  '/admin/orders/:id',
  checkAuth,
  orderCreateValidation,
  AdminOrderController.update
)

export default orderRouterAdmin
