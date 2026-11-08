# R9 caption continuity

Follow-up to prototype PR #68, applied to main after #75. The deployed Fox Rive binary differs from the prototype, so the old binary is not copied into production.

| Location | Before | Purpose | Frequency | Change |
|---|---|---|---|---|
| DECIDE and Human judgment caption | Hidden during the first ~2.8 seconds of each loop | Keep readable text continuously available | Entire section visit | Static original-pixel canvas above the three existing Rive layers; no animation |
| Loading still | Caption covered until Rive appears | Avoid a blank caption before/after loading | Initial load / fallback | Disable the old loading cover, including non-reduced motion |

The caption uses the existing original.png region x=1035,y=126,w=325,h=102 at the original 1842×854 coordinate system. It is drawn once and follows the same responsive plane and edge mask as the artwork. The region contains only the original caption and background. It covers the animated caption beneath it. Rive assets, timing and character movement are unchanged. The caption canvas is removed with the rest of the plane on cleanup. If image decoding fails, the visible still remains the fallback. Reduced motion still loads no Rive and displays the original caption.

Rejected alternatives: replace the current Rive with #68's older binary (changes unrelated character motion); shift the shared playback phase (changes all three characters); animate reading text again (does not fix continuity); alter the visible wording/font (unnecessary design change).

No gestures to verify on phone. Safari and physical devices not tested. Browser recordings and measurements are in OUTBOX/R9_PRODUCTION_FIX_20261108; independent QA and Visual QA required before Lu merges.

## Section boundary (#1327 screenshot)

Lu's screenshot shows the hard horizontal edge from the black case section to the navy How I Work section. A static background gradient now bridges the existing colors over clamp(48px,12vw,160px), within the section's existing space. No scroll or time-based animation is added; layout dimensions, artwork and reduced-motion behavior do not change. Case-image transforms and accordion transitions are outside this screenshot's scope and are left untouched.
