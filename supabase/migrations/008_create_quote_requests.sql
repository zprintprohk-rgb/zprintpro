-- ============================================================
-- 008: 询盘度量层 (V3.6 战略 8/20 拍板, K3 ranking→CTR→conversion 闭环)
-- ============================================================
-- 目的:
--   1. 跨页跨渠道统一度量"询盘"事件 (quote form 提交 / WhatsApp click / PDP CTA / footer)
--   2. 跨 session 关联同一客户 (ga4_client_id cookie 拉通)
--   3. UTM / referrer / landing_page 全字段归因
--   4. 状态机跟单 (new → contacted → quoted → closed_won/lost)
--
-- 双写架构:
--   - QuoteForm 提交 → 写 `quotes` 业务表 (001) + 写 `quote_requests` 度量表 (008) 双写
--   - WhatsApp click → 写 `whatsapp_inquiries` 业务表 (002) + 写 `quote_requests` 度量表 (008) 双写
--   - PDP CTA / footer → 写 `quote_requests` 度量表 (008) 单写
--
-- 跟 001 / 002 / 007 关系:
--   - 001 quotes 是业务数据 (报价单, 客户经理跟单)
--   - 002 whatsapp_inquiries 是 click 流水 (轻量级, 仅 click)
--   - 007 RLS 修复: quote_requests 也启用 RLS, 无公开 policy
--   - 008 quote_requests 是度量层 (转化漏斗, K3 dashboard, GA4 关联)
--
-- 配套代码:
--   - src/lib/quote-tracking.ts (新模块, 类似 whatsapp-inquiry.ts)
--   - src/components/quote/QuoteForm.tsx (双写)
--   - src/lib/whatsapp.ts getWhatsAppLinkProps onClick (双写)
-- ============================================================

-- ----------------------------------------------------------
-- 1. 创建 quote_requests 表
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS quote_requests (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- === 来源渠道 (V3.6 归因核心) ===
  source VARCHAR(50) NOT NULL,                            -- 'quote-form' | 'whatsapp-cta' | 'pdp-cta' | 'footer-whatsapp' | 'header-phone' | 'sticky-cta' | 'other'
  locale VARCHAR(10) NOT NULL,                            -- zh-hk / en / ja
  landing_page TEXT,                                       -- 触发询盘的页面 URL (referrer 用 window.location.href)
  referrer TEXT,                                           -- document.referrer
  utm_source VARCHAR(100),                                 -- URL ?utm_source=xxx 解析
  utm_medium VARCHAR(100),                                 -- URL ?utm_medium=xxx 解析
  utm_campaign VARCHAR(100),                               -- URL ?utm_campaign=xxx 解析

  -- === 跨 session 关联 (V3.6 拉通全链路) ===
  ga4_client_id VARCHAR(50),                               -- 从 _ga cookie 解析 (例: GA1.2.1234567890.1234567890)
  session_id VARCHAR(100),                                 -- 自定义 sessionStorage UUID
  first_touch_at TIMESTAMP WITH TIME ZONE,                 -- 首次进入站点时间 (跨页累加)
  last_touch_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),    -- 最近一次询盘时间

  -- === 业务上下文 (从 QuoteForm / WhatsApp 传入) ===
  customer_name VARCHAR(100),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  product_slug VARCHAR(100),                               -- /product/<slug>/ 关联
  product_name VARCHAR(255),
  category VARCHAR(100),                                   -- 主营品类 5: 貼紙/宣傳單張/包裝盒/紙袋/標籤
  quantity VARCHAR(50),                                    -- 字符串 (含 K/M 单位)
  size VARCHAR(100),
  message TEXT,                                            -- 客户询价留言

  -- === 状态机 (K3 跟单用) ===
  status VARCHAR(20) DEFAULT 'new' NOT NULL,               -- 'new' | 'contacted' | 'quoted' | 'closed_won' | 'closed_lost'
  contacted_at TIMESTAMP WITH TIME ZONE,
  quoted_at TIMESTAMP WITH TIME ZONE,
  closed_at TIMESTAMP WITH TIME ZONE,
  k3_note TEXT,                                            -- K3 手动备注 (订单结果, 复购意向等)

  -- === 系统字段 ===
  user_agent TEXT,
  ip_address INET,
  device_type VARCHAR(20),                                 -- 'desktop' | 'mobile' | 'tablet' (UA 解析)
  page_url TEXT                                            -- 同 landing_page (deprecated alias, 兼容 002)
);

-- ----------------------------------------------------------
-- 2. 索引 (V3.6 §五 转化闭环查询 + K3 dashboard 性能)
-- ----------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_locale_source ON quote_requests(locale, source);
CREATE INDEX IF NOT EXISTS idx_quote_requests_ga4_client_id ON quote_requests(ga4_client_id) WHERE ga4_client_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_quote_requests_email ON quote_requests(customer_email) WHERE customer_email IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_quote_requests_phone ON quote_requests(customer_phone) WHERE customer_phone IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_quote_requests_product_slug ON quote_requests(product_slug) WHERE product_slug IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_landing_page ON quote_requests(landing_page);

-- ----------------------------------------------------------
-- 3. RLS (per 007 策略: 启用 RLS; per 002 模式: anon 仅可 INSERT, 读/改仅 authenticated)
--    ⚠️ 2026-08-20 K3 评分修正: 初版"无公开 policy"是过度解读 007 —
--    浏览器端 anon key insert 会被 RLS 拒绝 (42501), fire-and-forget 静默吞错 = 整层度量上线即死。
--    正确模式 = 002 whatsapp_inquiries: RLS 启用 + anon INSERT-only + authenticated 读/改。
-- ----------------------------------------------------------
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- 允许匿名用户 INSERT (前端 quote form / WhatsApp click 埋点调用, 与 002 一致)
CREATE POLICY "Allow anonymous insert" ON quote_requests
  FOR INSERT TO anon
  WITH CHECK (true);

-- 允许 authenticated SELECT (K3 dashboard / Mavis 周报读数据)
CREATE POLICY "Allow authenticated select" ON quote_requests
  FOR SELECT TO authenticated
  USING (true);

-- 允许 authenticated UPDATE (K3 跟单状态机: new → contacted → quoted → closed_won/lost)
CREATE POLICY "Allow authenticated update" ON quote_requests
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

-- ----------------------------------------------------------
-- 4. 视图 (K3 dashboard 常用聚合查询, 不暴露底层表)
-- ----------------------------------------------------------

-- 4.1 询盘来源分布 (V3.6 §五 PDP→询盘 2-5% 良性)
CREATE OR REPLACE VIEW v_quote_source_distribution AS
SELECT
  locale,
  source,
  landing_page,
  DATE_TRUNC('day', created_at) AS day,
  COUNT(*) AS inquiry_count,
  COUNT(DISTINCT ga4_client_id) AS unique_visitors,
  COUNT(DISTINCT customer_email) AS unique_emails
FROM quote_requests
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY locale, source, landing_page, DATE_TRUNC('day', created_at)
ORDER BY day DESC, inquiry_count DESC;

-- 4.2 客户跨 session 全链路 (V3.6 §五 拉通 ga4_client_id)
CREATE OR REPLACE VIEW v_customer_journey AS
SELECT
  ga4_client_id,
  customer_email,
  COUNT(*) AS total_inquiries,
  COUNT(DISTINCT source) AS source_count,
  COUNT(DISTINCT product_slug) AS product_count,
  MIN(created_at) AS first_inquiry_at,
  MAX(created_at) AS last_inquiry_at,
  ARRAY_AGG(DISTINCT source) AS sources,
  ARRAY_AGG(DISTINCT landing_page) AS landing_pages
FROM quote_requests
WHERE ga4_client_id IS NOT NULL
GROUP BY ga4_client_id, customer_email
HAVING COUNT(*) > 1
ORDER BY total_inquiries DESC;

-- 4.3 状态机漏斗 (V3.6 §五 询盘→聊天→成交)
CREATE OR REPLACE VIEW v_quote_funnel AS
SELECT
  locale,
  source,
  status,
  COUNT(*) AS count
FROM quote_requests
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY locale, source, status
ORDER BY locale, source, status;

-- 4.4 询盘→成交转化率 (V3.6 §五 询盘转化率基准 PDP→询盘 2-5% 良性, ≥8% 优秀)
CREATE OR REPLACE VIEW v_quote_conversion_rate AS
SELECT
  landing_page,
  COUNT(*) AS total_inquiries,
  COUNT(*) FILTER (WHERE status = 'closed_won') AS won_count,
  ROUND(100.0 * COUNT(*) FILTER (WHERE status = 'closed_won') / NULLIF(COUNT(*), 0), 2) AS win_rate_pct
FROM quote_requests
WHERE created_at >= NOW() - INTERVAL '30 days'
  AND landing_page IS NOT NULL
GROUP BY landing_page
ORDER BY total_inquiries DESC;

-- ----------------------------------------------------------
-- 5. 安全网 (per 007 §5): 重新扫 public schema 任何遗漏的表
--    (quote_requests 已加 RLS, 安全网确保未来手动建表不会忘)
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
BEGIN
  SELECT COUNT(*) INTO missing FROM pg_tables
  WHERE schemaname = 'public' AND NOT rowsecurity;
  IF missing > 0 THEN
    RAISE WARNING '仍有 % 张表未启用 RLS, 请检查!', missing;
  ELSE
    RAISE NOTICE 'OK: public schema 全部表已启用 RLS (含 008 quote_requests)';
  END IF;
  RAISE NOTICE '008 quote_requests 视图: v_quote_source_distribution / v_customer_journey / v_quote_funnel / v_quote_conversion_rate';
END $$;
