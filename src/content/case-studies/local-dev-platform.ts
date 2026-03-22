import type { CaseStudy } from './types'

export const localDevPlatform: CaseStudy = {
  slug: 'local-dev-platform',
  command: 'cat case-studies/local-dev-platform.md',
  title: 'sd — Local Dev Platform',
  subtitle: 'A Go CLI that replaced fragile scripts with a single-command Kubernetes environment',
  context:
    '2-engineer team at Swantide, no DevOps function. 9 microservices running on GKE in production, but local development was a mess — fragile scripts, environment drift, and painful onboarding.',
  problem: [
    'Local dev setup relied on a fragile, undocumented Kustomize-based script that had significant drift from the Helm configs used in staging and production.',
    'Hot-reload was nearly impossible. Every developer had a different local setup, and onboarding new engineers took days of debugging environment issues.',
    'There was no single source of truth for how services should be configured locally — engineers guessed, copied, and patched.',
    'No safety guardrails — it was possible to accidentally run commands against production clusters from a local terminal.',
  ],
  approach: [
    'Built sd (swantide-dev) from scratch in Go using the Cobra CLI framework. Designed it to wrap kind (Kubernetes-in-Docker), Helm, and Docker CLI under a unified interface.',
    'Core command: sd up web-server runs helm template against the same unified Helm chart used in staging and production, merges per-service values, and pipes to kubectl apply. Zero config drift by design.',
    'Added a --dev flag for hot-reload via source-code volume mounts into running containers, and --dev-commons for developing the shared Python package against live services.',
    'Hardcoded the Kubernetes context to the local kind cluster — physically impossible to accidentally deploy to staging or production from sd. This was a deliberate safety decision after a near-miss.',
    'Built full onboarding automation with sd onboard all — provisions kind cluster, pulls images, applies configs, and verifies health checks. One command, no documentation required.',
    'Distributed cross-platform binaries (arm64 + amd64) via GCP Artifact Registry, versioned with Release Please for automated changelogs and semantic versioning.',
  ],
  outcome: [
    'Every engineer now uses sd as their primary development tool.',
    'Eliminated environment drift — local setup matches staging and production Helm configs exactly.',
    'Onboarding went from days of debugging to a single command.',
    'Hot-reload works reliably across all 9 microservices with volume mounts.',
    'Zero accidental production deployments since shipping the hardcoded context safety feature.',
    '5 releases shipped (v0.1.0 → v1.2.0) with cross-platform support.',
  ],
  metrics: [
    { label: 'Onboarding', value: 'Days → one command' },
    { label: 'Microservices', value: '9 supported' },
    { label: 'Releases', value: '5 shipped' },
    { label: 'Platforms', value: 'arm64 + amd64' },
    { label: 'Config drift', value: 'Eliminated' },
  ],
  techStack: [
    'Go',
    'Cobra',
    'Kubernetes',
    'kind',
    'Helm',
    'Docker',
    'GCP Artifact Registry',
    'Release Please',
  ],
}
