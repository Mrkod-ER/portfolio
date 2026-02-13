import React from "react"
import type { Metadata } from 'next'
import { Bebas_Neue, Manrope } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/ui/Navbar"

const bebasNeue = Bebas_Neue({ subsets: ['latin'], variable: '--font-display', weight: '400' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-body', weight: ['200', '300', '400', '500', '600', '700', '800'] })

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
    <html lang="en" suppressHydrationWarning className={`${bebasNeue.variable} ${manrope.variable}`}>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Navbar />
            <main className="flex-1 w-full pt-[72px]">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
