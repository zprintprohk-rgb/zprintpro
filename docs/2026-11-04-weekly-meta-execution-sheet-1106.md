# 11-06 weekly-meta 执行清单（逐字稿 · 单变量分批 · PROPOSE_ONLY）

> 依据：`2026-11-04-o6-poster-decision-pack.md` · `2026-11-03-meta-ctr-decision-pack-1106.md` · `2026-11-04-j1-textbook-diagnosis.md` · `2026-11-04-e2-catalog-diagnosis.md`
> 定位：把四份诊断包收敛为**可直接执行的 before/after**，降低车道执行误差。所有数字均取站内既有真值，**不新增任何未拍板数字**。
> 纪律：每项单变量、分批上线；未获批准不得改 title；不得同批改 title+desc+正文。

## A. 顺序建议（按 杠杆 × 风险）

| 批 | 项 | 变量 | 风险 | 复测锚点 |
|---|---|---|---|---|
| 批 1 | ① poster blog desc 语言错配 | desc only | 低 | 11-13（7d）`海報印刷`（基线 210 imp / 1 clk / pos 9.78） |
| 批 2 | ② packaging category desc 首句词形 | desc only | 低 | 11-13 `食品包裝印刷`（基线 118 imp / 0 clk / pos 8.42） |
| 批 3 | ③ ja textbook blog desc 过短 | desc only | 低 | 11-13 `教材 印刷製本`（基线 31 imp / pos 11.97 jpn） |
| 批 4 | ④ en catalog blog title 58 + desc 331 | title 与 desc **分两批** | 中（title churn） | 11-20 `china catalog printing`（PDP 40 imp / 13.30） |
| 批 5 | ⑤ ja foil-red-packets PDP desc 96 过短 | desc only | 低 | 11-20 `燙金利是封` jpn（基线 33 imp / pos 1.00 / 0 clk） |

## B. 逐字稿

### ① `/zh-hk/blog/poster-printing-guide/` — desc（现为英文 197 字符）

- 现值：`From A3 to A0 posters, art paper to PP film, UV printing to foil stamping — …breaks down poster printing sizes, paper choices, finishing options, and design tips for maximum visual impact.`
- **A41 改稿（2026-11-06 23:3x，双方法复算确认）**：旧稿价格（A2 HK$16／A1 HK$20）取自 category 真值，与该 blog 自身 title「HK$9起」及正文（A2 10 張起印 HK$9 起/張、A1 1 張起印 HK$45 起/張；HK$9×46 / HK$45×28 为正文主导价）矛盾 → **禁逐字执行旧稿**。
- 拟改（中文，152 字符，已实测；blog 真值版）：

  > 香港海報印刷指南：拆解 A3 至 A0 尺寸、紙質、UV 印刷／燙金等工藝、防水與啞膠膜選項及設計要點，展覽、活動、店舖、餐廳宣傳適用。智印港 A2 10 張起印 HK$9 起/張、A1 1 張起印 HK$45 起/張，3-5 個工作天交貨；滿 HK$500 順豐免運，DHL 全球 2-4 天，30 秒 AI 即時報價。

- 真值来源（2026-11-06 23:3x curl 实抓，全部为该页可见正文/标题）：`HK$9起`（title）· `A2 10 張起印 HK$9 起/張`·`A1 1 張起印 HK$45 起/張`·`3-5 個工作天`（×21）·`滿 HK$500`·`順豐免運`·`DHL 全球`·`30 秒 AI 即時報價`·`防水`（×62）·`啞膠`（×26）·`展覽/活動/餐廳`（×30/94/56）—— **不新增任何数值**；category 的 A2 HK$16/A1 HK$20 **不得**进入本页 desc。

### ② `/zh-hk/category/packaging/` — desc（现 136 字符，首句主词为「包裝盒印刷訂製」）

- 现值首句：`包裝盒印刷訂製 100 個起，HK$2.5 起/個 ✓ 食品級紙盒/紙袋/防油紙卡（食品級紙材可選）✓ 免費 1 小時打稿 ✓ 3-5 天出貨 ✓ 滿 HK$500 順豐免運。 适配行业: 美妝護膚品牌…`
- 拟改（**仅改首句词形 + 修尾部中文夹英文**，其余不动）：

  > 食品包裝印刷 100 個起、HK$2.5 起/個：食品級紙盒、防油紙卡、紙袋，食品級紙材可選。免費 1 小時打稿、3-5 天出貨、滿 HK$500 順豐免運。適用美妝護膚、跨境電商、茶飲食品、醫藥保健與婚慶禮盒。

- 真值来源：100 個起 / HK$2.5 起 / 免費 1 小時打稿 / 3-5 天 / 滿 HK$500 順豐免運 —— 同页现有 desc 与 `category-seo-content.ts`。
- 注意：**不动 title**（当量 56 合规）；「适配行业」改为「適用…」仅为中文可读性，不含新增承诺。

### ③ `/ja/blog/textbook-printing-guide/` — desc（现 111 字符）

- 拟改（目标 150-160）：

  > 教科書・教材の印刷製本を100冊から。中綴じ・無線綴じ・製本の3方式、部数別の単価、校正・入稿の流れをまとめて解説。学校・教育機関の一括発注にも対応。無料のお見積りは30秒で完了します。

- 真值来源：100冊から（title 现有）、3製本方式（title 现有）、校正・入稿（页面 markers）、見積り —— 均为页面既有表述；**不写具体价格**（避免与 JPY 真值冲突）。

### ④ `/en/blog/catalog-printing-china-supplier-guide/` — title 58 + desc 331

- 现值 title：`Catalog Printing China Supplier Guide: 4 Binding + 4 Paper`（**58 当量 = 阻断线；无品牌位**）
- 拟改 title（目标 50-57，含品牌）：

  > `Catalog Printing China Guide: 4 Binding + 4 Paper | （品牌）`

  当量核算：需上线前用 `scripts/guards/title-equiv.js` 复核落 50-57；若超，删 `+ 4 Paper`。
- 现值 desc 331 → 拟改（150-160）：

  > `Compare catalog printing in China: 4 binding types, 4 paper stocks, MOQ 10, free proof, DHL 2-4 day worldwide shipping. See real specs and pricing.`

  真值来源：MOQ 10 / free proof / DHL 2-4 day —— 均取自同页与 PDP 现有文案。
- **分两批**：先 desc（批 4a），14 天后再 title（批 4b），否则无法归因。

### ⑤ `/ja/product/foil-red-packets/` — desc 96 → 150-160（季节窗口）

- 现状：`箔押し祝儀袋印刷：12色の箔、パール紙・ソフトタッチ紙・コート紙の組み合わせガイド、大面積は分割版見当で対応。100個から HK$1.10起、5-7営業日、無料デザイン3案。30秒AI見積り。`（**96 字符**）
- 背景（11-04 复核）：`燙金利是封` 在 **jpn 33 imp / pos 1.00 / 0 clk**，承接页是 `/zh-hk/product/foil-red-packets/`——这是**查询语言匹配**（中文查询）的合理结果，**不是 hreflang 缺陷**；ja 页本身已本地化良好（lang ja-JP、`箔押しポチ袋印刷`、title 当量 55）。
- 拟改方向：补 用途（御祝儀/ご祝儀袋・結婚式・お年玉）・数量段（100個から）・納期（5-7営業日）・無料デザイン3案 —— 全部为同页既有事实，**不新增价格/折扣承诺**。
- 风险：低（desc only；ja 季节窗口 11-12 月）。

## C. 执行前必查（车道自查 5 条）

1. 目标字段当前值与本文 before 一致（若已被他人改动 → 停止并报告，勿覆盖）。
2. 改后长度：desc 150-160 字符（ja/zh 按字符，en 按字符）；title 当量 50-57 用 `title-equiv.js` 实测。
3. 门童全链：`check-encoding --fix` / `title-v5`（若改 title）/ `brand` / `gsc-leak` / `meta 完整性`。
4. 单批单变量；commit message 写明「变量=desc 或 title」与基线数字。
5. 上线后 D1/D2 健康检查（200 + 索引未掉），再等 7 天同口径复测。

## D. 未纳入本清单（理由）

- `/en/category/books/` title 75、`/en/category/stickers/` 104、`/ja/category/stickers/` 83：**title churn 敏感面**，且与①-④的 desc 批若同期上线无法归因 → 需 K3/车道单独批准，并各自单批。
- `saddle stitch booklet printing`（pos 9.71 页 1 零点击）：先补有效 SERP 证据（需 HK/US 出口）。
- 任何 MOQ/价格/交期数值：WAITING_K3，不在本清单。

## 数据来源

- 四份诊断包（同日）：`2026-11-04-o6-poster-decision-pack.md`、`2026-11-03-meta-ctr-decision-pack-1106.md`、`2026-11-04-j1-textbook-diagnosis.md`、`2026-11-04-e2-catalog-diagnosis.md`
- 线上实抓：`.hermes/logs/gsc-2026-11-04-o6-live-titles.json`、`gsc-2026-11-04-j1-live-probe.json`、`gsc-2026-11-04-e2-live-probe.json`、`_snippet_probe_1103.cjs` 输出
- 基线数字：`.hermes/logs/2026-11-03-ZP-gsc-feedback.md`、`gsc-2026-11-04-handoff-14q-snapshot.json`、`gsc-2026-11-04-taskj-third.json`

---

## E. 2026-11-05 归因修正增补（首席分析师，PROPOSE_ONLY）

> 来源：`docs/2026-11-05-food-packaging-fix-attribution-correction.md`。页级归因（`money-kw-query-page-country-2026-10-31.csv`，窗 09-30..10-27）证明 `食品包裝印刷` 页 1 ranker 是 **blog `food-packaging-printing-guide`**（pos 8.56 / 111 imp），**不是** category（pos 63.83）。本增补修正批 2 的复测锚点并新增批 1b；逐字稿沿用本文档 B-①/B-② 写法。

### E-1（新）｜`/zh-hk/blog/food-packaging-printing-guide/` — desc 英→中（变量=desc only）

- 现值：`Food-grade packaging printing essentials — from kraft boxes to food-safe lamination, certifications to design best practices.`（**英文 125 字符**，2026-11-05 07:5x 线上实抓）
- 拟改（**152 字符**，已实测）：

  > 食品包裝印刷完全指南：直接接觸食品須用食品級材質與油墨，材料合規以訂單確認。智印港 100 個起印、HK$2.5 起/個、無開版費無刀模費；標準 3-5 個工作天交貨、1 小時免費數碼打稿、滿 HK$500 順豐免運、DHL 全球 2-4 天。拆解 6 大食品類型材質對照、紙材比較與設計實務，30 秒 AI 報價。

- 真值来源：全部为该页现有可见正文（2026-11-05 实抓）：100 個起印/HK$2.5 起/個/無開版費無刀模費/3-5 個工作天/1 小時免費數碼打稿/滿 HK$500 順豐免運/DHL 全球 2-4 天/6 大食品類型材質對照/合規以訂單確認——**不新增任何数值**。
- 复测锚点（同词同页同国家）：`食品包裝印刷`（基线 112 imp / 0 clk / pos 8.39，API 10-08..11-04）＋ `食品印刷`（62 / 0 / 7.48）；11-13（7d）／11-20（14d）。
- 依赖注记：若 K3 在 11-06 前对认证断言/价格条件化拍板（`FIX-20261030-BLOG-CERT-PHRASES`）并改动该页正文，本逐字稿须由当时正文重推导。
- 风险：低（desc only；与批 1 poster blog 同款语言错配修复类别）。

### E-2（改锚）｜批 2 复测锚点修正（category desc 逐字稿与真值来源不变）

- ~~`食品包裝印刷`（该页 pos 63.83，不在页 1，无法归因）~~ → **`食品包裝訂製`（category 25@10.20 页 1 边缘 / query 级 30@12.30，category 为主 ranker）＋ `包裝盒印刷`（49@33.33）＋ `包裝盒訂製`（47@35.30）＋ `紙盒印刷`（42@33.62）**（hkg，API 10-08..11-04）。
- 复测以展示份额/位置为主要观察项（这些词在 30-35 位深位），点击为次要。
- 判读：category desc 首句词形修复仍长期必要（词形与摘要卫生），但不把 `食品包裝印刷` 记为其复测锚点。

### E-3 顺带观察（只测不批）

- zh-hk blog desc 英文残留为系统性问题（poster 197 英文 + food 125 英文两例已确认）；11-06 单批上线后，对 zh-hk blog desc 全量做语言普查。
- en food-boxes desc 181 字符超带（杠杆小，不进本批）。

---

## F. 2026-11-05 晚·池行 triage 增补（首席分析师，PROPOSE_ONLY）

> 来源：`docs/2026-11-05-pool-snippet-evidence-sweep.md`。运行面事件：**11-05 20:13 gsc 车道被陈旧锁 BLOCKED**（锁=dead pid 25932，20:10 daily preflight 遗留；daily 21:17 按 3600s 陈旧规则自行接管，gsc 下次自然触发 11-06 20:13）——本批不受影响，仅知悉。

### F-1 池内其余行不进 11-06 批（维持单批单变量）——2026-11-05 20:3x 页级归因实证修正

| 池行 | **实证页 1 ranker**（09-30..10-27） | snippet 状态 | triage |
|---|---|---|---|
| poster 印刷 75@10.95 / 海報尺寸 20@4.85 / 海報size 27@9.19 | **`/zh-hk/blog/poster-printing-guide/`**（10.18/7.19/9.64） | desc 197 英文 | **批 1 实证对准**；3 行共 122 imp 同受益，复测可加锚 |
| 大信封 36@3.94 | **`/zh-hk/product/large-envelopes/`**（3.56/36） | title 当量 ~55 / desc 134 中文 | **MEASURE**（长期 top-5 零点击，9/2 即 2.16/89/0；title 词形「大號信封」≈「大信封」） |
| 小冊子印刷 43@10.74 | **`/zh-hk/blog/saddle-stitch-booklet-printing-guide/`**（10.19/48） | desc **113** 短 + **含「vs Alibaba 黃頁」** | 后续批 desc 候选；brand lint 前置 |
| 邊度有紙袋買 25@7.88 | **`/zh-hk/product/handle-bags/`**（8.52/23） | desc 124 短 | **MEASURE**（question 词 PAA 假设）；desc 候选 |
| 即日急件 24@7.83 / 海報印刷即日 20@9.55 | **`/zh-hk/blog/rush-printing-hk-guide/`**（6.40/9.33） | desc **109** 短；**title「\| 智 \| 智印港」双品牌残留** | 后续批 desc 候选；title 缺陷须 title-v5 门禁评估（单变量） |
| doujinshi printing 35@10.91 | **`/en/product/doujinshi-printing/`**（10.42/31） | 观察 | en books title 75 超带属 saddle 词族，与 doujinshi 无关 |
| 燙金利是封 jpn 33@1.0 / a1海報 twn 27@1.0 | ja foil-red-packets / 待定 | 批 5 已覆盖 ja desc | **MEASURE**（跨市场 locale/意图，A35） |
| 包裝食品 裡印 31@9.39 / z print 31@8.90 | 待归因 / 品牌变体 | — | HOLD / 观察 |

### F-2 后续批 desc 候选（不进 11-06 批，11-13 后窗口另立批，各自单变量）

- **rush blog** `/zh-hk/blog/rush-printing-hk-guide/` desc **109**（短 41-51）——锚 `即日急件` 24@7.83 ＋ `海報印刷即日` 20@9.55 ＋ `即日印刷` 39@10.59（唯一有点击行）。
- **saddle-stitch blog** `/zh-hk/blog/saddle-stitch-booklet-printing-guide/` desc **113**（短 37-47；去「vs Alibaba 黃頁」需 brand lint）——锚 `小冊子印刷` 43@10.74。
- **handle-bags PDP** `/zh-hk/product/handle-bags/` desc **124**（短 26-36）——锚 `邊度有紙袋買` 25@7.88（MEASURE 观察，desc 修复不抢跑）。
- 候选只登记不批；SERP 证据 + 审批后按同一 desc-only 流程执行。

### F-3 登记

- **rush blog title 双品牌残留**：`即日急件印刷全攻略：…\| 智 \| 智印港`——客户可见缺陷，title-v5 门禁评估后单变量处理（不进 11-06 批）。
- `/zh-hk/product/envelopes/` slug 未注册（返回首页兜底 title）——仅登记，当前无 GSC 展示证据。
- 当量数值为启发式（CJK×2+ASCII）；任何 title 改动上线前必过 `scripts/guards/title-equiv.js`。
