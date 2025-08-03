'use client'

import Link from 'next/link'
import { useState } from 'react'

const developmentTimeline = [
  {
    day: 'Day 1',
    phase: 'Strategic Analysis',
    specialist: 'THE COORDINATOR',
    duration: '2 hours',
    icon: '🎯',
    color: 'blue',
    activities: [
      'Analyzed project requirements and scope',
      'Defined multi-agent architecture approach',
      'Created comprehensive project roadmap',
      'Established success metrics and validation criteria'
    ],
    outcome: 'Complete strategic foundation established'
  },
  {
    day: 'Day 3',
    phase: 'System Architecture',
    specialist: 'THE ARCHITECT',
    duration: '45 minutes',
    icon: '🏗️',
    color: 'purple',
    activities: [
      'Designed deployment system architecture',
      'Created modular installation framework',
      'Defined cross-platform compatibility strategy',
      'Established backup and rollback mechanisms'
    ],
    outcome: 'Production-ready architecture blueprint'
  },
  {
    day: 'Day 7',
    phase: 'Core Development',
    specialist: 'THE DEVELOPER',
    duration: '2 hours',
    icon: '💻',
    color: 'green',
    activities: [
      'Implemented 430+ lines of production code',
      'Built automated installation system',
      'Created squad deployment mechanisms',
      'Integrated cross-platform compatibility'
    ],
    outcome: 'Fully functional deployment system'
  },
  {
    day: 'Day 14',
    phase: 'Quality Assurance',
    specialist: 'THE TESTER',
    duration: '30 minutes',
    icon: '✅',
    color: 'yellow',
    activities: [
      'Comprehensive test suite execution',
      'Cross-platform validation testing',
      'Performance benchmarking analysis',
      'Edge case scenario validation'
    ],
    outcome: '98% success rate validated'
  },
  {
    day: 'Day 18',
    phase: 'Documentation',
    specialist: 'THE DOCUMENTER',
    duration: '45 minutes',
    icon: '📚',
    color: 'orange',
    activities: [
      'Created 6 comprehensive installation guides',
      'Developed troubleshooting documentation',
      'Built user experience optimization guides',
      'Established community support resources'
    ],
    outcome: 'Professional documentation suite'
  },
  {
    day: 'Day 21',
    phase: 'User Experience',
    specialist: 'THE SUPPORT',
    duration: '30 minutes',
    icon: '🤝',
    color: 'indigo',
    activities: [
      'Optimized installation user flow',
      'Created error handling and feedback systems',
      'Established support and troubleshooting workflows',
      'Validated end-to-end user experience'
    ],
    outcome: '85/100 professional UX rating'
  }
]

const metrics = [
  { label: 'Timeline', before: '6 weeks planned', after: '3 weeks actual', improvement: '50% faster' },
  { label: 'Reliability', before: 'Unknown success rate', after: '98% validated', improvement: 'Production proven' },
  { label: 'Installation', before: '10+ minutes manual', after: '<1 second automated', improvement: '600x faster' },
  { label: 'Code Quality', before: 'Single developer', after: '430+ lines reviewed', improvement: 'Multi-specialist' },
  { label: 'Documentation', before: 'Basic README', after: '6 comprehensive guides', improvement: 'Professional grade' },
  { label: 'User Experience', before: 'Frustrating setup', after: '85/100 rating', improvement: 'Self-service ready' }
]

export default function CaseStudy() {
  const [activePhase, setActivePhase] = useState(0)

  const getColorClasses = (color: string, isActive: boolean = false) => {
    const colors = {
      blue: isActive ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-700 border-blue-200',
      purple: isActive ? 'bg-purple-500 text-white' : 'bg-purple-50 text-purple-700 border-purple-200',
      green: isActive ? 'bg-green-500 text-white' : 'bg-green-50 text-green-700 border-green-200',
      yellow: isActive ? 'bg-yellow-500 text-white' : 'bg-yellow-50 text-yellow-700 border-yellow-200',
      orange: isActive ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-700 border-orange-200',
      indigo: isActive ? 'bg-indigo-500 text-white' : 'bg-indigo-50 text-indigo-700 border-indigo-200'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white section-padding">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-full text-sm font-medium mb-8 animate-fade-in hover-glow transition-all duration-300 hover:scale-105 border border-green-200">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-gentle"></span>
            <span className="animate-bounce-gentle">📊</span>
            <span className="font-bold">CASE STUDY:</span>
            <span>How AGENT-11 Built AGENT-11</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 animate-slide-up">
            The Ultimate <span className="text-gradient">Dogfooding Proof</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto text-balance mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
            We didn&apos;t just build AGENT-11 – we used AGENT-11 to build AGENT-11 itself. 
            Here&apos;s the documented timeline, metrics, and results from our 3-week development journey.
          </p>
        </div>

        {/* Before/After Comparison */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg animate-slide-up" style={{animationDelay: '0.3s'}}>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Transformation Metrics: Before vs After
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metrics.map((metric, index) => (
                <div 
                  key={metric.label}
                  className="p-6 bg-gray-50 rounded-xl hover-lift group"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {metric.label}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-red-600">
                      <span>❌</span>
                      <span>{metric.before}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <span>✅</span>
                      <span>{metric.after}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary-600 font-medium">
                      <span>🚀</span>
                      <span>{metric.improvement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Development Timeline */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12 animate-slide-up">
            3-Week Development Timeline
          </h3>
          
          {/* Timeline Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {developmentTimeline.map((phase, index) => (
              <button
                key={index}
                onClick={() => setActivePhase(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 border-2 ${
                  activePhase === index 
                    ? getColorClasses(phase.color, true)
                    : getColorClasses(phase.color, false) + ' hover:scale-105'
                }`}
              >
                <span className="mr-2">{phase.icon}</span>
                {phase.phase}
              </button>
            ))}
          </div>

          {/* Active Phase Details */}
          <div className="bg-white rounded-2xl p-8 shadow-lg animate-scale-in">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4 animate-float">
                {developmentTimeline[activePhase].icon}
              </div>
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-gentle"></span>
                {developmentTimeline[activePhase].day} • {developmentTimeline[activePhase].duration}
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">
                {developmentTimeline[activePhase].phase}
              </h4>
              <div className="text-lg text-gray-600 mb-6">
                Delivered by <strong>{developmentTimeline[activePhase].specialist}</strong>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h5 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🔧</span> Key Activities
                </h5>
                <ul className="space-y-2">
                  {developmentTimeline[activePhase].activities.map((activity, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🎯</span> Outcome Achieved
                </h5>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-700">
                    <span className="text-xl">🎉</span>
                    <span className="font-medium">{developmentTimeline[activePhase].outcome}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Results */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-lg animate-slide-up">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              The Bottom Line: Proven Results
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-gray-600">Success Rate Achieved</div>
                <div className="text-sm text-gray-500 mt-1">Validated in production use</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">&lt;1s</div>
                <div className="text-gray-600">Installation Time</div>
                <div className="text-sm text-gray-500 mt-1">From 10+ minutes to instant</div>
              </div>
            </div>

            <p className="text-lg text-gray-700 mb-8">
              The same squad that built this deployment system in 3 weeks is ready to build your next project. 
              <strong>This isn&apos;t a demo or prototype – it&apos;s the real production system running AGENT-11.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="https://github.com/TheWayWithin/agent-11" 
                className="btn-primary group hover-glow"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 mr-2 group-hover:animate-bounce-gentle" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Deploy Your Squad Now
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <button className="btn-secondary group hover-glow">
                <svg className="w-5 h-5 mr-2 group-hover:animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Full Documentation
                <svg className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}