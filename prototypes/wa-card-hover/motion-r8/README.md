# Sun halo proposal — replaces rejected hop and rays

Lu #813 / PM #816: sun body stays fixed, original outer halo turns a small arc once, ground shadow moves subtly. This prototype interprets halo as the existing eight petal-like rays; it adds no ray strokes. SVG masks slice the original transparent artwork into core, halo and shadow without editing the source file. The core stays fixed. Halo rotates22.5° and returns; shadow shifts8 source pixels, scales to.97 and opacity.8 then restores. Amplitudes await Lu.

Duration uses existing --duration-reveal800ms and --ease; no new timing token. Hover once; no repeat while held. Keyboard/touch/reduced motion remain still. Offscreen/hidden/reduced change cancels. Original poster restored at end. Label/audio control never moves. This is review only, not production wiring.

Denied: jumping (Lu rejected), extra rays (Lu rejected), whole-image rotation (moves core/shadow), continuous loops (frequency), keyboard-triggered decoration (role constraint).

Evidence OUTBOX/WA_SUN_HALO_20261108: normal/slow4/reduce GIF, checks.json. capture-hop.cjs now samples the halo implementation's WAAPI at20fps, deterministic timing previews rather than realtime performance recordings. Historical capture.cjs is obsolete A/B rays. Realtime recordings and independent visual review needed before production. Mask seam and shadow/petal overlap require visual inspection; original image is preserved. Safari and physical devices not tested.
