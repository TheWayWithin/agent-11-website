import Link from 'next/link'

export default function SupportPage() {
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
              <Link href="/support" className="text-primary-600 font-medium">Support</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            How can we help you?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get the support you need to succeed with AGENT-11. From quick answers to technical deep-dives.
          </p>
        </div>
      </section>

      {/* Support Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get Help Your Way
            </h2>
            <p className="text-xl text-gray-600">
              Choose the support channel that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link
              href="/documentation"
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                Documentation
              </h3>
              <p className="text-gray-600 mb-4">Comprehensive guides, API references, and mission tutorials</p>
              <div className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                Get help →
              </div>
            </Link>

            <Link
              href="/discord"
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                Discord Community
              </h3>
              <p className="text-gray-600 mb-4">Get help from 4,800+ developers and the AGENT-11 team</p>
              <div className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                Get help →
              </div>
            </Link>

            <a
              href="https://github.com/TheWayWithin/agent-11/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow group"
            >
              <div className="text-4xl mb-4">🐛</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                GitHub Issues
              </h3>
              <p className="text-gray-600 mb-4">Report bugs, request features, and track development</p>
              <div className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                Get help →
              </div>
            </a>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow group">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                Email Support
              </h3>
              <p className="text-gray-600 mb-4">Direct support for technical issues and setup questions</p>
              <div className="text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                Get help →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about AGENT-11
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How do I install AGENT-11?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Run: curl -sSL https://raw.githubusercontent.com/TheWayWithin/agent-11/main/project/deployment/scripts/install.sh | bash -s full
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Which squad size should I choose?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Minimal (2 agents) for simple fixes, Core (4 agents) for most development tasks, and Full (11 agents) for complex projects and strategic missions like MVP development.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How much does AGENT-11 cost?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                AGENT-11 is free and open source (MIT). There are no licence fees and no per-mission charges. Your only cost is your own Claude Code / Anthropic API usage, which depends on how much you run it.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Is my code secure with AGENT-11?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                AGENT-11 is a set of files installed locally in your project&apos;s .claude/ directory; the agents and your code stay in your repo. Like any Claude Code session, the code and context you work on are processed by Claude (Anthropic). There is no AGENT-11 server, and nothing is sent to us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Start Your First Mission?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Deploy your AI development squad and execute your first mission today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://github.com/TheWayWithin/agent-11"
              className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Building
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