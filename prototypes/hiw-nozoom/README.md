# How I Work — fixed-composition review

Review candidate for Lu's 3 November request: remove the apparent zoom, animate DECIDE, and move the far-right connector down into the timeline. **Not integrated into localhost:3000.** The motion changes from generated facial turns to smaller, deterministic nods/turns using the original artwork. PM must review that change before a developer wires it into the page.

## Review files

`/Users/lu/.buzz/OUTBOX/HIW_NO_ZOOM_20261103/`

- `CONTROLLED_V2.mp4`: candidate asset, 1060×654, 24fps, 97 frames / 4.041667 seconds, H.264, no audio, 250,111 bytes. Dark composited background retained from the existing media; **not a transparent reusable character asset**.
- `REVIEW_FINAL/BEFORE_1440.webm`, `REVIEW_FINAL/AFTER_1440.webm`: 1440×1000 homepage snapshot recordings, followed by the connection to the timeline.
- `REVIEW_FINAL/SLOW_1440.webm`: quarter-speed preview. `REVIEW_FINAL/REDUCED_1440.webm`: original static image.
- `STILL.png`: reduced-motion reference; the page continues to use its original image.
- `FRAME_SCALE.csv`, `VERIFICATION_V2.json`, `CONTROLLED_V2_MATRICES.json`: per-frame measurements and actual transform parameters.

The recordings use a saved `public/home.html` plus the site's CSS/fonts, rendered in Chrome through a browser-only route on localhost. They are previews, not evidence of a production integration. Initial attempts through the Next page timed out during loading and are retained in `RECORD.log`/`RECORD_V2.log`. No source page, design-system file, live video, or other agent's file was changed.

## Motion contract

This round edits a video, so it introduces no Rive state machine or runtime inputs. `controlled.py` is the editable motion source; `SOURCE.png` is a byte-identical copy of the existing original-poster.png. No generated art, new character proportions, paid call, watermark, or new account. `rive doctor` passed before work; no Rive build was needed. The repository has no design-system/README.md or tokens.json; all artwork colors come from the existing source pixels.

All five character transforms have scale X/Y = 1. Each head rotates inside a fixed-edge local mesh; the mesh tapers to zero at the neck and crop edges. This can create small local deformation and is not a rigid, independently reusable cutout. Angles and timing are explicit in `controlled.py` and `CONTROLLED_SPEC.json`:

| Character | Peak rotation | Start / peak / end (s) |
|---|---:|---|
| Bear | −4° | 0.30 / 0.95 / 2.10 |
| Rabbit | +3° | 0.45 / 1.10 / 2.25 |
| Human | −2.5° | 0.65 / 1.40 / 2.70 |
| Fox | −4° | 0.80 / 1.50 / 2.85 |
| Dinosaur | +3° | 0.95 / 1.65 / 3.00 |

DECIDE brightens from 0.35s over 0.65s; left/right rays follow by 0.12/0.24s, then return to their initial dim state after 2.65s. The subtitle stays still. Bulb brightness follows the response without changing its silhouette. Easing is cubic-bezier(0.77,0,0.175,1), from the local animate skill. Final frame equals first before encoding. The video retains the existing loop/visibility behavior; the review adapter uses the original still in reduced-motion mode.

`preview.js` is a disposable review adapter, **not production integration code**. It keeps the existing responsive art dimensions; uses the baked video title while playing; retains the static title on fallback; removes the old long right-side stroke and starts the replacement below the illustration, joining the current first timeline stem. It does not introduce another timeline bar. At ≤640px, the stacked list has no matching stem, so this review adapter suppresses the connector; mobile visual approval is pending.

## Verification and limitations

Every decoded candidate frame has the same subject/table envelope: 904×329 px. Width, height, and adjacent-frame envelope changes are 0%. Independent Lucas–Kanade/RANSAC laptop tracking estimates −0.000033…+0.100751% scale variation, below the requested 0.5%. These are image-space checks, **not proof that every tapered mesh pixel has <0.5% local strain**. Transform scale parameters are exactly 1 for all 97 frames. First/last decoded PSNR is 50.89 dB, mean absolute difference 0.1775/255; compression prevents exact decoded equality.

The previous served video had envelope width −1.44…+3.10% and height −3.04…+0.91%. Merely normalizing this box made that diagnostic pass while laptop tracking still varied by roughly 4%; that method was rejected as an acceptance result. Dense optical-flow registration damaged facial outlines and was also rejected. `AFTER.mp4` and `REGISTERED.mp4` outside this repository are **failed trials, not approved candidate assets**. Only `CONTROLLED_V2.mp4` is the proposed candidate.

No application/package code was touched, so no Next package test suite was run. Browser/decoded-media checks describe working files, not a clean deployed commit. Independent QA, actual Safari/iPhone playback, and production fallback/navigation tests remain with integration. No phone gestures are introduced.

## Purpose and rejected motion

Occasional marketing illustration; purpose is explanation and preventing a jarring change. DECIDE reinforces human judgment without moving the copy. Rejected: whole-scene scaling (causes the reported jump), dense flow correction (damages the drawing), moving the subtitle (disrupts reading), additional page entrance effects (competes with the illustration).

## Reproduce

Python with OpenCV and NumPy, plus ffmpeg on PATH:

```sh
HIW_REVIEW_DIR=/absolute/new/output python controlled.py
```

Use a new output directory; ffmpeg refuses to overwrite an existing video. The output uses only `SOURCE.png` and this script. `measure.py` / `verify.py` document the measurement method used for the review bundle; their local source paths refer to the archived experiment directory. `record_final.cjs` captures the local review snapshot with installed Chrome. Run browser capture through harness-core/scripts/test-lock.sh as required by the workspace.

Final browser run: test-lock start 10:47:24 load 27.19 / 30.28 / 21.88; end 10:50:33 load 45.57 / 36.03 / 25.82, exit 0. Four modes reported zero page errors and no horizontal overflow. Reduced mode had video paused/hidden and no connector. The initial Next-page loading failures are not acceptance passes. Final candidate regenerated from the checked-in source is byte-identical (SHA256 967350e5d3d1911278dfbf92e163c0654ea220902628da17d3fe14f3a0715360).
