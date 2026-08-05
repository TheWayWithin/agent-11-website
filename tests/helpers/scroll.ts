import { expect } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'

/**
 * Scroll a trigger into view and assert nothing is covering it.
 *
 * History, because it took three wrong answers to get to the right one and
 * the wrong ones are instructive.
 *
 * A11W-ISS-15 reported that the hero's animated paragraph and metrics grid
 * overlapped the CTA button and swallowed its clicks. They never overlapped:
 * measured at phone width they sit hundreds of pixels apart, and
 * `elementFromPoint` at the button's centre returns the button.
 *
 * Attempted fixes, all rejected:
 *   1. `click({ force: true })` — skipped the hit-test, so it went green while
 *      silencing the very condition worth checking.
 *   2. Waiting for `window.scrollY` to settle, on the theory that
 *      `scroll-behavior: smooth` was racing the check. Useless, because
 *      `click()` re-scrolls internally as part of actionability.
 *   3. Emulating reduced motion so scrolling was instant. The interception
 *      still happened, which killed the smooth-scroll theory outright.
 *   4. Pressing the button from the keyboard instead of clicking it. That
 *      worked, but it dodged the question rather than answering it.
 *
 * The actual cause was A11W-ISS-19: the page overflowed horizontally, 941px
 * wide inside a 393px viewport. Under device emulation that inflated the
 * layout viewport while `visualViewport` stayed correct, so Playwright
 * computed a click point in one coordinate space and the browser hit-tested it
 * in another. Nothing was ever on top of the button; the coordinates simply
 * disagreed. Fixing the overflow made an ordinary `click()` pass on all five
 * projects, so the keyboard workaround is gone and real pointer hit-testing is
 * back.
 *
 * What remains here is the assertion that should have existed from the start:
 * that nothing covers the trigger. It is a regression guard, so the suite
 * stays green if it is removed — its teeth were proved separately by covering
 * the button with a positioned sibling, which makes it fail as intended.
 */
export async function scrollToSettled(page: Page, target: Locator): Promise<void> {
  await target.scrollIntoViewIfNeeded()
  await expect(target).toBeVisible()
  await expect(target).toBeEnabled()

  const covered = await target.evaluate((el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2)
    if (!top) return 'nothing at the click point (element off-screen?)'
    if (top === el || el.contains(top) || top.contains(el)) return null
    return `${top.tagName}.${(top.className || '').toString().split(' ').slice(0, 3).join('.')}`
  })
  expect(covered, `something is covering the trigger: ${covered}`).toBeNull()
}
