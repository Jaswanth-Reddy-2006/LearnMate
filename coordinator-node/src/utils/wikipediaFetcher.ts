import axios from 'axios'

export interface WikipediaPage {
  title: string
  extract: string
  sections: Array<{
    title: string
    content: string
  }>
}

export class WikipediaFetcher {
  private static readonly BASE_URL = 'https://en.wikipedia.org/api/rest_v1/page/summary'
  private static readonly FULL_PAGE_URL = 'https://en.wikipedia.org/api/rest_v1/page/mobile-sections'

  private static cleanText(text: string): string {
    return text
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\[\d+\]/g, '') // Remove reference numbers
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()
  }

  private static async fetchPageSummary(title: string): Promise<WikipediaPage | null> {
    try {
      const encodedTitle = encodeURIComponent(title)
      const response = await axios.get(`${this.BASE_URL}/${encodedTitle}`, {
        timeout: 10000,
        headers: {
          'User-Agent': 'LearnMate-Quiz-Generator/1.0'
        }
      })

      if (response.status !== 200) return null

      const data = response.data
      return {
        title: data.title || title,
        extract: this.cleanText(data.extract || ''),
        sections: []
      }
    } catch (error) {
      console.error(`Failed to fetch Wikipedia summary for "${title}":`, error)
      return null
    }
  }

  private static async fetchFullPage(title: string): Promise<WikipediaPage | null> {
    try {
      const encodedTitle = encodeURIComponent(title)
      const response = await axios.get(`${this.FULL_PAGE_URL}/${encodedTitle}`, {
        timeout: 15000,
        headers: {
          'User-Agent': 'LearnMate-Quiz-Generator/1.0'
        }
      })

      if (response.status !== 200) return null

      const data = response.data
      const sections = data.remaining.sections.map((section: any) => ({
        title: section.line || section.anchor,
        content: this.cleanText(section.text || '')
      })).filter((section: any) => section.content.length > 50) // Filter out very short sections

      return {
        title: (data.displaytitle || data.normalizedtitle || title) as string,
        extract: this.cleanText(data.lead?.text || ''),
        sections: sections || []
      }
    } catch (error) {
      console.error(`Failed to fetch full Wikipedia page for "${title}":`, error)
      return null
    }
  }

  static async fetchSubjectData(subjectTitle: string): Promise<WikipediaPage | null> {
    // Try different title variations to find the best Wikipedia page
    const titleVariations = [
      subjectTitle,
      subjectTitle.replace(/ & /g, ' and '),
      subjectTitle.replace(/ Fundamentals| Basics| Introduction/g, '').trim(),
      subjectTitle.split(' & ')[0], // Take first part if it's "A & B"
      subjectTitle.split(' and ')[0], // Take first part if it's "A and B"
    ].filter(t => t && t.trim().length > 0) // Filter out empty strings

    for (const title of titleVariations) {
      if (!title) continue

      // First try to get full page content
      let pageData = await this.fetchFullPage(title)
      if (pageData && pageData.sections.length > 0) {
        return pageData
      }

      // Fallback to summary if full page fails or has no sections
      pageData = await this.fetchPageSummary(title)
      if (pageData) {
        return pageData
      }
    }

    console.warn(`Could not find Wikipedia data for subject: ${subjectTitle}`)
    return null
  }

  static getSubjectWikipediaTitle(subjectTitle: string): string {
    // Map subject titles to appropriate Wikipedia page titles
    const titleMappings: Record<string, string> = {
      'Data Structures & Algorithms': 'Data_structure',
      'Object-Oriented Programming': 'Object-oriented_programming',
      'Database Management Systems': 'Database',
      'Full-Stack Web Development': 'Web_development',
      'System Design & Architecture': 'Software_architecture',
      'Design Patterns & SOLID Principles': 'Software_design_pattern',
      'Operating Systems Fundamentals': 'Operating_system',
      'Computer Networks & Protocols': 'Computer_network',
      'Digital Logic & Circuit Design': 'Digital_electronics',
      'Signals & Systems': 'Signal_processing',
      'Communication Systems': 'Telecommunications',
      'Microcontroller Programming & Embedded Systems': 'Embedded_system',
      'Power Systems & Electrical Machines': 'Electric_power_system',
      'Antennas & Propagation': 'Antenna_(radio)',
      'Computer-Aided Design (CAD) & 3D Modeling': 'Computer-aided_design',
      'Finite Element Analysis (FEA)': 'Finite_element_method',
      'Manufacturing Processes & Processes Engineering': 'Manufacturing',
      'Mechanics of Materials': 'Strength_of_materials',
      'Thermodynamics & Heat Transfer': 'Thermodynamics',
      'Fluid Mechanics': 'Fluid_mechanics',
      'Machine Learning Fundamentals': 'Machine_learning',
      'Deep Learning & Neural Networks': 'Deep_learning',
      'Statistics & Probability': 'Statistics',
      'Data Engineering & Big Data': 'Data_engineering',
      'Natural Language Processing': 'Natural_language_processing',
      'Computer Vision': 'Computer_vision',
      'Cybersecurity Fundamentals': 'Computer_security',
      'Network Security': 'Network_security',
      'Application Security': 'Application_security',
      'CI/CD & DevOps Pipeline': 'DevOps',
      'Containerization & Docker': 'Docker_(software)',
      'Cloud Computing with AWS': 'Cloud_computing',
      'Infrastructure as Code (IaC)': 'Infrastructure_as_code',
      'Technical Communication & Presentation': 'Technical_writing',
      'Technical Leadership & Team Management': 'Technical_lead',
      'Agile & Scrum Methodologies': 'Agile_software_development',
      'IoT Systems & Edge Computing': 'Internet_of_things',
      'Blockchain & Distributed Ledger Technology': 'Blockchain',
      'Quantum Computing Fundamentals': 'Quantum_computing',
      'Augmented Reality & Virtual Reality': 'Virtual_reality',
      'Linear Algebra for Engineers': 'Linear_algebra',
      'Calculus & Differential Equations': 'Calculus',
      'Version Control & Git': 'Git',
      'Software Testing & Quality Assurance': 'Software_testing'
    }

    return titleMappings[subjectTitle] || subjectTitle.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '')
  }
}