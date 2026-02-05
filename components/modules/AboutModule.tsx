'use client'; 
import Link from 'next/link'
import { ModuleCard } from '@/components/ModuleCard'
import { aboutMe } from '@/data/profiles'
import { Github, Linkedin, Mail, MapPin, Twitter, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AboutModule() {
  const socialLinks = [
    {
      icon: Github,
      href: aboutMe.github,
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: aboutMe.linkedin,
      label: 'LinkedIn',
    },
    {
      icon: Twitter,
      href: aboutMe.twitter,
      label: 'Twitter',
    },
  ]

  const expandedContent = (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 font-semibold text-foreground">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {aboutMe.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        <p>{aboutMe.bio}</p>
      </div>
    </div>
  )

  return (
    <ModuleCard
      id="about"
      title={aboutMe.name}
      size="large"
      icon="👨‍💻"
      expandedContent={expandedContent}
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-primary">{aboutMe.role}</p>
          <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin size={16} />
            {aboutMe.location}
          </div>
        </div>

        <p className="line-clamp-3 text-sm text-muted-foreground">{aboutMe.bio}</p>

        <div className="flex gap-2">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <Button
              key={label}
              variant="outline"
              size="sm"
              asChild
              className="h-8 w-8 p-0 bg-transparent"
            >
              <a href={href} target="_blank" rel="noopener noreferrer" title={label}>
                <Icon size={16} />
              </a>
            </Button>
          ))}
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className="h-8 px-3 bg-transparent"
          >
            <a href={`mailto:${aboutMe.email}`}>Email</a>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
          <div className="rounded bg-muted p-2">
            <p className="text-muted-foreground">Contests</p>
            <p className="font-semibold text-foreground">45+</p>
          </div>
          <div className="rounded bg-muted p-2">
            <p className="text-muted-foreground">Problems Solved</p>
            <p className="font-semibold text-foreground">1K+</p>
          </div>
        </div>

        <Link href="/about" className="group block">
          <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
            <span>View Full Profile</span>
            <ChevronRight size={14} />
          </div>
        </Link>
      </div>
    </ModuleCard>
  )
}
