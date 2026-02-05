'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ModuleCard } from '@/components/ModuleCard'
import { projects } from '@/data/profiles'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Github, ChevronRight } from 'lucide-react'

export function ProjectsModule() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))),
    [],
  )

  const filteredProjects = useMemo(() => {
    if (!selectedCategory) return projects
    return projects.filter((p) => p.category === selectedCategory)
  }, [selectedCategory])

  const expandedContent = (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase text-muted-foreground">Filter</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="capitalize"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredProjects.map((project) => (
          <Link key={project.id} href={`/project/${project.id}`}>
            <div className="group space-y-2 rounded-lg border border-border p-3 transition-all hover:border-primary/50 hover:bg-muted/50 cursor-pointer">
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2 flex-1">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h4>
                    {project.featured && (
                      <Badge variant="default" className="text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <ChevronRight size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <p className="text-xs text-muted-foreground">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {project.techStack.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                {project.github && (
                  <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent" onClick={(e) => e.stopPropagation()}>
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
                  <Button size="sm" asChild className="flex-1" onClick={(e) => e.stopPropagation()}>
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
          </Link>
        ))}
      </div>
    </div>
  )

  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <ModuleCard
      id="projects"
      title="Featured Projects"
      size="large"
      icon="🚀"
      expandedContent={expandedContent}
    >
      <div className="space-y-3">
        {featuredProjects.map((project) => (
          <Link key={project.id} href={`/project/${project.id}`}>
            <div className="group space-y-2 rounded-lg border border-border p-2 transition-all hover:border-primary/50 hover:bg-muted/30 cursor-pointer">
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{project.name}</h4>
                <ChevronRight size={12} className="text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-0.5" />
              </div>
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.techStack.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </ModuleCard>
  )
}
