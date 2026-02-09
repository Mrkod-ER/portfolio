"use server";

import { getAllStats } from "profile-stats";
import { unstable_cache } from "next/cache";

export type PlatformStats = Awaited<ReturnType<typeof getAllStats>>;

const USERNAMES = {
    leetcode: "Mrkod-ER",
    codeforces: "koderabhishek",
    codechef: "king_koder",
    gfg: "koderabhishek",
} as const;

/**
 * Fetches competitive programming stats from all platforms.
 * Cached for 12 hours (43200 seconds) to avoid excessive API calls.
 */
const fetchStatsUncached = async (): Promise<PlatformStats> => {
    try {
        const stats = await getAllStats(USERNAMES, { timeout: 15000 });
        return stats;
    } catch (error) {
        console.error("[Stats] Error fetching stats:", error);
        throw error;
    }
};

export const getCombinedStats = unstable_cache(
    fetchStatsUncached,
    ["competitive-programming-stats", JSON.stringify(USERNAMES)],
    {
        revalidate: 43200, // 12 hours in seconds
        tags: ["stats"],
    }
);
