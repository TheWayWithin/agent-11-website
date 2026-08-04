import { test, expect } from '@playwright/test'

/**
 * Homepage load budget.
 *
 * Reduced 2026-08-04. This file used to be a second copy of the lead-magnet
 * email-capture tests — "Get Quick Start Kit", form[name="lead-magnet-capture"],
 * "Instant download" — for a funnel removed in July 2026. Those assertions and
 * their duplicate in manual-integration-validation.spec.ts tested nothing that
 * exists, and both failed on every run. The real email-capture behaviour is
 * covered properly in email-capture-integration.spec.ts.
 *
 * What survived is the one assertion here that was measuring something real:
 * the homepage renders within a budget.
 */

test.describe('Homepage performance', () => {
  test('loads within the budget', async ({ page }) => {
    const start = Date.now()
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - start

    // Generous on purpose: this is a smoke budget to catch a regression that
    // makes the page pathologically slow, not a performance target.
    expect(loadTime, `homepage took ${loadTime}ms to reach networkidle`).toBeLessThan(15000)
  })

  test('renders its main landmarks', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')

    await expect(page.locator('h1').first()).toBeVisible()
    await expect(page.locator('main').first()).toBeVisible()
    // The install command is the page's single most important string.
    await expect(page.getByText('secure-install.sh').first()).toBeVisible()
  })
})
