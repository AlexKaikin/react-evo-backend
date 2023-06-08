import { Router } from 'express'
import { AdminOrderController } from '../../controllers/index.js'
import { orderCreateValidation } from '../../validations/validations.js'
import checkAuth from '../../utils/checkAuth.js'

const orderRouterAdmin = Router()

orderRouterAdmin.get('/api/admin/orders', checkAuth, AdminOrderController.getAll)
orderRouterAdmin.get('/api/admin/orders/:id', checkAuth, AdminOrderController.getOne)
orderRouterAdmin.post(
  '/api/admin/orders',
  checkAuth,
  orderCreateValidation,
  AdminOrderController.create
)
orderRouterAdmin.delete('/api/admin/orders/:id', checkAuth, AdminOrderController.remove)
orderRouterAdmin.patch(
  '/api/admin/orders/:id',
  checkAuth,
  orderCreateValidation,
  AdminOrderController.update
)

export default orderRouterAdmin
