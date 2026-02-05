'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const isDarkMode =
      document.documentElement.classList.contains('dark') ||
      localStorage.getItem('theme') === 'dark'
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  if (!isMounted) return null

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full bg-transparent transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label="Toggle theme"
    >
      <div className="transition-transform duration-500">
        {isDark ? <Sun size={18} className="rotate-0" /> : <Moon size={18} className="rotate-180" />}
      </div>
    </Button>
  )
}
