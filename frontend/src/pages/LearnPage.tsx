import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { Zap, Clock, BookOpen, ChevronRight, Search } from 'lucide-react'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import SkillDetailModal from '../components/ui/SkillDetailModal'
import LearningQuestionnaireModal from '../components/ui/LearningQuestionnaireModal'
import { api } from '../lib/api'
import type { CatalogItem } from '../types'

type DifficultyFilter = 'all' | 'beginner' | 'intermediate' | 'advanced'
type CategoryFilter = 'all' | 'cse' | 'ece' | 'mech' | 'ds' | 'security' | 'devops' | 'soft-skills' | 'math' | 'tools'

interface CategoryOption {
  label: string
  value: CategoryFilter
  icon?: string
}

const difficulties: Array<{ label: string; value: DifficultyFilter }> = [
  { label: 'All Levels', value: 'all' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
]

const categories: CategoryOption[] = [
  { label: 'All Disciplines', value: 'all' },
  { label: 'Computer Science', value: 'cse' },
  { label: 'Electronics & Comms', value: 'ece' },
  { label: 'Mechanical', value: 'mech' },
  { label: 'Data Science & AI', value: 'ds' },
  { label: 'Cybersecurity', value: 'security' },
  { label: 'DevOps & Cloud', value: 'devops' },
  { label: 'Soft Skills', value: 'soft-skills' },
  { label: 'Mathematics', value: 'math' },
  { label: 'Tools', value: 'tools' },
]

const categoryTagMap: Record<CategoryFilter, string[]> = {
  all: [],
  cse: ['cse'],
  ece: ['ece'],
  mech: ['mech'],
  ds: ['ds'],
  security: ['security'],
  devops: ['devops'],
  'soft-skills': ['soft-skills'],
  math: ['math'],
  tools: ['tools'],
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

const LearnPage = () => {
  const { data: courses } = useQuery({ queryKey: ['catalog'], queryFn: api.getCatalog })
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all')
  const [category, setCategory] = useState<CategoryFilter>('all')
  const [selectedCourse, setSelectedCourse] = useState<CatalogItem | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isQuestionnaireModalOpen, setIsQuestionnaireModalOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const queryParam = params.get('q')
    const difficultyParam = params.get('difficulty')
    const categoryParam = params.get('category')
    if (queryParam) setSearch(queryParam)
    if (difficultyParam === 'beginner' || difficultyParam === 'intermediate' || difficultyParam === 'advanced') {
      setDifficulty(difficultyParam)
    }
    if (categoryParam && Object.values(categories).some((c) => c.value === categoryParam)) {
      setCategory(categoryParam as CategoryFilter)
    }
  }, [location.search])

  const courseCount = courses?.length ?? 0

  const filtered = useMemo(() => {
    if (!courses) return []
    return courses.filter((item) => {
      const matchesDifficulty = difficulty === 'all' || item.difficulty === difficulty
      const matchesCategory = category === 'all' || categoryTagMap[category].some((tag) => item.tags.includes(tag))
      const query = search.trim().toLowerCase()
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query))
      return matchesDifficulty && matchesCategory && matchesQuery
    })
  }, [courses, search, difficulty, category])

  const stats = useMemo(() => {
    if (!courses) return { beginner: 0, intermediate: 0, advanced: 0 }
    return courses.reduce(
      (acc, item) => {
        acc[item.difficulty] += 1
        return acc
      },
      { beginner: 0, intermediate: 0, advanced: 0 },
    )
  }, [courses])

  const handleCardClick = (course: CatalogItem) => {
    setSelectedCourse(course)
    setIsDetailModalOpen(true)
  }

  const handleNextClick = (course: CatalogItem) => {
    // Mark course details as acknowledged
    localStorage.setItem(`course-acknowledged-${course.id}`, 'true')
    setIsDetailModalOpen(false)
    if (selectedCourse) {
      navigate(`/lesson/${selectedCourse.id}`)
    }
  }

  const handleQuestionnaireComplete = (_proficiency: string, _hoursPerDay: number) => {
    // For now, just navigate to the lesson
    // In a real app, you might save this data to user preferences
    setIsQuestionnaireModalOpen(false)
    if (selectedCourse) {
      navigate(`/lesson/${selectedCourse.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800/50 bg-gradient-to-r from-slate-900/80 to-slate-800/80 px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold tracking-wide text-primary">
              <BookOpen className="h-4 w-4" />
              {courseCount} Comprehensive Courses
            </div>
            <h1 className="text-4xl font-bold text-white lg:text-5xl">
              Learn Skills
            </h1>
            <p className="text-lg text-slate-300">
              Master core engineering disciplines with interactive lessons, hands-on projects, and real-world applications.
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search courses, skills, or tags..."
              className="w-full rounded-2xl border border-slate-800 bg-slate-900/40 px-12 py-3 text-slate-200 placeholder:text-slate-500 transition focus:border-primary/50 focus:bg-slate-900/60 focus:outline-none"
              aria-label="Search courses"
            />
          </div>

          {/* Filter Buttons */}
          <div className="space-y-3">
            {/* Difficulty Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-slate-400">Level:</span>
              {difficulties.map((item) => (
                <Button
                  key={item.value}
                  variant={difficulty === item.value ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setDifficulty(item.value)}
                  className="text-xs"
                  aria-pressed={difficulty === item.value}
                >
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-slate-400">Discipline:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.value}
                    variant={category === cat.value ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setCategory(cat.value)}
                    className="text-xs"
                    aria-pressed={category === cat.value}
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        {courseCount > 0 && (
          <div className="grid gap-4 rounded-2xl border border-slate-800/50 bg-slate-900/30 p-6 sm:grid-cols-3 backdrop-blur-sm">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Courses</p>
              <p className="text-3xl font-bold text-white">{courseCount}</p>
              <p className="text-sm text-slate-400">All disciplines covered</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Filtered Results</p>
              <p className="text-3xl font-bold text-primary">{filtered.length}</p>
              <p className="text-sm text-slate-400">{Math.round((filtered.length / courseCount) * 100)}% match</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Difficulty Distribution</p>
              <div className="flex gap-2 text-sm">
                <span className="text-emerald-400">🟢 {stats.beginner}</span>
                <span className="text-amber-400">🟡 {stats.intermediate}</span>
                <span className="text-red-400">🔴 {stats.advanced}</span>
              </div>
            </div>
          </div>
        )}

        {/* Courses Grid */}
        <div>
          <p className="mb-6 text-sm font-medium text-slate-400">
            Showing {filtered.length} of {courseCount} courses
          </p>
          {filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((course) => (
                <div
                  key={course.id}
                  className="group cursor-pointer transition-all duration-300"
                  onClick={() => handleCardClick(course)}
                >
                  <Card className="relative flex h-full flex-col overflow-hidden bg-slate-900/60 p-0 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
                    {/* Course Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                      <img
                        src={course.coverImage}
                        alt={`${course.title} cover`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                      {/* Overlay Badges */}
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                        <Badge
                          variant={getDifficultyColor(course.difficulty)}
                          className="capitalize text-xs font-semibold"
                        >
                          <span className="mr-1">{getDifficultyIcon(course.difficulty)}</span>
                          {course.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{course.daysRequired || Math.ceil(course.duration / 480)} days</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col gap-4 p-5">
                      <div className="space-y-2">
                        <h3 className="line-clamp-2 text-lg font-bold text-white transition-colors duration-300 group-hover:text-primary">
                          {course.title}
                        </h3>
                        <p className="line-clamp-2 text-sm text-slate-400">{course.description}</p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {course.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-slate-700/50 bg-slate-800/30 px-2.5 py-1 text-xs text-slate-300 transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/5"
                          >
                            #{tag}
                          </span>
                        ))}
                        {course.tags.length > 2 && (
                          <span className="rounded-full border border-slate-700/50 bg-slate-800/30 px-2.5 py-1 text-xs text-slate-400">
                            +{course.tags.length - 2}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-auto flex gap-2 pt-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="flex-1 text-xs transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleCardClick(course)
                          }}
                          title="View course details"
                        >
                          <span>Details</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          className="flex-1 text-xs transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleNextClick(course)
                          }}
                          title="Start learning this course"
                        >
                          <Zap className="h-3.5 w-3.5" />
                          <span>Start Learn</span>
                        </Button>
                      </div>


                    </div>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800/50 bg-slate-900/30 p-12 text-center">
              <Search className="mx-auto mb-4 h-12 w-12 text-slate-600" />
              <h3 className="text-lg font-semibold text-slate-300">No courses found</h3>
              <p className="mt-2 text-slate-400">Try adjusting your filters or search terms</p>
              <Button
                variant="secondary"
                className="mt-4"
                onClick={() => {
                  setSearch('')
                  setDifficulty('all')
                  setCategory('all')
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <SkillDetailModal
        course={selectedCourse}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onNext={handleNextClick}
      />

      <LearningQuestionnaireModal
        course={selectedCourse}
        isOpen={isQuestionnaireModalOpen}
        onClose={() => setIsQuestionnaireModalOpen(false)}
        onConfirm={handleQuestionnaireComplete}
      />
    </div>
  )
}

export default LearnPage
