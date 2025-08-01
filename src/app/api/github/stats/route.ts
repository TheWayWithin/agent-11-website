import { NextRequest, NextResponse } from 'next/server'
import githubApi from '@/lib/github-api'
import { GitHubApiError } from '@/types/github'

export const runtime = 'nodejs'
export const revalidate = 300 // ISR: revalidate every 5 minutes

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const owner = searchParams.get('owner') || undefined
    const repo = searchParams.get('repo') || undefined

    const response = await githubApi.getStats(owner, repo)
    
    return NextResponse.json({
      success: true,
      ...response
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'CDN-Cache-Control': 'public, s-maxage=300',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=300'
      }
    })
  } catch (error) {
    console.error('GitHub stats API error:', error)

    if (error && typeof error === 'object' && 'type' in error) {
      const gitHubError = error as GitHubApiError
      
      // Return fallback data for client-side errors
      if (gitHubError.type === 'rate_limit' || gitHubError.type === 'network') {
        const fallbackStats = githubApi.getFallbackStats()
        
        return NextResponse.json({
          success: true,
          data: fallbackStats,
          rateLimit: { limit: 60, remaining: 0, reset: 0, used: 60 },
          cached: false,
          lastUpdated: new Date().toISOString(),
          fallback: true,
          error: {
            message: gitHubError.message,
            type: gitHubError.type
          }
        }, {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
          }
        })
      }

      return NextResponse.json({
        success: false,
        error: {
          message: gitHubError.message,
          type: gitHubError.type,
          status: gitHubError.status
        }
      }, { status: gitHubError.status || 500 })
    }

    // Unknown error - return fallback
    const fallbackStats = githubApi.getFallbackStats()
    return NextResponse.json({
      success: true,
      data: fallbackStats,
      fallback: true,
      error: {
        message: 'Unknown error occurred',
        type: 'api_error'
      }
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60'
      }
    })
  }
}