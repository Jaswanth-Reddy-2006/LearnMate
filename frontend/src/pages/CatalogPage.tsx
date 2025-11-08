import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useLocation } from 'react-router-dom'
import { Tag, Layers, BarChart3, Sparkles, Calendar } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { api } from '../lib/api'

type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced'

const difficulties: Array<{ label: string; value: DifficultyFilter }> = [
  { label: 'All', value: 'all' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
]

const CatalogPage = () => {
  const { data } = useQuery({ queryKey: ['catalog'], queryFn: api.getCatalog })
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all')
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const queryParam = params.get('q')
    const difficultyParam = params.get('difficulty')
    if (queryParam) {
      setSearch(queryParam)
    }
    if (difficultyParam === 'beginner' || difficultyParam === 'intermediate' || difficultyParam === 'advanced') {
      setDifficulty(difficultyParam)
    }
  }, [location.search])

  const skillCount = data?.length ?? 0

  const difficultyBreakdown = useMemo(() => {
    if (!data) {
      return { beginner: 0, intermediate: 0, advanced: 0 }
    }
    return data.reduce(
      (acc, item) => {
        acc[item.difficulty] += 1
        return acc
      },
      { beginner: 0, intermediate: 0, advanced: 0 },
    )
  }, [data])

  const topTags = useMemo(() => {
    if (!data) {
      return []
    }
    const counts = new Map<string, number>()
    data.forEach((item) => {
      item.tags.forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1))
    })
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([tag, count]) => ({ tag, count }))
  }, [data])

  const updatedFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      }),
    [],
  )

  const filtered = useMemo(() => {
    if (!data) return []
    return data.filter((item) => {
      const matchesDifficulty = difficulty === 'all' || item.difficulty === difficulty
      const query = search.trim().toLowerCase()
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query))
      return matchesDifficulty && matchesQuery
    })
  }, [data, search, difficulty])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <Layers className="h-3.5 w-3.5" />
            {skillCount > 0 ? `${skillCount} adaptive skills` : 'Loading catalog'}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Explore microlessons</h1>
            <p className="text-sm text-slate-400">Handpicked learning journeys curated by the multi-agent lesson planner.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Badge variant="outline">Live AI generated</Badge>
            <Badge variant="outline">Moderated community</Badge>
            <Badge variant="outline">Progress synced</Badge>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:min-w-[280px]">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search skills, tags, or outcomes"
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-primary/50 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            {difficulties.map((item) => (
              <Button
                key={item.value}
                variant={difficulty === item.value ? 'primary' : 'ghost'}
                className="px-4"
                onClick={() => setDifficulty(item.value)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {skillCount > 0 && (
        <div className="grid gap-4 rounded-3xl border border-slate-800/70 bg-slate-950/50 p-6 sm:grid-cols-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs uppercase tracking-wide text-primary/80">Catalog depth</span>
            </div>
            <p className="text-3xl font-semibold text-white">{skillCount}</p>
            <p className="text-sm text-slate-400">Adaptive journeys ready to launch.</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-300">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="text-xs uppercase tracking-wide text-primary/80">Difficulty mix</span>
            </div>
            <div className="grid gap-2 text-sm text-slate-300">
              <span>Beginner · {difficultyBreakdown.beginner}</span>
              <span>Intermediate · {difficultyBreakdown.intermediate}</span>
              <span>Advanced · {difficultyBreakdown.advanced}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-300">
              <Tag className="h-4 w-4 text-primary" />
              <span className="text-xs uppercase tracking-wide text-primary/80">Trending tags</span>
            </div>
            {topTags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {topTags.map((entry) => (
                  <span key={entry.tag} className="rounded-full border border-slate-800 px-3 py-1 text-xs text-slate-300">
                    {entry.tag} · {entry.count}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500">Tags surface as the catalog loads.</p>
            )}
          </div>
        </div>
      )}
      <div className="text-base text-slate-400">Showing {filtered.length} of {skillCount} learning paths</div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => {
          const lastUpdated = updatedFormatter.format(new Date(item.lastUpdated))
          return (
            <Card key={item.id} className="flex h-full flex-col overflow-hidden bg-slate-900/60 p-0">
              <div className="relative h-40 w-full">
                <img src={item.coverImage} alt={`${item.title} cover art`} className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-slate-950/90 to-transparent px-5 pb-4">
                  <Badge className="capitalize" variant="default">{item.difficulty}</Badge>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>Updated {lastUpdated}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white">{item.title}</h2>
                  <p className="text-base text-slate-300">{item.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                  <span className="rounded-full border border-slate-800/80 px-3 py-1">{item.duration} min sprint</span>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-primary" />
                    <span>{item.tags.slice(0, 3).join(' · ')}</span>
                  </div>
                </div>
                <Link to={`/lesson/${item.id}`} className="mt-auto block">
                  <Button className="w-full">Start lesson</Button>
                </Link>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default CatalogPage
