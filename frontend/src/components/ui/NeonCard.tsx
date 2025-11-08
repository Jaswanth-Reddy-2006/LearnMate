import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Props = {
  children: ReactNode
  className?: string
  glow?: 'cyan' | 'magenta' | 'violet' | 'gold'
  onClick?: () => void
}

const glowMap = {
  cyan: 'border-neon-cyan shadow-neon-cyan',
  magenta: 'border-neon-magenta shadow-neon-magenta neon-border-magenta',
  violet: 'border-neon-violet shadow-neon-violet neon-border-violet',
  gold: 'border-neon-gold',
}

const NeonCard = ({ children, className, glow = 'cyan', onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative rounded-lg border-2 bg-neon-100/50 backdrop-blur-sm p-6 smooth-transition',
        glow && glowMap[glow],
        onClick && 'cursor-pointer hover:shadow-lg',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default NeonCard
