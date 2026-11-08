# E.ON 04 integrated journey

PM requests #136/#172, annotation fixes #296/#343. Source and review tools are preserved on local branch `archive/eon-review-tools-20261108` at b8284f5; prototype/capture tools are excluded from the final application diff. The original files also remain untracked in the motion-owned eon-sequence worktree.

| Location | Before | Purpose | Frequency | Motion |
|---|---|---|---|---|
| Six-node rail | Five falling dots | Explain journey without falling particles | Once | Preserved no-drops transform/opacity sequence: 3450ms lead; 1000ms survivor; existing curves |
| Handwritten annotation | Normal-mode prefix can remain transparent | Keep completed explanation readable | Once | Existing 1ms stepped character reveals/delays; base opacity 1 after start; backwards fill only |
| Mobile mint circle | 280px circle overlaps note | Keep handwritten explanation readable | Always | Static: below 768px use 96px circle, top 16px/right -64px; desktop unchanged |
| Reduced motion | Animated sequence | Preserve complete final content | Always | No running animation; Calculate transform none |

Accessibility: the annotation contains the full translated text in one sr-only span. Decorative character spans remain aria-hidden. The paragraph is not named via aria-label.

Rejected: falling dots (PM removal); new loops (frequency); moving figures (readability); keyboard-triggered replay (frequency).

Evidence: motion/.motion-review-20261108/eon-note-fix/ contains 1440/390 normal/slow4/reduce recordings and character-opacity results for b8284f5. All 78 English characters were visible. Current semantic-only correction does not alter visible character styling. Production 390 note has its prefix intact. Mobile circle comparison: live.png versus 390-normal.png in the same directory. Those are section 04, not the separate section 06 fix.

Tests: frozen install, TypeScript and diff check; focused accessibility-tree check for the full sentence after this correction. No Safari/real-device claim. Later phone check: swipe rail during auto-follow, ensure automatic movement stops and manual horizontal and page vertical scrolling still work. Reduced motion should show final Calculate state without automatic follow.
