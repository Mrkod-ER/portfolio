import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AsymmetricGridProps {
  children: ReactNode
  className?: string
}

/**
 * 12-column asymmetric grid. Each direct child should have grid-column: span N (1-12).
 * Use with AsymmetricGridItem for consistent spacing.
 */
export function AsymmetricGrid({ children, className }: AsymmetricGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-12 gap-4 md:gap-5',
        className,
      )}
    >
      {children}
    </div>
  )
}

interface AsymmetricGridItemProps {
  children: ReactNode
  span?: 4 | 5 | 6 | 7 | 8
  className?: string
}

export function AsymmetricGridItem({
  children,
  span = 6,
  className,
}: AsymmetricGridItemProps) {
  return (
    <div
      className={cn(
        'min-w-0',
        span === 4 && 'col-span-12 md:col-span-4',
        span === 5 && 'col-span-12 md:col-span-5',
        span === 6 && 'col-span-12 md:col-span-6',
        span === 7 && 'col-span-12 md:col-span-7',
        span === 8 && 'col-span-12 md:col-span-8',
        className,
      )}
    >
      {children}
    </div>
  )
}
