import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import sessionRoutes from './routes/sessionRoutes'
import catalogRoutes from './routes/catalogRoutes'
import lessonRoutes from './routes/lessonRoutes'
import quizRoutes from './routes/quizRoutes'
import videoRoutes from './routes/videoRoutes'
import moderationRoutes from './routes/moderationRoutes'
import messageRoutes from './routes/messageRoutes'

const app = express()
const port = process.env.PORT || 8080
const allowedOrigins = process.env.ALLOWED_ORIGIN?.split(',')

app.use(helmet())
app.use(
  cors({
    origin: allowedOrigins && !allowedOrigins.includes('*') ? allowedOrigins : true,
    credentials: false,
  }),
)
app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

const uploadsDir = path.join(process.cwd(), 'uploads')
app.use('/uploads', express.static(uploadsDir))

app.get('/healthz', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api', sessionRoutes)
app.use('/api', catalogRoutes)
app.use('/api', lessonRoutes)
app.use('/api', quizRoutes)
app.use('/api', videoRoutes)
app.use('/api', moderationRoutes)
app.use('/api', messageRoutes)

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.listen(port, () => {
  console.log(`Coordinator service running on port ${port}`)
})
