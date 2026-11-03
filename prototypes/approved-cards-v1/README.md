# Approved E.ON and dolphin card motion

Review only. Serve this directory with `python3 -m http.server 4658 --bind 127.0.0.1` and open `http://localhost:4658/PREVIEW.html?scene=solar` or `?scene=dolphin`.
The production page and port 3000 are not changed by this directory.

Approval: Buzz `0e26f3f11cd7cbeb5d6d707e3840e2a73298a6988a62673001fa0f55daa575c9`.
Assignment: `216d3c50f3dda252bd64896bd6c1bc633f1902d9ca967d5d7cefdd3d166173d8`, channel `4d529583-4dcf-4804-816e-94f63f30634b`.
Four input PNGs are the approved stills from `OUTBOX/INDEX_SOLAR_DOLPHIN_KEYFRAMES_20261103/`, byte-for-byte copies of the metadata-free SHARE files.

| Asset | Motion | Timing | Review size |
| --- | --- | --- | --- |
| E.ON | Local texture displacement inside the pool reflection and distant lake; architecture, sky and panels fixed | 6 s motion, 2 s original-frame hold, hard restart; 8 s total | 864 × 540, same 16:10 crop as the site image |
| Dolphin | Chinese happy, French surprised, German wink; local mouth deformation inside each approved pose, then Chinese pose again | Each language 3 s; 1 s return/settle; original frame held 10–12 s; hard restart | 432 × 300, half of the site's 864 × 600 image dimensions |

The three dolphin poses switch directly at 3, 6 and 9 seconds. No crossfade and no generated in-between fin movement are used. Mouth motion reuses approved texture; the speech bubbles and language glyphs are not redrawn. These are silent illustrative speech beats, not audio lip sync.

`motion.js` is the editable source. This is a raster card preview, not a Rive state-machine delivery. There are no invented application input names or production wiring. No .riv is included. Rive doctor passed before this work; no Rive build was requested for these photographic review clips.

Automation API (review harness only): `review.setTime(seconds)`, `review.play(rate=1)`, `review.pause()`, `review.state()`. `?capture` starts paused. `prefers-reduced-motion: reduce` renders the initial image; changing the preference resets it immediately. Offscreen and hidden-document time does not advance.

## Motion decisions

This is occasional portfolio viewing: E.ON provides a small environmental cue; dolphin explains the three language modes. The 8/12 s editorial timing is a review choice, not a new design-system token. The requested 2 s hold and hard cut are preserved.

Rejected: camera zoom (distracts from the artwork), animated solar-panel geometry (misrepresents the fixed product), moving language glyphs (hurts reading), full-image brightness pulsing (changes the approved colour treatment), loop crossfade (explicitly prohibited).

## Validation and evidence

`OUTBOX/APPROVED_CARDS_MOTION_20261103/FINAL/` contains card-size normal-speed, 4× slow and reduced-motion browser-frame exports; first/last comparisons; source checks; and recording script/log. The first real-time recording attempt lost its browser under heavy machine load and is not delivery evidence. Final exports capture Chrome's actual canvas at fixed 24 fps and encode with two threads; slow versions are the same frames at one-quarter speed. `CHECKS.json` checks exact decoded canvas equality at hold start, all 48 final hold frames, last frame and restart, plus static reduced motion and actual motion during the active period.

To reproduce, set `PLAYWRIGHT_MODULE` and `SHARP_MODULE` if those modules are outside normal Node resolution, then run `node record.cjs /absolute/path/to/new-output-directory` through the harness browser-test lock. It requires installed Google Chrome and `/opt/homebrew/bin/ffmpeg`. The output directory must not contain previous exports.

Review remains with QA and Lu. No mobile gestures are present. Real iOS Safari was not tested. The preview requires WebGL; production delivery can use the encoded clips and supplied stills instead, subject to the developer's integration work.

The normal MP4s are 240,471 bytes (E.ON) and 211,155 bytes (dolphin), with 192 and 288 frames respectively. PNG/canvas first/last differences are exactly zero. Lossy MP4 decode has first/last mean absolute RGB differences of 0.135 and 1.192 on the 0–255 scale (PSNR 53.03 / 43.00 dB); see `ENCODE_CHECKS.json`. Do not describe the encoded MP4 frames as pixel-identical.

Final render lock: start 15:23:24, load 39.23 / 37.78 / 27.44; end 15:25:19, load 49.78 / 44.70 / 31.64, exit 0. Final HTTP smoke: start 15:26:50, load 19.79 / 36.14 / 29.65; end 15:27:14, load 16.62 / 34.12 / 29.11, exit 0. Final HTTP renderer matches the exported first/mouth/last frames exactly; paused rendering makes no draw calls, reduced-motion switching resets to the first frame, and leaving the viewport freezes playback time. The final pause/resize handling was tested in that HTTP smoke after the frame export.
