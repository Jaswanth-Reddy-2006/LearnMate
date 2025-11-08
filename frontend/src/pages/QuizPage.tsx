import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Clock, BookOpen, Zap } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import QuizConfigurationForm from '../components/ui/QuizConfigurationForm'
import { api } from '../lib/api'
import type { CatalogItem } from '../types'

const QuizPage = () => {
  const { lessonId = '' } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedSubject, setSelectedSubject] = useState<CatalogItem | null>(null)
  const [quizMode, setQuizMode] = useState<'practice' | 'quiz' | null>(null)
  const [quizConfig, setQuizConfig] = useState<{
    numQuestions?: number
    level?: 'beginner' | 'friendly' | 'pro'
    easy?: number
    medium?: number
    hard?: number
  } | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [isQuizStarted, setIsQuizStarted] = useState(false)
  const [result, setResult] = useState<{ score: number; masteryEstimate: number; feedback: string } | null>(null)

  const { data: courses } = useQuery({ queryKey: ['catalog'], queryFn: api.getCatalog })
  const { data: quizItems } = useQuery({
    queryKey: ['quiz', lessonId, quizMode, quizConfig],
    queryFn: () => {
      if (!lessonId || !quizConfig) return []
      return api.getQuiz(lessonId, { ...quizConfig, mode: quizMode || undefined })
    },
    enabled: !!lessonId && !!quizConfig
  })

  useEffect(() => {
    if (lessonId && location.search) {
      const params = new URLSearchParams(location.search)
      const mode = params.get('mode') as 'practice' | 'quiz'
      const numQuestions = parseInt(params.get('numQuestions') || '10')
      const level = params.get('level') as 'beginner' | 'friendly' | 'pro'

      if (mode === 'practice') {
        setQuizMode('practice')
        setQuizConfig({ numQuestions: 10 })
      } else if (mode === 'quiz') {
        setQuizMode('quiz')
        setQuizConfig({ 
          numQuestions: Math.max(1, Math.min(50, numQuestions)),
          level: level || 'beginner'
        })
      }

      setIsQuizStarted(true)

      const totalTimeInSeconds = numQuestions * 2 * 60
      setTimeLeft(totalTimeInSeconds)

      const subject = courses?.find(course => course.id === lessonId)
      if (subject) {
        setSelectedSubject(subject)
      }
    }
  }, [lessonId, location.search, courses])

  const mutation = useMutation({
    mutationFn: (submission: { lessonId: string; responses: Array<{ itemId: string; answer: string }> }) =>
      api.submitQuiz(submission),
    onSuccess: (data) => {
      const feedbackCombined = data.feedback.map((f) => `${f.itemId}: ${f.detail}`).join(' | ')
      setResult({ score: data.score, masteryEstimate: data.masteryEstimate, feedback: feedbackCombined })
      setIsQuizStarted(false)
    },
  })

  const handleSubmitQuiz = useCallback(() => {
    if (!lessonId) return

    mutation.mutate({
      lessonId,
      responses: Object.entries(answers).map(([itemId, answer]) => ({ itemId, answer })),
    })
  }, [lessonId, answers, mutation])

  // Timer effect
  useEffect(() => {
    if (!isQuizStarted || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Auto-submit when time runs out
          handleSubmitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isQuizStarted, timeLeft, handleSubmitQuiz])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleModeSelect = (mode: 'practice' | 'quiz', subject: CatalogItem) => {
    setQuizMode(mode)
    setSelectedSubject(subject)
  }

  const handleQuizConfigSubmit = (config: { numQuestions: number; level: 'beginner' | 'friendly' | 'pro' }) => {
    setQuizConfig(config)
    setIsQuizStarted(true)

    const totalTimeInSeconds = config.numQuestions * 2 * 60
    setTimeLeft(totalTimeInSeconds)

    if (selectedSubject) {
      navigate(`/quiz/${selectedSubject.id}?mode=quiz&numQuestions=${config.numQuestions}&level=${config.level}`)
    }
  }

  const handlePracticeStart = (subject: CatalogItem) => {
    setSelectedSubject(subject)
    setQuizMode('practice')
    setQuizConfig({ numQuestions: 10 })
    setIsQuizStarted(true)

    const totalTimeInSeconds = 10 * 2 * 60
    setTimeLeft(totalTimeInSeconds)

    navigate(`/quiz/${subject.id}?mode=practice&numQuestions=10`)
  }

  const handleQuestionNavigation = (index: number) => {
    setCurrentQuestionIndex(index)
  }

  if (!selectedSubject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="space-y-8">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800/50 bg-gradient-to-r from-slate-900/80 to-slate-800/80 px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold tracking-wide text-primary">
                <BookOpen className="h-4 w-4" />
                Quiz Subjects
              </div>
              <h1 className="text-4xl font-bold text-white lg:text-5xl">
                Test Your Knowledge
              </h1>
              <p className="text-lg text-slate-300">
                Choose between Practice Questions for predefined practical coding challenges or Quiz Questions with custom difficulty levels.
              </p>
            </div>
          </div>

          <div>
            <p className="mb-6 text-sm font-medium text-slate-400">
              Choose a subject to start
            </p>
            {courses && courses.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <Card key={course.id} className="relative flex flex-col overflow-hidden bg-slate-900/60 p-0">
                    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                      <img
                        src={course.coverImage}
                        alt={`${course.title} cover`}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    </div>

                    <div className="flex flex-1 flex-col gap-4 p-5">
                      <div className="space-y-2">
                        <h3 className="line-clamp-2 text-lg font-bold text-white">
                          {course.title}
                        </h3>
                        <p className="line-clamp-2 text-sm text-slate-400">{course.description}</p>
                      </div>

                      <div className="mt-auto space-y-3 pt-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="w-full text-xs"
                          onClick={() => handlePracticeStart(course)}
                        >
                          <BookOpen className="h-3.5 w-3.5 mr-2" />
                          Practice Questions
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          className="w-full text-xs"
                          onClick={() => handleModeSelect('quiz', course)}
                        >
                          <Zap className="h-3.5 w-3.5 mr-2" />
                          Quiz Questions
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-800/50 bg-slate-900/30 p-12 text-center">
                <BookOpen className="mx-auto mb-4 h-12 w-12 text-slate-600" />
                <h3 className="text-lg font-semibold text-slate-300">No subjects available</h3>
                <p className="mt-2 text-slate-400">Please check back later for quiz subjects</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (selectedSubject && quizMode === 'quiz' && !isQuizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="space-y-8">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800/50 bg-gradient-to-r from-slate-900/80 to-slate-800/80 px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold tracking-wide text-primary">
                <Zap className="h-4 w-4" />
                Quiz Configuration
              </div>
              <h1 className="text-4xl font-bold text-white lg:text-5xl">
                {selectedSubject.title} Quiz
              </h1>
              <p className="text-lg text-slate-300">
                Select the number of questions and your skill level to begin the quiz.
              </p>
            </div>
          </div>

          <QuizConfigurationForm onSubmit={handleQuizConfigSubmit} onCancel={() => { setSelectedSubject(null); setQuizMode(null) }} />
        </div>
      </div>
    )
  }



  // Show quiz interface when subject is selected
  const currentQuestion = quizItems?.[currentQuestionIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800/50 bg-gradient-to-r from-slate-900/80 to-slate-800/80 px-6 py-8 sm:px-8 lg:px-12">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white lg:text-3xl">
                  {selectedSubject?.title}
                </h1>
                <Badge className="capitalize text-xs">
                  {quizMode === 'practice' ? 'Practice' : 'Quiz'} - {quizMode === 'quiz' && quizConfig?.level ? (quizConfig.level === 'beginner' ? 'Beginner' : quizConfig.level === 'friendly' ? 'Friendly' : 'Pro') : ''}
                </Badge>
              </div>
              <p className="text-sm text-slate-400">
                Question {currentQuestionIndex + 1} of {quizItems?.length || 30}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                timeLeft < 600 ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                timeLeft < 1800 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                'bg-primary/20 text-primary border border-primary/30'
              }`}>
                <Clock className="h-4 w-4" />
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>

        {/* Question Navigation - Top Right */}
        <div className="fixed top-24 right-6 z-10">
          <Card className="bg-slate-900/95 backdrop-blur-sm border-slate-700/50 p-4">
            <div className="grid grid-cols-4 gap-2 max-h-96 overflow-y-auto">
              {Array.from({ length: quizItems?.length || 30 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handleQuestionNavigation(i)}
                  className={`h-8 w-8 rounded-full border-2 text-xs font-semibold transition-all ${
                    i === currentQuestionIndex
                      ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25'
                      : answers[quizItems?.[i]?.id || '']
                      ? 'bg-green-500/20 border-green-500/50 text-green-400'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-primary/50 hover:bg-slate-700'
                  }`}
                  title={`Question ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Current Question */}
        {currentQuestion && (
          <Card className="bg-slate-900/60" title={currentQuestion.prompt} description={`Difficulty: ${currentQuestion.difficulty}`}>
            {currentQuestion.type === 'mcq' && (
              <div className="mt-4 space-y-2">
                {currentQuestion.options?.map((option) => (
                  <label key={option} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300 transition hover:border-primary/40">
                    <input
                      type="radio"
                      name={currentQuestion.id}
                      value={option}
                      checked={answers[currentQuestion.id] === option}
                      onChange={(event) => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: event.target.value }))}
                      className="h-4 w-4 accent-primary"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {currentQuestion.type === 'short' && (
              <textarea
                rows={4}
                value={answers[currentQuestion.id] ?? ''}
                onChange={(event) => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: event.target.value }))}
                className="mt-4 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 focus:border-primary focus:outline-none"
                placeholder="Enter your answer..."
              />
            )}
            {currentQuestion.type === 'code' && (
              <textarea
                rows={6}
                value={answers[currentQuestion.id] ?? ''}
                onChange={(event) => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: event.target.value }))}
                className="mt-4 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 font-mono text-sm text-slate-200 focus:border-primary focus:outline-none"
                placeholder="Enter your code..."
              />
            )}
            <p className="mt-3 text-xs text-slate-500">{currentQuestion.feedback}</p>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="secondary"
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          {currentQuestionIndex === (quizItems?.length || 30) - 1 ? (
            <Button onClick={handleSubmitQuiz} isLoading={mutation.isPending}>
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestionIndex(Math.min((quizItems?.length || 30) - 1, currentQuestionIndex + 1))}
            >
              Next
            </Button>
          )}
        </div>

        {/* Results */}
        {result && (
          <Card title="Quiz Results" className="bg-slate-900/60">
            <p className="text-sm text-slate-300">Score: {result.score}%</p>
            <p className="text-sm text-slate-300">Mastery estimate: {result.masteryEstimate}%</p>
            <p className="mt-2 text-xs text-slate-400">{result.feedback}</p>
          </Card>
        )}
      </div>
    </div>
  )
}

export default QuizPage
