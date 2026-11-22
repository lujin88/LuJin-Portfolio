'use client'
import { useEffect, useRef, type RefObject } from 'react'
import './v13.css'
import { useTranslation } from '@i18n/use-translation'

// v13 (Lu #21209): five sections on one continuous gradient. Text is HTML; the images are text-free backgrounds.
// Text that sits on slanted surfaces (phone screens, slanted cards, slanted logic diagram) stays in the image (PM #21266).
function Chevron({ open }: { open: boolean }) {
  return (
    <svg className="v13-chev" viewBox="0 0 16 16" aria-hidden="true">
      <path d={open ? 'M3 5.5 8 10.5 13 5.5' : 'M5.5 3 10.5 8 5.5 13'} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HeroSection() {
  const { t } = useTranslation()
  return (
    <section className="v13-hero" aria-label={t('bmw.v13.hero.alt')}>
      <div className="v13-review-stage">
        <div className="v13-bg" role="img" aria-label={t('bmw.v13.hero.alt')} />
        <header className="v13-hero-head">
          <p className="v13-eyebrow">{t('bmw.v13.hero.eyebrow')}</p>
          <h1>{t('bmw.v13.hero.title')}</h1>
          <p className="v13-hero-sub">{t('bmw.v13.hero.sub')}</p>
        </header>
        <nav className="v13-stores" aria-label={t('bmw.hero.downloadLabel')}>
          <a className="v13-store" data-store="apple" href="https://apps.apple.com/ch/app/my-bmw/id1519034860" target="_blank" rel="noopener" aria-label={t('bmw.v13.hero.appStoreLabel')}>
            <svg className="v13-store-ico" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.900zM14.2 5.800c.6-.8 1.1-1.8.9-2.8-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.7-1 2.700 1 .1 2-.5 2.8-1.3z"/></svg>
            <span>{t('bmw.v13.hero.open')}</span><b>{t('bmw.v13.hero.appStore')}</b>
          </a>
          <a className="v13-store" data-store="play" href="https://play.google.com/store/apps/details?id=de.bmw.connected.mobile20.row" target="_blank" rel="noopener" aria-label={t('bmw.v13.hero.playStoreLabel')}>
            <svg className="v13-store-ico" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M6 3.500v17L18.5 12 6 3.500z"/></svg>
            <span>{t('bmw.v13.hero.openPlay')}</span><b>{t('bmw.v13.hero.playStore')}</b>
          </a>
        </nav>
      </div>
    </section>
  )
}

function SpecSection() {
  const { t, ta } = useTranslation()
  const steps = ta('bmw.v13.spec.steps')
  return (
    <section className="v13-spec" aria-labelledby="v13-spec-title">
      <div className="v13-review-stage">
        <div className="v13-bg" role="img" aria-label={t('bmw.v13.spec.alt')} />
        <div className="v13-spec-text">
          <h2 id="v13-spec-title">{t('bmw.v13.spec.title')}</h2>
          <ol>
            {steps.map((label, i) => (
              <li key={i}><b>{String(i + 1).padStart(2, '0')}</b><span>{label}</span></li>
            ))}
          </ol>
          <p className="v13-spec-note">{t('bmw.v13.spec.note')}</p>
          <p className="v13-spec-caption">{t('bmw.v13.spec.caption')}</p>
        </div>
      </div>
    </section>
  )
}

function FlowSection() {
  const { t } = useTranslation()
  return (
    <section className="v13-flow" aria-labelledby="v13-flow-title">
      <div className="v13-review-stage">
        <div className="v13-bg" aria-hidden="true" />
        <header className="v13-flow-head">
          <h2 id="v13-flow-title">{t('bmw.v13.flow.title')}</h2>
          <p>{t('bmw.v13.flow.sub')}</p>
        </header>
        <p className="v13-flow-label">{t('bmw.v13.flow.label')}</p>
        <p className="v13-flow-hint">{t('bmw.v13.flow.scroll')}</p>
        <div className="v13-flow-scroll" tabIndex={0} role="img" aria-label={t('bmw.v13.flow.alt')}>
          <div className="v13-flow-art" />
        </div>
      </div>
    </section>
  )
}

function KeySection() {
  const { t } = useTranslation()
  return (
    <section className="v13-key" aria-labelledby="v13-key-title">
      <div className="v13-review-stage">
        <div className="v13-bg" aria-hidden="true" />
        <header className="v13-head">
          <h2 id="v13-key-title">{t('bmw.v13.key.title')}</h2>
          <p>{t('bmw.v13.key.sub')}</p>
        </header>
        <div className="v13-key-art" role="img" aria-label={t('bmw.v13.key.alt')} />
      </div>
    </section>
  )
}

function DocsSection() {
  const { t, ta } = useTranslation()
  const tree = ta('bmw.v13.docs.tree')
  // [label, depth, marker]
  const rows: Array<[string, number, 'closed' | 'open' | 'dot']> = [
    [tree[0], 0, 'closed'], [tree[1], 0, 'open'], [tree[2], 1, 'closed'], [tree[3], 1, 'open'],
    [tree[4], 2, 'dot'], [tree[5], 2, 'dot'], [tree[6], 2, 'dot'],
  ]
  return (
    <section className="v13-docs" aria-labelledby="v13-docs-title">
      <div className="v13-review-stage">
        <div className="v13-docs-bg" aria-hidden="true" />
        <header className="v13-head">
          <h2 id="v13-docs-title">{t('bmw.v13.docs.title')}</h2>
          <p>{t('bmw.v13.docs.sub')}</p>
        </header>
        <div className="v13-panel">
          <div className="v13-panel-top">
            <span className="v13-brand"><img src="/assets/images/bmw-system/v13/confluence-mark.png" alt="" width={52} height={52} />Confluence</span>
            <span className="v13-pill">{t('bmw.v13.docs.jira')}</span>
          </div>
          <div className="v13-panel-body">
            <ul className="v13-tree">
              {rows.map(([label, depth, marker], i) => (
                <li key={i} data-depth={depth} data-strong={i === 0 || i === 1 || i === 3 ? '' : undefined}>
                  {marker === 'dot' ? <i className="v13-dot" aria-hidden="true" /> : <Chevron open={marker === 'open'} />}
                  <span>{label}</span>
                </li>
              ))}
            </ul>
            <dl className="v13-groups">
              <div><dt>{t('bmw.v13.docs.current')}</dt><dd>{t('bmw.v13.docs.currentNote')}</dd></div>
              <div><dt>{t('bmw.v13.docs.vision')}</dt><dd>{t('bmw.v13.docs.visionNote')}</dd></div>
              <div><dt>{t('bmw.v13.docs.background')}</dt><dd>{t('bmw.v13.docs.backgroundNote')}</dd></div>
            </dl>
          </div>
        </div>
        <p className="v13-caption">{t('bmw.v13.docs.caption')}</p>
      </div>
    </section>
  )
}

// Parallax (Lu #22731): the text-free background art drifts slower than the page. Transform only (GPU, no layout),
// one rAF per scroll frame, off for reduced motion and on the stacked mobile layout where the art is in flow.
function useBackgroundParallax() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const layers = Array.from(document.querySelectorAll<HTMLElement>('.bmw-v13 .v13-bg, .bmw-v13 .v13-docs-bg'))
    // the store boxes are drawn in the hero art, so their HTML labels must drift with it
    const stores = Array.from(document.querySelectorAll<HTMLElement>('.bmw-v13 .v13-hero .v13-store'))
    // closing block ("Have an opportunity in mind?"): its glow layer lags the page via --bm-py (Lu #22757)
    const closing = document.querySelector<HTMLElement>('.bm-closing')
    let raf = 0
    const update = () => {
      raf = 0
      if (closing) {
        const r = closing.getBoundingClientRect()
        const q = Math.max(0, Math.min(1, (window.innerHeight - r.top) / (window.innerHeight + r.height)))
        closing.style.setProperty('--bm-py', mq.matches ? '0px' : `${((q - 0.5) * 120).toFixed(1)}px`)
      }
      if (mq.matches) { for (const el of layers) el.style.transform = ''; for (const el of stores) el.style.transform = ''; return }
      const vh = window.innerHeight
      for (const el of layers) {
        const host = el.closest('section') as HTMLElement
        // spec and flow have list lines / label leaders baked into the art that must stay on their HTML text (Lu #22743)
        if (host.classList.contains('v13-spec') || host.classList.contains('v13-flow')) { el.style.transform = ''; continue }
        // in flow (stacked layout) there is nothing to drift; the desktop hero bg is relative inside its grid and does drift
        if (getComputedStyle(el).position === 'static') { el.style.transform = ''; continue }
        const r = host.getBoundingClientRect()
        if (r.bottom < -vh || r.top > 2 * vh) continue
        const hero = host.classList.contains('v13-hero')
        // -1..1 while the section crosses the viewport; background lags the page (moves down while the page scrolls up); the hero only lags forward so its top edge never shows a gap
        const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2)))
        const ty = hero ? Math.min(1, Math.max(0, -r.top / r.height)) * r.height * 0.06 : -p * r.height * 0.05
        el.style.transform = `translate3d(0,${ty.toFixed(1)}px,0)`
        if (hero) for (const st of stores) st.style.transform = getComputedStyle(st).position === 'absolute' ? el.style.transform : ''
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    mq.addEventListener('change', onScroll)
    return () => { mq.removeEventListener('change', onScroll); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [])
}

// Content rises in section by section (Lu #23628). The hidden start state only exists once this has run, so no JS or reduced motion shows everything.
function useRiseIn(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const secs = Array.from(root.querySelectorAll<HTMLElement>('section:not(.v13-hero)'))
    const io = new IntersectionObserver(es => { for (const e of es) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) } }, { threshold: 0.12 })
    for (const s of secs) {
      // already on screen at load (tall viewport): show without waiting
      if (s.getBoundingClientRect().top < window.innerHeight * 0.85) s.classList.add('is-in')
      else io.observe(s)
    }
    root.classList.add('v13-rise')
    return () => { io.disconnect(); root.classList.remove('v13-rise') }
  }, [ref])
}

export function BMWSystemV13() {
  const ref = useRef<HTMLElement>(null)
  useBackgroundParallax()
  useRiseIn(ref)
  return (
    <main className="bmw-v13" id="top" ref={ref}>
      <HeroSection />
      <SpecSection />
      <FlowSection />
      <DocsSection />
      <KeySection />
    </main>
  )
}
