import { Router } from 'express'

const serverRouter = Router()

serverRouter.get('/api', (req, res) => res.send('Server working'))

export default serverRouter
