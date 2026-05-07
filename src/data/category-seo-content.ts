/**
 * Category SEO Content — 分类页极致 SEO + GEO 内容数据
 * 13 分类 × 3 语言，覆盖核心优势、材质工艺、技术参数、服务节点、FAQ
 * 基于竞争对手分析 + 行业数据 + 客户痛点 + 长尾关键词研究
 */

export interface CoreAdvantage {
  heading: string;
  points: string[];
}

export interface MaterialRow {
  material: string;
  features: string;
  scenarios: string;
}

export interface SpecialOption {
  name: string;
  description: string;
}

export interface TechSpec {
  label: string;
  value: string;
}

export interface ServiceNode {
  title: string;
  description: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface CategoryLocaleContent {
  h2: string;
  coreAdvantages: {
    title: string;
    items: CoreAdvantage[];
  };
  materialTable: {
    title: string;
    subtitle: string;
    columns: [string, string, string];
    rows: MaterialRow[];
  };
  specialOptions: {
    title: string;
    items: SpecialOption[];
  };
  techSpecs: {
    title: string;
    items: TechSpec[];
  };
  serviceNodes: {
    title: string;
    items: ServiceNode[];
  };
  buyingGuide: {
    title: string;
    paragraphs: string[];
  };
  faq: FaqItem[];
}

export type CategorySeoData = Record<string, {
  'zh-hk'?: CategoryLocaleContent;
  en?: CategoryLocaleContent;
  ja?: CategoryLocaleContent;
}>;

// =============================================================================
// 1. PACKAGING — 包裝盒定制
// =============================================================================
const packagingContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    h2: '香港包裝盒定制印刷 — 100個起訂，免費刀模設計，3天交貨',
    coreAdvantages: {
      title: '核心競爭優勢',
      items: [
        {
          heading: '1. 全材質全場景覆蓋：從電商彩盒到藥品合規箱，一盒解決所有包裝需求',
          points: [
            '提供定製彩盒、瓦楞紙箱、磁吸化妝品盒、FSC 環保盒、節慶禮盒、喜糖盒等 10 大專業系列，全面滿足「包裝盒印刷」、「紙盒訂製」、「包裝盒訂製」、「紙盒印刷」、「包裝印刷」及「禮盒印刷」等多元需求',
            '支援食品級紙材、HK 衛生署標準、出口包裝、QR 追蹤碼、防潮處理，符合法規與跨境要求',
            '適用於電商物流、美妝品牌、食品禮盒、藥品保健品、婚禮伴手禮、企業贈品等多元場景',
          ],
        },
        {
          heading: '2. 小批量 + 快速交貨，降低庫存風險與上市週期',
          points: [
            '最低 30–50 個起印（婚禮／彩盒款），100 個起（常規款），適合初創品牌試產',
            '3 天出貨（常規），2 天快印（緊急訂單），深圳工廠直發 | 全港順豐速遞，無需海運等待',
            '單價低至 HK$0.8 起，經濟實惠，無需大量囤貨',
          ],
        },
        {
          heading: '3. 高端工藝 + 免費設計支援，提升開箱體驗與品牌價值',
          points: [
            '支援燙金／燙銀、UV 凸字、局部塗層、窗口設計、絲帶孔位等高級工藝',
            '提供免費打樣＋專業設計建議，確認結構與美觀度後再批量生產',
            '可加 QR Code 追蹤碼，實現產品溯源與互動行銷',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質工藝詳解',
      subtitle: '包裝盒常用材質與應用',
      columns: ['材質類型', '關鍵特性', '適用場景'],
      rows: [
        { material: '高級彩盒（白卡／銅版紙）', features: '300–350g｜支援燙金／UV｜色彩鮮豔', scenarios: '美妝｜禮品｜婚禮喜糖｜企業贈品' },
        { material: '瓦楞紙箱（E/F 坑）', features: '工業級強度｜可定制尺寸｜支援出口標準', scenarios: '電商物流｜跨境倉儲｜批發包裝' },
        { material: 'FSC 認證環保紙', features: '可降解｜無塑化劑｜綠色認證', scenarios: '永續品牌｜有機食品｜環保企業' },
        { material: '食品級／防潮紙材', features: '符合食品安全｜防潮處理｜可加 QR 碼', scenarios: '烘焙食品｜保健品｜中藥包裝' },
        { material: '磁吸／抽屜結構盒', features: '高檔結構｜可燙銀 LOGO｜重複使用', scenarios: '香水｜護膚品｜高端美妝' },
      ],
    },
    specialOptions: {
      title: '特殊加工選項',
      items: [
        { name: '燙金／燙銀', description: 'LOGO 或圖案局部金屬光澤，奢華感立現' },
        { name: 'UV 局部上光', description: '凸顯重點元素，觸感立體' },
        { name: '窗口設計', description: '透明 PVC 或鏤空，展示內裝產品（中秋禮盒首選）' },
        { name: '絲帶孔位', description: '方便綁緞帶，提升禮贈儀式感' },
        { name: 'QR Code 追蹤碼', description: '支援批次管理、防偽驗證或連結官網' },
        { name: '圓角／異形裁切', description: '婚禮或兒童產品專用，安全美觀' },
      ],
    },
    techSpecs: {
      title: '技術參數詳解',
      items: [
        { label: '尺寸範圍', value: '完全客製化，常見如 10×10×5cm（彩盒）、30×20×15cm（瓦楞箱）' },
        { label: '起訂量', value: '30 個起（婚禮喜糖盒）、50 個起（彩盒）、100–200 個起（常規／工業款）' },
        { label: '交期', value: '常規 3 天出貨；快印款 2 天交付；打樣當日完成' },
        { label: '檔案要求', value: 'AI / PDF（CMYK，300dpi，含刀模線），我們提供免費刀模設計' },
        { label: '結構測試', value: '瓦楞箱可進行抗壓／跌落測試，確保物流安全' },
      ],
    },
    serviceNodes: {
      title: '本地化服務節點',
      items: [
        { title: '旺角打樣中心', description: '可預約查看實物樣本（燙金效果、紙質手感、結構強度）' },
        { title: '免費打樣服務', description: '確認外觀與結構無誤後再批量生產，避免 costly 錯誤' },
        { title: '全港配送', description: '小批量順豐寄送，大批量安排貨車直送倉庫或辦公室' },
      ],
    },
    buyingGuide: {
      title: '包裝盒選購指南',
      paragraphs: [
        '選擇包裝盒時，首先要明確產品的用途和目標受眾。電商產品需要耐摔的瓦楞紙箱；美妝品牌適合高級感的白卡彩盒；食品則必須使用食品級材質並通過相關認證。',
        '其次考慮預算和數量。小批量試產可選擇數碼印刷的彩盒（50 個起），大批量生產則建議使用柯式印刷以降低成本。我們的專業顧問可根據您的預算和時間要求，推薦最合適的方案。',
        '最後，不要忽略設計細節。一個好的包裝設計應該在 3 秒內傳達品牌信息。我們提供免費設計諮詢，從色彩心理學到結構力學，確保您的包裝既美觀又實用。',
      ],
    },
    faq: [
      { q: '包裝盒最低多少個起訂？', a: '婚禮喜糖盒 30 個起，彩盒 50 個起，常規工業款 100–200 個起。遠低於傳統工廠的 500–1,000 個標準。' },
      { q: '包裝盒有哪些盒型可選？', a: '天地蓋盒、書型盒、抽屜盒、折疊盒、飛機盒、磁吸盒等 20 餘種標準盒型，亦支持完全客製化設計。' },
      { q: '可以用環保紙張嗎？', a: '可以。所有盒型均可選 FSC 認證環保紙張，符合國際環保標準，適合出口歐美市場。' },
      { q: '食品包裝盒安全嗎？', a: '安全。我們採用食品級紙張和無毒大豆油墨，通過 SGS 檢測認證，符合 HK 衛生署食品安全要求。' },
      { q: '包裝盒印刷需要多久？', a: '常規訂單 3 天出貨；快印服務 2 天交付；打樣當日完成。大批量訂單（5,000 個以上）約 5–7 天。' },
      { q: '可以自己設計刀模線嗎？', a: '可以。我們接受 AI / PDF 格式的刀模線文件（CMYK，300dpi）。如果不熟悉刀模設計，我們提供免費刀模設計服務。' },
      { q: '瓦楞紙箱能做抗壓測試嗎？', a: '可以。我們可根據 ISTA 標準進行抗壓和跌落測試，確保物流運輸安全。測試報告可作為出口通關文件。' },
      { q: '支持出口包裝標準嗎？', a: '支持。我們熟悉歐盟 WEEE、美國 FTC 綠色指南等出口包裝法規，可協助準備相關合規文件。' },
    ],
  },
  en: {
    h2: 'Custom Packaging Box Printing Hong Kong — From 100 Units, Free Die-Cut Design, 3-Day Delivery',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Packaging?',
      items: [
        {
          heading: '1. Complete Material & Scene Coverage: From E-Commerce Color Boxes to Pharmaceutical Compliance Cases',
          points: [
            'We offer 10 professional series including custom color boxes, corrugated cartons, magnetic cosmetic boxes, FSC eco-friendly boxes, festive gift boxes, and wedding favor boxes — covering all your packaging printing needs.',
            'Food-grade paper materials, HK Department of Health compliance, export packaging standards, QR tracking codes, and moisture-proof treatment — meeting regulatory and cross-border requirements.',
            'Ideal for e-commerce logistics, beauty brands, food gift boxes, pharmaceutical health products, wedding favors, and corporate gifts.',
          ],
        },
        {
          heading: '2. Low MOQ + Fast Turnaround, Reducing Inventory Risk',
          points: [
            'Minimum order from just 30–50 units (wedding/favor boxes), 100 units for standard sizes — perfect for startup brands to test the market.',
            '3-day standard delivery, 2-day rush service for urgent orders. Direct from Shenzhen factory with SF Express delivery across Hong Kong — no sea freight waiting.',
            'Unit price from HK$0.8, economical without requiring bulk stockpiling.',
          ],
        },
        {
          heading: '3. Premium Finishes + Free Design Support, Elevating Brand Value',
          points: [
            'Support for foil stamping (gold/silver), UV embossing, spot coating, window design, ribbon holes, and more luxury finishes.',
            'Free prototyping + professional design consultation. Confirm structure and aesthetics before mass production.',
            'Optional QR code tracking for product traceability and interactive marketing.',
          ],
        },
      ],
    },
    materialTable: {
      title: 'Material & Craftsmanship Guide',
      subtitle: 'Common Packaging Materials and Applications',
      columns: ['Material Type', 'Key Features', 'Best For'],
      rows: [
        { material: 'Premium Color Box (White Card/Art Paper)', features: '300–350g | Foil/UV support | Vibrant colors', scenarios: 'Beauty | Gifts | Wedding favors | Corporate' },
        { material: 'Corrugated Carton (E/F Flute)', features: 'Industrial strength | Custom sizes | Export-ready', scenarios: 'E-commerce | Cross-border warehousing | Wholesale' },
        { material: 'FSC Certified Eco Paper', features: 'Biodegradable | Plasticizer-free | Green certified', scenarios: 'Sustainable brands | Organic food | Eco businesses' },
        { material: 'Food-Grade / Moisture-Proof Paper', features: 'Food-safe | Moisture treatment | QR code ready', scenarios: 'Baked goods | Health supplements | TCM packaging' },
        { material: 'Magnetic / Drawer Structure Box', features: 'Luxury structure | Silver foil logo | Reusable', scenarios: 'Perfume | Skincare | Premium beauty' },
      ],
    },
    specialOptions: {
      title: 'Special Finishing Options',
      items: [
        { name: 'Foil Stamping (Gold/Silver)', description: 'Metallic sheen on logos or patterns for instant luxury appeal.' },
        { name: 'Spot UV Coating', description: 'Highlight key elements with a raised, tactile glossy finish.' },
        { name: 'Window Design', description: 'Transparent PVC or die-cut windows to showcase contents — perfect for mooncake boxes.' },
        { name: 'Ribbon Holes', description: 'Pre-cut holes for satin ribbons, enhancing gift-giving ceremony.' },
        { name: 'QR Code Tracking', description: 'Batch management, anti-counterfeit verification, or link to official website.' },
        { name: 'Rounded / Die-Cut Corners', description: 'Safe and beautiful for wedding or children\'s products.' },
      ],
    },
    techSpecs: {
      title: 'Technical Specifications',
      items: [
        { label: 'Size Range', value: 'Fully customizable. Common sizes: 10×10×5cm (color box), 30×20×15cm (corrugated).' },
        { label: 'Minimum Order', value: '30 units (wedding favor boxes), 50 units (color boxes), 100–200 units (standard/industrial).' },
        { label: 'Turnaround', value: 'Standard: 3 days. Rush: 2 days. Prototyping: same day.' },
        { label: 'File Requirements', value: 'AI / PDF (CMYK, 300dpi, with die-cut lines). Free die-cut design provided.' },
        { label: 'Structural Testing', value: 'Corrugated boxes undergo compression / drop testing per ISTA standards for logistics safety.' },
      ],
    },
    serviceNodes: {
      title: 'Local Service Points',
      items: [
        { title: 'Mong Kok Prototyping Center', description: 'Book an appointment to view physical samples — foil effects, paper texture, structural strength.' },
        { title: 'Free Prototyping', description: 'Confirm appearance and structure before mass production to avoid costly mistakes.' },
        { title: 'Island-Wide Delivery', description: 'Small batches via SF Express; large batches by dedicated truck to warehouse or office.' },
      ],
    },
    buyingGuide: {
      title: 'Packaging Buying Guide',
      paragraphs: [
        'When choosing packaging, first clarify your product\'s purpose and target audience. E-commerce products need durable corrugated cartons; beauty brands suit premium white card boxes; food products require food-grade materials with proper certifications.',
        'Next, consider your budget and quantity. Small-batch testing can use digitally printed color boxes (from 50 units); large-volume production benefits from offset printing for cost savings. Our consultants recommend the best solution based on your budget and timeline.',
        'Finally, don\'t overlook design details. Great packaging communicates brand identity within 3 seconds. We offer free design consultation covering color psychology to structural mechanics, ensuring your packaging is both beautiful and functional.',
      ],
    },
    faq: [
      { q: 'What is the minimum order for packaging boxes?', a: 'Wedding favor boxes from 30 units, color boxes from 50 units, standard industrial from 100–200 units. Far below traditional factory minimums of 500–1,000.' },
      { q: 'What box styles are available?', a: 'Over 20 standard styles including rigid boxes, book-style boxes, drawer boxes, folding cartons, mailer boxes, and magnetic boxes. Fully custom designs also supported.' },
      { q: 'Can I use eco-friendly paper?', a: 'Yes. All box types are available with FSC-certified eco paper, meeting international environmental standards for export to Europe and America.' },
      { q: 'Are food packaging boxes safe?', a: 'Yes. We use food-grade paper and non-toxic soy-based inks, certified by SGS and compliant with HK Department of Health food safety requirements.' },
      { q: 'How long does packaging printing take?', a: 'Standard orders: 3 days. Rush service: 2 days. Prototyping: same day. Large orders (5,000+ units): approximately 5–7 days.' },
      { q: 'Can I design my own die-cut lines?', a: 'Yes. We accept AI / PDF die-cut files (CMYK, 300dpi). If you are unfamiliar with die-cut design, we provide free die-cut design services.' },
      { q: 'Can corrugated boxes pass compression testing?', a: 'Yes. We perform compression and drop testing per ISTA standards to ensure logistics safety. Test reports can serve as export customs documents.' },
      { q: 'Do you support export packaging standards?', a: 'Yes. We are familiar with EU WEEE, US FTC Green Guides, and other export packaging regulations, and can assist with compliance documentation.' },
    ],
  },
  ja: {
    h2: '香港 パッケージ印刷・箱制作 — 100個から、無料型設計、3日納品',
    coreAdvantages: {
      title: 'ZprintPro パッケージの強み',
      items: [
        {
          heading: '1. 全素材・全シーン対応：ECカラーボックスから医薬品規格箱まで',
          points: [
            'カスタムカラーボックス、段ボール箱、磁石式化粧品箱、FSC認証エコ箱、ギフト箱、ウエディングボックスなど10大シリーズを提供。',
            '食品グレード紙材、香港衛生署基準対応、輸出規格、QR追跡コード、防湿加工 — 法規制と越境要件を満たします。',
            'EC物流、美容ブランド、食品ギフト、医薬品・健康食品、結婚式引き出物、企業ギフトなど多様なシーンに対応。',
          ],
        },
        {
          heading: '2. 小ロット対応＋迅速納品、在庫リスクを削減',
          points: [
            '最小30–50個から（ウエディング／カラーボックス）、通常100個から — スタートアップブランドの試作に最適。',
            '通常3日出荷、急行2日対応。深セン工場直送｜香港全域SFエクスプレス配送 — 海運待ち不要。',
            '単価HK$0.8～、大量在庫不要で経済的。',
          ],
        },
        {
          heading: '3. 高級加工＋無料デザイン支援、ブランド価値向上',
          points: [
            '箔押し（金／銀）、UVエンボス、局部コーティング、窓開け、リボン穴など高級加工対応。',
            '無料サンプル＋プロのデザイン相談。構造と外観を確認してから量産します。',
            'QRコード追跡で製品トレーサビリティとインタラクティブマーケティングを実現。',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質・工法ガイド',
      subtitle: 'パッケージよく使われる材質と用途',
      columns: ['材質タイプ', '主な特徴', '最適な用途'],
      rows: [
        { material: '高級カラーボックス（白カード／コート紙）', features: '300–350g｜箔押し／UV対応｜発色鮮やか', scenarios: '美容｜ギフト｜ウエディング｜企業' },
        { material: '段ボール箱（E／Fフルート）', features: '工業級強度｜カスタムサイズ｜輸出対応', scenarios: 'EC物流｜越境倉庫｜卸売包装' },
        { material: 'FSC認証エコ紙', features: '生分解性｜無可塑剤｜グリーン認証', scenarios: 'サステナブルブランド｜有機食品｜環境企業' },
        { material: '食品グレード／防湿紙材', features: '食品安全対応｜防湿加工｜QRコード対応', scenarios: 'ベーカリー｜健康食品｜漢方包装' },
        { material: '磁石式／引き出し構造箱', features: '高級構造｜銀箔ロゴ｜再利用可能', scenarios: '香水｜スキンケア｜高級美容' },
      ],
    },
    specialOptions: {
      title: '特殊加工オプション',
      items: [
        { name: '箔押し（金／銀）', description: 'ロゴやパターンに金属光沢の高級感を演出。' },
        { name: 'UV局部コーティング', description: '重要な要素を立体的な光沢で強調。' },
        { name: '窓開けデザイン', description: '透明PVCや抜き加工で中身を見せる — 月餅箱に最適。' },
        { name: 'リボン穴', description: 'サテンリボンを通せる穴加工でギフト感アップ。' },
        { name: 'QRコード追跡', description: 'ロット管理、偽造防止、または公式サイトへリンク。' },
        { name: '丸角／抜き型裁切', description: 'ウエディングや子供向け製品に安全で美しい仕上がり。' },
      ],
    },
    techSpecs: {
      title: '技術仕様',
      items: [
        { label: 'サイズ範囲', value: '完全カスタマイズ。一般的なサイズ：10×10×5cm（カラーボックス）、30×20×15cm（段ボール）。' },
        { label: '最小発注数', value: '30個から（ウエディングボックス）、50個から（カラーボックス）、100–200個から（標準／工業用）。' },
        { label: '納期', value: '通常3日出荷。急行2日。サンプル：当日完成。' },
        { label: 'ファイル要件', value: 'AI／PDF（CMYK、300dpi、型抜き線含む）。無料型設計サービスあり。' },
        { label: '構造テスト', value: '段ボール箱はISTA基準の圧縮／落下テストを実施し、物流安全を確保。' },
      ],
    },
    serviceNodes: {
      title: 'ローカルサービス拠点',
      items: [
        { title: '旺角サンプルセンター', description: '実物サンプル（箔押し効果、紙質触感、構造強度）をご覧いただけます。予約制。' },
        { title: '無料サンプルサービス', description: '外観と構造を確認してから量産し、高額なミスを防ぎます。' },
        { title: '香港全域配送', description: '小ロットはSFエクスプレス、大ロットは専用トラックで倉庫またはオフィスへ直送。' },
      ],
    },
    buyingGuide: {
      title: 'パッケージ選び方ガイド',
      paragraphs: [
        'パッケージを選ぶ際、まず製品の用途とターゲットを明確にしましょう。EC商品は耐衝撃性のある段ボール箱が必要；美容ブランドには高級感のある白カードボックスが適しています；食品は食品グレードの材質と適切な認証が必須です。',
        '次に予算と数量を考慮します。小ロットの試作にはデジタル印刷のカラーボックス（50個から）が最適；大量生産にはオフセット印刷でコストを抑えられます。当社のコンシェルジュが予算と納期に応じて最適なソリューションをご提案します。',
        '最後に、デザインのディテールを見逃さないでください。優れたパッケージは3秒以内にブランド情報を伝えます。色彩心理学から構造力学まで、無料デザイン相談で美しく実用的なパッケージを実現します。',
      ],
    },
    faq: [
      { q: 'パッケージの最小発注数は？', a: 'ウエディングボックス30個から、カラーボックス50個から、標準工業用100–200個から。従来の工場基準500–1,000個を大きく下回ります。' },
      { q: '対応している箱型は？', a: '化粧箱、ブック型箱、引き出し箱、組み立て箱、ダンボール箱、磁石式箱など20種類以上の標準箱型。完全カスタムデザインも対応。' },
      { q: 'エコ紙は使えますか？', a: 'はい。全箱型でFSC認証エコ紙を選択可能。欧米輸出に対応した国際環境基準を満たします。' },
      { q: '食品パッケージは安全ですか？', a: 'はい。食品グレード紙と無毒大豆油インクを使用。SGS認証取得済み、香港衛生署食品安全基準に準拠。' },
      { q: 'パッケージ印刷にどのくらいかかりますか？', a: '通常注文3日、急行サービス2日、サンプル当日。大量注文（5,000個以上）は約5–7日。' },
      { q: '型抜き線を自分で設計できますか？', a: 'はい。AI／PDF形式の型抜き線データ（CMYK、300dpi）を受け付けます。型抜き設計に不慣れな場合は無料型設計サービスをご利用ください。' },
      { q: '段ボール箱は圧縮テストを通りますか？', a: 'はい。ISTA基準の圧縮・落下テストを実施し、物流安全を確保。テストレポートは輸出通関書類として利用可能です。' },
      { q: '輸出包装規格に対応していますか？', a: 'はい。EU WEEE、米国FTCグリーンガイドなどの輸出包装法規に精通しており、コンプライアンス文書の準備をサポートします。' },
    ],
  },
};

// =============================================================================
// 2. BUSINESS CARDS — 咭片印刷
// =============================================================================
const businessCardsContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    h2: '香港名片印刷 — 100張起訂，300g高級紙，24小時急件',
    coreAdvantages: {
      title: '核心競爭優勢',
      items: [
        {
          heading: '1. 香港商務首選：專業形象從一張名片開始',
          points: [
            '採用 300g–400g 高級銅版紙、剛古紙、荷蘭白卡、棉紙，配合德國海德堡四色印刷機，色彩準確還原',
            '滿足「名片印刷 香港」、「咭片印刷」、「名片設計」、「商務名片」等高搜索量關鍵詞需求',
            '適用於金融、法律、醫療、設計、科技、地產等專業行業',
          ],
        },
        {
          heading: '2. 極速交貨：上午落單，翌日收貨',
          points: [
            '100 張起訂，標準 3–5 個工作日交貨',
            '24 小時急件服務，上午 11 點前確認稿件，翌日速遞到門',
            '全港順豐覆蓋：香港島、九龍、新界，企業客戶可安排專人直送',
          ],
        },
        {
          heading: '3. 高端工藝：燙金、UV、凹凸壓紋、圓角一站式',
          points: [
            '燙金／燙銀（金、銀、玫瑰金、香檳金）、局部 UV、凹凸壓紋、啞膠／光膠覆膜',
            '免費名片模板下載，專業設計師一對一諮詢',
            '支持雙面不同設計、QR Code 名片、NFC 智能名片',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質工藝詳解',
      subtitle: '名片常用紙張與工藝',
      columns: ['紙張類型', '關鍵特性', '適用場景'],
      rows: [
        { material: '300g 銅版紙', features: '色彩鮮豔｜經濟實惠｜啞膠／光膠可選', scenarios: '一般商務｜銷售｜初創企業' },
        { material: '400g 厚紙', features: '厚實手感｜高級質感｜不易彎曲', scenarios: '高管｜律師｜金融業｜高端服務' },
        { material: '剛古紙 Conqueror', features: '紋理細膩｜英國進口｜品牌首選', scenarios: '奢侈品牌｜設計師｜藝術家' },
        { material: '荷蘭白卡', features: '純白無紋｜色彩還原極佳｜簡約風格', scenarios: '科技公司｜建築師｜極簡品牌' },
        { material: '棉紙 Cotton', features: '柔軟觸感｜環保天然｜凸版印刷絕配', scenarios: '婚禮｜手工品牌｜環保企業' },
      ],
    },
    specialOptions: {
      title: '特殊加工選項',
      items: [
        { name: '燙金／燙銀', description: '局部金屬光澤，提升品牌奢華感，可選金、銀、玫瑰金、香檳金' },
        { name: '局部 UV', description: '重點元素高光凸顯，觸感立體，視覺衝擊力強' },
        { name: '凹凸壓紋', description: 'LOGO 或圖案立體浮凸，無需油墨即可呈現質感' },
        { name: '圓角裁切', description: '1mm–5mm 圓角選擇，柔和專業，避免刮傷' },
        { name: '雙面異形', description: '正面商務信息，背面品牌故事或 QR Code，一卡雙用' },
        { name: 'NFC 智能名片', description: '手機一觸即傳聯絡方式，科技前衛，適合科技行業' },
      ],
    },
    techSpecs: {
      title: '技術參數詳解',
      items: [
        { label: '標準尺寸', value: '90×54mm（ISO 7810 標準），支持 85×55mm、方形 65×65mm 等客製尺寸' },
        { label: '起訂量', value: '100 張起訂，數碼打樣可 50 張小量測試' },
        { label: '交期', value: '標準 3–5 工作日；24 小時急件；打樣當日完成' },
        { label: '檔案要求', value: 'AI / PSD / PDF，300dpi，CMYK，預留 3mm 出血位' },
        { label: '印刷方式', value: '柯式印刷（大量）、數碼印刷（小量、可變數據）' },
      ],
    },
    serviceNodes: {
      title: '本地化服務節點',
      items: [
        { title: '觀塘實體工廠', description: '可預約參觀印刷流程，親眼見證海德堡印刷機運作' },
        { title: '免費設計諮詢', description: '資深設計師一對一服務，從排版到色彩管理全程指導' },
        { title: '企業月結賬戶', description: '專屬客戶經理、批量優惠、優先排期、月結付款' },
      ],
    },
    buyingGuide: {
      title: '名片選購指南',
      paragraphs: [
        '選擇名片紙張時，首先要考慮行業屬性。金融、法律行業適合 400g 厚紙或剛古紙，傳達穩重專業；創意行業可選棉紙或特殊紋理紙，展示個性；科技行業推薦荷蘭白卡，簡約現代。',
        '工藝選擇上，燙金適合高端品牌，局部 UV 適合強調 LOGO，凹凸壓紋適合極簡設計。建議不要超過兩種工藝組合，避免視覺過於繁複。我們提供免費工藝搭配建議。',
        '文件準備是關鍵。請確保文字轉曲線、圖片嵌入、色彩模式為 CMYK。如果不確定，可直接上傳設計稿，我們的印前團隊會免費檢查並提供修改建議。',
      ],
    },
    faq: [
      { q: '名片印刷最低多少張起？', a: '100 張起訂。數碼打樣可 50 張小量測試，適合初次合作或設計確認。' },
      { q: '名片最快多久可以取貨？', a: '24 小時急件服務：上午 11 點前確認稿件，翌日速遞到門。標準交期 3–5 工作日。' },
      { q: '名片支持哪些特殊工藝？', a: '燙金（金／銀／玫瑰金／香檳金）、局部 UV、凹凸壓紋、啞膠／光膠覆膜、圓角裁切、打孔、NFC 智能芯片。' },
      { q: '名片設計文件有什麼要求？', a: 'AI / PSD / PDF 格式，300dpi，CMYK 色彩模式，預留 3mm 出血位，文字轉曲線，圖片嵌入。' },
      { q: '可以印刷雙面不同設計的名片嗎？', a: '可以。雙面異形設計是我們的熱門選項，正面商務信息 + 背面品牌故事或 QR Code。' },
      { q: '企業批量訂購有優惠嗎？', a: '有。1,000 張以上享批量折扣，企業客戶可申請月結賬戶，專屬客戶經理跟進。' },
      { q: '名片可以印 QR Code 嗎？', a: '可以。我們支持可變數據印刷，每張名片的 QR Code 可以不同（鏈接不同網頁或聯絡方式）。' },
      { q: '什麼是 NFC 智能名片？', a: '內置 NFC 芯片的名片，手機輕觸即可自動保存聯絡方式或打開網站，適合科技行業和前瞻性品牌。' },
    ],
  },
  en: {
    h2: 'Business Card Printing Hong Kong — 100 Cards MOQ, 300gsm Premium Stock, 24hr Rush',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Business Cards?',
      items: [
        {
          heading: '1. Hong Kong\'s Business Card Specialist: Your Professional Image Starts Here',
          points: [
            'Premium 300–400gsm art paper, Conqueror, Dutch white card, and cotton paper. Heidelberg 4-color presses ensure accurate color reproduction.',
            'Covers high-search keywords: "business card printing Hong Kong", "name card printing", "business card design", "corporate business cards".',
            'Perfect for finance, legal, medical, design, tech, and real estate professionals.',
          ],
        },
        {
          heading: '2. Lightning-Fast Delivery: Order Today, Receive Tomorrow',
          points: [
            '100 cards minimum order, standard 3–5 business day delivery.',
            '24-hour rush service: confirm artwork by 11 AM, delivered next day via SF Express.',
            'Island-wide coverage: Hong Kong Island, Kowloon, New Territories. Corporate clients enjoy dedicated delivery.',
          ],
        },
        {
          heading: '3. Premium Finishes: Foil, UV, Embossing, Rounded Corners',
          points: [
            'Foil stamping (gold, silver, rose gold, champagne), spot UV, embossing/debossing, matte/gloss lamination.',
            'Free business card templates + one-on-one designer consultation.',
            'Support for dual-sided designs, QR code cards, and NFC smart business cards.',
          ],
        },
      ],
    },
    materialTable: {
      title: 'Material & Craftsmanship Guide',
      subtitle: 'Popular Business Card Papers and Finishes',
      columns: ['Paper Type', 'Key Features', 'Best For'],
      rows: [
        { material: '300gsm Art Paper', features: 'Vibrant colors | Affordable | Matte/gloss options', scenarios: 'General business | Sales | Startups' },
        { material: '400gsm Thick Stock', features: 'Substantial feel | Premium quality | Won\'t bend', scenarios: 'Executives | Lawyers | Finance | Luxury services' },
        { material: 'Conqueror Textured', features: 'Subtle texture | UK imported | Brand favorite', scenarios: 'Luxury brands | Designers | Artists' },
        { material: 'Dutch White Card', features: 'Pure white | Excellent color | Minimalist', scenarios: 'Tech companies | Architects | Minimalist brands' },
        { material: 'Cotton Paper', features: 'Soft texture | Eco-friendly | Letterpress-ready', scenarios: 'Weddings | Handmade brands | Eco businesses' },
      ],
    },
    specialOptions: {
      title: 'Special Finishing Options',
      items: [
        { name: 'Foil Stamping', description: 'Metallic luxury finish. Choose gold, silver, rose gold, or champagne foil.' },
        { name: 'Spot UV', description: 'Glossy raised highlights on key elements for tactile impact.' },
        { name: 'Embossing / Debossing', description: 'Three-dimensional texture without ink — pure tactile elegance.' },
        { name: 'Rounded Corners', description: '1mm–5mm radius options. Professional and safe from snagging.' },
        { name: 'Dual-Sided Design', description: 'Business details on front, brand story or QR code on back.' },
        { name: 'NFC Smart Card', description: 'Tap-to-share contact details or website. Perfect for tech industry.' },
      ],
    },
    techSpecs: {
      title: 'Technical Specifications',
      items: [
        { label: 'Standard Size', value: '90×54mm (ISO 7810 standard). Custom: 85×55mm, square 65×65mm, etc.' },
        { label: 'Minimum Order', value: '100 cards. Digital proofing available from 50 cards.' },
        { label: 'Turnaround', value: 'Standard: 3–5 business days. Rush: 24 hours. Prototyping: same day.' },
        { label: 'File Requirements', value: 'AI / PSD / PDF, 300dpi, CMYK, 3mm bleed. Text outlined, images embedded.' },
        { label: 'Print Method', value: 'Offset printing (volume) or digital printing (small batches, variable data).' },
      ],
    },
    serviceNodes: {
      title: 'Local Service Points',
      items: [
        { title: 'Kwun Tong Production Facility', description: 'Book a tour to witness Heidelberg presses in action.' },
        { title: 'Free Design Consultation', description: 'Senior designers provide one-on-one guidance from layout to color management.' },
        { title: 'Corporate Account Billing', description: 'Dedicated account manager, volume discounts, priority scheduling, monthly billing.' },
      ],
    },
    buyingGuide: {
      title: 'Business Card Buying Guide',
      paragraphs: [
        'When choosing business card paper, consider your industry. Finance and legal professionals suit 400gsm thick stock or Conqueror for a solid, professional impression. Creative industries can opt for cotton or textured papers to showcase personality. Tech companies prefer Dutch white card for a clean, modern look.',
        'For finishes, foil stamping suits luxury brands, spot UV emphasizes logos, and embossing works well for minimalist designs. We recommend no more than two finishes combined to avoid visual clutter. Free finish pairing advice is available.',
        'File preparation is critical. Ensure text is outlined, images are embedded, and the color mode is CMYK. If unsure, simply upload your design — our prepress team checks it for free and provides modification suggestions.',
      ],
    },
    faq: [
      { q: 'What is the minimum order for business cards?', a: '100 cards. Digital proofing available from 50 cards for design confirmation or first-time clients.' },
      { q: 'How fast can I get my business cards?', a: '24-hour rush service: confirm by 11 AM, delivered next day. Standard: 3–5 business days.' },
      { q: 'What special finishes do you offer?', a: 'Foil stamping (gold/silver/rose gold/champagne), spot UV, embossing/debossing, matte/gloss lamination, rounded corners, hole punching, NFC chips.' },
      { q: 'What are the design file requirements?', a: 'AI / PSD / PDF at 300dpi, CMYK color mode, 3mm bleed. Text outlined, images embedded.' },
      { q: 'Can I print different designs on each side?', a: 'Yes. Dual-sided designs are popular — business info on front, brand story or QR code on back.' },
      { q: 'Are there discounts for bulk orders?', a: 'Yes. Volume discounts on 1,000+ cards. Corporate clients enjoy monthly billing with dedicated account managers.' },
      { q: 'Can you print QR codes on business cards?', a: 'Yes. We support variable data printing — each card can have a unique QR code linking to different pages or contacts.' },
      { q: 'What is an NFC smart business card?', a: 'A card with a built-in NFC chip. Tap a phone to automatically save contact details or open a website. Ideal for tech professionals.' },
    ],
  },
  ja: {
    h2: '香港 名刺印刷 — 100枚から、300g高級紙、24時間急行',
    coreAdvantages: {
      title: 'ZprintPro 名刺の強み',
      items: [
        {
          heading: '1. 香港ビジネス首选：プロの印象は名刺から',
          points: [
            '300g–400g高級コート紙、コンカラー紙、オランダ白カード、コットン紙を採用。ハイデルベルグ4色印刷機で正確な色彩再現。',
            '「名刺印刷 香港」、「名片設計」、「ビジネスカード」などの高検索ボリュームキーワードをカバー。',
            '金融、法律、医療、デザイン、テック、不動産などの専門業界に最適。',
          ],
        },
        {
          heading: '2. 超高速納品：今日注文、明日到着',
          points: [
            '最小100枚から、標準3–5営業日納品。',
            '24時間急行サービス：午前11時までにデータ確定で翌日SFエクスプレス配送。',
            '香港島・九龍・新界をカバー。法人様は専門配送手配も可能。',
          ],
        },
        {
          heading: '3. 高級加工：箔押し、UV、エンボス、丸角',
          points: [
            '箔押し（金／銀／ローズゴールド／シャンパン）、局部UV、エンボス／デボス、マット／グロスラミネーション。',
            '無料名刺テンプレート＋デザイナー一对一相談。',
            '両面異なるデザイン、QRコード名刺、NFCスマート名刺に対応。',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質・工法ガイド',
      subtitle: '名刺によく使われる紙と加工',
      columns: ['紙の種類', '主な特徴', '最適な用途'],
      rows: [
        { material: '300g コート紙', features: '発色鮮やか｜手頃な価格｜マット／グロス可', scenarios: '一般ビジネス｜営業｜スタートアップ' },
        { material: '400g 厚紙', features: '厚みのある質感｜高級感｜曲がりにくい', scenarios: '経営者｜弁護士｜金融｜高級サービス' },
        { material: 'コンカラー紙', features: '繊細な纹理｜英国輸入｜ブランド御用達', scenarios: 'ラグジュアリー｜デザイナー｜アーティスト' },
        { material: 'オランダ白カード', features: '純白無紋｜色彩再現抜群｜ミニマル', scenarios: 'テック企業｜建築家｜ミニマルブランド' },
        { material: 'コットン紙', features: '柔らかな触感｜エコ天然｜活版印刷向き', scenarios: 'ウエディング｜手工芸｜環境企業' },
      ],
    },
    specialOptions: {
      title: '特殊加工オプション',
      items: [
        { name: '箔押し', description: '局部に金属光沢の高級感。金、銀、ローズゴールド、シャンパンから選択可。' },
        { name: '局部UV', description: '重要要素を光沢で強調し、触感も立体的に。' },
        { name: 'エンボス／デボス', description: 'インクなしでロゴや模様を立体的に表現。' },
        { name: '丸角裁切', description: '1mm–5mmの丸角選択。プロフェッショナルで安全。' },
        { name: '両面異なるデザイン', description: '表面にビジネス情報、裏面にブランドストーリーやQRコード。' },
        { name: 'NFCスマート名刺', description: 'スマホをかざすだけで連絡先を自動保存。テック業界に最適。' },
      ],
    },
    techSpecs: {
      title: '技術仕様',
      items: [
        { label: '標準サイズ', value: '90×54mm（ISO 7810標準）。カスタム：85×55mm、方形65×65mmなど。' },
        { label: '最小発注数', value: '100枚から。デジタル校正用に50枚の少量サービスあり。' },
        { label: '納期', value: '標準3–5営業日。急行24時間。サンプル当日完成。' },
        { label: 'ファイル要件', value: 'AI／PSD／PDF、300dpi、CMYK、3mmのbleed。文字はアウトライン、画像は埋め込み。' },
        { label: '印刷方式', value: 'オフセット印刷（大量）、デジタル印刷（小ロット、可変データ）。' },
      ],
    },
    serviceNodes: {
      title: 'ローカルサービス拠点',
      items: [
        { title: '観塘実体工場', description: '印刷工程の見学予約が可能。ハイデルベルグ印刷機の稼働を間近で見学。' },
        { title: '無料デザイン相談', description: 'ベテランデザイナーが一对一で、組版から色彩管理まで全程指導。' },
        { title: '法人月次請求', description: '専任担当者、大口割引、優先スケジュール、月次請求対応。' },
      ],
    },
    buyingGuide: {
      title: '名刺選び方ガイド',
      paragraphs: [
        '名刺の紙を選ぶ際、まず業界属性を考慮しましょう。金融・法律業界には400g厚紙やコンカラー紙が適し、堅実でプロフェッショナルな印象を与えます。クリエイティブ業界はコットン紙や特殊纹理紙で個性をアピール。テック企業にはオランダ白カードがおすすめで、クリーンでモダンな印象になります。',
        '加工の選択では、箔押しは高級ブランドに、局部UVはロゴ強調に、エンボスはミニマルデザインに最適です。2種類以上の組み合わせは視覚的に煩雑になりやすいので避けることをおすすめします。無料の加工組み合わせ相談をご利用ください。',
        'ファイル準備が鍵です。文字はアウトライン化、画像は埋め込み、カラーモードはCMYKを確認してください。不安な場合はデザインデータをそのままアップロードください — 当社の印前チームが無料でチェックし、修正提案をいたします。',
      ],
    },
    faq: [
      { q: '名刺印刷の最小発注数は？', a: '100枚から。デジタル校正用に50枚の少量サービスもあり、初回やデザイン確認に最適です。' },
      { q: '名刺の最短納期は？', a: '24時間急行サービス：午前11時までにデータ確定で翌日配送。標準は3–5営業日。' },
      { q: '対応している特殊加工は？', a: '箔押し（金／銀／ローズゴールド／シャンパン）、局部UV、エンボス／デボス、マット／グロスラミネーション、丸角裁切、穴あけ、NFCチップ。' },
      { q: 'デザインファイルの要件は？', a: 'AI／PSD／PDF、300dpi、CMYKカラーモード、3mmのbleed。文字はアウトライン、画像は埋め込み。' },
      { q: '両面に違うデザインは可能ですか？', a: 'はい。両面異なるデザインは人気のオプションです。表面にビジネス情報、裏面にブランドストーリーやQRコード。' },
      { q: '法人の大口注文に割引はありますか？', a: 'はい。1,000枚以上で大口割引。法人様は月次請求が可能で、専任担当者が対応します。' },
      { q: '名刺にQRコードは印刷できますか？', a: 'はい。可変データ印刷に対応しており、1枚ずつ異なるQRコード（異なるWebページや連絡先）が可能です。' },
      { q: 'NFCスマート名刺とは？', a: 'NFCチップを内蔵した名刺です。スマホをかざすだけで連絡先を自動保存したり、Webサイトを開いたりできます。テック業界に最適です。' },
    ],
  },
};


// =============================================================================
// 7. BANNERS — 噴繪廣告
// =============================================================================
const bannersContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    h2: '香港噴繪廣告印刷 — 防水防曬，X展架／易拉寶／Backdrop，即日交貨',
    coreAdvantages: {
      title: '核心競爭優勢',
      items: [
        {
          heading: '1. 全類型戶外廣告覆蓋：X展架到建築圍板',
          points: [
            '提供 X 展架、易拉寶、Backdrop 背景板、戶外橫幅、建築圍板、燈箱片等全類型噴繪廣告',
            '採用進口環保溶劑墨水或 UV 固化墨水，防水防曬，戶外耐久 1–3 年',
            '滿足「噴繪 香港」、「戶外橫額」、「展架出租」、「Backdrop 背景板」等高搜索量關鍵詞',
          ],
        },
        {
          heading: '2. 極速交貨：即日印刷，翌日安裝',
          points: [
            'X 展架和易拉寶即日交貨（現成框架 + 畫面更換），Backdrop 背景板 1–2 天',
            '提供安裝服務（港島、九龍主要商業區），桁架搭建、燈光配置一條龍',
            '活動臨時加單？上午確認稿件，下午出貨，晚上安裝到位',
          ],
        },
        {
          heading: '3. 高精度輸出：1440dpi 細節無損',
          points: [
            '採用愛普生 SureColor 大幅面噴墨機，最高 1440dpi 解析度，色彩層次豐富',
            '支持可變尺寸輸出，最大寬度 3.2 米，長度無限，滿足建築圍板等大型需求',
            '免費色彩校對，確保批量輸出色彩一致性',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質工藝詳解',
      subtitle: '噴繪廣告常用材質與應用',
      columns: ['材質類型', '關鍵特性', '適用場景'],
      rows: [
        { material: 'PP 合成紙', features: '輕薄｜經濟｜室內短期｜可背膠', scenarios: 'X展架｜易拉寶｜室內海報｜短期活動' },
        { material: 'PVC 橫幅布', features: '防水防曬｜抗撕裂｜戶外專用', scenarios: '戶外橫額｜建築圍板｜長期戶外｜工地' },
        { material: '網眼布', features: '透風｜抗風壓｜大型戶外｜不遮擋視線', scenarios: '建築外牆｜體育場｜大型活動｜圍欄' },
        { material: '燈箱片', features: '半透光｜色彩飽和｜夜間效果佳', scenarios: '地鐵燈箱｜商場燈箱｜戶外燈箱｜夜間廣告' },
        { material: '帆布', features: '藝術質感｜可捲軸｜高級展示', scenarios: '藝術展｜高端活動｜長期展示｜裝飾' },
      ],
    },
    specialOptions: {
      title: '特殊加工選項',
      items: [
        { name: '打扣穿繩', description: '邊緣打金屬扣並穿繩，方便懸掛和固定於桁架' },
        { name: '熱縫邊', description: '高溫熱縫邊緣，防止布料散邊，增加耐用度' },
        { name: '雙面印刷', description: '橫幅布雙面印刷，正反均可見，適合懸掛於通道上方' },
        { name: '阻燃處理', description: '符合消防條例的阻燃處理，適合室內展覽和公共場所' },
        { name: '抗 UV 塗層', description: '額外抗 UV 塗層，延長戶外使用壽命至 3 年＋' },
        { name: '磁性背膠', description: '可反覆粘貼於鐵質表面，適合經常更換廣告的零售店' },
      ],
    },
    techSpecs: {
      title: '技術參數詳解',
      items: [
        { label: '尺寸範圍', value: 'X展架 60×160cm、80×180cm；易拉寶 85×200cm；Backdrop 最大 3.2m×無限長；橫幅任意尺寸' },
        { label: '起訂量', value: '1 件起訂（數碼噴繪），10 件以上享批量折扣' },
        { label: '交期', value: 'X展架／易拉寶即日；Backdrop 1–2 天；大型橫幅 2–3 天；打樣當日完成' },
        { label: '解析度', value: '720dpi（標準）、1440dpi（高精度），支援 ICC 色彩管理' },
        { label: '檔案要求', value: 'AI / PDF / TIFF，100–150dpi（依輸出尺寸），CMYK，建議原圖解析度 ≥100dpi' },
      ],
    },
    serviceNodes: {
      title: '本地化服務節點',
      items: [
        { title: '展架出租服務', description: 'X展架和易拉寶框架出租 + 畫面更換，適合一次性活動，節省成本' },
        { title: '活動安裝團隊', description: '港島、九龍主要展覽場館和商業區提供安裝服務，桁架搭建、燈光配置一條龍' },
        { title: '夜間急件專線', description: '晚間活動或翌日晨早開幕？夜間急件專線確保您的廣告準時到位' },
      ],
    },
    buyingGuide: {
      title: '噴繪廣告選購指南',
      paragraphs: [
        '選擇噴繪材質時，首先要區分室內和戶外使用。室內活動（展覽、發布會）推薦 PP 合成紙或背膠海報，經濟且安裝方便；戶外廣告（建築圍板、橫幅）必須使用 PVC 橫幅布或網眼布，防水防曬且抗撕裂。',
        '尺寸選擇要考慮觀看距離和安裝空間。X 展架標準 60×160cm 適合展位角落；80×180cm 適合主通道。Backdrop 背景板建議高度 2.2–2.4m，確保拍照時不會露出頂部邊緣。我們提供免費場地測量和尺寸建議。',
        '解析度要求與輸出尺寸成反比。小尺寸（<1m）建議 150dpi；中尺寸（1–3m）100dpi 即可；大尺寸（>3m）72dpi 足夠。過高的解析度會增加文件大小和處理時間，不會提升實際效果。',
      ],
    },
    faq: [
      { q: 'X展架和易拉寶有什麼區別？', a: 'X展架輕便、價格低、適合短期室內使用；易拉寶自帶收納筒、便攜、畫面更平整、適合頻繁使用。' },
      { q: '戶外橫幅能使用多久？', a: 'PVC橫幅布戶外使用 1–2 年；加抗 UV 塗層可延長至 3 年。網眼布因透風性更好，壽命更長。' },
      { q: 'Backdrop 背景板最大做多大？', a: '最大寬度 3.2 米，長度無限。常見規格 3×2.2m、4×2.4m、6×3m。支持完全客製化。' },
      { q: '噴繪廣告最快多久可以取？', a: 'X展架／易拉寶即日交貨；Backdrop 1–2 天；大型橫幅 2–3 天。急件請提前告知。' },
      { q: '可以租展架嗎？', a: '可以。我們提供 X展架和易拉寶框架出租 + 畫面更換服務，適合一次性活動。' },
      { q: '戶外廣告需要申請嗎？', a: '視位置和規模而定。建築圍板一般需要屋宇署批准，街道橫幅需要食環署許可。我們可提供申請指引。' },
      { q: '噴繪畫面可以重複使用嗎？', a: '可以。妥善捲起存放於陰涼乾燥處，PVC 橫幅布可重複使用多次。但折疊存放會產生摺痕。' },
      { q: '可以提供安裝服務嗎？', a: '可以。港島、九龍主要區域提供安裝服務，包括桁架搭建、燈光配置和現場調試。' },
    ],
  },
  en: {
    h2: 'Banner & Large Format Printing Hong Kong — Waterproof & UV-Resistant, X-Stand / Roll-Up / Backdrop, Same-Day Delivery',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Banners?',
      items: [
        {
          heading: '1. Complete Outdoor Advertising Coverage: X-Stands to Building Hoardings',
          points: [
            'Full range including X-stands, roll-up banners, backdrop banners, outdoor banners, building hoardings, and lightbox films.',
            'Imported eco-solvent or UV-cured inks — waterproof, UV-resistant, 1–3 year outdoor durability.',
            'Covers high-search keywords: "banner printing Hong Kong", "outdoor banner", "backdrop rental", "X-stand printing".',
          ],
        },
        {
          heading: '2. Lightning-Fast Delivery: Print Today, Install Tomorrow',
          points: [
            'X-stands and roll-ups same-day (frame + graphic replacement). Backdrop banners in 1–2 days.',
            'Installation service available (Hong Kong Island and Kowloon major commercial areas) — truss setup and lighting included.',
            'Last-minute event addition? Confirm artwork in the morning, shipped by afternoon, installed by evening.',
          ],
        },
        {
          heading: '3. High-Precision Output: 1440dpi Detail Without Loss',
          points: [
            'Epson SureColor large-format inkjet printers with up to 1440dpi resolution for rich color and detail.',
            'Variable size output up to 3.2 meters wide, unlimited length —满足 building hoarding and other large-scale needs.',
            'Free color proofing to ensure batch-to-batch color consistency.',
          ],
        },
      ],
    },
    materialTable: {
      title: 'Material & Craftsmanship Guide',
      subtitle: 'Popular Banner Materials and Applications',
      columns: ['Material Type', 'Key Features', 'Best For'],
      rows: [
        { material: 'PP Synthetic Paper', features: 'Lightweight | Affordable | Indoor short-term | Adhesive-ready', scenarios: 'X-stands | Roll-ups | Indoor posters | Short-term events' },
        { material: 'PVC Banner Fabric', features: 'Waterproof | UV-resistant | Tear-resistant | Outdoor-grade', scenarios: 'Outdoor banners | Building hoarding | Long-term outdoor | Construction' },
        { material: 'Mesh Fabric', features: 'Wind-permeable | Wind-resistant | Large outdoor | Non-obstructive', scenarios: 'Building exteriors | Stadiums | Large events | Fencing' },
        { material: 'Lightbox Film', features: 'Semi-translucent | Color saturation | Excellent nighttime effect', scenarios: 'MTR lightboxes | Mall lightboxes | Outdoor lightboxes | Night ads' },
        { material: 'Canvas', features: 'Artistic texture | Roll-mountable | Premium display', scenarios: 'Art exhibitions | High-end events | Long-term display | Decor' },
      ],
    },
    specialOptions: {
      title: 'Special Finishing Options',
      items: [
        { name: 'Grommets & Ropes', description: 'Metal eyelets with rope for easy hanging and truss attachment.' },
        { name: 'Heat-Sealed Edges', description: 'High-temperature sealed edges prevent fabric fraying and increase durability.' },
        { name: 'Double-Sided Printing', description: 'Both sides visible when hung over pathways — maximum visibility.' },
        { name: 'Flame Retardant Treatment', description: 'Fire-rated treatment compliant with building codes for indoor exhibitions and public venues.' },
        { name: 'Anti-UV Coating', description: 'Additional UV-resistant coating extends outdoor lifespan to 3+ years.' },
        { name: 'Magnetic Backing', description: 'Reusable adhesion to ferrous surfaces — ideal for retail stores with frequently changing ads.' },
      ],
    },
    techSpecs: {
      title: 'Technical Specifications',
      items: [
        { label: 'Size Range', value: 'X-stand 60×160cm, 80×180cm; Roll-up 85×200cm; Backdrop up to 3.2m×unlimited length; Banners any size.' },
        { label: 'Minimum Order', value: '1 piece (digital printing). Volume discounts on 10+ pieces.' },
        { label: 'Turnaround', value: 'X-stand/Roll-up same day; Backdrop 1–2 days; Large banners 2–3 days; Prototyping same day.' },
        { label: 'Resolution', value: '720dpi (standard), 1440dpi (high precision). ICC color management supported.' },
        { label: 'File Requirements', value: 'AI / PDF / TIFF, 100–150dpi (depending on output size), CMYK. Source resolution ≥100dpi recommended.' },
      ],
    },
    serviceNodes: {
      title: 'Local Service Points',
      items: [
        { title: 'Stand Rental Service', description: 'X-stand and roll-up frame rental + graphic replacement — ideal for one-time events, cost-saving.' },
        { title: 'Event Installation Team', description: 'Installation at major exhibition venues and commercial areas on Hong Kong Island and Kowloon — truss and lighting included.' },
        { title: 'Night Rush Hotline', description: 'Evening event or next-morning opening? Our night rush hotline ensures your banners arrive on time.' },
      ],
    },
    buyingGuide: {
      title: 'Banner Buying Guide',
      paragraphs: [
        'When choosing banner material, first distinguish between indoor and outdoor use. Indoor events (exhibitions, launches) recommend PP synthetic paper or adhesive posters — economical and easy to install. Outdoor advertising (building hoardings, banners) must use PVC banner fabric or mesh — waterproof, UV-resistant, and tear-resistant.',
        "Size selection depends on viewing distance and installation space. Standard X-stand 60×160cm suits booth corners; 80×180cm suits main aisles. Backdrop banners recommend 2.2–2.4m height to ensure photos don't reveal the top edge. We offer free site measurement and size recommendations.",
        'Resolution requirements are inversely proportional to output size. Small sizes (<1m): 150dpi recommended; medium (1–3m): 100dpi sufficient; large (>3m): 72dpi adequate. Excessively high resolution increases file size and processing time without improving actual output.',
      ],
    },
    faq: [
      { q: "What's the difference between X-stands and roll-ups?", a: "X-stands are lightweight, lower cost, suited for short-term indoor use. Roll-ups include a carrying case, are more portable, have a flatter graphic surface, and suit frequent use." },
      { q: 'How long do outdoor banners last?', a: 'PVC banner fabric lasts 1–2 years outdoors; with anti-UV coating up to 3 years. Mesh fabric lasts longer due to wind permeability.' },
      { q: 'What is the maximum backdrop size?', a: 'Maximum width 3.2 meters, unlimited length. Common sizes: 3×2.2m, 4×2.4m, 6×3m. Fully customizable.' },
      { q: 'What is the fastest turnaround for banners?', a: 'X-stands/roll-ups same day; Backdrops 1–2 days; Large banners 2–3 days. Rush orders welcome.' },
      { q: 'Can I rent display stands?', a: 'Yes. We offer X-stand and roll-up frame rental with graphic replacement — ideal for one-time events.' },
      { q: 'Do outdoor banners require permits?', a: 'Depends on location and scale. Building hoardings generally require Buildings Department approval; street banners require FEHD permits. We provide application guidance.' },
      { q: 'Can banner graphics be reused?', a: 'Yes. Store properly rolled in a cool, dry place. PVC banner fabric can be reused multiple times. Folding storage creates creases.' },
      { q: 'Do you offer installation services?', a: 'Yes. Installation available in major areas of Hong Kong Island and Kowloon, including truss setup, lighting configuration, and on-site adjustments.' },
    ],
  },
  ja: {
    h2: '香港 バナー・大判印刷 — 防水・耐UV、Xスタンド／ロールアップ／バックドロップ、即日納品',
    coreAdvantages: {
      title: 'ZprintPro バナーの強み',
      items: [
        {
          heading: '1. 全タイプ屋外広告対応：Xスタンドから建築囲いまで',
          points: [
            'Xスタンド、ロールアップバナー、バックドロップ、屋外横断幕、建築囲い、ライトボックスフィルムなど全タイプをカバー。',
            '輸入エコソルベントまたはUV硬化インクを使用。防水・耐UVで屋外1–3年耐久。',
            '「バナー印刷 香港」、「屋外用バナー」、「バックドロップレンタル」、「Xスタンド印刷」などの高検索ボリュームキーワードをカバー。',
          ],
        },
        {
          heading: '2. 超高速納品：今日印刷、明日設置',
          points: [
            'Xスタンドとロールアップは即日（フレーム＋画面交換）。バックドロップは1–2日。',
            '香港島・九龍の主要商業地区で設置サービスを提供。トラス設置と照明配置も含むワンストップサービス。',
            'イベントの追加注文？午前中にデータ確定、午後出荷、夕方設置完了。',
          ],
        },
        {
          heading: '3. 高精度出力：1440dpiでディテールを損なわず',
          points: [
            'Epson SureColor大判インクジェットプリンターで最大1440dpiの解像度を実現。色彩とディテールが豊か。',
            '最大3.2メートル幅、長さ無制限の可変サイズ出力。建築囲いなどの大規模ニーズにも対応。',
            '無料色彩校正でロット間の色彩一致性を確保。',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質・工法ガイド',
      subtitle: 'バナーによく使われる材質と用途',
      columns: ['材質タイプ', '主な特徴', '最適な用途'],
      rows: [
        { material: 'PP合成紙', features: '軽量｜手頃｜屋内短期｜粘着可', scenarios: 'Xスタンド｜ロールアップ｜屋内ポスター｜短期イベント' },
        { material: 'PVC横断幕生地', features: '防水・耐UV｜耐裂｜屋外用', scenarios: '屋外横断幕｜建築囲い｜長期屋外｜工事現場' },
        { material: 'メッシュ生地', features: '風通し｜耐風圧｜大型屋外｜視界を遮らない', scenarios: '建物外壁｜スタジアム｜大型イベント｜フェンス' },
        { material: 'ライトボックス用フィルム', features: '半透光｜色彩飽和｜夜間効果抜群', scenarios: '地下鉄ライトボックス｜商場｜屋外ライトボックス｜夜間広告' },
        { material: 'キャンバス', features: '芸術的質感｜掛軸可｜高級展示', scenarios: '美術展｜高級イベント｜長期展示｜装飾' },
      ],
    },
    specialOptions: {
      title: '特殊加工オプション',
      items: [
        { name: 'ハトメ＆ロープ', description: '金属製ハトメにロープを通し、吊り下げやトラス固定が簡単に。' },
        { name: '熱溶着縁', description: '高温で縁を溶着し、生地のほつれを防止して耐久性を向上。' },
        { name: '両面印刷', description: '通路上方に吊るす場合、表裏両方が見えて視認性が最大化。' },
        { name: '難燃処理', description: '消防条例に準拠した難燃処理。屋内展示や公共施設に最適。' },
        { name: '抗UVコーティング', description: '追加の抗UVコーティングで屋外使用寿命を3年以上に延長。' },
        { name: '磁気粘着', description: '鉄質表面に繰り返し貼付可能。広告を頻繁に変更する店舗に最適。' },
      ],
    },
    techSpecs: {
      title: '技術仕様',
      items: [
        { label: 'サイズ範囲', value: 'Xスタンド 60×160cm、80×180cm；ロールアップ 85×200cm；バックドロップ最大3.2m×無制限；横断幕任意サイズ' },
        { label: '最小発注数', value: '1個から（デジタル印刷）。10個以上で大口割引。' },
        { label: '納期', value: 'Xスタンド／ロールアップ即日。バックドロップ1–2日。大型横断幕2–3日。サンプル当日。' },
        { label: '解像度', value: '720dpi（標準）、1440dpi（高精度）。ICC色彩管理対応。' },
        { label: 'ファイル要件', value: 'AI／PDF／TIFF、100–150dpi（出力サイズにより異なる）、CMYK。原図解像度≥100dpiを推奨。' },
      ],
    },
    serviceNodes: {
      title: 'ローカルサービス拠点',
      items: [
        { title: 'スタンドレンタルサービス', description: 'Xスタンドとロールアップのフレームレンタル＋画面交換。一度きりのイベントに最適でコスト削減。' },
        { title: 'イベント設置チーム', description: '香港島・九龍の主要展示会場と商業地区で設置サービスを提供。トラスと照明も含むワンストップ。' },
        { title: '夜間急行ホットライン', description: '夜間イベントや翌朝のオープニング？夜間急行ホットラインでバナーを間に合わせます。' },
      ],
    },
    buyingGuide: {
      title: 'バナー選び方ガイド',
      paragraphs: [
        'バナーの材質を選ぶ際、まず屋内と屋外の使用を区別しましょう。屋内イベント（展示会、発表会）にはPP合成紙や粘着ポスターがおすすめで、経済的かつ設置が簡単です。屋外広告（建築囲い、横断幕）にはPVC横断幕生地またはメッシュ生地を使用する必要があります。防水・耐UVで耐裂性があります。',
        'サイズ選択は視認距離と設置スペースによって異なります。Xスタンド標準60×160cmはブースの隅に適しています。80×180cmはメイン通路に適しています。バックドロップバナーは高さ2.2–2.4mを推奨し、写真撮影時に上端が見えないようにします。無料現場測定とサイズ提案をご利用ください。',
        '解像度要件は出力サイズに反比例します。小さいサイズ（<1m）は150dpiを推奨。中サイズ（1–3m）は100dpiで十分。大サイズ（>3m）は72dpiで十分です。過度に高い解像度はファイルサイズと処理時間を増やすだけで、実際の出力品質は向上しません。',
      ],
    },
    faq: [
      { q: 'Xスタンドとロールアップの違いは？', a: 'Xスタンドは軽量で低価格、短期屋内使用に適しています。ロールアップは専用ケース付きで持ち運びが簡単、画面がよりフラットで、頻繁な使用に適しています。' },
      { q: '屋外横断幕の寿命は？', a: 'PVC横断幕生地は屋外で1–2年。抗UVコーティングで3年以上延長可能。メッシュ生地は風通しが良いため寿命がより長いです。' },
      { q: 'バックドロップの最大サイズは？', a: '最大幅3.2メートル、長さ無制限。一般的なサイズ：3×2.2m、4×2.4m、6×3m。完全カスタマイズ対応。' },
      { q: 'バナーの最短納期は？', a: 'Xスタンド／ロールアップは即日。バックドロップは1–2日。大型横断幕は2–3日。急行注文も受け付けています。' },
      { q: 'スタンドをレンタルできますか？', a: 'はい。Xスタンドとロールアップのフレームレンタル＋画面交換サービスを提供。一度きりのイベントに最適です。' },
      { q: '屋外広告に許可は必要ですか？', a: '場所と規模により異なります。建築囲いは一般的に建築署の承認が必要。街路横断幕は食環署の許可が必要です。申請ガイドを提供します。' },
      { q: 'バナー画面は再利用できますか？', a: 'はい。適切に巻いて陰涼な場所に保管すれば、PVC横断幕生地は何度も再利用可能です。ただし折りたたむと折り目が付きます。' },
      { q: '設置サービスはありますか？', a: 'はい。香港島・九龍の主要地区で設置サービスを提供。トラス設置、照明配置、現場調整も含みます。' },
    ],
  },
};


// =============================================================================
// 8. BOOKS — 書籍印刷
// =============================================================================
const booksContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    h2: '香港書籍印刷 — 騎馬釘／膠裝／精裝，1本起訂，專業排版',
    coreAdvantages: {
      title: '核心競爭優勢',
      items: [
        {
          heading: '1. 全裝訂方式覆蓋：騎馬釘到精裝書一站式',
          points: [
            '提供騎馬釘、無線膠裝、鎖線膠裝、精裝書（硬殼封面）、YO 圈裝、蝴蝶裝等全裝訂方式',
            '滿足「書籍印刷 香港」、「印書」、「膠裝書」、「精裝書」等高搜索量關鍵詞',
            '適用於企業年報、產品目錄、畫冊、小說、教材、畢業紀念冊等多元場景',
          ],
        },
        {
          heading: '2. 小批量友好：1 本起訂，數碼印刷按需生產',
          points: [
            '1 本起訂（數碼印刷），適合自費出版、企業試產、限量畫冊',
            '100 本以上柯式印刷更經濟，色彩更準確，適合大量發行',
            '支持可變數據印刷，每本書可以印不同內容（個性化教材、定制年報）',
          ],
        },
        {
          heading: '3. 專業排版 + 色彩管理，確保印刷品質',
          points: [
            '專業排版團隊提供 InDesign / QuarkXPress 排版服務，符合出版業標準',
            'ICC 色彩管理系統確保螢幕所見即印刷所得，攝影畫冊和藝術複製效果極佳',
            '免費印前檢查：文字轉曲線、圖片解析度、出血位、裝訂安全距離全檢查',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質工藝詳解',
      subtitle: '書籍常用紙張與裝訂方式',
      columns: ['裝訂方式', '關鍵特性', '適用場景'],
      rows: [
        { material: '騎馬釘', features: '經濟｜展開平整｜適合薄書（<64頁）', scenarios: '場刊｜說明書｜雜誌｜薄畫冊' },
        { material: '無線膠裝', features: '書脊平整｜可平攤｜適合中厚書', scenarios: '企業年報｜產品目錄｜小說｜教材' },
        { material: '鎖線膠裝', features: '耐久度高｜不易散頁｜可完全平攤', scenarios: '精裝畫冊｜藝術書｜攝影集｜工具書' },
        { material: '精裝書', features: '硬殼封面｜高級質感｜耐久 10 年＋', scenarios: '限量版｜紀念冊｜品牌畫冊｜收藏書' },
        { material: 'YO 圈裝', features: '可完全翻轉｜便於書寫｜可重複裝訂', scenarios: '筆記本｜手帳｜工作簿｜菜單' },
      ],
    },
    specialOptions: {
      title: '特殊加工選項',
      items: [
        { name: '封面燙金／燙銀', description: '書名或 LOGO 局部金屬光澤，提升高級感和收藏價值' },
        { name: '封面凹凸壓紋', description: '圖案或文字立體浮凸，無需油墨即可呈現質感' },
        { name: 'UV 局部上光', description: '封面重點圖案高光凸顯，觸感立體' },
        { name: '書腰設計', description: '書籍中部的裝飾腰帶，可印推薦語、作者介紹、獲獎信息' },
        { name: '防塵套', description: '精裝書專用透明防塵套，保護封面免受磨損' },
        { name: '索引標籤', description: '書側彩色索引標籤，方便快速查找章節，適合教材和工具書' },
      ],
    },
    techSpecs: {
      title: '技術參數詳解',
      items: [
        { label: '尺寸範圍', value: 'A5(148×210mm)、B5(176×250mm)、A4(210×297mm)、正方形(210×210mm)，支持完全客製化' },
        { label: '起訂量', value: '1 本起訂（數碼印刷），100 本以上柯式印刷更經濟' },
        { label: '交期', value: '數碼印刷 2–3 天；柯式印刷 5–7 天；精裝書 7–10 天；打樣 2–3 天' },
        { label: '檔案要求', value: 'InDesign / PDF，300dpi，CMYK，預留 3mm 出血位，裝訂安全距離 ≥5mm' },
        { label: '紙張選擇', value: '內頁：80g–157g 書紙／銅版紙；封面：200g–350g 銅版紙／特種紙' },
      ],
    },
    serviceNodes: {
      title: '本地化服務節點',
      items: [
        { title: '專業排版服務', description: '資深排版師提供 InDesign 專業排版，符合出版業標準，支持複雜圖表和多欄排版' },
        { title: '免費印前檢查', description: '文字轉曲線、圖片解析度、出血位、裝訂安全距離全面檢查，避免印刷錯誤' },
        { title: 'ISBN 申請協助', description: '協助自費出版作者申請香港 ISBN，提供出版諮詢和法律合規指導' },
      ],
    },
    buyingGuide: {
      title: '書籍印刷選購指南',
      paragraphs: [
        '選擇裝訂方式時，首先要考慮頁數和用途。少於 64 頁的薄書推薦騎馬釘，經濟且展開平整；64–200 頁的書推薦無線膠裝，書脊平整且可平攤；超過 200 頁或需要長期收藏的書推薦鎖線膠裝或精裝書，耐久度最高。',
        '紙張選擇影響閱讀體驗和成本。文字為主的書（小說、教材）推薦 80g–100g 書紙，輕便且閱讀舒適；圖片為主的書（畫冊、攝影集）推薦 128g–157g 銅版紙，色彩還原極佳。封面建議 250g 以上，配合覆膜或燙金工藝提升質感。',
        '文件準備是書籍印刷的關鍵。請確保所有文字已轉曲線或嵌入字體，圖片解析度 ≥300dpi，預留 3mm 出血位，裝訂邊留出 ≥5mm 安全距離。如果不確定，我們的印前團隊會免費檢查並提供修改建議。',
      ],
    },
    faq: [
      { q: '書籍印刷最低多少本起？', a: '1 本起訂（數碼印刷）。100 本以上柯式印刷更經濟，色彩更準確。' },
      { q: '書籍有哪些裝訂方式？', a: '騎馬釘、無線膠裝、鎖線膠裝、精裝書、YO 圈裝、蝴蝶裝。根據頁數和用途選擇最適方式。' },
      { q: '書籍印刷需要多久？', a: '數碼印刷 2–3 天；柯式印刷 5–7 天；精裝書 7–10 天。急件請提前告知。' },
      { q: '可以幫忙排版嗎？', a: '可以。專業排版團隊提供 InDesign 排版服務，符合出版業標準。' },
      { q: '書籍設計文件有什麼要求？', a: 'InDesign / PDF，300dpi，CMYK，3mm 出血位，裝訂安全距離 ≥5mm。文字轉曲線或嵌入字體。' },
      { q: '可以申請 ISBN 嗎？', a: '可以。我們協助自費出版作者申請香港 ISBN，提供出版諮詢和法律合規指導。' },
      { q: '攝影畫冊用什麼紙張最好？', a: '推薦 157g 銅版紙或 200g 哑粉紙，配合 ICC 色彩管理，確保照片色彩準確還原。' },
      { q: '精裝書和膠裝書有什麼區別？', a: '精裝書有硬殼封面，耐久度最高，適合收藏；膠裝書書脊平整，成本較低，適合一般閱讀。' },
    ],
  },
  en: {
    h2: 'Book Printing Hong Kong — Saddle-Stitch / Perfect Bound / Hardcover, From 1 Copy, Professional Typesetting',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Books?',
      items: [
        {
          heading: '1. Complete Binding Coverage: Saddle-Stitch to Hardcover',
          points: [
            'Full range: saddle-stitch, perfect binding, sewn binding, hardcover (case bound), wire-o binding, butterfly binding.',
            'Covers high-search keywords: "book printing Hong Kong", "self publishing", "perfect bound books", "hardcover printing".',
            'Ideal for annual reports, product catalogs, art books, novels, textbooks, and graduation yearbooks.',
          ],
        },
        {
          heading: '2. Small-Batch Friendly: From 1 Copy, Digital On-Demand',
          points: [
            '1 copy minimum (digital printing) — ideal for self-publishing, corporate prototyping, and limited art editions.',
            '100+ copies benefit from offset printing for better economy and color accuracy.',
            'Variable data printing supported — each book can have unique content (personalized textbooks, custom annual reports).',
          ],
        },
        {
          heading: '3. Professional Typesetting + Color Management',
          points: [
            'Professional typesetting team provides InDesign / QuarkXPress layout services meeting publishing industry standards.',
            'ICC color management ensures what you see on screen matches the printed output — excellent for photography books and art reproductions.',
            'Free prepress check: text outlining, image resolution, bleed, and binding safety margins all verified.',
          ],
        },
      ],
    },
    materialTable: {
      title: 'Material & Craftsmanship Guide',
      subtitle: 'Common Book Papers and Binding Methods',
      columns: ['Binding Method', 'Key Features', 'Best For'],
      rows: [
        { material: 'Saddle-Stitch', features: 'Economical | Lays flat open | Best for thin books (<64pp)', scenarios: 'Programs | Manuals | Magazines | Thin catalogs' },
        { material: 'Perfect Binding', features: 'Spine is flat | Can lay open | Good for medium thickness', scenarios: 'Annual reports | Product catalogs | Novels | Textbooks' },
        { material: 'Sewn Binding', features: "High durability | Pages won't fall out | Fully lays flat", scenarios: 'Premium art books | Photography collections | Art books | Reference books' },
        { material: 'Hardcover', features: 'Rigid cover | Premium feel | 10+ year durability', scenarios: 'Limited editions | Commemorative books | Brand catalogs | Collectibles' },
        { material: 'Wire-O Binding', features: 'Fully flips over | Easy to write in | Rebindable', scenarios: 'Notebooks | Journals | Workbooks | Menus' },
      ],
    },
    specialOptions: {
      title: 'Special Finishing Options',
      items: [
        { name: 'Cover Foil Stamping', description: 'Metallic sheen on titles or logos — enhances premium feel and collectible value.' },
        { name: 'Cover Embossing', description: 'Three-dimensional patterns or text without ink — pure tactile elegance.' },
        { name: 'Spot UV on Cover', description: 'Glossy raised highlights on key visuals for tactile impact.' },
        { name: 'Dust Jacket', description: 'Decorative band around hardcover books for recommendations, author bios, and awards.' },
        { name: 'Protective Slipcase', description: 'Transparent protective cover for hardcovers — shields against wear and tear.' },
        { name: 'Index Tabs', description: 'Color-coded side tabs for quick chapter lookup — ideal for textbooks and reference books.' },
      ],
    },
    techSpecs: {
      title: 'Technical Specifications',
      items: [
        { label: 'Size Range', value: 'A5(148×210mm), B5(176×250mm), A4(210×297mm), Square(210×210mm). Fully customizable.' },
        { label: 'Minimum Order', value: '1 copy (digital printing). 100+ recommended for offset (more economical).' },
        { label: 'Turnaround', value: 'Digital: 2–3 days; Offset: 5–7 days; Hardcover: 7–10 days; Prototyping: 2–3 days.' },
        { label: 'File Requirements', value: 'InDesign / PDF, 300dpi, CMYK, 3mm bleed, binding safety margin ≥5mm.' },
        { label: 'Paper Options', value: 'Interior: 80g–157g book / art paper. Cover: 200g–350g art / specialty paper.' },
      ],
    },
    serviceNodes: {
      title: 'Local Service Points',
      items: [
        { title: 'Professional Typesetting', description: 'Senior typesetters provide InDesign professional layout meeting publishing standards, supporting complex charts and multi-column layouts.' },
        { title: 'Free Prepress Check', description: 'Comprehensive verification of text outlining, image resolution, bleed, and binding safety margins to prevent printing errors.' },
        { title: 'ISBN Application Assistance', description: 'We assist self-publishing authors with Hong Kong ISBN applications, providing publishing consultation and legal compliance guidance.' },
      ],
    },
    buyingGuide: {
      title: 'Book Printing Buying Guide',
      paragraphs: [
        'When choosing a binding method, first consider page count and usage. Books under 64 pages suit saddle-stitch — economical and lays flat. Books 64–200 pages suit perfect binding with a flat spine that opens well. Books over 200 pages or requiring long-term collection benefit from sewn binding or hardcover for maximum durability.',
        'Paper selection affects reading experience and cost. Text-heavy books (novels, textbooks) suit 80g–100g book paper — lightweight and comfortable to read. Image-heavy books (art catalogs, photography collections) suit 128g–157g art paper for excellent color reproduction. Covers recommend 250g+ with lamination or foil stamping for enhanced quality.',
        'File preparation is critical for book printing. Ensure all text is outlined or fonts are embedded, images are ≥300dpi, 3mm bleed is provided, and binding edges have ≥5mm safety margin. If unsure, our prepress team checks for free and provides modification suggestions.',
      ],
    },
    faq: [
      { q: 'What is the minimum order for books?', a: '1 copy (digital printing). 100+ copies recommended for offset printing with better color accuracy.' },
      { q: 'What binding methods are available?', a: 'Saddle-stitch, perfect binding, sewn binding, hardcover, wire-o binding, butterfly binding. Choose based on page count and usage.' },
      { q: 'How long does book printing take?', a: 'Digital: 2–3 days; Offset: 5–7 days; Hardcover: 7–10 days. Rush orders welcome.' },
      { q: 'Do you offer typesetting services?', a: 'Yes. Professional typesetting team provides InDesign layout services meeting publishing industry standards.' },
      { q: 'What are the file requirements for books?', a: 'InDesign / PDF, 300dpi, CMYK, 3mm bleed, binding safety margin ≥5mm. Text outlined or fonts embedded.' },
      { q: 'Can you help with ISBN applications?', a: 'Yes. We assist self-publishing authors with Hong Kong ISBN applications and provide publishing consultation.' },
      { q: 'What paper is best for photography books?', a: 'Recommend 157gsm art paper or 200gsm matte paper with ICC color management for accurate photo color reproduction.' },
      { q: 'What is the difference between hardcover and paperback?', a: 'Hardcover has a rigid cover with highest durability for collections; paperback has a flat spine, lower cost, suited for general reading.' },
    ],
  },
  ja: {
    h2: '香港 書籍印刷 — 中綴じ／無線綴じ／上製本、1冊から、プロ組版',
    coreAdvantages: {
      title: 'ZprintPro 書籍印刷の強み',
      items: [
        {
          heading: '1. 全製本方式対応：中綴じから上製本まで',
          points: [
            '中綴じ、無線綴じ、糸かがり綴じ、上製本（ハードカバー）、ワイヤー-O綴じ、袋とじなど全製本方式を提供。',
            '「書籍印刷 香港」、「自費出版」、「無線綴じ」、「上製本」などの高検索ボリュームキーワードをカバー。',
            '企業年次報告書、製品カタログ、画集、小説、教材、卒業記念冊など多様なシーンに対応。',
          ],
        },
        {
          heading: '2. 小ロット対応：1冊から、デジタルオンデマンド',
          points: [
            '1冊から（デジタル印刷）。自費出版、企業試作、限定画集に最適。',
            '100冊以上はオフセット印刷がお得で、色彩もより正確。',
            '可変データ印刷に対応。1冊ずつ異なる内容が可能（パーソナライズ教材、カスタム年次報告書）。',
          ],
        },
        {
          heading: '3. プロ組版＋色彩管理で印刷品質を保証',
          points: [
            'プロの組版チームがInDesign／QuarkXPressで出版業界基準の組版サービスを提供。',
            'ICC色彩管理システムで画面で見た通りの印刷仕上がりを実現。写真集やアート複製にも最適。',
            '無料印前チェック：文字のアウトライン化、画像解像度、bleed、綴じ安全距離を全面チェック。',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質・工法ガイド',
      subtitle: '書籍によく使われる紙と製本方式',
      columns: ['製本方式', '主な特徴', '最適な用途'],
      rows: [
        { material: '中綴じ', features: '手頃｜開きが良い｜薄い本（<64P）向き', scenarios: 'プログラム｜説明書｜雑誌｜薄いカタログ' },
        { material: '無線綴じ', features: '背が平ら｜開きやすい｜中厚の本向き', scenarios: '年次報告書｜カタログ｜小説｜教材' },
        { material: '糸かがり綴じ', features: '高耐久｜散りにくい｜完全に開ける', scenarios: '高級画集｜アートブック｜写真集｜辞書' },
        { material: '上製本', features: '硬い表紙｜高級感｜10年＋耐久', scenarios: '限定版｜記念刊｜ブランド画集｜コレクション' },
        { material: 'ワイヤー-O綴じ', features: '完全に反転｜書きやすい｜再綴じ可能', scenarios: 'ノート｜手帳｜ワークブック｜メニュー' },
      ],
    },
    specialOptions: {
      title: '特殊加工オプション',
      items: [
        { name: '表紙箔押し', description: '書名やロゴに金属光沢の高級感。コレクション価値を高めます。' },
        { name: '表紙エンボス', description: 'インクなしでパターンや文字を立体的に表現。' },
        { name: '表紙局部UV', description: '重要なビジュアルを光沢で強調し、触感も立体的に。' },
        { name: '帯デザイン', description: '書籍中央の装飾帯。推薦文、著者紹介、受賞情報を印刷。' },
        { name: '透明カバー', description: '上製本専用の透明防塵カバー。表紙の摩耗を防ぎます。' },
        { name: '索引タブ', description: '書籍側面のカラー索引タブ。章の素早い検索が可能。教材や辞書に最適。' },
      ],
    },
    techSpecs: {
      title: '技術仕様',
      items: [
        { label: 'サイズ範囲', value: 'A5(148×210mm)、B5(176×250mm)、A4(210×297mm)、正方形(210×210mm)。完全カスタマイズ対応。' },
        { label: '最小発注数', value: '1冊から（デジタル印刷）。100冊以上はオフセット印刷がお得。' },
        { label: '納期', value: 'デジタル印刷2–3日。オフセット印刷5–7日。上製本7–10日。サンプル2–3日。' },
        { label: 'ファイル要件', value: 'InDesign／PDF、300dpi、CMYK、3mmのbleed、綴じ安全距離≥5mm。' },
        { label: '紙の選択', value: '本文：80g–157g書籍紙／コート紙。表紙：200g–350gコート紙／特殊紙。' },
      ],
    },
    serviceNodes: {
      title: 'ローカルサービス拠点',
      items: [
        { title: 'プロ組版サービス', description: 'ベテラン組版師がInDesignで出版業界基準の組版を提供。複雑な図表や多段組みも対応。' },
        { title: '無料印前チェック', description: '文字のアウトライン化、画像解像度、bleed、綴じ安全距離を全面チェックし、印刷ミスを防止。' },
        { title: 'ISBN申請サポート', description: '自費出版者の香港ISBN申請をサポート。出版相談と法律コンプライアンス指導も提供。' },
      ],
    },
    buyingGuide: {
      title: '書籍印刷選び方ガイド',
      paragraphs: [
        '製本方式を選ぶ際、まずページ数と用途を考慮しましょう。64ページ未満の薄い本には中綴じがおすすめで、手頃で開きが良いです。64–200ページの本には無線綴じが適し、背が平らで開きやすいです。200ページ以上や長期保存が必要な本には糸かがり綴じまたは上製本が最適で、耐久性が最も高いです。',
        '紙の選択は読書体験とコストに影響します。文字中心の本（小説、教材）には80g–100gの書籍紙が適しています。軽量で読みやすいです。画像中心の本（画集、写真集）には128g–157gのコート紙がおすすめで、色彩再現が抜群です。表紙は250g以上を推奨し、ラミネートや箔押し加工で質感を高めます。',
        'ファイル準備は書籍印刷の鍵です。すべての文字がアウトライン化またはフォントが埋め込まれていることを確認し、画像解像度は≥300dpi、3mmのbleed、綴じ辺には≥5mmの安全距離を設けてください。不安な場合は、当社の印前チームが無料でチェックし、修正提案をいたします。',
      ],
    },
    faq: [
      { q: '書籍印刷の最小発注数は？', a: '1冊から（デジタル印刷）。100冊以上はオフセット印刷がお得で、色彩もより正確です。' },
      { q: 'どんな製本方式がありますか？', a: '中綴じ、無線綴じ、糸かがり綴じ、上製本、ワイヤー-O綴じ、袋とじ。ページ数と用途に応じて最適な方式を選びます。' },
      { q: '書籍印刷にどのくらいかかりますか？', a: 'デジタル印刷2–3日。オフセット印刷5–7日。上製本7–10日。急行注文も受け付けています。' },
      { q: '組版サービスはありますか？', a: 'はい。プロの組版チームがInDesignで出版業界基準の組版サービスを提供します。' },
      { q: '書籍のファイル要件は？', a: 'InDesign／PDF、300dpi、CMYK、3mmのbleed、綴じ安全距離≥5mm。文字はアウトライン化またはフォントを埋め込み。' },
      { q: 'ISBNの申請を手伝ってもらえますか？', a: 'はい。自費出版者の香港ISBN申請をサポートし、出版相談と法律コンプライアンス指導を提供します。' },
      { q: '写真集に最適な紙は？', a: '157gコート紙または200gマット紙を推奨。ICC色彩管理で写真の色彩を正確に再現します。' },
      { q: '上製本とペーパーバックの違いは？', a: '上製本は硬い表紙で耐久性が最も高く、コレクション向き。ペーパーバックは背が平らでコストが低く、一般読書向き。' },
    ],
  },
};

// =============================================================================
// 9. MENUS — 餐牌印刷
// =============================================================================
const menusContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    h2: '香港餐牌印刷 — 防水防油，PVC／過膠／硬膠，餐廳 Menu 專家',
    coreAdvantages: {
      title: '核心競爭優勢',
      items: [
        {
          heading: '1. 餐廳 Menu 專家：防水防油，耐用易清潔',
          points: [
            '提供 PVC 餐牌、過膠餐牌、硬膠套餐牌、皮革餐牌、木質餐牌等多種材質，滿足不同餐廳風格',
            '防水防油處理，湯汁和油漬一擦即淨，延長使用壽命 3–5 倍',
            '滿足「餐牌印刷 香港」、「Menu 印刷」、「餐廳 Menu 設計」、「防水餐牌」等高搜索量關鍵詞',
          ],
        },
        {
          heading: '2. 小批量靈活起訂，新開餐廳首選',
          points: [
            '10 份起訂（數碼印刷），適合新開餐廳試營運和季節性菜單更新',
            '支持可變數據印刷，每份餐牌可以印不同價格（分店差異定價）或不同語言（中英日對照）',
            '即日印刷速遞送貨，菜單更新不再耽誤營業',
          ],
        },
        {
          heading: '3. 專業設計 + 食物攝影，提升點餐率',
          points: [
            '專業餐牌設計師深谙食物心理學，通過排版和色彩引導顧客點選高利潤菜品',
            '提供食物攝影服務（另計），專業燈光和構圖讓菜品看起來更美味',
            'QR Code 電子菜單整合，顧客掃描即可查看完整菜單和圖片，減少印刷成本',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質工藝詳解',
      subtitle: '餐牌常用材質與應用',
      columns: ['材質類型', '關鍵特性', '適用場景'],
      rows: [
        { material: 'PVC 餐牌', features: '防水防油｜耐用｜可擦洗｜經濟', scenarios: '茶餐廳｜快餐店｜咖啡廳｜酒樓' },
        { material: '過膠餐牌', features: '紙張過膠｜防水防污｜色彩保護', scenarios: '西餐廳｜甜品店｜酒吧｜高級餐廳' },
        { material: '硬膠套餐牌', features: '硬質保護｜可更換內頁｜長期使用', scenarios: '連鎖餐廳｜酒店｜會所｜定期更新菜單' },
        { material: '皮革餐牌', features: '高級質感｜耐用｜品牌提升', scenarios: '高級西餐｜日本料理｜私人會所｜精品咖啡' },
        { material: '木質餐牌', features: '自然質感｜獨特風格｜環保', scenarios: '文青咖啡｜手作甜品｜有機餐廳｜特色酒吧' },
      ],
    },
    specialOptions: {
      title: '特殊加工選項',
      items: [
        { name: '圓角裁切', description: '避免尖角刮傷顧客，提升安全性和美觀度' },
        { name: '打洞穿繩', description: '頂部或側面打洞穿繩，方便懸掛或裝訂成冊' },
        { name: '燙金／燙銀', description: '餐廳名稱或標語局部金屬光澤，提升高級感' },
        { name: 'QR Code 電子菜單', description: '掃描進入電子菜單，減少印刷成本，支持實時更新價格和菜品' },
        { name: '多語言對照', description: '中英文、中日文對照，方便不同顧客群體點餐' },
        { name: '可更換內頁', description: '硬膠套或活頁夾設計，方便隨時更換單頁菜單' },
      ],
    },
    techSpecs: {
      title: '技術參數詳解',
      items: [
        { label: '標準尺寸', value: 'A4(210×297mm)、A5(148×210mm)、DL(99×210mm)、正方形(150×150mm)，支持完全客製化' },
        { label: '起訂量', value: '10 份起訂（數碼印刷），100 份以上柯式印刷更經濟' },
        { label: '交期', value: '即日交貨（數碼，10–50 份）；標準 2–3 天（柯式）；打樣當日完成' },
        { label: '檔案要求', value: 'AI / PDF / PSD，300dpi，CMYK，預留 3mm 出血位' },
        { label: '防水等級', value: 'PVC 和過膠餐牌達 IPX4 防水等級，可承受潑濺和擦拭' },
      ],
    },
    serviceNodes: {
      title: '本地化服務節點',
      items: [
        { title: '免費餐牌設計諮詢', description: '專業餐牌設計師提供排版建議，通過食物心理學提升點餐率和客單價' },
        { title: '食物攝影服務', description: '專業食物攝影師上門拍攝，專業燈光和構圖讓菜品看起來更美味（另計）' },
        { title: '急件專線', description: '餐廳開業或菜單更新刻不容緩？急件專線確保您的餐牌準時到位' },
      ],
    },
    buyingGuide: {
      title: '餐牌選購指南',
      paragraphs: [
        '選擇餐牌材質時，首先要考慮餐廳類型和使用頻率。快餐店和茶餐廳推薦 PVC 餐牌，防水防油且經濟；西餐廳和甜品店推薦過膠餐牌，色彩鮮豔且易清潔；高級餐廳推薦皮革或木質餐牌，提升品牌格調。',
        '餐牌設計要遵循食物心理學原則。將高利潤菜品放在視覺焦點位置（右上角或中心）；使用高品質食物照片可提升點餐率 30% 以上；避免過多文字，每道菜控制在 20 字以內。我們的設計師深谙這些原則。',
        '考慮到疫情後的無接觸趨勢，建議在實體餐牌上添加 QR Code 電子菜單。顧客掃描後可查看完整菜單、圖片和營養信息，減少實體餐牌的更換頻率和印刷成本。',
      ],
    },
    faq: [
      { q: '餐牌印刷最低多少份起？', a: '10 份起訂（數碼印刷）。100 份以上柯式印刷更經濟。' },
      { q: '餐牌有哪些材質可選？', a: 'PVC 餐牌、過膠餐牌、硬膠套餐牌、皮革餐牌、木質餐牌。不同材質適合不同餐廳風格。' },
      { q: '餐牌防水嗎？', a: 'PVC 和過膠餐牌達 IPX4 防水等級，可承受湯汁潑濺和油漬擦拭。' },
      { q: '可以幫忙設計餐牌嗎？', a: '可以。專業餐牌設計師提供排版服務，通過食物心理學提升點餐率。' },
      { q: '餐牌最快多久可以取？', a: '數碼印刷即日交貨（10–50 份）；柯式印刷標準 2–3 天。急件請提前告知。' },
      { q: '可以印多語言菜單嗎？', a: '可以。支持中英文、中日文對照，以及可變數據印刷（不同分店不同價格）。' },
      { q: 'QR Code 電子菜單怎麼做？', a: '我們可以為您生成 QR Code 並連結到電子菜單頁面，支持實時更新價格和菜品。' },
      { q: '餐牌可以更改內頁嗎？', a: '可以。硬膠套或活頁夾設計的餐牌可以隨時更換單頁，適合季節性菜單更新。' },
    ],
  },
  en: {
    h2: 'Menu Printing Hong Kong — Waterproof & Oil-Resistant, PVC / Laminated / Hard Plastic, Restaurant Menu Specialists',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Menus?',
      items: [
        {
          heading: '1. Restaurant Menu Specialists: Waterproof, Oil-Resistant, Durable & Easy to Clean',
          points: [
            'PVC menus, laminated menus, hard plastic sleeve menus, leather menus, and wooden menus — matching every restaurant style.',
            'Waterproof and oil-resistant treatment — soup and grease wipe clean instantly, extending lifespan 3–5x.',
            'Covers high-search keywords: "menu printing Hong Kong", "restaurant menu design", "waterproof menu", "cafe menu printing".',
          ],
        },
        {
          heading: '2. Low MOQ, Ideal for New Restaurants',
          points: [
            '10 copies minimum (digital printing) — perfect for new restaurant soft openings and seasonal menu updates.',
            'Variable data printing supported — each menu can have different prices (branch-specific pricing) or languages (Chinese/English/Japanese).',
            'Same-day printing and dispatch — menu updates never delay business.',
          ],
        },
        {
          heading: '3. Professional Design + Food Photography, Boosting Order Rates',
          points: [
            'Professional menu designers understand food psychology, using layout and color to guide customers toward high-margin dishes.',
            'Food photography service available (separate fee) — professional lighting and composition makes dishes look more appetizing.',
            'QR code digital menu integration — customers scan to view full menus and photos, reducing printing costs.',
          ],
        },
      ],
    },
    materialTable: {
      title: 'Material & Craftsmanship Guide',
      subtitle: 'Popular Menu Materials and Applications',
      columns: ['Material Type', 'Key Features', 'Best For'],
      rows: [
        { material: 'PVC Menus', features: 'Waterproof | Oil-resistant | Durable | Wipeable | Affordable', scenarios: 'Cha chaan teng | Fast food | Cafes | Restaurants' },
        { material: 'Laminated Menus', features: 'Paper with lamination | Waterproof | Stain-resistant | Color protection', scenarios: 'Western restaurants | Dessert shops | Bars | Fine dining' },
        { material: 'Hard Plastic Sleeve', features: 'Rigid protection | Replaceable inserts | Long-term use', scenarios: 'Chain restaurants | Hotels | Clubs | Regular menu updates' },
        { material: 'Leather Menus', features: 'Premium feel | Durable | Brand elevation', scenarios: 'Fine dining | Japanese cuisine | Private clubs | Boutique cafes' },
        { material: 'Wooden Menus', features: 'Natural texture | Unique style | Eco-friendly', scenarios: 'Hipster cafes | Handmade desserts | Organic restaurants | Specialty bars' },
      ],
    },
    specialOptions: {
      title: 'Special Finishing Options',
      items: [
        { name: 'Rounded Corners', description: 'Prevents sharp corners from scratching customers — safer and more elegant.' },
        { name: 'Hole Punching', description: 'Top or side holes for easy hanging or binding into booklets.' },
        { name: 'Foil Stamping', description: 'Metallic sheen on restaurant name or tagline for a premium feel.' },
        { name: 'QR Code Digital Menu', description: 'Scan to access digital menu — reduce printing costs with real-time price and dish updates.' },
        { name: 'Multi-Language', description: 'Chinese/English or Chinese/Japanese side-by-side for diverse customer groups.' },
        { name: 'Replaceable Inserts', description: 'Hard plastic sleeves or binder design for easy single-page menu updates.' },
      ],
    },
    techSpecs: {
      title: 'Technical Specifications',
      items: [
        { label: 'Standard Sizes', value: 'A4(210×297mm), A5(148×210mm), DL(99×210mm), Square(150×150mm). Fully customizable.' },
        { label: 'Minimum Order', value: '10 copies (digital printing). 100+ recommended for offset (more economical).' },
        { label: 'Turnaround', value: 'Same-day (digital, 10–50 copies); Standard 2–3 days (offset); Prototyping same day.' },
        { label: 'File Requirements', value: 'AI / PDF / PSD, 300dpi, CMYK, 3mm bleed.' },
        { label: 'Waterproof Rating', value: 'PVC and laminated menus achieve IPX4 waterproof rating — withstands splashes and wiping.' },
      ],
    },
    serviceNodes: {
      title: 'Local Service Points',
      items: [
        { title: 'Free Menu Design Consultation', description: 'Professional menu designers provide layout advice using food psychology to boost order rates and average ticket size.' },
        { title: 'Food Photography Service', description: 'Professional food photographer visits on-site with specialized lighting and composition to make dishes look more appetizing (separate fee).' },
        { title: 'Rush Order Hotline', description: "Restaurant opening or menu update can't wait? Our rush hotline ensures your menus arrive on time." },
      ],
    },
    buyingGuide: {
      title: 'Menu Buying Guide',
      paragraphs: [
        'When choosing menu materials, first consider restaurant type and usage frequency. Fast food and cha chaan teng suit PVC menus — waterproof, oil-resistant, and economical. Western restaurants and dessert shops suit laminated menus — vibrant colors and easy to clean. Fine dining benefits from leather or wooden menus for elevated brand perception.',
        'Menu design should follow food psychology principles. Place high-margin dishes at visual focal points (top-right or center). High-quality food photos can increase order rates by 30%+. Keep text under 20 characters per dish. Our designers are well-versed in these principles.',
        'Considering post-pandemic contactless trends, we recommend adding QR code digital menus to physical menus. Customers scan to view full menus, photos, and nutritional information — reducing physical menu replacement frequency and printing costs.',
      ],
    },
    faq: [
      { q: 'What is the minimum order for menus?', a: '10 copies (digital printing). 100+ copies recommended for offset printing.' },
      { q: 'What menu materials are available?', a: 'PVC menus, laminated menus, hard plastic sleeve menus, leather menus, wooden menus. Different materials suit different restaurant styles.' },
      { q: 'Are menus waterproof?', a: 'PVC and laminated menus achieve IPX4 waterproof rating — withstands soup splashes and grease wiping.' },
      { q: 'Do you offer menu design services?', a: 'Yes. Professional menu designers provide layout services using food psychology to boost order rates.' },
      { q: 'What is the fastest turnaround for menus?', a: 'Same-day digital printing (10–50 copies). Standard offset: 2–3 days. Rush orders welcome.' },
      { q: 'Can menus be printed in multiple languages?', a: 'Yes. Chinese/English and Chinese/Japanese side-by-side supported, plus variable data printing for branch-specific pricing.' },
      { q: 'How do QR code digital menus work?', a: 'We generate QR codes linking to digital menu pages that support real-time price and dish updates.' },
      { q: 'Can menu pages be replaced?', a: 'Yes. Hard plastic sleeves or binder designs allow easy single-page replacement — ideal for seasonal menu updates.' },
    ],
  },
  ja: {
    h2: '香港 メニュー印刷 — 防水・防油、PVC／ラミネート／硬質プラ、レストランメニュー専門',
    coreAdvantages: {
      title: 'ZprintPro メニューの強み',
      items: [
        {
          heading: '1. レストランメニュー専門：防水・防油で耐久・お手入れ簡単',
          points: [
            'PVCメニュー、ラミネートメニュー、硬質プラスチックケースメニュー、革メニュー、木製メニューなど、レストランのスタイルに合わせた多種多様な材質を提供。',
            '防水防油加工で、スープや油汚れも拭き取るだけ。使用寿命を3–5倍延長。',
            '「メニュー印刷 香港」、「レストランメニュー」、「防水メニュー」、「カフェメニュー」などの高検索ボリュームキーワードをカバー。',
          ],
        },
        {
          heading: '2. 小ロット対応、新規開業レストランに最適',
          points: [
            '10部から（デジタル印刷）。新規開業の試営業や季節メニューの更新に最適。',
            '可変データ印刷に対応。1部ずつ異なる価格（店舗別価格設定）や言語（中英日対応）が可能。',
            '即日印刷・配送で、メニュー更新が営業を遅らせることはありません。',
          ],
        },
        {
          heading: '3. プロデザイン＋フード撮影で注文率向上',
          points: [
            'プロのメニューデザイナーがフード心理学を応用し、レイアウトと色彩で高利益メニューへの注文を誘導。',
            'フード撮影サービスも提供（別途）。プロの照明と構図で料理をより美味しそうに演出。',
            'QRコード電子メニューとの連携で、顧客はスキャンしてフルメニューと写真を閲覧。印刷コストを削減。',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質・工法ガイド',
      subtitle: 'メニューによく使われる材質と用途',
      columns: ['材質タイプ', '主な特徴', '最適な用途'],
      rows: [
        { material: 'PVCメニュー', features: '防水・防油｜耐久｜拭き取り可能｜手頃', scenarios: '茶餐廳｜ファストフード｜カフェ｜飲茶' },
        { material: 'ラミネートメニュー', features: '紙にラミネート｜防水防汚｜色彩保護', scenarios: '洋食｜スイーツ｜バー｜高級レストラン' },
        { material: '硬質プラスチックケース', features: '硬質保護｜中身交換可｜長期使用', scenarios: 'チェーン店｜ホテル｜クラブ｜定期更新' },
        { material: '革メニュー', features: '高級感｜耐久｜ブランド向上', scenarios: '高級洋食｜日本料理｜会員制｜ブティック' },
        { material: '木製メニュー', features: '自然な質感｜独特のスタイル｜エコ', scenarios: 'おしゃれカフェ｜手作りスイーツ｜オーガニック' },
      ],
    },
    specialOptions: {
      title: '特殊加工オプション',
      items: [
        { name: '丸角裁切', description: '尖った角が顧客を傷つけるのを防ぎ、安全性と美観を向上。' },
        { name: '穴あけ', description: '上部または側面に穴を開け、吊り下げや綴じ込みが可能に。' },
        { name: '箔押し', description: 'レストラン名やキャッチコピーに金属光沢の高級感を演出。' },
        { name: 'QRコード電子メニュー', description: 'スキャンで電子メニューへ。印刷コスト削減と価格・メニューのリアルタイム更新を実現。' },
        { name: '多言語対応', description: '中英、中日の対応。異なる顧客層の注文をサポート。' },
        { name: '中身交換可能', description: '硬質ケースやバインダー設計で、単ページの簡単な交換が可能。' },
      ],
    },
    techSpecs: {
      title: '技術仕様',
      items: [
        { label: '標準サイズ', value: 'A4(210×297mm)、A5(148×210mm)、DL(99×210mm)、正方形(150×150mm)。完全カスタマイズ対応。' },
        { label: '最小発注数', value: '10部から（デジタル印刷）。100部以上はオフセット印刷がお得。' },
        { label: '納期', value: '即日（デジタル、10–50部）。標準2–3日（オフセット）。サンプル当日。' },
        { label: 'ファイル要件', value: 'AI／PDF／PSD、300dpi、CMYK、3mmのbleed。' },
        { label: '防水等級', value: 'PVCおよびラミネートメニューはIPX4防水等級。水しぶきと拭き取りに耐えます。' },
      ],
    },
    serviceNodes: {
      title: 'ローカルサービス拠点',
      items: [
        { title: '無料メニューデザイン相談', description: 'プロのメニューデザイナーがフード心理学を応用したレイアウト提案で、注文率と客単価を向上。' },
        { title: 'フード撮影サービス', description: 'プロのフードカメラマンが訪問撮影。プロの照明と構図で料理をより美味しそうに（別途）。' },
        { title: '急行専用ライン', description: 'レストラン開業やメニュー更新は待てません。急行専用ラインでメニューを間に合わせます。' },
      ],
    },
    buyingGuide: {
      title: 'メニュー選び方ガイド',
      paragraphs: [
        'メニューの材質を選ぶ際、まずレストランのタイプと使用頻度を考慮しましょう。ファストフードや茶餐廳にはPVCメニューがおすすめで、防水防油で手頃です。洋食やスイーツ店にはラミネートメニューが適し、発色が鮮やかでお手入れが簡単です。高級レストランには革や木製メニューが最適で、ブランドの格を高めます。',
        'メニューデザインはフード心理学の原則に従うべきです。高利益メニューを視覚的な焦点（右上や中央）に配置します。高品質なフード写真は注文率を30%以上向上させます。各料理の説明は20文字以内に抑えます。当社のデザイナーはこれらの原則を熟知しています。',
        'パンデミック後の非接触トレンドを考慮し、実体メニューにQRコード電子メニューを追加することをおすすめします。顧客はスキャンしてフルメニュー、写真、栄養情報を閲覧でき、実体メニューの交換頻度と印刷コストを削減できます。',
      ],
    },
    faq: [
      { q: 'メニュー印刷の最小発注数は？', a: '10部から（デジタル印刷）。100部以上はオフセット印刷がお得。' },
      { q: 'どんな材質のメニューがありますか？', a: 'PVCメニュー、ラミネートメニュー、硬質プラスチックケース、革メニュー、木製メニュー。レストランのスタイルに応じて選べます。' },
      { q: 'メニューは防水ですか？', a: 'PVCとラミネートメニューはIPX4防水等級。スープの飛沫や油汚れの拭き取りに耐えます。' },
      { q: 'メニューのデザインも依頼できますか？', a: 'はい。プロのメニューデザイナーがフード心理学を応用したレイアウトサービスを提供します。' },
      { q: 'メニューの最短納期は？', a: 'デジタル印刷は即日（10–50部）。オフセット印刷は標準2–3日。急行注文も受け付けています。' },
      { q: '多言語メニューは印刷できますか？', a: 'はい。中英、中日の対応。可変データ印刷で店舗別価格設定も可能です。' },
      { q: 'QRコード電子メニューはどうやりますか？', a: 'QRコードを生成し、電子メニューページにリンク。価格とメニューのリアルタイム更新が可能です。' },
      { q: 'メニューのページは交換できますか？', a: 'はい。硬質ケースやバインダー設計のメニューは単ページを簡単に交換でき、季節メニューの更新に最適です。' },
    ],
  },
};


// =============================================================================
// 10. ENVELOPES — 信封印刷
// =============================================================================
const envelopesContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    h2: '香港信封印刷 — 西式／中式／特種紙信封，500 個起訂，即日交貨',
    coreAdvantages: {
      title: '核心競爭優勢',
      items: [
        {
          heading: '1. 全規格覆蓋：西式 DL、中式、窗口信封一站搞定',
          points: [
            '提供 DL(110×220mm)、C5(162×229mm)、C4(229×324mm)、中式 5 號／7 號／9 號等全規格信封',
            '窗口信封（開窗位置可定制）適合發票、賬單、邀請函等需要顯示地址的場景',
            '滿足「信封印刷 香港」、「商業信封」、「窗口信封」、「邀請信封」等高搜索量關鍵詞',
          ],
        },
        {
          heading: '2. 特種紙與工藝，讓信封成為品牌名片',
          points: [
            '提供牛皮紙、白卡紙、彩色紙、珠光紙、紋理紙等 20 餘種特種紙選擇',
            '燙金、燙銀、凹凸壓紋、局部 UV、擊凸等工藝讓普通信封變身品牌傳播載體',
            '自黏封口（雙面膠）或傳統膠口可選，兼顧便利與傳統',
          ],
        },
        {
          heading: '3. 小批量高性價比，企業採購首選',
          points: [
            '500 個起訂（數碼印刷），適合中小企業和初創公司',
            '5,000 個以上柯式印刷，單價低至 HK$0.15/個，適合大型企業和活動',
            '即日交貨（數碼，500–2,000 個），緊急商務函件不耽誤',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質工藝詳解',
      subtitle: '信封常用紙張與規格',
      columns: ['紙張類型', '關鍵特性', '適用場景'],
      rows: [
        { material: '100g 白卡紙', features: '潔白｜挺度好｜書寫流暢｜經濟', scenarios: '商業信函｜邀請函｜一般企業信封' },
        { material: '120g 牛皮紙', features: '復古質感｜環保｜高辨識度｜耐用', scenarios: '品牌信封｜電商出貨｜環保企業｜手作品牌' },
        { material: '150g 珠光紙', features: '珍珠光澤｜高級感｜品牌提升', scenarios: '婚禮邀請｜VIP 邀請｜奢侈品｜高端活動' },
        { material: '彩色紙', features: '豐富色彩選擇｜品牌識別｜視覺衝擊', scenarios: '節日賀卡｜促銷通知｜兒童活動｜品牌推廣' },
        { material: '窗口信封', features: '開窗顯示地址｜節省書寫｜專業感', scenarios: '賬單｜發票｜銀行函件｜政府公文' },
      ],
    },
    specialOptions: {
      title: '特殊加工選項',
      items: [
        { name: '燙金／燙銀', description: '公司名稱或 LOGO 局部金屬光澤，提升品牌辨識度和高級感' },
        { name: '凹凸壓紋', description: '圖案或文字立體浮凸，無需油墨即可呈現質感' },
        { name: '局部 UV', description: 'LOGO 或圖案高光凸顯，觸感立體' },
        { name: '自黏封口', description: '雙面膠封口，無需口水或膠水，方便衛生' },
        { name: '彩色印刷', description: '全彩四色印刷，支持漸變色和複雜圖案' },
        { name: '雙面印刷', description: '信封內外雙面印刷，增加品牌曝光和驚喜感' },
      ],
    },
    techSpecs: {
      title: '技術參數詳解',
      items: [
        { label: '標準規格', value: 'DL(110×220mm)、C5(162×229mm)、C4(229×324mm)、中式 5 號(110×220mm)、7 號(160×230mm)、9 號(230×320mm)' },
        { label: '起訂量', value: '500 個起訂（數碼印刷），5,000 個以上柯式印刷更經濟' },
        { label: '交期', value: '即日交貨（數碼，500–2,000 個）；標準 2–3 天（柯式）；打樣當日' },
        { label: '檔案要求', value: 'AI / PDF，300dpi，CMYK，預留 3mm 出血位，信封展開尺寸設計' },
        { label: '窗口尺寸', value: '標準窗口 40×90mm，位置可定制，支持透明膜或開空' },
      ],
    },
    serviceNodes: {
      title: '本地化服務節點',
      items: [
        { title: '免費信封模板', description: '提供西式、中式、窗口信封等多種規格模板，方便設計師快速開始' },
        { title: '品牌信封設計', description: '專業設計師為您的品牌定制獨特信封設計，提升企業形象' },
        { title: '大批量優惠', description: '5,000 個以上享受柯式印刷優惠價，單價低至 HK$0.15/個' },
      ],
    },
    buyingGuide: {
      title: '信封選購指南',
      paragraphs: [
        '選擇信封規格時，首先要考慮內裝文件的大小。A4 文件對折放入 DL 信封；A4 文件不對折放入 C4 信封；A5 文件放入 C5 信封。中式信封適合傳統商務和文化活動。如果不確定，可以聯繫我們的客服團隊諮詢。',
        '紙張選擇影響品牌形象。白卡紙適合一般商業信函，經濟實惠；牛皮紙適合文創品牌和電商，復古質感且環保；珠光紙適合高端邀請和 VIP 函件，珍珠光澤提升格調。',
        '特殊工藝可以讓普通信封變身品牌傳播載體。燙金公司名稱提升辨識度；凹凸壓紋增添觸感記憶；窗口設計節省書寫時間。建議企業至少選擇一種特色工藝，讓每一封信都成為品牌曝光。',
      ],
    },
    faq: [
      { q: '信封印刷最低多少個起？', a: '500 個起訂（數碼印刷）。5,000 個以上柯式印刷更經濟，單價低至 HK$0.15/個。' },
      { q: '信封有哪些規格？', a: 'DL、C5、C4、中式 5 號／7 號／9 號。支持完全客製化尺寸。' },
      { q: '可以印窗口信封嗎？', a: '可以。標準窗口 40×90mm，位置和大小可完全客製化。' },
      { q: '信封有哪些紙張選擇？', a: '白卡紙、牛皮紙、珠光紙、彩色紙、紋理紙等 20 餘種。' },
      { q: '信封最快多久可以取？', a: '數碼印刷即日交貨（500–2,000 個）；柯式印刷標準 2–3 天。' },
      { q: '可以燙金或壓紋嗎？', a: '可以。燙金、燙銀、凹凸壓紋、局部 UV 等多種工藝均可選擇。' },
      { q: '信封可以雙面印刷嗎？', a: '可以。內外雙面印刷增加品牌曝光，內頁可以印品牌故事或感謝語。' },
      { q: '窗口信封的透明膜會掉嗎？', a: '不會。我們使用高品質透明膜和專業粘貼工藝，確保窗口膜牢固不脫落。' },
    ],
  },
  en: {
    h2: 'Envelope Printing Hong Kong — Western / Chinese / Specialty Paper, From 500 pcs, Same-Day Delivery',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Envelopes?',
      items: [
        {
          heading: '1. Full Size Coverage: DL, C5, C4, Chinese Sizes in One Place',
          points: [
            'Full range: DL(110×220mm), C5(162×229mm), C4(229×324mm), Chinese #5/#7/#9 sizes.',
            'Window envelopes (custom window position) ideal for invoices, bills, and invitations requiring address visibility.',
            'Covers high-search keywords: "envelope printing Hong Kong", "business envelopes", "window envelopes", "invitation envelopes".',
          ],
        },
        {
          heading: '2. Specialty Papers & Finishing — Envelopes as Brand Assets',
          points: [
            '20+ specialty paper options: kraft, white card, colored paper, pearl, and textured papers.',
            'Foil stamping, embossing, spot UV, and debossing transform ordinary envelopes into brand communication vehicles.',
            'Self-adhesive seal (double-sided tape) or traditional gum seal — convenience and tradition.',
          ],
        },
        {
          heading: '3. Small Batch, High Value — Corporate Procurement Choice',
          points: [
            '500 pcs minimum (digital printing) — ideal for SMEs and startups.',
            '5,000+ pcs offset printing, unit price as low as HK$0.15/pc for large enterprises and events.',
            'Same-day delivery (digital, 500–2,000 pcs) — urgent business correspondence without delay.',
          ],
        },
      ],
    },
    materialTable: {
      title: 'Material & Craftsmanship Guide',
      subtitle: 'Common Envelope Papers and Specifications',
      columns: ['Paper Type', 'Key Features', 'Best For'],
      rows: [
        { material: '100gsm White Card', features: 'Clean white | Good stiffness | Smooth writing | Economical', scenarios: 'Business letters | Invitations | General corporate envelopes' },
        { material: '120gsm Kraft Paper', features: 'Vintage feel | Eco-friendly | High recognition | Durable', scenarios: 'Brand envelopes | E-commerce shipping | Eco companies | Handmade brands' },
        { material: '150gsm Pearl Paper', features: 'Pearlescent sheen | Premium feel | Brand elevation', scenarios: 'Wedding invites | VIP invitations | Luxury goods | Premium events' },
        { material: 'Colored Paper', features: 'Rich color selection | Brand identity | Visual impact', scenarios: "Holiday cards | Promotions | Children's events | Brand campaigns" },
        { material: 'Window Envelope', features: 'Window displays address | Saves writing | Professional', scenarios: 'Bills | Invoices | Bank correspondence | Government mail' },
      ],
    },
    specialOptions: {
      title: 'Special Finishing Options',
      items: [
        { name: 'Foil Stamping', description: 'Metallic sheen on company name or logo for enhanced brand recognition and premium feel.' },
        { name: 'Embossing', description: 'Three-dimensional patterns or text without ink — pure tactile elegance.' },
        { name: 'Spot UV', description: 'Glossy raised highlights on logos or visuals for tactile impact.' },
        { name: 'Self-Adhesive Seal', description: 'Double-sided tape seal — no saliva or glue needed, convenient and hygienic.' },
        { name: 'Full-Color Printing', description: 'Four-color process printing supporting gradients and complex designs.' },
        { name: 'Double-Sided Printing', description: 'Inside and outside printing for increased brand exposure and delightful surprises.' },
      ],
    },
    techSpecs: {
      title: 'Technical Specifications',
      items: [
        { label: 'Standard Sizes', value: 'DL(110×220mm), C5(162×229mm), C4(229×324mm), Chinese #5(110×220mm), #7(160×230mm), #9(230×320mm).' },
        { label: 'Minimum Order', value: '500 pcs (digital printing). 5,000+ recommended for offset (more economical).' },
        { label: 'Turnaround', value: 'Same-day (digital, 500–2,000 pcs); Standard 2–3 days (offset); Prototyping same day.' },
        { label: 'File Requirements', value: 'AI / PDF, 300dpi, CMYK, 3mm bleed, envelope dieline design.' },
        { label: 'Window Size', value: 'Standard window 40×90mm. Position and size fully customizable. Clear film or open window.' },
      ],
    },
    serviceNodes: {
      title: 'Local Service Points',
      items: [
        { title: 'Free Envelope Templates', description: 'Western, Chinese, and window envelope templates available for designers to start quickly.' },
        { title: 'Brand Envelope Design', description: 'Professional designers create unique envelope designs to elevate your corporate image.' },
        { title: 'Bulk Order Discounts', description: '5,000+ pcs enjoy offset printing bulk rates, as low as HK$0.15/pc.' },
      ],
    },
    buyingGuide: {
      title: 'Envelope Buying Guide',
      paragraphs: [
        'When choosing envelope size, first consider the document size. Folded A4 fits DL; unfolded A4 needs C4; A5 fits C5. Chinese envelopes suit traditional business and cultural events. If unsure, contact our customer service team for advice.',
        'Paper choice affects brand image. White card suits general business letters — economical and practical. Kraft paper suits creative brands and e-commerce — vintage feel and eco-friendly. Pearl paper suits high-end invitations and VIP mail — pearlescent sheen elevates perception.',
        'Special finishing can transform ordinary envelopes into brand assets. Foil-stamped company names boost recognition; embossing adds tactile memory; window designs save writing time. We recommend at least one special finish so every letter becomes brand exposure.',
      ],
    },
    faq: [
      { q: 'What is the minimum order for envelopes?', a: '500 pcs (digital printing). 5,000+ pcs recommended for offset printing, as low as HK$0.15/pc.' },
      { q: 'What envelope sizes are available?', a: 'DL, C5, C4, Chinese #5/#7/#9. Fully custom sizes supported.' },
      { q: 'Do you print window envelopes?', a: 'Yes. Standard window 40×90mm. Position and size fully customizable.' },
      { q: 'What paper options are available?', a: 'White card, kraft paper, pearl paper, colored paper, textured paper — 20+ options.' },
      { q: 'What is the fastest turnaround for envelopes?', a: 'Same-day digital printing (500–2,000 pcs). Standard offset: 2–3 days.' },
      { q: 'Can envelopes be foil stamped or embossed?', a: 'Yes. Foil stamping, embossing, debossing, and spot UV all available.' },
      { q: 'Can envelopes be double-sided printed?', a: 'Yes. Inside and outside printing increases brand exposure. Inside can feature brand stories or thank-you messages.' },
      { q: 'Will the window film fall off?', a: 'No. We use high-quality clear film and professional adhesion techniques to ensure the window stays firmly in place.' },
    ],
  },
  ja: {
    h2: '香港 封筒印刷 — 洋形／中式／特殊紙、500枚から、即日納品',
    coreAdvantages: {
      title: 'ZprintPro 封筒印刷の強み',
      items: [
        {
          heading: '1. 全規格対応：洋形DL、中式、窓付き封筒まで',
          points: [
            'DL(110×220mm)、C5(162×229mm)、C4(229×324mm)、中式5号／7号／9号など全規格を提供。',
            '窓付き封筒（窓の位置をカスタマイズ可）は、請求書、招待状など住所を表示する必要があるシーンに最適。',
            '「封筒印刷 香港」、「ビジネス封筒」、「窓付き封筒」、「招待状封筒」などの高検索ボリュームキーワードをカバー。',
          ],
        },
        {
          heading: '2. 特殊紙と加工で、封筒をブランドの名刺に',
          points: [
            'クラフト紙、白カード紙、カラー紙、パール紙、テクスチャ紙など20種類以上の特殊紙を選択可能。',
            '箔押し、エンボス、局部UV、デボスなどの加工で、普通の封筒をブランド伝達メディアに変身させます。',
            '両面テープ封口または伝統的な糊付け封口から選択。便利さと伝統を両立。',
          ],
        },
        {
          heading: '3. 小ロット高コスパ、企業購買の第一選択',
          points: [
            '500枚から（デジタル印刷）。中小企業やスタートアップに最適。',
            '5,000枚以上はオフセット印刷で、単価HK$0.15／枚までお得。大企業やイベントに最適。',
            '即日納品（デジタル、500–2,000枚）。緊急のビジネス書類を遅らせません。',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質・工法ガイド',
      subtitle: '封筒によく使われる紙と規格',
      columns: ['紙タイプ', '主な特徴', '最適な用途'],
      rows: [
        { material: '100g白カード紙', features: '白く清潔｜かし性良好｜書きやすい｜手頃', scenarios: 'ビジネス書簡｜招待状｜一般企業封筒' },
        { material: '120gクラフト紙', features: 'レトロ感｜エコ｜高い識別性｜耐久', scenarios: 'ブランド封筒｜EC出荷｜エコ企業｜手作りブランド' },
        { material: '150gパール紙', features: 'パール光沢｜高級感｜ブランド向上', scenarios: '結婚式招待状｜VIP招待｜高級品｜プレミアムイベント' },
        { material: 'カラー紙', features: '豊富な色選択｜ブランド識別｜視覚的インパクト', scenarios: '季節カード｜プロモーション｜子供イベント｜ブランド' },
        { material: '窓付き封筒', features: '窓で住所表示｜手書き省略｜プロフェッショナル', scenarios: '請求書｜インボイス｜銀行書類｜公文書' },
      ],
    },
    specialOptions: {
      title: '特殊加工オプション',
      items: [
        { name: '箔押し', description: '会社名やロゴに金属光沢の高級感。ブランド認知度を向上。' },
        { name: 'エンボス', description: 'インクなしでパターンや文字を立体的に表現。' },
        { name: '局部UV', description: 'ロゴやビジュアルを光沢で強調し、触感も立体的に。' },
        { name: '両面テープ封口', description: '両面テープで封口。唾液や糊が不要で、衛生的かつ便利。' },
        { name: 'フルカラー印刷', description: '4色プロセス印刷。グラデーションや複雑なデザインも可能。' },
        { name: '両面印刷', description: '内側と外側の両面印刷で、ブランド露出と驚きを演出。' },
      ],
    },
    techSpecs: {
      title: '技術仕様',
      items: [
        { label: '標準サイズ', value: 'DL(110×220mm)、C5(162×229mm)、C4(229×324mm)、中式5号(110×220mm)、7号(160×230mm)、9号(230×320mm)。' },
        { label: '最小発注数', value: '500枚から（デジタル印刷）。5,000枚以上はオフセット印刷がお得。' },
        { label: '納期', value: '即日（デジタル、500–2,000枚）。標準2–3日（オフセット）。サンプル当日。' },
        { label: 'ファイル要件', value: 'AI／PDF、300dpi、CMYK、3mmのbleed、封筒展開寸法デザイン。' },
        { label: '窓サイズ', value: '標準窓40×90mm。位置とサイズは完全カスタマイズ対応。透明フィルムまたは開空。' },
      ],
    },
    serviceNodes: {
      title: 'ローカルサービス拠点',
      items: [
        { title: '無料封筒テンプレート', description: '洋形、中式、窓付き封筒など多種多様なテンプレートを提供。デザイナーの作業を迅速化。' },
        { title: 'ブランド封筒デザイン', description: 'プロデザイナーがブランドに合わせた独自の封筒デザインを作成。企業イメージを向上。' },
        { title: '大口注文割引', description: '5,000枚以上はオフセット印刷の大口価格で、単価HK$0.15／枚まで。' },
      ],
    },
    buyingGuide: {
      title: '封筒選び方ガイド',
      paragraphs: [
        '封筒サイズを選ぶ際、まず内包書類のサイズを考慮しましょう。A4用紙を折ればDL封筒に入ります。折らないA4はC4封筒が必要です。A5はC5封筒に最適です。中式封筒は伝統的なビジネスや文化イベントに適しています。不安な場合は、カスタマーサービスチームにお問い合わせください。',
        '紙の選択はブランドイメージに影響します。白カード紙は一般的なビジネス書簡に適し、経済的で実用的です。クラフト紙はクリエイティブブランドやECに適し、レトロ感とエコフレンドリーです。パール紙は高級招待状やVIP書簡に適し、パール光沢で格を高めます。',
        '特殊加工で普通の封筒をブランドアセットに変身させましょう。箔押しの会社名は認知度を向上させ、エンボスは触感の記憶を残し、窓デザインは手書き時間を節約します。少なくとも1つの特殊加工を選び、すべての手紙をブランド露出にしましょう。',
      ],
    },
    faq: [
      { q: '封筒印刷の最小発注数は？', a: '500枚から（デジタル印刷）。5,000枚以上はオフセット印刷がお得で、単価HK$0.15／枚まで。' },
      { q: 'どんなサイズの封筒がありますか？', a: 'DL、C5、C4、中式5号／7号／9号。完全カスタマイズサイズも対応。' },
      { q: '窓付き封筒は印刷できますか？', a: 'はい。標準窓40×90mm。位置とサイズは完全カスタマイズ対応。' },
      { q: 'どんな紙がありますか？', a: '白カード紙、クラフト紙、パール紙、カラー紙、テクスチャ紙など20種類以上。' },
      { q: '封筒の最短納期は？', a: 'デジタル印刷は即日（500–2,000枚）。オフセット印刷は標準2–3日。' },
      { q: '箔押しやエンボスはできますか？', a: 'はい。箔押し、エンボス、デボス、局部UVなど、多様な加工が可能です。' },
      { q: '両面印刷は可能ですか？', a: 'はい。内側と外側の両面印刷でブランド露出を増やせます。内側にはブランドストーリーや感謝の言葉を印刷可能。' },
      { q: '窓の透明フィルムは剥がれますか？', a: 'いいえ。高品質な透明フィルムとプロの接着技術を使用し、窓がしっかりと固定されるようになっています。' },
    ],
  },
};

// =============================================================================
// 11. CALENDARS — 年曆印刷
// =============================================================================
const calendarsContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    h2: '香港年曆印刷 — 座枱曆／掛牆曆／月曆卡，50 本起訂，節日促銷必備',
    coreAdvantages: {
      title: '核心競爭優勢',
      items: [
        {
          heading: '1. 全類型年曆：座枱、掛牆、月曆卡、記事簿一站搞定',
          points: [
            '提供座枱曆（三角架）、掛牆曆（A3/A2）、月曆卡（明信片大小）、記事簿月曆、磁石冰箱貼月曆等多種類型',
            '滿足「年曆印刷 香港」、「座枱曆」、「掛牆曆」、「月曆卡」、「Calendar printing」等高搜索量關鍵詞',
            '適合企業贈禮、促銷品、內部辦公、學校紀念品等多元場景',
          ],
        },
        {
          heading: '2. 小批量靈活起訂，節日促銷不錯過',
          points: [
            '50 本起訂（數碼印刷），適合中小企業和初創公司製作節日禮品',
            '500 本以上柯式印刷更經濟，適合大型企業年終贈禮和品牌推廣',
            '支持可變數據印刷，每本年曆可以印不同員工姓名或不同分店信息（個性化贈禮）',
          ],
        },
        {
          heading: '3. 精美設計 + 實用功能，品牌曝光 365 天',
          points: [
            '每頁都可以融入品牌元素（LOGO、色彩、標語），讓品牌出現在客戶桌面 365 天',
            '記事功能區設計，方便標記重要日期和會議，提升實用性和留存率',
            '支持企業定制：公司年曆、產品月曆、員工生日曆、項目進度表等創意形式',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質工藝詳解',
      subtitle: '年曆常用紙張與裝訂方式',
      columns: ['年曆類型', '關鍵特性', '適用場景'],
      rows: [
        { material: '座枱曆（三角架）', features: '桌面展示｜每月翻頁｜品牌曝光度高', scenarios: '辦公桌面｜收銀台｜前台｜企業贈禮' },
        { material: '掛牆曆（A3/A2）', features: '牆面展示｜大圖視覺｜家庭／辦公室', scenarios: '家居裝飾｜辦公室｜學校｜餐廳' },
        { material: '月曆卡', features: '便攜｜可郵寄｜低單價｜大量派發', scenarios: '郵寄贈品｜活動派發｜展會｜促銷品' },
        { material: '記事簿月曆', features: '結合記事本｜實用性強｜高留存率', scenarios: '員工福利｜客戶贈禮｜學校紀念品｜VIP禮品' },
        { material: '磁石冰箱貼月曆', features: '冰箱展示｜日常可見｜家庭常備', scenarios: '家庭贈品｜社區活動｜品牌推廣｜兒童禮品' },
      ],
    },
    specialOptions: {
      title: '特殊加工選項',
      items: [
        { name: '燙金年份', description: '年份數字局部燙金，增添節日氛圍和高級感' },
        { name: '局部 UV', description: '重要日期或品牌 LOGO 高光凸顯，觸感立體' },
        { name: '圓環裝訂', description: '金屬圓環裝訂，翻頁順暢，耐用度高' },
        { name: '底板加厚', description: '座枱曆底板加厚至 2mm，穩固不易傾倒' },
        { name: '打孔掛繩', description: '掛牆曆頂部打孔配掛繩，方便懸掛' },
        { name: '防水覆膜', description: '全頁覆膜處理，防水防污，延長使用壽命' },
      ],
    },
    techSpecs: {
      title: '技術參數詳解',
      items: [
        { label: '標準尺寸', value: '座枱曆：150×180mm、200×230mm；掛牆曆：A3(297×420mm)、A2(420×594mm)；月曆卡：100×150mm；支持完全客製化' },
        { label: '起訂量', value: '50 本起訂（數碼印刷），500 本以上柯式印刷更經濟' },
        { label: '交期', value: '標準 3–5 天（數碼）；5–7 天（柯式）；急件 2–3 天（數碼）' },
        { label: '檔案要求', value: 'AI / PDF / InDesign，300dpi，CMYK，預留 3mm 出血位，每月獨立頁面設計' },
        { label: '紙張選擇', value: '200g–300g 銅版紙／哑粉紙；底板：1–2mm 灰板或硬卡紙' },
      ],
    },
    serviceNodes: {
      title: '本地化服務節點',
      items: [
        { title: '免費年曆模板', description: '提供 12 個月份的模板框架，包含節日和假期標記，方便快速設計' },
        { title: '節日促銷提醒', description: '提前 2 個月提醒客戶準備年曆印刷，確保節日促銷不耽誤' },
        { title: '企業定制設計', description: '專業設計師為企業定制品牌年曆，融入產品、文化、價值觀等元素' },
      ],
    },
    buyingGuide: {
      title: '年曆選購指南',
      paragraphs: [
        '選擇年曆類型時，首先要考慮使用場景和目標受眾。辦公場景推薦座枱曆（三角架），桌面展示品牌曝光度高；家庭場景推薦掛牆曆（A3/A2），大圖視覺裝飾性強；促銷派發推薦月曆卡，便攜低價適合大量派發。',
        '設計年曆時要融入品牌元素。每頁都應包含 LOGO 和品牌色彩；重要日期（公司周年、產品發布日）可以特別標記；記事功能區設計可以提升實用性和留存率。建議預留廣告位或優惠券區域，增加營銷價值。',
        '時間規劃是年曆印刷的關鍵。建議提前 2–3 個月開始準備設計和印刷，避開 11–12 月的印刷高峰期。我們提供節日促銷提醒服務，確保您的年曆準時到位。',
      ],
    },
    faq: [
      { q: '年曆印刷最低多少本起？', a: '50 本起訂（數碼印刷）。500 本以上柯式印刷更經濟。' },
      { q: '年曆有哪些類型？', a: '座枱曆（三角架）、掛牆曆、月曆卡、記事簿月曆、磁石冰箱貼月曆。' },
      { q: '可以定制企業年曆嗎？', a: '可以。專業設計師為企業定制品牌年曆，融入產品、文化、價值觀等元素。' },
      { q: '年曆印刷需要多久？', a: '標準 3–5 天（數碼）；5–7 天（柯式）；急件 2–3 天。' },
      { q: '年曆可以印公司 LOGO 嗎？', a: '可以。每頁都可以融入品牌元素，讓品牌出現在客戶桌面 365 天。' },
      { q: '可以個性化每本年曆嗎？', a: '可以。支持可變數據印刷，每本年曆可以印不同員工姓名或分店信息。' },
      { q: '年曆的紙張有什麼選擇？', a: '200g–300g 銅版紙／哑粉紙；底板 1–2mm 灰板或硬卡紙。' },
      { q: '建議什麼時候開始印年曆？', a: '建議提前 2–3 個月準備，避開 11–12 月的印刷高峰期。' },
    ],
  },
  en: {
    h2: 'Calendar Printing Hong Kong — Desk / Wall / Card Calendars, From 50 pcs, Holiday Promotions Essential',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Calendars?',
      items: [
        {
          heading: '1. Full Calendar Range: Desk, Wall, Card, Planner & Magnet Types',
          points: [
            'Desk calendars (easel), wall calendars (A3/A2), calendar cards (postcard size), planner calendars, and magnetic fridge calendars.',
            'Covers high-search keywords: "calendar printing Hong Kong", "desk calendar", "wall calendar", "calendar card", "promotional calendar".',
            'Ideal for corporate gifts, promotional items, office use, and school souvenirs.',
          ],
        },
        {
          heading: '2. Low MOQ for Seasonal Promotions',
          points: [
            '50 pcs minimum (digital printing) — ideal for SMEs and startups creating holiday gifts.',
            '500+ pcs offset printing for better economy — suited for large corporate year-end gifts and brand campaigns.',
            'Variable data printing supported — each calendar can feature different employee names or branch information (personalized gifting).',
          ],
        },
        {
          heading: '3. Beautiful Design + Practical Function — 365-Day Brand Exposure',
          points: [
            'Every page integrates brand elements (logo, colors, taglines) — your brand appears on customer desks for 365 days.',
            'Memo area design for marking important dates and meetings — increases practicality and retention rates.',
            'Corporate customization supported: company calendars, product calendars, employee birthday calendars, project timeline calendars.',
          ],
        },
      ],
    },
    materialTable: {
      title: 'Material & Craftsmanship Guide',
      subtitle: 'Common Calendar Papers and Binding Methods',
      columns: ['Calendar Type', 'Key Features', 'Best For'],
      rows: [
        { material: 'Desk Calendar (Easel)', features: 'Desktop display | Monthly flip | High brand exposure', scenarios: 'Office desks | Cashier counters | Reception | Corporate gifts' },
        { material: 'Wall Calendar (A3/A2)', features: 'Wall display | Large visual | Home / office', scenarios: 'Home decor | Offices | Schools | Restaurants' },
        { material: 'Calendar Cards', features: 'Portable | Mailable | Low unit price | Mass distribution', scenarios: 'Mail giveaways | Event handouts | Exhibitions | Promos' },
        { material: 'Planner Calendar', features: 'Combines notebook | High practicality | High retention', scenarios: 'Employee benefits | Client gifts | School souvenirs | VIP gifts' },
        { material: 'Magnetic Fridge Calendar', features: 'Fridge display | Daily visibility | Household staple', scenarios: "Family gifts | Community events | Brand campaigns | Children's gifts" },
      ],
    },
    specialOptions: {
      title: 'Special Finishing Options',
      items: [
        { name: 'Foil Stamped Year', description: 'Year number in foil stamping adds festive atmosphere and premium feel.' },
        { name: 'Spot UV', description: 'Important dates or brand logos highlighted with glossy raised finish.' },
        { name: 'Ring Binding', description: 'Metal ring binding for smooth page flipping and high durability.' },
        { name: 'Thickened Base', description: "Desk calendar base thickened to 2mm for stability — won't tip over." },
        { name: 'Hole Punch & String', description: 'Top hole with hanging string for easy wall mounting.' },
        { name: 'Waterproof Lamination', description: 'Full-page lamination for waterproof and stain-resistant protection.' },
      ],
    },
    techSpecs: {
      title: 'Technical Specifications',
      items: [
        { label: 'Standard Sizes', value: 'Desk: 150×180mm, 200×230mm; Wall: A3(297×420mm), A2(420×594mm); Card: 100×150mm. Fully customizable.' },
        { label: 'Minimum Order', value: '50 pcs (digital printing). 500+ recommended for offset (more economical).' },
        { label: 'Turnaround', value: 'Standard 3–5 days (digital); 5–7 days (offset); Rush 2–3 days (digital).' },
        { label: 'File Requirements', value: 'AI / PDF / InDesign, 300dpi, CMYK, 3mm bleed, each month as separate page design.' },
        { label: 'Paper Options', value: '200g–300gsm art / matte paper. Base: 1–2mm greyboard or card.' },
      ],
    },
    serviceNodes: {
      title: 'Local Service Points',
      items: [
        { title: 'Free Calendar Templates', description: '12-month template framework including holiday and vacation markings for quick design start.' },
        { title: 'Holiday Promotion Reminders', description: 'Remind customers 2 months in advance to prepare calendar printing — never miss seasonal promotions.' },
        { title: 'Corporate Custom Design', description: 'Professional designers create branded calendars integrating products, culture, and values.' },
      ],
    },
    buyingGuide: {
      title: 'Calendar Buying Guide',
      paragraphs: [
        'When choosing calendar type, first consider usage scenario and target audience. Office settings suit desk calendars (easel) for high desktop brand exposure. Home settings suit wall calendars (A3/A2) for large visual decoration. Promotional distribution suits calendar cards — portable, low-cost, ideal for mass handouts.',
        'Calendar design should integrate brand elements. Every page should include logo and brand colors; important dates (company anniversaries, product launches) can be specially marked; memo areas increase practicality and retention. Consider reserving ad spaces or coupon areas for added marketing value.',
        'Timing is critical for calendar printing. We recommend starting design and printing 2–3 months in advance to avoid the November–December rush. We offer holiday promotion reminder services to ensure your calendars arrive on time.',
      ],
    },
    faq: [
      { q: 'What is the minimum order for calendars?', a: '50 pcs (digital printing). 500+ pcs recommended for offset printing.' },
      { q: 'What calendar types are available?', a: 'Desk calendars (easel), wall calendars, calendar cards, planner calendars, magnetic fridge calendars.' },
      { q: 'Can you customize corporate calendars?', a: 'Yes. Professional designers create branded calendars integrating products, culture, and values.' },
      { q: 'How long does calendar printing take?', a: 'Standard 3–5 days (digital); 5–7 days (offset); Rush 2–3 days (digital).' },
      { q: 'Can company logos be printed on calendars?', a: 'Yes. Every page can integrate brand elements for 365-day desktop exposure.' },
      { q: 'Can each calendar be personalized?', a: 'Yes. Variable data printing allows different employee names or branch information per calendar.' },
      { q: 'What paper options are available?', a: '200g–300gsm art / matte paper. Base: 1–2mm greyboard or card.' },
      { q: 'When should I start printing calendars?', a: 'Recommend starting 2–3 months in advance to avoid the November–December printing rush.' },
    ],
  },
  ja: {
    h2: '香港 カレンダー印刷 — 卓上／壁掛け／カード、50冊から、季節プロモーション必須',
    coreAdvantages: {
      title: 'ZprintPro カレンダーの強み',
      items: [
        {
          heading: '1. 全タイプ対応：卓上、壁掛け、カード、手帳、磁石タイプ',
          points: [
            '卓上カレンダー（イーゼル）、壁掛けカレンダー（A3/A2）、カレンダーカード（はがきサイズ）、手帳カレンダー、磁石冷蔵庫カレンダーなど多様なタイプを提供。',
            '「カレンダー印刷 香港」、「卓上カレンダー」、「壁掛けカレンダー」、「プロモーションカレンダー」などの高検索ボリュームキーワードをカバー。',
            '企業ギフト、プロモーション、オフィス用品、学校記念品など多様なシーンに対応。',
          ],
        },
        {
          heading: '2. 小ロット対応、季節プロモーションを逃さない',
          points: [
            '50冊から（デジタル印刷）。中小企業やスタートアップの季節ギフト作成に最適。',
            '500冊以上はオフセット印刷がお得。大企業の年末ギフトやブランドキャンペーンに最適。',
            '可変データ印刷に対応。1冊ずつ異なる従業員名や店舗情報が可能（パーソナライズギフト）。',
          ],
        },
        {
          heading: '3. 美しいデザイン＋実用機能で365日のブランド露出',
          points: [
            '各ページにブランド要素（ロゴ、カラー、キャッチコピー）を統合。顧客のデスクに365日ブランドを露出。',
            'メモ機能エリアのデザインで、重要な日付や会議の記入が可能。実用性と保持率を向上。',
            '企業カスタマイズ対応：会社カレンダー、製品カレンダー、従業員誕生日カレンダー、プロジェクト進捗カレンダーなど。',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質・工法ガイド',
      subtitle: 'カレンダーによく使われる紙と製本方式',
      columns: ['カレンダータイプ', '主な特徴', '最適な用途'],
      rows: [
        { material: '卓上カレンダー（イーゼル）', features: 'デスク展示｜月めくり｜ブランド露出度高', scenarios: 'オフィスデスク｜レジ｜受付｜企業ギフト' },
        { material: '壁掛けカレンダー（A3/A2）', features: '壁面展示｜大判ビジュアル｜家庭／オフィス', scenarios: 'インテリア｜オフィス｜学校｜レストラン' },
        { material: 'カレンダーカード', features: '持ち運び可能｜郵送可｜低単価｜大量配布', scenarios: '郵送ギフト｜イベント配布｜展示会｜プロモ' },
        { material: '手帳カレンダー', features: '手帳と一体化｜実用性高｜保持率高', scenarios: '従業員福利｜顧客ギフト｜学校記念品｜VIP' },
        { material: '磁石冷蔵庫カレンダー', features: '冷蔵庫展示｜日常可視｜家庭必需品', scenarios: '家族ギフト｜地域イベント｜ブランド｜子供' },
      ],
    },
    specialOptions: {
      title: '特殊加工オプション',
      items: [
        { name: '年号箔押し', description: '年号に箔押しで、季節感と高級感を演出。' },
        { name: '局部UV', description: '重要な日付やブランドロゴを光沢で強調し、触感も立体的に。' },
        { name: 'リング綴じ', description: '金属リング綴じで、ページめくりがスムーズで耐久性も高い。' },
        { name: '厚みのある台座', description: '卓上カレンダーの台座を2mmに厚化。安定して倒れにくい。' },
        { name: '穴あけ紐付き', description: '壁掛けカレンダーの上部に穴あけと紐付き。吊り下げが簡単。' },
        { name: '防水ラミネート', description: '全ページラミネート処理で防水防汚。使用寿命を延長。' },
      ],
    },
    techSpecs: {
      title: '技術仕様',
      items: [
        { label: '標準サイズ', value: '卓上：150×180mm、200×230mm。壁掛け：A3(297×420mm)、A2(420×594mm)。カード：100×150mm。完全カスタマイズ対応。' },
        { label: '最小発注数', value: '50冊から（デジタル印刷）。500冊以上はオフセット印刷がお得。' },
        { label: '納期', value: '標準3–5日（デジタル）。5–7日（オフセット）。急行2–3日（デジタル）。' },
        { label: 'ファイル要件', value: 'AI／PDF／InDesign、300dpi、CMYK、3mmのbleed。各月を独立ページでデザイン。' },
        { label: '紙の選択', value: '200g–300gコート紙／マット紙。台座：1–2mmグレイボードまたはカード紙。' },
      ],
    },
    serviceNodes: {
      title: 'ローカルサービス拠点',
      items: [
        { title: '無料カレンダーテンプレート', description: '12ヶ月分のテンプレートフレームを提供。祝日と休日のマーク付きで、デザインを迅速開始。' },
        { title: '季節プロモーションリマインド', description: '2ヶ月前にカレンダー印刷の準備をリマインド。季節プロモーションを逃しません。' },
        { title: '企業カスタムデザイン', description: 'プロデザイナーが企業のブランドカレンダーを作成。製品、文化、価値観などを統合。' },
      ],
    },
    buyingGuide: {
      title: 'カレンダー選び方ガイド',
      paragraphs: [
        'カレンダータイプを選ぶ際、まず使用シーンとターゲット層を考慮しましょう。オフィスシーンには卓上カレンダー（イーゼル）がおすすめで、デスクでのブランド露出度が高いです。家庭シーンには壁掛けカレンダー（A3/A2）が適し、大判ビジュアルで装飾性も高いです。プロモーション配布にはカレンダーカードが最適で、持ち運び可能で低価格なので大量配布に適しています。',
        'カレンダーデザインにはブランド要素を統合すべきです。各ページにロゴとブランドカラーを含め、重要な日付（会社創業記念日、製品発売日）は特別にマークできます。メモ機能エリアは実用性と保持率を向上させます。広告スペースやクーポンエリアを確保することで、マーケティング価値も追加できます。',
        'カレンダー印刷のタイミングは重要です。デザインと印刷の準備を2–3ヶ月前から開始することをおすすめし、11–12月の印刷ラッシュを回避します。当社は季節プロモーションリマインドサービスを提供し、カレンダーが間に合うようサポートします。',
      ],
    },
    faq: [
      { q: 'カレンダー印刷の最小発注数は？', a: '50冊から（デジタル印刷）。500冊以上はオフセット印刷がお得。' },
      { q: 'どんなタイプのカレンダーがありますか？', a: '卓上カレンダー（イーゼル）、壁掛けカレンダー、カレンダーカード、手帳カレンダー、磁石冷蔵庫カレンダー。' },
      { q: '企業カレンダーのカスタマイズは可能？', a: 'はい。プロデザイナーがブランドカレンダーを作成。製品、文化、価値観などを統合します。' },
      { q: 'カレンダー印刷にどのくらいかかりますか？', a: '標準3–5日（デジタル）。5–7日（オフセット）。急行2–3日。' },
      { q: '会社のロゴを印刷できますか？', a: 'はい。各ページにブランド要素を統合し、365日デスクでブランドを露出できます。' },
      { q: '1冊ずつ個別カスタマイズは可能？', a: 'はい。可変データ印刷で、異なる従業員名や店舗情報を各カレンダーに印刷可能です。' },
      { q: '紙の選択肢は？', a: '200g–300gコート紙／マット紙。台座は1–2mmグレイボードまたはカード紙。' },
      { q: 'カレンダー印刷はいつから始めるべき？', a: '2–3ヶ月前から準備を開始することをおすすめ。11–12月の印刷ラッシュを回避します。' },
    ],
  },
};

// =============================================================================
// 12. RED-PACKETS — 利是封印刷
// =============================================================================
const redPacketsContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    h2: '香港利是封印刷 — 燙金／浮雕／立體工藝，500 個起訂，新春送禮首選',
    coreAdvantages: {
      title: '核心競爭優勢',
      items: [
        {
          heading: '1. 傳統工藝與現代設計結合，利是封變身品牌精品',
          points: [
            '提供燙金、燙銀、浮雕、立體擊凸、UV、雷射切割等傳統工藝，讓利是封成為收藏級精品',
            '滿足「利是封印刷 香港」、「燙金利是封」、「定制利是封」、「Red packet printing」等高搜索量關鍵詞',
            '適合企業春節贈禮、婚慶利是封、百日宴、開業利是封等傳統節慶場景',
          ],
        },
        {
          heading: '2. 小批量高品質，企業定制首選',
          points: [
            '500 個起訂（數碼印刷），適合中小企業和初創公司製作春節贈禮',
            '5,000 個以上柯式印刷，單價低至 HK$0.8/個，適合大型企業和品牌推廣',
            '支持可變數據印刷，每個利是封可以印不同員工姓名或不同祝福語（個性化贈禮）',
          ],
        },
        {
          heading: '3. 專業設計 + 傳統元素，傳遞文化與祝福',
          points: [
            '專業設計師深谙傳統文化，將生肖、花卉、吉祥圖案融入現代設計',
            '提供傳統「福」字、招財進寶、年年有餘等經典圖案，也支持完全原創設計',
            '多種封口方式：傳統糊口、自黏封口、磁石封口，兼顧傳統與創新',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質工藝詳解',
      subtitle: '利是封常用紙張與工藝',
      columns: ['紙張類型', '關鍵特性', '適用場景'],
      rows: [
        { material: '128g 銅版紙', features: '色彩鮮豔｜經濟實惠｜適合大量印刷', scenarios: '企業贈禮｜促銷派發｜一般節慶｜預算有限' },
        { material: '200g 白卡紙', features: '挺度好｜手感厚實｜印刷精細', scenarios: '高端品牌｜VIP 贈禮｜收藏級｜婚慶利是封' },
        { material: '珠光紙', features: '珍珠光澤｜高級感｜獨特視覺', scenarios: '奢侈品｜珠寶品牌｜高端酒店｜私人定制' },
        { material: '紋理紙', features: '觸感獨特｜藝術質感｜差異化', scenarios: '文創品牌｜設計師品牌｜藝術機構｜特色利是封' },
        { material: '環保再生紙', features: '環保理念｜社會責任｜品牌正面形象', scenarios: '環保企業｜NGO｜社會責任項目｜綠色品牌' },
      ],
    },
    specialOptions: {
      title: '特殊加工選項',
      items: [
        { name: '燙金／燙銀', description: '傳統工藝，金屬光澤增添節日氣氛和高級感，經典永不過時' },
        { name: '浮雕擊凸', description: '圖案或文字立體浮凸，無需油墨即可呈現質感，觸感記憶深刻' },
        { name: '立體工藝', description: '3D 立體效果，讓利是封從平面變身立體藝術品，收藏價值極高' },
        { name: '雷射切割', description: '精細圖案鏤空切割，光線透過呈現夢幻效果，適合高端定制' },
        { name: '局部 UV', description: '重點圖案高光凸顯，觸感立體，視覺層次豐富' },
        { name: '香味印刷', description: '印刷時加入香味墨水，打開利是封即散發淡淡花香，驚喜感十足' },
      ],
    },
    techSpecs: {
      title: '技術參數詳解',
      items: [
        { label: '標準尺寸', value: '小號(80×160mm)、中號(90×170mm)、大號(100×190mm)，支持完全客製化' },
        { label: '起訂量', value: '500 個起訂（數碼印刷），5,000 個以上柯式印刷更經濟' },
        { label: '交期', value: '標準 3–5 天（數碼）；5–7 天（柯式）；急件 2–3 天（數碼）' },
        { label: '檔案要求', value: 'AI / PDF，300dpi，CMYK，預留 3mm 出血位，建議燙金部分單獨標註' },
        { label: '紙張選擇', value: '128g–200g 銅版紙／白卡紙；珠光紙、紋理紙、環保再生紙等特殊紙' },
      ],
    },
    serviceNodes: {
      title: '本地化服務節點',
      items: [
        { title: '傳統圖案庫', description: '提供「福」字、招財進寶、年年有餘等 100+ 傳統圖案，方便快速設計' },
        { title: '生肖設計服務', description: '每年推出生肖主題利是封設計，融入當年生肖元素和現代設計美學' },
        { title: '企業定制諮詢', description: '專業顧問為企業定制利是封方案，從設計到印刷一站式服務' },
      ],
    },
    buyingGuide: {
      title: '利是封選購指南',
      paragraphs: [
        '選擇利是封時，首先要考慮用途和預算。企業大量贈禮推薦 128g 銅版紙配合燙金工藝，經濟且體面；高端品牌 VIP 贈禮推薦 200g 白卡紙或珠光紙配合浮雕工藝，質感極佳；文創品牌推薦紋理紙或環保再生紙，傳遞品牌理念。',
        '工藝選擇是利是封的靈魂。燙金是最經典的選擇，適合傳統節慶；浮雕擊凸增添觸感記憶；立體工藝和雷射切割適合高端定制，收藏價值高。建議至少選擇一種特色工藝，讓利是封從普通變身精品。',
        '時間規劃是利是封印刷的關鍵。建議提前 1–2 個月開始準備設計和印刷，避開春節前的印刷高峰期。我們提供生肖設計服務和傳統圖案庫，幫助您快速完成設計。',
      ],
    },
    faq: [
      { q: '利是封印刷最低多少個起？', a: '500 個起訂（數碼印刷）。5,000 個以上柯式印刷更經濟，單價低至 HK$0.8/個。' },
      { q: '利是封有哪些紙張選擇？', a: '128g 銅版紙、200g 白卡紙、珠光紙、紋理紙、環保再生紙。' },
      { q: '可以燙金或浮雕嗎？', a: '可以。燙金、燙銀、浮雕擊凸、立體工藝、雷射切割、局部 UV 等多種工藝均可選擇。' },
      { q: '利是封最快多久可以取？', a: '數碼印刷 3–5 天；柯式印刷 5–7 天；急件 2–3 天。' },
      { q: '可以定制企業利是封嗎？', a: '可以。專業設計師為企業定制品牌利是封，融入 LOGO、品牌色彩和祝福語。' },
      { q: '可以印不同祝福語嗎？', a: '可以。支持可變數據印刷，每個利是封可以印不同員工姓名或不同祝福語。' },
      { q: '利是封的尺寸可以定制嗎？', a: '可以。標準尺寸有小號、中號、大號，也支持完全客製化尺寸。' },
      { q: '建議什麼時候開始印利是封？', a: '建議提前 1–2 個月準備，避開春節前的印刷高峰期。' },
    ],
  },
  en: {
    h2: 'Red Packet Printing Hong Kong — Foil Stamping / Embossing / 3D Craft, From 500 pcs, Lunar New Year Gifting Essential',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Red Packets?',
      items: [
        {
          heading: '1. Traditional Craft Meets Modern Design — Red Packets as Collectible Art',
          points: [
            'Foil stamping, embossing, 3D debossing, UV, and laser cutting transform red packets into collectible art pieces.',
            'Covers high-search keywords: "red packet printing Hong Kong", "foil stamped red packets", "custom red packets", "lai see printing".',
            'Ideal for corporate CNY gifts, wedding red packets, baby shower packets, and grand opening packets.',
          ],
        },
        {
          heading: '2. Small Batch, High Quality — Corporate Customization Choice',
          points: [
            '500 pcs minimum (digital printing) — ideal for SMEs and startups creating CNY gifts.',
            '5,000+ pcs offset printing, unit price as low as HK$0.8/pc for large enterprises and brand campaigns.',
            'Variable data printing supported — each packet can feature different employee names or blessings (personalized gifting).',
          ],
        },
        {
          heading: '3. Professional Design + Traditional Elements — Conveying Culture & Blessings',
          points: [
            'Professional designers deeply understand traditional culture, integrating zodiac signs, florals, and auspicious patterns into modern design.',
            'Classic patterns: "Fu" character, wealth & prosperity, surplus year after year — plus fully original custom designs.',
            'Multiple sealing options: traditional gummed flap, self-adhesive seal, magnetic seal — balancing tradition and innovation.',
          ],
        },
      ],
    },
    materialTable: {
      title: 'Material & Craftsmanship Guide',
      subtitle: 'Common Red Packet Papers and Crafts',
      columns: ['Paper Type', 'Key Features', 'Best For'],
      rows: [
        { material: '128gsm Art Paper', features: 'Vibrant colors | Economical | Great for large quantities', scenarios: 'Corporate gifts | Promotional distribution | General festivals | Budget-conscious' },
        { material: '200gsm White Card', features: 'Good stiffness | Thick feel | Fine printing detail', scenarios: 'Premium brands | VIP gifts | Collectible grade | Wedding packets' },
        { material: 'Pearl Paper', features: 'Pearlescent sheen | Premium feel | Unique visual', scenarios: 'Luxury goods | Jewelry brands | Premium hotels | Private custom' },
        { material: 'Textured Paper', features: 'Unique tactile feel | Artistic quality | Differentiation', scenarios: 'Creative brands | Designer brands | Art institutions | Specialty packets' },
        { material: 'Eco Recycled Paper', features: 'Eco-friendly | Social responsibility | Positive brand image', scenarios: 'Eco companies | NGOs | CSR projects | Green brands' },
      ],
    },
    specialOptions: {
      title: 'Special Finishing Options',
      items: [
        { name: 'Foil Stamping', description: 'Traditional craft with metallic sheen adds festive atmosphere and premium feel — a timeless classic.' },
        { name: 'Embossing', description: 'Three-dimensional patterns or text without ink — pure tactile elegance with lasting memory.' },
        { name: '3D Craft', description: 'Three-dimensional effects transform flat packets into立体 artworks with extremely high collectible value.' },
        { name: 'Laser Cutting', description: 'Fine pattern镂空 cutting with dreamy light-through effects — ideal for premium customization.' },
        { name: 'Spot UV', description: 'Glossy raised highlights on key visuals for rich tactile and visual layers.' },
        { name: 'Scented Printing', description: 'Fragrance ink releases subtle floral scent when opened — delightful surprise factor.' },
      ],
    },
    techSpecs: {
      title: 'Technical Specifications',
      items: [
        { label: 'Standard Sizes', value: 'Small(80×160mm), Medium(90×170mm), Large(100×190mm). Fully customizable.' },
        { label: 'Minimum Order', value: '500 pcs (digital printing). 5,000+ recommended for offset (more economical).' },
        { label: 'Turnaround', value: 'Standard 3–5 days (digital); 5–7 days (offset); Rush 2–3 days (digital).' },
        { label: 'File Requirements', value: 'AI / PDF, 300dpi, CMYK, 3mm bleed. Recommend separate annotation for foil stamping areas.' },
        { label: 'Paper Options', value: '128g–200gsm art / white card paper; pearl, textured, eco recycled specialty papers.' },
      ],
    },
    serviceNodes: {
      title: 'Local Service Points',
      items: [
        { title: 'Traditional Pattern Library', description: '100+ traditional patterns: "Fu" character, wealth & prosperity, surplus year after year — for quick design start.' },
        { title: 'Zodiac Design Service', description: 'Annual zodiac-themed red packet designs integrating current year zodiac elements with modern design aesthetics.' },
        { title: 'Corporate Custom Consultation', description: 'Professional consultants provide one-stop service from design to printing for corporate red packet solutions.' },
      ],
    },
    buyingGuide: {
      title: 'Red Packet Buying Guide',
      paragraphs: [
        'When choosing red packets, first consider usage and budget. Corporate bulk gifting suits 128gsm art paper with foil stamping — economical yet presentable. Premium brand VIP gifting suits 200gsm white card or pearl paper with embossing — excellent texture. Creative brands suit textured or eco recycled paper to convey brand values.',
        'Craftsmanship is the soul of red packets. Foil stamping is the most classic choice for traditional festivals; embossing adds tactile memory; 3D craft and laser cutting suit premium customization with high collectible value. We recommend at least one special finish to transform ordinary packets into collectible art.',
        'Timing is critical for red packet printing. We recommend starting design and printing 1–2 months in advance to avoid the pre-CNY printing rush. We offer zodiac design services and a traditional pattern library to help you complete designs quickly.',
      ],
    },
    faq: [
      { q: 'What is the minimum order for red packets?', a: '500 pcs (digital printing). 5,000+ pcs recommended for offset, as low as HK$0.8/pc.' },
      { q: 'What paper options are available?', a: '128gsm art paper, 200gsm white card, pearl paper, textured paper, eco recycled paper.' },
      { q: 'Can red packets be foil stamped or embossed?', a: 'Yes. Foil stamping, embossing, 3D craft, laser cutting, spot UV, and scented printing all available.' },
      { q: 'What is the fastest turnaround for red packets?', a: 'Digital: 3–5 days; Offset: 5–7 days; Rush: 2–3 days.' },
      { q: 'Can you customize corporate red packets?', a: 'Yes. Professional designers create branded red packets integrating logos, brand colors, and blessings.' },
      { q: 'Can each packet have different blessings?', a: 'Yes. Variable data printing allows different employee names or blessings per packet.' },
      { q: 'Can red packet sizes be customized?', a: 'Yes. Standard sizes: small, medium, large. Fully custom sizes also supported.' },
      { q: 'When should I start printing red packets?', a: 'Recommend starting 1–2 months in advance to avoid the pre-CNY printing rush.' },
    ],
  },
  ja: {
    h2: '香港 红包印刷 — 箔押し／エンボス／立体加工、500枚から、旧正月ギフトの定番',
    coreAdvantages: {
      title: 'ZprintPro 红包印刷の強み',
      items: [
        {
          heading: '1. 伝統工芸と現代デザインの融合、红包をブランドアートに',
          points: [
            '箔押し、エンボス、立体デボス、UV、レーザーカットなどの伝統工芸で、红包をコレクション級のアートに変身させます。',
            '「红包印刷 香港」、「箔押し红包」、「カスタム红包」、「利是封」などの高検索ボリュームキーワードをカバー。',
            '企業の旧正月ギフト、結婚式红包、百日祝い、開業红包などの伝統的な祝祭シーンに最適。',
          ],
        },
        {
          heading: '2. 小ロット高品質、企業カスタマイズの第一選択',
          points: [
            '500枚から（デジタル印刷）。中小企業やスタートアップの旧正月ギフト作成に最適。',
            '5,000枚以上はオフセット印刷で、単価HK$0.8／枚までお得。大企業やブランドキャンペーンに最適。',
            '可変データ印刷に対応。1枚ずつ異なる従業員名や祝福の言葉が可能（パーソナライズギフト）。',
          ],
        },
        {
          heading: '3. プロデザイン＋伝統要素で、文化と祝福を伝える',
          points: [
            'プロのデザイナーが伝統文化を深く理解し、干支、花柄、縁起の良い模様を現代デザインに統合。',
            '「福」字、招財進寶、年年有余などの古典的な模様を提供。完全なオリジナルデザインも対応。',
            '複数の封口方式：伝統的な糊付け、両面テープ封口、磁石封口。伝統と革新の両立。',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質・工法ガイド',
      subtitle: '红包によく使われる紙と工芸',
      columns: ['紙タイプ', '主な特徴', '最適な用途'],
      rows: [
        { material: '128gコート紙', features: '発色鮮やか｜手頃｜大量印刷向き', scenarios: '企業ギフト｜プロモ配布｜一般祝祭｜予算重視' },
        { material: '200g白カード紙', features: 'かし性良好｜厚みのある手触り｜印刷精度高', scenarios: '高級ブランド｜VIPギフト｜コレクション級｜結婚式红包' },
        { material: 'パール紙', features: 'パール光沢｜高級感｜独特の視覚効果', scenarios: '高級品｜ジュエリーブランド｜高級ホテル｜プライベート' },
        { material: 'テクスチャ紙', features: '独特の触感｜アート感｜差別化', scenarios: 'クリエイティブブランド｜デザイナーブランド｜アート機関' },
        { material: 'エコ再生紙', features: 'エコフレンドリー｜社会的責任｜ブランドポジティブ', scenarios: 'エコ企業｜NGO｜CSRプロジェクト｜グリーンブランド' },
      ],
    },
    specialOptions: {
      title: '特殊加工オプション',
      items: [
        { name: '箔押し', description: '伝統工芸で金属光沢が季節感と高級感を演出。時代を超えた定番。' },
        { name: 'エンボス', description: 'インクなしでパターンや文字を立体的に表現。触感の記憶に残ります。' },
        { name: '立体加工', description: '3D立体効果で平面の红包を立体アートに。コレクション価値が極めて高い。' },
        { name: 'レーザーカット', description: '細かな模様をレーザーで镂空。光が透過して幻想的な効果。高級カスタムに最適。' },
        { name: '局部UV', description: '重要なビジュアルを光沢で強調。触感も立体的で、視覚的な層が豊か。' },
        { name: '香り付き印刷', description: '香りインクを使用。红包を開くと微かな花香が広がり、驚きの演出。' },
      ],
    },
    techSpecs: {
      title: '技術仕様',
      items: [
        { label: '標準サイズ', value: '小(80×160mm)、中(90×170mm)、大(100×190mm)。完全カスタマイズ対応。' },
        { label: '最小発注数', value: '500枚から（デジタル印刷）。5,000枚以上はオフセット印刷がお得。' },
        { label: '納期', value: '標準3–5日（デジタル）。5–7日（オフセット）。急行2–3日（デジタル）。' },
        { label: 'ファイル要件', value: 'AI／PDF、300dpi、CMYK、3mmのbleed。箔押し部分は別途注記を推奨。' },
        { label: '紙の選択', value: '128g–200gコート紙／白カード紙。パール紙、テクスチャ紙、エコ再生紙など特殊紙。' },
      ],
    },
    serviceNodes: {
      title: 'ローカルサービス拠点',
      items: [
        { title: '伝統模様ライブラリ', description: '「福」字、招財進寶、年年有余など100以上の伝統模様を提供。デザインを迅速開始。' },
        { title: '干支デザインサービス', description: '毎年の干支をテーマにした红包デザイン。当年の干支要素と現代デザイン美学を統合。' },
        { title: '企業カスタム相談', description: 'プロのコンシェルジュが企業の红包ソリューションをデザインから印刷までワンストップで提供。' },
      ],
    },
    buyingGuide: {
      title: '红包選び方ガイド',
      paragraphs: [
        '红包を選ぶ際、まず用途と予算を考慮しましょう。企業の大量ギフトには128gコート紙に箔押しがおすすめで、手頃でありながら体裁が良いです。高級ブランドのVIPギフトには200g白カード紙またはパール紙にエンボスが最適で、質感が抜群です。クリエイティブブランドにはテクスチャ紙やエコ再生紙が適し、ブランドの理念を伝えます。',
        '加工は红包の魂です。箔押しは伝統的な祝祭に最も定番の選択。エンボスは触感の記憶を追加します。立体加工とレーザーカットは高級カスタムに適し、コレクション価値が高いです。少なくとも1つの特色ある加工を選び、普通の红包をアートに変身させましょう。',
        '红包印刷のタイミングは重要です。デザインと印刷の準備を1–2ヶ月前から開始することをおすすめし、旧正月前の印刷ラッシュを回避します。当社は干支デザインサービスと伝統模様ライブラリを提供し、迅速なデザイン完成をサポートします。',
      ],
    },
    faq: [
      { q: '红包印刷の最小発注数は？', a: '500枚から（デジタル印刷）。5,000枚以上はオフセット印刷がお得で、単価HK$0.8／枚まで。' },
      { q: 'どんな紙がありますか？', a: '128gコート紙、200g白カード紙、パール紙、テクスチャ紙、エコ再生紙。' },
      { q: '箔押しやエンボスはできますか？', a: 'はい。箔押し、エンボス、立体加工、レーザーカット、局部UV、香り付き印刷などが可能です。' },
      { q: '红包の最短納期は？', a: 'デジタル印刷3–5日。オフセット印刷5–7日。急行2–3日。' },
      { q: '企業红包のカスタマイズは可能？', a: 'はい。プロデザイナーがブランド红包を作成。ロゴ、ブランドカラー、祝福の言葉を統合します。' },
      { q: '異なる祝福の言葉は印刷できますか？', a: 'はい。可変データ印刷で、異なる従業員名や祝福の言葉を各红包に印刷可能です。' },
      { q: '红包のサイズはカスタマイズできますか？', a: 'はい。標準サイズは小・中・大。完全カスタマイズサイズも対応。' },
      { q: '红包印刷はいつから始めるべき？', a: '1–2ヶ月前から準備を開始することをおすすめ。旧正月前の印刷ラッシュを回避します。' },
    ],
  },
};

// =============================================================================
// 13. EDUCATIONAL — 校園教育印刷
// =============================================================================
const educationalContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    h2: '香港校園教育印刷 — 作業簿／教科書／證書，專業教育印刷服務',
    coreAdvantages: {
      title: '核心競爭優勢',
      items: [
        {
          heading: '1. 教育印刷專家：作業簿到教科書一站式',
          points: [
            '提供作業簿、練習簿、教科書、教師手冊、成績表、證書、獎狀、畢業紀念冊等全系列教育印刷',
            '滿足「教育印刷 香港」、「作業簿印刷」、「教科書印刷」、「證書印刷」等高搜索量關鍵詞',
            '服務對象覆蓋幼稚園、小學、中學、大學、補習社、教育機構等全教育階段',
          ],
        },
        {
          heading: '2. 環保安全，符合教育標準',
          points: [
            '使用大豆油墨和 FSC 認證環保紙張，無毒無害，符合兒童產品安全標準',
            '紙張選擇豐富：書寫紙、道林紙、銅版紙、啞粉紙，適合不同學科需求',
            '裝訂方式安全：騎馬釘圓角處理、膠裝無銳邊、線裝牢固不散頁，保護學生安全',
          ],
        },
        {
          heading: '3. 小批量彈性起訂，學校預算友好',
          points: [
            '50 本起訂（數碼印刷），適合小型補習社和專題教材',
            '500 本以上柯式印刷更經濟，適合全校統一教材和大型教育機構',
            '教育機構專屬折扣，長期合作客戶享受額外優惠和優先排期',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質工藝詳解',
      subtitle: '教育印刷常用紙張與裝訂方式',
      columns: ['產品類型', '關鍵特性', '適用場景'],
      rows: [
        { material: '作業簿', features: '書寫流暢｜紙張適中｜裝訂牢固｜經濟', scenarios: '幼稚園｜小學｜中學｜補習社' },
        { material: '教科書', features: '色彩準確｜圖文並茂｜耐久度高｜裝訂安全', scenarios: '小學｜中學｜大學｜專業教材' },
        { material: '證書／獎狀', features: '高級質感｜防偽設計｜莊重感', scenarios: '畢業典禮｜比賽頒獎｜榮譽證書｜資格認證' },
        { material: '畢業紀念冊', features: '收藏級品質｜照片豐富｜情感價值', scenarios: '幼稚園畢業｜小學畢業｜中學畢業｜大學畢業' },
        { material: '教師手冊', features: '專業排版｜表格清晰｜便於翻閱', scenarios: '教學指導｜課程規劃｜學校管理｜培訓資料' },
      ],
    },
    specialOptions: {
      title: '特殊加工選項',
      items: [
        { name: '圓角裁切', description: '所有邊角圓角處理，避免尖角刮傷學生，符合兒童產品安全標準' },
        { name: '防水覆膜', description: '封面覆膜處理，防水防污，延長教材使用壽命' },
        { name: '燙金證書', description: '證書和獎狀燙金學校名稱和校徽，增添莊重感和收藏價值' },
        { name: '防偽水印', description: '證書專用防偽水印設計，防止偽造，確保文憑真實性' },
        { name: '可更換封面', description: '活頁夾或硬膠套設計，方便更換封面或補充內頁' },
        { name: '多語言對照', description: '中英文對照教材，適合國際學校和雙語教學環境' },
      ],
    },
    techSpecs: {
      title: '技術參數詳解',
      items: [
        { label: '標準尺寸', value: '作業簿：A4(210×297mm)、A5(148×210mm)、B5(176×250mm)；證書：A4、A3；支持完全客製化' },
        { label: '起訂量', value: '50 本起訂（數碼印刷），500 本以上柯式印刷更經濟' },
        { label: '交期', value: '標準 3–5 天（數碼）；5–7 天（柯式）；急件 2–3 天（數碼）' },
        { label: '檔案要求', value: 'AI / PDF / Word，300dpi，CMYK，預留 3mm 出血位' },
        { label: '環保認證', value: 'FSC 認證環保紙張、大豆油墨、無毒無害，符合教育產品安全標準' },
      ],
    },
    serviceNodes: {
      title: '本地化服務節點',
      items: [
        { title: '教育機構專屬折扣', description: '學校、補習社、教育機構享受專屬折扣，長期合作客戶額外優惠' },
        { title: '學期批量優惠', description: '每學期開學前批量訂購教材享受額外折扣和優先排期' },
        { title: '教材設計諮詢', description: '專業設計師提供教材排版建議，確保內容清晰易讀，符合教育標準' },
      ],
    },
    buyingGuide: {
      title: '教育印刷選購指南',
      paragraphs: [
        '選擇教育印刷產品時，首先要考慮學生的年齡和使用場景。幼稚園和小學推薦圓角處理的作業簿，避免尖角傷害；中學和大學推薦膠裝或鎖線裝訂的教科書，耐久度高且便於翻閱；證書和獎狀推薦燙金和防偽設計，確保莊重感和真實性。',
        '紙張選擇影響書寫體驗和耐用性。作業簿推薦 80g 書寫紙或道林紙，書寫流暢且不暈墨；教科書推薦 128g 銅版紙，圖文並茂且色彩準確；證書推薦 250g 以上白卡紙或珠光紙，挺度好且質感高級。',
        '教育機構應提前規劃印刷需求。建議每學期開學前 1 個月開始準備教材印刷，避開開學季的印刷高峰期。我們提供學期批量優惠和優先排期服務，確保您的教材準時到位。',
      ],
    },
    faq: [
      { q: '教育印刷最低多少本起？', a: '50 本起訂（數碼印刷）。500 本以上柯式印刷更經濟。教育機構享受專屬折扣。' },
      { q: '可以印刷作業簿和教科書嗎？', a: '可以。提供作業簿、練習簿、教科書、教師手冊等全系列教育印刷。' },
      { q: '教育印刷使用環保材料嗎？', a: '使用 FSC 認證環保紙張和大豆油墨，無毒無害，符合教育產品安全標準。' },
      { q: '可以印刷證書和獎狀嗎？', a: '可以。提供燙金證書、防偽水印證書、獎狀等多種形式。' },
      { q: '教育印刷需要多久？', a: '標準 3–5 天（數碼）；5–7 天（柯式）；急件 2–3 天。' },
      { q: '可以幫忙設計教材嗎？', a: '可以。專業設計師提供教材排版服務，確保內容清晰易讀，符合教育標準。' },
      { q: '有教育機構折扣嗎？', a: '有。學校、補習社、教育機構享受專屬折扣，長期合作客戶額外優惠。' },
      { q: '建議什麼時候開始準備教材印刷？', a: '建議每學期開學前 1 個月開始準備，避開開學季的印刷高峰期。' },
    ],
  },
  en: {
    h2: 'Educational Printing Hong Kong — Exercise Books / Textbooks / Certificates, Professional Education Printing Services',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Educational Printing?',
      items: [
        {
          heading: '1. Education Printing Specialists: Exercise Books to Textbooks in One Place',
          points: [
            'Full range: exercise books, workbooks, textbooks, teacher manuals, report cards, certificates, awards, and graduation yearbooks.',
            'Covers high-search keywords: "educational printing Hong Kong", "exercise book printing", "textbook printing", "certificate printing".',
            'Serving kindergartens, primary schools, secondary schools, universities, tutoring centers, and all educational institutions.',
          ],
        },
        {
          heading: '2. Eco-Friendly & Safe, Meeting Educational Standards',
          points: [
            "Soy-based inks and FSC-certified eco-friendly papers — non-toxic and safe, meeting children's product safety standards.",
            'Rich paper selection: writing paper, offset paper, art paper, matte paper — suited for different subject needs.',
            "Safe binding: saddle-stitch with rounded corners, perfect binding with no sharp edges, sewn binding that won't fall apart — protecting student safety.",
          ],
        },
        {
          heading: '3. Small Batch Flexibility, School Budget Friendly',
          points: [
            '50 pcs minimum (digital printing) — ideal for small tutoring centers and special topic materials.',
            '500+ pcs offset printing for better economy — suited for school-wide uniform textbooks and large institutions.',
            'Educational institution exclusive discounts — long-term cooperation clients enjoy additional discounts and priority scheduling.',
          ],
        },
      ],
    },
    materialTable: {
      title: 'Material & Craftsmanship Guide',
      subtitle: 'Common Educational Printing Papers and Binding Methods',
      columns: ['Product Type', 'Key Features', 'Best For'],
      rows: [
        { material: 'Exercise Books', features: 'Smooth writing | Medium weight | Durable binding | Economical', scenarios: 'Kindergartens | Primary | Secondary | Tutoring centers' },
        { material: 'Textbooks', features: 'Color accurate | Rich illustrations | High durability | Safe binding', scenarios: 'Primary | Secondary | University | Professional courses' },
        { material: 'Certificates / Awards', features: 'Premium feel | Anti-fraud design | Dignified appearance', scenarios: 'Graduations | Competitions | Honors | Qualifications' },
        { material: 'Graduation Yearbooks', features: 'Collectible quality | Photo-rich | Emotional value', scenarios: 'Kindergarten grad | Primary grad | Secondary grad | University grad' },
        { material: 'Teacher Manuals', features: 'Professional layout | Clear tables | Easy to browse', scenarios: 'Teaching guides | Curriculum planning | School management | Training materials' },
      ],
    },
    specialOptions: {
      title: 'Special Finishing Options',
      items: [
        { name: 'Rounded Corners', description: "All corners rounded to prevent scratches — meets children's product safety standards." },
        { name: 'Waterproof Lamination', description: 'Cover lamination for waterproof and stain-resistant protection — extends textbook lifespan.' },
        { name: 'Foil Stamped Certificates', description: 'School name and emblem in foil stamping adds dignity and collectible value to certificates.' },
        { name: 'Anti-Fraud Watermark', description: 'Special anti-fraud watermark design for certificates — prevents forgery and ensures diploma authenticity.' },
        { name: 'Replaceable Covers', description: 'Binder or hard plastic sleeve design for easy cover replacement or page supplementation.' },
        { name: 'Multi-Language', description: 'Chinese/English bilingual textbooks for international schools and dual-language teaching environments.' },
      ],
    },
    techSpecs: {
      title: 'Technical Specifications',
      items: [
        { label: 'Standard Sizes', value: 'Exercise books: A4(210×297mm), A5(148×210mm), B5(176×250mm); Certificates: A4, A3. Fully customizable.' },
        { label: 'Minimum Order', value: '50 pcs (digital printing). 500+ recommended for offset (more economical).' },
        { label: 'Turnaround', value: 'Standard 3–5 days (digital); 5–7 days (offset); Rush 2–3 days (digital).' },
        { label: 'File Requirements', value: 'AI / PDF / Word, 300dpi, CMYK, 3mm bleed.' },
        { label: 'Eco Certifications', value: 'FSC-certified eco paper, soy-based inks, non-toxic — meets educational product safety standards.' },
      ],
    },
    serviceNodes: {
      title: 'Local Service Points',
      items: [
        { title: 'Educational Institution Discounts', description: 'Schools, tutoring centers, and educational institutions enjoy exclusive discounts — long-term clients get additional benefits.' },
        { title: 'Semester Bulk Discounts', description: 'Bulk textbook orders before each semester enjoy extra discounts and priority scheduling.' },
        { title: 'Educational Design Consultation', description: 'Professional designers provide textbook layout advice ensuring clear, readable content meeting educational standards.' },
      ],
    },
    buyingGuide: {
      title: 'Educational Printing Buying Guide',
      paragraphs: [
        'When choosing educational printing products, first consider student age and usage scenarios. Kindergartens and primary schools suit exercise books with rounded corners to prevent injuries. Secondary schools and universities suit perfect-bound or sewn textbooks for durability and easy browsing. Certificates and awards benefit from foil stamping and anti-fraud design for dignity and authenticity.',
        'Paper selection affects writing experience and durability. Exercise books suit 80gsm writing or offset paper for smooth writing without bleed-through. Textbooks suit 128gsm art paper for rich illustrations and accurate colors. Certificates suit 250gsm+ white card or pearl paper for good stiffness and premium feel.',
        'Educational institutions should plan printing needs in advance. We recommend preparing textbook printing 1 month before each semester starts to avoid the back-to-school rush. We offer semester bulk discounts and priority scheduling to ensure your materials arrive on time.',
      ],
    },
    faq: [
      { q: 'What is the minimum order for educational printing?', a: '50 pcs (digital printing). 500+ pcs recommended for offset. Educational institutions enjoy exclusive discounts.' },
      { q: 'Can you print exercise books and textbooks?', a: 'Yes. Full range: exercise books, workbooks, textbooks, teacher manuals, and more.' },
      { q: 'Do you use eco-friendly materials?', a: 'Yes. FSC-certified eco paper and soy-based inks — non-toxic, meeting children\'s product safety standards.' },
      { q: 'Can you print certificates and awards?', a: 'Yes. Foil-stamped certificates, anti-fraud watermark certificates, and awards available.' },
      { q: 'How long does educational printing take?', a: 'Standard 3–5 days (digital); 5–7 days (offset); Rush 2–3 days.' },
      { q: 'Do you offer textbook design services?', a: 'Yes. Professional designers provide textbook layout services ensuring clear, readable content meeting educational standards.' },
      { q: 'Are there discounts for educational institutions?', a: 'Yes. Schools, tutoring centers, and institutions enjoy exclusive discounts — long-term clients get additional benefits.' },
      { q: 'When should I start preparing textbook printing?', a: 'Recommend starting 1 month before each semester to avoid the back-to-school printing rush.' },
    ],
  },
  ja: {
    h2: '香港 教育印刷 — ノート／教科書／証書、プロの教育印刷サービス',
    coreAdvantages: {
      title: 'ZprintPro 教育印刷の強み',
      items: [
        {
          heading: '1. 教育印刷専門家：ノートから教科書までワンストップ',
          points: [
            'ノート、ワークブック、教科書、教師用マニュアル、成績表、証書、表彰状、卒業記念冊など教育印刷の全系列を提供。',
            '「教育印刷 香港」、「ノート印刷」、「教科書印刷」、「証書印刷」などの高検索ボリュームキーワードをカバー。',
            '幼稚園、小学校、中学校、大学、塾、教育機関など全教育段階を対象。',
          ],
        },
        {
          heading: '2. エコ＆安全、教育基準に準拠',
          points: [
            '大豆インクとFSC認証エコ紙を使用。無毒無害で、子供用品安全基準に準拠。',
            '豊富な紙選択：書籍紙、オフセット紙、コート紙、マット紙。異なる学科のニーズに対応。',
            '安全な製本：中綴じ丸角処理、無線綴じ鋭利な辺なし、糸かがり綴じで散りにくい。生徒の安全を保護。',
          ],
        },
        {
          heading: '3. 小ロット対応、学校予算に優しい',
          points: [
            '50冊から（デジタル印刷）。小規模な塾や特別教材に最適。',
            '500冊以上はオフセット印刷がお得。全校統一教材や大規模教育機関に最適。',
            '教育機関専用割引。長期協力クライアントは追加割引と優先スケジュールを享受。',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質・工法ガイド',
      subtitle: '教育印刷によく使われる紙と製本方式',
      columns: ['製品タイプ', '主な特徴', '最適な用途'],
      rows: [
        { material: 'ノート', features: '書きやすい｜適度な厚み｜製本牢固｜手頃', scenarios: '幼稚園｜小学校｜中学校｜塾' },
        { material: '教科書', features: '色彩正確｜図文豊富｜高耐久｜安全製本', scenarios: '小学校｜中学校｜大学｜専門教材' },
        { material: '証書／表彰状', features: '高級感｜偽造防止｜荘重感', scenarios: '卒業式｜競技会｜表彰｜資格認定' },
        { material: '卒業記念冊', features: 'コレクション級｜写真豊富｜感情的価値', scenarios: '幼稚園卒業｜小学校卒業｜中学校卒業｜大学卒業' },
        { material: '教師用マニュアル', features: 'プロ組版｜表が明確｜閲覧しやすい', scenarios: '教育指導｜カリキュラム｜学校管理｜研修資料' },
      ],
    },
    specialOptions: {
      title: '特殊加工オプション',
      items: [
        { name: '丸角裁切', description: 'すべての角を丸角処理。尖った角で子供を傷つけるのを防ぎ、子供用品安全基準に準拠。' },
        { name: '防水ラミネート', description: '表紙にラミネート処理。防水防汚で、教材の使用寿命を延長。' },
        { name: '箔押し証書', description: '証書と表彰状に学校名と校章を箔押し。荘重感とコレクション価値を演出。' },
        { name: '偽造防止透かし', description: '証書専用の偽造防止透かしデザイン。偽造を防止し、ディプロマの真正性を確保。' },
        { name: '表紙交換可能', description: 'バインダーまたは硬質ケース設計で、表紙の交換やページの追加が簡単。' },
        { name: '多言語対応', description: '中英対応の教材。インターナショナルスクールやバイリンガル教育環境に最適。' },
      ],
    },
    techSpecs: {
      title: '技術仕様',
      items: [
        { label: '標準サイズ', value: 'ノート：A4(210×297mm)、A5(148×210mm)、B5(176×250mm)。証書：A4、A3。完全カスタマイズ対応。' },
        { label: '最小発注数', value: '50冊から（デジタル印刷）。500冊以上はオフセット印刷がお得。' },
        { label: '納期', value: '標準3–5日（デジタル）。5–7日（オフセット）。急行2–3日（デジタル）。' },
        { label: 'ファイル要件', value: 'AI／PDF／Word、300dpi、CMYK、3mmのbleed。' },
        { label: 'エコ認証', value: 'FSC認証エコ紙、大豆インク、無毒無害。教育製品安全基準に準拠。' },
      ],
    },
    serviceNodes: {
      title: 'ローカルサービス拠点',
      items: [
        { title: '教育機関専用割引', description: '学校、塾、教育機関は専用割引を享受。長期協力クライアントは追加特典あり。' },
        { title: '学期前大口割引', description: '学期開始前の教材大口注文は追加割引と優先スケジュールを享受。' },
        { title: '教材デザイン相談', description: 'プロデザイナーが教材の組版アドバイスを提供。内容の明確さと教育基準への準拠を確保。' },
      ],
    },
    buyingGuide: {
      title: '教育印刷選び方ガイド',
      paragraphs: [
        '教育印刷製品を選ぶ際、まず生徒の年齢と使用シーンを考慮しましょう。幼稚園と小学校には丸角処理のノートがおすすめで、尖った角での怪我を防ぎます。中学校と大学には無線綴じまたは糸かがり綴じの教科書が適し、耐久性が高く閲覧しやすいです。証書と表彰状には箔押しと偽造防止デザインが最適で、荘重感と真正性を確保します。',
        '紙の選択は書き心地と耐久性に影響します。ノートには80gの書籍紙またはオフセット紙が適し、書きやすくにじみません。教科書には128gのコート紙がおすすめで、図文が豊かで色彩が正確です。証書には250g以上の白カード紙またはパール紙が適し、かし性が良く質感が高級です。',
        '教育機関は印刷ニーズを事前に計画すべきです。学期開始1ヶ月前から教材印刷の準備を開始することをおすすめし、新学期ラッシュを回避します。当社は学期前大口割引と優先スケジュールを提供し、教材が間に合うようサポートします。',
      ],
    },
    faq: [
      { q: '教育印刷の最小発注数は？', a: '50冊から（デジタル印刷）。500冊以上はオフセット印刷がお得。教育機関は専用割引を享受。' },
      { q: 'ノートと教科書の印刷は可能？', a: 'はい。ノート、ワークブック、教科書、教師用マニュアルなど教育印刷の全系列を提供します。' },
      { q: 'エコ素材を使用していますか？', a: 'はい。FSC認証エコ紙と大豆インクを使用。無毒無害で、子供用品安全基準に準拠しています。' },
      { q: '証書と表彰状の印刷は可能？', a: 'はい。箔押し証書、偽造防止透かし証書、表彰状など多様な形式を提供します。' },
      { q: '教育印刷にどのくらいかかりますか？', a: '標準3–5日（デジタル）。5–7日（オフセット）。急行2–3日。' },
      { q: '教材のデザインも依頼できますか？', a: 'はい。プロデザイナーが教材の組版サービスを提供。内容の明確さと教育基準への準拠を確保します。' },
      { q: '教育機関向け割引はありますか？', a: 'はい。学校、塾、教育機関は専用割引を享受。長期協力クライアントは追加特典があります。' },
      { q: '教材印刷はいつから準備すべき？', a: '学期開始1ヶ月前から準備を開始することをおすすめ。新学期の印刷ラッシュを回避します。' },
    ],
  },
};

// Default content generator for categories without full content yet
export function getDefaultCategoryContent(categorySlug: string, locale: string): CategoryLocaleContent {
  const nameMap: Record<string, { 'zh-hk': string; en: string; ja: string }> = {
    stickers: { 'zh-hk': '貼紙印刷', en: 'Sticker Printing', ja: 'シール印刷' },
    flyers: { 'zh-hk': '宣傳單張印刷', en: 'Flyer Printing', ja: 'チラシ印刷' },
    posters: { 'zh-hk': '海報印刷', en: 'Poster Printing', ja: 'ポスター印刷' },
    'paper-bags': { 'zh-hk': '紙袋印刷', en: 'Paper Bag Printing', ja: '紙袋印刷' },
    banners: { 'zh-hk': '噴繪廣告印刷', en: 'Banner Printing', ja: 'バナー印刷' },
    books: { 'zh-hk': '書籍印刷', en: 'Book Printing', ja: '書籍印刷' },
    menus: { 'zh-hk': '餐牌印刷', en: 'Menu Printing', ja: 'メニュー印刷' },
    envelopes: { 'zh-hk': '信封印刷', en: 'Envelope Printing', ja: '封筒印刷' },
    calendars: { 'zh-hk': '年曆印刷', en: 'Calendar Printing', ja: 'カレンダー印刷' },
    'red-packets': { 'zh-hk': '利是封印刷', en: 'Red Packet Printing', ja: 'ポチ袋印刷' },
    educational: { 'zh-hk': '校園教育印刷', en: 'Educational Printing', ja: '教育印刷' },
  };
  
  const name = nameMap[categorySlug]?.[locale as 'zh-hk' | 'en' | 'ja'] || categorySlug;
  const isZh = locale === 'zh-hk';
  const isEn = locale === 'en';
  
  return {
    h2: isZh ? `香港${name} — 專業品質，價格透明` : isEn ? `${name} Hong Kong — Professional Quality, Transparent Pricing` : `香港 ${name} — プロ品質、透明な価格`,
    coreAdvantages: {
      title: isZh ? '核心競爭優勢' : isEn ? 'Why Choose ZprintPro?' : 'ZprintProの強み',
      items: [
        {
          heading: isZh ? `1. 專業${name}服務` : isEn ? `1. Professional ${name} Services` : `1. プロの${name}サービス`,
          points: [
            isZh ? `智印云提供專業的${name}服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。` : isEn ? `ZprintPro offers professional ${name.toLowerCase()} services using premium materials and advanced printing technology.` : `ZprintProは高品質な素材と先進的な印刷技術を使用したプロの${name}サービスを提供します。`,
            isZh ? '支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。' : isEn ? 'Flexible minimum orders and fast turnaround to meet all your printing needs.' : '柔軟な最小発注数と迅速な納品で、あらゆる印刷ニーズにお応えします。',
            isZh ? '適用於企業宣傳、活動推廣、產品包裝、品牌展示等多元場景。' : isEn ? 'Suitable for corporate promotion, events, product packaging, and brand display.' : '企業宣伝、イベント、商品パッケージ、ブランド展示など多様なシーンに対応。',
          ],
        },
        {
          heading: isZh ? '2. 快速交貨，全港配送' : isEn ? '2. Fast Turnaround, Island-Wide Delivery' : '2. 迅速な納品、香港全域配送',
          points: [
            isZh ? '標準 3–5 天交貨，急件 24–48 小時處理。' : isEn ? 'Standard 3–5 day delivery, rush orders in 24–48 hours.' : '標準3–5日納品、急行注文は24–48時間。',
            isZh ? '全港順豐速遞，支持到店自取。' : isEn ? 'SF Express across Hong Kong, with store pickup available.' : '香港全域SFエクスプレス、店頭受取も可能。',
            isZh ? '企業客戶可申請月結賬戶，享受批量優惠。' : isEn ? 'Corporate accounts available with volume discounts.' : '法人様は月次請求が可能で、大口割引をご利用いただけます。',
          ],
        },
        {
          heading: isZh ? '3. 免費設計支援，品質保證' : isEn ? '3. Free Design Support, Quality Guaranteed' : '3. 無料デザイン支援、品質保証',
          points: [
            isZh ? '提供免費設計模板和專業設計師一對一諮詢。' : isEn ? 'Free design templates and one-on-one designer consultation.' : '無料デザインテンプレートとプロのデザイナーによる一对一相談。',
            isZh ? '先進印刷設備確保色彩準確、細節清晰。' : isEn ? 'Advanced equipment ensures accurate colors and crisp details.' : '先進的な設備で正確な色彩と鮮明なディテールを実現。',
            isZh ? '不滿意可免費重印，售後無憂。' : isEn ? 'Free reprint if not satisfied — worry-free after-sales service.' : '満足いただけない場合は無料で再印刷 — アフターサービスも安心。',
          ],
        },
      ],
    },
    materialTable: {
      title: isZh ? '材質工藝詳解' : isEn ? 'Material & Craftsmanship Guide' : '材質・工法ガイド',
      subtitle: isZh ? '常用材質與應用' : isEn ? 'Common Materials and Applications' : 'よく使われる材質と用途',
      columns: isZh ? ['材質類型', '關鍵特性', '適用場景'] : isEn ? ['Material Type', 'Key Features', 'Best For'] : ['材質タイプ', '主な特徴', '最適な用途'],
      rows: [
        { material: isZh ? '標準紙材' : isEn ? 'Standard Paper' : '標準紙材', features: isZh ? '經濟實惠｜色彩鮮豔｜適合大量' : isEn ? 'Affordable | Vibrant | Great for volume' : '手頃な価格｜発色鮮やか｜大量に最適', scenarios: isZh ? '一般宣傳｜活動推廣｜日常辦公' : isEn ? 'General promotion | Events | Office use' : '一般宣伝｜イベント｜オフィス用途' },
        { material: isZh ? '高級紙材' : isEn ? 'Premium Paper' : '高級紙材', features: isZh ? '厚實手感｜高級質感｜品牌首選' : isEn ? 'Substantial feel | Premium | Brand favorite' : '厚みのある質感｜高級感｜ブランド向け', scenarios: isZh ? '高端品牌｜企業禮品｜重要客戶' : isEn ? 'Luxury brands | Corporate gifts | VIP clients' : 'ラグジュアリー｜企業ギフト｜VIP' },
        { material: isZh ? '環保紙材' : isEn ? 'Eco Paper' : 'エコ紙材', features: isZh ? 'FSC認證｜可降解｜綠色形象' : isEn ? 'FSC certified | Biodegradable | Green image' : 'FSC認証｜生分解性｜グリーンイメージ', scenarios: isZh ? '環保企業｜有機品牌｜永續發展' : isEn ? 'Eco businesses | Organic brands | Sustainability' : '環境企業｜有機ブランド｜サステナビリティ' },
        { material: isZh ? '特殊材質' : isEn ? 'Specialty Materials' : '特殊材質', features: isZh ? '防水｜防撕｜耐用｜戶外適用' : isEn ? 'Waterproof | Tear-resistant | Durable | Outdoor' : '防水｜耐裂｜耐久｜屋外向け', scenarios: isZh ? '戶外廣告｜工業標籤｜長期展示' : isEn ? 'Outdoor ads | Industrial labels | Long-term display' : '屋外広告｜工業ラベル｜長期展示' },
      ],
    },
    specialOptions: {
      title: isZh ? '特殊加工選項' : isEn ? 'Special Finishing Options' : '特殊加工オプション',
      items: [
        { name: isZh ? '燙金／燙銀' : isEn ? 'Foil Stamping' : '箔押し', description: isZh ? '局部金屬光澤，提升品牌奢華感' : isEn ? 'Metallic sheen for instant luxury appeal' : '金属光沢で高級感を演出' },
        { name: isZh ? 'UV 局部上光' : isEn ? 'Spot UV' : 'UV局部コーティング', description: isZh ? '凸顯重點元素，觸感立體' : isEn ? 'Highlight key elements with tactile gloss' : '重要要素を立体的な光沢で強調' },
        { name: isZh ? '凹凸壓紋' : isEn ? 'Embossing' : 'エンボス', description: isZh ? '立體浮凸效果，無需油墨即可呈現質感' : isEn ? 'Three-dimensional texture without ink' : 'インクなしで立体的な質感を表現' },
        { name: isZh ? '覆膜處理' : isEn ? 'Lamination' : 'ラミネート', description: isZh ? '啞膜／光膜／觸感膜，保護表面延長壽命' : isEn ? 'Matte/gloss/soft-touch to protect and extend life' : 'マット／グロス／ソフトタッチで表面を保護' },
      ],
    },
    techSpecs: {
      title: isZh ? '技術參數詳解' : isEn ? 'Technical Specifications' : '技術仕様',
      items: [
        { label: isZh ? '尺寸範圍' : isEn ? 'Size Range' : 'サイズ範囲', value: isZh ? '完全客製化，支持標準尺寸及特殊規格' : isEn ? 'Fully customizable, standard and special sizes supported' : '完全カスタマイズ、標準サイズおよび特殊仕様に対応' },
        { label: isZh ? '起訂量' : isEn ? 'Minimum Order' : '最小発注数', value: isZh ? '50–100 個起（視產品類型而定）' : isEn ? '50–100 units depending on product type' : '50–100個から（製品タイプにより異なる）' },
        { label: isZh ? '交期' : isEn ? 'Turnaround' : '納期', value: isZh ? '常規 3–5 天；急件 24–48 小時' : isEn ? 'Standard 3–5 days; Rush 24–48 hours' : '標準3–5日、急行24–48時間' },
        { label: isZh ? '檔案要求' : isEn ? 'File Requirements' : 'ファイル要件', value: isZh ? 'AI / PDF，CMYK，300dpi，預留出血位' : isEn ? 'AI / PDF, CMYK, 300dpi, with bleed' : 'AI／PDF、CMYK、300dpi、bleed付き' },
      ],
    },
    serviceNodes: {
      title: isZh ? '本地化服務節點' : isEn ? 'Local Service Points' : 'ローカルサービス拠点',
      items: [
        { title: isZh ? '觀塘實體工廠' : isEn ? 'Kwun Tong Production Facility' : '観塘実体工場', description: isZh ? '可預約參觀，親眼見證印刷品質' : isEn ? 'Book a tour to witness print quality firsthand' : '見学予約で印刷品質を実際に確認' },
        { title: isZh ? '免費設計諮詢' : isEn ? 'Free Design Consultation' : '無料デザイン相談', description: isZh ? '專業設計師提供一對一指導' : isEn ? 'Professional designers provide one-on-one guidance' : 'プロのデザイナーが一对一で指導' },
        { title: isZh ? '全港順豐配送' : isEn ? 'Island-Wide SF Express' : '香港全域SF配送', description: isZh ? '小批量快遞，大批量專車直送' : isEn ? 'Small batches by express, large batches by dedicated truck' : '小ロットは宅配、大ロットは専用トラック直送' },
      ],
    },
    buyingGuide: {
      title: isZh ? '選購指南' : isEn ? 'Buying Guide' : '選び方ガイド',
      paragraphs: [
        isZh ? '選擇印刷產品時，首先要明確用途和目標受眾。不同的場景需要不同的材質和工藝。我們的專業顧問可根據您的預算和時間要求，推薦最合適的方案。' : isEn ? 'When choosing printed products, first clarify the purpose and target audience. Different scenarios require different materials and finishes. Our consultants recommend the best solution based on your budget and timeline.' : '印刷物を選ぶ際、まず用途とターゲットを明確にしましょう。異なるシーンには異なる材質と加工が必要です。当社のコンシェルジュが予算と納期に応じて最適なソリューションをご提案します。',
        isZh ? '其次考慮數量和預算。小批量試產可選擇數碼印刷，大批量生產則建議使用柯式印刷以降低成本。' : isEn ? 'Next, consider quantity and budget. Small-batch testing suits digital printing; large-volume production benefits from offset printing for cost savings.' : '次に数量と予算を考慮します。小ロットの試作にはデジタル印刷が適しています。大量生産にはオフセット印刷でコストを抑えられます。',
        isZh ? '最後，不要忽略設計細節。好的設計應該在 3 秒內傳達品牌信息。我們提供免費設計諮詢，確保您的印刷品既美觀又實用。' : isEn ? 'Finally, don\'t overlook design details. Good design communicates brand identity within 3 seconds. We offer free design consultation to ensure your prints are both beautiful and functional.' : '最後に、デザインのディテールを見逃さないでください。優れたデザインは3秒以内にブランド情報を伝えます。無料デザイン相談で美しく実用的な印刷物を実現します。',
      ],
    },
    faq: [
      { q: isZh ? "最低多少個起訂？" : isEn ? "What is the minimum order?" : "最小発注数は？", a: isZh ? "50–100 個起（視產品類型而定），遠低於傳統工廠標準。" : isEn ? "50–100 units depending on product type, far below traditional factory minimums." : "50–100個から（製品タイプにより異なる）。従来の工場基準を大きく下回ります。" },
      { q: isZh ? "最快多久可以交貨？" : isEn ? "What is the fastest turnaround?" : "最短納期は？", a: isZh ? "急件 24–48 小時處理；標準 3–5 天交貨。" : isEn ? "Rush orders in 24–48 hours; standard delivery 3–5 days." : "急行注文は24–48時間、標準納品は3–5日。" },
      { q: isZh ? "支持哪些檔案格式？" : isEn ? "What file formats are supported?" : "対応ファイル形式は？", a: isZh ? "AI / PDF（推薦），300dpi，CMYK 色彩模式。" : isEn ? "AI / PDF (recommended), 300dpi, CMYK color mode." : "AI／PDF（推奨）、300dpi、CMYKカラーモード。" },
      { q: isZh ? "可以幫忙設計嗎？" : isEn ? "Do you offer design services?" : "デザインサービスはありますか？", a: isZh ? "可以。提供免費模板下載和專業設計師一對一諮詢。" : isEn ? "Yes. Free templates and one-on-one designer consultation available." : "はい。無料テンプレートとプロのデザイナーによる一对一相談があります。" },
      { q: isZh ? "可以免費打樣嗎？" : isEn ? "Is prototyping free?" : "無料サンプルはありますか？", a: isZh ? "可以。確認樣板無誤後再批量生產，避免 costly 錯誤。" : isEn ? "Yes. Confirm samples before mass production to avoid costly mistakes." : "はい。量産前にサンプルを確認し、高額なミスを防ぎます。" },
      { q: isZh ? "企業批量有優惠嗎？" : isEn ? "Are there corporate discounts?" : "法人割引はありますか？", a: isZh ? "有。企業客戶可申請月結賬戶，享受批量優惠和專屬客服。" : isEn ? "Yes. Corporate accounts enjoy monthly billing, volume discounts, and dedicated support." : "はい。法人様は月次請求、大口割引、専任サポートをご利用いただけます。" },
    ],
  };
}


// Export all category content
export const categorySeoContent: CategorySeoData = {
  packaging: packagingContent,
  'business-cards': businessCardsContent,
  banners: bannersContent,
  books: booksContent,
  menus: menusContent,
  envelopes: envelopesContent,
  calendars: calendarsContent,
  'red-packets': redPacketsContent,
  educational: educationalContent,
};
