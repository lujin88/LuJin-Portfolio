import type { Metadata, Viewport } from 'next'

import { HtmlChrome } from '../html-chrome'

const PAPER = '#f7f6f2'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — AI Pet',
  },
  description: 'Diandian, a little AI dolphin. Turn the knob. Pick a mood. Play.',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: PAPER,
}

export default function CompanionPetLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HtmlChrome
      activeHref="/ai-companion-pet"
      theme="light"
      colorScheme="light"
      backgroundColor={PAPER}
    >
      <style>{`[data-site-header][data-header-tone="paper"]{--header-scrim:${PAPER};--header-glass:${PAPER};--header-menu:#fff;--header-menu-item:#e8e8ea}`}</style>
      <style
        dangerouslySetInnerHTML={{
          __html: `
.dd-closing {
  box-sizing: border-box;
  --color-text-1: #0a0a0a;
  --color-text-3: #5d5b57;
  --color-text-4: #a09d97;
  --color-footer-divider: rgba(10, 10, 10, 0.08);
  --pill-border: #0a0a0a;
  --pill-text: #0a0a0a;
  --pill-bg: transparent;
  --pill-hover-bg: #0a0a0a;
  --pill-hover-text: ${PAPER};
  --pill-hover-shadow: none;
  color: #0a0a0a;
  background: ${PAPER};
  font-family: var(--font-poppins), Poppins, ui-sans-serif, system-ui, sans-serif;
}
.dd-closing .contact-section {
  position: relative;
  background: transparent;
  padding: clamp(6rem, 14vh, 9rem) var(--content-inset) clamp(4.5rem, 10vh, 7rem);
}
.dd-closing .exp-contact {
  max-width: none;
  width: 100%;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.75rem 3rem;
}
.dd-closing .contact-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--duration-reveal) var(--ease), transform var(--duration-reveal) var(--ease);
}
.dd-closing .contact-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.dd-closing, .dd-closing * { box-sizing: border-box; }
.dd-closing .exp-contact__heading {
  font-size: var(--font-size-contact);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.12;
  color: var(--color-text-1);
}
.dd-closing .exp-contact__links {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 0.75rem;
  font-size: 0.9375rem;
  font-weight: 400;
  color: var(--color-text-3);
}
.dd-closing .exp-contact__links a { color: inherit; text-decoration: none; }
.dd-closing .exp-contact__links a:hover { color: var(--color-text-1); }
.dd-closing .exp-contact__sep { color: var(--color-text-4); }
.dd-closing .pill-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--button-cta-gap);
  box-sizing: border-box;
  white-space: nowrap;
  border-radius: var(--button-cta-radius);
  border: var(--button-cta-border-width) solid var(--pill-border);
  padding: 0 var(--button-cta-padding-inline);
  height: var(--button-cta-height);
  min-height: var(--button-cta-height);
  font-size: var(--button-cta-font-size);
  font-weight: var(--button-cta-font-weight);
  line-height: var(--button-cta-line-height);
  color: var(--pill-text);
  background: var(--pill-bg);
  text-decoration: none;
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1), background-color 320ms cubic-bezier(0.22, 1, 0.36, 1), color 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
.dd-closing .pill-btn:hover {
  background: var(--pill-hover-bg);
  color: var(--pill-hover-text);
  border-color: var(--pill-hover-bg);
  transform: translateY(-2px);
}
.dd-closing .pill-btn:active { transform: translateY(0) scale(0.97); }
.dd-closing .pill-btn:hover svg { transform: translateX(3px); }
.dd-closing .pill-btn:focus-visible,
.dd-closing .exp-contact__links a:focus-visible {
  outline: 2px solid #0a0a0a;
  outline-offset: 3px;
}
.dd-closing .exp-footer {
  position: relative;
  padding: 4rem var(--content-inset) 2rem;
  background: transparent;
}
.dd-closing .exp-footer::before {
  content: "";
  position: absolute;
  top: 4rem;
  left: 50%;
  width: 100vw;
  margin-left: -50vw;
  border-top: 1px solid var(--color-footer-divider);
}
.dd-closing .site-footer__inner { max-width: none; width: 100%; margin: 0; }
.dd-closing .site-footer__bottom { padding-top: 2rem; text-align: left; color: var(--color-text-3); }
.dd-closing .site-footer__note { margin: 0; font-size: var(--font-size-footer-note); line-height: 1.6; }
@media (max-width: 640px) {
  .dd-closing .exp-contact { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
}
@media (prefers-reduced-motion: reduce) {
  .dd-closing .contact-reveal { opacity: 1 !important; transform: none !important; transition: none; }
  .dd-closing .pill-btn, .dd-closing .pill-btn:hover { transition: none; transform: none; }
}
`,
        }}
      />
      {children}
    </HtmlChrome>
  )
}
