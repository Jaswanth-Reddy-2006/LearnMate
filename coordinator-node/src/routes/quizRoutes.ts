import { Router } from 'express'
import { z } from 'zod'
import { quizzes } from '../data/quizzes'
import type { QuizItem, QuizResult } from '../types'

const router = Router()

router.get('/quiz/:lessonId', (req, res) => {
  const { lessonId } = req.params
  const items = quizzes[lessonId] || []
  res.json(items)
})

const submissionSchema = z.object({
  lessonId: z.string(),
  responses: z.array(z.object({ itemId: z.string(), answer: z.string() })),
})

router.post('/quiz/grade', (req, res) => {
  const parse = submissionSchema.safeParse(req.body)
  if (!parse.success) {
    res.status(400).json(parse.error)
    return
  }
  const { lessonId, responses } = parse.data
  const items = quizzes[lessonId] || []
  const results: QuizResult['feedback'] = []
  let correct = 0
  responses.forEach(({ itemId, answer }) => {
    const item = items.find((q) => q.id === itemId)
    if (!item) return
    const isCorrect = evaluateAnswer(item, answer)
    if (isCorrect) correct += 1
    results.push({ itemId, status: isCorrect ? 'correct' : 'incorrect', detail: item.feedback })
  })
  const score = items.length ? Math.round((correct / items.length) * 100) : 0
  const masteryEstimate = Math.min(100, Math.round(score * 0.8 + 20))
  res.json({ score, masteryEstimate, feedback: results })
})

const evaluateAnswer = (item: QuizItem, answer: string) => {
  const expected = item.answer.trim().toLowerCase()
  const received = answer.trim().toLowerCase()
  if (item.type === 'code') {
    return received.includes(expected.slice(0, Math.min(expected.length, 10)))
  }
  if (item.type === 'short') {
    return received.includes(expected.replace(/\s+/g, ' '))
  }
  return expected === received
}

export default router
