import { Router } from 'express'
import { NoteController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { noteCreateValidation } from '../../validations/validations.js'

const noteRouter = Router()

noteRouter.get('/notes', checkAuth, NoteController.getAll)
noteRouter.get('/notes/:id', checkAuth, NoteController.getOne)
noteRouter.post(
  '/notes',
  checkAuth,
  noteCreateValidation,
  NoteController.create
)
noteRouter.delete('/notes/:id', checkAuth, NoteController.remove)
noteRouter.patch(
  '/notes/:id',
  checkAuth,
  noteCreateValidation,
  NoteController.update
)

export default noteRouter
