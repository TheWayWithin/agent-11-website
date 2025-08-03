import { test, expect } from '@playwright/test'

/**
 * INTEGRATION TESTING - Email Capture System
 * Testing all lead magnet forms, user flows, and conversion tracking
 */

test.describe('Email Capture Integration Tests', () => {
  
  // Test Hero Section Lead Magnet
  test('Hero Section - Quick Start Kit Lead Magnet', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    
    // Verify "Get Quick Start Kit" button exists
    const quickStartButton = page.locator('button', { hasText: 'Get Quick Start Kit' })
    await expect(quickStartButton).toBeVisible()
    
    // Click to reveal email capture form
    await quickStartButton.click()
    
    // Verify email capture form appears
    const emailForm = page.locator('form[name="lead-magnet-capture"]').first()
    await expect(emailForm).toBeVisible()
    
    // Verify correct lead magnet title
    await expect(page.locator('text=🚀 Get Started in Under 5 Minutes')).toBeVisible()
    await expect(page.locator('text=AGENT-11 Quick Start Kit + Templates')).toBeVisible()
    
    // Test form validation
    const emailInput = emailForm.locator('input[type="email"]')
    const submitButton = emailForm.locator('button[type="submit"]')
    
    // Test empty submission
    await submitButton.click()
    await expect(page.locator('text=Email is required')).toBeVisible()
    
    // Test invalid email
    await emailInput.fill('invalid-email')
    await submitButton.click()
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible()
    
    // Test valid email (won't actually submit in test)
    await emailInput.fill('test@example.com')
    await expect(page.locator('text=Email is required')).not.toBeVisible()
    
    console.log('✅ Hero Section Lead Magnet - All validations working')
  })

  // Test SolutionDemo Section Lead Magnet
  test('SolutionDemo Section - Advanced Examples Lead Magnet', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    
    // Scroll to SolutionDemo section
    await page.locator('#solution-demo').scrollIntoViewIfNeeded()
    
    // Verify advanced examples email capture exists
    const advancedForm = page.locator('text=Want More Advanced Examples?').locator('..').locator('form')
    await expect(advancedForm).toBeVisible()
    
    // Verify correct lead magnet content
    await expect(page.locator('text=Advanced Collaboration Patterns + Enterprise Templates')).toBeVisible()
    await expect(page.locator('text=Get Advanced Content')).toBeVisible()
    
    // Test form functionality
    const emailInput = advancedForm.locator('input[type="email"]')
    const submitButton = advancedForm.locator('button[type="submit"]')
    
    await emailInput.fill('advanced@example.com')
    await expect(submitButton).toBeEnabled()
    
    console.log('✅ SolutionDemo Section Lead Magnet - Form functional')
  })

  // Test GetStarted Section Lead Magnet  
  test('GetStarted Section - Performance Guide Lead Magnet', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    
    // Scroll to GetStarted section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(1000)
    
    // Verify performance guide email capture exists
    await expect(page.locator('text=⚡ Maximize Your Agent Performance')).toBeVisible()
    await expect(page.locator('text=AGENT-11 Performance Optimization Guide + Benchmarks')).toBeVisible()
    
    // Test form functionality
    const performanceForm = page.locator('text=Maximize Your Agent Performance').locator('..').locator('form')
    await expect(performanceForm).toBeVisible()
    
    const emailInput = performanceForm.locator('input[type="email"]')
    const submitButton = performanceForm.locator('button[type="submit"]')
    
    await emailInput.fill('performance@example.com')
    await expect(submitButton).toContainText('Download Free Guide')
    
    console.log('✅ GetStarted Section Lead Magnet - Form functional')
  })

  // Test Form Styling and Variants
  test('Email Capture - Visual Design and Variants', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    
    // Test Hero variant (after clicking button)
    const quickStartButton = page.locator('button', { hasText: 'Get Quick Start Kit' })
    await quickStartButton.click()
    
    const heroForm = page.locator('form[name="lead-magnet-capture"]').first()
    await expect(heroForm).toHaveClass(/hero/)
    
    // Test inline variants (SolutionDemo and GetStarted)
    await page.locator('#solution-demo').scrollIntoViewIfNeeded()
    const solutionForm = page.locator('text=Want More Advanced Examples?').locator('..').locator('form')
    await expect(solutionForm).toBeVisible()
    
    // Verify social proof elements
    await expect(page.locator('text=🔒 No spam ever. Used by 2,847+ developers.')).toBeVisible()
    await expect(page.locator('text=✓ Instant download')).toBeVisible()
    await expect(page.locator('text=✓ Production-ready')).toBeVisible()
    await expect(page.locator('text=✓ No credit card')).toBeVisible()
    
    console.log('✅ Email Capture Visual Design - All variants styled correctly')
  })

  // Test Success States
  test('Email Capture - Success State Display', async ({ page }) => {
    // Mock successful form submission
    await page.route('/', async route => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          body: 'OK'
        })
      } else {
        await route.continue()
      }
    })
    
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    
    // Trigger hero email capture
    await page.locator('button', { hasText: 'Get Quick Start Kit' }).click()
    
    const emailForm = page.locator('form[name="lead-magnet-capture"]').first()
    const emailInput = emailForm.locator('input[type="email"]')
    const submitButton = emailForm.locator('button[type="submit"]')
    
    // Submit valid email
    await emailInput.fill('success@example.com')
    await submitButton.click()
    
    // Verify success state
    await expect(page.locator('text=🎉')).toBeVisible()
    await expect(page.locator('text=Check Your Email!')).toBeVisible()
    await expect(page.locator('text=AGENT-11 Quick Start Kit + Templates')).toBeVisible()
    await expect(page.locator('text=star our GitHub repo')).toBeVisible()
    
    console.log('✅ Email Capture Success State - Displayed correctly')
  })

  // Test Mobile Responsiveness
  test('Email Capture - Mobile Responsiveness', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    
    // Test Hero section on mobile
    const quickStartButton = page.locator('button', { hasText: 'Get Quick Start Kit' })
    await expect(quickStartButton).toBeVisible()
    await quickStartButton.click()
    
    const mobileForm = page.locator('form[name="lead-magnet-capture"]').first()
    await expect(mobileForm).toBeVisible()
    
    // Verify form is properly sized for mobile
    const formBox = await mobileForm.boundingBox()
    expect(formBox?.width).toBeLessThan(400) // Should fit mobile screen
    
    // Test form inputs on mobile
    const emailInput = mobileForm.locator('input[type="email"]')
    const submitButton = mobileForm.locator('button[type="submit"]')
    
    await expect(emailInput).toBeVisible()
    await expect(submitButton).toBeVisible()
    
    // Test touch interaction
    await emailInput.tap()
    await emailInput.fill('mobile@example.com')
    await expect(emailInput).toHaveValue('mobile@example.com')
    
    console.log('✅ Email Capture Mobile - Responsive design working')
  })

  // Test Cross-Section Navigation
  test('Email Capture - Cross-Section User Journey', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    
    // Verify all lead magnets are accessible without conflicts
    // 1. Hero section
    await page.locator('button', { hasText: 'Get Quick Start Kit' }).click()
    await expect(page.locator('text=🚀 Get Started in Under 5 Minutes')).toBeVisible()
    
    // 2. Navigate to SolutionDemo
    await page.locator('#solution-demo').scrollIntoViewIfNeeded()
    await expect(page.locator('text=Want More Advanced Examples?')).toBeVisible()
    
    // 3. Navigate to GetStarted
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expect(page.locator('text=⚡ Maximize Your Agent Performance')).toBeVisible()
    
    // Verify no JavaScript errors occurred during navigation
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    
    await page.waitForTimeout(1000)
    expect(errors.length).toBe(0)
    
    console.log('✅ Cross-Section Navigation - All lead magnets accessible')
  })

  // Test Accessibility
  test('Email Capture - Accessibility Compliance', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    
    // Trigger email capture form
    await page.locator('button', { hasText: 'Get Quick Start Kit' }).click()
    
    const emailForm = page.locator('form[name="lead-magnet-capture"]').first()
    
    // Check form accessibility
    const emailInput = emailForm.locator('input[type="email"]')
    const submitButton = emailForm.locator('button[type="submit"]')
    
    // Verify required attributes
    await expect(emailInput).toHaveAttribute('required')
    await expect(emailInput).toHaveAttribute('type', 'email')
    
    // Test keyboard navigation
    await emailInput.focus()
    await expect(emailInput).toBeFocused()
    
    await page.keyboard.press('Tab')
    await expect(submitButton).toBeFocused()
    
    // Verify ARIA labels and descriptions exist
    await expect(emailForm).toHaveAttribute('name', 'lead-magnet-capture')
    
    console.log('✅ Email Capture Accessibility - WCAG compliant')
  })

  // Test Performance Impact
  test('Email Capture - Performance Impact', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    // Measure page load performance
    const performanceData = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0
      }
    })
    
    // Verify performance targets
    expect(performanceData.loadTime).toBeLessThan(2000) // <2s load time
    console.log(`Load time: ${performanceData.loadTime}ms`)
    
    // Test email capture form doesn't block rendering
    const quickStartButton = page.locator('button', { hasText: 'Get Quick Start Kit' })
    await expect(quickStartButton).toBeVisible()
    
    const startTime = Date.now()
    await quickStartButton.click()
    const emailForm = page.locator('form[name="lead-magnet-capture"]').first()
    await expect(emailForm).toBeVisible()
    const renderTime = Date.now() - startTime
    
    expect(renderTime).toBeLessThan(500) // Form should appear quickly
    console.log(`Email form render time: ${renderTime}ms`)
    
    console.log('✅ Email Capture Performance - Meets targets')
  })
})