export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  watchers_count: number
  language: string
  created_at: string
  updated_at: string
  pushed_at: string
  size: number
  default_branch: string
  topics: string[]
  visibility: string
  archived: boolean
  disabled: boolean
  html_url: string
  clone_url: string
  subscribers_count?: number
}

export interface GitHubContributor {
  login: string
  id: number
  avatar_url: string
  html_url: string
  contributions: number
  type: string
}

export interface GitHubEvent {
  id: string
  type: string
  actor: {
    id: number
    login: string
    display_login: string
    gravatar_id: string
    url: string
    avatar_url: string
  }
  repo: {
    id: number
    name: string
    url: string
  }
  payload: Record<string, unknown>
  public: boolean
  created_at: string
}

export interface GitHubRelease {
  id: number
  tag_name: string
  target_commitish: string
  name: string
  draft: boolean
  prerelease: boolean
  created_at: string
  published_at: string
  author: {
    login: string
    id: number
    avatar_url: string
    html_url: string
  }
  tarball_url: string
  zipball_url: string
  body: string
}

export interface GitHubStats {
  stars: number
  forks: number
  contributors: number
  openIssues: number
  watchers: number
  size: number
  language: string
  lastUpdate: string
  recentActivity: number
  releases: number
}

export interface GitHubApiResponse<T> {
  data: T
  rateLimit: {
    limit: number
    remaining: number
    reset: number
    used: number
  }
  cached: boolean
  lastUpdated: string
}

export interface CachedGitHubData {
  repository: GitHubRepository
  contributors: GitHubContributor[]
  events: GitHubEvent[]
  releases: GitHubRelease[]
  stats: GitHubStats
  lastFetched: string
  expiresAt: string
}

export interface GitHubApiError {
  message: string
  status: number
  type: 'rate_limit' | 'not_found' | 'network' | 'api_error'
  retryAfter?: number
}