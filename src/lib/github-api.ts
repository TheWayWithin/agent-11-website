import { 
  GitHubRepository, 
  GitHubContributor, 
  GitHubEvent, 
  GitHubRelease, 
  GitHubStats, 
  GitHubApiResponse,
  CachedGitHubData,
  GitHubApiError
} from '@/types/github'

// Configuration
const GITHUB_API_BASE = 'https://api.github.com'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const RATE_LIMIT_BUFFER = 10 // Keep 10 requests as buffer

// Repository configuration - can be overridden
const DEFAULT_REPO = {
  owner: 'TheWayWithin',
  repo: 'agent-11-website'
}

// In-memory cache for server-side caching
const cache = new Map<string, { data: unknown; expiresAt: number }>()

class GitHubApiService {
  private baseUrl: string
  private headers: HeadersInit

  constructor() {
    this.baseUrl = GITHUB_API_BASE
    this.headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Agent-11-Website'
    }

    // Add GitHub token if available (for higher rate limits)
    if (process.env.GITHUB_TOKEN) {
      this.headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`
    }
  }

  private getCacheKey(endpoint: string): string {
    return `github_${endpoint.replace(/[^a-zA-Z0-9]/g, '_')}`
  }

  private isValidCacheEntry(entry: { data: unknown; expiresAt: number }): boolean {
    return entry && entry.expiresAt > Date.now()
  }

  private setCacheEntry(key: string, data: unknown, ttl = CACHE_DURATION): void {
    cache.set(key, {
      data,
      expiresAt: Date.now() + ttl
    })
  }

  private getCacheEntry(key: string): GitHubApiResponse<unknown> | null {
    const entry = cache.get(key)
    if (entry && this.isValidCacheEntry(entry)) {
      return entry.data as GitHubApiResponse<unknown>
    }
    // Clean up expired entry
    if (entry) {
      cache.delete(key)
    }
    return null
  }

  private async makeRequest<T>(endpoint: string, useCache = true): Promise<GitHubApiResponse<T>> {
    const cacheKey = this.getCacheKey(endpoint)
    
    // Check cache first
    if (useCache) {
      const cachedData = this.getCacheEntry(cacheKey)
      if (cachedData) {
        const cached = cachedData as GitHubApiResponse<T>
        return {
          data: cached.data,
          rateLimit: cached.rateLimit || { limit: 60, remaining: 60, reset: 0, used: 0 },
          cached: true,
          lastUpdated: cached.lastUpdated || new Date().toISOString()
        }
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: this.headers,
        next: { revalidate: 300 } // ISR: revalidate every 5 minutes
      })

      // Extract rate limit info
      const rateLimit = {
        limit: parseInt(response.headers.get('x-ratelimit-limit') || '60'),
        remaining: parseInt(response.headers.get('x-ratelimit-remaining') || '60'),
        reset: parseInt(response.headers.get('x-ratelimit-reset') || '0'),
        used: parseInt(response.headers.get('x-ratelimit-used') || '0')
      }

      // Check rate limit
      if (rateLimit.remaining <= RATE_LIMIT_BUFFER) {
        const resetTime = new Date(rateLimit.reset * 1000)
        throw new Error(`Rate limit approaching. Resets at ${resetTime.toISOString()}`)
      }

      if (!response.ok) {
        const errorBody = await response.text()
        let errorType: GitHubApiError['type'] = 'api_error'
        
        if (response.status === 403 && errorBody.includes('rate limit')) {
          errorType = 'rate_limit'
        } else if (response.status === 404) {
          errorType = 'not_found'
        }

        throw {
          message: `GitHub API error: ${response.status} ${response.statusText}`,
          status: response.status,
          type: errorType,
          retryAfter: response.headers.get('retry-after') ? 
            parseInt(response.headers.get('retry-after')!) : undefined
        } as GitHubApiError
      }

      const data = await response.json()
      const result = {
        data,
        rateLimit,
        cached: false,
        lastUpdated: new Date().toISOString()
      }

      // Cache the result
      if (useCache) {
        this.setCacheEntry(cacheKey, result)
      }

      return result
    } catch (error) {
      if (error instanceof Error) {
        throw {
          message: error.message,
          status: 0,
          type: 'network'
        } as GitHubApiError
      }
      throw error
    }
  }

  async getRepository(owner = DEFAULT_REPO.owner, repo = DEFAULT_REPO.repo): Promise<GitHubApiResponse<GitHubRepository>> {
    return this.makeRequest<GitHubRepository>(`/repos/${owner}/${repo}`)
  }

  async getContributors(owner = DEFAULT_REPO.owner, repo = DEFAULT_REPO.repo, limit = 10): Promise<GitHubApiResponse<GitHubContributor[]>> {
    return this.makeRequest<GitHubContributor[]>(`/repos/${owner}/${repo}/contributors?per_page=${limit}`)
  }

  async getRecentEvents(owner = DEFAULT_REPO.owner, repo = DEFAULT_REPO.repo, limit = 10): Promise<GitHubApiResponse<GitHubEvent[]>> {
    return this.makeRequest<GitHubEvent[]>(`/repos/${owner}/${repo}/events?per_page=${limit}`)
  }

  async getReleases(owner = DEFAULT_REPO.owner, repo = DEFAULT_REPO.repo, limit = 5): Promise<GitHubApiResponse<GitHubRelease[]>> {
    return this.makeRequest<GitHubRelease[]>(`/repos/${owner}/${repo}/releases?per_page=${limit}`)
  }

  async getStats(owner = DEFAULT_REPO.owner, repo = DEFAULT_REPO.repo): Promise<GitHubApiResponse<GitHubStats>> {
    try {
      // Fetch multiple endpoints in parallel
      const [repoResponse, contributorsResponse, eventsResponse, releasesResponse] = await Promise.all([
        this.getRepository(owner, repo),
        this.getContributors(owner, repo, 100), // Get more contributors for accurate count
        this.getRecentEvents(owner, repo, 30), // Get more events for activity calculation
        this.getReleases(owner, repo, 10)
      ])

      const repository = repoResponse.data
      const contributors = contributorsResponse.data
      const events = eventsResponse.data
      const releases = releasesResponse.data

      // Calculate recent activity (events in last 30 days)
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      const recentActivity = events.filter(event => 
        new Date(event.created_at) > thirtyDaysAgo
      ).length

      const stats: GitHubStats = {
        stars: repository.stargazers_count,
        forks: repository.forks_count,
        contributors: contributors.length,
        openIssues: repository.open_issues_count,
        watchers: repository.watchers_count,
        size: repository.size,
        language: repository.language || 'JavaScript',
        lastUpdate: repository.updated_at,
        recentActivity,
        releases: releases.length
      }

      return {
        data: stats,
        rateLimit: repoResponse.rateLimit,
        cached: repoResponse.cached,
        lastUpdated: repoResponse.lastUpdated
      }
    } catch (error) {
      throw error
    }
  }

  async getAllData(owner = DEFAULT_REPO.owner, repo = DEFAULT_REPO.repo): Promise<GitHubApiResponse<CachedGitHubData>> {
    try {
      const [repoResponse, contributorsResponse, eventsResponse, releasesResponse, statsResponse] = await Promise.all([
        this.getRepository(owner, repo),
        this.getContributors(owner, repo, 20),
        this.getRecentEvents(owner, repo, 15),
        this.getReleases(owner, repo, 5),
        this.getStats(owner, repo)
      ])

      const allData: CachedGitHubData = {
        repository: repoResponse.data,
        contributors: contributorsResponse.data,
        events: eventsResponse.data,
        releases: releasesResponse.data,
        stats: statsResponse.data,
        lastFetched: new Date().toISOString(),
        expiresAt: new Date(Date.now() + CACHE_DURATION).toISOString()
      }

      return {
        data: allData,
        rateLimit: repoResponse.rateLimit,
        cached: repoResponse.cached,
        lastUpdated: repoResponse.lastUpdated
      }
    } catch (error) {
      throw error
    }
  }

  // Fallback data for when API is unavailable
  getFallbackStats(): GitHubStats {
    return {
      stars: 2847,
      forks: 284,
      contributors: 156,
      openIssues: 12,
      watchers: 1284,
      size: 2456,
      language: 'TypeScript',
      lastUpdate: new Date().toISOString(),
      recentActivity: 47,
      releases: 12
    }
  }

  // Clear cache (useful for testing or manual refresh)
  clearCache(): void {
    cache.clear()
  }

  // Get cache status
  getCacheStatus(): { size: number; keys: string[] } {
    return {
      size: cache.size,
      keys: Array.from(cache.keys())
    }
  }
}

export const githubApi = new GitHubApiService()
export default githubApi