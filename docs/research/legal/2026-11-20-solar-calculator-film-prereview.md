# solar-calculator-film → study-case-presentation 预审（2026-11-20）

不是法律意见。源 lujin88/solar-calculator-film main 48c74b6（20 文件，约 6MB）。目标 study-case-presentation/solar-calculator-film/（私有）。PR 还没开，开了以 PR HEAD 为准重核。

## 预审结论：私有 repo 可放，3 点要处理或确认；转公开前必须处理

- index.html：无外链、无网络请求、无存储、无邮箱；图片都是本地 assets/。字体用系统字体，无需授权。
- 来源 repo 的提交含 Lu 个人邮箱和 Claude-Opus 会话行；pm 已定只拷文件不带历史，用 bot 提交，同意。
- assets/screens/ 7 张是 E.ON 德国 Solar 页面的设计稿截图，含：
  1. 01_landing-page.png：一张可识别的真人照片（小女孩和两个孩子在房前草地），非 AI 合成，来源与授权不明（疑似 E.ON 或图库）。未成年人肖像 + 第三方版权，是这批里风险最高的一项。
  2. 01/02：Google Sunroof 卫星图（屋顶热力图），Google 地图类影像有署名和使用条款；截图里没有署名。
  3. E.ON 商标、客服电话 0800-7472637、页脚「2018 E.ON Energie Deutschland GmbH」、06 里 E.ON 的同意书全文和 keineWerbung@eon.de 地址（都是 E.ON 公开内容，不是 Lu 的个人数据）。
  4. 示例地址 Bergmannstr. 4 / Skartlitzerstraße 10（设计稿示例，非客户数据）；表单是空的，没有真实个人信息。
- 04-2 带 Figma 界面图标（无法务问题）；assets.md 里有 Figma 文件 ID（不是密钥，可保留或删）。

## 建议
1. 放进私有 repo：可。条件：README 注明「E.ON 设计稿截图，仅作作品集展示，非公开发布」。
2. 转公开或公开链接前：01_landing-page.png 里的孩子照片和卫星图要遮掉/换掉，或问 E.ON/图库授权；E.ON 商标沿用 eon/ 的待确认（建议问律师）。
3. 待确认：这份 Figma 是 Lu 为 E.ON 做的设计稿，还是复刻 E.ON 现有页面？前者要看合同里作品展示条款，后者署名要写清（待确认，建议问律师）。

## 条件
- PR 里只放这 20 个文件 + 根 README 一行；eon/ 不动；用 bot noreply 署名。
