import { Router } from 'express'
import { AdminCommentController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { commentCreateValidation } from '../../validations/validations.js'

const commentRouterAdmin = Router()

commentRouterAdmin.get('/api/admin/comments', AdminCommentController.getAll)
commentRouterAdmin.get(
  '/api/admin/posts/:id/comments',
  AdminCommentController.getAllPost
)
commentRouterAdmin.get('/api/admin/comments/:id', AdminCommentController.getOne)
commentRouterAdmin.post(
  '/api/admin/comments',
  checkAuth,
  commentCreateValidation,
  AdminCommentController.create
)
commentRouterAdmin.delete(
  '/api/admin/comments/:id',
  checkAuth,
  AdminCommentController.remove
)
commentRouterAdmin.patch(
  '/api/admin/comments/:id',
  checkAuth,
  commentCreateValidation,
  AdminCommentController.update
)

export default commentRouterAdmin
