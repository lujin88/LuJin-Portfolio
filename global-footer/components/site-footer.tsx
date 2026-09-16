const CONTACT_EMAIL = 'lu.jin.ixd@gmail.com'
const LINKEDIN_URL = 'https://www.linkedin.com/in/lu-jin-28008689/'
const CV_URL =
  'https://drive.google.com/file/d/1HwHV8VnyhIIKHyNj86n5MSCLeoYsx0Ut/view'

const contactLinks = [
  { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: 'LinkedIn', href: LINKEDIN_URL, external: true },
  { label: 'Download CV', href: CV_URL, external: true },
]

export function SiteFooter() {
  return (
    <footer className="relative w-full overflow-hidden bg-footer text-footer-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-footer-glow to-transparent"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-24 pb-16 md:px-10 md:pt-36 md:pb-24">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
          <div className="flex flex-col gap-5">
            <h2 className="font-sans text-3xl font-semibold tracking-tight text-balance md:text-5xl">
              Have an opportunity in mind?
            </h2>

            <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 text-base text-footer-muted md:text-lg">
              {contactLinks.map((link, index) => (
                <li key={link.label} className="flex items-center gap-x-3">
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
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-footer-line px-8 py-4 text-base transition-colors duration-200 hover:border-footer-muted hover:bg-footer-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-current motion-reduce:transition-none md:mt-2"
          >
            Let&apos;s talk
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

      <div className="relative mx-auto w-full max-w-6xl px-6 py-5 md:px-10 md:py-6">
        <p className="text-sm text-footer-muted/80">
          © 2026 Lu Jin. All rights reserved.  ·  Designed in Figma, built with v0 & Cursor
        </p>
      </div>
    </footer>
  )
}
