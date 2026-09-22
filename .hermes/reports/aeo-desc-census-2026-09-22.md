# AEO desc 层普查 — 2026-09-22（Task B，只读审计，严禁改 src）

> **口径 (K3 9/21)**: 首段 40-60 字直接答案句 = 价格区间 + MOQ + 交期；三态 {合规 / 缺要素 / 无答案句}
> **范围**: src/data/sku-seo-data.ts 100 SKU × 3 locale (zh-hk/en/ja) = **300 槽全量**
> **性质**: 只出清单与候选改写建议，**不 apply**；落地批需 K3 批
> **数据来源**:
> - src/data/sku-seo-data.ts description 字段（工作区 9/22 版本，eval 直读对象，不经正则）
> - src/data/products.ts minQuantity/basePrice*/price_range/turnaround（真值锚）
> - .hermes/gsc-2026-09-18/extract.json new.*_28d 网页.展示（P0 = 任一 locale imps≥30，P1 ≥10，P2 <10）
> - 机读全量: .hermes/reports/aeo-desc-census-2026-09-22.json（300 槽逐条）
> **双方法复算 (§0.23.2)**: ① 机审正则（初跑 2 处口径错——污染字符集误收简繁同形字 / 价格区间正则误收交期区间「2-4 個工作天」/ 交期正则漏「N-N 個工作天」——已修后重跑）；② 人工抽样 12 槽逐条复读（合规 8 槽全读 + MOQ mismatch 全读 + 状态边界 4 槽），两法一致。计数三态合计 300 自洽。

## 1. 总盘

**三态: 合规 8 / 缺要素 122 / 无答案句 170（合计 300）**

| 层 | 合规 | 缺要素 | 无答案句 | 小计 |
|---|---|---|---|---|
| P0 (GSC imps≥30) | 8 | 84 | 76 | 168 |
| P1 (10-29) | 0 | 25 | 44 | 69 |
| P2 (<10/无) | 0 | 13 | 50 | 63 |

| locale | 合规 | 缺要素 | 无答案句 |
|---|---|---|---|
| zh-hk | 7 | 36 | 57 |
| en | 1 | 58 | 41 |
| ja | 0 | 28 | 72 |

**合规 8 槽（基线样例，可直接作改写模板）**: waterproof-stickers(zh-hk)、die-cut-stickers(zh-hk)、foil-stickers(zh-hk)、a5-flyers(en)、adhesive-banners(zh-hk)、business-envelopes(zh-hk)、exercise-books(zh-hk)、certificates(zh-hk)

## 2. 关键发现（按严重度）

### 2.1 🔴 MOQ 与 products.ts 真值冲突 — 14 槽（desc 层最高优先）

desc 所写起订数 ≠ products.ts minQuantity（schema eligibleQuantity 已按 products.ts 输出，**desc 与 schema 对 AI 代理是两套口径 = GSIM 自伤**）：

| slug | locale | desc 写 | products.ts | tier | imps |
|---|---|---|---|---|---|
| doujinshi-printing | ja | 50 | 10 | P0 | 359 |
| transparent-stickers | zh-hk | 100 | 10 | P0 | 184 |
| removable-stickers | zh-hk | 100 | 10 | P0 | 126 |
| vehicle-wraps | zh-hk | 28 | 1 | P0 | 112 |
| kraft-paper-packaging-box | ja | 100 | 300 | P0 | 77 |
| a1-posters | ja | 10 | 1 | P0 | 74 |
| fluorescent-stickers | zh-hk | 100 | 10 | P0 | 71 |
| foil-wedding-invitations | zh-hk | 20 | 50 | P0 | 42 |
| security-stickers | zh-hk | 100 | 10 | P0 | 37 |
| outdoor-posters | zh-hk | 10 | 1 | P0 | 31 |
| spiral-notebooks | zh-hk | 50 | 10 | P1 | 27 |
| thick-paper-flyers | zh-hk | 100 | 10 | P1 | 26 |
| mini-calendars | zh-hk | 50 | 1 | P1 | 19 |
| postcard-set | zh-hk | 8 | 4 | P1 | 12 |

> 注: 同簇连坐（transparent/removable/security/fluorescent-stickers 同为「100 張起」旧稿，products.ts 已 10）；kraft-paper-packaging-box ja「100」vs 真值 300 为反向错。**落地批必须连同 10 个 P0 槽优先修。**

### 2.2 🟠 交期要素覆盖率仅 19/300（6.3% 槽首句含交期）

首句答案句三要素中，**交期是系统性缺口**：zh-hk 常见「N-N 個工作天交貨」被埋在第 2-3 句，en/ja 大量首句纯卖点句。改写时把交期数字提进首句即可消化大部分「缺要素」。

### 2.3 🟠 价格非区间 — 74 槽

首句含价格但为单点「HK$X 起 / from $X」（无区间分隔符）。K3 口径为「价格区间」：有 price_range 真值的槽建议写满区间（如 HK$0.25-0.65/張）；仅 basePrice 的槽维持单点+「起」并在落地批前由 K3 拍板口径。

### 2.4 🟡 跨语言污染 — 4 类共 3 命中（大幅低于初跑误报，已双法复算）

| 类 | 命中 | 明细 |
|---|---|---|
| zh-hk 简体残留 | 2 | cosmetic-boxes / custom-red-packets（均「定制」，应为「定製」） |
| ja 含「份」 | 0 | ✅ 已清零（9/21 前批次已修） |
| ja 繁中污染 | 0 | ✅ 保守集（52 字，逐项验证非日文新字体）0 命中 |
| en 含 CJK | 0 | ✅ |

### 2.5 🟡 无来源数字待核 — 129 槽（review queue，非定论）

机审白名单（DPI/色数/尺寸/电话/年份/认证/服务数字）+ products.ts 真值锚双过滤后的残余数字。**是人工复核队列不是错误结论**：多数预计为规格/工艺数字可入白名单；落地批前需人工过一遍（全清单见 JSON `slots[].flags`）。

### 2.6 品牌 — 0 违规

品牌分层（zh-hk=智印港 / en/ja=ZprintPro）、品牌错字、双品牌混用、品牌次数：300 槽 0 命中。

## 3. 分层清单

### 3.1 P0 不合规 160 槽（按 GSC imps desc）

| imps | slug | locale | 状态 | 首句问题 | 首句 (截) |
|---|---|---|---|---|---|
| 980 | a2-posters | zh-hk | 缺要素 | 首句缺: 交期 | A2 海報印刷 10 張起印、HK$9 起/張，200g 銅版紙 / PP 防水合成紙，Giclée 級 1200 DP |
| 980 | a2-posters | en | 缺要素 | 首句缺: 交期; 首句長度 32 非40-60(en放寬至120) | A2 poster printing from $2.30, 10 MOQ. |
| 980 | a2-posters | ja | 缺要素 | 首句缺: 交期; 首句長度 20 非40-60 | A2 ポスター印刷 10 枚から、¥300〜。 |
| 396 | small-batch-stickers | zh-hk | 缺要素 | 首句缺: 交期; 首句長度 27 非40-60 | 小批量貼紙印刷 10 張起印 HK$0.45/張, 無開版費。 |
| 396 | small-batch-stickers | en | 无答案句 | 首两句不含价格/MOQ/交期组合 | Custom small batch stickers from 10 pcs at $0.045/pc. |
| 396 | small-batch-stickers | ja | 缺要素 | 首句缺: 交期; 首句長度 25 非40-60 | オリジナル小ロットステッカー 10 枚から、¥69〜。 |
| 359 | doujinshi-printing | zh-hk | 缺要素 | 首句缺: 价格区间 | 同人誌印刷 10 本起印，Comiket 會期前 24 小時特急對應，DHL 直送日本 2-4 個工作天。 |
| 359 | doujinshi-printing | en | 无答案句 | 首两句不含价格/MOQ/交期组合 | Comiket-ready doujinshi printing service. |
| 359 | doujinshi-printing | ja | 无答案句 | 首两句不含价格/MOQ/交期组合 | 同人誌印刷サービス、無線綴じ・中綴じ・PUR製本対応。 |
| 307 | catalog-printing | zh-hk | 缺要素 | 首句缺: 交期; 首句長度 21 非40-60 | 畫冊印刷訂製 10 本起印、HK$24 起/本。 |
| 307 | catalog-printing | en | 缺要素 | 首句缺: 交期; 首句長度 37 非40-60(en放寬至120) | Custom catalog printing from $4.60, 10 MOQ. |
| 307 | catalog-printing | ja | 缺要素 | 首句長度 37 非40-60 | カタログ印刷 10冊〜 ¥644〜、3-5営業日、DHL で日本へ 2-4 日配送。 |
| 304 | waterproof-stickers | en | 缺要素 | 首句缺: 价格区间+MOQ+交期 | Waterproof stickers custom printing, UV-resistant outdoor PV |
| 304 | waterproof-stickers | ja | 缺要素 | 首句長度 28 非40-60 | 防水ステッカー 10枚〜 ¥41〜、3-5営業日で全国配送。 |
| 299 | business-envelopes | en | 缺要素 | 首句缺: 交期 | Custom business envelopes DL/C5/C4 from $0.14/pc, 100 MOQ, w |
| 299 | business-envelopes | ja | 缺要素 | 首句缺: 交期; 首句長度 26 非40-60 | ビジネス封筒（会社封筒）印刷 100 枚から、¥20〜。 |
| 289 | exercise-books | en | 缺要素 | 首句缺: 交期 | Custom exercise books from $1.84/book, 10 MOQ, saddle-stitch |
| 289 | exercise-books | ja | 无答案句 | 首两句不含价格/MOQ/交期组合 | ワークブック印刷のオーダー、学校・塾・企業研修用ワークブック、本文 157g コート/表紙 250g 高品質用紙、A4/ |
| 279 | same-day-flyers | zh-hk | 缺要素 | 首句長度 37 非40-60 | 即日傳單印刷 10 張起、HK$1.30 起/張，每日 18:00 前落單即日交貨。 |
| 279 | same-day-flyers | en | 缺要素 | 首句長度 37 非40-60(en放寬至120) | Same-day flyer printing from $0.16, 10 MOQ. |
| 279 | same-day-flyers | ja | 缺要素 | 首句長度 18 非40-60 | 即日チラシ印刷 10 枚から、¥25〜。 |
| 256 | saddle-stitch-booklets | zh-hk | 缺要素 | 首句缺: 交期; 首句長度 22 非40-60 | 騎馬釘小冊子印刷 10 本起印、HK$6 起/本。 |
| 256 | saddle-stitch-booklets | en | 缺要素 | 首句缺: 交期 | Custom saddle stitch booklets from $1.84, 10 MOQ. |
| 256 | saddle-stitch-booklets | ja | 缺要素 | 首句長度 28 非40-60 | 中綴じ冊子 10冊〜 ¥258〜、5-10営業日で全国配送。 |
| 253 | electronics-packaging-box | zh-hk | 缺要素 | 首句缺: 交期; 首句長度 23 非40-60 | 電子產品包裝盒印刷 200 個起，HK$8 起/個。 |
| 253 | electronics-packaging-box | en | 无答案句 | 首两句不含价格/MOQ/交期组合 | Custom electronics packaging box from ZprintPro the US. |
| 253 | electronics-packaging-box | ja | 缺要素 | 首句缺: 价格区间+MOQ+交期; 首句長度 30 非40-60 | 電子製品包装箱のオーダー印刷、静電気防止加工オプション対応。 |
| 215 | custom-calendars | zh-hk | 无答案句 | 首两句不含价格/MOQ/交期组合 | 定製年曆/定製年曆 1 本起。 |
| 215 | custom-calendars | en | 无答案句 | 首两句不含价格/MOQ/交期组合 | Custom custom calendars from ZprintPro the US. |
| 215 | custom-calendars | ja | 无答案句 | 首两句不含价格/MOQ/交期组合 | カスタムカレンダーのカスタムカレンダーは ZprintPro にお任せ。 |
| 203 | large-envelopes | zh-hk | 无答案句 | 首两句不含价格/MOQ/交期组合 | 大號信封/大號信封 100 個起。 |
| 203 | large-envelopes | en | 缺要素 | 首句缺: 价格区间+MOQ+交期 | Custom large envelopes, C4 size fits A4 flat without folding |
| 203 | large-envelopes | ja | 无答案句 | 首两句不含价格/MOQ/交期组合 | 大型封筒の大型封筒は ZprintPro にお任せ。 |
| 199 | handle-bags | zh-hk | 无答案句 | 首两句不含价格/MOQ/交期组合 | 手挽袋/紙袋 100 個起。 |
| 199 | handle-bags | en | 缺要素 | 首句缺: 交期 | Custom handle paper bags for retail, 100 MOQ from $1.84. |
| 199 | handle-bags | ja | 无答案句 | 首两句不含价格/MOQ/交期组合 | ハンドルバッグのハンドルバッグは ZprintPro にお任せ。 |
| 187 | large-bags | zh-hk | 无答案句 | 首两句不含价格/MOQ/交期组合 | 大號紙袋/大號紙袋 100 個起。 |
| 187 | large-bags | en | 缺要素 | 首句缺: 交期 | Custom large paper bags for apparel and gifts, 100 MOQ from  |
| 187 | large-bags | ja | 无答案句 | 首两句不含价格/MOQ/交期组合 | 大判紙袋は ZprintPro の紙袋印刷。 |
| 184 | transparent-stickers | zh-hk | 无答案句 | 首两句不含价格/MOQ/交期组合 | 透明貼紙/透明貼紙 100 張起。 |
| 184 | transparent-stickers | en | 缺要素 | 首句缺: 价格区间+MOQ+交期 | Transparent Stickers custom printing, clear PET material. |
| 184 | transparent-stickers | ja | 缺要素 | 首句缺: 交期; 首句長度 18 非40-60 | 透明ステッカー 10 枚から、¥51〜。 |
| 170 | a5-flyers | zh-hk | 缺要素 | 首句缺: 交期; 首句長度 26 非40-60 | A5 傳單印刷訂製，10 張起印，HK$0.25 起/張。 |
| 170 | a5-flyers | ja | 无答案句 | 首两句不含价格/MOQ/交期组合 | A5 チラシは ZprintPro にお任せ。 |
| 145 | food-boxes | zh-hk | 缺要素 | 首句缺: 交期 | 食品包裝印刷訂製：FDA 認可食品級材質 + FSC 認證紙，100 個起印、HK$2.5 起/個，燙金 UV 全工藝支 |
| 145 | food-boxes | en | 缺要素 | 首句缺: 价格区间+MOQ+交期 | Custom food packaging printing with FDA-safe, FSC-certified  |
| 145 | food-boxes | ja | 无答案句 | 首两句不含价格/MOQ/交期组合 | 食品パッケージ印刷を100個から小ロット対応。 |
| 136 | foil-stickers | en | 无答案句 | 首两句不含价格/MOQ/交期组合 | Foil stickers with metallic shine: gold, silver, rose gold,  |
| 136 | foil-stickers | ja | 缺要素 | 首句缺: 交期; 首句長度 19 非40-60 | 箔押しステッカー 10 枚から、¥64〜。 |
| 130 | kraft-paper-bags | zh-hk | 缺要素 | 首句缺: 交期; 首句長度 26 非40-60 | 牛皮紙袋印刷訂製，100個起印，HK$1.8起/個。 |
| 130 | kraft-paper-bags | en | 无答案句 | 首两句不含价格/MOQ/交期组合 | Custom kraft paper bags for retail and gift shops. |
| 130 | kraft-paper-bags | ja | 无答案句 | 首两句不含价格/MOQ/交期组合 | クラフト紙袋のクラフト紙袋は ZprintPro にお任せ。 |
| 126 | removable-stickers | zh-hk | 无答案句 | 首两句不含价格/MOQ/交期组合 | 可移貼紙/不殘膠貼紙 100 張起。 |
| 126 | removable-stickers | en | 无答案句 | 首两句不含价格/MOQ/交期组合 | Removable stickers that peel off cleanly. |
| 126 | removable-stickers | ja | 缺要素 | 首句缺: 交期; 首句長度 20 非40-60 | はがせるステッカー 10 枚から、¥46〜。 |
| 121 | roll-up-banners | zh-hk | 无答案句 | 首两句不含价格/MOQ/交期组合 | 易拉寶/易拉架 1 個起。 |
| 121 | roll-up-banners | en | 无答案句 | 首两句不含价格/MOQ/交期组合 | Custom roll-up banners from ZprintPro the US. |
| 121 | roll-up-banners | ja | 无答案句 | 首两句不含价格/MOQ/交期组合 | ロールアップバナーのロールアップバナーは ZprintPro にお任せ。 |
| 113 | folded-leaflets | zh-hk | 缺要素 | 首句缺: 交期; 首句長度 33 非40-60 | 摺疊傳單印刷訂製（雙摺/三摺），10 張起印，HK$0.70 起/張。 |
| 113 | folded-leaflets | en | 缺要素 | 首句缺: 交期; 首句長度 36 非40-60(en放寬至120) | Custom folded leaflets from $0.80, 10 MOQ. |

> 余 100 槽见 JSON（同等结构）。

### 3.2 P1 不合规 69 槽 / P2 不合规 63 槽

全量见 .hermes/reports/aeo-desc-census-2026-09-22.json `slots[]`（filter tier）。P2 无 GSC 展示数据，着陆优先级最低。

### 3.3 R2 验证窗槽登记（~9/28 前不动手，只登记）

| slug | locale | 状态 | 问题 | imps |
|---|---|---|---|---|
| a5-flyers | zh-hk | 缺要素 | 首句缺: 交期; 首句長度 26 非40-60 | 170 |
| a5-flyers | en | 合规 | (合规) | 170 |
| a5-flyers | ja | 无答案句 | 首两句不含价格/MOQ/交期组合 | 170 |
| double-sided-flyers | zh-hk | 缺要素 | 首句缺: 交期; 首句長度 23 非40-60 | 65 |
| double-sided-flyers | en | 缺要素 | 首句缺: 交期 | 65 |
| double-sided-flyers | ja | 缺要素 | 首句長度 29 非40-60 | 65 |

> a5-flyers en 已合规（可作该槽 zh-hk/ja 改写参照）；其余 5 槽 R2 窗后随落地批处理。

## 4. 候选改写建议（模板 + Top P0 样例，不 apply）

**模板（40-60 字，K3 9/21 口径）**
- zh-hk: 「{品类} {MOQ}{单位}起，{HK$区间}/{单位}，標準交期 {N-N 個工作天}。…」
- en: "{Category} from {US$X-Y/unit}, MOQ {N}, standard turnaround {N-N business days}. …"（en 长度放宽至 120 字符内，词数 12-24）
- ja: 「{品名} {MOQ}枚から、{¥X〜}、標準納期 {N-N 営業日}。…」

**Top P0 槽候选**（锚 = products.ts price_range/minQuantity/turnaround；turnaround 仅 18/100 SKU 有值，缺者标 TBD 待 K3 拍板或从 ProductTabs 文案提取——**禁编造**）：

| slug | locale | 候选首句 |
|---|---|---|
| a2-posters | zh-hk | 「a2-posters 10件起，HK$95-1，標準交期 交期锚待補。…」 |
| a2-posters | en | "a2 posters from HK$95-1, MOQ 10, standard turnaround lead time TBD. …" |
| a2-posters | ja | 「a2-posters 10冊から、HK$95-1、標準納期 納期锚TBD。…」 |
| small-batch-stickers | zh-hk | 「small-batch-stickers 10A4起，HK$38-120/A4，標準交期 交期锚待補。…」 |
| small-batch-stickers | en | "small batch stickers from HK$38-120/A4, MOQ 10, standard turnaround lead time TBD. …" |
| small-batch-stickers | ja | 「small-batch-stickers 10冊から、HK$38-120/A4、標準納期 納期锚TBD。…」 |
| doujinshi-printing | zh-hk | 「doujinshi-printing 10件起，¥7，標準交期 5-7 営業日 (コミケ前 24時間特急対応)。…」 |
| doujinshi-printing | en | "doujinshi printing from ¥7, MOQ 10, standard turnaround 5-7 営業日 (コミケ前 24時間特急対応). …" |
| doujinshi-printing | ja | 「doujinshi-printing 10冊から、¥7、標準納期 5-7 営業日 (コミケ前 24時間特急対応)。…」 |
| catalog-printing | zh-hk | 「catalog-printing 10本起，HK$2.8-1000/本，標準交期 交期锚待補。…」 |
| catalog-printing | en | "catalog printing from HK$2.8-1000/本, MOQ 10, standard turnaround lead time TBD. …" |
| catalog-printing | ja | 「catalog-printing 10冊から、HK$2.8-1000/本、標準納期 納期锚TBD。…」 |
| waterproof-stickers | en | "waterproof stickers from HK$0.22-1.0/張, MOQ 10, standard turnaround lead time TBD. …" |
| waterproof-stickers | ja | 「waterproof-stickers 10冊から、HK$0.22-1.0/張、標準納期 納期锚TBD。…」 |
| business-envelopes | en | "business envelopes from HK$0.22-1.80/個, MOQ 100, standard turnaround lead time TBD. …" |

> 改写铁律：数字只能来自 products.ts / price-data.generated.ts / K3 拍板；price_range 缺失的槽用 basePrice* +「起」并挂「价格非区间」flag 上报；落地走 SOP-5（CSV → scripts/csv-to-sku-seo.mjs --apply），禁手搓 sku-seo-data.ts。

## 5. 落地批建议优先级

1. **P0+MOQ mismatch 交集**（10 槽）— desc/schema 口径自伤，先修
2. **P0 缺要素·仅差交期/长度**（ja 小语种簇为主，首句已含价+MOQ，补交期词或扩写至 40 字即可，改动小收益快）
3. **P0 无答案句 en 簇**（旧式卖点开头，需重写首句）
4. P1/P2 随批滚动

**遗留**: ① 14 槽 MOQ 漂移与 llms.txt「K3 2026-09-21 MOQ 統一批」表述的关系待 K3 复核（llms.txt 指 schema 层已統一，desc 层未动 = 本普查证据）；② turnaround 真值覆盖率 18/100，建议补齐后再跑一轮候选生成；③ 129 槽无来源数字人工过白名单。
