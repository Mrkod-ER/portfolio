'use client';
import { ModuleCard } from '@/components/ModuleCard'
import { aboutMe } from '@/data/profiles'
import { Github, Linkedin, Mail, MapPin, Twitter } from 'lucide-react'
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

  return (
    <ModuleCard
      id="about"
      title={aboutMe.name}
      size="large"
      icon="👨‍💻"
    >
      <div className="space-y-5">
        <div>
          <p className="text-base font-medium text-primary">{aboutMe.role}</p>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin size={16} />
            {aboutMe.location}
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{aboutMe.bio}</p>

        <div className="flex gap-2">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <Button
              key={label}
              variant="outline"
              size="sm"
              asChild
              className="h-9 w-9 p-0 bg-transparent transition-all duration-200 hover:scale-110"
            >
              <a href={href} target="_blank" rel="noopener noreferrer" title={label}>
                <Icon size={18} />
              </a>
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            asChild
            className="h-9 px-4 bg-transparent transition-all duration-200 hover:scale-[1.02]"
          >
            <a href={`mailto:${aboutMe.email}`}>Email</a>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="border border-black dark:border-white/30 p-3 text-center transition-all duration-200 hover:shadow-md">
            <p className="text-2xl font-bold tracking-tight text-foreground">45+</p>
            <p className="text-xs text-muted-foreground mt-1">Contests</p>
          </div>
          <div className="border border-black dark:border-white/30 p-3 text-center transition-all duration-200 hover:shadow-md">
            <p className="text-2xl font-bold tracking-tight text-foreground">1K+</p>
            <p className="text-xs text-muted-foreground mt-1">Problems Solved</p>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h4 className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {aboutMe.skills.slice(0, 6).map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-105"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ModuleCard>
  )
}


