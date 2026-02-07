'use client';
import { ModuleCard } from '@/components/ModuleCard'
import { aboutMe } from '@/data/profiles'
import { Github, Linkedin, Mail, MapPin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { PlatformStats } from '@/lib/actions/stats'

interface AboutModuleProps {
  liveStats?: PlatformStats | null
}

export function AboutModule({ liveStats }: AboutModuleProps) {
  // Calculate totals from live stats
  let totalProblems = 0
  let totalContests = 0

  if (liveStats) {
    // Codeforces
    const cf = liveStats.codeforces
    if (cf?.success && cf.data) {
      const data = cf.data as any
      totalProblems += data.solved ?? 0
      totalContests += data.contestsCount ?? 0
    }
    // LeetCode
    const lc = liveStats.leetcode
    if (lc?.success && lc.data) {
      const data = lc.data as any
      totalProblems += data.solved?.total ?? 0
      totalContests += data.contestsAttended ?? 0
    }
    // CodeChef
    const cc = liveStats.codechef
    if (cc?.success && cc.data) {
      const data = cc.data as any
      totalProblems += data.solved ?? 0
      totalContests += data.contests ?? 0
    }
    // GfG
    const gfg = liveStats.gfg
    if (gfg?.success && gfg.data) {
      const data = gfg.data as any
      totalProblems += data.solved?.total ?? 0
    }
  }

  const hasLiveData = totalProblems > 0 || totalContests > 0

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
        {/* Role & Location */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {aboutMe.role}
          </p>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin size={14} />
            {aboutMe.location}
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-3">
          {aboutMe.bio}
        </p>

        {/* Stats Grid - Now with live data */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative overflow-hidden border border-black dark:border-white/30 p-4 text-center group hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-3xl font-bold tracking-tight text-foreground">
              {hasLiveData ? totalProblems.toLocaleString() : '900'}+
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-medium">Problems Solved</p>
            {hasLiveData && (
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            )}
          </div>
          <div className="relative overflow-hidden border border-black dark:border-white/30 p-4 text-center group hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-3xl font-bold tracking-tight text-foreground">
              {hasLiveData ? totalContests : '60'}+
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-medium">Contests</p>
            {hasLiveData && (
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            )}
          </div>
        </div>

        {/* Social Links - Improved */}
        <div className="flex flex-wrap gap-2">
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <Button
              key={label}
              variant="outline"
              size="sm"
              asChild
              className="h-9 px-3 gap-2 bg-transparent transition-all duration-200 hover:scale-105 hover:bg-foreground hover:text-background"
            >
              <a href={href} target="_blank" rel="noopener noreferrer" title={label}>
                <Icon size={16} />
                <span className="text-xs">{label}</span>
              </a>
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            asChild
            className="h-9 px-3 gap-2 bg-transparent transition-all duration-200 hover:scale-105 hover:bg-foreground hover:text-background"
          >
            <a href={`mailto:${aboutMe.email}`}>
              <Mail size={16} />
              <span className="text-xs">Email</span>
            </a>
          </Button>
        </div>

        {/* Skills - Enhanced */}
        <div>
          <h4 className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {aboutMe.skills.map((skill, index) => (
              <span
                key={skill}
                className="border border-black dark:border-white/20 px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-300 hover:bg-foreground hover:text-background hover:scale-105"
                style={{ animationDelay: `${index * 50}ms` }}
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
