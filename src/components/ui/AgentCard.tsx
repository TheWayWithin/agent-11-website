'use client'

import { useState } from 'react'

interface AgentCardProps {
  agent: {
    id: string
    name: string
    emoji: string
    mission: string
    description: string
    specialties?: string[]
    metrics?: { label: string; value: string }[]
  }
  isActive: boolean
  onClick: () => void
  className?: string
}

export default function AgentCard({ agent, isActive, onClick, className = '' }: AgentCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative p-6 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
        isActive
          ? 'border-primary-500 bg-primary-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-gray-300'
      } ${className}`}
      aria-label={`Select ${agent.name}`}
      role="tab"
      aria-selected={isActive}
    >
      {/* Status Indicator */}
      <div className={`absolute top-4 right-4 w-3 h-3 rounded-full transition-colors ${
        isActive ? 'bg-green-500' : 'bg-gray-300'
      }`}>
        {isActive && (
          <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
        )}
      </div>

      {/* Agent Emoji */}
      <div className={`text-4xl mb-3 transition-transform duration-300 ${
        isHovered ? 'scale-110' : 'scale-100'
      }`}>
        {agent.emoji}
      </div>

      {/* Agent Info */}
      <div className="space-y-2">
        <h3 className={`font-semibold text-lg transition-colors ${
          isActive ? 'text-primary-700' : 'text-gray-900'
        }`}>
          {agent.name}
        </h3>
        
        <p className="text-sm text-gray-600 leading-relaxed">
          {agent.mission}
        </p>

        {/* Specialties */}
        {agent.specialties && agent.specialties.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {agent.specialties.slice(0, 2).map((specialty, index) => (
              <span
                key={index}
                className={`px-2 py-1 text-xs rounded-full transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {specialty}
              </span>
            ))}
            {agent.specialties.length > 2 && (
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-500">
                +{agent.specialties.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Metrics */}
        {agent.metrics && agent.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-200">
            {agent.metrics.slice(0, 2).map((metric, index) => (
              <div key={index} className="text-center">
                <div className={`text-lg font-semibold ${
                  isActive ? 'text-primary-600' : 'text-gray-700'
                }`}>
                  {metric.value}
                </div>
                <div className="text-xs text-gray-500">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500/5 to-primary-600/5 opacity-0 transition-opacity duration-300 pointer-events-none ${
        isHovered && !isActive ? 'opacity-100' : 'opacity-0'
      }`} />
    </button>
  )
}