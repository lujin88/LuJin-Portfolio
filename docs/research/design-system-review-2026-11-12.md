# Design System review — typography and spacing

Assignment: PM #9577, under #9569. Decision: Lu #9217 / PM #9218.
Base: `f84ae56`. Branch: `design/ds-type-review`.
Local review: `http://localhost:4624`. No GitHub push or PR yet.

## Findings and implementation

1. Main's shared chapter token still grew from 40px to 51.84px. This contradicted Lu's later 40px decision. Removed only the desktop H2 overrides in `app/editorial-type.css`; chapter titles now use 40px / 44px, weight 600 at every viewport.
2. BMW's three editorial chapter titles bypassed the shared token and measured 36px at 1440px. Added the existing `data-type="h2"` attribute to those titles in `BMWOneSource.tsx`. Brand specimens, interactive app headings, hero, metadata, copy and assets stay unchanged.
3. Header controls already inherit Poppins after #172. Other editorial mappings already exist in main. Reused those mappings rather than adding the unfinished duplicate `case-type.css` from the earlier local draft.

The approved specification is now tracked in `docs/type-scale-spec.md`. No new runtime module or component was introduced. This checkout has no `ARCHITECTURE.md`; route ownership was confirmed from imports and `tsconfig.json` before editing. The prior #172 source change was inspected through commit `223cdbe`.

## Typography measurements

All six case pages were checked at 390, 700 and 1440px, with `/index` as an unchanged reference: 21 route/viewport cases. `/eon-solar` resolves to `/EON`.

| Case | Chapter titles | Before at 1440px | After at all three widths |
|---|---:|---|---|
| How I Work | 4 | 51.84 / 57.02px | 40 / 44px |
| ETF | 3 | 51.84 / 57.02px | 40 / 44px |
| Client Advisory | 6 | 51.84 / 57.02px | 40 / 44px |
| E.ON | 8 | 51.84 / 57.02px | 40 / 44px |
| MAN | 7 | 51.84 / 57.02px | 40 / 44px |
| BMW | 3 | 36px | 40 / 44px |

31 chapter titles; 93 title/viewport assertions. The eight E.ON titles include the testing title's existing `.type-chapter` class. Embedded ETF/BMW product headings are deliberately not chapter titles.

## Padding findings at the typography baseline

These measurements were recorded in the typography commit, before its local visual approval. The independent spacing implementation and its composition exceptions are described below.

| Area | Current evidence | Next step after typography approval |
|---|---|---|
| ETF mobile | First story heading starts at x=18px at width 390; target mobile gutter is 24px. `Moment.css` controls the story well. | Align the editorial well without changing the phone UI. |
| CA / MAN / BMW desktop | First chapter text begins at x=24px at width 1440; target desktop gutter is 64px. | Adjust outer editorial wells and verify existing diagrams/sticky content. |
| How I Work | Well uses 24px side edges, 128px desktop chapter margins and 96px mobile chapter margins in `field-notes.css`. | Review outer well and chapter rhythm against 64/24px gutters and 96/56px section spacing. |
| E.ON | Challenge section padding-block is 64px desktop / 32px mobile; text sits in an internal split composition. | Apply spacing at the outer section/well, preserving the split composition and existing background overlaps. |
| BMW | First showcase padding-block is 36px desktop / 22px mobile; driver hero has its own responsive padding. | Keep the approved hero out of this chapter-spacing pass. |
| MAN | First content section padding-block is 63.36px desktop / 36px mobile. | Normalize section rhythm only after type approval. |

Coordinates above are specific observed elements, not a claim that every section on a page uses the same gutter. Sections also use margins, inner wells and sticky stages; a blanket `section { padding: ... }` would affect product UI and authored layouts.

## Verification and evidence

Test runner: Haiku, as required by the developer role. Browser commands use harness `test-lock.sh` and installed Chrome; WebKit uses `/Users/lu/.buzz/.playwright-browsers`.

Evidence directory: `/Users/lu/.buzz/OUTBOX/DS_REVIEW_1112/`.

- `before.json`, `after.json`: computed styles, sections, header controls, embedded BMW headings, overflow and page errors for all 21 cases. Each case returns HTTP 200; no page exceptions or horizontal overflow.
- `after-*.png`: 21 local screenshots, focused on the first chapter. `before-*.png` reconstruct the exact two-file typography baseline using CSS read from `git show f84ae56:app/editorial-type.css` and removing the three new BMW attributes in the browser only.
- Initial baseline capture passed, but a runner invocation omitted its `after` argument and overwrote the baseline evidence. That run is not accepted as an after-verification. The phase is now mandatory, the baseline was recaptured, and `after-verified.log` contains the explicit after run with all assertions enabled.
- `focused.json`, `focused.log`: confirms unchanged header styles, non-H2 type roles, BMW embedded headings and section padding; checks CA German at 1025px in Chrome and WebKit, no automatic hyphenation or horizontal title overflow; checks the index mobile menu opens/closes in both engines.
- `ca04-de-1025-{chromium,webkit}.png`: original German title remains intact. At 1025px it wraps to four lines without splitting compound words. This is not a claim that the unrelated held #174 layout work is merged.
- `install.log`: frozen pnpm installation passed without dependency changes.
- `build.log`, `tsc.log`: production build and TypeScript check both passed (exit 0).
- `production/after.json`, `production/after-*.png`, `production.log`: all 21 cases passed again against the built site, confirming production CSS ordering. `/index` returns 200 and `/lab/tools` returns the intended 404. Port 4624 serves this production build for local reviewers.
- `review.html`: side-by-side baseline and production screenshots for the six cases at all three widths.
- No `scripts/verify.sh` or `.github/workflows/verify.yml` exists in this repository; those checks are not claimed.

Lock evidence for the explicit after run:

```text
[test-lock] 开始 18:23:31 负载 3.36 3.66 3.64 排队 0 秒
[test-lock] 结束 18:24:02 负载 2.98 3.55 3.59 退出码 0
```

Focused regression:

```text
[test-lock] 开始 18:25:03 负载 2.92 3.43 3.55 排队 0 秒
[test-lock] 结束 18:25:18 负载 3.77 3.58 3.60 退出码 0
```

## Handoff

Typography passed local QA #9610 and visual QA #9612. The second spacing commit now goes to QA and visual QA locally. Because spacing edits CA CSS files, legal must also review the final PR HEAD. Only after local review gates pass will this branch be updated against main, pushed once and opened as one design PR, per #9569. The subsequent authorized 3000 sync is still pending; this report does not claim deployment or final review approval.


## Spacing implementation (second commit, PM #9613 / #9815)

The typography baseline `f5c271fe` passed QA #9610 and visual QA #9612. The second step adds shared 24→64px gutter and 56→96px section-spacing tokens, interpolated at 720–1024px, and maps existing editorial wrappers on How I Work, ETF, CA, E.ON and MAN to them. No new runtime component, copy, asset or dependency was introduced. The spacing mappings and intentional composition exceptions are documented in `docs/type-scale-spec.md`.

The earlier padding findings are measurements, not authorization to redesign BMW's layout: BMW remains limited to three chapter titles under PM #9218. Maximum-width wells still center at wider viewports. Full-screen heroes, embedded product UI, phone sticky positioning, Concept scroll duration and authored joined-section overlaps remain outside ordinary section padding.

Spacing evidence is separate from the typography evidence: `/Users/lu/.buzz/OUTBOX/DS_PADDING_1112/`. The first baseline capture failed because the old 4624 production server was no longer listening; this is a recorded preview-availability failure, not a passed baseline. The existing production build was restarted before recapturing baseline screenshots. An intermediate baseline screenshot run was terminated with exit 143 and was not accepted. The complete retry passed. Test runners executed the prepared scripts in blocking mode after that interruption.


### Spacing verification

Runtime source tested: `78c0993` (the final report-only amendment does not change runtime source). Frozen pnpm installation, production build and TypeScript check passed. Port 4624 serves that production build.

- `before/after.json`, `after/after.json`: 21 route/width checks each; all 31 chapter headings stay 40/44px, weight 600. No page errors or horizontal page overflow.
- `before-padding.json`, `after-padding.json`: 15 changed-page/width measurements, covering each mapped editorial wrapper.
- `spacing-assertions.json`: 195 assertions passed, including the exact 24/64px minimum gutters, 56/96px ordinary edges and retained 0/24px joined-section exceptions.
- `focused.json`: other type roles, header controls and embedded BMW UI are unchanged. The complete measured section geometry of `/index` and BMW is unchanged. CA German at 1025px remains four lines, manual hyphenation, no horizontal title overflow in Chrome and WebKit; both engines pass the index mobile-menu check. The existing lone `zur` line remains a visual-review note, not a claim of improved copy wrapping.
- `review.html`: five changed pages × three widths, baseline/after side by side. The separate typography comparison remains in `DS_REVIEW_1112/review.html`.
- No new permanent test harness or CI configuration was added for this CSS mapping; the existing browser audit was reused and the targeted spacing assertions live with the local evidence.

Baseline:
```text
[test-lock] 开始 21:48:24 负载 9.60 5.97 3.97 排队 0 秒
[test-lock] 结束 21:49:13 负载 7.48 5.95 4.07 退出码 0
```
Production spacing and regression:
```text
[test-lock] 开始 21:50:09 负载 4.40 5.36 3.97 排队 0 秒
[test-lock] 结束 21:51:12 负载 3.33 4.87 3.88 退出码 0
```

Requested wrapping follow-up (`wraps.json`, six route/width cases): How I Work's “I hand over more than screens.” remains three lines at 390/700/1440; the longest E.ON chapter title remains five/three/two lines respectively. All fit their columns without horizontal title overflow. Copy, type size and authored line breaks were not changed to force shorter wrapping.
```text
[test-lock] 开始 21:51:47 负载 3.77 4.76 3.88 排队 0 秒
[test-lock] 结束 21:51:57 负载 4.34 4.85 3.92 退出码 0
```
