# Client Advisory: title scale and research text

Request: Lu, #lu-portfolio message 7442; implementation scope: PM 7453 and 8803.
Scale: `~/.buzz/OUTBOX/DS_REVIEW_1111/type-scale-spec.md` (PM 7822, Lu 7828).
Baseline: `0dbb97b`, `/client-advisory`, Chrome, 1440/700/390 × 900.

The title tokens are scoped to `.ca-main`. The hero uses display, chapter titles
use h2, and the secondary research, mandate, principle-card, concept and outcome
titles use h3. Mockup interface typography is unchanged.

| Position | Before at 1440 (px) | Token | After at 1440 (px) | After at 390/700 (px) |
| --- | ---: | --- | ---: | ---: |
| Hero | 72 | `--ca-type-display` | 60 | 40 |
| 02 chapter | 51.84 | `--ca-type-h2` | 51.84 | 40 |
| 02 question | 44 | `--ca-type-h3` | 28 | 24 |
| 03 chapter | 51.84 | `--ca-type-h2` | 51.84 | 40 |
| 03 two secondary titles | 40 | `--ca-type-h3` | 28 | 24 |
| 04 chapter | 40 | `--ca-type-h2` | 51.84 | 40 |
| 05 chapter | 51.84 | `--ca-type-h2` | 51.84 | 40 |
| 05 card titles | 28 | `--ca-type-h3` | 28 | 24 |
| 06 chapter | 51.84 | `--ca-type-h2` | 51.84 | 40 |
| 06 accordion titles | 28 | `--ca-type-h3` | 28 | 24 |
| 07 chapter | 51.84 | `--ca-type-h2` | 51.84 | 40 |
| 07 secondary title | 28 | `--ca-type-h3` | 28 | 24 |
| Closing statement | 40 (weight 400) | `--ca-type-lead` | 22 (weight 400) | 18 |

Display uses weight 700 and line height 64/44px (desktop/mobile). H2 uses weight
600 and line height 57.02/44px; h3 uses weight 600 and line height 33.6/29px.
The scale interpolates between 720 and 1024px. The 04 title uses the chapter scale; the closing paragraph uses the lead scale
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
