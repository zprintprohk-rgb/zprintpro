# GMC「无法完成购买」+ GSC「brand 重复」根因定案与修复报告（v4 · 终局版）

**日期**：2026-11-01（v1/v2），2026-11-02（v3/v4 终局）· **角色**：ZprintPro 首席 SEO/AEO/GEO 数据战略分析师
**状态**：✅ 两项均已上线并通过 Google 解析器实测（RRT 双样本全绿）；GSC 计数待重爬归零

数据来源:
- GSC 商家信息截图（K3，11-2）：字段"brand"重复 · 受影响 **76 项**（51 @10/29 → 60 @10/30 → 76 @11/2）
- GMC 截图（merchant 5813755895）：数据源页证实**无 feed**（「由 Google 发现」233 商品/24h）；79 商品「用户无法完成购买交易」
- **Rich Results Test 实测 ×5**（2026-11-2 18:43 / 19:00 / 19:10 / 20:24 / 20:25，Google 官方解析器）
- HTML 取证探针：`.hermes/_ldjson_deep_audit.mjs`、`.hermes/_ldjson_where.mjs`、`.hermes/_brand_audit_flagged.mjs`
- 端到端下单探针：`.hermes/_e2e_checkout_probe.mjs`（API 层 + 真实浏览器点击路径）
- 仓内源：`src/components/JsonLd.tsx`、`src/lib/seo.ts`、`functions/api/*.ts`、`supabase/migrations/001,006`
- 校准状态：已校准 2026-11-02 20:30（关键计数均双方法核对）

> **v1→v4 更正链（§0.23 数据诚信，史实全保留）**
> - **v1**（10-31）feed mpn 跨语聚类 → **证伪**：GMC 根本没有 feed（K3 截图证实，商品全靠「Google 发现」）
> - **v2**（11-1）跨语 hreflang 归并品牌冲突 → **证伪**：brand 统一后 RRT 仍报重复（11-2 19:10 复测）
> - **v3a**（11-2）JsonLd 去 'use client'（schema 移出 props 序列化）→ 未解决，但确证 flight 副本仍被解析
> - **v4**（11-2）**真因定案：Google 解析器连 RSC flight 载荷一起吃**。React 渲染的每个 JSON-LD 在 HTML 里存在两份
>   （① `ld+json` 脚本本体 ② flight 序列化副本）；两份同 `@id` 被 Google 合并成一个节点，
>   重复字段（brand/seller/offers）即报「Duplicate field: brand」→ 商家信息判无效，**与字段值无关**。
>   **修复**：`c4605923` 移除 Product `@id` → 两份不再合并 → **RRT 双样本全绿**（zh-hk handle-bags 20:24 + en mailer-boxes 20:25，「商家信息 2 项有效」）。

---

## 1. 问题 A：GMC「用户无法完成购买交易」（79 商品）

### 1.1 断点链（共三处，全部修复并实测）

| # | 断点 | 修复 | 验证 |
|---|---|---|---|
| 1 | `POST /api/create-payment-session` **404**——接口只存在于 `functions/`（旧式 Pages Functions），本项目用 `@cloudflare/next-on-pages`（advanced `_worker.js`）构建，`functions/` 不进产物 | `1bb7a2a7` 新建 Next App Router 路由（edge） | API 探针 200 ✅ |
| 2 | 提交成功后 `clearCart()` 触发**空车守卫**把客户弹回 `/cart/`，确认页与 DBS 收款账户永远看不到（只有真实点击才能暴露） | `07a6f7b9` `submittedRef` 让守卫让路 | 浏览器点击路径复测 ✅ |
| 3 | 确认页从 Supabase 读不到订单（`orders` RLS 仅 admin）且 localStorage 快照缺银行信息 | `1bb7a2a7` 结算页存 `wireTransferInfo` + 确认页双源取数 + JPY/CNY 金额单位修正 | 确认页渲染 DBS 账户 ✅ |

**购买闭环现状**：PDP 购买块（3 语 × 83 SKU）→ 购物车 → 结算（銀行電匯/微信/支付寶）→ 提交 → 确认页 + DBS 收款信息。API 探针 200 + 真实浏览器全程点击通过。

**遗留一项**：订单落 `orders` 表需要 `SUPABASE_SERVICE_ROLE_KEY`。K3 已重贴真值（2026-11-2），但 CF 环境绑定按部署快照——**随下一次部署自动生效**，探针 `persisted:true` 即闭环。后手方案（免依赖）：migration 加 `Allow anonymous insert` RLS 策略（与 quotes 表同款安全模型）+ 路由回退 anon key。

---

## 2. 问题 B：GSC「字段 brand 重复」76 项（v4 终局）

### 2.1 三轮误诊与最终实证

| 轮 | 假设 | 检验 | 结果 |
|---|---|---|---|
| v1 | feed `g:mpn` 跨语聚类 | GMC 无 feed（数据源页「由您提供」空） | ❌ |
| v2 | 跨语 hreflang 归并 + 品牌值冲突 | brand 统一（`414549e5`，12/12 页 ZprintPro）后 RRT 仍报 | ❌ |
| v3a | JsonLd 'use client' → props 进 flight | 移除后 RRT 仍报（19:10） | ❌（但缩小了 flight 形态） |
| **v4** | **Google 解析 flight 载荷；两份同 `@id` 合并 → 字段重复** | **移除 `@id`（`c4605923`）→ RRT 双样本全绿** | ✅ |

**v4 证据**：
1. RRT 解析树中 Product 的 brand/potentialAction/seller/offers **各出现两遍**（官方解析器原文）
2. HTML 取证：`ProcureAction` ×2、`#product` ×6——第二份完整 schema 在 `self.__next_f` flight 载荷
3. **对照实验**：contact 页 raw HTML 仅 1 个 Organization，Google 解析出 **2 个组织**——多出的只能来自 flight
4. 页面 DOM（真实浏览器、水合后）始终只有 1 个 Product——排除运行时注入

### 2.2 修复清单（全部已上线）

| commit | 内容 |
|---|---|
| `98da6841` | feed 移除 `g:mpn`（卫生项：无 feed 状态下不参与，启用 feed 时必需正确） |
| `ea9ffb73` | feed 移除 `g:sale_price`（83/83 与 price 相等，违反 Google 规范） |
| `414549e5` | Product.brand 三语统一 `ZprintPro`（机器身份一致性；可见品牌分层不动） |
| `9b46dc5c` | JsonLd 变服务端组件（schema 移出 props 序列化 + 页面载荷缩小） |
| **`c4605923`** | **移除 Product `@id`（终局：两份不再合并，重复字段失去触发前提）** |

### 2.3 「不会出现新问题」核对（K3 特别要求）

| 检查 | 结果 |
|---|---|
| `#product` 引用方 | 0（speakable 的 `#product-title` 是 CSS 选择器，无关）✅ |
| 去掉 @id 的副作用 | 无——@id 仅用于节点引用与合并；本站无任何 schema 引用该 @id；Google 对两份相同商品按 URL 去重展示 ✅ |
| 两份副本内容 | 完全一致（同 builder），Google 各自独立验证均有效，不存在值冲突 ✅ |
| brand 统一是否影响可见品牌 | 否——标题/H1/UI 仍按语种（zh-hk=智印港），仅机器字段 ✅ |
| 品牌基线门童 | PASS（259 ≤ 基线 431）✅ |
| tsc | 54=54 每次提交均验 ✅ |
| RRT 副作用 | 产品摘要 2 项有效 + 非严重问题（与修复前同类），无新增严重项 ✅ |

---

## 3. K3 动作清单

| # | 动作 | 时点 |
|---|---|---|
| 1 | **GSC → 商家信息 → 字段"brand"重复 → 点「验证修正情况」** | **现在即可**（解析器已双样本全绿；验证会触发受影响 URL 重爬，计数 76 → 0 预计数天内） |
| 2 | service_role 已重贴 → 随下一次部署生效，我探针闭环 | 自动 |
| 3 | 忽略/删除探针订单邮件（均带「系統測試」标记） | 随时 |
| 4 | 吊销 10-29 遗留两枚 CF API token | 随时 |

---

## 4. 后续优先级（接 2026-10-30/10-31 战略文件）

| 优先级 | 事项 | 责任 |
|---|---|---|
| P0-2 | **AI 探针基线（死线 11-03）**：7 词簇固定问题集 × ≥2 复测 → `.hermes/geo/geo_citation_baseline-2026-11-03.md/.json` | 执行层（本轮后立即执行） |
| P0-1 | 五项商业真值拍板（ZH-POSTER / ZH-PACKAGING / EN-STICKER / EN-CATALOG / JA-C109） | **K3**（全局最大阻塞） |
| P0-3 | ZP-monthly-matrix / ZP-k3-review 重注册（0x800710E0） | K3 管理员 |
| P1-4 | 11-06/07 七天同口径复测窗 | 执行层（lane 自然触发） |
| P1-5 | en small-batch CTR/snippet 验证（pos 5.5 + 0 点击 = 纯 CTR 缺口） | 执行层 |

---

## 5. commit 总账（2026-11-01 ~ 11-02）

| commit | 内容 | 状态 |
|---|---|---|
| `98da6841` | feed 移除 g:mpn | ✅ 上线 |
| `1bb7a2a7` | 结算路由 + 结算/确认页打通 | ✅ 上线 |
| `ea9ffb73` | feed 移除 g:sale_price | ✅ 上线 |
| `414549e5` | Product.brand 三语统一 | ✅ 上线 |
| `07a6f7b9` | 空车守卫让路 | ✅ 上线 |
| `9b46dc5c` | JsonLd 服务端组件化 | ✅ 上线 |
| **`c4605923`** | **移除 Product @id（brand 重复终局）** | ✅ 上线（19:33 build SUCCESS） |
