# How I Work — Lu's four corrections

Current candidate for Buzz assignment `60a1177d4246c2775af1a8e430744e2d217bb9735e021a70ab52416541444de3`, channel `4d529583-4dcf-4804-816e-94f63f30634b`. Supersedes the movement/connector proposal in README.md; the earlier experiments remain archived.

| Before | After | Why |
| --- | --- | --- |
| Stage edge feather clips/fades the left curved arrow | No stage-edge mask; original double arrow remains fully visible | Lu's red-box correction |
| Long right connector relocated below illustration | Connector path hidden entirely in review adapter | Latest instruction supersedes relocation |
| 4.04s candidate without a two-second hold | 10s source render, cut at source frame 143 (5.9583s), extend that decoded frame for two seconds; 8s delivery | Enough duration for movement and a pause, hard cut at the loop boundary |
| DECIDE changes brightness | Original DECIDE artwork translates up 9 source pixels and rotates 3 degrees clockwise, then settles | Clearly visible movement without replacing the lettering or moving the subtitle |

## Editable files and playback

- `revision2.py`: renders from existing SOURCE.png. Five head rotations use the same local fixed-edge tapers as PR #52, time-stretched 1.8×. No whole-scene scale; the laptop stays fixed. Original spelling **DECIDE** retained: the assignment's “DECISION” refers to this label, not approved replacement copy.
- `preview_revision2.js`: disposable browser adapter. Removes only the long connector, removes stage edge feather, masks the original overhead arc, preserves the entire title/subtitle band. Does not alter production page files.
- `record_revision2.cjs`: 1440×1000 normal recording (full 8s cycle plus seam), seam at 0.25× speed, reduced-motion still. Full page comes from the saved review snapshot; current local 3000 serves only supporting read-only assets.
- `verify_revision2.py`: decodes the exact final delivery; measures cut-to-start, hard cut, normal adjacent frames, and every held frame.

Artifacts: `/Users/lu/.buzz/OUTBOX/HIW_NO_ZOOM_20261103/REVISION_2/RENDER_FINAL/`. `HIW_REVISION_2_FINAL.mp4` is the integration candidate. Earlier files directly in REVISION_2 are diagnostic trials, not delivery assets.

No Rive machine/input introduced: this revises the existing video workflow. `rive doctor` passed. No paid generation, new artwork, watermark, account, new character proportions, or runtime integration. Project checkout lacks design-system/README.md and tokens.json; existing artwork colors are retained. Video is still composited on the existing dark background, not an alpha character export. `STILL.png` is its reduced-motion fallback, used with the same arc mask.

## Timing and acceptance

Source 1060×654, 24fps, 240 frames / 10s. Final 192 frames / 8s: 144 source frames followed by 48 exact clones. No crossfade, reversal, or inserted first-frame reset. Frame 143 is already pixel-identical to frame 0 due to subpixel settling before the nominal 6s rest point. Fixed-QP all-intra encoding preserves decoded endpoint equality; adaptive-CRF trial did not and was rejected. This review encoding prioritizes demonstrable seam quality over bandwidth; production delivery compression must be checked again if changed.

The title moves during 0.9–5.94s; subtitle and rays stay still. The people finish their small rotations by 5.4s. Last two seconds are strictly still. Easing is cubic-bezier(0.77, 0, 0.175, 1), matching the locally requested Emil skill. This is an occasional explanatory marketing illustration; the purpose is emphasizing human judgment. Body copy remains still and readable.

Rejected: whole-scene zoom (distracts from reading and repeats Lu's reported fault); moving subtitle (reading interference); reintroducing the long connector (explicitly rejected); pulsing brightness alone (fails requested visible movement).

No production HTML/design system/other agent file changed. Application package tests do not exercise these offline renderer/prototype files, so no Next suite was run. Independent QA, visual approval, production integration and mobile/Safari playback remain. No new touch gestures.

## Decoded delivery evidence

Final asset size 15,263,633 bytes. `revision2-evidence/MEDIA_CHECK.json`: 192 frames at 24fps; cut-to-first MAE 0/255, final-to-first MAE 0/255, maximum difference within the two-second hold 0/255. Median active adjacent-frame MAE 0.241724/255. Title ROI first-to-peak MAE 12.64934/255 (pixel change measure, not a perceptual movement score). No source frame has been substituted at the end.

Reproduce in a new output directory (Python environment must have OpenCV and NumPy; ffmpeg on PATH):

```sh
HIW_REVIEW_DIR=/new/output python revision2.py
HIW_REVIEW_DIR=/new/output python verify_revision2.py
```

For the browser capture, `HIW_ROOT` names the archived review directory (containing REVIEW.html and REVISION_2/RENDER_FINAL); `HIW_PLAYWRIGHT_ROOT` names an installed Playwright node_modules directory. The recorder uses installed Google Chrome and must be wrapped in harness-core/scripts/test-lock.sh. No browser/runtime installation is needed.

Shared asset: [8-second video](https://buzz-wwbf.srv2056990.hstgr.cloud/media/6675c736444787015bc58e629fd6bfd8d5aca4e5019d3fc32de7f2ac0b2d8a04.mp4), 15,262,971 bytes. Metadata and H.264 SEI removed for relay acceptance; full decoded-frame MD5 is unchanged (`806875543e2a1fbe0130553442110c19`). The local SHARE copy and original candidate therefore have identical decoded pixels.

Browser recording uses the fully loaded asset as a Blob URL. Direct intercepted HTTP playback could play but could not seek reliably, so it is not used as timing evidence. Capture assertions check 0s / 2.5s / 7s stills and a 5.5s slow-playback start.

Final browser run passed: test-lock start **11:18:04**, load **60.09 / 32.29 / 25.72**; end **11:19:52**, load **19.47 / 26.84 / 24.41**, exit 0. All three modes had zero page errors and no horizontal overflow. Slow capture started at 5.5s, played at 0.25× and ended at 1.0512s after crossing the boundary. Reduced motion paused/hid the video and displayed the still. Screenshot seeks at 0 / 2.5 / 7s were verified. The final recording folder is `CAPTURE_BLOB`; earlier recordings with unsupported seeks are excluded.
