'use client'

import { ModuleCard } from '@/components/ModuleCard'
import { projects } from '@/data/profiles'
import { Badge } from '@/components/ui/badge'
import { Github, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ProjectsModule() {
  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <ModuleCard
      id="projects"
      title="Featured Projects"
      size="large"
      icon="🚀"
    >
      <div className="space-y-4">
        {featuredProjects.map((project) => (
          <div
            key={project.id}
            className="space-y-3 border border-black dark:border-white/30 p-4 transition-all duration-200 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <h4 className="text-base font-semibold tracking-tight text-foreground">{project.name}</h4>
                <Badge variant="default" className="text-xs">Featured</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              {project.github && (
                <Button variant="outline" size="sm" asChild className="flex-1 h-8 bg-transparent transition-all duration-200 hover:scale-[1.02]">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <Github size={14} />
                    Code
                  </a>
                </Button>
              )}
              {project.liveDemo && (
                <Button size="sm" asChild className="flex-1 h-8 transition-all duration-200 hover:scale-[1.02]">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <ExternalLink size={14} />
                    Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </ModuleCard>
  )
}


