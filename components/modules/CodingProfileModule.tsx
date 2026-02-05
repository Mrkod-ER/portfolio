'use client'

import Link from 'next/link'
import { ModuleCard } from '@/components/ModuleCard'
import { CodeProfile } from '@/data/profiles'
import { Button } from '@/components/ui/button'
import { ExternalLink, ChevronRight } from 'lucide-react'

interface CodingProfileModuleProps {
  profile: CodeProfile
  icon: string
}

export function CodingProfileModule({ profile, icon }: CodingProfileModuleProps) {
  const expandedContent = (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-border p-3">
          <p className="text-xs text-muted-foreground">Current Rating</p>
          <p className="text-lg font-bold text-foreground">{profile.rating}</p>
        </div>
        <div className="rounded-lg border border-border p-3">
          <p className="text-xs text-muted-foreground">Max Rating</p>
          <p className="text-lg font-bold text-foreground">{profile.maxRating}</p>
        </div>
        <div className="rounded-lg border border-border p-3">
          <p className="text-xs text-muted-foreground">Contests</p>
          <p className="text-lg font-bold text-foreground">{profile.contestsCount}</p>
        </div>
        <div className="rounded-lg border border-border p-3">
          <p className="text-xs text-muted-foreground">Problems</p>
          <p className="text-lg font-bold text-foreground">{profile.problemsSolved}</p>
        </div>
      </div>
      <div className="rounded-lg bg-muted p-3">
        <p className="text-xs text-muted-foreground">Rank</p>
        <p className="font-semibold text-foreground">{profile.rank}</p>
      </div>
      <Button asChild className="w-full">
        <a href={profile.link} target="_blank" rel="noopener noreferrer">
          Visit Profile
          <ExternalLink size={16} />
        </a>
      </Button>
    </div>
  )

  const platformSlug = profile.name.toLowerCase().replace(/\s+/g, '-')

  return (
    <ModuleCard
      id={profile.name.toLowerCase()}
      title={profile.name}
      size={profile.rating > 2000 ? 'medium' : 'small'}
      icon={icon}
      expandedContent={expandedContent}
    >
      <Link href={`/coding-profile/${platformSlug}`} className="group block">
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Rating</span>
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{profile.rating}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  backgroundColor: profile.color,
                  width: `${Math.min((profile.rating / 3000) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Rank</span>
              <span className="font-medium text-foreground">{profile.rank}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Problems</span>
              <span className="font-medium text-foreground">{profile.problemsSolved}</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-lg bg-muted/50 px-2 py-1.5 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            <span>View Details</span>
            <ChevronRight size={12} />
          </div>
        </div>
      </Link>
    </ModuleCard>
  )
}
