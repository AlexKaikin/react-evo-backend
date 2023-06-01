import { Router } from 'express'
import { UsersController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'

const userRouter = Router()

userRouter.get('/users', checkAuth, UsersController.getAll)
userRouter.get('/users/:id', checkAuth, UsersController.getOne)
userRouter.patch('/users/follow/:_id', checkAuth, UsersController.followUser)
userRouter.patch('/users/unfollow/:_id', checkAuth, UsersController.unFollowUser)

export default userRouter
