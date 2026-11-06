# 全站文案 review · 2026-10-30（修订版）

- **范围**：`~/Desktop/portfolio_perfect`（3000 上的版本，含未提交改动），EN + DE 全部页面。AI Companion Pet 是中文原型，不在范围内。
- **对照**：`docs/portfolio-consistency-guide.md` §5.2–5.5（含新增 §5.2a Tone of Voice），事实对照 Lu 自己的笔记 `content/ask-lu/`。
- **只出清单，没改页面。** 改不改等 Lu 选。行号是 2026-10-30 上午的状态；`public/home.html` 刚合进 #31，行号可能会移。
- **修订**：08:50 视觉校正 Codex 交叉审（另一家模型）后改了证据分级、收窄了 #3 #5 #8 #9 #10 #12 #14 #36 #43 等条，新增 N1–N4，修正 copycheck 计数（N5）。
- **排序**：P1 数字 / 事实 > P2 EN/DE 意思不一致或缺翻译 > P3 语气偏离 > P4 拼写格式。P1 内部先排「事实冲突」，再排「缺出处」。

### 证据分级（「证据」列，三选一）

| 分级 | 意思 | 怎么处理 |
|---|---|---|
| **事实冲突** | 页面和 Lu 的笔记、或同站另一处，说法对不上，有原文可对照 | 上线前改；建议文案按笔记写 |
| **缺出处待 Lu 确认** | 笔记里找不到出处。**不等于是错的**，也不能写成编造或假数据 | 问 Lu（见文末「要问 Lu 的事实」）；Lu 确认不了就用退路文案 |
| **措辞建议** | 事实没问题，是语言、语气、格式或缺翻译 | Lu 选；DE 改动先过母语审校 |

「交开发」= 问题在代码里（key 缺失、硬编码），文案已给出，由开发照抄。

路径简写：`ca.ts / eon.ts / home.ts / ai.ts / wow.ts / owg.ts / common.ts` 在 `app/i18n/messages/`；`about-me.ts` 在 `app/i18n/`；`header-copy.ts` 在 `global-header/lib/`；`party-planner-page.tsx` 在 `app/lab/party-planner/`。笔记 UBS = `content/ask-lu/cases/ubs-advisory.md`，EON = `content/ask-lu/cases/eon-solar.md`。

## 怎么查的

1. 逐个读 i18n 字典、`about-me.ts`、`header-copy.ts`、`public/*.html`、lab 页的 tsx。
2. 脚本对照：代码里用到的 417 个 key 在 EN / DE 字典里是否都有；EN / DE 字典结构是否一致（一致）；HTML 默认文本与 EN 字典是否同步（同步）。
3. `harness-core/scripts/copycheck/copycheck.py` 跑全部 550 条 EN/DE：**0 错误，30 警告**（见文末，已按原输出重新分类）。
4. 案例里的数字和说法逐条对照 `content/ask-lu/cases/*.md` 和 `experience.md`。
5. 交叉审：视觉校正 Codex 核对了 P1 全部源码位置和 43 条判断。

---

## P1 · 数字 / 事实

| # | 证据 | 页面 | 位置 | 现文案 | 问题 | 建议文案 | 语言 |
|---|---|---|---|---|---|---|---|
| 1 | 事实冲突 | CA 首屏 | `ca.ts:27` / `:209`；`ca/client-advisor/components/sessions/hero-section.tsx:128` | 30 min / saved on complex proposals | 笔记是 “up to about 30 minutes for a complex case”（UBS:26）。首屏删了 “up to”，变成每次都省 30 分钟。组件里 “30 min” 写死，只改字典不生效 | EN `Up to about 30 min` · DE `Bis zu etwa 30 Min.`（交开发：组件改用字典 `glance3Value`；见 N1） | EN+DE |
| 2 | 事实冲突 | CA 概念 | `ca.ts:126` / `:308` | 500+ client signals, one view. · 500+ Kundensignale, eine Sicht. | 站上其他地方 500+ 都指顾问人数，笔记也只支持这个（UBS:6）。这里同一个数字变成了“信号”数 | EN `Designed for 500+ advisors. One view.` · DE `Für über 500 Berater konzipiert. Alles in einer Ansicht.` | EN+DE |
| 6 | 事实冲突 | Header 菜单 | `header-copy.ts:20` / `:53` | EN `E-commerce · +300% conversion` · DE `E-Commerce · +300 % Conversion` | E.ON 是太阳能询价，数字是 lead conversion（EON:1、:6），不是电商 | EN `Solar · +300% lead conversion` · DE `Solar · +300 % Lead-Conversion` | EN+DE |
| 11 | 事实冲突 | Gratula | `party-planner-page.tsx:52` | Sat 14 Jun · 15:00 | 同页邀请卡（:264）和 Party details（:301）都是 24 May · 14:00 | `Sat 24 May · 14:00`（不补年份） | EN |
| N1 | 事实冲突（限定词丢失） | 首页、CA Outcome、E.ON | `home.ts:33` / `:110`；`public/home.html:1818`；`home.ts:23` / `:100`；`ca.ts:174` / `:356` | from a 5.1% baseline · ausgehend von 5,1 % · up to 30 min · Bis zu 30 Min. | 笔记是 “~5.1%”（EON:6）和 “up to about 30 minutes”（UBS:26）。页面把 “约” 去掉了。E.ON 案例页 `eon.ts:32` 已写 “about 5.1%”，首页不一致 | EN `from about 5.1% in Germany` · DE `ausgehend von rund 5,1 % in Deutschland`；EN `Up to about 30 min` · DE `Bis zu etwa 30 Min.`（HTML 默认文本同步改） | EN+DE |
| N4 | 事实冲突 | CA Outcome、首页 | `ca.ts:170–173` / `:352–355`；`ca/ca-session-07-the-outcome/components/sessions/session-07-outcome.tsx:88`（写死）；`home.ts:23` / `:100` | Average feedback from testing · 5–10 min saved per client on information gathering · Durchschnittliches Feedback aus dem Test | 笔记：5–10 分钟是 **simple case**，最多约 30 分钟是 complex case，**平均**是每次互动 10 分钟以上（UBS:26）。页面把区间和上限放在 “Average” 下，又把 simple case 写成 “information gathering per client” | 标签 EN `Concept-test feedback` · DE `Rückmeldungen aus Konzepttests`；m1Label EN `Saved on a simple case.` · DE `Gespart bei einem einfachen Fall.`。为什么写成 information gathering：问 Lu（Q11）。交开发：组件 :88 改用字典 | EN+DE |
| 5 | 缺出处待 Lu 确认 | CA 概念 | `ca.ts:118–121` / `:300–303` | I argued for the surface layer instead… That case won the stakeholder over. | 笔记写的是 workshop 比较三条路、**团队**选了连接层（UBS:19），最终把 AI 放进现有 widgets（UBS:20）。“我说服了 stakeholder” 这段情节笔记里没有。两件事可能是不同阶段，**不能说页面和笔记相反** | 删掉说服情节，按笔记写（草稿）：<br>EN `In a stakeholder workshop, with frontline advisors in the room, we weighed three directions: a new dashboard, fixing each tool, or a connecting layer. The team chose the layer. The final concept puts AI into the widgets advisors already use, not onto a new screen.`<br>DE `In einem Stakeholder-Workshop, mit Beratern aus der Praxis im Raum, haben wir drei Richtungen abgewogen: ein neues Dashboard, jedes Tool einzeln verbessern oder eine verbindende Ebene. Das Team entschied sich für die Ebene. Das finale Konzept bringt KI in die Widgets, die Berater bereits nutzen, statt auf einen neuen Bildschirm.`<br>（#42 里的 “jonglierten” 一句随这段一起重写） | EN+DE |
| 4 | 缺出处待 Lu 确认 | CA 调研 | `ca.ts:59` / `:241` | I interviewed 17 client advisors, mostly in Switzerland Wealth Management, plus EMEA and APAC | 笔记只有 “Contributed to advisor interviews”（UBS:14），团队有 UX researcher（UBS:4）。“17” 和地区分布查不到。不能证明 Lu 没亲自访谈，但也不支持她独自访谈 17 人 | 先问 Lu（Q2）。退路：EN `I contributed to interviews with client advisors.` · DE `Ich habe an Interviews mit Kundenberatern mitgewirkt.` | EN+DE |
| N2 | 缺出处待 Lu 确认 | CA Outcome | `ca.ts:165` / `:347`；`ca.ts:179` / `:361`；`session-07-outcome.tsx:61`（写死） | I led concept testing with advisors — including the stakeholder who’d pushed for the dashboard · Feedback was consistent across EMEA and CH… APAC leaned toward speed | 笔记有 concept testing（UBS:26），但没写 Lu 主导，也没有 EMEA/CH/APAC 的结论。`experience.md:8` 的地区属于更宽的 wealth-advisor tools 成绩，不能直接当本概念的测试依据 | 先问 Lu（Q3、Q4）。退路：EN `Concept testing with advisors showed where the model saved time in real workflows.` · DE `Konzepttests mit Beratern zeigten, wo das Modell in echten Workflows Zeit spart.`；地区脚注整条删掉 | EN+DE |
| N3 | 缺出处待 Lu 确认 | CA 调研 | `ca.ts:53–55` / `:235–237` | “I know the data exists — it’s just hard to find.” · “The client calls, and I have seconds to answer…” | 标为 Advisor quotes，笔记里查不到。笔记里唯一的顾问原话是 “I already have ten tools. I don’t need an eleventh.”（UBS:19） | 先问 Lu（Q5）。退路：换成笔记里那句 EN `“I already have ten tools. I don’t need an eleventh.”` · DE `„Ich habe schon zehn Tools. Ich brauche kein elftes.“`，或删掉引语块 | EN+DE |
| 3 | 缺出处待 Lu 确认 | CA 首屏 + Outcome | `ca.ts:26`、`:177` / `:208`、`:359` | client advisors in trials and target base · Berater in Trials und Zielgruppe | 笔记有 concept testing（UBS:26），所以“有测试”没问题；问题是读者会以为 500+ 人都参加了测试，人数归属不明。DE 两处一处 Client Advisors 一处 Berater | EN `Designed for 500+ client advisors` · DE `Für über 500 Berater konzipiert`（两处统一）。若测试人数可以公开：问 Lu（Q6） | EN+DE |
| 8 | 缺出处待 Lu 确认 | E.ON 调研 / Journey | `eon.ts:45`（alt 文本）、`:51` / `:206`、`:212` | 66.7% of homeowners are aged 40+ · Homeowners usually decided within 24 hours — but over 85% dropped off at Calculate | 三个数字笔记里查不到。85% 流失和“约 5% 走完”（EON:10）**不矛盾**，可以同时成立 | 先问 Lu（Q7）。退路（只用 EON:10 的内容）：EN `Most people didn’t know their roof size or electricity use, planned to “do it later”, and left. Only around 5% made it through.` · DE `Die meisten kannten Dachgröße oder Stromverbrauch nicht, wollten es „später machen“ und brachen ab. Nur rund 5 % kamen bis zum Ende.`；alt 去掉 66.7%，只描述画面 | EN+DE |
| 9 | 缺出处待 Lu 确认 | E.ON 测试 | `eon.ts:149–151` / `:311–313` | “It was so much easier than I expected.” — Sarah K., Germany | 笔记里没有这条引语。**只删署名不够**：没出处的引语去掉名字仍是没出处的引语 | 先问 Lu（Q8）。退路：删掉整条，或换成笔记里的研究发现：EN `Home visits showed what people wanted most: to understand it easily.` · DE `Hausbesuche zeigten, was die Menschen am meisten wollten: es einfach zu verstehen.`（EON:14） | EN+DE |
| 10 | 缺出处待 Lu 确认 | About 数据 | `public/about.html:731–732`；`about-me.ts:28–29` / `:58–59` | 20+ Cases · 30+ Events Co-Hosted · DE: Case Studies | 两个数字笔记里查不到。**站上只有两篇 case study 不能推出 20+ 是假的**：职业累计项目数和公开案例数是两回事。EN “Cases” 和 DE “Case Studies” 口径也不同 | 先问 Lu 口径（Q9）。若指项目：EN `Projects` · DE `Projekte`。退路：去掉这两个数字 | EN+DE |
| 7 | 缺出处待 Lu 确认 | E.ON 结果 | `eon.ts:21`、`:158` / `:182`、`:320` | Lead conversion uplift · Mehr Lead-Conversion | 数字有出处（EON:6），但标签下没有时间窗，读者没法判断。不需要把全部条件塞进短标签 | 标签不动，紧挨着加说明：EN `In the first two months after launch` · DE `In den ersten zwei Monaten nach dem Start`（证据：措辞建议；放 P1 是因为跟数字有关） | EN+DE |
| 14 | 缺出处待 Lu 确认 | AI Workflow | `ai.ts:56–57` / `:120–121` | Days, not weeks · Directions become testable in a fraction of the usual time. | 速度比较没有基线；只改标题，正文仍有 “fraction of the usual time” | 先问 Lu（Q10）。退路：标题 EN `From idea to testable prototype` · DE `Von der Idee zum testbaren Prototyp`；正文去掉比较 | EN+DE |
| 15 | 缺出处待 Lu 确认 | Way of Work | `wow.ts:77–79` / `:159–161` | Updated monthly · Monatlich aktualisiert | 是对读者的承诺，不能判为错。保留就要有人每月更新 | 问 Lu（Q12）。退路：标签和正文里关于更新频率的说法一起删 | EN+DE |
| 13 | 缺出处待 Lu 确认（Gratula） | Gratula | `party-planner-page.tsx:102`；:88、:98、:104 | Guest data is removed after 30 days. · 只有主人可见 / 来宾互不可见 | 隐私承诺要和 Gratula 实际功能一致；30 天从什么时候算没写。本机没有 Gratula 仓库，查不到 | 问 Gratula 项目经理（Q13），不问 Lu 本人 | EN |
| 12 | 缺出处待确认（示例口径，**不阻断上线**） | Gratula | `party-planner-page.tsx:325–340`、`:370`、`:378` | 4 coming · 3 waiting · 1 declined · Cake 18 servings · Party bags 12 ready | 交叉审后降级：约 5 个孩子配 18 份蛋糕、12 个礼品袋，可能含家长、待回复、备份，**不能判为数字错误**，也不能凭空改成 5 袋 / 10 份。原型讲“自动更新”，读者可能看不懂口径 | 问 Lu 这几个数想表达什么（Q14）。退路：不动数字，在蛋糕旁加 EN `incl. parents` | EN |

## P2 · EN / DE 意思不一致或缺翻译

| # | 证据 | 页面 | 位置 | 现文案 | 问题 | 建议文案 | 语言 |
|---|---|---|---|---|---|---|---|
| 16 | 措辞建议 | 首页 Playground（#31 新加） | `public/home.html:1832–1837`（含 3 个图片 alt） | Playground / Playground · 三张卡的标题和描述 | 没有 `data-i18n`，DE 页面显示英文；alt 也是英文。eyebrow 和 h2 都是 “Playground”，重复。Gratula 的 “they’ll” 指谁不清楚 | eyebrow EN `Side projects` · DE `Nebenprojekte`；h2 保留 `Playground`。<br>Weather Aquarium：EN 不变 · DE `Eine 2,5D-Wetterwelt fürs iPad, mit der Kinder den Tag verstehen und neue Wörter entdecken.`<br>AI Pet：EN 不变 · DE `Ein kleiner Freund, der zuhört und Geschichten erzählt – zum gemeinsamen Essen und um ein paar Wörter Französisch zu lernen.`<br>Gratula：EN `From ideas to invitations, a simpler way to plan a party your child will remember.` · DE `Von der Idee bis zur Einladung: Planen Sie leichter einen Kindergeburtstag, an den sich Ihr Kind lange erinnert.`<br>交开发：加 key，alt 一起翻 | EN+DE |
| 17 | 措辞建议 | CA Outcome / 结尾 | `session-07-outcome.tsx:95`、`:103`、`:112`；`ca/client-advisor/components/closing-section.tsx:16` | （key 不存在）`ca.outcome.m1Alt` 等 4 个 | 字典没有这 4 个 key，`t()` 回退成 key 本身（`app/i18n/use-translation.tsx:70`），读屏会读出 “ca.outcome.m1Alt” | 有条件：图里没有旁边文字之外的信息 → 交开发改 `alt=""`；有独有信息 → 我写描述。需开发或 Lu 看图确认，不能只凭“旁边有文字”判定 | EN+DE |
| 18 | 措辞建议 | CA 首屏 | `hero-section.tsx:124`、`:128` | 5–10 min · 30 min（写死） | DE 页面也显示 “min”，Outcome 区 DE 是 “Min.”，同页不一致 | 交开发：改用字典 `glance1Value` / `glance3Value`；与 #1 一起改 | DE |
| 19 | 措辞建议 | 首页经历、AI Workflow | `home.ts:131`、`:137`、`:143`；`ai.ts:78` | Senior Service Designer / UX Designer · Senior Product Designer · Product Designer — eigenständig | §5.4 规定 DE 职位用女性形式，这几处没改 | `Senior Service Designerin / UX Designerin` · `Senior Product Designerin` · `Product Designerin — eigenständig`。`home.ts:149` 的 Usability Engineer：保留英文原职称，**作为 §5.4 的例外写进规范**（需 Lu 确认） | DE |
| 20 | 措辞建议 | Way of Work | `wow.ts:88–110`、`:106`、`:122`、`:124`、`:130`、`:134`、`:142`、`:148` | Pressure-test · Claude, text reasoning · Review checkpoint · System Setup · Static Screens Overview · Production Code · AI DESIGN PROCESS · 01 Curiosity… | DE 页面里这些仍是英文；同页 `playbookMark` 已经译成 “Design × KI”，标题却是 “AI DESIGN PROCESS” | Lu 定装饰性 whisper 词是否刻意保留英文；功能性标签分开处理。若翻译：`Prüfpunkt` · `KI-DESIGNPROZESS` · `Claude, Textarbeit` · `System-Setup` · `Übersicht der Screens` · `Produktionscode`。“Pressure-test” 按上下文译，不统一成 Stresstest | DE |
| 21 | 措辞建议 | Header 菜单 | `header-copy.ts:24` | Sparplan · Design system | EN 菜单里出现德语 “Sparplan” | EN `Savings plan · Design system`（DE 保持 `Sparplan · Designsystem`） | EN |
| 22 | 措辞建议 | Header 菜单 | `header-copy.ts:56` | Stimme · Hardware | “Stimme” 是人的嗓音，这里指交互类别 | DE `Sprachinteraktion · Hardware`（Sprachassistent 会限定成助手产品，需与实际功能相符） | DE |
| 23 | 措辞建议 | 首页 E.ON 卡 | `home.ts:108` | Eine komplexe Investition, leichter zu verstehen und zu vertrauen. | “einer Investition vertrauen” 要第三格，结构不自然。原建议 “vertrauenswürdiger” 像在给投资本身背书 | `Eine komplexe Investition – leichter zu verstehen, mit mehr Sicherheit bei der Entscheidung.` | DE |
| 24 | 措辞建议 | Weather Aquarium 页 | `app/lab/weather-aquarium/weather-aquarium-page.tsx:207–228`、`:248–253` | 正文和控件硬编码英文 | §5.1 的“仅英文”列表里没有这页，DE 用户看到英文界面。**不是全页没有 DE**：:12–35 已有词汇演示的中英德法字典，但词汇切换不等于页面本地化 | Lu 定：翻译界面（我来写 DE），或把它加进 §5.1 的“仅英文”列表 | DE |
| 25 | 措辞建议 | metadata | `app/layout.tsx:23`（根布局）；另有路由覆盖，如 `app/EON/layout.tsx:14`、`app/client-advisory/layout.tsx:15` | Design leadership across product and service — from early-stage strategy to production-ready systems. | 根布局 description 只有英文，定位也和首页不同（见 #27）。不能用根布局一句代表全站；搜索引擎最终显示什么从源码也定不了 | 逐路由列 metadata，等 #27 定了再写 EN/DE | DE |

## P3 · 语气偏离（对照 §5.2a）

| # | 证据 | 页面 | 位置 | 现文案 | 问题 | 建议文案 | 语言 |
|---|---|---|---|---|---|---|---|
| 26 | 措辞建议 | CA Shift | `ca.ts:86` / `:268` | Assembled before he asks. · Bereit, bevor er fragt. | “he” 指 Marco，但 Marco 在 :91 / :273 才出现 | EN `Assembled before the advisor asks.` · DE `Bereit, bevor der Berater fragt.` | EN+DE |
| 27 | 措辞建议 | 全站定位 | `home.ts:3–4`、`:49`；`about-me.ts:5`；`app/layout.tsx:23` | Product & Service Designer · Product designer · AI-native Product Designer · Designer. Builder. Design Lead. · Design leadership… | 称谓多，值得定一个主定位。但 Product / Service Designer / Design Lead **不天然矛盾**，笔记本身支持多种职位与职责（`experience.md:6–14`、`availability.md:6`）。“A human-led design practice” 是方法描述，不算职位 | 请 Lu 选主称呼（我建议 `Product & service designer`，Lead 留给案例页的项目角色），其他地方跟着改 | EN+DE |
| 28 | 措辞建议 | About | `about-me.ts:7` / `:37`；`public/about.html:662` | …making complex work more effortless, efficient, and human. | “more effortless” 别扭；copycheck 标了 effortless / mühelos | EN `I lead AI-native product and service design, so complex work takes less effort and feels more human.` · DE `Ich leite KI-natives Produkt- und Service-Design, damit komplexe Arbeit weniger Aufwand erfordert und menschlicher wird.`（“menschlicher” 仍偏抽象，随 #27 一起收紧） | EN+DE |
| 29 | 措辞建议 | Way of Work | `wow.ts:5–6` / `:85` | A more human way to build. From curiosity to impact. A structured, iterative process… | 前两句是定位性文案，删不删是编辑选择 | EN `A structured, iterative process for complex products, from the first question to launch.` · DE `Ein strukturierter, iterativer Prozess für komplexe Produkte – von der ersten Frage bis zum Launch.`（“launch” 有出处：`wow.ts:63`、`:145`）。或保留 “A more human way to build.” 作开头，保持方法页的个人语气 | EN+DE |
| 30 | 措辞建议 | Way of Work 标题 | `wow.ts:3` / `:82`；`app/lab/way-of-work/layout.tsx:9` | Lu — Human × AI · Lu — Human × AI Practice | 页面叫 Way of Work，浏览器标题却是 Human × AI | `Lu — Way of Work`（EN/DE 相同）。Agent Monitor 是独立路由（`app/lab/agent-monitor/page.tsx:5–9`），**不跟着改** | EN+DE |
| 31 | 措辞建议 | Gratula 结尾 | `party-planner-page.tsx:532` | Happier planning. Brighter childhoods. | “Brighter childhoods” 说大了 | `Less planning. More party.` | EN |
| 32 | 措辞建议 | Way of Work | `wow.ts:111` | Shippen / Verbessern | 德语里硬拼英文词，§5.4 要避免 | `Ausliefern / Verbessern`，或面向招聘读者用 `Veröffentlichen / Verbessern` | DE |
| 33 | 措辞建议 | E.ON meta | `eon.ts:166` | …einer reibungsreichen Solarrechner-Strecke… | “reibungsreich” 不常用，整段像直译 | `…eines umständlichen Solarrechners…`（母语审校） | DE |

## P4 · 拼写和格式

| # | 证据 | 页面 | 位置 | 现文案 | 问题 | 建议文案 | 语言 |
|---|---|---|---|---|---|---|---|
| 34 | 措辞建议 | 多页 | `common.ts:5`；`home.ts:49`；`ai.ts:29`、`:33`、`:45`、`:49`、`:50`；`ca.ts:97`、`:165`、`:182`；`eon.ts:43`、`:72`、`:83`、`:88`、`:98`；`about-me.ts:73`；`public/about.html:755` | Let's · I'm · isn't · It's · can't … | §5.3 要求弯引号 | 展示文案里的 ' 换成 ’。**只改文字里的撇号，不改 TS 字符串定界符** | EN |
| 35 | 措辞建议 | 多页 | `home.ts:46`；`wow.ts:71`；`eon.ts:138`；`app/lab/party-planner/layout.tsx:18`；`weather-aquarium-page.tsx:272`、`:359` | Product, service and UI · …local suppliers and the party-day schedule … | 缺 Oxford comma（§5.3） | 在 “and” 前加逗号 | EN |
| 36 | 措辞建议 | 多页 | 按钮：`owg.ts:9`（Open Prototype）；标签：`owg.ts:4`；`home.ts:45`；`eon.ts:11`；`about-me.ts:11–12`、`:27`、`:29` | Open Prototype · Concept Project · My Experience · My Role · Tea Time · Swim to Reset · Years in Design · Events Co-Hosted | **按钮** Open Prototype 违反 §5.3（按钮 / 链接用 sentence case）。**标签**不在 §5.3 现有范围里，不算违规；但 CA 写 “My role”、E.ON 写 “My Role”，同类不一致 | 按钮：`Open prototype`。标签：先请 Lu 定 §5.3 是否扩到标签；扩的话统一为 `Concept project` · `My experience` · `My role` · `Tea time` · `Swim to reset` · `Years in design` · `Events co-hosted` | EN |
| 37 | 措辞建议 | About | `about-me.ts:9` / `:39`；`public/about.html:664`、`:986` | Curious by nature, Always in progress. | 逗号后大写 | `Curious by nature, always in progress.` · `Von Natur aus neugierig, immer in Bewegung.`（保留逗号，代码按逗号换行） | EN+DE |
| 38 | 措辞建议 | 首页 | `home.ts:78–79` | Produkt- & Service-Designerin · Product Designerin | 同页两种写法。原建议 “Product & Service Designerin” 仍是英德混合 | 德语化：`Produkt- und Service-Designerin`；或保留英文职位并写成 §5.4 例外（跟 #27 一起定） | DE |
| 39 | 措辞建议 | E.ON | `eon/e-on-09/components/motion/count-up.tsx:83`、`:85` | +300%（写死，可见文本和读屏文本） | DE 规则要 “300 %” | 交开发：DE 显示和读屏都用 `+300 %` | DE |
| 40 | 措辞建议 | Off We Go | `owg.ts:24`、`:26` | Off We Go Prototyp öffnen · Off We Go Reiseplanungsprototyp | 德语复合词要加连字符 | `Off-We-Go-Prototyp öffnen` · `Reiseplanungsprototyp von Off We Go` | DE |
| 41 | 措辞建议 | E.ON | `eon.ts:298` | smartem Energie-System | 书写风格统一项，不是语义错误 | `smartem Energiesystem` | DE |
| 42 | 措辞建议 | CA | `ca.ts:301` | Berater jonglierten bereits 10+ Systeme | 搭配更顺的写法 | `mit über 10 Systemen jonglieren`；随 #5 整段重写，不单独改 | DE |
| 43 | 缺出处待 Lu 确认 | AI Workflow | `ai.ts:39` / `:103` | Figma · Canva · Paico | 只查了本地来源，没查外部产品名。**不能从笔记里没有推出是拼错** | 问 Lu 工具名和链接（Q15） | EN+DE |

---

## 要问 Lu 的事实（15 条）

项目经理逐条问。每条：一句问题 · 页面位置 · Lu 确认不了时的退路文案。Q13 问 Gratula 项目经理。

| Q | 问题 | 页面位置 | 退路文案（Lu 确认不了时） | 对应条目 |
|---|---|---|---|---|
| Q1 | UBS 项目里，是你说服 stakeholder 选了连接层，还是 workshop 里团队一起选的？ | CA 概念 · `ca.ts:118–121` / `:300–303` | 按笔记写团队选择，删说服情节（#5 的 EN/DE 草稿） | #5 |
| Q2 | CA 的顾问访谈：一共多少人？是你主持还是参与？分布在 CH / EMEA / APAC 对吗？ | CA 调研 · `ca.ts:59` / `:241` | EN `I contributed to interviews with client advisors.` · DE `Ich habe an Interviews mit Kundenberatern mitgewirkt.`（不写数字和地区） | #4 |
| Q3 | CA 的概念测试是你主导的吗？推 dashboard 的那位 stakeholder 参加了吗？ | CA Outcome · `ca.ts:165` / `:347` | EN `Concept testing with advisors showed where the model saved time in real workflows.` · DE `Konzepttests mit Beratern zeigten, wo das Modell in echten Workflows Zeit spart.` | N2 |
| Q4 | “EMEA 和 CH 反馈一致，APAC 更看重速度” 这个结论来自哪里？ | CA Outcome 脚注 · `ca.ts:179` / `:361` | 删掉脚注 | N2 |
| Q5 | CA 的两条顾问引语是访谈原话吗？可以公开吗？ | CA 调研 · `ca.ts:53–55` / `:235–237` | 换成笔记里的 “I already have ten tools. I don’t need an eleventh.” / „Ich habe schon zehn Tools. Ich brauche kein elftes.“，或删掉引语块 | N3 |
| Q6 | 500+ 是目标顾问数，还是真的有 500+ 人参加了测试？测试人数能公开吗？ | CA 首屏 + Outcome · `ca.ts:26`、`:177` / `:208`、`:359` | EN `Designed for 500+ client advisors` · DE `Für über 500 Berater konzipiert` | #3 |
| Q7 | E.ON 的 66.7% 40 岁以上、24 小时内决定、85% 在 Calculate 流失，出处是什么？ | E.ON 调研 / Journey · `eon.ts:45`、`:51` / `:206`、`:212` | EN `Most people didn’t know their roof size or electricity use, planned to “do it later”, and left. Only around 5% made it through.` · DE `Die meisten kannten Dachgröße oder Stromverbrauch nicht, wollten es „später machen“ und brachen ab. Nur rund 5 % kamen bis zum Ende.` | #8 |
| Q8 | “It was so much easier than I expected.” — Sarah K. 是真实的用户原话吗？ | E.ON 测试 · `eon.ts:149–151` / `:311–313` | 删掉整条，或换成 EN `Home visits showed what people wanted most: to understand it easily.` · DE `Hausbesuche zeigten, was die Menschen am meisten wollten: es einfach zu verstehen.` | #9 |
| Q9 | About 的 20+ 和 30+ 分别数的是什么（项目？案例？活动？），从哪年算起？ | About · `public/about.html:731–732`；`about-me.ts:28–29` / `:58–59` | 去掉这两个数字 | #10 |
| Q10 | AI Workflow 的 “Days, not weeks” 有具体项目可以对比吗？ | AI Workflow · `ai.ts:56–57` / `:120–121` | EN `From idea to testable prototype` · DE `Von der Idee zum testbaren Prototyp`；正文去掉速度比较 | #14 |
| Q11 | CA 的 “5–10 min” 在笔记里是 simple case，页面写成 information gathering per client，哪个对？ | CA Outcome、首页 · `ca.ts:171–172` / `:353–354`；`home.ts:23` / `:100` | EN `5–10 min on a simple case, up to about 30 min on a complex one.` · DE `5–10 Min. bei einem einfachen Fall, bis zu etwa 30 Min. bei einem komplexen.` | N4、N1 |
| Q12 | Way of Work 的 playbook 你会每月更新吗？ | Way of Work · `wow.ts:77–79` / `:159–161` | 删掉更新频率（标签和正文一起） | #15 |
| Q13 | （问 Gratula 项目经理）来宾数据 30 天后删除，从哪天开始算？“只有主人可见 / 来宾互不可见” 是现有功能吗？ | Gratula · `party-planner-page.tsx:88`、`:98`、`:102`、`:104` | 删掉 “after 30 days”，只写 EN `Guest data is removed after the party.`——**这也要 Gratula 确认**，确认不了就整句删 | #13 |
| Q14 | Gratula 示例里 18 份蛋糕、12 个礼品袋，是按几个孩子、几个家长算的？ | Gratula · `party-planner-page.tsx:325–340`、`:370`、`:378` | 不动数字，蛋糕旁加 EN `incl. parents` | #12 |
| Q15 | AI Workflow 工具栏里的 “Paico” 是哪个工具？有链接吗？ | AI Workflow · `ai.ts:39` / `:103` | 删掉 Paico，只留 Figma · Canva | #43 |

另有 4 件需要 Lu **选**（不是事实）：#27 主称呼、#20 whisper 词留不留英文、#24 Weather Aquarium 翻不翻、#36 sentence case 是否扩到标签。§5.2a 的两条提案规则也等 Lu 确认。

---

## copycheck 警告（30 条，0 错误）

命令：`python3 harness-core/scripts/copycheck/copycheck.py --pairs strings.json`（字典导出 550 条，项目没有 `copy-rules.json`，没带 `--rules`）。原输出：`~/.buzz/.scratch/copyrev/copycheck.out`。

**N5 修正**：上一版表里写 “连续空格 18 条”，原输出是 **16 条**（8 个 whisper key × EN/DE）；“effortless / mühelos” 2 条又和 vocab 分开重复列了一次，所以表内相加是 32。按原输出按规则重分如下，合计 30，和脚本结尾 “0 个错误，30 个警告” 一致。本次没有重跑脚本，字典也没改过。

**修订版新建议稿**：22 组 EN/DE 新文案（#1 #2 #3 #4 #5 #6 #7 #8 #9 #14 #16 #22 #23 #28 #38 #40、N1–N4、Q11）单独跑 copycheck：**0 错误，0 警告**（2026-10-30）。

| 规则 | 条数 | 涉及 | 处理 |
|---|---|---|---|
| space 连续空格 | 16 | `wow.whisperCuriosity / Ideas / Impact / JourneyMark / SystemMark / StaticMark / PrototypeMark / ProductionMark`，EN+DE 各 1 | 保留：装饰编号和词之间是刻意的两个空格 |
| en-vocab | 8 | “journey” 7 条（`wow.journeyLabel`、`wow.journeyBody`、`wow.whisperJourneyMark`、`eon.description`、`eon.overview.body`、`eon.audience.marketBody`、`eon.journey.eyebrow`） | 保留：UX 术语 journey mapping / customer journey |
| | | “effortless” 1 条（`aboutMe.subtext`） | **改**，见 #28 |
| dash 一条两个破折号 | 4 | `ca.principles.p1Body`、`ca.outcome.body`，EN+DE | 保留：成对破折号是插入语。`ca.outcome.body` 若按 N2 重写会自然消失 |
| de-vocab | 2 | “maßgeschneidert” 1 条（`ca.concept.mockups.review-execute`，alt 文本） | 保留：对应 EN “tailored”，银行语境里是实指 |
| | | “mühelos” 1 条（`aboutMe.subtext`） | **改**，见 #28 |

## 母语审校清单（de-DE，给 Lu 转母语的人）

本次没有改页面，下面是**建议的新 DE 文案**，采用前请母语的人看：

- #1 / N1 `Bis zu etwa 30 Min.` · `ausgehend von rund 5,1 % in Deutschland`
- #2 `Für über 500 Berater konzipiert. Alles in einer Ansicht.`
- #6 `Solar · +300 % Lead-Conversion`
- #5 整段草稿（`In einem Stakeholder-Workshop, mit Beratern aus der Praxis im Raum, …`）
- #4 / Q2 退路 `Ich habe an Interviews mit Kundenberatern mitgewirkt.`
- #3 `Für über 500 Berater konzipiert`
- #8 退路 `Die meisten kannten Dachgröße oder Stromverbrauch nicht, wollten es „später machen“ und brachen ab. Nur rund 5 % kamen bis zum Ende.`
- #9 退路 `Hausbesuche zeigten, was die Menschen am meisten wollten: es einfach zu verstehen.`
- #7 `In den ersten zwei Monaten nach dem Start`
- #14 退路 `Von der Idee zum testbaren Prototyp`
- N2 退路 `Konzepttests mit Beratern zeigten, wo das Modell in echten Workflows Zeit spart.`
- N3 退路 `„Ich habe schon zehn Tools. Ich brauche kein elftes.“`
- N4 `Rückmeldungen aus Konzepttests` · `Gespart bei einem einfachen Fall.` · Q11 `5–10 Min. bei einem einfachen Fall, bis zu etwa 30 Min. bei einem komplexen.`
- #16 `Nebenprojekte` · `Eine 2,5D-Wetterwelt fürs iPad, mit der Kinder den Tag verstehen und neue Wörter entdecken.` · `Ein kleiner Freund, der zuhört und Geschichten erzählt – zum gemeinsamen Essen und um ein paar Wörter Französisch zu lernen.` · `Von der Idee bis zur Einladung: Planen Sie leichter einen Kindergeburtstag, an den sich Ihr Kind lange erinnert.`
- #19 `Senior Service Designerin / UX Designerin` · `Senior Product Designerin` · `Product Designerin — eigenständig`
- #20 `Prüfpunkt` · `KI-DESIGNPROZESS` · `Claude, Textarbeit` · `System-Setup` · `Übersicht der Screens` · `Produktionscode`
- #22 `Sprachinteraktion · Hardware`
- #23 `Eine komplexe Investition – leichter zu verstehen, mit mehr Sicherheit bei der Entscheidung.`
- #26 `Bereit, bevor der Berater fragt.`
- #28 `…damit komplexe Arbeit weniger Aufwand erfordert und menschlicher wird.`
- #29 `Ein strukturierter, iterativer Prozess für komplexe Produkte – von der ersten Frage bis zum Launch.`
- #32 `Ausliefern` 或 `Veröffentlichen`
- #33 `eines umständlichen Solarrechners`
- #38 `Produkt- und Service-Designerin`
- #40 `Off-We-Go-Prototyp öffnen` · `Reiseplanungsprototyp von Off We Go`
- #42 `mit über 10 Systemen jonglieren`
- §5.2a 里的 DE 正反例和示范句
