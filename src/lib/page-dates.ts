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
  /**
   * 2026-08-04: scoped the enforcement claims to the four Edit() deny rules and corrected the counts against the framework repo (18 missions, 14 slash commands, 31 field guides).
   * Also dropped the four unsourced Hero figures: a template count, a schema
   * validation percentage, a deploy-time figure and a field-manual line count.
   * None could be traced to anything in the framework repo. See
   * scripts/check-claims.sh, which now fails the build if any returns.
   * 2026-07-25: added the FAQ section.
   */
  home: '2026-08-04',
  /**
   * 2026-08-04: scoped the enforcement claims to the four Edit() deny rules and corrected the counts against the framework repo (18 missions, 14 slash commands, 31 field guides).
   * Added the five missions that were missing from the cards and a
   * map-first orientation card.
   * 2026-06-20: rewritten for the v6.2.0 release.
   */
  features: '2026-08-04',
  /**
   * 2026-08-04: scoped the enforcement claims to the four Edit() deny rules and corrected the counts against the framework repo (18 missions, 14 slash commands, 31 field guides).
   * Added the upgrade line: connect-mcp and operation-recon never
   * deployed before 2026-08-03.
   * 2026-06-20: rewritten for the v6.2.0 release.
   */
  documentation: '2026-08-04',
  /**
   * 2026-07-26 (A11W-ISS-8): dropped the "maintain servers"/"server costs"
   * funding claims (there is no infrastructure) and corrected the agent count
   * from "11 specialists + coordinator" (12) to 11, coordinator included.
   */
  /** 2026-08-04: corrected the mission, command and field-guide counts and
   *  scoped the read-only gates claim to the gate files. */
  pricing: '2026-08-04',
  /**
   * 2026-07-26 (A11W-ISS-7): rebuilt from the framework CHANGELOG. The page
   * had listed v2.3.0, v2.2.0, v2.1.0, v2.0.3, v1.5.2 and v1.5.0, none of
   * which the framework ever released.
   */
  /** 2026-08-04: added the [Unreleased] block from the framework CHANGELOG.
   *  No version was cut, so FRAMEWORK_VERSION stays at 6.2.0. */
  changelog: '2026-08-04',
  /**
   * 2026-08-04: scoped the enforcement claims to the four Edit() deny rules and corrected the counts against the framework repo (18 missions, 14 slash commands, 31 field guides).
   * 2026-06-20: rewritten for the v6.2.0 release.
   */
  portfolio: '2026-08-04',
  /** 2025-12-05: last substantive edit to the about copy. */
  about: '2025-12-05',
  /** 2026-07-25: removed the non-functional email support card. */
  support: '2026-07-25',
  /**
   * 2026-07-26 (A11W-ISS-6): the email-capture section rewritten now the form
   * is a release-updates list rather than a lead-magnet capture.
   * 2026-07-25 (A11W-ISS-4): rewritten to describe what the site actually
   * does — Plausible, Netlify Forms, no cookies — replacing a policy that
   * referenced accounts and payments that have never existed.
   */
  privacy: '2026-07-26',
  /**
   * 2026-07-25 (A11W-ISS-4): rewritten for the free, MIT-licensed reality,
   * replacing a pay-per-mission billing section for a product that is not
   * and has never been sold.
   */
  terms: '2026-07-25',
  /** 2026-07-25 (A11W-ISS-4): removed the unreal "Enterprise Services" tier
   *  and corrected the copyright line to match the repository LICENSE. */
  license: '2026-07-25',
  /**
   * 2026-07-26 (A11W-ISS-10): new page. security.txt's Policy line pointed at
   * /security-policy, which 404'd; this is the page it should have pointed at.
   */
  security: '2026-07-26',
} as const
