import type React from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Layout, Download, Users, BarChart3, Languages, Zap, DollarSign, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">Why Choose EduPack?</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The most powerful and user-friendly SCORM authoring platform for educators and institutions. Create
            professional e-learning content without the complexity.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">EduPack vs Traditional Tools</h2>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                    Traditional Tools
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-primary">EduPack</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <ComparisonRow feature="Starting Price" traditional="$500-2000/year" edupack="$9 (pay as you go)" />
                <ComparisonRow feature="Learning Curve" traditional="Weeks to months" edupack="Minutes to hours" />
                <ComparisonRow feature="AI Assistance" traditional="None" edupack="Built-in AI content generation" />
                <ComparisonRow feature="Marketplace" traditional="Separate platforms" edupack="Integrated buy & sell" />
                <ComparisonRow
                  feature="Technical Support"
                  traditional="Business hours only"
                  edupack="24/7 community + priority support"
                />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">
            Everything You Need to Create Amazing Content
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Powerful features designed to make SCORM authoring accessible to everyone
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles className="h-8 w-8" />}
              title="AI-Assisted Content"
              description="Generate engaging educational content, quizzes, and activities with AI-powered suggestions tailored to your subject."
            />
            <FeatureCard
              icon={<Layout className="h-8 w-8" />}
              title="Ready-Made Templates"
              description="Start with professionally designed templates for lessons, courses, and assessments. Customize to match your brand."
            />
            <FeatureCard
              icon={<Download className="h-8 w-8" />}
              title="Universal Export"
              description="Export to SCORM 1.2, SCORM 2004, or xAPI with one click. Compatible with all major LMS platforms."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" />}
              title="Team Collaboration"
              description="Work together with colleagues in real-time. Share resources, review content, and maintain consistency."
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8" />}
              title="Built-in Analytics"
              description="Track learner engagement and performance with comprehensive analytics and reporting tools."
            />
            <FeatureCard
              icon={<Languages className="h-8 w-8" />}
              title="Multi-Language Support"
              description="Create content in English, Arabic, Spanish, French, and more. RTL support included."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Lightning Fast"
              description="Build and export packages in minutes, not days. Our optimized workflow keeps you productive."
            />
            <FeatureCard
              icon={<DollarSign className="h-8 w-8" />}
              title="Sell Your Content"
              description="Monetize your expertise by selling packages on our marketplace. Set your own prices and earn revenue."
            />
            <FeatureCard
              icon={<Lightbulb className="h-8 w-8" />}
              title="Smart Suggestions"
              description="Get contextual recommendations for images, activities, and assessments as you build."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Experience the Difference?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of educators who have simplified their e-learning content creation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function ComparisonRow({ feature, traditional, edupack }: { feature: string; traditional: string; edupack: string }) {
  return (
    <tr>
      <td className="px-6 py-4 text-sm font-medium text-foreground">{feature}</td>
      <td className="px-6 py-4 text-sm text-muted-foreground text-center">{traditional}</td>
      <td className="px-6 py-4 text-sm text-primary font-medium text-center">{edupack}</td>
    </tr>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
