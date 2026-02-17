'use client'

import { useEffect, useState, useRef } from 'react'
import { aboutMe } from '@/data/profiles'
import { Github, Linkedin, Mail, ArrowRight, Terminal } from 'lucide-react'

const BOOT_LOGS = [
  'INITIALIZING SYSTEM...',
  'LOADING KERNEL MODULES...',
  'MOUNTING FILE SYSTEMS...',
  'STARTING NETWORK SERVICES...',
  'ESTABLISHING SECURE CONNECTION...',
  'USER: ABHISHEK DETECTED',
  'LOADING PROFILE CONFIG...',
  'SYSTEM READY.'
]

export function HeroSection() {
  const [bootSequence, setBootSequence] = useState(true)
  const [logs, setLogs] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)
  const [showContent, setShowContent] = useState(false)

  // Boot Sequence Effect
  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[currentIndex]])
        currentIndex++
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setBootSequence(false)
          setTimeout(() => setShowContent(true), 100)
        }, 800)
      }
    }, 150)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (bootSequence) {
    return (
      <div className="fixed inset-0 z-50 bg-black text-neo-green font-mono p-8 flex flex-col justify-end pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        <div className="scanline absolute inset-0 pointer-events-none opacity-10"></div>

        <div className="max-w-2xl w-full mx-auto space-y-2">
          {logs.map((log, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-neo-pink">{'>'}</span>
              <span className="typing-effect">{log}</span>
            </div>
          ))}
          <div className="flex items-center gap-3 animate-pulse">
            <span className="text-neo-pink">{'>'}</span>
            <span className="w-3 h-5 bg-neo-green"></span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden bg-neo-white border-b-4 border-black">

      {/* Top Marquee Bar */}
      <div className="absolute top-0 left-0 right-0 bg-neo-yellow border-b-4 border-black py-2 overflow-hidden z-20">
        <div className="whitespace-nowrap animate-marquee flex gap-8 items-center">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-sm font-mono font-bold uppercase text-black flex items-center gap-4">
              <span>System Status: Online</span>
              <span className="w-2 h-2 bg-black"></span>
              <span>Available for Hire</span>
              <span className="w-2 h-2 bg-black"></span>
              <span>Deploying Projects</span>
              <span className="w-2 h-2 bg-black"></span>
            </span>
          ))}
        </div>
      </div>

      {/* Absolute Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-8 md:left-24 top-0 bottom-0 w-0.5 bg-black/10"></div>
        <div className="absolute right-8 md:right-24 top-0 bottom-0 w-0.5 bg-black/10"></div>
        <div className="absolute top-32 left-0 right-0 h-0.5 bg-black/10"></div>
        <div className="absolute bottom-32 left-0 right-0 h-0.5 bg-black/10"></div>
      </div>

      <div className={`relative z-10 w-full max-w-7xl px-6 md:px-12 pt-20 flex flex-col items-center justify-center text-center transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

        {/* Role Badge */}
        <div className="mb-8 rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
          <span className="bg-neo-pink text-black border-2 border-black px-4 py-1.5 font-mono font-bold text-sm md:text-base shadow-hard uppercase tracking-widest">
            {aboutMe.role}
          </span>
        </div>

        {/* Glitch Name */}
        <div className="relative mb-8 glitch-wrapper">
          <h1
            className="font-display text-[12vw] md:text-[8rem] lg:text-[10rem] font-black leading-[0.8] tracking-tighter text-black uppercase glitch"
            data-text="ABHISHEK SINGH"
          >
            ABHISHEK SINGH
          </h1>
        </div>

        {/* Description Card */}
        <div className="max-w-2xl bg-white border-2 border-black p-6 md:p-8 shadow-hard mb-10 text-left relative group hover:-translate-y-1 hover:shadow-hard-lg transition-all">
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-neo-blue border-2 border-black"></div>
          <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-neo-yellow border-2 border-black"></div>

          <div className="flex items-center gap-2 mb-4 border-b-2 border-black pb-2">
            <Terminal size={18} />
            <span className="font-mono text-xs font-bold uppercase">Mission Log</span>
          </div>
          <p className="font-body text-lg md:text-xl text-black leading-relaxed">
            Crafting high-performance digital architectures with <span className="bg-neo-green px-1 font-bold">raw power</span> and precision.
            Building scalable systems for the modern web.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
          <a
            href="#projects"
            className="w-full md:w-auto px-8 py-4 bg-black text-neo-white border-2 border-black font-mono text-lg font-bold uppercase tracking-wider shadow-hard hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-neo-yellow hover:text-black transition-all flex items-center justify-center gap-2 group"
          >
            Initialize Work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <div className="flex gap-4">
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
                className="w-14 h-14 flex items-center justify-center border-2 border-black bg-white text-black hover:bg-neo-blue hover:text-white hover:shadow-hard shadow-hard-sm transition-all"
                title={label}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-0 right-0 flex justify-center transition-all duration-1000 delay-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black">Scroll_Down</span>
          <div className="w-[3px] h-8 bg-black animate-bounce" />
        </div>
      </div>

    </section>
  )
}
