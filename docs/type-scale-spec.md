# Type and spacing scale (PM #7822, Lu #7828; revised Lu #9217 / PM #9218)

Original measurements on 3000 (`86f5f76`) at 12:51, 10 pages × 1440/390. Source and raw data: `/Users/lu/.buzz/OUTBOX/DS_REVIEW_1111/`. This tracked copy records the approved scale for implementation and review.

2026-11-12 revision: Lu #9217 chose 40px chapter titles to match index, retaining the original CA 04 English/German copy. PM #9218 applies this to CA #174 first, then the main-based DS review, including BMW chapter titles. This decision supersedes the former desktop H2 value of 51.84px; H2 now uses 40/44px at every viewport. /lab/tools and Gratula remain outside the DS implementation task.

## What's wrong
1. **Hero titles are too big and every page uses a different size.** h1 at 1440: ETF 78.5, MAN 76, How I Work 76, Tools "Three tools." 74.9 (an h2), Client Advisory 72, E.ON 60, BMW 36.
2. **Section titles (h2) have 9 different sizes**: 36 / 37.4 / 51.84 / 54.4 / 56 / 63.4 / 68 / 74.9. Lu picked 51.84/57.02 (desktop) and 40/44 (mobile) for BMW today (#7764), which matched Client Advisory. That earlier standard is superseded by Lu #9217: chapter titles are now 40/44px.
3. **Body text has 6 sizes**: 15 / 16 / 17 / 18 / 20 / 23, with line-heights from 1.45 to 1.63.
4. **The left text edge differs by page** at 1440: 24 / 48 / 64 / 120 px.
5. **Header bug**: on 7 of 10 pages, 3 header controls render in Arial 15.2 instead of Poppins (a button or select that doesn't inherit the font).

## Tokens (`app/editorial-type.css`; editorial elements opt in with `data-type`)
| token | desktop ≥1024 | mobile ≤719 | used for |
|---|---|---|---|
| `--type-display` | 60 / 64, w700, ls -0.02em | 40 / 44 | page hero title (one per page) |
| `--type-h2` | 40 / 44, w600 | 40 / 44, w600 | chapter titles (Lu #9217, supersedes #7764) |
| `--type-h3` | 28 / 33.6, w600 | 24 / 29 | titles inside a section, card titles |
| `--type-lead` | 22 / 33 | 18 / 27 | intro paragraph under a hero |
| `--type-body` | 18 / 28.8 | 16 / 25.6 | running text |
| `--type-small` | 14 / 21 | 14 / 21 | captions, meta |
Between 720 and 1023 use `clamp()` from the mobile value to the desktop value for responsive tokens; H2 stays at 40/44 throughout.
Page gutter: 64 px desktop, 24 px mobile (`--editorial-gutter`). Section spacing: 96 px desktop, 56 px mobile (`--editorial-section-space`). Both interpolate between 720 and 1024px. Existing centered maximum-width wells may add space beyond the minimum gutter. Spacing belongs to the outer editorial wrapper, never embedded product UI.

## Do not touch
- UI inside phone or screen mockups (ETF Inter text, Magic Path screens).
- BMW brand specimens (Arial, inside the case visuals). BMW meta dt/dd from #7812 stays as is.
- /index hero (video) and its 36 / 30.4 h1.
- The current main-based review covers How I Work, ETF, Client Advisory, E.ON and MAN. BMW is included for its three chapter titles per PM #9218; its approved hero, metadata and brand specimens stay unchanged. /index is a regression reference, not a typography rewrite.
- Don't write global `h1 {}` / `h2 {}` selectors: they would reach the mockups. Map page classes to the tokens.

## Steps
1. Header Arial fix, then display, h2, h3, lead and body tokens on the scoped routes above. Header controls and most mappings already landed in #172. In-section titles use h3 unless they open a chapter; embedded product UI keeps its own scale. /eon-solar redirects to /EON. /lab/tools and Gratula remain excluded by the revised scope.
2. Gutter and section padding (layout change): do this as a separate commit after step 1 passes visual QA.

## Acceptance
Probe computed styles at 390/700/1440 on the six scoped case pages, plus /index as a regression control. Every opted-in chapter title = 40px / 44px, weight 600; other opted-in roles keep their existing responsive tokens. Verify header controls, embedded UI isolation, page overflow and browser errors, with CA German at 1025px in Chrome/WebKit. tsc and production build must pass. /index and /bmw-design-system return 200; /lab/tools is intentionally 404 after #172 removed that held page.

Spacing is measured in the same review, but gutter/section-padding changes are a separate commit after typography passes visual QA. Do not silently replace authored layout spacing or mockup padding while changing type.

## Spacing application (PM #9613 / #9815)

Typography passed local QA #9610 and visual QA #9612 at `f5c271fe`; spacing is the next independent commit on the same branch.

- How I Work: chapter/finale wells use the gutter; chapter gaps use the spacing token as margins, preserving the illustration/copy composition.
- ETF: the outer content well uses the gutter and retains its 1200px cap; desktop story articles use section padding, stacked stories use an equivalent inter-chapter margin. Handset dimensions and sticky offsets are unchanged.
- MAN: content wells use the gutter; chapters, evidence and outcome use section padding. The joined Decisions/Method composition retains its zero internal bottom edge. The full-screen cover is unchanged.
- CA: chapter rails and ordinary section edges use the tokens. The Mandate's desktop art canvas, Concept's sticky runway, the short desktop Principles bottom edge and the 05/06 negative-margin transition remain authored composition exceptions. The hero keeps its separate rail; closing aligns to the chapter rail.
- E.ON: shared content containers and ordinary chapter edges use the tokens above 639.98px. Phones retain 32px per ordinary section edge (64px between sections), per Lu 2026-11-08 and PM #9837. The existing mobile Journey bottom and Problem/Constraint joins retain their 0/24px edges so the illustration overlap is not doubled.
- BMW: this task changes only the three chapter titles. Hero, chapter layout and brand specimens remain excluded. `/index`, `/lab/tools` and Gratula are not part of the spacing implementation.

Check 390/700/1440 and the CA German 1025px layout, with the original typography baseline as the comparison. Record title wrapping as well as overflow; a longer title remaining on three lines is not by itself a spacing failure.
