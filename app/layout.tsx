import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import AuthProvider from '@/components/auth-provider'
import { Toaster } from '@/components/ui/sonner'
import { Suspense } from 'react'
import PageTransition from '@/components/PageTransition'
import LocaleProvider from '@/components/locale-provider'
import AnimatedScormBg from '@/components/AnimatedScormBg'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'EduPack',
  description: 'Create SCORM packages with ease.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Default to 'en' and 'ltr' for the initial server render.
    // The LocaleProvider will update this on the client.
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="relative min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LocaleProvider>
            <AuthProvider>
              <AnimatedScormBg />
              <Navbar />
              <Suspense fallback={<div />}>
                <div className="relative z-10">
                  <PageTransition>
                    <main className="min-h-screen">{children}</main>
                  </PageTransition>
                </div>
              </Suspense>
              <Toaster />
            </AuthProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
