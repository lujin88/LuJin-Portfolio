import { cn } from '@eon/lib/utils'

interface PrincipleCardProps {
  number: string
  title: string
  highlighted?: boolean
  selected?: boolean
  onSelect?: () => void
  controlsId?: string
  id?: string
}

export function PrincipleCard({
  number,
  title,
  highlighted = false,
  selected,
  onSelect,
  controlsId,
  id,
}: PrincipleCardProps) {
  const isActive = selected ?? highlighted

  return (
    <button
      type="button"
      id={id}
      role="tab"
      aria-selected={isActive}
      aria-controls={controlsId}
      tabIndex={isActive ? 0 : -1}
      onClick={onSelect}
      className={cn(
        'box-border flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-left md:px-5 md:py-3.5',
        'shadow-none ring-0',
        'focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-current',
        isActive ? 'border-lavender-marker bg-primary/20' : 'border-navy-950/8 bg-card',
      )}
    >
      <span
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold',
          isActive ? 'bg-card text-foreground' : 'bg-muted text-foreground',
        )}
      >
        {number}
      </span>
      <p className="min-w-0 flex-1 text-[13px] font-bold leading-[1.25] text-foreground md:text-[15px]">
        {title}
      </p>
    </button>
  )
}
