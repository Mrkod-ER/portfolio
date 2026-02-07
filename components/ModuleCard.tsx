'use client'

import React from "react"

import { cn } from '@/lib/utils'
import { LikeButton } from './LikeButton'

interface ModuleCardProps {
  id: string
  title: string
  icon?: React.ReactNode
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
  className?: string
}

export function ModuleCard({
  id,
  title,
  icon,
  size = 'medium',
  children,
  className,
}: ModuleCardProps) {
  return (
    <div
      className={cn(
        'break-inside-avoid mb-4 group relative overflow-hidden rounded-none border border-black dark:border-white/30 bg-card',
        'transition-all duration-300 ease-out',
        'hover:scale-[1.01] hover:-translate-y-1 hover:shadow-xl',
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black dark:border-white/30 px-5 py-4">
        <div className="flex items-center gap-2.5">
          {icon && <div className="text-xl">{icon}</div>}
          <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
        </div>
        <LikeButton id={id} />
      </div>

      {/* Content */}
      <div className="p-5">
        {children}
      </div>
    </div>
  )
}


