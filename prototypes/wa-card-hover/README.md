# Weather Aquarium hover review — R5

Review-only prototype for the six vocabulary illustrations and four character labels. This directory is not imported by the site and does not change port 3000. Lu and visual QA have not approved integration.

[Native still/peak comparison](https://buzz-wwbf.srv2056990.hstgr.cloud/media/fce953d0bfd0b6869e2cbc13602d91b8072509c9238d1e46e2f5327ea8951a0c.png) · [1440 normal-speed recording](https://buzz-wwbf.srv2056990.hstgr.cloud/media/a884f7d47ca8430b174c8514623352980f2983020f69a50797564b96b7b6c933.mp4)

The comparison uses native crops at a 1440px viewport and DPR 1. Each pair has identical crop geometry: still on the left, CSS hover endpoint on the right. Character videos are sampled at 0.75 seconds; only the label displacement is newly proposed. The existing video frame is not claimed to be the maximum character pose.

## Change

PM reported that the previous motions were difficult to see at card size. This round makes the user-requested hover feedback legible while retaining fixed speech controls and hit areas.

| Element | Before | After | Why |
| --- | --- | --- | --- |
| Perch | x +10px, -4° | x +24px, -8° | Clear swimming direction |
| Church | y -5px, scale 1.025 | y -12px, scale 1.06 | Visible lift without spinning architecture |
| Sun | +18° | y -8px, +26°, scale 1.04 | Lift plus turn remains visible on radial artwork |
| Rain | y +7px | y +14px, -5° | Downward gesture distinct from lifted objects |
| Coat | -5° | -10° | Rotation about the upper coat |
| Hat | y -7px, +5° | y -16px, +10° | Visible tipping gesture |
| All four character labels | y -4px | y -12px | Larger separation from the resting baseline |
| Entry timing | 320ms | 200ms | Reuse `--duration-fast`, below Emil's 300ms UI guidance |
| Font | Undefined `--font-poppins` invalidated the declaration | Bind the variable to existing local Poppins faces | Match the site's `app/layout.tsx` font family |

The pixel and degree choices are review proposals, not numerical limits quoted from Emil. Use the existing project curve `--ease: cubic-bezier(0.22, 1, 0.36, 1)` and 200ms entry/exit. Only transforms are added. CSS transitions can reverse mid-hover.

Frequency/purpose: occasional exploration of a portfolio demonstration; feedback that the illustration is being explored. This is not a repeatedly used production navigation interaction.

Rejected: automatic looping of vocabulary artwork (distracts from reading); moving speech buttons or hit areas (interferes with use); new motion on keyboard focus or touch hover (input mismatch); added character states (outside this request). Reduced motion keeps original stills and pauses video. Existing preview playback behavior is not a new Rive build.

## Local preview and evidence

`serve.py` reads the four existing MP4 clips from the supplied site checkout; videos are not duplicated in this directory.

```sh
python3 prototypes/wa-card-hover/serve.py --port 4687 --site /path/to/site-checkout
```

Open `http://127.0.0.1:4687/scene.html`; append `?before` to disable the new CSS motion. `review.css` supplies preview framing and the font-variable bridge. Product integration should use only the reviewed motion rules in the actual component stylesheet, with the site's own font layout.

Run browser checks through harness-core `scripts/test-lock.sh`. They use installed Google Chrome. Set `PLAYWRIGHT_PATH` to an existing playwright-core module path; no dependency install is required for the prototype itself. `REVIEW_URL`, `REVIEW_OUT` (recordings), `REVIEW_COMPARE_OUT` (comparison), and `REVIEW_MODES` are optional overrides. Defaults reflect the local review workstation.

- `compare.cjs`: ten paired crops, measured matrices, durations, and actual CDP platform font evidence; outputs HTML, PNG, and JSON.
- `capture-cdp.cjs`: all six artwork endpoints/exits, four label endpoints/exits, interrupted hover, live reduced preference, keyboard label behavior, reduced videos, touch taps, document overflow, and page errors. Chrome screencast frames are timestamped and encoded with ffmpeg. Startup frames with the wrong viewport dimensions are ignored.
- `source-manifest.json`: original artwork/CSS provenance. Snapshot files preserve the review baseline; they are not a replacement design system.

2026-11-04 comparison: ten pairs passed, actual text renderer `Poppins SemiBold`, custom webfont. Test-lock 12:08:39 load 3.93/4.50/6.18 → 12:09:05 load 5.40/4.77/6.23, exit 0.

Full prototype run: NORMAL, SLOW, REDUCED, TOUCH_390 passed. Test-lock 12:09:20 load 5.02/4.71/6.18 → 12:11:27 load 4.07/4.63/5.95, exit 0. Source was the uncommitted prototype on base `71fdf7f319a843bdfd02499df559f4391967491a`; this is not a production-site test. All four MP4s decoded without reported ffmpeg errors. Normal: 1440×900, 18.566667s; slow: 1440×900, 39.966667s; reduced: 1440×900, 20.933333s; touch: 390×844, 16.266667s. `pnpm install --frozen-lockfile --offline` passed without lockfile changes.

Local evidence: `WORK_LOGS/WA_CARD_HOVER_COMPARE_20261104_R5.log`, `WORK_LOGS/WA_CARD_HOVER_CAPTURE_20261104_R5.log`, and `OUTBOX/WA_CARD_HOVER_20261104/` in the Buzz workspace. Raw frames remain on the external SSD.

Remaining: Lu/visual QA review, developer integration, and actual phone checks. On the integrated `/lab/weather-aquarium`, swipe the character rail, tap each character, scroll it away to check pause, and enable system reduced motion to check still frames. Chrome touch emulation does not verify physical swipes or mobile Safari.
