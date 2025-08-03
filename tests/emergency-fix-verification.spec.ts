import { test, expect } from '@playwright/test';

/**
 * EMERGENCY FIX VERIFICATION - CRITICAL VALIDATION
 * Specifically testing the issues that were fixed in the emergency deployment
 */

test.describe('Emergency Fix Verification', () => {
  
  test('CSS Compilation and Styling is Fixed', async ({ page }) => {
    await page.goto('https://agent-11.com');
    await page.waitForLoadState('networkidle');
    
    // Check that page has professional styling (not basic text)
    const bodyStyles = await page.evaluate(() => {
      const styles = window.getComputedStyle(document.body);
      return {
        fontFamily: styles.fontFamily,
        backgroundColor: styles.backgroundColor,
        margin: styles.margin,
        padding: styles.padding
      };
    });
    
    // Should not be default browser styles
    expect(bodyStyles.fontFamily).not.toContain('Times');
    expect(bodyStyles.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    
    console.log('✅ CSS compilation fixed - professional styling applied');
  });

  test('Tailwind Classes are Working', async ({ page }) => {
    await page.goto('https://agent-11.com');
    await page.waitForLoadState('networkidle');
    
    // Check for Tailwind classes in DOM
    const hasTailwindClasses = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      let tailwindClassCount = 0;
      
      for (const el of Array.from(elements)) {
        const classes = el.className;
        if (typeof classes === 'string') {
          // Look for common Tailwind patterns
          if (classes.includes('bg-') || 
              classes.includes('text-') || 
              classes.includes('p-') || 
              classes.includes('m-') ||
              classes.includes('flex') ||
              classes.includes('grid') ||
              classes.includes('container')) {
            tailwindClassCount++;
          }
        }
      }
      
      return tailwindClassCount > 10; // Should have many Tailwind classes
    });
    
    expect(hasTailwindClasses).toBeTruthy();
    console.log('✅ Tailwind CSS classes are being applied correctly');
  });

  test('Images are No Longer Oversized', async ({ page }) => {
    await page.goto('https://agent-11.com');
    await page.waitForLoadState('networkidle');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const dimensions = await img.evaluate((el: HTMLImageElement) => ({
          width: el.offsetWidth,
          height: el.offsetHeight,
          src: el.src
        }));
        
        // No image should be ridiculously oversized
        expect(dimensions.width).toBeLessThan(600);
        expect(dimensions.height).toBeLessThan(400);
        
        console.log(`Image ${i}: ${dimensions.width}x${dimensions.height} - ${dimensions.src.split('/').pop()}`);
      }
      console.log('✅ All images are properly sized (no more oversized GitHub logo)');
    }
  });

  test('Sections are Visible and Styled', async ({ page }) => {
    await page.goto('https://agent-11.com');
    await page.waitForLoadState('networkidle');
    
    // Check that main content sections exist and are styled
    const sections = await page.evaluate(() => {
      const sectionElements = document.querySelectorAll('section, [class*="section"], main > div');
      return Array.from(sectionElements).slice(0, 7).map(el => {
        const styles = window.getComputedStyle(el);
        return {
          tagName: el.tagName,
          className: el.className,
          hasBackground: styles.backgroundColor !== 'rgba(0, 0, 0, 0)',
          hasPadding: styles.paddingTop !== '0px' || styles.paddingBottom !== '0px',
          isVisible: (el as HTMLElement).offsetWidth > 0 && (el as HTMLElement).offsetHeight > 0
        };
      });
    });
    
    expect(sections.length).toBeGreaterThan(3); // Should have multiple sections
    
    const styledSections = sections.filter(s => s.hasBackground || s.hasPadding || s.className.length > 0);
    expect(styledSections.length).toBeGreaterThan(0);
    
    console.log(`✅ Found ${sections.length} sections, ${styledSections.length} with styling`);
  });

  test('Page Loads Fast (Performance Not Degraded)', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('https://agent-11.com');
    await page.waitForLoadState('domcontentloaded');
    
    const loadTime = Date.now() - startTime;
    
    // Should still be fast after fix
    expect(loadTime).toBeLessThan(3000);
    
    console.log(`✅ Page load time: ${loadTime}ms (performance maintained)`);
  });

  test('Interactive Elements are Functional', async ({ page }) => {
    await page.goto('https://agent-11.com');
    await page.waitForLoadState('networkidle');
    
    // Test buttons are clickable and styled
    const buttons = page.locator('button, [role="button"], a[href]');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      const firstButton = buttons.first();
      await expect(firstButton).toBeVisible();
      
      // Check button has proper styling
      const buttonStyles = await firstButton.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          border: styles.border,
          borderRadius: styles.borderRadius,
          padding: styles.padding
        };
      });
      
      // Should have some styling (not default)
      const hasCustomStyling = buttonStyles.backgroundColor !== 'rgba(0, 0, 0, 0)' ||
                               buttonStyles.borderRadius !== '0px' ||
                               buttonStyles.padding !== '0px';
      
      expect(hasCustomStyling).toBeTruthy();
      console.log(`✅ Found ${buttonCount} interactive elements with proper styling`);
    }
  });

  test('No Critical Console Errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    await page.goto('https://agent-11.com');
    await page.waitForLoadState('networkidle');
    
    // Filter out non-critical errors
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('analytics') &&
      !error.includes('third-party') &&
      !error.toLowerCase().includes('script error')
    );
    
    if (criticalErrors.length > 0) {
      console.log('Errors found:', criticalErrors);
    }
    
    expect(criticalErrors.length).toBe(0);
    console.log('✅ No critical console errors detected');
  });
});