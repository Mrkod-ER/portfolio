import React from "react"

import { MasonryGrid } from '@/components/ui/masonry-grid'
import { AboutModule } from '@/components/modules/AboutModule'
import { GoalsModule } from '@/components/modules/GoalsModule'
import { ProfileStatsModule } from '@/components/modules/ProfileStatsModule'
import { ProjectsModule } from '@/components/modules/ProjectsModule'

import { HeroSection } from '@/components/HeroSection'
import { Footer } from '@/components/Footer'
import { getCombinedStats } from '@/lib/actions/stats'

export const revalidate = 43200 // 12 hours

export default async function Home() {
  const stats = await getCombinedStats()

  return (
    <div className="w-full">
      <HeroSection />

      {/* Main Content - Masonry Grid */}
      <section className="px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <MasonryGrid>
            <AboutModule liveStats={stats} />
            <ProfileStatsModule liveStats={stats} />

            <ProjectsModule />
          </MasonryGrid>
        </div>
      </section>

      {/* Goals Section - Full Width Horizontal */}
      <section className="px-4 md:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <GoalsModule />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
