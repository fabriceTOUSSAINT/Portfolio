import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { allPosts } from 'content-collections'
import { MDXContent } from '@content-collections/mdx/react'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = allPosts.find((p) => p.slug === params.slug)
    if (!post) throw notFound()
    return post
  },
  component: BlogPostPage,
  notFoundComponent: BlogPostNotFound,
})

function BlogPostPage() {
  const post = Route.useLoaderData()
  useDocumentTitle(post.title)

  return (
    <div className="flex-1 px-5 sm:px-20 lg:px-32 pt-4 sm:pt-6 pb-16 sm:pb-24 max-w-5xl">
      {/* Command prompt */}
      <div className="flex items-center gap-3 text-base sm:text-lg font-semibold mb-8">
        <span className="text-syn-keyword text-xl">$</span>
        <span className="text-term-text">cat blog/{post.slug}.md</span>
      </div>

      {/* Post content */}
      <div className="ml-3 sm:ml-6 pl-4 sm:pl-8 border-l-2 border-term-border/60">
        {/* Meta */}
        <div className="mb-6">
          <span className="text-syn-comment text-xs">{post.date}</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {post.tags.map((tag) => (
              <span key={tag} className="text-syn-type text-xs">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* MDX body */}
        <div className="prose-terminal">
          <MDXContent code={post.mdx} />
        </div>

        {/* Back link */}
        <div className="pt-8 mt-8 border-t border-term-border/40">
          <Link
            to="/blog"
            className="text-syn-string underline decoration-syn-string/30 underline-offset-4 hover:decoration-syn-string/80 transition-all duration-200 text-sm"
          >
            ← back
          </Link>
        </div>
      </div>
    </div>
  )
}

function BlogPostNotFound() {
  return (
    <div className="flex-1 px-5 sm:px-20 lg:px-32 pt-4 sm:pt-6 pb-16 sm:pb-24 max-w-5xl">
      <div className="flex items-center gap-3 text-base sm:text-lg font-semibold mb-6">
        <span className="text-syn-keyword text-xl">$</span>
        <span className="text-term-text">cat blog/???</span>
      </div>
      <div className="ml-3 sm:ml-6 pl-4 sm:pl-8 border-l-2 border-term-border/60">
        <p className="text-syn-keyword text-sm">cat: No such file or directory</p>
      </div>
    </div>
  )
}
