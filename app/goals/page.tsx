'use client'

import { useRouter } from 'next/navigation'
import { goals } from '@/data/profiles'
import { Button } from '@/components/ui/button'
import { LikeButton } from '@/components/LikeButton'
import { ArrowLeft, CheckCircle2, Zap } from 'lucide-react'

export default function GoalsPage() {
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
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-foreground mb-2">{goals.title}</h1>
              <p className="text-lg text-muted-foreground">
                Exploring ambitions and driving personal growth through deliberate action and continuous learning.
              </p>
            </div>
            <LikeButton id="goals" />
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {goals.items.map((goal, index) => (
            <div
              key={index}
              className="group rounded-lg border border-border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{goal.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {goal.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {goal.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <CheckCircle2 size={14} />
                    <span>In Progress</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Vision Section */}
        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={24} className="text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Long-term Vision</h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              My vision is to become a versatile developer who can architect scalable systems,
              mentor junior developers, and contribute meaningfully to the open-source community.
              I believe in lifelong learning and staying curious about emerging technologies.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By focusing on these core goals, I aim to create a positive impact in the tech industry
              while continuously improving my skills and pushing the boundaries of what's possible
              with modern web technologies.
            </p>
          </div>
        </div>

        {/* Milestones */}
        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">Key Milestones</h2>
          <div className="space-y-4">
            {[
              { year: '2024', milestone: 'Contribute to 5+ high-impact open-source projects' },
              { year: '2025', milestone: 'Design and ship a system handling 1M+ daily active users' },
              { year: '2026', milestone: 'Mentor 10+ junior developers and establish technical leadership' },
              { year: '2027', milestone: 'Speak at major tech conferences and share knowledge with community' },
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center mb-2">
                    ✓
                  </div>
                  {index < 3 && <div className="w-1 h-12 bg-primary/20" />}
                </div>
                <div className="pb-4">
                  <p className="text-xs font-semibold text-primary uppercase">{item.year}</p>
                  <p className="text-foreground mt-1">{item.milestone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
