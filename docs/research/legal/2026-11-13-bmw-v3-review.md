# BMW v3 静态稿法务复核

2026-11-13 · PM #10500 · 线程 #10359 · 非法律意见。无新 PR；未签整页公开通过。

结论：WWDC 句可保留；组件/状态示意可继续作为明确标注的重建演示制作；首屏截图的来源与展示依据仍缺，当前阻塞这张图的新公开使用。

| 项目 | 问题／证据 | 依据 | 建议怎么改 | 阻塞上线吗 |
|---|---|---|---|---|
| WWDC 句 | BMW 2020-06-22 官方稿第一页明确是在当日 WWDC 公布 iPhone 数字钥匙支持。announced 准确，不等于当日所有客户可用，也不证明 Lu 独立完成该功能。 | [BMW 官方原稿，页1–2](https://www.press.bmwgroup.com/usa/article/attachment/T0309831EN_US/452989) | 保留现句作为公开产品里程碑，不扩大成个人业绩或精确任职时间证据。 | 否 |
| 组件层及状态示例 | 读 v3 HTML、目视 B-390；组件为排版/SVG示意，标明 illustrative recreation / simulated states / no vehicle connection。旧制作 NOTES 说明新排布标记、没有使用内部原始表。未发现本稿直接嵌入内部原表证据。 | [制作记录](../REVIEW.md)；/Users/lu/.buzz/OUTBOX/BMW_LOWER_V3_1109/NOTES.md；[IPI 引用条件](https://www.ige.ch/en/protecting-your-ip/copyright/using-a-work/permitted-uses/quoting-from-works) | 保留标签与真实经历分界；可以继续制作。标签不是版权许可或保密豁免，不得后续换入内部截图。 | 本稿所见通用原创示意无新增阻塞；不是历史真实性认证 |
| 车型/市场表 | Market A–C 虽匿名，仍搭配真实车型和功能；制作说明未逐格证明这些值是虚构还是内部规则重述。 | 同一 NOTES、v3 HTML 和 COPY.md；标签本身不能证明来源 | 发布前由制作者在来源记录确认格值为虚构演示；若来自真实内部规则，补公开出处/适用公开依据，否则改为通用虚构车型及规则，访客文案交 copy。 | 真实规则来源待确认；不能按已核业务事实公开 |
| 首屏 My BMW 截图 | v3 唯一 img 指向 BMW_LOWER_V3_1109/i4-complete.png；独立 hash e34fc5636df571888b014ef97a346e112d281767d76ea3001e22d29a8508c001，与前审未清源文件完全一致。裁日期只是 CSS，原位图未改变；仍有车图、局部地图、状态数据。 | [IPI 图片引用条件](https://www.ige.ch/en/protecting-your-ip/copyright/using-a-work/permitted-uses/quoting-from-works)；[BMW Copyright / Licences](https://www.bmwgroup.com/en/general/legal-disclaimer.html)；本项目 docs/research/legal/2026-11-12-pr179-i4-complete-review.md | 补原始截图来源/制作人、展示权利依据、地图署名及数据是否演示。若主张引用例外，需具体设计说明、必要范围、来源/作者标注；泛称 app overview 尚不足确认。先留内部稿，公开版可暂去图。 | 是：这张图尚不能签核，不认定已侵权 |

BMW 网站不自动授予素材许可，但不能把其网页条款冒称为未知截图的特定合同；既有客户许可或法定例外仍可能适用，需证据。IPI 对图片引用要求具体说明用途、必要范围和来源标注；装饰用途不自动适用。拿不准的引用适用性建议问律师。

范围：审静态 HTML、手机 PNG、COPY.md、制作 NOTES、旧截图审查，并在线核官方资料；未跑网页交互、未核全站隐私/cookie/Impressum。没有把裁日期视为伪造日期；也没有据外观断言数据属于真人。未改页面正文、产品代码、3000 或线上素材。

交接 PM：派制作者确认表格虚构来源，补截图证据；可逆方案是继续无截图的内部/实现准备，不需停掉整页设计。最终实现 PR 需按实际 SHA 重新检查。Lu 先前保留线上旧图的决定，不等于此新用途已经法务签核。

