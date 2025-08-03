import { NextRequest, NextResponse } from 'next/server'
import githubApi from '@/lib/github-api'
import { GitHubApiError } from '@/types/github'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic' // Prevent static rendering
export const revalidate = 600 // ISR: revalidate every 10 minutes (contributors change less frequently)

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const owner = searchParams.get('owner') || undefined
    const repo = searchParams.get('repo') || undefined
    const limit = parseInt(searchParams.get('limit') || '10')

    const response = await githubApi.getContributors(owner, repo, limit)
    
    return NextResponse.json({
      success: true,
      ...response
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
        'CDN-Cache-Control': 'public, s-maxage=600',
        'Vercel-CDN-Cache-Control': 'public, s-maxage=600'
      }
    })
  } catch (error) {
    console.error('GitHub contributors API error:', error)

    if (error && typeof error === 'object' && 'type' in error) {
      const gitHubError = error as GitHubApiError
      
      // Return empty array for fallback
      if (gitHubError.type === 'rate_limit' || gitHubError.type === 'network') {
        return NextResponse.json({
          success: true,
          data: [],
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
            'Cache-Control': 'public, s-maxage=60'
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

    // Unknown error - return empty array
    return NextResponse.json({
      success: true,
      data: [],
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