import { Router } from 'express'
import { PostController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { postCreateValidation } from '../../validations/validations.js'

const postRouter = Router()

postRouter.get('/posts', PostController.getAll)
postRouter.get('/posts/:id', PostController.getOne)
postRouter.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  PostController.create
)
postRouter.delete('/posts/:id', checkAuth, PostController.remove)
postRouter.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  PostController.update
)

export default postRouter
