import type { Metadata } from "next"
import "./globals.css" // Assuming you have a global CSS file
import { Navbar } from "@/components/layout/navbar"

export const metadata: Metadata = {
  title: "EduPack",
  description: "Create SCORM packages with ease.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}