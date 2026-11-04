# WA hover R7 — selected local motions

Review URL: `http://127.0.0.1:4687/motion-r7/scene.html` after starting the parent `serve.py`. This is an isolated, editable SVG/WAAPI prototype for the six vocabulary cards. It is not imported by the site. The four existing character clips and their R5 label rules remain unchanged; no character `.riv`, state machine or developer input contract is added in this round.

Approval source: Lu selected church C and approved the remaining R6 images at 16:51; PM's implementation request is Buzz event `a5754cec5f2bff10388b8aa839c34310cde903ce7d063d204a9c3e02baad444e`, channel `4d529583-4dcf-4804-816e-94f63f30634b`. Both clothes cards are included. MAN was separately paused by event `6dc4915521e5f70f1c69a051b3d613f6f25c604189cff633dabad4cc1ca55a01`.

## Behavior and timing

These illustration timings are review choices for this requested animation pass, not previously approved design-system constants. Entry/exit use the existing snapshot `--ease: cubic-bezier(.22,1,.36,1)`. Repeating tail strokes, the closed flight and feather motion use ease-in-out to avoid discontinuous direction changes; falling drops use linear descent. No spring or overshoot is used. Only the pompom has a settling wobble.

| Card | R6 still proposal → R7 behavior | Enter / hold / exit |
|---|---|---|
| Perch | Original tail pivots at its root; body rises 12 source pixels (about 1.5 CSS px). No horizontal whole-fish motion. | Body rises in 550ms; tail repeats a 1800ms stroke through +16° and −10°; 400ms return from current pose. |
| Church C | Approved new vector dove flies from a perch beside the cross, past the R6 pose, around a small loop and back. Church remains a native fixed image. | One 2800ms closed flight per hover, five 560ms feather strokes. Holds at the starting perch if still hovered. Early leave lets the flight land before a 200ms fade. |
| Sun | Approved twelve rounded rays appear; original sun and shadow remain native and fixed. | 700ms fade to 0.76 opacity; hold; 400ms fade out. No rotation. |
| Rain | Original five isolated drops descend under the fixed native cloud. | A batch repeats while hovered: 1050–1390ms descent plus 0–360ms stagger. Leaving stops future batches; all five already scheduled drops finish, then original still returns. Re-entry during drain resumes at the next batch without restarting the current one. |
| Coat | Original rear hood folds behind the fixed front collar. Lower coat remains native. | 650ms fold to R6's vertical scale 0.26 and y326; hold; 400ms return. |
| Hat | Original hat rises 92 source pixels, shadow stays below. Pompom rotates separately. | 650ms lift; 1150ms light −4° / +2° / −1° / 0° settling; hold; 400ms return. |

The dove's starting and landing matrix is `matrix(1.25, 0, 0, 1.25, 953, 204)` in source coordinates. The loop is closed in position, rotation and scale. A new hover during a return retargets the current pose; rain keeps its emitted batch. Hidden tab / offscreen artwork cancels animation. Hover requires a fine mouse pointer. Keyboard focus and touch keep the original vocabulary stills. Live reduced-motion preference immediately cancels all vocabulary animation and restores the original stills.

All six original `../assets/vocab-*.webp` files are the transparent reduced-motion stills. Source masks, unchanged embedded raster bytes and vector paths are in `../keyframes-r6/*-peak.svg` and `build.cjs`; R7 adds behavior in `motion.js`. Inline IDs are namespaced per card. The sun and church retain native originals; complementary native/SVG cuts protect the cloud and lower coat. Speech controls, labels and hit areas are stationary.

## Decisions

Frequency: occasional exploration of a portfolio demonstration. Purpose: show the object-specific action Lu requested and provide hover feedback. These motions do not gate reading or audio playback. Fish, rain and clothing replace the matching still layers immediately; sun/dove have a 200ms visibility envelope while the longer illustration gesture continues.

Rejected:

- Church A/B: Lu chose C; outside the selected scope.
- Whole-fish translation, whole-church bounce and rotating sun shadow: fail the requested local action and spatial consistency.
- Automatic loops on every card: distract from reading; only the hovered fish/rain repeat.
- Moving labels/audio buttons: interferes with function.
- Extra keyboard/touch motion or new character states: outside this revision and unnecessary for that input mode.

No watermark or image-generation service is involved. `rive doctor` passed before this session's motion work; no Rive build was needed for these SVG vocabulary illustrations. Project `design-system/README.md`, `tokens.json`, and `motion.md` are absent in this worktree. R7 preserves the existing snapshot curve and the R6 source-sampled colors rather than creating new design-system files.

## Verification

Run `capture.cjs` through harness-core `scripts/test-lock.sh`, with `TEST_LOCK_CHANNEL` and a fresh `REVIEW_OUT` path. Uses installed Google Chrome and an existing `playwright-core`; no browser download. `REVIEW_MODES=CHECK,NORMAL,SLOW,REDUCED,TOUCH` selects modes. CHECK covers every gesture, original still restoration, unchanged card/label bounds and a maximum 1/255 raster-rounding difference in label/still pixels, rapid exit/re-entry, live reduced motion, keyboard stills and the retained R5 label behavior. Screenshot checks run separately from movies so browser clipping cannot enter the screencast. Normal/slow/reduced movies record the actual page at 1440×900; slow uses CDP playbackRate 0.25. Raw timestamped JPEG frames are stored on the external SSD and encoded at their recorded time intervals. Videos are not committed to Git.

This prototype has no test/package dependency changes; the repository package defines no test script. The relevant full prototype check is the matrix above.

Remaining: Lu's timing/visual review, independent QA and visual acceptance, developer integration, and Safari/real-device checks. No deployment or port 3000 change. No new mobile gesture is introduced. After integration, a real phone check should tap vocabulary/audio controls and confirm that no hover motion becomes stuck.

## Final R7 evidence

[1440 normal, 37.13s](https://buzz-wwbf.srv2056990.hstgr.cloud/media/edc6dbd978ac1e3b7ef5821d479ca8308961ccb5473cd8a9756bb88ce910b833.mp4) · [4× slow, 139.57s](https://buzz-wwbf.srv2056990.hstgr.cloud/media/cbb6ae7c85ae3b5cd4b0b8db87a0afda8619f5906b37bb4a2de0deb6ddf377ba.mp4) · [reduced motion, 40.43s](https://buzz-wwbf.srv2056990.hstgr.cloud/media/78d8f62429606fb1afb3407ad2cc91aac9755bf86bffc6f9c82df4c10647a662.mp4)

The normal video runs through all six cards: enter, hold, leave, return. All movies are 1440×900 / 30fps output, encoded from timestamped Chrome frames; no claim of 30 unique rendered frames each second. Final cleaned files are 807,122 / 2,613,818 / 666,253 bytes respectively, all fully decoded without reported ffmpeg errors. Videos have no watermark. Relay metadata validation accepted the cleaned exports.

**Passed:** desktop CHECK (including rapid exit/re-entry, live reduced motion, keyboard stills and R5 label preservation), NORMAL, SLOW and REDUCED. The dove returned to the exact starting matrix in normal and slow captures. Rain stopped future batches after leave, drained the active batch and returned to idle. Card/label bounds stayed identical. All six rest crops have max RGB difference ≤1/255; five are exactly equal, the rain crop has 32 changed channels at 1/255. Label crops are equal except one coat-label channel at 1/255. Six raster source hashes match R6.

**Not passed:** supplementary 390 touch capture. A recorder status-text update changed header wrapping and shifted measured viewport y by 18px. The recorder now leaves that header unchanged in TOUCH, but that harness-only fix is not rerun: internal disk fell to 758 MiB and further browser work stopped under the existing freeze. Do not treat touch/mobile Safari as verified.

The overall final test-lock group therefore exited **1**, after its four desktop modes passed: **18:04:06 load 8.51/11.31/8.00 →18:09:52 load 9.01/10.07/8.61**. See `validation/RESULTS.json`, video checks and the source manifest. Earlier failed captures are retained outside Git and are not delivery videos. The three runtime sources exactly match the recorded hashes; only the recorder's touch-header diagnostic changed after capture.

Frozen offline pnpm install, JS syntax checks and whitespace checks passed. Evidence was captured on parent `fab4981` with these uncommitted prototype runtime changes; the manifest identifies the exact content. Independent QA, visual acceptance, mobile checks and integration remain.
