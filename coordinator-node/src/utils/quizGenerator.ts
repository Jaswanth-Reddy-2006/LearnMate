import type { QuizItem } from '../types'
import type { WikipediaPage } from './wikipediaFetcher'

export class QuizGenerator {
  private static readonly EASY_QUESTIONS = 10
  private static readonly MEDIUM_QUESTIONS = 10
  private static readonly HARD_QUESTIONS = 10

  private static extractKeyTerms(text: string): string[] {
    // Extract important terms using simple heuristics
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20)
    const terms: string[] = []

    for (const sentence of sentences) {
      // Look for capitalized words (potential proper nouns/concepts)
      const capitalizedWords = sentence.match(/\b[A-Z][a-z]+\b/g) || []
      terms.push(...capitalizedWords)

      // Look for technical terms in parentheses
      const parentheticalTerms = sentence.match(/\(([^)]+)\)/g) || []
      terms.push(...parentheticalTerms.map(t => t.slice(1, -1)))
    }

    // Remove duplicates and filter
    return [...new Set(terms)]
      .filter(term => term.length > 2 && term.length < 50)
      .slice(0, 20) // Limit to top 20 terms
  }

  private static generateMultipleChoiceQuestion(
    context: string,
    difficulty: 'easy' | 'medium' | 'hard',
    keyTerms: string[]
  ): QuizItem | null {
    const sentences = context.split(/[.!?]+/).filter(s => s.trim().length > 30)

    if (sentences.length < 2) return null

    // Select a base sentence
    const baseSentence = sentences[Math.floor(Math.random() * sentences.length)]
    if (!baseSentence) return null

    const words = baseSentence.split(/\s+/)

    if (words.length < 10) return null

    // For easy questions: ask about basic definitions or simple facts
    if (difficulty === 'easy') {
      const questionTemplates = [
        "What is the primary purpose of {term}?",
        "Which of the following is {term}?",
        "What does {term} refer to in {subject}?",
        "What is {term} used for?"
      ]

      const term = keyTerms.length > 0 ? keyTerms[Math.floor(Math.random() * keyTerms.length)]! : "this concept"
      const template = questionTemplates[Math.floor(Math.random() * questionTemplates.length)]

      if (!template) return null

      const question = template.replace(/\{term\}/g, term).replace(/\{subject\}/g, 'this field')

      // Generate plausible wrong answers
      const wrongAnswers = this.generateWrongAnswers(term, keyTerms, context)

      return {
        id: `q_${Date.now()}_${Math.random()}`,
        prompt: question,
        type: 'mcq',
        difficulty,
        options: this.shuffleArray([term, ...wrongAnswers.slice(0, 3)]),
        answer: term,
        feedback: `Based on the context: ${baseSentence.substring(0, 100)}...`
      }
    }

    // For medium questions: ask about relationships or processes
    if (difficulty === 'medium') {
      const questionTemplates = [
        "How does {term1} relate to {term2}?",
        "What is the relationship between {term1} and {term2}?",
        "Which of the following best describes the connection between {term1} and {term2}?"
      ]

      if (keyTerms.length < 2) return null

      const term1 = keyTerms[Math.floor(Math.random() * keyTerms.length)]
      const term2 = keyTerms[Math.floor(Math.random() * keyTerms.length)]

      if (!term1 || !term2 || term1 === term2) return null

      const template = questionTemplates[Math.floor(Math.random() * questionTemplates.length)]
      if (!template) return null

      const question = template.replace(/\{term1\}/g, term1).replace(/\{term2\}/g, term2)

      const options = [
        "They are independent concepts",
        "One is a type of the other",
        "They work together in the same process",
        "One replaces the other in modern usage"
      ]

      return {
        id: `q_${Date.now()}_${Math.random()}`,
        prompt: question,
        type: 'mcq',
        difficulty,
        options: this.shuffleArray(options),
        answer: options[1]!, // Default to "One is a type of the other"
        feedback: `In technical contexts, ${term1} and ${term2} often have hierarchical or complementary relationships.`
      }
    }

    // For hard questions: ask about specific details or applications
    if (difficulty === 'hard') {
      const questionTemplates = [
        "In what specific scenario would you apply {term}?",
        "What are the key considerations when implementing {term}?",
        "Which of the following is NOT a valid use case for {term}?"
      ]

      const term = keyTerms.length > 0 ? keyTerms[Math.floor(Math.random() * keyTerms.length)]! : "this technology"
      const template = questionTemplates[Math.floor(Math.random() * questionTemplates.length)]
      if (!template) return null

      const question = template.replace(/\{term\}/g, term)

      const options = [
        "Basic data storage",
        "Complex algorithm implementation",
        "Real-time processing requirements",
        "Simple user interface design"
      ]

      return {
        id: `q_${Date.now()}_${Math.random()}`,
        prompt: question,
        type: 'mcq',
        difficulty,
        options: this.shuffleArray(options),
        answer: options[3]!, // "Simple user interface design" as incorrect
        feedback: `${term} is typically used for complex technical implementations rather than simple UI design.`
      }
    }

    return null
  }

  private static generateShortAnswerQuestion(
    context: string,
    difficulty: 'easy' | 'medium' | 'hard',
    keyTerms: string[]
  ): QuizItem | null {
    const sentences = context.split(/[.!?]+/).filter(s => s.trim().length > 20)

    if (sentences.length < 1) return null

    if (difficulty === 'easy') {
      const questionTemplates = [
        "Define {term} in one sentence.",
        "What is {term}?",
        "Explain what {term} means."
      ]

      const term = keyTerms.length > 0 ? keyTerms[Math.floor(Math.random() * keyTerms.length)]! : "this concept"
      const template = questionTemplates[Math.floor(Math.random() * questionTemplates.length)]
      if (!template) return null

      const question = template.replace(/\{term\}/g, term)

      return {
        id: `q_${Date.now()}_${Math.random()}`,
        prompt: question,
        type: 'short',
        difficulty,
        answer: term,
        feedback: `A short definition based on the context provided.`
      }
    }

    if (difficulty === 'medium') {
      const questionTemplates = [
        "Explain how {term} works in practice.",
        "What are the main components of {term}?",
        "Describe the process of {term}."
      ]

      const term = keyTerms.length > 0 ? keyTerms[Math.floor(Math.random() * keyTerms.length)]! : "this process"
      const template = questionTemplates[Math.floor(Math.random() * questionTemplates.length)]
      if (!template) return null

      const question = template.replace(/\{term\}/g, term)

      return {
        id: `q_${Date.now()}_${Math.random()}`,
        prompt: question,
        type: 'short',
        difficulty,
        answer: `implementation of ${term}`,
        feedback: `This requires understanding the practical application and components of ${term}.`
      }
    }

    if (difficulty === 'hard') {
      const questionTemplates = [
        "Analyze the advantages and disadvantages of {term}.",
        "What are the potential challenges in implementing {term}?",
        "Compare {term} with alternative approaches."
      ]

      const term = keyTerms.length > 0 ? keyTerms[Math.floor(Math.random() * keyTerms.length)]! : "this approach"
      const template = questionTemplates[Math.floor(Math.random() * questionTemplates.length)]
      if (!template) return null

      const question = template.replace(/\{term\}/g, term)

      return {
        id: `q_${Date.now()}_${Math.random()}`,
        prompt: question,
        type: 'short',
        difficulty,
        answer: `analysis of ${term}`,
        feedback: `This requires critical thinking about the trade-offs and implementation challenges of ${term}.`
      }
    }

    return null
  }

  private static generateWrongAnswers(correctAnswer: string, keyTerms: string[], context: string): string[] {
    const wrongAnswers: string[] = []

    // Add some key terms as distractors
    wrongAnswers.push(...keyTerms.filter(term => term !== correctAnswer).slice(0, 2))

    // Add some generic technical terms
    const genericTerms = [
      "Data Processing", "System Architecture", "Network Protocol", "Algorithm Design",
      "User Interface", "Database Query", "Security Layer", "Performance Optimization"
    ]
    wrongAnswers.push(...genericTerms.slice(0, 2))

    return wrongAnswers.filter(answer => answer && answer !== correctAnswer)
  }

  private static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = shuffled[i]!
      shuffled[i] = shuffled[j]!
      shuffled[j] = temp
    }
    return shuffled
  }

  static async generateQuizQuestions(
    wikipediaData: WikipediaPage,
    config?: { easy: number; medium: number; hard: number }
  ): Promise<QuizItem[]> {
    const questions: QuizItem[] = []
    const keyTerms = this.extractKeyTerms(wikipediaData.extract)

    // Add key terms from sections
    for (const section of wikipediaData.sections) {
      keyTerms.push(...this.extractKeyTerms(section.content))
    }

    // Remove duplicates
    const uniqueKeyTerms = [...new Set(keyTerms)]

    // Use provided config or defaults
    const questionConfig = config || {
      easy: this.EASY_QUESTIONS,
      medium: this.MEDIUM_QUESTIONS,
      hard: this.HARD_QUESTIONS
    }

    // Generate questions for each difficulty level
    const difficultyConfigs = [
      { difficulty: 'easy' as const, count: questionConfig.easy },
      { difficulty: 'medium' as const, count: questionConfig.medium },
      { difficulty: 'hard' as const, count: questionConfig.hard }
    ]

    for (const config of difficultyConfigs) {
      const { difficulty, count } = config

      for (let j = 0; j < count; j++) {
        // Alternate between multiple choice and short answer
        const questionType = j % 2 === 0 ? 'mcq' : 'short'

        let question: QuizItem | null = null

        if (questionType === 'mcq') {
          question = this.generateMultipleChoiceQuestion(
            wikipediaData.extract,
            difficulty,
            uniqueKeyTerms
          )
        } else {
          question = this.generateShortAnswerQuestion(
            wikipediaData.extract,
            difficulty,
            uniqueKeyTerms
          )
        }

        if (question) {
          questions.push(question)
        }
      }
    }

    // Calculate target number of questions
    const targetQuestions = questionConfig.easy + questionConfig.medium + questionConfig.hard

    // If we don't have enough questions, fill with additional ones
    while (questions.length < targetQuestions) {
      // Distribute remaining questions across difficulty levels proportionally
      const remaining = targetQuestions - questions.length
      const easyNeeded = Math.min(remaining, Math.max(1, Math.floor(remaining * questionConfig.easy / targetQuestions)))
      const mediumNeeded = Math.min(remaining - easyNeeded, Math.max(1, Math.floor(remaining * questionConfig.medium / targetQuestions)))
      const hardNeeded = remaining - easyNeeded - mediumNeeded

      const fillConfigs = [
        { difficulty: 'easy' as const, count: easyNeeded },
        { difficulty: 'medium' as const, count: mediumNeeded },
        { difficulty: 'hard' as const, count: hardNeeded }
      ]

      for (const fillConfig of fillConfigs) {
        for (let i = 0; i < fillConfig.count && questions.length < targetQuestions; i++) {
          const question = this.generateMultipleChoiceQuestion(
            wikipediaData.extract,
            fillConfig.difficulty,
            uniqueKeyTerms
          )
          if (question) {
            questions.push(question)
          }
        }
      }

      if (questions.length >= targetQuestions) break
    }

    return questions.slice(0, targetQuestions) // Ensure exactly the target number of questions
  }
}