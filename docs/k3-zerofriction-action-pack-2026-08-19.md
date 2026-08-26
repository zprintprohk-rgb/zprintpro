# K3 零摩擦 L1 行动包 · 2026-08-19 晚

> **目的**: 解除 v3.4 战略 §一 P0 三真问题中 2 个 (测量失明 + Supabase Critical 告警) + D4 目录首波 7 条。
> **总时长**: 20 min (8/19 晚一次性执行)
> **执行人**: K3 (本地桌面浏览器) — Mavis 不可代操作任何带凭证/对外身份步骤。
> **依赖前置**: 1 个 Chrome 窗口 (登录态) + 10 min 集中注意力。
> **失败回退**: 任一 Step 失败 5 min 内未解决 → 暂停, 升级 Mavis, 不要硬撑。

---

## ⚠ 启动前必做: PowerShell 编码兜底 (30 sec)

**所有 PowerShell 窗口第一行跑** (粘到 console 顶部一次, 后续命令都受益):

```powershell
chcp 65001 > $null
$env:PYTHONIOENCODING = 'utf-8'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```

**为什么**: PS 5.1 默认 GBK, 直接跑 `python scripts/verify_gsc_auth.py` 会 `UnicodeEncodeError: 'gbk' codec can't encode character '\u2705'` 崩溃 (2026-08-19 Mavis pre-test 已踩)。Mavis 已在 `verify_gsc_auth.py` 加 `sys.stdout.reconfigure(encoding="utf-8")` 兜底, 但 chcp 仍要设 (PS 自己的 console)。

**当前 GSC 状态 (Mavis 8/19 20:32 实测)**:
- ✅ [1] Python google-api-python-client OK
- ✅ [2] .env 存在
- ✅ [3] GSC_ACCOUNT_EMAIL 已设置
- ✅ [4] GSC_KEY_FILE 2424 bytes, JSON 完整
- ✅ [5] GSC_SITE_URL 已设置
- ⏸ **[6] GSC property URL prefix verification** (需 GSC Console 验证)
- ⏸ **[7] Service account GSC access** (需 Search Console → Users → Add user)
- ✅ [8] key 文件不在 git tree (安全)

**Step 1.1 (加 service account 到 GSC Users) 完成后, [6][7] 会变 ✅, 8/8 全 PASS**。

---

## ⏱ 20 min 分配

| min | 任务 | 难度 | 风险 |
|-----|------|------|------|
| 0-15 | GSC API 修复 (根因排查 + 加 service account 到 4 property) | ★★☆ | 8/26 验收前必修 |
| 15-17 | Supabase migration 007 SQL 粘贴执行 | ★☆☆ | 消除 Critical 告警 |
| 17-20 | D4 目录首波 7 条提交 (5-6 条 + 1-2 条预热) | ★★☆ | 启动 NAP 站外一致性扩散 |

---

## 任务 1: GSC API 修复 (15 min) — P0

### 现状审计 (本机已 ready 部分)

```
✅ .env:  GSC_ACCOUNT_EMAIL=zprintpro-gsc-reader@project-11bc79ef-5c9f-4c89-be1.iam.gserviceaccount.com
✅ .env:  GSC_SITE_URL=sc-domain:zprintpro.com
✅ JSON key:  C:\Users\Administrator\gsc-key.json (2424 B, 已含 private_key)
❌ API 401:  8/12-8/19 持续 8 天
```

**根因 3 选 1** (按概率从高到低):
- **(α) service account 未加到 GSC User list** (60% 概率, 最常见)
- (β) GSC_SITE_URL = `sc-domain:zprintpro.com` 但 API 调用时传 `https://zprintpro.com/` (格式错配, 25%)
- (γ) private_key 文件被 PS 5.1 写入时加了 BOM 或 LF 错误 (15%)

### Step 1.1 (3 min) — GSC 加 service account User

1. 打开 https://search.google.com/search-console
2. 右上角齿轮 ⚙️ → **Users and permissions**
3. 看到当前 user 列表 → **Add user**
4. Email 粘贴: `zprintpro-gsc-reader@project-11bc79ef-5c9f-4c89-be1.iam.gserviceaccount.com`
   (这是 .env GSC_ACCOUNT_EMAIL 的真值, 复制粘贴不要手打)
5. Permission: 选 **Owner** (Full 也行, 但 Owner 最稳)
6. **Add**
7. **重复 Step 1.1.1-1.1.6** 切换到 4 个 property, 每个都加:
   - 主域 (https://zprintpro.com/)
   - zh-hk (https://zprintpro.com/zh-hk/)
   - en (https://zprintpro.com/en/)
   - ja (https://zprintpro.com/ja/)

**预期结果**: 4 个 property 的 User 列表都显示这个 service account email。

### Step 1.2 (2 min) — 验证 private_key 文件未损坏

打开 PowerShell, 跑:

```powershell
Test-Path 'C:\Users\Administrator\gsc-key.json' -PathType Leaf
$b = Get-Content 'C:\Users\Administrator\gsc-key.json' -Raw -Encoding UTF8
Write-Host "Size: $($b.Length) bytes"
Write-Host "First key: $(if ($b -match '"private_key":\s*"-----BEGIN') {'OK BEGIN found'} else {'❌ private_key format wrong'})"
Write-Host "Last 50: $($b.Substring([Math]::Max(0, $b.Length-50)))"
```

**预期结果**:
- Size: 2424 bytes
- "First key: OK BEGIN found"
- 末 50 字符包含 `"token_uri": "https://oauth2.googleapis.com/token"` 或 `}` 收尾

**如果 ❌**: JSON key 被损坏 → 重新从 GCP project 下载 (见 Step 1.4 备选方案)

### Step 1.3 (5 min) — 跑 verify_gsc_auth.py 验证

```powershell
cd F:\zprintpro-nextjs
python scripts/verify_gsc_auth.py
```

**预期 8/8 PASS**:
- ✅ .env exists
- ✅ GSC_ACCOUNT_EMAIL set
- ✅ GSC_KEY_FILE set
- ✅ GSC_SITE_URL set
- ✅ Key file exists
- ✅ Key file JSON valid
- ✅ Key file has type=service_account
- ✅ Key file has private_key

**如果某项 FAIL**:
- FAIL "Key file JSON valid" → key 损坏, 执行 Step 1.4
- FAIL "Key file has private_key" → private_key 字段缺失, 执行 Step 1.4

### Step 1.4 (5 min, 仅当 Step 1.3 FAIL 时) — 重建 service account + key

如果 .env 配的 service account 跟 GCP project 对不上, 或 key 文件损坏, 需要重建:

1. 打开 https://console.cloud.google.com/
2. 选 project: `project-11bc79ef-5c9f-4c89-be1` (跟 .env GSC_ACCOUNT_EMAIL 的 project 部分一致)
3. 左侧菜单 → **IAM & Admin** → **Service Accounts**
4. 找 `zprintpro-gsc-reader` 这个 service account → 点进
5. **Keys** tab → **Add Key** → **Create new key** → **JSON**
6. 下载文件 → 重命名 `gsc-key.json` → 替换 `C:\Users\Administrator\gsc-key.json`
7. 重新跑 Step 1.3 验证

**如果还是 401**: 跳到 Step 1.5 备选 (用 OAuth 走 user flow)

### Step 1.5 (5 min, 备选) — 改走 OAuth user flow

如果 service account 配 30 min 还 401, 改用 OAuth user flow (per `gsc_data.csv` 已用):

1. 打开 https://console.cloud.google.com/
2. 选同一 project → **APIs & Services** → **OAuth consent screen** → 选 **External** → 填 app name
3. **Credentials** → **Create Credentials** → **OAuth client ID** → **Desktop app**
4. 下载 credentials JSON → 重命名 `gsc-oauth-credentials.json` → 放 `C:\Users\Administrator\`
5. 跑一次性 auth 脚本: `python scripts/fetch_gsc_data.py --oauth-setup` (会弹浏览器, K3 登录授权)
6. token 存到 `C:\Users\Administrator\gsc-token.json`

**风险**: OAuth token 7 天过期, 需每月 1 次手动 refresh (cron 自动用不行, 但 K3 每周三手动 OK)

### Step 1.6 (1 min) — 真 verify 拉一次数据

```powershell
cd F:\zprintpro-nextjs
python scripts/fetch_gsc_data.py --days 7 --dry-run
```

**预期输出**: `Fetched ~80-200 rows for 7d window. (dry-run, no write)`

**如果成功**: GSC API 修复完成, v3.4 §一 P0 测量失明问题解除, 8/26 验收节点数据闭环 ready。

**如果失败**: 升级 Mavis (贴完整 error), 不要再花时间硬调 — 治标 proxy fallback 方案 (v3.4 §一备选 b) 留作明早 L2 决策。

---

## 任务 2: Supabase migration 007 (2 min) — P0

### 目标

执行 `007_fix_rls_security.sql` 修复 5 张表的 RLS 缺失, 消除 Supabase Security Advisor "Critical: rls_disabled_in_public" 告警。

### Step 2.1 (30 sec) — 打开 Supabase SQL Editor

1. 打开 https://supabase.com/dashboard
2. 用 zprintpro 项目的 owner 账号登录
3. 选 zprintpro 对应 project → 进入
4. 左侧菜单 → **SQL Editor** (数据库图标)
5. 右上角 → **+ New query** (绿色按钮)

### Step 2.2 (30 sec) — 粘贴 SQL 全文

复制下面 SQL 块 (整段, 包含开头 `-- ===...` 注释) → 粘贴到 SQL Editor:

```sql
-- ============================================================
-- 007 紧急安全修复: Supabase Security Advisor "rls_disabled_in_public"
-- 2026-08-19 (Critical 告警修复)
-- ============================================================
-- 背景: Supabase 安全扫描发现 public schema 存在未启用 RLS 的表,
-- 任何拿到 project URL + anon key 的人都可以读/改/删数据。
--
-- 审计结论 (2026-08-19):
--   以下 5 张表在迁移 003/004/005 中创建时未启用 RLS:
--     - quote_calculations  (003, 生产可能不存在,幂等兜底)
--     - print_materials     (004, 含 sheet_cost_hkd 成本价 — 商业敏感)
--     - print_finishings    (004, 含 base_cost / per_sheet_cost — 商业敏感)
--     - print_markets       (005, 含 target_margin / exchange_rate — 定价机密)
--     - print_fx_rates      (005, 汇率历史)
--
--   前端代码 (src/) 经全量 grep 确认: 无任何代码通过 anon key
--   直连上述表 (报价引擎用硬编码数据,API 路由用 service role)。
--   因此最安全的策略 = 启用 RLS 且【不创建任何公开 policy】,
--   仅 service role (服务端 API 路由) 可访问。
--
--   附带修复: cart_items "Allow anonymous cart" 政策原为
--   FOR ALL TO anon USING (session_id IS NOT NULL) — 匿名用户可
--   SELECT/UPDATE/DELETE 全表所有带 session_id 的行,属于越权漏洞。
--   收紧为: 匿名仅可 INSERT,SELECT/UPDATE/DELETE 仅本人 (authenticated)。
-- ============================================================

-- ----------------------------------------------------------
-- 1. 为 5 张表启用 RLS (幂等, 表不存在则跳过)
-- ----------------------------------------------------------
DO $$
DECLARE
  t TEXT;
  tables_to_fix TEXT[] := ARRAY[
    'quote_calculations',
    'print_materials',
    'print_finishings',
    'print_markets',
    'print_fx_rates'
  ];
BEGIN
  FOREACH t IN ARRAY tables_to_fix LOOP
    IF EXISTS (
      SELECT 1 FROM pg_tables
      WHERE schemaname = 'public' AND tablename = t
    ) THEN
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
      RAISE NOTICE 'RLS enabled on public.%', t;
    ELSE
      RAISE NOTICE 'Table public.% does not exist, skipped', t;
    END IF;
  END LOOP;
END $$;

-- ----------------------------------------------------------
-- 2. 不给上述表创建任何 anon/authenticated policy
--    → 启用 RLS + 无 policy = 默认拒绝一切公开访问
--    → service role 绕过 RLS, 服务端 API 不受影响
--    如未来前端确需读材质目录, 应新建仅暴露非成本字段的
--    安全视图 (SECURITY DEFINER view), 而不是开表级 SELECT。
-- ----------------------------------------------------------

-- ----------------------------------------------------------
-- 3. 修复 cart_items 越权政策 (FOR ALL anon → INSERT only)
-- ----------------------------------------------------------
DROP POLICY IF EXISTS "Allow anonymous cart" ON cart_items;

CREATE POLICY "Allow anonymous cart insert" ON cart_items
  FOR INSERT TO anon
  WITH CHECK (session_id IS NOT NULL);

-- 注册用户只能操作自己的购物车 (原 "Allow user cart" 已存在则跳过)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'cart_items'
      AND policyname = 'Allow user cart'
  ) THEN
    CREATE POLICY "Allow user cart" ON cart_items
      FOR ALL TO authenticated
      USING (user_id = auth.uid());
  END IF;
END $$;

-- ----------------------------------------------------------
-- 4. 收紧 quotes 匿名 INSERT: 保留 (询盘表单需要),
--    但显式确认匿名【不可】SELECT/UPDATE/DELETE
--    (001 的 "Allow user select own" 已是 USING(false), 无需改动)
-- ----------------------------------------------------------

-- ----------------------------------------------------------
-- 5. 安全网: 扫描 public schema 所有表, 任何遗漏的表一律补开 RLS
--    (防止未来手动在 Dashboard 建表忘记开 RLS 同类事故)
--    注意: 只 ENABLE, 不自动建 policy —— 启用后默认拒绝,
--    需要访问的表必须显式迁移文件加 policy, 把安全决策留在代码评审。
-- ----------------------------------------------------------
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
      AND NOT rowsecurity  -- 未启用 RLS
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', r.tablename);
    RAISE NOTICE 'SAFETY NET: RLS force-enabled on public.% (was missing)', r.tablename;
  END LOOP;
END $$;

-- ----------------------------------------------------------
-- 6. 验证输出: 列出 public schema 仍无 RLS 的表 (应为空)
-- ----------------------------------------------------------
DO $$
DECLARE
  missing INT;
BEGIN
  SELECT COUNT(*) INTO missing FROM pg_tables
  WHERE schemaname = 'public' AND NOT rowsecurity;
  IF missing > 0 THEN
    RAISE WARNING '仍有 % 张表未启用 RLS, 请检查!', missing;
  ELSE
    RAISE NOTICE 'OK: public schema 全部表已启用 RLS';
  END IF;
END $$;
```

### Step 2.3 (1 min) — Run + 看输出

1. SQL Editor 右上角 → **Run** (▶) 按钮 (或 Ctrl+Enter)
2. 预期底部 **Results** 面板输出:
   ```
   NOTICE: RLS enabled on public.quote_calculations
   NOTICE: RLS enabled on public.print_materials
   NOTICE: RLS enabled on public.print_finishings
   NOTICE: RLS enabled on public.print_markets
   NOTICE: RLS enabled on public.print_fx_rates
   NOTICE: SAFETY NET: RLS force-enabled on public.X
   NOTICE: OK: public schema 全部表已启用 RLS
   ```
3. **如果看到 `WARNING: 仍有 N 张表未启用 RLS`**: 截图发给 Mavis, 立刻修复

### Step 2.4 (30 sec) — Supabase Security Advisor 验证

1. 左侧菜单 → **Database** → **Advisors** (或 **Security** 标签)
2. 找 `rls_disabled_in_public` 告警
3. 预期: **0 critical alerts** (或告警已消失, 1-2 分钟内同步)
4. 如果还有告警: 刷新页面, 等 5 min 同步, 还存在 → 升级 Mavis

---

## 任务 3: D4 目录首波 7/10 提交 (20 min) — P1

### 目标

启动 NAP 站外一致性扩散 (v3.4 §一 P0 NAP 修复的延伸)。7/10 提交 = 1 push 节省 (3 条推明早 L2 决策窗)。

### 候选 10 条 zh-hk 主战场 (从 `docs/backlink-strategy-2026-07-01.md`)

| # | 平台 | URL | 类型 | 优先级 | 5-7 min/条 |
|---|------|-----|------|--------|-----------|
| 1 | **HK Yellow Pages** | yp.com.hk | 综合目录 | ⭐⭐⭐ 必提交 | 7 min |
| 2 | **Kompass HK** | hk.kompass.com | B2B 目录 | ⭐⭐⭐ 必提交 | 5 min |
| 3 | **HKTDC** | hktdc.com | 贸易目录 | ⭐⭐⭐ 必提交 | 7 min |
| 4 | **AsiaXPAT** | hk.asiaxpat.com | 商业目录 | ⭐⭐ 推 | 5 min |
| 5 | **88DB** | 88db.com.hk | 分类目录 | ⭐⭐ 推 | 4 min |
| 6 | **Google Maps HK** | maps.google.com | 地图 | ⭐⭐⭐ 必提交 | 6 min |
| 7 | **Clutch** | clutch.co | B2B 评价 | ⭐⭐⭐ 必提交 | 8 min |
| 8 | **ThomasNet** | thomasnet.com | 工业目录 | ⭐ 推荐 | 6 min |
| 9 | **Crunchbase** | crunchbase.com | 公司数据库 | ⭐ 推荐 | 5 min |
| 10 | **Manta** | manta.com | 小企业目录 | ⭐⭐ 推 | 5 min |

**今晚最小集 7 条**: 1+2+3+4+5+6+7 (HK 5 条 + Google Maps + Clutch, 主战场 + 国际背书)
**明早 L2 决策 3 条**: 8+9+10 (en 主市场, 跟 zh-hk 战略弱相关)

### NAP 标准填写模板 (每条都用这一份)

**公司全称** (NAP 法律名): `深圳市彩龙印刷包装有限公司`
**Trading name / Display name**: `ZprintPro` (en) / `智印港` (zh-hk)
**Address** (per K3 8/7 拍板 + 8/19 NAP Shenzhen-ification): `No.1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen, Guangdong, China 518111`
**Phone** (2026-08-07 K3 拍板 phase-out, 统一): `+86 198 8085 1334`
**Email**: `zprintpro@outlook.com`
**Website**: `https://zprintpro.com` (en) / `https://zprintpro.com/zh-hk` (zh-hk)
**Business category** (按平台选): `Printing Services` / `Commercial Printing` / `Packaging & Labels`
**Founded**: `2012`
**Description (en, ≤300 字符)**:
```
ZprintPro (智印港) is a Shenzhen-based ISO 9001 + FSC certified printing manufacturer shipping to 50+ countries. Services include custom stickers, packaging boxes, paper bags, flyers, posters, labels. 30-second AI quote, free design proof in 4h, DHL 2-4 day worldwide delivery.
```

### Step 3.1 (5 min) — 准备工作

1. 打开浏览器, 准备 7 个 tab (每个平台一个)
2. 把上面 NAP 模板复制到剪贴板 (1 次, 7 处粘贴)
3. 准备 1 张图: 公司 logo (用现有 `public/images/gsc-logo.png`, 没新素材就用这个)

### Step 3.2 (15 min) — 7 条提交

每条用 5-7 min, 流程:
1. 注册 / 登录 (1 min, 用 zprintpro@outlook.com + 强密码)
2. 找 "Add business" / "Claim listing" / "Get listed" 按钮 (1 min)
3. 粘贴 NAP (1 min)
4. 选类目 → Printing Services / Commercial Printing (1 min)
5. 上传 logo + 1-2 张 showcase 图 (1-2 min)
6. 提交 (1 min)

**7 条顺序建议** (从最简单的开始, 建立 momentum):
1. 88DB (中文界面, 最简单, 4 min) ✓
2. AsiaXPAT (中文, 5 min) ✓
3. HK Yellow Pages (中文, 7 min, 有电话验证) ✓
4. Kompass HK (英文, 5 min) ✓
5. Google Maps HK (英文, 6 min, 需邮编验证) ✓
6. HKTDC (英文, 7 min, 需 email verify) ✓
7. Clutch (英文, 8 min, 需 review 数 0 但可填) ✓

### Step 3.3 (5 min) — 截图存档 + 报告

7 条提交完, 打开 `docs/k3-d4-directory-submission-2026-08-19.md` (本批留个 audit trail):

```markdown
# D4 目录首波提交 2026-08-19

| # | 平台 | URL | 提交时间 | 状态 | Listing URL |
|---|------|-----|---------|------|------------|
| 1 | 88DB | 88db.com.hk | 20:30 | 已提交 | https://... |
| 2 | AsiaXPAT | hk.asiaxpat.com | 20:35 | 已提交 | https://... |
...
```

每条截图保存到 `docs/d4-screenshots/2026-08-19/`, 命名 `01-88db.png` 等 (可选, 不强制)。

---

## 任务 4 (可选, +5 min) — §0.20 cron 1h minimum 审批

v3.4 战略 §一 P0 §0.20 MEMORY 规则已写好, 等桌面端弹出 "Approve memory edit?" 卡片时, K3 批 "Approve" 即可。**5 秒动作, 不算 5 min, 顺路批**。

跨项目生效: zprintpro / togthr / aitoptools / stock-lab。

---

## 完成后报告模板 (贴给 Mavis)

```
20 min L1 行动包完成:
- GSC API: ✅ verify_gsc_auth.py 8/8 PASS, fetch 7d 拉了 X 行 (修通 → 8/26 验收 ready)
- migration 007: ✅ Supabase Advisors 0 critical, 5 张表 RLS ON
- D4 目录: 7/10 提交 [列具体 7 条 + 各自 listing URL]
```

---

## 风险与回退

| 风险 | 触发条件 | 回退 |
|------|---------|------|
| GSC Step 1.3 FAIL, Step 1.4 重建后仍 FAIL | 持续 30 min | 暂停 GSC, 走 v3.4 §一备选 b (proxy fallback 修复), 推到明早 L2 决策 |
| Supabase migration 007 跑出 WARNING | 有表未 RLS 化 | 截图给 Mavis, 立刻补 ALTER |
| D4 任一平台注册需 实名 / 信用卡 / 额外审核 | 任意条 ≥10 min 阻塞 | 跳过该条, 推明早 L2 决策 |
| 任意任务超时 | 单任务 > 8 min | 暂停, 报告 Mavis |

---

## 不在本行动包范围 (留 Mavis / 后续)

- ✅ NAP 修复 (8/19 12:13 推 d0657c0, 已上线) — 完成
- ⏸ about 页 P0-B 4 件 (真人头像/证书/logo/口述) — 等 K3 素材
- ⏸ 婚礼 batch 1.5 v3 (12 SKU 27 prompts) — K3 手动跑 console
- ⏸ 8/20 9:00 三 agent 试运行 cron — 已设置, 不用 K3 操作
- ⏸ 8/21 双周复盘 — M3 主导 + K3 1h 拍板 (推后)

---

*Mavis / K3 行动包 · 2026-08-19 20:25 · 本地落盘, 不 push (今日 5/5 满)*
