import { useState, useEffect, Children, type ReactNode } from 'react'

interface StaggeredLinesProps {
  children: ReactNode
  /** Delay in ms between each line appearing */
  delay?: number
  /** Whether to animate or show all immediately */
  animate: boolean
  /** Called when all lines have been revealed */
  onComplete?: () => void
  className?: string
}

export function StaggeredLines({
  children,
  delay = 120,
  animate,
  onComplete,
  className = '',
}: StaggeredLinesProps) {
  const items = Children.toArray(children)
  const [visibleCount, setVisibleCount] = useState(animate ? 0 : items.length)

  useEffect(() => {
    if (!animate) {
      setVisibleCount(items.length)
      return
    }

    if (visibleCount >= items.length) {
      onComplete?.()
      return
    }

    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1)
    }, delay)

    return () => clearTimeout(timer)
  }, [visibleCount, items.length, delay, animate, onComplete])

  return (
    <div className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          className={
            i < visibleCount
              ? 'animate-[fadeSlideIn_0.25s_ease-out_forwards]'
              : 'opacity-0 h-0 overflow-hidden'
          }
        >
          {child}
        </div>
      ))}
    </div>
  )
}
