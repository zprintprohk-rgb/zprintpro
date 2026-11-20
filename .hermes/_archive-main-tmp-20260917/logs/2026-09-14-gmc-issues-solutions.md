# GMC (Merchant Center) 问题诊断 + 解决方案 — 2026-09-14

> 账号: ZPrintPro · 创建 2026-06-22 · 网站 https://zprintpro.com · 91 件商品 (HK 区)
> 数据来源: 线上 PDP 原始 HTML 探针 (3 locale × waterproof-stickers, 9/14 06:5x, Googlebot UA) + `src/lib/seo.ts` L1140-1290 + `src/app/[locale]/product/[slug]/page.tsx` offerData 段 + `src/data/products.ts` L699-706 + `src/lib/price-data.generated.ts` L5715-5719 + `docs/2026-08-27-gmc-gsc-warnings-action-plan.md` (K3 8/27 02:23 拍板 6 警告) + `docs/k3-gmc-aggregate-rating-strategy-2026-08-19.md`
> 性质: GMC 商品从**网站结构化数据自动抓取**（仓库无 feed 文件）→ 所有商品级问题都在 schema/数据层可修

---

## 一、问题清单（实测证据，按严重度排）

### 🔴 P0-A：schema 价格 ≠ 页面可见价（GMC 价格不一致 → 商品下架级）

| 层 | 值 | 来源 |
|---|---|---|
| Product JSON-LD `offers.price` | **0.22 HKD** | `products.ts` `price_range: 'HK$0.22-1.0/張'` / `basePrice: 0.22`（陈旧源） |
| 页面可见价（同页 price ladder） | **HK$0.42/張 @1000**（梯 0.42→1.46） | `price-data.generated.ts` L5716（页面实际渲染源） |

- **GMC 抓着陆页做价格核对**：结构化数据价 0.22 与页面显示价 0.42 不符 = 「价格与着陆页不一致」违规类，91 商品全部暴露于此风险（`offerData` 统一取 `price_range` 首数字，而页面展示走 price-table 生成器——**两个价格源本来就不同步**）。
- 根因：9/12 GSC offers 修复（b3abbea1）落了「有价就挂 offers」，但价源选了陈旧的 `price_range`，没有对齐页面真实显示价。

### 🔴 P0-B：en/ja 页 schema 币种=HKD，页面显示 USD/JPY（跨币种不一致）

| locale | schema | 页面实际显示 |
|---|---|---|
| zh-hk | 0.22 **HKD** | HK$0.42/張 ✅ 同币不同值（P0-A） |
| en | 0.22 **HKD** | **$0.05/pc**（USD 锚, price-data L5717）+ 运费 USD 3 区 |
| ja | 0.22 **HKD** | **¥8.4/個**（JPY 锚, price-data L5718） |

- en 页 offer 内部自相矛盾：`price=HKD 0.22` + `shippingDetails=USD`（US/GB/AU 3 区）。GMC 对「价格币种 ≠ 运费币种 ≠ 页面显示币种」一律算 mismatch。
- 根因：`offerData` 推导只认 `price_range` 的 `HK$` 前缀，3 locale 共用一条 HKD 报价；页面实际按 locale 币种显示。

### 🔴 P0-C：GMC 退货政策 9/10 硬死线已过（今天 9/14），console 侧动作未确认

- 8/27 拍板警告 3：「退货期限 0 天不完整，91 件商品，9/10 前不修正 = 下架」，路径 = **K3 真人 5 min 在 GMC 设 30 天退货政策**。仓库无任何回执/记录表明已做（§0.24：笼统批准 ≠ 动作完成）。
- 代码侧 8/27 已落 `hasMerchantReturnPolicy` = `MerchantReturnNotPermitted / 0 天`（定制印刷如实声明，字段完整：category+method+fees+description+country）。
- **冲突点**：若 K3 在 console 设了「30 天」→ console(30天) vs 页面 schema(不可退) 不一致；若没设 → 91 商品按「政策不完整」处理。**两读法都要 K3 进 console 核实现状**。定制商品走「不可退 + 明确声明」是合规路径（Google 接受 NotPermitted，但要求声明完整——schema 侧已完整）。

### 🟡 P1-D：en/ja PDP `Product.brand` = 智印港（违反单品牌分层 §13.16）

- 探针实测 3 locale JSON-LD `brand.name` 全 = **智印港**（en/ja 应为 **ZprintPro**）。`generateProductJsonLd` 用全局 `siteConfig.name`，无 locale 分层。
- GMC 商品维度有 brand 字段核对；en/ja 页品牌错位同时违反 §13.16.1（ja 不得与 ZprintPro 字面混用规则同样适用于反向）。

### 🟡 P1-E：JSON-LD `image` 只有 1 张（页面画廊有 4 张）

- 探针：`image count: 1`（ogImage 单张）；页面画廊 4 张 webp。GMC 建议 3+ 张图（8/27 警告 4「每件商品图片数 1」根因之一在 schema 只传 1 张——**不用拍新照片就能先从 1→4**）。

### 🟡 P1-F：aggregateRating / review 缺（199→262 项警告，红线约束下长期项）

- 7/28 v2.1 §3.3 约束 4 红线：无真实评价禁编造。8/20 拍板卡（A dismiss / B Trustpilot / C 编造）**无 K3 回执记录落库**；8/27 计划把 Trustpilot 排到 9/15 后。
- 维持红线 → 该警告只能 console dismiss 或接真实评价源，执行层不做数据。

### 🟡 P1-G：Google Ads 未关联 GMC（8/27 警告 6，K3 1-click）

- 无回执记录。不关联 = Shopping ads 展示面为 0。

### 🟢 P2-H：GTIN/MPN 缺 — 定制商品豁免声明

- 定制印刷无 GTIN 属正常，但需在 GMC 商品数据里声明「定制商品/无唯一产品码」豁免，否则「缺少 GTIN」类警告持续。

### 🟢 P2-I：head 无 GMC/GSC 验证 meta 标签

- 探针 head 60KB 无 `google-site-verification`/merchant meta。若网站声明走 GSC 关联/DNS 则正常；若 HTML 标签法则声明可能未挂 → K3 console「网站状态」核对一次。

---

## 二、根因总结（一句话版）

1. **价格**：schema 与页面用了**两个不同步的价格源**（products.ts price_range vs price-data.generated.ts 梯价），9/12 offers 修复把陈旧源固化进了 JSON-LD。
2. **币种**：3 locale 共用一条 HKD price_range，无视 en/ja 页面的 USD/JPY 展示现实。
3. **品牌**：schema brand 取全局站名，未按 §13.16 分层。
4. **图片**：schema 只接 ogImage 单张，未接画廊。
5. **console 侧**（退货/Ads/-dismiss/豁免声明）全部是 K3 真人动作，无回执 = 未完成（§0.24）。

---

## 三、解决方案

### 执行层可修（代码侧，1 次攒批 push 可闭环 P0-A/B + P1-D/E）

| # | 修法 | 文件 | 效果 |
|---|---|---|---|
| 1 | `offerData` 价源改为 **与页面同源**：优先 `getPriceTableForSlug(slug)[locale]` 的 `priceDisplay`（页面真实显示价），无表再回退 `price_range`；币种随 locale 锚定（zh-hk=HKD / en=USD / ja=JPY，取 price-data 锚的币种口径） | `page.tsx` offerData 段（~10 行） | P0-A + P0-B 一次修复，schema 价 = 页面价 = 同币种 |
| 2 | `generateProductJsonLd` brand 按 locale 分层：zh-hk=智印港 / en·ja=ZprintPro | `src/lib/seo.ts` brand 段（~6 行） | P1-D |
| 3 | schema `image` 传画廊全量（4 张）而非单 ogImage | `page.tsx`（~4 行） | P1-E（1→4 张，不拍新照先达标） |
| 4 | 三项改完跑 tsc/build/encoding 三闸门 + 3 locale 探针复测（schema 价 = 页面价逐 locale 核对） | — | 防回归 |

**约束**：不新增 cron、不碰冻结名单、不改 price-data 生成器（只改消费侧）、§0.23 不编造——schema 价永远取页面真实显示价，零新数字。

### K3 真人三件（GMC Console，共 ~15 min）

| # | 动作 | 位置 | 为什么 |
|---|---|---|---|
| 1 | **核对退货政策现状**：若设了 30 天 → 改为「定制商品不适用退货 + 页面已声明 NotPermitted」口径对齐；若没设 → 按定制商品豁免声明补完整政策 | GMC → 配送和退货 | P0-C 死线已过，先止损 91 商品资格 |
| 2 | **关联 Google Ads 账号**（1-click） | GMC → 设置 → 关联账号 | P1-G |
| 3 | **批量 dismiss aggregateRating/review 警告**（备注：custom goods, no review system, intentionally omitted）+ 商品数据里声明**定制商品无 GTIN 豁免** | GMC → 商品 → 需要注意 | P1-F + P2-H |

### 顺序建议

1. **今天**：K3 console 三件（止损）；执行层 4 项代码修（我改，走攒批 push，push 后线上探针 + 等 GMC 下一轮抓取 7 天内消警）。
2. **9/17 GSC 干净窗口**：复测 GMC 抓取后警告数变化（预期 P0-A/B/D/E 四类消、剩 rating 类 dismissed）。
3. **长线**（9/15 月曆季后）：Trustpilot Business 注册（K3）→ 真实评价 API → aggregateRating 回填（B 路径，红线兼容）。

---

## 四、SOP-10 5 问门禁

1. **架构差异?** 查 8/19 战略 + 8/20 行动包 + 8/27 修复计划三份前序文档；本报告在其 M3 自决边界内扩了 1 个新发现（价源双轨不一致），未推翻任何拍板。
2. **约束适用范围?** K3 8/27 拍板原文允许 M3 改 returnPolicy/schema 侧；brand/image/price 均为 schema 消费侧修复，不触业务 0 改动红线（不删 SKU/文案），不改 price-data 生成器（只改读取）。
3. **原数据/拍板来源?** 全部数字来自线上探针 + git 实测代码（见数据来源行）；0.22 vs 0.42 等值均可在指定文件行号复现。
4. **字段值策略?** 不新增证书/联系字段；brand 修复按 §13.16 既有拍板执行，非新决策。
5. **Markdown 渲染?** docs/.hermes 层文档，无 user-facing 渲染面。

**数据来源**:
- 线上探针: zprintpro.com /{zh-hk,en,ja}/product/waterproof-stickers/ 原始 HTML JSON-LD（9/14 06:5x，Googlebot UA，HTTP 200）
- 代码: src/lib/seo.ts L1140-1290（offers/returnPolicy/brand/rating）；src/app/[locale]/product/[slug]/page.tsx offerData 段（9/12 修复注释 + price_range 价源）；src/data/products.ts L699-706（price_range: 'HK$0.22-1.0/張', basePrice: 0.22）；src/lib/price-data.generated.ts L5715-5719（zh 0.42/en 0.05/ja 8.4 锚）
- 拍板链: docs/k3-gmc-aggregate-rating-strategy-2026-08-19.md + docs/k3-gmc-action-plan-2026-08-20.md + docs/2026-08-27-gmc-gsc-warnings-action-plan.md（K3 8/27 02:23 拍板 6 警告）
- commit: b3abbea1（9/13 offers 修复）/ 98e793d7（GA4+008 台账拍板执行）

---
*报告: deepseek harness 执行层 · 2026-09-14 07:00 · 待 K3 一句话 go → 执行层 4 项代码修进攒批*
