# Client Advisory: title scale and research text

Request: Lu, #lu-portfolio message 7442; implementation scope: PM 7453 and 8803.
Scale: `~/.buzz/OUTBOX/DS_REVIEW_1111/type-scale-spec.md` (PM 7822, Lu 7828),
with chapter titles revised to 40/44px at every width by Lu #9217 and PM #9218.
Baseline: `0dbb97b`, `/client-advisory`, Chrome, 1440/700/390 × 900.

The title tokens are scoped to `.ca-main`. The hero uses display, chapter titles
use h2, and the secondary research, mandate, principle-card, concept and outcome
titles use h3. Mockup interface typography is unchanged.

| Position | Before at 1440 (px) | Token | After at 1440 (px) | After at 390/700 (px) |
| --- | ---: | --- | ---: | ---: |
| Hero | 72 | `--ca-type-display` | 60 | 40 |
| 02 chapter | 51.84 | `--ca-type-h2` | 40 | 40 |
| 02 question | 44 | `--ca-type-h3` | 28 | 24 |
| 03 chapter | 51.84 | `--ca-type-h2` | 40 | 40 |
| 03 two secondary titles | 40 | `--ca-type-h3` | 28 | 24 |
| 04 chapter | 40 | `--ca-type-h2` | 40 | 40 |
| 05 chapter | 51.84 | `--ca-type-h2` | 40 | 40 |
| 05 card titles | 28 | `--ca-type-h3` | 28 | 24 |
| 06 chapter | 51.84 | `--ca-type-h2` | 40 | 40 |
| 06 accordion titles | 28 | `--ca-type-h3` | 28 | 24 |
| 07 chapter | 51.84 | `--ca-type-h2` | 40 | 40 |
| 07 secondary title | 28 | `--ca-type-h3` | 28 | 24 |
| Closing statement | 40 (weight 400) | `--ca-type-lead` | 22 (weight 400) | 18 |

Display uses weight 700 and line height 64/44px (desktop/mobile). H2 uses weight
600 and line height 44px at every width; h3 uses weight 600 and line height 33.6/29px.
Display, H3 and lead interpolate between 720 and 1024px; H2 stays at 40/44px. The 04 title uses the chapter scale; the closing paragraph uses the lead scale
(22/33 desktop, 18/27 mobile, weight 400). Research subheadings become smaller.

The two research quotations move right by 48px at ≥1280px (32px at 1024–1279px).
Their mobile positions are unchanged. Portrait cropping and image assets do not change.

Research copy reuses `watchClass` from `lib/observe-once.ts`: each block reveals
once as it reaches the viewport. Text fades and rises 6px over 700ms, with a
120ms stagger and the text easing from E.ON #152. It does not reuse the E.ON
card's longer, multi-stage icon/card sequence. The eyebrow stays visible.
The hidden state is enabled only after listeners are installed, within
`(scripting: enabled) and (prefers-reduced-motion: no-preference)`. Without
JavaScript, before hydration, and with reduced motion, the research copy is visible.

No copy, translations, images, portrait animation, section backgrounds or spacing
tokens are changed. Section-seam work belongs to #168. The repository has no
`ARCHITECTURE.md`, project `design-system/` directory, or `scripts/verify.sh`;
this change uses the supplied scale and existing component structure.

## Visual evidence

Each sheet has the baseline on the left and the change on the right, preserving
the captured pixel dimensions. Rows show hero, research, shift, principles,
outcome and closing. No screenshot metadata is retained in the exported JPEGs.

- [1440px before/after](comparison-1440.jpg)
- [700px before/after](comparison-700.jpg)
- [390px before/after](comparison-390.jpg)
- [Research entrance recording](research-reveal.gif)

Original captures, measured styles and logs:
`~/.buzz/OUTBOX/CA_TYPE_REVEAL_1112/`.

## Verification

- `pnpm install --frozen-lockfile`: passed, dependencies unchanged.
- `pnpm exec tsc --noEmit`: passed.
- `pnpm build`: passed; the final CSS timing refinement is also rebuilt.
- `scripts/test-ca-type-reveal.cjs`: passed in Chrome, English and German,
  at 390/700/850/1024/1440px. Checks title sizes/weights/line heights, card titles,
  paragraph start order, duration and stagger, scrolling back without replay,
  reduced motion (including toggling it), no JavaScript, resize and overflow.
- Actual 1440px quotation positions: 330.78/376.80 → 378.78/424.80px;
  390/700px positions stay at 24px.

Run the browser regression against the root preview through the shared lock:

```sh
BASE_URL=http://localhost:4620 /Users/lu/.buzz/REPOS/harness-core/scripts/test-lock.sh node scripts/test-ca-type-reveal.cjs
```

Final browser regression lock load: start 12:55:46 — 3.96 / 4.58 / 11.74;
end 12:55:58 — 4.00 / 4.56 / 11.61 (2026-11-12, Europe/Zurich).

The no-JavaScript assertion covers the new research reveal. Existing hidden
content elsewhere on the baseline CA page is outside this change.


## Visual revision after 2ea46e6

- 04 keeps the approved H2 size and copy. Remove its forced line break and widen
  the desktop text column from 43% to 58%; the diagram remains in the right column.
- The closing statement is a paragraph, mapped to the DS lead scale rather than H2.
- No translation, image, or reveal timing changes. The automated regression now
  checks two-line 04 headings at 1440 in both languages and the closing lead scale.

### Motion alternatives rejected

- Per-letter reveals: many repeated movements would interrupt reading; paragraph
  groups communicate the research sequence with fewer transitions.
- Replaying on every return scroll: a repeated decorative delay would obstruct
  revisiting evidence; each paragraph appears once.
- Long travel or spring overshoot: these would draw attention away from the text;
  retain the existing 6px rise and 700ms text easing.
- Delayed reduced-motion reveal: the transition has no functional necessity;
  reduced-motion and no-JavaScript readers receive immediately visible copy.

Revision verification: frozen install, TypeScript, five-width EN/DE reveal
regression and 390/700/1440 screenshots passed (Chrome, 4634). At 1440 the 04
heading is two lines in both languages. Closing is 4/5 lines (EN/DE) at 390,
3/4 at 700 and 1440. The 390 04 headline still needs four lines with approved
copy and the fixed 40px DS token; shortening it requires copy/PM direction.

- [04 German desktop after revision](revision-shift.jpg)
- [Closing English mobile after revision](revision-closing.jpg)
- Full six-viewport captures: `/tmp/dev-tools-validation/ca174-{en,de}-{390,700,1440}-{shift,closing}.png`.

Original comparisons above document the first revision, not this final state.

## Previous narrow-desktop revision (PM #9079, 1049d18)

At 1025–1279px, section 04 restores the original 43/57 text/diagram split.
The approved heading token and wording stay unchanged. Automatic hyphenation
and overflow wrapping keep long German words within the narrower heading column.
At 1280px and above, the wider text column remains. The 700px stacked layout
and the 1440px layout are unchanged by this revision.

At 1025px, the diagram is 534.59px wide (previous revision: 393.91px), matching
the current port-3000 baseline. Rendered primary/secondary labels are
14.16/11.51px (previous revision: 10.43/8.48px), also matching the baseline.
This restores diagram readability by giving the left column less space; the
English title therefore wraps to more lines at this width. Both languages are
shown below so the tradeoff is reviewable.

| Language | Before (33aee42) | Previous revision (1049d18) |
| --- | --- | --- |
| English | [1025px before](narrow-before-en.png) | [1025px after](narrow-after-en.png) |
| German | [1025px before](narrow-before-de.png) | [1025px after](narrow-after-de.png) |

The regression adds 1025px in both languages and checks the diagram width and
heading text containment, alongside the existing reveal, type-scale,
reduced-motion and no-JavaScript checks. The separate comparison checks diagram
and label dimensions against port 3000 at 1025px, and unchanged heading/diagram
geometry against 33aee42 at 700/1440px. Full captures, geometry and test logs:
`/tmp/ca174-1025-checks/`.

Final validation (Haiku test-runner, 2026-11-12): production build including
TypeScript passed. The six-width regression and EN/DE screenshot comparison
passed through the shared browser lock. At 1025px, the final EN/DE headings use
four/five lines; neither extends into the diagram column.

- Regression: 14:42:54 load 5.77 / 8.07 / 9.34 → 14:43:07 load
  5.75 / 7.99 / 9.30, exit 0.
- Comparison: 14:43:12 load 5.45 / 7.89 / 9.25 → 14:43:32 load
  6.31 / 7.91 / 9.23, exit 0.
- An earlier final-run attempt failed the existing sampled paragraph-order
  assertion at 14:41:13; the subsequent locked rerun passed without animation
  implementation changes. The cause of that first failure is not confirmed.
  Failure messages now include language and observed start times; setting
  `TEST_ARTIFACT_DIR` also saves timing samples before that assertion. No timing
  threshold was relaxed. QA should retain this transient failure in its review.


## Current revision: 40px chapter titles (Lu #9217, PM #9218)

The existing `--ca-type-h2` / `--ca-type-h2-line` tokens now remain 40/44px
at all viewport widths, weight 600. Removed their desktop interpolation and
section 04's automatic hyphenation / anywhere wrapping. Original English and
German copy is retained. Display, H3, lead, column splits, diagram dimensions
and reveal behavior are unchanged from 1049d18.

At 1025px, Chrome and WebKit show three English title lines and four German
lines without broken words or text outside the column. German still has `zur`
on its own line; this is shown explicitly for visual review. The diagram remains
534.59px wide. This is a developer validation, not visual approval.

| Browser | English | German |
| --- | --- | --- |
| Chrome | [40px title](title40-chromium-en-1025.png) | [40px title](title40-chromium-de-1025.png) |
| WebKit | [40px title](title40-webkit-en-1025.png) | [40px title](title40-webkit-de-1025.png) |

Before: [1049d18 English](narrow-after-en.png), [1049d18 German](narrow-after-de.png).
The four new PNGs are unedited Playwright section captures from this worktree's
root preview on port 4620, 1025×900 viewport, reduced motion for stable capture.
No new website image assets or third-party content were introduced.

Haiku test-runner validation, 2026-11-12 (logs `/tmp/dev-ca174-40px/`):

- Frozen installation, TypeScript and production build passed.
- Full Chrome EN/DE six-width regression, including research reveal/reduced
  motion/no-JS checks, passed: lock 15:19:35 load 6.71/6.03/6.17 →
  15:19:47 load 6.17/5.95/6.14, exit 0.
- Chrome titles in both languages at 390/700/850/1024/1025/1440 passed:
  lock 15:19:49 load 6.17/5.95/6.14 → 15:20:07 load 6.01/5.93/6.13, exit 0.
- WebKit titles at the same widths/languages passed:
  lock 15:20:10 load 6.01/5.93/6.13 → 15:20:24 load 7.19/6.22/6.23, exit 0.
- Added a DOM Range check for words wrapping across multiple lines at 1025px,
  alongside existing title containment and diagram-width assertions.
- The first browser run failed on an internal Next dev error, `Router action
  dispatched before initialization`, while the server logged Turbopack cache
  errors. After restarting the preview, the locked runs above passed without
  relaxing assertions or changing app behavior. Failed run: 15:18:30 load
  7.15/5.61/6.03 → 15:18:48 load 10.52/6.47/6.33, exit 1.

Broader DS implementation and spacing remain separate tasks. The shared OUTBOX
specification has been updated with Lu's superseding 40/44px chapter decision.


## German wrapping revision — PM #10629 (2026-11-13)

Visualqa found that section 04's German compound words were clipped at 390px
on a40073d, although the document itself did not overflow. At 1025px, “zur”
occupied a line alone. The heading now takes `lang` from the existing
`useTranslation` hook; only German applies dictionary hyphenation (including
WebKit's prefixed property) and `text-wrap: balance`. The 40/44px type scale,
English and German copy, grid, and diagram dimensions are unchanged.

The title regression now checks every non-space character's range against its
heading column at every tested width. The older whole-word assertion is retained
for English and superseded for German by PM's explicit hyphenation decision.

Test-runner passed frozen installation and the Chrome/WebKit EN/DE title suite
at 390/700/850/1024/1025/1440. Separate DE checks at 390/1025 in normal and reduced
motion passed character containment, 40/44px type, no standalone “zur” line,
no horizontal overflow and no page errors. Browser hyphenation points differ
between engines; no manual hyphens or wording changes were introduced.

Evidence and source SHA-256 hashes:
`/Users/lu/.buzz/OUTBOX/DEV_CA174_HYPHENS_1113/`.
Preview: http://localhost:4620/client-advisory (select DE).
Before evidence: `/Users/lu/.buzz/OUTBOX/VISUALQA_PR174_A40073D_1113/`.
No full build or full research-animation suite was rerun for this scoped revision.
No separate CA prototype, ARCHITECTURE.md or scripts/verify.sh exists in this checkout.
Independent QA, legal and visual review are still required for the new HEAD.

```text
[test-lock] 开始 02:41:48 负载 4.64 4.51 4.48
[test-lock] 结束 02:41:57 负载 4.62 4.51 4.48 退出码 0
[test-lock] 开始 02:41:57 负载 4.62 4.51 4.48
[test-lock] 结束 02:42:09 负载 5.11 4.62 4.52 退出码 0
[test-lock] 开始 02:42:09 负载 5.11 4.62 4.52 排队 17 秒
[test-lock] 结束 02:42:26 负载 4.88 4.59 4.51 退出码 0
```
