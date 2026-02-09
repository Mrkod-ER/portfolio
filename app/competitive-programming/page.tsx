import { getCombinedStats } from '@/lib/actions/stats'
import { Metadata } from 'next'
import {
    codeforces,
    codechef,
    geeksforgeeks,
    leetcode,
} from '@/data/profiles'

export const metadata: Metadata = {
    title: 'Competitive Programming | Portfolio',
    description: 'My competitive programming journey across multiple platforms',
}

export const revalidate = 43200

const PLATFORM_CONFIG = {
    codeforces: {
        name: 'Codeforces',
        icon: '⚡',
        color: '#3b82f6',
        link: 'https://codeforces.com/profile/',
        username: 'koderabhishek',
        staticData: codeforces,
        targetRating: 1800,
        description: 'Algorithm contests & problem solving',
    },
    leetcode: {
        name: 'LeetCode',
        icon: '💻',
        color: '#f97316',
        link: 'https://leetcode.com/',
        username: 'Mrkod-ER',
        staticData: leetcode,
        targetRating: 1900,
        description: 'DSA practice & weekly contests',
    },
    codechef: {
        name: 'CodeChef',
        icon: '🍲',
        color: '#a16207',
        link: 'https://www.codechef.com/users/',
        username: 'king_koder',
        staticData: codechef,
        targetRating: 1800,
        description: 'Long challenges',
    },
    gfg: {
        name: 'GeeksforGeeks',
        icon: '🧑‍💻',
        color: '#22c55e',
        link: 'https://www.geeksforgeeks.org/user/',
        username: 'koderabhishek',
        staticData: geeksforgeeks,
        targetRating: null,
        description: 'Practice & learning platform',
    },
}

function getRatingTier(rating: number, platform: string): { name: string; color: string } {
    if (platform === 'codeforces') {
        if (rating >= 2400) return { name: 'Grandmaster', color: '#ff0000' }
        if (rating >= 2100) return { name: 'Master', color: '#ff8c00' }
        if (rating >= 1900) return { name: 'Candidate Master', color: '#aa00aa' }
        if (rating >= 1600) return { name: 'Expert', color: '#0000ff' }
        if (rating >= 1400) return { name: 'Specialist', color: '#03a89e' }
        if (rating >= 1200) return { name: 'Pupil', color: '#008000' }
        return { name: 'Newbie', color: '#808080' }
    }
    if (platform === 'leetcode') {
        if (rating >= 2400) return { name: 'Guardian', color: '#ff375f' }
        if (rating >= 2000) return { name: 'Knight', color: '#ff9800' }
        if (rating >= 1600) return { name: 'Top Solver', color: '#2196f3' }
        return { name: 'Solver', color: '#4caf50' }
    }
    if (platform === 'codechef') {
        if (rating >= 2500) return { name: '7★', color: '#ff0000' }
        if (rating >= 2200) return { name: '6★', color: '#ff8c00' }
        if (rating >= 2000) return { name: '5★', color: '#aa00aa' }
        if (rating >= 1800) return { name: '4★', color: '#0000ff' }
        if (rating >= 1600) return { name: '3★', color: '#03a89e' }
        if (rating >= 1400) return { name: '2★', color: '#008000' }
        return { name: '1★', color: '#808080' }
    }
    return { name: 'Active', color: '#22c55e' }
}

export default async function CompetitiveProgrammingPage() {
    const stats = await getCombinedStats()

    const platforms = Object.entries(PLATFORM_CONFIG).map(([key, config]) => {
        const live = stats?.[key as keyof typeof stats]
        const data = live?.success ? (live.data as any) : null

        let rating = config.staticData.rating
        let maxRating = config.staticData.maxRating
        let rank = config.staticData.rank
        let solved = config.staticData.problemsSolved
        let contests = config.staticData.contestsCount
        let username = config.username
        let avatar = ''
        let globalRanking = null
        let countryRanking = null
        let reputation = null

        if (data) {
            username = data.username || config.username
            avatar = data.avatar || ''

            if (key === 'codeforces') {
                rating = data.rating ?? rating
                maxRating = data.maxRating ?? maxRating
                rank = data.rank ?? rank
                solved = data.solved ?? solved
                contests = data.contestsCount ?? contests
            } else if (key === 'leetcode') {
                rating = Math.round(data.contestRating ?? rating)
                maxRating = rating
                rank = data.contestRanking ? `#${data.contestRanking.toLocaleString()}` : rank
                solved = data.solved?.total ?? solved
                contests = data.contestsAttended ?? contests
                globalRanking = data.contestRanking
                reputation = data.reputation
            } else if (key === 'codechef') {
                rating = data.rating ?? rating
                maxRating = data.maxRating ?? maxRating
                rank = `${data.stars ?? 2}★`
                solved = data.solved ?? solved
                contests = data.contests ?? contests
                globalRanking = data.globalRank
                countryRanking = data.countryRank
            } else if (key === 'gfg') {
                rating = data.codingScore ?? rating
                maxRating = rating
                rank = data.instituteRank ? `#${data.instituteRank}` : rank
                solved = data.solved?.total ?? solved
                contests = 0
            }
        }

        let solvedBreakdown = null
        if (key === 'leetcode' && data?.solved) {
            solvedBreakdown = {
                easy: data.solved.easy ?? 0,
                medium: data.solved.medium ?? 0,
                hard: data.solved.hard ?? 0,
            }
        }

        const tier = getRatingTier(rating, key)

        return {
            key,
            ...config,
            username,
            avatar,
            rating: Math.round(rating),
            maxRating: Math.round(maxRating),
            rank,
            solved,
            contests,
            solvedBreakdown,
            isLive: !!data,
            tier,
            globalRanking,
            countryRanking,
            reputation,
        }
    })

    const totalProblems = platforms.reduce((sum, p) => sum + p.solved, 0)
    const totalContests = platforms.reduce((sum, p) => sum + p.contests, 0)
    const bestRating = Math.max(...platforms.map(p => p.rating))
    const avgRating = Math.round(platforms.filter(p => p.targetRating).reduce((s, p) => s + p.rating, 0) / 3)

    return (
        <div className="min-h-screen p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 auto-rows-[100px]">

                    {/* Title Card */}
                    <div className="col-span-4 lg:col-span-4 row-span-2 relative overflow-hidden border border-black dark:border-white/20 p-6 flex flex-col justify-between bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5">
                        <div>
                            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-2 uppercase tracking-wider">
                                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                Live Dashboard
                            </p>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                                Competitive<br />Programming
                            </h1>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                                Tracking progress across
                            </p>
                            <div className="flex gap-2">
                                {platforms.map(p => (
                                    <span key={p.key} className="text-xl" title={p.name}>{p.icon}</span>
                                ))}
                            </div>
                        </div>
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 border border-violet-500/20 rounded-full" />
                        <div className="absolute -right-4 -bottom-4 w-20 h-20 border border-fuchsia-500/30 rounded-full" />
                    </div>

                    {/* Total Problems - Feature Card */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-4 row-span-2 relative overflow-hidden border border-black dark:border-white/20 p-6 flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                        <p className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                            {totalProblems}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">Total Problems Solved</p>
                        <div className="flex gap-2 mt-3">
                            {platforms.map(p => (
                                <div key={p.key} className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <span
                                        className="w-2 h-2"
                                        style={{ backgroundColor: p.color }}
                                    />
                                    {p.solved}
                                </div>
                            ))}
                        </div>
                        <div className="absolute top-4 right-4 text-4xl opacity-10">🎯</div>
                    </div>

                    {/* Stat Cards Row */}
                    <div className="col-span-2 row-span-1 border border-black dark:border-white/20 p-4 flex flex-col justify-center items-center text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                        <p className="text-2xl md:text-3xl font-bold">{totalContests}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Contests</p>
                    </div>

                    <div className="col-span-2 row-span-1 border border-black dark:border-white/20 p-4 flex flex-col justify-center items-center text-center bg-gradient-to-br from-amber-500/10 to-orange-500/10">
                        <p className="text-2xl md:text-3xl font-bold">{bestRating}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Best Rating</p>
                    </div>

                    <div className="col-span-2 row-span-1 border border-black dark:border-white/20 p-4 flex flex-col justify-center items-center text-center bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                        <p className="text-2xl md:text-3xl font-bold">{avgRating}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg Rating</p>
                    </div>

                    <div className="col-span-2 row-span-1 border border-black dark:border-white/20 p-4 flex flex-col justify-center items-center text-center bg-gradient-to-br from-rose-500/10 to-red-500/10">
                        <p className="text-2xl md:text-3xl font-bold">4</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Platforms</p>
                    </div>

                    {/* Platform Cards */}
                    {platforms.map((platform) => (
                        <a
                            key={platform.key}
                            href={platform.username ? `${platform.link}${platform.username}` : platform.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="col-span-4 md:col-span-4 lg:col-span-3 row-span-3 relative overflow-hidden border border-black dark:border-white/20 p-5 flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-primary/50 group"
                            style={{
                                background: `linear-gradient(145deg, ${platform.color}05 0%, ${platform.color}12 100%)`,
                            }}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-12 h-12 flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
                                        style={{ backgroundColor: `${platform.color}15` }}
                                    >
                                        {platform.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                                            {platform.name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            @{platform.username || 'username'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    {platform.isLive && (
                                        <span className="flex items-center gap-1 text-[10px] text-green-600">
                                            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                            LIVE
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Rating Section */}
                            <div className="flex-1">
                                <div className="flex items-end gap-2 mb-1">
                                    <span
                                        className="text-4xl font-bold tracking-tight"
                                        style={{ color: platform.color }}
                                    >
                                        {platform.rating}
                                    </span>
                                    {platform.targetRating && (
                                        <span className="text-sm text-muted-foreground mb-1">
                                            / {platform.targetRating}
                                        </span>
                                    )}
                                </div>

                                {/* Tier Badge */}
                                <div className="flex items-center gap-2 mb-3">
                                    <span
                                        className="px-2 py-0.5 text-xs font-semibold border"
                                        style={{ borderColor: platform.tier.color, color: platform.tier.color }}
                                    >
                                        {platform.tier.name}
                                    </span>
                                    {platform.maxRating > platform.rating && (
                                        <span className="text-xs text-muted-foreground">
                                            Max: {platform.maxRating}
                                        </span>
                                    )}
                                </div>

                                {/* Progress Bar */}
                                {platform.targetRating && (
                                    <div className="mb-4">
                                        <div className="h-2 w-full bg-black/10 dark:bg-white/10 overflow-hidden">
                                            <div
                                                className="h-full transition-all duration-700"
                                                style={{
                                                    width: `${Math.min((platform.rating / platform.targetRating) * 100, 100)}%`,
                                                    backgroundColor: platform.color,
                                                }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                                            <span>{Math.round((platform.rating / platform.targetRating) * 100)}% to target</span>
                                            <span>{platform.targetRating - platform.rating} to go</span>
                                        </div>
                                    </div>
                                )}

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                    <div
                                        className="p-2 text-center"
                                        style={{ backgroundColor: `${platform.color}10` }}
                                    >
                                        <p className="text-lg font-bold">{platform.solved}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase">Solved</p>
                                    </div>
                                    <div
                                        className="p-2 text-center"
                                        style={{ backgroundColor: `${platform.color}10` }}
                                    >
                                        <p className="text-lg font-bold">{platform.contests || '—'}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase">Contests</p>
                                    </div>
                                </div>

                                {/* LeetCode Breakdown */}
                                {platform.solvedBreakdown && (
                                    <div className="grid grid-cols-3 gap-1 mb-3">
                                        <div className="text-center py-1.5 bg-green-500/10 border border-green-500/20">
                                            <p className="text-sm font-bold text-green-600">{platform.solvedBreakdown.easy}</p>
                                            <p className="text-[9px] text-green-600/70">EASY</p>
                                        </div>
                                        <div className="text-center py-1.5 bg-yellow-500/10 border border-yellow-500/20">
                                            <p className="text-sm font-bold text-yellow-600">{platform.solvedBreakdown.medium}</p>
                                            <p className="text-[9px] text-yellow-600/70">MEDIUM</p>
                                        </div>
                                        <div className="text-center py-1.5 bg-red-500/10 border border-red-500/20">
                                            <p className="text-sm font-bold text-red-600">{platform.solvedBreakdown.hard}</p>
                                            <p className="text-[9px] text-red-600/70">HARD</p>
                                        </div>
                                    </div>
                                )}

                                {/* Additional Rankings */}
                                {(platform.globalRanking || platform.countryRanking) && (
                                    <div className="flex gap-3 text-xs text-muted-foreground">
                                        {platform.globalRanking && (
                                            <span>🌍 #{platform.globalRanking.toLocaleString()}</span>
                                        )}
                                        {platform.countryRanking && (
                                            <span>🇮🇳 #{platform.countryRanking.toLocaleString()}</span>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="pt-3 mt-auto border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                                <p className="text-[10px] text-muted-foreground">
                                    {platform.description}
                                </p>
                                <span className="text-muted-foreground group-hover:text-primary transition-colors">
                                    ↗
                                </span>
                            </div>
                        </a>
                    ))}

                    {/* Problems Solved */}
                    <div
                        className="col-span-4 md:col-span-8 lg:col-span-6 row-span-3 relative overflow-hidden border border-black dark:border-white/20 p-5 flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-primary/50 group"
                        style={{
                            background: `linear-gradient(145deg, #3b82f605 0%, #3b82f612 100%)`,
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-12 h-12 flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
                                    style={{ backgroundColor: '#3b82f615' }}
                                >
                                    🎯
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                                        Problems Solved
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        All platforms combined
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Main Stat */}
                        <div className="flex-1">
                            <div className="flex items-end gap-2 mb-1">
                                <span className="text-4xl font-bold tracking-tight" style={{ color: '#3b82f6' }}>
                                    {totalProblems}
                                </span>
                                <span className="text-sm text-muted-foreground mb-1">
                                    problems
                                </span>
                            </div>

                            {/* Platform Breakdown Grid */}
                            <div className="grid grid-cols-4 gap-2 mb-3">
                                {platforms.map((p) => (
                                    <div
                                        key={p.key}
                                        className="p-2 text-center"
                                        style={{ backgroundColor: `${p.color}10` }}
                                    >
                                        <p className="text-lg font-bold">{p.solved}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase">{p.name.slice(0, 4)}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Progress Bar Breakdown */}
                            <div className="mb-4">
                                <div className="h-3 w-full bg-black/10 dark:bg-white/10 overflow-hidden flex">
                                    {platforms.map((p) => (
                                        <div
                                            key={p.key}
                                            className="h-full transition-all duration-700"
                                            style={{
                                                width: `${(p.solved / totalProblems) * 100}%`,
                                                backgroundColor: p.color,
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                                    <span>Platform distribution</span>
                                    <span>{platforms.length} platforms</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="pt-3 mt-auto border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                            <p className="text-[10px] text-muted-foreground">
                                Combined problem-solving progress
                            </p>
                            <span className="text-muted-foreground group-hover:text-primary transition-colors">
                                ↗
                            </span>
                        </div>
                    </div>

                    {/* Rating Overview */}
                    <div
                        className="col-span-4 md:col-span-8 lg:col-span-6 row-span-3 relative overflow-hidden border border-black dark:border-white/20 p-5 flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-primary/50 group"
                        style={{
                            background: `linear-gradient(145deg, #a855f705 0%, #a855f712 100%)`,
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-12 h-12 flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
                                    style={{ backgroundColor: '#a855f715' }}
                                >
                                    📈
                                </div>
                                <div>
                                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                                        Rating Overview
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        Contest performance
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Main Stat */}
                        <div className="flex-1">
                            <div className="flex items-end gap-2 mb-1">
                                <span className="text-4xl font-bold tracking-tight" style={{ color: '#a855f7' }}>
                                    {bestRating}
                                </span>
                                <span className="text-sm text-muted-foreground mb-1">
                                    best rating
                                </span>
                            </div>

                            {/* Rating Breakdown Grid */}
                            <div className="grid grid-cols-3 gap-2 mb-3">
                                {platforms.filter(p => p.targetRating).map((p) => (
                                    <div
                                        key={p.key}
                                        className="p-2 text-center"
                                        style={{ backgroundColor: `${p.color}10` }}
                                    >
                                        <p className="text-lg font-bold" style={{ color: p.color }}>{p.rating}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase">{p.name.slice(0, 4)}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Tier Badges */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                {platforms.filter(p => p.targetRating).map((p) => (
                                    <div
                                        key={p.key}
                                        className="text-center py-1.5 border"
                                        style={{ borderColor: p.tier.color, color: p.tier.color }}
                                    >
                                        <p className="text-[10px] font-semibold uppercase">{p.tier.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="pt-3 mt-auto border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                            <p className="text-[10px] text-muted-foreground">
                                Target: 1800+ across platforms
                            </p>
                            <span className="text-muted-foreground group-hover:text-primary transition-colors">
                                ↗
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
