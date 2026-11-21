# Linear (linear.app/mobile) vs BMW v2 — 一对一差异
来源：Linear 页面 2026-11-19 14:5x 用 Chrome 实截（1440、390，静帧）；BMW v2 = visual #19749 / visualqa #19754 整页图。数字为在 1440 截图上量的近似值（±5px）。动效不比。
图：c1440-top / c1440-keys / c390-top / c390-keys（左 Linear｜右 ours）

## 首屏 1440
1. 图：Linear 满宽照片（手持手机，约占首屏上 60%，高约 600px）；ours 无图，纯色底。
2. 标题：Linear 无衬线粗体约 48px、左对齐，在照片下方；ours 衬线约 70px、居中，在页面中央。
3. 内容列：Linear 左右各留约 230px（内容宽约 980）；ours 左留约 200（内容宽约 1040）。
4. 底色：Linear 近纯黑 #000；ours 深蓝灰 #11141a。
5. 首屏里的次要信息：Linear 右侧有二维码+两个商店按钮、顶部导航；ours 只有 MY ROLE 一行，日期/客户在首屏下方。
## 2×2 手机屏 1440（Linear「Create issues…」那段｜ours Key screens）
6. 格子：两边都是十字 1px 细线分 4 格。Linear 格宽约 490、高约 730；ours 格宽约 520、高约 620（比 Linear 矮约 110）。
7. 标题：Linear 约 18px 中等字重；ours 约 24px，大约 1.3 倍。
8. 说明：Linear 约 13px，限宽约 250，折 3–4 行，标题与说明间距约 8px；ours 约 15px，不限宽，单行，标题与说明间距约 65px。
9. 格内留白：Linear 文字离格左缘约 97px；ours 约 24px（文字贴近分隔线）。
10. 手机：Linear 是带黑色圆角边框的真机外框，宽约 300，底部渐隐，位置在格内偏左（和文字左对齐后居中）；ours 是裸截图无外框，宽约 270，居中，底部渐隐；Services 那格是白底卡，其余三格是深色。
11. 手机与文字的间距：Linear 约 60px；ours 约 50px。
## 390
12. 首屏：Linear 照片约 450px + 标题约 28px 居中 + 两个浅色胶囊按钮；ours 只有居中衬线标题 + MY ROLE（因 #19679 要求首屏只留这两项，与 Linear 不同，需 Lu 定）。
13. 2×2 在 390：两边都变成单列竖排，格间 1px 横线。Linear 标题 ~20px、说明 ~14px 贴着标题；ours 标题 ~20px 一致，说明 ~15px；Linear 每格手机宽约 200 居中带外框，ours 约 240 无外框。
## 没比
滑入动效、点击；Linear 页的中段（大标题段）ours 没有对应块。
