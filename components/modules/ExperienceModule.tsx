'use client'

import { ModuleCard } from '@/components/ModuleCard'
import { Briefcase, GraduationCap, Award, Rocket } from 'lucide-react'
import { useState } from 'react'

// Placeholder experience data - user can customize
const experiences = [
    {
        id: 1,
        type: 'work',
        title: 'Software Development',
        organization: 'Building Projects',
        period: 'Present',
        description: 'Full-stack development with modern technologies',
        icon: Briefcase,
        color: 'from-blue-500 to-cyan-500',
    },
    {
        id: 2,
        type: 'education',
        title: 'Computer Science',
        organization: 'University',
        period: '2020 - 2024',
        description: 'Bachelor\'s degree in Computer Science',
        icon: GraduationCap,
        color: 'from-purple-500 to-pink-500',
    },
    {
        id: 3,
        type: 'achievement',
        title: 'Competitive Programming',
        organization: 'Various Platforms',
        period: 'Ongoing',
        description: '900+ problems solved across platforms',
        icon: Award,
        color: 'from-amber-500 to-orange-500',
    },
    {
        id: 4,
        type: 'project',
        title: 'Open Source',
        organization: 'GitHub',
        period: 'Ongoing',
        description: 'Contributing to open source projects',
        icon: Rocket,
        color: 'from-green-500 to-emerald-500',
    },
]

export function ExperienceModule() {
    const [hoveredId, setHoveredId] = useState<number | null>(null)

    return (
        <ModuleCard
            id="experience"
            title="Journey"
            size="large"
            icon="🛤️"
        >
            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 opacity-20" />

                <div className="space-y-4">
                    {experiences.map((exp, idx) => {
                        const Icon = exp.icon
                        const isHovered = hoveredId === exp.id

                        return (
                            <div
                                key={exp.id}
                                className="relative flex gap-4 group"
                                onMouseEnter={() => setHoveredId(exp.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Timeline dot */}
                                <div
                                    className={`relative z-10 w-10 h-10 flex-shrink-0 flex items-center justify-center border-2 border-border bg-background transition-all duration-300 ${isHovered ? 'scale-110 border-transparent' : ''
                                        }`}
                                >
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''
                                            }`}
                                    />
                                    <Icon
                                        size={18}
                                        className={`relative z-10 transition-colors duration-300 ${isHovered ? 'text-white' : 'text-muted-foreground'
                                            }`}
                                    />
                                </div>

                                {/* Content */}
                                <div
                                    className={`flex-1 pb-4 transition-all duration-300 ${isHovered ? 'translate-x-1' : ''
                                        }`}
                                >
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <h4 className="text-sm font-semibold text-foreground">{exp.title}</h4>
                                        <span className="text-xs text-muted-foreground">•</span>
                                        <span className="text-xs text-muted-foreground">{exp.period}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-1">{exp.organization}</p>
                                    <p
                                        className={`text-xs text-muted-foreground/80 leading-relaxed transition-all duration-300 overflow-hidden ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </ModuleCard>
    )
}
