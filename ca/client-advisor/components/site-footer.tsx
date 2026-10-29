'use client'

import { useTranslation } from '@i18n/use-translation'

const CONTACT_EMAIL = 'lu.jin.ixd@gmail.com'
const LINKEDIN_URL = 'https://www.linkedin.com/in/lu-jin-28008689/'
const GITHUB_URL = 'https://github.com/lujin88'
const CV_URL =
  '/cv/lu-jin-cv.pdf'

export function SiteFooter() {
  const { t } = useTranslation()
  const contactLinks = [
    { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { label: t('common.linkedin'), href: LINKEDIN_URL, external: true },
    { label: t('common.github'), href: GITHUB_URL, external: true },
    { label: t('common.downloadCv'), href: CV_URL, external: true },
  ]

  return (
    <footer className="relative w-full overflow-hidden bg-footer text-footer-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-footer-glow to-transparent"
      />

      <div className="relative w-full px-[var(--content-inset,24px)] pt-[clamp(6rem,14vh,9rem)] pb-[clamp(4.5rem,10vh,7rem)]">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
          <div className="flex flex-col">
            <h2 className="font-sans text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.02em]">
              {t('common.contactHeading')}
            </h2>

            <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem] text-footer-muted">
              {contactLinks.map((link, index) => (
                <li key={link.href} className="flex items-center gap-x-3">
                  {index > 0 && (
                    <span aria-hidden="true" className="text-footer-muted/60">
                      ·
                    </span>
                  )}
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="rounded-sm transition-colors duration-200 hover:text-footer-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-current motion-reduce:transition-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="group inline-flex min-h-11 w-fit shrink-0 items-center gap-2 rounded-full border border-footer-line px-7 py-3.5 text-[0.95rem] leading-none font-normal transition-colors duration-200 hover:border-footer-muted hover:bg-footer-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-current motion-reduce:transition-none"
          >
            {t('common.letsTalk')}
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            >
              →
            </span>
          </a>
        </div>
      </div>

      <hr className="relative w-full border-0 border-t border-footer-line" />

      <div className="relative flex w-full flex-wrap items-center justify-start gap-x-3 gap-y-1 px-[var(--content-inset,24px)] py-5 md:py-6">
        <p className="text-xs text-footer-muted/80">{t('common.footerRights')}</p>
        <span aria-hidden="true" className="text-xs text-footer-muted/50">
          ·
        </span>
        <a
          href="/lab"
          className="text-xs text-footer-muted/80 transition-colors duration-200 hover:text-footer-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-current motion-reduce:transition-none"
        >
          Playground
        </a>
        <div className="flex items-center gap-x-3">
          <span aria-hidden="true" className="text-xs text-footer-muted/50">
            ·
          </span>
          <p className="text-xs text-footer-muted/80">{t('common.footerAnalytics')}</p>
        </div>
      </div>
    </footer>
  )
}
