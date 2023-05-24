import { Router } from 'express'
import { NoteController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { noteCreateValidation } from '../../validations/validations.js'

const noteRouter = Router()

noteRouter.get('/notes/:userId', checkAuth, NoteController.getAll)
noteRouter.get('/notes/:userId/:noteId', checkAuth, NoteController.getOne)
noteRouter.post(
  '/notes',
  checkAuth,
  noteCreateValidation,
  NoteController.create
)
noteRouter.delete('/notes/:noteId', checkAuth, NoteController.remove)
noteRouter.patch(
  '/notes/:noteId',
  checkAuth,
  noteCreateValidation,
  NoteController.update
)

export default noteRouter
