# K3 今晚 21:12 真人窗口 — 47 min 任务卡 (一屏可执行)

> **拍板依据**: V3.6 战略 (CTR 1.53% → 3% / 首页词 12+ → 25+ / 询盘 0 → 15+/月) + 零摩擦 L1 行动包 (8/19 19:30 拍板) + 8/20 11:30 008 度量层 + 8/20 12:30+ Mavis 自主拍板
> **Mavis 已就绪**: 008 SQL (K3 12:34 修好) + verify_quote_insert.py (9.4 KB, 3 步端到端) + 实施文档 + verify 指南
> **Mavis 继承不到 K3 桌面浏览器登录态** (in-app browser 是空白), L1 操作 (跑 SQL / 粘 env) 必 K3 桌面浏览器

## 0. K3 47 min 总览 (4 任务, 互不阻塞可并行)

| # | 任务 | 时间 | 工具 | 阻塞 Mavis? |
|---|------|------|------|-------------|
| 1 | 跑修复版 008 SQL (Supabase Dashboard) | 5 min | K3 桌面浏览器 → Supabase SQL Editor | ✅ Yes (verify 必跑) |
| 2 | 粘 3 env (dev + prod) | 2 min | K3 桌面浏览器 → CF Pages Settings | ✅ Yes (CF deploy 必用) |
| 3 | GSC OAuth 6 步 (service account path) | 20 min | K3 桌面浏览器 → Google Cloud Console + GSC | ❌ No (GSC 拉数据独立) |
| 4 | D4 目录 7/10 提交 (HK 主战场) | 20 min | K3 桌面浏览器 → 7 个目录 | ❌ No (D4 独立) |

**总时长**: 47 min (1+2 必 9 min 先做, 3+4 并行后续 40 min)

---

## 1. 跑 008 SQL (5 min) — Mavis 验证 008 闭环前提

### 操作步骤

```
1. 打开 https://supabase.com/dashboard (K3 浏览器已登录)
2. 选 zprintpro 项目
3. 左侧 → SQL Editor → New query
4. 复制 F:\zprintpro-nextjs\supabase/migrations\008_create_quote_requests.sql 全文 (199 行 / 9774 bytes)
5. 粘贴到 SQL Editor
6. 点击 Run (或 Ctrl+Enter)
7. 期望: Success. No rows returned (DDL 操作, 0 行)
8. 左侧 → Table Editor → 验证 quote_requests 表 + 9 索引 + 4 视图存在
9. 左侧 → Database → Advisors → 验证 0 critical warning
```

### 修复版 SQL 关键段 (K3 12:34 已修, anon key 能 INSERT)

```sql
-- L92: 启用 RLS
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- L95-97: anon 可 INSERT (前端浏览器 anon key 写入)
CREATE POLICY "Allow anonymous insert" FOR INSERT TO anon WITH CHECK (true);

-- L100-102: authenticated 可 SELECT (K3 dashboard 查)
CREATE POLICY "Allow authenticated select" FOR SELECT TO authenticated USING (true);

-- L105-108: authenticated 可 UPDATE (K3 改状态)
CREATE POLICY "Allow authenticated update" FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);
```

### 完成后通知 Mavis

回 "008 SQL 跑完" 即可, Mavis 会 commit + push + 跑 verify_quote_insert.py 端到端。

---

## 2. 粘 3 env (2 min) — 双层 (本地 dev + CF Pages prod)

### 2a. 本地 .env (dev key, verify_quote_insert.py 用)

**文件**: `F:\zprintpro-nextjs\.env`

```bash
# 现有 .env 缺 Supabase env, 必加 3 行
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**取值位置**: Supabase Dashboard → Settings → API
- `URL` → NEXT_PUBLIC_SUPABASE_URL
- `anon public` → NEXT_PUBLIC_SUPABASE_ANON_KEY
- `service_role` (⚠️ 仅本地, 永不入 commit) → SUPABASE_SERVICE_ROLE_KEY

### 2b. CF Pages (prod env, 跑 build + 008 度量层用)

```
1. 打开 https://dash.cloudflare.com → Pages → zprintpro (或 zprintpro-nextjs)
2. Settings → Environment variables → Add variables
3. 加 3 个 Production + Preview 同名变量
4. 类型选 Encrypt (含 service_role)
```

| 变量名 | 值 | 加密 |
|--------|----|------|
| NEXT_PUBLIC_SUPABASE_URL | `<同 2a>` | No |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | `<同 2a>` | No |
| SUPABASE_SERVICE_ROLE_KEY | `<同 2a>` | Yes |

### 2c. ⚠️ .env 文件 gitignore 验证 (K3 8/7 教训)

```
# K3 跑前必查
git check-ignore -v .env  # 应命中 .gitignore
```

### 完成后通知 Mavis

回 "env 粘完 (本地 + CF Pages)" 即可。

---

## 3. GSC OAuth 6 步 (20 min) — 修复 GSC API 401 测量失明 (V3.4 问题 1)

**根因 90%** (per 行动包 8/19 20:32): service account 未加 GSC User list (60% 概率)

### 6 步 SOP

```
Step 1.1 (3 min): Google Search Console → Settings → Users and permissions → Add user
              → 添 service account email: zprintpro-gsc-sa@<project>.iam.gserviceaccount.com
              → 权限选 Full

Step 1.2 (2 min): 验证 key 文件存在 + 完整
              → F:\zprintpro-nextjs\.gsc-credentials\zprintpro-gsc-sa.json (或类似路径)
              → cat 验证 JSON 完整 (末尾有 })

Step 1.3 (5 min): 跑 scripts/verify_gsc_auth.py
              → 期望 8/8 PASS (当前 6/8, Step 1.1 做完 → 8/8)

Step 1.4-1.5 (备选, 10 min): 如果 Step 1.3 还 fail, 重建 service account key
              → Google Cloud Console → IAM & Admin → Service Accounts → zprintpro-gsc-sa
              → Keys → Add Key → Create new key → JSON
              → 下载覆盖 .gsc-credentials/zprintpro-gsc-sa.json
              → 重跑 verify_gsc_auth.py

Step 1.6 (1 min): 跑 scripts/fetch_gsc_data.py 拉 7d 数据验证
              → 期望输出 zprintpro-gsc-data-2026-08-13-2026-08-20.csv
```

**详细行动包**: F:\zprintpro-nextjs\docs\k3-zerofriction-action-pack-2026-08-19.md (19088 bytes, 417 行)

---

## 4. D4 目录 7/10 提交 (20 min) — NAP 强化 (V3.4 问题 1 补强)

**目标**: 7 个 HK 主战场目录, NAP 统一模板

### 提交顺序 (per 行动包)

```
1. 88DB (4 min) → https://www.88db.com (HK 本地)
2. AsiaXPAT (5 min) → https://www.asiaxpat.com (外派人士)
3. HK Yellow Pages (7 min) → https://www.yp.com.hk (传统黄页)
4. Kompass HK (5 min) → https://hk.kompass.com (B2B 目录)
5. Google Maps HK (6 min) → https://business.google.com (本地 SEO)
6. HKTDC (7 min) → https://www.hktdc.com (贸发局)
7. Clutch (8 min) → https://clutch.co (B2B 评测)
```

### NAP 统一模板 (复制粘贴用)

| 字段 | 值 |
|------|----|
| 公司全称 | 深圳市彩龍印刷包裝有限公司 |
| Trading name (en) | ZprintPro |
| Trading name (zh-hk) | 智印港 |
| Address | No.1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen, Guangdong, China 518111 |
| Phone | +86 198 8085 1334 |
| Email | zprintpro@outlook.com |
| Website | https://zprintpro.com |
| Category | Printing / Packaging / Business Services |
| Founded | 2008 (per 8/19 about page 推断) |
| Description (en, ≤300 字符) | Custom printing manufacturer in Shenzhen, serving global SMBs since 2008. Specializing in stickers, flyers, packaging boxes, paper bags, and labels. Free design, 100 MOQ, DHL global 2-4 days delivery to 50+ countries. WhatsApp: +86 198 8085 1334. |
| Description (zh-hk, ≤300 字) | 深圳印刷廠 2008 年起服務全球中小企業, 專營貼紙、宣傳單張、包裝盒、紙袋、標籤。100 件起印, 免費設計, DHL 全球 2-4 天直送 50+ 國家。WhatsApp: +86 198 8085 1334。 |

**详细行动包**: F:\zprintpro-nextjs\docs\k3-zerofriction-action-pack-2026-08-19.md

---

## 5. Mavis 端到端验证 (push 后立即)

**脚本**: `F:\zprintpro-nextjs\scripts\verify_quote_insert.py` (9.4 KB)

**3 步**:
```
Step 1 (anon INSERT): 用 anon key 插测试行 → 期望 HTTP 201 + 落库 1 条
Step 2 (service_role SELECT): 用 service_role key 读回 → 期望找到 1 条, email 匹配
Step 3 (service_role DELETE): 用 service_role key 删测试行 → 清理
```

**判定**: 3/3 PASS = 008 度量层闭环 = 8/21 14:00 有真实询盘数据

**FAIL 升级 K3 路径**:
- Step 1 FAIL (42501 RLS) → 008 SQL policy 漏跑, K3 重跑
- Step 2 FAIL (RLS 阻止) → 用错 key, K3 确认 anon/service_role 不混
- Step 3 FAIL → 9.4 KB 脚本 bug, Mavis 修脚本

---

## 6. 时间线 (K3 21:12 启动后)

```
21:12  启动: 跑 008 SQL (5 min)
21:17  粘 env dev + prod (2 min)
21:19  通知 Mavis push
21:19  Mavis: commit + push + npm run build + verify_quote_insert.py 3/3 PASS
21:25  Mavis: 8/21 14:00 第一批真实询盘数据脚本 ready, 写报告 + 升级 K3
        并行: K3 启动 GSC OAuth 6 步 (20 min) + D4 目录 7/10 (20 min)
21:45  K3: GSC 8/8 PASS + D4 7/10 完成
22:00  Mavis: 升级 K3 8/20 收口报告 (008 闭环 + GSC 数据恢复 + D4 7/10 提交)
22:15  K3: 14:00 双周复盘前最后 review
```

---

## 7. Mavis 后台并行 (K3 47 min 期间, 不阻塞 K3)

| 任务 | 时间 | 状态 |
|------|------|------|
| D3 婚礼 zh-hk 1 篇草稿 (V3.6 §三 杠杆 1) | 30 min | 进行中 (14:00 K3 复盘拍板后 push) |
| V22 Direct API 试跑脚本 (等 ARK_API_KEY) | 10 min | ready (K3 拍板 ARK_API_KEY 即跑) |

---

## 8. ⚠️ 必读诚实风险声明 (-10 分)

008 度量层 V2 评分 90/100, 剩 -10 分来源:
1. **ga4_client_id 全 null**: 站没装 GA4, 用 CF Web Analytics, 跨 session 拉通只剩 sessionStorage UUID (关标签即失效)
2. **anon INSERT 全开放 spam 风险**: WITH CHECK (true), 无 honeypot / captcha, 跟 002 同水平 (可后续加)
3. **端到端未实证**: 本地 build PASS + URL 200 ≠ 功能 PASS, K3 跑 008 SQL + 粘 env + Mavis 跑 verify 才是真闭环

**应用范围**: 任何 zprintpro / aitoptools / togthr 跨项目 Supabase 关键 funnel endpoint
**配套机制**: §0.7 production smoke 3 步 (curl 200 + UUID + Supabase GET 落库)
