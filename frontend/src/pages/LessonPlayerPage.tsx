import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { EditorView } from '@codemirror/view'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { motion } from 'framer-motion'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { api } from '../lib/api'
import { useSessionState } from '../hooks/sessionState'

const LessonPlayerPage = () => {
  const { lessonId = '' } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [session] = useSessionState()
  const [code, setCode] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)

  const { data: content } = useQuery({ queryKey: ['lesson', lessonId], queryFn: () => api.getLessonContent(lessonId), enabled: !!lessonId })
  const { data: plan } = useQuery({ queryKey: ['lesson-plan', lessonId], queryFn: () => api.getLessonPlan(lessonId), enabled: !!lessonId })

  const coachMutation = useMutation({
    mutationFn: () =>
      api.dispatchAgent({
        sessionId: session?.sessionId || 'demo-session',
        turnId: Date.now(),
        from: 'Learner',
        to: ['TeachingAgent'],
        type: 'code_feedback',
        payload: { code, lessonId },
      }),
    onSuccess: (data) => {
      setFeedback(data.feedback ?? null)
    },
  })

  const completeMutation = useMutation({
    mutationFn: async () => {
      await api.updateLessonCompletion(lessonId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress-snapshot'] })
      navigate(`/quiz/${lessonId}`)
    },
  })

  if (!content) {
    return null
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Badge>Lesson experience</Badge>
          <h1 className="mt-4 text-3xl font-bold text-white">{content.title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">{plan?.microlessons.find((m) => m.id === lessonId)?.objectives.join(' · ')}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/catalog">
            <Button variant="ghost">Catalog</Button>
          </Link>
          <Button onClick={() => completeMutation.mutate()} isLoading={completeMutation.isPending}>
            Mark complete & launch quiz
          </Button>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card title="Guided explanation" description="Teaching agent output">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content.body }}
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {content.followUps.map((item) => (
              <div key={item} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </Card>
        <Card title="Emotion & hinting" description="Lesson coordinator insights">
          <div className="space-y-4">
            {content.hints.map((hint) => (
              <div key={hint} className="rounded-xl border border-primary/30 bg-primary/10 p-4 text-xs text-primary">
                {hint}
              </div>
            ))}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-400">
              Adaptive pacing enabled. Emotion agent will nudge if response latency spikes.
            </div>
          </div>
        </Card>
      </div>
      {content.codeExample && (
        <Card title="Code workspace" description="Experiment with the microlesson example.">
          <CodeMirror
            value={code || content.codeExample}
            height="320px"
            extensions={[javascript(), python(), EditorView.lineWrapping]}
            theme="dark"
            onChange={(value) => setCode(value)}
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={() => coachMutation.mutate()} isLoading={coachMutation.isPending}>
              Get coach feedback
            </Button>
            {feedback && <Badge variant="outline">{feedback}</Badge>}
          </div>
        </Card>
      )}
      <Card title="Microlesson flow" description="You're currently here.">
        <div className="flex flex-wrap gap-4">
          {plan?.microlessons.map((micro) => (
            <div
              key={micro.id}
              className={`relative flex flex-col rounded-2xl border px-5 py-4 text-sm ${
                micro.id === lessonId ? 'border-primary bg-primary/10 text-white' : 'border-slate-800 bg-slate-900/60 text-slate-300'
              }`}
            >
              <span className="text-xs uppercase tracking-wide text-slate-500">{micro.bloomLevel}</span>
              <span className="mt-2 font-semibold">{micro.title}</span>
              <span className="mt-4 text-xs text-slate-400">{micro.timeEstimate} min</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default LessonPlayerPage
