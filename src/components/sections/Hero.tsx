'use client'

import Link from 'next/link'
import { useGitHubStatsOnly } from '@/hooks/useGitHubStats'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

export default function Hero() {
  const { stars, loading, error, isStale } = useGitHubStatsOnly({
    refreshInterval: 5 * 60 * 1000, // 5 minutes
    autoRefresh: true
  })

  // Star count formatting is now handled by AnimatedCounter component

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white section-padding">
      <div className="container">
        <div className="text-center max-w-5xl mx-auto">
          {/* Social Proof Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in hover-glow transition-all duration-300 hover:scale-105">
            <span className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500 animate-pulse' : error ? 'bg-red-500' : isStale ? 'bg-orange-500 animate-pulse' : 'bg-green-500 animate-pulse-gentle'}`}></span>
            <span className="animate-bounce-gentle">🚀</span>
            <span>Join</span>
            <span className="mx-1 font-bold">
              <AnimatedCounter 
                value={stars} 
                formatValue={(num) => {
                  if (num >= 1000) {
                    return `${Math.floor(num / 1000)}.${Math.floor((num % 1000) / 100)}k`
                  }
                  return num.toLocaleString()
                }}
                suffix="+"
                triggerAnimation={!loading && !error}
                className="text-primary-800"
              />
            </span>
            <span>founders building better software</span>
            {isStale && !loading && (
              <span className="text-xs text-primary-500 animate-spin ml-2" title="Data is being refreshed">
                ↻
              </span>
            )}
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
            <span className="block text-gray-900">Stop wearing 11 hats.</span>
            <span className="block text-gradient">Get 11 specialists instead.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto text-balance animate-slide-up" style={{animationDelay: '0.2s'}}>
            Go from solo struggle to specialist support in 5 minutes. 
            Ship faster, sleep better, stress less with your personal dev team that never sleeps.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up" style={{animationDelay: '0.4s'}}>
            <Link 
              href="https://github.com/agent-11/framework" 
              className="btn-primary group hover-glow relative overflow-hidden"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 mr-2 group-hover:animate-bounce-gentle" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Get Started Free
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <button className="btn-secondary group hover-glow relative overflow-hidden">
              <svg className="w-5 h-5 mr-2 group-hover:animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2-10a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch 2-Min Demo
              <svg className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Hero Visual Placeholder */}
          <div className="relative max-w-4xl mx-auto animate-fade-in hover-lift" style={{animationDelay: '0.6s'}}>
            <div className="bg-gray-900 rounded-xl p-6 shadow-2xl relative overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse-gentle"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse-gentle" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-gentle" style={{animationDelay: '0.2s'}}></div>
                <span className="text-gray-400 text-sm ml-4 animate-fade-in">terminal</span>
              </div>
              
              {/* Terminal Content */}
              <div className="font-mono text-sm text-gray-300 space-y-2">
                <div className="flex items-center animate-slide-up">
                  <span className="text-green-400 animate-pulse-gentle">$</span>
                  <span className="ml-2">agent-11 deploy --squad=core</span>
                </div>
                <div className="text-gray-500 animate-slide-up" style={{animationDelay: '0.1s'}}>
                  <span className="animate-bounce-gentle">🎯</span>
                  <span className="ml-2">THE STRATEGIST: Ready to define your vision</span>
                </div>
                <div className="text-gray-500 animate-slide-up" style={{animationDelay: '0.2s'}}>
                  <span className="animate-bounce-gentle">💻</span>
                  <span className="ml-2">THE DEVELOPER: Ready to build fast and right</span>
                </div>
                <div className="text-gray-500 animate-slide-up" style={{animationDelay: '0.3s'}}>
                  <span className="animate-bounce-gentle">✅</span>
                  <span className="ml-2">THE TESTER: Ready to ensure quality</span>
                </div>
                <div className="text-gray-500 animate-slide-up" style={{animationDelay: '0.4s'}}>
                  <span className="animate-bounce-gentle">🚀</span>
                  <span className="ml-2">THE OPERATOR: Ready to deploy with confidence</span>
                </div>
                <div className="flex items-center animate-slide-up" style={{animationDelay: '0.5s'}}>
                  <span className="text-green-400 animate-pulse-gentle">$</span>
                  <span className="ml-2 text-green-300 animate-pulse-gentle">
                    Your personal dev team is ready! 
                    <span className="animate-bounce-gentle inline-block">🚀</span>
                  </span>
                </div>
              </div>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}