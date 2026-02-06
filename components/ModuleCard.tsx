'use client'

import React from "react"

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LikeButton } from './LikeButton'

interface ModuleCardProps {
  id: string
  title: string
  icon?: React.ReactNode
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
  expandedContent?: React.ReactNode
  className?: string
}

export function ModuleCard({
  id,
  title,
  icon,
  size = 'medium',
  children,
  expandedContent,
  className,
}: ModuleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        'break-inside-avoid mb-4 group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg',
        isExpanded && 'fixed inset-4 z-50 m-auto max-h-[90vh] max-w-3xl overflow-y-auto',
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-2">
          {icon && <div className="text-xl">{icon}</div>}
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <LikeButton id={id} />
          {expandedContent && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded-md p-1 transition-colors hover:bg-muted"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            >
              <ChevronDown
                size={18}
                className={cn(
                  'transition-transform duration-300',
                  isExpanded && 'rotate-180',
                )}
              />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className={cn('transition-all duration-300', isExpanded && 'hidden')}>
          {children}
        </div>

        {isExpanded && expandedContent && (
          <div className="space-y-4">
            <div className="max-h-96 overflow-y-auto">
              {expandedContent}
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsExpanded(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
