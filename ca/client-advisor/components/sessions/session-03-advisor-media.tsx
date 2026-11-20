'use client'

import Image from 'next/image'
import { useTranslation } from '@i18n/use-translation'

import styles from './session-03-research.module.css'

// Still only (Lu #21093, PM #21097 option A): the talking-head video showed a
// ghosted hand, so CA 03 shows the poster. The video file stays in public/ unused.
const POSTER = '/assets/images/client-advisory/ca03-B-poster.webp'

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
