'use client'

import { useParams, useRouter } from 'next/navigation'
import { codeforces, leetcode, codechef, geeksforgeeks } from '@/data/profiles'
import { Button } from '@/components/ui/button'
import { LikeButton } from '@/components/LikeButton'
import { ArrowLeft, ExternalLink, Trophy, Target, CodeSquare, Award } from 'lucide-react'

const profiles = {
  codeforces,
  leetcode,
  codechef,
  geeksforgeeks,
}

type PlatformKey = keyof typeof profiles

export default function CodingProfileDetailPage() {
  const params = useParams()
  const router = useRouter()
  const platform = params.platform as string

  const profile = profiles[platform as PlatformKey]

  if (!profile) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Platform Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The coding profile you're looking for doesn't exist.
            </p>
            <Button onClick={() => router.push('/')}>Return to Home</Button>
          </div>
        </div>
      </main>
    )
  }

  const progressPercentage = (profile.rating / profile.maxRating) * 100

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>

        {/* Header */}
        <div className="mb-8 rounded-lg border border-border bg-card p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{profile.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{profile.rank}</p>
              <Button asChild className="gap-2">
                <a href={profile.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  Visit Profile
                </a>
              </Button>
            </div>
            <LikeButton id={`coding-${platform}`} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-8">
          {/* Rating */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={20} className="text-primary" />
              <h3 className="font-semibold text-foreground">Current Rating</h3>
            </div>
            <div className="mb-4">
              <div className="text-3xl font-bold text-foreground">{profile.rating}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Max Rating: {profile.maxRating}
              </p>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Contests */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Target size={20} className="text-primary" />
              <h3 className="font-semibold text-foreground">Contests Participated</h3>
            </div>
            <div className="text-3xl font-bold text-foreground">{profile.contestsCount}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Active participation in competitive programming
            </p>
          </div>

          {/* Problems Solved */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <CodeSquare size={20} className="text-primary" />
              <h3 className="font-semibold text-foreground">Problems Solved</h3>
            </div>
            <div className="text-3xl font-bold text-foreground">{profile.problemsSolved}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Total problems solved on the platform
            </p>
          </div>

          {/* Rank */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Award size={20} className="text-primary" />
              <h3 className="font-semibold text-foreground">Achievement</h3>
            </div>
            <div className="text-2xl font-bold text-foreground">{profile.rank}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Current achievement level
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Performance Summary</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Achievement Rate</p>
              <p className="text-base text-foreground font-semibold">
                {((profile.rating / profile.maxRating) * 100).toFixed(1)}% of max rating achieved
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Average Performance</p>
              <p className="text-base text-foreground font-semibold">
                {(profile.problemsSolved / Math.max(profile.contestsCount, 1)).toFixed(1)} problems per contest (if applicable)
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Contribution</p>
              <p className="text-base text-foreground font-semibold">
                {profile.contestsCount + profile.problemsSolved} total actions across contests and problems
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
