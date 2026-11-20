/**
 * 5 个 SEO 专题页内容数据
 * 来自 seo-optimization-5-keywords.md
 */

import { Locale } from '@/types/locale';

export interface SeoKeyword {
  slug: 'food-packaging' | 'paper-bags' | 'flyers' | 'menu-printing' | 'lai-see';
  /** 各语言 Title */
  title: Record<Locale, string>;
  /** 各语言 Description */
  description: Record<Locale, string>;
  /** H1 */
  h1: Record<Locale, string>;
  /** 关键词（用于内容） */
  keywords: string[];
  /** 简介（约 40 字） */
  intro: Record<Locale, string>;
  /** 正文（约 200 字 / 200+ tokens） */
  body: Record<Locale, string[]>;
  /** 结尾（约 60 字） */
  outro: Record<Locale, string>;
  /** 起订量（用于 FAQ） */
  moq: string;
}

export const SEO_KEYWORDS: SeoKeyword[] = [
  {
    slug: 'food-packaging',
    title: {
      'zh-hk': '食品包裝印刷 香港 | 智印港 ZprintPro — 食品級包裝盒/袋 定制印刷',
      en: 'Food Packaging Printing | ZprintPro',
      ja: '食品パッケージ印刷 | ZprintPro',
    },
    description: {
      'zh-hk': '香港食品包裝印刷服務｜智印港提供食品級包裝盒、食品袋、食品貼紙定制印刷，符合食品安全標準，支持小批量起訂。免費報價，3-5天交貨，立即查詢！',
      en: 'Food packaging printing worldwide. Food-grade boxes, bags, stickers. Food safety standard compliant. Small MOQ. Free quote, 3-5 day delivery.',
      ja: '食品パッケージ印刷サービス。食品グレードの箱、袋、ステッカー。食品安全基準準拠。小ロット対応。無料見積もり、3-5日納品。',
    },
    h1: {
      'zh-hk': '香港食品包裝印刷定製 — 智印港 ZprintPro',
      en: 'Food Packaging Printing worldwide — ZprintPro',
      ja: '食品パッケージ印刷カスタマイズ — ZprintPro',
    },
    keywords: ['食品包裝印刷', 'food packaging printing', '食品包装', 'food grade'],
    intro: {
      'zh-hk': '香港專業食品包裝印刷服務，智印港 ZprintPro 為您提供食品級包裝盒、食品袋、食品標籤等一站式定制印刷方案。',
      en: 'Professional food packaging printing worldwide. ZprintPro provides one-stop custom solutions for food-grade boxes, bags, and labels.',
      ja: '食品パッケージ印刷専門サービス。ZprintPro は食品グレードの箱、袋、ラベルのワンストップカスタムソリューションを提供。',
    },
    body: {
      'zh-hk': [
        '印刷品類：食品包裝盒（蛋糕盒、外賣盒、餐盒）、食品袋（牛皮紙袋、淋膜紙袋、防油紙袋）、食品貼紙/標籤',
        '印刷工藝：柔印、膠印、數碼印刷，支持 CMYK / Pantone 專色',
        '材質選擇：食品級白卡紙、牛皮紙、銅版紙、可降解 PLA 淋膜紙',
        '定制選項：尺寸、厚度、開窗、覆膜（光膜/啞膜）、燙金、UV',
        '起訂量靈活：500 個起訂，加急 3 天交貨',
        '適用場景：烘焙店、咖啡廳、外賣餐飲、食品工廠、零食品牌',
      ],
      en: [
        'Product types: food boxes (cake, takeout, meal), food bags (kraft, PE-coated, greaseproof), food stickers/labels',
        'Printing: flexo, offset, digital; CMYK and Pantone spot colors',
        'Materials: food-grade white cardboard, kraft paper, coated paper, biodegradable PLA-coated paper',
        'Custom options: size, thickness, windowing, lamination (gloss/matte), foil, UV',
        'Flexible MOQ: 500 pcs minimum, 3-day rush delivery',
        'Use cases: bakeries, cafes, food delivery, food factories, snack brands',
      ],
      ja: [
        '製品タイプ：食品ボックス（ケーキ、テイクアウト、弁当）、食品袋（クラフト、PEコート、耐油）、食品ステッカー/ラベル',
        '印刷：フレキソ、オフセット、デジタル; CMYK と Pantone スポットカラー',
        '素材：食品グレード白紙、クラフト紙、コート紙、生分解性 PLA コート紙',
        'カスタムオプション：サイズ、厚さ、窓抜き、ラミネート（光沢/マット）、箔、UV',
        '柔軟最小ロット：500個から、3日特急対応',
        '用途：ベーカリー、カフェ、宅配、食品工場、スナックブランド',
      ],
    },
    outro: {
      'zh-hk': '智印港 ZprintPro 深耕香港印刷行業，食品包裝印刷客戶遍布港九新界。立即聯絡報價，免費打樣確認品質後再大貨生產，零風險合作。',
      en: 'ZprintPro serves bakeries, restaurants, and food brands worldwide. Contact us for a free quote — sample proof before mass production, zero-risk cooperation.',
      ja: 'ZprintPro は日本全国のベーカリー、レストラン、食品ブランドにサービスを提供。無料見積もり、本生産前のサンプル確認でリスクゼロ。',
    },
    moq: '500',
  },
  {
    slug: 'paper-bags',
    title: {
      'zh-hk': '紙袋印刷 香港 | 智印港 ZprintPro — 牛皮紙袋/白卡紙袋 訂製印刷',
      en: 'Paper Bag Printing | ZprintPro',
      ja: '紙袋印刷 | ZprintPro',
    },
    description: {
      'zh-hk': '香港紙袋印刷專家｜智印港提供牛皮紙袋、白卡紙袋、Kraft Paper Bag 印刷定製，支持小批量，免費設計打樣。服裝店/餐飲/零售首選紙袋印刷廠，立即在線報價！',
      en: 'Paper bag printing worldwide. Kraft paper bags, white card bags. Small MOQ, free design proofing. Garment, F&B, retail. Get a quote now!',
      ja: '紙袋印刷。クラフト紙袋、白カード紙袋、Kraft Paper Bag。小ロット対応、無料デザインチャック。',
    },
    h1: {
      'zh-hk': '香港紙袋印刷定製 — 牛皮紙袋 / 白卡紙袋 / 精品紙袋',
      en: 'Paper Bag Printing — Kraft / White Card / Premium Bags',
      ja: '紙袋印刷カスタマイズ — クラフト / 白カード / プレミアム',
    },
    keywords: ['紙袋印刷', 'paper bag printing', 'kraft bag', '牛皮纸袋'],
    intro: {
      'zh-hk': '香港專業紙袋印刷服務，智印港 ZprintPro 提供牛皮紙袋、白卡紙袋、精品紙袋一站式定制印刷，品質保證。',
      en: 'Professional paper bag printing worldwide. ZprintPro provides one-stop custom kraft, white card, and premium paper bags with quality guaranteed.',
      ja: '紙袋印刷専門サービス。ZprintPro はクラフト、白カード、プレミアム紙袋のワンストップカスタム印刷。',
    },
    body: {
      'zh-hk': [
        '紙袋種類：牛皮紙袋（Kraft Paper Bag）、白卡紙袋、銅版紙袋、精品時裝袋',
        '尺寸範圍：15 x 10 x 5cm 迷你袋到 50 x 40 x 15cm 大型購物袋，支持定制任意尺寸',
        '提手選項：棉繩、紙繩、緞帶、PP 塑膠提手、打孔提手',
        '印刷工藝：膠印 CMYK、專色 Pantone、燙金/燙銀、UV 局部光油',
        '覆膜：光膜（亮面）、啞膜（啞光觸感）、水性環保覆膜',
        '起訂量：200 個起訂，交期 3-7 天',
        '目標客戶：服裝店、精品店、烘焙店、化妝品店、超市、展會',
      ],
      en: [
        'Bag types: kraft, white card, coated paper, premium fashion bags',
        'Size range: 15x10x5cm mini to 50x40x15cm large shopping bags; custom sizes',
        'Handle options: cotton rope, paper rope, ribbon, PP plastic, die-cut',
        'Printing: offset CMYK, Pantone spot, foil (gold/silver), UV spot',
        'Lamination: gloss, matte, water-based eco',
        'MOQ: 200 pcs, 3-7 days delivery',
        'Target: fashion, boutique, bakery, cosmetics, retail, exhibition',
      ],
      ja: [
        'バッグタイプ：クラフト、白カード、コート紙、プレミアムファッション',
        'サイズ：15x10x5cm ミニから 50x40x15cm 大型まで、カスタムサイズ対応',
        'ハンドル：綿ロープ、紙ロープ、リボン、PP プラスチック、ダイカット',
        '印刷：オフセット CMYK、Pantone スポット、箔（金/銀）、UV スポット',
        'ラミネート：光沢、マット、水性エコ',
        '最小ロット：200個、3-7日納品',
        'ターゲット：ファッション、ブティック、ベーカリー、化粧品、小売、展示会',
      ],
    },
    outro: {
      'zh-hk': '智印港已服務 500+ 香港商戶，點擊獲取即時報價，享首次下單 9 折優惠。',
      en: 'ZprintPro serves 500+ merchants worldwide. Click for instant quote — first order 10% off.',
      ja: 'ZprintPro は500社以上の法人顧客にサービスを提供。即時見積もり、初注文10%オフ。',
    },
    moq: '200',
  },
  {
    slug: 'flyers',
    title: {
      'zh-hk': '傳單印刷印刷 香港 | 智印港 ZprintPro — 傳單/單張/Leaflet 特價印刷',
      en: 'Flyer Printing | ZprintPro',
      ja: 'チラシ印刷 | ZprintPro',
    },
    description: {
      'zh-hk': '香港傳單印刷印刷｜智印港提供 A4/A5/DL 傳單印刷、Leaflet、傳單印刷，銅版紙/啞粉紙可選，500張起印，免費送貨。全港最低價保證，立即網上報價！',
      en: 'Flyer printing worldwide. A4/A5/DL flyers, leaflets. Coated/matte paper. 500 pcs MOQ, free delivery. Best price guaranteed!',
      ja: 'チラシ印刷。A4/A5/DL チラシ、Leaflet。コート紙/マット紙。500枚から。',
    },
    h1: {
      'zh-hk': '香港傳單印刷印刷 — 傳單 / 單張 / Leaflet 特價快印',
      en: 'Flyer Printing — Leaflet / Single Sheet / Discount Print',
      ja: 'チラシ印刷 — Leaflet / 単紙 / 特価印刷',
    },
    keywords: ['傳單印刷', 'flyer printing', '傳單', 'leaflet'],
    intro: {
      'zh-hk': '香港傳單印刷印刷服務，智印港 ZprintPro 專業承接各類傳單/單張/Leaflet 印刷，價格透明，時效保證。',
      en: 'Professional flyer printing worldwide. ZprintPro handles all types of flyers, leaflets, and single sheets with transparent pricing and on-time delivery.',
      ja: 'チラシ印刷サービス。ZprintPro は全タイプのチラシ、Leaflet、単紙を透明価格と納期保証で対応。',
    },
    body: {
      'zh-hk': [
        '尺寸規格：A4 (210 x 297mm)、A5 (148 x 210mm)、DL (99 x 210mm)、自定義尺寸',
        '紙張選擇：128g/157g/200g 銅版紙、啞粉紙、藝術紙、環保再生紙',
        '印刷工藝：雙面 CMYK 彩色印刷、專色 Pantone 印刷',
        '後加工：覆膜（光膜/啞膜）、折頁（對折/三折/風琴折）、壓痕、打孔',
        '起訂量：500 張起印，量大優惠，同批 4 款起可拼版降低成本',
        '應用場景：促銷活動、新品發布、店鋪開張、展會派發、地產中介',
        '設計支持：免費排版設計（提供文案即可），或來稿直接印刷',
      ],
      en: [
        'Sizes: A4 (210x297mm), A5 (148x210mm), DL (99x210mm), custom',
        'Paper: 128g/157g/200g coated, matte, art paper, eco recycled',
        'Printing: double-sided CMYK, Pantone spot',
        'Finishing: lamination (gloss/matte), folding (half/trifold/accordion), scoring, drilling',
        'MOQ: 500 sheets, volume discount, 4-design gang-run available',
        'Use cases: promotions, product launch, store opening, exhibition, real estate',
        'Design: free layout (provide copy), or print from artwork',
      ],
      ja: [
        'サイズ：A4 (210x297mm)、A5 (148x210mm)、DL (99x210mm)、カスタム',
        '紙：128g/157g/200g コート紙、マット紙、アート紙、エコ再生紙',
        '印刷：両面 CMYK、Pantone スポット',
        '後加工：ラミネート（光沢/マット）、折り（2つ折/3つ折/蛇腹折）、スコーチング、穴あけ',
        '最小ロット：500枚、ボリューム割引、4種合せ版可能',
        '用途：プロモーション、新商品発売、店舗オープン、展示会、不動産',
        'デザイン：無料レイアウト（原稿提供）、または入稿印刷',
      ],
    },
    outro: {
      'zh-hk': '傳單印刷作為傳統銷售利器，搭配線上引流效果倍增。智印港專注香港本地印刷，上午落單下午出貨。立即聯絡獲取專屬報價，大量訂單更可享上門送稿服務。',
      en: 'Flyers remain a powerful offline sales tool — combined with online traffic, the effect doubles. ZprintPro specializes worldwide local print: morning order, afternoon dispatch. Click for a custom quote.',
      ja: 'チラシは伝統的な販売ツールとして依然強力 — オンライン集客と組み合わせ効果は倍増。ZprintPro はローカル印刷に特化。',
    },
    moq: '500',
  },
  {
    slug: 'menu-printing',
    title: {
      'zh-hk': '餐牌印刷 香港 | 智印港 ZprintPro — 餐廳菜單/Menu 訂製印刷',
      en: 'Menu Printing | ZprintPro',
      ja: 'メニュープリント | ZprintPro',
    },
    description: {
      'zh-hk': '香港餐牌印刷專業廠家｜智印港為餐廳提供 Menu 菜單、餐牌、酒水牌、膠卡餐牌印刷，PVC防水/啞面/燙金工藝，免費排版設計，100本起訂，3天交貨！',
      en: 'Menu printing for restaurants. PVC waterproof, matte, foil finishes. Free layout, 100 books MOQ, 3-day delivery.',
      ja: 'メニュープリント。PVC防水、マット、箔加工。無料レイアウト、100冊から、3日納品。',
    },
    h1: {
      'zh-hk': '香港餐牌印刷定製 — 菜單 / Menu / 酒水牌 專業印刷',
      en: 'Menu Printing — Restaurant Menu / Wine List / Professional Print',
      ja: 'メニュープリント — レストランメニュー / ワインリスト',
    },
    keywords: ['餐牌印刷', 'menu printing', 'menu', '餐牌'],
    intro: {
      'zh-hk': '香港專業餐牌印刷服務，智印港 ZprintPro 為各類餐飲企業提供菜單、酒水牌、餐桌牌等一站式印刷方案。',
      en: 'Professional menu printing worldwide. ZprintPro provides one-stop printing solutions for menus, wine lists, and table cards for F&B businesses.',
      ja: 'メニュープリント専門サービス。ZprintPro はメニュー、ワインリスト、テーブルカードなど F&B 企業向けワンストップ印刷を提供。',
    },
    body: {
      'zh-hk': [
        '餐牌類型：封面餐牌、單張菜單、折疊菜單、PVC 防水餐牌、膠卡餐牌、皮面餐牌',
        '紙張與材質：200g/300g/350g 銅版紙、啞粉紙、PVC 防水材質、皮革封面',
        '印刷工藝：CMYK 彩印、燙金/燙銀、UV 局部光油、擊凸/壓凹',
        '後加工：覆膜（防水啞膜/光膜）、騎馬釘、線圈裝訂、膠裝',
        '防水處理：PVC 防水餐牌適合火鍋店、燒烤店、咖啡廳，耐髒易清潔',
        '起訂量：50 本起訂，交期 3-5 天',
        '目標客戶：中餐廳、西餐廳、咖啡廳、火鍋店、燒烤店、酒吧、酒店',
      ],
      en: [
        'Types: cover menu, single sheet, fold-out, PVC waterproof, plastic card, leather-bound',
        'Paper/material: 200g/300g/350g coated, matte, PVC waterproof, leather cover',
        'Printing: CMYK, foil (gold/silver), UV spot, embossing/debossing',
        'Finishing: lamination (matte/gloss), saddle stitch, wire-o, perfect binding',
        'Waterproof: PVC for hotpot, BBQ, cafe — easy to clean',
        'MOQ: 50 books, 3-5 days delivery',
        'Target: Chinese/Western restaurants, cafes, hotpot, BBQ, bars, hotels',
      ],
      ja: [
        'タイプ：表紙メニュー、単紙メニュー、折込メニュー、PVC 防水メニュー、プラスチックカード、革表紙',
        '紙/素材：200g/300g/350g コート紙、マット紙、PVC 防水、革表紙',
        '印刷：CMYK、箔（金/銀）、UV スポット、エンボス/デボス',
        '後加工：ラミネート（マット/光沢）、中綴じ、リング製本、無線綴じ',
        '防水：PVC は鍋、焼肉、カフェ向け — 清掃簡単',
        '最小ロット：50冊、3-5日納品',
        'ターゲット：中華/西洋レストラン、カフェ、鍋、焼肉、バー、ホテル',
      ],
    },
    outro: {
      'zh-hk': '餐牌是食客對餐廳的"第一印象"。智印港提供免費餐牌設計打樣，專業排版師根據您餐廳風格量身設計。',
      en: 'The menu is the diner\u2019s first impression of your restaurant. ZprintPro offers free menu design proofing, with professional layout tailored to your restaurant style.',
      ja: 'メニューはお客様の第一印象。ZprintPro は無料デザイン作成、店舗スタイルに合わせたプロフェッショナルレイアウトを提供。',
    },
    moq: '50',
  },
  {
    slug: 'lai-see',
    title: {
      'zh-hk': '利是封印刷 香港 | 智印港 ZprintPro — 利是封/紅包/婚慶利是封 訂製',
      en: 'Lai See / Red Packet Printing | ZprintPro',
      ja: 'ポチ袋印刷 | ZprintPro',
    },
    description: {
      'zh-hk': '香港利是封印刷定制｜智印港提供企業利是封、婚慶利是封、賀年利是封印刷，燙金/UV/專色工藝，300個起訂，免費設計。公司年會/婚禮/春節送禮首選，立即報價！',
      en: 'Lai See / red packet printing worldwide. Corporate, wedding, CNY designs. Foil, UV, spot color. 300 pcs MOQ, free design.',
      ja: 'ポチ袋印刷。企業、婚礼、旧正月デザイン。箔、UV、スポットカラー。300個から。',
    },
    h1: {
      'zh-hk': '香港利是封印刷定製 — 企業利是封 / 婚慶利是封 / 賀年利是封',
      en: 'Lai See Printing — Corporate / Wedding / CNY Red Packets',
      ja: 'ポチ袋印刷 — 法人 / 婚礼 / 旧正月用',
    },
    keywords: ['利是封印刷', 'red packet printing', 'lai see', '利是封'],
    intro: {
      'zh-hk': '香港專業利是封印刷定制服務，智印港 ZprintPro 承接企業年會、婚禮喜慶、春節賀年用利是封批量印刷。',
      en: 'Professional Lai See / red packet printing worldwide. ZprintPro handles corporate, wedding, and Chinese New Year red packets in bulk.',
      ja: 'ポチ袋印刷専門サービス。ZprintPro は法人、婚礼、旧正月用ポチ袋の大量印刷を承ります。',
    },
    body: {
      'zh-hk': [
        '利是封款式：傳統紅封、燙金利是封、UV 彩印利是封、迷你利是封、異形封',
        '紙張材質：120g/150g 進口紅卡紙、特種藝術紙、觸感絨面紙',
        '印刷工藝：燙金（金色/銀色/紅色/玫瑰金）、UV 彩印、專色 Pantone 印刷、擊凸',
        '尺寸規格：標準 85 x 160mm、迷你 60 x 110mm、大號 90 x 175mm，支持定制尺寸',
        '起訂量：300 個起訂，量大更優惠，交期 5-7 天',
        '目標客戶：企業年會、開工/尾牙、婚禮宴席、春節送禮、銀行/地產客戶維護',
        '設計服務：免費排版，可印公司 Logo、祝福語、二維碼（引流至官網/公眾號）',
      ],
      en: [
        'Styles: traditional red, foil-stamped, UV-printed, mini, die-cut',
        'Paper: 120g/150g imported red card, specialty art paper, velvet touch',
        'Printing: foil (gold/silver/red/rose gold), UV, Pantone spot, embossing',
        'Sizes: standard 85x160mm, mini 60x110mm, large 90x175mm, custom',
        'MOQ: 300 pcs, volume discount, 5-7 day delivery',
        'Target: corporate events, kickoff/year-end parties, weddings, CNY gifts, bank/real estate client retention',
        'Design: free layout, with company logo, blessing text, QR code (driving to website/official account)',
      ],
      ja: [
        'スタイル：伝統的赤、箔押し、UV印刷、ミニ、ダイカット',
        '紙：120g/150g 輸入赤カード、特殊アート紙、ベルベットタッチ',
        '印刷：箔（金/銀/赤/ローズゴールド）、UV、Pantone スポット、エンボス',
        'サイズ：標準 85x160mm、ミニ 60x110mm、ラージ 90x175mm、カスタム',
        '最小ロット：300個、ボリューム割引、5-7日納品',
        'ターゲット：企業イベント、 kickoff/年末パーティー、婚礼、旧正月、銀行/不動産顧客維持',
        'デザイン：無料レイアウト、ロゴ、メッセージ、QR コード追加可能',
      ],
    },
    outro: {
      'zh-hk': '每年香港利是封需求高峰期集中農曆新年前 2 個月。智印港提前備貨，支持急單加急生產。',
      en: 'Lai See demand peaks in the 2 months before Lunar New Year. ZprintPro stocks in advance and supports rush production.',
      ja: 'ポチ袋の需要は旧正月前の2ヶ月にピーク。ZprintPro は事前在庫と特急生産をサポート。',
    },
    moq: '300',
  },
];

export function getSeoKeyword(slug: string): SeoKeyword | undefined {
  return SEO_KEYWORDS.find((k) => k.slug === slug);
}
