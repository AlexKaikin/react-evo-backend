import { Router } from 'express'
import { NoteController } from '../../controllers/index.js'
import checkAuth from '../../utils/checkAuth.js'
import { noteCreateValidation } from '../../validations/validations.js'

const noteRouter = Router()

noteRouter.get('/api/notes/:userId', checkAuth, NoteController.getAll)
noteRouter.get('/api/notes/:userId/:noteId', checkAuth, NoteController.getOne)
noteRouter.post(
  '/api/notes',
  checkAuth,
  noteCreateValidation,
  NoteController.create
)
noteRouter.delete('/api/notes/:noteId', checkAuth, NoteController.remove)
noteRouter.patch(
  '/api/notes/:noteId',
  checkAuth,
  noteCreateValidation,
  NoteController.update
)

export default noteRouter
