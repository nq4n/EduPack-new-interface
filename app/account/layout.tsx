"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { User, Package, CreditCard, Settings } from "lucide-react"
import { usePathname } from "next/navigation"

export default function AccountLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { href: "/account", label: "Overview", icon: User },
    { href: "/account/packages", label: "My Packages", icon: Package },
    { href: "/account/billing", label: "Billing", icon: CreditCard },
    { href: "/account/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-[250px_1fr] gap-8">
        {/* Sidebar Navigation */}
        <aside className="space-y-2">
          <h2 className="font-semibold text-lg mb-4">Account</h2>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main>{children}</main>
      </div>
    </div>
  )
}
