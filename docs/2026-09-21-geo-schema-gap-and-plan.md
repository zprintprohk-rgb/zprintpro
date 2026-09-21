# GEO Schema 层缺口清单 + 实施方案（2026-09-21）

> 任务来源：K3 2026-09-21《全站三语言SKU标题SEO+AEO+GEO飞轮提升指令》Schema 规则条 + 21:20「直接开工」
> 审计方式：全站 schema 生成点逐文件实查（非线上抓取），命中行号均可复核
> 指令口径：Product + Offer + FAQPage + BreadcrumbList 四件套；GSIM 额外 = ProcureAction 标记 + sourcingIntentKeywords 字段（MOQ/FOB/sample）

## 一、现状盘点（代码层实证）

### PDP（100 SKU × 3 locale，`src/app/[locale]/product/[slug]/page.tsx` + `src/lib/seo.ts`）

| Schema | 状态 | 证据 |
|---|---|---|
| Product | ✅ 全量 | `generateProductJsonLd`（seo.ts L1188），含 name/desc/image/url/brand/sku/color |
| Offer | ✅ 条件挂载 | page.tsx L217-233 三级回退：unit anchor → priceTable → price_range，皆无则宁缺不造（v9.2.2 裁决3.3 + 9/12 GSC 修复口径） |
| Offer 增强字段 | ✅ 较全 | priceValidUntil/validFrom/sku/availability/itemCondition/areaServed/seller/shippingDetails（三语分币种，9/14 GMC 币种一致性修复）/ hasMerchantReturnPolicy |
| BreadcrumbList | ✅ | page.tsx L252 `generateBreadcrumbJsonLd` |
| FAQPage | ✅ | page.tsx L254-260，`coreProductFAQMap` 按 category 映射 + educational 兜底（数据源 `product-faqs.ts`，**不受**今日 C5 清空 sku-seo-data faqs 影响——那是另一套） |
| HowTo | ✅ 14 类目 | page.tsx L265-277 |
| Speakable | ✅ | L278-281 |
| ImageObject / Organization | ✅ | L246-251 |
| aggregateRating / review | ⛔ 按令不挂 | K3 v2 §3.3 禁令（无真实评价禁编造），L192-194 |

### 其他页面类型

- Category 页：ItemList（嵌套 Product 无 offers，注释自承 Google 拒富媒体，schema-extensions.ts L487-526）+ CollectionPage + BreadcrumbList
- Services / about / contact / legal 等：Service / Organization / LocalBusiness(PrintShop) 等 14 处 Service schema
- Blog：Article + Person（authorByLocale）
- WebSite + SearchAction：✅（seo.ts L1618-1628，全站唯一 potentialAction）

## 二、缺口清单（对照指令 GEO 规则）

| # | 缺口 | 实证 | 影响 |
|---|---|---|---|
| G-1 | **ProcureAction 全站 0 处** | `grep ProcureAction src/` 0 命中；全站 potentialAction 仅 WebSite/SearchAction 1 处 | GSIM（AI 采购代理）无法识别「此页可发起采购/询价」动作 |
| G-2 | **sourcingIntentKeywords 字段 0 处** | `grep sourcingIntent src/` 0 命中 | MOQ/FOB/sample 采购意图信号完全不可机器读 |
| G-3 | **MOQ 不在 Product/Offer schema** | seo.ts Offer 块无 eligibleQuantity；MOQ 只存在于 title/desc 文本层 | AI 代理拿不到起订量——而我们最核心的差异化卖点（10 张起印）恰好在文本层空转。schema.org 合法承载位 = `Offer.eligibleQuantity`（QuantitativeValue），真值 `products.ts minQuantity` 现成，零编造 |
| G-4 | **FOB / 贸易条款 0 处** | 无 fobPoint / incoterms 类字段 | 跨境 B2B 询盘意图词（FOB Shenzhen 类）无承接 |
| G-5 | **打样/sample 政策不可机器读** | 「1 小时免费数码打稿」只在 desc/body 文案 | GSIM sample 意图词无承接 |
| G-6 | Offer 缺 `businessFunction` | Offer 块无此字段 | 二级缺口，随 G-1 一并补 |

**结论：四件套（Product/Offer/FAQPage/BreadcrumbList）已齐，缺口全部集中在 GSIM 采购意图层（G-1/G-2 为核心，G-3~G-6 为其支撑字段）。**

## 三、实施方案（两批，均不碰验证窗内标题字段）

### G1 批（P0，单点改动，全站 PDP 自动继承）— 改 `generateProductJsonLd`

只改 seo.ts 一个函数 + page.tsx 传参，100 SKU × 3 locale 一次继承：

1. **Offer.eligibleQuantity**（G-3）：`{ '@type': 'QuantitativeValue', minValue: product.minQuantity, unitText: unitLabel }`
   - 真值源 `products.ts minQuantity`（与门童 #24 同源）；unitLabel 现成（個/本/張…）
   - ⚠️ 真值缺口需先普查：products.ts 有 minQuantity 的 SKU 比例（无值则不挂该字段，宁缺不造，同 Offer 口径）
2. **Product.potentialAction = ProcureAction**（G-1）：
   ```json
   { "@type": "ProcureAction", "target": "<quote URL>", "seller": {...Organization}, "object": Product @id }
   ```
   - target 指向真实询价入口（30 秒 AI 报价端点 / WhatsApp 链接），用站内已存在的 URL，不新造页面
3. **Product.sourcingIntentKeywords**（G-2，自定义字段，指令明确要求）：由真值派生模板串，例如
   - zh-hk: `MOQ {minQuantity}{unitLabel}起, 免费数码打稿, 1小时打样, 跨境DHL`
   - en: `MOQ {n} pcs, free digital proof, DHL worldwide`
   - ja: `最小ロット{n}, 無料デジタル校正, DHL国際配送`
   - 每段都必须有站内真值/活文案支撑（打稿 1h 是 9/21 L1-1 批刚统一的三语口径 ✓；DHL 全球派送是活文案 ✓）
   - ⚠️ **「FOB」字样是否写入需 K3 拍板**——FOB 是贸易条款承诺（含运费/风险转移法律含义），站文案目前只说 DHL/顺丰派送，未宣称 FOB。建议：不写 FOB，改写事实层「ships worldwide via DHL / 跨境 DHL 派送」。**请 K3 一句话裁决：FOB 写 / 不写 / 改写 DHL 事实层（执行层推荐）**
4. **Offer.businessFunction**（G-6）：GoodRelations `Sell` URI，一行静态值

### G2 批（P1，验证 + 收口）

1. 三语各抽 2 页过 Google Rich Results Test + validator.schema.org，断言 ProcureAction/eligibleQuantity 解析无错（自定义字段 sourcingIntentKeywords 预期 validator 报「未知字段」级提示，不报错即可——属预期行为，写进验收单防误判）
2. GSC 商品摘要报告复核（Offers 覆盖率不应因本批下降）
3. 登记窗：schema 层不污染标题 CTR 验证窗（标题字节零改动），但登记 GSIM 观察基线（llms.txt / AI 代理抓取日志若有）

### 闸门与纪律

- 真值铁律：minQuantity/unitLabel 引 products.ts；任何「FOB/24h/免费」字样必须能指回活文案或 K3 拍板记录
- 先跑 minQuantity 覆盖率普查（products.ts 解析器 R2 生成器里现成），覆盖率不足 100% 的 SKU 只挂 ProcureAction 不挂 eligibleQuantity
- 收尾四件套沿用：编码 / tsc 0 增量 / 门童 pre-commit / 线上断言（schema 层断言 = 页面 HTML 含 `"@type":"ProcureAction"` 且 eligibleQuantity 值 = products.ts 真值）

## 四、工作量估算

| 批 | 改动面 | 估时 |
|---|---|---|
| 前置普查 | minQuantity/unitLabel 覆盖率（脚本现成） | 5 min |
| G1 | seo.ts 1 函数 + page.tsx 1 传参 + 3 语模板串 | ~30 min 含四件套 |
| G2 | 6 页验证 + 验收单 | ~20 min |

> 数据来源：`src/lib/seo.ts` L1188-1628 实查 · `src/app/[locale]/product/[slug]/page.tsx` L185-281 实查 · `src/lib/seo/schema-extensions.ts` 实查 · grep 全站 ProcureAction/sourcingIntent/eligibleQuantity 0 命中实证（2026-09-21 21:2x）

## 五、前置普查结果（2026-09-21 21:2x 实跑，脚本口径同 R2 生成器 parseProducts）

- **minQuantity 覆盖率 99/99 = 100%** ✅ — eligibleQuantity 可全量挂载，无「宁缺不造」分支
- **unitLabel 覆盖率仅 4/99** ⚠️ — 95 SKU 缺 unitLabel。落地方案：eligibleQuantity 用 UN/CEFACT 通用 `unitCode: "H87"`（piece/件，中性不编造），unitText 按 category_slug 映射表派生（books 族=本/冊、red-packets=個、calendars=本…与现标题数字钩口径一致，映射表进真值审查）；不逐 SKU 手填 unitLabel（防手搓漂移，SOP-5）
- G1 批无真值阻塞项，唯一待裁决 = FOB 措辞（§三-3）
