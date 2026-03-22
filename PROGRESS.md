# Portfolio V2 Progress

## Infrastructure (complete)
- [x] Vite + React 19 + TypeScript + Tailwind v4
- [x] TanStack Router (file-based, auto code-splitting)
- [x] Content Collections + MDX blog system (draft support, syntax highlighting)
- [x] Case study system (typed data, dynamic routes)
- [x] Terminal aesthetic (typing animations, staggered reveals, sessionStorage skip)
- [x] Header (animated PWD, sticky, nav tabs)
- [x] Footer (looping shell prompt, scroll-to-reveal easter egg)
- [x] Dark/light theme
- [x] Per-page titles, error/404 pages
- [x] Centralized site config (`src/config/site.ts`)
- [x] Mobile responsive
- [x] Code cleanup pass

## Content — case studies

| Case study | Status | File |
|-----------|--------|------|
| Swantide (overview) | Draft on site | `src/content/case-studies/swantide.ts` |
| Local Dev Platform (sd CLI) | Draft on site | `src/content/case-studies/local-dev-platform.ts` |
| Frontend Modernization (CRA→Vite) | Draft on site | `src/content/case-studies/cra-to-vite.ts` |
| OpenAI Batch Pipeline | Not started | — |
| Permit.io RBAC System | Not started | — |

## Content — blog posts

| Post | Status | File |
|------|--------|------|
| Building a Local Dev Platform in Go | Placeholder (draft) | `src/content/blog/building-a-local-dev-platform-in-go.mdx` |
| CRA to Vite Migration at Scale | Placeholder (draft) | `src/content/blog/cra-to-vite-migration-at-scale.mdx` |
| Docker Build Optimization (17→2 min) | Not started | — |
| Building Reliable AI Batch Pipelines | Not started | — |
| Scaling Shared Libraries for Microservices | Not started | — |

## Before launch
- [ ] Fill in real metrics on homepage (onboarding time, HMR speed, RBAC scope)
- [ ] Write or finalize at least 2 case studies
- [ ] Write or finalize at least 1 blog post
- [ ] Create OG image for social sharing
- [ ] Verify resume PDF is current
- [ ] Update deployment config (netlify.toml, SPA fallback)
- [ ] Domain decision (fabricebt.com vs toussaint.dev)
