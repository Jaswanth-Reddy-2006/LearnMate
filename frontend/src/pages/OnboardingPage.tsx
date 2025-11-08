import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { UseFormRegister } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { api } from '../lib/api'
import { useSessionState } from '../hooks/sessionState'

const schema = z.object({
  subject: z.string().min(2),
  timeframe: z.string().min(1),
  dailyMinutes: z.number().min(10).max(240),
  mode: z.enum(['visual', 'auditory', 'kinesthetic']),
  goal: z.string().min(10),
})

type FormValues = z.infer<typeof schema>

const OnboardingPage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [, setSession] = useSessionState()
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

  const onSubmit = async (values: FormValues) => {
    setLoading(true)
    try {
      const session = await api.createSession(values.subject)
      setSession(session)
      navigate('/agent')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-surface via-slate-950 to-black px-4 py-10 text-slate-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-400/10 rounded-full blur-3xl" />
      </div>
      <Card className="w-full max-w-4xl bg-slate-950/70 border border-slate-800/70 relative z-10">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Badge className="bg-primary/20 text-primary border-primary/30">Adaptive onboarding</Badge>
            <h2 className="mt-4 text-3xl font-bold text-white">Tell LearnMate how you like to learn.</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              The coordinator agent will orchestrate lesson planning, teaching, emotion feedback, and quizzes tuned to your preferences.
            </p>
          </div>
          <div className="rounded-2xl border border-primary/30 bg-primary/10 px-6 py-4 text-right">
            <p className="text-sm uppercase tracking-wide text-primary">Live session orchestration</p>
            <p className="text-2xl font-semibold text-white">Ready in under 5 seconds</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Focus subject</label>
            <input
              {...register('subject')}
              className="w-full rounded-xl border border-slate-800/70 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-primary/50 focus:outline-none"
            />
            {errors.subject && <p className="text-xs text-red-300">{errors.subject.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Target timeframe</label>
            <select
              {...register('timeframe')}
              className="w-full rounded-xl border border-slate-800/70 bg-slate-950/70 px-4 py-3 text-sm text-white focus:border-primary/50 focus:outline-none"
            >
              <option value="1 week">1 week</option>
              <option value="2 weeks">2 weeks</option>
              <option value="1 month">1 month</option>
              <option value="custom">Custom</option>
            </select>
            {errors.timeframe && <p className="text-xs text-red-300">{errors.timeframe.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Daily commitment (minutes)</label>
            <input
              type="number"
              {...register('dailyMinutes', { valueAsNumber: true })}
              className="w-full rounded-xl border border-slate-800/70 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-primary/50 focus:outline-none"
            />
            {errors.dailyMinutes && <p className="text-xs text-red-300">{errors.dailyMinutes.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Preferred learning style</label>
            <div className="grid grid-cols-3 gap-3">
              <ModeButton value="visual" register={register} name="mode" label="Visual" />
              <ModeButton value="auditory" register={register} name="mode" label="Auditory" />
              <ModeButton value="kinesthetic" register={register} name="mode" label="Hands-on" />
            </div>
            {errors.mode && <p className="text-xs text-red-300">{errors.mode.message}</p>}
          </div>
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-slate-300">What do you want to achieve?</label>
            <textarea
              {...register('goal')}
              rows={4}
              className="mt-2 w-full rounded-xl border border-slate-800/70 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-primary/50 focus:outline-none"
            />
            {errors.goal && <p className="text-xs text-red-300">{errors.goal.message}</p>}
          </div>
          <Button type="submit" isLoading={loading} className="lg:col-span-2">
            {loading ? 'Orchestrating session...' : 'Launch personalised plan'}
          </Button>
        </form>
      </Card>
    </div>
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
    <div className="rounded-xl border border-slate-800/70 bg-slate-950/70 px-4 py-3 text-center text-sm text-slate-400 transition peer-checked:border-primary/60 peer-checked:bg-primary/20 peer-checked:text-white">
      {label}
    </div>
  </label>
)

export default OnboardingPage
