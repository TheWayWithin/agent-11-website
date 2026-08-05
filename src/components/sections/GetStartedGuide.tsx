'use client'

import { useState } from 'react'

export default function GetStartedGuide() {
  const [expandedSection, setExpandedSection] = useState<number | null>(0)

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white section-padding">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-full text-sm font-medium mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="font-bold">NEW USER GUIDE</span>
            <span className="mx-2 text-green-600">•</span>
            <span>From Installation to First Mission in 5 Minutes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Getting Started with AGENT-11
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            New to AGENT-11? Follow this step-by-step guide to go from installation
            to executing your first mission in under 5 minutes.
          </p>
        </div>

        {/* Accordion Sections */}
        <div className="max-w-4xl mx-auto space-y-4">

          {/* Section 1: Prerequisites */}
          <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-primary-200 transition-colors">
            <button
              onClick={() => toggleSection(0)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Prerequisites: Do You Have a Project?</h3>
                  <p className="text-sm text-gray-600 mt-1">Understand what you need before installation</p>
                </div>
              </div>
              <svg aria-hidden="true"
                className={`w-6 h-6 text-gray-400 transition-transform ${expandedSection === 0 ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSection === 0 && (
              <div className="px-6 pb-6 animate-slide-up">
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Do you have an existing project?</h4>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {/* YES Path */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">✅</span>
                        <span className="font-semibold text-green-800">YES - I have a project</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        Perfect! AGENT-11 will analyze your existing codebase and create custom agents.
                      </p>
                      <div className="bg-white rounded px-3 py-2 font-mono text-sm text-gray-900 border border-green-300">
                        Use: <span className="text-blue-600 font-bold">/coord dev-alignment</span>
                      </div>
                    </div>

                    {/* NO Path */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🆕</span>
                        <span className="font-semibold text-blue-800">NO - Starting from scratch</span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">
                        No problem! Create a project directory first, then install.
                      </p>
                      <div className="bg-white rounded px-3 py-2 font-mono text-sm text-gray-900 border border-blue-300">
                        Use: <span className="text-blue-600 font-bold">/coord dev-setup</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-400 text-xs ml-4">If starting from scratch</span>
                    </div>
                    <div className="font-mono text-sm space-y-2">
                      <div className="flex items-center justify-between group">
                        <div className="flex items-center flex-1">
                          <span className="text-green-400">$</span>
                          <span className="ml-2 text-gray-300">mkdir my-agent11-project</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard('mkdir my-agent11-project')}
                          className="opacity-0 group-hover:opacity-100 transition-opacity ml-4 px-2 py-1 bg-primary-600 hover:bg-primary-700 text-white text-xs rounded"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="flex items-center justify-between group">
                        <div className="flex items-center flex-1">
                          <span className="text-green-400">$</span>
                          <span className="ml-2 text-gray-300">cd my-agent11-project</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard('cd my-agent11-project')}
                          className="opacity-0 group-hover:opacity-100 transition-opacity ml-4 px-2 py-1 bg-primary-600 hover:bg-primary-700 text-white text-xs rounded"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="flex items-center justify-between group">
                        <div className="flex items-center flex-1">
                          <span className="text-green-400">$</span>
                          <span className="ml-2 text-gray-300">git init</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard('git init')}
                          className="opacity-0 group-hover:opacity-100 transition-opacity ml-4 px-2 py-1 bg-primary-600 hover:bg-primary-700 text-white text-xs rounded"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Installation */}
          <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-primary-200 transition-colors">
            <button
              onClick={() => toggleSection(1)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Installation: 5 Simple Steps</h3>
                  <p className="text-sm text-gray-600 mt-1">From installation to verification in under 2 minutes</p>
                </div>
              </div>
              <svg aria-hidden="true"
                className={`w-6 h-6 text-gray-400 transition-transform ${expandedSection === 1 ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSection === 1 && (
              <div className="px-6 pb-6 animate-slide-up">
                <div className="border-t border-gray-200 pt-6 space-y-6">

                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Navigate to your project directory</h4>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <div className="font-mono text-sm flex items-center justify-between group">
                          <div className="flex items-center flex-1">
                            <span className="text-green-400">$</span>
                            <span className="ml-2 text-gray-300">cd /path/to/your/project</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard('cd /path/to/your/project')}
                            className="opacity-0 group-hover:opacity-100 transition-opacity ml-4 px-2 py-1 bg-primary-600 hover:bg-primary-700 text-white text-xs rounded shrink-0"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Run the installation command</h4>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-gray-400 text-xs ml-4">This installs all 11 agents</span>
                        </div>
                        <div className="font-mono text-xs sm:text-sm group">
                          <div className="flex items-start gap-3">
                            <div className="flex items-start min-w-0 flex-1">
                              <span className="text-green-400 shrink-0">$</span>
                              <span className="ml-2 text-gray-300">bash &lt;(curl -fsSL https://raw.githubusercontent.com/TheWayWithin/agent-11/main/project/deployment/scripts/secure-install.sh)</span>
                            </div>
                            <button
                              onClick={() => copyToClipboard('bash <(curl -fsSL https://raw.githubusercontent.com/TheWayWithin/agent-11/main/project/deployment/scripts/secure-install.sh)')}
                              className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs rounded shrink-0 transition-colors"
                              title="Copy install command"
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        This command downloads and installs all 11 AI specialists to your project&apos;s <code className="bg-gray-100 px-2 py-1 rounded text-xs">.claude/agents/</code> directory.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Restart Claude Code</h4>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 shrink-0">•</span>
                            <span><strong>Desktop App:</strong> Close and reopen the Claude Code desktop application</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-600 shrink-0">•</span>
                            <span><strong>VS Code Extension:</strong> Restart VS Code or reload the window (Cmd/Ctrl + Shift + P → Reload Window)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold text-sm">
                      4
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Verify installation</h4>
                      <div className="bg-gray-900 rounded-lg p-4 mb-2">
                        <div className="font-mono text-sm space-y-2">
                          <div className="flex items-center justify-between group">
                            <div className="flex items-center flex-1">
                              <span className="text-green-400">$</span>
                              <span className="ml-2 text-gray-300">/agents</span>
                            </div>
                            <button
                              onClick={() => copyToClipboard('/agents')}
                              className="opacity-0 group-hover:opacity-100 transition-opacity ml-4 px-2 py-1 bg-primary-600 hover:bg-primary-700 text-white text-xs rounded"
                            >
                              Copy
                            </button>
                          </div>
                          <div className="text-gray-500 text-xs">
                            You should see a list of 11 installed agents
                          </div>
                        </div>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-800">
                          <strong>✅ Success!</strong> If you see agents listed, installation is complete.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold text-sm">
                      5
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">Choose your first mission</h4>
                      <p className="text-gray-600 text-sm mb-2">See the next section for mission selection guidance.</p>
                      <div className="flex items-center gap-2 text-primary-600 text-sm font-medium">
                        <span>Continue to &quot;Choosing Your First Mission&quot;</span>
                        <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Choosing Your First Mission */}
          <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-primary-200 transition-colors">
            <button
              onClick={() => toggleSection(2)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Choosing Your First Mission</h3>
                  <p className="text-sm text-gray-600 mt-1">Pick the right mission for your current goal</p>
                </div>
              </div>
              <svg aria-hidden="true"
                className={`w-6 h-6 text-gray-400 transition-transform ${expandedSection === 2 ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSection === 2 && (
              <div className="px-6 pb-6 animate-slide-up">
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">What&apos;s your goal?</h4>

                  <div className="space-y-3">
                    {/* Mission: dev-setup */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0">🆕</span>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 mb-1">New project from scratch</h5>
                          <p className="text-sm text-gray-700 mb-2">
                            Set up a new project with architecture, documentation, and project structure.
                          </p>
                          <div className="bg-gray-900 rounded px-3 py-2 font-mono text-sm text-gray-300">
                            /coord dev-setup ideation.md
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mission: dev-alignment */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0">📦</span>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 mb-1">Existing project needs structure</h5>
                          <p className="text-sm text-gray-700 mb-2">
                            Analyze your codebase and create custom agents that understand your project.
                          </p>
                          <div className="bg-gray-900 rounded px-3 py-2 font-mono text-sm text-gray-300">
                            /coord dev-alignment
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mission: build */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0">🏗️</span>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 mb-1">Build a specific feature</h5>
                          <p className="text-sm text-gray-700 mb-2">
                            Develop a complete feature from requirements to tests to documentation.
                          </p>
                          <div className="bg-gray-900 rounded px-3 py-2 font-mono text-sm text-gray-300">
                            /coord build requirements.md
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mission: fix */}
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0">🔧</span>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 mb-1">Fix a bug or issue</h5>
                          <p className="text-sm text-gray-700 mb-2">
                            Quick bug fix workflow with root cause analysis and testing.
                          </p>
                          <div className="bg-gray-900 rounded px-3 py-2 font-mono text-sm text-gray-300">
                            /coord fix bug-description.md
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mission: deploy */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl shrink-0">🚀</span>
                        <div className="flex-1">
                          <h5 className="font-semibold text-gray-900 mb-1">Deploy to production</h5>
                          <p className="text-sm text-gray-700 mb-2">
                            Production deployment with testing, monitoring, and rollback plans.
                          </p>
                          <div className="bg-gray-900 rounded px-3 py-2 font-mono text-sm text-gray-300">
                            /coord deploy
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600">
                      <strong>💡 Pro Tip:</strong> AGENT-11 supports 18 missions. These are the most common starting points.
                      Explore the full mission catalog below for advanced workflows like testing, optimization, and migration.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 4: What to Expect */}
          <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-primary-200 transition-colors">
            <button
              onClick={() => toggleSection(3)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">What to Expect</h3>
                  <p className="text-sm text-gray-600 mt-1">How missions work and what happens next</p>
                </div>
              </div>
              <svg aria-hidden="true"
                className={`w-6 h-6 text-gray-400 transition-transform ${expandedSection === 3 ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedSection === 3 && (
              <div className="px-6 pb-6 animate-slide-up">
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">After installation, you will have:</h4>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                      <svg aria-hidden="true" className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <strong className="text-gray-900">11 AI specialists</strong>
                        <p className="text-sm text-gray-600">Available via @agent-name (e.g., @developer, @strategist)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg aria-hidden="true" className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <strong className="text-gray-900">18 missions</strong>
                        <p className="text-sm text-gray-600">Available via /coord command (e.g., /coord build, /coord deploy)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg aria-hidden="true" className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <strong className="text-gray-900">Project-specific agents</strong>
                        <p className="text-sm text-gray-600">In .claude/agents/ directory, customized for your codebase</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg aria-hidden="true" className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <strong className="text-gray-900">Mission files</strong>
                        <p className="text-sm text-gray-600">In /missions/ directory for coordinated multi-agent workflows</p>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-4 mt-8">What happens when you run a mission?</h4>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                        1
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong>Coordinator reads your mission file</strong> and understands requirements
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                        2
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong>Assembles specialist squad</strong> (2-11 agents based on mission complexity)
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                        3
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong>Executes mission with full coordination</strong> - agents collaborate seamlessly
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                        4
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong>Updates tracking files</strong> (project-plan.md, progress.md, architecture.md)
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-xs shrink-0">
                        5
                      </div>
                      <p className="text-sm text-gray-700">
                        <strong>Reports completion or issues</strong> with clear next steps
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                    <h5 className="font-semibold text-green-800 mb-2">Need Help?</h5>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <span className="text-green-600">•</span>
                        <span>Report issues on <a href="https://github.com/TheWayWithin/agent-11/issues" className="text-primary-600 hover:underline font-medium">GitHub</a></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-600">•</span>
                        <span>Read the <a href="https://github.com/TheWayWithin/agent-11" className="text-primary-600 hover:underline font-medium">full documentation</a> on GitHub</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-6 py-3 rounded-full text-sm font-medium mb-6">
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-bold">Ready to start building?</span>
          </div>
          <p className="text-gray-600 mb-6">
            Installation takes less than 1 minute. Your first mission can be running in 5 minutes.
          </p>
          <a
            href="https://github.com/TheWayWithin/agent-11"
            className="inline-flex items-center btn-primary group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Install AGENT-11 Now
            <svg aria-hidden="true" className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
