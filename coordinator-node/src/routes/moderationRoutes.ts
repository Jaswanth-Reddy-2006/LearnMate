import { Router } from 'express'
import { moderationQueue } from '../data/moderation'

const router = Router()

router.get('/moderation', (_req, res) => {
  res.json(moderationQueue)
})

router.post('/moderation/:itemId', (req, res) => {
  const { itemId } = req.params
  const { status } = req.body || {}
  const item = moderationQueue.find((entry) => entry.id === itemId)
  if (!item) {
    res.status(404).json({ message: 'Moderation item not found' })
    return
  }
  if (status === 'resolved' || status === 'open') {
    item.status = status
  }
  res.json(item)
})

export default router
