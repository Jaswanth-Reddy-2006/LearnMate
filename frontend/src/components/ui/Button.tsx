import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  isLoading?: boolean
}

const variantMap: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'bg-slate-800 text-slate-100 hover:bg-slate-700',
  ghost: 'bg-transparent text-slate-200 hover:bg-slate-800/60',
}

const sizeMap: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

const Button = ({ variant = 'primary', size = 'md', isLoading, className, disabled, children, ...props }: Props) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60',
        variantMap[variant],
        sizeMap[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
