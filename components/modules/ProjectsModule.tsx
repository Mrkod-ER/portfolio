'use client'

import { ModuleCard } from '@/components/ModuleCard'
import { projects } from '@/data/profiles'
import { Badge } from '@/components/ui/badge'
import { Github, ExternalLink, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const categoryColors = {
  web: 'from-blue-500/10 to-cyan-500/10',
  mobile: 'from-purple-500/10 to-pink-500/10',
  ml: 'from-green-500/10 to-emerald-500/10',
  tools: 'from-orange-500/10 to-amber-500/10',
}

const categoryIcons = {
  web: '🌐',
  mobile: '📱',
  ml: '🤖',
  tools: '🛠️',
}

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
        {featuredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="group relative overflow-hidden border border-black dark:border-white/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* Gradient background based on category */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${categoryColors[project.category]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            <div className="relative p-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{categoryIcons[project.category]}</span>
                  <div>
                    <h4 className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                      {project.name}
                    </h4>
                    <span className="text-xs text-muted-foreground capitalize">{project.category}</span>
                  </div>
                </div>
                {project.featured && (
                  <Badge className="gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-xs">
                    <Sparkles size={10} />
                    Featured
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-medium border border-black/20 dark:border-white/20 bg-background/50 text-foreground transition-all duration-200 hover:bg-foreground hover:text-background"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {project.github && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 h-9 gap-2 bg-transparent transition-all duration-200 hover:bg-foreground hover:text-background hover:scale-[1.02]"
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={14} />
                      View Code
                    </a>
                  </Button>
                )}
                {project.liveDemo && (
                  <Button
                    size="sm"
                    asChild
                    className="flex-1 h-9 gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 transition-all duration-200 hover:scale-[1.02]"
                  >
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* View All Projects hint */}
        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground">
            More projects coming soon...
          </p>
        </div>
      </div>
    </ModuleCard>
  )
}
