'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Home, FolderOpen, Star, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const navItems = [
    {
      id: 'home',
      href: '/',
      label: 'Home',
      icon: Home,
      badge: null,
    },
    {
      id: 'projects',
      href: '/#projects',
      label: 'Projects',
      icon: FolderOpen,
      badge: null,
    },
    {
      id: 'featured',
      href: '/#featured',
      label: 'Featured',
      icon: Star,
      badge: 'Pro',
    },
  ]

  const isActive = (href: string) => {
    return pathname === href
  }

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <aside
      className={cn(
        'hidden md:flex md:flex-col md:border-r md:border-border md:bg-card md:transition-all md:duration-300',
        isCollapsed ? 'md:w-20' : 'md:w-64',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        {!isCollapsed && (
          <h2 className="text-lg font-bold text-foreground">Portfolio</h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-md p-1 transition-colors hover:bg-muted"
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? (
            <Menu size={20} className="text-muted-foreground" />
          ) : (
            <Menu size={20} className="text-muted-foreground" />
          )}
        </button>
      </div>

      {/* Profile Section */}
      <div className="border-b border-border p-4">
        <div className="flex flex-col items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=portfolio" />
            <AvatarFallback>RK</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <>
              <div className="text-center">
                <h3 className="text-sm font-semibold text-foreground">Rohit Gujar</h3>
                <p className="text-xs text-muted-foreground">Developer</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200',
                'hover:bg-muted/50',
                isActive(item.href) &&
                  'bg-primary/10 text-primary hover:bg-primary/20'
              )}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {isActive(item.href) && (
                <div className="absolute left-0 h-full w-1 rounded-r-full bg-primary" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="border-t border-border p-4">
          <p className="text-xs text-muted-foreground">
            © 2026. All rights reserved.
          </p>
        </div>
      )}
    </aside>
  )

  // Mobile Drawer Sidebar
  const MobileSidebar = () => (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-20 z-40 rounded-md p-2 transition-colors hover:bg-muted md:hidden"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 md:hidden" />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-border bg-card transition-all duration-300 md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-bold text-foreground">Portfolio</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md p-1 transition-colors hover:bg-muted"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile Section */}
        <div className="border-b border-border p-4">
          <div className="flex flex-col items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=portfolio" />
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-sm font-semibold text-foreground">Rohit Gujar</h3>
              <p className="text-xs text-muted-foreground">Developer</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200',
                  'hover:bg-muted/50',
                  isActive(item.href) &&
                    'bg-primary/10 text-primary hover:bg-primary/20'
                )}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className="flex-1 text-sm font-medium">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <p className="text-xs text-muted-foreground">
            © 2026. All rights reserved.
          </p>
        </div>
      </aside>
    </>
  )

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}
