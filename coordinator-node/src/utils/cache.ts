import type { WikipediaPage } from './wikipediaFetcher'
import type { QuizItem } from '../types'

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number // Time to live in milliseconds
}

export class Cache {
  private static readonly WIKIPEDIA_CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours
  private static readonly QUIZ_CACHE_TTL = 12 * 60 * 60 * 1000 // 12 hours

  private static wikipediaCache = new Map<string, CacheEntry<WikipediaPage>>()
  private static quizCache = new Map<string, CacheEntry<QuizItem[]>>()

  static getWikipediaData(subjectId: string): WikipediaPage | null {
    const entry = this.wikipediaCache.get(subjectId)
    if (!entry) return null

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.wikipediaCache.delete(subjectId)
      return null
    }

    return entry.data
  }

  static setWikipediaData(subjectId: string, data: WikipediaPage): void {
    this.wikipediaCache.set(subjectId, {
      data,
      timestamp: Date.now(),
      ttl: this.WIKIPEDIA_CACHE_TTL
    })
  }

  static getQuizQuestions(subjectId: string): QuizItem[] | null {
    const entry = this.quizCache.get(subjectId)
    if (!entry) return null

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.quizCache.delete(subjectId)
      return null
    }

    return entry.data
  }

  static setQuizQuestions(subjectId: string, questions: QuizItem[]): void {
    this.quizCache.set(subjectId, {
      data: questions,
      timestamp: Date.now(),
      ttl: this.QUIZ_CACHE_TTL
    })
  }

  static clearExpiredEntries(): void {
    const now = Date.now()

    // Clear expired Wikipedia cache entries
    for (const [key, entry] of this.wikipediaCache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.wikipediaCache.delete(key)
      }
    }

    // Clear expired quiz cache entries
    for (const [key, entry] of this.quizCache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.quizCache.delete(key)
      }
    }
  }

  static getCacheStats(): {
    wikipediaEntries: number
    quizEntries: number
  } {
    return {
      wikipediaEntries: this.wikipediaCache.size,
      quizEntries: this.quizCache.size
    }
  }
}

// Clean up expired entries every hour
setInterval(() => {
  Cache.clearExpiredEntries()
}, 60 * 60 * 1000)