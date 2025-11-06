'use client'

import { useState } from 'react'
import Link from 'next/link'

interface SupportOption {
  icon: string
  title: string
  description: string
  cta: string
  link: string
  buttonStyle: string
  benefit: string
}

const supportOptions: SupportOption[] = [
  {
    icon: '☕',
    title: 'Buy Me a Coffee',
    description: 'Help fund continued development. Every coffee supports new features, bug fixes, and improved documentation. No obligations, no recurring charges - just appreciation for what you\'ve built.',
    cta: 'Buy Jamie a Coffee',
    link: 'https://buymeacoffee.com/jamiewatters',
    buttonStyle: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    benefit: 'One-time contribution • Completely optional • Show your thanks'
  },
  {
    icon: '⭐',
    title: 'Star on GitHub',
    description: 'Takes 5 seconds, means the world. GitHub stars help other developers discover AGENT-11 and validate the project\'s value. Visibility = more contributors = better framework.',
    cta: 'Star the Repository',
    link: 'https://github.com/TheWayWithin/agent-11',
    buttonStyle: 'bg-gray-700 hover:bg-gray-800 text-white',
    benefit: 'Free • Instant • High Impact'
  },
  {
    icon: '📢',
    title: 'Share Your Experience',
    description: 'Built something cool with AGENT-11? Share your success story. Tweet about your wins, write a blog post, tell other founders. Authentic word-of-mouth is the highest compliment.',
    cta: 'Share on Twitter/X',
    link: 'https://twitter.com/intent/tweet?text=Just%20shipped%20with%20%40agent11_dev%20-%20multi-agent%20dev%20framework%20that%20actually%20works.%20100%25%20free%2C%20saved%20me%2087.5%25%20rework.%20Check%20it%20out%3A%20https%3A%2F%2Fwww.agent-11.com',
    buttonStyle: 'bg-blue-500 hover:bg-blue-600 text-white',
    benefit: 'Community-driven • No cost • Genuine impact'
  }
]

const whySupportMatters = [
  {
    icon: '🚀',
    title: 'Keeps Development Active',
    description: 'Your support funds Jamie\'s time to ship new features, fix bugs faster, and respond to community requests. More support = faster iteration cycles.'
  },
  {
    icon: '✨',
    title: 'Funds New Capabilities',
    description: 'Advanced integrations, better mission types, improved documentation - all require dedicated dev time. Contributions make ambitious features possible.'
  },
  {
    icon: '🙏',
    title: 'Shows Appreciation',
    description: 'Building AGENT-11 took hundreds of hours. If it saved you time or made your life easier, a coffee is a simple way to say thanks.'
  },
  {
    icon: '🌱',
    title: 'Grows the Community',
    description: 'Sustainable open-source requires resources. Your support helps keep AGENT-11 maintained, documented, and improving for everyone.'
  }
]

const freeTierFeatures = [
  'All 11 specialist agents + coordinator',
  '17 mission types (build, deploy, fix, refactor, test)',
  '6 slash commands (/coord, /recon, /design-review, /pmd, /meeting, /report)',
  'Context preservation system (zero context loss)',
  'Extended thinking capabilities',
  'Field Manual (3,000+ lines of documentation)',
  'Memory management system',
  'Unlimited projects & commercial use',
  'Community support (GitHub, Discord)',
  'MIT License (build anything, no royalties)'
]

const faqs = [
  {
    question: 'Is AGENT-11 really 100% free?',
    answer: 'Yes, completely. AGENT-11 is free forever, with no hidden costs, no usage limits, no credit card required, and no feature restrictions. You get the full framework - all 11 agents, all missions, all documentation - under the MIT License. Build unlimited personal or commercial projects. The only "cost" is your time learning it.'
  },
  {
    question: 'Why is AGENT-11 free if it\'s so powerful?',
    answer: 'Jamie built AGENT-11 to solve his own problem as a solo founder - too much to build, not enough hands. Open-sourcing it helps other founders win faster, which aligns with his mission. Plus, a thriving community makes the framework better for everyone. If you find value in it, consider supporting through Buy Me a Coffee or starring the GitHub repo.'
  },
  {
    question: 'Will AGENT-11 always be free?',
    answer: 'Absolutely. AGENT-11 is MIT Licensed, which legally guarantees it stays free forever. Even if Jamie stopped maintaining it tomorrow, the code remains open-source and free to use. That said, community support helps keep development active and ambitious features shipping faster.'
  },
  {
    question: 'How can I support AGENT-11 development?',
    answer: 'Three ways: (1) Buy Jamie a coffee at buymeacoffee.com/jamiewatters - one-time contributions directly fund development time, (2) Star the GitHub repository - visibility helps other developers discover the project, (3) Share your success story - tweet, blog, or tell other founders about wins you\'ve had using AGENT-11.'
  },
  {
    question: 'Where does my Buy Me a Coffee contribution go?',
    answer: '100% to Jamie Watters for continued development. Contributions fund his time to build new features, fix bugs, improve documentation, maintain servers, and respond to community requests. It\'s direct support, no middlemen, no corporate overhead. Think of it like tipping an open-source maintainer who saved you dozens of hours.'
  },
  {
    question: 'Can I use AGENT-11 commercially without paying?',
    answer: 'Yes! MIT License allows unlimited commercial use. Build SaaS products, client projects, internal tools - no royalties, no fees, no restrictions. You don\'t even need attribution (though we appreciate GitHub stars!). Ship revenue-generating products on day one, no strings attached. Supporting via Buy Me a Coffee is optional but appreciated.'
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
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 rounded-full text-sm font-medium text-primary-700 mb-6">
              🎉 FULLY OPEN SOURCE • MIT LICENSE • NO USAGE LIMITS • NO CREDIT CARD EVER
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              100% Free Forever - No Hidden Costs, No Limits
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AGENT-11 is completely free and always will be. Every feature. Every agent. Every mission. Built by solo founders, for solo founders. If you find it valuable, support continued development through our community.
            </p>
          </div>

          {/* Two-Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Left Column: Free & Open Source */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-sm p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free & Open Source</h3>
                <p className="text-gray-600 mb-6">Everything. Forever. No Catches.</p>

                <div className="mb-6">
                  <div className="text-5xl font-bold text-gray-900 mb-1">$0</div>
                  <div className="text-gray-500">Forever - No Credit Card Required</div>
                </div>
              </div>

              <div className="mb-8">
                <ul className="space-y-3">
                  {freeTierFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <span className="text-green-500 mr-2 mt-0.5 flex-shrink-0">✅</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <Link
                  href="/documentation"
                  className="block w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium text-center transition-colors"
                >
                  Deploy Your Squad Now →
                </Link>
                <a
                  href="https://github.com/TheWayWithin/agent-11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-medium text-center transition-colors"
                >
                  ⭐ Star on GitHub
                </a>
              </div>
            </div>

            {/* Right Column: Support the Project */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200 shadow-sm p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Support Jamie&apos;s Work</h3>
                <p className="text-gray-700">
                  AGENT-11 is a passion project. Your support keeps development active and helps ship new features faster.
                </p>
              </div>

              <div className="space-y-6">
                {supportOptions.map((option, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start mb-4">
                      <span className="text-3xl mr-3">{option.icon}</span>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                        <p className="text-xs text-gray-500">{option.benefit}</p>
                      </div>
                    </div>
                    <a
                      href={option.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full py-2.5 px-4 rounded-lg font-medium text-center transition-colors ${option.buttonStyle}`}
                    >
                      {option.cta}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Supporting Helps Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Your Support Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AGENT-11 is built and maintained by Jamie Watters - a solo founder who gets the struggle. Every contribution directly funds development time, server costs, and improvements that benefit the entire community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whySupportMatters.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Common Questions About Free & Support
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about AGENT-11
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  aria-expanded={expandedFaq === index}
                  aria-label={`Toggle answer for: ${faq.question}`}
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

      {/* Footer CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Build with AGENT-11?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Deploy all 11 agents in minutes. No sign-up, no payment, no friction. Start shipping faster today - then decide if you want to support the project later.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/TheWayWithin/agent-11"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started Free →
            </a>
            <a
              href="https://buymeacoffee.com/jamiewatters"
              className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              ☕ Buy Jamie a Coffee
            </a>
            <a
              href="https://github.com/TheWayWithin/agent-11"
              className="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-lg font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              ⭐ Star on GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}