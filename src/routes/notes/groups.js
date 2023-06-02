import { Router } from 'express'
import { GroupController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { groupCreateValidation } from '../../validations/validations.js'

const groupRouter = Router()

groupRouter.get('/groups/', checkAuth, GroupController.getAll)
groupRouter.get('/groups/:id', checkAuth, GroupController.getOne)
groupRouter.post(
  '/groups',
  checkAuth,
  groupCreateValidation,
  GroupController.create
)
groupRouter.delete('/groups/:id', checkAuth, GroupController.remove)
groupRouter.patch(
  '/groups/:id',
  checkAuth,
  groupCreateValidation,
  GroupController.update
)
groupRouter.patch('/groups/follow/:_id', checkAuth, GroupController.followGroup)
groupRouter.patch(
  '/groups/unfollow/:_id',
  checkAuth,
  GroupController.unFollowGroup
)


export default groupRouter
