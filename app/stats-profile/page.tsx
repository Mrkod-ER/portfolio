import React from "react";
import { getCombinedStats } from "@/lib/actions/stats";
import { StatsProvider } from "@/lib/contexts/stats-context";
import { StatsDisplay } from "@/components/profile/StatsDisplay";

export default async function ProfilePage() {
    const stats = await getCombinedStats();

    return (
        <StatsProvider stats={stats}>
            <div className="p-4 md:p-8">coding profile page</div>
        </StatsProvider>
    );
}
