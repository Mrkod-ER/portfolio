'use client'

import { aboutMe } from '@/data/profiles'
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'

const socialLinks = [
    { icon: Github, href: aboutMe.github, label: 'GitHub' },
    { icon: Linkedin, href: aboutMe.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: aboutMe.twitter, label: 'Twitter' },
    { icon: Mail, href: `mailto:${aboutMe.email}`, label: 'Email' },
]

const techStack = ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel']

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative mt-20 border-t border-border/50">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-muted/30 to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold tracking-tight">{aboutMe.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            {aboutMe.role}. Building scalable web applications and solving complex problems.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Quick Links</h4>
                        <nav className="flex flex-col gap-2">
                            <a href="#about" className="text-sm text-foreground/80 hover:text-foreground transition-colors">About</a>
                            <a href="#projects" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Projects</a>
                            <a href="#profile-stats" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Competitive Programming</a>
                            <a href="#goals" className="text-sm text-foreground/80 hover:text-foreground transition-colors">Goals</a>
                        </nav>
                    </div>

                    {/* Connect Section */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Connect</h4>
                        <div className="flex gap-3">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center border border-border/50 text-muted-foreground hover:text-foreground hover:border-foreground hover:bg-foreground/5 transition-all duration-200"
                                    title={label}
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-border/30">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} {aboutMe.name}. All rights reserved.
                        </p>

                        {/* Built with */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Built with</span>
                            <Heart size={14} className="text-red-500 animate-pulse" />
                            <span>using</span>
                            <div className="flex gap-1.5">
                                {techStack.map((tech, idx) => (
                                    <span key={tech}>
                                        <span className="text-foreground font-medium">{tech}</span>
                                        {idx < techStack.length - 1 && <span className="text-muted-foreground">,</span>}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
