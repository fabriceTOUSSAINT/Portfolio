export interface CaseStudy {
  slug: string
  command: string
  title: string
  subtitle: string
  context: string
  problem: string[]
  approach: string[]
  outcome: string[]
  metrics: { label: string; value: string }[]
  techStack: string[]
}
