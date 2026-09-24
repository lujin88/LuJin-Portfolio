# Portfolio HANDOFF

Read this file first in a new ChatGPT conversation. Treat it as project context, not as permission to modify everything. Preserve existing work and ask for the current task before making broad changes.

---

## 1. PROJECT OVERVIEW

This is **Lu.AI.Design**, Lu Jin’s live personal portfolio. It showcases service/product design case studies (Client Advisory, E.ON Solar) plus Lab, About, and an AI Workflow case. The live Next.js app at `/Users/lu/Desktop/portfolio_perfect` is the implementation. Visual identity is governed by a **Master Design System** that records what already ships. Future work should **normalize, not redesign**.

### Tech stack / tools

- **Next.js 16.3.3** (Turbopack) + **React 19** + **Tailwind CSS v4**
- Shared UI: `@base-ui/react`, `lucide-react`, `class-variance-authority`, `tailwind-merge`
- Fonts via `next/font`: Poppins, Playfair Display, Caveat
- Dev server: `npm run dev` → `http://localhost:3000` (already running; a second `next dev` will fail with `EADDRINUSE`)
- This Next version has breaking changes vs older training data. Read `node_modules/next/dist/docs/` before writing Next APIs. `AGENTS.md` / `CLAUDE.md` are auto-reinserted by `next dev` — do not fight that block.
- **Cursor** is the implementation environment. ChatGPT is used to plan, write Cursor prompts, and hold project context.
- Browser verification is required for UI work (Chrome DevTools / Cursor browser). `window.scrollTo` can fail on the Index pin-scroll experience; use in-page links / `scrollIntoView`.
- Nested git: `eon/e-on-09` is a submodule pointer. Do not casually change it.

### Current development workflow

1. **Audit** live pages against the Master DS.
2. Classify each difference: Global Foundation / Theme Layer / intentional exception / leftover.
3. Change **one focused task** at a time.
4. Verify in the browser at relevant breakpoints (especially ~1440 for desktop joins).
5. Git checkpoint **only when the user asks**, after a meaningful completed unit of work.
6. Never commit secrets. Never reset/revert uncommitted CA work unless the user explicitly asks.

Master rule from the DS: **Audit → Normalize → Preserve → Apply.**

---

## 2. DESIGN SYSTEM SOURCE OF TRUTH

**Exact Master DS filename (canonical, never edit unless the user explicitly requests it):**

```
/Users/lu/Desktop/protoflio design-system-foundation-master.html
```

Note the spelling `protoflio`. There is also a copy at `portfolio_perfect/design-system-foundation.html`. The **desktop Master file is the only source of truth**. Do not treat the in-repo HTML/CSS copies as license to rewrite the system.

Official name for the global shell accent: **blue-violet** (`#8B5CF6`). Do not call it generic purple. Do not rename E.ON lavender, Client Advisory blue, header-local blue, or Index periwinkle as blue-violet.

### Global Foundation (what repeats across the shared shell)

Controls:

- Typography and font weights (shared Poppins roles)
- Spacing and layout (existing scale `8 / 16 / 24 / 48 / 80 / 96 / 128px`; page padding `24px`)
- Containers: `1440px` main, `1040px` editorial, `1600px` HTML nav, `1800px` React header
- Radius, hairline borders, shared components
- Interaction principles (pills, focus, hover)
- Motion timing and reduced-motion fallbacks
- Responsive behavior
- Global shell: header mechanics, page field `#0a0a0a` with 3.5% grain, blue-violet **signal** (not a page fill)

Blue-violet tokens:

| Role | Token | Value |
|---|---|---|
| Shell accent | `--color-theme-2` / live Tailwind `accent` | `#8B5CF6` |
| Hover | `--color-theme-hover` | `#A78BFA` |
| Soft accent | `--color-theme-3` | `rgba(139,92,246,0.15)` |

Surfaces: `#0a0a0a` page → `#111214` → `#1a1c1f` → `#1f2124`. Secondary text `#b6bbc2`. Divider `#343638`.

Blue-violet is for focus, selection, Lab/AI eyebrows and arrows, restrained glows, related shell interaction. It is **not** a universal fill and must **not** replace case-study colors.

### Theme Layer (authored per case; inherit foundation, do not flatten)

A theme **may** control: case palette, section-specific colors, illustrations, media treatments, storytelling motifs, case-specific UI, editorial treatments, contained light/dark surfaces.

A theme **may not** arbitrarily reset: global page rhythm, shell navigation, background continuity, accessible interaction, or responsive rules.

**Client Advisory Theme Layer** (do not replace with blue-violet):

| Token | Value |
|---|---|
| `--ca-bg` | `#06101f` |
| `--ca-bg-2` | `#0a1729` |
| `--ca-text` | `#f3f6fa` |
| `--ca-text-2` | `#a9b8cc` |
| `--ca-text-3` | `#71839a` |
| `--color-signal` | `#4da3ff` |
| `--color-signal-bright` | `#7cc4ff` |
| `--ca-accent` | `#2f7cff` |
| `--ca-line` | `rgb(169 184 204 / 0.22)` |

Also used in uncommitted Outcome work: `--ca-accent-soft: #7cc0ff` (CA theme, not Global Foundation). Source of recorded tokens: `ca/client-advisor/app/globals.css`.

**E.ON Solar Theme Layer:** navy `#07151f`, off-white `#f8f8f6`, lavender `#c9b5f4` / `#e8e1ff` / `#9284d7` / `#9b90c5`, mint `#b9f4d8` / `#e5f9ee`, E.ON red `#f32717`, Caveat handwriting, Geist product sans, light sections. CSS names containing “purple” still mean **lavender**. Source: `eon/e-on-09/app/globals.css`.

**Lab + AI Workflow:** editorial use of global blue-violet **plus** Playfair Display. Preserve both.

### Background Continuity Principle

Accent can change. The underlying visual world should remain continuous.

Sections may change accent and mood, but must stay in the same spatial world. A colored section is an accent layer above the portfolio world — not a hard cut into another website.

Continuity includes: background tone, surface depth, grain/texture, pattern language, spacing rhythm, section transitions, overall atmosphere.

This does **not** mean every page uses the same background. CA navy and E.ON light sections are authored. Transitions should feel connected.

### Typography

| Role | Spec | Scope |
|---|---|---|
| Display / Index + About | Poppins 700 · `clamp(2.25rem, 5.2vw, 4rem)` · 1.08 · tight | Global product expression |
| Display / Lab + AI Workflow | Playfair Display 700 · `clamp(2.4rem, 6vw, 4.75rem)` · 1.05 · `-0.03em` | Authored editorial exception; preserve |
| Heading | Poppins 600 · 1.9rem / md 2.25rem · 1.1 | Shared sections |
| Body | 15px · 1.75 · `#b6bbc2`; Lab 17px / 1.7 | Lab adjustment is intentional |
| Eyebrow / metadata | 13px semibold uppercase `.28em` / 11px bold uppercase `.14em` | Shared supporting hierarchy |

Type does hierarchy. Color does signaling.

### Color rules (scoped, not global)

Do **not** merge these into blue-violet:

- Header-local accent `--header-accent #4a90ff` — React SiteHeader selected-language Check icon only
- Index experience connectors `#7A7FDC` / `#3846D4` — Index storytelling motif only

### Responsive rules

| Breakpoint | Existing change |
|---|---|
| 360px | Minimum body width; horizontal overflow hidden |
| 640px | No pin / no experience arc; stack contact and narrative |
| 768px | 96px React header; section padding `pt-32`; type steps up |
| 899px | Lab-only layout tweak |
| 1024px | 43/57 grid, HTML nav links, column dividers, `lg:gap-20` |
| 1280px | React header `xl:px-28` |

Image-led case sections: 16:9, 43fr / 57fr copy-to-media, 48–80px gutters.

### Motion principles

Primary ease: `cubic-bezier(0.22, 1, 0.36, 1)`. Overlays also use `cubic-bezier(0.16, 1, 0.3, 1)`. Prefer transform and opacity.

- Fast 150–200ms — menus, colors
- Interaction 320–350ms — pills, links, cards
- Reveal 800ms — +28px, opacity
- About cards 1100ms — blur-rise stagger

At **640px** or `prefers-reduced-motion`, pinning collapses to static stacks. Motion explains, then stops.

### Intentional exceptions (must stay different)

- Global blue-violet `#8B5CF6` vs header-local `#4a90ff`
- Global blue-violet vs Index periwinkle connectors
- CA navy / ice / signal / `--ca-accent` are Theme Layer, not Global Foundation defects
- E.ON navy / lavender / mint / red / light sections are Theme Layer
- Poppins (Index/About) vs Playfair (Lab/AI Workflow)
- Compact HTML copyright footer on Index/About/Lab/AI vs React SiteFooter (glow field) on CA and E.ON — shared copy, different chrome
- HTML `#site-nav` exists in HTML pages but Next.js **hides** it and mounts React `SiteHeader` (live source of truth: 80px / 96px from md, glass after scroll, centered nav)
- About HTML nav contrast (88% white + text shadow) vs other HTML pages (72%) — documented, live chrome is still the React header
- About collection cards: 9:16 + authored fan motion

### Leftovers — not tokens (do not promote)

- `--color-bg-deepseek`
- `.btn-primary-kling`
- Also unused unless markup proves otherwise: `.tag-chip`, `.social-btn`, `.app-badge`

### What must NOT be changed

- The Master DS file itself, unless the user explicitly requests a DS edit
- Case-specific visual identities (CA navy/ice, E.ON lavender/mint/red/Caveat, Lab/AI Playfair + blue-violet signaling)
- Index periwinkle connectors and header-local `#4a90ff`
- Unrelated case studies when the task is about one page
- Existing uncommitted Client Advisory work (see §5)
- Do not invent a new global palette, new DS, or “correct” a theme with blue-violet
- Do not flatten Theme Layer colors into Global Foundation

---

## 3. CURRENT GIT STATE

**Branch:** `main`  
**HEAD:** `11f790cedfda570d64a9b1b6eb825d09d519b10a`  
**Working tree:** **DIRTY**

### Commits (newest first)

| SHA | Message | Meaning |
|---|---|---|
| `11f790cedfda570d64a9b1b6eb825d09d519b10a` | `GLOBAL — Portfolio Consistency Pass` | Shared shell consistency after the DS baseline. No new DS. Theme Layers preserved. |
| `84d412c39a42f2506ce1db6c5b41ec6f65f68051` | `BASELINE — Design System Compliance Passed` | DS compliance audit implemented and checkpointed. |
| `3b663d136949b92308ea67d5f3cacccad6ba0e5a` | `Initial commit of the live showcase, including Client Advisory and host pages.` | Original import of the live site. |

### Committed vs uncommitted (keep this distinction)

- **Committed:** DS compliance + global consistency (Index/About/Lab/AI/E.ON shell, header, footers, root layout). Safe to treat as the last known-good global state.
- **Uncommitted (pre-existing CA WIP, then continued):** only Client Advisory files listed below. These were **excluded** from the global-consistency commit on purpose. They are **not** leftovers to discard.

### Modified (unstaged)

```
ca/client-advisor/app/globals.css
ca/client-advisor/components/client-advisor-case-study.tsx
ca/client-advisor/components/sessions/hero-section.tsx
ca/client-advisor/components/sessions/session-03-research.module.css
ca/client-advisor/components/sessions/session-03-research.tsx
ca/client-advisor/components/sessions/session-05-design-principles.module.css
ca/client-advisor/components/sessions/session-07-outcome.tsx
ca/client-advisor/components/sessions/session-mandate.tsx
```

Diffstat at handoff: `8 files changed, 81 insertions(+), 35 deletions(-)` (join CSS may still be iterating inside `globals.css`).

### Untracked

```
ca/client-advisor/components/sessions/process-journey.module.css
ca/client-advisor/components/sessions/process-journey.tsx
```

**Do not** `git restore`, `git reset`, `git checkout --`, or otherwise discard these 10 files.

---

## 4. COMPLETED WORK

### A. Design System Compliance Pass → commit `84d412c` `BASELINE — Design System Compliance Passed`

Compared live pages to the Master DS. Classified GLOBAL / THEME / EXCEPTION / LEFTOVER. Implemented only global-foundation + leftover fixes. Visual QA at key breakpoints. Then git checkpoint.

Notable committed effects included: root layout / viewport (`min-w-[360px] overflow-x-hidden` later in the global pass), header accent mapping, HTML vs React header coexistence, some CA globals/research that were mixed into that commit, footer/header small fixes, About HTML contact restoration path started here.

### B. Global Portfolio Consistency Pass → commit `11f790c` `GLOBAL — Portfolio Consistency Pass`

No new design system. Shared shell only. Theme Layers preserved.

Included (high level):

- `global-header/header.css`: HTML-only `--color-accent: #8B5CF6` so `text-accent` is not white (Next `--color-accent` was empty)
- `site-header.tsx`: focus-ring / `MOTION_SAFE`; `twMerge` had been dropping `focus-visible:outline` — fixed with `outline-solid` + explicit header focus-visible
- HTML footers transparent so the ending reads as one surface (Background Continuity)
- About contact restored
- `app/layout.tsx` `min-w-[360px] overflow-x-hidden`
- CA `globals.css` only the small committed slice needed for that pass; **CA join / polish WIP was kept unstaged**

Intentionally **not** done in that pass: flattening CA or E.ON colors; restyling Index/Lab/AI content; another global DS rewrite.

---

## 5. CURRENT UNCOMMITTED CLIENT ADVISORY WORK

These 10 files are **existing Client Advisory work**. They must **not** be accidentally reset, reverted, or overwritten. Do not run a global DS pass on them. Do not “clean the working tree.” Continue from this state, or commit them when the user asks.

Original 01→02 visual source of truth (Figma screenshot):

```
/Users/lu/.cursor/projects/Users-lu-Desktop-portfolio-perfect/assets/image-b09046ce-596c-4c27-84eb-9581d1be871d.jpg
```

Pre-join live capture (hard seam):

```
/Users/lu/.cursor/projects/Users-lu-Desktop-portfolio-perfect/assets/image-dc24c66a-ecc9-4913-9185-8c0d36546e87.jpg
```

Join constraints: no copy/type/image-asset/interaction redesign. One navy canvas. Curve continues. 02 UI may overlap 01. Match spacing. Desktop join is `lg+` (1024px+).

### File-by-file

**`ca/client-advisor/app/globals.css`**  
Adds the 01→02 join layer (plus committed CA tokens already in HEAD). Wrapper `.ca-s01-s02` is one `--ca-bg` canvas with `--ca-s01-overlap: 14rem`. At `lg+`: `.ca-s01` z-index 1; `.ca-s02` pulls up with negative margin and transparent background; `::before` navy floor starts **below** the overlap (must not be `inset: 0`, or the photo is covered and the hard seam returns); `.ca-s02-curve` continues the hero PNG’s baked-in arc (`mix-blend-mode: screen`); `.ca-s02-ui` above the plate; mandate content padding accounts for the overlap. Also contains the shared editorial rail (`--ca-rail`) for 01/02/03/05/06. Join values (curve opacity, mask, z-index, padding) have been iterating — read the file, do not restore HEAD.

**`ca/client-advisor/components/client-advisor-case-study.tsx`**  
Wraps `HeroSection` + `SessionMandate` in `.ca-s01-s02` so they share one stacking/background context.

**`ca/client-advisor/components/sessions/hero-section.tsx`**  
Section class `ca-s01`. Photo `object-[center_bottom]` so the baked-in bottom-left cyan arc in `hero-background.png` stays in frame. Scrim class `ca-s01-scrim`. Glance: `lg:items-center lg:pb-8` so stats sit in the photo rather than colliding with the 02 UI. `isolate` removed from the section so stacking can join with 02.

**`ca/client-advisor/components/sessions/session-mandate.tsx`**  
Section class `ca-s02`, `overflow-x-clip`. Curve image `.ca-s02-curve` / `object-top`. UI `.ca-s02-ui` moved up to `top-[calc(22%+1.75rem)]` so cards overlap the hero laptop/torso (`mix-blend-screen`, `lg:block`). Copy column `justify-start` with reduced `lg:pt-12`. Annotation uses the same top offset as the UI.

**`ca/client-advisor/components/sessions/session-03-research.tsx`**  
Quote positions on the advisor photo: first quote `lg:ml-[34%]`, second `lg:ml-[50%]` (were 22% / 44%).

**`ca/client-advisor/components/sessions/session-03-research.module.css`**  
Copy column left padding tightened (`clamp(1.25rem, 3.2vw, 3rem)`; 1440px `3.25rem`).

**`ca/client-advisor/components/sessions/session-05-design-principles.module.css`**  
Artwork hover: `transition` + `scale(1.14)` on `.card:hover .artworkImg` (from rest `1.03`), hover-only, `prefers-reduced-motion: no-preference`. Flip interaction otherwise unchanged.

**`ca/client-advisor/components/sessions/session-07-outcome.tsx`**  
Replaces the text `Concept → Mockup → Test` row with `<ProcessJourney />`.

**`ca/client-advisor/components/sessions/process-journey.tsx`** (untracked)  
Client component: Concept / Mockup / Test steps with icons; IntersectionObserver reveal; respects `prefers-reduced-motion`.

**`ca/client-advisor/components/sessions/process-journey.module.css`** (untracked)  
CA-theme styling using `--ca-accent-soft`. Do not restyle with global blue-violet.

Hero PNG (`ca/client-advisor/public/images/hero-background.png`) already contains the left navy field, the advisor, and the bottom-left arc. Mandate assets: `ca-02-bg.png` (arc + glow), `ca-02-ui.png` (card stack).

---

## 6. LIVE PORTFOLIO PAGES

Host app: `http://localhost:3000` (root `/` redirects to `/index`).

| Page | Route | Implementation | Relation |
|---|---|---|---|
| **Index** | `/index` | HTML island `public/home.html` | Shared React header; Poppins; pin-scroll experience; periwinkle connectors |
| **About** | `/about` | HTML island `public/about.html` | Same shell; Poppins; 9:16 collection cards; contact restored in global pass |
| **Lab** | `/lab` | HTML island `public/lab.html` | Playfair editorial exception; blue-violet signaling |
| **AI Workflow** | `/ai-workflow-case` | HTML island `public/ai-workflow-case.html` | Same Lab/AI editorial family |
| **Client Advisory** | `/client-advisory` (alias `/client-advisor`) | React `ClientAdvisorCaseStudy` | Theme Layer navy/ice; uncommitted join + polish |
| **E.ON Solar** | `/EON` (`/eon-solar` redirects here) | `eon/e-on-09` | Theme Layer lavender/mint/red/light; nested repo |

Shared chrome: React `SiteHeader` from `global-header/`. HTML `#site-nav` is hidden by Next to avoid duplicate headers. Footers: compact HTML on Index/About/Lab/AI; React SiteFooter on CA and E.ON.

Session sandboxes under `ca/ca-session-*` and `eon/e-on-0*` are **source/prototype slices**, not the live multi-page host. Prefer editing `ca/client-advisor` and `eon/e-on-09` for live case studies.

---

## 7. CURRENT STATUS

### Completed

- Master DS extracted and treated as canonical
- DS compliance audit + implementation + git baseline `84d412c`
- Global portfolio consistency pass + git checkpoint `11f790c`
- Browser QA for those global passes (Index / About / Lab / AI / CA / E.ON shell)
- CA Theme Layer tokens preserved (not flattened)
- CA 03 Research quote/copy seating (uncommitted, in tree)
- CA 05 Design Principles artwork hover zoom (uncommitted, in tree)
- CA 07 ProcessJourney (uncommitted, in tree)
- CA 01→02 visual join **implemented in the working tree** (wrapper, overlap, curve continuation, UI overlay). Last visual check at ~1440 showed one navy canvas, hero arc continuing into 02, UI over the laptop. Join CSS details may still be tuned.

### In progress

- **Client Advisory working-tree polish**, especially confirming the 01→02 join against the Figma screenshot and locking join CSS (opacity/mask/z-index have been iterated). **Not committed.**
- Protect this dirty tree until the user asks to commit.

### Not started (discussed; not the current task unless the user says so)

- Showcase scroll snapping
- Smooth transitions between Index showcase cases
- Broader card hover-zoom vs flip (beyond CA 05)
- E.ON score / count-up / bar / typewriter animations
- UK rollout animation
- About page interaction and video behavior
- Full responsive design QA pass across all pages
- Any new global DS pass
- Commit of the 10 CA files

---

## 8. NEXT RECOMMENDED WORK

Prioritized. Do **one** at a time. Ask the user which to run.

1. **Lock Client Advisory 01→02 join, then commit CA WIP when asked.**  
   Re-read the 10 files, compare join at 1440 to `image-b09046ce-…jpg`, fix only remaining seam/overlap/curve issues, then (only if requested) one commit for CA work. Do not touch Index/About/Lab/AI/E.ON.

2. **Index showcase motion** (if the user wants product-home polish next): scroll snapping and smoother case-to-case transitions, without flattening the pin experience.

3. **E.ON motion backlog**: score/count-up/bar/typewriter, then UK rollout — inside the E.ON Theme Layer only.

4. **About interaction + video**, then a **responsive QA** pass (360 / 640 / 768 / 1024 / 1440).

Do not start another global design-system pass.

---

## 9. WORKING RULES FOR FUTURE CHATS

- **Audit before changing.** Classify GLOBAL / THEME / EXCEPTION / LEFTOVER first.
- **One focused task at a time.** One page, one section, or one bug.
- **Do not redesign when asked to fix.** Match the source of truth (live site or provided screenshot).
- **Preserve case-specific visual identities.** CA navy/ice, E.ON lavender/mint, Lab/AI Playfair.
- **Do not modify the Master Design System** unless explicitly requested.
- **Do not touch unrelated case studies.**
- **Protect existing uncommitted work.** No reset/restore/clean of the 10 CA files.
- **Prefer minimal targeted changes.**
- **Use Git checkpoints after meaningful completed work** — and only when the user asks to commit.
- Verify UI in the browser before declaring visual work done. A single screenshot is not enough; check behavior and related routes that share state.
- Next.js 16: read `node_modules/next/dist/docs/` before using APIs from memory.
- Do not flatten Theme Layer colors into Global Foundation.

---

## 10. IMPORTANT USER PREFERENCES

- Prefer **concise, direct** instructions.
- Often wants **ready-to-paste Cursor prompts**.
- Does **not** want long explanations in ChatGPT replies.
- Likes **one page / section / task** handled independently.
- Wants **visual smoothness and continuity**, not rigid page/section breaks.
- Does not want the agent to commit unless asked.
- Does not want extra `next dev` processes when `:3000` is already up.
- When implementing web UI, verify in the browser (not appearance-only).

---

## 11. RECENT TASKS / IDEAS (discussed, mostly not done)

These are backlog, not current WIP, unless the user picks one:

- Showcase scroll snapping
- Smooth transitions between showcase cases
- Card hover image zoom while preserving flip interaction (CA 05 hover zoom **is** in the uncommitted tree; Index/other cards are not)
- E.ON score / count-up / bar / typewriter animations
- UK rollout animation
- About page interaction and video behavior
- Responsive design QA

---

## 12. HANDOFF INSTRUCTIONS

Read this HANDOFF.md first. Treat it as project context, not as permission to modify everything. Preserve existing work and ask for the current task before making broad changes.

**Immediate facts for the next chat:**

- Repo: `/Users/lu/Desktop/portfolio_perfect`
- Master DS: `/Users/lu/Desktop/protoflio design-system-foundation-master.html` — do not edit
- HEAD: `11f790c` `GLOBAL — Portfolio Consistency Pass`
- Dirty tree: **10 Client Advisory files only** — protect them
- Dev: `localhost:3000` already running
- Logical next user-facing unit: finish/confirm CA 01→02 join, then commit CA when asked
- Do not start a global DS pass. Do not modify Index, About, Lab, AI Workflow, or E.ON unless that is the stated task.
