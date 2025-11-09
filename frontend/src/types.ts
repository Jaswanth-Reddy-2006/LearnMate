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
  benefits?: string[]
  importance?: string
  industryDemand?: string
  learningTips?: string[]
  industryRelevance?: {
    relevanceScore: number
    topIndustries: string[]
    salaryImpact: string
  }
  realWorldApplications?: string[]
  keyTopics?: string[]
  learningOutcomes?: string[]
}