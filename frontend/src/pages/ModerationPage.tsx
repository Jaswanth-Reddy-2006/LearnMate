import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ShieldAlert } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { api } from '../lib/api'

const ModerationPage = () => {
  const queryClient = useQueryClient()
  const { data } = useQuery({ queryKey: ['moderation'], queryFn: api.getModerationQueue })

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'resolved' | 'open' }) => api.resolveModeration(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['moderation'] }),
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Moderation queue</h1>
          <p className="text-sm text-slate-400">Automated filters surface potential issues for human review.</p>
        </div>
        <Badge variant="outline">{data?.length ?? 0} items</Badge>
      </div>
      <div className="grid gap-6">
        {data?.map((item) => (
          <Card key={item.id} className="bg-slate-900/60">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Video {item.videoId}</p>
                  <p className="text-xs text-slate-400">{item.reason}</p>
                  <p className="text-xs text-slate-500">Severity: {item.severity}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline">{item.status}</Badge>
                <Button
                  variant="ghost"
                  onClick={() => mutation.mutate({ id: item.id, status: item.status === 'resolved' ? 'open' : 'resolved' })}
                  isLoading={mutation.isPending}
                >
                  {item.status === 'resolved' ? 'Reopen' : 'Resolve'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ModerationPage
