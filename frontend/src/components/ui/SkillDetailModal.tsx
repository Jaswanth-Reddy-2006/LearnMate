
import { X, BookOpen, Target, CheckCircle, Briefcase, Link, FileText, Clock } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '../../lib/cn'
import Badge from './Badge'
import Button from './Button'
import type { CatalogItem } from '../../types'

interface SkillDetailModalProps {
  course: CatalogItem | null
  isOpen: boolean
  onClose: () => void
  onStart: (course: CatalogItem) => void
}

const getDifficultyColor = (difficulty: string): 'default' | 'success' | 'warning' | 'outline' => {
  switch (difficulty) {
    case 'beginner':
      return 'success'
    case 'intermediate':
      return 'warning'
    case 'advanced':
      return 'default'
    default:
      return 'outline'
  }
}

const getDifficultyIcon = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return '🟢'
    case 'intermediate':
      return '🟡'
    case 'advanced':
      return '🔴'
    default:
      return '⚪'
  }
}

export default function SkillDetailModal({ course, isOpen, onClose, onStart }: SkillDetailModalProps) {
  if (!course) return null

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal forceMount>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <DialogPrimitive.Content
          forceMount
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2',
            'max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 p-0 shadow-2xl',
            'border border-slate-700'
          )}
        >
          <div className="relative">
            {/* Header Image */}
            <div className="relative h-64 w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-slate-800 to-slate-900">
              <img
                src={course.coverImage}
                alt={`${course.title} cover`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition hover:bg-black/40"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Overlay Badges */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <Badge
                  variant={getDifficultyColor(course.difficulty)}
                  className="text-sm font-semibold"
                >
                  <span className="mr-1">{getDifficultyIcon(course.difficulty)}</span>
                  {course.difficulty}
                </Badge>
                <div className="flex items-center gap-1.5 text-sm text-white">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration} min</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="mb-6">
                <h1 className="mb-2 text-3xl font-bold text-white">{course.title}</h1>
                <p className="text-lg text-slate-300">{course.description}</p>
              </div>

              {/* Tags */}
              <div className="mb-8">
                <h2 className="mb-3 text-xl font-semibold text-white">Skills Covered</h2>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-600 bg-slate-800/50 px-3 py-1 text-sm text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Learning Objectives */}
              {course.objectives && course.objectives.length > 0 && (
                <div className="mb-8">
                  <div className="mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold text-white">Learning Objectives</h2>
                  </div>
                  <ul className="space-y-2">
                    {course.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-300">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Prerequisites */}
              {course.prerequisites && course.prerequisites.length > 0 && (
                <div className="mb-8">
                  <div className="mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold text-white">Prerequisites</h2>
                  </div>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-300">
                        <div className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-slate-500" />
                        <span>{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Syllabus */}
              {course.syllabus && course.syllabus.length > 0 && (
                <div className="mb-8">
                  <div className="mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold text-white">Course Syllabus</h2>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {course.syllabus.map((topic, index) => (
                      <div key={index} className="flex items-center gap-3 rounded-lg bg-slate-800/30 p-3 text-slate-300">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                          {index + 1}
                        </span>
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Applications */}
              {course.careerApplications && course.careerApplications.length > 0 && (
                <div className="mb-8">
                  <div className="mb-3 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold text-white">Career Applications</h2>
                  </div>
                  <ul className="space-y-2">
                    {course.careerApplications.map((application, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-300">
                        <Briefcase className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                        <span>{application}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Resources */}
              {course.resources && course.resources.length > 0 && (
                <div className="mb-8">
                  <div className="mb-3 flex items-center gap-2">
                    <Link className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold text-white">Recommended Resources</h2>
                  </div>
                  <ul className="space-y-2">
                    {course.resources.map((resource, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-300">
                        <Link className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-400" />
                        <span>{resource}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-slate-700">
                <Button variant="secondary" onClick={onClose} className="flex-1">
                  Close
                </Button>
                <Button variant="primary" onClick={() => course && onStart(course)} className="flex-1">
                  Start Learning
                </Button>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}