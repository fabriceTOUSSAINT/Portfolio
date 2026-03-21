import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 sm:px-20 lg:px-32 py-6 sm:py-8">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Fabrice Toussaint" className="w-9 h-9 sm:w-12 sm:h-12" />
        <span className="text-term-muted text-sm">fabrice.tsx</span>
      </div>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  )
}
