'use client'

import type { CSSProperties } from 'react'

import { SiteClosing } from '../../components/site-closing'
import { PartyPlannerCanvas } from './canvas-fit'
import { assets, prototypeUrl } from './config'
import { Icon as LineIcon } from '../../components/icon'
import { Icon, IconSprite } from './icon-sprite'

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

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M19 10H20C20.5523 10 21 10.4477 21 11V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11C3 10.4477 3.44772 10 4 10H5V9C5 5.13401 8.13401 2 12 2C15.866 2 19 5.13401 19 9V10ZM5 12V20H19V12H5ZM11 14H13V18H11V14ZM17 10V9C17 6.23858 14.7614 4 12 4C9.23858 4 7 6.23858 7 9V10H17Z"
      />
    </svg>
  )
}

function OneLinkSection() {
  return (
    <section className="one-link" aria-labelledby="one-link-title">
      <div className="one-link-intro">
        <h2 id="one-link-title">One link. Three things parents need.</h2>
        <p>Everything a guest family needs, from one invitation link.</p>
      </div>
      <div className="one-link-grid">
        <article className="one-link-card">
          <div className="one-link-kicker">
            <span className="one-link-label">RSVP</span>
            <span className="one-link-chip">No app</span>
          </div>
          <h3>Reply without an account</h3>
          <p>No app, no account. Reply from the invite.</p>
          <div className="one-link-moment">
            <div className="one-link-product">
              <p className="one-link-ask">Can you come?</p>
              <p className="one-link-when">Sat 14 Jun · 15:00</p>
              <div className="one-link-answers">
                <span className="one-link-answer yes">Yes</span>
                <span className="one-link-answer">No</span>
              </div>
              <p className="one-link-note">One tap. The host sees it.</p>
            </div>
          </div>
        </article>
        <article className="one-link-card">
          <div className="one-link-kicker">
            <span className="one-link-label">WISHLIST</span>
            <span className="one-link-chip">No doubles</span>
          </div>
          <h3>Claim a gift, once</h3>
          <p>See what&apos;s still open and what&apos;s taken.</p>
          <div className="one-link-moment">
            <div className="one-link-product">
              <div className="one-link-wish">
                <span>Wooden train set</span>
                <span className="one-link-claim">Claim</span>
              </div>
              <div className="one-link-wish">
                <span>Picture book</span>
                <span className="one-link-claim claimed">Claimed</span>
              </div>
              <p className="one-link-note">Claimed gifts stay off the list.</p>
            </div>
          </div>
        </article>
        <article className="one-link-card">
          <div className="one-link-kicker">
            <span className="one-link-label">PRIVACY</span>
            <span className="one-link-chip">Host only</span>
          </div>
          <h3>Allergies stay with the host</h3>
          <p>Only the host sees dietary notes and phone numbers.</p>
          <div className="one-link-moment">
            <div className="one-link-product">
              <div className="one-link-host">
                <span className="one-link-lock">
                  <LockIcon />
                </span>
                <strong>Only the host</strong>
              </div>
              <p className="one-link-private">
                Dietary notes and phone numbers stay private.
              </p>
              <div className="one-link-retention">
                <span className="one-link-deleted">Deleted</span>
                <span>Guest data is removed after 30 days.</span>
              </div>
              <p className="one-link-note">Guests never see each other&apos;s details.</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
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

        <OneLinkSection />

        <PartyPlannerCanvas>
          <section id="plan" className="plan-section" aria-labelledby="plan-title">
            <h2 className="section-title" id="plan-title">
              Four details in. One beautiful plan out.
            </h2>
            <div className="panel plan">
              <div className="plan-copy">
                <div className="eyebrow">Your party plan</div>
                <ul className="plan-facts" aria-label="Party details">
                  <li>
                    <Icon name="i-palette" />
                    <div>
                      <small>Theme</small>
                      <b>Pony</b>
                    </div>
                  </li>
                  <li>
                    <Icon name="i-users" />
                    <div>
                      <small>Age</small>
                      <b>6</b>
                    </div>
                  </li>
                  <li>
                    <Icon name="i-wallet" />
                    <div>
                      <small>Budget</small>
                      <b>CHF 900</b>
                    </div>
                  </li>
                  <li>
                    <Icon name="i-cal" />
                    <div>
                      <small>Date</small>
                      <b>24 May</b>
                    </div>
                  </li>
                </ul>
                <p className="plan-summary">
                  The practical details become
                  <br />
                  a plan you can actually use.
                </p>
              </div>

              <div className="invite-stage">
                <article className="invite-card" aria-label="Mia's invitation poster">
                  <svg className="invite-arc" viewBox="0 0 320 70" aria-hidden="true">
                    <path id="arc" d="M22 58 Q160 16 298 58" fill="none" />
                    <text>
                      <textPath href="#arc" startOffset="50%" textAnchor="middle">
                        YOU’RE INVITED
                      </textPath>
                    </text>
                  </svg>
                  <Icon name="i-heart" className="deco heart d3" />
                  <Icon name="i-star" className="deco star d1" />
                  <Icon name="i-star" className="deco star d2" />
                  <Icon name="i-heart" className="deco heart d6" />
                  <Icon name="i-star" className="deco star d5" />
                  <Icon name="i-heart" className="deco heart d4" />
                  <div className="child-wrap">
                    <img
                      src={assets.child}
                      width={760}
                      height={1140}
                      alt="A smiling child wearing a unicorn headband"
                    />
                  </div>
                  <h3>Mia is turning 6!</h3>
                  <div className="invite-meta">
                    Saturday, 24 May · 14:00
                    <br />
                    Seebad Enge, Zürich
                  </div>
                  <div className="invite-rsvp">RSVP</div>
                </article>
              </div>
            </div>
          </section>

          <section id="rsvp" className="rsvp-section" aria-labelledby="rsvp-title">
            <div className="panel rsvp">
              <h2 id="rsvp-title">One reply in. Everything stays current.</h2>
              <p className="sub">No recounting. No tabs to update.</p>

              <div className="guest-card" aria-label="Guests and RSVPs">
                <div className="guest-head">
                  <Icon name="i-back" />
                  <span>Guests &amp; RSVPs</span>
                  <LineIcon name="add-line" />
                </div>
                <p className="guest-intro">
                  Replies from the RSVP link and guests you add yourself, in one list.
                </p>
                <div className="guest-counts" aria-label="RSVP summary">
                  <div className="guest-count coming">
                    <b>4</b>
                    <span>Coming</span>
                  </div>
                  <div className="guest-count waiting">
                    <b>3</b>
                    <span>Waiting</span>
                  </div>
                  <div className="guest-count declined">
                    <b>1</b>
                    <span>Not coming</span>
                  </div>
                </div>
                <p className="guest-caption">
                  About 5 kids including Mia — no need to count siblings or parents.
                </p>
                <div className="guest-list">
                  <div className="guest-person">
                    <span className="avatar">N</span>
                    <span className="guest-name">Noah</span>
                    <span className="tag coming">Coming</span>
                  </div>
                  <div className="guest-person">
                    <span className="avatar">E</span>
                    <span className="guest-name">Emma</span>
                    <span className="tag coming">Coming</span>
                  </div>
                  <div className="guest-person">
                    <span className="avatar">L</span>
                    <span className="guest-name">Luca</span>
                    <span className="tag coming">Coming</span>
                  </div>
                </div>
              </div>

              <span className="spark sp1" aria-hidden="true">
                <Icon name="i-spark" />
              </span>
              <ul className="sync" aria-label="Details that update automatically">
                <li>
                  <span className="dot" style={{ background: 'var(--pink)' }} />
                  <Icon name="i-cake" />
                  <div>
                    <strong>Cake</strong>
                    <span>18 servings</span>
                  </div>
                </li>
                <li>
                  <span className="dot" style={{ background: 'var(--mint)' }} />
                  <Icon name="i-gift" />
                  <div>
                    <strong>Party bags</strong>
                    <span>12 ready</span>
                  </div>
                </li>
                <li>
                  <span className="dot" style={{ background: '#1f63e0' }} />
                  <Icon name="i-home" />
                  <div>
                    <strong>Venue</strong>
                    <span>still fits</span>
                  </div>
                </li>
                <li>
                  <span className="dot" style={{ background: 'var(--yellow)' }} />
                  <Icon name="i-clock" />
                  <div>
                    <strong>Schedule</strong>
                    <span>+15 min</span>
                  </div>
                </li>
              </ul>
              <span className="spark sp2" aria-hidden="true">
                <Icon name="i-spark" />
              </span>
            </div>
          </section>

          <section id="local" className="local-section" aria-labelledby="local-title">
            <h2 className="section-title" id="local-title">
              Local knowledge. Your final choice.
            </h2>
            <div className="panel local">
              <div className="eyebrow">Curated near Zürich</div>
              <h3>
                Three good
                <br />
                options beat
                <br />
                thirty open tabs.
              </h3>
              <div className="near">
                <Icon name="i-pin" />
                Within 10 km · checked recently
              </div>
              <div className="cards">
                <article className="supplier">
                  <div className="supplier-media" role="img" aria-label="Unicorn birthday cake" />
                  <div className="supplier-body">
                    <h4>Sweet Moments</h4>
                    <p>Custom birthday cakes</p>
                    <div className="loc">
                      <Icon name="i-pin" />
                      Zürich
                    </div>
                  </div>
                  <div className="price">CHF 70 – 110</div>
                  <Icon name="i-right" className="arrow" />
                </article>
                <article className="supplier">
                  <div className="supplier-media" role="img" aria-label="Lakeside party venue" />
                  <div className="supplier-body">
                    <h4>Seebad Enge</h4>
                    <p>Party venue</p>
                    <div className="loc">
                      <Icon name="i-pin" />
                      Zürich
                    </div>
                  </div>
                  <div className="price">CHF 300 – 450</div>
                  <Icon name="i-right" className="arrow" />
                </article>
                <article className="supplier">
                  <div
                    className="supplier-media"
                    role="img"
                    aria-label="Magician's hat and wand"
                  />
                  <div className="supplier-body">
                    <h4>Magic Marco</h4>
                    <p>Children’s entertainer</p>
                    <div className="loc">
                      <Icon name="i-pin" />
                      Zürich
                    </div>
                  </div>
                  <div className="price">CHF 240 – 350</div>
                  <Icon name="i-right" className="arrow" />
                </article>
              </div>
            </div>
          </section>

          <IconSprite />
        </PartyPlannerCanvas>

          <section id="party-day" className="closing" aria-labelledby="closing-title">
            <div className="closing-bleed" aria-hidden="true">
              <img
                className="closing-prop party-close"
                src={assets.party}
                alt=""
                width={1100}
                height={733}
              />
              <img
                className="closing-prop gift-close"
                src={assets.gift}
                alt=""
                width={640}
                height={558}
              />
              <Confetti tone="pk" className="cc1" />
              <Confetti tone="yl" className="cc2" />
              <Confetti tone="pk" className="cc3" />
              <Confetti tone="yl" className="cc4" />
              <Confetti tone="bl" className="cc5" />
              <Confetti tone="mt" className="cc6" />
              <Confetti tone="pk" className="cc7" />
              <Confetti tone="yl" className="cc8" />
              <Confetti tone="bl" className="cc9" />
              <Confetti tone="pk" className="cc10" />
              <Confetti tone="mt" className="cc11" />
              <Confetti tone="yl" className="cc12" />
            </div>
            <h2 className="section-title" id="closing-title">
              Be there for the candles.
              <br />
              We’ll hold the details.
            </h2>
            <a
              href={prototypeUrl}
              className="phone day-phone"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the Gratula prototype from the party-day screen (opens in a new tab)"
            >
              <div className="screen">
                <img
                  src={assets.screenDay}
                  width={782}
                  height={1704}
                  alt=""
                />
              </div>
            </a>
            <a
              className="pill"
              href={prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Start planning, open the Gratula prototype (opens in a new tab)"
            >
              <span>Start planning</span>
              <LineIcon name="arrow-right-line" />
            </a>
            <div className="closing-footer">Happier planning. Brighter childhoods.</div>
          </section>

        <SiteClosing className="pp-site-closing" />
      </main>
    </>
  )
}
