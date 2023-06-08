import { Router } from 'express'
import { UserController } from '../controllers/index.js'
import { checkAuth, handleValidationErrors } from '../utils/index.js'
import { loginValidation, registerValidation } from '../validations/validations.js'

const authRouter = Router()

authRouter.post(
  '/api/auth/register',
  registerValidation,
  handleValidationErrors,
  UserController.register
)
authRouter.post(
  '/api/auth/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
)
authRouter.get('/api/auth/me', checkAuth, UserController.getMe)
authRouter.patch('/api/auth/user/update', checkAuth, UserController.update)
authRouter.delete('/api/auth/user/delete', checkAuth, UserController.remove)

export default authRouter