'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getLikes, toggleUserLike, hasUserLiked } from '@/lib/likes'

interface LikeButtonProps {
  id: string
  className?: string
}

export function LikeButton({ id, className }: LikeButtonProps) {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setLikes(getLikes(id))
    setIsLiked(hasUserLiked(id))
  }, [id])

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const newStatus = toggleUserLike(id)
    setIsLiked(newStatus)
    setLikes(getLikes(id))
  }

  if (!isMounted) {
    return null
  }

  return (
    <button
      onClick={handleLike}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all duration-300',
        'border border-border hover:border-primary/50 hover:scale-110 active:scale-95',
        isLiked ? 'bg-red-50 dark:bg-red-950' : 'bg-muted hover:bg-muted/80',
        className,
      )}
      aria-label={isLiked ? 'Unlike' : 'Like'}
    >
      <Heart
        size={16}
        className={cn(
          'transition-all duration-200',
          isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground group-hover:text-red-500',
          (isHovered || isLiked) && 'scale-110',
        )}
      />
      <span
        className={cn(
          'text-xs font-medium transition-colors duration-200',
          isLiked ? 'text-red-600 dark:text-red-300' : 'text-muted-foreground group-hover:text-foreground',
        )}
      >
        {likes}
      </span>
    </button>
  )
}
