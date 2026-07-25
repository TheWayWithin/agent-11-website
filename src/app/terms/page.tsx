import Link from 'next/link'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { formatUpdated } from '@/lib/seo'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              AGENT-11
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/documentation" className="text-gray-600 hover:text-gray-900">Docs</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-gray max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          {/* The date is the day this page's file last changed, from the
              repository history. The old "December 2024" line predated the
              file itself. */}
          <p className="text-lg text-gray-600 mb-8">
            Last updated{' '}
            <time dateTime={PAGE_UPDATED.terms}>{formatUpdated(PAGE_UPDATED.terms)}</time>
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By using AGENT-11, you agree to be bound by these Terms of Service. If you do not 
              agree to these terms, do not use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description of Service</h2>
            <p className="text-gray-700 mb-4">
              AGENT-11 provides AI-powered development tools and agents that help developers 
              execute missions and automate development workflows. Our service includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Project-local AI agent deployment</li>
              <li>Mission execution capabilities</li>
              <li>Development workflow automation</li>
              <li>Code analysis and generation tools</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
            <p className="text-gray-700 mb-4">You agree to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Use the service in compliance with all applicable laws</li>
              <li>Not use the service for illegal or unauthorized purposes</li>
              <li>Maintain the security of your account credentials</li>
              <li>Not attempt to reverse engineer or compromise our systems</li>
              <li>Respect intellectual property rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment and Billing</h2>
            <p className="text-gray-700 mb-4">
              AGENT-11 operates on a mission-based pricing model:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>You pay only for successfully executed missions</li>
              <li>Failed missions are not charged</li>
              <li>Pricing varies by mission complexity and squad size</li>
              <li>Payments are processed securely through third-party providers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              Your code and intellectual property remain yours. AGENT-11 agents process your 
              code locally and do not claim ownership of your work. Our service and underlying 
              technology remain our property.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              AGENT-11 is provided as-is. We are not liable for any damages arising from the 
              use of our service. Your use of AI-generated code is at your own risk and 
              responsibility.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-700 mb-4">
              Either party may terminate this agreement at any time. Upon termination, your 
              access to the service will cease, but you retain ownership of your code and data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We may update these terms from time to time. Continued use of the service 
              constitutes acceptance of updated terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700">
              For questions about these Terms of Service, contact us at{' '}
              <a href="mailto:legal@agent-11.com" className="text-primary-600 hover:text-primary-700">
                legal@agent-11.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}