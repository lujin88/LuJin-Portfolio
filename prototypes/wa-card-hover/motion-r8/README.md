# Sun expanding line ripple — review only

Lu #1131 / PM #1134 replaces the rejected rotating-petal interpretation. Original sun bitmap, petals and shadow remain intact and stationary. A thin gold circle starts at the outside edge, expands and fades to zero, then repeats only while a mouse hovers. Pointer exit immediately cancels. Keyboard, touch and reduced motion remain still; offscreen and hidden-tab events cancel.

| Position | Before | Purpose | Frequency | Motion |
|---|---|---|---|---|
| Sun vocabulary artwork | Static bitmap | Requested playful hover feedback | Continuous only while mouse hovers, explicitly requested by Lu | Circle scale 1→1.25, opacity 0→.65→0; existing --duration-reveal 800ms and --ease |

The circle's radius/stroke/amplitude are proposed for review, not approved production values. No production integration. Label and audio controls stay fixed. No gesture requiring phone verification.

Rejected: rotating petals and hopping body (Lu rejected); moving vocabulary label (reading interference); keyboard animation (frequency); autoplay without hover (unrequested distraction); shadow movement (unnecessary for this new direction).

Capture: capture-ripple.cjs records actual browser playback with normal speed, CDP 0.25 speed, and reduced motion, plus loop/exit/keyboard/reduced checks. Evidence OUTBOX/WA_SUN_RIPPLE_20261108. Historical capture-hop.cjs and capture.cjs describe rejected variants and are not current validation. Safari/physical devices remain untested.
