# Jin Lu Portfolio — UI/UX Design Standard & Consistency Guide

> **轻量一致性规范** · 基于现有 Design System Master，不另起冲突体系  
> **Source of truth:** `protoflio design-system-foundation-master.html`  
> **Live tokens:** `public/styles/shell-tokens.css` · `public/styles/shell-components.css` · `global-header/`  
> **Version:** 2026-10-02 · Live-synced with shell + Theme Layer（P0/P1 收口后）

---

## 1. Executive Summary / Core Rulebook

### 一句话原则

**记录已重复出现的值；不要发明更“干净”的新系统。**  
Accent 可变；底层空间世界、壳层节奏与交互结构保持连续。

### 核心法则（Core Rulebook）

| # | 规则 | 含义 |
|---|------|------|
| 1 | **Type does hierarchy. Color does signaling.** | Poppins 承载产品/UI 与 **Display** 全站标题（无第二装饰 Display 字体）。Blue-violet（`#8B5CF6`）做信号、焦点、选中与克制 glow——**不是**整页铺色，也**不能**抹平 case 主题色。 |
| 2 | **Theme accents are authored content, not inconsistency.** | 页面级 primary / secondary accent **允许且鼓励**。CA 冰蓝、E.ON lavender/mint/red、Playground 编辑式 violet 等必须保留，禁止用全局 blue-violet“纠正”。 |
| 3 | **Global Page Frame is the content X-anchor.** | 内容对齐：`24px` page pad + `1440px` main / `1040px` editorial well。Header chrome（1800 / 1600）**不是**内容原点。 |
| 4 | **Structure constant; theme paint variable.** | 按钮半径、尺寸阶、icon gap、状态运动学跨主题保持同一结构；填充色 / 描边色跟页面 accent 走。Pills **不用** blue-violet 实心填充。 |
| 5 | **Normalize only what repeats.** | 只对齐跨页重复的类型角色、间距、容器、边框、radius、交互与 motion safety。勿把 Theme Layer 构图压成一套绝对 Y / 一套测量。 |
| 6 | **Background Continuity.** | Section 可换 accent 与 mood，但仍是同一空间世界的 accent layer——不是硬切成另一个网站。 |
| 7 | **Motion explains, then stops.** | Prefer transform / opacity；`prefers-reduced-motion` 下取消位移。640px 以下 pin 塌为静态栈。 |

### 字体族（已存在，勿替换）

| 角色 | Family | 用途 |
|------|--------|------|
| **Primary sans / Display** | **Poppins** (`400/500/600/700/800` + italic) | UI、全站 Display、共享 Heading、Body、Caption、Shell — **唯一** Display 字体 |
| **Theme accent hand** | Caveat (`--font-hand`) / Patrick Hand（PP） | **仅** Theme Layer 手写 accent，非全局 Display |
| **Code / mono** | `ui-monospace, SFMono-Regular, monospace` | Token 名、技术标注 |

### 权威文件优先级

1. `protoflio design-system-foundation-master.html`（Master DS）  
2. `public/styles/shell-tokens.css` + `shell-components.css`（Host / shell 实装）  
3. Theme Layer 本地 globals（`ca/...`、`eon/...`）— 只在 case 内有效  
4. 本 Consistency Guide — **执行清单与表格化摘录**；冲突时以 Master + live CSS 为准  

**注意：** `design-system-foundation.html` / `.css` 为 E.ON 相关或历史材料，**不是**本指南的 master。

---

## 2. Design Token / Spec Tables

### 2.1 Color — Global Foundation（Host shell）

官方壳层 accent 名：**Blue-violet**（勿称 generic purple）。

| Token | Value | 用途 |
|-------|-------|------|
| `--color-bg-page` | `#0a0a0a` | 页面场 |
| `--color-bg-primary` | `#111214` | Surface / card |
| `--color-bg-secondary` | `#1a1c1f` | Secondary surface |
| `--color-bg-elevated` | `#1f2124` | Elevated |
| `--color-theme-2` / `--color-primary-solid` | `#8B5CF6` | Shell accent（信号） |
| `--color-theme-hover` | `#A78BFA` | Accent hover |
| `--color-theme-3` | `rgba(139,92,246,0.15)` | Soft accent / glow |
| `--color-text-1` | `#f9fbfc` | Primary text |
| `--color-text-2` | `#b6bbc2` | Secondary / body |
| `--color-text-3` | `#777e85` | Muted |
| `--color-text-4` | `#595d61` | Quiet |
| `--color-border-divider` | `#343638` | Divider |
| `--hairline` | `rgba(255,255,255,0.10)` | Hairline |
| `--hairline-strong` | `rgba(255,255,255,0.16)` | Strong hairline |
| `--grain-opacity` | `0.035` | 页面 grain overlay |

**Scoped（勿并入全局 brand）：**

| Scope | Value | 规则 |
|-------|-------|------|
| Header-local | `--header-accent #4a90ff` | **仅** SiteHeader 已选语言 Check |
| Index experience motif | `#7A7FDC` / `#3846D4` | Index timeline connector / plus，勿改名 blue-violet |
| `--color-bg-deepseek` | — | 历史残留，**不推广** |
| `.btn-primary-kling` | — | 未使用历史类，**非**组件 token |

### 2.2 Typography Scale

基准：`1rem = 16px`（除非页面另有 root）。权重 token：`--font-weight-regular 400` · `medium 500` · `semibold 600` · `bold 700`。

| Role | Family / Weight | Size | Line-height | Letter-spacing | Color（默认） | 备注 |
|------|-----------------|------|-------------|----------------|---------------|------|
| **Display / Hero — Index + About** | Poppins **700** | `clamp(2.25rem, 5.2vw, 4rem)` → **36–64px** | **1.08** | tight（约 `-0.03em`～`-0.04em`） | `--color-text-1` | 全局产品表达 |
| **Display / Hero — Playground WoW + AI + PP** | Poppins **700** | `clamp(2.4rem, 6vw, 4.75rem)` → **38.4–76px**（或 PP 本地 Display 阶） | **1.05** | **-0.03em** | `--color-text-1` / 主题白 | 同脸更大尺寸 token，非第二字体 |
| **H1**（页面主标题，非 Display 舞台） | Poppins **700** | 同 Display 角色；或 well 内 wrap `max-w-3xl`（768px） | 1.05–1.08 | `-0.03em`～`-0.04em` | `--color-text-1` | 768px 是 **heading wrap**，不是第四个 well |
| **H2** Heading | Poppins **600** | `1.9rem`（30.4px）→ `md:text-4xl` **2.25rem**（36px）；编辑式可用 `clamp(2rem, 4vw, 3.4rem)` | **1.1** | ~`-0.02em`～`-0.04em` | `--color-text-1` | 共享 section |
| **H3** | Poppins **600** | **1.15rem**（18.4px）accordion；卡片标题约 **1.75rem / 28px**；contact `clamp(1.6rem, 2.6vw, 2.4rem)` | **1.12–1.3** | `-0.02em`（大号） / 0（小号） | `--color-text-1` | 按组件角色取档，勿混用 Display |
| **Body L**（Large / lede） | Poppins **400** | **17px**（WoW/Lab family）或 **18px**（hero lede） | **1.7**（WoW）/ **~1.75** | 0 | `--color-text-2` | WoW 17px 为**有意**调整 |
| **Body R**（Regular） | Poppins **400** | **15px**（0.9375rem） | **1.75** | 0 | `--color-text-2` `#b6bbc2` | 默认正文 |
| **Body S** | Poppins **400/500** | **13px**（0.8125rem） | **1.55–1.6** | 0 或 meta | `--color-text-3` | 次级说明、表注 |
| **Caption / Meta** | Poppins **600/700** | Eyebrow **13px** semibold uppercase **0.28em**；Index meta **11px** bold uppercase **0.14em**（`--tracking-meta`）；footer note **0.75rem / 12px** | **1.55–1.6** | 见左 | accent 或 `--color-text-3` | Kicker 可用 accent 色 |
| **Code** | ui-monospace | **12px** | **1.55** | 0 | `#c7b9ff`（文档）/ 继承 | Token 标注 |

**层级口诀：** Display 定情绪 → H2 定章节 → H3 定卡片/手风琴 → Body 读 → Caption 标注。颜色只做 signaling，不替代字号层级。

### 2.3 Spacing / Grid

#### 网格

- **主网格：8pt**（已验证重复尺度）  
- **辅网格：4pt**（grain `4px`、细微调、icon 对齐）  
- Master 明确：**Do not force an artificial 8-point rewrite.** 使用已存在尺度即可。

#### Spacing scale（binding）

| Step | px | rem | 典型用途 |
|------|----|-----|----------|
| 1 | **8** | 0.5 | 紧凑 gap、meta 行距 |
| 2 | **16** | 1 | 组件内小间距 |
| 3 | **24** | 1.5 | **Page pad**、中等 gap |
| 4 | **48** | 3 | 图文 gutter 下沿、pin 底 |
| 5 | **80** | 5 | 43/57 `lg:gap-20`、大 gutter 上沿 |
| 6 | **96** | 6 | Section 起始 `pt-24`、section 节奏 |
| 7 | **128** | 8 | `md:pt-32` / `md:py-32` |

#### Page padding（Content frame — 非 header chrome）

| Viewport | Page padding (L/R) | 说明 |
|----------|-------------------|------|
| **Desktop** (≥1024) | **24px** (`px-6`) | + 1440 / 1040 well |
| **Tablet** (768–1023) | **24px** | Header 变 96px；内容 pad **不变** |
| **Mobile** (360–767) | **24px** | 最小宽 360；勿改用 header chrome pad |

**Header chrome（独立，非内容锚点）：**  
`px-6 / md:px-12 / lg:px-20 / xl:px-28` → `24 / 48 / 80 / 112px` · max-width **1800px** · 高 **80px** / **96px** from `md`

#### Containers / Wells

| Well | Max-width | 用途 |
|------|-----------|------|
| Main | **1440px** (`--wrap`) | 媒体主导、43/57、Index pin、About video inset |
| Editorial | **1040px** (`--editorial`) | Playground/AI 页框、contact、standalone editorial、footer inner |
| Text measure — Editorial Wide | **1040px**（well 即正文块） | 多段编辑正文 |
| Text measure — Body / Standard | **672px** (`max-w-2xl` / `42rem`) | 跑文 |
| Text measure — Reading / Narrow | **448px** (`max-w-md` / `28rem`) | 短 lede / caption |
| Heading wrap only | **768px** (`max-w-3xl`) | **不是** well |

#### Card padding

| Density | Padding | 依据 |
|---------|---------|------|
| **Compact** | **16–18px** | 小面板 / motion tile（master demo `18px`） |
| **Regular** | **24–26px** | 标准 card / rule（master `25px` / callout `26px`） |
| **Spacious** | **32–34px** | Demo / 强调面板（master `34px`） |

Radius：卡片/媒体常见 **16px**（`rounded-2xl`）；小 swatch **12px**；pill **999px**。

#### Section gaps

| 关系 | Value |
|------|-------|
| Section ↔ section | **96px** / **128px**（`py-24` / `md:py-32`） |
| Image-led 43/57 gutter | **48–80px** |
| Header → 标准首屏 UI | **96px**（&lt;768）/ **128px**（≥768） |
| Header-matched full-bleed case | 壳偏移 **80 / 96px**（对齐 header 高） |
| Contact 区 | `clamp(6rem, 14vh, 9rem)` 上 · `clamp(4.5rem, 10vh, 7rem)` 下 + `--pad` |

### 2.4 Button Matrix

**结构常量（跨主题必须一致）：** radius **999px** · icon gap **0.5rem（8px）** · ease `cubic-bezier(0.22, 1, 0.36, 1)` · interaction **320ms** · hover lift **-2px** · active **scale(0.97)** · arrow/icon hover **translateX(3px)** · focus-visible **2px** ring + **3px** offset · disabled opacity **0.45**。

**权威实装：** `.pill-btn`（`shell-components.css`）= 默认 **Primary · M**。

#### 尺寸（S / M / L）— 以 live M 为锚，沿 8pt 扩展

| Size | Padding (Y X) | Font-size | Min-height 建议 | Icon |
|------|---------------|-----------|-----------------|------|
| **S** | `0.55rem 1.25rem`（≈9/20px） | `0.8125rem`（13px） | ≥36px | 14–16px |
| **M**（默认 · live） | **`0.85rem 1.9rem`** | **`0.95rem`（15.2px）** | ≥44px | 16–18px |
| **L** | `1rem 2.25rem`（16/36px） | `1.0625rem`（17px） | ≥48px | 18–20px |

#### 变体（结构同；paint 跟主题）

| Variant | 默认外观（Host shell） | Hover | 规则 |
|---------|------------------------|-------|------|
| **Primary**（Pill CTA） | 透明/微底 `--pill-bg` + 描边 `--pill-border`；字 `--pill-text` | 白底 `#f9fbfc` + 深字 `#0a0a0a` + `--pill-hover-shadow` | **不要**用 blue-violet 实心填 pill |
| **Secondary** | 更弱描边 / 无底；字 `--color-text-2` | 提到 `--color-text-1` + 略强描边 | 次要行动；同 radius / 尺寸阶 |
| **Ghost** | 无边框、无底；字 `--color-text-2` | 字 `--color-text-1`；可微底 `rgba(255,255,255,0.06)` | 用于行内/工具条；保 focus ring |
| **Icon** | 正方形触控区；半径可用 999（圆）或 12px；padding 均分 | 同 Primary/Ghost 的运动学 | 宽高对齐 ≥ S/M/L 的 min-height；icon 居中 |

**主题页：** Primary/Secondary 的描边与 hover 填充可映射到页面 accent（如 CA `--ca-accent #8aa3c7` / signal `#4da3ff`、E.ON 表面对比），但 **radius / padding / gap / 状态时序不得改**。Header CTA（`rounded-full` border）遵循同一 pill 家族。

#### States checklist

| State | 行为 |
|-------|------|
| Default | 如上 |
| Hover | `-2px` lift + paint 交换；`prefers-reduced-motion` 时无位移 |
| Active / Pressed | `translateY(0) scale(0.97)` |
| Focus-visible | `outline: 2px solid var(--focus-ring)`（shell）或 header `currentColor`；offset 3px |
| Disabled | `opacity: 0.45`；无 hover 位移 |

---

## 3. Theming Rules

### 3.1 允许什么

- **页面 / case 级 primary & secondary accent**（鼓励，服务于叙事）  
- Theme Layer 自有表面（CA navy、E.ON light `--off-white` 等）  
- Theme 手写 accent（Caveat on E.ON；Patrick Hand on PP）— **不是**全局 Display  
- 构图例外：满幅摄影、rail、arc、pin、899px WoW timeline fallback 等（已记录于 Master）  
- 页内一致的 accent 用法（eyebrow、箭头、选中条、克制 glow）

### 3.2 禁止什么

- 用全局 `#8B5CF6` **覆盖** CA `--ca-accent` / E.ON lavender·mint·red / Index periwinkle motif  
- 把 Theme Layer 的 ch/px 测量 **压平** 进 672 / 448 / 1040  
- 把 header chrome padding 当成内容 X 锚点  
- 把 `max-w-3xl`（768）当成第三个全局 well  
- Pill 实心填 blue-violet  
- 推广未使用历史 token（`--color-bg-deepseek`、`.btn-primary-kling`）  
- 静默替换 Global Page Frame / shell nav / 背景连续性 / a11y focus / 响应式规则  

### 3.3 Theme Layer 摘要（保留，不全局化）

| Theme | Accent 方向 | 关键 token（摘录） |
|-------|-------------|-------------------|
| **Client Advisory** | Ice / signal blue on deep navy | `--ca-bg #0b1220` · `--ca-accent #8aa3c7` · `--color-signal #4da3ff` · `--ca-text #f3f6fa` |
| **E.ON Solar** | Navy + lavender + mint + E.ON red + light sections | `--navy-950 #07151f` · `--lavender #c9b5f4` · `--mint #b9f4d8` · `--eon-red #f32717` · `--off-white #f8f8f6` |
| **Playground + AI Workflow** | 全局 blue-violet 的编辑式强化 + Poppins Display（更大尺寸 token） | `--color-theme-2` + Poppins · URL `/lab/*` 可保留 |
| **Index / About / Host** | Blue-violet 信号 + Poppins | `shell-tokens.css` |

### 3.4 Theme boundary（一句话）

> Case 可控制：本地 accent、影像、编辑字体例外、插画、媒体处理、叙事母题、case UI、局部明暗表面。  
> Case **不可**任意重置：全局页节奏、Global Page Frame、shell 导航行为、背景连续性、可访问交互、响应式规则。

### 3.5 新页面如何选 accent

1. 先挂上 Global Page Frame（24 + 1440/1040）与 Poppins 层级。  
2. 选 **一对** primary/secondary accent，在本页 eyebrow / 焦点 / 选中 / 克制 glow 内闭环。  
3. 需要更大 Display 阶 → 用 `--font-size-display-editorial`（仍是 Poppins），勿引入第二 Display 字体。  
4. Shell 组件（`.pill-btn`、header、footer 结构）保持结构；只换 theme paint。  
5. 回写 Master / 本指南：新 accent 是 Theme Layer，不是 Global Foundation。

---

## 3.6 Authored exceptions（收口例外表 · KEEP）

> 下列差异为**有意** Theme / 构图例外，**禁止**为统一而抹平。对外文案用 **Playground**；技术注释可保留「Lab family」。

| 例外 | 范围 | 约定 |
|------|------|------|
| **CA rail frame** | `/client-advisory` sessions | `px-6 md:px-10…` + well 1440–1600 与 Host「24+1440」不同构；**同一 case 内左右缘连续**即可 |
| **CA accent（live）** | CA Theme Layer | `--ca-accent #8aa3c7` · signal `#4da3ff`（**勿**用旧摘录 `#2f7cff` 纠正画面；个别 session 可本地覆写 paint） |
| **PP Patrick Hand accents** | `/lab/party-planner` | Display/UI = Poppins；手写装饰 = Patrick Hand KEEP；pill = soft off-white + circular ↗；`--pp-blue #1768e8` KEEP |
| **AC glass card ≠ pill** | `/lab/action-center` | Frosted glass 承载叙事；CTA = **白实心 pill**（可加宽 / L）；勿把 glass 改成 violet fill |
| **AC / PP / OWG 产品肤** | Playground 三页 | 产品字体与内屏控件跟随产品皮肤；外层 closing/contact 用 shell pill |
| **WoW meta glass pill** | `/lab/way-of-work` | 信号标签（blur + 999），非 Primary CTA；超大字阶仍用 Poppins |
| **Index italic motif** | `/index` Experience 等 | 母题数字/小标题可用 Poppins italic；勿引入第二 Display 字体 |
| **About stats 1120** | `/about` `.about-stats` | 非 1440/1040；stats 网格可读宽例外 |
| **Index exp header 1600** | `/index` timeline | Authored composition，非第三全局 well |
| **双 Footer chrome** | Host compact `exp-footer` vs CA/EON React glow | **KEEP** 结构差异；底栏链接文案统一 **Playground**（`href=/lab`） |
| **Header glass** | `SiteHeader` scrolled | 与 content pill 不同族；勿改成实心 pill |
| **Prototypes** | `*prototype*.html` 等 | **整页暂缓** DS 对齐 |

### Playground IA（菜单）

- Header **Playground** 下拉三项：Action Center · Off We Go · Party Planner  
- **Way of Work** 不在菜单；经 AC 卡内 CTA（`View My Workflow`）进入  
- URL 前缀 `/lab/*` 可保留

---

## 4. Checklist for Portfolio Review

### A. 全局壳层

- [ ] 内容 X 锚点 = `24px` pad + `1440` 或 `1040` well（不是 header 1800 边）  
- [ ] React SiteHeader：80 / 96px 高；focus `currentColor` 2+3；无重复 HTML `#site-nav`  
- [ ] Host 页加载 `shell-tokens` / 共享 primitive；grain ≈ 3.5%  
- [ ] Selection / shell focus 使用 blue-violet；header Check 仍用 `#4a90ff`  

### B. 字体与层级

- [ ] Index/About/Playground/AI/PP Display = Poppins（尺寸 token 可不同，字体族相同）  
- [ ] Body 默认 15px / 1.75 / `#b6bbc2`；WoW/Lab family 17px 仅该族  
- [ ] Eyebrow / meta 字距与大小符合 Caption 表  
- [ ] 无用颜色代替字号制造层级  

### C. 间距与版心

- [ ] 间距落在 `8/16/24/48/80/96/128`  
- [ ] Section 节奏 96 / 128；43/57 gutter 48–80  
- [ ] 文本 measure：1040 / 672 / 448；768 仅 heading wrap  
- [ ] Card padding 落在 Compact / Regular / Spacious 三档之一  

### D. 按钮与组件

- [ ] Primary CTA 为 pill 结构；M = `0.85rem 1.9rem`；radius 999  
- [ ] Icon gap 8px；hover -2px；active 0.97；arrow +3px  
- [ ] **未**用 blue-violet 实心填 pill  
- [ ] S/M/L 与 Primary/Secondary/Ghost/Icon 结构一致，仅 paint 随主题  
- [ ] Focus-visible 可见；reduced-motion 无位移  

### E. Theming

- [ ] 页面 accent 成对且页内一致  
- [ ] 未用全局 violet 覆盖 CA / E.ON / Index motif  
- [ ] Theme 构图例外有文档依据（Master § Theme / authored compositions）  
- [ ] 背景连续：换色仍属同一空间世界  

### F. 响应式与运动

- [ ] Breakpoints：360 / 640 / 768 /（899 仅 Playground WoW/AI）/ 1024 / 1280 — **未**把 899 当全站  
- [ ] 640 以下无 pin；接触区可点  
- [ ] Motion：fast 150–200 · interaction 320–350 · reveal 800；ease 出站后停  

### G. 禁止项快速扫

- [ ] 无 `--color-bg-deepseek` / `.btn-primary-kling`  
- [ ] 无第三全局 max-width  
- [ ] 无“为了统一”删掉 Caveat / Patrick Hand / case accent（手写与主题色）；**不要**恢复已移除的 Playfair Display  

---

## Appendix — Quick Reference

```
Fonts:     Poppins (UI + Display site-wide) · Caveat (E.ON hand only) · Patrick Hand (PP hand only)
Accent:    Blue-violet #8B5CF6 / hover #A78BFA  → signal only
Pad:       24px content · Wells 1440 / 1040
Space:     8 · 16 · 24 · 48 · 80 · 96 · 128
Pill M:    999px · padding 0.85rem 1.9rem · gap 0.5rem · 320ms
Ease:      cubic-bezier(0.22, 1, 0.36, 1)
```

**维护：** 改 live token 时先更新 Master，再同步本指南。本文件不授权改业务代码。

---

*Derived from `protoflio design-system-foundation-master.html` + `public/styles/shell-tokens.css` + `shell-components.css` + `global-header/`. Chinese copy for working preference; English token names retained for code alignment.*
