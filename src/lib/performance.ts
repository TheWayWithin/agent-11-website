// Performance monitoring utilities
export interface PerformanceMetrics {
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  ttfb?: number // Time to First Byte
}

// Web Vitals measurement
export function measureWebVitals(callback: (metrics: PerformanceMetrics) => void) {
  if (typeof window === 'undefined') return

  const metrics: PerformanceMetrics = {}

  // Measure FCP
  const paintEntries = performance.getEntriesByType('paint')
  const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint')
  if (fcpEntry) {
    metrics.fcp = fcpEntry.startTime
  }

  // Measure LCP using PerformanceObserver
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        metrics.lcp = lastEntry.startTime
        callback(metrics)
      })
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (e) {
      console.warn('LCP measurement not supported:', e)
    }
  }

  // Measure FID
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: PerformanceEntry & { processingStart?: number }) => {
          if (entry.processingStart && entry.startTime) {
            metrics.fid = entry.processingStart - entry.startTime
            callback(metrics)
          }
        })
      })
      observer.observe({ entryTypes: ['first-input'] })
    } catch (e) {
      console.warn('FID measurement not supported:', e)
    }
  }

  // Measure CLS
  if ('PerformanceObserver' in window) {
    try {
      let clsValue = 0
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: PerformanceEntry & { value?: number; hadRecentInput?: boolean }) => {
          if (!entry.hadRecentInput && entry.value) {
            clsValue += entry.value
            metrics.cls = clsValue
            callback(metrics)
          }
        })
      })
      observer.observe({ entryTypes: ['layout-shift'] })
    } catch (e) {
      console.warn('CLS measurement not supported:', e)
    }
  }

  // Measure TTFB
  const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  if (navEntry) {
    metrics.ttfb = navEntry.responseStart - navEntry.requestStart
  }

  // Initial callback with available metrics
  callback(metrics)
}

// Bundle size analyzer helper
export function logBundleSize() {
  if (typeof window === 'undefined') return

  // Log performance entries
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
  const jsResources = resources.filter((resource) => 
    resource.name.includes('.js') && resource.name.includes('_next')
  )
  
  let totalSize = 0
  jsResources.forEach((resource) => {
    if (resource.transferSize) {
      totalSize += resource.transferSize
    }
  })

  console.log('📊 Bundle Analysis:', {
    totalJSSize: `${(totalSize / 1024).toFixed(2)}KB`,
    resourceCount: jsResources.length,
    resources: jsResources.map((r) => ({
      name: r.name.split('/').pop(),
      size: `${((r.transferSize || 0) / 1024).toFixed(2)}KB`,
      loadTime: `${r.duration.toFixed(2)}ms`
    }))
  })
}

// Performance mark helpers
export function markStart(name: string) {
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.mark(`${name}-start`)
  }
}

export function markEnd(name: string) {
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.mark(`${name}-end`)
    performance.measure(name, `${name}-start`, `${name}-end`)
    
    const measures = performance.getEntriesByName(name, 'measure')
    const duration = measures[measures.length - 1]?.duration
    
    if (duration !== undefined) {
      console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`)
    }
  }
}

// Component render time tracker
export function withPerformanceTracking<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
): React.ComponentType<P> {
  return function PerformanceTrackedComponent(props: P) {
    React.useEffect(() => {
      markStart(componentName)
      return () => markEnd(componentName)
    }, [])

    return React.createElement(Component, props as P)
  }
}

// Import React for the withPerformanceTracking function
import React from 'react'