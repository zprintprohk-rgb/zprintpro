# 11-18 决策窗执行预备包（拍板后 1h 落地版 · 2026-11-17 预制）

> 性质：议题一/二/三的**精稿**（未应用，等 K3 拍板）· 全部声明已对 products.ts 真值核验（禁编造 §0.23）

## 1. 议程三精稿：食品包裝印刷 blog meta（页面 = /zh-hk/blog/food-packaging-printing-guide/，309 imp @ 7.35 页一零点击）

**Before**（现值 blog-posts.ts L~465）：
'食品級包裝印刷點樣揀？從牛皮紙盒到食品級淋膜，食品安全認證到設計實務，智印港為您拆解食品包裝印刷的每個關鍵環節。'
（差距：无品项枚举 / 无 MOQ / 无价格 / 无信任徽章——PackLab 模式对照）

**After**（100 字符，全真值）：
'外賣盒、餐盒、烘焙盒、月餅禮盒——食品包裝盒印刷 100 個起 HK$2.5 起/個，牛皮紙/白卡紙可選 + 燙金 UV 工藝，3-5 天交貨，30 秒 AI 報價即時出價。智印港拆解食品級材質、安全認證與設計實務。'

真值依据：products.ts food-boxes（100個起印 / HK$2.5起/個 / 牛皮紙白卡紙 / 燙金UV / 3-5天）；**FSC 未确认不写**（该 SKU 材质「以訂單確認」）。
落地坐标：`src/data/blog-posts.ts` lpFoodPackagingGuide.excerpt['zh-hk'] 单字段。

## 2. 议程二精稿：a2 PDP 直答块 + PAA FAQ（方案 A 材料）

**首屏直答块**（插 hero 后，渲染层自动 .qa-answer 琥珀样式，§13.4.1）：
`<div class="bg-amber-50 border-l-4 border-amber-500 p-4 my-4"><p class="font-semibold mb-1">⚡ 快速答案 (40 秒讀完)</p><p class="text-sm">A2 海報 = 420 × 594 mm（16.5 × 23.4 吋），10 張起印 HK$16 起/張（US$2.30），200g 銅版紙 / PP 合成紙防水可選，雙面四色 + 啞膜/光膜，1-2 天生產 + 24 小時急件選項，DHL 全球 2-4 天。A1 面積是 A2 兩倍，單價約 2 倍（US$4.60 起）。</p></div>`

**PAA FAQ ×2**（FAQPage schema 同步）：
- Q: What is the A2 poster size in inches? A: 420 × 594 mm = 16.5 × 23.4 inches — exactly half an A1, double an A3. Retail windows and trade-show easels use A2 most.
- Q: Is A1 twice the price of A2? A: Roughly — A1 starts at US$4.60/pc vs A2 US$2.30/pc at the same 10-piece minimum (anchor 真值，audit 2026-11-16)。

**双向补链**：a2-posters PDP ↔ /en/blog/poster-size-guide/ + /en/blog/poster-printing-price-guide/（坐标：sku-seo-data.ts a2-posters body 或 PDP 渲染链接区）。

落地坐标：`src/app/[locale]/product/[slug]/v9/ProductPageV9.tsx` hero 区 + `src/data/sku-seo-data.ts` a2-posters.faqs。真值依据：products.ts a2-posters（10張起 HK$16起/US$2.30/200g銅版/PP/1-2天）+ a1-posters（US$4.60）。

## 3. 议程一精稿：schema 管道改法（B 方案）

`src/app/[locale]/product/[slug]/page.tsx` offerData 分支 1（getUnitPriceAnchor 优先）改为「PRICE_TABLES tiers 中 qty = minQuantity 行的价格（HKD/USD/JPY 按 locale）」；锚表 priceDisplay 保留仅作 hero 文案（K3 若同步拍标题语境）。首批改 5 SKU 验证（a4/a5/custom-flyers/a2/posters），全站 15 SKU 二批。改后跑 audit ratio 全归一 + GMC diagnostics 观察 7 天。

## 4. S2 就绪检查（11-20..24）

- kit 冻结 ✓（C1-C7 逐字 + 双跑 + 条件登记模板）
- 待 S2 当日登记：AI 面 × 版本（AI Overviews 浏览器 UA / Perplexity 模型号）、账号态、hl/gl、出口 IP、执行者
- 探针执行通道：autoglm browser（AI Overviews/Perplexity 需浏览器面）——kit §四 模板已备
- 输出：`.hermes/geo/geo-ai-probe-2026-11/`（每跑一条）· 注意：AI Bots Protection=block 期间 Perplexity 对我站爬取受阻不影响「我方探测 AI」方向（§0.38.4）

## 5. 状态

- 议程一/二/三精稿就绪；K3 拍板后：议程三 1h 落地（单字段）/ 议程二 2-3h（渲染+schema+链）/ 议程一 2-4h（管道+首批 5 SKU）
- unpushed 4 docs commits 随 harness carry
