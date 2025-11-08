import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Menu, LayoutDashboard, BookOpen, PlayCircle, Users, Video, User, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from '../../lib/cn'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/catalog', label: 'Catalog', icon: BookOpen },
  { path: '/lesson/loop-fundamentals', label: 'Lesson Player', icon: PlayCircle },
  { path: '/quiz/loop-fundamentals', label: 'Quiz', icon: ShieldCheck },
  { path: '/community', label: 'Community', icon: Users },
  { path: '/studio', label: 'Video Studio', icon: Video },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/moderation', label: 'Moderation', icon: ShieldCheck },
]

const MainLayout = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-surface text-slate-100">
      <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-muted/60 p-6 lg:block">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <span className="text-2xl font-bold">LM</span>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wide text-slate-400">LearnMate</p>
            <p className="text-lg font-semibold">Adaptive Tutor</p>
          </div>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-all duration-200 hover:bg-slate-800/70 hover:text-white',
                    isActive ? 'bg-primary/20 text-white shadow-soft' : 'text-slate-300',
                  )
                }
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-slate-800 bg-surface/90 backdrop-blur">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 px-3 py-2 text-sm text-slate-200 transition hover:border-primary/40 hover:text-white lg:hidden"
            >
              <Menu className="h-5 w-5" />
              Menu
            </button>
            <div className="hidden items-center gap-4 lg:flex">
              <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-300">
                Early Access Build
              </div>
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent" />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Portal forceMount>
              <DialogPrimitive.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/40"
                />
              </DialogPrimitive.Overlay>
              <DialogPrimitive.Content forceMount asChild>
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 24, stiffness: 260 }}
                  className="fixed inset-y-0 left-0 z-50 w-72 bg-muted p-6 shadow-soft"
                >
                  <nav className="space-y-1">
                    {navItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            cn(
                              'flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-all duration-200 hover:bg-slate-800/70 hover:text-white',
                              isActive ? 'bg-primary/20 text-white shadow-soft' : 'text-slate-300',
                            )
                          }
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </NavLink>
                      )
                    })}
                  </nav>
                </motion.div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainLayout
