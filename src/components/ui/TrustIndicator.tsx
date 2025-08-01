'use client'

import { ReactNode } from 'react'

interface TrustIndicatorProps {
  status: 'loading' | 'live' | 'stale' | 'error'
  label: string
  sublabel?: string
  className?: string
  showPulse?: boolean
  icon?: ReactNode
}

export default function TrustIndicator({ 
  status, 
  label, 
  sublabel,
  className = '',
  showPulse = true,
  icon
}: TrustIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'loading':
        return {
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-700',
          dotColor: 'bg-yellow-500',
          animation: showPulse ? 'animate-pulse' : ''
        }
      case 'live':
        return {
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          dotColor: 'bg-green-500',
          animation: showPulse ? 'animate-pulse-gentle' : ''
        }
      case 'stale':
        return {
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-700',
          dotColor: 'bg-orange-500',
          animation: showPulse ? 'animate-pulse' : ''
        }
      case 'error':
        return {
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          dotColor: 'bg-red-500',
          animation: ''
        }
      default:
        return {
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-700',
          dotColor: 'bg-gray-500',
          animation: ''
        }
    }
  }

  const config = getStatusConfig()

  return (
    <div className={`inline-flex items-center gap-2 ${config.bgColor} ${config.textColor} px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${className}`}>
      <span className={`w-2 h-2 rounded-full ${config.dotColor} ${config.animation}`}></span>
      {icon && <span className="text-sm">{icon}</span>}
      <span>{label}</span>
      {sublabel && (
        <span className={`text-xs opacity-75 ml-1 ${status === 'stale' ? 'animate-pulse' : ''}`}>
          {sublabel}
        </span>
      )}
    </div>
  )
}