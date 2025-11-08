import { v4 as uuid } from 'uuid'
import type { SessionSummary } from '../types'
import { lessonPlans } from '../data/lessons'

const sessions = new Map<string, SessionSummary>()

export const createSession = (topic: string): SessionSummary => {
  const basePlan = lessonPlans['loop-fundamentals'] ?? { topic: 'Python Loop Fundamentals', microlessons: [] }
  const sessionId = uuid()
  const summary: SessionSummary = {
    sessionId,
    activeLessonId: basePlan.microlessons[0]?.id ?? 'loop-fundamentals',
    lessonPlan: {
      topic,
      microlessons: basePlan.microlessons,
    },
  }
  sessions.set(sessionId, summary)
  return summary
}

export const getSession = (sessionId: string) => sessions.get(sessionId)

export const updateActiveLesson = (sessionId: string, lessonId: string) => {
  const session = sessions.get(sessionId)
  if (!session) return
  session.activeLessonId = lessonId
}
