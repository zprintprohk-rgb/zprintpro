-- ==============================================
-- 002: WhatsApp 询盘追踪表
-- ==============================================
-- 用途：记录每次 WhatsApp 链接点击，转化漏斗分析
-- 创建时间：2026-06-07
-- 配套代码：src/lib/whatsapp-inquiry.ts + src/lib/whatsapp.ts onClick

CREATE TABLE IF NOT EXISTS whatsapp_inquiries (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- 上下文信息（从 WhatsAppContext）
  locale VARCHAR(10) NOT NULL,                          -- zh-hk / en / ja
  source VARCHAR(100),                                  -- 来源：footer / hot-products / doujin-grid / etc.
  phone VARCHAR(50),                                    -- 拨打的 WhatsApp 号码

  -- 产品信息（如果有）
  product_slug VARCHAR(100),                            -- 产品 slug（如果有）
  product_name VARCHAR(255),                            -- 产品名（中文/英文/日文）
  size VARCHAR(100),                                    -- 尺寸
  material VARCHAR(100),                                 -- 材质
  quantity VARCHAR(50),                                  -- 数量（字符串，含 K/M 等单位）

  -- 上下文标志
  has_context BOOLEAN DEFAULT FALSE,                    -- 是否有产品/尺寸/材质等上下文

  -- 用户/页面信息
  user_agent TEXT,
  referrer TEXT,
  page_url TEXT,                                        -- 触发询盘的页面 URL
  ip_address INET,

  -- 后续追踪（手动更新）
  contacted_at TIMESTAMP WITH TIME ZONE,                -- 实际联系时间
  converted BOOLEAN DEFAULT FALSE,                      -- 是否转化为订单
  converted_at TIMESTAMP WITH TIME ZONE,
  order_id UUID REFERENCES orders(id),
  notes TEXT
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_whatsapp_inquiries_created_at ON whatsapp_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_whatsapp_inquiries_source ON whatsapp_inquiries(source);
CREATE INDEX IF NOT EXISTS idx_whatsapp_inquiries_locale ON whatsapp_inquiries(locale);
CREATE INDEX IF NOT EXISTS idx_whatsapp_inquiries_converted ON whatsapp_inquiries(converted);
CREATE INDEX IF NOT EXISTS idx_whatsapp_inquiries_phone ON whatsapp_inquiries(phone);

-- 表注释
COMMENT ON TABLE whatsapp_inquiries IS 'WhatsApp 询盘追踪表 - 每次链接点击都记录';
COMMENT ON COLUMN whatsapp_inquiries.source IS '来源：footer / hot-products / doujin-grid / quote-calculator / press-kit / contact / etc.';
COMMENT ON COLUMN whatsapp_inquiries.has_context IS 'true = 询盘带了产品/尺寸/材质上下文（高质量询盘）';
COMMENT ON COLUMN whatsapp_inquiries.converted IS 'true = 转化为订单（人工 update）';

-- ==============================================
-- Row Level Security
-- ==============================================
ALTER TABLE whatsapp_inquiries ENABLE ROW LEVEL SECURITY;

-- 允许匿名用户 INSERT（前端点击 WhatsApp 时调用）
CREATE POLICY "Allow anonymous insert" ON whatsapp_inquiries
  FOR INSERT TO anon
  WITH CHECK (true);

-- 允许 authenticated SELECT（后台看数据）
CREATE POLICY "Allow authenticated select" ON whatsapp_inquiries
  FOR SELECT TO authenticated
  USING (true);

-- 允许 authenticated UPDATE（标记 converted / contacted）
CREATE POLICY "Allow authenticated update" ON whatsapp_inquiries
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

-- ==============================================
-- 视图：询盘转化漏斗
-- ==============================================
CREATE OR REPLACE VIEW whatsapp_inquiry_funnel AS
SELECT
  locale,
  source,
  phone,
  DATE_TRUNC('day', created_at) AS day,
  COUNT(*) AS total_clicks,
  COUNT(*) FILTER (WHERE has_context) AS contextual_clicks,
  COUNT(*) FILTER (WHERE converted) AS conversions,
  ROUND(100.0 * COUNT(*) FILTER (WHERE converted) / NULLIF(COUNT(*), 0), 2) AS conversion_rate
FROM whatsapp_inquiries
GROUP BY locale, source, phone, DATE_TRUNC('day', created_at)
ORDER BY day DESC, total_clicks DESC;

COMMENT ON VIEW whatsapp_inquiry_funnel IS 'WhatsApp 询盘转化漏斗 - 按 locale/source/phone/day 聚合';

-- ==============================================
-- 视图：3 语言 × 来源 表现
-- ==============================================
CREATE OR REPLACE VIEW whatsapp_inquiry_by_locale AS
SELECT
  locale,
  COUNT(*) AS total_clicks,
  COUNT(DISTINCT source) AS source_count,
  COUNT(DISTINCT DATE_TRUNC('day', created_at)) AS active_days,
  ROUND(100.0 * COUNT(*) FILTER (WHERE has_context) / NULLIF(COUNT(*), 0), 2) AS context_rate,
  ROUND(100.0 * COUNT(*) FILTER (WHERE converted) / NULLIF(COUNT(*), 0), 2) AS conversion_rate
FROM whatsapp_inquiries
GROUP BY locale
ORDER BY total_clicks DESC;

COMMENT ON VIEW whatsapp_inquiry_by_locale IS '3 语言 WhatsApp 询盘表现对比';
