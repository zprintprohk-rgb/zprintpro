# -*- coding: utf-8 -*-
"""Step 2: Add 3 new category content blocks to category-seo-content.ts.

Strategy: minimal but adequate content (compact 3-locale blocks).
- greetingCardsContent: ~80 lines
- weddingInvitationsContent: ~80 lines
- placeCardsContent: ~80 lines
Total: ~240 lines added.

Each block has 3 locales (zh-hk, en, ja) with 9-section CategoryLocaleContent structure.
"""
import os

BASE = r"F:\zprintpro-nextjs\src"
CONTENT_FILE = os.path.join(BASE, "data", "category-seo-content.ts")

with open(CONTENT_FILE, 'r', encoding='utf-8') as f:
    src = f.read()

# 3 category content blocks to insert before the final `export const categorySeoContent: CategorySeoData = {`
GREETING_CARDS = '''const greetingCardsContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    name: '賀卡印刷',
    intro: '專業賀卡印刷服務,涵蓋節日、生日、感謝、邀請、商業及立體 3D 賀卡,100 張起印。FSC 認證紙材 + 燙金 / UV / 模切工藝 + 順豐本地滿 HK$500 免費配送。',
    coreAdvantages: {
      title: '為何選擇智印港的賀卡印刷?',
      items: [
        '全場景覆蓋:節日 / 生日 / 感謝 / 邀請 / 商業 / 立體 3D 賀卡六大類目,200+ SKU 即選即印。',
        '6 大核心材質:300g 銅版紙、350g 剛古紙、300g 棉紙、特種金 / 銀卡紙、種子紙 (可種植)、立體鐳射紙。',
        '4 大核心工藝:燙金 / 燙銀、UV 局部、模切異形、3D 立體彈起,適配跨境爆款需求。',
        '順豐本地滿 HK$500 免費 + DHL 全球 2-4 天配送 + 30 秒 AI 即時報價 + 4 小時免費打樣。',
      ],
    },
    techSpecs: [
      { feature: '材質', value: '300g 銅版 / 350g 剛古 / 300g 棉紙 / 特種金銀卡 / 種子紙' },
      { feature: '尺寸', value: 'A6 (105×148mm) / A5 (148×210mm) / A4 (210×297mm) / 自訂尺寸' },
      { feature: '工藝', value: '燙金 / 燙銀 / UV 局部 / 模切異形 / 3D 立體彈起' },
      { feature: '起印量', value: '100 張起印,500 張享批量折扣' },
    ],
    materials: ['300g 銅版紙', '350g 剛古紙', '300g 棉紙', '特種金卡紙', '特種銀卡紙', '種子紙 (可種植)', '立體鐳射紙'],
    specialOptions: ['燙金 (金 / 銀 / 玫瑰金)', 'UV 局部', '模切異形', '3D 立體彈起', '信封配套', '個性化照片定制'],
    serviceNodes: [
      { icon: 'Zap', title: '30 秒報價', desc: 'AI 即時算價,價格透明' },
      { icon: 'Award', title: 'FSC 認證', desc: '環保紙材 + 大豆油墨' },
      { icon: 'Truck', title: '順豐本地', desc: '滿 HK$500 免費' },
      { icon: 'Globe', title: 'DHL 全球', desc: '2-4 天跨境直送' },
    ],
    faqs: [
      { q: '賀卡印刷最少印幾多張?', a: '100 張起印。50 張小批量可議,適合設計確認或首批客戶。' },
      { q: '立體 3D 賀卡最快幾時出貨?', a: '數碼打樣 24 小時,批量 3-5 工作天,加急 24-48 小時可議。' },
      { q: '可以印定制圖案嗎?', a: '可以。支援 AI / PSD / PDF / CDR 檔,300dpi CMYK 色域,設計免費預檢。' },
      { q: '環保材質有咩選擇?', a: 'FSC 認證紙 + 大豆油墨 + 種子紙 (用完可種植薄荷或苜蓿),符合歐美環保標準。' },
    ],
    summary: '智印港賀卡印刷:100 張起印、3D 立體爆款、FSC 認證、順豐本地 + DHL 全球配送。',
  },
  en: {
    name: 'Greeting Card Printing',
    intro: 'Professional greeting card printing: holiday, birthday, thank you, invitation, corporate, and 3D pop-up cards. 100 sheet minimum. FSC certified paper + foil / UV / die-cut finishes + free shipping over $99 to USA.',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Greeting Card Printing?',
      items: [
        'Full-scenario coverage: holiday / birthday / thank you / invitation / corporate / 3D pop-up cards with 200+ SKUs.',
        '6 core materials: 300gsm art, 350gsm Conqueror, 300gsm cotton, specialty gold/silver, seed paper (plantable), 3D laser paper.',
        '4 core finishes: foil stamping, spot UV, die-cut shapes, 3D pop-up — built for cross-border e-commerce hero SKUs.',
        'Free shipping over $99 to USA + DHL Express 2-4 day global + 30-second AI quote + 4-hour free proof.',
      ],
    },
    techSpecs: [
      { feature: 'Material', value: '300gsm Art / 350gsm Conqueror / 300gsm Cotton / Specialty Gold/Silver Card' },
      { feature: 'Size', value: 'A6 (4.1"×5.8") / A5 (5.8"×8.3") / A4 (8.3"×11.7") / Custom sizes' },
      { feature: 'Finish', value: 'Foil Stamping / Spot UV / Die-Cut Shapes / 3D Pop-Up' },
      { feature: 'MOQ', value: '100 sheets minimum, 500+ gets bulk discount' },
    ],
    materials: ['300gsm Art Paper', '350gsm Conqueror', '300gsm Cotton Paper', 'Specialty Gold Card', 'Specialty Silver Card', 'Seed Paper (Plantable)', '3D Laser Paper'],
    specialOptions: ['Foil Stamping (Gold / Silver / Rose Gold)', 'Spot UV', 'Die-Cut Shapes', '3D Pop-Up', 'Envelope Bundling', 'Photo Personalization'],
    serviceNodes: [
      { icon: 'Zap', title: '30s AI Quote', desc: 'Transparent instant pricing' },
      { icon: 'Award', title: 'FSC Certified', desc: 'Eco paper + soy ink' },
      { icon: 'Truck', title: 'Free Ship >$99', desc: 'USA-wide delivery' },
      { icon: 'Globe', title: 'DHL Express', desc: '2-4 day global' },
    ],
    faqs: [
      { q: 'What is the minimum order for greeting card printing?', a: '100 sheets minimum. 50-sheet small batches available for design confirmation or first-time clients.' },
      { q: 'How fast can I get 3D pop-up cards?', a: 'Digital proof 24h, bulk 3-5 business days, rush 24-48h available on request.' },
      { q: 'Can I print custom designs?', a: 'Yes. AI / PSD / PDF / CDR files supported, 300dpi CMYK. Free prepress check.' },
      { q: 'What eco-friendly options are available?', a: 'FSC certified paper + soy ink + plantable seed paper (mint or alfalfa). EU/US compliance.' },
    ],
    summary: 'ZprintPro greeting card printing: 100 MOQ, 3D pop-up hero SKUs, FSC certified, USA + global shipping.',
  },
  ja: {
    name: 'グリーティングカード印刷',
    intro: 'プロフェッショナルなグリーティングカード印刷:祝日、誕生日、サンキュ、招待状、法人向け、立体 3D カード。100 枚から対応。FSC 認証紙 + 箔押し / UV / 抜型仕上げ + 30 秒 AI 見積。',
    coreAdvantages: {
      title: 'ZprintPro のグリーティングカード印刷を選ぶ理由?',
      items: [
        '全場面カバー:祝日 / 誕生日 / サンキュ / 招待状 / 法人向け / 立体 3D カード 200+ SKU。',
        '6 大素材:300g コート紙、350g コンカラー、300g コットン紙、特殊金 / 銀カード、種紙 (植付可能)、立体レーザー紙。',
        '4 大仕上げ:箔押し、スポット UV、抜型、立体 3D ポップアップ — 越境 EC ヒット商品向け。',
        'DHL 国際配送 2-4 日 + 30 秒 AI 見積 + 4 時間無料サンプル + FSC 認証。',
      ],
    },
    techSpecs: [
      { feature: '素材', value: '300g コート / 350g コンカラー / 300g コットン / 特殊金銀カード' },
      { feature: 'サイズ', value: 'A6 (105×148mm) / A5 (148×210mm) / A4 (210×297mm) / カスタムサイズ' },
      { feature: '仕上げ', value: '箔押し / スポット UV / 抜型 / 立体 3D ポップアップ' },
      { feature: '最小数量', value: '100 枚から、500 枚以上で数量割引' },
    ],
    materials: ['300g コート紙', '350g コンカラー', '300g コットン紙', '特殊金カード', '特殊銀カード', '種紙 (植付可能)', '立体レーザー紙'],
    specialOptions: ['箔押し (金 / 銀 / 玫瑰金)', 'スポット UV', '抜型', '立体 3D ポップアップ', '封筒セット', '写真パーソナライズ'],
    serviceNodes: [
      { icon: 'Zap', title: '30 秒見積', desc: 'AI 即時透明価格' },
      { icon: 'Award', title: 'FSC 認証', desc: 'エコ紙 + 大豆インク' },
      { icon: 'Truck', title: 'DHL 国際', desc: '2-4 日配送' },
      { icon: 'Globe', title: 'グローバル', desc: '190+ 国対応' },
    ],
    faqs: [
      { q: 'グリーティングカード印刷の最小注文数は?', a: '100 枚から。50 枚の小ロットもデザイン確認や初回クライアント様に可能。' },
      { q: '立体 3D カードの納期は?', a: 'デジタルサンプル 24 時間、量産 3-5 営業日、緊急 24-48 時間対応可。' },
      { q: 'オリジナルデザインに対応?', a: '対応可。AI / PSD / PDF / CDR ファイル対応、300dpi CMYK、無料でプリプレスチェック。' },
      { q: 'エコな素材は?', a: 'FSC 認証紙 + 大豆インク + 種紙 (植付後ミントやアルファルファ栽培可能)。EU / US 基準準拠。' },
    ],
    summary: 'ZprintPro グリーティングカード印刷:100 枚から、立体 3D ヒット商品、FSC 認証、世界配送。',
  },
};

'''

WEDDING_INVITATIONS = '''const weddingInvitationsContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    name: '喜帖印刷',
    intro: '專業喜帖印刷服務,涵蓋喜帖、Save the Date、答謝卡、婚慶節目單、婚慶菜單及整套婚慶配套,50 套起印。燙金 / UV / 活版 / 模切 工艺 + 順豐本地 + DHL 全球。',
    coreAdvantages: {
      title: '為何選擇智印港的喜帖印刷?',
      items: [
        '整套婚慶配套:喜帖 + Save the Date + 答謝卡 + 節目單 + 菜單 + 席位圖,一次印齊 6 大場景。',
        '6 大經典工藝:燙金 (金 / 銀 / 玫瑰金)、UV 局部、活版印刷、模切異形、雕凹壓印、貼金邊。',
        '5 大紙材選擇:300g 棉紙 (質感首選)、350g 剛古紙、300g 銅版紙、特種金 / 銀卡紙、再生紙。',
        '婚慶專屬優惠:100 套以上享 9 折,200 套以上享 85 折,500 套以上免費寄樣。',
      ],
    },
    techSpecs: [
      { feature: '材質', value: '300g 棉紙 / 350g 剛古紙 / 300g 銅版 / 特種金銀卡 / 再生紙' },
      { feature: '尺寸', value: '標準請帖 130×190mm / 對摺請帖 190×260mm / 自訂尺寸' },
      { feature: '工藝', value: '燙金 / UV / 活版 / 模切 / 雕凹 / 貼金邊' },
      { feature: '起印量', value: '50 套起印,100 套享 9 折,500 套免費寄樣' },
    ],
    materials: ['300g 棉紙', '350g 剛古紙', '300g 銅版紙', '特種金卡紙', '特種銀卡紙', '再生紙 (FSC)' , '透明 PVC 護套'],
    specialOptions: ['燙金 (金 / 銀 / 玫瑰金 / 香檳金)', 'UV 局部', '活版印刷', '模切異形', '雕凹壓印', '貼金邊', '信封配套', '客製姓名印刷'],
    serviceNodes: [
      { icon: 'Heart', title: '整套配套', desc: '6 大場景一次印齊' },
      { icon: 'Award', title: 'FSC 認證', desc: '環保紙 + 婚慶專屬' },
      { icon: 'Truck', title: '順豐本地', desc: '滿 HK$500 免費' },
      { icon: 'Globe', title: 'DHL 全球', desc: '2-4 天跨境直送' },
    ],
    faqs: [
      { q: '喜帖印刷最少印幾多套?', a: '50 套起印。100 套享 9 折,200 套享 85 折,500 套免費寄樣。' },
      { q: '喜帖 + 整套婚慶配套要幾錢?', a: '喜帖 $1.20/套起,整套 6 大件 $25/套起,可分開報價。' },
      { q: '燙金 / 活版邊種工藝最受歡迎?', a: '燙玫瑰金 (熱門) + UV 局部 (細節提升) + 雕凹 (質感首選) 三大組合最受歡迎。' },
      { q: '可以加印賓客姓名嗎?', a: '可以。100 套以上享客製姓名印刷,每套加收 $0.20 起。' },
    ],
    summary: '智印港喜帖印刷:50 套起印、整套 6 大件、燙金 / UV / 活版工藝、順豐本地 + DHL 全球。',
  },
  en: {
    name: 'Wedding Invitation Printing',
    intro: 'Professional wedding invitation printing: invitations, save the date, thank you cards, programs, menus, and full wedding suite. 50 sets MOQ. Foil / UV / letterpress / die-cut finishes + free shipping over $99 to USA.',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Wedding Invitation Printing?',
      items: [
        'Full wedding suite: invitations + save the date + thank you cards + programs + menus + seating chart — 6 scenarios in one order.',
        '6 signature finishes: foil stamping (gold / silver / rose gold), spot UV, letterpress, die-cut shapes, engraving embossing, gilded edges.',
        '5 paper choices: 300gsm cotton (premium feel), 350gsm Conqueror, 300gsm art, specialty gold/silver card, recycled paper.',
        'Wedding bulk discount: 100+ sets 10% off, 200+ 15% off, 500+ free sample shipping.',
      ],
    },
    techSpecs: [
      { feature: 'Material', value: '300gsm Cotton / 350gsm Conqueror / 300gsm Art / Specialty Gold/Silver / Recycled' },
      { feature: 'Size', value: 'Standard 5"×7" / Folded 7.5"×10" / Custom sizes' },
      { feature: 'Finish', value: 'Foil / UV / Letterpress / Die-Cut / Engraving / Gilded Edges' },
      { feature: 'MOQ', value: '50 sets minimum, 100+ 10% off, 500+ free sample' },
    ],
    materials: ['300gsm Cotton Paper', '350gsm Conqueror', '300gsm Art Paper', 'Specialty Gold Card', 'Specialty Silver Card', 'FSC Recycled Paper', 'Clear PVC Sleeve'],
    specialOptions: ['Foil Stamping (Gold / Silver / Rose Gold / Champagne)', 'Spot UV', 'Letterpress', 'Die-Cut Shapes', 'Engraving Embossing', 'Gilded Edges', 'Envelope Bundling', 'Custom Name Printing'],
    serviceNodes: [
      { icon: 'Heart', title: 'Full Suite', desc: '6 scenarios in one order' },
      { icon: 'Award', title: 'FSC Certified', desc: 'Eco paper for weddings' },
      { icon: 'Truck', title: 'Free Ship >$99', desc: 'USA-wide delivery' },
      { icon: 'Globe', title: 'DHL Express', desc: '2-4 day global' },
    ],
    faqs: [
      { q: 'What is the minimum order for wedding invitations?', a: '50 sets minimum. 100+ gets 10% off, 200+ 15% off, 500+ free sample shipping.' },
      { q: 'How much is a full wedding suite?', a: 'Invitations from $1.20/set, full 6-piece suite from $25/set. Itemized quote available.' },
      { q: 'Which finishes are most popular for weddings?', a: 'Rose gold foil + spot UV + engraving embossing — the 3-finish signature combo.' },
      { q: 'Can I add guest names to each invitation?', a: 'Yes. 100+ sets get custom name printing at $0.20/set add-on.' },
    ],
    summary: 'ZprintPro wedding invitation printing: 50 sets MOQ, full 6-piece suite, foil / UV / letterpress finishes, USA + global shipping.',
  },
  ja: {
    name: '結婚式招待状印刷',
    intro: 'プロフェッショナルな結婚式招待状印刷:招待状、Save the Date、サンキュカード、結婚式のしおり、ウエディング メニュー、フル セット。50 セットから対応。箔押し / UV / 活版 / 抜型仕上げ。',
    coreAdvantages: {
      title: 'ZprintPro の結婚式招待状印刷を選ぶ理由?',
      items: [
        'フル結婚セット:招待状 + Save the Date + サンキュカード + のしおり + メニュー + 座席表 — 6 場面を一括注文。',
        '6 大仕上げ:箔押し (金 / 銀 / 玫瑰金)、スポット UV、活版印刷、抜型、エングレービング エンボス、金縁。',
        '5 大紙素材:300g コットン (質感最高)、350g コンカラー、300g コート、特殊金 / 銀カード、再生紙。',
        '結婚割引:100 セット以上 10%OFF、200 セット以上 15%OFF、500 セット以上無料サンプル配送。',
      ],
    },
    techSpecs: [
      { feature: '素材', value: '300g コットン / 350g コンカラー / 300g コート / 特殊金銀 / 再生紙' },
      { feature: 'サイズ', value: '標準 130×190mm / 折 190×260mm / カスタムサイズ' },
      { feature: '仕上げ', value: '箔押し / UV / 活版 / 抜型 / エングレービング / 金縁' },
      { feature: '最小数量', value: '50 セットから、100+ 10%OFF、500+ 無料サンプル' },
    ],
    materials: ['300g コットン紙', '350g コンカラー', '300g コート紙', '特殊金カード', '特殊銀カード', 'FSC 再生紙', '透明 PVC スリーブ'],
    specialOptions: ['箔押し (金 / 銀 / 玫瑰金 / シャンパン)', 'スポット UV', '活版印刷', '抜型', 'エングレービング', '金縁', '封筒セット', 'ゲスト名印刷'],
    serviceNodes: [
      { icon: 'Heart', title: 'フルセット', desc: '6 場面一括注文' },
      { icon: 'Award', title: 'FSC 認証', desc: 'エコ紙で結婚向け' },
      { icon: 'Truck', title: 'DHL 国際', desc: '2-4 日配送' },
      { icon: 'Globe', title: 'グローバル', desc: '190+ 国対応' },
    ],
    faqs: [
      { q: '結婚式招待状の最小注文数は?', a: '50 セットから。100+ 10%OFF、200+ 15%OFF、500+ 無料サンプル配送。' },
      { q: 'フル結婚セットの価格は?', a: '招待状 $1.20/セットから、フル 6 点セット $25/セットから。項目別見積可。' },
      { q: '結婚で最も人気の仕上げは?', a: '玫瑰金箔押し + スポット UV + エングレービング の 3 点仕上げシグネチャー コンボ。' },
      { q: 'ゲスト名の個別印刷は可能?', a: '可能。100+ セットでゲスト名印刷対応、$0.20/セット追加。' },
    ],
    summary: 'ZprintPro 結婚式招待状印刷:50 セットから、フル 6 点セット、箔押し / UV / 活版仕上げ、世界配送。',
  },
};

'''

PLACE_CARDS = '''const placeCardsContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    name: '台卡 / 酒水牌 / 座位卡印刷',
    intro: '專業台卡 / 酒水牌 / 座位卡 / 名牌卡印刷服務,涵蓋婚宴、餐廳、咖啡廳、會議、展會 5 大場景,50 張起印。燙金 / 壓紋 / 模切 + 順豐本地 + DHL 全球。',
    coreAdvantages: {
      title: '為何選擇智印港的台卡 / 酒水牌印刷?',
      items: [
        '5 大場景覆蓋:婚宴台卡 / 餐廳台卡 / 咖啡廳台卡 / 會議名牌 / 展會名牌,一張起印多場景適用。',
        '6 種工藝:燙金 / 燙銀 / UV 局部 / 壓紋 / 模切異形 / 折卡,適配高端商務與婚宴質感。',
        '5 種材質:300g 銅版紙、350g 黑卡紙、特種金 / 銀卡紙、再生紙、PVC 透明卡。',
        '多種尺寸:A8 (52×74mm) / A7 (74×105mm) / A6 (105×148mm) / 自訂折卡,50 張起印小批量友好。',
      ],
    },
    techSpecs: [
      { feature: '材質', value: '300g 銅版 / 350g 黑卡 / 特種金銀卡 / 再生紙 / PVC 透明卡' },
      { feature: '尺寸', value: 'A8 (52×74mm) / A7 (74×105mm) / A6 (105×148mm) / 自訂折卡' },
      { feature: '工藝', value: '燙金 / UV / 壓紋 / 模切 / 折卡 / 圓角' },
      { feature: '起印量', value: '50 張起印,200 張享批量折扣' },
    ],
    materials: ['300g 銅版紙', '350g 黑卡紙', '特種金卡紙', '特種銀卡紙', '再生紙 (FSC)', 'PVC 透明卡', '白卡紙 (300g)'],
    specialOptions: ['燙金 (金 / 銀 / 玫瑰金)', 'UV 局部', '壓紋', '模切異形', '折卡 (V 折 / 對摺)', '圓角', '打孔掛繩', '磁鐵背貼'],
    serviceNodes: [
      { icon: 'MapPin', title: '5 大場景', desc: '婚宴/餐廳/咖啡/會議/展會' },
      { icon: 'Award', title: 'FSC 認證', desc: '環保紙 + 商用標準' },
      { icon: 'Truck', title: '順豐本地', desc: '滿 HK$500 免費' },
      { icon: 'Globe', title: 'DHL 全球', desc: '2-4 天跨境直送' },
    ],
    faqs: [
      { q: '台卡 / 酒水牌最少印幾多張?', a: '50 張起印。100 張享 9 折,300 張享 85 折。' },
      { q: '酒水牌 vs 台卡 vs 座位卡有咩分別?', a: '台卡 = 餐桌名稱,酒水牌 = 賓客標記飲品,座位卡 = 賓客標記座位。三者常成套印。' },
      { q: '可以用 PVC 透明卡印酒水牌嗎?', a: '可以。0.5mm 厚 PVC 透明卡,防水耐用,適合戶外婚宴及泳池派對。' },
      { q: '名牌卡可以加磁鐵背貼嗎?', a: '可以。磁鐵背貼 3M 強力膠,適合會議名牌 / 展會名牌,可重複使用。' },
    ],
    summary: '智印港台卡 / 酒水牌 / 座位卡印刷:50 張起印、5 大場景、燙金 / 壓紋工藝、順豐本地 + DHL 全球。',
  },
  en: {
    name: 'Place Card / Drink Token / Escort Card Printing',
    intro: 'Professional place card / drink token / escort card / name tag printing: weddings, restaurants, cafés, conferences, and events. 50 sheet minimum. Foil / embossing / die-cut + free shipping over $99 to USA.',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Place Card / Drink Token Printing?',
      items: [
        '5 scenario coverage: wedding table cards / restaurant table cards / café table cards / conference badges / event name tags.',
        '6 finishes: foil stamping, spot UV, embossing, die-cut shapes, folded cards, rounded corners — for premium weddings and corporate events.',
        '5 materials: 300gsm art, 350gsm black card, specialty gold/silver card, recycled paper, clear PVC.',
        'Multiple sizes: A8 (2"×3") / A7 (3"×4") / A6 (4"×6") / custom folded cards. 50 MOQ friendly for small batches.',
      ],
    },
    techSpecs: [
      { feature: 'Material', value: '300gsm Art / 350gsm Black Card / Specialty Gold/Silver / Recycled / Clear PVC' },
      { feature: 'Size', value: 'A8 (52×74mm) / A7 (74×105mm) / A6 (105×148mm) / Custom Folded' },
      { feature: 'Finish', value: 'Foil / UV / Embossing / Die-Cut / Folded / Rounded Corners' },
      { feature: 'MOQ', value: '50 sheets minimum, 200+ gets bulk discount' },
    ],
    materials: ['300gsm Art Paper', '350gsm Black Card', 'Specialty Gold Card', 'Specialty Silver Card', 'FSC Recycled Paper', 'Clear PVC Card', 'White Card (300gsm)'],
    specialOptions: ['Foil Stamping (Gold / Silver / Rose Gold)', 'Spot UV', 'Embossing', 'Die-Cut Shapes', 'Folded (V-Fold / Bi-Fold)', 'Rounded Corners', 'Hole Punch + Lanyard', 'Magnetic Back'],
    serviceNodes: [
      { icon: 'MapPin', title: '5 Scenarios', desc: 'Wedding/Restaurant/Café/Conf/Event' },
      { icon: 'Award', title: 'FSC Certified', desc: 'Eco paper for commercial' },
      { icon: 'Truck', title: 'Free Ship >$99', desc: 'USA-wide delivery' },
      { icon: 'Globe', title: 'DHL Express', desc: '2-4 day global' },
    ],
    faqs: [
      { q: 'What is the minimum order for place card / drink token printing?', a: '50 sheets minimum. 100 gets 10% off, 300 gets 15% off.' },
      { q: 'What is the difference between place card, drink token, and escort card?', a: 'Place card = table name, drink token = guest drink marker, escort card = guest seat marker. Often printed as a set.' },
      { q: 'Can I use clear PVC for drink tokens?', a: 'Yes. 0.5mm clear PVC, waterproof and durable — ideal for outdoor weddings and pool parties.' },
      { q: 'Can name tags have a magnetic back?', a: 'Yes. 3M strong adhesive magnetic back, suitable for conference badges and event name tags, reusable.' },
    ],
    summary: 'ZprintPro place card / drink token / escort card printing: 50 MOQ, 5 scenarios, foil / embossing finishes, USA + global shipping.',
  },
  ja: {
    name: '席札 / ドリンクトークン / エスコートカード印刷',
    intro: 'プロフェッショナルな席札 / ドリンクトークン / エスコートカード / 名札印刷:ウエディング、レストラン、カフェ、会議、イベント。50 枚から対応。箔押し / エンボス / 抜型 + 30 秒 AI 見積。',
    coreAdvantages: {
      title: 'ZprintPro の席札 / ドリンクトークン印刷を選ぶ理由?',
      items: [
        '5 場面カバー:ウエディング席札 / レストラン席札 / カフェ席札 / 会議バッジ / イベント名札。',
        '6 仕上げ:箔押し、スポット UV、エンボス、抜型、折カード、角丸 — 高級ウエディングと法人イベント向け。',
        '5 素材:300g コート、350g 黒カード、特殊金 / 銀カード、再生紙、透明 PVC。',
        'サイズ:A8 (52×74mm) / A7 (74×105mm) / A6 (105×148mm) / カスタム折カード。50 枚から対応。',
      ],
    },
    techSpecs: [
      { feature: '素材', value: '300g コート / 350g 黒カード / 特殊金銀 / 再生紙 / 透明 PVC' },
      { feature: 'サイズ', value: 'A8 (52×74mm) / A7 (74×105mm) / A6 (105×148mm) / カスタム折' },
      { feature: '仕上げ', value: '箔押し / UV / エンボス / 抜型 / 折カード / 角丸' },
      { feature: '最小数量', value: '50 枚から、200+ 数量割引' },
    ],
    materials: ['300g コート紙', '350g 黒カード', '特殊金カード', '特殊銀カード', 'FSC 再生紙', '透明 PVC カード', '白カード (300g)'],
    specialOptions: ['箔押し (金 / 銀 / 玫瑰金)', 'スポット UV', 'エンボス', '抜型', '折カード (V 折 / 両折)', '角丸', '穴あけ + ストラップ', 'マグネット裏貼り'],
    serviceNodes: [
      { icon: 'MapPin', title: '5 場面', desc: '結婚式/レストラン/カフェ/会議/イベント' },
      { icon: 'Award', title: 'FSC 認証', desc: 'エコ紙で商用対応' },
      { icon: 'Truck', title: 'DHL 国際', desc: '2-4 日配送' },
      { icon: 'Globe', title: 'グローバル', desc: '190+ 国対応' },
    ],
    faqs: [
      { q: '席札 / ドリンクトークンの最小注文数は?', a: '50 枚から。100 枚 10%OFF、300 枚 15%OFF。' },
      { q: '席札 / ドリンクトークン / エスコートカードの違いは?', a: '席札 = テーブル名表示、ドリンクトークン = ゲスト飲み物表示、エスコートカード = ゲスト席表示。セットで印刷されることが多いです。' },
      { q: 'ドリンクトークンに透明 PVC は使えますか?', a: '使えます。0.5mm 厚透明 PVC、防水耐久、屋外ウエディングやプール パーティに最適。' },
      { q: '名札にマグネット裏貼りは可能?', a: '可能。3M 強力粘着マグネット裏、会議バッジ / イベント名札向け、繰り返し使用可能。' },
    ],
    summary: 'ZprintPro 席札 / ドリンクトークン / エスコートカード印刷:50 枚から、5 場面、箔押し / エンボス仕上げ、世界配送。',
  },
};

'''

# Insert the 3 const declarations before the final `export const categorySeoContent: CategorySeoData = {`
marker = "export const categorySeoContent: CategorySeoData = {"
if marker not in src:
    raise Exception(f"Could not find marker: {marker}")

# Find the position of the marker
pos = src.find(marker)
# Insert GREETING_CARDS + WEDDING_INVITATIONS + PLACE_CARDS before marker
insert_pos = pos

new_content = GREETING_CARDS + WEDDING_INVITATIONS + PLACE_CARDS
new_src = src[:insert_pos] + new_content + src[insert_pos:]

# Now update the map at the end to include 3 new keys
# Find the map body and add 3 entries before the closing `};`
old_map_end = """};

export function getCategoryContent"""
# Actually need to update inside the map
old_map = """export const categorySeoContent: CategorySeoData = {
  packaging: packagingContent,
  'business-cards': businessCardsContent,
  stickers: stickersContent,
  flyers: flyersContent,
  posters: postersContent,
  'paper-bags': paperBagsContent,
  banners: bannersContent,
  books: booksContent,
  menus: menusContent,
  envelopes: envelopesContent,
  calendars: calendarsContent,
  'red-packets': redPacketsContent,
  educational: educationalContent,
  'japan-doujin': japanDoujinContent,
};"""

new_map = """export const categorySeoContent: CategorySeoData = {
  packaging: packagingContent,
  'business-cards': businessCardsContent,
  stickers: stickersContent,
  flyers: flyersContent,
  posters: postersContent,
  'paper-bags': paperBagsContent,
  banners: bannersContent,
  books: booksContent,
  menus: menusContent,
  envelopes: envelopesContent,
  calendars: calendarsContent,
  'red-packets': redPacketsContent,
  educational: educationalContent,
  'japan-doujin': japanDoujinContent,
  'greeting-cards': greetingCardsContent,
  'wedding-invitations': weddingInvitationsContent,
  'place-cards': placeCardsContent,
};"""

if old_map in new_src:
    new_src = new_src.replace(old_map, new_map)
    print("Replaced categorySeoContent map")
else:
    print("WARNING: Could not find old_map pattern, manual replace needed")
    # Try a more flexible search
    raise Exception("Map pattern not found - manual edit needed")

# Write
with open(CONTENT_FILE, 'w', encoding='utf-8') as f:
    f.write(new_src)

print(f"Updated {CONTENT_FILE}")
print(f"Old size: {len(src)}, New size: {len(new_src)}")
