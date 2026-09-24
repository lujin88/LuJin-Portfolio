import { ArrowRight } from 'lucide-react'

export function PanelArrow() {
  return (
    <div className="flex items-center justify-center py-2 lg:px-2">
      <ArrowRight className="size-6 rotate-90 text-foreground/70 lg:rotate-0" aria-hidden="true" />
    </div>
  )
}
