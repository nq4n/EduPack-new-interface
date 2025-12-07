"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils" // Assuming you have a utility for class names

const sidebarNavItems = []

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
            {sidebarNavItems.map((item) => (
              <Link key={item.href} href={item.href} className={cn("inline-flex items-center rounded-md text-sm font-medium px-4 py-2", pathname === item.href ? "bg-muted text-primary" : "hover:bg-muted/50")}>
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-4xl">{children}</div>
      </div>
    </div>
  )
}
