export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">About EduPack</h1>

        <div className="prose prose-lg">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              EduPack was created to democratize e-learning content creation. We believe that every educator, regardless
              of technical expertise, should have access to powerful tools for creating engaging, interactive learning
              experiences.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By combining AI-powered content generation with an intuitive authoring interface and a collaborative
              marketplace, we're making it easier than ever to create, share, and monetize educational content.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Who We Serve</h2>
            <div className="space-y-4">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">Teachers & Instructors</h3>
                <p className="text-muted-foreground">
                  Individual educators looking to create professional e-learning content without spending countless
                  hours on technical setup.
                </p>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">EdTech Teams & Institutions</h3>
                <p className="text-muted-foreground">
                  Schools, universities, and corporate training departments seeking to standardize and scale their
                  e-learning content production.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Purpose</h2>
            <p className="text-muted-foreground leading-relaxed">
              We're building more than just software—we're creating an ecosystem where educators can focus on what they
              do best: teaching. By handling the technical complexity and providing tools that enhance creativity, we're
              empowering the next generation of e-learning content creators.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
