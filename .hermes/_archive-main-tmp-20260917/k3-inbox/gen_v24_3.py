#!/usr/bin/env python3
"""
V24.3 PROMPT GENERATOR (K3 8/24 01:55 拍板)

V24.2 → V24.3 演进 (K3 8/24 01:53-01:55 修正):
  V24.2:  真品牌 ZprintPro 印产品表面 (错) + 截断 description 220 chars
  V24.3:  真品牌 ZprintPro 仅在产品描述层 (此产品由 ZprintPro 提供, 不出现在图)
          + fictional brand 印产品表面 (V23.5 4 client × 16 cat × 3 locale 矩阵)
          + 保留 V22 12 字段多行 description (不截断, max 541 chars 安全)
          + 2 卖点 (V20 风格) 而非 3 卖点
          + 严格 ≤2300 chars

V24.3 关键设计 (3 核心硬约束):
  1. 真实品牌 ZprintPro 不出现在图像, 仅 1 句"此产品由 ZprintPro 提供" 出现在描述层
  2. fictional brand 印在产品表面 (V23.5 矩阵, 4 client × 16 cat × 3 locale = 192 组合)
  3. V22 12 字段 description 完整保留, 不截断 (max 541 chars < 700 budget)

3 locale × 99 SKU × 4 视图 = 1188 prompts
"""
import json
import re
import sys
from pathlib import Path

WORKSPACE = Path(r'F:\zprintpro-nextjs')
PRODUCTS_FILE = WORKSPACE / 'src/data/products.ts'
OUTPUT_EN = WORKSPACE / 'seedream/v24.3-prompts-en.txt'
OUTPUT_JA = WORKSPACE / 'seedream/v24.3-prompts-ja.txt'
OUTPUT_ZHHK = WORKSPACE / 'seedream/v24.3-prompts-zh-hk.txt'

# ============================================================================
# 真实品牌 (描述层 only, NOT 印在产品上)
# ============================================================================
REAL_BRAND_PROVIDER = {
    'en': 'ZprintPro',           # 1 句 "This product is provided by ZprintPro."
    'ja': 'ZprintPro',           # "本製品は ZprintPro が提供します。"
    'zh-hk': 'ZprintPro',        # "本產品由 ZprintPro 提供。"
}

# ============================================================================
# FICTIONAL CLIENT 矩阵 (V23.5 完整版, 16 cat × 4 client × 3 locale = 192 组合)
# 这是印在产品表面的虚构品牌, 提供视觉多样性
# ============================================================================
FICTIONAL_CLIENTS_EN = {
    'greeting-cards': [('Maplewood Studio', 'Warm Wishes Always'),
                       ('Honeycomb Greetings', 'Notes From The Heart'),
                       ('PaperCrane Co.', 'Folded With Love'),
                       ('Lumen Cards', 'Light In Every Word')],
    'stickers': [('BriteMark', 'Stick With What You Love'),
                 ('Wildroot Stickers', 'Born To Be Wild'),
                 ('Stickcraft Studio', 'Made To Stick'),
                 ('SunPop Designs', 'Pop Your World')],
    'envelopes': [('LetterCraft', 'Every Word Counts'),
                  ('Ivory Mail', 'Sealed In Style'),
                  ('Sealed & Sent', 'From Us To You'),
                  ('Penmark Stationers', 'Write Your Story')],
    'menus': [('Woodfire Bistro', 'Cooked Over Flame'),
              ('Saffron & Sage', 'Spice Of Life'),
              ('Olive Branch Kitchen', 'Fresh From The Garden'),
              ('Birch Street Cafe', 'Brewed With Heart')],
    'books': [('Quillhouse Press', 'Words That Last'),
              ('Larkspur Publishing', 'Stories In Bloom'),
              ('Stitched Pages', 'Bound By Hand'),
              ('Copper Type', 'Set In Tradition')],
    'packaging': [('BoxCraft Co.', 'Built To Impress'),
                  ('Hive Packaging', 'Thoughtfully Packed'),
                  ('FolioBox', 'Boxed With Care'),
                  ('WrapWorks Studio', 'Wrap Your Story')],
    'posters': [('Cityline Prints', 'Print That Speaks'),
                ('Boldframe Studio', 'Frame Your Vision'),
                ('Neon Hive', 'Glow On The Wall'),
                ('Plaster Press', 'Pressed In Color')],
    'paper-bags': [('Carrywell', 'Carry It Proud'),
                   ('PaperThread', 'Stitched In Paper'),
                   ('Foldkraft', 'Folded Strong'),
                   ('Loop & Leaf', 'Carried With Care')],
    'flyers': [('Blueroof Studio', 'Print That Stands Out'),
               ('Locale Print Co.', 'Local Loud & Clear'),
               ('Flypaper Studio', 'Stuck On Quality'),
               ('Twoblock Designs', 'Two Blocks Ahead')],
    'red-packets': [('Fortune Fold', 'Folded With Fortune'),
                    ('Crimson Wish', 'Wishes In Crimson'),
                    ('Knot & Coin', 'Tied With Luck'),
                    ('Lantern Press', 'Lit By Tradition')],
    'calendars': [('Dayline Studio', 'Mark Every Day'),
                  ('Pagebound', 'Turn The Page'),
                  ('Foldtime', 'Time Folded Daily'),
                  ('Mark & Margin', 'Marked In Time')],
    'educational': [('Brightleaf Learning', 'Learn & Grow'),
                    ('Tiny Atlas Press', 'Small Pages, Big World'),
                    ('Skillpath', 'Path To Mastery'),
                    ('Brightbrick', 'Build With Knowledge')],
    'banners': [('Flagworks', 'Wave It Loud'),
                ('Bannerly', 'Stand Out Tall'),
                ('Skyline Sign', 'Above The Crowd'),
                ('Eventfold', 'Folded For Impact')],
    'japan-doujin': [('Sakura Studio', 'Blossoms In Ink'),
                      ('Animecraft', 'Crafted For Fans'),
                      ('Junka Press', 'Pure Fan Passion'),
                      ('Comiket 2026', 'Drawn For The Circle')],
    'wedding-invitations': [('EverAfter Press', 'Forever Begins Here'),
                            ('GoldenHour Invites', 'Written In Gold'),
                            ('Lace & Vow', 'Laced With Promises'),
                            ('Heirloom Weddings', 'Kept For Generations')],
    'place-cards': [('TableCraft Studio', 'Set The Table'),
                    ('Seating Stone', 'A Place For Everyone'),
                    ('Folded Grace', 'Graced In Paper'),
                    ('Marked Moment', 'Mark Your Seat')],
}

FICTIONAL_CLIENTS_JA = {
    'greeting-cards': [('ハニカムグリーティング', '心からの便りを'),
                       ('ペーパークレーン社', '愛を込めて折る'),
                       ('ルーメンカード', '言葉に光を添えて'),
                       ('メイプルウッド工房', 'いつも温かな願いを')],
    'stickers': [('ブライトマーク', '好きで彩る毎日'),
                 ('ワイルドルート', '自由に貼ろう'),
                 ('スティッククラフト', 'しっかり貼る、自由に彩る'),
                 ('サンポップデザイン', '世界をポップに')],
    'envelopes': [('レタークラフト', '一語一語を大切に'),
                  ('アイボリーメイル', '上品に封じる'),
                  ('シールドアンドセンド', 'あなたから、誰かへ'),
                  ('ペンマーク', 'あなたの物語を書く')],
    'menus': [('薪火ビストロ', '炎で烹る'),
              ('サフランアンドセイジ', '人生のスパイス'),
              ('オリーブブランチ', '畑から新鮮に'),
              ('バーチ通りカフェ', '心を込めて淹れる')],
    'books': [('クイルハウス出版', '長く残る言葉'),
              ('ラークスパー出版', '花開く物語'),
              ('スティッチドページ', '手で綴じた頁'),
              ('カッパータイプ', '伝統を組む')],
    'packaging': [('ボックスクラフト社', '印象的に作る'),
                  ('ハイブパッケージング', '心を込めて包装'),
                  ('フォリオボックス', '箱に思いを込めて'),
                  ('ラップワークス', '物語を包む')],
    'posters': [('シティライン印刷', '語るを印刷する'),
                ('ボールドフレーム', '視覚をかざる'),
                ('ネオンヴハイブ', '壁に煌めく'),
                ('プラスタープレス', '色彩で押す')],
    'paper-bags': [('キャリーウェル', '誇りを持って運ぶ'),
                   ('ペーパースレッド', '紙で綴る'),
                   ('フォールドクラフト', '丈夫に折る'),
                   ('ループアンドリーフ', '心を込めて運ぶ')],
    'flyers': [('ブルールーフ', '目を引く印刷'),
               ('ローカル印刷社', 'ローカル、鮮明に'),
               ('フライペーパー', '品質で貼る'),
               ('ツーブロック', '一歩先を行く')],
    'red-packets': [('フォーチュンフォールド', '福を折る'),
                    ('クリムゾンウィッシュ', '深紅の願い'),
                    ('ノットアンドコイン', '縁と幸運を結ぶ'),
                    ('ランタンプレス', '伝統を灯す')],
    'calendars': [('デイライン工房', '一日一日を刻む'),
                  ('ページバウンド', '頁をめくる'),
                  ('フォールドタイム', '日々を折る'),
                  ('マークアンドマージン', '余白に時を記す')],
    'educational': [('ブライトリーフ学習', '学び、育つ'),
                    ('タイニーアトラス出版', '小さな頁、大きな世界'),
                    ('スキルパス', '技芸への道'),
                    ('ブライトブリック', '知識で築く')],
    'banners': [('フラッグワークス', '大きく掲げよう'),
                ('バンナリー', '高く目立つ'),
                ('スカイラインサイン', '人垣の上に'),
                ('イベントフォールド', 'ンパクトを折る')],
    'japan-doujin': [('桜スタジオ', '墨と花'),
                      ('アニメクラフト', 'ファンのために'),
                      ('純化プレス', '純粋な情熱'),
                      ('コミケット二〇二六', 'サークルのために')],
    'wedding-invitations': [('エバーアフター印刷', '永遠はここから'),
                            ('ゴールデンハー招待状', '金色に綴る'),
                            ('レースアンドヴォウ', '約束を包む'),
                            ('ヘアルームウェディング', '世代を越えて')],
    'place-cards': [('テーブルクラフト', '席を調える'),
                    ('シーティングストーン', '一人ひとりに席を'),
                    ('フォールドグレース', '和紙に座を彩る'),
                    ('マークドモーメント', '瞬間を記す席札')],
}

FICTIONAL_CLIENTS_ZHHK = {
    'greeting-cards': [('蜂巢賀卡', '用心的祝福'),
                       ('紙鶴手作', '摺出心意'),
                       ('流光賀卡', '字裡有光'),
                       ('楓葉工作室', '溫暖祝福長伴')],
    'stickers': [('炫彩貼紙', '貼出所愛'),
                 ('野根貼紙', '自由張貼'),
                 ('貼藝工坊', '貼得牢固'),
                 ('日陽設計', '跳出你的世界')],
    'envelopes': [('信藝工坊', '每字都珍重'),
                  ('象牙郵箋', '優雅封存'),
                  ('封好寄出', '從你到他'),
                  ('筆跡文具', '寫你的故事')],
    'menus': [('薪火小館', '以火烹調'),
              ('藏紅花與鼠尾草', '人生香料'),
              ('橄欖枝廚房', '田園新鮮'),
              ('樺樹街咖啡', '用心沖煮')],
    'books': [('鵝羽筆出版', '雋永文字'),
              ('燕草出版', '綻放的敘事'),
              ('縫線書坊', '手工裝幀'),
              ('銅活字', '傳統排版')],
    'packaging': [('盒藝工坊', '造出印象'),
                  ('蜂巢包裝', '用心包裝'),
                  ('對開盒作', '盒中有情'),
                  ('包藝工作室', '包裹你的故事')],
    'posters': [('城市線印刷', '印刷發聲'),
                ('膽識框藝', '框住願景'),
                ('霓虹蜂巢', '牆上微光'),
                ('石膏壓印', '色彩壓印')],
    'paper-bags': [('提得穩', '帶著自豪'),
                   ('紙線工坊', '紙中穿線'),
                   ('折得牢', '強韌折成'),
                   ('繩葉工坊', '用心攜帶')],
    'flyers': [('藍頂工作室', '吸睛印刷'),
               ('本地印刷', '在地、清晰'),
               ('飛紙工坊', '以質取勝'),
               ('雙疊設計', '走在前端')],
    'red-packets': [('福摺工坊', '摺出福氣'),
                    ('深紅祝願', '硃紅祝願'),
                    ('結與錢', '繫上好運'),
                    ('燈籠印坊', '點亮傳統')],
    'calendars': [('日線工坊', '標記每個日子'),
                  ('頁裝日曆', '翻開時間'),
                  ('摺時', '日日摺起'),
                  ('標記餘白', '餘白中記時')],
    'educational': [('亮葉學習', '學中成長'),
                    ('小地圖出版', '小頁大世界'),
                    ('技路', '技藝之道'),
                    ('亮磚', '知識築起')],
    'banners': [('旗工坊', '高高舉起'),
                ('橫幅藝', '傲然聳立'),
                ('天際標牌', '人潮之上'),
                ('活動摺', '摺出衝擊')],
    'japan-doujin': [('櫻花工坊', '墨中花開'),
                      ('動漫工藝', '為同好而製'),
                      ('純化出版', '純粹熱情'),
                      ('コミケット二〇二六', '為社團而繪')],
    'wedding-invitations': [('永恆印坊', '永恆由此起'),
                            ('金時辰邀請函', '以金書寫'),
                            ('蕾絲與誓', '繫以承諾'),
                            ('傳家婚卡', '世代珍藏')],
    'place-cards': [('席藝工坊', '排好席位'),
                    ('安席石', '人人有座'),
                    ('摺韻', '紙上韻致'),
                    ('標記此刻', '此刻有座')],
}

# ============================================================================
# 2 卖点 per locale per category (V20 风格, 不超载, 取代 V24.2 的 3 卖点)
# ============================================================================
SELLING_POINTS_2 = {
    'packaging': {'en': ('Custom Boxes', 'From $0.40-1.20'),
                  'ja': ('オリジナル箱', '¥55-130〜'),
                  'zh-hk': ('客製包裝盒', 'HK$2.8-6.6/個起')},
    'greeting-cards': {'en': ('Greeting Cards', 'From $0.20-0.80'),
                       'ja': ('グリーティングカード', '¥30-90〜'),
                       'zh-hk': ('賀卡印刷', 'HK$0.6-2/張起')},
    'stickers': {'en': ('Vinyl Stickers', 'From $0.05-0.30'),
                 'ja': ('ビニールステッカー', '¥8-30〜'),
                 'zh-hk': ('防水貼紙', 'HK$0.15-0.8/張起')},
    'envelopes': {'en': ('Custom Envelopes', 'From $0.10-0.40'),
                  'ja': ('オリジナル封筒', '¥15-45〜'),
                  'zh-hk': ('燙金信封', 'HK$0.3-1.2/個起')},
    'menus': {'en': ('Restaurant Menus', 'From $1.00-4.00'),
              'ja': ('レストランメニュー', '¥120-450〜'),
              'zh-hk': ('餐廳菜單', 'HK$5-15/本起')},
    'books': {'en': ('Custom Books', 'From $3.00-15.00'),
              'ja': ('オリジナル本', '¥350-1700〜'),
              'zh-hk': ('精裝書刊', 'HK$15-80/本起')},
    'posters': {'en': ('Event Posters', 'From $1.00-5.00'),
                'ja': ('イベントポスター', '¥120-600〜'),
                'zh-hk': ('海報印刷', 'HK$3-20/張起')},
    'paper-bags': {'en': ('Shopping Bags', 'From $0.50-2.00'),
                   'ja': ('ショッピングバッグ', '¥60-230〜'),
                   'zh-hk': ('購物紙袋', 'HK$2-8/個起')},
    'flyers': {'en': ('Marketing Flyers', 'From $0.10-0.50'),
               'ja': ('マーケティングチラシ', '¥12-60〜'),
               'zh-hk': ('傳單印刷', 'HK$0.3-1.5/張起')},
    'red-packets': {'en': ('CNY Red Packets', 'From $0.10-0.30'),
                    'ja': ('春節祝儀袋', '¥15-40〜'),
                    'zh-hk': ('春節紅包', 'HK$0.4-1.2/個起')},
    'calendars': {'en': ('Custom Calendars', 'From $2.00-8.00'),
                  'ja': ('オリジナルカレンダー', '¥250-950〜'),
                  'zh-hk': ('月曆年曆', 'HK$8-40/本起')},
    'educational': {'en': ('School Books', 'From $0.50-3.00'),
                     'ja': ('学校教材', '¥60-350〜'),
                     'zh-hk': ('學校教材', 'HK$2-15/本起')},
    'banners': {'en': ('Vinyl Banners', 'From $5.00-20.00'),
                'ja': ('ビニールバナー', '¥600-2300〜'),
                'zh-hk': ('橫幅印刷', 'HK$25-100/條起')},
    'japan-doujin': {'en': ('Doujinshi', 'From $3.00-10.00'),
                      'ja': ('同人誌', '¥350-1200〜'),
                      'zh-hk': ('同人誌印刷', 'HK$15-50/本起')},
    'wedding-invitations': {'en': ('Wedding Invites', 'From $1.00-5.00'),
                              'ja': ('結婚式招待状', '¥120-600〜'),
                              'zh-hk': ('結婚喜帖', 'HK$5-25/套起')},
    'place-cards': {'en': ('Place Cards', 'From $0.10-0.30'),
                     'ja': ('席札', '¥15-40〜'),
                     'zh-hk': ('席卡印刷', 'HK$0.4-1.2/張起')},
}

# ============================================================================
# 16 categories × product type name per locale (用于前景描述)
# ============================================================================
PRODUCT_TYPE = {
    'packaging': {'en': 'corrugated color-printed boxes', 'ja': '段ボールカラープリントボックス', 'zh-hk': '瓦楞彩印盒'},
    'greeting-cards': {'en': 'greeting cards', 'ja': 'グリーティングカード', 'zh-hk': '賀卡'},
    'stickers': {'en': 'vinyl stickers', 'ja': 'ビニールステッカー', 'zh-hk': '防水貼紙'},
    'envelopes': {'en': 'business envelopes', 'ja': 'ビジネス封筒', 'zh-hk': '商務信封'},
    'menus': {'en': 'restaurant menus', 'ja': 'レストランメニュー', 'zh-hk': '餐廳菜單'},
    'books': {'en': 'books', 'ja': '本・冊子', 'zh-hk': '書刊'},
    'posters': {'en': 'event posters', 'ja': 'イベントポスター', 'zh-hk': '活動海報'},
    'paper-bags': {'en': 'paper shopping bags', 'ja': '紙ショッピングバッグ', 'zh-hk': '購物紙袋'},
    'flyers': {'en': 'marketing flyers', 'ja': 'マーケティングチラシ', 'zh-hk': '行銷傳單'},
    'red-packets': {'en': 'CNY red packets', 'ja': '春節祝儀袋', 'zh-hk': '春節紅包'},
    'calendars': {'en': 'wall and desk calendars', 'ja': '壁掛け卓上カレンダー', 'zh-hk': '掛曆桌曆'},
    'educational': {'en': 'school exercise books', 'ja': '学校教材・練習帳', 'zh-hk': '學校教材'},
    'banners': {'en': 'vinyl outdoor banners', 'ja': '屋外ビニールバナー', 'zh-hk': '戶外橫幅'},
    'japan-doujin': {'en': 'doujinshi fan books', 'ja': '同人誌同人本', 'zh-hk': '同人誌同人本'},
    'wedding-invitations': {'en': 'wedding invitations', 'ja': '結婚式招待状', 'zh-hk': '結婚喜帖'},
    'place-cards': {'en': 'place cards and table cards', 'ja': '席札テーブルカード', 'zh-hk': '席位卡桌卡'},
}

# 16 categories × 1 specific background per locale
BACKGROUND = {
    'packaging': {'en': 'blurred US DTC unboxing on a clean wooden tabletop', 'ja': 'ぼやけた高級ギフトカウンターの開梱シーン', 'zh-hk': '模糊的高級禮品櫃台開箱場景'},
    'greeting-cards': {'en': 'blurred US holiday dinner table setting', 'ja': 'ぼやけた祝祭の食卓', 'zh-hk': '模糊的節慶餐桌陳設'},
    'stickers': {'en': 'blurred creative US workspace with a Hydro Flask', 'ja': 'ぼやけたクリエイティブな作業机', 'zh-hk': '模糊的創意工作桌面'},
    'envelopes': {'en': 'blurred US executive desk with fountain pen', 'ja': 'ぼやけた役員机', 'zh-hk': '模糊的高管辦公桌'},
    'menus': {'en': 'blurred US restaurant table with wine glass', 'ja': 'ぼやけたレストランのテーブル', 'zh-hk': '模糊的高級餐廳桌面'},
    'books': {'en': 'blurred US chesterfield armchair reading nook', 'ja': 'ぼやけた書斎のチェスターフィールド', 'zh-hk': '模糊的書房閱讀角'},
    'posters': {'en': 'blurred US urban gallery wall with frame', 'ja': 'ぼやけたギャラリー壁', 'zh-hk': '模糊的城市藝廊牆面'},
    'paper-bags': {'en': 'blurred US boutique sidewalk with mannequins', 'ja': 'ぼやけたブティック店頭', 'zh-hk': '模糊的精品店人行道'},
    'flyers': {'en': 'blurred US café entrance with corkboard', 'ja': 'ぼやけたカフェ入口', 'zh-hk': '模糊的咖啡店入口'},
    'red-packets': {'en': 'blurred US Asian-American CNY family table', 'ja': 'ぼやけた春節家族の団らん', 'zh-hk': '模糊的春節家庭團圓'},
    'calendars': {'en': 'blurred US home office with morning light', 'ja': 'ぼやけたホームオフィス', 'zh-hk': '模糊的家庭辦公室'},
    'educational': {'en': 'blurred US school library reading corner', 'ja': 'ぼやけた学校図書館', 'zh-hk': '模糊的學校圖書館'},
    'banners': {'en': 'blurred US outdoor festival entrance with bunting', 'ja': 'ぼやけた屋外フェスティバル入口', 'zh-hk': '模糊的戶外節慶入口'},
    'japan-doujin': {'en': 'blurred anime convention booth with standee', 'ja': 'ぼやけたコミケット風同人サークルスペース', 'zh-hk': '模糊的同人攤位場景'},
    'wedding-invitations': {'en': 'blurred US garden wedding with chapel', 'ja': 'ぼやけたガーデンウェディング', 'zh-hk': '模糊的花園婚禮場景'},
    'place-cards': {'en': 'blurred US wedding reception table with florals', 'ja': 'ぼやけた披露宴テーブル', 'zh-hk': '模糊的婚宴桌面'},
}

# 16 categories × small text elements
SMALL_ELEMENTS = {
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

# 16 categories × industry scenarios
INDUSTRY = {
    'packaging': {'en': 'cross-border e-commerce, beauty, electronics, subscription box',
                   'ja': '越境EC、美容、エレクトロニクス、サブスク',
                   'zh-hk': '跨境電商、美妝、電子產品、訂閱盒'},
    'greeting-cards': {'en': 'Christmas, Thanksgiving, Valentine, wedding, corporate',
                        'ja': 'クリスマス、感謝祭、バレンタイン、結婚式、法人',
                        'zh-hk': '聖誕、感恩、情人、婚禮、企業'},
    'stickers': {'en': 'small business branding, laptop decoration, product packaging, giveaways',
                  'ja': '中小企業ブランディング、ノート装飾、製品パッケージ、景品',
                  'zh-hk': '小企業品牌、筆電裝飾、產品包裝、贈品'},
    'envelopes': {'en': 'law firm, real estate, wedding suite, direct mail',
                   'ja': '法律事務所、不動産、結婚式セット、DM',
                   'zh-hk': '律師樓、房地產、婚禮套裝、直郵'},
    'menus': {'en': 'fine dining, izakaya, bistro, hotel restaurant',
              'ja': '高級料理、居酒屋、ビストロ、ホテルレストラン',
              'zh-hk': '高級餐廳、居酒屋、小酒館、酒店餐廳'},
    'books': {'en': 'self-publishing, corporate report, photo book, art catalog',
              'ja': '自費出版、企業年報、写真集、美術カタログ',
              'zh-hk': '自費出版、企業年報、相冊、美術目錄'},
    'posters': {'en': 'concert, exhibition, film festival, retail promotion',
                'ja': 'コンサート、展覧会、映画祭、小売プロモーション',
                'zh-hk': '演唱會、展覽、電影節、零售促銷'},
    'paper-bags': {'en': 'boutique, gift shop, coffee shop, farmers market, department store',
                    'ja': 'ブティック、ギフトショップ、カフェ、農産物市場、百貨店',
                    'zh-hk': '精品店、禮品店、咖啡店、農夫市集、百貨公司'},
    'flyers': {'en': 'restaurant opening, real estate, fitness class, community event',
               'ja': 'レストラン開店、不動産、フィットネスクラス、地域イベント',
               'zh-hk': '餐廳開幕、房地產、健身課、社區活動'},
    'red-packets': {'en': 'CNY corporate gifting, wedding banquet, brand CNY campaign',
                     'ja': '春節企業ギフト、披露宴、ブランド春節キャンペーン',
                     'zh-hk': '春節企業送禮、婚宴、品牌春節活動'},
    'calendars': {'en': 'corporate year-end gifts, real estate, photo studio, school',
                   'ja': '企業年末ギフト、不動産、写真スタジオ、学校',
                   'zh-hk': '企業年末禮品、房地產、攝影工作室、學校'},
    'educational': {'en': 'K-12 schools, tutoring centers, homeschool, training',
                     'ja': 'K-12学校、塾、ホームスクール、研修',
                     'zh-hk': 'K-12學校、補習班、自學、培訓'},
    'banners': {'en': 'trade show, grand opening, sports event, open house, fair',
                'ja': '展示会、開店式典、スポーツイベント、見学会、祭り',
                'zh-hk': '展會、開業、體育賽事、開放日、廟會'},
    'japan-doujin': {'en': 'Comiket, anime convention, indie comic circle, club event',
                      'ja': 'コミケット、アニメコンベ、インディーズ漫画サークル、部活イベント',
                      'zh-hk': 'Comiket、同人展、獨立漫畫社團、學校社團'},
    'wedding-invitations': {'en': 'wedding, destination wedding, hotel wedding, chapel',
                              'ja': '結婚式、destination挙式、ホテル結婚式、チャペル',
                              'zh-hk': '婚禮、海外婚禮、酒店婚禮、教堂'},
    'place-cards': {'en': 'wedding, hotel banquet, fine dining, corporate gala',
                     'ja': '結婚式、ホテル披露宴、高級レストラン、企業ガラ',
                     'zh-hk': '婚禮、酒店宴會、高級餐廳、企業晚宴'},
}

# ============================================================================
# 4 视图 composition (短, 1 句 per view per locale)
# ============================================================================
VIEW_COMP = {
    'HERO': {'en': 'product centered 80-85% of frame, clean margin, slight angled perspective',
             'ja': '商品を画面中央80-85%、クリアな余白、軽い角度付き構図',
             'zh-hk': '產品置於畫面中央80-85%，留有乾淨邊距，輕微斜角構圖'},
    'DETAIL': {'en': 'extreme close-up 85-95% of frame, macro on material/texture, shallow DoF',
               'ja': '画面の85-95%を埋める超クローズアップ、素材にマクロフォーカス、浅い被写界深度',
               'zh-hk': '超近距特寫佔畫面85-95%，對焦材質紋理，淺景深'},
    'VARIETY': {'en': '3-4 colorways grouped, one variant held by a hand for scale',
                'ja': '3-4種類のカラーバリエーションを配置、1点のみ人間の手が触れスケール感',
                'zh-hk': '3-4款配色並列展示，其中一款有人手互動呈現真實比例'},
    'MULTI-ANGLE': {'en': '3 views in one frame (front, angled, detail), neutral studio backdrop',
                    'ja': '3つの視点を1フレームに収める、ニュートラルな撮影背景',
                    'zh-hk': '3個視角同框呈現，中性攝影背景'},
}

# ============================================================================
# Anti-garbage (1 短句 per locale, 统一)
# ============================================================================
ANTI_GARBAGE = {
    'en': 'No other text, gibberish, watermarks, brand names, or multiple labels.',
    'ja': '他のテキスト、意味不明文字、透かし、ロゴ、複数ラベル一切なし。',
    'zh-hk': '絕無其他文字、亂碼、浮水印、品牌名、多重標籤。',
}

# ============================================================================
# Color + aesthetic (1 句, 50-80 chars, BRIGHT vivid 修复)
# ============================================================================
COLOR_AESTHETIC = {
    'en': 'color-saturated vivid colors, BRIGHT CLEAR daylight, not dim/overcast/muddy. Cinematic photo-real, US DTC premium, warm trustworthy lifestyle.',
    'ja': '色彩彩度の高い鮮やかな色、明るいクリアな昼光、暗く曇り濁りなし。シネマティック写実、日本市場プレミアム、温かい信頼ライフスタイル。',
    'zh-hk': '色彩飽滿鮮明、晴朗清晰日光、不昏暗不陰天不朦朧。電影寫實風格、香港送禮美學、溫暖可信生活視覺。',
}


def parse_skus():
    """Parse products.ts → list of SKU dicts with all fields needed for prompts."""
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

        skus.append({
            'id': sku_id,
            'slug': find(r"slug:\s*'([^']+)'"),
            'category': find(r"category:\s*'([^']+)'"),
            'category_slug': find(r"category_slug:\s*'([^']+)'") or find(r"category:\s*'([^']+)'"),
            'nameEn': find(r"nameEn:\s*'([^']+)'"),
            'nameJa': find(r"nameJa:\s*'([^']+)'"),
            'name_zh': find(r"name_zh:\s*'([^']+)'"),
            'descriptionEn': find(r"descriptionEn:\s*'([^']+)'"),
            'descriptionJa': find(r"descriptionJa:\s*'([^']+)'"),
            'description_zh': find(r"description_zh:\s*'([^']+)'"),
            'price_range': find(r"price_range:\s*'([^']+)'"),
        })
    return skus


def get_fictional_client(sku_id, category_slug, locale):
    """Return (brand, tagline) for the SKU based on category + SKU order + locale."""
    matrix = {
        'en': FICTIONAL_CLIENTS_EN,
        'ja': FICTIONAL_CLIENTS_JA,
        'zh-hk': FICTIONAL_CLIENTS_ZHHK,
    }[locale]
    clients = matrix.get(category_slug, [('Studio Co.', 'Made With Care')])
    m = re.search(r'-(\d+)$', sku_id)
    idx = (int(m.group(1)) - 1) % 4 if m else 0
    return clients[idx]


def get_product_desc(sku, locale):
    """Get description per locale, V22 12-field, NOT truncated."""
    desc_field = {'en': 'descriptionEn', 'ja': 'descriptionJa', 'zh-hk': 'description_zh'}[locale]
    return sku.get(desc_field, sku.get('descriptionEn', ''))


def build_prompt(sku, view, locale):
    """Build V24.3 prompt: 1 line, ≤2300 chars, fictional brand on surface + ZprintPro in description."""
    cat = sku['category_slug']
    product_type = PRODUCT_TYPE.get(cat, {}).get(locale, 'product')
    bg = BACKGROUND.get(cat, {}).get(locale, '')
    small_el = SMALL_ELEMENTS.get(cat, {}).get(locale, 'small text')
    industry = INDUSTRY.get(cat, {}).get(locale, 'general use')
    sp_main, sp_price = SELLING_POINTS_2.get(cat, {}).get(locale, ('Custom Print', 'From $1'))

    # Fictional client brand (印在产品表面)
    fake_brand, fake_tagline = get_fictional_client(sku['id'], cat, locale)

    # 12 字段 description (V22 保留, NOT truncated)
    product_desc = get_product_desc(sku, locale)

    # View composition
    view_comp = VIEW_COMP[view][locale]

    # Common helpers
    anti = ANTI_GARBAGE[locale]
    color_aes = COLOR_AESTHETIC[locale]
    real_brand = REAL_BRAND_PROVIDER[locale]
    price_real = sku.get('price_range', '')

    if locale == 'en':
        prompt = (
            f'PRODUCTION-READY FINAL IMAGE ONLY. Square 1:1, 8K UHD e-commerce product photo. {anti}'
            f' Top-right red burst badge: white bold text on deep red #DC2626, 3px stroke. Main: "{sp_main}", sub: "{sp_price}".'
            f' Foreground: design-aesthetic {product_type} printed for fictional client "{fake_brand}": brand name "{fake_brand}" and tagline "{fake_tagline}" in English (complete, accurate) in professional typography on product surface, with brand-themed decorative pattern and graphic motif, plus real small text elements ({small_el}) in neat blocks. This product is provided by {real_brand}.'
            f' Background: {bg}, neighboring lifestyle props faintly visible, product tack-sharp occupying 75-85% of frame. Mainly used in {industry}.'
            f' Composition: {view_comp}.'
            f' Color & aesthetic: {color_aes}'
            f' Product: {product_desc}'
            f' Real price reference: {price_real}.'
            f' Negative: blurry, watermark, distorted, gibberish, dim lighting, muddy, faded, garish neon.'
        )
    elif locale == 'ja':
        prompt = (
            f'プロダクションレディ最終イメージのみ。正方形 1:1、8K UHD eコマース商品写真。{anti}'
            f' 右上の赤いバーストバッジ: 白い太字テキスト、深い赤 #DC2626、3px ストローク。メイン:「{sp_main}」、サブ:「{sp_price}」。'
            f' 前景: デザイン美と色彩の鮮やかな {product_type}、架空クライアント「{fake_brand}」印刷: ブランド名「{fake_brand}」とタグライン「{fake_tagline}」を日本語（完全・正確）でプロフェッショナル書体で製品表面に印刷、ブランドテーマ装飾パターンと图形モチーフ、実在小文字要素 ({small_el}) を整然と配置。本製品は {real_brand} が提供します。'
            f' 背景: {bg}、隣接する小道具がうっすら見え、商品はくっきり鮮明でフレームの75-85%を占める。主に {industry} で使用。'
            f' 構図: {view_comp}。'
            f' 色彩と美学: {color_aes}'
            f' 製品: {product_desc}'
            f' 実価格参考: {price_real}。'
            f' ネガティブ: ぼやけ、透かし、歪み、意味不明文字、暗い照明、濁り、褪色、けばけばしいネオン。'
        )
    else:  # zh-hk
        prompt = (
            f'製作級最終圖像,非草稿非測試。正方形 1:1, 8K 超高清電商商品攝影。{anti}'
            f' 右上角紅色爆炸贴: 白色粗體字,深紅 #DC2626 底色, 3px 描邊。主標:「{sp_main}」、副標:「{sp_price}」。'
            f' 前景: 具有設計美感、色彩鮮明的 {product_type},虛構客戶「{fake_brand}」印刷: 品牌名「{fake_brand}」及標語「{fake_tagline}」以繁體中文（筆畫完整準確）專業字體印於產品表面,配品牌主題裝飾圖案及图形圖案,另配真實小字元素 ({small_el}) 整齊小字塊。本產品由 {real_brand} 提供。'
            f' 背景: {bg},鄰近小道具隱約可見,產品銳利清晰佔畫面75-85%。主要應用於 {industry}。'
            f' 構圖: {view_comp}。'
            f' 色彩與美學: {color_aes}'
            f' 產品: {product_desc}'
            f' 真實價格參考: {price_real}。'
            f' 負面: 模糊、浮水印、變形、亂碼、昏暗光線、混濁、褪色、俗豔霓虹。'
        )

    return prompt


def main():
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument('--locale', default='en', choices=['en', 'ja', 'zh-hk'])
    ap.add_argument('--out', help='Output file path')
    ap.add_argument('--skus', nargs='+', help='Generate only these SKUs')
    args = ap.parse_args()

    skus = parse_skus()
    if args.skus:
        sel = {s.split(' ')[0] for s in args.skus}
        skus = [s for s in skus if s['id'] in sel]

    out_path = Path(args.out) if args.out else {
        'en': OUTPUT_EN, 'ja': OUTPUT_JA, 'zh-hk': OUTPUT_ZHHK,
    }[args.locale]

    out_lines = []
    out_lines.append(f'V24.3 ALL-SKU {args.locale.upper()} PROMPTS | ZprintPro (NOT on image) + fictional brand on surface')
    out_lines.append('=' * 78)
    out_lines.append('Generated 2026-08-24 — K3 8/24 01:55 拍板.')
    out_lines.append('KEY V24.3 FIX (over V24.2):')
    out_lines.append('  1. ZprintPro 真实品牌 NOT on image — only "This product is provided by ZprintPro" in description')
    out_lines.append('  2. Fictional client brand (V23.5 matrix, 4 client × 16 cat × 3 locale) printed on surface')
    out_lines.append('  3. V22 12-field descriptionEn/descriptionJa/description_zh fully preserved, NOT truncated')
    out_lines.append('  4. 2 selling points (V20 style) — main + price, no overload')
    out_lines.append('  5. Strict ≤2300 chars hard constraint')
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
        sorted_c = sorted(char_counts)
        print(f'Char range: {min(char_counts)} - {max(char_counts)} (avg {sum(char_counts)//len(char_counts)})')
        print(f'p50: {sorted_c[len(sorted_c)//2]}, p75: {sorted_c[len(sorted_c)*3//4]}, p90: {sorted_c[len(sorted_c)*9//10]}')
        print(f'Over 2300 chars: {over}/{len(char_counts)}')


if __name__ == '__main__':
    main()
