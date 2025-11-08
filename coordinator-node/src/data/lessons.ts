import type { LessonPlan, LessonContent } from '../types'

export const lessonPlans: Record<string, LessonPlan> = {
  'loop-fundamentals': {
    topic: 'Python Loop Fundamentals',
    microlessons: [
      {
        id: 'loop-fundamentals',
        title: 'Loop Foundations',
        objectives: ['Understand iteration primitives', 'Identify loop components'],
        bloomLevel: 'Understand',
        timeEstimate: 12,
        prerequisites: [],
        recommendedQuiz: true,
        resources: ['https://docs.python.org/3/tutorial/controlflow.html#for-statements'],
      },
      {
        id: 'loop-patterns',
        title: 'Loop Patterns and Variations',
        objectives: ['Apply loops to collections', 'Use enumerate and range effectively'],
        bloomLevel: 'Apply',
        timeEstimate: 9,
        prerequisites: ['loop-fundamentals'],
        recommendedQuiz: true,
        resources: ['https://realpython.com/python-for-loop/'],
      },
      {
        id: 'nested-loops',
        title: 'Nested Loops and Complexity',
        objectives: ['Trace nested iterations', 'Estimate complexity cost'],
        bloomLevel: 'Analyze',
        timeEstimate: 11,
        prerequisites: ['loop-fundamentals', 'loop-patterns'],
        recommendedQuiz: true,
        resources: ['https://realpython.com/nested-loops-python/'],
      },
    ],
  },
  'recursion-visual': {
    topic: 'Visual Recursion Patterns',
    microlessons: [
      {
        id: 'recursion-basics',
        title: 'Recursion Mindset',
        objectives: ['Detect base case', 'Describe recursive progression'],
        bloomLevel: 'Understand',
        timeEstimate: 10,
        prerequisites: ['loop-fundamentals'],
        recommendedQuiz: true,
        resources: ['https://realpython.com/python-recursion/'],
      },
      {
        id: 'call-stack-visuals',
        title: 'Call Stack Visualisations',
        objectives: ['Trace stack frames', 'Explain unwinding'],
        bloomLevel: 'Analyze',
        timeEstimate: 12,
        prerequisites: ['recursion-basics'],
        recommendedQuiz: true,
        resources: ['https://visualgo.net/en/recursion'],
      },
    ],
  },
  'data-structures': {
    topic: 'Interactive Data Structures',
    microlessons: [
      {
        id: 'arrays-overview',
        title: 'Array Mechanics',
        objectives: ['Index elements', 'Evaluate complexity'],
        bloomLevel: 'Understand',
        timeEstimate: 8,
        prerequisites: ['loop-fundamentals'],
        recommendedQuiz: true,
        resources: ['https://realpython.com/python-lists-tuples/'],
      },
      {
        id: 'queues-stacks',
        title: 'Queues and Stacks',
        objectives: ['Compare structures', 'Select use cases'],
        bloomLevel: 'Apply',
        timeEstimate: 9,
        prerequisites: ['arrays-overview'],
        recommendedQuiz: true,
        resources: ['https://realpython.com/queue-in-python/'],
      },
    ],
  },
}

export const lessonContent: Record<string, LessonContent> = {
  'loop-fundamentals': {
    id: 'loop-fundamentals',
    title: 'Loop Foundations',
    body: `
      <h2>Why loops?</h2>
      <p>Loops let you repeat logic without copying code. In Python we primarily rely on <strong>for</strong> and <strong>while</strong> loops. A <em>for</em> loop iterates through each element of an iterable.</p>
      <pre><code class="language-python">names = ["Avery", "Kai", "Mira"]
for name in names:
    print(f"Hello {name}")</code></pre>
      <p>The lesson planner also tracks your comprehension. After each interaction the quiz agent adjusts difficulty while the emotion agent monitors typing cadence to detect frustration.</p>
    `,
    codeExample: 'numbers = [1, 2, 3]\ntotal = 0\nfor n in numbers:\n    total += n\nprint(total)',
    followUps: ['Try converting the for loop into a while loop.', 'How could you handle empty lists gracefully?'],
    hints: ['Remember that range(3) yields 0, 1, 2.', 'You can use enumerate to access both index and value.'],
  },
  'loop-patterns': {
    id: 'loop-patterns',
    title: 'Loop Patterns and Variations',
    body: `
      <h2>Structured loop patterns</h2>
      <p>Classic loop patterns such as filter-map-reduce accelerate problem solving. Try refactoring repetitive code into comprehension patterns.</p>
    `,
    followUps: ['Rewrite imperative loops into list comprehensions.', 'Introduce guard clauses inside loops.'],
    hints: ['Comprehensions still allow conditional expressions.'],
  },
  'nested-loops': {
    id: 'nested-loops',
    title: 'Nested Loops and Complexity',
    body: `
      <h2>Nested iteration</h2>
      <p>Nested loops multiply the work performed. Visualise them as grids and remember to annotate invariants.</p>
    `,
    followUps: ['Sketch the iteration order before coding.', 'Consider breaking early when possible.'],
    hints: ['Use zip to combine iterables instead of manual nested loops where possible.'],
  },
  'recursion-basics': {
    id: 'recursion-basics',
    title: 'Recursion Mindset',
    body: `
      <h2>Think recursively</h2>
      <p>Every recursive routine needs a base case and a smaller subproblem. Draw the tree to visualise the breakdown.</p>
    `,
    followUps: ['State the base case out loud before coding.', 'Model the recursion for three levels to ensure it converges.'],
    hints: ['Make the problem smaller at each call.', 'Return immediately when hitting the base case.'],
  },
  'call-stack-visuals': {
    id: 'call-stack-visuals',
    title: 'Call Stack Visualisations',
    body: `
      <h2>Follow the call stack</h2>
      <p>Track frame creation and unwinding to explain how results bubble up. Use diagrams to anchor intuition.</p>
    `,
    followUps: ['Record variable values at each level.', 'Explain why unwinding stops at the base case.'],
    hints: ['Keep a stack diagram nearby while coding.'],
  },
  'arrays-overview': {
    id: 'arrays-overview',
    title: 'Array Mechanics',
    body: `
      <h2>Array review</h2>
      <p>Arrays offer O(1) access but require contiguous memory. Practice translating between zero-based indices and human counting.</p>
    `,
    followUps: ['Benchmark appends versus inserts.', 'Map array operations to time complexity.'],
    hints: ['Remember that slicing copies in Python lists.'],
  },
  'queues-stacks': {
    id: 'queues-stacks',
    title: 'Queues and Stacks',
    body: `
      <h2>Queue vs stack</h2>
      <p>Both manage ordered collections but with different removal policies. Explore where breadth-first and depth-first traversals rely on them.</p>
    `,
    followUps: ['Simulate BFS and DFS on a simple graph.', 'Replace recursion with a manual stack to understand control flow.'],
    hints: ['Deque from collections works for both patterns.'],
  },
}
