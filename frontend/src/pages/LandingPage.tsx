import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api } from '../lib/api'

type ChatMessage = {
  id: string
  role: 'agent' | 'learner'
  author: string
  content: string
}

const navigationItems = [
  { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
  { label: 'Learn', path: '/learn', icon: 'school' },
  { label: 'Catalog', path: '/catalog', icon: 'collections_bookmark' },
  { label: 'Lesson Player', path: '/lesson/loop-fundamentals', icon: 'play_circle' },
  { label: 'Quiz Lab', path: '/quiz/loop-fundamentals', icon: 'science' },
  { label: 'Community', path: '/community', icon: 'groups' },
  { label: 'Video Studio', path: '/studio', icon: 'video_camera_front' },
  { label: 'Profile', path: '/profile', icon: 'account_circle' },
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
      } catch {
        // Error handling removed for simplified UI
      }
    },
    [chatMutation, input],
  )

  const isSending = chatMutation.isPending
  const activeSuggestions = useMemo(() => quickReplies.slice(0, 3), [quickReplies])

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark font-display text-on-surface-light dark:text-on-surface-dark antialiased">
      <aside className="w-80 bg-background-light dark:bg-background-dark p-6 flex-shrink-0 hidden lg:flex flex-col">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-primary/20 dark:bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-primary font-bold text-xl">LM</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-on-surface-light dark:text-on-surface-dark">LEARNMATE.AI</p>
            <h1 className="text-lg font-bold text-on-surface-light dark:text-on-surface-dark">Conversational tutor</h1>
          </div>
        </div>
        <nav className="flex-grow space-y-2">
          <a className="block p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark" href="#">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-primary font-semibold">•</span>
              <h2 className="font-bold text-on-surface-light dark:text-on-surface-dark">Live multi-agent desk</h2>
            </div>
            <p className="text-sm text-on-surface-secondary-light dark:text-on-surface-secondary-dark">Request plans, quizzes, and peer mentors — the coordinator stitches the right sequence instantly.</p>
          </a>
          {navigationItems.map((item) => (
            <Link key={item.label} to={item.path} className="flex items-center gap-3 p-3 text-on-surface-secondary-light dark:text-on-surface-secondary-dark hover:bg-surface-light dark:hover:bg-surface-dark rounded-lg">
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-semibold">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <Link to="/profile" className="flex items-center gap-3 p-3 text-on-surface-secondary-light dark:text-on-surface-secondary-dark hover:bg-surface-light dark:hover:bg-surface-dark rounded-lg">
            <span className="material-symbols-outlined">account_circle</span>
            <span className="font-semibold">Profile</span>
          </Link>
        </div>
      </aside>
      <main className="flex-1 bg-surface-light dark:bg-surface-dark flex flex-col h-screen">
        <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
          <header className="p-4 sm:p-6 sticky top-0 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-sm z-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-on-surface-light dark:text-on-surface-dark">Agent Coordination Chat</h2>
                <p className="text-on-surface-secondary-light dark:text-on-surface-secondary-dark mt-1">Describe your goal and the orchestrator assembles lessons, quizzes, and community support automatically.</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary border border-primary/50 rounded-full">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  REAL-TIME ORCHESTRATION
                </span>
              </div>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="flex"
                >
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 dark:bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {message.author.charAt(0)}
                    </div>
                  </div>
                  <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg rounded-tl-none max-w-lg">
                    <p className="text-xs font-bold uppercase tracking-wider text-on-surface-secondary-light dark:text-on-surface-secondary-dark mb-2">{message.author}</p>
                    <p className="text-on-surface-light dark:text-on-surface-dark">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              {isSending && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex"
                >
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 dark:bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">A</div>
                  </div>
                  <div className="bg-background-light dark:bg-background-dark p-4 rounded-lg rounded-tl-none max-w-lg">
                    <p className="text-xs font-bold uppercase tracking-wider text-on-surface-secondary-light dark:text-on-surface-secondary-dark mb-2">AURORA MENTOR</p>
                    <p className="text-on-surface-light dark:text-on-surface-dark">Coordinating...</p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          <div className="p-4 sm:p-6 bg-surface-light dark:bg-surface-dark sticky bottom-0">
            {activeSuggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    disabled={isSending}
                    className="px-4 py-2 text-sm font-medium bg-background-light dark:bg-background-dark text-on-surface-light dark:text-on-surface-dark rounded-lg hover:bg-border-light dark:hover:bg-border-dark transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            <div className="relative bg-background-light dark:bg-background-dark rounded-lg p-2 border border-transparent focus-within:border-primary/50 transition-colors">
              <label className="sr-only" htmlFor="chat-input">Describe the skill, project, or interview you want to tackle...</label>
              <textarea
                id="chat-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    void handleSend()
                  }
                }}
                placeholder="Describe the skill, project, or interview you want to tackle..."
                rows={1}
                className="w-full bg-transparent border-none resize-none p-2 pr-28 focus:ring-0 text-on-surface-light dark:text-on-surface-dark placeholder:text-on-surface-secondary-light dark:placeholder:text-on-surface-secondary-dark"
                style={{ minHeight: 'auto', height: 'auto' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = 'auto'
                  target.style.height = `${Math.max(56, target.scrollHeight)}px`
                }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button className="p-2 rounded-md text-on-surface-secondary-light dark:text-on-surface-secondary-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
                  <span className="material-symbols-outlined text-xl">mic</span>
                  <span className="sr-only">Use microphone</span>
                </button>
                <button
                  onClick={() => handleSend()}
                  disabled={isSending}
                  className="flex items-center justify-center gap-2 w-24 h-10 bg-primary text-slate-900 rounded-md font-semibold hover:opacity-90 transition-opacity"
                >
                  <span className="material-symbols-outlined text-lg">send</span>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LandingPage
