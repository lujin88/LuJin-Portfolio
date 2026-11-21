# Site structure

The root Next.js app serves the site. The nested packages supply imported source; they are not separate servers.

## Where to change things

- `app/layout.tsx`: root providers, fonts and shared editorial typography import.
- `app/editorial-type.css`: responsive display, chapter, subheading, lead, body and small-text tokens. Editorial elements opt in with `data-type`; `type-chapter` supports components that forward only a class. These overrides intentionally win over legacy route styles. Never opt phone UI or brand specimens into this scale.
- `global-header/components/site-header.tsx` and `global-header/header.css`: shared navigation and controls.
- `public/home.html`: HTML homepage content and styles, rendered by the root app's HTML shell.
- `app/lab/way-of-work/field-notes.tsx` and `app/lab/tools/`: lab pages.
- `app/etf-savings-plan/components/`: ETF narrative and separately styled interactive phone UI.
- `app/man-truck-bus/`: MAN case and truck animation.
- `app/bmw-design-system/BMWOneSource.tsx`, `BMWLowerB.tsx`: BMW hero and lower case. Brand specimens retain their own typography.
- `ca/client-advisor/components/`: Client Advisory sections, imported through the `@/` alias.
- `eon/e-on-09/`: E.ON route source through `@eon/`; it also imports sections from adjacent E.ON folders. `/eon-solar` redirects to `/EON`.
- `app/ai-companion-pet/`: accessible parent document, embedded pet demo and shared closing.
- `app/components/site-closing*`: shared case-study closing.

Runtime ownership and safe synchronization of the local 3000 clone are defined in `AGENTS.md`. Never push its confidential local history.
