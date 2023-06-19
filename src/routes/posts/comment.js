import { Router } from 'express'
import { CommentController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { commentCreateValidation } from '../../validations/validations.js'

const commentRouter = Router()

commentRouter.get('/api/profile/comments', checkAuth, CommentController.getAll)
commentRouter.get('/api/posts/:id/comments', CommentController.getAllPost)
commentRouter.get('/api/comments/:id', CommentController.getOne)
commentRouter.post(
  '/api/comments',
  checkAuth,
  commentCreateValidation,
  CommentController.create
)
commentRouter.delete('/api/comments/:id', checkAuth, CommentController.remove)
commentRouter.patch(
  '/api/comments/:id',
  checkAuth,
  commentCreateValidation,
  CommentController.update
)

export default commentRouter
