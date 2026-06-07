-- ==============================================
-- ZprintPro Quote Engine v4 — 多市场 + 实时汇率
-- 2026-06-07
-- ==============================================
-- 市场配置 + 实时汇率 (fallback 静态表已硬编码到 fx.ts)

-- 1. 印刷市场表
CREATE TABLE IF NOT EXISTS print_markets (
  code TEXT PRIMARY KEY, -- 'HK' / 'US' / 'GB' / 'AU' / 'JP' / 'CA' / 'CN' / 'SG' / 'NZ'
  locale TEXT NOT NULL,
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  currency TEXT NOT NULL,
  tax_type TEXT NOT NULL CHECK (tax_type IN ('none', 'sales_tax', 'vat', 'consumption_tax', 'gst')),
  tax_rate NUMERIC(4, 3) NOT NULL DEFAULT 0,
  shipping_zone TEXT NOT NULL,
  gang_run_threshold INT NOT NULL DEFAULT 1000,
  minimum_order NUMERIC(10, 2) NOT NULL,
  target_margin NUMERIC(4, 3) NOT NULL,
  exchange_rate NUMERIC(10, 4) NOT NULL,
  fx_risk_buffer NUMERIC(4, 3) NOT NULL DEFAULT 0.01,
  payment_methods TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 示例数据
INSERT INTO print_markets (code, locale, name, display_name, currency, tax_type, tax_rate, shipping_zone, gang_run_threshold, minimum_order, target_margin, exchange_rate, fx_risk_buffer, payment_methods) VALUES
('HK', 'zh-hk', 'Hong Kong', '香港 / Hong Kong', 'HKD', 'none', 0, 'local', 1000, 80, 0.25, 1.0, 0.005, ARRAY['Airwallex-HKD', 'PayMe', 'FPS', 'Alipay-HK']),
('US', 'en', 'United States', 'United States', 'USD', 'sales_tax', 0.087, 'north_america', 500, 15, 0.45, 0.128, 0.012, ARRAY['Airwallex-USD', 'PayPal', 'ApplePay']),
('GB', 'en-GB', 'United Kingdom', 'United Kingdom', 'GBP', 'vat', 0.20, 'europe', 600, 12, 0.35, 0.10, 0.015, ARRAY['Airwallex-GBP', 'PayPal']),
('AU', 'en-AU', 'Australia', 'Australia', 'AUD', 'gst', 0.10, 'oceania', 800, 20, 0.35, 0.196, 0.013, ARRAY['Airwallex-AUD', 'PayPal', 'Afterpay']),
('JP', 'ja', 'Japan', '日本', 'JPY', 'consumption_tax', 0.10, 'asia_pacific', 800, 1500, 0.30, 20.0, 0.010, ARRAY['Airwallex-JPY', 'Konbini', '银行振込']),
('CA', 'en-CA', 'Canada', 'Canada', 'CAD', 'gst', 0.13, 'north_america', 600, 18, 0.35, 0.175, 0.012, ARRAY['Airwallex-CAD', 'PayPal']),
('CN', 'zh-CN', 'China Mainland', '中国大陆', 'CNY', 'vat', 0.13, 'china_mainland', 1000, 60, 0.20, 0.92, 0.008, ARRAY['WeChat-Pay', 'Alipay-CN', 'Airwallex-CNY']),
('SG', 'en', 'Singapore', 'Singapore', 'SGD', 'gst', 0.09, 'asia_pacific', 700, 20, 0.30, 0.172, 0.010, ARRAY['Airwallex-SGD', 'PayPal', 'PayNow']),
('NZ', 'en', 'New Zealand', 'New Zealand', 'NZD', 'gst', 0.15, 'oceania', 800, 22, 0.30, 0.21, 0.013, ARRAY['Airwallex-NZD', 'PayPal'])
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  display_name = EXCLUDED.display_name,
  currency = EXCLUDED.currency,
  tax_rate = EXCLUDED.tax_rate,
  shipping_zone = EXCLUDED.shipping_zone,
  gang_run_threshold = EXCLUDED.gang_run_threshold,
  minimum_order = EXCLUDED.minimum_order,
  target_margin = EXCLUDED.target_margin,
  exchange_rate = EXCLUDED.exchange_rate,
  fx_risk_buffer = EXCLUDED.fx_risk_buffer,
  payment_methods = EXCLUDED.payment_methods,
  updated_at = now();

-- 2. 实时汇率表 (历史记录)
CREATE TABLE IF NOT EXISTS print_fx_rates (
  id BIGSERIAL PRIMARY KEY,
  base_currency TEXT NOT NULL DEFAULT 'HKD',
  quote_currency TEXT NOT NULL,
  rate NUMERIC(12, 6) NOT NULL,
  source TEXT NOT NULL, -- 'open.er-api' / 'static' / 'airwallex' / 'fixer'
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(base_currency, quote_currency, fetched_at)
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_fx_rates_lookup ON print_fx_rates(base_currency, quote_currency, fetched_at DESC);

-- 3. 视图：最新汇率 (供前端展示)
CREATE OR REPLACE VIEW print_fx_rates_latest AS
SELECT DISTINCT ON (base_currency, quote_currency)
  base_currency,
  quote_currency,
  rate,
  source,
  fetched_at
FROM print_fx_rates
ORDER BY base_currency, quote_currency, fetched_at DESC;

-- 4. 改 quote_calculations 表 (Phase 2 加 market 字段)
ALTER TABLE quote_calculations
  ADD COLUMN IF NOT EXISTS market_code TEXT REFERENCES print_markets(code),
  ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'USD',
  ADD COLUMN IF NOT EXISTS tax_amount NUMERIC(12, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS shipping_cost_hkd NUMERIC(12, 2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS payment_channel TEXT,
  ADD COLUMN IF NOT EXISTS fx_effective_rate NUMERIC(10, 6),
  ADD COLUMN IF NOT EXISTS fx_total_cost_ratio NUMERIC(4, 3);

CREATE INDEX IF NOT EXISTS idx_quote_market ON quote_calculations(market_code);
CREATE INDEX IF NOT EXISTS idx_quote_currency ON quote_calculations(currency);

-- 5. 视图：多市场转化漏斗
CREATE OR REPLACE VIEW quote_funnel_by_market AS
SELECT
  q.market_code,
  m.display_name,
  m.currency,
  DATE_TRUNC('day', q.created_at) AS day,
  COUNT(*) AS total_quotes,
  COUNT(*) FILTER (WHERE q.submitted_inquiry = true) AS converted_quotes,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE q.submitted_inquiry = true) / NULLIF(COUNT(*), 0),
    2
  ) AS conversion_rate_pct,
  AVG(q.total_price) AS avg_quote_value_local,
  SUM(q.total_price) AS total_quote_value_local
FROM quote_calculations q
LEFT JOIN print_markets m ON q.market_code = m.code
GROUP BY q.market_code, m.display_name, m.currency, DATE_TRUNC('day', q.created_at);

COMMENT ON TABLE print_markets IS 'ZprintPro 多市场定价配置 (9 markets). 2026-06-07 Phase 3 launch.';
COMMENT ON TABLE print_fx_rates IS '实时汇率历史表 — 接 open.er-api / Airwallex 真实拉取.';
COMMENT ON VIEW print_fx_rates_latest IS '最新汇率视图 — 供前端 fallback 用.';
COMMENT ON VIEW quote_funnel_by_market IS '多市场报价转化漏斗 — 看哪个市场 ROI 最高.';
