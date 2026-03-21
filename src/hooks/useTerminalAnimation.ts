import { useState, useEffect, useCallback } from 'react'

const SESSION_KEY = 'terminal-animated'

interface AnimationState {
  /** Which section index is currently being revealed (0-based) */
  activeSection: number
  /** Whether all sections have been revealed */
  complete: boolean
  /** Whether we should skip animation entirely (revisit) */
  skipAnimation: boolean
  /** Call when a section's typing animation completes */
  onSectionComplete: () => void
}

export function useTerminalAnimation(totalSections: number): AnimationState {
  const [skipAnimation] = useState(() => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  })

  const [activeSection, setActiveSection] = useState(skipAnimation ? totalSections : 0)

  const onSectionComplete = useCallback(() => {
    setActiveSection((prev) => prev + 1)
  }, [])

  useEffect(() => {
    if (activeSection >= totalSections && !skipAnimation) {
      sessionStorage.setItem(SESSION_KEY, 'true')
    }
  }, [activeSection, totalSections, skipAnimation])

  return {
    activeSection,
    complete: activeSection >= totalSections,
    skipAnimation,
    onSectionComplete,
  }
}
