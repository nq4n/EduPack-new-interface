import type React from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, FileText, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">How to Use EduPack</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Step-by-step guides, video tutorials, and resources to help you get the most out of EduPack
          </p>
        </div>

        {/* Guide Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <GuideCard
            number="1"
            icon={<Sparkles className="h-6 w-6" />}
            title="Create your first package with SCORM AI"
            description="Learn how to use our AI-powered authoring tool to build interactive SCORM packages from scratch"
            duration="10 min read"
            level="Beginner"
          />
          <GuideCard
            number="2"
            icon={<Upload className="h-6 w-6" />}
            title="Upload and publish a package"
            description="Step-by-step guide to uploading your existing SCORM content and making it available in the marketplace"
            duration="5 min read"
            level="Beginner"
          />
          <GuideCard
            number="3"
            icon={<ShoppingBag className="h-6 w-6" />}
            title="Buy and download packages from the shop"
            description="Discover how to find, preview, and purchase ready-made educational packages for your LMS"
            duration="7 min read"
            level="Beginner"
          />
          <GuideCard
            number="4"
            icon={<Cloud className="h-6 w-6" />}
            title="Connect EduPack packages to your LMS"
            description="Integration guides for Moodle, Canvas, Blackboard, and other popular learning management systems"
            duration="15 min read"
            level="Intermediate"
          />
        </div>

        {/* Video Tutorials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Video Tutorials</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <VideoCard
              title="Getting Started with EduPack"
              duration="8:34"
              thumbnail="/placeholder.svg?height=200&width=400"
            />
            <VideoCard
              title="AI Content Generation Tips"
              duration="12:15"
              thumbnail="/placeholder.svg?height=200&width=400"
            />
            <VideoCard
              title="Advanced Authoring Techniques"
              duration="18:47"
              thumbnail="/placeholder.svg?height=200&width=400"
            />
          </div>
        </section>

        {/* Documentation */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Documentation</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DocLink
              icon={<FileText className="h-5 w-5" />}
              title="API Documentation"
              description="For developers integrating EduPack"
            />
            <DocLink
              icon={<BookOpen className="h-5 w-5" />}
              title="Best Practices Guide"
              description="Tips for creating effective content"
            />
            <DocLink
              icon={<FileText className="h-5 w-5" />}
              title="SCORM Standards Reference"
              description="Understanding SCORM specifications"
            />
          </div>
        </section>

        {/* Contact Team */}
        <section id="contact" className="bg-card rounded-2xl border border-border p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Need Help? Contact Our Team</h2>
              <p className="text-muted-foreground mb-6">
                Our support team is here to help you succeed. Reach out anytime with questions or feedback.
              </p>

              <div className="space-y-4 mb-8">
                <ContactPerson
                  name="Sarah Mitchell"
                  role="Support Specialist"
                  avatar="/placeholder.svg?height=48&width=48"
                />
                <ContactPerson
                  name="David Chen"
                  role="Technical Support Lead"
                  avatar="/placeholder.svg?height=48&width=48"
                />
              </div>

              <div className="space-y-3">
                <a href="mailto:support@edupack.app" className="flex items-center gap-3 text-primary hover:underline">
                  <Mail className="h-5 w-5" />
                  <span>support@edupack.app</span>
                </a>
                <Link href="#" className="flex items-center gap-3 text-primary hover:underline">
                  <MessageCircle className="h-5 w-5" />
                  <span>Live Chat Support</span>
                </Link>
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">Send us a message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Your Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-sm"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-sm min-h-[120px]"
                    placeholder="How can we help you?"
                  />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function GuideCard({
  number,
  icon,
  title,
  description,
  duration,
  level,
}: {
  number: string
  icon: React.ReactNode
  title: string
  description: string
  duration: string
  level: string
}) {
  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
          {number}
        </div>
        <div className="flex-1">
          <div className="text-primary mb-2">{icon}</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{duration}</span>
            <span>•</span>
            <span className="text-primary font-medium">{level}</span>
          </div>
        </div>
      </div>
      <Button variant="outline" className="w-full bg-transparent">
        <BookOpen className="mr-2 h-4 w-4" />
        Open Guide
      </Button>
    </div>
  )
}

function VideoCard({ title, duration, thumbnail }: { title: string; duration: string; thumbnail: string }) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-video bg-muted">
        <img src={thumbnail || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center">
            <Video className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">{duration}</div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
    </div>
  )
}

function DocLink({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Link href="#" className="block bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
      <div className="text-primary mb-3">{icon}</div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  )
}

function ContactPerson({ name, role, avatar }: { name: string; role: string; avatar: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
        <img src={avatar || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
      </div>
      <div>
        <div className="font-semibold text-foreground">{name}</div>
        <div className="text-sm text-muted-foreground">{role}</div>
      </div>
    </div>
  )
}

// Import missing icons
import { Sparkles, Upload, ShoppingBag, Cloud } from "lucide-react"
