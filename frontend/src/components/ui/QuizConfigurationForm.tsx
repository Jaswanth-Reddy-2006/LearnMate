import { useState } from 'react'
import Card from './Card'
import Button from './Button'

interface QuizConfigurationFormProps {
  onSubmit: (config: { numQuestions: number; level: 'beginner' | 'friendly' | 'pro' }) => void
  onCancel?: () => void
}

const QuizConfigurationForm = ({ onSubmit, onCancel }: QuizConfigurationFormProps) => {
  const [numQuestions, setNumQuestions] = useState(10)
  const [level, setLevel] = useState<'beginner' | 'friendly' | 'pro'>('beginner')

  const totalTime = numQuestions * 2

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (numQuestions === 0) return
    onSubmit({ numQuestions, level })
  }

  const levelDescriptions = {
    beginner: 'Basic concepts and fundamental questions',
    friendly: 'Intermediate questions requiring practical knowledge',
    pro: 'Advanced questions with complex scenarios and edge cases'
  }

  return (
    <Card className="bg-slate-900/60">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Number of Questions</h3>
                <p className="text-sm text-slate-400">Choose how many questions to answer</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setNumQuestions(Math.max(1, numQuestions - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-700 transition-colors"
              >
                -
              </button>

              <input
                type="number"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Math.max(1, parseInt(e.target.value) || 1))}
                className="flex h-10 w-20 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-center text-lg font-semibold text-white focus:border-primary focus:outline-none"
                min="1"
                max="50"
              />

              <button
                type="button"
                onClick={() => setNumQuestions(Math.min(50, numQuestions + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-700 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Skill Level</h3>
              <p className="text-sm text-slate-400">Select your proficiency level</p>
            </div>

            <div className="space-y-2">
              {(['beginner', 'friendly', 'pro'] as const).map((lvl) => (
                <label key={lvl} className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-slate-700 bg-slate-800/50 px-4 py-3 transition hover:border-primary/40 has-[:checked]:border-primary has-[:checked]:bg-primary/10">
                  <input
                    type="radio"
                    name="level"
                    value={lvl}
                    checked={level === lvl}
                    onChange={() => setLevel(lvl)}
                    className="h-4 w-4 accent-primary"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white capitalize">{lvl}</p>
                    <p className="text-xs text-slate-400">{levelDescriptions[lvl]}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{numQuestions}</p>
              <p className="text-sm text-slate-400">Questions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{totalTime}</p>
              <p className="text-sm text-slate-400">Minutes</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              className="px-8 py-3 text-lg"
            >
              Back
            </Button>
          )}
          <Button
            type="submit"
            disabled={numQuestions === 0}
            className="px-8 py-3 text-lg"
          >
            Start Quiz ({numQuestions} questions, {totalTime} minutes)
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default QuizConfigurationForm