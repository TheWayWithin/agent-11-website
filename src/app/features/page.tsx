'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Mission {
  id: string
  name: string
  emoji: string
  description: string
  duration: string
  complexity: 'Low' | 'Medium' | 'High'
  category: 'Development' | 'Strategic'
  features: string[]
  useCases: string[]
  cost: string
}

const missions: Mission[] = [
  {
    id: 'build',
    name: 'BUILD',
    emoji: '🏗️',
    description: 'New feature development with full stack implementation',
    duration: '4-8 hours',
    complexity: 'Medium',
    category: 'Development',
    cost: '$200-500',
    features: [
      'Full-stack feature implementation',
      'Database schema design',
      'API endpoint creation',
      'Frontend component development',
      'Integration testing',
      'Code documentation'
    ],
    useCases: [
      'User authentication system',
      'Payment processing integration',
      'Real-time notifications',
      'Data visualization dashboard',
      'File upload functionality'
    ]
  },
  {
    id: 'fix',
    name: 'FIX',
    emoji: '🚨',
    description: 'Emergency bug resolution and system recovery',
    duration: '1-3 hours',
    complexity: 'Low',
    category: 'Development',
    cost: '$50-200',
    features: [
      'Root cause analysis',
      'Critical bug fixes',
      'System stability restoration',
      'Regression testing',
      'Hotfix deployment',
      'Incident documentation'
    ],
    useCases: [
      'Production outage recovery',
      'Security vulnerability patches',
      'Performance bottleneck resolution',
      'Data corruption fixes',
      'Integration failures'
    ]
  },
  {
    id: 'mvp',
    name: 'MVP',
    emoji: '🚀',
    description: 'Complete minimum viable product development',
    duration: '1-3 days',
    complexity: 'High',
    category: 'Strategic',
    cost: '$800-2000',
    features: [
      'Full product architecture',
      'Core feature implementation',
      'User interface design',
      'Database setup',
      'Authentication system',
      'Deployment pipeline'
    ],
    useCases: [
      'SaaS platform launch',
      'E-commerce marketplace',
      'Social media application',
      'Project management tool',
      'Content management system'
    ]
  },
  {
    id: 'deploy',
    name: 'DEPLOY',
    emoji: '🌐',
    description: 'Production deployment and infrastructure setup',
    duration: '1-2 hours',
    complexity: 'Low',
    category: 'Development',
    cost: '$100-300',
    features: [
      'Production environment setup',
      'CI/CD pipeline configuration',
      'Domain and SSL setup',
      'Database migration',
      'Performance monitoring',
      'Backup systems'
    ],
    useCases: [
      'First production deployment',
      'Multi-environment setup',
      'Auto-scaling configuration',
      'CDN integration',
      'Database clustering'
    ]
  },
  {
    id: 'optimize',
    name: 'OPTIMIZE',
    emoji: '⚡',
    description: 'Performance optimization and system tuning',
    duration: '3-6 hours',
    complexity: 'Medium',
    category: 'Strategic',
    cost: '$300-800',
    features: [
      'Performance profiling',
      'Database query optimization',
      'Caching strategy implementation',
      'Bundle size reduction',
      'Load testing',
      'Monitoring setup'
    ],
    useCases: [
      'Slow page load optimization',
      'Database performance tuning',
      'API response time improvement',
      'Mobile performance enhancement',
      'Memory usage optimization'
    ]
  },
  {
    id: 'security',
    name: 'SECURITY',
    emoji: '🔒',
    description: 'Security audit and vulnerability remediation',
    duration: '4-6 hours',
    complexity: 'High',
    category: 'Strategic',
    cost: '$400-1000',
    features: [
      'Security vulnerability scanning',
      'Penetration testing',
      'Authentication hardening',
      'Data encryption implementation',
      'Access control review',
      'Compliance assessment'
    ],
    useCases: [
      'Pre-launch security audit',
      'GDPR compliance implementation',
      'PCI DSS certification',
      'OAuth/SSO integration',
      'API security hardening'
    ]
  }
]

const squadSizes = [
  {
    name: 'Minimal',
    agents: 2,
    description: 'Essential agents for basic tasks',
    missions: ['FIX', 'DEPLOY'],
    price: '$50/mission',
    features: ['Bug fixes', 'Simple deployments', 'Basic automation']
  },
  {
    name: 'Core',
    agents: 4,
    description: 'Balanced team for most development needs',
    missions: ['BUILD', 'FIX', 'DEPLOY', 'OPTIMIZE'],
    price: '$200/mission',
    features: ['Feature development', 'Performance optimization', 'Full deployments']
  },
  {
    name: 'Full',
    agents: 11,
    description: 'Complete specialist team for complex projects',
    missions: ['All Missions Available'],
    price: '$500/mission',
    features: ['MVP development', 'Strategic planning', 'Complete solutions']
  }
]

export default function FeaturesPage() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Development' | 'Strategic'>('All')
  const [selectedComplexity, setSelectedComplexity] = useState<'All' | 'Low' | 'Medium' | 'High'>('All')

  const filteredMissions = missions.filter(mission => {
    const categoryMatch = selectedCategory === 'All' || mission.category === selectedCategory
    const complexityMatch = selectedComplexity === 'All' || mission.complexity === selectedComplexity
    return categoryMatch && complexityMatch
  })

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
              <Link href="/features" className="text-primary-600 font-medium">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
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
              11 Proven Missions, One <span className="text-gradient">/coord</span> Command
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From emergency fixes to complete MVPs, execute complex development missions 
              with project-local agents that understand your codebase.
            </p>
          </div>

          {/* Mission Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['All', 'Development', 'Strategic'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category as 'All' | 'Development' | 'Strategic')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['All', 'Low', 'Medium', 'High'].map((complexity) => (
                <button
                  key={complexity}
                  onClick={() => setSelectedComplexity(complexity as 'All' | 'Low' | 'Medium' | 'High')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedComplexity === complexity
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {complexity}
                </button>
              ))}
            </div>
          </div>

          {/* Mission Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredMissions.map((mission) => (
              <div
                key={mission.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{mission.emoji}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{mission.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        mission.category === 'Development' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {mission.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        mission.complexity === 'Low' 
                          ? 'bg-green-100 text-green-700' 
                          : mission.complexity === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {mission.complexity}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{mission.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="font-semibold text-gray-900">{mission.duration}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Cost Range</div>
                    <div className="font-semibold text-green-600">{mission.cost}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                  <ul className="space-y-1">
                    {mission.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                    {mission.features.length > 3 && (
                      <li className="text-sm text-gray-500">
                        +{mission.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Execute {mission.name} Mission
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Squad Sizes Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Squad Size
            </h2>
            <p className="text-xl text-gray-600">
              Different missions require different expertise levels. Scale your team based on complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {squadSizes.map((squad, index) => (
              <div
                key={squad.name}
                className={`bg-white rounded-xl p-6 border-2 ${
                  index === 1 
                    ? 'border-primary-500 shadow-lg scale-105' 
                    : 'border-gray-200'
                }`}
              >
                {index === 1 && (
                  <div className="bg-primary-500 text-white text-sm font-medium px-3 py-1 rounded-full text-center mb-4">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{squad.name}</h3>
                  <div className="text-4xl font-bold text-primary-600 mb-2">{squad.agents}</div>
                  <div className="text-gray-600">AI Specialists</div>
                </div>

                <p className="text-gray-600 text-center mb-6">{squad.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Available Missions</h4>
                  <div className="space-y-2">
                    {squad.missions.map((mission, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                        {mission}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Capabilities</h4>
                  <div className="space-y-2">
                    {squad.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center pt-6 border-t border-gray-100">
                  <div className="text-2xl font-bold text-gray-900 mb-4">{squad.price}</div>
                  <button className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
                    index === 1
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}>
                    Deploy {squad.name} Squad
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Execute Your First Mission?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Deploy project-local agents that understand your codebase and execute missions with precision.
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
              Deploy Your Squad
            </Link>
            <Link 
              href="/documentation"
              className="inline-flex items-center px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-medium transition-colors"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}