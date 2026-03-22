import { createFileRoute, Link } from '@tanstack/react-router'
import { caseStudies } from '../../content/case-studies'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

export const Route = createFileRoute('/case-study/')({
  component: CaseStudyIndexPage,
})

const studies = Object.values(caseStudies)

function CaseStudyIndexPage() {
  useDocumentTitle('Case Studies')

  return (
    <div className="flex-1 px-5 sm:px-20 lg:px-32 pt-4 sm:pt-6 pb-16 sm:pb-24 max-w-5xl">
      <div className="flex items-center gap-3 text-base sm:text-lg font-semibold mb-8">
        <span className="text-syn-keyword text-xl">$</span>
        <span className="text-term-text">ls case-studies/</span>
      </div>

      <div className="ml-3 sm:ml-6 pl-4 sm:pl-8 border-l-2 border-term-border/60">
        <div className="space-y-5">
          {studies.map((study) => (
            <div key={study.slug}>
              <Link
                to="/case-study/$slug"
                params={{ slug: study.slug }}
                className="text-syn-string underline decoration-syn-string/30 underline-offset-4 hover:decoration-syn-string/80 transition-all duration-200 text-sm sm:text-base"
              >
                {study.title}
              </Link>
              <p className="text-term-muted text-xs sm:text-sm mt-1">
                {study.subtitle}
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                {study.metrics.slice(0, 3).map((m) => (
                  <span key={m.label} className="text-syn-comment text-xs">
                    {m.label}: <span className="text-syn-highlight">{m.value}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8">
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
