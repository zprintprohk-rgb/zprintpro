-- ============================================================
-- 009: 轻量级事件追踪表 (K3 8/29 拍板 B 方案)
-- ============================================================
-- 目的:
--   装 9 个事件 (page-view / cta-click / category-view / product-view /
--                quote-submit / quote-submit-success / quote-submit-error /
--                whatsapp-click / phone-click)
--
-- 跟 008 quote_requests 的关系:
--   - 008 quote_requests = 业务跟单 (PII + 状态机 new→contacted→quoted→closed_won)
--   - 009 tracking_events = 观察 + 转化漏斗 (0 PII, 高容量, 可定期清表)
--   - 同一事件可两边都写 (例: quote-submit-success 走 008 跟单 + 走 009 漏斗)
--
-- 设计原则:
--   - 0 PII (no customer_name/email/phone/message)
--   - sendBeacon 友好 (小 payload, 字段精简, 单行 INSERT)
--   - 高容量索引 (按 event_type + locale + day)
--   - RLS: anon INSERT (前端), authenticated SELECT (K3 dashboard)
--
-- 配套:
--   - src/lib/tracking.ts (前端 sendBeacon + fetch 兜底)
--   - 5-8 组件挂点 (layout / category / product / QuoteForm / whatsapp / Header / Footer / Hero)
-- ============================================================

-- ----------------------------------------------------------
-- 1. 创建 tracking_events 表
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS tracking_events (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- === 事件类型 (9 选 1, NOT NULL 强制) ===
  event_type VARCHAR(50) NOT NULL,
  -- 'page-view' | 'cta-click' | 'category-view' | 'product-view' |
  -- 'quote-submit' | 'quote-submit-success' | 'quote-submit-error' |
  -- 'whatsapp-click' | 'phone-click'

  -- === 上下文 (auto-filled, NOT NULL 强制) ===
  locale VARCHAR(10) NOT NULL,                -- zh-hk / en / ja
  page_url TEXT NOT NULL,                     -- window.location.href
  session_id VARCHAR(100) NOT NULL,           -- sessionStorage UUID

  -- === 上下文 (nullable) ===
  referrer TEXT,                              -- document.referrer
  ga4_client_id VARCHAR(50),                  -- _ga cookie 解析 (V3.6 拉通全链路)

  -- === 业务上下文 (no PII) ===
  product_slug VARCHAR(100),
  product_name VARCHAR(255),
  category VARCHAR(100),                      -- 主营品类 5: 貼紙/宣傳單張/包裝盒/紙袋/標籤
  label VARCHAR(255),                         -- CTA text / error type / 报价 ref 等

  -- === UTM 归因 ===
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),

  -- === 系统字段 ===
  user_agent TEXT,
  device_type VARCHAR(20)                     -- 'desktop' | 'mobile' | 'tablet'
);

-- ----------------------------------------------------------
-- 2. 索引 (高容量查询优化)
-- ----------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_tracking_events_created_at ON tracking_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tracking_events_event_type ON tracking_events(event_type);
CREATE INDEX IF NOT EXISTS idx_tracking_events_locale_event ON tracking_events(locale, event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tracking_events_session_id ON tracking_events(session_id);
CREATE INDEX IF NOT EXISTS idx_tracking_events_product_slug ON tracking_events(product_slug) WHERE product_slug IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_tracking_events_ga4 ON tracking_events(ga4_client_id) WHERE ga4_client_id IS NOT NULL;

-- ----------------------------------------------------------
-- 3. RLS (per 002/008 模式: anon INSERT, authenticated SELECT)
-- ----------------------------------------------------------
ALTER TABLE public.tracking_events ENABLE ROW LEVEL SECURITY;

-- 允许匿名用户 INSERT (前端 sendBeacon 调用)
CREATE POLICY "Allow anonymous insert" ON tracking_events
  FOR INSERT TO anon
  WITH CHECK (true);

-- 允许 authenticated SELECT (K3 dashboard / Mavis 周报读数据)
CREATE POLICY "Allow authenticated select" ON tracking_events
  FOR SELECT TO authenticated
  USING (true);

-- 允许 authenticated DELETE (定期清理 page-view / cta-click 高容量数据, 保留 quote 事件)
-- 注意: 默认不允许 anon UPDATE/DELETE (跟 002/008 一致)
CREATE POLICY "Allow authenticated delete" ON tracking_events
  FOR DELETE TO authenticated
  USING (true);

-- ----------------------------------------------------------
-- 4. 视图 (K3 dashboard 常用聚合, 不暴露底层表)
-- ----------------------------------------------------------

-- 4.1 事件漏斗 (按 locale + event_type + day)
CREATE OR REPLACE VIEW v_event_funnel AS
SELECT
  locale,
  event_type,
  DATE_TRUNC('day', created_at) AS day,
  COUNT(*) AS event_count,
  COUNT(DISTINCT session_id) AS unique_sessions
FROM tracking_events
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY locale, event_type, DATE_TRUNC('day', created_at)
ORDER BY day DESC, event_count DESC;

-- 4.2 转化漏斗 (关键 9 events × locale × day)
CREATE OR REPLACE VIEW v_conversion_funnel AS
SELECT
  locale,
  DATE_TRUNC('day', created_at) AS day,
  COUNT(*) FILTER (WHERE event_type = 'page-view') AS page_views,
  COUNT(*) FILTER (WHERE event_type = 'category-view') AS category_views,
  COUNT(*) FILTER (WHERE event_type = 'product-view') AS product_views,
  COUNT(*) FILTER (WHERE event_type = 'cta-click') AS cta_clicks,
  COUNT(*) FILTER (WHERE event_type = 'whatsapp-click') AS whatsapp_clicks,
  COUNT(*) FILTER (WHERE event_type = 'phone-click') AS phone_clicks,
  COUNT(*) FILTER (WHERE event_type = 'quote-submit') AS quote_submits,
  COUNT(*) FILTER (WHERE event_type = 'quote-submit-success') AS quote_submit_success,
  COUNT(*) FILTER (WHERE event_type = 'quote-submit-error') AS quote_submit_errors,
  -- 转化率 (K3 dashboard 必看)
  ROUND(100.0 * COUNT(*) FILTER (WHERE event_type = 'quote-submit-success')
    / NULLIF(COUNT(*) FILTER (WHERE event_type = 'page-view'), 0), 4) AS pageview_to_submit_rate,
  ROUND(100.0 * COUNT(*) FILTER (WHERE event_type = 'quote-submit-success')
    / NULLIF(COUNT(*) FILTER (WHERE event_type = 'product-view'), 0), 4) AS productview_to_submit_rate,
  ROUND(100.0 * COUNT(*) FILTER (WHERE event_type = 'quote-submit-success')
    / NULLIF(COUNT(*) FILTER (WHERE event_type = 'whatsapp-click') + COUNT(*) FILTER (WHERE event_type = 'phone-click'), 0), 4) AS contact_to_submit_rate
FROM tracking_events
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY locale, DATE_TRUNC('day', created_at)
ORDER BY day DESC;

-- 4.3 客户跨 session 全链路 (V3.6 拉通 ga4_client_id, 跟 008 v_customer_journey 同思路)
CREATE OR REPLACE VIEW v_customer_event_journey AS
SELECT
  ga4_client_id,
  COUNT(*) AS total_events,
  COUNT(DISTINCT event_type) AS event_type_count,
  COUNT(DISTINCT DATE_TRUNC('day', created_at)) AS active_days,
  MIN(created_at) AS first_event_at,
  MAX(created_at) AS last_event_at,
  ARRAY_AGG(DISTINCT event_type) AS event_types,
  -- 修 42P10: ARRAY_AGG(DISTINCT x ORDER BY y) 在 PG 非法 (DISTINCT 去重按 x, ORDER BY 按 y 冲突)
  -- 改用子查询: 先按时间序聚合 page-view 路径, 再 DISTINCT
  ARRAY(
    SELECT DISTINCT page_url FROM tracking_events t2
    WHERE t2.ga4_client_id = tracking_events.ga4_client_id
      AND t2.event_type = 'page-view'
    ORDER BY page_url
  ) AS page_view_paths
FROM tracking_events
WHERE ga4_client_id IS NOT NULL
GROUP BY ga4_client_id
HAVING COUNT(*) > 1
ORDER BY total_events DESC;

-- ----------------------------------------------------------
-- 5. 安全网 (per 007 §5): 重新扫 public schema 任何遗漏的表
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
-- 6. 验证输出
-- ----------------------------------------------------------
DO $$
DECLARE
  missing INT;
  policy_count INT;
BEGIN
  SELECT COUNT(*) INTO missing FROM pg_tables
  WHERE schemaname = 'public' AND NOT rowsecurity;
  IF missing > 0 THEN
    RAISE WARNING '仍有 % 张表未启用 RLS, 请检查!', missing;
  ELSE
    RAISE NOTICE 'OK: public schema 全部表已启用 RLS (含 009 tracking_events)';
  END IF;

  SELECT COUNT(*) INTO policy_count FROM pg_policies
  WHERE schemaname = 'public' AND tablename = 'tracking_events';
  RAISE NOTICE '009 tracking_events policy 数: % (期望 3: anon insert + auth select + auth delete)', policy_count;

  RAISE NOTICE '009 tracking_events 视图: v_event_funnel / v_conversion_funnel / v_customer_event_journey';
END $$;
