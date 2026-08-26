#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
K3 8/19 06:00 婚礼 batch 1.5 注入
- 12 SKU (WI-001~006 + PC-001~006) V21 提示词注入 v20_9_parsed.json
- 含: 烫金/foil 反射质感 + 整套 6 件 flat lay + HK 酒楼 vs US 花园分 locale 场景
- 14 虚构公司矩阵扩 4 婚礼品牌 (Crescentwood Weddings / Ivory Bloom / Lumen Brides / PaperCrane Brides)
"""
import json
from pathlib import Path

PARSED = Path(r"F:\zprintpro-nextjs\zprintpro\.cluster\m3-exec-20260811\v20_9_parsed.json")

# ================== V21 婚礼品牌矩阵 (14 矩阵扩) ==================
# 4 虚构婚礼品牌, 按类目内顺序循环
WEDDING_BRANDS = [
    "Crescentwood Weddings",     # 主理品牌 / 烫金
    "Ivory Bloom Studio",        # 婚礼纸品设计工作室
    "Lumen Brides",              # 高端喜帖定制
    "PaperCrane Brides",         # 东方美学
]

# ================== V21 P0 修复统一段 ==================
V21_COMMON_HEAD = (
    "PRODUCTION-READY FINAL IMAGE ONLY. 1:1 ratio, 8K ultra-high-definition. "
    "Seedream 5.0 e-commerce product photo, "
    "V21 §4.1 main title whitelist: title = 1 string ≤ 6 English words, spell 100% correct. "
    "V21 §4.4 size constraint: 1200x1146 (1.047:1 after BOTTOM-STRIP crop), ≤120KB WebP. "
)

V21_NEGATIVES = (
    "no fine print, no small paragraph text, no secondary captions, no price list, "
    "no small labels, no body copy, no marketing blurb, no watermark, no AI generator names, "
    "no real luxury brand logos (no Tiffany, no Gucci, no Louis Vuitton, no Chanel), "
    "no celebrity faces, no copyright-infringing imagery, no gibberish text, "
    "no placeholder text, no torn holes, no white unfinished edges, no draft composition. "
)

# ================== Locale 场景模板 ==================
# en (US): 美国花园/教堂户外婚礼, 美式生活, natural light
# zh-hk (HK): 香港酒楼婚宴, 酒楼中式, 暖色红金
# ja (JP): 日本チャペル/神前, 和モダン, soft pastel

SCENE_US = "bright American garden wedding scene with manicured rose bushes, white wooden chapel in soft focus background, natural golden-hour light, eucalyptus garlands, fresh peonies blush pink ivory palette"
SCENE_HK = "Hong Kong Chinese banquet wedding scene at grand ballroom, round tables with red and gold tablecloths, double-happiness symbols, traditional Chinese lanterns, warm amber chandelier light, gilded place setting"
SCENE_JP = "Japanese modern wedding scene at minimalist chapel with shoji screens, ikebana floral arrangement white and green, soft natural light, washi paper texture, subtle gold accent"
SCENE_INDOOR_US = "indoor American wedding reception at historic ballroom, crystal chandeliers, long banquet tables with ivory linens, taper candles, romantic candlelight"

# ================== 12 SKU V21 Prompt Templates ==================
# 5 views per SKU: HERO / DETAIL / VARIETY / MULTI-ANGLE / (SUITE-FLAT-LAY for WI-006 only)

def make_sku_entry(sku_code, slug, alt_en, brand, view_set, suite_flatlay=False):
    """Build a v20_9_parsed.json SKU entry with V21 prompts."""
    seo_base = f"zprintpro-{slug}"
    views = {}

    # HERO: 80-85% frame, foil reflection in candlelight
    if 'HERO' in view_set:
        views['HERO'] = (
            V21_COMMON_HEAD +
            f"HERO 80-85% frame. Premium wedding stationery for fictional brand {brand}, "
            f"centerpiece subject occupying 80-85% frame for instant product recognition, "
            f"foil-stamped metallic gold reflecting warm candlelight, embossed paper texture visible, "
            f"on {SCENE_US} for the main product. "
            f"Soft natural window glow from side, romantic wedding atmosphere. "
            f"Color palette: blush pink, ivory cream, champagne gold, soft sage green. "
            + V21_NEGATIVES
        )

    # DETAIL: 85-95% macro, foil reflection
    if 'DETAIL' in view_set:
        views['DETAIL'] = (
            V21_COMMON_HEAD +
            f"DETAIL 85-95% macro. Extreme close-up of {brand} wedding product, "
            f"enlarged 2x filling 90% frame, macro focus on foil-stamped metallic surface "
            f"with visible light reflection and texture, paper fiber grain, "
            f"embossed pattern depth, die-cut precision edge. "
            f"Warm candlelight from side revealing material weight and substantial hand-feel. "
            f"Color palette: champagne gold reflection, ivory cream paper, soft blush accent. "
            + V21_NEGATIVES
        )

    # VARIETY: 75-90% with 3 panels
    if 'VARIETY' in view_set:
        views['VARIETY-C'] = (
            V21_COMMON_HEAD +
            f"VARIETY 75-90% tri-panel showing 3 usage scenarios of {brand} wedding product. "
            f"Panel 1: ceremony scene ({SCENE_US}), Panel 2: reception indoor ({SCENE_INDOOR_US}), "
            f"Panel 3: detail close-up of foil-stamped design. "
            f"All 3 panels consistent {brand} brand mark, all paper texture and foil reflection visible. "
            + V21_NEGATIVES
        )

    # MULTI-ANGLE: 75-80% same SKU 4 angles
    if 'MULTI-ANGLE' in view_set:
        views['MULTI-ANGLE'] = (
            V21_COMMON_HEAD +
            f"MULTI-ANGLE 75-80% showing {brand} wedding product from 4 angles in 2x2 grid. "
            f"Top-left: front view, top-right: 3/4 angle, bottom-left: side profile, bottom-right: top-down. "
            f"All 4 angles consistent foil reflection, paper texture, {brand} mark placement. "
            f"Soft natural light, wedding reception table setting. "
            + V21_NEGATIVES
        )

    # SPREAD (for wedding suite only) - 80-85% flat lay
    if 'SPREAD' in view_set or suite_flatlay:
        views['SPREAD'] = (
            V21_COMMON_HEAD +
            f"SUITE-FLAT-LAY 80-85% showing {brand} complete wedding suite 6-piece set in flat-lay arrangement on linen surface. "
            f"6 pieces visible: invitation card + Save the Date + thank you card + program card + menu card + seating chart, "
            f"all foil-stamped in matching champagne gold, all matching design language, "
            f"varying sizes from A6 to A1, on natural linen runner with eucalyptus sprig and rose petals. "
            f"Soft top-down natural light, romantic American wedding aesthetic. "
            + V21_NEGATIVES
        )

    return {
        'sku_code': sku_code,
        'slug': slug,
        'seo_filename': f'{seo_base}-en.webp',
        'alt_en': alt_en,
        'prices': 'EN=$0.30-$25',
        'variety_mode': 'C',
        'spread': suite_flatlay,
        'view_count': 5 if suite_flatlay else 4,
        'views': views,
    }

# ================== 12 SKU 数据 ==================
WEDDING_SKUS = [
    # WI-001 烫金喜帖
    ('WI-001', 'foil-wedding-invitations',
     "300gsm cotton foil wedding invitations in rose gold / champagne / silver finishes, 50 sets MOQ. Best for weddings / hotels / chapels.",
     "Crescentwood Weddings", ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE']),
    # WI-002 Save the Date
    ('WI-002', 'save-the-date-cards',
     "Save the Date announcement cards 50 sets MOQ, 300gsm art / cotton / Conqueror paper with mailing envelopes. Best for wedding previews / chapels.",
     "Ivory Bloom Studio", ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE']),
    # WI-003 感谢卡
    ('WI-003', 'wedding-thank-you-cards',
     "Wedding thank you cards 100 sets MOQ, 300gsm cotton / art / Conqueror + foil / UV / die-cut, envelopes included. Best for wedding thank-yous.",
     "Lumen Brides", ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE']),
    # WI-004 节目单
    ('WI-004', 'wedding-program-cards',
     "Wedding program / agenda cards 100 sets MOQ, duplex 4C print, 300gsm art / cotton paper, 4-page folded or bi-fold. Best for wedding agendas.",
     "PaperCrane Brides", ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE']),
    # WI-005 菜单卡
    ('WI-005', 'wedding-menu-cards',
     "Wedding menu cards 100 sets MOQ, 300gsm art / cotton + foil + die-cut, 4-fold or bi-fold. Best for wedding banquets / Western weddings / Michelin dinners.",
     "Crescentwood Weddings", ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE']),
    # WI-006 整套 6 件 (HAS suite-flatlay)
    ('WI-006', 'wedding-suite-bundle',
     "Wedding full suite 6-piece bundle (invitation + Save the Date + thank you + program + menu + seating chart), 100 sets MOQ. Best for full wedding / destination weddings.",
     "Ivory Bloom Studio", ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE', 'SPREAD'], True),
    # PC-001 婚宴枱卡
    ('PC-001', 'wedding-place-cards',
     "Wedding place cards / table cards 100 sheets MOQ, 300gsm cotton / art / Conqueror + foil / embossing / die-cut. Best for wedding tables / hotel weddings.",
     "Lumen Brides", ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE']),
    # PC-002 酒水牌
    ('PC-002', 'drink-tokens',
     "Drink tokens / beverage markers 100 sheets MOQ, 0.5mm clear PVC or 300gsm art paper, waterproof die-cut rounded. Best for wedding beverages / pool parties.",
     "PaperCrane Brides", ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE']),
    # PC-003 座位卡
    ('PC-003', 'escort-cards',
     "Escort cards / guest markers 100 sheets MOQ, 300gsm cotton / art + foil + die-cut shapes + folded standing. Best for wedding seating / hotel weddings.",
     "Crescentwood Weddings", ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE']),
    # PC-004 名牌卡
    ('PC-004', 'name-tags-badges',
     "Conference badges / event name tags 100 sheets MOQ, 300gsm art + 3M magnetic back or lanyard hole punch. Best for conferences / exhibitions / corporate events.",
     "Ivory Bloom Studio", ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE']),
    # PC-005 餐厅枱卡
    ('PC-005', 'cafe-table-cards',
     "Café / restaurant table cards 100 sheets MOQ, 300gsm art / waterproof PVC, UV waterproof layer, folded standing. Best for restaurants / cafés / bars.",
     "Lumen Brides", ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE']),
    # PC-006 席位图
    ('PC-006', 'wedding-seating-charts',
     "Wedding seating charts / large seat maps 50 sheets MOQ, A1 / A2 large format 300gsm art + foil + die-cut. Best for wedding banquets / hotel weddings / large banquets.",
     "PaperCrane Brides", ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE']),
]

# ================== 注入 v20_9_parsed.json ==================
print(f"Reading {PARSED}...")
with open(PARSED, 'r', encoding='utf-8') as f:
    d = json.load(f)

# Find existing SKU codes to avoid duplicates
existing = {x['sku_code'] for x in d['skus']}
print(f"Existing SKUs: {len(existing)}")

new_entries = []
for sku_code, slug, alt_en, brand, view_set, *suite_flag in [
    (s[0], s[1], s[2], s[3], s[4], *s[5:]) if len(s) > 5 else (s[0], s[1], s[2], s[3], s[4], False)
    for s in WEDDING_SKUS
]:
    suite_flatlay = bool(suite_flag[0]) if suite_flag else False
    if sku_code in existing:
        print(f"  [SKIP] {sku_code} already exists")
        continue
    entry = make_sku_entry(sku_code, slug, alt_en, brand, view_set, suite_flatlay)
    new_entries.append(entry)
    print(f"  [ADD] {sku_code} {slug} ({len(view_set) + (1 if suite_flatlay else 0)} views)")

# Append new entries
d['skus'].extend(new_entries)
d['total_skus'] = len(d['skus'])

# Backup + write
backup = PARSED.with_suffix('.json.bak-pre-v21-wedding')
if not backup.exists():
    with open(backup, 'w', encoding='utf-8') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
    print(f"Backup saved: {backup.name}")

with open(PARSED, 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)
print(f"\nOK: {len(new_entries)} SKUs added, total {d['total_skus']}")
print(f"File: {PARSED}")
print(f"Size: {PARSED.stat().st_size:,} bytes")
