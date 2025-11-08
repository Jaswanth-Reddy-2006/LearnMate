import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Play, Users } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { api } from '../lib/api'

type FilterState = 'all' | 'published' | 'pending' | 'flagged'

type Breakdown = Record<FilterState, number>

const CommunityPage = () => {
  const { data } = useQuery({ queryKey: ['videos'], queryFn: api.listVideos })
  const [filter, setFilter] = useState<FilterState>('all')

  const breakdown = useMemo<Breakdown>(() => {
    const collection = data ?? []
    return {
      all: collection.length,
      published: collection.filter((video) => video.status === 'published').length,
      pending: collection.filter((video) => video.status === 'pending').length,
      flagged: collection.filter((video) => video.status === 'flagged').length,
    }
  }, [data])

  const filtered = useMemo(() => {
    if (!data) return []
    if (filter === 'all') return data
    return data.filter((video) => video.status === filter)
  }, [data, filter])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-950/70 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <Users className="h-3.5 w-3.5" />
            Peer learning spotlight
          </div>
          <h1 className="text-3xl font-bold text-white">Community explainers</h1>
          <p className="text-sm text-slate-400">Watch explainers recorded by fellow learners. Every upload passes automated and human review.</p>
        </div>
        <div className="grid w-full gap-2 sm:auto-cols-max sm:grid-flow-col">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')} badge={breakdown.all}>
            All videos
          </FilterButton>
          <FilterButton active={filter === 'published'} onClick={() => setFilter('published')} badge={breakdown.published}>
            Published
          </FilterButton>
          <FilterButton active={filter === 'pending'} onClick={() => setFilter('pending')} badge={breakdown.pending}>
            Pending review
          </FilterButton>
          <FilterButton active={filter === 'flagged'} onClick={() => setFilter('flagged')} badge={breakdown.flagged}>
            Flagged
          </FilterButton>
        </div>
      </div>
      <div className="text-sm text-slate-400">{breakdown.all} total peer lessons · {filtered.length} in view</div>
      {filtered.length === 0 ? (
        <Card className="flex h-48 flex-col items-center justify-center bg-slate-900/50 text-center text-sm text-slate-400">
          <p>No videos match this filter yet. Invite learners to contribute their walkthroughs.</p>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((video) => (
            <Card key={video.id} className="bg-slate-900/50">
              <div className="relative">
                <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-800">
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/30 via-transparent to-transparent">
                    <Play className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <Badge className="absolute left-4 top-4 capitalize">{video.status}</Badge>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-white">{video.title}</p>
                  <span className="rounded-full border border-slate-800 px-3 py-1 text-xs text-slate-400">{video.duration}s</span>
                </div>
                <p className="text-sm text-slate-400">{video.author} · {video.tags.join(' · ')}</p>
                <p className="text-sm text-slate-500 line-clamp-3">{video.transcript}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

type FilterButtonProps = {
  active: boolean
  onClick: () => void
  children: ReactNode
  badge: number
}

const FilterButton = ({ active, onClick, children, badge }: FilterButtonProps) => (
  <Button variant={active ? 'primary' : 'ghost'} onClick={onClick} className="min-w-[140px] justify-between">
    <span>{children}</span>
    <span className="rounded-full bg-slate-900/70 px-2 py-0.5 text-xs">{badge}</span>
  </Button>
)

export default CommunityPage
