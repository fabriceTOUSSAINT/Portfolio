import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-10 sm:px-20 lg:px-32 py-8">
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="Fabrice Toussaint" className="w-12 h-12" />
        <span className="text-term-muted text-sm">fabrice.tsx</span>
      </div>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  )
}
