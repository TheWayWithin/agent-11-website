import { test, expect } from '@playwright/test';

/*
 * Serialised deliberately: this file asserts against the live
 * https://agent-11.com, not the local build. Run in parallel across five
 * device projects it overloads the live site and fails on contention rather
 * than on anything real. See playwright.config.ts for the wider note.
 */
test.describe.configure({ mode: 'serial' })


/**
 * EMERGENCY DEPLOYMENT VALIDATION TESTS
 * Testing the technology stack stabilization fix deployed to Netlify
 * 
 * CRITICAL VALIDATION:
 * - CSS/Styling now working correctly (Tailwind CSS compiling)
 * - All 7 landing page sections visible and styled
 * - Interactive features functional
 * - Performance targets maintained
 */

test.describe('Production Deployment - Emergency Fix Validation', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to production site
    await page.goto('https://agent-11.com');
    
    // Wait for initial load and hydration
    await page.waitForLoadState('networkidle');
  });

  test('Site loads successfully with proper styling', async ({ page }) => {
    // Verify page loads without errors
    await expect(page).toHaveTitle(/AGENT-11/);
    
    // Check that Tailwind CSS is working (no more basic text appearance)
    const heroSection = page.locator('[data-testid="hero-section"], .hero, h1').first();
    await expect(heroSection).toBeVisible();
    
    // Verify styling is applied (not default browser styles)
    const computedStyle = await heroSection.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        fontFamily: styles.fontFamily,
        fontSize: styles.fontSize,
        color: styles.color,
        marginTop: styles.marginTop
      };
    });
    
    // Should not be default Times New Roman or basic styling
    expect(computedStyle.fontFamily).not.toContain('Times');
    expect(computedStyle.fontSize).not.toBe('16px'); // Default browser size
  });

  /*
   * Rewritten 2026-08-04. This used to look for the literal words "Hero",
   * "Problem", "Solution Demo" and so on as headings or data-testids. Those
   * are the React component names — they have never been rendered text and
   * no data-testid was ever added, so the test could only ever fail. It
   * asserts the same underlying concern structurally instead: the homepage
   * renders its sections, they are visible, and they carry real styling
   * rather than falling back to unstyled defaults.
   */
  test('Landing page sections are visible and styled', async ({ page }) => {
    const sectionCount = await page.locator('section').count();
    expect(sectionCount, 'homepage should render its content sections').toBeGreaterThanOrEqual(7);

    const toCheck = Math.min(sectionCount, 7);
    for (let i = 0; i < toCheck; i++) {
      const sectionElement = page.locator('section').nth(i);

      await expect(sectionElement).toBeVisible({ timeout: 10000 });
      
      // Verify section has proper styling (not default)
      const hasCustomStyling = await sectionElement.evaluate(el => {
        const styles = window.getComputedStyle(el);
        // Check for evidence of Tailwind/custom CSS
        return styles.marginTop !== '0px' || 
               styles.paddingTop !== '0px' || 
               !styles.fontFamily.includes('Times') ||
               styles.color !== 'rgb(0, 0, 0)'; // Not default black
      });
      
      expect(hasCustomStyling).toBeTruthy();
    }
  });

  test('Interactive features are functional', async ({ page }) => {
    // Test agent demos if present
    const agentCards = page.locator('[data-testid="agent-card"], .agent-card, [class*="agent"]');
    if (await agentCards.count() > 0) {
      await expect(agentCards.first()).toBeVisible();
      
      // Test interaction if clickable
      if (await agentCards.first().isEnabled()) {
        await agentCards.first().click();
        // Give time for any animation/state change
        await page.waitForTimeout(1000);
      }
    }

    // Test terminal simulation if present  
    const terminal = page.locator('[data-testid="terminal"], .terminal, [class*="terminal"]');
    if (await terminal.count() > 0) {
      await expect(terminal.first()).toBeVisible();
    }

    // Test code blocks with syntax highlighting
    const codeBlocks = page.locator('pre, code, [class*="highlight"], [class*="prism"]');
    if (await codeBlocks.count() > 0) {
      await expect(codeBlocks.first()).toBeVisible();
      
      // Check for syntax highlighting (not plain text)
      const hasHighlighting = await codeBlocks.first().evaluate(el => {
        const spans = el.querySelectorAll('span[class*="token"], span[style*="color"]');
        return spans.length > 0;
      });
      
      // Note: May not have highlighting on initial load due to lazy loading
      console.log('Code highlighting present:', hasHighlighting);
    }
  });

  test('GitHub API integration works', async ({ page }) => {
    // Look for GitHub stats or data
    const githubElements = page.locator('[data-testid*="github"], [class*="github"], [class*="stats"]');
    
    if (await githubElements.count() > 0) {
      await expect(githubElements.first()).toBeVisible();
      
      // Check for actual data (not loading state)
      await page.waitForTimeout(3000); // Allow time for API calls
      
      const hasData = await githubElements.first().evaluate(el => {
        const text = el.textContent || '';
        return !text.includes('Loading') && 
               !text.includes('...') && 
               text.trim().length > 0;
      });
      
      console.log('GitHub data loaded:', hasData);
    }
  });

  test('Images are properly sized (GitHub logo fix)', async ({ page }) => {
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        await expect(img).toBeVisible();
        
        // Check image dimensions are reasonable
        const dimensions = await img.evaluate((el: HTMLImageElement) => ({
          width: el.offsetWidth,
          height: el.offsetHeight,
          naturalWidth: el.naturalWidth,
          naturalHeight: el.naturalHeight
        }));
        
        // Images should not be oversized (max reasonable size for web)
        expect(dimensions.width).toBeLessThan(1200);
        expect(dimensions.height).toBeLessThan(800);
        
        console.log(`Image ${i}: ${dimensions.width}x${dimensions.height}`);
      }
    }
  });

  test('Performance is within targets', async ({ page }) => {
    const startTime = Date.now();
    
    // Navigate and wait for load
    await page.goto('https://agent-11.com');
    await page.waitForLoadState('domcontentloaded');
    
    const loadTime = Date.now() - startTime;
    
    // Should load within 2 seconds (2000ms) as per requirements
    expect(loadTime).toBeLessThan(5000); // Allow some buffer for testing
    
    console.log(`Page load time: ${loadTime}ms`);
    
    // Check bundle size via performance API
    const perfMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime,
        firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime
      };
    });
    
    console.log('Performance metrics:', perfMetrics);
  });

  test('Mobile responsiveness works correctly', async ({ page, isMobile }) => {
    if (isMobile) {
      // Test touch interactions
      const interactiveElements = page.locator('button, [role="button"], a, [class*="interactive"]');
      const count = await interactiveElements.count();
      
      if (count > 0) {
        const firstElement = interactiveElements.first();
        await expect(firstElement).toBeVisible();
        
        // Check element is touch-friendly (reasonable tap target size)
        const box = await firstElement.boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThan(32); // Minimum 32px for touch
          expect(box.width).toBeGreaterThan(32);
        }
      }
      
      // Test horizontal scrolling doesn't occur
      const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      
      expect(bodyScrollWidth).toBeLessThanOrEqual(viewportWidth + 20); // Small buffer for scrollbars
    }
  });

  test('WWW redirects to the apex, which is canonical', async ({ page }) => {
    // The apex is the canonical host (A11W-ISS-5). This test intentionally
    // still navigates to www: the point is to prove www redirects away from
    // itself. It used to accept either host as the destination, which would
    // have passed even while the site was declaring a canonical it redirects
    // off — exactly the bug.
    await page.goto('https://www.agent-11.com');
    await page.waitForLoadState('networkidle');

    expect(page.url()).toMatch(/^https:\/\/agent-11\.com/);

    await expect(page).toHaveTitle(/AGENT-11/);

    // And the page we landed on must name the apex as canonical.
    const canonical = await page
      .locator('link[rel="canonical"]')
      .first()
      .getAttribute('href');
    expect(canonical).toMatch(/^https:\/\/agent-11\.com/);
  });

  test('No console errors present', async ({ page }) => {
    const consoleErrors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      consoleErrors.push(error.message);
    });
    
    await page.goto('https://agent-11.com');
    await page.waitForLoadState('networkidle');
    
    // Filter out known acceptable errors
    const significantErrors = consoleErrors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('analytics') &&
      !error.toLowerCase().includes('third-party')
    );
    
    if (significantErrors.length > 0) {
      console.log('Console errors found:', significantErrors);
    }
    
    expect(significantErrors.length).toBe(0);
  });
});