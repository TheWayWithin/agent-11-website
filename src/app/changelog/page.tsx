import Link from 'next/link'

interface ChangelogEntry {
  version: string
  date: string
  type: 'Major' | 'Minor' | 'Patch'
  changes: {
    category: 'Added' | 'Fixed' | 'Changed' | 'Removed' | 'Security'
    items: string[]
  }[]
}

const changelogEntries: ChangelogEntry[] = [
  {
    version: '2.1.0',
    date: '2024-12-15',
    type: 'Major',
    changes: [
      {
        category: 'Added',
        items: [
          '/coord command for mission execution',
          'Mission-based workflow system',
          'Project-local agent deployment',
          'Automatic project context detection',
          'Squad size selection (minimal, core, full)',
          'Interactive mission progress tracking'
        ]
      },
      {
        category: 'Changed',
        items: [
          'Simplified installation to single command',
          'Restructured agent roles and responsibilities',
          'Improved mission handoff between agents',
          'Enhanced error handling and recovery'
        ]
      }
    ]
  },
  {
    version: '2.0.3',
    date: '2024-12-01',
    type: 'Patch',
    changes: [
      {
        category: 'Fixed',
        items: [
          'Memory leak in long-running missions',
          'Windows compatibility issues',
          'Agent communication timeouts',
          'Project context parsing errors'
        ]
      },
      {
        category: 'Security',
        items: [
          'Enhanced API key protection',
          'Improved sandbox isolation',
          'Updated dependency vulnerabilities'
        ]
      }
    ]
  },
  {
    version: '2.0.0',
    date: 'November 18, 2024',
    type: 'Major',
    changes: [
      {
        category: 'Added',
        items: [
          'Complete rewrite with improved architecture',
          '11 specialized AI agents',
          'Automated deployment pipeline',
          'Real-time collaboration features',
          'Enterprise-grade security',
          'Advanced mission analytics'
        ]
      },
      {
        category: 'Removed',
        items: [
          'Legacy command structure',
          'Manual agent coordination',
          'Deprecated configuration options'
        ]
      }
    ]
  },
  {
    version: '1.5.2',
    date: 'October 25, 2024',
    type: 'Patch',
    changes: [
      {
        category: 'Fixed',
        items: [
          'Performance issues with large codebases',
          'Agent timeout handling',
          'Deployment rollback mechanism'
        ]
      }
    ]
  },
  {
    version: '1.5.0',
    date: 'October 10, 2024',
    type: 'Minor',
    changes: [
      {
        category: 'Added',
        items: [
          'Multi-language support',
          'Custom mission templates',
          'Enhanced logging and debugging',
          'Team collaboration features'
        ]
      },
      {
        category: 'Changed',
        items: [
          'Improved agent communication protocol',
          'Faster mission execution times',
          'Better resource management'
        ]
      }
    ]
  }
]

export default function ChangelogPage() {
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
              <Link href="/changelog" className="text-primary-600 font-medium">Changelog</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Changelog
            </h1>
            <p className="text-xl text-gray-600">
              Track the evolution of AGENT-11 with detailed release notes and feature updates.
            </p>
          </div>

          {/* Changelog Entries */}
          <div className="space-y-12">
            {changelogEntries.map((entry, index) => (
              <div key={index} className="relative">
                {/* Version Header */}
                <div className="flex items-center mb-6">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mr-4 ${
                    entry.type === 'Major' ? 'bg-red-100 text-red-700' :
                    entry.type === 'Minor' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {entry.type} Release
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    v{entry.version}
                  </h2>
                  <span className="text-gray-500 ml-4">{entry.date}</span>
                </div>

                {/* Changes */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="space-y-6">
                    {entry.changes.map((change, changeIndex) => (
                      <div key={changeIndex}>
                        <h3 className={`text-lg font-semibold mb-3 flex items-center ${
                          change.category === 'Added' ? 'text-green-700' :
                          change.category === 'Fixed' ? 'text-blue-700' :
                          change.category === 'Changed' ? 'text-yellow-700' :
                          change.category === 'Removed' ? 'text-red-700' :
                          'text-purple-700'
                        }`}>
                          {change.category === 'Added' && '✨'}
                          {change.category === 'Fixed' && '🐛'}
                          {change.category === 'Changed' && '🔄'}
                          {change.category === 'Removed' && '🗑️'}
                          {change.category === 'Security' && '🔒'}
                          <span className="ml-2">{change.category}</span>
                        </h3>
                        <ul className="space-y-2">
                          {change.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start text-gray-700">
                              <div className={`w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0 ${
                                change.category === 'Added' ? 'bg-green-500' :
                                change.category === 'Fixed' ? 'bg-blue-500' :
                                change.category === 'Changed' ? 'bg-yellow-500' :
                                change.category === 'Removed' ? 'bg-red-500' :
                                'bg-purple-500'
                              }`}></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline connector */}
                {index < changelogEntries.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-16 bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>

          {/* Migration Guides */}
          <div className="mt-16 bg-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Migration Guides
            </h2>
            <p className="text-gray-600 mb-6">
              Need help upgrading? We&apos;ve got you covered with detailed migration guides for major version changes.
            </p>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">v1.x to v2.x Migration Guide</div>
                  <div className="text-sm text-gray-600">Complete guide for upgrading to the new mission-based system</div>
                </div>
                <Link href="/documentation" className="text-primary-600 hover:text-primary-700 font-medium">
                  View Guide →
                </Link>
              </div>
              <div className="bg-white rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">Breaking Changes in v2.1</div>
                  <div className="text-sm text-gray-600">Important changes and new /coord command syntax</div>
                </div>
                <Link href="/documentation" className="text-primary-600 hover:text-primary-700 font-medium">
                  View Guide →
                </Link>
              </div>
            </div>
          </div>

          {/* Roadmap Preview */}
          <div className="mt-16 bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What&apos;s Coming Next
            </h2>
            <p className="text-gray-600 mb-6">
              Peek at what we&apos;re working on for future releases.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    v2.2.0
                  </div>
                  <span className="text-gray-500 ml-2">Q1 2025</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Enhanced Integrations</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Slack and Discord bot integration</li>
                  <li>• GitHub Actions workflows</li>
                  <li>• Jira and Linear ticket sync</li>
                  <li>• Custom webhook support</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    v2.3.0
                  </div>
                  <span className="text-gray-500 ml-2">Q2 2025</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Enterprise Features</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Multi-tenant support</li>
                  <li>• Advanced analytics dashboard</li>
                  <li>• Role-based access control</li>
                  <li>• Audit logging and compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get notified about new releases, features, and important updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Or follow us on{' '}
            <a href="https://github.com/TheWayWithin/agent-11" className="text-primary-600 hover:text-primary-700" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>{' '}
            for real-time updates.
          </p>
        </div>
      </section>
    </main>
  )
}