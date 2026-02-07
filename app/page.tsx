import React from "react"

import { MasonryGrid } from '@/components/ui/masonry-grid'
import { AboutModule } from '@/components/modules/AboutModule'
import { GoalsModule } from '@/components/modules/GoalsModule'
import { ProfileStatsModule } from '@/components/modules/ProfileStatsModule'
import { ProjectsModule } from '@/components/modules/ProjectsModule'
import { HeroSection } from '@/components/HeroSection'
import { getEnabledModules } from '@/config/modules'
import { getCombinedStats } from '@/lib/actions/stats'

export const revalidate = 43200 // 12 hours

export default async function Home() {
  const enabledModules = getEnabledModules()
  const stats = await getCombinedStats()

  // Map module IDs to their components
  const moduleComponents: Record<string, React.ReactNode> = {
    about: <AboutModule key="about" />,
    'profile-stats': <ProfileStatsModule key="profile-stats" liveStats={stats} />,
    projects: <ProjectsModule key="projects" />,
    goals: <GoalsModule key="goals" />,
  }

  return (
    <div className="w-full">
      <HeroSection />
      <MasonryGrid>
        {enabledModules.map((module) => moduleComponents[module.id])}
      </MasonryGrid>
    </div>
  )
}

