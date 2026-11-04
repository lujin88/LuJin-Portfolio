# CA 05 hover amplitude review

Open `scene.html` in desktop Chrome. This isolated motion study uses existing pixel cutouts from Lu's reference image, with fixed 448 × 373.33 cards at a 1440px viewport. Choose A or B, then hover cards 01, 02, 03. It does not integrate into the portfolio app or implement card flipping.

Source: Buzz request `98ab875b792cc6e9c3b229bef78e05c089b676464ee6b3c830ae12a876462781`; reviewed stills `6b93d11250881036e2d55eea50e35da7dbc7a1a5ac2b598130c5f138065ba8e2`; local source `OUTBOX/CA_CARD_HOVER_KEYFRAMES_20261104/PIXEL_A_R1/`. All PNG files are copied unchanged. Background repairs in those supplied assets approximate occluded pixels; they are review materials, not production layered illustrations.

| Movement at 448px card width | A medium | B large |
|---|---|---|
| Chart circle translation | +12x / −42y px | +16x / −56y px |
| Circle scale | 1.30 | 1.40 |
| Explanation panel translation | −48x / −6y px | −64x / −8y px |
| Each action button translation | −42x px | −56x px |
| Light point travel x | +98px | +112px |

Translations and scale increments are 1.5× / 2× the earlier peak proposals, except light travel, which is capped within the original arc/card boundary. Buttons reach the same final x, staggered by 80ms; this avoids implying a preferred action. This prototype holds at the larger position until pointer exit rather than falling back halfway as the still-frame proposal did.

Timing: 520ms entry, `cubic-bezier(.16,1,.3,1)`, taken from the current CA05 artwork hover CSS. Button delays are proposed 0/80/160ms (animate skill's 30–80ms stagger range); exit is proposed 260ms (half entry). These are review proposals, not approved project motion tokens; the checkout has no `design-system/README.md` or motion token file. Light movement samples the original arc fit into transform-only WAAPI frames. Exit and reentry retarget from the current transform. No looping or full-image zoom.

Reduced motion: use each unchanged `CARD_0n_ORIGINAL_NATIVE.png`, hide all moving layers, cancel light animation immediately, no scaling or displacement. Touch/coarse pointers use the same originals; keyboard controls only select A/B without triggering card movement. No phone gestures to review in this motion-only prototype; production card flip remains the developer's existing responsibility.

Purpose and gates: infrequent portfolio illustration/explanation; movement illustrates surfacing, context, and available actions. Titles, numbers, borders remain fixed. Reject automatic looping (frequency/readability), hover flipping (function), title motion (reading stability), and highlighting a preferred action (semantic implication).

Capture files and verification are in `OUTBOX/CA05_HOVER_AB_20261104/`: one recording each for normal A→B, 4× slow A→B, and reduced A→B. These are recordings of this isolated prototype, not the current 3000 site. No Rive export is included: the task requests browser hover previews; editable sources are `scene.html`, `motion.css`, and `motion.js`. A Rive state-machine contract has not been agreed for production.
