'use client'

import { useState } from 'react'

const techTabs = [
  {
    id: 'architecture',
    label: 'Architecture',
    icon: '🏗️',
    content: {
      title: 'How Agents Communicate & Collaborate',
      description: 'Built on a distributed, event-driven architecture that ensures your agents work together seamlessly.',
      features: [
        {
          name: 'Event-Driven Coordination',
          description: 'Agents communicate through a message bus, ensuring clean separation and reliable collaboration.'
        },
        {
          name: 'Context Sharing',
          description: 'Shared context allows agents to build on each other\'s work without duplication.'
        },
        {
          name: 'Dependency Resolution', 
          description: 'Automatic task ordering ensures agents work in the right sequence.'
        },
        {
          name: 'Rollback Capability',
          description: 'Failed operations can be safely rolled back without affecting other agents.'
        }
      ],
      codeExample: `// Agent Communication Example
interface AgentMessage {
  from: AgentId
  to: AgentId | 'broadcast'
  type: 'task' | 'result' | 'error'
  payload: any
  context: SharedContext
}

class AgentCoordinator {
  async executeWorkflow(request: WorkflowRequest) {
    // 1. Parse requirements
    const requirements = await this.strategist.analyze(request)
    
    // 2. Generate implementation plan
    const plan = await this.architect.design(requirements)
    
    // 3. Parallel execution with dependencies
    const results = await Promise.allSettled([
      this.developer.implement(plan.backend),
      this.designer.createUI(plan.frontend),
      this.tester.generateTests(plan.testCases)
    ])
    
    // 4. Integration and deployment
    return await this.operator.deploy(results)
  }
}`
    }
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: '🔌',
    content: {
      title: 'Supported Tools & Platforms',
      description: 'AGENT-11 integrates with your existing development workflow and scales with your toolchain.',
      features: [
        {
          name: 'Version Control',
          description: 'Native Git integration with GitHub, GitLab, and Bitbucket support.'
        },
        {
          name: 'IDE Integration',
          description: 'VS Code extension with intelligent code completion and agent collaboration.'
        },
        {
          name: 'CI/CD Pipeline',
          description: 'GitHub Actions, Jenkins, and CircleCI integration for automated deployments.'
        },
        {
          name: 'Cloud Platforms',
          description: 'Deploy to AWS, Azure, GCP, or Vercel with optimized configurations.'
        }
      ],
      codeExample: `# GitHub Actions Integration
name: AGENT-11 Deployment
on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: agent-11/github-action@v1
        with:
          squad: 'core'
          workflow: 'deploy-production'
          secrets: \${{ secrets.AGENT_11_API_KEY }}
      
      # Agents handle the rest:
      # - THE TESTER runs comprehensive test suite
      # - THE OPERATOR manages deployment pipeline  
      # - THE ANALYST monitors performance metrics
      # - THE SUPPORT sets up monitoring alerts`
    }
  },
  {
    id: 'customization',
    label: 'Customization',
    icon: '⚙️',
    content: {
      title: 'Extend & Modify Your Agents',
      description: 'Every agent can be customized to match your coding style, preferences, and domain requirements.',
      features: [
        {
          name: 'Custom Prompts',
          description: 'Modify agent behavior with domain-specific instructions and coding standards.'
        },
        {
          name: 'Plugin System',
          description: 'Add new capabilities with a rich ecosystem of community plugins.'
        },
        {
          name: 'Template Library',
          description: 'Pre-built templates for common frameworks, languages, and architectures.'
        },
        {
          name: 'Agent Marketplace',
          description: 'Share and discover specialized agents created by the community.'
        }
      ],
      codeExample: `// Custom Agent Configuration
export const myCustomDeveloper = {
  ...baseDeveloper,
  preferences: {
    language: 'TypeScript',
    framework: 'Next.js',
    testing: 'Jest + React Testing Library',
    styling: 'Tailwind CSS',
    database: 'Prisma + PostgreSQL'
  },
  codeStyle: {
    maxLineLength: 100,
    quotes: 'single',
    semicolons: false,
    trailingCommas: true
  },
  customInstructions: \`
    Always use functional components with hooks.
    Prefer composition over inheritance.
    Write comprehensive TypeScript types.
    Include error boundaries for all routes.
  \`
}`
    }
  },
  {
    id: 'security',
    label: 'Security',
    icon: '🔒',
    content: {
      title: 'Data Handling & Privacy Practices',
      description: 'Your code and data remain secure with enterprise-grade privacy and security measures.',
      features: [
        {
          name: 'Local Processing',
          description: 'Sensitive code analysis happens locally. Only metadata crosses network boundaries.'
        },
        {
          name: 'Zero Data Retention',
          description: 'We don\'t store your code, secrets, or proprietary information on our servers.'
        },
        {
          name: 'Encrypted Communication',
          description: 'All agent communication uses end-to-end encryption with rotating keys.'
        },
        {
          name: 'Open Source Transparency',
          description: 'Full source code available for security auditing and compliance verification.'
        }
      ],
      codeExample: `// Security Configuration
{
  "security": {
    "mode": "local-first",
    "encryption": {
      "algorithm": "AES-256-GCM",
      "keyRotation": "24h"
    },
    "dataHandling": {
      "codeRetention": "none",
      "logsRetention": "local",
      "metricsAnonymization": true
    },
    "compliance": {
      "gdpr": true,
      "hipaa": true,
      "soc2": true
    }
  }
}`
    }
  }
]

export default function TechnicalConfidence() {
  const [activeTab, setActiveTab] = useState(techTabs[0])

  return (
    <section className="bg-gray-50 section-padding">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Built for Developers, By Developers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Every technical decision was made with developer experience in mind. 
            Open, extensible, and production-ready from day one.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {techTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab.id === tab.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {activeTab.content.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {activeTab.content.description}
                </p>
              </div>

              <div className="space-y-6">
                {activeTab.content.features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {feature.name}
                      </h4>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Example */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-4">
                    {activeTab.label.toLowerCase()}.ts
                  </span>
                </div>
                <div className="p-6 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                    {activeTab.content.codeExample}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Badges */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-8">Trusted Technology Stack</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'TypeScript', icon: '📘' },
              { name: 'React', icon: '⚛️' },
              { name: 'Node.js', icon: '🟢' },
              { name: 'Docker', icon: '🐳' },
              { name: 'Kubernetes', icon: '☸️' },
              { name: 'GitHub', icon: '🐙' }
            ].map((tech, index) => (
              <div key={index} className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm">
                <span className="text-2xl">{tech.icon}</span>
                <span className="text-sm font-medium text-gray-700">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}