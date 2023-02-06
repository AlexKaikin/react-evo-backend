import { Router } from 'express'
import { AdminProductController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { productCreateValidation } from '../../validations/validations.js'

const productRouterAdmin = Router()

productRouterAdmin.get('/admin/products', AdminProductController.getAll)
productRouterAdmin.get('/admin/products/:id', AdminProductController.getOne)
productRouterAdmin.post(
  '/admin/products',
  checkAuth,
  productCreateValidation,
  AdminProductController.create
)
productRouterAdmin.delete(
  '/admin/products/:id',
  checkAuth,
  AdminProductController.remove
)
productRouterAdmin.patch(
  '/admin/products/:id',
  checkAuth,
  productCreateValidation,
  AdminProductController.update
)

export default productRouterAdmin
