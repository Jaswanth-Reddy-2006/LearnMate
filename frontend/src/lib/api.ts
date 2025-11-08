import axios from 'axios'
import { config } from './config'
import type {
  AgentMessagePayload,
  AgentResponse,
  CatalogItem,
  LessonContent,
  LessonPlan,
  PeerVideo,
  ProgressSnapshot,
  QuizItem,
  QuizResult,
  QuizSubmission,
  SessionSummary,
  StudioUploadPayload,
  ModerationItem,
} from './types'

const coordinatorClient = axios.create({
  baseURL: config.coordinatorUrl,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
})

const progressClient = axios.create({
  baseURL: config.progressUrl,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = {
  createSession: async (topic: string) => {
    const { data } = await coordinatorClient.post<SessionSummary>('/session', { topic })
    return data
  },
  getCatalog: async () => {
    const { data } = await coordinatorClient.get<CatalogItem[]>('/catalog')
    return data
  },
  getLessonContent: async (lessonId: string) => {
    const { data } = await coordinatorClient.get<LessonContent>(`/lesson/${lessonId}`)
    return data
  },
  getLessonPlan: async (lessonId: string) => {
    const { data } = await coordinatorClient.get<LessonPlan>(`/lesson/${lessonId}/plan`)
    return data
  },
  dispatchAgent: async (message: AgentMessagePayload) => {
    const { data } = await coordinatorClient.post<AgentResponse>('/message', message)
    return data
  },
  getQuiz: async (lessonId: string, config?: { numQuestions?: number; level?: string; easy?: number; medium?: number; hard?: number; mode?: string }) => {
    let params = ''
    if (config) {
      if (config.mode === 'practice') {
        params = '?mode=practice'
      } else if (config.mode === 'quiz') {
        params = `?mode=quiz&numQuestions=${config.numQuestions}&level=${config.level}`
      } else if (config.easy !== undefined) {
        params = `?easy=${config.easy}&medium=${config.medium}&hard=${config.hard}`
      }
    }
    const { data } = await coordinatorClient.get<QuizItem[]>(`/quiz/${lessonId}${params}`)
    return data
  },
  submitQuiz: async (submission: QuizSubmission) => {
    const { data } = await coordinatorClient.post<QuizResult>('/quiz/grade', submission)
    return data
  },
  listVideos: async () => {
    const { data } = await coordinatorClient.get<PeerVideo[]>('/videos')
    return data
  },
  uploadVideo: async (payload: StudioUploadPayload) => {
    const { data } = await coordinatorClient.post<PeerVideo>('/videos', payload)
    return data
  },
  getModerationQueue: async () => {
    const { data } = await coordinatorClient.get<ModerationItem[]>('/moderation')
    return data
  },
  resolveModeration: async (itemId: string, status: 'resolved' | 'open') => {
    await coordinatorClient.post(`/moderation/${itemId}`, { status })
  },
  updateLessonCompletion: async (lessonId: string) => {
    await coordinatorClient.post(`/lesson/${lessonId}/complete`)
  },
}

export const progressApi = {
  getSnapshot: async () => {
    const { data } = await progressClient.get<ProgressSnapshot>('/snapshot')
    return data
  },
  getTimeline: async () => {
    const { data } = await progressClient.get<ProgressSnapshot['masteryTrend']>('/timeline')
    return data
  },
}
