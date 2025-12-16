import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import AuthProvider from '@/components/auth-provider'
import { Toaster } from '@/components/ui/sonner'
import { Suspense } from 'react'
import PageTransition from '@/components/PageTransition'


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
    <html lang="en">
     <body className="relative min-h-screen">
  

  <AuthProvider>
    <Navbar />

    <Suspense fallback={<div />}>
      <div className="relative z-10">
        <PageTransition>
          <main className="min-h-screen">
            {children}
          </main>
        </PageTransition>
      </div>
    </Suspense>

    <Toaster />
  </AuthProvider>
</body>
    </html>
  )
}
