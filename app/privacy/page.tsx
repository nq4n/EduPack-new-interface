export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>

        <div className="prose prose-lg">
          <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              This is a frontend prototype. No actual user data is collected or stored at this time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              When the full application is deployed, we will collect only the minimum information necessary to provide
              our services and improve user experience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this privacy policy, please contact us at privacy@edupack.app
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
