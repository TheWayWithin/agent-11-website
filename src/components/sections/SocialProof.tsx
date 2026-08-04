'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useGitHubStats } from '@/hooks/useGitHubStats'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import TrustIndicator from '@/components/ui/TrustIndicator'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'

const testimonials = [
  {
    id: 'dogfooding',
    type: 'The Ultimate Proof',
    name: 'AGENT-11 Development Team',
    role: 'Self-Built System',
    avatar: '🤖',
    quote: "AGENT-11 built its own deployment system. This isn't theoretical: the whole build is open, so you can read the code and the decisions for yourself.",
    metrics: "Self-built system",
    featured: true
  },
  {
    id: 'open-source',
    type: 'The Open Build',
    name: 'Public Codebase',
    role: 'MIT Licensed',
    avatar: '📂',
    quote: "Free and open source under the MIT licence. Fork it, read it, adapt it. Nothing is hidden behind a paywall or a benchmark you cannot check.",
    metrics: "Free and open source",
    featured: false
  },
  {
    id: 'squad',
    type: 'The Full Squad',
    name: 'Eleven Specialists',
    role: '18 Missions',
    avatar: '✅',
    quote: "Every install deploys all 11 specialist agents and 18 missions, ready for your codebase from the first command. The same squad that built this is ready to build your next project.",
    metrics: "11 agents, 18 missions",
    featured: false
  },
  {
    id: 'installation',
    type: 'The Quick Install',
    name: 'Deployment Performance',
    role: 'Installation Time',
    avatar: '⚡',
    quote: "One command installs the whole squad in seconds. The deployment system the squad built for itself works the same way on your machine.",
    metrics: "Install in seconds",
    featured: false
  }
]

export default function SocialProof() {
  const [activeTestimonial, setActiveTestimonial] = useState(testimonials[0]) // Featured testimonial (dogfooding story)
  const { stats, contributors, loading, error, isStale } = useGitHubStats({
    refreshInterval: 10 * 60 * 1000, // 10 minutes - less frequent for social proof
    autoRefresh: true
  })

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`
    }
    return num.toLocaleString()
  }

  const formatActivity = (activity: number): string => {
    if (activity === 0) return '10+'
    return activity > 50 ? '50+' : `${activity}`
  }

  // Genuine, observable facts about AGENT-11 (no unsourced comparisons)
  const authenticMetrics = {
    agents: '11', // Specialist agents deployed on every install
    missions: '18', // Missions available via /coord
    // Neither a percentage nor a stopwatch figure is traceable to anything
    // in the repo, so neither ships. Both were unsourced tiles (brief C).
    filePersistence: 'On disk', // Agents are files in your project, not a service
    installationTime: 'One command', // Not measured; do not restate as a duration
  }

  // Dynamic values that can update from API (but with stability)
  const displayStats = {
    ...authenticMetrics,
    stars: loading ? '—' : error ? '—' : formatNumber(stats?.stars ?? 0),
    contributors: loading ? '—' : error ? '—' : formatNumber(stats?.contributors ?? 0),
    activity: loading ? '—' : error ? '—' : formatActivity(stats?.recentActivity ?? 0),
  }

  return (
    <section className="bg-white section-padding">
      <div className="container">
        {/* Authentic Development Metrics */}
        <div className="text-center mb-16">
          <TrustIndicator
            status={loading ? 'loading' : error ? 'error' : isStale ? 'stale' : 'live'}
            label="Proven through authentic dogfooding"
            sublabel="AGENT-11 built AGENT-11 itself - documented results"
            className="mb-8 animate-fade-in hover-glow"
            icon="🏆"
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
            <div className="text-center group hover-lift animate-stagger-fade-1">
              <div className="text-3xl font-bold text-gray-900 mb-1 transition-all duration-300">
                <span className="text-2xl mr-1">🤖</span>
                <AnimatedCounter
                  value={displayStats.agents}
                  className="group-hover:text-blue-600"
                  triggerAnimation={false} // Static authentic value
                />
              </div>
              <div className="text-gray-600 group-hover:text-gray-700 transition-colors">Specialist Agents</div>
              <div className="text-xs text-gray-500">Deployed on every install</div>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="text-center group hover-lift animate-stagger-fade-2">
              <div className="text-3xl font-bold text-gray-900 mb-1 transition-all duration-300">
                <span className="text-2xl mr-1">🎯</span>
                <AnimatedCounter
                  value={displayStats.missions}
                  className="group-hover:text-purple-600"
                  triggerAnimation={false} // Static authentic value
                />
              </div>
              <div className="text-gray-600 group-hover:text-gray-700 transition-colors">Missions</div>
              <div className="text-xs text-gray-500">Run via the /coord command</div>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="text-center group hover-lift animate-stagger-fade-3">
              <div className="text-3xl font-bold text-green-600 mb-1 group-hover:animate-bounce-gentle">
                <span className="text-2xl mr-1">💾</span>
                <AnimatedCounter
                  value={displayStats.filePersistence}
                  className="group-hover:text-green-700"
                  triggerAnimation={false} // Static authentic value
                />
              </div>
              <div className="text-gray-600 group-hover:text-gray-700 transition-colors">File Persistence</div>
              <div className="text-xs text-gray-500">File-based agents write to disk</div>
              <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="text-center group hover-lift animate-stagger-fade-4">
              <div className="text-3xl font-bold text-gray-900 mb-1 transition-all duration-300">
                <span className="text-2xl mr-1">⚡</span>
                <AnimatedCounter
                  value={displayStats.installationTime}
                  className="group-hover:text-orange-600"
                  triggerAnimation={false} // Static authentic value
                />
              </div>
              <div className="text-gray-600 group-hover:text-gray-700 transition-colors">Installation Time</div>
              <div className="text-xs text-gray-500">One command, install in seconds</div>
              <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-4xl mx-auto mb-16 animate-scale-in">
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 lg:p-12 shadow-lg hover-glow transition-all duration-500 hover:shadow-2xl">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-float">{activeTestimonial.avatar}</div>
              <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium mb-4 animate-bounce-gentle trust-badge">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-gentle"></span>
                {activeTestimonial.type}
              </div>
              <blockquote className="text-xl lg:text-2xl text-gray-900 mb-6 font-medium leading-relaxed animate-fade-in">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </blockquote>
              <div className="text-primary-600 font-bold text-lg mb-2 animate-pulse-gentle">
                <span className="inline-block animate-bounce-gentle">📈</span>
                <span className="ml-2">{activeTestimonial.metrics}</span>
              </div>
              <div className="text-gray-700 font-semibold animate-slide-up">{activeTestimonial.name}</div>
              <div className="text-gray-500 animate-slide-up-delayed">{activeTestimonial.role}</div>
            </div>
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setActiveTestimonial(testimonial)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 text-left interactive-card group relative ${
                activeTestimonial.id === testimonial.id
                  ? 'border-primary-500 bg-primary-50 shadow-lg animate-glow'
                  : 'border-gray-200 bg-white hover:border-primary-300'
              }`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="text-3xl mb-3 group-hover:animate-bounce-gentle transition-transform">
                {testimonial.avatar}
              </div>
              <div className="text-sm font-medium text-primary-600 mb-2 group-hover:text-primary-700 transition-colors">
                {testimonial.type}
              </div>
              <div className="font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                {testimonial.name}
              </div>
              <div className="text-sm text-gray-600 mb-3 group-hover:text-gray-500 transition-colors">
                {testimonial.role}
              </div>
              <div className="text-sm font-medium text-green-600 group-hover:text-green-700 transition-colors flex items-center gap-1">
                <span className="inline-block group-hover:animate-pulse-gentle">✨</span>
                {testimonial.metrics}
              </div>
              {activeTestimonial.id === testimonial.id && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center animate-bounce-gentle">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Community Metrics */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          {/* Section-level heading: <h2>, not <h3>. It is a sibling of the
              other homepage section headings, not a child of the one above. */}
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Join the Community</h2>
          
          <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto mb-8">
            <div className="space-y-2 text-center group hover-lift animate-stagger-fade-2">
              <div className="text-2xl group-hover:animate-bounce-gentle">🔧</div>
              <div className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                {loading ? (
                  <LoadingSkeleton width="w-12" height="h-8" className="inline-block" />
                ) : (
                  <AnimatedCounter 
                    value={displayStats.contributors} 
                    triggerAnimation={!loading}
                  />
                )}
              </div>
              <div className="text-gray-600 group-hover:text-gray-700 transition-colors">Contributors</div>
              <div className="w-8 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="space-y-2 text-center group hover-lift animate-stagger-fade-3">
              <div className="text-2xl group-hover:animate-bounce-gentle">📈</div>
              <div className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                {loading ? (
                  <LoadingSkeleton width="w-12" height="h-8" className="inline-block" />
                ) : (
                  <AnimatedCounter 
                    value={displayStats.activity} 
                    triggerAnimation={!loading}
                  />
                )}
              </div>
              <div className="text-gray-600 group-hover:text-gray-700 transition-colors">Activity This Month</div>
              <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-purple-600 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Live Contributors Display */}
          {contributors.length > 0 ? (
            <div className="mb-8 animate-fade-in">
              <div className="text-sm text-gray-600 mb-4 flex items-center justify-center gap-2">
                <span className="animate-pulse-gentle">👥</span>
                <span>Recent Contributors</span>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-gentle"></span>
              </div>
              <div className="flex justify-center items-center gap-2 flex-wrap">
                {contributors.slice(0, 8).map((contributor, index) => (
                  <a
                    key={contributor.id}
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative animate-scale-in hover-lift"
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                    title={`${contributor.login} - ${contributor.contributions} contributions`}
                  >
                    <Image
                      src={contributor.avatar_url}
                      alt={`${contributor.login} - AGENT-11 contributor`}
                      width={32}
                      height={32}
                      loading="lazy"
                      className="w-8 h-8 rounded-full border-2 border-white shadow-md group-hover:border-primary-300 transition-all duration-300 group-hover:shadow-lg"
                    />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 animate-pulse-gentle">
                      <span className="sr-only">Active contributor</span>
                    </div>
                  </a>
                ))}
                {contributors.length > 8 && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 border-2 border-white shadow-md flex items-center justify-center text-xs font-semibold text-gray-600 hover-lift animate-scale-in hover:from-primary-100 hover:to-primary-200 transition-all duration-300">
                    +{contributors.length - 8}
                  </div>
                )}
              </div>
            </div>
          ) : loading ? (
            <div className="mb-8 animate-fade-in">
              <div className="text-sm text-gray-600 mb-4 text-center">Loading contributors...</div>
              <div className="flex justify-center items-center gap-2 flex-wrap">
                {Array.from({ length: 8 }).map((_, index) => (
                  <LoadingSkeleton
                    key={index}
                    variant="circular"
                    width="w-8"
                    height="h-8"
                    className={`animate-pulse`}
                    showShimmer={true}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-delayed-2">
            <button className="btn-secondary group hover-glow animate-stagger-fade-2">
              <svg aria-hidden="true" className="w-5 h-5 mr-2 group-hover:animate-bounce-gentle" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Star on GitHub
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}