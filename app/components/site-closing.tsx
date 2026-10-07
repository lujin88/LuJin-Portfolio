'use client'

import { useLayoutEffect, useRef } from 'react'
import { useTranslation } from '@i18n'

const EMAIL = 'lu.jin.ixd@gmail.com'
const LINKEDIN_URL = 'https://www.linkedin.com/in/lu-jin-28008689/'
const CV_URL =
  '/cv/lu-jin-cv.pdf'

export function SiteClosing({ className }: { className?: string }) {
  const { t } = useTranslation()
  const contactRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const contact = contactRef.current
    if (!contact) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      contact.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.15 },
    )
    io.observe(contact)
    return () => io.disconnect()
  }, [])

  return (
    <div className={className}>
      <section id="contact" className="contact-section">
        <div ref={contactRef} className="exp-contact contact-reveal">
          <div className="exp-contact__lead">
            <h2 className="exp-contact__heading">{t('common.contactHeading')}</h2>
            <p className="exp-contact__links">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <span className="exp-contact__sep" aria-hidden="true">
                ·
              </span>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                {t('common.linkedin')}
              </a>
              <span className="exp-contact__sep" aria-hidden="true">
                ·
              </span>
              <a href={CV_URL} target="_blank" rel="noopener noreferrer">
                {t('common.downloadCv')}
              </a>
            </p>
          </div>
          <a href={`mailto:${EMAIL}`} className="pill-btn pill-btn--l">
            <span>{t('common.letsTalk')}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </section>
      <footer className="site-footer exp-footer">
        <div className="site-footer__inner">
          <div className="site-footer__bottom">
            <p className="site-footer__note">
              <span>{t('common.footerRights')}</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
