# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **AGENT-11 Website** - a high-converting landing page showcasing the AGENT-11 framework. The project demonstrates a personal team of 11 AI specialists working together to build software 10x faster.

**Current Status**: Phase 3 Complete - Interactive features, performance optimization, and GitHub API integration fully implemented.

## Development Setup

### Prerequisites
- Node.js 18+ with npm
- Git for version control
- Modern browser for testing

### Common Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server (with Turbopack)
- `npm run build` - Build for production 
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Architecture Guidelines

### Project Structure
```
src/
├── app/                 # Next.js 14 App Router
│   ├── globals.css     # Global styles with Tailwind
│   ├── layout.tsx      # Root layout with fonts
│   ├── page.tsx        # Landing page composition
│   └── api/            # API routes for GitHub integration
├── components/
│   ├── sections/       # Landing page sections
│   └── ui/             # Reusable UI components
├── data/               # Static data and configuration
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and services
└── types/              # TypeScript type definitions
```

### Technology Stack
- **Framework**: Next.js 14 with App Router and TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Custom React components with accessibility
- **Code Highlighting**: Prism.js with dynamic language loading
- **Performance**: Progressive loading, lazy loading, code splitting
- **API Integration**: GitHub API with server-side caching
- **Deployment**: Netlify (planned) with custom domain www.agent-11.com

## Development Workflow

### Git Workflow
- **Main Branch**: Production-ready code
- **Commit Messages**: Descriptive commits documenting Phase progress
- **Branching**: Feature branches for Phase 4 development

### Code Quality
- **ESLint**: Configured with Next.js rules and strict TypeScript
- **TypeScript**: Strict mode enabled with comprehensive type coverage
- **Performance**: Bundle analysis and Web Vitals monitoring
- **Accessibility**: WCAG 2.1 AA compliance validated

## Key Features Implemented

### Phase 1-2: Foundation (COMPLETED)
- Strategic analysis and technical architecture
- 7-section landing page with responsive design
- Next.js 14 setup with TypeScript and Tailwind CSS

### Phase 3: Enhanced Interactive Experience (COMPLETED)
- **Interactive Agent Demos**: 11 specialists with syntax highlighting
- **Terminal Simulation**: 4 collaboration scenarios with animations
- **Performance Optimization**: <2s load time with progressive loading
- **GitHub API Integration**: Live repository statistics with fallbacks
- **Social Proof Animations**: Trust-building visual elements
- **Accessibility**: Full WCAG 2.1 AA compliance

### Phase 4: Advanced Features & Launch (IN PLANNING)
- Discord community widget integration
- Email capture and automation system
- Advanced analytics and conversion tracking
- Production deployment to www.agent-11.com

## Component Architecture

### Landing Page Sections
- `Hero.tsx` - Value proposition with animated GitHub stats
- `Problem.tsx` - Pain point validation
- `SolutionDemo.tsx` - Interactive agent demonstrations
- `SocialProof.tsx` - Live GitHub data and testimonials
- `TechnicalConfidence.tsx` - Architecture and credibility
- `ProofOfSpeed.tsx` - Performance metrics
- `GetStarted.tsx` - Call-to-action and onboarding

### Interactive Components
- `TerminalSimulation.tsx` - Agent collaboration demos
- `CodeBlock.tsx` - Syntax highlighting with copy functionality
- `AnimatedCounter.tsx` - Number animations for statistics
- `AgentCard.tsx` - Interactive agent showcases

### API Integration
- `github-api.ts` - GitHub REST API service with caching
- API routes for repository statistics, contributors, and activity

## Performance Targets

- **Bundle Size**: 145kB first load (optimized)
- **Load Time**: <2 seconds with progressive loading
- **Lighthouse Score**: >95 target across all metrics
- **Accessibility**: WCAG 2.1 AA compliance
- **Mobile Performance**: 60fps animations, responsive design

## Deployment Strategy

### Phase 3.5: Production Deployment (CURRENT)
- **Netlify Integration**: Automated builds from GitHub
- **Custom Domain**: www.agent-11.com with SSL
- **Environment Variables**: GitHub API configuration
- **Performance Monitoring**: Real-world metrics collection

## Development Notes

- **Interactive Demos**: Use real code examples from AGENT-11 framework
- **Performance First**: All features optimized for speed and accessibility
- **Mobile Responsive**: Touch-friendly interactions and layouts
- **Error Handling**: Graceful degradation for all API integrations
- **Documentation**: Comprehensive progress tracking in progress.md