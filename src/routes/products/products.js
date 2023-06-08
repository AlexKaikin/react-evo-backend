import { Router } from 'express'
import { ProductController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { productCreateValidation } from '../../validations/validations.js'

const productRouter = Router()

productRouter.get('/api/products', ProductController.getAll)
productRouter.get('/api/products/:id', ProductController.getOne)
productRouter.post(
  '/api/products',
  checkAuth,
  productCreateValidation,
  ProductController.create
)
productRouter.delete('/api/products/:id', checkAuth, ProductController.remove)
productRouter.patch(
  '/api/products/:id',
  checkAuth,
  productCreateValidation,
  ProductController.update
)

export default productRouter
