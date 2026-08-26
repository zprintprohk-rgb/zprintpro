# -*- coding: utf-8 -*-
"""Step 2: Add 12 new SKUs (6 wedding + 6 place-cards) - v2 fixed.
Strategy: find the exact '];' of the products array, not the function's.
The products array ends at line 20411 with '];' followed by '// 获取所有产品'.
Use the unique pattern '\n];\n\n// 获取所有产品' to find the correct position.
"""
import os

BASE = r"F:\zprintpro-nextjs\src"
PRODUCTS_FILE = os.path.join(BASE, "data", "products.ts")

with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
    src = f.read()

# 6 wedding-invitations SKUs (WI-001 to WI-006)
WEDDING_SKUS = '''
  // === 喜帖印刷 (6 SKU, K3 8/17 拍板 Step 2) ===
  {
    id: 'WI-001',
    sku_code: 'WI-001',
    slug: 'foil-wedding-invitations',
    category: 'wedding-invitations',
    category_slug: 'wedding-invitations',
    name: '燙金喜帖', nameEn: 'Foil Wedding Invitations', nameJa: '箔押し結婚式招待状',
    description: '300g 棉紙燙金喜帖,玫瑰金 / 香檳金 / 銀色燙金工藝,50 套起印。順豐本地滿 HK$500 免費 + DHL 全球 2-4 天。**適配行業**: 婚慶/酒店/教堂/海外婚禮/Save the Date/感謝卡.',
    descriptionEn: '300gsm cotton foil wedding invitations in rose gold / champagne / silver finishes, 50 sets MOQ. Free shipping over $99 to USA + DHL Express 2-4 day global. **Best for**: weddings / hotels / chapels / destination weddings / Save the Date / thank you cards.',
    descriptionJa: '300g コットン箔押し結婚式招待状、ローズゴールド/シャンパンゴールド/銀仕上げ、50 セットから。DHL 国際 2-4 日配送。**適合業種**: 結婚式 / ホテル / チャペル /  destination wedding / Save the Date / サンキュカード.',
    price_range: 'NT$25-95 / 套',
    pricing: { basePrice: 1.20, unit: 'set', priceModel: 'tiered', tiers: [{ minQty: 50, maxQty: 99, unitPrice: 1.20 }, { minQty: 100, maxQty: 199, unitPrice: 1.08 }, { minQty: 200, maxQty: 499, unitPrice: 0.95 }, { minQty: 500, maxQty: null, unitPrice: 0.85 }] },
    optimizedAt: '2026-08-18',
    optimizationRound: 1,
    industries: ['婚慶酒店', '海外婚禮', '教堂婚禮', 'Save the Date', '感謝卡', '教堂紀念'],
    specs: { material: '300g 棉紙 / 350g 剛古紙 / 300g 銅版紙', size: '130×190mm 標準請帖 / 190×260mm 對摺請帖', finish: '燙金 (金/銀/玫瑰金/香檳金) + UV 局部 + 模切異形', printType: '柯式印刷 4C + 燙金' },
  },
  {
    id: 'WI-002',
    sku_code: 'WI-002',
    slug: 'save-the-date-cards',
    category: 'wedding-invitations',
    category_slug: 'wedding-invitations',
    name: 'Save the Date 卡片', nameEn: 'Save the Date Cards', nameJa: 'Save the Date カード',
    description: 'Save the Date 預告卡 50 套起印,300g 銅版紙 / 棉紙 / 剛古紙 可選,附郵寄信封。順豐本地 + DHL 全球。**適配行業**: 婚慶預告/教堂/Save the Date/感謝卡/教堂紀念.',
    descriptionEn: 'Save the Date announcement cards 50 sets MOQ, 300gsm art / cotton / Conqueror paper options with mailing envelopes included. Free shipping over $99 + DHL 2-4 day global. **Best for**: wedding previews / chapels / Save the Date / thank you cards / church memorials.',
    descriptionJa: 'Save the Date 予告カード 50 セットから、300g コート / コットン / コンカラー紙選択可、封筒付き。DHL 国際 2-4 日配送。**適合業種**: 結婚式予告 / チャペル / Save the Date / サンキュカード / 教会記念.',
    price_range: 'NT$18-65 / 套',
    pricing: { basePrice: 0.85, unit: 'set', priceModel: 'tiered', tiers: [{ minQty: 50, maxQty: 99, unitPrice: 0.85 }, { minQty: 100, maxQty: 199, unitPrice: 0.75 }, { minQty: 200, maxQty: 499, unitPrice: 0.65 }, { minQty: 500, maxQty: null, unitPrice: 0.55 }] },
    optimizedAt: '2026-08-18',
    optimizationRound: 1,
    industries: ['婚慶預告', '教堂婚禮', '海外婚禮', '感謝卡', '教堂紀念', '商務預告'],
    specs: { material: '300g 銅版紙 / 棉紙 / 剛古紙', size: 'A6 (105×148mm) / 自訂', finish: '光膠 / 啞膠 / 燙金 / UV 局部', printType: '柯式印刷 4C' },
  },
  {
    id: 'WI-003',
    sku_code: 'WI-003',
    slug: 'wedding-thank-you-cards',
    category: 'wedding-invitations',
    category_slug: 'wedding-invitations',
    name: '婚禮感謝卡', nameEn: 'Wedding Thank You Cards', nameJa: '結婚式サンキュカード',
    description: '婚禮感謝卡 100 套起印,300g 棉紙 / 銅版紙 / 剛古紙 + 燙金 / UV / 模切,配信封。順豐本地 + DHL 全球。**適配行業**: 婚慶答謝/教堂/海外婚禮/教堂紀念/感謝卡.',
    descriptionEn: 'Wedding thank you cards 100 sets MOQ, 300gsm cotton / art / Conqueror paper + foil / UV / die-cut, envelopes included. Free shipping over $99 + DHL 2-4 day global. **Best for**: wedding thank-yous / chapels / destination weddings / church memorials / thank you cards.',
    descriptionJa: '結婚式サンキュカード 100 セットから、300g コットン / コート / コンカラー紙 + 箔押し / UV / 抜型、封筒付き。DHL 国際 2-4 日配送。**適合業種**: 結婚式サンキュー / チャペル /  destination wedding / 教会記念 / サンキュカード.',
    price_range: 'NT$15-55 / 套',
    pricing: { basePrice: 0.65, unit: 'set', priceModel: 'tiered', tiers: [{ minQty: 100, maxQty: 199, unitPrice: 0.65 }, { minQty: 200, maxQty: 499, unitPrice: 0.55 }, { minQty: 500, maxQty: null, unitPrice: 0.45 }] },
    optimizedAt: '2026-08-18',
    optimizationRound: 1,
    industries: ['婚慶答謝', '教堂婚禮', '海外婚禮', '教堂紀念', '感謝卡', '宴會回禮'],
    specs: { material: '300g 棉紙 / 銅版紙 / 剛古紙', size: 'A6 (105×148mm) / 對摺 A5', finish: '燙金 / UV / 模切 / 折卡', printType: '柯式印刷 4C + 折卡' },
  },
  {
    id: 'WI-004',
    sku_code: 'WI-004',
    slug: 'wedding-program-cards',
    category: 'wedding-invitations',
    category_slug: 'wedding-invitations',
    name: '婚禮節目單', nameEn: 'Wedding Program Cards', nameJa: '結婚式のしおり',
    description: '婚禮節目單 / 流程表 100 套起印,雙面印刷 4C,300g 銅版紙 / 棉紙,折卡 4 頁或對摺可選。順豐本地 + DHL 全球。**適配行業**: 婚慶流程/教堂/海外婚禮/宴會程序/活動節目單.',
    descriptionEn: 'Wedding program / agenda cards 100 sets MOQ, duplex 4C print, 300gsm art / cotton paper, 4-page folded or bi-fold options. Free shipping over $99 + DHL 2-4 day global. **Best for**: wedding agendas / chapels / destination weddings / banquet programs / event programs.',
    descriptionJa: '結婚式のしおり / プログラムカード 100 セットから、両面 4C 印刷、300g コート / コットン紙、4 ページ折カードまたは両折選択可。DHL 国際 2-4 日配送。**適合業種**: 結婚式プログラム / チャペル /  destination wedding / 宴会プログラム / イベント プログラム.',
    price_range: 'NT$20-75 / 套',
    pricing: { basePrice: 0.95, unit: 'set', priceModel: 'tiered', tiers: [{ minQty: 100, maxQty: 199, unitPrice: 0.95 }, { minQty: 200, maxQty: 499, unitPrice: 0.85 }, { minQty: 500, maxQty: null, unitPrice: 0.75 }] },
    optimizedAt: '2026-08-18',
    optimizationRound: 1,
    industries: ['婚慶流程', '教堂婚禮', '海外婚禮', '宴會程序', '活動節目單', '典禮流程'],
    specs: { material: '300g 銅版紙 / 棉紙 / 剛古紙', size: 'A5 對摺 (148×210mm) / A4 對摺', finish: '光膠 / 啞膠 / 燙金', printType: '柯式印刷 4C 雙面' },
  },
  {
    id: 'WI-005',
    sku_code: 'WI-005',
    slug: 'wedding-menu-cards',
    category: 'wedding-invitations',
    category_slug: 'wedding-invitations',
    name: '婚禮菜單卡', nameEn: 'Wedding Menu Cards', nameJa: 'ウエディング メニュー',
    description: '婚禮菜單卡 100 套起印,300g 銅版紙 / 棉紙 + 燙金 + 模切,4 折或對摺。順豐本地 + DHL 全球。**適配行業**: 婚宴菜單/西式婚禮/海外婚禮/酒店宴會/米其林宴席.',
    descriptionEn: 'Wedding menu cards 100 sets MOQ, 300gsm art / cotton paper + foil + die-cut, 4-fold or bi-fold options. Free shipping over $99 + DHL 2-4 day global. **Best for**: wedding banquets / Western weddings / destination weddings / hotel banquets / Michelin dinners.',
    descriptionJa: 'ウエディング メニューカード 100 セットから、300g コート / コットン紙 + 箔押し + 抜型、4 折または両折選択可。DHL 国際 2-4 日配送。**適合業種**: 披露宴メニュー / 西洋式結婚式 /  destination wedding / ホテル宴会 / ミシュラン ディナー.',
    price_range: 'NT$25-95 / 套',
    pricing: { basePrice: 1.15, unit: 'set', priceModel: 'tiered', tiers: [{ minQty: 100, maxQty: 199, unitPrice: 1.15 }, { minQty: 200, maxQty: 499, unitPrice: 1.00 }, { minQty: 500, maxQty: null, unitPrice: 0.85 }] },
    optimizedAt: '2026-08-18',
    optimizationRound: 1,
    industries: ['婚宴菜單', '西式婚禮', '海外婚禮', '酒店宴會', '米其林宴席', '宴會餐單'],
    specs: { material: '300g 銅版紙 / 棉紙 / 剛古紙', size: 'A5 對摺 (148×210mm) / 自訂', finish: '燙金 / UV / 模切 / 折卡', printType: '柯式印刷 4C 雙面' },
  },
  {
    id: 'WI-006',
    sku_code: 'WI-006',
    slug: 'wedding-suite-bundle',
    category: 'wedding-invitations',
    category_slug: 'wedding-invitations',
    name: '婚慶整套配套', nameEn: 'Wedding Suite Bundle', nameJa: 'ウエディング フル セット',
    description: '婚慶整套 6 大件配套 (喜帖 + Save the Date + 感謝卡 + 節目單 + 菜單 + 席位圖),100 套起印。享 85 折優惠 + 免費寄樣。順豐本地 + DHL 全球。**適配行業**: 婚慶全套/海外婚禮/教堂/酒店婚禮/米其林宴席.',
    descriptionEn: 'Wedding full suite 6-piece bundle (invitation + Save the Date + thank you + program + menu + seating chart), 100 sets MOQ. 15% off bundle pricing + free sample. Free shipping over $99 + DHL 2-4 day global. **Best for**: full wedding / destination weddings / chapels / hotel weddings / Michelin dinners.',
    descriptionJa: 'ウエディング フル セット 6 点 (招待状 + Save the Date + サンキュー + のしおり + メニュー + 座席表)、100 セットから。セット 15%OFF + 無料サンプル。DHL 国際 2-4 日配送。**適合業種**: 結婚フルセット /  destination wedding / チャペル / ホテル結婚式 / ミシュラン ディナー.',
    price_range: 'NT$120-450 / 套 (整套 6 件)',
    pricing: { basePrice: 25.00, unit: 'set', priceModel: 'tiered', tiers: [{ minQty: 100, maxQty: 199, unitPrice: 25.00 }, { minQty: 200, maxQty: 499, unitPrice: 22.50 }, { minQty: 500, maxQty: null, unitPrice: 19.00 }] },
    optimizedAt: '2026-08-18',
    optimizationRound: 1,
    industries: ['婚慶全套', '海外婚禮', '教堂婚禮', '酒店婚禮', '米其林宴席', '中式婚禮'],
    specs: { material: '300g 棉紙 (主) + 350g 剛古紙 (請帖)', size: '6 件不同尺寸 (請帖 130×190mm 等)', finish: '燙金 (玫瑰金) + UV 局部 + 模切 + 折卡', printType: '柯式印刷 4C 雙面 + 燙金' },
  },
'''

PLACE_CARDS_SKUS = '''
  // === 台卡 / 酒水牌 / 座位卡 (6 SKU, K3 8/17 拍板 Step 2) ===
  {
    id: 'PC-001',
    sku_code: 'PC-001',
    slug: 'wedding-place-cards',
    category: 'place-cards',
    category_slug: 'place-cards',
    name: '婚宴台卡', nameEn: 'Wedding Place Cards', nameJa: 'ウエディング席札',
    description: '婚宴台卡 / 餐桌卡 100 張起印,300g 棉紙 / 銅版紙 / 剛古紙 + 燙金 / 壓紋 / 模切,配折卡或站立式。順豐本地 + DHL 全球。**適配行業**: 婚宴餐桌/酒店婚禮/海外婚禮/教堂/宴會餐桌.',
    descriptionEn: 'Wedding place cards / table cards 100 sheets MOQ, 300gsm cotton / art / Conqueror paper + foil / embossing / die-cut, folded or standing. Free shipping over $99 + DHL 2-4 day global. **Best for**: wedding tables / hotel weddings / destination weddings / chapels / banquet tables.',
    descriptionJa: 'ウエディング席札 / テーブルカード 100 枚から、300g コットン / コート / コンカラー紙 + 箔押し / エンボス / 抜型、折カードまたはスタンド式。DHL 国際 2-4 日配送。**適合業種**: 披露宴テーブル / ホテル結婚式 /  destination wedding / チャペル / 宴会テーブル.',
    price_range: 'NT$8-35 / 張',
    pricing: { basePrice: 0.30, unit: 'sheet', priceModel: 'tiered', tiers: [{ minQty: 100, maxQty: 199, unitPrice: 0.30 }, { minQty: 200, maxQty: 499, unitPrice: 0.25 }, { minQty: 500, maxQty: null, unitPrice: 0.20 }] },
    optimizedAt: '2026-08-18',
    optimizationRound: 1,
    industries: ['婚宴餐桌', '酒店婚禮', '海外婚禮', '教堂', '宴會餐桌', '宴會餐桌佈置'],
    specs: { material: '300g 棉紙 / 銅版紙 / 剛古紙', size: 'A6 (105×148mm) / A5 對摺 / 自訂站立式', finish: '燙金 / 壓紋 / 模切 / 折卡 / 站立', printType: '柯式印刷 4C 雙面' },
  },
  {
    id: 'PC-002',
    sku_code: 'PC-002',
    slug: 'drink-tokens',
    category: 'place-cards',
    category_slug: 'place-cards',
    name: '酒水牌 / 飲品標記', nameEn: 'Drink Tokens / Beverage Markers', nameJa: 'ドリンクトークン',
    description: '酒水牌 / 飲品標記卡 100 張起印,0.5mm 厚 PVC 透明卡 或 300g 銅版紙,防水耐用,模切圓角。順豐本地 + DHL 全球。**適配行業**: 婚宴飲品/泳池派對/酒店/咖啡廳/酒吧.',
    descriptionEn: 'Drink tokens / beverage markers 100 sheets MOQ, 0.5mm thick clear PVC or 300gsm art paper, waterproof durable, die-cut rounded corners. Free shipping over $99 + DHL 2-4 day global. **Best for**: wedding beverages / pool parties / hotels / cafés / bars.',
    descriptionJa: 'ドリンクトークン / 飲み物マーカー 100 枚から、0.5mm 厚透明 PVC または 300g コート紙、防水耐久、抜型角丸。DHL 国際 2-4 日配送。**適合業種**: 披露宴ドリンク / プール パーティ / ホテル / カフェ / バー.',
    price_range: 'NT$6-30 / 張',
    pricing: { basePrice: 0.25, unit: 'sheet', priceModel: 'tiered', tiers: [{ minQty: 100, maxQty: 199, unitPrice: 0.25 }, { minQty: 200, maxQty: 499, unitPrice: 0.22 }, { minQty: 500, maxQty: null, unitPrice: 0.18 }] },
    optimizedAt: '2026-08-18',
    optimizationRound: 1,
    industries: ['婚宴飲品', '泳池派對', '酒店', '咖啡廳', '酒吧', '宴會飲品'],
    specs: { material: '0.5mm 透明 PVC / 300g 銅版紙 / 350g 黑卡紙', size: 'A8 (52×74mm) / A7 (74×105mm) / 自訂圓形', finish: '模切圓角 / 燙金 / 打孔掛繩', printType: '柯式印刷 4C + UV 防水層' },
  },
  {
    id: 'PC-003',
    sku_code: 'PC-003',
    slug: 'escort-cards',
    category: 'place-cards',
    category_slug: 'place-cards',
    name: '座位卡 / 賓客標記', nameEn: 'Escort Cards / Guest Markers', nameJa: 'エスコートカード',
    description: '座位卡 / 賓客標記 100 張起印,300g 棉紙 / 銅版紙 + 燙金 + 模切異形 + 折卡站立。順豐本地 + DHL 全球。**適配行業**: 婚宴座位/酒店婚禮/海外婚禮/教堂/宴會座位.',
    descriptionEn: 'Escort cards / guest markers 100 sheets MOQ, 300gsm cotton / art paper + foil + die-cut shapes + folded standing. Free shipping over $99 + DHL 2-4 day global. **Best for**: wedding seating / hotel weddings / destination weddings / chapels / banquet seating.',
    descriptionJa: 'エスコートカード / ゲストマーカー 100 枚から、300g コットン / コート紙 + 箔押し + 抜型 + 折カード スタンド式。DHL 国際 2-4 日配送。**適合業種**: 披露宴席 / ホテル結婚式 /  destination wedding / チャペル / 宴会席.',
    price_range: 'NT$8-35 / 張',
    pricing: { basePrice: 0.30, unit: 'sheet', priceModel: 'tiered', tiers: [{ minQty: 100, maxQty: 199, unitPrice: 0.30 }, { minQty: 200, maxQty: 499, unitPrice: 0.25 }, { minQty: 500, maxQty: null, unitPrice: 0.20 }] },
    optimizedAt: '2026-08-18',
    optimizationRound: 1,
    industries: ['婚宴座位', '酒店婚禮', '海外婚禮', '教堂', '宴會座位', '宴會賓客引導'],
    specs: { material: '300g 棉紙 / 銅版紙 / 剛古紙', size: 'A7 (74×105mm) / A6 對摺 / 自訂站立', finish: '燙金 / UV / 模切異形 / 折卡 / 站立', printType: '柯式印刷 4C 雙面' },
  },
  {
    id: 'PC-004',
    sku_code: 'PC-004',
    slug: 'name-tags-badges',
    category: 'place-cards',
    category_slug: 'place-cards',
    name: '名牌卡 / 會議名牌', nameEn: 'Name Tags / Conference Badges', nameJa: '名札 / 会議バッジ',
    description: '會議名牌 / 展會名牌 100 張起印,300g 銅版紙 + 磁鐵背貼 (3M 強力膠) 或 打孔掛繩,可加燙金 / UV。順豐本地 + DHL 全球。**適配行業**: 會議/展會/培訓/商務活動/企業內部.',
    descriptionEn: 'Conference badges / event name tags 100 sheets MOQ, 300gsm art paper + 3M magnetic back or lanyard hole punch, optional foil / UV. Free shipping over $99 + DHL 2-4 day global. **Best for**: conferences / exhibitions / training / corporate events / enterprise internal.',
    descriptionJa: '会議バッジ / イベント名札 100 枚から、300g コート紙 + 3M マグネット裏またはストラップ穴あけ、箔押し / UV 追加可。DHL 国際 2-4 日配送。**適合業種**: 会議 / 展示会 / 研修 / 法人イベント / 企業内.',
    price_range: 'NT$10-45 / 張',
    pricing: { basePrice: 0.40, unit: 'sheet', priceModel: 'tiered', tiers: [{ minQty: 100, maxQty: 199, unitPrice: 0.40 }, { minQty: 200, maxQty: 499, unitPrice: 0.35 }, { minQty: 500, maxQty: null, unitPrice: 0.28 }] },
    optimizedAt: '2026-08-18',
    optimizationRound: 1,
    industries: ['會議', '展會', '培訓', '商務活動', '企業內部', '專業活動'],
    specs: { material: '300g 銅版紙 / 350g 白卡 / PVC 透明卡', size: 'A7 (74×105mm) / 90×120mm / 自訂', finish: '燙金 / UV / 磁鐵背貼 / 打孔掛繩', printType: '柯式印刷 4C 雙面' },
  },
  {
    id: 'PC-005',
    sku_code: 'PC-005',
    slug: 'cafe-table-cards',
    category: 'place-cards',
    category_slug: 'place-cards',
    name: '餐廳 / 咖啡廳台卡', nameEn: 'Café / Restaurant Table Cards', nameJa: 'カフェ / レストラン テーブルカード',
    description: '餐廳 / 咖啡廳台卡 100 張起印,300g 銅版紙 / 防水 PVC,UV 防水層,折卡站立式。順豐本地 + DHL 全球。**適配行業**: 餐廳/咖啡廳/酒吧/茶餐廳/酒店早餐.',
    descriptionEn: 'Café / restaurant table cards 100 sheets MOQ, 300gsm art paper / waterproof PVC, UV waterproof layer, folded standing. Free shipping over $99 + DHL 2-4 day global. **Best for**: restaurants / cafés / bars / tea houses / hotel breakfast.',
    descriptionJa: 'カフェ / レストラン テーブルカード 100 枚から、300g コート紙 / 防水 PVC、UV 防水層、折カード スタンド式。DHL 国際 2-4 日配送。**適合業種**: レストラン / カフェ / バー / 茶餐廳 / ホテル朝食.',
    price_range: 'NT$10-45 / 張',
    pricing: { basePrice: 0.40, unit: 'sheet', priceModel: 'tiered', tiers: [{ minQty: 100, maxQty: 199, unitPrice: 0.40 }, { minQty: 200, maxQty: 499, unitPrice: 0.35 }, { minQty: 500, maxQty: null, unitPrice: 0.28 }] },
    optimizedAt: '2026-08-18',
    optimizationRound: 1,
    industries: ['餐廳', '咖啡廳', '酒吧', '茶餐廳', '酒店早餐', '外賣店'],
    specs: { material: '300g 銅版紙 / 0.5mm 防水 PVC', size: 'A6 (105×148mm) / A5 對摺 / 自訂站立', finish: 'UV 防水 / 燙金 / 模切 / 折卡 / 站立', printType: '柯式印刷 4C + UV 防水層' },
  },
  {
    id: 'PC-006',
    sku_code: 'PC-006',
    slug: 'wedding-seating-charts',
    category: 'place-cards',
    category_slug: 'place-cards',
    name: '婚宴席位圖', nameEn: 'Wedding Seating Charts', nameJa: '披露宴座席表',
    description: '婚宴席位圖 / 大型座位圖 50 張起印,A1 / A2 大尺寸 300g 銅版紙 + 燙金 + 模切,單面或雙面印刷。順豐本地 + DHL 全球。**適配行業**: 婚宴/酒店婚禮/海外婚禮/教堂/大型宴會.',
    descriptionEn: 'Wedding seating charts / large seat maps 50 sheets MOQ, A1 / A2 large format 300gsm art paper + foil + die-cut, single or duplex print. Free shipping over $99 + DHL 2-4 day global. **Best for**: wedding banquets / hotel weddings / destination weddings / chapels / large banquets.',
    descriptionJa: '披露宴座席表 / 大型席図 50 枚から、A1 / A2 大判 300g コート紙 + 箔押し + 抜型、片面または両面印刷。DHL 国際 2-4 日配送。**適合業種**: 披露宴 / ホテル結婚式 /  destination wedding / チャペル / 大型宴会.',
    price_range: 'NT$120-450 / 張',
    pricing: { basePrice: 4.50, unit: 'sheet', priceModel: 'tiered', tiers: [{ minQty: 50, maxQty: 99, unitPrice: 4.50 }, { minQty: 100, maxQty: null, unitPrice: 3.80 }] },
    optimizedAt: '2026-08-18',
    optimizationRound: 1,
    industries: ['婚宴', '酒店婚禮', '海外婚禮', '教堂', '大型宴會', '宴會策劃'],
    specs: { material: '300g 銅版紙 / 350g 剛古紙 (大尺寸加厚)', size: 'A1 (594×841mm) / A2 (420×594mm) / 自訂', finish: '燙金 / UV / 模切 / 摺疊', printType: '柯式印刷 4C 單面或雙面' },
  },
'''

# Use a unique marker that ONLY appears at the products array end
# Pattern: `];\n\n// 获取所有产品` (last product is doujin's eco-tote-bag)
MARKER = "};\n\n// 获取所有产品"

# Try various encodings
import sys
MARKER_BYTES = "};\n\n// 获取所有产品".encode('utf-8')

# Find by line content instead
# The products array ends at the LAST `];` before the `// 获取所有产品` comment
# Find that comment first, then go back to find `];` before it
comment_pos = src.find("// 获取所有产品")
if comment_pos == -1:
    # Try utf-8 encoded bytes
    comment_pos = src.find(MARKER_BYTES.decode('utf-8'))
if comment_pos == -1:
    raise Exception("Could not find comment '// 获取所有产品'")

# Look backwards from comment_pos for `];\n\n` (the products array end)
# Search from comment_pos - 200 to comment_pos
search_area = src[max(0, comment_pos-100):comment_pos]
# Find the last `];\n\n` in the search area
# Use rfind within search_area
end_pattern = "];\n\n"
end_pos_in_area = search_area.rfind(end_pattern)
if end_pos_in_area == -1:
    raise Exception("Could not find '];' before comment")

# Absolute position of `];` in src
end_pos = max(0, comment_pos-100) + end_pos_in_area
# Insert NEW_SKUS just before `];`
# Original structure: last product closes with `},` then `];\n\n// 获取所有产品`
# After insert: last product `},` + NEW_SKUS + `];\n\n// 获取所有产品`
# NO extra `},` because last product already has one
replacement = WEDDING_SKUS + PLACE_CARDS_SKUS + "\n];\n\n"
new_src = src[:end_pos] + replacement + src[end_pos+len(end_pattern):]

# Write
with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
    f.write(new_src)

print(f"Updated {PRODUCTS_FILE}")
print(f"Old size: {len(src)}, New size: {len(new_src)}")
print(f"Added {len(new_src)-len(src)} bytes")
