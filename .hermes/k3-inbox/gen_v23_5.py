#!/usr/bin/env python3
"""
V23.5 EN prompt generator with explicit Foreground/Background template structure.

K3 8/23 07:27 拍板升级:
  - Foreground 显式化: "Design-aesthetic, color-saturated [PRODUCT] printed for
    fictional client "[BRAND]": professional typography with brand name and tagline
    (English, complete and accurate letterforms), brand-themed decorative pattern,
    real small text elements (barcode/QR/etc.) arranged in neat small-text blocks;
    no other text anywhere."
  - Background 显式化: "Softly blurred high-end in-use scene — [SCENE], neighboring
    [OBJECTS] faintly visible, product tack-sharp. This product is mainly used in
    [INDUSTRIES], choose the most fitting scene matching the foreground, with
    appropriate lighting: [LIGHTING]."

Usage:
  python gen_v23_5_en.py --skus PC-001 PKG-014 FL-003
  python gen_v23_5_en.py  # all 99 SKUs
"""
import json
import re
import sys
from pathlib import Path

WORKSPACE = Path(r'F:\zprintpro-nextjs')
PRODUCTS_FILE = WORKSPACE / 'src/data/products.ts'
OUTPUT_FILE = WORKSPACE / 'seedream/v23.5-prompts-en.txt'

# ============================================================================
# FICTIONAL CLIENT MATRIX (16 categories x 4 clients, per locale)
# Each client: (brand_name, tagline)
# ============================================================================
FICTIONAL_CLIENTS_EN = {
    'greeting-cards': [
        ('Maplewood Studio', 'Warm Wishes Always'),
        ('Honeycomb Greetings', 'Notes From The Heart'),
        ('PaperCrane Co.', 'Folded With Love'),
        ('Lumen Cards', 'Light In Every Word'),
    ],
    'stickers': [
        ('BriteMark', 'Stick With What You Love'),
        ('Wildroot Stickers', 'Born To Be Wild'),
        ('Stickcraft Studio', 'Made To Stick'),
        ('SunPop Designs', 'Pop Your World'),
    ],
    'envelopes': [
        ('LetterCraft', 'Every Word Counts'),
        ('Ivory Mail', 'Sealed In Style'),
        ('Sealed & Sent', 'From Us To You'),
        ('Penmark Stationers', 'Write Your Story'),
    ],
    'menus': [
        ('Woodfire Bistro', 'Cooked Over Flame'),
        ('Saffron & Sage', 'Spice Of Life'),
        ('Olive Branch Kitchen', 'Fresh From The Garden'),
        ('Birch Street Cafe', 'Brewed With Heart'),
    ],
    'books': [
        ('Quillhouse Press', 'Words That Last'),
        ('Larkspur Publishing', 'Stories In Bloom'),
        ('Stitched Pages', 'Bound By Hand'),
        ('Copper Type', 'Set In Tradition'),
    ],
    'packaging': [
        ('BoxCraft Co.', 'Built To Impress'),
        ('Hive Packaging', 'Thoughtfully Packed'),
        ('FolioBox', 'Boxed With Care'),
        ('WrapWorks Studio', 'Wrap Your Story'),
    ],
    'posters': [
        ('Cityline Prints', 'Print That Speaks'),
        ('Boldframe Studio', 'Frame Your Vision'),
        ('Neon Hive', 'Glow On The Wall'),
        ('Plaster Press', 'Pressed In Color'),
    ],
    'paper-bags': [
        ('Carrywell', 'Carry It Proud'),
        ('PaperThread', 'Stitched In Paper'),
        ('Foldkraft', 'Folded Strong'),
        ('Loop & Leaf', 'Carried With Care'),
    ],
    'flyers': [
        ('Blueroof Studio', 'Print That Stands Out'),
        ('Locale Print Co.', 'Local Loud & Clear'),
        ('Flypaper Studio', 'Stuck On Quality'),
        ('Twoblock Designs', 'Two Blocks Ahead'),
    ],
    'red-packets': [
        ('Fortune Fold', 'Folded With Fortune'),
        ('Crimson Wish', 'Wishes In Crimson'),
        ('Knot & Coin', 'Tied With Luck'),
        ('Lantern Press', 'Lit By Tradition'),
    ],
    'calendars': [
        ('Dayline Studio', 'Mark Every Day'),
        ('Pagebound', 'Turn The Page'),
        ('Foldtime', 'Time Folded Daily'),
        ('Mark & Margin', 'Marked In Time'),
    ],
    'educational': [
        ('Brightleaf Learning', 'Learn & Grow'),
        ('Tiny Atlas Press', 'Small Pages, Big World'),
        ('Skillpath', 'Path To Mastery'),
        ('Brightbrick', 'Build With Knowledge'),
    ],
    'banners': [
        ('Flagworks', 'Wave It Loud'),
        ('Bannerly', 'Stand Out Tall'),
        ('Skyline Sign', 'Above The Crowd'),
        ('Eventfold', 'Folded For Impact'),
    ],
    'japan-doujin': [
        ('Sakura Studio', 'Blossoms In Ink'),
        ('Animecraft', 'Crafted For Fans'),
        ('Junka Press', 'Pure Fan Passion'),
        ('Comiket 2026', 'Drawn For The Circle'),
    ],
    'wedding-invitations': [
        ('EverAfter Press', 'Forever Begins Here'),
        ('GoldenHour Invites', 'Written In Gold'),
        ('Lace & Vow', 'Laced With Promises'),
        ('Heirloom Weddings', 'Kept For Generations'),
    ],
    'place-cards': [
        ('TableCraft Studio', 'Set The Table'),
        ('Seating Stone', 'A Place For Everyone'),
        ('Folded Grace', 'Graced In Paper'),
        ('Marked Moment', 'Mark Your Seat'),
    ],
}

# ============================================================================
# PER-LOCALE COLOR PALETTE STRATEGY (K3 8/23 07:46 拍板, v23.5.1 16:20 修订)
# 关键: 必须有"bright transparent clear" 质量信号, 避免阴天蒙蒙
# ============================================================================
COLOR_PALETTE_EN = (
    "Color palette: US DTC 'Quiet Luxury' — warm neutrals (camel, ivory, taupe, navy, forest green) "
    "with saturated accent (burgundy, oxblood, emerald, gold); color-saturated but tasteful, "
    "NOT muted earth tones, NOT garish neon, NOT pastel washed-out; BRIGHT, WELL-LIT, "
    "high clarity and transparency, NOT dim, NOT muddy, NOT hazy"
)

COLOR_PALETTE_JA = (
    "Color palette: 日本美學 '侘び寂び' + vivid-traditional — 3 伝統色 (朱紅 vermilion, 藍染 indigo, "
    "抹茶 matcha) as accent against large areas of warm natural neutrals (米白, 浅茶, 雾灰, 淡麦, 砂色); "
    "vivid but refined, NOT Western-bright, NOT garish, NOT cluttered; generous white space with "
    "subtle premium accents; 少即是多 (less is more), 細部即奢華 (detail is luxury); seasonal "
    "motifs (sakura, momiji, bamboo) for natural warmth; BRIGHT CLEAR DAYLIGHT, not overcast, "
    "not dim, not muddy; matte or soft-touch finish on premium materials"
)

COLOR_PALETTE_ZHHK = (
    "Color palette: 香港送禮美學 '吉祥鮮活暖調' — auspicious saturated colors (大紅 bright Chinese red, "
    "金 rich gold, 桃粉 peach pink, 橙 vibrant orange, 紫紅 magenta) as primary visual force, "
    "complemented by warm ivory and gold leaf accents; vibrant, rich, color-saturated, full of "
    "東方節慶氛圍 (Eastern festive atmosphere); STRICTLY AVOID white, black, gray, dull blue "
    "(哀悼 mourning and 陰沉 gloom in Hong Kong culture); NOT muted, NOT washed out, NOT "
    "minimalist Western Scandinavian; BRIGHT CRISP DAYLIGHT, transparent clear, NOT dim, "
    "NOT overcast; every color signals 好運 (good luck) and 繁榮 (prosperity)"
)


# ============================================================================
# PER-LOCALE BADGE RULE (V23.2 起固化, v23.5 simplified 误删, v23.5.1 回归)
# HK 爆炸贴 (右上) + JA 信息带 (左上) + EN 无 badge (Amazon 干净主图)
# ============================================================================
BADGE_RULE = {
    'en': "",  # No badge, clean main image (Amazon convention)
    'ja': "JA HERO: 左上角信息带 (neutral color, 短字 12 字符内, 日文卖点 e.g. 「高品質印刷」「短納期対応」).",
    'zh-hk': "zh-hk HERO: 右上角大紅色爆炸贴 (大中国紅, 非价格类卖点, 短字 ≤6 字 繁中, e.g. 視類目選「免刀模費」「順豐本地」「100張起印」「燙金工藝」「防水耐候」)."
}

# Per-category HK selling points (for the explosion badge) - 2-3 short tags each
BADGE_CONTENT_ZHHK = {
    'greeting-cards': '「燙金工藝」',
    'stickers': '「防水耐撕」',
    'envelopes': '「燙金信封」',
    'menus': '「防水材質」',
    'books': '「精裝膠裝」',
    'packaging': '「免刀模費」',
    'posters': '「防水材質」',
    'paper-bags': '「棉繩手柄」',
    'flyers': '「100張起印」',
    'red-packets': '「燙金新年」',
    'calendars': '「13頁設計」',
    'educational': '「學校專用」',
    'banners': '「防水耐候」',
    'japan-doujin': '「同人誌印刷」',
    'wedding-invitations': '「燙金工藝」',
    'place-cards': '「燙金棉紙」',
}

BADGE_CONTENT_JA = {
    'greeting-cards': '「高品質印刷」',
    'stickers': '「防水耐光」',
    'envelopes': '「上質紙」',
    'menus': '「防水対応」',
    'books': '「上製本」',
    'packaging': '「型抜き無料」',
    'posters': '「防水対応」',
    'paper-bags': '「綿ロープ」',
    'flyers': '「100枚から」',
    'red-packets': '「箔押し」',
    'calendars': '「13ページ」',
    'educational': '「学校向け」',
    'banners': '「防水耐候」',
    'japan-doujin': '「同人誌印刷」',
    'wedding-invitations': '「箔押し」',
    'place-cards': '「箔押し」',
}


# ============================================================================
# PER-CATEGORY CONFIG (16 categories)
# Fields: product_type_en, small_elements_en, in_use_scene_en, related_objects_en,
#         industry_scenarios_en, lighting_en
# ============================================================================
CATEGORY_CONFIG_EN = {
    'greeting-cards': {
        'product_type': 'greeting cards',
        'small_elements': 'decorative pattern strips, fine gold accent lines',
        'in_use_scene': 'holiday dinner table with cards arranged beside vintage tableware and brass candle holders',
        'related_objects': 'gift wrap, ribbon, evergreen sprigs, hand-written notes',
        'industry_scenarios': 'Christmas / Thanksgiving / Valentine / wedding gift / corporate events',
        'lighting': 'BRIGHT clear daylight with soft warm window light and subtle candle accent, NOT dim, NOT overcast, NOT muddy',
    },
    'stickers': {
        'product_type': 'vinyl stickers',
        'small_elements': 'batch number, eco-friendly ink label, small QR corner',
        'in_use_scene': 'creative workspace with stickers decorating a laptop, Hydro Flask and notebook',
        'related_objects': 'succulents, craft tools, pen holder, smartphone',
        'industry_scenarios': 'small business branding / laptop decoration / product packaging / event giveaways',
        'lighting': 'BRIGHT natural daylight from a clear sky window, NOT dim, NOT overcast, NOT muddy',
    },
    'envelopes': {
        'product_type': 'business envelopes',
        'small_elements': 'return address block, postal indicia, batch code',
        'in_use_scene': 'executive desk with envelopes stacked, a fountain pen and wax seal ready',
        'related_objects': 'leather blotter, brass paperweight, bookshelf, reading glasses',
        'industry_scenarios': 'law firm / real estate / wedding invitation suite / direct mail marketing',
        'lighting': 'BRIGHT natural window daylight with clear desk lamp fill, NOT dim, NOT overcast, NOT muddy',
    },
    'menus': {
        'product_type': 'restaurant menus',
        'small_elements': 'price column, category separator lines, footer establishment mark',
        'in_use_scene': 'intimate restaurant table with menu propped, wine glass and beeswax candle nearby',
        'related_objects': 'cutlery, linen napkin, salt cellar, small flower vase',
        'industry_scenarios': 'fine dining / izakaya / bistro / hotel restaurant / cha chaan teng',
        'lighting': 'BRIGHT warm restaurant daylight with clear window light, NOT dim, NOT overcast, NOT muddy',
    },
    'books': {
        'product_type': 'books',
        'small_elements': 'ISBN barcode, publisher mark, price tag, spine category number',
        'in_use_scene': 'chesterfield armchair with floor lamp and a stack of books on a side table',
        'related_objects': 'leather-bound volumes, reading glasses, coffee cup, throw blanket',
        'industry_scenarios': 'self-publishing / corporate annual report / photo book / art catalog',
        'lighting': 'BRIGHT clear daylight with reading lamp, NOT dim, NOT overcast, NOT muddy',
    },
    'packaging': {
        'product_type': 'premium packaging box',
        'small_elements': 'barcode, net weight line, recycling symbol, batch code',
        'in_use_scene': 'boutique gifting counter with box opened, tissue paper fanning out, ribbon nearby',
        'related_objects': 'eucalyptus sprigs, silk ribbon, brass scissors, price tag',
        'industry_scenarios': 'beauty / jewelry / electronics / corporate gifting / wedding favors',
        'lighting': 'BRIGHT clear studio light with bright soft shadow, NOT dim, NOT overcast, NOT muddy',
    },
    'posters': {
        'product_type': 'event posters',
        'small_elements': 'event date line, venue footer, organizer mark, small QR for tickets',
        'in_use_scene': 'urban gallery wall with framed posters hung in a row, exposed brick backdrop',
        'related_objects': 'picture lights, wood floor, coffee table books, potted plant',
        'industry_scenarios': 'concert / exhibition / film festival / retail storefront promotion',
        'lighting': 'BRIGHT clear gallery daylight with bright clean accent, NOT dim, NOT overcast, NOT muddy',
    },
    'paper-bags': {
        'product_type': 'paper shopping bags',
        'small_elements': 'barcode sticker, eco-friendly ink label, store address footer',
        'in_use_scene': 'boutique sidewalk with bag held in hand, fashion district street scene',
        'related_objects': 'boutique storefront, mannequins, awning, cobblestone',
        'industry_scenarios': 'clothing boutique / gift shop / coffee shop / farmers market / department store',
        'lighting': 'BRIGHT clear outdoor daylight (sunny day), NOT dim, NOT overcast, NOT muddy',
    },
    'flyers': {
        'product_type': 'marketing flyers',
        'small_elements': 'contact line, business hours footer, QR code, social handle',
        'in_use_scene': 'community bulletin board with flyers pinned, café entrance in soft focus',
        'related_objects': 'corkboard, push pins, takeaway coffee cup, chalkboard sign',
        'industry_scenarios': 'restaurant grand opening / real estate listing / fitness class promotion / community event',
        'lighting': 'BRIGHT natural daylight with bright window-side fill, NOT dim, NOT overcast, NOT muddy',
    },
    'red-packets': {
        'product_type': 'Chinese New Year red packets',
        'small_elements': 'auspicious seal, denomination area, brand mark, small decorative knot',
        'in_use_scene': 'Lunar New Year family gathering with red packets fanned on a wooden table',
        'related_objects': 'mandarin oranges, mahjong tiles, tea set, red lantern',
        'industry_scenarios': 'Spring Festival corporate gifting / wedding banquet / brand CNY campaign / Asian-American family tradition',
        'lighting': 'BRIGHT clear festival daylight with warm golden accent, NOT dim, NOT overcast, NOT muddy',
    },
    'calendars': {
        'product_type': 'wall and desk calendars',
        'small_elements': 'month header strip, small week number, year mark, brand footer',
        'in_use_scene': 'modern home office with calendar mounted on wall and a desk stand nearby',
        'related_objects': 'coffee mug, succulent, pen holder, stack of books',
        'industry_scenarios': 'corporate year-end gifts / real estate / photography studio / school',
        'lighting': 'BRIGHT clear morning daylight with bright window fill, NOT dim, NOT overcast, NOT muddy',
    },
    'educational': {
        'product_type': 'school exercise books and workbooks',
        'small_elements': 'grade level mark, school name block, page number footer, subject tag',
        'in_use_scene': 'elementary school library with exercise books open on a wooden desk',
        'related_objects': 'pencil case, ruler, crayons, child reading corner',
        'industry_scenarios': 'K-12 schools / tutoring centers / homeschool / training academies',
        'lighting': 'BRIGHT clear classroom daylight with bright natural window side-fill, NOT dim, NOT overcast, NOT muddy',
    },
    'banners': {
        'product_type': 'vinyl outdoor banners',
        'small_elements': 'event date strip, sponsor footer, contact line, weather-resistance mark',
        'in_use_scene': 'outdoor festival entrance with banner hanging on frame, colorful bunting overhead',
        'related_objects': 'food truck row, bunting flags, festival entry arch, sunshine',
        'industry_scenarios': 'trade show / grand opening / sports event / real estate open house / community fair',
        'lighting': 'BRIGHT direct outdoor sun on a clear sunny day, NOT dim, NOT overcast, NOT muddy',
    },
    'japan-doujin': {
        'product_type': 'doujinshi fan books',
        'small_elements': 'circle name, event mark, page count, R-18 age stamp if applicable',
        'in_use_scene': 'Comiket-style doujin booth with books fanned, character standee visible',
        'related_objects': 'cherry blossom petals, tablecloth, acrylic stand, fellow creators',
        'industry_scenarios': 'Comiket / anime fan convention / indie comic circle / school club event',
        'lighting': 'BRIGHT clear convention hall daylight with bright fill, NOT dim, NOT overcast, NOT muddy',
    },
    'wedding-invitations': {
        'product_type': 'wedding invitations and stationery suite',
        'small_elements': 'couple initials, wedding date, venue footer, RSVP line',
        'in_use_scene': 'bright American garden wedding with invitations propped on a reception table',
        'related_objects': 'florals, golden-hour light, white chapel, greenery, envelope set',
        'industry_scenarios': 'weddings / destination weddings / hotel weddings / chapel ceremonies',
        'lighting': 'BRIGHT clear golden-hour daylight, NOT dim, NOT overcast, NOT muddy',
    },
    'place-cards': {
        'product_type': 'place cards and table cards',
        'small_elements': 'guest name line, table number, decorative motif, brand footer',
        'in_use_scene': 'wedding reception table with place cards arranged on plates beside florals',
        'related_objects': 'candles, escort table, linen runner, small flower arrangement',
        'industry_scenarios': 'weddings / hotel banquets / fine dining restaurants / corporate galas',
        'lighting': 'BRIGHT clear reception daylight with bright window fill, NOT dim, NOT overcast, NOT muddy',
    },
}

# ============================================================================
# VIEW COMPOSITIONS (compressed: keep only key directives, target 2100-2500 chars total)
# ============================================================================
VIEW_COMPOSITIONS = {
    'HERO': 'product centered 80-85% of frame, clean margin, slight angled perspective for depth',
    'DETAIL': 'extreme close-up 85-95% of frame, macro focus on material/texture/edge, shallow DoF',
    'VARIETY': '3-4 designs/colorways in cohesive in-use scene; human hand interacting with one variant for scale/trust',
    'MULTI-ANGLE': '3 views (front, angled, detail) in one frame, neutral studio backdrop, soft diffused lighting',
    'SPREAD': 'full spread opened flat 90% of frame, all pieces visible side-by-side',
}

# ============================================================================
# NEGATIVE LIST (v23.5.1 16:20 修订: 加 dim/cloudy/muddy/hazy 禁用项)
# ============================================================================
NEGATIVE_EN = (
    "blurry, watermark, distorted, ugly artifacts, malformed, overexposed, underexposed, "
    "dim lighting, dark moody, bad cropping, subject cut off, object duplication, "
    "autoClaw AI watermark, cheap plastic texture, floating product, tacky aesthetic, "
    "violate physics, gibberish text, misspelled words, placeholder text, any text beyond "
    "specified brand name and tagline, hex color codes, font names, technical parameter text "
    "on product, flat unassembled sheet shown as finished, "
    "muted desaturated colors, washed out, gray dull, faded, garish neon, "
    "Chinese/Japanese characters in en image, "
    "overcast, cloudy, muddy, hazy, foggy, low-contrast, opaque air, dim atmosphere"
)

NEGATIVE_JA = (
    "blurry, watermark, distorted, ugly artifacts, malformed, overexposed, underexposed, "
    "dim lighting, dark moody, bad cropping, subject cut off, object duplication, "
    "autoClaw AI watermark, cheap plastic texture, floating product, tacky aesthetic, "
    "violate physics, gibberish text, misspelled words, placeholder text, any text beyond "
    "specified brand name and tagline, hex color codes, font names, technical parameter text, "
    "flat unassembled sheet shown as finished, English/Chinese in ja image, "
    "Western high-saturation neon, garish colors, cluttered without white space, "
    "loud visual noise, excessive ornamentation, "
    "overcast, cloudy, muddy, hazy, foggy, low-contrast, opaque air, dim atmosphere"
)

NEGATIVE_ZHHK = (
    "blurry, watermark, distorted, ugly artifacts, malformed, overexposed, underexposed, "
    "dim lighting, dark moody, bad cropping, subject cut off, object duplication, "
    "autoClaw AI watermark, cheap plastic texture, floating product, tacky aesthetic, "
    "violate physics, gibberish text, misspelled words, placeholder text, any text beyond "
    "specified brand name and tagline, hex color codes, font names, technical parameter text, "
    "flat unassembled sheet shown as finished, "
    "white, black, gray, dull blue, muted desaturated, washed out, faded, "
    "simplified Chinese (must use traditional 繁體), Scandinavian minimal, "
    "English/Japanese in zh-hk image, uncelebratory, gloomy, garish neon, "
    "overcast, cloudy, muddy, hazy, foggy, low-contrast, opaque air, dim atmosphere"
)

# ============================================================================
# MARKET AESTHETIC (v23.5.1 16:20 修订: 加 "bright vivid and not dim" 强约束)
# ============================================================================
MARKET_AESTHETIC_EN = (
    "Premium US DTC brand aesthetic. BRIGHT, VIVID, CRISP and not dim. "
    "Photorealistic commercial photography, sharp focus, clear bright lighting, "
    "true-to-life texture, premium honest studio quality, logical consistency with "
    "real-world use, warm trustworthy clean lifestyle visual, shot on a clear bright day"
)
MARKET_AESTHETIC_JA = (
    "Premium Japanese aesthetic with 侘び寂び sense of beauty. BRIGHT, VIVID, CRISP and not dim. "
    "Photorealistic commercial photography, sharp focus, clear bright lighting, true-to-life "
    "texture, premium honest studio quality, logical consistency with real-world use, "
    "warm refined lifestyle visual, clear bright daylight, transparent clear air"
)
MARKET_AESTHETIC_ZHHK = (
    "Premium Hong Kong lifestyle aesthetic (港式生活視覺 cosmopolitan vibrant refined celebratory). "
    "BRIGHT, VIVID, CRISP and not dim. Photorealistic commercial photography, sharp focus, "
    "clear bright lighting, true-to-life texture, premium honest studio quality, "
    "logical consistency with real-world use, warm trustworthy lifestyle visual, "
    "clear bright daylight, transparent clear air"
)


def parse_skus():
    """Extract 99 SKU data from products.ts."""
    with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    sku_pattern = re.compile(
        r"id:\s*'([A-Z]+-\d+)'.*?(?=\n\s*id:\s*'[A-Z]+-\d+'|\Z)",
        re.DOTALL,
    )
    skus = {}
    for m in sku_pattern.finditer(content):
        block = m.group(0)
        sku_id = m.group(1)

        def find(pat, default=''):
            mm = re.search(pat, block)
            return mm.group(1) if mm else default

        sku_code = find(r"sku_code:\s*'([^']+)'")
        slug = find(r"slug:\s*'([^']+)'")
        category = find(r"category:\s*'([^']+)'")
        category_slug = find(r"category_slug:\s*'([^']+)'") or category
        desc_en = find(r"descriptionEn:\s*'([^']+)'")
        seo_m = re.search(r"en:\s*'(zprintpro-[a-z0-9-]+en\.webp)'", block)
        seo_filename = seo_m.group(1) if seo_m else ''

        skus[sku_id] = {
            'id': sku_id, 'sku_code': sku_code, 'slug': slug,
            'category': category, 'category_slug': category_slug,
            'description_en': desc_en, 'seo_filename': seo_filename,
        }
    return skus


def get_fictional_client(sku: dict, locale: str = 'en') -> tuple:
    """Return (brand, tagline) for the SKU based on category + SKU order + locale."""
    cat = sku['category_slug']
    matrix = {
        'en': FICTIONAL_CLIENTS_EN,
        'ja': FICTIONAL_CLIENTS_JA,
        'zh-hk': FICTIONAL_CLIENTS_ZHHK,
    }.get(locale, FICTIONAL_CLIENTS_EN)
    clients = matrix.get(cat, [('Studio Co.', 'Made With Care')])
    m = re.search(r'-(\d+)$', sku['id'])
    idx = (int(m.group(1)) - 1) % 4 if m else 0
    return clients[idx]


def get_category_config(sku: dict, locale: str = 'en') -> dict:
    cat = sku['category_slug']
    config_map = {
        'en': CATEGORY_CONFIG_EN,
        'ja': CATEGORY_CONFIG_JA,
        'zh-hk': CATEGORY_CONFIG_ZHHK,
    }.get(locale, CATEGORY_CONFIG_EN)
    return config_map.get(cat, {
        'product_type': 'custom printed product',
        'small_elements': 'brand mark, batch code, small QR',
        'in_use_scene': 'clean in-use scene with the product prominently displayed',
        'related_objects': 'related lifestyle props, supporting items',
        'industry_scenarios': 'small business / corporate / personal use',
        'lighting': 'natural daylight with soft fill',
    })


# ============================================================================
# JA / zh-hk 矩阵 (K3 8/23 07:46 拍板: 3 locale independent, same semantic structure)
# These are K3-aligned translated brands/taglines. For full category config
# (product_type / scenes / small_elements per category) the user can use
# the EN CATEGORY_CONFIG as fallback template and translate as needed.
# ============================================================================
FICTIONAL_CLIENTS_JA = {
    'greeting-cards': [
        ('ハニカムグリーティング', '心からの便りを'),
        ('ペーパークレーン社', '愛を込めて折る'),
        ('ルーメンカード', '言葉に光を添えて'),
        ('メイプルウッド工房', 'いつも温かな願いを'),
    ],
    'stickers': [
        ('ブライトマーク', '好きで彩る毎日'),
        ('ワイルドルート', '自由に貼ろう'),
        ('スティッククラフト', 'しっかり貼る、自由に彩る'),
        ('サンポップデザイン', ('世界をポップに')),
    ],
    'envelopes': [
        ('レタークラフト', '一語一語を大切に'),
        ('アイボリーメイル', '上品に封じる'),
        ('シールドアンドセンド', 'あなたから、誰かへ'),
        ('ペンマーク', 'あなたの物語を書く'),
    ],
    'menus': [
        ('薪火ビストロ', '炎で烹る'),
        ('サフランアンドセイジ', '人生のスパイス'),
        ('オリーブブランチ', '畑から新鮮に'),
        ('バーチ通りカフェ', '心を込めて淹れる'),
    ],
    'books': [
        ('クイルハウス出版', '長く残る言葉'),
        ('ラークスパー出版', '花開く物語'),
        ('スティッチドページ', '手で綴じた頁'),
        ('カッパータイプ', '伝統を組む'),
    ],
    'packaging': [
        ('ボックスクラフト社', '印象的に作る'),
        ('ハイブパッケージング', '心を込めて包装'),
        ('フォリオボックス', '箱に思いを込めて'),
        ('ラップワークス', '物語を包む'),
    ],
    'posters': [
        ('シティライン印刷', '語るを印刷する'),
        ('ボールドフレーム', '視覚をかざる'),
        ('ネオンヴハイブ', '壁に煌めく'),
        ('プラスタープレス', '色彩で押す'),
    ],
    'paper-bags': [
        ('キャリーウェル', '誇りを持って運ぶ'),
        ('ペーパースレッド', '紙で綴る'),
        ('フォールドクラフト', '丈夫に折る'),
        ('ループアンドリーフ', '心を込めて運ぶ'),
    ],
    'flyers': [
        ('ブルールーフ', '目を引く印刷'),
        ('ローカル印刷社', 'ローカル、鮮明に'),
        ('フライペーパー', '品質で貼る'),
        ('ツーブロック', '一歩先を行く'),
    ],
    'red-packets': [
        ('フォーチュンフォールド', '福を折る'),
        ('クリムゾンウィッシュ', '深紅の願い'),
        ('ノットアンドコイン', '縁と幸運を結ぶ'),
        ('ランタンプレス', '伝統を灯す'),
    ],
    'calendars': [
        ('デイライン工房', '一日一日を刻む'),
        ('ページバウンド', '頁をめくる'),
        ('フォールドタイム', '日々を折る'),
        ('マークアンドマージン', '余白に時を記す'),
    ],
    'educational': [
        ('ブライトリーフ学習', '学び、育つ'),
        ('タイニーアトラス出版', '小さな頁、大きな世界'),
        ('スキルパス', (' mastery への道')),
        ('ブライトブリック', '知識で築く'),
    ],
    'banners': [
        ('フラッグワークス', '大きく掲げよう'),
        ('バンナリー', '高く目立つ'),
        ('スカイラインサイン', '人垣の上に'),
        ('イベントフォールド', 'ンパクトを折る'),
    ],
    'japan-doujin': [
        ('桜スタジオ', '墨と花'),
        ('アニメクラフト', 'ファンのために'),
        ('純化プレス', '純粋な情熱'),
        ('コミケット二〇二六', 'サークルのために'),
    ],
    'wedding-invitations': [
        ('エバーアフター印刷', '永遠はここから'),
        ('ゴールデンハー招待状', '金色に綴る'),
        ('レースアンドヴォウ', '約束を包む'),
        ('ヘアルームウェディング', '世代を越えて'),
    ],
    'place-cards': [
        ('テーブルクラフト', '席を調える'),
        ('シーティングストーン', '一人ひとりに席を'),
        ('フォールドグレース', '和紙に座を彩る'),
        ('マークドモーメント', '瞬間を記す席札'),
    ],
}

FICTIONAL_CLIENTS_ZHHK = {
    'greeting-cards': [
        ('蜂巢賀卡', '用心的祝福'),
        ('紙鶴手作', '摺出心意'),
        ('流光賀卡', '字裡有光'),
        ('楓葉工作室', '溫暖祝福長伴'),
    ],
    'stickers': [
        ('炫彩貼紙', '貼出所愛'),
        ('野根貼紙', '自由張貼'),
        ('貼藝工坊', '貼得牢固'),
        ('日陽設計', '跳出你的世界'),
    ],
    'envelopes': [
        ('信藝工坊', '每字都珍重'),
        ('象牙郵箋', '優雅封存'),
        ('封好寄出', '從你到他'),
        ('筆跡文具', '寫你的故事'),
    ],
    'menus': [
        ('薪火小館', '以火烹調'),
        ('藏紅花與鼠尾草', '人生香料'),
        ('橄欖枝廚房', '田園新鮮'),
        ('樺樹街咖啡', '用心沖煮'),
    ],
    'books': [
        ('鵝羽筆出版', '雋永文字'),
        ('燕草出版', '綻放的敘事'),
        ('縫線書坊', '手工裝幀'),
        ('銅活字', '傳統排版'),
    ],
    'packaging': [
        ('盒藝工坊', '造出印象'),
        ('蜂巢包裝', '用心包裝'),
        ('對開盒作', '盒中有情'),
        ('包藝工作室', '包裹你的故事'),
    ],
    'posters': [
        ('城市線印刷', '印刷發聲'),
        ('膽識框藝', '框住願景'),
        ('霓虹蜂巢', '牆上微光'),
        ('石膏壓印', '色彩壓印'),
    ],
    'paper-bags': [
        ('提得穩', '帶著自豪'),
        ('紙線工坊', '紙中穿線'),
        ('折得牢', '強韌折成'),
        ('繩葉工坊', '用心攜帶'),
    ],
    'flyers': [
        ('藍頂工作室', '吸睛印刷'),
        ('本地印刷', '在地、清晰'),
        ('飛紙工坊', '以質取勝'),
        ('雙疊設計', '走在前端'),
    ],
    'red-packets': [
        ('福摺工坊', '摺出福氣'),
        ('深紅祝願', '硃紅祝願'),
        ('結與錢', '繫上好運'),
        ('燈籠印坊', '點亮傳統'),
    ],
    'calendars': [
        ('日線工坊', '標記每個日子'),
        ('頁裝日曆', '翻開時間'),
        ('摺時', '日日摺起'),
        ('標記餘白', '餘白中記時'),
    ],
    'educational': [
        ('亮葉學習', '學中成長'),
        ('小地圖出版', '小頁大世界'),
        ('技路', ('技藝之道')),
        ('亮磚', '知識築起'),
    ],
    'banners': [
        ('旗工坊', '高高舉起'),
        ('橫幅藝', '傲然聳立'),
        ('天際標牌', '人潮之上'),
        ('活動摺', '摺出衝擊'),
    ],
    'japan-doujin': [
        ('櫻花工坊', '墨中花開'),
        ('動漫工藝', '為同好而製'),
        ('純化出版', '純粹熱情'),
        ('コミケット二〇二六', '為社團而繪'),
    ],
    'wedding-invitations': [
        ('永恆印坊', '永恆由此起'),
        ('金時辰邀請函', '以金書寫'),
        ('蕾絲與誓', '繫以承諾'),
        ('傳家婚卡', '世代珍藏'),
    ],
    'place-cards': [
        ('席藝工坊', '排好席位'),
        ('安席石', '人人有座'),
        ('摺韻', '紙上韻致'),
        ('標記此刻', '此刻有座'),
    ],
}

# JA / zh-hk category configs - using EN as semantic template, translated labels
# (For now, fall back to EN. User can extend per-category in next iteration.)
CATEGORY_CONFIG_JA = CATEGORY_CONFIG_EN  # TODO: translate
CATEGORY_CONFIG_ZHHK = CATEGORY_CONFIG_EN  # TODO: translate


def build_prompt(sku: dict, view: str, locale: str = 'en') -> str:
    """Build prompt per locale. Each locale has its own fictional client + template."""
    brand, tagline = get_fictional_client(sku, locale)
    cfg = get_category_config(sku, locale)
    composition = VIEW_COMPOSITIONS[view]

    # Product description (cap at 250 chars for token economy, V23.5 simplified)
    if locale == 'ja':
        product_desc = sku.get('descriptionJa', sku.get('description_en', ''))
    elif locale == 'zh-hk':
        product_desc = sku.get('description_zh', sku.get('description', sku.get('description_en', '')))
    else:
        product_desc = sku.get('description_en', '')

    # Truncate description for token economy
    if len(product_desc) > 280:
        for cut in ['. ', '! ', '? ']:
            idx = product_desc.find(cut, 0, 280)
            if idx > 0:
                product_desc = product_desc[:idx+1]
                break
        else:
            product_desc = product_desc[:277] + '...'

    # View-specific clause
    view_specific = ''
    if view == 'VARIETY':
        view_specific = " (3-4 different designs or colorways arranged together)"
    elif view == 'MULTI-ANGLE':
        view_specific = " (3 views of the same product in one clean frame, neutral studio background)"

    # Badge clause (HERO only) - v23.5.1 16:20 regression fix
    badge_clause = ''
    if view == 'HERO':
        if locale == 'en':
            badge_clause = ''  # No badge (Amazon clean main image)
        elif locale == 'ja':
            badge_ja = BADGE_CONTENT_JA.get(sku['category_slug'], '「高品質印刷」')
            badge_clause = f" {BADGE_RULE['ja']} Use the specific selling point {badge_ja} for this category."
        else:  # zh-hk
            badge_zhhk = BADGE_CONTENT_ZHHK.get(sku['category_slug'], '「燙金工藝」')
            badge_clause = f" {BADGE_RULE['zh-hk']} Use the specific selling point {badge_zhhk} for this category."

    # Build per-locale template (V23.5 simplified: target 2100-2500 chars)
    if locale == 'en':
        return (
            f"Square 1:1 photorealistic e-commerce product photo, 8K UHD. Composition: {composition}.\n"
            f"\n"
            f"Foreground: Design-aesthetic, color-saturated {cfg['product_type']}{view_specific} "
            f"printed for fictional client \"{brand}\": brand name \"{brand}\" and tagline "
            f"\"{tagline}\" in English (complete, accurate) printed in professional typography on the "
            f"product surface, with brand-themed decorative pattern, plus real small text elements "
            f"({cfg['small_elements']}) in neat blocks; no other text.\n"
            f"{badge_clause}\n"
            f"\n"
            f"Background: Softly blurred in-use scene — {cfg['in_use_scene']}, neighboring "
            f"{cfg['related_objects']} faintly visible, product tack-sharp. Mainly used in "
            f"{cfg['industry_scenarios']}; choose the most fitting scene with lighting: {cfg['lighting']}.\n"
            f"\n"
            f"Product: {product_desc}\n"
            f"\n"
            f"{COLOR_PALETTE_EN}.\n"
            f"{MARKET_AESTHETIC_EN}.\n"
            f"\n"
            f"Negative: {NEGATIVE_EN}"
        )
    elif locale == 'ja':
        return (
            f"正方形 1:1 写実 eコマース商品写真, 8K UHD. 構図: {composition}。\n"
            f"\n"
            f"前景: デザイン美と色彩彩度の高い {cfg['product_type']}{view_specific}, 架空クライアント「{brand}」印刷: "
            f"ブランド名「{brand}」とタグライン「{tagline}」を日本語（完全・正確）でプロフェッショナル書体印刷, "
            f"ブランド装飾パターン, 実在小文字要素 ({cfg['small_elements']}) を整然と配置; 他テキスト一切なし。\n"
            f"{badge_clause}\n"
            f"\n"
            f"背景: ソフトぼかし使用中シーン — {cfg['in_use_scene']}, 隣接 {cfg['related_objects']} 微かに見え, "
            f"製品鮮明. 主に {cfg['industry_scenarios']} 使用; 最適シーン選定, ライティング: {cfg['lighting']}。\n"
            f"\n"
            f"製品: {product_desc}\n"
            f"\n"
            f"{COLOR_PALETTE_JA}.\n"
            f"{MARKET_AESTHETIC_JA}.\n"
            f"\n"
            f"ネガティブ: {NEGATIVE_JA}"
        )
    else:  # zh-hk
        return (
            f"正方形 1:1 寫實電商產品攝影, 8K UHD. 構圖: {composition}。\n"
            f"\n"
            f"前景: 具有設計美感的色彩飽和 {cfg['product_type']}{view_specific}, 虛構客戶「{brand}」印刷: "
            f"品牌名「{brand}」及標語「{tagline}」以繁體中文（筆畫完整準確）專業字體印於產品表面, "
            f"配品牌裝飾圖案, 另配真實小字元素 ({cfg['small_elements']}) 整齊小字塊; 無其他文字。\n"
            f"{badge_clause}\n"
            f"\n"
            f"背景: 柔和虛化使用中場景 — {cfg['in_use_scene']}, 鄰近 {cfg['related_objects']} 隱約可見, "
            f"產品銳利. 主要應用於 {cfg['industry_scenarios']}; 選最搭場景, 燈光: {cfg['lighting']}。\n"
            f"\n"
            f"產品: {product_desc}\n"
            f"\n"
            f"{COLOR_PALETTE_ZHHK}.\n"
            f"{MARKET_AESTHETIC_ZHHK}.\n"
            f"\n"
            f"負面: {NEGATIVE_ZHHK}"
        )


def alt_text(sku: dict, locale: str = 'en') -> str:
    brand, _ = get_fictional_client(sku, locale)
    cfg = get_category_config(sku, locale)
    if locale == 'ja':
        desc = sku.get('descriptionJa', sku.get('description_en', ''))
    elif locale == 'zh-hk':
        desc = sku.get('description_zh', sku.get('description', sku.get('description_en', '')))
    else:
        desc = sku.get('description_en', '')
    if '**Best for**' in desc or '**適配行業**' in desc:
        for cut in ['**Best for**', '**適配行業**']:
            if cut in desc:
                desc = desc.split(cut)[0].strip()
                break
    if '**' in desc:
        desc = desc.split('**')[0].strip()
    if not desc.endswith('.'):
        desc += '.'
    if locale == 'zh-hk':
        return f"{desc} 由 {brand} 印製。"[:300]
    if locale == 'ja':
        return f"{desc} {brand} 印刷。"[:300]
    return f"{desc} Printed for {brand}."[:300]


def main():
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument('--skus', nargs='+', help='SKUs to generate (default: all 99)')
    ap.add_argument('--locale', default='en', choices=['en', 'ja', 'zh-hk'])
    ap.add_argument('--out', help='Output file')
    args = ap.parse_args()

    skus = parse_skus()
    if args.skus:
        sorted_skus = [skus[s] for s in args.skus if s in skus]
    else:
        sorted_skus = [skus[k] for k in sorted(skus.keys())]

    if args.out:
        out_path = Path(args.out)
    else:
        suffix = '-zh-hk' if args.locale == 'zh-hk' else f'-{args.locale}'
        out_path = WORKSPACE / f'seedream/v23.5-prompts{suffix}.txt'

    out_lines = []
    locale_name = {'en': 'EN (US Quiet Luxury)', 'ja': 'JA (日本 侘び寂び)', 'zh-hk': 'zh-hk (香港 吉祥暖調)'}
    out_lines.append(f'V23.5 ALL-SKU {args.locale.upper()} PROMPTS | Seedream 5.0 lite (火山方舟 API)')
    out_lines.append('=' * 78)
    out_lines.append(f'Generated 2026-08-23 — V23.4 → V23.5 upgrade (K3 8/23 07:27 拍板).')
    out_lines.append(f'Locale: {locale_name[args.locale]}')
    out_lines.append('KEY UPGRADES:')
    out_lines.append('  1. Explicit Foreground/Background template structure (7 segments)')
    out_lines.append('  2. Design-aesthetic, color-saturated foreground (per-locale palette strategy)')
    out_lines.append('  3. Industry scenario selection in background')
    out_lines.append('  4. Per-locale color palette:')
    out_lines.append('     - US: Quiet Luxury (camel/ivory/navy/forest green + burgundy/gold accent)')
    out_lines.append('     - JA: 侘び寂び (朱紅/藍染/抹茶 + 米白/浅茶 + 大留白)')
    out_lines.append('     - zh-hk: 吉祥鮮活暖調 (大紅/金/粉/橙 + 禁白/黑/灰/藍)')
    out_lines.append('=' * 78)
    out_lines.append('')

    for sku in sorted_skus:
        seq = int(re.search(r'-(\d+)$', sku['id']).group(1))
        seo_field = f'seo_filename_{args.locale}' if args.locale != 'en' else 'seo_filename'
        # Try to find SEO filename for the locale
        seo_file = sku.get('seo_filename', '')
        out_lines.append('=' * 78)
        out_lines.append(f"### SKU-{seq:02d} | {sku['id']} | {sku['slug']} | {seo_file}")
        out_lines.append(f"SEO+GEO ALT: {alt_text(sku, args.locale)}")
        out_lines.append('')
        for view in ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE']:
            p = build_prompt(sku, view, args.locale)
            out_lines.append(f"[{view}] ({len(p)} chars)")
            out_lines.append(p)
            out_lines.append('')
        out_lines.append('-' * 78)

    out_path.write_text('\n'.join(out_lines), encoding='utf-8')

    total_chars = len('\n'.join(out_lines))
    print(f'Output: {out_path}')
    print(f'Total bytes: {total_chars:,}')
    print(f'SKUs: {len(sorted_skus)}')
    print(f'Prompts: {len(sorted_skus) * 4}')


if __name__ == '__main__':
    main()
