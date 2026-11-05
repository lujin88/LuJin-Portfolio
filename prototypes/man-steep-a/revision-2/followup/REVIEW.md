MAN's compact scroll stage now matches the surrounding section spacing at narrow desktop and mobile sizes. Both title alternatives remain available; apply exactly one full patch to the spacing-only 4811 baseline. Nothing was applied to port 3000.

The follow-up reduces 1001–1280px animated-stage bottom padding from 96px to 76px and increases ≤580px static bottom padding from 46px to 68px. At 1440px padding is unchanged. CSS owns `--man-scene-height`; JS reads a hidden DOM ruler instead of deriving height from `board.offsetTop / .38`. The ref is checked before assigning a non-null callback local.

| Viewport | A blank band | B blank band |
|---|---:|---:|
| 1440×900 | 125px | 125px |
| 1440×1000 | 125px | 125px |
| 1024×768 | 106px | 106px |
| 390×844 | 94px | 94px |

Measurement uses QA ad79's algorithm: full width, every second x, each RGB channel within ±3 of the row's first pixel. It includes pale antialiasing; these replace the earlier dark-ink measurements. See [evidence](https://github.com/lujin88/LuJin-Portfolio/tree/prototype/man-steep-a-20261104/prototypes/man-steep-a/revision-2/followup).

Motion recommendation: accept My role appearing during the final assembly (QA measured approximately 74% at 1440×900 and 69% at 1440×1000). It provides a continuation cue, is static, and remains separated from the moving cards. Keep current timing; do not extend the blank stage or delay visibility of readable metadata. This recommendation still needs Lu's design decision.

1440×900 normal-speed wheel recordings: [A](https://buzz-wwbf.srv2056990.hstgr.cloud/media/bc4db3166e0ae918d410a239efb4273d39370d612d8fadf572ef5af1f38d4ffd.mp4) · [B](https://buzz-wwbf.srv2056990.hstgr.cloud/media/0c592d64434494800d7cd00c142c66cf32f7bda6294dbcc629a4b3135be85b88.mp4). These use synthetic native wheel input; they include initial static fallback before hydration. Eight A/B × viewport down/up checks and both videos reported zero console/page errors, progress reversals or overlap; both videos also reported zero HTTP errors. Desktop scroll ranges remain 720/800/614px. Final-source eight screenshots reproduce the exact blank-band pixels after the final ref-guard/type correction and algebra-only CSS cleanup.

Full-tree typecheck: same ten baseline diagnostic lines outside MAN; project typecheck still fails. Frozen dependency install, patch application to baseline and whitespace checks pass. No test script is defined. No Rive build was involved. Safari, physical devices and CPU throttling were not tested.

Test-lock load: main run 1.56/3.03/4.36 → 3.71/3.29/4.16; final-source screenshots 3.30/3.21/4.12 → 4.30/3.50/4.18. Raw evidence: `OUTBOX/MAN_R2_FOLLOWUP_20261105_249a/`.

Remaining: Lu's A/B choice and timing decision, independent QA of this follow-up, visual approval and production integration. Runtime reduced-motion scroll anchoring is a separate task, excluded from #66.

Before (1024/390 blank bands: QA measured 126/72px at 5c39c43): original evidence remains in revision-2/REVIEW.md and the Buzz thread. After:

![1024 final](https://raw.githubusercontent.com/lujin88/LuJin-Portfolio/prototype/man-steep-a-20261104/prototypes/man-steep-a/revision-2/followup/A/final_1024x768.png)

![390 final](https://raw.githubusercontent.com/lujin88/LuJin-Portfolio/prototype/man-steep-a-20261104/prototypes/man-steep-a/revision-2/followup/A/final_390x844.png)

Original before/after, slow/reduced-motion recordings and navigation evidence remain in [revision-2/REVIEW.md](https://github.com/lujin88/LuJin-Portfolio/blob/prototype/man-steep-a-20261104/prototypes/man-steep-a/revision-2/REVIEW.md). QA approved the shared prior revision at 5c39c43; this commit awaits recheck.

Originating Buzz channel: 4d529583-4dcf-4804-816e-94f63f30634b. Follow-up assignment: cabb570ad0c20f756db9dfa687d4500c905c84d80c5e56816f3a80f70b2c86ac.
