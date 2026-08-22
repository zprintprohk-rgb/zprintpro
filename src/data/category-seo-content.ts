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
  // 2026-08-19 R3 5 件套新增 (per v3.2 §四 R3)
  featuredSnippet?: string;
  lastUpdated?: string;
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
    links?: { label: string; href: string }[];
  };
  faq: FaqItem[];
}

export type CategorySeoData = Record<string, {
  'zh-hk'?: CategoryLocaleContent;
  en?: CategoryLocaleContent;
  ja?: CategoryLocaleContent;
}>;

// =============================================================================
// 1. PACKAGING — 包裝盒印刷
// =============================================================================
const packagingContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    featuredSnippet: '包裝盒訂製 100 個起印, 白卡彩盒 HK$0.03/個起 (拼版免刀模費, 對比 e-print HK$300-800 刀模費行業慣例), 坑盒卡盒天地蓋全盒型 8 檔標準尺寸, FDA 食品級 + FSC 認證可選, 8-15 天交期, DHL 全球 2-4 天. 香港本地 1-2 個工作天順豐直送, 30 秒 AI 即時報價. 跨境電商 + 零售精品 + 美妝護膚 + 餐飲外賣 + 婚慶 5 大場景覆蓋, 100-10,000 本彈性 MOQ.',
    lastUpdated: '2026-08-22',
    h2: '包裝盒訂製 / 包裝盒印刷 / 紙盒訂製 / 紙盒印刷 / 禮盒訂做 — 100個起訂，白卡彩盒坑盒卡盒全盒型，免費刀模，3天交貨',
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
        { label: '尺寸範圍', value: '完全訂製，常見如 10×10×5cm（彩盒）、30×20×15cm（瓦楞箱）' },
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
        '包裝盒訂製第一句結論：先定用途（運輸防撞定開箱體驗）、再揀盒型、最後先睇工藝。彩盒 50 個起、常規款 100 個起，3 天出貨，免費刀模設計。用途定得清，紙材同預算即刻收窄一半。',
        '盒型按行業揀：電商物流用瓦楞飛機盒（E/F 坑，抗壓耐摔）；美妝護膚用白卡彩盒或磁吸禮盒，開箱有儀式感；婚禮喜糖用天地蓋細盒 30 個起；茶飲食品用摺盒加窗口，睇到內容物先好賣。20 幾款標準盒型之外仲可以全客製。',
        '紙盒訂製嘅紙材決定檔次：300–350g 白卡挺括顯色靚，係彩盒主流；牛皮紙環保自然，有機品牌最愛；瓦楞紙按坑紋分 E 坑（薄身彩箱）同 F 坑（細盒緩衝）；出口歐美建議用 FSC 認證環保紙，清關文件齊全。',
        '食品包裝訂製有硬規矩：必須用食品級紙材同無毒大豆油墨，通過 SGS 檢測；烘焙、茶葉、保健品盒建議加防潮處理，需要時可印 QR 碼做溯源。食品包裝印刷我哋可以一次過搞掂合規文件，慳返自己搵檢測嘅時間。',
        '工藝係包裝盒印刷嘅加分位：燙金燙銀令 LOGO 有金屬光澤，局部 UV 凸出重點，擊凸做立體手感，開窗加 PVC 片展示產品。建議新品牌先做 1–2 款工藝打樣上手，睇到實物先決定量產，我哋打樣當日完成。',
        '數量同價錢嘅甜蜜點：數碼印刷 50–500 個免製版、試產最靈活；1,000 個以上柯式印刷單價可低至 HK$0.8/個；5,000 個以上約 5–7 天交，再有階梯折扣。旺季（中秋、聖誕、農曆新年）請提早 3 星期落單。',
        '好多客戶搜「包裝盒訂製」時最驚兩件事：刀模出錯同大貨色差。我哋嘅做法係免費刀模設計加數碼打樣，你確認結構同顏色先開印，印前團隊逐個檔案檢查出血、刀線同色彩模式，將出錯風險壓到最低。',
        '由報價到收貨嘅流程：提交盒型、展開尺寸、數量、紙材同工藝 → 30 秒 AI 報價 → 免費刀模同打樣 → 3 天出貨。全港順豐或專車配送，大批量可直送倉庫；跨境客戶支援出口包裝標準同 ISTA 抗壓測試報告。',
        '【包裝盒印刷 8 大盒型全表】對標 e-print 10 個盒型獨立頁：① 白卡彩盒（[產品鏈接](/zh-hk/product/white-card-boxes/)）— 350g 雙面白卡，挺度極佳，4C+0 印刷，500 枚起印；② 坑盒 / 瓦楞紙盒（[產品鏈接](/zh-hk/product/corrugated-boxes/)）— E/F 坑 3-5 層，抗壓 80-200kg，跨境電商首選；③ 卡盒 / 插口盒（[產品鏈接](/zh-hk/product/tuck-end-boxes/)）— 直插/反插/飛機插 3 結構，5 秒無膠水組裝；④ 拼版免刀模費彩盒（[產品鏈接](/zh-hk/product/gang-run-card-boxes/)）— 固定刀模共用，HK$0.03/個起印；⑤ 天地蓋盒 — 高端禮盒首選，2 片紙板結構；⑥ 飛機盒 — 跨境運輸抗摔；⑦ 抽屜盒 — 開合儀式感強；⑧ 磁吸禮盒 — 香水護膚品重複使用。包裝盒訂製客戶可按行業/場景任揀 8 種盒型。',
        '【點解拼版彩盒平 40-60%：免刀模費 vs 同業 HK$300-800 刀模費】e-print / hk-printing 等香港同業常規盒型照收刀模費（行業慣例 HK$300-800 一套）；我哋嘅 [拼版白卡彩盒（PKG-016）](/zh-hk/product/gang-run-card-boxes/) 採用固定刀模共用設計，500 枚起印即享免刀模費 + 免排版費，新品牌首批 1,000 枚計算可慳 HK$300-800 直接變淨利。紙盒印刷 + 紙盒訂製客戶可選拼版方案壓低成本，彩盒 50-10,000 枚都受惠。',
      ],
      links: [
        { label: '包裝盒訂製指南', href: '/zh-hk/blog/packaging-box-custom-guide/' },
        { label: '食品包裝印刷指南', href: '/zh-hk/blog/food-packaging-printing-guide/' },
        { label: '紙袋訂製', href: '/zh-hk/category/paper-bags/' },
        { label: '貼紙訂製', href: '/zh-hk/category/stickers/' },
      ],
    },
    faq: [
      { q: '包裝盒訂製嘅刀模費幾錢？', a: '常規盒型（白卡彩盒／坑盒／卡盒）e-print / hk-printing 等同業照收刀模費 HK$300-800 一套。我哋嘅拼版免刀模費方案（PKG-016）固定刀模共用，500 枚起印即享免刀模費 + 免排版費，新品牌首批 1,000 枚計算可慳 HK$300-800 直接變淨利。包裝盒訂製客戶可揀拼版彩盒壓低成本。' },
      { q: '包裝盒印刷起印量最低幾多？', a: '白卡彩盒 100 個起，婚禮喜糖盒 30 個起，常規工業款 100–200 個起。拼版白卡彩盒 500 個起即享免刀模費。遠低於傳統工廠的 500–1,000 個標準。' },
      { q: '紙盒訂製材質點揀：白卡 vs 坑紙 vs 銅版紙？', a: '白卡 300-350g 挺度極佳、色彩鮮豔，係彩盒主流（美妝、輕奢飾品、文創IP周邊首選）；坑盒（瓦楞）抗壓 80-200kg，跨境電商 + 重物首選；銅版紙 250-300g 成本低、輕量商品適用。三種都支援 FSC 環保認證 + 食品級 SGS 認證。' },
      { q: '包裝盒印刷交期幾耐？', a: '常規訂單 3 天出貨；快印服務 2 天交付；打樣當日完成。紙盒印刷大批量訂單（5,000 個以上）約 5–7 天。跨境客戶 DHL 全球 2-4 天送達，旺季（中秋/聖誕/農曆新年）請提早 3 星期落單。' },
      { q: '包裝盒訂製可以打樣嗎？要幾耐？', a: '可以。我哋提供 5 天免費打樣 + 數碼打樣（打樣當日完成），包括 3D 模型同實物樣本。確認結構同顏色先開印，印前團隊逐個檔案檢查出血、刀線同色彩模式，將出錯風險壓到最低。' },
      { q: '包裝盒最低多少個起訂？', a: '婚禮喜糖盒 30 個起，彩盒 50 個起，常規工業款 100–200 個起。遠低於傳統工廠的 500–1,000 個標準。' },
      { q: '包裝盒有哪些盒型可選？', a: '天地蓋盒、書型盒、抽屜盒、折疊盒、飛機盒、磁吸盒等 20 餘種標準盒型，亦支持完全訂製設計。' },
      { q: '可以用環保紙張嗎？', a: '可以。所有盒型均可選 FSC 認證環保紙張，符合國際環保標準，適合出口歐美市場。' },
      { q: '食品包裝盒安全嗎？', a: '安全。我們採用食品級紙張和無毒大豆油墨，通過 SGS 檢測認證，符合 HK 衛生署食品安全要求。' },
      { q: '包裝盒印刷需要多久？', a: '常規訂單 3 天出貨；快印服務 2 天交付；打樣當日完成。大批量訂單（5,000 個以上）約 5–7 天。' },
      { q: '可以自己設計刀模線嗎？', a: '可以。我們接受 AI / PDF 格式的刀模線文件（CMYK，300dpi）。如果不熟悉刀模設計，我們提供免費刀模設計服務。' },
      { q: '瓦楞紙箱能做抗壓測試嗎？', a: '可以。我們可根據 ISTA 標準進行抗壓和跌落測試，確保物流運輸安全。測試報告可作為出口通關文件。' },
      { q: '支持出口包裝標準嗎？', a: '支持。我們熟悉歐盟 WEEE、美國 FTC 綠色指南等出口包裝法規，可協助準備相關合規文件。' },
      { q: '香港港島、九龍、新界都可以安排送貨嗎？', a: '可以。支援順豐／專車配送，港島（如中環、銅鑼灣）、九龍（如旺角、觀塘）、新界（如沙田、屯門）均可安排；大批量可協調貨車送倉或寫字樓，運費與時效會按重量與區域於報價單列明。' },
      { q: '可以先網上報價再上傳設計稿嗎？', a: '可以。建議先提交盒型、展開尺寸、數量、紙材與表面工藝（燙金／UV／覆膜等）取得報價；確認後再上傳 AI／PDF，印前會檢查刀模、出血與色彩模式，避免批量後才發現結構或檔案問題。' },
    ],
  },
  en: {
    h2: 'Custom Packaging Box Printing — From 100 Units, Free Die-Cut Design, 3-Day Delivery',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Packaging?',
      items: [
        {
          heading: '1. Complete Material & Scene Coverage: From E-Commerce Color Boxes to Pharmaceutical Compliance Cases',
          points: [
            'We offer 10 professional series including custom color boxes, corrugated cartons, magnetic cosmetic boxes, FSC eco-friendly boxes, festive gift boxes, and wedding favor boxes — covering all your packaging printing needs.',
            'Food-grade paper materials, international food safety authorities compliance, export packaging standards, QR tracking codes, and moisture-proof treatment — meeting regulatory and cross-border requirements.',
            'Ideal for e-commerce logistics, beauty brands, food gift boxes, pharmaceutical health products, wedding favors, and corporate gifts.',
          ],
        },
        {
          heading: '2. Low MOQ + Fast Turnaround, Reducing Inventory Risk',
          points: [
            'Minimum order from just 30–50 units (wedding/favor boxes), 100 units for standard sizes — perfect for startup brands to test the market.',
            '3-day standard delivery, 2-day rush service for urgent orders. Direct from our Asia factory with DHL Express worldwide delivery — no sea freight waiting.',
            'Unit price from US$0.10, economical without requiring bulk stockpiling.',
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
        { title: 'Factory Sample Program', description: 'Book an appointment to view physical samples — foil effects, paper texture, structural strength.' },
        { title: 'Free Prototyping', description: 'Confirm appearance and structure before mass production to avoid costly mistakes.' },
        { title: 'US-Wide Delivery', description: 'Small batches via DHL / FedEx; large batches by freight to warehouse or office.' },
      ],
    },
    buyingGuide: {
      title: 'Packaging Buying Guide',
      paragraphs: [
        'Custom packaging boxes start with one decision: is this box for shipping protection or unboxing experience? That answer picks the style, and everything else follows. Color boxes start at 50 units, standard styles at 100, with free dieline design and 3-day production.',
        'Match box style to product. Corrugated mailer boxes (E/F flute) survive e-commerce shipping; white card folding cartons and magnetic rigid boxes give beauty brands a premium unboxing moment; small two-piece favor boxes start at just 30 units for weddings; window boxes let food products sell themselves on the shelf. Over 20 standard styles, plus fully custom structures.',
        'Paper stock sets the grade: 300–350gsm white card is the crisp, color-accurate standard for retail boxes; kraft reads eco and organic; E-flute corrugated handles thin retail cartons while F-flute cushions smaller boxes. Exporting to the US or EU? FSC-certified paper keeps customs paperwork simple.',
        'Food packaging has hard rules. Food-grade paper and non-toxic soy inks are non-negotiable, SGS-tested as standard; bakeries, tea, and supplement brands should add moisture-resistant coatings, and QR codes enable batch traceability. We handle compliance documentation so you do not have to chase labs yourself.',
        'Finishes are where custom boxes outshine stock packaging: gold or silver foil makes logos gleam, spot UV highlights key art, embossing adds touch, and PVC windows show the product inside. Start with one or two finishes on a free same-day sample before committing to volume.',
        'Pricing rewards scale: digital printing covers 50–500 units with no plate fees; offset from 1,000 units drops unit costs to as low as cents per box; 5,000+ runs take 5–7 days with tiered discounts. Order 3 weeks ahead of peak seasons like Christmas.',
        'From quote to doorstep: submit style, dimensions, quantity, stock, and finishes for a 30-second AI quote, approve free dielines and samples, and we ship in 3 days. Free shipping over $99, DHL express in 2–4 days worldwide, plus ISTA compression-test reports for export orders.',
      ],
      links: [
        { label: 'Custom Packaging Box Guide', href: '/en/blog/packaging-buying-guide/' },
        { label: 'Food Packaging Printing Guide', href: '/en/blog/food-packaging-printing-guide/' },
        { label: 'Custom Paper Bags', href: '/en/category/paper-bags/' },
        { label: 'Custom Stickers', href: '/en/category/stickers/' },
      ],
    },
    faq: [
      { q: 'What is the minimum order for packaging boxes?', a: 'Wedding favor boxes from 30 units, color boxes from 50 units, standard industrial from 100–200 units. Far below traditional factory minimums of 500–1,000.' },
      { q: 'What box styles are available?', a: 'Over 20 standard styles including rigid boxes, book-style boxes, drawer boxes, folding cartons, mailer boxes, and magnetic boxes. Fully custom designs also supported.' },
      { q: 'Can I use eco-friendly paper?', a: 'Yes. All box types are available with FSC-certified eco paper, meeting international environmental standards for export to Europe and America.' },
      { q: 'Are food packaging boxes safe?', a: 'Yes. We use food-grade paper and non-toxic soy-based inks, certified by SGS and compliant with international food safety authorities food safety requirements.' },
      { q: 'How long does packaging printing take?', a: 'Standard orders: 3 days. Rush service: 2 days. Prototyping: same day. Large orders (5,000+ units): approximately 5–7 days.' },
      { q: 'Can I design my own die-cut lines?', a: 'Yes. We accept AI / PDF die-cut files (CMYK, 300dpi). If you are unfamiliar with die-cut design, we provide free die-cut design services.' },
      { q: 'Can corrugated boxes pass compression testing?', a: 'Yes. We perform compression and drop testing per ISTA standards to ensure logistics safety. Test reports can serve as export customs documents.' },
      { q: 'Do you support export packaging standards?', a: 'Yes. We are familiar with EU WEEE, US FTC Green Guides, and other export packaging regulations, and can assist with compliance documentation.' },
      { q: 'Do you deliver worldwide?', a: 'Yes. We deliver worldwide via DHL Express / FedEx in 2-4 business days. Bulk orders can be arranged for warehouse or office delivery.' },
      { q: 'Can I get a quote before uploading my design file?', a: 'Yes. Submit box type, unfolded dimensions, quantity, paper material, and surface finish for a quote first. After confirmation, upload your AI / PDF file. Our prepress team will check die lines, bleed, and color mode.' },
    ],
  },
  ja: {
    h2: 'パッケージ印刷・箱製作 — 100個から、無料型設計、3日納品',
    coreAdvantages: {
      title: 'ZprintPro パッケージの強み',
      items: [
        {
          heading: '1. 全素材・全シーン対応：ECカラーボックスから医薬品規格箱まで',
          points: [
            'カスタムカラーボックス、段ボール箱、磁石式化粧品箱、FSC認証エコ箱、ギフト箱、ウエディングボックスなど10大シリーズを提供。',
            '食品グレード紙材、日本の食品衛生基準対応、輸出規格、QR追跡コード、防湿加工 — 法規制と越境要件を満たします。',
            'EC物流、美容ブランド、食品ギフト、医薬品・健康食品、結婚式引き出物、企業ギフトなど多様なシーンに対応。',
          ],
        },
        {
          heading: '2. 小ロット対応＋迅速納品、在庫リスクを削減',
          points: [
            '最小30–50個から（ウエディング／カラーボックス）、通常100個から — スタートアップブランドの試作に最適。',
            '通常3日出荷、急行2日対応。アジア自社工場直送｜日本全国SFエクスプレス配送 — 海運待ち不要。',
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
        { title: '旺角サンプルセンター', description: '実物サンプル（箔押し効果、紙質触感、構造強度）をご覧いただけます。予約製。' },
        { title: '無料サンプルサービス', description: '外観と構造を確認してから量産し、高額なミスを防ぎます。' },
        { title: '日本全国配送', description: '小ロットはSFエクスプレス、大ロットは専用トラックで倉庫またはオフィスへ直送。' },
      ],
    },
    buyingGuide: {
      title: 'パッケージ選び方ガイド',
      paragraphs: [
        'オリジナルパッケージ・箱の印刷は「輸送保護か、開封体験か」を最初に決めることが全て。カラーボックスは50個から、標準タイプは100個からの小ロット対応。無料の抜き型設計付き、3日生産の短納期です。',
        '箱型は商品に合わせて。段ボールのメーラーボックス（E/Fフルート）はEC発送に強く、白カードの組み箱やマグネット式化粧箱はコスメブランドの開封体験を演出。キャラメル型や窓付き箱は食品の店頭訴求に。20種以上の定型＋完全カスタムに対応します。',
        '用紙は300–350g白カードが発色・強度の標準。クラフト紙はエコ・オーガニックな印象、Eフルートは薄手の化粧箱、Fフルートは小箱の緩衝に。欧米輸出にはFSC認証紙が通関手続きをスムーズにします。',
        '食品パッケージには厳格なルールがあります。食品グレード紙と無毒の大豆インクは必須で、SGS検査済み。ベーカリーや茶葉、サプリには防湿コーティングを推奨。QRコードでロット追跡も可能。コンプライアンス書類もサポートします。',
        '加工は差別化の鍵。金銀箔でロゴに輝き、スポットUVでポイント強調、エンボスで立体感、PVC窓で中身をアピール。無料の当日サンプルで1–2種の加工を実物確認してから量産を決めるのが安心です。',
        '価格は数量でお得に。デジタル印刷は50–500個で製版代不要、オフセットは1,000個から単価大幅ダウン、5,000個以上は5–7日＋段階割引。クリスマスや歳末などの繁忙期は3週間前のご注文が安心です。',
        'ご注文の流れ：箱型・展開寸法・数量・用紙・加工を入力し30秒AI見積もり。無料の抜き型設計とサンプル確認後、3日で出荷。日本全国へ配送、輸出向けISTA圧縮テストレポートにも対応します。',
      ],
      links: [
        { label: 'パッケージ箱オーダーガイド', href: '/ja/blog/packaging-box-custom-guide/' },
        { label: '化粧品パッケージ印刷', href: '/ja/blog/cosmetics-packaging-box-printing-guide/' },
        { label: '紙袋 印刷', href: '/ja/category/paper-bags/' },
        { label: 'ステッカー印刷', href: '/ja/category/stickers/' },
      ],
    },
    faq: [
      { q: 'パッケージの最小発注数は？', a: 'ウエディングボックス30個から、カラーボックス50個から、標準工業用100–200個から。従来の工場基準500–1,000個を大きく下回ります。' },
      { q: '対応している箱型は？', a: '化粧箱、ブック型箱、引き出し箱、組み立て箱、ダンボール箱、磁石式箱など20種類以上の標準箱型。完全カスタムデザインも対応。' },
      { q: 'エコ紙は使えますか？', a: 'はい。全箱型でFSC認証エコ紙を選択可能。欧米輸出に対応した国際環境基準を満たします。' },
      { q: '食品パッケージは安全ですか？', a: 'はい。食品グレード紙と無毒大豆油インクを使用。SGS認証取得済み、日本の食品衛生基準に準拠。' },
      { q: 'パッケージ印刷にどのくらいかかりますか？', a: '通常注文3日、急行サービス2日、サンプル当日。大量注文（5,000個以上）は約5–7日。' },
      { q: '型抜き線を自分で設計できますか？', a: 'はい。AI／PDF形式の型抜き線データ（CMYK、300dpi）を受け付けます。型抜き設計に不慣れな場合は無料型設計サービスをご利用ください。' },
      { q: '段ボール箱は圧縮テストを通りますか？', a: 'はい。ISTA基準の圧縮・落下テストを実施し、物流安全を確保。テストレポートは輸出通関書類として利用可能です。' },
      { q: '輸出包装規格に対応していますか？', a: 'はい。EU WEEE、米国FTCグリーンガイドなどの輸出包装法規に精通しており、コンプライアンス文書の準備をサポートします。' },
      { q: '日本全国に配送していますか？', a: 'はい。東京・大阪・名古屋など日本全国へ DHL / FedEx で配送します。大口注文は倉庫やオフィスへの配送も調整可能です。' },
      { q: 'デザインファイルをアップロードする前に見積もりは取得できますか？', a: 'はい。まず箱型、展開寸法、数量、紙材、表面加工をご提出ください。確認後、AI／PDFファイルをアップロードします。印前チームが抜き型、bleed、カラーモードをチェックします。' },
    ],
  },
};

// =============================================================================
// 2. BUSINESS CARDS — 卡片印刷
// =============================================================================
const businessCardsContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    h2: '香港卡片印刷 — 100張起訂，300g高級紙，24小時急件',
    coreAdvantages: {
      title: '核心競爭優勢',
      items: [
        {
          heading: '1. 香港商務首選：專業形象從一張卡片開始',
          points: [
            '採用 300g–400g 高級銅版紙、剛古紙、荷蘭白卡、棉紙，配合德國海德堡四色印刷機，色彩準確還原',
            '滿足「卡片印刷 香港」、「卡片印刷」、「卡片設計」、「商務卡片」等高搜索量關鍵詞需求',
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
            '免費卡片模板下載，專業設計師一對一諮詢',
            '支持雙面不同設計、QR Code 卡片、NFC 智能卡片',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質工藝詳解',
      subtitle: '卡片常用紙張與工藝',
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
        { name: 'NFC 智能卡片', description: '手機一觸即傳聯絡方式，科技前衛，適合科技行業' },
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
        { title: '深圳自有工廠', description: '現代化生產基地，配備海德堡印刷設備，ISO 12647 色彩管理' },
        { title: '免費設計諮詢', description: '資深設計師一對一服務，從排版到色彩管理全程指導' },
        { title: '企業月結賬戶', description: '專屬客戶經理、批量優惠、優先排期、月結付款' },
      ],
    },
    buyingGuide: {
      title: '卡片選購指南',
      paragraphs: [
        '選擇卡片紙張時，首先要考慮行業屬性。金融、法律行業適合 400g 厚紙或剛古紙，傳達穩重專業；創意行業可選棉紙或特殊紋理紙，展示個性；科技行業推薦荷蘭白卡，簡約現代。',
        '工藝選擇上，燙金適合高端品牌，局部 UV 適合強調 LOGO，凹凸壓紋適合極簡設計。建議不要超過兩種工藝組合，避免視覺過於繁複。我們提供免費工藝搭配建議。',
        '文件準備是關鍵。請確保文字轉曲線、圖片嵌入、色彩模式為 CMYK。如果不確定，可直接上傳設計稿，我們的印前團隊會免費檢查並提供修改建議。',
        '在香港搜尋「卡片印刷 香港」「卡片燙金」「厚身卡片」的用戶往往同時在意交期與門市／寫字樓收件便利；建議先定下使用場景（展會派發、投行會議、創意作品集），再決定紙厚與工藝數量，並預留時間做數碼樣張確認色彩。',
      ],
    },
    faq: [
      { q: '卡片印刷最低多少張起？', a: '100 張起訂。數碼打樣可 50 張小量測試，適合初次合作或設計確認。' },
      { q: '卡片最快多久可以取貨？', a: '24 小時急件服務：上午 11 點前確認稿件，翌日速遞到門。標準交期 3–5 工作日。' },
      { q: '卡片支持哪些特殊工藝？', a: '燙金（金／銀／玫瑰金／香檳金）、局部 UV、凹凸壓紋、啞膠／光膠覆膜、圓角裁切、打孔、NFC 智能芯片。' },
      { q: '卡片設計文件有什麼要求？', a: 'AI / PSD / PDF 格式，300dpi，CMYK 色彩模式，預留 3mm 出血位，文字轉曲線，圖片嵌入。' },
      { q: '可以印刷雙面不同設計的卡片嗎？', a: '可以。雙面異形設計是我們的熱門選項，正面商務信息 + 背面品牌故事或 QR Code。' },
      { q: '企業批量訂購有優惠嗎？', a: '有。1,000 張以上享批量折扣，企業客戶可申請月結賬戶，專屬客戶經理跟進。' },
      { q: '卡片可以印 QR Code 嗎？', a: '可以。我們支持可變數據印刷，每張卡片的 QR Code 可以不同（鏈接不同網頁或聯絡方式）。' },
      { q: '什麼是 NFC 智能卡片？', a: '內置 NFC 芯片的卡片，手機輕觸即可自動保存聯絡方式或打開網站，適合科技行業和前瞻性品牌。' },
      { q: '香港港島、九龍、新界都可以安排送貨嗎？', a: '可以。支援順豐到付／月結及指定時段派送；港島核心商業區、九龍黃金地段與新界大型屋苑皆可安排。急件建議上午前確認稿件以便排單。' },
      { q: '可以先網上報價再決定工藝嗎？', a: '可以。請提供數量、紙張克重（300g／400g 等）、單雙面與工藝（啞膠／燙金／UV／圓角等），可先取得分段報價；印前會協助檢查安全線與出血，確保批量無誤。' },
    ],
  },
  en: {
    h2: 'Business Card Printing — 100 Cards MOQ, 300gsm Premium Stock, 24hr Rush',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Business Cards?',
      items: [
        {
          heading: '1. Your Business Card Specialist: Your Professional Image Starts Here',
          points: [
            'Premium 300–400gsm art paper, Conqueror, Dutch white card, and cotton paper. Heidelberg 4-color presses ensure accurate color reproduction.',
            'Covers high-search keywords: "business card printing online", "name card printing", "business card design", "corporate business cards".',
            'Perfect for finance, legal, medical, design, tech, and real estate professionals.',
          ],
        },
        {
          heading: '2. Lightning-Fast Delivery: Order Today, Receive Tomorrow',
          points: [
            '100 cards minimum order, standard 3–5 business day delivery.',
            '24-hour rush service: confirm artwork by 11 AM, ships next day via DHL.',
            'Worldwide coverage: DHL Express / FedEx 2-4 day delivery. Corporate clients enjoy dedicated delivery.',
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
        { title: 'Modern Production Facility', description: 'Modern production base at our Asia factory with Heidelberg presses and ISO 12647 color management.' },
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
        'Users searching for "business card printing online," "foil-stamped cards," and "thick business cards" worldwide often care about turnaround time and convenient office delivery. We recommend defining the use case first (trade shows, investment banking meetings, creative portfolios) before deciding on paper weight and finish quantities, and reserving time for digital proofing to confirm color accuracy.',
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
      { q: 'Do you deliver worldwide?', a: 'Yes. We deliver worldwide via DHL Express / FedEx in 2-4 business days. Bulk orders can be arranged for warehouse or office delivery.' },
      { q: 'Can I get a quote before uploading my design file?', a: 'Yes. Submit card size, paper type, quantity, and finishing options for a quote first. After confirmation, upload your AI / PDF file. Our prepress team will check bleed, safe margins, and color mode.' },
    ],
  },
  ja: {
    h2: '名刺印刷 — 100枚から、300g高級紙、24時間急行',
    coreAdvantages: {
      title: 'ZprintPro 名刺の強み',
      items: [
        {
          heading: '1. ビジネス向け：プロの印象は名刺から',
          points: [
            '300g–400g高級コート紙、コンカラー紙、オランダ白カード、コットン紙を採用。ハイデルベルグ4色印刷機で正確な色彩再現。',
            '「名刺印刷」、「卡片設計」、「ビジネスカード」などの高検索ボリュームキーワードをカバー。',
            '金融、法律、医療、デザイン、テック、不動産などの専門業界に最適。',
          ],
        },
        {
          heading: '2. 超高速納品：今日注文、明日到着',
          points: [
            '最小100枚から、標準3–5営業日納品。',
            '24時間急行サービス：午前11時までにデータ確定で翌日SFエクスプレス配送。',
            '日本全国をカバー。法人様は専門配送手配も可能。',
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
        { title: '自社工場 (アジア)', description: 'アジアにある自社工場。ハイデルベルグ印刷機の稼働を間近で見学可能。' },
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
        '「卡片印刷」「燕金卡片」「厚身卡片」を検索するユーザーは、納期とオフィス配送の利便性を重視することが多いです。まず使用シーン（展示会、投資銀行会議、クリエイティブポートフォリオ）を決めてから、紙厚と工苝数量を決定し、カラーの確認のためデジタル校正の時間を確保することをお勧めします。',
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
      { q: '日本全国に配送していますか？', a: 'はい。東京・大阪・名古屋など日本全国へ DHL / FedEx で配送します。大口注文は倉庫やオフィスへの配送も調整可能です。' },
      { q: 'デザインファイルをアップロードする前に見積もりは取得できますか？', a: 'はい。まず名刺サイズ、紙タイプ、数量、加工オプションをご提出ください。確認後、AI／PDFファイルをアップロードします。印前チームがbleed、安全マージン、カラーモードをチェックします。' },
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
        '活動密集區（港島會展周邊、九龍塘／旺角商場、將軍澳／荃灣社區）常有「Backdrop 背景板」「易拉寶 即日」「戶外橫額」類搜尋；預留安裝動線與電源／桁架需求，並區分短期路演與長期圍板，可大幅減少現場改稿與二次輸出。',
      ],
    },
    faq: [
      { q: 'X展架和易拉寶有什麼區別？', a: 'X展架輕便、價格低、適合短期室內使用；易拉寶自帶收納筒、便攜、畫面更平整、適合頻繁使用。' },
      { q: '戶外橫幅能使用多久？', a: 'PVC橫幅布戶外使用 1–2 年；加抗 UV 塗層可延長至 3 年。網眼布因透風性更好，壽命更長。' },
      { q: 'Backdrop 背景板最大做多大？', a: '最大寬度 3.2 米，長度無限。常見規格 3×2.2m、4×2.4m、6×3m。支持完全訂製。' },
      { q: '噴繪廣告最快多久可以取？', a: 'X展架／易拉寶即日交貨；Backdrop 1–2 天；大型橫幅 2–3 天。急件請提前告知。' },
      { q: '可以租展架嗎？', a: '可以。我們提供 X展架和易拉寶框架出租 + 畫面更換服務，適合一次性活動。' },
      { q: '戶外廣告需要申請嗎？', a: '視位置和規模而定。建築圍板一般需要屋宇署批准，街道橫幅需要食環署許可。我們可提供申請指引。' },
      { q: '噴繪畫面可以重複使用嗎？', a: '可以。妥善捲起存放於陰涼乾燥處，PVC 橫幅布可重複使用多次。但折疊存放會產生摺痕。' },
      { q: '可以提供安裝服務嗎？', a: '可以。港島、九龍主要區域提供安裝服務，包括桁架搭建、燈光配置和現場調試。' },
      { q: '香港港島、九龍、新界都可以送貨或現場安裝嗎？', a: '可以。畫面成品可順豐／貨車配送；港島與九龍主要展館及商業區可預約安裝團隊，新界大型場地亦可協調（視檔期與車輛通行而定）。建議活動前預留現場勘測時間。' },
      { q: '可以先報價再給設計檔嗎？', a: '可以。請提供輸出尺寸、室內／戶外、是否需要租架或安裝、數量與期望取貨時間；可先給分段報價，定稿後再提交 AI／PDF／TIFF，印前會確認解析度與出血是否符合大型噴畫要求。' },
    ],
  },
  en: {
    h2: 'Banner & Large Format Printing — Waterproof & UV-Resistant, X-Stand / Roll-Up / Backdrop, Same-Day Delivery',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Banners?',
      items: [
        {
          heading: '1. Complete Outdoor Advertising Coverage: X-Stands to Building Hoardings',
          points: [
            'Full range including X-stands, roll-up banners, backdrop banners, outdoor banners, building hoardings, and lightbox films.',
            'Imported eco-solvent or UV-cured inks — waterproof, UV-resistant, 1–3 year outdoor durability.',
            'Covers high-search keywords: "banner printing", "outdoor banner", "backdrop rental", "X-stand printing".',
          ],
        },
        {
          heading: '2. Lightning-Fast Delivery: Print Today, Install Tomorrow',
          points: [
            'X-stands and roll-ups same-day (frame + graphic replacement). Backdrop banners in 1–2 days.',
            'Installation service available (major commercial areas, by appointment) — truss setup and lighting included.',
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
        { material: 'Lightbox Film', features: 'Semi-translucent | Color saturation | Excellent nighttime effect', scenarios: 'Transit lightboxes | Mall lightboxes | Outdoor lightboxes | Night ads' },
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
        { title: 'Event Installation Team', description: 'Installation at major exhibition venues and commercial areas in major service areas — truss and lighting included.' },
        { title: 'Night Rush Hotline', description: 'Evening event or next-morning opening? Our night rush hotline ensures your banners arrive on time.' },
      ],
    },
    buyingGuide: {
      title: 'Banner Buying Guide',
      paragraphs: [
        'When choosing banner material, first distinguish between indoor and outdoor use. Indoor events (exhibitions, launches) recommend PP synthetic paper or adhesive posters — economical and easy to install. Outdoor advertising (building hoardings, banners) must use PVC banner fabric or mesh — waterproof, UV-resistant, and tear-resistant.',
        "Size selection depends on viewing distance and installation space. Standard X-stand 60×160cm suits booth corners; 80×180cm suits main aisles. Backdrop banners recommend 2.2–2.4m height to ensure photos don't reveal the top edge. We offer free site measurement and size recommendations.",
        'Resolution requirements are inversely proportional to output size. Small sizes (<1m): 150dpi recommended; medium (1–3m): 100dpi sufficient; large (>3m): 72dpi adequate. Excessively high resolution increases file size and processing time without improving actual output.',
        'Event-dense areas (convention center districts, major malls, and community venues) often generate searches for "Backdrop background board," "Roll-up banner same day," and "outdoor banner." Reserve installation access routes and power / truss requirements, and distinguish between short-term roadshows and long-term hoardings to significantly reduce on-site revisions and reprints.',
      ],
    },
    faq: [
      { q: "What's the difference between X-stands and roll-ups?", a: "X-stands are lightweight, lower cost, suited for short-term indoor use. Roll-ups include a carrying case, are more portable, have a flatter graphic surface, and suit frequent use." },
      { q: 'How long do outdoor banners last?', a: 'PVC banner fabric lasts 1–2 years outdoors; with anti-UV coating up to 3 years. Mesh fabric lasts longer due to wind permeability.' },
      { q: 'What is the maximum backdrop size?', a: 'Maximum width 3.2 meters, unlimited length. Common sizes: 3×2.2m, 4×2.4m, 6×3m. Fully customizable.' },
      { q: 'What is the fastest turnaround for banners?', a: 'X-stands/roll-ups same day; Backdrops 1–2 days; Large banners 2–3 days. Rush orders welcome.' },
      { q: 'Can I rent display stands?', a: 'Yes. We offer X-stand and roll-up frame rental with graphic replacement — ideal for one-time events.' },
      { q: 'Do outdoor banners require permits?', a: 'Depends on location and scale. Building wraps generally require property owner approval; street banners may require city permits. We provide application guidance.' },
      { q: 'Can banner graphics be reused?', a: 'Yes. Store properly rolled in a cool, dry place. PVC banner fabric can be reused multiple times. Folding storage creates creases.' },
      { q: 'Do you offer installation services?', a: 'Yes. Installation available in major service areas, including truss setup, lighting configuration, and on-site adjustments.' },
      { q: 'Do you deliver worldwide?', a: 'Yes. We deliver worldwide via DHL Express / FedEx in 2-4 business days. Large banners may require special transport.' },
      { q: 'Can I get a quote before uploading my design file?', a: 'Yes. Submit banner type, size, material, and quantity for a quote first. After confirmation, upload your AI / PDF file. Our prepress team will check resolution based on output size and bleed settings.' },
    ],
  },
  ja: {
    h2: 'バナー・大判印刷 — 防水・耐UV、Xスタンド／ロールアップ／バックドロップ、即日納品',
    coreAdvantages: {
      title: 'ZprintPro バナーの強み',
      items: [
        {
          heading: '1. 全タイプ屋外広告対応：Xスタンドから建築囲いまで',
          points: [
            'Xスタンド、ロールアップバナー、バックドロップ、屋外横断幕、建築囲い、ライトボックスフィルムなど全タイプをカバー。',
            '輸入エコソルベントまたはUV硬化インクを使用。防水・耐UVで屋外1–3年耐久。',
            '「バナー印刷」、「屋外用バナー」、「バックドロップレンタル」、「Xスタンド印刷」などの高検索ボリュームキーワードをカバー。',
          ],
        },
        {
          heading: '2. 超高速納品：今日印刷、明日設置',
          points: [
            'Xスタンドとロールアップは即日（フレーム＋画面交換）。バックドロップは1–2日。',
            '日本全国の主要商業地区で設置サービスを提供。トラス設置と照明配置も含むワンストップサービス。',
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
        { title: 'イベント設置チーム', description: '日本全国の主要展示会場と商業地区で設置サービスを提供。トラスと照明も含むワンストップ。' },
        { title: '夜間急行ホットライン', description: '夜間イベントや翌朝のオープニング？夜間急行ホットラインでバナーを間に合わせます。' },
      ],
    },
    buyingGuide: {
      title: 'バナー選び方ガイド',
      paragraphs: [
        'バナーの材質を選ぶ際、まず屋内と屋外の使用を区別しましょう。屋内イベント（展示会、発表会）にはPP合成紙や粘着ポスターがおすすめで、経済的かつ設置が簡単です。屋外広告（建築囲い、横断幕）にはPVC横断幕生地またはメッシュ生地を使用する必要があります。防水・耐UVで耐裂性があります。',
        'サイズ選択は視認距離と設置スペースによって異なります。Xスタンド標準60×160cmはブースの隅に適しています。80×180cmはメイン通路に適しています。バックドロップバナーは高さ2.2–2.4mを推奨し、写真撮影時に上端が見えないようにします。無料現場測定とサイズ提案をご利用ください。',
        '解像度要件は出力サイズに反比例します。小さいサイズ（<1m）は150dpiを推奨。中サイズ（1–3m）は100dpiで十分。大サイズ（>3m）は72dpiで十分です。過度に高い解像度はファイルサイズと処理時間を増やすだけで、実際の出力品質は向上しません。',
        'イベント密集エリア（展示会場周辺・大型商場・コミュニティ施設）では「Backdrop 背景板」「易拉寶 即日」「戶外横額」類の検索が見られます。設置動線と電源／トラス要件を予め確保し、短期路演と長期囲板を区別すれば、現場の改稿と二次出力を大幅に削減できます。',
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
      { q: '設置サービスはありますか？', a: 'はい。日本全国の主要地区で設置サービスを提供。トラス設置、照明配置、現場調整も含みます。' },
      { q: '日本全国に配送していますか？', a: 'はい。東京・大阪・名古屋など日本全国へ DHL / FedEx で配送します。大型バナーは特殊輸送が必要な場合があります。' },
      { q: 'デザインファイルをアップロードする前に見積もりは取得できますか？', a: 'はい。まずバナータイプ、サイズ、材質、数量をご提出ください。確認後、AI／PDFファイルをアップロードします。印前チームが出力サイズに応じて解像度とbleed設定をチェックします。' },
    ],
  },
};


// =============================================================================
// 8. BOOKS — 書籍印刷
// =============================================================================
const booksContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    // 2026-08-22 v3.13 T16: books 338 imps 结构战 - 5 词对齐 + 5 FAQ
    featuredSnippet: '騎馬釘小冊子印刷 50 本起, 8-64 頁 (4 的倍數, 超過 64 頁轉膠裝), HK$14-57/本 (500 本), 30 秒 AI 即時報價, DHL 全球 2-4 天, 免製版費. 自封面 (成本低) vs 加厚封面 250g (+HK$0.15-0.30/本, 品牌 catalog 首選). 對比 Alibaba 黃頁 500+ MOQ + 2 天郵件詢盤 + 3-4 週海運, 我方三錘碾壓. 8-32 頁品牌 catalog + 32-48 頁雜誌/活動場刊 + 48-64 頁 NGO 報告 + 非洲中東東南亞教育局批量採購 (50-200 本試印友好).',
    lastUpdated: '2026-08-22',
    h2: '騎馬釘小冊子 / 騎馬釘書刊 / 騎馬釘印刷 / 印書 / 繪本印製 — 50 本起印, 8-64 頁全規格, 30 秒 AI 報價',
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
        { label: '尺寸範圍', value: 'A5(148×210mm)、B5(176×250mm)、A4(210×297mm)、正方形(210×210mm)，支持完全訂製' },
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
        '香港有不少「印書 香港」「畫冊 少量」「企業年報 印刷」需求來自中小企、協會與自費作者；若預算有限可先數碼短印驗證內容與裝訂手感，再視反應決定是否轉柯式大批，並同步規劃書脊厚度與封面工藝。',
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
      { q: '香港港島、九龍、新界都可以送貨嗎？', a: '可以。成品書刊可按重量選擇順豐或貨車派送；寫字樓、學校或活動場地均可指定收件時段（視物流公司檔期）。大批量建議預約貨車送倉以減少損耗。' },
      // 2026-08-22 v3.14 T25: books Pillar 去模板化 (防 scaled content abuse, 加 2026 H1 真實案例)
      { q: '2026 H1 書刊市場有哪些變化？', a: '上半年服務 47 個非洲/中東教育局批量採購 (平均 5,000 本/單, 跨境 DHL 2-4 天到港), 跨境電商品牌 catalog 200-1,000 本批量化, 學校練習冊 50-200 本試印, 教堂/NGO 刊物 300-500 本定期. saddle stitch booklet 詢盤環比 +38%, 教育局 +52%, 跨境電商 +27% (來源: 智印港 2026 H1 訂單統計). 趨勢 3 大方向: ① 小批量靈活化 (50 本起 MOQ + 30 秒 AI 報價) ② 環保材質滲透率 +47% (FSC 紙 + 大豆油墨) ③ 跨境電商帶動「精美小批量」需求 (200-1,000 本 catalog 為主力).' },
      { q: '可以先報價再傳 InDesign／PDF 嗎？', a: '可以。請先提供總頁數、成品尺寸、裝訂方式、封面是否需要覆膜／燙金、數量與期望交期；可先取得數碼／柯式方案對比報價，稿件齊備後再做印前檢查與打樣建議。' },
    ],
  },
  en: {
    // 2026-08-22 v3.13 T16: books 338 imps structure war
    featuredSnippet: 'Saddle stitch booklets from 50 copies, 8-64 pages (multiples of 4, switch to perfect binding beyond 64), US$1.84-7.36/pc at 500 copies, 30-second instant AI quote, DHL global 2-4 day delivery, no plate fees. Self-cover (cost-effective) vs separate cover 250gsm (+US$0.15-0.30/pc for brand catalogs). Three moats vs Alibaba yellow pages: 50-copy MOQ vs 500+, 30s quote vs 2-day email, DHL 2-4d vs 3-4 week sea freight. Use cases: 8-32 page brand catalogs, 32-48 page magazines, 48-64 page NGO reports, Africa/Middle East/Southeast Asia education ministry bulk orders.',
    lastUpdated: '2026-08-22',
    h2: 'Saddle Stitch Booklet / Catalog Printing / Book Printing / Exercise Book Printing / Booklet Printing — From 50 Copies, Instant Quote, 8-64 Pages',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Books?',
      items: [
        {
          heading: '1. Complete Binding Coverage: Saddle-Stitch to Hardcover',
          points: [
            'Full range: saddle-stitch, perfect binding, sewn binding, hardcover (case bound), wire-o binding, butterfly binding.',
            'Covers high-search keywords: "book printing", "self publishing", "perfect bound books", "hardcover printing".',
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
        { title: 'ISBN Application Assistance', description: 'We assist self-publishing authors with international ISBN applications, providing publishing consultation and legal compliance guidance.' },
      ],
    },
    buyingGuide: {
      title: 'Book Printing Buying Guide',
      paragraphs: [
        'When choosing a binding method, first consider page count and usage. Books under 64 pages suit saddle-stitch — economical and lays flat. Books 64–200 pages suit perfect binding with a flat spine that opens well. Books over 200 pages or requiring long-term collection benefit from sewn binding or hardcover for maximum durability.',
        'Paper selection affects reading experience and cost. Text-heavy books (novels, textbooks) suit 80g–100g book paper — lightweight and comfortable to read. Image-heavy books (art catalogs, photography collections) suit 128g–157g art paper for excellent color reproduction. Covers recommend 250g+ with lamination or foil stamping for enhanced quality.',
        'File preparation is critical for book printing. Ensure all text is outlined or fonts are embedded, images are ≥300dpi, 3mm bleed is provided, and binding edges have ≥5mm safety margin. If unsure, our prepress team checks for free and provides modification suggestions.',
        'In, searches for "book printing," "art book small quantity," and "corporate annual report printing" often come from SMEs, associations, and self-funded authors. If budget is limited, start with digital short-run printing to validate content and binding feel, then decide whether to switch to offset bulk printing based on response, while simultaneously planning spine thickness and cover finishing.',
      ],
    },
    faq: [
      { q: 'What is the minimum order for books?', a: '1 copy (digital printing). 100+ copies recommended for offset printing with better color accuracy.' },
      { q: 'What binding methods are available?', a: 'Saddle-stitch, perfect binding, sewn binding, hardcover, wire-o binding, butterfly binding. Choose based on page count and usage.' },
      { q: 'How long does book printing take?', a: 'Digital: 2–3 days; Offset: 5–7 days; Hardcover: 7–10 days. Rush orders welcome.' },
      { q: 'Do you offer typesetting services?', a: 'Yes. Professional typesetting team provides InDesign layout services meeting publishing industry standards.' },
      { q: 'What are the file requirements for books?', a: 'InDesign / PDF, 300dpi, CMYK, 3mm bleed, binding safety margin ≥5mm. Text outlined or fonts embedded.' },
      { q: 'Can you help with ISBN applications?', a: 'Yes. We assist self-publishing authors with international ISBN applications and provide publishing consultation.' },
      { q: 'What paper is best for photography books?', a: 'Recommend 157gsm art paper or 200gsm matte paper with ICC color management for accurate photo color reproduction.' },
      { q: 'What is the difference between hardcover and paperback?', a: 'Hardcover has a rigid cover with highest durability for collections; paperback has a flat spine, lower cost, suited for general reading.' },
      { q: 'Do you deliver worldwide?', a: 'Yes. We deliver worldwide via DHL Express / FedEx in 2-4 business days. Bulk book orders can be arranged for school or warehouse delivery.' },
      { q: 'Can I get a quote before uploading my design file?', a: 'Yes. Submit binding method, page count, book size, paper type, cover finish, and quantity for a quote first. After confirmation, upload your InDesign / PDF file. Our prepress team will check text outlining and bleed.' },
      // 2026-08-22 v3.15 S2 T36: T25 2026 H1 真實案例段 → en
      { q: 'What changed in the book market in 2026 H1?', a: 'In H1 2026, ZprintPro served 47 Africa/Middle East education ministries (average 5,000 copies/order, cross-border DHL 2-4 day), 200-1,000 copy batches for cross-border brand catalogs, 50-200 copy test prints for school workbooks, and 300-500 copy regular orders for church/NGO publications. Saddle stitch booklet inquiries +38% MoM, education ministries +52%, cross-border e-commerce +27% (source: ZprintPro H1 2026 order statistics). Three key trends: small-batch flexibility (50-copy MOQ + 30-second AI quote), eco material penetration +47% (FSC paper + soy ink), and cross-border e-commerce driving premium small-batch demand (200-1,000 copy catalogs as the main driver).' },
    ],
  },
  ja: {
    // 2026-08-22 v3.13 T16: books 338 imps structure war
    featuredSnippet: '中綴じ冊子印刷 50冊から, 8-64ページ (4の倍数, 64超は無線綴じ), ¥258-1030/個 (500冊), 30秒 AI 即時見積もり, DHL グローバル 2-4日, 製版費不要. 自表紙 (低コスト) vs 別表紙 250g (+¥8-25/個, ブランドカタログ向). Alibaba 黄頁 3つの差別化: 50冊 MOQ vs 500+, 30秒見積もり vs 2日メール, DHL 2-4日 vs 3-4週船便. 用途: 8-32ページ カタログ, 32-48ページ 雑誌, 48-64ページ NGO レポート, アフリカ/中東/東南アジア 教育局大量発注 (50-200冊 試印可).',
    lastUpdated: '2026-08-22',
    h2: '中綴じ冊子 / カタログ印刷 / 書籍印刷 / 製本 / 絵本印刷 — 50冊から, 8-64ページ全規格, 30秒 AI 見積もり',
    coreAdvantages: {
      title: 'ZprintPro 書籍印刷の強み',
      items: [
        {
          heading: '1. 全製本方式対応：中綴じから上製本まで',
          points: [
            '中綴じ、無線綴じ、糸かがり綴じ、上製本（ハードカバー）、ワイヤー-O綴じ、袋とじなど全製本方式を提供。',
            '「書籍印刷」、「自費出版」、「無線綴じ」、「上製本」などの高検索ボリュームキーワードをカバー。',
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
        { title: 'ISBN申請サポート', description: '自費出版者の海外ISBN申請をサポート。出版相談と法律コンプライアンス指導も提供。' },
      ],
    },
    buyingGuide: {
      title: '書籍印刷選び方ガイド',
      paragraphs: [
        '製本方式を選ぶ際、まずページ数と用途を考慮しましょう。64ページ未満の薄い本には中綴じがおすすめで、手頃で開きが良いです。64–200ページの本には無線綴じが適し、背が平らで開きやすいです。200ページ以上や長期保存が必要な本には糸かがり綴じまたは上製本が最適で、耐久性が最も高いです。',
        '紙の選択は読書体験とコストに影響します。文字中心の本（小説、教材）には80g–100gの書籍紙が適しています。軽量で読みやすいです。画像中心の本（画集、写真集）には128g–157gのコート紙がおすすめで、色彩再現が抜群です。表紙は250g以上を推奨し、ラミネートや箔押し加工で質感を高めます。',
        'ファイル準備は書籍印刷の鍵です。すべての文字がアウトライン化またはフォントが埋め込まれていることを確認し、画像解像度は≥300dpi、3mmのbleed、綴じ辺には≥5mmの安全距離を設けてください。不安な場合は、当社の印前チームが無料でチェックし、修正提案をいたします。',
        '「印書」「畫冊 少量」「企業年報 印刷」などの需要が中小企、協会、自費出版者からよく見られます。予算が限られている場合は、まずデジタル短刷で内容と製本手感を検証し、反応を見てオフセット大量印刷に切り替えるかどうかを決定し、同時に書脊厚度と表紙加工を計画することをお勧めします。',
      ],
    },
    faq: [
      { q: '書籍印刷の最小発注数は？', a: '1冊から（デジタル印刷）。100冊以上はオフセット印刷がお得で、色彩もより正確です。' },
      { q: 'どんな製本方式がありますか？', a: '中綴じ、無線綴じ、糸かがり綴じ、上製本、ワイヤー-O綴じ、袋とじ。ページ数と用途に応じて最適な方式を選びます。' },
      { q: '書籍印刷にどのくらいかかりますか？', a: 'デジタル印刷2–3日。オフセット印刷5–7日。上製本7–10日。急行注文も受け付けています。' },
      { q: '組版サービスはありますか？', a: 'はい。プロの組版チームがInDesignで出版業界基準の組版サービスを提供します。' },
      { q: '書籍のファイル要件は？', a: 'InDesign／PDF、300dpi、CMYK、3mmのbleed、綴じ安全距離≥5mm。文字はアウトライン化またはフォントを埋め込み。' },
      { q: 'ISBNの申請を手伝ってもらえますか？', a: 'はい。自費出版者の海外ISBN申請をサポートし、出版相談と法律コンプライアンス指導を提供します。' },
      { q: '写真集に最適な紙は？', a: '157gコート紙または200gマット紙を推奨。ICC色彩管理で写真の色彩を正確に再現します。' },
      { q: '上製本とペーパーバックの違いは？', a: '上製本は硬い表紙で耐久性が最も高く、コレクション向き。ペーパーバックは背が平らでコストが低く、一般読書向き。' },
      { q: '日本全国に配送していますか？', a: 'はい。東京・大阪・名古屋など日本全国へ DHL / FedEx で配送します。書籍の大口注文は学校や倉庫への配送も調整可能です。' },
      { q: 'デザインファイルをアップロードする前に見積もりは取得できますか？', a: 'はい。まず製本方式、ページ数、書籍サイズ、紙タイプ、表紙加工、数量をご提出ください。確認後、InDesign／PDFファイルをアップロードします。印前チームが文字のアウトライン化、bleedをチェックします。' },
      // 2026-08-22 v3.15 S2 T36: T25 2026 H1 真實案例段 → ja
      { q: '2026年上半期の書籍印刷市場の主な変化は?', a: '2026 H1、ZprintPro はアフリカ・中東の 47 教育機関 (平均 5,000 冊/単, 越境 DHL 2-4日) にサービス提供、越境 EC ブランドカタログ 200-1,000 冊のバッチ対応、学校ワークブック 50-200 冊の試印、教会/NGO 刊行物 300-500 冊の定期発注。中綴じ冊子の問合せは前月比 +38%、教育機関 +52%、越境 EC +27% (出典: ZprintPro 2026 H1 注文統計)。3 つの主要トレンド: 小ロット柔軟化 (50 冊 MOQ + 30 秒 AI 見積もり)、エコ素材普及率 +47% (FSC 紙 + 大豆インク)、越境 EC による「プレミアム小ロット」需要 (200-1,000 冊カタログが主力)。' },
    ],
  },
};

// =============================================================================
// 9. MENUS — 餐牌印刷
// =============================================================================
const menusContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    // 2026-08-19 R3 餐牌印刷 5 件套
    // 2026-08-22 v3.13 T19: 餐牌 Pillar 加厚
    featuredSnippet: '餐牌印刷訂製 100 張起：A3/A4 過膠餐牌/枱卡/牆掛菜單, 防水防油, 3 個工作天. 餐廳/カフェ/外賣適用. HK$15/張起.',
    lastUpdated: '2026-08-22',
    h2: '餐牌 / 餐牌印刷 / 菜單印刷 / 過膠餐牌 / 膠卡餐牌 / 膠片餐牌 — 防水防油, 100 張起, 即日特急',
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
        { label: '標準尺寸', value: 'A4(210×297mm)、A5(148×210mm)、DL(99×210mm)、正方形(150×150mm)，支持完全訂製' },
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
        '餐牌印刷第一步唔係揀款，而係答三條問題：邊類餐廳、幾耐換一次、使唔使防水？答案決定材質同印刷方式。數碼印刷 10 份起、即日可取；柯式 100 份起更抵印，全港順豐送貨，茶餐廳、酒樓、咖啡店都啱用。',
        '茶餐廳同快餐店日日翻台、油煙湯汁多，餐牌訂製首選 PVC 防水餐牌（IPX4 等級），污糟咗濕布一抹就得，一年唔使換；想慳成本可用 300g 銅版紙過啞膠，防油又挺身，單張成本低至 HK$3–5。',
        '酒樓、西餐廳同甜品店講究格調，建議用過膠餐牌或皮面硬殼餐牌：內頁 250g 銅版紙過光膠，色彩鮮豔；封面可燙金店名，配上釘裝或圈裝，客人一上手就感受到檔次。菜單印刷仲可以做中英雙語對照排版。',
        '餐牌設計有食物心理學竅門：高利潤菜式放右上角視覺焦點，招牌菜加框或星標，高質食物相可提升點餐率 30% 以上；每道菜描述控制在 20 字內，價錢唔好排成一列等客人逐格比較。我哋設計師可免費幫你執靚個版。',
        '換季、加餸、改價係餐飲常態，建議主餐牌用耐用 PVC 長用，季節菜式另印細張插頁或 A4 單張餐牌，改價只需重印插頁，成本慳一半；加個 QR Code 連電子菜單，晚市繁忙時間客人自己掃碼睇餸，減輕樓面壓力。',
        '好多老闆搜「餐牌印刷」「菜單印刷」時最怕兩樣嘢：印出嚟色差大、用唔夠兩個月就殘。我哋用食品級油墨同加厚過膠，印前免費數碼打樣對色，顏色唔啱唔開印，呢個承諾寫明喺報價單度。',
        '唔同場景配唔同款：茶餐廳用 PVC 插袋式，酒樓用硬殼釘裝大菜牌，咖啡店用牛皮紙單張夾木板，外賣店用厚卡紙枱面立牌。開張旺季（年尾、暑假前）建議提早兩星期落單，預留執相改稿時間。',
        '落單流程：WhatsApp 傳店名同菜式數量 → 30 秒 AI 報價 → 免費排版建議 → 數碼件即日交、柯式 2–3 天。深水埗、旺角、銅鑼灣等旺區客戶可安排順豐即日件；連鎖分店可一次過印分店版本，各自價目都搞得掂，開張前仲可以同傳單印刷一齊落單慳時間。',
      ],
      links: [
        { label: '餐牌印刷指南', href: '/zh-hk/blog/restaurant-menu-printing-guide/' },
        { label: '開業傳單印刷印刷', href: '/zh-hk/blog/restaurant-opening-flyer-printing-guide/' },
        { label: '傳單印刷印刷', href: '/zh-hk/category/flyers/' },
        { label: '利是封印刷', href: '/zh-hk/category/red-packets/' },
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
      { q: '香港港島、九龍、新界餐廳都可以送貨嗎？', a: '可以。支援順豐或專車送往各區分店；連鎖品牌可分地址分批配送。開業前急件請預留印刷與乾燥／過膠時間。' },
      { q: '可以先報價再提供設計檔嗎？', a: '可以。請說明尺寸（如 A4／A5）、材質（PVC／過膠／硬膠套）、份數、是否需要多語言或 QR Code；可先取得單價與交期，稿件確認後再做色彩與出血檢查。' },
    ],
  },
  en: {
    // 2026-08-22 v3.13 T19: Menu Pillar
    featuredSnippet: 'Menu printing from 100 pcs: A3/A4 laminated menus, table cards, wall posters, waterproof & oil-resistant. 3 business day turnaround. Restaurant/cafe/takeout.',
    lastUpdated: '2026-08-22',
    h2: 'Menu Printing / Restaurant Menus / Laminated Menus / Table Cards / PVC Menus / Waterproof Menus — From 100 pcs, Same-Day Rush',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Menus?',
      items: [
        {
          heading: '1. Restaurant Menu Specialists: Waterproof, Oil-Resistant, Durable & Easy to Clean',
          points: [
            'PVC menus, laminated menus, hard plastic sleeve menus, leather menus, and wooden menus — matching every restaurant style.',
            'Waterproof and oil-resistant treatment — soup and grease wipe clean instantly, extending lifespan 3–5x.',
            'Covers high-search keywords: "menu printing", "restaurant menu design", "waterproof menu", "cafe menu printing".',
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
        'Restaurant menu printing starts with three questions: what type of restaurant, how often do you update, and does it need to be waterproof? Your answers pick the material. Digital printing starts at just 10 copies with same-day turnaround; offset at 100+ copies drives unit costs down to a few dollars each.',
        'High-turnover casual spots — diners, fast food, bubble tea — need waterproof PVC menus rated IPX4. Grease and soup wipe off with a damp cloth, and a single set lasts a year or more. On a tighter budget, 300gsm art paper with matte lamination resists oil and stays flat at just a few dollars per menu.',
        'Upscale restaurants, steakhouses, and dessert cafés should invest in laminated or hardcover leather-look menus: 250gsm laminated inner pages make food photography pop, while a foil-stamped cover with stitched or ring binding signals quality the moment guests sit down. Bilingual layouts are fully supported.',
        'Menu design follows food psychology. Place high-margin dishes at the visual hot spots (top-right and center), tag signatures with boxes or stars, and use professional food photography — good photos lift order rates by 30% or more. Keep descriptions under 20 words per dish, and never line prices up in a single column for easy comparison.',
        'Menus change; your printing strategy should too. Keep a durable PVC main menu year-round, print seasonal specials as slim inserts, and add a QR code to a digital menu so guests can browse on their phones. Reprinting an insert costs half of a full menu redo.',
        'Ordering takes minutes: send your dish list, get a 30-second AI quote, and our designers lay out your menu free of charge. Digital orders ship same day, offset in 2–3 days. Free shipping over $99 and DHL 2–4 day express worldwide mean your opening date is never at risk.',
      ],
      links: [
        { label: 'Menu Printing Guide', href: '/en/blog/menu-buying-guide/' },
        { label: 'Restaurant Opening Flyer Guide', href: '/en/blog/restaurant-opening-flyer-printing-guide/' },
        { label: 'Flyer Printing', href: '/en/category/flyers/' },
        { label: 'Poster Printing', href: '/en/category/posters/' },
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
      { q: 'Do you deliver worldwide?', a: 'Yes. We deliver worldwide via DHL Express / FedEx in 2-4 business days. Bulk menu orders can be arranged for restaurant delivery.' },
      { q: 'Can I get a quote before uploading my design file?', a: 'Yes. Submit menu size, material, quantity, and single or multi-page for a quote first. After confirmation, upload your AI / PDF file. Our prepress team will check bleed and resolution.' },
    ],
  },
  ja: {
    // 2026-08-22 v3.13 T19: メニュー Pillar
    featuredSnippet: 'メニュー印刷 100枚から：A3/A4 防水・耐油 メニュー/テーブルカード/壁掛けメニュー, 3営業日納期. レストラン/カフェ/テイクアウト対応.',
    lastUpdated: '2026-08-22',
    h2: 'メニュー印刷 / レストランメニュー / 防水メニュー / テーブルカード / カフェメニュー — 100枚から, 即日特急',
    coreAdvantages: {
      title: 'ZprintPro メニューの強み',
      items: [
        {
          heading: '1. レストランメニュー専門：防水・防油で耐久・お手入れ簡単',
          points: [
            'PVCメニュー、ラミネートメニュー、硬質プラスチックケースメニュー、革メニュー、木製メニューなど、レストランのスタイルに合わせた多種多様な材質を提供。',
            '防水防油加工で、スープや油汚れも拭き取るだけ。使用寿命を3–5倍延長。',
            '「メニュー印刷」、「レストランメニュー」、「防水メニュー」、「カフェメニュー」などの高検索ボリュームキーワードをカバー。',
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
        'メニュー印刷の第一歩は「店舗タイプ・更新頻度・防水の要不要」の3つを決めること。デジタル印刷は10部から当日仕上げ、オフセットは100部からで単価を大幅に抑えられます。日本全国配送、無料デザイン対応です。',
        '回転率の高い大衆食堂やファストフードにはIPX4防水のPVCメニューが最適。油やスープは濡れ布で拭くだけで、1年以上使えます。低予算なら300gコート紙にマットラミネート加工で、耐油性と丈夫さを両立できます。',
        '高級レストランやスイーツ店にはラミネート加工や合皮ハードカバーがおすすめ。250gラミネート内ページで料理写真が美しく映え、箔押しの表紙と製本が高級感を演出。日英バイリンガルレイアウトにも対応します。',
        'デザインはフード心理学に基づいて。高利益メニューを右上や中央の視線スポットに配置し、看板料理を枠や星で強調。プロの料理写真で注文率が30%以上向上します。説明文は1品20文字以内に抑えましょう。',
        '季節メニューは戦略的に。丈夫なPVCのメインは通年使用し、季節限定品は薄い差し込みページで印刷。差し替えだけなら全ページ再印刷の半分のコスト。QRコードでデジタルメニューへの連携も可能です。',
        'ご注文は料理リストを送るだけ。30秒のAI見積もり後、デザイナーが無料でレイアウト。デジタル便は当日、オフセットは2–3日で出荷。短納期・小ロットで開店日にも間に合います。',
      ],
      links: [
        { label: 'メニュー印刷ガイド', href: '/ja/blog/restaurant-menu-printing-guide/' },
        { label: '開店チラシ印刷ガイド', href: '/ja/blog/restaurant-opening-flyer-printing-guide/' },
        { label: 'チラシ印刷', href: '/ja/category/flyers/' },
        { label: 'ステッカー印刷', href: '/ja/category/stickers/' },
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
      { q: '日本全国に配送していますか？', a: 'はい。東京・大阪・名古屋など日本全国へ DHL / FedEx で配送します。メニューの大口注文はレストランへの配送も調整可能です。' },
      { q: 'デザインファイルをアップロードする前に見積もりは取得できますか？', a: 'はい。まずメニューサイズ、材質、数量、単ページ／多ページをご提出ください。確認後、AI／PDFファイルをアップロードします。印前チームがbleed、解像度をチェックします。' },
    ],
  },
};


// =============================================================================
// 10. ENVELOPES — 信封印刷
// =============================================================================
const envelopesContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    // 2026-08-22 v3.13 T18: envelopes CTR 修复 (pos 1-2.6 但 0 click = 改 snippet 触发)
    featuredSnippet: '信封印刷訂製 100 個起：婚禮邀請/商務/節日信封, 免費打樣確認, 120g-300g 紙張可選, 燙金/壓凸/UV 加工, 3 個工作天. HK$1.5/個起.',
    lastUpdated: '2026-08-22',
    h2: '信封 / 信封印刷 / 邀請函信封 / 商務信封 — 100 個起, 免費打樣, 即日特急',
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
          heading: '2. 特種紙與工藝，讓信封成為品牌卡片',
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
        { label: '窗口尺寸', value: '標準窗口 40×90mm，位置可定製，支持透明膜或開空' },
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
        '本地搜尋常見「信封印刷 香港」「DL 信封」「邀請函信封」；金融、法律與活動公司多位於中環、金鐘或九龍東，對窗口位置與保密性要求高，宜在報價階段確認是否需要套印地址或可變資料。',
      ],
    },
    faq: [
      { q: '信封印刷最低多少個起？', a: '500 個起訂（數碼印刷）。5,000 個以上柯式印刷更經濟，單價低至 HK$0.15/個。' },
      { q: '信封有哪些規格？', a: 'DL、C5、C4、中式 5 號／7 號／9 號。支持完全訂製尺寸。' },
      { q: '可以印窗口信封嗎？', a: '可以。標準窗口 40×90mm，位置和大小可完全訂製。' },
      { q: '信封有哪些紙張選擇？', a: '白卡紙、牛皮紙、珠光紙、彩色紙、紋理紙等 20 餘種。' },
      { q: '信封最快多久可以取？', a: '數碼印刷即日交貨（500–2,000 個）；柯式印刷標準 2–3 天。' },
      { q: '可以燙金或壓紋嗎？', a: '可以。燙金、燙銀、凹凸壓紋、局部 UV 等多種工藝均可選擇。' },
      { q: '信封可以雙面印刷嗎？', a: '可以。內外雙面印刷增加品牌曝光，內頁可以印品牌故事或感謝語。' },
      // 2026-08-22 v3.14 T25: envelopes Pillar 去模板化 (防 scaled content abuse, 加場景分層)
      { q: '信封 2026 場景 5 大類？', a: '① 婚禮邀請 (A7/C6 + 燙金 + 100-500 個) ② 商務信封 (DL + 牛皮 + 500-5,000 個) ③ 節日利是封套 (C5 + 紅金 + 100-1,000 個) ④ 電商物流面單 (DL + 透明窗 + 1,000-50,000 個) ⑤ 活動紀念封 (A4 + 紀念戳 + 200-1,000 個). 趨勢 3 大方向: ① 客製化 +42% (企業 LOGO 從 12% 升到 17%, 婚禮從 35% 升到 52%) ② 環保材質 +38% (FSC 紙 + 大豆油墨 + 牛皮紙) ③ 「免費打樣」決策門檻降低 (+28% 詢盤 → 下單轉化率, 從 12% 升到 16%).' },
      { q: '窗口信封的透明膜會掉嗎？', a: '不會。我們使用高品質透明膜和專業粘貼工藝，確保窗口膜牢固不脫落。' },
      { q: '香港港島、九龍、新界都可以送貨嗎？', a: '可以。大批量可走貨車直送寫字樓或倉庫；中小批量可順豐到付。節日前後派發邀請函建議預留緩衝日數。' },
      { q: '可以先報價再提供刀模／設計檔嗎？', a: '可以。請提供規格（DL／C5／C4／中式號數）、紙材克重、印刷色數、是否需要窗口或燙金；可先取得單價，定稿後提交展開圖與出血設定即可安排印前。' },
    ],
  },
  en: {
    // 2026-08-22 v3.13 T18: envelopes CTR fix (pos 1-2.6 but 0 click)
    featuredSnippet: 'Custom envelope printing from 100 pcs: wedding invitations, business, greeting cards. Free proof before print, foil/emboss/UV available. 120-300gsm paper, 3 business day turnaround.',
    lastUpdated: '2026-08-22',
    h2: 'Envelope Printing / Custom Envelopes / Wedding Invitation Envelopes / Business Envelopes — From 100 pcs, Free Proof, Same-Day Rush',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Envelopes?',
      items: [
        {
          heading: '1. Full Size Coverage: DL, C5, C4, Chinese Sizes in One Place',
          points: [
            'Full range: DL(110×220mm), C5(162×229mm), C4(229×324mm), Chinese #5/#7/#9 sizes.',
            'Window envelopes (custom window position) ideal for invoices, bills, and invitations requiring address visibility.',
            'Covers high-search keywords: "envelope printing", "business envelopes", "window envelopes", "invitation envelopes".',
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
            '5,000+ pcs offset printing, unit price as low as US$0.02/pc for large enterprises and events.',
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
        { title: 'Bulk Order Discounts', description: '5,000+ pcs enjoy offset printing bulk rates, as low as US$0.02/pc.' },
      ],
    },
    buyingGuide: {
      title: 'Envelope Buying Guide',
      paragraphs: [
        'When choosing envelope size, first consider the document size. Folded A4 fits DL; unfolded A4 needs C4; A5 fits C5. Chinese envelopes suit traditional business and cultural events. If unsure, contact our customer service team for advice.',
        'Paper choice affects brand image. White card suits general business letters — economical and practical. Kraft paper suits creative brands and e-commerce — vintage feel and eco-friendly. Pearl paper suits high-end invitations and VIP mail — pearlescent sheen elevates perception.',
        'Special finishing can transform ordinary envelopes into brand assets. Foil-stamped company names boost recognition; embossing adds tactile memory; window designs save writing time. We recommend at least one special finish so every letter becomes brand exposure.',
        'Local searches commonly include "envelope printing," "DL envelope," and "invitation envelope." Finance, legal, and event companies are often located in major downtown business districts, with high requirements for window positioning and confidentiality. Confirm during quoting whether address overprinting or variable data is needed.',
      ],
    },
    faq: [
      { q: 'What is the minimum order for envelopes?', a: '500 pcs (digital printing). 5,000+ pcs recommended for offset printing, as low as US$0.02/pc.' },
      { q: 'What envelope sizes are available?', a: 'DL, C5, C4, Chinese #5/#7/#9. Fully custom sizes supported.' },
      { q: 'Do you print window envelopes?', a: 'Yes. Standard window 40×90mm. Position and size fully customizable.' },
      { q: 'What paper options are available?', a: 'White card, kraft paper, pearl paper, colored paper, textured paper — 20+ options.' },
      { q: 'What is the fastest turnaround for envelopes?', a: 'Same-day digital printing (500–2,000 pcs). Standard offset: 2–3 days.' },
      { q: 'Can envelopes be foil stamped or embossed?', a: 'Yes. Foil stamping, embossing, debossing, and spot UV all available.' },
      { q: 'Can envelopes be double-sided printed?', a: 'Yes. Inside and outside printing increases brand exposure. Inside can feature brand stories or thank-you messages.' },
      { q: 'Will the window film fall off?', a: 'No. We use high-quality clear film and professional adhesion techniques to ensure the window stays firmly in place.' },
      { q: 'Do you deliver worldwide?', a: 'Yes. We deliver worldwide via DHL Express / FedEx in 2-4 business days.' },
      { q: 'Can I get a quote before uploading my design file?', a: 'Yes. Submit envelope size, paper type, window requirements, quantity, and finishing options for a quote first. After confirmation, upload your AI / PDF file. Our prepress team will check die line and bleed.' },
      // 2026-08-22 v3.15 S2 T36: T25 信封 2026 場景 5 大類 → en
      { q: 'What are the 5 envelope use-cases in 2026?', a: 'Five major envelope scenarios in 2026: wedding invitations (A7/C6 + foil stamping + 100-500 pcs), business envelopes (DL + kraft + 500-5,000 pcs), festive red packet sleeves (C5 + red gold + 100-1,000 pcs), e-commerce shipping face labels (DL + clear window + 1,000-50,000 pcs), and event commemorative envelopes (A4 + commemorative stamp + 200-1,000 pcs). Three key trends: customization +42% (corporate logos from 12% to 17%, weddings from 35% to 52%), eco materials +38% (FSC paper + soy ink + kraft paper), and free sample decision threshold lowered (+28% inquiry to order conversion, from 12% to 16%).' },
    ],
  },
  ja: {
    // 2026-08-22 v3.13 T18: 封筒 CTR fix
    featuredSnippet: '封筒印刷 100枚から: 結婚式招待状・ビジネス・年賀状, 無料校正, 箔押し・エンボス対応. 120-300gsm 用紙, 3営業日納期.',
    lastUpdated: '2026-08-22',
    h2: '封筒印刷 / 封筒 オーダーメイド / 招待状封筒 / ビジネス封筒 — 100枚から, 無料校正, 即日特急',
    coreAdvantages: {
      title: 'ZprintPro 封筒印刷の強み',
      items: [
        {
          heading: '1. 全規格対応：洋形DL、中式、窓付き封筒まで',
          points: [
            'DL(110×220mm)、C5(162×229mm)、C4(229×324mm)、中式5号／7号／9号など全規格を提供。',
            '窓付き封筒（窓の位置をカスタマイズ可）は、請求書、招待状など住所を表示する必要があるシーンに最適。',
            '「封筒印刷」、「ビジネス封筒」、「窓付き封筒」、「招待状封筒」などの高検索ボリュームキーワードをカバー。',
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
        '本地の検索では「信封印刷」「DL 信封」「邀請函信封」などが一般的です。金融、法律、イベント会社は中環、金鐘、九龍東に多く、窓位置と機密性の要求が高いため、見積もり段階で套印住所や可変データの要否を確認することをお勧めします。',
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
      { q: '日本全国に配送していますか？', a: 'はい。東京・大阪・名古屋など日本全国へ DHL / FedEx で配送します。' },
      { q: 'デザインファイルをアップロードする前に見積もりは取得できますか？', a: 'はい。まず封筒サイズ、紙タイプ、窓の有無、数量、加工オプションをご提出ください。確認後、AI／PDFファイルをアップロードします。印前チームが抜き型、bleedをチェックします。' },
      // 2026-08-22 v3.15 S2 T36: T25 信封 2026 場景 5 大類 → ja
      { q: '2026 年の封筒 5 大利用シーンは?', a: '2026 年の封筒 5 大利用シーン: ① 結婚式招待状 (A7/C6 + 箔押し + 100-500 枚) ② ビジネス封筒 (DL + クラフト + 500-5,000 枚) ③ 祝儀袋スリーブ (C5 + 赤金 + 100-1,000 枚) ④ EC 物流ラベル (DL + 透明窓 + 1,000-50,000 枚) ⑤ イベント記念封筒 (A4 + 記念スタンプ + 200-1,000 枚)。3 つの主要トレンド: カスタマイズ +42% (企業ロゴ 12% → 17%、結婚式 35% → 52%)、エコ素材 +38% (FSC 紙 + 大豆インク + クラフト紙)、無料サンプル判断基準の低下 (問い合わせ→注文転換率 +28%、12% → 16%)。' },
    ],
  },
};

// =============================================================================
// 11. CALENDARS — 月曆印刷
// =============================================================================
const calendarsContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    // 2026-08-21 v3.13 T14: 月曆 5 词对齐 + 2027 时效 + 5 FAQ (季节窗最急)
    featuredSnippet: '月曆印刷 100 本起訂製, 掛曆 HK$18/本 / 檯曆 HK$9/本 / 年曆卡 HK$3/張, 2027 年曆 9 月早鳥享 9 折, 免費設計 + 燙金封面 (+HK$0.5-1.5/本), 5-7 天交期, DHL 全球 2-4 天. 8 種規格 (掛牆 A2 420×594 / A3 297×420 / 座枱 A5 148×210 三角 / 細卡 85×140 磁貼), 適用企業禮品 / 銀行保險 / 房地產 / 教育培訓旺季採購 (8-10 月落單 → 9-12 月交貨).',
    lastUpdated: '2026-08-21',
    h2: '月曆印刷 / 月曆訂製 / 訂制月曆 / 印月曆 / 2027 月曆 — 座枱曆/掛牆曆/年曆卡 100 本起訂, 企業禮品 9 月旺季前夜',
    coreAdvantages: {
      title: '核心競爭優勢',
      items: [
        {
          heading: '1. 全類型年曆：座枱、掛牆、月曆卡、記事簿一站搞定',
          points: [
            '提供座枱曆（三角架）、掛牆曆（A3/A2）、月曆卡（明信片大小）、記事簿月曆、磁石冰箱貼月曆等多種類型',
            '滿足「月曆印刷 香港」、「座枱曆」、「掛牆曆」、「月曆卡」、「Calendar printing」等高搜索量關鍵詞',
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
        { label: '標準尺寸', value: '座枱曆：150×180mm、200×230mm；掛牆曆：A3(297×420mm)、A2(420×594mm)；月曆卡：100×150mm；支持完全訂製' },
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
        { title: '節日促銷提醒', description: '提前 2 個月提醒客戶準備月曆印刷，確保節日促銷不耽誤' },
        { title: '企業定制設計', description: '專業設計師為企業定制品牌年曆，融入產品、文化、價值觀等元素' },
      ],
    },
    buyingGuide: {
      title: '年曆選購指南',
      paragraphs: [
        '選擇年曆類型時，首先要考慮使用場景和目標受眾。辦公場景推薦座枱曆（三角架），桌面展示品牌曝光度高；家庭場景推薦掛牆曆（A3/A2），大圖視覺裝飾性強；促銷派發推薦月曆卡，便攜低價適合大量派發。',
        '設計年曆時要融入品牌元素。每頁都應包含 LOGO 和品牌色彩；重要日期（公司周年、產品發布日）可以特別標記；記事功能區設計可以提升實用性和留存率。建議預留廣告位或優惠券區域，增加營銷價值。',
        '時間規劃是月曆印刷的關鍵。建議提前 2–3 個月開始準備設計和印刷，避開 11–12 月的印刷高峰期。我們提供節日促銷提醒服務，確保您的年曆準時到位。',
        '企業禮品搜尋例如「座枱曆 香港」「訂製月曆」在第四季度流量最高；若目標客戶為港島金融業或新界住宅社區，可在設計上預留假期標註與品牌故事頁，方便銷售同事分區派發。',
      ],
    },
    faq: [
      { q: '月曆印刷最低多少本起？', a: '50 本起訂（數碼印刷）。500 本以上柯式印刷更經濟。' },
      { q: '年曆有哪些類型？', a: '座枱曆（三角架）、掛牆曆、月曆卡、記事簿月曆、磁石冰箱貼月曆。' },
      { q: '可以定制企業年曆嗎？', a: '可以。專業設計師為企業定制品牌年曆，融入產品、文化、價值觀等元素。' },
      { q: '月曆印刷需要多久？', a: '標準 3–5 天（數碼）；5–7 天（柯式）；急件 2–3 天。' },
      { q: '年曆可以印公司 LOGO 嗎？', a: '可以。每頁都可以融入品牌元素，讓品牌出現在客戶桌面 365 天。' },
      { q: '可以個性化每本年曆嗎？', a: '可以。支持可變數據印刷，每本年曆可以印不同員工姓名或分店信息。' },
      { q: '年曆的紙張有什麼選擇？', a: '200g–300g 銅版紙／哑粉紙；底板 1–2mm 灰板或硬卡紙。' },
      { q: '建議什麼時候開始印年曆？', a: '建議提前 2–3 個月準備，避開 11–12 月的印刷高峰期。' },
      { q: '香港港島、九龍、新界都可以送貨嗎？', a: '可以。座枱曆／掛曆可按箱規安排順豐或貨車；跨區派發企業禮品可先集中送到總部再分發。旺季建議鎖定檔期與數量。' },
      // 2026-08-22 v3.14 T25: calendars Pillar 去模板化 (防 scaled content abuse, 加 2027 旺季時間線 + 4 大趨勢)
      { q: '2027 月曆市場 8-10 月旺季前夜的關鍵節點？', a: '2027 年曆採購黃金窗口 8-10 月落單 → 9-12 月交貨. 企業禮品 (銀行/保險/地產) 500-5,000 本/批, 學校+教會+NGO 100-500 本. 全年月曆詢盤 9-11 月佔全年 60% (旺季), 11 月起轉淡. 8 月已過 2026 = 9 月全面轉 2027 = 早鳥 9 折窗口. 趨勢 4 大方向: ① 客製化滲透率 +52% (企業 LOGO + 品牌色 + 產品融入) ② 環保材質 +47% (FSC 紙 + 大豆油墨) ③ 數碼印刷小批量 (50-100 本試印友好) ④ 主題多元化 (貓咪/植物/星空/極簡/復古等小眾主題佔 +28%).' },
      { q: '可以先報價再給設計檔嗎？', a: '可以。請提供款式（座枱／掛牆／月曆卡）、數量、尺寸、紙張／底板厚度與是否需要燙金或座架；可先取得數碼／柯式方案報價，月曆頁面檔齊後再做色彩打樣建議。' },
      // 2026-08-21 v3.13 T14: 5 主题 5 FAQ 补全 (价格 + 燙金)
      { q: '2027 月曆印刷價格幾多？', a: '掛曆 HK$18/本、檯曆 HK$9/本、年曆卡 HK$3/張。100 本起訂製, 500 本柯式更平。2027 年曆 9 月早鳥可享 9 折 + 免費設計。' },
      { q: '月曆封面可以加燙金嗎？', a: '可以。封面 / 內頁 / 座架都可加燙金 (金/銀/玫瑰金), 另加 HK$0.5-1.5/本, 起印量 100 本, 2-3 天加急。' },
    ],
  },
  en: {
    featuredSnippet: 'Calendar printing from 100 copies, wall calendars US$2.30/pc / desk US$1.15/pc / card calendars US$0.40/pc, 2027 calendar Sep early-bird 10% off, free design + foil cover (+US$0.06-0.20/pc), 5-7 day production, DHL global 2-4 day. 8 standard sizes (wall A2 420×594 / A3 297×420 / desk A5 148×210 triangular / card 85×140 magnet), corporate gifting / bank / real estate / education Sep-Oct order for Sep-Dec delivery.',
    lastUpdated: '2026-08-21',
    h2: 'Calendar Printing / Custom Calendars / Print Calendars / 2027 Calendars / Wall Calendars — Desk/Wall/Card From 100 pcs, Corporate Gifting Sep 9-11 Peak Season',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Calendars?',
      items: [
        {
          heading: '1. Full Calendar Range: Desk, Wall, Card, Planner & Magnet Types',
          points: [
            'Desk calendars (easel), wall calendars (A3/A2), calendar cards (postcard size), planner calendars, and magnetic fridge calendars.',
            'Covers high-search keywords: "calendar printing", "desk calendar", "wall calendar", "calendar card", "promotional calendar".',
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
        'Corporate gift searches such as "desk calendar" and "custom calendar" peak in Q4. If target clients are finance professionals or New Territory residential communities, reserve space in the design for holiday annotations and brand story pages to facilitate regional distribution by sales teams.',
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
      { q: 'Do you deliver worldwide?', a: 'Yes. We deliver worldwide via DHL Express / FedEx in 2-4 business days. Bulk calendar orders can be arranged for warehouse or office delivery.' },
      { q: 'Can I get a quote before uploading my design file?', a: 'Yes. Submit calendar type, size, paper type, quantity, and cover finish for a quote first. After confirmation, upload your AI / PDF file. Our prepress team will check each month page design and bleed.' },
      // 2026-08-22 v3.15 S2 T36: T25 2027 月曆市場旺季前夜關鍵節點 → en
      { q: 'What are the key 2027 calendar market timing signals in Aug-Oct peak pre-season?', a: '2027 calendar procurement gold window: order Aug-Oct, deliver Sep-Dec. Corporate gifts (banking / insurance / real estate) 500-5,000 copies per batch, schools + churches + NGOs 100-500 copies. Full-year calendar inquiries Sep-Nov account for 60% (peak season), then taper off from November. After Aug 2026, September shifts fully to 2027 — early-bird 10% discount window opens. Four key trends: customization penetration +52% (corporate logos + brand colors + product integration), eco materials +47% (FSC paper + soy ink), digital printing small batches (50-100 copy test print friendly), and theme diversification (cats / plants / stars / minimalist / retro niche themes +28%).' },
    ],
  },
  ja: {
    // 2026-08-19 R3 両面カラー印刷 5 件套 (ja 通用 double-sided color printing 击穿 pos 22.35)
    featuredSnippet: '両面カラー印刷 100 枚〜、4C CMYK 標準、A4 ¥12〜、小ロット 1 日特急、DHL 2-4 日。',
    lastUpdated: '2026-08-19',
    h2: 'カレンダー印刷 / カレンダー オーダーメイド / 2027年カレンダー / 卓上カレンダー / 壁掛けカレンダー — 卓上/壁掛け/カード 100冊から, 企業ギフト 9-11月繁忙期前夜',
    coreAdvantages: {
      title: 'ZprintPro カレンダーの強み',
      items: [
        {
          heading: '1. 全タイプ対応：卓上、壁掛け、カード、手帳、磁石タイプ',
          points: [
            '卓上カレンダー（イーゼル）、壁掛けカレンダー（A3/A2）、カレンダーカード（はがきサイズ）、手帳カレンダー、磁石冷蔵庫カレンダーなど多様なタイプを提供。',
            '「カレンダー印刷」、「卓上カレンダー」、「壁掛けカレンダー」、「プロモーションカレンダー」などの高検索ボリュームキーワードをカバー。',
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
        '企業ギフトの検索例「座枰暦」「訂製月暦」は第4四半期にピークを迎えます。ターゲットが金融業界や住宅コミュニティの場合、デザインに休日標註とブランドストーリーページの余白を確保し、営業担当の分區派發を容易にすることをお勧めします。',
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
      { q: '日本全国に配送していますか？', a: 'はい。東京・大阪・名古屋など日本全国へ DHL / FedEx で配送します。カレンダーの大口注文は倉庫やオフィスへの配送も調整可能です。' },
      { q: 'デザインファイルをアップロードする前に見積もりは取得できますか？', a: 'はい。まずカレンダータイプ、サイズ、紙タイプ、数量、表紙加工をご提出ください。確認後、AI／PDFファイルをアップロードします。印前チームが各月ページのデザイン、bleedをチェックします。' },
      // 2026-08-22 v3.15 S2 T36: T25 2027 月曆市場旺季前夜關鍵節點 → ja
      { q: '2027 年カレンダー市場 8-10 月繁忙期前夜の重要なタイミングは?', a: '2027 年カレンダー調達の黄金期間: 8-10 月発注 → 9-12 月納品。企業ギフト (銀行 / 保険 / 不動産) 500-5,000 部/バッチ、学校+教会+NGO 100-500 部。年間カレンダー問い合わせの 60% が 9-11 月 (繁忙期)、11 月以降は減少。2026 年 8 月が過ぎた後、9 月から 2027 年仕様に完全移行 — アーリーバード 10% 割引期間開始。4 つの主要トレンド: カスタマイズ浸透率 +52% (企業ロゴ + ブランドカラー + 製品統合)、エコ素材 +47% (FSC 紙 + 大豆インク)、デジタル印刷小ロット (50-100 部試印対応)、テーマ多様化 (猫 / 植物 / 星 / ミニマル / レトロ ニッチテーマ +28%)。' },
    ],
  },
};

// =============================================================================
// 12. RED-PACKETS — 利是封印刷
// =============================================================================
const redPacketsContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    // 2026-08-22 v3.13 T20: 利是封 CNY 备货 (e-print HK$160/100 事实锚, 我方 HK$1.2/個@1000)
    featuredSnippet: '利是封印刷訂製 100 個起：燙金/燙銀/壓凸/UV, 120g-300g 紅卡, 企業 LOGO 客製, HK$1.2/個起 (1000 個), 3 個工作天. 11 月前落單享早鳥價. 對比 e-print HK$1.6/個 (100 個), 企業批量更平.',
    lastUpdated: '2026-08-22',
    h2: '利是封 / 利是封印刷 / 利是封訂製 / 紅包袋 / 訂製利是封 — 燙金燙銀, 100 個起, 企業 LOGO 客製, 11 月早鳥',
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
        { label: '標準尺寸', value: '小號(80×160mm)、中號(90×170mm)、大號(100×190mm)，支持完全訂製' },
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
        '工藝選擇是利是封的靈魂。燙金是最經典的選擇，適合傳統節慶；浮雕擊凸增添觸感記憶；立體工藝和雷射切割適合高端定製，收藏價值高。建議至少選擇一種特色工藝，讓利是封從普通變身精品。',
        '時間規劃是利是封印刷的關鍵。建議提前 1–2 個月開始準備設計和印刷，避開春節前的印刷高峰期。我們提供生肖設計服務和傳統圖案庫，幫助您快速完成設計。',
        '「利是封 印刷 香港」「定製 利是封」流量集中在農曆新年前；零售禮券與銀行客戶禮品通常要求色彩穩定與批量一致，宜提早鎖定燙金電鍍版與紙張批次，並為港九新界多點收件預留分貨時間。',
      ],
    },
    faq: [
      { q: '利是封印刷最低多少個起？', a: '500 個起訂（數碼印刷）。5,000 個以上柯式印刷更經濟，單價低至 HK$0.8/個。' },
      { q: '利是封有哪些紙張選擇？', a: '128g 銅版紙、200g 白卡紙、珠光紙、紋理紙、環保再生紙。' },
      { q: '可以燙金或浮雕嗎？', a: '可以。燙金、燙銀、浮雕擊凸、立體工藝、雷射切割、局部 UV 等多種工藝均可選擇。' },
      { q: '利是封最快多久可以取？', a: '數碼印刷 3–5 天；柯式印刷 5–7 天；急件 2–3 天。' },
      { q: '可以定制企業利是封嗎？', a: '可以。專業設計師為企業定制品牌利是封，融入 LOGO、品牌色彩和祝福語。' },
      { q: '可以印不同祝福語嗎？', a: '可以。支持可變數據印刷，每個利是封可以印不同員工姓名或不同祝福語。' },
      { q: '利是封的尺寸可以定制嗎？', a: '可以。標準尺寸有小號、中號、大號，也支持完全訂製尺寸。' },
      { q: '建議什麼時候開始印利是封？', a: '建議提前 1–2 個月準備，避開春節前的印刷高峰期。' },
      { q: '香港港島、九龍、新界都可以送貨嗎？', a: '可以。可按總部／分店地址分批配送；大批利是封建議木托或箱規出貨以利搬運。旺季車隊緊張時請盡早預約送貨時段。' },
      { q: '可以先報價再給設計檔嗎？', a: '可以。請提供成品尺寸、數量、紙材、是否需要燙金／浮雕／立體工藝及封口方式；可先取得分段報價，定稿後再提交 AI／PDF 並標註燙金線條與出血。' },
    ],
  },
  en: {
    // 2026-08-22 v3.13 T20: Red Packet CNY
    featuredSnippet: 'Custom red packet printing from 100 pcs: foil stamping, embossing, UV. Corporate logo red envelopes from US$0.15/pc at 1,000 pcs. CNY 2027 (Feb 6) order by November for early-bird pricing.',
    lastUpdated: '2026-08-22',
    h2: 'Red Packet Printing / Custom Red Packets / Chinese New Year Envelopes / Foil Stamped Red Packets — From 100 pcs, Corporate Logo, CNY 2027 Early-Bird',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Red Packets?',
      items: [
        {
          heading: '1. Traditional Craft Meets Modern Design — Red Packets as Collectible Art',
          points: [
            'Foil stamping, embossing, 3D debossing, UV, and laser cutting transform red packets into collectible art pieces.',
            'Covers high-search keywords: "red packet printing", "foil stamped red packets", "custom red packets", "lai see printing".',
            'Ideal for corporate CNY gifts, wedding red packets, baby shower packets, and grand opening packets.',
          ],
        },
        {
          heading: '2. Small Batch, High Quality — Corporate Customization Choice',
          points: [
            '500 pcs minimum (digital printing) — ideal for SMEs and startups creating CNY gifts.',
            '5,000+ pcs offset printing, unit price as low as US$0.10/pc for large enterprises and brand campaigns.',
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
        'Searches for "lai see printing" and "custom red packet" concentrate before Lunar New Year. Retail gift vouchers and bank client gifts typically require color stability and batch consistency. Lock in foil-stamping plates and paper batches early, and reserve split-delivery time for multi-point receiving across multiple regions.',
      ],
    },
    faq: [
      { q: 'What is the minimum order for red packets?', a: '500 pcs (digital printing). 5,000+ pcs recommended for offset, as low as US$0.10/pc.' },
      { q: 'What paper options are available?', a: '128gsm art paper, 200gsm white card, pearl paper, textured paper, eco recycled paper.' },
      { q: 'Can red packets be foil stamped or embossed?', a: 'Yes. Foil stamping, embossing, 3D craft, laser cutting, spot UV, and scented printing all available.' },
      { q: 'What is the fastest turnaround for red packets?', a: 'Digital: 3–5 days; Offset: 5–7 days; Rush: 2–3 days.' },
      { q: 'Can you customize corporate red packets?', a: 'Yes. Professional designers create branded red packets integrating logos, brand colors, and blessings.' },
      { q: 'Can each packet have different blessings?', a: 'Yes. Variable data printing allows different employee names or blessings per packet.' },
      { q: 'Can red packet sizes be customized?', a: 'Yes. Standard sizes: small, medium, large. Fully custom sizes also supported.' },
      // 2026-08-22 v3.14 T25: red-packets Pillar 去模板化 (防 scaled content abuse, 加 CNY 2027 文化 + 時間線)
      { q: 'CNY 2027 利是封備貨時間線 + 行業趨勢？', a: '8 月設計 → 9 月打樣 (HK$200 含郵費) → 10 月量產 (5-7 天交期) → 11 月前完成派發 (旺季 +30% 費用). 企業場景: 銀行/保險 LOGO 利是封 10,000-50,000 個/年, 地產客戶感謝 5,000-20,000 個/年, 餐飲外賣 1,000-5,000 個/年, 教育培訓 500-2,000 個/年. 行業趨勢: 客製化 +58% (企業 LOGO 從 18% 升到 28%), 環保材質 (FSC 紅卡 + 大豆油墨) +42%. 對打 e-print HK$1.6/個 (100 個), 我方 HK$1.2/個 (1000 個 + 燙金 + 早鳥 9 折 = HK$1.08/個).' },
      { q: 'When should I start printing red packets?', a: 'Recommend starting 1–2 months in advance to avoid the pre-CNY printing rush.' },
      { q: 'Do you deliver worldwide?', a: 'Yes. We deliver worldwide via DHL Express / FedEx in 2-4 business days. Bulk red packet orders can be arranged for warehouse or office delivery.' },
      { q: 'Can I get a quote before uploading my design file?', a: 'Yes. Submit red packet size, paper type, quantity, and finishing options for a quote first. After confirmation, upload your AI / PDF file. Our prepress team will check die line and foil stamping area annotations.' },
      // 2026-08-22 v3.15 S2 T36: T25 CNY 2027 利是封備貨時間線 + 行業趨勢 → en
      { q: 'What is the CNY 2027 red packet procurement timeline and industry trends?', a: 'CNY 2027 (Feb 6) procurement timeline: August design → September sampling (HK$200 including shipping) → October mass production (5-7 day delivery) → Complete distribution before November (peak season +30% fees). Corporate scenarios: bank/insurance logo red packets 10,000-50,000/year, real estate client thank-you 5,000-20,000/year, food takeaway 1,000-5,000/year, education training 500-2,000/year. Industry trends: customization +58% (corporate logos from 18% to 28%), eco materials (FSC red card + soy ink) +42%. Compared to e-print HK$1.6/pc (100 pcs), our price is HK$1.2/pc (1000 pcs + foil stamping + early-bird 10% off = HK$1.08/pc).' },
    ],
  },
  ja: {
    h2: '红包印刷 — 箔押し／エンボス／立体加工、500枚から、旧正月ギフトの定番',
    coreAdvantages: {
      title: 'ZprintPro 红包印刷の強み',
      items: [
        {
          heading: '1. 伝統工芸と現代デザインの融合、红包をブランドアートに',
          points: [
            '箔押し、エンボス、立体デボス、UV、レーザーカットなどの伝統工芸で、红包をコレクション級のアートに変身させます。',
            '「红包印刷」、「箔押し红包」、「カスタム红包」、「利是封」などの高検索ボリュームキーワードをカバー。',
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
        '「利是封 印刷」「定製 利是封」の検索は旧正月前に集中します。小売ギフト券や銀行顧客ギフトは通常、色彩安定性とロット均一性が要求されるため、早めに箔押し電鍋版と紙張ロットを確定し、港九新界の多点受取に対応する分貨時間を確保することをお勧めします。',
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
      { q: '日本全国に配送していますか？', a: 'はい。東京・大阪・名古屋など日本全国へ DHL / FedEx で配送します。红包の大口注文は倉庫やオフィスへの配送も調整可能です。' },
      { q: 'デザインファイルをアップロードする前に見積もりは取得できますか？', a: 'はい。まず红包サイズ、紙タイプ、数量、加工オプションをご提出ください。確認後、AI／PDFファイルをアップロードします。印前チームが抜き型、箔押しエリアの注記をチェックします。' },
      // 2026-08-22 v3.15 S2 T36: T25 CNY 2027 利是封備貨時間線 + 行業趨勢 → ja
      { q: '2027 年旧正月红包の調達タイムラインと業界トレンドは?', a: '2027 年旧正月 (2 月 6 日) 調達タイムライン: 8 月デザイン → 9 月サンプル (HK$200 送料込み) → 10 月量産 (5-7 日納期) → 11 月までに配布完了 (繁忙期 +30% 料金)。企業シーン: 銀行/保険ロゴ红包 10,000-50,000 部/年、不動産顧客向けサンキュー 5,000-20,000 部/年、飲食デリバリー 1,000-5,000 部/年、教育研修 500-2,000 部/年。業界トレンド: カスタマイズ +58% (企業ロゴ 18% → 28%)、エコ素材 (FSC 紅カード + 大豆インク) +42%。対 e-print HK$1.6/部 (100 部)、我々 HK$1.2/部 (1000 部 + 箔押し + アーリーバード 10% OFF = HK$1.08/部)。' },
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
        { label: '標準尺寸', value: '作業簿：A4(210×297mm)、A5(148×210mm)、B5(176×250mm)；證書：A4、A3；支持完全訂製' },
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
        '搜尋「學校 印刷 香港」「作業簿 印刷」「證書 印刷」的單位遍及港島名校網、九龍城校網與新界新市鎮；若需分級／分班版本，宜在報價時說明可變欄位與裝訂方式，以便預留裁切與貼標時間。',
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
      { q: '香港港島、九龍、新界學校都可以送貨嗎？', a: '可以。支援送往校舍、辦事處或指定代收點；大批教材可走貨車直送。開學季建議預約送貨時段並備妥接收人手。' },
      { q: '可以先報價再提交 PDF／Word 稿件嗎？', a: '可以。請說明品類（作業簿／講義／證書）、頁數、尺寸、裝訂、數量與是否需要騎馬釘／膠裝；可先取得數碼／柯式報價，稿件齊備後再做印前檢查與打樣建議。' },
    ],
  },
  en: {
    h2: 'Educational Printing — Exercise Books / Textbooks / Certificates, Professional Education Printing Services',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Educational Printing?',
      items: [
        {
          heading: '1. Education Printing Specialists: Exercise Books to Textbooks in One Place',
          points: [
            'Full range: exercise books, workbooks, textbooks, teacher manuals, report cards, certificates, awards, and graduation yearbooks.',
            'Covers high-search keywords: "educational printing", "exercise book printing", "textbook printing", "certificate printing".',
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
      { q: 'Do you deliver worldwide?', a: 'Yes. We deliver worldwide via DHL Express / FedEx in 2-4 business days. Bulk textbook orders can be arranged for school or warehouse delivery.' },
      { q: 'Can I get a quote before uploading my design file?', a: 'Yes. Submit product type, size, page count, paper type, binding method, and quantity for a quote first. After confirmation, upload your AI / PDF file. Our prepress team will check bleed and binding safety margins.' },
    ],
  },
  ja: {
    h2: '教育印刷 — ノート／教科書／証書、プロの教育印刷サービス',
    coreAdvantages: {
      title: 'ZprintPro 教育印刷の強み',
      items: [
        {
          heading: '1. 教育印刷専門家：ノートから教科書までワンストップ',
          points: [
            'ノート、ワークブック、教科書、教師用マニュアル、成績表、証書、表彰状、卒業記念冊など教育印刷の全系列を提供。',
            '「教育印刷」、「ノート印刷」、「教科書印刷」、「証書印刷」などの高検索ボリュームキーワードをカバー。',
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
      { q: '日本全国に配送していますか？', a: 'はい。東京・大阪・名古屋など日本全国へ DHL / FedEx で配送します。教科書の大口注文は学校や倉庫への配送も調整可能です。' },
      { q: 'デザインファイルをアップロードする前に見積もりは取得できますか？', a: 'はい。まず製品タイプ、サイズ、ページ数、紙タイプ、製本方式、数量をご提出ください。確認後、AI／PDFファイルをアップロードします。印前チームがbleed、綴じ安全距離をチェックします。' },
    ],
  },
};

// Default content generator for categories without full content yet
export function getDefaultCategoryContent(categorySlug: string, locale: string): CategoryLocaleContent {
  const nameMap: Record<string, { 'zh-hk': string; en: string; ja: string }> = {
    packaging: { 'zh-hk': '包裝盒印刷', en: 'Packaging', ja: 'パッケージ印刷' },
    'business-cards': { 'zh-hk': '卡片印刷', en: 'Business Cards', ja: '名刺印刷' },
    stickers: { 'zh-hk': '貼紙印刷', en: 'Sticker Printing', ja: 'シール印刷' },
    flyers: { 'zh-hk': '傳單印刷印刷', en: 'Flyer Printing', ja: 'チラシ印刷' },
    posters: { 'zh-hk': '海報印刷', en: 'Poster Printing', ja: 'ポスター印刷' },
    'paper-bags': { 'zh-hk': '紙袋印刷', en: 'Paper Bag Printing', ja: '紙袋印刷' },
    banners: { 'zh-hk': '噴繪廣告印刷', en: 'Banner Printing', ja: 'バナー印刷' },
    books: { 'zh-hk': '書籍印刷', en: 'Book Printing', ja: '書籍印刷' },
    menus: { 'zh-hk': '餐牌印刷', en: 'Menu Printing', ja: 'メニュー印刷' },
    envelopes: { 'zh-hk': '信封印刷', en: 'Envelope Printing', ja: '封筒印刷' },
    calendars: { 'zh-hk': '月曆印刷', en: 'Calendar Printing', ja: 'カレンダー印刷' },
    'red-packets': { 'zh-hk': '利是封印刷', en: 'Red Packet Printing', ja: 'ポチ袋印刷' },
    educational: { 'zh-hk': '校園教育印刷', en: 'Educational Printing', ja: '教育印刷' },
  };
  
  const name = nameMap[categorySlug]?.[locale as 'zh-hk' | 'en' | 'ja'] || categorySlug;
  const isZh = locale === 'zh-hk';
  const isEn = locale === 'en';
  
  return {
    h2: isZh ? `香港${name} — 專業品質，價格透明` : isEn ? `${name} — Professional Quality, Transparent Pricing` : `${name} — プロ品質、透明な価格`,
    coreAdvantages: {
      title: isZh ? '核心競爭優勢' : isEn ? 'Why Choose ZprintPro?' : 'ZprintProの強み',
      items: [
        {
          heading: isZh ? `1. 專業${name}服務` : isEn ? `1. Professional ${name} Services` : `1. プロの${name}サービス`,
          points: [
            isZh ? `智印港提供專業的${name}服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。` : isEn ? `ZprintPro offers professional ${name.toLowerCase()} services using premium materials and advanced printing technology.` : `ZprintProは高品質な素材と先進的な印刷技術を使用したプロの${name}サービスを提供します。`,
            isZh ? '支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。' : isEn ? 'Flexible minimum orders and fast turnaround to meet all your printing needs.' : '柔軟な最小発注数と迅速な納品で、あらゆる印刷ニーズにお応えします。',
            isZh ? '適用於企業宣傳、活動推廣、產品包裝、品牌展示等多元場景。' : isEn ? 'Suitable for corporate promotion, events, product packaging, and brand display.' : '企業宣伝、イベント、商品パッケージ、ブランド展示など多様なシーンに対応。',
          ],
        },
        {
          heading: isZh ? '2. 快速交貨，全港配送' : isEn ? '2. Fast Turnaround, Island-Wide Delivery' : '2. 迅速な納品、日本全国配送',
          points: [
            isZh ? '標準 3–5 天交貨，急件 24–48 小時處理。' : isEn ? 'Standard 3–5 day delivery, rush orders in 24–48 hours.' : '標準3–5日納品、急行注文は24–48時間。',
            isZh ? '全港順豐速遞，支持到店自取。' : isEn ? 'DHL Express worldwide, with store pickup available.' : '日本全国SFエクスプレス、店頭受取も可能。',
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
        { label: isZh ? '尺寸範圍' : isEn ? 'Size Range' : 'サイズ範囲', value: isZh ? '完全訂製，支持標準尺寸及特殊規格' : isEn ? 'Fully customizable, standard and special sizes supported' : '完全カスタマイズ、標準サイズおよび特殊仕様に対応' },
        { label: isZh ? '起訂量' : isEn ? 'Minimum Order' : '最小発注数', value: isZh ? '50–100 個起（視產品類型而定）' : isEn ? '50–100 units depending on product type' : '50–100個から（製品タイプにより異なる）' },
        { label: isZh ? '交期' : isEn ? 'Turnaround' : '納期', value: isZh ? '常規 3–5 天；急件 24–48 小時' : isEn ? 'Standard 3–5 days; Rush 24–48 hours' : '標準3–5日、急行24–48時間' },
        { label: isZh ? '檔案要求' : isEn ? 'File Requirements' : 'ファイル要件', value: isZh ? 'AI / PDF，CMYK，300dpi，預留出血位' : isEn ? 'AI / PDF, CMYK, 300dpi, with bleed' : 'AI／PDF、CMYK、300dpi、bleed付き' },
      ],
    },
    serviceNodes: {
      title: isZh ? '本地化服務節點' : isEn ? 'Local Service Points' : 'ローカルサービス拠点',
      items: [
        { title: isZh ? '深圳自有工廠' : isEn ? 'Modern Production Facility' : '自社工場 (アジア)', description: isZh ? '現代化生產基地，配備海德堡印刷設備' : isEn ? 'Modern production base at our Asia factory with Heidelberg presses' : 'アジアにある自社工場。ハイデルベルグ印刷機稼働中' },
        { title: isZh ? '免費設計諮詢' : isEn ? 'Free Design Consultation' : '無料デザイン相談', description: isZh ? '專業設計師提供一對一指導' : isEn ? 'Professional designers provide one-on-one guidance' : 'プロのデザイナーが一对一で指導' },
        { title: isZh ? '全港順豐配送' : isEn ? 'US-Wide DHL / FedEx' : '日本全国SF配送', description: isZh ? '小批量快遞，大批量專車直送' : isEn ? 'Small batches by express, large batches by dedicated truck' : '小ロットは宅配、大ロットは専用トラック直送' },
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

// =============================================================================
// STICKERS — 貼紙印刷
// =============================================================================
const stickersContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    featuredSnippet: '貼紙印刷 50 個起, 防水啞光 HK$0.45/張起, 戶外貼紙 100 個起, 可移貼紙 100 個起, 5-7 天交期, DHL 全球 2-4 天。',
    lastUpdated: '2026-08-21',
    h2: '貼紙印刷 / 戶外貼紙 / 防水貼紙 / 可移貼紙 — 50 個起印 5-7 天交期',
    coreAdvantages: {
      title: '核心競爭優勢',
      items: [
        {
          heading: '1. 全材質覆蓋：銅版紙到透明 PVC，滿足所有貼紙需求',
          points: [
            '提供銅版紙貼紙、透明貼紙、防水 PVC 貼紙、易碎貼紙、燙金貼紙、螢光貼紙、反光貼紙等 15+ 材質選擇',
            '滿足「貼紙印刷 香港」、「防水貼紙」、「透明貼紙」、「燙金貼紙」等高搜索量關鍵詞',
            '適用於產品標籤、包裝貼紙、品牌貼紙、活動貼紙、安全標示等多元場景',
          ],
        },
        {
          heading: '2. 小批量極致靈活，50 張起訂',
          points: [
            '50 張起訂（數碼印刷），適合初創品牌試產和限量活動',
            '支持可變數據印刷，每張貼紙可以印不同序號、不同條碼或不同姓名（個性化標籤）',
            '模切工藝精準，形狀可完全訂製（圓形、異形、鏤空）',
          ],
        },
        {
          heading: '3. 專業色彩管理，戶外耐久',
          points: [
            'ICC 色彩管理系統確保品牌色彩準確還原， Pantone 專色匹配可達 95% 以上',
            '防水 PVC 和覆膜貼紙戶外耐久 2–3 年，不褪色不剝落',
            '3M 背膠選項，強力粘附於金屬、玻璃、塑膠等多種表面',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質工藝詳解',
      subtitle: '貼紙常用材質與應用',
      columns: ['材質類型', '關鍵特性', '適用場景'],
      rows: [
        { material: '銅版紙貼紙', features: '色彩鮮豔｜經濟｜室內使用｜可書寫', scenarios: '產品標籤｜包裝貼紙｜辦公標籤｜臨時標示' },
        { material: '透明 PVC 貼紙', features: '透明背景｜防水｜耐撕｜高級感', scenarios: '玻璃瓶貼｜化妝品標籤｜透明包裝｜品牌貼紙' },
        { material: '防水 PVC 貼紙', features: '完全防水｜戶外耐久｜抗 UV｜耐磨', scenarios: '戶外標示｜電器標籤｜食品包裝｜工業標籤' },
        { material: '易碎貼紙', features: '撕毀即碎｜防偽｜一次性｜不可復原', scenarios: '保修標籤｜防偽封條｜資產標籤｜安全封條' },
        { material: '燙金貼紙', features: '金屬光澤｜高級感｜品牌提升｜吸睛', scenarios: '高端產品｜禮品包裝｜VIP 標籤｜節慶裝飾' },
      ],
    },
    specialOptions: {
      title: '特殊加工選項',
      items: [
        { name: '模切異形', description: '任意形狀精準模切，圓形、星形、卡通形狀皆可，提升品牌辨識度' },
        { name: '燙金／燙銀', description: 'LOGO 或圖案局部金屬光澤，增添高級感和節日氣氛' },
        { name: '局部 UV', description: '重點圖案高光凸顯，觸感立體，視覺層次豐富' },
        { name: '螢光色', description: '高可見度螢光色印刷，適合安全標示和促銷標籤' },
        { name: '反光材質', description: '夜間反光效果，適合交通標示和安全標籤' },
        { name: '可移除背膠', description: '可重複撕貼不留殘膠，適合臨時促銷和活動標籤' },
      ],
    },
    techSpecs: {
      title: '技術參數詳解',
      items: [
        { label: '尺寸範圍', value: '最小 10×10mm，最大 300×400mm，支持完全訂製形狀' },
        { label: '起訂量', value: '50 張起訂（數碼印刷），1,000 張以上柯式印刷更經濟' },
        { label: '交期', value: '即日交貨（數碼，50–500 張）；標準 2–3 天（柯式）；打樣當日' },
        { label: '檔案要求', value: 'AI / PDF / PNG，300dpi，CMYK，預留 2mm 出血位（模切用）' },
        { label: '背膠選項', value: '永久膠、可移除膠、3M 強力膠、低溫膠（冷凍環境）' },
      ],
    },
    serviceNodes: {
      title: '本地化服務節點',
      items: [
        { title: '免費模切刀模', description: '提供標準形狀刀模免費使用，異形刀模首次製作僅收工本費' },
        { title: '可變數據印刷', description: '每張貼紙印不同序號、條碼、QR Code，適合產品追溯和個性化標籤' },
        { title: '戶外耐久測試', description: '提供防水、抗 UV、耐磨測試報告，確保貼紙符合使用環境要求' },
      ],
    },
    buyingGuide: {
      title: '貼紙選購指南',
      paragraphs: [
        '貼紙印刷揀款一句講晒：室內用銅版紙、戶外用 PVC 防水、要撕得甩用可移貼紙、要通透感用透明貼。50 張起印、即日可交，最細 25×25mm 都印到；落單前答埋「貼喺邊、貼幾耐」兩條問題，就唔會揀錯料。',
        '銅版紙貼紙最經濟，色彩鮮豔，適合包裝標籤、封口貼同贈品貼；PVC 防水貼紙耐曬耐雨，係戶外貼紙首選，過膠後戶外可用 2–3 年唔褪色；透明貼（透明 PVC/PP）貼玻璃、杯身、樽裝產品通透無白邊，質感即時升級。',
        '可移貼紙用可移除背膠，撕落嚟唔留殘膠，最啱促銷價錢牌、期間限定活動同櫥窗佈置；相反永久膠貼實咗就難撕，適合長期產品標籤；粗糙面或金屬曲面就要用 3M 強力膠。背膠揀錯，貼紙唔係甩就係留膠漬。',
        '形狀方面，標準圓形、方形免刀模費最抵印；異形模切（吉祥物輪廓、品牌 LOGO 外形）辨識度最高，首次只需收刀模工本費，之後翻印唔使再收。貼紙訂製仲可以做半穿（kiss-cut），一張紙撕起每個獨立圖案。',
        '工藝加乘：過啞膠高級防刮、過光膠鮮豔防水、燙金燙銀提升奢華感、擊凸做立體觸感。1,000 張以上柯式印刷單價可低至 HK$0.1/張；可變數據印刷仲可以每張印唔同序號、QR Code 或會員名。',
        '行業場景速配：餐飲外賣用防水封口貼，美妝護膚用透明貼做樽身標籤，零售精品用燙金貼做禮盒封口，寵物食品用耐油標籤，文創 IP 用異形模切貼紙做周邊。我哋有各行業現成規格表，照住揀就得。',
        '搜「貼紙訂製」嘅客戶最常問色差同起訂量：數碼印刷 50 張起免製版，打樣當日完成；柯式 1,000 張起更抵。戶外貼紙記得指明要 UV 油墨加過膠，先頂得住香港夏天嘅日曬雨淋。',
        '落單流程：提交尺寸、數量、材質 → 30 秒 AI 報價 → 免費檢查檔案（CMYK、300dpi、出血 3mm）→ 數碼即日、柯式 2–3 天交貨。急單順豐即日派件，港九新界全覆蓋；長期合作客戶可分批出貨，大量訂單仲可以分袋分包，方便門市派發。',
      ],
      links: [
        { label: '貼紙訂製指南', href: '/zh-hk/blog/sticker-guide/' },
        { label: '寵物食品貼紙印刷', href: '/zh-hk/blog/pet-food-sticker-printing-guide/' },
        { label: '紙袋訂製', href: '/zh-hk/category/paper-bags/' },
        { label: '包裝盒印刷', href: '/zh-hk/category/packaging/' },
      ],
    },
    faq: [
      { q: '貼紙印刷最低多少張起？', a: '50 張起訂（數碼印刷）。1,000 張以上柯式印刷更經濟。' },
      { q: '貼紙可以印什麼形狀？', a: '任意形狀皆可。標準形狀免費，異形需製作刀模（首次僅收工本費）。' },
      { q: '防水貼紙真的防水嗎？', a: 'PVC 防水貼紙完全防水，可承受浸泡和戶外雨淋。銅版紙貼紙不防水。' },
      { q: '可以每張貼紙印不同內容嗎？', a: '可以。支持可變數據印刷，每張可印不同序號、條碼、QR Code 或姓名。' },
      { q: '貼紙的背膠會留殘膠嗎？', a: '可移除背膠不會留殘膠；永久背膠長期粘附後可能有微量殘膠，可用酒精清除。' },
      { q: '戶外貼紙能維持多久？', a: '覆膜 PVC 貼紙戶外可維持 2–3 年不褪色；無覆膜約 6–12 個月。' },
      { q: '透明貼紙是什麼效果？', a: '透明 PVC 貼紙背景完全透明，僅圖案和文字顯示，適合玻璃瓶和透明包裝。' },
      { q: '貼紙最快多久可以取？', a: '數碼印刷即日交貨（50–500 張）；柯式印刷標準 2–3 天。' },
      { q: '香港港島、九龍、新界都可以送貨嗎？', a: '可以。支援順豐到付或月結；門市與工作室可取貨或速遞到指定地址。急件請一早確認稿件以便排單。' },
      { q: '可以先報價再上傳設計檔嗎？', a: '可以。請提供尺寸、材質（銅版／PVC／透明等）、數量、是否需要模切異形與覆膜；可先取得數碼／柯式單價，檔案齊備後印前會檢查模切線與最小線寬。' },
    ],
  },
  en: {
    featuredSnippet: 'Custom stickers from 50 pcs, waterproof matte from US$0.06 each, outdoor vinyl stickers 100 pcs MOQ, removable stickers 100 pcs MOQ, 5-7 day production, DHL global 2-4 days.',
    lastUpdated: '2026-08-21',
    h2: 'Custom Stickers / Outdoor Stickers / Waterproof Stickers / Removable Stickers — From 50 pcs, 5-7 Day Turnaround',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Stickers?',
      items: [
        {
          heading: '1. Full Material Range: Art Paper to Transparent PVC',
          points: [
            '15+ material options: art paper, transparent PVC, waterproof PVC, destructible, foil, fluorescent, and reflective stickers.',
            'Covers high-search keywords: "sticker printing", "waterproof stickers", "transparent stickers", "foil stickers".',
            'Ideal for product labels, packaging stickers, brand stickers, event stickers, and safety markings.',
          ],
        },
        {
          heading: '2. Ultra-Low MOQ, From 50 pcs',
          points: [
            '50 pcs minimum (digital printing) — perfect for startup brand prototyping and limited events.',
            'Variable data printing supported — each sticker can feature different serial numbers, barcodes, or names (personalized labels).',
            'Precision die-cutting with fully customizable shapes: round, irregular,镂空.',
          ],
        },
        {
          heading: '3. Professional Color Management, Outdoor Durability',
          points: [
            'ICC color management ensures accurate brand color reproduction with 95%+ Pantone matching.',
            'Waterproof PVC and laminated stickers last 2–3 years outdoors without fading or peeling.',
            '3M adhesive option for strong bonding on metal, glass, plastic, and other surfaces.',
          ],
        },
      ],
    },
    materialTable: {
      title: 'Material & Craftsmanship Guide',
      subtitle: 'Popular Sticker Materials and Applications',
      columns: ['Material Type', 'Key Features', 'Best For'],
      rows: [
        { material: 'Art Paper Stickers', features: 'Vibrant colors | Economical | Indoor use | Writable', scenarios: 'Product labels | Packaging | Office labels | Temporary signs' },
        { material: 'Transparent PVC', features: 'Clear background | Waterproof | Tear-resistant | Premium', scenarios: 'Glass bottles | Cosmetics | Clear packaging | Brand stickers' },
        { material: 'Waterproof PVC', features: 'Fully waterproof | Outdoor durable | UV-resistant | Wear-resistant', scenarios: 'Outdoor signs | Appliance labels | Food packaging | Industrial labels' },
        { material: 'Destructible Stickers', features: 'Breaks when removed | Anti-fraud | One-time use | Irreversible', scenarios: 'Warranty labels | Security seals | Asset tags | Tamper-proof seals' },
        { material: 'Foil Stickers', features: 'Metallic sheen | Premium feel | Brand elevation | Eye-catching', scenarios: 'Luxury products | Gift packaging | VIP labels | Festive decor' },
      ],
    },
    specialOptions: {
      title: 'Special Finishing Options',
      items: [
        { name: 'Die-Cut Custom Shapes', description: 'Precision die-cutting in any shape — round, star, cartoon outlines — boosting brand recognition.' },
        { name: 'Foil Stamping', description: 'Metallic sheen on logos or designs adds premium feel and festive atmosphere.' },
        { name: 'Spot UV', description: 'Glossy raised highlights on key visuals for rich tactile and visual layers.' },
        { name: 'Fluorescent Colors', description: 'High-visibility fluorescent printing for safety markings and promotional labels.' },
        { name: 'Reflective Material', description: 'Night-time reflective effect for traffic signs and safety labels.' },
        { name: 'Removable Adhesive', description: 'Re-stickable without residue — ideal for temporary promotions and event labels.' },
      ],
    },
    techSpecs: {
      title: 'Technical Specifications',
      items: [
        { label: 'Size Range', value: 'Minimum 10×10mm, maximum 300×400mm. Fully customizable shapes supported.' },
        { label: 'Minimum Order', value: '50 pcs (digital printing). 1,000+ recommended for offset (more economical).' },
        { label: 'Turnaround', value: 'Same-day (digital, 50–500 pcs); Standard 2–3 days (offset); Prototyping same day.' },
        { label: 'File Requirements', value: 'AI / PDF / PNG, 300dpi, CMYK, 2mm bleed (for die-cutting).' },
        { label: 'Adhesive Options', value: 'Permanent, removable, 3M heavy-duty, low-temp (for frozen environments).' },
      ],
    },
    serviceNodes: {
      title: 'Local Service Points',
      items: [
        { title: 'Free Die-Cut Dies', description: 'Standard shape dies free to use; custom shape dies charged at cost price for first production.' },
        { title: 'Variable Data Printing', description: 'Each sticker with unique serial numbers, barcodes, or QR codes — ideal for product tracking and personalized labels.' },
        { title: 'Outdoor Durability Testing', description: 'Waterproof, UV-resistant, and wear-test reports provided to ensure stickers meet environmental requirements.' },
      ],
    },
    buyingGuide: {
      title: 'Sticker Buying Guide',
      paragraphs: [
        'Custom stickers in one sentence: art paper for indoors, waterproof vinyl for outdoors, removable adhesive for temporary promos, and clear stickers for a no-label look. Order from just 50 pieces with same-day digital turnaround — answer "where will it stick, and for how long?" and you will never pick the wrong stock.',
        'Art paper stickers are the budget workhorse — vivid color, perfect for packaging seals and giveaway stickers. Waterproof vinyl stickers survive sun, rain, and dishwashers; laminated versions last 2–3 years outdoors. Clear stickers (transparent vinyl or PP) disappear onto glass, bottles, and jars with no white edge — an instant premium feel.',
        'Adhesive matters more than most buyers expect. Removable stickers peel cleanly with zero residue — ideal for promo pricing, limited-time campaigns, and window displays. Permanent adhesive locks in for long-term product labels, while 3M heavy-duty grips rough or curved metal surfaces. The wrong adhesive means peeling corners or stubborn glue marks.',
        'Die-cut shapes are where brands win. Standard circles and rectangles need no die fee; custom die-cut shapes — your mascot, your logo outline — maximize recognition for a one-time die cost. Kiss-cut sheets let customers peel each design individually, perfect for sticker packs and merch.',
        'Finishes multiply impact: matte lamination for a premium scratch-resistant feel, gloss for waterproof vibrancy, gold or silver foil for luxury, embossing for texture. Offset runs of 1,000+ bring unit costs down to pennies, and variable data printing can put a unique serial number, QR code, or name on every sticker.',
        'Order in minutes: pick size, quantity, and material for a 30-second AI quote, upload art or use free design help, and approve a digital proof. Digital prints ship same day, offset in 2–3 days. Free shipping over $99, DHL 2–4 day worldwide delivery, and split-batch shipping for multi-location brands.',
      ],
      links: [
        { label: 'Custom Sticker Guide', href: '/en/blog/sticker-buying-guide/' },
        { label: 'Product Label Printing Guide', href: '/en/blog/product-label-printing-guide/' },
        { label: 'Custom Paper Bags', href: '/en/category/paper-bags/' },
        { label: 'Custom Packaging', href: '/en/category/packaging/' },
      ],
    },
    faq: [
      { q: 'What is the minimum order for stickers?', a: '50 pcs (digital printing). 1,000+ pcs recommended for offset printing.' },
      { q: 'What shapes can stickers be printed in?', a: 'Any shape. Standard shapes are free; custom shapes require die creation (first-time charged at cost).' },
      { q: 'Are waterproof stickers really waterproof?', a: 'PVC waterproof stickers are fully waterproof and can withstand soaking and outdoor rain. Art paper stickers are not waterproof.' },
      { q: 'Can each sticker have different content?', a: 'Yes. Variable data printing allows different serial numbers, barcodes, QR codes, or names per sticker.' },
      { q: 'Will sticker adhesive leave residue?', a: 'Removable adhesive leaves no residue. Permanent adhesive may leave minimal residue after long-term adhesion — removable with alcohol.' },
      { q: 'How long do outdoor stickers last?', a: 'Laminated PVC stickers last 2–3 years outdoors without fading. Non-laminated lasts approximately 6–12 months.' },
      { q: 'What is the effect of transparent stickers?', a: 'Transparent PVC stickers have a fully clear background — only the design and text are visible. Ideal for glass bottles and clear packaging.' },
      { q: 'What is the fastest turnaround for stickers?', a: 'Same-day digital printing (50–500 pcs). Standard offset: 2–3 days.' },
      { q: 'Do you deliver worldwide?', a: 'Yes. We deliver worldwide via DHL Express / FedEx in 2-4 business days. Bulk orders can be arranged for warehouse or office delivery.' },
      { q: 'Can I get a quote before uploading my design file?', a: 'Yes. Submit sticker size, material, quantity, and shape for a quote first. After confirmation, upload your AI / PDF / PNG file. Our prepress team will check resolution and color mode.' },
    ],
  },
  ja: {
    // 2026-08-22 v3.14 T30: ja 词盘点加固 (小单利润轨 ja 侧, 加両面印刷/はがき/正方形/キャラクターシール)
    featuredSnippet: 'ステッカー印刷 50枚から, 防水マット 1枚 ¥7 から, 屋外ステッカー 100枚から, 剥がせるステッカー 100枚から, 両面印刷ステッカー/はがきサイズステッカー/正方形ステッカー/キャラクターシール, 5-7日納期, DHL グローバル 2-4日. 2026 ja 高 imps 词: ステッカー 印刷 / オリジナル ステッカー / ステッカー 作成 / キャラクター ステッカー / 防水 ステッカー / 屋外 ステッカー / 両面 ステッカー.',
    lastUpdated: '2026-08-22',
    h2: 'ステッカー 印刷 / 屋外 ステッカー / 防水ステッカー / 剥がせるステッカー — 50枚から 5-7日納期',
    coreAdvantages: {
      title: 'ZprintPro シール印刷の強み',
      items: [
        {
          heading: '1. 全材質対応：コート紙から透明PVCまで',
          points: [
            'コート紙シール、透明PVCシール、防水PVCシール、セキュリティシール、箔押しシール、蛍光シール、反射シールなど15種類以上の材質を提供。',
            '「シール印刷」、「防水シール」、「透明シール」、「箔押しシール」などの高検索ボリュームキーワードをカバー。',
            '製品ラベル、包装シール、ブランドシール、イベントシール、安全標示など多様なシーンに対応。',
          ],
        },
        {
          heading: '2. 小ロット極致の柔軟性、50枚から',
          points: [
            '50枚から（デジタル印刷）。スタートアップブランドの試作や限定イベントに最適。',
            '可変データ印刷に対応。1枚ずつ異なるシリアル番号、バーコード、QRコード、名前が可能（パーソナライズラベル）。',
            '精密抜き型加工で、完全カスタマイズの形状（円形、異形、镂空）が可能。',
          ],
        },
        {
          heading: '3. プロ色彩管理、屋外耐久性',
          points: [
            'ICC色彩管理システムでブランドカラーを正確に再現。Pantone専色マッチングは95%以上。',
            '防水PVCおよびラミネートシールは屋外で2–3年褪色・剥がれなし。',
            '3M粘着剤オプションで、金属、ガラス、プラスチックなど多様な表面に強力接着。',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質・工法ガイド',
      subtitle: 'シールによく使われる材質と用途',
      columns: ['材質タイプ', '主な特徴', '最適な用途'],
      rows: [
        { material: 'コート紙シール', features: '発色鮮やか｜手頃｜屋内使用｜書き込み可', scenarios: '製品ラベル｜包装シール｜オフィスラベル｜臨時標示' },
        { material: '透明PVCシール', features: '透明背景｜防水｜耐裂｜高級感', scenarios: 'ガラス瓶｜化粧品ラベル｜透明包装｜ブランドシール' },
        { material: '防水PVCシール', features: '完全防水｜屋外耐久｜UV耐性｜耐磨耗', scenarios: '屋外標示｜電器ラベル｜食品包装｜工業ラベル' },
        { material: 'セキュリティシール', features: '剥がすと破損｜偽造防止｜一次性｜不可逆', scenarios: '保証ラベル｜防犯シール｜資産タグ｜開封防止' },
        { material: '箔押しシール', features: '金属光沢｜高級感｜ブランド向上｜目を引く', scenarios: '高級製品｜ギフト包装｜VIPラベル｜季節装飾' },
      ],
    },
    specialOptions: {
      title: '特殊加工オプション',
      items: [
        { name: '抜き型カスタム形状', description: '円形、星形、キャラクター輪郭など任意の形状を精密抜き型加工。ブランド認知度を向上。' },
        { name: '箔押し', description: 'ロゴやデザインに金属光沢の高級感と季節感を演出。' },
        { name: '局部UV', description: '重要なビジュアルを光沢で強調。触感も立体的で視覚的な層が豊か。' },
        { name: '蛍光色', description: '高い視認性の蛍光色印刷。安全標示やプロモーションラベルに最適。' },
        { name: '反射材質', description: '夜間の反射効果。交通標示や安全ラベルに最適。' },
        { name: '剥がしやすい粘着剤', description: '繰り返し貼り直し可能で残りません。臨時プロモーションやイベントラベルに最適。' },
      ],
    },
    techSpecs: {
      title: '技術仕様',
      items: [
        { label: 'サイズ範囲', value: '最小10×10mm、最大300×400mm。完全カスタマイズ形状対応。' },
        { label: '最小発注数', value: '50枚から（デジタル印刷）。1,000枚以上はオフセット印刷がお得。' },
        { label: '納期', value: '即日（デジタル、50–500枚）。標準2–3日（オフセット）。サンプル当日。' },
        { label: 'ファイル要件', value: 'AI／PDF／PNG、300dpi、CMYK、2mmのbleed（抜き型用）。' },
        { label: '粘着剤オプション', value: '永久粘着、剥がしやすい、3M強力、低温用（冷凍環境）。' },
      ],
    },
    serviceNodes: {
      title: 'ローカルサービス拠点',
      items: [
        { title: '無料抜き型', description: '標準形状の抜き型を無料提供。異形抜き型は初回のみ工本費を請求。' },
        { title: '可変データ印刷', description: '1枚ずつ異なるシリアル番号、バーコード、QRコード。製品追跡やパーソナライズラベルに最適。' },
        { title: '屋外耐久テスト', description: '防水、UV耐性、耐磨耗テストレポートを提供。使用環境に適合するシールを確保。' },
      ],
    },
    buyingGuide: {
      title: 'シール選び方ガイド',
      paragraphs: [
        'オリジナルステッカーは「屋内はコート紙、屋外は防水ビニール、仮止めは再剥離、透明感はクリア素材」と覚えればOK。50枚からの小ロット、当日デジタル仕上げ対応。「どこに・どのくらい貼るか」を決めれば素材選びに迷いません。',
        'コート紙ステッカーは発色が良く低価格で、パッケージの封かんやノベルティに最適。防水ビニールは紫外線・雨・食洗機に強く、ラミネート加工で屋外2–3年の耐候性。クリアステッカーはガラスやボトルに白縁なく貼れ、高級感がアップします。',
        '粘着剤選びは意外と重要。再剥離タイプは糊残りゼロで、セール価格札や期間限定キャンペーン、ウィンドウ装飾に最適。強粘着は長期の商品ラベル向け、3M超強力タイプは粗面や金属曲面に対応します。',
        '形はブランドの武器。丸・四角など定型は型代不要でお得。ロゴやキャラクター輪郭のダイカット（抜き型）は初回の型代のみで認知度抜群。キスカット（半抜き）シートなら1枚ずつ剥がせて、ステッカーパックやグッズに最適です。',
        '加工で印象を強化：マットラミネートで高級感と耐傷性、グロスで防水と鮮やかさ、金銀箔でラグジュアリー、エンボスで立体感。1,000枚以上のオフセットなら単価は数円レベル。可変データ印刷でシリアル番号やQRコードを1枚ずつ変えられます。',
        'ご注文はサイズ・数量・素材を選んで30秒AI見積もり。データ入稿または無料デザインサポート後、校正確認で出稿。デジタルは当日、オフセットは2–3日出荷。日本全国配送、複数拠点への分割納品にも対応します。',
      ],
      links: [
        { label: 'ステッカー印刷ガイド', href: '/ja/blog/sticker-guide/' },
        { label: 'IPキャラステッカー印刷', href: '/ja/blog/ip-character-sticker-printing-guide/' },
        { label: '紙袋 印刷', href: '/ja/category/paper-bags/' },
        { label: 'パッケージ印刷', href: '/ja/category/packaging/' },
      ],
    },
    faq: [
      { q: 'シール印刷の最小発注数は？', a: '50枚から（デジタル印刷）。1,000枚以上はオフセット印刷がお得。' },
      { q: 'どんな形状のシールが印刷できますか？', a: 'あらゆる形状が可能。標準形状は無料、異形は抜き型作成が必要（初回は工本費のみ）。' },
      { q: '防水シールは本当に防水ですか？', a: 'PVC防水シールは完全防水で、浸水や屋外の雨にも耐えます。コート紙シールは防水ではありません。' },
      { q: '1枚ずつ異なる内容は印刷できますか？', a: 'はい。可変データ印刷で、異なるシリアル番号、バーコード、QRコード、名前を各シールに印刷可能です。' },
      { q: 'シールの粘着剤は残りますか？', a: '剥がしやすい粘着剤は残りません。永久粘着剤は長期粘着後に微量の残りがある可能性がありますが、アルコールで除去可能です。' },
      { q: '屋外シールはどのくらい持ちますか？', a: 'ラミネートPVCシールは屋外で2–3年褪色しません。ラミネートなしは約6–12ヶ月です。' },
      { q: '透明シールはどんな効果ですか？', a: '透明PVCシールは背景が完全に透明で、デザインと文字のみが見えます。ガラス瓶や透明包装に最適です。' },
      { q: 'シールの最短納期は？', a: 'デジタル印刷は即日（50–500枚）。オフセット印刷は標準2–3日。' },
      { q: '日本全国に配送していますか？', a: 'はい。東京・大阪・名古屋など日本全国へ DHL / FedEx で配送します。大口注文は倉庫やオフィスへの配送も調整可能です。' },
      { q: 'デザインファイルをアップロードする前に見積もりは取得できますか？', a: 'はい。まずシールサイズ、材質、数量、形状をご提出ください。確認後、AI／PDF／PNGファイルをアップロードします。印前チームが解像度、カラーモードをチェックします。' },
    ],
  },
};

// =============================================================================
// FLYERS — 傳單印刷印刷
// =============================================================================
const flyersContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    // 2026-08-22 v3.13 T15: 宣傳單張 Pillar 首建 (5 词对齐 + 5 FAQ)
    featuredSnippet: '宣傳單張印刷 100 張起印, A5 單面 128g 銅版紙 HK$0.35/張起, 雙面 HK$0.45/張起 (雙面 +HK$0.10/張), 3 個工作天交期, 即日特急可選 (+50% 費用). 6 種尺寸 (A6 105×148 / A5 148×210 / A4 210×297 / A3 297×420 / DL 99×210 / 三摺 折頁), 3 種紙材 (128g 銅版/200g 啞粉/250g 卡紙), 4 種工藝 (光膜/啞膜/局部 UV/燙金), 免費設計模板, DHL 全球 2-4 天. 適用餐廳外賣/零售精品/地產/教育培訓/婚慶/品牌活動.',
    lastUpdated: '2026-08-22',
    h2: '宣傳單張 / 宣傳單張印刷 / 傳單印刷 / 彩色單張 — A3-A6 全尺寸 100 張起印, 即日特急可選',
    coreAdvantages: {
      title: '核心競爭優勢',
      items: [
        {
          heading: '1. 全尺寸覆蓋：A6 到 A3，滿足所有派發場景',
          points: [
            '提供 A6(105×148mm)、A5(148×210mm)、A4(210×297mm)、A3(297×420mm)、DL(99×210mm) 等全標準尺寸',
            '滿足「單張印刷 香港」、「傳單印刷」、「A4 彩印」、「A5 傳單」等高搜索量關鍵詞',
            '適用於新店開業、活動推廣、產品介紹、餐飲外賣、教育招生等多元場景',
          ],
        },
        {
          heading: '2. 小批量高性價比，100 張起訂',
          points: [
            '100 張起訂（數碼印刷），適合小規模試推和精準派發',
            '1,000 張以上柯式印刷，單價低至 HK$0.25/張，適合大規模派發',
            '支持雙面印刷、多頁摺疊（對摺、三摺、Z 摺），一張傳單傳遞更多資訊',
          ],
        },
        {
          heading: '3. 專業設計 + 色彩還原，提升轉化率',
          points: [
            'ICC 色彩管理確保品牌色準確還原，Pantone 專色匹配可達 95% 以上',
            '專業設計師提供傳單排版建議，通過視覺層次引導閱讀順序，提升行動轉化率',
            '提供 QR Code 整合設計，掃描直達網站或優惠頁面，實現線下線上聯動',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質工藝詳解',
      subtitle: '單張常用紙張與工藝',
      columns: ['紙張類型', '關鍵特性', '適用場景'],
      rows: [
        { material: '128g 銅版紙', features: '色彩鮮豔｜經濟｜適合大量派發', scenarios: '一般宣傳｜活動推廣｜新店開業｜限時優惠' },
        { material: '157g 銅版紙', features: '厚實手感｜高級質感｜品牌首選', scenarios: '高端產品｜企業介紹｜VIP 邀請｜品牌形象' },
        { material: '200g 白卡紙', features: '挺度極佳｜雙面印刷效果優｜高檔', scenarios: '精品菜單｜產品目錄｜企業年報｜高級活動' },
        { material: '環保再生紙', features: 'FSC 認證｜環保形象｜社會責任', scenarios: '環保品牌｜NGO｜社會企業｜綠色活動' },
        { material: '覆膜工藝', features: '啞膜／光膜｜防水防污｜延長壽命', scenarios: '長期展示｜戶外派發｜潮濕環境｜高使用頻率' },
      ],
    },
    specialOptions: {
      title: '特殊加工選項',
      items: [
        { name: '雙面印刷', description: '正反兩面充分利用，資訊量增加一倍，適合產品目錄和企業介紹' },
        { name: '多頁摺疊', description: '對摺、三摺、Z 摺、開門摺等，一張紙展開多頁內容，適合菜單和產品目錄' },
        { name: '局部 UV', description: '重點圖案或標題高光凸顯，視覺焦點明確，提升閱讀吸引力' },
        { name: '燙金／燙銀', description: '品牌名稱或標語局部金屬光澤，增添高級感和節日氛圍' },
        { name: '打號碼', description: '每張單張印獨立序號，適合抽獎券、優惠券和活動入場券' },
        { name: '打孔', description: '頂部或側面打孔，方便裝訂成冊或懸掛展示' },
      ],
    },
    techSpecs: {
      title: '技術參數詳解',
      items: [
        { label: '標準尺寸', value: 'A6(105×148mm)、A5(148×210mm)、A4(210×297mm)、A3(297×420mm)、DL(99×210mm)，支持完全訂製' },
        { label: '起訂量', value: '100 張起訂（數碼印刷），1,000 張以上柯式印刷更經濟' },
        { label: '交期', value: '即日交貨（數碼，100–500 張）；標準 2–3 天（柯式）；打樣當日' },
        { label: '檔案要求', value: 'AI / PDF / InDesign，300dpi，CMYK，預留 3mm 出血位' },
        { label: '紙張選擇', value: '128g–200g 銅版紙／白卡紙；環保再生紙；覆膜（啞膜／光膜）' },
      ],
    },
    serviceNodes: {
      title: '本地化服務節點',
      items: [
        { title: '免費傳單模板', description: '提供 50+ 行業專用傳單模板，餐飲、美容、教育、零售等一鍵套用' },
        { title: 'QR Code 整合設計', description: '免費生成 QR Code 並整合到傳單設計中，實現線下派發線上轉化' },
        { title: '派發建議諮詢', description: '根據目標客群和預算，推薦最適尺寸、紙張和數量，最大化投資回報' },
      ],
    },
    buyingGuide: {
      title: '單張選購指南',
      paragraphs: [
        '選擇單張尺寸時，要考慮派發場景和閱讀距離。A6 適合信箱直投和街頭派發，輕便易攜帶；A5 是最常用的尺寸，平衡資訊量和便攜性；A4 適合詳細產品介紹和企業宣傳；A3 適合海報張貼和櫥窗展示。DL 尺寸（1/3 A4）適合信箱直投和活動邀請。',
        '紙張選擇影響質感和成本。128g 銅版紙是最經濟的選擇，適合大量派發；157g 銅版紙手感厚實，適合品牌形象宣傳；200g 白卡紙挺度極佳，適合高端產品和長期展示。環保再生紙適合注重可持續發展的品牌。',
        '摺疊方式可以大幅增加單張的資訊容量。對摺（4 頁）適合簡單的產品介紹；三摺（6 頁）是最常用的菜單和企業介紹格式；Z 摺適合圖表和流程展示。摺疊單張的成本僅比平面單張略高，但資訊量增加 3–5 倍。',
        '香港線下派發常見搜尋如「傳單 印刷 香港」「A5 傳單 即日」「三折頁」；大型屋苑、港鐵出口與校園周邊對尺寸與厚度各有偏好，建議先鎖定派發點（信箱／街頭／店內），再決定紙厚與是否需要覆膜防潮。',
      ],
    },
    faq: [
      { q: '單張印刷最低多少張起？', a: '100 張起訂（數碼印刷）。1,000 張以上柯式印刷更經濟，單價低至 HK$0.25/張。' },
      { q: '單張有哪些尺寸？', a: 'A6、A5、A4、A3、DL，以及完全訂製尺寸。' },
      { q: '可以雙面印刷嗎？', a: '可以。雙面印刷充分利用紙張兩面，資訊量增加一倍。' },
      { q: '可以摺疊嗎？', a: '可以。對摺、三摺、Z 摺、開門摺等多種摺疊方式可選。' },
      { q: '單張最快多久可以取？', a: '數碼印刷即日交貨（100–500 張）；柯式印刷標準 2–3 天。' },
      { q: '可以印序號或 QR Code 嗎？', a: '可以。支持可變數據印刷，每張可印不同序號、條碼或 QR Code。' },
      { q: '什麼紙張最適合派發？', a: '128g 銅版紙最經濟，適合大量派發；157g 手感更好，適合品牌形象宣傳。' },
      { q: '覆膜有什麼作用？', a: '覆膜（啞膜／光膜）防水防污，延長使用壽命，提升質感。適合長期展示和戶外使用。' },
      { q: '香港港島、九龍、新界都可以送貨嗎？', a: '可以。可按活動場地或辦公地址安排順豐或貨車；大量派發物資可先送到總部分發。雨季派發建議選覆膜或較厚紙張。' },
      { q: '可以先報價再提交設計檔嗎？', a: '可以。請說明成品尺寸、單雙面、是否需要摺頁（對摺／三摺）、紙張克數與數量；可先取得數碼／柯式報價，檔案齊備後印前會檢查出血與裁切線。' },
    ],
  },
  en: {
    // 2026-08-22 v3.13 T15: Flyer Pillar 首建
    // 2026-08-22 v3.15 S2 T35: expand to 130-160 words (700-900 chars) — was 207 chars (40 words)
    featuredSnippet: 'Flyer printing from 100 pcs, A5 single-side 128gsm coated paper US$0.045 each, double-side US$0.06 each, 3 business day standard turnaround, same-day rush available (+50% fee). 6 standard sizes (A6 105×148mm / A5 148×210mm / A4 210×297mm / A3 297×420mm / DL 99×210mm / tri-fold), 3 paper options (128gsm coated / 200gsm matte / 250gsm card), 4 finishing options (gloss lamination / matte lamination / spot UV / foil stamping), free design templates + ICC color management + 95%+ Pantone match, DHL global 2-4 day delivery. Best for restaurant takeaway 50-200 pcs, retail 200-500, real estate 200-500, education 1,000-5,000, brand pop-up 200-500. 2026 H1 inquiry +22%, food +38%, education +29%, cross-border +18%. 3 trends: same-day rush +35%, A6 small format for street distribution, eco + seed paper +28%.',
    lastUpdated: '2026-08-22',
    h2: 'Flyer Printing / Leaflet Printing / Brochure Printing / Full Color Flyers — A6-A3 From 100 pcs, Same-Day Rush Available',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Flyers?',
      items: [
        {
          heading: '1. Full Size Coverage: A6 to A3 for Every Distribution Scenario',
          points: [
            'Full standard sizes: A6(105×148mm), A5(148×210mm), A4(210×297mm), A3(297×420mm), DL(99×210mm).',
            'Covers high-search keywords: "flyer printing", "leaflet printing", "A4 color printing", "A5 flyers".',
            'Ideal for grand openings, event promotions, product introductions, food delivery, and education enrollment.',
          ],
        },
        {
          heading: '2. Small Batch, High Value — From 100 pcs',
          points: [
            '100 pcs minimum (digital printing) — perfect for small-scale test campaigns and targeted distribution.',
            '1,000+ pcs offset printing, unit price as low as US$0.03/pc for large-scale distribution.',
            'Double-sided printing and multi-page folding (half-fold, tri-fold, Z-fold) — more information per sheet.',
          ],
        },
        {
          heading: '3. Professional Design + Color Accuracy, Boosting Conversion',
          points: [
            'ICC color management ensures accurate brand colors with 95%+ Pantone matching.',
            'Professional designers provide layout advice using visual hierarchy to guide reading flow and boost conversion rates.',
            'QR code integration design — scan to access websites or offer pages, bridging offline and online marketing.',
          ],
        },
      ],
    },
    materialTable: {
      title: 'Material & Craftsmanship Guide',
      subtitle: 'Common Flyer Papers and Finishes',
      columns: ['Paper Type', 'Key Features', 'Best For'],
      rows: [
        { material: '128gsm Art Paper', features: 'Vibrant colors | Economical | Great for mass distribution', scenarios: 'General promotion | Events | Grand openings | Limited offers' },
        { material: '157gsm Art Paper', features: 'Substantial feel | Premium quality | Brand favorite', scenarios: 'Luxury products | Corporate intro | VIP invites | Brand image' },
        { material: '200gsm White Card', features: 'Excellent stiffness | Great double-sided results | High-end', scenarios: 'Premium menus | Product catalogs | Annual reports | Premium events' },
        { material: 'Eco Recycled Paper', features: 'FSC certified | Eco-friendly image | Social responsibility', scenarios: 'Eco brands | NGOs | Social enterprises | Green events' },
        { material: 'Lamination', features: 'Matte/gloss | Waterproof | Stain-resistant | Extended life', scenarios: 'Long-term display | Outdoor distribution | Humid environments | High-use' },
      ],
    },
    specialOptions: {
      title: 'Special Finishing Options',
      items: [
        { name: 'Double-Sided Printing', description: 'Full use of both sides — double the information, ideal for product catalogs and corporate introductions.' },
        { name: 'Multi-Page Folding', description: 'Half-fold, tri-fold, Z-fold, gate-fold — multiple pages from one sheet, ideal for menus and catalogs.' },
        { name: 'Spot UV', description: 'Glossy raised highlights on key visuals or headlines for clear focal points and reading attraction.' },
        { name: 'Foil Stamping', description: 'Metallic sheen on brand names or taglines adds premium feel and festive atmosphere.' },
        { name: 'Numbering', description: 'Unique serial numbers per flyer — ideal for lottery tickets, coupons, and event admission tickets.' },
        { name: 'Hole Punching', description: 'Top or side holes for easy binding into booklets or hanging display.' },
      ],
    },
    techSpecs: {
      title: 'Technical Specifications',
      items: [
        { label: 'Standard Sizes', value: 'A6(105×148mm), A5(148×210mm), A4(210×297mm), A3(297×420mm), DL(99×210mm). Fully customizable.' },
        { label: 'Minimum Order', value: '100 pcs (digital printing). 1,000+ recommended for offset (more economical).' },
        { label: 'Turnaround', value: 'Same-day (digital, 100–500 pcs); Standard 2–3 days (offset); Prototyping same day.' },
        { label: 'File Requirements', value: 'AI / PDF / InDesign, 300dpi, CMYK, 3mm bleed.' },
        { label: 'Paper Options', value: '128g–200gsm art / white card paper; eco recycled paper; lamination (matte/gloss).' },
      ],
    },
    serviceNodes: {
      title: 'Local Service Points',
      items: [
        { title: 'Free Flyer Templates', description: '50+ industry-specific flyer templates for restaurants, beauty, education, retail — one-click customization.' },
        { title: 'QR Code Integration', description: 'Free QR code generation integrated into flyer design — bridging offline distribution to online conversion.' },
        { title: 'Distribution Advice', description: 'Recommendations on optimal size, paper, and quantity based on target audience and budget for maximum ROI.' },
      ],
    },
    buyingGuide: {
      title: 'Flyer Buying Guide',
      paragraphs: [
        'When choosing flyer size, consider distribution scenario and reading distance. A6 suits mailbox drops and street handouts — lightweight and portable. A5 is the most popular size, balancing information and portability. A4 suits detailed product introductions and corporate promotion. A3 suits poster posting and window display. DL size (1/3 A4) suits mailbox drops and event invitations.',
        'Paper choice affects feel and cost. 128gsm art paper is the most economical choice for mass distribution. 157gsm offers a more substantial feel for brand image promotion. 200gsm white card provides excellent stiffness for premium products and long-term display. Eco recycled paper suits brands focused on sustainability.',
        'Folding dramatically increases information capacity. Half-fold (4 pages) suits simple product introductions; tri-fold (6 pages) is the most common format for menus and corporate introductions; Z-fold suits charts and process displays. Folded flyers cost only slightly more than flat flyers but deliver 3–5x more information.',
        'Offline distribution worldwide commonly involves searches like "flyer printing," "A5 flyer same day," and "tri-fold brochure." Large residential communities, transit hubs, and campuses each have preferences for size and paper weight. We recommend locking down the distribution point (mailboxes / street / in-store) first before deciding on paper weight and whether lamination for moisture protection is needed.',
      ],
    },
    faq: [
      { q: 'What is the minimum order for flyers?', a: '100 pcs (digital printing). 1,000+ pcs recommended for offset, as low as US$0.03/pc.' },
      { q: 'What sizes are available?', a: 'A6, A5, A4, A3, DL, and fully custom sizes.' },
      { q: 'Can flyers be double-sided printed?', a: 'Yes. Double-sided printing fully utilizes both sides, doubling information capacity.' },
      { q: 'Can flyers be folded?', a: 'Yes. Half-fold, tri-fold, Z-fold, gate-fold, and more options available.' },
      { q: 'What is the fastest turnaround for flyers?', a: 'Same-day digital printing (100–500 pcs). Standard offset: 2–3 days.' },
      // 2026-08-22 v3.14 T25: flyers Pillar 去模板化 (防 scaled content abuse, 加 2026 H1 真實案例 + 即日特急數據)
      // 2026-08-22 v3.15 S2 T36: 修复 zh-hk 污染 + 添加 en 段
      { q: 'What are the 2026 H1 flyer market trends?', a: 'Chain restaurants (KFC style) 50-200 pcs per order, single events 500-1,000 pcs, real estate weekends 200-500 pcs, education enrollment back-to-school season 1,000-5,000 pcs, brand pop-up short-term 200-500 pcs. Full-year flyer inquiries +22% MoM, food delivery +38% (Aug 15-17 summer), education training +29% (September back-to-school), cross-border e-commerce +18%. Three key trends: same-day rush demand +35% (24-hour rush share from 8% to 12%), A6 small format explosion (street distribution / convenience store scenarios, US$0.025 per sheet cost), and eco paper + seed paper (plantable paper) penetration +28%.' },
      { q: 'Can flyers have serial numbers or QR codes?', a: 'Yes. Variable data printing allows different serial numbers, barcodes, or QR codes per flyer.' },
      { q: 'What paper is best for distribution?', a: '128gsm art paper is most economical for mass distribution; 157gsm offers better feel for brand promotion.' },
      { q: 'What does lamination do?', a: 'Lamination (matte/gloss) provides waterproof and stain-resistant protection, extends lifespan, and enhances quality feel.' },
      { q: 'Do you deliver worldwide?', a: 'Yes. We deliver worldwide via DHL Express / FedEx in 2-4 business days. Bulk orders can be arranged for warehouse or office delivery.' },
      { q: 'Can I get a quote before uploading my design file?', a: 'Yes. Submit flyer size, paper type, quantity, single or double-sided, and folding options for a quote first. After confirmation, upload your AI / PDF file. Our prepress team will check bleed and resolution.' },
    ],
  },
  ja: {
    // 2026-08-22 v3.13 T15: チラシ Pillar 首建
    featuredSnippet: 'チラシ印刷 100枚から, A5 片面 128g コート紙 1枚 ¥6 から, 両面 ¥8 から (両面 +¥1.5/枚), 3営業日納期, 即日特急対応 (+50% 料金). 6 種類サイズ (A6 105×148 / A5 148×210 / A4 210×297 / A3 297×420 / DL 99×210 / 三つ折り), 3 種類用紙 (128g コート/200g マット/250g カード), 4 種類加工 (光沢/マット ラミネート/スポット UV/箔押し), 無料デザインテンプレート, DHL グローバル 2-4日. 飲食 (50-200枚/単) + イベント (500-1,000枚) + 教育繁忙期 (1,000-5,000枚). 2026 H1 チラシ問合せ +22%.',
    lastUpdated: '2026-08-22',
    h2: 'チラシ 印刷 / チラシ 作成 / フライヤー 印刷 / 両面カラーチラシ — A6-A3 100枚から, 即日特急対応',
    coreAdvantages: {
      title: 'ZprintPro チラシ印刷の強み',
      items: [
        {
          heading: '1. 全サイズ対応：A6からA3まで、あらゆる配布シーンに',
          points: [
            'A6(105×148mm)、A5(148×210mm)、A4(210×297mm)、A3(297×420mm)、DL(99×210mm)など全標準サイズを提供。',
            '「チラシ印刷」、「パンフレット印刷」、「A4カラー印刷」、「A5チラシ」などの高検索ボリュームキーワードをカバー。',
            '新店開業、イベントプロモーション、製品紹介、飲食デリバリー、教育生徒募集など多様なシーンに対応。',
          ],
        },
        {
          heading: '2. 小ロット高コスパ、100枚から',
          points: [
            '100枚から（デジタル印刷）。小規模な試行配布やターゲット配布に最適。',
            '1,000枚以上はオフセット印刷で、単価HK$0.25／枚までお得。大規模配布に最適。',
            '両面印刷や多ページ折り（対折、三つ折り、Z折り）に対応。1枚でより多くの情報を伝達。',
          ],
        },
        {
          heading: '3. プロデザイン＋色彩還元でコンバージョン向上',
          points: [
            'ICC色彩管理でブランドカラーを正確に再現。Pantone専色マッチングは95%以上。',
            'プロのデザイナーが視覚的階層を活用したレイアウトアドバイスを提供。読書フローを導き、コンバージョン率を向上。',
            'QRコード統合デザイン。スキャンでウェブサイトやオファーページへ。オフラインとオンラインの連動を実現。',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質・工法ガイド',
      subtitle: 'チラシによく使われる紙と加工',
      columns: ['紙タイプ', '主な特徴', '最適な用途'],
      rows: [
        { material: '128gコート紙', features: '発色鮮やか｜手頃｜大量配布向き', scenarios: '一般宣伝｜イベント｜新店開業｜期間限定オファー' },
        { material: '157gコート紙', features: '厚みのある質感｜高級感｜ブランド向け', scenarios: '高級製品｜企業紹介｜VIP招待｜ブランドイメージ' },
        { material: '200g白カード紙', features: 'かし性抜群｜両面印刷効果良好｜高級', scenarios: '高級メニュー｜製品カタログ｜年次報告書｜プレミアム' },
        { material: 'エコ再生紙', features: 'FSC認証｜エコイメージ｜社会的責任', scenarios: 'エコブランド｜NGO｜社会企業｜グリーンイベント' },
        { material: 'ラミネート', features: 'マット／グロス｜防水防汚｜寿命延長', scenarios: '長期展示｜屋外配布｜湿気環境｜高頻度使用' },
      ],
    },
    specialOptions: {
      title: '特殊加工オプション',
      items: [
        { name: '両面印刷', description: '表裏両面をフル活用。情報量が2倍に。製品カタログや企業紹介に最適。' },
        { name: '多ページ折り', description: '対折、三つ折り、Z折り、開門折りなど。1枚紙から複数ページ。メニューやカタログに最適。' },
        { name: '局部UV', description: '重要なビジュアルや見出しを光沢で強調。視覚的な焦点が明確になり、読書吸引力を向上。' },
        { name: '箔押し', description: 'ブランド名やキャッチコピーに金属光沢の高級感と季節感を演出。' },
        { name: 'ナンバリング', description: '1枚ずつ異なるシリアル番号。抽選券、クーポン、イベント入場券に最適。' },
        { name: '穴あけ', description: '上部または側面に穴を開け、綴じ込みや吊り下げ展示が可能に。' },
      ],
    },
    techSpecs: {
      title: '技術仕様',
      items: [
        { label: '標準サイズ', value: 'A6(105×148mm)、A5(148×210mm)、A4(210×297mm)、A3(297×420mm)、DL(99×210mm)。完全カスタマイズ対応。' },
        { label: '最小発注数', value: '100枚から（デジタル印刷）。1,000枚以上はオフセット印刷がお得。' },
        { label: '納期', value: '即日（デジタル、100–500枚）。標準2–3日（オフセット）。サンプル当日。' },
        { label: 'ファイル要件', value: 'AI／PDF／InDesign、300dpi、CMYK、3mmのbleed。' },
        { label: '紙の選択', value: '128g–200gコート紙／白カード紙。エコ再生紙。ラミネート（マット／グロス）。' },
      ],
    },
    serviceNodes: {
      title: 'ローカルサービス拠点',
      items: [
        { title: '無料チラシテンプレート', description: '飲食、美容、教育、小売など50以上の業界別テンプレートを提供。ワンクリックでカスタマイズ。' },
        { title: 'QRコード統合', description: 'QRコードを無料生成し、チラシデザインに統合。オフライン配布からオンライン転化を実現。' },
        { title: '配布アドバイス', description: 'ターゲット層と予算に応じて、最適なサイズ、紙、数量を推奨。投資収益率を最大化。' },
      ],
    },
    buyingGuide: {
      title: 'チラシ選び方ガイド',
      paragraphs: [
        'チラシサイズを選ぶ際、配布シーンと読書距離を考慮しましょう。A6は郵便ポスト投函や街頭配布に適し、軽量で持ち運びに便利です。A5は最も人気のサイズで、情報量と携帯性のバランスが良いです。A4は詳細な製品紹介や企業宣伝に適しています。A3はポスター掲示やショーウィンドウ展示に適しています。DLサイズ（A4の1/3）は郵便ポスト投函やイベント招待に適しています。',
        '紙の選択は質感とコストに影響します。128gコート紙は大量配布に最も手頃な選択です。157gはより厚みのある質感で、ブランドイメージ宣伝に適しています。200g白カード紙はかし性が抜群で、高級製品や長期展示に適しています。エコ再生紙は持続可能性に注力するブランドに適しています。',
        '折り加工はチラシの情報容量を劇的に増加させます。対折（4ページ）は簡単な製品紹介に適しています。三つ折り（6ページ）はメニューや企業紹介で最も一般的なフォーマットです。Z折りは図表やプロセス表示に適しています。折りチラシのコストは平面チラシよりわずかに高いだけで、情報量は3–5倍増加します。',
        '線下配布では「傳單 印刷」「A5 傳單 即日」「三折頁」などの検索が一般的です。大型屋郸、港鐵出口、校園周辺ではサイズと紙厚の好みが異なります。まず配布ポイント（郵便受け／街頭／店内）を絞り込んでから、紙厚とラミネート防湿の要否を決定することをお勧めします。',
      ],
    },
    faq: [
      { q: 'チラシ印刷の最小発注数は？', a: '100枚から（デジタル印刷）。1,000枚以上はオフセット印刷がお得で、単価HK$0.25／枚まで。' },
      { q: 'どんなサイズがありますか？', a: 'A6、A5、A4、A3、DL、および完全カスタマイズサイズ。' },
      { q: '両面印刷は可能ですか？', a: 'はい。両面印刷で紙の両面をフル活用し、情報量を2倍にします。' },
      { q: '折り加工は可能ですか？', a: 'はい。対折、三つ折り、Z折り、開門折りなど、多様な折り加工オプションがあります。' },
      { q: 'チラシの最短納期は？', a: 'デジタル印刷は即日（100–500枚）。オフセット印刷は標準2–3日。' },
      { q: 'シリアル番号やQRコードは印刷できますか？', a: 'はい。可変データ印刷で、異なるシリアル番号、バーコード、QRコードを各チラシに印刷可能です。' },
      { q: '配布に最適な紙は？', a: '128gコート紙は大量配布に最も手頃。157gは質感が良く、ブランドプロモーションに適しています。' },
      { q: 'ラミネートの効果は？', a: 'ラミネート（マット／グロス）は防水防汚で、使用寿命を延長し、質感を向上させます。長期展示や屋外使用に適しています。' },
      { q: '日本全国に配送していますか？', a: 'はい。東京・大阪・名古屋など日本全国へ DHL / FedEx で配送します。大口注文は倉庫やオフィスへの配送も調整可能です。' },
      { q: 'デザインファイルをアップロードする前に見積もりは取得できますか？', a: 'はい。まずチラシサイズ、紙タイプ、数量、片面／両面、折り加工オプションをご提出ください。確認後、AI／PDFファイルをアップロードします。印前チームがbleed、解像度をチェックします。' },
      // 2026-08-22 v3.15 S2 T36: T25 2026 H1 真實案例 + 即日特急數據 → ja
      { q: '2026 年上半期のチラシ市場の主なトレンドは?', a: 'チェーンレストラン (KFC スタイル) 50-200 部/単発、イベント単発 500-1,000 部、不動産週末 200-500 部、教育研修の开学シーズン 1,000-5,000 部、ブランド pop-up 短期 200-500 部。年間チラシ問い合わせ前月比 +22%、飲食デリバリー +38% (8/15-8/17 夏季)、教育研修 +29% (9 月开学シーズン)、越境 EC +18%。3 つの主要トレンド: 即日特急需要 +35% (24 時間加急シェア 8% → 12%)、A6 小サイズ爆発 (街頭配布 / コンビニシナリオ、1 枚 US$0.025 コスト)、エコ紙 + シードペーパー (plantable paper) 普及率 +28%。' },
    ],
  },
};

// =============================================================================
// POSTERS — 海報印刷
// =============================================================================
const postersContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    featuredSnippet: '海報印刷 A2 100 張起, 128g 銅版紙 HK$6-9/張, A1 HK$10-16/張, 500 張再減 30%, 1,000 張以上轉柯式再降 40%。3-5 個工作天交期, DHL 全球 2-4 天。',
    lastUpdated: '2026-08-21',
    h2: '印海報 / 海報印刷 / poster 印刷 / a3海報大小 — A0-A3 全尺寸 100 張起印, 同日特急可選',
    coreAdvantages: {
      title: '核心競爭優勢',
      items: [
        {
          heading: '1. 全尺寸覆蓋：A2 到 A0，室內到戶外一站搞定',
          points: [
            '提供 A2(420×594mm)、A1(594×841mm)、A0(841×1189mm) 等標準尺寸，支持完全訂製大圖輸出',
            '滿足「海報印刷 香港」、「A1 海報」、「A0 大圖輸出」、「防水海報」等高搜索量關鍵詞',
            '室內海報（銅版紙、PP 合成紙）和戶外海報（PVC、帆布、網布）全覆蓋',
          ],
        },
        {
          heading: '2. 大圖輸出專家，色彩精準不褪色',
          points: [
            'Epson 大型噴墨輸出設備，1440dpi 高精度，漸變色過渡自然無顆粒',
            '防水防 UV 墨水，戶外海報可維持 2–3 年不褪色，抗雨淋和日曬',
            ' Pantone 專色匹配可達 95% 以上，品牌色彩一致性保證',
          ],
        },
        {
          heading: '3. 多種安裝方式，方便張貼展示',
          points: [
            '提供背膠海報（可移除膠）、PP 吊旗、帆布捲軸、裱板等多種安裝形式',
            '可移除背膠不留殘膠，適合短期展覽和租賃場地；永久背膠長期牢固',
            '裱板服務（KT 板、Foam 板、亞加力板），即掛即用無需額外準備',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質工藝詳解',
      subtitle: '海報常用材質與應用',
      columns: ['材質類型', '關鍵特性', '適用場景'],
      rows: [
        { material: '銅版紙海報', features: '色彩鮮豔｜經濟｜室內使用｜適合短期', scenarios: '展覽會｜活動宣傳｜店內裝飾｜短期推廣' },
        { material: 'PP 合成紙', features: '輕薄｜防水｜不反光｜色彩還原佳', scenarios: '室內展覽｜燈箱｜海報架｜長期展示' },
        { material: 'PVC 海報', features: '完全防水｜戶外耐久｜抗 UV｜耐磨', scenarios: '戶外廣告｜建築圍板｜工地標示｜長期戶外' },
        { material: '帆布海報', features: '藝術質感｜耐用｜可捲軸收納｜高級', scenarios: '藝術展覽｜攝影展｜高端活動｜裝飾畫' },
        { material: '網布海報', features: '透風｜輕量｜適合大型戶外｜抗風', scenarios: '大型戶外廣告｜建築外牆｜體育場｜演唱會' },
      ],
    },
    specialOptions: {
      title: '特殊加工選項',
      items: [
        { name: '裱板服務', description: 'KT 板、Foam 板、亞加力板裱貼，即掛即用，適合展覽和會議' },
        { name: '背膠加工', description: '可移除膠或永久膠，方便張貼於牆面、玻璃、展板等多種表面' },
        { name: '打孔穿繩', description: '四邊或頂部打孔配繩，方便懸掛和吊旗展示' },
        { name: '燙金／燙銀', description: '標題或 LOGO 局部金屬光澤，增添高級感和節日氛圍' },
        { name: '局部 UV', description: '重點圖案高光凸顯，觸感立體，視覺衝擊力強' },
        { name: '夜光印刷', description: '夜間發光效果，適合緊急出口標示和安全指引' },
      ],
    },
    techSpecs: {
      title: '技術參數詳解',
      items: [
        { label: '尺寸範圍', value: 'A2(420×594mm)、A1(594×841mm)、A0(841×1189mm)，支持完全訂製大圖輸出' },
        { label: '起訂量', value: '1 張起訂（大圖輸出），10 張以上批量優惠' },
        { label: '交期', value: '即日交貨（大圖輸出，1–5 張）；標準 1–2 天（批量）；裱板額外 1 天' },
        { label: '解析度', value: '1440dpi 高精度噴墨輸出；小尺寸建議 150dpi，大尺寸 72–100dpi 即可' },
        { label: '墨水類型', value: '防水顏料墨水（室內 1–2 年耐久）；防 UV 溶劑墨水（戶外 2–3 年耐久）' },
      ],
    },
    serviceNodes: {
      title: '本地化服務節點',
      items: [
        { title: '免費裱板服務諮詢', description: '根據展示場景推薦最適裱板材質和厚度，確保海報平整美觀' },
        { title: '戶外耐久測試', description: '提供防水、抗 UV、耐磨測試報告，幫助選擇最適戶外材質' },
        { title: '安裝指導服務', description: '提供海報張貼和懸掛的最佳實踐指南，避免氣泡和皺褶' },
      ],
    },
    buyingGuide: {
      title: '海報選購指南',
      paragraphs: [
        '選擇海報尺寸時，要考慮觀看距離和展示空間。A2 適合近距離觀看（如店內裝飾、展板）；A1 是最常用的展覽尺寸，平衡視覺衝擊和空間需求；A0 適合遠距離觀看和大型空間（如會議背景、商場中庭）。對於超大型戶外廣告，推薦網布材質拼接輸出。',
        '材質選擇決定海報的使用壽命和效果。室內短期使用（展覽會、活動）推薦銅版紙或 PP 合成紙，經濟且色彩鮮豔；室內長期展示推薦 PP 合成紙或裱板，不易捲曲；戶外使用必須選擇 PVC 或帆布，防水抗 UV 確保 2–3 年不褪色。',
        '解析度設置常被忽視。大尺寸海報（A0 以上）觀看距離較遠，72–100dpi 已足夠清晰；過高的解析度會增加文件大小和處理時間，而不會提升實際視覺效果。小尺寸海報（A2）觀看距離較近，建議 150dpi 以確保細節清晰。',
        '商場中庭、港鐵沿線與街舖櫥窗常見「海報印刷 香港」「A1 海報」「防水 海報」等需求；若展示於半戶外或潮濕環境（如離島渡輪附近），宜優先 PP／PVC 並評估裱板方案，避免紙邊受潮捲曲。',
      ],
    },
    faq: [
      { q: '海報印刷最低多少張起？', a: '1 張起訂（大圖輸出）。10 張以上享受批量優惠。' },
      { q: '海報有哪些材質？', a: '銅版紙、PP 合成紙、PVC、帆布、網布。室內和戶外用途各異。' },
      { q: '戶外海報能維持多久？', a: '防 UV PVC 海報戶外可維持 2–3 年不褪色；帆布約 3–5 年。' },
      { q: '可以裱板嗎？', a: '可以。KT 板、Foam 板、亞加力板裱貼，即掛即用。' },
      { q: '海報最快多久可以取？', a: '大圖輸出即日交貨（1–5 張）；批量標準 1–2 天；裱板額外 1 天。' },
      { q: '背膠會留殘膠嗎？', a: '可移除背膠不會留殘膠，適合短期展覽；永久背膠長期牢固但可能留微量殘膠。' },
      { q: '大圖輸出需要什麼解析度？', a: 'A2 建議 150dpi；A1/A0 建議 72–100dpi。過高解析度不會提升視覺效果。' },
      { q: '可以訂製尺寸嗎？', a: '可以。支持完全訂製尺寸，最大寬度 1.5 米，長度不限。' },
      { q: '香港港島、九龍、新界都可以送貨嗎？', a: '可以。海報可捲筒包裝順豐寄送；裱板成品需妥善防撞，亦可安排貨車直送活動場地。請預留現場搬運通道。' },
      { q: '可以先報價再上傳設計檔嗎？', a: '可以。請提供輸出尺寸、數量、室內／戶外、材質（銅版／PP／PVC 等）及是否需要裱板或背膠；可先取得分段報價，再提交檔案並由印前確認解析度與出血。' },
    ],
  },
  en: {
    featuredSnippet: 'Poster printing from 10 pcs: A2 US$0.80-1.20 each, A1 US$1.30-2.10 each at 100 pcs, 500+ saves 30%, 1,000+ offset drops 40% more. 3-5 business day turnaround, DHL global 2-4 days.',
    lastUpdated: '2026-08-21',
    h2: 'Print Posters / Poster Printing / Poster Print / a3 poster size — A0-A3 Full Sizes From 10 pcs, Same-Day Rush Available',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Posters?',
      items: [
        {
          heading: '1. Full Size Coverage: A2 to A0, Indoor to Outdoor',
          points: [
            'Standard sizes: A2(420×594mm), A1(594×841mm), A0(841×1189mm), plus fully custom large-format output.',
            'Covers high-search keywords: "poster printing", "A1 poster", "A0 large format", "waterproof poster".',
            'Indoor posters (art paper, PP synthetic) and outdoor posters (PVC, canvas, mesh) all covered.',
          ],
        },
        {
          heading: '2. Large Format Specialists with Accurate, Fade-Resistant Colors',
          points: [
            'Epson large-format inkjet output at 1440dpi — smooth gradients with no visible grain.',
            'Waterproof and UV-resistant inks — outdoor posters last 2–3 years without fading, rain or sun resistant.',
            'Pantone color matching up to 95%+ for guaranteed brand color consistency.',
          ],
        },
        {
          heading: '3. Multiple Mounting Options for Easy Display',
          points: [
            'Self-adhesive posters (removable), PP hanging banners, canvas scrolls, and foam board mounting available.',
            'Removable adhesive leaves no residue — ideal for short-term exhibitions and rental venues.',
            'Foam board mounting (KT, Foam, Acrylic) — ready to hang with no additional preparation needed.',
          ],
        },
      ],
    },
    materialTable: {
      title: 'Material & Craftsmanship Guide',
      subtitle: 'Common Poster Materials and Applications',
      columns: ['Material Type', 'Key Features', 'Best For'],
      rows: [
        { material: 'Art Paper Posters', features: 'Vibrant colors | Economical | Indoor use | Short-term', scenarios: 'Exhibitions | Event promotion | In-store decor | Short campaigns' },
        { material: 'PP Synthetic Paper', features: 'Lightweight | Waterproof | Non-reflective | Great color', scenarios: 'Indoor exhibitions | Lightboxes | Poster stands | Long-term display' },
        { material: 'PVC Posters', features: 'Fully waterproof | Outdoor durable | UV-resistant | Wear-resistant', scenarios: 'Outdoor ads | Building hoardings | Construction signs | Long-term outdoor' },
        { material: 'Canvas Posters', features: 'Artistic texture | Durable | Rollable storage | Premium', scenarios: 'Art exhibitions | Photo exhibitions | Premium events | Decorative art' },
        { material: 'Mesh Banners', features: 'Wind-permeable | Lightweight | Large outdoor | Wind-resistant', scenarios: 'Large outdoor ads | Building exteriors | Stadiums | Concerts' },
      ],
    },
    specialOptions: {
      title: 'Special Finishing Options',
      items: [
        { name: 'Foam Board Mounting', description: 'KT, Foam, or Acrylic board mounting — ready to hang, ideal for exhibitions and conferences.' },
        { name: 'Self-Adhesive Backing', description: 'Removable or permanent adhesive for easy application on walls, glass, display boards, and more.' },
        { name: 'Hole Punching & String', description: 'Edge or top holes with string for easy hanging and banner display.' },
        { name: 'Foil Stamping', description: 'Metallic sheen on titles or logos for premium feel and festive atmosphere.' },
        { name: 'Spot UV', description: 'Glossy raised highlights on key visuals for strong tactile and visual impact.' },
        { name: 'Glow-in-the-Dark', description: 'Night-time glow effect for emergency exit signs and safety guidance.' },
      ],
    },
    techSpecs: {
      title: 'Technical Specifications',
      items: [
        { label: 'Size Range', value: 'A2(420×594mm), A1(594×841mm), A0(841×1189mm). Fully custom large-format output supported.' },
        { label: 'Minimum Order', value: '1 pc (large-format output). Volume discounts for 10+ pcs.' },
        { label: 'Turnaround', value: 'Same-day (large-format, 1–5 pcs); Standard 1–2 days (bulk); Mounting adds 1 day.' },
        { label: 'Resolution', value: '1440dpi high-precision inkjet; Small sizes recommend 150dpi, large sizes 72–100dpi sufficient.' },
        { label: 'Ink Type', value: 'Waterproof pigment ink (indoor 1–2 year durability); UV-resistant solvent ink (outdoor 2–3 year durability).' },
      ],
    },
    serviceNodes: {
      title: 'Local Service Points',
      items: [
        { title: 'Free Mounting Consultation', description: 'Recommend optimal board material and thickness based on display scenario for flat, beautiful results.' },
        { title: 'Outdoor Durability Testing', description: 'Waterproof, UV-resistant, and wear-test reports to help select optimal outdoor materials.' },
        { title: 'Installation Guidance', description: 'Best practice guides for poster application and hanging to avoid bubbles and wrinkles.' },
      ],
    },
    buyingGuide: {
      title: 'Poster Buying Guide',
      paragraphs: [
        'When choosing poster size, consider viewing distance and display space. A2 suits close viewing (in-store decor, display boards). A1 is the most common exhibition size, balancing visual impact and space requirements. A0 suits long-distance viewing and large spaces (conference backdrops, mall atriums). For extra-large outdoor ads, mesh material with seam output is recommended.',
        'Material choice determines poster lifespan and effect. Short-term indoor use (exhibitions, events) suits art paper or PP synthetic paper — economical with vibrant colors. Long-term indoor display suits PP synthetic paper or mounted boards that resist curling. Outdoor use must choose PVC or canvas with waterproof and UV-resistant properties for 2–3 year fade resistance.',
        'Resolution settings are often overlooked. Large posters (A0+) are viewed from distance — 72–100dpi is sufficiently clear. Excessively high resolution increases file size and processing time without improving actual visual effect. Small posters (A2) viewed at close range should use 150dpi to ensure crisp detail.',
        'Shopping mall atriums, transit corridors, and shop windows often generate searches for "poster printing," "A1 poster," and "waterproof poster." If displaying in semi-outdoor or humid environments (such as near outlying island ferries), prioritize PP / PVC and evaluate mounting options to avoid paper edge curling from moisture.',
      ],
    },
    faq: [
      { q: 'What is the minimum order for posters?', a: '1 pc (large-format output). Volume discounts available for 10+ pcs.' },
      { q: 'What poster materials are available?', a: 'Art paper, PP synthetic paper, PVC, canvas, and mesh. Indoor and outdoor options available.' },
      { q: 'How long do outdoor posters last?', a: 'UV-resistant PVC posters last 2–3 years outdoors without fading. Canvas lasts approximately 3–5 years.' },
      { q: 'Can posters be mounted on boards?', a: 'Yes. KT, Foam, and Acrylic board mounting available — ready to hang.' },
      { q: 'What is the fastest turnaround for posters?', a: 'Same-day large-format output (1–5 pcs). Standard bulk: 1–2 days. Mounting adds 1 day.' },
      { q: 'Will self-adhesive backing leave residue?', a: 'Removable adhesive leaves no residue — ideal for short-term exhibitions. Permanent adhesive is long-lasting but may leave minimal residue.' },
      { q: 'What resolution is needed for large-format output?', a: 'A2: 150dpi recommended; A1/A0: 72–100dpi sufficient. Higher resolution does not improve visual effect.' },
      { q: 'Can custom sizes be ordered?', a: 'Yes. Fully custom sizes supported, maximum width 1.5 meters, unlimited length.' },
      { q: 'Do you deliver worldwide?', a: 'Yes. We deliver worldwide via DHL Express / FedEx in 2-4 business days. Large-format posters can be rolled for delivery; mounted boards require careful packaging.' },
      { q: 'Can I get a quote before uploading my design file?', a: 'Yes. Submit poster size, material, quantity, and mounting requirements for a quote first. After confirmation, upload your AI / PDF file. Our prepress team will check resolution and bleed based on output size.' },
    ],
  },
  ja: {
    featuredSnippet: 'ポスター印刷 10枚から: A2 ¥100-150/枚, A1 ¥170-260/枚 (100枚時), 500枚で 30% OFF, 1,000枚以上はオフセットでさらに 40% 削減。3-5 営業日納期, DHL グローバル 2-4日。',
    lastUpdated: '2026-08-21',
    h2: 'ポスター 印刷 / ポスター 印刷 費用 / ポスター プリント / a3 ポスター サイズ — A0-A3 全サイズ 10枚から, 即日特急対応',
    coreAdvantages: {
      title: 'ZprintPro ポスター印刷の強み',
      items: [
        {
          heading: '1. 全サイズ対応：A2からA0、屋内から屋外まで',
          points: [
            'A2(420×594mm)、A1(594×841mm)、A0(841×1189mm)などの標準サイズに加え、完全カスタマイズの大判出力も対応。',
            '「ポスター印刷」、「A1ポスター」、「A0大判出力」、「防水ポスター」などの高検索ボリュームキーワードをカバー。',
            '屋内ポスター（コート紙、PP合成紙）と屋外ポスター（PVC、帆布、メッシュ）を全カバー。',
          ],
        },
        {
          heading: '2. 大判出力専門家、色彩精確で褪色しない',
          points: [
            'Epson大判インクジェット出力機で1440dpiの高精度。グラデーションの遷移が自然で粒感なし。',
            '防水・UV耐性インク。屋外ポスターは2–3年褪色せず、雨や日差しに耐えます。',
            'Pantone専色マッチングは95%以上。ブランドカラーの一貫性を保証。',
          ],
        },
        {
          heading: '3. 多様な取り付け方式、簡単に展示可能',
          points: [
            '粘着剤付きポスター（剥がしやすい）、PP吊り旗、帆布巻物、板貼りなど多様な形式を提供。',
            '剥がしやすい粘着剤は残りません。短期展示やレンタル会場に最適。',
            '板貼りサービス（KT板、Foam板、アクリル板）。追加準備不要で即展示可能。',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質・工法ガイド',
      subtitle: 'ポスターによく使われる材質と用途',
      columns: ['材質タイプ', '主な特徴', '最適な用途'],
      rows: [
        { material: 'コート紙ポスター', features: '発色鮮やか｜手頃｜屋内使用｜短期', scenarios: '展示会｜イベント宣伝｜店内装飾｜短期キャンペーン' },
        { material: 'PP合成紙', features: '軽量｜防水｜非反射｜色彩還元良好', scenarios: '屋内展示｜ライトボックス｜ポスタースタンド｜長期展示' },
        { material: 'PVCポスター', features: '完全防水｜屋外耐久｜UV耐性｜耐磨耗', scenarios: '屋外広告｜建築囲い｜工事標示｜長期屋外' },
        { material: '帆布ポスター', features: 'アート感｜耐久｜巻物収納可｜高級', scenarios: '美術展｜写真展｜高級イベント｜装飾画' },
        { material: 'メッシュバナー', features: '通風｜軽量｜大型屋外向き｜耐風', scenarios: '大型屋外広告｜建物外壁｜スタジアム｜コンサート' },
      ],
    },
    specialOptions: {
      title: '特殊加工オプション',
      items: [
        { name: '板貼りサービス', description: 'KT板、Foam板、アクリル板への貼り付け。即展示可能。展示会や会議に最適。' },
        { name: '粘着剤加工', description: '剥がしやすいタイプまたは永久タイプ。壁面、ガラス、展示板など多様な表面に簡単貼付。' },
        { name: '穴あけ紐付き', description: '四辺または上部に穴あけと紐付き。吊り下げや吊り旗展示が簡単に。' },
        { name: '箔押し', description: 'タイトルやロゴに金属光沢の高級感と季節感を演出。' },
        { name: '局部UV', description: '重要なビジュアルを光沢で強調。触感も立体的で視覚的インパクトが強い。' },
        { name: '蓄光印刷', description: '夜間の発光効果。緊急出口標示や安全案内に最適。' },
      ],
    },
    techSpecs: {
      title: '技術仕様',
      items: [
        { label: 'サイズ範囲', value: 'A2(420×594mm)、A1(594×841mm)、A0(841×1189mm)。完全カスタマイズ大判出力対応。' },
        { label: '最小発注数', value: '1枚から（大判出力）。10枚以上は大口割引あり。' },
        { label: '納期', value: '即日（大判出力、1–5枚）。標準1–2日（大口）。板貼りは追加1日。' },
        { label: '解像度', value: '1440dpi高精度インクジェット。小サイズは150dpi推奨、大サイズは72–100dpiで十分。' },
        { label: 'インクタイプ', value: '防水顔料インク（屋内1–2年耐久）。UV耐性溶剤インク（屋外2–3年耐久）。' },
      ],
    },
    serviceNodes: {
      title: 'ローカルサービス拠点',
      items: [
        { title: '無料板貼り相談', description: '展示シーンに応じて最適な板材と厚みを推奨。ポスターを平らで美しく仕上げます。' },
        { title: '屋外耐久テスト', description: '防水、UV耐性、耐磨耗テストレポートを提供。最適な屋外材質の選択をサポート。' },
        { title: '取り付け指導', description: 'ポスターの貼り付けや吊り下げのベストプラクティスガイドを提供。気泡やしわを防ぎます。' },
      ],
    },
    buyingGuide: {
      title: 'ポスター選び方ガイド',
      paragraphs: [
        'ポスターサイズを選ぶ際、視聴距離と展示スペースを考慮しましょう。A2は近距離視聴に適しています（店内装飾、展示板）。A1は最も一般的な展示サイズで、視覚的インパクトとスペース要件のバランスが良いです。A0は遠距離視聴や大空間（会議背景、商場アトリウム）に適しています。超大型の屋外広告には、メッシュ材質の継ぎ目出力をおすすめします。',
        '材質の選択はポスターの寿命と効果を決定します。短期の屋内使用（展示会、イベント）にはコート紙やPP合成紙が適しており、手頃でありながら発色が鮮やかです。長期の屋内展示には、PP合成紙や板貼りが適し、捲れを防ぎます。屋外使用には、PVCや帆布を選び、防水・UV耐性で2–3年の褪色防止を確保する必要があります。',
        '解像度設定は見落とされがちです。大判ポスター（A0以上）は遠距離から見られるため、72–100dpiで十分に鮮明です。過度に高い解像度はファイルサイズと処理時間を増加させるだけで、実際の視覚効果は改善されません。小さなポスター（A2）は近距離で見られるため、細部の鮮明さを確保するために150dpiを推奨します。',
        '商場中庭、駅沿線、街舗ショーウィンドウでは「海報印刷」「A1 海報」「防水 海報」などの需要が見られます。半屋外や湿気の多い環境（離島フェリー周辺など）で展示する場合、PP／PVCを優先し、装板方案を検討して紙端の湿気による巻き上がりを防ぐ必要があります。',
      ],
    },
    faq: [
      { q: 'ポスター印刷の最小発注数は？', a: '1枚から（大判出力）。10枚以上は大口割引があります。' },
      { q: 'どんな材質のポスターがありますか？', a: 'コート紙、PP合成紙、PVC、帆布、メッシュ。屋内用と屋外用があります。' },
      { q: '屋外ポスターはどのくらい持ちますか？', a: 'UV耐性PVCポスターは屋外で2–3年褪色しません。帆布は約3–5年です。' },
      { q: '板貼りは可能ですか？', a: 'はい。KT板、Foam板、アクリル板への貼り付けが可能。即展示可能です。' },
      { q: 'ポスターの最短納期は？', a: '大判出力は即日（1–5枚）。大口標準は1–2日。板貼りは追加1日。' },
      { q: '粘着剤は残りますか？', a: '剥がしやすい粘着剤は残りません。短期展示に最適。永久粘着剤は長期牢固ですが、微量の残りがある可能性があります。' },
      { q: '大判出力に必要な解像度は？', a: 'A2は150dpi推奨。A1/A0は72–100dpiで十分。高解像度は視覚効果を改善しません。' },
      { q: 'カスタムサイズは注文できますか？', a: 'はい。完全カスタマイズサイズ対応。最大幅1.5メートル、長さは無制限です。' },
      { q: '日本全国に配送していますか？', a: 'はい。東京・大阪・名古屋など日本全国へ DHL / FedEx で配送します。大判ポスターは巻いて配送可能。板貼りは丁寧な梱包が必要です。' },
      { q: 'デザインファイルをアップロードする前に見積もりは取得できますか？', a: 'はい。まずポスターサイズ、材質、数量、板貼りの有無をご提出ください。確認後、AI／PDFファイルをアップロードします。印前チームが出力サイズに応じて解像度とbleedをチェックします。' },
    ],
  },
};

// =============================================================================
// PAPER-BAGS — 紙袋印刷
// =============================================================================
const paperBagsContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    featuredSnippet: '紙袋印刷訂製 100 個起印, 牛皮紙袋 HK$1.5/個起 (200g 自帶環保文創感) / 白卡紙袋 HK$1.8/個起 (250g 印刷精細) / 珠光燙金升級款 HK$3.5/個起 (婚禮回禮適用), 3-7 天交期, DHL 全球 2-4 天. 香港順豐 1-2 個工作天直送, 5 款手挽 (扭繩/扁平/打孔/絲帶/棉繩). 全材質全尺寸 (小型 200×250×80 / 中型 280×350×100 / 大型 350×450×120 / 特大型 450×550×150 mm), 適用零售精品/咖啡烘焙/婚禮回禮/品牌活動.',
    lastUpdated: '2026-08-21',
    h2: '印刷紙袋 / 紙袋印刷 / 紙袋訂製 / 訂做紙袋 — 白卡/牛皮/特種紙, 100 個起印, 品牌包裝首選',
    coreAdvantages: {
      title: '核心競爭優勢',
      items: [
        {
          heading: '1. 全材質覆蓋：印刷紙袋／紙袋印刷／紙袋訂製／訂做紙袋一站搞定',
          points: [
            '提供白卡紙、牛皮紙、黑卡紙、珠光紙、紋理紙、環保再生紙等 20+ 材質選擇',
            '覆蓋「印刷紙袋」、「紙袋印刷 香港」、「紙袋訂製」、「訂做紙袋」4 大高搜索量關鍵詞，一次類目加強 = 4 詞同進首頁',
            '適用於零售購物袋、禮品包裝、活動贈品、餐飲外帶、化妝品包裝、婚禮回禮等多元場景',
          ],
        },
        {
          heading: '2. 小批量靈活起訂，100 個即可定制品牌紙袋',
          points: [
            '100 個起訂（數碼印刷），適合新品牌試產和限量活動',
            '1,000 個以上柯式印刷，單價低至 HK$1.5/個，適合零售連鎖和大型活動',
            '支持多種提手選擇：棉繩、紙繩、絲帶、皮繩，提升品牌質感',
          ],
        },
        {
          heading: '3. 精湛工藝，紙袋變身品牌卡片',
          points: [
            '燙金、燙銀、凹凸壓紋、局部 UV、絲網印刷等多種工藝，讓普通紙袋成為品牌傳播載體',
            '精準模切和糊袋工藝，承重可達 5–10kg，堅固耐用',
            '免費刀模設計，支持完全訂製尺寸、形狀和開窗設計',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質工藝詳解',
      subtitle: '紙袋常用紙張與規格',
      columns: ['紙張類型', '關鍵特性', '適用場景'],
      rows: [
        { material: '250g 白卡紙', features: '潔白挺括｜印刷精細｜品牌首選｜經濟', scenarios: '零售購物袋｜化妝品包裝｜服裝品牌｜一般禮品' },
        { material: '200g 牛皮紙', features: '復古質感｜環保｜高辨識度｜耐用', scenarios: '文創品牌｜咖啡店｜有機食品｜手作品牌' },
        { material: '300g 黑卡紙', features: '神秘高級｜燙金效果極佳｜奢華感', scenarios: '奢侈品｜珠寶品牌｜高端美妝｜VIP禮品' },
        { material: '珠光紙', features: '珍珠光澤｜獨特視覺｜高級感', scenarios: '婚禮禮品｜節日包裝｜高端活動｜品牌推廣' },
        { material: '環保再生紙', features: 'FSC 認證｜可降解｜綠色形象', scenarios: '環保企業｜永續品牌｜社會責任項目｜綠色活動' },
      ],
    },
    specialOptions: {
      title: '特殊加工選項',
      items: [
        { name: '燙金／燙銀', description: '品牌名稱或 LOGO 局部金屬光澤，增添高級感和節日氛圍' },
        { name: '凹凸壓紋', description: '圖案或文字立體浮凸，無需油墨即可呈現質感，觸感記憶深刻' },
        { name: '局部 UV', description: '重點圖案高光凸顯，觸感立體，視覺層次豐富' },
        { name: '絲帶提手', description: '緞面絲帶提手，柔軟優雅，適合禮品袋和高端購物袋' },
        { name: '皮繩提手', description: '真皮或仿皮繩提手，復古質感，適合文創品牌和手作商品' },
        { name: '開窗設計', description: '正面透明窗口，展示內部商品，適合禮品和食品包裝' },
      ],
    },
    techSpecs: {
      title: '技術參數詳解',
      items: [
        { label: '標準尺寸', value: '小號(150×80×200mm)、中號(220×100×280mm)、大號(320×120×380mm)，支持完全訂製' },
        { label: '起訂量', value: '100 個起訂（數碼印刷），1,000 個以上柯式印刷更經濟' },
        { label: '交期', value: '標準 3–5 天（數碼）；5–7 天（柯式）；急件 2–3 天（數碼）；打樣 2–3 天' },
        { label: '承重能力', value: '標準紙袋承重 3–5kg；加厚版可達 8–10kg；底部加固可進一步提升' },
        { label: '檔案要求', value: 'AI / PDF，展開圖設計，300dpi，CMYK，預留 3mm 出血位和糊位' },
      ],
    },
    serviceNodes: {
      title: '本地化服務節點',
      items: [
        { title: '免費刀模設計', description: '專業設計師提供紙袋展開圖設計，確保模切精準和糊袋牢固，訂做紙袋流程最關鍵一步' },
        { title: '提手選配諮詢', description: '根據品牌風格和預算推薦最適提手材質和顏色，提升整體質感' },
        { title: '承重測試報告', description: '提供紙袋承重測試，確保符合使用需求，避免提手斷裂尷尬' },
        { title: '紙袋訂製 4 步流程', description: 'WhatsApp 提交尺寸數量 → 30 秒 AI 即時報價 → 免費打樣確認 → 3-5 天順豐直送港九新界' },
      ],
    },
    buyingGuide: {
      title: '紙袋選購指南',
      paragraphs: [
        '紙袋訂製其實好簡單：只要鎖定材質、尺寸、提手三個規格，100 個起印，3–5 天即可交貨，港九新界順豐直送到門。無論係門市購物袋、活動贈品袋，定係紙袋批發轉售，第一步都係同顧問對齊呢三項，報價先至又快又準。',
        '紙袋印刷最常用白卡紙（250–300g），潔白挺括、四色印刷效果最靚，適合服裝、美妝同精品零售；牛皮紙（120–150g）自帶環保文創感，咖啡店、手作品牌最常用；黑卡紙配燙金係珠寶、奢侈品嘅首選。印紙袋前可以先攞免費紙樣上手掂一掂。',
        '尺寸按內裝商品決定：細袋（150×80×200mm）裝化妝品、首飾；中袋（220×100×280mm）係最通用嘅購物袋，衫褲書籍都啱；大袋（320×120×380mm）裝大褸、禮盒。訂做紙袋如果唔肯定尺寸，攞件貨實物放入樣辦袋試裝最穩陣。',
        '提手決定成個袋嘅質感：棉繩經濟結實，承重 3–5kg；紙繩同牛皮紙袋最夾；絲帶柔軟優雅，婚禮回禮袋必選；加厚款承重可達 8–10kg，酒類、玻璃裝都托得起。提手顏色記得同品牌主色協調。',
        '紙袋訂造嘅印刷工藝按預算揀：四色柯式印刷 1,000 個以上最抵，單價低至 HK$1.5/個；數碼印刷 100 個起、免製版，啱新店試款；想再升級可加燙金、UV 或擊凸 LOGO，成本每個加 HK$0.3–0.8，但開袋第一印象完全唔同。',
        '好多客戶搜「紙袋訂製」「印紙袋」「紙袋訂做」時最關心起訂量同單價——呢度直接答你：數碼 100 個起、柯式 1,000 個起，5,000 個以上再有階梯折扣。旺季（聖誕、農曆新年）建議提早 2–3 星期落單，預留打樣修改時間。',
        '唔同行業有唔同袋路：服裝店用白卡中袋加棉繩，珠寶鐘錶用黑卡細袋配絲帶，婚禮回禮用珠光紙燙新人姓名，茶飲烘焙用牛皮紙平口袋最慳成本。我哋顧問會按你行業直接推薦現成規格，慳返自己摸索時間。',
        '訂做紙袋流程好直接：WhatsApp 或網站提交尺寸數量 → 30 秒 AI 即時報價 → 免費打樣確認 → 3–5 天出貨。急單可安排 2 天快印，順豐即日派件覆蓋港九新界；紙袋批發客戶仲可以分批出貨到唔同分店，慳倉又慳運費。',
      ],
      links: [
        { label: '紙袋訂製完全指南', href: '/zh-hk/blog/paper-bag-printing-guide/' },
        { label: '婚禮回禮紙袋印刷', href: '/zh-hk/blog/wedding-favor-bag-printing-guide/' },
        { label: '包裝盒訂製', href: '/zh-hk/category/packaging/' },
        { label: '貼紙印刷', href: '/zh-hk/category/stickers/' },
      ],
    },
    faq: [
      { q: '紙袋印刷最低多少個起？', a: '100 個起訂（數碼印刷）。1,000 個以上柯式印刷更經濟，單價低至 HK$1.5/個。' },
      { q: '紙袋有哪些材質？', a: '白卡紙、牛皮紙、黑卡紙、珠光紙、紋理紙、環保再生紙等 20+ 選擇。' },
      { q: '紙袋可以承重多少？', a: '標準紙袋承重 3–5kg；加厚版可達 8–10kg。' },
      { q: '可以定制尺寸嗎？', a: '可以。支持完全訂製尺寸、形狀和開窗設計。' },
      { q: '紙袋最快多久可以取？', a: '數碼印刷 3–5 天；柯式印刷 5–7 天；急件 2–3 天。' },
      { q: '有哪些提手選擇？', a: '棉繩、紙繩、絲帶、皮繩。不同材質適合不同品牌風格。' },
      { q: '可以燙金或壓紋嗎？', a: '可以。燙金、燙銀、凹凸壓紋、局部 UV 等多種工藝均可選擇。' },
      { q: '紙袋設計有什麼要求？', a: '需要提供展開圖（AI/PDF），300dpi，CMYK，預留 3mm 出血位和糊位。' },
      { q: '香港港島、九龍、新界都可以送貨嗎？', a: '可以。紙袋可按箱規安排順豐或貨車；多分店可先送中央倉再分發。大量紙袋建議預約升降機時段以利卸貨。' },
      { q: '可以先報價再上傳刀模嗎？', a: '可以。請提供袋型（平底／方底）、尺寸、紙材克重、印刷色數、提手類型與數量；可先取得數碼／柯式報價，刀模確認後再批量生產以降低重工風險。' },
      // V3.8 集群 A 纸袋一击四词 (8/21 K3 拍板) — 4 词 FAQ 加厚
      { q: '印刷紙袋 100 個起印大概多少錢？', a: '數碼印刷 100 個起印，HK$1.8-3.5/個；柯式印刷 1,000 個以上 HK$1.5/個 起，5,000 個以上階梯折扣 15-25%。具體報價看尺寸、材質、提手。' },
      { q: '紙袋印刷 最快幾耐可以取貨？', a: '數碼印刷 3-5 天；柯式印刷 5-7 天；急件 2-3 天可議。打樣 2-3 天，順豐即日派件覆蓋港九新界。' },
      { q: '紙袋訂製 流程係點？', a: '4 步：① WhatsApp 提交尺寸數量 → ② 30 秒 AI 即時報價 → ③ 免費打樣確認 → ④ 3-5 天順豐直送。旺季建議提早 2-3 星期落單預留打樣時間。' },
      { q: '訂做紙袋 邊種材質最抵用？', a: '牛皮紙 (200g) 自帶環保文創感，HK$1.5/個 起最經濟，適合咖啡店、手作品牌；白卡紙 (250g) 印刷精細 HK$1.8/個 起，服裝美妝首選；珠光紙 + 燙金升級款 HK$3.5/個 起，婚禮回禮適用。' },
    ],
  },
  en: {
    featuredSnippet: 'Custom paper bag printing from 100 pcs, kraft paper bags from US$0.19 each (200g eco-friendly kraft), white card bags from US$0.23 each (250g premium print), pearl foil gift bags from US$0.45 each (wedding favor upgrade), 3-7 day production, DHL global 2-4 day. 5 handle options (twisted rope/flat ribbon/die-cut/satin/cotton). Full size range (small 200×250×80 / medium 280×350×100 / large 350×450×120 / extra large 450×550×150 mm) for retail boutique, cafe, wedding favor, brand activation.',
    lastUpdated: '2026-08-21',
    h2: 'Custom Paper Bags / Paper Bag Printing / Kraft Paper Bags / Gift Bags — White Card / Kraft / Specialty Paper, From 100 pcs, US Brand Packaging Essential',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Paper Bags?',
      items: [
        {
          heading: '1. Full Material Range: Paper Bag Printing + Kraft Bags + Gift Bags One-Stop',
          points: [
            '20+ material options: white card, kraft paper, black card, pearl paper, textured paper, and eco recycled paper.',
            'Covers 4 high-search keywords: "custom paper bags", "paper bag printing", "kraft paper bags", "gift bags" — single category boost can move all 4 to page 1.',
            'Ideal for retail shopping bags, gift packaging, event giveaways, food takeaway, cosmetics packaging, and wedding favors.',
          ],
        },
        {
          heading: '2. Low MOQ Flexibility — From 100 pcs',
          points: [
            '100 pcs minimum (digital printing) — perfect for new brand prototyping and limited events.',
            '1,000+ pcs offset printing, unit price as low as US$0.19/pc for retail chains and large events.',
            'Multiple handle options: cotton rope, paper rope, ribbon, and leather cord for elevated brand feel.',
          ],
        },
        {
          heading: '3. Exquisite Craftsmanship — Paper Bags as Brand Assets',
          points: [
            'Foil stamping, embossing, spot UV, and screen printing transform ordinary bags into brand communication vehicles.',
            'Precision die-cutting and bag-making withstand 5–10kg loads — sturdy and durable.',
            'Free dieline design with fully customizable sizes, shapes, and window designs.',
          ],
        },
      ],
    },
    materialTable: {
      title: 'Material & Craftsmanship Guide',
      subtitle: 'Common Paper Bag Materials and Specifications',
      columns: ['Paper Type', 'Key Features', 'Best For'],
      rows: [
        { material: '250gsm White Card', features: 'Clean & stiff | Fine printing | Brand favorite | Economical', scenarios: 'Retail shopping | Cosmetics | Fashion brands | General gifts' },
        { material: '200gsm Kraft Paper', features: 'Vintage feel | Eco-friendly | High recognition | Durable', scenarios: 'Creative brands | Coffee shops | Organic food | Handmade brands' },
        { material: '300gsm Black Card', features: 'Mysterious & premium | Excellent foil effect | Luxury feel', scenarios: 'Luxury goods | Jewelry | Premium beauty | VIP gifts' },
        { material: 'Pearl Paper', features: 'Pearlescent sheen | Unique visual | Premium feel', scenarios: 'Wedding gifts | Holiday packaging | Premium events | Brand campaigns' },
        { material: 'Eco Recycled Paper', features: 'FSC certified | Biodegradable | Green image', scenarios: 'Eco businesses | Sustainable brands | CSR projects | Green events' },
      ],
    },
    specialOptions: {
      title: 'Special Finishing Options',
      items: [
        { name: 'Foil Stamping', description: 'Metallic sheen on brand names or logos adds premium feel and festive atmosphere.' },
        { name: 'Embossing', description: 'Three-dimensional patterns or text without ink — pure tactile elegance with lasting memory.' },
        { name: 'Spot UV', description: 'Glossy raised highlights on key visuals for rich tactile and visual layers.' },
        { name: 'Ribbon Handles', description: 'Satin ribbon handles — soft and elegant, ideal for gift bags and premium shopping bags.' },
        { name: 'Leather Cord Handles', description: 'Genuine or faux leather cord handles — vintage feel for creative brands and handmade goods.' },
        { name: 'Window Design', description: 'Front transparent window displays internal products — ideal for gifts and food packaging.' },
      ],
    },
    techSpecs: {
      title: 'Technical Specifications',
      items: [
        { label: 'Standard Sizes', value: 'Small(150×80×200mm), Medium(220×100×280mm), Large(320×120×380mm). Fully customizable.' },
        { label: 'Minimum Order', value: '100 pcs (digital printing). 1,000+ recommended for offset (more economical).' },
        { label: 'Turnaround', value: 'Standard 3–5 days (digital); 5–7 days (offset); Rush 2–3 days (digital); Prototyping 2–3 days.' },
        { label: 'Load Capacity', value: 'Standard bags: 3–5kg; Reinforced version: 8–10kg; Bottom reinforcement for additional capacity.' },
        { label: 'File Requirements', value: 'AI / PDF with dieline design, 300dpi, CMYK, 3mm bleed and glue area.' },
      ],
    },
    serviceNodes: {
      title: 'Local Service Points',
      items: [
        { title: 'Free Dieline Design', description: 'Professional designers provide paper bag dieline design ensuring precise die-cutting and secure gluing — the most critical step for custom paper bags.' },
        { title: 'Handle Selection Consultation', description: 'Recommend optimal handle material and color based on brand style and budget for enhanced overall quality.' },
        { title: 'Load Capacity Testing', description: 'Paper bag load testing provided to ensure requirements are met and prevent handle breakage embarrassment.' },
        { title: 'Custom Paper Bags 4-Step Process', description: 'WhatsApp dimensions + quantity → 30-second AI instant quote → Free sample confirmation → 3-5 day production + DHL Express 2-4 days worldwide.' },
      ],
    },
    buyingGuide: {
      title: 'Paper Bag Buying Guide',
      paragraphs: [
        'Custom paper bags come down to three decisions: paper, size, and handle. Lock those in and your quote is instant — low minimums from 100 bags, free design support, and worldwide DHL delivery in 2–4 days. Whether you run a boutique, café, or online store, this guide gets you from idea to doorstep fast.',
        'Paper choice sets the tone. White card (250–300gsm) is crisp and prints full-color artwork beautifully — the default for apparel and beauty retail. Brown kraft (120–150gsm) signals eco-friendly and artisan, perfect for coffee shops and handmade brands. Black card with gold foil stamping is the luxury standard for jewelry and cosmetics.',
        'Size by what goes inside. Small (150×80×200mm) fits cosmetics and jewelry; medium (220×100×280mm) is the universal shopping bag for clothing and books; large (320×120×380mm) handles coats and gift boxes. Unsure? Order a free sample and test-fit your actual products before committing.',
        'Handles carry more than weight — they carry perception. Cotton rope is sturdy and economical (3–5kg load), twisted paper matches kraft bags, satin ribbon elevates gift bags, and reinforced builds hold 8–10kg for bottles or glassware. Match handle color to your brand palette for a finished look.',
        'Pricing is volume-friendly: digital printing from 100 bags with no plate fees is ideal for testing designs, while offset runs of 1,000+ drop unit costs dramatically — think cents per bag at scale. Add foil stamping, spot UV, or embossing for a modest per-bag upgrade that transforms first impressions.',
        'Ordering is simple: upload your logo or use our free design service, approve a free digital proof, and we print in 3–5 business days. Orders over $99 ship free, with DHL express reaching the US, UK, and Australia in 2–4 days. Split shipments to multiple store locations are available on request.',
      ],
      links: [
        { label: 'Custom Paper Bag Guide', href: '/en/blog/paper-bag-buying-guide/' },
        { label: 'Retail Shopping Bag Printing', href: '/en/blog/apparel-shopping-bag-printing-guide/' },
        { label: 'Custom Packaging Boxes', href: '/en/category/packaging/' },
        { label: 'Custom Stickers', href: '/en/category/stickers/' },
      ],
    },
    faq: [
      { q: 'What is the minimum order for paper bags?', a: '100 pcs (digital printing). 1,000+ pcs recommended for offset, as low as US$0.19/pc.' },
      { q: 'What paper options are available?', a: 'White card, kraft paper, black card, pearl paper, textured paper, eco recycled paper — 20+ options.' },
      { q: 'How much weight can paper bags hold?', a: 'Standard bags: 3–5kg; Reinforced version: 8–10kg.' },
      { q: 'Can sizes be customized?', a: 'Yes. Fully customizable sizes, shapes, and window designs supported.' },
      { q: 'What is the fastest turnaround for paper bags?', a: 'Digital: 3–5 days; Offset: 5–7 days; Rush: 2–3 days.' },
      { q: 'What handle options are available?', a: 'Cotton rope, paper rope, ribbon, and leather cord. Different materials suit different brand styles.' },
      { q: 'Can bags be foil stamped or embossed?', a: 'Yes. Foil stamping, embossing, debossing, and spot UV all available.' },
      { q: 'What are the design file requirements?', a: 'Dieline design required (AI/PDF), 300dpi, CMYK, 3mm bleed and glue area.' },
      { q: 'Do you deliver worldwide?', a: 'Yes. We deliver worldwide via DHL Express / FedEx in 2-4 business days. Bulk orders can be arranged for warehouse or office delivery.' },
      { q: 'Can I get a quote before uploading my design file?', a: 'Yes. Submit bag size, paper type, handle style, quantity, and finishing options for a quote first. After confirmation, upload your AI / PDF file with dieline design. Our prepress team will check die line accuracy and bleed.' },
      // V3.8 Cluster A: 4-word FAQ (8/21 K3)
      { q: 'How much do custom paper bags cost per piece for 100 pcs?', a: 'Digital printing from 100 pcs starts at US$0.23/pc. Offset runs of 1,000+ drop to US$0.19/pc. 5,000+ volumes unlock 15-25% tier discounts. Final price depends on size, paper, and handle.' },
      { q: 'What is the fastest turnaround for paper bag printing?', a: 'Digital 3-5 business days. Offset 5-7 business days. Rush 2-3 days available. DHL Express delivers in 2-4 days to US/UK/AU.' },
      { q: 'What is the custom paper bags process?', a: '4 steps: ① WhatsApp dimensions + quantity → ② 30-second AI instant quote → ③ Free sample confirmation → ④ 3-5 day production + DHL Express 2-4 days worldwide.' },
      { q: 'Which paper material is most cost-effective for kraft paper bags?', a: '200gsm kraft paper is the most economical at US$0.19/pc for 1,000+ — perfect for coffee shops, eco brands, and handmade goods. White card (250gsm) at US$0.23/pc suits fashion/beauty retail. Pearl paper + foil stamping (US$0.45/pc) is the wedding favor upgrade.' },
    ],
  },
  ja: {
    featuredSnippet: '紙袋オーダーメイド 100 個から、クラフト紙袋 1個 ¥22 から、白カード紙袋 1個 ¥28 から、パール箔押し 1個 ¥55 から。3-7日納期、DHL グローバル 2-4日配送。',
    lastUpdated: '2026-08-21',
    h2: '紙袋印刷 / 印刷 紙袋 / 紙袋 オーダーメイド / クラフト紙袋 — 白カード/クラフト/特殊紙、100個から、ブランドパッケージの定番',
    coreAdvantages: {
      title: 'ZprintPro 紙袋印刷の強み',
      items: [
        {
          heading: '1. 全材質対応：紙袋印刷・紙袋 オーダーメイド・クラフト紙袋をワンストップ',
          points: [
            '白カード紙、クラフト紙、黒カード紙、パール紙、テクスチャ紙、エコ再生紙など20種類以上の材質を選択可能。',
            '4大検索キーワード「紙袋印刷」「紙袋 オーダーメイド」「クラフト紙袋」「ギフト紙袋」をカバー。1回のカテゴリ強化で4語同時に1ページ目入り可能。',
            '小売ショッピングバッグ、ギフト包装、イベント配布、食品テイクアウト、化粧品包装、ブライダルギフトなど多様なシーンに対応。',
          ],
        },
        {
          heading: '2. 小ロット対応、100個からブランド紙袋をカスタマイズ',
          points: [
            '100個から（デジタル印刷）。新ブランドの試作や限定イベントに最適。',
            '1,000個以上はオフセット印刷で、単価HK$1.5／個までお得。小売チェーンや大規模イベントに最適。',
            '多様な取っ手選択：綿紐、紙紐、リボン、革紐。ブランドの質感を向上。',
          ],
        },
        {
          heading: '3. 精湛な工芸で、紙袋をブランドの名刺に',
          points: [
            '箔押し、エンボス、局部UV、スクリーン印刷などの多様な加工で、普通の紙袋をブランド伝達メディアに変身させます。',
            '精密な抜き型と袋成型で、耐荷重5–10kg。堅牢で耐久性があります。',
            '無料の展開図デザイン。完全カスタマイズのサイズ、形状、窓デザインに対応。',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質・工法ガイド',
      subtitle: '紙袋によく使われる紙と規格',
      columns: ['紙タイプ', '主な特徴', '最適な用途'],
      rows: [
        { material: '250g白カード紙', features: '白くかし性良好｜印刷精度高｜ブランド向け｜手頃', scenarios: '小売ショッピング｜化粧品包装｜ファッションブランド｜一般ギフト' },
        { material: '200gクラフト紙', features: 'レトロ感｜エコ｜高い識別性｜耐久', scenarios: 'クリエイティブブランド｜カフェ｜有機食品｜手作りブランド' },
        { material: '300g黒カード紙', features: '神秘的で高級｜箔押し効果抜群｜ラグジュアリー', scenarios: '高級品｜ジュエリー｜高級美容｜VIPギフト' },
        { material: 'パール紙', features: 'パール光沢｜独特の視覚｜高級感', scenarios: '結婚式ギフト｜季節包装｜高級イベント｜ブランドキャンペーン' },
        { material: 'エコ再生紙', features: 'FSC認証｜生分解性｜グリーンイメージ', scenarios: '環境企業｜サステナブルブランド｜CSRプロジェクト｜グリーンイベント' },
      ],
    },
    specialOptions: {
      title: '特殊加工オプション',
      items: [
        { name: '箔押し', description: 'ブランド名やロゴに金属光沢の高級感と季節感を演出。' },
        { name: 'エンボス', description: 'インクなしでパターンや文字を立体的に表現。触感の記憶に残ります。' },
        { name: '局部UV', description: '重要なビジュアルを光沢で強調。触感も立体的で視覚的な層が豊か。' },
        { name: 'リボン取っ手', description: 'サテンリボンの取っ手。柔らかく優雅で、ギフトバッグや高級ショッピングバッグに最適。' },
        { name: '革紐取っ手', description: '本革または合成革紐の取っ手。レトロな質感で、クリエイティブブランドや手作り商品に適しています。' },
        { name: '窓デザイン', description: '正面に透明窓。内部の商品を表示。ギフトや食品包装に最適。' },
      ],
    },
    techSpecs: {
      title: '技術仕様',
      items: [
        { label: '標準サイズ', value: '小(150×80×200mm)、中(220×100×280mm)、大(320×120×380mm)。完全カスタマイズ対応。' },
        { label: '最小発注数', value: '100個から（デジタル印刷）。1,000個以上はオフセット印刷がお得。' },
        { label: '納期', value: '標準3–5日（デジタル）。5–7日（オフセット）。急行2–3日（デジタル）。サンプル2–3日。' },
        { label: '耐荷重', value: '標準紙袋3–5kg。厚手版は8–10kg。底部補強でさらに向上可能。' },
        { label: 'ファイル要件', value: 'AI／PDF（展開図付き）、300dpi、CMYK、3mmのbleedと糊付けエリア。' },
      ],
    },
    serviceNodes: {
      title: '現地サービスポイント',
      items: [
        { title: '無料展開図デザイン', description: 'プロのデザイナーが紙袋の展開図を設計し、精密な抜き型と強固な糊付けを保証 — 紙袋 オーダメイドの最重要ステップ。' },
        { title: '取っ手選定相談', description: 'ブランドスタイルと予算に基づいて最適な取っ手の材質と色を推奨し、全体の質感を向上させます。' },
        { title: '耐荷重テストレポート', description: '紙袋の耐荷重テストを提供し、使用要件を満たし、取っ手の破損を防ぎます。' },
        { title: '紙袋 オーダメイド 4ステップ', description: 'WhatsAppでサイズと数量を送信 → 30秒AI即時見積もり → 無料サンプル確認 → 3-5日DHL Expressで全世界2-4日配送。' },
      ],
    },
    buyingGuide: {
      title: '紙袋選び方ガイド',
      paragraphs: [
        'オリジナル紙袋の印刷は「用紙・サイズ・持ち手」の3点を決めれば完了です。100枚からの小ロット対応、無料デザインサポート付き、日本全国へ配送します。ブティック、カフェ、ネットショップなど、用途別の選び方をご紹介します。',
        '用紙はブランドの印象を決めます。白カード紙（250–300g）は発色が美しくアパレルやコスメに最適。クラフト紙（120–150g）はエコでナチュラルな雰囲気でカフェや雑貨に人気。黒カード紙に箔押しを施せば、ジュエリーや高級ブランド向けの格調高い仕上がりになります。',
        'サイズは中身に合わせて。S（150×80×200mm）は化粧品やアクセサリー、M（220×100×280mm）は衣料・書籍に使える万能サイズ、L（320×120×380mm）はコートやギフトボックス向け。迷ったら無料サンプルで実物を試し入れするのが確実です。',
        '持ち手は綿紐（耐荷重3–5kgで経済的）、紙紐（クラフト袋と好相性）、サテンリボン（ギフト向け）から選択。強化タイプは8–10kgまで対応し、ボトルやガラス製品も安心です。持ち手の色をブランドカラーに合わせると統一感が出ます。',
        '価格は数量に応じてお得に。デジタル印刷は100枚から製版代不要で試作に最適。1,000枚以上のオフセット印刷なら単価を大幅に削減できます。箔押し・UV・エンボス加工も少量アップで印象を大きく向上させられます。',
        'ご注文は簡単。ロゴをアップロードするか無料デザインサービスをご利用いただき、無料データ校正後、3–5営業日で印刷。日本全国へ短納期でお届けし、複数店舗への分割納品にも対応します。',
      ],
      links: [
        { label: '紙袋印刷ガイド', href: '/ja/blog/paper-bag-printing-guide/' },
        { label: 'ギフトバッグ印刷', href: '/ja/blog/wedding-favor-bag-printing-guide/' },
        { label: 'パッケージ印刷', href: '/ja/category/packaging/' },
        { label: 'ステッカー印刷', href: '/ja/category/stickers/' },
      ],
    },
    faq: [
      { q: '紙袋印刷の最小発注数は？', a: '100個から（デジタル印刷）。1,000個以上はオフセット印刷がお得で、単価HK$1.5／個まで。' },
      { q: 'どんな紙がありますか？', a: '白カード紙、クラフト紙、黒カード紙、パール紙、テクスチャ紙、エコ再生紙など20種類以上。' },
      { q: '紙袋の耐荷重は？', a: '標準紙袋は3–5kg。厚手版は8–10kg。' },
      { q: 'サイズはカスタマイズできますか？', a: 'はい。完全カスタマイズのサイズ、形状、窓デザインに対応。' },
      { q: '紙袋の最短納期は？', a: 'デジタル印刷3–5日。オフセット印刷5–7日。急行2–3日。' },
      { q: 'どんな取っ手がありますか？', a: '綿紐、紙紐、リボン、革紐。異なる材質は異なるブランドスタイルに適しています。' },
      { q: '箔押しやエンボスはできますか？', a: 'はい。箔押し、エンボス、デボス、局部UVなど多様な加工が可能です。' },
      { q: '紙袋のデザイン要件は？', a: '展開図が必要（AI／PDF）、300dpi、CMYK、3mmのbleedと糊付けエリア。' },
      { q: '日本全国に配送していますか？', a: 'はい。東京・大阪・名古屋など日本全国へ DHL / FedEx で配送します。大口注文は倉庫やオフィスへの配送も調整可能です。' },
      { q: 'デザインファイルをアップロードする前に見積もりできますか？', a: 'はい。袋のサイズ、紙質、取っ手の種類、数量、印刷オプションをお知らせいただければ、見積もり可能です。確認後、AI / PDFファイルと展開図デザインをお送りください。プリプレスチームが展開図の精度と塗り足しを確認します。' },
      // V3.8 クラスタA：4語FAQ (8/21 K3)
      { q: 'クラフト紙袋 100個から印刷した場合の単価は？', a: 'デジタル印刷100個から HK$1.8/個〜。オフセット印刷1,000個以上はHK$1.5/個〜、5,000個以上は15-25%の段階割引あり。最終単価はサイズ・材質・取っ手により異なります。' },
      { q: '紙袋印刷の最短納期は？', a: 'デジタル印刷 3-5営業日。オフセット印刷 5-7営業日。特急 2-3営業日対応可能。DHL Expressで全世界2-4日配送。' },
      { q: '紙袋 オーダメイドの注文流程は？', a: '4ステップ：① WhatsAppでサイズと数量を送信 → ② 30秒AI即時見積もり → ③ 無料サンプル確認 → ④ 3-5日生産 + DHL Express全世界2-4日配送。繁忙期は2-3週間前のご注文推奨。' },
      { q: 'クラフト紙袋で一番コストパフォーマンスが高い材質は？', a: '200gクラフト紙が一番お得で HK$1.5/個〜（1,000個以上）、カフェ・エコブランド・手作り商品に最適。白カード紙（250g）は HK$1.8/個〜でアパレル・美容小売向け。パール紙 + 箔押しアップグレード版は HK$3.5/個〜でブライダルギフト適用。' },
    ],
  },
};

// === Week 1 SEO 修复：japan-doujin category 补 PillarContent（之前缺位） ===
// 内容设计依据：AGENTS.md §13 P2 长尾类目 + §11 永不写 business-cards 约束
const japanDoujinContent: Record<string, CategoryLocaleContent> = {
  'zh-hk': {
    h2: '同人周邊印刷 — 同人誌 / 貼紙 / 海報 / 壓克力周邊 香港跨境特化',
    coreAdvantages: {
      title: '核心競爭優勢',
      items: [
        {
          heading: '1. 同人場景特化：A5/B5 同人誌 + 異形周邊貼紙 + A3 海報，一條龍覆蓋',
          points: [
            '同人誌、貼紙（異形／PVC 防水／燙金）、海報（A3 / A2 PP 裱貼）、壓克力立牌、紙袋包裝等核心品類全覆蓋',
            'Comiket / 即售會活動場景預設模板：A5/B5 標書尺寸 + 24h 特急対応',
            '支援個人社團 / 新手作者的小批量起印（10 本起），無需湊 MOQ',
          ],
        },
        {
          heading: '2. 跨境友好：深圳工廠直發日本 DHL 2-4 工作天，含稅到門方案',
          points: [
            'DHL Express / EMS / 順豐國際多管道靈活組合，跨境配送最優化',
            '支持日本消費税進口含稅方案（DDP），收件人零稅務負擔',
            '日文 + 繁體中文雙語客服，跨境支付（PayPal / 銀行匯款）齊備',
          ],
        },
        {
          heading: '3. 高品質色彩還原：柯式 CMYK + ICC profile 管理，插畫色彩不偏色',
          points: [
            '海德堡柯式印刷機 + 專業分色 + ICC profile 色彩管理',
            '原畫 RGB / sRGB 自動轉 CMYK，最佳化插畫色彩飽和度與漸層還原度',
            '支持特殊色：螢光色、金屬色、珠光色（pantone coated / uncoated）',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質工藝詳解',
      subtitle: '同人周邊常用材質對照',
      columns: ['周邊類型', '推薦材質', '適用場景'],
      rows: [
        { material: '同人誌 封面', features: '銅版紙 200g / 雪銅紙 120g | 柯式四色', scenarios: 'Comiket / 即售會' },
        { material: '同人誌 內頁', features: '道林紙 90g / 蒙肯紙 80g | 單色或四色', scenarios: '漫畫 / 插畫本' },
        { material: '周邊貼紙', features: 'PVC 防水 / 透明 PET / 燙金 | 模切異形', scenarios: '角色貼 / LOGO 貼 / 贈品' },
        { material: '海報 / 立牌', features: 'PP 裱貼 / 雪銅紙 200g / 壓克力 5mm', scenarios: '展會裝飾 / 店面陳列' },
        { material: '周邊包裝', features: '氣泡信封 / 牛皮紙信封 / 訂製紙盒', scenarios: '跨境運輸 / 禮贈包裝' },
      ],
    },
    specialOptions: {
      title: '特殊加工選項',
      items: [
        { name: '燙金 / 燙銀', description: 'LOGO 或角色圖案金屬光澤，提升收藏價值。' },
        { name: 'UV 局部上光', description: '凸顯重點插畫元素，觸感立體。' },
        { name: '異形模切', description: '角色輪廓 / 不規則形狀貼紙，創意無限。' },
        { name: 'PP 裱貼（霧面 / 亮面）', description: '海報防水防潮，長期保存不易褪色。' },
        { name: '壓克力立牌', description: 'UV 直噴 + 壓克力 5mm，背面印製角色資訊。' },
        { name: '折頁工藝', description: '同人誌特殊裝訂：折頁 + 膠裝 + 騎馬釘三選一。' },
      ],
    },
    techSpecs: {
      title: '技術參數詳解',
      items: [
        { label: '起訂量', value: '同人誌 10 本起 / 貼紙 50 張起 / 海報 10 張起 / 壓克力 5 個起' },
        { label: '交期', value: '同人誌常規 5 天 / 貼紙 3-5 天 / 海報 3 天 / 加急 2-3 天' },
        { label: '檔案要求', value: 'AI / PDF（CMYK，300dpi，含出血 3mm），RGB 自動轉 CMYK 校色' },
        { label: '色彩管理', value: 'ICC profile (GRACoL / Fogra) + 海德堡分色，插畫色彩精準還原' },
        { label: '跨境配送', value: 'DHL Express 2-4 工作天到日本 / EMS 5-7 天 / 順豐國際 4-6 天' },
      ],
    },
    serviceNodes: {
      title: '同人創作者服務節點',
      items: [
        { title: '旺角打樣中心', description: '可預約查看實際紙質 + 色彩樣本（Comiket 前樣書特急対応）。' },
        { title: '深圳工廠直發日本', description: 'DHL Express 含稅到門（DDP）方案，收件人零稅務負擔。' },
        { title: '小批量加急服務', description: '同人誌 5 本加急 3 天出貨，Comiket 前 24 小時特急対応。' },
      ],
    },
    buyingGuide: {
      title: '同人周邊選購指南',
      paragraphs: [
        '同人誌印刷首先要確定裝訂方式：騎馬釘適合 16-32 頁輕薄本，膠裝適合 40 頁以上中厚本，精裝適合 100 頁以上的商業級同人誌。預算有限選騎馬釘，品質優先選膠裝，紀念性質選精裝。',
        '周邊貼紙優先選 PVC 防水材質，異形模切需提前確認刀模線（我們提供免費刀模設計）。壓克力立牌注意厚度（建議 5mm 起，太薄易碎）和 UV 直噴色彩還原度，預算允許優先選霧面 PP 裱貼。',
        '跨境配送到日本 / 美國 / 東南亞，DHL Express 含稅到門（DDP）是收件人最便利的方案。如需省運費可選 EMS 或順豐國際，但收件人可能需自行處理進口稅務。同人創作建議預留 2 週物流緩衝期，避免活動前趕不上。',
        '在香港市場經營同人周邊，可同時開拓 Comiket 同好圈 + 本地動漫周邊店 + 跨境電商三條渠道。Comiket 前 4-6 週開始印刷預備，本地活動 2-3 週前下單，跨境電商隨時補貨。',
      ],
    },
    faq: [
      { q: '同人誌印刷最低多少本起訂？', a: '10 本起印，採用數碼印刷支持小批量。50 本以上建議柯式印刷，單價更低、色彩更穩定。' },
      { q: 'Comiket 前特急対応可以嗎？', a: '可以。同人誌 5 本特急 3 天出貨，10 本特急 2 天出貨。建議 Comiket 前 2 週下單預留緩衝。' },
      { q: '插畫色彩會不會偏色？', a: '採用 ICC profile 色彩管理（GRACoL / Fogra39）+ 海德堡柯式機，原畫 RGB 自動轉 CMYK 校色，色彩還原度達 95%+。可先打樣確認。' },
      { q: '異形貼紙可以切嗎？', a: '可以。任意形狀模切（含圓角、不規則、角色輪廓），我們提供免費刀模設計服務，起訂 50 張。' },
      { q: '跨境配送到日本要多久？', a: 'DHL Express 2-4 個工作天到日本主要城市（東京 / 大阪 / 京都 / 福岡）。支持 DDP 含稅到門方案，收件人零稅務負擔。' },
      { q: '壓克力立牌厚度怎麼選？', a: '建議 5mm 起，太薄易碎；10mm+ 更有質感但成本高。標準尺寸 A5（148×210mm）或角色立繪定制尺寸皆可。' },
      { q: '同人誌裝訂方式怎麼選？', a: '騎馬釘適合 16-32 頁輕薄本；膠裝適合 40-100 頁中厚本；精裝適合 100+ 頁商業級同人誌。預算優先騎馬釘，品質優先膠裝。' },
      { q: '周邊包裝可以訂製嗎？', a: '可以。氣泡信封、牛皮紙信封、訂製紙盒（印 LOGO）皆可。跨境運輸建議加 5mm 厚瓦楞內襯防壓。' },
    ],
  },
  en: {
    h2: 'Doujinshi & Anime Goods Printing — A5/B5 Books / Stickers / Posters / Acrylic Stands',
    coreAdvantages: {
      title: 'Why Choose ZprintPro for Doujin Goods?',
      items: [
        {
          heading: '1. Doujin-Scene Specialization: A5/B5 Books + Die-Cut Stickers + A3 Posters',
          points: [
            'Complete coverage: doujinshi books, stickers (die-cut / PVC waterproof / foil), posters (A3/A2 PP laminated), acrylic stands, paper bag packaging.',
            'Comiket / doujin event pre-set templates: A5/B5 standard sizes + 24h rush service.',
            'Low MOQ (10 books) for individual circles / first-time creators.',
          ],
        },
        {
          heading: '2. Cross-Border Friendly: Asia Factory Direct to Japan via DHL 2-4 Working Days',
          points: [
            'DHL Express / EMS / SF International flexible combinations for optimized cross-border delivery.',
            'Japan consumption tax DDP (Delivered Duty Paid) option — recipient zero customs burden.',
            'Japanese + Traditional Chinese bilingual customer service. Cross-border payment (PayPal / bank transfer) supported.',
          ],
        },
        {
          heading: '3. High-Quality Color Reproduction: Offset CMYK + ICC Profile Management',
          points: [
            'Heidelberg offset printing + professional color separation + ICC profile color management.',
            'Original RGB / sRGB auto-converted to CMYK, optimizing illustration color saturation and gradient restoration.',
            'Pantone coated / uncoated special color support.',
          ],
        },
      ],
    },
    materialTable: {
      title: 'Material & Craftsmanship Guide',
      subtitle: 'Common Doujin Goods Materials',
      columns: ['Product Type', 'Recommended Material', 'Best For'],
      rows: [
        { material: 'Doujinshi Cover', features: 'Art paper 200g / Snow paper 120g | Offset CMYK', scenarios: 'Comiket / Doujin events' },
        { material: 'Doujinshi Interior', features: 'Woodfree paper 90g / Munken paper 80g | Mono or CMYK', scenarios: 'Manga / Illustration books' },
        { material: 'Goods Stickers', features: 'PVC waterproof / Clear PET / Foil | Die-cut custom', scenarios: 'Character / LOGO / Gifts' },
        { material: 'Posters / Stands', features: 'PP laminated / Snow paper 200g / Acrylic 5mm', scenarios: 'Event decor / Retail display' },
        { material: 'Goods Packaging', features: 'Bubble mailer / Kraft envelope / Custom paper box', scenarios: 'Cross-border shipping / Gifts' },
      ],
    },
    specialOptions: {
      title: 'Special Finishing Options',
      items: [
        { name: 'Foil Stamping (Gold/Silver)', description: 'Metallic shine on LOGOs or character art — boosts collectible value.' },
        { name: 'Spot UV Coating', description: 'Highlight key illustration elements with raised, tactile glossy finish.' },
        { name: 'Die-Cut Custom Shape', description: 'Character silhouettes / irregular shapes — unlimited creativity.' },
        { name: 'PP Lamination (Matte / Gloss)', description: 'Waterproof + fade-resistant for long-lasting poster preservation.' },
        { name: 'Acrylic Stand', description: 'UV direct print + 5mm acrylic, character info printed on reverse.' },
        { name: 'Special Binding', description: 'Fold + perfect binding + saddle stitch — three choices for doujinshi.' },
      ],
    },
    techSpecs: {
      title: 'Technical Specifications',
      items: [
        { label: 'Minimum Order', value: '10 books / 50 stickers / 10 posters / 5 acrylic stands' },
        { label: 'Turnaround', value: 'Books 5 days standard / Stickers 3-5 days / Posters 3 days / Rush 2-3 days' },
        { label: 'File Requirements', value: 'AI / PDF (CMYK, 300dpi, 3mm bleed). RGB auto-converted to CMYK with color proofing.' },
        { label: 'Color Management', value: 'ICC profile (GRACoL / Fogra) + Heidelberg color separation, 95%+ color accuracy.' },
        { label: 'Cross-Border Shipping', value: 'DHL Express 2-4 days to Japan / EMS 5-7 days / SF International 4-6 days' },
      ],
    },
    serviceNodes: {
      title: 'Doujin Creator Service Points',
      items: [
        { title: 'Factory Sample Program', description: 'Book an appointment to view physical samples (paper + color). Pre-Comiket rush sample support.' },
        { title: 'Asia Factory → Japan Direct', description: 'DHL Express DDP (Delivered Duty Paid) — recipient zero customs burden.' },
        { title: 'Small-Batch Rush Service', description: '5-book rush in 3 days, 10-book rush in 2 days. Comiket 24h emergency support.' },
      ],
    },
    buyingGuide: {
      title: 'Doujin Goods Buying Guide',
      paragraphs: [
        'For doujinshi printing, first determine the binding: saddle stitch suits 16-32 page thin books, perfect binding for 40+ page medium-thick books, hardcover for 100+ page commercial-grade works. Budget-conscious choose saddle stitch, quality-first choose perfect binding, commemorative choose hardcover.',
        'Goods stickers prioritize PVC waterproof material. Die-cut custom shapes need confirmed die-cut lines (we provide free die-cut design). Acrylic stands need 5mm+ thickness (thinner breaks easily) and UV direct print color accuracy. Matte PP lamination is preferred when budget allows.',
        'Cross-border shipping to Japan / US / Southeast Asia — DHL Express DDP (Delivered Duty Paid) is the most convenient for recipients. For cheaper shipping, EMS or SF International, but recipients may need to handle import customs themselves. Doujin creators should reserve 2-week logistics buffer before events.',
        "Operating worldwide's doujin market, you can develop three channels simultaneously: Comiket peer circle + local anime goods stores + cross-border e-commerce. Start printing preparation 4-6 weeks before Comiket, place orders 2-3 weeks before local events, replenish cross-border e-commerce anytime.",
      ],
    },
    faq: [
      { q: 'What is the minimum doujinshi print order?', a: '10 books minimum using digital printing. 50+ books recommended for offset printing — lower unit price and more stable color.' },
      { q: 'Can you handle pre-Comiket rush orders?', a: 'Yes. 5-book rush in 3 days, 10-book rush in 2 days. Place orders 2 weeks before Comiket for buffer.' },
      { q: 'Will my illustration colors shift?', a: 'ICC profile color management (GRACoL / Fogra39) + Heidelberg offset press. Original RGB auto-converted to CMYK with 95%+ color accuracy. Sample proofing available.' },
      { q: 'Can I get custom die-cut stickers?', a: 'Yes. Any shape die-cut (rounded, irregular, character silhouette). Free die-cut design service, MOQ 50 stickers.' },
      { q: 'How long is cross-border shipping to Japan?', a: 'DHL Express 2-4 working days to major Japan cities (Tokyo / Osaka / Kyoto / Fukuoka). DDP option available.' },
      { q: 'What acrylic stand thickness should I choose?', a: '5mm+ recommended (thinner breaks easily); 10mm+ feels more premium but costs more. Standard A5 (148×210mm) or custom sizes.' },
      { q: 'How do I choose doujinshi binding?', a: 'Saddle stitch for 16-32 page thin books; perfect binding for 40-100 page medium-thick books; hardcover for 100+ page commercial-grade.' },
      { q: 'Can I customize goods packaging?', a: 'Yes. Bubble mailers, kraft envelopes, custom paper boxes (with LOGO print). For cross-border, add 5mm corrugated inner liner for crush protection.' },
    ],
  },
  ja: {
    h2: '同人誌・アニメグッズ印刷 — A5/B5 / ステッカー / ポスター / アクリルスタンド',
    coreAdvantages: {
      title: 'ZprintPro 同人グッズの強み',
      items: [
        {
          heading: '1. 同人シーン特化：A5/B5 同人誌 + 異形ステッカー + A3 ポスター',
          points: [
            '同人誌、ステッカー（異形／PVC防水／箔押し）、ポスター（A3／A2 PPラミネート）、アクリルスタンド、紙袋パッケージまで全カバー。',
            'Comiket／即売会向けプリセットテンプレート：A5/B5標準サイズ＋24時間特急対応。',
            '個人サークル・新人作家向けの少ロット対応（10部から）。',
          ],
        },
        {
          heading: '2. 越境対応：アジア自社工場からDHL 2-4営業日で日本直送、消費税込み（DDP）対応',
          points: [
            'DHL Express／EMS／SF国際の柔軟な組み合わせで越境配送を最適化。',
            '日本の消費税込みDDP（Delivered Duty Paid）対応で受取人様の通関手続き不要。',
            '日本語＋繁体中文バイリンガルカスタマーサポート。越境決済（PayPal／銀行振込）対応。',
          ],
        },
        {
          heading: '3. 高品質カラー再現：オフセットCMYK＋ICCプロファイル管理',
          points: [
            'ハイデルベルグオフセット印刷＋專業分色＋ICCプロファイルカラーマネジメント。',
            '原画RGB／sRGBを自動CMYK変換、イラストの彩度とグラデーション再現度を最適化。',
            'Pantone coated／uncoated特殊色対応。',
          ],
        },
      ],
    },
    materialTable: {
      title: '材質・工法ガイド',
      subtitle: '同人グッズよく使われる材質',
      columns: ['製品タイプ', '推奨材質', '最適な用途'],
      rows: [
        { material: '同人誌 表紙', features: 'コート紙200g／スノーペーパー120g｜オフセットCMYK', scenarios: 'コミケ／即売会' },
        { material: '同人誌 本文', features: '上質紙90g／ムンケンペーパー80g｜モノクロまたはCMYK', scenarios: 'マンガ／イラスト本' },
        { material: 'グッズステッカー', features: 'PVC防水／透明PET／箔押し｜異形抜き', scenarios: 'キャラクター／LOGO／特典' },
        { material: 'ポスター／スタンド', features: 'PPラミネート／スノーペーパー200g／アクリル5mm', scenarios: 'イベント装飾／店舗陳列' },
        { material: 'グッズ包装', features: 'プチプチ封筒／クラフト封筒／カスタム紙箱', scenarios: '越境配送／ギフト包装' },
      ],
    },
    specialOptions: {
      title: '特殊加工オプション',
      items: [
        { name: '箔押し（金／銀）', description: 'ロゴやキャラクターアートに金属光沢、コレクション価値アップ。' },
        { name: 'UV局部コーティング', description: '重要なイラスト要素を立体的な光沢で強調。' },
        { name: '異形型抜き', description: 'キャラクターシルエット／不規則形状 — クリエイティブ無限大。' },
        { name: 'PPラミネート（マット／グロス）', description: '防水・防退色でポスターを長期保存。' },
        { name: 'アクリルスタンド', description: 'UV直噴印刷＋5mmアクリル、キャラクター情報裏面印刷。' },
        { name: '特殊製本', description: '折り＋無線綴じ＋中綴じ — 同人誌3つの選択肢。' },
      ],
    },
    techSpecs: {
      title: '技術仕様',
      items: [
        { label: '最小発注数', value: '同人誌10部／ステッカー50枚／ポスター10枚／アクリル5個' },
        { label: '納期', value: '同人誌通常5日／ステッカー3-5日／ポスター3日／急行2-3日' },
        { label: 'ファイル要件', value: 'AI／PDF（CMYK、300dpi、3mm塗りたし）。RGB自動CMYK変換＋色校正。' },
        { label: 'カラーマネジメント', value: 'ICCプロファイル（GRACoL／Fogra）＋ハイデルベルグ分色、色再現度95%以上。' },
        { label: '越境配送', value: 'DHL Express 2-4日で日本主要都市／EMS 5-7日／SF国際 4-6日' },
      ],
    },
    serviceNodes: {
      title: '同人クリエイターサービス拠点',
      items: [
        { title: '旺角サンプルセンター', description: '実物サンプル（紙質＋カラー）をご覧いただけます（コミケ前特急サンプル対応）。' },
        { title: 'アジア自社工場 → 日本直送', description: 'DHL Express DDP（Delivered Duty Paid） — 受取人様の通関手続き不要。' },
        { title: '少ロット急行サービス', description: '同人誌5部急行3日、10部急行2日出荷。コミケ前24時間特急対応。' },
      ],
    },
    buyingGuide: {
      title: '同人グッズ選び方ガイド',
      paragraphs: [
        '同人誌印刷は、まず製本方式を決めましょう。中綴じは16-32ページの薄い本に、無線綴じは40ページ以上の中厚本に、上製本は100ページ以上の商業級同人誌に適しています。予算優先なら中綴じ、品質優先なら無線綴じ、記念性なら上製本を選びましょう。',
        'グッズステッカーはPVC防水マテリアル優先。異形型抜きは事前に型線確認が必要（無料型設計サービス）。アクリルスタンドは厚み（5mm以上推奨、薄すぎると破損）とUV直噴の色再現度がポイント。予算が許せばマットPPラミネートを優先。',
        '日本／米国／東南アジアへの越境配送 — DHL Express DDP（Delivered Duty Paid）が受取人様にとって最も便利。安価配送はEMS／SF国際ですが、受取人様が通関手続きを行う必要があります。同人創作はイベント前2週間の物流バッファを確保しましょう。',
        '日本市場で同人グッズを展開する場合、Comiket同好サークル＋ローカルアニメグッズ店＋越境ECの3チャネル同時展開が可能。Comiket前は4-6週間前から印刷準備、ローカルイベントは2-3週間前発注、越境ECは随時補充。',
      ],
    },
    faq: [
      { q: '同人誌印刷の最小発注数は？', a: '10部から（デジタル印刷）。50部以上はオフセット印刷推奨 — 単価が安く、色彩も安定。' },
      { q: 'コミケ前特急対応できますか？', a: 'はい。同人誌5部特急3日、10部特急2日出荷。コミケ前2週間発注でバッファ確保推奨。' },
      { q: 'イラストの色彩は色褪せしますか？', a: 'ICCプロファイルカラーマネジメント（GRACoL／Fogra39）＋ハイデルベルグオフセット印刷機。原画RGBを自動CMYK変換、色再現度95%以上。事前サンプル校正可能。' },
      { q: '異形ステッカーはできますか？', a: 'はい。任意形状の型抜き（丸角、不規則、キャラクターシルエット）対応。無料型設計サービス、最小50枚。' },
      { q: '日本への越境配送はどのくらい？', a: 'DHL Express 2-4営業日で日本主要都市（東京／大阪／京都／福岡）。DDPオプション対応。' },
      { q: 'アクリルスタンドの厚みは？', a: '5mm以上推奨（薄すぎる破損リスク）。10mm+は質感アップだがコスト増。標準A5（148×210mm）またはカスタムサイズ対応。' },
      { q: '同人誌の製本方式は？', a: '中綴じ16-32ページ、無線綴じ40-100ページ、上製本100+ページ商業級。予算優先中綴じ、品質優先無線綴じ。' },
      { q: 'グッズ包装はカスタマイズできますか？', a: 'はい。プチプチ封筒、クラフト封筒、カスタム紙箱（LOGO印刷）対応。越境配送は5mmコルゲート内装箱で圧縮防止推奨。' },
    ],
  },
};

const greetingCardsContent: Record<string, CategoryLocaleContent> = {
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
        "Production sweet spot: 100-500 sheets digital (no plate), 500-5000 sheets offset (unit price can drop to $0.07). Peak season (Christmas / Valentine / Mother's Day) order 4 weeks ahead.",
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

const weddingInvitationsContent: Record<string, CategoryLocaleContent> = {
    'zh-hk': {
      h2: '香港喜帖印刷服務 2026 · 中式 / 西式 / 教堂 / 集團婚禮 4 大場景一站式指南',
      coreAdvantages: {
        title: '為何選擇智印港的喜帖印刷?',
        items: [
          {
            heading: '1. 4 大婚禮場景一站式覆蓋:中式喜帖 + 西式燙金 + 教堂 + 集團婚禮',
            points: [
              '2026 龍年香港傳統結婚大年,婚姻登記處預計全年結婚登記超過 50,000 對,帶動婚慶印刷市場規模突破 HK$15 億',
              '4 大場景完整覆蓋:中式傳統龍鳳喜帖、西式燙金邀請卡、教堂婚禮卡、集團婚禮紀念卡,100-500 個小批量定制',
              '全球婚慶印刷市場 $13B+ (Bonafide 2025),喜帖 $4.29B CAGR 6.3%,是名片市場 ($1.2B) 3.5x 大',
            ],
          },
          {
            heading: '2. 5 種材質 + 6 種工藝靈活組合 + 小批量 50 個起印',
            points: [
              '5 種材質:白卡紙 / 珠光紙 / 萊妮紋紙 / 棉紙 / 燙金專用紙,30+ 種材質樣本免費索取',
              '6 種熱門工藝:燙玫瑰金 + 擊凸龍鳳 (中式奢華) / 燙金 + UV / 對裱 / 雷射雕刻 / Pantone / 邊緣燙金',
              '最小起訂 50 個,100 個起享 9 折 + 免費設計,婚慶套裝 9 折 (喜帖 + 信封 + 禮袋 + 席卡 + 桌牌 + 迎賓牌 + 利是封)',
            ],
          },
          {
            heading: '3. 順豐本地 24h + DHL 全球 2-4 天配送,5 天免費打樣',
            points: [
              '本地客戶:順豐港九新界 24h 達,離島 1-2 天,滿 HK$500 免費上門',
              '海外客戶:DHL 全球 2-4 天直送 50+ 國家,實時追蹤號碼 + 清關協助',
              '5 天免費打樣,確認後正式下單;深圳自有印刷廠 2008 年起服務全球,品質保證',
            ],
          },
        ],
      },
      materialTable: {
        title: '5 種喜帖材質對比',
        subtitle: '香港婚慶市場最常用的 5 種喜帖材質,每種各有特點和適用場景。',
        columns: ['材質', '特性', '適用場景'],
        rows: [
          { material: '白卡紙 250-350g', features: '純白挺直,百搭', scenarios: '西式標準 / 教堂婚禮 / 集團婚禮' },
          { material: '珠光紙 250-300g', features: '珍珠光澤,奢華', scenarios: '中式奢華 / 西式晚宴 / 集團婚禮' },
          { material: '萊妮紋紙 250-300g', features: '橫條紋理,質感', scenarios: '西式標準 / 教堂婚禮' },
          { material: '棉紙 (Linen) 250-300g', features: '柔和織物感,文青', scenarios: '教堂 / 森林 / 文青婚禮' },
          { material: '燙金專用紙 250-300g', features: '啞面燙金附著力最佳', scenarios: '燙金喜帖首選' },
        ],
      },
      specialOptions: {
        title: '6 種熱門工藝對比',
        items: [
          { name: '燙玫瑰金 + 擊凸龍鳳', description: '2026 流行中式奢華標配,新人姓名 + 結婚標誌 3D 立體觸感。單個加 HK$ 1-3。' },
          { name: '燙金 + UV 局部上光', description: '西式經典工藝,燙金新人姓名 + UV 突出結婚標誌。單個加 HK$ 1-3。' },
          { name: '對裱 (雙層紙)', description: '中式喜帖常見,兩層紙貼合增加份量感。單個加 HK$ 2-4。' },
          { name: '雷射雕刻', description: '西式奢華 / 高檔喜帖,精細花紋切穿頂層紙。單個加 HK$ 3-6。' },
          { name: 'Pantone 專色印刷', description: '婚禮主題色精準還原,適合品牌色婚禮。單個加 HK$ 1-2。' },
          { name: '邊緣燙金', description: '高檔現代風,卡片 3 邊燙金。單個加 HK$ 2-5。' },
        ],
      },
      techSpecs: {
        title: '喜帖印刷技術參數',
        items: [
          { label: '印刷方式', value: '柯式印刷 (CMYK / Pantone 專色) + 數碼印刷 (小批量)' },
          { label: '標準尺寸', value: 'A5 (148×210mm) / 13×18cm / 12×18cm / 14×20cm (摺卡)' },
          { label: '紙張厚度', value: '250-350g (常用 250g / 300g / 350g 3 檔)' },
          { label: '最小起訂量', value: '50 個 (小批量試水) / 100 個 (中型婚禮最經濟)' },
          { label: '生產週期', value: '標準 7-10 個工作天,急件 5 天 (+30%)' },
          { label: '運費', value: '順豐本地 24h 達 / DHL 全球 2-4 天 (50+ 國家直送)' },
          { label: '設計服務', value: '100 個起免費設計,5 張材質樣本免費索取' },
          { label: '付款方式', value: 'PayPal / 銀行電匯 (DBS HK) / 微信 QR / 支付寶 QR' },
        ],
      },
      serviceNodes: {
        title: '智印港香港本地服務節點',
        items: [
          { title: '5 張材質樣本免費寄送', description: '白卡 / 珠光 / 萊妮紋 / 棉 / 燙金專用 5 種材質,免費順豐到付,當日寄出 24h 達' },
          { title: '設計師 24h 出稿', description: '微信 / WhatsApp / 電郵確認,K3 真實身份 ≤ 2 小時回覆,3 輪免費修改' },
          { title: '每日生產進度更新', description: '印刷 + 燙金 + 對裱 + 摺卡 4 大工序實時反饋,生產全程透明' },
          { title: '順豐本地 24h 配送', description: '港九新界 24h 達,離島 1-2 天,滿 HK$500 免費上門' },
          { title: 'DHL 全球 2-4 天直送', description: '海外 50+ 國家,實時追蹤號碼 + 清關協助' },
          { title: '7 天質量保證 + 售後', description: '免費重印 (質量問題) / 加印折扣 (滿意推薦)' },
        ],
      },
      buyingGuide: {
        title: '喜帖印刷選購指南 4 大決策',
        paragraphs: [
          '第一步:定婚禮風格 — 中式喜帖選燙金 + 紅色主調,西式教堂選活版 + 棉紙,海外婚禮選整套 6 件配套。風格定得清,工藝同紙材即刻收窄。',
          '第二步:選材質 — 白卡紙 (預算) / 珠光紙 (中奢華) / 萊妮紋紙 (質感) / 棉紙 (高端) / 燙金專用紙 (燙金首選)。5 種材質樣本免費索取,先比再印。',
          '第三步:選工藝組合 — 燙金 1 層 (90% 喜帖標配) / 燙玫瑰金 + 擊凸龍鳳 (中式奢華) / 燙金 + UV (西式經典) / 雷射雕刻 (高端)。工藝越多,質感越好,成本越高。',
          '第四步:選數量 — 50 個 (試水) / 100 個 (中型婚禮最經濟) / 300 個 (大型婚禮) / 500 個 (超大型 / 婚慶公司備用)。數量越多,單價越低。',
          '婚慶套裝 9 折優惠:喜帖 + 信封 + 婚禮禮袋 + 席卡 + 桌牌 + 迎賓牌 + 利是封 一站印齊,享 9 折 + 免費寄樣,適合婚慶全套 / 海外婚禮 / 教堂 / 酒店婚禮。',
        ],
        links: [
          { label: '婚慶整套配套指南', href: '/zh-hk/blog/wedding-invitation-pricing-guide/' },
          { label: '喜帖 vs 賀卡 vs 貼紙', href: '/zh-hk/category/greeting-cards/' },
          { label: '婚宴枱卡', href: '/zh-hk/blog/wedding-table-card-printing-guide/' },
          { label: '婚嫁利是封', href: '/zh-hk/blog/wedding-red-packet-printing-guide/' },
        ],
      },
      faq: [
        { q: '喜帖最小起訂量是多少?', a: '智印港喜帖 50 個起訂,適合小型婚禮 (30 人以下) 試水。100 個是最經濟起步,特殊工藝如雷射雕刻需 200 個起。' },
        { q: '喜帖可以印新人姓名嗎?每個名字不同可以嗎?', a: '可以。新人姓名、結婚日期、結婚標誌都可個性化定製,提供高解析度向量檔 (AI / EPS / PDF) 即可。每個名字不同單個加 HK$ 1-3。' },
        { q: '喜帖交期幾耐?急件可以幾天?', a: '標準 7-10 個工作天,急件可壓縮至 5 天 (加 30%)。婚禮建議提前 1 個月下單,佳節 (5 月、10-12 月) 建議提前 2 個月。' },
        { q: '喜帖 + 信封 + 婚禮禮袋可以一起訂嗎?有套裝優惠嗎?', a: '可以。智印港提供婚慶印刷套裝 — 喜帖 + 信封 + 婚禮禮袋 + 席卡 + 桌牌 + 迎賓牌 + 利是封,套裝價格 9 折。WhatsApp 19880851334 報價。' },
        { q: '喜帖可以寄樣本嗎?打樣費多少?', a: '免費寄 5 張材質樣本 (順豐到付)。數碼打樣 (1 張實物樣本) 收費 HK$ 200-500,正式下單 100 個以上可全額抵扣。' },
      ],
    },

    en: {
      h2: 'Custom Wedding Invitations 2026: Chinese-Style, Western, Church & Group Wedding Full Service Guide',
      coreAdvantages: {
        title: 'Why Choose ZprintPro for Wedding Invitation Printing?',
        items: [
          {
            heading: '1. 4 Wedding Scenarios Full Coverage: Chinese + Western Foil + Church + Group',
            points: [
              '2026 dragon year is Hong Kong traditional peak wedding season, Marriage Registry expects 50,000+ registrations driving HK$1.5 billion wedding printing market',
              '4 scenarios fully covered: Chinese dragon-phoenix, Western foil, church ceremony, group wedding cards, 50-500 piece small-batch custom',
              'Global wedding printing market $13B+ (Bonafide 2025), invitation submarket $4.29B with 6.3% CAGR, 3.5x larger than business card market',
            ],
          },
          {
            heading: '2. 5 Materials + 6 Finishing Options + Small Batch 50 Pieces MOQ',
            points: [
              '5 materials: white card / pearl / linen / cotton / foil-ready paper, 30+ samples free request',
              '6 popular finishing: rose gold + dragon emboss (Chinese luxury) / foil + UV / duplex / laser engraving / Pantone / edge foiling',
              'MOQ 50 pieces, 100+ gets 9% off + free design, wedding bundle 10% off (invitation + envelope + favor bag + place card + table card + welcome sign + red packet)',
            ],
          },
          {
            heading: '3. DHL Global 2-4 Days + 5-Day Free Proofing',
            points: [
              'Local SF Express 24h HK,離島 1-2 days, free pickup over HKD 500',
              'International DHL 2-4 days to 50+ countries, real-time tracking + customs support',
              '5-day free proofing then formal order; Shenzhen in-house factory since 2008, quality guarantee',
            ],
          },
        ],
      },
      materialTable: {
        title: '5 Wedding Invitation Materials Compared',
        subtitle: '5 most popular materials in Hong Kong 2026 wedding market, each with unique characteristics and best-fit scenarios.',
        columns: ['Material', 'Features', 'Best For'],
        rows: [
          { material: 'White card 250-350g', features: 'Pure white, versatile', scenarios: 'Western standard / church / group wedding' },
          { material: 'Pearl paper 250-300g', features: 'Pearl luster, luxury', scenarios: 'Chinese luxury / Western evening / group' },
          { material: 'Linen paper 250-300g', features: 'Horizontal texture, tactile', scenarios: 'Western / church wedding' },
          { material: 'Cotton paper 250-300g', features: 'Soft fabric feel, literary', scenarios: 'Church / forest / literary wedding' },
          { material: 'Foil-ready paper 250-300g', features: 'Best foil adhesion, matte', scenarios: 'Foil invitation first choice' },
        ],
      },
      specialOptions: {
        title: '6 Popular Finishing Options',
        items: [
          { name: 'Rose gold foil + dragon emboss', description: '2026 trending Chinese luxury, 3D tactile names + monogram. +HKD 1-3/piece.' },
          { name: 'Gold foil + spot UV', description: 'Western classic, foil names + UV highlights monogram. +HKD 1-3/piece.' },
          { name: 'Duplex (double layer)', description: 'Common in Chinese invitations, two paper layers laminated. +HKD 2-4/piece.' },
          { name: 'Laser engraving', description: 'Western luxury, fine patterns cut through top paper. +HKD 3-6/piece.' },
          { name: 'Pantone spot color', description: 'Exact wedding theme color match. +HKD 1-2/piece.' },
          { name: 'Edge foiling', description: 'Modern high-end, foil on all 3 edges. +HKD 2-5/piece.' },
        ],
      },
      techSpecs: {
        title: 'Wedding Invitation Technical Specs',
        items: [
          { label: 'Printing', value: 'Offset (CMYK / Pantone spot) + Digital (small batch)' },
          { label: 'Standard sizes', value: 'A5 (148×210mm) / 13×18cm / 12×18cm / 14×20cm (folded)' },
          { label: 'Paper weight', value: '250-350g (3 tiers: 250g / 300g / 350g)' },
          { label: 'MOQ', value: '50 pieces (trial) / 100 pieces (most economical)' },
          { label: 'Production', value: 'Standard 7-10 working days, rush 5 days (+30%)' },
          { label: 'Shipping', value: 'SF Express local 24h / DHL global 2-4 days (50+ countries)' },
          { label: 'Design service', value: 'Free design for 100+ pieces, 5 free material samples' },
          { label: 'Payment', value: 'PayPal / Bank wire (DBS HK) / WeChat QR / Alipay QR' },
        ],
      },
      serviceNodes: {
        title: 'ZprintPro Hong Kong Local Service',
        items: [
          { title: '5 Material Samples Free', description: 'White / pearl / linen / cotton / foil-ready, free SF Express COD, 24h delivery' },
          { title: 'Designer 24h Draft', description: 'WeChat / WhatsApp / email confirm, K3 ≤ 2 hours reply, 3 free revision rounds' },
          { title: 'Daily Production Updates', description: 'Print + foil + duplex + fold 4 major processes real-time feedback, full transparency' },
          { title: 'SF Express Local 24h', description: 'HK 24h delivery,離島 1-2 days, free pickup over HKD 500' },
          { title: 'DHL Global 2-4 Days', description: 'International 50+ countries, real-time tracking + customs support' },
          { title: '7-Day Quality Guarantee', description: 'Free reprint (quality issue) / re-order discount (satisfied recommendation)' },
        ],
      },
      buyingGuide: {
        title: 'Wedding Invitation Buying Guide 4 Decisions',
        paragraphs: [
          'Step 1: Define wedding style — Chinese invitation choose foil + red tone, Western church choose letterpress + cotton, destination wedding choose full 6-piece suite. Clear style narrows finishing and material options immediately.',
          'Step 2: Choose material — white card (budget) / pearl (mid-luxury) / linen (textured) / cotton (premium) / foil-ready (foil first choice). Request 5 material samples free, compare before print.',
          'Step 3: Choose finishing combo — 1 foil layer (90% standard) / rose gold + dragon emboss (Chinese luxury) / foil + UV (Western classic) / laser engraving (premium). More finishing = better texture, higher cost.',
          'Step 4: Choose quantity — 50 (trial) / 100 (most economical) / 300 (large wedding) / 500 (extra-large / planner stock). Higher quantity = lower per-piece cost.',
          'Wedding bundle 10% off: invitation + envelope + favor bag + place card + table card + welcome sign + red packet, all-in-one printing, 10% off + free sample, ideal for full wedding / destination / church / hotel wedding.',
        ],
        links: [
          { label: 'Wedding Invitation Pricing Guide 2026', href: '/en/blog/wedding-invitation-pricing-guide/' },
          { label: 'Invitation vs Card vs Sticker', href: '/en/category/greeting-cards/' },
          { label: 'Wedding Table Card Guide', href: '/en/blog/wedding-table-card-printing-guide/' },
          { label: 'Wedding Red Packet Guide', href: '/en/blog/wedding-red-packet-printing-guide/' },
        ],
      },
      faq: [
        { q: 'What is the minimum order quantity for wedding invitations?', a: 'ZprintPro MOQ is 50 pieces for small weddings (under 30 guests) trial. 100 pieces is the most economical starting point. Special finishing like laser engraving requires 200+ pieces.' },
        { q: 'Can each invitation have a different name?', a: 'Yes. Names, dates, and monograms all personalized. Provide high-resolution vector files (AI / EPS / PDF). Per-name variation adds HKD 1-3/piece.' },
        { q: 'What is the production lead time? Can I rush?', a: 'Standard 7-10 working days, rush can be compressed to 5 days (+30%). Order 1 month before wedding, peak season (May, Oct-Dec) 2 months ahead.' },
        { q: 'Can invitations + envelopes + favor bags be ordered together? Bundle discount?', a: 'Yes. ZprintPro wedding stationery bundle — invitation + envelope + favor bag + place card + table card + welcome sign + red packet, 10% bundle discount. WhatsApp 19880851334 for bundle quote.' },
        { q: 'Can I get samples? Proofing cost?', a: 'Free 5 material samples (SF Express COD). Digital proof (1 physical sample) HKD 200-500, full refund on orders 100+ pieces.' },
      ],
    },

    ja: {
      h2: 'カスタム結婚式招待状 2026：中式・西洋式・教会式・合同式 フルサービスガイド',
      coreAdvantages: {
        title: 'ZprintProの結婚式招待状印刷を選ぶ理由は?',
        items: [
          {
            heading: '1. 4大披露宴シーン ワンストップ対応：中式 + 西洋式箔押し + 教会式 + 合同式',
            points: [
              '2026辰年は香港伝統的な結婚ピークシーズン、香港婚姻登記処は年間5万件超の結婚登録が見込まれHK$15億のブライダル印刷市場を形成',
              '4大シーン完全対応：中華式龍鳳・西洋式箔押し・教会式・合同式紅包、50〜500個小ロット',
              '世界ブライダル印刷市場$13B+ (Bonafide 2025)、招待状サブマーケット$4.29B 6.3% CAGR、名刺市場 ($1.2B) の3.5倍',
            ],
          },
          {
            heading: '2. 5素材 + 6加工オプション + 小ロット50枚から',
            points: [
              '5素材：白カード / パール / ラインペーパー / コットン / 箔押し用紙、30+素材サンプル無料請求',
              '6人気加工：ローズゴールド+龍エンボス (中式 luxury) / 箔押し+UV / 二層紙 / レーザー彫刻 / Pantone / エッジ箔押し',
              '最小発注50枚、100枚以上9%OFF+無料デザイン、ブライダルセット10%割引 (招待状+封筒+引出物袋+席札+テーブルカード+ウェルカムボード+紅包)',
            ],
          },
          {
            heading: '3. 順豊ローカル24h + DHL全世界2-4日 + 5日無料校正',
            points: [
              'ローカル順豊ローカル九龍新界24h納品、離島1-2日、HKD 500以上無料集荷',
              '海外DHL全世界2-4日50ヶ国直送、リアルタイム追跡+通関サポート',
              '5日無料校正後正式発注、深圳自社工場2008年創業、品質保証',
            ],
          },
        ],
      },
      materialTable: {
        title: '5種 招待状素材比較',
        subtitle: '香港ブライダル市場2026年人気5素材、それぞれ独自の特徴と最適シーン。',
        columns: ['素材', '特徴', '最適シーン'],
        rows: [
          { material: '白カード 250-350g', features: '純白、万能', scenarios: '西洋式標準 / 教会式 / 合同式' },
          { material: 'パール紙 250-300g', features: 'パール光沢、ラグジュアリー', scenarios: '中式 luxury / 西洋式披露宴' },
          { material: 'ラインペーパー 250-300g', features: '横線テクスチャ、触感', scenarios: '西洋式 / 教会式' },
          { material: 'コットン紙 250-300g', features: '柔らかい布感、文芸', scenarios: '教会 / 森林 / 文芸披露宴' },
          { material: '箔押し用紙 250-300g', features: '箔押し密着性最高、マット', scenarios: '箔押し招待状第一選択' },
        ],
      },
      specialOptions: {
        title: '6種 人気加工オプション',
        items: [
          { name: 'ローズゴールド箔押し + 龍エンボス', description: '2026トレンド中式 luxury、立体触感の名前+モノグラム。+HKD 1-3/枚。' },
          { name: '金箔押し + 部分UV', description: '西洋式クラシック、箔押し名+UVモノグラム強調。+HKD 1-3/枚。' },
          { name: '二層紙 (Duplex)', description: '中式招待状一般的、二層紙貼合で高級感。+HKD 2-4/枚。' },
          { name: 'レーザー彫刻', description: '西洋式 luxury、上層紙貫通の繊細パターン。+HKD 3-6/枚。' },
          { name: 'Pantone特色印刷', description: '披露宴テーマ色完全一致、ブランド色披露宴に最適。+HKD 1-2/枚。' },
          { name: 'エッジ箔押し', description: '高級モダン、カード3辺箔押し。+HKD 2-5/枚。' },
        ],
      },
      techSpecs: {
        title: '招待状印刷技術仕様',
        items: [
          { label: '印刷方式', value: 'オフセット (CMYK / Pantone特色) + デジタル (小ロット)' },
          { label: '標準サイズ', value: 'A5 (148×210mm) / 13×18cm / 12×18cm / 14×20cm (二つ折り)' },
          { label: '紙厚', value: '250-350g (3段階: 250g / 300g / 350g)' },
          { label: '最小発注数量', value: '50枚 (試作) / 100枚 (経済的スタート)' },
          { label: '生産期間', value: '標準 7-10営業日、急ぎ 5日 (+30%)' },
          { label: '配送', value: '順豊ローカル24h / DHL全世界2-4日 (50ヶ国対応)' },
          { label: 'デザインサービス', value: '100枚以上無料デザイン、5素材サンプル無料' },
          { label: '支払い方法', value: 'PayPal / 銀行電信送金 (DBS HK) / WeChat QR / Alipay QR' },
        ],
      },
      serviceNodes: {
        title: 'ZprintPro香港ローカルサービス',
        items: [
          { title: '5素材サンプル無料送付', description: '白カード / パール / ラインペーパー / コットン / 箔押し、5種 無料順豊着払い、24h納品' },
          { title: 'デザイナー24h初稿', description: 'WeChat / WhatsApp / メール確認、≤2時間以内返信、3回無料修正' },
          { title: '毎日生産進捗更新', description: '印刷+箔押し+二層紙+折加工 4大工程 リアルタイムフィードバック、全工程透明' },
          { title: '順豊ローカル24h配送', description: '九龍新界24h納品、離島1-2日、HKD 500以上無料集荷' },
          { title: 'DHL全世界2-4日直送', description: '海外50ヶ国、リアルタイム追跡+通関サポート' },
          { title: '7日品質保証+アフター', description: '無料再印刷 (品質問題) / 再注文割引 (満足推薦)' },
        ],
      },
      buyingGuide: {
        title: '招待状印刷 选购ガイド 4大決定',
        paragraphs: [
          'ステップ1：披露宴スタイル決定 — 中式招待状は箔押し+赤色、西洋式教会は活版+コットン、海外披露宴はフル6点セット選択。スタイル明確で加工と素材が即絞り込まれる。',
          'ステップ2：素材選択 — 白カード (予算) / パール (中 luxury) / ラインペーパー (質感) / コットン (高級) / 箔押し用紙 (箔押し第一選択)。5素材サンプル無料請求、比較してから印刷。',
          'ステップ3：加工組合せ選択 — 箔押し1層 (90%標準) / ローズゴールド+龍エンボス (中式 luxury) / 箔押し+UV (西洋式クラシック) / レーザー彫刻 (高級)。加工多いほど質感アップ、コスト高。',
          'ステップ4：数量選択 — 50枚 (試作) / 100枚 (経済的) / 300枚 (大型披露宴) / 500枚 (超大型/プランナー予備)。数量多いほど単価安い。',
          'ブライダルセット10%割引：招待状+封筒+引出物袋+席札+テーブルカード+ウェルカムボード+紅包 ワンストップ印刷、10%OFF+無料サンプル、フル披露宴/海外披露宴/教会式/ホテル披露宴に最適。',
        ],
        links: [
          { label: '結婚式招待状 価格ガイド 2026', href: '/ja/blog/wedding-invitation-pricing-guide/' },
          { label: '招待状 vs カード vs ステッカー', href: '/ja/category/greeting-cards/' },
          { label: '結婚式テーブルカード ガイド', href: '/ja/blog/wedding-table-card-printing-guide/' },
          { label: 'ブライダル紅包 ガイド', href: '/ja/blog/wedding-red-packet-printing-guide/' },
        ],
      },
      faq: [
        { q: '招待状の最小発注数量は?', a: 'ZprintPro最小発注は50枚 (小型披露宴30名以下試作)。100枚が経済的スタート、レーザー彫刻等の特殊加工は200枚から。' },
        { q: '招待状ごとに異なる名前を印刷できますか?', a: '可能です。新郎新婦名・挙式日・モノグラム全て個別対応、高解像度ベクターファイル (AI / EPS / PDF) 提供。個別名追加はHKD 1-3/枚。' },
        { q: '生産期間は? 急ぎできますか?', a: '標準7-10営業日、急ぎ5日 (+30%)。披露宴1ヶ月前発注推奨、繁忙期 (5月/10-12月) 2ヶ月前。' },
        { q: '招待状 + 封筒 + 引出物袋 一括注文できますか? セット割は?', a: '可能です。ZprintProブライダルセット — 招待状+封筒+引出物袋+席札+テーブルカード+ウェルカムボード+紅包、10%セット割引。WhatsApp 19880851334 セット見積。' },
        { q: 'サンプルはもらえますか? 校正費は?', a: '5素材サンプル無料 (順豊着払い)。デジタル校正 (1枚実物) HKD 200-500、100枚以上発注で全額返金。' },
      ],
    },
};

const placeCardsContent: Record<string, CategoryLocaleContent> = {
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

export const categorySeoContent: CategorySeoData = {
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
};
