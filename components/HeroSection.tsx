'use client'

import { useEffect, useState } from 'react'
import { aboutMe } from '@/data/profiles'

export function HeroSection() {
    const [mounted, setMounted] = useState(false)
    const [letterIndex, setLetterIndex] = useState(0)
    const name = aboutMe.name

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return
        if (letterIndex < name.length) {
            const timeout = setTimeout(() => {
                setLetterIndex(letterIndex + 1)
            }, 100)
            return () => clearTimeout(timeout)
        }
    }, [mounted, letterIndex, name.length])

    return (
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden px-4 py-16 mb-8">
            {/* Animated background grid */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                                          linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />
                {/* Floating orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-500" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto">
                {/* Greeting */}
                <p
                    className={`text-lg md:text-xl text-muted-foreground mb-4 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                >
                    👋 Hello, I'm
                </p>

                {/* Name with typewriter effect */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                    <span className="relative">
                        {name.split('').map((letter, index) => (
                            <span
                                key={index}
                                className={`inline-block transition-all duration-300 ${index < letterIndex
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                    }`}
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </span>
                        ))}
                        <span
                            className={`inline-block w-[3px] h-[1em] bg-foreground ml-1 align-middle ${letterIndex >= name.length ? 'animate-blink' : ''
                                }`}
                        />
                    </span>
                </h1>

                {/* Role */}
                <h2
                    className={`text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent mb-8 transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                >
                    {aboutMe.role}
                </h2>

                {/* Bio */}
                <p
                    className={`text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                >
                    {aboutMe.bio}
                </p>

                {/* CTA Buttons */}
                <div
                    className={`flex flex-wrap gap-4 justify-center transition-all duration-700 delay-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                >
                    <a
                        href={aboutMe.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground bg-foreground text-background font-medium transition-all duration-300 hover:bg-transparent hover:text-foreground"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                    </a>
                    <a
                        href={aboutMe.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground font-medium transition-all duration-300 hover:bg-foreground hover:text-background"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                    </a>
                </div>

                {/* Scroll indicator */}
                <div
                    className={`mt-16 transition-all duration-700 delay-1200 ${mounted ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <div className="animate-bounce">
                        <svg className="w-6 h-6 mx-auto text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    )
}
