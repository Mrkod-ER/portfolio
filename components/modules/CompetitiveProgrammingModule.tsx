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
        color: '#FF2A2A', // Neo Red
        link: 'https://codeforces.com/profile/',
        username: 'koderabhishek',
        staticData: codeforces,
        targetRating: 1800,
        description: 'Algorithm contests & problem solving',
    },
    leetcode: {
        name: 'LeetCode',
        icon: '💻',
        color: '#FF9F1C', // Neo Orange
        link: 'https://leetcode.com/',
        username: 'Mrkod-ER',
        staticData: leetcode,
        targetRating: 1900,
        description: 'DSA practice & weekly contests',
    },
    codechef: {
        name: 'CodeChef',
        icon: '🍲',
        color: '#A855F7', // Neo Purple
        link: 'https://www.codechef.com/users/',
        username: 'king_koder',
        staticData: codechef,
        targetRating: 1800,
        description: 'Long challenges',
    },
    gfg: {
        name: 'GeeksforGeeks',
        icon: '🧑‍💻',
        color: '#33FF57', // Neo Green
        link: 'https://www.geeksforgeeks.org/user/',
        username: 'koderabhishek',
        staticData: geeksforgeeks,
        targetRating: null,
        description: 'Practice & learning platform',
    },
};

function getRatingTier(rating: number, platform: string): { name: string; color: string } {
    if (platform === 'codeforces') {
        if (rating >= 2400) return { name: 'Grandmaster', color: '#FF2A2A' }
        if (rating >= 2100) return { name: 'Master', color: '#FF9F1C' }
        if (rating >= 1900) return { name: 'Candidate Master', color: '#A855F7' }
        if (rating >= 1600) return { name: 'Expert', color: '#3B82F6' }
        if (rating >= 1400) return { name: 'Specialist', color: '#33FF57' }
        if (rating >= 1200) return { name: 'Pupil', color: '#121212' }
        return { name: 'Newbie', color: '#808080' }
    }
    // ... (Keep other platform logic similar but maybe adjust colors to Neo palette if needed, or keep standard)
    if (platform === 'leetcode') {
        if (rating >= 2400) return { name: 'Guardian', color: '#FF2A2A' }
        if (rating >= 2000) return { name: 'Knight', color: '#FF9F1C' }
        if (rating >= 1600) return { name: 'Top Solver', color: '#3B82F6' }
        return { name: 'Solver', color: '#33FF57' }
    }
    if (platform === 'codechef') {
        if (rating >= 2500) return { name: '7★', color: '#FF2A2A' }
        if (rating >= 2200) return { name: '6★', color: '#FF9F1C' }
        if (rating >= 2000) return { name: '5★', color: '#A855F7' }
        if (rating >= 1800) return { name: '4★', color: '#3B82F6' }
        if (rating >= 1600) return { name: '3★', color: '#33FF57' }
        if (rating >= 1400) return { name: '2★', color: '#33FF57' }
        return { name: '1★', color: '#808080' }
    }
    return { name: 'Active', color: '#33FF57' }
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

        const tier = getRatingTier(maxRating, key);

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
    const bestRating = Math.max(...platforms.map(p => p.maxRating));
    const avgRating = Math.round(platforms.filter(p => p.targetRating).reduce((s, p) => s + p.maxRating, 0) / 3);

    const { ref: sectionRef, isInView: sectionVisible } = useInView({ threshold: 0.05 });

    return (
        <div className="w-full py-20" id="competitive-programming">
            {/* Bento Grid Layout */}
            <div
                ref={sectionRef}
                className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 auto-rows-[100px]"
                style={{
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >

                {/* Title Card */}
                <div className="col-span-4 lg:col-span-4 row-span-2 relative overflow-hidden border-4 border-black bg-neo-white p-6 flex flex-col justify-between group shadow-hard hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-300">
                    <div>
                        <p className="text-xs text-black mb-3 flex items-center gap-2 uppercase tracking-wider font-mono font-bold">
                            <span className="h-2 w-2 bg-neo-red animate-pulse border border-black" />
                            Live Dashboard
                        </p>
                        <h1 className="text-3xl md:text-4xl font-display font-bold uppercase leading-tight text-black">
                            Competitive<br />Programming
                        </h1>
                    </div>
                    <div className="space-y-4">
                        <p className="text-xs text-black font-mono font-bold uppercase">
                            Tracking progress across
                        </p>
                        <div className="flex gap-4 text-black">
                            {platforms.map(p => (
                                <span key={p.key} className="text-2xl hover:scale-110 transition-transform duration-200 cursor-default" title={p.name}>{p.icon}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Total Problems - Feature Card */}
                <div className="col-span-2 md:col-span-4 lg:col-span-4 row-span-2 relative overflow-hidden border-4 border-black bg-neo-yellow p-6 flex flex-col justify-center items-center text-center shadow-hard hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-300">
                    <p className="text-6xl md:text-7xl font-display font-bold text-black tracking-tighter">
                        {totalProblems}
                    </p>
                    <p className="text-sm text-black mt-2 uppercase tracking-widest font-mono font-bold bg-white px-2 border-2 border-black">Total Solved</p>

                    <div className="flex gap-4 mt-6">
                        {platforms.map(p => (
                            <div key={p.key} className="flex items-center gap-2 text-xs text-black font-bold font-mono">
                                <span
                                    className="w-3 h-3 border border-black"
                                    style={{ backgroundColor: p.color }}
                                />
                                <span>{p.solved}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stat Cards Row */}
                <div className="col-span-2 row-span-1 border-4 border-black bg-white p-4 flex flex-col justify-center items-center text-center shadow-hard hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-300">
                    <p className="text-3xl font-display font-bold text-black">{totalContests}</p>
                    <p className="text-[10px] text-black uppercase tracking-wider font-mono font-bold mt-1">Contests</p>
                </div>

                <div className="col-span-2 row-span-1 border-4 border-black bg-white p-4 flex flex-col justify-center items-center text-center shadow-hard hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-300">
                    <p className="text-3xl font-display font-bold text-black">{bestRating}</p>
                    <p className="text-[10px] text-black uppercase tracking-wider font-mono font-bold mt-1">Best Rating</p>
                </div>

                <div className="col-span-2 row-span-1 border-4 border-black bg-white p-4 flex flex-col justify-center items-center text-center shadow-hard hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-300">
                    <p className="text-3xl font-display font-bold text-black">{avgRating}</p>
                    <p className="text-[10px] text-black uppercase tracking-wider font-mono font-bold mt-1">Avg Rating</p>
                </div>

                <div className="col-span-2 row-span-1 border-4 border-black bg-white p-4 flex flex-col justify-center items-center text-center shadow-hard hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-300">
                    <p className="text-3xl font-display font-bold text-black">4</p>
                    <p className="text-[10px] text-black uppercase tracking-wider font-mono font-bold mt-1">Platforms</p>
                </div>

                {/* Platform Cards */}
                {platforms.map((platform) => (
                    <a
                        key={platform.key}
                        href={platform.username ? `${platform.link}${platform.username}` : platform.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="col-span-4 md:col-span-4 lg:col-span-3 row-span-3 relative overflow-hidden border-4 border-black bg-white p-5 flex flex-col transition-all duration-300 hover:bg-neo-blue hover:text-white shadow-hard hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] group"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 flex items-center justify-center text-xl border-2 border-black bg-neo-white text-black group-hover:bg-white transition-colors shadow-hard-sm"
                                >
                                    {platform.icon}
                                </div>
                                <div>
                                    <h3 className="font-display font-bold uppercase text-black group-hover:text-white transition-colors text-sm">
                                        {platform.name}
                                    </h3>
                                    <p className="text-[11px] text-black group-hover:text-white font-mono">
                                        @{platform.username || 'username'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                {platform.isLive && (
                                    <span className="flex items-center gap-1.5 text-[9px] font-bold text-black bg-neo-green border-2 border-black px-2 py-0.5 tracking-wider uppercase">
                                        LIVE
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Rating Section */}
                        <div className="flex-1">
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-3xl font-display font-bold text-black group-hover:text-white tracking-tight">
                                    {platform.maxRating}
                                </span>
                                {platform.targetRating && (
                                    <span className="text-xs text-black group-hover:text-white mb-2 font-mono font-bold">
                                        / {platform.targetRating}
                                    </span>
                                )}
                            </div>

                            {/* Tier Badge */}
                            <div className="flex items-center gap-2 mb-4">
                                <span
                                    className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase border-2 border-black bg-neo-white text-black shadow-hard-sm"
                                >
                                    {platform.tier.name}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            {platform.targetRating && (
                                <div className="mb-4">
                                    <div className="h-3 w-full bg-white border-2 border-black overflow-hidden shadow-hard-sm">
                                        <div
                                            className="h-full transition-all duration-1000 ease-out"
                                            style={{
                                                width: `${Math.min((platform.maxRating / platform.targetRating) * 100, 100)}%`,
                                                backgroundColor: platform.color,
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-[10px] text-black group-hover:text-white mt-1.5 font-mono font-bold">
                                        <span>{Math.round((platform.maxRating / platform.targetRating) * 100)}%</span>
                                        <span>{platform.targetRating - platform.maxRating} to go</span>
                                    </div>
                                </div>
                            )}

                            {/* Stats Grid - Hide for LeetCode to save space */}
                            {platform.key !== 'leetcode' && (
                                <div className="grid grid-cols-2 gap-2 mb-3">
                                    <div className="p-2.5 text-center bg-white border-2 border-black group-hover:bg-black group-hover:text-white transition-colors shadow-hard-sm">
                                        <p className="text-lg font-bold tracking-tight">{platform.solved}</p>
                                        <p className="text-[8px] uppercase tracking-wider font-bold">Solved</p>
                                    </div>
                                    <div className="p-2.5 text-center bg-white border-2 border-black group-hover:bg-black group-hover:text-white transition-colors shadow-hard-sm">
                                        <p className="text-lg font-bold tracking-tight">{platform.contests || '—'}</p>
                                        <p className="text-[8px] uppercase tracking-wider font-bold">Contests</p>
                                    </div>
                                </div>
                            )}

                            {/* LeetCode Special Compact Grid */}
                            {platform.key === 'leetcode' && platform.solvedBreakdown && (
                                <div className="grid grid-cols-4 gap-1.5 mb-3">
                                    <div className="text-center py-1 bg-white border-2 border-black flex flex-col justify-center shadow-hard-sm">
                                        <p className="text-xs font-bold text-black">{platform.contests}</p>
                                        <p className="text-[6px] text-black uppercase tracking-wider font-bold">Contests</p>
                                    </div>
                                    <div className="text-center py-1 bg-white border-2 border-black flex flex-col justify-center shadow-hard-sm">
                                        <p className="text-xs font-bold text-neo-green">{platform.solvedBreakdown.easy}</p>
                                        <p className="text-[6px] text-black uppercase tracking-wider font-bold">Easy</p>
                                    </div>
                                    <div className="text-center py-1 bg-white border-2 border-black flex flex-col justify-center shadow-hard-sm">
                                        <p className="text-xs font-bold text-neo-orange">{platform.solvedBreakdown.medium}</p>
                                        <p className="text-[6px] text-black uppercase tracking-wider font-bold">Med</p>
                                    </div>
                                    <div className="text-center py-1 bg-white border-2 border-black flex flex-col justify-center shadow-hard-sm">
                                        <p className="text-xs font-bold text-neo-red">{platform.solvedBreakdown.hard}</p>
                                        <p className="text-[6px] text-black uppercase tracking-wider font-bold">Hard</p>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Footer */}
                        {!platform.solvedBreakdown && !platform.globalRanking && !platform.countryRanking && (
                            <div className="pt-3 mt-auto border-t-2 border-black flex items-center justify-between">
                                <p className="text-[10px] text-black group-hover:text-white font-mono font-bold">
                                    {platform.description}
                                </p>
                            </div>
                        )}
                        <div className="absolute top-5 right-5 text-black group-hover:text-white transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 font-bold">
                            ↗
                        </div>
                    </a>
                ))}

                {/* Problems Solved */}
                <div
                    className="col-span-4 md:col-span-8 lg:col-span-6 row-span-3 relative overflow-hidden border-4 border-black bg-neo-pink p-5 flex flex-col transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none shadow-hard group"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 flex items-center justify-center text-xl border-2 border-black bg-white shadow-hard-sm"
                            >
                                🎯
                            </div>
                            <div>
                                <h3 className="font-display font-bold uppercase text-black text-lg">
                                    Problems Solved
                                </h3>
                                <p className="text-xs text-black font-mono font-bold">
                                    All platforms combined
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Stat */}
                    <div className="flex-1">
                        <div className="flex items-end gap-2 mb-4">
                            <span className="text-4xl font-display font-bold text-black tracking-tight">
                                {totalProblems}
                            </span>
                            <span className="text-sm text-black mb-2 font-mono font-bold uppercase">
                                problems
                            </span>
                        </div>

                        {/* Platform Breakdown Grid */}
                        <div className="grid grid-cols-4 gap-3 mb-6">
                            {platforms.map((p) => (
                                <div
                                    key={p.key}
                                    className="p-2 text-center bg-white border-2 border-black shadow-hard-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                                >
                                    <p className="text-lg font-bold text-black tracking-tight">{p.solved}</p>
                                    <p className="text-[8px] text-black uppercase tracking-wider font-bold">{p.name.slice(0, 4)}</p>
                                </div>
                            ))}
                        </div>

                        {/* Progress Bar Breakdown */}
                        <div className="mb-4">
                            <div className="h-4 w-full bg-white border-2 border-black overflow-hidden flex shadow-hard-sm">
                                {platforms.map((p) => (
                                    <div
                                        key={p.key}
                                        className="h-full transition-all duration-1000 ease-out border-r border-black last:border-r-0"
                                        style={{
                                            width: `${(p.solved / totalProblems) * 100}%`,
                                            backgroundColor: p.color,
                                        }}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between text-[10px] text-black mt-2 font-mono font-bold uppercase">
                                <span>Platform distribution</span>
                                <span>{platforms.length} platforms</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rating Overview */}
                <div
                    className="col-span-4 md:col-span-8 lg:col-span-6 row-span-3 relative overflow-hidden border-4 border-black bg-neo-green p-5 flex flex-col transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none shadow-hard group"
                >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 flex items-center justify-center text-xl border-2 border-black bg-white shadow-hard-sm"
                            >
                                📈
                            </div>
                            <div>
                                <h3 className="font-display font-bold uppercase text-black text-lg">
                                    Rating Overview
                                </h3>
                                <p className="text-xs text-black font-mono font-bold">
                                    Contest performance
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Stat */}
                    <div className="flex-1">
                        <div className="flex items-end gap-2 mb-4">
                            <span className="text-4xl font-display font-bold text-black tracking-tight">
                                {bestRating}
                            </span>
                            <span className="text-sm text-black mb-2 font-mono font-bold uppercase">
                                best rating
                            </span>
                        </div>

                        {/* Rating Breakdown Grid */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {platforms.filter(p => p.targetRating).map((p) => (
                                <div
                                    key={p.key}
                                    className="p-2 text-center bg-white border-2 border-black shadow-hard-sm"
                                >
                                    <p className="text-lg font-bold" style={{ color: p.color }}>{p.maxRating}</p>
                                    <p className="text-[8px] text-black uppercase tracking-wider font-bold">{p.name.slice(0, 4)}</p>
                                </div>
                            ))}
                        </div>

                        {/* Tier Badges */}
                        <div className="grid grid-cols-3 gap-3 mb-4">
                            {platforms.filter(p => p.targetRating).map((p) => (
                                <div
                                    key={p.key}
                                    className="text-center py-2 border-2 border-black bg-white shadow-hard-sm"
                                >
                                    <p className="text-[9px] font-bold uppercase tracking-wider text-black">{p.tier.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );

}
