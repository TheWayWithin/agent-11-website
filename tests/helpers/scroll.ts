import { expect } from '@playwright/test'
import type { Locator, Page } from '@playwright/test'

/**
 * Reveal a toggle-gated element: assert nothing covers the trigger, then
 * activate it from the keyboard.
 *
 * A11W-ISS-15. The issue title is wrong and should be read with that in mind:
 * it blames the hero's animated paragraph and metrics grid for overlapping the
 * CTA button. They do not overlap. Measured at a phone viewport, the paragraph
 * and the button are hundreds of pixels apart and `elementFromPoint` at the
 * button's centre returns the button.
 *
 * That does NOT mean the page is fine on a phone, and an earlier draft of this
 * comment wrongly said real users were never affected. A cold review found a
 * genuine horizontal overflow: on a 393px device the layout viewport inflates
 * to 941px, with 68 overflowing elements, the worst being the hero's
 * install-command span at scrollWidth 1042 against clientWidth 196.
 * `visualViewport` reads 393 while `window.innerWidth` reads 941, so the page
 * really does have two coordinate spaces in play, which is the most plausible
 * mechanism for a hit-test that computes a point in one and tests it in the
 * other. That is tracked separately as A11W-ISS-19 and is not fixed here.
 *
 * What went wrong was Playwright's coordinate hit-test, and two attempted
 * fixes failed before this one, both recorded here so nobody repeats them:
 *
 *  1. `click({ force: true })` — skips the hit-test entirely. It made the
 *     suite green while hiding exactly the condition the test should catch.
 *  2. Waiting for `window.scrollY` to stop before clicking, on the theory that
 *     `scroll-behavior: smooth` was racing the check. Insufficient, because
 *     `locator.click()` runs its own `scrollIntoViewIfNeeded` and re-scrolls
 *     after the wait. Emulating reduced motion made scrolling instant and the
 *     interception still happened, which ruled the smooth scroll out.
 *
 * Both removals were checked by falsification rather than assumed. Swapping
 * the keyboard press back for a plain `click()` makes the suite hang again on
 * Mobile Chrome, so the activation path is load-bearing. Dropping the
 * reduced-motion call changes nothing, so it was removed. Dropping the
 * `covered` assertion also keeps the suite green, which is expected: it is a
 * regression guard, not a currently-failing condition. Its teeth were proved
 * separately by covering the button with a positioned sibling, which makes it
 * fail as intended.
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
  // No reduced-motion emulation here, deliberately. An earlier version called
  // page.emulateMedia({reducedMotion:'reduce'}) on the theory that smooth
  // scrolling was the problem. Removing it and re-running leaves the suite
  // green, so it was doing nothing and is gone rather than left in to look
  // reassuring.
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
