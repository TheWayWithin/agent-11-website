'use client'

import { useState } from 'react'
import Link from 'next/link'

interface DocSection {
  id: string
  title: string
  description: string
  content: React.ReactNode
}

const docSections: DocSection[] = [
  {
    id: 'quick-start',
    title: 'Quick Start Guide',
    description: 'Get up and running with AGENT-11 in under 5 minutes',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Installation</h3>
          <p className="text-gray-600 mb-4">Deploy your project-local squad with a single command:</p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
            <div className="text-green-400">
              $ curl -sSL https://raw.githubusercontent.com/TheWayWithin/agent-11/main/deployment/scripts/install.sh | bash -s core
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">This installs the Core squad (4 agents) to your project directory.</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Your First Mission</h3>
          <p className="text-gray-600 mb-4">Execute your first mission with the /coord command:</p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm space-y-2">
            <div className="text-green-400">$ /coord build "User authentication system"</div>
            <div className="text-blue-400">🎯 Mission: BUILD initiated | Duration: 4-8 hours</div>
            <div className="text-purple-400">🧠 COORDINATOR: Breaking down requirements...</div>
            <div className="text-yellow-400">🏗️ ARCHITECT: Designing system architecture...</div>
            <div className="text-green-300">✅ Mission complete! 47 tests passed, security validated.</div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Available Squad Sizes</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-semibold text-gray-900">Minimal (2 agents)</div>
              <div className="text-sm text-gray-600">Perfect for fixes and simple tasks</div>
              <div className="text-xs text-gray-500 mt-2">bash -s minimal</div>
            </div>
            <div className="bg-primary-50 p-4 rounded-lg border-2 border-primary-200">
              <div className="font-semibold text-gray-900">Core (4 agents)</div>
              <div className="text-sm text-gray-600">Ideal for most development needs</div>
              <div className="text-xs text-gray-500 mt-2">bash -s core</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-semibold text-gray-900">Full (11 agents)</div>
              <div className="text-sm text-gray-600">Complete team for complex projects</div>
              <div className="text-xs text-gray-500 mt-2">bash -s full</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'mission-reference',
    title: 'Mission Reference',
    description: 'Complete guide to all 11 available missions',
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Development Missions</h3>
          <div className="space-y-6">
            {[
              {
                name: 'BUILD',
                description: 'New feature development (4-8 hours)',
                usage: '/coord build "Feature description"',
                example: '/coord build "User profile management with image upload"'
              },
              {
                name: 'FIX',
                description: 'Emergency bug resolution (1-3 hours)',
                usage: '/coord fix "Bug description"',
                example: '/coord fix "Memory leak in image processing module"'
              },
              {
                name: 'DEPLOY',
                description: 'Production deployment (1-2 hours)',
                usage: '/coord deploy [environment]',
                example: '/coord deploy production'
              },
              {
                name: 'REFACTOR',
                description: 'Code quality improvement (2-4 hours)',
                usage: '/coord refactor "Target description"',
                example: '/coord refactor "Payment processing module for better maintainability"'
              },
              {
                name: 'DOCUMENT',
                description: 'Documentation creation (2-4 hours)',
                usage: '/coord document "Documentation scope"',
                example: '/coord document "API endpoints and authentication flow"'
              }
            ].map((mission, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mr-3">
                    {mission.name}
                  </div>
                  <div className="text-gray-600">{mission.description}</div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Usage: </span>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">{mission.usage}</code>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Example: </span>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">{mission.example}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Strategic Missions</h3>
          <div className="space-y-6">
            {[
              {
                name: 'MVP',
                description: 'Minimum viable product (1-3 days)',
                usage: '/coord mvp "Product description"',
                example: '/coord mvp "Task management SaaS with team collaboration"'
              },
              {
                name: 'MIGRATE',
                description: 'System migration (4-8 hours)',
                usage: '/coord migrate "Migration description"',
                example: '/coord migrate "From MySQL to PostgreSQL with zero downtime"'
              },
              {
                name: 'OPTIMIZE',
                description: 'Performance optimization (3-6 hours)',
                usage: '/coord optimize "Optimization target"',
                example: '/coord optimize "Database queries and API response times"'
              },
              {
                name: 'SECURITY',
                description: 'Security audit & fixes (4-6 hours)',
                usage: '/coord security [scope]',
                example: '/coord security "Authentication and data protection audit"'
              },
              {
                name: 'INTEGRATE',
                description: 'Third-party integration (3-6 hours)',
                usage: '/coord integrate "Integration description"',
                example: '/coord integrate "Stripe payment processing with webhooks"'
              },
              {
                name: 'RELEASE',
                description: 'Release management (2-4 hours)',
                usage: '/coord release [version]',
                example: '/coord release v2.1.0'
              }
            ].map((mission, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mr-3">
                    {mission.name}
                  </div>
                  <div className="text-gray-600">{mission.description}</div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Usage: </span>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">{mission.usage}</code>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Example: </span>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">{mission.example}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'agent-roles',
    title: 'Agent Roles & Specialties',
    description: 'Meet your 11 AI specialists and their unique capabilities',
    content: (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'THE COORDINATOR', emoji: '🧠', specialty: 'Mission orchestration and agent coordination', squad: 'All' },
            { name: 'THE DEVELOPER', emoji: '💻', specialty: 'Full-stack development and implementation', squad: 'All' },
            { name: 'THE ARCHITECT', emoji: '🏗️', specialty: 'System design and technical architecture', squad: 'Core+' },
            { name: 'THE TESTER', emoji: '🧪', specialty: 'Quality assurance and automated testing', squad: 'Core+' },
            { name: 'THE STRATEGIST', emoji: '🎯', specialty: 'Product requirements and strategic planning', squad: 'Full' },
            { name: 'THE OPERATOR', emoji: '⚙️', specialty: 'DevOps, deployment, and infrastructure', squad: 'Full' },
            { name: 'THE MARKETER', emoji: '📈', specialty: 'Growth strategy and user acquisition', squad: 'Full' },
            { name: 'THE SUPPORT', emoji: '🤝', specialty: 'Customer support and issue resolution', squad: 'Full' },
            { name: 'THE DOCUMENTER', emoji: '📚', specialty: 'Technical documentation and knowledge', squad: 'Full' },
            { name: 'THE ANALYST', emoji: '📊', specialty: 'Data analysis and performance metrics', squad: 'Full' },
            { name: 'THE DESIGNER', emoji: '🎨', specialty: 'UI/UX design and user experience', squad: 'Full' }
          ].map((agent, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">{agent.emoji}</div>
                <div>
                  <div className="font-semibold text-gray-900">{agent.name}</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    agent.squad === 'All' ? 'bg-green-100 text-green-700' :
                    agent.squad === 'Core+' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {agent.squad} Squad{agent.squad !== 'All' ? 's' : ''}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{agent.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'configuration',
    title: 'Configuration & Customization',
    description: 'Advanced configuration options and customization',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Project Configuration</h3>
          <p className="text-gray-600 mb-4">
            AGENT-11 automatically detects your project context, but you can customize behavior with a configuration file:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
            <div className="text-gray-400"># .agent11/config.yaml</div>
            <div className="text-white mt-2">
              <div>project:</div>
              <div className="ml-4">name: "my-awesome-app"</div>
              <div className="ml-4">stack: ["nextjs", "typescript", "tailwind"]</div>
              <div className="ml-4">database: "postgresql"</div>
              <div className="mt-2">missions:</div>
              <div className="ml-4">build:</div>
              <div className="ml-8">timeout: "8h"</div>
              <div className="ml-8">test_required: true</div>
              <div className="ml-4">deploy:</div>
              <div className="ml-8">environment: "staging"</div>
              <div className="ml-8">auto_migrate: true</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Environment Variables</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900">Variable</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900">Description</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900">Default</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">AGENT11_SQUAD_SIZE</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Squad size (minimal, core, full)</td>
                  <td className="px-4 py-2 text-sm text-gray-500">core</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">AGENT11_LOG_LEVEL</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Logging verbosity (debug, info, warn, error)</td>
                  <td className="px-4 py-2 text-sm text-gray-500">info</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono text-sm">AGENT11_AUTO_APPROVE</td>
                  <td className="px-4 py-2 text-sm text-gray-600">Skip manual approval for low-risk missions</td>
                  <td className="px-4 py-2 text-sm text-gray-500">false</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Custom Missions</h3>
          <p className="text-gray-600 mb-4">
            Full Squad customers can create custom missions tailored to their workflows:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
            <div className="text-gray-400"># .agent11/missions/custom-deploy.yaml</div>
            <div className="text-white mt-2">
              <div>name: "custom-deploy"</div>
              <div>description: "Deploy with custom validation"</div>
              <div>agents: ["coordinator", "developer", "tester", "operator"]</div>
              <div>steps:</div>
              <div className="ml-4">- name: "Run custom tests"</div>
              <div className="ml-8">agent: "tester"</div>
              <div className="ml-8">command: "npm run test:e2e"</div>
              <div className="ml-4">- name: "Deploy to staging"</div>
              <div className="ml-8">agent: "operator"</div>
              <div className="ml-8">command: "kubectl apply -f k8s/"</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Common issues and solutions',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Issues</h3>
          <div className="space-y-4">
            {[
              {
                issue: "Mission fails with 'insufficient context' error",
                solution: "Ensure you're running from your project root directory and that your project has a package.json, requirements.txt, or similar configuration file."
              },
              {
                issue: "Agents seem to be making incorrect assumptions",
                solution: "Add a .agent11/context.md file with project-specific information, architecture decisions, and coding standards."
              },
              {
                issue: "Mission takes longer than expected",
                solution: "Check the mission log with '/coord status' to see current progress. Complex missions may require multiple iterations."
              },
              {
                issue: "Installation fails on Windows",
                solution: "Use WSL2 or Git Bash. PowerShell installation coming in v2.1."
              },
              {
                issue: "Cannot execute strategic missions",
                solution: "Strategic missions (MVP, MIGRATE, SECURITY, etc.) require the Full squad. Upgrade with 'agent11 upgrade full'."
              }
            ].map((item, index) => (
              <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="font-semibold text-gray-900 mb-2">❓ {item.issue}</div>
                <div className="text-gray-700">{item.solution}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Getting Help</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">📖 Documentation</h4>
              <p className="text-gray-600 text-sm mb-3">Comprehensive guides and references</p>
              <Link href="/documentation" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Browse Documentation →
              </Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">💬 Discord Community</h4>
              <p className="text-gray-600 text-sm mb-3">Get help from the community</p>
              <Link href="/discord" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Join Discord →
              </Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">🐛 GitHub Issues</h4>
              <p className="text-gray-600 text-sm mb-3">Report bugs and request features</p>
              <a href="https://github.com/TheWayWithin/agent-11/issues" className="text-primary-600 hover:text-primary-700 text-sm font-medium" target="_blank" rel="noopener noreferrer">
                Open Issue →
              </a>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">📧 Support</h4>
              <p className="text-gray-600 text-sm mb-3">Direct support for complex issues</p>
              <Link href="/support" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
]

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('quick-start')

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
              <Link href="/documentation" className="text-primary-600 font-medium">Docs</Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Documentation</h2>
              <nav className="space-y-2">
                {docSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden mb-8">
            <select
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {docSections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </select>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {docSections.map((section) => (
              <div
                key={section.id}
                className={`${activeSection === section.id ? 'block' : 'hidden'}`}
              >
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{section.title}</h1>
                  <p className="text-xl text-gray-600">{section.description}</p>
                </div>
                <div className="prose prose-gray max-w-none">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-primary-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Deploy Your Squad?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start executing missions with project-local agents that understand your codebase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://github.com/TheWayWithin/agent-11"
              className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Start Building
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