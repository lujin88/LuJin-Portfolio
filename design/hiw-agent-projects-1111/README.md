# How I Work → Playground · direction study · 2026-11-11

Status: A/B rough directions for Lu to choose, not a finished design or production implementation. Scope follows #agent-monitor #7297, #7305, #7307, #7314, Lu #7316 and PM #7335. This is revision v2. This package does not modify the server on port 3000.

## View

Open `a.html`, `b.html`, or `landing.html` directly. All required media/fonts are included. `review/` contains exact 1440×900 and 390×844 frames, plus full mobile pages. Review badges are annotations, not proposed visitor-facing copy. Header is contextual chrome; production must retain the shared site header unchanged.

- **A — two cards and a third-card peek (recommended):** the three tools become a browsable workbench. More than one tool is readable at once. Desktop arrows move the horizontal track; mobile uses an ordinary vertical list.
- **B — one large card and next-card peek:** each tool gets a larger presentation with its description alongside. Better for inspecting imagery, but comparison takes more navigation.
- **Destination:** proposed top of a shared Playground Tools page (final URL is for webdev to set), with Agent Monitor / Scranton / Pixel Office anchor navigation. These are three tools, not three duplicate case-study routes. The exact final anchors need implementation agreement; local links demonstrate the proposal only.

Both directions preserve the light How I Work canvas. Both use the existing How I Work illustration, not a newly generated imitation. Refero supplies typography-led hierarchy, thin separators and outlined pill controls; Lu #7316 supplies the horizontal row, next-card peek and arrows. Do not copy GSAP branding, palette or its category colors. A name-swap with Linear fails the concept: this illustration depicts Lu's human-led process and the three tools used by this particular team.

## Visual sources and decisions

There is no `brief.md` or `design-system/` directory in this checkout. Existing `design-system-foundation.css` and the canonical site's `app/lab/way-of-work/field-notes.css` are the source, not a new token system.

- Canvas `#f5f1e4`, ink `#272a25`, blue `#2455cc`, line `#d0d2c0`: current How I Work CSS.
- Poppins 400/600/700: existing site fonts; display follows the existing 76px desktop / responsive editorial scale.
- 24px / 48px spacing, 16px media corners and outlined pill forms: existing foundation.
- Mode: Experience. Use project evidence as the primary content; illustration is the continuity between process and projects. Avoid adopting [GSAP](https://gsap.com)'s dark canvas and brand colors; avoid replacing the team's real screens with generic dashboard illustrations.
- Reference: https://styles.refero.design/style/00537a20-e99e-4ef2-b119-c6f532c44cc9 . Pentagram interaction direction is approved in Lu #7316; the exact Mobbin source is maintained by research in PR #162.

## Asset provenance

- `assets/worktable.webp`: unchanged copy of `/Users/lu/Desktop/portfolio_perfect/public/lab/way-of-work/field-notes/worktable.webp`.
- `assets/monitor-demo-v2.png`: real Agent Monitor renderer at `http://127.0.0.1:7777`, with `/state` intercepted in an isolated browser and supplied only `demo/monitor-state.json`. No live task data is displayed. The header identifies fictional demo data. The browser blocked non-GET requests; no approval or task mutation was sent.
- `assets/scranton-demo-v2.png`: screenshot of the dedicated, self-contained `demo/scranton.html` workspace fixture, modeled on Scranton's existing layout. This is a reconstructed demonstration, not a screenshot of a live workspace. Channels demo-studio / demo-launch / demo-library and members Robin / Sage / Ember are all fictional. No real profile images, messages, names, channel names, session tokens or network calls are included. Legal review remains required before publication. The prior real-workspace asset is removed from the current tree.
- `assets/office-v4.gif`: unchanged `ROOM_PIXEL_EDIT_1110/avatar/motion-bear-typing-room-v18-v4-1x.gif`, the v18 room with v4 bear. The still review frames capture this real room. No new animation is authored here.
- Fonts: unchanged site Poppins files. Screenshot review includes current How I Work in `review/before-1440x900.png`.

## Motion handoff (spec only)

At desktop entry, reveal the whole horizontal track as one group in the horizontal direction, once. Do not stagger or animate each image independently. User-triggered arrows move one card width and keep a next-card peek where there are more cards. At the ends, disable the corresponding arrow; support keyboard activation and keep focused cards visible. The rough prototype demonstrates track movement without animation; endpoint disabling/focus scrolling belong to production implementation.

On mobile, remove the track, arrow controls and horizontal transforms. Keep the same order (Agent Monitor → Scranton → Pixel Office) in normal vertical flow; the section may reveal once vertically. Crossing the layout breakpoint is an immediate reflow, not a rotating or morphing animation. Preserve reading/focus order. No scroll hijacking or pinned scroll is required. Reduced motion shows all content immediately and uses instant navigation. Durations/easing must use project motion tokens; a section-specific token was not found here, so exact timing remains **待确认**, not a newly invented token.

## Checks and remaining work

- Six requested viewport combinations rendered: A/B/destination at 1440×900 and 390×844. All images loaded; no document-width overflow. Results in `review/checks.json`.
- Full mobile captures show all three projects; do not shrink all three into one 844px viewport. Desktop A/B intentionally clip the next card inside the track, not the document.
- Local card links reach the matching landing section; the whole entry card is clickable through its stretched link. Arrow clicks and keyboard Enter were checked separately in `review/interaction-checks.json`.
- Intent: link process to evidence. Hierarchy: process illustration/title, real screens, project names, concise descriptions, outlined links. Layout differences are deliberately limited to card size and how much is visible at once.
- This is author verification, **not** visual QA. Independent visual QA and Lu's A/B choice remain. Copy is proposed English; production localisation and final copy review remain.
- Research owns `bar.md` changes in PR #164 (replacement for #162). This PR does not conflict with that file. PM scheduled the Obsidian record for the 21:00 backup; this package supplies the artifact/PR trail and does not claim that backup is complete.

## v2 review notes

PM #7335 points 1–3 addressed: Tools breadcrumb, isolated Scranton demo, and actual Agent Monitor interface with demo tasks replacing its marketing hero. All A/B and destination desktop/mobile captures were refreshed. The old live-workspace asset is not used anywhere in the current package. Public URL is deliberately not decided by this design PR.
