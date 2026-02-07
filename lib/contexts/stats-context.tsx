"use client";

import React, { createContext, useContext, ReactNode } from "react";
import type { PlatformStats } from "@/lib/actions/stats";

const StatsContext = createContext<PlatformStats | null>(null);

export const StatsProvider = ({
    children,
    stats,
}: {
    children: ReactNode;
    stats: PlatformStats;
}) => {
    return (
        <StatsContext.Provider value={stats}>{children}</StatsContext.Provider>
    );
};

export const useStats = () => {
    const context = useContext(StatsContext);
    if (context === null) {
        throw new Error("useStats must be used within a StatsProvider");
    }
    return context;
};
