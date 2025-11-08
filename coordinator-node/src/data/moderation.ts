import type { ModerationItem } from '../types'

export const moderationQueue: ModerationItem[] = [
  {
    id: 'mod-001',
    videoId: 'video-002',
    reason: 'Automated flag: potential sensitive language in transcript segment 2.',
    severity: 'low',
    submittedAt: new Date().toISOString(),
    status: 'open',
  },
]
