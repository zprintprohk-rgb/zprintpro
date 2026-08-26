#!/usr/bin/env python3
"""
V23.1 Prompt Generator for zprintpro.com
K3 拍板: A(命名修复) + JA本土化(做) + zh-hk繁体中文 + JA英文
修复 4 硬伤 + 增强 1/2/3
输入: .hermes/_v23_prompts.txt + .hermes/_products_export.json
输出: seedream/v23.1-prompts-en.txt / v23.1-prompts-zh-hk.txt / v23.1-prompts-ja.txt
"""
import json, re, sys
from pathlib import Path

# ══════════════════════════════════════════════════════════════
# PART 1: 16 类目 × AUDIENCE (EN 正确版，修复半截句+串类目)
# ══════════════════════════════════════════════════════════════
AUDIENCE = {
 'greeting-cards': 'US individuals, wedding planners, churches and corporate gift-givers ordering premium greeting cards; they need thick cardstock with foil and spot-UV finishes that feel premium in hand and photograph beautifully',
 'stickers': 'US e-commerce brands, cafes, and indie creators ordering custom stickers; they need durable waterproof vinyl with precise die-cut shapes for product branding, packaging seals, and promotional giveaways',
 'paper-bags': 'US retail boutiques, fashion brands, and event organizers ordering branded paper bags; they need sturdy twisted or flat handles and premium print quality that reinforces their brand identity at every touchpoint',
 'flyers': 'US restaurants, retailers, and event promoters ordering flyers for local marketing campaigns; they need vivid full-color printing and reliable turnaround for time-sensitive promotions',
 'posters': 'US event organizers, retail stores, and interior decorators ordering posters; they need large-format color accuracy and durable paper stock for both indoor and short-term outdoor display',
 'packaging': 'US e-commerce and consumer product brands ordering custom packaging boxes; they need structural precision, vibrant offset printing, and a premium unboxing experience that elevates their product',
 'red-packets': 'US-based Chinese community organizations, brands, and families ordering custom red packets for Lunar New Year and celebrations; they need traditional auspicious designs with modern customization options',
 'calendars': 'US businesses, schools, and nonprofits ordering custom calendars for year-end corporate gifts and fundraising; they need accurate date grids, premium paper, and durable binding that lasts all year',
 'menus': 'US restaurants, cafes, and bars ordering professional menu printing; they need durable laminated or waterproof finishes and color-accurate reproduction that makes food photography look appetizing',
 'banners': 'US event organizers, retail stores, and trade-show exhibitors ordering banners; they need weather-resistant vinyl or fabric with vivid large-format color that commands attention from a distance',
 'books': 'US self-publishers, marketing teams, and corporate training departments ordering booklets, catalogs, and manuals; they need consistent color reproduction and professional binding quality across the entire print run',
 'envelopes': 'US businesses, law firms, and event planners ordering branded envelopes; they need precise die-cut sizing, clean professional printing, and paper stock that feels substantial in hand',
 'educational': 'US tutoring centers, schools, and corporate training companies ordering workbooks and educational materials; they need durable saddle-stitched or spiral binding and crisp legible print for daily classroom use',
 'japan-doujin': 'US anime convention artists, indie game developers, and creative circles ordering doujin merchandise and art prints; they need color-faithful reproduction of original artwork and flexible small-batch minimums',
 'wedding-invitations': 'US engaged couples and professional wedding planners ordering invitation suites; they need elegant paper textures, precise foil or letterpress finishing, and cohesive design that sets the tone for the entire celebration',
 'place-cards': 'US engaged couples, wedding planners, and event venue coordinators ordering place cards and escort cards; they need premium cardstock with clean die-cut edges and printing that complements their table setting theme',
}

# ══════════════════════════════════════════════════════════════
# PART 1b: JA 版 AUDIENCE (日本买家身份, 英文写)
# ══════════════════════════════════════════════════════════════
AUDIENCE_JA = {
 'greeting-cards': 'Japanese individuals, wedding planners, and corporate gift-givers ordering premium greeting cards; they need thick cardstock with foil and spot-UV finishes that feel premium in hand and photograph beautifully',
 'stickers': 'Japanese e-commerce brands, zakka shops, and indie creators ordering custom stickers; they need durable waterproof vinyl with precise die-cut shapes for product branding and packaging seals',
 'paper-bags': 'Japanese retail boutiques, fashion brands, and event organizers ordering branded paper bags; they need sturdy handles and premium print quality that reinforces brand identity at every touchpoint',
 'flyers': 'Japanese restaurants, retailers, and event promoters ordering flyers for local marketing campaigns; they need vivid full-color printing and reliable turnaround for time-sensitive promotions',
 'posters': 'Japanese event organizers, retail stores, and interior decorators ordering posters; they need large-format color accuracy and durable paper stock for indoor and short-term outdoor display',
 'packaging': 'Japanese e-commerce and consumer product brands ordering custom packaging boxes; they need structural precision, vibrant offset printing, and a premium unboxing experience that elevates their product',
 'red-packets': 'Japanese companies and individuals ordering decorative envelopes for New Year oshogatsu and special celebrations; they need traditional auspicious designs with modern customization options',
 'calendars': 'Japanese businesses, schools, and organizations ordering custom calendars for year-end corporate gifts; they need accurate date grids, premium paper, and durable binding that lasts all year',
 'menus': 'Japanese restaurants, cafes, and izakaya ordering professional menu printing; they need durable laminated or waterproof finishes and color-accurate reproduction that makes food photography look appetizing',
 'banners': 'Japanese event organizers, retail stores, and exhibition exhibitors ordering banners; they need weather-resistant materials with vivid large-format color that commands attention',
 'books': 'Japanese self-publishers, marketing teams, and corporate training departments ordering booklets and catalogs; they need consistent color reproduction and professional binding quality across the entire print run',
 'envelopes': 'Japanese businesses and event planners ordering branded envelopes; they need precise die-cut sizing, clean professional printing, and paper stock that feels substantial in hand',
 'educational': 'Japanese cram schools juku, schools, and training companies ordering workbooks and educational materials; they need durable binding and crisp legible print for daily classroom use',
 'japan-doujin': 'Japanese doujin circles, indie creators, and Comiket exhibitors ordering doujin merchandise and art prints; they need color-faithful reproduction of original artwork and flexible small-batch minimums',
 'wedding-invitations': 'Japanese engaged couples and professional wedding planners ordering invitation suites; they need elegant paper textures, precise foil or letterpress finishing, and cohesive design that sets the tone for the entire celebration',
 'place-cards': 'Japanese engaged couples, wedding planners, and event venue coordinators ordering place cards and escort cards; they need premium cardstock with clean die-cut edges and printing that complements their table setting theme',
}

# ══════════════════════════════════════════════════════════════
# PART 2: 16 类目 × 3 locale SCENE (EN=US / zh-hk=HK繁体 / JA=日本英文)
# ══════════════════════════════════════════════════════════════
SCENE_EN = {
 'greeting-cards': 'holiday dinner table in use — cards arranged beside vintage tableware and brass candle holders, neighboring gift wrap and ribbon faintly visible, background softly blurred, product tack-sharp',
 'stickers': 'creative workspace in use — stickers being applied to laptop lids and kraft mailers, neighboring coffee mug and small plants faintly visible, background softly blurred, product tack-sharp',
 'paper-bags': 'boutique shopping street in use — a customer hand carrying the branded bag, neighboring storefront windows faintly visible, background softly blurred, product tack-sharp',
 'flyers': 'community bulletin board at cafe entrance in use — flyers pinned and neatly stacked, neighboring coffee cup and event notes faintly visible, background softly blurred, product tack-sharp',
 'posters': 'urban gallery wall in use — framed poster hung among other frames, neighboring bench and green plant faintly visible, background softly blurred, product tack-sharp',
 'packaging': 'premium unboxing scene in use — box opened with tissue paper on a wooden tabletop, neighboring beauty products and jewelry boxes faintly visible, background softly blurred, product tack-sharp',
 'red-packets': 'Lunar New Year family table in use — red packets arranged with gold festive decor, neighboring tangerines and paper lantern faintly visible, background softly blurred, product tack-sharp',
 'calendars': 'home office wall in use — calendar hung beside a morning coffee desk, neighboring stationery faintly visible, background softly blurred, product tack-sharp',
 'menus': 'restaurant table in use — menu standing beside ceramic tableware and a wine glass, neighboring candle faintly visible, background softly blurred, product tack-sharp',
 'banners': 'trade show entrance in use — banner displayed with booth setup, neighboring display stands faintly visible, background softly blurred, product tack-sharp',
 'books': 'reading nook in use — book resting on a side table beside a Chesterfield armchair, neighboring floor lamp and book stack faintly visible, background softly blurred, product tack-sharp',
 'envelopes': 'executive desk in use — envelopes beside a fountain pen and wax seal, neighboring bookshelf faintly visible, background softly blurred, product tack-sharp',
 'educational': 'classroom desk in use — workbook open with a pencil, neighboring colorful learning materials faintly visible, background softly blurred, product tack-sharp',
 'japan-doujin': 'convention artist alley table in use — doujin goods displayed, neighboring character standees and art prints faintly visible, background softly blurred, product tack-sharp',
 'wedding-invitations': 'bridal preparation table in use — invitation suite arranged with silk ribbon, neighboring fresh flowers faintly visible, background softly blurred, product tack-sharp',
 'place-cards': 'wedding reception table in use — place cards on linen tablecloth, neighboring candlelight and florals faintly visible, background softly blurred, product tack-sharp',
}
SCENE_ZHHK = {
 'greeting-cards': '節日餐桌使用中場景 — 賀卡放復古餐具及黃銅燭台旁，鄰近禮物包裝及絲帶隱約可見，背景柔和虛化，產品銳利清晰',
 'stickers': '創意工作枱使用中場景 — 貼紙貼於筆電及牛皮紙盒上，鄰近咖啡杯及小盆栽隱約可見，背景柔和虛化，產品銳利清晰',
 'paper-bags': '精品購物街使用中場景 — 顧客手手提品牌紙袋，鄰近品牌店櫥窗隱約可見，背景柔和虛化，產品銳利清晰',
 'flyers': '社區告示板咖啡店入口使用中場景 — 傳單釘掛及疊放，鄰近咖啡杯及活動便條隱約可見，背景柔和虛化，產品銳利清晰',
 'posters': '城市畫廊牆使用中場景 — 海報裱框掛牆，鄰近長椅及綠植隱約可見，背景柔和虛化，產品銳利清晰',
 'packaging': '高級開箱使用中場景 — 盒放木桌面配薄紙打開，鄰近美妝產品及首飾盒隱約可見，背景柔和虛化，產品銳利清晰',
 'red-packets': '農曆新年家庭餐桌使用中場景 — 利是封配金色賀年裝飾，鄰近年桔及紙燈籠隱約可見，背景柔和虛化，產品銳利清晰',
 'calendars': '家居辦公牆使用中場景 — 月曆掛牆配晨光咖啡，鄰近書桌文具隱約可見，背景柔和虛化，產品銳利清晰',
 'menus': '餐廳餐桌使用中場景 — 餐牌立於陶瓷餐具及酒杯旁，鄰近蠟燭隱約可見，背景柔和虛化，產品銳利清晰',
 'banners': '展覽入口使用中場景 — 橫額配攤位佈置，鄰近展示架隱約可見，背景柔和虛化，產品銳利清晰',
 'books': '閱讀角使用中場景 — 書放扶手椅旁邊几，鄰近落地燈及書堆隱約可見，背景柔和虛化，產品銳利清晰',
 'envelopes': '行政書桌使用中場景 — 信封配鋼筆及火漆印，鄰近書架隱約可見，背景柔和虛化，產品銳利清晰',
 'educational': '教室書桌使用中場景 — 練習簿打開配鉛筆，鄰近彩色教材隱約可見，背景柔和虛化，產品銳利清晰',
 'japan-doujin': '同人即賣會攤位使用中場景 — 同人商品陳列，鄰近角色立牌及印刷品隱約可見，背景柔和虛化，產品銳利清晰',
 'wedding-invitations': '新娘化妝間使用中場景 — 喜帖套裝配絲帶，鄰近鮮花隱約可見，背景柔和虛化，產品銳利清晰',
 'place-cards': '婚宴餐桌使用中場景 — 枱卡放麻質桌布，鄰近燭光及花藝隱約可見，背景柔和虛化，產品銳利清晰',
}
# JA 版: 英文 prompt + 日本本土化场景
SCENE_JA = {
 'greeting-cards': 'Japanese seasonal gift table in use — cards beside a mizuhiki-decorated wrapped gift, neighboring washi paper faintly visible, background softly blurred, product tack-sharp',
 'stickers': 'Japanese zakka shop counter in use — stickers applied to craft packaging and notebooks, neighboring tape rolls and tags faintly visible, background softly blurred, product tack-sharp',
 'paper-bags': 'Japanese boutique shopping district in use — a customer hand carrying the branded bag, neighboring storefront with noren curtain faintly visible, background softly blurred, product tack-sharp',
 'flyers': 'Japanese cafe entrance bulletin board in use — flyers pinned and stacked, neighboring coffee cup and community notes faintly visible, background softly blurred, product tack-sharp',
 'posters': 'Japanese gallery wall in use — framed poster hung with generous spacing, neighboring bench and bonsai faintly visible, background softly blurred, product tack-sharp',
 'packaging': 'Japanese premium unboxing scene in use — box opened with tissue paper on a hinoki wood surface, neighboring ceramic and craft items faintly visible, background softly blurred, product tack-sharp',
 'red-packets': 'Japanese New Year oshogatsu table in use — decorative envelopes with pine and plum ornaments, neighboring kagami mochi faintly visible, background softly blurred, product tack-sharp',
 'calendars': 'Japanese home office wall in use — calendar hung beside a morning green tea desk, neighboring stationery faintly visible, background softly blurred, product tack-sharp',
 'menus': 'Japanese restaurant table in use — menu standing beside ceramic tableware and chopstick rest, neighboring small flower vase faintly visible, background softly blurred, product tack-sharp',
 'banners': 'Japanese exhibition entrance in use — banner displayed with booth setup, neighboring display panels faintly visible, background softly blurred, product tack-sharp',
 'books': 'Japanese reading corner in use — book on a low wooden side table, neighboring floor lamp and book stack faintly visible, background softly blurred, product tack-sharp',
 'envelopes': 'Japanese office desk in use — envelopes beside a fountain pen and seal stamp, neighboring bookshelf faintly visible, background softly blurred, product tack-sharp',
 'educational': 'Japanese juku classroom desk in use — workbook open with a pencil, neighboring colorful learning materials faintly visible, background softly blurred, product tack-sharp',
 'japan-doujin': 'Comiket-style artist booth in use — doujin goods displayed, neighboring character standees and prints faintly visible, background softly blurred, product tack-sharp',
 'wedding-invitations': 'Japanese bridal preparation room in use — invitation suite with silk ribbon, neighboring seasonal flowers faintly visible, background softly blurred, product tack-sharp',
 'place-cards': 'Japanese wedding reception table in use — place cards on linen, neighboring candlelight and ikebana florals faintly visible, background softly blurred, product tack-sharp',
}

# ══════════════════════════════════════════════════════════════
# PART 2c: V23.2 虚构客户矩阵 (学自 V17→V19 14虚构公司 + V20.4 真实可读文字)
# 产品上印受控虚构客户信息 = 代入感, 不是公版光图
# 品牌按类目内 SKU 序号 % 4 循环
# ══════════════════════════════════════════════════════════════
CLIENT_BRAND_EN = {
 'greeting-cards': ['Maplewood Studio', 'Honeycomb Greetings', 'PaperCrane Co.', 'Lumen Cards'],
 'stickers': ['BriteMark', 'Wildroot Stickers', 'Stickcraft Studio', 'SunPop Designs'],
 'paper-bags': ['Carrywell', 'PaperThread', 'Foldkraft', 'Loop & Leaf'],
 'flyers': ['Blueroof Studio', 'Locale Print Co.', 'Flypaper Studio', 'Twoblock Designs'],
 'posters': ['Cityline Prints', 'Boldframe Studio', 'Neon Hive', 'Plaster Press'],
 'packaging': ['BoxCraft Co.', 'Hive Packaging', 'FolioBox', 'WrapWorks Studio'],
 'red-packets': ['Fortune Fold', 'Crimson Wish', 'Knot & Coin', 'Lantern Press'],
 'calendars': ['Dayline Studio', 'Pagebound', 'Foldtime', 'Mark & Margin'],
 'menus': ['Woodfire Bistro', 'Saffron & Sage', 'Olive Branch Kitchen', 'Birch Street Cafe'],
 'banners': ['Flagworks', 'Bannerly', 'Skyline Sign', 'Eventfold'],
 'books': ['Quillhouse Press', 'Larkspur Publishing', 'Stitched Pages', 'Copper Type'],
 'envelopes': ['LetterCraft', 'Ivory Mail', 'Sealed & Sent', 'Penmark Stationers'],
 'educational': ['Brightleaf Learning', 'Tiny Atlas Press', 'Skillpath', 'Brightbrick'],
 'japan-doujin': ['Sakura Studio', 'Animecraft', 'Junka Press', 'Hoshi Circle'],
 'wedding-invitations': ['Everline Vows', 'Blush & Bindery', 'Vellum Rose Studio', 'Austen & Ivy'],
 'place-cards': ['Tableset Co.', 'Placecard Press', 'Linen & Name', 'Escort & Elm'],
}
CLIENT_BRAND_ZHHK = {
 'greeting-cards': ['紙語', '暖意卡坊', '鶴見卡藝', '光廊'],
 'stickers': ['亮印', '野根貼藝', '貼匠工房', '陽光彈'],
 'paper-bags': ['袋好', '紙織', '摺藝坊', '環葉'],
 'flyers': ['藍屋', '社印社', '飛紙工房', '雙街'],
 'posters': ['城線', '粗框畫室', '霓虹蜂巢', '貼版'],
 'packaging': ['盒藝社', '蜂巢包裝', '對開盒坊', '包工房'],
 'red-packets': ['福摺', '緋願', '結幣', '燈籠印務'],
 'calendars': ['日線', '頁裝', '摺時', '標距'],
 'menus': ['金鑾茶記', '藏花小館', '橄欖枝', '樺樹街咖啡'],
 'banners': ['旗藝', '橫額社', '天線招牌', '活動摺'],
 'books': ['羽毛筆出版', '飛燕草', '線裝頁', '銅字'],
 'envelopes': ['信藝', '象牙郵', '封寄', '筆記文具'],
 'educational': ['亮葉學習', '小地圖', '技能徑', '亮磚'],
 'japan-doujin': ['櫻花工房', '動漫藝', '純花', '星辰同人社'],
 'wedding-invitations': ['永線婚禮', '緋紅裝幀', '羊皮玫瑰', '奧斯汀婚禮'],
 'place-cards': ['席位社', '席卡印刷', '亞麻名字', '引座榆樹'],
}
CLIENT_BRAND_JA = {
 'greeting-cards': ['紙鶴カード', 'ルーメンカード', 'はなことば', 'ひだまりカード'],
 'stickers': ['そらいろ', 'くすのきシール', 'ポップデザイン', 'ひだまりシール'],
 'paper-bags': ['かご屋', '紙いと', 'たたみ工房', 'ループ＆リーフ'],
 'flyers': ['カフェ ひより', 'あおぞら印刷', 'ことりデザイン', 'まちかど印刷所'],
 'posters': ['まちなみプリント', 'ボールドフレーム', 'にじいろスタジオ', 'ぎゃらりー印刷'],
 'packaging': ['はこ工房', 'つつみ屋', 'おりがみボックス', 'ラップワークス'],
 'red-packets': ['ぽち袋工房', 'えんぎ堂', '水引工房', '祝い紙舎'],
 'calendars': ['ひなた暦', 'つきなみ', 'ページ工房', '余白デザイン'],
 'menus': ['炭火ビストロ', 'さふらん厨房', 'オリーブ食堂', 'けやき通りカフェ'],
 'banners': ['のぼり屋', 'ばなー工房', 'そらしるし', 'イベント印刷'],
 'books': ['ことり出版', 'つくし書房', '綴じ本舗', '活字工房'],
 'envelopes': ['てがみ工房', 'しらたま郵便', 'ふうとう舎', 'ぺんまーく文具'],
 'educational': ['わかば学習', 'ちいさな地図', 'のびる出版', 'つみき教育'],
 'japan-doujin': ['さくらスタジオ', 'ほしのこ印刷', 'ゆめみる出版', 'サークル星野'],
 'wedding-invitations': ['えんむすび', 'しあわせ紙', 'ヴェールローズ', 'ことほぎ'],
 'place-cards': ['せきか工房', 'なまえカード', 'リネンと名前', 'ことり席札'],
}
# 产品上印的类目 tagline (受控短句, 防乱码核心 = 指定确切文字)
CLIENT_TAGLINE_EN = {
 'greeting-cards': 'Warm Wishes Always', 'stickers': 'Handmade With Care',
 'paper-bags': 'Curated Goods', 'flyers': 'Grand Opening Special',
 'posters': 'Summer Art Fair 2026', 'packaging': 'Thoughtfully Packed',
 'red-packets': 'Prosperity & Joy', 'calendars': 'Plan Your Year',
 'menus': 'Seasonal Menu', 'banners': 'Annual Summer Festival',
 'books': 'First Edition', 'envelopes': 'With Compliments',
 'educational': 'Learn & Grow', 'japan-doujin': 'Original Art Collection',
 'wedding-invitations': 'Together Forever', 'place-cards': 'Reserved With Love',
}
CLIENT_TAGLINE_ZHHK = {
 'greeting-cards': '心意滿載', 'stickers': '手作良品',
 'paper-bags': '精選好物', 'flyers': '開幕優惠',
 'posters': '夏日藝術節', 'packaging': '用心包裝',
 'red-packets': '福氣滿滿', 'calendars': '精彩每一天',
 'menus': '招牌推介', 'banners': '年度盛事',
 'books': '初版限定', 'envelopes': '謹啟',
 'educational': '學習成長', 'japan-doujin': '原創作品集',
 'wedding-invitations': '永結同心', 'place-cards': '甜蜜席位',
}
CLIENT_TAGLINE_JA = {
 'greeting-cards': '心を込めて', 'stickers': '手づくり良品',
 'paper-bags': '旬の贈り物', 'flyers': '新店オープン',
 'posters': '夏のアート祭', 'packaging': '心を込めた包装',
 'red-packets': '寿', 'calendars': '毎日を彩る',
 'menus': '本日のおすすめ', 'banners': '年に一度の祭り',
 'books': '初版限定', 'envelopes': '謹啓',
 'educational': '楽しく学ぼう', 'japan-doujin': 'オリジナル作品集',
 'wedding-invitations': '永遠の誓い', 'place-cards': '特別な席',
}

# ══════════════════════════════════════════════════════════════
# PART 2d: V23.2 灯光控制 (学自 V20: warm golden hour / 光源方向明确)
# ══════════════════════════════════════════════════════════════
LIGHTING_EN = {
 'greeting-cards': 'warm holiday window light with soft candle glow',
 'stickers': 'bright natural daylight from a side window',
 'paper-bags': 'warm retail spotlights with soft street reflections',
 'flyers': 'warm golden hour cafe window light with cool blue street reflection',
 'posters': 'gallery track lighting with gentle wall wash',
 'packaging': 'soft diffused studio light with one gentle shadow',
 'red-packets': 'warm festive lantern glow',
 'calendars': 'fresh morning window light',
 'menus': 'warm ambient dining light with candle accent',
 'banners': 'bright even exhibition hall lighting',
 'books': 'natural daylight mixed with warm desk lamp',
 'envelopes': 'clean soft daylight across the desk',
 'educational': 'bright cheerful classroom lighting',
 'japan-doujin': 'bright convention hall lighting',
 'wedding-invitations': 'soft romantic diffused light',
 'place-cards': 'soft warm candlelight glow',
}
LIGHTING_ZHHK = {
 'greeting-cards': '暖黃節日窗光配燭光柔暉',
 'stickers': '側窗明亮自然日光',
 'paper-bags': '暖調零售射燈配街道反射光',
 'flyers': '暖黃金時段咖啡店窗光配冷調街道反射',
 'posters': '畫廊軌道燈配柔和牆面洗光',
 'packaging': '柔和漫射影棚光配一道淺影',
 'red-packets': '暖調節日燈籠光暈',
 'calendars': '清晨窗光',
 'menus': '暖調用餐環境光配燭光點綴',
 'banners': '明亮均勻展覽廳燈光',
 'books': '自然日光配暖檯燈',
 'envelopes': '書桌淨色柔和日光',
 'educational': '明亮教室燈光',
 'japan-doujin': '明亮展會廳燈光',
 'wedding-invitations': '柔和浪漫漫射光',
 'place-cards': '柔和燭光暖暈',
}
LIGHTING_JA = LIGHTING_EN  # JA prompt 英文, 灯光描述同 EN

# ══════════════════════════════════════════════════════════════
# PART 2e: V23.2 HERO 卖点层 (user 8/23 拍板)
# zh-hk = 右上爆炸贴 (非价格卖点, 短字防乱码); JA = 左上細信息带 (无爆炸贴)
# EN = 不加 badge (US Amazon 干净主图惯例)
# ══════════════════════════════════════════════════════════════
BADGE_ZHHK = {
 'greeting-cards': ('免費設計', '72小時出貨'), 'stickers': ('免費打樣', '防水耐用'),
 'paper-bags': ('免費設計', 'FSC環保紙'), 'flyers': ('免費打樣', '72小時出貨'),
 'posters': ('免費打樣', '高清大圖'), 'packaging': ('免刀模費', '免費設計'),
 'red-packets': ('燙金工藝', '免費設計'), 'calendars': ('免費設計', '掛曆檯曆'),
 'menus': ('防水餐牌', '免費設計'), 'banners': ('戶外防水', '免費設計'),
 'books': ('免費打樣', '騎馬釘裝'), 'envelopes': ('免費打樣', '多尺寸'),
 'educational': ('免費打樣', '環保油墨'), 'japan-doujin': ('小量起印', '免費打樣'),
 'wedding-invitations': ('燙金喜帖', '免費設計'), 'place-cards': ('免費設計', '婚宴首選'),
}
INFOSTRIP_JA = {
 'greeting-cards': ('無料デザイン', '短納期対応'), 'stickers': ('無料サンプル', '防水・耐候'),
 'paper-bags': ('無料デザイン', 'FSC認証紙'), 'flyers': ('無料サンプル', '短納期対応'),
 'posters': ('無料サンプル', '高精彩印刷'), 'packaging': ('型代不要', '無料デザイン'),
 'red-packets': ('箔押し対応', '無料デザイン'), 'calendars': ('無料デザイン', '壁掛け・卓上'),
 'menus': ('防水メニュー', '無料デザイン'), 'banners': ('屋外防水', '無料デザイン'),
 'books': ('無料サンプル', '中綴じ製本'), 'envelopes': ('無料サンプル', '多サイズ'),
 'educational': ('無料サンプル', '環境インキ'), 'japan-doujin': ('小ロット対応', '無料サンプル'),
 'wedding-invitations': ('箔押し招待状', '無料デザイン'), 'place-cards': ('無料デザイン', '婚礼人気'),
}


# ══════════════════════════════════════════════════════════════
# PART 3: VARIETY 使用中场景 (增强3: 场景去重) + 人手元素 (增强2)
# ══════════════════════════════════════════════════════════════
VARIETY_SCENE_EN = {
 'greeting-cards': 'in-use scene: a hand holding one card open to reveal the printed interior, other variants arranged on a wooden desk with a pen beside them',
 'stickers': 'in-use scene: a hand peeling one sticker from its backing sheet, other variants applied to a laptop lid and a kraft mailer box',
 'paper-bags': 'in-use scene: a hand carrying one bag by its handles, other variants arranged at a retail checkout with products peeking out',
 'flyers': 'in-use scene: a hand holding one flyer at reading distance, other variants fanned on a cafe counter',
 'posters': 'in-use scene: a hand smoothing one poster onto a wall, other variants leaning against a gallery easel',
 'packaging': 'in-use scene: a hand lifting the lid of one box to reveal the product inside, other variants arranged in a stack',
 'red-packets': 'in-use scene: a hand offering one red packet in the traditional two-handed gesture, other variants arranged with gold ingots',
 'calendars': 'in-use scene: a hand flipping one calendar page to next month, other variants displayed on a desk and wall',
 'menus': 'in-use scene: a hand holding one menu open at a restaurant table, other variants stacked at the entrance stand',
 'banners': 'in-use scene: a hand adjusting one banner stand at an event entrance, other variants visible in the booth background',
 'books': 'in-use scene: a hand flipping through one booklet open to a spread, other variants stacked and fanned on a desk',
 'envelopes': 'in-use scene: a hand sealing one envelope with a card inside, other variants arranged with matching stationery',
 'educational': 'in-use scene: a hand writing in one workbook with a pencil, other variants stacked on a classroom shelf',
 'japan-doujin': 'in-use scene: a hand holding one doujin item up for display, other variants arranged on the artist alley table',
 'wedding-invitations': 'in-use scene: a hand holding one invitation open to reveal the inner design, other variants arranged with envelope and RSVP card',
 'place-cards': 'in-use scene: a hand placing one card on a charger plate, other variants arranged along the banquet table',
}
VARIETY_SCENE_ZHHK = {
 'greeting-cards': '使用情境：一隻手打開一張賀卡展示內頁印刷，其他款式放木書桌配筆',
 'stickers': '使用情境：一隻手撕起一張貼紙離底紙，其他款式貼於筆電及牛皮紙盒',
 'paper-bags': '使用情境：一隻手手提一個紙袋手柄，其他款式放收銀台配產品',
 'flyers': '使用情境：一隻手拎一張傳單閱讀距離，其他款式散放咖啡店櫃枱',
 'posters': '使用情境：一隻手撫平一張海報上牆，其他款式靠畫廊畫架',
 'packaging': '使用情境：一隻手揭開一個盒蓋展示內裡產品，其他款式疊放',
 'red-packets': '使用情境：一隻手雙手遞出一封利是（傳統手勢），其他款式配金元寶擺放',
 'calendars': '使用情境：一隻手翻一頁月曆到下個月，其他款式放書桌及掛牆',
 'menus': '使用情境：一隻手拎開一本餐牌坐餐廳餐桌，其他款式疊放入口架',
 'banners': '使用情境：一隻手調整一個易拉寶於活動入口，其他款式放攤位背景',
 'books': '使用情境：一隻手翻開一本書冊內頁，其他款式疊放及散放書桌',
 'envelopes': '使用情境：一隻手封存一個信封內有卡片，其他款式配同款文具擺放',
 'educational': '使用情境：一隻手拎鉛筆寫一本練習簿，其他款式疊放教室書架',
 'japan-doujin': '使用情境：一隻手拎起一件同人商品展示，其他款式放即賣會攤位枱',
 'wedding-invitations': '使用情境：一隻手打開一張喜帖展示內頁設計，其他款式配信封及回覆卡',
 'place-cards': '使用情境：一隻手放一張枱卡於餐碟上，其他款式沿婚宴長枱排列',
}
VARIETY_SCENE_JA = {
 'greeting-cards': 'in-use scene: a hand holding one card open to reveal the printed interior, other variants arranged on a hinoki wooden desk with a fountain pen',
 'stickers': 'in-use scene: a hand peeling one sticker from its backing sheet, other variants applied to a laptop and craft packaging',
 'paper-bags': 'in-use scene: a hand carrying one bag by its handles, other variants arranged at a boutique checkout with products inside',
 'flyers': 'in-use scene: a hand holding one flyer at reading distance, other variants fanned on a Japanese cafe counter',
 'posters': 'in-use scene: a hand smoothing one poster onto a gallery wall, other variants leaning against a display easel',
 'packaging': 'in-use scene: a hand lifting the lid of one box to reveal the product inside, other variants arranged in a neat stack',
 'red-packets': 'in-use scene: a hand offering one decorative envelope in the traditional respectful gesture, other variants arranged with pine and plum ornaments',
 'calendars': 'in-use scene: a hand flipping one calendar page, other variants displayed on a Japanese office desk and wall',
 'menus': 'in-use scene: a hand holding one menu open at a Japanese restaurant table, other variants at the entrance stand',
 'banners': 'in-use scene: a hand adjusting one banner stand at a Japanese exhibition entrance, other variants in the booth background',
 'books': 'in-use scene: a hand flipping through one booklet open to a spread, other variants stacked on a Japanese studio desk',
 'envelopes': 'in-use scene: a hand sealing one envelope with a card inside, other variants arranged with matching Japanese stationery',
 'educational': 'in-use scene: a hand writing in one workbook with a pencil, other variants stacked on a juku classroom shelf',
 'japan-doujin': 'in-use scene: a hand holding one doujin item up for display, other variants arranged on the Comiket artist booth table',
 'wedding-invitations': 'in-use scene: a hand holding one invitation open to reveal the inner design, other variants arranged with envelope and RSVP card',
 'place-cards': 'in-use scene: a hand placing one card on a ceramic charger plate, other variants arranged along the Japanese banquet table',
}

# MULTI-ANGLE 中性影棚场景 (增强3: 与 HERO 场景去重)
MULTIANGLE_SCENE_EN = 'clean neutral photography studio backdrop - seamless light gray or white background, soft diffused studio lighting from above-left, no props or lifestyle elements'
MULTIANGLE_SCENE_ZHHK = '淨色中性攝影棚背景 — 無縫淺灰或白色背景，左上柔和漫射影棚燈光，無道具無生活元素'
MULTIANGLE_SCENE_JA = 'clean neutral photography studio backdrop - seamless light gray or white background, soft diffused studio lighting from above-left, no props or lifestyle elements, Japanese precision product photography style'

# ══════════════════════════════════════════════════════════════
# PART 4: V23.2 负面清单 (按 locale × view 分化)
# 裸模型原则 (豆包分析 8/23): prompt 只写产生像素的视觉指令,
# 操作参数 (watermark/文件大小/版本号) 不进 prompt
# ══════════════════════════════════════════════════════════════
_NEG_CORE_EN = ('blurry, low-quality, watermark, distorted shape, ugly artifacts, malformed structure, oversaturated colors, overexposed, underexposed, dim lighting, dark moody atmosphere, bad cropping, subject cut off, object duplication, JPEG artifacts, autoClaw AI, AI generator watermark, unnatural lighting, cheap plastic texture, floating product, tacky over-advertising aesthetic, violate physics, gibberish, misspelled words, placeholder text, fake random words, any text beyond the specified printed brand name and tagline, hex color codes rendered as visible text, font names rendered as visible text, technical parameters rendered as visible text, unassembled flat sheets presented as the finished product, celebrity faces, luxury brand logos, torn edges')
_NEG_CORE_ZHHK = ('模糊、低品質、水印、變形、醜陋瑕疵、結構畸形、過飽和色、過曝、欠曝、光線暗沉、裁切錯誤、主體截斷、物體重複、JPEG失真、autoClaw AI、AI生成水印、不自然光線、廉價塑膠質感、懸浮物體、俗氣過度廣告美學、違反物理、亂碼、錯字、占位文字、虛假隨機文字、除指定印刷品牌名及標語外的任何文字、色值代碼渲染成可見文字、字體名稱渲染成可見文字、技術參數渲染成可見文字、平板未組裝材料冒充成品、名人面孔、奢侈品牌標誌、撕裂邊緣')

NEGATIVE_EN = 'Negative: ' + _NEG_CORE_EN + ', promotional badges, starburst labels, price tags on image, sale stickers on image'
NEGATIVE_ZHHK = '負面：' + _NEG_CORE_ZHHK + '、促銷標籤、爆炸貼、圖上價格標籤、圖上促銷貼紙'
NEGATIVE_ZHHK_HERO = '負面：' + _NEG_CORE_ZHHK + '、除指定爆炸貼外的其他促銷標籤、圖上價格標籤、多個標籤'
NEGATIVE_JA = 'Negative: ' + _NEG_CORE_EN + ', promotional badges, starburst labels, price tags on image, sale stickers on image'
NEGATIVE_JA_HERO = 'Negative: ' + _NEG_CORE_EN + ', starburst labels, price tags, sale stickers, any promotional text beyond the specified slim info band'

# V23.3: 真实产品信息架构小字元素 (学自 legacy 4 月版: 成分表/条码/QR 等小字块, 不需可读但必须有)
PRINT_EXTRAS_EN = {
 'packaging': 'plus realistic small-print elements (barcode, net weight line, eco mark) rendered as neat small-print blocks',
 'flyers': 'plus a neat QR code block and a date line as small-print elements',
 'menus': 'plus a neat QR code block as small-print element',
 'books': 'plus an ISBN barcode block on the back cover as small-print element',
 'posters': 'plus a neat QR code block and a date line as small-print elements',
 'banners': 'plus a neat QR code block as small-print element',
 'stickers': '', 'paper-bags': '', 'red-packets': '', 'calendars': '',
 'envelopes': '', 'educational': '', 'japan-doujin': '', 'greeting-cards': '',
 'wedding-invitations': '', 'place-cards': '',
}
PRINT_EXTRAS_ZHHK = {
 'packaging': '另配真實小字元素（條碼、淨含量行、環保標誌）以整齊小字塊呈現',
 'flyers': '另配整齊 QR 碼方塊及日期行小字元素',
 'menus': '另配整齊 QR 碼方塊小字元素',
 'books': '封底另配 ISBN 條碼小字塊',
 'posters': '另配整齊 QR 碼方塊及日期行小字元素',
 'banners': '另配整齊 QR 碼方塊小字元素',
 'stickers': '', 'paper-bags': '', 'red-packets': '', 'calendars': '',
 'envelopes': '', 'educational': '', 'japan-doujin': '', 'greeting-cards': '',
 'wedding-invitations': '', 'place-cards': '',
}

# V23.3: 逻辑性条款 (user 8/23 拍板加入"符合逻辑性")
LOGIC_EN = 'Logical consistency: every element matches the product\'s real-world use, proportions correct, perspective consistent, physically plausible, printed content matches the product category.'
LOGIC_ZHHK = '邏輯一致：所有元素符合產品真實用途，比例正確，透視一致，物理合理，印刷內容與產品類目匹配。'

# V23.3: 市场审美锚点 (学自 legacy 辅助词: 电影写真质感 + 目标市场审美)
AESTHETIC_EN = 'Cinematic photo-real quality, premium US DTC brand aesthetic that American buyers trust.'
AESTHETIC_ZHHK = '電影寫真質感，符合香港市場用戶審美的高級設計感。'
AESTHETIC_JA = 'Cinematic photo-real quality, refined Japanese minimalist aesthetic that Japanese buyers trust.'

# V23.2: 产品印受控虚构客户文字 (学自 V20.4 真实可读文字, 撤销 V23.1 增强1)
def client_print_en(brand, tagline, view, extras=''):
    ex = f', {extras}' if extras else ''
    if view == 'DETAIL':
        return (f'Printed design for fictional client "{brand}": macro focus shows crisp edge definition of the printed brand lettering '
                f'"{brand}" partially visible at one edge, sharp ink texture; no other text legible.')
    if view == 'VARIETY':
        return (f'All variants belong to the same fictional client "{brand}": each shows distinct artwork but consistent brand identity, '
                f'brand name "{brand}" and tagline "{tagline}" cleanly readable on every piece{ex}; no other text.')
    return (f'Printed for fictional client "{brand}": clearly readable brand name "{brand}" and tagline "{tagline}" '
            f'in clean professional typography on the product surface, with decorative artwork matching the brand theme{ex}; no other text anywhere.')

def client_print_zhhk(brand, tagline, view, extras=''):
    ex = f'，{extras}' if extras else ''
    if view == 'DETAIL':
        return (f'虛構客戶「{brand}」印刷設計：微距對焦印刷品牌字「{brand}」局部於邊緣可見，'
                f'油墨質感銳利、邊緣清晰；無其他可讀文字。')
    if view == 'VARIETY':
        return (f'所有款式屬同一虛構客戶「{brand}」：每款設計不同但品牌識別一致，'
                f'品牌名「{brand}」及標語「{tagline}」於每件上清晰可讀{ex}；無其他文字。')
    return (f'為虛構客戶「{brand}」印刷：產品表面以專業字體清晰印上品牌名「{brand}」及標語「{tagline}」（繁體中文，筆畫完整準確），'
            f'配品牌主題裝飾圖案{ex}；除此之外無任何其他文字。')

def client_print_ja(brand, tagline, view, extras=''):
    ex = f', {extras}' if extras else ''
    if view == 'DETAIL':
        return (f'Printed design for fictional Japanese client "{brand}": macro focus shows crisp edge definition of printed Japanese lettering '
                f'partially visible at one edge, sharp ink texture; no other text legible.')
    if view == 'VARIETY':
        return (f'All variants belong to the same fictional Japanese client "{brand}": each shows distinct artwork but consistent brand identity, '
                f'Japanese brand name "{brand}" and tagline "{tagline}" cleanly readable on every piece (accurate Japanese characters){ex}; no other text.')
    return (f'Printed for fictional Japanese client "{brand}": clearly readable Japanese brand name "{brand}" and tagline "{tagline}" '
            f'in clean professional typography on the product surface (accurate Japanese characters, no mojibake), with decorative artwork matching the brand theme{ex}; no other text anywhere.')

# zh-hk HERO 爆炸贴段 (user 8/23 拍板坚持; 非价格卖点, 短字防乱码; V23.4 大紅色中國紅, 色值不進 prompt)
def badge_zhhk(cat):
    main, sub = BADGE_ZHHK.get(cat, BADGE_ZHHK['stickers'])
    return (f'畫面右上角單一爆炸促銷貼：大紅色（中國紅）底、白色粗體字、白色描邊，'
            f'主標「{main}」、副標「{sub}」，字體端正清晰筆畫完整；'
            f'標籤所有文字必須為繁體中文（「費」不可寫作「费」、「設計」不可寫作「设计」、「樣」不可寫作「样」、「模」不可寫作「板」）；'
            f'除此之外整個畫面無任何其他標籤、價格、色值代碼或促銷文字。')

# JA HERO 細信息带 (无爆炸贴, 日本市场干净风格)
def infostrip_ja(cat):
    main, sub = INFOSTRIP_JA.get(cat, INFOSTRIP_JA['stickers'])
    return (f'A slim clean horizontal info band at the top-left corner, minimal white text on dark navy background, '
            f'displaying only the Japanese text "{main}" and "{sub}" in accurate characters; '
            f'no starburst, and no other promotional text anywhere else in the image.')

# ══════════════════════════════════════════════════════════════
# PART 5: 销售话术剥离正则 (复用豆包 + 补充)
# ══════════════════════════════════════════════════════════════
SALES_PATTERNS = [
    r'\s*Free sample,?\s*',
    r'\s*Free design mockup,?\s*',
    r'\s*DHL Express \d+-\d+ day global delivery(?: from Asia factory)?,?\s*',
    r'\s*DHL \d+-\d+ day global(?:\s*delivery)?,?\s*',
    r'\s*DHL Express[^.]*\.\s*',
    r'\s*Free shipping over \$[\d.]+(?:\s*\+\s*DHL[^.]*)?,?\s*',
    r'\s*\d+\s*sheets?\s*MOQ,?\s*',
    r'\s*\d+\s*pcs?\s*MOQ,?\s*',
    r'\s*\d+\s*MOQ\s*[·,.]?\s*',
    r'\s*\d+(?:-\d+)?\s*(?:sets?|copies|copy|books?)\s*MOQ\s*[·,.]?\s*',
    r'\s*\(vs Alibaba[^)]*\)\s*[·,.]?\s*',
    r'\s*MOQ\s*\d+[^.]*,?\s*',
    r'\s*Free design proof\s*[·,.]?\s*',
    r'\s*Fast\s*\d+-day turnaround\s*[·,.]?\s*',
    r'\s*\d+-\d+\s*day turnaround\s*[·,.]?\s*',
    r'\s*and reliable turnaround for time-sensitive\s+[a-z-]+[,.]?\s*',
    r'\s*\d+-sheet minimum\s*[·,.]?\s*',
    r'\s*\d+% off[^.]*\.?\s*',
    r'\s*to USA\s*\+\s*',
    r'\s*\d+-second AI quote\s*[·,.]?\s*',
    r'\s*\*\*Best for\*\*:.*',
    r'\s*\*\*適配行業\*\*.*',
    r'\s*\*\*適合業種\*\*.*',
    r'\s*Best for:.*',
    # 中文销售话术
    r'免費打樣[，,]?\s*',
    r'免費設計[，,]?\s*',
    r'DHL\s*全球\s*\d+-\d+\s*天配送[，,。]?\s*',
    r'DHL\s*Express[^。]*。[\s]*',
    r'DHL[^,，。]*[，,。]?\s*',
    r'滿\$[\d,]+包郵[，,]?\s*',
    r'\d+\s*[張本個件款套]+起[印訂製做][，,]?\s*',
    r'(?:最低)?[A-Za-z]?\d+\s*尺寸起印[，,]?\s*',
    r'無需大量庫存壓力[，,。]?\s*',
    r'免刀模費[，,。]?\s*',
    r'免排版費[，,。]?\s*',
    r'成本直降\s*\d+(?:-\d+)?%[，,。]?\s*',
    r'適用[行業]*[:：][^。]*。?\s*',
    r'適配行業[:：][^。\n]*。?\s*',
    r'最快當天交貨[，,。]?\s*',
    r'即日印刷[，,、]?\s*',
    r'即日快遞出貨[，,。]?\s*',
    r'急件不擔心[，,。]?\s*',
    r'全港免費送貨[，,。]?\s*',
    r'\d+\s*小時香港本地速遞[，,。]?\s*',
    r'\d+-\d+\s*天交期[，,。]?\s*',
    r'\d+-\d+\s*工作天[^。]*。[\s]*',
    r'香港本地速遞[，,。]?\s*',
    r'標準交期[^。]*。[\s]*',
    r'48\s*小時[^。]*。[\s]*',
    # 日文销售话术
    r'無料サンプル[、,]?\s*',
    r'無料デザイン[、,]?\s*',
    r'DHL[^。]*。[\s]*',
    r'\d+枚から(?:[印刷注文])?[、,]?\s*',
    r'\d+個?\s*¥[\d.]+\s*から[、,]?\s*',
    r'固定型代不要[、,]?\s*',
    r'\d+(?:-\d+)?%\s*コスト削減[、,]?\s*',
    r'\d+個最低ロット[、,]?\s*',
    r'\d+-\d+\s*日納期[、,。]?\s*',
    r'\$\d+相当以上[、,]?\s*',
    r'送料無料[、,。]?\s*',
    r'校正無料[、,。]?\s*',
    r'适配行业[:：][^。]*。?\s*',
    r'\*\*?适配行业\*\*?[:：]?[^。\n]*。?\s*',
    r'\d+-\d+天交[貨货][，,。]?\s*',
    r'全港送貨[，,。]?\s*',
    r'即日交貨[，,。]?\s*',
    r'全球配送[，,。]?\s*',
    r'型代無料[・、,。]?\s*',
    r'全国送料込み[・、,。]?\s*',
    r'\d+冊\s*MOQ[（(][^)）]*[)）]?\s*',
    r'\d+冊\s*MOQ[、,。]?\s*',
    r'¥[\d,]+(?:[-〜][\d,]+)?/?[個枚部]?\s*[。、,]?\s*',
]
def strip_sales(text):
    if not text: return ''
    for pat in SALES_PATTERNS:
        text = re.sub(pat, ' ', text, flags=re.IGNORECASE|re.DOTALL)
    text = re.sub(r'\.{2,}', '.', text)
    text = re.sub(r'。{2,}', '。', text)
    text = re.sub(r'[、，,]\s*。', '。', text)
    text = re.sub(r'\s*[・·]\s*。', '。', text)
    text = re.sub(r'(\s*[・·]\s*){2,}', ' · ', text)
    text = re.sub(r'\s*·\s*\.', '.', text)
    text = re.sub(r'\.\s*·\s*', '. ', text)
    text = re.sub(r',\s*,', ',', text)
    text = re.sub(r'\s+\+\s*\.', '.', text)
    text = re.sub(r'\s+\+\s*(?=[A-Z])', ' ', text)
    text = re.sub(r'[ ]{2,}', ' ', text)
    text = re.sub(r'\s+\.', '.', text)
    text = re.sub(r'\s+,', ',', text)
    text = re.sub(r',\s*\.', '.', text)
    return text.strip().rstrip('.,; 、·')

def clean_alt(desc, max_len=155):
    """从 description 生成完整句 alt，不断词"""
    if not desc: return ''
    d = strip_sales(desc)
    if len(d) <= max_len: return d
    # 在最后一个完整句边界截断
    cut = d[:max_len]
    last_period = max(cut.rfind('. '), cut.rfind('。'))
    if last_period > max_len * 0.5:
        return cut[:last_period+1]
    # 没有句边界就在词边界截断
    last_space = cut.rfind(' ')
    if last_space > max_len * 0.6:
        return cut[:last_space] + '.'
    return cut + '.'

# ══════════════════════════════════════════════════════════════
# PART 6: 解析 V23 + 加载 products
# ══════════════════════════════════════════════════════════════
V23_FILE = Path('.hermes/_v23_prompts.txt')
PRODUCTS_FILE = Path('.hermes/_products_export.json')

v23_text = V23_FILE.read_text(encoding='utf-8')
products = json.loads(PRODUCTS_FILE.read_text(encoding='utf-8'))
prod_by_slug = {p['slug']: p for p in products}

# BC greeting-cards 命名修复 (K3 拍板 A): 旧 stickers 文件名 → 新 greeting-cards 文件名
BC_RENAME = {
 'premium-greeting-cards': 'zprintpro-greeting-cards-premium-greeting-cards',
 'thick-greeting-cards-400g': 'zprintpro-greeting-cards-thick-greeting-cards-400g',
 'foil-greeting-cards': 'zprintpro-greeting-cards-foil-greeting-cards',
 'spot-uv-greeting-cards': 'zprintpro-greeting-cards-spot-uv-greeting-cards',
 'matte-greeting-cards': 'zprintpro-greeting-cards-matte-greeting-cards',
 'rounded-corner-greeting-cards': 'zprintpro-greeting-cards-rounded-corner-greeting-cards',
}

def get_filename_base(slug, locale='en'):
    """从 products.ts imagesByLocale 导出真实文件名 base (不含扩展名和视图序号)"""
    if slug in BC_RENAME:
        return BC_RENAME[slug]
    p = prod_by_slug.get(slug)
    if not p: return f'zprintpro-{slug}'
    il = p.get('imagesByLocale', {})
    imgs = il.get(locale) or il.get('en') or []
    if imgs:
        # 取第一个文件名，去掉扩展名和尾部 -N
        base = imgs[0].rsplit('/', 1)[-1].replace('.webp', '')
        base = re.sub(r'-\d+$', '', base)
        # 去掉 locale 后缀
        for loc in ['-zh-hk', '-en', '-ja']:
            if base.endswith(loc):
                base = base[:-len(loc)]
                break
        return base
    # fallback: images 字段
    imgs2 = p.get('images', [])
    if imgs2:
        base = imgs2[0].rsplit('/', 1)[-1].rsplit('.', 1)[0]
        return f'zprintpro-{p["category_slug"]}-{base}'
    return f'zprintpro-{p["category_slug"]}-{slug}'

# 解析 V23 块
SKU_BLOCKS = []
block_pattern = re.compile(
    r'### SKU-(\d+) \| ([A-Z]+-\d+) \| ([a-z0-9-]+) \| [^\n]*\n'
    r'SEO\+GEO ALT: ([^\n]*)\n\n'
    r'\[HERO\] \(\d+ chars\)\n(.*?)\n\n'
    r'\[DETAIL\] \(\d+ chars\)\n(.*?)\n\n'
    r'\[VARIETY-[AC]\] \(\d+ chars\)\n(.*?)\n\n'
    r'\[MULTI-ANGLE\] \(\d+ chars\)\n(.*?)\n\n'
    r'\[META — NOT SENT TO IMAGE API\]\n(.*?)(?=\n-{10,})',
    re.DOTALL
)
for m in block_pattern.finditer(v23_text):
    SKU_BLOCKS.append({
        'num': m.group(1), 'code': m.group(2), 'slug': m.group(3),
        'alt': m.group(4).strip(),
        'hero': m.group(5).strip(), 'detail': m.group(6).strip(),
        'variety': m.group(7).strip(), 'multi': m.group(8).strip(),
        'meta': m.group(9).strip(),
    })

# 补 V23 漏的 2 SKU
V23_SLUGS = {b['slug'] for b in SKU_BLOCKS}
MISSING = [p for p in products if p['slug'] not in V23_SLUGS]

print(f'Parsed {len(SKU_BLOCKS)} SKU blocks from V23, {len(MISSING)} missing SKUs to add')

# ══════════════════════════════════════════════════════════════
# PART 7: V23.1 生成器 — 逐 SKU 修 4 硬伤 + 3 增强
# ══════════════════════════════════════════════════════════════
def extract_product_desc(prompt_text):
    """从 V23 prompt 提取 PRODUCT 段文本"""
    m = re.search(r'PRODUCT:\s*(.*?)(?=\s+SCENE:)', prompt_text, re.DOTALL)
    return m.group(1).strip() if m else ''

def build_prompt_en(sku_data, prod, view, cat_idx=0):
    """V23.2 EN — 视觉要素前置, 无操作噪音 (裸模型优化, 豆包分析 8/23)"""
    cat = prod['category_slug']
    desc_en = strip_sales(prod.get('descriptionEn', ''))
    brand = CLIENT_BRAND_EN.get(cat, CLIENT_BRAND_EN['stickers'])[cat_idx % 4]
    tagline = CLIENT_TAGLINE_EN.get(cat, CLIENT_TAGLINE_EN['stickers'])
    lighting = LIGHTING_EN.get(cat, LIGHTING_EN['stickers'])

    if view in ('HERO', 'DETAIL'):
        scene = SCENE_EN.get(cat, SCENE_EN['stickers'])
    elif view == 'VARIETY':
        scene = f"{SCENE_EN.get(cat, SCENE_EN['stickers'])}. {VARIETY_SCENE_EN.get(cat, '')}"
    else:  # MULTI-ANGLE
        scene = MULTIANGLE_SCENE_EN

    comp = {
        'HERO': 'Composition: product centered at 80-85% of frame with clean margin, instantly recognizable, strong first impression, slight angled perspective for depth',
        'DETAIL': 'Composition: extreme close-up filling 85-95% of frame — macro focus on material, texture, edge, foil/lamination or printed detail; shallow depth of field, craftsmanship emphasized',
        'VARIETY': 'Composition: 3-4 different designs/styles grouped in a cohesive in-use scene; a human hand interacting with one variant (holding, placing, or opening) for scale and trust; each item fully visible, consistent quality line',
        'MULTI-ANGLE': 'Composition: 3 views of the same product (front, angled, detail-in-context) in one clean frame — shows real dimensions and usability',
    }[view]

    client = client_print_en(brand, tagline, view, PRINT_EXTRAS_EN.get(cat, ''))
    light_clause = '' if view == 'MULTI-ANGLE' else f' Lighting: {lighting}, bright vivid and not dim.'

    prompt = (
        f'Square 1:1 photorealistic e-commerce product photograph, 8K UHD micro-detail. '
        f'{comp}. '
        f'Product: {desc_en}. '
        f'{client} '
        f'Scene: {scene}.{light_clause} '
        f'Color palette: category-appropriate premium palette; natural tones, no harsh high-saturation colors. '
        f'Photorealistic commercial photography, sharp focus, subtle depth of field, '
        f'true-to-life paper/ink/material texture, premium honest studio quality. '
        f'{AESTHETIC_EN} {LOGIC_EN} '
        f'Warm, trustworthy, clean lifestyle visual — no gimmicks, no clutter, no over-stylization. '
        f'{NEGATIVE_EN}'
    )
    return prompt

def build_prompt_zhhk(sku_data, prod, view, cat_idx=0):
    """V23.2 zh-hk 繁体中文 — 视觉前置 + 虚构客户印刷文字 + HERO 爆炸贴 (user 8/23 拍板)"""
    cat = prod['category_slug']
    desc_zh = strip_sales(prod.get('description', ''))
    if not desc_zh:
        desc_zh = strip_sales(prod.get('descriptionEn', ''))
    brand = CLIENT_BRAND_ZHHK.get(cat, CLIENT_BRAND_ZHHK['stickers'])[cat_idx % 4]
    tagline = CLIENT_TAGLINE_ZHHK.get(cat, CLIENT_TAGLINE_ZHHK['stickers'])
    lighting = LIGHTING_ZHHK.get(cat, LIGHTING_ZHHK['stickers'])

    if view in ('HERO', 'DETAIL'):
        scene = SCENE_ZHHK.get(cat, SCENE_ZHHK['stickers'])
    elif view == 'VARIETY':
        scene = f"{SCENE_ZHHK.get(cat, SCENE_ZHHK['stickers'])}。{VARIETY_SCENE_ZHHK.get(cat, '')}"
    else:
        scene = MULTIANGLE_SCENE_ZHHK

    comp = {
        'HERO': '構圖：產品居中佔畫面 80-85%，四周留白適中，即時可辨識，微側角度營造深度感',
        'DETAIL': '構圖：極近微距佔畫面 85-95%，對焦材質紋理、邊緣、燙金/覆膜/印刷細節；淺景深，工藝質感突出',
        'VARIETY': '構圖：3-4 款不同設計/風格組合於使用情境中；一隻人手與其中一款互動（握持/擺放/拆開），展示比例及真實感；每件完整可見，品質一致',
        'MULTI-ANGLE': '構圖：同一產品 3 視角（正面、側面、情境細節）於一幀淨色影棚背景 — 展示真實尺寸及可用性',
    }[view]

    client = client_print_zhhk(brand, tagline, view, PRINT_EXTRAS_ZHHK.get(cat, ''))
    light_clause = '' if view == 'MULTI-ANGLE' else f'燈光：{lighting}，明亮鮮明不暗沉。'
    badge = badge_zhhk(cat) if view == 'HERO' else ''
    negative = NEGATIVE_ZHHK_HERO if view == 'HERO' else NEGATIVE_ZHHK

    prompt = (
        f'正方形 1:1 寫實電商產品攝影，8K 超高清微細節。'
        f'{comp}。'
        f'產品：{desc_zh}。'
        f'{client} '
        f'場景：{scene}。{light_clause}'
        f'{badge}'
        f'色彩：類目適配高級色系；自然色調，無刺眼高飽和色。'
        f'攝影工藝：寫實商業攝影，銳利對焦，淺景深，'
        f'真實紙張/油墨/材質質感，高級誠實影棚品質。'
        f'{AESTHETIC_ZHHK}{LOGIC_ZHHK}'
        f'溫暖、可信、乾淨港式生活視覺 — 無噱頭、無雜亂、無過度風格化。'
        f'{negative}'
    )
    return prompt

def build_prompt_ja(sku_data, prod, view, cat_idx=0):
    """V23.2 JA — 英文 prompt + 日本场景 + 产品上印日文客户文字 + HERO 細信息带 (user 8/23 拍板)"""
    cat = prod['category_slug']
    desc_en = strip_sales(prod.get('descriptionEn', ''))
    brand = CLIENT_BRAND_JA.get(cat, CLIENT_BRAND_JA['stickers'])[cat_idx % 4]
    tagline = CLIENT_TAGLINE_JA.get(cat, CLIENT_TAGLINE_JA['stickers'])
    lighting = LIGHTING_JA.get(cat, LIGHTING_JA['stickers'])

    if view in ('HERO', 'DETAIL'):
        scene = SCENE_JA.get(cat, SCENE_JA['stickers'])
    elif view == 'VARIETY':
        scene = f"{SCENE_JA.get(cat, SCENE_JA['stickers'])}. {VARIETY_SCENE_JA.get(cat, '')}"
    else:
        scene = MULTIANGLE_SCENE_JA

    comp = {
        'HERO': 'Composition: product centered at 80-85% of frame with clean margin, instantly recognizable, strong first impression, slight angled perspective for depth',
        'DETAIL': 'Composition: extreme close-up filling 85-95% of frame — macro focus on material, texture, edge, foil/lamination or printed detail; shallow depth of field, craftsmanship emphasized',
        'VARIETY': 'Composition: 3-4 different designs/styles grouped in a cohesive in-use scene; a human hand interacting with one variant (holding, placing, or opening) for scale and trust; each item fully visible, consistent quality line',
        'MULTI-ANGLE': 'Composition: 3 views of the same product (front, angled, detail-in-context) in one clean frame — shows real dimensions and usability',
    }[view]

    client = client_print_ja(brand, tagline, view, PRINT_EXTRAS_EN.get(cat, ''))
    light_clause = '' if view == 'MULTI-ANGLE' else f' Lighting: {lighting}, bright and clean.'
    strip = infostrip_ja(cat) + ' ' if view == 'HERO' else ''
    negative = NEGATIVE_JA_HERO if view == 'HERO' else NEGATIVE_JA

    prompt = (
        f'Square 1:1 photorealistic e-commerce product photograph for the Japanese market, 8K UHD micro-detail. '
        f'{comp}. '
        f'Product: {desc_en}. '
        f'{client} '
        f'Scene: {scene}.{light_clause} '
        f'{strip}'
        f'Color palette: category-appropriate premium palette with Japanese minimalist sensibility; natural muted tones, no harsh high-saturation colors. '
        f'Photorealistic commercial photography, sharp focus, subtle depth of field, '
        f'true-to-life paper/ink/material texture, premium honest studio quality. '
        f'{AESTHETIC_JA} {LOGIC_EN} '
        f'Clean, precise, trustworthy Japanese-style product visual — no gimmicks, no clutter, no over-stylization. '
        f'{negative}'
    )
    return prompt

# ══════════════════════════════════════════════════════════════
# PART 8: 生成 3 locale TXT
# ══════════════════════════════════════════════════════════════
BUILDERS = {'en': build_prompt_en, 'zh-hk': build_prompt_zhhk, 'ja': build_prompt_ja}
LOCALE_LABELS = {'en': 'EN (US market)', 'zh-hk': 'ZH-HK 繁体中文 (香港市場)', 'ja': 'JA (日本市場, English prompts with Japan-localized scenes)'}
VIEWS = ['HERO', 'DETAIL', 'VARIETY', 'MULTI-ANGLE']

for locale, builder in BUILDERS.items():
    lines = []
    lines.append(f'V23.4 ALL-SKU {locale.upper()} PROMPTS | Seedream 5.0 lite (火山方舟 API)')
    lines.append('=' * 78)
    lines.append(f'Generated 2026-08-23 — V23.3 → V23.4 upgrade. Locale: {LOCALE_LABELS[locale]}')
    lines.append('99 SKUs × 4 views = 396 prompts.')
    lines.append('')
    lines.append('API CALL PARAMS (操作参数, 不进 prompt):')
    lines.append('  size: 2048x2048 (1:1) → 后处理 resize 1200x1200 ≤120KB WebP (post_v23_resize.py)')
    lines.append('  watermark: false (API 参数, 非 prompt)')
    lines.append('')
    lines.append('V23.4 CHANGES vs V23.3 (user 8/23 06:28 拍板, 三张试生图复盘):')
    lines.append('  1. BADGE 颜色: 深紅 #DC2626 → 大紅色（中國紅）, 色值代码全部移出 prompt (豆包试生图把 #DC2626 渲染成标签文字)')
    lines.append('  2. NEGATIVE 加: 色值代碼/字體名稱/技術參數渲染成可見文字 (学自 legacy "图像内部不出现任何色值代码、字体名称、技术参数文本")')
    lines.append('  3. NEGATIVE 加: 平板未組裝材料冒充成品 (方舟试生图把瓦楞盒画成平板堆叠)')
    lines.append('  4. 爆炸贴繁体示例加固: 加「模」不可寫作「板」 (豆包首图把"免刀模費"渲成"免刀板费")')
    lines.append('  5. KEPT: V23.3 场景植入公式 (使用中+背景虛化+邻近物件) / 逻辑一致条款 / 小字元素 / 审美锚点 / 虚构客户矩阵 / 灯光控制 / 负面分化')
    lines.append('')
    lines.append('Manual-download mapping: download each result, rename to <META seo_filename>.')
    lines.append('=' * 78)
    lines.append('')

    sku_idx = 0
    cat_counter = {}
    for blk in SKU_BLOCKS:
        slug = blk['slug']
        prod = prod_by_slug.get(slug)
        if not prod:
            print(f'  WARNING: {slug} not in products.ts, skipping')
            continue
        sku_idx += 1
        cat = prod['category_slug']
        cat_idx = cat_counter.get(cat, 0)
        cat_counter[cat] = cat_idx + 1
        fname_base = get_filename_base(slug, 'en' if locale != 'zh-hk' else 'zh-hk')
        fname = f'{fname_base}-{locale}.webp'

        alt_en = clean_alt(prod.get('descriptionEn', ''))
        alt_zh = clean_alt(prod.get('description', ''))
        alt_ja = clean_alt(prod.get('descriptionJa', ''))

        lines.append('=' * 78)
        lines.append(f'### SKU-{sku_idx:02d} | {blk["code"]} | {slug} | {fname}')
        lines.append(f'SEO+GEO ALT: {alt_en}')
        lines.append('')

        for view in VIEWS:
            prompt = builder(blk, prod, view, cat_idx)
            lines.append(f'[{view}] ({len(prompt)} chars)')
            lines.append(prompt)
            lines.append('')

        lines.append('[META — NOT SENT TO IMAGE API]')
        lines.append(f'  seo_filename: {fname}')
        lines.append(f'  alt_en: {alt_en}')
        lines.append(f'  alt_zh_hk: {alt_zh}')
        lines.append(f'  alt_ja: {alt_ja}')
        # geo_keywords: 从 V23 原 META 提取 (EN 版有)
        gk_match = re.search(r'geo_keywords:\s*(.+)', blk['meta'])
        if gk_match:
            lines.append(f'  geo_keywords: {gk_match.group(1).strip()}')
        lines.append(f'  price_range: {prod.get("price_range", "")}')
        lines.append('')
        lines.append('-' * 78)
        lines.append('')

    # 补 V23 漏的 2 SKU
    for prod in MISSING:
        slug = prod['slug']
        cat = prod['category_slug']
        sku_idx += 1
        cat_idx = cat_counter.get(cat, 0)
        cat_counter[cat] = cat_idx + 1
        code = prod['id']
        fname_base = get_filename_base(slug)
        fname = f'{fname_base}-{locale}.webp'
        alt_en = clean_alt(prod.get('descriptionEn', ''))
        alt_zh = clean_alt(prod.get('description', ''))
        alt_ja = clean_alt(prod.get('descriptionJa', ''))

        lines.append('=' * 78)
        lines.append(f'### SKU-{sku_idx:02d} | {code} | {slug} | {fname} [NEW - not in V23]')
        lines.append(f'SEO+GEO ALT: {alt_en}')
        lines.append('')
        blk_stub = {'slug': slug, 'code': code, 'meta': ''}
        for view in VIEWS:
            prompt = builder(blk_stub, prod, view, cat_idx)
            lines.append(f'[{view}] ({len(prompt)} chars)')
            lines.append(prompt)
            lines.append('')
        lines.append('[META — NOT SENT TO IMAGE API]')
        lines.append(f'  seo_filename: {fname}')
        lines.append(f'  alt_en: {alt_en}')
        lines.append(f'  alt_zh_hk: {alt_zh}')
        lines.append(f'  alt_ja: {alt_ja}')
        lines.append(f'  price_range: {prod.get("price_range", "")}')
        lines.append('')
        lines.append('-' * 78)
        lines.append('')

    out_path = Path(f'seedream/v23.4-prompts-{locale}.txt')
    out_path.parent.mkdir(exist_ok=True)
    out_path.write_text('\n'.join(lines), encoding='utf-8')
    print(f'  {locale}: {sku_idx} SKUs, {out_path.stat().st_size / 1024:.0f} KB → {out_path}')

print('\nDone. 3 locale TXT files generated.')
