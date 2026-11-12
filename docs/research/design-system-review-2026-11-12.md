# Design System review — typography first

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

## Padding review — pending second implementation step

The approved specification requires gutter/section-padding changes in a separate commit **after typography passes visual QA**. This commit measures and records them; it does not change layout spacing.

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

QA and visual QA review the local typography result first. The shared CSS affects CA presentation, so legal is included in local review even though no CA source, copy or media changed. Padding remains the second commit on this same branch after typography visual approval. Only after all local review gates pass will the branch be pushed once and one design PR opened, per #9569. This report does not mark the entire Design System review complete.
