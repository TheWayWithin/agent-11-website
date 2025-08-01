'use client'

import { lazy, Suspense } from 'react'

// Lazy load heavy components
const LazyTerminalSimulation = lazy(() => import('./TerminalSimulation'))
const LazyCodeBlock = lazy(() => import('./CodeBlock'))

// Loading fallbacks
const TerminalSkeleton = () => (
  <div className="bg-gray-900 rounded-xl overflow-hidden animate-pulse">
    <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
        <div className="w-24 h-4 bg-gray-600 rounded ml-4"></div>
      </div>
    </div>
    <div className="p-4 h-80 sm:h-96">
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="w-4 h-4 bg-gray-700 rounded flex-shrink-0"></div>
            <div className={`h-4 bg-gray-700 rounded`} style={{ width: `${Math.random() * 40 + 40}%` }}></div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const CodeBlockSkeleton = () => (
  <div className="relative group animate-pulse">
    <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg">
      <div className="w-24 h-4 bg-gray-600 rounded"></div>
      <div className="w-16 h-6 bg-gray-600 rounded"></div>
    </div>
    <div className="bg-gray-900 rounded-b-lg p-4">
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`h-4 bg-gray-700 rounded`} style={{ width: `${Math.random() * 30 + 50}%` }}></div>
        ))}
      </div>
    </div>
  </div>
)

// Lazy wrapper components with error boundaries
export const LazyTerminalWrapper = (props: React.ComponentProps<typeof LazyTerminalSimulation>) => (
  <Suspense fallback={<TerminalSkeleton />}>
    <LazyTerminalSimulation {...props} />
  </Suspense>
)

export const LazyCodeBlockWrapper = (props: React.ComponentProps<typeof LazyCodeBlock>) => (
  <Suspense fallback={<CodeBlockSkeleton />}>
    <LazyCodeBlock {...props} />
  </Suspense>
)

// Export individual lazy components for direct use
export { LazyTerminalSimulation, LazyCodeBlock }