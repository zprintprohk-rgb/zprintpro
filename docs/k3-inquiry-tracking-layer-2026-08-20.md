# K3 询盘度量层实施文档 (V3.6 战略 8/20 拍板)

> **目的**: 把"询盘"度量从分散在 001/002 业务表, 提升为统一的 quote_requests 度量层 (008), 实现 V3.6 §五 排名→CTR→询盘→成交全链路闭环。
> **状态**: **代码 + SQL 已就绪 (本地落盘, 不 push)**, 等 K3 Supabase key 粘贴后 1 push 上线。
> **K3 操作**: 1 步 (Supabase Dashboard 跑 SQL + Cloudflare Pages env 加 URL+key) + 1 push Mavis 执行。

---

## 一、为什么需要 008 quote_requests 表 (V3.6 §五转化闭环)

**问题 (V3.6 战略 8/20 §五 实证)**:

| 现状 | 缺口 |
|------|------|
| `quotes` 表 (001) 写业务数据 (报价单) | 缺归因 (ga4_client_id / UTM / landing_page) |
| `whatsapp_inquiries` 表 (002) 写 click 流水 | 缺跨渠道统一 (PDP CTA / footer / sticky 没度量) |
| GA4/Plausible 18 事件埋点 | 缺业务字段 (product_slug / category / 状态机) |
| 询盘转化率基准 2-5% (B2B 电商) | **当前未知** — 因为没度量层算不出 |

**008 quote_requests 表填补 4 大缺口**:
1. **跨页跨渠道统一** (quote form / WhatsApp CTA / PDP CTA / footer 全部 source 字段)
2. **跨 session 关联** (ga4_client_id 拉通同一客户全链路, 配 4 视图)
3. **UTM 归因** (URL 参数解析, K3 可看哪些渠道带来询盘)
4. **状态机跟单** (new → contacted → quoted → closed_won/lost, K3 手动 status 字段更新)

---

## 二、3 文件就位 (本地落盘, 不 commit/push)

| 文件 | 字节 | 行 | 角色 |
|------|------|----|----|
| `supabase/migrations/008_create_quote_requests.sql` | 8833 | ~200 | 新表 + 4 视图 + RLS (per 007 策略) |
| `src/lib/quote-tracking.ts` | 6398 | ~200 | 度量模块 (ga4_client_id + UTM + session 解析) |
| `src/components/quote/QuoteForm.tsx` (改) | +30 | 2 处 | 双写: `quotes` + `quote_requests` |
| `src/lib/whatsapp.ts` (改) | +8 | 1 处 | 双写: `whatsapp_inquiries` + `quote_requests` |

**Build PASS** (npm run build 验证):
- ✅ Compiled successfully
- ✅ 0 TS error
- ✅ 4 URL 200 (zh-hk/en/ja/quote + 根)
- ✅ quote route 1.81 kB (无 bloat)

---

## 三、双写架构 (V3.6 §五 量化漏斗)

```
┌──────────────────┐
│  用户行为触发     │
│  - QuoteForm     │
│  - WhatsApp CTA  │
│  - PDP CTA       │
│  - Footer        │
└────────┬─────────┘
         │ fire-and-forget (不 await, 不阻塞跳转)
         ▼
┌──────────────────────────────────────────────┐
│  双写: 业务表 (001/002) + 度量表 (008)         │
│  - 001 quotes: 客户经理跟单 (业务数据)         │
│  - 002 whatsapp_inquiries: click 流水         │
│  - 008 quote_requests: 跨渠道统一 + 归因 + 状态 │
└────────┬─────────────────────────────────────┘
         │ 4 视图聚合
         ▼
┌──────────────────────────────────────────────┐
│  008 视图 (K3 dashboard 查询)                 │
│  - v_quote_source_distribution: 渠道分布     │
│  - v_customer_journey: 跨 session 拉通       │
│  - v_quote_funnel: 状态机漏斗                 │
│  - v_quote_conversion_rate: 询盘→成交率      │
└──────────────────────────────────────────────┘
```

---

## 四、008 SQL 表结构 (核心字段)

### 主表 quote_requests (200+ 行)

| 字段 | 类型 | 必填 | 备注 |
|------|------|------|------|
| `id` | BIGSERIAL | ✓ | PK |
| `created_at` | TIMESTAMPTZ | ✓ | 默认 NOW() |
| `source` | VARCHAR(50) | ✓ | quote-form / whatsapp-cta / pdp-cta / footer-whatsapp / sticky-cta / header-phone / other |
| `locale` | VARCHAR(10) | ✓ | zh-hk / en / ja |
| `landing_page` | TEXT | | 触发询盘的 URL (归因核心) |
| `referrer` | TEXT | | document.referrer |
| `utm_source/medium/campaign` | VARCHAR(100) | | URL ?utm_xxx= 解析 |
| **`ga4_client_id`** | VARCHAR(50) | | **跨 session 拉通 (从 _ga cookie 解析)** |
| `session_id` | VARCHAR(100) | | sessionStorage UUID (浏览器级) |
| `first_touch_at` / `last_touch_at` | TIMESTAMPTZ | | 跨页累加 |
| `customer_name/email/phone` | VARCHAR/TEXT | | 业务字段 |
| `product_slug/name` | VARCHAR(100/255) | | /product/<slug>/ 关联 |
| `category` | VARCHAR(100) | | 主营品类 5 |
| `quantity/size/message` | VARCHAR/TEXT | | 询价详情 |
| **`status`** | VARCHAR(20) | ✓ | **new / contacted / quoted / closed_won / closed_lost** |
| `contacted_at / quoted_at / closed_at` | TIMESTAMPTZ | | 状态机时间戳 |
| `k3_note` | TEXT | | K3 手动备注 (订单结果) |
| `user_agent / device_type / ip_address` | 系统字段 | | 设备归因 |

### 9 索引 (K3 dashboard 性能)

```sql
idx_quote_requests_created_at      -- 时间序 (日报)
idx_quote_requests_locale_source   -- 渠道 × locale
idx_quote_requests_ga4_client_id   -- 跨 session 拉通
idx_quote_requests_email           -- 客户去重
idx_quote_requests_phone           -- 客户去重
idx_quote_requests_product_slug    -- PDP 转化率
idx_quote_requests_status          -- 状态机漏斗
idx_quote_requests_landing_page    -- 着陆页转化率
```

### 4 视图 (K3 dashboard 聚合)

| 视图 | 用途 | 关键查询 |
|------|------|---------|
| `v_quote_source_distribution` | 渠道分布 (PDP→询盘 2-5% 良性) | source × locale × day |
| `v_customer_journey` | 跨 session 全链路 | ga4_client_id 拉通 |
| `v_quote_funnel` | 状态机漏斗 (询盘→聊天→成交) | status × source |
| `v_quote_conversion_rate` | 询盘→成交率 (按 landing_page) | win_rate_pct |

### RLS 策略 (per 007 铁律)

- ✅ 启用 RLS, **不创建任何公开 policy** = 默认拒绝 anon/authenticated
- ✅ service_role 绕过 RLS, 服务端 API 路由可访问
- ✅ 安全网: 重新扫 public schema, 任何遗漏的表强制 RLS

---

## 五、src/lib/quote-tracking.ts 模块 (核心 3 函数)

```typescript
// 主入口: 跨渠道统一写 quote_requests
trackQuoteRequest({
  source: 'quote-form' | 'whatsapp-cta' | 'pdp-cta' | ...,
  locale: 'zh-hk' | 'en' | 'ja',
  customerEmail/Phone/Name,
  productSlug/Name,
  category, quantity, size, message,
  pageUrl, referrer, // 自动从 window.location / document.referrer 取
})

// WhatsApp 上下文转换 (per V3.6 双写)
trackQuoteRequestFromWhatsApp('whatsapp-cta', 'zh-hk', ctx)
```

**fire-and-forget 设计** (跟 whatsapp-inquiry.ts 一致):
- ❌ 不 await (不阻塞跳转/提交)
- ❌ 失败不抛 (不阻塞主流程)
- ✅ dev 环境 console.debug 调试可见
- ✅ SSR 守卫 (`typeof window === 'undefined'`)
- ✅ Supabase 未配置守卫 (`!process.env.NEXT_PUBLIC_SUPABASE_URL`)

**3 内部 helper**:
- `getGa4ClientId()`: 从 `_ga` cookie 解析 `GA1.2.1234567890.1234567890`
- `getOrCreateSessionId()`: sessionStorage UUID (`zp_quote_session_id`)
- `parseUtmParams()`: URL `?utm_source=xxx` 解析

---

## 六、QuoteForm 双写改动 (V3.6 战略 L325-330)

**改前**: 写 001 `quotes` 业务表 (1 处)
**改后**: 写 001 `quotes` + 008 `quote_requests` 双写 (2 处)

```typescript
// 业务表 (001) - 客户经理跟单用
const { error } = await supabase.from('quotes').insert({
  customer_name: data.name || data.phone,
  customer_email: data.email,
  ...
});
if (error) throw error;

// V3.6 双写 (008) - 度量层, 跨 session 关联 + 归因 + 状态机
trackQuoteRequest({
  source: 'quote-form',
  locale,
  customerName: data.name,
  customerEmail: data.email,
  customerPhone: data.phone,
  productSlug: productSlug || undefined,
  productName: productName,
  category: data.category || undefined,
  quantity: data.quantity || undefined,
  size: data.size || undefined,
  message: `[${sheet.ref}] ${data.message}${fileNote}`,
}).catch(() => { /* 度量失败不影响主流程 */ });
```

---

## 七、whatsapp.ts 双写改动 (V3.6 战略 L114-117)

**改前**: onClick → GA4 事件 + 写 002 `whatsapp_inquiries` (2 处)
**改后**: onClick → GA4 事件 + 写 002 `whatsapp_inquiries` + 写 008 `quote_requests` (3 处)

```typescript
onClick: () => {
  // 1) GA4 / Plausible 事件 (已有)
  import('@/lib/analytics').then(({ trackWhatsappClick }) => {
    trackWhatsappClick({ source: ctx.source || 'unknown', hasContext: ..., productName: ctx.productName });
  });
  // 2) 业务表 (002) - click 流水 (已有)
  import('@/lib/whatsapp-inquiry').then(({ trackWhatsappInquiry }) => {
    trackWhatsappInquiry({ locale, ctx });
  });
  // 3) V3.6 双写 (008) - WhatsApp click 算询盘 (新增)
  import('@/lib/quote-tracking').then(({ trackQuoteRequestFromWhatsApp }) => {
    trackQuoteRequestFromWhatsApp('whatsapp-cta', locale, ctx);
  });
}
```

**关键**: WhatsApp click 跟 form submit 同等算"询盘" (V3.6 §五 度量口径统一), source 字段区分 (`whatsapp-cta` vs `quote-form`)

---

## 八、K3 1 步操作 (今晚 21:12 真人窗口)

### Step 1 (5 min) — Supabase Dashboard 跑 008 SQL

1. 打开 https://supabase.com/dashboard
2. 选 zprintpro project → **SQL Editor**
3. **+ New query** → 粘贴 SQL (路径: `F:\zprintpro-nextjs\supabase\migrations\008_create_quote_requests.sql`)
4. **Run** (▶)
5. 预期输出:
   ```
   NOTICE: OK: public schema 全部表已启用 RLS (含 008 quote_requests)
   NOTICE: 008 quote_requests 视图: v_quote_source_distribution / v_customer_journey / v_quote_funnel / v_quote_conversion_rate
   ```
6. **Advisors** tab 验证: 0 critical alert

### Step 2 (2 min) — Cloudflare Pages env 加 Supabase URL + key (如果还没)

> ⚠️ 2026-08-20 K3 评分修正: 初版误写 Vercel — 本项目部署在 **Cloudflare Pages** (wrangler.toml), 没有 Vercel。

1. 打开 https://dash.cloudflare.com → Pages → zprintpro 项目 → **Settings** → **Environment Variables**
2. 检查现有 (K3 8/7 v3.4 §一 P0 Supabase 修复):
   - `NEXT_PUBLIC_SUPABASE_URL` (例: `https://xxxxx.supabase.co`)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (例: `eyJ...`, 前端双写用)
   - `SUPABASE_SERVICE_ROLE_KEY` (例: `eyJ...`, 后端用)
3. **缺哪个补哪个** (K3 8/20 21:12 真人窗口粘), 改完 CF 自动 redeploy

### Step 3 (1 min) — 通知 Mavis push

1. K3 贴 1 句: "Supabase key 粘贴好了, push 008 度量层"
2. Mavis 立即:
   - `git add supabase/migrations/008_create_quote_requests.sql src/lib/quote-tracking.ts src/components/quote/QuoteForm.tsx src/lib/whatsapp.ts`
   - precheck (encoding + tsc + build)
   - commit (1 推送)
   - push origin_ssh main
   - verify-deploy.mjs 5 步真验收
   - 报告 K3: 008 部署完成, 度量层开始收集

### Step 4 (T+24h) — 第一批数据

明天 8/21 14:00 K3 复测时:
- `SELECT * FROM quote_requests WHERE created_at >= NOW() - INTERVAL '24 hours'` → 询盘数
- `SELECT * FROM v_quote_source_distribution` → 渠道分布
- `SELECT * FROM v_customer_journey` → 跨 session 客户
- 决定 V3.6 §四 M1 (9/16) clicks ≥85/7d 是否需加速

---

## 九、push 配额 + 月累计 (8/20)

| 维度 | 当前 | 8/20 配额 | 月配额 | 状态 |
|------|------|-----------|--------|------|
| 8/20 push | 0/5 (执行后 1/5) | 重置 | — | 充足 |
| 月 push (8/1-8/20) | 23/150 → 24/150 | — | 150 | 15.3% → 16.0%, 健康 |

**008 度量层 push = 1 次** (8/20 晚, 1 文件群 = 4 文件: 1 SQL + 1 module + 2 改)

---

## 十、V3.6 §四 验收口径 (度量层跑通后)

| 阶段 | 截止 | 目标 | 度量层提供 |
|------|------|------|-----------|
| **M1** | 9/16 | 首页词 12+ → 25+ / clicks ≥85/7d | 询盘 / 词 表关联 (ga4_client_id + UTM) |
| **M2** | 10/16 | 核心词 1-2 个进首页 / clicks ≥150/7d | 询盘 / 词 + source 分布 |
| **M3** | 11/16 | 3+ 核心词进第 5 名 / clicks ≥300/7d / 询盘 15+/月 / run-rate $1.5k | 询盘状态机漏斗 + 转化率 |

**008 度量层 = M1/M2/M3 验收基础数据源**。M1 验收时跑 3 个 SQL 视图即可:
- 询盘总数 (跟 GSC clicks 对比)
- 渠道分布 (WhatsApp vs form 占比)
- 询盘→询价转化率 (按 status='quoted' 算)

---

## 十一、不在本实施范围 (留 K3 拍板)

- ⚪ PDP CTA 按钮单写 quote_requests (per V3.6 §五, 但需 M3 设计 PDP CTA 触发逻辑, 等拍板)
- ⚪ K3 手动更新 status 字段 (per V3.6 §五 状态机跟单, 等 K3 真人拍板 workflow)
- ⚪ 询盘 dashboard UI (Supabase 自带 dashboard 可看, 完整 K3 专属 dashboard 等 M3 排期)
- ⚪ 跨 session 合并客户 (v_customer_journey 视图已就绪, M3 跟单逻辑等拍板)

---

*Mavis / K3 实施文档 · 2026-08-20 11:30 · 本地落盘不 push*
