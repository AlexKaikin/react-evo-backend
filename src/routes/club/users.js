import { Router } from 'express'
import { UsersController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'

const userRouter = Router()

userRouter.get('/api/users', checkAuth, UsersController.getAll)
userRouter.get('/api/users/:id', checkAuth, UsersController.getOne)
userRouter.patch('/api/users/follow/:_id', checkAuth, UsersController.followUser)
userRouter.patch('/api/users/unfollow/:_id', checkAuth, UsersController.unFollowUser)

export default userRouter
