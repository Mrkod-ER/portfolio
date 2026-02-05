'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LikeButton } from '@/components/LikeButton'
import { aboutMe } from '@/data/profiles'
import { ArrowLeft, Mail, Github, Linkedin, Twitter, MapPin, Briefcase } from 'lucide-react'

export default function AboutPage() {
  const router = useRouter()

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
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{aboutMe.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase size={16} className="text-primary" />
                <p className="text-lg text-primary font-semibold">{aboutMe.role}</p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} />
                <p>{aboutMe.location}</p>
              </div>
            </div>
            <LikeButton id="about" />
          </div>

          {/* Bio */}
          <p className="mb-6 text-base text-muted-foreground leading-relaxed">
            {aboutMe.bio}
          </p>

          {/* Contact Links */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button asChild variant="outline" className="gap-2 justify-center bg-transparent">
              <a href={`mailto:${aboutMe.email}`}>
                <Mail size={16} />
                Email
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2 justify-center bg-transparent">
              <a href={aboutMe.github} target="_blank" rel="noopener noreferrer">
                <Github size={16} />
                GitHub
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2 justify-center bg-transparent">
              <a href={aboutMe.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin size={16} />
                LinkedIn
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2 justify-center bg-transparent">
              <a href={aboutMe.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter size={16} />
                Twitter
              </a>
            </Button>
          </div>
        </div>

        {/* Skills */}
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Skills & Expertise</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {aboutMe.skills.map((skill) => (
              <div key={skill} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Career Highlights</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Full Stack Development</h3>
              <p className="text-sm text-muted-foreground">
                Experienced in building end-to-end applications using modern web technologies.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Problem Solving</h3>
              <p className="text-sm text-muted-foreground">
                Strong foundation in data structures and algorithms with proven track record on competitive programming platforms.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Collaborative Mindset</h3>
              <p className="text-sm text-muted-foreground">
                Passionate about open-source contributions and helping the developer community grow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
