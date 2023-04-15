import { Router } from 'express'
import { AdminPostController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { postCreateValidation } from '../../validations/validations.js'

const postRouterAdmin = Router()

postRouterAdmin.get('/admin/posts', AdminPostController.getAll)
postRouterAdmin.get('/admin/posts/:id', AdminPostController.getOne)
postRouterAdmin.post(
  '/admin/posts',
  checkAuth,
  postCreateValidation,
  AdminPostController.create
)
postRouterAdmin.delete('/admin/posts/:id', checkAuth, AdminPostController.remove)
postRouterAdmin.patch(
  '/admin/posts/:id',
  checkAuth,
  postCreateValidation,
  AdminPostController.update
)

export default postRouterAdmin
