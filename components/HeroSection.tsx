'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { SystemMonitor } from '@/components/ui/SystemMonitor'
import { aboutMe } from '@/data/profiles'
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react'

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
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15
      })
    }

    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#080808]">
      {/* Subtle Grid Background with Parallax */}
      <div
        className="absolute inset-0 opacity-[0.025] transition-transform duration-200 ease-out will-change-transform"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: '5rem 5rem',
          transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)`
        }}
      />

      {/* Soft radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-16 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center relative z-10">

        {/* Left Column: Typography-driven identity — takes 3/5 */}
        <div className={`lg:col-span-3 space-y-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* The Name — massive, dominant */}
          <div
            className="space-y-0 select-none cursor-default"
            onMouseEnter={() => { triggerFirst(); triggerLast(); }}
          >
            <h1 className="font-display text-[clamp(5rem,15vw,13rem)] font-800 leading-[0.85] tracking-tight text-zinc-100 uppercase">
              {scrambledFirst}
            </h1>
            <h1 className="font-display text-[clamp(5rem,15vw,13rem)] font-800 leading-[0.85] tracking-tight text-zinc-500 uppercase transition-colors duration-500 hover:text-zinc-300">
              {scrambledLast}
            </h1>
          </div>

          {/* Divider line */}
          <div className="w-16 h-px bg-zinc-700" />

          {/* Role + description */}
          <div className="space-y-4 max-w-lg">
            <p className="font-body text-lg md:text-xl text-zinc-400 font-light tracking-wide">
              {aboutMe.role}
            </p>
            <p className="font-body text-sm md:text-base text-zinc-600 leading-relaxed">
              Crafting performant digital experiences with a focus on
              scalability and architectural clarity.
            </p>
          </div>

          {/* CTA Row */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 px-7 py-3.5 bg-zinc-100 text-zinc-950 font-display text-sm font-600 uppercase tracking-wider hover:bg-white transition-colors"
            >
              View Work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <div className="flex items-center gap-2">
              <a
                href={aboutMe.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center border border-zinc-800 text-zinc-500 hover:text-zinc-100 hover:border-zinc-600 transition-all"
                title="GitHub"
              >
                <Github className="w-[18px] h-[18px]" />
              </a>
              <a
                href={aboutMe.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 flex items-center justify-center border border-zinc-800 text-zinc-500 hover:text-zinc-100 hover:border-zinc-600 transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-[18px] h-[18px]" />
              </a>
              <a
                href={`mailto:${aboutMe.email}`}
                className="w-11 h-11 flex items-center justify-center border border-zinc-800 text-zinc-500 hover:text-zinc-100 hover:border-zinc-600 transition-all"
                title="Email"
              >
                <Mail className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: System Monitor — takes 2/5 */}
        <div className={`lg:col-span-2 relative h-[500px] lg:h-[650px] hidden lg:flex items-center justify-center transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <SystemMonitor />
        </div>

      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
        <span className="font-body text-[10px] uppercase tracking-[0.3em] text-zinc-600">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
