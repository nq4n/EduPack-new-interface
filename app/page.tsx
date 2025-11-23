import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"
import { Play, FileText, GraduationCap, Building2, Sparkles, ShoppingBag, Boxes, Cloud } from "lucide-react"

export default function HomePage() {
  const previewTabs = [
    { label: "Name", value: "name", content: <PreviewContent title="Introduction to Fractions - Grade 5" /> },
    { label: "Grade/Stage", value: "grade", content: <PreviewContent title="Grade 5 - Elementary" /> },
    { label: "Subject", value: "subject", content: <PreviewContent title="Mathematics" /> },
    { label: "Measure", value: "measure", content: <PreviewContent title="Interactive Lesson + Quiz" /> },
    { label: "Language", value: "language", content: <PreviewContent title="English" /> },
  ]

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-6 leading-tight text-balance">
                Build and Share Interactive SCORM Packages in Minutes
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Create professional e-learning content with AI assistance. No advanced technical skills needed. Export
                to SCORM/xAPI and deploy to any LMS instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link href="/scorm-ai">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Start with SCORM AI
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Browse Packages
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">No credit card required • Free trial available</p>
            </div>

            {/* Right Column - Preview Card */}
            <div className="bg-card rounded-2xl shadow-xl p-6 border border-border">
              <Tabs tabs={previewTabs} defaultValue="name" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Summary Band */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Boxes className="h-8 w-8 text-primary" />}
              title="Easy SCORM Creation"
              description="Create SCORM/xAPI packages with our intuitive drag-and-drop interface"
            />
            <FeatureCard
              icon={<Sparkles className="h-8 w-8 text-primary" />}
              title="AI-Assisted Content"
              description="Generate engaging educational content with AI-powered suggestions"
            />
            <FeatureCard
              icon={<ShoppingBag className="h-8 w-8 text-primary" />}
              title="Package Marketplace"
              description="Buy and sell ready-made SCORM packages in our growing marketplace"
            />
            <FeatureCard
              icon={<Cloud className="h-8 w-8 text-primary" />}
              title="LMS Compatible"
              description="Works with Moodle, Canvas, Blackboard, and all major learning platforms"
            />
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Built for Educators and Institutions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <AudienceCard
              icon={<GraduationCap className="h-12 w-12 text-primary" />}
              title="For Teachers & Instructors"
              points={[
                "Create interactive lessons without coding",
                "Save time with AI-generated content",
                "Share and monetize your teaching materials",
                "Track student engagement and progress",
              ]}
            />
            <AudienceCard
              icon={<Building2 className="h-12 w-12 text-primary" />}
              title="For EdTech Teams & Institutions"
              points={[
                "Standardize content creation across teams",
                "Reduce development costs and time",
                "Ensure SCORM compliance automatically",
                "Scale e-learning programs efficiently",
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Transform Your E-Learning?</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of educators creating better learning experiences</p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

function PreviewContent({ title }: { title: string }) {
  return (
    <div className="bg-accent/20 rounded-xl p-8 min-h-[300px] flex flex-col items-center justify-center border-2 border-accent/50">
      <div className="text-center space-y-4">
        <div className="bg-accent/30 rounded-full p-4 inline-flex">
          <Play className="h-8 w-8 text-foreground" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">Package Preview Area</p>
      </div>
      <div className="mt-8 flex gap-3">
        <Button variant="outline" size="sm">
          <Play className="mr-2 h-4 w-4" />
          Play Sample
        </Button>
        <Button variant="outline" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          View Outline
        </Button>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

function AudienceCard({ icon, title, points }: { icon: React.ReactNode; title: string; points: string[] }) {
  return (
    <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        {icon}
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
      <ul className="space-y-3">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
            <span className="text-muted-foreground">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
