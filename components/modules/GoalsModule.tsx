'use client'

import { ModuleCard } from '@/components/ModuleCard'
import { goals } from '@/data/profiles'

export function GoalsModule() {
  return (
    <ModuleCard
      id="goals"
      title={goals.title}
      size="large"
      icon="🎯"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {goals.items.map((item, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden border border-black dark:border-white/30 p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            {/* Hover gradient overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${idx === 0 ? 'rgba(59,130,246,0.08)' :
                    idx === 1 ? 'rgba(168,85,247,0.08)' :
                      idx === 2 ? 'rgba(34,197,94,0.08)' :
                        'rgba(249,115,22,0.08)'
                  } 0%, transparent 100%)`
              }}
            />

            <div className="relative text-center">
              {/* Icon */}
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center border border-black dark:border-white/30 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300">
                <span className="text-2xl">{item.icon}</span>
              </div>

              <h4 className="text-sm font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ModuleCard>
  )
}
