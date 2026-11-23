# CA06 HTML 本地稿 b99ebf09 法务审查（2026-11-14，非法律意见）

对象：webdev worktree `.review-shots/ca06-1030/`：`03-main-html-1040.webp`（SHA-256 b99ebf09…，已核对）、`main-pair-1440-html.png`、`main-pair-390-html.png` 右侧；`client-workspace-1040.html`。左侧保密原图只作对照，未复制、未上传。

| 项目 | 观察 | 依据 | 建议 | 阻塞上线吗 |
| --- | --- | --- | --- | --- |
| UBS 名称/标志 | 右侧页眉为 "DEMO｜Desk｜Client Workspace"；HTML 全文检索无 ubs/cawb/clariden 等；未见 UBS 标志 | 目检三图 + grep HTML | 无 | 否 |
| 真实客户/员工数据 | 客户 Elena Vale、DEMO 847260、18 Sample Lane Demo City、顾问 Mira Bell/Owen Hale 等均为虚构，屏上多处有 sample/fictional/demo 字样；原图 Brandtner、Zürich 地址、生日、Daniel Kalt、Paul Donovan 等在右侧均不存在 | 目检；HTML grep | 虚构姓名与真人重名未查，建议问律师 | 否（本地） |
| 人像来源 | HTML 引用 5 张 PNG，SHA-256 与 OUTBOX `portraits-v1/` 逐个一致，即 11-13 已审的 P02–P06；来源仍是制作方记录（声称 Imagen 3、零参考图）。适用的 Google 条款/账户类型仍未核清（旧 Generative AI Additional Terms 页面称 2024-05-22 起一般不再适用）| [2026-11-13 ca06 v3 审查](2026-11-13-ca06-v3-final-local-review.md)；[Google 旧条款](https://policies.google.com/terms/generative-ai)；[Antigravity 条款](https://antigravity.google/terms) | 制作方补实际账户/条款版本；缩略图可能是 UBS 原图里真人的像，也未排除 | 是（公开前） |
| 字体 | HTML 用 Source Sans 3（ttf 在审阅目录，未入页面/仓库）。该字体为 Adobe 开源，许可为 SIL OFL 1.1，我这里按已知版本判断，未在本轮联网复核许可文本 | [Adobe source-sans](https://github.com/adobe-fonts/source-sans) | 公开前随字体附 OFL 许可并核实文件来源 | 否（本地）；入仓库前补 |
| 界面/流程公开依据 | 这版是 HTML 重绘，不含 UBS 位图，比 masked-v3 更远；但板块名称、顺序、版式（Agenda、Contextual Brief、Opportunities 的 Pre-sales/After-sales、Idea Builder 三组卡）与原图 1:1 对应，红色开关与列布局相同。仍未见 UBS 允许公开展示该界面衍生的合同/书面许可 | [IPI 使用作品指引](https://www.ige.ch/en/protecting-your-ip/copyright/using-a-work/copyright-)；既有记录 [ca06-masked-review-status](2026-11-12-ca06-masked-review-status.md) | PM 取客户书面展示依据；结构近似程度是否构成问题，待确认，建议问律师 | 是（公开前）|

## 结论

- 本地审阅：可以。右侧未见 UBS 名称、标志或真实客户数据。
- 公开（进页面/推仓库）：**不签「法务通过 b99ebf09」**。卡在 ① 人像适用条款未核清 ② 客户公开展示依据未取得 ③ 版式近似待律师确认。
- 未上传图片、未改页面、未接受任何条款。
