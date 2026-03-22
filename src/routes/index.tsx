import { createFileRoute } from '@tanstack/react-router'
import { TerminalSession } from '../components/TerminalSession'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  useDocumentTitle('Senior Software Engineer, New York')
  return <TerminalSession />
}
