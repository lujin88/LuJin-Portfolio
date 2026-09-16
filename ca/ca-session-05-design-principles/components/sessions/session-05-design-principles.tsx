'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './session-05-design-principles.module.css'

const copy = {
  labelNumber: '05',
  labelTitle: 'Design Principles',
  headline: 'Turning the model into design decisions.',
  intro:
    "The direction was already decided. It came with one constraint: it couldn't feel like another tool. Signal → Context → Act became the model for how it earned its place — three principles for every moment.",
  principles: [
    {
      number: '01',
      title: 'Surface what matters',
      body: 'Not everything worth knowing deserves a place on screen. A signal earned its spot by urgency and stakes — a portfolio shift, a compliance flag — not by being one more thing to scroll past.',
      artwork: '/images/ca-05-card-01.png',
    },
    {
      number: '02',
      title: 'Explain with context',
      body: 'A signal without a reason is just noise. Every one had to answer "why now," in the time it takes to glance — using the same research, market insights, and client notes the advisor would otherwise have to dig for.',
      artwork: '/images/ca-05-card-02.png',
    },
    {
      number: '03',
      title: 'Support judgement',
      body: 'AI surfaces, it never decides. Every signal is a suggestion — the trade, the allocation, the response to the client stays entirely with the advisor.',
      artwork: '/images/ca-05-card-03.png',
    },
  ],
}

function PrincipleCard({
  principle,
}: {
  principle: (typeof copy.principles)[number]
}) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <li className={styles.card}>
      <button
        type="button"
        className={`${styles.cardInner} ${isFlipped ? styles.flipped : ''}`}
        aria-pressed={isFlipped}
        aria-label={`${principle.title}. ${
          isFlipped ? 'Show front' : 'Reveal the principle'
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
  return (
    <section
      id="design-principles"
      className={`${styles.section} font-sans`}
      aria-labelledby="s05-headline"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.label}>
            <span className={styles.labelNum}>{copy.labelNumber}</span>
            <span className={styles.labelDivider} aria-hidden="true" />
            <span>{copy.labelTitle}</span>
          </p>
          <h2 id="s05-headline" className={styles.headline}>
            {copy.headline}
          </h2>
          <p className={styles.intro}>{copy.intro}</p>
        </header>

        <ul className={styles.grid} role="list">
          {copy.principles.map((principle) => (
            <PrincipleCard key={principle.number} principle={principle} />
          ))}
        </ul>
      </div>
    </section>
  )
}
