import { Router } from 'express'
import { UserController } from '../controllers/index.js'
import { checkAuth, handleValidationErrors } from '../utils/index.js'
import { loginValidation, registerValidation } from '../validations/validations.js'

const authRouter = Router()

authRouter.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  UserController.register
)
authRouter.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
)
authRouter.get('/auth/me', checkAuth, UserController.getMe)

export default authRouter