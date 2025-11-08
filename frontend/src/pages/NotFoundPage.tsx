import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div className="rounded-full border border-primary/30 bg-primary/10 px-6 py-2 text-sm uppercase tracking-wide text-primary">
        404
      </div>
      <h1 className="text-3xl font-bold text-white">We could not find that page.</h1>
      <p className="max-w-md text-sm text-slate-400">Navigate back to your dashboard to continue the personalised learning experience.</p>
      <Link to="/dashboard">
        <Button>Back to dashboard</Button>
      </Link>
    </div>
  )
}

export default NotFoundPage
