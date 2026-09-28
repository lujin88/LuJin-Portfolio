'use client'

import { ScrollReveal } from '@/components/motion/scroll-reveal'
import { useTranslation } from '@i18n/use-translation'
import styles from './session-mandate.module.css'

const TOOLS = [
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'research', label: 'Research' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'market', label: 'Market insights' },
  { id: 'notes', label: 'Notes' },
] as const

function SearchGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <use href="#ca-md-icon-search" />
    </svg>
  )
}

function RearPanel({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      className={`${styles.toolPanel} ${styles.rear} ${
        side === 'left' ? styles.rearLeft : styles.rearRight
      }`}
      aria-hidden="true"
    >
      <div className={styles.rearHeader}>
        <SearchGlyph className={styles.searchIcon} />
        <div className={styles.placeholderLines}>
          <span className={styles.placeholder} />
        </div>
      </div>
      {Array.from({ length: 4 }, (_, i) => (
        <div className={styles.rearRow} key={`${side}-${i}`}>
          <span className={styles.rearOrb} />
          <div className={styles.placeholderLines}>
            <span className={styles.placeholder} />
            <span className={`${styles.placeholder} ${styles.placeholderShort}`} />
          </div>
        </div>
      ))}
    </div>
  )
}

function MandateIcons() {
  return (
    <svg className={styles.svgLibrary} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <symbol id="ca-md-icon-search" viewBox="0 0 32 32">
          <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="13" cy="13" r="10" />
            <path d="m21 21 8 8" />
          </g>
        </symbol>
        <symbol id="ca-md-icon-portfolio" viewBox="0 0 32 32">
          <g fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="16" cy="8.3" r="6.3" />
            <path d="M3 29c.6-6 4.7-8.7 9.1-8.7h7.8c4.4 0 8.5 2.7 9.1 8.7" />
          </g>
        </symbol>
        <symbol id="ca-md-icon-research" viewBox="0 0 32 32">
          <g fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.7 19.2 7.1 7.1a2.6 2.6 0 0 1-3.7 3.7L18 22.9" />
            <circle cx="12.8" cy="12.8" r="10.7" />
            <path d="M7.8 17.6a7 7 0 0 0 10 0" />
          </g>
        </symbol>
        <symbol id="ca-md-icon-compliance" viewBox="26 39 291 273">
          <g fill="none" stroke="currentColor" strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m150 207 79 82a24 24 0 0 0 34-34l-84-72M63 170l85-84 59 61-85 84" />
            <path d="m60 166 65 66a10 10 0 0 1 0 14l-7 7a8 8 0 0 1-11 0l-66-67a10 10 0 0 1 0-14l6-6a9 9 0 0 1 13 0ZM171 108l-27-26a9 9 0 0 1 0-12l6-7a10 10 0 0 1 13 0l20 20" />
            <path d="M169 68c27 7 53-6 67-17 17 12 40 23 66 18 3 65-17 102-66 123-45-22-70-60-67-124Z" fill="#052a44" />
            <path d="m210 120 18 18 34-34" />
          </g>
        </symbol>
        <symbol id="ca-md-icon-market" viewBox="0 0 32 32">
          <g fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 20h7v9H3ZM12.5 12h7v17h-7ZM22 4h7v25h-7Z" />
          </g>
        </symbol>
        <symbol id="ca-md-icon-notes" viewBox="0 0 32 32">
          <g fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 3h12a5 5 0 0 1 5 5v13l-8 8h-9a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Z" />
            <path d="M19 29v-3a5 5 0 0 1 5-5h3M11 10h10M11 16h10M11 22h5" />
          </g>
        </symbol>
      </defs>
    </svg>
  )
}

export function SessionMandate() {
  const { t } = useTranslation()

  return (
    <section
      aria-labelledby="mandate-heading"
      className="ca-s02 relative w-full overflow-visible bg-transparent font-sans text-[var(--ca-text)]"
    >
      <div className={styles.mandate}>
        <MandateIcons />
        <div className={styles.atmosphere} aria-hidden="true" />

        <ScrollReveal className={styles.copy}>
          <p className="ca-eyebrow">
            <span className="ca-eyebrow-index">02</span>
            <span className="ca-eyebrow-rule" aria-hidden="true" />
            <span>{t('ca.mandate.eyebrow')}</span>
          </p>

          <h2
            id="mandate-heading"
            className="ca-h2 mt-[var(--ca-heading-gap)] max-w-[18ch] text-pretty"
          >
            {t('ca.mandate.title')}
          </h2>

          <p className="mt-6 max-w-[46ch] text-pretty text-[15px] font-normal leading-[1.6] text-[var(--ca-text-2)] xl:text-base">
            {t('ca.mandate.body1')}
          </p>

          <div className={styles.question}>
            <p className="ca-eyebrow ca-eyebrow-accent">
              <span>{t('ca.mandate.questionEyebrow')}</span>
            </p>
            <h3 className="mt-6 max-w-[36rem] text-[2rem] font-semibold leading-[1.15] tracking-[-0.015em] sm:text-4xl lg:text-[2.6rem] xl:text-[2.75rem]">
              {t('ca.mandate.questionBefore')}{' '}
              <span className={styles.accent}>{t('ca.mandate.questionAi')}</span>{' '}
              {t('ca.mandate.questionMid')}{' '}
              <span className={styles.accent}>{t('ca.mandate.questionImpact')}</span>{' '}
              {t('ca.mandate.questionAfter')}
            </h3>
            <p className="mt-8 max-w-[46ch] text-pretty text-[15px] font-normal leading-[1.6] text-[var(--ca-text-2)] xl:text-base">
              {t('ca.mandate.body2')}
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.toolStack} aria-label="Separate tools used by advisors">
          <RearPanel side="left" />
          <RearPanel side="right" />
          <div className={`${styles.toolPanel} ${styles.front} ca-s02-ui-card--front`}>
            <div className={styles.clientHeader}>
              <SearchGlyph className={styles.searchIcon} />
              <span>Client information</span>
            </div>
            <ul className={styles.toolList}>
              {TOOLS.map((tool) => (
                <li className={styles.toolRow} key={tool.id}>
                  <span className={styles.iconDisc}>
                    <svg aria-hidden="true">
                      <use href={`#ca-md-icon-${tool.id}`} />
                    </svg>
                  </span>
                  <span>{tool.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className={styles.annotation}>
          <p>
            {t('ca.mandate.note1')}
            {'\n'}
            {t('ca.mandate.note2')}
            {'\n'}
            {t('ca.mandate.note3')}
          </p>
        </aside>
      </div>
    </section>
  )
}
