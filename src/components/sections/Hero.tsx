'use client'

import Link from 'next/link'
import { useState } from 'react'
import EmailCapture from '@/components/ui/EmailCapture'

export default function Hero() {
  const [showEmailCapture, setShowEmailCapture] = useState(false)


  const handleEmailSuccess = () => {
    // Track conversion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        event_category: 'hero_lead_magnet',
        event_label: 'quick_start_kit',
        value: 1
      })
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white section-padding">
      <div className="container">
        <div className="text-center max-w-5xl mx-auto">
          {/* Modernization Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-8 animate-fade-in hover-glow transition-all duration-300 hover:scale-105 border border-blue-200">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse-gentle"></span>
            <span className="animate-bounce-gentle">⚡</span>
            <span className="font-bold">PHASE 1 & 2 MODERNIZATION:</span>
            <span>87.5% Less Rework, 37.5% Faster Delivery</span>
            <span className="mx-2 text-blue-600">•</span>
            <span className="font-bold">Context Preservation System</span>
          </div>

          {/* Mission-Focused Tagline */}
          <div className="text-lg text-primary-600 font-medium mb-4 animate-fade-in">
            One Command. Multiple Missions. Unlimited Results.
          </div>

          {/* Main Headline - Mission-Focused */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
            <span className="block text-gray-900">Execute Complex Missions</span>
            <span className="block text-gradient">With One /coord Command</span>
          </h1>

          {/* Mission-Focused Subheadline */}
          <p className="text-xl text-gray-600 mb-6 max-w-4xl mx-auto text-balance animate-slide-up" style={{animationDelay: '0.2s'}}>
            From <strong>BUILD</strong> to <strong>MVP</strong> to <strong>DEPLOY</strong> - execute 17 proven missions with project-local agents that understand your codebase.
            Features <strong>Context Preservation</strong>, <strong>Extended Thinking</strong>, and <strong>1,370-line Field Manual</strong> for professional-grade architecture.
          </p>

          {/* Professional Documentation Badge */}
          <div className="flex justify-center mb-8 animate-slide-up" style={{animationDelay: '0.25s'}}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 px-5 py-2 rounded-full text-sm border border-purple-200">
              <span>📚</span>
              <span className="font-medium">Professional-Grade Documentation</span>
              <span className="mx-1 text-purple-500">•</span>
              <span className="font-bold">1,370+ Line Field Manual</span>
            </div>
          </div>

          {/* Mission Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="text-center bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-blue-600">87.5%</div>
              <div className="text-sm text-gray-600">less rework</div>
            </div>
            <div className="text-center bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-green-600">37.5%</div>
              <div className="text-sm text-gray-600">faster delivery</div>
            </div>
            <div className="text-center bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-purple-600">7,777+</div>
              <div className="text-sm text-gray-600">lines of docs</div>
            </div>
            <div className="text-center bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="text-2xl font-bold text-orange-600">17</div>
              <div className="text-sm text-gray-600">mission types</div>
            </div>
          </div>

          {/* One-Line Installation */}
          <div className="bg-gray-900 rounded-xl p-6 max-w-4xl mx-auto mb-8 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm ml-4">Execute Your First Mission in &lt;1 Minute</span>
            </div>
            <div className="font-mono text-green-400 text-sm sm:text-base bg-gray-800 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0 flex-1">
                  <span className="text-green-400 mr-2">$</span>
                  <span className="text-gray-300 truncate">curl -sSL https://raw.githubusercontent.com/TheWayWithin/agent-11/main/deployment/scripts/install.sh | bash -s core</span>
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText('curl -sSL https://raw.githubusercontent.com/TheWayWithin/agent-11/main/deployment/scripts/install.sh | bash -s core')}
                  className="ml-4 px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-xs rounded transition-colors shrink-0"
                  title="Copy install command"
                >
                  Copy
                </button>
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">$</span>
                <span className="text-gray-300">/coord build requirements.md</span>
              </div>
              <div className="text-purple-400 text-xs">
                <span className="animate-pulse">🚀</span> Mission executing... BUILD complete in 4-8 hours
              </div>
            </div>
            <div className="text-gray-400 text-xs mt-2 text-center">
              Install once, execute unlimited missions. Project-local deployment for maximum context.
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up" style={{animationDelay: '0.5s'}}>
            <Link 
              href="https://github.com/TheWayWithin/agent-11" 
              className="btn-primary group hover-glow relative overflow-hidden"
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
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <button 
              onClick={() => setShowEmailCapture(!showEmailCapture)}
              className="btn-secondary group hover-glow relative overflow-hidden"
            >
              <svg className="w-5 h-5 mr-2 group-hover:animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
              </svg>
              Read the Case Study
              <svg className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Strategic Lead Magnet */}
          {showEmailCapture && (
            <div className="max-w-lg mx-auto mb-16 animate-slide-up">
              <EmailCapture
                variant="hero"
                leadMagnet="AGENT-11 Quick Start Kit + Templates"
                title="🚀 Get Started in Under 5 Minutes"
                description="Everything you need: setup scripts, configuration templates, real-world examples, and performance optimization tips."
                placeholder="Enter your email for instant access"
                buttonText="Download Free Kit"
                showSocialProof={true}
                onSuccess={handleEmailSuccess}
              />
            </div>
          )}

          {/* Creator Attribution - Subtle Footer */}
          <div className="mt-8 text-sm text-gray-600 dark:text-gray-400 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 animate-fade-in" style={{animationDelay: '0.55s'}}>
            <span className="flex items-center gap-2">
              🛠️ Built by <Link href="/about" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">Jamie Watters</Link>
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-2">
              Part of the <Link href="/portfolio" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">Solo Founder Ecosystem</Link>
            </span>
            <span className="hidden sm:inline">|</span>
            <span>
              <Link href="https://jamiewatters.work" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">JamieWatters.work</Link>
            </span>
          </div>

          {/* Authentic Development Story */}
          <div className="relative max-w-4xl mx-auto mt-12 animate-fade-in hover-lift" style={{animationDelay: '0.6s'}}>
            <div className="bg-gray-900 rounded-xl p-6 shadow-2xl relative overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse-gentle"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse-gentle" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-gentle" style={{animationDelay: '0.2s'}}></div>
                <span className="text-gray-400 text-sm ml-4 animate-fade-in">Mission Execution (Live Example)</span>
              </div>
              
              {/* Mission Execution Story */}
              <div className="font-mono text-sm text-gray-300 space-y-2">
                <div className="flex items-center animate-slide-up">
                  <span className="text-green-400 animate-pulse-gentle">$</span>
                  <span className="ml-2">/coord build &quot;User authentication system with JWT&quot;</span>
                </div>
                <div className="text-blue-400 animate-slide-up" style={{animationDelay: '0.1s'}}>
                  <span className="animate-bounce-gentle">🎯</span>
                  <span className="ml-2">Mission: BUILD initiated | Duration: 4-8 hours | Priority: High</span>
                </div>
                <div className="text-purple-400 animate-slide-up" style={{animationDelay: '0.2s'}}>
                  <span className="animate-bounce-gentle">🧠</span>
                  <span className="ml-2">COORDINATOR: Breaking down authentication requirements...</span>
                </div>
                <div className="text-yellow-400 animate-slide-up" style={{animationDelay: '0.3s'}}>
                  <span className="animate-bounce-gentle">🏗️</span>
                  <span className="ml-2">ARCHITECT: Designing JWT token flow & database schema...</span>
                </div>
                <div className="text-green-400 animate-slide-up" style={{animationDelay: '0.4s'}}>
                  <span className="animate-bounce-gentle">💻</span>
                  <span className="ml-2">DEVELOPER: Implementing auth routes, middleware, validation...</span>
                </div>
                <div className="text-orange-400 animate-slide-up" style={{animationDelay: '0.5s'}}>
                  <span className="animate-bounce-gentle">🧪</span>
                  <span className="ml-2">TESTER: Running security tests, edge cases, load testing...</span>
                </div>
                <div className="flex items-center animate-slide-up text-green-300" style={{animationDelay: '0.6s'}}>
                  <span className="text-green-400 animate-pulse-gentle">✅</span>
                  <span className="ml-2 font-bold">
                    BUILD Mission Complete! Authentication system deployed & tested.
                    <span className="animate-bounce-gentle inline-block ml-2">🚀</span>
                  </span>
                </div>
                <div className="text-gray-500 text-xs animate-slide-up mt-4" style={{animationDelay: '0.7s'}}>
                  Solo founder: 1 day AGENT-11 + 1 day website | No team, no meetings, no handoffs
                </div>
              </div>
              
              {/* Success glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}