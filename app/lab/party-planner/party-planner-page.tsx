'use client'
import { GratulaStory } from './gratula-story'

import type { CSSProperties } from 'react'

import { SiteClosing } from '../../components/site-closing'
import { assets, prototypeUrl } from './config'
import { Icon as LineIcon } from '../../components/line-icon'

function Confetti({
  tone,
  className,
  style,
}: {
  tone: 'pk' | 'bl' | 'yl' | 'mt'
  className?: string
  style?: CSSProperties
}) {
  return <span className={['confetti', tone, className].filter(Boolean).join(' ')} style={style} />
}

function HeroBleed() {
  return (
    <div className="hero-bleed" aria-hidden="true">
      <img
        className="hero-decor gift-photo"
        src={assets.gift}
        alt=""
        width={640}
        height={558}
      />
      <img
        className="hero-decor cake-photo"
        src={assets.cake}
        alt=""
        width={800}
        height={705}
      />
      <img
        className="hero-decor party-photo"
        src={assets.party}
        alt=""
        width={1100}
        height={733}
      />
      <img
        className="hero-decor note-photo"
        src={assets.note}
        alt=""
        width={880}
        height={733}
      />
      <div className="hand hand-left">
        Small parties
        <br />
        create big
        <br />
        memories<span className="h"> ♥</span>
      </div>
      <div className="hand hand-right">
        Better
        <br />
        Parties
        <br />
        Happier
        <br />
        Kids <span className="h">♥</span>
      </div>
      <Confetti tone="pk" className="hc1" />
      <Confetti tone="bl" className="hc2" />
      <Confetti tone="yl" className="hc3" />
      <Confetti tone="pk" className="hc4" />
      <Confetti tone="bl" className="hc5" />
      <Confetti tone="yl" className="hc6" />
      <Confetti tone="yl" className="hc7" />
      <Confetti tone="pk" className="hc8" />
      <Confetti tone="yl" className="hc9" />
    </div>
  )
}

export function PartyPlannerPage() {
  return (
    <>
      <a className="skip-link" href="#hero-title">
        Skip to content
      </a>
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <HeroBleed />
          <div className="hero-frame">
            <div className="hero-copy">
              <p className="hero-brand">Gratula</p>
              <h1 id="hero-title" tabIndex={-1}>
                One calm plan
                <br />
                for their biggest
                <br />
                little day.
              </h1>
              <p>
                From ideas to invitations, a simpler way
                {' '}
                to plan a party they’ll always remember.
              </p>
              <a
                href={prototypeUrl}
                className="pill"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Start a party, open the Gratula prototype (opens in a new tab)"
              >
                <span>Start a party</span>
                <LineIcon name="arrow-right-line" />
              </a>
            </div>
            <a
              href={prototypeUrl}
              className="phone hero-phone"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the Gratula prototype from the home screen (opens in a new tab)"
            >
              <div className="screen">
                <img
                  src={assets.screenHome}
                  width={782}
                  height={1704}
                  alt=""
                  fetchPriority="high"
                />
              </div>
            </a>
          </div>
        </section>

        <GratulaStory />

        <SiteClosing className="pp-site-closing" />
      </main>
    </>
  )
}
