# PR #179：i4-complete 来源复核

2026-11-12 · Legal & Privacy · PM #9384 / #9392 · #lu-portfolio 线程 #8673。

审查 HEAD：`050cb9230ac917eaaacac2fcbee12870260ebe84`。

**结论：待确认，当前不能为 i4-complete 的新增替换用途签「法务通过」。** 尚未找到原始截图来源、适用于作品集展示及本次复用的权利依据；这不等于认定侵权，也不要求一概禁止 BMW 截图或官方图片参考。建议 PM 让 webdev 暂去掉这些新增替换图，先完成撤图，或先补齐来源和适用依据后复审。不是法律意见。

| 项目 | 问题 | 依据 | 建议怎么改 | 阻塞上线吗 |
|---|---|---|---|---|
| 替换图身份 | 实际路径为 `public/assets/images/bmw-system/i4-complete.png`，376×815 的完整 App 截图，包含车辆、充电状态及局部地图，并非独立透明底车图 | 当前 HEAD blob `1af7f15da3cd530f3a89acb764e552c3189671bf` 与本地一致；目检；与 lab 目录同名图 SHA-256 完全一致 | 按截图实际内容和使用场景审核，不以“不在五图撤除清单内”代替许可证明 | 身份已确认，许可待确认 |
| 来源及复用范围 | `git log --follow` 仅追到 `4b9d651` 的 3000 同步；OUTBOX BMW_LOWER_V3_1109/NOTES.md 只说明既有截图用于产品背景、非 2020 原界面证据，未给原始作者、下载地址或展示许可；所查 EXIF 无许可字段 | [S1：IPI 使用作品](https://www.ige.ch/en/protecting-your-ip/copyright/using-a-work)；Git/OUTBOX 记录 | PM 补谁截取/制作、来自哪个应用或页面、客户/雇佣许可或其他适用依据，涵盖截图及内部素材。仅自己截屏不自动解决画面内作品权利 | 是：不能按已清源替换品放行当前新增用途 |
| 引用目的 | PhoneStudies 的 home/actions/charge 及 specimens 的 carArt 改为此截图，是否符合引用目的、范围、署名条件尚未成立 | [S2：IPI 图片引用条件](https://www.ige.ch/en/protecting-your-ip/copyright/using-a-work/permitted-uses/quoting-from-works)；该 HEAD 差异 | 区分具体设计说明与装饰性复用；如拟依赖引用例外，补来源、必要性和署名说明；有疑问建议问律师。不要把“作品集”当成自动许可 | 待依据；当前不能签通过 |
| 地图与状态数据 | 图内可见局部地图、车辆状态和时间；不能仅凭画面确认地图供应商、是否演示数据或是否关联真人 | 本地目检，仅作为待核事实，不据此认定隐私违法 | 原制作方确认截图是否演示数据，并补地图来源与适用展示条件；不把截图上传外部查源 | 待确认；本轮未给完整隐私合规结论 |

BMW 官方网站的 [Copyright / Licences](https://www.bmwgroup.com/en/general/legal-disclaimer.html) 保留相关权利，访问该站本身不授予许可；但本图的原始来源尚未确认，不能把该站条款直接当作本图特定合同，也不排除已有客户授权或法定例外。

## 证据与边界

- 精确文件 SHA-256：`e34fc5636df571888b014ef97a346e112d281767d76ea3001e22d29a8508c001`。`public/lab/bmw-one-source/assets/i4-complete.png` 同哈希；查看该副本等同查看本次替换图字节。
- 搜索范围：项目 docs、Git 可见历史、OUTBOX 的说明/来源记录及相关文件；未声称检查全部外部合同或所有历史会话。缺少 EXIF 许可字段不证明无权使用。
- 官方来源 S1/S2/BMW 于本次审查在线读取。该 PR 的撤图方向无需因此停止准备，但不得用未核实截图宣称来源问题已经解决。
- 原先 `i4-services-600.webp` 的待核项仍独立存在；本轮未改变 PM 的保留范围。旧部署、缓存与公开 Git 历史是否仍分发被撤素材，由 PM/ops 单列处理，不建议未经授权重写历史。
- 本轮仅完成指定替换图的来源检查表和线程回执，没有签核全站 Impressum、cookie 或隐私政策，没有改页面、合并或部署。
