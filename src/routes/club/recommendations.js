import { Router } from 'express'
import { RecommendationController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'

const recommendationRouter = Router()

recommendationRouter.get(
  '/api/recommendations/',
  checkAuth,
  RecommendationController.getAll
)

export default recommendationRouter
