import type { QuizItem } from '../types'

export const quizzes: Record<string, QuizItem[]> = {
  'loop-fundamentals': [
    {
      id: 'loop-q1',
      prompt: 'What does the following code output? <code>for i in range(3): print(i)</code>',
      type: 'mcq',
      difficulty: 'easy',
      options: ['0 1 2', '1 2 3', '0 1 2 3', 'It throws an error'],
      answer: '0 1 2',
      feedback: 'range(3) yields 0, 1, 2 before stopping.',
    },
    {
      id: 'loop-q2',
      prompt: 'Convert a while loop that counts down from 5 into a for loop using range.',
      type: 'short',
      difficulty: 'medium',
      answer: 'for n in range(5, 0, -1): ...',
      feedback: 'Use range with start, stop, step to count down.',
    },
    {
      id: 'loop-q3',
      prompt: 'Write code that iterates through a matrix and collects diagonal values.',
      type: 'code',
      difficulty: 'medium',
      answer: 'diagonal = [matrix[i][i] for i in range(len(matrix))]',
      feedback: 'Use enumerate or range paired with indexes to access diagonal elements.',
    },
  ],
}
