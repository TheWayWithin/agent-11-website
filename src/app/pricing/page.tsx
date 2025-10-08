'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PricingTier {
  name: string
  agents: number
  description: string
  price: {
    monthly: number
    perMission: string
    annual: number
  }
  features: string[]
  missions: string[]
  useCases: string[]
  recommended?: boolean
  popular?: boolean
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Minimal Squad',
    agents: 2,
    description: 'Perfect for solo developers and small fixes',
    price: {
      monthly: 0,
      perMission: '$50-200',
      annual: 0
    },
    features: [
      'The Developer + The Coordinator',
      'Bug fixes and hotfixes',
      'Basic deployments',
      'Simple automation tasks',
      'Community support',
      'GitHub integration'
    ],
    missions: [
      'FIX - Emergency bug resolution',
      'DEPLOY - Basic deployments',
      'DOCUMENT - Simple documentation'
    ],
    useCases: [
      'Personal projects',
      'Bug fixes',
      'Learning and experimentation',
      'Simple automation'
    ]
  },
  {
    name: 'Core Squad',
    agents: 4,
    description: 'Ideal for most development teams and startups',
    price: {
      monthly: 99,
      perMission: '$200-500',
      annual: 999
    },
    features: [
      'Developer + Coordinator + Architect + Tester',
      'Feature development',
      'Performance optimization',
      'Full deployment pipeline',
      'Priority support',
      'Advanced integrations',
      'Team collaboration tools'
    ],
    missions: [
      'BUILD - New feature development',
      'FIX - Emergency resolution',
      'DEPLOY - Production deployments',
      'OPTIMIZE - Performance tuning',
      'REFACTOR - Code improvements'
    ],
    useCases: [
      'Startup MVPs',
      'Feature development',
      'Performance optimization',
      'Production deployments'
    ],
    popular: true,
    recommended: true
  },
  {
    name: 'Full Squad',
    agents: 11,
    description: 'Complete team for enterprise and complex projects',
    price: {
      monthly: 299,
      perMission: '$500-2000',
      annual: 2999
    },
    features: [
      'All 11 specialist agents',
      'Complete mission library',
      'Strategic planning',
      'Enterprise integrations',
      'Dedicated support',
      'Custom mission creation',
      'Advanced analytics',
      'White-label options'
    ],
    missions: [
      'MVP - Complete product development',
      'MIGRATE - System migrations',
      'SECURITY - Security audits',
      'INTEGRATE - Third-party integrations',
      'RELEASE - Release management',
      'All other missions included'
    ],
    useCases: [
      'Enterprise applications',
      'Complex system migrations',
      'Multi-team coordination',
      'Complete product development'
    ]
  }
]

const faqs = [
  {
    question: 'How does per-mission pricing work?',
    answer: 'Each mission has a fixed price range based on complexity. You only pay when you execute a mission, and the cost is determined by the actual work completed. No hidden fees or hourly charges.'
  },
  {
    question: 'What happens if a mission takes longer than expected?',
    answer: 'Mission pricing is fixed regardless of duration. If a BUILD mission is quoted at $400, you pay $400 whether it takes 4 hours or 8 hours. Our agents are optimized for efficiency and accuracy.'
  },
  {
    question: 'Can I upgrade or downgrade my squad size?',
    answer: 'Yes, you can change your squad size at any time. Larger squads can execute more complex missions, while smaller squads are perfect for simpler tasks. No long-term contracts required.'
  },
  {
    question: 'Do you offer custom missions?',
    answer: 'Full Squad customers can create custom missions tailored to their specific workflows. We can also develop organization-specific missions for enterprise customers.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! New users get 3 free FIX missions to experience the system. No credit card required for the trial period.'
  },
  {
    question: 'How do project-local agents work?',
    answer: 'Agents are deployed to your specific project directory and understand your codebase, dependencies, and architecture. This context awareness enables more accurate and relevant mission execution.'
  }
]

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly')
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
              Simple, Mission-Based Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Pay only for the missions you execute. No hourly rates, no hidden fees. 
              Choose your squad size based on project complexity.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-8">
              <span className={`mr-3 ${billingPeriod === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingPeriod === 'annual' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`ml-3 ${billingPeriod === 'annual' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Annual
              </span>
              {billingPeriod === 'annual' && (
                <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Save 17%
                </span>
              )}
            </div>
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
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-5xl font-bold text-gray-900 mb-1">
                      {tier.price[billingPeriod] === 0 ? 'Free' : `$${tier.price[billingPeriod]}`}
                    </div>
                    {tier.price[billingPeriod] !== 0 && (
                      <div className="text-gray-500">
                        per {billingPeriod === 'monthly' ? 'month' : 'year'}
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-6">
                    <div className="text-sm text-gray-600">Mission Cost Range</div>
                    <div className="text-lg font-semibold text-primary-600">{tier.price.perMission}</div>
                  </div>

                  <div className="flex items-center justify-center mb-6">
                    <div className="text-4xl font-bold text-primary-600 mr-2">{tier.agents}</div>
                    <div className="text-gray-600">AI Specialists</div>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
                    <ul className="space-y-2">
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

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Available Missions</h4>
                    <ul className="space-y-2">
                      {tier.missions.map((mission, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                          {mission}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Best For</h4>
                    <ul className="space-y-1">
                      {tier.useCases.map((useCase, idx) => (
                        <li key={idx} className="text-sm text-gray-600">
                          • {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  tier.popular
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}>
                  {tier.price[billingPeriod] === 0 ? 'Start Free' : `Choose ${tier.name}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mission Comparison
            </h2>
            <p className="text-xl text-gray-600">
              See which missions are available with each squad size
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Mission</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900">Duration</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900">Minimal</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900">Core</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-900">Full</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { name: 'FIX', description: 'Emergency bug resolution', duration: '1-3h', minimal: true, core: true, full: true },
                    { name: 'DEPLOY', description: 'Production deployment', duration: '1-2h', minimal: true, core: true, full: true },
                    { name: 'BUILD', description: 'New feature development', duration: '4-8h', minimal: false, core: true, full: true },
                    { name: 'REFACTOR', description: 'Code quality improvement', duration: '2-4h', minimal: false, core: true, full: true },
                    { name: 'OPTIMIZE', description: 'Performance optimization', duration: '3-6h', minimal: false, core: true, full: true },
                    { name: 'DOCUMENT', description: 'Documentation creation', duration: '2-4h', minimal: true, core: true, full: true },
                    { name: 'MVP', description: 'Minimum viable product', duration: '1-3d', minimal: false, core: false, full: true },
                    { name: 'MIGRATE', description: 'System migration', duration: '4-8h', minimal: false, core: false, full: true },
                    { name: 'SECURITY', description: 'Security audit & fixes', duration: '4-6h', minimal: false, core: false, full: true },
                    { name: 'INTEGRATE', description: 'Third-party integration', duration: '3-6h', minimal: false, core: false, full: true },
                    { name: 'RELEASE', description: 'Release management', duration: '2-4h', minimal: false, core: false, full: true }
                  ].map((mission, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{mission.name}</div>
                        <div className="text-sm text-gray-600">{mission.description}</div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">{mission.duration}</td>
                      <td className="px-6 py-4 text-center">
                        {mission.minimal ? (
                          <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {mission.core ? (
                          <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
            Ready to Start Your First Mission?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Deploy your AI development squad and execute your first mission today. 
            No setup fees, no hourly charges - just results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://github.com/TheWayWithin/agent-11"
              className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Start 3 Free Missions
            </Link>
            <Link 
              href="/features"
              className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-lg font-medium transition-colors"
            >
              View All Features
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}