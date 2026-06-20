export default function ProofOfSpeed() {
  const comparisons = [
    {
      task: 'User Authentication System',
      before: {
        issues: ['Security vulnerabilities', 'Missing edge cases', 'Poor error handling', 'No rate limiting']
      },
      after: {
        benefits: ['Security-first implementation', 'Comprehensive test coverage', 'Production-ready deployment', 'Monitoring included']
      }
    },
    {
      task: 'API Documentation',
      before: {
        issues: ['Outdated examples', 'Missing endpoints', 'No interactive testing', 'Poor search functionality']
      },
      after: {
        benefits: ['Auto-generated from code', 'Interactive playground', 'Always up to date', 'Full search capability']
      }
    },
    {
      task: 'Testing Suite',
      before: {
        issues: ['Low coverage', 'Flaky tests', 'Manual QA bottlenecks', 'No performance testing']
      },
      after: {
        benefits: ['Broad test coverage', 'Stable test suite', 'Automated QA pipeline', 'Performance checks']
      }
    }
  ]

  return (
    <section className="bg-gradient-to-br from-primary-50 to-white section-padding">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            From Scratch to Production-Ready
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Stop building everything from scratch. Your specialists deliver production-ready results
            instead of the half-finished output of a single person juggling every role.
          </p>
        </div>

        <div className="space-y-12 max-w-6xl mx-auto">
          {comparisons.map((comparison, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden animate-slide-up"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  {comparison.task}
                </h3>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Before */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <span>😰</span>
                        <span>Solo Founder Approach</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Common Issues:</h4>
                      {comparison.before.issues.map((issue, issueIndex) => (
                        <div key={issueIndex} className="flex items-start gap-3">
                          <span className="text-red-500 mt-1">❌</span>
                          <span className="text-gray-700">{issue}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* After */}
                  <div className="space-y-6 lg:border-l lg:border-gray-200 lg:pl-8">
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <span>🚀</span>
                        <span>AGENT-11 Team</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">What You Get:</h4>
                      {comparison.after.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-start gap-3">
                          <span className="text-green-500 mt-1">✅</span>
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Honest speed framing */}
        <div className="mt-16 max-w-3xl mx-auto text-center p-8 bg-white rounded-xl shadow-sm">
          <p className="text-lg text-gray-700 leading-relaxed">
            In my own builds, the squad is orders of magnitude faster than working solo. I don&apos;t publish benchmark numbers; the code is open so you can judge for yourself.
          </p>
        </div>

        {/* Real Example */}
        <div className="mt-16 bg-gray-900 rounded-2xl p-8 text-center">
          <div className="text-white mb-6">
            <h3 className="text-2xl font-bold mb-4">Real Example: AGENT-11 built AGENT-11</h3>
          </div>
          <blockquote className="text-gray-300 italic text-lg max-w-2xl mx-auto">
            &quot;AGENT-11&apos;s own deployment system was built by AGENT-11. The whole build is open: read the code, the case study, and the decisions for yourself.&quot;
          </blockquote>
          <div className="text-gray-400 mt-4">- Jamie Watters, builder of AGENT-11</div>
        </div>
      </div>
    </section>
  )
}