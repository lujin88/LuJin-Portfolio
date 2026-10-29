import type { Metadata } from 'next'

import { HtmlChrome } from '../../html-chrome'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — Human × AI Practice',
  },
  description:
    'A human-led design practice: Agent Monitor, AI Team, and Design OS.',
}

export default function AgentMonitorLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HtmlChrome
      activeHref="/lab/agent-monitor"
      theme="light"
      colorScheme="light"
      backgroundColor="#fcfaf7"
    >
      {children}
      <style
        dangerouslySetInnerHTML={{
          __html: `
[data-site-header] {
  --header-scrim: #fcfaf7;
  --header-glass: rgba(252, 250, 247, 0.92);
  --header-foreground: #141827;
  --header-line: rgba(20, 24, 39, 0.14);
  --header-menu: #ffffff;
  --header-menu-item: #f7f4ef;
  --header-accent: #287cda;
}
.practice { padding-top: 1.25rem; }
.practice svg { display: block; }
.p-header { display: none !important; }
.p-section { scroll-margin-top: 5.5rem; }
.p-modal-backdrop { z-index: 200; }
@media (max-width: 760px) {
  .practice { padding-top: 0.75rem; }
  .p-section { padding-top: 4.5rem; scroll-margin-top: 5rem; }
}
.am-site-closing {
  --color-text-1: #141827;
  --color-text-3: #64748b;
  --color-text-4: #8b97aa;
  --color-footer-divider: #dce3ec;
  --pill-border: #141827;
  --pill-text: #141827;
  --pill-bg: transparent;
  --pill-hover-bg: #141827;
  --pill-hover-text: #fcfaf7;
  --pill-hover-shadow: none;
  color: #141827;
  background: #fcfaf7;
  font-family: var(--font-poppins), Poppins, ui-sans-serif, system-ui, sans-serif;
}
.am-site-closing .contact-section {
  position: relative;
  background: transparent;
  padding: clamp(6rem, 14vh, 9rem) var(--pad) clamp(4.5rem, 10vh, 7rem);
}
.am-site-closing .exp-contact {
  max-width: var(--editorial);
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.75rem 3rem;
}
.am-site-closing .contact-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--duration-reveal) var(--ease), transform var(--duration-reveal) var(--ease);
}
.am-site-closing .contact-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.am-site-closing .exp-contact__heading {
  font-size: var(--font-size-contact);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.12;
  color: #141827;
}
.am-site-closing .exp-contact__links {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 0.75rem;
  font-size: 0.9375rem;
  font-weight: 400;
  color: #64748b;
}
.am-site-closing .exp-contact__links a { color: inherit; text-decoration: none; }
.am-site-closing .exp-contact__links a:hover { color: #141827; }
.am-site-closing .exp-contact__sep { color: #8b97aa; }
.am-site-closing .pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-sizing: border-box;
  white-space: nowrap;
  border-radius: 999px;
  border: 1px solid #141827;
  padding: 0.875rem 1.75rem;
  min-height: 2.75rem;
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1;
  color: #141827;
  background: transparent;
  text-decoration: none;
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1), background-color 320ms cubic-bezier(0.22, 1, 0.36, 1), color 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
.am-site-closing .pill-btn:hover {
  background: #141827;
  color: #fcfaf7;
  border-color: #141827;
  transform: translateY(-2px);
}
.am-site-closing .pill-btn:active { transform: translateY(0) scale(0.97); }
.am-site-closing .pill-btn:hover svg { transform: translateX(3px); }
.am-site-closing .pill-btn:focus-visible,
.am-site-closing .exp-contact__links a:focus-visible {
  outline: 2px solid #7ea2ff;
  outline-offset: 3px;
}
.am-site-closing .exp-footer {
  position: relative;
  padding: 4rem var(--pad) 2rem;
  background: transparent;
}
.am-site-closing .exp-footer::before {
  content: none;
}
.am-site-closing .site-footer__inner { max-width: var(--editorial); margin: 0 auto; }
.am-site-closing .site-footer__bottom { padding-top: 2rem; text-align: left; color: #64748b; }
.am-site-closing .site-footer__note { margin: 0; font-size: 0.8125rem; line-height: 1.6; }
@media (max-width: 640px) {
  .am-site-closing .exp-contact { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
}
@media (prefers-reduced-motion: reduce) {
  .am-site-closing .contact-reveal { opacity: 1 !important; transform: none !important; transition: none; }
  .am-site-closing .pill-btn, .am-site-closing .pill-btn:hover { transition: none; transform: none; }
}
`,
        }}
      />
    </HtmlChrome>
  )
}
