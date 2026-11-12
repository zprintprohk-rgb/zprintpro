# ZprintPro 三站点 SEO／AEO／GEO 两周排名提升飞轮

**日期**：2026-11-13  
**角色**：ZprintPro 首席 SEO／AEO／GEO 数据战略分析师  
**执行窗口**：2026-11-13—2026-11-26  
**数据基线**：2026-11-12 导出的最新完整 GSC；7d／28d 实际均结束于 2026-11-10  
**适用范围**：zh-hk／en／ja；Google 自然搜索、答案引擎、生成式引擎、交易页 CTR 与采购体验、DeepSeek Harness 学习闭环

---

## 0. 决策摘要

### 0.1 核心判断

**不是全站排名都掉了。当前主要问题是“展示仍在、平均位置未全面恶化，但点击与 CTR 回落”，再叠加若干交易页的商业真值冲突。**

- 7d：149 点击、7,651 展示、CTR 1.9475%、平均位置 13.5641；较前批点击 −9、展示 +123、位置改善 0.3882。
- 28d：560 点击、25,316 展示、CTR 2.2120%、平均位置 14.5482；较前批点击 −7、展示 +319、位置改善 0.0302。
- 54 个重点精确查询中，28d 首页词为 7 个；除 `即日印刷` 外，其余首页重点词均为零点击，但多个词展示很小，不能包装成胜利。
- 连续两个 28d 窗转弱的重点词只有 `海報印刷`、`a2 poster`、`教材 印刷製本`、`コミケ 印刷`；没有连续两窗改善的重点词。
- 第一优先级不是继续铺长文，而是**统一价格／MOQ／交期／尺寸／认证等商业真值，修复交易页采购路径，并抓首页高展示零点击词的摘要与 CTR**。

### 0.2 两周资源顺序

1. **P0｜商业真值与线上页面一致性**：先消除同页及同 SKU 的价格、MOQ、交期、尺寸冲突；未拍板前不自行选值。
2. **P1｜首页零点击 CTR**：先保存真实 SERP、title／snippet、query×page 和可见采购信息，再决定最多一个变量。
3. **P1｜既有变更复测**：海报／喜帖主承接、flyer／教材价格修正、en catalog 变更均处于测量窗，不叠加新改动。
4. **P2｜近首页与深位采购词**：10–20 位优先做承接与页面价值；30–40 位先诊断，不把“排名深”直接等同于“缺长文”。
5. **P2｜单篇深层 Blog**：只有确认现有交易页与文章仍缺真实采购决策信息，才每轮最多生产或复写一篇；无信息增量必须 `NO_OP`。
6. **GEO｜固定问题集复测**：2026-11-20—11-24 执行 S2，保存完整答案与 citation URL；不重跑 S1，不用普通 WebSearch 冒充 GEO 引用。

### 0.3 本阶段不承诺

- 不承诺任何词在两周内进入首页。
- 不把 GSC 点击、展示或位置变化表述为询盘、订单、收入或 ROI。
- 不把移动窗口变化直接归因于某次部署。
- 不批量重写 title／meta，不自动 canonical、301、noindex、砍页或新建同义页。
- 不移植竞品价格、交期、认证、退款或产能承诺。

---

## 1. 数据口径与验收边界

### 1.1 实际窗口

| 数据集 | 实际窗口／日期 | 点击 | 展示 | CTR | 平均位置 | 与前批比较 |
|---|---|---:|---:|---:|---:|---|
| 24h | 最新 24h 档 | 7 | 578 | 1.2111% | 11.8528 | 前批 17／940／1.8085%／11.6273；只作健康信号 |
| 7d | 2026-11-04..2026-11-10 | 149 | 7,651 | 1.9475% | 13.5641 | 点击 −9；展示 +123；位置改善 0.3882 |
| 28d | 2026-10-14..2026-11-10 | 560 | 25,316 | 2.2120% | 14.5482 | 点击 −7；展示 +319；位置改善 0.0302 |

**结论**：点击与 CTR 回落需要处理，但展示和平均位置不支持“全站排名全面下降”的表述。24h 样本量小，不能作为趋势证据。

### 1.2 三个月背景

最新可用 3mo 档仍为 2026-11-03 导出，覆盖 2026-08-01..2026-10-31；它不是 11-12 新档。

| 月份 | 点击 | 展示 | CTR | 平均位置 |
|---|---:|---:|---:|---:|
| 2026-08 | 321 | 19,031 | 1.6867% | 25.1262 |
| 2026-09 | 413 | 22,162 | 1.8636% | 14.2209 |
| 2026-10 | 545 | 24,059 | 2.2653% | 14.0948 |

这只能作为搜索表现背景，不能证明 9 月某批 SEO 动作造成后续变化。

### 1.3 复核与限制

- 六批 7d／28d 数据均以双方法 reconciliation 核对，`match=true`。
- 工作簿 Summary 的 8 个派生值、Focus 的 54／54 公式均通过独立 QA。
- 工作簿交付文件保留图表和样式；验证副本由公式库重算，**不宣称已由 Excel 引擎完整重算原交付文件**。
- query、page、country 是独立表，未拼接成 query×page×country；没有联接表时，蚕食与主承接份额均为 `NOT_MEASURABLE`。
- 精确 query 缺行统一写 `NO_CURRENT_BASELINE`，不是零需求；包含匹配主题组不能替代精确词。
- 导出日期不等于数据结束日期，禁止固定使用 `lag=3`。

---

## 2. 行业大词、真正带钱词与任务分层

### 2.1 分类规则

| 类型 | 判断标准 | 在本阶段的用途 |
|---|---|---|
| 行业大词 | 泛行业、公司或服务发现，如 `印刷`、`印刷公司`、`香港印刷`、`printing company` | 建立品类与品牌可见性；不单独作为两周转化实验中心 |
| 采购带钱词 | 明确产品＋印刷／訂製／小批量／产地采购／装订或用途，如 `海報印刷`、`包裝盒訂製`、`china catalog printing` | 交易页、采购信息、内链与 CTR 的主战场 |
| 季节／事件词 | 月曆、利是封、喜帖、C109、年賀状等 | 按真实季节与官方活动信息承接，不造安全截稿日 |
| 信息／答案词 | `c109 日期`、文件规范、尺寸选择等 | AEO／GEO 答案与决策支持；不能硬算为采购词 |
| 歧义词 | `教科書印刷`、`小冊子印刷` 等跨语言或意图不唯一词 | 必须结合查询文本、承接页与市场，不自行指定 locale |

完整 54 个重点精确查询的分类、现值、前批、delta、首页状态与两窗方向见：

- `docs/assets/2026-11-12/gsc-focus-query-delta-28d.csv`
- `docs/assets/2026-11-12/zprintpro-gsc-money-keyword-review-2026-11-12.xlsx`
- `.hermes/logs/gsc-2026-11-12-money-keyword-delta.json`

### 2.2 行业大词现值

| 精确查询 | 28d 展示 | 点击 | 位置 | 判断 |
|---|---:|---:|---:|---|
| 印刷 | 110 | 1 | 20.32 | 泛行业词；保持 hub 与实体承接，不单独铺文 |
| 印刷公司 | 147 | 2 | 26.76 | 公司选择意图；需要真实实体、服务范围与采购路径 |
| 香港印刷 | 27 | 2 | 11.63 | 样本小但已有点击；先保持，不因短窗波动改页 |
| 印刷服務／印刷廠／網上印刷 | 无当前精确行 | — | — | `NO_CURRENT_BASELINE`，不是零需求 |
| printing company／printing services | 无当前精确行 | — | — | `NO_CURRENT_BASELINE`，不从英文泛词盲开新页 |

### 2.3 28d 首页重点词

| 精确查询 | 展示 | 点击 | 位置 | 判断 |
|---|---:|---:|---:|---|
| 即日印刷 | 55 | 2 | 8.16 | 首页且有点击；保持服务条件真值，不做无谓改写 |
| 书籍印刷 | 5 | 0 | 7.60 | 展示过小，不能放大为突破 |
| 證書印刷 | 7 | 0 | 10.00 | 展示过小，先观察 |
| 食品包裝印刷 | 107 | 0 | 8.53 | 首页高展示零点击，CTR 诊断优先级高 |
| small batch sticker printing | 21 | 0 | 7.29 | 首页零点击；保持既有 HOLD／MEASURE，11-28 复测 |
| saddle stitch booklet printing | 1 | 0 | 4.00 | 仅 1 展示，不派单 |
| 卒アル販売 | 16 | 0 | 5.00 | 不能等同印刷采购转化，先分清意图 |

### 2.4 连续两个 28d 窗转弱

| 精确查询 | 当前展示／点击／位置 | 两周动作 |
|---|---|---|
| 海報印刷 | 206／1／17.23 | 与 `印海報` 合并诊断；主 URL 已拍板为 `/zh-hk/category/posters/`，11-21 看承接份额 |
| a2 poster | 38／1／40.00 | 检查 en PDP、SERP 与实际承接，不新建海报文章 |
| 教材 印刷製本 | 56／0／36.95 | ja 第一诊断优先级之一；先核语言、价格、交期与页面真值 |
| コミケ 印刷 | 129／0／25.74 | 查活动意图、装订采购信息与履约真值，不造活动承诺 |

`宣傳單張`、`喜帖印刷`、`利是封印刷`、`印海報` 仍有排名或承接风险，但本批不再全部满足“连续两个 28d 窗转弱”标签；不得沿用旧标签代替新数据。

---

## 3. 三站点深度盘点

### 3.1 zh-hk：海报先复测，贴纸／单张／书刊先诊断，包装先真值

| 词簇 | 当前 28d 证据 | 主要问题 | 两周决策 |
|---|---|---|---|
| 海报 | `海報印刷` 206／1／17.23；`印海報` 118／0／15.91；`poster 印刷` 70／0／12.44 | 排名接近首页但点击弱；历史承接分散；类目与指南仍有旧商业口径 | 主承接已定为 `/zh-hk/category/posters/`；11-14 只看方向与真值，11-21 看 query×page 份额 |
| 贴纸 | `貼紙印刷` 136／0／34.35；`貼紙訂製` 42／0／28.64；`可移貼紙` 39／0／15.64；`戶外貼紙` 75／0／16.37 | 主词深位、不同材质意图不同；MOQ 与出血口径冲突 | 先诊断索引、材质意图、承接和真值；不新建泛贴纸指南 |
| 宣传单张 | `宣傳單張` 136／0／36.46；`宣傳單張印刷` 126／0／28.17；`摺頁印刷` 65／0／22.72 | 深位；既有 11-08 价格修正在复测窗；类目 MOQ／交期有冲突 | 保持冻结基线；11-14、11-21 复测；无新信息缺口不重写 |
| 书刊／学校 | `書刊印刷` 129／0／33.74；`印書` 59／0／31.05；`學校印刷` 53／0／18.02 | 书刊深位，学校词更接近首页；装订、页数、数量与打样路径需一致 | 学校词优先做近首页承接；书刊先查页面分工，不用 Blog 抢交易主词 |
| 包装 | `包裝盒訂製` 56／0／34.45；`包裝盒印刷` 52／0／32.08；`紙盒印刷` 56／0／36.38；`紙盒訂製` 54／0／32.19；`禮盒訂製` 54／0／46.09 | 词组整体深位；盒型、材质、MOQ、打样与报价条件需先统一 | 不全面铺量；先完成包装商业真值裁决，再选一个盒型采购路径实验 |
| 食品包装 | `食品包裝印刷` 107／0／8.53；`食品印刷` 66／0／5.83 | 首页高展示零点击 | 保存 SERP／snippet；核查可见食品适用边界与真实采购条件，不添加未证实认证 |
| 季节 | `月曆印刷` 141／0／22.48；`利是封印刷` 60／1／23.65；`喜帖印刷` 27／0／42.59 | 季节性与意图差异；喜帖历史由感谢卡错接 | 喜帖主承接已定为 `/zh-hk/category/wedding-invitations/`；11-21 复测；月曆／利是封不盲目新建页面 |

### 3.2 en：catalog 冻结新增变量，小批量贴纸等复测，doujin 保持承接

| 词簇 | 当前 28d 证据 | 判断与动作 |
|---|---|---|
| catalog | `china catalog printing` 91／0／13.98；`catalog printing china` 41／0／14.95 | 11-09 已有 H1 与 description 两次上线记录，不能包装成严格单变量实验；本阶段冻结新增变更，保留部署证据，11-18 看完整 7d，12-04 才进入 28d 经营判断 |
| small batch | `small batch sticker printing` 21／0／7.29；`small batch stickers` 51／0／15.88 | 单词首页零点击、复数近首页；PDP 的价格／MOQ／proof／交期存在多套口径，但在 11-28 复测前保持 HOLD／MEASURE，不叠加标题或正文改动 |
| doujin | `doujinshi printing` 60／0／10.53 | 首页下沿零点击；先保存 SERP 与可见装订／文件／交付信息，不急于新写泛文 |
| a2 poster | 38／1／40.00 | 连续两窗转弱；检查 PDP 与实际 SERP，不与 zh-hk 海报改动混为同一实验 |
| 泛行业词 | `printing company／printing services` 无当前精确行 | 不盲开泛词内容；优先 catalog、stickers、doujin 的采购路径 |

### 3.3 ja：教材与 C109 先清除真值风险，再谈内容扩写

| 词簇 | 当前 28d 证据 | 判断与动作 |
|---|---|---|
| 教材 | `教材 印刷製本` 56／0／36.95；`教科書印刷` 无当前精确行 | 连续两窗转弱；先核价格、装订、交期、语言质量与旧 Blog 的无源数字，缺行不等于零需求 |
| C109 | `コミケ 印刷` 129／0／25.74；`c109` 184／0／9.65；`c109 日期` 98／0／9.53 | 采购词与活动信息词分开；官方活动日期可回答，24h、DHL、72h 等承诺须先核真值 |
| 小册子 | `小冊子印刷` 24／0／11.25 | 近首页零点击；先保存 SERP／snippet 与装订信息，不直接扩写 |
| PVC | `pvc シール` 24／0／15.71 | 有展示但样本有限；保持测量，不因短窗位置变化派单 |
| 卒アル | `卒アル販売` 16／0／5.00 | 销售与印刷意图不同，不把首页位置直接视为商业胜利 |

C109 官方信息：活动为 2026-12-29—12-31、东京 Big Sight，东 4–6 因改修不可用。官方事实可保留；安全截稿日、特急、配送时效必须由 ZprintPro 自身履约真值决定。[Comiket 官方](https://www.comiket.co.jp/)

---

## 4. 首页零点击 CTR 与用户体验飞轮

### 4.1 候选池不是自动改写清单

| 精确查询 | 展示 | 点击 | 位置 | 第一动作 |
|---|---:|---:|---:|---|
| c109 | 184 | 0 | 9.65 | 信息意图；核对活动答案与 citation，不强求采购 CTA |
| 食品包裝印刷 | 107 | 0 | 8.53 | 保存 SERP／snippet；核查真实采购条件与摘要一致性 |
| c109 日期 | 98 | 0 | 9.53 | 提供官方日期答案，避免商业承诺干扰 |
| 食品印刷 | 66 | 0 | 5.83 | 与食品包装合并诊断，不新建同义页 |
| a1海報 | 56 | 0 | 1.00 | 位置第 1 仍零点击，必须看真实 SERP、查询意图与摘要，不能假定“再升排名” |
| 大信封 | 40 | 0 | 4.22 | 检查规格与采购意图，样本有限 |
| 海報印刷即日 | 24 | 0 | 9.62 | 核对即日条件真值，不添加未批准时效 |
| 海報印刷一張 | 21 | 0 | 3.10 | 核对单张 MOQ／价格真值，不自行填数字 |
| small batch sticker printing | 21 | 0 | 7.29 | 保持 11-28 复测计划，不叠加改动 |

### 4.2 10–20 位零点击优先池

`印海報` 118@15.91、`china catalog printing` 91@13.98、`戶外貼紙` 75@16.37、`騎馬釘印刷` 73@12.97、`poster 印刷` 70@12.44、`紙袋印刷` 66@17.32、`doujinshi printing` 60@10.53、`學校印刷` 53@18.02。

这些词优先做**真实承接、页面采购价值与摘要诊断**；不是因为位置接近首页就批量改 title。

### 4.3 采购 UX 统一标准

每个交易页应在同一采购路径回答：

1. 尺寸与适用场景。
2. 数量与真实 MOQ。
3. 材质、纸质、工艺或装订。
4. 文件格式、出血、色彩与预检。
5. 打样、报价与价格适用条件。
6. 生产、交付、地区与限制边界。

竞品共同点是把这些决策要素放在同一采购路径，而不是文章越长越好。可借鉴信息架构，不复制商业条件。[e-print](https://www.e-print.com.hk/), [Print Rainbow](https://www.printrainbow.com.hk/), [Avery](https://www.avery.com/), [book-hon](https://www.book-hon.jp/), [printpac](https://www.printpac.co.jp/)

### 4.4 摘要实验 SOP

`冻结 baseline → 真实 SERP／snippet → query×page → 商业真值门 → 最多一个变量 → 审批 → 部署 → 线上核验 → D1／D2 健康检查 → 7／14／28 天复测`

Google 官方说明：title link 应准确、简洁、独特并与正文同语言；摘要主要来自正文，meta description 只是候选；没有偏好的固定字数。项目既有 50–57 半角当量规则继续作为内部约束，但不能凌驾商业真值与单变量纪律。[Google title links](https://developers.google.com/search/docs/appearance/title-link), [Google snippets](https://developers.google.com/search/docs/appearance/snippet)

---

## 5. 商业真值 P0：本批发现的生产页风险

以下是本轮对线上页面的实际核验结果，不是搜索缓存推断；本批未修改这些生产页。

| 页面 | 已见冲突或风险 | 处置 |
|---|---|---|
| `/zh-hk/category/posters/` | FAQ A2／A1 价格与 Specifications 不一致；批量与标准交期不同；最大尺寸两种说法；另有订单／满意度数字 | 已按 CT-20261113-D1-D6 D1 裁决；进入 bounded READY，尚未部署 |
| `/zh-hk/category/stickers/` | 10 张 MOQ 与热门尺寸 100 张起冲突；2mm／3mm 出血不一致；订单与平均交付数字待核 | 已按 D2 裁决：逐 SKU MOQ、默认 3mm 模板优先、履约报价确认 |
| `/zh-hk/category/flyers/` | MOQ 10 与统计卡 100 张起不一致；标准 3 日与 2–3 日并存 | 已按 D2 裁决剩余项；11-08 部署历史保留，剩余真值独立记账 |
| `/en/product/small-batch-stickers/` | 首屏与阶梯表单价不同；10pc 与 10 A4 sheets 两套 MOQ；proof／交期多口径 | 已按 D3 裁决；snippet HOLD 不阻止真值修正，部署后重置复测 |
| `/en/product/catalog-printing/` | MOQ 10／100、at-quote／3–5 天、proof 4h／1h、90%+／95%+ 等口径并存 | MOQ 沿用 10；其余已按 D4 裁决，残留修正部署后重置复测 |
| `/zh-hk/blog/poster-printing-guide/` | 仍有旧价格、时效、认证、订单量、客户比例、退款等口径 | D1／D6 已授权 bounded 清理；首轮仅此文，尚未部署 |
| `/ja/blog/campus-education-printing-pillar-guide/` | 价格、认证、退款、市场规模及月度数字待核 | D5／D6 已裁决：匹配 SKU JPY 或删除／报价确认 |
| `/ja/blog/textbook-printing-guide/` | 出现内部文件名、基本仕様价格、时效与配送口径 | D5／D6 已裁决；清内部表达与无源承诺，不重做已批价格 |
| `/ja/comiket-c109/` | 24h、DHL 2–4 日、72h 全球配送待核 | D5 已裁决；官方活动事实保留，自有履约删除或报价确认 |

**优先级解释**：相互矛盾的答案会同时损害用户决策、搜索摘要一致性、AEO 答案可信度与 GEO 引用可靠性。继续铺长文会放大这些冲突，而不是解决它们。

---

## 6. SEO／AEO／GEO 分工

### 6.1 SEO：可检索、承接与交易页权威

- 每个采购意图保留明确主交易 URL；Blog 负责决策支持并回链，不抢主词。
- 海报与喜帖沿用已拍板主 URL，11-21 按同一 query×page 基线复测承接份额。
- 深位词先查索引、意图、页面分工、内链、内容差异与真实采购信息，不直接做 canonical／301。
- 内链锚文本使用真实 GSC 词形与自然语言，避免批量完全匹配。

### 6.2 AEO：可抽取的真实答案

- 尺寸、数量、材质、装订、文件要求、打样报价、交付边界用清晰表格与短答案表达。
- FAQ、正文、结构化数据必须一致；没有拍板值就写清报价条件，不编数字。
- 活动日期等外部事实引用官方来源；自有交期与活动事实分开。
- 首页零点击先查真实摘要，不机械堆 FAQ 或增加篇幅。

### 6.3 GEO：可比较的真实引用

Google 官方对 AI features 的说明仍以可索引、正文价值、内链、页面体验和结构化数据一致为基础，没有独立的“GEO 特殊 schema”捷径。[Google AI features](https://developers.google.com/search/docs/appearance/ai-features), [Google helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)

本阶段 GEO 只接受：

`固定引擎＋固定问题＋完整原始答案＋引用域名＋citation URL＋执行时间`

- S2 窗口：2026-11-20—11-24。
- 不重跑 S1，不覆盖原始答案。
- 普通 WebSearch、搜索排名、平台 bot 拦截均不算 GEO 引用增长。
- S2 未完成前保持 `NO_COMPARABLE_BASELINE`。

---

## 7. 深层 Blog 信息缺口矩阵

| 词簇 | 已有资产／当前状态 | 还缺什么证据 | 本轮允许动作 |
|---|---|---|---|
| flyers zh-hk | 既有 `flyer-printing-guide`；11-08 价格修正在复测 | 新 query×page、线上真值、是否仍有未覆盖采购问题 | 默认 MEASURE；无新增值不写一篇 |
| stickers zh-hk | 既有 `sticker-guide` 已覆盖材质与工艺 | MOQ／出血／交期真值、材质意图与承接 | 不新建泛贴纸文；先真值与诊断 |
| books zh-hk | 既有书刊／教材指南 | 主 URL、装订／页数／部数缺口、页面分工 | 仅证实具体缺口后复写一篇 |
| posters zh-hk | 既有海报指南；主 URL 已拍板 | 11-21 承接份额、旧价格／认证／时效清理授权 | 不新建海报文；优先修旧口径 |
| packaging zh-hk | 批 1 已 DONE（7b396bd9），多份包装与盒型内容 | 仅剩逐 SKU 条件标注与复测 | remeasure；不全面铺量，不复活旧 WAITING 门 |
| en small batch | 已有 PDP／分类与既有测量 | 残留真值；未修正时 11-28 SERP 复测 | 不写新文；真值修正独立批，部署后 RESET_BY_TRUTH_FIX |
| en catalog | 11-09 H1／description 已变更，MOQ=10 已决 | proof／交期／色彩残留与复测 | remeasure；残留真值独立批，不用 Blog 叠加 |
| ja 教材 | 既有校园／教材内容 | 无源数字清理、语言质量、装订采购缺口 | 先审真值；再决定是否单篇复写 |
| ja C109 | 活动页与同人内容 | 官方事实、自有履约边界、文件与装订信息 | 不造截稿日；无新增值不扩写 |

**产量纪律**：`ZP-blog-deepfix` 每周最多 1 篇，允许 `NO_OP`；12 段骨架是结构工具，不是排名保证，也不是必须凑满的生产指标。

---

## 8. 两周逐日执行表

> 所有生产变更都必须先满足 approval gate；表中出现日期不等于自动授权改页。`deploy` 与 `verify` 未发生则写 `NONE`，不得预填成功。

| 日期 | owner | baseline／任务 | approval | deploy | verify | retest | exit |
|---|---|---|---|---|---|---|---|
| 11-13 | GSC＋weekly＋Harness owner | 11-12 四窗与 54 词基线；周总结；宿主 PARTIAL 修复；D1–D6 裁决与队列对账 | CT-20261113-D1-D6；仅 READY＋decision_record 可执行 | 本批仅脚本／prompt／docs／queue，无 src | JSON／diff／隔离测试；lane-status 只读对账 | 实际部署后另建 baseline | 有真实报告；PARTIAL 只跟进 NEXT；调度异常另列 |
| 11-14 | blog＋GSC | flyer／sticker／books 复测；海报／喜帖首轮方向与真值一致性 | 无新信息缺口不写；不自动改主 URL | 默认 NONE；单篇须另过门 | 线上旧口径与既有部署仍在 | 11-21 | 只判方向；28d `BACKGROUND_ONLY`；允许 NO_OP |
| 11-15 | GSC | 补齐首页零点击 query×page／SERP；海报与喜帖保持已拍板主 URL | 缺联接写不可测 | NONE | 保存原始证据与窗口日期 | 11-21 | 形成 FIX／HOLD 提案，不确认蚕食 |
| 11-16 | en owner＋GSC | catalog 变更后初步健康检查；doujin 首页下沿摘要证据 | 不叠加 snippet 变量；已知真值错误按 D4 独立批 | 默认 NONE；若真值修正须记录实际部署 | 线上 H1／description 与部署记录一致 | 未修正 11-18；修正后按新 baseline | 只排健康风险，不判胜负 |
| 11-17 | 页面 owner＋Harness | 按 CT-20261113-D1-D6 执行 posters／stickers／flyers 等一个 READY 残余批次 | 仅 READY＋decision_record＋完整 write_scope；不再等重复拍板 | 未执行则 NONE；执行仅一个逻辑批次 | tsc／门童／线上正文与 FAQ／schema 一致 | 实际部署后 D1／D2、7／14／28d | 真值一致或保持阻断；不重做 DONE，不写无源数字 |
| 11-18 | GSC | 11-09 变更后首个完整 7d 窗；海报／catalog／教材等读数 | 不因 7d 直接 SCALE | NONE | 计算实际变更后占比，不固定 lag | 11-21、12-04 | 判方向与下一动作；失败有 owner／retry_at |
| 11-19 | blog owner | 信息缺口复审：从已通过真值门的词簇最多选 1 个 | 必须证明现有页与文均未覆盖 | 最多 1 篇或 NONE | 若为文：URL、内链、正文、schema、部署一致 | 7／14／28d | 无信息增量 `NO_OP` |
| 11-20 | weekly＋GEO owner | 周总结与 bounded 问题解决任务；GEO S2 开始 | 固定问题集；不批量 title | 仅已批 FIX | 完整答案、citation URL、部署证据分开存 | 11-24、12-04 | 未完整部署复测不学习；GEO 不宣称增长 |
| 11-21 | blog＋GSC | 海报／喜帖 query×page 承接份额复测；flyer／教材第二观察；Blog 单篇或 NO_OP | 沿用 10-31 同一基线；主 URL 不重新拍 | 默认 NONE | 海报 category、喜帖 category 与历史份额对比 | 12-04 | 判承接是否集中；窗口移动不判部署胜负 |
| 11-22 | GEO owner | S2 固定问题续测；三站采购路径 UX 抽查 | 不因 AI 缺席自动产文 | NONE | 原始答案完整、URL 可打开 | 11-24 | 缺引用如实记录，不用 WebSearch 补齐 |
| 11-23 | en owner＋GSC | catalog／small-batch 复核；检查残留真值任务是否实际部署 | snippet 继续 HOLD；真值仅按 D3／D4 READY 任务 | 未执行则 NONE；真值修正不得伪装成 snippet 实验 | 价格／MOQ／proof／交期一致性与部署证据 | 未修正沿用 11-28／12-04；修正后重置 | 旧实验标 RESET_BY_TRUTH_FIX 或保持原复测 |
| 11-24 | GEO＋weekly owner | S2 收尾；首轮摘要实验健康检查（仅若已部署） | 固定引擎／问题不变 | NONE | 完整答案与 citation URL 归档 | 下个可比周期 | 有可比基线才判变化；否则 `NO_COMPARABLE_BASELINE` |
| 11-25 | UX＋GSC | 三站采购路径一致性抽查；近首页零点击池复盘 | 不在复测窗叠加新实验 | NONE | 尺寸／数量／材质／文件／报价／交付六项核对 | 11-26、12-04 | 输出下一批 bounded FIX／HOLD／STOP |
| 11-26 | K3 review＋全 owner | 两周完成度审计：生产、测量、PARTIAL、调度四栏 | 不自动扩量 | NONE | 对照本表逐项验收 | small-batch 11-28；monthly 12-01；经营窗 12-04 | 只沉淀完整证据；下一周期不重复已完成事项 |

---

## 9. DeepSeek Harness 实际升级

### 9.1 已定位并修复的宿主误判

11-12 `ZP-gsc-feedback` 真实报告首行是 `VERDICT: PARTIAL`，且实际交付当日报告与 `gsc-daily-anomaly-2026-11-12.json`。旧 `lane-git-commit.py` 只接受 OK，因而额外生成 failure 报告并把总线写为 STALE。

本批修复：

- `scripts/lane-git-commit.py`
  - 完整四字段且非 AUTO-FILL 的 `OK／PARTIAL／NO_OP` 均可正常收尾。
  - 总线保留真实 verdict；三者 `state=completed`、`key_consumed=true`。
  - FAILED／BLOCKED／STALE、缺字段与占位报告仍拒绝。
- `scripts/lane-status.mjs`
  - PARTIAL 映射 completed，但进入 ATTENTION／problems，recovery 指向 NEXT，不再写“无当日报告”。
  - NO_OP 映射 completed，不算异常、不重试。
  - 对已证实的旧 OK-only 误判做窄范围兼容纠正，历史 bus 不改写。
- `scripts/lane-preflight.py`
  - `lane-status.json` 缺失或生成日期非今日都会刷新，再计算 sibling lanes。
  - PARTIAL 生成 `FOLLOW_UP_PARTIAL`，只处理报告 NEXT。
  - NO_OP 不重试；历史异常若后续已有真实终态，写入 `suppressed_retry_queue`，不重复派发。
  - 状态刷新增加 exit／错误诊断，Node 路径解析失败不再静默。
- `scripts/strategy-feedback.py`
  - 短窗 `previous_*／current_*` 动态识别，不再硬编码 11-03／11-07。
- 六个共享提示词／契约
  - 增加实际数据结束日、晚到补消费、query×page 不可测、商业真值优先、单篇 Blog、固定 GEO 探针与真实 verdict 规则。

### 9.2 验证结果

- `python scripts/tests/test-lane-runtime.py`：**25／25 通过**。
- 覆盖 PARTIAL、NO_OP、lane-status 状态、动态短窗字段、陈旧 status 刷新、后续终态抑制、PARTIAL 只跟进 NEXT、低样本门与 Blog 队列冷却约束，以及既有失败／阻断／幂等场景。
- 已接入低样本与队列冷却约束，防止策略仍为 HOLD 时机器另派 FIX；2026-11-13 真实周报已复核 `small batch sticker printing` 保持 HOLD 至 11-28。
- 测试使用隔离临时 git repo，未运行生产 wrapper、未触发远端 push。
- 重新对账后，11-12 GSC 真实报告已显示 `PARTIAL／completed`；旧 STALE bus 保留为历史证据。
- `git diff --check` 通过；Node／Python 语法检查通过。

### 9.3 调度异常仍未关闭

2026-11-13 00:29 的只读对账仍显示：

- `ZP-weekly-meta` scheduler `LastTaskResult=1`。
- `ZP-monthly-matrix` scheduler `LastTaskResult=2147946720`。
- `ZP-k3-review` scheduler `LastTaskResult=2147946720`。

这些与 PARTIAL 宿主误判是不同问题。脚本修复、手动立即执行、wrapper=0 或报告存在都不能证明自然调度恢复；需要单独做管理员级调度诊断与自然轮验收。本批没有猜测 2147946720 的根因。

### 9.4 学习与自进化的边界

现有周／月车道继续承担总结与派单，不新增第八条 Windows 任务、不创建 Kimi Automation、不改触发时刻。

学习入口必须包含：

`baseline＋change＋approval＋production_deploy＋online_verify＋retest＋exit`

- 缺部署或复测：不进入学习候选。
- 有学习但无 scale_evidence：不 SCALE。
- 同因问题：recurrence，不重复建单。
- 真值未决：只生成裁决材料，不自动转 READY。
- 晚到数据：下轮 `LATE_ARRIVAL_BACKFILL`，同一导出只消费一次。
- 周报／月报必须分列生产变更、测量报告、PARTIAL 跟进、调度异常。

---

## 10. D1–D6 已裁决与执行包状态

裁决 SSoT：`docs/2026-11-13-commercial-truth-optimal-value-decisions.md`；机器记录：`.hermes/logs/commercial-truth-decisions-2026-11-13.json`。以下均为**策略已裁决、生产未在本批部署**，不再重复等待同一项 K3 拍板。

| ID | 已确定口径 | 执行状态／测量规则 |
|---|---|---|
| D1 posters | A2 10 张 HK$16 起；A1 柯式 20／喷绘成品 290 起／喷绘基材 45–56；未证最大尺寸、时效与统计删除或报价确认 | 既有 DONE 不重做；category 残余与首轮 `poster-printing-guide` 分批 READY |
| D2 stickers／flyers | MOQ 逐 SKU；普通贴纸 10、食品标签 500；默认 3mm 出血且模板优先；flyers 10 张；履约报价确认 | category、指南价格、五类残余分任务，禁止同文件跨车道同日写 |
| D3 small-batch | en 10 stickers／pcs、from US$0.55 带规格条件；不混用 10 A4 sheets；proof／生产／运输报价确认 | snippet HOLD 不保留已知错误；真值部署后 `RESET_BY_TRUTH_FIX`，否则原 11-28 复测不变 |
| D4 catalog | MOQ 10 copies；USD 已确认价；proof／履约报价确认；90%+／95%+ 无测量协议即删除或改 ICC／打样流程 | 11-09 部署历史保留；残余修正若部署则重置测量，不叠加 snippet 变量 |
| D5 ja 教材／校园／C109 | C109 官方事实与 ¥7,500 订单起价继承；自有价格仅匹配 SKU JPY；认证／退款／特急／配送无证据删除或报价确认 | 既有 C109 DONE 不重开；旧 Blog 与匹配 SKU 残余进入 READY |
| D6 旧 Blog | 无来源价格、认证、订单量、客户数、退款与满意度删除或条件化；公共法规与官方事实中性保留 | A／B／C 逐段清理，禁止 528 处无上下文替换；价格 title 优先常青且过冻结／当量门禁 |

仍未由本批授权的事项保持原门：全站 Blog H1 品牌后缀模板、`FIX-20261031-PRIMARY-URL-MISMATCH`、canonical／301／主 URL、名片展示层与贺卡资产。

---

## 11. 数据来源

- GSC 原始档：`GSC数据/`，2026-11-12 最新完整导出；7d／28d 结束于 2026-11-10。
- 四窗复核：`.hermes/logs/gsc-2026-11-12-four-window-analysis.json`。
- 54 词差分：`.hermes/logs/gsc-2026-11-12-money-keyword-delta.json`。
- 工作簿独立 QA：`.hermes/logs/gsc-2026-11-12-workbook-independent-qa.json`。
- 历史策略：`docs/2026-11-07-three-market-seo-aeo-geo-flywheel-strategy.md`、`重要文件/2026-10-31-money-keyword-seo-aeo-geo-global-strategy.md`、`重要文件/2026-10-30-three-strategy-completion-and-next-phase.md`。
- 主承接执行证据：`.hermes/logs/2026-11-08-poster-wedding-primary-url-execution.md`。
- 最新车道报告：`.hermes/logs/2026-11-12-ZP-gsc-feedback.md`。
- 调度只读对账：`.hermes/logs/lane-status.json`，2026-11-13 00:29。
- 页面证据：本轮 FetchURL 核验的 zprintpro.com 生产页面，见第 5 节 URL。
- 商业真值裁决：`docs/2026-11-13-commercial-truth-optimal-value-decisions.md` 与 `.hermes/logs/commercial-truth-decisions-2026-11-13.json`，2026-11-13。
- 竞品与官方来源：e-print、Sticker Mule、UPrinting、printpac、Raksul、Comiket、Google Search Central；只验证信息架构，不采用竞品数值作为本站真值。

---

## 12. SOP-10 五问自检

1. **架构差异**：已查 11-07 飞轮、11-08 主承接执行、11-09 catalog 变更与 11-12 GSC 报告；没有把不同实施路径臆断为冲突。
2. **约束适用范围**：D1–D6 已按 K3 本日授权形成裁决；名片展示层、既有贺卡资产、middleware 301、canonical 与主 URL 权限均保持；本批未触生产页面。
3. **原数据／拍板来源**：所有 GSC 数字来自上述原始档与复核 JSON；海报／喜帖主 URL 有 11-08 拍板与部署证据；未把无来源数字写入建议。
4. **字段值策略**：保留值均继承既有批准或匹配 SKU；无来源时效、认证、退款与统计删除或报价确认，不以竞品或估算值代填。
5. **Markdown 渲染**：本报告仅为 docs；未修改 user-facing 文本，未引入需要 `parseInlineLinks()` 的生产变更。

**最终结论**：下一阶段的最强飞轮不是“更多自动化长文”，而是**可信交易页 → 可验证摘要与采购体验 → 明确主承接 → 单篇信息增益 → 固定复测 → 受约束学习**。先让页面值得被点击、值得被引用，再让自动化扩大已证实有效的动作。
