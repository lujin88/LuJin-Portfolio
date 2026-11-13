# Agent Tools 录屏发布前检查

范围：#lu-portfolio #7964、#7993；截至 #7994。这是材料要求和风险检查，不是法律意见，也不是最终视频放行。角色依据：`/Users/lu/Scranton/roles/legal-privacy.md`。

当前状态：webdev #7991 报告 #166=f7120b1；PM #7992 要求修正报错和深色版，#7994 又明确保留三张 Live activity 卡。尚未收到修订完成的最终四份录屏及对应 HEAD，本次没有逐帧核验视频。

| 项目 | 问题 | 依据 | 建议怎么改 | 阻塞上线吗 |
|---|---|---|---|---|
| Live activity | 最新要求是三名不同 agent、虚构任务名、正常 Running；不是裁掉该区。真实任务可能带个人信息或客户内容 | PM #7994；[FADP Art. 6–7](https://www.fedlex.admin.ch/eli/cc/2022/491/en)；适用时 [GDPR Art. 5–6](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng/) | 保留真实 UI，用 demo 任务名；检查卡片、详情、提示和过渡帧，避免客户名、内部截图和个人标识 | 最终导出待核验；不是认定三卡设计违法 |
| Approval | 弹窗可能露出邮箱、认证地址、code、token 或回执；PM 发现旧版有错误横幅 | PM #7992；[FADP Art. 6–8](https://www.fedlex.admin.ch/eli/cc/2022/491/en) | 用演示认证数据，不触发真实授权；完成后按需求消失。核验 popup 和所有过渡帧；错误横幅属于产品验收，不能冒充隐私违规 | 最终文件待核验 |
| Usage & limits | Lu/PM 允许展示额度百分比及 reset 时间，不等于允许公开账号信息和费用 | PM #7989；[FADP Art. 6–7](https://www.fedlex.admin.ch/eli/cc/2022/491/en) | 可保留已授权的百分比/reset 信息；避开邮箱、key、费用金额和可识别账号标识 | 有未遮蔽内容则阻塞该素材 |
| Scranton 真实工作画面 | 消息正文、侧栏、附件、路径可能间接泄露客户或他人信息 | PM #7977；[FADP Art. 6](https://www.fedlex.admin.ch/eli/cc/2022/491/en)；适用时 [GDPR Art. 5–6](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng/) | 选不含保密内容的片段或本地脱敏，遮罩烘焙进视频；不要只靠网页覆盖层 | 有未核实的个人/保密内容则阻塞该素材 |
| 许可与最终版本 | 未收到最终素材清单；不能根据 UI 外观推定第三方字体、音乐或图像授权 | [瑞士版权法 Art. 10](https://www.fedlex.admin.ch/eli/cc/1993/1798_1798_1798/en)；具体许可条款待提供 | 随交付列出新增第三方素材及许可；无新增也明确说明。提交 Monitor/Scranton × light/dark 的文件路径、对应 PR HEAD 和文件哈希 | 未明权利的新增素材待确认；建议需要时咨询律师 |

验收输入：四份最终导出（各实际发布格式）、poster/缩略图、准确路径、PR HEAD、文件哈希和素材来源。核验直接可下载的文件，不只看网页裁切。变更任何视频后需重新核验；目前未发出「法务通过」。本次不构成全站 Impressum、隐私政策或 cookies 审计。
