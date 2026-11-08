# E.ON 05 annotation readability

PM #551/#591: the first handwritten note clips on mobile and desktop. A read-only 1440px production check measured x1259.77 + width190 = right1449.77, confirming the desktop defect predates this PR.

The translated note now occupies normal flow above the collage at every width, with reserved space before the rotated roof card. One text node replaces the positioned reveal and arrow. The note stays static while being read; the second annotation keeps its existing reveal. No text, image asset, timing or curve changes.

Rejected: z-index-only fix (still clips/overlays artwork); smaller handwriting (hurts reading); animating the relocated note merely to match the second (unnecessary motion). No new gestures.

Evidence lives only on backup branches, not in this PR final tree:
- [Latest all-width screenshots and results](https://github.com/lujin88/LuJin-Portfolio/tree/a71cdd7/motion/eon05-all-widths-20261108).
- [Initial mobile evidence](https://github.com/lujin88/LuJin-Portfolio/tree/backup/eon05-review-20261108/docs/reviews/eon05-mobile-note-20261108).

Latest checks: frozen install, tsc --noEmit, diff --check pass. Twelve browser cases: 320 EN normal; 390 EN normal/4×slow/reduce; 390 DE normal/reduce; 767 DE normal; 768 EN/DE normal; 1024 DE normal; 1440 EN normal/DE reduce. All have exactly one note, no page errors, note within viewport and no intersection with either image. Existing html min-width:360px retains page overflow at320; other widths do not overflow.

Lock14:48:00 load7.73/8.55/9.61 →14:49:29 load22.40/13.29/11.33 exit0. Raw recordings/scripts remain motion/.motion-review-20261108/eon05/verified-all-widths/. Initial mobile-only test had failed on the pre-existing320px whole-page width assertion; it was investigated and retained separately, not passed off as a successful run.

Safari/physical devices untested. No benchmark comparison. Desktop composition changes intentionally: the note is now above the collage instead of its upper-right corner. Only Lu merges design changes.
