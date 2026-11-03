# Approved E.ON and dolphin card motion

Review only. Open `http://localhost:4658/REVIEW.html` for both cards at 448 CSS pixels wide. The local LaunchAgent `com.buzz.approved-cards-preview-4658` serves this directory on loopback and restarts the server if it exits. On another machine, use `python3 -m http.server 4658 --bind 127.0.0.1` from this directory. Individual scenes remain at `PREVIEW.html?scene=solar` and `PREVIEW.html?scene=dolphin`.

The production page and port 3000 are outside this change. PR 55 remains review-only and must not be merged without Lu's approval.

Approval: Buzz `0e26f3f11cd7cbeb5d6d707e3840e2a73298a6988a62673001fa0f55daa575c9`.
Revision assignment: `a8444079943298951f37da4881e56ec62a837f029db34fba53eb81a8d184f60c`, channel `4d529583-4dcf-4804-816e-94f63f30634b`.
The four input PNGs remain byte-for-byte copies of Lu's approved stills. See `SOURCE_CHECKS.json`.

| Asset | Motion | Timing | Export size |
| --- | --- | --- | --- |
| E.ON | Broad refraction and neutral brightness waves in the foreground pool's warm window reflection; secondary bands on the right lake. Sky, panels, architecture and window light stay fixed. | 6 s continuous motion, 2 s original-frame hold, hard restart | 864 × 540 master and native 448 × 280 review |
| Dolphin | Chinese happy, French surprised, German wink; lower mouth deformation within each approved pose, then Chinese again | 3 s per language; 1 s return/settle; hold 10–12 s; hard restart | 864 × 600 |

Revision 3 addresses the two visibility returns by making the foreground window reflection the main action. A four-edge water mask holds the stone rim fixed while the reflection bends sideways, stretches vertically and brightens/darkens in travelling waves. The 120 ms edge ramps replace the previous six-second sine envelope, so movement continues throughout the active interval. Secondary lake bands remain above the reeds. This changes reflected light locally, not the approved image's overall grade. The dolphin shader and exports remain at revision 2: poses cut directly at 3, 6 and 9 seconds; nose, upper lip, device, labels and base stay fixed within each pose.

`motion.js` is the editable source. This is a raster card preview, not a Rive state-machine delivery; it introduces no application inputs. Rive doctor passed, but these photographic review clips have no .riv file. The approved photographic backgrounds are preserved.

Review controls: `review.setTime(seconds)`, `review.play(rate=1)`, `review.pause()`, `review.state()`. `?capture` starts paused. Changing `prefers-reduced-motion` resets to the initial still. Offscreen and hidden-document time does not advance. Supplied `*_REDUCED.png` files are the still alternatives.

## Encoding and review evidence

Current E.ON deliverables: `OUTBOX/APPROVED_CARDS_MOTION_20261103/REVISION_3/DELIVERY/`. Dolphin deliverables remain in `REVISION_2/DELIVERY/`. Earlier attempts are retained. Revision 3 assignment: Buzz `6ce4744ab206ea61606052adc28dd4a6f996f1825d1ce622e487190d7caccc61`.

Native 448×280 visibility: all 192 source frames compared with frame 0 using the maximum RGB-channel difference per pixel, selecting the peak by count >8/255. Peak is frame 53 (2.2083 s): 2,538 pixels >8 (2.023%), 1,064 pixels >24 (0.848%), 422 pixels >48. Revision 2 QA measured 373 pixels >24 (0.297%); the new count is 2.85 times that. All 143 active adjacent-frame pairs change; all 48 hold frames equal the original. `visibility.cjs` reproduces the figures and a 896×280 comparison with two unscaled 448px cards. Visual approval remains with QA/Lu.

- `*_NORMAL.mp4`: one cycle of actual Chrome canvas frames sampled at 24 fps.
- `*_TWO_LOOPS_UPLOAD.mp4`: two cycles, with ancillary metadata removed for channel upload.
- `*_SLOW.mp4`: the same encoded frames at quarter speed, remuxed without colour conversion.
- `*_REDUCED.mp4` and PNG: original still with motion disabled.
- `*_FIRST_LAST.png`: first frame on the left, last on the right.
- `solar448_FIRST_PEAK.png`: original left, strongest frame right, each at native 448px.
- `VISIBILITY.json`, `CHECKS.json`, `ENCODE_CHECKS.json`, `BROWSER_COLOR.json`, `SMOKE.json` and logs: source-frame, encoded-frame, browser-colour and runtime checks. Current compact copies are in `review-r3/`; earlier reports remain in `review-r2/` and the root.

RGB source frames are explicitly converted to limited-range BT.709 YUV and tagged with sRGB transfer (`iec61966-2-1`). Both SPS and MP4 `colr` must read primaries 1 / transfer 13 / matrix 1 / range tv. Scene-cut keyframes are disabled; keyframes occur at frame 0 and hold start (144 for E.ON, 240 for dolphin). Source hold frames are identical; lossy MP4 hold differences are measured separately and must not be described as pixel-identical.

Reproduce from a fresh output directory with `node record.cjs /absolute/output/path`, then `node smoke.cjs /absolute/output/path`, each under harness-core's `scripts/test-lock.sh`. Set `PLAYWRIGHT_MODULE` and `SHARP_MODULE` when modules are outside normal Node resolution. Installed Chrome and `/opt/homebrew/bin/ffmpeg` are required. Pack, encoding audit and browser-colour scripts are supplied alongside the exports.

## Motion decisions and limits

Purpose: a visible environmental cue for occasional portfolio viewing, and a demonstration of the dolphin's three language modes. The requested 8/12 s cycles and final 2 s hold are preserved.

Rejected: camera zoom (distracts from the artwork), animated panel geometry (changes the fixed product), moving language glyphs (hurts reading), whole-image exposure pulsing (changes the approved grade), and loop crossfade (prohibited by the brief).

Visual acceptance belongs to QA and Lu. Automated browser WebKit is not a real iPhone/Safari test. No touch gestures are involved. Production video integration is not included. The renderer requires WebGL; the developer can integrate the video/still artifacts after approval.
