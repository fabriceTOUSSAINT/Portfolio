import { createFileRoute, notFound } from '@tanstack/react-router'
import { caseStudies } from '../../content/case-studies'
import { CaseStudyLayout } from '../../components/CaseStudyLayout'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

export const Route = createFileRoute('/case-study/$slug')({
  loader: ({ params }) => {
    const study = caseStudies[params.slug]
    if (!study) throw notFound()
    return study
  },
  component: CaseStudyPage,
  notFoundComponent: CaseStudyNotFound,
})

function CaseStudyPage() {
  const study = Route.useLoaderData()
  useDocumentTitle(study.title)
  return <CaseStudyLayout study={study} />
}

function CaseStudyNotFound() {
  return (
    <div className="flex-1 px-5 sm:px-20 lg:px-32 pt-4 sm:pt-6 pb-16 sm:pb-24 max-w-5xl">
      <div className="flex items-center gap-3 text-base sm:text-lg font-semibold mb-6">
        <span className="text-syn-keyword text-xl">$</span>
        <span className="text-term-text">cat case-studies/???</span>
      </div>
      <div className="ml-3 sm:ml-6 pl-4 sm:pl-8 border-l-2 border-term-border/60">
        <p className="text-syn-keyword text-sm">
          cat: No such file or directory
        </p>
      </div>
    </div>
  )
}
