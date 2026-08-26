#!/usr/bin/env python3
"""
V24 PROMPT GENERATOR (K3 8/23 16:26 拍板)

V23.5.1 → V24 演进:
  V23.5.1: 3 locale badge (HK explosion/EN none/JA info) + BRIGHT vivid
  V24: 3 locale HERO 全部加 2-3 卖点 + 自进化到 V24 (K3 8/23 16:26)

V24 新增 (per K3 8/23 16:26 拍板):
  1. EN HERO 信任小标签 (top-left/right/bottom) - 2-3 short taglines
  2. JA HERO 信息带 - 升级到 2-3 卖点 (原 1 个不够)
  3. zh-hk HERO 爆炸贴 - 升级到 2-3 卖点 (原 1 个不够)
  4. 3 locale 各自 per-category 卖点矩阵 (16 类目 × 2-3 卖点 = 48 组)
  5. 保留 V23.5.1 全部: BRIGHT vivid + dim/muddy 修复 + 4K + q=95

3 locale × 99 SKU × 4 视图 = 1188 prompts
"""
import json
import re
import sys
from pathlib import Path

WORKSPACE = Path(r'F:\zprintpro-nextjs')
PRODUCTS_FILE = WORKSPACE / 'src/data/products.ts'
OUTPUT_FILE_EN = WORKSPACE / 'seedream/v24-prompts-en.txt'
OUTPUT_FILE_JA = WORKSPACE / 'seedream/v24-prompts-ja.txt'
OUTPUT_FILE_ZHHK = WORKSPACE / 'seedream/v24-prompts-zh-hk.txt'

# ============================================================================
# FICTIONAL CLIENT MATRIX (16 categories x 4 clients, per locale)
# Each client: (brand_name, tagline)
# V24: same as V23.5.1 (16×4×3=192)
# ============================================================================
FICTIONAL_CLIENTS_EN = {
    'greeting-cards': [('Maplewood Studio', 'Warm Wishes Always'), ('Honeycomb Greetings', 'Notes From The Heart'),
                       ('PaperCrane Co.', 'Folded With Love'), ('Lumen Cards', 'Light In Every Word')],
    'stickers': [('BriteMark', 'Stick With What You Love'), ('Wildroot Stickers', 'Born To Be Wild'),
                 ('Stickcraft Studio', 'Made To Stick'), ('SunPop Designs', 'Pop Your World')],
    'envelopes': [('LetterCraft', 'Every Word Counts'), ('Ivory Mail', 'Sealed In Style'),
                  ('Sealed & Sent', 'From Us To You'), ('Penmark Stationers', 'Write Your Story')],
    'menus': [('Woodfire Bistro', 'Cooked Over Flame'), ('Saffron & Sage', 'Spice Of Life'),
              ('Olive Branch Kitchen', 'Fresh From The Garden'), ('Birch Street Cafe', 'Brewed With Heart')],
    'books': [('Quillhouse Press', 'Words That Last'), ('Larkspur Publishing', 'Stories In Bloom'),
              ('Stitched Pages', 'Bound By Hand'), ('Copper Type', 'Set In Tradition')],
    'packaging': [('BoxCraft Co.', 'Built To Impress'), ('Hive Packaging', 'Thoughtfully Packed'),
                  ('FolioBox', 'Boxed With Care'), ('WrapWorks Studio', 'Wrap Your Story')],
    'posters': [('Cityline Prints', 'Print That Speaks'), ('Boldframe Studio', 'Frame Your Vision'),
                ('Neon Hive', 'Glow On The Wall'), ('Plaster Press', 'Pressed In Color')],
    'paper-bags': [('Carrywell', 'Carry It Proud'), ('PaperThread', 'Stitched In Paper'),
                    ('Foldkraft', 'Folded Strong'), ('Loop & Leaf', 'Carried With Care')],
    'flyers': [('Blueroof Studio', 'Print That Stands Out'), ('Locale Print Co.', 'Local Loud & Clear'),
               ('Flypaper Studio', 'Stuck On Quality'), ('Twoblock Designs', 'Two Blocks Ahead')],
    'red-packets': [('Fortune Fold', 'Folded With Fortune'), ('Crimson Wish', 'Wishes In Crimson'),
                    ('Knot & Coin', 'Tied With Luck'), ('Lantern Press', 'Lit By Tradition')],
    'calendars': [('Dayline Studio', 'Mark Every Day'), ('Pagebound', 'Turn The Page'),
                  ('Foldtime', 'Time Folded Daily'), ('Mark & Margin', 'Marked In Time')],
    'educational': [('Brightleaf Learning', 'Learn & Grow'), ('Tiny Atlas Press', 'Small Pages, Big World'),
                     ('Skillpath', 'Path To Mastery'), ('Brightbrick', 'Build With Knowledge')],
    'banners': [('Flagworks', 'Wave It Loud'), ('Bannerly', 'Stand Out Tall'),
                ('Skyline Sign', 'Above The Crowd'), ('Eventfold', 'Folded For Impact')],
    'japan-doujin': [('Sakura Studio', 'Blossoms In Ink'), ('Animecraft', 'Crafted For Fans'),
                      ('Junka Press', 'Pure Fan Passion'), ('Comiket 2026', 'Drawn For The Circle')],
    'wedding-invitations': [('EverAfter Press', 'Forever Begins Here'), ('GoldenHour Invites', 'Written In Gold'),
                            ('Lace & Vow', 'Laced With Promises'), ('Heirloom Weddings', 'Kept For Generations')],
    'place-cards': [('TableCraft Studio', 'Set The Table'), ('Seating Stone', 'A Place For Everyone'),
                    ('Folded Grace', 'Graced In Paper'), ('Marked Moment', 'Mark Your Seat')],
}

FICTIONAL_CLIENTS_JA = {
    'greeting-cards': [('ハニカムグリーティング', '心からの便りを'), ('ペーパークレーン社', '愛を込めて折る'),
                       ('ルーメンカード', '言葉に光を添えて'), ('メイプルウッド工房', 'いつも温かな願いを')],
    'stickers': [('ブライトマーク', '好きで彩る毎日'), ('ワイルドルート', '自由に貼ろう'),
                 ('スティッククラフト', 'しっかり貼る、自由に彩る'), ('サンポップデザイン', '世界をポップに')],
    'envelopes': [('レタークラフト', '一語一語を大切に'), ('アイボリーメイル', '上品に封じる'),
                  ('シールドアンドセンド', 'あなたから、誰かへ'), ('ペンマーク', 'あなたの物語を書く')],
    'menus': [('薪火ビストロ', '炎で烹る'), ('サフランアンドセイジ', '人生のスパイス'),
              ('オリーブブランチ', '畑から新鮮に'), ('バーチ通りカフェ', '心を込めて淹れる')],
    'books': [('クイルハウス出版', '長く残る言葉'), ('ラークスパー出版', '花開く物語'),
              ('スティッチドページ', '手で綴じた頁'), ('カッパータイプ', '伝統を組む')],
    'packaging': [('ボックスクラフト社', '印象的に作る'), ('ハイブパッケージング', '心を込めて包装'),
                  ('フォリオボックス', '箱に思いを込めて'), ('ラップワークス', '物語を包む')],
    'posters': [('シティライン印刷', '語るを印刷する'), ('ボールドフレーム', '視覚をかざる'),
                ('ネオンヴハイブ', '壁に煌めく'), ('プラスタープレス', '色彩で押す')],
    'paper-bags': [('キャリーウェル', '誇りを持って運ぶ'), ('ペーパースレッド', '紙で綴る'),
                    ('フォールドクラフト', '丈夫に折る'), ('ループアンドリーフ', '心を込めて運ぶ')],
    'flyers': [('ブルールーフ', '目を引く印刷'), ('ローカル印刷社', 'ローカル、鮮明に'),
               ('フライペーパー', '品質で貼る'), ('ツーブロック', '一歩先を行く')],
    'red-packets': [('フォーチュンフォールド', '福を折る'), ('クリムゾンウィッシュ', '深紅の願い'),
                    ('ノットアンドコイン', '縁と幸運を結ぶ'), ('ランタンプレス', '伝統を灯す')],
    'calendars': [('デイライン工房', '一日一日を刻む'), ('ページバウンド', '頁をめくる'),
                  ('フォールドタイム', '日々を折る'), ('マークアンドマージン', '余白に時を記す')],
    'educational': [('ブライトリーフ学習', '学び、育つ'), ('タイニーアトラス出版', '小さな頁、大きな世界'),
                     ('スキルパス', '技藝の道'), ('ブライトブリック', '知識で築く')],
    'banners': [('フラッグワークス', '大きく掲げよう'), ('バンナリー', '傲然聳立'),
                ('スカイラインサイン', '人垣の上に'), ('イベントフォールド', 'インパクトを折る')],
    'japan-doujin': [('桜スタジオ', '墨と花'), ('アニメクラフト', 'ファンのために'),
                      ('純化プレス', '純粋な情熱'), ('コミケット二〇二六', 'サークルのために')],
    'wedding-invitations': [('エバーアフター印刷', '永遠はここから'), ('ゴールデンハー招待状', '金色に綴る'),
                            ('レースアンドヴォウ', '約束を包む'), ('ヘアルームウェディング', '世代を越えて')],
    'place-cards': [('テーブルクラフト', '席を調える'), ('シーティングストーン', '一人ひとりに席を'),
                    ('フォールドグレース', '和紙に座を彩る'), ('マークドモーメント', '瞬間を記す席札')],
}

FICTIONAL_CLIENTS_ZHHK = {
    'greeting-cards': [('蜂巢賀卡', '用心的祝福'), ('紙鶴手作', '摺出心意'),
                       ('流光賀卡', '字裡有光'), ('楓葉工作室', '溫暖祝福長伴')],
    'stickers': [('炫彩貼紙', '貼出所愛'), ('野根貼紙', '自由張貼'),
                 ('貼藝工坊', '貼得牢固'), ('日陽設計', '跳出你的世界')],
    'envelopes': [('信藝工坊', '每字都珍重'), ('象牙郵箋', '優雅封存'),
                  ('封好寄出', '從你到他'), ('筆跡文具', '寫你的故事')],
    'menus': [('薪火小館', '以火烹調'), ('藏紅花與鼠尾草', '人生香料'),
              ('橄欖枝廚房', '田園新鮮'), ('樺樹街咖啡', '用心沖煮')],
    'books': [('鵝羽筆出版', '雋永文字'), ('燕草出版', '綻放的敘事'),
              ('縫線書坊', '手工裝幀'), ('銅活字', '傳統排版')],
    'packaging': [('盒藝工坊', '造出印象'), ('蜂巢包裝', '用心包裝'),
                  ('對開盒作', '盒中有情'), ('包藝工作室', '包裹你的故事')],
    'posters': [('城市線印刷', '印刷發聲'), ('膽識框藝', '框住願景'),
                ('霓虹蜂巢', '牆上微光'), ('石膏壓印', '色彩壓印')],
    'paper-bags': [('提得穩', '帶著自豪'), ('紙線工坊', '紙中穿線'),
                    ('折得牢', '強韌折成'), ('繩葉工坊', '用心攜帶')],
    'flyers': [('藍頂工作室', '吸睛印刷'), ('本地印刷', '在地、清晰'),
               ('飛紙工坊', '以質取勝'), ('雙疊設計', '走在前端')],
    'red-packets': [('福摺工坊', '摺出福氣'), ('深紅祝願', '硃紅祝願'),
                    ('結與錢', '繫上好運'), ('燈籠印坊', '點亮傳統')],
    'calendars': [('日線工坊', '標記每個日子'), ('頁裝日曆', '翻開時間'),
                  ('摺時', '日日摺起'), ('標記餘白', '餘白中記時')],
    'educational': [('亮葉學習', '學中成長'), ('小地圖出版', '小頁大世界'),
                     ('技路', '技藝之道'), ('亮磚', '知識築起')],
    'banners': [('旗工坊', '高高舉起'), ('橫幅藝', '傲然聳立'),
                ('天際標牌', '人潮之上'), ('活動摺', '摺出衝擊')],
    'japan-doujin': [('櫻花工坊', '墨中花開'), ('動漫工藝', '為同好而製'),
                      ('純化出版', '純粹熱情'), ('コミケット二〇二六', '為社團而繪')],
    'wedding-invitations': [('永恆印坊', '永恆由此起'), ('金時辰邀請函', '以金書寫'),
                            ('蕾絲與誓', '繫以承諾'), ('傳家婚卡', '世代珍藏')],
    'place-cards': [('席藝工坊', '排好席位'), ('安席石', '人人有座'),
                    ('摺韻', '紙上韻致'), ('標記此刻', '此刻有座')],
}


# ============================================================================
# V24 KEY UPGRADE: PER-CATEGORY 2-3 SELLING POINTS (click attraction)
# 16 categories × 3 points × 3 locales = 144 entries
# Format: each value is a list of 2-3 short taglines (≤6 chars for HK, ≤12 chars for JA, ≤24 chars for EN)
# ============================================================================

# EN: US e-commerce convention, 2-3 trust/feature tags (24 char max each)
SELLING_POINTS_EN = {
    'greeting-cards': ['CUSTOM ART', '100 MOQ', 'FOIL STAMP'],
    'stickers': ['WATERPROOF', 'DIE-CUT', '5-DAY SHIP'],
    'envelopes': ['CUSTOM LOGO', '100 MOQ', 'FAST SHIP'],
    'menus': ['WATERPROOF', 'CUSTOM SIZE', 'BULK PRICING'],
    'books': ['SOFT/HARD COVER', 'CUSTOM PAGES', '7-DAY'],
    'packaging': ['FREE DESIGN', '100 MOQ', '7-DAY SHIP'],
    'posters': ['WATERPROOF', 'A2 SIZE', 'UV RESISTANT'],
    'paper-bags': ['COTTON HANDLE', 'ECO-FRIENDLY', '100 MOQ'],
    'flyers': ['FAST 3-DAY', '100 MOQ', '4-COLOR'],
    'red-packets': ['FOIL STAMP', '100 MOQ', 'CNY GIFT'],
    'calendars': ['13-PAGE', 'FOIL STAMP', 'CUSTOM COVER'],
    'educational': ['K-12 OK', 'CUSTOM COVER', '100 MOQ'],
    'banners': ['WATERPROOF', 'UV SAFE', 'CUSTOM SIZE'],
    'japan-doujin': ['10 MOQ', '24H FAST', 'A5 SIZE'],
    'wedding-invitations': ['FOIL STAMP', '50 SETS', 'CUSTOM ART'],
    'place-cards': ['FOIL COTTON', '100 MOQ', 'CUSTOM ART'],
}

# JA: 日本市場フック (12 字符内)
SELLING_POINTS_JA = {
    'greeting-cards': ['高品質印刷', '箔押し対応', '小ロット100枚〜'],
    'stickers': ['防水耐光', 'ダイカット', '短納期5日〜'],
    'envelopes': ['ロゴ印刷', '小ロット100枚〜', '短納期'],
    'menus': ['防水対応', 'サイズ自由', '大口割引'],
    'books': ['上製本/並製本', 'ページ数自由', '7日納期'],
    'packaging': ['型抜き無料', '小ロット100個〜', '短納期対応'],
    'posters': ['防水対応', 'A2サイズ', 'UV耐性'],
    'paper-bags': ['綿ロープ', 'エコ素材', '小ロット100枚〜'],
    'flyers': ['3日納期', '小ロット100枚〜', '4色印刷'],
    'red-packets': ['箔押し', '100枚〜', '春節ギフト'],
    'calendars': ['13ページ', '箔押し', '表紙カスタム'],
    'educational': ['学校向け', '表紙カスタム', '100冊〜'],
    'banners': ['防水耐候', 'UV対応', 'サイズ自由'],
    'japan-doujin': ['10冊〜', '24時間急行', 'A5サイズ'],
    'wedding-invitations': ['箔押し', '50組〜', 'デザイン自由'],
    'place-cards': ['箔押し上質紙', '100枚〜', '名入れ無料'],
}

# zh-hk: 香港送禮フック (6 繁中字内)
SELLING_POINTS_ZHHK = {
    'greeting-cards': ['燙金工藝', '100張起印', '順豐本地'],
    'stickers': ['防水耐撕', '5日交期', '客製尺寸'],
    'envelopes': ['燙金工藝', '100張起印', '順豐本地'],
    'menus': ['防水材質', '客製尺寸', '批量優惠'],
    'books': ['膠裝/精裝', '客製頁數', '7日交期'],
    'packaging': ['免刀模費', '100個起印', '順豐本地'],
    'posters': ['防水材質', 'A2尺寸', 'UV防曬'],
    'paper-bags': ['棉繩手柄', '環保材質', '100個起印'],
    'flyers': ['3日交期', '100張起印', '4色印刷'],
    'red-packets': ['燙金工藝', '100個起印', '新年送禮'],
    'calendars': ['13頁設計', '燙金工藝', '客製封面'],
    'educational': ['學校專用', '客製封面', '100本起印'],
    'banners': ['防水耐候', 'UV防曬', '客製尺寸'],
    'japan-doujin': ['10本起印', '24小時急件', 'A5同人誌'],
    'wedding-invitations': ['燙金工藝', '50套起印', '客製設計'],
    'place-cards': ['燙金棉紙', '100張起印', '客製名稱'],
}


# ============================================================================
# PER-CATEGORY CONFIG (16 categories) - PURE LOCALE STRINGS
# V24.1: JA + zh-hk are full translated to native language (no EN mixing)
# ============================================================================

# English baseline (for EN and as fallback)
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

# JA: 完全日本語版（V24.1 fix 解決豆包 JA 識別問題）
CATEGORY_CONFIG_JA = {
    'greeting-cards': {
        'product_type': 'グリーティングカード',
        'small_elements': '装飾的な柄の帯、細かい金色のアクセントライン',
        'in_use_scene': '祝祭の食卓にヴィンテージ食器と真鍮の燭台と一緒にカードを並べた様子',
        'related_objects': 'ギフト包装、リボン、常緑の小枝、手書きのメモ',
        'industry_scenarios': 'クリスマス / サンクスギビング / バレンタイン / 結婚礼物 / 企業イベント',
        'lighting': '明るい自然な窓辺光と微かな燭台の光、暗くなく曇り空でもなく濁りもなく',
    },
    'stickers': {
        'product_type': 'ビニールステッカー',
        'small_elements': 'ロット番号、環境配慮インクラベル、小さなQRコーナー',
        'in_use_scene': 'クリエイティブな作業机でノートパソコン、ハイドロフラスク、ノートをステッカーで装飾した様子',
        'related_objects': '多肉植物、クラフト道具、ペン立て、スマートフォン',
        'industry_scenarios': '中小企業ブランディング / ノートパソコン装飾 / 商品パッケージ / イベント景品',
        'lighting': '晴天の窓からの明るい自然光、暗くなく曇り空でもなく濁りもなく',
    },
    'envelopes': {
        'product_type': 'ビジネス封筒',
        'small_elements': '差出人住所欄、郵便表示、ロットコード',
        'in_use_scene': '役員机に封筒を積み、万年筆と封蝋を用意した様子',
        'related_objects': '革の吸収紙、真鍮の文鎮、本棚、老眼鏡',
        'industry_scenarios': '法律事務所 / 不動産 / 結婚招待状セット / ダイレクトメール',
        'lighting': '明るい窓辺光とデスクランプの光、暗くなく曇り空でもなく濁りもなく',
    },
    'menus': {
        'product_type': 'レストランメニュー',
        'small_elements': '価格欄、カテゴリー区切り線、店舗名フッター',
        'in_use_scene': '親密なレストランのテーブルにメニューを立て、ワイングラスと蜜蝋キャンドルを添えた様子',
        'related_objects': 'カトラリー、リネンナプキン、塩入れ、小さな花瓶',
        'industry_scenarios': '高級ダイニング / 居酒屋 / ビストロ / ホテルレストラン / 茶餐廳',
        'lighting': '明るい窓辺の光に包まれた暖かいレストラン環境、暗くなく曇り空でもなく濁りもなく',
    },
    'books': {
        'product_type': '本',
        'small_elements': 'ISBNバーコード、出版社マーク、価格タグ、背表紙カテゴリ番号',
        'in_use_scene': 'チェスターフィールドの肘掛け椅子とフロアランプ、本の積み重ねがあるサイドテーブル',
        'related_objects': '革装丁の本、老眼鏡、コーヒーカップ、膝掛け',
        'industry_scenarios': '自費出版 / 企業年報 / 写真集 / 美術カタログ',
        'lighting': '読書ランプのある明るい自然光、暗くなく曇り空でもなく濁りもなく',
    },
    'packaging': {
        'product_type': 'プレミアム包装箱',
        'small_elements': 'バーコード、正味量ライン、リサイクル記号、ロットコード',
        'in_use_scene': 'ブティックギフトカウンターで箱を開け、薄紙が扇状に広がり、リボンを添えた様子',
        'related_objects': 'ユーカリの小枝、シルクのリボン、真鍮のはさみ、値札',
        'industry_scenarios': '美容 / 宝飾 / 電子機器 / 企業ギフト / 結婚引出物',
        'lighting': '明るい自然なスタジオ光と明るいソフトシャドウ、暗くなく曇り空でもなく濁りもなく',
    },
    'posters': {
        'product_type': 'イベントポスター',
        'small_elements': 'イベント日付ライン、会場フッター、主催者マーク、小さなチケットQR',
        'in_use_scene': '都会のギャラリー壁に額装ポスターが並び、露出レンガ背景',
        'related_objects': 'ピクチャーライト、木の床、コーヒーテーブル本、鉢植え',
        'industry_scenarios': 'コンサート / 展覧会 / 映画祭 / 小売店先頭プロモーション',
        'lighting': 'ギャラリー明るい昼光と明るいクリアアクセント、暗くなく曇り空でもなく濁りもなく',
    },
    'paper-bags': {
        'product_type': '紙ショッピングバッグ',
        'small_elements': 'バーコードステッカー、エコ素材ラベル、店舗住所フッター',
        'in_use_scene': 'ブティック歩道でバッグを手に持ち、ファッション街並みシーン',
        'related_objects': 'ブティック店頭、マネキン、看板、石畳',
        'industry_scenarios': '衣料ブティック / ギフトショップ / カフェ / ファーマーズマーケット / 百貨店',
        'lighting': '晴れた日の明るい屋外自然光、暗くなく曇り空でもなく濁りもなく',
    },
    'flyers': {
        'product_type': 'マーケティングチラシ',
        'small_elements': '連絡先、営業時間フッター、QRコード、SNSハンドル',
        'in_use_scene': 'コミュニティ掲示板にチラシが留められ、ぼやけたカフェ入口',
        'related_objects': 'コルクボード、画鋲、テイクアウトコーヒーカップ、チョークボードサイン',
        'industry_scenarios': 'レストラン開店 / 不動産リスト / フィットネスクラス / 地域イベント',
        'lighting': '明るい自然光と窓辺の明るいフィル光、暗くなく曇り空でもなく濁りもなく',
    },
    'red-packets': {
        'product_type': '春節祝儀袋',
        'small_elements': '縁起判子、金額欄、ブランドマーク、装飾的な結び目',
        'in_use_scene': '春節家族団らんで木製テーブルに祝儀袋を扇状に広げた様子',
        'related_objects': '蜜柑、麻雀牌、ティーセット、赤い提灯',
        'industry_scenarios': '春節企業ギフト / 結婚披露宴 / ブランド春節キャンペーン / 日系中華系家族伝統',
        'lighting': '明るく晴れた祭日昼光と暖かいゴールドアクセント、暗くなく曇り空でもなく濁りもなく',
    },
    'calendars': {
        'product_type': '壁掛け・卓上カレンダー',
        'small_elements': '月ヘッダー帯、小さい週番号、年号、ブランドフッター',
        'in_use_scene': '現代的なホームオフィスで壁掛けカレンダーと卓上スタンド',
        'related_objects': 'コーヒーマグ、多肉植物、ペン立て、本の積み重ね',
        'industry_scenarios': '企業年末ギフト / 不動産 / 写真スタジオ / 学校',
        'lighting': '明るい朝の昼光と明るい窓辺光、暗くなく曇り空でもなく濁りもなく',
    },
    'educational': {
        'product_type': '学校演習帳・ワークブック',
        'small_elements': '学年マーク、学校名ブロック、ページ番号フッター、教科タグ',
        'in_use_scene': '小学校図書館で木製机に開いた演習帳',
        'related_objects': '筆箱、定規、クレヨン、子供読書コーナー',
        'industry_scenarios': 'K-12学校 / 塾 / ホームスクール / 研修機関',
        'lighting': '明るい教室昼光と明るい窓辺自然光、暗くなく曇り空でもなく濁りもなく',
    },
    'banners': {
        'product_type': '屋外ビニールバナー',
        'small_elements': 'イベント日付帯、スポンサーフッター、連絡先、耐候性マーク',
        'in_use_scene': '屋外フェスティバル入口でバナーをフレームに掛け、カラフルなバンティング',
        'related_objects': '屋台行、バンタイング旗、フェスティバル入口アーチ、日光',
        'industry_scenarios': '展示会 / 開店 / スポーツイベント / 不動産内覧会 / 地域祭り',
        'lighting': '晴れた日の明るい直接太陽光、暗くなく曇り空でもなく濁りもなく',
    },
    'japan-doujin': {
        'product_type': '同人誌ファンブック',
        'small_elements': 'サークル名、イベントマーク、ページ数、必要に応じてR-18年齢スタンプ',
        'in_use_scene': 'コミケット風同人サークルスペースでブックを広げ、キャラスタンドが見える',
        'related_objects': '桜の花びら、テーブルクロス、アクリルスタンド、同人仲間',
        'industry_scenarios': 'コミケット / アニメファンコンベンション / インディーズ漫画サークル / 学校クラブイベント',
        'lighting': 'コンベンションホールの明るい昼光と明るいフィル光、暗くなく曇り空でもなく濁りもなく',
    },
    'wedding-invitations': {
        'product_type': '結婚招待状・ステーショナリーセット',
        'small_elements': '新郎新婦イニシャル、結婚式日、会場フッター、RSVP欄',
        'in_use_scene': '明るいアメリカ風ガーデンウェディングで披露宴テーブルに立てた招待状',
        'related_objects': '花、ゴールデンアワーの光、白いチャペル、緑、封筒セット',
        'industry_scenarios': '結婚式 /  destination ウェディング / ホテルウェディング / チャペル挙式',
        'lighting': 'ゴールデンアワーの明るい昼光、暗くなく曇り空でもなく濁りもなく',
    },
    'place-cards': {
        'product_type': '席札・テーブルカード',
        'small_elements': 'ゲスト名欄、テーブル番号、装飾モチーフ、ブランドフッター',
        'in_use_scene': '結婚披露宴のテーブルに花と共に皿の上に席札を並べた様子',
        'related_objects': 'キャンドル、エスコートテーブル、リネンランナー、小さなフラワーアレンジ',
        'industry_scenarios': '結婚式 / ホテルバンケット / 高級ダイニング / 企業ガラ',
        'lighting': '明るい披露宴昼光と明るい窓辺光、暗くなく曇り空でもなく濁りもなく',
    },
}

# zh-hk: 繁體中文版（純繁中，無英文混入）
CATEGORY_CONFIG_ZHHK = {
    'greeting-cards': {
        'product_type': '賀卡',
        'small_elements': '裝飾圖案帶、精緻金色點綴線',
        'in_use_scene': '節慶餐桌上賀卡擺放在復古餐具與黃銅燭台旁',
        'related_objects': '禮物包裝、絲帶、常青枝葉、手寫小卡',
        'industry_scenarios': '聖誕節 / 感恩節 / 情人節 / 婚禮禮物 / 企業活動',
        'lighting': '明亮清晰的窗邊光帶柔和燭台光，不暗、不陰天、不朦朧',
    },
    'stickers': {
        'product_type': '防水貼紙',
        'small_elements': '批次號碼、環保油墨標籤、小QR角落',
        'in_use_scene': '創意工作桌，貼紙裝飾筆電、水壺、筆記本',
        'related_objects': '多肉植物、手工工具、筆筒、智能手機',
        'industry_scenarios': '小型企業品牌 / 筆電裝飾 / 產品包裝 / 活動贈品',
        'lighting': '晴朗窗邊明亮自然光，不暗、不陰天、不朦朧',
    },
    'envelopes': {
        'product_type': '商務信封',
        'small_elements': '回郵地址區、郵戳、批次碼',
        'in_use_scene': '主管辦公桌上信封堆疊，旁有鋼筆與封蠟',
        'related_objects': '皮革吸墨紙、黃銅紙鎮、書架、老花眼鏡',
        'industry_scenarios': '律師事務所 / 房地產 / 婚禮請帖套裝 / 直效郵件',
        'lighting': '明亮窗光配清晰桌燈，不暗、不陰天、不朦朧',
    },
    'menus': {
        'product_type': '餐廳菜單',
        'small_elements': '價格欄、分類分隔線、店名頁尾',
        'in_use_scene': '親密餐廳桌上立起菜單，配酒杯與蜜蠟燭',
        'related_objects': '餐具、亞麻餐巾、鹽瓶、小花瓶',
        'industry_scenarios': '高級餐廳 / 居酒屋 / 小酒館 / 酒店餐廳 / 茶餐廳',
        'lighting': '明亮暖色餐廳光帶清晰窗光，不暗、不陰天、不朦朧',
    },
    'books': {
        'product_type': '書籍',
        'small_elements': 'ISBN條碼、出版社標記、價格標籤、書脊分類編號',
        'in_use_scene': '切斯特菲爾德扶手椅配落地燈，側桌上一疊書',
        'related_objects': '皮面精裝書、老花眼鏡、咖啡杯、膝上毯',
        'industry_scenarios': '自費出版 / 企業年報 / 相冊 / 美術目錄',
        'lighting': '明亮清晰自然光配閱讀燈，不暗、不陰天、不朦朧',
    },
    'packaging': {
        'product_type': '高級包裝盒',
        'small_elements': '條碼、淨含量行、回收標誌、批次碼',
        'in_use_scene': '精品禮品櫃台開盒，薄紙扇形展開，絲帶在旁',
        'related_objects': '桉樹枝、絲綢緞帶、黃銅剪刀、價簽',
        'industry_scenarios': '美妝 / 珠寶 / 電子產品 / 企業禮品 / 婚禮回禮',
        'lighting': '明亮清晰攝影棚光配明亮柔陰影，不暗、不陰天、不朦朧',
    },
    'posters': {
        'product_type': '活動海報',
        'small_elements': '活動日期行、場地頁腳、主辦標記、小QR票券',
        'in_use_scene': '城市藝廊牆面掛一排裱框海報，露出紅磚牆背景',
        'related_objects': '壁燈、木地板、咖啡桌書、盆栽',
        'industry_scenarios': '演唱會 / 展覽 / 電影節 / 零售店面促銷',
        'lighting': '明亮清晰藝廊日光配明亮乾淨點綴，不暗、不陰天、不朦朧',
    },
    'paper-bags': {
        'product_type': '紙購物袋',
        'small_elements': '條碼貼紙、環保油墨標籤、店址頁腳',
        'in_use_scene': '精品店人行道上持袋，時尚街區場景',
        'related_objects': '精品店店面、模特兒、遮陽篷、鵝卵石',
        'industry_scenarios': '服飾精品店 / 禮品店 / 咖啡店 / 農夫市集 / 百貨公司',
        'lighting': '晴朗日子明亮戶外日光，不暗、不陰天、不朦朧',
    },
    'flyers': {
        'product_type': '行銷傳單',
        'small_elements': '聯絡電話、營業時間頁腳、QR碼、社群帳號',
        'in_use_scene': '社區佈告欄上釘著傳單，咖啡店入口柔焦背景',
        'related_objects': '軟木板、圖釘、外帶咖啡杯、粉筆板招牌',
        'industry_scenarios': '餐廳開幕 / 房地產刊登 / 健身課程 / 社區活動',
        'lighting': '明亮自然光配窗邊明亮補光，不暗、不陰天、不朦朧',
    },
    'red-packets': {
        'product_type': '春節紅包',
        'small_elements': '吉祥印章、金額區、品牌標記、裝飾結',
        'in_use_scene': '春節家庭團圓，木桌紅包扇形展開',
        'related_objects': '橘子、麻將牌、茶具、紅燈籠',
        'industry_scenarios': '春節企業送禮 / 婚宴 / 品牌春節活動 / 華人家庭傳統',
        'lighting': '明亮清晰節慶日光配暖金點綴，不暗、不陰天、不朦朧',
    },
    'calendars': {
        'product_type': '掛曆與桌曆',
        'small_elements': '月份標題條、小週數、年份標、品牌頁腳',
        'in_use_scene': '現代家庭辦公室牆面掛曆，旁有桌曆',
        'related_objects': '咖啡杯、多肉植物、筆筒、一疊書',
        'industry_scenarios': '企業年末禮品 / 房地產 / 攝影工作室 / 學校',
        'lighting': '明亮清晰晨光配明亮窗邊光，不暗、不陰天、不朦朧',
    },
    'educational': {
        'product_type': '學校作業本與練習簿',
        'small_elements': '年級標記、校名區塊、頁碼頁腳、學科標籤',
        'in_use_scene': '小學圖書館木桌上攤開作業本',
        'related_objects': '筆盒、尺、蠟筆、兒童閱讀角',
        'industry_scenarios': 'K-12學校 / 補習班 / 自學家庭 / 培訓機構',
        'lighting': '明亮清晰教室光配明亮自然窗邊光，不暗、不陰天、不朦朧',
    },
    'banners': {
        'product_type': '戶外防水橫幅',
        'small_elements': '活動日期條、贊助商頁腳、聯絡電話、耐候標記',
        'in_use_scene': '戶外節慶入口橫幅掛在鐵架上，彩色三角旗飄揚',
        'related_objects': '美食車行、三角旗、節慶入口拱門、陽光',
        'industry_scenarios': '展會 / 開業 / 體育賽事 / 房地產開放日 / 社區廟會',
        'lighting': '晴朗天氣明亮直射陽光，不暗、不陰天、不朦朧',
    },
    'japan-doujin': {
        'product_type': '同人誌同人本',
        'small_elements': '社團名、活動標記、頁數、如有R-18年齡標',
        'in_use_scene': 'Comiket風同人攤位，本子扇形展開，角色立牌可見',
        'related_objects': '櫻花瓣、桌布、壓克力立牌、同好',
        'industry_scenarios': 'Comiket / 動漫同人展 / 獨立漫畫社團 / 學校社團活動',
        'lighting': '會展場館明亮日光配明亮補光，不暗、不陰天、不朦朧',
    },
    'wedding-invitations': {
        'product_type': '結婚喜帖與婚禮文具套裝',
        'small_elements': '新人姓名縮寫、結婚日期、場地頁腳、RSVP回覆欄',
        'in_use_scene': '明亮美式花園婚禮，婚宴桌上立起喜帖',
        'related_objects': '花藝、黃金光線、白色教堂、綠植、信封組',
        'industry_scenarios': '婚禮 / 海外婚禮 / 酒店婚禮 / 教堂儀式',
        'lighting': '黃金時刻明亮日光，不暗、不陰天、不朦朧',
    },
    'place-cards': {
        'product_type': '席卡與桌卡',
        'small_elements': '賓客姓名欄、桌號、裝飾圖案、品牌頁腳',
        'in_use_scene': '婚宴桌上席卡擺放在盤上配花藝',
        'related_objects': '蠟燭、引領桌、亞麻桌旗、小花藝',
        'industry_scenarios': '婚禮 / 酒店宴會 / 高級餐廳 / 企業晚宴',
        'lighting': '明亮清晰婚宴日光配明亮窗光，不暗、不陰天、不朦朧',
    },
}

# V24 Per-locale 3 selling points format
# EN: top-left, top-right, bottom (3 trust badges)
# JA: top-left info band with 3 points (vertical or horizontal)
# zh-hk: top-right explosion sticker with 3 points

BADGE_LAYOUT_EN = "Add 3 subtle trust badges: top-left '{p1}', top-right '{p2}', bottom '{p3}'. Small clean rectangles, dark text on cream or white on dark. Professional click-attracting, NOT garish, NOT over-powering."

BADGE_LAYOUT_JA = "左上に小さな情報帯を追加し、3つの日本語のセールスポイントを縦に並べる：「{p1}」 / 「{p2}」 / 「{p3}」。白またはクリーム色の帯にダーク系の文字で、清潔感のあるプロ仕様のタイポグラフィ。クリックを引き寄せる控えめなデザイン、派手でもなく主張しすぎでもない。"

BADGE_LAYOUT_ZHHK = "在畫面右上方加入鮮明大中國紅色爆炸贴，內含3個簡短繁體中文賣點（非價格類，每點6字以內）：「{p1}」 / 「{p2}」 / 「{p3}」。白字加粗、節慶感、吸引點擊、但不俗豔、不過度搶眼。"

BADGE_LAYOUTS = {
    'en': BADGE_LAYOUT_EN,
    'ja': BADGE_LAYOUT_JA,
    'zh-hk': BADGE_LAYOUT_ZHHK,
}


# ============================================================================
# PER-LOCALE COLOR PALETTE (V24.1: JA + zh-hk 全部翻譯成當地語言)
# ============================================================================
COLOR_PALETTE_EN = (
    "Color palette: US DTC 'Quiet Luxury' — warm neutrals (camel, ivory, taupe, navy, forest green) "
    "with saturated accent (burgundy, oxblood, emerald, gold); color-saturated but tasteful, "
    "NOT muted earth tones, NOT garish neon, NOT pastel washed-out; BRIGHT, WELL-LIT, "
    "high clarity and transparency, NOT dim, NOT muddy, NOT hazy"
)

COLOR_PALETTE_JA = (
    "カラーパレット：日本美「侘び寂び」+ 鮮やかな伝統 — 3つの伝統色（朱紅、藍染、抹茶）を、"
    "暖かみのある自然な中間色（米白、浅茶、雾灰、淡麦、砂色）の広い面積に対するアクセントとして使用；"
    "鮮やかだが上品、西洋風の派手さでもなく、けばけばしくもなく、ごちゃごちゃしてもいない；"
    "余白を活かした控えめな高級アクセント；少即是多（less is more）、細部即奢華（detail is luxury）；"
    "季節感あるモチーフ（桜、紅葉、竹）で自然な温かみを演出；明るいクリアな昼光、曇り空でも暗くもなく濁りもなく；"
    "プレミアム素材にはマットまたはソフトタッチの質感"
)

COLOR_PALETTE_ZHHK = (
    "色彩：香港送禮美學「吉祥鮮活暖調」—— 大紅、金、桃粉、橙、紫紅 等吉祥飽和色作為主要視覺力量，"
    "配以暖象牙色與金箔點綴；鮮明、豐富、色彩飽滿，充滿東方節慶氛圍；"
    "堅決避免白色、黑色、灰色、暗藍色（在香港文化中代表哀悼與陰沉）；"
    "不沉悶、不褪色、不西方極簡北歐風；明亮清晰日光，透明乾淨，不暗、不陰天；"
    "每種色彩都傳遞好運與繁榮"
)


# ============================================================================
# VIEW COMPOSITIONS (per-locale: V24.1 fix JA/zh-hk 全部翻譯)
# ============================================================================
VIEW_COMPOSITIONS_EN = {
    'HERO': 'product centered 80-85% of frame, clean margin, slight angled perspective for depth',
    'DETAIL': 'extreme close-up 85-95% of frame, macro focus on material/texture/edge, shallow DoF',
    'VARIETY': '3-4 designs/colorways in cohesive in-use scene; human hand interacting with one variant for scale/trust',
    'MULTI-ANGLE': '3 views (front, angled, detail) in one frame, neutral studio backdrop, soft diffused lighting',
    'SPREAD': 'full spread opened flat 90% of frame, all pieces visible side-by-side',
}

VIEW_COMPOSITIONS_JA = {
    'HERO': '商品を画面中央80-85%に配置、クリアな余白、奥行きを出すための軽い角度付き構図',
    'DETAIL': '画面の85-95%を埋める超クローズアップ、素材・質感・エッジにマクロフォーカス、浅い被写界深度',
    'VARIETY': '3-4種のデザイン/カラーバリエーションを統一感のある使用シーンに配置、1点のみ人間の手が触れスケール感',
    'MULTI-ANGLE': '3つの視点（正面、斜め、ディテール）を1フレームに収める、ニュートラルな撮影背景、柔らかい拡散光',
    'SPREAD': '見開きを平らに開いて90%、全パーツを並べて配置',
}

VIEW_COMPOSITIONS_ZHHK = {
    'HERO': '產品置於畫面中央80-85%位置，留有乾淨邊距，輕微斜角構圖製造層次',
    'DETAIL': '超近距特寫佔畫面85-95%，對焦材質/紋理/邊緣，淺景深',
    'VARIETY': '3-4款設計/配色在統一使用場景中陳列，其中一款有人手互動呈現真實比例',
    'MULTI-ANGLE': '3個視角（正面、斜角、特寫）同框呈現，中性攝影背景，柔和漫射光',
    'SPREAD': '整組攤平佔90%畫面，所有部件並列展示',
}

VIEW_COMPOSITIONS = {'en': VIEW_COMPOSITIONS_EN, 'ja': VIEW_COMPOSITIONS_JA, 'zh-hk': VIEW_COMPOSITIONS_ZHHK}

# ============================================================================
# NEGATIVE LIST (V24.1: JA + zh-hk 翻譯成當地語言)
# ============================================================================
NEGATIVE_EN = (
    "blurry, watermark, distorted, ugly artifacts, malformed, overexposed, underexposed, "
    "dim lighting, dark moody, bad cropping, subject cut off, object duplication, "
    "autoClaw AI watermark, cheap plastic texture, floating product, tacky aesthetic, "
    "violate physics, gibberish text, misspelled words, placeholder text, any text beyond "
    "specified brand name, tagline, and trust badge text, hex color codes, font names, technical parameter text "
    "on product, flat unassembled sheet shown as finished, "
    "muted desaturated colors, washed out, gray dull, faded, garish neon, "
    "Chinese/Japanese characters in en image, "
    "overcast, cloudy, muddy, hazy, foggy, low-contrast, opaque air, dim atmosphere"
)

NEGATIVE_JA = (
    "ぼやけ、透かし、歪んだ形状、醜いアーティファクト、変形、露出オーバー、露出不足、"
    "暗い照明、暗いムード、不適切なクロップ、被写体が切れる、被写体重複、"
    "AI透かし、安っぽいプラスチック质感、浮遊する商品、けばけばしい美意識、"
    "物理法則違反、意味不明なテキスト、誤字、プレースホルダーテキスト、"
    "指定されたブランド名・タグライン・情報帯のテキスト以外のテキスト、"
    "カラーコード、フォント名、技術パラメータテキスト、"
    "未組立の平板素材が完成品として表示されること、"
    "英語または中国語の文字混入、西洋風高彩度ネオン、けばけばしい色、"
    "ホワイトスペースのない散らかった構成、過度な装飾、視覚的ノイズ、"
    "曇り空、曇天、濁り、霞、霧、低コントラスト、不透明な空気、暗い雰囲気"
)

NEGATIVE_ZHHK = (
    "模糊、浮水印、變形、醜陋瑕疵、變形、過曝、欠曝、"
    "昏暗光線、陰沉氛圍、裁切不當、主體被切、物體重複、AI浮水印、廉價塑膠質感、"
    "漂浮產品、俗氣美學、違反物理、亂碼文字、錯字、佔位文字、"
    "指定品牌名/標語/爆炸贴文字以外的任何文字、色值代碼、字體名稱、技術參數文字、"
    "未組裝平板材料被當作成品、白色/黑色/灰色/暗藍色、沉悶褪色、模糊褪色、洗白褪色、"
    "簡體中文（必須用繁體）、北歐極簡風、英語/日語混入、毫無慶祝感、陰沉、俗豔霓虹、"
    "陰天、灰濛、混濁、起霧、低對比、不透明空氣、昏暗氛圍"
)

# ============================================================================
# MARKET AESTHETETIC (V24.1: JA + zh-hk 翻譯)
# ============================================================================
MARKET_AESTHETIC_EN = (
    "Premium US DTC brand aesthetic. BRIGHT, VIVID, CRISP and not dim. "
    "Photorealistic commercial photography, sharp focus, clear bright lighting, "
    "true-to-life texture, premium honest studio quality, logical consistency with "
    "real-world use, warm trustworthy clean lifestyle visual, shot on a clear bright day"
)
MARKET_AESTHETIC_JA = (
    "プレミアム日本ブランド美意識と侘び寂びの美意識。明るく、鮮明で、くっきり、暗くない。"
    "フォトリアリスティックな商業写真、シャープなフォーカス、明るくクリアな照明、"
    "実物そのままの質感、プレミアムで誠実なスタジオ品質、現実の使用との論理的一致、"
    "温かく洗練されたライフスタイルビジュアル、晴れた明るい日中、透明感のある澄んだ空気"
)
MARKET_AESTHETIC_ZHHK = (
    "高端香港生活美學（港式生活視覺 — 國際化、鮮明、精緻、慶賀）。明亮、鮮明、清晰，不昏暗。"
    "寫實商業攝影、銳利對焦、明亮清晰光線、如實質感、頂級真實工作室品質，"
    "與真實使用情境邏輯一致，溫暖可信生活視覺，晴朗明亮日間，透明潔淨空氣"
)


def parse_skus():
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


def get_fictional_client(sku: dict, locale: str = 'en'):
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


def get_category_config(sku: dict, locale: str = 'en'):
    cat = sku['category_slug']
    config_map = {
        'en': CATEGORY_CONFIG_EN,
        'ja': CATEGORY_CONFIG_JA,
        'zh-hk': CATEGORY_CONFIG_ZHHK,
    }.get(locale, CATEGORY_CONFIG_EN)
    return config_map.get(cat, {
        'product_type': 'custom printed product',
        'small_elements': 'brand mark, batch code, small QR',
        'in_use_scene': 'clean in-use scene',
        'related_objects': 'related props',
        'industry_scenarios': 'general use',
        'lighting': 'BRIGHT clear daylight, NOT dim, NOT overcast, NOT muddy',
    })


def get_selling_points(sku: dict, locale: str = 'en'):
    cat = sku['category_slug']
    points_map = {
        'en': SELLING_POINTS_EN,
        'ja': SELLING_POINTS_JA,
        'zh-hk': SELLING_POINTS_ZHHK,
    }.get(locale, SELLING_POINTS_EN)
    pts = points_map.get(cat, ['CUSTOM PRINT', '100 MOQ', 'FAST SHIP'])
    return pts[0], pts[1] if len(pts) > 1 else pts[0], pts[2] if len(pts) > 2 else pts[0]


def build_prompt(sku: dict, view: str, locale: str = 'en') -> str:
    brand, tagline = get_fictional_client(sku, locale)
    cfg = get_category_config(sku, locale)
    composition = VIEW_COMPOSITIONS[locale][view]
    p1, p2, p3 = get_selling_points(sku, locale)

    # Product description
    if locale == 'ja':
        product_desc = sku.get('descriptionJa', sku.get('description_en', ''))
    elif locale == 'zh-hk':
        product_desc = sku.get('description_zh', sku.get('description', sku.get('description_en', '')))
    else:
        product_desc = sku.get('description_en', '')

    # Truncate to 280 chars
    if len(product_desc) > 280:
        for cut in ['. ', '! ', '? ']:
            idx = product_desc.find(cut, 0, 280)
            if idx > 0:
                product_desc = product_desc[:idx+1]
                break
        else:
            product_desc = product_desc[:277] + '...'

    # View-specific
    view_specific = ''
    if view == 'VARIETY':
        view_specific = " (3-4 different designs or colorways arranged together)"
    elif view == 'MULTI-ANGLE':
        view_specific = " (3 views of the same product in one clean frame, neutral studio background)"

    # Badge layout (HERO only) - V24: 2-3 selling points per locale
    badge_clause = ''
    if view == 'HERO':
        badge_template = BADGE_LAYOUTS[locale]
        badge_clause = ' ' + badge_template.format(p1=p1, p2=p2, p3=p3)

    # Per-locale template
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
        # V24.1: 完全日本語（V23.5.1 混入英文已剔除）
        return (
            f"正方形 1:1 写実的な eコマース商品写真、8K高精細。構図：{composition}。\n"
            f"\n"
            f"前景：デザイン美と色彩の鮮やかさを備えた{cfg['product_type']}{view_specific}、架空クライアント「{brand}」印刷。"
            f"ブランド名「{brand}」とタグライン「{tagline}」を日本語（完全・正確な筆画）でプロフェッショナルな書体にて印刷、"
            f"ブランドテーマに合わせた装飾パターン、"
            f"実在の小さな文字要素（{cfg['small_elements']}）を整然とブロック配置。"
            f"他のテキストは一切なし。\n"
            f"{badge_clause}\n"
            f"\n"
            f"背景：柔らかくぼかした使用中のシーン — {cfg['in_use_scene']}。"
            f"隣接する{cfg['related_objects']}が微かに見え、商品はくっきり鮮明。"
            f"主に{cfg['industry_scenarios']}で使用される。"
            f"最適なシーンを選び、照明：{cfg['lighting']}。\n"
            f"\n"
            f"製品：{product_desc}\n"
            f"\n"
            f"{COLOR_PALETTE_JA}\n"
            f"\n"
            f"{MARKET_AESTHETIC_JA}\n"
            f"\n"
            f"ネガティブ：{NEGATIVE_JA}"
        )
    else:  # zh-hk
        # V24.1: 完全繁體中文（V23.5.1 混入英文已剔除）
        return (
            f"正方形 1:1 寫實電商產品攝影、8K高細節。構圖：{composition}。\n"
            f"\n"
            f"前景：具有設計美感、色彩鮮明的{cfg['product_type']}{view_specific}，虛構客戶「{brand}」印刷。"
            f"品牌名「{brand}」及標語「{tagline}」以繁體中文（筆畫完整準確）專業字體印於產品表面，"
            f"配品牌主題裝飾圖案，"
            f"另配真實小字元素（{cfg['small_elements']}）以整齊小字塊呈現。"
            f"除此之外無任何其他文字。\n"
            f"{badge_clause}\n"
            f"\n"
            f"背景：柔和虛化的高級使用中場景 — {cfg['in_use_scene']}。"
            f"鄰近{cfg['related_objects']}隱約可見，產品銳利清晰。"
            f"主要應用於{cfg['industry_scenarios']}；"
            f"選最搭的場景，燈光：{cfg['lighting']}。\n"
            f"\n"
            f"產品：{product_desc}\n"
            f"\n"
            f"{COLOR_PALETTE_ZHHK}\n"
            f"\n"
            f"{MARKET_AESTHETIC_ZHHK}\n"
            f"\n"
            f"負面：{NEGATIVE_ZHHK}"
        )


def alt_text(sku: dict, locale: str = 'en') -> str:
    brand, _ = get_fictional_client(sku, locale)
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
        out_path = WORKSPACE / f'seedream/v24-prompts{suffix}.txt'

    out_lines = []
    locale_name = {'en': 'EN (US e-commerce)', 'ja': 'JA (日本 侘び寂び)', 'zh-hk': 'zh-hk (香港 吉祥暖調)'}
    out_lines.append(f'V24 ALL-SKU {args.locale.upper()} PROMPTS | Seedream 5.0 lite (火山方舟 API)')
    out_lines.append('=' * 78)
    out_lines.append('Generated 2026-08-23 — V23.5.1 → V24 upgrade (K3 8/23 16:26 拍板).')
    out_lines.append('Locale: ' + locale_name[args.locale])
    out_lines.append('KEY V24 UPGRADES:')
    out_lines.append('  1. 3 locale HERO all have 2-3 click-attract selling points (K3 8/23 16:26)')
    out_lines.append('  2. EN: 3 trust badges (top-left/right/bottom) for US e-commerce convention')
    out_lines.append('  3. JA: info band with 3 Japanese selling points (top-left)')
    out_lines.append('  4. zh-hk: explosion sticker with 3 Traditional Chinese selling points (top-right)')
    out_lines.append('  5. 16 categories × 3 selling points × 3 locales = 144 entries')
    out_lines.append('  6. Preserved V23.5.1: BRIGHT vivid + dim/muddy fix + 4K + q=95')
    out_lines.append('=' * 78)
    out_lines.append('')

    for sku in sorted_skus:
        seq = int(re.search(r'-(\d+)$', sku['id']).group(1))
        out_lines.append('=' * 78)
        out_lines.append(f"### SKU-{seq:02d} | {sku['id']} | {sku['slug']} | {sku.get('seo_filename', '')}")
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
