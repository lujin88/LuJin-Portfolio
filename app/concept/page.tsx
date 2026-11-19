'use client'

import { useState } from 'react'
import './concept.css'

type ConceptCard = {
  id: string
  title: string
  summary: string
  image: string
  imageAlt: string
  problem: string
  hypothesis: string
  tilt: number
}

// Copy is the Lu-supplied Grok draft. "to be added" lines are the pending copy
// from the approved key screen and still need Lu's text.
const CARDS: ConceptCard[] = [
  {
    id: 'C01',
    title: 'ETF Savings Plan',
    summary: 'Set up a Swiss ETF Sparplan once, and keep it on track.',
    image: '/assets/images/concept-cards/etf.jpg',
    imageAlt: 'ETF savings plan concept artwork',
    problem: 'How do you set up a Swiss ETF savings plan (Sparplan) once, and get it right?',
    hypothesis: 'Hypothesis to be added.',
    tilt: -3,
  },
  {
    id: 'C02',
    title: 'YouTube Viewer Shopping',
    summary: 'Compare products in review videos, and save them for later.',
    image: '/assets/images/concept-cards/youtube.jpg',
    imageAlt: 'YouTube viewer shopping concept artwork',
    problem: 'Problem statement to be added.',
    hypothesis: 'Hypothesis to be added.',
    tilt: 2,
  },
  {
    id: 'C03',
    title: 'MAN Truck & Bus',
    summary: 'Problem statement to be added.',
    image: '/assets/images/concept-cards/man.jpg',
    imageAlt: 'MAN Truck & Bus concept artwork',
    problem: 'Problem statement to be added.',
    hypothesis: 'Hypothesis to be added.',
    tilt: -2,
  },
]

function LanyardCard({ card }: { card: ConceptCard }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <li className="concept__slot" style={{ ['--tilt' as string]: `${card.tilt}deg` }}>
      <span className="concept__clip" aria-hidden="true" />
      <button
        type="button"
        className="concept__card"
        data-flipped={flipped}
        aria-pressed={flipped}
        aria-label={`${card.title}: flip card`}
        onClick={() => setFlipped((v) => !v)}
      >
        <span className="concept__face concept__front">
          <span className="concept__label">{card.id}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="concept__art" src={card.image} alt={card.imageAlt} width={1080} height={1350} loading="lazy" decoding="async" />
          <span className="concept__title">{card.title}</span>
          <span className="concept__text">{card.summary}</span>
        </span>
        <span className="concept__face concept__back" aria-hidden={!flipped}>
          <span className="concept__label">{card.id}</span>
          <span className="concept__chip">Concept · Self-initiated</span>
          <span className="concept__block">
            <span className="concept__label">PROBLEM</span>
            <span className="concept__text">{card.problem}</span>
          </span>
          <span className="concept__block">
            <span className="concept__label">HYPOTHESIS</span>
            <span className="concept__text">{card.hypothesis}</span>
          </span>
        </span>
      </button>
    </li>
  )
}

export default function ConceptPage() {
  return (
    <main className="concept">
      <header className="concept__head">
        <div>
          <span className="concept__eyebrow">SELF-INITIATED</span>
          <h1>Concept</h1>
        </div>
        <p>Self-initiated work. Each card starts from a problem and a hypothesis — not a shipped result.</p>
      </header>
      <ul className="concept__deck">
        {CARDS.map((card) => (
          <LanyardCard key={card.id} card={card} />
        ))}
      </ul>
      <p className="concept__hint">
        <span className="concept__hint-desktop">Hover to swing · Click to flip</span>
        <span className="concept__hint-touch">Tap to flip</span>
      </p>
    </main>
  )
}
