#!/usr/bin/env node
/**
 * check-overflow.js — the site may not scroll sideways on a phone.
 *
 * A11W-ISS-19. On 2026-08-05 agent-11.com overflowed its viewport by 548px at
 * a 393px width: documentElement.clientWidth 393, scrollWidth 941. Every
 * mobile visitor could drag the whole page left and right. It was found only
 * because a Playwright hit-test kept failing in a way nobody could explain,
 * and it had been live for an unknown length of time because nothing checked.
 *
 * This asserts the property directly, at the widths that matter. It is a real
 * browser measurement rather than a CSS heuristic: only the layout engine
 * knows what actually overflows.
 *
 * Usage:
 *   node scripts/check-overflow.js                     # http://localhost:3000
 *   node scripts/check-overflow.js https://agent-11.com
 *
 * Exits 0 and silent when every width is clean, 1 with detail otherwise.
 */

const { chromium } = require('@playwright/test')

const BASE = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '')
const WIDTHS = [320, 375, 393, 768]

// Routes are DISCOVERED, never listed. The first version of this script hardcoded
// ['/', '/features', '/documentation', '/pricing'] and exited 0 while /about
// overflowed by 20px and /portfolio by 16px at 320px. Both are one click from the
// homepage nav. A checklist silently becomes a lie the moment someone adds a page,
// and a green check on a broken site is worse than no check, because it is trusted.
// So: crawl every internal link reachable from the homepage and test all of them.
const SEEDS = ['/']
async function discoverRoutes(page) {
  const seen = new Set(SEEDS)
  const queue = [...SEEDS]
  while (queue.length) {
    const route = queue.shift()
    try {
      await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 30000 })
    } catch { continue }
    const hrefs = await page.evaluate(() => [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')))
    for (const h of hrefs) {
      if (!h || !h.startsWith('/') || h.startsWith('//')) continue   // external or protocol-relative
      const clean = h.split('#')[0].split('?')[0].replace(/\/$/, '') || '/'
      if (/\.(png|jpe?g|svg|webp|ico|xml|txt|pdf|json)$/i.test(clean)) continue
      if (!seen.has(clean)) { seen.add(clean); queue.push(clean) }
    }
  }
  return [...seen].sort()
}
// One pixel of slack: sub-pixel rounding on scaled layouts is not a defect.
const TOLERANCE = 1

async function main() {
  const browser = await chromium.launch()
  const failures = []

  try {
    const discovery = await browser.newContext({ viewport: { width: 1280, height: 800 } })
    const ROUTES = await discoverRoutes(await discovery.newPage())
    await discovery.close()
    // Printed on every run, pass or fail. Coverage you cannot see is coverage you
    // cannot trust: this is the number that would have exposed the missing routes.
    console.error(`check-overflow: ${ROUTES.length} route(s) x ${WIDTHS.length} width(s) — ${ROUTES.join(' ')}`)

    for (const width of WIDTHS) {
      const context = await browser.newContext({ viewport: { width, height: 800 } })
      const page = await context.newPage()

      for (const route of ROUTES) {
        const res = await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 60000 })
        if (!res || !res.ok()) {
          failures.push(`${route} at ${width}px returned ${res ? res.status() : 'no response'}`)
          continue
        }

        // Settle before measuring. `networkidle` says the network went quiet, not
        // that layout finished: webfonts may still be swapping and entry
        // animations still running, and both move widths. On 2026-08-05 a cold
        // run reported 42px of overflow on a page that measured 0 on the next
        // fifteen attempts, which is a gate nobody would trust for long.
        await page.evaluate(() => document.fonts.ready)
        await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))

        const measure = () => page.evaluate((tol) => {
          const de = document.documentElement
          const limit = de.clientWidth
          const over = de.scrollWidth - limit
          if (over <= tol) return { over, limit, scrollWidth: de.scrollWidth, offenders: [] }

          // Name the culprits so a failure is actionable rather than just
          // "something overflows". Two exclusions, both deliberate:
          // an element wider than the viewport INSIDE a scroll container is
          // contained and scrolls on its own (the terminal boxes are meant to),
          // and a large scrollWidth whose right edge is within bounds is not
          // what drags the page. Reporting either sent the first pass chasing a
          // truncated span that was already contained.
          const inScroller = (el) => {
            for (let a = el.parentElement; a && a !== de; a = a.parentElement) {
              const ox = getComputedStyle(a).overflowX
              if (ox === 'auto' || ox === 'scroll' || ox === 'hidden') return true
            }
            return false
          }
          const offenders = []
          document.querySelectorAll('body *').forEach((el) => {
            const r = el.getBoundingClientRect()
            if (r.right <= limit + tol && r.left >= -tol) return
            if (inScroller(el)) return
            offenders.push({
              sel: el.tagName.toLowerCase() +
                (el.className ? '.' + String(el.className).split(/\s+/).slice(0, 3).join('.') : ''),
              scrollWidth: el.scrollWidth,
              left: Math.round(r.left),
              right: Math.round(r.right),
            })
          })
          offenders.sort((a, b) => b.right - a.right)
          return { over, limit, scrollWidth: de.scrollWidth, offenders: offenders.slice(0, 5) }
        }, TOLERANCE)

        let report = await measure()
        if (report.over > TOLERANCE) {
          // Confirm it persists. A single frame of overflow during load is not
          // what this guards; a page a visitor can drag sideways is. Failing on
          // one sample made this report a 42px overflow that never recurred.
          await page.waitForTimeout(750)
          const again = await measure()
          if (again.over <= TOLERANCE) {
            console.error(
              `  note  ${route} at ${width}px overflowed by ${report.over}px during load ` +
              `and settled to ${again.over}px. Not failed, but worth a look.`)
          }
          report = again
        }

        if (report.over > TOLERANCE) {
          failures.push(
            `${route} at ${width}px overflows by ${report.over}px ` +
            `(clientWidth ${report.limit}, scrollWidth ${report.scrollWidth})\n` +
            (report.offenders.length
              ? report.offenders.map(o =>
                  `      ${o.sel}  left=${o.left} right=${o.right} scrollWidth=${o.scrollWidth}`).join('\n')
              : '      no un-contained offender found: suspect a margin, a transform, or a scroll container')
          )
        }
      }

      await context.close()
    }
  } finally {
    await browser.close()
  }

  if (failures.length) {
    console.error('Horizontal overflow (A11W-ISS-19):\n')
    failures.forEach(f => console.error('  FAIL  ' + f + '\n'))
    process.exit(1)
  }
  process.exit(0)
}

main().catch((err) => {
  console.error('check-overflow could not run:', err.message)
  process.exit(1)
})
