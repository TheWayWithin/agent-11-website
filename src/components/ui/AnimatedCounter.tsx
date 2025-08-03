'use client'

import { useEffect, useState, useRef } from 'react'

interface AnimatedCounterProps {
  value: string | number
  duration?: number
  formatValue?: (value: number) => string
  className?: string
  suffix?: string
  prefix?: string
  triggerAnimation?: boolean
}

export default function AnimatedCounter({ 
  value, 
  duration = 800, 
  formatValue,
  className = '',
  suffix = '',
  prefix = '',
  triggerAnimation = true
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<string>('0')
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const prevValueRef = useRef<string | number>(0)
  const rafRef = useRef<number | undefined>(undefined)

  // Convert string value to number for animation, handling "k" suffix and other formats
  const parseValue = (val: string | number): number => {
    if (typeof val === 'number') return val
    
    // Handle cases like "2.5k", "1,234", etc.
    const cleanValue = val.toString().replace(/[^0-9.k]/g, '')
    if (cleanValue.includes('k')) {
      return parseFloat(cleanValue.replace('k', '')) * 1000
    }
    return parseFloat(cleanValue) || 0
  }

  const currentValue = parseValue(value)
  const previousValue = parseValue(prevValueRef.current)

  // Default formatter that handles thousands
  const defaultFormatter = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`
    }
    return Math.floor(num).toLocaleString()
  }

  const formatter = formatValue || defaultFormatter

  useEffect(() => {
    if (!triggerAnimation) {
      setDisplayValue(typeof value === 'string' ? value : formatter(currentValue))
      return
    }

    // Handle string values that shouldn't animate (like "430+", "3 weeks", "98%", "<1s")
    if (typeof value === 'string' && (
      value.includes('+') || 
      value.includes('weeks') || 
      value.includes('%') || 
      value.includes('<') ||
      value.includes('s') ||
      isNaN(parseValue(value))
    )) {
      setDisplayValue(value)
      setHasAnimated(true)
      return
    }

    // Only animate if value actually changed significantly
    const significantChange = Math.abs(currentValue - previousValue) > (currentValue * 0.01) // 1% change threshold
    if (!significantChange && hasAnimated && previousValue !== 0) {
      return
    }

    // Debounce rapid changes - prevent animation if last animation was recent
    if (isAnimating) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }

    setIsAnimating(true)
    const startTime = Date.now()
    const startValue = hasAnimated ? previousValue : 0
    const difference = currentValue - startValue

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = startValue + (difference * easeOutQuart)
      
      setDisplayValue(formatter(current))
      
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayValue(formatter(currentValue))
        setIsAnimating(false)
        setHasAnimated(true)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    prevValueRef.current = value

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [value, currentValue, previousValue, duration, formatter, triggerAnimation, hasAnimated, isAnimating])

  return (
    <span 
      className={`inline-block transition-all duration-300 ${
        isAnimating ? 'animate-count-up' : ''
      } ${className}`}
      key={currentValue} // Force re-render for animation
    >
      {prefix}{displayValue}{suffix}
    </span>
  )
}