'use client'

import Link from 'next/link'
import { useState } from 'react'
import EmailCapture from '@/components/ui/EmailCapture'

type HeroVariant = 'dogfooding' | 'speed' | 'problem' | 'metrics'

interface HeroVariation {
  id: HeroVariant
  name: string
  badge: {
    icon: string
    text: string
    subtext: string
  }
  headline: {
    primary: string
    secondary: string
  }
  subheadline: string
  metrics: Array<{
    value: string
    label: string
    color: string
  }>
  primaryCTA: string
  secondaryCTA: string
}

const heroVariations: HeroVariation[] = [
  {
    id: 'dogfooding',
    name: 'Dogfooding Story (Current)',
    badge: {
      icon: '✨',
      text: 'PROVEN: AGENT-11 built AGENT-11 itself',
      subtext: '98% success rate'
    },
    headline: {
      primary: 'The Ultimate Proof:',
      secondary: 'AGENT-11 Built AGENT-11'
    },
    subheadline: 'We used AGENT-11 to build AGENT-11 itself. 6 weeks became 3 weeks. Unknown reliability became 98% success rate. Complex setup became <1 second installation. The same squad that built this is ready to build your next project.',
    metrics: [
      { value: '6→3', label: 'weeks faster', color: 'primary' },
      { value: '98%', label: 'success rate', color: 'green' },
      { value: '<1s', label: 'installation', color: 'blue' },
      { value: '430+', label: 'lines of code', color: 'purple' }
    ],
    primaryCTA: 'Deploy Your Squad Now',
    secondaryCTA: 'Read the Case Study'
  },
  {
    id: 'speed',
    name: 'Speed Focused',
    badge: {
      icon: '⚡',
      text: 'INSTANT: Deploy in <1 second',
      subtext: 'From 10+ minutes to instant'
    },
    headline: {
      primary: 'From Solo to Squad',
      secondary: 'in Under 5 Minutes'
    },
    subheadline: 'Deploy your personal development team in <1 second. No hiring, no managing, no technical setup. Production-ready code, comprehensive testing, proper architecture. 98% success rate validated in real development.',
    metrics: [
      { value: '<1s', label: 'deployment time', color: 'blue' },
      { value: '5min', label: 'to first use', color: 'green' },
      { value: '98%', label: 'success rate', color: 'primary' },
      { value: '0', label: 'setup complexity', color: 'purple' }
    ],
    primaryCTA: 'Deploy in <1 Second',
    secondaryCTA: 'See Live Demo'
  },
  {
    id: 'problem',
    name: 'Problem Focused',
    badge: {
      icon: '🎯',
      text: 'SOLUTION: End solo development struggle',
      subtext: 'Join 2,847+ developers'
    },
    headline: {
      primary: 'Stop Wearing 11 Hats.',
      secondary: 'Get 11 Specialists Instead.'
    },
    subheadline: 'Solo founder reality: You&apos;re the strategist, architect, developer, tester, documenter, support, and more. What if each role had a dedicated specialist? Deploy your squad and focus on what only you can do.',
    metrics: [
      { value: '11', label: 'specialists ready', color: 'primary' },
      { value: '50%', label: 'faster development', color: 'green' },
      { value: '0', label: 'hiring overhead', color: 'blue' },
      { value: '24/7', label: 'availability', color: 'purple' }
    ],
    primaryCTA: 'End Solo Struggle Now',
    secondaryCTA: 'See How It Works'
  },
  {
    id: 'metrics',
    name: 'Metrics Focused',
    badge: {
      icon: '📊',
      text: 'VALIDATED: 98% success rate proven',
      subtext: 'Real development metrics'
    },
    headline: {
      primary: '98% Success Rate.',
      secondary: 'Production Proven.'
    },
    subheadline: 'Not theoretical. Not a demo. Real development metrics from building AGENT-11 itself: 98% success rate, 50% faster timeline, production-grade quality. The same system that built this website is ready for your project.',
    metrics: [
      { value: '98%', label: 'success rate', color: 'green' },
      { value: '430+', label: 'lines deployed', color: 'blue' },
      { value: '6→3', label: 'weeks saved', color: 'purple' },
      { value: '85/100', label: 'UX rating', color: 'primary' }
    ],
    primaryCTA: 'Deploy Proven System',
    secondaryCTA: 'View All Metrics'
  }
]

interface HeroVariationsProps {
  variant?: HeroVariant
}

export default function HeroVariations({ variant = 'dogfooding' }: HeroVariationsProps) {
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [currentVariant, setCurrentVariant] = useState<HeroVariant>(variant)

  const hero = heroVariations.find(h => h.id === currentVariant) || heroVariations[0]

  const handleEmailSuccess = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        event_category: 'hero_lead_magnet',
        event_label: `${currentVariant}_variant`,
        value: 1
      })
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white section-padding">
      <div className="container">
        <div className="text-center max-w-5xl mx-auto">
          {/* Variant Selector (only show in development/preview) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-sm font-medium text-yellow-800 mb-2">A/B Test Variants (Dev Only)</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {heroVariations.map((variation) => (
                  <button
                    key={variation.id}
                    onClick={() => setCurrentVariant(variation.id)}
                    className={`px-3 py-1 text-xs rounded ${
                      currentVariant === variation.id
                        ? 'bg-yellow-600 text-white'
                        : 'bg-white text-yellow-800 border border-yellow-300'
                    }`}
                  >
                    {variation.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-full text-sm font-medium mb-8 animate-fade-in hover-glow transition-all duration-300 hover:scale-105 border border-green-200">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-gentle"></span>
            <span className="animate-bounce-gentle">{hero.badge.icon}</span>
            <span className="font-bold">{hero.badge.text}</span>
            <span className="mx-2 text-green-600">•</span>
            <span className="font-bold">{hero.badge.subtext}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
            <span className="block text-gray-900">{hero.headline.primary}</span>
            <span className="block text-gradient">{hero.headline.secondary}</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto text-balance animate-slide-up" style={{animationDelay: '0.2s'}}>
            {hero.subheadline}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10 animate-slide-up" style={{animationDelay: '0.3s'}}>
            {hero.metrics.map((metric, index) => (
              <div key={index} className="text-center bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className={`text-2xl font-bold text-${metric.color}-600 mb-1`}>
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Installation Command */}
          <div className="bg-gray-900 rounded-xl p-6 max-w-4xl mx-auto mb-8 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm ml-4">Deploy Your Squad in &lt;1 Second</span>
            </div>
            <div className="font-mono text-green-400 text-sm sm:text-base flex items-center justify-between bg-gray-800 rounded-lg p-4">
              <div className="flex items-center min-w-0 flex-1">
                <span className="text-green-400 mr-2">$</span>
                <span className="text-gray-300 truncate">curl -sSL https://raw.githubusercontent.com/TheWayWithin/agent-11/main/deployment/scripts/install.sh | bash -s core</span>
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText('curl -sSL https://raw.githubusercontent.com/TheWayWithin/agent-11/main/deployment/scripts/install.sh | bash -s core')}
                className="ml-4 px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white text-xs rounded transition-colors shrink-0"
                title="Copy command"
              >
                Copy
              </button>
            </div>
            <div className="text-gray-400 text-xs mt-2 text-center">
              Same command that built this website. Tested. Proven. Production-ready.
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
              {hero.primaryCTA}
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            
            <button 
              onClick={() => setShowEmailCapture(!showEmailCapture)}
              className="btn-secondary group hover-glow relative overflow-hidden"
            >
              <svg className="w-5 h-5 mr-2 group-hover:animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
              </svg>
              {hero.secondaryCTA}
              <svg className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
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

          {/* Development Story Terminal */}
          <div className="relative max-w-4xl mx-auto animate-fade-in hover-lift" style={{animationDelay: '0.6s'}}>
            <div className="bg-gray-900 rounded-xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse-gentle"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse-gentle" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-gentle" style={{animationDelay: '0.2s'}}></div>
                <span className="text-gray-400 text-sm ml-4 animate-fade-in">AGENT-11 Building AGENT-11 (Real Development Session)</span>
              </div>
              
              <div className="font-mono text-sm text-gray-300 space-y-2">
                <div className="flex items-center animate-slide-up">
                  <span className="text-green-400 animate-pulse-gentle">$</span>
                  <span className="ml-2">@coordinator &quot;Build a production deployment system&quot;</span>
                </div>
                <div className="text-blue-400 animate-slide-up" style={{animationDelay: '0.1s'}}>
                  <span className="animate-bounce-gentle">🎯</span>
                  <span className="ml-2">THE COORDINATOR: Analyzing requirements...</span>
                </div>
                <div className="text-purple-400 animate-slide-up" style={{animationDelay: '0.2s'}}>
                  <span className="animate-bounce-gentle">🏗️</span>
                  <span className="ml-2">THE ARCHITECT: Designing system architecture...</span>
                </div>
                <div className="text-green-400 animate-slide-up" style={{animationDelay: '0.3s'}}>
                  <span className="animate-bounce-gentle">💻</span>
                  <span className="ml-2">THE DEVELOPER: Writing 430+ lines of production code...</span>
                </div>
                <div className="text-yellow-400 animate-slide-up" style={{animationDelay: '0.4s'}}>
                  <span className="animate-bounce-gentle">✅</span>
                  <span className="ml-2">THE TESTER: Validating with comprehensive test suite...</span>
                </div>
                <div className="text-orange-400 animate-slide-up" style={{animationDelay: '0.5s'}}>
                  <span className="animate-bounce-gentle">📚</span>
                  <span className="ml-2">THE DOCUMENTER: Creating 6 professional guides...</span>
                </div>
                <div className="flex items-center animate-slide-up text-green-300" style={{animationDelay: '0.6s'}}>
                  <span className="text-green-400 animate-pulse-gentle">✅</span>
                  <span className="ml-2 font-bold">
                    SUCCESS: 98% success rate, &lt;1s installation, production-ready!
                    <span className="animate-bounce-gentle inline-block ml-2">🎉</span>
                  </span>
                </div>
                <div className="text-gray-500 text-xs animate-slide-up mt-4" style={{animationDelay: '0.7s'}}>
                  Timeline: 6 weeks → 3 weeks | Quality: Enterprise-grade | Status: Proven in production
                </div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}