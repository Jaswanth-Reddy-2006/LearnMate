export type LearningMode = 'visual' | 'auditory' | 'kinesthetic'

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

export type LessonContent = {
  id: string
  title: string
  body: string
  codeExample?: string
  visualization?: string
  ttsUrl?: string
  followUps: string[]
  hints: string[]
}

export type QuizItem = {
  id: string
  prompt: string
  type: 'mcq' | 'short' | 'code'
  difficulty: 'easy' | 'medium' | 'hard'
  options?: string[]
  answer?: string
  feedback: string
}

export type EmotionSignal = {
  type: string
  confidence: number
  suggestion: string
}

export type AgentMessagePayload = {
  sessionId: string
  turnId: number
  from: string
  to: string[]
  type: string
  payload: Record<string, unknown>
}

export type LessonPlan = {
  topic: string
  microlessons: Microlesson[]
}

export type SessionSummary = {
  sessionId: string
  activeLessonId: string
  lessonPlan: LessonPlan
}

export type CatalogItem = {
  id: string
  title: string
  description: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number
  coverImage: string
  lastUpdated: string
  objectives?: string[]
  prerequisites?: string[]
  careerApplications?: string[]
  resources?: string[]
  syllabus?: string[]
}

export type ChatRecommendation = {
  id: string
  title: string
  description: string
  difficulty: CatalogItem['difficulty']
  duration: number
  tags: string[]
}

export type AgentResponse = {
  agent: string
  reply?: string
  feedback?: string
  suggestions?: string[]
  recommendations?: ChatRecommendation[]
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
  submittedAt: string
}

export type ProgressSnapshot = {
  mastery: number
  streak: number
  nextReviewAt: string
  lessonCompletionRate: number
  skills: Array<{
    id: string
    label: string
    level: number
    trend: 'up' | 'steady' | 'down'
  }>
  masteryTrend: Array<{
    date: string
    value: number
  }>
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

export type StudioUploadPayload = {
  title: string
  lessonId: string
  transcript: string
  tags: string[]
  dataUrl: string
}

export type ModerationItem = {
  id: string
  videoId: string
  reason: string
  severity: 'low' | 'medium' | 'high'
  submittedAt: string
  status: 'open' | 'resolved'
  notes?: string
}

export type ProficiencyLevel = {
  level: 'foundational' | 'intermediate' | 'advanced' | 'expert'
  description: string
  expectations: string[]
}

export type CareerImpact = {
  roleTitle: string
  relevance: 'critical' | 'important' | 'beneficial'
  salaryImpact: string
  growthPotential: string
}

export type SkillInterconnection = {
  skillId: string
  skillName: string
  relationshipType: 'prerequisite' | 'complementary' | 'advanced'
  description: string
}

export type BtechSkillCatalogItem = CatalogItem & {
  discipline: string
  branch?: string
  importanceAssessment: {
    curriculumCriticalityScore: number
    industryDemandScore: number
    rationale: string
    keyDrivers: string[]
  }
  practicalApplications: {
    realWorldScenario: string
    projectExample: string
    industryUse: string
    careerPathway: string
  }
  skillInterconnections: SkillInterconnection[]
  proficiencyLevels: ProficiencyLevel[]
  careerImpacts: CareerImpact[]
  learningOutcomes: string[]
  coreTopics: string[]
  recommendedResources: string[]
}
