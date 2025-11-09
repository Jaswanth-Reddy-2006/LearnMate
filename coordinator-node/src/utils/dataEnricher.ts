import axios from 'axios'

export interface EnrichedCourseData {
  overview: string
  benefits: string[]
  importance: string
  keyTopics: string[]
  realWorldApplications: string[]
  industryDemand: string
  learningTips: string[]
}

export class DataEnricher {
  private static readonly WIKIDATA_API = 'https://www.wikidata.org/w/api.php'
  private static readonly DBPEDIA_API = 'https://dbpedia.org/sparql'
  private static readonly OPENLIBRARY_API = 'https://openlibrary.org/api'

  static async fetchFromWikidata(subject: string): Promise<string | null> {
    try {
      const response = await axios.get(this.WIKIDATA_API, {
        params: {
          action: 'wbsearchentities',
          search: subject,
          language: 'en',
          format: 'json',
        },
        timeout: 5000,
      })

      if (response.data.search && response.data.search.length > 0) {
        return response.data.search[0].description || null
      }
      return null
    } catch (error) {
      console.error(`Wikidata fetch failed for ${subject}:`, error)
      return null
    }
  }

  static async fetchFromDBpedia(subject: string): Promise<string | null> {
    try {
      const query = `
        SELECT ?abstract WHERE {
          ?resource rdfs:label "${subject}"@en ;
                    dbo:abstract ?abstract .
          FILTER (lang(?abstract) = "en")
        }
        LIMIT 1
      `

      const response = await axios.get(this.DBPEDIA_API, {
        params: {
          query,
          format: 'json',
        },
        timeout: 5000,
      })

      if (response.data.results?.bindings?.length > 0) {
        return response.data.results.bindings[0].abstract.value
      }
      return null
    } catch (error) {
      console.error(`DBpedia fetch failed for ${subject}:`, error)
      return null
    }
  }

  static async fetchOpenLibraryBooks(subject: string): Promise<string[] | null> {
    try {
      const response = await axios.get(`${this.OPENLIBRARY_API}/search.json`, {
        params: {
          title: subject,
          limit: 3,
        },
        timeout: 5000,
      })

      if (response.data.docs && response.data.docs.length > 0) {
        return response.data.docs.map((doc: any) => `${doc.title} by ${doc.author_name?.[0] || 'Unknown'}`)
      }
      return null
    } catch (error) {
      console.error(`OpenLibrary fetch failed for ${subject}:`, error)
      return null
    }
  }

  static generateBenefits(title: string): string[] {
    const benefitMap: Record<string, string[]> = {
      'Data Structures & Algorithms': [
        'Master technical interview preparation for top tech companies',
        'Develop strong problem-solving and analytical skills',
        'Learn to write optimized, efficient code',
        'Understand computational complexity and performance optimization',
        'Build foundation for advanced system design',
      ],
      'Object-Oriented Programming': [
        'Design scalable and maintainable software architectures',
        'Collaborate effectively on large codebases',
        'Implement industry-standard design patterns',
        'Build professional-grade applications',
        'Transition from procedural to object-oriented thinking',
      ],
      'Database Management Systems': [
        'Design efficient and secure data storage systems',
        'Master SQL for data manipulation and analysis',
        'Optimize database performance and scalability',
        'Implement data integrity and security measures',
        'Work with modern NoSQL and big data technologies',
      ],
      'Full-Stack Web Development': [
        'Build complete web applications from frontend to backend',
        'Deploy production-ready applications',
        'Master modern frameworks and tools used in industry',
        'Develop responsive, user-friendly interfaces',
        'Launch startups and freelance projects',
      ],
      'System Design & Architecture': [
        'Design systems serving millions of users',
        'Understand distributed computing and scalability',
        'Make critical architectural decisions',
        'Ace system design interviews at major tech companies',
        'Lead technical projects and mentor teams',
      ],
    }

    return benefitMap[title] || [
      'Gain practical skills applicable to real-world projects',
      'Enhance career prospects and earning potential',
      'Build foundational knowledge for specialization',
      'Develop problem-solving and critical thinking abilities',
    ]
  }

  static generateImportance(title: string): string {
    const importanceMap: Record<string, string> = {
      'Data Structures & Algorithms':
        'Essential foundation for all software engineering roles. Every technical interview at FAANG companies requires strong DSA knowledge. Critical for writing efficient code that performs well under load. Directly impacts application performance, scalability, and user experience.',
      'Object-Oriented Programming':
        'Fundamental paradigm used in 90% of production software systems. Essential for collaboration on enterprise projects. Enables writing clean, maintainable code that can be extended and modified easily. Core requirement for senior engineering positions.',
      'Database Management Systems':
        'Every application requires data storage and retrieval. Critical for data integrity, security, and performance. Database design decisions impact application scalability and user experience. High demand in industry for database optimization specialists.',
      'Full-Stack Web Development':
        'Web is the primary platform for modern applications. Essential skill for building complete solutions independently. High market demand with competitive salaries. Enables rapid prototyping and building products that directly reach users.',
      'System Design & Architecture':
        'Required for senior engineer, architect, and leadership roles. Directly impacts millions of users and company revenue. Poor system design leads to scalability issues, downtime, and lost revenue. Critical differentiator in technical interviews.',
    }

    return (
      importanceMap[title] ||
      'This skill is important for career advancement and building professional-grade applications.'
    )
  }

  static generateRealWorldApplications(title: string): string[] {
    const applicationsMap: Record<string, string[]> = {
      'Data Structures & Algorithms': [
        'Google Search: Algorithms for indexing and ranking billions of web pages',
        'Facebook Timeline: Optimized algorithms for feed generation and ranking',
        'Uber Navigation: Complex graph algorithms for route optimization',
        'Netflix Recommendations: Algorithms for personalized content suggestion',
        'Trading Platforms: High-frequency trading algorithms requiring optimal performance',
      ],
      'Object-Oriented Programming': [
        'Enterprise Banking Systems: Secure, scalable financial applications',
        'E-commerce Platforms: Complex product, order, and payment management',
        'Game Development: Character systems, entity management, game mechanics',
        'Mobile Applications: Well-architected apps with clean code',
        'Healthcare Systems: HIPAA-compliant systems managing patient data',
      ],
      'Database Management Systems': [
        'Instagram: Managing billions of photos and relationships',
        'Amazon DynamoDB: NoSQL database supporting millions of transactions',
        'LinkedIn: Storing and querying professional profiles and connections',
        'Analytics Platforms: Processing petabytes of data for insights',
        'Real-time Gaming: Database optimization for millisecond response times',
      ],
      'Full-Stack Web Development': [
        'Airbnb: Full-stack platform connecting hosts and guests globally',
        'Stripe: Secure payment processing system with web interface',
        'Slack: Real-time messaging and collaboration platform',
        'Spotify: Streaming service with complex frontend and backend',
        'Twitter: High-traffic social media platform handling billions of tweets',
      ],
      'System Design & Architecture': [
        'WhatsApp: System designed to handle 100 billion messages daily',
        'YouTube: Serving billions of videos to billions of users',
        'Amazon: E-commerce system managing trillions in transactions',
        'Discord: Real-time communication system for millions of concurrent users',
        'Netflix: Distributed streaming system with adaptive quality based on network',
      ],
    }

    return (
      applicationsMap[title] || [
        'Practical implementation in modern applications',
        'Solving real-world problems in production systems',
      ]
    )
  }

  static generateIndustryDemand(title: string): string {
    const demandMap: Record<string, string> = {
      'Data Structures & Algorithms':
        'Extremely High - 95% of tech companies require DSA knowledge for technical interviews. Average salary premium: $20,000-$40,000 for strong DSA skills.',
      'Object-Oriented Programming':
        'Critical - Required for most software development positions. Used across industries from startups to Fortune 500 companies. Competitive advantage in job market.',
      'Database Management Systems':
        'High Demand - Database engineers earn 15-20% more than average developers. Skills in optimization are highly sought after.',
      'Full-Stack Web Development':
        'Very High - Web development is among the most in-demand skills. Independent deployment capabilities make you valuable to startups.',
      'System Design & Architecture':
        'Extreme Demand - Senior engineers designing systems command premium salaries ($200k-$500k+). Shortage of experienced architects globally.',
    }

    return (
      demandMap[title] || 'In high demand across technology industry with competitive compensation.'
    )
  }

  static generateLearningTips(title: string): string[] {
    const tipsMap: Record<string, string[]> = {
      'Data Structures & Algorithms': [
        'Code along with video tutorials to build muscle memory',
        'Practice on platforms like LeetCode and CodeSignal daily',
        'Focus on understanding complexity analysis, not just implementation',
        'Solve problems in multiple ways to understand different approaches',
        'Join competitive programming communities for peer learning',
      ],
      'Object-Oriented Programming': [
        'Study real-world code from popular open-source projects',
        'Practice refactoring procedural code into OOP patterns',
        'Read "Clean Code" and "Design Patterns" alongside courses',
        'Build small projects using different OOP principles',
        'Review code from senior developers and understand their patterns',
      ],
      'Database Management Systems': [
        'Set up local database instances and practice SQL daily',
        'Learn database design by normalizing real-world data',
        'Analyze query execution plans to understand optimization',
        'Experiment with both SQL and NoSQL databases',
        'Study real database architectures of popular platforms',
      ],
      'Full-Stack Web Development': [
        'Build real projects, not just tutorials',
        'Deploy applications to production to learn DevOps',
        'Contribute to open-source web projects',
        'Learn browser DevTools and debugging techniques',
        'Stay updated with rapidly evolving web technologies',
      ],
      'System Design & Architecture': [
        'Study architecture blogs from tech companies (Twitter, Netflix, LinkedIn)',
        'Practice designing systems for famous apps (Instagram, Uber, etc.)',
        'Understand trade-offs between different architectural choices',
        'Read academic papers on distributed systems',
        'Mock interview with senior engineers for feedback',
      ],
    }

    return (
      tipsMap[title] || [
        'Practice consistently and build real projects',
        'Learn from others and review their code',
        'Stay updated with industry best practices',
      ]
    )
  }

  static async enrichCourseData(title: string): Promise<EnrichedCourseData> {
    const enrichedData: EnrichedCourseData = {
      overview:
        (await this.fetchFromWikidata(title)) ||
        (await this.fetchFromDBpedia(title)) ||
        `Comprehensive course on ${title} covering fundamental and advanced concepts.`,
      benefits: this.generateBenefits(title),
      importance: this.generateImportance(title),
      keyTopics: [],
      realWorldApplications: this.generateRealWorldApplications(title),
      industryDemand: this.generateIndustryDemand(title),
      learningTips: this.generateLearningTips(title),
    }

    return enrichedData
  }
}
