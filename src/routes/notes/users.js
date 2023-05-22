import { Router } from 'express'
import { UsersController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'

const userRouter = Router()

userRouter.get('/users', checkAuth, UsersController.getAll)
userRouter.get('/users/:id', checkAuth, UsersController.getOne)

export default userRouter
