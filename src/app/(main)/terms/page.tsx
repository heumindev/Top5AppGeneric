import { Metadata } from 'next'
import { getCurrentSiteConfig } from '@/lib/get-site-config'

export async function generateMetadata(): Promise<Metadata> {
  const config = await getCurrentSiteConfig()
  const canonicalUrl = `https://${config.domain}/terms`

  return {
    title: `Terms of Service | ${config.branding.name}`,
    description: `Terms of Service for ${config.branding.name}. Read our terms and conditions for using our website.`,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function TermsPage() {
  const config = await getCurrentSiteConfig()
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-32 pb-16">
        <div className="container-site">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-gray-400">Last updated: {currentDate}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-site">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="lead text-text-muted">
              Welcome to {config.branding.name}. By accessing or using our website, you agree to be bound by these Terms of Service.
            </p>

            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website.
            </p>

            <h2>Use of Website</h2>
            <p>
              You may use our website for lawful purposes only. You agree not to:
            </p>
            <ul>
              <li>Use the website in any way that violates applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Interfere with or disrupt the website or servers</li>
              <li>Use automated systems to access the website without permission</li>
              <li>Collect or harvest any information from the website</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, images, recipes, and software, is the property of {config.branding.name} or its content suppliers and is protected by copyright and other intellectual property laws.
            </p>

            <h3>Recipe Content</h3>
            <p>
              The recipes on this website are provided for personal, non-commercial use only. You may:
            </p>
            <ul>
              <li>View and print recipes for personal use</li>
              <li>Share links to recipe pages</li>
            </ul>
            <p>
              You may not:
            </p>
            <ul>
              <li>Republish recipes without proper attribution and a link to the original</li>
              <li>Use recipes for commercial purposes without written permission</li>
              <li>Copy and distribute recipe content in bulk</li>
            </ul>

            <h2>Disclaimer</h2>
            <p>
              The information on this website is provided for general informational purposes only. We make no warranties about the completeness, reliability, or accuracy of this information.
            </p>

            <h3>Nutritional Information</h3>
            <p>
              Nutritional information provided is estimated and may vary based on ingredients, portion sizes, and preparation methods. We recommend consulting with a healthcare professional or registered dietitian for personalized nutrition advice.
            </p>

            <h3>Recipe Results</h3>
            <p>
              Individual results may vary when preparing recipes. Factors such as ingredient quality, cooking equipment, and technique can affect outcomes. We are not responsible for any issues arising from recipe preparation.
            </p>

            <h2>Health Disclaimer</h2>
            <p>
              The content on this website is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or dietary changes.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of these external sites. Linking to a third-party site does not imply endorsement.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, {config.branding.name} shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the website.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless {config.branding.name} and its affiliates from any claims, damages, or expenses arising from your use of the website or violation of these Terms of Service.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes constitutes acceptance of the new terms.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
            </p>

            <h2>Severability</h2>
            <p>
              If any provision of these Terms of Service is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us through our website.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
