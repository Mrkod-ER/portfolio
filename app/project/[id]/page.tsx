'use client'

import { useParams, useRouter } from 'next/navigation'
import { projects } from '@/data/profiles'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LikeButton } from '@/components/LikeButton'
import { ArrowLeft, Github, ExternalLink, Calendar } from 'lucide-react'

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const project = projects.find((p) => p.id === projectId)

  if (!project) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist.
            </p>
            <Button onClick={() => router.push('/')}>Return to Home</Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>

        {/* Header */}
        <div className="mb-8 rounded-lg border border-border bg-card p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
                {project.featured && (
                  <Badge className="capitalize">Featured</Badge>
                )}
              </div>
              <p className="text-lg text-muted-foreground">{project.description}</p>
            </div>
            <LikeButton id={`project-${project.id}`} />
          </div>

          {/* Category */}
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
              Category
            </p>
            <Badge variant="outline" className="capitalize">
              {project.category}
            </Badge>
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase text-muted-foreground mb-3">
              Technology Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-4">
            {project.github && (
              <Button asChild className="flex-1 sm:flex-none gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                  View Code
                </a>
              </Button>
            )}
            {project.liveDemo && (
              <Button asChild variant="outline" className="flex-1 sm:flex-none gap-2 bg-transparent">
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-muted-foreground" />
              <p className="text-xs font-semibold uppercase text-muted-foreground">
                Project Type
              </p>
            </div>
            <p className="text-foreground capitalize">{project.category}</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
              Languages & Tools
            </p>
            <p className="text-sm text-foreground">
              {project.techStack.join(', ')}
            </p>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">About This Project</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              {project.description}
            </p>
            <p>
              This project showcases modern development practices and cutting-edge technologies.
              It demonstrates proficiency in {project.techStack.slice(0, 2).join(' and ')},
              along with strong problem-solving skills and attention to detail.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
