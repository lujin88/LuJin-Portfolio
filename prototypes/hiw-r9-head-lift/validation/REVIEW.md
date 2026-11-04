The previous R9 showed DECIDE from the initial image and tilted the right-facing fox after the label. This isolated review now plays: girl lifts → bulb brightens → fox looks left toward the girl → DECIDE once → original subtitle → one composited fade → hidden reset → loop.

The subtitle is the existing raster text **“Human judgment in every step”**. Its pixels, style and size are reused; its font family is not exposed by DOM/CSS. Review only at **http://127.0.0.1:4690/index**. The `prototypes/hiw-r9-head-lift/` directory is not imported by the app. No 3000 integration.

### Review media

[1440 normal speed, two loops (24.93 s)](https://buzz-wwbf.srv2056990.hstgr.cloud/media/1a40805bf5cb8e9297046f6e0fc69105a4707cf8277617e6a0c741151c84929c.mp4) · [4× slow (48.53 s)](https://buzz-wwbf.srv2056990.hstgr.cloud/media/ec4c8482732f729bfc39e119bff38b7f281d80cf99cd20dba2cb545b370a55f4.mp4) · [Reduced-motion video](https://buzz-wwbf.srv2056990.hstgr.cloud/media/591294ea096af235a30617c4a92fe018a26d18f80785ed05a79d592f4bbfd2c5.mp4) · [Reduced-motion still](https://buzz-wwbf.srv2056990.hstgr.cloud/media/66d0fc000977e317c9954d674a8b8c6a6d1e41e183a815c9a2e02f50ef9859e1.png)

Before: the backed-up previous R9 at its initial frame (caption already visible).

![Before](https://buzz-wwbf.srv2056990.hstgr.cloud/media/f4eb15f2aaa804095f1ba6730f7f861ea0afb38d9c76974e5e62c2b8b1cc1389.png)

After: the new loop at 4.6 s, after the fox turn and sequential captions. Initial frame and completed state are compared below.

![After](https://buzz-wwbf.srv2056990.hstgr.cloud/media/4c736870261d2782ba3e221703ea250aebb021f1e61d8165d44a5ee6708bfb7d.png)
![New initial and completed states](https://buzz-wwbf.srv2056990.hstgr.cloud/media/f3315083352662889cb72bf1cf6edc81482f72f6589428c2d9d3727b7f62df42.png)

### Timing per 12-second loop

| Seconds | Action |
|---|---|
| 0–1 | Initial pose, both captions hidden |
| 1–1.7 | Girl head and supporting hand lift |
| 1.9–2.3 | Bulb brightens |
| 2.5–3.2 | Fox turns to the girl |
| 3.5–3.8 | DECIDE appears once; settles through 4.1 |
| 4.2–4.6 | Original subtitle appears |
| 4.6–9 | Hold |
| 9–9.5 | Whole illustration fades out |
| 9.5–10.5 | Hidden reset |
| 10.5–11 | Initial composition fades in |
| 11–12 | Rest before repeat |

### Validation

- `rive doctor` passed; CLI 1.7.0. All three Rive builds: zero errors/warnings. Editable RML, build scripts, binaries, file sizes, state/input documentation and self-contained `still.svg` are included.
- Same existing `ReviewAutoplay` → `RespondOnce`, no inputs or new states. Every main mesh checked at all 721 integer frames: no nonpositive triangles; initial/final coordinates identical. The intentional mirrored fox overlay is excluded from the positive-winding assertion. Original raster bytes unchanged.
- Chrome normal playback emitted two completion events per band. No page/Rive errors. Offscreen pause/resume and live reduced-motion stop passed. Reduced motion loads zero `.riv` files and is pixel-identical after 1.2 seconds. 390 browser layout has no horizontal overflow.
- Browser START/SEAM pixel difference: 0. Decoded normal-video samples at 11.8/12.2 seconds: pixel difference 0. DECIDE/subtitle regions are identical to blank initial regions before their respective reveal times. Evidence: `validation/`.
- Final capture through test-lock: **14:02:11 load 12.89/12.18/11.59 → 14:03:46 load 26.77/18.60/14.22, exit 0**. Baseline capture: **14:07:21 load 6.04/12.53/12.62 → 14:07:30 load 6.20/12.35/12.55, exit 0**.
- Branch rebased onto main `71fdf7f`; `pnpm install --frozen-lockfile` passed. Full repository `pnpm exec tsc --noEmit` passed after the repository’s required `pnpm predev` generated its ignored Ask Lu knowledge module. The first type check lacked that generated prerequisite. No package/lockfile changes.
- Normal/slow footage is 1440×814 with the original card at 1× CSS size. CDP frame timestamps determine playback; 30 fps is the encoded output rate. The screenshot viewport is 1440×900. No watermark visible in inspected frames.

### Remaining and integration notes

Draft for Lu/QA/visual review. Production transparent-character separation, Safari/real-device review and developer integration remain. These inherited raster bands keep the source dark background inside transparent unused artboard areas; mobile subtitle legibility is unchanged from the existing small image.

**Keep the global compositor fade in the developer integration.** Per-drawable Rive opacity reveals the covered original arc/head and brightens overlapping mesh seams. The preview fades the already-composited plane once and aligns it at each Bear completion event. Fox uses original left/right poses with a two-frame blend and a short settle; final proportions are unchanged.

No merge/deployment, paid generation or live 3000 edits. WA hover #63 remains paused. Rejected alternatives and rebuild instructions are in the README.

Originating Buzz channel: `4d529583-4dcf-4804-816e-94f63f30634b`.
Request event: `28d42ecec0b23742f5129554a850646734a306a88efe16926506c5c2cb6bac59` (Lu feedback `f38159276346b2a4856c84392979028168c5fac17fcd3e08deb6c86e9a93dc03`).
