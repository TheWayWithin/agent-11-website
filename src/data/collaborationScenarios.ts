
interface TerminalLine {
  id: string
  type: 'command' | 'output' | 'agent_thinking' | 'agent_handoff' | 'system'
  content: string
  agent?: {
    name: string
    emoji: string
  }
  timestamp?: number
  delay?: number
}

export interface CollaborationScenario {
  id: string
  name: string
  description: string
  duration: string
  complexity: 'Low' | 'Medium' | 'High'
  lines: TerminalLine[]
}

export const collaborationScenarios: CollaborationScenario[] = [
  {
    id: 'full-stack-dev',
    name: 'Full Stack Development',
    description: 'Complete feature development with architecture, implementation, and testing',
    duration: '8 minutes',
    complexity: 'High',
    lines: [
      {
        id: 'fs-1',
        type: 'command',
        content: '@architect Design user authentication system',
        delay: 1000
      },
      {
        id: 'fs-2',
        type: 'agent_thinking',
        content: 'Analyzing requirements... Designing scalable authentication architecture',
        agent: { name: 'THE ARCHITECT', emoji: '🏗️' },
        delay: 2000
      },
      {
        id: 'fs-3',
        type: 'output',
        content: '✓ Database schema designed (users, sessions, tokens)',
        delay: 800
      },
      {
        id: 'fs-4',
        type: 'output',
        content: '✓ API endpoints defined (/auth/login, /auth/register, /auth/refresh)',
        delay: 600
      },
      {
        id: 'fs-5',
        type: 'output',
        content: '✓ Security strategy: JWT + refresh tokens, bcrypt hashing',
        delay: 700
      },
      {
        id: 'fs-6',
        type: 'agent_handoff',
        content: 'Handoff to @developer → Architecture complete, ready for implementation',
        delay: 1000
      },
      {
        id: 'fs-7',
        type: 'command',
        content: '@developer Implement authentication system based on architecture',
        delay: 1500
      },
      {
        id: 'fs-8',
        type: 'agent_thinking',
        content: 'Generating backend API... Creating authentication middleware... Building frontend components',
        agent: { name: 'THE DEVELOPER', emoji: '💻' },
        delay: 3000
      },
      {
        id: 'fs-9',
        type: 'output',
        content: '✓ User model and database migrations created',
        delay: 800
      },
      {
        id: 'fs-10',
        type: 'output',
        content: '✓ Authentication middleware implemented with JWT validation',
        delay: 900
      },
      {
        id: 'fs-11',
        type: 'output',
        content: '✓ Login/Register API endpoints with error handling',
        delay: 700
      },
      {
        id: 'fs-12',
        type: 'output',
        content: '✓ React components: LoginForm, RegisterForm, AuthProvider',
        delay: 1000
      },
      {
        id: 'fs-13',
        type: 'output',
        content: '✓ Password strength validation and security measures',
        delay: 600
      },
      {
        id: 'fs-14',
        type: 'agent_handoff',
        content: 'Handoff to @tester → Implementation complete, ready for testing',
        delay: 1200
      },
      {
        id: 'fs-15',
        type: 'command',
        content: '@tester Create comprehensive test suite for authentication',
        delay: 1500
      },
      {
        id: 'fs-16',
        type: 'agent_thinking',
        content: 'Analyzing code coverage... Generating unit tests... Creating integration tests... Testing security vulnerabilities',
        agent: { name: 'THE TESTER', emoji: '✅' },
        delay: 2500
      },
      {
        id: 'fs-17',
        type: 'output',
        content: '✓ Unit tests: 47 tests, 94% code coverage',
        delay: 800
      },
      {
        id: 'fs-18',
        type: 'output',
        content: '✓ Integration tests: API endpoints, authentication flow',
        delay: 700
      },
      {
        id: 'fs-19',
        type: 'output',
        content: '✓ Security tests: SQL injection, XSS, CSRF protection',
        delay: 900
      },
      {
        id: 'fs-20',
        type: 'output',
        content: '✓ Performance tests: Login handles 1000 concurrent users',
        delay: 600
      },
      {
        id: 'fs-21',
        type: 'system',
        content: 'Authentication system complete! Ready for deployment.',
        delay: 1000
      },
      {
        id: 'fs-22',
        type: 'system',
        content: 'Total development time: 4.2 hours (vs 3 weeks manual)',
        delay: 800
      }
    ]
  },
  {
    id: 'bug-fix-workflow',
    name: 'Bug Fix Workflow',
    description: 'Collaborative debugging and resolution with testing and deployment',
    duration: '5 minutes',
    complexity: 'Medium',
    lines: [
      {
        id: 'bf-1',
        type: 'command',
        content: '@support User reports: "Login fails on mobile Safari"',
        delay: 1000
      },
      {
        id: 'bf-2',
        type: 'agent_thinking',
        content: 'Analyzing user reports... Gathering error details... Reproducing issue',
        agent: { name: 'THE SUPPORT', emoji: '💬' },
        delay: 2000
      },
      {
        id: 'bf-3',
        type: 'output',
        content: '📱 Issue confirmed: iOS Safari 16.4, cookie authentication failing',
        delay: 800
      },
      {
        id: 'bf-4',
        type: 'output',
        content: '🔍 User agents affected: 847 users in last 48 hours',
        delay: 700
      },
      {
        id: 'bf-5',
        type: 'agent_handoff',
        content: 'Handoff to @developer → Bug reproduced, needs technical investigation',
        delay: 1000
      },
      {
        id: 'bf-6',
        type: 'command',
        content: '@developer Investigate mobile Safari login issue',
        delay: 1200
      },
      {
        id: 'bf-7',
        type: 'agent_thinking',
        content: 'Debugging authentication flow... Checking cookie settings... Testing Safari compatibility...',
        agent: { name: 'THE DEVELOPER', emoji: '💻' },
        delay: 2500
      },
      {
        id: 'bf-8',
        type: 'output',
        content: '🐛 Root cause: SameSite=Strict blocking third-party cookies',
        delay: 900
      },
      {
        id: 'bf-9',
        type: 'output',
        content: '🔧 Fix implemented: SameSite=Lax for auth cookies',
        delay: 800
      },
      {
        id: 'bf-10',
        type: 'output',
        content: '✅ Added fallback: localStorage tokens for Safari compatibility',
        delay: 700
      },
      {
        id: 'bf-11',
        type: 'agent_handoff',
        content: 'Handoff to @tester → Fix ready for validation',
        delay: 1000
      },
      {
        id: 'bf-12',
        type: 'command',
        content: '@tester Validate fix across mobile browsers',
        delay: 1200
      },
      {
        id: 'bf-13',
        type: 'agent_thinking',
        content: 'Testing Safari 16.4... Chrome mobile... Firefox mobile... Edge mobile...',
        agent: { name: 'THE TESTER', emoji: '✅' },
        delay: 2000
      },
      {
        id: 'bf-14',
        type: 'output',
        content: '✅ Safari 16.4: Login successful',
        delay: 600
      },
      {
        id: 'bf-15',
        type: 'output',
        content: '✅ Chrome Mobile: Login successful',
        delay: 500
      },
      {
        id: 'bf-16',
        type: 'output',
        content: '✅ Firefox Mobile: Login successful',
        delay: 500
      },
      {
        id: 'bf-17',
        type: 'output',
        content: '✅ Cross-browser compatibility confirmed',
        delay: 700
      },
      {
        id: 'bf-18',
        type: 'agent_handoff',
        content: 'Handoff to @operator → Fix validated, ready for deployment',
        delay: 1000
      },
      {
        id: 'bf-19',
        type: 'command',
        content: '@operator Deploy hotfix to production',
        delay: 1200
      },
      {
        id: 'bf-20',
        type: 'agent_thinking',
        content: 'Deploying to staging... Running smoke tests... Rolling out to production...',
        agent: { name: 'THE OPERATOR', emoji: '🚀' },
        delay: 2000
      },
      {
        id: 'bf-21',
        type: 'output',
        content: '🚀 Deployed to 3 staging servers: All tests passing',
        delay: 800
      },
      {
        id: 'bf-22',
        type: 'output',
        content: '📊 Production rollout: 25% → 50% → 100% (gradual deployment)',
        delay: 1000
      },
      {
        id: 'bf-23',
        type: 'system',
        content: 'Bug fix deployed! Mobile Safari login restored.',
        delay: 800
      },
      {
        id: 'bf-24',
        type: 'system',
        content: 'Resolution time: 23 minutes (vs 4+ hours manual)',
        delay: 600
      }
    ]
  },
  {
    id: 'feature-launch',
    name: 'Feature Implementation',
    description: 'End-to-end feature development from strategy to launch',
    duration: '6 minutes',
    complexity: 'High',
    lines: [
      {
        id: 'fl-1',
        type: 'command',
        content: '@strategist Define user dashboard with analytics',
        delay: 1000
      },
      {
        id: 'fl-2',
        type: 'agent_thinking',
        content: 'Analyzing user needs... Defining MVP scope... Creating user stories...',
        agent: { name: 'THE STRATEGIST', emoji: '🎯' },
        delay: 2000
      },
      {
        id: 'fl-3',
        type: 'output',
        content: '📋 User Story: "As a user, I want to see my usage analytics"',
        delay: 800
      },
      {
        id: 'fl-4',
        type: 'output',
        content: '📊 Key metrics: Daily active usage, feature adoption, performance',
        delay: 700
      },
      {
        id: 'fl-5',
        type: 'output',
        content: '🎯 Success criteria: 80%+ user engagement, <2s load time',
        delay: 600
      },
      {
        id: 'fl-6',
        type: 'agent_handoff',
        content: 'Handoff to @designer → Requirements defined, ready for design',
        delay: 1000
      },
      {
        id: 'fl-7',
        type: 'command',
        content: '@designer Create dashboard UI with optimal user experience',
        delay: 1200
      },
      {
        id: 'fl-8',
        type: 'agent_thinking',
        content: 'Designing information architecture... Creating wireframes... Building component library...',
        agent: { name: 'THE DESIGNER', emoji: '🎨' },
        delay: 2500
      },
      {
        id: 'fl-9',
        type: 'output',
        content: '🎨 Dashboard layout: Cards for metrics, interactive charts',
        delay: 800
      },
      {
        id: 'fl-10',
        type: 'output',
        content: '📱 Responsive design: Mobile-first, progressive enhancement',
        delay: 700
      },
      {
        id: 'fl-11',
        type: 'output',
        content: '♿ Accessibility: WCAG 2.1 AA compliant, keyboard navigation',
        delay: 600
      },
      {
        id: 'fl-12',
        type: 'agent_handoff',
        content: 'Handoff to @developer → Design complete, ready for implementation',
        delay: 1000
      },
      {
        id: 'fl-13',
        type: 'command',
        content: '@developer Build dashboard with real-time analytics',
        delay: 1200
      },
      {
        id: 'fl-14',
        type: 'agent_thinking',
        content: 'Building React components... Implementing data fetching... Adding chart libraries... Optimizing performance...',
        agent: { name: 'THE DEVELOPER', emoji: '💻' },
        delay: 3000
      },
      {
        id: 'fl-15',
        type: 'output',
        content: '⚛️ React components: DashboardLayout, MetricCard, AnalyticsChart',
        delay: 800
      },
      {
        id: 'fl-16',
        type: 'output',
        content: '📊 Chart.js integration: Interactive line and bar charts',
        delay: 700
      },
      {
        id: 'fl-17',
        type: 'output',
        content: '🔄 Real-time updates: WebSocket connection for live data',
        delay: 800
      },
      {
        id: 'fl-18',
        type: 'output',
        content: '⚡ Performance optimized: Lazy loading, data caching',
        delay: 600
      },
      {
        id: 'fl-19',
        type: 'agent_handoff',
        content: 'Handoff to @analyst → Feature complete, ready for data validation',
        delay: 1000
      },
      {
        id: 'fl-20',
        type: 'command',
        content: '@analyst Validate analytics accuracy and performance',
        delay: 1200
      },
      {
        id: 'fl-21',
        type: 'agent_thinking',
        content: 'Analyzing data accuracy... Testing performance metrics... Validating chart calculations...',
        agent: { name: 'THE ANALYST', emoji: '📊' },
        delay: 2000
      },
      {
        id: 'fl-22',
        type: 'output',
        content: '✅ Data accuracy: 99.8% match with raw analytics',
        delay: 700
      },
      {
        id: 'fl-23',
        type: 'output',
        content: '🚀 Performance: 1.2s load time, 60fps chart animations',
        delay: 800
      },
      {
        id: 'fl-24',
        type: 'output',
        content: '📈 User testing: 94% positive feedback, intuitive navigation',
        delay: 700
      },
      {
        id: 'fl-25',
        type: 'agent_handoff',
        content: 'Handoff to @marketer → Analytics validated, ready for launch',
        delay: 1000
      },
      {
        id: 'fl-26',
        type: 'command',
        content: '@marketer Create launch campaign for dashboard feature',
        delay: 1200
      },
      {
        id: 'fl-27',
        type: 'agent_thinking',
        content: 'Creating launch content... Preparing user guides... Designing announcement email...',
        agent: { name: 'THE MARKETER', emoji: '📈' },
        delay: 2000
      },
      {
        id: 'fl-28',
        type: 'output',
        content: '📧 Email campaign: "New Analytics Dashboard - See Your Impact"',
        delay: 800
      },
      {
        id: 'fl-29',
        type: 'output',
        content: '📱 Social media: Twitter thread, LinkedIn post, demo video',
        delay: 700
      },
      {
        id: 'fl-30',
        type: 'output',
        content: '📖 User guide: Step-by-step dashboard walkthrough',
        delay: 600
      },
      {
        id: 'fl-31',
        type: 'system',
        content: 'Dashboard feature launched successfully!',
        delay: 1000
      },
      {
        id: 'fl-32',
        type: 'system',
        content: 'Development time: 2.5 days (vs 3-4 weeks manual)',
        delay: 800
      }
    ]
  },
  {
    id: 'deployment-pipeline',
    name: 'Deployment Pipeline',
    description: 'Automated testing, building, and deployment workflow',
    duration: '4 minutes',
    complexity: 'Medium',
    lines: [
      {
        id: 'dp-1',
        type: 'command',
        content: '@operator Set up production deployment pipeline',
        delay: 1000
      },
      {
        id: 'dp-2',
        type: 'agent_thinking',
        content: 'Configuring CI/CD pipeline... Setting up automated testing... Preparing production environment...',
        agent: { name: 'THE OPERATOR', emoji: '🚀' },
        delay: 2500
      },
      {
        id: 'dp-3',
        type: 'output',
        content: '🔧 GitHub Actions pipeline configured',
        delay: 800
      },
      {
        id: 'dp-4',
        type: 'output',
        content: '🧪 Test stages: Linting → Unit Tests → Integration Tests',
        delay: 700
      },
      {
        id: 'dp-5',
        type: 'output',
        content: '🏗️ Build optimization: Code splitting, asset compression',
        delay: 600
      },
      {
        id: 'dp-6',
        type: 'agent_handoff',
        content: 'Handoff to @tester → Pipeline ready for test automation',
        delay: 1000
      },
      {
        id: 'dp-7',
        type: 'command',
        content: '@tester Run comprehensive test suite',
        delay: 1200
      },
      {
        id: 'dp-8',
        type: 'agent_thinking',
        content: 'Running unit tests... Integration testing... End-to-end browser tests...',
        agent: { name: 'THE TESTER', emoji: '✅' },
        delay: 2000
      },
      {
        id: 'dp-9',
        type: 'output',
        content: '✅ Unit tests: 247 tests passed (0 failed)',
        delay: 700
      },
      {
        id: 'dp-10',
        type: 'output',
        content: '✅ Integration tests: API endpoints validated',
        delay: 600
      },
      {
        id: 'dp-11',
        type: 'output',
        content: '✅ E2E tests: User flows verified across browsers',
        delay: 800
      },
      {
        id: 'dp-12',
        type: 'output',
        content: '📊 Code coverage: 94% (target: 90%+)',
        delay: 600
      },
      {
        id: 'dp-13',
        type: 'agent_handoff',
        content: 'Handoff to @operator → All tests passed, ready for deployment',
        delay: 1000
      },
      {
        id: 'dp-14',
        type: 'command',
        content: '@operator Deploy to production with blue-green strategy',
        delay: 1200
      },
      {
        id: 'dp-15',
        type: 'agent_thinking',
        content: 'Building production assets... Deploying to green environment... Running health checks...',
        agent: { name: 'THE OPERATOR', emoji: '🚀' },
        delay: 2500
      },
      {
        id: 'dp-16',
        type: 'output',
        content: '🏗️ Build completed: Assets minified, CDN uploaded',
        delay: 800
      },
      {
        id: 'dp-17',
        type: 'output',
        content: '🌿 Green deployment: 3 servers, health checks passing',
        delay: 700
      },
      {
        id: 'dp-18',
        type: 'output',
        content: '🔄 Traffic switch: Blue → Green (0 downtime)',
        delay: 800
      },
      {
        id: 'dp-19',
        type: 'output',
        content: '📈 Monitoring: Response time <200ms, error rate 0%',
        delay: 700
      },
      {
        id: 'dp-20',
        type: 'agent_handoff',
        content: 'Handoff to @analyst → Deployment complete, monitoring metrics',
        delay: 1000
      },
      {
        id: 'dp-21',
        type: 'command',
        content: '@analyst Validate deployment success metrics',
        delay: 1200
      },
      {
        id: 'dp-22',
        type: 'agent_thinking',
        content: 'Analyzing performance metrics... Checking error rates... Monitoring user behavior...',
        agent: { name: 'THE ANALYST', emoji: '📊' },
        delay: 2000
      },
      {
        id: 'dp-23',
        type: 'output',
        content: '⚡ Performance: 98% of requests <500ms',
        delay: 700
      },
      {
        id: 'dp-24',
        type: 'output',
        content: '🔍 Error monitoring: 0.02% error rate (well below 0.1% target)',
        delay: 800
      },
      {
        id: 'dp-25',
        type: 'output',
        content: '👥 User activity: Normal patterns, no drop in engagement',
        delay: 600
      },
      {
        id: 'dp-26',
        type: 'system',
        content: 'Production deployment successful! 🎉',
        delay: 1000
      },
      {
        id: 'dp-27',
        type: 'system',
        content: 'Deployment time: 8 minutes (vs 2+ hours manual)',
        delay: 800
      }
    ]
  }
]

export const getScenarioById = (id: string): CollaborationScenario | undefined => {
  return collaborationScenarios.find(scenario => scenario.id === id)
}

export const getRandomScenario = (): CollaborationScenario => {
  const randomIndex = Math.floor(Math.random() * collaborationScenarios.length)
  return collaborationScenarios[randomIndex]
}