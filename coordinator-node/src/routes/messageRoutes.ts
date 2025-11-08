import { Router } from 'express'
import { z } from 'zod'
import { generateCodeFeedback } from '../agents/coachAgent'
import { catalog } from '../data/catalog'

const router = Router()

const messageSchema = z.object({
  sessionId: z.string(),
  turnId: z.number(),
  from: z.string(),
  to: z.array(z.string()),
  type: z.string(),
  payload: z.record(z.string(), z.unknown()),
})

const defaultQuickReplies = ['Recommend a quick win', 'Plan my next session', 'Show trending skills']

const heuristics = [
  {
    keywords: ['interview', 'recruiter', 'behavioural', 'offer'],
    reply: 'I can line up mock interviews, behavioural prompts, and scoring rubrics. Ready for a focused interview sprint?',
    quickReplies: ['Queue interview drills', 'Share behavioural prompts', 'Add salary negotiation tips'],
    tags: ['interview', 'career'],
    agent: 'Aurora Mentor',
  },
  {
    keywords: ['data', 'analytics', 'sql', 'pipeline'],
    reply: 'I will assemble a data fluency path with SQL practice, pandas clinics, and analytics playbooks. Want that stack?',
    quickReplies: ['Send SQL refreshers', 'Schedule pandas clinic', 'Surface analytics projects'],
    tags: ['data', 'analytics'],
    agent: 'Atlas Strategist',
  },
  {
    keywords: ['frontend', 'react', 'ui', 'design'],
    reply: 'Let me stitch a front-end polish circuit with React performance work, Tailwind recipes, and UX microcopy drills.',
    quickReplies: ['Optimize my React flow', 'Share Tailwind patterns', 'Improve UX copy'],
    tags: ['react', 'frontend', 'ui'],
    agent: 'Lyra Experience Coach',
  },
  {
    keywords: ['devops', 'cloud', 'observability', 'kubernetes'],
    reply: 'I can route you through deployment pipelines, observability upgrades, and cluster drills. Shall I compile that?',
    quickReplies: ['Start observability track', 'Review deployment checklist', 'Plan Kubernetes lab'],
    tags: ['devops', 'cloud'],
    agent: 'Orion Platform Guide',
  },
  {
    keywords: ['leadership', 'communication', 'team', 'collaboration'],
    reply: 'I have a soft-skills arc mixing communication drills, leadership retros, and storytelling practice. Want me to activate it?',
    quickReplies: ['Improve team communication', 'Practice leadership retros', 'Craft better updates'],
    tags: ['communication', 'career'],
    agent: 'Nova Enablement Coach',
  },
]

const pickRecommendations = (keywords: string[], limit = 4) => {
  const normalized = keywords.map((keyword) => keyword.toLowerCase()).filter(Boolean)
  const scored = catalog.map((item) => {
    const haystack = `${item.title} ${item.description} ${item.tags.join(' ')}`.toLowerCase()
    const score = normalized.reduce((total, keyword) => (haystack.includes(keyword) ? total + 1 : total), 0)
    return { item, score }
  })
  const ranked = scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item)
  const rankedIds = new Set(ranked.map((entry) => entry.id))
  const fallback = catalog.filter((entry) => !rankedIds.has(entry.id))
  const combined = [...ranked, ...fallback]
  return combined.slice(0, limit).map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    difficulty: item.difficulty,
    duration: item.duration,
    tags: item.tags.slice(0, 3),
  }))
}

router.post('/message', (req, res) => {
  const parse = messageSchema.safeParse(req.body)
  if (!parse.success) {
    res.status(400).json(parse.error)
    return
  }
  const { type, payload } = parse.data
  if (type === 'chat_prompt') {
    const prompt = String(payload.prompt ?? '').trim()
    if (!prompt) {
      res.json({
        agent: 'Aurora Mentor',
        reply: 'Tell me what skill you want to work on and I will line up the right journey.',
        suggestions: defaultQuickReplies,
        recommendations: pickRecommendations([]),
      })
      return
    }
    const normalized = prompt.toLowerCase()
    const matched = heuristics.find((entry) => entry.keywords.some((keyword) => normalized.includes(keyword)))
    const recommendationTags = matched?.tags ?? prompt.split(/\s+/)
    const recommendations = pickRecommendations(recommendationTags)
    const suggestions = matched?.quickReplies ?? defaultQuickReplies
    const agent = matched?.agent ?? 'Aurora Mentor'
    const reply = matched?.reply ?? `I can orchestrate a sequence focused on ${prompt}. Want curated microlessons and drills for it?`
    res.json({ agent, reply, suggestions, recommendations })
    return
  }
  if (type === 'code_feedback') {
    const code = String(payload.code ?? '')
    const feedback = generateCodeFeedback(code)
    res.json({ agent: 'TeachingAgent', feedback })
    return
  }
  res.json({
    agent: 'Coordinator',
    reply: 'Message routed. Ask for a skill plan or request feedback to get started.',
    suggestions: defaultQuickReplies,
    recommendations: pickRecommendations([]),
  })
})

export default router
