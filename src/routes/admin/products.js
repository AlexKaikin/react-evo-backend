import { Router } from 'express'
import { AdminProductController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { productCreateValidation } from '../../validations/validations.js'

const productRouterAdmin = Router()

productRouterAdmin.get('/api/admin/products', AdminProductController.getAll)
productRouterAdmin.get('/api/admin/products/:id', AdminProductController.getOne)
productRouterAdmin.post(
  '/api/admin/products',
  checkAuth,
  productCreateValidation,
  AdminProductController.create
)
productRouterAdmin.delete(
  '/api/admin/products/:id',
  checkAuth,
  AdminProductController.remove
)
productRouterAdmin.patch(
  '/api/admin/products/:id',
  checkAuth,
  productCreateValidation,
  AdminProductController.update
)

export default productRouterAdmin
