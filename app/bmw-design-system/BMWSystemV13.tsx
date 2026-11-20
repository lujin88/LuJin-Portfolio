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
      <DocsSection />
    </main>
  )
}
