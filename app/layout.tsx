import type React from "react"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { LocaleProvider } from "@/components/layout/locale-provider"

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "EduPack - Build Interactive SCORM Packages",
  description: "Create and share interactive SCORM/xAPI packages in minutes with AI-assisted content generation",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${cairo.className} font-sans antialiased`}>
        <LocaleProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  )
}
