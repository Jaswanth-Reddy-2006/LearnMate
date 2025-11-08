import type { LessonPlan, LessonContent } from '../types'

type LessonSeed = {
  id: string
  topic: string
  title: string
  body: string
  followUps: string[]
  hints: string[]
  codeExample?: string
  microlessons: Array<{
    key: string
    title: string
    objectives: string[]
    bloomLevel: string
    timeEstimate: number
    prerequisites: string[]
    resources: string[]
  }>
}

const baseLessonPlans: Record<string, LessonPlan> = {
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

const baseLessonContent: Record<string, LessonContent> = {
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

const additionalLessonSeeds: LessonSeed[] = [
  {
    id: 'python-async-patterns',
    topic: 'Asynchronous Python Patterns',
    title: 'Async orchestration essentials',
    body: '<h2>Async orchestration</h2><p>Python\'s asyncio unlocks concurrency through cooperative scheduling. Map blocking work into awaitable tasks and lean on the event loop to coordinate execution.</p>',
    followUps: ['Instrument task execution order with logging.', 'Refactor a blocking API call into an awaitable coroutine.'],
    hints: ['Use asyncio.run as the entry point for scripts.', 'Wrap critical work with asyncio.shield to prevent cancellation.'],
    codeExample: 'import asyncio\n\nasync def fetch_data(name: str) -> str:\n    await asyncio.sleep(0.2)\n    return f"payload:{name}"\n\nasync def main():\n    results = await asyncio.gather(fetch_data("a"), fetch_data("b"))\n    print(results)\n\nasyncio.run(main())',
    microlessons: [
      {
        key: 'foundations',
        title: 'Async building blocks',
        objectives: ['Explain the event loop lifecycle', 'Differentiate coroutine, task, and future'],
        bloomLevel: 'Understand',
        timeEstimate: 12,
        prerequisites: ['loop-fundamentals'],
        resources: ['https://realpython.com/async-io-python/'],
      },
      {
        key: 'coordination',
        title: 'Coordinating coroutines',
        objectives: ['Compose gather and wait utilities', 'Handle timeouts and cancellation gracefully'],
        bloomLevel: 'Apply',
        timeEstimate: 14,
        prerequisites: ['python-async-patterns-foundations'],
        resources: ['https://docs.python.org/3/library/asyncio-task.html'],
      },
    ],
  },
  {
    id: 'pandas-dataframes',
    topic: 'Pandas DataFrame Mastery',
    title: 'DataFrame transformations',
    body: '<h2>DataFrame fluency</h2><p>Adopt vectorised operations, chaining, and profiling to keep pipelines efficient and expressive.</p>',
    followUps: ['Profile a dataset using pandas-profiling.', 'Rewrite loops into vectorised pandas operations.'],
    hints: ['Prefer assign and pipe for readable chaining.', 'Use nullable dtypes for reliable missing value handling.'],
    microlessons: [
      {
        key: 'profiling',
        title: 'Profiling and cleaning',
        objectives: ['Detect schema drift quickly', 'Apply robust missing data strategies'],
        bloomLevel: 'Analyze',
        timeEstimate: 11,
        prerequisites: [],
        resources: ['https://pandas.pydata.org/docs/user_guide/basics.html'],
      },
      {
        key: 'transform',
        title: 'Transformations and joins',
        objectives: ['Leverage merge strategies', 'Optimise chained operations'],
        bloomLevel: 'Apply',
        timeEstimate: 13,
        prerequisites: ['pandas-dataframes-profiling'],
        resources: ['https://pandas.pydata.org/docs/user_guide/merging.html'],
      },
    ],
  },
  {
    id: 'sql-window-functions',
    topic: 'SQL Window Functions Deep Dive',
    title: 'Window analytics kick-off',
    body: '<h2>Window fundamentals</h2><p>Window functions allow insight per partition without collapsing rows. Master partitions, frames, and ranking to produce advanced analytics.</p>',
    followUps: ['Implement row_number, rank, and dense_rank on sample data.', 'Compare frame clauses to highlight running totals.'],
    hints: ['Remember that partitions reset ranking.', 'Frames default to RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.'],
    microlessons: [
      {
        key: 'partitions',
        title: 'Partitions and frames',
        objectives: ['Segment data with partition clauses', 'Control frame windows for running metrics'],
        bloomLevel: 'Apply',
        timeEstimate: 12,
        prerequisites: [],
        resources: ['https://mode.com/sql-tutorial/sql-window-functions/'],
      },
      {
        key: 'ranking',
        title: 'Ranking and advanced patterns',
        objectives: ['Use rank and dense_rank effectively', 'Detect anomalies with lag and lead'],
        bloomLevel: 'Analyze',
        timeEstimate: 13,
        prerequisites: ['sql-window-functions-partitions'],
        resources: ['https://learn.microsoft.com/sql/t-sql/queries/select-over-clause'],
      },
    ],
  },
  {
    id: 'graph-algorithms',
    topic: 'Graph Algorithms for Interviews',
    title: 'Graph thinking primer',
    body: '<h2>Graph intuition</h2><p>Represent problems as nodes and edges to unlock traversal, connectivity, and optimisation strategies during interviews.</p>',
    followUps: ['Model an interview problem as a graph before coding.', 'Visualise BFS versus DFS traversal order.'],
    hints: ['Map adjacency explicitly to avoid missed edges.', 'Track visited nodes to prevent infinite loops.'],
    microlessons: [
      {
        key: 'traversal',
        title: 'Traversal strategies',
        objectives: ['Differentiate BFS and DFS uses', 'Discuss time and space impacts'],
        bloomLevel: 'Understand',
        timeEstimate: 10,
        prerequisites: ['data-structures'],
        resources: ['https://cp-algorithms.com/graph/breadth-first-search.html'],
      },
      {
        key: 'shortest-paths',
        title: 'Shortest paths and cycles',
        objectives: ['Explain Dijkstra and BFS trade-offs', 'Detect and handle cycles confidently'],
        bloomLevel: 'Apply',
        timeEstimate: 15,
        prerequisites: ['graph-algorithms-traversal'],
        resources: ['https://brilliant.org/wiki/dijkstras-short-path-finder/'],
      },
    ],
  },
  {
    id: 'ml-feature-engineering',
    topic: 'Feature Engineering Playbook',
    title: 'Signal crafting essentials',
    body: '<h2>Feature discovery</h2><p>Strong features translate raw data into separable signals. Explore transformations, encodings, and monitoring to keep models healthy.</p>',
    followUps: ['Create a feature importance dashboard.', 'Design a feature store schema for reuse.'],
    hints: ['Track data drift with population stability index.', 'Document each transformation for auditability.'],
    microlessons: [
      {
        key: 'discovery',
        title: 'Feature discovery patterns',
        objectives: ['Brainstorm transformations per data type', 'Evaluate leakage risks early'],
        bloomLevel: 'Analyze',
        timeEstimate: 14,
        prerequisites: ['pandas-dataframes'],
        resources: ['https://www.kaggle.com/learn/feature-engineering'],
      },
      {
        key: 'automation',
        title: 'Operationalising features',
        objectives: ['Automate pipelines with reproducibility', 'Monitor feature quality in production'],
        bloomLevel: 'Apply',
        timeEstimate: 16,
        prerequisites: ['ml-feature-engineering-discovery'],
        resources: ['https://docs.featureform.com/docs'],
      },
    ],
  },
  {
    id: 'prompt-design',
    topic: 'Prompt Design Studio',
    title: 'Prompt frameworks',
    body: '<h2>Prompt craftsmanship</h2><p>Layer instructions, examples, and guardrails to help language models deliver reliable results.</p>',
    followUps: ['Draft a rubric to judge prompt success.', 'Experiment with few-shot examples for precision.'],
    hints: ['Surface constraints and persona early in the prompt.', 'Use delimiters to separate instructions from data.'],
    microlessons: [
      {
        key: 'structures',
        title: 'Structured prompting',
        objectives: ['Compose role, goal, and data sections', 'Leverage chain-of-thought responsibly'],
        bloomLevel: 'Apply',
        timeEstimate: 11,
        prerequisites: [],
        resources: ['https://learn.microsoft.com/azure/ai-services/openai/concepts/prompt-engineering'],
      },
      {
        key: 'iteration',
        title: 'Iteration and evaluation',
        objectives: ['Establish evaluation rubrics', 'Capture feedback to refine prompts'],
        bloomLevel: 'Analyze',
        timeEstimate: 12,
        prerequisites: ['prompt-design-structures'],
        resources: ['https://platform.openai.com/docs/guides/prompt-engineering'],
      },
    ],
  },
  {
    id: 'genai-evaluation',
    topic: 'Generative AI Evaluation',
    title: 'Evaluation discipline',
    body: '<h2>Guardrail analytics</h2><p>Blend qualitative review, automation, and signals to continuously test generative systems.</p>',
    followUps: ['Design a semantic similarity scoring notebook.', 'Set up a human review queue with tagging.'],
    hints: ['Track both precision and recall for safety scoring.', 'Rotate evaluators to avoid annotation bias.'],
    microlessons: [
      {
        key: 'metrics',
        title: 'Metric design',
        objectives: ['Compare automatic and human metrics', 'Score generations with embeddings'],
        bloomLevel: 'Analyze',
        timeEstimate: 13,
        prerequisites: ['prompt-design'],
        resources: ['https://arxiv.org/abs/2212.09251'],
      },
      {
        key: 'reviews',
        title: 'Human-AI review flows',
        objectives: ['Operationalise review guidelines', 'Calibrate consistent scoring across raters'],
        bloomLevel: 'Apply',
        timeEstimate: 14,
        prerequisites: ['genai-evaluation-metrics'],
        resources: ['https://www.anthropic.com/index/prompting-guide'],
      },
    ],
  },
  {
    id: 'system-design-fundamentals',
    topic: 'System Design Fundamentals',
    title: 'Architectural baselines',
    body: '<h2>Systems thinking</h2><p>Break down requirements into reliable components and communicate trade-offs clearly.</p>',
    followUps: ['Sketch a high-level architecture for a familiar product.', 'Practice capacity planning for an upcoming interview.'],
    hints: ['Start with requirements before choosing technology.', 'Call out bottlenecks and mitigation paths.'],
    microlessons: [
      {
        key: 'foundations',
        title: 'Architectural foundations',
        objectives: ['Identify core components for common systems', 'Discuss latency, throughput, and consistency'],
        bloomLevel: 'Understand',
        timeEstimate: 15,
        prerequisites: [],
        resources: ['https://github.com/donnemartin/system-design-primer'],
      },
      {
        key: 'scaling',
        title: 'Scaling trade-offs',
        objectives: ['Compare vertical and horizontal scaling strategies', 'Explain caching and partitioning approaches'],
        bloomLevel: 'Analyze',
        timeEstimate: 16,
        prerequisites: ['system-design-fundamentals-foundations'],
        resources: ['https://aws.amazon.com/architecture/'],
      },
    ],
  },
  {
    id: 'api-design-patterns',
    topic: 'API Design Patterns',
    title: 'API design lab',
    body: '<h2>API craftsmanship</h2><p>Deliver predictable contracts and resilient integrations by modelling resources and aligning on standards.</p>',
    followUps: ['Define versioning strategy for an existing API.', 'Instrument an endpoint with structured logging.'],
    hints: ['Treat documentation as a first-class deliverable.', 'Prefer idempotent operations for reliability.'],
    microlessons: [
      {
        key: 'modeling',
        title: 'Resource modeling',
        objectives: ['Choose resource boundaries wisely', 'Design pagination and filtering models'],
        bloomLevel: 'Apply',
        timeEstimate: 12,
        prerequisites: [],
        resources: ['https://restfulapi.net/resource-naming/'],
      },
      {
        key: 'resilience',
        title: 'Resilience and observability',
        objectives: ['Add retries and circuit breakers thoughtfully', 'Expose metrics and traces for consumers'],
        bloomLevel: 'Analyze',
        timeEstimate: 13,
        prerequisites: ['api-design-patterns-modeling'],
        resources: ['https://martinfowler.com/articles/patterns-of-distributed-systems/', 'https://opentelemetry.io/'],
      },
    ],
  },
  {
    id: 'typescript-generics',
    topic: 'TypeScript Generics and Utility Types',
    title: 'Generic mastery',
    body: '<h2>Generics in action</h2><p>Generics unlock reusable, type-safe abstractions. Understand constraints, inference, and mapped utilities.</p>',
    followUps: ['Refactor a React hook to leverage generics.', 'Author a utility type to transform API responses.'],
    hints: ['Infer with extends clauses when possible.', 'Distribute over unions to keep types precise.'],
    codeExample: 'type ApiResponse<T> = {\n  data: T;\n  error?: string;\n}\n\nconst wrap = <T,>(payload: T): ApiResponse<T> => ({ data: payload })',
    microlessons: [
      {
        key: 'foundations',
        title: 'Generic foundations',
        objectives: ['Declare generic functions and types', 'Apply constraints with extends'],
        bloomLevel: 'Understand',
        timeEstimate: 11,
        prerequisites: [],
        resources: ['https://www.typescriptlang.org/docs/handbook/2/generics.html'],
      },
      {
        key: 'utilities',
        title: 'Advanced utility types',
        objectives: ['Compose mapped and conditional types', 'Leverage infer for pattern matching'],
        bloomLevel: 'Analyze',
        timeEstimate: 12,
        prerequisites: ['typescript-generics-foundations'],
        resources: ['https://www.typescriptlang.org/docs/handbook/2/conditional-types.html'],
      },
    ],
  },
  {
    id: 'react-performance',
    topic: 'React Performance Engineering',
    title: 'Rendering optimisation',
    body: '<h2>Responsive interfaces</h2><p>Diagnose renders, cache computations, and adopt concurrent features to deliver silky experiences.</p>',
    followUps: ['Profile a page using React DevTools profiler.', 'Introduce suspense boundaries for async data.'],
    hints: ['Memoise expensive values with useMemo wisely.', 'Batch state updates with transitions when possible.'],
    microlessons: [
      {
        key: 'diagnostics',
        title: 'Rendering diagnostics',
        objectives: ['Trace re-render triggers', 'Measure component timing'],
        bloomLevel: 'Analyze',
        timeEstimate: 12,
        prerequisites: ['typescript-generics'],
        resources: ['https://react.dev/reference/react/Profiler'],
      },
      {
        key: 'concurrency',
        title: 'Concurrent patterns',
        objectives: ['Adopt transitions for user input', 'Leverage memo and deferred values'],
        bloomLevel: 'Apply',
        timeEstimate: 13,
        prerequisites: ['react-performance-diagnostics'],
        resources: ['https://react.dev/reference/react/useTransition'],
      },
    ],
  },
  {
    id: 'tailwind-design-systems',
    topic: 'Tailwind Design Systems',
    title: 'UI system building',
    body: '<h2>Design tokens</h2><p>Tailwind empowers rapid UI systems via tokens, variants, and responsive primitives. Standardise design once and reuse everywhere.</p>',
    followUps: ['Define a typography scale in config.', 'Create accessibility states for interactive components.'],
    hints: ['Extract reusable class patterns with @apply sparingly.', 'Document component states in Storybook or similar.'],
    microlessons: [
      {
        key: 'tokens',
        title: 'Token architecture',
        objectives: ['Map brand palette into Tailwind config', 'Set spacing and typography scales'],
        bloomLevel: 'Understand',
        timeEstimate: 10,
        prerequisites: ['react-performance'],
        resources: ['https://tailwindcss.com/docs/theme'],
      },
      {
        key: 'states',
        title: 'Interactive states',
        objectives: ['Design focus, hover, and motion treatments', 'Build variant-driven components'],
        bloomLevel: 'Apply',
        timeEstimate: 12,
        prerequisites: ['tailwind-design-systems-tokens'],
        resources: ['https://tailwindcss.com/docs/hover-focus-and-other-states'],
      },
    ],
  },
  {
    id: 'test-automation',
    topic: 'Test Automation Essentials',
    title: 'Automation pillars',
    body: '<h2>Quality safeguards</h2><p>Automated tests protect releases. Blend unit, integration, and contract suites tied into CI for trustworthy delivery.</p>',
    followUps: ['Draft a test pyramid for your product.', 'Set up contract tests for a critical API.'],
    hints: ['Keep flaky tests quarantined with clear remediation.', 'Use fixtures to express intent rather than implementation detail.'],
    microlessons: [
      {
        key: 'strategy',
        title: 'Testing strategy',
        objectives: ['Balance test types for coverage', 'Set success criteria for automation suites'],
        bloomLevel: 'Understand',
        timeEstimate: 11,
        prerequisites: [],
        resources: ['https://martinfowler.com/bliki/TestPyramid.html'],
      },
      {
        key: 'delivery',
        title: 'Continuous delivery integration',
        objectives: ['Integrate suites into CI pipelines', 'Monitor test health over time'],
        bloomLevel: 'Apply',
        timeEstimate: 12,
        prerequisites: ['test-automation-strategy'],
        resources: ['https://docs.github.com/actions/automating-builds-and-tests'],
      },
    ],
  },
  {
    id: 'devops-observability',
    topic: 'DevOps Observability Toolkit',
    title: 'Observability mindset',
    body: '<h2>Holistic visibility</h2><p>Instrument traces, metrics, and logs from the outset to convert unknowns into actionable insights.</p>',
    followUps: ['Capture a distributed trace for a multi-service flow.', 'Set up SLOs with error budget alerts.'],
    hints: ['Align telemetry cardinality with storage budgets.', 'Expose RED metrics for every critical service.'],
    microlessons: [
      {
        key: 'instrumentation',
        title: 'Instrumentation fundamentals',
        objectives: ['Choose telemetry types per scenario', 'Propagate context through services'],
        bloomLevel: 'Apply',
        timeEstimate: 13,
        prerequisites: ['api-design-patterns'],
        resources: ['https://opentelemetry.io/docs/'],
      },
      {
        key: 'alerting',
        title: 'Alerting and response',
        objectives: ['Define meaningful alerts from telemetry', 'Automate runbooks and escalation paths'],
        bloomLevel: 'Analyze',
        timeEstimate: 14,
        prerequisites: ['devops-observability-instrumentation'],
        resources: ['https://sre.google/workbook/alerting-on-slos/'],
      },
    ],
  },
  {
    id: 'kubernetes-foundations',
    topic: 'Kubernetes Foundations',
    title: 'Cluster confidence',
    body: '<h2>Cluster competency</h2><p>Understand core Kubernetes primitives to ship containers reliably and scale workloads automatically.</p>',
    followUps: ['Deploy a sample workload with rolling updates.', 'Tune resource requests for a stateful service.'],
    hints: ['Labels and selectors power everything from services to deployments.', 'Keep namespaces tidy to organise workloads.'],
    microlessons: [
      {
        key: 'basics',
        title: 'Cluster basics',
        objectives: ['Explain pods, deployments, and services', 'Manage configuration with ConfigMaps and Secrets'],
        bloomLevel: 'Understand',
        timeEstimate: 12,
        prerequisites: ['cloud-deployment'],
        resources: ['https://kubernetes.io/docs/concepts/'],
      },
      {
        key: 'operations',
        title: 'Workload operations',
        objectives: ['Scale workloads safely', 'Debug pods using native tooling'],
        bloomLevel: 'Apply',
        timeEstimate: 13,
        prerequisites: ['kubernetes-foundations-basics'],
        resources: ['https://kubernetes.io/docs/tasks/'],
      },
    ],
  },
  {
    id: 'cloud-deployment',
    topic: 'Cloud Deployment Pipelines',
    title: 'Deployment pipelines',
    body: '<h2>Reliable releases</h2><p>Automate provisioning, packaging, and rollout workflows to ship changes with confidence.</p>',
    followUps: ['Implement blue-green deployment in a sandbox.', 'Add automated rollback triggers for failed releases.'],
    hints: ['Treat infrastructure as code for repeatability.', 'Gate production deploys with automated and manual checks.'],
    microlessons: [
      {
        key: 'pipelines',
        title: 'Pipeline foundations',
        objectives: ['Model stages from build to deploy', 'Integrate secrets management securely'],
        bloomLevel: 'Apply',
        timeEstimate: 12,
        prerequisites: ['test-automation'],
        resources: ['https://aws.amazon.com/devops/continuous-delivery/'],
      },
      {
        key: 'releases',
        title: 'Release strategies',
        objectives: ['Compare blue-green, canary, and rolling deploys', 'Monitor deploy health in real time'],
        bloomLevel: 'Analyze',
        timeEstimate: 13,
        prerequisites: ['cloud-deployment-pipelines'],
        resources: ['https://learn.microsoft.com/azure/devops/multi-stage-pipelines/deploy/'],
      },
    ],
  },
  {
    id: 'security-basics',
    topic: 'Application Security Basics',
    title: 'Security playbook',
    body: '<h2>Secure by design</h2><p>Adopt secure defaults, threat modeling, and continuous checks to protect users and data.</p>',
    followUps: ['Run an OWASP ASVS self-assessment.', 'Create a secret rotation checklist.'],
    hints: ['Validate and sanitise all external input.', 'Log authentication and authorisation events for audits.'],
    microlessons: [
      {
        key: 'awareness',
        title: 'Threat awareness',
        objectives: ['Identify top OWASP risks', 'Describe least privilege principles'],
        bloomLevel: 'Understand',
        timeEstimate: 11,
        prerequisites: [],
        resources: ['https://owasp.org/www-project-top-ten/'],
      },
      {
        key: 'implementation',
        title: 'Secure implementation',
        objectives: ['Apply secure coding patterns', 'Instrument security monitoring'],
        bloomLevel: 'Apply',
        timeEstimate: 12,
        prerequisites: ['security-basics-awareness'],
        resources: ['https://cheatsheetseries.owasp.org/'],
      },
    ],
  },
  {
    id: 'communication-for-devs',
    topic: 'Communication for Developers',
    title: 'Impactful updates',
    body: '<h2>Clarity and influence</h2><p>Translate technical work into compelling narratives that rally teams and stakeholders.</p>',
    followUps: ['Draft a high-impact project update.', 'Practice framing a blocker with options and asks.'],
    hints: ['Lead with outcomes before implementation details.', 'Close every update with clear next steps.'],
    microlessons: [
      {
        key: 'storytelling',
        title: 'Narrative structure',
        objectives: ['Frame context, action, and result', 'Tailor depth for the audience'],
        bloomLevel: 'Understand',
        timeEstimate: 9,
        prerequisites: [],
        resources: ['https://www.alexsugg.com/narrative-structure/'],
      },
      {
        key: 'alignment',
        title: 'Feedback and alignment',
        objectives: ['Ask clarifying questions effectively', 'Summarise decisions and owners'],
        bloomLevel: 'Apply',
        timeEstimate: 9,
        prerequisites: ['communication-for-devs-storytelling'],
        resources: ['https://rework.withgoogle.com/guides/giving-and-receiving-feedback/'],
      },
    ],
  },
  {
    id: 'ux-microcopy',
    topic: 'UX Microcopy Lab',
    title: 'Voice and guidance',
    body: '<h2>Words as design</h2><p>Microcopy sets tone, guides behaviour, and builds trust. Iterate with empathy to help users succeed.</p>',
    followUps: ['Rewrite an error message with clear resolution steps.', 'Create empty-state copy that nudges action.'],
    hints: ['Use verbs that encourage action and confidence.', 'Surface the most important detail first.'],
    microlessons: [
      {
        key: 'voice',
        title: 'Voice and tone systems',
        objectives: ['Define brand personality sliders', 'Adapt tone for various scenarios'],
        bloomLevel: 'Understand',
        timeEstimate: 8,
        prerequisites: ['communication-for-devs'],
        resources: ['https://mailchimp.com/content-style-guide/'],
      },
      {
        key: 'patterns',
        title: 'Pattern library',
        objectives: ['Document consistent patterns for forms', 'Draft reusable microcopy snippets'],
        bloomLevel: 'Apply',
        timeEstimate: 9,
        prerequisites: ['ux-microcopy-voice'],
        resources: ['https://www.uxwritinglibrary.com/'],
      },
    ],
  },
  {
    id: 'product-thinking',
    topic: 'Product Thinking Sprints',
    title: 'Outcome orientation',
    body: '<h2>Learning loops</h2><p>Adopt product discovery habits to ensure solutions solve real problems and deliver measurable impact.</p>',
    followUps: ['Draft a lean experiment canvas.', 'Assess desirability, viability, and feasibility assumptions.'],
    hints: ['Validate assumptions before committing to build.', 'Champion user outcomes in prioritisation meetings.'],
    microlessons: [
      {
        key: 'discovery',
        title: 'Discovery mindset',
        objectives: ['Map user journeys to pain points', 'Formulate hypotheses grounded in research'],
        bloomLevel: 'Understand',
        timeEstimate: 10,
        prerequisites: [],
        resources: ['https://svpg.com/product-discovery-overview/'],
      },
      {
        key: 'prioritisation',
        title: 'Prioritisation habits',
        objectives: ['Evaluate opportunities using RICE or similar', 'Align teams around north star metrics'],
        bloomLevel: 'Analyze',
        timeEstimate: 11,
        prerequisites: ['product-thinking-discovery'],
        resources: ['https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/'],
      },
    ],
  },
  {
    id: 'python-data-cleaning',
    topic: 'Python Data Cleaning Clinic',
    title: 'Data hygiene',
    body: '<h2>Reliable data</h2><p>Design pipelines that detect anomalies early and keep data ready for downstream analytics.</p>',
    followUps: ['Build a validation suite with Great Expectations.', 'Automate schema drift alerts.'],
    hints: ['Separate detection, correction, and validation steps.', 'Log every assumption for downstream teams.'],
    microlessons: [
      {
        key: 'detection',
        title: 'Detection and profiling',
        objectives: ['Profile datasets for outliers', 'Track schema changes over time'],
        bloomLevel: 'Analyze',
        timeEstimate: 12,
        prerequisites: ['pandas-dataframes'],
        resources: ['https://greatexpectations.io/'],
      },
      {
        key: 'validation',
        title: 'Validation automation',
        objectives: ['Automate data quality checks', 'Report issues to stakeholders promptly'],
        bloomLevel: 'Apply',
        timeEstimate: 13,
        prerequisites: ['python-data-cleaning-detection'],
        resources: ['https://docs.greatexpectations.io/docs/'],
      },
    ],
  },
  {
    id: 'career-interview-prep',
    topic: 'Interview Prep Accelerator',
    title: 'Interview readiness',
    body: '<h2>Holistic preparation</h2><p>Blend storytelling, technical rehearsal, and reflection to show up confident and prepared.</p>',
    followUps: ['Record a mock interview with a peer.', 'Review past interviews to extract learnings.'],
    hints: ['Captivate with STAR (Situation, Task, Action, Result).', 'Align technical answers to business impact.'],
    microlessons: [
      {
        key: 'behavioral',
        title: 'Narrative building',
        objectives: ['Craft STAR stories for key competencies', 'Practice delivery with feedback loops'],
        bloomLevel: 'Apply',
        timeEstimate: 9,
        prerequisites: ['communication-for-devs'],
        resources: ['https://www.themuse.com/advice/star-interview-method'],
      },
      {
        key: 'technical',
        title: 'Technical rehearsal',
        objectives: ['Simulate technical interviews end-to-end', 'Reflect on signal and improvement areas'],
        bloomLevel: 'Analyze',
        timeEstimate: 10,
        prerequisites: ['career-interview-prep-behavioral'],
        resources: ['https://interviewing.io/'],
      },
    ],
  },
  {
    id: 'ai-ethics-safeguards',
    topic: 'AI Ethics Safeguards',
    title: 'Responsible AI guardrails',
    body: '<h2>Responsible AI guardrails</h2><p>Balance innovation with accountability by embedding safeguards, audits, and inclusive datasets into model lifecycles.</p>',
    followUps: ['Audit a model for potential bias signals.', 'Outline a responsible AI checklist for launches.'],
    hints: ['Collect representative evaluation data.', 'Escalate high-risk findings to governance forums.'],
    microlessons: [
      {
        key: 'principles',
        title: 'Ethical principles in practice',
        objectives: ['Describe core fairness principles', 'Explain transparency and accountability expectations'],
        bloomLevel: 'Understand',
        timeEstimate: 12,
        prerequisites: [],
        resources: ['https://www.nist.gov/itl/ai-risk-management-framework'],
      },
      {
        key: 'governance',
        title: 'Governance and safeguards',
        objectives: ['Map responsible AI review checkpoints', 'Design mitigation plans for bias and harm'],
        bloomLevel: 'Analyze',
        timeEstimate: 14,
        prerequisites: ['ai-ethics-safeguards-principles'],
        resources: ['https://ai.facebook.com/blog/ai-responsible-innovation/'],
      },
    ],
  },
  {
    id: 'mlops-pipeline-builder',
    topic: 'MLOps Pipeline Builder',
    title: 'Production ML systems',
    body: '<h2>MLOps pipelines</h2><p>Standardise training, deployment, and monitoring to keep machine learning systems reliable at scale.</p>',
    followUps: ['Define an end-to-end pipeline diagram.', 'Add monitoring hooks for drift detection.'],
    hints: ['Decouple training and inference artifacts.', 'Automate retraining triggers with metrics thresholds.'],
    microlessons: [
      {
        key: 'orchestration',
        title: 'Pipeline orchestration',
        objectives: ['Compose repeatable ML pipelines', 'Package models and dependencies for deployment'],
        bloomLevel: 'Apply',
        timeEstimate: 13,
        prerequisites: ['ml-feature-engineering'],
        resources: ['https://www.mlflow.org/docs/latest/index.html'],
      },
      {
        key: 'operations',
        title: 'Operations and monitoring',
        objectives: ['Instrument CI/CD for models', 'Set up alerts for drift and anomalies'],
        bloomLevel: 'Analyze',
        timeEstimate: 15,
        prerequisites: ['mlops-pipeline-builder-orchestration'],
        resources: ['https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines'],
      },
    ],
  },
  {
    id: 'data-visual-storytelling',
    topic: 'Data Visual Storytelling',
    title: 'Narrative dashboards',
    body: '<h2>Insightful storytelling</h2><p>Use visual design, narrative structure, and guided annotation to help audiences act on data quickly.</p>',
    followUps: ['Redesign a chart to highlight the core insight.', 'Annotate a dashboard with guided narration.'],
    hints: ['Lead with the headline metric.', 'Use motion and colour intentionally to focus attention.'],
    microlessons: [
      {
        key: 'framing',
        title: 'Story framing',
        objectives: ['Define the question each visual answers', 'Align metrics with stakeholder goals'],
        bloomLevel: 'Understand',
        timeEstimate: 11,
        prerequisites: ['python-data-cleaning'],
        resources: ['https://storytellingwithdata.com/'],
      },
      {
        key: 'visual-techniques',
        title: 'Visual techniques',
        objectives: ['Select chart types to match intent', 'Apply layout and colour systems for clarity'],
        bloomLevel: 'Apply',
        timeEstimate: 12,
        prerequisites: ['data-visual-storytelling-framing'],
        resources: ['https://datavizcatalogue.com/'],
      },
    ],
  },
]

additionalLessonSeeds.forEach((seed) => {
  baseLessonPlans[seed.id] = {
    topic: seed.topic,
    microlessons: seed.microlessons.map((section) => ({
      id: `${seed.id}-${section.key}`,
      title: section.title,
      objectives: section.objectives,
      bloomLevel: section.bloomLevel,
      timeEstimate: section.timeEstimate,
      prerequisites: section.prerequisites,
      recommendedQuiz: true,
      resources: section.resources,
    })),
  }
  baseLessonContent[seed.id] = {
    id: seed.id,
    title: seed.title,
    body: seed.body,
    ...(seed.codeExample ? { codeExample: seed.codeExample } : {}),
    followUps: seed.followUps,
    hints: seed.hints,
  }
})

export const lessonPlans = baseLessonPlans
export const lessonContent = baseLessonContent
