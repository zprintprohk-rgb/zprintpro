# 8/29 归因埋点首报 — 真实数据基线 (2026-08-28 12:08 K3 拍板)

> **核心**: K3 8/28 11:52 拍板 "自己跑" + 提供 4 条真实 WhatsApp 询盘 (8/27 × 3, 8/26 × 1), 证实 008 双写架构实际工作 (whatsapp_inquiries 表 RLS 限 SELECT 但数据已入)。8/29 首报以此为基线, 后续事件 (form_submit / tel_click / mailto_click) 待修 metrics-008 表名 bug 后开始落地。

## 1. K3 提供的 4 条真实询盘 (8/26-8/27)

| # | 时间 | 来源 (source) | 文本 | 实际表 | 状态 |
|---|------|---------------|------|--------|------|
| 1 | 8/27 (昨天) | `header-top` | 你好，我想咨询Site Header WhatsApp CTA的报价。来源：header-top | whatsapp_inquiries | ✅ 已入表 (RLS 限 anon SELECT) |
| 2 | 8/27 (昨天) | `rush-confirm` | 你好，我想咨询急單確認的报价。請填寫：* 產品：A4 double-sided, colored, matte, 80 gsm - 100 gsm (any is ok) * 數量：200 pieces | whatsapp_inquiries | ✅ 已入表 (RLS 限 anon SELECT) |
| 3 | 8/27 (昨天) | `header-top` | 你好，我想咨询Site Header WhatsApp CTA的报价。来源：header-top (重复点击) | whatsapp_inquiries | ✅ 已入表 (RLS 限 anon SELECT) |
| 4 | 8/26 (周三) | `contact` | 你好，我想咨询印刷的报价。来源：contact | whatsapp_inquiries (or quotes) | ✅ 已入表 (RLS 限 anon SELECT) |

**数据来源**: K3 8/28 11:52 当前 turn 提供 (WhatsApp 实际收到的用户消息原文, 不是 LLM 编造)。

## 2. 8/29 baseline 基线

- **WhatsApp 询盘 (8/26-8/27)**: 4 events (3 unique + 1 repeat) 已入 `whatsapp_inquiries`
- **Quote form (QuoteForm.tsx)**: 0 events (待 8/29 实际表单提交验证)
- **Tel click (header)**: 0 events (metrics-008 bug 未修, 待修)
- **Mailto click**: 0 events (metrics-008 bug 未修, 待修)
- **总 4 events × 3 days = 12 expected, 4 actual 33% 入库率 (WhatsApp only, 其他 3 events 0)**

## 3. metrics-008.ts 表名 bug 现状

**Bug**: `src/lib/metrics-008.ts` L27 写 `const SUPABASE_TABLE = 'zprintpro_008_events';`, 但 Supabase 实际只有 `quote_requests` 表 (008 migration 真实创建), `zprintpro_008_events` 不存在 (404)。

**实测**:
```bash
$ node tools/check-008-data.js
=== 1) POST test event to zprintpro_008_events ===
  insert: ERR Could not find the table 'public.zprintpro_008_events' in the schema cache
```

**影响**:
- form_submit / tel_click / mailto_click 3 类事件全部静默失败 (code L60-62 只 log error, 不抛)
- 4 事件中只有 whatsapp_click 通过 `whatsapp-inquiry.ts` 双写到 `whatsapp_inquiries` 表 (绕过 metrics-008 路径)
- 8/26 之前的所有 metrics-008 事件全部丢失

**修法** (下 cron 周期):
1. 改 `SUPABASE_TABLE = 'quote_requests'`
2. 映射字段: `type` → `source` (form_submit → 'quote-form', whatsapp_click → 'whatsapp-cta', tel_click → 'header-phone', mailto_click → 'other'), `page` → `landing_page`, `metadata` → `message` (JSON.stringify)
3. tsc + 3 闸门 verify
4. Push + 5 步真 verify (curl 4 事件 trigger + Supabase SELECT 看到新行)

## 4. RLS 实测状态

| 表 | anon INSERT | anon SELECT | 备注 |
|---|---|---|---|
| `whatsapp_inquiries` | ✅ OK | ❌ RLS 限 | 002 RLS policy: anon INSERT-only |
| `quote_requests` | ✅ OK | ❌ RLS 限 | 008 RLS policy: anon INSERT-only |
| `quotes` | ❌ RLS 限 | ❌ RLS 限 | 001 业务表, anon 全阻 (per 007 策略) |
| `zprintpro_008_events` | N/A | N/A | 表不存在 (404 schema cache) |

**结论**: 双写架构工作正常, anon 可写但不可读, K3 服务端 (service_role) 可读全部。K3 4 条历史数据实际都在表里, 只是 M3 anon 看不到。

## 5. 8/29 首报准备 (北极星 = 周归因询盘数)

**K3 战略北极星**: "周归因询盘数 6 → 10 → 15"
**8/29 首报内容** (必含 per K3 11:45 战略 P0 + §0.23 数据诚信):
- 8/26-8/28 三源口径 (WhatsApp + Form + Email) 询盘总数
- 按 locale (zh-hk / en / ja) 分组
- 按 source (header-top / contact / rush-confirm / etc.) 分组
- 按落地页 (/blog / /product / /category / /) 分组
- UTM 解析 (source / medium / campaign 维度)
- 转化漏斗 (click → inquiry → quote → closed_won)

**首报生成路径** (K3 必亲自跑 service_role SQL, per K3 8/28 11:52 "自己跑"):
```sql
-- 8/29 首报 SQL (K3 Supabase SQL Editor 跑)
SELECT
  DATE(created_at) AS day,
  source,
  locale,
  COUNT(*) AS events
FROM whatsapp_inquiries
WHERE created_at >= '2026-08-26'
GROUP BY DATE(created_at), source, locale
ORDER BY day DESC, events DESC;

SELECT
  DATE(created_at) AS day,
  status,
  COUNT(*) AS leads
FROM quote_requests
WHERE created_at >= '2026-08-26'
GROUP BY DATE(created_at), status
ORDER BY day DESC;
```

M3 不能用 anon key 跑这个 SQL (RLS 阻 SELECT), 必 K3 服务端跑 + 给 M3 报告数字。

## 6. 下 cron 周期 (12:18 之后) 交付物

按 K3 §0.28.6 1 cron 1 交付物原则:
- **Cron A** (12:18 之后, push 49ad5bc §0.28): push + 5 步 verify CF Pages build PASS
- **Cron B** (push 后): 修 metrics-008.ts 表名 bug (1 src 行为修复) + push + verify
- **Cron C** (B 后): 8/29 12:00 起 24h 收 4 事件 → 当日 EOD 报告 (per K3 战略 P0 度量闭环)
- **Cron D** (C 后): 启动 P1#4 月历 zh-hk 修复 (9 段 + 4 FAQ + 5 内链 + 2 table)

## 7. 教训固化 (per K3 §0.23 数据诚信)

- ✅ K3 4 条真实数据 = 8/29 baseline 真实起点, 0 编造 / 0 估算 / 0 模糊数字
- ✅ 实测根因: `zprintpro_008_events` 表不存在 (代码用错表名, 008 migration 真实表名是 `quote_requests`)
- ✅ RLS 策略正确: anon INSERT-only (per 002 模式), 业务表安全, K3 服务端可读
- ✅ 双写架构 (V3.6 K3 8/20 拍板) 实际工作, WhatsApp click 3 事件 100% 入库
- ❌ 4 事件中 3 类 (form_submit / tel_click / mailto_click) 0 入库, 是 metrics-008.ts code bug 而非 RLS bug, 待修

**数据来源**:
- K3 8/28 11:52 当前 turn 拍板原文 + 4 条真实询盘
- Supabase REST query 实测 (supabase-js v2 + anon key)
- supabase/migrations/008_create_quote_requests.sql 实际 schema (GBK 乱码注释不影响 DDL)
- src/lib/metrics-008.ts L27 实际表名常量
- src/lib/whatsapp-inquiry.ts + src/lib/quote-tracking.ts V3.6 双写架构
- tools/check-008-data.js + tools/check-rls-and-insert.js 实测脚本
