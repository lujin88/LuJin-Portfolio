# HIW R10 — visible work gestures and faster sequence

Updates draft PR #71 from fc07817137efebdbea490825b802d395311ecae5. Only `prototypes/hiw-pop-b/` changes; 3000 is untouched.

- Bear: three paw taps on the existing tablet during the first arrow beat.
- Rabbit: two hand/paper-edge lifts during the next beat. This is a stylized lift, not a newly drawn full page turn.
- Fox: two 12.6-degree nods toward its laptop, replacing the inherited turn toward the human.
- DECIDE first visible frame: 211 → 137 at 60 fps, 3.517 → 2.283 seconds (35.07% shorter).
- Total loop: 320 frames / 5.333 seconds. Frames 200–320 hold the final pose, then hard restart.
- Existing arrow-background and combined gradient-mask fixes are retained.

The original artwork is reused. Local vertex weights taper before the table edge and foreground laptop. Normal-speed playback is the review artifact; pose PNGs use scrub only for silhouette inspection, not timing evidence.

## Validation

All three Rive files compiled with zero errors and warnings. Frozen pnpm install passed. Structural checks found no changing numeric properties during the final 120 frames.

1440 and 390 browser checks: five mid-play reduced-motion round trips at each width, frozen clock while reduced, resumes afterward, zero page errors. Direct canvas snapshots were byte-identical within the hold: 1440 at 3.516–4.283s and 390 at 3.500–4.267s.

An initial locator-screenshot hold comparison failed (`end hold pixels changed`); it did not capture the actual sample times. Replaced with immediate canvas reads recording the phase, which passed. The failed run is not counted as passing.

Final recording modes: 1440 normal, 0.25× slow, reduced motion at load, and 390. See CHECKS.json for runtime errors and video clipping offsets, VERIFY.json for hold/reduced checks, TIMING.json for source timing, SHA256.json for exact assets.

No independent QA or Lu approval claimed for R10. No Safari or physical-device verification. Previous QA approval applies only to fc078171, not these new gestures.

Final capture: test-lock 20:45:08–20:46:29, load 4.31/4.83/4.65 → 4.39/4.78/4.64, exit 0. Video encoder startup timestamps differ from wall time; NORMAL is trimmed at video time 2.05s for 10.6s, verified against the visible caption reset. SLOW uses its final 22s of playback and REDUCED its final static segment. CHECKS clipStart is diagnostic wall timing, not the final export cut.
