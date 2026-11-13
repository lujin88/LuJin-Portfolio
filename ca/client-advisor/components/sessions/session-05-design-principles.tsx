'use client'
import { LayerScrollGroup } from '@eon/components/motion/layer-scroll-group'

import { useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './session-05-design-principles.module.css'
import { useTranslation } from '@i18n/use-translation'

const principleArt = [
  '/assets/images/client-advisory/ca-05-card-01.webp',
  '/assets/images/client-advisory/ca-05-card-02.webp',
  '/assets/images/client-advisory/ca-05-card-03.webp',
] as const

function PrincipleCard({
  principle,
  showFront,
  revealPrinciple,
}: {
  principle: { number: string; title: string; body: string; artwork: string }
  showFront: string
  revealPrinciple: string
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLButtonElement>(null)

  useLayoutEffect(() => {
    const card = cardRef.current
    if (!card) return
    const front = card.children[0] as HTMLElement
    const back = card.children[1] as HTMLElement
    let frame = 0

    // WebKit can paint both faces despite backface-visibility. Follow the
    // actual rotation (including easing and interrupted flips), not a timer.
    const syncFace = () => {
      const transform = getComputedStyle(card).transform
      const facingBack = transform !== 'none' && new DOMMatrixReadOnly(transform).m11 < 0
      front.style.visibility = facingBack ? 'hidden' : 'visible'
      back.style.visibility = facingBack ? 'visible' : 'hidden'
      if (card.getAnimations().some((animation) => animation.playState === 'running')) {
        frame = requestAnimationFrame(syncFace)
      }
    }

    syncFace()
    return () => cancelAnimationFrame(frame)
  }, [isFlipped])

  return (
    <li className={styles.card} data-move="64">
      <button
        ref={cardRef}
        type="button"
        className={`${styles.cardInner} ${isFlipped ? styles.flipped : ''}`}
        aria-pressed={isFlipped}
        aria-label={`${principle.title}. ${
          isFlipped ? showFront : revealPrinciple
        }`}
        onClick={() => setIsFlipped((prev) => !prev)}
      >
        <span className={`${styles.face} ${styles.faceFront}`}>
          <span className={styles.artwork} aria-hidden="true">
            <Image
              src={principle.artwork}
              alt=""
              fill
              sizes="(max-width: 1100px) 100vw, 33vw"
              className={styles.artworkImg}
              quality={90}
            />
          </span>
          <span className={styles.cardHeader}>
            <span className={styles.cardNum}>{principle.number}</span>
            <span className={styles.cardTitle}>{principle.title}</span>
          </span>
        </span>

        <span className={`${styles.face} ${styles.faceBack}`}>
          <span className={styles.cardHeader}>
            <span className={styles.cardNum}>{principle.number}</span>
            <span className={styles.cardTitle}>{principle.title}</span>
          </span>
          <span className={styles.cardText}>{principle.body}</span>
        </span>
      </button>
    </li>
  )
}

export function Session05DesignPrinciples() {
  const { t } = useTranslation()
  const principles = [
    {
      number: '01',
      title: t('ca.principles.p1Title'),
      body: t('ca.principles.p1Body'),
      artwork: principleArt[0],
    },
    {
      number: '02',
      title: t('ca.principles.p2Title'),
      body: t('ca.principles.p2Body'),
      artwork: principleArt[1],
    },
    {
      number: '03',
      title: t('ca.principles.p3Title'),
      body: t('ca.principles.p3Body'),
      artwork: principleArt[2],
    },
  ]

  return (
    <section
      id="design-principles"
      className={`${styles.section} font-sans`}
      aria-labelledby="s05-headline"
    >
      {/* One group: header and cards sit 8px apart on phones, so they must share one progress.
          Header text travels 68 (= cards 64 + 4, under the 8px gap) instead of 96. */}
      <LayerScrollGroup className={styles.inner}>
        <header className={styles.header}>
          <p className="ca-eyebrow" data-move="68">
            <span className="ca-eyebrow-index">05</span>
            <span className="ca-eyebrow-rule" aria-hidden="true" />
            <span>{t('ca.principles.eyebrow')}</span>
          </p>
          <h2 data-type="h2" id="s05-headline" className={`ca-h2 ${styles.headline}`} data-move="68">
            {t('ca.principles.headline')}
          </h2>
          <p data-type="body" className={styles.intro} data-move="68">{t('ca.principles.intro')}</p>
        </header>

        <ul className={styles.grid} role="list">
          {principles.map((principle) => (
            <PrincipleCard
              key={principle.number}
              principle={principle}
              showFront={t('ca.principles.showFront')}
              revealPrinciple={t('ca.principles.revealPrinciple')}
            />
          ))}
        </ul>
      </LayerScrollGroup>
    </section>
  )
}
