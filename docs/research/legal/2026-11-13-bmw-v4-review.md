# BMW v4 静态稿法务复核

2026-11-13 · PM #10551，回复线程 #10545 · 非法律意见。

结论：就此次指定的手机示意及虚构表格，v3 的两项阻塞已解除，可以按 v4 当前内容公开展示。依据是移除争议素材、通用示意内容及制作方明确的虚构来源记录，不是免责声明本身赋予许可。此结论不等于整页或实现 PR 的法务签核。

审阅：v4/review.html、REVIEW.md、B-390-opening.png、B-390.png，及 v3/LEGAL.md。HTML SHA-256：`f3419fd61492822f1892b1fef303e97ad9bf127f4fbda5359fce34861eb01516`。

| 项目 | 问题／证据 | 依据 | 建议怎么改 | 阻塞上线吗 |
|---|---|---|---|---|
| 首屏手机示意 | HTML 不含 img 元素或 i4-complete 引用；目视为文字与 CSS 控件，无车图、地图、BMW 标志或真实车辆数据。制作记录声明为新示意。 | [v4 制作记录](/Users/lu/.buzz/OUTBOX/BMW_REAL_CASE_1113/v4/REVIEW.md)；[IPI 引用条件](https://www.ige.ch/en/protecting-your-ip/copyright/using-a-work/permitted-uses/quoting-from-works) | 当前示意可用，保留清楚可见的重建及虚构状态说明；不得替换回未核来源截图。 | 否，当前替代图已解除原截图阻塞；不追认旧图 |
| 车型／市场表 | 制作方逐行确认 A/1/Climate、B/1/Lights、C/3/Unavailable、D/2/Climate 是任意虚构组合，不映射真实车型或内部规则；HTML 一致，表下明确说明虚构。 | [v4 制作记录](/Users/lu/.buzz/OUTBOX/BMW_REAL_CASE_1113/v4/REVIEW.md)及 review.html；[IPI 引用条件](https://www.ige.ch/en/protecting-your-ip/copyright/using-a-work/permitted-uses/quoting-from-works) | 可作为演示公开，保留来源记录及表旁虚构说明；不得当作 BMW 真实兼容性证据。 | 否；基于制作方声明及本稿检查，不是对内部资料的独立比对认证 |
| 提示数量 | 图内有四处提示，图下另有说明；未发现必须把四处全部保留的依据。 | [IPI 引用条件](https://www.ige.ch/en/protecting-your-ip/copyright/using-a-work/permitted-uses/quoting-from-works)：引用条件与免责声明数量无关 | PM 可交 copy 精简；图旁仍须明确表达这是重建示意、状态虚构且不连接车辆。法务不代写正文。 | 当前版不阻塞；精简后检查是否仍清楚 |
| 授权边界 | BMW 网站条款不自动授权其素材；本次未使用该争议截图，不需要靠标签为它补许可。 | [BMW Copyright / Licences](https://www.bmwgroup.com/en/general/legal-disclaimer.html) | 不把 BMW 名称或项目描述解释为品牌背书，不把本结论扩展到原截图或其他素材。 | 本次所见替代内容无新增阻塞 |

本次是静态替代内容的增量复核。未重新核实个人履历、客户合同、保密条款或全部已有组件的历史来源；既有历史事实结论仍按 v3 报告范围。未检查运行时请求、cookie、统计、全站 Impressum／隐私政策，不签 FADP/GDPR 整站合规。HTML 无脚本；没有据此推断未来实现不采集数据。字体使用本地文件引用，最终实现须沿用已许可字体并保留许可记录，不发布 file:// 路径。

剩余：copy 审新增标签；实现 PR 按当前 HEAD 检查实际资产、提示及授权记录后再给 SHA 对应结论。无 PR、未改页面正文、生产代码、3000 或线上素材。无须夜间联系 Lu。拿不准的合同或权利适用问题建议问律师。

## #10561 短标签与位置复核

2026-11-13：已核 COPY.md 与 COPY-strings.json，key `bmw.realCase.phone.disclosure` 一致：

> Recreated example with fictional data; no vehicle connected.

结论：此句措辞及紧邻首屏手机下方、可见图注的位置方案通过本次法务复核，可交 visual 实施。Recreated example 表明重建示意，fictional data 表明数据虚构，no vehicle connected 表明无真实车辆连接。可以删除手机内四处重复提示和 Connection/Demo only 整行；不得另添暗示真实连接的状态。保留示例控件、原有无障碍描述及其他组件／表格各自的说明。

| 项目 | 问题 | 依据 | 建议怎么改 | 阻塞上线吗 |
|---|---|---|---|---|
| 合并提示 | 三层意思完整，未声称历史原界面或素材许可 | COPY.md、COPY-strings.json 及上文本次素材检查；[IPI 引用条件](https://www.ige.ch/en/protecting-your-ip/copyright/using-a-work/permitted-uses/quoting-from-works)仅支持授权边界，不规定提示句式或数量 | 按 copy 原句实施 | 措辞不阻塞 |
| 图注位置 | 当前只是位置方案，未见修改后的图 | COPY.md；可见性为本项目防误解的审核条件，不声称是 IPI 规定的排版 | 1440/390 均紧邻手机、清楚可读、自然换行；不隐藏在 hover、折叠内容或缩小位图内。单独分享手机图时将图注一并带上 | 方案不阻塞实施；修改后需视觉复验可见性 |

剩 PM 独立文案审、母语审校和改图后的视觉复验；此增补不代替这些审查，也不是实现 PR 的 SHA 签核。原稿 HTML hash 仅标识先前检查版本，不能用于尚未产生的改图版本。未改产品正文；非法律意见。
