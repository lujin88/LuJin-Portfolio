# Gratula row 29：权限及删除承诺核查

2026-11-12 · Legal & Privacy · #9932 / #9979 / #9980。非法律意见。

**建议 B：改措辞。现有证据不足以把电话字段、仅主办方可读、全部来宾数据按时删除表述为已验证的运行事实。英文原句见下表；交 UX copy 起草替换句，再由 PM 按 #9980 收 Lu 的确认。本轮不改产品文案。**

## 核查范围

读取 dev 的 [EVIDENCE.md](/Users/lu/.buzz/OUTBOX/GRATULA_RETENTION_EVIDENCE_ROW29_1112/EVIDENCE.md)，独立重算其 manifest 所列 16 个文件 SHA-256，全部匹配。对应 Party-Planner 记录版本 ed1af3e、作品集候审 v8 79de05c。另只读核对当前主目录及 portfolio_perfect 的 party-planner-page.tsx，确认下列原句确实存在；未以此冒充线上 HTTP 或生产数据库核验。

独立阅读 can_edit_party、host RLS、30 天截止日及 purge、rsvp_json、60 天派对截止日、run_retention 与独立调度脚本的相关源码。未运行测试，未连接生产数据库，未运行删除任务，也未审完全部迁移覆盖及访问路径。

官方来源（本轮在线核对）：[FDPIC 告知义务](https://www.edoeb.admin.ch/en/duty-to-provide-information)要求透明、清楚地说明处理目的和接收方等；适用 GDPR 时，[欧委会原则说明](https://commission.europa.eu/law/law-topic/data-protection/information-business-and-organisations/principles-gdpr_en)涉及透明性、保存期限与可证明性。法规没有在这些来源中为本产品统一规定 30 天；30 天是产品承诺，不能把代码中的期限写成法律要求。

## 检查表

| 项目 | 问题及英文原句 | 依据 | 建议怎么改（给 copy 的约束，不是成稿） | 阻塞上线吗 |
| --- | --- | --- | --- | --- |
| 电话字段 | “Only the host sees dietary notes and phone numbers.”；“Dietary notes and phone numbers stay private.” dev 的字段检索未找到对应电话实现，本轮未独立穷尽所有字段 | EVIDENCE.md；主目录及 3000 clone 的 party-planner-page.tsx；FDPIC 来源 | 在字段、用途和访问路径补证前移除电话断言；不要把“host”译成仅存主办者设备 | 阻塞这些未经证实承诺的签核，不据此判定实际泄露 |
| 访问范围 | can_edit_party 明确允许 owner 和 party_editors；rsvp_json 包含来宾自己回复中的过敏字段。“Only the host”按绝对字面过窄 | b2_host_writes.sql:57、pt410_host_read.sql:196、b9_retention.sql:188；FDPIC 来源 | 区分主办方、获邀共同编辑、来宾自己的回复及其他家庭；不得以已读片段认证所有接口均隔离 | 同上；上线事实仍须版本对应及访问验证 |
| 30 天删除 | “Guest data is removed after 30 days.”；源码按派对日期及 Europe/Zurich 日历日计算第 30 天，删 RSVP 等；不代表收集后 30 天或精确 720 小时 | b9_retention.sql:56、:74；欧委会来源 | 明确数据类别、起算点；若描述设计意图须显式限定，不能作为已上线自动删除保证 | 无生产运行证据前，不签无条件已执行承诺 |
| 调度与隐藏 | host RLS 从第 30 天隐藏数据；b9_schedule.sql 需每个环境单独安装，源码存在不证明调度已执行 | pt410_host_read.sql:196、supabase/ops/b9_schedule.sql；dev 未提供 cron / retention_runs 运行证据 | dev 补脱敏的部署版本、调度安装、最近成功任务/失败告警记录；隐藏不能称物理删除 | 证据待补；不认定调度实际失效 |
| 派对/照片与全部副本 | 源码另设第 60 天派对清理及 Storage 删除队列；备份、日志和导出范围未核 | b9_party_purge.sql:59、:199；EVIDENCE.md；欧委会保存期限说明 | 不用“所有来宾数据/所有副本”统称第 30 天清理；产品版本确定后再说明适用范围 | 不签超出已核范围的删除保证 |

## PM / copy 交接

先确定作品集描述的是设计意图、旧 Artifact 还是已部署的 Supabase 版本，再由 copy 写英文替换稿。同步核主页面、静态 gratula.html、候审 v8 与演示中的 “Host only” / “Deleted” 标签，避免正文改了但画面仍作绝对保证。本轮没有派发额外开发、访问生产或执行清理。

此为既有承诺的独立整改建议，不改写 #175 地图素材许可的单独阻塞结论，也不据此宣布整站不合规。没有发现真实用户已遭泄露或删除任务确实失败的证据；问题交 PM 按 #9980 于 08:00 后汇总，静默时段不直接联系 Lu。

PR：无。已完成源码证据复核和措辞判定；剩 UX copy 成稿、PM/Lu 确认、适用版本及运行证据。Impressum、cookies、素材许可和完整 FADP/GDPR 合规不在本轮审计范围。
