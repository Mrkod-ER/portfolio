'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';
import type { PlatformStats } from '@/lib/actions/stats';
import {
    codeforces,
    codechef,
    geeksforgeeks,
    leetcode,
} from '@/data/profiles';


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
};

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

interface CompetitiveProgrammingModuleProps {
    stats: PlatformStats | null;
}

export function CompetitiveProgrammingModule({ stats }: CompetitiveProgrammingModuleProps) {
    const platforms = Object.entries(PLATFORM_CONFIG).map(([key, config]) => {
        const live = stats?.[key as keyof typeof stats];
        const data = live?.success ? (live.data as any) : null;

        let rating = config.staticData.rating;
        let maxRating = config.staticData.maxRating;
        let rank = config.staticData.rank;
        let solved = config.staticData.problemsSolved;
        let contests = config.staticData.contestsCount;
        let username = config.username;
        let avatar = '';
        let globalRanking = null;
        let countryRanking = null;
        let reputation = null;

        if (data) {
            username = data.username || config.username;
            avatar = data.avatar || '';

            if (key === 'codeforces') {
                rating = data.rating ?? rating;
                maxRating = data.maxRating ?? maxRating;
                rank = data.rank ?? rank;
                solved = data.solved ?? solved;
                contests = data.contestsCount ?? contests;
            } else if (key === 'leetcode') {
                rating = Math.round(data.contestRating ?? rating);
                maxRating = rating;
                rank = data.contestRanking ? `#${data.contestRanking.toLocaleString()}` : rank;
                solved = data.solved?.total ?? solved;
                contests = data.contestsAttended ?? contests;
                globalRanking = data.contestRanking;
                reputation = data.reputation;
            } else if (key === 'codechef') {
                rating = data.rating ?? rating;
                maxRating = data.maxRating ?? maxRating;
                rank = `${data.stars ?? 2}★`;
                solved = data.solved ?? solved;
                contests = data.contests ?? contests;
                globalRanking = data.globalRank;
                countryRanking = data.countryRank;
            } else if (key === 'gfg') {
                rating = data.codingScore ?? rating;
                maxRating = rating;
                rank = data.instituteRank ? `#${data.instituteRank}` : rank;
                solved = data.solved?.total ?? solved;
                contests = 0;
            }
        }

        let solvedBreakdown = null;
        if (key === 'leetcode' && data?.solved) {
            solvedBreakdown = {
                easy: data.solved.easy ?? 0,
                medium: data.solved.medium ?? 0,
                hard: data.solved.hard ?? 0,
            };
        }

        const tier = getRatingTier(rating, key);

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
        };
    });

    const totalProblems = platforms.reduce((sum, p) => sum + p.solved, 0);
    const totalContests = platforms.reduce((sum, p) => sum + p.contests, 0);
    const bestRating = Math.max(...platforms.map(p => p.rating));
    const avgRating = Math.round(platforms.filter(p => p.targetRating).reduce((s, p) => s + p.rating, 0) / 3);

    const { ref: sectionRef, isInView: sectionVisible } = useInView({ threshold: 0.05 });

    return (
        <div className="w-full" id="competitive-programming">
            {/* Bento Grid Layout */}
            <div
                ref={sectionRef}
                className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-3 auto-rows-[100px]"
                style={{
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >

                {/* Title Card */}
                <div className="col-span-4 lg:col-span-4 row-span-2 relative overflow-hidden border border-zinc-800 bg-zinc-950/40 p-6 flex flex-col justify-between group hover:border-zinc-700 transition-all duration-300">
                    <div>
                        <p className="text-[10px] text-zinc-500 mb-3 flex items-center gap-2 uppercase tracking-wider font-medium">
                            <span className="h-1.5 w-1.5 bg-emerald-500 animate-pulse" />
                            Live Dashboard
                        </p>
                        <h1 className="text-2xl md:text-3xl font-bold leading-tight text-zinc-100">
                            Competitive<br />Programming
                        </h1>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs text-zinc-500 font-medium">
                            Tracking progress across
                        </p>
                        <div className="flex gap-3 text-zinc-500">
                            {platforms.map(p => (
                                <span key={p.key} className="text-lg hover:scale-110 hover:text-zinc-100 transition-all duration-200 cursor-default" title={p.name}>{p.icon}</span>
                            ))}
                        </div>
                    </div>
                    {/* Subtle decorative SVG */}
                    <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
                        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </div>
                </div>

                {/* Total Problems - Feature Card */}
                <div className="col-span-2 md:col-span-4 lg:col-span-4 row-span-2 relative overflow-hidden border border-zinc-800 bg-zinc-950/40 p-6 flex flex-col justify-center items-center text-center group hover:border-zinc-700 transition-all duration-300">
                    <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-100 tracking-tight">
                        {totalProblems}
                    </p>
                    <p className="text-xs text-zinc-500 mt-2 uppercase tracking-wider font-medium">Total Problems Solved</p>
                    <div className="flex gap-4 mt-4">
                        {platforms.map(p => (
                            <div key={p.key} className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                                <span
                                    className="w-2 h-2"
                                    style={{ backgroundColor: p.color }}
                                />
                                <span className="font-medium">{p.solved}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stat Cards Row */}
                <div className="col-span-2 row-span-1 border border-zinc-800 bg-zinc-950/40 p-4 flex flex-col justify-center items-center text-center hover:border-zinc-700 transition-all duration-300">
                    <p className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">{totalContests}</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium mt-1">Contests</p>
                </div>

                <div className="col-span-2 row-span-1 border border-zinc-800 bg-zinc-950/40 p-4 flex flex-col justify-center items-center text-center hover:border-zinc-700 transition-all duration-300">
                    <p className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">{bestRating}</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium mt-1">Best Rating</p>
                </div>

                <div className="col-span-2 row-span-1 border border-zinc-800 bg-zinc-950/40 p-4 flex flex-col justify-center items-center text-center hover:border-zinc-700 transition-all duration-300">
                    <p className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">{avgRating}</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium mt-1">Avg Rating</p>
                </div>

                <div className="col-span-2 row-span-1 border border-zinc-800 bg-zinc-950/40 p-4 flex flex-col justify-center items-center text-center hover:border-zinc-700 transition-all duration-300">
                    <p className="text-2xl md:text-3xl font-bold text-zinc-100 tracking-tight">4</p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium mt-1">Platforms</p>
                </div>

                {/* Platform Cards */}
                {platforms.map((platform) => (
                    <a
                        key={platform.key}
                        href={platform.username ? `${platform.link}${platform.username}` : platform.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="col-span-4 md:col-span-4 lg:col-span-3 row-span-3 relative overflow-hidden border border-zinc-800 bg-zinc-950/40 p-5 flex flex-col transition-all duration-300 hover:bg-zinc-950/70 hover:border-zinc-700 group"
                    >
                        {/* Platform accent line */}
                        <div
                            className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ backgroundColor: platform.color }}
                        />

                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 flex items-center justify-center text-xl border border-zinc-800 bg-zinc-900/50 group-hover:border-zinc-700 transition-colors"
                                >
                                    {platform.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-zinc-200 group-hover:text-zinc-50 transition-colors text-sm">
                                        {platform.name}
                                    </h3>
                                    <p className="text-[11px] text-zinc-500">
                                        @{platform.username || 'username'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                {platform.isLive && (
                                    <span className="flex items-center gap-1.5 text-[9px] font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 tracking-wider">
                                        <span className="h-1 w-1 bg-emerald-500 animate-pulse" />
                                        LIVE
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Rating Section */}
                        <div className="flex-1">
                            <div className="flex items-end gap-2 mb-1">
                                <span className="text-2xl font-bold text-zinc-100 tracking-tight">
                                    {platform.rating}
                                </span>
                                {platform.targetRating && (
                                    <span className="text-xs text-zinc-500 mb-1.5">
                                        / {platform.targetRating}
                                    </span>
                                )}
                            </div>

                            {/* Tier Badge */}
                            <div className="flex items-center gap-2 mb-4">
                                <span
                                    className="px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase border bg-zinc-900/60"
                                    style={{ borderColor: `${platform.tier.color}30`, color: platform.tier.color }}
                                >
                                    {platform.tier.name}
                                </span>
                                {platform.maxRating > platform.rating && (
                                    <span className="text-[10px] text-zinc-500">
                                        Peak: {platform.maxRating}
                                    </span>
                                )}
                            </div>

                            {/* Progress Bar */}
                            {platform.targetRating && (
                                <div className="mb-4">
                                    <div className="h-1 w-full bg-zinc-800/80 overflow-hidden">
                                        <div
                                            className="h-full transition-all duration-1000 ease-out"
                                            style={{
                                                width: `${Math.min((platform.rating / platform.targetRating) * 100, 100)}%`,
                                                backgroundColor: platform.color,
                                                boxShadow: `0 0 8px ${platform.color}40`,
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-[10px] text-zinc-500 mt-1.5 font-medium">
                                        <span>{Math.round((platform.rating / platform.targetRating) * 100)}%</span>
                                        <span>{platform.targetRating - platform.rating} to go</span>
                                    </div>
                                </div>
                            )}

                            {/* Stats Grid - Hide for LeetCode to save space */}
                            {platform.key !== 'leetcode' && (
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                    <div className="p-2.5 text-center bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
                                        <p className="text-lg font-semibold text-zinc-100 tracking-tight">{platform.solved}</p>
                                        <p className="text-[8px] text-zinc-500 uppercase tracking-wider font-medium">Solved</p>
                                    </div>
                                    <div className="p-2.5 text-center bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
                                        <p className="text-lg font-semibold text-zinc-100 tracking-tight">{platform.contests || '—'}</p>
                                        <p className="text-[8px] text-zinc-500 uppercase tracking-wider font-medium">Contests</p>
                                    </div>
                                </div>
                            )}

                            {/* LeetCode Special Compact Grid */}
                            {platform.key === 'leetcode' && platform.solvedBreakdown && (
                                <div className="grid grid-cols-4 gap-1.5 mb-3">
                                    <div className="text-center py-2 bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors flex flex-col justify-center">
                                        <p className="text-xs font-bold text-zinc-100">{platform.contests}</p>
                                        <p className="text-[6px] text-zinc-500 uppercase tracking-wider font-medium">Contests</p>
                                    </div>
                                    <div className="text-center py-2 bg-zinc-900/40 border border-zinc-800/50 hover:border-emerald-500/20 transition-colors flex flex-col justify-center">
                                        <p className="text-xs font-bold text-emerald-400">{platform.solvedBreakdown.easy}</p>
                                        <p className="text-[6px] text-zinc-500 uppercase tracking-wider font-medium">Easy</p>
                                    </div>
                                    <div className="text-center py-2 bg-zinc-900/40 border border-zinc-800/50 hover:border-amber-500/20 transition-colors flex flex-col justify-center">
                                        <p className="text-xs font-bold text-amber-400">{platform.solvedBreakdown.medium}</p>
                                        <p className="text-[6px] text-zinc-500 uppercase tracking-wider font-medium">Med</p>
                                    </div>
                                    <div className="text-center py-2 bg-zinc-900/40 border border-zinc-800/50 hover:border-red-500/20 transition-colors flex flex-col justify-center">
                                        <p className="text-xs font-bold text-red-400">{platform.solvedBreakdown.hard}</p>
                                        <p className="text-[6px] text-zinc-500 uppercase tracking-wider font-medium">Hard</p>
                                    </div>
                                </div>
                            )}

                            {/* Additional Rankings */}
                            {(platform.globalRanking || platform.countryRanking) && (
                                <div className="mt-auto flex gap-3 text-[10px] text-zinc-500 font-medium">
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
                        {!platform.solvedBreakdown && !platform.globalRanking && !platform.countryRanking && (
                            <div className="pt-3 mt-auto border-t border-zinc-800/50 flex items-center justify-between">
                                <p className="text-[10px] text-zinc-500">
                                    {platform.description}
                                </p>
                            </div>
                        )}
                        <div className="absolute top-5 right-5 text-zinc-800 group-hover:text-zinc-500 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                            ↗
                        </div>
                    </a>
                ))}

                {/* Problems Solved */}
                <div
                    className="col-span-4 md:col-span-8 lg:col-span-6 row-span-3 relative overflow-hidden border border-zinc-800 bg-zinc-950/40 p-5 flex flex-col transition-all duration-300 hover:border-zinc-700 group"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 flex items-center justify-center text-xl border border-zinc-800 bg-zinc-900/50"
                            >
                                🎯
                            </div>
                            <div>
                                <h3 className="font-semibold text-zinc-200 group-hover:text-zinc-50 transition-colors">
                                    Problems Solved
                                </h3>
                                <p className="text-[11px] text-zinc-500">
                                    All platforms combined
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Stat */}
                    <div className="flex-1">
                        <div className="flex items-end gap-2 mb-1">
                            <span className="text-2xl font-bold text-zinc-100 tracking-tight">
                                {totalProblems}
                            </span>
                            <span className="text-xs text-zinc-500 mb-1.5">
                                problems
                            </span>
                        </div>

                        {/* Platform Breakdown Grid */}
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            {platforms.map((p) => (
                                <div
                                    key={p.key}
                                    className="p-2.5 text-center bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors"
                                >
                                    <p className="text-lg font-semibold text-zinc-100 tracking-tight">{p.solved}</p>
                                    <p className="text-[8px] text-zinc-500 uppercase tracking-wider font-medium">{p.name.slice(0, 4)}</p>
                                </div>
                            ))}
                        </div>

                        {/* Progress Bar Breakdown */}
                        <div className="mb-4">
                            <div className="h-1.5 w-full bg-zinc-800/60 overflow-hidden flex">
                                {platforms.map((p) => (
                                    <div
                                        key={p.key}
                                        className="h-full transition-all duration-1000 ease-out"
                                        style={{
                                            width: `${(p.solved / totalProblems) * 100}%`,
                                            backgroundColor: p.color,
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] text-zinc-500 mt-2 font-medium">
                                <span>Platform distribution</span>
                                <span>{platforms.length} platforms</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-3 mt-auto border-t border-zinc-800/50 flex items-center justify-between">
                        <p className="text-[10px] text-zinc-500">
                            Combined problem-solving progress
                        </p>
                        <span className="text-zinc-800 group-hover:text-zinc-500 transition-colors">
                            ↗
                        </span>
                    </div>
                </div>

                {/* Rating Overview */}
                <div
                    className="col-span-4 md:col-span-8 lg:col-span-6 row-span-3 relative overflow-hidden border border-zinc-800 bg-zinc-950/40 p-5 flex flex-col transition-all duration-300 hover:border-zinc-700 group"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 flex items-center justify-center text-xl border border-zinc-800 bg-zinc-900/50"
                            >
                                📈
                            </div>
                            <div>
                                <h3 className="font-semibold text-zinc-200 group-hover:text-zinc-50 transition-colors">
                                    Rating Overview
                                </h3>
                                <p className="text-[11px] text-zinc-500">
                                    Contest performance
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Stat */}
                    <div className="flex-1">
                        <div className="flex items-end gap-2 mb-1">
                            <span className="text-2xl font-bold text-zinc-100 tracking-tight">
                                {bestRating}
                            </span>
                            <span className="text-xs text-zinc-500 mb-1.5">
                                best rating
                            </span>
                        </div>

                        {/* Rating Breakdown Grid */}
                        <div className="grid grid-cols-3 gap-2 mb-3">
                            {platforms.filter(p => p.targetRating).map((p) => (
                                <div
                                    key={p.key}
                                    className="p-2.5 text-center bg-zinc-900/40 border border-zinc-800/50 hover:border-zinc-700/50 transition-colors"
                                >
                                    <p className="text-lg font-semibold" style={{ color: p.color }}>{p.rating}</p>
                                    <p className="text-[8px] text-zinc-500 uppercase tracking-wider font-medium">{p.name.slice(0, 4)}</p>
                                </div>
                            ))}
                        </div>

                        {/* Tier Badges */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {platforms.filter(p => p.targetRating).map((p) => (
                                <div
                                    key={p.key}
                                    className="text-center py-2 border bg-zinc-900/30"
                                    style={{ borderColor: `${p.tier.color}25`, color: p.tier.color }}
                                >
                                    <p className="text-[9px] font-semibold uppercase tracking-wider">{p.tier.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-3 mt-auto border-t border-zinc-800/50 flex items-center justify-between">
                        <p className="text-[10px] text-zinc-500">
                            Target: 1800+ across platforms
                        </p>
                        <span className="text-zinc-800 group-hover:text-zinc-500 transition-colors">
                            ↗
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );

}
