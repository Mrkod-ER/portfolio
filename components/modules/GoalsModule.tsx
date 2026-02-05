'use client'

import Link from 'next/link'
import { ModuleCard } from '@/components/ModuleCard'
import { goals } from '@/data/profiles'
import { ChevronRight } from 'lucide-react'

export function GoalsModule() {
  const expandedContent = (
    <div className="space-y-3">
      {goals.items.map((item, idx) => (
        <div key={idx} className="space-y-2 rounded-lg border border-border p-3">
          <div className="flex items-start gap-3">
            <span className="text-lg">{item.icon}</span>
            <div>
              <h4 className="font-semibold text-foreground">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <ModuleCard
      id="goals"
      title={goals.title}
      size="medium"
      icon="🎯"
      expandedContent={expandedContent}
    >
      <Link href="/goals" className="group block">
        <div className="space-y-2">
          {goals.items.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{item.title}</p>
                <p className="line-clamp-1 text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
          <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            <span>View All Goals</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </Link>
    </ModuleCard>
  )
}
