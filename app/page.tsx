'use client'

import React from "react"

import { BentoGrid } from '@/components/BentoGrid'
import { AboutModule } from '@/components/modules/AboutModule'
import { GoalsModule } from '@/components/modules/GoalsModule'
import { CodingProfileModule } from '@/components/modules/CodingProfileModule'
import { ProjectsModule } from '@/components/modules/ProjectsModule'
import { ThemeToggle } from '@/components/ThemeToggle'
import { getEnabledModules } from '@/config/modules'
import {
  codeforces,
  codechef,
  geeksforgeeks,
  leetcode,
} from '@/data/profiles'

export default function Home() {
  const enabledModules = getEnabledModules()

  // Map module IDs to their components
  const moduleComponents: Record<string, React.ReactNode> = {
    about: <AboutModule key="about" />,
    goals: <GoalsModule key="goals" />,
    codeforces: <CodingProfileModule key="codeforces" profile={codeforces} icon="⚡" />,
    leetcode: <CodingProfileModule key="leetcode" profile={leetcode} icon="💻" />,
    codechef: <CodingProfileModule key="codechef" profile={codechef} icon="🍲" />,
    geeksforgeeks: (
      <CodingProfileModule key="geeksforgeeks" profile={geeksforgeeks} icon="👨‍🎓" />
    ),
    projects: <ProjectsModule key="projects" />,
  }

  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Developer Portfolio</h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Modular. Scalable. Elegant.
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <BentoGrid>
          {enabledModules.map((module) => moduleComponents[module.id])}
        </BentoGrid>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card py-8 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            Built with Next.js, Tailwind CSS & shadcn/ui
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            © 2026. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
