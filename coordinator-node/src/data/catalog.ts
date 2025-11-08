import type { CatalogItem } from '../types'

export const catalog: CatalogItem[] = [
  {
    id: 'loop-fundamentals',
    title: 'Python Loop Fundamentals',
    description: 'Master for, while, and nested loops with visual animations and code walkthroughs.',
    tags: ['python', 'loops', 'iteration'],
    difficulty: 'beginner',
    duration: 25,
    coverImage: '/assets/loops.png',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'recursion-visual',
    title: 'Visual Recursion Patterns',
    description: 'Understand recursion using call stack visualisations and base case spotting.',
    tags: ['python', 'recursion', 'algorithms'],
    difficulty: 'intermediate',
    duration: 30,
    coverImage: '/assets/recursion.png',
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'data-structures',
    title: 'Interactive Data Structures',
    description: 'Explore arrays, stacks, and queues with code sandboxes and adaptive quizzes.',
    tags: ['data structures', 'python', 'visual'],
    difficulty: 'intermediate',
    duration: 35,
    coverImage: '/assets/data-structures.png',
    lastUpdated: new Date().toISOString(),
  },
]
