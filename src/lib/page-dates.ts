/**
 * Per-page last-changed dates.
 *
 * One constant per route, shared by the page (visible "Updated <time>" line)
 * and its layout (dateModified in the page's schema) so the two can never
 * disagree.
 *
 * These are honest dates, not "today". Each one is the day that page's copy
 * actually last changed, taken from this repository's git history for the
 * page's own files. Bump a date when you change that page's copy — not when
 * you touch the site generally.
 */
export const PAGE_UPDATED = {
  /** 2026-07-25: added the FAQ section. */
  home: '2026-07-25',
  /** 2026-06-20: rewritten for the v6.2.0 release. */
  features: '2026-06-20',
  /** 2026-06-20: rewritten for the v6.2.0 release. */
  documentation: '2026-06-20',
  /** 2026-06-20: rewritten for the v6.2.0 release. */
  pricing: '2026-06-20',
  /** 2026-06-20: v6.2.0 entry added. */
  changelog: '2026-06-20',
  /** 2026-06-20: rewritten for the v6.2.0 release. */
  portfolio: '2026-06-20',
  /** 2025-12-05: last substantive edit to the about copy. */
  about: '2025-12-05',
  /** 2026-07-25: removed the non-functional email support card. */
  support: '2026-07-25',
  /**
   * 2026-07-25 (A11W-ISS-4): rewritten to describe what the site actually
   * does — Plausible, Netlify Forms, no cookies — replacing a policy that
   * referenced accounts and payments that have never existed.
   */
  privacy: '2026-07-25',
  /**
   * 2026-07-25 (A11W-ISS-4): rewritten for the free, MIT-licensed reality,
   * replacing a pay-per-mission billing section for a product that is not
   * and has never been sold.
   */
  terms: '2026-07-25',
  /** 2026-07-25 (A11W-ISS-4): removed the unreal "Enterprise Services" tier
   *  and corrected the copyright line to match the repository LICENSE. */
  license: '2026-07-25',
} as const
