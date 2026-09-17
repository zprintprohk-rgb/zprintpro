-- ============================================================
-- 010: Lane O 归因字段 (K3 v10 outbound masterplan P0-3, 2026-09-17)
-- ============================================================
-- 目的:
--   1. quote_requests (008 询盘度量层) + tracking_events (009 事件层) 同步加 lead_source 车道字段
--   2. outbound 深链 UTM 完整落库 (utm_content = lead_id = 雷达台账行号)
--   3. 周报「分车道看询盘」 (v10 §六 KPI: Lane O 终局指标 = outbound 询盘数, 按 008 lead_source 拆分)
--
-- 深链标准 (v10 §三 Spec 1, 话术上线前强制, 无 UTM 不上线):
--   /{locale}/quote/?utm_source={reddit|linkedin|quora|email|wa}
--            &utm_medium=outreach&utm_campaign=lane-o-{品类}&utm_content={lead_id}
--   lead_id = 雷达台账行号 → 没有 lead_id 的触达 = 白做
--
-- lead_source 值域 (6 值):
--   reddit | linkedin | quora | email | wa | organic
--   解析规则 (src/lib/quote-tracking.ts resolveLeadSource):
--     - utm_source 命中 5 个 outbound 值 → 对应车道 (wa / whatsapp / whats-app → 'wa')
--     - 无 utm_source, 或 utm_source 非 outbound (如 google/cpc) → 'organic' (兜底车道;
--       细粒度仍完整保留在 utm_source 原值列, 不丢信息)
--
-- 为什么建在 008/009 两表:
--   008 = 询盘终局指标 (Lane O 的分母)
--   009 = 事件流水 → KPI「深链点击 (UTM)」领先指标 (点击了但没提交询盘也可见)
--
-- 幂等性: 全部 ADD COLUMN IF NOT EXISTS / DROP CONSTRAINT IF EXISTS → 可重复跑, 不报错
-- 向后兼容: 代码侧有容错降级 —— 若本 migration 尚未应用 (列不存在), insert 会自动
--           去掉新字段重试, 保证 008/009 度量层在迁移前后都能写入 (不破既有行为)
--
-- 配套代码:
--   - src/lib/quote-tracking.ts  (getAttribution + resolveLeadSource + insert 透传)
--   - src/lib/tracking.ts        (tracking_events 同步透传)
--   - src/app/api/quote/route.ts (RushCtaForm 服务端插入路径)
--   - src/components/services/RushCtaForm.tsx (UTM 上送)
--   - src/components/quote/QuoteForm.tsx (客户端 UTM 上送)
-- K3 真人执行脚本: docs/k3-010-verify-script-2026-09-17.md
-- ============================================================

-- ----------------------------------------------------------
-- 1. quote_requests (008) 加归因字段
-- ----------------------------------------------------------
ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS utm_content VARCHAR(100);  -- ?utm_content= (lead_id 原样)
ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS lead_id VARCHAR(100);      -- 雷达台账行号 (与 utm_content 同值, 便于直查)
ALTER TABLE quote_requests ADD COLUMN IF NOT EXISTS lead_source VARCHAR(20);   -- 车道: reddit|linkedin|quora|email|wa|organic

-- 值域约束 (幂等: 先 DROP 再 ADD, 避免重复跑报 constraint already exists)
ALTER TABLE quote_requests DROP CONSTRAINT IF EXISTS chk_quote_requests_lead_source;
ALTER TABLE quote_requests ADD CONSTRAINT chk_quote_requests_lead_source
  CHECK (lead_source IS NULL OR lead_source IN ('reddit', 'linkedin', 'quora', 'email', 'wa', 'organic'));

-- ----------------------------------------------------------
-- 2. tracking_events (009) 加同名字段 (两表口径一致, 事件层也能分车道)
-- ----------------------------------------------------------
ALTER TABLE tracking_events ADD COLUMN IF NOT EXISTS utm_content VARCHAR(100);
ALTER TABLE tracking_events ADD COLUMN IF NOT EXISTS lead_id VARCHAR(100);
ALTER TABLE tracking_events ADD COLUMN IF NOT EXISTS lead_source VARCHAR(20);

ALTER TABLE tracking_events DROP CONSTRAINT IF EXISTS chk_tracking_events_lead_source;
ALTER TABLE tracking_events ADD CONSTRAINT chk_tracking_events_lead_source
  CHECK (lead_source IS NULL OR lead_source IN ('reddit', 'linkedin', 'quora', 'email', 'wa', 'organic'));

-- ----------------------------------------------------------
-- 3. 索引 (Lane O 周复盘查询 + K3 dashboard)
-- ----------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_quote_requests_lead_source ON quote_requests(lead_source);
CREATE INDEX IF NOT EXISTS idx_quote_requests_lead_id ON quote_requests(lead_id) WHERE lead_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_tracking_events_lead_source ON tracking_events(lead_source);
CREATE INDEX IF NOT EXISTS idx_tracking_events_lead_id ON tracking_events(lead_id) WHERE lead_id IS NOT NULL;

-- ----------------------------------------------------------
-- 4. 历史数据回填 (幂等: 只填空值, 不覆盖已有)
--    规则与代码侧 resolveLeadSource 一致, 保证迁移前后口径统一
-- ----------------------------------------------------------
UPDATE quote_requests
SET lead_source = CASE
      WHEN utm_source IN ('reddit', 'linkedin', 'quora', 'email', 'wa') THEN utm_source
      WHEN utm_source IN ('whatsapp', 'whats-app') THEN 'wa'
      ELSE 'organic'
    END
WHERE lead_source IS NULL;

UPDATE tracking_events
SET lead_source = CASE
      WHEN utm_source IN ('reddit', 'linkedin', 'quora', 'email', 'wa') THEN utm_source
      WHEN utm_source IN ('whatsapp', 'whats-app') THEN 'wa'
      ELSE 'organic'
    END
WHERE lead_source IS NULL;

-- ----------------------------------------------------------
-- 5. 视图: Lane O 归因 (v10 §六 KPI 周复盘直接读)
-- ----------------------------------------------------------

-- 5.1 Lane O 车道归因 —— outbound 触达带来的询盘 + 赢单 (终局指标)
CREATE OR REPLACE VIEW v_lane_o_attribution AS
SELECT
  lead_source,
  locale,
  source                       AS touchpoint,      -- quote-form / whatsapp-cta / pdp-cta ...
  COUNT(*)                     AS inquiry_count,
  COUNT(DISTINCT lead_id)      AS distinct_leads,
  COUNT(*) FILTER (WHERE status = 'closed_won')  AS won_count,
  ROUND(100.0 * COUNT(*) FILTER (WHERE status = 'closed_won') / NULLIF(COUNT(*), 0), 2) AS win_rate_pct,
  MIN(created_at)              AS first_inquiry_at,
  MAX(created_at)              AS last_inquiry_at
FROM quote_requests
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY lead_source, locale, source
ORDER BY inquiry_count DESC;

-- 5.2 lead_id 级明细 —— 逐条触达台账对账 (哪个 lead_id 真带来询盘/成交)
CREATE OR REPLACE VIEW v_lead_id_conversion AS
SELECT
  lead_id,
  lead_source,
  utm_campaign,
  COUNT(*)                    AS inquiry_count,
  COUNT(*) FILTER (WHERE status = 'closed_won') AS won_count,
  MIN(created_at)             AS first_seen_at,
  MAX(created_at)             AS last_seen_at,
  ARRAY_AGG(DISTINCT locale)  AS locales
FROM quote_requests
WHERE lead_id IS NOT NULL
  AND created_at >= NOW() - INTERVAL '90 days'
GROUP BY lead_id, lead_source, utm_campaign
ORDER BY inquiry_count DESC;

-- 5.3 深链点击 (KPI 领先指标) —— 事件层 UTM 点击, 含未提交询盘的点击
CREATE OR REPLACE VIEW v_lane_o_deeplink_clicks AS
SELECT
  lead_source,
  lead_id,
  utm_campaign,
  locale,
  COUNT(*)                    AS click_events,
  COUNT(DISTINCT session_id)  AS distinct_sessions,
  MIN(created_at)             AS first_click_at,
  MAX(created_at)             AS last_click_at
FROM tracking_events
WHERE lead_source IS NOT NULL
  AND lead_source <> 'organic'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY lead_source, lead_id, utm_campaign, locale
ORDER BY click_events DESC;

-- ----------------------------------------------------------
-- 6. 安全网 (per 007/008 §5): 重新扫 public schema 任何遗漏的表
-- ----------------------------------------------------------
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
      AND NOT rowsecurity
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', r.tablename);
    RAISE NOTICE 'SAFETY NET: RLS force-enabled on public.% (was missing)', r.tablename;
  END LOOP;
END $$;

-- ----------------------------------------------------------
-- 7. 验证输出 (K3 跑完看这里: 期望 4 个 OK)
-- ----------------------------------------------------------
DO $$
DECLARE
  q_cols INT;
  t_cols INT;
  missing INT;
BEGIN
  SELECT COUNT(*) INTO q_cols FROM information_schema.columns
  WHERE table_name = 'quote_requests'
    AND column_name IN ('utm_content', 'lead_id', 'lead_source');
  SELECT COUNT(*) INTO t_cols FROM information_schema.columns
  WHERE table_name = 'tracking_events'
    AND column_name IN ('utm_content', 'lead_id', 'lead_source');

  IF q_cols = 3 THEN
    RAISE NOTICE 'OK: quote_requests 3 列就位 (utm_content / lead_id / lead_source)';
  ELSE
    RAISE WARNING 'quote_requests 只就位 % / 3 列, 请检查!', q_cols;
  END IF;

  IF t_cols = 3 THEN
    RAISE NOTICE 'OK: tracking_events 3 列就位 (utm_content / lead_id / lead_source)';
  ELSE
    RAISE WARNING 'tracking_events 只就位 % / 3 列, 请检查!', t_cols;
  END IF;

  SELECT COUNT(*) INTO missing FROM pg_tables
  WHERE schemaname = 'public' AND NOT rowsecurity;
  IF missing > 0 THEN
    RAISE WARNING '仍有 % 张表未启用 RLS, 请检查!', missing;
  ELSE
    RAISE NOTICE 'OK: public schema 全部表已启用 RLS';
  END IF;

  RAISE NOTICE 'OK: 010 视图 = v_lane_o_attribution / v_lead_id_conversion / v_lane_o_deeplink_clicks';
END $$;
