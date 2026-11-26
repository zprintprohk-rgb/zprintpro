# doujin（同人誌）域语义类残留全量补扫清单（只读）

- **日期**：2026-11-26
- **性质**：只读审计，零 `src/` 写入；本清单直接供修复批消费
- **背景**：11-25 k3-review 推翻 11-24 daily 自报「doujin 域残留 0」——该次只查 9 条精确串、未按语义类扫。本补扫按语义类（A/B/C/D）全仓重扫
- **裁决口径**：K3 2026-10-30 裁决 #5——ja JPY ¥7,500 = 指定规格/数量**订单起价**（非每部单价），写条件句；en/zh 不得复制 ¥7,500，用本市场已确认价

---

## 0. 结论摘要（整体置信：高置信）

1. **已知残留 7 条全部在活文件定位到源锚点**，其中 2 条（zh/ja 车价「× 10 = 大额」）**不是静态字符串，而是运行时渲染**：`products.ts` DJ-001 的 `basePrice: 7500` + `minQuantity: 10` 经 `PdpPurchaseButtons.tsx` 计算渲染——11-24 用精确串查不到的根因即在此。
2. **¥7,500 出现面共 17 处（活文件）**，其中 **9 处违 K3 10-30 #5**（zh/en 页出现、或 ja 页写成「1部/每部」单价口径）；3 处已按裁决条件化（合规）；1 处为代码注释（豁免）。
3. **ja PDP 中文 bullet 的源 = DJ-001 的 zh-Hant-only 字段族**（features 6 条 + specs 4 字段 + options/quantities label 8 条），经 `ProductTabs.tsx:151` `product.features.map` **无 locale 过滤直接渲染**到 ja/en 页。源数据 6 条 vs 任务口径「5 条」存在 1 条差异，待修复批以 live 渲染复核（低置信差异）。
4. **A 类 doujin 域固定天数硬承诺逐条 15 处**（含任务已知 4 处 + 新发现 11 处）；非 doujin 的固定天数表述约 1,035 行（绝大多数为正常标准交期运营信息，修复批不消费）。
5. **同 SKU（DJ-001）价格口径 7 处互相矛盾**：HK$500/部起（DoujinSKU zh）vs $65/book（DoujinSKU en）vs ¥7,500〜/注文〜（price_range）vs HK$7,500×10（PDP 车价 zh）vs ¥7,500×10（PDP 车价 ja）vs ¥7,500 订单起价（sku-seo-data ja，已条件化）vs 1部￥7,500〜（conversion-blocks ja）。

---

## 1. 方法与口径

### 1.1 扫描范围与工具

| 项 | 值 |
|---|---|
| 范围 | `src/` 全树活文件（`.ts/.tsx/.js/.mjs/.cjs/.json`），排除 `*.bak*` 与 `*.w5-now` |
| 文件数 / 行数 | 303 文件 / 110,632 行 |
| 主扫 | Node v24.20.0（`utf-8` 逐行，脚本 `.hermes/tmp/doujin-semantic-sweep.mjs`，原始命中 JSON `.hermes/tmp/doujin-sweep-hits.json`） |
| 复算 | Python 3.13.15（独立实现 11 类核心正则，脚本 `.hermes/tmp/doujin_sweep_verify.py`，结果 `.hermes/tmp/doujin-sweep-verify-python.json`） |
| CJK 判定 | 全程 Node/Python `utf-8` 读取，未用 PowerShell Select-String（per §0.26.9） |

### 1.2 双方法复算结果（§0.23.2）

| 类 | Node | Python | 一致性 |
|---|---|---|---|
| A1a 急+数字+日/天 | 114 | 114 | ✅ |
| A1b 数字+日/天+出荷系 | 788 | 788 | ✅ |
| A2 Rush+N days | 44 | **46** | ⚠️ Python 多 2 条真命中：`src/data/blog-data/en.json:201`、`src/data/products-content.ts:3883`（均非 doujin 域 rush 泛表述；Node 正则字符类略保守）。不影响 doujin 域结论 |
| A3 N days standard | 12 | 12 | ✅ |
| A4 即日/当日+出荷系 | 108 | 108 | ✅ |
| A5 24h+特急 | 81 | 81 | ✅ |
| B2 per copy | 24 | 24 | ✅ |
| B3 ¥7,500 | 17 | 17 | ✅ |
| D1 单价×数量=金额 | 1 | 1 | ✅ |
| E1 ポストカードセット | 14 | 14 | ✅ |
| E3 単価免責句 | 1 | 1 | ✅ |

### 1.3 locale 判定口径

按优先级：① 文件路径 locale（blog-data/*.json、price-tables/{locale}/）② 相邻行字段名（`title_en/descriptionJa` 等）③ 语言启发式（kana 密度 / CJK 密度 / 简体特征字）。启发式判定在清单中标注 `(lang-guess)`；标注 `?` 的为推断，修复批现场复核。

### 1.4 判定词例

- **硬承诺（待修）**：行内含「急行 N 日 / 加急 N 天 / Rush N days / 24時間特急」等数字承诺且无条件化从句
- **已条件化（合规）**：行内含「お見積り / 見積もり確認 / 報價確認 / quoted per artwork and schedule / 按稿件與排期報價確認 / 指定規格・数量のご注文起価」等 11-24 已批句式
- **越界（违 K3 10-30 #5）**：zh/en 页出现 ¥7,500；或 ja 页出现「1部 ￥7,500」「每部单价」口径

---

## 2. A 类：固定天数硬承诺

### A-1 doujin 域逐条清单（15 处）

| # | 位置 | locale | 原文摘录 | 判定 | 建议处置 |
|---|---|---|---|---|---|
| A1 | `src/data/category-seo-content.ts:4000` | zh-hk | `交期: 同人誌常規 5 天 / 貼紙 3-5 天 / 海報 3 天 / 加急 2-3 天` | 硬承诺（无任何条件化从句） | 「加急 2-3 天」改 zh 已批句式「特急対応（按稿件與排期報價確認）」；「常規 5 天」为标准交期可留或改「交期按規格與排期報價確認」 |
| A2 | `src/data/category-seo-content.ts:4011` | zh-hk | `同人誌 5 本加急 3 天出貨，Comiket 前特急対応可議（按稿件與排期報價確認）` | 半硬承诺（前半数字承诺仍在） | 删「5 本加急 3 天出貨」数字段，整句保留已批条件句：「小批量加急服務可議（按稿件與排期報價確認）」 |
| A3 | `src/data/category-seo-content.ts:4188` | ja | `納期: 同人誌通常5日／ステッカー3-5日／ポスター3日／急行2-3日` | 硬承诺 | 「急行2-3日」改 ja 已批句式「特急対応（原稿・日程によりお見積り）」 |
| A4 | `src/data/category-seo-content.ts:4199` | ja | `同人誌5部急行3日、10部急行2日出荷。コミケ前特急対応（原稿・日程によりお見積り）` | 半硬承诺（已知残留 #1） | 删「5部急行3日、10部急行2日出荷」，整句改「コミケ前の特急対応（原稿・日程によりお見積り）」 |
| A5 | `src/data/category-seo-content.ts:4092` | en | `Turnaround: Books 5 days standard / Stickers 3-5 days / Posters 3 days / Rush 2-3 days` | 硬承诺（已知残留 #3 完整命中） | 「Rush 2-3 days」改 en 已批句式「quoted per artwork and schedule」；「Books 5 days standard」若保留需 K3 确认 books 域标准交期口径 |
| A6 | `src/data/sku-seo-data.ts:2594`（zh body 内 C109 直答段） | zh-hk | `預留打樣、生產（常規 5 天、加急 2-3 天）與 DHL 日本 2-4 天配送` | 硬承诺 | 「加急 2-3 天」改「特急対応（按稿件與排期報價確認）」 |
| A7 | `src/data/products-content.ts:9609` | ja | `イベント2週間前までにご注文いただければ、最短3営業日で出荷`（同人誌失败例文段） | 硬承诺 | 改「最短3営業日で出荷」→「特急対応（原稿・日程によりお見積り）」 |
| A8 | `src/app/[locale]/comiket-c109/page.tsx:23` | ja | `標準5-7営業日、開幕前24時間特急、DHL2-4日`（meta desc） | 硬承诺（24時間特急无条件化） | 改「開幕前特急対応（原稿・日程によりお見積り）」 |
| A9 | `src/app/[locale]/comiket-c109/page.tsx:29` | en | `5-7 working day standard…24-hour pre-event rush`（meta desc） | 硬承诺 | 「24-hour pre-event rush」改「rush quoted per artwork and schedule」 |
| A10 | `src/app/[locale]/comiket-c109/page.tsx:35` | zh-hk | `開幕前 24 小時特急`（meta desc） | 硬承诺 | 改「開幕前特急対応（按稿件與排期報價確認）」 |
| A11 | `src/app/[locale]/comiket-c109/page.tsx:45` | ja | `開幕前 24 時間特急（データ完成前提）`（qa） | 半条件化（「データ完成前提」非 11-24 已批句式） | 对齐已批句式「（原稿・日程によりお見積り）」 |
| A12 | `src/app/[locale]/comiket-c109/page.tsx:93` | en | `24-hour pre-event rush (subject to finished files)`（qa） | 半条件化 | 对齐已批句式「quoted per artwork and schedule」 |
| A13 | `src/app/[locale]/comiket-c109/page.tsx:135` | zh-hk | `24 小時特急（以檔案完成為前提）`（qa） | 半条件化 | 对齐已批句式「按稿件與排期報價確認」 |
| A14 | `src/lib/seo.ts:535` + `:538` | zh-hk / ja | zh `同人周邊印刷 10本起 · …Comiket 24h特急`；ja `同人誌印刷 コミケ24時間特急…` | 硬承诺（SEO title/meta） | 特急承诺词改条件化表述或删；改后须过 title-v5-guard 当量带（50-57） |
| A15 | `src/data/sku-seo-data.ts:2590` | zh-hk | `title: 同人誌印刷 10本起印 \| Comiket前24小時特急對應 \| 智印港` | 硬承诺（zh SEO title） | 「24小時特急對應」改「特急対応可議」；同上过 title-v5-guard |

**A-1 边缘（行内涉同人但主题非 doujin 的特急承诺，修复批可一并消费）**：

| # | 位置 | locale | 原文摘录 | 判定 |
|---|---|---|---|---|
| A16 | `src/data/blog-data/ja.json:120` | ja | `A2 10枚〜 ¥300〜、A1 1枚〜 ¥600〜、3〜5営業日、特急24時間。`（poster 文） | 「特急24時間」硬承诺 |
| A17 | `src/data/blog-data/ja.json:13`（同文 `blog-posts.ts:376`） | ja | `短納期（最短3日出荷）`（sticker guide，行内「同人サークル向け」） | 「最短3日出荷」硬承诺 |
| A18 | `src/components/ProductTabs.tsx:190` | ja | fallback bullet `['高品質印刷', '環境に優しい素材', '即日納品', '無料デザイン相談']`（japan-doujin SKU 不在 features map 时触发） | 「即日納品」与 DJ-001 turnaround「5-7 営業日」矛盾 + 硬承诺；建议 japan-doujin 补独立 features 条目（兼修 C 类） |
| A19 | `src/data/category-conversion-blocks.ts:3297` | ja | WhatsApp 预填 `24時間特急製造が使えるか` | 预填模板措辞硬承诺；改「特急製造（原稿・日程によりお見積り）が使えるか」 |
| A20 | `src/data/blog-data/ja.json:584` | ja | `当日急行印刷の締切は 18:00、翌日 12:00 までに SF Express 納品` | 已条件化（18:00 截单为 K3 拍板经营参数白名单）✅ 不修 |

### A-2 非 doujin 固定天数表述（聚合，修复批不消费）

- A1b 788 行：绝大多数为「DHL 国際配送で 2-4 日納品」「標準 5-7 営業日」等标准交期/物流天数正常运营信息（sku-seo-data ja 模板、blog 正文）。
- A2 46 行：`Rush N days` 类，doujin=false 的 42 条中含 `BusinessCardQuoteCalculator.tsx.bak_bc_purge:57`（备份文件，豁免）。
- A4 108 行 / A5 81 行：多为「即日出荷」品类词与竞品对比表述。
- **注意**：若修复批要清理 A-2，需 K3 另行拍板；本清单只承诺 A-1/A-1 边缘 20 条。

---

## 3. B 类：注文 / 单位 / ¥7,500

### B-1 ¥7,500 全部出现面（活文件 17 行，逐条）

| # | 位置 | locale | 原文摘录 | 判定（K3 10-30 #5） | 建议处置 |
|---|---|---|---|---|---|
| B1 | `src/data/products.ts:6705` | 全 locale 共用 | `price_range: '¥7,500〜/注文〜'` | **违规核心**：zh/en PDP 与卡片直接显示该字段 → zh/en 页出现 ¥7,500 + ja 词「注文」 | zh 改「按規格報價」类本市场价或「HK$ 口径價格請以報價為準」；en 改本市场价；ja 改「¥7,500〜（指定規格・数量のご注文起価）」。**该字段无 locale 变体是 zh 页「¥7,500〜/注文〜」的直接源** |
| B2 | `src/data/products.ts:6707` | zh（HKD 渲染） | `basePrice: 7500` | 车价源（zh 页 × 10 渲染 = HK$75,000，见 D 类） | 改订单起价口径或由 K3 拍板 zh 本市场价后重设 |
| B3 | `src/data/products.ts:6708` | en | `basePrice_en: 1245.0` | en 页车价 $1,245×10——与 DoujinSKU en「From $65/book」矛盾 | K3 拍板 en 已确认价后统一 |
| B4 | `src/data/products.ts:6709` | ja | `basePrice_ja: 7500` | 车价源（ja 页 × 10 = ¥75,000，见 D 类） | 与 sku-seo-data「注文開始価格 ¥7,500〜」对齐：若 7500 是订单起价，车价不应 ×10（见 D 类处置） |
| B5 | `src/app/[locale]/comiket-c109/page.tsx:5` | ja（注释） | `単価 ¥7,500 起/部 は sku-seo-data.ts…zh/en は価格を断定せず見積り導線` | 代码注释（§0.23.1 豁免），但注释口径「単価…起/部」与 #5 不符 | 注释口径同步改「注文起価」，避免下次按注释回填错口径 |
| B6 | `src/app/[locale]/comiket-c109/page.tsx:61` | ja | `単価は ¥7,500 から（製品ページ価格表どおり）` | ja 页写「単価」口径——违 #5（应写注文起价） | 改「ご注文は ¥7,500〜（指定規格・数量のご注文起価）」 |
| B7 | `src/components/japan/DoujinSKU.tsx:65` | ja | `price: '¥7500〜/部〜'` | ja「/部」单价口径违 #5 + 格式「〜/部〜」异常 | 改「¥7,500〜（ご注文起価）」 |
| B8 | `src/components/japan/DoujinSKU.tsx:28` | zh-hk | `price: 'HK$500~/部起'` | zh 页有牌价（非 #5 越界）但与 PDP HK$7,500×10 车价、price_range 三处互相矛盾 | K3 拍板 zh 本市场价后统一 |
| B9 | `src/components/japan/DoujinSKU.tsx:47` | en | `price: 'From $65/book'` | en 与 basePrice_en $1,245 矛盾 | 同上 |
| B10 | `src/data/blog-data/en.json:265` | en | `from ¥7,500 per copy`（Quick Answer + pricing 段两处） | **双重违规**：en 页 ¥7,500 越界 + per copy 单价口径 | 改 en 本市场已确认价（basePrice_en 口径或 K3 拍板价） |
| B11 | `src/data/blog-data/en.json:807` | en | `starts at ¥7,500 per copy…price per copy` | 同上双重违规 | 同上 |
| B12 | `src/data/blog-data/zh-hk.json:276` | zh-hk | `每本 ¥7,500 起`（Quick Answer + 價格點計段两处） | **违规**：zh 页 ¥7,500 越界 + 每本单价口径 | 改「按規格報價」或 zh 本市场价 |
| B13 | `src/data/blog-data/zh-hk.json:816` | zh-hk | `¥7,500／部〜` | 同上 | 同上 |
| B14 | `src/data/blog-data/ja.json:265` | ja | `ご注文 ¥7,500〜（指定仕様・数量の注文金額目安…）` | ✅ 已条件化（合规） | 不修 |
| B15 | `src/data/blog-data/ja.json:800` | ja | `10 冊からのご注文で ¥7,500〜（指定仕様・数量の注文金額目安…）` | ✅ 已条件化 | 不修 |
| B16 | `src/data/sku-seo-data.ts:2608` | ja | `価格は指定仕様・数量の注文開始価格 ¥7,500〜（1部あたりの単価ではありません）` | ✅ 已条件化（#5 模范句，与 PDP 车价矛盾见 D 类） | 不修；**注意 sku-seo-data.ts 为派生文件**，改动须回 `zprintpro-sku-seo-data.csv` 源头再跑 `scripts/csv-to-sku-seo.mjs`（SOP-5，禁手搓） |
| B17 | `src/lib/pricing.ts:993` | — | `* ¥7,500〜 无 HKD 带, 回退 convertToFromPrice 原样显示最诚实, 不写换算假值` | 代码注释（客户不可见）✅ 豁免 | 不修；但该注释说明 pricing 层对 ¥7,500 无 HKD 换算——zh 页若显示会裸出 ¥，与 D 类车价链一并核查 |

ja 页「1部」单价口径违规补充（同块 4 处，B16 之外）：

| # | 位置 | 原文摘录 | 判定 |
|---|---|---|---|
| B18 | `src/data/category-conversion-blocks.ts:3194` | `同人誌1部￥7,500〜`（metaDescription） | ja 写「1部」单价口径违 #5 |
| B19 | `src/data/category-conversion-blocks.ts:3259` | `目安価格は同人誌1部￥7,500〜`（note） | 同上 |
| B20 | `src/data/category-conversion-blocks.ts:3305` | `同人誌は1部￥7,500〜（10部から）`（FAQ a） | 同上 |
| B21 | `src/data/category-conversion-blocks.ts:3310` | `目安価格は同人誌1部￥7,500〜`（FAQ a） | 同上 |

统一改法（ja 侧）：「1部￥7,500〜」→「¥7,500〜（指定規格・数量のご注文起価）」。

### B-2 注文混入（zh/en 页出现 ja 词）

| # | 位置 | locale | 说明 | 判定 |
|---|---|---|---|---|
| B22 | `src/data/products.ts:6705`（同 B1） | zh/en | price_range 含「注文」→ zh 页「10注文〜」（`minQuantity: 10` + price_range「/注文〜」组合渲染；live 已实证） | **违规**：zh/en 页不应出现 ja 词「注文」；随 B1 一并修 |
| B23 | 多语言字典 27 行 | zh-hk(key) | `CartClient.tsx:63` `orderSummary: '注文概要'` 等命中均为多 locale 字典对象的 **ja 值**（lang-guess 误判 zh），渲染于 ja 页 | ✅ 正常，不修 |

### B-3 per copy（doujin 相关）

| # | 位置 | locale | 说明 |
|---|---|---|---|
| B24 | `src/data/blog-data/en.json:265` / `:807` | en | 与 B10/B11 同行（per copy 口径），随修复 |
| B25 | `src/data/blog-data/en.json:742` | en | zine 文「per copy」用于 HK$6-32 books 价格带（books 域正常口径）✅ 不修 |

---

## 4. C 类：zh-Hant bullet 混入 en/ja

### C-1 核心：DJ-001 zh-Hant-only 字段族（products.ts:6748 起，无 ja/en 变体）

| # | 位置 | 字段 | 内容（zh-Hant） | 渲染面 |
|---|---|---|---|---|
| C1 | `src/data/products.ts:6748-6755` | `features`（6 条 bullet） | `Comiket 前特急対応可議…`/`10 本起印,少量対応`/`深圳自營工廠 + DHL Express 直送日本 2-4 個工作天`/`FSC 認證紙材…`/`繁體中文 / 日文雙語支援…`/`A5 (148×210mm) / B5 …標準尺寸` | **`src/components/product/ProductTabs.tsx:151-155` `product.features.map(...)` 无 locale 过滤直接渲染** → ja/en PDP 显示繁体 bullet。任务已知残留 #4「ja PDP 5 条中文 bullet」的源（源数据 6 条 vs live 口径 5 条，差异 1 条待修复批以 live 复核） |
| C2 | `src/data/products.ts:6756-6760` | `specs`（material/size/printMethod/finishing 4 字段） | 全繁体（`FSC 認證道林紙 90g…` 等） | ProductTabs specs 标签：japan-doujin 不在 `specsBySlug` map → fallback `specsBySlug['greeting-cards']`（`ProductTabs.tsx:160`）→ ja PDP specs 标签显示**贺卡规格**（语言正确但内容错位） |
| C3 | `src/data/products.ts:6762-6771` | `options.material/size` label | `標準/進階/標準尺寸/自訂尺寸`（繁体） | PDP 选项器 ja/en 显示繁体 label |
| C4 | `src/data/products.ts:6773-6779` | `variables.quantities` label | `10 件起/50 件/100 件/500 件`（繁体） | 报价/购物车数量档 ja/en 显示繁体 label |

**建议处置（修复批）**：为 DJ-001 补 `featuresJa/featuresEn`、`specsJa/specsEn`、`optionsJa/optionsEn` 变体（或在 ProductTabs/PDP 渲染层加 locale fallback 链 `product.featuresJa || product.features`），japan-doujin 在 `ProductTabs` 的 features/specs map 补独立条目（兼修 A18「即日納品」fallback）。**先确认渲染层实际取数逻辑再动数据层**（本清单只读，未验证 ProductTabs 之外是否还有 features 消费者）。

### C-2 疑似混入聚合（需人工复核，未逐条定性）

- Node 主扫 `suspect-cjk-bullet` 297 行 + `ja-context-normal?` 44 行：抽查显示绝大多数为 products.ts 多 locale 对象的 zh 字段值（相邻行字段名导致 locale 推断失真，属 zh 字段正常内容）。
- **误报已识别并剔除**：`src/data/products.ts` 51 行【】bullet 判为「polluted-en」实为 zh-Hant 字段（字段上下文窗口匹配到 en 字段名所致）。修复批以 C-1 明确清单为准，C-2 不直接消费。

---

## 5. D 类：车价 = 单价 × 数量

### D-1 生成链闭环（运行时渲染，非静态字符串）

| # | 环节 | 位置 | 证据 |
|---|---|---|---|
| D1 | 数据源 | `src/data/products.ts:6707/6709/6711`（basePrice 7500 / basePrice_ja 7500 / minQuantity 10） | DJ-001 doujinshi-printing |
| D2 | 取数 | `src/components/product/PdpPurchaseButtons.tsx:48-58` `getLocalePrice`：zh-hk 分支 `return p.basePrice`；ja 分支 `return p.basePrice_ja`；en 分支 `basePrice_en` | 组件头注释（L12）：「数量选择 (min = minQuantity, products.ts 真值) + 单价 × 数量实时小计」「币种口径 = zh-hk HKD / en USD / ja JPY」 |
| D3 | 渲染 | `src/components/product/PdpPurchaseButtons.tsx:127` `{formatMoney(unitPrice, currency)} × {qty} = {formatMoney(unitPrice*qty, currency)}` | zh 页默认 qty=minQty=10 → **HK$7,500.00 × 10 = HK$75,000.00**；ja 页 → **¥7,500 × 10 = ¥75,000**（任务已知残留 #6/#7 的生成源） |
| D4 | 静态串查证 | grep `[x×✕]\s*10\s*=` 与 `HK\$7,?500` 全 src = **0 命中** | 证明该残留只能以运行时渲染存在——11-24 精确串扫描查不到的结构性原因 |

### D-2 口径矛盾（同 SKU 两处并存）

| # | 位置 | 口径 |
|---|---|---|
| D5 | `src/data/sku-seo-data.ts:2608`（ja body） | `価格は指定仕様・数量の注文開始価格 ¥7,500〜（1部あたりの単価ではありません）` = **订单起价**（#5 模范句） |
| D6 | `PdpPurchaseButtons.tsx:127` + `products.ts:6707/6709` | 车价把 7500 当**每部单价** × 10 = 75,000 |

**矛盾结论**：若 ¥7,500 是订单起价（K3 10-30 #5 裁决口径），10 部订单应 7,500 起，车价渲染 75,000 即把起价错当单价。**处置（src 行为变更，非小改动，须走 §0.25.10.5 预览+确认流程）**：A 案——车价组件对 DJ-001 类订单起价 SKU 显示「¥7,500〜（ご注文金額目安）」不乘数量；B 案——数据层把 basePrice_ja/basePrice 改为真单价并另立订单起价字段。**两案均需 K3 拍板后执行**，本清单不代裁。

### D-3 其他 × 算式命中

| # | 位置 | 内容 | 判定 |
|---|---|---|---|
| D7 | `src/data/blog-data/zh-hk.json:268` | `8.5 x 50 = HK$250`（婚慶信封文价格示例） | 婚慶域（非 doujin），模式命中另案参考； doujin=false |
| D8 | 尺寸类 `×`（A5 148×210mm 等） | 大量 | 尺寸标注非车价，排除 ✅ |

---

## 6. 附注（E 类）：WhatsApp 预填与上下文

| # | 位置 | 内容 | 判定与建议 |
|---|---|---|---|
| E1 | `src/data/category-conversion-blocks.ts:3293` | ja 预填 `商品【ポストカードセット】／サイズ【A6】／数量【20セット】／仕様【両面印刷・OPPスリーブ封入】。1個あたりの単価と納期を教えてください` | 任务已知残留 #5「上下文错」：该模板挂 japan-doujin（同人グッズ）类目但预填对象是 postcard set 而非主对象同人誌，且问「1個あたりの単価」单价口径。建议：预填首选项改同人誌（或按 K3 对该模板的定位裁决）；「単価」改「ご注文金額目安」 |
| E2 | `src/data/category-conversion-blocks.ts:3297` | 预填含 `24時間特急製造` | 见 A19 |
| E3 | `src/app/[locale]/about/page.tsx:609`、`BlogContent.tsx:284` 等 20 条 | 三语种通用预填（`我想查詢印刷報價`/`印刷の見積もりを依頼したい`/`I want a printing quote`） | ✅ 正常，locale 分支正确，不修 |
| E4 | `src/app/[locale]/comiket-c109/page.tsx:5/61`（B5/B6） | ja 侧「単価」口径 | 已入 B 类 |

---

## 7. 已知残留 7 条校准对照（k3-review 2026-11-25 口径）

| # | 已知残留（live 实证） | 本清单锚点 | 覆盖 |
|---|---|---|---|
| 1 | ja「同人誌5部急行3日、10部急行2日出荷」 | A4 = `category-seo-content.ts:4199` | ✅ |
| 2 | zh「同人誌 5 本加急 3 天出貨」 | A2 = `category-seo-content.ts:4011` | ✅ |
| 3 | en「Rush 2-3 days」「Books 5 days standard」 | A5 = `category-seo-content.ts:4092`（完整串命中） | ✅ |
| 4 | ja PDP 5 条中文 bullet | C1 = `products.ts:6748-6755`（6 条）+ `ProductTabs.tsx:151` 无 locale 渲染 | ✅（条数差异 1 条待 live 复核） |
| 5 | ja WhatsApp 预填「ポストカードセット / A6 / 20セット」上下文错 | E1 = `category-conversion-blocks.ts:3293` | ✅ |
| 6 | zh 页「10注文〜」「¥7,500〜/注文〜」+ 车 HK$7500×10=HK$75000 | B1/B22 + D1-D3 = `products.ts:6705/6707/6711` + `PdpPurchaseButtons.tsx:48-58,127`（运行时渲染） | ✅ |
| 7 | ja 车 ¥7,500×10=¥75,000 与「1部あたりの単価ではありません」并存 | D3+D5 = 同上渲染链 + `sku-seo-data.ts:2608` | ✅ |

**校准结论**：7/7 全部定位到活文件锚点，无一漏网。新增发现 13 处（A6/A7/A8-A14/A16/A17/A18/B5-B9/B16-B21 等）为 11-24 精确串扫描的结构性盲区（字段复用、运行时渲染、派生文件内嵌、共享字段无 locale 变体）。

---

## 8. 数据来源与校准状态

```
数据来源:
- 本仓活文件扫描: src/ 全树 303 文件 / 110,632 行（Node v24.20.0 utf-8 主扫 + Python 3.13.15 utf-8 独立复算，双方法 11 类核心正则 10/11 类命中数一致，A2 差 2 条已披露归因）
- 关键命中人工复核: products.ts 6690-6900（DJ-001 全字段）、PdpPurchaseButtons.tsx 1-150（车价链）、ProductTabs.tsx 155-210（features fallback）、sku-seo-data.ts 2560-2635（doujinshi 三语种结构）、category-conversion-blocks.ts 3280-3320（ja 预填/FAQ）、DoujinSKU.tsx 全文、blog-data {en,ja,zh-hk}.json 命中行全文
- 已知残留口径: 11-25 k3-review 推翻结论 + 任务书 7 条 live 实证清单
- 裁决口径: K3 2026-10-30 裁决 #5（strategy-task-queue.json 有记录）; 11-24 daily 已批条件化句式
校准状态: 已校准（本仓活文件扫描，2026-11-26；双方法交叉验证通过；live 线上渲染未抓取——车价/注文显示为代码链推证，置信高，修复批 push 后须 curl 线上复核）
撤回声明: 不适用（本报告为首次全量语义类清单，无撤回对象；11-24「残留 0」自报已被 11-25 k3-review 推翻，本清单为其替代基线）
```

**本清单直接供修复批消费**：
1. 修复范围 = A-1 + A-1 边缘（20 条）+ B-1 违规 9 处 + B18-B21 + B22 + C-1 + D-2 处置拍板项；A-2 / C-2 / D7 / E3 不在修复范围。
2. 顺序建议：先 K3 拍板 D-2（车价 A/B 案）与 B3/B8/B9（各 locale 已确认价）→ 再改数据层（products.ts / category-seo-content.ts / blog-data JSON / category-conversion-blocks.ts）→ 最后改渲染层（PdpPurchaseButtons / ProductTabs / DoujinSKU）。
3. **sku-seo-data.ts 为派生文件**：涉及行（A6/A15/B16）改动必须回源头 `zprintpro-sku-seo-data.csv` 改后再跑 `scripts/csv-to-sku-seo.mjs` 重新生成（SOP-5，禁手搓、禁 --ours/--theirs 手选）。
4. SEO title 行（A14/A15）改后必过 `node scripts/guards/title-v5-guard.js`（当量带 50-57，58 阻断）。
5. 渲染层改动（PdpPurchaseButtons/ProductTabs/DoujinSKU）属 src 行为变更，非 §0.25.10 小改动，走预览+确认流程；push 走 §0.25 攒批 + 30min 硬下限 + 门童全量（brand/gsc-leak/i18n/entity）。
6. 修复完成后按 §0.23.1 线上探针纪律 curl 抽查 ja/zh/en 三 locale PDP + comiket-c109 + japan-doujin 类目页，确认车价显示、bullet 语言、注文单位三件套。

---

## 9. 待证项（本清单未闭环、修复批跟进）

| # | 事项 | 建议查法 |
|---|---|---|
| 1 | live 页 DJ-001 features 实际渲染条数（源 6 条 vs 任务口径 5 条） | curl ja/en PDP 数 bullet DOM 节点 |
| 2 | zh 页「10注文〜」的精确渲染组件（price_range 拆分链在 CategoryProductCard 或产品卡） | grep price_range 消费者 + curl zh-hk japan-doujin 类目页 |
| 3 | ProductTabs 之外是否还有 product.features 消费者（v9 PDP 结构） | grep `.features` src/components + src/app 全树 |
| 4 | en.json:742 zine 文与 en.json:265/807 是否同一 SKU 价格带口径 | 修复批改价时一并核对 |
| 5 | A-2 非 doujin 固定天数表述是否需要批量条件化 | K3 另行拍板，本清单不扩权 |

—— 清单完 ——
