import { Router } from 'express'
import { z } from 'zod'
import { catalog } from '../data/catalog'
import { quizzes } from '../data/quizzes' // Keep as fallback
import { WikipediaFetcher } from '../utils/wikipediaFetcher'
import { QuizGenerator } from '../utils/quizGenerator'
import { Cache } from '../utils/cache'
import type { QuizItem, QuizResult } from '../types'

const router = Router()

router.get('/quiz/:lessonId', async (req, res) => {
  try {
    const { lessonId } = req.params
    const { easy = '10', medium = '10', hard = '10' } = req.query

    const config = {
      easy: Math.max(0, Math.min(50, parseInt(easy as string) || 10)),
      medium: Math.max(0, Math.min(50, parseInt(medium as string) || 10)),
      hard: Math.max(0, Math.min(50, parseInt(hard as string) || 10))
    }

    const cacheKey = `${lessonId}_${config.easy}_${config.medium}_${config.hard}`

    // Check cache first
    const cachedQuestions = Cache.getQuizQuestions(cacheKey)
    if (cachedQuestions) {
      return res.json(cachedQuestions)
    }

    // Find the subject in catalog
    const subject = catalog.find(item => item.id === lessonId)
    if (!subject) {
      // Fallback to static quizzes if subject not found
      const items = quizzes[lessonId] || []
      return res.json(items)
    }

    // Try to generate questions from Wikipedia
    try {
      const wikipediaTitle = WikipediaFetcher.getSubjectWikipediaTitle(subject.title)
      const wikipediaData = Cache.getWikipediaData(lessonId) ||
                           await WikipediaFetcher.fetchSubjectData(wikipediaTitle)

      if (wikipediaData) {
        // Cache the Wikipedia data
        Cache.setWikipediaData(lessonId, wikipediaData)

        // Generate quiz questions with custom configuration
        const questions = await QuizGenerator.generateQuizQuestions(wikipediaData, config)

        // Cache the questions with config-specific key
        Cache.setQuizQuestions(cacheKey, questions)

        return res.json(questions)
      }
    } catch (error) {
      console.error(`Failed to generate Wikipedia-based quiz for ${lessonId}:`, error)
    }

    // Fallback to static quizzes if Wikipedia fails
    const items = quizzes[lessonId] || []
    res.json(items)

  } catch (error) {
    console.error('Error in quiz route:', error)
    res.status(500).json({ error: 'Failed to generate quiz questions' })
  }
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
