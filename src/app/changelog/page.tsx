import Link from 'next/link'
import { PAGE_UPDATED } from '@/lib/page-dates'
import { formatUpdated } from '@/lib/seo'

/**
 * Release history, mirrored from the framework's own CHANGELOG.md.
 *
 * Every version and date here exists in
 * https://github.com/TheWayWithin/agent-11/blob/main/CHANGELOG.md.
 * Before A11W-ISS-7 this page listed v2.3.0, v2.2.0, v2.1.0, v2.0.3, v1.5.2
 * and v1.5.0 — none of which the framework ever released. The CHANGELOG has
 * no 3.x line at all, and its unversioned "[Previous Releases]" block is the
 * most likely origin of the invented 2.x entries.
 *
 * Rules for editing: copy versions, dates and substance from the CHANGELOG.
 * Never invent a version to fill a gap. `type` is derived from semver
 * (X.0.0 major, X.Y.0 minor, X.Y.Z patch), not asserted.
 * scripts/check-changelog.sh enforces the first rule against production.
 */
interface ChangelogEntry {
  version: string
  date: string
  title?: string
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
    title: 'Loop Discipline & Read-Only Verification',
    type: 'Minor',
    changes: [
      {
        category: 'Added',
        items: [
          'Coordinator phase-gated meta-loop: /coord continue converges on two clean verify rounds rather than a fixed count, spends a per-phase error budget then escalates to the human instead of burning forward, and restarts from the last evidence-passed gate',
          'Ratchet loops: mission-optimize isolates work in a git worktree, sets a median-of-3 baseline, makes one change on a named surface, re-measures, and keeps it only if it beats the baseline — otherwise hard-reverts',
          'code-review-loop skill: a read-only critic raises evidence-backed findings, a read-write fixer addresses only those findings, repeating until two clean rounds or a cap',
          'Read-only quality gates: .quality-gates.json and gates/ are unwritable by every deployed agent, enforced at the tool layer rather than by prompt convention',
          'Default-fail verification contract in tester, developer and coordinator: every success criterion starts failing and flips to pass only on captured command output',
          'Bulk-ops toolkit for running AGENT-11 across multiple repositories (audit, apply-file, apply-upgrade)'
        ]
      },
      {
        category: 'Changed',
        items: [
          'Opus tier references raised from 4.6 to 4.7 and Sonnet from 4.5 to 4.6 across the documentation'
        ]
      }
    ]
  },
  {
    version: '6.1.1',
    date: '2026-05-07',
    title: 'Subprocess advisory cleanup',
    type: 'Patch',
    changes: [
      {
        category: 'Fixed',
        items: [
          'migrate-v5-to-v6.sh no longer prints a stale "Manual merge recommended" advisory when install.sh --upgrade invokes it as a subprocess — the warning appeared just before the success line and looked like the merge had failed',
          'Standalone migrate-v5-to-v6.sh now points at install.sh --upgrade as the recommended automatic path'
        ]
      }
    ]
  },
  {
    version: '6.1.0',
    date: '2026-05-07',
    title: 'Hardened Upgrade Path',
    type: 'Minor',
    changes: [
      {
        category: 'Added',
        items: [
          'install.sh --upgrade: one command replaces the two-script v5 to v6 flow, with full rollback support',
          'install.sh --dry-run to print the plan without making changes, plus --non-interactive / --batch-safe for CI',
          'Surgical settings.json merge: user values win on every conflict, with backup, merge, re-validate and auto-restore on failure',
          'restore-pre-upgrade.sh to undo an upgrade from backups',
          'docs/UPGRADE.md and five end-to-end install fixtures'
        ]
      },
      {
        category: 'Fixed',
        items: [
          'install.sh no longer reports "Tool deferring enabled" when it did not actually update settings.json',
          'A v5 install followed by a plain install.sh no longer leaves a hybrid v6-library plus v5-residue state'
        ]
      }
    ]
  },
  {
    version: '6.0.0',
    date: '2026-05-03',
    title: 'The Lean Orchestrator',
    type: 'Major',
    changes: [
      {
        category: 'Added',
        items: [
          'Universal Router: deterministic mission routing across 13 missions in greenfield, surgical and maintenance modes',
          'Karpathy operating constitution: seven principles applied by every specialist, including read before writing and verify by running',
          'Dynamic context loading: the coordinator reads only the files the mission mode requires',
          'Phase Handoff blocks: a 5-field schema appended to agent-context.md at phase boundaries',
          'Quality-gate hooks in .claude/settings.json for tsc, ruff and rubocop, plus a confirmation prompt on destructive Bash',
          'Native MCP tool deferring via ENABLE_TOOL_SEARCH=auto'
        ]
      },
      {
        category: 'Changed',
        items: [
          'library/CLAUDE.md shrunk from 575 lines to 78, and the /coord command file from 549 lines to 134',
          'install.sh always installs all 11 specialists, where it previously defaulted to a 4-agent core squad'
        ]
      },
      {
        category: 'Removed',
        items: [
          'handoff-notes.md retired as a separate file and folded into agent-context.md',
          'The .mcp-profiles/ directory and profile-switching system, replaced by native tool deferring'
        ]
      }
    ]
  },
  {
    version: '5.0.0',
    date: '2025-12-31',
    title: 'SaaS Boilerplate Killer Architecture',
    type: 'Major',
    changes: [
      {
        category: 'Added',
        items: [
          '/foundations init to create vision and PRD documents from a BOS-AI handoff',
          '/bootstrap [template] to generate project-plan.md from saas-mvp, saas-full or api templates',
          '/plan status and /plan phase [N] to read mission state out of project-plan.md',
          '/coord continue for autonomous execution until blocked'
        ]
      }
    ]
  },
  {
    version: '4.1.0',
    date: '2025-11-28',
    title: 'MCP Context Optimization',
    type: 'Minor',
    changes: [
      {
        category: 'Added',
        items: [
          '13 MCP profiles for context optimization',
          '/mcp-switch [profile] command'
        ]
      }
    ]
  },
  {
    version: '4.0.0',
    date: '2025-11-27',
    title: 'Opus 4.5 Dynamic Model Selection',
    type: 'Major',
    changes: [
      {
        category: 'Added',
        items: [
          'Opus 4.5 for coordinator orchestration',
          'Task tool model parameter (opus, sonnet, haiku)',
          'Tiered model strategy documentation'
        ]
      }
    ]
  },
  {
    version: '2.0.0',
    date: '2024-01-15',
    title: 'Mission-driven orchestration',
    type: 'Major',
    changes: [
      {
        category: 'Added',
        items: [
          'Mission-driven orchestration system and the /coord command',
          'Mission library with BUILD, FIX, REFACTOR and MVP missions',
          'Mission template system for custom workflows',
          'Multi-input document processing and mission progress tracking'
        ]
      },
      {
        category: 'Changed',
        items: [
          'Major architecture update to support mission-based workflows',
          'Documentation restructured around the field manual'
        ]
      }
    ]
  },
  {
    version: '1.2.0',
    date: '2024-01-01',
    type: 'Minor',
    changes: [
      {
        category: 'Added',
        items: [
          'Advanced usage guide and multi-project workflow documentation',
          'Custom squad configurations',
          'Backup and restore system'
        ]
      },
      {
        category: 'Changed',
        items: [
          'Installation system enhanced with project detection'
        ]
      }
    ]
  },
  {
    version: '1.1.0',
    date: '2023-12-15',
    type: 'Minor',
    changes: [
      {
        category: 'Added',
        items: [
          'Full squad deployment: all 11 specialists',
          'Individual agent profile documentation and collaboration protocols',
          'Troubleshooting guide'
        ]
      },
      {
        category: 'Changed',
        items: [
          'Improved installation reliability and project detection'
        ]
      }
    ]
  },
  {
    version: '1.0.0',
    date: '2023-12-01',
    title: 'Initial release',
    type: 'Major',
    changes: [
      {
        category: 'Added',
        items: [
          'Core squad deployment: strategist, developer, tester and operator',
          'Project-local agent installation system',
          'Claude Code integration, project detection and verification'
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
            <p className="text-xl text-gray-600 mb-4">
              Track the evolution of AGENT-11 with detailed release notes and feature updates.
            </p>
            <p className="text-sm text-gray-500">
              Updated{' '}
              <time dateTime={PAGE_UPDATED.changelog}>{formatUpdated(PAGE_UPDATED.changelog)}</time>{' '}
              ·{' '}
              <a
                href="https://github.com/TheWayWithin/agent-11/blob/main/CHANGELOG.md"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-primary-600"
              >
                the repository CHANGELOG is authoritative
              </a>
            </p>
            <p className="text-sm text-gray-500 mt-4 max-w-2xl mx-auto">
              Every entry below appears in that CHANGELOG. Two release tags in the repository have
              no CHANGELOG entry and so are not listed here rather than being described from
              guesswork; the{' '}
              <a
                href="https://github.com/TheWayWithin/agent-11/tags"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-primary-600"
              >
                repository tags
              </a>{' '}
              are the complete record. There is no 3.x line — the framework went from 2.x to 4.x.
            </p>
          </div>

          {/* Changelog Entries */}
          <div className="space-y-12">
            {changelogEntries.map((entry, index) => (
              // data-version is what scripts/check-changelog.sh reads to diff
              // this page against the framework CHANGELOG. Keep it.
              <div key={index} className="relative" data-version={entry.version}>
                {/* Version Header */}
                <div className="flex flex-wrap items-center mb-6">
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
                  {entry.title && (
                    <span className="text-gray-700 ml-4 w-full sm:w-auto mt-2 sm:mt-0">
                      {entry.title}
                    </span>
                  )}
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
            <div className="grid md:grid-cols-1 gap-6">
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