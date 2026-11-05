# How I Work — B motion proposal

Review-only prototype. Nothing under the site's `app/` or `public/` is changed.
The requested sequence is pictures and arrows popping in, DECIDE popping in,
then the original subtitle lettering revealing character by character. The
5.333-second loop holds its final pose for about two seconds before restarting.
Timing and amplitudes remain a proposal pending Lu's review.

## Preview

```sh
node prototypes/hiw-pop-b/SERVE.cjs
```

Open http://127.0.0.1:4777/review for the standalone section. The server binds
only to loopback. Set `PORT` to choose another preview port.

For the full local homepage used for the baseline comparison, supply the
public directory from the local site snapshot:

```sh
PUBLIC_DIR=/path/to/portfolio/public node prototypes/hiw-pop-b/SERVE.cjs
```

Then open `/index`. `integration.html` is the November 5 homepage snapshot;
its other sections need that snapshot's public assets. `/review` uses only the
section, the checked-in Rive runtime, and the checked-in still and animations.
The full-page snapshot is evidence scaffolding, not a proposed homepage replacement.

## Source and rebuild

`Bear`, `Rabbit`, and `Fox` contain editable `scene.rml`, image assets, and
compiled `.riv` files. `inputs/*.rml.gz` preserve the unmodified source scenes
used by `BUILD.py`, compressed to avoid another copy of the large mesh XML.
They come from the preceding local R9 proposal. The generator keeps the original image assets and adds the pop sequence.
R10 compresses the active sequence to 65% of its previous duration: DECIDE
first appears at frame 137 (2.283 seconds), previously frame 211 (3.517 seconds).
Localized mesh gestures tap the bear paw and lift the rabbit hand/paper edge;
the existing right-facing fox head nods toward its laptop. These are stylized
work gestures, not newly drawn hand or page-turn poses. The final 120 frames
are static before the hard loop.

```sh
python3 prototypes/hiw-pop-b/BUILD.py
rive prototypes/hiw-pop-b/Bear --once
rive prototypes/hiw-pop-b/Rabbit --once
rive prototypes/hiw-pop-b/Fox --once
```

Requires Python 3, ffmpeg, and the Rive CLI. The arrow's bright stroke is
extracted into textured mesh strips; its cloud backdrop remains stationary.
No replacement illustration or font is generated. The pinned canvas runtime is
2.49.4; see `vendor/README.md` for provenance and the reason for this local pin.

## Playback and accessibility

A shared clock scrubs all three layers to the same phase. Offscreen and hidden
pages pause. Reduced motion at load uses the still without loading `.riv` files.
During playback, a media-query listener and the frame driver both check the
preference; the frame driver pauses the clock before any further Rive scrub.
Turning reduced motion off resumes when the section is visible.

## Validation

Browser scripts require `PLAYWRIGHT_MODULE` pointing to an installed
`playwright-core` package, and system Chrome. Run through the workspace's
`test-lock.sh`. Full-page comparisons require `PUBLIC_DIR`.
Results and remaining limits are in `validation/`. These are implementation
checks, not independent QA or visual approval. Safari and physical devices
have not been tested.
