'use client'

import React, { useEffect, useState } from 'react'

export function SystemMonitor() {
    const [mounted, setMounted] = useState(false)
    const [dataStream, setDataStream] = useState<string[]>([])

    useEffect(() => {
        setMounted(true)

        // Simulate data stream
        const interval = setInterval(() => {
            // Generate some random hex-like data
            const hex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0')
            setDataStream(prev => [hex, ...prev].slice(0, 8))
        }, 200)

        return () => clearInterval(interval)
    }, [])

    if (!mounted) return null

    return (
        <div className="relative w-full h-full flex items-center justify-center p-8 select-none pointer-events-none">
            {/* Container - maintains aspect ratio */}
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center">

                {/* Core Glow */}
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full animate-pulse opacity-50" />

                {/* Outer Ring - Dashed, Slow Rotate */}
                <div className="absolute inset-0 border border-dashed border-zinc-800 rounded-full animate-[spin_20s_linear_infinite] opacity-50" />

                {/* Inner Ring - Tech Scale, Counter Rotate */}
                <div className="absolute inset-8 border border-zinc-800 rounded-full animate-[spin_15s_linear_infinite_reverse] opacity-80 border-t-transparent border-l-transparent" />

                {/* Middle Orbit */}
                <div className="absolute inset-16 border border-zinc-800/30 rounded-full animate-[spin_10s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                </div>

                {/* Center Core */}
                <div className="absolute w-32 h-32 bg-zinc-950 border border-zinc-800 rounded-full flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(0,0,0,0.5)] gap-2">
                    <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest animate-pulse">SYS.MON</span>
                    <div className="flex items-end gap-1 h-8">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="w-1 bg-zinc-800 animate-pulse duration-700"
                                style={{
                                    height: `${Math.random() * 100}%`,
                                    animationDelay: `${i * 150}ms`
                                }}
                            />
                        ))}
                    </div>
                    <span className="text-[9px] text-zinc-700 font-mono">ACTIVE</span>
                </div>

                {/* Scanning Radar Line */}
                <div className="absolute inset-4 rounded-full overflow-hidden opacity-10">
                    <div className="w-full h-1/2 bg-gradient-to-t from-zinc-500 to-transparent animate-[spin_4s_linear_infinite] origin-bottom" />
                </div>

                {/* Floating Data Points */}
                <div className="absolute -right-8 top-12 flex flex-col gap-1 font-mono text-[9px] text-zinc-800 w-16">
                    {dataStream.map((hex, i) => (
                        <div key={i} className="flex justify-between w-full opacity-60">
                            <span>0x{hex.substring(0, 2)}</span>
                            <span>{hex.substring(2, 6)}</span>
                        </div>
                    ))}
                </div>

                {/* Decorative Crosshairs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 w-px h-12 bg-zinc-800/50" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 w-px h-12 bg-zinc-800/50" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 h-px w-12 bg-zinc-800/50" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 h-px w-12 bg-zinc-800/50" />

            </div>
        </div>
    )
}
