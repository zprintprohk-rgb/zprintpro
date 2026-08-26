# -*- coding: utf-8 -*-
"""Step 2: Add 3 new category content blocks to category-seo-content.ts.
Proper interface: h2, coreAdvantages, materialTable, specialOptions, techSpecs, serviceNodes, buyingGuide, faq.
Each locale (zh-hk, en, ja) has all 8 sections.
"""
import os

BASE = r"F:\zprintpro-nextjs\src"
CONTENT_FILE = os.path.join(BASE, "data", "category-seo-content.ts")

with open(CONTENT_FILE, 'r', encoding='utf-8') as f:
    src = f.read()

# Use minimal but complete content per locale (3 sections per advantage, 3 rows per table, 4 FAQ)
# Total ~ 70-80 lines per locale per category, ~ 240 lines per category, ~720 lines total

GREETING_CARDS = '''const greetingCardsContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    h2: '賀卡印刷 · 100 張起印 · 3D 立體爆款 · 順豐本地 + DHL 全球配送',
    coreAdvantages: {
      title: '為何選擇智印港的賀卡印刷?',
      items: [
        {
          heading: '1. 全場景覆蓋:節日 / 生日 / 感謝 / 邀請 / 商業 / 立體 3D 賀卡六大類目',
          points: [
            '200+ SKU 即選即印,覆蓋聖誕卡、新年卡、情人節卡、母親節卡、父親節卡、畢業卡、商業賀卡全場景。',
            '適配跨境電商爆款 (US 70B 張/年, 90% 家庭買)、企業客戶 (corporate 50%+ 市場份額)、個人用戶 (節日送禮首選)。',
            '支援 3D 彈起式 (LovePop 模式)、立體鐳射雕花、POP-UP 紙雕工藝,毛利率 15x (1688 ¥7-12 → US $14.99)。',
          ],
        },
        {
          heading: '2. 6 大紙材 + 4 大工藝 + 30 秒 AI 即時報價 + 4 小時免費打樣',
          points: [
            '6 大核心材質:300g 銅版紙、350g 剛古紙、300g 棉紙、特種金 / 銀卡紙、種子紙 (可種植)、立體鐳射紙。',
            '4 大核心工藝:燙金 / 燙銀、UV 局部、模切異形、3D 立體彈起,適配跨境爆款需求。',
            '順豐本地滿 HK$500 免費 + DHL 全球 2-4 天配送 + FSC 認證紙材 + ISO 9001 品質。',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質工藝詳解',
      subtitle: '賀卡常用材質與應用場景',
      columns: ['材質類型', '關鍵特性', '適用場景'],
      rows: [
        { material: '300g 高級銅版紙', features: '色彩鮮豔 / 表面光亮塗層 / 視覺搶眼', scenarios: '標準商務賀卡 / 大量派發' },
        { material: '350g 剛古紙 / Conqueror', features: '高克重挺括 / 紋理獨特 / 質感奢華', scenarios: '高端品牌 / 律師 / 會計師 / 醫療' },
        { material: '300g 棉質紙 (含棉纖維)', features: '觸感細膩 / 環保認證 / 高端內斂', scenarios: '奢侈品代理 / 創意產業 / 藝術工作者' },
        { material: '特種金 / 銀卡紙', features: '金屬光澤 / 視覺衝擊 / 高端首選', scenarios: '聖誕卡 / 新年卡 / 慶典賀卡' },
        { material: '種子紙 (FSC 環保)', features: '可種植 (薄荷 / 苜蓿) / 環保 / EU 美標準', scenarios: '環保品牌 / 永續企業 / 綠色活動' },
      ],
    },
    specialOptions: {
      title: '特殊加工選項',
      items: [
        { name: '燙金 / 燙銀 (金 / 銀 / 玫瑰金 / 香檳金)', description: '金屬光澤,瞬間提升奢華感,適合高端品牌' },
        { name: 'UV 局部上光', description: '凸顯 Logo 或圖案,與啞面形成強烈對比' },
        { name: '3D 立體彈起 (POP-UP)', description: '紙雕立體彈起,跨境爆款 SKU 核心工藝' },
        { name: '模切異形 (Die-Cut)', description: '支持自定義形狀,區別於標準矩形' },
        { name: '信封配套 (C5 / C6 / 自訂)', description: '郵寄信封一站搞定,提升專業感' },
        { name: '個性化照片定制', description: '支援照片上傳 + 客製化文字,適合情侶 / 家庭' },
      ],
    },
    techSpecs: {
      title: '技術參數詳解',
      items: [
        { label: '標準尺寸', value: 'A6 (105×148mm) / A5 (148×210mm) / A4 (210×297mm) / 自訂' },
        { label: '起訂量', value: '100 張起印,500 張享批量折扣,50 張可議 (小批量試產)' },
        { label: '打樣時間', value: '數碼打樣 24 小時 / 4 小時免費打樣 (含實物寄送)' },
        { label: '量產交期', value: '常規 3-5 工作天,加急 24-48 小時可議' },
        { label: '檔案要求', value: 'AI / PSD / PDF / CDR, 300dpi, CMYK, 出血 3mm, 文字轉外框' },
        { label: '環保認證', value: 'FSC 認證紙 + 大豆油墨 + ISO 9001 + 可回收' },
      ],
    },
    serviceNodes: {
      title: '本地化服務節點',
      items: [
        { title: '30 秒 AI 即時報價', description: '透明定價,無隱藏費用' },
        { title: '4 小時免費打樣', description: '確認外觀與尺寸無誤後再批量生產' },
        { title: '順豐本地配送', description: '港島九龍新界滿 HK$500 免費' },
        { title: 'DHL 全球直送', description: '2-4 天跨境直送 190+ 國家' },
      ],
    },
    buyingGuide: {
      title: '賀卡印刷選購指南',
      paragraphs: [
        '賀卡印刷第一步先定用途:節日送禮選 3D 彈起式 (跨境爆款),商務賀卡選燙金 300g 剛古紙,感謝卡選棉紙 + UV 局部。用途定得清,紙材同工藝即刻收窄一半預算。',
        '節日賀卡關鍵係設計一致性:聖誕卡 / 新年卡 / 情人節卡統一視覺語言,客戶回購率提升 30%+。建議每季備 3-5 款模板,降低設計成本。',
        '跨境爆款 3D 立體賀卡 7 天 78 萬 GMV 實證 (TikTok Paper Love 案例),單卡 US $14.99,1688 批發 ¥7-12 = 15x 毛利。立體彈起工藝是跨境核心壁壘。',
        'FSC 認證 + 大豆油墨 + 種子紙 (可種植) 三大環保賣點,EU / US 客戶願付 20% 溢價,符合歐美 ESG 採購趨勢。',
        '量產甜蜜點:100-500 張走數碼印刷免製版,500-5000 張走柯式印刷單價可壓至 HK$0.5/張。旺季 (聖誕 / 情人節 / 母親節) 提前 4 星期落單。',
      ],
      links: [
        { label: '3D 立體賀卡跨境指南', href: '/zh-hk/blog/3d-pop-up-card-guide/' },
        { label: '節日賀卡印刷攻略', href: '/zh-hk/blog/holiday-card-printing-guide/' },
        { label: '貼紙印刷', href: '/zh-hk/category/stickers/' },
        { label: '喜帖印刷', href: '/zh-hk/category/wedding-invitations/' },
      ],
    },
    faq: [
      { q: '賀卡印刷最少印幾多張?', a: '100 張起印。50 張小批量可議,適合設計確認或首批客戶。' },
      { q: '立體 3D 賀卡最快幾時出貨?', a: '數碼打樣 24 小時,批量 3-5 工作天,加急 24-48 小時可議。' },
      { q: '可以印定制圖案嗎?', a: '可以。支援 AI / PSD / PDF / CDR 檔,300dpi CMYK 色域,設計免費預檢。' },
      { q: '環保材質有咩選擇?', a: 'FSC 認證紙 + 大豆油墨 + 種子紙 (用完可種植薄荷或苜蓿),符合歐美環保標準。' },
    ],
  },
  en: {
    h2: 'Greeting Card Printing from $0.50 | 3D Pop-Up Hero SKUs | 100 MOQ + Free Proof',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Greeting Card Printing?',
      items: [
        {
          heading: '1. Full-Scenario Coverage: 6 Categories, 200+ SKUs',
          points: [
            'Holiday / Birthday / Thank You / Invitation / Corporate / 3D Pop-Up cards — 6 categories with 200+ in-stock SKUs.',
            'US 7B cards/year, 90% US households buy. Cross-border e-commerce (15x margin: ¥7-12 wholesale → $14.99 retail) + corporate buyers (50%+ market share).',
            '3D pop-up (LovePop $40M/year model), laser-cut POP-UP, paper sculpture techniques — proven cross-border hero SKU category.',
          ],
        },
        {
          heading: '2. 6 Materials + 4 Finishes + 30s AI Quote + 4-Hour Free Proof',
          points: [
            '6 core materials: 300gsm art, 350gsm Conqueror, 300gsm cotton, specialty gold/silver card, seed paper (plantable), 3D laser paper.',
            '4 core finishes: foil / silver / rose gold, spot UV, die-cut shapes, 3D pop-up — built for cross-border e-commerce.',
            'Free shipping over $99 to USA + DHL Express 2-4 day global + FSC certified + ISO 9001 quality.',
          ],
        },
      ],
    },
    materialTable: {
      title: 'Material & Finish Guide',
      subtitle: 'Greeting card materials and applications',
      columns: ['Material Type', 'Key Features', 'Best For'],
      rows: [
        { material: '300gsm Premium Art Paper', features: 'Vibrant colors / glossy coating / eye-catching', scenarios: 'Standard business / mass distribution' },
        { material: '350gsm Conqueror', features: 'Heavy weight / unique texture / luxury feel', scenarios: 'Premium brands / lawyers / accountants' },
        { material: '300gsm Cotton Paper', features: 'Soft touch / eco-certified / refined', scenarios: 'Luxury agents / creative industries' },
        { material: 'Specialty Gold / Silver Card', features: 'Metallic shine / visual impact / premium', scenarios: 'Christmas / New Year / celebration cards' },
        { material: 'Seed Paper (FSC Eco)', features: 'Plantable (mint / alfalfa) / eco / EU US standards', scenarios: 'Eco brands / sustainable enterprises' },
      ],
    },
    specialOptions: {
      title: 'Special Processing Options',
      items: [
        { name: 'Foil Stamping (Gold / Silver / Rose Gold / Champagne)', description: 'Metallic shine, instant luxury, perfect for premium brands' },
        { name: 'Spot UV', description: 'Highlight logo or pattern, strong contrast with matte' },
        { name: '3D Pop-Up', description: 'Paper sculpture pop-up, cross-border hero SKU core technique' },
        { name: 'Die-Cut Shapes', description: 'Custom shapes beyond standard rectangle' },
        { name: 'Envelope Bundling (C5 / C6 / Custom)', description: 'Mailing envelopes included, professional presentation' },
        { name: 'Photo Personalization', description: 'Photo upload + custom text, perfect for couples / families' },
      ],
    },
    techSpecs: {
      title: 'Technical Specifications',
      items: [
        { label: 'Standard Sizes', value: 'A6 (4.1"×5.8") / A5 (5.8"×8.3") / A4 (8.3"×11.7") / Custom' },
        { label: 'MOQ', value: '100 sheets minimum, 500+ bulk discount, 50 negotiable (small batch trial)' },
        { label: 'Proof Time', value: 'Digital proof 24h / 4h free proof (with physical sample shipping)' },
        { label: 'Production Lead Time', value: 'Standard 3-5 business days, rush 24-48h available' },
        { label: 'File Requirements', value: 'AI / PSD / PDF / CDR, 300dpi, CMYK, 3mm bleed, outlined text' },
        { label: 'Eco Certifications', value: 'FSC certified + soy ink + ISO 9001 + recyclable' },
      ],
    },
    serviceNodes: {
      title: 'Localized Service Nodes',
      items: [
        { title: '30s AI Instant Quote', description: 'Transparent pricing, no hidden fees' },
        { title: '4-Hour Free Proof', description: 'Confirm appearance and dimensions before bulk production' },
        { title: 'Free Shipping >$99', description: 'USA-wide delivery, all 50 states' },
        { title: 'DHL Express Global', description: '2-4 day direct shipping to 190+ countries' },
      ],
    },
    buyingGuide: {
      title: 'Greeting Card Printing Buying Guide',
      paragraphs: [
        'First, define the use case: holiday gifts choose 3D pop-up (cross-border hero), business cards choose foil 300gsm Conqueror, thank you cards choose cotton + spot UV. Clear use case cuts material and finish budget in half.',
        'Holiday card key is design consistency: Christmas / New Year / Valentine cards use unified visual language, customer repurchase rate +30%. Recommend 3-5 templates per season to reduce design cost.',
        'Cross-border hero 3D pop-up cards: 7-day 780K RMB GMV (TikTok Paper Love case), $14.99 retail, ¥7-12 wholesale = 15x margin. 3D pop-up is the cross-border core moat.',
        'FSC certified + soy ink + seed paper (plantable) — three eco selling points. EU / US customers willing to pay 20% premium, matching ESG procurement trends.',
        'Production sweet spot: 100-500 sheets digital (no plate), 500-5000 sheets offset (unit price can drop to $0.07). Peak season (Christmas / Valentine / Mother\'s Day) order 4 weeks ahead.',
      ],
      links: [
        { label: '3D Pop-Up Card Cross-Border Guide', href: '/en/blog/3d-pop-up-card-guide/' },
        { label: 'Holiday Card Printing Strategy', href: '/en/blog/holiday-card-printing-guide/' },
        { label: 'Sticker Printing', href: '/en/category/stickers/' },
        { label: 'Wedding Invitations', href: '/en/category/wedding-invitations/' },
      ],
    },
    faq: [
      { q: 'What is the minimum order for greeting card printing?', a: '100 sheets minimum. 50-sheet small batches available for design confirmation or first-time clients.' },
      { q: 'How fast can I get 3D pop-up cards?', a: 'Digital proof 24h, bulk 3-5 business days, rush 24-48h available on request.' },
      { q: 'Can I print custom designs?', a: 'Yes. AI / PSD / PDF / CDR files supported, 300dpi CMYK. Free prepress check.' },
      { q: 'What eco-friendly options are available?', a: 'FSC certified paper + soy ink + plantable seed paper (mint or alfalfa). EU/US compliance.' },
    ],
  },
  ja: {
    h2: 'グリーティングカード印刷 | 100枚から | 立体 3D ヒット商品 | DHL 2-4日配送',
    coreAdvantages: {
      title: 'ZprintPro のグリーティングカード印刷を選ぶ理由?',
      items: [
        {
          heading: '1. 全場面カバー:6 大カテゴリ、200+ SKU',
          points: [
            '祝日 / 誕生日 / サンキュ / 招待状 / 法人向け / 立体 3D カードの 6 大カテゴリ、200+ 即納 SKU。',
            '米国 70 億枚/年、90% 家庭購入。越境 EC (15 倍マージン:卸値 ¥7-12 → 小売 $14.99) + 法人 50%+ 市場シェア。',
            '立体ポップアップ (LovePop モデル 4,000 万ドル/年)、レーザーカット POP-UP、Paper Sculpture 技術 — 越境ヒット商品カテゴリ。',
          ],
        },
        {
          heading: '2. 6 大素材 + 4 大仕上げ + 30 秒 AI 見積 + 4 時間無料サンプル',
          points: [
            '6 大素材:300g コート、350g コンカラー、300g コットン、特殊金 / 銀カード、種紙 (植付可能)、立体レーザー紙。',
            '4 大仕上げ:箔押し / 銀 / 玫瑰金、スポット UV、抜型、立体 3D ポップアップ — 越境 EC 対応。',
            '米国 $99 以上送料無料 + DHL 国際 2-4 日 + FSC 認証 + ISO 9001 品質。',
          ],
        },
      ],
    },
    materialTable: {
      title: '素材と工法の詳細',
      subtitle: 'グリーティングカード常用素材と応用シーン',
      columns: ['素材タイプ', '主要特性', '適用シーン'],
      rows: [
        { material: '300g プレミアムコート紙', features: '色彩鮮明 / 光沢コーティング / 視覚的インパクト', scenarios: '標準法人カード / 大量配布' },
        { material: '350g コンカラー', features: '高克重 / 独特なテクスチャ / 高級感', scenarios: 'プレミアムブランド / 弁護士 / 会計士' },
        { material: '300g コットン紙', features: 'ソフトタッチ / エコ認証 / 上品', scenarios: 'ラグジュアリー代理 / クリエイティブ産業' },
        { material: '特殊金 / 銀カード', features: 'メタリック光沢 / 視覚的インパクト', scenarios: 'クリスマス / 新年 / 祝賀カード' },
        { material: '種紙 (FSC エコ)', features: '植付可能 (ミント / アルファルファ) / EU US 基準', scenarios: 'エコブランド / 持続可能企業' },
      ],
    },
    specialOptions: {
      title: '特殊加工オプション',
      items: [
        { name: '箔押し (金 / 銀 / 玫瑰金 / シャンパン)', description: 'メタリック光沢、瞬時の高級感、プレミアムブランド向け' },
        { name: 'スポット UV', description: 'ロゴや図案を強調、マットとの強いコントラスト' },
        { name: '立体 3D ポップアップ', description: 'ペーパースカルプチャ ポップアップ、越境ヒット商品コア技術' },
        { name: '抜型 (Die-Cut)', description: '標準矩形を超えるカスタム形状' },
        { name: '封筒セット (C5 / C6 / カスタム)', description: '郵送封筒込み、プロフェッショナルな仕上がり' },
        { name: '写真パーソナライズ', description: '写真アップロード + カスタムテキスト、恋人 / 家族向け' },
      ],
    },
    techSpecs: {
      title: '技術仕様詳細',
      items: [
        { label: '標準サイズ', value: 'A6 (105×148mm) / A5 (148×210mm) / A4 (210×297mm) / カスタム' },
        { label: '最小数量', value: '100 枚から、500 枚以上で数量割引、50 枚対応可 (小ロット試作)' },
        { label: 'サンプル時間', value: 'デジタルサンプル 24 時間 / 4 時間無料サンプル (実物配送込み)' },
        { label: '量産納期', value: '通常 3-5 営業日、緊急 24-48 時間対応可' },
        { label: 'ファイル要件', value: 'AI / PSD / PDF / CDR、300dpi、CMYK、塗りたし 3mm、文字アウトライン' },
        { label: 'エコ認証', value: 'FSC 認証 + 大豆インク + ISO 9001 + リサイクル可能' },
      ],
    },
    serviceNodes: {
      title: 'ローカル化サービスノード',
      items: [
        { title: '30 秒 AI 即時見積', description: '透明価格、隠れた料金なし' },
        { title: '4 時間無料サンプル', description: '量産前に外観と寸法を確認' },
        { title: 'DHL 国際 2-4 日', description: '190+ 国へ直接配送' },
        { title: '米国 $99 以上送料無料', description: '全米 50 州対応' },
      ],
    },
    buyingGuide: {
      title: 'グリーティングカード印刷購入ガイド',
      paragraphs: [
        'まず用途を決める:祝日ギフトは立体 3D (越境ヒット)、法人カードは箔押し 300g コンカラー、サンキュカードはコットン + スポット UV。明確な用途で素材と工法の予算が半分に。',
        '祝日カードの鍵はデザイン一貫性:クリスマス / 新年 / バレンタインカードを統一視覚言語で、リピート率 +30%。季節ごとに 3-5 テンプレート準備でデザインコスト削減推奨。',
        '越境ヒット立体 3D カード:7 日 78 万元 RMB GMV (TikTok Paper Love ケース)、小売 $14.99、卸値 ¥7-12 = 15 倍マージン。立体 3D は越境コアモート。',
        'FSC 認証 + 大豆インク + 種紙 (植付可能) の 3 大エコ卖点。EU / US 顧客は 20% プレミアム払い、ESG 調達トレンド適合。',
        '量産スイートスポット:100-500 枚デジタル (版不要)、500-5000 枚オフセット (単価 $0.07 まで圧縮可)。繁忙期 (クリスマス / バレンタイン / 母の日) は 4 週間前発注。',
      ],
      links: [
        { label: '立体 3D カード越境ガイド', href: '/ja/blog/3d-pop-up-card-guide/' },
        { label: '祝日カード印刷戦略', href: '/ja/blog/holiday-card-printing-guide/' },
        { label: 'ステッカー印刷', href: '/ja/category/stickers/' },
        { label: '結婚式招待状', href: '/ja/category/wedding-invitations/' },
      ],
    },
    faq: [
      { q: 'グリーティングカード印刷の最小注文数は?', a: '100 枚から。50 枚の小ロットもデザイン確認や初回クライアント様に可能。' },
      { q: '立体 3D カードの納期は?', a: 'デジタルサンプル 24 時間、量産 3-5 営業日、緊急 24-48 時間対応可。' },
      { q: 'オリジナルデザインに対応?', a: '対応可。AI / PSD / PDF / CDR ファイル対応、300dpi CMYK、無料でプリプレスチェック。' },
      { q: 'エコな素材は?', a: 'FSC 認証紙 + 大豆インク + 種紙 (植付後ミントやアルファルファ栽培可能)。EU / US 基準準拠。' },
    ],
  },
};

'''

# Now write the wedding-invitations and place-cards as minimal but complete content
# (to save lines, I'll create them programmatically in Python)

WEDDING_INVITATIONS = '''const weddingInvitationsContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    h2: '喜帖印刷 · 50 套起印 · 整套婚慶配套 · 燙金 / UV / 活版工艺',
    coreAdvantages: {
      title: '為何選擇智印港的喜帖印刷?',
      items: [
        {
          heading: '1. 整套婚慶配套:喜帖 + Save the Date + 感謝卡 + 節目單 + 菜單 + 席位圖',
          points: [
            '6 大件配套一站印齊,享 85 折優惠 + 免費寄樣,適合婚慶全套 / 海外婚禮 / 教堂 / 酒店婚禮。',
            '全球婚慶印刷市場 $13B+ (Bonafide 2025),喜帖 $4.29B CAGR 6.3%,是名片市場 ($1.2B) 3.5x 大。',
            '100 套以上享 9 折,200 套以上享 85 折,500 套以上免費寄樣,婚慶專屬階梯折扣。',
          ],
        },
        {
          heading: '2. 6 大經典工藝 + 5 大紙材 + 燙玫瑰金 / 活版最受歡迎',
          points: [
            '6 大工藝:燙金 (金/銀/玫瑰金/香檳金)、UV 局部、活版印刷、模切異形、雕凹壓印、貼金邊。',
            '5 大紙材:300g 棉紙 (質感首選)、350g 剛古紙、300g 銅版紙、特種金 / 銀卡紙、再生紙 (FSC)。',
            '信封配套 + 客製姓名印刷 (每套 +$0.20),適配中式喜帖 + 西式喜帖全場景。',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質工藝詳解',
      subtitle: '喜帖常用材質與應用',
      columns: ['材質類型', '關鍵特性', '適用場景'],
      rows: [
        { material: '300g 高級棉紙 (含棉纖維)', features: '質感奢華 / 觸感細膩 / 高端首選', scenarios: '高端婚禮 / 教堂 / 酒店 / 海外' },
        { material: '350g 剛古紙 / Conqueror', features: '挺括 / 紋理獨特 / 經典', scenarios: '中高端婚禮 / 品牌婚慶' },
        { material: '300g 高級銅版紙', features: '色彩鮮豔 / 表面光亮 / 經濟', scenarios: '大量派發 / 經濟型婚禮' },
        { material: '特種金 / 銀卡紙', features: '金屬光澤 / 視覺衝擊 / 奢華', scenarios: '中式喜帖 / 慶典喜帖' },
        { material: 'FSC 再生紙 (環保認證)', features: '可回收 / 環保認證 / 永續', scenarios: '環保婚禮 / 永續品牌' },
      ],
    },
    specialOptions: {
      title: '特殊加工選項',
      items: [
        { name: '燙玫瑰金 (最受歡迎)', description: '玫瑰金屬光澤,提升婚禮奢華感' },
        { name: '活版印刷 (Letterpress)', description: '傳統工藝,凹字質感,高端婚慶首選' },
        { name: 'UV 局部上光', description: '凸顯重點元素,觸感立體' },
        { name: '雕凹壓印 (Engraving)', description: '3D 壓印,質感最奢華' },
        { name: '模切異形 (Die-Cut)', description: '自定義形狀,告別標準矩形' },
        { name: '貼金邊 (Gilded Edges)', description: '頁邊金色,提升整體質感' },
        { name: '信封配套 (C5 / 自訂)', description: '郵寄信封一站搞定' },
        { name: '客製姓名印刷', description: '每套喜帖印賓客名,$0.20/套起' },
      ],
    },
    techSpecs: {
      title: '技術參數詳解',
      items: [
        { label: '標準尺寸', value: '130×190mm 標準請帖 / 190×260mm 對摺請帖 / 自訂' },
        { label: '起訂量', value: '50 套起印,100 套享 9 折,200 套享 85 折,500 套免費寄樣' },
        { label: '打樣時間', value: '數碼打樣 24 小時 / 5 天實體打樣 (含寄樣)' },
        { label: '量產交期', value: '常規 7-10 工作天,加急 5-7 天可議' },
        { label: '檔案要求', value: 'AI / PSD / PDF, 300dpi, CMYK, 出血 3mm, 文字轉外框' },
        { label: '環保認證', value: 'FSC 認證紙 + 大豆油墨 + ISO 9001 + 可回收' },
      ],
    },
    serviceNodes: {
      title: '本地化服務節點',
      items: [
        { title: '30 秒 AI 即時報價', description: '整套 6 件透明定價' },
        { title: '5 天免費打樣', description: '含實體寄送,確認工藝與色澤' },
        { title: '順豐本地配送', description: '港島九龍新界滿 HK$500 免費' },
        { title: 'DHL 全球直送', description: '2-4 天跨境直送海外婚禮場地' },
      ],
    },
    buyingGuide: {
      title: '喜帖印刷選購指南',
      paragraphs: [
        '喜帖印刷第一步先定婚禮風格:中式喜帖選燙金 + 紅色主調,西式教堂婚禮選活版 + 棉紙,海外婚禮選整套 6 件配套一站搞定。風格定得清,工藝同紙材即刻收窄。',
        '整套婚慶配套 6 大件最划算:喜帖 + Save the Date + 感謝卡 + 節目單 + 菜單 + 席位圖 = 85 折 + 免費寄樣,比單件印省 15-20%。100 套以上才享此優惠。',
        '燙玫瑰金 (rose gold) 是 2025-2026 婚慶最受歡迎工藝,搭配 UV 局部 + 雕凹壓印形成「奢華三件套」,婚禮質感提升 50%。',
        '活版印刷 (Letterpress) 仍是高端婚慶首選,凹字質感 + 棉紙組合是經典搭配。預算寬鬆首選,預算緊可選燙金 + UV 局部組合。',
        '海外婚禮 (Destination Wedding) 注意事項:喜帖需提前 8-12 星期下單,DHL 全球直送 2-4 天,留充足時間給賓客回覆 + 安排行程。',
      ],
      links: [
        { label: '婚慶整套配套指南', href: '/zh-hk/blog/wedding-suite-guide/' },
        { label: '燙金工藝詳解', href: '/zh-hk/blog/foil-stamping-guide/' },
        { label: '喜帖 vs 賀卡 vs 貼紙', href: '/zh-hk/category/greeting-cards/' },
        { label: '婚宴台卡', href: '/zh-hk/category/place-cards/' },
      ],
    },
    faq: [
      { q: '喜帖印刷最少印幾多套?', a: '50 套起印。100 套享 9 折,200 套享 85 折,500 套免費寄樣。' },
      { q: '喜帖 + 整套婚慶配套要幾錢?', a: '喜帖 $1.20/套起,整套 6 大件 $25/套起,可分開報價。' },
      { q: '燙金 / 活版邊種工藝最受歡迎?', a: '燙玫瑰金 (熱門) + UV 局部 (細節提升) + 雕凹 (質感首選) 三大組合最受歡迎。' },
      { q: '可以加印賓客姓名嗎?', a: '可以。100 套以上享客製姓名印刷,每套加收 $0.20 起。' },
    ],
  },
  en: {
    h2: 'Wedding Invitation Printing from $1.20 | Full Suite | Foil/UV/Letterpress',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Wedding Invitation Printing?',
      items: [
        {
          heading: '1. Full Wedding Suite: Invitation + Save the Date + Thank You + Program + Menu + Seating',
          points: [
            '6-piece bundle in one order, 15% off + free sample. Perfect for full wedding / destination weddings / chapels / hotel weddings.',
            'Global wedding printing market $13B+ (Bonafide 2025), invitations $4.29B CAGR 6.3% — 3.5x larger than business card market ($1.2B).',
            '100+ sets 10% off, 200+ 15% off, 500+ free sample shipping — wedding bulk discount tier.',
          ],
        },
        {
          heading: '2. 6 Signature Finishes + 5 Papers + Rose Gold Foil/Letterpress Most Popular',
          points: [
            '6 finishes: foil (gold / silver / rose gold / champagne), spot UV, letterpress, die-cut shapes, engraving embossing, gilded edges.',
            '5 papers: 300gsm cotton (premium), 350gsm Conqueror, 300gsm art, specialty gold/silver, recycled (FSC).',
            'Envelope bundling + custom name printing ($0.20/set add-on), fits Chinese + Western wedding styles.',
          ],
        },
      ],
    },
    materialTable: {
      title: 'Material & Finish Guide',
      subtitle: 'Wedding invitation materials and applications',
      columns: ['Material Type', 'Key Features', 'Best For'],
      rows: [
        { material: '300gsm Premium Cotton (Cotton Fiber)', features: 'Luxury feel / soft touch / premium', scenarios: 'Premium weddings / chapels / hotels / destination' },
        { material: '350gsm Conqueror', features: 'Sturdy / unique texture / classic', scenarios: 'Mid-high weddings / branded weddings' },
        { material: '300gsm Premium Art', features: 'Vibrant colors / glossy surface / economic', scenarios: 'Mass distribution / budget weddings' },
        { material: 'Specialty Gold / Silver Card', features: 'Metallic shine / visual impact / luxury', scenarios: 'Chinese invitations / celebration cards' },
        { material: 'FSC Recycled (Eco-Certified)', features: 'Recyclable / eco certified / sustainable', scenarios: 'Eco weddings / sustainable brands' },
      ],
    },
    specialOptions: {
      title: 'Special Processing Options',
      items: [
        { name: 'Rose Gold Foil (Most Popular)', description: 'Rose metallic shine, elevates wedding luxury' },
        { name: 'Letterpress', description: 'Traditional craft, debossed feel, premium wedding first choice' },
        { name: 'Spot UV', description: 'Highlight elements, tactile 3D feel' },
        { name: 'Engraving Embossing', description: '3D embossing, most luxurious feel' },
        { name: 'Die-Cut Shapes', description: 'Custom shapes beyond standard rectangle' },
        { name: 'Gilded Edges', description: 'Gold page edges, elevate overall feel' },
        { name: 'Envelope Bundling (C5 / Custom)', description: 'Mailing envelopes included' },
        { name: 'Custom Name Printing', description: 'Print guest name on each invitation, $0.20/set' },
      ],
    },
    techSpecs: {
      title: 'Technical Specifications',
      items: [
        { label: 'Standard Sizes', value: '5"×7" standard / 7.5"×10" folded / Custom' },
        { label: 'MOQ', value: '50 sets minimum, 100+ 10% off, 200+ 15% off, 500+ free sample' },
        { label: 'Proof Time', value: 'Digital proof 24h / 5-day physical proof (with sample shipping)' },
        { label: 'Production Lead Time', value: 'Standard 7-10 business days, rush 5-7 days' },
        { label: 'File Requirements', value: 'AI / PSD / PDF, 300dpi, CMYK, 3mm bleed, outlined text' },
        { label: 'Eco Certifications', value: 'FSC certified + soy ink + ISO 9001 + recyclable' },
      ],
    },
    serviceNodes: {
      title: 'Localized Service Nodes',
      items: [
        { title: '30s AI Instant Quote', description: '6-piece suite transparent pricing' },
        { title: '5-Day Free Proof', description: 'Physical sample shipping, confirm craft and color' },
        { title: 'Free Shipping >$99', description: 'USA-wide delivery' },
        { title: 'DHL Express Global', description: '2-4 day direct shipping to overseas wedding venues' },
      ],
    },
    buyingGuide: {
      title: 'Wedding Invitation Printing Buying Guide',
      paragraphs: [
        'First, define wedding style: Chinese invitation choose foil + red theme, Western chapel choose letterpress + cotton, destination wedding choose full 6-piece suite. Clear style cuts craft and paper choices in half.',
        'Full wedding suite 6-piece bundle is most cost-effective: invitation + Save the Date + thank you + program + menu + seating chart = 15% off + free sample, saving 15-20% vs single items. Available for 100+ sets only.',
        'Rose gold foil is the 2025-2026 wedding most popular finish. Combined with spot UV + engraving embossing, the "luxury trio" elevates wedding feel by 50%.',
        'Letterpress remains premium wedding first choice: debossed feel + cotton paper is the classic combination. Budget-flexible first pick; budget-tight choose foil + spot UV combo.',
        'Destination wedding notes: invitations need 8-12 weeks lead time, DHL 2-4 day global delivery, leave enough time for guest RSVPs and travel arrangements.',
      ],
      links: [
        { label: 'Full Wedding Suite Guide', href: '/en/blog/wedding-suite-guide/' },
        { label: 'Foil Stamping Details', href: '/en/blog/foil-stamping-guide/' },
        { label: 'Invitations vs Greeting Cards vs Stickers', href: '/en/category/greeting-cards/' },
        { label: 'Wedding Place Cards', href: '/en/category/place-cards/' },
      ],
    },
    faq: [
      { q: 'What is the minimum order for wedding invitations?', a: '50 sets minimum. 100+ gets 10% off, 200+ 15% off, 500+ free sample shipping.' },
      { q: 'How much is a full wedding suite?', a: 'Invitations from $1.20/set, full 6-piece suite from $25/set. Itemized quote available.' },
      { q: 'Which finishes are most popular for weddings?', a: 'Rose gold foil + spot UV + engraving embossing — the 3-finish signature combo.' },
      { q: 'Can I add guest names to each invitation?', a: 'Yes. 100+ sets get custom name printing at $0.20/set add-on.' },
    ],
  },
  ja: {
    h2: '結婚式招待状印刷 | 50セットから | フルセット | 箔押し/UV/活版',
    coreAdvantages: {
      title: 'ZprintPro の結婚式招待状印刷を選ぶ理由?',
      items: [
        {
          heading: '1. フル結婚セット:招待状 + Save the Date + サンキュー + のしおり + メニュー + 座席表',
          points: [
            '6 点セット一括注文、15%OFF + 無料サンプル。フル結婚 / destination wedding / チャペル / ホテル結婚式に最適。',
            '世界結婚印刷市場 $13B+ (Bonafide 2025)、招待状 $4.29B CAGR 6.3% — 名刺市場 ($1.2B) の 3.5 倍。',
            '100 セット以上 10%OFF、200 セット以上 15%OFF、500 セット以上無料サンプル配送 — 結婚数量割引。',
          ],
        },
        {
          heading: '2. 6 大仕上げ + 5 大紙素材 + ローズゴールド箔押し/活版が最も人気',
          points: [
            '6 仕上げ:箔押し (金 / 銀 / 玫瑰金 / シャンパン)、スポット UV、活版印刷、抜型、エングレービング エンボス、金縁。',
            '5 紙素材:300g コットン (プレミアム)、350g コンカラー、300g コート、特殊金 / 銀、再生紙 (FSC)。',
            '封筒セット + ゲスト名印刷 ($0.20/セット追加)、中式 + 西式結婚式スタイル対応。',
          ],
        },
      ],
    },
    materialTable: {
      title: '素材と工法の詳細',
      subtitle: '結婚式招待状常用素材と応用',
      columns: ['素材タイプ', '主要特性', '適用シーン'],
      rows: [
        { material: '300g プレミアムコットン (コットン繊維)', features: '高級感 / ソフトタッチ / プレミアム', scenarios: 'プレミアム結婚式 / チャペル / ホテル / destination' },
        { material: '350g コンカラー', features: '堅牢 / 独特テクスチャ / クラシック', scenarios: '中〜高級結婚式 / ブランド結婚' },
        { material: '300g プレミアムコート', features: '色彩鮮明 / 光沢表面 / 経済的', scenarios: '大量配布 / 予算結婚式' },
        { material: '特殊金 / 銀カード', features: 'メタリック光沢 / 視覚インパクト', scenarios: '中式招待状 / 慶祝カード' },
        { material: 'FSC 再生紙 (エコ認証)', features: 'リサイクル可能 / エコ認証 / 持続可能', scenarios: 'エコ結婚式 / 持続可能ブランド' },
      ],
    },
    specialOptions: {
      title: '特殊加工オプション',
      items: [
        { name: 'ローズゴールド箔押し (最も人気)', description: 'ローズメタリック光沢、結婚の高級感向上' },
        { name: '活版印刷 (Letterpress)', description: '伝統工芸、凹字触感、プレミアム結婚第一選択' },
        { name: 'スポット UV', description: '要素強調、触感的 3D 感' },
        { name: 'エングレービング エンボス', description: '3D エンボス、最高級感' },
        { name: '抜型 (Die-Cut)', description: '標準矩形を超えるカスタム形状' },
        { name: '金縁 (Gilded Edges)', description: 'ページ縁金色、全体感向上' },
        { name: '封筒セット (C5 / カスタム)', description: '郵送封筒込み' },
        { name: 'ゲスト名印刷', description: '各招待状にゲスト名印刷、$0.20/セット' },
      ],
    },
    techSpecs: {
      title: '技術仕様詳細',
      items: [
        { label: '標準サイズ', value: '130×190mm 標準 / 190×260mm 折 / カスタム' },
        { label: '最小数量', value: '50 セットから、100+ 10%OFF、200+ 15%OFF、500+ 無料サンプル' },
        { label: 'サンプル時間', value: 'デジタルサンプル 24 時間 / 5 日実物サンプル (配送込み)' },
        { label: '量産納期', value: '通常 7-10 営業日、緊急 5-7 日対応可' },
        { label: 'ファイル要件', value: 'AI / PSD / PDF、300dpi、CMYK、塗りたし 3mm、文字アウトライン' },
        { label: 'エコ認証', value: 'FSC 認証 + 大豆インク + ISO 9001 + リサイクル可能' },
      ],
    },
    serviceNodes: {
      title: 'ローカル化サービスノード',
      items: [
        { title: '30 秒 AI 即時見積', description: '6 点セット透明価格' },
        { title: '5 日無料サンプル', description: '実物配送込み、工法と色を確認' },
        { title: 'DHL 国際 2-4 日', description: '海外結婚式会場へ直接配送' },
        { title: '米国 $99 以上送料無料', description: '全米 50 州対応' },
      ],
    },
    buyingGuide: {
      title: '結婚式招待状印刷購入ガイド',
      paragraphs: [
        'まず結婚式スタイルを決める:中式招待状は箔押し + 赤テーマ、西式チャペルは活版 + コットン、destination wedding はフル 6 点セット。明確なスタイルで工法と紙素材が半分に。',
        'フル結婚セット 6 点がお得:招待状 + Save the Date + サンキュー + のしおり + メニュー + 座席表 = 15%OFF + 無料サンプル、単品より 15-20% 節約。100 セット以上限定。',
        'ローズゴールド箔押しが 2025-2026 結婚で最も人気。スポット UV + エングレービング エンボスとの「高級 3 点セット」で結婚感 50% 向上。',
        '活版印刷は依然としてプレミアム結婚第一選択:凹字触感 + コットン紙がクラシック組み合わせ。予算柔軟なら第一選択、予算厳しいなら箔押し + スポット UV 組み合わせ。',
        'Destination wedding 注意点:招待状は 8-12 週間前発注、DHL 2-4 日国際配送、ゲスト RSVP と旅行手配に十分時間を残す。',
      ],
      links: [
        { label: 'フル結婚セットガイド', href: '/ja/blog/wedding-suite-guide/' },
        { label: '箔押し詳細', href: '/ja/blog/foil-stamping-guide/' },
        { label: '招待状 vs グリーティングカード vs ステッカー', href: '/ja/category/greeting-cards/' },
        { label: '披露宴席札', href: '/ja/category/place-cards/' },
      ],
    },
    faq: [
      { q: '結婚式招待状の最小注文数は?', a: '50 セットから。100+ 10%OFF、200+ 15%OFF、500+ 無料サンプル配送。' },
      { q: 'フル結婚セットの価格は?', a: '招待状 $1.20/セットから、フル 6 点セット $25/セットから。項目別見積可。' },
      { q: '結婚で最も人気の仕上げは?', a: 'ローズゴールド箔押し + スポット UV + エングレービング の 3 点仕上げシグネチャー コンボ。' },
      { q: 'ゲスト名の個別印刷は可能?', a: '可能。100+ セットでゲスト名印刷対応、$0.20/セット追加。' },
    ],
  },
};

'''

PLACE_CARDS = '''const placeCardsContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    h2: '台卡 / 酒水牌 / 座位卡印刷 · 50 張起印 · 5 大場景全覆蓋',
    coreAdvantages: {
      title: '為何選擇智印港的台卡 / 酒水牌印刷?',
      items: [
        {
          heading: '1. 5 大場景全覆蓋:婚宴 + 餐廳 + 咖啡廳 + 會議 + 展會',
          points: [
            '一張起印多場景適用,適配婚宴餐桌 / 餐廳台卡 / 咖啡廳台卡 / 會議名牌 / 展會名牌。',
            '全球婚宴台卡 $123M (6.98% of Wedding Stationery $1.76B 2025, CAGR 4.5%),跨婚慶 + 餐飲 + 商務全場景。',
            'A8 / A7 / A6 多尺寸 + 自訂折卡,50 張起印小批量友好,適合初創餐廳 / 個人活動。',
          ],
        },
        {
          heading: '2. 6 種工藝 + 5 種材質 + 磁鐵背貼 / 防水 PVC 全場景適配',
          points: [
            '6 工藝:燙金 / UV / 壓紋 / 模切 / 折卡 / 圓角,適配高端商務與婚宴質感。',
            '5 材質:300g 銅版紙、350g 黑卡、特種金 / 銀卡、再生紙、PVC 透明卡 (防水耐用,適合戶外婚宴)。',
            '磁鐵背貼 (3M 強力膠, 可重複使用) 或打孔掛繩,會議名牌 / 展會名牌最方便。',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質工藝詳解',
      subtitle: '台卡 / 酒水牌常用材質與應用',
      columns: ['材質類型', '關鍵特性', '適用場景'],
      rows: [
        { material: '300g 高級銅版紙', features: '色彩鮮豔 / 表面光亮 / 經濟', scenarios: '餐廳台卡 / 咖啡廳台卡 / 大量派發' },
        { material: '350g 高級黑卡紙', features: '高檔底色 / 金屬光澤 / 視覺衝擊', scenarios: '高端商務 / 婚宴台卡 / 米其林餐廳' },
        { material: '特種金 / 銀卡紙', features: '金屬光澤 / 高端首選 / 視覺奢華', scenarios: '婚宴席位卡 / 喜帖配套 / 高端宴會' },
        { material: 'FSC 再生紙 (環保)', features: '可回收 / 環保認證 / 永續', scenarios: '環保活動 / 永續品牌' },
        { material: '0.5mm 厚透明 PVC 卡', features: '防水 / 耐用 / 戶外適用 / 圓角', scenarios: '泳池派對 / 戶外婚宴 / 飲品標記' },
      ],
    },
    specialOptions: {
      title: '特殊加工選項',
      items: [
        { name: '燙金 (金 / 銀 / 玫瑰金)', description: '金屬光澤,提升婚宴 / 餐廳質感' },
        { name: 'UV 局部上光', description: '凸顯重點元素,觸感立體' },
        { name: '壓紋 (Embossing)', description: '立體壓印,質感奢華' },
        { name: '模切異形 (Die-Cut)', description: '支持圓形 / 心形 / 自訂形狀' },
        { name: '折卡 (V 折 / 對摺)', description: '站立式台卡,平放可折疊' },
        { name: '磁鐵背貼 (3M 強力膠)', description: '可重複使用,會議名牌首選' },
        { name: '打孔掛繩', description: '展會名牌 / 員工證配套' },
        { name: '圓角 / 倒角', description: '安全美觀,適合兒童活動' },
      ],
    },
    techSpecs: {
      title: '技術參數詳解',
      items: [
        { label: '標準尺寸', value: 'A8 (52×74mm) / A7 (74×105mm) / A6 (105×148mm) / 自訂' },
        { label: '起訂量', value: '50 張起印,200 張享批量折扣,100 張享 9 折' },
        { label: '打樣時間', value: '數碼打樣 24 小時 / 4 小時免費打樣 (含實物寄送)' },
        { label: '量產交期', value: '常規 3-5 工作天,加急 24-48 小時可議' },
        { label: '檔案要求', value: 'AI / PSD / PDF, 300dpi, CMYK, 出血 3mm, 文字轉外框' },
        { label: '特殊材質', value: 'PVC 卡 0.5mm 厚,圓角可選,UV 防水層可選' },
      ],
    },
    serviceNodes: {
      title: '本地化服務節點',
      items: [
        { title: '30 秒 AI 即時報價', description: '50 張起印小批量友好' },
        { title: '4 小時免費打樣', description: '確認尺寸與材質無誤' },
        { title: '順豐本地配送', description: '港島九龍新界滿 HK$500 免費' },
        { title: 'DHL 全球直送', description: '2-4 天跨境直送海外婚宴場地' },
      ],
    },
    buyingGuide: {
      title: '台卡 / 酒水牌印刷選購指南',
      paragraphs: [
        '台卡 / 酒水牌 / 座位卡三者常成套印,先理清用途:婚宴選整套 (台卡 + 座位卡 + 酒水牌),餐廳選 PVC 防水材質,會議選磁鐵背貼。',
        '婚宴 6 大場景一站印齊:台卡 + 酒水牌 + 座位卡 + 席位圖 + 感謝卡 + 喜帖 = 整套婚慶配套,享 15% 折扣。建議提前 4 星期下單。',
        '餐廳 / 咖啡廳場景:0.5mm 厚 PVC 透明卡防水耐用,適合戶外 / 泳池 / 油漬場景。模切圓角避免割手,UV 防水層防褪色。',
        '會議 / 展會名牌:磁鐵背貼 (3M 強力膠) 比打孔掛繩更實用,可重複使用不留殘膠。員工證 + 訪客證 + VIP 證分色設計,易識別。',
        '預算甜蜜點:50-200 張走數碼印刷免製版,200 張以上走柯式印刷單價更低。台卡 / 酒水牌常用 300g 銅版紙 + UV 局部,性價比最高。',
      ],
      links: [
        { label: '婚宴台卡設計指南', href: '/zh-hk/blog/wedding-place-card-guide/' },
        { label: 'PVC 透明卡印刷', href: '/zh-hk/blog/pvc-card-printing-guide/' },
        { label: '喜帖印刷', href: '/zh-hk/category/wedding-invitations/' },
        { label: '賀卡印刷', href: '/zh-hk/category/greeting-cards/' },
      ],
    },
    faq: [
      { q: '台卡 / 酒水牌最少印幾多張?', a: '50 張起印。100 張享 9 折,300 張享 85 折。' },
      { q: '酒水牌 vs 台卡 vs 座位卡有咩分別?', a: '台卡 = 餐桌名稱,酒水牌 = 賓客標記飲品,座位卡 = 賓客標記座位。三者常成套印。' },
      { q: '可以用 PVC 透明卡印酒水牌嗎?', a: '可以。0.5mm 厚 PVC 透明卡,防水耐用,適合戶外婚宴及泳池派對。' },
      { q: '名牌卡可以加磁鐵背貼嗎?', a: '可以。磁鐵背貼 3M 強力膠,適合會議名牌 / 展會名牌,可重複使用。' },
    ],
  },
  en: {
    h2: 'Place Card / Drink Token / Escort Card Printing from $0.30 | 50 MOQ | 5 Scenarios',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Place Card / Drink Token Printing?',
      items: [
        {
          heading: '1. 5-Scenario Coverage: Wedding + Restaurant + Café + Conference + Event',
          points: [
            'One card fits all scenarios: wedding tables / restaurant table cards / café table cards / conference badges / event name tags.',
            'Global wedding place cards $123M (6.98% of Wedding Stationery $1.76B 2025, CAGR 4.5%) — covers wedding + catering + commercial full-scenario.',
            'A8 / A7 / A6 multi-size + custom folded cards. 50 MOQ friendly for small batches — perfect for startup restaurants / personal events.',
          ],
        },
        {
          heading: '2. 6 Finishes + 5 Materials + Magnetic Back / Waterproof PVC',
          points: [
            '6 finishes: foil / UV / embossing / die-cut / folded / rounded corners — for premium weddings and corporate events.',
            '5 materials: 300gsm art, 350gsm black card, specialty gold/silver, recycled paper, clear PVC (waterproof durable for outdoor weddings).',
            'Magnetic back (3M strong adhesive, reusable) or lanyard hole punch — best for conference badges / event name tags.',
          ],
        },
      ],
    },
    materialTable: {
      title: 'Material & Finish Guide',
      subtitle: 'Place card / drink token materials and applications',
      columns: ['Material Type', 'Key Features', 'Best For'],
      rows: [
        { material: '300gsm Premium Art', features: 'Vibrant colors / glossy surface / economic', scenarios: 'Restaurant / café table cards / mass distribution' },
        { material: '350gsm Premium Black Card', features: 'Premium base / metallic shine / visual impact', scenarios: 'High-end corporate / wedding / Michelin restaurants' },
        { material: 'Specialty Gold / Silver Card', features: 'Metallic shine / premium first pick / luxury', scenarios: 'Wedding escort cards / invitation bundles / high-end banquets' },
        { material: 'FSC Recycled (Eco)', features: 'Recyclable / eco certified / sustainable', scenarios: 'Eco events / sustainable brands' },
        { material: '0.5mm Thick Clear PVC', features: 'Waterproof / durable / outdoor / rounded corners', scenarios: 'Pool parties / outdoor weddings / beverage markers' },
      ],
    },
    specialOptions: {
      title: 'Special Processing Options',
      items: [
        { name: 'Foil Stamping (Gold / Silver / Rose Gold)', description: 'Metallic shine, elevate wedding / restaurant feel' },
        { name: 'Spot UV', description: 'Highlight elements, tactile 3D feel' },
        { name: 'Embossing', description: '3D relief, luxury feel' },
        { name: 'Die-Cut Shapes', description: 'Circle / heart / custom shapes' },
        { name: 'Folded (V-Fold / Bi-Fold)', description: 'Standing table card, flat foldable' },
        { name: 'Magnetic Back (3M Strong Adhesive)', description: 'Reusable, conference badge first pick' },
        { name: 'Lanyard Hole Punch', description: 'Exhibition badges / employee ID' },
        { name: 'Rounded Corners / Bevel', description: 'Safe and beautiful, perfect for kid events' },
      ],
    },
    techSpecs: {
      title: 'Technical Specifications',
      items: [
        { label: 'Standard Sizes', value: 'A8 (2"×3") / A7 (3"×4") / A6 (4"×6") / Custom' },
        { label: 'MOQ', value: '50 sheets minimum, 200+ bulk discount, 100+ 10% off' },
        { label: 'Proof Time', value: 'Digital proof 24h / 4h free proof (with physical sample shipping)' },
        { label: 'Production Lead Time', value: 'Standard 3-5 business days, rush 24-48h available' },
        { label: 'File Requirements', value: 'AI / PSD / PDF, 300dpi, CMYK, 3mm bleed, outlined text' },
        { label: 'Special Materials', value: 'PVC card 0.5mm thick, rounded corners optional, UV waterproof optional' },
      ],
    },
    serviceNodes: {
      title: 'Localized Service Nodes',
      items: [
        { title: '30s AI Instant Quote', description: '50 MOQ small batch friendly' },
        { title: '4-Hour Free Proof', description: 'Confirm size and material before bulk production' },
        { title: 'Free Shipping >$99', description: 'USA-wide delivery' },
        { title: 'DHL Express Global', description: '2-4 day direct shipping to overseas wedding venues' },
      ],
    },
    buyingGuide: {
      title: 'Place Card / Drink Token Printing Buying Guide',
      paragraphs: [
        'Place card / drink token / escort card are usually printed as a set. First define use: wedding choose full set (place card + escort card + drink token), restaurant choose waterproof PVC, conference choose magnetic back.',
        'Wedding 6-scenario one-stop print: place card + drink token + escort card + seating chart + thank you card + invitation = full wedding suite, 15% off. Order 4 weeks ahead.',
        'Restaurant / café scenarios: 0.5mm thick clear PVC waterproof durable, suitable for outdoor / pool / oil-splash scenarios. Die-cut rounded corners to prevent cuts, UV waterproof layer prevents fading.',
        'Conference / exhibition badges: magnetic back (3M strong adhesive) more practical than lanyard hole punch, reusable no residue. Color-coded employee + visitor + VIP for easy identification.',
        'Budget sweet spot: 50-200 sheets digital (no plate), 200+ offset (lower unit price). Place cards / drink tokens most cost-effective with 300gsm art + spot UV.',
      ],
      links: [
        { label: 'Wedding Place Card Design Guide', href: '/en/blog/wedding-place-card-guide/' },
        { label: 'Clear PVC Card Printing', href: '/en/blog/pvc-card-printing-guide/' },
        { label: 'Wedding Invitations', href: '/en/category/wedding-invitations/' },
        { label: 'Greeting Cards', href: '/en/category/greeting-cards/' },
      ],
    },
    faq: [
      { q: 'What is the minimum order for place card / drink token printing?', a: '50 sheets minimum. 100 gets 10% off, 300 gets 15% off.' },
      { q: 'What is the difference between place card, drink token, and escort card?', a: 'Place card = table name, drink token = guest drink marker, escort card = guest seat marker. Often printed as a set.' },
      { q: 'Can I use clear PVC for drink tokens?', a: 'Yes. 0.5mm clear PVC, waterproof and durable — ideal for outdoor weddings and pool parties.' },
      { q: 'Can name tags have a magnetic back?', a: 'Yes. 3M strong adhesive magnetic back, suitable for conference badges and event name tags, reusable.' },
    ],
  },
  ja: {
    h2: '席札 / ドリンクトークン印刷 | 50枚から | 5 場面カバー',
    coreAdvantages: {
      title: 'ZprintPro の席札 / ドリンクトークン印刷を選ぶ理由?',
      items: [
        {
          heading: '1. 5 場面フルカバー:ウエディング + レストラン + カフェ + 会議 + イベント',
          points: [
            '1 枚で多場面対応:披露宴テーブル / レストラン席札 / カフェ席札 / 会議バッジ / イベント名札。',
            '世界披露宴席札 $123M (Wedding Stationery $1.76B の 6.98% 2025, CAGR 4.5%) — 結婚 + 飲食 + 商用フル場面カバー。',
            'A8 / A7 / A6 マルチサイズ + カスタム折カード。50 枚から小ロット対応 — スタートアップ レストラン / 個人イベントに最適。',
          ],
        },
        {
          heading: '2. 6 仕上げ + 5 素材 + マグネット裏 / 防水 PVC',
          points: [
            '6 仕上げ:箔押し / UV / エンボス / 抜型 / 折カード / 角丸 — 高級ウエディングと法人イベント向け。',
            '5 素材:300g コート、350g 黒カード、特殊金 / 銀カード、再生紙、透明 PVC (防水耐久、屋外結婚式向け)。',
            'マグネット裏 (3M 強力粘着、再利用可能) またはストラップ穴あけ — 会議バッジ / イベント名札に最適。',
          ],
        },
      ],
    },
    materialTable: {
      title: '素材と工法の詳細',
      subtitle: '席札 / ドリンクトークン常用素材と応用',
      columns: ['素材タイプ', '主要特性', '適用シーン'],
      rows: [
        { material: '300g プレミアムコート', features: '色彩鮮明 / 光沢表面 / 経済的', scenarios: 'レストラン / カフェ席札 / 大量配布' },
        { material: '350g プレミアム黒カード', features: '高級ベース / メタリック光沢 / 視覚インパクト', scenarios: '高級法人 / ウエディング / ミシュラン レストラン' },
        { material: '特殊金 / 銀カード', features: 'メタリック光沢 / プレミアム第一選択', scenarios: '披露宴エスコート / 招待状セット / 高級宴会' },
        { material: 'FSC 再生紙 (エコ)', features: 'リサイクル可能 / エコ認証 / 持続可能', scenarios: 'エコイベント / 持続可能ブランド' },
        { material: '0.5mm 厚透明 PVC', features: '防水 / 耐久 / 屋外 / 角丸', scenarios: 'プール パーティ / 屋外結婚式 / 飲み物マーカー' },
      ],
    },
    specialOptions: {
      title: '特殊加工オプション',
      items: [
        { name: '箔押し (金 / 銀 / 玫瑰金)', description: 'メタリック光沢、結婚式 / レストラン感向上' },
        { name: 'スポット UV', description: '要素強調、触感的 3D 感' },
        { name: 'エンボス', description: '3D レリーフ、高級感' },
        { name: '抜型 (Die-Cut)', description: '円形 / ハート / カスタム形状' },
        { name: '折カード (V 折 / 両折)', description: 'スタンド式席札、平置きの折りたたみ可能' },
        { name: 'マグネット裏 (3M 強力粘着)', description: '再利用可能、会議バッジ第一選択' },
        { name: 'ストラップ穴あけ', description: '展示会バッジ / 社員証' },
        { name: '角丸 / 面取り', description: '安全で美しい、子供向けイベントに最適' },
      ],
    },
    techSpecs: {
      title: '技術仕様詳細',
      items: [
        { label: '標準サイズ', value: 'A8 (52×74mm) / A7 (74×105mm) / A6 (105×148mm) / カスタム' },
        { label: '最小数量', value: '50 枚から、200 枚以上で数量割引、100 枚で 10%OFF' },
        { label: 'サンプル時間', value: 'デジタルサンプル 24 時間 / 4 時間無料サンプル (実物配送込み)' },
        { label: '量産納期', value: '通常 3-5 営業日、緊急 24-48 時間対応可' },
        { label: 'ファイル要件', value: 'AI / PSD / PDF、300dpi、CMYK、塗りたし 3mm、文字アウトライン' },
        { label: '特殊素材', value: 'PVC カード 0.5mm 厚、角丸オプション、UV 防水層オプション' },
      ],
    },
    serviceNodes: {
      title: 'ローカル化サービスノード',
      items: [
        { title: '30 秒 AI 即時見積', description: '50 枚から小ロット対応' },
        { title: '4 時間無料サンプル', description: 'サイズと素材を確認' },
        { title: 'DHL 国際 2-4 日', description: '海外結婚式会場へ直接配送' },
        { title: '米国 $99 以上送料無料', description: '全米 50 州対応' },
      ],
    },
    buyingGuide: {
      title: '席札 / ドリンクトークン印刷購入ガイド',
      paragraphs: [
        '席札 / ドリンクトークン / エスコートカードは通常セット印刷。まず用途を決める:結婚式はフルセット (席札 + エスコート + ドリンクトークン)、レストランは防水 PVC、会議はマグネット裏。',
        '結婚式 6 場面ワンストップ印刷:席札 + ドリンクトークン + エスコート + 座席表 + サンキュー + 招待状 = フル結婚セット、15%OFF。4 週間前発注推奨。',
        'レストラン / カフェ場面:0.5mm 厚透明 PVC 防水耐久、屋外 / プール / 油跳ね場面対応。抜型角丸で切り傷防止、UV 防水層で色褪せ防止。',
        '会議 / 展示会バッジ:マグネット裏 (3M 強力粘着) がストラップ穴あけより実用的、跡残らず再利用可能。社員証 + 来場者証 + VIP 証を色分け識別。',
        '予算スイートスポット:50-200 枚デジタル (版不要)、200+ オフセット (単価低い)。席札 / ドリンクトークンは 300g コート + スポット UV がコスパ最高。',
      ],
      links: [
        { label: '披露宴席札デザインガイド', href: '/ja/blog/wedding-place-card-guide/' },
        { label: '透明 PVC カード印刷', href: '/ja/blog/pvc-card-printing-guide/' },
        { label: '結婚式招待状', href: '/ja/category/wedding-invitations/' },
        { label: 'グリーティングカード', href: '/ja/category/greeting-cards/' },
      ],
    },
    faq: [
      { q: '席札 / ドリンクトークンの最小注文数は?', a: '50 枚から。100 枚 10%OFF、300 枚 15%OFF。' },
      { q: '席札 / ドリンクトークン / エスコートカードの違いは?', a: '席札 = テーブル名表示、ドリンクトークン = ゲスト飲み物表示、エスコートカード = ゲスト席表示。セットで印刷されることが多いです。' },
      { q: 'ドリンクトークンに透明 PVC は使えますか?', a: '使えます。0.5mm 厚透明 PVC、防水耐久、屋外ウエディングやプール パーティに最適。' },
      { q: '名札にマグネット裏貼りは可能?', a: '可能。3M 強力粘着マグネット裏、会議バッジ / イベント名札向け、繰り返し使用可能。' },
    ],
  },
};

'''

# Insert before the final `export const categorySeoContent: CategorySeoData = {`
marker = "export const categorySeoContent: CategorySeoData = {"
if marker not in src:
    raise Exception(f"Could not find marker: {marker}")

pos = src.find(marker)

new_content = GREETING_CARDS + WEDDING_INVITATIONS + PLACE_CARDS
new_src = src[:pos] + new_content + src[pos:]

# Now update the map at the end to include 3 new keys
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
    raise Exception("Map pattern not found - manual edit needed")

with open(CONTENT_FILE, 'w', encoding='utf-8') as f:
    f.write(new_src)

print(f"Updated {CONTENT_FILE}")
print(f"Old size: {len(src)}, New size: {len(new_src)}")
print(f"Added {len(new_src)-len(src)} bytes")
