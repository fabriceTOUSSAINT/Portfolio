import { useState, useCallback, useEffect } from 'react'

type Phase = 'typing' | 'output'

const ANIMATION_KEY = 'terminal-animation-played'

interface AnimationState {
  activeSection: number
  phase: Phase
  complete: boolean
  skipAnimation: boolean
  onTypingComplete: () => void
  onOutputComplete: () => void
}

export function useTerminalAnimation(totalSections: number): AnimationState {
  const [hasPlayed] = useState(
    () => sessionStorage.getItem(ANIMATION_KEY) === 'true',
  )
  const [activeSection, setActiveSection] = useState(
    hasPlayed ? totalSections : 0,
  )
  const [phase, setPhase] = useState<Phase>('typing')

  useEffect(() => {
    if (!hasPlayed && activeSection >= totalSections) {
      sessionStorage.setItem(ANIMATION_KEY, 'true')
    }
  }, [hasPlayed, activeSection, totalSections])

  const onTypingComplete = useCallback(() => {
    setPhase('output')
  }, [])

  const onOutputComplete = useCallback(() => {
    setActiveSection((prev) => prev + 1)
    setPhase('typing')
  }, [])

  return {
    activeSection,
    phase,
    complete: activeSection >= totalSections,
    skipAnimation: hasPlayed,
    onTypingComplete,
    onOutputComplete,
  }
}
