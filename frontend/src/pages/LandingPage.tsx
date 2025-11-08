import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sparkles,
  LayoutDashboard,
  BookOpen,
  PlayCircle,
  Users,
  Video,
  User,
  ShieldCheck,
  BarChart3,
  Send,
  Loader2,
  TrendingUp,
} from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { api } from '../lib/api'
import type { ChatRecommendation } from '../lib/types'

type ChatMessage = {
  id: string
  role: 'agent' | 'learner'
  author: string
  content: string
}

const features = [
  {
    label: 'Dashboard',
    description: 'Track mastery, streaks, and adaptive milestones.',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Catalog',
    description: 'Browse over twenty curated AI skill journeys.',
    path: '/catalog',
    icon: BookOpen,
  },
  {
    label: 'Lesson Player',
    description: 'Follow microlessons with live agent coaching.',
    path: '/lesson/loop-fundamentals',
    icon: PlayCircle,
  },
  {
    label: 'Quiz Lab',
    description: 'Take adaptive assessments that reroute instantly.',
    path: '/quiz/loop-fundamentals',
    icon: ShieldCheck,
  },
  {
    label: 'Community',
    description: 'Join peers sharing explainer videos and feedback.',
    path: '/community',
    icon: Users,
  },
  {
    label: 'Video Studio',
    description: 'Record walkthroughs with AI storyboards and scripts.',
    path: '/studio',
    icon: Video,
  },
  {
    label: 'Profile',
    description: 'Adjust goals, pacing, and agent collaboration styles.',
    path: '/profile',
    icon: User,
  },
  {
    label: 'Moderation Desk',
    description: 'Review content safety signals and escalation history.',
    path: '/moderation',
    icon: BarChart3,
  },
]

const defaultQuickReplies = ['Suggest a focused sprint', 'Plan my interview prep', 'Surface trending lessons']

const initialMessages: ChatMessage[] = [
  {
    id: 'agent-welcome',
    role: 'agent',
    author: 'Aurora Mentor',
    content: 'Welcome back. Share a goal or constraint and I will orchestrate the fastest learning path for you.',
  },
  {
    id: 'agent-followup',
    role: 'agent',
    author: 'Aurora Mentor',
    content: 'You can ask for career prep, technical drills, or community walkthroughs. What should we tackle?',
  },
]

const LandingPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [quickReplies, setQuickReplies] = useState(defaultQuickReplies)
  const [recommendations, setRecommendations] = useState<ChatRecommendation[]>([])
  const [error, setError] = useState<string | null>(null)
  const messagesRef = useRef(messages)
  const sessionRef = useRef<string | null>(null)
  const turnRef = useRef(1)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const ensureSession = useCallback(async () => {
    if (sessionRef.current) {
      return sessionRef.current
    }
    const session = await api.createSession('Conversational orchestration')
    sessionRef.current = session.sessionId
    return session.sessionId
  }, [])

  const chatMutation = useMutation({
    mutationFn: async ({ prompt, history }: { prompt: string; history: ChatMessage[] }) => {
      const sessionId = await ensureSession()
      const response = await api.dispatchAgent({
        sessionId,
        turnId: turnRef.current,
        from: 'learner',
        to: ['aurora', 'coordinator'],
        type: 'chat_prompt',
        payload: {
          prompt,
          transcript: history.map((entry) => ({
            role: entry.role,
            author: entry.author,
            content: entry.content,
          })),
        },
      })
      turnRef.current += 1
      return response
    },
  })

  const handleSend = useCallback(
    async (value?: string) => {
      const raw = value ?? input
      const text = raw.trim()
      if (!text || chatMutation.isPending) {
        return
      }
      const userMessage: ChatMessage = {
        id: `learner-${Date.now()}`,
        role: 'learner',
        author: 'You',
        content: text,
      }
      const history = [...messagesRef.current, userMessage].slice(-10)
      setMessages((prev) => [...prev, userMessage])
      setInput('')
      setError(null)
      try {
        const response = await chatMutation.mutateAsync({ prompt: text, history })
        const agentName = response.agent || 'Aurora Mentor'
        const reply = response.reply ?? response.feedback
        if (reply) {
          const agentMessage: ChatMessage = {
            id: `agent-${Date.now()}`,
            role: 'agent',
            author: agentName,
            content: reply,
          }
          setMessages((prev) => [...prev, agentMessage])
        }
        setQuickReplies(response.suggestions?.length ? response.suggestions : defaultQuickReplies)
        setRecommendations(response.recommendations ?? [])
      } catch {
        setError('Unable to reach the coordination service. Try again in a few seconds.')
      }
    },
    [chatMutation, input],
  )

  const isSending = chatMutation.isPending
  const activeSuggestions = useMemo(() => quickReplies.slice(0, 3), [quickReplies])

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-slate-950 to-black text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:px-10">
        <aside className="flex w-full flex-col gap-6 rounded-3xl border border-slate-800/70 bg-slate-950/70 p-8 lg:w-80">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary">
              <span className="text-2xl font-semibold">LM</span>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide text-slate-400">LearnMate.AI</p>
              <p className="text-xl font-semibold text-white">Conversational tutor</p>
            </div>
          </div>
          <Card className="bg-gradient-to-br from-primary/10 via-slate-900 to-slate-900">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 h-5 w-5 text-primary" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-white">Live multi-agent desk</p>
                <p className="text-sm text-slate-300">Request plans, quizzes, and peer mentors — the coordinator stitches the right sequence instantly.</p>
              </div>
            </div>
          </Card>
          <div className="space-y-2">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Link key={feature.label} to={feature.path} className="block">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 rounded-xl border border-transparent bg-slate-900/40 px-4 py-3 text-left transition hover:border-primary/40 hover:bg-slate-900/80"
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-white">{feature.label}</p>
                      <p className="text-xs text-slate-400">{feature.description}</p>
                    </div>
                  </Button>
                </Link>
              )
            })}
          </div>
          <div className="mt-auto space-y-3">
            <Link to="/onboarding" className="block">
              <Button className="w-full">Start adaptive onboarding</Button>
            </Link>
            <Link to="/catalog" className="block">
              <Button variant="secondary" className="w-full">Browse 20+ skills</Button>
            </Link>
          </div>
        </aside>
        <main className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto flex w-full max-w-3xl min-h-[640px] flex-col rounded-3xl border border-slate-800/70 bg-slate-950/60 p-6 sm:p-10"
          >
            <header className="flex flex-col gap-2 border-b border-slate-800 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Agent Coordination Chat</h1>
                <p className="text-base text-slate-400">Describe your goal and the orchestrator assembles lessons, quizzes, and community support automatically.</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-medium uppercase tracking-wide text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Real-time orchestration
              </div>
            </header>
            <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className={
                    message.role === 'agent'
                      ? 'mr-auto flex max-w-3xl flex-col gap-2 rounded-2xl bg-slate-900/70 p-4 text-left'
                      : 'ml-auto flex max-w-3xl flex-col gap-2 rounded-2xl bg-primary/15 p-4 text-right text-white'
                  }
                >
                  <span className="text-xs uppercase tracking-wide text-slate-400">{message.author}</span>
                  <p className="text-base text-slate-200">{message.content}</p>
                </motion.div>
              ))}
              {isSending && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mr-auto flex max-w-xs items-center gap-3 rounded-2xl bg-slate-900/70 px-4 py-3 text-sm text-slate-300"
                >
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span>Coordinating with mentors…</span>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>
            {error && (
              <div className="mt-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}
            {activeSuggestions.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {activeSuggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="secondary"
                    disabled={isSending}
                    className="rounded-full px-4 py-2 text-sm"
                    onClick={() => handleSend(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
            <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-base text-slate-300">Ask for a new skill plan, request quiz drills, or invite the empathy coach for feedback.</p>
                <Link to="/dashboard">
                  <Button variant="ghost" className="whitespace-nowrap">
                    Jump to dashboard
                  </Button>
                </Link>
              </div>
              <div className="mt-4 flex gap-3">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault()
                      void handleSend()
                    }
                  }}
                  rows={1}
                  placeholder="Describe the skill, project, or interview you want to tackle..."
                  className="min-h-[56px] flex-1 resize-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-base text-slate-200 placeholder:text-slate-500 focus:border-primary/50 focus:outline-none"
                />
                <Button onClick={() => handleSend()} disabled={isSending} className="h-[48px] min-w-[120px]">
                  {isSending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
            {recommendations.length > 0 && (
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span>Recommended next steps</span>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {recommendations.map((item) => (
                    <Card key={item.id} className="bg-slate-900/40">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-base font-semibold text-white">{item.title}</p>
                          <Badge variant="outline" className="capitalize">
                            {item.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-400">{item.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                          <span className="rounded-full border border-slate-700 px-3 py-1">{item.duration} min</span>
                          {item.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-slate-800 px-3 py-1">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link to={`/catalog?q=${encodeURIComponent(item.id)}`} className="block">
                          <Button className="w-full">View in catalog</Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default LandingPage
