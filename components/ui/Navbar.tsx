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

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = ['projects', 'competitive-programming', 'about'];
            const scrollPos = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && element.offsetTop <= scrollPos) {
                    setActiveSection(section);
                    return;
                }
            }
            setActiveSection('');
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);

        if (href === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const element = document.querySelector(href);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className={cn(
            'fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b-2 border-black',
            'bg-neo-white'
        )}>
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Brand */}
                    <Link
                        href="/"
                        onClick={(e) => scrollToSection(e, '#')}
                        className="font-display text-4xl font-bold uppercase tracking-tight hover:text-neo-blue transition-colors"
                    >
                        ABHISHEK.EXE
                    </Link>

                    {/* Desktop Items */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className="font-mono text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-neo-white px-2 py-1 transition-all"
                            >
                                {item.label}
                            </Link>
                        ))}
                        {/* <ThemeToggle /> */}
                        <a
                            href="#contact"
                            onClick={(e) => scrollToSection(e, '#contact')}
                            className="bg-neo-yellow border-2 border-black px-6 py-2 font-mono text-sm font-bold uppercase shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-black"
                        >
                            Connect
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        {/* <ThemeToggle /> */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 border-2 border-black bg-neo-white shadow-hard active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t-2 border-black bg-neo-white p-4 absolute w-full shadow-hard-lg">
                    <div className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                className="font-mono text-lg font-bold uppercase border-2 border-black p-3 shadow-hard-sm active:shadow-none active:translate-x-1 active:translate-y-1 transition-all hover:bg-neo-yellow"
                            >
                                /{item.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
