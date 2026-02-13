'use client'

import React from 'react'
import { Github, ExternalLink, Code2, Smartphone, Cpu, Terminal } from 'lucide-react'
import { projects, Project } from '@/data/profiles'
import { AsymmetricGrid, AsymmetricGridItem } from '@/components/ui/asymmetric-grid'
import { useInView } from '@/hooks/useInView'

const categoryIcons: Record<Project['category'], React.ReactNode> = {
  web: <Code2 className="w-4 h-4" />,
  mobile: <Smartphone className="w-4 h-4" />,
  ml: <Cpu className="w-4 h-4" />,
  tools: <Terminal className="w-4 h-4" />,
}

/** Asymmetric spans for gallery-like layout: wide, narrow, narrow, narrow, narrow, wide */
const PROJECT_SPANS: (4 | 5 | 6 | 7 | 8)[] = [8, 4, 4, 4, 4, 8]

export function ProjectsModule() {
  const { ref: headerRef, isInView: headerVisible } = useInView()

  return (
    <section className="w-full py-16 md:py-24" id="projects">
      <div className="space-y-10">
        <div
          ref={headerRef}
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Projects
          </h2>
          <p className="text-zinc-500 text-sm mt-2 max-w-xl">
            Selected work — web, mobile, and tools.
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
      className="h-full border border-zinc-800 bg-zinc-900/50 p-5 md:p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80 group relative overflow-hidden"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {/* Hover accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="inline-flex items-center gap-1.5 text-zinc-500 text-xs font-medium uppercase tracking-wider">
            {categoryIcons[project.category]}
            {project.category}
          </span>
          {project.featured && (
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 border border-zinc-700 px-2 py-0.5">
              Featured
            </span>
          )}
        </div>
        <h3 className="text-lg font-medium text-zinc-100 group-hover:text-zinc-50 transition-colors">
          {project.name}
        </h3>
        <p className="text-zinc-500 text-sm leading-relaxed mt-2 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs text-zinc-600 border border-zinc-700/50 px-2 py-1"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3 mt-5 pt-4 border-t border-zinc-800">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              Code
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
