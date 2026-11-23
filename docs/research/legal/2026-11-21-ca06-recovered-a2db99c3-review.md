# CA06 找回稿 a2db99c3 法务审查（2026-11-21，非法律意见）

对象：visual OUTBOX `visual-22484-ca06-recovered-local/`：`03-main-html-1040.webp`（SHA-256 a2db99c3…，已核对）、`client-workspace-1040.html`（SHA-256 1e89e20f…）、`draft-only-1440-html.png`、`portraits-local/` 5 张 PNG。未接触原图。承接 [11-14 b99ebf09 审查](2026-11-14-ca06-html-b99ebf09-review.md)；那份结论不自动适用本文件。

| 项目 | 观察 | 依据 | 建议 | 阻塞公开吗 |
| --- | --- | --- | --- | --- |
| UBS 名称/标志/真实数据 | HTML grep ubs/cawb/clariden/brandtner/zürich/http：无命中；页面只有 DEMO、Elena Vale、DEMO 847260、18 Sample Lane Demo City、Mira Bell、Owen Hale、Ellis Reed，多处 sample/fictional 字样；目检整页图无 UBS 标志 | grep + 目检 1440 图 | 虚构人名与真人重名未查，待确认，建议问律师 | 否 |
| 人像 | 5 张 PNG（6 个位置，thumbnail-1 用了两次），SHA-256 3446f558/02e23f4b/5e73fc8f/35d2ac72/9877d4e3。11-14 记录说它们与 `portraits-v1/` 逐个一致；本轮 OUTBOX 里找不到 `portraits-v1/`，没法重新比对。来源仍只有制作方说明（Imagen 3、零参考图），适用条款/账户类型未核清，无 C2PA | [2026-11-13 v3 审查](2026-11-13-ca06-v3-final-local-review.md)；[Google 条款](https://policies.google.com/terms/generative-ai) | visual 补：生成记录（账户、日期、条款版本）与 portraits-v1 原文件，或换成已有来源记录的图 | 是 |
| 字体 | Source Sans 3 的 ttf 在稿内，OFL 1.1 按已知版本判断，本轮未联网复核许可文本 | [Adobe source-sans](https://github.com/adobe-fonts/source-sans) | 入仓库时附 OFL 文本 | 入仓库前补 |
| 版式近似 | 本稿未变：板块名称、顺序（Priority insights、Opportunities、Idea builder、Engagement timeline、Agenda、Context brief）、红色开关、列布局仍与 UBS 原界面 1:1。Lu #22484「保留原结构、遮掉东西」就是这个方案，所以近似度是设计前提，不是可以靠改稿消掉的 | [IPI 使用作品指引](https://www.ige.ch/en/protecting-your-ip/copyright/using-a-work/copyright-)；[ca06-masked-review-status](2026-11-12-ca06-masked-review-status.md) | 公开前要 UBS/客户书面同意展示；近似是否构成问题，待确认，建议问律师。本周内记录里没有新的书面依据 | 是 |
| 外链/外部请求 | HTML 无 http 链接，只引本地 png 和 ttf | grep | 无 | 否 |

## 结论

- 本地审阅/内部看稿：可以。
- 公开（进页面/推仓库）：**不签「法务通过 a2db99c3」**。卡在 ① 人像来源和条款，② UBS/客户公开展示依据（记录里没有新进展），③ 版式近似待律师。
- 必须替换的内容：本稿里的虚构内容已替换完毕，没有发现要再换的文字；剩下的不是改稿能解决的，是依据问题。
- 提醒：a2db99c3 与 11-14 审过的 b99ebf09 不是同一文件，visualqa 的六项通过也只对 b99ebf09。公开前我要对着最终 HEAD 的文件逐个重算 SHA。
- 未上传、未改页面、未接受任何条款。

## 补充（15:58，visual #22495 的 portraits-v1-recovered）

- 5 张在用人像的 SHA-256 与 `portraits-v1-recovered/` 里对应文件逐个一致（3446f558、02e23f4b、5e73fc8f、35d2ac72、9877d4e3）。哈希这一项关了。
- 更正：`RECOVERY-VERIFICATION.json` 在 `portraits-v1-recovered/` 里，我之前查错目录；它记录归档 CA06_CONCEPT_HIFI_1112.tar 且逐个 equal。原始 jpg（portrait_*_1794520*.jpg）不在目录里，只有记录里的 SHA。
- COMPLIANCE_RECORD.md 仍是制作方自述：写的适用条款是 Google Generative AI Additional Terms，而该页面自己说 2024-05-22 起一般不再适用；账户类型、实际生成记录没有第三方可核的证据。这一项仍开着，visintern 查会话后再看。
- 结论不变：不签「法务通过」。

- 16:02 visintern #22499：生成会话 196a94c9 的 transcript 找不到（本地会话库只存 11-17 之后），账户类型、调用日志、生效条款版本都没有独立证据。条款项确认无法闭合，只能靠制作方自述。

## 复核 visual-22561-ca06-refined-v2（18:30，#22730，回 Lu #22726「改了还不能上线吗」）

对象：OUTBOX `visual-22561-ca06-refined-v2/`，index.html SHA-256 f58a9ce5…、refinement.css 59a421dd…（与 manifest 一致）；人像仍是同 5 张（哈希与上文一致）。

稿面：无 UBS/cawb/clariden/Brandtner 等词，无外链，只有虚构名（Elena Vale、Mira Bell、Owen Hale、Ellis Reed、各产品名）。文字和数据这一侧没有要再改的。

| 阻塞项 | 谁能解 | 怎么解 |
| --- | --- | --- |
| ① 人像条款/账户证据（生成会话找不回，只有制作方自述） | visual 能单方面解掉 | 换成不用照片的头像（首字母圆标、剪影、或来源可查的 CC0/付费图库并留授权记录）。换掉后这一项消失，不必再追 Google 条款 |
| ② UBS/客户是否同意公开展示这个界面 | 只有 Lu 能提供 | Lu 查自己与 UBS 的合同/保密条款里对「作品集展示」怎么写，或向 UBS 对口人要一句书面同意（邮件即可）。我不是律师，条款内容待确认，建议问律师 |
| ③ 版式与原界面 1:1（板块名、顺序、红色开关、列布局）| 律师；visual 可降低 | 把握不了的由律师判断。visual 可降低风险：改板块名称和顺序、改开关样式，但这与 Lu「靠近 UBS look and feel」相反，要 Lu 定 |
| ④ 字体 OFL 文本 | visual/dev | 入仓库时附 OFL 许可，小事 |

结论：不签「法务通过」。①④ 是 visual 能做的；②③ 取决于 Lu。我没有发现「改了就能上线」的路径，因为这一稿保留了原结构，不是文字问题。

## 复核 visual-22822-ca06-three-pages-v2（19:50，#22953，Lu #22822 选 B「会谈准备」）

对象：`visual/OUTBOX/visual-22822-ca06-three-pages-v2/`（非法律意见）。manifest-sha256.json 里 13 个文件逐个重算，全部一致：index.html 6f338129…、styles.css ba09ab67…、page-1.html 028f91bc…、page-2.html cfd7e9b7…、page-3.html e0e46a49…、gallery.css 4f9a2526…、page.js a8e86e62…、gallery.js 855f1e75…、source-sans-400.ttf 1b7fce5a…、source-sans-600.ttf e09252ae…、page-{1,2,3}-1440.png。

| 项目 | 观察 | 阻塞公开吗 |
| --- | --- | --- |
| 与 UBS 界面 1:1 | 6 个板块名（Priority insights、Opportunities、Idea builder、Engagement timeline、Agenda、Context brief）在 index/page-1..3/styles 里 0 命中；新结构是三页「Client preparation / Discussion evidence / Research & examples」，顺序、红色开关都没有（只有浅色标签）；列布局是自己的。整体仍是灰白底的顾问工作台，这个「气质」近似保留（Lu 选 B 要的），是否构成问题待确认，建议问律师 | 不再是 1:1 阻塞；气质近似待确认 |
| 人像 | 目录里没有 portrait/avatar 文件，头像全是首字母圆标（EV/ER/MB/OH…）；5 张 AI 人像的条款/账户问题随之消失 | 否 |
| UBS/客户信息 | grep ubs/cawb/clariden/brandtner/zürich：0 命中；无 http(s) 链接；每页页脚「Fictional design study. All names, figures and records are invented」 | 否 |
| 虚构名 | Elena Vale、Ellis Reed、Mira Bell、Owen Hale、Alder Grid、Cedar Storage/Balanced Notes、Willow、Harbor、Meadow Infrastructure 未查与真人/真公司重名 | 待确认，建议问律师（低） |
| 字体 | Source Sans 3 的 ttf 在稿内，附 Source-Sans-LICENSE.md（OFL 1.1，© Adobe）；shell/ 有 Poppins-OFL.txt。Remix Icon 等 shell 资源是站内已有，本轮未复核其许可 | 入仓库时附 OFL |
| UBS/客户书面同意 | 仍没有问；Lu #22751 选 B 不等。版式已自己做，依据问题比 a2db99c3 轻，但没消失 | 待确认，建议问律师 |

结论：v2 可以交 dev 接入；接入 PR 后我对最终 HEAD 重算文件哈希、查没有新增图片/外链再签「法务通过 <sha>」。本轮没有上传、没有改页面、没有接受任何条款。
