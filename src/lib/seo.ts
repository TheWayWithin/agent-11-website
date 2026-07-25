/**
 * SEO helpers shared across the site.
 *
 * Ported from the jamiewatters.work fix wave (T-247 / T-261) so both PRJ-25
 * sites behave the same way under the MASTERY-AI checks.
 */

/** Canonical origin. Matches metadataBase, sitemap.ts and robots.ts. */
export const SITE_URL = 'https://www.agent-11.com'

/**
 * The framework release the site currently describes, and the day it shipped.
 * Sourced from the GitHub release tag v6.2.0-loop-discipline (2026-06-20) and
 * the repository CHANGELOG. Bump both together when a new version ships.
 */
export const FRAMEWORK_VERSION = '6.2.0'
export const FRAMEWORK_RELEASED = '2026-06-20'

/**
 * Site-wide last-changed date: the most recent day any page's copy changed.
 * Per-page dates live beside each page and are the ones users see.
 */
export const SITE_UPDATED = '2026-07-25'

/**
 * Build a meta description from free text.
 *
 * Search snippets and AI crawlers both work best at ~150-160 characters;
 * anything longer is cut mid-sentence by the SERP anyway, so we truncate at a
 * word boundary ourselves rather than let a machine do it badly.
 */
export function buildMetaDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const slice = clean.slice(0, max - 1)
  const cut = slice.slice(0, slice.lastIndexOf(' '))
  return `${cut.replace(/[,;:.!?]$/, '')}…`
}

/**
 * Format an ISO date (YYYY-MM-DD) as British-English display text.
 * Used for the visible "Updated <time>" line that sits beside dateModified
 * in each page's schema — the two always come from the same constant.
 */
export function formatUpdated(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
