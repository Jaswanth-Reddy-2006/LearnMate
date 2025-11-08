import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { useSessionState } from '../hooks/sessionState'

const ProfilePage = () => {
  const [session] = useSessionState()

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Learner profile</h1>
          <p className="text-sm text-slate-400">Control preferences shared with the coordinator agent and teaching team.</p>
        </div>
        <Button variant="ghost">Download data export</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="Identity" className="bg-slate-900/60">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-accent" />
            <div>
              <p className="text-lg font-semibold text-white">Avery Quinn</p>
              <p className="text-sm text-slate-400">avery.quinn@example.com</p>
            </div>
          </div>
          <div className="mt-6 grid gap-2 text-sm text-slate-400">
            <span>Timezone: GMT+5:30</span>
            <span>Language: English</span>
            <span>Role: Learner</span>
          </div>
        </Card>
        <Card title="Learning configuration" className="bg-slate-900/60">
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <span>Target topic</span>
              <Badge variant="outline">{session?.lessonPlan.topic ?? 'Not set'}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Daily commitment</span>
              <span>30 minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Preferred mode</span>
              <Badge variant="outline">Visual</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Progress notifications</span>
              <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">Weekly digest</span>
            </div>
          </div>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card title="Consent & privacy" className="bg-slate-900/60">
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center justify-between">
              <span>Emotion analysis</span>
              <Badge variant="success">Opted in</Badge>
            </li>
            <li className="flex items-center justify-between">
              <span>Peer video publishing</span>
              <Badge variant="success">Enabled</Badge>
            </li>
            <li className="flex items-center justify-between">
              <span>Analytics sharing</span>
              <Badge variant="outline">Class cohort only</Badge>
            </li>
          </ul>
        </Card>
        <Card title="Security" className="bg-slate-900/60">
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <span>Two-factor authentication</span>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Last login</span>
              <span>2 hours ago</span>
            </div>
            <Button className="w-full" variant="secondary">
              Manage sessions
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ProfilePage
