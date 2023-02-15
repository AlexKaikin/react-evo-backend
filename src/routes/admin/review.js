import { Router } from 'express'
import { AdminReviewController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { reviewCreateValidation } from '../../validations/validations.js'

const reviewRouterAdmin = Router()

reviewRouterAdmin.get('/admin/reviews', AdminReviewController.getAll)
reviewRouterAdmin.get(
  '/admin/products/:id/reviews',
  AdminReviewController.getAllProduct
)
reviewRouterAdmin.get('/admin/reviews/:id', AdminReviewController.getOne)
reviewRouterAdmin.post(
  '/admin/reviews',
  checkAuth,
  reviewCreateValidation,
  AdminReviewController.create
)
reviewRouterAdmin.delete(
  '/admin/reviews/:id',
  checkAuth,
  AdminReviewController.remove
)
reviewRouterAdmin.patch(
  '/admin/reviews/:id',
  checkAuth,
  reviewCreateValidation,
  AdminReviewController.update
)

export default reviewRouterAdmin
