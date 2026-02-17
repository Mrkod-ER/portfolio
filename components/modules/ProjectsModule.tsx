'use client'

import React from 'react'
import { Github, ExternalLink, Code2, Smartphone, Cpu, Terminal, Package } from 'lucide-react'
import { projects, Project } from '@/data/profiles'
import { AsymmetricGrid, AsymmetricGridItem } from '@/components/ui/asymmetric-grid'
import { useInView } from '@/hooks/useInView'

const categoryIcons: Record<Project['category'], React.ReactNode> = {
  web: <Code2 className="w-5 h-5" />,
  mobile: <Smartphone className="w-5 h-5" />,
  ml: <Cpu className="w-5 h-5" />,
  tools: <Terminal className="w-5 h-5" />,
}

/** Asymmetric spans for gallery-like layout: wide, narrow, narrow, narrow, narrow, wide */
const PROJECT_SPANS: (4 | 5 | 6 | 7 | 8)[] = [8, 4, 4, 4, 4, 8]

export function ProjectsModule() {
  const { ref: headerRef, isInView: headerVisible } = useInView()

  return (
    <section className="w-full py-24" id="projects">
      <div className="space-y-12">
        <div
          ref={headerRef}
          className="border-b-4 border-black pb-4"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="text-6xl font-display font-bold uppercase tracking-tighter text-black">
            Selected Work
          </h2>
          <p className="text-black font-mono text-lg mt-4 max-w-xl bg-neo-yellow inline-block px-2 border-2 border-black shadow-hard-sm">
            / WEB / MOBILE / TOOLS
          </p>
        </div>

        <AsymmetricGrid>
          {projects.map((project, index) => (
            <AsymmetricGridItem key={project.id} span={PROJECT_SPANS[index % PROJECT_SPANS.length]}>
              <ProjectCard project={project} index={index} />
            </AsymmetricGridItem>
          ))}
        </AsymmetricGrid>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, isInView } = useInView({ threshold: 0.08 })
  const delay = index * 80

  return (
    <article
      ref={ref}
      className="h-full bg-white border-4 border-black p-6 shadow-hard transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none group relative overflow-hidden"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="inline-flex items-center gap-2 text-black text-sm font-mono font-bold uppercase border-2 border-black px-2 py-1 bg-neo-blue text-white">
            {categoryIcons[project.category]}
            {project.category}
          </span>
          <div className="flex items-center gap-2">
            {project.version && (
              <span className="text-xs font-mono font-bold uppercase text-black border-2 border-black px-1.5 py-0.5 bg-neo-white">
                v{project.version}
              </span>
            )}
            {project.featured && (
              <span className="text-xs font-mono font-bold uppercase text-black border-2 border-black px-2 py-0.5 bg-neo-pink">
                Featured
              </span>
            )}
          </div>
        </div>

        <h3 className="text-3xl font-display font-bold text-black uppercase mb-1">
          {project.name}
        </h3>

        {project.license && (
          <span className="text-xs font-mono text-zinc-600 block mb-3">
            License: {project.license}
          </span>
        )}

        <p className="text-black font-body text-base leading-relaxed mt-2 flex-1 border-t-2 border-black pt-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono font-bold text-black border-2 border-black px-2 py-1 bg-neo-white hover:bg-neo-yellow transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-6 pt-4 border-t-2 border-black">
          {project.npm && (
            <a
              href={project.npm}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-black hover:bg-black hover:text-neo-white px-2 py-1 transition-colors border-2 border-transparent hover:border-black"
            >
              <Package className="w-4 h-4" />
              NPM
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-black hover:bg-black hover:text-neo-white px-2 py-1 transition-colors border-2 border-transparent hover:border-black"
            >
              <Github className="w-4 h-4" />
              CODE
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-black hover:bg-black hover:text-neo-white px-2 py-1 transition-colors border-2 border-transparent hover:border-black"
            >
              <ExternalLink className="w-4 h-4" />
              DEMO
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
