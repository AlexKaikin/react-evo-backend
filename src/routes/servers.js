import { Router } from 'express'

const serverRouter = Router()

serverRouter.get('/', (req, res) => res.send('Server working'))

export default serverRouter
