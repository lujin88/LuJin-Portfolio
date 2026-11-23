# UBS 现场版 deck 推到公开 repo 的检查（2026-11-17）

任务：#client-advisory-slid #16262。范围：`~/Desktop/Presentation/CA/ubs-advisory-complete-cursor-handoff/`（107 MB，约 200 个 html、74 png、10 jpg、1 mp4）。不是律师，不是法律意见；标「待确认」的建议问律师。

## 结论

**不通过，整夹不能推到公开 repo（lujin88/LuJin-Portfolio 是 PUBLIC）。** 依据与 `2026-11-09-portfolio-confidentiality.md` 第 1、1a、2 条相同：UBS 内部系统界面公开后收不回来（OR Art. 321a Abs. 4 离职后保密；StGB Art. 162；UWG Art. 6）。

## 检查表

| # | 文件 | 问题 | 建议 | 阻塞公开 |
|---|---|---|---|---|
| 1 | `v3/firstcall-ui-0/1/2.png`、`source/product-screens/*`（Investment Hub、US Tech、Proposal 1、Group 360） | 高保真 UBS 内部顾问系统界面：UBS 标志、「CAWB 2020+」、Investment Hub、Red、NNM/NNUC/NNL mCHF、Next Best Client score、「Risk: UBS Advice PHC」、人名（Nadia Kim、Mark Dawson 等）。与 11-09 报告第 1 条同一批屏幕 | 不推。公开版换成自画低保真线框，无 UBS 标志、内部系统名、内部指标名、真实导航 | 是 |
| 2 | `advisory-slides-16x9/*.png`（slide-01…26、doors、five-sources、three-screen-flow、slide-menu 等）、`source/direction-boards/*`、`source/visual-references/*` | 幻灯片截图内嵌上述界面；逐张未审 | 不推；要推先逐张去掉界面 | 是 |
| 3 | `source/storyboard/case-study-bundle.md`、`case-study-files`、`README.md`、`index*.html` 里的文案 | 访谈人数、目标人群、状态等未公开项目细节（11-09 第 3 条）；未逐行审 | 公开前请 @copy 按 11-09 第 3 条改写后，我再看 | 待确认 |
| 4 | `advisory-slides-16x9/slide-05-marco.mp4` 和 poster、`slide-open-photo.jpg`、`source/character-reference/*.jpeg` | 可能含真人面孔、来源和授权不明（头像照片见 11-09 第 2 条，ZGB Art. 28、DSG Art. 5） | 推前先确认来源/授权；不明的不推 | 待确认 |
| 5 | `assets/ubs-logo*.svg` | 来自网上的非官方矢量，来源/授权未核；公开版要加回「not affiliated with UBS」 | 公开版用纯文字 UBS，或 UBS 提供的官方文件 | 否（条件） |
| 6 | 约 150 个 `index.backup-*.html` 等 | 每份都带上述内容，推上去等于把旧版全公开，也没有价值 | 不推 | 是（随 1–3） |
| 7 | 封面照片（UBS 招牌） | 来源、授权未知（旧待办） | 公开前先查 | 待确认 |

## 能推的最小集合（建议）

只推：不含 UBS 界面的 html/css/js（页面骨架）、自画线框、字体（先核 Satoshi 授权）、「not affiliated with UBS」封面。其余留本地 git 备份。

## 另外

- 推到哪个分支、是否进 main 部署：GitHub 写入按 harness-core 流程，并且在不含 `ca/image/` 同类保密文件的前提下。
- Lu 是否有 UBS 书面同意：没有，就按本表办。
