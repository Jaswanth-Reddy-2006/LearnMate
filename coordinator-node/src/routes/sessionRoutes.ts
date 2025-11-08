import { Router } from 'express'
import { createSession } from '../utils/sessionStore'

const router = Router()

router.post('/session', (req, res) => {
  const { topic = 'Python Loop Fundamentals' } = req.body || {}
  const session = createSession(topic)
  res.json(session)
})

export default router
