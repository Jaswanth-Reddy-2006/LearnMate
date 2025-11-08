import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { api } from '../lib/api'

const QuizPage = () => {
  const { lessonId = '' } = useParams()
  const { data: quizItems } = useQuery({ queryKey: ['quiz', lessonId], queryFn: () => api.getQuiz(lessonId), enabled: !!lessonId })
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [result, setResult] = useState<{ score: number; masteryEstimate: number; feedback: string } | null>(null)

  const mutation = useMutation({
    mutationFn: () =>
      api.submitQuiz({
        lessonId,
        responses: Object.entries(answers).map(([itemId, answer]) => ({ itemId, answer })),
      }),
    onSuccess: (data) => {
      const feedbackCombined = data.feedback.map((f) => `${f.itemId}: ${f.detail}`).join(' | ')
      setResult({ score: data.score, masteryEstimate: data.masteryEstimate, feedback: feedbackCombined })
    },
  })

  return (
    <div className="space-y-8">
      <div>
        <Badge>Adaptive quiz</Badge>
        <h1 className="mt-4 text-3xl font-bold text-white">Knowledge check</h1>
        <p className="mt-2 text-sm text-slate-400">Questions adapt based on your recent interactions and confidence signals.</p>
      </div>
      <div className="space-y-6">
        {quizItems?.map((item) => (
          <Card key={item.id} className="bg-slate-900/60" title={item.prompt} description={`Difficulty: ${item.difficulty}`}>
            {item.type === 'mcq' && (
              <div className="mt-4 space-y-2">
                {item.options?.map((option) => (
                  <label key={option} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 transition hover:border-primary/40">
                    <input
                      type="radio"
                      name={item.id}
                      value={option}
                      checked={answers[item.id] === option}
                      onChange={(event) => setAnswers((prev) => ({ ...prev, [item.id]: event.target.value }))}
                      className="h-4 w-4 accent-primary"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {item.type === 'short' && (
              <textarea
                rows={4}
                value={answers[item.id] ?? ''}
                onChange={(event) => setAnswers((prev) => ({ ...prev, [item.id]: event.target.value }))}
                className="mt-4 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 focus:border-primary focus:outline-none"
              />
            )}
            {item.type === 'code' && (
              <textarea
                rows={6}
                value={answers[item.id] ?? ''}
                onChange={(event) => setAnswers((prev) => ({ ...prev, [item.id]: event.target.value }))}
                className="mt-4 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 font-mono text-sm text-slate-200 focus:border-primary focus:outline-none"
              />
            )}
            <p className="mt-3 text-xs text-slate-500">{item.feedback}</p>
          </Card>
        ))}
      </div>
      <Button onClick={() => mutation.mutate()} isLoading={mutation.isPending}>
        Submit answers
      </Button>
      {result && (
        <Card title="Quiz results" className="bg-slate-900/60">
          <p className="text-sm text-slate-300">Score: {result.score}%</p>
          <p className="text-sm text-slate-300">Mastery estimate: {result.masteryEstimate}%</p>
          <p className="mt-2 text-xs text-slate-400">{result.feedback}</p>
        </Card>
      )}
    </div>
  )
}

export default QuizPage
