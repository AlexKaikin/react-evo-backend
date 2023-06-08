import { Router } from 'express'
import { GroupController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { groupCreateValidation } from '../../validations/validations.js'

const groupRouter = Router()

groupRouter.get('/api/groups/', checkAuth, GroupController.getAll)
groupRouter.get('/api/groups/:id', checkAuth, GroupController.getOne)
groupRouter.post(
  '/api/groups',
  checkAuth,
  groupCreateValidation,
  GroupController.create
)
groupRouter.delete('/api/groups/:id', checkAuth, GroupController.remove)
groupRouter.patch(
  '/api/groups/:id',
  checkAuth,
  groupCreateValidation,
  GroupController.update
)
groupRouter.patch('/api/groups/follow/:_id', checkAuth, GroupController.followGroup)
groupRouter.patch(
  '/api/groups/unfollow/:_id',
  checkAuth,
  GroupController.unFollowGroup
)


export default groupRouter
