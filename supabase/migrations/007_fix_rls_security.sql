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
