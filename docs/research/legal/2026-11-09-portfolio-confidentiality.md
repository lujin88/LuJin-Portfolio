# 作品集保密与授权检查（2026-11-09）

任务：#2011 / #2015，以 hiring manager 的眼光看案例里雇主和客户的界面、数据、名字能不能公开。
范围：lujin.me 线上（main `c0eb32e`），加上 `content/ask-lu/`。不是律师，下面不是法律意见，只指出缺口和依据；标「待确认」的建议问律师或原雇主。

## 结论

最要紧的是 **/client-advisory 上 3 张 UBS 内部系统界面**。Ask Lu 自己写着「Internal details, screens and data are confidential」（`content/ask-lu/cases/ubs-advisory.md`），网站上却放了高保真、带 UBS 标志和内部产品名的屏幕。hiring manager（尤其银行和金融科技）看到这一页，第一反应是「她会不会也这样泄我们的」，比任何设计问题扣分都多。

## 检查表

| # | 项目 | 问题 | 证据 | 依据 | 建议怎么改 | 影响 | 阻塞上线吗 |
|---|---|---|---|---|---|---|---|
| 1 | /client-advisory（UBS） | 概念区 3 张图是 UBS 内部顾问系统的高保真界面：UBS 标志、内部系统名「CAWB 2020+」「Investment Hub」、内部 AI 助手名「Red. Your UBS AI Assistant」、内部指标（NNM / NNUC / NNL mCHF、Next Best Client score、「Risk: UBS Advice PHC」）、整套导航结构、CIO 观点模块、产品推荐逻辑和「Product suitability checked」流程。线上已公开，`_next/image` 可直接下载原图 | `ca/image/cawb.webp`、`us-tech.webp`、`investment-hub-client-view-1.webp`，由 `ca/client-advisor/components/session-06/concept-mockups.ts` 引用；lujin.me/client-advisory 页面源码里有这三个文件 | 离职后保密义务继续存在（OR Art. 321a Abs. 4）：https://www.fedlex.admin.ch/eli/cc/27/317_321_377/de#art_321_a ；泄露商业秘密（StGB Art. 162、UWG Art. 6）：https://www.fedlex.admin.ch/eli/cc/54/757_781_799/de#art_162 、https://www.fedlex.admin.ch/eli/cc/1988/223_223_223/de#art_6 。另外 Lu 自己在 Ask Lu 写了屏幕保密，前后矛盾 | **先下线这 3 张图**（从 `conceptMockups` 去掉，或换成去掉品牌的线框图）。替换方案：Lu 自己重画的低保真线框，不带 UBS 标志、内部系统名、内部指标名和真实导航；所有名字和数字明显是虚构的；页面上加一行「Illustrative, recreated for this portfolio」。要放原图，必须先拿到 UBS 书面同意 | 大 | **是**：建议今天就撤，撤图的 PR 交 @dev，属设计 PR，Lu 合 |
| 1a | GitHub 仓库 lujin88/LuJin-Portfolio | 仓库是**公开**的。`ca/image/` 里有 12 个 UBS 界面文件，包括原始 PNG/JPG，还有网站上没用的 3 张（Proposal creation、Review & execute、Investment Hub Client page），任何人都能直接下载。最早的是 2026-09-24 加进来的。只从 main 删掉没用：文件还在 git 历史里 | `gh repo view` → PUBLIC，0 fork；`git ls-files ca/image` | 同第 1 条 | 最快的办法是把仓库改成私有（Vercel 照样能从私有仓库部署），这要 Lu 在 GitHub 设置里改，属高风险操作。要彻底清掉，还得改写 git 历史（filter-repo 加 force push，会影响所有开着的 PR 和工作区），按 approval.md 走 | 大 | **是** |
| 2 | /client-advisory（UBS） | 图里把真实 UBS 员工的名字和照片当素材：「Paul Donovan, Chief Economist, UBS Global Wealth Management」配头像 | `investment-hub-client-view-1.webp`「Engagement timeline · Yesterday」 | 人格权 ZGB Art. 28：https://www.fedlex.admin.ch/eli/cc/24/233_245_233/de#art_28 ；照片和姓名是个人数据（DSG Art. 5 lit. a）：https://www.fedlex.admin.ch/eli/cc/2022/491/de#art_5 | 跟第 1 条一起撤；重画时不用任何真人的名字和照片 | 中 | 随第 1 条 |
| 3 | /client-advisory（UBS） | 透露了一个**还没上线**的 AI 产品的内部状态和数字：17 位顾问访谈、500+ 顾问的目标人群、各地区测试反馈（APAC 不同）；Ask Lu 还写了「budget for the next phase was approved」。这是未公开的产品路线，比单纯的「我做过 X」敏感 | `app/i18n/messages/ca.ts`（body1Html、glance2、footnote）；`content/ask-lu/cases/ubs-advisory.md` Status 行 | 同第 1 条（OR 321a Abs. 4，「保护雇主的正当利益」那部分） | 待确认，建议问律师或原经理：数字能不能用。稳妥的写法：保留量级和结果（「每次客户互动省 10 分钟以上」），去掉「预算已批」和地区测试细节。跟 @copy 一起改，我不写正文 | 中 | 否，但建议跟第 1 条一起处理 |
| 4 | 首页 logo 墙 | ISC-EJPD 的标志用了瑞士联邦的盾形十字（瑞士国徽）。瑞士国徽只能由联邦等公共机构使用，私人网站放它不行 | `public/assets/images/logo/isc-ejpd-logo.svg`，`public/home.html` 的 logo 墙 | 国徽保护法 WSchG Art. 8 Abs. 1：https://www.fedlex.admin.ch/eli/cc/2015/402/de#art_8 | 去掉盾牌，只留文字「ISC-EJPD」，或者整个换成文字「Swiss Federal IT Service Centre (ISC-EJPD)」 | 中 | 否，小改，建议跟下一个设计 PR 一起改 |
| 5 | 首页 logo 墙 | 标题写「Clients I've designed for」，但 11 个 logo 里 Mercedes-Benz、Siemens、Porsche、Airbus、Deutsche Telekom、Bosch 在 CV、首页经历和 Ask Lu 里都没出现。面试时被问到却讲不出项目，就是可信度问题；没做过的话还算对自己的不实宣传 | `public/home.html` 第 1968–2005 行 alt 列表；`content/ask-lu/experience.md` 里没有这 6 家 | 对自己的不实或误导性说法（UWG Art. 3 Abs. 1 lit. b）：https://www.fedlex.admin.ch/eli/cc/1988/223_223_223/de#art_3 ；商标正当描述性使用的边界（MSchG Art. 13）：https://www.fedlex.admin.ch/eli/cc/1993/274_274_274/de#art_13 | **待确认（问 Lu）**：这 6 家是不是 Futurice 或 Designaffairs 时期真实做过的客户项目。是的话，CV 或 Ask Lu 里至少要有一句能对上的；不是或说不清的话，从墙上去掉。也可以把标题改成「Brands I've worked with at agencies」 | 中 | 否 |
| 6 | /EON（Futurice 客户） | 用了 E.ON 的业务数字：转化率从约 5.1% 涨了 300%、德国范围、上线后两个月。这是客户的业绩数据，一般归代理合同里的保密条款管 | `app/i18n/messages/home.ts`「4× lead conversion rate」；`content/ask-lu/cases/eon-solar.md` | 待确认：要看 Futurice 跟 E.ON 的合同和 Lu 的雇佣合同，我看不到 | 问 Lu：当时是否得到过 Futurice 或 E.ON 的同意，或者这个数字有没有在 Futurice 的公开案例里出现过。出现过就附上链接作为依据；没有的话，建议改成相对的说法，不写基线 | 小 | 否 |
| 7 | /man-truck-bus | 黑客松作品，页面已写「All operational data is fictional」，这一点做得对。剩下的是：用了 MAN 官方 logo，以及黑客松作品的知识产权归属 | `app/man-truck-bus/page.tsx` `man-official.png` | 待确认：看黑客松的参赛条款（IP 和宣传条款） | 问 Lu：手上有没有参赛条款。条款允许参赛者展示作品就不用改 | 小 | 否 |
| 8 | /bmw-design-system、-v2 | 截图是已经上架的 BMW app 公开界面（例如 Remote Engine Start 免责弹窗），不是内部文件，风险低。两页都是 noindex，但链接是公开的 | `public/assets/images/bmw-system/engine-disclosure.png` | 同第 6 条：要看代理合同 | 不用改。可以加一行「Shipped app, screenshots from the public release」，hiring manager 一看就知道这是公开内容 | 小 | 否 |
| 9 | 警方平台（AdNovum） | 网站上没有屏幕，只写了「nationwide Swiss platform」，做法对。Ask Lu 会回答试点州（Aargau 先上）和测试过哪些语区。这是安全系统的上线细节，没必要讲 | `content/ask-lu/cases/police-platform.md`「Rollout and testing」 | 同第 3 条 | 建议从 Ask Lu 里删掉「Rollout and testing」这一节，留「26 cantons」和保密说明就够了。改 `content/ask-lu/` 算设计 PR | 小 | 否 |

## 不是问题的

- UBS 截图里的「客户」（Julia Clerici、Pierre Brandtner、0031 00000001 这种编号）看起来是虚构的样例数据，不涉及银行保密（BankG Art. 47）。但这一点我只能从界面推断，**需要 Lu 确认**这些名字和地址都是编的。撤图以后这个问题也就没了。
- MAN、ETF 页标明了数据是虚构或公开调查的，没问题。

## 交给谁

- 第 1、2 条：@pm 派 @dev 开撤图 PR（设计 PR，Lu 合）；替换的线框图交 @visual。
- 第 3、9 条的文案：@copy。
- 第 4、5 条：@visual 改 logo 墙；第 5 条需要 Lu 回答。
- 第 6、7 条：需要 Lu 回答，放进 PM 的待问清单。

## 补充：访客数据和隐私说明（QA 审查第 9 条，2026-11-09 下午）

不是法律意见。网站现在没有隐私说明页，只有页脚一行「Visit statistics via PostHog (EU).」（`app/i18n/messages/common.ts:10`）。

| # | 项目 | 问题 | 证据 | 依据 | 建议怎么改 | 影响 | 阻塞上线吗 |
|---|---|---|---|---|---|---|---|
| P1 | PostHog 录屏 | QA 在 /client-advisory 上看到加载了 `posthog-recorder.js`，说明 PostHog 项目设置里开着 session replay。代码里没有关它（`instrumentation-client.ts` 没设 `disable_session_recording`），所以开不开由 PostHog 后台决定。录屏会记下鼠标、点击、页面内容，也可能记下访客在 Ask Lu 里打的字。页脚只说「Besuchsstatistik」（访问统计），没提录屏 | QA AUDIT.md 第 9 条；`instrumentation-client.ts` | 告知义务：DSG Art. 19 https://www.fedlex.admin.ch/eli/cc/2022/491/de#art_19 ；面向欧盟访客时 GDPR Art. 13 https://eur-lex.europa.eu/eli/reg/2016/679/oj ；德国访客的设备访问规则 TDDDG §25 https://www.gesetze-im-internet.de/ttdsg/__25.html ；PostHog 自己的录屏隐私设置说明 https://posthog.com/docs/session-replay/privacy | 作品集用不着录屏，建议**在 PostHog 后台关掉 session replay**，只留匿名的页面统计（现在是 `memory` 模式，不存 cookie，这点做得对）。要留录屏的话，至少把所有输入框遮住（`maskAllInputs`），并在隐私说明里写明 | 中 | 否，但建议尽快，Lu 在 PostHog 后台点一下就能关 |
| P2 | Ask Lu | 访客问的问题会发给 Anthropic（美国）生成回答；为了限流，访客 IP 会存进 Upstash 一小时（`app/api/ask-lu/route.ts:36`，20 次/小时）。这两点网站上都没写 | `app/api/ask-lu/route.ts` | 跨境提供个人数据：DSG Art. 16 https://www.fedlex.admin.ch/eli/cc/2022/491/de#art_16 ；告知义务同上 | 在隐私说明里写清楚；Ask Lu 输入框下面加一行小字：回答由 AI 生成，问题会发给 Anthropic 处理，别输入个人信息 | 中 | 否 |
| P3 | 隐私说明页 | 没有。现在用到的服务：Vercel（托管，服务器日志里有 IP）、PostHog EU（统计）、Anthropic（Ask Lu）、Upstash（限流用的 IP，存 1 小时） | `app/` 里没有 privacy 或 datenschutz 页 | DSG Art. 19；GDPR Art. 13 | 加一个简短的 /privacy 页（英德两版）：负责人（Lu、Zurich、邮箱）、用了哪些服务、各存什么、存多久、访客能联系谁；页脚那行统计说明改成链到这一页。正文由 @copy 写，我给要点清单 | 中 | 否 |
| P4 | Impressum | 没有。瑞士法律对个人作品集一般不强制要求 Impressum（UWG Art. 3 Abs. 1 lit. s 管的是网上卖东西或卖服务）；德国的 Impressum 义务（DDG §5）原则上管的是在德国的提供者 | — | UWG Art. 3 https://www.fedlex.admin.ch/eli/cc/1988/223_223_223/de#art_3 ；DDG §5 https://www.gesetze-im-internet.de/ddg/__5.html | 待确认，建议问律师。成本最低的做法：在隐私页里一起写上姓名、城市、邮箱，就相当于一个简单的联系信息 | 小 | 否 |
