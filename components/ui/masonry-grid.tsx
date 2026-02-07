import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MasonryGridProps {
    children: ReactNode
    className?: string
}

export function MasonryGrid({ children, className }: MasonryGridProps) {
    return (
        <div
            className={cn(
                'columns-1 md:columns-2 xl:columns-3 gap-5',
                '[&>*]:mb-5 [&>*]:break-inside-avoid',
                className,
            )}
        >
            {children}
        </div>
    )
}

