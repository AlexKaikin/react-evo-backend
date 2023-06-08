import { Router } from 'express'
import { PostController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { postCreateValidation } from '../../validations/validations.js'

const postRouter = Router()

postRouter.get('/api/posts', PostController.getAll)
postRouter.get('/api/posts/:id', PostController.getOne)
postRouter.post(
  '/api/posts',
  checkAuth,
  postCreateValidation,
  PostController.create
)
postRouter.delete('/api/posts/:id', checkAuth, PostController.remove)
postRouter.patch(
  '/api/posts/:id',
  checkAuth,
  postCreateValidation,
  PostController.update
)

export default postRouter
