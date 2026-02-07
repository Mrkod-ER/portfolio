'use client'

import { ModuleCard } from '@/components/ModuleCard'
import { goals } from '@/data/profiles'

export function GoalsModule() {
  return (
    <ModuleCard
      id="goals"
      title={goals.title}
      size="medium"
      icon="🎯"
    >
      <div className="space-y-3">
        {goals.items.slice(0, 3).map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3 border border-black dark:border-white/30 transition-all duration-200 hover:shadow-md"
          >
            <span className="text-xl">{item.icon}</span>
            <div className="flex-1">
              <p className="text-base font-semibold tracking-tight text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ModuleCard>
  )
}


