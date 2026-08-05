import { test, expect } from '@playwright/test'
import { scrollToSettled } from './helpers/scroll'

/**
 * Email capture — integration tests.
 *
 * Rewritten 2026-08-04. This suite previously asserted a lead-magnet funnel:
 * a "Quick Start Kit + Templates" download, an "Advanced Examples" gate, a
 * "Maximize Your Agent Performance" guide, and a "Used by 2,847+ developers"
 * social-proof line. All of that was removed in July 2026 (A11W-ISS-6 and
 * A11W-ISS-8) because none of it existed: there was no kit to download and
 * the developer count was invented. The tests were never updated, so 70 of
 * them failed continuously and the suite stopped being a signal — which is
 * part of why the site drifted out of step with the framework unnoticed.
 *
 * What the site actually has is one form, `release-updates`, rendered by
 * EmailCapture in two places on the homepage. It promises release notes and
 * nothing else. These tests assert that, and they should be updated whenever
 * the copy changes rather than left to rot again.
 */

const HOME = 'http://localhost:3000'

/**
 * The hero form sits behind a toggle roughly 1,600px down the homepage. On the
 * emulated phones the button's y position keeps moving while the sections
 * below it finish laying out, and Playwright refuses to click an element that
 * is still moving — so a plain .click() times out waiting for stability.
 * Scrolling to it and letting the layout settle first makes this deterministic
 * on every project rather than just the desktop ones.
 */
async function openHeroForm(page: import('@playwright/test').Page) {
  const trigger = page.getByRole('button', { name: /Get release updates/i })
  // The page scrolls smoothly, so wait for it to stop before clicking; see
  // scrollToSettled. This is an ordinary click with the hit-test intact.
  await scrollToSettled(page, trigger)
  await expect(trigger).toBeVisible()
  await expect(trigger).toBeEnabled()
  await trigger.click()
  await page.locator('form[name="release-updates"]').first().waitFor({ state: 'visible' })
}

// The two homepage instances, with the copy each one is given.
const HERO = {
  title: 'Get AGENT-11 release updates',
  trigger: 'Get release updates',
}
const SOLUTION_DEMO = {
  title: 'Follow the build',
}

test.describe('Email capture', () => {
  test('Hero form appears on request and validates', async ({ page }) => {
    await page.goto(HOME)
    await page.waitForLoadState('networkidle')

    // The hero form is behind a toggle, so it should not be there yet.
    await expect(page.getByRole('heading', { name: HERO.title })).toHaveCount(0)

    await openHeroForm(page)

    const form = page.locator('form[name="release-updates"]').first()
    await expect(form).toBeVisible()
    await expect(page.getByRole('heading', { name: HERO.title })).toBeVisible()

    const email = form.locator('input[type="email"]')
    await expect(form.locator('button[type="submit"]')).toBeVisible()

    // The input carries `required` and `type="email"`, so the browser's own
    // constraint validation refuses an empty or malformed address before the
    // component's JS validation can run. That native layer is what a user
    // actually meets, so it is what this asserts. (The component's "Email is
    // required" / "Please enter a valid address" strings are only reachable
    // if that `required` attribute is ever removed.)
    const validity = (locator: typeof email) =>
      locator.evaluate((el: HTMLInputElement) => el.checkValidity())

    await expect(email).toHaveAttribute('required', '')
    expect(await validity(email)).toBe(false)

    await email.fill('not-an-email')
    expect(await validity(email)).toBe(false)

    await email.fill('test@example.com')
    expect(await validity(email)).toBe(true)
  })

  test('SolutionDemo form is present without a toggle', async ({ page }) => {
    await page.goto(HOME)
    await page.waitForLoadState('networkidle')

    await page.locator('#solution-demo').scrollIntoViewIfNeeded()

    await expect(page.getByRole('heading', { name: SOLUTION_DEMO.title })).toBeVisible()
    const form = page
      .locator('#solution-demo')
      .locator('form[name="release-updates"]')
    await expect(form).toBeVisible()
    await expect(form.locator('input[type="email"]')).toBeVisible()
  })

  test('Netlify wiring is intact on every form', async ({ page }) => {
    await page.goto(HOME)
    await page.waitForLoadState('networkidle')
    await openHeroForm(page)

    const forms = page.locator('form[name="release-updates"]')
    const count = await forms.count()
    expect(count).toBeGreaterThanOrEqual(2)

    for (let i = 0; i < count; i++) {
      const form = forms.nth(i)
      // Without these three, Netlify silently drops the submission.
      await expect(form).toHaveAttribute('data-netlify', 'true')
      await expect(form.locator('input[name="form-name"]')).toHaveAttribute(
        'value',
        'release-updates'
      )
      await expect(form.locator('input[name="bot-field"]')).toHaveCount(1)
      // `source` tells us which instance converted.
      await expect(form.locator('input[name="source"]')).toHaveCount(1)
    }
  })

  test('promises only release updates, and no invented social proof', async ({ page }) => {
    await page.goto(HOME)
    await page.waitForLoadState('networkidle')
    await openHeroForm(page)

    await expect(page.getByText('Release updates only. Nothing else, ever.').first()).toBeVisible()
    await expect(page.getByText('Free and MIT licensed').first()).toBeVisible()
    await expect(page.getByText('No account needed').first()).toBeVisible()

    // The retired lead-magnet and fabricated-stat copy must not come back.
    // "No credit card required" is deliberately NOT in this list: it survives
    // in GetStarted and is simply true of a free, MIT-licensed project.
    const body = await page.locator('body').innerText()
    for (const retired of [
      'Quick Start Kit',
      'Instant download',
      'Maximize Your Agent Performance',
      'Advanced Examples',
      '2,847',
    ]) {
      expect(body, `retired lead-magnet copy is back: ${retired}`).not.toContain(retired)
    }
  })

  test('form is reachable and labelled for keyboard and screen readers', async ({ page }) => {
    await page.goto(HOME)
    await page.waitForLoadState('networkidle')
    await openHeroForm(page)

    const form = page.locator('form[name="release-updates"]').first()
    const email = form.locator('input[type="email"]')

    // Every input needs a label, even a visually hidden one.
    const id = await email.getAttribute('id')
    expect(id).toBeTruthy()
    await expect(page.locator(`label[for="${id}"]`)).toHaveCount(1)

    await expect(email).toHaveAttribute('type', 'email')
    await email.focus()
    await expect(email).toBeFocused()
  })

  test('renders on a narrow viewport without overflowing', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(HOME)
    await page.waitForLoadState('networkidle')
    await openHeroForm(page)

    const form = page.locator('form[name="release-updates"]').first()
    await expect(form).toBeVisible()

    const box = await form.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.width).toBeLessThanOrEqual(375)
  })
})
