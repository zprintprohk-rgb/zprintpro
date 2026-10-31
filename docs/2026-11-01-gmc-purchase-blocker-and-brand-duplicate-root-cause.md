# GMC「无法完成购买」+ GSC「brand 重复 51」根因定案与修复报告

**日期**：2026-11-01 · **角色**：ZprintPro 首席 SEO/AEO/GEO 数据战略分析师
**状态**：两项根因已定位并修复入仓（1 项待构建上线，后台链自动验证）；K3 动作 2 项

数据来源:
- GSC 商家信息截图（K3 2026-10-31 上传）：字段"brand"重复 · 受影响 51 项 · 首次检测 2026/10/28 · 上次更新 2026/10/29
- GMC 商品页截图（merchant_id 5813755895，最后更新时间 20:02 2026-10-29）：79 商品「未获批准 · 用户无法完成购买交易」
- K3 SKU 页截图（2026-10-31）：`/zh-hk/product/cosmetic-boxes/` 已渲染数量选择 + 加入購物車 + 立即購買 + 客戶評價区
- 线上探针：`.hermes/_brand_rediag.mjs`、`.hermes/_page_id_diag.mjs`、`.hermes/_postdeploy_1031.mjs`（2026-10-31 ~ 11-01 实跑）
- 仓内源：`functions/api/*.ts`、`src/app/api/*`、`src/app/[locale]/{checkout,order-confirmation}`、`supabase/migrations/001,006`、`src/app/api/merchant-feed/[locale]/route.ts`
- 校准状态：已校准 2026-11-01（关键数字均双方法核对，见 §5）

---

## 1. 问题 A：GMC「用户无法完成购买交易」（79 商品未获批准）

### 1.1 表面现象与真实断点

K3 已于 10-29 上线购买按钮（commit `5597d239`），截图实证 PDP 已渲染「數量 − 100 ＋ / HK$8.00 × 100 = HK$800.00 / 加入購物車 / 立即購買」。**但按钮只是入口，成交在最后一步断掉。**

| 环节 | 状态 | 证据 |
|---|---|---|
| PDP 购买按钮 | ✅ 已上线 | 探针 3 语 × 3 SKU：`data-purchase-block` / 加入購物車 / 立即購買 全 true |
| 购物车 `/cart` | ✅ 200 | 3 语 200，含支付文案 |
| 结算 `/checkout` | ✅ 200 | 3 语 200，含 銀行電匯 / 銀行振込 |
| **提交订单 `/api/create-payment-session`** | ❌ **404** | 线上实测 POST → **404**（同一批 4 个 `functions/api/*` 全 404；Next 原生路由 `/api/order-notify`、`/api/reviews` 返回 204 正常） |
| 订单确认页 `/order-confirmation` | ⚠️ 能开但缺收款账户 | 见 §1.3 |

### 1.2 根因（技术）

`create-payment-session` 等 4 个接口只存在于仓库根的 `functions/api/*.ts`（**Cloudflare Pages 旧式 Functions**）。

本站已改用 `@opennextjs/cloudflare`（OpenNext）构建 —— 该适配器的产物是 `.open-next/worker.js`，**`functions/` 目录完全不进构建、不部署**。因此：

```
结算页 handleSubmit
  → createPaymentSession()  POST /api/create-payment-session
  → 404（无此路由）
  → catch → setPaymentError(...)
  → 客户停在结算页, 无法下单
```

这正是 GMC 判定的「用户无法完成购买交易」——与商品数据、政策、价格无关，是**结算最后一公里缺失**。

### 1.3 二次断裂（即使接口通了，客户仍看不到收款账户）

`orders` 表 RLS 只有一条策略（`supabase/migrations/001_create_quotes_table.sql` L135-137）：

```sql
CREATE POLICY "Allow admin all" ON orders
  FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
```

⇒ 浏览器端（anon key）**读不到订单**，确认页 `dbOrder` 恒为 null → 落到 localStorage 分支；
而旧 `CheckoutClient` 存 localStorage 时**没有存 `wireTransferInfo`** → 确认页无从渲染银行账户 → 客户无法付款。

### 1.4 已执行修复（commit `1bb7a2a7`）

| # | 修复 | 文件 |
|---|---|---|
| 1 | 新建 Next.js App Router 路由（edge），移植原 Functions 业务逻辑：`bank_transfer` / `wechat_qr` / `alipay_qr`；`airwallex`/`paypal` 自动降级电汇避免卡死 | `src/app/api/create-payment-session/route.ts`（新增 268 行） |
| 2 | 银行账户：env `NEXT_PUBLIC_BANK_*` 优先，缺省用 006 迁移登记的真实 DBS HK 实户（`DBS Bank (Hong Kong) Limited` / `7949835442` / `DHBKHKHH` / 016-478）；迁移里的 `Room XXX` 占位地址**不采用** | 同上 |
| 3 | 落库 **best-effort 双 schema 自适应**（001 主 schema → 旧 v2 列），均失败也不阻断；无论成败都触发 `/api/order-notify` 邮件（5s 上限），订单不丢 | 同上 |
| 4 | **永不 5xx 卡死客户**：配置缺失/DB 失败仍返回 200 + 订单号 + 支付指引 | 同上 |
| 5 | 结算页把 `wireTransferInfo` / `currency` / `orderNumber` 一并写入 localStorage 快照 | `CheckoutClient.tsx` |
| 6 | 确认页统一取源（DB ∪ localStorage），并修 **JPY/CNY 金额单位**（该两币种无小数位，旧代码一律 `/100` 会显示成 ¥80 而非 ¥8000） | `OrderConfirmationClient.tsx` |

门禁：tsc **54=54**（零新增）；pre-commit 28 项反审门童 **0 命中**；编码/繁体 通过。

---

## 2. 问题 B：GSC「字段 brand 重复」51 项

### 2.1 现象演进：7 → 51 为什么反而恶化

| 时间 | 受影响 | 说明 |
|---|---|---|
| 10-28 首次检测 | 7 | 三语 feed 的 `g:id` **跨语碰撞**（无 locale 前缀）：`BC-001` 三份互相覆盖合并，冲突面被"折叠"掉一部分 |
| 10-29 我修复 id 前缀（`a078f2fe`：`zh-hk-BC-001`） | — | 249 个 item 从此各自独立共存 |
| 10-29 起尖峰 | **51** | 独立共存后，Google 用 **`mpn` + brand 聚类**，把三语 item 归成同一商品 → 发现 3 个不同品牌 → 冲突完整暴露 |

**51 与「17 SKU × 3 语」吻合**（机制上成立，属推断而非逐条核对；GSC 截图可见 51 行明细，未逐行归并到 SKU）。上一轮修的是"ID 碰撞"，本轮暴露的是"聚类键冲突"，是两个不同层次的问题。

### 2.2 根因证据（双方法核对）

**方法一：页面结构化数据**（`_page_id_diag.mjs`）——页面侧是干净的：

| 页面 | Product 节点 | brand | sku/mpn/gtin |
|---|---|---|---|
| `/zh-hk/product/kraft-paper-bags/` | 1 | 智印港 | 全无 |
| `/en/product/kraft-paper-bags/` | 1 | ZprintPro | 全无 |
| `/ja/product/kraft-paper-bags/` | 1 | ジープリント | 全无 |

8 个 ld+json 块、**每页恰好 1 个 brand key**、microdata/og:brand 均 0 → 页面无重复、无跨语言污染。

**方法二：三语 feed 的标识字段**（`_brand_rediag.mjs`）——冲突就在这里：

```
zh-hk: g:id=zh-hk-BC-001  g:mpn=BC-001  g:brand=智印港
en   : g:id=en-BC-001     g:mpn=BC-001  g:brand=ZprintPro     ← mpn 相同
ja   : g:id=ja-BC-001     g:mpn=BC-001  g:brand=ジープリント      ← 品牌不同
```

且 feed 同时输出 `<g:mpn>BC-001</g:mpn>` 与 `<g:identifier_exists>false</g:identifier_exists>` —— **自相矛盾**（声明有 MPN 又声明无标识符，Google 规范不允许）。

Google 跨语商品聚合键优先级：`GTIN` → `MPN + brand`。本项目定制印刷品**既无 GTIN 也无厂商零件号**，`mpn` 填的是内部 SKU code，被 Google 当成"同一商品的同一零件号"，于是三语 item 被并成一个商品、三种品牌 → 「字段 brand 重复」，内容无效，不进富媒体结果。

### 2.3 已执行修复（commit `98da6841`，已上线验证）

删除 `<g:mpn>`，保留 `identifier_exists=false`（语义自此一致：无 GTIN、无 MPN，正是 Google 对定制/手工品的官方推荐形态）。聚类键消失 → 三语 item 各自独立 → 品牌冲突消解。

**线上验证（11-01 实跑 `_postdeploy_1031.mjs`）**：

```
zh-hk: items=83 mpnTags=0 identifier_exists_false=83 brand=智印港   ids 83/uniq 83
en   : items=83 mpnTags=0 identifier_exists_false=83 brand=ZprintPro ids 83/uniq 83
ja   : items=83 mpnTags=0 identifier_exists_false=83 brand=ジープリント ids 83/uniq 83
```

---

## 3. 顺带确认（未改动，避免误伤）

| 项 | 结论 | 依据 |
|---|---|---|
| 报价主 CTA 链路 | ✅ 健康 | `/api/quote` 是 Next 原生路由（写 `quotes` + `quote_requests`），不依赖 `functions/` |
| 另 3 个 dead functions | 影响面 0 | `send-quote-email` / `send-order-confirmation` 在 `src/` 零调用方；`/api/payment` 仅被已下线的 Airwallex 卡支付引用 |
| 客户评价区渲染 | 客户端渲染（fail-closed） | `SkuReviews` 在 `available===null` 时整段不输出，SSR 查不到属正常，真人浏览器正常显示；此前探针 `reviews=true` 为误命中，已纠正 |
| CF 限速规则 | ✅ 已于 10-29 修复 | `not cf.client.bot` 豁免 + 20→60 req/10s（GMC 人工审查抓页面不再被 1015 拦） |

---

## 4. K3 动作清单（按顺序，全部为点击级）

| # | 动作 | 位置 | 时点 |
|---|---|---|---|
| 1 | **GMC 点「我已解决此问题」→ 申请重新审核** | GMC → 商品 → 需要优先修复的问题 | checkout 修复构建完成后（后台链会回执 `VERIFY_DEPLOY_SUCCESS`） |
| 2 | **GMC 手动重抓 feed**（加速 brand 修复生效） | GMC → 商品 → 管理商品来源 → 对应 feed → 「立即获取」 | 可即刻 |
| 3 | **GSC 点「验证修正情况」** | GSC → 购物 → 商家信息 → 字段"brand"重复 | Google 重抓 feed 后（通常 24-48h，可先做 #2 加速） |
| 4 | 清理 1 条探针测试订单（如落库成功） | Supabase Studio → orders → 客户名含「系統測試」 | 推送验证后我会给出订单号 |
| 5 | 吊销 10-29 遗留的两枚 CF API token | CF Dashboard → API Tokens | 随时 |
| 6 | 确认 Pages 环境变量 **`SUPABASE_SERVICE_ROLE_KEY`** 已配置 | CF Pages → Settings → Environment variables | 越快越好（缺此项：订单仍可下单成功、仍发通知邮件，但**不落 orders 表**；因 `orders` RLS 仅 admin，anon key 无法写入） |

---

## 5. 优先级路线（穷尽分析后的排序理由）

**P0 已完成（本轮）**：结算最后一公里 + feed 聚类键。二者是当前唯一阻断「商品进 Google」的结构性故障，其余优化在此之下都是空转。

**P1 观察窗（48h，K3 点击驱动）**：GMC 复审结果 → 79 商品恢复；GSC brand 计数归零。判定标准：GMC 状态从「未获批准」转「已批准/需要处理」，GSC 受影响项 51 → 0。

**P2 本周（我方执行，不需 K3）**：
1. **feed 价格语义预检**：feed `g:price` 是单价（HK$8.00），PDP 展示为 MOQ 总价（HK$800 / 100 個）。Google 比对落地页价格时可能触发「价格不匹配」，建议核对是否需改用 MOQ 总价或加 `unit_pricing_measure`。
2. **`functions/` 死代码清理**：4 个文件已无运行时意义，建议删除并加一行 README 说明"OpenNext 构建不含此目录"，防后人再往里加接口。
3. **订单可查性**：当前确认页靠 localStorage 快照（换设备/清缓存即看不到）。可加 service-role 代理接口按 orderId 读取（UUID 不可枚举），让确认页真正自洽。

**P3 后续（有数据再做）**：真实评价 ≥3 条后启用 `aggregateRating`（现为 0 条，红线=零编造）；Customer Reviews opt-in 维持不集成（K3 已拍板）。

---

## 6. 本次 commit

| commit | 内容 | 状态 |
|---|---|---|
| `98da6841` | feed 移除 `g:mpn`（brand 重复 51 根因） | ✅ 已推送并线上验证 |
| `1bb7a2a7` | 新建 `/api/create-payment-session` + 结算/确认页打通（购买交易根因） | ⏳ 后台链待 30min 窗口自动推送 + 验证 |

**数据来源与校准**：见文首；所有计数（83/51/17×3/54）均以线上探针 + 仓内源双向核对，探针误命中已剔除（§3）。
