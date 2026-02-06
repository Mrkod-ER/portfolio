'use client'

import React from "react"

import { MasonryGrid } from '@/components/ui/masonry-grid'
import { AboutModule } from '@/components/modules/AboutModule'
import { GoalsModule } from '@/components/modules/GoalsModule'
import { CodingProfileModule } from '@/components/modules/CodingProfileModule'
import { ProjectsModule } from '@/components/modules/ProjectsModule'
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
    <div className="w-full">
      <MasonryGrid>
        {enabledModules.map((module) => moduleComponents[module.id])}
      </MasonryGrid>
    </div>
  )
}
