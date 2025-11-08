import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Props = {
  variant?: 'default' | 'success' | 'warning' | 'outline'
  children: ReactNode
  className?: string
}

const variantMap: Record<NonNullable<Props['variant']>, string> = {
  default: 'bg-primary/20 text-primary border border-primary/40',
  success: 'bg-success/20 text-success border border-success/30',
  warning: 'bg-warning/20 text-warning border border-warning/30',
  outline: 'border border-slate-700 text-slate-200',
}

const Badge = ({ variant = 'default', children, className }: Props) => {
  return <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium', variantMap[variant], className)}>{children}</span>
}

export default Badge
