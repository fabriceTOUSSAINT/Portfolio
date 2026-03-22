import { useState, useEffect, useRef } from 'react'

const ENTRIES = [
  { command: 'uptime', response: '10y+ building at startups' },
  { command: 'echo $LOCATION', response: 'nyc' },
  { command: 'echo $EMAIL', response: 'developer@fabricebt.com' },
  { command: 'head -1 stack.txt', response: 'ts · python · go' },
  { command: 'wc -l career.log', response: 'thousands of PRs, still reviewing' },
  { command: 'ls ~/hobbies', response: 'photography · hiking · landscape' },
  { command: 'tail -1 adventure.log', response: 'salkantay ✓ · tmb ✓ · patagonia next' },
]

const PROMPT = 'fabrice@portfolio:~$'
const PROMPT_SHORT = '~$'
const TYPE_SPEED = 40 // ms per character
const RESPONSE_DELAY = 400 // ms after typing before showing response
const HOLD_DURATION = 4000 // ms to show response before cycling

export function Footer() {
  const [index, setIndex] = useState(0)
  const [typedCommand, setTypedCommand] = useState('')
  const [showResponse, setShowResponse] = useState(false)
  const [fading, setFading] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  const entry = ENTRIES[index]

  const cleanup = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  // Type the command character by character
  useEffect(() => {
    cleanup()
    setTypedCommand('')
    setShowResponse(false)
    setFading(false)

    let i = 0
    const interval = setInterval(() => {
      i++
      setTypedCommand(entry.command.slice(0, i))
      if (i >= entry.command.length) {
        clearInterval(interval)
        // Show response after delay
        timeoutRef.current = setTimeout(() => {
          setShowResponse(true)
          // Hold, then fade and cycle
          timeoutRef.current = setTimeout(() => {
            setFading(true)
            timeoutRef.current = setTimeout(() => {
              setIndex((prev) => (prev + 1) % ENTRIES.length)
            }, 400) // fade-out duration
          }, HOLD_DURATION)
        }, RESPONSE_DELAY)
      }
    }, TYPE_SPEED)

    return () => {
      clearInterval(interval)
      cleanup()
    }
  }, [index])

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-0 bg-term-bg border-t border-term-border px-5 sm:px-20 lg:px-32 py-3 sm:py-4 overflow-hidden">
      <div className="flex items-baseline text-xs font-mono truncate">
        <span className="text-syn-type shrink-0 hidden sm:inline">{PROMPT}</span>
        <span className="text-syn-type shrink-0 sm:hidden">{PROMPT_SHORT}</span>
        <span className="w-2 sm:w-3 shrink-0" />
        <span
          className={`text-term-muted truncate transition-opacity duration-400 ${fading ? 'opacity-0' : 'opacity-100'}`}
        >
          {typedCommand}
          {showResponse && (
            <>
              <span className="text-term-border mx-2">→</span>
              <span className="text-term-muted/80">{entry.response}</span>
            </>
          )}
          {!showResponse && (
            <span className="inline-block w-[5px] h-[1em] bg-term-muted/60 ml-px animate-[blink_1s_step-end_infinite] align-middle" />
          )}
        </span>
      </div>
    </footer>
  )
}
