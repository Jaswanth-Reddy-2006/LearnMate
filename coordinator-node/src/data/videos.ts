import type { PeerVideo } from '../types'

export const videos: PeerVideo[] = [
  {
    id: 'video-001',
    title: 'Understanding range()',
    author: 'Mira Shen',
    authorAvatar: 'https://api.dicebear.com/6.x/initials/svg?seed=MS',
    duration: 92,
    tags: ['loops', 'python'],
    transcript: 'I walk through range and enumerate with quick visuals.',
    thumbnail: '/assets/video-range.png',
    videoUrl: '',
    likes: 128,
    status: 'published',
    lessonId: 'loop-fundamentals',
    submittedAt: new Date().toISOString(),
  },
  {
    id: 'video-002',
    title: 'Base cases in recursion',
    author: 'Kai Patel',
    authorAvatar: 'https://api.dicebear.com/6.x/initials/svg?seed=KP',
    duration: 104,
    tags: ['recursion', 'visual'],
    transcript: 'Visually map the recursion tree and pinpoint the base case.',
    thumbnail: '/assets/video-recursion.png',
    videoUrl: '',
    likes: 86,
    status: 'published',
    lessonId: 'recursion-visual',
    submittedAt: new Date().toISOString(),
  },
]
