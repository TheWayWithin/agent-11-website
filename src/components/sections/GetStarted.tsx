import Link from 'next/link'
import EmailCapture from '@/components/ui/EmailCapture'

export default function GetStarted() {
  const quickStartSteps = [
    {
      step: '01',
      title: 'Choose Your Squad',
      description: 'Deploy Core Squad (4 agents) for most projects, Full Squad (12 agents) for complex builds',
      command: 'curl -sSL https://raw.githubusercontent.com/TheWayWithin/agent-11/main/deployment/scripts/install.sh | bash -s core',
      time: 'Under 5 minutes'
    },
    {
      step: '02', 
      title: 'Start Building',
      description: 'Your project-local agents understand your codebase and work together seamlessly',
      command: '@coordinator "Build a user authentication system with social login"',
      time: '2 minutes'
    },
    {
      step: '03',
      title: 'Deploy & Scale',
      description: 'Production-ready code with tests, documentation, and deployment guides',
      command: '🎯 Strategy → 🏗️ Architecture → 💻 Code → ✅ Tests → 📚 Docs → 🚀 Deploy',
      time: '2-4 weeks'
    }
  ]

  const pricingTiers = [
    {
      name: 'Open Source',
      price: 'Free',
      description: 'Perfect for indie hackers and side projects',
      features: [
        'Full 11-agent framework',
        'Community support',
        'GitHub integration', 
        'Basic templates',
        'Local deployment'
      ],
      cta: 'Get Started Free',
      ctaLink: 'https://github.com/TheWayWithin/agent-11/',
      highlighted: true
    },
    {
      name: 'Pro',
      price: '$29/month',
      description: 'For serious founders and consultants',
      features: [
        'Everything in Open Source',
        'Cloud deployment',
        'Priority support',
        'Advanced templates',
        'Team collaboration',
        'Usage analytics'
      ],
      cta: 'Start 14-Day Trial',
      ctaLink: '#',
      highlighted: false
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        'Custom agents',
        'SLA guarantees',
        'Dedicated support',
        'On-premise deployment',
        'Security audit'
      ],
      cta: 'Contact Sales',
      ctaLink: '#',
      highlighted: false
    }
  ]

  return (
    <section className="bg-white section-padding">
      <div className="container">
        {/* Main CTA Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Ready to 10x Your Development?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance mb-8">
            Join thousands of developers who have transformed their solo struggle 
            into specialist success. Your personal dev team is 5 minutes away.
          </p>
          
          {/* Social Proof Counter */}
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-full text-lg font-semibold mb-12">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            <span>2,847 developers shipped faster this week</span>
          </div>
        </div>

        {/* Quick Start Process */}
        <div className="max-w-5xl mx-auto mb-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            From Zero to Deployed in 3 Steps
          </h3>
          
          <div className="space-y-8">
            {quickStartSteps.map((step, index) => (
              <div key={index} className="grid lg:grid-cols-3 gap-8 items-center">
                {/* Step Info */}
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{step.title}</h4>
                      <div className="text-sm text-primary-600 font-medium">{step.time}</div>
                    </div>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                {/* Command/Visual */}
                <div className="lg:col-span-2">
                  <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-400 ml-4">terminal</span>
                    </div>
                    <div className="text-green-400">
                      <span>$ </span>
                      <span className="text-gray-300">{step.command}</span>
                    </div>
                  </div>
                </div>
                
                {/* Connector Line */}
                {index < quickStartSteps.length - 1 && (
                  <div className="hidden lg:block lg:col-span-3">
                    <div className="w-px h-8 bg-gray-200 mx-auto"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Squad Selection Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Squad Size
            </h3>
            <p className="text-gray-600 text-lg">
              Each project gets its own local team that understands your codebase perfectly
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Minimal Squad */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-gray-900 mb-2">Minimal Squad</div>
                <div className="text-sm text-gray-600 mb-4">Perfect for prototyping</div>
                <div className="text-3xl font-bold text-primary-600">2 Agents</div>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div>• THE COORDINATOR</div>
                <div>• THE DEVELOPER</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs">
                <div className="text-green-400">
                  $ bash -s minimal
                </div>
              </div>
            </div>

            {/* Core Squad */}
            <div className="bg-primary-50 rounded-xl p-6 border-2 border-primary-200 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Recommended
                </span>
              </div>
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-gray-900 mb-2">Core Squad</div>
                <div className="text-sm text-gray-600 mb-4">Ideal for most projects</div>
                <div className="text-3xl font-bold text-primary-600">4 Agents</div>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div>• THE COORDINATOR</div>
                <div>• THE STRATEGIST</div>
                <div>• THE ARCHITECT</div>
                <div>• THE DEVELOPER</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs">
                <div className="text-green-400">
                  $ bash -s core
                </div>
              </div>
            </div>

            {/* Full Squad */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-gray-900 mb-2">Full Squad</div>
                <div className="text-sm text-gray-600 mb-4">For complex projects</div>
                <div className="text-3xl font-bold text-primary-600">12 Agents</div>
              </div>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div>• All Core Squad agents +</div>
                <div>• THE TESTER</div>
                <div>• THE DESIGNER</div>
                <div>• THE DOCUMENTER</div>
                <div>• THE OPERATOR</div>
                <div>• THE SUPPORT</div>
                <div>• THE ANALYST</div>
                <div>• THE MARKETER</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs">
                <div className="text-green-400">
                  $ bash -s full
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Development Superpower
            </h3>
            <p className="text-gray-600 text-lg">
              Start free, scale when you&apos;re ready. No commitment, no credit card required.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index}
                className={`rounded-2xl p-8 ${
                  tier.highlighted 
                    ? 'bg-primary-600 text-white ring-4 ring-primary-200 transform scale-105' 
                    : 'bg-gray-50 text-gray-900'
                }`}
              >
                {tier.highlighted && (
                  <div className="text-center mb-4">
                    <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h4 className="text-2xl font-bold mb-2">{tier.name}</h4>
                  <div className="text-4xl font-bold mb-2">{tier.price}</div>
                  <p className={tier.highlighted ? 'text-primary-100' : 'text-gray-600'}>
                    {tier.description}
                  </p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <svg 
                        className={`w-5 h-5 ${tier.highlighted ? 'text-primary-200' : 'text-green-500'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={tier.ctaLink}
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                    tier.highlighted
                      ? 'bg-white text-primary-600 hover:bg-gray-100'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                  target={tier.ctaLink.startsWith('http') ? '_blank' : undefined}
                  rel={tier.ctaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-br from-primary-50 to-white rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Stop wearing 11 hats. Get 11 specialists.
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link 
              href="https://github.com/TheWayWithin/agent-11/"
              className="btn-primary text-lg px-8 py-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Deploy Your Team Now
            </Link>
            
            <button className="btn-secondary text-lg px-8 py-4">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
              </svg>
              Join Discord Community
            </button>
          </div>
          
          <p className="text-gray-600">
            5-minute setup • No credit card required • Open source forever
          </p>
        </div>

        {/* Discord Community Section */}
        <div className="bg-gradient-to-r from-primary-50 to-indigo-50 rounded-2xl p-8 mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Get 10x Performance Out of the Box
                </h3>
                <p className="text-gray-600 mb-4">
                  Don&apos;t just deploy agents—optimize them. Get our exclusive performance guide 
                  with benchmarks, configuration tweaks, and real-world case studies from top development teams.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Performance benchmarks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Production configs</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Enterprise case studies</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
                <div className="text-center">
                  <EmailCapture
                    variant="inline"
                    leadMagnet="AGENT-11 Performance Optimization Guide + Benchmarks"
                    title="⚡ Maximize Your Agent Performance"
                    description="Get configuration templates, optimization strategies, and performance benchmarks used by enterprise teams."
                    placeholder="Enter email for performance guide"
                    buttonText="Download Free Guide"
                    showSocialProof={true}
                    onSuccess={() => {
                      if (typeof window !== 'undefined' && window.gtag) {
                        window.gtag('event', 'conversion', {
                          event_category: 'performance_guide',
                          event_label: 'get_started_section',
                          value: 1
                        })
                      }
                    }}
                  />
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="https://github.com/TheWayWithin/agent-11/"
                      className="btn-primary group"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Start Building Now
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                    <button className="btn-secondary">
                      View Documentation
                    </button>
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    Free • Open Source • No signup required
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-16 border-t border-gray-200">
          <div className="grid md:grid-cols-4 gap-8 text-sm">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold text-primary-600 mb-4">AGENT-11</div>
              <p className="text-gray-600 mb-4 max-w-md">
                Your personal dev team that never sleeps. Built by developers, for developers, 
                to transform solo struggle into specialist success.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-primary-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="#" className="hover:text-primary-600 transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-primary-600 transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-primary-600 transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-primary-600 transition-colors">Changelog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Community</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="#" className="hover:text-primary-600 transition-colors">Discord</Link></li>
                <li><Link href="#" className="hover:text-primary-600 transition-colors">GitHub</Link></li>
                <li><Link href="#" className="hover:text-primary-600 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary-600 transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-gray-600 text-sm">
            <div>© 2025 AGENT-11. Open source and proud of it.</div>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <Link href="#" className="hover:text-primary-600 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-primary-600 transition-colors">Terms</Link>
              <Link href="#" className="hover:text-primary-600 transition-colors">License</Link>
            </div>
          </div>
        </footer>
      </div>
    </section>
  )
}