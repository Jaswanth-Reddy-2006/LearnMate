import type { CatalogItem } from '../types'

import { WikipediaFetcher } from '../utils/wikipediaFetcher'
import { DataEnricher } from '../utils/dataEnricher'

const cover = (text: string) => `https://placehold.co/600x400/0f172a/38bdf8?text=${encodeURIComponent(text)}`



const rawCatalog: CatalogItem[] = [
  // ============ COMPUTER SCIENCE & ENGINEERING ============
  {
    id: 'cse-dsa',
    title: 'Data Structures & Algorithms',
    description: 'Comprehensive study of fundamental and advanced data structures including arrays, linked lists, trees, and graphs. Master algorithm analysis, Big O notation, and learn to solve complex computational problems using dynamic programming, greedy algorithms, and optimization techniques essential for technical interviews and software engineering roles.',
    tags: ['cse', 'algorithms', 'core', 'interview-prep'],
    difficulty: 'intermediate',
    duration: 180,
    daysRequired: 7,
    coverImage: cover('Data Structures & Algorithms'),
    lastUpdated: new Date().toISOString(),
    objectives: [
      'Master fundamental data structures: arrays, linked lists, stacks, queues, binary trees, graphs, and hash tables',
      'Analyze algorithmic time and space complexity using Big O notation for optimal problem-solving',
      'Implement and compare sorting algorithms: bubble sort, merge sort, quicksort, heap sort, and their trade-offs',
      'Solve dynamic programming problems using memoization and tabulation approaches',
      'Apply greedy algorithms and backtracking techniques for optimization problems',
      'Design and optimize algorithms for competitive programming and technical interviews'
    ],
    prerequisites: [
      'Basic programming knowledge in any language',
      'Understanding of variables, loops, and functions',
      'Basic mathematics (algebra, discrete math concepts)'
    ],
    careerApplications: [
      'Software engineering roles at FAANG companies',
      'Algorithm optimization in high-performance systems',
      'Competitive programming and coding interviews',
      'System design and architecture decisions',
      'Research positions in computer science'
    ],
    benefits: [
      'Master the foundation of efficient software development and problem-solving',
      'Crack technical interviews at top tech companies (Google, Microsoft, Amazon, Facebook)',
      'Develop skills to optimize performance-critical applications',
      'Build competitive programming portfolio and win contests',
      'Prepare for system design and architecture roles'
    ],
    importance: 'Data Structures and Algorithms form the backbone of computer science. Understanding these concepts is crucial for writing efficient, scalable software. Companies like Google, Amazon, and Microsoft prioritize candidates with strong DSA fundamentals. Mastering this subject directly impacts career trajectory in software engineering.',
    industryRelevance: {
      relevanceScore: 98,
      topIndustries: ['Tech Giants (FAANG)', 'Financial Services', 'E-commerce', 'Cloud Computing', 'Gaming'],
      salaryImpact: '+35-50% salary premium for professionals with strong DSA expertise'
    },
    realWorldApplications: [
      'Google Search: Uses algorithms to rank and retrieve billions of web pages in milliseconds',
      'Netflix Recommendations: Graph algorithms process user behavior and content relationships',
      'Uber Route Optimization: Shortest path algorithms determine efficient delivery routes',
      'Database Query Optimization: B-trees and indexing structure organize data efficiently',
      'Social Media Feeds: Complex tree and graph algorithms filter and rank content',
      'Cryptocurrency Mining: Hash tables and tree structures verify transactions'
    ],
    keyTopics: [
      'Big O Notation and Complexity Analysis',
      'Arrays and Dynamic Arrays',
      'Linked Lists (Singly, Doubly, Circular)',
      'Stacks, Queues, and Deques',
      'Trees (Binary, BST, AVL, Red-Black)',
      'Graphs and Graph Traversals',
      'Sorting Algorithms Performance',
      'Dynamic Programming Patterns',
      'Hash Tables and Hashing'
    ],
    learningOutcomes: [
      'Analyze any algorithm and determine its time/space complexity',
      'Choose appropriate data structure for specific problems',
      'Implement algorithms from scratch without guidance',
      'Solve LeetCode hard problems independently',
      'Design efficient solutions in technical interviews'
    ],
    resources: [
      'CLRS Introduction to Algorithms',
      'LeetCode platform for practice',
      'GeeksforGeeks algorithm tutorials',
      'MIT OCW Algorithms course',
      'Coursera Algorithms specialization'
    ],
    syllabus: [
      'Introduction to Big O Notation and Complexity Analysis',
      'Arrays, Strings, and Basic Operations',
      'Linked Lists: Singly, Doubly, and Circular',
      'Stacks and Queues: Applications and Implementation',
      'Binary Trees and Binary Search Trees',
      'Advanced Tree Structures: AVL, Red-Black Trees',
      'Graphs: Representations and Traversals (BFS, DFS)',
      'Shortest Path Algorithms: Dijkstra and Bellman-Ford',
      'Sorting Algorithms: Comparison and Non-Comparison Based',
      'Searching and Selection Algorithms',
      'Dynamic Programming: Problems and Patterns',
      'Greedy Algorithms and Optimization',
      'Backtracking and Recursion',
      'Hash Tables and Hashing Techniques',
      'Heaps and Priority Queues',
      'Competitive Programming Strategies'
    ],
  },
  {
    id: 'cse-oop',
    title: 'Object-Oriented Programming',
    description: 'Master the principles of object-oriented programming paradigm. Learn encapsulation, inheritance, polymorphism, and abstraction to build maintainable, scalable software. Study design patterns, UML modeling, and SOLID principles for professional software architecture and development.',
    tags: ['cse', 'programming', 'core', 'design'],
    difficulty: 'beginner',
    duration: 150,
    daysRequired: 5,
    coverImage: cover('Object-Oriented Programming'),
    lastUpdated: new Date().toISOString(),
    objectives: [
      'Understand and apply the four pillars of OOP: encapsulation, inheritance, polymorphism, and abstraction',
      'Design robust class hierarchies using composition and inheritance relationships',
      'Implement creational, structural, and behavioral design patterns',
      'Apply SOLID principles for scalable and maintainable code',
      'Create UML diagrams and design documentation for software systems',
      'Refactor procedural code into well-structured object-oriented architectures'
    ],
    prerequisites: [
      'Basic programming knowledge',
      'Understanding of variables, functions, and control structures'
    ],
    careerApplications: [
      'Software development roles',
      'System architecture and design',
      'Code maintenance and refactoring',
      'Team collaboration on large codebases',
      'Technical leadership positions'
    ],
    resources: [
      'Head First Object-Oriented Analysis and Design',
      'Design Patterns: Elements of Reusable Object-Oriented Software',
      'Clean Code by Robert C. Martin',
      'OOP tutorials on freeCodeCamp',
      'Java/C# documentation for OOP features'
    ],
    syllabus: [
      'Paradigm Shift: From Procedural to Object-Oriented Programming',
      'Classes, Objects, and Instances',
      'Encapsulation and Access Modifiers (public, private, protected)',
      'Constructors, Destructors, and Lifecycle Methods',
      'Inheritance: Single, Multiple, and Multilevel',
      'Polymorphism: Method Overloading and Overriding',
      'Abstract Classes and Interfaces',
      'Composition vs Inheritance',
      'Design Patterns: Singleton, Factory, Observer, Strategy',
      'SOLID Principles and Architecture',
      'Exception Handling and Error Management',
      'Reflection and Metaprogramming',
      'UML Diagrams and Design Documentation'
    ],
    benefits: [
      'Write cleaner, more maintainable, and scalable code',
      'Master professional software development practices',
      'Implement industry-standard design patterns',
      'Excel in coding interviews focused on design',
      'Lead architectural decisions in projects'
    ],
    importance: 'Object-Oriented Programming is the dominant paradigm in enterprise software development. Companies building large-scale systems rely on OOP principles to manage complexity and ensure code maintainability. Understanding OOP is essential for any serious software engineer and opens doors to senior and leadership roles.',
    industryRelevance: {
      relevanceScore: 96,
      topIndustries: ['Enterprise Software', 'Web Development', 'Fintech', 'Healthcare IT', 'Enterprise Solutions'],
      salaryImpact: '+25-40% salary increase with OOP expertise'
    },
    realWorldApplications: [
      'Enterprise Java Applications: Banks use OOP for mission-critical systems handling billions in transactions',
      'C# Enterprise Applications: Microsoft technologies power global organizations',
      'Python Web Frameworks: Django and Flask use OOP for web application development',
      'Game Development: Unreal Engine and Unity use inheritance and polymorphism for game objects',
      'Mobile Apps: iOS and Android frameworks are built on OOP principles',
      'Cloud Services: AWS, Azure, and Google Cloud APIs are designed using OOP patterns'
    ],
    keyTopics: [
      'Fundamental OOP Concepts and Principles',
      'Class Design and Object Modeling',
      'Advanced Inheritance Patterns',
      'Polymorphism and Method Dispatch',
      'Encapsulation and Data Hiding',
      'Abstract Types and Interfaces',
      'Design Patterns Implementation',
      'SOLID Principles in Practice',
      'Exception Handling Strategies'
    ],
    learningOutcomes: [
      'Design robust class hierarchies without code duplication',
      'Implement design patterns to solve common design problems',
      'Create maintainable and extensible code architectures',
      'Apply SOLID principles to write professional-grade code',
      'Mentor junior developers in OOP best practices'
    ],
  },
  {
    id: 'cse-databases',
    title: 'Database Management Systems',
    description: 'Comprehensive study of relational and non-relational database systems. Learn database design, normalization, SQL optimization, transaction management, and scalability techniques for enterprise applications. Covers both traditional RDBMS and modern NoSQL solutions.',
    tags: ['cse', 'databases', 'backend', 'sql'],
    difficulty: 'intermediate',
    duration: 200,
    daysRequired: 8,
    coverImage: cover('Database Management'),
    lastUpdated: new Date().toISOString(),
    objectives: [
      'Master relational database design using normalization and entity-relationship modeling',
      'Write complex SQL queries including joins, subqueries, window functions, and CTEs',
      'Design efficient database schemas with appropriate indexing strategies',
      'Implement ACID properties and transaction management',
      'Optimize query performance through execution plans and analysis',
      'Understand and implement NoSQL databases for specific use cases',
      'Manage database security, backup, recovery, and replication'
    ],
    prerequisites: [
      'Basic programming knowledge',
      'Understanding of data structures',
      'Basic SQL knowledge (helpful but not required)'
    ],
    careerApplications: [
      'Database administrator roles',
      'Backend developer positions',
      'Data engineering and analytics',
      'System architecture and design',
      'Database consulting and optimization'
    ],
    resources: [
      'Database System Concepts by Silberschatz',
      'SQLZoo for query practice',
      'PostgreSQL documentation',
      'MongoDB documentation for NoSQL',
      'Coursera Database courses'
    ],
    syllabus: [
      'Relational Model and Fundamentals of Databases',
      'SQL: DDL, DML, and DCL Operations',
      'Entity-Relationship (ER) Modeling and Database Design',
      'Normalization: 1NF to BCNF',
      'Advanced SQL: Joins, Subqueries, and Window Functions',
      'Indexing Strategies and Query Optimization',
      'Transactions, ACID Properties, and Concurrency Control',
      'Database Security and Access Control',
      'NoSQL Databases: MongoDB, Cassandra, Redis',
      'Distributed Databases and Replication',
      'Big Data Technologies and Data Warehousing',
      'Backup, Recovery, and High Availability',
      'Performance Tuning and Monitoring'
    ],
    benefits: [
      'Master data management for mission-critical applications',
      'Command premium salaries with database expertise',
      'Become essential to any tech organization',
      'Design systems handling millions of transactions',
      'Optimize performance for real-time applications'
    ],
    importance: 'Data is the lifeblood of modern organizations. Database professionals are highly sought after and command top salaries. Understanding database design, optimization, and management is crucial for backend engineers, data engineers, and system architects. Poor database design causes costly performance issues and system failures.',
    industryRelevance: {
      relevanceScore: 97,
      topIndustries: ['Fintech', 'E-commerce', 'Data Analytics', 'Social Media', 'Cloud Infrastructure'],
      salaryImpact: '+40-60% salary premium for database expertise'
    },
    realWorldApplications: [
      'Facebook: Manages petabytes of data using distributed databases and custom storage solutions',
      'Amazon DynamoDB: Powers millions of concurrent requests for AWS customers globally',
      'Netflix: Uses NoSQL databases for personalization serving 250+ million users',
      'Banking Systems: PostgreSQL and Oracle handle critical financial transactions with ACID guarantees',
      'E-commerce Platforms: Index optimization enables fast product searches across millions of items',
      'Social Media: Graph databases efficiently store and query complex relationship data'
    ],
    keyTopics: [
      'Database Design and Normalization Theory',
      'SQL Query Writing and Optimization',
      'Index Design and Query Planning',
      'Transaction Management and Concurrency',
      'NoSQL Database Architectures',
      'Data Replication and Consistency',
      'Database Security and Encryption',
      'Scalability and Partitioning Strategies',
      'Monitoring and Performance Analysis'
    ],
    learningOutcomes: [
      'Design efficient database schemas from scratch',
      'Write complex queries that execute optimally',
      'Troubleshoot slow queries using execution plans',
      'Implement proper indexing strategies',
      'Choose between SQL and NoSQL for different scenarios'
    ],
  },
  {
    id: 'cse-webdev',
    title: 'Full-Stack Web Development',
    description: 'Master modern web development from frontend to backend. Learn responsive design with HTML/CSS, dynamic interfaces with React, and robust APIs with Node.js/Express. Build production-ready applications with authentication, databases, and deployment strategies.',
    tags: ['cse', 'web', 'frontend', 'backend', 'react'],
    difficulty: 'intermediate',
    duration: 240,
    daysRequired: 10,
    coverImage: cover('Full-Stack Web Development'),
    lastUpdated: new Date().toISOString(),
    objectives: [
      'Master semantic HTML5 and modern CSS for responsive web design',
      'Build interactive user interfaces with JavaScript and React framework',
      'Develop RESTful and GraphQL APIs using Node.js and Express',
      'Implement user authentication and authorization mechanisms',
      'Design database schemas and implement data persistence',
      'Deploy applications to cloud platforms and manage DevOps workflows',
      'Apply security best practices and performance optimization techniques'
    ],
    prerequisites: [
      'Basic programming knowledge and JavaScript fundamentals',
      'Understanding of client-server architecture',
      'Familiarity with Git and command line tools'
    ],
    careerApplications: [
      'Full-stack developer positions at tech companies',
      'Frontend or backend specialist roles',
      'Startup and early-stage company development',
      'E-commerce and SaaS platform development',
      'Web application architect roles'
    ],
    resources: [
      'MDN Web Docs (HTML/CSS/JavaScript)',
      'React official documentation and tutorials',
      'Node.js and Express.js guides',
      'freeCodeCamp full-stack curriculum',
      'The Odin Project comprehensive guide'
    ],
    syllabus: [
      'Web Standards: HTML5, CSS3, and Semantic Markup',
      'Responsive Design and Mobile-First Approach',
      'JavaScript: ES6+, Async Programming, and DOM Manipulation',
      'Frontend Frameworks: React Components and Hooks',
      'State Management: Context API and Redux',
      'Backend Fundamentals: Node.js and Express.js',
      'RESTful API Design and Implementation',
      'Database Design and SQL/NoSQL Integration',
      'User Authentication and Authorization',
      'Security: HTTPS, CORS, and Input Validation',
      'Testing: Unit, Integration, and End-to-End Tests',
      'Deployment: Cloud Platforms and CI/CD Pipelines',
      'Performance Optimization and Monitoring'
    ],
    benefits: [
      'Build complete web applications from idea to deployment',
      'Become highly employable with end-to-end skills',
      'Start your own web-based business or SaaS',
      'Work on diverse projects using modern technologies',
      'Command competitive salaries in startup and enterprise environments'
    ],
    importance: 'Full-Stack Web Development is one of the most in-demand skill sets in tech. Web applications power modern business, and companies need developers who understand both frontend and backend. Full-stack developers are valued for their ability to see the complete picture and deliver end-to-end solutions.',
    industryRelevance: {
      relevanceScore: 99,
      topIndustries: ['Startups', 'SaaS', 'E-commerce', 'Social Platforms', 'Tech Companies'],
      salaryImpact: '+30-55% salary premium for full-stack expertise'
    },
    realWorldApplications: [
      'Netflix Web Interface: React components deliver millions of hours of content',
      'Airbnb Platform: Full-stack JavaScript enables seamless booking experience',
      'Slack: Web application provides productivity to millions of teams',
      'Shopify Stores: Full-stack platforms enable small businesses online',
      'GitHub: Web interface manages billions of lines of code',
      'Real-time Applications: WebSockets enable live chat, notifications, and collaboration'
    ],
    keyTopics: [
      'Modern Web Architecture and Protocols',
      'Responsive Frontend Design',
      'JavaScript Framework Mastery',
      'Backend API Development',
      'Database Integration and Optimization',
      'User Authentication and Security',
      'Performance and Scalability',
      'DevOps and Deployment',
      'Testing and Quality Assurance'
    ],
    learningOutcomes: [
      'Build production-ready web applications independently',
      'Deploy applications to cloud platforms',
      'Implement secure authentication and authorization',
      'Optimize performance for millions of users',
      'Architect scalable systems from scratch'
    ],
  },
  {
    id: 'cse-systemdesign',
    title: 'System Design & Architecture',
    description: 'Master the design of large-scale, distributed systems. Learn scalability patterns, consistency models, load balancing, caching strategies, and database sharding. Design systems for millions of users with focus on reliability, performance, and maintainability.',
    tags: ['cse', 'architecture', 'backend', 'senior'],
    difficulty: 'advanced',
    duration: 220,
    daysRequired: 12,
    coverImage: cover('System Design & Architecture'),
    lastUpdated: new Date().toISOString(),
    objectives: [
      'Design scalable systems using horizontal and vertical scaling techniques',
      'Understand and apply distributed system principles and patterns',
      'Implement load balancing and database sharding strategies',
      'Design caching architectures for performance optimization',
      'Create resilient systems with fault tolerance and high availability',
      'Evaluate trade-offs between consistency, availability, and partition tolerance',
      'Design systems handling millions of concurrent users'
    ],
    prerequisites: [
      'Strong programming background and software design knowledge',
      'Understanding of databases and networking basics',
      'Experience with backend development and APIs'
    ],
    careerApplications: [
      'Senior software engineer roles',
      'Tech lead and architect positions',
      'Infrastructure and platform engineer roles',
      'System design interview preparation',
      'Enterprise system design and optimization'
    ],
    resources: [
      'Designing Data-Intensive Applications book',
      'System Design Interview by Alex Xu',
      'High Scalability blog',
      'Grokking System Design Interviews',
      'DDIA companion materials and papers'
    ],
    syllabus: [
      'Scalability Fundamentals and Growth Estimation',
      'Horizontal and Vertical Scaling Strategies',
      'Load Balancing and Content Delivery Networks',
      'Caching: Client-side, Server-side, and CDN Caching',
      'Database Scaling: Replication and Sharding',
      'Message Queues and Asynchronous Processing',
      'Microservices Architecture and API Gateway',
      'NoSQL Databases: Use Cases and Trade-offs',
      'Distributed Transactions and Consistency Patterns',
      'Monitoring, Logging, and System Observability',
      'Security in Distributed Systems',
      'Real-world System Design Examples (Twitter, Instagram, Netflix, etc.)'
    ],
    benefits: [
      'Ace system design interviews at top tech companies',
      'Command executive-level salaries as a system architect',
      'Design systems that scale to billions of users',
      'Become indispensable as a tech lead and mentor',
      'Lead technical strategy and infrastructure decisions',
      'Build resilient systems that handle real-world challenges',
      'Master skills that define senior engineer roles'
    ],
    importance: 'System design is the differentiator between junior and senior engineers. It determines whether systems scale, remain reliable, and serve billions of users efficiently. Companies need experienced system designers to build infrastructure that supports growth. This skill is tested in every senior-level interview and determines your path to technical leadership.',
    industryRelevance: {
      relevanceScore: 98,
      topIndustries: ['Big Tech (FAANG)', 'Cloud Platforms', 'Financial Services', 'E-commerce', 'Infrastructure'],
      salaryImpact: '+50-100% salary premium for system design expertise'
    },
    realWorldApplications: [
      'Google: Designs systems processing 8.5 billion searches daily across multiple datacenters',
      'Netflix: Handles 250+ million users with intelligent caching and microservices',
      'Twitter: Manages real-time stream processing for 500 million tweets daily',
      'LinkedIn: Scales to billions of connections with distributed databases',
      'Uber: Coordinates millions of drivers and passengers in real-time',
      'AWS/Azure/GCP: Design infrastructure serving millions of customers globally'
    ],
    keyTopics: [
      'Scalability and Performance Optimization',
      'Distributed Systems Design Patterns',
      'Consistency and Availability Trade-offs',
      'Caching Strategies and CDN',
      'Database Scaling and Sharding',
      'Load Balancing and Failover',
      'Message Queues and Event-Driven Architecture',
      'Microservices and API Gateway Patterns',
      'Monitoring and Observability',
      'Security in Distributed Systems'
    ],
    learningOutcomes: [
      'Design systems handling millions of concurrent users',
      'Estimate capacity and growth requirements',
      'Choose between consistency, availability, and partition tolerance',
      'Architect highly available and fault-tolerant systems',
      'Optimize for performance and cost at scale',
      'Implement and evaluate system design trade-offs',
      'Solve real-world system design problems'
    ],
  },
  {
    id: 'cse-designpatterns',
    title: 'Design Patterns & SOLID Principles',
    description: 'Master proven design patterns and SOLID principles for maintainable code.',
    tags: ['cse', 'design', 'oop', 'architecture'],
    difficulty: 'intermediate',
    duration: 140,
    coverImage: cover('Design Patterns'),
    lastUpdated: new Date().toISOString(),
    objectives: ['Master core concepts'],
    prerequisites: ['Basic knowledge'],
    careerApplications: ['Tech roles'],
    resources: ['Documentation'],
    syllabus: ['Fundamentals'],
  },
  {
    id: 'cse-os',
    title: 'Operating Systems Fundamentals',
    description: 'Understand processes, threads, memory management, and system calls.',
    tags: ['cse', 'systems', 'core', 'low-level'],
    difficulty: 'intermediate',
    duration: 170,
    coverImage: cover('Operating Systems'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'cse-networking',
    title: 'Computer Networks & Protocols',
    description: 'Master networking concepts, TCP/IP, DNS, HTTP, and application layer protocols.',
    tags: ['cse', 'networking', 'protocols', 'backend'],
    difficulty: 'intermediate',
    duration: 160,
    coverImage: cover('Computer Networks'),
    lastUpdated: new Date().toISOString(),
  },

  // ============ ELECTRONICS & COMMUNICATION ENGINEERING ============
  {
    id: 'ece-digital-logic',
    title: 'Digital Logic & Circuit Design',
    description: 'Master digital circuits, logic gates, and VLSI design fundamentals.',
    tags: ['ece', 'hardware', 'digital', 'fpga'],
    difficulty: 'intermediate',
    duration: 160,
    coverImage: cover('Digital Logic Design'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'ece-signals',
    title: 'Signals & Systems',
    description: 'Understand signal processing, Fourier analysis, and system responses in time and frequency domains.',
    tags: ['ece', 'signal-processing', 'dsp', 'core'],
    difficulty: 'intermediate',
    duration: 180,
    coverImage: cover('Signals & Systems'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'ece-communications',
    title: 'Communication Systems',
    description: 'Master analog and digital communication theory, modulation techniques, and wireless systems.',
    tags: ['ece', 'communications', '5g', 'wireless'],
    difficulty: 'advanced',
    duration: 200,
    coverImage: cover('Communication Systems'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'ece-microcontroller',
    title: 'Microcontroller Programming & Embedded Systems',
    description: 'Develop embedded systems using microcontrollers, real-time operating systems, and IoT protocols.',
    tags: ['ece', 'embedded', 'iot', 'firmware'],
    difficulty: 'intermediate',
    duration: 170,
    coverImage: cover('Microcontroller Programming'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'ece-power-systems',
    title: 'Power Systems & Electrical Machines',
    description: 'Understand power generation, transmission, distribution, and electrical machine operation.',
    tags: ['ece', 'power', 'energy', 'machines'],
    difficulty: 'intermediate',
    duration: 180,
    coverImage: cover('Power Systems'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'ece-antennas',
    title: 'Antennas & Propagation',
    description: 'Learn antenna design, radiation patterns, and electromagnetic wave propagation.',
    tags: ['ece', 'wireless', 'rf', 'antennas'],
    difficulty: 'intermediate',
    duration: 150,
    coverImage: cover('Antennas & Propagation'),
    lastUpdated: new Date().toISOString(),
  },

  // ============ MECHANICAL ENGINEERING ============
  {
    id: 'mech-cad',
    title: 'Computer-Aided Design (CAD) & 3D Modeling',
    description: 'Master CAD tools for product design, simulation, and manufacturing.',
    tags: ['mech', 'design', 'cad', 'manufacturing'],
    difficulty: 'beginner',
    duration: 140,
    coverImage: cover('CAD & 3D Modeling'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'mech-fea',
    title: 'Finite Element Analysis (FEA)',
    description: 'Perform structural analysis, thermal simulation, and fatigue studies using FEA software.',
    tags: ['mech', 'simulation', 'analysis', 'cae'],
    difficulty: 'intermediate',
    duration: 180,
    coverImage: cover('Finite Element Analysis'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'mech-manufacturing',
    title: 'Manufacturing Processes & Processes Engineering',
    description: 'Understand and optimize manufacturing processes from design to production.',
    tags: ['mech', 'manufacturing', 'production', 'optimization'],
    difficulty: 'intermediate',
    duration: 160,
    coverImage: cover('Manufacturing Processes'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'mech-mechanics',
    title: 'Mechanics of Materials',
    description: 'Analyze stress, strain, and deformation in materials and structural components.',
    tags: ['mech', 'mechanics', 'materials', 'core'],
    difficulty: 'intermediate',
    duration: 170,
    coverImage: cover('Mechanics of Materials'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'mech-thermodynamics',
    title: 'Thermodynamics & Heat Transfer',
    description: 'Master energy concepts, heat transfer modes, and thermodynamic cycles.',
    tags: ['mech', 'thermodynamics', 'energy', 'heat'],
    difficulty: 'intermediate',
    duration: 175,
    coverImage: cover('Thermodynamics & Heat Transfer'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'mech-fluids',
    title: 'Fluid Mechanics',
    description: 'Understand fluid flow, pressure, Bernoulli equation, and fluid machinery.',
    tags: ['mech', 'fluids', 'hydraulics', 'aerodynamics'],
    difficulty: 'intermediate',
    duration: 165,
    coverImage: cover('Fluid Mechanics'),
    lastUpdated: new Date().toISOString(),
  },

  // ============ DATA SCIENCE & AI ============
  {
    id: 'ds-ml-fundamentals',
    title: 'Machine Learning Fundamentals',
    description: 'Master supervised and unsupervised learning algorithms, model evaluation, and practical ML projects.',
    tags: ['ds', 'machine-learning', 'ai', 'python'],
    difficulty: 'intermediate',
    duration: 220,
    coverImage: cover('Machine Learning Fundamentals'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'ds-deep-learning',
    title: 'Deep Learning & Neural Networks',
    description: 'Build advanced neural networks for computer vision, NLP, and generative AI applications.',
    tags: ['ds', 'deep-learning', 'ai', 'neural-networks'],
    difficulty: 'advanced',
    duration: 240,
    coverImage: cover('Deep Learning & Neural Networks'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'ds-statistics',
    title: 'Statistics & Probability',
    description: 'Master statistical methods, hypothesis testing, and probabilistic reasoning.',
    tags: ['ds', 'statistics', 'probability', 'data'],
    difficulty: 'intermediate',
    duration: 180,
    coverImage: cover('Statistics & Probability'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'ds-data-engineering',
    title: 'Data Engineering & Big Data',
    description: 'Design scalable data pipelines, ETL systems, and handle big data technologies.',
    tags: ['ds', 'data-engineering', 'big-data', 'spark'],
    difficulty: 'advanced',
    duration: 200,
    coverImage: cover('Data Engineering & Big Data'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'ds-nlp',
    title: 'Natural Language Processing',
    description: 'Process and understand text data, language models, and sentiment analysis.',
    tags: ['ds', 'nlp', 'ai', 'language'],
    difficulty: 'advanced',
    duration: 210,
    coverImage: cover('Natural Language Processing'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'ds-cv',
    title: 'Computer Vision',
    description: 'Master image processing, object detection, and visual recognition systems.',
    tags: ['ds', 'computer-vision', 'ai', 'images'],
    difficulty: 'advanced',
    duration: 200,
    coverImage: cover('Computer Vision'),
    lastUpdated: new Date().toISOString(),
  },

  // ============ CYBERSECURITY ============
  {
    id: 'security-fundamentals',
    title: 'Cybersecurity Fundamentals',
    description: 'Understand encryption, authentication, common vulnerabilities, and defensive strategies.',
    tags: ['security', 'cryptography', 'defense', 'core'],
    difficulty: 'intermediate',
    duration: 160,
    coverImage: cover('Cybersecurity Fundamentals'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'security-network',
    title: 'Network Security',
    description: 'Secure networks with firewalls, VPNs, intrusion detection, and access control.',
    tags: ['security', 'network', 'defense', 'infrastructure'],
    difficulty: 'advanced',
    duration: 170,
    coverImage: cover('Network Security'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'security-application',
    title: 'Application Security',
    description: 'Prevent OWASP vulnerabilities, secure coding, and web application protection.',
    tags: ['security', 'owasp', 'web', 'coding'],
    difficulty: 'intermediate',
    duration: 150,
    coverImage: cover('Application Security'),
    lastUpdated: new Date().toISOString(),
  },

  // ============ DEVOPS & CLOUD ============
  {
    id: 'devops-cicd',
    title: 'CI/CD & DevOps Pipeline',
    description: 'Automate build, test, and deployment processes with modern tools and practices.',
    tags: ['devops', 'ci-cd', 'automation', 'cloud'],
    difficulty: 'intermediate',
    duration: 140,
    coverImage: cover('CI/CD & DevOps'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'devops-containerization',
    title: 'Containerization & Docker',
    description: 'Package applications with Docker, manage container orchestration, and optimize deployments.',
    tags: ['devops', 'docker', 'containers', 'kubernetes'],
    difficulty: 'intermediate',
    duration: 130,
    coverImage: cover('Docker & Containerization'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'cloud-aws',
    title: 'Cloud Computing with AWS',
    description: 'Master AWS services, cloud architecture, and scalable infrastructure design.',
    tags: ['cloud', 'aws', 'infrastructure', 'devops'],
    difficulty: 'intermediate',
    duration: 180,
    coverImage: cover('AWS Cloud Computing'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'cloud-infrastructure',
    title: 'Infrastructure as Code (IaC)',
    description: 'Automate infrastructure provisioning using Terraform, Ansible, and CloudFormation.',
    tags: ['devops', 'iac', 'terraform', 'automation'],
    difficulty: 'intermediate',
    duration: 140,
    coverImage: cover('Infrastructure as Code'),
    lastUpdated: new Date().toISOString(),
  },

  // ============ SOFT SKILLS & PROFESSIONAL DEVELOPMENT ============
  {
    id: 'soft-communication',
    title: 'Technical Communication & Presentation',
    description: 'Communicate complex ideas clearly, present technical solutions, and document effectively.',
    tags: ['soft-skills', 'communication', 'career', 'leadership'],
    difficulty: 'beginner',
    duration: 120,
    coverImage: cover('Technical Communication'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'soft-leadership',
    title: 'Technical Leadership & Team Management',
    description: 'Lead engineering teams, mentor developers, and drive technical decision-making.',
    tags: ['soft-skills', 'leadership', 'management', 'career'],
    difficulty: 'advanced',
    duration: 150,
    coverImage: cover('Technical Leadership'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'soft-agile',
    title: 'Agile & Scrum Methodologies',
    description: 'Master agile principles, sprint planning, and collaborative development practices.',
    tags: ['soft-skills', 'agile', 'scrum', 'project-management'],
    difficulty: 'beginner',
    duration: 100,
    coverImage: cover('Agile & Scrum'),
    lastUpdated: new Date().toISOString(),
  },

  // ============ EMERGING TECHNOLOGIES ============
  {
    id: 'iot-systems',
    title: 'IoT Systems & Edge Computing',
    description: 'Design connected IoT systems, edge computing architectures, and sensor networks.',
    tags: ['iot', 'embedded', 'edge', 'emerging'],
    difficulty: 'intermediate',
    duration: 160,
    coverImage: cover('IoT Systems'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'blockchain',
    title: 'Blockchain & Distributed Ledger Technology',
    description: 'Understand blockchain architecture, smart contracts, and decentralized applications.',
    tags: ['blockchain', 'crypto', 'distributed', 'emerging'],
    difficulty: 'advanced',
    duration: 170,
    coverImage: cover('Blockchain Technology'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'quantum-computing',
    title: 'Quantum Computing Fundamentals',
    description: 'Explore quantum bits, quantum algorithms, and potential quantum applications.',
    tags: ['quantum', 'physics', 'computing', 'research'],
    difficulty: 'advanced',
    duration: 180,
    coverImage: cover('Quantum Computing'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'ar-vr',
    title: 'Augmented Reality & Virtual Reality',
    description: 'Develop immersive AR/VR applications using Unity, Unreal, and WebXR.',
    tags: ['ar-vr', 'graphics', 'immersive', 'emerging'],
    difficulty: 'advanced',
    duration: 190,
    coverImage: cover('AR & VR'),
    lastUpdated: new Date().toISOString(),
  },

  // ============ SUPPLEMENTARY SKILLS ============
  {
    id: 'math-linear-algebra',
    title: 'Linear Algebra for Engineers',
    description: 'Master vectors, matrices, eigenvalues, and applications in engineering.',
    tags: ['math', 'linear-algebra', 'core', 'foundational'],
    difficulty: 'intermediate',
    duration: 150,
    coverImage: cover('Linear Algebra'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'math-calculus',
    title: 'Calculus & Differential Equations',
    description: 'Understand derivatives, integrals, and solving differential equations.',
    tags: ['math', 'calculus', 'core', 'foundational'],
    difficulty: 'intermediate',
    duration: 160,
    coverImage: cover('Calculus & Differential Equations'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'version-control',
    title: 'Version Control & Git',
    description: 'Master Git workflow, branching strategies, and collaborative development.',
    tags: ['tools', 'git', 'version-control', 'essential'],
    difficulty: 'beginner',
    duration: 80,
    coverImage: cover('Git & Version Control'),
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'testing-quality',
    title: 'Software Testing & Quality Assurance',
    description: 'Learn unit testing, integration testing, and test automation frameworks.',
    tags: ['testing', 'quality', 'qa', 'essential'],
    difficulty: 'intermediate',
    duration: 140,
    coverImage: cover('Software Testing'),
    lastUpdated: new Date().toISOString(),
  },
]

// Enhance catalog item with enriched data
const enhanceWithData = async (item: CatalogItem): Promise<CatalogItem> => {
  try {
    const enrichedData = await DataEnricher.enrichCourseData(item.title)
    return {
      ...item,
      importance: enrichedData.importance,
      benefits: enrichedData.benefits,
      realWorldApplications: enrichedData.realWorldApplications,
      industryDemand: enrichedData.industryDemand,
      learningTips: enrichedData.learningTips,
    }
  } catch (error) {
    console.error(`Failed to enhance catalog item ${item.id}:`, error)
    return item
  }
}

// Cache for enhanced catalog
let enhancedCatalogCache: CatalogItem[] | null = null

export const getEnhancedCatalog = async (): Promise<CatalogItem[]> => {
  if (enhancedCatalogCache) {
    return enhancedCatalogCache
  }

  try {
    // Enhance catalog items with enriched data in parallel
    const enhancementPromises = rawCatalog.map(item => enhanceWithData(item))
    enhancedCatalogCache = await Promise.all(enhancementPromises)
    return enhancedCatalogCache
  } catch (error) {
    console.error('Failed to enhance catalog with data:', error)
    // Return raw catalog as fallback
    return rawCatalog
  }
}

// For backward compatibility, export raw catalog synchronously
export const catalog = rawCatalog
