const coordinatorUrl = import.meta.env.VITE_COORDINATOR_API_URL || 'http://localhost:8080/api'
const progressUrl = import.meta.env.VITE_PROGRESS_API_URL || 'http://localhost:8001/progress'

export const config = {
  coordinatorUrl,
  progressUrl,
}
