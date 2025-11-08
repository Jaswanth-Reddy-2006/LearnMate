import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Play, Users } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { api } from '../lib/api'

const CommunityPage = () => {
  const { data } = useQuery({ queryKey: ['videos'], queryFn: api.listVideos })
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null)

  const allTopics = useMemo(() => {
    if (!data) return []
    return Array.from(new Set(data.map((v) => v.topic))).sort()
  }, [data])

  const subtopicsForTopic = useMemo(() => {
    if (!data || !selectedTopic) return []
    return Array.from(new Set(data.filter((v) => v.topic === selectedTopic).map((v) => v.subtopic))).sort()
  }, [data, selectedTopic])

  const filtered = useMemo(() => {
    if (!data) return []
    let result = data
    if (selectedTopic) result = result.filter((v) => v.topic === selectedTopic)
    if (selectedSubtopic) result = result.filter((v) => v.subtopic === selectedSubtopic)
    return result
  }, [data, selectedTopic, selectedSubtopic])

  const handleResetFilters = () => {
    setSelectedTopic(null)
    setSelectedSubtopic(null)
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <Users className="h-3.5 w-3.5" />
            Peer learning spotlight
          </div>
          <h1 className="text-3xl font-bold text-white">Community explainers</h1>
          <p className="text-sm text-slate-400">Watch explainers recorded by fellow learners. Every upload passes automated and human review.</p>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:flex-1">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-300 mb-2">Topic / Skill</label>
              <select
                value={selectedTopic || ''}
                onChange={(e) => {
                  setSelectedTopic(e.target.value || null)
                  setSelectedSubtopic(null)
                }}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none"
              >
                <option value="">All Topics</option>
                {allTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-300 mb-2">Sub-topic</label>
              <select
                value={selectedSubtopic || ''}
                onChange={(e) => setSelectedSubtopic(e.target.value || null)}
                disabled={!selectedTopic}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-primary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">All Sub-topics</option>
                {subtopicsForTopic.map((subtopic) => (
                  <option key={subtopic} value={subtopic}>
                    {subtopic}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" onClick={handleResetFilters}>
              Clear filters
            </Button>
            <Button variant="primary" onClick={() => {}}>
              All videos
            </Button>
          </div>
        </div>
      </div>

      <div className="text-sm text-slate-400">
        {data?.length ?? 0} total peer lessons · {filtered.length} in view
      </div>
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

export default CommunityPage
