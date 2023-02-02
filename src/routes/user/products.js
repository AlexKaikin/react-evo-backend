import { Router } from 'express'
import { ProductController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { productCreateValidation } from '../../validations/validations.js'

const productRouter = Router()

productRouter.get('/products', ProductController.getAll)
productRouter.get('/products/:id', ProductController.getOne)
productRouter.post(
  '/products',
  checkAuth,
  productCreateValidation,
  ProductController.create
)
productRouter.delete('/products/:id', checkAuth, ProductController.remove)
productRouter.patch(
  '/products/:id',
  checkAuth,
  productCreateValidation,
  ProductController.update
)

export default productRouter
