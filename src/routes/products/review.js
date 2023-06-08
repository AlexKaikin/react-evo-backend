import { Router } from 'express'
import { ReviewController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { reviewCreateValidation } from '../../validations/validations.js'

const reviewRouter = Router()

reviewRouter.get('/api/profile/reviews', checkAuth, ReviewController.getAll)
reviewRouter.get('/api/products/:id/reviews', ReviewController.getAllProduct)
reviewRouter.get('/api/reviews/:id', ReviewController.getOne)
reviewRouter.post(
  '/api/reviews',
  checkAuth,
  reviewCreateValidation,
  ReviewController.create
)
reviewRouter.delete('/api/reviews/:id', checkAuth, ReviewController.remove)
reviewRouter.patch(
  '/api/reviews/:id',
  checkAuth,
  reviewCreateValidation,
  ReviewController.update
)

export default reviewRouter
