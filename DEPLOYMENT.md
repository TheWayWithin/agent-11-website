# AGENT-11 Website - Netlify Deployment Guide

## Production Deployment Configuration

This repository is configured for deployment on Netlify with Next.js 15 App Router, optimized for performance and reliability.

### Build Status
- **Bundle Size**: 145kB first load JS (optimized)
- **Static Pages**: 7 pages generated
- **API Routes**: 3 serverless functions
- **Performance**: <2s load time target achieved

## Prerequisites

### 1. Netlify Account Setup
- Create account at [netlify.com](https://netlify.com)
- Connect GitHub repository: `https://github.com/TheWayWithin/agent-11-website.git`

### 2. Domain Configuration
- **Primary Domain**: www.agent-11.com
- **SSL Certificate**: Auto-provisioned by Netlify
- **DNS Configuration**: Point to Netlify nameservers

## Deployment Steps

### Step 1: Connect Repository
1. In Netlify dashboard, click "New site from Git"
2. Choose GitHub and authorize
3. Select repository: `TheWayWithin/agent-11-website`
4. Branch: `main`

### Step 2: Build Configuration
The following settings are automatically configured via `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"
  environment = { NODE_ENV = "production", NEXT_TELEMETRY_DISABLED = "1" }
```

### Step 3: Environment Variables
Configure in Netlify dashboard under Site Settings > Environment Variables:

#### Required Variables
```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

#### Optional Variables (for enhanced performance)
```bash
# GitHub API Token for higher rate limits (5000/hour vs 60/hour)
GITHUB_TOKEN=your_github_personal_access_token

# Repository configuration (uses defaults if not set)
GITHUB_OWNER=TheWayWithin
GITHUB_REPO=agent-11-website
```

### Step 4: Custom Domain Setup
1. In Netlify dashboard: Site Settings > Domain Management
2. Add custom domain: `www.agent-11.com`
3. Configure DNS at your domain registrar:
   - CNAME: `www` → `your-site-name.netlify.app`
   - A Record: `@` → Netlify's IP (or use redirect)

### Step 5: Deploy
1. Trigger deployment by pushing to `main` branch
2. Monitor build logs in Netlify dashboard
3. Verify deployment at temporary Netlify URL
4. Test custom domain after DNS propagation

## Performance Optimizations

### Built-in Optimizations
- **Static Generation**: 7 pages pre-rendered
- **Image Optimization**: Next.js Image component with AVIF/WebP
- **CSS Optimization**: Tailwind CSS purged and minified
- **JavaScript Splitting**: Automatic code splitting
- **Compression**: Gzip/Brotli enabled
- **CDN**: Global edge network

### Caching Strategy
```toml
# Static assets - 1 year cache
Cache-Control: public, max-age=31536000, immutable

# API routes - 5 minutes cache with stale-while-revalidate
Cache-Control: public, max-age=300, stale-while-revalidate=3600
```

## API Routes Configuration

### GitHub API Integration
- **Endpoint**: `/api/github/stats`
- **Rate Limiting**: 60/hour without token, 5000/hour with token
- **Fallback Data**: Serves cached data during rate limits
- **ISR**: Incremental Static Regeneration every 5 minutes

### Serverless Functions
Three API routes are deployed as Netlify Functions:
- `/api/github/stats` - Repository statistics
- `/api/github/contributors` - Contributor data
- `/api/github/activity` - Recent activity feed

## Security Configuration

### Headers Applied
```toml
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### SSL/TLS
- **Automatic HTTPS**: Enabled for all traffic
- **HSTS**: HTTP Strict Transport Security
- **Certificate**: Let's Encrypt auto-renewal

## Monitoring & Maintenance

### Build Monitoring
- **Build Time**: ~30 seconds average
- **Success Rate**: Monitor in Netlify dashboard
- **Error Alerts**: Configure via Netlify notifications

### Performance Monitoring
- **Core Web Vitals**: Monitor via Netlify Analytics
- **Bundle Analysis**: Use `npm run analyze` locally
- **Lighthouse Scores**: Target >95 across all metrics

### GitHub API Monitoring
- **Rate Limits**: Tracked in API responses
- **Fallback System**: Automatic failover to cached data
- **Health Checks**: API status monitoring

## Troubleshooting

### Common Issues

#### Build Failures
1. **Node Version**: Ensure Node 18+ (configured in netlify.toml)
2. **Dependencies**: Run `npm install` locally to test
3. **TypeScript Errors**: Run `npm run type-check`
4. **Lint Errors**: Run `npm run lint`

#### Runtime Issues
1. **API Rate Limits**: Add GITHUB_TOKEN environment variable
2. **Image Loading**: Verify GitHub domains in next.config.js
3. **CORS Errors**: Check API route configurations

#### Performance Issues
1. **Bundle Size**: Use `npm run analyze` to identify large dependencies
2. **Slow Loading**: Check Netlify Analytics for bottlenecks
3. **Cache Issues**: Clear Netlify cache via dashboard

### Support Resources
- **Netlify Documentation**: [docs.netlify.com](https://docs.netlify.com)
- **Next.js on Netlify**: [@netlify/plugin-nextjs](https://github.com/netlify/netlify-plugin-nextjs)
- **GitHub API**: [docs.github.com/rest](https://docs.github.com/rest)

## Rollback Procedure

### Automatic Rollback
Netlify provides instant rollback via dashboard:
1. Go to Site Overview > Deploys
2. Find previous successful deploy
3. Click "Publish deploy"

### Manual Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force origin main
```

## Production Checklist

### Pre-Deployment
- [ ] Local build succeeds (`npm run build`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Environment variables configured
- [ ] Domain DNS configured

### Post-Deployment
- [ ] Site loads at www.agent-11.com
- [ ] SSL certificate active
- [ ] API endpoints functional
- [ ] GitHub integration working
- [ ] Performance targets met (<2s load time)
- [ ] Core Web Vitals >90

### Ongoing Maintenance
- [ ] Monitor build status
- [ ] Check API rate limits
- [ ] Review performance metrics
- [ ] Update dependencies monthly
- [ ] Security headers audit quarterly

---

**Deployment Status**: Ready for Production  
**Last Updated**: 2025-08-01  
**Next.js Version**: 15.4.5  
**Netlify Plugin**: @netlify/plugin-nextjs