'use client'

import type { ReactNode } from 'react'
import { cn } from '@eon/lib/utils'
import { useTranslation } from '@i18n/use-translation'

export function ComparisonCardHeader({
  tone,
  title,
  children,
  bodyFullWidth = false,
}: {
  tone: 'before' | 'after'
  title: string
  children: ReactNode
  bodyFullWidth?: boolean
}) {
  const { t } = useTranslation()
  return (
    <div className="grid h-full min-w-0 grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)] gap-x-3 gap-y-4">
      <span
        className={cn(
          'inline-flex h-8 w-[5.25rem] shrink-0 items-center justify-center self-center rounded-full text-sm font-semibold leading-none',
          tone === 'before'
            ? 'bg-navy-950/8 text-foreground'
            : 'bg-mint text-navy-950',
        )}
      >
        {tone === 'before' ? t('eon.ui.before') : t('eon.ui.after')}
      </span>
      <h4 className="flex min-h-8 min-w-0 items-center self-center text-xl font-bold leading-none text-foreground">
        {title}
      </h4>
      <div
        className={cn(
          'flex h-full min-h-0 min-w-0 flex-col',
          bodyFullWidth ? 'col-span-2 col-start-1' : 'col-start-2',
        )}
      >
        {children}
      </div>
    </div>
  )
}
