import { useState, useCallback } from 'react'

type Phase = 'typing' | 'output'

interface AnimationState {
  activeSection: number
  phase: Phase
  complete: boolean
  skipAnimation: boolean
  onTypingComplete: () => void
  onOutputComplete: () => void
}

export function useTerminalAnimation(totalSections: number): AnimationState {
  const [activeSection, setActiveSection] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')

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
    skipAnimation: false,
    onTypingComplete,
    onOutputComplete,
  }
}
