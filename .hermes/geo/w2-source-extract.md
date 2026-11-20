# W2 数据源提取（只读）— 2026-09-30

数据来源: src/data/products.ts / src/data/products-content.ts / src/app/[locale]/product/[slug]/page.tsx（均 F:\zprintpro-nextjs，git HEAD 工作区）
校准状态: 已校准（本文件行号即当日工作区实况）；部分项因截止窗口未完成，标「待证」。

## 1. SKU A: small-batch-stickers（products.ts L1018 起）

价格三件套（逐字摘录，行号以 grep/read 实测）:
- L~1041 `price_range: 'HK$38-120/A4'`
- L~1042 `basePrice: 38`
- L~1043 `basePrice_en: 0.55`
- L~1044 `basePrice_ja: 69`
- L~1047 `minQuantity: 10`（无独立 MOQ 字段；specs 无 qty 字段）
- 其他: weight_score 90 / isHot true / optimizedAt '2026-07-28' / optimizationRound 1（L1019-1020）
- specs（material/size/printMethod/finishing 四字段）: material='銅版紙／PP 合成紙／透明 PVC／Kraft 牛皮紙', size='A4 起印；最小 10×10mm，最大 300×400mm', printMethod='四色數碼印刷（HP Indigo）', finishing='模切、圓角、局部燙金、覆膜'
- variables.sizes: small×1 / medium×1.5 / large×2.2（截断处起，完整 multiplier 清单待证）
- faq 字段: products.ts 对象内未见 faq（FAQ 走集中式 product-faqs.ts，见 §2）

## 2. SKU B: doujinshi-printing（products.ts L7398 起）

价格三件套（逐字摘录）:
- L~7411 `price_range: '¥7,500〜/部〜'`
- L~7412 `basePrice: 7500`
- L~7413 `basePrice_en: 1245.0`（⚠️ 命名疑义：en 字段存日元数值 1245?，待证——疑为 JPY per 部 vs en 币种错配，重构时必核）
- 无 basePrice_ja 字段（grep 块内未见）
- L~7417 `minQuantity: 10`；L~7418 `turnaround: '5-7 営業日 (コミケ前 24時間特急対応)'`
- optimizedAt '2026-08-07' / round 1 / isHot true / isNew true
- ⚠️ **doujinshi-printing 无 longDescription**：products-content.ts grep 无该 slug 条目（仅 small-batch-stickers 命中 L1905）→ 该 SKU PDP 长描述当前为空，W2 需新建而非改写。

## 3. PDP 渲染机制（src/app/[locale]/product/[slug]/page.tsx）

- longDescription 来源: L17-18 注释「b81463a 后三字段搬移至 products-content.ts」；L161 `const product = { ...baseProduct, ...productsContent[baseProduct.slug] }`
- 取值: L299 `longDesc = zh-hk? longDescription : en? longDescriptionEn : longDescriptionJa`
- 渲染方式: **L684 `dangerouslySetInnerHTML={{ __html: longDesc }}`**（HTML 字符串直渲，prose 样式容器含 _table/_thead/_h3 样式钩子 → longDescription 支持内嵌表格/标题）
- Product JSON-LD: sku/offers 由 src/lib/seo.ts 生成（页面 L425-427 只挂 JsonLd 组件；seo.ts 具体行号待证）；L47 引入 aggregateRating/review 修复注释（2026-09-29）
- FAQPage: L45-46 引 `generateFAQSchema` + `coreProductFAQMap, skuMoneyFAQs`（src/data/product-faqs.ts）；L267-275 优先级 = skuMoneyFAQs（SKU 级带钱问答）+ coreFaqs（按 category 映射，兜底 generalProductFAQs）→ FAQ 数据源字段 = product-faqs.ts，非 products.ts 内嵌 faq

## 4. blog food-packaging-printing-guide（待证为主，截止未完成）

- blog-posts.ts L455: meta 存在（title/excerpt/targetKeywords 具体值待证）
- blog-data/zh-hk.json content 结构（h2 序号清单/表格数/qa-answer 位置/内链 href 列表/CJK 字数双方法计数）: **待证**（grep 已见 en.json 存在 US 市场贴纸/包装主题内容，zh-hk.json 该 slug content 未及读取）
- 建议查法: Node .cjs 读 JSON → 正则拆 h2/`<table>`/`qa-answer`/href + CJK 计数（/[\u4e00-\u9fff\u3400-\u4dbf]/g），再用 Python utf-8 复算（§0.23.2）

## 5. 三语博客对应关系（待证）

- blog-data 中含 sticker 主题内容（en.json 命中贴纸/包装指南），small-batch-stickers / doujinshi-printing 在 ja.json 与 zh-hk.json 是否有 slug 对应博客: **待证**（grep 结果被截断，未及逐文件确认；建议 `grep '"slug"' ja.json` 后比对）

## 双方法复算声明

行号定位采用 grep（ripgrep）+ read 两种工具交叉（两 SKU 起始行/价格字段一致）；blog CJK 计数与内链清单未落地，无单方法结论产出（符合 §0.23.2：宁缺毋错）。
