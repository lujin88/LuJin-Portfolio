# Client Advisory Outcome — click feedback R1

Review-only 1440 × 900 fixture for Lu's screenshot in Buzz event `96fa0373234b7601cb7e08ded29b95514f836b8f12ca70271574c7c09930cdbb`. Open `scene.html` in Chrome. `scene.html?mode=before` shows the same frozen section without the proposal. The full app and port 3000 are unchanged. No paid generation, no Rive asset or runtime, no new imagery.

The live Outcome cards are articles with pointer-move / pointer-leave tilt handlers, but no click handler, role or tab stop. Source: `ca/client-advisor/components/sessions/tilt-card.tsx`, `session-07-outcome.tsx`. This is section 07, not the section 06 screenshot viewer.

The fixture extracts section 07 from the current server response and copies its existing CSS, images and fonts. It is intentionally a desktop review artifact, not a responsive implementation. It has no Next application scripts, APIs or external assets. Baseline mode reproduces the existing TiltCard pointer handlers from source; scroll reveals are held visible for both review modes. The developer should port only the accepted feedback into the real component after Lu approves; do not ship this HTML snapshot.

| Before | After | Why |
| --- | --- | --- |
| Whole-card hover tilt; click has no response | Illustration press scale .97, then lift 10px / scale 1.06 and settle; text stays fixed | Occasional click feedback without shifting readable evidence |
| No click target semantics | Transparent native button with replay label and focus outline | Discoverable pointer and keyboard target |
| Hover moves even with reduced motion | Reduced motion uses opacity and border feedback only | Remove positional motion |

## Motion specification

| Location | Today | Purpose / frequency | Proposed motion |
| --- | --- | --- | --- |
| Three Outcome illustrations | Static PNGs inside a tilting article | Feedback / occasional exploration | Pointer down scale .97; click translateY(-10px) scale(1.06), return when the 160ms painted transition completes; each transition 160ms cubic-bezier(.22,1,.36,1); no loop |
| Card edge | Static border | Feedback / same click | Existing #7cc0ff edge opacity 0 → .65 → 0, 160ms |
| Reduced motion | Existing hover still tilts | Feedback / accessibility | No transform; image opacity 1 → .82 → 1 and edge feedback |

Timing uses the 150–200ms fast range and existing curve in `docs/portfolio-consistency-guide.md`; colour is the existing `--ca-accent-soft` literal in `session-07-outcome.tsx`. `design-system/README.md`, `motion.md`, and `tokens.json` are absent in this repository. Amplitudes are this review proposal, not approved global tokens. Keyboard activation has no positional animation. Repeated clicks retarget CSS transitions. Reset uses transitionend so a busy main thread cannot expire a short timer before the first painted feedback frame. Pointer cancellation and blur reset the press state.

## Deliberately omitted

- Count-up numbers: fails function gate; these are evidence to read.
- Infinite globe rotation: fails frequency/purpose gate for click feedback.
- Whole-card tilt and moving labels: fails function gate; reading should remain stable.
- New chart drawing or globe anatomy: outside the approved original artwork.

## Validation and limits

Recordings and results are in `OUTBOX/CA_CLICK_R1_20261104/`: matched source-equivalent fixture before/after, quarter-speed and reduced-motion recordings, PNG stills, and JSON measurements. Live 3000 capture was attempted but did not produce a usable click recording (load/stability timeouts and a blank reveal frame); the baseline video is a source-equivalent reproduction, not live-page verification. Browser checks use harness-core `scripts/test-lock.sh` and system Chrome. The slow-motion recording slows CSS with CDP playbackRate .25.

Review this motion before any application integration. No production test/build claim is made for the static fixture. No mobile swipe/drag gesture is added; a responsive touch implementation and physical-device tap review remain developer follow-up after approval. File sizes and exact validation results are recorded with the delivery evidence.

The final click-synchronized frame sample passed all three cards: one click event each, maximum scale 1.06, lift 9.9996–10px, and text bounding-box shift 0px. The initial timer-based version was rejected after busy-machine sampling exposed missed feedback; it is not the delivered implementation. `VERIFY_R3.log` records the passing run (start load 61.94 / 35.62 / 20.32, end 43.32 / 33.37 / 19.95). This verifies the state change and stable text, not a frame-rate guarantee. The static review bundle is about 8.7 MB including copied source images, fonts and CSS; it is not a production payload.
