# MAN R2 review evidence

A removes the stage statement; B removes the body heading. Apply one patch to QA 4811; the 3000 site has not been changed. All videos use normal playback and simulated native wheel input, 100px per 160ms. They include page loading/static fallback before hydration.

| Version | Width | Down | Up |
|---|---:|---|---|
| A | 1440 | [Watch](https://buzz-wwbf.srv2056990.hstgr.cloud/media/d5ae8dc6613e0498db036db5863541a6d3c8c4d61c0a5f4eae23711986ffc332.mp4) | [Watch](https://buzz-wwbf.srv2056990.hstgr.cloud/media/7b99de27d3bad0e5d5d6770984c20a3982e322c1e0550208def50ab393948bd1.mp4) |
| A | 1024 | [Watch](https://buzz-wwbf.srv2056990.hstgr.cloud/media/7cb264d93da6530edbf5f08a534de02d13fe3acaa583c223b3b539846079a7fd.mp4) | [Watch](https://buzz-wwbf.srv2056990.hstgr.cloud/media/cd46fd4645e095a1ccee6443e2909df539987d5adc95359fa6a9e2ea025ea833.mp4) |
| A | 390 | [Watch](https://buzz-wwbf.srv2056990.hstgr.cloud/media/efab1959d1b305b2312b532b374c336616761cd066444efd3d3816e81df01dad.mp4) | [Watch](https://buzz-wwbf.srv2056990.hstgr.cloud/media/1b0bd34508a198aa9440ce1581bef49cb8c3e88c44b05cf7e60aa59165839467.mp4) |
| B | 1440 | [Watch](https://buzz-wwbf.srv2056990.hstgr.cloud/media/4f58db1bae236a4b46498590b6fc52c820587a4c2fa2f4ec945988114647bac3.mp4) | [Watch](https://buzz-wwbf.srv2056990.hstgr.cloud/media/047ed1d925277c2084c7f29ef98508aa89f3f9552d64a16a2b84a9d9bf9dda05.mp4) |
| B | 1024 | [Watch](https://buzz-wwbf.srv2056990.hstgr.cloud/media/29ca4ca89ff2b77e7e4c10d86cedeab5b119e7a853a4d210067e8b4de8057b3d.mp4) | [Watch](https://buzz-wwbf.srv2056990.hstgr.cloud/media/e779167942719f9a2b54744fb079b0e8b25ded7c0c026e100ecee7c2a8460b68.mp4) |
| B | 390 | [Watch](https://buzz-wwbf.srv2056990.hstgr.cloud/media/600a2aa77648b3e9c685d0e8504f068fdaed3d10b45e7fddd993a5e64c172a37.mp4) | [Watch](https://buzz-wwbf.srv2056990.hstgr.cloud/media/00331341ad77cb0656384c4e8fbae506e01395b881a43e4cbe2cc90f7e852fa1.mp4) |

[Console screenshot](https://buzz-wwbf.srv2056990.hstgr.cloud/media/75ffd4f241d496ecfbfa31bc6cb2b4e08982940e2ca523a9c2b6538a5b7d9473.png) · [Compact ending at 1440×900](https://buzz-wwbf.srv2056990.hstgr.cloud/media/c90c0bac95d1fbcc5bed205bb0befb8b77b813f5c0630e7341a1b0047dc25f92.png)

Geometry: 129/129/130 blank pixel rows for 1440×900, 1440×1000 and 1024×768 (both variants); DOM-edge gaps 120/120/120.39px. Mobile static gap 66px. Repeated statement appears once per variant. Twelve recordings report zero page/console errors, HTTP failures, reversed progress or card/metadata overlap. /index RSC returned 200 and original navigation/back restored motion. Runtime reduced motion and no-JS static cards were checked.

Full-tree typecheck still reports the baseline’s ten errors outside MAN; no project-wide typecheck pass is claimed. Safari and real mobile devices remain untested. This is author self-check, pending independent QA and Lu’s title selection.

Raw logs, samples and videos: OUTBOX/MAN_R2_20261105_249a. Failed webpack/index and external-symlink Turbopack attempts are retained separately.

```text
[test-lock] 开始 03:06:32 负载 6.93 7.33 7.77 排队 0 秒
[test-lock] 结束 03:07:02 负载 5.82 7.03 7.64 退出码 0
[test-lock] 开始 03:08:42 负载 2.61 5.65 7.04 排队 0 秒
[test-lock] 结束 03:11:58 负载 4.97 5.14 6.51 退出码 0
[test-lock] 开始 03:12:06 负载 4.89 5.13 6.49 排队 0 秒
[test-lock] 结束 03:12:29 负载 5.01 5.13 6.46 退出码 0
[test-lock] 开始 03:12:43 负载 4.19 4.94 6.37 排队 0 秒
[test-lock] 结束 03:13:27 负载 3.56 4.65 6.18 退出码 0
```

Slow wheel (quarter speed) and reduced-motion recordings:

- [A_SLOW.mp4](https://buzz-wwbf.srv2056990.hstgr.cloud/media/382ebe86d7e8829cd8499144413218fcca105bc18ea62ca7fac2b92329fbc862.mp4)
- [A_REDUCED.mp4](https://buzz-wwbf.srv2056990.hstgr.cloud/media/33e613ff94b23ab04dd0726a2aaf87add060b6b4a9410874c3fd0faa9a998e49.mp4)
- [B_SLOW.mp4](https://buzz-wwbf.srv2056990.hstgr.cloud/media/c3166d78fb25a8c8f288dd330dbc2ea06fe81c79e0c273a819ba75773390a7c9.mp4)
- [B_REDUCED.mp4](https://buzz-wwbf.srv2056990.hstgr.cloud/media/1d82864067f69ce2d54543b525fa26f56a08a2b8f2b221b95001adcddd84771c.mp4)

Local review gallery: http://localhost:4822/man-r2-review/review.html . Preview A: http://localhost:4822/man-truck-bus ; B: http://localhost:4822/man-review-b . Persistent LaunchAgent com.buzz.man-r2-249a-4822.
