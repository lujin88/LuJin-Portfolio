# How I Work R9 — ordered loop review

Request: Buzz `28d42ecec0b23742f5129554a850646734a306a88efe16926506c5c2cb6bac59`, relaying Lu’s feedback `f38159276346b2a4856c84392979028168c5fac17fcd3e08deb6c86e9a93dc03` (2026-11-04). Preview: http://127.0.0.1:4690/index. Branch: `feat/hiw-r9-head-lift-20261104`. This directory is an isolated review copy; it is not imported by the application.

The old image exposed DECIDE from the first frame and animated the fox after it. This revision hides both caption lines initially, brightens the bulb, turns the fox toward the girl, and reveals DECIDE and its subtitle in that order. The full illustration fades out together, resets while invisible, returns to its first pose and rests before the next loop. No new state-machine inputs or states.

## Timing and interface

Each `.riv`: state machine `ReviewAutoplay`, entry into the single animation state `RespondOnce`, no transition blend. Inputs: **none** (types/allowed values/triggers not applicable). Animation: 60 fps, 720 frames, 12 seconds, looping. Event: `playback-complete` at frame 720. Historical band names are retained for compatibility: Rabbit contains bear+rabbit, Bear contains girl+bulb, Fox contains fox+crocodile and the captions/matte.

| Source time | Action |
|---|---|
| 0.00–1.00 s | Initial pose; DECIDE and subtitle hidden |
| 1.00–1.70 s | Girl raises her head and supporting hand |
| 1.90–2.30 s | Bulb brightens |
| 2.50–3.20 s | Fox turns from right toward the girl on the left |
| 3.50–3.80 s | DECIDE enters once; settles by 4.10 s |
| 4.20–4.60 s | Original subtitle appears |
| 4.60–9.00 s | Hold the completed composition |
| 9.00–9.50 s | Entire composited illustration fades out |
| 9.50–10.50 s | Hidden reset to the initial poses |
| 10.50–11.00 s | Initial composition fades back in, captions hidden |
| 11.00–12.00 s | Rest, then repeat without a visible boundary |

The three bands retain overlapping five-source-pixel mesh columns to prevent antialiased edge gaps. Editable `scene.rml`, `rive.yaml`, unchanged `original.png`, binary and file-specific README are together in each directory.

**Compositor requirement:** the whole-scene fade is applied once to `.hiw-plane` by `r6.js`, after the three canvases are composited. Applying opacity to each Rive drawable exposes covered original pixels and makes overlapping edges brighter. The controller pauses the fade and all state machines offscreen/when hidden; the Bear completion event aligns the compositor at each 12-second boundary. This is part of the review integration contract for the developer to retain when integrating. Opening a band alone shows its pose/caption timeline, without the global fade.

## Existing text and illustration

The visible subtitle is **“Human judgment in every step”**, below DECIDE, baked into the source image. The production HTML references `/assets/images/how-i-work/ai-decides.webp`; this prototype uses the retained `original.png`. Its font family cannot be recovered from CSS. The subtitle patch samples x1042–1352/y196–226 of the original 1842×854 image. DECIDE, its accents and the subtitle reuse the original pixels, colour, scale and position; no new text style or font is introduced.

The fox turn uses the original head silhouette in right/left poses, with anticipation, a two-frame pose blend at 2.783–2.817 s, and settle. Both end poses have unit absolute scale; the head is never collapsed to zero width. Source head pixels, facial features and colours are retained. Girl head and supporting hand retain the previous rigid R9 motion. Other animals retain their small reaction gestures after the bulb/fox sequence.

Reduced motion: load no Rive files and display the static SVG/image with the complete original caption. During normal loading, a separate SVG cover keeps the captions hidden before playback. The self-contained `still.svg` is the same static artwork; the full-page reduced-motion still is linked in the review PR.

These inherited review bands have transparent unused artboard areas but retain the dark raster background within the illustration. Production transparent-character separation and application integration are not delivered by this review copy.

## Rebuild and preview

Use Python with NumPy and the installed Rive CLI (built with 1.7.0). Run `rive doctor` first; do not print account details into shared logs.

```sh
python BUILD.py
python ADD_SEAM_OVERLAP.py
python SEQUENCE_LAYERS.py
rive Rabbit --once --format=json
rive Bear --once --format=json
rive Fox --once --format=json
node serve.cjs
```

`serve.cjs` serves only a local review on 127.0.0.1:4690. It reads shared assets from the repository’s `public/`; `HIW_PUBLIC_ROOT` can point to the existing canonical public directory when inspecting the Mac’s current asset set. No application server or port 3000 is started.

`SEQUENCE_LAYERS.py` compacts redundant held samples and replaces identity cubic interpolators with **explicit linear interpolation**; Rive’s default is hold, so the explicit type is essential. It then adds original-pixel caption/head layers. Re-running this last step replaces only its own layers and keys.

## Checks and scope

Review evidence: `OUTBOX/HIW_R9_SEQUENCE_20261104/FINAL_R4/` in the shared Buzz workspace; initial-state backup in `BEFORE/`, earlier inspection/recording directories are development evidence. The PR contains the final normal/4×-slow/reduced recordings, before/after stills and exact validation results. No new art generation, credits, sound or mobile gestures.

Rejected approaches: keep DECIDE burned in from the start (breaks the requested order); merely tilt the right-facing fox further (does not look at the girl); rotate the entire scene (moves fixed props); fade drawables individually (reveals masked source art); add a new font or redraw the characters (breaks the existing style).

Remaining: Lu’s visual review, QA/visual QA, developer integration and production asset separation. No merge, deployment or changes to the live 3000 workspace are included. WA hover #63 remains paused.
