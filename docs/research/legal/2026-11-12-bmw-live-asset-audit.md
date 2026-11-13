# BMW 线上素材：暂下线 / 替换清单

2026-11-12 · Legal & Privacy · PM #9358，#lu-portfolio / #8673。基线 main `f112a004a79a3b2192d81fcecaf1929cbf13740e`，并以生产 HTTP 响应核对。不是法律意见，不认定已经侵权。

## 结论

**紧急：建议 PM 安排以下四项素材及已确认派生 hero 暂停公开展示/分发，取得权利依据或替换后恢复。** 这是当前证据不足下的发布建议，不是已作出的侵权法律判决。无需因此下线整个作品集，也不能只把图片藏在 CSS 后仍让原文件公开访问。

纠正任务前提：当前 `/bmw-design-system` 的 hero 是第五张 `i4-alpine-sunset.webp`，不是直接显示 `ix3-landscape.webp`。本轮取得的该页面 HTML 未直接引用所列四个文件；它引用 alpine 和 `i4-services-600.webp`。旧组件仍留有四图引用，不能据代码搜索就称它们都显示在当前主页面。四图本身的生产资产 URL 均为 HTTP 200；v2 和旧 prototype 也实际返回了有关引用。

## 检查表

共同目录：`public/assets/images/bmw-system/`。下表 S1–S4 是下方官方来源。

| 项目 | 问题 / 已确认曝光 | 依据 | 建议怎么改 | 阻塞上线吗 |
|---|---|---|---|---|
| ix3-landscape.webp | 只有 2026-11-05 `4b9d651` 同步入库记录；Lu #9332 为“网上找的/AI 生成”，原始来源未确定。生产 v2 HTML、`/lab/bmw-one-source/driver.html` 引用它，资产 HTTP 200 | git log --follow；生产响应证据；S1/S2 | 暂下线该图在 v2、prototype 的展示和公开资产访问；`ideas/[variation]/concepts.css` 的背景引用也纳入修改检查。补原图来源及公开使用依据，或换为可核实来源的图 | 是：当前不能签核其继续公开使用；不认定确定侵权 |
| i4-services-car.webp | 透明底白车图；生产资产 HTTP 200，PhoneStudies 的 actions 组件引用它，但当前主页面 HTML 未直接引用。没有找到原始制作/许可凭证；仅凭外观不能断定下载来源 | 入库 `4b9d651`；PhoneStudies.tsx；本地目检及元数据；S1/S2 | 暂停公开分发及新使用；补来源、车图许可或客户/雇佣合同中适用的作品集展示依据。不可用“曾上线”或之前差异审查未新增文件来证明许可 | 是：待证据或替换 |
| bmw-ix3.png | 透明底蓝车图；v2 HTML 直接引用，资产 HTTP 200。AppDetails/specimens/VehiclePlate 等也有代码引用，未逐个确认这些组件的公开路由。未找到许可凭证 | 入库 `4b9d651`；生产 v2 响应；S1/S2 | 暂下线 v2 车图和公开资产访问，检查剩余引用；不得用于新图的车身抠图/生成输入，除非补齐适用权利依据 | 是：待证据或替换 |
| i4-art.webp | 小尺寸侧面车图，资产 HTTP 200；PhoneStudies 的 charge 组件引用。未找到原始来源/许可记录；尺寸小、裁切或透明底不能证明可自由使用 | 入库 `4b9d651`；PhoneStudies.tsx；本地目检；S1/S2 | 暂停公开分发及新使用，补许可或换图；检查相关旧页面引用后一起处理 | 是：待证据或替换 |
| i4-alpine-sunset.webp（必须增补） | **生产主页面实际 hero**，HTTP 200 且与 main 字节一致。已证实来自 ix3 派生场景，并把 BMW 官方 i4 照片作为后续生成输入；两处权利依据尚缺 | BMWOneSource.tsx:75；BMW_BACKGROUND_PROVENANCE_1112 的生成记录；[前次 PR 审查](https://github.com/lujin88/LuJin-Portfolio/pull/178#issuecomment-6827008884)；S1/S3 | 优先替换/暂移除主页面背景和公开资产；本轮 B 新生成方案可作为候选，但本报告未审核或批准新交付；不要保留该链的车身像素及派生 MP4 | 是：与 #178 同一来源阻塞 |
| i4-services-600.webp（追加待核） | 生产主页面实际手机截图，HTTP 200 且匹配 main；目检有与白车抠图相近的车辆、车牌字样及状态时间。尚未恢复裁切链，不能断言两文件确切派生关系，也不能断言是实际个人数据 | BMWOneSource.tsx:91；图片目检；S1/S4 | PM 补截图来源、作品集展示依据、是否演示数据；截图用于具体设计说明与抽取车图作装饰/生成输入应分别判断。若无法及时提供依据，建议临时隐藏该截图；不要自动套用“纯文字生成”替换真实设计证据 | 待确认，不能给截图单独签通过；主页面 hero 已有明确发布阻塞 |

## 官方来源与判断边界

- **S1 [瑞士 IPI：Using a work](https://www.ige.ch/en/protecting-your-ip/copyright/using-a-work)**：使用受保护作品原则上需要权利依据，存在法定例外。入库、下载可用、裁切或 AI 编辑均不是此处已经找到的许可证明。
- **S2 [瑞士 IPI：Protection for photographs](https://www.ige.ch/en/protecting-your-ip/copyright/using-a-work/protection-for-photographs)**：人制作的三维物体照片（包括产品照片）可受保护，不以艺术独创性为唯一前提。此规则不能反向证明本案所有图都是人拍摄或版权有效；正因此需要查源。
- **S3 [BMW：Copyright / Licences](https://www.bmwgroup.com/en/general/legal-disclaimer.html)**：公开网站保留图片等权利并声明不授予知识产权许可。它不是未知文件的完整特定授权合同，也不排除另有客户许可；本轮未找到后者。
- **S4 [瑞士 IPI：Quoting from works](https://www.ige.ch/en/protecting-your-ip/copyright/using-a-work/permitted-uses/quoting-from-works)**：图片引用有目的、必要范围和来源/作者标注条件，单纯装饰不同于具体说明。不能笼统说作品集截图一律禁止，也不能以“作品集”自动放行。适用例外拿不准，待确认，建议问律师。

## 生产证据与可复核范围

生产只读 HTTP 获取，不是完整浏览器运行时或全站爬取。`/bmw-design-system`、`/index`、`/bmw-design-system-v2`、`/lab/bmw-one-source/driver.html` 均 200。当前 `/index` 响应未见所查五图引用。`/bmw-design-system/ideas/driver` 返回 200，HTML 无 ix3 字符串，但该路由使用的源码 CSS 含 ix3 URL；未检查运行时 CSS 加载，不能说该路由没有曝光。

| 生产文件 | SHA-256（均与所审 main 字节一致） |
|---|---|
| ix3-landscape.webp | bfce34b267a65bc69f5641b91ab4a3d5f69f48bd4d05b3bb982e8afb3903f4f5 |
| i4-services-car.webp | 863b2061d5ef27a864d95e776f399d89837cda2051b2c6ff297e84da1bcb690b |
| bmw-ix3.png | 47545070012630556f7f589f0bef57763671f3539628fe5f9e7442f8356c0956 |
| i4-art.webp | 14791c6463c05c8c4cf17f7a3de10b5d0e0bf6151a0c0fc70a9abf6f863171de |
| i4-alpine-sunset.webp | 60af2a71506ccafc18140c534136621dc523811202b921d3f3df1cd8533167af |
| i4-services-600.webp | d76f2fc0bb5c0f74969a65b58623cea7f9769fdd26c26275c74b419455508d35 |

持久化 HTTP 结果：同目录 `2026-11-12-bmw-live-asset-evidence.json`。原始 HTML/图片暂存在 `/var/folders/55/c01mr71d18z0x41kby6xgshc0000gn/T/legal-bmw-live-17kkpaya/`。bmw-ix3.png 首次下载超时，后一次成功，未把超时认作下线。

来源调查覆盖 Git main/可见分支历史、项目代码和 legal 文档、OUTBOX 制作说明/恢复的生成记录、已找到的本项目 Claude 会话及 11 月 5 日 Codex 同步会话的相关制作命令。四图的选定 EXIF 权利字段未读到数据；这只是缺少证据，不等于没有权利。未声称搜索了 Lu 所有历史会话、外部合同或客户许可档案，也未把 Lu 对 ix3 的回答扩大成其余三图的来源声明。

## #9356 / #9357：静帧 AI 标识验收边界

对于**确实从即梦生成片提取**的 poster/减少动效静帧，应保存真实来源链、AI 属性、原片及帧时间/导出步骤，并在交付格式可承载的元数据中保留适当来源说明；制作方附明确提取记录。不可宣称它是非 AI 实拍，也不可伪造其由平台独立原生生成。

[即梦协议 §4.2](https://lf9-cdn-tos.draftstatic.com/obj/ies-hotsoon-draft/vco/17620dba-f821-4a18-85f9-b8b11f73304a.html)要求不去除平台标识；该条**没有规定 WebP 必须存在 MP4 QuickTime Keys 或照抄全部容器字段**。所以 QA 不应仅以“WebP 没有 Keys”作统一法律判据。sidecar 是审计证据，不能取代原有画面标识或应保留的文件标识。若新方案使用内置 imagegen，按实际服务条款和其真实标识审核，不能伪装为 Dreamina 输出；是否需要可见说明须结合最终内容和适用规则判断，文案由 UX copy 起草。当前旧视频的 poster 不因补 metadata 就解决上游权利缺口。

## 执行交接

PM 将 hero 替换、旧公开页面及资产访问处理合为明确范围，交 webdev / QA / ops 走项目 PR 与部署流程；无需替换与这些图无关的 UI 或下线整站。临时下线时保留内部审计原件，实际公开 URL 和缓存也要验，不能只加 noindex。本轮仅产出审查文件，没有修改生产、删除资产、支付、生成素材或写访客文案。隐私政策、Impressum、cookie 未在本轮重新审计。
