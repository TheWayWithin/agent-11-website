'use client'

import { useState, useEffect, useRef, useCallback, memo } from 'react'

interface TerminalLine {
  id: string
  type: 'command' | 'output' | 'agent_thinking' | 'agent_handoff' | 'system'
  content: string
  agent?: {
    name: string
    emoji: string
  }
  timestamp?: number
  delay?: number
}

interface CollaborationScenario {
  id: string
  name: string
  description: string
  lines: TerminalLine[]
}

interface TerminalSimulationProps {
  scenario: CollaborationScenario
  isPlaying?: boolean
  speed?: number
  onComplete?: () => void
  className?: string
}

const TerminalSimulation = memo(function TerminalSimulation({
  scenario,
  isPlaying = false,
  speed = 1,
  onComplete,
  className = ''
}: TerminalSimulationProps) {
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [currentTypingText, setCurrentTypingText] = useState('')
  const terminalRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Reset when scenario changes
  useEffect(() => {
    setDisplayedLines([])
    setCurrentLineIndex(0)
    setCurrentTypingText('')
    setIsTyping(false)
  }, [scenario.id])

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [displayedLines, currentTypingText])

  // Typing function - defined before use
  const typeText = useCallback((text: string, onComplete: () => void) => {
    let index = 0
    setCurrentTypingText('')
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setCurrentTypingText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        onComplete()
      }
    }, 50 / speed) // Typing speed adjusted by simulation speed
    
    typingIntervalRef.current = interval
  }, [speed])

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.target !== document.body) return // Only when no input is focused
      
      switch (event.code) {
        case 'Space':
          event.preventDefault()
          // Toggle play/pause with spacebar - not implemented here as parent handles it
          break
        case 'KeyR':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault()
            // Reset with Ctrl/Cmd + R - not implemented here as parent handles it
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Main simulation logic
  useEffect(() => {
    if (!isPlaying || currentLineIndex >= scenario.lines.length) {
      if (currentLineIndex >= scenario.lines.length && onComplete) {
        onComplete()
      }
      return
    }

    const currentLine = scenario.lines[currentLineIndex]
    const baseDelay = currentLine.delay || (currentLine.type === 'command' ? 1000 : 500)
    const adjustedDelay = baseDelay / speed

    intervalRef.current = setTimeout(() => {
      if (currentLine.type === 'command' || currentLine.type === 'agent_thinking') {
        // Typing effect for commands and thinking
        setIsTyping(true)
        typeText(currentLine.content, () => {
          setDisplayedLines(prev => [...prev, currentLine])
          setCurrentTypingText('')
          setIsTyping(false)
          setCurrentLineIndex(prev => prev + 1)
        })
      } else {
        // Instant display for output and system messages
        setDisplayedLines(prev => [...prev, currentLine])
        setCurrentLineIndex(prev => prev + 1)
      }
    }, adjustedDelay)

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current)
      if (typingIntervalRef.current) clearTimeout(typingIntervalRef.current)
    }
  }, [isPlaying, currentLineIndex, speed, scenario.lines, onComplete, typeText])


  return (
    <div className={`bg-gray-900 rounded-xl overflow-hidden ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-400 text-sm ml-4">agent-11-terminal</span>
        </div>
        <div className="text-gray-400 text-xs">
          {scenario.name}
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="p-3 sm:p-4 h-80 sm:h-96 overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed"
        style={{ scrollBehavior: 'smooth' }}
      >
        {displayedLines.map((line) => (
          <TerminalLineComponent key={line.id} line={line} />
        ))}
        
        {/* Currently typing line */}
        {isTyping && currentTypingText && (
          <div className="flex items-start gap-2 mb-2">
            <span className="text-green-400 flex-shrink-0 text-xs sm:text-sm">$</span>
            <span className="text-gray-300 text-xs sm:text-sm break-words">
              {currentTypingText}
              <span className="animate-pulse bg-gray-300 w-1 sm:w-2 h-3 sm:h-4 inline-block ml-1"></span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
})

export default TerminalSimulation

const TerminalLineComponent = memo(function TerminalLineComponent({ line }: { line: TerminalLine }) {
  const getLineColor = () => {
    switch (line.type) {
      case 'command':
        return 'text-gray-300'
      case 'output':
        return 'text-blue-300'
      case 'agent_thinking':
        return 'text-yellow-300'
      case 'agent_handoff':
        return 'text-purple-300'
      case 'system':
        return 'text-green-300'
      default:
        return 'text-gray-300'
    }
  }

  const getPrompt = () => {
    switch (line.type) {
      case 'command':
        return <span className="text-green-400">$</span>
      case 'agent_thinking':
        return line.agent ? <span className="text-yellow-400">{line.agent.emoji}</span> : <span className="text-yellow-400">⏳</span>
      case 'agent_handoff':
        return <span className="text-purple-400">🔄</span>
      case 'system':
        return <span className="text-green-400">✓</span>
      default:
        return null
    }
  }

  return (
    <div className="flex items-start gap-1 sm:gap-2 mb-2 group">
      <div className="flex-shrink-0 w-4 sm:w-6 text-xs sm:text-sm">
        {getPrompt()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className={`${getLineColor()} text-xs sm:text-sm break-words`}>
          {line.agent && (
            <span className="text-gray-400 mr-1 sm:mr-2 hidden sm:inline">
              {line.agent.name}:
            </span>
          )}
          {line.agent && (
            <span className="text-gray-400 mr-1 sm:hidden">
              {line.agent.emoji}:
            </span>
          )}
          {line.content}
        </div>
        
        {line.timestamp && (
          <div className="text-gray-500 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {new Date(line.timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  )
})

// Terminal Control Component
interface TerminalControlsProps {
  isPlaying: boolean
  onPlayPause: () => void
  onReset: () => void
  speed: number
  onSpeedChange: (speed: number) => void
  className?: string
}

export const TerminalControls = memo(function TerminalControls({
  isPlaying,
  onPlayPause,
  onReset,
  speed,
  onSpeedChange,
  className = ''
}: TerminalControlsProps) {
  const speedOptions = [0.5, 1, 2, 4]

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 p-3 sm:p-4 bg-gray-800 rounded-b-xl border-t border-gray-700 ${className}`}>
      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-start">
        <button
          onClick={onPlayPause}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm"
        >
          {isPlaying ? (
            <>
              <svg aria-hidden="true" className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
              <span className="hidden sm:inline">Pause</span>
            </>
          ) : (
            <>
              <svg aria-hidden="true" className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span className="hidden sm:inline">Play</span>
            </>
          )}
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm"
        >
          <svg aria-hidden="true" className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
        <span className="text-gray-400 text-xs sm:text-sm">Speed:</span>
        <div className="flex gap-1">
          {speedOptions.map((option) => (
            <button
              key={option}
              onClick={() => onSpeedChange(option)}
              className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-colors ${
                speed === option
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {option}x
            </button>
          ))}
        </div>
      </div>
    </div>
  )
})