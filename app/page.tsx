import React from "react"
import { AboutModule } from '@/components/modules/AboutModule'
import { CompetitiveProgrammingModule } from '@/components/modules/CompetitiveProgrammingModule'
import { ProjectsModule } from '@/components/modules/ProjectsModule'

import { HeroSection } from '@/components/HeroSection'
import { Footer } from '@/components/Footer'
import { getCombinedStats } from '@/lib/actions/stats'

export const revalidate = 43200 // 12 hours

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="h-1 w-full max-w-xs bg-black" />
    </div>
  )
}

export default async function Home() {
  const stats = await getCombinedStats()

  return (
    <div className="w-full">
      <HeroSection />

      {/* Main Content */}
      <section className="px-4 md:px-6 lg:px-8 py-8" id="about">
        <div className="max-w-7xl mx-auto space-y-4">

          {/* About Me Section */}
          <div className="w-full">
            <AboutModule liveStats={stats} />
          </div>

          <SectionDivider />

          {/* Competitive Programming Section - Full Width */}
          <div id="competitive-programming">
            <CompetitiveProgrammingModule stats={stats} />
          </div>

          <SectionDivider />

          {/* Projects Section - Asymmetric Masonry Grid */}
          <div className="w-full">
            <ProjectsModule />
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
