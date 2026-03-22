import type { CaseStudy } from './types'

export const craToVite: CaseStudy = {
  slug: 'cra-to-vite',
  command: 'cat case-studies/cra-to-vite.md',
  title: 'Frontend Modernization',
  subtitle: 'Four incremental production migrations with zero downtime and no feature freeze',
  context:
    '2-engineer team at Swantide. The frontend had accumulated years of tech debt across build tooling, state management, component library, and code formatting. Product couldn\'t stop shipping — no feature freeze allowed.',
  problem: [
    'The frontend was running on an ejected CRA setup with an unmaintainable Webpack 4 config that nobody dared touch.',
    'Redux was used for server state with a dual-write pattern — writing to both Redux and the API on every mutation. This caused cascading side-effects: every connected component would re-render on any Redux write, triggering redundant API calls and stale-data bugs.',
    'MUI v4 had a different theming API than v5, blocking access to newer components and patterns.',
    'Code formatting was inconsistent across the codebase, making PRs noisy and code reviews harder than they needed to be.',
    'The hard constraint: no feature freeze. Product development had to continue uninterrupted through every migration.',
  ],
  approach: [
    'Planned four sequential migrations designed to coexist with existing systems — old and new running side-by-side in production at every step.',
    'CRA → Vite: Removed the ejected Webpack config entirely. Replaced with a standard Vite setup. Instant HMR, faster builds, maintainable config.',
    'Redux → TanStack Query: Migrated one data domain at a time. Started with currentUser (smallest surface area), then integrations, then custom_fields. Each domain was a self-contained PR — no cross-domain risk. Incrementally deprecated Redux actions until the store was empty.',
    'The key insight: the dual-write pattern was causing every connected component to re-render on any state change. Removing Redux from server state eliminated an entire class of cascade bugs that had been silently degrading performance.',
    'MUI v4 → v5: Ran codemods for the bulk of breaking changes, then manually resolved remaining API incompatibilities. Theming migration was the most tedious part.',
    'Added Prettier + lint-staged as the final step — consistent formatting going forward, enforced on commit.',
  ],
  outcome: [
    'Zero production incidents across all four migrations.',
    'Eliminated multi-year tech debt cliff — the codebase went from unmaintainable ejected Webpack to a standard, modern frontend stack.',
    'Fully removed Redux from server state management, eliminating the dual-write cascade bug and an entire class of stale-data issues.',
    'Product development continued uninterrupted throughout — no feature freeze, no big-bang rewrite, no "migration sprint."',
  ],
  metrics: [
    { label: 'Production incidents', value: '0' },
    { label: 'Migrations', value: '4 sequential' },
    { label: 'Feature freezes', value: 'None' },
    { label: 'Tech debt eliminated', value: 'Multi-year' },
  ],
  techStack: [
    'TypeScript',
    'React',
    'Vite',
    'Webpack',
    'TanStack Query',
    'Redux',
    'MUI',
    'Prettier',
    'lint-staged',
  ],
}
