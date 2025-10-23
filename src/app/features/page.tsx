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
    features: ['Full-stack feature implementation', 'Database schema design', 'API endpoint creation', 'Frontend component development', 'Integration testing', 'Code documentation'],
    useCases: ['User authentication system', 'Payment processing integration', 'Real-time notifications', 'Data visualization dashboard', 'File upload functionality']
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
    features: ['Root cause analysis', 'Critical bug fixes', 'System stability restoration', 'Regression testing', 'Hotfix deployment', 'Incident documentation'],
    useCases: ['Production outage recovery', 'Security vulnerability patches', 'Performance bottleneck resolution', 'Data corruption fixes', 'Integration failures']
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
    features: ['Full product architecture', 'Core feature implementation', 'User interface design', 'Database setup', 'Authentication system', 'Deployment pipeline'],
    useCases: ['SaaS platform launch', 'E-commerce marketplace', 'Social media application', 'Project management tool', 'Content management system']
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
    features: ['Production environment setup', 'CI/CD pipeline configuration', 'Domain and SSL setup', 'Database migration', 'Performance monitoring', 'Backup systems'],
    useCases: ['First production deployment', 'Multi-environment setup', 'Auto-scaling configuration', 'CDN integration', 'Database clustering']
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
    features: ['Performance profiling', 'Database query optimization', 'Caching strategy implementation', 'Bundle size reduction', 'Load testing', 'Monitoring setup'],
    useCases: ['Slow page load optimization', 'Database performance tuning', 'API response time improvement', 'Mobile performance enhancement', 'Memory usage optimization']
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
    features: ['Security vulnerability scanning', 'Penetration testing', 'Authentication hardening', 'Data encryption implementation', 'Access control review', 'Compliance assessment'],
    useCases: ['Pre-launch security audit', 'GDPR compliance implementation', 'PCI DSS certification', 'OAuth/SSO integration', 'API security hardening']
  },
  {
    id: 'refactor',
    name: 'REFACTOR',
    emoji: '♻️',
    description: 'Code quality improvement and technical debt reduction',
    duration: '2-4 hours',
    complexity: 'Medium',
    category: 'Development',
    cost: '$150-400',
    features: ['Code structure improvement', 'Design pattern implementation', 'Dependency updates', 'Test coverage expansion', 'Documentation updates', 'Performance optimization'],
    useCases: ['Legacy code modernization', 'Architecture improvement', 'Module extraction', 'API redesign', 'Database schema optimization']
  },
  {
    id: 'document',
    name: 'DOCUMENT',
    emoji: '📚',
    description: 'Comprehensive technical documentation creation',
    duration: '2-4 hours',
    complexity: 'Low',
    category: 'Development',
    cost: '$150-400',
    features: ['API documentation', 'Architecture guides', 'Setup instructions', 'Code examples', 'Troubleshooting guides', 'Deployment procedures'],
    useCases: ['API documentation', 'Architecture documentation', 'User guides', 'Developer onboarding', 'Knowledge base creation']
  },
  {
    id: 'migrate',
    name: 'MIGRATE',
    emoji: '🔄',
    description: 'System migration and technology stack upgrades',
    duration: '4-8 hours',
    complexity: 'High',
    category: 'Strategic',
    cost: '$400-1000',
    features: ['Data migration', 'Zero-downtime deployment', 'Rollback procedures', 'Compatibility testing', 'Performance validation', 'Documentation updates'],
    useCases: ['Database migration', 'Framework upgrades', 'Cloud platform migration', 'Microservices transition', 'API versioning']
  },
  {
    id: 'integrate',
    name: 'INTEGRATE',
    emoji: '🔌',
    description: 'Third-party service and API integration',
    duration: '3-6 hours',
    complexity: 'Medium',
    category: 'Development',
    cost: '$250-700',
    features: ['API integration', 'Webhook handling', 'Error handling', 'Rate limiting', 'Data synchronization', 'Testing suite'],
    useCases: ['Payment gateway integration', 'Email service integration', 'Analytics platforms', 'CRM systems', 'Social media APIs']
  },
  {
    id: 'release',
    name: 'RELEASE',
    emoji: '📦',
    description: 'Production release management and versioning',
    duration: '2-4 hours',
    complexity: 'Medium',
    category: 'Strategic',
    cost: '$200-500',
    features: ['Version management', 'Release notes', 'Changelog generation', 'Deployment automation', 'Rollback planning', 'Stakeholder communication'],
    useCases: ['Major version release', 'Feature rollout', 'Hotfix deployment', 'Beta releases', 'Deprecation management']
  },
  {
    id: 'dev-setup',
    name: 'DEV-SETUP',
    emoji: '🛠️',
    description: 'Development environment initialization for new projects',
    duration: '2-3 hours',
    complexity: 'Low',
    category: 'Development',
    cost: '$150-350',
    features: ['Repository setup', 'Architecture documentation', 'Development tooling', 'CI/CD configuration', 'Team onboarding', 'Best practices'],
    useCases: ['New project kickoff', 'Team onboarding', 'Development standards', 'Toolchain setup', 'Repository structure']
  },
  {
    id: 'dev-alignment',
    name: 'DEV-ALIGNMENT',
    emoji: '🎯',
    description: 'Analyze and document existing codebase for team alignment',
    duration: '2-4 hours',
    complexity: 'Medium',
    category: 'Strategic',
    cost: '$200-500',
    features: ['Codebase analysis', 'Architecture review', 'Technical debt assessment', 'Documentation creation', 'Team alignment', 'Optimization recommendations'],
    useCases: ['Existing project onboarding', 'Technical audit', 'Team handoff', 'Legacy system understanding', 'Architecture documentation']
  },
  {
    id: 'architecture',
    name: 'ARCHITECTURE',
    emoji: '🏛️',
    description: 'System architecture design and technical planning',
    duration: '4-6 hours',
    complexity: 'High',
    category: 'Strategic',
    cost: '$400-1000',
    features: ['System design', 'Technology selection', 'Scalability planning', 'Security architecture', 'Documentation creation', 'Technical specifications'],
    useCases: ['New system design', 'Architecture refactoring', 'Scalability planning', 'Technology evaluation', 'Technical roadmapping']
  },
  {
    id: 'product-description',
    name: 'PRODUCT-DESC',
    emoji: '📋',
    description: 'Product requirements and specification documentation',
    duration: '2-4 hours',
    complexity: 'Medium',
    category: 'Strategic',
    cost: '$200-500',
    features: ['Requirements gathering', 'User stories', 'Technical specifications', 'Acceptance criteria', 'Stakeholder alignment', 'Project planning'],
    useCases: ['Product planning', 'Feature specification', 'Stakeholder communication', 'Development roadmap', 'MVP definition']
  },
  {
    id: 'genesis',
    name: 'GENESIS',
    emoji: '🌟',
    description: 'Complete project initialization from concept to deployment',
    duration: '1-2 days',
    complexity: 'High',
    category: 'Strategic',
    cost: '$1000-2500',
    features: ['Full project setup', 'Architecture design', 'Development environment', 'Core features', 'Testing suite', 'Production deployment'],
    useCases: ['Startup MVP', 'New product launch', 'Hackathon project', 'Proof of concept', 'Greenfield development']
  },
  {
    id: 'library',
    name: 'LIBRARY',
    emoji: '📖',
    description: 'Reusable component library or package development',
    duration: '3-6 hours',
    complexity: 'Medium',
    category: 'Development',
    cost: '$300-800',
    features: ['Component development', 'API design', 'Documentation', 'Testing suite', 'Versioning', 'Package publishing'],
    useCases: ['UI component library', 'Utility package', 'SDK development', 'Plugin creation', 'Shared components']
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
          {/* Phase 1 & 2 Modernization Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-6 py-3 rounded-full text-sm font-medium border border-blue-200">
              <span className="animate-pulse">⚡</span>
              <span className="font-bold">PHASE 1 & 2 MODERNIZATION:</span>
              <span>Context Preservation • Extended Thinking • Professional Documentation</span>
            </div>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              17 Proven Missions, One <span className="text-gradient">/coord</span> Command
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              From emergency fixes to complete MVPs, execute complex development missions
              with project-local agents that understand your codebase.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-bold">87.5%</span>
                <span className="text-gray-600">less rework</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-bold">37.5%</span>
                <span className="text-gray-600">faster delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-600 font-bold">1,370+</span>
                <span className="text-gray-600">line Field Manual</span>
              </div>
            </div>
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

      {/* Context Preservation & Modernization Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Phase 1 & 2 Modernization Features
            </h2>
            <p className="text-xl text-gray-600">
              Enterprise-grade capabilities for zero context loss and professional delivery
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-4">🔄</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Context Preservation System</h3>
              <div className="text-primary-600 font-bold mb-3">87.5% Less Rework</div>
              <p className="text-gray-600 mb-4">
                Zero context loss across multi-agent workflows. Agent-to-agent handoff protocols ensure every decision and finding is preserved.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-1.5"></div>
                  <span>agent-context.md for mission-wide context</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-1.5"></div>
                  <span>handoff-notes.md for specialist handoffs</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-1.5"></div>
                  <span>evidence-repository.md for artifacts</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-4">🧠</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Extended Thinking</h3>
              <div className="text-green-600 font-bold mb-3">37.5% Faster Delivery</div>
              <p className="text-gray-600 mb-4">
                Three thinking modes for optimal decision-making: standard, think hard, and think harder for critical components.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-1.5"></div>
                  <span>Standard mode for routine tasks</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-1.5"></div>
                  <span>Think hard for complex features</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 mt-1.5"></div>
                  <span>Think harder for security-critical code</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Field Manual</h3>
              <div className="text-purple-600 font-bold mb-3">1,370+ Lines</div>
              <p className="text-gray-600 mb-4">
                Professional-grade architecture documentation with comprehensive system design guides and best practices.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-1.5"></div>
                  <span>Architecture SOP templates</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-1.5"></div>
                  <span>Security-first development principles</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-1.5"></div>
                  <span>Production-ready templates</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Memory Management</h3>
              <div className="text-orange-600 font-bold mb-3">Persistent Knowledge</div>
              <p className="text-gray-600 mb-4">
                Agents learn and remember project patterns, technical decisions, and optimization insights across sessions.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-1.5"></div>
                  <span>Technical patterns storage</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-1.5"></div>
                  <span>Decision history tracking</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-1.5"></div>
                  <span>Lessons learned repository</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Security-First Architecture</h3>
              <div className="text-red-600 font-bold mb-3">Zero Compromises</div>
              <p className="text-gray-600 mb-4">
                Critical software development principles enforced at every level. Never compromise security for convenience.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-1.5"></div>
                  <span>Root cause analysis mandatory</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-1.5"></div>
                  <span>Security feature validation</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2 mt-1.5"></div>
                  <span>Strategic solution checklist</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-3xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tool Permission Framework</h3>
              <div className="text-gray-600 font-bold mb-3">Agent-Specific Access</div>
              <p className="text-gray-600 mb-4">
                Granular tool permissions for each specialist agent, ensuring security and proper access control.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 mt-1.5"></div>
                  <span>Role-based tool access</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 mt-1.5"></div>
                  <span>MCP integration support</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 mt-1.5"></div>
                  <span>Fallback strategies documented</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Slash Commands Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              6 Slash Commands for Workflow Automation
            </h2>
            <p className="text-xl text-gray-600">
              Pre-configured workflows for common development scenarios
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">🎯</div>
                <code className="font-bold text-primary-600">/coord</code>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Mission Orchestration</h3>
              <p className="text-sm text-gray-600">
                Orchestrate multi-agent missions with systematic workflows. Execute build, fix, mvp, and more.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">🔍</div>
                <code className="font-bold text-primary-600">/recon</code>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">UI/UX Reconnaissance</h3>
              <p className="text-sm text-gray-600">
                Execute comprehensive UI/UX assessment using RECON Protocol for design audits.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">🎨</div>
                <code className="font-bold text-primary-600">/design-review</code>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Design Review</h3>
              <p className="text-sm text-gray-600">
                Complete comprehensive design review of pending changes with systematic assessment.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">🔬</div>
                <code className="font-bold text-primary-600">/pmd</code>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Post Mortem Dump</h3>
              <p className="text-sm text-gray-600">
                Analyze failures and suggest improvements with root cause analysis protocol.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">📊</div>
                <code className="font-bold text-primary-600">/report</code>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Progress Reports</h3>
              <p className="text-sm text-gray-600">
                Generate progress reports for stakeholders with metrics and accomplishments.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">🤝</div>
                <code className="font-bold text-primary-600">/meeting</code>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Meeting Facilitation</h3>
              <p className="text-sm text-gray-600">
                Conversational meetings with AGENT-11 specialists for strategic discussions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11 Specialist Agents Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              11 Specialist Agents with Proven Capabilities
            </h2>
            <p className="text-xl text-gray-600">
              Each agent has specific tool permissions and coordination protocols
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="text-3xl mr-3">🧠</div>
                <div>
                  <h3 className="font-bold text-gray-900">THE COORDINATOR</h3>
                  <div className="text-xs text-green-600">All Squads</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">Mission orchestration and agent coordination. Manages task delegation and workflow execution.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="text-3xl mr-3">💻</div>
                <div>
                  <h3 className="font-bold text-gray-900">THE DEVELOPER</h3>
                  <div className="text-xs text-green-600">All Squads</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">Full-stack development and implementation. Ships clean, working code fast with tests.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="text-3xl mr-3">🏗️</div>
                <div>
                  <h3 className="font-bold text-gray-900">THE ARCHITECT</h3>
                  <div className="text-xs text-blue-600">Core+</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">System design and technical architecture. Plans scalable solutions and technology stack.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="text-3xl mr-3">🧪</div>
                <div>
                  <h3 className="font-bold text-gray-900">THE TESTER</h3>
                  <div className="text-xs text-blue-600">Core+</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">Quality assurance and automated testing. Validates functionality and edge cases.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="text-3xl mr-3">⚙️</div>
                <div>
                  <h3 className="font-bold text-gray-900">THE OPERATOR</h3>
                  <div className="text-xs text-purple-600">Full Squad</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">DevOps, deployment, and infrastructure. Manages production environments and CI/CD.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="text-3xl mr-3">🎯</div>
                <div>
                  <h3 className="font-bold text-gray-900">THE STRATEGIST</h3>
                  <div className="text-xs text-purple-600">Full Squad</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">Product requirements and strategic planning. Defines vision and execution roadmap.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="text-3xl mr-3">🎨</div>
                <div>
                  <h3 className="font-bold text-gray-900">THE DESIGNER</h3>
                  <div className="text-xs text-purple-600">Full Squad</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">UI/UX design and user experience. Creates intuitive interfaces and design systems.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="text-3xl mr-3">📚</div>
                <div>
                  <h3 className="font-bold text-gray-900">THE DOCUMENTER</h3>
                  <div className="text-xs text-purple-600">Full Squad</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">Technical documentation and knowledge base. Creates comprehensive guides and references.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="text-3xl mr-3">📊</div>
                <div>
                  <h3 className="font-bold text-gray-900">THE ANALYST</h3>
                  <div className="text-xs text-purple-600">Full Squad</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">Data analysis and performance metrics. Provides insights and optimization recommendations.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="text-3xl mr-3">📈</div>
                <div>
                  <h3 className="font-bold text-gray-900">THE MARKETER</h3>
                  <div className="text-xs text-purple-600">Full Squad</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">Growth strategy and user acquisition. Plans launches and marketing campaigns.</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-3">
                <div className="text-3xl mr-3">🤝</div>
                <div>
                  <h3 className="font-bold text-gray-900">THE SUPPORT</h3>
                  <div className="text-xs text-purple-600">Full Squad</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">Customer support and issue resolution. Handles user inquiries and feedback loops.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MCP Integration Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              MCP Integration - 8 Pre-Integrated Services
            </h2>
            <p className="text-xl text-gray-600">
              AGENT-11 includes pre-configured integrations with 8 essential development services, reducing context overhead by 40-80% and enabling 30+ hours of autonomous operation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-5 border border-blue-200">
              <div className="font-bold text-gray-900 mb-2 flex items-center">
                <span className="text-xl mr-2">🔧</span>
                Core Services
              </div>
              <ul className="space-y-1 text-sm text-gray-700">
                <li><strong>Context7</strong> - Library docs & code analysis</li>
                <li><strong>GitHub</strong> - PRs, issues, CI/CD</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-5 border border-green-200">
              <div className="font-bold text-gray-900 mb-2 flex items-center">
                <span className="text-xl mr-2">💻</span>
                Development Stack
              </div>
              <ul className="space-y-1 text-sm text-gray-700">
                <li><strong>Supabase</strong> - Postgres, auth, real-time</li>
                <li><strong>Stripe</strong> - Payments, subscriptions</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-5 border border-orange-200">
              <div className="font-bold text-gray-900 mb-2 flex items-center">
                <span className="text-xl mr-2">🚀</span>
                Infrastructure
              </div>
              <ul className="space-y-1 text-sm text-gray-700">
                <li><strong>Netlify</strong> - Frontend, edge functions</li>
                <li><strong>Railway</strong> - Backend, databases, cron</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-5 border border-purple-200">
              <div className="font-bold text-gray-900 mb-2 flex items-center">
                <span className="text-xl mr-2">🧪</span>
                Testing & Quality
              </div>
              <ul className="space-y-1 text-sm text-gray-700">
                <li><strong>Playwright</strong> - Browser automation</li>
                <li><strong>Filesystem</strong> - Local project mgmt</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 mb-6 border border-primary-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">MCP Profile System</h3>
            <p className="text-gray-600 mb-4 text-center">
              Choose the right profile for your workflow - each optimized for specific development contexts:
            </p>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3 text-sm">
              <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                <div className="font-bold text-primary-600 mb-1">Core</div>
                <div className="text-xs text-gray-600">3 services<br/>Basic development</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                <div className="font-bold text-green-600 mb-1">Fullstack</div>
                <div className="text-xs text-gray-600">8 services<br/>Complete web apps</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                <div className="font-bold text-purple-600 mb-1">Testing</div>
                <div className="text-xs text-gray-600">4 services<br/>QA workflows</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                <div className="font-bold text-blue-600 mb-1">Database</div>
                <div className="text-xs text-gray-600">4 services<br/>DB-focused work</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                <div className="font-bold text-orange-600 mb-1">Payments</div>
                <div className="text-xs text-gray-600">4 services<br/>Payment integration</div>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                <div className="font-bold text-red-600 mb-1">Deployment</div>
                <div className="text-xs text-gray-600">5 services<br/>Production deploy</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 text-center border border-green-200">
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-1">40-80%</div>
                <div className="text-sm text-gray-600">Context Reduction</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-1">30+ Hours</div>
                <div className="text-sm text-gray-600">Autonomous Operation</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-1">8 Services</div>
                <div className="text-sm text-gray-600">Pre-Integrated</div>
              </div>
            </div>
            <p className="text-gray-600 mt-4 text-sm">
              <strong>Performance Impact:</strong> MCP profile loading enables longer autonomous operation and more complex multi-agent workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Advanced Capabilities
            </h2>
            <p className="text-xl text-gray-600">
              Enterprise-grade features for maximum efficiency and performance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Memory Management */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Memory Management</h3>
              <div className="text-3xl font-bold text-orange-600 mb-4">84% Token Reduction</div>
              <p className="text-gray-600 mb-6">
                Persistent file-based memory system that learns and remembers across sessions.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-2"></div>
                  <div>
                    <strong className="text-gray-900">84% token reduction</strong>
                    <p className="text-sm text-gray-600">in multi-session workflows</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-2"></div>
                  <div>
                    <strong className="text-gray-900">Cross-session learning</strong>
                    <p className="text-sm text-gray-600">Knowledge persists between restarts</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-2"></div>
                  <div>
                    <strong className="text-gray-900">Structured XML storage</strong>
                    <p className="text-sm text-gray-600">Clear, human-readable memory files</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 mt-2"></div>
                  <div>
                    <strong className="text-gray-900">30+ hour autonomous operation</strong>
                    <p className="text-sm text-gray-600">vs. 2-4 hours without memory</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Extended Thinking */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Extended Thinking</h3>
              <div className="text-3xl font-bold text-purple-600 mb-4">10-30% Better Solutions</div>
              <p className="text-gray-600 mb-6">
                Strategic reasoning modes for complex tasks requiring deep analysis.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-2"></div>
                  <div>
                    <strong className="text-gray-900">5 thinking modes</strong>
                    <p className="text-sm text-gray-600">From basic to ultra-deep reasoning</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-2"></div>
                  <div>
                    <strong className="text-gray-900">10-30% solution quality improvement</strong>
                    <p className="text-sm text-gray-600">for complex tasks</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-2"></div>
                  <div>
                    <strong className="text-gray-900">Strategic allocation</strong>
                    <p className="text-sm text-gray-600">Use deeper thinking where it matters most</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-2"></div>
                  <div>
                    <strong className="text-gray-900">Cost-optimized</strong>
                    <p className="text-sm text-gray-600">Match thinking depth to task complexity</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Context Optimization */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Context Optimization</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">40-80% Reduction</div>
              <p className="text-gray-600 mb-6">
                Intelligent context management for optimal performance.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></div>
                  <div>
                    <strong className="text-gray-900">40-80% context reduction</strong>
                    <p className="text-sm text-gray-600">via MCP profile loading</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></div>
                  <div>
                    <strong className="text-gray-900">Strategic context clearing</strong>
                    <p className="text-sm text-gray-600">Preserve critical information</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></div>
                  <div>
                    <strong className="text-gray-900">Memory integration</strong>
                    <p className="text-sm text-gray-600">Long-term knowledge persistence</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 mt-2"></div>
                  <div>
                    <strong className="text-gray-900">Multi-session workflows</strong>
                    <p className="text-sm text-gray-600">Seamless pause and resume</p>
                  </div>
                </li>
              </ul>
            </div>
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