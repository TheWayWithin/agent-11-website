import type { Locator, Page } from '@playwright/test'

/**
 * Scroll a target into view and wait for the page to actually stop moving.
 *
 * Why this exists (A11W-ISS-15). `src/app/globals.css` sets
 * `scroll-behavior: smooth` on `html`. Playwright's actionability check
 * scrolls an element into view and then immediately asks two questions:
 * is the element stable (same box across consecutive frames), and is it the
 * topmost thing at its own centre point. During an eased scroll the answer to
 * both is no — the box moves every frame, and `elementFromPoint` returns
 * whatever happens to be passing that coordinate right then. That is why the
 * hero button appeared to be "covered", by a different element each time it
 * was reported: the paragraph, then the install block, then the metrics grid,
 * in the order the page slid past them.
 *
 * Nothing is actually on top of the button. Once the scroll settles it is the
 * topmost element at its own centre at 320, 375, 393 and 768px, so real users
 * are unaffected — they scroll, it stops, they tap.
 *
 * The fix belongs here rather than in the CSS: smooth scrolling is a
 * deliberate choice for people using the site, and weakening it to suit a test
 * runner would be the wrong way round. Waiting for the scroll to finish keeps
 * the full hit-test — unlike `click({ force: true })`, which skips it and
 * would hide a genuine overlap if one ever appeared.
 */
export async function scrollToSettled(page: Page, target: Locator): Promise<void> {
  await target.scrollIntoViewIfNeeded()

  await page.waitForFunction(
    () => {
      const w = window as unknown as { __lastY?: number; __stillFor?: number }
      const y = window.scrollY
      if (w.__lastY === y) {
        w.__stillFor = (w.__stillFor ?? 0) + 1
      } else {
        w.__lastY = y
        w.__stillFor = 0
      }
      // Five consecutive equal frames: an eased scroll is definitely over,
      // and we have not simply sampled twice during a slow stretch of it.
      return (w.__stillFor ?? 0) >= 5
    },
    undefined,
    { polling: 'raf', timeout: 10_000 }
  )

  await page.evaluate(() => {
    const w = window as unknown as { __lastY?: number; __stillFor?: number }
    delete w.__lastY
    delete w.__stillFor
  })
}
