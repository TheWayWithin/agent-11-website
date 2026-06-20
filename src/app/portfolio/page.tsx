'use client'

import Link from 'next/link'

export default function PortfolioPage() {
  const ecosystemPrinciples = [
    'Works Independently - Use one, use all, or pick and choose',
    'Compounds Together - Maximum impact when combined',
    'Open Source First - Transparent, forkable, community-driven',
    'Documentation Heavy - Because undocumented tools are unusable tools',
    'Solo Founder Scale - No enterprise bloat, just what you need'
  ]

  const projects = [
    {
      number: 1,
      title: 'AGENT-11',
      tagline: 'Your Elite Development Squad in Claude Code',
      status: 'Active Development',
      statusColor: 'bg-green-100 text-green-800',
      problem: 'Solo developers lose huge chunks of their time to coordination, context-switching, and rework. You have the skills to build it, but wearing every hat (strategist, developer, tester, deployer) simultaneously is crushing productivity.',
      solution: 'AGENT-11 deploys 11 specialized AI agents directly into Claude Code as your personal dev team. Execute complex missions with a single /coord command. Each agent has specialist-level expertise, explicit tool permissions, and context preservation that cuts rework between specialists.',
      capabilities: [
        '13 pre-built missions (BUILD, FIX, MVP, DEPLOY, OPTIMIZE, and more)',
        'Context Preservation System (zero context loss between specialists)',
        'Extended Thinking Protocols (deeper reasoning on complex tasks)',
        '32-guide Field Manual (professional-grade architecture templates)',
        'Native MCP tool-search (agents find and load any connected MCP on demand)',
        'Read-only quality gates and measured keep-or-revert loops (v6.2): agents cannot game their own success criteria'
      ],
      perfectFor: [
        'Solo founders building MVPs in weeks, not months',
        'Technical founders who need team-level execution without team overhead',
        'Developers shipping complex features while maintaining quality'
      ],
      techStack: 'Claude Code, Multi-Agent Orchestration, File-Based Agent System',
      links: [
        { label: 'Deploy AGENT-11', url: 'https://github.com/TheWayWithin/agent-11', external: true },
        { label: 'Live Demo', url: '/', external: false },
        { label: 'Read the Case Study', url: 'https://github.com/TheWayWithin/agent-11/blob/main/CASE-STUDY.md', external: true }
      ]
    },
    {
      number: 2,
      title: 'LLM.txt Mastery',
      tagline: 'Make Your Documentation AI-Ready in Minutes',
      status: 'Active Development',
      statusColor: 'bg-green-100 text-green-800',
      problem: 'Your documentation is invisible to AI systems. ChatGPT, Claude, and Cursor can\'t find your library, understand your API, or reference your framework because your docs aren\'t optimized for LLM consumption.',
      solution: 'LLM.txt Mastery implements the llms.txt standard (proposed by Answer.AI) to make your documentation instantly discoverable by AI systems. Generate both /llms.txt (navigation) and /llms-full.txt (complete content) in the format LLMs expect.',
      capabilities: [
        'One-command generation from existing documentation',
        'Automatic structure optimization for LLM context windows',
        'Validation against llms.txt standard specification',
        'Integration with Mintlify, Cursor, and other AI-native tools',
        'SEO benefits: discoverable by both humans AND AI'
      ],
      perfectFor: [
        'Open-source library maintainers who want AI to recommend their tools',
        'SaaS founders who need AI assistants to understand their API',
        'Technical writers optimizing documentation for AI-first developers',
        'Developer advocates increasing framework adoption'
      ],
      techStack: 'Markdown Processing, LLM.txt Standard, Documentation Transformation',
      links: [
        { label: 'Launch LLM.txt Mastery', url: 'https://llmtxtmastery.com', external: true },
        { label: 'Learn about llms.txt standard', url: 'https://llmstxt.org/', external: true }
      ]
    },
    {
      number: 3,
      title: 'AI Impact Scanner',
      tagline: 'Quantify AI\'s Real Business Impact, Not the Hype',
      status: 'Planning Phase',
      statusColor: 'bg-blue-100 text-blue-800',
      problem: 'Everyone talks about "AI transformation," but few can measure actual ROI. Is your AI implementation saving time? Increasing revenue? Reducing costs? Or just creating expensive complexity?',
      solution: 'AI Impact Scanner cuts through the hype with data-driven analysis of AI\'s real impact on your business. Track time savings, quality improvements, cost reductions, and revenue impact. Get concrete metrics that justify (or question) your AI investments.',
      capabilities: [
        'Automatic time-to-value measurement (how fast AI delivers results)',
        'Quality metrics (accuracy, consistency, error reduction)',
        'Cost analysis (AI spend vs. manual alternative costs)',
        'Revenue attribution (AI\'s contribution to growth)',
        'Comparison framework (AI vs. traditional approaches)'
      ],
      perfectFor: [
        'Solo founders evaluating whether AI tools are worth the investment',
        'Product teams measuring AI feature impact on user satisfaction',
        'Technical leaders presenting AI ROI to stakeholders',
        'Consultants advising clients on AI adoption strategy'
      ],
      techStack: 'Analytics Pipeline, Business Intelligence, Impact Measurement',
      links: [
        { label: 'AI Impact Scanner (Coming Soon)', url: 'https://aimpactscanner.com', external: true }
      ]
    },
    {
      number: 4,
      title: 'Evolve-7',
      tagline: 'Multi-Modal AI Insight Engine for Personal & Business Evolution',
      status: 'Active Development',
      statusColor: 'bg-green-100 text-green-800',
      problem: 'You\'re drowning in data but starving for insights. Business metrics, personal habits, health data, project progress—scattered across a dozen tools with no way to see how they connect or what they mean.',
      solution: 'Evolve-7 is a multi-modal AI insight engine that ingests data from any source (text, images, numbers, files) and delivers actionable insights for personal and business evolution. Think of it as your AI analyst that connects all the dots.',
      capabilities: [
        'Multi-Modal Analysis: Process text, images, metrics, documents—any data format',
        'Pattern Recognition: AI identifies trends, correlations, and opportunities you\'d miss',
        'Actionable Insights: Not just data visualization—actual recommendations for improvement',
        '7-Day Evolution Cycles: Weekly insights that compound over time',
        'Cross-Domain Intelligence: See how business metrics affect personal well-being and vice versa'
      ],
      perfectFor: [
        'Solo founders tracking business + personal metrics holistically',
        'Data-driven professionals who want insights, not just dashboards',
        'Anyone seeking evidence-based decision making across all life domains'
      ],
      techStack: 'Multi-Modal AI, Data Integration, Insight Generation, Claude/GPT APIs',
      links: [
        { label: 'Evolve-7 (In Development)', url: 'https://evolve-7.com', external: true }
      ]
    },
    {
      number: 5,
      title: 'Solo Market',
      tagline: 'Build in Public, Launch & Sales Platform for SaaS, Apps, Tools & Services',
      status: 'Active Development',
      statusColor: 'bg-green-100 text-green-800',
      problem: 'You\'re building alone, launching alone, and selling alone. No audience, no launch strategy, no distribution channel. Traditional platforms don\'t work for solo founders—they\'re built for teams with marketing budgets.',
      solution: 'Solo Market is the complete build-in-public, launch, and sales platform designed specifically for solo founders shipping SaaS, apps, tools, and services. Build your audience while you build, launch with momentum, and sell without a sales team.',
      capabilities: [
        'Build in Public Hub: Document your journey, grow your audience pre-launch',
        'Launch Infrastructure: Countdown pages, waitlists, launch day automation',
        'Sales Platform: Storefront, checkout, delivery—everything you need to monetize',
        'Distribution Tools: Built-in audience, community features, cross-promotion',
        'Solo-Optimized: No team needed, no marketing expertise required'
      ],
      perfectFor: [
        'Solo SaaS founders building their first paid product',
        'Indie hackers launching apps, tools, or digital services',
        'Technical founders who want to build AND market simultaneously',
        'Anyone tired of launching to crickets'
      ],
      techStack: 'Next.js, Stripe, Email Automation, Community Platform, Analytics',
      links: [
        { label: 'Solo Market (Planned Launch 2025)', url: 'https://solomarket.work', external: true }
      ]
    },
    {
      number: 6,
      title: 'JamieWatters.work',
      tagline: 'Portfolio & Central Hub for All Projects',
      status: 'Active - Built with AGENT-11',
      statusColor: 'bg-green-100 text-green-800',
      problem: '',
      solution: 'Your central destination for all things Jamie Watters. Portfolio, blog, project index, and contact hub. Think of it as the homepage for the entire ecosystem. Built entirely with AGENT-11 to demonstrate the framework\'s capabilities for professional web development.',
      capabilities: [
        'Complete project portfolio with case studies',
        'Technical blog and thought leadership',
        'Contact information and social links',
        'Updates on new projects and releases',
        'Behind-the-scenes development insights',
        'Living proof of AGENT-11\'s real-world capabilities'
      ],
      perfectFor: [],
      techStack: 'Next.js, Tailwind CSS, MDX for content, built with AGENT-11 framework',
      links: [
        { label: 'Visit JamieWatters.work', url: 'https://jamiewatters.work', external: true }
      ]
    },
    {
      number: 7,
      title: 'AI Search Mastery',
      tagline: 'SEO & AI Search Optimization Expertise',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      problem: '',
      solution: 'Your go-to resource for understanding and mastering AI-powered search. Covers SEO, LLM optimization, and how to ensure your content is discoverable in the age of AI search.',
      capabilities: [
        'AI search fundamentals (ChatGPT, Claude, Perplexity search)',
        'SEO strategy for AI-first discovery',
        'LLM.txt implementation guides',
        'Case studies and real-world optimization'
      ],
      perfectFor: [],
      techStack: '',
      links: [
        { label: 'AI Search Mastery', url: 'https://aisearchmastery.com', external: true }
      ]
    },
    {
      number: 8,
      title: 'Mastery-AI Framework',
      tagline: 'AI Implementation Methodology for Real-World Results',
      status: 'Published - Built with AGENT-11',
      statusColor: 'bg-green-100 text-green-800',
      problem: '',
      solution: 'A comprehensive framework for implementing AI in your business without the hype. Practical methodology covering strategy, implementation, measurement, and optimization. Built with AGENT-11 to demonstrate the framework\'s capability for creating structured methodologies and documentation.',
      capabilities: [
        'AI readiness assessment',
        'Use case identification and prioritization',
        'Implementation roadmap',
        'Success metrics and measurement',
        'Continuous optimization protocols'
      ],
      perfectFor: [],
      techStack: 'Built With: AGENT-11 framework for content structure and methodology development',
      links: [
        { label: 'Mastery-AI Framework', url: 'https://aisearchmastery.com/mastery-ai-framework/', external: true }
      ]
    },
    {
      number: 9,
      title: 'BOS-AI',
      tagline: 'Built with AGENT-11 - Building Agents & Business Framework from Idea to IPO and Beyond',
      status: 'Open Source',
      statusColor: 'bg-green-100 text-green-800',
      problem: '',
      solution: 'BOS-AI is a fascinating project—it was built WITH AGENT-11, yet it also INSPIRED the creation of AGENT-11. This feedback loop demonstrates the power of both systems working together. The vision: Building agents and creating a comprehensive business framework to automate any business from idea to IPO and beyond. BOS-AI combines multi-agent orchestration with business process automation to handle everything: strategy, operations, finance, marketing, sales, and scaling.',
      capabilities: [
        'Context Preservation System: Eliminates agent "amnesia" through structured handoffs',
        'Business Automation: End-to-end automation of business operations',
        'Agent Orchestration: Multiple specialized AI agents working in coordination',
        'Complete Framework: From startup idea through growth to IPO and beyond',
        'Scalable Architecture: File-based context accumulation for perfect audit trails'
      ],
      perfectFor: [],
      techStack: '',
      links: [
        { label: 'BOS-AI on GitHub', url: 'https://github.com/TheWayWithin/BOS-AI', external: true },
        { label: 'Read the Documentation', url: 'https://github.com/TheWayWithin/BOS-AI#readme', external: true }
      ]
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container max-w-5xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            The Solo Founder Ecosystem: Tools, Frameworks & Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tools, frameworks, and resources built to help solo founders ship faster, stay discoverable,
            measure impact, and grow sustainably—from development to marketing.
          </p>
        </div>
      </section>

      {/* Ecosystem Overview */}
      <section className="section-padding bg-white">
        <div className="container max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Built by a Solo Founder, For Solo Founders
          </h2>

          <p className="text-xl text-gray-600 mb-8">
            Each project in this ecosystem emerged from real pain points—the kind that keep you up at night
            or slow you down during the day. These aren&apos;t theory or experiments. They&apos;re production tools
            I use to run my own business and build my own products.
          </p>

          <div className="bg-primary-50 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Ecosystem Principles</h3>
            <div className="space-y-3">
              {ecosystemPrinciples.map((principle, index) => (
                <div key={index} className="flex items-start gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{principle}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container max-w-6xl">
          <div className="space-y-12">
            {projects.map((project) => (
              <div key={project.number} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl font-bold text-primary-600">
                        {String(project.number).padStart(2, '0')}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{project.title}</h3>
                    </div>
                    <p className="text-lg text-gray-600 mb-3">{project.tagline}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${project.statusColor}`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Problem/Solution */}
                {project.problem && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">The Problem It Solves</h4>
                    <p className="text-gray-600">{project.problem}</p>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                    {project.problem ? 'The Solution' : 'The Hub'}
                  </h4>
                  <p className="text-gray-600">{project.solution}</p>
                </div>

                {/* Key Capabilities */}
                {project.capabilities.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                      Key {project.number === 6 ? 'Features' : 'Capabilities'}
                    </h4>
                    <ul className="space-y-2">
                      {project.capabilities.map((capability, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <svg className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Perfect For */}
                {project.perfectFor.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Perfect For</h4>
                    <ul className="space-y-2">
                      {project.perfectFor.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <span className="text-primary-600">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                {project.techStack && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">Tech Stack</h4>
                    <p className="text-gray-600">{project.techStack}</p>
                  </div>
                )}

                {/* Links */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                  {project.links.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.url}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                      {link.external && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Map Section */}
      <section className="section-padding bg-white">
        <div className="container max-w-5xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            How the Ecosystem Fits Together
          </h2>

          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-12 mb-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">🏗️</div>
                <h3 className="font-bold text-gray-900 mb-2">Build</h3>
                <p className="text-sm text-gray-600">AGENT-11 → Build your product fast</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">🔍</div>
                <h3 className="font-bold text-gray-900 mb-2">Discover</h3>
                <p className="text-sm text-gray-600">LLM.txt Mastery → Make it discoverable to AI</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-bold text-gray-900 mb-2">Measure</h3>
                <p className="text-sm text-gray-600">AI Impact Scanner → Measure what&apos;s working</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="font-bold text-gray-900 mb-2">Sell</h3>
                <p className="text-sm text-gray-600">Solo Market → Get customers</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">🌱</div>
                <h3 className="font-bold text-gray-900 mb-2">Sustain</h3>
                <p className="text-sm text-gray-600">Evolve-7 → Sustain the journey</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-bold text-gray-900 mb-2">Connect</h3>
                <p className="text-sm text-gray-600">All projects → Working together</p>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-lg">
            Each tool solves one problem exceptionally well. Together, they cover the full solo founder journey from idea to scale.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-blue-600 text-white">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Start with AGENT-11, Explore the Rest
          </h2>

          <p className="text-xl mb-8 text-primary-100">
            AGENT-11 is production-ready today. The rest of the ecosystem is in various stages of development.
            Want to follow along or contribute?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://github.com/TheWayWithin/agent-11"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 hover:bg-gray-100 rounded-lg font-semibold transition-colors text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Deploy AGENT-11 Now
            </Link>
            <Link
              href="https://github.com/TheWayWithin"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-700 text-white hover:bg-primary-800 rounded-lg font-semibold transition-colors text-lg border-2 border-white/20"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow Development on GitHub
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
