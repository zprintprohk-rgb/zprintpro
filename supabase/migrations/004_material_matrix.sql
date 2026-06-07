-- ==============================================
-- ZprintPro Quote Engine v2 (Phase 2) — 材质 + 工艺数据源
-- 2026-06-07
-- ==============================================
-- 把硬编码的材质/工艺数据搬到 Supabase
-- 支持多语言 JSONB 翻译
-- 客户端可按 locale 拉取

-- 1. 印刷材质表
CREATE TABLE IF NOT EXISTS print_materials (
  id TEXT PRIMARY KEY, -- 'copperplate_157', 'kraft_250' 等
  category TEXT NOT NULL CHECK (category IN ('paper', 'sticker', 'specialty', 'vinyl', 'kraft', 'pvc', 'other')),
  weight_gsm INT, -- 157/200/250/300/350/400 gsm
  thickness_mm NUMERIC(5, 2), -- 0.1/0.2/0.3mm
  finish TEXT, -- 'gloss' / 'matte' / 'kraft' / 'transparent' / 'metallic'
  color_tolerance_pct NUMERIC(4, 2) NOT NULL DEFAULT 10.0, -- 色差容忍度 %
  certifications TEXT[] DEFAULT '{}', -- ['FSC', 'FDA', 'REACH']
  eco_friendly BOOLEAN NOT NULL DEFAULT false,
  min_order_qty INT NOT NULL DEFAULT 100,
  max_order_qty INT NOT NULL DEFAULT 100000,

  -- 多语言翻译
  locale_translations JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- 结构: { "zh-hk": {"name": "157g 銅版紙", "description": "高光", "warnings": ["CMYK ±10%"]}, "en": {...}, "ja": {...} }

  -- 行业参数
  sheet_cost_hkd NUMERIC(8, 4) NOT NULL, -- 单张成本 (HKD)
  recommended_sheet TEXT, -- 推荐大版

  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_material_category ON print_materials(category) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_material_eco ON print_materials(eco_friendly) WHERE is_active = true;

-- 示例数据：业务卡 4 种核心材质
INSERT INTO print_materials (id, category, weight_gsm, finish, color_tolerance_pct, certifications, eco_friendly, min_order_qty, sheet_cost_hkd, recommended_sheet, locale_translations) VALUES
('400g_gloss_art', 'paper', 400, 'gloss', 10.0, ARRAY['FSC'], true, 100, 4.2, 'A3plus',
  '{
    "zh-hk": {"name": "400g 銅版紙", "description": "高光銅版紙，標準名片材質", "warnings": ["CMYK ±10% 色差屬正常"]},
    "en": {"name": "400gsm Gloss Art Card", "description": "Premium gloss art card, standard for business cards", "warnings": ["CMYK ±10% color variance is normal"]},
    "ja": {"name": "400g コート紙", "description": "高級光沢コート紙、名刺の標準素材", "warnings": ["CMYK ±10% の色差は正常"]}
  }'::jsonb),
('300g_gloss_art', 'paper', 300, 'gloss', 10.0, ARRAY['FSC'], true, 100, 3.0, 'A3plus',
  '{
    "zh-hk": {"name": "300g 銅版紙", "description": "中厚銅版紙，性價比高", "warnings": []},
    "en": {"name": "300gsm Gloss Art Card", "description": "Medium-thickness, high cost-performance", "warnings": []},
    "ja": {"name": "300g コート紙", "description": "中厚のコート紙、コストパフォーマンス良", "warnings": []}
  }'::jsonb),
('350g_kraft', 'kraft', 350, 'kraft', 25.0, ARRAY['FSC'], true, 100, 4.0, 'A3plus',
  '{
    "zh-hk": {"name": "350g 牛皮紙", "description": "環保牛皮紙，復古質感", "warnings": ["色差極大，不可控", "建議深色設計"]},
    "en": {"name": "350gsm Kraft Paper", "description": "Eco-friendly kraft, vintage feel", "warnings": ["Very high color variance, use dark designs"]},
    "ja": {"name": "350g クラフト紙", "description": "エコクラフト紙、レトロ感", "warnings": ["色差が大きい、暗いデザイン推奨"]}
  }'::jsonb),
('300g_specialty_gold', 'specialty', 300, 'metallic', 15.0, ARRAY['FSC'], false, 100, 8.5, 'A3plus',
  '{
    "zh-hk": {"name": "300g 金箔特種紙", "description": "金箔高檔特種紙，適用於名片/邀請函", "warnings": ["UV 燙金工藝必配"]},
    "en": {"name": "300gsm Specialty Gold Paper", "description": "Gold foil specialty, for premium business cards/invitations", "warnings": ["Pair with foil/UV finishing recommended"]},
    "ja": {"name": "300g 金箔特殊紙", "description": "金箔の高級特殊紙、名刺/招待状に最適", "warnings": ["箔/UV加工推奨"]}
  }'::jsonb),
('300g_pvc', 'pvc', 300, 'matte', 5.0, ARRAY['FDA'], true, 100, 6.0, 'A3plus',
  '{
    "zh-hk": {"name": "防水 PVC 名片", "description": "防水 PVC 卡片，戶外/潮濕環境適用", "warnings": []},
    "en": {"name": "Waterproof PVC Business Cards", "description": "Waterproof PVC, for outdoor/moisture environments", "warnings": []},
    "ja": {"name": "防水 PVC 名刺", "description": "防水 PVC カード、屋外/湿潤環境に最適", "warnings": []}
  }'::jsonb);

-- 2. 工艺表 (起步价 + 单版费)
CREATE TABLE IF NOT EXISTS print_finishings (
  id TEXT PRIMARY KEY, -- 'spot-uv', 'foil', 'emboss' 等
  category TEXT NOT NULL CHECK (category IN ('coating', 'foil', 'emboss', 'cutting', 'lamination', 'binding', 'other')),
  base_cost_hkd NUMERIC(10, 2) NOT NULL, -- 起步价 (HKD)
  per_sheet_cost_hkd NUMERIC(10, 2) NOT NULL, -- 单版费 (HKD/版)
  requires_plate BOOLEAN NOT NULL DEFAULT false, -- 是否需要制版
  plate_cost_hkd NUMERIC(10, 2) NOT NULL DEFAULT 0, -- 制版费
  production_speed_sheets_per_hour INT, -- 生产速度 (张/小时)
  compatible_materials TEXT[] DEFAULT '{}', -- 兼容材质 ID 列表
  min_sheets INT NOT NULL DEFAULT 1, -- 最小版数

  -- 多语言翻译
  locale_translations JSONB NOT NULL DEFAULT '{}'::jsonb,

  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_finishing_category ON print_finishings(category) WHERE is_active = true;

-- 示例数据：6 种核心工艺
INSERT INTO print_finishings (id, category, base_cost_hkd, per_sheet_cost_hkd, requires_plate, plate_cost_hkd, production_speed_sheets_per_hour, compatible_materials, min_sheets, locale_translations) VALUES
('spot-uv', 'coating', 80, 40, false, 0, 1200, ARRAY['400g_gloss_art', '300g_gloss_art', '300g_specialty_gold'], 1,
  '{
    "zh-hk": {"name": "局部 UV 上光", "description": "高光提亮，適用 logo/重點元素", "warnings": ["需提供 UV 區域 mask 檔案"]},
    "en": {"name": "Spot UV Varnish", "description": "High gloss highlight on logos/key elements", "warnings": ["Provide UV area mask file"]},
    "ja": {"name": "部分 UV 加工", "description": "ロゴ/重要要素の高光沢ハイライト", "warnings": ["UV エリアマスクファイル提供必要"]}
  }'::jsonb),
('foil', 'foil', 150, 50, true, 150, 800, ARRAY['400g_gloss_art', '300g_specialty_gold', '350g_kraft'], 1,
  '{
    "zh-hk": {"name": "燙金/燙銀", "description": "金/銀/玫瑰金等高檔工藝，需開鋅版", "warnings": ["需提供 AI 矢量文件"]},
    "en": {"name": "Foil Stamping (Gold/Silver)", "description": "Premium foil finishing, requires zinc plate", "warnings": ["AI vector file required"]},
    "ja": {"name": "箔押し (金/銀)", "description": "金/銀/ローズゴールドの高級加工、亜鉛版必要", "warnings": ["AI ベクターファイル必要"]}
  }'::jsonb),
('emboss', 'emboss', 200, 60, true, 200, 600, ARRAY['400g_gloss_art', '300g_specialty_gold'], 1,
  '{
    "zh-hk": {"name": "擊凸/壓凹", "description": "3D 立體效果，適用 logo/邊框", "warnings": ["需提供凸版圖"]},
    "en": {"name": "Embossing / Debossing", "description": "3D effect for logos/borders", "warnings": ["Provide embossing artwork"]},
    "ja": {"name": "エンボス/デボス", "description": "ロゴ/枠の 3D 立体効果", "warnings": ["エンボス artwork 提供必要"]}
  }'::jsonb),
('rounded-corners', 'cutting', 30, 5, false, 0, 2000, ARRAY['400g_gloss_art', '300g_pvc'], 1,
  '{
    "zh-hk": {"name": "圓角模切", "description": "R 角 3-6mm，柔和邊角", "warnings": []},
    "en": {"name": "Rounded Corner Cutting", "description": "R-corner 3-6mm, soft edges", "warnings": []},
    "ja": {"name": "角丸加工", "description": "R 角 3-6mm、柔らかいエッジ", "warnings": []}
  }'::jsonb),
('matte-lamination', 'lamination', 50, 30, false, 0, 1500, ARRAY['400g_gloss_art', '300g_gloss_art'], 1,
  '{
    "zh-hk": {"name": "啞膜覆膜", "description": "觸感啞光，防刮花", "warnings": []},
    "en": {"name": "Matte Lamination", "description": "Touch matte, scratch-resistant", "warnings": []},
    "ja": {"name": "マットラミネート", "description": "マット手触り、傷防止", "warnings": []}
  }'::jsonb),
('gloss-lamination', 'lamination', 50, 30, false, 0, 1500, ARRAY['400g_gloss_art', '300g_gloss_art'], 1,
  '{
    "zh-hk": {"name": "光膜覆膜", "description": "表面光亮，色彩鮮豔", "warnings": []},
    "en": {"name": "Gloss Lamination", "description": "Glossy surface, vibrant colors", "warnings": []},
    "ja": {"name": "光沢ラミネート", "description": "光沢表面、鮮やかな色彩", "warnings": []}
  }'::jsonb);

-- 3. 视图：按 locale 拉取材质（供前端展示）
CREATE OR REPLACE VIEW print_materials_localized AS
SELECT
  id,
  category,
  weight_gsm,
  finish,
  color_tolerance_pct,
  certifications,
  eco_friendly,
  min_order_qty,
  sheet_cost_hkd,
  recommended_sheet,
  locale_translations->'zh-hk'->>'name' AS name_zh_hk,
  locale_translations->'zh-hk'->>'description' AS desc_zh_hk,
  locale_translations->'zh-hk'->'warnings' AS warnings_zh_hk,
  locale_translations->'en'->>'name' AS name_en,
  locale_translations->'en'->>'description' AS desc_en,
  locale_translations->'en'->'warnings' AS warnings_en,
  locale_translations->'ja'->>'name' AS name_ja,
  locale_translations->'ja'->>'description' AS desc_ja,
  locale_translations->'ja'->'warnings' AS warnings_ja
FROM print_materials
WHERE is_active = true;

COMMENT ON TABLE print_materials IS 'Printing materials catalog with i18n support. Used by Quote Engine v2 (Phase 2).';
COMMENT ON TABLE print_finishings IS 'Finishing services with base cost + per-sheet pricing model. 2026-06-07 launch.';
COMMENT ON VIEW print_materials_localized IS 'Convenient localized view for frontend material selector.';
