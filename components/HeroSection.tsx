'use client'

import { useEffect, useState, useRef, useCallback, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { aboutMe } from '@/data/profiles'
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react'

const HeroScene = dynamic(() => import('@/components/ui/HeroScene').then(mod => ({ default: mod.HeroScene })), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
})

// Scramble text hook — kept for interactive flair
const useScramble = (text: string, speed: number = 40) => {
  const [displayText, setDisplayText] = useState(text)
  const isHovering = useRef(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const scramble = useCallback(() => {
    let iteration = 0
    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index]
            }
            return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]
          })
          .join('')
      )

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }

      iteration += 1 / 3
    }, speed)
  }, [text, speed])

  useEffect(() => {
    scramble()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [scramble])

  const trigger = () => {
    if (!isHovering.current) {
      isHovering.current = true
      scramble()
      setTimeout(() => {
        isHovering.current = false
      }, 1000)
    }
  }

  return { displayText, trigger }
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const firstName = aboutMe.name.split(' ')[0]
  const lastName = aboutMe.name.split(' ').slice(1).join(' ')

  const { displayText: scrambledFirst, trigger: triggerFirst } = useScramble(firstName)
  const { displayText: scrambledLast, trigger: triggerLast } = useScramble(lastName)

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      })
    }

    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-zinc-950">


      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-zinc-950" />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Dynamic Background gradients - Overlay for readability */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/50" />

      {/* Subtle Grid Background with Parallax */}
      <div
        className="absolute inset-0 opacity-[0.03] transition-transform duration-200 ease-out will-change-transform z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          transform: `translate(${mousePos.x * -0.2}px, ${mousePos.y * -0.2}px)`
        }}
      />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-16 relative z-10 flex flex-col items-center justify-center h-full pointer-events-none pt-20">

        {/* Content Container - pointer-events-auto for interactivity */}
        <div className={`space-y-8 transition-all duration-1000 max-w-4xl pointer-events-auto flex flex-col items-center text-center ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* The Name — massive, dominant, high visibility */}
          <div
            className="space-y-0 select-none cursor-default"
            onMouseEnter={() => { triggerFirst(); triggerLast(); }}
          >
            <h1 className="font-display text-[clamp(4rem,12vw,10rem)] font-800 leading-[0.85] tracking-tight text-white uppercase drop-shadow-2xl mix-blend-difference">
              {scrambledFirst}
            </h1>
            <h1 className="font-display text-[clamp(4rem,12vw,10rem)] font-800 leading-[0.85] tracking-tight text-white/80 uppercase transition-colors duration-300 hover:text-white mix-blend-difference">
              {scrambledLast}
            </h1>
          </div>

          {/* Divider line */}
          <div className="w-24 h-1 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)]" />

          {/* Role + description */}
          <div className="space-y-6 max-w-2xl backdrop-blur-sm bg-black/30 p-8 rounded-2xl border border-white/10 shadow-2xl">
            <p className="font-body text-2xl md:text-3xl text-indigo-200 font-light tracking-wide">
              {aboutMe.role}
            </p>
            <p className="font-body text-base md:text-lg text-zinc-100 leading-relaxed font-normal shadow-black">
              Crafting <span className="text-white font-bold">performant</span> digital experiences with a focus on
              scalability and architectural clarity.
            </p>
          </div>

          {/* CTA Row */}
          <div className="flex flex-wrap items-center justify-center gap-5 pt-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-zinc-950 font-display text-base font-bold uppercase tracking-wider hover:bg-indigo-50 transition-colors rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              View Work
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>

            <div className="flex items-center gap-3">
              {[
                { icon: Github, link: aboutMe.github, label: 'Github' },
                { icon: Linkedin, link: aboutMe.linkedin, label: 'LinkedIn' },
                { icon: Mail, link: `mailto:${aboutMe.email}`, label: 'Email' }
              ].map(({ icon: Icon, link, label }) => (
                <a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center border border-zinc-500 bg-zinc-900/50 text-zinc-300 hover:text-white hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all rounded-sm backdrop-blur-md"
                  title={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-zinc-400">Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-indigo-500 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
