import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-slate-950 to-black text-slate-100">
      <div className="flex flex-col overflow-hidden">
        <header className="px-6 py-6 sm:px-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <span className="text-2xl font-bold">LM</span>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide text-slate-400">LearnMate.AI</p>
                <p className="text-lg font-semibold">Multi-Agent Tutor</p>
              </div>
            </div>
            <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
              <Link to="/catalog" className="transition hover:text-white">
                Catalog
              </Link>
              <Link to="/community" className="transition hover:text-white">
                Community
              </Link>
              <Link to="/dashboard" className="transition hover:text-white">
                Dashboard
              </Link>
              <Link to="/studio" className="transition hover:text-white">
                Studio
              </Link>
            </nav>
            <div className="hidden md:block">
              <Link to="/onboarding">
                <Button>Start Learning</Button>
              </Link>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <section className="relative px-6 pb-24 pt-10 sm:px-10">
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(91,91,239,0.15),_transparent_55%)]" />
              <div className="absolute left-1/3 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            </div>
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="space-y-8"
                >
                  <BadgeHero />
                  <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                    Personalised micro-lessons crafted in real time by specialised AI mentors.
                  </h1>
                  <p className="max-w-xl text-lg text-slate-300">
                    LearnMate orchestrates lesson planners, teaching strategists, quiz builders, and emotion-aware coaches so every learner receives a high-touch experience matched to their goals and pace.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link to="/onboarding">
                      <Button className="px-6 py-3 text-base">Launch adaptive journey</Button>
                    </Link>
                    <Link to="/catalog">
                      <Button variant="ghost" className="px-6 py-3 text-base">
                        Browse catalog
                      </Button>
                    </Link>
                  </div>
                  <div className="grid gap-4 pt-10 sm:grid-cols-3">
                    <StatBlock value="92%" label="Mastery completion" />
                    <StatBlock value="12m" label="Average session" />
                    <StatBlock value="8.7/10" label="Learner delight" />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                  className="space-y-6"
                >
                  <Card title="Agent collaboration" description="Six specialists coordinate around each learner in milliseconds." className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
                    <div className="grid gap-3">
                      <AgentRow title="Lesson Planner" detail="Builds microlesson roadmaps aligned to Bloom levels." status="Active" />
                      <AgentRow title="Teaching" detail="Explains concepts with multimodal assets." status="Responding" />
                      <AgentRow title="Quiz" detail="Adapts assessments after each interaction." status="Queued" />
                      <AgentRow title="Emotion" detail="Detects frustration and adjusts tone." status="Monitoring" />
                      <AgentRow title="Progress" detail="Updates Bayesian mastery models instantly." status="Syncing" />
                    </div>
                  </Card>
                  <Card title="Community spotlight" description="Peer-created explainers unlock perspectives you trust." className="bg-slate-900/60">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-slate-300">
                        <span>Loops visualised in 90 seconds</span>
                        <span className="text-slate-400">Top explorer</span>
                      </div>
                      <div className="h-40 rounded-xl bg-gradient-to-br from-primary/30 via-primary/10 to-transparent" />
                      <p className="text-sm text-slate-400">
                        Watch student explainers, leave inline comments, and level up together. Moderation safeguards keep the space welcoming and safe.
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>
          <section className="border-t border-slate-800 bg-slate-950/60 px-6 py-20 sm:px-10">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <Pillar title="Adaptive microlessons" body="Dynamic content generation with real-time emotion awareness and modality toggles." />
                <Pillar title="Integrated sandbox" body="Run code, annotate snippets, and attach peer videos without leaving the lesson." />
                <Pillar title="Secure community" body="Multi-layer moderation with AI screening and human review for every submission." />
                <Pillar title="Analytics ready" body="Dashboards, retention curves, and spaced repetition schedules for tutors and learners." />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

const Pillar = ({ title, body }: { title: string; body: string }) => {
  return (
    <Card className="h-full bg-slate-900/40" title={title}>
      <p className="text-sm text-slate-400">{body}</p>
    </Card>
  )
}

const StatBlock = ({ value, label }: { value: string; label: string }) => (
  <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-center">
    <p className="text-3xl font-bold text-white">{value}</p>
    <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
  </div>
)

const AgentRow = ({ title, detail, status }: { title: string; detail: string; status: string }) => (
  <div className="flex items-center justify-between rounded-xl border border-slate-800/70 bg-slate-900/60 px-4 py-3">
    <div>
      <p className="text-sm font-medium text-white">{title}</p>
      <p className="text-xs text-slate-400">{detail}</p>
    </div>
    <span className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">{status}</span>
  </div>
)

const BadgeHero = () => (
  <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-medium uppercase tracking-wide text-primary">
    Real-time multi-agent tutoring
  </span>
)

export default LandingPage
