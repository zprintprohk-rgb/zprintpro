#!/usr/bin/env python3
"""
V24.2 PROMPT GENERATOR R2 (K3 8/24 01:50 拍板)

V24 → V24.1 → V24.2 → V24.2 R2 演进:
  V24:    3 locale HERO 各 2-3 卖点 (2700 chars, 复杂结构) — 字符超量
  V24.1:  JA/zh-hk 纯本地化, V20 结构清理 — 但仍超 2300
  V24.2:  严格 ≤2300 chars, V20 黄金 2 行结构回归, 真品牌 ZprintPro, 真价格
  V24.2 R2:  修正 — 去掉 prompt body 中 ZprintPro/智印港/ジープリント (K3 8/24 拍板
          "不要 zprintpro 出现在生图的图片中"), 加回 V22 12 字段多行产品描述
          (material / size / printMethod / finishing / price / features / MOQ / turnaround)

V24.2 R2 关键设计 (≤2300 chars 硬约束):
  1. 视觉 spec (1 行):
     - 8K e-commerce 4 视图构图
     - 12 字段产品描述 (V22 黄金, 多行 details, 让图信真):
       * 产品名 (locale) + 简短描述
       * specs.material / size / printMethod / finishing
       * features[3] (从 features 数组取前 3)
       * price_range (locale 币种)
       * minQuantity (MOQ)
       * turnaround (如有)
     - Fictional client brand "{Hive Packaging etc.}" 印产品表面
     - 品牌主题装饰图案 (几何/花/抽象)
     - 真实小字元素 (barcode/batch/QR)
  2. 市场审美 hint (2 行):
     - 1 个具体背景 (V20 简洁)
     - locale 3 饱和色 + BRIGHT CLEAR daylight
     - locale 1 句 aesthetic (US Quiet Luxury / JA 侘び寂び / zh-hk 吉祥暖調)
     - 2 卖点 (主 = SKU + 价格, 副 = 2 标签)
     - 1 句 anti-garbage (5 项)
     - 1 句 negative (5 项)
  3. 硬约束: 绝对不出现 ZprintPro / 智印港 / ジープリント / Z-Print / Z Print
     (V20 时代把真实品牌印产品上是错的, 撤回; fictional client brand 才是产品表面文字)

3 locale × 99 SKU × 4 视图 = 1188 prompts
"""
import json
import re
import sys
from pathlib import Path

# Force UTF-8 stdout (avoid GBK encode error on Windows)
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

WORKSPACE = Path(r'F:\zprintpro-nextjs')
PRODUCTS_FILE = WORKSPACE / 'src/data/products.ts'
OUTPUT_EN = WORKSPACE / 'seedream/v24.2-prompts-en.txt'
OUTPUT_JA = WORKSPACE / 'seedream/v24.2-prompts-ja.txt'
OUTPUT_ZHHK = WORKSPACE / 'seedream/v24.2-prompts-zh-hk.txt'

# Brand strings to STRIP from product fields before using in prompts
# (K3 8/24 拍板: 不要 ZprintPro/智印港/ジープリント 出现在生图的图片中)
# These may appear in products.ts title_zh / description_zh / description_ja fields
# due to legal-disclosure layer (NAP) bleed-over. They MUST be removed at parse time.
BRAND_STRIP_PATTERNS = [
    r'\s*[|·•・]\s*智印港[。\.]?',          # " | 智印港" / " · 智印港" / "・智印港"
    r'\s*[|·•・]\s*智印雲[。\.]?',
    r'\s*[|·•・]\s*智印印港[。\.]?',         # typo guard
    r'\s*[|·•・]\s*ZprintPro[。\.]?',
    r'\s*[|·•・]\s*ジープリント[。\.]?',
    r'\s*\|\s*ジープリント\s*$',             # " | ジープリント" at end
    r'\s*\|\s*ZprintPro\s*$',
    r'智印港[。\.]?\s*',                     # 智印港 anywhere standalone
    r'智印雲[。\.]?\s*',
    r'ZprintPro[。\.]?\s*',
    r'ジープリント[。\.]?\s*',
    r'\*\*適合[^*]+',                       # strip "**適合行業**: xxx" suffix
    r'\*\*適配[^*]+',
    r'\*\*Best for[^*]+',
    r'\*\*適用[^*]+',
]


def strip_brands(text):
    """Remove ZprintPro/智印港/ジープリント + trailing NAP bleed from product text."""
    if not text:
        return text
    out = text
    for pat in BRAND_STRIP_PATTERNS:
        out = re.sub(pat, '', out)
    out = re.sub(r'\s+', ' ', out).strip()
    out = re.sub(r'\s*。\s*。\s*。', '。', out)  # collapse multiple 。
    out = re.sub(r'\s*,\s*,', ',', out)
    return out.rstrip('。.,;: ').strip()

# ===== LOCALE 通用配置 (V24 R2) =====

# Locale 3 饱和色 (per market, US Quiet Luxury / JA 侘び寂び / zh-hk 吉祥暖調)
LOCALE_COLORS = {
    'en': 'warm earth tones, deep navy, brushed gold',
    'ja': 'vermilion 朱紅, indigo 藍染, matcha green 抹茶',
    'zh-hk': '大紅 bright Chinese red, gold 金, peach pink 桃粉',
}

# Locale 1 句 aesthetic (简洁, V20 黄金)
LOCALE_AESTHETIC = {
    'en': 'Cinematic photo-real, US DTC premium, sharp focus, true-to-life texture, warm trustworthy lifestyle.',
    'ja': 'シネマティック写実、日本市場プレミアム、侘び寂び、シャープフォーカス、素材感真实、上質、温かい信頼ライフスタイル。',
    'zh-hk': '電影寫實風格、香港送禮美学、銳利對焦、材質感如實、温暖可信生活視覺。',
}

# Locale unified anti-garbage (~110 chars, V20 1 句模式)
ANTI_GARBAGE = {
    'en': 'No other text, gibberish, watermarks, brand names, or multiple labels. All English spelled correctly, no technical parameters visible as text.',
    'ja': '他のテキスト、意味不明文字、透かし、ロゴ、複数ラベル一切なし。日本語は漢字ひらがなカタカナ正確、仮名崩しなし、技術パラメータ可視化禁止。',
    'zh-hk': '絕無其他文字、亂碼、浮水印、品牌名、多重標籤。繁體中文筆畫完整準確、不可簡體混用、技術參數不得以文字顯示。',
}

# Locale unified BRIGHT vivid hint (V23.5.1 修复 dim/cloudy/muddy)
COLOR_HINT = {
    'en': 'color-saturated vivid, not muted, not washed out, BRIGHT CLEAR daylight, high clarity, NOT dim/overcast/muddy',
    'ja': '色彩彩度の高い鮮やかな色、くすみなし、色褪せなし、明るいクリアな昼光、暗く・曇り・濁りなし',
    'zh-hk': '色彩飽滿鮮明、不沉悶、不褪色、晴朗清晰日光、不昏暗不陰天不朦朧',
}

# 4 视图构图 (per locale, 简洁 1 句)
VIEW_COMPOSITIONS = {
    'HERO': {
        'en': 'product centered 80-85% of frame, clean margin, slight angled perspective',
        'ja': '商品を画面中央80-85%、クリアな余白、軽い角度付き構図',
        'zh-hk': '產品置於畫面中央80-85%，留有乾淨邊距，輕微斜角構圖',
    },
    'DETAIL': {
        'en': 'extreme close-up 85-95% of frame, macro on material/texture, shallow DoF',
        'ja': '画面の85-95%を埋める超クローズアップ、素材にマクロフォーカス、浅い被写界深度',
        'zh-hk': '超近距特寫佔畫面85-95%，對焦材質/紋理，淺景深',
    },
    'VARIETY': {
        'en': '3-4 colorways grouped, human hand interacting with one variant for scale',
        'ja': '3-4種類のカラーバリエーションを配置、1点のみ人間の手が触れスケール感',
        'zh-hk': '3-4款配色並列展示，其中一款有人手互動呈現真實比例',
    },
    'MULTI-ANGLE': {
        'en': '3 views in one frame (front, angled, detail), neutral studio backdrop',
        'ja': '3つの視点を1フレームに収める、ニュートラルな撮影背景',
        'zh-hk': '3個視角同框呈現，中性攝影背景',
    },
}

# ===== 16 类目 × 3 locale 配置字典 =====

# 16 类目 × 产品类型 (locale)
CATEGORY_PRODUCT_TYPE = {
    'packaging': {'en': 'corrugated color-printed boxes', 'ja': '段ボールカラープリントボックス', 'zh-hk': '瓦楞彩印盒'},
    'greeting-cards': {'en': 'greeting cards', 'ja': 'グリーティングカード', 'zh-hk': '賀卡'},
    'stickers': {'en': 'vinyl stickers', 'ja': 'ビニールステッカー', 'zh-hk': '防水貼紙'},
    'envelopes': {'en': 'business envelopes', 'ja': 'ビジネス封筒', 'zh-hk': '商務信封'},
    'menus': {'en': 'restaurant menus', 'ja': 'レストランメニュー', 'zh-hk': '餐廳菜單'},
    'books': {'en': 'books', 'ja': '本・冊子', 'zh-hk': '書刊'},
    'posters': {'en': 'event posters', 'ja': 'イベントポスター', 'zh-hk': '活動海報'},
    'paper-bags': {'en': 'paper shopping bags', 'ja': '紙ショッピングバッグ', 'zh-hk': '購物紙袋'},
    'flyers': {'en': 'marketing flyers', 'ja': 'マーケティングチラシ', 'zh-hk': '行銷傳單'},
    'red-packets': {'en': 'Chinese New Year red packets', 'ja': '春節祝儀袋', 'zh-hk': '春節紅包'},
    'calendars': {'en': 'wall and desk calendars', 'ja': '壁掛け卓上カレンダー', 'zh-hk': '掛曆桌曆'},
    'educational': {'en': 'school exercise books', 'ja': '学校教材・練習帳', 'zh-hk': '學校教材'},
    'banners': {'en': 'vinyl outdoor banners', 'ja': '屋外ビニールバナー', 'zh-hk': '戶外橫幅'},
    'japan-doujin': {'en': 'doujinshi fan books', 'ja': '同人誌同人本', 'zh-hk': '同人誌同人本'},
    'wedding-invitations': {'en': 'wedding invitations', 'ja': '結婚式招待状', 'zh-hk': '結婚喜帖'},
    'place-cards': {'en': 'place cards and table cards', 'ja': '席札テーブルカード', 'zh-hk': '席位卡桌卡'},
}

# 16 类目 × 1 个具体背景 (per locale, V20 黄金 1 句)
CATEGORY_BG = {
    'packaging': {'en': 'blurred US DTC unboxing on clean wooden tabletop', 'ja': 'blurされた高級ギフトカウンターの開梱シーン', 'zh-hk': '模糊的高級禮品櫃台開箱場景'},
    'greeting-cards': {'en': 'blurred US holiday dinner table setting', 'ja': 'blurされた祝祭の食卓', 'zh-hk': '模糊的節慶餐桌陳設'},
    'stickers': {'en': 'blurred creative US workspace with Hydro Flask', 'ja': 'blurされたクリエイティブな作業机', 'zh-hk': '模糊的創意工作桌面'},
    'envelopes': {'en': 'blurred US executive desk with fountain pen', 'ja': 'blurされた役員机', 'zh-hk': '模糊的高管辦公桌'},
    'menus': {'en': 'blurred US restaurant table with wine glass', 'ja': 'blurされたレストランのテーブル', 'zh-hk': '模糊的高級餐廳桌面'},
    'books': {'en': 'blurred US chesterfield armchair reading nook', 'ja': 'blurされた書斎のチェスターフィールド', 'zh-hk': '模糊的書房閱讀角'},
    'posters': {'en': 'blurred US urban gallery wall with frame', 'ja': 'blurされたギャラリー壁', 'zh-hk': '模糊的城市藝廊牆面'},
    'paper-bags': {'en': 'blurred US boutique sidewalk with mannequins', 'ja': 'blurされたブティック店頭', 'zh-hk': '模糊的精品店人行道'},
    'flyers': {'en': 'blurred US café entrance with corkboard', 'ja': 'blurされたカフェ入口', 'zh-hk': '模糊的咖啡店入口'},
    'red-packets': {'en': 'blurred US Asian-American CNY family table', 'ja': 'blurされた春節家族の団らん', 'zh-hk': '模糊的春節家庭團圓'},
    'calendars': {'en': 'blurred US home office with morning light', 'ja': 'blurされたホームオフィス', 'zh-hk': '模糊的家庭辦公室'},
    'educational': {'en': 'blurred US school library with reading corner', 'ja': 'blurされた学校図書館', 'zh-hk': '模糊的學校圖書館'},
    'banners': {'en': 'blurred US outdoor festival entrance with bunting', 'ja': 'blurされた屋外フェスティバル入口', 'zh-hk': '模糊的戶外節慶入口'},
    'japan-doujin': {'en': 'blurred US anime convention booth with standee', 'ja': 'blurされたコミケット風同人サークルスペース', 'zh-hk': '模糊的同人攤位場景'},
    'wedding-invitations': {'en': 'blurred US garden wedding with chapel', 'ja': 'blurされたガーデンウェディング', 'zh-hk': '模糊的花園婚禮場景'},
    'place-cards': {'en': 'blurred US wedding reception table with florals', 'ja': 'blurされた披露宴テーブル', 'zh-hk': '模糊的婚宴桌面'},
}

# 16 类目 × 真实小字元素 (locale, V20 细节)
CATEGORY_SMALL_ELEMENTS = {
    'packaging': {'en': 'barcode, batch code, recycling symbol', 'ja': 'バーコード、ロットコード、リサイクル記号', 'zh-hk': '條碼、批次碼、回收標誌'},
    'greeting-cards': {'en': 'batch number, fine gold accent', 'ja': 'ロット番号、金のアクセント', 'zh-hk': '批次號碼、金色點綴'},
    'stickers': {'en': 'batch number, eco label, small QR', 'ja': 'ロット番号、エコラベル、QR', 'zh-hk': '批次號碼、環保標籤、小QR'},
    'envelopes': {'en': 'return address, postal mark, batch code', 'ja': '差出人住所、郵便印、ロットコード', 'zh-hk': '回郵地址、郵戳、批次碼'},
    'menus': {'en': 'price column, category separator, footer mark', 'ja': '価格欄、カテゴリー区切り、店名フッター', 'zh-hk': '價格欄、分類分隔、店名頁尾'},
    'books': {'en': 'ISBN barcode, publisher mark, spine number', 'ja': 'ISBNバーコード、出版社マーク、背番号', 'zh-hk': 'ISBN條碼、出版社標、書脊編號'},
    'posters': {'en': 'event date, venue footer, organizer mark, QR', 'ja': 'イベント日付、会場フッター、主催者マーク、QR', 'zh-hk': '活動日期、場地頁尾、主辦標記、QR'},
    'paper-bags': {'en': 'barcode sticker, eco label, store address', 'ja': 'バーコードステッカー、エコラベル、店舗住所', 'zh-hk': '條碼貼紙、環保標籤、店址'},
    'flyers': {'en': 'contact line, hours, QR, social handle', 'ja': '連絡先、営業時間、QR、SNS', 'zh-hk': '聯絡電話、營業時間、QR、社交帳號'},
    'red-packets': {'en': 'auspicious seal, denomination area, brand mark', 'ja': '縁起印、金額欄、ブランドマーク', 'zh-hk': '吉祥印章、金額區、品牌標記'},
    'calendars': {'en': 'month header, week number, year mark, brand footer', 'ja': '月ヘッダー、週番号、年号、ブランドフッター', 'zh-hk': '月份標頭、週數、年份標、品牌頁尾'},
    'educational': {'en': 'grade mark, school name, page number, subject tag', 'ja': '学年マーク、学校名、ページ番号、教科タグ', 'zh-hk': '年級標記、校名、頁碼、學科標籤'},
    'banners': {'en': 'event date, sponsor footer, contact, weather mark', 'ja': 'イベント日付、スポンサーフッター、連絡先、耐候マーク', 'zh-hk': '活動日期、贊助頁尾、聯絡、耐候標記'},
    'japan-doujin': {'en': 'circle name, event mark, page count, R-18 stamp if applicable', 'ja': 'サークル名、イベントマーク、ページ数、R-18スタンプ', 'zh-hk': '社團名、活動標記、頁數、R-18年齡標'},
    'wedding-invitations': {'en': 'couple initials, wedding date, venue, RSVP line', 'ja': '新郎新婦イニシャル、結婚式日、会場、RSVP', 'zh-hk': '新人姓名縮寫、結婚日期、場地、RSVP'},
    'place-cards': {'en': 'guest name line, table number, decorative motif, brand footer', 'ja': 'ゲスト名、テーブル番号、装飾モチーフ、ブランドフッター', 'zh-hk': '賓客姓名、桌號、裝飾圖案、品牌頁尾'},
}

# 16 类目 × 2 卖点 (V24 模式, 主 + 副, locale 3 字段)
SELLING_POINTS = {
    'packaging': {'en': ('Custom Boxes｜From $0.4-1.2', '100 MOQ', 'Free Design'),
                  'ja': ('オリジナル箱｜¥55-130〜', '100個〜', '無料デザイン'),
                  'zh-hk': ('客製包裝盒｜HK$2.8-6.6/個起', '100個起印', '免刀模費')},
    'greeting-cards': {'en': ('Greeting Cards｜From $0.2-0.8', '100 MOQ', 'Foil Stamp'),
                       'ja': ('グリーティングカード｜¥30-90〜', '100枚〜', '箔押し'),
                       'zh-hk': ('賀卡印刷｜HK$0.6-2/張起', '100張起印', '燙金工藝')},
    'stickers': {'en': ('Vinyl Stickers｜From $0.05-0.3', 'Waterproof', 'Die-Cut'),
                 'ja': ('ビニールステッカー｜¥8-30〜', '防水', 'ダイカット'),
                 'zh-hk': ('防水貼紙｜HK$0.15-0.8/張起', '防水耐撕', '客製尺寸')},
    'envelopes': {'en': ('Custom Envelopes｜From $0.1-0.4', '100 MOQ', 'Logo Print'),
                  'ja': ('オリジナル封筒｜¥15-45〜', '100枚〜', 'ロゴ印刷'),
                  'zh-hk': ('燙金信封｜HK$0.3-1.2/個起', '100個起印', '燙金工藝')},
    'menus': {'en': ('Restaurant Menus｜From $1-4', 'Waterproof', 'Custom Size'),
              'ja': ('レストランメニュー｜¥120-450〜', '防水', 'サイズ自由'),
              'zh-hk': ('餐廳菜單｜HK$5-15/本起', '防水材質', '客製尺寸')},
    'books': {'en': ('Custom Books｜From $3-15', 'Saddle/Hard', 'Covers Free Design'),
              'ja': ('オリジナル本｜¥350-1700〜', '上製本/並製本', '表紙無料'),
              'zh-hk': ('精裝書刊｜HK$15-80/本起', '膠裝/精裝', '客製封面')},
    'posters': {'en': ('Event Posters｜From $1-5', 'A2 Size', 'UV Resistant'),
                'ja': ('イベントポスター｜¥120-600〜', 'A2サイズ', 'UV耐性'),
                'zh-hk': ('海報印刷｜HK$3-20/張起', 'A2尺寸', 'UV防曬')},
    'paper-bags': {'en': ('Shopping Bags｜From $0.5-2', 'Cotton Handle', '100 MOQ'),
                   'ja': ('ショッピングバッグ｜¥60-230〜', '綿ロープ', '100枚〜'),
                   'zh-hk': ('購物紙袋｜HK$2-8/個起', '棉繩手柄', '100個起印')},
    'flyers': {'en': ('Marketing Flyers｜From $0.1-0.5', 'Fast 3-Day', '100 MOQ'),
               'ja': ('マーケティングチラシ｜¥12-60〜', '3日納期', '100枚〜'),
               'zh-hk': ('傳單印刷｜HK$0.3-1.5/張起', '3日交期', '4色印刷')},
    'red-packets': {'en': ('CNY Red Packets｜From $0.1-0.3', 'Foil Stamp', '100 MOQ'),
                    'ja': ('春節祝儀袋｜¥15-40〜', '箔押し', '100枚〜'),
                    'zh-hk': ('春節紅包｜HK$0.4-1.2/個起', '燙金工藝', '新年送禮')},
    'calendars': {'en': ('Custom Calendars｜From $2-8', '13-Page', 'Foil Stamp'),
                  'ja': ('オリジナルカレンダー｜¥250-950〜', '13ページ', '箔押し'),
                  'zh-hk': ('月曆年曆｜HK$8-40/本起', '13頁設計', '燙金工藝')},
    'educational': {'en': ('School Books｜From $0.5-3', 'K-12 OK', 'Custom Cover'),
                    'ja': ('学校教材｜¥60-350〜', '学校向け', '表紙カスタム'),
                    'zh-hk': ('學校教材｜HK$2-15/本起', '學校專用', '客製封面')},
    'banners': {'en': ('Vinyl Banners｜From $5-20', 'Waterproof', 'UV Safe'),
                'ja': ('ビニールバナー｜¥600-2300〜', '防水', 'UV対応'),
                'zh-hk': ('橫幅印刷｜HK$25-100/條起', '防水耐候', 'UV防曬')},
    'japan-doujin': {'en': ('Doujinshi｜From $3-10', '10 MOQ', 'A5 Size'),
                      'ja': ('同人誌｜¥350-1200〜', '10冊〜', 'A5サイズ'),
                      'zh-hk': ('同人誌印刷｜HK$15-50/本起', '10本起印', 'A5同人誌')},
    'wedding-invitations': {'en': ('Wedding Invites｜From $1-5', 'Foil Stamp', '50 Sets'),
                              'ja': ('結婚式招待状｜¥120-600〜', '箔押し', '50組〜'),
                              'zh-hk': ('結婚喜帖｜HK$5-25/套起', '燙金工藝', '50套起印')},
    'place-cards': {'en': ('Place Cards｜From $0.1-0.3', 'Foil Cotton', '100 MOQ'),
                     'ja': ('席札｜¥15-40〜', '箔押し上質紙', '100枚〜'),
                     'zh-hk': ('席卡印刷｜HK$0.4-1.2/張起', '燙金棉紙', '客製名稱')},
}


def get_fictional_brand(category_slug, idx):
    """Fictional client brand (V24 R2: ONLY brand on product surface, no ZprintPro)."""
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


def get_brand_motif(category_slug, locale):
    """Fictional brand decorative pattern (per cat, per locale)."""
    motifs = {
        'packaging': {'en': 'geometric honeycomb', 'ja': '麻の葉模様', 'zh-hk': '幾何蜂巢圖案'},
        'greeting-cards': {'en': 'botanical florals', 'ja': '草花模様', 'zh-hk': '植物花卉圖案'},
        'stickers': {'en': 'abstract minimal', 'ja': 'ミニマル抽象', 'zh-hk': '抽象極簡圖案'},
        'envelopes': {'en': 'classic monogram', 'ja': 'モノグラム', 'zh-hk': '經典字母組合'},
        'menus': {'en': 'typographic vintage', 'ja': 'タイポグラフィ', 'zh-hk': '復古字體圖案'},
        'books': {'en': 'literary emblem', 'ja': '文学エンブレム', 'zh-hk': '文學徽章圖案'},
        'posters': {'en': 'bold graphic', 'ja': '大胆なグラフィック', 'zh-hk': '大膽圖形設計'},
        'paper-bags': {'en': 'minimal line art', 'ja': 'ミニマル線画', 'zh-hk': '極簡線條圖案'},
        'flyers': {'en': 'urban grid', 'ja': '都市グリッド', 'zh-hk': '都市網格圖案'},
        'red-packets': {'en': 'auspicious floral', 'ja': '縁起花柄', 'zh-hk': '吉祥花紋圖案'},
        'calendars': {'en': 'minimal month', 'ja': 'ミニマル月', 'zh-hk': '極簡月份設計'},
        'educational': {'en': 'playful bright', 'ja': '明るい遊び', 'zh-hk': '趣味明亮設計'},
        'banners': {'en': 'bold stripe', 'ja': '大胆なストライプ', 'zh-hk': '大膽條紋設計'},
        'japan-doujin': {'en': 'manga line art', 'ja': 'マンガ線画', 'zh-hk': '漫畫線稿風格'},
        'wedding-invitations': {'en': 'floral wreath', 'ja': '花リース', 'zh-hk': '花環裝飾設計'},
        'place-cards': {'en': 'elegant script', 'ja': 'エレガント筆記', 'zh-hk': '優雅手寫字體'},
    }
    return motifs.get(category_slug, {}).get(locale, 'elegant motif')


def get_brand_typography(category_slug, locale):
    """Typography style for fictional brand (per cat, per locale)."""
    typos = {
        'en': 'modern sans-serif (Helvetica-style)',
        'ja': '明朝体 / ゴシック体',
        'zh-hk': '黑體 / 宋體繁體',
    }
    return typos[locale]


def parse_skus():
    """Parse products.ts → list of SKU dicts with all 12 fields needed for prompts."""
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

        # Parse features[] array (1-7 strings, take first 3 for prompt density)
        feat_match = re.search(r"features:\s*\[(.*?)\]", block, re.DOTALL)
        features = []
        if feat_match:
            for fm in re.finditer(r"['\"]([^'\"]+)['\"]", feat_match.group(1)):
                features.append(fm.group(1))
        features3 = features[:3]

        # Parse specs{} object
        specs = {}
        specs_block = re.search(r"specs:\s*\{([^}]+)\}", block, re.DOTALL)
        if specs_block:
            for sm in re.finditer(r"(\w+):\s*'([^']+)'", specs_block.group(1)):
                specs[sm.group(1)] = sm.group(2)

        # Parse turnaround (optional)
        turnaround = find(r"turnaround:\s*'([^']+)'")

        # Parse minQuantity
        min_qty = find(r"minQuantity:\s*(\d+)")

        skus.append({
            'id': sku_id,
            'slug': find(r"slug:\s*'([^']+)'"),
            'category': find(r"category:\s*'([^']+)'"),
            'category_slug': find(r"category_slug:\s*'([^']+)'") or find(r"category:\s*'([^']+)'"),
            'nameEn': strip_brands(find(r"nameEn:\s*'([^']+)'")),
            'nameJa': strip_brands(find(r"nameJa:\s*'([^']+)'")),
            'name_zh': strip_brands(find(r"name_zh:\s*'([^']+)'") or find(r"title_zh:\s*'([^']+)'")),
            'descriptionEn': strip_brands(find(r"descriptionEn:\s*'([^']+)'")),
            'descriptionJa': strip_brands(find(r"descriptionJa:\s*'([^']+)'")),
            'description_zh': strip_brands(find(r"description_zh:\s*'([^']+)'")),
            'price_range': find(r"price_range:\s*'([^']+)'"),
            'specs': {k: strip_brands(v) for k, v in specs.items()},
            'features3': [strip_brands(f) for f in features3],
            'minQuantity': min_qty,
            'turnaround': turnaround,
        })
    return skus


def build_product_details(sku, locale):
    """Build 12-field product detail string (V22 R2, ≤500 chars per locale)."""
    specs = sku.get('specs', {})
    feat3 = sku.get('features3', [])

    # Locale product name
    name_field = {'en': 'nameEn', 'ja': 'nameJa', 'zh-hk': 'name_zh'}[locale]
    product_name = sku.get(name_field, '')

    # Locale description (short, 80 chars cut)
    desc_field = {'en': 'descriptionEn', 'ja': 'descriptionJa', 'zh-hk': 'description_zh'}[locale]
    desc = sku.get(desc_field, '')[:120]

    material = specs.get('material', '')
    size = specs.get('size', '')
    print_method = specs.get('printMethod', '')
    finishing = specs.get('finishing', '')
    price = sku.get('price_range', '')
    moq = sku.get('minQuantity', '')
    turnaround = sku.get('turnaround', '')

    if locale == 'en':
        lines = [
            f'Product: {product_name}.',
            f'Material: {material}.',
            f'Size: {size}.',
            f'Print: {print_method}.',
            f'Finish: {finishing}.',
        ]
        if feat3:
            lines.append('Features: ' + ' / '.join(f.strip('【】') for f in feat3) + '.')
        if price:
            lines.append(f'Price: {price}.')
        if moq:
            lines.append(f'MOQ: {moq} units.')
        if turnaround:
            lines.append(f'Turnaround: {turnaround}.')
        lines.append(f'Description: {desc}.')
        return ' '.join(lines)
    elif locale == 'ja':
        lines = [
            f'製品: {product_name}。',
            f'材質: {material}。',
            f'サイズ: {size}。',
            f'印刷: {print_method}。',
            f'加工: {finishing}。',
        ]
        if feat3:
            lines.append('特徴: ' + ' / '.join(f.strip('【】') for f in feat3) + '。')
        if price:
            lines.append(f'価格: {price}。')
        if moq:
            lines.append(f'最小注文: {moq}個。')
        if turnaround:
            lines.append(f'納期: {turnaround}。')
        lines.append(f'説明: {desc}。')
        return ' '.join(lines)
    else:  # zh-hk
        lines = [
            f'產品: {product_name}。',
            f'材質: {material}。',
            f'尺寸: {size}。',
            f'印刷: {print_method}。',
            f'後加工: {finishing}。',
        ]
        if feat3:
            lines.append('特色: ' + ' / '.join(f.strip('【】') for f in feat3) + '。')
        if price:
            lines.append(f'價格: {price}。')
        if moq:
            lines.append(f'起印量: {moq}個。')
        if turnaround:
            lines.append(f'交期: {turnaround}。')
        lines.append(f'描述: {desc}。')
        return ' '.join(lines)


def build_prompt(sku, view, locale):
    """Build V24.2 R2 prompt: 1 line, ≤2300 chars, V20 structure + 12 字段 + no ZprintPro in body."""
    cat = sku['category_slug']
    cfg_product = CATEGORY_PRODUCT_TYPE.get(cat, {}).get(locale, 'product')
    cfg_bg = CATEGORY_BG.get(cat, {}).get(locale, '')
    cfg_small = CATEGORY_SMALL_ELEMENTS.get(cat, {}).get(locale, 'small text')
    sp_main, sp_sub1, sp_sub2 = SELLING_POINTS.get(cat, {}).get(locale, ('Custom Print', '100 MOQ', 'Free Design'))

    # Fictional client brand (only brand on product surface — K3 8/24 拍板)
    sku_idx = int(re.search(r'-(\d+)$', sku['id']).group(1)) - 1
    fake_brand = get_fictional_brand(cat, sku_idx)
    motif = get_brand_motif(cat, locale)
    typo = get_brand_typography(cat, locale)

    # 12-field product details (V22 R2)
    product_details = build_product_details(sku, locale)

    # View composition
    view_comp = VIEW_COMPOSITIONS[view][locale]

    # Locale hint
    color_hint = COLOR_HINT[locale]
    aesthetic = LOCALE_AESTHETIC[locale]
    colors = LOCALE_COLORS[locale]
    anti = ANTI_GARBAGE[locale]

    if locale == 'en':
        prompt = (
            f'PRODUCTION-READY FINAL IMAGE ONLY. 1:1 ratio, 8K ultra-high-definition e-commerce product photo.'
            f' Composition: {view_comp}.'
            f' Foreground: a {cfg_product} with fictional client brand "{fake_brand}" printed in {typo},'
            f' plus {motif} decorative pattern, and real small text elements ({cfg_small}) in neat blocks.'
            f' {product_details}'
            f' Background: {cfg_bg}, neighboring lifestyle props faintly visible, product tack-sharp occupying 75-85% of frame.'
            f' Color palette: {colors}, {color_hint}.'
            f' {aesthetic}'
            f' Selling point main: {sp_main}, sub: {sp_sub1}・{sp_sub2}.'
            f' Anti-garbage: {anti}'
            f' Negative: blurry, watermark, distorted, gibberish, dim lighting, muddy, faded, garish neon.'
        )
    elif locale == 'ja':
        prompt = (
            f'プロダクションレディ最終イメージのみ。1:1 比率、8K ウルトラHD eコマース商品写真。'
            f' 構図: {view_comp}。'
            f' 前景: デザイン美を備えた{cfg_product}、架空クライアント「{fake_brand}」を{typo}で印刷、'
            f'{motif}装飾パターン、実在小文字要素 ({cfg_small}) を整然と配置。'
            f' {product_details}'
            f' 背景: {cfg_bg}、隣接小道具がうっすら見え、商品はくっきり鮮明でフレームの75-85%を占める。'
            f' カラーパレット: {colors}、{color_hint}。'
            f' {aesthetic}'
            f' 卖点メイン: {sp_main}、サブ: {sp_sub1}・{sp_sub2}。'
            f' アンチガーベッジ: {anti}'
            f' ネガティブ: ぼやけ、透かし、歪み、意味不明文字、暗い照明、濁り、褪色、けばけばしいネオン。'
        )
    else:  # zh-hk
        prompt = (
            f'製作級最終圖像,非草稿非測試。1:1 比例,8K 超高清電商產品圖。'
            f' 構圖:{view_comp}。'
            f' 前景:具有設計美感的{cfg_product},虛構客戶「{fake_brand}」以{typo}印於表面,'
            f'配{motif}裝飾圖案,另配真實小字元素 ({cfg_small}) 整齊小字塊。'
            f' {product_details}'
            f' 背景:{cfg_bg},鄰近小道具隱約可見,產品銳利清晰佔畫面75-85%。'
            f' 色彩:{colors},{color_hint}。'
            f' {aesthetic}'
            f' 賣點主標:{sp_main}、副標:{sp_sub1}・{sp_sub2}。'
            f' 反垃圾:{anti}'
            f' 負面:模糊、浮水印、變形、亂碼、昏暗光線、混濁、褪色、俗豔霓虹。'
        )

    return prompt


def main():
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument('--locale', default='en', choices=['en', 'ja', 'zh-hk'])
    ap.add_argument('--out', help='Output file path')
    ap.add_argument('--skus', nargs='+', help='Generate only these SKUs')
    ap.add_argument('--sample', action='store_true', help='Print first 3 prompts to stdout for inspection')
    args = ap.parse_args()

    skus = parse_skus()
    if args.skus:
        sel = {s.split(' ')[0] for s in args.skus}
        skus = [s for s in skus if s['id'] in sel]

    out_path = Path(args.out) if args.out else {
        'en': OUTPUT_EN, 'ja': OUTPUT_JA, 'zh-hk': OUTPUT_ZHHK,
    }[args.locale]

    if args.sample:
        for sku in skus[:2]:
            print(f'\n{"="*78}\n### {sku["id"]} ({args.locale})')
            for view in ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE']:
                p = build_prompt(sku, view, args.locale)
                print(f'\n[{view}] ({len(p)} chars)')
                print(p)
        return

    out_lines = []
    out_lines.append(f'V24.2 R2 ALL-SKU {args.locale.upper()} PROMPTS | NO ZprintPro/智印港/ジープリント IN PROMPT BODY')
    out_lines.append('=' * 78)
    out_lines.append('Generated 2026-08-24 — K3 8/24 01:50 拍板 (V24.2 R2).')
    out_lines.append('KEY: V20 structure + V22 12 字段 (material/size/print/finish/features/price/MOQ/turnaround) + fictional client brand only.')
    out_lines.append('ZprintPro / 智印港 / ジープリント are NEVER rendered in image (only file header for K3 reference).')
    out_lines.append('Fictional client brand on product surface: e.g. Hive Packaging, BoxCraft Co., etc.')
    out_lines.append('=' * 78)
    out_lines.append('')

    for sku in skus:
        seq = int(re.search(r'-(\d+)$', sku['id']).group(1))
        out_lines.append('=' * 78)
        out_lines.append(f"### SKU-{seq:02d} | {sku['id']} | {sku['slug']} | ({args.locale})")
        out_lines.append('')
        for view in ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE']:
            p = build_prompt(sku, view, args.locale)
            out_lines.append(f"[{view}] ({len(p)} chars)")
            out_lines.append(p)
            out_lines.append('')
        out_lines.append('-' * 78)

    out_path.write_text('\n'.join(out_lines), encoding='utf-8')

    # Stats
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
            print(f'[PASS] ALL prompts within <=2300 char limit.')
        else:
            print(f'[WARN] {over} prompts exceed 2300 chars — need to trim.')


if __name__ == '__main__':
    main()
