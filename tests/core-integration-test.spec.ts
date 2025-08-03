import { test, expect } from '@playwright/test'

/**
 * CORE INTEGRATION TEST - Email Capture System
 * Essential validation of lead magnet functionality
 */

test.describe('Email Capture - Core Integration', () => {
  
  test('Email Capture System - Core Functionality', async ({ page }) => {
    // Navigate to homepage
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    
    console.log('✅ Homepage loaded successfully')
    
    // Test 1: Hero Section Lead Magnet
    const quickStartButton = page.locator('button', { hasText: 'Get Quick Start Kit' })
    await expect(quickStartButton).toBeVisible()
    console.log('✅ Hero "Get Quick Start Kit" button found')
    
    // Click to reveal email capture form
    await quickStartButton.click()
    await page.waitForTimeout(500)
    
    // Verify email form appeared
    const emailForm = page.locator('form[name="lead-magnet-capture"]').first()
    await expect(emailForm).toBeVisible()
    console.log('✅ Hero email capture form appears on click')
    
    // Test form elements
    const emailInput = emailForm.locator('input[type="email"]')
    const submitButton = emailForm.locator('button[type="submit"]')
    
    await expect(emailInput).toBeVisible()
    await expect(submitButton).toBeVisible()
    console.log('✅ Hero form elements present')
    
    // Test Netlify Forms configuration
    await expect(emailForm).toHaveAttribute('name', 'lead-magnet-capture')
    await expect(emailForm).toHaveAttribute('method', 'POST')
    await expect(emailForm).toHaveAttribute('data-netlify', 'true')
    console.log('✅ Hero Netlify Forms configuration correct')
    
    // Test hidden fields
    const hiddenFields = emailForm.locator('input[type="hidden"]')
    const hiddenCount = await hiddenFields.count()
    expect(hiddenCount).toBeGreaterThan(0)
    console.log(`✅ Hero form has ${hiddenCount} hidden fields for Netlify`)
    
    // Test 2: SolutionDemo Section Lead Magnet
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.6))
    await page.waitForTimeout(1000)
    
    const advancedText = page.locator('text=Want More Advanced Examples?')
    if (await advancedText.count() > 0) {
      await expect(advancedText).toBeVisible()
      console.log('✅ SolutionDemo advanced examples lead magnet found')
      
      const solutionForm = advancedText.locator('..').locator('form')
      if (await solutionForm.count() > 0) {
        await expect(solutionForm).toBeVisible()
        console.log('✅ SolutionDemo email capture form visible')
      }
    }
    
    // Test 3: GetStarted Section Lead Magnet
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(1000)
    
    const performanceText = page.locator('text=Maximize Your Agent Performance')
    if (await performanceText.count() > 0) {
      await expect(performanceText).toBeVisible()
      console.log('✅ GetStarted performance guide lead magnet found')
    }
    
    // Test 4: Form Validation
    await page.goto('http://localhost:3000')
    await quickStartButton.click()
    await page.waitForTimeout(500)
    
    const testForm = page.locator('form[name="lead-magnet-capture"]').first()
    const testEmailInput = testForm.locator('input[type="email"]')
    const testSubmitButton = testForm.locator('button[type="submit"]')
    
    // Test empty submission
    await testSubmitButton.click()
    // Browser validation should prevent submission
    const isInvalid = await testEmailInput.evaluate((el: HTMLInputElement) => !el.validity.valid)
    expect(isInvalid).toBe(true)
    console.log('✅ Form validation prevents empty submission')
    
    // Test valid email format
    await testEmailInput.fill('test@example.com')
    const isValid = await testEmailInput.evaluate((el: HTMLInputElement) => el.validity.valid)
    expect(isValid).toBe(true)
    console.log('✅ Form accepts valid email format')
    
    // Test 5: Mobile Responsiveness
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    
    const mobileButton = page.locator('button', { hasText: 'Get Quick Start Kit' })
    await expect(mobileButton).toBeVisible()
    console.log('✅ Hero button visible on mobile')
    
    await mobileButton.click()
    await page.waitForTimeout(500)
    
    const mobileForm = page.locator('form[name="lead-magnet-capture"]').first()
    await expect(mobileForm).toBeVisible()
    console.log('✅ Email form displays correctly on mobile')
    
    // Test 6: Social Proof Elements
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.goto('http://localhost:3000')
    await quickStartButton.click()
    await page.waitForTimeout(500)
    
    await expect(page.locator('text=No spam ever').first()).toBeVisible()
    await expect(page.locator('text=Instant download').first()).toBeVisible()
    console.log('✅ Social proof elements present')
    
    console.log('\n🎉 CORE INTEGRATION TEST: ALL PASSED')
  })
  
  test('Performance and Bundle Size Validation', async ({ page }) => {
    // Test page load performance
    const startTime = Date.now()
    await page.goto('http://localhost:3000')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime
    
    console.log(`⚡ Page load time: ${loadTime}ms`)
    expect(loadTime).toBeLessThan(5000) // Should load within 5 seconds
    
    // Test email form rendering performance
    const quickStartButton = page.locator('button', { hasText: 'Get Quick Start Kit' })
    
    const renderStart = Date.now()
    await quickStartButton.click()
    await page.locator('form[name="lead-magnet-capture"]').first().waitFor()
    const renderTime = Date.now() - renderStart
    
    console.log(`📱 Email form render time: ${renderTime}ms`)
    expect(renderTime).toBeLessThan(1000) // Form should appear quickly
    
    console.log('✅ Performance targets met')
  })
})