import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { UseFormRegister } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
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
  ChevronDown,
} from 'lucide-react'
import Button from '../components/ui/Button'
import CosmicButton from '../components/ui/CosmicButton'
import NeonCard from '../components/ui/NeonCard'
import Badge from '../components/ui/Badge'
import PageTransition from '../components/layout/PageTransition'
import { api } from '../lib/api'
import type { ChatRecommendation } from '../lib/types'
import { parseCommand, getViewModeTransition, getCommandResponse, VIEW_MODE_METADATA, type ViewMode } from '../utils/commandParser'

const schema = z.object({
  subject: z.string().min(2),
  timeframe: z.string().min(1),
  dailyMinutes: z.number().min(10).max(240),
  mode: z.enum(['visual', 'auditory', 'kinesthetic']),
  goal: z.string().min(10),
})

type FormValues = z.infer<typeof schema>

type ChatMessage = {
  id: string
  role: 'agent' | 'learner'
  author: string
  content: string
  isCommand?: boolean
}

const features = [
  {
    label: 'Dashboard',
    description: 'Track mastery, streaks, and adaptive milestones.',
    path: '/dashboard',
    icon: LayoutDashboard,
    category: 'Core',
  },
  {
    label: 'Catalog',
    description: 'Browse over twenty curated AI skill journeys.',
    path: '/catalog',
    icon: BookOpen,
    category: 'Learning',
  },
  {
    label: 'Lesson Player',
    description: 'Follow microlessons with live agent coaching.',
    path: '/lesson/loop-fundamentals',
    icon: PlayCircle,
    category: 'Learning',
  },
  {
    label: 'Quiz Lab',
    description: 'Take adaptive assessments that reroute instantly.',
    path: '/quiz/loop-fundamentals',
    icon: ShieldCheck,
    category: 'Assessment',
  },
  {
    label: 'Community',
    description: 'Join peers sharing explainer videos and feedback.',
    path: '/community',
    icon: Users,
    category: 'Community',
  },
  {
    label: 'Video Studio',
    description: 'Record walkthroughs with AI storyboards and scripts.',
    path: '/studio',
    icon: Video,
    category: 'Creation',
  },
  {
    label: 'Profile',
    description: 'Adjust goals, pacing, and agent collaboration styles.',
    path: '/profile',
    icon: User,
    category: 'Settings',
  },
  {
    label: 'Moderation Desk',
    description: 'Review content safety signals and escalation history.',
    path: '/moderation',
    icon: BarChart3,
    category: 'Admin',
  },
]

const defaultQuickReplies = ['Suggest a focused sprint', 'Plan my interview prep', 'Surface trending lessons', 'Explore path', 'Show more features']

const InteractiveSessionPage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('form')
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [quickReplies, setQuickReplies] = useState(defaultQuickReplies)
  const [recommendations, setRecommendations] = useState<ChatRecommendation[]>([])
  const [error, setError] = useState<string | null>(null)
  const messagesRef = useRef(messages)
  const sessionRef = useRef<string | null>(null)
  const turnRef = useRef(1)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: 'Python loops',
      timeframe: '2 weeks',
      dailyMinutes: 30,
      mode: 'visual',
      goal: 'Build confidence with iteration patterns and automate tasks.',
    },
  })

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

  const handleFormSubmit = async (values: FormValues) => {
    const welcomeMessage: ChatMessage = {
      id: 'agent-welcome',
      role: 'agent',
      author: 'Aurora Mentor',
      content: `Perfect! I'm helping you master **${values.subject}** in **${values.timeframe}** with **${values.dailyMinutes} minutes daily**. Your learning style: ${values.mode}. Goal: *${values.goal}*\n\nI've created your personalized learning path. What would you like to tackle first?`,
    }
    setMessages([welcomeMessage])
    setViewMode('featured')
    setExpandedFeature(null)
    setError(null)
    
    try {
      await ensureSession()
    } catch (err) {
      console.error('Session initialization error:', err)
      setError('Could not create session. Chat may have limited functionality.')
    }
  }

  const handleSend = useCallback(
    async (value?: string) => {
      const raw = value ?? input
      const text = raw.trim()
      if (!text || chatMutation.isPending) {
        return
      }

      const command = parseCommand(text)
      const userMessage: ChatMessage = {
        id: `learner-${Date.now()}`,
        role: 'learner',
        author: 'You',
        content: text,
        isCommand: command.matched,
      }

      const newViewMode = getViewModeTransition(viewMode, command)
      const commandResponse = getCommandResponse(command)

      const history = [...messagesRef.current, userMessage].slice(-10)
      setMessages((prev) => [...prev, userMessage])
      setInput('')
      setError(null)

      if (command.matched) {
        setViewMode(newViewMode)
        setExpandedFeature(null)

        if (commandResponse) {
          const systemMessage: ChatMessage = {
            id: `agent-${Date.now()}`,
            role: 'agent',
            author: 'Aurora Mentor',
            content: commandResponse,
          }
          setMessages((prev) => [...prev, systemMessage])
        }
        return
      }

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
    [chatMutation, input, viewMode],
  )

  const isSending = chatMutation.isPending
  const activeSuggestions = useMemo(() => quickReplies.slice(0, 3), [quickReplies])
  const metadata = VIEW_MODE_METADATA[viewMode]
  const groupedFeatures = useMemo(() => {
    const grouped = features.reduce(
      (acc, feature) => {
        if (!acc[feature.category]) acc[feature.category] = []
        acc[feature.category].push(feature)
        return acc
      },
      {} as Record<string, typeof features>,
    )
    return Object.entries(grouped)
  }, [])

  return (
    <PageTransition className="min-h-screen bg-neon-50 text-neon-text overflow-hidden">
      <div className="mx-auto flex min-h-screen max-w-full flex-col gap-0 px-0 lg:flex-row lg:px-0">
        <AnimatePresence>
          {metadata.featuresPanelVisible && (
            <motion.aside
              key="features-panel"
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`flex flex-col gap-6 border-r border-neon-cyan/20 bg-neon-100 p-8 overflow-y-auto transition-all duration-300 ${
                metadata.featuresExpanded ? 'w-full lg:w-1/3' : 'w-full lg:w-96'
              } max-h-screen`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-violet text-neon-50 neon-glow">
                  <span className="text-2xl font-semibold">LM</span>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide text-neon-cyan neon-text-cyan">LearnMate.AI</p>
                  <p className="text-xl font-semibold text-neon-cyan">{metadata.featuresExpanded ? 'All Features' : 'Your Journey'}</p>
                </div>
              </div>

              <motion.div layout className="space-y-2">
                {metadata.featuresExpanded ? (
                  groupedFeatures.map(([category, categoryFeatures]) => (
                    <motion.div key={category} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                      <h3 className="text-xs uppercase tracking-widest font-bold text-neon-cyan neon-text-cyan px-2 py-1">{category}</h3>
                      <div className="space-y-2">
                        {categoryFeatures.map((feature) => {
                          const Icon = feature.icon
                          const isExpanded = expandedFeature === feature.label
                          return (
                            <motion.div key={feature.label} layout>
                              <Link to={feature.path} className="block">
                                <NeonCard
                                  glow={isExpanded ? 'cyan' : 'magenta'}
                                  className={`cursor-pointer ${isExpanded ? 'neon-glow' : ''}`}
                                  onClick={() => setExpandedFeature(isExpanded ? null : feature.label)}
                                >
                                  <div className="flex items-start gap-3 justify-between">
                                    <div className="flex items-start gap-3">
                                      <Icon className="h-5 w-5 text-neon-cyan mt-1 flex-shrink-0" />
                                      <div className="text-left">
                                        <p className="text-sm font-semibold text-neon-text">{feature.label}</p>
                                        {isExpanded && <p className="text-xs text-neon-muted mt-1">{feature.description}</p>}
                                      </div>
                                    </div>
                                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                      <ChevronDown className="h-4 w-4 text-neon-cyan flex-shrink-0" />
                                    </motion.div>
                                  </div>
                                </NeonCard>
                              </Link>
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  features.slice(0, 5).map((feature) => {
                    const Icon = feature.icon
                    return (
                      <Link key={feature.label} to={feature.path} className="block">
                        <NeonCard glow="magenta" className="cursor-pointer">
                          <div className="flex items-start gap-3">
                            <Icon className="h-5 w-5 text-neon-cyan flex-shrink-0 mt-1" />
                            <div>
                              <p className="text-sm font-semibold text-neon-text">{feature.label}</p>
                              <p className="text-xs text-neon-muted">{feature.description}</p>
                            </div>
                          </div>
                        </NeonCard>
                      </Link>
                    )
                  })
                )}
              </motion.div>

              {!metadata.featuresExpanded && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-auto">
                  <CosmicButton onClick={() => handleSend('explore path')} className="w-full">
                    View All Features
                  </CosmicButton>
                </motion.div>
              )}
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="flex-1">
          {metadata.formVisible ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center min-h-screen bg-neon-50 px-4"
            >
              <NeonCard glow="cyan" className="w-full max-w-2xl">
                <div className="mb-8 flex flex-col gap-4">
                  <div>
                    <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50">Let's Get Started</Badge>
                    <h2 className="mt-4 text-3xl font-bold neon-text-cyan font-display">Tell LearnMate how you like to learn.</h2>
                    <p className="mt-2 max-w-2xl text-sm text-neon-muted">
                      The AI coordinator will personalize your learning path based on your preferences.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neon-text">What do you want to learn?</label>
                    <input
                      {...register('subject')}
                      placeholder="e.g., Python loops, React fundamentals"
                      className="w-full rounded-lg border border-neon-cyan/50 bg-neon-100/50 px-4 py-3 text-sm text-neon-text placeholder:text-neon-muted focus:border-neon-cyan focus:outline-none"
                    />
                    {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-neon-text">Target timeframe</label>
                      <select
                        {...register('timeframe')}
                        className="w-full rounded-lg border border-neon-cyan/50 bg-neon-100/50 px-4 py-3 text-sm text-neon-text focus:border-neon-cyan focus:outline-none"
                      >
                        <option value="1 week">1 week</option>
                        <option value="2 weeks">2 weeks</option>
                        <option value="1 month">1 month</option>
                        <option value="custom">Custom</option>
                      </select>
                      {errors.timeframe && <p className="text-xs text-red-500">{errors.timeframe.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-neon-text">Daily commitment</label>
                      <input
                        type="number"
                        {...register('dailyMinutes', { valueAsNumber: true })}
                        placeholder="minutes"
                        className="w-full rounded-lg border border-neon-cyan/50 bg-neon-100/50 px-4 py-3 text-sm text-neon-text placeholder:text-neon-muted focus:border-neon-cyan focus:outline-none"
                      />
                      {errors.dailyMinutes && <p className="text-xs text-red-500">{errors.dailyMinutes.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neon-text">Learning style</label>
                    <div className="grid grid-cols-3 gap-2">
                      <ModeButton value="visual" register={register} name="mode" label="Visual" />
                      <ModeButton value="auditory" register={register} name="mode" label="Auditory" />
                      <ModeButton value="kinesthetic" register={register} name="mode" label="Hands-on" />
                    </div>
                    {errors.mode && <p className="text-xs text-red-500">{errors.mode.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-neon-text">Your learning goal</label>
                    <textarea
                      {...register('goal')}
                      placeholder="What do you want to achieve?"
                      rows={3}
                      className="w-full rounded-lg border border-neon-cyan/50 bg-neon-100/50 px-4 py-3 text-sm text-neon-text placeholder:text-neon-muted focus:border-neon-cyan focus:outline-none"
                    />
                    {errors.goal && <p className="text-xs text-red-500">{errors.goal.message}</p>}
                  </div>

                  <CosmicButton 
                    type="submit" 
                    className="w-full"
                  >
                    Launch My Learning Path
                  </CosmicButton>
                </form>
              </NeonCard>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`mx-auto flex w-full min-h-screen flex-col rounded-none border-none bg-neon-50 p-6 sm:p-10 transition-all duration-300 ${
                metadata.featuresExpanded ? '' : ''
              }`}
            >
              <header className="flex flex-col gap-2 border-b border-neon-cyan/20 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold neon-text-cyan font-display">AI Mentor Chat</h1>
                  <p className="text-base text-neon-muted">Share your goals and I'll orchestrate your learning journey.</p>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-neon-cyan/50 bg-neon-cyan/5 px-4 py-2 text-xs font-medium uppercase tracking-wide text-neon-cyan neon-border">
                  <span className="h-2 w-2 rounded-full bg-neon-cyan animate-pulse" />
                  Live orchestration
                </div>
              </header>

              <div className="mt-6 flex-1 space-y-4 overflow-y-auto pr-1 scrollbar-thin">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className={
                      message.role === 'agent'
                        ? 'mr-auto flex max-w-3xl flex-col gap-2 rounded-lg bg-neon-100/50 border border-neon-cyan/30 p-4 text-left'
                        : 'ml-auto flex max-w-3xl flex-col gap-2 rounded-lg bg-neon-magenta/10 border border-neon-magenta/30 p-4 text-left'
                    }
                  >
                    <span className="text-xs uppercase tracking-wide text-neon-cyan">{message.author}</span>
                    <p className="text-base text-neon-text whitespace-pre-wrap">{message.content}</p>
                    {message.isCommand && <span className="text-xs text-neon-cyan mt-1">⌘ Command executed</span>}
                  </motion.div>
                ))}
                {isSending && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mr-auto flex max-w-xs items-center gap-3 rounded-lg bg-neon-violet/10 border border-neon-violet/30 px-4 py-3 text-sm text-neon-violet"
                  >
                    <Loader2 className="h-4 w-4 animate-spin text-neon-violet" />
                    <span>Coordinating…</span>
                  </motion.div>
                )}
                <div ref={bottomRef} />
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </motion.div>
              )}

              {activeSuggestions.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeSuggestions.map((suggestion) => (
                    <motion.div key={suggestion} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                      <Button
                        variant="secondary"
                        disabled={isSending}
                        className="rounded-full px-3 py-1 text-xs border-blue-400/30 bg-blue-500/10 text-navy-800 hover:bg-blue-500/20"
                        onClick={() => handleSend(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="mt-4 rounded-lg border border-neon-cyan/20 bg-neon-100/30 p-4 neon-border">
                <div className="flex gap-3">
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
                    placeholder="Ask for help, try 'explore path' or describe what you want to learn..."
                    className="min-h-[56px] flex-1 resize-none rounded-lg border border-neon-cyan/50 bg-neon-100/70 px-4 py-3 text-base text-neon-text placeholder:text-neon-muted focus:border-neon-cyan focus:outline-none scrollbar-thin"
                  />
                  <CosmicButton onClick={() => handleSend()} disabled={isSending} className="h-[48px] min-w-[120px]">
                    {isSending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </CosmicButton>
                </div>
              </div>

              {recommendations.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-neon-cyan">
                    <TrendingUp className="h-4 w-4 text-neon-cyan" />
                    <span>Recommended next steps</span>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    {recommendations.map((item) => (
                      <NeonCard key={item.id} glow="cyan">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-base font-semibold text-neon-text">{item.title}</p>
                            <Badge variant="outline" className="capitalize bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50">
                              {item.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-neon-muted">{item.description}</p>
                          <CosmicButton variant="neon" className="w-full">
                            View in catalog
                          </CosmicButton>
                        </div>
                      </NeonCard>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </main>
      </div>
    </PageTransition>
  )
}

type ModeButtonProps = {
  value: 'visual' | 'auditory' | 'kinesthetic'
  register: UseFormRegister<FormValues>
  name: keyof FormValues
  label: string
}

const ModeButton = ({ value, register, name, label }: ModeButtonProps) => (
  <label className="cursor-pointer">
    <input type="radio" value={value} className="peer hidden" {...register(name)} />
    <div className="rounded-lg border border-neon-cyan/30 bg-neon-100/30 px-3 py-2 text-center text-xs font-medium text-neon-text transition peer-checked:border-neon-cyan peer-checked:bg-neon-cyan/20 peer-checked:text-neon-cyan peer-checked:neon-glow">
      {label}
    </div>
  </label>
)

export default InteractiveSessionPage
