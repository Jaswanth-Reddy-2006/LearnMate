import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Tag } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { api } from '../lib/api'

const CatalogPage = () => {
  const { data } = useQuery({ queryKey: ['catalog'], queryFn: api.getCatalog })

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Explore microlessons</h1>
          <p className="text-sm text-slate-400">Handpicked learning journeys curated by the multi-agent lesson planner.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline">Live AI generated</Badge>
          <Badge variant="outline">Moderated community</Badge>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data?.map((item) => (
          <Card key={item.id} className="h-full bg-slate-900/50">
            <div className="flex h-40 items-center justify-center rounded-2xl border border-slate-800 bg-gradient-to-br from-primary/30 via-transparent to-transparent">
              <span className="text-sm font-medium uppercase tracking-wider text-primary">{item.tags[0]}</span>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-400">{item.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="rounded-full border border-slate-700 px-3 py-1">{item.difficulty}</span>
                <span className="rounded-full border border-slate-700 px-3 py-1">{item.duration} min</span>
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <span>{item.tags.slice(0, 2).join(' · ')}</span>
                </div>
              </div>
              <Link to={`/lesson/${item.id}`} className="block">
                <Button className="w-full">Start lesson</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CatalogPage
