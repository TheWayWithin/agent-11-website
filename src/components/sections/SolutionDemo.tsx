'use client'

import { useState, Suspense, lazy } from 'react'
import AgentCard from '../ui/AgentCard'
import CodeBlock from '../ui/CodeBlock'
import TerminalSimulation, { TerminalControls } from '../ui/TerminalSimulation'
import EmailCapture from '../ui/EmailCapture'
import { allAgents, coreAgents } from '../../data/agentExamples'
import { collaborationScenarios, getScenarioById } from '../../data/collaborationScenarios'

// Lazy load the BeforeAfterCode for performance
const LazyBeforeAfterCode = lazy(() => import('../ui/BeforeAfterCode'))

export default function SolutionDemo() {
  const [activeAgent, setActiveAgent] = useState(allAgents[0])
  const [isAnimating, setIsAnimating] = useState(false)
  const [showAllAgents, setShowAllAgents] = useState(false)
  const [viewMode, setViewMode] = useState<'demo' | 'code' | 'comparison' | 'terminal'>('demo')
  const [isLoading, setIsLoading] = useState(false)
  
  // Terminal simulation state
  const [activeScenario, setActiveScenario] = useState(collaborationScenarios[0])
  const [isTerminalPlaying, setIsTerminalPlaying] = useState(false)
  const [terminalSpeed, setTerminalSpeed] = useState(1)
  const [terminalKey, setTerminalKey] = useState(0) // For forcing re-render

  const displayedAgents = showAllAgents ? allAgents : coreAgents

  const handleAgentClick = (agent: typeof allAgents[0]) => {
    if (agent.id === activeAgent.id) return
    
    setIsAnimating(true)
    setIsLoading(true)
    
    // Simulate loading for better UX
    setTimeout(() => {
      setActiveAgent(agent)
      setIsAnimating(false)
      setIsLoading(false)
    }, 300)
  }

  const toggleAllAgents = () => {
    setShowAllAgents(!showAllAgents)
    if (!showAllAgents && !allAgents.slice(0, 8).find(a => a.id === activeAgent.id)) {
      setActiveAgent(allAgents[0])
    }
  }

  // Terminal control handlers
  const handleTerminalPlayPause = () => {
    setIsTerminalPlaying(!isTerminalPlaying)
  }

  const handleTerminalReset = () => {
    setIsTerminalPlaying(false)
    setTerminalKey(prev => prev + 1) // Force re-render
  }

  const handleTerminalSpeedChange = (speed: number) => {
    setTerminalSpeed(speed)
  }

  const handleScenarioChange = (scenarioId: string) => {
    const scenario = getScenarioById(scenarioId)
    if (scenario) {
      setActiveScenario(scenario)
      setIsTerminalPlaying(false)
      setTerminalKey(prev => prev + 1) // Force re-render
    }
  }

  const handleTerminalComplete = () => {
    setIsTerminalPlaying(false)
  }

  return (
    <section className="bg-white section-padding" id="solution-demo">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Execute Complex Missions with <span className="text-gradient">/coord</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            From BUILD to MVP to DEPLOY - watch how project-local agents collaborate 
            to complete missions faster than traditional development teams.
          </p>
        </div>

        {/* View Mode Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg flex gap-1 flex-wrap">
            <button
              onClick={() => setViewMode('terminal')}
              className={`px-4 sm:px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'terminal'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="hidden sm:inline">Mission Execution</span>
              <span className="sm:hidden">Missions</span>
            </button>
            <button
              onClick={() => setViewMode('demo')}
              className={`px-4 sm:px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'demo'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              /coord Commands
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`px-4 sm:px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'code'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mission Results
            </button>
            <button
              onClick={() => setViewMode('comparison')}
              className={`px-4 sm:px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'comparison'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Before/After
            </button>
          </div>
        </div>

        {/* Agent Selection */}
        <div className="mb-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {displayedAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={{
                  id: agent.id,
                  name: agent.name,
                  emoji: agent.emoji,
                  mission: agent.mission,
                  description: agent.description,
                  specialties: agent.specialties,
                  metrics: agent.metrics
                }}
                isActive={activeAgent.id === agent.id}
                onClick={() => handleAgentClick(agent)}
              />
            ))}
          </div>
          
          {/* Show More/Less Button */}
          <div className="text-center">
            <button
              onClick={toggleAllAgents}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors"
            >
              {showAllAgents ? (
                <>
                  Show Core Squad Only
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  Show All 11 Agents
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Interactive Demo Interface */}
        <div className="max-w-7xl mx-auto">
          {viewMode === 'terminal' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Watch Mission Execution in Real-Time
                </h3>
                <p className="text-gray-600 max-w-3xl mx-auto mb-6">
                  See how /coord commands trigger coordinated missions with seamless agent handoffs. 
                  Each scenario demonstrates how project-local agents understand context and deliver results.
                </p>
                
                {/* Scenario Selector */}
                <div className="flex justify-center mb-6">
                  <select
                    value={activeScenario.id}
                    onChange={(e) => handleScenarioChange(e.target.value)}
                    className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {collaborationScenarios.map((scenario) => (
                      <option key={scenario.id} value={scenario.id}>
                        {scenario.name} ({scenario.duration})
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Scenario Info */}
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Duration: {activeScenario.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Complexity: {activeScenario.complexity}
                  </div>
                </div>
              </div>
              
              {/* Terminal Simulation */}
              <div className="max-w-5xl mx-auto">
                <TerminalSimulation
                  key={terminalKey}
                  scenario={activeScenario}
                  isPlaying={isTerminalPlaying}
                  speed={terminalSpeed}
                  onComplete={handleTerminalComplete}
                  className="shadow-2xl"
                />
                
                <TerminalControls
                  isPlaying={isTerminalPlaying}
                  onPlayPause={handleTerminalPlayPause}
                  onReset={handleTerminalReset}
                  speed={terminalSpeed}
                  onSpeedChange={handleTerminalSpeedChange}
                  className="shadow-xl"
                />
              </div>
              
              {/* Key Benefits */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="text-3xl mb-3">🤝</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Seamless Handoffs</h4>
                  <p className="text-sm text-gray-600">Watch agents pass work smoothly with context preservation and clear communication.</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Lightning Fast</h4>
                  <p className="text-sm text-gray-600">Complete complex workflows in minutes instead of hours or days.</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className="text-3xl mb-3">🎯</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Always On-Target</h4>
                  <p className="text-sm text-gray-600">Each agent stays focused on their expertise while maintaining the bigger picture.</p>
                </div>
              </div>
            </div>
          )}

          {viewMode === 'demo' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Command Input */}
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-4">claude-code</span>
                  </div>
                  <div className="font-mono text-sm space-y-2">
                    <div className="flex items-center">
                      <span className="text-green-400">$</span>
                      <span className="ml-2 text-gray-300">{activeAgent.command}</span>
                    </div>
                    {isLoading ? (
                      <div className="text-gray-500 flex items-center">
                        <span className="animate-pulse">{activeAgent.emoji}</span>
                        <span className="ml-2">{activeAgent.name}: Analyzing requirements...</span>
                      </div>
                    ) : (
                      <div className="text-green-400 flex items-center">
                        <span>{activeAgent.emoji}</span>
                        <span className="ml-2">{activeAgent.name}: Task completed successfully!</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="text-2xl">{activeAgent.emoji}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{activeAgent.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{activeAgent.description}</p>
                    </div>
                  </div>
                  
                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {activeAgent.specialties.map((specialty, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    {activeAgent.metrics.map((metric, index) => (
                      <div key={index} className="text-center p-3 bg-white rounded-lg">
                        <div className="text-lg font-bold text-primary-600">{metric.value}</div>
                        <div className="text-xs text-gray-500">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output Display */}
              <div className={`transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                <CodeBlock
                  code={activeAgent.codeExample.code}
                  language={activeAgent.codeExample.language}
                  title={`${activeAgent.name} - ${activeAgent.codeExample.title}`}
                  showCopy={true}
                  className="h-full"
                />
              </div>
            </div>
          )}

          {viewMode === 'code' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {activeAgent.name} - Code Implementation
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  See exactly how {activeAgent.name.toLowerCase()} handles real-world tasks with production-ready code.
                </p>
              </div>
              
              <CodeBlock
                code={activeAgent.codeExample.code}
                language={activeAgent.codeExample.language}
                title={activeAgent.codeExample.title}
                showCopy={true}
                showLineNumbers={true}
              />
            </div>
          )}

          {viewMode === 'comparison' && activeAgent.beforeAfter && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {activeAgent.name} - Before vs After
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  See the dramatic improvement when {activeAgent.name.toLowerCase()} optimizes your code.
                </p>
              </div>
              
              <Suspense fallback={
                <div className="flex items-center justify-center p-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                </div>
              }>
                <LazyBeforeAfterCode
                  beforeCode={activeAgent.beforeAfter.beforeCode}
                  afterCode={activeAgent.beforeAfter.afterCode}
                  language={activeAgent.beforeAfter.language}
                  beforeTitle={activeAgent.beforeAfter.beforeTitle}
                  afterTitle={activeAgent.beforeAfter.afterTitle}
                  improvements={activeAgent.beforeAfter.improvements}
                />
              </Suspense>
            </div>
          )}

          {viewMode === 'comparison' && !activeAgent.beforeAfter && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">{activeAgent.emoji}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Before/After Coming Soon
              </h3>
              <p className="text-gray-600">
                {activeAgent.name} comparison examples are being prepared. 
                Try selecting another agent or view the code examples.
              </p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8 mb-8">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>All 11 specialists ready for deployment</span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Deploy Your AI Development Team?
            </h3>
            
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              This is the squad I build my own products with, open-sourced so you can
              inspect it, verify it, and run it yourself. Free and MIT-licensed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn-primary group">
                Deploy Your 11-Agent Team
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              <button className="btn-secondary">
                Browse the Code
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free &amp; open source (MIT)
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Install in one command
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Inspect every line
              </div>
            </div>
          </div>

          {/* Advanced Developer Lead Magnet */}
          <div className="max-w-2xl mx-auto">
            <EmailCapture
              variant="inline"
              leadMagnet="Advanced Collaboration Patterns + Enterprise Templates"
              title="Want More Advanced Examples?"
              description="Get advanced collaboration patterns and templates for building with AGENT-11."
              placeholder="Enter your email for advanced examples"
              buttonText="Get Advanced Content"
              showSocialProof={true}
              onSuccess={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'conversion', {
                    event_category: 'post_demo_capture',
                    event_label: 'advanced_examples',
                    value: 1
                  })
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}