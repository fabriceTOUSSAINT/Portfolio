import { createFileRoute, Link } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

export const Route = createFileRoute('/blog/')({
  component: BlogIndexPage,
})

function BlogIndexPage() {
  useDocumentTitle('Blog')
  const sorted = allPosts
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="flex-1 px-5 sm:px-20 lg:px-32 pt-4 sm:pt-6 pb-16 sm:pb-24 max-w-5xl">
      <div className="flex items-center gap-3 text-base sm:text-lg font-semibold mb-8">
        <span className="text-syn-keyword text-xl">$</span>
        <span className="text-term-text">ls blog/</span>
      </div>

      <div className="ml-3 sm:ml-6 pl-4 sm:pl-8 border-l-2 border-term-border/60">
        {sorted.length === 0 ? (
          <p className="text-term-muted text-sm">No posts yet. Check back soon.</p>
        ) : (
          <div className="space-y-4">
            {sorted.map((post) => (
              <div key={post.slug}>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-x-6 text-sm sm:text-base">
                  <span className="text-syn-comment w-auto sm:w-28 shrink-0">
                    {post.date}
                  </span>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="text-syn-string underline decoration-syn-string/30 underline-offset-4 hover:decoration-syn-string/80 transition-all duration-200"
                  >
                    {post.title}
                  </Link>
                </div>
                <p className="text-term-muted text-xs sm:text-sm mt-1 sm:ml-34">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-1 sm:ml-34">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-syn-type text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back link */}
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
