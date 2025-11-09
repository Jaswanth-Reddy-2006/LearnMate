import { X, Calendar, BookOpen, Target, Zap, ArrowRight } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '../../lib/cn'
import Button from './Button'
import type { CatalogItem } from '../../types'

interface LearningPlanModalProps {
  course: CatalogItem | null
  proficiency: string
  hoursPerDay: number
  isOpen: boolean
  onClose: () => void
  onStartLearning: () => void
}

interface DayPlan {
  day: number
  topics: string[]
  duration: number
  objectives: string[]
  title?: string
  activities?: string[]
  resources?: string[]
  assessment?: string
}

const generateLearningPlan = (course: CatalogItem, proficiency: string, hoursPerDay: number): DayPlan[] => {
  const syllabus = course.syllabus || []
  const totalTopics = syllabus.length

  // Adjust plan based on proficiency
  const proficiencySettings = {
    'complete-new': {
      multiplier: 2.0,
      focus: 'foundational',
      activities: ['theory', 'examples', 'practice', 'review'],
      assessment: 'basic concepts quiz'
    },
    'basic': {
      multiplier: 1.5,
      focus: 'practical',
      activities: ['deep-dive', 'coding exercises', 'problem-solving'],
      assessment: 'practical exercises'
    },
    'intermediate': {
      multiplier: 1.2,
      focus: 'advanced',
      activities: ['complex problems', 'optimization', 'real-world applications'],
      assessment: 'advanced problem sets'
    },
    'advanced': {
      multiplier: 0.8,
      focus: 'expert',
      activities: ['research', 'optimization', 'system design'],
      assessment: 'expert-level challenges'
    }
  }

  const settings = proficiencySettings[proficiency as keyof typeof proficiencySettings] || proficiencySettings['intermediate']
  const baseDays = Math.max(1, Math.ceil((course.duration / 60) * settings.multiplier / hoursPerDay))
  const topicsPerDay = Math.max(1, Math.ceil(totalTopics / baseDays))

  const plan: DayPlan[] = []

  for (let day = 1; day <= baseDays; day++) {
    const startIndex = (day - 1) * topicsPerDay
    const endIndex = Math.min(day * topicsPerDay, totalTopics)
    const dayTopics = syllabus.slice(startIndex, endIndex)

    // Generate detailed objectives
    const objectives: string[] = dayTopics.length > 0 
      ? [
          `Master ${dayTopics[0].toLowerCase()} concepts`,
          `Practice with real-world examples`,
          `Complete exercises and assessments`,
        ]
      : [
          'Review previous topics',
          'Practice core concepts',
          'Complete assessments',
        ]

    plan.push({
      day,
      topics: dayTopics,
      duration: Math.round(hoursPerDay * 60),
      objectives: objectives,
    })
  }

  return plan
}

export default function LearningPlanModal({
  course,
  proficiency,
  hoursPerDay,
  isOpen,
  onClose,
  onStartLearning,
}: LearningPlanModalProps) {
  if (!course) return null

  const learningPlan = generateLearningPlan(course, proficiency, hoursPerDay)
  const totalMinutes = learningPlan.reduce((sum, day) => sum + day.duration, 0)
  const totalHours = Math.round(totalMinutes / 60)

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2',
            'max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 p-0 shadow-2xl',
            'border border-slate-700'
          )}
        >
          <div className="p-8">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Your Learning Plan</h1>
                <p className="mt-2 text-slate-400">{course.title}</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Plan Summary */}
            <div className="mb-8 grid gap-4 sm:grid-cols-4">
              <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
                <div className="flex items-center gap-2 text-primary">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-semibold uppercase tracking-wide text-slate-400">Duration</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-white">{learningPlan.length}</p>
                <p className="text-xs text-slate-400">days total</p>
              </div>

              <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
                <div className="flex items-center gap-2 text-primary">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm font-semibold uppercase tracking-wide text-slate-400">Daily</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-white">{hoursPerDay}h</p>
                <p className="text-xs text-slate-400">per day</p>
              </div>

              <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
                <div className="flex items-center gap-2 text-primary">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm font-semibold uppercase tracking-wide text-slate-400">Total</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-white">{totalHours}h</p>
                <p className="text-xs text-slate-400">estimated</p>
              </div>

              <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
                <div className="flex items-center gap-2 text-primary">
                  <Target className="h-4 w-4" />
                  <span className="text-sm font-semibold uppercase tracking-wide text-slate-400">Topics</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-white">{course.syllabus?.length || 10}</p>
                <p className="text-xs text-slate-400">to master</p>
              </div>
            </div>

            {/* Daily Plan */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-white">Your Daily Learning Plan</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
                {learningPlan.slice(0, 10).map((dayPlan) => (
                  <div
                    key={dayPlan.day}
                    className="rounded-lg border border-slate-700 bg-slate-800/30 p-4 transition hover:border-primary/50 hover:bg-slate-800/50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/20 text-sm font-bold text-primary">
                        {dayPlan.day}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-white">{dayPlan.title}</h3>

                        {/* Topics */}
                        <div className="mt-2">
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Topics</p>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {dayPlan.topics.map((topic, idx) => (
                              <span
                                key={idx}
                                className="inline-block rounded bg-slate-700/50 px-2 py-1 text-xs text-slate-300"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Activities */}
                        {dayPlan.activities && dayPlan.activities.length > 0 && (
                          <div className="mt-3">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Activities ({dayPlan.duration}h)</p>
                            <div className="mt-1 space-y-1">
                              {dayPlan.activities.map((activity, idx) => (
                                <p key={idx} className="text-sm text-slate-300">
                                  • {activity}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Objectives */}
                        <div className="mt-3">
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Objectives</p>
                          <div className="mt-1 space-y-1">
                            {dayPlan.objectives.map((obj, idx) => (
                              <p key={idx} className="text-sm text-slate-300">
                                ✓ {obj}
                              </p>
                            ))}
                          </div>
                        </div>

                        {/* Resources */}
                        {dayPlan.resources && dayPlan.resources.length > 0 && (
                          <div className="mt-3">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Resources</p>
                            <div className="mt-1 space-y-1">
                              {dayPlan.resources.map((resource, idx) => (
                                <p key={idx} className="text-sm text-slate-300">
                                  📖 {resource}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Assessment */}
                        {dayPlan.assessment && (
                          <div className="mt-3">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Daily Assessment</p>
                            <p className="text-sm text-slate-300">📝 {dayPlan.assessment}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {learningPlan.length > 10 && (
                  <div className="rounded-lg border border-slate-700/50 bg-slate-800/20 p-4 text-center">
                    <p className="text-sm text-slate-400">
                      +{learningPlan.length - 10} more days in your plan
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tips Section */}
            <div className="mb-8 rounded-lg border border-slate-700 bg-primary/5 p-6">
              <h3 className="mb-3 font-semibold text-white">Pro Tips for Success</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">✓</span>
                  <span>Stick to the daily commitment for best results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">✓</span>
                  <span>Complete mini-projects on recommended days to solidify learning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">✓</span>
                  <span>Review previous topics regularly for better retention</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">✓</span>
                  <span>Adjust pace based on your comfort level - flexibility is key</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 border-t border-slate-700 pt-6">
              <Button variant="secondary" onClick={onClose} className="flex-1">
                Back
              </Button>
              <Button variant="primary" onClick={onStartLearning} className="flex-1 gap-2">
                <span>Start Learning</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
