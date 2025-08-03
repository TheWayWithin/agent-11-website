import { test, expect } from '@playwright/test';

/**
 * VISUAL VALIDATION TESTS
 * Capture screenshot evidence of successful deployment
 * Document visual state for before/after comparison
 */

test.describe('Visual Validation - Emergency Fix Evidence', () => {
  
  test('Capture full page screenshot - Desktop', async ({ page }) => {
    await page.goto('https://agent-11.com');
    await page.waitForLoadState('networkidle');
    
    // Wait for any animations to complete
    await page.waitForTimeout(2000);
    
    // Hide any loading skeletons or states
    await page.addStyleTag({
      content: `
        [data-testid*="loading"], 
        .loading, 
        .skeleton,
        [class*="skeleton"] {
          display: none !important;
        }
      `
    });
    
    // Take full page screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/full-page-desktop.png',
      fullPage: true 
    });
    
    console.log('Desktop screenshot captured: test-results/screenshots/full-page-desktop.png');
  });

  test('Capture full page screenshot - Mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('https://agent-11.com');
    await page.waitForLoadState('networkidle');
    
    // Wait for responsive layout to settle
    await page.waitForTimeout(2000);
    
    // Take mobile screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/full-page-mobile.png',
      fullPage: true 
    });
    
    console.log('Mobile screenshot captured: test-results/screenshots/full-page-mobile.png');
  });

  test('Capture individual sections for detailed validation', async ({ page }) => {
    await page.goto('https://agent-11.com');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Define section selectors to try
    const sectionSelectors = [
      { name: 'hero', selectors: ['[data-testid="hero-section"]', '.hero', 'h1', 'header'] },
      { name: 'problem', selectors: ['[data-testid="problem-section"]', '.problem', 'section:has-text("Problem")'] },
      { name: 'solution', selectors: ['[data-testid="solution-section"]', '.solution', 'section:has-text("Solution")'] },
      { name: 'social-proof', selectors: ['[data-testid="social-proof-section"]', '.social-proof', 'section:has-text("Proof")'] },
      { name: 'technical', selectors: ['[data-testid="technical-section"]', '.technical', 'section:has-text("Technical")'] },
      { name: 'speed', selectors: ['[data-testid="speed-section"]', '.speed', 'section:has-text("Speed")'] },
      { name: 'get-started', selectors: ['[data-testid="get-started-section"]', '.get-started', 'section:has-text("Get Started")'] }
    ];

    for (const section of sectionSelectors) {
      let captured = false;
      
      for (const selector of section.selectors) {
        try {
          const element = page.locator(selector).first();
          if (await element.isVisible({ timeout: 2000 })) {
            await element.screenshot({ 
              path: `test-results/screenshots/section-${section.name}.png` 
            });
            console.log(`Section screenshot captured: ${section.name}`);
            captured = true;
            break;
          }
        } catch (error) {
          // Continue to next selector
          continue;
        }
      }
      
      if (!captured) {
        console.log(`Warning: Could not capture section ${section.name}`);
      }
    }
  });

  test('Capture interactive elements', async ({ page }) => {
    await page.goto('https://agent-11.com');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Capture agent cards if present
    const agentCards = page.locator('[data-testid="agent-card"], .agent-card, [class*="agent"]');
    if (await agentCards.count() > 0) {
      await agentCards.first().screenshot({ 
        path: 'test-results/screenshots/agent-demo.png' 
      });
      console.log('Agent demo screenshot captured');
    }
    
    // Capture terminal simulation if present
    const terminal = page.locator('[data-testid="terminal"], .terminal, [class*="terminal"]');
    if (await terminal.count() > 0) {
      await terminal.first().screenshot({ 
        path: 'test-results/screenshots/terminal-simulation.png' 
      });
      console.log('Terminal simulation screenshot captured');
    }
    
    // Capture code blocks
    const codeBlock = page.locator('pre, [class*="highlight"], [class*="prism"]');
    if (await codeBlock.count() > 0) {
      await codeBlock.first().screenshot({ 
        path: 'test-results/screenshots/code-block.png' 
      });
      console.log('Code block screenshot captured');
    }
    
    // Capture GitHub stats if present
    const githubStats = page.locator('[data-testid*="github"], [class*="github"], [class*="stats"]');
    if (await githubStats.count() > 0) {
      await githubStats.first().screenshot({ 
        path: 'test-results/screenshots/github-stats.png' 
      });
      console.log('GitHub stats screenshot captured');
    }
  });

  test('Document styling validation with DOM inspection', async ({ page }) => {
    await page.goto('https://agent-11.com');
    await page.waitForLoadState('networkidle');
    
    // Inspect key elements for styling validation
    const styleReport = await page.evaluate(() => {
      const report = {
        tailwindLoaded: false,
        customFonts: false,
        colorScheme: 'unknown' as string,
        responsiveClasses: false,
        elements: [] as Array<{
          tag: string;
          classes: string;
          color: string;
          backgroundColor: string;
          fontSize: string;
          fontFamily: string;
        }>
      };
      
      // Check if Tailwind CSS is loaded
      const stylesheets = Array.from(document.styleSheets);
      report.tailwindLoaded = stylesheets.some(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          return rules.some(rule => rule.cssText.includes('tailwind') || 
                                   rule.cssText.includes('tw-') ||
                                   rule.cssText.includes('Tailwind'));
        } catch (e) {
          return false;
        }
      });
      
      // Check for custom fonts
      const computedStyle = window.getComputedStyle(document.body);
      report.customFonts = !computedStyle.fontFamily.includes('Times');
      
      // Sample key elements
      const keyElements = document.querySelectorAll('h1, h2, button, [class*="bg-"], [class*="text-"]');
      Array.from(keyElements).slice(0, 5).forEach((el, index) => {
        const styles = window.getComputedStyle(el);
        report.elements.push({
          tag: el.tagName,
          classes: el.className,
          color: styles.color,
          backgroundColor: styles.backgroundColor,
          fontSize: styles.fontSize,
          fontFamily: styles.fontFamily
        });
      });
      
      // Check for responsive classes
      const allElements = document.querySelectorAll('*');
      report.responsiveClasses = Array.from(allElements).some(el => 
        el.className.includes('sm:') || 
        el.className.includes('md:') || 
        el.className.includes('lg:')
      );
      
      return report;
    });
    
    console.log('Style Report:', JSON.stringify(styleReport, null, 2));
    
    // Validate critical styling indicators
    expect(styleReport.customFonts).toBeTruthy();
    console.log('✅ Custom fonts detected (not browser defaults)');
    
    if (styleReport.tailwindLoaded) {
      console.log('✅ Tailwind CSS appears to be loaded');
    }
    
    if (styleReport.responsiveClasses) {
      console.log('✅ Responsive classes detected');
    }
    
    expect(styleReport.elements.length).toBeGreaterThan(0);
  });
});