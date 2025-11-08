export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type CatalogItem = {
  id: string
  title: string
  description: string
  tags: string[]
  difficulty: Difficulty
  duration: number
  coverImage: string
  lastUpdated: string
  objectives?: string[]
  prerequisites?: string[]
  careerApplications?: string[]
  resources?: string[]
  syllabus?: string[]
}