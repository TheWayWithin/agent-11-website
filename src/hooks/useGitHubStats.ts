'use client'

import { useState, useEffect, useCallback } from 'react'
import { GitHubStats, GitHubContributor, GitHubEvent } from '@/types/github'

interface UseGitHubStatsOptions {
  owner?: string
  repo?: string
  refreshInterval?: number
  autoRefresh?: boolean
}

interface GitHubApiResponse<T> {
  success: boolean
  data: T
  rateLimit?: {
    limit: number
    remaining: number
    reset: number
    used: number
  }
  cached?: boolean
  lastUpdated?: string
  fallback?: boolean
  error?: {
    message: string
    type: string
  }
}

interface UseGitHubStatsReturn {
  stats: GitHubStats | null
  contributors: GitHubContributor[]
  activity: GitHubEvent[]
  loading: boolean
  error: string | null
  isStale: boolean
  lastUpdated: string | null
  refresh: () => Promise<void>
  rateLimit: {
    limit: number
    remaining: number
    reset: number
    used: number
  } | null
}

export function useGitHubStats(options: UseGitHubStatsOptions = {}): UseGitHubStatsReturn {
  const {
    owner,
    repo,
    refreshInterval = 5 * 60 * 1000, // 5 minutes
    autoRefresh = true
  } = options

  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [contributors, setContributors] = useState<GitHubContributor[]>([])
  const [activity, setActivity] = useState<GitHubEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isStale, setIsStale] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [rateLimit, setRateLimit] = useState<UseGitHubStatsReturn['rateLimit']>(null)

  const buildUrl = useCallback((endpoint: string) => {
    const params = new URLSearchParams()
    if (owner) params.set('owner', owner)
    if (repo) params.set('repo', repo)
    return `/api/github/${endpoint}${params.toString() ? `?${params.toString()}` : ''}`
  }, [owner, repo])

  const fetchData = useCallback(async () => {
    try {
      setError(null)
      
      const [statsResponse, contributorsResponse, activityResponse] = await Promise.all([
        fetch(buildUrl('stats')),
        fetch(buildUrl('contributors') + (buildUrl('contributors').includes('?') ? '&' : '?') + 'limit=8'),
        fetch(buildUrl('activity') + (buildUrl('activity').includes('?') ? '&' : '?') + 'limit=10')
      ])

      const [statsData, contributorsData, activityData] = await Promise.all([
        statsResponse.json() as Promise<GitHubApiResponse<GitHubStats>>,
        contributorsResponse.json() as Promise<GitHubApiResponse<GitHubContributor[]>>,
        activityResponse.json() as Promise<GitHubApiResponse<GitHubEvent[]>>
      ])

      // Handle stats
      if (statsData.success) {
        setStats(statsData.data)
        if (statsData.lastUpdated) {
          setLastUpdated(statsData.lastUpdated)
        }
        if (statsData.rateLimit) {
          setRateLimit(statsData.rateLimit)
        }
        if (statsData.fallback) {
          setIsStale(true)
        }
      } else if (statsData.error) {
        setError(statsData.error.message)
      }

      // Handle contributors
      if (contributorsData.success) {
        setContributors(contributorsData.data)
      }

      // Handle activity
      if (activityData.success) {
        setActivity(activityData.data)
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch GitHub data'
      setError(errorMessage)
      console.error('GitHub data fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [buildUrl])

  const refresh = useCallback(async () => {
    setLoading(true)
    setIsStale(false)
    await fetchData()
  }, [fetchData])

  // Initial fetch
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Auto-refresh interval
  useEffect(() => {
    if (!autoRefresh || refreshInterval <= 0) return

    const interval = setInterval(() => {
      // Don't refresh if there's an error or if we're already loading
      if (!error && !loading) {
        setIsStale(true)
        fetchData()
      }
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, error, loading, fetchData])

  // Mark data as stale after half the refresh interval
  useEffect(() => {
    if (!lastUpdated || !autoRefresh) return

    const staleTimeout = setTimeout(() => {
      setIsStale(true)
    }, refreshInterval / 2)

    return () => clearTimeout(staleTimeout)
  }, [lastUpdated, refreshInterval, autoRefresh])

  return {
    stats,
    contributors,
    activity,
    loading,
    error,
    isStale,
    lastUpdated,
    refresh,
    rateLimit
  }
}

// Utility hook for just stats (lighter weight)
export function useGitHubStatsOnly(options: UseGitHubStatsOptions = {}) {
  const { stats, loading, error, isStale, lastUpdated, refresh, rateLimit } = useGitHubStats(options)
  
  return {
    stars: stats?.stars || 0,
    forks: stats?.forks || 0,
    contributors: stats?.contributors || 0,
    loading,
    error,
    isStale,
    lastUpdated,
    refresh,
    rateLimit
  }
}