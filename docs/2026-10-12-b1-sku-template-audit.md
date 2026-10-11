# 2026-10-12 B1 SKU 模板相似度审计报告（spam 去毒 · 恢复方案 B 阶段首件）

> 方法：字符 8-gram Jaccard 两两相似度。数据源：`zprintpro-sku-seo-data.csv`（源头 CSV）、`src/data/sku-seo-data.ts`（线上生成文件，93 SKU）。脚本：`.hermes/tmp/sku-similarity.py` / `sku-similarity2.py`，明细 JSON：`.hermes/analysis/sku-similarity-2026-10-12.json` / `sku-similarity2-2026-10-12.json`。可复跑。

## 结论：scaled content abuse 指纹**实锤**，且比预想严重

### 1. 兄弟 SKU 正文大面积近重复（核心证据）

| locale | 正文长度 min/med/max | >50% 相似对数 | 顶部相似对 |
|---|---|---|---|
| en | 0 / 2052 / 2744 字符 | **150 对** | a4↔a5 flyers **0.982**、a2↔a1 posters **0.982**、kraft↔eco bags **0.983**、food↔folding boxes **0.98**、transparent↔foil stickers **0.98** |
| zh-hk | 0 / 459 / 1595 | **108 对** | waterproof↔security↔transparent↔foil↔fluorescent 贴纸五兄弟互扫 **0.955-0.959**、a4↔a5 flyers 0.959、folding↔rigid boxes 0.956 |
| ja | 0 / 1118 / 1506 | **115 对** | 同贴纸簇 / flyers / posters / bags，0.957-0.96 |

**这就是「同一模板换产品名」的规模化内容**：贴纸簇 5 个 SKU 的三语正文互相 96% 相同，海报簇、纸袋簇、纸盒簇同形。Google 无需猜测——93 个 SKU 里约 120-150 对页面近乎互为副本。

### 2. meta keywords 标签 stuffing（渲染层实锤）

- 消费链：`skuSeo.seo[locale].keywords` → `src/app/[locale]/product/[slug]/page.tsx:121` → `src/lib/metadata.ts:18` → **每页输出 `<meta name="keywords">`**。
- 每个 SKU 渲染 ~50-90 个词，其中 **96 个模板词出现在 >8 个 SKU**（`100pcs MOQ`×21、`same day shipping`×19、`即日出貨`×19…）。
- **跨品类污染**：约 20 个 SKU（纸盒、贴纸）的关键词数组里塞着 `pet portrait / pet memorial / dog mom gift / cat dad gift / pet treat label / custom pet label` —— 宠物标签词出现在纸盒和贴纸页上。这正是 9/6 B1 清洗（commit 7b592897「51 en USD garbage tokens」）要清的东西，**在后续 regen 中又回来了**。

### 3. 反向证据（哪些没問題）

- **FAQ 是干净的**：93 SKU 合并 FAQ 文本 0 对 >50% 相似（车道 deepfix 差异化起效）。
- CSV 源头 `正文内容优化` 字段很短（med 95 字符）且 en/ja 大量为空——**近重复的实体是 ts 权威域 `seo.body`**（生成文件 header 自述「CSV 权威域 / ts 权威例外域 body」），即 body 是历史生成产物，不来自当前 CSV 流程。

## 整改建议（待 K3 拍板，恢复方案 B 阶段）

| # | 动作 | 范围 | 风险 |
|---|---|---|---|
| B1a | **删除全站 `<meta name="keywords">` 渲染**（现代 SEO 零收益，纯风险指纹） | metadata.ts 一处 + 抽查 | 零 |
| B1b | 清洗 keywords 数组：删 96 个模板词 + 宠物等跨品类污染词，每 SKU ≤10 个本品类词（B1a 落地后此为防御性清理，防未来复活） | csv-to-sku-seo 管线 | 零 |
| B1c | **正文去重**：贴纸簇/海报簇/纸袋簇/纸盒簇/flyers 簇 top 相似对，按「簇内主推页保留 + 兄弟页人工差异化 30-40%」重写（突出材质对比、场景差异、规格决策表——差异化内容同时是 AEO 素材） | zh+en+ja 三语 × 约 15-20 簇 | 低（内容质量升） |
| B1d | 无可救药的薄页（empty body 1 个 + 正文 <200 字符的）合并或 noindex | 待 B1c 后复扫定名单 | 低 |

## 与断崖的因果链（诚实版）

- 2026 全年 spam 更新节奏：3 月 19.5h、6 月 2d、8 月 2d16h、**9 月 13d15h（史上最慢）**——9 月这次给了 Google 最长的新鲜内容评估窗口，我们的高产管线恰好在这个窗口被完整重新评估。
- 本文档的 150 对近重复 + 关键词 stuffing 是**长期存量**（多数 body 早于 9 月存在），不是 10/9 当周的产物——所以 spam 更新「完成推送后命中」的时间形态吻合：不是新改动触发，而是**存量指纹在新一轮评估中被打分**。
- 教训固化：任何 regen 管线必须带「新增重复度闸门」（本次审计脚本可直接改造成 gate）。

数据来源：本文所列文件与脚本，2026-10-12 03:2x-03:4x 本地实测。
