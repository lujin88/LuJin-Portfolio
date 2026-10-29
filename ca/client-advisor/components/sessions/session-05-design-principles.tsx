'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './session-05-design-principles.module.css'
import { ScrollReveal } from '@/components/motion/scroll-reveal'
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

  return (
    <ScrollReveal as="li" fadeOnly className={styles.card}>
      <button
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
    </ScrollReveal>
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
      <div className={styles.inner}>
        <ScrollReveal as="header" className={styles.header}>
          <p className="ca-eyebrow">
            <span className="ca-eyebrow-index">05</span>
            <span className="ca-eyebrow-rule" aria-hidden="true" />
            <span>{t('ca.principles.eyebrow')}</span>
          </p>
          <h2 id="s05-headline" className={styles.headline}>
            {t('ca.principles.headline')}
          </h2>
          <p className={styles.intro}>{t('ca.principles.intro')}</p>
        </ScrollReveal>

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
      </div>
    </section>
  )
}
