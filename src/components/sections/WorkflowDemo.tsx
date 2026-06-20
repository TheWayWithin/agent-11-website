'use client'

import Link from 'next/link'
import { useState } from 'react'

const workflowPatterns = [
  {
    id: 'production-pipeline',
    name: 'Production Pipeline Pattern',
    description: 'Complex technical projects requiring high reliability',
    useCase: 'Building production systems, deploying critical infrastructure',
    timeline: '3-5 days',
    successRate: '98%',
    icon: '🏭',
    color: 'blue',
    specialists: [
      { name: 'THE COORDINATOR', role: 'Project orchestration', duration: '30min', icon: '🎯' },
      { name: 'THE ARCHITECT', role: 'System design', duration: '45min', icon: '🏗️' },
      { name: 'THE DEVELOPER', role: 'Implementation', duration: '2-3hrs', icon: '💻' },
      { name: 'THE TESTER', role: 'Quality validation', duration: '30min', icon: '✅' },
      { name: 'THE DOCUMENTER', role: 'Documentation', duration: '45min', icon: '📚' },
      { name: 'THE SUPPORT', role: 'UX optimization', duration: '30min', icon: '🤝' }
    ],
    outcome: 'Production-ready system with comprehensive documentation and testing',
    realExample: 'Used to build AGENT-11&apos;s own deployment system - 98% success rate validated'
  },
  {
    id: 'rapid-prototyping',
    name: 'Rapid Prototyping Pattern',
    description: 'Validating new feature ideas and building proof-of-concepts',
    useCase: 'Quick idea validation, MVP development, feature testing',
    timeline: '2-4 hours',
    successRate: '95%',
    icon: '⚡',
    color: 'green',
    specialists: [
      { name: 'THE STRATEGIST', role: 'Idea validation', duration: '20min', icon: '🎯' },
      { name: 'THE DEVELOPER', role: 'Quick implementation', duration: '1-2hrs', icon: '💻' },
      { name: 'THE TESTER', role: 'Basic validation', duration: '15min', icon: '✅' }
    ],
    outcome: 'Working prototype with validated feasibility',
    realExample: 'Perfect for testing new features before full implementation'
  },
  {
    id: 'problem-solving',
    name: 'Problem-Solving Escalation Pattern',
    description: 'When current approach isn&apos;t working and need expert intervention',
    useCase: 'Debugging complex issues, architectural decisions, technical blockers',
    timeline: '1-3 hours',
    successRate: '92%',
    icon: '🔧',
    color: 'orange',
    specialists: [
      { name: 'THE DEVELOPER', role: 'Initial attempt', duration: '30min', icon: '💻' },
      { name: 'THE ARCHITECT', role: 'Technical analysis', duration: '45min', icon: '🏗️' },
      { name: 'THE COORDINATOR', role: 'Strategic resolution', duration: '30min', icon: '🎯' }
    ],
    outcome: 'Problem resolved with improved architecture and approach',
    realExample: 'Used when file-based agents proved superior to runtime agents'
  },
  {
    id: 'quality-assurance',
    name: 'Quality Assurance Cascade',
    description: 'Ensuring production-ready quality through comprehensive validation',
    useCase: 'Pre-launch validation, quality audits, production readiness',
    timeline: '2-3 hours',
    successRate: '99%',
    icon: '🛡️',
    color: 'purple',
    specialists: [
      { name: 'THE DEVELOPER', role: 'Code implementation', duration: '1hr', icon: '💻' },
      { name: 'THE TESTER', role: 'Functional testing', duration: '30min', icon: '✅' },
      { name: 'THE SUPPORT', role: 'UX validation', duration: '20min', icon: '🤝' },
      { name: 'THE DOCUMENTER', role: 'Documentation review', duration: '30min', icon: '📚' }
    ],
    outcome: 'Production-ready system with validated quality metrics',
    realExample: 'Achieved 98% success rate through systematic quality validation'
  }
]

export default function WorkflowDemo() {
  const [activeWorkflow, setActiveWorkflow] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const workflow = workflowPatterns[activeWorkflow]

  const getColorClasses = (color: string, isActive: boolean = false) => {
    const colors = {
      blue: isActive ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-700 border-blue-200',
      green: isActive ? 'bg-green-500 text-white' : 'bg-green-50 text-green-700 border-green-200',
      orange: isActive ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-700 border-orange-200',
      purple: isActive ? 'bg-purple-500 text-white' : 'bg-purple-50 text-purple-700 border-purple-200'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section className="bg-white section-padding">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-6 py-3 rounded-full text-sm font-medium mb-8 animate-fade-in hover-glow transition-all duration-300 hover:scale-105 border border-primary-200">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-gentle"></span>
            <span className="animate-bounce-gentle">⚙️</span>
            <span className="font-bold">BATTLE-TESTED:</span>
            <span>Multi-Agent Workflow Patterns</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 animate-slide-up">
            Choose Your <span className="text-gradient">Development Strategy</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto text-balance mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
            These aren&apos;t theoretical patterns – they&apos;re proven workflows from building AGENT-11 itself. 
            Pick the strategy that matches your project needs and let the specialists handle the rest.
          </p>
        </div>

        {/* Workflow Selection */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {workflowPatterns.map((pattern, index) => (
              <button
                key={pattern.id}
                onClick={() => {
                  setActiveWorkflow(index)
                  setCurrentStep(0)
                }}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                  activeWorkflow === index
                    ? getColorClasses(pattern.color, true) + ' shadow-lg'
                    : getColorClasses(pattern.color, false) + ' hover:shadow-md'
                }`}
              >
                <div className="text-3xl mb-3">{pattern.icon}</div>
                <div className="font-semibold mb-2">{pattern.name}</div>
                <div className="text-sm opacity-90 mb-3">{pattern.description}</div>
                <div className="flex items-center gap-4 text-xs">
                  <span>⏱️ {pattern.timeline}</span>
                  <span>✅ {pattern.successRate}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Workflow Display */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
            {/* Workflow Header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4 animate-float">{workflow.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{workflow.name}</h3>
              <p className="text-gray-600 mb-4">{workflow.useCase}</p>
              <div className="inline-flex items-center gap-4 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm">
                <span>⏱️ {workflow.timeline}</span>
                <span>•</span>
                <span>✅ {workflow.successRate} success rate</span>
              </div>
            </div>

            {/* Specialist Pipeline */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-6 text-center">Specialist Pipeline</h4>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {workflow.specialists.map((specialist, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                      currentStep === index
                        ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-md scale-105'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300'
                    }`}
                  >
                    <span className="text-2xl">{specialist.icon}</span>
                    <div className="text-left">
                      <div className="font-medium text-sm">{specialist.name}</div>
                      <div className="text-xs opacity-75">{specialist.duration}</div>
                    </div>
                    {index < workflow.specialists.length - 1 && (
                      <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              {/* Current Step Details */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{workflow.specialists[currentStep].icon}</span>
                  <div>
                    <h5 className="font-semibold text-gray-900">{workflow.specialists[currentStep].name}</h5>
                    <p className="text-gray-600">{workflow.specialists[currentStep].role}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-sm font-medium text-primary-600">Step {currentStep + 1} of {workflow.specialists.length}</div>
                    <div className="text-xs text-gray-500">{workflow.specialists[currentStep].duration}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Outcome & Real Example */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h5 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <span>🎯</span> Expected Outcome
                </h5>
                <p className="text-green-800">{workflow.outcome}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h5 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <span>💡</span> Real Example
                </h5>
                <p className="text-blue-800">{workflow.realExample}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="https://github.com/TheWayWithin/agent-11" 
                  className="btn-primary group hover-glow"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="mr-2">{workflow.icon}</span>
                  Try This Workflow Now
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                <Link 
                  href="https://github.com/TheWayWithin/agent-11/blob/main/MULTI-AGENT-WORKFLOWS.md" 
                  className="btn-secondary group hover-glow"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Full Workflow Guide
                  <svg className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Deploy Your Specialist Squad?
          </h3>
          <p className="text-gray-600 mb-6">
            These proven workflows are ready to use. Same patterns that built AGENT-11 in 3 weeks.
          </p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
              <span className="text-green-400">$ bash &lt;(curl -fsSL https://raw.githubusercontent.com/TheWayWithin/agent-11/main/project/deployment/scripts/secure-install.sh)</span>
              <button
                onClick={() => navigator.clipboard.writeText('bash <(curl -fsSL https://raw.githubusercontent.com/TheWayWithin/agent-11/main/project/deployment/scripts/secure-install.sh)')}
                className="ml-4 px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-xs rounded transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}