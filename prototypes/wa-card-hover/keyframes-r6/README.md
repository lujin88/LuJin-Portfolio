# WA hover R6 — static selection frames

This is the current selection proposal for PR #63. It replaces the **motion direction** of R5; it does not implement hover playback. Eight still/peak pairs use native crops of the existing six-column layout at a 1440px viewport, DPR 1. Each source crop is 264 × 261px; the comparison adds labels without resizing the crops.

Request: Buzz `00aa573fcb331da69735b51d90ac38d7f17b1b505643782c0a680007defb4c94`, channel `4d529583-4dcf-4804-816e-94f63f30634b`. Lu's explicit local-motion feedback: `4884fd64e9b28a94fbe59918cd474a5491690b46009432c9fbaec7c6268a90f7`. The separate “B, more elegant” reply has an ambiguous referent in the supplied conversation; it is **not recorded here as WA amplitude approval**.

## Selection

| Frame | Still → proposed peak | Source and drawing method |
|---|---|---|
| [Church A](review/church-a-comparison.png) | Warm glass; circular quatrefoil turns 16° | Original church fixed. Translucent gold paths are confined to six existing glass openings. Original circular texture patch rotates, not the tower. Sequential lighting is a future timing proposal. |
| [Church B](review/church-b-comparison.png) | Bell leans 13°; two pairs of fine sound arcs | The source has louvers, no exposed bell. A new small vector bell is placed inside the existing opening; two pairs of quadratic curves suggest sound. No actual audio. |
| [Church C](review/church-c-comparison.png) | One dove above the roof | New small vector silhouette, one wing path, two feather tones, a gold beak and one eye. No flight trail. Orbit/return is not represented or tested by this still. |
| [01 / raincoat](review/hood-01-comparison.png) | Hood folds behind the collar | Original rear hood pixels compress vertically around the neck; the original front collar and coat remain fixed. This is a proposed folded pose, not a reconstructed cloth back surface. |
| [02 / knit hat](review/hat-02-comparison.png) | Hat rises; pompom leans 4° | The pompom belongs to the separate red hat, not the yellow coat. Original hat pixels rise 92 source pixels; pompom rotates separately. Original shadow remains below. |
| [Fish](review/fish-comparison.png) | Tail turns 16°; body rises about 1.5 CSS px | Original tail pixels pivot at the tail root with a concealed overlap. No whole-fish translation across the card or whole-body rotation. |
| [Sun](review/sun-comparison.png) | Fine rays appear around the upper and side perimeter | Twelve proposed round-ended radial strokes, clipped away from the ground area; original sun and shadow are fixed. Slow rotation is optional, not built. |
| [Rain](review/rain-comparison.png) | Five drops at different points in a fall | Original five drops isolated with individual polygon masks and translated; cloud remains fixed. No new drop artwork. Continuous hover rainfall and draining the current batch on exit are future behavior requirements. |

The SVG files have transparent backgrounds and embed the unchanged original WebP bytes. `build.cjs` holds editable masks and vector paths; `sources.json` records original hashes. `palette-samples.json` records exact source-image coordinates/RGBA samples used for new elements. Project `design-system/README.md` and `design-system/tokens.json` are absent in this checkout, so no replacement design system was created. Existing snapshot CSS supplies the review background, font and card geometry.

`hat-boundary.json` traces the last original alpha ≥240 pixel per sampled column. The builder adds a total 15-source-pixel feather allowance and limits the stationary shadow to the ground region, separating the brim without leaving a floating cut edge. This is a static decomposition aid, not a new hat silhouette.

## Motion proposal, pending selection

| Location | Purpose / frequency | Later behavior; not implemented in this round |
|---|---|---|
| Fish | Explain the living object / occasional exploration | Tail-only stroke with minimal body rise, smoothly returns on exit. |
| Sun | Explain sunlight / occasional exploration | Rays fade in/out; body and ground shadow fixed. |
| Rain | Explain rainfall / occasional exploration | Staggered drops while hovered; finish the emitted batch after exit. |
| Coat or hat | Feedback / occasional exploration | One chosen local gesture; no spring overshoot. Only pompom gets a light secondary motion. |
| Church | Feedback / occasional exploration | One selected A/B/C gesture; architecture fixed. |

All are portfolio illustration demonstrations, separate from high-frequency navigation. For the later implementation, keep the existing project `--ease: cubic-bezier(0.22, 1, 0.36, 1)` and immediate 200ms feedback envelope; full illustration cycle timing is **pending review**. Gate hover behind `(hover: hover) and (pointer: fine)`, preserve continuous exit from the current pose, and keep original stills for reduced motion. Static frames cannot validate elegance, smooth exit, loop behavior or timing. No new Rive state, input contract or binary is introduced.

Rejected candidates:

- Whole-object wobble/rotation of fish, rain and church: does not explain the requested local action.
- Automatic idle loops on all vocabulary objects: distracts from reading and audio controls.
- Moving speech controls or hit areas: interferes with function.
- New keyboard/touch hover motion: does not match the input mode.
- Changes to four character labels: outside this revision; R5 remains intact.

The strongest restrained church proposal is A, because it keeps the architecture still and uses existing windows. That is a recommendation for selection, not Lu's approval.

## Reproduce

From the repository root, run `node prototypes/wa-card-hover/keyframes-r6/build.cjs`. No installation or image-generation service is needed. Start the existing `prototypes/wa-card-hover/serve.py` on port 4687, then run `capture.cjs` through harness-core `scripts/test-lock.sh`, with `TEST_LOCK_CHANNEL` set to the project channel. The capture script accepts `PLAYWRIGHT_PATH` and `REVIEW_OUT`, uses installed Google Chrome, and creates no video.

Capture injects one SVG inline at a time so raised artwork can extend above its original image box. The unchanged native image supplies the raincoat's lower body, the sun's ground shadow and the rain cloud; complementary crops supply the proposed local changes. This preserves the existing raster rendering of fixed regions. The source grid allows some tall images to exceed its nominal 165px track, so actual image bounds are measured rather than assumed. Displaying the SVG directly inside an external `<img>` may clip the lifted pompom; use the supplied comparison PNGs for review.

Only this directory is the new R6 deliverable. The existing `scene.html` still demonstrates the historical R5 animation and is not a preview of the new requested behavior. Review files are isolated from the application; port 3000 is unchanged.

## Static validation

Final native captures: eight cases, no page errors, identical card bounds and whole label/button-row PNGs. Comparing fixed areas in the full native crops gives max RGB difference **1/255** for coat lower body, sun ground shadow and rain cloud; these regions are stationary, but not claimed bit-identical across rendering paths. See `pixel-checks.json`. Original WebP bytes match the previous PR head. All eight SVGs parse; both Node scripts pass syntax checks; frozen offline pnpm install and `git diff --check` pass. No application code or dependencies changed, and no runtime animation validation is claimed.

Final capture test-lock: **15:46:48 load 20.91/13.60/19.51 → 15:47:16 load 15.87/13.09/19.12, exit 0**. The capture waited 40 seconds for the shared browser lock. Rejected intermediate captures are retained outside the repository; only `review/` is the selected delivery.

Remaining: Lu chooses church A/B/C and clothing direction; confirm whether “B, elegant” referred to E.ON; then agree the developer contract and build/record the selected motion. QA, visual acceptance, integration and real-device checks remain.
