# Approved E.ON and dolphin card motion

Review only. Open `http://localhost:4658/REVIEW.html` for both cards at 448 CSS pixels wide. The local LaunchAgent `com.buzz.approved-cards-preview-4658` serves this directory on loopback and restarts the server if it exits. On another machine, use `python3 -m http.server 4658 --bind 127.0.0.1` from this directory. Individual scenes remain at `PREVIEW.html?scene=solar` and `PREVIEW.html?scene=dolphin`.

The production page and port 3000 are outside this change. PR 55 remains review-only and must not be merged without Lu's approval.

Approval: Buzz `0e26f3f11cd7cbeb5d6d707e3840e2a73298a6988a62673001fa0f55daa575c9`.
Revision assignment: `a8444079943298951f37da4881e56ec62a837f029db34fba53eb81a8d184f60c`, channel `4d529583-4dcf-4804-816e-94f63f30634b`.
The four input PNGs remain byte-for-byte copies of Lu's approved stills. See `SOURCE_CHECKS.json`.

| Asset | Motion | Timing | Export size |
| --- | --- | --- | --- |
| E.ON | Travelling light/dark bands confined to the right lake surface, with small pool reflection displacement. Sky, panels, architecture and window light stay fixed. | 6 s motion, 2 s original-frame hold, hard restart | 864 × 540 master and native 448 × 280 review |
| Dolphin | Chinese happy, French surprised, German wink; lower mouth deformation within each approved pose, then Chinese again | 3 s per language; 1 s return/settle; hold 10–12 s; hard restart | 864 × 600 |

Revision 2 moves the main action from the pool to the lake. The lake mask ends above the foreground reeds; the effect uses paired neutral light/dark bands rather than changing the overall colour grade. The three dolphin poses still cut directly at 3, 6 and 9 seconds. The nose, upper lip, device, labels and base do not animate within a pose. No continuous fin tween, crossfade or audio lip sync is added.

`motion.js` is the editable source. This is a raster card preview, not a Rive state-machine delivery; it introduces no application inputs. Rive doctor passed, but these photographic review clips have no .riv file. The approved photographic backgrounds are preserved.

Review controls: `review.setTime(seconds)`, `review.play(rate=1)`, `review.pause()`, `review.state()`. `?capture` starts paused. Changing `prefers-reduced-motion` resets to the initial still. Offscreen and hidden-document time does not advance. Supplied `*_REDUCED.png` files are the still alternatives.

## Encoding and review evidence

Revision 2 deliverables: `OUTBOX/APPROVED_CARDS_MOTION_20261103/REVISION_2/DELIVERY/`. Earlier attempts and the first delivery are retained in their original folders and are not the revised handoff.

- `*_NORMAL.mp4`: one cycle of actual Chrome canvas frames sampled at 24 fps.
- `*_TWO_LOOPS_UPLOAD.mp4`: two cycles, with ancillary metadata removed for channel upload.
- `*_SLOW.mp4`: the same encoded frames at quarter speed, remuxed without colour conversion.
- `*_REDUCED.mp4` and PNG: original still with motion disabled.
- `*_FIRST_LAST.png`: first frame on the left, last on the right.
- `solar448_ACTIVE_REGIONS.png`: lake and pool marked on a native 448px card.
- `CHECKS.json`, `ENCODE_CHECKS.json`, `BROWSER_COLOR.json`, `SMOKE.json` and logs: source-frame, encoded-frame, browser-colour and runtime checks. Current copies are in `review-r2/`; root-level JSON reports describe the previous revision.

RGB source frames are explicitly converted to limited-range BT.709 YUV and tagged with sRGB transfer (`iec61966-2-1`). Both SPS and MP4 `colr` must read primaries 1 / transfer 13 / matrix 1 / range tv. Scene-cut keyframes are disabled; keyframes occur at frame 0 and hold start (144 for E.ON, 240 for dolphin). Source hold frames are identical; lossy MP4 hold differences are measured separately and must not be described as pixel-identical.

Reproduce from a fresh output directory with `node record.cjs /absolute/output/path`, then `node smoke.cjs /absolute/output/path`, each under harness-core's `scripts/test-lock.sh`. Set `PLAYWRIGHT_MODULE` and `SHARP_MODULE` when modules are outside normal Node resolution. Installed Chrome and `/opt/homebrew/bin/ffmpeg` are required. Pack, encoding audit and browser-colour scripts are supplied alongside the exports.

## Motion decisions and limits

Purpose: a visible environmental cue for occasional portfolio viewing, and a demonstration of the dolphin's three language modes. The requested 8/12 s cycles and final 2 s hold are preserved.

Rejected: camera zoom (distracts from the artwork), animated panel geometry (changes the fixed product), moving language glyphs (hurts reading), whole-image exposure pulsing (changes the approved grade), and loop crossfade (prohibited by the brief).

Visual acceptance belongs to QA and Lu. Automated browser WebKit is not a real iPhone/Safari test. No touch gestures are involved. Production video integration is not included. The renderer requires WebGL; the developer can integrate the video/still artifacts after approval.
