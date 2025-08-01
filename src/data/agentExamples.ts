import { BeforeAfterCodeProps } from '../components/ui/BeforeAfterCode'

export interface AgentExample {
  id: string
  name: string
  emoji: string
  mission: string
  command: string
  description: string
  specialties: string[]
  metrics: { label: string; value: string }[]
  codeExample: {
    language: string
    code: string
    title: string
  }
  beforeAfter?: Omit<BeforeAfterCodeProps, 'className'>
}

export const allAgents: AgentExample[] = [
  {
    id: 'strategist',
    name: 'THE STRATEGIST',
    emoji: '🎯',
    mission: 'Define what to build and why',
    command: '@strategist Create user stories for authentication system',
    description: 'Elite product strategy specialist. Rapid MVP definition, user stories in INVEST format, laser focus on shipping.',
    specialties: ['Product Strategy', 'User Stories', 'MVP Definition', 'Market Research'],
    metrics: [
      { label: 'Features Defined', value: '247' },
      { label: 'MVP Success Rate', value: '94%' }
    ],
    codeExample: {
      language: 'markdown',
      title: 'User Stories Output',
      code: `# User Authentication Stories

## Epic: Secure User Access
**Value**: Enable users to securely access personalized features

### User Stories:
1. **As a** new user **I want to** create an account **so that** I can save my preferences
   - Acceptance: Email validation, password strength check
   - Effort: 3 points
   - Priority: P0 (Must Have)

2. **As a** returning user **I want to** log in quickly **so that** I can access my dashboard
   - Acceptance: Remember me option, error handling
   - Effort: 2 points
   - Priority: P0 (Must Have)

## Definition of Done:
✅ Secure password hashing (bcrypt, 12+ rounds)
✅ Email verification flow implemented
✅ Rate limiting protection (5 attempts/15min)
✅ Session management with JWT
✅ Password reset functionality`
    }
  },
  {
    id: 'developer',
    name: 'THE DEVELOPER',
    emoji: '💻',
    mission: 'Build it fast and right',
    command: '@developer Implement authentication based on requirements',
    description: 'Elite full-stack engineer. Ships clean, working code fast. Balances speed with quality.',
    specialties: ['Full-Stack Dev', 'Clean Code', 'Problem Solving', 'API Design'],
    metrics: [
      { label: 'Lines of Code', value: '89K+' },
      { label: 'Bug Rate', value: '<2%' }
    ],
    codeExample: {
      language: 'typescript',
      title: 'Authentication Service',
      code: `// Authentication Implementation
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { rateLimit } from 'express-rate-limit'

export class AuthService {
  private readonly saltRounds = 12
  private readonly jwtSecret = process.env.JWT_SECRET!

  async register(email: string, password: string) {
    // Validate input
    if (!this.isValidEmail(email)) {
      throw new ValidationError('Invalid email format')
    }
    
    if (!this.isStrongPassword(password)) {
      throw new ValidationError('Password requirements not met')
    }
    
    // Check if user exists
    const existingUser = await this.userRepo.findByEmail(email)
    if (existingUser) {
      throw new ConflictError('User already exists')
    }
    
    // Hash password securely
    const hashedPassword = await bcrypt.hash(password, this.saltRounds)
    
    // Create user
    const user = await this.userRepo.create({
      email,
      password: hashedPassword,
      verified: false,
      createdAt: new Date()
    })
    
    // Send verification email
    await this.emailService.sendVerification(user)
    
    return { success: true, userId: user.id }
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email)
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new AuthError('Invalid credentials')
    }

    const token = jwt.sign({ userId: user.id }, this.jwtSecret, { expiresIn: '7d' })
    return { token, user: this.sanitizeUser(user) }
  }
}`
    },
    beforeAfter: {
      beforeCode: `// Basic auth (insecure)
app.post('/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email)
  if (user && user.password === password) {
    res.json({ success: true })
  } else {
    res.status(401).json({ error: 'Invalid credentials' })
  }
})`,
      afterCode: `// Production-ready auth
app.post('/login', rateLimit, async (req, res) => {
  try {
    const { email, password } = await validateInput(req.body)
    const result = await authService.login(email, password)
    
    // Set secure cookie
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    
    res.json({ success: true, user: result.user })
  } catch (error) {
    logger.error('Login failed:', error)
    res.status(401).json({ error: 'Authentication failed' })
  }
})`,
      language: 'typescript',
      improvements: [
        '🔒 Secure password hashing with bcrypt',
        '⚡ Rate limiting to prevent brute force',
        '🍪 Secure HTTP-only cookies',
        '📝 Proper error handling and logging',
        '✅ Input validation and sanitization'
      ]
    }
  },
  {
    id: 'tester',
    name: 'THE TESTER',
    emoji: '✅',
    mission: 'Ensure quality without slowing down',
    command: '@tester Create comprehensive test suite for authentication',
    description: 'Elite QA specialist. Finds bugs before users do, automates everything possible.',
    specialties: ['Test Automation', 'Bug Detection', 'Edge Cases', 'Performance Testing'],
    metrics: [
      { label: 'Tests Written', value: '3.2K+' },
      { label: 'Bug Prevention', value: '98%' }
    ],
    codeExample: {
      language: 'typescript',
      title: 'Authentication Test Suite',
      code: `// Comprehensive Authentication Tests
describe('AuthService', () => {
  describe('Registration', () => {
    it('should create user with valid credentials', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePass123!'
      }
      
      const result = await authService.register(userData.email, userData.password)
      
      expect(result.success).toBe(true)
      expect(result.userId).toBeDefined()
      
      // Verify password is hashed
      const user = await userRepo.findById(result.userId)
      expect(user.password).not.toBe(userData.password)
      expect(user.password).toMatch(/^\$2[aby]\$/)
    })
    
    it('should reject weak passwords', async () => {
      const weakPasswords = ['123', 'password', 'abc123']
      
      for (const password of weakPasswords) {
        await expect(
          authService.register('test@example.com', password)
        ).rejects.toThrow('Password requirements not met')
      }
    })
    
    it('should prevent duplicate registrations', async () => {
      const email = 'duplicate@example.com'
      
      await authService.register(email, 'SecurePass123!')
      
      await expect(
        authService.register(email, 'AnotherPass456!')
      ).rejects.toThrow('User already exists')
    })
  })

  describe('Login Security', () => {
    it('should rate limit login attempts', async () => {
      const invalidCreds = { email: 'test@example.com', password: 'wrong' }
      
      // Attempt 6 logins (rate limit is 5)
      const attempts = Array(6).fill(null).map(() => 
        authService.login(invalidCreds.email, invalidCreds.password)
      )
      
      const results = await Promise.allSettled(attempts)
      const rateLimitedAttempts = results.filter(r => 
        r.status === 'rejected' && 
        r.reason.message.includes('rate limit')
      )
      
      expect(rateLimitedAttempts.length).toBeGreaterThan(0)
    })
    
    it('should not leak user existence through timing', async () => {
      const validEmail = 'exists@example.com'
      const invalidEmail = 'notfound@example.com'
      
      await userRepo.create({ email: validEmail, password: 'hashed' })
      
      const start1 = Date.now()
      await expect(authService.login(validEmail, 'wrong')).rejects.toThrow()
      const time1 = Date.now() - start1
      
      const start2 = Date.now()
      await expect(authService.login(invalidEmail, 'wrong')).rejects.toThrow()
      const time2 = Date.now() - start2
      
      // Timing difference should be minimal
      expect(Math.abs(time1 - time2)).toBeLessThan(50)
    })
  })
})`
    }
  },
  {
    id: 'operator',
    name: 'THE OPERATOR',
    emoji: '🚀',
    mission: 'Deploy with confidence',
    command: '@operator Set up CI/CD pipeline for authentication service',
    description: 'Elite DevOps specialist. Makes deployments boring (reliable), automates everything.',
    specialties: ['CI/CD', 'Infrastructure', 'Monitoring', 'Security'],
    metrics: [
      { label: 'Deployments', value: '1.8K+' },
      { label: 'Uptime', value: '99.97%' }
    ],
    codeExample: {
      language: 'yaml',
      title: 'Production CI/CD Pipeline',
      code: `# .github/workflows/deploy.yml
name: Deploy Authentication Service

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'
  REGISTRY: ghcr.io

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
        
      - name: Run type checking
        run: npm run type-check
        
      - name: Run unit tests
        run: npm run test:unit -- --coverage
        
      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/test
          
      - name: Run security audit
        run: npm audit --audit-level high
        
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}

  deploy:
    needs: [test, security]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
        
      - name: Deploy to staging
        run: |
          echo "🚀 Deploying to staging environment"
          # Deployment commands here
          
      - name: Run smoke tests
        run: |
          curl -f https://staging-api.yourapp.com/health
          npm run test:smoke
          
      - name: Deploy to production
        run: |
          echo "✅ Staging tests passed"
          echo "🚀 Deploying to production"
          # Blue-green deployment
          
      - name: Verify production deployment
        run: |
          sleep 30  # Allow deployment to settle
          curl -f https://api.yourapp.com/health
          echo "✅ Production deployment verified"`
    }
  },
  {
    id: 'architect',
    name: 'THE ARCHITECT',
    emoji: '🏗️',
    mission: 'Design systems that scale',
    command: '@architect Design microservices architecture for our platform',
    description: 'Elite system design specialist. Makes technical decisions that scale, chooses proven technologies.',
    specialties: ['System Design', 'Scalability', 'API Architecture', 'Database Design'],
    metrics: [
      { label: 'Systems Designed', value: '67' },
      { label: 'Scale Factor', value: '100x+' }
    ],
    codeExample: {
      language: 'typescript',
      title: 'Scalable API Architecture',
      code: `// Microservices Architecture Design
interface ServiceArchitecture {
  // API Gateway Pattern
  gateway: {
    routes: APIRoute[]
    middleware: Middleware[]
    rateLimit: RateLimitConfig
    authentication: AuthConfig
  }
  
  // Service Mesh
  services: {
    auth: AuthService
    user: UserService  
    payment: PaymentService
    notification: NotificationService
  }
  
  // Data Layer
  databases: {
    primary: PostgreSQLCluster
    cache: RedisCluster
    analytics: ClickHouseCluster
  }
}

// Event-Driven Architecture
export class EventBus {
  private publishers = new Map<string, EventPublisher>()
  private subscribers = new Map<string, EventSubscriber[]>()
  
  async publish<T>(event: DomainEvent<T>): Promise<void> {
    const publisher = this.publishers.get(event.type)
    if (!publisher) throw new Error(\`No publisher for \${event.type}\`)
    
    // Transactional outbox pattern
    await this.outboxRepo.save({
      eventId: event.id,
      eventType: event.type,
      payload: event.data,
      status: 'pending'
    })
    
    await publisher.publish(event)
  }
  
  subscribe<T>(eventType: string, handler: EventHandler<T>): void {
    const subscribers = this.subscribers.get(eventType) || []
    subscribers.push({ handler, retry: 3, dlq: true })
    this.subscribers.set(eventType, subscribers)
  }
}

// Database Design with Read Replicas
export class DatabaseCluster {
  constructor(
    private primary: Database,
    private readReplicas: Database[],
    private loadBalancer: LoadBalancer
  ) {}
  
  async read<T>(query: Query): Promise<T[]> {
    // Route reads to replicas
    const replica = this.loadBalancer.selectReplica(this.readReplicas)
    return replica.execute(query)
  }
  
  async write<T>(command: Command): Promise<T> {
    // All writes go to primary
    return this.primary.execute(command)
  }
}`
    }
  },
  {
    id: 'designer',
    name: 'THE DESIGNER',
    emoji: '🎨',
    mission: 'Create interfaces that convert',
    command: '@designer Design a high-converting landing page',
    description: 'Elite UX/UI specialist. Creates beautiful AND functional interfaces, designs for conversion.',
    specialties: ['UX Design', 'UI Systems', 'Conversion Optimization', 'Accessibility'],
    metrics: [
      { label: 'Designs Created', value: '420+' },
      { label: 'Conversion Lift', value: '+73%' }
    ],
    codeExample: {
      language: 'css',
      title: 'Design System Implementation',
      code: `/* Design System - Component Library */
:root {
  /* Color Tokens */
  --color-primary-50: #eff6ff;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-900: #1e3a8a;
  
  /* Typography Scale */
  --font-size-xs: 0.75rem;   /* 12px */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-base: 1rem;    /* 16px */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-size-xl: 1.25rem;   /* 20px */
  --font-size-2xl: 1.5rem;   /* 24px */
  
  /* Spacing System */
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

/* Component: CTA Button */
.btn-primary {
  /* Visual Design */
  background: linear-gradient(135deg, var(--color-primary-500), var(--color-primary-600));
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: var(--space-4) var(--space-6);
  
  /* Typography */
  font-family: 'Inter', system-ui, sans-serif;
  font-size: var(--font-size-base);
  font-weight: 600;
  line-height: 1.5;
  
  /* Interactive States */
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-sm);
  
  /* Accessibility */
  min-height: 44px; /* Touch target size */
  outline-offset: 2px;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
}

.btn-primary:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* Component: Card with Conversion Optimization */
.conversion-card {
  background: white;
  border-radius: 1rem;
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
  border: 1px solid rgb(0 0 0 / 0.05);
  
  /* Micro-interactions */
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.conversion-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04);
}

/* Responsive Design */
@media (max-width: 768px) {
  .btn-primary {
    width: 100%;
    padding: var(--space-4);
  }
  
  .conversion-card {
    padding: var(--space-6);
    margin: var(--space-4);
  }
}`
    }
  },
  {
    id: 'documenter',
    name: 'THE DOCUMENTER',
    emoji: '📚',
    mission: 'Create docs that developers read',
    command: '@documenter Create comprehensive API documentation',
    description: 'Elite technical writer. Creates documentation that developers actually read and users understand.',
    specialties: ['API Docs', 'User Guides', 'Technical Writing', 'Knowledge Management'],
    metrics: [
      { label: 'Docs Written', value: '890+' },
      { label: 'User Satisfaction', value: '4.8/5' }
    ],
    codeExample: {
      language: 'markdown',
      title: 'API Documentation Example',
      code: `# Authentication API

## Overview
The Authentication API provides secure user registration, login, and session management capabilities. All endpoints use HTTPS and implement rate limiting for security.

## Base URL
\`\`\`
https://api.yourapp.com/v1/auth
\`\`\`

## Authentication
Most endpoints require a valid JWT token in the Authorization header:
\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

## Rate Limits
- Registration: 5 requests per hour per IP
- Login: 10 requests per 15 minutes per IP
- Other endpoints: 100 requests per minute per user

## Endpoints

### POST /register
Creates a new user account.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe"
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "success": true,
  "userId": "usr_1234567890",
  "message": "Verification email sent to user@example.com"
}
\`\`\`

**Validation Rules:**
- Email: Must be valid format, max 254 characters
- Password: Min 8 characters, must include uppercase, lowercase, number, and symbol
- Names: Max 50 characters each, letters and spaces only

**Error Responses:**
\`\`\`json
// 400 - Validation Error
{
  "error": "VALIDATION_ERROR",
  "message": "Password does not meet requirements",
  "details": {
    "field": "password",
    "requirements": [
      "Minimum 8 characters",
      "At least one uppercase letter",
      "At least one number",
      "At least one symbol"
    ]
  }
}

// 409 - User Already Exists
{
  "error": "USER_EXISTS",
  "message": "An account with this email already exists"
}

// 429 - Rate Limited
{
  "error": "RATE_LIMITED",
  "message": "Too many registration attempts. Try again in 1 hour.",
  "retryAfter": 3600
}
\`\`\`

### POST /login
Authenticates a user and returns a JWT token.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "rememberMe": true
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "usr_1234567890",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "verified": true
  },
  "expiresIn": 604800
}
\`\`\`

## SDK Examples

### JavaScript/Node.js
\`\`\`javascript
import { AuthClient } from '@yourapp/sdk'

const auth = new AuthClient('https://api.yourapp.com/v1')

// Register a new user
try {
  const result = await auth.register({
    email: 'user@example.com',
    password: 'SecurePassword123!',
    firstName: 'John',
    lastName: 'Doe'
  })
  console.log('User created:', result.userId)
} catch (error) {
  console.error('Registration failed:', error.message)
}

// Login
try {
  const session = await auth.login({
    email: 'user@example.com',
    password: 'SecurePassword123!'
  })
  
  // Token is automatically stored and used for subsequent requests
  console.log('Logged in as:', session.user.email)
} catch (error) {
  console.error('Login failed:', error.message)
}
\`\`\`

### Python
\`\`\`python
from yourapp_sdk import AuthClient

auth = AuthClient("https://api.yourapp.com/v1")

# Register a new user
try:
    result = auth.register(
        email="user@example.com",
        password="SecurePassword123!",
        first_name="John",
        last_name="Doe"
    )
    print(f"User created: {result['userId']}")
except AuthError as e:
    print(f"Registration failed: {e.message}")
\`\`\`

## Testing
Use our sandbox environment for testing:
\`\`\`
https://sandbox-api.yourapp.com/v1/auth
\`\`\`

Test credentials:
- Email: test@yourapp.com
- Password: TestPassword123!

## Support
- 📧 Email: api-support@yourapp.com
- 💬 Discord: https://discord.gg/yourapp
- 📖 More docs: https://docs.yourapp.com`
    }
  },
  {
    id: 'support',
    name: 'THE SUPPORT',
    emoji: '💬',
    mission: 'Turn problems into satisfied customers',
    command: '@support Help user resolve authentication issues',
    description: 'Elite customer success specialist. Solves user problems with empathy and efficiency.',
    specialties: ['Customer Success', 'Issue Resolution', 'User Education', 'Feedback Analysis'],
    metrics: [
      { label: 'Tickets Resolved', value: '4.7K+' },
      { label: 'Satisfaction Score', value: '4.9/5' }
    ],
    codeExample: {
      language: 'markdown',
      title: 'Customer Support Response',
      code: `# Support Ticket #12345: Login Issues on Mobile

## Issue Summary
User reports inability to log in on iPhone 13, getting "Network Error" message.

## Investigation Steps

### 1. Environment Check
- Device: iPhone 13 Pro, iOS 16.4
- App Version: 2.1.3
- Network: WiFi + Cellular tested
- Account Status: ✅ Active, ✅ Verified

### 2. Reproduction Attempt
- [x] Tested on same device model ✅ Reproduced
- [x] Tested on Android ✅ Works fine
- [x] Tested on web browser ✅ Works fine

### 3. Root Cause Analysis
Found: iOS app version 2.1.3 has a bug with TLS 1.3 connections on certain iOS versions.

## Resolution

### Immediate Fix (for user)
\`\`\`
Hi Sarah,

Thanks for reporting this login issue! I've identified the problem and have a quick fix for you:

**Option 1: Update the app (Recommended)**
1. Open the App Store
2. Search for "[Your App]"
3. Tap "Update" - version 2.1.4 fixes this exact issue

**Option 2: Temporary workaround**
1. Settings → General → iPhone Storage
2. Find "[Your App]" → Offload App
3. Reinstall from App Store

This affects iPhone 13 users specifically on iOS 16.4. We released a fix last week, and over 90% of users have already updated successfully.

Let me know if you need any help with the update process!

Best regards,
Alex from Support Team
\`\`\`

### Technical Follow-up
- Bug tracked in ticket #DEV-891
- Fix deployed in version 2.1.4
- Added automated testing for iOS-specific network issues
- Updated monitoring to catch similar issues faster

## Prevention Measures
1. Enhanced mobile testing matrix
2. Added network condition testing
3. Improved error messages for connection issues
4. Created user guide for common mobile issues

## Impact Analysis
- Affected: ~450 iPhone 13 users on iOS 16.4
- Resolution time: < 24 hours
- User satisfaction: 5/5 (follow-up survey)
- Prevention: Automated tests added to CI/CD

## Knowledge Base Update
Added new article: "Troubleshooting Mobile Login Issues"
- Common symptoms and solutions
- Platform-specific fixes
- When to contact support vs. self-service`
    }
  },
  {
    id: 'analyst',
    name: 'THE ANALYST',
    emoji: '📊',
    mission: 'Turn data into growth decisions',
    command: '@analyst Analyze user behavior and recommend optimizations',
    description: 'Elite data specialist. Finds insights that drive growth, measures what matters.',
    specialties: ['Data Analysis', 'Growth Metrics', 'A/B Testing', 'Business Intelligence'],
    metrics: [
      { label: 'Reports Generated', value: '1.2K+' },
      { label: 'Revenue Impact', value: '+$2.4M' }
    ],
    codeExample: {
      language: 'python',
      title: 'User Behavior Analysis',
      code: `# User Behavior Analysis & Growth Insights
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import plotly.graph_objects as go
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

class UserAnalytics:
    def __init__(self, db_connection):
        self.db = db_connection
        
    def analyze_funnel_conversion(self, date_range: tuple) -> dict:
        """Analyze conversion funnel and identify drop-off points"""
        
        query = """
        WITH funnel_data AS (
            SELECT 
                user_id,
                MIN(CASE WHEN event_type = 'landing' THEN created_at END) as landed,
                MIN(CASE WHEN event_type = 'signup_start' THEN created_at END) as signup_started,
                MIN(CASE WHEN event_type = 'signup_complete' THEN created_at END) as signup_completed,
                MIN(CASE WHEN event_type = 'first_action' THEN created_at END) as first_action,
                MIN(CASE WHEN event_type = 'conversion' THEN created_at END) as converted
            FROM user_events 
            WHERE created_at BETWEEN %s AND %s
            GROUP BY user_id
        )
        SELECT 
            COUNT(*) as total_visitors,
            COUNT(signup_started) as signup_starts,
            COUNT(signup_completed) as signups,
            COUNT(first_action) as activated_users,
            COUNT(converted) as conversions,
            AVG(EXTRACT(EPOCH FROM (signup_completed - signup_started))/60) as avg_signup_time_minutes
        FROM funnel_data
        WHERE landed IS NOT NULL
        """
        
        result = pd.read_sql(query, self.db, params=date_range)
        
        # Calculate conversion rates
        funnel = {
            'visitors': int(result['total_visitors'].iloc[0]),
            'signup_starts': int(result['signup_starts'].iloc[0]),
            'signups': int(result['signups'].iloc[0]),
            'activated': int(result['activated_users'].iloc[0]),
            'conversions': int(result['conversions'].iloc[0])
        }
        
        # Conversion rates between stages
        rates = {
            'visitor_to_signup_start': funnel['signup_starts'] / funnel['visitors'] * 100,
            'signup_completion': funnel['signups'] / funnel['signup_starts'] * 100,
            'activation_rate': funnel['activated'] / funnel['signups'] * 100,
            'conversion_rate': funnel['conversions'] / funnel['activated'] * 100
        }
        
        return {
            'funnel': funnel,
            'conversion_rates': rates,
            'avg_signup_time': float(result['avg_signup_time_minutes'].iloc[0]),
            'recommendations': self._get_funnel_recommendations(rates)
        }
    
    def perform_cohort_analysis(self, months_back: int = 12) -> pd.DataFrame:
        """Perform cohort analysis to understand user retention"""
        
        query = """
        WITH user_cohorts AS (
            SELECT 
                user_id,
                DATE_TRUNC('month', created_at) as cohort_month,
                created_at as first_action
            FROM users 
            WHERE created_at >= CURRENT_DATE - INTERVAL '%s months'
        ),
        user_activities AS (
            SELECT 
                u.user_id,
                u.cohort_month,
                DATE_TRUNC('month', e.created_at) as activity_month,
                EXTRACT(MONTH FROM AGE(e.created_at, u.first_action)) as month_number
            FROM user_cohorts u
            JOIN user_events e ON u.user_id = e.user_id
            WHERE e.event_type IN ('login', 'action', 'purchase')
        )
        SELECT 
            cohort_month,
            month_number,
            COUNT(DISTINCT user_id) as active_users
        FROM user_activities
        GROUP BY cohort_month, month_number
        ORDER BY cohort_month, month_number
        """
        
        df = pd.read_sql(query, self.db, params=(months_back,))
        
        # Pivot to create cohort table
        cohort_table = df.pivot(index='cohort_month', 
                               columns='month_number', 
                               values='active_users')
        
        # Calculate cohort sizes (month 0)
        cohort_sizes = cohort_table.iloc[:, 0]
        
        # Calculate retention rates
        retention_table = cohort_table.divide(cohort_sizes, axis=0)
        
        return retention_table
    
    def identify_power_users(self) -> pd.DataFrame:
        """Identify and analyze power users using clustering"""
        
        query = """
        SELECT 
            user_id,
            COUNT(*) as total_actions,
            COUNT(DISTINCT DATE(created_at)) as active_days,
            AVG(session_duration_minutes) as avg_session_duration,
            COUNT(CASE WHEN event_type = 'purchase' THEN 1 END) as purchases,
            SUM(CASE WHEN event_type = 'purchase' THEN amount ELSE 0 END) as total_spent
        FROM user_events 
        WHERE created_at >= CURRENT_DATE - INTERVAL '90 days'
        GROUP BY user_id
        HAVING COUNT(*) >= 10  -- Filter out inactive users
        """
        
        df = pd.read_sql(query, self.db)
        
        # Prepare features for clustering
        features = ['total_actions', 'active_days', 'avg_session_duration', 
                   'purchases', 'total_spent']
        
        # Normalize features
        scaler = StandardScaler()
        scaled_features = scaler.fit_transform(df[features])
        
        # Perform K-means clustering
        kmeans = KMeans(n_clusters=4, random_state=42)
        df['user_segment'] = kmeans.fit_predict(scaled_features)
        
        # Label segments
        segment_labels = {
            0: 'Casual Users',
            1: 'Regular Users', 
            2: 'Power Users',
            3: 'VIP Users'
        }
        df['segment_name'] = df['user_segment'].map(segment_labels)
        
        return df
    
    def generate_growth_report(self) -> dict:
        """Generate comprehensive growth report with actionable insights"""
        
        # Get current period metrics
        current_metrics = self.get_period_metrics(30)  # Last 30 days
        previous_metrics = self.get_period_metrics(30, offset=30)  # Previous 30 days
        
        # Calculate growth rates
        growth_rates = {}
        for metric in current_metrics:
            if previous_metrics[metric] > 0:
                growth_rates[metric] = ((current_metrics[metric] - previous_metrics[metric]) 
                                      / previous_metrics[metric] * 100)
        
        # A/B test results
        ab_results = self.get_active_ab_tests()
        
        # Generate recommendations
        recommendations = self._generate_recommendations(
            current_metrics, growth_rates, ab_results
        )
        
        return {
            'period': '30 days',
            'current_metrics': current_metrics,
            'growth_rates': growth_rates,
            'ab_test_results': ab_results,
            'recommendations': recommendations,
            'generated_at': datetime.now().isoformat()
        }
    
    def _generate_recommendations(self, metrics: dict, growth: dict, ab_results: list) -> list:
        """Generate actionable recommendations based on data"""
        
        recommendations = []
        
        # Conversion rate recommendations
        if growth.get('conversion_rate', 0) < 5:
            recommendations.append({
                'priority': 'HIGH',
                'category': 'Conversion',
                'title': 'Optimize signup flow',
                'description': 'Conversion rate is below target. Consider A/B testing simplified signup process.',
                'expected_impact': '+15-25% conversion rate',
                'effort': 'Medium'
            })
        
        # Retention recommendations
        if metrics.get('day_7_retention', 0) < 25:
            recommendations.append({
                'priority': 'HIGH', 
                'category': 'Retention',
                'title': 'Improve onboarding experience',
                'description': 'Low 7-day retention suggests users aren\'t seeing value quickly.',
                'expected_impact': '+10-20% retention',
                'effort': 'High'
            })
        
        # Growth recommendations based on successful A/B tests
        for test in ab_results:
            if test['status'] == 'winner' and test['lift'] > 10:
                recommendations.append({
                    'priority': 'MEDIUM',
                    'category': 'Growth',
                    'title': f'Roll out {test["name"]} to all users',
                    'description': f'A/B test shows {test["lift"]:.1f}% improvement',
                    'expected_impact': f'+{test["lift"]:.1f}% {test["metric"]}',
                    'effort': 'Low'
                })
        
        return recommendations

# Usage Example
analyzer = UserAnalytics(db_connection)

# Generate weekly growth report
report = analyzer.generate_growth_report()
print(f"📊 Growth Report - {report['period']}")
print(f"🔥 Key Wins: {len([r for r in report['recommendations'] if r['priority'] == 'HIGH'])} high-impact opportunities")

# Identify optimization opportunities
funnel_analysis = analyzer.analyze_funnel_conversion(
    (datetime.now() - timedelta(days=30), datetime.now())
)

print(f"🎯 Conversion Funnel:")
print(f"   Visitor → Signup: {funnel_analysis['conversion_rates']['visitor_to_signup_start']:.1f}%")
print(f"   Signup → Active: {funnel_analysis['conversion_rates']['activation_rate']:.1f}%")
print(f"   Active → Convert: {funnel_analysis['conversion_rates']['conversion_rate']:.1f}%")`
    }
  },
  {
    id: 'marketer',
    name: 'THE MARKETER',
    emoji: '📈',
    mission: 'Acquire users efficiently',
    command: '@marketer Create a content marketing campaign for our launch',
    description: 'Elite growth specialist. Acquires users efficiently, creates content that converts.',
    specialties: ['Growth Marketing', 'Content Strategy', 'Conversion Copy', 'Campaign Management'],
    metrics: [
      { label: 'Campaigns Run', value: '340+' },
      { label: 'User Acquisition', value: '+125K' }
    ],
    codeExample: {
      language: 'markdown',
      title: 'Content Marketing Campaign Strategy',
      code: `# Product Launch Marketing Campaign: "Ship Faster, Build Better"

## Campaign Overview
**Objective**: Drive 10K signups in 60 days for our AI-powered development platform
**Budget**: $50K
**Timeline**: Q2 2024
**Target**: Solo developers and small startups struggling with development velocity

## Content Pillars

### 1. Educational Content (40% of effort)
**Goal**: Establish thought leadership and provide value

#### Blog Content Calendar
- **Week 1**: "The Hidden Cost of Slow Development" (Problem awareness)
- **Week 2**: "10 Signs Your Development Process Needs Automation" (Self-assessment)
- **Week 3**: "How AI Is Changing Software Development in 2024" (Trend analysis)
- **Week 4**: "Case Study: Startup Shipped MVP 10x Faster with AI" (Social proof)

#### Technical Guides
\`\`\`markdown
# Guide: "From Idea to Production in 48 Hours"

## Introduction
Most solo founders spend months building their MVP. Here's how successful entrepreneurs ship in days, not months.

## The 48-Hour Framework

### Hour 0-8: Validate & Plan
- [ ] Write user stories (use AI templates)
- [ ] Create wireframes (AI-assisted design)
- [ ] Define MVP scope (AI recommendations)

### Hour 8-32: Build
- [ ] Generate boilerplate code
- [ ] Implement core features
- [ ] AI-powered testing
- [ ] Automated deployment

### Hour 32-48: Polish & Launch
- [ ] User feedback integration
- [ ] Performance optimization
- [ ] Launch preparation
- [ ] Marketing site creation

## Tools & Resources
- Free MVP Planning Template
- 48-Hour Build Checklist
- Community Discord for support
\`\`\`

### 2. Social Proof & Case Studies (30% of effort)
**Goal**: Build trust and demonstrate value

#### Success Stories
\`\`\`json
{
  "case_study": {
    "title": "How TaskFlow Went from Idea to $10K MRR in 3 Months",
    "customer": "Sarah Chen, Founder of TaskFlow",
    "challenge": "Spent 8 months building MVP, ran out of runway",
    "solution": "Rebuilt entire app using AI-assisted development",
    "results": {
      "build_time": "2 weeks vs 8 months",
      "code_quality": "90% test coverage automatically",
      "time_to_market": "3 months to $10K MRR",
      "founder_quote": "I wish I had found this tool on day one. I would have had 6 extra months to focus on customers instead of debugging CSS."
    },
    "metrics": {
      "development_speed": "15x faster",
      "bug_reduction": "80% fewer issues",
      "feature_velocity": "3x more features per sprint"
    }
  }
}
\`\`\`

### 3. Community Building (20% of effort)
**Goal**: Create a movement of fast-shipping developers

#### Developer Discord Community
- **#ship-fast-wins**: Daily wins and progress sharing
- **#code-review**: AI-assisted peer reviews
- **#founder-stories**: Weekly founder interviews
- **#ai-development**: Latest AI development techniques

#### Weekly Twitter Spaces
- "Ship Fast Fridays" - Live building sessions
- Guest founders sharing their speed-building stories
- Q&A on AI-assisted development

### 4. Product-Led Growth (10% of effort)
**Goal**: Turn the product into a marketing channel

#### Viral Features
\`\`\`javascript
// Built-in sharing for generated code
export function shareCode(codeSnippet, framework) {
  const shareUrl = generateShareUrl({
    code: codeSnippet,
    framework,
    generatedBy: 'AI-powered development'
  })
  
  return {
    twitter: \`Just generated this \${framework} code in seconds with AI! \${shareUrl} #ShipFast #AIdev\`,
    linkedin: \`AI-generated \${framework} code that actually works. The future of development is here. \${shareUrl}\`,
    discord: \`Check out this clean \${framework} code I just generated: \${shareUrl}\`
  }
}
\`\`\`

## Channel Strategy

### Organic Channels (70% of traffic goal)

#### Twitter/X Strategy
- **Daily tweets**: Development tips, AI insights, startup lessons
- **Thread series**: "Building in Public" documenting our own product development
- **Engagement**: Reply to developer pain points with helpful solutions
- **Hashtags**: #ShipFast #AIdev #BuildInPublic #SoloFounder

#### Developer Communities
- **Dev.to**: Weekly technical articles with practical examples
- **Reddit**: r/startups, r/webdev, r/artificial (value-first approach)
- **IndieHackers**: Share building journey and metrics
- **Hacker News**: High-quality, controversial takes on AI in development

#### SEO Content
- **Target keywords**: "AI code generation", "fast MVP development", "solo founder tools"
- **Long-tail**: "how to build MVP in one day", "AI tools for developers 2024"

### Paid Channels (30% of traffic goal)

#### Twitter Ads
- **Audience**: Developers following @levelsio, @zenorocha, @kentcdodds
- **Creative**: Video testimonials from successful customers
- **Budget**: $1K/week, optimize for email signups

#### Google Ads
- **Keywords**: "rapid prototyping tools", "AI development platform"
- **Landing pages**: Framework-specific (React, Next.js, Python)
- **Budget**: $2K/week, optimize for free trial starts

## Content Calendar (Week 1-4)

\`\`\`yaml
Week_1:
  Monday:
    - Blog: "The Hidden Cost of Slow Development"
    - Twitter: Thread on developer productivity stats
    - Email: Welcome series email 1
  
  Wednesday:
    - Case study: TaskFlow success story
    - LinkedIn: Founder interview post
    - Discord: Community challenge launch
  
  Friday:
    - Twitter Spaces: "Ship Fast Friday #1"
    - Blog: Technical tutorial
    - Product hunt: Soft launch preparation

Week_2:
  Monday:
    - Blog: "10 Signs Your Development Process Needs Automation"
    - Twitter: Poll on biggest development pain points
    - Email: Welcome series email 2
  
  Wednesday:
    - YouTube: "Building a React App in 30 Minutes with AI"
    - Reddit: Share development insights
    - Discord: Featured community win
  
  Friday:
    - Twitter Spaces: Founder interview
    - Blog: AI development trends
    - Newsletter: Weekly roundup
\`\`\`

## Success Metrics & KPIs

### Primary Metrics
- **Signups**: 10,000 in 60 days (167/day average)
- **Qualified leads**: 2,000 (20% of signups)
- **Trial-to-paid**: 15% conversion rate
- **CAC**: <$20 per signup

### Content Metrics
- **Blog traffic**: 50K monthly visitors
- **Email subscribers**: 15K by end of campaign
- **Twitter followers**: +5K in 60 days
- **Discord members**: 2K active community members

### Engagement Metrics
- **Email open rate**: >35%
- **Blog avg time on page**: >3 minutes
- **Twitter engagement rate**: >5%
- **Community daily active users**: >200

## Budget Allocation

\`\`\`json
{
  "total_budget": 50000,
  "allocation": {
    "paid_ads": {
      "twitter_ads": 8000,
      "google_ads": 16000,
      "linkedin_ads": 4000
    },
    "content_creation": {
      "video_production": 6000,
      "graphic_design": 3000,
      "copywriting": 4000
    },
    "tools_and_software": {
      "social_media_management": 1000,
      "analytics_tools": 1000,
      "email_marketing": 1000
    },
    "influencer_partnerships": 4000,
    "events_and_sponsorships": 2000
  }
}
\`\`\`

## Success Predictions
Based on similar campaigns and market research:

- **Conservative**: 8K signups, $15 CAC
- **Realistic**: 10K signups, $12 CAC  
- **Optimistic**: 15K signups, $8 CAC

## Next Steps
1. **Week -2**: Finalize content calendar and design assets
2. **Week -1**: Set up tracking, launch email sequences
3. **Week 0**: Soft launch to existing audience
4. **Week 1**: Full campaign launch
5. **Weekly**: Optimize based on performance data

---

*"The best marketing doesn't feel like marketing. It feels like value."*`
    }
  },
  {
    id: 'coordinator',
    name: 'THE COORDINATOR',
    emoji: '🎖️',
    mission: 'Orchestrate complex operations',
    command: '@coordinator Orchestrate a full product launch with all agents',
    description: 'Elite mission commander. Orchestrates complex operations, manages multi-agent missions.',
    specialties: ['Project Management', 'Team Coordination', 'Mission Planning', 'Resource Allocation'],
    metrics: [
      { label: 'Missions Completed', value: '890+' },
      { label: 'Success Rate', value: '97.2%' }
    ],
    codeExample: {
      language: 'yaml',
      title: 'Multi-Agent Mission Orchestration',
      code: `# Mission: Full Product Launch Orchestration
# Timeline: 14 days | Complexity: High | Agents: 11

mission_config:
  name: "Agent-11 Platform Launch"
  timeline: "14 days"
  success_criteria:
    - Landing page live with 95+ PageSpeed score
    - 10K+ signups in first week
    - Zero critical bugs in production
    - Press coverage in 3+ major publications
    - User satisfaction > 4.5/5

# Phase 1: Strategic Foundation (Days 1-3)
phase_1:
  name: "Strategic Foundation"
  duration: "3 days"
  parallel_execution: true
  
  tasks:
    - agent: strategist
      task: "Define launch strategy and success metrics"
      dependencies: []
      output: "launch_strategy.md"
      
    - agent: analyst 
      task: "Analyze market opportunity and competitor landscape"
      dependencies: []
      output: "market_analysis.json"
      
    - agent: architect
      task: "Review system architecture for launch traffic"
      dependencies: []
      output: "infrastructure_plan.yml"

  coordination_points:
    - daily_standup: "9:00 AM PST"
    - risk_assessment: "Day 2 EOD"
    - go_no_go_decision: "Day 3 EOD"

# Phase 2: Development & Design (Days 4-8)
phase_2:
  name: "Development & Design Sprint"
  duration: "5 days"
  dependencies: ["phase_1"]
  
  parallel_tracks:
    track_1:
      name: "Frontend Development"
      agents: [designer, developer]
      tasks:
        - "Landing page design system"
        - "Interactive demo implementation"
        - "Mobile-responsive optimization"
        - "Performance optimization"
      
    track_2:
      name: "Backend & Infrastructure"
      agents: [developer, operator]
      tasks:
        - "API scaling preparation"
        - "Database optimization"
        - "CDN configuration"
        - "Monitoring setup"
        
    track_3:
      name: "Quality Assurance"
      agents: [tester]
      tasks:
        - "Automated test suite expansion"
        - "Load testing preparation"
        - "Security vulnerability scanning"
        - "Cross-browser testing"

  checkpoints:
    day_5: "Design review and approval"
    day_6: "Core functionality demo"
    day_7: "Performance benchmarks met"
    day_8: "QA sign-off on all features"

# Phase 3: Content & Marketing (Days 6-10)
phase_3:
  name: "Content & Marketing Preparation"
  duration: "5 days"
  dependencies: ["phase_1"]
  overlap_with: ["phase_2"]  # Runs partially in parallel
  
  tasks:
    - agent: marketer
      task: "Launch campaign execution"
      subtasks:
        - "Press kit creation"
        - "Influencer outreach"
        - "Social media campaign"
        - "Email sequences setup"
      
    - agent: documenter
      task: "User-facing documentation"
      subtasks:
        - "Quick start guide"
        - "Video tutorials"
        - "FAQ compilation"
        - "API documentation"
        
    - agent: support
      task: "Customer success preparation"
      subtasks:
        - "Support workflow setup"
        - "Chatbot training"
        - "Knowledge base creation"
        - "Escalation procedures"

# Phase 4: Pre-Launch Testing (Days 9-11)
phase_4:
  name: "Pre-Launch Validation"
  duration: "3 days"
  dependencies: ["phase_2", "phase_3"]
  
  validation_matrix:
    technical_validation:
      - agent: tester
        checklist:
          - "Load testing: 10K concurrent users ✓"
          - "Security scan: Zero critical vulnerabilities ✓"
          - "Browser compatibility: 99%+ coverage ✓"
          - "Mobile responsiveness: All devices ✓"
    
    business_validation:
      - agent: strategist
        checklist:
          - "User journey optimization ✓"
          - "Conversion funnel validated ✓"
          - "Success metrics tracking active ✓"
          - "A/B test framework ready ✓"
    
    operational_validation:
      - agent: operator
        checklist:
          - "Deployment pipeline tested ✓"
          - "Rollback procedures verified ✓"
          - "Monitoring alerts configured ✓"
          - "Scaling automation active ✓"

# Phase 5: Launch Execution (Days 12-14)
phase_5:
  name: "Launch & Optimization"
  duration: "3 days"
  dependencies: ["phase_4"]
  
  launch_sequence:
    day_12:
      - "08:00": "Final system checks (operator)"
      - "09:00": "Soft launch to beta users (coordinator)"
      - "10:00": "Monitor initial metrics (analyst)"
      - "12:00": "Go/no-go for public launch (coordinator)"
      - "14:00": "Public launch announcement (marketer)"
      - "16:00": "Press outreach begins (marketer)"
      
    day_13:
      - "09:00": "Daily metrics review (analyst)"
      - "10:00": "Customer feedback analysis (support)"
      - "14:00": "Performance optimization (developer)"
      - "16:00": "Marketing campaign adjustments (marketer)"
      
    day_14:
      - "09:00": "Week 1 results analysis (analyst)"
      - "11:00": "Success criteria evaluation (strategist)"
      - "14:00": "Post-launch retrospective (all agents)"
      - "16:00": "Next phase planning (coordinator)"

# Risk Management
risk_mitigation:
  high_risks:
    - risk: "Performance issues under load"
      owner: "operator"
      mitigation: "Auto-scaling + CDN + load testing"
      contingency: "Emergency scaling protocol"
      
    - risk: "Low conversion rates"
      owner: "marketer"
      mitigation: "A/B tested landing pages"
      contingency: "Rapid iteration on messaging"
      
    - risk: "Technical bugs in production"
      owner: "tester"
      mitigation: "Comprehensive test coverage"
      contingency: "Rapid rollback + hotfix deployment"

# Communication Protocol
communication:
  daily_standups:
    time: "09:00 PST"
    duration: "15 minutes"
    attendees: "all_agents"
    format: "async_first"
    
  escalation_matrix:
    level_1: "Agent lead handles within domain"
    level_2: "Coordinator involvement for cross-agent issues"
    level_3: "Mission pause for critical blockers"
    
  reporting:
    daily: "Progress dashboard auto-updated"
    weekly: "Coordinator summary to stakeholders"
    ad_hoc: "Critical issue alerts via Slack"

# Success Metrics Tracking
metrics_dashboard:
  real_time:
    - "Website uptime and performance"
    - "User signups and conversion rates"
    - "System resource utilization"
    - "Customer support ticket volume"
    
  daily_reports:
    - "Traffic and engagement metrics"
    - "Feature usage analytics"
    - "Customer feedback sentiment"
    - "Revenue and business metrics"
    
  weekly_analysis:
    - "Goal achievement vs targets"
    - "Team performance and velocity"
    - "Budget utilization"
    - "Risk assessment updates"

# Post-Launch Transition
handoff_plan:
  immediate: "24/7 monitoring for first 48 hours"
  week_1: "Daily optimization cycles"
  week_2: "Transition to standard operations"
  month_1: "Full retrospective and lessons learned"`
    }
  }
]

// Core squad (first 4 agents shown by default)
export const coreAgents = allAgents.slice(0, 4)

// Extended squad (remaining 7 agents)
export const extendedAgents = allAgents.slice(4)

// Get agent by ID
export const getAgentById = (id: string) => allAgents.find(agent => agent.id === id)