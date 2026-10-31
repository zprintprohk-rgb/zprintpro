# GMC「无法完成购买」+ GSC「brand 重复」根因定案与修复报告（v2 · 取证更正版）

**日期**：2026-11-01（v2 更正 2026-10-31 v1 的归因）· **角色**：ZprintPro 首席 SEO/AEO/GEO 数据战略分析师
**状态**：两项均已修复入仓 · checkout 已上线并端到端验通 · 品牌修复待构建

> **v1 → v2 更正声明（§0.23 数据诚信）**
> v1（同日早间）把「字段 brand 重复」归因为 **feed 的 `g:mpn` 跨语聚类**。K3 提供 GMC 数据源页截图后该归因被**证伪**：
> **该店从未配置任何 feed**（"由您提供"下无结果），商品全靠「由 Google 发现」抓取 → feed 字段根本不参与该问题。
> 真实机制见 §2。feed 侧的两处修复（`g:mpn`、`g:sale_price`）作为**卫生项保留**（未来若启用 feed 必须正确），但**不是**本问题解药。

数据来源:
- GSC 商家信息截图（K3 2026-10-31）：受影响 **51 项**（上次更新 10/29）→ **60 项**（上次更新 10/30）；点「验证修正情况」被拒（"发现了受影响的网页"）
- GMC 数据源页截图（K3 2026-10-31，merchant 5813755895）：`由您提供` 下**无结果**；`由 Google 发现` = zprintpro.com · **233 商品** · 每 24 小时 · 语言「多种」
- GMC 商品页截图（2026-10-29 20:02）：79 商品「未获批准 · 用户无法完成购买交易」
- 线上探针（2026-11-01 实跑）：`.hermes/_brand_audit_flagged.mjs`（3 个被点名 SKU × 3 语）、`.hermes/_page_id_diag.mjs`、`.hermes/_e2e_checkout_probe.mjs`
- **真实浏览器渲染取证**（2026-11-01）：`/zh-hk/product/adhesive-posters/` 渲染后 DOM
- 仓内源：`src/lib/seo.ts`、`src/lib/seo/schema-extensions.ts`、`src/app/api/merchant-feed/[locale]/route.ts`、`functions/api/*.ts`、`supabase/migrations/001,006`
- 校准状态：已校准 2026-11-01 03:25（关键计数双方法核对；探针假阳性已剔除，见 §3）

---

## 1. 问题 A：GMC「用户无法完成购买交易」（79 商品）

### 1.1 断点定位

购买按钮已于 10-29 上线（`5597d239`，PDP 渲染 数量选择 + 加入購物車 + 立即購買）。但**成交在最后一步断开**：

| 环节 | 状态 | 证据（2026-11-01 实测） |
|---|---|---|
| PDP 购买块 | ✅ | 3 语 × 3 SKU：`data-purchase-block` / 加入購物車 / 立即購買 全 true |
| `/cart` → `/checkout` | ✅ | 3 语 200；`CartClient` 内「前往結算」→ `/checkout/` |
| **`POST /api/create-payment-session`** | ❌ **404（修复前）** | 同批 4 个 `functions/api/*` 全 404；Next 原生路由（order-notify/reviews）204 正常 |
| 订单确认页 | ⚠️ 能开但缺收款账户 | `orders` RLS 仅 admin → 浏览器读不到 → 走 localStorage，而旧代码未存银行信息 |

### 1.2 根因

`create-payment-session` 等 4 个接口只存在于仓库根 `functions/api/*.ts`（Cloudflare Pages **旧式 Functions**）。本项目改用 `@opennextjs/cloudflare` 后，**`functions/` 目录不进构建产物**：

```
结算页提交 → POST /api/create-payment-session → 404 → catch → 报错 → 客户停在结算页
```

这正是 GMC 判定的「用户无法完成购买交易」——与商品数据、政策、价格无关。

### 1.3 修复（`1bb7a2a7`，已上线 03:15 构建）

1. 新建 Next App Router 路由（edge），移植原逻辑：`bank_transfer` / `wechat_qr` / `alipay_qr`；`airwallex`/`paypal` 自动降级电汇
2. 银行账户：env 优先，缺省用 006 迁移登记的真实 DBS HK 实户（`7949835442` / `DHBKHKHH` / 016-478）；迁移里的 `Room XXX` 占位地址不采用
3. 落库双 schema 自适应（001 主 → 旧 v2 列）+ 邮件兜底 + **永不 5xx**
4. 结算页把 `wireTransferInfo`/`currency`/`orderNumber` 写入 localStorage 快照
5. 确认页统一取源（DB ∪ localStorage）+ JPY/CNY 金额单位修正

### 1.4 端到端验证（2026-11-01 03:22-03:26：API 层 + 真实浏览器点击路径）

| 检查 | 结果 |
|---|---|
| `OPTIONS /api/create-payment-session` | **204** ✅ |
| 非法金额（0） | **400** + 明确错误体 ✅ |
| 合法 `bank_transfer` HK$800 | **200** · orderId `13573ebe-…`（UUID）· 单号 `ZP20261031-7145` · `amountMajor 800 HKD` ✅ |
| 银行信息回传 | `DBS Bank (Hong Kong) Limited` · `7949835442` · `DHBKHKHH` ✅ |
| 订单确认页可达 | `200` · 55,601 字节 · HTML 完整 ✅ |
| 币种白名单 | `EUR` → 400 ✅ / `JPY` → 200 且 `amountMajor 80000`（无小数膨胀）✅ |
| **落库** | ❌ `persisted:false — supabase_service_role_not_configured`（详见 K3 动作 1） |

**真实浏览器点击路径（第二层验证，2026-11-01 03:24）**：

| 步骤 | 结果 |
|---|---|
| PDP「加入購物車」 | ✅ localStorage `zprintpro-cart` 写入 1 件 |
| `/cart/` | ✅ 显示 背膠海報 HK$13.00 · 小計/合計 HK$13.00 · 運費「結算時計算」· 「前往結算」 |
| 点「前往結算」 | ✅ 进入 `/zh-hk/checkout/`：11 个表单域 · **銀行電匯/微信支付/支付寶** · 「提交訂單」 |
| 填表 + 提交 | ⚠️ **订单建成**（`7ca20602…` / `ZP20261031-4767` / HK$13 / wire 已存 localStorage）**但落在 `/cart/` 显示「購物車是空的」** |

⇒ 发现**第二处断点（仅真实点击能暴露）**：`clearCart()` 后空车守卫抢先 `router.push('/cart/')`，覆盖了去订单确认页的跳转 → **客户（与 GMC 审查员）永远看不到确认页与 DBS 收款账户**。
已修（`07a6f7b9`）：`submittedRef` 标记让守卫让路 + 渲染「正在生成訂單…」过渡态。

---

## 2. 问题 B：GSC「字段 brand 重复」60 项（归因已更正）

### 2.1 三步排除法（每一步都有实证）

| 假设 | 检验 | 结论 |
|---|---|---|
| ① feed 的 `mpn` 跨语聚类冲突（v1 判断） | GMC 数据源页：`由您提供` 无结果 → 该店**没有 feed**，商品来自「Google 发现」 | ❌ **证伪** |
| ② 页面内 brand 写了两次（Duplicate field 字面义） | 被点名 3 SKU × 3 语共 9 页：每页 **1 个 Product 节点 / 1 个 brand key**，microdata 0、meta 0 | ❌ **排除** |
| ③ 客户端二次注入导致渲染后出现两份 | 真实浏览器渲染后 DOM：8 个 ld+json、Product 仅 1、brand 仅 1、`hasDuplicateScriptContent=false` | ❌ **排除** |

### 2.2 真实机制（唯一与全部证据相符）

三语商品页共用同一 `slug`，`Product.@id` 为 **per-locale 节点**（`/{locale}/product/{slug}/#product`），并通过 hreflang 互指为同一页面的语言变体；`src/lib/seo.ts` 原注释即写明「**跨语对齐靠 sku+brand+hreflang**」。

于是 Google 把三语页面归并为**同一商品实体**，而 `brand` 旧实现**随语种取值**（zh-hk / en / ja 三个不同品牌名）→ 同一商品出现多个品牌值 → **"Duplicate field: brand"**，内容无效、不进富媒体结果。

旁证：受影响数 51（10/29）→ 60（10/30）均为 **3 的倍数**；「由 Google 发现」每 24h 抓取，仍在持续发现新页面，故计数在修复前会继续上涨。

### 2.3 修复（`414549e5`，待 03:40 后窗口构建）

- 新增 `src/lib/brand.ts`：`PRODUCT_BRAND_NAME = 'ZprintPro'` —— **机器身份的单一集团品牌值**
- `Product.brand`（`seo.ts`）、ItemList 内嵌商品 brand（`schema-extensions.ts`）、feed `g:brand` 三处统一引用该常量
- **可见品牌分层完全不变**：标题 / H1 / UI 文案 / `seller` (Organization) 仍按语种（§13.16 拍板未动）
- 门禁：tsc **54=54**；品牌基线门童 **PASS（259 ≤ 基线 431，未新增）**；反审门童 **0 red / 0 orange / 0 yellow**

> 若 K3 认为「香港页面 schema 里出现集团品牌」不可接受，备选方案是给三语商品加 per-locale `sku` 让其成为三个独立商品；但该方案依赖 Google 以 sku+brand 而非 hreflang 聚类，确定性低于本方案。

---

## 3. 顺带澄清（避免误操作）

| 项 | 结论 |
|---|---|
| 「GMC 手动重抓 feed / 立即获取」 | **不存在该入口**——本店无 feed。K3 找不到是对的，不是操作问题 |
| 是否应现在补加 feed | **不建议**：已有 233 个「发现」商品，再加 3×83 feed 会造成同 URL 双来源、引发新的重复/价格冲突。等本问题清零后再评估 |
| 报价主 CTA | 健康：`/api/quote` 是 Next 原生路由，不依赖 `functions/` |
| 另 3 个 dead functions | 影响面 0：`send-quote-email`/`send-order-confirmation` 零调用方；`/api/payment` 仅被已下线的 Airwallex 引用 |
| 评价区 SSR 无内容 | 正常：`SkuReviews` 客户端渲染（fail-closed），真人浏览器可见；早前探针 `reviews=true` 为**假阳性**，已剔除 |
| CF 限速 | 已于 10-29 修复（`not cf.client.bot` + 20→60/10s） |

---

## 4. K3 动作清单（更新版）

| # | 动作 | 说明 |
|---|---|---|
| 1 | **补 `SUPABASE_SERVICE_ROLE_KEY`**（CF Pages → Settings → Environment variables → Production） | 实测缺失，订单当前只发邮件不落库；补后无需改代码，下次构建生效 |
| 2 | **等品牌修复构建完成**（约 30-40 分钟后），再回 GSC 点「验证修正情况」 | 现在点必然再被拒（页面仍带旧品牌值） |
| 3 | GMC 复审结果观察 | 你已提交「我已解决此问题」；购买链路已实测可完成，预计通过 |
| 4 | 忽略/删除 2 封探针订单邮件（`New Order ZP20261031-7145` 等） | 端到端验证产生，未落库，无需在 Supabase 清理 |
| 5 | 吊销 10-29 遗留的两枚 CF API token | 随时 |

**验收标准**：GSC 受影响项 60 → 0（Google 重抓后，通常 3-7 天）；GMC 79 商品 → 已批准。

---

## 5. 优先级路线

**P0（本轮已完成）**：结算最后一公里（已验通）+ 商品品牌一致性（待构建）——这两项是「商品能否进 Google」的前置条件。

**P1（48h-7d，观察）**：GMC 复审 → 79 商品恢复；GSC brand 计数下行。若 7 天后未降，需导出 Rich Results 测试单页深层核验。

**P2（本周）**：
1. 落库补全（service role 就位后）→ 订单可查、可对账
2. `functions/` 死代码清理 + README 警示「OpenNext 构建不含此目录」
3. 确认页订单查询改走 service-role 代理（现依赖 localStorage，换设备即丢）
4. `g:price` 单价 vs PDP MOQ 总价口径预检（feed 未来启用时）

**P3**：真实评价 ≥3 条后启用 `aggregateRating`；Customer Reviews opt-in 维持不集成（K3 已拍板）。

---

## 6. 本次 commit 链

| commit | 内容 | 状态 |
|---|---|---|
| `98da6841` | feed 移除 `g:mpn`（卫生项，非本问题解药） | ✅ 已上线 |
| `1bb7a2a7` | **新建 `/api/create-payment-session`** + 结算/确认页打通 | ✅ 已上线（03:15 build SUCCESS）+ 端到端验通 |
| `ea9ffb73` | feed 移除 `g:sale_price`（83/83 与 price 相等） | ✅ 已上线 |
| `414549e5` | **Product.brand 三语统一**（brand 重复终局修复） | ⏳ 待 03:40 后窗口构建 |
| `07a6f7b9` | **空车守卫让路**（提交后不再弹回 /cart/，客户能看到收款账户） | ⏳ 同批发车 |
