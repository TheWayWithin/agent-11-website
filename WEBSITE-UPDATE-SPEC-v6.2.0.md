# Website Update Spec — bring agent-11.com in line with v6.2.0

**Repo**: `agent-11-website` (Next.js, deploys to agent-11.com via Netlify)
**Driver**: agent-11 framework is at **v6.2.0** (Loop Discipline & Read-Only Verification); the site is mostly pinned to a v2.x-era product.
**Author**: prepared 2026-06-20 from a full read-only audit of all 13 pages + 11 homepage sections.
**Status**: spec ready for execution. Build clean (`npm run build`) and get Jamie's OK before deploy (deploy is live to agent-11.com).

---

## The core problem

Only two surfaces (the homepage Hero and the changelog page) reflect v6.2.0. Everything else describes an older, partly fictional product. The audit found three classes of issue, in priority order:

1. **Integrity (P0)** — claims that are false and must go. Invented pricing, fabricated people and metrics, a hosted-SaaS architecture that does not exist, security overclaims, and unattended-autonomy claims. These directly violate the truth-over-hype principle and some are legally/representationally risky (HIPAA/SOC2/GDPR "compliant: true").
2. **Accuracy (P1)** — facts that are simply wrong: mission counts (site says 11 / 17 / 18 / 20; reality is 13), agent count (one "12 Agents" slip; reality is 11), nonexistent missions, stale commands and config, stale install command.
3. **Freshness (P2)** — the v6.0/v6.2 story is missing nearly everywhere: read-only quality gates, default-fail verification, the ratchet optimiser, the code-review loop, the phase-gated meta-loop, native MCP tool-search, the Karpathy constitution.

## Guiding principles (apply to every edit)

- **Truth over hype.** If a number, person, or testimonial is not real, remove it. Do not replace one invented figure with a nicer invented figure. Where a real number exists (GitHub stars, etc.), pull it live or cite it honestly; otherwise drop the stat.
- **Honest autonomy posture.** v6.2.0's whole thesis is a trustworthy judge plus watched-first, human-merged loops. Remove "30+ hours autonomous", "24/7", "install once execute unlimited". Reframe as: diligent, safe iteration you stay in control of.
- **One canonical number per fact.** Pick the value from the Canonical Facts table below and use it everywhere. No page should disagree with another.
- **Free and open source (MIT) is real** — verified against the repo LICENSE (MIT, Copyright 2025 Jamie Watters). Keep those claims; they are correct.

---

## Canonical Facts (single source of truth — use these everywhere)

| Fact | Correct value |
|------|---------------|
| Current version | **v6.2.0** — "Loop Discipline & Read-Only Verification" (tag `v6.2.0-loop-discipline`) |
| Specialist agents | **11** (coordinator, strategist, architect, developer, designer, tester, documenter, operator, analyst, marketer, support) |
| Missions via `/coord` | **13** (build, mvp, dev-setup, dev-alignment, integrate, migrate, fix, refactor, optimize, document, release, deploy, security) in 3 modes (greenfield, surgical, maintenance) |
| Control commands | `/coord continue`, `/coord complete phase N`, `/coord vision-check` |
| Slash commands (deployed) | ~13 (coord, recon, design-review, report, pmd, meeting, dailyreport, planarchive, plan, foundations, architect, bootstrap, skills) — not "6" |
| Skills | 7 SaaS skills + the new `code-review-loop` skill (8 total) |
| Field Manual | **32 guides, ~14,400 lines** (the "1,370" figure is only the Architecture SOP; "3,000+"/"2,000+" are wrong) |
| Templates | 26 |
| Install (fresh) | `bash <(curl -fsSL https://raw.githubusercontent.com/TheWayWithin/agent-11/main/project/deployment/scripts/secure-install.sh)` |
| Upgrade (v5→v6) | `bash <(curl -sSL https://raw.githubusercontent.com/TheWayWithin/agent-11/main/project/deployment/scripts/install.sh) --upgrade` |
| Squad model | Install **always deploys all 11** agents (lazy-loaded). The minimal/core/full 2/4/11 selection is retired — remove it. |
| License | MIT (free forever, no paid tiers, no per-mission cost, no trial) |
| Architecture | File-based agents installed locally into `.claude/` and run inside **Claude Code**. No hosted API, no API keys, no server-side encryption, no message bus, no plugin marketplace, no standalone VS Code extension. |
| v6.2.0 headline features | read-only quality gates; default-fail (evidence-gated) verification; Bash gate-guard hook; ratchet `mission-optimize` (worktree, keep-or-revert, logged, capped, never auto-merged); `code-review-loop` skill; phase-gated meta-loop in `/coord continue` |
| v6.0 foundation | lean 78-line `library/CLAUDE.md`; 3-file context tracking (agent-context.md, project-plan.md, evidence-repository.md); native MCP tool-search (`ENABLE_TOOL_SEARCH=auto`); Karpathy constitution; quality-gate hooks; bulk-ops toolkit |

---

## P0 — Integrity fixes (do first; these are false claims)

### 1. Remove invented pricing / billing (free/OSS product)
- **`/support`** `page.tsx`: delete the "How much do missions cost?" answer (FIX $50-200, BUILD $200-500, MVP $800-2000, "you only pay for executed missions") and the "billing questions" support line. AGENT-11 is free; there is no per-mission cost.
- **`SolutionDemo.tsx`**: remove "Free 7-day trial", "View Pricing", "Cancel anytime", "No credit card required" SaaS-trial framing. Replace CTA with the free install / GitHub.

### 2. Remove fabricated people and testimonials
- **`ProofOfSpeed.tsx`**: remove the "Sarah K., Indie Hacker" testimonial (fabricated).
- **`/blog`** `page.tsx`: the six posts have fabricated bylines (Sarah Chen, Dr. Alex Rodriguez, Mike Thompson, Jessica Park, David Kim). See P2 blog decision — at minimum remove the fake authors.

### 3. Remove or make-real the fabricated metrics
- The number **"2,847"** is a hardcoded fallback reused four ways: `SocialProof.tsx` (stars), `SolutionDemo.tsx` ("2,847+ developers"), `GetStarted.tsx` ("2,847 developers shipped faster this week"), `HeroVariations.tsx` ("Join 2,847+ developers"). Pick one path: pull **live GitHub stars** via the API, or remove the stat. Do not hardcode it.
- **`SocialProof.tsx`**: `contributors: '156'`, `discordMembers: '2,400+'` — real or remove.
- **`/discord`**: "4,847 Active Members", "1,200+ Daily Messages", "847 Missions Shared" — real or remove. (Also: "Join Discord Server" buttons have no `href` — fix or remove.)
- **`/support`** "4,800+ developers", **`/blog`** "2,847+ developers" newsletter — reconcile to one real number or drop.

### 4. Rewrite `TechnicalConfidence.tsx` to the real architecture
This section describes a hosted SaaS that does not exist. Remove/replace all of:
- `github-action@v1` + `AGENT_11_API_KEY` (no hosted API or key)
- "end-to-end encryption with rotating keys", "AES-256-GCM", "keyRotation: 24h", "Zero Data Retention on our servers", "only metadata crosses network boundaries" (no AGENT-11 servers)
- `compliance: { gdpr: true, hipaa: true, soc2: true }` (no certifications — remove entirely; these are serious unverified claims)
- "Plugin System", "Agent Marketplace", "community plugins" (not a thing; there are skills + bulk-ops)
- "VS Code extension with intelligent code completion" (runs inside Claude Code, not a VS Code extension)
- message bus / `AgentMessage` / `AgentCoordinator` distributed-system framing
Replace with the **real** technical story: file-based agents in `.claude/`, runs inside Claude Code, lean context model, read-only quality gates + Bash gate-guard, native MCP tool-search, MIT/local/no-data-retention-because-there-are-no-servers (state it honestly: your code and context go to Claude/Anthropic as with any Claude Code use).

### 5. Fix the `/support` security overclaim
- "No code is sent to external servers. All operations are sandboxed and logged" is false for a Claude Code framework. Correct it: code and context are processed by Claude (Anthropic) like any Claude Code session; agents and your files live locally in your repo. Do not claim a sandbox that does not exist.

### 6. Remove unattended-autonomy overclaims (honest posture)
- **`Hero.tsx`**: metrics bar "30+ Hour Operation" (remove or reframe), "Install once, execute unlimited missions" (reframe).
- **`/features`** `page.tsx`: three "30+ hours of autonomous operation" claims (lines ~849, ~927-928, ~989-990).
- **`HeroVariations.tsx`**: "24/7 availability".
- Replace with watched-first framing: e.g. "long multi-phase missions with context preserved across sessions — you stay the judge at each gate."

---

## P1 — Accuracy fixes (wrong facts)

### Mission count → 13 everywhere
- **`/features`** `page.tsx`: heading "17 Proven Missions" and the 18-entry `missions[]` array. Trim to the real 13; remove nonexistent missions **architecture, product-description, genesis, library**; ensure **dev-setup** and **dev-alignment** are present.
- **`/features`** `layout.tsx`: metadata "17 Mission Types" / "17 specialized mission types" / "MVP to SCALE" (no SCALE mission). → 13, fix copy.
- **`/documentation`**: "all 11 available missions" → 13; add the missing **dev-setup, dev-alignment** and the control commands.
- **`/pricing`**: "17 mission types (build, deploy, fix, refactor, test)" → 13.
- **`/portfolio`**: "17 pre-built missions" → 13.
- **`GetStartedGuide.tsx`**: "20 mission types" (twice) → 13.

### Agent count → 11
- **`GetStarted.tsx`**: "Full Squad ... 12 Agents" → 11 (the listed members already total 11; the header is wrong).

### Retire the squad-size selection model
- **`/documentation`**, **`/support`**, **`GetStarted.tsx`**, **`/blog`**: remove "Minimal (2) / Core (4) / Full (11)" and `bash -s minimal|core|full`. Install always deploys all 11. Update install commands to the canonical fresh-install one-liner (secure-install.sh).

### Fix stale commands / config / install in `/documentation`
- Remove `/coord status` (not a command), `agent11 upgrade full` (not real — use `install.sh --upgrade`), `.agent11/config.yaml`, env vars `AGENT11_SQUAD_SIZE|LOG_LEVEL|AUTO_APPROVE`, `.agent11/missions/custom-deploy.yaml`, `.agent11/context.md` (real file is `agent-context.md`), "PowerShell coming in v2.1", "v2.1" references.
- Install command: switch to canonical (`secure-install.sh` fresh; `install.sh --upgrade` for v5→v6). Reconcile the "installs Core squad (4 agents)" caption with the real always-11 behaviour.
- Slash-command count "6" → ~13 (see Canonical Facts).

### Fix `/changelog` roadmap self-contradiction
- The "What's Coming Next" block still lists **v6.2 as "In planning"** with the wrong content ("auto-detect v5 markers"). v6.2.0 is already the top released entry. Remove v6.2 from the roadmap; either drop the roadmap or repopulate with genuine future candidates (e.g. harness-measured loop cost to tune the meta-loop error budget; fleet rollout). Note: the v6.2.0 entry itself is correct.
- Minor: "bulk-ops toolkit" is listed under v6.2.0 Added; it was unreleased before and shipped with v6.2.0, so this is defensible — leave unless Jamie prefers attributing it to v6.0.

### Reconcile Field Manual size
- Pick the canonical number: **32 guides / ~14,400 lines**. Fix "3,000+ lines" (`/pricing`), "1,370-line" (`/portfolio`, refers only to the Architecture SOP), "2,000+ lines" (`CaseStudy.tsx`), and the "22 Comprehensive Guides" (`/documentation`).

### Stale copyright
- **`GetStarted.tsx`** "© 2025 AGENT-11" → 2026 (and audit other footers).

---

## P2 — Freshness (add the v6.2.0 story)

Add the v6.2.0 / v6.0 feature set (Canonical Facts) to the surfaces that sell the product. Lead every feature framing with the trust line: **your agents cannot game their own success criteria.**

- **`/features`** `page.tsx`: replace the "Phase 1 & 2 Modernization" legacy framing; add a Loop Discipline section (read-only gates, default-fail verification, ratchet optimise, code-review-loop, phase-gated meta-loop, Bash gate-guard). Fix the "5 thinking modes" vs "3" internal contradiction and the "8 pre-integrated services" vs native-tool-search contradiction.
- **`/documentation`**: document the 13 missions, the 3 control commands, and a v6.2 "how a mission completes" flow that includes read-only gates + evidence-gated verification.
- **`/pricing`** and **`/portfolio`**: refresh the free-tier / capability lists from the Canonical Facts (currently v2.x-era).
- **Homepage sections** `SolutionDemo`, `WorkflowDemo`, `CaseStudy`, `SocialProof`: weave in at least the read-only-gates + ratchet + review-loop story; CaseStudy and WorkflowDemo are natural homes. (These are pinned to the original pre-v6 dogfooding milestone.)
- **`/about`**: clean (evergreen) — version line optional, low priority.
- **`HeroVariations.tsx`**: dormant (not imported by `page.tsx`). Either update for future A/B use or delete. Low priority.

---

## Decisions needed from Jamie (cannot be invented — truth over hype)

1. **Social-proof numbers** (GitHub stars, contributors, Discord members, "developers using"): pull live (GitHub API for stars/contributors) or remove the stats entirely? Default recommendation: pull live where an API exists, remove the rest.
2. **Blog**: 6 posts, ~18 months stale, fabricated authors. Delete the blog, hide the nav link, or rewrite with real posts? Default: hide until there is real content.
3. **Testimonials** (Sarah K. etc.): remove (no real testimonials yet) or hold a slot for real ones? Default: remove.
4. **Performance metrics** (87.5% rework, 37.5%/39% faster, 98% success, 10x, 95% fewer bugs): which are defensible/sourced vs marketing estimates to drop or soften? Jamie to confirm what is real. Default: keep only what traces to the dogfooding case study, soften the rest.
5. **Field Manual framing**: "32 guides / 14,400 lines" or a rounder honest number?

## Progress log

- **2026-06-20 — P0 integrity DEPLOYED** (commit `c25d9cf`): invented pricing/billing, fake testimonial, fabricated stats, SaaS fiction (TechnicalConfidence), security overclaim, and autonomy overclaims all removed.
- **2026-06-20 — P1 accuracy DEPLOYED** (commit `016ba31`): 13 missions, 11 agents, canonical install, retired squad-size model, fake commands/config removed, Field Manual size, v6.2 metadata, copyright 2026, residual "2,847" removed (EmailCapture + blog).
- **2026-06-20 — P2 freshness IN PROGRESS**: v6.2 Loop Discipline story added to selling pages; blog de-promoted from nav.
- **README** repositioned to V&M 4.2 and pushed in the agent-11 repo (commit `6304e30`).

## Remaining stale items & plan (the "/blog and friends" list)

These are tracked, not yet fully resolved. Each needs either a quick action or a Jamie decision.

| Item | State | Plan / decision needed |
|------|-------|------------------------|
| **/blog** | ✅ RESOLVED 2026-06-20. Route DELETED (`src/app/blog/` removed) + sitemap entry removed + footer link removed. | Jamie's decision: the website /blog was a marketing page with fabricated authors, not his `/blog` Claude Code command and not his real blog (jamiewatters.work). Removed entirely. Reintroduce only with real content. |
| **/discord** | ✅ RESOLVED 2026-06-20. Route DELETED (`src/app/discord/` removed) + sitemap entry removed + all links/CTAs/stats being stripped across the site. | Jamie's decision: he does not use Discord and no community exists. The whole page and every reference removed. |
| **HeroVariations.tsx** | Dormant (NOT imported by page.tsx, not rendered). Still contains "2,847", old install command, "24/7 availability". | Low priority because it is not live. **Plan:** update it to match Hero.tsx for future A/B use, or delete the file. Recommended: delete unless A/B testing is imminent. |
| **sitemap.ts** | Stale comment "v2.3.0 release date" + lastModified `2025-06-01`. | Minor SEO. **Plan:** refresh lastModified dates. |
| **Performance metrics** (87.5% rework, 39% faster, 98% success, 10x, 95% fewer bugs, $/feature, weeks-vs-months) | ✅ POLICY SET 2026-06-20, sweep in progress. | Jamie's decision: he has NO hard metrics comparing AGENT-11 to other approaches. Remove all unsourced comparison/success numbers. Keep only genuine, observable facts (MIT/free, 11 agents, 13 missions, install-in-seconds, 100% file persistence, "AGENT-11 built AGENT-11", v6.2 features). Replace headline speed claims with the honest qualitative line: "orders of magnitude faster in my own builds; no published benchmark, the code is open so you can judge for yourself." |

## Out of scope

- No framework changes (this is website-only).
- Legal pages (privacy/terms/license) — factual content unchanged unless a number above appears there.

## Suggested execution

Phase 1: P0 integrity fixes (fastest credibility win, removes the risky/false claims).
Phase 2: P1 accuracy (counts, commands, install, squad model, copyright).
Phase 3: P2 freshness (the v6.2.0 feature story across selling pages).
Each phase: `npm run build` to verify, then deploy on Jamie's confirmation (Netlify auto-deploys on push to main).
