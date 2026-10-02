# Design System 全站收口审查报告

> **性质：** 收口清单 · P0 + 安全 P1 已本地实装（2026-10-02）· Prototypes / Theme KEEP 项仍不动  
> **日期：** 2026-10-02（Europe/Zurich）  
> **审查范围：** Index/Home · About · Client Advisory · E.ON · Playground（Action Center / Party Planner / Off We Go）· Way of Work（AC 子集）· 共享 Header/Footer  
> **Sources of truth：**  
> 1. `protoflio design-system-foundation-master.html`（Master DS）  
> 2. `docs/portfolio-consistency-guide.md`  
> 3. Live：`public/styles/shell-tokens.css` · `shell-components.css` · `global-header/`  
> **原则：** Accent / Theme Layer **保留**；对齐 type scale、24px gutter、1440/1040 well、pill 结构与约定 Title Case。分类 **FIX / KEEP / PROMOTE**；FIX↔KEEP 拿不准 → **KEEP + 旗标**。  
> **明确排除：** Prototypes（`party-planner-clickable-prototype.html`、`off-we-go-clickable-prototype.html` 等）**暂缓 DS 对齐**。

---

## 0. Executive Summary（给确认用）

| 优先级 | 数量（约） | 一句话 |
|--------|------------|--------|
| **P0** | 4 簇 | 文案/命名收口（Lab→Playground）、约定 Title Case 漂移、壳层 pill 尺寸矩阵缺口、重复/幽灵 HTML `#site-nav` |
| **P1** | 8 簇 | Host 页 contact pill 缩小、AC 白 pill 加宽、双 Footer「Lab」、CA accent 文档漂移、部分 CA session 用 header-chrome pad、Index Lab 卡 Poppins italic、About stats 1120、shell S/L 未实装 |
| **P2** | 若干 | WoW meta glass pill、Off We Go 产品字体、文档/注释清理、i18n 德语文案一致性 |

**已对齐 / 近期已修（勿回退）：**

| 项 | 状态 | 备注 |
|----|------|------|
| Playground 导航改名（原 Lab） | ✅ | Header `Playground`；子项 AC / Off We Go / Party Planner；**Way of Work 不在菜单**（经 AC CTA 进入） |
| `/lab` hub 移除 → redirect AC | ✅ | `app/lab/page.tsx` → `/lab/action-center` |
| AC frosted story card 下移 / fold | ✅ | `.review-shots/ac-card-lower-*.png`；玻璃卡 + 白 CTA 结构保留 |
| PP 蓝色 hero（`--pp-blue`） | ✅ | Theme Layer；勿用 blue-violet 盖 |
| PP phone 位置微调 | ✅ | hero/day phone 近期 diff |
| PP pill → DS M 结构 + Title Case | ✅ | 注释已写 KEEP 白底黑字 paint |
| CA session-06 scroll pin | ✅ | 对齐 home pin 节奏的 scrub |
| Global Page Frame tokens | ✅ | `--pad:24px` · `--wrap:1440` · `--editorial:1040` 已在 shell-tokens |
| Host `.pill-btn` 运动学 | ✅ | 999 · gap 8 · -2px · 0.97 · arrow +3px · reduced-motion |

**Theme Layer（全站禁止抹平）：** CA ice/navy · E.ON lavender/mint/red/Caveat · PP blue/Patrick Hand · AC paper/light · Lab/AI violet 信号 · Index periwinkle motif · Header Check `#4a90ff`。Display 全站 Poppins。

---

## 1. 共享壳层 — Header / Footer / Tokens

### 1.1 已匹配

- React `SiteHeader`：高 80 / md 96；玻璃 scrolled；Playground 分组正确；WoW 路径高亮 Playground 但不出现在下拉。
- `shell-tokens.css`：blue-violet `#8B5CF6`、wells、pad、pill paint、focus、grain `0.035` 与 Master / Consistency Guide 一致。
- `.pill-btn`（`shell-components.css`）= Primary · **M** 权威实装。

### 1.2 问题清单

| ID | 优先级 | 分类 | 区域 | 问题 | 建议 |
|----|--------|------|------|------|------|
| H-01 | **P0** | **FIX** | Header copy / Footer / WIP / AI eyebrow | 导航已称 **Playground**，但 footer 三处仍写 **「Lab」**（`global-footer`、CA `site-footer`、E.ON `site-footer`）；`wip` / `lab.ts` documentTitle / AI `eyebrow: 'Lab — Experiment'` 仍 Lab。用户可见命名不一致。 | 用户确认后统一对外文案 → **Playground**（URL `/lab/*` 可保留）。AI eyebrow 建议 `Playground — Experiment` 或保留 Lab 作历史实验标签 → 若保留须在指南写例外。 |
| H-02 | **P0** | **FIX** | Pill Title Case（约定处） | 已约定 Title Case 的 pill/CTA 仍有句首小写：`Contact me`（header + Index HTML nav）、`Let's talk` / `Let's talk`（SiteClosing / About / common）、AC `View my workflow`。对照已 Title Case：`See My Work` · `Explore Now` · `Start A Party` · `Start Planning` · `A Quick Hi`。 | 对齐英文 Title Case：`Contact Me` · `Let's Talk` · `View My Workflow`；德文按语言习惯 KEEP 或单独表。 |
| H-03 | **P0** | **FIX** | Index HTML `#site-nav` | `public/home.html` 仍内嵌完整 `#site-nav`（含缩小版 Contact pill）。Next 虽隐藏重复头，但维护双轨、尺寸还与 React header 不一致（见 I-02）。 | 收口时删除或抽空 HTML nav，只留 React `SiteHeader`；或明确「静态导出例外」并同步尺寸。 |
| H-04 | **P1** | **PROMOTE** | shell-components | Consistency Guide 已定义 pill **S / M / L**，live 仅有 `.pill-btn` = M。Header CTA 接近 L（`text-[1.0625rem]` + 更大 padding），Index HTML Contact 又被压成偏 S。 | 实装 `.pill-btn--s` / `--l`（或 data-size），结构常量共享，仅改 padding/type；禁止各页 `!py-2.5 !px-5`。 |
| H-05 | **P1** | **KEEP** ⚑ | Footer 双 chrome | Index/About/Lab 系用 compact HTML `exp-footer`；CA/EON 用 React SiteFooter（glow）。Master / HANDOFF 已记为有意差异。 | **KEEP**；仅统一其中「Lab」文案（H-01）。勿强行合成一种 footer。 |
| H-06 | **P2** | **KEEP** ⚑ | Header glass | Master：scrolled glass。与 content pill 不同族。 | **KEEP**；审查时勿把 header glass 改成 pill 实心。 |
| H-07 | **P2** | **FIX**（文档） | Consistency Guide CA accent | Guide 写 `--ca-accent #2f7cff`；live `--ca-accent #8aa3c7`，signal `#4da3ff`。 | 先 **KEEP** live Theme Layer；收口时 **更新 Guide/Master 摘录** 匹配 live，禁止用 #2f7cff「纠正」画面。 |

---

## 2. Index / Home（`public/home.html` + `/index`）

### 2.1 已匹配

- Display：Poppins 700 · `clamp(2.25rem, 5.2vw, 4rem)` · lh 1.08 ✅  
- Hero / sections：`px-6` + `max-w-[var(--wrap)]`（1440）✅  
- Contact：`--editorial` 1040 ✅  
- Hero CTA `See My Work`、案例 `Explore Now`：pill 结构 + Title Case ✅  
- Pin / 43–57 / reduced-motion 规则存在 ✅  

### 2.2 问题清单

| ID | 优先级 | 分类 | 问题 | 建议 |
|----|--------|------|------|------|
| I-01 | **P0** | **FIX** | 见 H-02 / H-03（Contact me、双 nav） | 随壳层收口 |
| I-02 | **P1** | **FIX** | HTML nav `.pill-btn !py-2.5 !px-5 text-[14px]` — 偏离 M（0.85/1.9 · 0.95rem） | 若保留 HTML nav：改回 M 或改用 `--s` token；优先删 HTML nav |
| I-03 | **P1** | **FIXED** | Index 内 Lab/Experience 区块原 Poppins italic → Poppins italic | Display 全站 Poppins；无第二 Display 字体 |
| I-04 | **P2** | **KEEP** ⚑ | `.exp-header { max-width: 1600px }` | 时间线 authored composition，非第三全局 well。**KEEP** |
| I-05 | **P2** | **KEEP** | Index periwinkle `#7A7FDC` / `#3846D4` connector | 已记 scoped；勿改名 blue-violet |

---

## 3. About（`public/about.html`）

### 3.1 已匹配

- Display Poppins clamp 与 Index 同族 ✅  
- 主内容 `px-6` + `--wrap` ✅  
- `pill-btn`：`A Quick Hi` Title Case；contact 用共享结构 ✅  
- 仅加载 Poppins（+ Caveat 字体 link 存在但 About 主声是 Poppins）✅  

### 3.2 问题清单

| ID | 优先级 | 分类 | 问题 | 建议 |
|----|--------|------|------|------|
| A-01 | **P1** | **FIX** 或 **KEEP** ⚑ | `.about-stats { max-width: 1120px }` — 非 1440/1040 | 若仅为 stats 网格可读宽 → **KEEP** 并写入 Theme/页面例外；若应对齐 main well → **FIX** 到 1440 内边。**默认 KEEP+旗标** |
| A-02 | **P1** | **FIX** | Contact CTA `Let's talk` 非 Title Case | 同 H-02 → `Let's Talk` |
| A-03 | **P2** | **KEEP** | 视频/全幅构图超出 frame | Master：媒体可越框。**KEEP** |

---

## 4. Client Advisory（`/client-advisory`）

### 4.1 已匹配 / 近期

- Theme Layer navy/ice/signal **保留**（未用 violet 覆盖）✅  
- Footer inner 1040 + `px-6` ✅  
- Session-06 scroll scrub **已修**（对齐 home pin 预算）✅  
- Body 多处 15px / Poppins ✅  

### 4.2 问题清单

| ID | 优先级 | 分类 | 问题 | 建议 |
|----|--------|------|------|------|
| CA-01 | **P1** | **KEEP** ⚑ | 多 session 使用 **header-chrome 式**横向 pad：`px-6 md:px-10 lg:px-14/16 xl:px-20`，well 常为 `max-w-[1440|1520|1600]`；另有 `--ca-page-pad: clamp(1.5rem, 4vw, 4rem)`、`--ca-rail`。与 Host「内容锚 = 24 + 1440」不完全同构。 | **KEEP Theme Layer 构图**（Master：authored compositions）。收口时只要求：**同一 case 内左右缘连续**，勿突然改成另一套。可选 PROMOTE：在 Guide 写「CA rail frame」例外表。 |
| CA-02 | **P1** | **FIX**（文档） | Guide `#2f7cff` vs live `#8aa3c7` / signal `#4da3ff` | 同步文档（H-07）；**不改画面色** |
| CA-03 | **P1** | **FIX** | Footer 链接文案仍「Lab」 | 同 H-01 |
| CA-04 | **P2** | **KEEP** | React SiteFooter vs Host compact footer | 同 H-05 |
| CA-05 | **P2** | **KEEP** ⚑ | S06 `max-w-[1600px]` + 递增 px | 满幅概念舞台；与 home exp 1600 同类。**KEEP** |

---

## 5. E.ON Solar（`/EON`）

### 5.1 已匹配

- Theme tokens：`--lavender` · `--mint` · `--eon-red` · `--off-white` · `--content-max-width: 1440px` ✅  
- Caveat 手写 accent（root layout 变量）✅  
- Footer 1040 对齐 CA React footer 模式 ✅  

### 5.2 问题清单

| ID | 优先级 | 分类 | 问题 | 建议 |
|----|--------|------|------|------|
| E-01 | **P1** | **FIX** | Footer「Lab」 | 同 H-01 |
| E-02 | **P2** | **KEEP** | 浅色 section / 大号营销字阶 / 插画越框 | Theme Layer。**KEEP**；结构上 pill/focus 若出现须跟 shell 运动学 |
| E-03 | **P2** | **KEEP** ⚑ | 部分区块 pad 随构图变化 | 与 CA 相同：case 内连续即可；写入例外表 |

---

## 6. Playground — Action Center（`/lab/action-center`）

### 6.1 已匹配 / 近期

- Light paper Theme Layer（`--paper #f2efec`）✅ — **勿**改成暗色 host  
- Frosted **glass card**（backdrop blur）承载叙事；CTA 为 **白实心 pill**（非 glass）— 职责分离正确 ✅  
- Card 下移 / fold 对齐近期审查图 ✅  
- Heading ≈ 1.9rem、body-lg 1.0625rem 靠 DS ✅  
- Closing 映射 `--pill-*` + focus `#146f9f`（页内 accent）✅  
- Way of Work **不在** Playground 菜单；由 AC 卡内链入 ✅  

### 6.2 问题清单

| ID | 优先级 | 分类 | 问题 | 建议 |
|----|--------|------|------|------|
| AC-01 | **P0** | **FIX** | CTA 文案 `View my workflow`（句式小写） | → `View My Workflow`（H-02） |
| AC-02 | **P1** | **KEEP** ⚑ | `.workflowLink` padding `0.85rem 2.45rem`（宽于 DS M 的 1.9rem）；注释写明有意加宽 | **KEEP** 旗标；若收口强制矩阵 → 改为 L 或 `--pill-btn` + `min-width`，勿静默改回 1.9 而不看构图 |
| AC-03 | **P1** | **KEEP** | Glass card ≠ pill；白底 CTA paint | **KEEP** Theme paint；结构已近 DS |
| AC-04 | **P2** | **KEEP** | Poppins 作 AC 标题 | Light product dashboard 声线；与全站 Display=Poppins 一致。**KEEP** |
| AC-05 | **P2** | **PROMOTE** | AC closing 的 light-theme pill token 覆写 | 可沉淀为 `.pill-btn` 的 `[data-theme=light]` 映射，供其它浅色页复用 |

---

## 7. Playground — Party Planner（`/lab/party-planner`）

### 7.1 已匹配 / 近期

- Hero **蓝** `--pp-blue #1768e8`（非 violet）✅  
- `--pad: 24px` · artboard 1440 / hero-frame 扣 gutter ✅  
- Landing `.pill`：999 · 0.85/1.9 · 0.95rem · Poppins 600 · Title Case（`Start A Party` / `Start Planning`）· **KEEP 白底黑字** ✅  
- Phone 位置近期已调 ✅  
- reduced-motion 块存在 ✅  

### 7.2 问题清单

| ID | 优先级 | 分类 | 问题 | 建议 |
|----|--------|------|------|------|
| PP-01 | **P1** | **FIXED** | Display/UI = **Poppins**；手写 **Patrick Hand** KEEP | 全局移除装饰 Display serif；pill = soft off-white + circular ↗ |
| PP-02 | **P2** | **KEEP** | 缩放 artboard / 绝对定位装饰 | Authored；640 以下已有简化。**KEEP** |
| PP-03 | — | **DEFER** | `public/lab/party-planner/*prototype*` | **整页暂缓 DS 对齐**（用户范围） |

---

## 8. Playground — Off We Go（`/lab/off-we-go`）

### 8.1 观察

- Host 壳 + 产品 UI **Plus Jakarta Sans**；内嵌 laptop UI / `.glass` 控件。  
- 更偏产品演示舞台，而非 Host editorial。

### 8.2 问题清单

| ID | 优先级 | 分类 | 问题 | 建议 |
|----|--------|------|------|------|
| OWG-01 | **P1** | **KEEP** ⚑ | 产品字体 / 内屏组件不跟 Poppins type scale | **KEEP** 为 Playground 产品皮肤；外层 closing/contact 若露出须用 shell pill |
| OWG-02 | **P2** | **KEEP** | `.glass` 用于产品控件 | 勿与 host pill 混淆；**KEEP** |
| OWG-03 | — | **DEFER** | clickable prototype HTML | **暂缓** |

---

## 9. Way of Work（`/lab/way-of-work`）— AC 子集，非 Playground 菜单项

### 9.1 已匹配

- 不在 Header Playground children ✅  
- Poppins Display hero（Lab/AI 用更大尺寸 token）✅  
- Body 17px Lab 调整 ✅  
- `var(--pad)` 水平 gutter ✅  
- reduced-motion / 899 断点（Lab-only）存在 ✅  

### 9.2 问题清单

| ID | 优先级 | 分类 | 问题 | 建议 |
|----|--------|------|------|------|
| WOW-01 | **P2** | **KEEP** ⚑ | 章节 meta 使用 **glass + pill 半径**（backdrop blur + 999） | 信号标签，非 Primary CTA。**KEEP**；勿改成实心 violet fill |
| WOW-02 | **P2** | **FIXED** | 超大字阶（clamp 至 ~13.5rem）改用 Poppins | 保留尺寸；字体族与全站 Display 一致 |
| WOW-03 | **P1** | **FIX**（命名） | 若全局 Lab→Playground，页内/文档仍称 Lab editorial | 用户可见字符串随 H-01；技术注释可保留「Lab family」 |

---

## 10. 组件误用 / a11y / 响应式（横切）

| ID | 优先级 | 分类 | 问题 | 建议 |
|----|--------|------|------|------|
| X-01 | **P0** | **FIX** | Title Case 约定未在所有 host pill 执行 | 见 H-02 清单一次性改 i18n + 硬编码 |
| X-02 | **P1** | **PROMOTE** | S/M/L pill 只在文档、不在 CSS | 见 H-04 |
| X-03 | **P1** | **KEEP** | Glass（header / AC card / WoW meta / OWG UI）与 Pill CTA 混用审查 | 规则已清晰：**CTA = pill 结构**；glass 仅表面。继续按此分类，不合并成一种控件 |
| X-04 | **P2** | **FIX** | 禁止项扫描：确认无 `--color-bg-deepseek` / `.btn-primary-kling` 复活 | 现状 shell-tokens 注释已排除 deepseek — 保持 |
| X-05 | **P2** | **KEEP** | 断点 899 仅 Lab/AI；360 min-width 在 root | 符合 Guide |
| X-06 | **P2** | **FIX** 轻 | `app/lab/layout.tsx` metadata 仍 `Lu — Lab` | 随 Playground 命名 → `Lu — Playground` 或去掉无 hub 的 layout title |
| X-07 | **P2** | **KEEP** ⚑ | Prototypes 与 in-page phone/laptop 热区 | 热区 a11y（focus ring）PP 已有；prototype 页 **DEFER** |

---

## 11. 分类汇总（收口决策表）

### FIX（状态 · 本地已做 / 余量）

1. **Playground 对外命名收口**：✅ footer（React ×3 + Host compact ×4）、WIP / AI eyebrow、lab layout title。  
2. **Pill Title Case**：✅ `Contact Me` · `Let's Talk` · `View My Workflow`。  
3. **Index HTML `#site-nav` 双轨**：✅ 已删，仅 React `SiteHeader`。  
4. **文档**：✅ Guide CA accent → live `#8aa3c7` / signal `#4da3ff`；§3.6 例外表 + Playground IA。  
5. **Pill S/L**：✅ `.pill-btn--s` / `--l`；Contact CTA 用 L。

### KEEP（保留 Theme / 有意差异）

- 各页 accent 与手写例外（CA / E.ON Caveat / PP Patrick Hand / AC light / Index periwinkle）；Display=Poppins。  
- 双 footer chrome（compact vs glow）。  
- AC 加宽白 pill、PP 白底 pill paint、AC glass card。  
- CA/EON authored pad/rail、About stats 1120（旗标）、Index 1600 timeline header。  
- Header glass ≠ content pill。  
- **全部 prototypes 暂缓。**

### PROMOTE（可升级进 shell）

- Pill **S/L** 正式 class + 替换裸 `!px` 覆盖。  
- Light-theme pill token 包（从 AC closing 提炼）。  
- Guide「Playground IA」：菜单三项 + WoW 为 AC 子集的信息架构图。

---

## 12. 建议执行顺序（确认后）

```
P0  文案/命名（Playground + Title Case） → 删/同步 HTML site-nav
P1  Pill 尺寸矩阵 PROMOTE → Footer Lab 替换验证 → 文档例外表
P2  metadata/WIP/AI eyebrow 余量 → 旗标项逐条目视签收
—— Prototypes 全程不动 ——
```

**非目标：** 不统一成单一 violet；不重做 CA/EON 构图；不 commit/push（本交付仅文档）。

---

## Appendix A — 范围页对照

| 路由 | 实现 | Theme | 本报告章节 |
|------|------|-------|------------|
| `/index` | HTML island `home.html` | Host dark + violet 信号 | §2 |
| `/about` | HTML island `about.html` | Host dark | §3 |
| `/client-advisory` | CA React case | Ice/navy | §4 |
| `/EON` | E.ON React case | Lavender/mint/red | §5 |
| `/lab` | redirect → AC | — | §6 |
| `/lab/action-center` | React + module CSS | Light paper | §6 |
| `/lab/party-planner` | React + pp CSS | Blue product | §7 |
| `/lab/off-we-go` | React + module CSS | Product dark | §8 |
| `/lab/way-of-work` | React + module CSS | Editorial dark | §9 |
| Header/Footer | `global-header` / `global-footer` + case footers | Shell | §1 |

## Appendix B — 证据路径

- Master：`protoflio design-system-foundation-master.html`  
- Guide：`docs/portfolio-consistency-guide.md`  
- Live tokens：`public/styles/shell-tokens.css` · `shell-components.css`  
- 近修截图：`.review-shots/ac-card-lower-*.png` · `pp-party-day-fixed.png` · `ca-s06-verify/`  

---

*Chinese primary · English token / class names retained for code alignment. Docs-only — no mass FIX applied.*
