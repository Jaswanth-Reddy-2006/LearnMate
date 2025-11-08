import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Zap,
  Users,
  Target,
  Award,
  Brain,
  Rocket,
} from 'lucide-react'
import CosmicButton from '../components/ui/CosmicButton'
import NeonCard from '../components/ui/NeonCard'
import PageTransition from '../components/layout/PageTransition'

const WelcomePage = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Learning',
      description: 'Personalized learning paths adapted to your pace and style',
    },
    {
      icon: Zap,
      title: 'Real-Time Coaching',
      description: 'Live guidance from AI mentors and community experts',
    },
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Structured skill journeys with clear milestones',
    },
    {
      icon: Award,
      title: 'Skill Mastery',
      description: 'Track progress with adaptive assessments and badges',
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Learn together with peers and share your walkthroughs',
    },
    {
      icon: BookOpen,
      title: '20+ Skill Paths',
      description: 'Explore curated AI skill journeys in tech and beyond',
    },
  ]

  const steps = [
    {
      number: 1,
      title: 'Set Your Goal',
      description: 'Tell us what you want to learn or master',
    },
    {
      number: 2,
      title: 'Get Adaptive Plan',
      description: 'AI creates a personalized learning path for you',
    },
    {
      number: 3,
      title: 'Learn & Practice',
      description: 'Follow microlessons with real-time AI coaching',
    },
    {
      number: 4,
      title: 'Grow & Share',
      description: 'Track progress and contribute to the community',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <PageTransition className="min-h-screen bg-neon-50 text-neon-text overflow-hidden">
      <div className="relative z-10">
        <nav className="flex justify-between items-center px-6 md:px-16 py-6 md:py-8 border-b border-neon-cyan/20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-violet text-neon-50 neon-glow">
              <span className="text-lg font-bold">LM</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-neon-cyan neon-text-cyan">LearnMate</p>
              <p className="text-lg font-bold neon-text-cyan">AI Platform</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex gap-4"
          >
            <Link to="/onboarding">
              <CosmicButton variant="neon" className="hidden md:inline-flex">
                Get Started
              </CosmicButton>
            </Link>
          </motion.div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-12 items-center mb-20"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 rounded-lg border border-neon-cyan/50 bg-neon-cyan/5 px-4 py-2 neon-border"
                >
                  <Sparkles className="h-4 w-4 text-neon-cyan" />
                  <span className="text-sm font-medium text-neon-cyan">Welcome to the future of learning</span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-bold leading-tight font-display neon-text-cyan">
                  Master Skills
                  <span className="block text-neon-magenta neon-text-magenta">
                    with AI Mentors
                  </span>
                </h1>

                <p className="text-lg text-neon-muted max-w-lg">
                  Personalized learning paths, real-time coaching, and community support. Transform your career starting today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/session" className="flex-1 sm:flex-none">
                  <CosmicButton variant="primary" className="w-full sm:w-auto group">
                    Start Learning
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </CosmicButton>
                </Link>
                <Link to="/session" className="flex-1 sm:flex-none">
                  <CosmicButton variant="neon" className="w-full sm:w-auto">
                    Explore Paths
                    <ArrowRight className="h-4 w-4" />
                  </CosmicButton>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-6 border-t border-neon-cyan/20">
                <div>
                  <p className="text-2xl font-bold text-neon-cyan">20+</p>
                  <p className="text-sm text-neon-muted">Skill Paths</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neon-violet">Real-time</p>
                  <p className="text-sm text-neon-muted">AI Coaching</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neon-magenta">Live</p>
                  <p className="text-sm text-neon-muted">Community</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative h-96 md:h-full min-h-96 rounded-lg overflow-hidden"
            >
              <NeonCard glow="cyan" className="absolute inset-0 flex items-center justify-center h-full">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="relative w-48 h-48 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 border-2 border-neon-cyan/30 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-2 border-2 border-neon-magenta/20 rounded-full"
                  />
                  <Rocket className="h-24 w-24 text-neon-cyan neon-glow" />
                </motion.div>
              </NeonCard>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-center mb-12 neon-text-cyan font-display">
              Why Choose LearnMate?
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                const glows = ['cyan', 'magenta', 'violet'] as const
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                  >
                    <NeonCard glow={glows[index % 3]}>
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-violet/20 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-neon-cyan" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-neon-text">{feature.title}</h3>
                      <p className="text-sm text-neon-muted">{feature.description}</p>
                    </NeonCard>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-20"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-center mb-12 neon-text-violet font-display">
              Your Learning Journey
            </motion.h2>
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <motion.div key={index} variants={itemVariants} className="relative">
                  <NeonCard glow="violet">
                    <div className="flex flex-col items-center text-center">
                      <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-neon-violet to-neon-magenta flex items-center justify-center mb-4 text-lg font-bold text-neon-50 neon-pulse">
                        {step.number}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-neon-text">{step.title}</h3>
                      <p className="text-sm text-neon-muted">{step.description}</p>
                    </div>
                  </NeonCard>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-neon-cyan/50" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="neon-border rounded-lg p-12 md:p-16 text-center bg-neon-100/20"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold neon-text-magenta font-display">Ready to Transform Your Learning?</h2>
              <p className="text-lg text-neon-muted max-w-2xl mx-auto">
                Join learners mastering in-demand skills with personalized AI coaching and community support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/session">
                  <CosmicButton variant="primary">
                    Get Started Now
                    <ArrowRight className="h-4 w-4" />
                  </CosmicButton>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <footer className="border-t border-neon-cyan/20 mt-20 py-8">
          <div className="max-w-7xl mx-auto px-6 md:px-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-neon-muted">© 2024 LearnMate. All rights reserved.</p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-neon-muted hover:text-neon-cyan transition smooth-transition">
                  Privacy
                </a>
                <a href="#" className="text-neon-muted hover:text-neon-cyan transition smooth-transition">
                  Terms
                </a>
                <a href="#" className="text-neon-muted hover:text-neon-cyan transition smooth-transition">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}

export default WelcomePage
