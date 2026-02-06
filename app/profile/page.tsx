'use client'

import React from "react"

export default function ProfilePage() {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="space-y-6">
                {/* Profile Header */}
                <div className="rounded-lg border border-border bg-card p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                            <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary">
                                RK
                            </div>
                        </div>
                        <div className="flex-1 space-y-4">
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Full Stack Developer</h1>
                                <p className="text-muted-foreground">Building modern web applications</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">React</span>
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Next.js</span>
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">TypeScript</span>
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Node.js</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="rounded-lg border border-border bg-card p-6">
                    <h2 className="text-xl font-semibold mb-4">About Me</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Passionate developer with expertise in building scalable web applications.
                        I love solving complex problems and creating elegant solutions using modern technologies.
                    </p>
                </div>

                {/* Skills Section */}
                <div className="rounded-lg border border-border bg-card p-6">
                    <h2 className="text-xl font-semibold mb-4">Skills & Technologies</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'Git', 'Docker'].map((skill) => (
                            <div key={skill} className="rounded-lg bg-muted p-3 text-center text-sm font-medium">
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Goals Section */}
                <div className="rounded-lg border border-border bg-card p-6">
                    <h2 className="text-xl font-semibold mb-4">Goals & Vision</h2>
                    <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Master advanced system design patterns</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Contribute to open-source projects</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Build impactful products that solve real problems</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
