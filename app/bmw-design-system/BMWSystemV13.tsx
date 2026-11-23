'use client'
import { useEffect, useRef, type RefObject } from 'react'
import './v13.css'
import { useTranslation } from '@i18n/use-translation'

// v13 (Lu #21209; continuous layout Lu #24242, visual #24268): five blocks in one editorial flow on one page-wide backdrop. Text is HTML; the images are text-free.
function Chevron({ open }: { open: boolean }) {
  return (
    <svg className="story-chev" viewBox="0 0 16 16" aria-hidden="true">
      <path d={open ? 'M3 5.5 8 10.5 13 5.5' : 'M5.5 3 10.5 8 5.5 13'} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const ART = '/assets/images/bmw-system/v13'

function Story() {
  const { t, ta } = useTranslation()
  const steps = ta('bmw.v13.spec.steps')
  const tree = ta('bmw.v13.docs.tree')
  // [label, depth, marker]
  const rows: Array<[string, number, 'closed' | 'open' | 'dot']> = [
    [tree[0], 0, 'closed'], [tree[1], 0, 'open'], [tree[2], 1, 'closed'], [tree[3], 1, 'open'],
    [tree[4], 2, 'dot'], [tree[5], 2, 'dot'], [tree[6], 2, 'dot'],
  ]
  return (
    <>
      <section className="story-hero" aria-labelledby="story-title">
        <div className="story-wrap">
          <div className="story-hero-art" role="img" aria-label={t('bmw.v13.hero.alt')} />
          <div className="story-intro">
            <div>
              <h1 id="story-title">{t('bmw.v13.hero.title')}</h1>
              <p>{t('bmw.v13.hero.sub')}</p>
            </div>
            <nav className="story-stores" aria-label={t('bmw.hero.downloadLabel')}>
              <a className="story-store" data-store="apple" href="https://apps.apple.com/ch/app/my-bmw/id1519034860" target="_blank" rel="noopener" aria-label={t('bmw.v13.hero.appStoreLabel')}>
                <svg className="story-store-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.900zM14.2 5.800c.6-.8 1.1-1.8.9-2.8-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.7-1 2.700 1 .1 2-.5 2.8-1.3z"/></svg>
                <span>{t('bmw.v13.hero.open')}</span><b>{t('bmw.v13.hero.appStore')}</b>
              </a>
              <a className="story-store" data-store="play" href="https://play.google.com/store/apps/details?id=de.bmw.connected.mobile20.row" target="_blank" rel="noopener" aria-label={t('bmw.v13.hero.playStoreLabel')}>
                <svg className="story-store-icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M6 3.500v17L18.5 12 6 3.500z"/></svg>
                <span>{t('bmw.v13.hero.openPlay')}</span><b>{t('bmw.v13.hero.playStore')}</b>
              </a>
            </nav>
          </div>
        </div>
      </section>
      <div className="story-content story-wrap">
        <section className="story-spec" aria-labelledby="v13-spec-title">
          <div className="story-spec-art"><img src={`${ART}/spec-cutout.png`} alt={t('bmw.v13.spec.alt')} width={1536} height={1024} loading="lazy" decoding="async" /></div>
          <div className="story-copy">
            <h2 id="v13-spec-title">{t('bmw.v13.spec.title')}</h2>
            <ol className="story-steps">
              {steps.map((label, i) => (
                <li key={i}><b>{String(i + 1).padStart(2, '0')}</b><span>{label}</span></li>
              ))}
            </ol>
            <p>{t('bmw.v13.spec.note')}</p>
            <small>{t('bmw.v13.spec.caption')}</small>
          </div>
        </section>
        <section className="story-flow" aria-labelledby="v13-flow-title">
          <div className="story-flow-intro">
            <h2 id="v13-flow-title">{t('bmw.v13.flow.title')}</h2>
            <p>{t('bmw.v13.flow.sub')}</p>
          </div>
          <p className="story-flow-hint">{t('bmw.v13.flow.scroll')}</p>
          <div className="story-flow-scroll" tabIndex={0} role="img" aria-label={t('bmw.v13.flow.alt')}>
            <div className="story-flow-art">
              <div className="story-flow-source" aria-hidden="true">
                <img src={`${ART}/flow-b-panel.webp`} width={1536} height={1024} alt="" loading="lazy" decoding="async" />
                <img className="story-flow-retouch" src={`${ART}/logic-line-retouch.png`} width={200} height={165} alt="" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </section>
        <section className="story-docs" aria-labelledby="v13-docs-title">
          <header>
            <h2 id="v13-docs-title">{t('bmw.v13.docs.title')}</h2>
            <p>{t('bmw.v13.docs.sub')}</p>
          </header>
          <div className="story-panel">
            <div className="story-panel-top">
              <span className="story-brand"><img src={`${ART}/confluence-mark.png`} alt="" width={52} height={52} />Confluence</span>
              <span className="story-pill">{t('bmw.v13.docs.jira')}</span>
            </div>
            <div className="story-panel-body">
              <ul className="story-tree">
                {rows.map(([label, depth, marker], i) => (
                  <li key={i} data-depth={depth} data-strong={i === 0 || i === 1 || i === 3 ? '' : undefined}>
                    {marker === 'dot' ? <i className="story-dot" aria-hidden="true" /> : <Chevron open={marker === 'open'} />}
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
              <dl className="story-groups">
                <div><dt>{t('bmw.v13.docs.current')}</dt><dd>{t('bmw.v13.docs.currentNote')}</dd></div>
                <div><dt>{t('bmw.v13.docs.vision')}</dt><dd>{t('bmw.v13.docs.visionNote')}</dd></div>
                <div><dt>{t('bmw.v13.docs.background')}</dt><dd>{t('bmw.v13.docs.backgroundNote')}</dd></div>
              </dl>
            </div>
          </div>
          <small>{t('bmw.v13.docs.caption')}</small>
        </section>
        <section className="story-key" aria-labelledby="v13-key-title">
          <div className="story-copy">
            <h2 id="v13-key-title">{t('bmw.v13.key.title')}</h2>
            <p>{t('bmw.v13.key.sub')}</p>
          </div>
          <img className="story-key-art" src={`${ART}/section-05.webp`} alt={t('bmw.v13.key.alt')} width={1536} height={1024} loading="lazy" decoding="async" />
        </section>
      </div>
    </>
  )
}

// Parallax (Lu #22731, continuous page Lu #24242): only the one page-wide backdrop drifts, slower than the page; text and its art stay together.
// Transform only (GPU, no layout), one rAF per scroll frame, off for reduced motion.
function useBackgroundParallax(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const main = ref.current
    const layer = main?.querySelector<HTMLElement>('.v13-backdrop')
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
      if (!main || !layer) return
      if (mq.matches) { layer.style.transform = ''; return }
      const r = main.getBoundingClientRect()
      const vh = window.innerHeight
      if (r.bottom < -vh || r.top > 2 * vh) return
      // 0 at the top of the page, 1 when the bottom of the page reaches the bottom of the viewport; the layer has 60px spare above and below
      const q = Math.max(0, Math.min(1, -r.top / Math.max(1, r.height - vh)))
      layer.style.transform = `translate3d(0,${((q - 0.5) * 100).toFixed(1)}px,0)`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    mq.addEventListener('change', onScroll)
    return () => { mq.removeEventListener('change', onScroll); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf) }
  }, [ref])
}

// Content rises in section by section (Lu #23628). The hidden start state only exists once this has run, so no JS or reduced motion shows everything.
function useRiseIn(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const secs = Array.from(root.querySelectorAll<HTMLElement>('.story-content > section'))
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
  useBackgroundParallax(ref)
  useRiseIn(ref)
  return (
    <main className="bmw-v13" id="top" ref={ref}>
      <div className="v13-backdrop" aria-hidden="true" />
      <Story />
    </main>
  )
}
