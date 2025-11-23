export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>

        <div className="prose prose-lg">
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              This is a frontend prototype for demonstration purposes. These terms will be updated when the full
              application is launched.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Use of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              The service is provided "as is" for evaluation purposes. Full terms of service will be available upon
              official launch.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these terms, contact us at legal@edupack.app
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
