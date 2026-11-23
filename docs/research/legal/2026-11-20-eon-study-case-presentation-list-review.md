# E.ON slides → study-case-presentation/eon/ 清单审查（2026-11-20）

不是法律意见。对象：/private/tmp/claude-501/eon/eon-file-list.tsv（146 文件，59MB），源 replay_site_2026-09-18_fixed（edf62f7 / 0e8c186 响应式）。repo 私有，空。

## 结论：有条件通过。删 11 个文件后可推

| 项 | 发现 | 依据 | 阻塞？ |
|---|---|---|---|
| 外链/请求 | index.html、slide-anim.js、mobile-fix.css 无外链；_next 里只有 w3.org、nextjs.org/react.dev 文档链接字符串 | grep | 否 |
| 个人信息 | 无邮箱、电话；视频元数据无姓名/路径 | grep、ffprobe | 否 |
| 字体 | Geist（Next 自带）、Poppins、Caveat、Inter：均为 SIL OFL，可随站分发 | 各字体官方许可 | 否 |
| E.ON logo | figma/eon-logo.webp 是 E.ON 商标。私有 repo 内、作品集用途；若 repo 日后转公开需再审 | 商标权 | 否（待确认，建议问律师） |
| 视频 | 02/07/23-video.mp4 是 MiniMax 生成（AIGC 标签在元数据内）。画面里的人是合成的，不是真人；无水印 | ffprobe、抽帧 | 否 |
| AI 标注 | EU AI Act Art.50 对 AI 生成内容的标注要求，未确认 | 待确认 | 否 |
| MiniMax 套餐商用条款 | 未确认 | 待确认 | 否（私有 repo） |
| 照片/图 | 其余 photos、figma 为界面/地图/图标；有 AI 房屋图 | 抽查 | 否 |

## 必须删（11 个，index.html/js/css/_next 都没引用，且混入 Client Advisory 素材）

- images/ca-02-bg.png、images/ca-02-ui.png、images/session-03-advisor.png：CA 案例的素材，不属于 E.ON；留给 client-advisory/，且 CA 目录有保密规则。（ca-02-ui 与 main 上的版本哈希不同，来源不明。）
- images/closing-earth.png、images/hero-background.png：未引用。
- figma-slides/asset-image-18.png（4.7MB）、fill-73fd0ef6.png、fill-7862b50f.png：未引用。
- photos/23_BG.png、photos/aerial-roof.png、photos/house-closing.png：未引用（house-closing 与 hero-house-curved 重复）。

删后 images/ 整个目录可去掉。约 −22MB。已用到的：figma-slides/fill-e57a95a9.png、eon-logo、photos 其余、videos 3 个。

## 条件
1. 删上面的文件后 webdev 重发清单，我对一遍哈希。
2. 根 README 和 main 首提交只放 README；不写 E.ON 之外的客户名。
3. 推的 HEAD 变了要重审。
