import { Router } from 'express'
import { ReviewController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { reviewCreateValidation } from '../../validations/validations.js'

const reviewRouter = Router()

reviewRouter.get('/profile/reviews', ReviewController.getAll)
reviewRouter.get('/products/:id/reviews', ReviewController.getAllProduct)
reviewRouter.get('/reviews/:id', ReviewController.getOne)
reviewRouter.post(
  '/reviews',
  checkAuth,
  reviewCreateValidation,
  ReviewController.create
)
reviewRouter.delete('/reviews/:id', checkAuth, ReviewController.remove)
reviewRouter.patch(
  '/reviews/:id',
  checkAuth,
  reviewCreateValidation,
  ReviewController.update
)

export default reviewRouter
