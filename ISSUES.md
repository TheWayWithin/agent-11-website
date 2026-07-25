# agent-11-website — Issue & Project Register

**This is the single source of truth for what is open in this repo.** One row per
issue/project. Detail lives in the linked doc; this file is the index the Mission
Control reconcile (`repo-reconcile.py`) reads and mirrors to the cockpit.

## ID convention (collision-safe)

Mission Control owns the bare `ISS-`/`PRJ-`/`T-` namespaces. **Every agent-11-website ID
carries the `A11W-` prefix** so it can never collide with a Mission-Control-native
ID or another repo's. Raise issues here with `python3 ~/shared/scripts/repo-issue.py`.

---

## Open

| ID | Title | Status | Severity | Detail | MC-SYNC |
|----|-------|--------|----------|--------|---------|
| A11W-ISS-5 | Canonical points at www.agent-11.com but the site serves on the apex (www 301s to it): AImpactScanner scores Canonical Tag Configuration 40/100 'cross-domain canonical' and Indexability 85/100; decide one host and align metadataBase, alternates.canonical, sitemap.ts, robots.ts and src/lib/seo.ts SITE_URL | Open | medium | — | pending |
| A11W-ISS-4 | Stale legal pages contradict the free/MIT model: /terms (Dec 2024) describes pay-per-mission billing and squad-size pricing — must say free and MIT, matching /pricing, /support and the repo LICENSE; /privacy (Dec 2024) omits Plausible and references accounts/payments that do not exist, and PrivacyModal.tsx names Google Analytics which the site does not load | Open | medium | — | pending |
| A11W-ISS-3 | AI-visibility gaps on agent-11.com (scanner 65/100): no date metadata anywhere (Y.1.1 30), meta description 194 chars (trim to 150-160), no FAQPage schema despite FAQ-shaped content (AI.2.3 30), transparency 35, heading hierarchy 50, image alt text 50 | ✅ Resolved 2026-07-25 — AI-visibility re-score 65 -> 78/100 on MASTERY-AI v3.1.1 (fresh scan d8716d0f, 2026-07-25): date metadata 30->100, FAQ schema 30->100, image alt 50->100, transparency 35->75, meta description 194->159 chars 'optimal'; heading hierarchy still reported 50 but the page has exactly one valid H1 (scanner false negative, raised separately); seo-audit.sh 0 fails site-wide and on all 11 pages | low | — | pending |
| A11W-ISS-2 | llms.txt missing (404) on agent-11.com — high-value for the framework's AI/GitHub audience; add and date it | ✅ Resolved 2026-07-25 — Dated llms.txt live at agent-11.com/llms.txt (llmstxt.org format, all claims sourced to repo/site); scripts/check-llms.sh ships alongside and passes 29/29 against production | medium | — | pending |
| A11W-ISS-1 | No analytics on live site: neither Plausible nor GA loads on agent-11.com — add Plausible (PRJ-25 standard) + signup/install conversion goal | ✅ Resolved 2026-07-25 — Plausible live on agent-11.com (new-format script, CSP updated); Signup + Install Copy custom-event goals wired in code and registered; Plausible verification passed 2026-07-25 | medium | — | pending |

## Recently closed

| ID | Title | Status | Commit | Detail |
|----|-------|--------|--------|--------|
