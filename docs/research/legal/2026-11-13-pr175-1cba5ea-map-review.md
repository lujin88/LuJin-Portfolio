# PR #175 — native-map follow-up

**法务要改 1cba5ea4aa36d5f8034967b323aea3fa1aa3e735**。仅剩地图署名在最终显示尺寸的可读性；原生 logo 位置及 Belvoirpark 遮挡问题已关闭。2026-11-13，Codex / Legal & Privacy，非法律意见。

| 项目 | 问题／核验 | 依据 | 建议怎么改 | 阻塞上线吗 |
|---|---|---|---|---|
| 原生标志与来源 | 已看 step 5、recapture-native-wide.cjs 与 bounds；脚本比对原生 logo 几何，未再平移；图中地名无遮挡。源 PNG 与 step 5 的 SHA-256 均匹配 assets.md。 | [本 SHA 来源记录](https://github.com/lujin88/LuJin-Portfolio/blob/1cba5ea4aa36d5f8034967b323aea3fa1aa3e735/docs/gratula-v8/assets.md) | 保留当前原生源图及底栏，无需继续挪 logo 或为此重截源地图。 | 此项否 |
| 署名可读性 | 源视口宽 690 CSS px，手机地图约 345 CSS px；底栏原高 13 CSS px 随图减半，文字从交付图估算约 5 CSS px（不是浏览器实测字号）。786px 宽 step 5 图片缩至 393px 时署名难读，外层案例手机图还可能进一步缩小。存在全部像素不等于平均读者能读。 | [Google Geo Guidelines — Required attribution / Keep the attribution close](https://about.google/brand-resource-center/products-and-services/geo-guidelines/) 要求署名贴近内容且普通读者可读，允许必要时调整署名文字样式和位置。 | 保留图内原生 logo/版权栏，另在地图紧邻位置提供普通 HTML 署名文字，逐字沿用来源的 Map data ©2026 Google。原型、实际案例页、静态展示页中凡显示该地图/手机截图的位置均需可读署名；不要只把补充文字烘焙进再次缩小的手机截图。可从 12px 高对比正文试起，最终由三宽 100% 显示验收；12px 是项目建议，不是 Google 明文最低值。 | **是，修复后复审** |
| 范围 | 本次是已核实 Google 源图的补充可读署名，与最初无来源图片只补 Google 字样不同。 | 同上来源记录和 Geo Guidelines | 不替换、裁除原生署名；未来若来源列其他数据商，也须完整列出。文字由 copy/dev 按源文准确实现。 | 同上 |
| 隐私及发布 | 沿用此前增量审查边界；未做运行时网络测试或全站合规认证。row29 隐私承诺仍单列跟进。 | 本地 2026-11-12-pr175-79de05c-review.md；2026-11-13-pr175-00c0e4b-map-review.md | hold 保留，新 SHA 到后复核；最终 visualqa/QA 尚待。 | 未给发布通过 |

独立计算的 SHA-256：
- google-maps-seestrasse.png: 6b55f7bb710898772db7579b7945bb2418a3fc06cf052810406a042d565409d7
- screen-step-5.png: 094751a33b23669046803df90638ccf02c7a5cd3a4a4f5fb159eb093b081e1dd

未改产品代码、3000、hold 或部署状态。

