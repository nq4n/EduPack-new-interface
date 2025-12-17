import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import AuthProvider from '@/components/auth-provider'
import { Toaster } from '@/components/ui/sonner'
import { Suspense } from 'react'
import PageTransition from '@/components/PageTransition'
import LocaleProvider from '@/components/locale-provider'

export const metadata: Metadata = {
  title: 'EduPack',
  description: 'Create SCORM packages with ease.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Default to 'en' and 'ltr' for the initial server render.
    // The LocaleProvider will update this on the client.
    <html lang="en" dir="ltr">
      <body className="relative min-h-screen">
        <LocaleProvider>
          <AuthProvider>
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
      </body>
    </html>
  )
}
