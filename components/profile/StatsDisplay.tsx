"use client";

import { useStats } from "@/lib/contexts/stats-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Code2,
    Trophy,
    Target,
    TrendingUp,
    Star,
    Flame,
    Award,
} from "lucide-react";

export const StatsDisplay = () => {
    const stats = useStats();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Codeforces */}
            {stats.codeforces?.success && (
                <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Code2 className="w-5 h-5 text-blue-500" />
                            Codeforces
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Rating</span>
                            <Badge variant="default" className="font-bold">
                                {stats.codeforces.data.rating}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Max Rating</span>
                            <span className="font-semibold">
                                {stats.codeforces.data.maxRating}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Rank</span>
                            <span className="text-xs font-medium capitalize">
                                {stats.codeforces.data.rank}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Trophy className="w-4 h-4" />
                                Solved
                            </span>
                            <span className="font-bold text-lg">
                                {stats.codeforces.data.solved}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* LeetCode */}
            {stats.leetcode?.success && (
                <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-orange-500" />
                            LeetCode
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Ranking</span>
                            <Badge variant="outline" className="font-bold">
                                #{stats.leetcode.data.ranking.toLocaleString()}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Total Solved</span>
                            <span className="font-bold text-lg">
                                {stats.leetcode.data.solved.total}
                            </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="text-center">
                                <div className="text-green-500 font-semibold">
                                    {stats.leetcode.data.solved.easy}
                                </div>
                                <div className="text-muted-foreground">Easy</div>
                            </div>
                            <div className="text-center">
                                <div className="text-yellow-500 font-semibold">
                                    {stats.leetcode.data.solved.medium}
                                </div>
                                <div className="text-muted-foreground">Med</div>
                            </div>
                            <div className="text-center">
                                <div className="text-red-500 font-semibold">
                                    {stats.leetcode.data.solved.hard}
                                </div>
                                <div className="text-muted-foreground">Hard</div>
                            </div>
                        </div>
                        {stats.leetcode.data.contestRating && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                    Contest Rating
                                </span>
                                <span className="font-semibold">
                                    {stats.leetcode.data.contestRating}
                                </span>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* CodeChef */}
            {stats.codechef?.success && (
                <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            CodeChef
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Stars</span>
                            <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                                {stats.codechef.data.stars} ⭐
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Rating</span>
                            <span className="font-bold">{stats.codechef.data.rating}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Max Rating</span>
                            <span className="font-semibold">
                                {stats.codechef.data.maxRating}
                            </span>
                        </div>
                        {stats.codechef.data.globalRank && (
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                    <TrendingUp className="w-4 h-4" />
                                    Global Rank
                                </span>
                                <span className="font-semibold">
                                    #{stats.codechef.data.globalRank.toLocaleString()}
                                </span>
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Solved</span>
                            <span className="font-bold text-lg">
                                {stats.codechef.data.solved}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* GeeksforGeeks */}
            {stats.gfg?.success && (
                <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-green-500" />
                            GeeksforGeeks
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Coding Score</span>
                            <Badge variant="default" className="font-bold bg-green-600">
                                {stats.gfg.data.codingScore}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Total Solved</span>
                            <span className="font-bold text-lg">
                                {stats.gfg.data.solved.total}
                            </span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="text-center">
                                <div className="text-green-500 font-semibold">
                                    {stats.gfg.data.solved.easy}
                                </div>
                                <div className="text-muted-foreground">Easy</div>
                            </div>
                            <div className="text-center">
                                <div className="text-yellow-500 font-semibold">
                                    {stats.gfg.data.solved.medium}
                                </div>
                                <div className="text-muted-foreground">Med</div>
                            </div>
                            <div className="text-center">
                                <div className="text-red-500 font-semibold">
                                    {stats.gfg.data.solved.hard}
                                </div>
                                <div className="text-muted-foreground">Hard</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Flame className="w-4 h-4 text-orange-500" />
                                Streak
                            </span>
                            <span className="font-semibold">
                                {stats.gfg.data.currentStreak} / {stats.gfg.data.maxStreak}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
