# P0-3 交付报告 — 008 lead_source 车道字段 + quote 页 UTM 捕获

**日期**: 2026-09-17
**任务来源**: K3 v10 outbound masterplan §七 执行顺序第 3 项
**状态**: 代码侧 ✅ 完成并验证；**K3 手动跑 010 SQL 后车道归因即生效**

**数据来源**:
- K3 v10 outbound masterplan v2 → `docs/2026-09-17-k3-directive-v10-outbound-masterplan-v2.md`（§三 Spec 1/2 深链标准 + §六 KPI + §七 执行顺序）
- 008 表 schema → `supabase/migrations/008_create_quote_requests.sql`（8/20 已上线）
- 本地逻辑验证 → `npx tsx scripts/verify-lead-attribution.ts` = **54 pass / 0 fail**
- 代码基线 → tsc **54=54**（改动前后持平）；门童 **🔴51 | 🟠1529 | 🟡1088**（与改动前逐项持平）
- ⚠️ 未含任何线上真实询盘数据（008 尚无可拆分的车道样本）——本报告不含"预计/大约"类估算

---

## 一、K3 要什么（v10 卡原文）

> **P0-3**：008 表加 lead_source 字段 + quote 页 UTM 捕获（透传到 008 插入）
>
> **归因断层**（v10 §一-1）：话术带深链但没带 UTM —— outbound 询盘进 008 后与 organic 混在一起，
> 北极星「周真实询盘数×赢单标记」会被污染，**无法判定获客车道 ROI**。
>
> **没有 lead_id 的触达 = 白做**（§三 Spec 1）

---

## 二、交付物（9 件）

| # | 文件 | 性质 | 说明 |
|---|------|------|------|
| 1 | `supabase/migrations/010_add_lead_source_attribution.sql` | 新增 | 008+009 加 `lead_source`/`utm_content`/`lead_id` + 值域约束 + 索引 + 历史回填 + 3 视图 |
| 2 | `src/lib/attribution.ts` | 新增 | **零依赖**归因模块（UTM 捕获 / localStorage 持久化 / 车道映射 / 降级判定 / 重定向 URL 构造），被各层共用 |
| 3 | `src/lib/quote-tracking.ts` | 改 | 询盘层（008）：透传 UTM 四件套 + lead_source；010 未应用时**降级重试** |
| 4 | `src/lib/tracking.ts` | 改 | 事件层（009）：同步车道字段；读降级标记自动降级（支撑 KPI「深链点击 UTM」） |
| 5 | `src/app/api/quote/route.ts` | 改 | schema 加 UTM 可选字段 + 008 insert 透传 + 降级重试 + `quotes.design_notes` 留底 UTM |
| 6 | **`src/components/quote/QuoteRedirect.tsx`** | 改 | ★ **深链落点**：先捕获归因再跳转 + 三个跳转分支全部保留 UTM（详见 §3.1） |
| 7 | **`src/components/quote/QuoteForm.tsx`** | 改 | 主表单：`quotes.design_notes` 留底 UTM（K3 在业务表直接看来源车道） |
| 8 | `docs/k3-010-verify-script-2026-09-17.md` | 新增 | **K3 手动执行脚本卡**（9 min 闭环：跑 SQL → 自查 → 回话） |
| 9 | `scripts/verify-lead-attribution.ts` | 新增 | 归因回归测试（**69 断言**，可重跑） |

### 值域（与 010 CHECK 约束严格一致，6 值）

| 车道 | 值 | 来源 utm_source |
|------|-----|------------------|
| Reddit | `reddit` | reddit |
| LinkedIn | `linkedin` | linkedin / linked-in / lnkd |
| Quora | `quora` | quora |
| Email | `email` | email / mail / newsletter |
| WhatsApp | `wa` | wa / whatsapp / whats-app |
| 自然/其他 | `organic` | 无 UTM，或非 outbound（google/cpc…）→ 兜底车道（utm_source 原值仍完整落库，可细查） |

---

## 三、三个关键工程决策（为什么这样做）

### 3.1 ★ UTM 必须持久化，且深链落点不许丢参数

**问题 A（跳页断链）**：outbound 深链落地后，用户常先浏览别的页再回 `/quote/` 提交。那一刻
`window.location.href` 已无 UTM → 归因断裂 → **lead_id 全丢 → Lane O ROI 系统性低估**。

**做法 A**：`getAttribution()` = last-touch deeplink + **30 天窗口**（对齐 GA4 默认归因窗口）：
1. URL 带 UTM → 视为新触达，写 `localStorage`
2. URL 无 UTM → 读 `localStorage` 兜底
3. 超 30 天 → 作废（清记录，退 organic）

**问题 B（落点丢参数，本轮新发现）**：`/[locale]/quote/` 页**没有表单**，它是个重定向页
（`QuoteRedirect`：无 `product` → `/contact/`，有 `product` → 产品页）。

而 v10 的深链 `/zh-hk/quote/?utm_source=reddit&...` **正是无 product 形态** → 旧实现
`window.location.href = /${locale}/contact/` **不带任何查询参数** → **UTM 在重定向瞬间永久丢失**，
用户随后在 contact 页（QuoteForm 实际渲染处）提交询盘时归因已归零。

**做法 B**：`QuoteRedirect` 改为：
1. 挂载时**先 `getAttribution()` 捕获**（写 localStorage）再跳转
2. 三个跳转分支**全部保留 UTM**：
   - 无 product → `/contact/?utm_...`（旧实现丢光）
   - 未映射 product → `/contact/?product=x&utm_...`（旧实现丢光 UTM）
   - 已映射 product → 产品页 `?utm_...`（旧实现已保留，本次收敛到统一纯函数）
3. URL 构造抽成纯函数 `buildRedirectUrl()` → **可被测试锁住**（测试里复制逻辑不算测）

**全链路断言**（测试 §5.6）：深链 → 重定向 → 落地页读取，`lead_id` 与车道**逐项不变**。

### 3.2 ★ 迁移未跑时不许破既有度量层（P0 回归防护）

010 与 008 同模式 = **K3 手动在 Supabase SQL Editor 跑**。若代码先上线而迁移未跑，
带新列的 insert 会被 PostgREST 拒（PGRST204）→ **008 度量层整层写入失败**（等于 8/20 的
"上线即死"事故重演）。

**做法（两层各自兜底）**：
- **008 询盘层**：捕获 PGRST204 → 去掉新列**降级重试** → 度量照常写入
- **009 事件层**（sendBeacon 拿不到响应）：008 探测到缺失时打 `localStorage` 标记 →
  事件层读到标记自动不带新列 → 事件不丢
- 降级判定**只认列缺失信号**，`permission denied`（RLS 类）**不误判降级**（有专门负向断言）

### 3.3 ★ 归因逻辑独立成零依赖模块

`quote-tracking.ts` 会 import supabase client；`tracking.ts` 是纯 sendBeacon 轻量模块。
若后者为拿归因而 import 前者，会把 supabase client 拉进事件层 bundle。

**做法**：`src/lib/attribution.ts` 只用浏览器原生 API，两层共用 → 零重复 + 无循环依赖 + 不膨胀 bundle。
`quote-tracking.ts` 保留 re-export，既有消费方 import 路径不变。

---

## 四、验证证据

| 验证项 | 命令 | 结果 |
|--------|------|------|
| 归因逻辑 | `npx tsx scripts/verify-lead-attribution.ts` | **69 pass / 0 fail**（PASS） |
| 类型 | `npx tsc --noEmit` | **54**（基线 54，持平，0 新增） |
| 门童 | `node scripts/check-regression-guard.js --dod` | **🔴51 \| 🟠1529 \| 🟡1088**（与改动前逐项持平） |
| 编码 | pre-commit hook | 通过 |

**测试覆盖的 5 组（69 断言）**：
1. `parseUtmParams`（4 参解析 + 无 UTM + 非法 URL 不抛）
2. `resolveLeadSource`（18 组映射 + **值域封闭性**：任意输入都落在 6 值域内）
3. `getAttribution`（SSR 守卫 / URL 捕获 / **跳页不丢** / last-touch 覆盖 / **31 天作废·29 天有效** / 脏数据不抛）
4. `isMissingLeadColumnError`（4 正例 + 6 反例 —— 含 `permission denied` **不许误判降级**）
5. `buildRedirectUrl`（★ 三跳转分支保留 UTM + 无尾随 `?` + **全链路 lead_id 不变**）

**测试期间发现并修掉一个测试自身的坑**：第一版 mock 的 `window.localStorage` 按值捕获
storage 对象，换 storage 后 window 仍指旧对象 → "脏数据"用例**假通过**（1 fail 暴露）。
改用 getter 动态绑定后 69/69 真通过。→ 教训：**mock 必须验证"确实测到了目标分支"，否则假绿**。

---

## 五、K3 待办（唯一手动步骤）

按 `docs/k3-010-verify-script-2026-09-17.md`：
1. Supabase SQL Editor 粘贴跑 `010_add_lead_source_attribution.sql`（预期 4 个 OK）
2. 自查 3 列 + 约束就位
3. 回一句 → 我做 push + verify + 线上深链端到端验收

**深链格式**（Lane O 话术上线前强制）：
```
https://zprintpro.com/{zh-hk|en|ja}/quote/?utm_source={reddit|linkedin|quora|email|wa}
    &utm_medium=outreach&utm_campaign=lane-o-{品类}&utm_content={lead_id}
```
（v10 卡原文写 `/zht-hk/` 是笔误，实际 locale 是 `zh-hk`）

---

## 六、顺带发现的既有问题（不属 P0-3，待 K3 裁决）

`src/components/services/RushCtaForm.tsx` → `POST /api/quote`：
- 它发 `{name, email, phone, product, qty, time, note}`
- `/api/quote` 的 zod schema 要求 `{productSlug, productName, quantity, size{w,h,unit}, material, deadline, unitPrice, totalPrice, customerName, customerEmail}`
- **字段完全不匹配 → 该表单必然 400，提交不到 Supabase**

该组件在 **§0.25.9.3 冻结名单**（`src/components/services/Rush*` 8 组件），按规则**未改动**。
本卡只给 `/api/quote` 补了 UTM 透传能力（不改冻结组件）。

**建议**（待 K3 一句话）：解冻修 rush 表单，或让它改走客户端 `trackQuoteRequest` 直写 008
（与 QuoteForm 同路，顺带让 rush 询盘也进度量层）。
