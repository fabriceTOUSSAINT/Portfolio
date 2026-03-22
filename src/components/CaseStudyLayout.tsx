import { Link } from '@tanstack/react-router'
import type { CaseStudy } from '../content/case-studies'

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-syn-function font-semibold text-sm sm:text-base mb-3">
        ## {title}
      </h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <p key={i} className="text-term-muted text-xs sm:text-sm leading-relaxed">
            {item}
          </p>
        ))}
      </div>
    </div>
  )
}

export function CaseStudyLayout({ study }: { study: CaseStudy }) {
  return (
    <div className="flex-1 px-5 sm:px-20 lg:px-32 pt-4 sm:pt-6 pb-16 sm:pb-24 max-w-5xl">
      {/* Command prompt */}
      <div className="flex items-center gap-3 text-base sm:text-lg font-semibold mb-8">
        <span className="text-syn-keyword text-xl">$</span>
        <span className="text-term-text">{study.command}</span>
      </div>

      {/* Content */}
      <div className="ml-3 sm:ml-6 pl-4 sm:pl-8 border-l-2 border-term-border/60">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-term-text mb-2">
          {study.title}
        </h1>
        <p className="text-syn-variable text-sm sm:text-base mb-4">
          {study.subtitle}
        </p>
        <p className="text-term-muted text-xs sm:text-sm leading-relaxed mb-8 max-w-2xl">
          {study.context}
        </p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-3 mb-10">
          {study.metrics.map((m) => (
            <div key={m.label}>
              <span className="text-syn-comment text-xs block">{m.label}</span>
              <span className="text-syn-highlight font-semibold text-sm">{m.value}</span>
            </div>
          ))}
        </div>

        <Section title="Problem" items={study.problem} />
        <Section title="Approach" items={study.approach} />
        <Section title="Outcome" items={study.outcome} />

        {/* Tech stack */}
        <div className="mb-10">
          <h2 className="text-syn-function font-semibold text-sm sm:text-base mb-3">
            ## Tech Stack
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm">
            {study.techStack.map((tech) => (
              <span key={tech} className="text-syn-constant">{tech}</span>
            ))}
          </div>
        </div>

        {/* Back link */}
        <div className="pt-6 border-t border-term-border/40">
          <Link
            to="/"
            className="text-syn-string underline decoration-syn-string/30 underline-offset-4 hover:decoration-syn-string/80 transition-all duration-200 text-sm"
          >
            ← back
          </Link>
        </div>
      </div>
    </div>
  )
}
