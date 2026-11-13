'use client'
import { LayerScrollGroup } from '@eon/components/motion/layer-scroll-group'

import styles from './session-04-the-shift.module.css'
import { useTranslation } from '@i18n/use-translation'
import { ShiftDiagram } from './shift-diagram'

export function Session04TheShift() {
  const { t, lang } = useTranslation()

  return (
    <section
      id="session-04"
      aria-labelledby="session-04-heading"
      className={`${styles.section} font-[family-name:var(--font-poppins)]`}
    >
      <LayerScrollGroup>
        <div className={styles.atmosphere} data-move="24" aria-hidden="true" />
        <div className={styles.atmos} data-move="24" aria-hidden="true" />
      </LayerScrollGroup>

      <div className={styles.inner}>
        <div className={styles.layout}>
          <LayerScrollGroup className={styles.lead}>
            <p className="ca-eyebrow" data-move="96">
              <span className="ca-eyebrow-index">04</span>
              <span className="ca-eyebrow-rule" aria-hidden="true" />
              <span>{t('ca.shift.eyebrow')}</span>
            </p>

            <div className={styles.copy} data-move="96">
              <h2 data-type="h2"
                id="session-04-heading"
                lang={lang}
                className={`ca-h2 ${styles.headline}`}
              >
                {t('ca.shift.headline1')}{' '}
                {t('ca.shift.headline2')}
              </h2>
              <p data-type="body" className={`${styles.body}`}>
                {t('ca.shift.bodyLead')}
                <br />
                {t('ca.shift.bodyInstead')}
                <br />
                {t('ca.shift.bodyOld')}
                <br />
                {t('ca.shift.bodyWeAsked')}
                <br />
                <strong className={styles.bodyStrong}>
                  {t('ca.shift.bodyAsk1')}
                  <br />
                  {t('ca.shift.bodyAsk2')}
                  <br />
                  {t('ca.shift.bodyAsk3')}
                </strong>
              </p>
              <p data-type="body" className={`${styles.closing}`}>
                {t('ca.shift.closing1')}
                <br />
                {t('ca.shift.closing2')}
              </p>
            </div>
          </LayerScrollGroup>

          <LayerScrollGroup className={styles.stageWrap}>
            <div data-move="64">
            <ShiftDiagram
              signal={t('ca.shift.signal')}
              signalQ={t('ca.shift.signalQ')}
              context={t('ca.shift.context')}
              contextQ={t('ca.shift.contextQ')}
              act={t('ca.shift.act')}
              actQ={t('ca.shift.actQ')}
            />
            </div>
          </LayerScrollGroup>
        </div>
      </div>
    </section>
  )
}
