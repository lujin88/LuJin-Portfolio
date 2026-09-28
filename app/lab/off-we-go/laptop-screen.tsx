'use client'

import { useTranslation } from '@i18n'
import { cn } from '@header/lib/utils'

import { laptopScreen, prototypeUrl } from './config'
import styles from './off-we-go.module.css'

export function LaptopScreen({ className }: { className?: string }) {
  const { t } = useTranslation()
  const liveUrl = prototypeUrl.trim()
  if (!liveUrl) return null

  return (
    <a
      href={liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t('owg.openPrototypeAria')} (opens in a new window)`}
      className={cn(styles.laptop, styles.laptopHit, className)}
      style={{
        top: `${laptopScreen.top}%`,
        left: `${laptopScreen.left}%`,
        width: `${laptopScreen.width}%`,
        height: `${laptopScreen.height}%`,
        clipPath: laptopScreen.clipPath,
        transform: `perspective(${laptopScreen.perspective}px) rotateX(${laptopScreen.rotateX}deg) rotateY(${laptopScreen.rotateY}deg) rotateZ(${laptopScreen.rotateZ}deg)`,
      }}
    />
  )
}
