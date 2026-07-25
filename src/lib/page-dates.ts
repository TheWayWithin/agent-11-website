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
   * 2025-08-04: last change to this file. The page's own body still says
   * "December 2024", which predates the file itself — that inaccuracy is
   * tracked separately as A11W-ISS-4. The date here is the verifiable one.
   */
  privacy: '2025-08-04',
  /** 2025-08-04: see the note on privacy above. */
  terms: '2025-08-04',
  /** 2025-08-04: last change to this file. */
  license: '2025-08-04',
} as const
