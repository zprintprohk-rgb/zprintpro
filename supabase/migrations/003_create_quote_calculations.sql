-- ==============================================
-- ZprintPro Quote Engine v1 (Phase 1 MVP)
-- 2026-06-07
-- ==============================================
-- 询盘 + 实时报价计算记录
-- 用于：报价系统数据分析、ML 训练、AI 智能报价

CREATE TABLE IF NOT EXISTS quote_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- 产品
  product_slug TEXT NOT NULL,
  quantity INT NOT NULL,
  size_w NUMERIC(10, 2) NOT NULL,
  size_h NUMERIC(10, 2) NOT NULL,
  size_unit TEXT NOT NULL DEFAULT 'mm' CHECK (size_unit IN ('mm', 'in')),
  material TEXT NOT NULL,
  finishes TEXT[] NOT NULL DEFAULT '{}',
  deadline TEXT NOT NULL CHECK (deadline IN ('standard', 'rush', 'same-day')),

  -- 价格结果
  unit_price NUMERIC(10, 4) NOT NULL,
  total_price NUMERIC(12, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',

  -- 客户信息（可选，填了就关联 WhatsApp 询盘）
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  customer_country TEXT,

  -- 元数据
  locale TEXT NOT NULL DEFAULT 'en',
  source TEXT, -- 'home' / 'services' / 'quote' / 'product'
  referrer_url TEXT,
  user_agent TEXT,
  ip_country TEXT,

  -- 转化追踪
  submitted_inquiry BOOLEAN NOT NULL DEFAULT false,
  order_id UUID,

  CONSTRAINT quote_qty_positive CHECK (quantity > 0),
  CONSTRAINT quote_total_positive CHECK (total_price > 0)
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_quote_product ON quote_calculations(product_slug);
CREATE INDEX IF NOT EXISTS idx_quote_country ON quote_calculations(customer_country);
CREATE INDEX IF NOT EXISTS idx_quote_created ON quote_calculations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_submitted ON quote_calculations(submitted_inquiry) WHERE submitted_inquiry = true;

-- 报价转化漏斗视图
CREATE OR REPLACE VIEW quote_funnel AS
SELECT
  product_slug,
  customer_country,
  locale,
  DATE_TRUNC('day', created_at) AS day,
  COUNT(*) AS total_quotes,
  COUNT(*) FILTER (WHERE submitted_inquiry = true) AS converted_quotes,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE submitted_inquiry = true) / NULLIF(COUNT(*), 0),
    2
  ) AS conversion_rate_pct,
  AVG(total_price) AS avg_quote_value_usd,
  SUM(total_price) AS total_quote_value_usd
FROM quote_calculations
GROUP BY product_slug, customer_country, locale, DATE_TRUNC('day', created_at);

COMMENT ON TABLE quote_calculations IS 'Real-time quote calculations from QuoteEngine v1 (Phase 1 MVP). 2026-06-07 launch.';
COMMENT ON VIEW quote_funnel IS 'Quote-to-inquiry conversion funnel by product/country/day. Used for AI optimization training data.';
