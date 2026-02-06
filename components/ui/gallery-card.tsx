import { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { LikeButton } from '@/components/LikeButton'

interface GalleryCardProps {
    id: string
    href?: string
    onClick?: () => void
    children: ReactNode
    className?: string
    showLike?: boolean
}

export function GalleryCard({
    id,
    href,
    onClick,
    children,
    className,
    showLike = true
}: GalleryCardProps) {
    const cardContent = (
        <Card
            className={cn(
                'break-inside-avoid mb-4 overflow-hidden transition-all duration-300',
                'hover:shadow-lg hover:scale-[1.02] hover:border-primary/50',
                className,
                (href || onClick) && 'cursor-pointer'
            )}
            onClick={onClick}
        >
            <CardContent className="p-0 relative">
                {showLike && (
                    <div className="absolute top-3 right-3 z-10">
                        <LikeButton id={id} />
                    </div>
                )}
                {children}
            </CardContent>
        </Card>
    )

    if (href) {
        return (
            <Link href={href} className="block">
                {cardContent}
            </Link>
        )
    }

    return cardContent
}
