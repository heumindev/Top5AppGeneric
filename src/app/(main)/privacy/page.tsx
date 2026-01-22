import { Metadata } from 'next'
import { getCurrentSiteConfig } from '@/lib/get-site-config'

export async function generateMetadata(): Promise<Metadata> {
  const config = await getCurrentSiteConfig()
  const canonicalUrl = `https://${config.domain}/privacy`

  return {
    title: `Privacy Policy | ${config.branding.name}`,
    description: `Privacy Policy for ${config.branding.name}. Learn how we collect, use, and protect your personal information.`,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function PrivacyPage() {
  const config = await getCurrentSiteConfig()
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-32 pb-16">
        <div className="container-site">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-gray-400">Last updated: {currentDate}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-site">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="lead text-text-muted">
              At {config.branding.name}, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>

            <h2>Information We Collect</h2>

            <h3>Information Automatically Collected</h3>
            <p>
              When you visit our website, we automatically collect certain information about your device, including:
            </p>
            <ul>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>Geographic location (country/city level)</li>
              <li>Device type (desktop, mobile, tablet)</li>
            </ul>

            <h3>Cookies and Tracking Technologies</h3>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </p>
            <p>
              Types of cookies we use:
            </p>
            <ul>
              <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
            </ul>

            <h2>Google Analytics</h2>
            <p>
              We use Google Analytics and Google Tag Manager to analyze website traffic and improve our services. Google Analytics collects information such as:
            </p>
            <ul>
              <li>How often users visit our site</li>
              <li>What pages they visit</li>
              <li>What other sites they used prior to coming to our site</li>
            </ul>
            <p>
              Google Analytics uses cookies to collect this information. The information generated is transmitted to and stored by Google on servers in the United States. Google may use this data to contextualize and personalize ads in its advertising network.
            </p>
            <p>
              You can opt-out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
            </p>

            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Operate and maintain our website</li>
              <li>Improve and personalize your experience</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new features and functionality</li>
              <li>Monitor and analyze trends, usage, and activities</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. These third-party sites have separate and independent privacy policies. We have no responsibility or liability for the content and activities of these linked sites.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>The right to access your personal data</li>
              <li>The right to correct inaccurate data</li>
              <li>The right to request deletion of your data</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
            </ul>

            <h2>Children&apos;s Privacy</h2>
            <p>
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through our website.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
