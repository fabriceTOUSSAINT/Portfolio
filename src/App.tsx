import { useTheme } from './hooks/useTheme'
import { Header } from './components/Header'
import { TerminalSession } from './components/TerminalSession'
import { Footer } from './components/Footer'

function App() {
  const { theme, toggle } = useTheme()

  return (
    <div className="min-h-screen flex flex-col bg-term-bg text-term-text transition-colors duration-300">
      <Header theme={theme} onToggleTheme={toggle} />
      <TerminalSession />
      <Footer />
    </div>
  )
}

export default App
