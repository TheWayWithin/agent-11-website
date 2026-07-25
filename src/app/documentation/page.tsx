'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatUpdated, FRAMEWORK_VERSION } from '@/lib/seo'
import { PAGE_UPDATED } from '@/lib/page-dates'

interface DocSection {
  id: string
  title: string
  description: string
  content: React.ReactNode
}

const docSections: DocSection[] = [
  {
    id: 'quick-start',
    title: 'Quick Start Guide',
    description: 'Get up and running with AGENT-11 in under 5 minutes',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Installation</h3>
          <p className="text-gray-600 mb-4">Deploy your project-local squad with a single command:</p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
            <div className="text-green-400">
              $ bash &lt;(curl -fsSL https://raw.githubusercontent.com/TheWayWithin/agent-11/main/project/deployment/scripts/secure-install.sh)
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">This deploys all 11 specialist agents to your project directory.</p>
          <p className="text-gray-600 mt-4 mb-2">Already on v5? Upgrade to v6 with:</p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
            <div className="text-green-400">
              $ bash &lt;(curl -sSL https://raw.githubusercontent.com/TheWayWithin/agent-11/main/project/deployment/scripts/install.sh) --upgrade
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Your First Mission</h3>
          <p className="text-gray-600 mb-4">Execute your first mission with the /coord command:</p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm space-y-2">
            <div className="text-green-400">$ /coord build &quot;User authentication system&quot;</div>
            <div className="text-blue-400">🎯 Mission: BUILD initiated | Duration: 4-8 hours</div>
            <div className="text-purple-400">🧠 COORDINATOR: Breaking down requirements...</div>
            <div className="text-yellow-400">🏗️ ARCHITECT: Designing system architecture...</div>
            <div className="text-green-300">✅ Mission complete! 47 tests passed, security validated.</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'mission-reference',
    title: 'Mission Reference',
    description: 'Complete guide to all 13 missions',
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Development Missions</h3>
          <div className="space-y-6">
            {[
              {
                name: 'BUILD',
                description: 'New feature development (4-8 hours)',
                usage: '/coord build "Feature description"',
                example: '/coord build "User profile management with image upload"'
              },
              {
                name: 'DEV-SETUP',
                description: 'Set up a greenfield project from an ideation document',
                usage: '/coord dev-setup [ideation file]',
                example: '/coord dev-setup ideation.md'
              },
              {
                name: 'DEV-ALIGNMENT',
                description: 'Align AGENT-11 with an existing (brownfield) codebase',
                usage: '/coord dev-alignment',
                example: '/coord dev-alignment'
              },
              {
                name: 'FIX',
                description: 'Emergency bug resolution (1-3 hours)',
                usage: '/coord fix "Bug description"',
                example: '/coord fix "Memory leak in image processing module"'
              },
              {
                name: 'DEPLOY',
                description: 'Production deployment (1-2 hours)',
                usage: '/coord deploy [environment]',
                example: '/coord deploy production'
              },
              {
                name: 'REFACTOR',
                description: 'Code quality improvement (2-4 hours)',
                usage: '/coord refactor "Target description"',
                example: '/coord refactor "Payment processing module for better maintainability"'
              },
              {
                name: 'DOCUMENT',
                description: 'Documentation creation (2-4 hours)',
                usage: '/coord document "Documentation scope"',
                example: '/coord document "API endpoints and authentication flow"'
              }
            ].map((mission, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mr-3">
                    {mission.name}
                  </div>
                  <div className="text-gray-600">{mission.description}</div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Usage: </span>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">{mission.usage}</code>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Example: </span>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">{mission.example}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Strategic Missions</h3>
          <div className="space-y-6">
            {[
              {
                name: 'MVP',
                description: 'Minimum viable product (1-3 days)',
                usage: '/coord mvp "Product description"',
                example: '/coord mvp "Task management SaaS with team collaboration"'
              },
              {
                name: 'MIGRATE',
                description: 'System migration (4-8 hours)',
                usage: '/coord migrate "Migration description"',
                example: '/coord migrate "From MySQL to PostgreSQL with zero downtime"'
              },
              {
                name: 'OPTIMIZE',
                description: 'Performance optimization (3-6 hours)',
                usage: '/coord optimize "Optimization target"',
                example: '/coord optimize "Database queries and API response times"'
              },
              {
                name: 'SECURITY',
                description: 'Security audit & fixes (4-6 hours)',
                usage: '/coord security [scope]',
                example: '/coord security "Authentication and data protection audit"'
              },
              {
                name: 'INTEGRATE',
                description: 'Third-party integration (3-6 hours)',
                usage: '/coord integrate "Integration description"',
                example: '/coord integrate "Stripe payment processing with webhooks"'
              },
              {
                name: 'RELEASE',
                description: 'Release management (2-4 hours)',
                usage: '/coord release [version]',
                example: '/coord release v2.1.0'
              }
            ].map((mission, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mr-3">
                    {mission.name}
                  </div>
                  <div className="text-gray-600">{mission.description}</div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Usage: </span>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">{mission.usage}</code>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Example: </span>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded">{mission.example}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Control Commands</h3>
          <p className="text-gray-600 mb-4">Steer an in-progress mission without starting a new one:</p>
          <div className="space-y-2">
            <div>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">/coord continue</code>
              <span className="text-sm text-gray-600 ml-2">Resume from project-plan.md after a pause</span>
            </div>
            <div>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">/coord complete phase N</code>
              <span className="text-sm text-gray-600 ml-2">Mark phase N done and move to the next</span>
            </div>
            <div>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">/coord vision-check</code>
              <span className="text-sm text-gray-600 ml-2">Check current work against the original vision</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'agent-roles',
    title: 'Agent Roles & Specialties',
    description: 'Meet your 11 AI specialists and their unique capabilities',
    content: (
      <div className="space-y-6">
        <p className="text-gray-600">Every install deploys all 11 specialists to your project.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'THE COORDINATOR', emoji: '🧠', specialty: 'Mission orchestration and agent coordination' },
            { name: 'THE DEVELOPER', emoji: '💻', specialty: 'Full-stack development and implementation' },
            { name: 'THE ARCHITECT', emoji: '🏗️', specialty: 'System design and technical architecture' },
            { name: 'THE TESTER', emoji: '🧪', specialty: 'Quality assurance and automated testing' },
            { name: 'THE STRATEGIST', emoji: '🎯', specialty: 'Product requirements and strategic planning' },
            { name: 'THE OPERATOR', emoji: '⚙️', specialty: 'DevOps, deployment, and infrastructure' },
            { name: 'THE MARKETER', emoji: '📈', specialty: 'Growth strategy and user acquisition' },
            { name: 'THE SUPPORT', emoji: '🤝', specialty: 'Customer support and issue resolution' },
            { name: 'THE DOCUMENTER', emoji: '📚', specialty: 'Technical documentation and knowledge' },
            { name: 'THE ANALYST', emoji: '📊', specialty: 'Data analysis and performance metrics' },
            { name: 'THE DESIGNER', emoji: '🎨', specialty: 'UI/UX design and user experience' }
          ].map((agent, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">{agent.emoji}</div>
                <div>
                  <div className="font-semibold text-gray-900">{agent.name}</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{agent.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'configuration',
    title: 'Configuration & Customization',
    description: 'Advanced configuration options and customization',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Project Context</h3>
          <p className="text-gray-600 mb-4">
            AGENT-11 detects your project context automatically. To give agents project-specific guidance,
            add your conventions, architecture decisions, and coding standards to your project&apos;s CLAUDE.md file.
            Agents read this at the start of every mission.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Harness Configuration</h3>
          <p className="text-gray-600 mb-4">
            Tool permissions, environment variables, and hooks are configured in Claude Code&apos;s settings file,
            <code className="text-sm bg-gray-100 px-2 py-1 rounded mx-1">.claude/settings.json</code>
            (or <code className="text-sm bg-gray-100 px-2 py-1 rounded mx-1">.claude/settings.local.json</code> for
            machine-local overrides).
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Mission Customisation</h3>
          <p className="text-gray-600 mb-4">
            Missions live as Markdown files under your project&apos;s
            <code className="text-sm bg-gray-100 px-2 py-1 rounded mx-1">missions/</code> directory.
            Copy an existing mission file and edit its phases and agent assignments to tailor a workflow to your needs.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'field-manual',
    title: 'Field Manual - 32 Guides',
    description: '32 professional guides (around 14,400 lines) covering core workflows to advanced features',
    content: (
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Complete Documentation Library</h3>
          <p className="text-gray-600 mb-6">
            The AGENT-11 Field Manual provides 32 guides (around 14,400 lines) covering everything from getting started to advanced optimization techniques. A selection is shown below.
          </p>
        </div>

        {/* Core Guides */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            Core Guides
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Project Lifecycle Guide</h4>
              <p className="text-sm text-gray-600">Complete workflow from idea to maintenance</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Architecture SOP</h4>
              <p className="text-sm text-gray-600">System design documentation standards</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Bootstrap Guide</h4>
              <p className="text-sm text-gray-600">Initial project setup and configuration</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Getting Started</h4>
              <p className="text-sm text-gray-600">Onboarding for new users</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Field Manual Overview</h4>
              <p className="text-sm text-gray-600">Documentation navigation and structure</p>
            </div>
          </div>
        </div>

        {/* Advanced Features */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            Advanced Features
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                Memory Management ⭐
              </h4>
              <p className="text-sm text-gray-600">Cross-session learning and persistent knowledge</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                Extended Thinking ⭐
              </h4>
              <p className="text-sm text-gray-600">Strategic reasoning modes for complex tasks</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                Context Optimization ⭐
              </h4>
              <p className="text-sm text-gray-600">On-demand tool loading and context strategies</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Enhanced Prompting</h4>
              <p className="text-sm text-gray-600">Advanced prompting techniques</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Tool Permissions</h4>
              <p className="text-sm text-gray-600">Security-first tool usage framework</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                MCP Integration ⭐
              </h4>
              <p className="text-sm text-gray-600">Model Context Protocol usage patterns</p>
            </div>
          </div>
        </div>

        {/* Implementation Guides */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            Implementation Guides
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Greenfield Implementation</h4>
              <p className="text-sm text-gray-600">New project setup</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Brownfield Implementation</h4>
              <p className="text-sm text-gray-600">Existing project integration</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">BOS-AI Integration</h4>
              <p className="text-sm text-gray-600">Business automation framework</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">BOS-AI Quickstart</h4>
              <p className="text-sm text-gray-600">Rapid onboarding</p>
            </div>
          </div>
        </div>

        {/* Workflows & Missions */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            Workflows &amp; Missions
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Mission Execution Cheatsheet</h4>
              <p className="text-sm text-gray-600">Quick mission reference</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Creating Custom Missions</h4>
              <p className="text-sm text-gray-600">Build your own workflows</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Coordinator Commands</h4>
              <p className="text-sm text-gray-600">Multi-agent orchestration</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Multi-Project Workflows</h4>
              <p className="text-sm text-gray-600">Managing multiple projects</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Update Management</h4>
              <p className="text-sm text-gray-600">Library update process</p>
            </div>
          </div>
        </div>

        {/* Design & Quality */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            Design &amp; Quality
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">UI Doctrine</h4>
              <p className="text-sm text-gray-600">UI/UX design principles and patterns</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">MCP Troubleshooting</h4>
              <p className="text-sm text-gray-600">Debugging integration issues</p>
            </div>
          </div>
        </div>

        {/* Total Summary */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6 text-center border border-primary-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Total: 32 Guides</h3>
          <p className="text-gray-600 mb-4">
            Complete documentation covering all aspects of AGENT-11 from basic setup to advanced optimization
          </p>
          <a
            href="https://github.com/TheWayWithin/agent-11/tree/main/project/field-manual"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View All Guides on GitHub
          </a>
        </div>
      </div>
    )
  },
  {
    id: 'context-preservation',
    title: 'Context Preservation Protocol',
    description: 'Zero context loss system for multi-agent workflows',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">What is Context Preservation?</h3>
          <p className="text-gray-600 mb-4">
            AGENT-11&apos;s Context Preservation System ensures zero context loss across multi-agent workflows through
            persistent context files and mandatory handoff protocols. Specialists pick up exactly where the last one left off,
            which cuts rework and keeps missions moving.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Three Core Context Files</h3>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="text-2xl mr-3">📋</div>
                <h4 className="font-semibold text-gray-900">agent-context.md</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">Single accumulator for mission state, findings, and inter-agent handoffs</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Mission objectives and accumulated findings</li>
                <li>• Technical decisions and known issues</li>
                <li>• Phase Handoff blocks (Findings / Decisions / Warnings / Open Items / Evidence)</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="text-2xl mr-3">🗺️</div>
                <h4 className="font-semibold text-gray-900">project-plan.md</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">Living plan that drives mission orchestration end to end</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Phase structure with task lists and gate definitions</li>
                <li>• Source of truth for /plan status and /coord continue</li>
                <li>• Read at session start; updated as work progresses</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="text-2xl mr-3">📦</div>
                <h4 className="font-semibold text-gray-900">evidence-repository.md</h4>
              </div>
              <p className="text-sm text-gray-600 mb-2">Centralized collection of artifacts and supporting materials</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Screenshots and code snippets</li>
                <li>• Test results and API responses</li>
                <li>• Error logs and debugging artifacts</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Handoff Protocol</h3>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <strong className="text-gray-900 mr-2">1.</strong>
                <span>Specialist reads agent-context.md (with the latest Phase Handoff block) before starting work</span>
              </li>
              <li className="flex items-start">
                <strong className="text-gray-900 mr-2">2.</strong>
                <span>Specialist maintains awareness of mission context during execution</span>
              </li>
              <li className="flex items-start">
                <strong className="text-gray-900 mr-2">3.</strong>
                <span>At phase boundary, specialist appends a Phase Handoff block (Findings / Decisions / Warnings / Open Items / Evidence) to agent-context.md</span>
              </li>
              <li className="flex items-start">
                <strong className="text-gray-900 mr-2">4.</strong>
                <span>Next specialist reads the latest block as the entry point for their work — single file, no choreography</span>
              </li>
            </ol>
            <p className="text-xs text-gray-500 mt-3 italic">v6 retired the separate handoff-notes.md file. Phase Handoff blocks live inside agent-context.md as a structured 5-field schema.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'mcp-integration',
    title: 'MCP Integration Guide',
    description: 'Model Context Protocol setup and 15+ supported integrations',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">What is MCP?</h3>
          <p className="text-gray-600 mb-4">
            Model Context Protocol (MCP) servers extend AGENT-11 capabilities with specialized services for infrastructure,
            payments, development tools, and testing frameworks.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Quick Setup</h3>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm space-y-2">
            <div className="text-gray-400"># 1. Copy environment template</div>
            <div className="text-green-400">$ cp .env.mcp.template .env.mcp</div>
            <div className="text-gray-400 mt-4"># 2. Add your API keys to .env.mcp</div>
            <div className="text-gray-400"># 3. Run setup script</div>
            <div className="text-green-400">$ ./mcp-setup.sh</div>
            <div className="text-gray-400 mt-4"># 4. Verify installation</div>
            <div className="text-green-400">$ ./mcp-setup.sh --verify</div>
            <div className="text-gray-400 mt-4"># 5. Restart Claude Code for changes to take effect</div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Supported MCPs</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">🚀 Infrastructure</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Railway - Backend services</li>
                <li>• Netlify - Frontend hosting</li>
                <li>• Supabase - Database & auth</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">💳 Commerce</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Stripe - Payments</li>
                <li>• Subscriptions management</li>
                <li>• Webhook handling</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">🔧 Development</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• GitHub - PRs & issues</li>
                <li>• Context7 - Library docs</li>
                <li>• Firecrawl - Web scraping</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">🧪 Testing</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Playwright - Browser automation</li>
                <li>• E2E testing</li>
                <li>• Visual regression</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'security-first',
    title: 'Security-First Development',
    description: 'Critical software development principles and security protocols',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Core Principle</h3>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="font-bold text-red-900 mb-2">NEVER compromise security for convenience.</p>
            <p className="text-red-800">
              When encountering security features or policies, understand why they exist before making changes.
              Find ways to work WITH security features, not around them.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Strategic Solution Checklist</h3>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Before implementing any fix, verify:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✅</span>
                <span>Does this maintain all security requirements?</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✅</span>
                <span>Is this the architecturally correct solution?</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✅</span>
                <span>Will this create technical debt?</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✅</span>
                <span>Are there better long-term solutions?</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✅</span>
                <span>Have I understood the original design intent?</span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Anti-Patterns to Avoid</h3>
          <div className="space-y-2">
            {[
              'Removing security features to make things work',
              'Adding any types to bypass TypeScript errors',
              'Using @ts-ignore without understanding the issue',
              'Disabling linters or security scanners',
              'Implementing quick fixes that break design patterns'
            ].map((pattern, index) => (
              <div key={index} className="flex items-start bg-white border border-gray-200 rounded-lg p-3">
                <span className="text-red-600 mr-2">❌</span>
                <span className="text-sm text-gray-700">{pattern}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Root Cause Analysis Protocol</h3>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <ol className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <strong className="text-gray-900 mr-2">PAUSE:</strong>
                <span>Don&apos;t rush to implement the first solution</span>
              </li>
              <li className="flex items-start">
                <strong className="text-gray-900 mr-2">RESEARCH:</strong>
                <span>Understand the system design and constraints</span>
              </li>
              <li className="flex items-start">
                <strong className="text-gray-900 mr-2">PROPOSE:</strong>
                <span>Present multiple solutions with trade-offs</span>
              </li>
              <li className="flex items-start">
                <strong className="text-gray-900 mr-2">IMPLEMENT:</strong>
                <span>Choose the solution that maintains system integrity</span>
              </li>
              <li className="flex items-start">
                <strong className="text-gray-900 mr-2">DOCUMENT:</strong>
                <span>Record why decisions were made for future reference</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Common issues and solutions',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Issues</h3>
          <div className="space-y-4">
            {[
              {
                issue: "Mission fails with 'insufficient context' error",
                solution: "Ensure you're running from your project root directory and that your project has a package.json, requirements.txt, or similar configuration file."
              },
              {
                issue: "Agents seem to be making incorrect assumptions",
                solution: "Add project-specific information, architecture decisions, and coding standards to your project's CLAUDE.md file, and capture mission findings in agent-context.md."
              },
              {
                issue: "Mission takes longer than expected",
                solution: "Check project-plan.md to see current phase and progress. Resume an in-progress mission at any time with '/coord continue'. Complex missions may require multiple iterations."
              },
              {
                issue: "Installation fails on Windows",
                solution: "Use WSL2 or Git Bash to run the install command."
              },
              {
                issue: "Want to update to the latest version",
                solution: "Run the installer with the --upgrade flag: bash <(curl -sSL https://raw.githubusercontent.com/TheWayWithin/agent-11/main/project/deployment/scripts/install.sh) --upgrade"
              }
            ].map((item, index) => (
              <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="font-semibold text-gray-900 mb-2">❓ {item.issue}</div>
                <div className="text-gray-700">{item.solution}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Getting Help</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">📖 Documentation</h4>
              <p className="text-gray-600 text-sm mb-3">Comprehensive guides and references</p>
              <Link href="/documentation" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Browse Documentation →
              </Link>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">🐛 GitHub Issues</h4>
              <p className="text-gray-600 text-sm mb-3">Report bugs and request features</p>
              <a href="https://github.com/TheWayWithin/agent-11/issues" className="text-primary-600 hover:text-primary-700 text-sm font-medium" target="_blank" rel="noopener noreferrer">
                Open Issue →
              </a>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">📧 Support</h4>
              <p className="text-gray-600 text-sm mb-3">Direct support for complex issues</p>
              <Link href="/support" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
]

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState('quick-start')

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              AGENT-11
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/documentation" className="text-primary-600 font-medium">Docs</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Page header: the single <h1>, before any <h2>, so the heading order
          starts at the top level. Section titles below are <h2>. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          AGENT-11 Documentation
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          The field manual: install, missions, agents, configuration and troubleshooting.
        </p>
        <p className="text-sm text-gray-500">
          Updated{' '}
          <time dateTime={PAGE_UPDATED.documentation}>
            {formatUpdated(PAGE_UPDATED.documentation)}
          </time>{' '}
          · covers v{FRAMEWORK_VERSION}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Sections</h2>
              <nav className="space-y-2">
                {docSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary-100 text-primary-700 font-medium'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden mb-8">
            <select
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {docSections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </select>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {docSections.map((section) => (
              <div
                key={section.id}
                className={`${activeSection === section.id ? 'block' : 'hidden'}`}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">{section.title}</h2>
                  <p className="text-xl text-gray-600">{section.description}</p>
                </div>
                <div className="prose prose-gray max-w-none">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-primary-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Deploy Your Squad?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start executing missions with project-local agents that understand your codebase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://github.com/TheWayWithin/agent-11"
              className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Start Building
            </Link>
            <Link 
              href="/features"
              className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-lg font-medium transition-colors"
            >
              View All Features
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}