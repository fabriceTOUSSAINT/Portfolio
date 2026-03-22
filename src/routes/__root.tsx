import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { useTheme } from '../hooks/useTheme'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const Route = createRootRoute({
  component: RootLayout,
  errorComponent: RootError,
  notFoundComponent: NotFound,
})

function RootLayout() {
  const { theme, toggle } = useTheme()

  return (
    <>
      {/* Main content sits on top, opaque background hides the footer until you scroll past */}
      <div className="relative z-10 min-h-screen flex flex-col bg-term-bg text-term-text transition-colors duration-300 mb-14">
        <Header theme={theme} onToggleTheme={toggle} />
        <Outlet />
      </div>

      {/* Footer is fixed at the bottom, revealed by scrolling past content */}
      <Footer />
    </>
  )
}

function RootError() {
  return (
    <div className="flex-1 px-5 sm:px-20 lg:px-32 pt-4 sm:pt-6 pb-16 sm:pb-24 max-w-5xl">
      <div className="flex items-center gap-3 text-base sm:text-lg font-semibold mb-6">
        <span className="text-syn-keyword text-xl">$</span>
        <span className="text-term-text">cat /var/log/error</span>
      </div>
      <div className="ml-3 sm:ml-6 pl-4 sm:pl-8 border-l-2 border-term-border/60">
        <p className="text-syn-keyword text-sm mb-4">
          Segmentation fault (core dumped)
        </p>
        <p className="text-term-muted text-xs sm:text-sm">
          Something went wrong. Try refreshing, or{' '}
          <Link
            to="/"
            className="text-syn-string underline decoration-syn-string/30 underline-offset-4 hover:decoration-syn-string/80 transition-all duration-200"
          >
            go home
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="flex-1 px-5 sm:px-20 lg:px-32 pt-4 sm:pt-6 pb-16 sm:pb-24 max-w-5xl">
      <div className="flex items-center gap-3 text-base sm:text-lg font-semibold mb-6">
        <span className="text-syn-keyword text-xl">$</span>
        <span className="text-term-text">cat ???</span>
      </div>
      <div className="ml-3 sm:ml-6 pl-4 sm:pl-8 border-l-2 border-term-border/60">
        <p className="text-syn-keyword text-sm mb-4">
          cat: No such file or directory
        </p>
        <p className="text-term-muted text-xs sm:text-sm">
          <Link
            to="/"
            className="text-syn-string underline decoration-syn-string/30 underline-offset-4 hover:decoration-syn-string/80 transition-all duration-200"
          >
            ← back to home
          </Link>
        </p>
      </div>
    </div>
  )
}
