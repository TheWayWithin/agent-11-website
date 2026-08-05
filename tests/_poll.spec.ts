import { test } from '@playwright/test'

/** TEMPORARY diagnostic, deleted before this branch finishes. */
test('poll the click point over time', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('http://localhost:3000')
  await page.waitForLoadState('networkidle')

  const trigger = page.getByRole('button', { name: /Get release updates/i })
  await trigger.scrollIntoViewIfNeeded()

  for (let i = 0; i < 8; i++) {
    const s = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button'))
        .find(b => /Get release updates/i.test(b.textContent || ''))!
      const b = btn.getBoundingClientRect()
      // Playwright clips the element rect to the viewport and clicks the
      // centre of the visible part. Replicate that.
      const vw = window.innerWidth, vh = window.innerHeight
      const left = Math.max(b.left, 0), right = Math.min(b.right, vw)
      const top = Math.max(b.top, 0), bottom = Math.min(b.bottom, vh)
      const cx = (left + right) / 2, cy = (top + bottom) / 2
      const el = document.elementFromPoint(cx, cy) as HTMLElement | null
      return {
        vw, vh,
        scrollY: Math.round(window.scrollY),
        docH: document.documentElement.scrollHeight,
        btnTop: Math.round(b.top), btnBottom: Math.round(b.bottom),
        cx: Math.round(cx), cy: Math.round(cy),
        at: el ? `${el.tagName}.${(el.className || '').toString().split(' ')[0]}` : null,
      }
    })
    console.log(`POLL ${i} ${JSON.stringify(s)}`)
    await page.waitForTimeout(400)
  }
})
