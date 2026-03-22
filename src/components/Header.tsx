import { useState, useCallback } from 'react'
import { Link, useMatches } from '@tanstack/react-router'
import { ThemeToggle } from './ThemeToggle'
import { TypingEffect } from './TypingEffect'

interface HeaderProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

function NavTab({ to, label, isActive }: { to: string; label: string; isActive: boolean }) {
  return (
    <Link
      to={to}
      className={`text-xs sm:text-sm transition-colors duration-200 ${
        isActive
          ? 'text-syn-string'
          : 'text-term-muted hover:text-term-text'
      }`}
    >
      [{label}]
    </Link>
  )
}

function usePwd(): string {
  const matches = useMatches()
  const currentPath = matches[matches.length - 1]?.fullPath ?? '/'

  if (currentPath === '/') return '~/fabrice/toussaint'
  if (currentPath.startsWith('/blog')) return '~/fabrice/blog'
  if (currentPath.startsWith('/case-study')) return '~/fabrice/case-studies'
  return '~/fabrice'
}

type PwdPhase = 'typing-command' | 'replacing' | 'done'

function PwdDisplay() {
  const pwd = usePwd()
  const [hasAnimated, setHasAnimated] = useState(false)
  const [phase, setPhase] = useState<PwdPhase>('typing-command')

  const handleCommandTyped = useCallback(() => {
    // Brief pause, then replace command with result
    setTimeout(() => setPhase('replacing'), 400)
  }, [])

  const handleResultTyped = useCallback(() => {
    setPhase('done')
    setHasAnimated(true)
  }, [])

  // After first animation, show result instantly on route changes
  if (hasAnimated) {
    return (
      <span className="text-xs sm:text-sm w-36 sm:w-56 inline-block truncate">
        <span className="text-syn-keyword">$</span>{' '}
        <span className="text-term-muted">{pwd}</span>
      </span>
    )
  }

  return (
    <span className="text-xs sm:text-sm w-36 sm:w-56 inline-block truncate">
      <span className="text-syn-keyword">$</span>{' '}
      {phase === 'typing-command' && (
        <TypingEffect
          text="PWD"
          speed={80}
          onComplete={handleCommandTyped}
          className="text-term-text font-medium"
        />
      )}
      {phase === 'replacing' && (
        <TypingEffect
          text={pwd}
          speed={25}
          onComplete={handleResultTyped}
          className="text-term-muted"
        />
      )}
      {phase === 'done' && (
        <span className="text-term-muted">{pwd}</span>
      )}
    </span>
  )
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const matches = useMatches()
  const currentPath = matches[matches.length - 1]?.fullPath ?? '/'

  const isHome = currentPath === '/'
  const isCaseStudy = currentPath.startsWith('/case-study')
  const isBlog = currentPath.startsWith('/blog')

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-5 sm:px-20 lg:px-32 py-3 sm:py-4 bg-term-bg/90 backdrop-blur-sm border-b border-term-border/40">
      <div className="flex items-center gap-4 sm:gap-6">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Fabrice Toussaint" className="w-7 h-7 sm:w-9 sm:h-9" />
          <PwdDisplay />
        </Link>
        <nav className="flex items-center gap-2 sm:gap-3">
          <NavTab to="/" label="~" isActive={isHome} />
          <NavTab to="/case-study" label="case-studies" isActive={isCaseStudy} />
          <NavTab to="/blog" label="blog" isActive={isBlog} />
        </nav>
      </div>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  )
}
