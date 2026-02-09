'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, Star } from 'lucide-react'

export function HeroSection() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <section className="relative min-h-screen bg-black flex flex-col justify-between overflow-hidden px-4 md:px-8 py-12 md:py-20">
            {/* Pure black background */}
            <div className="absolute inset-0 bg-black pointer-events-none" />

            {/* Subtle grid background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
                backgroundSize: '100px 100px',
            }} />

            {/* Content Container */}
            <div className="relative z-10">
                {/* Top Section - Tagline and Resume Button */}
                <div className="flex items-start justify-between mb-32 max-w-7xl mx-auto w-full">
                    {/* Left: Tagline */}
                    <div className={`flex items-center gap-3 transition-all duration-1000 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                        <div className="w-1 h-6 bg-gradient-to-b from-gray-400 to-gray-600"></div>
                        <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-xs">
                            Product designer who actually gives a fu*k about the product.
                        </p>
                    </div>

                    {/* Right: Resume Button */}
                    <a
                        href="#"
                        className={`flex items-center gap-2 px-6 py-2 border border-gray-600 text-gray-300 hover:text-white hover:border-gray-300 transition-all duration-300 rounded-full text-sm font-light ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                    >
                        View Resume
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                        </svg>
                    </a>
                </div>

                {/* Center - Floating Pills Cluster with Name */}
                <div className="relative w-full max-w-7xl mx-auto mb-32">
                    {/* Pills Container */}
                    <div className="relative h-96 flex items-center justify-center">
                        {/* Large Center Pill */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                            <div className="px-8 py-4 rounded-full border border-gray-600/50 bg-black/30 backdrop-blur-sm hover:border-gray-500/80 transition-colors duration-300">
                                <span className="text-gray-300 text-lg font-light">Human-AI Interaction</span>
                            </div>
                        </div>

                        {/* Top Left Pill */}
                        <div className={`absolute top-0 left-12 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
                            <div className="px-6 py-3 rounded-full border border-gray-600/50 bg-black/30 backdrop-blur-sm hover:border-gray-500/80 transition-colors duration-300 text-sm">
                                <span className="text-gray-300 font-light">Littlebox India <span className="text-green-500">🟢</span></span>
                            </div>
                        </div>

                        {/* Top Right Pill */}
                        <div className={`absolute top-0 right-12 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
                            <div className="px-6 py-3 rounded-full border border-gray-600/50 bg-black/30 backdrop-blur-sm hover:border-gray-500/80 transition-colors duration-300 text-sm">
                                <span className="text-gray-300 font-light">2+ Years Exp</span>
                            </div>
                        </div>

                        {/* Bottom Left Pill */}
                        <div className={`absolute bottom-0 left-8 transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="px-6 py-3 rounded-full border border-gray-600/50 bg-black/30 backdrop-blur-sm hover:border-gray-500/80 transition-colors duration-300 text-sm">
                                <span className="text-gray-300 font-light">M.Des, IIT Guwahati</span>
                            </div>
                        </div>

                        {/* Bottom Right Vertical Pill */}
                        <div className={`absolute bottom-0 right-8 transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <div className="px-4 py-6 rounded-full border border-gray-600/50 bg-black/30 backdrop-blur-sm hover:border-gray-500/80 transition-colors duration-300">
                                <span className="text-gray-300 font-light text-sm inline-block" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                                    UI/UX Design
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Large Name Below Pills */}
                    <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-light text-gray-200 tracking-tight text-balance">
                            Kausik Deka
                        </h1>
                    </div>
                </div>
            </div>

            {/* Bottom Section - Scroll and Star Indicators */}
            <div className={`flex items-end justify-between max-w-7xl mx-auto w-full transition-all duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                {/* Left: Scroll Indicator */}
                <button className="flex flex-col items-center gap-3 hover:scale-110 transition-transform duration-300 group">
                    <div className="w-12 h-12 rounded-full border border-gray-600/50 flex items-center justify-center group-hover:border-gray-500 transition-colors duration-300">
                        <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">Scroll</span>
                </button>

                {/* Right: Star Indicator */}
                <button className="flex flex-col items-center gap-3 hover:scale-110 transition-transform duration-300 group">
                    <div className="w-12 h-12 rounded-full border border-gray-600/50 flex items-center justify-center group-hover:border-gray-500 transition-colors duration-300">
                        <Star className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" fill="currentColor" />
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">Star</span>
                </button>
            </div>
        </section>
    )
}
