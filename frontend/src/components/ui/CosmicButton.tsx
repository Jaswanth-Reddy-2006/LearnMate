import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'neon'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  isLoading?: boolean
}

const variantMap: Record<Variant, string> = {
  primary: 'bg-gradient-to-r from-neon-cyan to-neon-violet text-neon-50 hover:from-neon-cyan hover:to-neon-violet',
  secondary: 'bg-neon-200 text-neon-text hover:bg-neon-300 border border-neon-muted',
  ghost: 'bg-transparent text-neon-text hover:bg-neon-100/20 border border-transparent',
  neon: 'bg-transparent border-2 border-neon-cyan text-neon-cyan hover:shadow-neon-cyan-lg neon-border',
}

const CosmicButton = ({
  variant = 'neon',
  isLoading,
  className,
  disabled,
  children,
  ...props
}: Props) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium smooth-transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan disabled:cursor-not-allowed disabled:opacity-60',
        variantMap[variant],
        className,
      )}
      {...props}
    >
      <span className="relative">{children}</span>
    </button>
  )
}

export default CosmicButton
