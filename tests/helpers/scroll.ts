import { expect } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'

/**
 * Reveal a toggle-gated element: assert nothing covers the trigger, then
 * activate it from the keyboard.
 *
 * A11W-ISS-15. The issue title is wrong and should be read with that in mind:
 * it blames the hero's animated paragraph and metrics grid for overlapping the
 * CTA button. They do not overlap. Measured on this page, the paragraph
 * occupies y 538-762 and the button y 1572-1622, and `elementFromPoint` at the
 * button's centre returns the button. Nothing sits on top of it and real users
 * were never blocked.
 *
 * What went wrong was Playwright's coordinate hit-test, and two attempted
 * fixes failed before this one, both recorded here so nobody repeats them:
 *
 *  1. `click({ force: true })` — skips the hit-test entirely. It made the
 *     suite green while hiding exactly the condition the test should catch.
 *  2. Waiting for `window.scrollY` to stop before clicking. Insufficient,
 *     because `locator.click()` runs its own `scrollIntoViewIfNeeded` as part
 *     of actionability and re-scrolls after the wait. Emulating reduced
 *     motion (the site honours `prefers-reduced-motion`, which sets
 *     `scroll-behavior: auto`) made scrolling instant and the interception
 *     still happened, which is what ruled the smooth scroll out as the cause.
 *
 * On the emulated Pixel 5 the click point stays contested regardless: the
 * reported interceptor alternates between elements 600-800px above the button,
 * on a document 33,000px tall. Rather than force past the check or keep timing
 * it, this splits the two things the click was conflating:
 *
 *  - "is anything covering the button?" is asserted directly, with
 *    `elementFromPoint` at the button's own centre. This is the real question,
 *    and it is the one `force: true` would have silenced.
 *  - "does activating it reveal the form?" is done with a keyboard press on
 *    the focused button, which is a genuine user interaction, is what a
 *    keyboard or screen-reader user does, and does not depend on hit-testing
 *    a coordinate.
 *
 * The result is a stronger test than the original, not a weaker one: it now
 * proves the button is uncovered AND keyboard-operable.
 */
export async function scrollToSettled(page: Page, target: Locator): Promise<void> {
  // The site honours prefers-reduced-motion, so this makes scrolling instant
  // and removes one source of timing noise even though it is not the cause.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await target.scrollIntoViewIfNeeded()
  await expect(target).toBeVisible()
  await expect(target).toBeEnabled()

  // The assertion force:true would have hidden: nothing is on top of it.
  const covered = await target.evaluate((el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)
    if (!top) return 'nothing at the click point (element off-screen?)'
    if (top === el || el.contains(top) || top.contains(el)) return null
    return `${top.tagName}.${(top.className || '').toString().split(' ').slice(0, 3).join('.')}`
  })
  expect(covered, `something is covering the trigger: ${covered}`).toBeNull()
}

/**
 * Activate a trigger from the keyboard. Real interaction, no coordinates.
 */
export async function activate(target: Locator): Promise<void> {
  await target.focus()
  await expect(target).toBeFocused()
  await target.press('Enter')
}
