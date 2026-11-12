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

- **Worktree**：`~/LuJin-Portfolio-worktrees/webdev`，分支 `design/parallax-unify-index`
- **本地服务**：`http://localhost:4621`（`pnpm predev && pnpm exec next dev --port 4621`）
- **冻结 SHA**：`a4a5627ccec4c8f22c93e9f9c288023df62bf435`（`design/parallax-unify-index`，仅本地 commit，未 push）
- **证据根目录**：`~/.buzz/OUTBOX/PARALLAX_ROW19_1112/1440/`
  - `motion/normal.webm` — 正常滚动（/index → /e-on challenge → /lab/weather-aquarium 取景）
  - `motion/slow-verified.webm` + `motion/slow-verified.json` — CDP `Animation.setPlaybackRate(0.25)` 有效慢放
  - `motion/reduce.webm` — `prefers-reduced-motion: reduce`，`[data-move]` transform 保持 none/identity
  - `samples-transform.json` — 1440 下 scroll 采样（变更页 + index 对照）

参照 `docs/motion.md`（harness-core）：方案表 + 否决清单 + 三组录屏。
