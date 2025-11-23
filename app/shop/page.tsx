"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react"

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock packages data
  const packages = [
    {
      id: 1,
      title: "Introduction to Fractions",
      grade: "Grade 5",
      subject: "Mathematics",
      language: "English",
      description: "Interactive lesson covering fraction basics with visual aids and practice quizzes",
      price: "Free",
      thumbnail: "/math-fractions-classroom.jpg",
    },
    {
      id: 2,
      title: "Solar System Explorer",
      grade: "Grade 7",
      subject: "Science",
      language: "English",
      description: "Journey through our solar system with interactive 3D models and activities",
      price: "$12.99",
      thumbnail: "/solar-system-space-planets.jpg",
    },
    {
      id: 3,
      title: "Shakespeare: Romeo & Juliet",
      grade: "High School",
      subject: "Literature",
      language: "English",
      description: "Comprehensive study guide with character analysis and interactive scenes",
      price: "$9.99",
      thumbnail: "/shakespeare-theatre-literature.jpg",
    },
    {
      id: 4,
      title: "Basic Chemistry Reactions",
      grade: "Grade 9",
      subject: "Chemistry",
      language: "English",
      description: "Virtual lab experiments demonstrating fundamental chemical reactions safely",
      price: "$14.99",
      thumbnail: "/chemistry-lab-science-education.jpg",
    },
    {
      id: 5,
      title: "World Geography Quiz",
      grade: "Grade 6",
      subject: "Geography",
      language: "English",
      description: "Interactive maps and quizzes covering continents, countries, and capitals",
      price: "Free",
      thumbnail: "/world-map-geography-education.jpg",
    },
    {
      id: 6,
      title: "Python Programming Basics",
      grade: "High School",
      subject: "Computer Science",
      language: "English",
      description: "Learn Python fundamentals with interactive coding exercises and projects",
      price: "$19.99",
      thumbnail: "/coding-programming-computer-education.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Package Shop</h1>
          <p className="text-muted-foreground">Browse and download ready-made SCORM packages for your LMS</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search packages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select className="px-3 py-2 rounded-lg border border-input bg-background text-sm">
              <option>All Grades</option>
              <option>Elementary</option>
              <option>Middle School</option>
              <option>High School</option>
            </select>
            <select className="px-3 py-2 rounded-lg border border-input bg-background text-sm">
              <option>All Subjects</option>
              <option>Mathematics</option>
              <option>Science</option>
              <option>Literature</option>
            </select>
            <select className="px-3 py-2 rounded-lg border border-input bg-background text-sm">
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm">
              Free
            </Button>
            <Button variant="outline" size="sm">
              Paid
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button size="sm">2</Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function PackageCard({ package: pkg }: { package: any }) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
      <img src={pkg.thumbnail || "/placeholder.svg"} alt={pkg.title} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-2">{pkg.title}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="text-xs">
            {pkg.grade}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {pkg.subject}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {pkg.language}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pkg.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{pkg.price}</span>
          <Link href={`/packages/${pkg.id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
