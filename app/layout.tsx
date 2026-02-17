import React from "react"
import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/ui/Navbar"
import { CustomCursor } from "@/components/ui/CustomCursor"

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', weight: ['700'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-body', weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Developer Portfolio',
  description: 'A modular developer portfolio showcasing projects, coding profiles, and goals',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body antialiased selection:bg-neo-yellow selection:text-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Default to light mode for NeoBrutalist usually, but user specified dark mode colors earlier. Wait, user prompt says "bg-neo-white". So I should default to light or force a specific theme. Let's stick with system preference but enable forced classes if needed. Actually, the prompt implies a specific look. Let's set
          enableSystem={false}
          disableTransitionOnChange
        >
          <CustomCursor />
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
