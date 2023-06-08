import { Router } from 'express'
import { AdminPostController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { postCreateValidation } from '../../validations/validations.js'

const postRouterAdmin = Router()

postRouterAdmin.get('/api/admin/posts', AdminPostController.getAll)
postRouterAdmin.get('/api/admin/posts/:id', AdminPostController.getOne)
postRouterAdmin.post(
  '/api/admin/posts',
  checkAuth,
  postCreateValidation,
  AdminPostController.create
)
postRouterAdmin.delete('/api/admin/posts/:id', checkAuth, AdminPostController.remove)
postRouterAdmin.patch(
  '/api/admin/posts/:id',
  checkAuth,
  postCreateValidation,
  AdminPostController.update
)

export default postRouterAdmin
