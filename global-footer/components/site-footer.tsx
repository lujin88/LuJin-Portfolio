const CONTACT_EMAIL = 'lu.jin.ixd@gmail.com'
const LINKEDIN_URL = 'https://www.linkedin.com/in/lu-jin-28008689/'
const GITHUB_URL = 'https://github.com/lujin88'
const CV_URL =
  'https://drive.google.com/file/d/1HwHV8VnyhIIKHyNj86n5MSCLeoYsx0Ut/view'

const contactLinks = [
  { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: 'LinkedIn', href: LINKEDIN_URL, external: true },
  { label: 'GitHub', href: GITHUB_URL, external: true },
  { label: 'Download CV', href: CV_URL, external: true },
]

export function SiteFooter() {
  return (
    <footer className="relative w-full overflow-hidden bg-footer text-footer-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-footer-glow to-transparent"
      />

      <div className="relative mx-auto w-full max-w-[1040px] px-6 pt-[clamp(6rem,14vh,9rem)] pb-[clamp(4.5rem,10vh,7rem)] md:px-0">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
          <div className="flex flex-col">
            <h2 className="font-sans text-[clamp(1.6rem,2.6vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.02em]">
              Have an opportunity in mind?
            </h2>

            <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem] text-footer-muted">
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
            className="group inline-flex min-h-11 w-fit shrink-0 items-center gap-2 rounded-full border border-footer-line px-7 py-3.5 text-[0.95rem] leading-none font-normal transition-colors duration-200 hover:border-footer-muted hover:bg-footer-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-current motion-reduce:transition-none"
          >
            Let&apos;s Talk
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

      <div className="relative mx-auto flex w-full max-w-[1040px] flex-wrap items-center justify-start gap-x-3 gap-y-1 px-6 py-5 md:px-0 md:py-6">
        <p className="text-xs text-footer-muted/80">
          © 2026 Lu Jin. All rights reserved.
        </p>
        <span aria-hidden="true" className="text-xs text-footer-muted/50">
          ·
        </span>
        <a
          href="/lab"
          className="text-xs text-footer-muted/80 transition-colors duration-200 hover:text-footer-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-current motion-reduce:transition-none"
        >
          Playground
        </a>
      </div>
    </footer>
  )
}
