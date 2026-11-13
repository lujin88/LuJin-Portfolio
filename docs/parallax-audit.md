# Parallax audit — reference `/index` (2026-11-12)

| Reference | Mechanism | Speed token |
|-----------|-----------|-------------|
| `/index` | `initFrameLag` scroll translate | **LAG 0.35** (media at 65% of frame scroll); contact lag 0.50 desktop / 0.35 narrow; `parallax-zoom` scale 0.08 |
| Case studies (shared) | `LayerScrollGroup` + `data-move` px over section progress | Tiers **96** copy · **80/84** copy+gap · **64** media/grid · **32** nested · **24** atmosphere · **16/10** micro |

## Per page

| Page | Before | After (this PR) | Notes |
|------|--------|-----------------|-------|
| `/index` | LAG 0.35 | unchanged | Reference |
| `/client-advisory` (CA) | LSG 96/64/24; S05 header **68** | unchanged | 68 = 64+4px card gap (intentional) |
| `/e-on` challenge | **8 / 24 / 48** | **24 / 64 / 96** | Was ½ index tier |
| `/lab/party-planner` | LSG 96/64/32/24/10 | unchanged | Already on index tiers |
| `/man-truck-bus` | LSG 96/64/32/16 | unchanged | Already on index tiers |
| `/lab/weather-aquarium` | IO `.reveal` **translateY 20px** | LSG **96/64/80/84** | Matches index scroll-lag model |
| `/lab/bmw-one-source` | Static / inline % | unchanged | Row 19 follow-up: LSG migration |
| `/etf-savings-plan` | `OpeningPhones` scroll 0→1 span | unchanged | Separate hero physics |
| `/lab/way-of-work` | Unused `PARALLAX 0.28` in `theater-engine.ts` | **`PARALLAX 0.35`** | Constant only — **no scroll consumer yet** (field-notes line draw is not this token) |
| `/ai-companion-pet` | Custom gallery translate | unchanged | Pet-specific motion |

Reduced-motion: all `LayerScrollGroup` and `/index` scripts clear transforms when `prefers-reduced-motion: reduce`.

## 否决清单（motion.md §2）

| 不考虑改 | 卡在哪一关 |
|----------|------------|
| `/bmw-design-system` 内联 % 位移 → 全站 LSG | **功能**：大改版，超出 row 19「只调速度」；另开迁移 |
| `/etf-savings-plan` `OpeningPhones` 与 index LAG 对齐 | **目的/功能**：独立 hero 进度模型，非 case-study 档 |
| `/ai-companion-pet` 画廊 translate | **目的**：产品角色动效，不是首页视差族 |
| CA session-05 `data-move="68"` 收到 64 档 | **功能**：68 = 64 + 卡片间距；改档会撞布局 |
| 全站未用 `theater-engine` PARALLAX 的 HIW 卷轴接线 | **频率/范围**：本 PR 只同步常量，避免无 QA 面的行为变化 |

## Visual QA 证据（row 19）

**当前 PR HEAD**：`a8bb9053851d41b40d114b7e0637cb43ee6e23d0`（`design/parallax-unify-index`）。**行为签收 SHA**：`50efba578b6196e74706d41a6163759fe956851e`；`8579cb0` 起仅改 `docs/parallax-audit.md`。

| SHA / 包 | 适用范围 | 目录 | 备注 |
|----------|----------|------|------|
| `acc9793` → `0204a48` | WA02 首版 LSG + E.ON 三档提速前后对比 | `~/.buzz/OUTBOX/PARALLAX_ROW19_1112/`、`VISUALQA_ROW19_RECHECK_1112/` | **历史**：`0204a48` 录屏时 WA02 图注裁切未过；**勿**当作当前 HEAD 通过依据 |
| `50efba5` | **WA02 整块进场**（Lu B：`data-move` 在 `.editions-block`） | `~/.buzz/OUTBOX/VISUALQA_ROW19_50EFBA5_1113/` | 390/700/1440 真 wheel normal+reduce；**本条为 WA 画面签收依据** |
| `acc9793`…`50efba5` 间仅 WA02 | E.ON / index / 其他页 | `VISUALQA_ROW19_RECHECK_1112/REPORT.md` | 代码 diff 边界：仅 WA02 markup/CSS 变更时，E.ON/index 证据可继承评估 |
| `50efba5` | **E.ON challenge 视口外→归零**（700 可测；1440 首屏即见） | `~/.buzz/OUTBOX/PARALLAX_ROW19_EON_1440_1113/` | 见下 |

**Worktree / 预览**：`~/LuJin-Portfolio-worktrees/webdev-parallax-183`，`pnpm predev && pnpm exec next dev --port 4623` → `http://localhost:4623`

### 慢放 / 录屏（勿误读 CDP）

- **有效慢放**：`VISUALQA_ROW19_RECHECK_1112/1440/normal-4x-replay.mp4` — 对真 wheel 录屏做 ffmpeg `setpts` 4×，可看 JS/rAF 滚动位移。
- **无效作慢放验收**：仅设 CDP `Animation.setPlaybackRate(0.25)` **不能**证明滚动/LSG 变慢（`PARALLAX_ROW19_1112/1440/motion/slow-verified.*` 仅验证该 API 被设置）。
- **1440 综合录屏**（`0204a48` 时代）：`PARALLAX_ROW19_1112/1440/motion/normal.webm`、`reduce.webm` — 跨页取景；WA 段落以 `50efba5` 专项为准。

### E.ON 1440「视口外入场 → 归零」

- **700×900**：`eon-700-samples.json` + `eon-700-entrance-*.png` — 首屏 challenge 在视口下缘外，真 wheel 后 `data-move` 24/64/96 → `translate3d` 归零（最大约 96px）。
- **1440×900**：challenge 区块 **首屏已露出**（`section` top ≈856px/900px 视口）；`layer-scroll-group` 在「首滚时区块已在屏内」走 **on-screen latch**，保持 CSS 基准、不写位移（`eon-1440-samples.json` + `eon-1440-entrance-00.png`）。1440 验收应核对 **该锁存是否符合设计**， Tier 改动与 700 实测一致，而非要求 1440 首屏也出现 96px 偏移。

### Reduce

- `prefers-reduced-motion: reduce`：`[data-move]` 无附加位移（`50efba5` WA 证据 + `RECHECK` reduce 采样）。

参照 `docs/motion.md`（harness-core）：方案表 + 否决清单 + 真 wheel 采样/录屏。
