import { cn } from '@/lib/utils'

interface PrincipleCardProps {
  number: string
  title: string
  highlighted?: boolean
}

export function PrincipleCard({ number, title, highlighted = false }: PrincipleCardProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-2xl px-6 py-6 md:py-7',
        highlighted ? 'bg-primary/20' : 'bg-card',
      )}
    >
      <span
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold',
          highlighted ? 'bg-card text-foreground' : 'bg-muted text-foreground',
        )}
      >
        {number}
      </span>
      <p className="text-lg font-bold leading-snug text-balance text-foreground md:text-xl">{title}</p>
    </div>
  )
}
