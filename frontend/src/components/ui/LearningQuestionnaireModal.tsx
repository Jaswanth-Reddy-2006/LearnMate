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
  const [customHours, setCustomHours] = useState<string>('')
  const [isCustom, setIsCustom] = useState(false)

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

  const getFinalHours = (): number => {
    if (isCustom) {
      return Math.max(0, parseFloat(customHours) || 0)
    }
    return selectedHours
  }

  const finalHours = getFinalHours()

  const estimatedDays = selectedProficiency && finalHours > 0
    ? calculateTimeline(selectedProficiency, finalHours)
    : null

  const handleConfirm = () => {
    const hours = getFinalHours()
    if (selectedProficiency && hours > 0) {
      onConfirm(selectedProficiency, hours)
    }
  }

  const resetForm = () => {
    setSelectedProficiency('')
    setSelectedHours(0)
    setIsCustom(false)
    setCustomHours('')
  }

  const handleHoursSelect = (value: number) => {
    setIsCustom(false)
    setSelectedHours(value)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!course) return null

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <DialogPrimitive.Content
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
                    onClick={() => handleHoursSelect(option.value)}
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

              {/* Custom Hours Input */}
              {isCustom && (
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-white mb-2">
                    Enter your daily learning hours:
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    max="12"
                    step="0.5"
                    value={customHours}
                    onChange={(e) => setCustomHours(e.target.value)}
                    placeholder="e.g., 2.5"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3 text-white placeholder:text-slate-400 focus:border-primary focus:outline-none"
                  />
                  <p className="text-xs text-slate-400 mt-1">Enter hours between 0.5 and 12</p>
                </div>
              )}

              {/* Custom Hours Input */}
              <div className="mt-4">
                <button
                  onClick={() => {
                    setIsCustom(!isCustom)
                    if (!isCustom) setSelectedHours(0)
                  }}
                  className={cn(
                    'w-full rounded-lg border p-4 text-left transition-all',
                    isCustom
                      ? 'border-primary bg-primary/10 text-white'
                      : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                  )}
                >
                  <div className="font-semibold">Custom Hours</div>
                  <div className="text-sm text-slate-400">Enter your preferred daily learning hours</div>
                </button>
                {isCustom && (
                  <div className="mt-3">
                    <input
                      type="number"
                      min="0.5"
                      max="24"
                      step="0.5"
                      value={customHours}
                      onChange={(e) => setCustomHours(e.target.value)}
                      placeholder="Enter hours (e.g., 1.5)"
                      className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-white placeholder:text-slate-500 focus:border-primary/50 focus:outline-none"
                    />
                  </div>
                )}
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
                disabled={!selectedProficiency || finalHours === 0}
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