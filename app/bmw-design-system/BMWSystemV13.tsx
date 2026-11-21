'use client'
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
      <div className="v13-bg" role="img" aria-label={t('bmw.v13.hero.alt')} />
      <header className="v13-hero-head">
        <p className="v13-eyebrow">{t('bmw.v13.hero.eyebrow')}</p>
        <h1>{t('bmw.v13.hero.title')}</h1>
        <p className="v13-hero-sub">{t('bmw.v13.hero.sub')}</p>
      </header>
      <nav className="v13-stores" aria-label={t('bmw.hero.downloadLabel')}>
        <a className="v13-store" data-store="apple" href="https://apps.apple.com/ch/app/my-bmw/id1519034860" target="_blank" rel="noopener" aria-label={t('bmw.v13.hero.appStoreLabel')}>
          <span>{t('bmw.v13.hero.open')}</span><b>{t('bmw.v13.hero.appStore')}</b>
        </a>
        <a className="v13-store" data-store="play" href="https://play.google.com/store/apps/details?id=de.bmw.connected.mobile20.row" target="_blank" rel="noopener" aria-label={t('bmw.v13.hero.playStoreLabel')}>
          <span>{t('bmw.v13.hero.open')}</span><b>{t('bmw.v13.hero.playStore')}</b>
        </a>
      </nav>
    </section>
  )
}

function SpecSection() {
  const { t, ta } = useTranslation()
  const steps = ta('bmw.v13.spec.steps')
  return (
    <section className="v13-spec" aria-labelledby="v13-spec-title">
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
    </section>
  )
}

function FlowSection() {
  const { t } = useTranslation()
  return (
    <section className="v13-flow" aria-labelledby="v13-flow-title">
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
    </section>
  )
}

function KeySection() {
  const { t } = useTranslation()
  return (
    <section className="v13-key" aria-labelledby="v13-key-title">
      <div className="v13-bg" aria-hidden="true" />
      <header className="v13-head">
        <h2 id="v13-key-title">{t('bmw.v13.key.title')}</h2>
        <p>{t('bmw.v13.key.sub')}</p>
      </header>
      <div className="v13-key-art" role="img" aria-label={t('bmw.v13.key.alt')} />
      <p className="v13-caption v13-key-caption">{t('bmw.v13.key.caption')}</p>
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
    </section>
  )
}

export function BMWSystemV13() {
  return (
    <main className="bmw-v13" id="top">
      <HeroSection />
      <SpecSection />
      <FlowSection />
      <DocsSection />
      <KeySection />
    </main>
  )
}
