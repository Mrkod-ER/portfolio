'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

const navItems = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'CP', href: '#competitive-programming' },
    { label: 'Projects', href: '#projects' },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    // Track scroll for glass effect + active section
    useEffect(() => {
        const sectionIds = ['projects', 'competitive-programming', 'about'];

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Determine active section (bottom-up priority)
            const scrollPos = window.scrollY + 120;
            let current = '';

            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= scrollPos) {
                    current = id;
                    break;
                }
            }

            // If near top, no active section
            if (window.scrollY < 100) current = '';

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);

        if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const element = document.querySelector(href);
            if (element) {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }, []);

    const isActive = (href: string) => {
        if (href === '#') return activeSection === '';
        return `#${activeSection}` === href;
    };

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
                scrolled
                    ? 'bg-background/80 backdrop-blur-md border-border shadow-sm py-2'
                    : 'bg-transparent py-4'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-display text-xl font-bold tracking-tight hover:opacity-80 transition-opacity uppercase"
                        onClick={(e) => handleLinkClick(e, '#')}
                    >
                        Portfolio
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => handleLinkClick(e, item.href)}
                                className={cn(
                                    'font-body text-xs font-medium uppercase tracking-wider transition-colors relative py-1',
                                    isActive(item.href)
                                        ? 'text-zinc-100'
                                        : 'text-muted-foreground hover:text-primary'
                                )}
                            >
                                {item.label}
                                {/* Active indicator */}
                                <span
                                    className={cn(
                                        'absolute bottom-0 left-0 right-0 h-px bg-zinc-100 transition-all duration-300',
                                        isActive(item.href) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                                    )}
                                />
                            </a>
                        ))}
                        {/* <ThemeToggle /> */}
                    </div>

                    {/* Mobile Menu Toggle */}
                    {/* <div className="flex items-center gap-4 md:hidden">
                        <ThemeToggle />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMenu}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </div> */}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border p-4 shadow-lg animate-in slide-in-from-top-5">
                    <div className="flex flex-col space-y-4">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => handleLinkClick(e, item.href)}
                                className={cn(
                                    'text-base font-medium py-2 px-4 transition-colors',
                                    isActive(item.href)
                                        ? 'text-zinc-100 bg-zinc-800/40'
                                        : 'text-foreground hover:bg-muted'
                                )}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
