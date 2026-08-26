# 008 询盘度量层 K3 上线 + 端到端验证 (2026-08-20)

> **状态**: 代码 + SQL + 验证脚本就绪 (本地落盘, 不 push)。
> **K3 9 分钟闭环**: 跑修复版 SQL (5 min) + CF Pages env (2 min) + 端到端脚本 (2 min) → 008 度量层正式上线。
> **诚实声明**: v1 已知 -10 分风险 (ga4_client_id 全 null 跨 session 拉通失效 / anon INSERT spam 风险 / 端到端未实证)。端到端实证是这次上线的"必要步骤"。

---

## 一、K3 V2 评分回顾 (诚实记录)

K3 8/20 11:50 V2 评分:

| 维度 | 初版 | 修复后 |
|------|------|--------|
| 架构设计 | A | A |
| 代码质量 | A- | A- |
| **功能可用性** | **F (上线即死)** | **B+** |
| 文档准确性 | C (Vercel 错) | A- |
| **总评** | 72/100 | 90/100 |

K3 抓到的 P0 致命缺陷:
1. **初版 008 SQL 启用 RLS 但零 policy** — 浏览器 anon key 写入被拒 (42501), fire-and-forget 静默吞错 → 整层度量上线即死, 任何自验都显示 PASS (经典 "build PASS + URL 200 ≠ 功能 PASS")
2. **平台写错 Vercel** — 本项目部署在 Cloudflare Pages (wrangler.toml), 实施文档改 CF Pages Settings → Environment Variables

**K3 修复版 (SQL L92-108, 已落盘)**:
```sql
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert" ON quote_requests
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated select" ON quote_requests
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated update" ON quote_requests
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
```

完全跟 002 whatsapp_inquiries 模式一致 (K3 评分 B+ 锁定)。

---

## 二、K3 真人窗口 9 min 闭环 (今晚 21:12)

### Step 1 (5 min) — 跑修复版 008 SQL

1. 打开 https://supabase.com/dashboard → zprintpro project → **SQL Editor**
2. **+ New query** → 粘贴 `F:\zprintpro-nextjs\supabase\migrations\008_create_quote_requests.sql` 全文
3. **Run** (▶)
4. 预期输出 (4 NOTICE + 0 ERROR):
   ```
   NOTICE: RLS enabled on public.quote_requests
   NOTICE: 008 quote_requests 视图: ...
   NOTICE: SAFETY NET: RLS force-enabled on ...
   NOTICE: OK: public schema 全部表已启用 RLS
   ```
5. **Database → Advisors** tab 验证: 0 critical alert (含历史 7/28 RLS 警告)

### Step 2 (2 min) — CF Pages env (不是 Vercel!)

**路径**: Cloudflare Dashboard → Pages → zprintpro-nextjs → Settings → Environment Variables

**3 个必填** (Production):
| 变量 | 值 | 来源 |
|------|-----|------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxx.supabase.co` | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` (~200 字符 JWT) | Supabase → Settings → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` (~200 字符 JWT) | Supabase → Settings → API → service_role secret |

**K3 验证方法** (Supabase Dashboard):
- 左下角 Settings (齿轮) → API
- Project URL + anon public + service_role (reveal) 三件套

### Step 3 (2 min) — 通知 Mavis push 008

1. 贴 1 句: "008 SQL 跑完 + env 粘好, push + verify"
2. Mavis 立即:
   - `git add supabase/migrations/008_create_quote_requests.sql src/lib/quote-tracking.ts src/components/quote/QuoteForm.tsx src/lib/whatsapp.ts scripts/verify_quote_insert.py`
   - precheck: encoding + tsc + `npm run build` (4 步, 5 min)
   - commit + push
   - verify-deploy.mjs 5 步真验收 (5 min)
   - **端到端跑 `python scripts/verify_quote_insert.py`** (2 min) — 这是关键, 不跑 = 不能报 PASS
   - 写 `.hermes/k3-inbox/2026-08-20-008-verify-PASS.md` 报告
   - 升级 K3 1 段中文 status

### Step 4 (T+30 min) — 第一批真实询盘数据

明天 8/21 14:00 K3 复测时:
- `SELECT * FROM quote_requests WHERE created_at >= NOW() - INTERVAL '24 hours'` → 询盘数 (期望 ≥ 0, anon INSERT 真落库)
- `SELECT * FROM v_quote_source_distribution` → 渠道分布 (form / WhatsApp CTA)
- `SELECT * FROM v_quote_funnel` → 状态机漏斗 (new / contacted / quoted / closed_won)

**PASS 标志**: anon INSERT 落库 ≥1, service_role SELECT 读回 1, service_role DELETE 清理 1 → 008 度量层正式上线。

---

## 三、scripts/verify_quote_insert.py 端到端验证脚本 (9.4 KB)

**功能**: 3 步端到端测试, 模拟浏览器 anon key INSERT 真实询盘, 验证 RLS policy 正确, fire-and-forget 链路真通。

### 3 步流程

| Step | 操作 | 用 Key | 期望 |
|------|------|--------|------|
| 1 | INSERT 一条测试行 (source='quote-form', 唯一 session_id) | anon | HTTP 201, 落库 1 条 |
| 2 | SELECT 测试行 (按 session_id 查) | service_role | 找到 1 条, email 匹配 |
| 3 | DELETE 测试行 (按 session_id 删) | service_role | 删 1 条, 清理 |

**为什么必须 3 步** (K3 评分 V2 B+ → 90/100 改进点):
- Step 1 验证: 浏览器真能写入 (RLS 允许 anon INSERT)
- Step 2 验证: K3 dashboard 真能读到 (RLS 允许 authenticated SELECT)
- Step 3 验证: K3 真能清理测试数据 (避免污染生产数据)

**单步失败 ABORT**: Step 1/2 失败 → 整层度量"上线即死"风险, 立即升级 K3。Step 3 失败 → 1 条测试行残留, K3 手动 dashboard 删 (非阻塞)。

### 怎么跑

```powershell
cd F:\zprintpro-nextjs
$env:PYTHONIOENCODING = 'utf-8'
python scripts/verify_quote_insert.py
```

**无 env 时 (本地 Mavis 跑 dry-run)**: fail-fast 提示 K3 配 env 后再跑, 不会乱插测试数据。

**有 env 时 (K3 粘完 + 部署后 Mavis 跑)**: 输出:
```
✅ 008 询盘度量层端到端 PASS
- Step 1: anon INSERT 落库成功 (id=12345)
- Step 2: service_role SELECT 读回 1 条
- Step 3: service_role DELETE 清理 1 条
```

---

## 四、诚实声明 -10 分风险 (K3 评分透明)

### 风险 1: ga4_client_id 全 null (跨 session 拉通失效)

**事实**: 本站 8/20 没装 GA4 (用 Cloudflare Web Analytics), quote-tracking.ts:135 解析 _ga cookie 永远返回 null。
**影响**: v_customer_journey 视图"跨 session 拉通"功能**空跑** (ga4_client_id IS NOT NULL 过滤后 0 条)。
**v1 接受**: K3 评估可接受, 关标签页即失效的 sessionStorage UUID 也能拉通单 session 多次询盘 (比如同一 session 试 form + WhatsApp CTA)。
**后续**: 接 GA4 或改用 cookie 自己生成 zp_uuid (跨 session 持久化)。

### 风险 2: anon INSERT 全开放 (spam 风险)

**事实**: anon INSERT policy `WITH CHECK (true)` 允许任何 IP 写任何数据, 无频率 / 无 honeypot / 无 captcha。
**影响**: spam 机器人 1 小时插 10K 条污染 dashboard 计数。
**v1 接受**: 跟 002 whatsapp_inquiries 风险水平一致, 暂用 CF Pages Rate Limiting + Supabase RLS quota 兜底。
**后续**: Supabase RLS 加 CHECK 条件 (created_at within 5s + landing_page match ^/zprintpro\.com/), 或前端加 honeypot 字段。

### 风险 3: 端到端未实证 (本次上线后必闭环)

**事实**: 008 SQL 已修, 代码已 build PASS, 但**真实环境 (Supabase + CF Pages env + 真实用户) 是否真通, 仍待端到端跑 verify_quote_insert.py 验证**。
**风险**: 历史 zprintpro 8/7 18:30 /api/quote 黑洞教训 — 询盘阻塞 4 天才发现, 都是"代码看起来对 ≠ 数据真落库"。
**v1 接受**: 部署后 2 min 跑脚本 PASS 才算闭环, FAIL 立即 revert。

---

## 五、push 后 5 步真验收 (含端到端 insert)

| Step | 工具 | 期望 |
|------|------|------|
| 0 | `https://api.github.com/repos/{owner}/{repo}/commits/{sha}/check-runs` | conclusion = 'success' |
| 1 | `git rev-list --left-right --count origin_ssh/main...HEAD` | 0 0 (无 ahead) |
| 2 | `curl -I https://zprintpro.com/zh-hk/quote/` | 200 |
| 3 | `python scripts/verify_quote_insert.py` | **✅ PASS (3/3 步全过)** |
| 4 | `curl -I https://zprintpro.com/zh-hk/about/` | 200 (8/19 5-item bundle 仍 PASS) |
| 5 | `node scripts/verify-deploy.mjs` | CF Pages success |

**5/5 PASS 才算 008 度量层上线闭环**。任一 FAIL 立即 revert + 升级 K3。

---

## 六、不在本实施范围 (留 K3 拍板)

- ⚪ 8/19 拍板 P0-B 4 件 (真人头像 / 证书扫描 / 客户 logo / 3 个真实订单口述)
- ⚪ 7/28 v2.1 §3.3 约束 4 vs GSC Rich Results 拍板 C 维持 (K3 21:08 拍板) — 不接 fake review
- ⚪ V22 Direct Seedream API 试跑 (K3 ARK_API_KEY 到位后)
- ⚪ D3 12 篇博客 (婚礼 2 篇优先) - 8/20-8/23 排期
- ⚪ §0.20 cron 1h minimum 规则 - 等 Hermes 审批跨项目固化

---

## 七、push 后 1 段 status (Mavis 升级 K3 模板)

```
✅ 008 询盘度量层上线闭环 (V3.6 战略 008)
- 修复版 SQL (含 3 RLS policy, 跟 002 模式一致)
- 双写 (QuoteForm + WhatsApp CTA) + 4 视图 + 9 索引
- 端到端 verify_quote_insert.py: 3/3 PASS (anon INSERT 落库 / service_role SELECT 读回 / DELETE 清理)
- CF Pages build PASS, 5 步真验收全过
- 明早 8/21 14:00 第一批真实询盘数据
- 诚实声明: ga4_client_id 全 null (站没装 GA4), anon INSERT 无 spam 拦截 (跟 002 同水平)
```

---

*Mavis / K3 上线闭环 · 2026-08-20 12:30 · 本地落盘不 push, 等 K3 真人窗口触发*
