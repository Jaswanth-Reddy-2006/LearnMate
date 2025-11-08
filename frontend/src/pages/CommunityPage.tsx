import { useState } from 'react'
import type { ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Play } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { api } from '../lib/api'

const CommunityPage = () => {
  const { data } = useQuery({ queryKey: ['videos'], queryFn: api.listVideos })
  const [filter, setFilter] = useState<'all' | 'published' | 'pending'>('all')

  const filtered = data?.filter((video) => (filter === 'all' ? true : video.status === filter)) ?? []

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Peer video library</h1>
          <p className="text-sm text-slate-400">Watch explainers recorded by fellow learners. Every upload passes automated moderation.</p>
        </div>
        <div className="flex items-center gap-3">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterButton>
          <FilterButton active={filter === 'published'} onClick={() => setFilter('published')}>
            Published
          </FilterButton>
          <FilterButton active={filter === 'pending'} onClick={() => setFilter('pending')}>
            Pending review
          </FilterButton>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((video) => (
          <Card key={video.id} className="bg-slate-900/50">
            <div className="relative">
              <div className="aspect-video w-full overflow-hidden rounded-2xl border border-slate-800">
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/30 via-transparent to-transparent">
                  <Play className="h-10 w-10 text-primary" />
                </div>
              </div>
              <Badge className="absolute left-4 top-4">{video.status}</Badge>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-lg font-semibold text-white">{video.title}</p>
              <p className="text-sm text-slate-400">{video.author} · {video.duration}s</p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                {video.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-slate-700 px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

type FilterButtonProps = {
  active: boolean
  onClick: () => void
  children: ReactNode
}

const FilterButton = ({ active, onClick, children }: FilterButtonProps) => (
  <Button variant={active ? 'primary' : 'ghost'} onClick={onClick} className="min-w-[120px]">
    {children}
  </Button>
)

export default CommunityPage
