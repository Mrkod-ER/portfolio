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
    <section className="relative w-full py-20 px-4 md:px-8 border-b-4 border-black bg-neo-white" id="about">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Section Header */}
        <div
          ref={headerRef}
          className="space-y-4 border-b-4 border-black pb-6"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="font-display text-5xl font-bold uppercase tracking-tighter text-black">
            About Me
          </h2>
          <p className="text-black font-mono text-lg max-w-2xl bg-neo-yellow inline-block px-2 border-2 border-black shadow-hard-sm">
            Building digital experiences with performance and raw power.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">

          {/* Bio Card - Large */}
          <AnimatedCard delay={100} className="md:col-span-2 row-span-2 border-4 border-black bg-white p-8 flex flex-col justify-between shadow-hard hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-300">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-neo-blue border-2 border-black text-white mb-2 shadow-hard-sm">
                <Terminal className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-display font-bold uppercase text-black">
                  Hello, I'm {aboutMe.name}
                </h3>
                <div className="space-y-4 text-black font-body text-lg leading-relaxed">
                  <p>{aboutMe.bio}</p>
                  <p className="font-bold bg-neo-pink inline px-1">
                    Performance, Scalability, UX.
                  </p>
                  <p>
                    Writing code that is functional, maintainable, and scalable. Exploring new tech and solving CP problems.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* Location Card */}
          <AnimatedCard delay={200} className="border-4 border-black bg-neo-yellow p-6 flex flex-col justify-center items-center gap-4 shadow-hard hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center text-black shadow-hard-sm">
              <MapPin className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-black font-mono font-bold text-lg uppercase">Based in</h4>
              <p className="text-black font-bold text-xl">{aboutMe.location}</p>
            </div>
          </AnimatedCard>

          {/* Stack Card */}
          <AnimatedCard delay={300} className="md:col-span-1 md:row-span-2 border-4 border-black bg-white p-6 flex flex-col gap-6 shadow-hard hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-300">
            <div className="flex items-center gap-3 border-b-2 border-black pb-2">
              <div className="p-2 bg-neo-green border-2 border-black text-black shadow-hard-sm">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold uppercase text-black">Tech Stack</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {aboutMe.skills.map((skill) => (
                <div
                  key={skill}
                  className="bg-neo-white border-2 border-black px-3 py-2 text-sm font-mono font-bold text-black text-center hover:bg-neo-yellow transition-colors cursor-default shadow-hard-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  {skill}
                </div>
              ))}
            </div>
          </AnimatedCard>

          {/* Connect Card */}
          <AnimatedCard delay={400} className="border-4 border-black bg-neo-blue p-6 flex flex-col justify-between shadow-hard hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white border-2 border-black text-black shadow-hard-sm">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-display font-bold uppercase text-white">Connect</h3>
            </div>

            <div className="flex gap-4 justify-around mt-auto">
              <a href={aboutMe.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white border-2 border-black text-black hover:bg-neo-yellow hover:shadow-hard-sm transition-all shadow-hard">
                <Github className="w-6 h-6" />
              </a>
              <a href={aboutMe.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white border-2 border-black text-black hover:bg-neo-yellow hover:shadow-hard-sm transition-all shadow-hard">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href={`mailto:${aboutMe.email}`} className="p-3 bg-white border-2 border-black text-black hover:bg-neo-yellow hover:shadow-hard-sm transition-all shadow-hard">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </AnimatedCard>

        </div>
      </div>
    </section>
  )
}
