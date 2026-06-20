import Link from 'next/link'

interface ChangelogEntry {
  version: string
  date: string
  type: 'Major' | 'Minor' | 'Patch'
  changes: {
    category: 'Added' | 'Fixed' | 'Changed' | 'Removed' | 'Security'
    items: string[]
  }[]
}

const changelogEntries: ChangelogEntry[] = [
  {
    version: '6.2.0',
    date: '2026-06-20',
    type: 'Minor',
    changes: [
      {
        category: 'Security',
        items: [
          'Read-only quality gates: .quality-gates.json and gates/ are unwritable by every agent via permissions.deny, so an agent cannot loosen the criteria that judge its own work',
          'PreToolUse read-only gate guard hook blocks Bash writes (redirection, tee, sed -i, cp, mv) to gate paths, closing the route the deny rules do not cover',
          'Default-fail verification: every success criterion starts failing and flips to pass only on captured command output'
        ]
      },
      {
        category: 'Added',
        items: [
          'Ratchet mission-optimize: optimisation as a measured loop in an isolated worktree, keep-or-revert against a baseline, fully logged, hard-capped, never auto-merged',
          'code-review-loop skill: a read-only critic raises evidence-backed findings, a read-write fixer addresses only those, re-audit until clean or capped',
          'Phase-gated meta-loop in /coord continue: converges on two clean rounds, spends a per-phase error budget then escalates, restarts from the last evidence-passed gate',
          'Loop discipline field-manual guide and a mission-optimize input template',
          'Bulk-ops toolkit for fleet-wide updates across multiple repos'
        ]
      }
    ]
  },
  {
    version: '6.1.1',
    date: '2026-05-07',
    type: 'Patch',
    changes: [
      {
        category: 'Fixed',
        items: [
          'Stale "Manual merge recommended" advisory no longer appears when migrate-v5-to-v6.sh runs as a subprocess of install.sh --upgrade',
          'Standalone migrate-v5-to-v6.sh now points users at install.sh --upgrade as the recommended automatic path'
        ]
      }
    ]
  },
  {
    version: '6.1.0',
    date: '2026-05-07',
    type: 'Minor',
    changes: [
      {
        category: 'Added',
        items: [
          'install.sh --upgrade flag — single-command v5 to v6 migration with full rollback',
          'install.sh --dry-run — preview the migration plan without making changes',
          'install.sh --non-interactive — bulk-mode contract for CI and multi-repo scripts',
          'Settings.json surgical merge — your values win on conflict; user customisations preserved through upgrade',
          'restore-pre-upgrade.sh — first-class rollback with --list, --latest, --backup, --settings modes',
          'docs/UPGRADE.md — focused upgrade guide for v5.x users',
          'Five end-to-end test fixtures (43/43 checks) covering clean v5, custom settings, malformed JSON, partial migration, and already-v6 cases'
        ]
      },
      {
        category: 'Changed',
        items: [
          'migrate-v5-to-v6.sh distinguishes three previously-ambiguous cases (already-v6, completed-previously, in-progress) with itemised actions',
          'Post-install summary no longer claims tool deferring is enabled when settings.json was not actually merged'
        ]
      }
    ]
  },
  {
    version: '6.0.0',
    date: '2026-05-03',
    type: 'Major',
    changes: [
      {
        category: 'Added',
        items: [
          'Karpathy operating constitution — seven behavioural principles (PAUSE-AND-PLAN, state assumptions, prefer minimal diffs, verify by running) replace prompt-based "always do X" rules',
          'Universal Router (/coord [mission]) — deterministic mission-based routing across 13 missions in three modes (greenfield, surgical, maintenance). No more NLP intent inference',
          'Native MCP tool deferring via ENABLE_TOOL_SEARCH=auto — roughly 80% context reduction on MCP-heavy sessions',
          'Quality-gate hooks in .claude/settings.json — advisory PostToolUse for tsc/ruff/rubocop, PreToolUse confirmation for destructive Bash',
          'Phase Handoff blocks — structured 5-field schema (Findings / Decisions / Warnings / Open Items / Evidence) appended to agent-context.md',
          '3-tier skills model aligned with Anthropic\'s Agent Skills open standard',
          'Routines for Mode C operational work (PR review, nightly QA, backlog triage)',
          'migrate-v5-to-v6.sh — one-command migration script for v5.x users'
        ]
      },
      {
        category: 'Changed',
        items: [
          'library/CLAUDE.md shrunk from 575 lines to 78 lines (-86%)',
          'project/commands/coord.md shrunk from 549 lines to 134 lines',
          'Active context tracking reduced from 5 files to 3',
          'progress.md demoted to write-only by default (read only on staleness checks)'
        ]
      },
      {
        category: 'Removed',
        items: [
          'MCP profile system (.mcp-profiles/, /mcp-switch command) — replaced by native tool deferring',
          'Static handoff-notes.md workflow — folded into agent-context.md as Phase Handoff blocks',
          'NLP-based mission intent inference in /coord — replaced by deterministic dispatch'
        ]
      }
    ]
  },
  {
    version: '5.0.0',
    date: '2025-12-31',
    type: 'Major',
    changes: [
      {
        category: 'Added',
        items: [
          'Plan-Driven Development System — /foundations init, /bootstrap [template], /plan status, /coord continue, /skills',
          '7 production-ready SaaS skills with auto-loading by task keywords (auth, payments, multitenancy, billing, email, onboarding, analytics)',
          'Quality Gates System — Python gate runner with build/test/lint/security/review/deploy gates and 3 severity levels',
          'Stack Profiles for multi-framework support (nextjs-supabase, remix-railway, sveltekit-supabase)',
          'Smart Delegation Routing — 10-path routing table with skill injection',
          'Vision Integrity Verification (ALIGNED, MINOR_DRIFT, MAJOR_DRIFT, OUT_OF_SCOPE)'
        ]
      }
    ]
  },
  {
    version: '4.1.0',
    date: '2025-11-28',
    type: 'Major',
    changes: [
      {
        category: 'Added',
        items: [
          'MCP Context Optimization with 60-90% token reduction',
          '13 mission-specific MCP profiles (minimal-core, research-only, frontend-deploy, etc.)',
          '/mcp-switch [profile] command for dynamic profile switching',
          'Sprint 6: Persistence Protocol Enforcement for guaranteed file operations'
        ]
      },
      {
        category: 'Changed',
        items: [
          'Optimized context window usage across all missions',
          'Enhanced profile switching for mission-specific tool sets',
          'Improved token efficiency for long-running operations'
        ]
      }
    ]
  },
  {
    version: '4.0.0',
    date: '2025-11-15',
    type: 'Major',
    changes: [
      {
        category: 'Added',
        items: [
          'Opus 4.5 Dynamic Model Selection for intelligent task routing',
          'Task tool model parameter (opus, sonnet, haiku) for per-delegation control',
          'Tiered model strategy: Opus (complex) → Sonnet (standard) → Haiku (simple)',
          'Coordinator-as-Executor Pattern for 100% file persistence',
          'Structured JSON output from specialists with automatic file operation execution'
        ]
      },
      {
        category: 'Changed',
        items: [
          '+15% mission success rate with better orchestration decisions',
          '-28% iterations with fewer retry cycles',
          '-24% total cost through efficiency gains',
          'Zero silent failures - file persistence guaranteed by architecture'
        ]
      },
      {
        category: 'Fixed',
        items: [
          'Critical file persistence bug causing 100% reproducible silent failures',
          'Files now persist reliably (up from ~30% baseline to 100%)'
        ]
      }
    ]
  },
  {
    version: '2.3.0',
    date: '2025-06-01',
    type: 'Major',
    changes: [
      {
        category: 'Added',
        items: [
          'Field Manual launch with 1,370+ line Architecture SOP',
          '17 mission types catalog (expanded from 6)',
          '6 slash commands (/coord, /recon, /design-review, /pmd, /report, /meeting)',
          'MCP integration framework (15+ supported MCPs)',
          'Security-First Development principles documentation',
          'Tool permission framework for agent safety',
          'Extended thinking guidance for complex decisions',
          'Agent-specific tool specification standards'
        ]
      },
      {
        category: 'Changed',
        items: [
          'Enhanced agent documentation (7,777+ lines total)',
          'Improved coordination protocols with Task tool enforcement',
          'Better context editing guidance with strategic clearing points',
          'Strengthened self-verification protocols for quality'
        ]
      }
    ]
  },
  {
    version: '2.2.0',
    date: '2025-03-15',
    type: 'Major',
    changes: [
      {
        category: 'Added',
        items: [
          'Context Preservation System (87.5% reduction in rework)',
          'Agent-to-agent handoff protocols (agent-context.md, handoff-notes.md)',
          'Evidence repository for comprehensive audit trails',
          'Pause/resume capability for long-running missions',
          'Zero context loss across multi-agent workflows',
          'Rolling context accumulation system'
        ]
      },
      {
        category: 'Changed',
        items: [
          'Improved mission completion time (37.5% faster delivery)',
          'Enhanced coordinator delegation protocol',
          'Better context file integrity throughout missions',
          'Stronger enforcement mechanisms for handoffs'
        ]
      }
    ]
  },
  {
    version: '2.1.0',
    date: '2024-12-15',
    type: 'Major',
    changes: [
      {
        category: 'Added',
        items: [
          '/coord command for mission execution',
          'Mission-based workflow system',
          'Project-local agent deployment',
          'Automatic project context detection',
          'Squad size selection (minimal, core, full)',
          'Interactive mission progress tracking'
        ]
      },
      {
        category: 'Changed',
        items: [
          'Simplified installation to single command',
          'Restructured agent roles and responsibilities',
          'Improved mission handoff between agents',
          'Enhanced error handling and recovery'
        ]
      }
    ]
  },
  {
    version: '2.0.3',
    date: '2024-12-01',
    type: 'Patch',
    changes: [
      {
        category: 'Fixed',
        items: [
          'Memory leak in long-running missions',
          'Windows compatibility issues',
          'Agent communication timeouts',
          'Project context parsing errors'
        ]
      },
      {
        category: 'Security',
        items: [
          'Enhanced API key protection',
          'Improved sandbox isolation',
          'Updated dependency vulnerabilities'
        ]
      }
    ]
  },
  {
    version: '2.0.0',
    date: 'November 18, 2024',
    type: 'Major',
    changes: [
      {
        category: 'Added',
        items: [
          'Complete rewrite with improved architecture',
          '11 specialized AI agents',
          'Automated deployment pipeline',
          'Real-time collaboration features',
          'Enterprise-grade security',
          'Advanced mission analytics'
        ]
      },
      {
        category: 'Removed',
        items: [
          'Legacy command structure',
          'Manual agent coordination',
          'Deprecated configuration options'
        ]
      }
    ]
  },
  {
    version: '1.5.2',
    date: 'October 25, 2024',
    type: 'Patch',
    changes: [
      {
        category: 'Fixed',
        items: [
          'Performance issues with large codebases',
          'Agent timeout handling',
          'Deployment rollback mechanism'
        ]
      }
    ]
  },
  {
    version: '1.5.0',
    date: 'October 10, 2024',
    type: 'Minor',
    changes: [
      {
        category: 'Added',
        items: [
          'Multi-language support',
          'Custom mission templates',
          'Enhanced logging and debugging',
          'Team collaboration features'
        ]
      },
      {
        category: 'Changed',
        items: [
          'Improved agent communication protocol',
          'Faster mission execution times',
          'Better resource management'
        ]
      }
    ]
  }
]

export default function ChangelogPage() {
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
              <Link href="/documentation" className="text-gray-600 hover:text-gray-900">Docs</Link>
              <Link href="/changelog" className="text-primary-600 font-medium">Changelog</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Changelog
            </h1>
            <p className="text-xl text-gray-600">
              Track the evolution of AGENT-11 with detailed release notes and feature updates.
            </p>
          </div>

          {/* Changelog Entries */}
          <div className="space-y-12">
            {changelogEntries.map((entry, index) => (
              <div key={index} className="relative">
                {/* Version Header */}
                <div className="flex items-center mb-6">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mr-4 ${
                    entry.type === 'Major' ? 'bg-red-100 text-red-700' :
                    entry.type === 'Minor' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {entry.type} Release
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    v{entry.version}
                  </h2>
                  <span className="text-gray-500 ml-4">{entry.date}</span>
                </div>

                {/* Changes */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="space-y-6">
                    {entry.changes.map((change, changeIndex) => (
                      <div key={changeIndex}>
                        <h3 className={`text-lg font-semibold mb-3 flex items-center ${
                          change.category === 'Added' ? 'text-green-700' :
                          change.category === 'Fixed' ? 'text-blue-700' :
                          change.category === 'Changed' ? 'text-yellow-700' :
                          change.category === 'Removed' ? 'text-red-700' :
                          'text-purple-700'
                        }`}>
                          {change.category === 'Added' && '✨'}
                          {change.category === 'Fixed' && '🐛'}
                          {change.category === 'Changed' && '🔄'}
                          {change.category === 'Removed' && '🗑️'}
                          {change.category === 'Security' && '🔒'}
                          <span className="ml-2">{change.category}</span>
                        </h3>
                        <ul className="space-y-2">
                          {change.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start text-gray-700">
                              <div className={`w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0 ${
                                change.category === 'Added' ? 'bg-green-500' :
                                change.category === 'Fixed' ? 'bg-blue-500' :
                                change.category === 'Changed' ? 'bg-yellow-500' :
                                change.category === 'Removed' ? 'bg-red-500' :
                                'bg-purple-500'
                              }`}></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline connector */}
                {index < changelogEntries.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-16 bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>

          {/* Migration Guides */}
          <div className="mt-16 bg-blue-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Migration Guides
            </h2>
            <p className="text-gray-600 mb-6">
              Need help upgrading? We&apos;ve got you covered with detailed migration guides for major version changes.
            </p>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">v1.x to v2.x Migration Guide</div>
                  <div className="text-sm text-gray-600">Complete guide for upgrading to the new mission-based system</div>
                </div>
                <Link href="/documentation" className="text-primary-600 hover:text-primary-700 font-medium">
                  View Guide →
                </Link>
              </div>
              <div className="bg-white rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">Breaking Changes in v2.1</div>
                  <div className="text-sm text-gray-600">Important changes and new /coord command syntax</div>
                </div>
                <Link href="/documentation" className="text-primary-600 hover:text-primary-700 font-medium">
                  View Guide →
                </Link>
              </div>
            </div>
          </div>

          {/* Roadmap Preview */}
          <div className="mt-16 bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What&apos;s Coming Next
            </h2>
            <p className="text-gray-600 mb-6">
              Where v6 is heading after the bulk-migration validation pass.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    v6.2
                  </div>
                  <span className="text-gray-500 ml-2">In planning</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Auto-detect v5 markers</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Auto-on detection when running install.sh on a v5 install</li>
                  <li>• Deferred from v6.1 pending production validation of --upgrade</li>
                  <li>• Now unblocked: 17 successful real-world upgrades validated the path</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    Track
                  </div>
                  <span className="text-gray-500 ml-2">on GitHub</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Latest plans &amp; releases</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Sprint specs live in <code>sprints/</code> on the repo</li>
                  <li>• Tagged releases at <a href="https://github.com/TheWayWithin/agent-11/releases" className="text-primary-600 hover:text-primary-700" target="_blank" rel="noopener noreferrer">github.com/TheWayWithin/agent-11/releases</a></li>
                  <li>• Star or watch the repo for release notifications</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get notified about new releases, features, and important updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Or follow us on{' '}
            <a href="https://github.com/TheWayWithin/agent-11" className="text-primary-600 hover:text-primary-700" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>{' '}
            for real-time updates.
          </p>
        </div>
      </section>
    </main>
  )
}