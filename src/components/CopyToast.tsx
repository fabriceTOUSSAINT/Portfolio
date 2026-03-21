import { cn } from '../lib/utils'

interface CopyToastProps {
  visible: boolean
}

export function CopyToast({ visible }: CopyToastProps) {
  return (
    <div
      className={cn(
        'fixed bottom-6 left-6 px-4 py-2.5 rounded-md text-sm font-medium z-50',
        'bg-term-bg-light border border-term-border text-syn-type',
        'transition-all duration-200 ease-out',
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-2 pointer-events-none'
      )}
    >
      <span className="text-syn-comment">// </span>
      email copied to clipboard
    </div>
  )
}
