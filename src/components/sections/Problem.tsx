export default function Problem() {
  const problems = [
    {
      icon: '🔄',
      title: 'Context switching kills momentum',
      description: 'Average solo founder switches contexts 47 times per day, losing 23 minutes each time to regain focus.',
      emoji: '😵‍💫'
    },
    {
      icon: '⚖️',
      title: 'Quality suffers when wearing all hats',
      description: 'Quality drops 60% when handling more than 5 different domains. Users notice the difference.',
      emoji: '😰'
    },
    {
      icon: '🤔',
      title: 'Critical decisions made without expertise',
      description: 'The 3am debugging session that could have been prevented. The architecture choice you regret.',
      emoji: '🤦‍♂️'
    },
    {
      icon: '🔥',
      title: 'Solo founder burnout is real',
      description: 'That feature that\'s been "almost done" for 3 weeks. The technical debt you\'ll "fix later" (but never do).',
      emoji: '😴'
    }
  ]

  return (
    <section className="bg-gray-50 section-padding">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            The Solo Founder&apos;s Dilemma
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Building solo means wearing every hat. But quality, speed, and sanity shouldn&apos;t be the price you pay for independence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{problem.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {problem.description}
                  </p>
                  <div className="text-2xl">{problem.emoji}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Stat */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-white rounded-xl px-8 py-4 shadow-sm">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xl">📊</span>
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-gray-900">73%</div>
              <div className="text-sm text-gray-600">of solo founders cite resource constraints as #1 blocker</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}