import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Props = {
  title?: string
  description?: string
  rightSlot?: ReactNode
  className?: string
  children: ReactNode
}

const Card = ({ title, description, rightSlot, className, children }: Props) => {
  return (
    <div className={cn('rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-soft', className)}>
      {(title || rightSlot) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
            {description && <p className="text-sm text-slate-400">{description}</p>}
          </div>
          {rightSlot}
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}

export default Card
