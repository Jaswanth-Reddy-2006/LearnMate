import { Router } from 'express'
import { lessonContent, lessonPlans } from '../data/lessons'
import { recordLessonCompletion } from '../utils/progressClient'
import { updateActiveLesson, getSession } from '../utils/sessionStore'

const router = Router()

router.get('/lesson/:lessonId', (req, res) => {
  const { lessonId } = req.params
  const content = lessonContent[lessonId]
  if (!content) {
    res.status(404).json({ message: 'Lesson not found' })
    return
  }
  res.json(content)
})

router.get('/lesson/:lessonId/plan', (req, res) => {
  const { lessonId } = req.params
  const plan = lessonPlans[lessonId] || lessonPlans['loop-fundamentals']
  res.json(plan)
})

router.post('/lesson/:lessonId/complete', async (req, res) => {
  const { lessonId } = req.params
  const { sessionId } = req.body || {}
  await recordLessonCompletion(lessonId)
  if (sessionId) {
    updateActiveLesson(sessionId, lessonId)
    const session = getSession(sessionId)
    res.json({ ok: true, session })
    return
  }
  res.json({ ok: true })
})

export default router
