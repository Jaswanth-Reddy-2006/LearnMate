import axios from 'axios'

const progressUrl = process.env.PROGRESS_API_URL || 'http://localhost:8001/progress'

export const progressClient = axios.create({
  baseURL: progressUrl,
  timeout: 5000,
})

export const recordLessonCompletion = async (lessonId: string) => {
  try {
    await progressClient.post('/update', { lessonId })
  } catch (error) {
    console.error('Progress service error', error)
  }
}
