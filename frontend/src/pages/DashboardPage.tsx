import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { progressApi, api } from '../lib/api'
import { useSessionState } from '../hooks/sessionState'

const DashboardPage = () => {
  const navigate = useNavigate()
  const [session] = useSessionState()

  useEffect(() => {
    if (!session) {
      navigate('/onboarding', { replace: true })
    }
  }, [session, navigate])

  const { data: snapshot } = useQuery({ queryKey: ['progress-snapshot'], queryFn: progressApi.getSnapshot })
  const { data: timeline } = useQuery({ queryKey: ['progress-timeline'], queryFn: progressApi.getTimeline })
  const { data: videos } = useQuery({ queryKey: ['community-videos'], queryFn: api.listVideos })

  if (!session) {
    return null
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Badge>Welcome back</Badge>
          <h1 className="mt-4 text-3xl font-bold text-white">{session.lessonPlan.topic}</h1>
          <p className="mt-2 max-w-xl text-sm text-slate-400">
            The coordinator has prepared {session.lessonPlan.microlessons.length} microlessons. Continue where you left off or explore community insights.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Link to={`/lesson/${session.activeLessonId}`}>
            <Button>Resume lesson</Button>
          </Link>
          <Link to="/catalog">
            <Button variant="ghost">Browse catalog</Button>
          </Link>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card title="Mastery overview" description="Bayesian progress tracking across targeted skills." className="h-full">
          <div className="grid gap-6 lg:grid-cols-3">
            <Metric value={`${snapshot?.mastery ?? 0}%`} label="Mastery" trend="vs last session" />
            <Metric value={`${snapshot?.lessonCompletionRate ?? 0}%`} label="Lesson completion" trend="completed" />
            <Metric value={`${snapshot?.streak ?? 0} days`} label="Learning streak" trend="active" />
          </div>
          <div className="mt-8 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeline ?? []}>
                <defs>
                  <linearGradient id="colorMastery" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5B5BEF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#5B5BEF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1f2937', borderRadius: 12, color: '#e2e8f0' }}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Area type="monotone" dataKey="value" stroke="#5B5BEF" fillOpacity={1} fill="url(#colorMastery)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Upcoming micro-lessons" description="What the lesson planner queued next." className="h-full">
          <div className="space-y-4">
            {session.lessonPlan.microlessons.map((micro) => (
              <div key={micro.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white">{micro.title}</p>
                    <p className="text-xs text-slate-400">{micro.objectives.join(', ')}</p>
                  </div>
                  <Badge variant="outline">{micro.timeEstimate} min</Badge>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                  <span>Bloom: {micro.bloomLevel}</span>
                  <span>Quiz: {micro.recommendedQuiz ? 'Yes' : 'After feedback'}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card title="Community explainers" description="Peer generated videos aligned to your plan.">
          <div className="grid gap-4 sm:grid-cols-2">
            {videos?.slice(0, 4).map((video) => (
              <Link key={video.id} to="/community" className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition hover:border-primary/50">
                <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-primary/30 via-transparent to-transparent" />
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/30" />
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-primary">{video.title}</p>
                    <p className="text-xs text-slate-400">{video.author}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
        <Card title="Emotion insights" description="Signals collected during the last lesson">
          <div className="space-y-4">
            <Insight label="Frustration" value="Low" detail="Short breaks reduced stress indicators." />
            <Insight label="Engagement" value="High" detail="Prompt response time indicates focus." />
            <Insight label="Confidence" value="Building" detail="Correct first attempts increased 18%." />
          </div>
        </Card>
      </div>
    </div>
  )
}

const Metric = ({ value, label, trend }: { value: string; label: string; trend: string }) => (
  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
    <p className="text-2xl font-semibold text-white">{value}</p>
    <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
    <p className="mt-1 text-xs text-slate-500">{trend}</p>
  </div>
)

const Insight = ({ label, value, detail }: { label: string; value: string; detail: string }) => (
  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-white">{label}</p>
      <Badge variant="outline">{value}</Badge>
    </div>
    <p className="mt-2 text-xs text-slate-400">{detail}</p>
  </div>
)

export default DashboardPage
