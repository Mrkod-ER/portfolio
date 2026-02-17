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

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            const element = document.querySelector(href)
            if (element) {
                const offset = 80
                const bodyRect = document.body.getBoundingClientRect().top
                const elementRect = element.getBoundingClientRect().top
                const elementPosition = elementRect - bodyRect
                const offsetPosition = elementPosition - offset

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                })
            }
        }
    }

    return (
        <footer className="relative mt-20 border-t-4 border-black bg-neo-white">
            <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="font-display text-2xl font-bold uppercase text-black">{aboutMe.name}</h3>
                        <p className="text-base text-black font-body leading-relaxed max-w-xs border-l-4 border-neo-yellow pl-4">
                            {aboutMe.role}. Building scalable web applications with raw power.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold uppercase tracking-tight text-black font-mono">Quick Links</h4>
                        <nav className="flex flex-col gap-2">
                            <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="text-base text-black font-bold hover:bg-neo-yellow hover:px-2 transition-all w-max">About</a>
                            <a href="#competitive-programming" onClick={(e) => handleLinkClick(e, '#competitive-programming')} className="text-base text-black font-bold hover:bg-neo-yellow hover:px-2 transition-all w-max">Competitive Programming</a>
                            <a href="#projects" onClick={(e) => handleLinkClick(e, '#projects')} className="text-base text-black font-bold hover:bg-neo-yellow hover:px-2 transition-all w-max">Projects</a>
                        </nav>
                    </div>

                    {/* Connect Section */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-bold uppercase tracking-tight text-black font-mono">Connect</h4>
                        <div className="flex gap-4">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 flex items-center justify-center border-2 border-black bg-white text-black hover:bg-neo-blue hover:text-white hover:shadow-hard shadow-hard-sm transition-all"
                                    title={label}
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t-4 border-black">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Copyright */}
                        <p className="text-sm text-black font-mono font-bold">
                            © {currentYear} {aboutMe.name}. All rights reserved.
                        </p>

                        {/* Built with */}
                        <div className="flex items-center gap-2 text-sm text-black font-mono font-bold">
                            <span>Built with</span>
                            <Heart size={14} className="text-neo-red fill-neo-red animate-pulse" />
                            <span>using</span>
                            <div className="flex gap-1.5">
                                {techStack.map((tech, idx) => (
                                    <span key={tech}>
                                        <span className="bg-neo-yellow px-1 border border-black text-xs">{tech}</span>
                                        {idx < techStack.length - 1 && <span>+</span>}
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
