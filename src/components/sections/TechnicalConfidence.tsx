'use client'

import { useState } from 'react'

const techTabs = [
  {
    id: 'architecture',
    label: 'Architecture',
    icon: '🏗️',
    content: {
      title: 'How the squad is put together',
      description: 'AGENT-11 is a set of Markdown agent definitions installed into your project and run inside Claude Code. No runtime to host, no service to run.',
      features: [
        {
          name: 'File-based agents',
          description: 'Each specialist is a Markdown file in .claude/agents/. You can read, edit, and version-control every one.'
        },
        {
          name: 'Coordinator orchestration',
          description: 'The /coord command runs a mission: the coordinator delegates to specialists and gates each phase on evidence.'
        },
        {
          name: 'Persistent context',
          description: 'A small set of tracking files (project-plan.md, agent-context.md, evidence-repository.md) carries state across sessions and handoffs.'
        },
        {
          name: 'Read-only quality gates',
          description: 'The gate files, .quality-gates.json and gates/, are unwritable by the agents doing the work. Criteria kept anywhere else are covered by instruction, not by a rule.'
        }
      ],
      codeExample: `# Installed into your project
.claude/
  agents/        # 11 specialist definitions (Markdown)
  commands/      # /coord and the other slash commands
  settings.json  # tool permissions + read-only gate rules

# Run a mission
/coord build requirements.md
/coord continue        # phase-gated: advances only on evidence`
    }
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: '🔌',
    content: {
      title: 'Works with your existing workflow',
      description: 'AGENT-11 runs inside Claude Code and reaches external tools through native MCP tool-search. No extra API keys for AGENT-11 itself.',
      features: [
        {
          name: 'Claude Code native',
          description: 'Runs in the Claude Code CLI, desktop, or IDE. Nothing else to install or host.'
        },
        {
          name: 'Version control',
          description: 'Git-native. Works with GitHub, GitLab, and Bitbucket like any repo.'
        },
        {
          name: 'MCP tool-search',
          description: 'Specialists discover MCP servers at runtime (Supabase, Stripe, Playwright, Context7, and more) via ENABLE_TOOL_SEARCH=auto.'
        },
        {
          name: 'Your deploy targets',
          description: 'Ship to Railway, Netlify, Vercel, or wherever your project already deploys.'
        }
      ],
      codeExample: `# Install in one command
bash <(curl -fsSL https://raw.githubusercontent.com/TheWayWithin/agent-11/main/project/deployment/scripts/secure-install.sh)

# MCP tools are discovered at runtime, no profile switching:
#   ENABLE_TOOL_SEARCH=auto   (set in .claude/settings.json)
# A specialist searches for what it needs, e.g. mcp__supabase`
    }
  },
  {
    id: 'customization',
    label: 'Customization',
    icon: '⚙️',
    content: {
      title: 'Make the squad yours',
      description: 'Every agent, command, and skill is a plain file in your repo. Change anything; it is your copy.',
      features: [
        {
          name: 'Edit the agents',
          description: 'Tune any specialist by editing its Markdown definition in .claude/agents/.'
        },
        {
          name: 'Project skills',
          description: 'Drop domain skills into skills/ (plus the bundled SaaS skills: auth, payments, billing, email, and more).'
        },
        {
          name: 'Project instructions',
          description: 'A lean CLAUDE.md sets the constitution and conventions every agent follows in your project.'
        },
        {
          name: 'Templates',
          description: 'Reusable templates for plans, architecture, handoffs, and mission inputs.'
        }
      ],
      codeExample: `---
name: developer
# Edit any specialist's definition directly
---
# Your conventions, applied by every mission:
- TypeScript + Next.js, Tailwind, Prisma + PostgreSQL
- Functional components with hooks
- Comprehensive types; error boundaries on all routes`
    }
  },
  {
    id: 'security',
    label: 'Security',
    icon: '🔒',
    content: {
      title: 'Local files, open code, honest about the rest',
      description: 'AGENT-11 has no servers. The agents and your code live in your repo. Your code and context are processed by Claude (Anthropic), exactly like any other Claude Code session.',
      features: [
        {
          name: 'No AGENT-11 servers',
          description: 'Nothing is sent to us, because there is nothing to send it to. It is files in your project.'
        },
        {
          name: 'Read-only gates + Bash guard',
          description: 'Agents cannot edit the gate files that judge them: four permissions.deny rules refuse it at the tool layer. A Bash guard hook blocks 12 common write forms against the same paths, which narrows the Bash route rather than closing it.'
        },
        {
          name: 'Honest about Claude',
          description: 'Like any Claude Code use, your code and context are processed by Anthropic. We do not claim a sandbox that does not exist.'
        },
        {
          name: 'Open source (MIT)',
          description: 'Every line is on GitHub for you to audit, fork, and verify.'
        }
      ],
      codeExample: `// .claude/settings.json — read-only quality gates
{
  "permissions": {
    "deny": [
      "Edit(.quality-gates.json)",
      "Edit(**/*.quality-gates.json)",
      "Edit(gates/**)",
      "Edit(.gates/**)"
    ]
  }
  // Edit() covers every file-editing tool. Write() and
  // MultiEdit() rule forms are ignored by Claude Code.
  // + a PreToolUse hook blocks 12 Bash write forms to gate paths
}`
    }
  }
]

export default function TechnicalConfidence() {
  const [activeTab, setActiveTab] = useState(techTabs[0])

  return (
    <section className="bg-gray-50 section-padding">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Built for Developers, By Developers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Every technical decision is in the open. Plain files in your repo,
            run inside Claude Code, nothing hidden behind a service.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {techTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab.id === tab.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Content */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {activeTab.content.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {activeTab.content.description}
                </p>
              </div>

              <div className="space-y-6">
                {activeTab.content.features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {feature.name}
                      </h4>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Example */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-4">
                    {activeTab.label.toLowerCase()}.ts
                  </span>
                </div>
                <div className="p-6 overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                    {activeTab.content.codeExample}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Badges */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-8">Built On</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'Claude Code', icon: '🤖' },
              { name: 'Markdown', icon: '📝' },
              { name: 'Bash', icon: '🐚' },
              { name: 'Python', icon: '🐍' },
              { name: 'MCP', icon: '🔌' },
              { name: 'GitHub', icon: '🐙' }
            ].map((tech, index) => (
              <div key={index} className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm">
                <span className="text-2xl">{tech.icon}</span>
                <span className="text-sm font-medium text-gray-700">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
