'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PricingTier {
  name: string
  description: string
  price: string
  priceSubtext?: string
  features: string[]
  cta: string
  ctaLink: string
  recommended?: boolean
  popular?: boolean
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Open Source',
    description: 'Complete framework for solo founders and teams',
    price: '$0',
    priceSubtext: 'Forever',
    features: [
      'Full AGENT-11 framework access',
      'All 11 specialist agents + coordinator',
      '17 mission types',
      '6 slash commands (/coord, /recon, /design-review, etc.)',
      'Context preservation system',
      'Field Manual (1,370+ lines)',
      'Community support (GitHub issues)',
      'Unlimited projects',
      'Commercial use allowed',
      'MIT License'
    ],
    cta: 'Deploy Now',
    ctaLink: '/documentation'
  },
  {
    name: 'Pro Support',
    description: 'Expert guidance for production deployments',
    price: '$99',
    priceSubtext: 'per month',
    features: [
      'Everything in Open Source, plus:',
      'Priority email support (48h response)',
      'Monthly office hours (video call)',
      'Best practices consulting',
      'Architecture review',
      'Performance optimization guidance',
      'Early access to new features',
      'Direct Slack/Discord channel'
    ],
    cta: 'Contact for Pro Support',
    ctaLink: '/support',
    popular: true,
    recommended: true
  },
  {
    name: 'Enterprise',
    description: 'Custom solutions for large organizations',
    price: 'Custom',
    priceSubtext: 'Pricing',
    features: [
      'Everything in Pro Support, plus:',
      'Dedicated support channel',
      'Custom agent development',
      'Private training sessions',
      'Custom integrations',
      'SLA guarantees',
      'White-glove onboarding',
      'Unlimited support tickets',
      'Annual strategic review'
    ],
    cta: 'Schedule Enterprise Demo',
    ctaLink: '/support'
  }
]

const faqs = [
  {
    question: 'Is AGENT-11 really free?',
    answer: 'Yes! AGENT-11 is 100% free and open-source under the MIT License. You get full access to all 11 agents, all mission types, and all features. There are no hidden fees, no usage limits, and no credit card required. You can use it for unlimited personal and commercial projects.'
  },
  {
    question: 'What&apos;s included in the open-source version?',
    answer: 'Everything. The open-source version includes all 11 specialist agents, the coordinator, 17 mission types, 6 slash commands, context preservation system, Field Manual documentation, and full commercial usage rights. It&apos;s the complete framework with no artificial limitations.'
  },
  {
    question: 'When should I upgrade to Pro Support?',
    answer: 'Pro Support is ideal when you need expert guidance for production deployments, architecture reviews, or performance optimization. If you&apos;re shipping mission-critical applications and want priority access to maintainers, monthly office hours, and best practices consulting, Pro Support is worth it.'
  },
  {
    question: 'Can I use AGENT-11 commercially?',
    answer: 'Absolutely! AGENT-11 is released under the MIT License, which allows unlimited commercial use. Build SaaS products, client projects, or internal tools - no royalties, no attribution required (though we appreciate GitHub stars!).'
  },
  {
    question: 'What&apos;s the difference between Pro and Enterprise?',
    answer: 'Pro Support is designed for individual developers and small teams who need expert guidance. Enterprise is for organizations requiring custom agent development, dedicated support channels, SLA guarantees, and white-glove onboarding. Enterprise includes custom integrations and private training sessions.'
  },
  {
    question: 'How do I get started?',
    answer: 'Visit our documentation page for the single-command installation. Deploy AGENT-11 to your project, and you&apos;ll have access to all agents immediately. The /coord command orchestrates multi-agent missions, and our Field Manual provides comprehensive guidance for every use case.'
  }
]

export default function PricingPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

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
              <Link href="/pricing" className="text-primary-600 font-medium">Pricing</Link>
              <Link href="/documentation" className="text-gray-600 hover:text-gray-900">Docs</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Get Started Free - Open Source Framework
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              AGENT-11 is 100% free and open-source. Deploy all 11 agents, use all features, build unlimited projects. Optional support plans available for teams that need expert guidance.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-white rounded-2xl border-2 p-8 ${
                  tier.popular
                    ? 'border-primary-500 shadow-xl scale-105'
                    : 'border-gray-200 shadow-sm'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary-500 text-white text-sm font-medium px-4 py-2 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-gray-600 mb-6">{tier.description}</p>

                  <div className="mb-6">
                    <div className="text-5xl font-bold text-gray-900 mb-1">
                      {tier.price}
                    </div>
                    {tier.priceSubtext && (
                      <div className="text-gray-500">
                        {tier.priceSubtext}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={tier.ctaLink}
                  className={`block w-full py-3 px-6 rounded-lg font-medium text-center transition-colors ${
                    tier.popular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about AGENT-11 pricing
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Deploy Your AI Squad?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get started with AGENT-11 in minutes. 100% free, no credit card required, no usage limits. Deploy all 11 agents and start shipping faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://github.com/TheWayWithin/agent-11"
              className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started Free
            </Link>
            <Link
              href="/documentation"
              className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-lg font-medium transition-colors"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}