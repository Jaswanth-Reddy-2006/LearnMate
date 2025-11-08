export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type CatalogItem = {
  id: string
  title: string
  description: string
  tags: string[]
  difficulty: Difficulty
  duration: number
  daysRequired?: number
  coverImage: string
  lastUpdated: string
  objectives?: string[]
  prerequisites?: string[]
  careerApplications?: string[]
  resources?: string[]
  syllabus?: string[]
}

export type Microlesson = {
  id: string
  title: string
  objectives: string[]
  bloomLevel: string
  timeEstimate: number
  prerequisites: string[]
  recommendedQuiz: boolean
  resources: string[]
}

export type LessonPlan = {
  topic: string
  microlessons: Microlesson[]
}

export type LessonContent = {
  id: string
  title: string
  body: string
  codeExample?: string
  followUps: string[]
  hints: string[]
}

export type QuizItem = {
  id: string
  prompt: string
  type: 'mcq' | 'short' | 'code'
  difficulty: 'easy' | 'medium' | 'hard'
  options?: string[]
  answer: string
  feedback: string
}

export type QuizSubmission = {
  lessonId: string
  responses: Array<{
    itemId: string
    answer: string
  }>
}

export type QuizResult = {
  score: number
  masteryEstimate: number
  feedback: Array<{
    itemId: string
    status: 'correct' | 'incorrect'
    detail: string
  }>
}

export type SessionSummary = {
  sessionId: string
  activeLessonId: string
  lessonPlan: LessonPlan
}

export type AgentMessage = {
  sessionId: string
  turnId: number
  from: string
  to: string[]
  type: string
  payload: Record<string, unknown>
}

export type PeerVideo = {
  id: string
  title: string
  author: string
  authorAvatar: string
  duration: number
  tags: string[]
  transcript: string
  thumbnail: string
  videoUrl: string
  likes: number
  status: 'published' | 'pending' | 'flagged'
  lessonId: string
  submittedAt: string
  topic: string
  subtopic: string
}

export type ModerationItem = {
  id: string
  videoId: string
  reason: string
  severity: 'low' | 'medium' | 'high'
  submittedAt: string
  status: 'open' | 'resolved'
}
