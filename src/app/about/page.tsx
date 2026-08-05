'use client'

import Link from 'next/link'
import Image from 'next/image'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { formatUpdated } from '@/lib/seo'

export default function AboutPage() {
  const values = [
    {
      icon: '🔍',
      title: 'Build in Public',
      description: 'Share the journey—wins, failures, learnings. Transparency builds trust and helps others avoid my mistakes.'
    },
    {
      icon: '🤖',
      title: 'Scale with AI & Automation',
      description: 'AI isn\'t replacing me—it\'s multiplying me. Automate the repetitive, focus on the creative.'
    },
    {
      icon: '🎯',
      title: 'Build What I Need',
      description: 'Every tool started as a personal itch. If I need it, others probably do too. Then I share it.'
    },
    {
      icon: '🚀',
      title: 'Solopreneur Speed',
      description: 'One person with the right tools can move faster than teams. No meetings, no consensus, just shipping.'
    },
    {
      icon: '🌐',
      title: 'Open Source Everything',
      description: 'Copy it, fork it, tweak it. Rising tides lift all boats. The more people succeed, the better.'
    }
  ]

  const ecosystemProjects = [
    { name: 'JamieWatters.work', url: 'https://jamiewatters.work', description: 'The hub — follow the full journey here', featured: true },
    { name: 'AGENT-11', url: '/', description: 'Multi-agent development framework' },
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
    'AI Agent Systems & Multi-Agent Orchestration',
    'Automation Workflows for Solopreneurs',
    'Rapid Prototyping → Production (ship in weeks, not months)',
    'Building in Public & Open Source Development',
    'Full-Stack: From Systems Programming to Modern Web'
  ]

  const philosophyPoints = [
    { icon: '🤖', text: 'AI multiplies what I can do—automation handles the repetitive so I can focus on what matters' },
    { icon: '🔍', text: 'Build in public—share the wins, the failures, and everything in between' },
    { icon: '🌐', text: 'Open source by default—if it helped me, it might help you' },
    { icon: '🚀', text: 'Ship fast, iterate faster—perfectionism kills progress' }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Building in Public. Sharing What Works.
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                Hi, I&apos;m Jamie Watters. I&apos;m on a journey to solopreneur success, scaling with AI and automation.
                I build the tools I need, open source them, and share everything I learn along the way.
                If it helps me ship faster, maybe it&apos;ll help you too.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                Updated{' '}
                <time dateTime={PAGE_UPDATED.about}>{formatUpdated(PAGE_UPDATED.about)}</time>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://jamiewatters.work"
                  className="btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow My Journey
                </Link>
                <Link
                  href="/portfolio"
                  className="btn-secondary"
                >
                  See What I&apos;ve Built
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
            Why I Build This Stuff
          </h2>

          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p>
              I got tired of drowning in coordination overhead. I had ideas, technical skills, and drive—but building
              alone meant wearing every hat, context-switching constantly, and shipping way too slowly.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 my-8">
              <p className="font-semibold text-gray-900 mb-4">The usual options didn&apos;t work for me:</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <div>
                    <strong>Hiring a team?</strong> Expensive, slow to onboard, coordination overhead kills the speed advantage
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <div>
                    <strong>Outsourcing?</strong> Context loss, quality inconsistency, timeline uncertainty
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <div>
                    <strong>Grinding it alone?</strong> Burnout, scope creep, and always feeling behind
                  </div>
                </li>
              </ul>
            </div>

            <p className="text-xl font-semibold text-gray-900">
              So I built my own solution.
            </p>

            <p>
              AGENT-11 started as a personal tool—what if AI agents could actually <em>specialize</em>, <em>coordinate</em>,
              and <em>preserve context</em> like a real team? I built it for myself, used it to build more projects,
              and realized it might help others on the same journey.
            </p>

            <p>
              That&apos;s the pattern now: I build what I need, open source it, and share the learnings. Everything on
              <Link href="https://jamiewatters.work" className="text-primary-600 hover:text-primary-700" target="_blank" rel="noopener noreferrer"> jamiewatters.work</Link> follows
              this approach. Copy it, tweak it, make it yours—or just follow along and take what&apos;s useful.
            </p>
          </div>
        </div>
      </section>

      {/* Professional Background Section */}
      <section className="section-padding bg-gray-50">
        <div className="container max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Why I Can Build This Stuff
          </h2>

          <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Background</h3>
            <p className="text-gray-600 leading-relaxed">
              Computing degree. Systems programmer who&apos;s coded everything from assembler to Next.js.
              I build these tools because I have the technical depth AND the problems that need solving.
              Decades of system-level thinking applied to modern AI and automation challenges.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Specializations</h3>
            <ul className="space-y-3">
              {specializations.map((spec, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-600">
                  <svg aria-hidden="true" className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">How I Work</h3>
            <p className="text-gray-600 mb-6">
              I don&apos;t build technology for technology&apos;s sake. Every tool serves one purpose:
              <em className="font-semibold"> help me (and others) ship faster with AI and automation.</em>
            </p>
            <div className="space-y-4">
              {philosophyPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3 text-gray-600">
                  <span className="text-2xl">{point.icon}</span>
                  <p>{point.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Broader Ecosystem Section */}
      <section className="section-padding bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Everything I&apos;m Building
          </h2>

          <p className="text-xl text-gray-600 mb-8">
            Each project started as something I needed. Built it, used it, open sourced it.
            Follow the journey at <Link href="https://jamiewatters.work" className="text-primary-600 hover:text-primary-700 font-semibold" target="_blank" rel="noopener noreferrer">jamiewatters.work</Link> or
            grab whatever&apos;s useful to you.
          </p>

          <div className="bg-gray-50 rounded-xl p-8 mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">The Toolkit (All Open Source)</h3>
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
              <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            What I Believe
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
            Follow the Journey
          </h2>

          <p className="text-xl text-gray-600 mb-8">
            I&apos;m building in public—every tool, every lesson, every mistake.
            Grab what&apos;s useful, skip what isn&apos;t, or just follow along for the ride.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="https://jamiewatters.work"
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow at JamieWatters.work
            </Link>
            <Link
              href="https://github.com/TheWayWithin/agent-11"
              className="btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Get AGENT-11 (Free)
            </Link>
          </div>

          {/* Support Section */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 mb-12 max-w-2xl mx-auto">
            <p className="text-gray-700 mb-4">
              Building all this takes a lot of time and coffee. If any of my tools have helped you ship faster,
              a small contribution would mean the world to me—it keeps the lights on and the projects flowing.
            </p>
            <Link
              href="https://buymeacoffee.com/jamiewatters"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-semibold transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-xl">☕</span>
              Buy Me a Coffee
            </Link>
            <p className="text-sm text-gray-500 mt-3">
              No pressure, no obligations—just appreciation if you can.
            </p>
          </div>

          {/* A11W-ISS-19. Three social links on one nowrap row measured wider
              than a 320px viewport, and because the row is centred it spilled off
              BOTH edges: the GitHub link sat at left -20 and the LinkedIn link at
              right 340, for 20px of page overflow. flex-wrap lets the row become
              two lines on a narrow screen instead of pushing the page wide. */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-gray-600">
            <Link
              href="https://github.com/TheWayWithin"
              className="flex items-center gap-2 hover:text-primary-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </Link>
            <Link
              href="https://twitter.com/Jamie_within"
              className="flex items-center gap-2 hover:text-primary-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              @Jamie_within
            </Link>
            <Link
              href="https://linkedin.com/in/jamie-watters-solo"
              className="flex items-center gap-2 hover:text-primary-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
