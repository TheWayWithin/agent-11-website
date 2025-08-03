'use client'

import { lazy, Suspense } from 'react'
import Hero from '@/components/sections/Hero'
import Problem from '@/components/sections/Problem'
import PerformanceMonitor from '@/components/ui/PerformanceMonitor'
// Email capture system temporarily disabled for build stability

// Lazy load sections that are below the fold
const SolutionDemo = lazy(() => import('@/components/sections/SolutionDemo'))
const ProofOfSpeed = lazy(() => import('@/components/sections/ProofOfSpeed'))
const SocialProof = lazy(() => import('@/components/sections/SocialProof'))
const TechnicalConfidence = lazy(() => import('@/components/sections/TechnicalConfidence'))
const GetStarted = lazy(() => import('@/components/sections/GetStarted'))

// Loading fallback for sections
const SectionSkeleton = () => (
  <div className="py-16 lg:py-24 animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="h-8 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-128 mx-auto"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
)

export default function Home() {
  // Exit intent modal temporarily disabled

  return (
    <main className="min-h-screen">
      <PerformanceMonitor />
      
      {/* Above the fold - load immediately */}
      <Hero />
      <Problem />
      
      {/* Below the fold - lazy load with suspense */}
      <Suspense fallback={<SectionSkeleton />}>
        <SolutionDemo />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ProofOfSpeed />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <SocialProof />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <TechnicalConfidence />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <GetStarted />
      </Suspense>

      {/* Email capture system temporarily disabled for build stability */}
    </main>
  )
}