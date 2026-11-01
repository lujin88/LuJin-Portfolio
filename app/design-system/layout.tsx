import type { Metadata } from 'next'
import { HtmlChrome } from '../html-chrome'

export const metadata: Metadata = {
  title: {
    absolute: 'Lu — Design System',
  },
  description:
    'Forma Finance — a design system for Sparplan, a Swiss ETF savings plan. Calm, clear, and fair.',
}

export default function DesignSystemLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HtmlChrome
      activeHref="/design-system"
      theme="light"
      colorScheme="light"
      backgroundColor="#fcfcfd"
    >
      <style>{`
        body::before { display: none !important; }
        [data-site-header] {
          --header-scrim: #ffffff;
          --header-glass: rgba(255, 255, 255, 0.92);
          --header-foreground: #0b1030;
          --header-line: rgba(11, 16, 48, 0.14);
          --header-accent: #2563eb;
        }
        .ff-site { padding-top: 4rem; }
        .ff-section, .ff-product, #top { scroll-margin-top: 4.5rem; }
        .ds-closing {
          --color-text-1: #0b1030;
          --color-text-3: #626b80;
          --color-text-4: #94a3b8;
          --color-footer-divider: #e7ecf6;
          --pill-text: #0b1030;
          --pill-border: rgba(11, 16, 48, 0.28);
          --pill-bg: transparent;
          --pill-hover-bg: #0b1030;
          --pill-hover-text: #fcfcfd;
          --pill-hover-shadow: none;
          background: #fcfcfd;
          color: #0b1030;
          font-family: var(--font-poppins), Poppins, ui-sans-serif, system-ui, sans-serif;
        }
        .ds-closing .exp-contact__links a { color: inherit; text-decoration: none; }
        .ds-closing .pill-btn { text-decoration: none; }
      `}</style>
      <link rel="stylesheet" href="/styles/shell-components.css" />
      {children}
    </HtmlChrome>
  )
}
