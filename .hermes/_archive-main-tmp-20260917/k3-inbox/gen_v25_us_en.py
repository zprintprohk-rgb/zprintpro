#!/usr/bin/env python3
"""
V25 US-DTC EN PROMPT GENERATOR (K3 8/24 02:30 拍板)

V24.2 R2 → V25 演进 (基于 v25-strategy.md 全链路分析):
  V20.0:  79 SKU baseline, ZprintPro in body + #DC2626 + PingFang HK Bold (V20 时代缺陷)
  V22:    12 字段多行产品描述 (V22 黄金, 撤回 → V24.2 R2 回归)
  V23:    16 类目 × 4 fictional client brands (V23 黄金, 保留)
  V23.5.1: BRIGHT vivid 修复 dim/cloudy/muddy (保留)
  V24.2 R2: 1188 prompts ≤2300 chars, no ZprintPro (current SSoT ja/zh-hk)
  V25 US-DTC EN:  专攻 US 市场, 4 视图按 Polarizing Elements Framework,
                  USD 价格 from basePrice_en, US 场景 per cat, ja/zh-hk 跳过

V25 关键设计 (针对 US 市场, K3 8/24 02:30 拍板):
  1. US 目标用户明确 (1 句):
     "for US cross-border DTC shoppers browsing zprintpro.com /en/ product
      detail pages, expecting premium Quiet Luxury aesthetic (warm earth
      tones, deep navy, brushed gold)"
  2. 图用途明确 (1 句):
     "This image is the hero photo on zprintpro.com /en/ product detail page"
  3. 4 视图分工按 Polarizing Elements Framework (≥1 元素 per 视图):
     HERO:        Color Pop + Lifestyle Hint + Packaging as Hero
     DETAIL:      Scale Disruption (human hand) + Detail texture
     VARIETY:     Arrangement Architecture + Motion Implication
     MULTI-ANGLE: Unexpected Angle + Multi-view composite
  4. USD 价格统一从 products.ts.basePrice_en 字段读取
  5. US 专属场景 per 16 类目 (Brooklyn loft / SoHo boutique / Bushwick 等)
  6. 保持 V24.2 R2 核心:
     - 12 字段 (material/size/print/finish/features/price/MOQ/turnaround/description)
     - fictional client brand on product surface
     - no ZprintPro/智印港/ジープリント
     - 真实小字元素 (barcode/QR/batch code)
     - 1 句 anti-garbage + 1 句 negative

99 SKU × 4 视图 = 396 prompts (en only, ja/zh-hk 用 V24.2 R2)
"""
import json
import re
import sys
from pathlib import Path

# Force UTF-8 stdout
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

WORKSPACE = Path(r'F:\zprintpro-nextjs')
PRODUCTS_FILE = WORKSPACE / 'src/data/products.ts'
OUTPUT_EN = WORKSPACE / 'seedream/v25-us-en-prompts.txt'

# ===== V25 US 专属配置 =====

# 1 句 US 目标用户 + 1 句图用途 (新加)
US_CONTEXT = 'for US cross-border DTC shoppers browsing zprintpro.com /en/ product detail pages, expecting premium Quiet Luxury aesthetic (warm earth tones, deep navy, brushed gold). This image is the hero photo on zprintpro.com /en/ product detail page.'

# V25 US 色彩策略 (沿用 V24.2 R2 US Quiet Luxury)
LOCALE_COLORS = 'warm earth tones, deep navy, brushed gold, color-saturated vivid, not muted, not washed out, BRIGHT CLEAR daylight, high clarity, NOT dim/overcast/muddy'

LOCALE_AESTHETIC = 'Cinematic photo-real, US DTC premium, Quiet Luxury, sharp focus, true-to-life texture, warm trustworthy lifestyle.'

# Anti-garbage US (强化: no ZprintPro/智印港/ジープリント, no 技术参数)
ANTI_GARBAGE = 'No other text, gibberish, watermarks, brand names, or multiple labels outside the product surface itself. No ZprintPro / 智印港 / ジープリント / Z-Print anywhere in the image. All English spelled correctly. No technical parameters (color codes, resolution, font names) visible as text.'

NEGATIVE = 'blurry, watermark, distorted, gibberish, dim lighting, muddy, faded, garish neon, cluttered background, low contrast, flat front view, ZprintPro text, Chinese characters, Japanese characters'

# 4 视图分工 (V25 Polarizing Framework)
VIEW_COMPOSITIONS = {
    'HERO': 'product 80-85% of frame, slight 15-20 degree angled perspective for visual depth (Polarizing Element #1 Unexpected Angle), strong color contrast against neutral backdrop (Color Pop), subtle lifestyle hint in periphery (Lifestyle Hint)',
    'DETAIL': 'extreme close-up 85-95% of frame, macro on material/texture, SHALLOW depth of field, INCLUDE a human hand (varied skin tone) holding or touching the product for scale reference (Polarizing Element #2 Scale Disruption)',
    'VARIETY': '3-4 colorways or options arranged in clear visual hierarchy (fanned, stacked, or grouped, Polarizing Element #5 Arrangement Architecture), suggest motion with subtle arrangement variation (Polarizing Element #4 Motion Implication)',
    'MULTI-ANGLE': '3 views in one frame (front, three-quarter angled, detail) using unconventional angle (Polarizing #1 Unexpected Angle), neutral studio backdrop, composite layout',
}

# 16 类目 × US 专属场景 (Brooklyn/SoHo/Bushwick/Mission District 等 US 真实地名)
CATEGORY_BG = {
    'packaging': 'blurred Brooklyn loft DTC unboxing scene on reclaimed wood table, soft natural daylight from window',
    'greeting-cards': 'blurred Williamsburg dinner party table with candles and eucalyptus, golden hour warm light',
    'stickers': 'blurred Bushwick creative workspace with Hydro Flask and MacBook, natural light from skylight',
    'envelopes': 'blurred Manhattan executive desk with brass fountain pen and leather portfolio, banker lamp',
    'menus': 'blurred West Village Italian restaurant table with wine glass and linen napkin, candlelight',
    'books': 'blurred Brooklyn Heights brownstone reading nook with leather chesterfield, afternoon light',
    'posters': 'blurred Bushwick gallery wall with framed art, gallery track lighting',
    'paper-bags': 'blurred SoHo boutique sidewalk with mannequins and awning, NYC street style',
    'flyers': 'blurred Mission District San Francisco cafe entrance with chalkboard and string lights',
    'red-packets': 'blurred US Asian-American CNY family dinner table with oranges and dumplings, warm home light',
    'calendars': 'blurred Brooklyn home office with morning light through industrial windows',
    'educational': 'blurred Boston school library with reading corner and wooden shelves',
    'banners': 'blurred Brooklyn outdoor festival entrance with bunting flags and food trucks',
    'japan-doujin': 'blurred Anime NYC convention booth with standees and cosplayers, convention center lighting',
    'wedding-invitations': 'blurred Brooklyn Botanic Garden wedding ceremony with white chairs and floral arch',
    'place-cards': 'blurred Brooklyn warehouse wedding reception with long table and abundant florals',
}

# 16 类目 × US 风格产品类型
CATEGORY_PRODUCT_TYPE = {
    'packaging': 'corrugated color-printed boxes',
    'greeting-cards': 'greeting cards',
    'stickers': 'vinyl stickers',
    'envelopes': 'business envelopes',
    'menus': 'restaurant menus',
    'books': 'books',
    'posters': 'event posters',
    'paper-bags': 'paper shopping bags',
    'flyers': 'marketing flyers',
    'red-packets': 'Chinese New Year red packets',
    'calendars': 'wall and desk calendars',
    'educational': 'school exercise books',
    'banners': 'vinyl outdoor banners',
    'japan-doujin': 'doujinshi fan books',
    'wedding-invitations': 'wedding invitations',
    'place-cards': 'place cards and table cards',
}

# 16 类目 × US 英文默认 specs (因 products.ts specs 是中文, US 版用类目默认英文)
CATEGORY_DEFAULT_SPECS_EN = {
    'packaging': {'material': 'corrugated cardboard (E-flute or B-flute), 350-400gsm', 'size': 'custom sizes from 4x4x1 inch to 18x12x4 inch', 'printMethod': '4-color CMYK offset printing, optional Pantone spot color', 'finishing': 'matte or gloss lamination, foil stamping, spot UV, embossing'},
    'greeting-cards': {'material': '300-350gsm art card or matte cardstock', 'size': 'standard 5x7 inch, A2, A6, square 5x5 inch, custom', 'printMethod': '4-color CMYK offset or digital', 'finishing': 'matte or gloss lamination, foil stamping, spot UV, rounded corners, die-cut'},
    'stickers': {'material': 'vinyl (PVC), BOPP, or paper with adhesive backing', 'size': 'from 1x1 inch to 12x12 inch, custom shapes', 'printMethod': '4-color CMYK digital or offset', 'finishing': 'matte or gloss lamination, die-cut any shape, waterproof'},
    'envelopes': {'material': '80-120gsm wood-free or kraft paper', 'size': '#10 business, A2, A6, A7, DL, custom', 'printMethod': '1-4 color offset or digital', 'finishing': 'window patch, self-seal gum, foil lining'},
    'menus': {'material': '157-300gsm coated or textured paper, synthetic or laminated', 'size': 'A4, A5, 8.5x11 inch, 5.5x8.5 inch, trifold, custom', 'printMethod': '4-color CMYK offset or digital', 'finishing': 'matte or gloss lamination, spot UV, water-resistant coating'},
    'books': {'material': 'cover 200-300gsm art card; interior 80-128gsm offset paper', 'size': 'A5, B5, 6x9 inch, 8.5x11 inch, custom', 'printMethod': '4-color CMYK offset (interior B/W or color)', 'finishing': 'saddle-stitched, perfect bound, hardcover, foil stamping'},
    'posters': {'material': '128-200gsm coated or matte paper, or synthetic', 'size': 'A3, A2, A1, 18x24 inch, 24x36 inch, custom', 'printMethod': '4-color CMYK offset or large-format digital', 'finishing': 'matte or gloss lamination, UV-resistant coating, mounting'},
    'paper-bags': {'material': '170-300gsm art card or kraft paper', 'size': 'small 5x8x3 inch, medium 10x13x5 inch, large 16x20x8 inch, custom', 'printMethod': '1-4 color offset or flexo', 'finishing': 'matte or gloss lamination, ribbon or cotton handle, foil stamping'},
    'flyers': {'material': '128-200gsm coated or matte paper', 'size': 'A4, A5, A6, 8.5x11 inch, 5.5x8.5 inch, trifold', 'printMethod': '4-color CMYK offset or digital', 'finishing': 'matte or gloss lamination, spot UV, folding, scoring'},
    'red-packets': {'material': '120-157gsm red paper with gold or silver foil accents', 'size': 'standard 3.5x6.7 inch, custom', 'printMethod': '4-color + foil stamping', 'finishing': 'gold, silver, or rose gold foil stamping, embossing, spot UV'},
    'calendars': {'material': 'cover 250-350gsm art card; interior 128-200gsm coated paper', 'size': 'wall 12x18 inch or A3, desk 5x7 inch or A5, custom', 'printMethod': '4-color CMYK offset', 'finishing': 'matte or gloss lamination, wire-o or saddle-stitched binding, foil stamping'},
    'educational': {'material': 'cover 200-250gsm art card; interior 80-100gsm offset paper', 'size': 'A4, A5, B5, 8.5x11 inch, custom', 'printMethod': '1-4 color offset, B/W or color interior', 'finishing': 'saddle-stitched, perfect bound, matte or gloss lamination'},
    'banners': {'material': 'PVC vinyl (440-510gsm), mesh, or fabric', 'size': '2x4 feet, 3x6 feet, 4x8 feet, custom', 'printMethod': 'eco-solvent, solvent, or UV large-format printing', 'finishing': 'hemmed edges, grommets, pole pockets, wind slits'},
    'japan-doujin': {'material': 'cover 90-157gsm coated; interior 70-90gsm offset paper', 'size': 'A5 (5.8x8.3 inch), B5 (7.2x10.1 inch), A4, custom', 'printMethod': 'full-color cover, B/W or color interior offset/digital', 'finishing': 'saddle-stitched, perfect bound, foil cover'},
    'wedding-invitations': {'material': '250-350gsm cotton, linen, or pearlescent cardstock', 'size': '5x7 inch, A7, 4.25x5.5 inch, custom', 'printMethod': '1-4 color letterpress, offset, or digital', 'finishing': 'foil stamping, letterpress, embossing, die-cut, ribbon, vellum wrap'},
    'place-cards': {'material': '250-350gsm cotton or linen cardstock', 'size': '2x3.5 inch, 2x4 inch, tent fold 2x3.5 inch, custom', 'printMethod': '1-4 color letterpress, offset, or digital', 'finishing': 'foil stamping, letterpress, die-cut, scored tent fold'},
}

# 16 类目 × 真实小字元素
CATEGORY_SMALL_ELEMENTS = {
    'packaging': 'barcode, batch code, recycling symbol',
    'greeting-cards': 'batch number, fine gold accent, handwritten note',
    'stickers': 'batch number, eco label, small QR code',
    'envelopes': 'return address, postal mark, batch code',
    'menus': 'price column, category separator, footer mark',
    'books': 'ISBN barcode, publisher mark, spine number',
    'posters': 'event date, venue footer, organizer mark, QR code',
    'paper-bags': 'barcode sticker, eco label, store address',
    'flyers': 'contact line, hours, QR code, social handle',
    'red-packets': 'auspicious seal, denomination area, brand mark',
    'calendars': 'month header, week number, year mark, brand footer',
    'educational': 'grade mark, school name, page number, subject tag',
    'banners': 'event date, sponsor footer, contact, weather mark',
    'japan-doujin': 'circle name, event mark, page count, R-18 stamp if applicable',
    'wedding-invitations': 'couple initials, wedding date, venue, RSVP line',
    'place-cards': 'guest name line, table number, decorative motif, brand footer',
}

# 16 类目 × 2 卖点 (US, USD)
SELLING_POINTS = {
    'packaging': ('Custom Boxes | From $0.40-1.20', '100 MOQ', 'Free Design'),
    'greeting-cards': ('Greeting Cards | From $0.20-0.80', '100 MOQ', 'Foil Stamp'),
    'stickers': ('Vinyl Stickers | From $0.05-0.30', 'Waterproof', 'Die-Cut'),
    'envelopes': ('Custom Envelopes | From $0.10-0.40', '100 MOQ', 'Logo Print'),
    'menus': ('Restaurant Menus | From $1-4', 'Waterproof', 'Custom Size'),
    'books': ('Custom Books | From $3-15', 'Saddle/Hard', 'Covers Free Design'),
    'posters': ('Event Posters | From $1-5', 'A2 Size', 'UV Resistant'),
    'paper-bags': ('Shopping Bags | From $0.50-2', 'Cotton Handle', '100 MOQ'),
    'flyers': ('Marketing Flyers | From $0.10-0.50', 'Fast 3-Day', '100 MOQ'),
    'red-packets': ('CNY Red Packets | From $0.10-0.30', 'Foil Stamp', '100 MOQ'),
    'calendars': ('Custom Calendars | From $2-8', '13-Page', 'Foil Stamp'),
    'educational': ('School Books | From $0.50-3', 'K-12 OK', 'Custom Cover'),
    'banners': ('Vinyl Banners | From $5-20', 'Waterproof', 'UV Safe'),
    'japan-doujin': ('Doujinshi | From $3-10', '10 MOQ', 'A5 Size'),
    'wedding-invitations': ('Wedding Invites | From $1-5', 'Foil Stamp', '50 Sets'),
    'place-cards': ('Place Cards | From $0.10-0.30', 'Foil Cotton', '100 MOQ'),
}


# Fictional client brand (per cat, 4 brands each, idx % 4 rotation)
def get_fictional_brand(category_slug, idx):
    brands = {
        'packaging': ['Hive Packaging', 'BoxCraft Co.', 'FolioBox', 'WrapWorks Studio'],
        'greeting-cards': ['Maplewood Studio', 'Honeycomb Greetings', 'PaperCrane Co.', 'Lumen Cards'],
        'stickers': ['BriteMark', 'Wildroot Stickers', 'Stickcraft Studio', 'SunPop Designs'],
        'envelopes': ['LetterCraft', 'Ivory Mail', 'Sealed & Sent', 'Penmark Stationers'],
        'menus': ['Woodfire Bistro', 'Saffron & Sage', 'Olive Branch Kitchen', 'Birch Street Cafe'],
        'books': ['Quillhouse Press', 'Larkspur Publishing', 'Stitched Pages', 'Copper Type'],
        'posters': ['Cityline Prints', 'Boldframe Studio', 'Neon Hive', 'Plaster Press'],
        'paper-bags': ['Carrywell', 'PaperThread', 'Foldkraft', 'Loop & Leaf'],
        'flyers': ['Blueroof Studio', 'Locale Print Co.', 'Flypaper Studio', 'Twoblock Designs'],
        'red-packets': ['Fortune Fold', 'Crimson Wish', 'Knot & Coin', 'Lantern Press'],
        'calendars': ['Dayline Studio', 'Pagebound', 'Foldtime', 'Mark & Margin'],
        'educational': ['Brightleaf Learning', 'Tiny Atlas Press', 'Skillpath', 'Brightbrick'],
        'banners': ['Flagworks', 'Bannerly', 'Skyline Sign', 'Eventfold'],
        'japan-doujin': ['Sakura Studio', 'Animecraft', 'Junka Press', 'Comiket Press'],
        'wedding-invitations': ['EverAfter Press', 'GoldenHour Invites', 'Lace & Vow', 'Heirloom Weddings'],
        'place-cards': ['TableCraft Studio', 'Seating Stone', 'Folded Grace', 'Marked Moment'],
    }
    return brands.get(category_slug, ['Studio Co.'])[idx % 4]


def get_brand_motif(category_slug):
    motifs = {
        'packaging': 'geometric honeycomb',
        'greeting-cards': 'botanical florals',
        'stickers': 'abstract minimal',
        'envelopes': 'classic monogram',
        'menus': 'typographic vintage',
        'books': 'literary emblem',
        'posters': 'bold graphic',
        'paper-bags': 'minimal line art',
        'flyers': 'urban grid',
        'red-packets': 'auspicious floral',
        'calendars': 'minimal month',
        'educational': 'playful bright',
        'banners': 'bold stripe',
        'japan-doujin': 'manga line art',
        'wedding-invitations': 'floral wreath',
        'place-cards': 'elegant script',
    }
    return motifs.get(category_slug, 'elegant motif')


def get_brand_typography():
    return 'modern sans-serif (Helvetica-style)'


# Brand strip patterns (clean NAP bleed-over)
BRAND_STRIP_PATTERNS = [
    r'\s*[|·•・]\s*智印港[。\.]?',
    r'\s*[|·•・]\s*智印雲[。\.]?',
    r'\s*[|·•・]\s*智印印港[。\.]?',
    r'\s*[|·•・]\s*ZprintPro[。\.]?',
    r'\s*[|·•・]\s*ジープリント[。\.]?',
    r'\s*\|\s*ジープリント\s*$',
    r'\s*\|\s*ZprintPro\s*$',
    r'智印港[。\.]?\s*',
    r'智印雲[。\.]?\s*',
    r'ZprintPro[。\.]?\s*',
    r'ジープリント[。\.]?\s*',
    r'\*\*適合[^*]+',
    r'\*\*適配[^*]+',
    r'\*\*Best for[^*]+',
    r'\*\*適用[^*]+',
]


def strip_brands(text):
    if not text:
        return text
    out = text
    for pat in BRAND_STRIP_PATTERNS:
        out = re.sub(pat, '', out)
    out = re.sub(r'\s+', ' ', out).strip()
    out = re.sub(r'\s*。\s*。\s*。', '。', out)
    out = re.sub(r'\s*,\s*,', ',', out)
    return out.rstrip('。.,;: ').strip()


def clean_feature_text(text):
    """Strip 【】 brackets and brand bleed for features (V25)."""
    if not text:
        return text
    out = strip_brands(text)
    out = re.sub(r'[【】\[\]]', '', out)
    out = re.sub(r'^\s*\d+[\.、]\s*', '', out)  # remove "1. " "2. " prefixes
    return out.strip().rstrip('.,;: ')


def format_usd_price(base_price_en):
    """Format USD price: 0.13 -> $0.13, 1245 -> $1245, 1.0 -> $1.00"""
    if not base_price_en:
        return ''
    try:
        p = float(base_price_en)
        if p < 1:
            return f'${p:.2f}'
        elif p < 10:
            return f'${p:.2f}'
        elif p < 100:
            return f'${p:.0f}'
        else:
            return f'${p:,.0f}'
    except (ValueError, TypeError):
        return ''


def parse_skus():
    with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    sku_pattern = re.compile(
        r"id:\s*'([A-Z]+-\d+)'.*?(?=\n\s*id:\s*'[A-Z]+-\d+'|\Z)",
        re.DOTALL,
    )
    skus = []
    for m in sku_pattern.finditer(content):
        block = m.group(0)
        sku_id = m.group(1)

        def find(pat, default=''):
            mm = re.search(pat, block)
            return mm.group(1) if mm else default

        # Features[3]
        feat_match = re.search(r"features:\s*\[(.*?)\]", block, re.DOTALL)
        features = []
        if feat_match:
            for fm in re.finditer(r"['\"]([^'\"]+)['\"]", feat_match.group(1)):
                features.append(fm.group(1))
        features3 = features[:3]

        # Specs
        specs = {}
        specs_block = re.search(r"specs:\s*\{([^}]+)\}", block, re.DOTALL)
        if specs_block:
            for sm in re.finditer(r"(\w+):\s*'([^']+)'", specs_block.group(1)):
                specs[sm.group(1)] = sm.group(2)

        # Turnaround
        turnaround = find(r"turnaround:\s*'([^']+)'")

        # minQuantity
        min_qty = find(r"minQuantity:\s*(\d+)")

        # basePrice_en (NEW for V25)
        base_price_en = find(r"basePrice_en:\s*([\d.]+)")

        skus.append({
            'id': sku_id,
            'slug': find(r"slug:\s*'([^']+)'"),
            'category': find(r"category:\s*'([^']+)'"),
            'category_slug': find(r"category_slug:\s*'([^']+)'") or find(r"category:\s*'([^']+)'"),
            'nameEn': strip_brands(find(r"nameEn:\s*'([^']+)'")),
            'name_zh': strip_brands(find(r"name_zh:\s*'([^']+)'") or find(r"title_zh:\s*'([^']+)'")),
            'descriptionEn': strip_brands(find(r"descriptionEn:\s*'([^']+)'")),
            'description_zh': strip_brands(find(r"description_zh:\s*'([^']+)'")),
            'specs': {k: strip_brands(v) for k, v in specs.items()},
            'features3': [strip_brands(f) for f in features3],
            'minQuantity': min_qty,
            'turnaround': turnaround,
            'basePrice_en': base_price_en,
        })
    return skus


def build_product_details_us(sku):
    """12-field product detail string (US version, USD price from basePrice_en).
    Uses category-default English specs (because products.ts specs is in Chinese).
    """
    cat = sku['category_slug']
    specs = CATEGORY_DEFAULT_SPECS_EN.get(cat, {})
    feat3 = sku.get('features3', [])

    product_name = sku.get('nameEn', '') or sku.get('name_zh', '')
    desc = sku.get('descriptionEn', '')[:120]
    material = specs.get('material', '')
    size = specs.get('size', '')
    print_method = specs.get('printMethod', '')
    finishing = specs.get('finishing', '')
    moq = sku.get('minQuantity', '')
    turnaround = sku.get('turnaround', '')
    usd_price = format_usd_price(sku.get('basePrice_en', ''))

    lines = [
        f'Product: {product_name}.',
        f'Material: {material}.',
        f'Size: {size}.',
        f'Print: {print_method}.',
        f'Finish: {finishing}.',
    ]
    if feat3:
        cleaned = [clean_feature_text(f) for f in feat3]
        cleaned = [c for c in cleaned if c]
        if cleaned:
            lines.append('Features: ' + ' / '.join(cleaned) + '.')
    if usd_price:
        lines.append(f'Price: from {usd_price} per unit.')
    if moq:
        lines.append(f'MOQ: {moq} units.')
    if turnaround:
        lines.append(f'Turnaround: {turnaround}.')
    lines.append(f'Description: {desc}.')
    return ' '.join(lines)


def build_prompt(sku, view):
    cat = sku['category_slug']
    cfg_product = CATEGORY_PRODUCT_TYPE.get(cat, 'product')
    cfg_bg = CATEGORY_BG.get(cat, 'blurred US lifestyle scene')
    cfg_small = CATEGORY_SMALL_ELEMENTS.get(cat, 'small text')
    sp_main, sp_sub1, sp_sub2 = SELLING_POINTS.get(cat, ('Custom Print', '100 MOQ', 'Free Design'))

    sku_idx = int(re.search(r'-(\d+)$', sku['id']).group(1)) - 1
    fake_brand = get_fictional_brand(cat, sku_idx)
    motif = get_brand_motif(cat)
    typo = get_brand_typography()

    product_details = build_product_details_us(sku)
    view_comp = VIEW_COMPOSITIONS[view]

    prompt = (
        f'PRODUCTION-READY FINAL IMAGE ONLY. {US_CONTEXT}'
        f' 1:1 ratio, 8K ultra-high-definition e-commerce product photo.'
        f' {view} composition: {view_comp}.'
        f' Foreground: a {cfg_product} with fictional client brand "{fake_brand}" printed in {typo},'
        f' plus {motif} decorative pattern, and real small text elements ({cfg_small}) in neat blocks.'
        f' {product_details}'
        f' Background: {cfg_bg}. Soft natural daylight, product tack-sharp occupying 75-85% of frame.'
        f' Color palette: {LOCALE_COLORS}.'
        f' {LOCALE_AESTHETIC}'
        f' Selling point main: {sp_main}, sub: {sp_sub1}・{sp_sub2}.'
        f' Anti-garbage: {ANTI_GARBAGE}'
        f' Negative: {NEGATIVE}.'
    )
    return prompt


def main():
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', help='Output file path')
    ap.add_argument('--skus', nargs='+', help='Generate only these SKUs')
    ap.add_argument('--sample', action='store_true', help='Print first 2 SKUs to stdout')
    args = ap.parse_args()

    skus = parse_skus()
    if args.skus:
        sel = {s.split(' ')[0] for s in args.skus}
        skus = [s for s in skus if s['id'] in sel]

    out_path = Path(args.out) if args.out else OUTPUT_EN

    if args.sample:
        for sku in skus[:2]:
            print(f'\n{"="*78}\n### {sku["id"]} (V25 US-EN)')
            for view in ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE']:
                p = build_prompt(sku, view)
                print(f'\n[{view}] ({len(p)} chars)')
                print(p)
        return

    out_lines = []
    out_lines.append('V25 US-DTC EN PROMPTS | Polarizing Elements Framework | USD from basePrice_en')
    out_lines.append('=' * 78)
    out_lines.append('Generated 2026-08-24 — K3 8/24 02:30 拍板 (V25 US-DTC EN).')
    out_lines.append('KEY: 4 views use Polarizing Framework. US-context per cat. USD pricing. No ZprintPro.')
    out_lines.append('ZprintPro / 智印港 / ジープリント are NEVER rendered (file header for K3 reference only).')
    out_lines.append('Fictional client brand on product surface: e.g. Hive Packaging, Maplewood Studio, Flagworks.')
    out_lines.append('=' * 78)
    out_lines.append('')

    for sku in skus:
        seq = int(re.search(r'-(\d+)$', sku['id']).group(1))
        out_lines.append('=' * 78)
        out_lines.append(f"### SKU-{seq:02d} | {sku['id']} | {sku['slug']} | (V25 US-EN)")
        out_lines.append('')
        for view in ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE']:
            p = build_prompt(sku, view)
            out_lines.append(f"[{view}] ({len(p)} chars)")
            out_lines.append(p)
            out_lines.append('')
        out_lines.append('-' * 78)

    out_path.write_text('\n'.join(out_lines), encoding='utf-8')

    all_prompts = re.findall(r'\[(HERO|DETAIL|VARIETY|MULTI-ANGLE)\] \((\d+)\s*chars\)', out_path.read_text(encoding='utf-8'))
    char_counts = [int(c) for _, c in all_prompts]
    over = sum(1 for c in char_counts if c > 2300)
    print(f'Output: {out_path}')
    print(f'SKUs: {len(skus)}')
    print(f'Prompts: {len(char_counts)}')
    if char_counts:
        print(f'Char range: {min(char_counts)} - {max(char_counts)} (avg {sum(char_counts)//len(char_counts)})')
        print(f'Over 2300 chars: {over}/{len(char_counts)}')
        if over == 0:
            print('[PASS] ALL prompts within <=2300 char limit.')
        else:
            print(f'[WARN] {over} prompts exceed 2300 chars — need to trim.')


if __name__ == '__main__':
    main()
