import { Router } from 'express'
import { z } from 'zod'
import { writeFile } from 'fs/promises'
import path from 'path'
import { videos } from '../data/videos'
import { moderationQueue } from '../data/moderation'
import { containsProfanity } from '../utils/profanity'
import type { PeerVideo } from '../types'
import { v4 as uuid } from 'uuid'

const router = Router()

router.get('/videos', (_req, res) => {
  res.json(videos)
})

const uploadSchema = z.object({
  title: z.string().min(3),
  lessonId: z.string(),
  transcript: z.string().min(3),
  tags: z.array(z.string()).default([]),
  dataUrl: z.string().optional(),
})

router.post('/videos', async (req, res) => {
  const parse = uploadSchema.safeParse(req.body)
  if (!parse.success) {
    res.status(400).json(parse.error)
    return
  }
  const payload = parse.data
  const id = uuid()
  let filePath = ''
  if (payload.dataUrl) {
    const matches = payload.dataUrl.match(/^data:(?<mime>[\w/+-]+);base64,(?<data>.+)$/)
    if (matches?.groups?.data) {
      const buffer = Buffer.from(matches.groups.data, 'base64')
      const filename = `${id}.webm`
      filePath = path.join(process.cwd(), 'uploads', filename)
      await writeFile(filePath, buffer)
    }
  }
  const flagged = containsProfanity(payload.transcript)
  const video: PeerVideo = {
    id,
    title: payload.title,
    author: 'You',
    authorAvatar: 'https://api.dicebear.com/6.x/initials/svg?seed=YOU',
    duration: 90,
    tags: payload.tags,
    transcript: payload.transcript,
    thumbnail: '/assets/custom-upload.png',
    videoUrl: filePath,
    likes: 0,
    status: flagged ? 'flagged' : 'pending',
    lessonId: payload.lessonId,
    submittedAt: new Date().toISOString(),
  }
  videos.unshift(video)
  if (flagged) {
    moderationQueue.unshift({
      id: `mod-${id}`,
      videoId: id,
      reason: 'Profanity detected during automated screening.',
      severity: 'medium',
      submittedAt: new Date().toISOString(),
      status: 'open',
    })
  }
  res.status(201).json(video)
})

export default router
