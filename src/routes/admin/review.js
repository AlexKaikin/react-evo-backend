import { Router } from 'express'
import { AdminReviewController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { reviewCreateValidation } from '../../validations/validations.js'

const reviewRouterAdmin = Router()

reviewRouterAdmin.get('/api/admin/reviews', AdminReviewController.getAll)
reviewRouterAdmin.get(
  '/api/admin/products/:id/reviews',
  AdminReviewController.getAllProduct
)
reviewRouterAdmin.get('/api/admin/reviews/:id', AdminReviewController.getOne)
reviewRouterAdmin.post(
  '/api/admin/reviews',
  checkAuth,
  reviewCreateValidation,
  AdminReviewController.create
)
reviewRouterAdmin.delete(
  '/api/admin/reviews/:id',
  checkAuth,
  AdminReviewController.remove
)
reviewRouterAdmin.patch(
  '/api/admin/reviews/:id',
  checkAuth,
  reviewCreateValidation,
  AdminReviewController.update
)

export default reviewRouterAdmin
