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
| A11W-ISS-17 | PreToolUse prompt hook fires on benign Bash: its if-glob fails open on multi-line loops, heredocs and redirections (A11-ISS-4 failure mode), and the LLM judge then refuses the command with incoherent reasoning, invisibly to the user | Open | high | — | pending |
| A11W-ISS-16 | npm run dev fails under Turbopack: @import rules must precede all rules in globals.css, so Playwright cannot start its own webServer | Open | medium | — | pending |
| A11W-ISS-15 | Hero: animated paragraph and metrics grid overlap the CTA button at Pixel 5 width, intercepting pointer events | Open | low | — | pending |
| A11W-ISS-14 | Playwright suite is stale: 70 failures assert lead-magnet UI removed in July 2026 | ✅ Resolved 2026-08-04 — Rewrote email-capture-integration.spec.ts against the real release-updates form; reduced core-integration-test.spec.ts to its one real assertion; removed manual-integration-validation.spec.ts as a duplicate of the removed lead-magnet suite; replaced production-deployment's component-name section selectors with structural ones; moved the three live-site specs into a single live-site-smoke project so 5 device projects no longer hammer agent-11.com in parallel. npx playwright test now exits 0, 61 passed. | medium | — | pending |
| A11W-ISS-13 | Four orphaned Netlify forms (email-capture-hero/inline/modal/footer) remain registered with zero submissions - delete once release-updates is proven | ✅ Resolved 2026-07-27 — Jamie deleted the four orphaned forms 2026-07-27; Netlify now shows 1 form (release-updates, 2 submissions) - verified in the dashboard | low | — | pending |
| A11W-ISS-12 | /portfolio links 'Read the Case Study' to agent-11/blob/main/CASE-STUDY.md which 404s (only dead link on the page; other 11 external links resolve) | ✅ Resolved 2026-07-27 — Dead links gone: CASE-STUDY.md removed from /portfolio and the homepage (archived + unsourced, not repointed), MULTI-AGENT-WORKFLOWS.md repointed to the live WORKFLOWS.md; new scripts/check-links.sh walks the sitemap and passes 50/0 on production | medium | — | pending |
| A11W-ISS-11 | Share-on-X link tags @agent11_dev, a third handle variant that may not exist (site elsewhere uses @Jamie_within) | ✅ Resolved 2026-07-26 — Share-on-X now tags @Jamie_within (x.com 200); @agent11_dev and @agent11dev both 404 - one real handle site-wide | low | — | pending |
| A11W-ISS-10 | security.txt Policy line points at /security-policy which 404s, and its Contact is a different domain's mailbox | ✅ Resolved 2026-07-26 — security.txt every field resolves: Policy -> new /security page (200), Contact -> GitHub advisories URL (no unverified mailbox), Expires extended to 2027-07-26; check-legal.sh asserts all of it incl. lapse guard | medium | — | pending |
| A11W-ISS-9 | Confirm privacy@agent-11.com actually delivers - it is the only contact on /terms and /privacy and its deliverability is unverified | ✅ Resolved 2026-07-27 — Confirmed by Jamie 2026-07-27: privacy@agent-11.com is a proven, deliverable address - no change needed to /terms, /privacy or the modal | medium | — | pending |
| A11W-ISS-8 | /pricing contradicts the rest of the site: funds 'maintain servers'/'server costs' (no such infra) and counts '11 agents + coordinator' (12) against 11-inclusive everywhere else | ✅ Resolved 2026-07-26 — Dropped the 'maintain servers'/'server costs' funding claims (no infrastructure exists) and corrected 'All 11 specialist agents + coordinator' (12) to 'All 11 specialists, coordinator included'; verified live | low | — | pending |
| A11W-ISS-7 | Site changelog lists versions and dates not in the framework CHANGELOG (e.g. v2.1.0) | ✅ Resolved 2026-07-26 — Changelog rebuilt from the framework CHANGELOG: 6 invented versions (2.3.0/2.2.0/2.1.0/2.0.3/1.5.2/1.5.0) removed, 3 real ones (1.2.0/1.1.0/1.0.0) restored; check-changelog.sh passes 5/0 with site matching upstream 11-for-11 | medium | — | pending |
| A11W-ISS-6 | Lead-magnet form promises an email that nothing sends | ✅ Resolved 2026-07-26 — Signup reframed as a release-updates list (no phantom kits, no 'check your inbox'); found the capture had NEVER recorded - fixed via static public/__forms.html, proven with 2 live submissions in Netlify Forms | medium | — | pending |
| A11W-ISS-5 | Canonical points at www.agent-11.com but the site serves on the apex (www 301s to it): AImpactScanner scores Canonical Tag Configuration 40/100 'cross-domain canonical' and Indexability 85/100; decide one host and align metadataBase, alternates.canonical, sitemap.ts, robots.ts and src/lib/seo.ts SITE_URL | ✅ Resolved 2026-07-25 — Apex is canonical everywhere (SITE_URL single source); AImpactScanner fresh scan ab2b4ec8 scores Canonical Tag Configuration 100/100 (was 40) and Indexability 100 (was 85), overall 79; check-canonical.sh 19/0 on production, seo-audit 0 fails | medium | — | pending |
| A11W-ISS-4 | Stale legal pages contradict the free/MIT model: /terms (Dec 2024) describes pay-per-mission billing and squad-size pricing — must say free and MIT, matching /pricing, /support and the repo LICENSE; /privacy (Dec 2024) omits Plausible and references accounts/payments that do not exist, and PrivacyModal.tsx names Google Analytics which the site does not load | ✅ Resolved 2026-07-25 — Rewrote /terms and /privacy to the free MIT reality (no billing, no accounts, Plausible + Netlify Forms, no cookies); corrected PrivacyModal, /license and the netlify.toml GA CSP; scripts/check-legal.sh passes 22/0 against production | medium | — | pending |
| A11W-ISS-3 | AI-visibility gaps on agent-11.com (scanner 65/100): no date metadata anywhere (Y.1.1 30), meta description 194 chars (trim to 150-160), no FAQPage schema despite FAQ-shaped content (AI.2.3 30), transparency 35, heading hierarchy 50, image alt text 50 | ✅ Resolved 2026-07-25 — AI-visibility re-score 65 -> 78/100 on MASTERY-AI v3.1.1 (fresh scan d8716d0f, 2026-07-25): date metadata 30->100, FAQ schema 30->100, image alt 50->100, transparency 35->75, meta description 194->159 chars 'optimal'; heading hierarchy still reported 50 but the page has exactly one valid H1 (scanner false negative, raised separately); seo-audit.sh 0 fails site-wide and on all 11 pages | low | — | pending |
| A11W-ISS-2 | llms.txt missing (404) on agent-11.com — high-value for the framework's AI/GitHub audience; add and date it | ✅ Resolved 2026-07-25 — Dated llms.txt live at agent-11.com/llms.txt (llmstxt.org format, all claims sourced to repo/site); scripts/check-llms.sh ships alongside and passes 29/29 against production | medium | — | pending |
| A11W-ISS-1 | No analytics on live site: neither Plausible nor GA loads on agent-11.com — add Plausible (PRJ-25 standard) + signup/install conversion goal | ✅ Resolved 2026-07-25 — Plausible live on agent-11.com (new-format script, CSP updated); Signup + Install Copy custom-event goals wired in code and registered; Plausible verification passed 2026-07-25 | medium | — | pending |

## Recently closed

| ID | Title | Status | Commit | Detail |
|----|-------|--------|--------|--------|
