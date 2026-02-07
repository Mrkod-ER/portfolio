'use client'

import { ModuleCard } from '@/components/ModuleCard'
import { CodeProfile } from '@/data/profiles'

interface CodingProfileModuleProps {
  profile: CodeProfile
  icon: string
}

export function CodingProfileModule({ profile, icon }: CodingProfileModuleProps) {
  return (
    <ModuleCard
      id={profile.name.toLowerCase()}
      title={profile.name}
      size={profile.rating > 2000 ? 'medium' : 'small'}
      icon={icon}
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Rating</span>
            <span className="font-semibold text-foreground">{profile.rating}</span>
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
            <span>Max Rating</span>
            <span className="font-medium text-foreground">{profile.maxRating}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Rank</span>
            <span className="font-medium text-foreground">{profile.rank}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Problems</span>
            <span className="font-medium text-foreground">{profile.problemsSolved}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Contests</span>
            <span className="font-medium text-foreground">{profile.contestsCount}</span>
          </div>
        </div>
      </div>
    </ModuleCard>
  )
}

