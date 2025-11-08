import { useState } from 'react'
import { X, Clock, Target, Calculator } from 'lucide-react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '../../lib/cn'
import Button from './Button'
import type { CatalogItem } from '../../types'

interface LearningQuestionnaireModalProps {
  course: CatalogItem | null
  isOpen: boolean
  onClose: () => void
  onConfirm: (proficiency: string, hoursPerDay: number) => void
}

const proficiencyLevels = [
  { value: 'complete-new', label: 'Complete New', description: 'No prior knowledge or experience' },
  { value: 'basic', label: 'Know Basic', description: 'Basic understanding of concepts' },
  { value: 'intermediate', label: 'Intermediate', description: 'Good understanding with some experience' },
  { value: 'advanced', label: 'Advanced', description: 'Strong experience and deep understanding' },
]

const dailyHours = [
  { value: 1, label: '1 hour', description: 'Casual learning pace' },
  { value: 2, label: '2 hours', description: 'Moderate commitment' },
  { value: 3, label: '3 hours', description: 'Dedicated daily practice' },
  { value: 4, label: '4+ hours', description: 'Intensive learning schedule' },
]

export default function LearningQuestionnaireModal({
  course,
  isOpen,
  onClose,
  onConfirm,
}: LearningQuestionnaireModalProps) {
  const [selectedProficiency, setSelectedProficiency] = useState<string>('')
  const [selectedHours, setSelectedHours] = useState<number>(0)

  const calculateTimeline = (proficiency: string, hours: number) => {
    const baseDays = {
      'complete-new': 100,
      'basic': 80,
      'intermediate': 60,
      'advanced': 30,
    }

    const base = baseDays[proficiency as keyof typeof baseDays] || 100
    const adjustedDays = Math.ceil(base / Math.max(hours, 1))
    return adjustedDays
  }

  const estimatedDays = selectedProficiency && selectedHours
    ? calculateTimeline(selectedProficiency, selectedHours)
    : null

  const handleConfirm = () => {
    if (selectedProficiency && selectedHours) {
      onConfirm(selectedProficiency, selectedHours)
    }
  }

  const resetForm = () => {
    setSelectedProficiency('')
    setSelectedHours(0)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!course) return null

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleClose}>
      <DialogPrimitive.Portal forceMount>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <DialogPrimitive.Content
          forceMount
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2',
            'max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 p-0 shadow-2xl',
            'border border-slate-700'
          )}
        >
          <div className="p-8">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Personalize Your Learning</h1>
                <p className="text-slate-400">Help us create a tailored learning plan for {course.title}</p>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Proficiency Level */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-white">Current Proficiency Level</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {proficiencyLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setSelectedProficiency(level.value)}
                    className={cn(
                      'rounded-lg border p-4 text-left transition-all',
                      selectedProficiency === level.value
                        ? 'border-primary bg-primary/10 text-white'
                        : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                    )}
                  >
                    <div className="font-semibold">{level.label}</div>
                    <div className="text-sm text-slate-400">{level.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Hours */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-white">Daily Learning Time</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {dailyHours.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedHours(option.value)}
                    className={cn(
                      'rounded-lg border p-4 text-left transition-all',
                      selectedHours === option.value
                        ? 'border-primary bg-primary/10 text-white'
                        : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                    )}
                  >
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-sm text-slate-400">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline Estimate */}
            {estimatedDays && (
              <div className="mb-8 rounded-lg border border-primary/30 bg-primary/5 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-white">Estimated Timeline</h3>
                </div>
                <p className="text-slate-300">
                  Based on your current proficiency and daily commitment, you can master this skill in approximately{' '}
                  <span className="font-bold text-primary">{estimatedDays} days</span>.
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  This is a personalized estimate that adjusts based on your learning pace and prior knowledge.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button variant="secondary" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirm}
                disabled={!selectedProficiency || !selectedHours}
                className="flex-1"
              >
                Start Learning Plan
              </Button>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}