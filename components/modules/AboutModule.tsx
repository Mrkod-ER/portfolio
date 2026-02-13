"use client"

import React from 'react'
import { MapPin, Mail, Github, Linkedin, Code2, Terminal, Cpu, Globe } from 'lucide-react'
import { aboutMe } from '@/data/profiles'
import { useInView } from '@/hooks/useInView'

interface AboutModuleProps {
  liveStats?: unknown
}

function AnimatedCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isInView } = useInView({ threshold: 0.08 })

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export function AboutModule({ liveStats: _liveStats }: AboutModuleProps) {
  const { ref: headerRef, isInView: headerVisible } = useInView()

  return (
    <section className="relative w-full py-20 px-4 md:px-8" id="about">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Section Header */}
        <div
          ref={headerRef}
          className="space-y-2"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="font-display text-3xl font-bold text-zinc-100 sm:text-4xl">
            About Me
          </h2>
          <p className="text-zinc-500 max-w-2xl text-lg">
            Building digital experiences with a focus on performance and architectural elegance.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">

          {/* Bio Card - Large */}
          <AnimatedCard delay={100} className="md:col-span-2 row-span-2 border border-zinc-800 bg-zinc-950/40 p-6 md:p-8 flex flex-col justify-between hover:border-zinc-700 hover:bg-zinc-950/70 transition-colors group">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-800/80 text-zinc-100 mb-2 group-hover:bg-zinc-800 transition-colors">
                <Terminal className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-zinc-100">
                  Hello, I'm {aboutMe.name}
                </h3>
                <div className="space-y-4 text-zinc-500 leading-relaxed text-base md:text-lg">
                  <p>{aboutMe.bio}</p>
                  <p>
                    I specialize in building robust web applications and solving algorithmic challenges.
                    My focus is on performance, scalability, and user experience.
                  </p>
                  <p>
                    I believe in writing code that is not only functional but also maintainable and
                    scalable. When I'm not coding, I'm exploring new technologies or solving competitive
                    programming problems.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Location Card */}
          <AnimatedCard delay={200} className="border border-zinc-800 bg-zinc-950/40 p-6 flex flex-col justify-center items-center gap-4 hover:border-zinc-700 hover:bg-zinc-950/70 transition-colors group text-center">
            <div className="w-16 h-16 bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-zinc-100 font-medium text-lg">Based in</h4>
              <p className="text-zinc-500">{aboutMe.location}</p>
            </div>
          </AnimatedCard>

          {/* Stack Card */}
          <AnimatedCard delay={300} className="md:col-span-1 md:row-span-2 border border-zinc-800 bg-zinc-950/40 p-6 flex flex-col gap-6 hover:border-zinc-700 hover:bg-zinc-950/70 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-100">Tech Stack</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {aboutMe.skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-zinc-800/40 border border-zinc-700/30 px-3 py-2 text-sm text-zinc-400 text-center hover:bg-zinc-800/80 hover:text-zinc-100 transition-colors cursor-default"
                >
                  {skill}
                </div>
              ))}
            </div>
          </AnimatedCard>

          {/* Connect Card */}
          <AnimatedCard delay={400} className="border border-zinc-800 bg-zinc-950/40 p-6 flex flex-col justify-between hover:border-zinc-700 hover:bg-zinc-950/70 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-violet-500/10 text-violet-400">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-100">Connect</h3>
            </div>

            <div className="flex gap-4 justify-around mt-auto">
              <a href={aboutMe.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-800/50 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 transition-all">
                <Github className="w-6 h-6" />
              </a>
              <a href={aboutMe.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-zinc-800/50 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 transition-all">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href={`mailto:${aboutMe.email}`} className="p-3 bg-zinc-800/50 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 transition-all">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </AnimatedCard>

        </div>
      </div>
    </section>
  )
}
