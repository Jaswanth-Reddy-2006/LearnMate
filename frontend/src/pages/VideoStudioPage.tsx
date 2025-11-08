import { useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { api } from '../lib/api'

const VideoStudioPage = () => {
  const queryClient = useQueryClient()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [chunks, setChunks] = useState<Blob[]>([])
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [recording, setRecording] = useState(false)
  const [timer, setTimer] = useState(0)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: 'Explaining loop invariants',
      lessonId: 'loop-fundamentals',
      transcript: '',
      tags: 'loops,python,iteration',
    },
  })

  useEffect(() => {
    let activeStream: MediaStream | null = null
    const init = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        activeStream = userStream
        setStream(userStream)
        if (videoRef.current) {
          videoRef.current.srcObject = userStream
        }
      } catch (error) {
        console.error(error)
      }
    }
    init()
    return () => {
      activeStream?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  useEffect(() => {
    let interval: number | null = null
    if (recording) {
      interval = window.setInterval(() => setTimer((prev) => prev + 1), 1000)
    } else {
      if (interval) {
        window.clearInterval(interval)
      }
    }
    return () => {
      if (interval) {
        window.clearInterval(interval)
      }
    }
  }, [recording])

  const mutation = useMutation({
    mutationFn: api.uploadVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] })
      reset()
      setPreviewUrl(null)
    },
  })

  const startRecording = () => {
    if (!stream) return
    const recorder = new MediaRecorder(stream)
    mediaRecorderRef.current = recorder
    const recorded: Blob[] = []
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recorded.push(event.data)
      }
    }
    recorder.onstop = () => {
      const blob = new Blob(recorded, { type: 'video/webm' })
      setChunks(recorded)
      const url = URL.createObjectURL(blob)
      setPreviewUrl(url)
    }
    recorder.start()
    setRecording(true)
    setTimer(0)
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    setRecording(false)
  }

  const onSubmit = async (values: { title: string; lessonId: string; transcript: string; tags: string }) => {
    if (!chunks.length) return
    const blob = new Blob(chunks, { type: 'video/webm' })
    const arrayBuffer = await blob.arrayBuffer()
    const bytes = new Uint8Array(arrayBuffer)
    let binary = ''
    bytes.forEach((b) => {
      binary += String.fromCharCode(b)
    })
    const base64 = window.btoa(binary)
    await mutation.mutateAsync({
      title: values.title,
      lessonId: values.lessonId,
      transcript: values.transcript,
      tags: values.tags.split(',').map((tag) => tag.trim()),
      dataUrl: `data:video/webm;base64,${base64}`,
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Badge>Peer studio</Badge>
          <h1 className="mt-4 text-3xl font-bold text-white">Record or upload an explanation</h1>
          <p className="mt-2 text-sm text-slate-400">
            Template prompts help you highlight the key reasoning. Automated moderation checks for quality and safety before publishing.
          </p>
        </div>
        <Button variant="ghost" onClick={() => setPreviewUrl(null)}>
          Reset session
        </Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card title="Recorder" description="Capture your explanation">
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-black">
            <video ref={videoRef} autoPlay muted playsInline className="h-72 w-full object-cover" />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {!recording && <Button onClick={startRecording}>Start recording</Button>}
            {recording && (
              <Button variant="secondary" onClick={stopRecording}>
                Stop recording ({timer}s)
              </Button>
            )}
            {previewUrl && (
              <a href={previewUrl} target="_blank" rel="noreferrer" className="text-sm text-primary underline">
                Preview capture
              </a>
            )}
          </div>
        </Card>
        <Card title="Submission details" description="Provide context for reviewers" className="bg-slate-900/60">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-400">Title</label>
              <input
                {...register('title')}
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-400">Linked lesson</label>
              <input
                {...register('lessonId')}
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-400">Transcript</label>
              <textarea
                rows={4}
                {...register('transcript')}
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-400">Tags</label>
              <input
                {...register('tags')}
                className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 focus:border-primary focus:outline-none"
              />
            </div>
            <Button type="submit" isLoading={mutation.isPending} disabled={!chunks.length} className="w-full">
              {mutation.isPending ? 'Submitting...' : 'Publish for review'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default VideoStudioPage
