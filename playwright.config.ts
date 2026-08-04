import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for AGENT-11 website testing
 * Focus: Production deployment validation and emergency fix verification
 */
/**
 * Specs that hit the deployed site instead of the local build. Kept in one
 * place because both the project list and the retry note below depend on it.
 */
const LIVE_SITE_SPECS = [
  '**/production-deployment.spec.ts',
  '**/emergency-fix-verification.spec.ts',
  '**/visual-validation.spec.ts',
];

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  /*
   * Retries are on locally too, not just in CI. Three of these spec files
   * (production-deployment, emergency-fix-verification, visual-validation)
   * run against the live https://agent-11.com rather than the build under
   * test. Each passes in isolation; under the default fan-out — 5 device
   * projects times 5 workers — they intermittently fail on live-network
   * contention. Those files are serialised individually; this covers the
   * residual flake that comes with asserting against a real site.
   */
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['list']
  ],
  use: {
    baseURL: 'https://agent-11.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /*
   * These three assert against the live https://agent-11.com rather than the
   * build under test. They run in ONE project rather than five: the same live
   * page fetched from twenty-five parallel browser contexts fails on
   * contention, not on anything true about the site, which is how the suite
   * came to be permanently red. Cross-browser coverage belongs on the local
   * specs, where it costs nothing and means something.
   */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: LIVE_SITE_SPECS,
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testIgnore: LIVE_SITE_SPECS,
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testIgnore: LIVE_SITE_SPECS,
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      testIgnore: LIVE_SITE_SPECS,
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
      testIgnore: LIVE_SITE_SPECS,
    },
    {
      name: 'live-site-smoke',
      use: { ...devices['Desktop Chrome'] },
      testMatch: LIVE_SITE_SPECS,
    },
  ],

  webServer: process.env.CI ? undefined : {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});