# Current integration — 2026-11-08

PM #136/#172 requests merging the sequence and no-drops versions. The three component files now use the saved no-drops version (f64cde9): six nodes, no falling particles, a survivor path, the existing shorter timeline and handwritten annotation sequence. The source for this prototype is the actual /EON page on this branch; there is no separate executable HTML implementation. Earlier A/B media below are historical and do not validate this integration.

No new curves or durations were invented. The values come from the preserved no-drops worktree. Normal, slow4 and reduced-motion verification must be rerun on this integrated branch. Mobile auto-follow remains interruptible; real-device horizontal swipe must be tested by Lu before approval.

Rejected: restore falling dots (explicit requested removal); add loops (frequency); animate readable figures (function); keyboard-triggered replay (frequency).

---

# E.ON journey A/B review prototype

Draft selection round for section 04. Replaces the scroll-coupled playhead without new copy. Not integrated into the canonical 3000 site. No Rive asset or input contract is introduced.

Preview `/EON?journey=A` or `/EON?journey=B`. Once the rail is 30% visible, play once and hold. Reload to replay. The query switch is for review only.

| Variant | Sequence | End |
| --- | --- | --- |
| A | 0–450 ms Visit→Explore; 450–900 Explore→Calculate; 900–1150 fill/halo/1.08×; 1150–1800 five 8 px dots fall 46–60 px; 1800–2800 a dim survivor crosses the remaining nodes | 2800 ms; downstream 60%, trail 35% |
| B | Visit/Explore/Calculate at 0/350/700 ms; first two checks and underlines; Calculate spinner 700–1600; downstream dashes and note at 1100–1600 | 1600 ms; spinner freezes; downstream 35% |

A uses a 12 px lead dot and 3 px trail; note/arrow appears at 1400–2000 ms. Both preserve existing typography, labels, icons and navy/lavender tokens. Reduced motion shows a static final without scale or particles. Mobile retains the horizontally scrollable rail.

## Source and reproduction

Editable component: `eon/e-on-09/components/motion/journey-steps.tsx`; timeline: adjacent `journey-sequence.module.css`; annotation: `components/journey/journey-section.tsx`. No dependencies added.

Independent preview on port 4691 is a copy of the current 3000 working site with these three source files overlaid. Their hashes match this branch. Other 3000 changes are not included in this PR. Run browser scripts through harness-core `scripts/test-lock.sh`, with `TEST_LOCK_CHANNEL` set to this project. Scripts use installed Chrome and local Playwright; adjust local preview/output/Playwright paths on another machine. `capture.cjs` records CDP frames to the external SSD; `encode.cjs` restores normal speed from timestamps. `inspect.cjs` captures desktop/mid/mobile/reduced states. `verify.cjs` checks re-entry/live reduced motion and reads the original 3000 section for the before screenshot.

## Validation and remaining work

- Corepack pnpm 10.33.4 frozen offline install passed; package/lockfile unchanged.
- Full branch `tsc --noEmit --incremental false` passed after `node scripts/build-ask-lu.mjs` generated required ignored data. Tested base 71fdf7f plus this working diff.
- Recording assertions: six nodes; exactly five falling dots in A; Calculate ends at 1.08×; no running animations at end, including B spinner; no page errors.
- Six desktop/390/reduced contexts passed overflow/node checks; Calculate visible at 390. Re-entry holds; live reduced-motion change stops the rail and removes scale.
- Recording copy has six unrelated type errors also present in its 3000 source (human-ai-page, weather-aquarium-page, site-header). This branch's full typecheck passes.
- Recording lock: 12:40:36 load 1.68/3.04/4.25 → 12:42:32 load 6.18/4.01/4.46, exit 0. Re-entry/reduced lock: 12:47:36 load 2.91/3.52/4.11 → 12:48:04 load 3.34/3.58/4.11, exit 0.

Pending Lu selection, QA/visual review, developer integration and real-device swipes/reduced-motion checks. The existing mint shape overlaps handwritten copy on mobile; this prototype preserves that layout. No merge/deployment/3000 edit; keep draft.

Buzz channel: 4d529583-4dcf-4804-816e-94f63f30634b. Assignment: 683c79e59fc8ebabbc9d0a50849325afd52594a33644b90b691bb5c0c6338320; follow-up: c231874a63c3f38cca374d78dc4e7a0dbb34d2c4adaa9d909621a9f9c2ca8041.

## Review media

Videos: 1440×702 section crops, 30 fps; A 4.8 s / 668,452 bytes; B 3.6 s / 646,490 bytes. CDP animation playback 0.1, timestamp resampling back to normal speed; no Playwright recordVideo. Both include a 2 s final hold (last 60 decoded frames identical). Recording-only framing hides fixed navigation.

Intermediate comparison: A at 1.45 s, B at 1.00 s, each scaled to 720 px and labeled. Original screenshots are 1440 px wide. 390 finals are browser simulations, not physical-device tests.

- [VIDEO_A](https://buzz-wwbf.srv2056990.hstgr.cloud/media/0f870bc441f98a9f480038ba7fa41dec026e29ec65761461dc9a260805b1513d.mp4)
- [VIDEO_B](https://buzz-wwbf.srv2056990.hstgr.cloud/media/32f04f6a782b341742594e493cee9533dc1a939bcbd33180b7808f7337302879.mp4)
- [COMPARE](https://buzz-wwbf.srv2056990.hstgr.cloud/media/a7a498622a397a58cf6bdd0cc9486e9d40d1d4517aa6b8e304bb6f08a25a502b.png)
- [A_MOBILE](https://buzz-wwbf.srv2056990.hstgr.cloud/media/b889d8f421ba557a16acac538eb9e8c757409e974f13f247b6e0322b007b32ed.png)
- [B_MOBILE](https://buzz-wwbf.srv2056990.hstgr.cloud/media/e7fb72d8beee7bc804b17b60946eda4df2f8e6d4bc90c9214071fc4eb65917e2.png)
- [A_REDUCED](https://buzz-wwbf.srv2056990.hstgr.cloud/media/3b00373095e686fcb6f034bcd8f523f42f9e0229e036e58b978f54dfb87d85b6.png)
- [B_REDUCED](https://buzz-wwbf.srv2056990.hstgr.cloud/media/c02a80bceb1a0b7c628492236dbf606ca3b2ee418566d84bec4e67a09796b2eb.png)
- [BEFORE](https://buzz-wwbf.srv2056990.hstgr.cloud/media/bf237bbd75be82143200cee8fb32d0966b38065552333f028be95b30330e1daa.png)
