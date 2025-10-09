'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  const values = [
    {
      icon: '🎯',
      title: 'Ship First, Perfect Later',
      description: 'The best product is the one that ships. MVP mentality with iteration discipline.'
    },
    {
      icon: '🔒',
      title: 'Security-First Development',
      description: 'Never compromise security for convenience. Root cause analysis before quick fixes.'
    },
    {
      icon: '📚',
      title: 'Documentation is Code',
      description: 'If it\'s not documented, it doesn\'t exist. Professional-grade documentation is non-negotiable.'
    },
    {
      icon: '🚀',
      title: 'Solo Founder Empowerment',
      description: 'One person with the right tools can compete with entire teams. Prove it daily.'
    },
    {
      icon: '🔍',
      title: 'Open Source, Open Process',
      description: 'Build in public. Share learnings. Make mistakes visible so others learn faster.'
    }
  ]

  const ecosystemProjects = [
    { name: 'AGENT-11', url: '/', description: 'Multi-agent development framework' },
    { name: 'JamieWatters.work', url: 'https://jamiewatters.work', description: 'Portfolio & central hub' },
    { name: 'Evolve-7', url: 'https://evolve-7.com', description: 'Multi-modal AI insight engine' },
    { name: 'LLM.txt Mastery', url: 'https://llmtxtmastery.com', description: 'AI-ready documentation' },
    { name: 'AI Impact Scanner', url: 'https://aimpactscanner.com', description: 'Measure AI business impact' },
    { name: 'Solo Market', url: 'https://solomarket.work', description: 'Build in public platform' },
    { name: 'Mastery-AI Framework', url: 'https://aisearchmastery.com/mastery-ai-framework/', description: 'AI implementation framework' },
    { name: 'BOS-AI', url: 'https://github.com/TheWayWithin/BOS-AI', description: 'Business automation (inspired AGENT-11)' }
  ]

  const otherProjects = [
    { name: 'AI Search Mastery', url: 'https://aisearchmastery.com', description: 'SEO & AI search optimization' }
  ]

  const specializations = [
    'AI Framework Architecture & Agent System Design',
    'Solo Founder Tooling & Developer Experience Optimization',
    'Rapid Prototyping → Production (MVP in weeks, not months)',
    'Context Preservation Systems & Extended Thinking Protocols',
    'Systems Programming: Assembler → Modern Web (full stack expertise)'
  ]

  const philosophyPoints = [
    { icon: '⚔️', text: 'Military-grade structure (missions, protocols, specialists) with startup speed' },
    { icon: '🤖', text: 'AI-first thinking without losing the human judgment that matters' },
    { icon: '📖', text: 'Documentation as infrastructure (7,777+ lines proving the concept)' },
    { icon: '🌐', text: 'Open-source principles with professional-grade execution' }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Building Tools for Solo Founders Who Ship Fast
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Hi, I&apos;m Jamie Watters. I build AI frameworks and developer tools that help solo founders
                turn technical complexity into competitive advantage. AGENT-11 is my answer to the question:
                &quot;How can one person build like a team?&quot;
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/portfolio"
                  className="btn-primary"
                >
                  View My Ecosystem
                </Link>
                <Link
                  href="/features"
                  className="btn-secondary"
                >
                  Explore AGENT-11
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/jamie-watters.jpg"
                  alt="Jamie Watters - Creator of AGENT-11"
                  width={800}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Why AGENT-11 Exists
          </h2>

          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p>
              The breaking point came after watching yet another talented solo founder drown in coordination overhead.
              They had the vision, the technical skills, and the drive—but building alone meant wearing every hat,
              context-switching constantly, and shipping slowly.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 my-8">
              <p className="font-semibold text-gray-900 mb-4">Traditional solutions didn&apos;t fit:</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <div>
                    <strong>Hiring a team?</strong> Expensive, slow to onboard, communication overhead kills productivity
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <div>
                    <strong>Outsourcing?</strong> Context loss, quality issues, timeline uncertainty
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <div>
                    <strong>Going it alone?</strong> Burnout, scope creep, and the nagging feeling you&apos;re moving too slowly
                  </div>
                </li>
              </ul>
            </div>

            <p className="text-xl font-semibold text-gray-900">
              There had to be a third option.
            </p>

            <p>
              AGENT-11 emerged from a radical idea: What if you could have specialist-level expertise without the
              coordination overhead? What if agents didn&apos;t just assist—they <em>specialized</em>, <em>coordinated</em>,
              and <em>preserved context</em> like a real team?
            </p>

            <p>
              The framework you see today was built with AGENT-11 itself. We dogfooded every feature, validated every
              workflow, and proved the concept by shipping the product in 3 weeks with measured <strong>87.5% reduction
              in rework</strong> and <strong>37.5% faster delivery</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Professional Background Section */}
      <section className="section-padding bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Expertise: Where AI Meets Real-World Shipping
          </h2>

          <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Background</h3>
            <p className="text-gray-600 leading-relaxed">
              Computing degree, systems programmer coding from assembler through to Next.js. I build these tools because
              I have the experience, knowledge, and the problems that need these solutions. Decades of system-level
              programming inform every architectural decision.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Specializations</h3>
            <ul className="space-y-3">
              {specializations.map((spec, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Philosophy</h3>
            <p className="text-gray-600 mb-6">
              I don&apos;t build technology for technology&apos;s sake. Every framework, every tool, every line of code
              serves one purpose: <em className="font-semibold">help solo founders ship faster without compromising quality.</em>
            </p>
            <div className="space-y-4">
              <p className="text-gray-900 font-medium">My approach combines:</p>
              {philosophyPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3 text-gray-600">
                  <span className="text-2xl">{point.icon}</span>
                  <p>{point.text}</p>
                </div>
              ))}
              <div className="flex items-start gap-3 text-gray-600">
                <span className="text-2xl">🔧</span>
                <p>Systems-level thinking applied to modern development challenges</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Broader Ecosystem Section */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Beyond AGENT-11: The Solo Founder Toolkit
          </h2>

          <p className="text-xl text-gray-600 mb-8">
            AGENT-11 is the flagship framework, but it&apos;s part of a larger ecosystem of tools and resources designed
            to help solo founders build, launch, and grow faster.
          </p>

          <div className="bg-gray-50 rounded-xl p-8 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Built with AGENT-11</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {ecosystemProjects.map((project, index) => (
                <Link
                  key={index}
                  href={project.url}
                  className="flex items-start gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all group"
                  target={project.url.startsWith('http') ? '_blank' : undefined}
                  rel={project.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <span className="text-primary-600 font-bold">{index + 1}.</span>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {project.name}
                    </div>
                    <div className="text-sm text-gray-600">{project.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Other Resources</h3>
            <div className="space-y-3">
              {otherProjects.map((project, index) => (
                <Link
                  key={index}
                  href={project.url}
                  className="flex items-start gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-all group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-blue-600 font-bold">{ecosystemProjects.length + index + 1}.</span>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </div>
                    <div className="text-sm text-gray-600">{project.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <p className="text-gray-600 mt-6 text-center">
            Each project solves a specific pain point in the solo founder journey. Built independently but designed to compound when used together.
          </p>

          <div className="text-center mt-8">
            <Link href="/portfolio" className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center gap-2">
              Explore the full ecosystem
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Vision & Values Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="container max-w-5xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            What Drives This Work
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Let&apos;s Build Together
          </h2>

          <p className="text-xl text-gray-600 mb-8">
            Whether you&apos;re shipping your first MVP or scaling your tenth product, the tools are here.
            Everything is open source, documented, and battle-tested.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="https://github.com/TheWayWithin/agent-11"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Deploy AGENT-11 Now
            </Link>
            <Link
              href="/portfolio"
              className="btn-secondary"
            >
              Explore the Ecosystem
            </Link>
          </div>

          <div className="flex justify-center gap-6 text-gray-600">
            <Link
              href="https://github.com/TheWayWithin"
              className="flex items-center gap-2 hover:text-primary-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
