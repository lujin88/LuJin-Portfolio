'use client'

import Image from 'next/image'
import { useTranslation } from '@i18n/use-translation'

import styles from './session-03-research.module.css'

// PM #21540: use the new full-frame C still while the video repair is reviewed.
// Static and reduced-motion views share this image; no video is loaded.
const POSTER = '/assets/images/client-advisory/ca03-C-poster.webp'

export function Session03AdvisorMedia() {
  const { t } = useTranslation()

  return (
    <div className={styles.photoFrame}>
      <Image
        src={POSTER}
        alt={t('ca.research.photoAlt')}
        fill
        sizes="100vw"
        className={`object-cover ${styles.photo}`}
        priority
      />
    </div>
  )
}
