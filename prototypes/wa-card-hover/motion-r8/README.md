# WA sun — one small hop, no added rays

Replaces A/B rays rejected by Lu (#637), assigned by PM #640. Review only; no production integration or generation call. Open motion-r8/scene.html through the parent prototype static server. Query A/B no longer changes behavior.

Plan: occasional portfolio hover feedback; the original sun illustration translates up6px then returns once over the existing --duration-interaction320ms and --ease cubic-bezier(.22,1,.36,1). Its baked-in shadow travels with this intact illustration: this is a deliberately small first prototype, not a separately rigged sun/shadow. No extra ray strokes or scale. Text, audio control and card layout stay fixed.

Mouse hover only. Staying hovered never repeats. Leaving lets the short hop finish instead of snapping. Re-entry cancels any previous animation so animations do not stack. Reduced motion, touch, keyboard, offscreen and hidden document stay/static reset. Existing artwork/other prototype pages unchanged. No new gestures.

Rejected: new ray strokes (Lu rejected), infinite bounce (frequency), moving labels/audio button (function), scaling whole card (does not match requested object movement).6px is a review amplitude awaiting Lu; timing/curve reuse existing tokens. Normal/4×slow/reduce evidence stays outside main. Independent visual approval still needed; Safari/physical devices not tested.

Verification: capture-hop.cjs creates small normal/4×slow/reduced GIFs by sampling the actual paused WAAPI animation at 20 fps. They are deterministic timing previews, not realtime performance recordings. Historical capture.cjs belongs to rejected A/B rays and is not a test of this version.
