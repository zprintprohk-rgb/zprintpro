# v14 任务卡 🔴 紧急 — PDP 订购计算器批量价逻辑修复 + 海报价格表入仓

> 日期: 2026-07-25 · K3 策略 · autoclaw 执行 · 1 commit 1 push 1 build
> 收入关联: PDP 把 500 枚整批价 HK$129 当单价 × 数量 = 显示 HK$64,500,客户看到直接吓跑 — 这是线上正在流失询盘的 P0 错误,优先级高于一切。
> 前置: v13 已上线 (run 89589999169)。

## 任务 1 🔴 QuoteCalculator 批量价逻辑修复 (P0)

**Bug 定位 (K3 已查,不用重查)**:
- `src/components/quote/QuoteCalculator.tsx:190`: `totalPrice = unitPrice * config.quantity`
- `src/data/products.ts` PKG-016 gang-run-card-boxes: `basePrice = 129` (= 500 枚整批价,非单价)
- 结果: 500 × 129 = HK$64,500 显示在 PDP「產品小計/應收金額」— 全站凡 basePrice 是批量价的 SKU 全中招 (用户实测"V12 的几个价都是这样的")

**修法 (二选一,推荐 A)**:

**方案 A (推荐)**: 17 个 price-table-backed SKU (v13 映射表里的全部) PDP **不再走 unitPrice × quantity**,改为从 `src/lib/price-data.generated.ts` 按数量找档:
- 逻辑对齐报价台 `findClosestTier`: 找 qty ≥ 输入数量的最小档,没有则用最大档,显示该档**整批价** (batch price,不是单价)
- 产品小計 = 该档 sell_hkd (zh-hk) / sellUSD (en) / sellJPY (ja),与 v13 ReferencePriceBlock 完全一致 — 全站单一价格源
- 配置选择器 (材料/盒型/尺寸) 与 v13 区块共用同一份数据;若 v13 区块已在同页,**PDP 只允许一个价格交互区** — 把旧 QuoteCalculator 的数量输入并入 v13 ReferencePriceBlock,旧组件对这 17 个 SKU 不渲染
- 其余 70 个无表 SKU 维持旧计算器 (它们 basePrice 语义未被证实有错,不在本卡动)

**方案 B (兜底)**: 若 A 工程量超 2 小时,对 17 个 SKU 直接隐藏旧「訂購/產品小計/應收金額」区块,只留 v13 参考价格表 + WhatsApp CTA。宁可少一个计算器,不可多一个错价。

**验收**: PDP gang-run-card-boxes 选 500 → 显示 HK$129 (或对应档位价),选 10,000 → 显示对应档价;**任何数量下不得出现 单价×数量 的线性放大**。

## 任务 2: PDP 信任徽章真实性核查 (顺手,同 commit)

用户截图显示 gang-run-card-boxes PDP 有「即日交貨」「滿$500免運費」徽章 — 该 SKU 交期 8-15 天、运费走順豐到付/物流公式,**两个徽章都是假的**。
- 找出徽章数据源 (products.ts 字段或 PDP 硬编码),对 17 个 SKU 按真实 turnaround + shipping-rules 渲染;交期 >2 天的 SKU 不得显示「即日交貨」
- 「滿$500免運費」若非真实政策 (K3 记录: zh-hk 順豐到付为主),改为「順豐快遞 · 運費實報」或删除;**不确定就删,假徽章比没徽章更伤信任**
- 汇报徽章来源 + 每个 SKU 的处理,等 user 拍板免運政策后可再加回

## 任务 3: 海报价格表入仓 (posters.json) — B2 数码锚 (K3 7/25 修订,作废 e-print ×0.95 方案)

**数据源**: `F:\B2价格表非会员pdf.pdf` — 深圳快印 B2 惠普 Indigo-15K 非会员价 (K3 已读图核验),印刷色位 740×510mm。
**红线**: 海报小单走数码,**禁用 e-print 海报价** (柯式/门市价,结构不符);A1 数码打不下 (594×840 > 740×510),A1 走喷绘另议,本卡只做 A2/A3。

**非会员成本 (RMB/张, 开机费 20 元/单)**:
| 纸类 | 克重 | 单面 | 双面 |
|---|---|---|---|
| 铜版纸 | 157g以下/157g | 2.3 | 3.6 |
| 铜版纸 | 200g | 2.4 | 3.8 |
| 铜版纸 | 250g | 2.5 | 4.0 |
| 铜版纸 | 300g | 3.0 | 4.5 |
| 铜版纸 | 350g | 4.0 | 5.0 |
| 双胶纸/书写纸 | 120g及以下 | 2.3 | 3.6 |
| 双胶纸/书写纸 | 160g | 2.5 | 3.8 |
| 双胶纸/书写纸 | 200g | 2.7 | 4.0 |
| 双胶纸/书写纸 | 250g | 3.0 | 4.5 |
| 单粉卡 | 250g以下 | 2.5 | 4.0 |
| 单粉卡 | 300g | 3.0 | 4.0 |
| 单粉卡 | 350g | 4.0 | 8.0 |
| 哑粉纸 | 157g以下/157g | 2.3 | 3.6 |
| 哑粉纸 | 200g | 2.4 | 3.8 |
| 哑粉纸 | 250g | 2.5 | 4.0 |
| 哑粉纸 | 300g | 3.0 | 4.5 |
| 超感/特种纸 | 300g | 6.0 | 7.0 |
| 超感/特种纸 | 157g及以下 | 4.0 | 5.0 |

附加: 覆膜/自带纸 +2 元/P;白墨 开机费 50 + 打印 15/张;满版色 价格×2 (v1 不接满版色/白墨配置)。

**定价公式 (user 7/25 二次拍板,分段对标,作废三段式夹逼)**:

**A2 (B2 数码,纯公式价,不对标 e-print)**:
- e-print 海报页是**柯式价**,与 B2 数码小单无可比性 — 夹逼作废
- `HKD 卖价 = (单价×张数 + 20) × 3 (≤200) / ×2.5 (≤500) / ×2.2 (>500)`,四捨五入取整
- K3 验算锚点 (A2·157g·單面): 10張=**129** / 20張=**198** / 50張=**405** / 100張=**625** / 200張=**1,200** / 300張=**1,562** / 500張=**2,574**;雙面: 10張=**168** / 50張=**600** / 100張=**950**

**A3 (数码 2-up,对标 e-print 数码价)**:
- executor 抓取 e-print「數碼宣傳單張」产品页 A3 價目表 (單面/雙面 × 数量档) 作对标基准
- `A3 卖价 = e-print A3 数码价 × 0.95`
- 运费校验: e-print 价为门市自取价,我方需加順豐 ~HK$30 — 小数量档 (≤50張) 若 卖价+30 > e-print 价,下调至 ×0.90 保持到手价优势;在 JSON note 标注处理结果

拼版规则: A2 (420×594) 1 张 = 1 个 B2 印张;A3 (297×420) 2 张拼 1 印张 → A3 成本按 张数÷2 计印张数,公式价仅作内部毛利核算,展示价用对标价。
en/ja 价 = HKD × fx (海报为 HK 锚,不走 ×2.2 分层 — 与 eprint 锚表同规则)。

**生成**: `src/data/price-tables/posters.json` (schema 对齐 flyers.json, `src: "anchor-b2-digital"`),数量档 10/20/50/100/200/300/500,纸类先上 铜版纸 157g + 哑粉纸 157g + 铜版纸 250g 3 个主流配置 (其余配置注释标注可按公式扩展);注册进 `scripts/gen-price-data.mjs` (a2-posters 挂 PDP 参考价区块) + `src/lib/quote-engine/desk.ts` registerEprint。无重量 → 运费「另計/到付」。products.ts `a2-posters` price_range 填实价区间 (HK$129 起)。`a1-posters` 暂标注「喷绘另议报价」,price_range 不填假价。

## 纪律

- commit 前 `node scripts/check-encoding.js --fix` + 本地 `npm run build` 必过 (改 products.ts/page.tsx 大段必须本地 build,v7 教训)
- 1 commit: `fix(pdp): batch-price lookup for table-backed SKUs + truthful badges + posters price table`
- push `git push origin_ssh main` → `node scripts/verify-deploy.mjs` PASS
- 汇报: commit sha + run id + 3 项验算 (500 枚 gang-run 价 / A2 157g 10張价 / 徽章处理清单) + pollution grep = 0
