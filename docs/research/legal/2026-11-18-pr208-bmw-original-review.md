# PR #208 (032ee1f) BMW 页按原稿重做：法务检查（不是法律意见，待确认 = 建议问律师）

Basis: 我逐张打开了 PR 里 22 张图（git fetch pull/208/head），并读了 BMWOriginal.tsx。

| 项目 | 问题 | 依据 | 阻塞? |
|---|---|---|---|
| 首图 i4-alpine-sunset.webp | 不是新图。11-12 审查已查明它来自 ix3 派生场景，并以 BMW 官方 i4 照片为生成输入，权利依据两处缺失。换成它不解决原稿首图的权利问题，只是换了一个同样没有依据的图 | docs/research/legal/2026-11-12-bmw-live-asset-audit.md（i4-alpine 一行）；PR #178 审查评论；UrhG/URG 官方照片权利 待确认 | **是** |
| 16 个 icn-*.png（160–400px 图标） | 单色图标，无第三方标记，作者为 Lu（原稿自制，Lu 须确认是自己画的、不是图标库下载） | 目检 | 否（Lu 确认来源后） |
| design-library.gif | 通用组件示意（"This is an active tab" + Manage Overrides 面板），无客户标记。面板样式模仿设计工具界面，非标志 | 目检 3 帧 | 否 |
| logic-diagram.png | 通用流程图，FEATURE 占位，无客户标记；含 "iPhone" 一词（描述性） | 目检 | 否 |
| modal.png | 通用评分弹窗，含 Apple emoji 样式的笑脸（Apple Color Emoji 为 Apple 字体资产，授权限于 Apple 平台使用；截图转用 待确认） | 目检；Apple Color Emoji 授权 待确认 | 低，建议换成自绘笑脸 |
| confluence.png | 含 Atlassian Confluence 官方 logo。叙述性提及软件可接受，但不要暗示合作或认可；Atlassian 商标政策 待确认 | 目检；Atlassian 商标使用指南 | 低，可换成纯文字 "Confluence" |
| w3c.png | 蓝色文字 "W3C" 仿官方样式的卡片。标题 "W3C Web Content Accessibility Guidelines" 像是 W3C 页面，实为 Lu 自制示意 | W3C 标志使用政策 待确认 | 低，建议卡片标题改为 "WCAG checklist (mock)" |
| 客户名 "Giant Automotive Enterprise" + 页面 /bmw-design-system + "München" + "digital key / WWDC 2020" | 原稿匿名；本站同一页的 URL、菜单名（BMW Design System）已指明 BMW，匿名措辞和实际标注矛盾。原稿 "Due to the confidential reason" 一句也与站上 BMW 标注冲突 | OR 321a Abs.4、UWG 6（待确认）；Lu 与 BMW 的保密条款我没有看到 | 否，但需 Lu 确认保密条款；二选一：站上也匿名（URL/菜单改名）或删掉 "Due to the confidential reason" |
| 文案提到 Camilo、Abstract、JIRA、Microsoft、Google | 工具/公司名，叙述性提及 | 无 | 否 |

## 结论
- 首图：**不通过**。需要一张有权利依据的图（Lu 自己的、授权的、或纯示意）。我没有批准 i4-alpine 的依据。
- 其余 21 张：可上线，若 Lu 确认图标是自画；confluence/w3c/modal 三张建议按上面改。
- 不贴 "法务通过 032ee1f"。首图换好后重审新 sha。

## 复审 d13a4c9（2026-11-18 夜）
- 页面（BMWOriginal.tsx）不再引用 i4-alpine-sunset.webp；首图已按 PM #18392 移除。仅剩未被任何页面引入的旧文件 BMWOneSource.tsx（已在 main，非本 PR 改动）。上一轮的阻塞项解除。
- 其余图片同上一轮结论（通用示意图，无客户标识）；前提：icn-* 图标是 Lu 自绘。
- 待确认（不阻塞合并，建议问律师/看合同）：页面写匿名 "Giant Automotive Enterprise"，但 URL/菜单有 BMW，另有 "München"、Apple WWDC 2020 数字钥匙。Lu 需确认 BMW 协议里的保密条款（OR 321a Abs.4；UWG 6）。
- 低风险建议：confluence.png（Atlassian 标）、w3c.png、modal.png（Apple emoji）。

## 复审 6a0e58c（2026-11-19，新增 Key screens 2×2）
相对 4e879b9 只改 TSX/CSS，没有新媒体文件；但新栏目引用 4 张已在 main 的图，上两轮没作为展示内容审过。我逐张打开：
| 图 | 内容 | 问题 | 阻塞? |
|---|---|---|---|
| i4-services-600.webp | 真实 My BMW App 截图：车牌「M·KB184E」清晰可读、车型 i4 eDrive40、电量 72%/263km、时间戳 4/18/2025 13:22 | 车牌+车辆状态可识别到具体车主/车辆（个人资料，FADP Art.5 lit.a；GDPR Art.4(1)，待确认）；BMW App UI、BMW 字体与车图属 BMW。11-12 审查已标待确认，一直没给依据 | **是**：至少打码车牌；展示依据待确认 |
| i4-complete.png | 真实 App 截图，i4 eDrive35，18/09/2026 | BMW UI 与车图；无车牌；展示依据待确认 | 待确认 |
| engine-disclosure.png | 真实 App 免责弹窗，含 BMW 文案 | BMW 文案/UI；展示依据待确认 | 待确认 |
| 05.webp | 看起来是 BMW 官方 App Store/营销图（标题「BMW SERVICES & STORE」+ 设备外框 + 官方车图与 ConnectedDrive 价格 20,00 €） | 不是 Lu 自截，是 BMW 宣传素材；版权属 BMW（URG Art.2；UrhG §2，待确认）。无授权依据 | **是**：换成 Lu 自己的截图或自绘示意 |
基础：Lu 是否有权在作品集展示 BMW App 界面取决于 BMW 合同/客户许可（OR 321a Abs.4；UWG 6），我没看到合同 → 待确认，建议问律师。11-12 审查（bmw-live-asset-audit.md）对 i4-services-600 同样未放行。
结论：不贴「法务通过」；4e879b9 的法务通过因新增内容作废。

## 2026-11-19 f59f043
车牌 M KB184E 按 Lu #19416 选 B 换回原图；法务通过 f59f043。待确认：车主是否 Lu 本人/同意；BMW 是否允许截图。
