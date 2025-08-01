'use client'

import { useEffect } from 'react'
import { measureWebVitals, logBundleSize, type PerformanceMetrics } from '@/lib/performance'

interface PerformanceMonitorProps {
  enabled?: boolean
  onMetrics?: (metrics: PerformanceMetrics) => void
}

export default function PerformanceMonitor({ 
  enabled = process.env.NODE_ENV === 'development',
  onMetrics 
}: PerformanceMonitorProps) {
  useEffect(() => {
    if (!enabled) return

    // Measure web vitals
    measureWebVitals((metrics) => {
      console.log('🚀 Web Vitals:', {
        FCP: metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'N/A',
        LCP: metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'N/A',
        FID: metrics.fid ? `${metrics.fid.toFixed(2)}ms` : 'N/A',
        CLS: metrics.cls ? metrics.cls.toFixed(4) : 'N/A',
        TTFB: metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : 'N/A',
      })

      // Performance thresholds
      const warnings = []
      if (metrics.fcp && metrics.fcp > 1800) warnings.push('FCP > 1.8s')
      if (metrics.lcp && metrics.lcp > 2500) warnings.push('LCP > 2.5s')
      if (metrics.fid && metrics.fid > 100) warnings.push('FID > 100ms')
      if (metrics.cls && metrics.cls > 0.1) warnings.push('CLS > 0.1')

      if (warnings.length > 0) {
        console.warn('⚠️ Performance warnings:', warnings)
      }

      if (onMetrics) {
        onMetrics(metrics)
      }
    })

    // Log bundle analysis after page load
    const timer = setTimeout(() => {
      logBundleSize()
    }, 2000)

    return () => clearTimeout(timer)
  }, [enabled, onMetrics])

  // This component renders nothing
  return null
}