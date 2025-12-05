"use client"

import { PackageCard } from "./package-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// This is a placeholder. In a real app, you'd fetch this from a database.
const featuredPackages = [
  {
    id: "1",
    title: "Introduction to Algebra",
    description: "A complete course on the fundamentals of algebra.",
  },
  {
    id: "2",
    title: "Advanced Chemistry",
    description: "Explore the world of molecules and reactions.",
  },
  {
    id: "3",
    title: "History of Ancient Civilizations",
    description: "A journey through time to the cradles of civilization.",
  },
]

export function FeaturedPackages() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">Featured Packages</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.id} {...pkg} />
          ))}
        </div>
        <div className="text-center">
          <Link href="/packages">
            <Button size="lg" variant="outline" className="bg-transparent">
              Browse All Packages
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}