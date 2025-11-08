import { Router } from 'express'
import { z } from 'zod'
import { generateCodeFeedback } from '../agents/coachAgent'

const router = Router()

const messageSchema = z.object({
  sessionId: z.string(),
  turnId: z.number(),
  from: z.string(),
  to: z.array(z.string()),
  type: z.string(),
  payload: z.record(z.string(), z.unknown()),
})

router.post('/message', (req, res) => {
  const parse = messageSchema.safeParse(req.body)
  if (!parse.success) {
    res.status(400).json(parse.error)
    return
  }
  const { type, payload } = parse.data
  if (type === 'code_feedback') {
    const code = String(payload.code ?? '')
    const feedback = generateCodeFeedback(code)
    res.json({ agent: 'TeachingAgent', feedback })
    return
  }
  res.json({ agent: 'Coordinator', feedback: 'Message routed, no action taken.' })
})

export default router
