'use client'

import Image from 'next/image'
import { useTranslation } from '@i18n'
import { cn } from '@header/lib/utils'
import { SiteClosing } from '../../components/site-closing'

import { SCENE_ASPECT, prototypeUrl, sceneBackgroundSrc } from './config'
import { LaptopScreen } from './laptop-screen'
import styles from './off-we-go.module.css'

function GlassCta({
  href,
  children,
}: {
  href?: string
  children: React.ReactNode
}) {
  const inner = (
    <>
      <span>{children}</span>
      <span className={styles.glassIcon}>
        <i className="ri-arrow-right-up-line" aria-hidden="true" />
      </span>
    </>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={styles.glass}>
        {inner}
      </a>
    )
  }

  return (
    <span className={styles.glass} aria-disabled="true">
      {inner}
    </span>
  )
}

export function OffWeGoPage() {
  const { t, ta } = useTranslation()
  const actionHref = prototypeUrl.trim() || undefined
  const sceneLines = ta('owg.sceneLines')

  return (
    <div className={styles.page}>
      <section className={styles.scene} aria-labelledby="owg-title">
        <div className={styles.media}>
          <div
            className={styles.mediaFrame}
            style={{
              width: `max(100vw, calc(100dvh * ${SCENE_ASPECT}))`,
              height: `max(100dvh, calc(100vw / ${SCENE_ASPECT}))`,
            }}
          >
            <div className={styles.photoWrap}>
              <Image
                src={sceneBackgroundSrc}
                alt={t('owg.sceneAlt')}
                fill
                priority
                sizes="100vw"
                className={styles.photo}
              />
              {actionHref ? <LaptopScreen className={styles.fade} /> : null}
            </div>
          </div>
        </div>

        <div aria-hidden="true" className={styles.scrim} />
        <div aria-hidden="true" className={styles.grain} />

        <div className={cn(styles.copy, styles.rise, styles.rise1)}>
          <p className={styles.tag}>{t('owg.tag')}</p>
          <h1 id="owg-title" className={styles.title}>
            <span className={styles.titleLead}>{t('owg.titleLead')}</span>
            <span className={styles.titleAccent}>{t('owg.titleAccent')}</span>
          </h1>
          <p className={styles.lede}>{t('owg.description')}</p>
          <div className={styles.cta}>
            <GlassCta href={actionHref}>{t('owg.openPrototype')}</GlassCta>
          </div>
        </div>

        <p className={cn(styles.sceneLines, styles.rise, styles.rise4)}>
          {sceneLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </section>

      <SiteClosing className={styles.closing} />
    </div>
  )
}
