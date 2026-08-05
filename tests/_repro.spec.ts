import { test } from '@playwright/test'

const WIDTHS = [320, 375, 393, 768]

test('interceptor after the scroll has settled', async ({ page }) => {
  for (const w of WIDTHS) {
    await page.setViewportSize({ width: w, height: 800 })
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    const report = await page.evaluate(async () => {
      const btns = Array.from(document.querySelectorAll('button'))
      const btn = btns.find(b => /Get release updates/i.test(b.textContent || ''))
      if (!btn) return { error: 'button not found' }

      btn.scrollIntoView({ block: 'center' })
      // Wait until scrollY stops changing, i.e. the smooth scroll has finished.
      let last = -1, settledFrames = 0, ticks = 0
      while (settledFrames < 5 && ticks < 300) {
        await new Promise(r => requestAnimationFrame(() => r(null)))
        ticks++
        if (window.scrollY === last) settledFrames++
        else { settledFrames = 0; last = window.scrollY }
      }

      const r = btn.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const top = document.elementFromPoint(cx, cy) as HTMLElement | null
      return {
        ticksToSettle: ticks,
        buttonRect: { y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        topTag: top ? top.tagName : null,
        topCls: top ? (top.className || '').toString().slice(0, 90) : null,
        isButtonOrChild: top ? (top === btn || btn.contains(top)) : false,
      }
    })
    console.log(`SETTLED ${w}px ` + JSON.stringify(report))
  }
})
