'use client'

import { ModuleCard } from '@/components/ModuleCard'
import { Badge } from '@/components/ui/badge'
import type { PlatformStats } from '@/lib/actions/stats'
import {
    codeforces,
    codechef,
    geeksforgeeks,
    leetcode,
} from '@/data/profiles'

const PLATFORM_CONFIG = [
    { key: 'codeforces', icon: '⚡', name: 'Codeforces', staticData: codeforces, maxScale: 1800, color: '#1890ff', showRatingBar: true },
    { key: 'leetcode', icon: '💻', name: 'LeetCode', staticData: leetcode, maxScale: 1900, color: '#ffa116', showRatingBar: true },
    { key: 'codechef', icon: '🍲', name: 'CodeChef', staticData: codechef, maxScale: 1800, color: '#5b4638', showRatingBar: true },
    { key: 'gfg', icon: '👨‍🎓', name: 'GfG', staticData: geeksforgeeks, maxScale: 2000, color: '#2f8d46', showRatingBar: false },
] as const

interface ProfileStatsModuleProps {
    liveStats?: PlatformStats | null
}

export function ProfileStatsModule({ liveStats }: ProfileStatsModuleProps) {
    const platforms = PLATFORM_CONFIG.map(({ key, icon, name, staticData, maxScale, color, showRatingBar }) => {
        const live = liveStats?.[key as keyof PlatformStats]

        if (live && 'success' in live && live.success === true) {
            const data = live.data as any

            // Extract solved count - handle nested structure for leetcode/gfg
            let problemsSolved = staticData.problemsSolved
            if (typeof data.solved === 'number') {
                problemsSolved = data.solved // codeforces, codechef
            } else if (data.solved?.total !== undefined) {
                problemsSolved = data.solved.total // leetcode, gfg
            }

            // Extract contests count - different field names per platform
            let contestsCount = staticData.contestsCount
            if (data.contestsCount !== undefined) {
                contestsCount = data.contestsCount // codeforces
            } else if (data.contests !== undefined) {
                contestsCount = data.contests // codechef
            } else if (data.contestsAttended !== undefined) {
                contestsCount = data.contestsAttended // leetcode
            }

            // Extract rating - leetcode uses contestRating, gfg uses codingScore
            let rating = staticData.rating
            if (data.rating !== undefined) {
                rating = Math.round(data.rating) // codeforces, codechef
            } else if (data.contestRating !== undefined) {
                rating = Math.round(data.contestRating) // leetcode
            } else if (data.codingScore !== undefined) {
                rating = Math.round(data.codingScore) // gfg - round it
            }

            // Extract rank - handle stars for codechef
            let rank = data.rank ?? staticData.rank
            if (data.stars !== undefined) {
                rank = `${data.stars}★` // codechef stars
            }

            return {
                name, icon, color, maxScale, showRatingBar,
                rating,
                maxRating: Math.round(data.maxRating ?? staticData.maxRating),
                rank,
                problemsSolved,
                contestsCount,
                isLive: true,
                link: staticData.link,
            }
        }

        return {
            name, icon, color, maxScale, showRatingBar,
            rating: staticData.rating,
            maxRating: staticData.maxRating,
            rank: staticData.rank,
            problemsSolved: staticData.problemsSolved,
            contestsCount: staticData.contestsCount,
            isLive: false,
            link: staticData.link,
        }
    })

    const totalProblems = platforms.reduce((sum, p) => sum + p.problemsSolved, 0)
    const totalContests = platforms.reduce((sum, p) => sum + p.contestsCount, 0)

    return (
        <ModuleCard
            id="profile-stats"
            title="Competitive Programming"
            size="large"
            icon="📊"
        >
            <div className="space-y-3">
                {/* Summary Stats */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="border border-black dark:border-white/30 p-3 text-center">
                        <p className="text-2xl font-bold tracking-tight text-foreground">{totalProblems.toLocaleString()}+</p>
                        <p className="text-xs text-muted-foreground">Problems</p>
                    </div>
                    <div className="border border-black dark:border-white/30 p-3 text-center">
                        <p className="text-2xl font-bold tracking-tight text-foreground">{totalContests}+</p>
                        <p className="text-xs text-muted-foreground">Contests</p>
                    </div>
                </div>

                {/* Platform Cards - Compact */}
                <div className="space-y-2">
                    {platforms.map((platform) => (
                        <a
                            key={platform.name}
                            href={platform.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block border border-black dark:border-white/30 p-3 transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                        >
                            {/* Header row */}
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-base">{platform.icon}</span>
                                    <span className="text-sm font-semibold text-foreground">{platform.name}</span>
                                    {platform.isLive && (
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                    )}
                                </div>
                                <Badge variant="outline" className="text-[10px] h-5">
                                    {platform.rank}
                                </Badge>
                            </div>

                            {/* Rating bar - only show if showRatingBar is true */}
                            {platform.showRatingBar ? (
                                <div className="mb-2">
                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">Rating</span>
                                        <span className="font-bold text-foreground">{platform.rating} / {platform.maxScale}</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted">
                                        <div
                                            className="h-full transition-all duration-500"
                                            style={{
                                                width: `${Math.min((platform.rating / platform.maxScale) * 100, 100)}%`,
                                                backgroundColor: platform.color,
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between text-xs mb-2">
                                    <span className="text-muted-foreground">Coding Score</span>
                                    <span className="font-bold text-foreground">{platform.rating}</span>
                                </div>
                            )}

                            {/* Stats row */}
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                                {platform.showRatingBar && (
                                    <div>
                                        <span className="text-muted-foreground">Max: </span>
                                        <span className="font-semibold text-foreground">{platform.maxRating}</span>
                                    </div>
                                )}
                                <div>
                                    <span className="text-muted-foreground">Solved: </span>
                                    <span className="font-semibold text-foreground">{platform.problemsSolved}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Contests: </span>
                                    <span className="font-semibold text-foreground">{platform.contestsCount}</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </ModuleCard>
    )
}


