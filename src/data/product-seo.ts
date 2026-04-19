/**
 * 产品 SEO 数据
 * 包含全部 78 个产品的 FAQ、长描述、关键词、印刷流程等 E-E-A-T 内容
 */

export interface ProductSeoData {
  slug: string;
  keywords: {
    'zh-hk': string;
    en: string;
    ja: string;
  };
  h1Suffix: {
    'zh-hk': string;
    en: string;
    ja: string;
  };
  longDescription: {
    'zh-hk': string;
    en: string;
    ja: string;
  };
  faq: {
    'zh-hk': { q: string; a: string }[];
    en: { q: string; a: string }[];
    ja: { q: string; a: string }[];
  };
  processSteps: {
    'zh-hk': { name: string; text: string }[];
    en: { name: string; text: string }[];
    ja: { name: string; text: string }[];
  };
  relatedBlogSlug?: string;
  reviews?: {
    ratingValue: number;
    reviewCount: number;
    items: { author: string; date: string; content: string; rating: number }[];
  };
}

export const allProductSeo: Record<string, ProductSeoData> = {
  'premium-business-cards': {
    slug: 'premium-business-cards',
    keywords: {
      'zh-hk': '名片印刷,香港名片,商務名片定制,快印名片,咭片印刷,高級名片,公司名片印刷,名片設計,急印名片,即日名片,印刷即日速遞送貨,名片製作,卡片印刷,企業名片,燙金名片,UV名片,厚紙名片',
      'en': 'business card printing,custom business cards,name card printing,premium business cards,same day business cards,company cards,design business cards online,cheap business cards fast,foil business cards,embossed business cards,rush business cards,hong kong business card printing,business card maker',
      'ja': '名刺印刷,名刺作成,オーダーメイド名刺,高級名刺,即日名刺,急ぎ名刺,会社名刺,名刺デザイン,箔押し名刺,厚紙名刺,エンボス名刺,香港名刺印刷,名刺印刷 格安',
    },
    h1Suffix: {
      'zh-hk': '香港頂級商務名片定制專家 | 智印港',
      'en': 'Premium Business Card Printing Hong Kong | ZprintPro',
      'ja': '香港高級名刺印刷のプロ | ZprintPro',
    },
    longDescription: {
      'zh-hk': '在競爭激烈的香港商業環境中，一張質感非凡的名片是您品牌的第一張臉。智印港深知這一點，因此我們提供多種高級紙張選擇，包括350gsm的剛古紙、觸感細膩的荷蘭白卡以及奢華的棉絨紙。我們的名片印刷服務不僅注重材質，更在工藝上精益求精。無論是彰顯尊貴的燙金工藝，還是增加立體觸感的局部UV，我們都能為您完美呈現。支持印刷即日速遞送貨，確保您的急單也能準時交付。',
      'en': 'In Hong Kong\'s competitive business environment, a premium business card is your brand\'s first impression. ZprintPro offers high-quality paper options including 350gsm Conqueror paper, Dutch white card, and luxurious cotton paper. We also offer same-day rush printing and delivery.',
      'ja': '香港の競争激しいビジネス環境において、高品質な名刺はブランドの第一印象です。ZprintProは350gsmコンカラー紙、オランダ白カード、豪華なコットン紙などをご用意。急行印刷・即日配送も対応します。',
    },
    faq: {
      'zh-hk': [
        { q: '名片印刷的起訂量是多少？', a: '我們支持靈活起訂，最低僅需100張。對於數碼打樣，也提供50張的小量服務。' },
        { q: '名片印刷需要多長時間？', a: '標準交貨時間3-5個工作日。如需急件，可選擇24小時快印服務，支持印刷即日速遞送貨。' },
        { q: '你們支持哪些紙張材質？', a: '我們提供300g銅版紙、350g剛古紙、荷蘭白卡、棉紙、合成紙等多種材質。' },
        { q: '名片設計文件有什麼要求？', a: '請提供AI、PSD、PDF或高解析度JPG/PNG文件，解析度至少300dpi，並預留3mm出血位。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity for business cards?', a: 'We support flexible ordering with a minimum of just 100 cards. Digital proofing available from 50 cards.' },
        { q: 'How long does business card printing take?', a: 'Standard delivery is 3-5 business days. For rush orders, we offer 24-hour express printing with same-day delivery.' },
        { q: 'What paper materials do you support?', a: 'We offer 300g glossy art paper, 350g Conqueror paper, Dutch white card, cotton paper, and more.' },
        { q: 'What are the design file requirements?', a: 'Please provide AI, PSD, PDF, or high-resolution JPG/PNG files at 300dpi minimum, with 3mm bleed area.' },
      ],
      'ja': [
        { q: '名刺印刷の最小発注数は？', a: '柔軟な発注に対応しており、最低100枚から。デジタル校正用に50枚の少量サービスもご用意しています。' },
        { q: '名刺印刷の納期は？', a: '標準納期は3〜5営業日です。急ぎの場合は24時間急行印刷・即日配送も可能です。' },
        { q: '対応している紙の種類は？', a: '300gコート紙、350gコンカラー紙、オランダ白カード、コットン紙、合成紙などをご用意しています。' },
        { q: 'デザインファイルの要件は？', a: 'AI、PSD、PDF、または高解像度JPG/PNG（最低300dpi）をご用意ください。3mmのbleedを含めてください。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '客戶提供設計稿，專業團隊進行文件檢查，確保色彩模式和解析度符合印刷標準。' },
        { name: '數碼打樣', text: '根據需求提供數碼樣或傳統打樣，讓客戶在批量生產前確認顏色和效果。' },
        { name: '印刷生產', text: '採用德國海德堡印刷機進行四色印刷，配合專業色彩管理，確保色彩準確還原。' },
        { name: '表面處理', text: '根據選擇的工藝進行啞膠、光膠、局部UV或燙金等表面處理。' },
        { name: '裁切成品', text: '使用精密裁切設備，確保每張名片尺寸精準，邊緣整齊。' },
        { name: '質檢包裝', text: '每批產品經過QC檢驗後，使用專用包裝盒保護，確保運輸過程中不受損。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Our professional team checks your design files to ensure color mode and resolution meet printing standards.' },
        { name: 'Digital Proofing', text: 'We provide digital or traditional proofing based on your needs.' },
        { name: 'Printing Production', text: 'Using Heidelberg presses with professional color management.' },
        { name: 'Surface Finishing', text: 'Matte lamination, glossy lamination, spot UV, or foil stamping.' },
        { name: 'Precision Cutting', text: 'Precision cutting equipment ensures accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Each batch undergoes QC inspection before protective packaging.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'お客様のデザインデータを専門チームがチェックし、カラーモードと解像度が印刷基準を満たしているか確認します。' },
        { name: 'デジタル校正', text: 'ご要望に応じてデジタル校正または伝統的な校正を提供します。' },
        { name: '印刷生産', text: 'ハイデルベルグ印刷機とプロのカラーマネジメントを使用します。' },
        { name: '表面加工', text: 'マットラミネーション、グロスラミネーション、局部UV、箔押しなど。' },
        { name: '精密裁断', text: '精密裁断設備により、各名刺の寸法と端の仕上がりを正確に保証します。' },
        { name: '品質検査・梱包', text: '全ロットをQC検査後、専用箱に梱包し、輸送中の損傷を防ぎます。' },
      ],
    },
  },
  'foil-business-cards': {
    slug: 'foil-business-cards',
    keywords: {
      'zh-hk': '燙金名片,金屬色名片,奢華名片,燙印工藝,香港燙金,燙銀名片,玫瑰金名片,公司燙金名片,高級燙金名片,凹凸燙金名片,印刷即日速遞送貨',
      'en': 'foil stamped business cards,metallic business cards,luxury name cards,gold foil printing hong kong,silver foil business cards,rose gold business cards,corporate foil cards,premium foil stamped cards,embossed foil business cards,same day foil business cards',
      'ja': '箔押し名刺,メタリック名刺,高級名刺,ゴールド箔押し,シルバー箔押し名刺,ローズゴールド名刺,会社用箔押し名刺,プレミアム箔押し名刺,エンボス箔押し名刺,即日箔押し名刺',
    },
    h1Suffix: {
      'zh-hk': '奢華燙金名片定制服務 | 智印港',
      'en': 'Luxury Foil Stamped Business Cards | ZprintPro',
      'ja': '豪華箔押し名刺印刷 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '想要在众多名片中脱颖而出？燙金工藝是您的不二之選。這種傳統的凸版印刷工藝，通過高溫將金屬箔壓印在紙張表面，形成強烈的凹凸質感。在香港，無論是律師樓、會計師事務所還是高端地產代理，都偏愛使用燙金名片來展示其專業與權威。智印港提供專業的燙金服務，支持印刷即日速遞送貨，確保每一處細節都完美無瑕。',
      'en': 'Want to stand out from the crowd? Foil stamping uses heat to press metallic foil onto paper, creating a strong embossed texture. ZprintPro offers expert foil stamping with precise registration and same-day rush delivery options.',
      'ja': '群衆の中で目立ちたいですか？箔押し加工は熱で金属箔を紙に圧着し、強い凹凸の質感を生み出します。ZprintProは高精度の箔押しサービスを提供し、急行・即日配送にも対応します。',
    },
    faq: {
      'zh-hk': [
        { q: '燙金工藝有幾種顏色可選？', a: '除了經典的亮金和亮銀，我們還提供啞金、紅金、古銅色以及各種Pantone專色電化鋁。' },
        { q: '燙金名片可以燙雙面嗎？', a: '可以。我們支持單面燙金、雙面燙金，以及正面燙金+背面燙銀的組合效果。' },
        { q: '燙金名片的紙張有什麼要求？', a: '建議使用350g以上的厚紙，表面平滑度高的紙張燙金效果更好。我們推薦剛古紙或荷蘭白卡。' },
        { q: '燙金名片的交貨時間？', a: '燙金工藝需要額外製版時間，標準交貨5-7個工作日。急件可安排3日快印，支持印刷即日速遞送貨。' },
      ],
      'en': [
        { q: 'How many foil colors are available?', a: 'Besides classic bright gold and silver, we also offer matte gold, rose gold, bronze, and various Pantone spot color foils.' },
        { q: 'Can foil stamping be done on both sides?', a: 'Yes. We support single-sided, double-sided foil stamping, and combinations like gold front + silver back.' },
        { q: 'What paper requirements are there for foil cards?', a: 'We recommend 350gsm+ thick paper with smooth surface. Conqueror paper or Dutch white card are ideal.' },
        { q: 'What is the delivery time for foil business cards?', a: 'Standard delivery is 5-7 business days. Rush orders available in 3 days with same-day delivery.' },
      ],
      'ja': [
        { q: '箔押しの色は何種類ありますか？', a: '定番の輝く金・銀の他、マットゴールド、ローズゴールド、ブロンズ、各種Pantone専色箔もご用意しています。' },
        { q: '両面箔押しは可能ですか？', a: 'はい。片面箔押し、両面箔押し、表金・裏銀の組み合わせにも対応しています。' },
        { q: '箔押し名刺の紙の要件は？', a: '350g以上の厚紙で、表面が滑らかな紙が最適です。コンカラー紙やオランダ白カードを推奨します。' },
        { q: '箔押し名刺の納期は？', a: '版作成に追加時間が必要で、標準納期は5〜7営業日です。急行注文は3日対応・即日配送可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計稿確認', text: '確認燙金位置、圖案和顏色，製作專用燙金版。' },
        { name: '燙金版製作', text: '根據設計製作高精度燙金銅版，確保細節清晰。' },
        { name: '試燙調色', text: '進行試燙，調整溫度和壓力，確保燙金效果完美。' },
        { name: '批量燙金', text: '使用自動燙金機進行批量生產，每張精準對位。' },
        { name: '質檢包裝', text: '檢查燙金牢固度和光澤度，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm foil placement, pattern, and color. Create dedicated foil stamping plate.' },
        { name: 'Plate Making', text: 'Create high-precision copper foil stamping plate based on design.' },
        { name: 'Test Stamping', text: 'Conduct test stamping, adjust temperature and pressure.' },
        { name: 'Bulk Production', text: 'Use automatic foil stamping machine for bulk production.' },
        { name: 'QC & Packaging', text: 'Inspect foil adhesion and gloss, then package for delivery.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '箔押し位置、パターン、色を確認し、専用の箔押し版を作成します。' },
        { name: '版作成', text: 'デザインに基づき高精度の銅箔押し版を作成します。' },
        { name: '試し押し', text: '試し押しを行い、温度と圧力を調整します。' },
        { name: '量産', text: '自動箔押し機で量産し、各枚を精密に位置合わせします。' },
        { name: '品質検査・梱包', text: '箔の密着性と光沢を検査し、出荷します。' },
      ],
    },
  },
  'spot-uv-business-cards': {
    slug: 'spot-uv-business-cards',
    keywords: {
      'zh-hk': '局部UV名片,凸字名片,紋理名片,特殊工藝名片,光油名片,UV名片,立體UV名片,磨砂UV名片,啞光UV名片,創意UV名片,印刷即日速遞送貨',
      'en': 'spot UV business cards,embossed business cards,textured name cards,special finish cards,glossy UV cards,raised spot UV cards,matte UV business cards,creative UV business cards,premium spot UV cards,same day UV business cards',
      'ja': '局部UV名刺,エンボス名刺,テクスチャ名刺,特殊加工名刺,グロスUV名刺, raised UV名刺,マットUV名刺,クリエイティブUV名刺,プレミアム局部UV名刺,即日UV名刺',
    },
    h1Suffix: {
      'zh-hk': '創意局部UV名片設計 | 智印港',
      'en': 'Creative Spot UV Business Cards | ZprintPro',
      'ja': 'クリエイティブ局部UV名刺 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '局部UV（Spot UV）是一種極具現代感的印刷工藝。它通過在名片的特定圖案上覆蓋一層透明的高光油墨，使其在啞面底紙上形成鮮明的對比。這種工藝不僅增加了名片的視覺層次感，更帶來了獨特的指尖觸感。在香港的創意設計、時尚品牌和科技初創公司中，局部UV名片非常流行。智印港擁有先進的過油機，支持印刷即日速遞送貨。',
      'en': 'Spot UV applies a transparent glossy coating to specific areas of the business card, creating striking contrast against a matte background. This adds visual depth and unique tactile experience. ZprintPro uses advanced coating machines and offers same-day rush delivery.',
      'ja': '局部UVは名刺の特定部分に透明な光沢コーティングを施し、マットな背景と鮮やかなコントラストを生み出します。視覚的な奥行きと独特の触覚体験を提供します。ZprintProは先進的なコーティング設備を使用し、急行・即日配送にも対応します。',
    },
    faq: {
      'zh-hk': [
        { q: '局部UV會很容易刮花嗎？', a: '優質的局部UV塗層經過紫外線固化，硬度非常高，耐磨性極佳。日常使用中非常耐用。' },
        { q: '局部UV可以和其他工藝同時使用嗎？', a: '可以。局部UV經常與啞膠、燙金等工藝搭配使用，創造更豐富的視覺效果。' },
        { q: '局部UV的設計有什麼注意事項？', a: '局部UV區域建議不要太細小（最少0.5mm），建議與大面積啞面形成對比。' },
      ],
      'en': [
        { q: 'Is spot UV easily scratched?', a: 'High-quality spot UV coating is cured with ultraviolet light, making it very hard and wear-resistant.' },
        { q: 'Can spot UV be combined with other finishes?', a: 'Yes. Spot UV is often combined with matte lamination, foil stamping, and other processes.' },
        { q: 'What are the design considerations for spot UV?', a: 'Spot UV areas should not be too small (minimum 0.5mm). It works best when contrasting with large matte areas.' },
      ],
      'ja': [
        { q: '局部UVは傷つきやすいですか？', a: '高品質の局部UVコーティングは紫外線硬化により非常に硬く、耐摩耗性に優れています。' },
        { q: '他の加工と組み合わせられますか？', a: 'はい。局部UVはマットラミネーションや箔押しなどと組み合わせて使用することが一般的です。' },
        { q: 'デザイン上の注意点は？', a: '局部UV部分はあまり細かくしないよう（最少0.5mm）、大きなマット面との対比が効果的です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '印刷底紋', text: '先印刷名片的底色和圖案，通常使用啞面處理。' },
        { name: 'UV版製作', text: '根據設計製作專用UV版，確保局部光油位置精準。' },
        { name: '局部上光', text: '在指定區域精準塗布UV光油，形成高光效果。' },
        { name: 'UV固化', text: '通過UV燈瞬間固化，形成耐磨保護層。' },
        { name: '質檢包裝', text: '檢查UV層均勻度和光澤度，確保無氣泡、不粘花。' },
      ],
      'en': [
        { name: 'Base Printing', text: 'Print the base color and pattern of the card, usually with matte finish.' },
        { name: 'UV Plate Making', text: 'Create dedicated UV plate for areas requiring gloss coating.' },
        { name: 'Spot Coating', text: 'Precisely apply UV varnish to designated areas for glossy effect.' },
        { name: 'UV Curing', text: 'Instant curing via UV lamp exposure, creating wear-resistant coating.' },
        { name: 'Quality Check', text: 'Inspect UV layer uniformity and gloss, ensuring no bubbles or sticking.' },
      ],
      'ja': [
        { name: '下地印刷', text: '名刺の底色とパターンを印刷し、通常はマット仕上げにします。' },
        { name: 'UV版作成', text: '光沢コーティングが必要な部分用の専用UV版を作成します。' },
        { name: '局部コーティング', text: '指定された部分にUVワニスを精密に塗布し、光沢効果を出します。' },
        { name: 'UV硬化', text: 'UVランプで瞬間硬化させ、耐摩耗性のあるコーティングを形成します。' },
        { name: '品質検査', text: 'UV層の均一性と光沢を検査し、気泡やべたつきがないことを確認します。' },
      ],
    },
  },
  'rounded-corner-cards': {
    slug: 'rounded-corner-cards',
    keywords: {
      'zh-hk': '圓角名片印刷,圓角咭片,圓角名片設計,圓角商務名片,圓角卡片制作,圓角名片訂造,圓角名片香港,圓角名片報價,圓角名片速印,圓角名片少量印刷,圓角公司名片,時尚圓角名片',
      'en': 'rounded corner business cards,rounded corner name cards,rounded edge business cards,rounded corner card printing,rounded corner card design,rounded corner cards hong kong,rounded corner business card quote,rounded corner card printing service,modern rounded corner cards',
      'ja': '丸角名刺印刷,丸角名刺,丸角名刺デザイン,丸角名刺香港,丸角名刺見積もり,丸角名刺印刷サービス,おしゃれ丸角名刺,モダン丸角名刺',
    },
    h1Suffix: {
      'zh-hk': '時尚圓角名片定制 | 智印港',
      'en': 'Stylish Rounded Corner Business Cards | ZprintPro',
      'ja': 'スタイリッシュ角丸名刺 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '圓角名片在香港越來越受歡迎，它打破了傳統直角名片的生硬印象。圓潤的邊緣不僅在視覺上更顯親和與現代，在實際使用中也更不容易刮傷其他卡片或錢包內襯，手感更加舒適。這種設計特別適合注重用戶體驗的品牌，如瑜伽工作室、兒童教育中心、精品咖啡館和設計工作室。智印港提供標準圓角和大圓角選項，支持印刷即日速遞送貨。',
      'en': 'Rounded corner business cards are gaining popularity in Hong Kong, breaking away from the rigid impression of traditional right-angle cards. The smooth edges look more approachable and modern. ZprintPro offers standard and large fillet corner options with same-day rush delivery.',
      'ja': '角丸名刺は香港で人気を集めています。従来の直角名刺の硬い印象を打ち破り、丸みを帯びたエッジが親しみやすくモダンに見えます。ZprintProは標準角丸と大きな角丸の両方に対応し、急行・即日配送も可能です。',
    },
    faq: {
      'zh-hk': [
        { q: '圓角名片的圓角半徑最小是多少？', a: '我們的標準圓角半徑是2mm或3mm。如需更大的圓角，可以定制模切。' },
        { q: '圓角名片可以和其他工藝同時使用嗎？', a: '完全可以。圓角名片可以自由搭配燙金、局部UV、啞膠等任何工藝。' },
        { q: '圓角名片會比普通名片貴嗎？', a: '圓角需要額外的裁切工序，比標準直角名片貴約10-15%，但品質提升非常值得。' },
      ],
      'en': [
        { q: 'What is the minimum corner radius?', a: 'Our standard corner radius is 2mm or 3mm. If you need larger corners, we can do custom die-cutting.' },
        { q: 'Can rounded corners be combined with other finishes?', a: 'Absolutely. Rounded corners can be freely combined with foil stamping, spot UV, matte lamination, or any other process.' },
        { q: 'Are rounded corner cards more expensive?', a: 'Rounded corners require additional cutting steps, costing about 10-15% more than standard right-angle cards.' },
      ],
      'ja': [
        { q: '角丸の最小半径は？', a: '標準の角丸半径は2mmまたは3mmです。より大きな角丸が必要な場合は、カスタムダイカットが可能です。' },
        { q: '他の加工と組み合わせられますか？', a: 'もちろんです。角丸は箔押し、局部UV、マットラミネーションなどと自由に組み合わせられます。' },
        { q: '角丸名刺は通常より高いですか？', a: '角丸には追加の裁切工程が必要で、標準の直角名刺より約10-15%高くなります。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認圓角半徑和裁切位置。' },
        { name: '印刷生產', text: '四色印刷和表面處理。' },
        { name: '圓角裁切', text: '使用專用圓角刀模進行精密裁切。' },
        { name: '質檢包裝', text: '檢查圓角光滑度和尺寸精準度。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm corner radius and cutting positions.' },
        { name: 'Printing', text: 'Four-color printing and surface finishing.' },
        { name: 'Corner Cutting', text: 'Precision cutting with dedicated rounded corner die.' },
        { name: 'QC & Packaging', text: 'Inspect corner smoothness and dimensional accuracy.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '角丸半径と裁切位置を確認します。' },
        { name: '印刷', text: '4色印刷と表面加工を行います。' },
        { name: '角丸裁断', text: '専用の角丸ダイを使用して精密に裁断します。' },
        { name: '品質検査・梱包', text: '角丸の滑らかさと寸法精度を検査します。' },
      ],
    },
  },
  'waterproof-stickers': {
    slug: 'waterproof-stickers',
    keywords: {
      'zh-hk': '防水貼紙,耐用標籤,戶外貼紙,食品標籤,香港貼紙印刷,產品標籤貼紙,電商包裝貼紙,車身防水貼紙,透明防水貼紙,圓形防水貼紙,異形防水貼紙,印刷即日速遞送貨',
      'en': 'waterproof stickers,durable labels,outdoor stickers,food labels,Hong Kong sticker printing,product label stickers,ecommerce packaging stickers,car bumper stickers,transparent waterproof stickers,round waterproof stickers,die cut waterproof stickers,same day sticker printing',
      'ja': '防水ステッカー,耐久ラベル,屋外ステッカー,食品ラベル,香港 ステッカー印刷,商品ラベル,梱包用シール,車用防水ステッカー,透明防水シール,円形防水シール,ダイカット防水シール,即日シール印刷',
    },
    h1Suffix: {
      'zh-hk': '專業防水貼紙印刷 | 智印港',
      'en': 'Professional Waterproof Sticker Printing | ZprintPro',
      'ja': 'プロ防水ステッカー印刷 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '防水貼紙是產品標籤和戶外廣告的首選。採用合成紙或PET材質配合防水膠水，即使浸泡雨水、接觸油污、曝曬紫外線也不會褪色或脫落。在香港潮濕的氣候中，防水貼紙尤為重要。智印港使用進口日本合成紙，配合特製膠水，即使放置在冰箱、浴室或戶外環境中，也能保持粘性和色彩鮮豔度。支持印刷即日速遞送貨。',
      'en': 'Waterproof stickers are the top choice for product labels and outdoor advertising. Made with synthetic paper or PET material and waterproof adhesive, they withstand rain, oil, and UV exposure. ZprintPro uses imported Japanese synthetic paper with specially formulated adhesive. Same-day rush delivery available.',
      'ja': '防水ステッカーは製品ラベルや屋外広告の首选です。合成紙やPET素材に防水粘着剤を使用し、雨水、油、紫外線にも耐えます。ZprintProは輸入の日本製合成紙と特製粘着剤を使用。急行・即日配送も対応します。',
    },
    faq: {
      'zh-hk': [
        { q: '防水貼紙真的可以泡水嗎？', a: '是的。我們的防水貼紙採用合成紙配合防水膠水，可以承受短時間浸泡。適合冰箱、浴室等潮濕環境。' },
        { q: '防水貼紙的最小訂購量是多少？', a: '一般為100張起訂。部分特殊工藝需500張起。' },
        { q: '防水貼紙可以模切成任意形狀嗎？', a: '可以。我們支持圓形、方形、異形等各種模切形狀，甚至複雜鏤空設計。' },
        { q: '防水貼紙的交貨時間多久？', a: '標準3-5個工作日。急件可安排即日交貨，支持印刷即日速遞送貨。' },
      ],
      'en': [
        { q: 'Can waterproof stickers really be submerged in water?', a: 'Yes. Our waterproof stickers use synthetic paper with waterproof adhesive and can withstand short-term immersion.' },
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Some special processes require 500 pieces.' },
        { q: 'Can waterproof stickers be die-cut into any shape?', a: 'Yes. We support circular, square, custom die-cut shapes, and even complex镂空 designs.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Rush same-day delivery available.' },
      ],
      'ja': [
        { q: '防水ステッカーは本当に水に浸かっても大丈夫ですか？', a: 'はい。合成紙と防水粘着剤を使用しており、短時間の浸水に耐えられます。' },
        { q: '最小発注数は？', a: '一般的に100枚から。特殊加工の場合は500枚から。' },
        { q: '任意の形状にダイカットできますか？', a: 'はい。円形、方形、カスタム形状、複雑な透かしデザインにも対応しています。' },
        { q: '納期はどのくらい？', a: '標準3〜5営業日。急行の当日配送も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認貼紙尺寸、形狀和設計稿。' },
        { name: '印刷生產', text: '使用耐水油墨進行四色印刷。' },
        { name: '覆膜保護', text: '可選光膜或啞膜覆膜，增加耐磨性。' },
        { name: '模切成型', text: '使用激光刀模進行精準模切。' },
        { name: '質檢包裝', text: '進行防水測試和粘性測試，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm sticker size, shape, and design files.' },
        { name: 'Printing', text: 'Four-color printing with water-resistant ink.' },
        { name: 'Lamination', text: 'Optional glossy or matte lamination for durability.' },
        { name: 'Die Cutting', text: 'Precision die-cutting with laser die.' },
        { name: 'QC & Packaging', text: 'Waterproof and adhesion testing before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'ステッカーのサイズ、形状、デザインデータを確認します。' },
        { name: '印刷', text: '耐水インクで4色印刷します。' },
        { name: 'ラミネーション', text: 'グロスまたはマットラミネーションで耐久性を向上させます。' },
        { name: 'ダイカット', text: 'レーザーダイで精密に裁断します。' },
        { name: '品質検査・梱包', text: '防水性と粘着性テストを実施し、出荷します。' },
      ],
    },
  },


  'thick-business-cards-400g': {
    slug: 'thick-business-cards-400g',
    keywords: {
      'zh-hk': '400g厚咭片印刷,厚身名片,超厚名片,400克名片,厚紙名片印刷,厚咭片訂造,厚咭片設計,厚咭片香港,厚咭片報價,厚咭片速印,厚咭片少量印刷,高級厚咭片,400g咭片,厚身咭片印刷',
      'en': '400g business card printing,thick business cards,heavy business cards,400gsm business cards,ultra thick business cards,custom thick business cards,thick business card design,thick business cards hong kong,thick business card quote,thick business card printing service,premium thick business cards,400g card printing',
      'ja': '400g名刺印刷,厚紙名刺,ヘビー名刺,400gsm名刺,超厚紙名刺,カスタム厚紙名刺,厚紙名刺デザイン,厚紙名刺香港,厚紙名刺見積もり,厚紙名刺印刷サービス',
    },
    h1Suffix: {
      'zh-hk': '專業厚身咭片(400g)服務 | 智印港',
      en: 'Professional Thick Business Cards (400g) | ZprintPro',
      ja: 'プロ厚紙名刺(400g) | ZprintPro',
    },
    longDescription: {
      'zh-hk': '400g超厚紙質，厚實手感彰顯尊貴品質。特別適合高端服務業、設計師、律師等專業人士。智印港提供專業的厚身咭片(400g)服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: '400g ultra-thick paper with substantial feel. Perfect for high-end service industry, designers, lawyers. ZprintPro offers professional Thick Business Cards (400g) services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '400g超厚紙、重厚な質感。高級サービス業、デザイナー、弁護士向け。 ZprintProは高品質な素材と先進的な印刷技術を使用した厚紙名刺(400g)サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '這款名片的起訂量是多少？', a: '我們支持靈活起訂，最低100張起。對於數碼打樣，也提供50張的小量服務。' },
        { q: '名片印刷需要多長時間？', a: '標準交貨時間為3-5個工作日。急件可選擇24小時快印服務。' },
        { q: '可以免費設計名片嗎？', a: '我們提供基礎排版服務免費。如需原創設計，可聯繫我們的設計團隊獲取報價。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'We support flexible ordering with a minimum of 100 cards. Digital proofing available from 50 cards.' },
        { q: 'How long does printing take?', a: 'Standard delivery is 3-5 business days. Rush 24-hour service available.' },
        { q: 'Do you offer free design?', a: 'Basic layout service is free. For original design, contact our team for a quote.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '柔軟な発注に対応しており、最低100枚から。デジタル校正用に50枚の少量サービスもご用意しています。' },
        { q: '納期はどのくらい？', a: '標準納期は3〜5営業日です。急ぎの場合は24時間急行印刷も可能です。' },
        { q: '無料デザインはありますか？', a: '基本的な組版サービスは無料です。オリジナルデザインが必要な場合はお見積もりください。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認設計稿的排版、色彩和文字內容無誤。' },
        { name: '數碼打樣', text: '提供數碼樣品供客戶確認顏色和效果。' },
        { name: '印刷生產', text: '使用專業印刷機進行四色印刷。' },
        { name: '表面處理', text: '根據選擇進行啞膠、光膠或其他表面處理。' },
        { name: '裁切成品', text: '精密裁切，確保每張名片尺寸精準。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm layout, colors, and text content.' },
        { name: 'Digital Proofing', text: 'Provide digital proof for color and effect confirmation.' },
        { name: 'Printing', text: 'Four-color printing using professional equipment.' },
        { name: 'Surface Finishing', text: 'Matte, glossy, or other finishes as selected.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions for every card.' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'レイアウト、色、テキスト内容を確認します。' },
        { name: 'デジタル校正', text: '色と効果を確認するためのデジタル校正を提供します。' },
        { name: '印刷', text: 'プロの設備を使用した4色印刷。' },
        { name: '表面加工', text: 'マット、グロス、その他の加工を選択します。' },
        { name: '精密裁断', text: '各名刺の寸法を正確に保証します。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'matte-business-cards': {
    slug: 'matte-business-cards',
    keywords: {
      'zh-hk': '啞膠咭片,香港啞膠,啞膠咭片印刷,香港印刷,啞膠名片,啞面名片,磨砂名片,質感名片,霧面名片,啞光名片印刷',
      en: 'matte laminated cards,matte laminated cards printing hong kong, hong kong matte laminated cards',
      ja: 'マット名刺,香港マット,マット名刺印刷',
    },
    h1Suffix: {
      'zh-hk': '專業啞膠咭片服務 | 智印港',
      en: 'Professional Matte Laminated Cards | ZprintPro',
      ja: 'プロマット名刺 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '啞膠表面處理，低調內斂的質感，不易留下指紋。適合注重細節的專業人士。智印港提供專業的啞膠咭片服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Matte lamination provides understated elegance and resists fingerprints. For detail-oriented professionals. ZprintPro offers professional Matte Laminated Cards services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'マットラミネーション加工、落ち着いた質感で指紋が付きにくい。 ZprintProは高品質な素材と先進的な印刷技術を使用したマット名刺サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '這款名片的起訂量是多少？', a: '我們支持靈活起訂，最低100張起。對於數碼打樣，也提供50張的小量服務。' },
        { q: '名片印刷需要多長時間？', a: '標準交貨時間為3-5個工作日。急件可選擇24小時快印服務。' },
        { q: '可以免費設計名片嗎？', a: '我們提供基礎排版服務免費。如需原創設計，可聯繫我們的設計團隊獲取報價。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'We support flexible ordering with a minimum of 100 cards. Digital proofing available from 50 cards.' },
        { q: 'How long does printing take?', a: 'Standard delivery is 3-5 business days. Rush 24-hour service available.' },
        { q: 'Do you offer free design?', a: 'Basic layout service is free. For original design, contact our team for a quote.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '柔軟な発注に対応しており、最低100枚から。デジタル校正用に50枚の少量サービスもご用意しています。' },
        { q: '納期はどのくらい？', a: '標準納期は3〜5営業日です。急ぎの場合は24時間急行印刷も可能です。' },
        { q: '無料デザインはありますか？', a: '基本的な組版サービスは無料です。オリジナルデザインが必要な場合はお見積もりください。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認設計稿的排版、色彩和文字內容無誤。' },
        { name: '數碼打樣', text: '提供數碼樣品供客戶確認顏色和效果。' },
        { name: '印刷生產', text: '使用專業印刷機進行四色印刷。' },
        { name: '表面處理', text: '根據選擇進行啞膠、光膠或其他表面處理。' },
        { name: '裁切成品', text: '精密裁切，確保每張名片尺寸精準。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm layout, colors, and text content.' },
        { name: 'Digital Proofing', text: 'Provide digital proof for color and effect confirmation.' },
        { name: 'Printing', text: 'Four-color printing using professional equipment.' },
        { name: 'Surface Finishing', text: 'Matte, glossy, or other finishes as selected.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions for every card.' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'レイアウト、色、テキスト内容を確認します。' },
        { name: 'デジタル校正', text: '色と効果を確認するためのデジタル校正を提供します。' },
        { name: '印刷', text: 'プロの設備を使用した4色印刷。' },
        { name: '表面加工', text: 'マット、グロス、その他の加工を選択します。' },
        { name: '精密裁断', text: '各名刺の寸法を正確に保証します。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'double-sided-cards': {
    slug: 'double-sided-cards',
    keywords: {
      'zh-hk': '雙面名片印刷,雙面咭片,雙面名片設計,雙面商務名片,雙面卡片印刷,雙面名片訂造,雙面名片香港,雙面名片報價,雙面名片速印,雙面名片少量印刷,雙面公司名片,雙面彩色名片',
      'en': 'double sided business cards,double sided name cards,double sided card printing,double sided business card design,double sided cards hong kong,double sided business card quote,double sided card printing service,two sided business cards,full color double sided cards',
      'ja': '両面名刺印刷,両面名刺,両面名刺デザイン,両面名刺香港,両面名刺見積もり,両面名刺印刷サービス,フルカラー両面名刺,両面ビジネスカード',
    },
    h1Suffix: {
      'zh-hk': '專業雙面咭片服務 | 智印港',
      en: 'Professional Double-sided Cards | ZprintPro',
      ja: 'プロ両面名刺 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '雙面全彩印刷，充分利用空間展示更多信息。背面可印公司理念、產品介紹或聯絡方式。智印港提供專業的雙面咭片服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Double-sided full color printing maximizes space for information. Back can show company values, products, or contact details. ZprintPro offers professional Double-sided Cards services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '両面フルカラー印刷で情報スペースを最大限に活用。 ZprintProは高品質な素材と先進的な印刷技術を使用した両面名刺サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '這款名片的起訂量是多少？', a: '我們支持靈活起訂，最低100張起。對於數碼打樣，也提供50張的小量服務。' },
        { q: '名片印刷需要多長時間？', a: '標準交貨時間為3-5個工作日。急件可選擇24小時快印服務。' },
        { q: '可以免費設計名片嗎？', a: '我們提供基礎排版服務免費。如需原創設計，可聯繫我們的設計團隊獲取報價。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'We support flexible ordering with a minimum of 100 cards. Digital proofing available from 50 cards.' },
        { q: 'How long does printing take?', a: 'Standard delivery is 3-5 business days. Rush 24-hour service available.' },
        { q: 'Do you offer free design?', a: 'Basic layout service is free. For original design, contact our team for a quote.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '柔軟な発注に対応しており、最低100枚から。デジタル校正用に50枚の少量サービスもご用意しています。' },
        { q: '納期はどのくらい？', a: '標準納期は3〜5営業日です。急ぎの場合は24時間急行印刷も可能です。' },
        { q: '無料デザインはありますか？', a: '基本的な組版サービスは無料です。オリジナルデザインが必要な場合はお見積もりください。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認設計稿的排版、色彩和文字內容無誤。' },
        { name: '數碼打樣', text: '提供數碼樣品供客戶確認顏色和效果。' },
        { name: '印刷生產', text: '使用專業印刷機進行四色印刷。' },
        { name: '表面處理', text: '根據選擇進行啞膠、光膠或其他表面處理。' },
        { name: '裁切成品', text: '精密裁切，確保每張名片尺寸精準。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm layout, colors, and text content.' },
        { name: 'Digital Proofing', text: 'Provide digital proof for color and effect confirmation.' },
        { name: 'Printing', text: 'Four-color printing using professional equipment.' },
        { name: 'Surface Finishing', text: 'Matte, glossy, or other finishes as selected.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions for every card.' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'レイアウト、色、テキスト内容を確認します。' },
        { name: 'デジタル校正', text: '色と効果を確認するためのデジタル校正を提供します。' },
        { name: '印刷', text: 'プロの設備を使用した4色印刷。' },
        { name: '表面加工', text: 'マット、グロス、その他の加工を選択します。' },
        { name: '精密裁断', text: '各名刺の寸法を正確に保証します。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'same-day-business-cards': {
    slug: 'same-day-business-cards',
    keywords: {
      'zh-hk': '即日咭片印刷,香港即日印刷,香港印刷,印刷即日速遞送貨,即日名片,急印名片,24小時名片,當天名片,快印名片,即日取名片',
      en: 'same-day business cards,same-day business cards printing hong kong, hong kong same-day business cards',
      ja: '即日名刺,香港即日,即日名刺印刷',
    },
    h1Suffix: {
      'zh-hk': '專業即日咭片印刷服務 | 智印港',
      en: 'Professional Same-day Business Cards | ZprintPro',
      ja: 'プロ即日名刺 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '緊急需求首選，最快4小時取貨，支持印刷即日速遞送貨。品質不打折，急件也能展現專業形象。智印港提供專業的即日咭片印刷服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Emergency orders, ready in 4 hours. Quality not compromised, rush orders still look professional. ZprintPro offers professional Same-day Business Cards services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '緊急注文に最適、最短4時間で受取。品質を損なわず。 ZprintProは高品質な素材と先進的な印刷技術を使用した即日名刺サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '這款名片的起訂量是多少？', a: '我們支持靈活起訂，最低100張起。對於數碼打樣，也提供50張的小量服務。' },
        { q: '名片印刷需要多長時間？', a: '標準交貨時間為3-5個工作日。急件可選擇24小時快印服務。' },
        { q: '可以免費設計名片嗎？', a: '我們提供基礎排版服務免費。如需原創設計，可聯繫我們的設計團隊獲取報價。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'We support flexible ordering with a minimum of 100 cards. Digital proofing available from 50 cards.' },
        { q: 'How long does printing take?', a: 'Standard delivery is 3-5 business days. Rush 24-hour service available.' },
        { q: 'Do you offer free design?', a: 'Basic layout service is free. For original design, contact our team for a quote.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '柔軟な発注に対応しており、最低100枚から。デジタル校正用に50枚の少量サービスもご用意しています。' },
        { q: '納期はどのくらい？', a: '標準納期は3〜5営業日です。急ぎの場合は24時間急行印刷も可能です。' },
        { q: '無料デザインはありますか？', a: '基本的な組版サービスは無料です。オリジナルデザインが必要な場合はお見積もりください。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認設計稿的排版、色彩和文字內容無誤。' },
        { name: '數碼打樣', text: '提供數碼樣品供客戶確認顏色和效果。' },
        { name: '印刷生產', text: '使用專業印刷機進行四色印刷。' },
        { name: '表面處理', text: '根據選擇進行啞膠、光膠或其他表面處理。' },
        { name: '裁切成品', text: '精密裁切，確保每張名片尺寸精準。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm layout, colors, and text content.' },
        { name: 'Digital Proofing', text: 'Provide digital proof for color and effect confirmation.' },
        { name: 'Printing', text: 'Four-color printing using professional equipment.' },
        { name: 'Surface Finishing', text: 'Matte, glossy, or other finishes as selected.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions for every card.' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'レイアウト、色、テキスト内容を確認します。' },
        { name: 'デジタル校正', text: '色と効果を確認するためのデジタル校正を提供します。' },
        { name: '印刷', text: 'プロの設備を使用した4色印刷。' },
        { name: '表面加工', text: 'マット、グロス、その他の加工を選択します。' },
        { name: '精密裁断', text: '各名刺の寸法を正確に保証します。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'eco-business-cards': {
    slug: 'eco-business-cards',
    keywords: {
      'zh-hk': '環保名片印刷,再生紙名片,環保咭片,綠色名片印刷,環保名片訂造,FSC名片,大豆油墨名片,環保名片香港,環保名片設計,環保名片報價,可持續名片,環保名片速印,環保名片少量印刷',
      'en': 'eco business cards,recycled paper business cards,environmentally friendly business cards,green business card printing,eco friendly name cards,sustainable business cards,FSC certified business cards,eco business cards hong kong,eco business card design,eco business card printing service',
      'ja': 'エコ名刺印刷,再生紙名刺,環境に優しい名刺,エコ名刺,持続可能名刺,FSC認証名刺,エコ名刺香港,エコ名刺デザイン,エコ名刺印刷サービス',
    },
    h1Suffix: {
      'zh-hk': '專業環保再生紙咭片服務 | 智印港',
      en: 'Professional Eco-friendly Recycled Cards | ZprintPro',
      ja: 'プロ再生紙名刺 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '採用FSC認證環保再生紙，展現企業社會責任。質樸自然的風格，適合環保品牌。智印港提供專業的環保再生紙咭片服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'FSC-certified recycled paper showing corporate social responsibility. Natural style for eco-friendly brands. ZprintPro offers professional Eco-friendly Recycled Cards services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'FSC認証再生紙、企業の社会的責任を示す。エコブランド向け。 ZprintProは高品質な素材と先進的な印刷技術を使用した再生紙名刺サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '這款名片的起訂量是多少？', a: '我們支持靈活起訂，最低100張起。對於數碼打樣，也提供50張的小量服務。' },
        { q: '名片印刷需要多長時間？', a: '標準交貨時間為3-5個工作日。急件可選擇24小時快印服務。' },
        { q: '可以免費設計名片嗎？', a: '我們提供基礎排版服務免費。如需原創設計，可聯繫我們的設計團隊獲取報價。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'We support flexible ordering with a minimum of 100 cards. Digital proofing available from 50 cards.' },
        { q: 'How long does printing take?', a: 'Standard delivery is 3-5 business days. Rush 24-hour service available.' },
        { q: 'Do you offer free design?', a: 'Basic layout service is free. For original design, contact our team for a quote.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '柔軟な発注に対応しており、最低100枚から。デジタル校正用に50枚の少量サービスもご用意しています。' },
        { q: '納期はどのくらい？', a: '標準納期は3〜5営業日です。急ぎの場合は24時間急行印刷も可能です。' },
        { q: '無料デザインはありますか？', a: '基本的な組版サービスは無料です。オリジナルデザインが必要な場合はお見積もりください。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認設計稿的排版、色彩和文字內容無誤。' },
        { name: '數碼打樣', text: '提供數碼樣品供客戶確認顏色和效果。' },
        { name: '印刷生產', text: '使用專業印刷機進行四色印刷。' },
        { name: '表面處理', text: '根據選擇進行啞膠、光膠或其他表面處理。' },
        { name: '裁切成品', text: '精密裁切，確保每張名片尺寸精準。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm layout, colors, and text content.' },
        { name: 'Digital Proofing', text: 'Provide digital proof for color and effect confirmation.' },
        { name: 'Printing', text: 'Four-color printing using professional equipment.' },
        { name: 'Surface Finishing', text: 'Matte, glossy, or other finishes as selected.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions for every card.' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'レイアウト、色、テキスト内容を確認します。' },
        { name: 'デジタル校正', text: '色と効果を確認するためのデジタル校正を提供します。' },
        { name: '印刷', text: 'プロの設備を使用した4色印刷。' },
        { name: '表面加工', text: 'マット、グロス、その他の加工を選択します。' },
        { name: '精密裁断', text: '各名刺の寸法を正確に保証します。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'transparent-stickers': {
    slug: 'transparent-stickers',
    keywords: {
      'zh-hk': '透明貼紙,香港透明貼紙,透明貼紙印刷,透明標籤,玻璃瓶貼紙,透明防水貼紙,透明圓形貼紙,透明異形貼紙,透明燙金貼紙,透明全息貼紙,印刷即日速遞送貨',
      en: 'transparent stickers,transparent sticker printing hong kong,clear labels,glass bottle stickers,transparent waterproof stickers,transparent round stickers,clear die cut stickers,transparent foil stickers,transparent holographic stickers,same day transparent stickers',
      ja: '透明ステッカー,香港透明ステッカー,透明シール印刷,クリアラベル,ガラス瓶シール,透明防水ステッカー,透明円形シール,透明ダイカットシール,透明箔押しシール,透明ホログラムシール,即日透明シール印刷',
    },
    h1Suffix: {
      'zh-hk': '專業透明貼紙服務 | 智印港',
      en: 'Professional Transparent Stickers | ZprintPro',
      ja: 'プロ透明ステッカー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '透明PET材質，貼合後呈現無感效果，完美展現產品本身，支持印刷即日速遞送貨。適合化妝品、食品包裝、玻璃貼飾。智印港提供專業的透明貼紙服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Transparent PET material creates invisible effect when applied. Perfect for cosmetics, food packaging, glass decoration. ZprintPro offers professional Transparent Stickers services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '透明PET素材、貼り付け後無感効果。化粧品、食品包装、ガラス装飾に最適。 ZprintProは高品質な素材と先進的な印刷技術を使用した透明ステッカーサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '這款貼紙的最小訂購量是多少？', a: '一般為100張起訂，部分特殊工藝需500張起。' },
        { q: '貼紙可以模切成任意形狀嗎？', a: '可以。我們支持圓形、方形、異形等各種模切形狀。' },
        { q: '貼紙的交貨時間多久？', a: '標準3-5個工作日，急件可安排即日交貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Some special processes require 500 pieces.' },
        { q: 'Can stickers be die-cut into custom shapes?', a: 'Yes. We support circular, square, and custom die-cut shapes.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Rush same-day delivery available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100枚から。特殊加工の場合は500枚から。' },
        { q: '任意の形状にダイカットできますか？', a: 'はい。円形、方形、異形など様々なダイカットに対応しています。' },
        { q: '納期はどのくらい？', a: '標準3〜5営業日。急行の当日配送も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認貼紙尺寸、形狀和設計稿。' },
        { name: '印刷生產', text: '使用耐水油墨進行四色印刷。' },
        { name: '覆膜保護', text: '可選光膜或啞膜覆膜，增加耐磨性。' },
        { name: '模切成型', text: '使用激光刀模進行精準模切。' },
        { name: '質檢包裝', text: '進行防水測試和粘性測試，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm sticker size, shape, and design files.' },
        { name: 'Printing', text: 'Four-color printing with water-resistant ink.' },
        { name: 'Lamination', text: 'Optional glossy or matte lamination for durability.' },
        { name: 'Die Cutting', text: 'Precision die-cutting with laser die.' },
        { name: 'QC & Packaging', text: 'Waterproof and adhesion testing before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'ステッカーのサイズ、形状、デザインデータを確認します。' },
        { name: '印刷', text: '耐水インクで4色印刷します。' },
        { name: 'ラミネーション', text: 'グロスまたはマットラミネーションで耐久性を向上させます。' },
        { name: 'ダイカット', text: 'レーザーダイで精密に裁断します。' },
        { name: '品質検査・梱包', text: '防水性と粘着性テストを実施し、出荷します。' },
      ],
    },
  },
  'removable-stickers': {
    slug: 'removable-stickers',
    keywords: {
      'zh-hk': '可移除貼紙印刷,易撕貼紙,無痕貼紙,重複使用貼紙,可再貼貼紙,可移除貼紙訂造,可移除貼紙設計,可移除貼紙香港,可移除貼紙報價,可移除貼紙速印,可移除貼紙少量印刷,不留膠貼紙,玻璃可移除貼',
      'en': 'removable sticker printing,reusable stickers,removable labels,peelable stickers,restickable stickers,custom removable stickers,removable sticker design,removable stickers hong kong,removable sticker quote,removable sticker printing service,no residue stickers,glass removable stickers',
      'ja': '剥がせるステッカー印刷,再利用ステッカー,剥がせるラベル,はがせるステッカー,カスタム剥がせるステッカー,剥がせるステッカーデザイン,剥がせるステッカー香港,剥がせるステッカー見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業可移貼紙(無殘膠)服務 | 智印港',
      en: 'Professional Removable Stickers | ZprintPro',
      ja: 'プロはがせるステッカー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '特殊背膠設計，移除後不留殘膠，保護貼附表面。適合車窗、玻璃櫥窗、短期展覽。智印港提供專業的可移貼紙(無殘膠)服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Special adhesive design leaves no residue when removed. Perfect for car windows, glass displays, short-term exhibitions. ZprintPro offers professional Removable Stickers services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '特殊粘着設計、剥がしても残りません。車窓、ガラス展示、短期展示会に最適。 ZprintProは高品質な素材と先進的な印刷技術を使用したはがせるステッカーサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '這款貼紙的最小訂購量是多少？', a: '一般為100張起訂，部分特殊工藝需500張起。' },
        { q: '貼紙可以模切成任意形狀嗎？', a: '可以。我們支持圓形、方形、異形等各種模切形狀。' },
        { q: '貼紙的交貨時間多久？', a: '標準3-5個工作日，急件可安排即日交貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Some special processes require 500 pieces.' },
        { q: 'Can stickers be die-cut into custom shapes?', a: 'Yes. We support circular, square, and custom die-cut shapes.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Rush same-day delivery available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100枚から。特殊加工の場合は500枚から。' },
        { q: '任意の形状にダイカットできますか？', a: 'はい。円形、方形、異形など様々なダイカットに対応しています。' },
        { q: '納期はどのくらい？', a: '標準3〜5営業日。急行の当日配送も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認貼紙尺寸、形狀和設計稿。' },
        { name: '印刷生產', text: '使用耐水油墨進行四色印刷。' },
        { name: '覆膜保護', text: '可選光膜或啞膜覆膜，增加耐磨性。' },
        { name: '模切成型', text: '使用激光刀模進行精準模切。' },
        { name: '質檢包裝', text: '進行防水測試和粘性測試，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm sticker size, shape, and design files.' },
        { name: 'Printing', text: 'Four-color printing with water-resistant ink.' },
        { name: 'Lamination', text: 'Optional glossy or matte lamination for durability.' },
        { name: 'Die Cutting', text: 'Precision die-cutting with laser die.' },
        { name: 'QC & Packaging', text: 'Waterproof and adhesion testing before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'ステッカーのサイズ、形状、デザインデータを確認します。' },
        { name: '印刷', text: '耐水インクで4色印刷します。' },
        { name: 'ラミネーション', text: 'グロスまたはマットラミネーションで耐久性を向上させます。' },
        { name: 'ダイカット', text: 'レーザーダイで精密に裁断します。' },
        { name: '品質検査・梱包', text: '防水性と粘着性テストを実施し、出荷します。' },
      ],
    },
  },
  'small-batch-stickers': {
    slug: 'small-batch-stickers',
    keywords: {
      'zh-hk': '小批量貼紙印刷,少量貼紙,小量貼紙訂造,低起訂量貼紙,少量貼紙印刷,小批量貼紙訂造,小批量貼紙設計,小批量貼紙香港,小批量貼紙報價,小批量貼紙速印,小批量貼紙少量印刷,10張貼紙,50張貼紙,試印貼紙',
      'en': 'small batch sticker printing,low quantity stickers,small quantity stickers,low minimum stickers,few stickers printing,custom small batch stickers,small batch sticker design,small batch stickers hong kong,small batch sticker quote,small batch sticker printing service,10 stickers,50 stickers,sample stickers',
      'ja': '小ロットステッカー印刷,少量ステッカー,小ロットステッカー,低ロットステッカー,小ロットステッカーデザイン,小ロットステッカー香港,小ロットステッカー見積もり,サンプルステッカー',
    },
    h1Suffix: {
      'zh-hk': '專業小批量貼紙服務 | 智印港',
      en: 'Professional Small Batch Stickers | ZprintPro',
      ja: 'プロ小ロットステッカー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '最低A4尺寸起印，無需大量庫存壓力。適合初創品牌、活動宣傳、個人創作。智印港提供專業的小批量貼紙服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Minimum A4 size order, no bulk inventory pressure. Perfect for startups, event promotion, personal creations. ZprintPro offers professional Small Batch Stickers services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '最小A4サイズから、大量在庫の心配なし。スタートアップ、イベント宣伝、個人創作に最適。 ZprintProは高品質な素材と先進的な印刷技術を使用した小ロットステッカーサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '這款貼紙的最小訂購量是多少？', a: '一般為100張起訂，部分特殊工藝需500張起。' },
        { q: '貼紙可以模切成任意形狀嗎？', a: '可以。我們支持圓形、方形、異形等各種模切形狀。' },
        { q: '貼紙的交貨時間多久？', a: '標準3-5個工作日，急件可安排即日交貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Some special processes require 500 pieces.' },
        { q: 'Can stickers be die-cut into custom shapes?', a: 'Yes. We support circular, square, and custom die-cut shapes.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Rush same-day delivery available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100枚から。特殊加工の場合は500枚から。' },
        { q: '任意の形状にダイカットできますか？', a: 'はい。円形、方形、異形など様々なダイカットに対応しています。' },
        { q: '納期はどのくらい？', a: '標準3〜5営業日。急行の当日配送も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認貼紙尺寸、形狀和設計稿。' },
        { name: '印刷生產', text: '使用耐水油墨進行四色印刷。' },
        { name: '覆膜保護', text: '可選光膜或啞膜覆膜，增加耐磨性。' },
        { name: '模切成型', text: '使用激光刀模進行精準模切。' },
        { name: '質檢包裝', text: '進行防水測試和粘性測試，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm sticker size, shape, and design files.' },
        { name: 'Printing', text: 'Four-color printing with water-resistant ink.' },
        { name: 'Lamination', text: 'Optional glossy or matte lamination for durability.' },
        { name: 'Die Cutting', text: 'Precision die-cutting with laser die.' },
        { name: 'QC & Packaging', text: 'Waterproof and adhesion testing before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'ステッカーのサイズ、形状、デザインデータを確認します。' },
        { name: '印刷', text: '耐水インクで4色印刷します。' },
        { name: 'ラミネーション', text: 'グロスまたはマットラミネーションで耐久性を向上させます。' },
        { name: 'ダイカット', text: 'レーザーダイで精密に裁断します。' },
        { name: '品質検査・梱包', text: '防水性と粘着性テストを実施し、出荷します。' },
      ],
    },
  },
  'die-cut-stickers': {
    slug: 'die-cut-stickers',
    keywords: {
      'zh-hk': '異形模切貼紙,香港異形模切,異形模切貼紙印刷,香港印刷,異形貼紙,模切貼紙,特殊形狀貼紙,自定義形狀貼紙,任意形狀貼紙,logo形狀貼紙',
      en: 'die-cut stickers,die-cut stickers printing hong kong, hong kong die-cut stickers',
      ja: '型抜きステッカー,香港型抜き,型抜きステッカー印刷',
    },
    h1Suffix: {
      'zh-hk': '專業異形模切貼紙服務 | 智印港',
      en: 'Professional Die-cut Stickers | ZprintPro',
      ja: 'プロ型抜きステッカー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '任意形狀模切，讓創意不受限制。可切出Logo形狀、卡通形象等獨特輪廓。智印港提供專業的異形模切貼紙服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Any shape die-cutting, creativity without limits. Can cut logo shapes, cartoon characters, unique contours. ZprintPro offers professional Die-cut Stickers services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '任意形状の型抜き、創作の自由を制限しません。 ZprintProは高品質な素材と先進的な印刷技術を使用した型抜きステッカーサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '這款貼紙的最小訂購量是多少？', a: '一般為100張起訂，部分特殊工藝需500張起。' },
        { q: '貼紙可以模切成任意形狀嗎？', a: '可以。我們支持圓形、方形、異形等各種模切形狀。' },
        { q: '貼紙的交貨時間多久？', a: '標準3-5個工作日，急件可安排即日交貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Some special processes require 500 pieces.' },
        { q: 'Can stickers be die-cut into custom shapes?', a: 'Yes. We support circular, square, and custom die-cut shapes.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Rush same-day delivery available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100枚から。特殊加工の場合は500枚から。' },
        { q: '任意の形状にダイカットできますか？', a: 'はい。円形、方形、異形など様々なダイカットに対応しています。' },
        { q: '納期はどのくらい？', a: '標準3〜5営業日。急行の当日配送も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認貼紙尺寸、形狀和設計稿。' },
        { name: '印刷生產', text: '使用耐水油墨進行四色印刷。' },
        { name: '覆膜保護', text: '可選光膜或啞膜覆膜，增加耐磨性。' },
        { name: '模切成型', text: '使用激光刀模進行精準模切。' },
        { name: '質檢包裝', text: '進行防水測試和粘性測試，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm sticker size, shape, and design files.' },
        { name: 'Printing', text: 'Four-color printing with water-resistant ink.' },
        { name: 'Lamination', text: 'Optional glossy or matte lamination for durability.' },
        { name: 'Die Cutting', text: 'Precision die-cutting with laser die.' },
        { name: 'QC & Packaging', text: 'Waterproof and adhesion testing before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'ステッカーのサイズ、形状、デザインデータを確認します。' },
        { name: '印刷', text: '耐水インクで4色印刷します。' },
        { name: 'ラミネーション', text: 'グロスまたはマットラミネーションで耐久性を向上させます。' },
        { name: 'ダイカット', text: 'レーザーダイで精密に裁断します。' },
        { name: '品質検査・梱包', text: '防水性と粘着性テストを実施し、出荷します。' },
      ],
    },
  },
  'foil-stickers': {
    slug: 'foil-stickers',
    keywords: {
      'zh-hk': '燙金貼紙印刷,金屬貼紙,金箔貼紙,銀箔貼紙,燙印貼紙,燙金貼紙訂造,燙金貼紙設計,燙金貼紙香港,燙金貼紙報價,燙金貼紙速印,燙金貼紙少量印刷,高級燙金貼紙,裝飾燙金貼紙',
      'en': 'foil sticker printing,metallic stickers,gold foil stickers,silver foil stickers,foil stamped stickers,custom foil stickers,foil sticker design,foil stickers hong kong,foil sticker quote,foil sticker printing service,premium foil stickers,decorative foil stickers',
      'ja': '箔押しステッカー印刷,メタリックステッカー,ゴールド箔ステッカー,シルバー箔ステッカー,箔押しステッカー,カスタム箔押しステッカー,箔押しステッカーデザイン,箔押しステッカー香港,箔押しステッカー見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業燙金貼紙服務 | 智印港',
      en: 'Professional Foil Stickers | ZprintPro',
      ja: 'プロ箔押しステッカー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '燙金工藝，讓貼紙呈現高級質感。適合高端產品標籤、禮品包裝、VIP標識。智印港提供專業的燙金貼紙服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Foil stamping gives stickers premium quality feel. Perfect for luxury product labels, gift packaging, VIP badges. ZprintPro offers professional Foil Stickers services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '箔押し加工でステッカーに高級感。高級製品ラベル、ギフト包装、VIPバッジに最適。 ZprintProは高品質な素材と先進的な印刷技術を使用した箔押しステッカーサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '這款貼紙的最小訂購量是多少？', a: '一般為100張起訂，部分特殊工藝需500張起。' },
        { q: '貼紙可以模切成任意形狀嗎？', a: '可以。我們支持圓形、方形、異形等各種模切形狀。' },
        { q: '貼紙的交貨時間多久？', a: '標準3-5個工作日，急件可安排即日交貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Some special processes require 500 pieces.' },
        { q: 'Can stickers be die-cut into custom shapes?', a: 'Yes. We support circular, square, and custom die-cut shapes.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Rush same-day delivery available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100枚から。特殊加工の場合は500枚から。' },
        { q: '任意の形状にダイカットできますか？', a: 'はい。円形、方形、異形など様々なダイカットに対応しています。' },
        { q: '納期はどのくらい？', a: '標準3〜5営業日。急行の当日配送も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認貼紙尺寸、形狀和設計稿。' },
        { name: '印刷生產', text: '使用耐水油墨進行四色印刷。' },
        { name: '覆膜保護', text: '可選光膜或啞膜覆膜，增加耐磨性。' },
        { name: '模切成型', text: '使用激光刀模進行精準模切。' },
        { name: '質檢包裝', text: '進行防水測試和粘性測試，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm sticker size, shape, and design files.' },
        { name: 'Printing', text: 'Four-color printing with water-resistant ink.' },
        { name: 'Lamination', text: 'Optional glossy or matte lamination for durability.' },
        { name: 'Die Cutting', text: 'Precision die-cutting with laser die.' },
        { name: 'QC & Packaging', text: 'Waterproof and adhesion testing before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'ステッカーのサイズ、形状、デザインデータを確認します。' },
        { name: '印刷', text: '耐水インクで4色印刷します。' },
        { name: 'ラミネーション', text: 'グロスまたはマットラミネーションで耐久性を向上させます。' },
        { name: 'ダイカット', text: 'レーザーダイで精密に裁断します。' },
        { name: '品質検査・梱包', text: '防水性と粘着性テストを実施し、出荷します。' },
      ],
    },
  },
  'security-stickers': {
    slug: 'security-stickers',
    keywords: {
      'zh-hk': '防偽貼紙印刷,防盜貼紙,防拆貼紙,VOID貼紙,易碎貼紙,保安貼紙,防偽標籤印刷,防偽貼紙訂造,防偽貼紙設計,防偽貼紙香港,防偽貼紙報價,防偽貼紙速印,正品防偽貼',
      'en': 'security sticker printing,tamper evident stickers,void stickers,security labels,anti counterfeit stickers,tamper proof stickers,custom security stickers,security sticker design,security stickers hong kong,security sticker quote,hologram security stickers,product security stickers',
      'ja': 'セキュリティステッカー印刷,改ざん防止ステッカー,VOIDステッカー,セキュリティラベル,偽造防止ステッカー,カスタムセキュリティステッカー,セキュリティステッカーデザイン,セキュリティステッカー香港',
    },
    h1Suffix: {
      'zh-hk': '專業防偽貼紙服務 | 智印港',
      en: 'Professional Security Stickers | ZprintPro',
      ja: 'プロセキュリティステッカー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。智印港提供專業的防偽貼紙服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Special anti-counterfeiting processes including holographic labels, fragile paper, protecting brands from counterfeiting. ZprintPro offers professional Security Stickers services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '特殊な偽造防止加工、ホログラムラベル、壊れやすい紙など。 ZprintProは高品質な素材と先進的な印刷技術を使用したセキュリティステッカーサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '這款貼紙的最小訂購量是多少？', a: '一般為100張起訂，部分特殊工藝需500張起。' },
        { q: '貼紙可以模切成任意形狀嗎？', a: '可以。我們支持圓形、方形、異形等各種模切形狀。' },
        { q: '貼紙的交貨時間多久？', a: '標準3-5個工作日，急件可安排即日交貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Some special processes require 500 pieces.' },
        { q: 'Can stickers be die-cut into custom shapes?', a: 'Yes. We support circular, square, and custom die-cut shapes.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Rush same-day delivery available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100枚から。特殊加工の場合は500枚から。' },
        { q: '任意の形状にダイカットできますか？', a: 'はい。円形、方形、異形など様々なダイカットに対応しています。' },
        { q: '納期はどのくらい？', a: '標準3〜5営業日。急行の当日配送も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認貼紙尺寸、形狀和設計稿。' },
        { name: '印刷生產', text: '使用耐水油墨進行四色印刷。' },
        { name: '覆膜保護', text: '可選光膜或啞膜覆膜，增加耐磨性。' },
        { name: '模切成型', text: '使用激光刀模進行精準模切。' },
        { name: '質檢包裝', text: '進行防水測試和粘性測試，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm sticker size, shape, and design files.' },
        { name: 'Printing', text: 'Four-color printing with water-resistant ink.' },
        { name: 'Lamination', text: 'Optional glossy or matte lamination for durability.' },
        { name: 'Die Cutting', text: 'Precision die-cutting with laser die.' },
        { name: 'QC & Packaging', text: 'Waterproof and adhesion testing before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'ステッカーのサイズ、形状、デザインデータを確認します。' },
        { name: '印刷', text: '耐水インクで4色印刷します。' },
        { name: 'ラミネーション', text: 'グロスまたはマットラミネーションで耐久性を向上させます。' },
        { name: 'ダイカット', text: 'レーザーダイで精密に裁断します。' },
        { name: '品質検査・梱包', text: '防水性と粘着性テストを実施し、出荷します。' },
      ],
    },
  },
  'fluorescent-stickers': {
    slug: 'fluorescent-stickers',
    keywords: {
      'zh-hk': '螢光貼紙印刷,夜光貼紙,發光貼紙,霓虹貼紙,醒目貼紙,螢光貼紙訂造,螢光貼紙設計,螢光貼紙香港,螢光貼紙報價,螢光貼紙速印,螢光貼紙少量印刷,安全標示螢光貼,警示螢光貼紙',
      'en': 'fluorescent sticker printing,glow in the dark stickers,neon stickers,luminous stickers,high visibility stickers,custom fluorescent stickers,fluorescent sticker design,fluorescent stickers hong kong,fluorescent sticker quote,fluorescent sticker printing service,safety fluorescent stickers,warning glow stickers',
      'ja': '蛍光ステッカー印刷,蓄光ステッカー,ネオンステッカー,発光ステッカー,高視認性ステッカー,カスタム蛍光ステッカー,蛍光ステッカーデザイン,蛍光ステッカー香港,蛍光ステッカー見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業螢光貼紙服務 | 智印港',
      en: 'Professional Fluorescent Stickers | ZprintPro',
      ja: 'プロ蛍光ステッカー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識、活動裝飾。智印港提供專業的螢光貼紙服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Fluorescent colors, highly visible under light. Perfect for promotional labels, safety signs, event decoration. ZprintPro offers professional Fluorescent Stickers services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '蛍光色、光の下で非常に目立ちます。プロモーションラベル、安全標識、イベント装飾に最適。 ZprintProは高品質な素材と先進的な印刷技術を使用した蛍光ステッカーサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '這款貼紙的最小訂購量是多少？', a: '一般為100張起訂，部分特殊工藝需500張起。' },
        { q: '貼紙可以模切成任意形狀嗎？', a: '可以。我們支持圓形、方形、異形等各種模切形狀。' },
        { q: '貼紙的交貨時間多久？', a: '標準3-5個工作日，急件可安排即日交貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Some special processes require 500 pieces.' },
        { q: 'Can stickers be die-cut into custom shapes?', a: 'Yes. We support circular, square, and custom die-cut shapes.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Rush same-day delivery available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100枚から。特殊加工の場合は500枚から。' },
        { q: '任意の形状にダイカットできますか？', a: 'はい。円形、方形、異形など様々なダイカットに対応しています。' },
        { q: '納期はどのくらい？', a: '標準3〜5営業日。急行の当日配送も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認貼紙尺寸、形狀和設計稿。' },
        { name: '印刷生產', text: '使用耐水油墨進行四色印刷。' },
        { name: '覆膜保護', text: '可選光膜或啞膜覆膜，增加耐磨性。' },
        { name: '模切成型', text: '使用激光刀模進行精準模切。' },
        { name: '質檢包裝', text: '進行防水測試和粘性測試，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm sticker size, shape, and design files.' },
        { name: 'Printing', text: 'Four-color printing with water-resistant ink.' },
        { name: 'Lamination', text: 'Optional glossy or matte lamination for durability.' },
        { name: 'Die Cutting', text: 'Precision die-cutting with laser die.' },
        { name: 'QC & Packaging', text: 'Waterproof and adhesion testing before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'ステッカーのサイズ、形状、デザインデータを確認します。' },
        { name: '印刷', text: '耐水インクで4色印刷します。' },
        { name: 'ラミネーション', text: 'グロスまたはマットラミネーションで耐久性を向上させます。' },
        { name: 'ダイカット', text: 'レーザーダイで精密に裁断します。' },
        { name: '品質検査・梱包', text: '防水性と粘着性テストを実施し、出荷します。' },
      ],
    },
  },
  'kraft-paper-bags': {
    slug: 'kraft-paper-bags',
    keywords: {
      'zh-hk': '牛皮紙袋,香港牛皮紙袋,牛皮紙袋印刷,環保紙袋,品牌紙袋,手提紙袋,餐廳外賣紙袋,小批量紙袋,棉繩紙袋,白卡紙袋,印刷即日速遞送貨',
      en: 'kraft paper bags,kraft paper bags printing hong kong,eco friendly paper bags,branded paper bags,takeaway paper bags,small batch paper bags,cotton rope bags,white card paper bags,custom paper bag printing,same day paper bag printing',
      ja: 'クラフト紙袋,香港クラフト紙袋,エコ紙袋,ブランド紙袋,テイクアウト紙袋,小ロット紙袋,綿紐紙袋,白カード紙袋,オーダーメイド紙袋,即日紙袋印刷',
    },
    h1Suffix: {
      'zh-hk': '專業牛皮紙袋服務 | 智印港',
      en: 'Professional Kraft Paper Bags | ZprintPro',
      ja: 'プロクラフト紙袋 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '環保牛皮紙材質，質樸自然，深受消費者喜愛，支持印刷即日速遞送貨。適合服裝店、禮品店、咖啡店。多種尺寸可選，可定制Logo印刷。智印港提供專業的牛皮紙袋服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Eco-friendly kraft paper, natural and rustic, loved by consumers. Perfect for clothing stores, gift shops, coffee shops. ZprintPro offers professional Kraft Paper Bags services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '環境に優しいクラフト紙、質朴で自然、消費者に人気。衣料品店、ギフトショップ、コーヒーショップに最適。 ZprintProは高品質な素材と先進的な印刷技術を使用したクラフト紙袋サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '紙袋的最小訂購量是多少？', a: '一般為100個起訂，大批量訂單價格更優惠。' },
        { q: '可以定制紙袋的尺寸和顏色嗎？', a: '當然可以。我們支持完全定制尺寸、顏色、手柄類型和印刷內容。' },
        { q: '紙袋印刷的交貨時間？', a: '標準5-7個工作日。急件可安排3日快印。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Bulk orders get better pricing.' },
        { q: 'Can I customize size and color?', a: 'Absolutely. We support fully custom sizes, colors, handle types, and printing.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Rush 3-day service available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100個から。大口注文でよりお得な価格になります。' },
        { q: 'サイズと色のカスタマイズは可能？', a: 'はい。サイズ、色、取っ手のタイプ、印刷内容の完全カスタマイズに対応しています。' },
        { q: '納期は？', a: '標準5〜7営業日。急行3日対応も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認紙袋尺寸、手柄類型和印刷設計。' },
        { name: '紙張裁切', text: '將紙張裁切成袋身和袋底所需的形狀。' },
        { name: '印刷', text: '進行四色印刷，確保色彩鮮豔。' },
        { name: '表面處理', text: '可選啞膠、光膠或燙金等工藝。' },
        { name: '摺疊粘合', text: '將紙張摺疊成袋形並粘合。' },
        { name: '穿繩/裝手柄', text: '安裝紙繩或棉繩手柄。' },
        { name: '質檢包裝', text: '檢查承重能力和外觀，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm bag size, handle type, and printing design.' },
        { name: 'Paper Cutting', text: 'Cut paper into required shapes for body and base.' },
        { name: 'Printing', text: 'Four-color printing for vibrant colors.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or foil stamping.' },
        { name: 'Folding & Gluing', text: 'Fold paper into bag shape and glue.' },
        { name: 'Handle Installation', text: 'Install paper or cotton rope handles.' },
        { name: 'QC & Packaging', text: 'Check load capacity and appearance before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '紙袋のサイズ、取っ手タイプ、印刷デザインを確認します。' },
        { name: '用紙裁断', text: '袋身と袋底に必要な形状に用紙を裁断します。' },
        { name: '印刷', text: '4色印刷で鮮やかな色を実現します。' },
        { name: '表面加工', text: 'マット、グロス、箔押しなどの加工を選択します。' },
        { name: '折り畳み・接着', text: '紙を袋の形に折り畳み、接着します。' },
        { name: '紐取り付け', text: '紙紐またはコットン紐の取っ手を取り付けます。' },
        { name: '品質検査・梱包', text: '耐荷重性と外観を検査し、出荷します。' },
      ],
    },
  },
  'white-card-bags': {
    slug: 'white-card-bags',
    keywords: {
      'zh-hk': '白卡紙袋印刷,白卡紙手挽袋,白卡紙購物袋,白色紙袋,白卡紙袋訂造,白卡紙袋設計,白卡紙袋香港,白卡紙袋報價,白卡紙袋速印,白卡紙袋少量印刷,高檔白卡紙袋,商業白卡紙袋',
      'en': 'white card paper bags,white paper bags,white kraft bags,white shopping bags,custom white paper bags,white bag design,white bags hong kong,white bag quote,white bag printing service,premium white paper bags,commercial white bags',
      'ja': '白卡紙袋印刷,白い紙袋,白クラフト袋,白ショッピング袋,カスタム白紙袋,白バッグデザイン,白バッグ香港,白バッグ見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業白卡紙袋服務 | 智印港',
      en: 'Professional White Card Bags | ZprintPro',
      ja: 'プロ白カード紙袋 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '白卡紙材質，表面平整光滑，印刷效果佳，支持印刷即日速遞送貨。適合高端品牌、化妝品店。智印港提供專業的白卡紙袋服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'White card paper, smooth surface, excellent printing effect. Perfect for high-end brands, cosmetic stores. ZprintPro offers professional White Card Bags services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '白カード紙、表面が滑らかで印刷効果が抜群。高級ブランド、化粧品店に最適。 ZprintProは高品質な素材と先進的な印刷技術を使用した白カード紙袋サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '紙袋的最小訂購量是多少？', a: '一般為100個起訂，大批量訂單價格更優惠。' },
        { q: '可以定制紙袋的尺寸和顏色嗎？', a: '當然可以。我們支持完全定制尺寸、顏色、手柄類型和印刷內容。' },
        { q: '紙袋印刷的交貨時間？', a: '標準5-7個工作日。急件可安排3日快印。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Bulk orders get better pricing.' },
        { q: 'Can I customize size and color?', a: 'Absolutely. We support fully custom sizes, colors, handle types, and printing.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Rush 3-day service available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100個から。大口注文でよりお得な価格になります。' },
        { q: 'サイズと色のカスタマイズは可能？', a: 'はい。サイズ、色、取っ手のタイプ、印刷内容の完全カスタマイズに対応しています。' },
        { q: '納期は？', a: '標準5〜7営業日。急行3日対応も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認紙袋尺寸、手柄類型和印刷設計。' },
        { name: '紙張裁切', text: '將紙張裁切成袋身和袋底所需的形狀。' },
        { name: '印刷', text: '進行四色印刷，確保色彩鮮豔。' },
        { name: '表面處理', text: '可選啞膠、光膠或燙金等工藝。' },
        { name: '摺疊粘合', text: '將紙張摺疊成袋形並粘合。' },
        { name: '穿繩/裝手柄', text: '安裝紙繩或棉繩手柄。' },
        { name: '質檢包裝', text: '檢查承重能力和外觀，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm bag size, handle type, and printing design.' },
        { name: 'Paper Cutting', text: 'Cut paper into required shapes for body and base.' },
        { name: 'Printing', text: 'Four-color printing for vibrant colors.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or foil stamping.' },
        { name: 'Folding & Gluing', text: 'Fold paper into bag shape and glue.' },
        { name: 'Handle Installation', text: 'Install paper or cotton rope handles.' },
        { name: 'QC & Packaging', text: 'Check load capacity and appearance before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '紙袋のサイズ、取っ手タイプ、印刷デザインを確認します。' },
        { name: '用紙裁断', text: '袋身と袋底に必要な形状に用紙を裁断します。' },
        { name: '印刷', text: '4色印刷で鮮やかな色を実現します。' },
        { name: '表面加工', text: 'マット、グロス、箔押しなどの加工を選択します。' },
        { name: '折り畳み・接着', text: '紙を袋の形に折り畳み、接着します。' },
        { name: '紐取り付け', text: '紙紐またはコットン紐の取っ手を取り付けます。' },
        { name: '品質検査・梱包', text: '耐荷重性と外観を検査し、出荷します。' },
      ],
    },
  },
  'gift-bags': {
    slug: 'gift-bags',
    keywords: {
      'zh-hk': '禮品紙袋印刷,禮物袋制作,精美禮品袋,節日禮品袋,禮品紙袋訂造,禮品紙袋設計,禮品紙袋香港,禮品紙袋報價,禮品紙袋速印,禮品紙袋少量印刷,高檔禮品袋,品牌禮品袋,生日禮品袋',
      'en': 'gift paper bags,present bags,luxury gift bags,festival gift bags,custom gift paper bags,gift bag design,gift bags hong kong,gift bag quote,gift bag printing service,premium gift bags,branded gift bags,birthday gift bags',
      'ja': 'ギフト紙袋印刷,プレゼント袋,高級ギフト袋,ギフト紙袋,カスタムギフト紙袋,ギフトバッグデザイン,ギフトバッグ香港,ギフトバッグ見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業禮品紙袋服務 | 智印港',
      en: 'Professional Gift Bags | ZprintPro',
      ja: 'プロギフト紙袋 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '精美設計，配合燙金、UV等工藝，支持印刷即日速遞送貨。送禮必備，提升禮品檔次。智印港提供專業的禮品紙袋服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Exquisite design with foil stamping, UV and other processes. Essential for gifting, elevates gift quality. ZprintPro offers professional Gift Bags services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '精巧なデザイン、箔押し・UVなどの加工付き。ギフトに必須、ギフトの質を向上。 ZprintProは高品質な素材と先進的な印刷技術を使用したギフト紙袋サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '紙袋的最小訂購量是多少？', a: '一般為100個起訂，大批量訂單價格更優惠。' },
        { q: '可以定制紙袋的尺寸和顏色嗎？', a: '當然可以。我們支持完全定制尺寸、顏色、手柄類型和印刷內容。' },
        { q: '紙袋印刷的交貨時間？', a: '標準5-7個工作日。急件可安排3日快印。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Bulk orders get better pricing.' },
        { q: 'Can I customize size and color?', a: 'Absolutely. We support fully custom sizes, colors, handle types, and printing.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Rush 3-day service available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100個から。大口注文でよりお得な価格になります。' },
        { q: 'サイズと色のカスタマイズは可能？', a: 'はい。サイズ、色、取っ手のタイプ、印刷内容の完全カスタマイズに対応しています。' },
        { q: '納期は？', a: '標準5〜7営業日。急行3日対応も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認紙袋尺寸、手柄類型和印刷設計。' },
        { name: '紙張裁切', text: '將紙張裁切成袋身和袋底所需的形狀。' },
        { name: '印刷', text: '進行四色印刷，確保色彩鮮豔。' },
        { name: '表面處理', text: '可選啞膠、光膠或燙金等工藝。' },
        { name: '摺疊粘合', text: '將紙張摺疊成袋形並粘合。' },
        { name: '穿繩/裝手柄', text: '安裝紙繩或棉繩手柄。' },
        { name: '質檢包裝', text: '檢查承重能力和外觀，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm bag size, handle type, and printing design.' },
        { name: 'Paper Cutting', text: 'Cut paper into required shapes for body and base.' },
        { name: 'Printing', text: 'Four-color printing for vibrant colors.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or foil stamping.' },
        { name: 'Folding & Gluing', text: 'Fold paper into bag shape and glue.' },
        { name: 'Handle Installation', text: 'Install paper or cotton rope handles.' },
        { name: 'QC & Packaging', text: 'Check load capacity and appearance before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '紙袋のサイズ、取っ手タイプ、印刷デザインを確認します。' },
        { name: '用紙裁断', text: '袋身と袋底に必要な形状に用紙を裁断します。' },
        { name: '印刷', text: '4色印刷で鮮やかな色を実現します。' },
        { name: '表面加工', text: 'マット、グロス、箔押しなどの加工を選択します。' },
        { name: '折り畳み・接着', text: '紙を袋の形に折り畳み、接着します。' },
        { name: '紐取り付け', text: '紙紐またはコットン紐の取っ手を取り付けます。' },
        { name: '品質検査・梱包', text: '耐荷重性と外観を検査し、出荷します。' },
      ],
    },
  },
  'eco-paper-bags': {
    slug: 'eco-paper-bags',
    keywords: {
      'zh-hk': '環保紙袋印刷,再生紙袋,環保購物袋,綠色紙袋,FSC紙袋,環保紙袋訂造,環保紙袋設計,環保紙袋香港,環保紙袋報價,環保紙袋速印,環保紙袋少量印刷,可持續紙袋,環保手提袋',
      'en': 'eco paper bags,recycled paper bags,environmentally friendly paper bags,green paper bags,FSC paper bags,custom eco paper bags,eco paper bag design,eco paper bags hong kong,eco paper bag quote,eco paper bag printing service,sustainable paper bags,eco friendly shopping bags',
      'ja': 'エコ紙袋印刷,再生紙袋,環境に優しい紙袋,エコ紙袋,FSC紙袋,カスタムエコ紙袋,エコ紙袋デザイン,エコ紙袋香港,エコ紙袋見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業環保紙袋服務 | 智印港',
      en: 'Professional Eco Paper Bags | ZprintPro',
      ja: 'プロエコ紙袋 | ZprintPro',
    },
    longDescription: {
      'zh-hk': 'FSC認證環保紙張，可持續發展。適合注重環保的品牌。智印港提供專業的環保紙袋服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'FSC-certified eco-friendly paper, sustainable development. Perfect for environmentally conscious brands. ZprintPro offers professional Eco Paper Bags services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'FSC認証の環境に優しい紙、持続可能な開発。環境に配慮するブランドに最適。 ZprintProは高品質な素材と先進的な印刷技術を使用したエコ紙袋サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '紙袋的最小訂購量是多少？', a: '一般為100個起訂，大批量訂單價格更優惠。' },
        { q: '可以定制紙袋的尺寸和顏色嗎？', a: '當然可以。我們支持完全定制尺寸、顏色、手柄類型和印刷內容。' },
        { q: '紙袋印刷的交貨時間？', a: '標準5-7個工作日。急件可安排3日快印。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Bulk orders get better pricing.' },
        { q: 'Can I customize size and color?', a: 'Absolutely. We support fully custom sizes, colors, handle types, and printing.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Rush 3-day service available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100個から。大口注文でよりお得な価格になります。' },
        { q: 'サイズと色のカスタマイズは可能？', a: 'はい。サイズ、色、取っ手のタイプ、印刷内容の完全カスタマイズに対応しています。' },
        { q: '納期は？', a: '標準5〜7営業日。急行3日対応も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認紙袋尺寸、手柄類型和印刷設計。' },
        { name: '紙張裁切', text: '將紙張裁切成袋身和袋底所需的形狀。' },
        { name: '印刷', text: '進行四色印刷，確保色彩鮮豔。' },
        { name: '表面處理', text: '可選啞膠、光膠或燙金等工藝。' },
        { name: '摺疊粘合', text: '將紙張摺疊成袋形並粘合。' },
        { name: '穿繩/裝手柄', text: '安裝紙繩或棉繩手柄。' },
        { name: '質檢包裝', text: '檢查承重能力和外觀，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm bag size, handle type, and printing design.' },
        { name: 'Paper Cutting', text: 'Cut paper into required shapes for body and base.' },
        { name: 'Printing', text: 'Four-color printing for vibrant colors.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or foil stamping.' },
        { name: 'Folding & Gluing', text: 'Fold paper into bag shape and glue.' },
        { name: 'Handle Installation', text: 'Install paper or cotton rope handles.' },
        { name: 'QC & Packaging', text: 'Check load capacity and appearance before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '紙袋のサイズ、取っ手タイプ、印刷デザインを確認します。' },
        { name: '用紙裁断', text: '袋身と袋底に必要な形状に用紙を裁断します。' },
        { name: '印刷', text: '4色印刷で鮮やかな色を実現します。' },
        { name: '表面加工', text: 'マット、グロス、箔押しなどの加工を選択します。' },
        { name: '折り畳み・接着', text: '紙を袋の形に折り畳み、接着します。' },
        { name: '紐取り付け', text: '紙紐またはコットン紐の取っ手を取り付けます。' },
        { name: '品質検査・梱包', text: '耐荷重性と外観を検査し、出荷します。' },
      ],
    },
  },
  'handle-bags': {
    slug: 'handle-bags',
    keywords: {
      'zh-hk': '手挽紙袋,香港手挽,手挽紙袋印刷,香港印刷,手提紙袋,有提手紙袋,繩柄紙袋,棉繩紙袋,紙繩紙袋,尼龍繩紙袋',
      en: 'handle bags,handle bags printing hong kong, hong kong handle bags',
      ja: '手提げ紙袋,香港手提げ,手提げ紙袋印刷',
    },
    h1Suffix: {
      'zh-hk': '專業手挽紙袋服務 | 智印港',
      en: 'Professional Handle Bags | ZprintPro',
      ja: 'プロ手提げ紙袋 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '堅固手挽設計，承重能力強。適合購物中心、超市。智印港提供專業的手挽紙袋服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Sturdy handle design, strong load-bearing capacity. Perfect for shopping centers, supermarkets. ZprintPro offers professional Handle Bags services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '頑丈な持ち手デザイン、強い耐荷重能力。ショッピングセンター、スーパーに最適。 ZprintProは高品質な素材と先進的な印刷技術を使用した手提げ紙袋サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '紙袋的最小訂購量是多少？', a: '一般為100個起訂，大批量訂單價格更優惠。' },
        { q: '可以定制紙袋的尺寸和顏色嗎？', a: '當然可以。我們支持完全定制尺寸、顏色、手柄類型和印刷內容。' },
        { q: '紙袋印刷的交貨時間？', a: '標準5-7個工作日。急件可安排3日快印。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Bulk orders get better pricing.' },
        { q: 'Can I customize size and color?', a: 'Absolutely. We support fully custom sizes, colors, handle types, and printing.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Rush 3-day service available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100個から。大口注文でよりお得な価格になります。' },
        { q: 'サイズと色のカスタマイズは可能？', a: 'はい。サイズ、色、取っ手のタイプ、印刷内容の完全カスタマイズに対応しています。' },
        { q: '納期は？', a: '標準5〜7営業日。急行3日対応も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認紙袋尺寸、手柄類型和印刷設計。' },
        { name: '紙張裁切', text: '將紙張裁切成袋身和袋底所需的形狀。' },
        { name: '印刷', text: '進行四色印刷，確保色彩鮮豔。' },
        { name: '表面處理', text: '可選啞膠、光膠或燙金等工藝。' },
        { name: '摺疊粘合', text: '將紙張摺疊成袋形並粘合。' },
        { name: '穿繩/裝手柄', text: '安裝紙繩或棉繩手柄。' },
        { name: '質檢包裝', text: '檢查承重能力和外觀，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm bag size, handle type, and printing design.' },
        { name: 'Paper Cutting', text: 'Cut paper into required shapes for body and base.' },
        { name: 'Printing', text: 'Four-color printing for vibrant colors.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or foil stamping.' },
        { name: 'Folding & Gluing', text: 'Fold paper into bag shape and glue.' },
        { name: 'Handle Installation', text: 'Install paper or cotton rope handles.' },
        { name: 'QC & Packaging', text: 'Check load capacity and appearance before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '紙袋のサイズ、取っ手タイプ、印刷デザインを確認します。' },
        { name: '用紙裁断', text: '袋身と袋底に必要な形状に用紙を裁断します。' },
        { name: '印刷', text: '4色印刷で鮮やかな色を実現します。' },
        { name: '表面加工', text: 'マット、グロス、箔押しなどの加工を選択します。' },
        { name: '折り畳み・接着', text: '紙を袋の形に折り畳み、接着します。' },
        { name: '紐取り付け', text: '紙紐またはコットン紐の取っ手を取り付けます。' },
        { name: '品質検査・梱包', text: '耐荷重性と外観を検査し、出荷します。' },
      ],
    },
  },
  'small-bags': {
    slug: 'small-bags',
    keywords: {
      'zh-hk': '小紙袋印刷,小型紙袋,迷你紙袋,精品小紙袋,小紙袋訂造,小紙袋設計,小紙袋香港,小紙袋報價,小紙袋速印,小紙袋少量印刷,飾品小紙袋,化妝品小紙袋,禮品小紙袋',
      'en': 'small paper bags,mini paper bags,tiny paper bags,small gift bags,custom small paper bags,small bag design,small bags hong kong,small bag quote,small bag printing service,jewelry small bags,cosmetic small bags,party favor bags',
      'ja': '小判紙袋印刷,小さい紙袋,ミニ紙袋,小判ギフト袋,カスタム小判紙袋,小判バッグデザイン,小判バッグ香港,小判バッグ見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業小號紙袋服務 | 智印港',
      en: 'Professional Small Bags | ZprintPro',
      ja: 'プロ小判紙袋 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '小巧尺寸，適合首飾、化妝品等小件商品。智印港提供專業的小號紙袋服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Compact size, perfect for jewelry, cosmetics and other small items. ZprintPro offers professional Small Bags services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'コンパクトなサイズ、アクセサリー、化粧品などの小物に最適。 ZprintProは高品質な素材と先進的な印刷技術を使用した小判紙袋サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '紙袋的最小訂購量是多少？', a: '一般為100個起訂，大批量訂單價格更優惠。' },
        { q: '可以定制紙袋的尺寸和顏色嗎？', a: '當然可以。我們支持完全定制尺寸、顏色、手柄類型和印刷內容。' },
        { q: '紙袋印刷的交貨時間？', a: '標準5-7個工作日。急件可安排3日快印。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Bulk orders get better pricing.' },
        { q: 'Can I customize size and color?', a: 'Absolutely. We support fully custom sizes, colors, handle types, and printing.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Rush 3-day service available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100個から。大口注文でよりお得な価格になります。' },
        { q: 'サイズと色のカスタマイズは可能？', a: 'はい。サイズ、色、取っ手のタイプ、印刷内容の完全カスタマイズに対応しています。' },
        { q: '納期は？', a: '標準5〜7営業日。急行3日対応も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認紙袋尺寸、手柄類型和印刷設計。' },
        { name: '紙張裁切', text: '將紙張裁切成袋身和袋底所需的形狀。' },
        { name: '印刷', text: '進行四色印刷，確保色彩鮮豔。' },
        { name: '表面處理', text: '可選啞膠、光膠或燙金等工藝。' },
        { name: '摺疊粘合', text: '將紙張摺疊成袋形並粘合。' },
        { name: '穿繩/裝手柄', text: '安裝紙繩或棉繩手柄。' },
        { name: '質檢包裝', text: '檢查承重能力和外觀，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm bag size, handle type, and printing design.' },
        { name: 'Paper Cutting', text: 'Cut paper into required shapes for body and base.' },
        { name: 'Printing', text: 'Four-color printing for vibrant colors.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or foil stamping.' },
        { name: 'Folding & Gluing', text: 'Fold paper into bag shape and glue.' },
        { name: 'Handle Installation', text: 'Install paper or cotton rope handles.' },
        { name: 'QC & Packaging', text: 'Check load capacity and appearance before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '紙袋のサイズ、取っ手タイプ、印刷デザインを確認します。' },
        { name: '用紙裁断', text: '袋身と袋底に必要な形状に用紙を裁断します。' },
        { name: '印刷', text: '4色印刷で鮮やかな色を実現します。' },
        { name: '表面加工', text: 'マット、グロス、箔押しなどの加工を選択します。' },
        { name: '折り畳み・接着', text: '紙を袋の形に折り畳み、接着します。' },
        { name: '紐取り付け', text: '紙紐またはコットン紐の取っ手を取り付けます。' },
        { name: '品質検査・梱包', text: '耐荷重性と外観を検査し、出荷します。' },
      ],
    },
  },
  'large-bags': {
    slug: 'large-bags',
    keywords: {
      'zh-hk': '大紙袋印刷,大型紙袋,加大紙袋,大碼購物袋,大紙袋訂造,大紙袋設計,大紙袋香港,大紙袋報價,大紙袋速印,大紙袋少量印刷,服裝大紙袋,禮品大紙袋,商業大紙袋',
      'en': 'large paper bags,big paper bags,oversized paper bags,large shopping bags,custom large paper bags,large bag design,large bags hong kong,large bag quote,large bag printing service,clothing large bags,gift large bags,commercial large bags',
      'ja': '大判紙袋印刷,大きい紙袋,オーバーサイズ紙袋,大判ショッピング袋,カスタム大判紙袋,大判バッグデザイン,大判バッグ香港,大判バッグ見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業大號紙袋服務 | 智印港',
      en: 'Professional Large Bags | ZprintPro',
      ja: 'プロ大判紙袋 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '加大尺寸，適合服裝、鞋類等大件商品。智印港提供專業的大號紙袋服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Large size, perfect for clothing, shoes and other large items. ZprintPro offers professional Large Bags services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '大きなサイズ、衣類、靴などの大物に最適。 ZprintProは高品質な素材と先進的な印刷技術を使用した大判紙袋サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '紙袋的最小訂購量是多少？', a: '一般為100個起訂，大批量訂單價格更優惠。' },
        { q: '可以定制紙袋的尺寸和顏色嗎？', a: '當然可以。我們支持完全定制尺寸、顏色、手柄類型和印刷內容。' },
        { q: '紙袋印刷的交貨時間？', a: '標準5-7個工作日。急件可安排3日快印。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Bulk orders get better pricing.' },
        { q: 'Can I customize size and color?', a: 'Absolutely. We support fully custom sizes, colors, handle types, and printing.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Rush 3-day service available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100個から。大口注文でよりお得な価格になります。' },
        { q: 'サイズと色のカスタマイズは可能？', a: 'はい。サイズ、色、取っ手のタイプ、印刷内容の完全カスタマイズに対応しています。' },
        { q: '納期は？', a: '標準5〜7営業日。急行3日対応も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認紙袋尺寸、手柄類型和印刷設計。' },
        { name: '紙張裁切', text: '將紙張裁切成袋身和袋底所需的形狀。' },
        { name: '印刷', text: '進行四色印刷，確保色彩鮮豔。' },
        { name: '表面處理', text: '可選啞膠、光膠或燙金等工藝。' },
        { name: '摺疊粘合', text: '將紙張摺疊成袋形並粘合。' },
        { name: '穿繩/裝手柄', text: '安裝紙繩或棉繩手柄。' },
        { name: '質檢包裝', text: '檢查承重能力和外觀，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm bag size, handle type, and printing design.' },
        { name: 'Paper Cutting', text: 'Cut paper into required shapes for body and base.' },
        { name: 'Printing', text: 'Four-color printing for vibrant colors.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or foil stamping.' },
        { name: 'Folding & Gluing', text: 'Fold paper into bag shape and glue.' },
        { name: 'Handle Installation', text: 'Install paper or cotton rope handles.' },
        { name: 'QC & Packaging', text: 'Check load capacity and appearance before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '紙袋のサイズ、取っ手タイプ、印刷デザインを確認します。' },
        { name: '用紙裁断', text: '袋身と袋底に必要な形状に用紙を裁断します。' },
        { name: '印刷', text: '4色印刷で鮮やかな色を実現します。' },
        { name: '表面加工', text: 'マット、グロス、箔押しなどの加工を選択します。' },
        { name: '折り畳み・接着', text: '紙を袋の形に折り畳み、接着します。' },
        { name: '紐取り付け', text: '紙紐またはコットン紐の取っ手を取り付けます。' },
        { name: '品質検査・梱包', text: '耐荷重性と外観を検査し、出荷します。' },
      ],
    },
  },
  'a4-flyers': {
    slug: 'a4-flyers',
    keywords: {
      'zh-hk': 'A4宣傳單張,香港A4宣傳單張,A4宣傳單張印刷,開業宣傳單張,餐廳傳單印刷,活動宣傳單張,電商宣傳單張,摺頁傳單,A5傳單印刷,派傳單印刷,印刷即日速遞送貨',
      en: 'a4 flyers,a4 flyers printing hong kong,grand opening flyers,restaurant flyers,event flyers,ecommerce flyers,folded leaflets,a5 flyers,door hanger printing,direct mail flyers,same day flyer printing',
      ja: 'A4チラシ,香港A4チラシ,開業チラシ,飲食店チラシ,イベントチラシ,ECチラシ,折りパンフレット,A5チラシ,ドアハンガー印刷,ダイレクトメールチラシ,即日チラシ印刷',
    },
    h1Suffix: {
      'zh-hk': '專業A4宣傳單張服務 | 智印港',
      en: 'Professional A4 Flyers | ZprintPro',
      ja: 'プロA4チラシ | ZprintPro',
    },
    longDescription: {
      'zh-hk': '標準A4尺寸，最常用的宣傳單張規格，支持印刷即日速遞送貨。157g銅版紙，四色印刷，色彩鮮豔。適合產品推廣、活動宣傳。智印港提供專業的A4宣傳單張服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Standard A4 size, most common flyer format. 157g glossy paper, 4-color printing, vibrant colors. ZprintPro offers professional A4 Flyers services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '標準A4サイズ、最も一般的なチラシ形式。157gコート紙、4色印刷、鮮やかな色彩。 ZprintProは高品質な素材と先進的な印刷技術を使用したA4チラシサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '傳單的最小訂購量是多少？', a: '一般為100張起訂，數碼印刷可接受50張小量。' },
        { q: '傳單支持雙面印刷嗎？', a: '支持。我們提供單面和雙面印刷選項，雙面印刷可充分利用空間。' },
        { q: '傳單的交貨時間多久？', a: '標準3-5個工作日，急件可安排即日交貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Digital printing accepts 50 pieces.' },
        { q: 'Do you support double-sided printing?', a: 'Yes. We offer single-sided and double-sided printing options.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Rush same-day delivery available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100枚から。デジタル印刷は50枚から承ります。' },
        { q: '両面印刷は対応していますか？', a: 'はい。片面印刷と両面印刷の両方に対応しています。' },
        { q: '納期はどのくらい？', a: '標準3〜5営業日。急行の当日配送も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認傳單尺寸、內容和設計稿。' },
        { name: '印刷生產', text: '使用專業印刷機進行四色印刷。' },
        { name: '表面處理', text: '可選啞膠、光膠或局部UV等工藝。' },
        { name: '裁切成品', text: '精密裁切，確保尺寸精準。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm flyer size, content, and design files.' },
        { name: 'Printing', text: 'Four-color printing using professional equipment.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or spot UV.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'チラシのサイズ、内容、デザインデータを確認します。' },
        { name: '印刷', text: 'プロの設備を使用した4色印刷。' },
        { name: '表面加工', text: 'マット、グロス、局部UVなどの加工を選択します。' },
        { name: '精密裁断', text: '正確な寸法を保証します。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'a5-flyers': {
    slug: 'a5-flyers',
    keywords: {
      'zh-hk': 'A5宣傳單張,香港A5宣張,A5宣傳單張印刷,香港印刷,印刷即日速遞送貨,A5傳單,A5單張印刷,A5雙面傳單,A5摺頁,A5宣傳單',
      en: 'a5 flyers,a5 flyers printing hong kong, hong kong a5 flyers',
      ja: 'A5チラシ,香港A5,A5チラシ印刷',
    },
    h1Suffix: {
      'zh-hk': '專業A5宣傳單張服務 | 智印港',
      en: 'Professional A5 Flyers | ZprintPro',
      ja: 'プロA5チラシ | ZprintPro',
    },
    longDescription: {
      'zh-hk': 'A5尺寸，經濟實惠，適合大量派發，支持印刷即日速遞送貨。餐飲外賣、快閃活動首選。智印港提供專業的A5宣傳單張服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'A5 size, economical, perfect for mass distribution. First choice for food delivery, flash events. ZprintPro offers professional A5 Flyers services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'A5サイズ、経済的、大量配布に最適。フードデリバリー、フラッシュイベントの第一選択。 ZprintProは高品質な素材と先進的な印刷技術を使用したA5チラシサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '傳單的最小訂購量是多少？', a: '一般為100張起訂，數碼印刷可接受50張小量。' },
        { q: '傳單支持雙面印刷嗎？', a: '支持。我們提供單面和雙面印刷選項，雙面印刷可充分利用空間。' },
        { q: '傳單的交貨時間多久？', a: '標準3-5個工作日，急件可安排即日交貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Digital printing accepts 50 pieces.' },
        { q: 'Do you support double-sided printing?', a: 'Yes. We offer single-sided and double-sided printing options.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Rush same-day delivery available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100枚から。デジタル印刷は50枚から承ります。' },
        { q: '両面印刷は対応していますか？', a: 'はい。片面印刷と両面印刷の両方に対応しています。' },
        { q: '納期はどのくらい？', a: '標準3〜5営業日。急行の当日配送も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認傳單尺寸、內容和設計稿。' },
        { name: '印刷生產', text: '使用專業印刷機進行四色印刷。' },
        { name: '表面處理', text: '可選啞膠、光膠或局部UV等工藝。' },
        { name: '裁切成品', text: '精密裁切，確保尺寸精準。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm flyer size, content, and design files.' },
        { name: 'Printing', text: 'Four-color printing using professional equipment.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or spot UV.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'チラシのサイズ、内容、デザインデータを確認します。' },
        { name: '印刷', text: 'プロの設備を使用した4色印刷。' },
        { name: '表面加工', text: 'マット、グロス、局部UVなどの加工を選択します。' },
        { name: '精密裁断', text: '正確な寸法を保証します。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'double-sided-flyers': {
    slug: 'double-sided-flyers',
    keywords: {
      'zh-hk': '雙面宣傳單張,香港雙面宣張,雙面宣傳單張印刷,香港印刷,印刷即日速遞送貨,雙面傳單,雙面單張,雙面印刷傳單,雙面彩色傳單,雙面宣傳單,兩面印刷單張',
      en: 'double-sided flyers,double-sided flyers printing hong kong, hong kong double-sided flyers',
      ja: '両面チラシ,香港両面,両面チラシ印刷',
    },
    h1Suffix: {
      'zh-hk': '專業雙面宣傳單張服務 | 智印港',
      en: 'Professional Double-sided Flyers | ZprintPro',
      ja: 'プロ両面チラシ | ZprintPro',
    },
    longDescription: {
      'zh-hk': '雙面全彩印刷，信息容量翻倍，支持印刷即日速遞送貨。正面吸引眼球，背面詳細介紹。智印港提供專業的雙面宣傳單張服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Double-sided full color printing, doubled information capacity. ZprintPro offers professional Double-sided Flyers services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '両面フルカラー印刷、情報容量が2倍。 ZprintProは高品質な素材と先進的な印刷技術を使用した両面チラシサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '傳單的最小訂購量是多少？', a: '一般為100張起訂，數碼印刷可接受50張小量。' },
        { q: '傳單支持雙面印刷嗎？', a: '支持。我們提供單面和雙面印刷選項，雙面印刷可充分利用空間。' },
        { q: '傳單的交貨時間多久？', a: '標準3-5個工作日，急件可安排即日交貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Digital printing accepts 50 pieces.' },
        { q: 'Do you support double-sided printing?', a: 'Yes. We offer single-sided and double-sided printing options.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Rush same-day delivery available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100枚から。デジタル印刷は50枚から承ります。' },
        { q: '両面印刷は対応していますか？', a: 'はい。片面印刷と両面印刷の両方に対応しています。' },
        { q: '納期はどのくらい？', a: '標準3〜5営業日。急行の当日配送も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認傳單尺寸、內容和設計稿。' },
        { name: '印刷生產', text: '使用專業印刷機進行四色印刷。' },
        { name: '表面處理', text: '可選啞膠、光膠或局部UV等工藝。' },
        { name: '裁切成品', text: '精密裁切，確保尺寸精準。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm flyer size, content, and design files.' },
        { name: 'Printing', text: 'Four-color printing using professional equipment.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or spot UV.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'チラシのサイズ、内容、デザインデータを確認します。' },
        { name: '印刷', text: 'プロの設備を使用した4色印刷。' },
        { name: '表面加工', text: 'マット、グロス、局部UVなどの加工を選択します。' },
        { name: '精密裁断', text: '正確な寸法を保証します。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'folded-leaflets': {
    slug: 'folded-leaflets',
    keywords: {
      'zh-hk': '摺疊傳單印刷,摺頁傳單,對摺傳單,三摺頁印刷,四摺傳單,Z形摺傳單,門摺傳單,摺疊傳單設計,摺疊傳單香港,摺疊傳單報價,摺疊傳單速印,摺疊傳單少量印刷,宣傳摺頁',
      'en': 'folded leaflet printing,folded flyers,folded brochures,bi fold leaflets,tri fold leaflets,quad fold leaflets,z fold leaflets,gate fold leaflets,folded leaflet design,folded leaflets hong kong,folded leaflet quote,folded leaflet printing service',
      'ja': '折りたたみチラシ印刷,折りパンフレット,二つ折りチラシ,三つ折りパンフレット,四つ折りチラシ,Z折りチラシ,折りたたみチラシデザイン,折りたたみチラシ香港,折りたたみチラシ見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業摺疊宣傳單張服務 | 智印港',
      en: 'Professional Folded Leaflets | ZprintPro',
      ja: 'プロ折りたたみパンフレット | ZprintPro',
    },
    longDescription: {
      'zh-hk': '對摺或三摺設計，可展示更多信息。適合產品目錄、服務介紹。智印港提供專業的摺疊宣傳單張服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Bi-fold or tri-fold design, can display more information. ZprintPro offers professional Folded Leaflets services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '二つ折りまたは三つ折りデザイン、より多くの情報を表示可能。 ZprintProは高品質な素材と先進的な印刷技術を使用した折りたたみパンフレットサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '傳單的最小訂購量是多少？', a: '一般為100張起訂，數碼印刷可接受50張小量。' },
        { q: '傳單支持雙面印刷嗎？', a: '支持。我們提供單面和雙面印刷選項，雙面印刷可充分利用空間。' },
        { q: '傳單的交貨時間多久？', a: '標準3-5個工作日，急件可安排即日交貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Digital printing accepts 50 pieces.' },
        { q: 'Do you support double-sided printing?', a: 'Yes. We offer single-sided and double-sided printing options.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Rush same-day delivery available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100枚から。デジタル印刷は50枚から承ります。' },
        { q: '両面印刷は対応していますか？', a: 'はい。片面印刷と両面印刷の両方に対応しています。' },
        { q: '納期はどのくらい？', a: '標準3〜5営業日。急行の当日配送も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認傳單尺寸、內容和設計稿。' },
        { name: '印刷生產', text: '使用專業印刷機進行四色印刷。' },
        { name: '表面處理', text: '可選啞膠、光膠或局部UV等工藝。' },
        { name: '裁切成品', text: '精密裁切，確保尺寸精準。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm flyer size, content, and design files.' },
        { name: 'Printing', text: 'Four-color printing using professional equipment.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or spot UV.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'チラシのサイズ、内容、デザインデータを確認します。' },
        { name: '印刷', text: 'プロの設備を使用した4色印刷。' },
        { name: '表面加工', text: 'マット、グロス、局部UVなどの加工を選択します。' },
        { name: '精密裁断', text: '正確な寸法を保証します。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'thick-paper-flyers': {
    slug: 'thick-paper-flyers',
    keywords: {
      'zh-hk': '厚紙宣傳單張,香港厚紙宣張,厚紙宣傳單張印刷,香港印刷,厚紙傳單,厚身宣傳單,高級傳單,厚卡傳單,重磅傳單,厚質宣傳單',
      en: 'thick paper flyers,thick paper flyers printing hong kong, hong kong thick paper flyers',
      ja: '厚紙チラシ,香港厚紙,厚紙チラシ印刷',
    },
    h1Suffix: {
      'zh-hk': '專業厚紙宣傳單張服務 | 智印港',
      en: 'Professional Thick Paper Flyers | ZprintPro',
      ja: 'プロ厚紙チラシ | ZprintPro',
    },
    longDescription: {
      'zh-hk': '200g以上厚紙，質感更佳，不易折損。適合高端產品宣傳。智印港提供專業的厚紙宣傳單張服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: '200g+ thick paper, better texture, not easily damaged. ZprintPro offers professional Thick Paper Flyers services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '200g以上の厚紙、質感が良く折れにくい。 ZprintProは高品質な素材と先進的な印刷技術を使用した厚紙チラシサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '傳單的最小訂購量是多少？', a: '一般為100張起訂，數碼印刷可接受50張小量。' },
        { q: '傳單支持雙面印刷嗎？', a: '支持。我們提供單面和雙面印刷選項，雙面印刷可充分利用空間。' },
        { q: '傳單的交貨時間多久？', a: '標準3-5個工作日，急件可安排即日交貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Digital printing accepts 50 pieces.' },
        { q: 'Do you support double-sided printing?', a: 'Yes. We offer single-sided and double-sided printing options.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Rush same-day delivery available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100枚から。デジタル印刷は50枚から承ります。' },
        { q: '両面印刷は対応していますか？', a: 'はい。片面印刷と両面印刷の両方に対応しています。' },
        { q: '納期はどのくらい？', a: '標準3〜5営業日。急行の当日配送も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認傳單尺寸、內容和設計稿。' },
        { name: '印刷生產', text: '使用專業印刷機進行四色印刷。' },
        { name: '表面處理', text: '可選啞膠、光膠或局部UV等工藝。' },
        { name: '裁切成品', text: '精密裁切，確保尺寸精準。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm flyer size, content, and design files.' },
        { name: 'Printing', text: 'Four-color printing using professional equipment.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or spot UV.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'チラシのサイズ、内容、デザインデータを確認します。' },
        { name: '印刷', text: 'プロの設備を使用した4色印刷。' },
        { name: '表面加工', text: 'マット、グロス、局部UVなどの加工を選択します。' },
        { name: '精密裁断', text: '正確な寸法を保証します。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'same-day-flyers': {
    slug: 'same-day-flyers',
    keywords: {
      'zh-hk': '即日宣傳單張,香港即日宣張,即日宣傳單張印刷,香港印刷,印刷即日速遞送貨,即日傳單,急印傳單,24小時傳單,當天傳單,快印傳單,即日宣傳單',
      en: 'same-day flyers,same-day flyers printing hong kong, hong kong same-day flyers',
      ja: '即日チラシ,香港即日,即日チラシ印刷',
    },
    h1Suffix: {
      'zh-hk': '專業即日宣傳單張服務 | 智印港',
      en: 'Professional Same-day Flyers | ZprintPro',
      ja: 'プロ即日チラシ | ZprintPro',
    },
    longDescription: {
      'zh-hk': '緊急活動首選，最快當天交貨，支持印刷即日速遞送貨。品質保證，急件不擔心。智印港提供專業的即日宣傳單張服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'First choice for emergency events, same-day delivery available. ZprintPro offers professional Same-day Flyers services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '緊急イベントの第一選択、最短当日納品。 ZprintProは高品質な素材と先進的な印刷技術を使用した即日チラシサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '傳單的最小訂購量是多少？', a: '一般為100張起訂，數碼印刷可接受50張小量。' },
        { q: '傳單支持雙面印刷嗎？', a: '支持。我們提供單面和雙面印刷選項，雙面印刷可充分利用空間。' },
        { q: '傳單的交貨時間多久？', a: '標準3-5個工作日，急件可安排即日交貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Digital printing accepts 50 pieces.' },
        { q: 'Do you support double-sided printing?', a: 'Yes. We offer single-sided and double-sided printing options.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Rush same-day delivery available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100枚から。デジタル印刷は50枚から承ります。' },
        { q: '両面印刷は対応していますか？', a: 'はい。片面印刷と両面印刷の両方に対応しています。' },
        { q: '納期はどのくらい？', a: '標準3〜5営業日。急行の当日配送も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認傳單尺寸、內容和設計稿。' },
        { name: '印刷生產', text: '使用專業印刷機進行四色印刷。' },
        { name: '表面處理', text: '可選啞膠、光膠或局部UV等工藝。' },
        { name: '裁切成品', text: '精密裁切，確保尺寸精準。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm flyer size, content, and design files.' },
        { name: 'Printing', text: 'Four-color printing using professional equipment.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or spot UV.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'チラシのサイズ、内容、デザインデータを確認します。' },
        { name: '印刷', text: 'プロの設備を使用した4色印刷。' },
        { name: '表面加工', text: 'マット、グロス、局部UVなどの加工を選択します。' },
        { name: '精密裁断', text: '正確な寸法を保証します。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'eco-flyers': {
    slug: 'eco-flyers',
    keywords: {
      'zh-hk': '環保宣傳單張,香港環保宣張,環保宣傳單張印刷,香港印刷,環保傳單,再生紙傳單,FSC傳單,大豆油墨傳單,綠色傳單,可持續傳單',
      en: 'eco flyers,eco flyers printing hong kong, hong kong eco flyers',
      ja: 'エコチラシ,香港エコ,エコチラシ印刷',
    },
    h1Suffix: {
      'zh-hk': '專業環保宣傳單張服務 | 智印港',
      en: 'Professional Eco Flyers | ZprintPro',
      ja: 'プロエコチラシ | ZprintPro',
    },
    longDescription: {
      'zh-hk': '環保紙張印刷，展現企業責任。適合環保主題活動。智印港提供專業的環保宣傳單張服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Eco-friendly paper printing, showing corporate responsibility. ZprintPro offers professional Eco Flyers services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '環境に優しい紙の印刷、企業の責任を示す。 ZprintProは高品質な素材と先進的な印刷技術を使用したエコチラシサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '傳單的最小訂購量是多少？', a: '一般為100張起訂，數碼印刷可接受50張小量。' },
        { q: '傳單支持雙面印刷嗎？', a: '支持。我們提供單面和雙面印刷選項，雙面印刷可充分利用空間。' },
        { q: '傳單的交貨時間多久？', a: '標準3-5個工作日，急件可安排即日交貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Digital printing accepts 50 pieces.' },
        { q: 'Do you support double-sided printing?', a: 'Yes. We offer single-sided and double-sided printing options.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Rush same-day delivery available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100枚から。デジタル印刷は50枚から承ります。' },
        { q: '両面印刷は対応していますか？', a: 'はい。片面印刷と両面印刷の両方に対応しています。' },
        { q: '納期はどのくらい？', a: '標準3〜5営業日。急行の当日配送も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認傳單尺寸、內容和設計稿。' },
        { name: '印刷生產', text: '使用專業印刷機進行四色印刷。' },
        { name: '表面處理', text: '可選啞膠、光膠或局部UV等工藝。' },
        { name: '裁切成品', text: '精密裁切，確保尺寸精準。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm flyer size, content, and design files.' },
        { name: 'Printing', text: 'Four-color printing using professional equipment.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or spot UV.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'チラシのサイズ、内容、デザインデータを確認します。' },
        { name: '印刷', text: 'プロの設備を使用した4色印刷。' },
        { name: '表面加工', text: 'マット、グロス、局部UVなどの加工を選択します。' },
        { name: '精密裁断', text: '正確な寸法を保証します。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'a2-posters': {
    slug: 'a2-posters',
    keywords: {
      'zh-hk': 'A2海報印刷,香港A2印刷,香港印刷,印刷即日速遞送貨,A2海報,A2尺寸海報,A2活動海報,A2宣傳海報,A2展覽海報',
      en: 'a2 posters,a2 posters printing hong kong, hong kong a2 posters',
      ja: 'A2ポスター,香港A2,A2ポスター印刷',
    },
    h1Suffix: {
      'zh-hk': '專業A2海報印刷服務 | 智印港',
      en: 'Professional A2 Posters | ZprintPro',
      ja: 'プロA2ポスター | ZprintPro',
    },
    longDescription: {
      'zh-hk': '標準A2尺寸，活動宣傳、產品推廣首選，支持印刷即日速遞送貨。157g銅版紙，色彩鮮豔，即日交貨。智印港提供專業的A2海報印刷服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Standard A2 size, first choice for event promotion. 157g glossy paper, vibrant colors, same-day delivery. ZprintPro offers professional A2 Posters services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '標準A2サイズ、イベント宣伝の第一選択。157gコート紙、鮮やかな色彩、即日納品。 ZprintProは高品質な素材と先進的な印刷技術を使用したA2ポスターサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '海報的最大尺寸可以做到多大？', a: '我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。' },
        { q: '海報適合戶外使用嗎？', a: '我們提供戶外防水防曬材質，適合長期戶外展示。' },
        { q: '海報的交貨時間？', a: '標準3-5個工作日。大幅面海報可能需要額外時間。' },
      ],
      'en': [
        { q: 'What is the maximum poster size?', a: 'We support up to A0 size (841×1189mm). Larger sizes available via拼接.' },
        { q: 'Are posters suitable for outdoor use?', a: 'We offer waterproof and UV-resistant outdoor materials for long-term display.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Large format may require additional time.' },
      ],
      'ja': [
        { q: '最大サイズは？', a: '最大A0サイズ（841×1189mm）まで対応。それ以上は拼接も可能です。' },
        { q: '屋外使用にも適していますか？', a: '防水・UV耐性のある屋外専用素材もご用意しています。' },
        { q: '納期は？', a: '標準3〜5営業日。大判の場合は追加時間が必要な場合があります。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認海報尺寸、解析度和設計稿。' },
        { name: '輸出印刷', text: '使用大判印刷機進行高精度輸出。' },
        { name: '覆膜保護', text: '可選光膜或啞膜覆膜，增加耐用性。' },
        { name: '裁切/捲軸', text: '根據需求裁切或捲軸處理。' },
        { name: '質檢包裝', text: '檢查色彩和清晰度，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm poster size, resolution, and design files.' },
        { name: 'Large Format Printing', text: 'High-precision output using large format printer.' },
        { name: 'Lamination', text: 'Optional glossy or matte lamination for durability.' },
        { name: 'Cutting/Rolling', text: 'Cut or roll based on requirements.' },
        { name: 'QC & Packaging', text: 'Check color and clarity before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'ポスターのサイズ、解像度、デザインデータを確認します。' },
        { name: '大判印刷', text: '大判印刷機を使用した高精度出力。' },
        { name: 'ラミネーション', text: 'グロスまたはマットラミネーションで耐久性を向上させます。' },
        { name: '裁断・巻取り', text: '必要に応じて裁断または巻取り処理を行います。' },
        { name: '品質検査・梱包', text: '色と鮮明さを検査し、出荷します。' },
      ],
    },
  },
  'a1-posters': {
    slug: 'a1-posters',
    keywords: {
      'zh-hk': 'A1大幅海報,香港A1海報,A1海報印刷,戶外海報,展覽海報,Backdrop背景板,餐廳海報,PP海報裱貼,防水海報,A0海報印刷,印刷即日速遞送貨',
      en: 'a1 large posters,a1 poster printing hong kong,outdoor posters,exhibition posters,event backdrops,restaurant menu posters,pp laminated posters,waterproof posters,a0 poster printing,same day poster printing',
      ja: 'A1大型ポスター,香港A1ポスター,屋外用ポスター,展示会用ポスター,イベントバックドロップ,飲食店メニューポスター,PPラミネートポスター,防水ポスター,A0ポスター印刷,即日ポスター印刷',
    },
    h1Suffix: {
      'zh-hk': '專業A1大幅海報服務 | 智印港',
      en: 'Professional A1 Large Posters | ZprintPro',
      ja: 'プロA1大型ポスター | ZprintPro',
    },
    longDescription: {
      'zh-hk': 'A1大尺寸，視覺衝擊力強，支持印刷即日速遞送貨。適合展覽、會場佈置。智印港提供專業的A1大幅海報服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'A1 large size, strong visual impact. Perfect for exhibitions, venue decoration. ZprintPro offers professional A1 Large Posters services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'A1大きなサイズ、強い視覚的インパクト。展示会、会場装飾に最適。 ZprintProは高品質な素材と先進的な印刷技術を使用したA1大型ポスターサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '海報的最大尺寸可以做到多大？', a: '我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。' },
        { q: '海報適合戶外使用嗎？', a: '我們提供戶外防水防曬材質，適合長期戶外展示。' },
        { q: '海報的交貨時間？', a: '標準3-5個工作日。大幅面海報可能需要額外時間。' },
      ],
      'en': [
        { q: 'What is the maximum poster size?', a: 'We support up to A0 size (841×1189mm). Larger sizes available via拼接.' },
        { q: 'Are posters suitable for outdoor use?', a: 'We offer waterproof and UV-resistant outdoor materials for long-term display.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Large format may require additional time.' },
      ],
      'ja': [
        { q: '最大サイズは？', a: '最大A0サイズ（841×1189mm）まで対応。それ以上は拼接も可能です。' },
        { q: '屋外使用にも適していますか？', a: '防水・UV耐性のある屋外専用素材もご用意しています。' },
        { q: '納期は？', a: '標準3〜5営業日。大判の場合は追加時間が必要な場合があります。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認海報尺寸、解析度和設計稿。' },
        { name: '輸出印刷', text: '使用大判印刷機進行高精度輸出。' },
        { name: '覆膜保護', text: '可選光膜或啞膜覆膜，增加耐用性。' },
        { name: '裁切/捲軸', text: '根據需求裁切或捲軸處理。' },
        { name: '質檢包裝', text: '檢查色彩和清晰度，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm poster size, resolution, and design files.' },
        { name: 'Large Format Printing', text: 'High-precision output using large format printer.' },
        { name: 'Lamination', text: 'Optional glossy or matte lamination for durability.' },
        { name: 'Cutting/Rolling', text: 'Cut or roll based on requirements.' },
        { name: 'QC & Packaging', text: 'Check color and clarity before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'ポスターのサイズ、解像度、デザインデータを確認します。' },
        { name: '大判印刷', text: '大判印刷機を使用した高精度出力。' },
        { name: 'ラミネーション', text: 'グロスまたはマットラミネーションで耐久性を向上させます。' },
        { name: '裁断・巻取り', text: '必要に応じて裁断または巻取り処理を行います。' },
        { name: '品質検査・梱包', text: '色と鮮明さを検査し、出荷します。' },
      ],
    },
  },
  'outdoor-posters': {
    slug: 'outdoor-posters',
    keywords: {
      'zh-hk': '戶外海報印刷,防水海報,防曬海報,戶外廣告海報,大型戶外海報,戶外海報訂造,戶外海報設計,戶外海報香港,戶外海報報價,戶外海報速印,戶外海報少量印刷,街招海報,建築棚架海報',
      'en': 'outdoor poster printing,waterproof posters,weatherproof posters,outdoor advertising posters,large outdoor posters,custom outdoor posters,outdoor poster design,outdoor posters hong kong,outdoor poster quote,outdoor poster printing service,construction hoarding posters,street posters',
      'ja': '屋外ポスター印刷,防水ポスター,耐候性ポスター,屋外広告ポスター,大型屋外ポスター,カスタム屋外ポスター,屋外ポスターデザイン,屋外ポスター香港,屋外ポスター見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業戶外海報服務 | 智印港',
      en: 'Professional Outdoor Posters | ZprintPro',
      ja: 'プロ屋外ポスター | ZprintPro',
    },
    longDescription: {
      'zh-hk': '防水防曬材質，戶外使用不褪色，支持印刷即日速遞送貨。適合戶外廣告、建築圍板。智印港提供專業的戶外海報服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Waterproof and UV-resistant material, no fading for outdoor use. ZprintPro offers professional Outdoor Posters services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '防水・UV耐性素材、屋外使用でも色褪せません。 ZprintProは高品質な素材と先進的な印刷技術を使用した屋外ポスターサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '海報的最大尺寸可以做到多大？', a: '我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。' },
        { q: '海報適合戶外使用嗎？', a: '我們提供戶外防水防曬材質，適合長期戶外展示。' },
        { q: '海報的交貨時間？', a: '標準3-5個工作日。大幅面海報可能需要額外時間。' },
      ],
      'en': [
        { q: 'What is the maximum poster size?', a: 'We support up to A0 size (841×1189mm). Larger sizes available via拼接.' },
        { q: 'Are posters suitable for outdoor use?', a: 'We offer waterproof and UV-resistant outdoor materials for long-term display.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Large format may require additional time.' },
      ],
      'ja': [
        { q: '最大サイズは？', a: '最大A0サイズ（841×1189mm）まで対応。それ以上は拼接も可能です。' },
        { q: '屋外使用にも適していますか？', a: '防水・UV耐性のある屋外専用素材もご用意しています。' },
        { q: '納期は？', a: '標準3〜5営業日。大判の場合は追加時間が必要な場合があります。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認海報尺寸、解析度和設計稿。' },
        { name: '輸出印刷', text: '使用大判印刷機進行高精度輸出。' },
        { name: '覆膜保護', text: '可選光膜或啞膜覆膜，增加耐用性。' },
        { name: '裁切/捲軸', text: '根據需求裁切或捲軸處理。' },
        { name: '質檢包裝', text: '檢查色彩和清晰度，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm poster size, resolution, and design files.' },
        { name: 'Large Format Printing', text: 'High-precision output using large format printer.' },
        { name: 'Lamination', text: 'Optional glossy or matte lamination for durability.' },
        { name: 'Cutting/Rolling', text: 'Cut or roll based on requirements.' },
        { name: 'QC & Packaging', text: 'Check color and clarity before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'ポスターのサイズ、解像度、デザインデータを確認します。' },
        { name: '大判印刷', text: '大判印刷機を使用した高精度出力。' },
        { name: 'ラミネーション', text: 'グロスまたはマットラミネーションで耐久性を向上させます。' },
        { name: '裁断・巻取り', text: '必要に応じて裁断または巻取り処理を行います。' },
        { name: '品質検査・梱包', text: '色と鮮明さを検査し、出荷します。' },
      ],
    },
  },
  'display-posters': {
    slug: 'display-posters',
    keywords: {
      'zh-hk': '展示海報印刷,展板海報,陳列海報,賣場海報,店內展示海報,展示海報訂造,展示海報設計,展示海報香港,展示海報報價,展示海報速印,展示海報少量印刷,零售展示海報,櫥窗海報',
      'en': 'display poster printing,display posters,retail display posters,store posters,shop display posters,custom display posters,display poster design,display posters hong kong,display poster quote,display poster printing service,visual merchandising posters,window display posters',
      'ja': 'ディスプレイポスター印刷,ディスプレイポスター,陳列ポスター,店舗ポスター,小売ディスプレイポスター,カスタムディスプレイポスター,ディスプレイポスターデザイン,ディスプレイポスター香港',
    },
    h1Suffix: {
      'zh-hk': '專業展架海報服務 | 智印港',
      en: 'Professional Display Posters | ZprintPro',
      ja: 'プロ展示用ポスター | ZprintPro',
    },
    longDescription: {
      'zh-hk': '配合X展架或易拉寶使用，便攜易裝。展會、路演必備。智印港提供專業的展架海報服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Compatible with X-stands or roll-up banners, portable and easy to install. ZprintPro offers professional Display Posters services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'Xスタンドまたはロールアップバナーと互換、持ち運び可能で設置簡単。 ZprintProは高品質な素材と先進的な印刷技術を使用した展示用ポスターサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '海報的最大尺寸可以做到多大？', a: '我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。' },
        { q: '海報適合戶外使用嗎？', a: '我們提供戶外防水防曬材質，適合長期戶外展示。' },
        { q: '海報的交貨時間？', a: '標準3-5個工作日。大幅面海報可能需要額外時間。' },
      ],
      'en': [
        { q: 'What is the maximum poster size?', a: 'We support up to A0 size (841×1189mm). Larger sizes available via拼接.' },
        { q: 'Are posters suitable for outdoor use?', a: 'We offer waterproof and UV-resistant outdoor materials for long-term display.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Large format may require additional time.' },
      ],
      'ja': [
        { q: '最大サイズは？', a: '最大A0サイズ（841×1189mm）まで対応。それ以上は拼接も可能です。' },
        { q: '屋外使用にも適していますか？', a: '防水・UV耐性のある屋外専用素材もご用意しています。' },
        { q: '納期は？', a: '標準3〜5営業日。大判の場合は追加時間が必要な場合があります。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認海報尺寸、解析度和設計稿。' },
        { name: '輸出印刷', text: '使用大判印刷機進行高精度輸出。' },
        { name: '覆膜保護', text: '可選光膜或啞膜覆膜，增加耐用性。' },
        { name: '裁切/捲軸', text: '根據需求裁切或捲軸處理。' },
        { name: '質檢包裝', text: '檢查色彩和清晰度，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm poster size, resolution, and design files.' },
        { name: 'Large Format Printing', text: 'High-precision output using large format printer.' },
        { name: 'Lamination', text: 'Optional glossy or matte lamination for durability.' },
        { name: 'Cutting/Rolling', text: 'Cut or roll based on requirements.' },
        { name: 'QC & Packaging', text: 'Check color and clarity before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'ポスターのサイズ、解像度、デザインデータを確認します。' },
        { name: '大判印刷', text: '大判印刷機を使用した高精度出力。' },
        { name: 'ラミネーション', text: 'グロスまたはマットラミネーションで耐久性を向上させます。' },
        { name: '裁断・巻取り', text: '必要に応じて裁断または巻取り処理を行います。' },
        { name: '品質検査・梱包', text: '色と鮮明さを検査し、出荷します。' },
      ],
    },
  },
  'art-posters': {
    slug: 'art-posters',
    keywords: {
      'zh-hk': '藝術海報印刷,畫作海報,美術海報,展覽海報,藝術品複製,藝術海報訂造,藝術海報設計,藝術海報香港,藝術海報報價,藝術海報速印,藝術海報少量印刷,畫廊海報,攝影海報',
      'en': 'art poster printing,art prints,fine art posters,exhibition posters,art reproductions,custom art posters,art poster design,art posters hong kong,art poster quote,art poster printing service,gallery posters,photography posters',
      'ja': 'アートポスター印刷,アートプリント,美術ポスター,展覧会ポスター,美術品複製,カスタムアートポスター,アートポスターデザイン,アートポスター香港,アートポスター見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業藝術海報服務 | 智印港',
      en: 'Professional Art Posters | ZprintPro',
      ja: 'プロアートポスター | ZprintPro',
    },
    longDescription: {
      'zh-hk': '高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品。智印港提供專業的藝術海報服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Premium art paper, high color accuracy. Perfect for art exhibitions, photography works. ZprintPro offers professional Art Posters services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '高級アート紙、高い色再現性。美術展、写真作品に最適。 ZprintProは高品質な素材と先進的な印刷技術を使用したアートポスターサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '海報的最大尺寸可以做到多大？', a: '我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。' },
        { q: '海報適合戶外使用嗎？', a: '我們提供戶外防水防曬材質，適合長期戶外展示。' },
        { q: '海報的交貨時間？', a: '標準3-5個工作日。大幅面海報可能需要額外時間。' },
      ],
      'en': [
        { q: 'What is the maximum poster size?', a: 'We support up to A0 size (841×1189mm). Larger sizes available via拼接.' },
        { q: 'Are posters suitable for outdoor use?', a: 'We offer waterproof and UV-resistant outdoor materials for long-term display.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Large format may require additional time.' },
      ],
      'ja': [
        { q: '最大サイズは？', a: '最大A0サイズ（841×1189mm）まで対応。それ以上は拼接も可能です。' },
        { q: '屋外使用にも適していますか？', a: '防水・UV耐性のある屋外専用素材もご用意しています。' },
        { q: '納期は？', a: '標準3〜5営業日。大判の場合は追加時間が必要な場合があります。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認海報尺寸、解析度和設計稿。' },
        { name: '輸出印刷', text: '使用大判印刷機進行高精度輸出。' },
        { name: '覆膜保護', text: '可選光膜或啞膜覆膜，增加耐用性。' },
        { name: '裁切/捲軸', text: '根據需求裁切或捲軸處理。' },
        { name: '質檢包裝', text: '檢查色彩和清晰度，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm poster size, resolution, and design files.' },
        { name: 'Large Format Printing', text: 'High-precision output using large format printer.' },
        { name: 'Lamination', text: 'Optional glossy or matte lamination for durability.' },
        { name: 'Cutting/Rolling', text: 'Cut or roll based on requirements.' },
        { name: 'QC & Packaging', text: 'Check color and clarity before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'ポスターのサイズ、解像度、デザインデータを確認します。' },
        { name: '大判印刷', text: '大判印刷機を使用した高精度出力。' },
        { name: 'ラミネーション', text: 'グロスまたはマットラミネーションで耐久性を向上させます。' },
        { name: '裁断・巻取り', text: '必要に応じて裁断または巻取り処理を行います。' },
        { name: '品質検査・梱包', text: '色と鮮明さを検査し、出荷します。' },
      ],
    },
  },
  'adhesive-posters': {
    slug: 'adhesive-posters',
    keywords: {
      'zh-hk': '背膠海報印刷,自粘海報,貼牆海報,可移海報,背膠海報訂造,背膠海報設計,背膠海報香港,背膠海報報價,背膠海報速印,背膠海報少量印刷,牆貼海報,窗貼海報,室內背膠海報',
      'en': 'adhesive poster printing,self adhesive posters,stick on posters,wall posters,removable adhesive posters,custom adhesive posters,adhesive poster design,adhesive posters hong kong,adhesive poster quote,adhesive poster printing service,indoor adhesive posters,window cling posters',
      'ja': '粘着ポスター印刷,セルフ粘着ポスター,壁貼りポスター,はがせる粘着ポスター,カスタム粘着ポスター,粘着ポスターデザイン,粘着ポスター香港,粘着ポスター見積もり,屋内粘着ポスター',
    },
    h1Suffix: {
      'zh-hk': '專業背膠海報服務 | 智印港',
      en: 'Professional Adhesive Posters | ZprintPro',
      ja: 'プロ粘着ポスター | ZprintPro',
    },
    longDescription: {
      'zh-hk': '自帶背膠，可直接粘貼。適合店鋪櫥窗、牆面裝飾。智印港提供專業的背膠海報服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Self-adhesive, can be directly applied. Perfect for shop windows, wall decoration. ZprintPro offers professional Adhesive Posters services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '自己粘着、直接貼付可能。店舗の窓、壁の装飾に最適。 ZprintProは高品質な素材と先進的な印刷技術を使用した粘着ポスターサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '海報的最大尺寸可以做到多大？', a: '我們支持最大A0尺寸（841×1189mm），更大尺寸可定制拼接。' },
        { q: '海報適合戶外使用嗎？', a: '我們提供戶外防水防曬材質，適合長期戶外展示。' },
        { q: '海報的交貨時間？', a: '標準3-5個工作日。大幅面海報可能需要額外時間。' },
      ],
      'en': [
        { q: 'What is the maximum poster size?', a: 'We support up to A0 size (841×1189mm). Larger sizes available via拼接.' },
        { q: 'Are posters suitable for outdoor use?', a: 'We offer waterproof and UV-resistant outdoor materials for long-term display.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Large format may require additional time.' },
      ],
      'ja': [
        { q: '最大サイズは？', a: '最大A0サイズ（841×1189mm）まで対応。それ以上は拼接も可能です。' },
        { q: '屋外使用にも適していますか？', a: '防水・UV耐性のある屋外専用素材もご用意しています。' },
        { q: '納期は？', a: '標準3〜5営業日。大判の場合は追加時間が必要な場合があります。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認海報尺寸、解析度和設計稿。' },
        { name: '輸出印刷', text: '使用大判印刷機進行高精度輸出。' },
        { name: '覆膜保護', text: '可選光膜或啞膜覆膜，增加耐用性。' },
        { name: '裁切/捲軸', text: '根據需求裁切或捲軸處理。' },
        { name: '質檢包裝', text: '檢查色彩和清晰度，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm poster size, resolution, and design files.' },
        { name: 'Large Format Printing', text: 'High-precision output using large format printer.' },
        { name: 'Lamination', text: 'Optional glossy or matte lamination for durability.' },
        { name: 'Cutting/Rolling', text: 'Cut or roll based on requirements.' },
        { name: 'QC & Packaging', text: 'Check color and clarity before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'ポスターのサイズ、解像度、デザインデータを確認します。' },
        { name: '大判印刷', text: '大判印刷機を使用した高精度出力。' },
        { name: 'ラミネーション', text: 'グロスまたはマットラミネーションで耐久性を向上させます。' },
        { name: '裁断・巻取り', text: '必要に応じて裁断または巻取り処理を行います。' },
        { name: '品質検査・梱包', text: '色と鮮明さを検査し、出荷します。' },
      ],
    },
  },
  'gift-boxes': {
    slug: 'gift-boxes',
    keywords: {
      'zh-hk': '禮品盒印刷,禮物盒制作,精美禮盒,禮盒包裝印刷,禮品盒訂造,禮品盒設計,禮品盒香港,禮品盒報價,禮品盒速印,禮品盒少量印刷,高檔禮品盒,品牌禮盒,節日禮盒',
      'en': 'gift box printing,present boxes,luxury gift boxes,gift packaging printing,custom gift boxes,gift box design,gift boxes hong kong,gift box quote,gift box printing service,premium gift boxes,branded gift boxes,festival gift boxes',
      'ja': 'ギフトボックス印刷,プレゼント箱,高級ギフトボックス,ギフトパッケージ印刷,カスタムギフトボックス,ギフトボックスデザイン,ギフトボックス香港,ギフトボックス見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業禮品盒定制服務 | 智印港',
      en: 'Professional Gift Boxes | ZprintPro',
      ja: 'プロギフトボックス | ZprintPro',
    },
    longDescription: {
      'zh-hk': '精緻禮品盒，配合燙金、UV等工藝，支持印刷即日速遞送貨。送禮首選，提升產品價值。智印港提供專業的禮品盒定制服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Exquisite gift boxes with foil stamping, UV and other processes. ZprintPro offers professional Gift Boxes services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '精巧なギフトボックス、箔押し・UVなどの加工付き。 ZprintProは高品質な素材と先進的な印刷技術を使用したギフトボックスサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '包裝盒的最小訂購量是多少？', a: '一般為100個起訂，定制盒型需500個起。' },
        { q: '可以定制包裝盒的尺寸和結構嗎？', a: '可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定制。' },
        { q: '包裝盒打樣需要多長時間？', a: '數碼打樣2-3天，傳統打樣5-7天。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Custom box types require 500 pieces.' },
        { q: 'Can I customize box size and structure?', a: 'Yes. We support various box types including lid-base, drawer, and book-style boxes.' },
        { q: 'How long does prototyping take?', a: 'Digital proofing 2-3 days. Traditional proofing 5-7 days.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100個から。カスタム箱型は500個から。' },
        { q: 'サイズと構造のカスタマイズは可能？', a: 'はい。天地蓋、引き出し式、ブック型など様々な箱型に対応しています。' },
        { q: '試作にどのくらい時間がかかりますか？', a: 'デジタル試作2〜3日。伝統的試作5〜7日です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認盒型、尺寸和印刷設計。' },
        { name: '刀模製作', text: '根據盒型製作專用刀模。' },
        { name: '紙張印刷', text: '進行四色印刷和表面處理。' },
        { name: '裱糊/覆膜', text: '將印刷面紙裱糊到灰板或瓦楞板上。' },
        { name: '模切壓痕', text: '使用刀模進行模切和壓痕。' },
        { name: '摺疊粘合', text: '將板材摺疊成盒並粘合。' },
        { name: '質檢包裝', text: '檢查尺寸精度和承重能力，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm box type, size, and printing design.' },
        { name: 'Die Making', text: 'Create dedicated die based on box type.' },
        { name: 'Paper Printing', text: 'Four-color printing and surface finishing.' },
        { name: 'Mounting', text: 'Mount printed face paper onto gray board or corrugated board.' },
        { name: 'Die Cutting & Creasing', text: 'Die cut and crease using the die.' },
        { name: 'Folding & Gluing', text: 'Fold boards into boxes and glue.' },
        { name: 'QC & Packaging', text: 'Check dimensional accuracy and load capacity before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '箱型、サイズ、印刷デザインを確認します。' },
        { name: '型製作', text: '箱型に基づいて専用のダイを作成します。' },
        { name: '用紙印刷', text: '4色印刷と表面加工を行います。' },
        { name: '貼り合わせ', text: '印刷された表紙を灰板または段ボールに貼り合わせます。' },
        { name: 'ダイカット・圧線', text: 'ダイを使用してカットと圧線を行います。' },
        { name: '折り畳み・接着', text: '板材を箱に折り畳み、接着します。' },
        { name: '品質検査・梱包', text: '寸法精度と耐荷重性を検査し、出荷します。' },
      ],
    },
  },
  'cosmetic-boxes': {
    slug: 'cosmetic-boxes',
    keywords: {
      'zh-hk': '化妝品盒印刷,護膚品包裝盒,彩妝盒印刷,美容產品包裝,化妝品盒訂造,化妝品盒設計,化妝品盒香港,化妝品盒報價,化妝品盒速印,化妝品盒少量印刷,精緻化妝品盒,品牌化妝品盒',
      'en': 'cosmetic box printing,skincare packaging boxes,makeup box printing,beauty product packaging,custom cosmetic boxes,cosmetic box design,cosmetic boxes hong kong,cosmetic box quote,cosmetic box printing service,premium cosmetic boxes,branded cosmetic packaging',
      'ja': '化粧品箱印刷,スキンケアパッケージ箱,メイクボックス印刷,美容製品パッケージ,カスタム化粧品箱,化粧品箱デザイン,化粧品箱香港,化粧品箱見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業化妝品盒服務 | 智印港',
      en: 'Professional Cosmetic Boxes | ZprintPro',
      ja: 'プロ化粧品箱 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '專為化妝品設計，內托可定制，支持印刷即日速遞送貨。適合護膚品、彩妝品牌。智印港提供專業的化妝品盒服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Specially designed for cosmetics, customizable inner tray. ZprintPro offers professional Cosmetic Boxes services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '化粧品専用設計、カスタマイズ可能な内側トレイ。 ZprintProは高品質な素材と先進的な印刷技術を使用した化粧品箱サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '包裝盒的最小訂購量是多少？', a: '一般為100個起訂，定制盒型需500個起。' },
        { q: '可以定制包裝盒的尺寸和結構嗎？', a: '可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定制。' },
        { q: '包裝盒打樣需要多長時間？', a: '數碼打樣2-3天，傳統打樣5-7天。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Custom box types require 500 pieces.' },
        { q: 'Can I customize box size and structure?', a: 'Yes. We support various box types including lid-base, drawer, and book-style boxes.' },
        { q: 'How long does prototyping take?', a: 'Digital proofing 2-3 days. Traditional proofing 5-7 days.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100個から。カスタム箱型は500個から。' },
        { q: 'サイズと構造のカスタマイズは可能？', a: 'はい。天地蓋、引き出し式、ブック型など様々な箱型に対応しています。' },
        { q: '試作にどのくらい時間がかかりますか？', a: 'デジタル試作2〜3日。伝統的試作5〜7日です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認盒型、尺寸和印刷設計。' },
        { name: '刀模製作', text: '根據盒型製作專用刀模。' },
        { name: '紙張印刷', text: '進行四色印刷和表面處理。' },
        { name: '裱糊/覆膜', text: '將印刷面紙裱糊到灰板或瓦楞板上。' },
        { name: '模切壓痕', text: '使用刀模進行模切和壓痕。' },
        { name: '摺疊粘合', text: '將板材摺疊成盒並粘合。' },
        { name: '質檢包裝', text: '檢查尺寸精度和承重能力，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm box type, size, and printing design.' },
        { name: 'Die Making', text: 'Create dedicated die based on box type.' },
        { name: 'Paper Printing', text: 'Four-color printing and surface finishing.' },
        { name: 'Mounting', text: 'Mount printed face paper onto gray board or corrugated board.' },
        { name: 'Die Cutting & Creasing', text: 'Die cut and crease using the die.' },
        { name: 'Folding & Gluing', text: 'Fold boards into boxes and glue.' },
        { name: 'QC & Packaging', text: 'Check dimensional accuracy and load capacity before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '箱型、サイズ、印刷デザインを確認します。' },
        { name: '型製作', text: '箱型に基づいて専用のダイを作成します。' },
        { name: '用紙印刷', text: '4色印刷と表面加工を行います。' },
        { name: '貼り合わせ', text: '印刷された表紙を灰板または段ボールに貼り合わせます。' },
        { name: 'ダイカット・圧線', text: 'ダイを使用してカットと圧線を行います。' },
        { name: '折り畳み・接着', text: '板材を箱に折り畳み、接着します。' },
        { name: '品質検査・梱包', text: '寸法精度と耐荷重性を検査し、出荷します。' },
      ],
    },
  },
  'food-boxes': {
    slug: 'food-boxes',
    keywords: {
      'zh-hk': '食品盒印刷,食物包裝盒,餐盒印刷,外賣盒印刷,食品級包裝盒,食品盒訂造,食品盒設計,食品盒香港,食品盒報價,食品盒速印,食品盒少量印刷,烘焙包裝盒,甜品盒印刷',
      'en': 'food box printing,food packaging boxes,meal box printing,takeaway box printing,food grade packaging,custom food boxes,food box design,food boxes hong kong,food box quote,food box printing service,bakery packaging boxes,dessert box printing',
      'ja': '食品箱印刷,食品パッケージ箱,弁当箱印刷,テイクアウト箱印刷,食品級パッケージ,カスタム食品箱,食品箱デザイン,食品箱香港,食品箱見積もり,ベーカリーパッケージ箱,デザート箱印刷',
    },
    h1Suffix: {
      'zh-hk': '專業食品包裝盒服務 | 智印港',
      en: 'Professional Food Boxes | ZprintPro',
      ja: 'プロ食品包装箱 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '食品級材質，安全環保。適合糕點、茶葉、保健品。智印港提供專業的食品包裝盒服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Food-grade material, safe and eco-friendly. ZprintPro offers professional Food Boxes services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '食品グレード素材、安全で環境に優しい。 ZprintProは高品質な素材と先進的な印刷技術を使用した食品包装箱サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '包裝盒的最小訂購量是多少？', a: '一般為100個起訂，定制盒型需500個起。' },
        { q: '可以定制包裝盒的尺寸和結構嗎？', a: '可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定制。' },
        { q: '包裝盒打樣需要多長時間？', a: '數碼打樣2-3天，傳統打樣5-7天。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Custom box types require 500 pieces.' },
        { q: 'Can I customize box size and structure?', a: 'Yes. We support various box types including lid-base, drawer, and book-style boxes.' },
        { q: 'How long does prototyping take?', a: 'Digital proofing 2-3 days. Traditional proofing 5-7 days.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100個から。カスタム箱型は500個から。' },
        { q: 'サイズと構造のカスタマイズは可能？', a: 'はい。天地蓋、引き出し式、ブック型など様々な箱型に対応しています。' },
        { q: '試作にどのくらい時間がかかりますか？', a: 'デジタル試作2〜3日。伝統的試作5〜7日です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認盒型、尺寸和印刷設計。' },
        { name: '刀模製作', text: '根據盒型製作專用刀模。' },
        { name: '紙張印刷', text: '進行四色印刷和表面處理。' },
        { name: '裱糊/覆膜', text: '將印刷面紙裱糊到灰板或瓦楞板上。' },
        { name: '模切壓痕', text: '使用刀模進行模切和壓痕。' },
        { name: '摺疊粘合', text: '將板材摺疊成盒並粘合。' },
        { name: '質檢包裝', text: '檢查尺寸精度和承重能力，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm box type, size, and printing design.' },
        { name: 'Die Making', text: 'Create dedicated die based on box type.' },
        { name: 'Paper Printing', text: 'Four-color printing and surface finishing.' },
        { name: 'Mounting', text: 'Mount printed face paper onto gray board or corrugated board.' },
        { name: 'Die Cutting & Creasing', text: 'Die cut and crease using the die.' },
        { name: 'Folding & Gluing', text: 'Fold boards into boxes and glue.' },
        { name: 'QC & Packaging', text: 'Check dimensional accuracy and load capacity before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '箱型、サイズ、印刷デザインを確認します。' },
        { name: '型製作', text: '箱型に基づいて専用のダイを作成します。' },
        { name: '用紙印刷', text: '4色印刷と表面加工を行います。' },
        { name: '貼り合わせ', text: '印刷された表紙を灰板または段ボールに貼り合わせます。' },
        { name: 'ダイカット・圧線', text: 'ダイを使用してカットと圧線を行います。' },
        { name: '折り畳み・接着', text: '板材を箱に折り畳み、接着します。' },
        { name: '品質検査・梱包', text: '寸法精度と耐荷重性を検査し、出荷します。' },
      ],
    },
  },
  'mailer-boxes': {
    slug: 'mailer-boxes',
    keywords: {
      'zh-hk': '飛機盒印刷,快遞盒印刷,郵寄盒制作,瓦通紙盒,電商包裝盒,飛機盒訂造,飛機盒設計,飛機盒香港,飛機盒報價,飛機盒速印,飛機盒少量印刷,包裝飛機盒,定制快遞盒',
      'en': 'mailer box shipping boxes,corrugated mailer boxes,ecommerce packaging boxes,custom mailer boxes,mailer box design,mailer boxes hong kong,mailer box quote,mailer box printing service,branded shipping boxes,subscription box printing,product mailer boxes',
      'ja': 'メーラーボックス印刷,配送用箱,段ボールメーラーボックス,ECパッケージ箱,カスタムメーラーボックス,メーラーボックスデザイン,メーラーボックス香港,メーラーボックス見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業快遞盒/飛機盒服務 | 智印港',
      en: 'Professional Mailer Boxes | ZprintPro',
      ja: 'プロ発送箱 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '堅固耐用，電商發貨首選，支持印刷即日速遞送貨。可印品牌Logo，提升開箱體驗。智印港提供專業的快遞盒/飛機盒服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Sturdy and durable, first choice for e-commerce shipping. ZprintPro offers professional Mailer Boxes services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '頑丈で耐久性があり、EC発送の第一選択。 ZprintProは高品質な素材と先進的な印刷技術を使用した発送箱サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '包裝盒的最小訂購量是多少？', a: '一般為100個起訂，定制盒型需500個起。' },
        { q: '可以定制包裝盒的尺寸和結構嗎？', a: '可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定制。' },
        { q: '包裝盒打樣需要多長時間？', a: '數碼打樣2-3天，傳統打樣5-7天。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Custom box types require 500 pieces.' },
        { q: 'Can I customize box size and structure?', a: 'Yes. We support various box types including lid-base, drawer, and book-style boxes.' },
        { q: 'How long does prototyping take?', a: 'Digital proofing 2-3 days. Traditional proofing 5-7 days.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100個から。カスタム箱型は500個から。' },
        { q: 'サイズと構造のカスタマイズは可能？', a: 'はい。天地蓋、引き出し式、ブック型など様々な箱型に対応しています。' },
        { q: '試作にどのくらい時間がかかりますか？', a: 'デジタル試作2〜3日。伝統的試作5〜7日です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認盒型、尺寸和印刷設計。' },
        { name: '刀模製作', text: '根據盒型製作專用刀模。' },
        { name: '紙張印刷', text: '進行四色印刷和表面處理。' },
        { name: '裱糊/覆膜', text: '將印刷面紙裱糊到灰板或瓦楞板上。' },
        { name: '模切壓痕', text: '使用刀模進行模切和壓痕。' },
        { name: '摺疊粘合', text: '將板材摺疊成盒並粘合。' },
        { name: '質檢包裝', text: '檢查尺寸精度和承重能力，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm box type, size, and printing design.' },
        { name: 'Die Making', text: 'Create dedicated die based on box type.' },
        { name: 'Paper Printing', text: 'Four-color printing and surface finishing.' },
        { name: 'Mounting', text: 'Mount printed face paper onto gray board or corrugated board.' },
        { name: 'Die Cutting & Creasing', text: 'Die cut and crease using the die.' },
        { name: 'Folding & Gluing', text: 'Fold boards into boxes and glue.' },
        { name: 'QC & Packaging', text: 'Check dimensional accuracy and load capacity before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '箱型、サイズ、印刷デザインを確認します。' },
        { name: '型製作', text: '箱型に基づいて専用のダイを作成します。' },
        { name: '用紙印刷', text: '4色印刷と表面加工を行います。' },
        { name: '貼り合わせ', text: '印刷された表紙を灰板または段ボールに貼り合わせます。' },
        { name: 'ダイカット・圧線', text: 'ダイを使用してカットと圧線を行います。' },
        { name: '折り畳み・接着', text: '板材を箱に折り畳み、接着します。' },
        { name: '品質検査・梱包', text: '寸法精度と耐荷重性を検査し、出荷します。' },
      ],
    },
  },
  'folding-boxes': {
    slug: 'folding-boxes',
    keywords: {
      'zh-hk': '摺盒印刷,摺疊盒制作,平摺盒印刷,卡紙摺盒,自動摺盒,摺盒包裝,摺盒訂造,摺盒設計,摺盒香港,摺盒報價,摺盒速印,摺盒少量印刷,產品摺盒,禮品摺盒',
      'en': 'folding box printing,foldable boxes,carton folding boxes,cardboard folding boxes,auto lock boxes,folding packaging,folding box design,folding boxes hong kong,folding box quote,folding box printing service,product folding boxes,gift folding boxes',
      'ja': '組み立て箱印刷,折りたたみ箱,カートン折りたたみ箱,段ボール折りたたみ箱,自動ロック箱,折りたたみパッケージ,折りたたみ箱デザイン,折りたたみ箱香港,折りたたみ箱見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業折疊盒服務 | 智印港',
      en: 'Professional Folding Boxes | ZprintPro',
      ja: 'プロ折りたたみ箱 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '可折疊設計，節省倉儲空間。適合大量存貨的電商賣家。智印港提供專業的折疊盒服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Foldable design, saves warehouse space. ZprintPro offers professional Folding Boxes services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '折りたたみ可能なデザイン、倉庫スペースを節約。 ZprintProは高品質な素材と先進的な印刷技術を使用した折りたたみ箱サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '包裝盒的最小訂購量是多少？', a: '一般為100個起訂，定制盒型需500個起。' },
        { q: '可以定制包裝盒的尺寸和結構嗎？', a: '可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定制。' },
        { q: '包裝盒打樣需要多長時間？', a: '數碼打樣2-3天，傳統打樣5-7天。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Custom box types require 500 pieces.' },
        { q: 'Can I customize box size and structure?', a: 'Yes. We support various box types including lid-base, drawer, and book-style boxes.' },
        { q: 'How long does prototyping take?', a: 'Digital proofing 2-3 days. Traditional proofing 5-7 days.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100個から。カスタム箱型は500個から。' },
        { q: 'サイズと構造のカスタマイズは可能？', a: 'はい。天地蓋、引き出し式、ブック型など様々な箱型に対応しています。' },
        { q: '試作にどのくらい時間がかかりますか？', a: 'デジタル試作2〜3日。伝統的試作5〜7日です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認盒型、尺寸和印刷設計。' },
        { name: '刀模製作', text: '根據盒型製作專用刀模。' },
        { name: '紙張印刷', text: '進行四色印刷和表面處理。' },
        { name: '裱糊/覆膜', text: '將印刷面紙裱糊到灰板或瓦楞板上。' },
        { name: '模切壓痕', text: '使用刀模進行模切和壓痕。' },
        { name: '摺疊粘合', text: '將板材摺疊成盒並粘合。' },
        { name: '質檢包裝', text: '檢查尺寸精度和承重能力，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm box type, size, and printing design.' },
        { name: 'Die Making', text: 'Create dedicated die based on box type.' },
        { name: 'Paper Printing', text: 'Four-color printing and surface finishing.' },
        { name: 'Mounting', text: 'Mount printed face paper onto gray board or corrugated board.' },
        { name: 'Die Cutting & Creasing', text: 'Die cut and crease using the die.' },
        { name: 'Folding & Gluing', text: 'Fold boards into boxes and glue.' },
        { name: 'QC & Packaging', text: 'Check dimensional accuracy and load capacity before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '箱型、サイズ、印刷デザインを確認します。' },
        { name: '型製作', text: '箱型に基づいて専用のダイを作成します。' },
        { name: '用紙印刷', text: '4色印刷と表面加工を行います。' },
        { name: '貼り合わせ', text: '印刷された表紙を灰板または段ボールに貼り合わせます。' },
        { name: 'ダイカット・圧線', text: 'ダイを使用してカットと圧線を行います。' },
        { name: '折り畳み・接着', text: '板材を箱に折り畳み、接着します。' },
        { name: '品質検査・梱包', text: '寸法精度と耐荷重性を検査し、出荷します。' },
      ],
    },
  },
  'rigid-boxes': {
    slug: 'rigid-boxes',
    keywords: {
      'zh-hk': '硬盒印刷,精裝盒制作,硬紙盒包裝,禮品硬盒,高檔硬盒印刷,硬盒訂造,硬盒設計,硬盒香港,硬盒報價,硬盒速印,硬盒少量印刷,天地蓋硬盒,書型硬盒,抽屜硬盒',
      'en': 'rigid box printing,rigid boxes,luxury rigid packaging,premium rigid boxes,setup boxes,rigid box design,rigid boxes hong kong,rigid box quote,rigid box printing service,gift rigid boxes,telescope rigid boxes,book style rigid boxes,drawer rigid boxes',
      'ja': '化粧箱印刷,リジッドボックス,高級リジッドパッケージ,プレミアムリジッドボックス,セットアップボックス,リジッドボックスデザイン,リジッドボックス香港,リジッドボックス見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業精裝盒服務 | 智印港',
      en: 'Professional Rigid Boxes | ZprintPro',
      ja: 'プロ上製本箱 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '硬殼精裝，高檔奢華。適合高端產品、限量版商品。智印港提供專業的精裝盒服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Hardcover rigid construction, luxurious and premium. ZprintPro offers professional Rigid Boxes services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '硬い上製本構造、豪華でプレミアム。 ZprintProは高品質な素材と先進的な印刷技術を使用した上製本箱サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '包裝盒的最小訂購量是多少？', a: '一般為100個起訂，定制盒型需500個起。' },
        { q: '可以定制包裝盒的尺寸和結構嗎？', a: '可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定制。' },
        { q: '包裝盒打樣需要多長時間？', a: '數碼打樣2-3天，傳統打樣5-7天。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Custom box types require 500 pieces.' },
        { q: 'Can I customize box size and structure?', a: 'Yes. We support various box types including lid-base, drawer, and book-style boxes.' },
        { q: 'How long does prototyping take?', a: 'Digital proofing 2-3 days. Traditional proofing 5-7 days.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100個から。カスタム箱型は500個から。' },
        { q: 'サイズと構造のカスタマイズは可能？', a: 'はい。天地蓋、引き出し式、ブック型など様々な箱型に対応しています。' },
        { q: '試作にどのくらい時間がかかりますか？', a: 'デジタル試作2〜3日。伝統的試作5〜7日です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認盒型、尺寸和印刷設計。' },
        { name: '刀模製作', text: '根據盒型製作專用刀模。' },
        { name: '紙張印刷', text: '進行四色印刷和表面處理。' },
        { name: '裱糊/覆膜', text: '將印刷面紙裱糊到灰板或瓦楞板上。' },
        { name: '模切壓痕', text: '使用刀模進行模切和壓痕。' },
        { name: '摺疊粘合', text: '將板材摺疊成盒並粘合。' },
        { name: '質檢包裝', text: '檢查尺寸精度和承重能力，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm box type, size, and printing design.' },
        { name: 'Die Making', text: 'Create dedicated die based on box type.' },
        { name: 'Paper Printing', text: 'Four-color printing and surface finishing.' },
        { name: 'Mounting', text: 'Mount printed face paper onto gray board or corrugated board.' },
        { name: 'Die Cutting & Creasing', text: 'Die cut and crease using the die.' },
        { name: 'Folding & Gluing', text: 'Fold boards into boxes and glue.' },
        { name: 'QC & Packaging', text: 'Check dimensional accuracy and load capacity before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '箱型、サイズ、印刷デザインを確認します。' },
        { name: '型製作', text: '箱型に基づいて専用のダイを作成します。' },
        { name: '用紙印刷', text: '4色印刷と表面加工を行います。' },
        { name: '貼り合わせ', text: '印刷された表紙を灰板または段ボールに貼り合わせます。' },
        { name: 'ダイカット・圧線', text: 'ダイを使用してカットと圧線を行います。' },
        { name: '折り畳み・接着', text: '板材を箱に折り畳み、接着します。' },
        { name: '品質検査・梱包', text: '寸法精度と耐荷重性を検査し、出荷します。' },
      ],
    },
  },
  'foil-red-packets': {
    slug: 'foil-red-packets',
    keywords: {
      'zh-hk': '燙金利是封印刷,金銀利是封,金箔利是封,奢華利是封,燙印利是封,燙金利是封訂造,燙金利是封設計,燙金利是封香港,燙金利是封報價,燙金利是封速印,燙金利是封少量印刷,高級燙金利是封,公司燙金利是封',
      'en': 'foil red packet printing,gold foil red packets,silver foil red packets,luxury lai see packets,foil stamped red packets,custom foil red packets,foil red packet design,foil red packets hong kong,foil red packet quote,foil red packet printing service,premium foil red packets',
      'ja': '箔押し红包印刷,ゴールド箔红包,シルバー箔红包,高級红包,箔押し红包,カスタム箔押し红包,箔押し红包デザイン,箔押し红包香港,箔押し红包見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業燙金利是封服務 | 智印港',
      en: 'Professional Foil Red Packets | ZprintPro',
      ja: 'プロ箔押しポチ袋 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '傳統燙金工藝，喜慶大方，支持印刷即日速遞送貨。多種吉祥圖案可選，也可定制專屬設計。適合企業派發、節日營銷。智印港提供專業的燙金利是封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Traditional foil stamping, festive and elegant. Multiple auspicious patterns or custom designs. ZprintPro offers professional Foil Red Packets services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '伝統的な箔押し加工、縁起が良く上品。複数の縁起の良い柄またはカスタムデザイン。 ZprintProは高品質な素材と先進的な印刷技術を使用した箔押しポチ袋サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '利是封的最小訂購量是多少？', a: '一般為500個起訂，春節旺季建議提前1個月下單。' },
        { q: '可以燙金定制公司Logo嗎？', a: '可以。我們提供燙金、燙銀、浮雕等多種工藝的Logo定制。' },
        { q: '利是封的交貨時間？', a: '標準7-10個工作日。春節前為旺季，建議提前預訂。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 500 pieces minimum. Order 1 month before Chinese New Year.' },
        { q: 'Can I customize with foil-stamped logo?', a: 'Yes. We offer gold foil, silver foil, and embossed logo customization.' },
        { q: 'What is the delivery time?', a: 'Standard 7-10 business days. Peak season before CNY requires advance booking.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に500個から。春節前は繁忙期なので1カ月前の注文を推奨します。' },
        { q: '箔押しロゴのカスタマイズは可能？', a: 'はい。金箔、銀箔、エンボスなどのロゴカスタマイズに対応しています。' },
        { q: '納期は？', a: '標準7〜10営業日。春節前は繁忙期なので事前予約を推奨します。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認利是封尺寸、圖案和燙金位置。' },
        { name: '燙金版製作', text: '根據設計製作高精度燙金銅版。' },
        { name: '試燙調色', text: '進行試燙，調整溫度和壓力。' },
        { name: '批量燙金', text: '使用自動燙金機進行批量生產。' },
        { name: '裁切成品', text: '精密裁切，確保尺寸精準。' },
        { name: '質檢包裝', text: '檢查燙金牢固度和光澤度，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm red packet size, pattern, and foil position.' },
        { name: 'Foil Plate Making', text: 'Create high-precision copper foil stamping plate.' },
        { name: 'Test Stamping', text: 'Conduct test stamping, adjust temperature and pressure.' },
        { name: 'Bulk Foil Stamping', text: 'Use automatic foil stamping machine for production.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Inspect foil adhesion and gloss before packaging.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '红包のサイズ、パターン、箔押し位置を確認します。' },
        { name: '箔押し版作成', text: 'デザインに基づいて高精度の銅箔押し版を作成します。' },
        { name: '試し押し', text: '試し押しを行い、温度と圧力を調整します。' },
        { name: '量産', text: '自動箔押し機で量産します。' },
        { name: '精密裁断', text: '正確な寸法を保証します。' },
        { name: '品質検査・梱包', text: '箔の密着性と光沢を検査し、出荷します。' },
      ],
    },
  },
  'embossed-red-packets': {
    slug: 'embossed-red-packets',
    keywords: {
      'zh-hk': '凹凸利是封印刷,立體利是封,浮雕利是封,凹凸工藝利是封,立體燙金利是封,凹凸利是封訂造,凹凸利是封設計,凹凸利是封香港,凹凸利是封報價,凹凸利是封速印,凹凸利是封少量印刷,3D效果利是封,凹凸質感利是封',
      'en': 'embossed red packet printing,3d red packets,relief red packets,debossed red packets,embossed lai see packets,custom embossed red packets,embossed red packet design,embossed red packets hong kong,embossed red packet quote,embossed red packet printing service,luxury embossed red packets',
      'ja': 'エンボス红包印刷,立体红包,リリーフ红包,エンボス工芸红包,カスタムエンボス红包,エンボス红包デザイン,エンボス红包香港,エンボス红包見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業浮雕利是封服務 | 智印港',
      en: 'Professional Embossed Red Packets | ZprintPro',
      ja: 'プロエンボスポチ袋 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '浮雕工藝，立體觸感，高檔奢華。展現品牌誠意，適合VIP客戶、高端送禮。智印港提供專業的浮雕利是封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Embossed craftsmanship, dimensional texture, luxurious feel. ZprintPro offers professional Embossed Red Packets services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'エンボス加工、立体的な触感、豪華な質感。 ZprintProは高品質な素材と先進的な印刷技術を使用したエンボスポチ袋サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '利是封的最小訂購量是多少？', a: '一般為500個起訂，春節旺季建議提前1個月下單。' },
        { q: '可以燙金定制公司Logo嗎？', a: '可以。我們提供燙金、燙銀、浮雕等多種工藝的Logo定制。' },
        { q: '利是封的交貨時間？', a: '標準7-10個工作日。春節前為旺季，建議提前預訂。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 500 pieces minimum. Order 1 month before Chinese New Year.' },
        { q: 'Can I customize with foil-stamped logo?', a: 'Yes. We offer gold foil, silver foil, and embossed logo customization.' },
        { q: 'What is the delivery time?', a: 'Standard 7-10 business days. Peak season before CNY requires advance booking.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に500個から。春節前は繁忙期なので1カ月前の注文を推奨します。' },
        { q: '箔押しロゴのカスタマイズは可能？', a: 'はい。金箔、銀箔、エンボスなどのロゴカスタマイズに対応しています。' },
        { q: '納期は？', a: '標準7〜10営業日。春節前は繁忙期なので事前予約を推奨します。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認利是封尺寸、圖案和燙金位置。' },
        { name: '燙金版製作', text: '根據設計製作高精度燙金銅版。' },
        { name: '試燙調色', text: '進行試燙，調整溫度和壓力。' },
        { name: '批量燙金', text: '使用自動燙金機進行批量生產。' },
        { name: '裁切成品', text: '精密裁切，確保尺寸精準。' },
        { name: '質檢包裝', text: '檢查燙金牢固度和光澤度，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm red packet size, pattern, and foil position.' },
        { name: 'Foil Plate Making', text: 'Create high-precision copper foil stamping plate.' },
        { name: 'Test Stamping', text: 'Conduct test stamping, adjust temperature and pressure.' },
        { name: 'Bulk Foil Stamping', text: 'Use automatic foil stamping machine for production.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Inspect foil adhesion and gloss before packaging.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '红包のサイズ、パターン、箔押し位置を確認します。' },
        { name: '箔押し版作成', text: 'デザインに基づいて高精度の銅箔押し版を作成します。' },
        { name: '試し押し', text: '試し押しを行い、温度と圧力を調整します。' },
        { name: '量産', text: '自動箔押し機で量産します。' },
        { name: '精密裁断', text: '正確な寸法を保証します。' },
        { name: '品質検査・梱包', text: '箔の密着性と光沢を検査し、出荷します。' },
      ],
    },
  },
  'custom-red-packets': {
    slug: 'custom-red-packets',
    keywords: {
      'zh-hk': '定制利是封印刷,訂造利是封,個人化利是封,公司利是封,專屬利是封,定制利是封訂造,定制利是封設計,定制利是封香港,定制利是封報價,定制利是封速印,定制利是封少量印刷,品牌利是封,Logo利是封',
      'en': 'custom red packet printing,personalized red packets,custom lai see packets,company red packets,branded red packets,custom red packet design,custom red packets hong kong,custom red packet quote,custom red packet printing service,logo red packets,exclusive red packets',
      'ja': 'オーダーメイド红包印刷,パーソナライズ红包,カスタム红包,会社红包,ブランド红包,オーダーメイド红包デザイン,オーダーメイド红包香港,オーダーメイド红包見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業定制利是封服務 | 智印港',
      en: 'Professional Custom Red Packets | ZprintPro',
      ja: 'プロオリジナルポチ袋 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '專屬設計，印上公司Logo和祝福語，支持印刷即日速遞送貨。強化品牌印象，節日營銷必備。智印港提供專業的定制利是封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Exclusive design with company logo and greetings. Strengthens brand impression. ZprintPro offers professional Custom Red Packets services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '独占的なデザイン、会社ロゴと祝福の言葉。ブランドイメージを強化。 ZprintProは高品質な素材と先進的な印刷技術を使用したオリジナルポチ袋サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '利是封的最小訂購量是多少？', a: '一般為500個起訂，春節旺季建議提前1個月下單。' },
        { q: '可以燙金定制公司Logo嗎？', a: '可以。我們提供燙金、燙銀、浮雕等多種工藝的Logo定制。' },
        { q: '利是封的交貨時間？', a: '標準7-10個工作日。春節前為旺季，建議提前預訂。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 500 pieces minimum. Order 1 month before Chinese New Year.' },
        { q: 'Can I customize with foil-stamped logo?', a: 'Yes. We offer gold foil, silver foil, and embossed logo customization.' },
        { q: 'What is the delivery time?', a: 'Standard 7-10 business days. Peak season before CNY requires advance booking.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に500個から。春節前は繁忙期なので1カ月前の注文を推奨します。' },
        { q: '箔押しロゴのカスタマイズは可能？', a: 'はい。金箔、銀箔、エンボスなどのロゴカスタマイズに対応しています。' },
        { q: '納期は？', a: '標準7〜10営業日。春節前は繁忙期なので事前予約を推奨します。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認利是封尺寸、圖案和燙金位置。' },
        { name: '燙金版製作', text: '根據設計製作高精度燙金銅版。' },
        { name: '試燙調色', text: '進行試燙，調整溫度和壓力。' },
        { name: '批量燙金', text: '使用自動燙金機進行批量生產。' },
        { name: '裁切成品', text: '精密裁切，確保尺寸精準。' },
        { name: '質檢包裝', text: '檢查燙金牢固度和光澤度，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm red packet size, pattern, and foil position.' },
        { name: 'Foil Plate Making', text: 'Create high-precision copper foil stamping plate.' },
        { name: 'Test Stamping', text: 'Conduct test stamping, adjust temperature and pressure.' },
        { name: 'Bulk Foil Stamping', text: 'Use automatic foil stamping machine for production.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Inspect foil adhesion and gloss before packaging.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '红包のサイズ、パターン、箔押し位置を確認します。' },
        { name: '箔押し版作成', text: 'デザインに基づいて高精度の銅箔押し版を作成します。' },
        { name: '試し押し', text: '試し押しを行い、温度と圧力を調整します。' },
        { name: '量産', text: '自動箔押し機で量産します。' },
        { name: '精密裁断', text: '正確な寸法を保証します。' },
        { name: '品質検査・梱包', text: '箔の密着性と光沢を検査し、出荷します。' },
      ],
    },
  },
  'cartoon-red-packets': {
    slug: 'cartoon-red-packets',
    keywords: {
      'zh-hk': '卡通利是封印刷,Q版利是封,可愛利是封,動漫利是封,卡通紅包,卡通利是封訂造,卡通利是封設計,卡通利是封香港,卡通利是封報價,卡通利是封速印,卡通利是封少量印刷,生肖利是封,卡通人物利是封',
      'en': 'cartoon red packet printing,cute red packets,anime red packets,cartoon lai see packets,character red packets,custom cartoon red packets,cartoon red packet design,cartoon red packets hong kong,cartoon red packet quote,cartoon red packet printing service,zodiac red packets',
      'ja': 'キャラクター红包印刷,可愛い红包,アニメ红包,漫画红包,キャラクター红包,カスタムキャラクター红包,キャラクター红包デザイン,キャラクター红包香港,キャラクター红包見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業卡通利是封服務 | 智印港',
      en: 'Professional Cartoon Red Packets | ZprintPro',
      ja: 'プロキャラクターポチ袋 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '可愛卡通設計，深受年輕人喜愛。適合親子品牌、教育機構、兒童產品。智印港提供專業的卡通利是封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Cute cartoon design, loved by young people. ZprintPro offers professional Cartoon Red Packets services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'かわいいキャラクターデザイン、若者に人気。 ZprintProは高品質な素材と先進的な印刷技術を使用したキャラクターポチ袋サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '利是封的最小訂購量是多少？', a: '一般為500個起訂，春節旺季建議提前1個月下單。' },
        { q: '可以燙金定制公司Logo嗎？', a: '可以。我們提供燙金、燙銀、浮雕等多種工藝的Logo定制。' },
        { q: '利是封的交貨時間？', a: '標準7-10個工作日。春節前為旺季，建議提前預訂。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 500 pieces minimum. Order 1 month before Chinese New Year.' },
        { q: 'Can I customize with foil-stamped logo?', a: 'Yes. We offer gold foil, silver foil, and embossed logo customization.' },
        { q: 'What is the delivery time?', a: 'Standard 7-10 business days. Peak season before CNY requires advance booking.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に500個から。春節前は繁忙期なので1カ月前の注文を推奨します。' },
        { q: '箔押しロゴのカスタマイズは可能？', a: 'はい。金箔、銀箔、エンボスなどのロゴカスタマイズに対応しています。' },
        { q: '納期は？', a: '標準7〜10営業日。春節前は繁忙期なので事前予約を推奨します。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認利是封尺寸、圖案和燙金位置。' },
        { name: '燙金版製作', text: '根據設計製作高精度燙金銅版。' },
        { name: '試燙調色', text: '進行試燙，調整溫度和壓力。' },
        { name: '批量燙金', text: '使用自動燙金機進行批量生產。' },
        { name: '裁切成品', text: '精密裁切，確保尺寸精準。' },
        { name: '質檢包裝', text: '檢查燙金牢固度和光澤度，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm red packet size, pattern, and foil position.' },
        { name: 'Foil Plate Making', text: 'Create high-precision copper foil stamping plate.' },
        { name: 'Test Stamping', text: 'Conduct test stamping, adjust temperature and pressure.' },
        { name: 'Bulk Foil Stamping', text: 'Use automatic foil stamping machine for production.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Inspect foil adhesion and gloss before packaging.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '红包のサイズ、パターン、箔押し位置を確認します。' },
        { name: '箔押し版作成', text: 'デザインに基づいて高精度の銅箔押し版を作成します。' },
        { name: '試し押し', text: '試し押しを行い、温度と圧力を調整します。' },
        { name: '量産', text: '自動箔押し機で量産します。' },
        { name: '精密裁断', text: '正確な寸法を保証します。' },
        { name: '品質検査・梱包', text: '箔の密着性と光沢を検査し、出荷します。' },
      ],
    },
  },
  'eco-red-packets': {
    slug: 'eco-red-packets',
    keywords: {
      'zh-hk': '環保利是封印刷,再生紙利是封,環保紅包,綠色利是封,FSC利是封,環保利是封訂造,環保利是封設計,環保利是封香港,環保利是封報價,環保利是封速印,環保利是封少量印刷,可持續利是封,環保材質利是封',
      'en': 'eco red packet printing,recycled paper red packets,eco friendly lai see packets,green red packets,sustainable red packets,eco red packet design,eco red packets hong kong,eco red packet quote,eco red packet printing service,FSC red packets,environmentally friendly red packets',
      'ja': 'エコ红包印刷,再生紙红包,エコ红包,グリーン红包,持続可能红包,エコ红包デザイン,エコ红包香港,エコ红包見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業環保利是封服務 | 智印港',
      en: 'Professional Eco Red Packets | ZprintPro',
      ja: 'プロエコポチ袋 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '採用環保紙張和油墨，可持續發展理念。適合注重環保的企業。智印港提供專業的環保利是封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Eco-friendly paper and ink, sustainable development concept. ZprintPro offers professional Eco Red Packets services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '環境に優しい紙とインク、持続可能な開発の理念。 ZprintProは高品質な素材と先進的な印刷技術を使用したエコポチ袋サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '利是封的最小訂購量是多少？', a: '一般為500個起訂，春節旺季建議提前1個月下單。' },
        { q: '可以燙金定制公司Logo嗎？', a: '可以。我們提供燙金、燙銀、浮雕等多種工藝的Logo定制。' },
        { q: '利是封的交貨時間？', a: '標準7-10個工作日。春節前為旺季，建議提前預訂。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 500 pieces minimum. Order 1 month before Chinese New Year.' },
        { q: 'Can I customize with foil-stamped logo?', a: 'Yes. We offer gold foil, silver foil, and embossed logo customization.' },
        { q: 'What is the delivery time?', a: 'Standard 7-10 business days. Peak season before CNY requires advance booking.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に500個から。春節前は繁忙期なので1カ月前の注文を推奨します。' },
        { q: '箔押しロゴのカスタマイズは可能？', a: 'はい。金箔、銀箔、エンボスなどのロゴカスタマイズに対応しています。' },
        { q: '納期は？', a: '標準7〜10営業日。春節前は繁忙期なので事前予約を推奨します。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認利是封尺寸、圖案和燙金位置。' },
        { name: '燙金版製作', text: '根據設計製作高精度燙金銅版。' },
        { name: '試燙調色', text: '進行試燙，調整溫度和壓力。' },
        { name: '批量燙金', text: '使用自動燙金機進行批量生產。' },
        { name: '裁切成品', text: '精密裁切，確保尺寸精準。' },
        { name: '質檢包裝', text: '檢查燙金牢固度和光澤度，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm red packet size, pattern, and foil position.' },
        { name: 'Foil Plate Making', text: 'Create high-precision copper foil stamping plate.' },
        { name: 'Test Stamping', text: 'Conduct test stamping, adjust temperature and pressure.' },
        { name: 'Bulk Foil Stamping', text: 'Use automatic foil stamping machine for production.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Inspect foil adhesion and gloss before packaging.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '红包のサイズ、パターン、箔押し位置を確認します。' },
        { name: '箔押し版作成', text: 'デザインに基づいて高精度の銅箔押し版を作成します。' },
        { name: '試し押し', text: '試し押しを行い、温度と圧力を調整します。' },
        { name: '量産', text: '自動箔押し機で量産します。' },
        { name: '精密裁断', text: '正確な寸法を保証します。' },
        { name: '品質検査・梱包', text: '箔の密着性と光沢を検査し、出荷します。' },
      ],
    },
  },
  'large-red-packets': {
    slug: 'large-red-packets',
    keywords: {
      'zh-hk': '大號利是封印刷,大利是封,加大利是封,大碼利是封,大紅包,大號利是封訂造,大號利是封設計,大號利是封香港,大號利是封報價,大號利是封速印,大號利是封少量印刷,豪華大利是封,超大利是封',
      'en': 'large red packet printing,big red packets,oversized red packets,large lai see packets,jumbo red packets,custom large red packets,large red packet design,large red packets hong kong,large red packet quote,large red packet printing service,extra large red packets',
      'ja': '大判红包印刷,大きい红包,特大红包,大判红包,ジャンボ红包,カスタム大判红包,大判红包デザイン,大判红包香港,大判红包見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業大號利是封服務 | 智印港',
      en: 'Professional Large Red Packets | ZprintPro',
      ja: 'プロ大判ポチ袋 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '加大尺寸，可放入更多鈔票或禮品卡。實用大氣，送禮更有面子。智印港提供專業的大號利是封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Larger size, can hold more cash or gift cards. ZprintPro offers professional Large Red Packets services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '大きなサイズ、より多くの現金やギフトカードを入れられます。 ZprintProは高品質な素材と先進的な印刷技術を使用した大判ポチ袋サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '利是封的最小訂購量是多少？', a: '一般為500個起訂，春節旺季建議提前1個月下單。' },
        { q: '可以燙金定制公司Logo嗎？', a: '可以。我們提供燙金、燙銀、浮雕等多種工藝的Logo定制。' },
        { q: '利是封的交貨時間？', a: '標準7-10個工作日。春節前為旺季，建議提前預訂。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 500 pieces minimum. Order 1 month before Chinese New Year.' },
        { q: 'Can I customize with foil-stamped logo?', a: 'Yes. We offer gold foil, silver foil, and embossed logo customization.' },
        { q: 'What is the delivery time?', a: 'Standard 7-10 business days. Peak season before CNY requires advance booking.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に500個から。春節前は繁忙期なので1カ月前の注文を推奨します。' },
        { q: '箔押しロゴのカスタマイズは可能？', a: 'はい。金箔、銀箔、エンボスなどのロゴカスタマイズに対応しています。' },
        { q: '納期は？', a: '標準7〜10営業日。春節前は繁忙期なので事前予約を推奨します。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認利是封尺寸、圖案和燙金位置。' },
        { name: '燙金版製作', text: '根據設計製作高精度燙金銅版。' },
        { name: '試燙調色', text: '進行試燙，調整溫度和壓力。' },
        { name: '批量燙金', text: '使用自動燙金機進行批量生產。' },
        { name: '裁切成品', text: '精密裁切，確保尺寸精準。' },
        { name: '質檢包裝', text: '檢查燙金牢固度和光澤度，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm red packet size, pattern, and foil position.' },
        { name: 'Foil Plate Making', text: 'Create high-precision copper foil stamping plate.' },
        { name: 'Test Stamping', text: 'Conduct test stamping, adjust temperature and pressure.' },
        { name: 'Bulk Foil Stamping', text: 'Use automatic foil stamping machine for production.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Inspect foil adhesion and gloss before packaging.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '红包のサイズ、パターン、箔押し位置を確認します。' },
        { name: '箔押し版作成', text: 'デザインに基づいて高精度の銅箔押し版を作成します。' },
        { name: '試し押し', text: '試し押しを行い、温度と圧力を調整します。' },
        { name: '量産', text: '自動箔押し機で量産します。' },
        { name: '精密裁断', text: '正確な寸法を保証します。' },
        { name: '品質検査・梱包', text: '箔の密着性と光沢を検査し、出荷します。' },
      ],
    },
  },
  'wall-calendars': {
    slug: 'wall-calendars',
    keywords: {
      'zh-hk': '掛曆印刷,牆上年曆,掛牆年曆,月曆印刷,大Calendar印刷,掛曆訂造,掛曆設計,掛曆香港,掛曆報價,掛曆速印,掛曆少量印刷,公司掛曆,宣傳掛曆',
      'en': 'wall calendar printing,hanging calendars,wall calendars,custom wall calendars,large wall calendar printing,wall calendar design,wall calendars hong kong,wall calendar quote,wall calendar printing service,company wall calendars,promotional wall calendars',
      'ja': '壁掛けカレンダー印刷,掛けカレンダー,ウォールカレンダー,カスタム壁掛けカレンダー,壁掛けカレンダーデザイン,壁掛けカレンダー香港,壁掛けカレンダー見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業掛牆年曆服務 | 智印港',
      en: 'Professional Wall Calendars | ZprintPro',
      ja: 'プロ壁掛けカレンダー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '標準A3或A2掛牆年曆，13頁設計（封面+12個月），支持印刷即日速遞送貨。適合家庭、辦公室使用，全年品牌曝光。智印港提供專業的掛牆年曆服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Standard A3 or A2 wall calendars, 13-page design. Perfect for home and office use. ZprintPro offers professional Wall Calendars services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '標準A3またはA2壁掛けカレンダー、13ページデザイン。家庭やオフィスに最適。 ZprintProは高品質な素材と先進的な印刷技術を使用した壁掛けカレンダーサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '年曆的最小訂購量是多少？', a: '一般為50本起訂，大批量訂單價格更優惠。' },
        { q: '可以定制年曆的內頁設計嗎？', a: '可以。我們支持封面和內頁的完全定制設計。' },
        { q: '年曆的交貨時間？', a: '標準7-10個工作日。建議在11月前完成訂購以確保新年及時到貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 50 pieces minimum. Bulk orders get better pricing.' },
        { q: 'Can I customize inner page design?', a: 'Yes. We support fully custom cover and inner page designs.' },
        { q: 'What is the delivery time?', a: 'Standard 7-10 business days. Order before November for New Year delivery.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に50部から。大口注文でよりお得な価格になります。' },
        { q: '中面デザインのカスタマイズは可能？', a: 'はい。表紙と中面の完全カスタマイズデザインに対応しています。' },
        { q: '納期は？', a: '標準7〜10営業日。新年に間に合わせるため11月までに注文することを推奨します。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認年曆尺寸、封面和內頁設計。' },
        { name: '內頁印刷', text: '進行內頁四色印刷。' },
        { name: '封面印刷', text: '進行封面印刷和表面處理。' },
        { name: '裁切/摺頁', text: '將紙張裁切並摺疊成月曆頁。' },
        { name: '裝訂', text: '根據選擇進行騎馬釘、線圈或精裝裝訂。' },
        { name: '質檢包裝', text: '檢查頁碼順序和裝訂質量，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm calendar size, cover, and inner page design.' },
        { name: 'Inner Page Printing', text: 'Four-color printing of inner pages.' },
        { name: 'Cover Printing', text: 'Cover printing and surface finishing.' },
        { name: 'Cutting/Folding', text: 'Cut and fold paper into calendar pages.' },
        { name: 'Binding', text: 'Saddle-stitch, spiral, or hardcover binding as selected.' },
        { name: 'QC & Packaging', text: 'Check page order and binding quality before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'カレンダーのサイズ、表紙、中面デザインを確認します。' },
        { name: '中面印刷', text: '中面の4色印刷を行います。' },
        { name: '表紙印刷', text: '表紙の印刷と表面加工を行います。' },
        { name: '裁断・折り畳み', text: '紙を裁断し、カレンダーページに折り畳みます。' },
        { name: '綴じ', text: '騎馬綴じ、线圈、または精装の綴じを行います。' },
        { name: '品質検査・梱包', text: 'ページ順序と綴じ質を検査し、出荷します。' },
      ],
    },
  },
  'desk-calendars': {
    slug: 'desk-calendars',
    keywords: {
      'zh-hk': '座檯年曆,香港座檯,座檯年曆印刷,香港印刷,印刷即日速遞送貨,座檯曆,桌曆,枱曆,三角桌曆,立式桌曆,辦公桌曆',
      en: 'desk calendars,desk calendars printing hong kong, hong kong desk calendars',
      ja: '卓上カレンダー,香港卓上,卓上カレンダー印刷',
    },
    h1Suffix: {
      'zh-hk': '專業座檯年曆服務 | 智印港',
      en: 'Professional Desk Calendars | ZprintPro',
      ja: 'プロ卓上カレンダー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '三角形座檯設計，穩固美觀，支持印刷即日速遞送貨。適合辦公桌擺放，每日品牌接觸。智印港提供專業的座檯年曆服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Triangular desk design, stable and beautiful. Perfect for office desk display. ZprintPro offers professional Desk Calendars services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '三角形の卓上デザイン、安定して美しい。オフィスデスクに最適。 ZprintProは高品質な素材と先進的な印刷技術を使用した卓上カレンダーサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '年曆的最小訂購量是多少？', a: '一般為50本起訂，大批量訂單價格更優惠。' },
        { q: '可以定制年曆的內頁設計嗎？', a: '可以。我們支持封面和內頁的完全定制設計。' },
        { q: '年曆的交貨時間？', a: '標準7-10個工作日。建議在11月前完成訂購以確保新年及時到貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 50 pieces minimum. Bulk orders get better pricing.' },
        { q: 'Can I customize inner page design?', a: 'Yes. We support fully custom cover and inner page designs.' },
        { q: 'What is the delivery time?', a: 'Standard 7-10 business days. Order before November for New Year delivery.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に50部から。大口注文でよりお得な価格になります。' },
        { q: '中面デザインのカスタマイズは可能？', a: 'はい。表紙と中面の完全カスタマイズデザインに対応しています。' },
        { q: '納期は？', a: '標準7〜10営業日。新年に間に合わせるため11月までに注文することを推奨します。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認年曆尺寸、封面和內頁設計。' },
        { name: '內頁印刷', text: '進行內頁四色印刷。' },
        { name: '封面印刷', text: '進行封面印刷和表面處理。' },
        { name: '裁切/摺頁', text: '將紙張裁切並摺疊成月曆頁。' },
        { name: '裝訂', text: '根據選擇進行騎馬釘、線圈或精裝裝訂。' },
        { name: '質檢包裝', text: '檢查頁碼順序和裝訂質量，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm calendar size, cover, and inner page design.' },
        { name: 'Inner Page Printing', text: 'Four-color printing of inner pages.' },
        { name: 'Cover Printing', text: 'Cover printing and surface finishing.' },
        { name: 'Cutting/Folding', text: 'Cut and fold paper into calendar pages.' },
        { name: 'Binding', text: 'Saddle-stitch, spiral, or hardcover binding as selected.' },
        { name: 'QC & Packaging', text: 'Check page order and binding quality before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'カレンダーのサイズ、表紙、中面デザインを確認します。' },
        { name: '中面印刷', text: '中面の4色印刷を行います。' },
        { name: '表紙印刷', text: '表紙の印刷と表面加工を行います。' },
        { name: '裁断・折り畳み', text: '紙を裁断し、カレンダーページに折り畳みます。' },
        { name: '綴じ', text: '騎馬綴じ、线圈、または精装の綴じを行います。' },
        { name: '品質検査・梱包', text: 'ページ順序と綴じ質を検査し、出荷します。' },
      ],
    },
  },
  'custom-calendars': {
    slug: 'custom-calendars',
    keywords: {
      'zh-hk': '定制年曆印刷,個人化年曆,訂造年曆,公司年曆訂制,禮品年曆印刷,專屬年曆制作,定制年曆設計,定制年曆香港,定制年曆報價,定制年曆速印,定制年曆少量印刷,企業定制年曆',
      'en': 'custom calendar printing,personalized calendars,custom made calendars,company calendar printing,promotional calendar printing,custom calendar design,custom calendars hong kong,custom calendar quote,custom calendar printing service,branded calendars,bespoke calendars',
      'ja': 'オーダーメイドカレンダー印刷,パーソナライズカレンダー,カスタムカレンダー,会社カレンダー印刷,販促カレンダー印刷,カスタムカレンダーデザイン,カスタムカレンダー香港,カスタムカレンダー見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業定制年曆服務 | 智印港',
      en: 'Professional Custom Calendars | ZprintPro',
      ja: 'プロオリジナルカレンダー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '專屬設計，每頁可印公司產品或服務。企業禮品首選，送客戶最佳選擇。智印港提供專業的定制年曆服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Exclusive design, each page can feature company products or services. ZprintPro offers professional Custom Calendars services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '独占的なデザイン、各ページに会社の製品やサービスを掲載可能。 ZprintProは高品質な素材と先進的な印刷技術を使用したオリジナルカレンダーサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '年曆的最小訂購量是多少？', a: '一般為50本起訂，大批量訂單價格更優惠。' },
        { q: '可以定制年曆的內頁設計嗎？', a: '可以。我們支持封面和內頁的完全定制設計。' },
        { q: '年曆的交貨時間？', a: '標準7-10個工作日。建議在11月前完成訂購以確保新年及時到貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 50 pieces minimum. Bulk orders get better pricing.' },
        { q: 'Can I customize inner page design?', a: 'Yes. We support fully custom cover and inner page designs.' },
        { q: 'What is the delivery time?', a: 'Standard 7-10 business days. Order before November for New Year delivery.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に50部から。大口注文でよりお得な価格になります。' },
        { q: '中面デザインのカスタマイズは可能？', a: 'はい。表紙と中面の完全カスタマイズデザインに対応しています。' },
        { q: '納期は？', a: '標準7〜10営業日。新年に間に合わせるため11月までに注文することを推奨します。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認年曆尺寸、封面和內頁設計。' },
        { name: '內頁印刷', text: '進行內頁四色印刷。' },
        { name: '封面印刷', text: '進行封面印刷和表面處理。' },
        { name: '裁切/摺頁', text: '將紙張裁切並摺疊成月曆頁。' },
        { name: '裝訂', text: '根據選擇進行騎馬釘、線圈或精裝裝訂。' },
        { name: '質檢包裝', text: '檢查頁碼順序和裝訂質量，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm calendar size, cover, and inner page design.' },
        { name: 'Inner Page Printing', text: 'Four-color printing of inner pages.' },
        { name: 'Cover Printing', text: 'Cover printing and surface finishing.' },
        { name: 'Cutting/Folding', text: 'Cut and fold paper into calendar pages.' },
        { name: 'Binding', text: 'Saddle-stitch, spiral, or hardcover binding as selected.' },
        { name: 'QC & Packaging', text: 'Check page order and binding quality before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'カレンダーのサイズ、表紙、中面デザインを確認します。' },
        { name: '中面印刷', text: '中面の4色印刷を行います。' },
        { name: '表紙印刷', text: '表紙の印刷と表面加工を行います。' },
        { name: '裁断・折り畳み', text: '紙を裁断し、カレンダーページに折り畳みます。' },
        { name: '綴じ', text: '騎馬綴じ、线圈、または精装の綴じを行います。' },
        { name: '品質検査・梱包', text: 'ページ順序と綴じ質を検査し、出荷します。' },
      ],
    },
  },
  'mini-calendars': {
    slug: 'mini-calendars',
    keywords: {
      'zh-hk': '迷你年曆印刷,小型年曆,口袋年曆,迷你日曆印刷,小巧年曆制作,迷你年曆訂造,迷你年曆設計,迷你年曆香港,迷你年曆報價,迷你年曆速印,迷你年曆少量印刷,迷你年曆禮品',
      'en': 'mini calendar printing,small calendars,pocket calendars,mini desk calendars,tiny calendar printing,mini calendar design,mini calendars hong kong,mini calendar quote,mini calendar printing service,custom mini calendars',
      'ja': 'ミニカレンダー印刷,小型カレンダー,ポケットカレンダー,ミニ卓上カレンダー,ミニカレンダーデザイン,ミニカレンダー香港,ミニカレンダー見積もり,オーダーメイドミニカレンダー',
    },
    h1Suffix: {
      'zh-hk': '專業迷你年曆服務 | 智印港',
      en: 'Professional Mini Calendars | ZprintPro',
      ja: 'プロミニカレンダー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '小巧便攜，可放入錢包或口袋。創意禮品，年輕人喜愛。智印港提供專業的迷你年曆服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Compact and portable, fits in wallet or pocket. ZprintPro offers professional Mini Calendars services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'コンパクトで持ち運び可能、財布やポケットに入ります。 ZprintProは高品質な素材と先進的な印刷技術を使用したミニカレンダーサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '年曆的最小訂購量是多少？', a: '一般為50本起訂，大批量訂單價格更優惠。' },
        { q: '可以定制年曆的內頁設計嗎？', a: '可以。我們支持封面和內頁的完全定制設計。' },
        { q: '年曆的交貨時間？', a: '標準7-10個工作日。建議在11月前完成訂購以確保新年及時到貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 50 pieces minimum. Bulk orders get better pricing.' },
        { q: 'Can I customize inner page design?', a: 'Yes. We support fully custom cover and inner page designs.' },
        { q: 'What is the delivery time?', a: 'Standard 7-10 business days. Order before November for New Year delivery.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に50部から。大口注文でよりお得な価格になります。' },
        { q: '中面デザインのカスタマイズは可能？', a: 'はい。表紙と中面の完全カスタマイズデザインに対応しています。' },
        { q: '納期は？', a: '標準7〜10営業日。新年に間に合わせるため11月までに注文することを推奨します。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認年曆尺寸、封面和內頁設計。' },
        { name: '內頁印刷', text: '進行內頁四色印刷。' },
        { name: '封面印刷', text: '進行封面印刷和表面處理。' },
        { name: '裁切/摺頁', text: '將紙張裁切並摺疊成月曆頁。' },
        { name: '裝訂', text: '根據選擇進行騎馬釘、線圈或精裝裝訂。' },
        { name: '質檢包裝', text: '檢查頁碼順序和裝訂質量，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm calendar size, cover, and inner page design.' },
        { name: 'Inner Page Printing', text: 'Four-color printing of inner pages.' },
        { name: 'Cover Printing', text: 'Cover printing and surface finishing.' },
        { name: 'Cutting/Folding', text: 'Cut and fold paper into calendar pages.' },
        { name: 'Binding', text: 'Saddle-stitch, spiral, or hardcover binding as selected.' },
        { name: 'QC & Packaging', text: 'Check page order and binding quality before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'カレンダーのサイズ、表紙、中面デザインを確認します。' },
        { name: '中面印刷', text: '中面の4色印刷を行います。' },
        { name: '表紙印刷', text: '表紙の印刷と表面加工を行います。' },
        { name: '裁断・折り畳み', text: '紙を裁断し、カレンダーページに折り畳みます。' },
        { name: '綴じ', text: '騎馬綴じ、线圈、または精装の綴じを行います。' },
        { name: '品質検査・梱包', text: 'ページ順序と綴じ質を検査し、出荷します。' },
      ],
    },
  },
  'photo-frame-calendars': {
    slug: 'photo-frame-calendars',
    keywords: {
      'zh-hk': '相框年曆印刷,相片年曆,相架日曆,照片年曆制作,相框月曆印刷,相框年曆訂造,相框年曆設計,相框年曆香港,相框年曆報價,相框年曆速印,相框年曆少量印刷,相框年曆禮品',
      'en': 'photo frame calendar printing,photo calendars,picture frame calendars,personalized photo calendars,photo frame calendar design,photo frame calendars hong kong,photo frame calendar quote,photo frame calendar printing service,custom photo calendars',
      'ja': 'フォトフレームカレンダー印刷,写真カレンダー,フォトカレンダー,パーソナライズフォトカレンダー,フォトフレームカレンダーデザイン,フォトフレームカレンダー香港,フォトフレームカレンダー見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業相框年曆服務 | 智印港',
      en: 'Professional Photo Frame Calendars | ZprintPro',
      ja: 'プロフォトフレームカレンダー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '結合相框功能，可替換照片。實用美觀，家庭必備。智印港提供專業的相框年曆服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Combined photo frame function, photos can be replaced. ZprintPro offers professional Photo Frame Calendars services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'フォトフレーム機能付き、写真を交換可能。 ZprintProは高品質な素材と先進的な印刷技術を使用したフォトフレームカレンダーサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '年曆的最小訂購量是多少？', a: '一般為50本起訂，大批量訂單價格更優惠。' },
        { q: '可以定制年曆的內頁設計嗎？', a: '可以。我們支持封面和內頁的完全定制設計。' },
        { q: '年曆的交貨時間？', a: '標準7-10個工作日。建議在11月前完成訂購以確保新年及時到貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 50 pieces minimum. Bulk orders get better pricing.' },
        { q: 'Can I customize inner page design?', a: 'Yes. We support fully custom cover and inner page designs.' },
        { q: 'What is the delivery time?', a: 'Standard 7-10 business days. Order before November for New Year delivery.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に50部から。大口注文でよりお得な価格になります。' },
        { q: '中面デザインのカスタマイズは可能？', a: 'はい。表紙と中面の完全カスタマイズデザインに対応しています。' },
        { q: '納期は？', a: '標準7〜10営業日。新年に間に合わせるため11月までに注文することを推奨します。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認年曆尺寸、封面和內頁設計。' },
        { name: '內頁印刷', text: '進行內頁四色印刷。' },
        { name: '封面印刷', text: '進行封面印刷和表面處理。' },
        { name: '裁切/摺頁', text: '將紙張裁切並摺疊成月曆頁。' },
        { name: '裝訂', text: '根據選擇進行騎馬釘、線圈或精裝裝訂。' },
        { name: '質檢包裝', text: '檢查頁碼順序和裝訂質量，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm calendar size, cover, and inner page design.' },
        { name: 'Inner Page Printing', text: 'Four-color printing of inner pages.' },
        { name: 'Cover Printing', text: 'Cover printing and surface finishing.' },
        { name: 'Cutting/Folding', text: 'Cut and fold paper into calendar pages.' },
        { name: 'Binding', text: 'Saddle-stitch, spiral, or hardcover binding as selected.' },
        { name: 'QC & Packaging', text: 'Check page order and binding quality before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'カレンダーのサイズ、表紙、中面デザインを確認します。' },
        { name: '中面印刷', text: '中面の4色印刷を行います。' },
        { name: '表紙印刷', text: '表紙の印刷と表面加工を行います。' },
        { name: '裁断・折り畳み', text: '紙を裁断し、カレンダーページに折り畳みます。' },
        { name: '綴じ', text: '騎馬綴じ、线圈、または精装の綴じを行います。' },
        { name: '品質検査・梱包', text: 'ページ順序と綴じ質を検査し、出荷します。' },
      ],
    },
  },
  'magnetic-calendars': {
    slug: 'magnetic-calendars',
    keywords: {
      'zh-hk': '磁石年曆印刷,冰箱貼年曆,磁性年曆,磁吸年曆制作,磁石日曆印刷,磁鐵年曆訂造,磁石年曆設計,磁石年曆香港,磁石年曆報價,磁石年曆速印,磁石年曆少量印刷,磁石年曆禮品',
      'en': 'magnetic calendar printing,fridge magnet calendars,magnetic calendars,custom magnetic calendars,magnetic calendar printing,magnetic calendar design,magnetic calendars hong kong,magnetic calendar quote,magnetic calendar printing service,promotional magnetic calendars',
      'ja': 'マグネットカレンダー印刷,冷蔵庫マグネットカレンダー,磁石カレンダー,カスタムマグネットカレンダー,マグネットカレンダーデザイン,マグネットカレンダー香港,マグネットカレンダー見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業磁石年曆服務 | 智印港',
      en: 'Professional Magnetic Calendars | ZprintPro',
      ja: 'プロマグネットカレンダー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '磁石背膠，可貼於冰箱等金屬表面。每日多次接觸，品牌曝光率高。智印港提供專業的磁石年曆服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Magnetic backing, can stick to refrigerator and other metal surfaces. ZprintPro offers professional Magnetic Calendars services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'マグネット背面、冷蔵庫などの金属面に貼付可能。 ZprintProは高品質な素材と先進的な印刷技術を使用したマグネットカレンダーサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '年曆的最小訂購量是多少？', a: '一般為50本起訂，大批量訂單價格更優惠。' },
        { q: '可以定制年曆的內頁設計嗎？', a: '可以。我們支持封面和內頁的完全定制設計。' },
        { q: '年曆的交貨時間？', a: '標準7-10個工作日。建議在11月前完成訂購以確保新年及時到貨。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 50 pieces minimum. Bulk orders get better pricing.' },
        { q: 'Can I customize inner page design?', a: 'Yes. We support fully custom cover and inner page designs.' },
        { q: 'What is the delivery time?', a: 'Standard 7-10 business days. Order before November for New Year delivery.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に50部から。大口注文でよりお得な価格になります。' },
        { q: '中面デザインのカスタマイズは可能？', a: 'はい。表紙と中面の完全カスタマイズデザインに対応しています。' },
        { q: '納期は？', a: '標準7〜10営業日。新年に間に合わせるため11月までに注文することを推奨します。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認年曆尺寸、封面和內頁設計。' },
        { name: '內頁印刷', text: '進行內頁四色印刷。' },
        { name: '封面印刷', text: '進行封面印刷和表面處理。' },
        { name: '裁切/摺頁', text: '將紙張裁切並摺疊成月曆頁。' },
        { name: '裝訂', text: '根據選擇進行騎馬釘、線圈或精裝裝訂。' },
        { name: '質檢包裝', text: '檢查頁碼順序和裝訂質量，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm calendar size, cover, and inner page design.' },
        { name: 'Inner Page Printing', text: 'Four-color printing of inner pages.' },
        { name: 'Cover Printing', text: 'Cover printing and surface finishing.' },
        { name: 'Cutting/Folding', text: 'Cut and fold paper into calendar pages.' },
        { name: 'Binding', text: 'Saddle-stitch, spiral, or hardcover binding as selected.' },
        { name: 'QC & Packaging', text: 'Check page order and binding quality before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'カレンダーのサイズ、表紙、中面デザインを確認します。' },
        { name: '中面印刷', text: '中面の4色印刷を行います。' },
        { name: '表紙印刷', text: '表紙の印刷と表面加工を行います。' },
        { name: '裁断・折り畳み', text: '紙を裁断し、カレンダーページに折り畳みます。' },
        { name: '綴じ', text: '騎馬綴じ、线圈、または精装の綴じを行います。' },
        { name: '品質検査・梱包', text: 'ページ順序と綴じ質を検査し、出荷します。' },
      ],
    },
  },
  'pvc-menus': {
    slug: 'pvc-menus',
    keywords: {
      'zh-hk': 'PVC餐牌,香港PVC,PVC餐牌印刷,香港印刷,印刷即日速遞送貨,膠質餐牌,防水餐牌,耐用餐牌,塑膠餐牌,硬膠餐牌',
      en: 'pvc menus,pvc menus printing hong kong, hong kong pvc menus',
      ja: 'PVCメニュー,香港PVC,PVCメニュー印刷',
    },
    h1Suffix: {
      'zh-hk': '專業PVC餐牌服務 | 智印港',
      en: 'Professional PVC Menus | ZprintPro',
      ja: 'プロPVCメニュー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '防水防油PVC材質，易清潔耐用，支持印刷即日速遞送貨。餐廳、咖啡店首選。智印港提供專業的PVC餐牌服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Waterproof and oil-resistant PVC material, easy to clean and durable. ZprintPro offers professional PVC Menus services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '防水・耐油性PVC素材、お手入れ簡単で耐久性あり。 ZprintProは高品質な素材と先進的な印刷技術を使用したPVCメニューサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '餐牌的最小訂購量是多少？', a: '一般為50個起訂，一次性餐牌可接受10個起。' },
        { q: '餐牌防水嗎？', a: '我們提供PVC和過膠防水餐牌，適合餐飲環境使用。' },
        { q: '餐牌的交貨時間？', a: '標準5-7個工作日。急件可安排3日快印。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 50 pieces minimum. Disposable menus accept 10 pieces.' },
        { q: 'Are menus waterproof?', a: 'We offer PVC and laminated waterproof menus suitable for restaurant environments.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Rush 3-day service available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に50個から。使い捨てメニューは10個から承ります。' },
        { q: '防水性はありますか？', a: 'PVCとラミネート防水メニューを提供しており、飲食店環境に適しています。' },
        { q: '納期は？', a: '標準5〜7営業日。急行3日対応も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認餐牌尺寸、內容和設計稿。' },
        { name: '印刷生產', text: '使用專業印刷機進行四色印刷。' },
        { name: '表面處理', text: '可選啞膠、光膠或過膠等工藝。' },
        { name: '裁切成品', text: '精密裁切，確保尺寸精準。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm menu size, content, and design files.' },
        { name: 'Printing', text: 'Four-color printing using professional equipment.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or lamination.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'メニューのサイズ、内容、デザインデータを確認します。' },
        { name: '印刷', text: 'プロの設備を使用した4色印刷。' },
        { name: '表面加工', text: 'マット、グロス、またはラミネーション加工を選択します。' },
        { name: '精密裁断', text: '正確な寸法を保証します。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'laminated-menus': {
    slug: 'laminated-menus',
    keywords: {
      'zh-hk': '過膠餐牌,香港過膠,過膠餐牌印刷,香港印刷,印刷即日速遞送貨,護貝餐牌,過塑餐牌,防水過膠餐牌,啞膠餐牌,光膠餐牌',
      en: 'laminated menus,laminated menus printing hong kong, hong kong laminated menus',
      ja: 'ラミネートメニュー,香港ラミネート,ラミネートメニュー印刷',
    },
    h1Suffix: {
      'zh-hk': '專業過膠餐牌服務 | 智印港',
      en: 'Professional Laminated Menus | ZprintPro',
      ja: 'プロラミネートメニュー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '紙質過膠處理，防水耐用且成本較低，支持印刷即日速遞送貨。經濟實惠之選。智印港提供專業的過膠餐牌服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Paper with lamination, waterproof and durable at lower cost. ZprintPro offers professional Laminated Menus services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'ラミネート加工紙、防水で耐久性がありコストも低い。 ZprintProは高品質な素材と先進的な印刷技術を使用したラミネートメニューサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '餐牌的最小訂購量是多少？', a: '一般為50個起訂，一次性餐牌可接受10個起。' },
        { q: '餐牌防水嗎？', a: '我們提供PVC和過膠防水餐牌，適合餐飲環境使用。' },
        { q: '餐牌的交貨時間？', a: '標準5-7個工作日。急件可安排3日快印。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 50 pieces minimum. Disposable menus accept 10 pieces.' },
        { q: 'Are menus waterproof?', a: 'We offer PVC and laminated waterproof menus suitable for restaurant environments.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Rush 3-day service available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に50個から。使い捨てメニューは10個から承ります。' },
        { q: '防水性はありますか？', a: 'PVCとラミネート防水メニューを提供しており、飲食店環境に適しています。' },
        { q: '納期は？', a: '標準5〜7営業日。急行3日対応も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認餐牌尺寸、內容和設計稿。' },
        { name: '印刷生產', text: '使用專業印刷機進行四色印刷。' },
        { name: '表面處理', text: '可選啞膠、光膠或過膠等工藝。' },
        { name: '裁切成品', text: '精密裁切，確保尺寸精準。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm menu size, content, and design files.' },
        { name: 'Printing', text: 'Four-color printing using professional equipment.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or lamination.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'メニューのサイズ、内容、デザインデータを確認します。' },
        { name: '印刷', text: 'プロの設備を使用した4色印刷。' },
        { name: '表面加工', text: 'マット、グロス、またはラミネーション加工を選択します。' },
        { name: '精密裁断', text: '正確な寸法を保証します。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'hardcover-menus': {
    slug: 'hardcover-menus',
    keywords: {
      'zh-hk': '精裝餐牌,香港精裝,精裝餐牌印刷,香港印刷,印刷即日速遞送貨,硬皮餐牌,高級餐牌,皮面餐牌,硬殼餐牌,厚板餐牌',
      en: 'hardcover menus,hardcover menus printing hong kong, hong kong hardcover menus',
      ja: '高級メニュー,香港高級,高級メニュー印刷',
    },
    h1Suffix: {
      'zh-hk': '專業精裝餐牌服務 | 智印港',
      en: 'Professional Hardcover Menus | ZprintPro',
      ja: 'プロ高級メニュー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '硬殼精裝，高檔大氣，支持印刷即日速遞送貨。適合高級餐廳、酒店。智印港提供專業的精裝餐牌服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Hardcover binding, elegant and grand. Perfect for fine dining restaurants, hotels. ZprintPro offers professional Hardcover Menus services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '上製本装丁、エレガントで格式高い。高級レストラン、ホテルに最適。 ZprintProは高品質な素材と先進的な印刷技術を使用した高級メニューサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '餐牌的最小訂購量是多少？', a: '一般為50個起訂，一次性餐牌可接受10個起。' },
        { q: '餐牌防水嗎？', a: '我們提供PVC和過膠防水餐牌，適合餐飲環境使用。' },
        { q: '餐牌的交貨時間？', a: '標準5-7個工作日。急件可安排3日快印。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 50 pieces minimum. Disposable menus accept 10 pieces.' },
        { q: 'Are menus waterproof?', a: 'We offer PVC and laminated waterproof menus suitable for restaurant environments.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Rush 3-day service available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に50個から。使い捨てメニューは10個から承ります。' },
        { q: '防水性はありますか？', a: 'PVCとラミネート防水メニューを提供しており、飲食店環境に適しています。' },
        { q: '納期は？', a: '標準5〜7営業日。急行3日対応も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認餐牌尺寸、內容和設計稿。' },
        { name: '印刷生產', text: '使用專業印刷機進行四色印刷。' },
        { name: '表面處理', text: '可選啞膠、光膠或過膠等工藝。' },
        { name: '裁切成品', text: '精密裁切，確保尺寸精準。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm menu size, content, and design files.' },
        { name: 'Printing', text: 'Four-color printing using professional equipment.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or lamination.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'メニューのサイズ、内容、デザインデータを確認します。' },
        { name: '印刷', text: 'プロの設備を使用した4色印刷。' },
        { name: '表面加工', text: 'マット、グロス、またはラミネーション加工を選択します。' },
        { name: '精密裁断', text: '正確な寸法を保証します。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'drink-menus': {
    slug: 'drink-menus',
    keywords: {
      'zh-hk': '飲品餐牌印刷,酒水單印刷,飲料菜單,酒吧餐牌,咖啡店餐牌,茶餐廳餐牌,飲品餐牌設計,飲品餐牌香港,飲品餐牌報價,飲品餐牌速印,飲品餐牌少量印刷,雞尾酒餐牌,特色飲品餐牌',
      'en': 'drink menu printing,drink menus,beverage menu printing,bar menus,cafe menus,tea restaurant menus,drink menu design,drink menus hong kong,drink menu quote,drink menu printing service,cocktail menus,signature drink menus',
      'ja': 'ドリンクメニュー印刷,飲み物メニュー,ドリンクメニュー,バーメニュー,カフェメニュー,ドリンクメニューデザイン,ドリンクメニュー香港,ドリンクメニュー見積もり,カクテルメニュー',
    },
    h1Suffix: {
      'zh-hk': '專業酒水牌服務 | 智印港',
      en: 'Professional Drink Menus | ZprintPro',
      ja: 'プロドリンクメニュー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '專為酒水設計，可立式或手持。酒吧、餐廳必備。智印港提供專業的酒水牌服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Specially designed for drinks, can be standing or handheld. ZprintPro offers professional Drink Menus services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'ドリンク専用設計、立てかけまたは手持ち可能。 ZprintProは高品質な素材と先進的な印刷技術を使用したドリンクメニューサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '餐牌的最小訂購量是多少？', a: '一般為50個起訂，一次性餐牌可接受10個起。' },
        { q: '餐牌防水嗎？', a: '我們提供PVC和過膠防水餐牌，適合餐飲環境使用。' },
        { q: '餐牌的交貨時間？', a: '標準5-7個工作日。急件可安排3日快印。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 50 pieces minimum. Disposable menus accept 10 pieces.' },
        { q: 'Are menus waterproof?', a: 'We offer PVC and laminated waterproof menus suitable for restaurant environments.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Rush 3-day service available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に50個から。使い捨てメニューは10個から承ります。' },
        { q: '防水性はありますか？', a: 'PVCとラミネート防水メニューを提供しており、飲食店環境に適しています。' },
        { q: '納期は？', a: '標準5〜7営業日。急行3日対応も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認餐牌尺寸、內容和設計稿。' },
        { name: '印刷生產', text: '使用專業印刷機進行四色印刷。' },
        { name: '表面處理', text: '可選啞膠、光膠或過膠等工藝。' },
        { name: '裁切成品', text: '精密裁切，確保尺寸精準。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm menu size, content, and design files.' },
        { name: 'Printing', text: 'Four-color printing using professional equipment.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or lamination.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'メニューのサイズ、内容、デザインデータを確認します。' },
        { name: '印刷', text: 'プロの設備を使用した4色印刷。' },
        { name: '表面加工', text: 'マット、グロス、またはラミネーション加工を選択します。' },
        { name: '精密裁断', text: '正確な寸法を保証します。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'disposable-menus': {
    slug: 'disposable-menus',
    keywords: {
      'zh-hk': '即棄餐牌印刷,一次性餐牌,即棄菜單,紙質餐牌印刷,即棄餐牌訂造,即棄餐牌設計,即棄餐牌香港,即棄餐牌報價,即棄餐牌速印,即棄餐牌少量印刷,餐廳即棄餐牌,外賣餐牌印刷',
      'en': 'disposable menu printing,disposable menus,one time use menus,paper menus printing,temporary menus,disposable menu design,disposable menus hong kong,disposable menu quote,disposable menu printing service,restaurant disposable menus,takeaway menu printing',
      'ja': '使い捨てメニュー印刷,使い捨てメニュー,ワンタイムメニュー,紙メニュー印刷,使い捨てメニューデザイン,使い捨てメニュー香港,使い捨てメニュー見積もり,レストラン使い捨てメニュー',
    },
    h1Suffix: {
      'zh-hk': '專業一次性餐牌服務 | 智印港',
      en: 'Professional Disposable Menus | ZprintPro',
      ja: 'プロ使い捨てメニュー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '經濟紙質，適合快餐店、外賣店。可頻繁更換內容。智印港提供專業的一次性餐牌服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Economical paper, perfect for fast food and takeaway shops. ZprintPro offers professional Disposable Menus services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '経済的な紙、ファストフードやテイクアウト店に最適。 ZprintProは高品質な素材と先進的な印刷技術を使用した使い捨てメニューサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '餐牌的最小訂購量是多少？', a: '一般為50個起訂，一次性餐牌可接受10個起。' },
        { q: '餐牌防水嗎？', a: '我們提供PVC和過膠防水餐牌，適合餐飲環境使用。' },
        { q: '餐牌的交貨時間？', a: '標準5-7個工作日。急件可安排3日快印。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 50 pieces minimum. Disposable menus accept 10 pieces.' },
        { q: 'Are menus waterproof?', a: 'We offer PVC and laminated waterproof menus suitable for restaurant environments.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Rush 3-day service available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に50個から。使い捨てメニューは10個から承ります。' },
        { q: '防水性はありますか？', a: 'PVCとラミネート防水メニューを提供しており、飲食店環境に適しています。' },
        { q: '納期は？', a: '標準5〜7営業日。急行3日対応も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認餐牌尺寸、內容和設計稿。' },
        { name: '印刷生產', text: '使用專業印刷機進行四色印刷。' },
        { name: '表面處理', text: '可選啞膠、光膠或過膠等工藝。' },
        { name: '裁切成品', text: '精密裁切，確保尺寸精準。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm menu size, content, and design files.' },
        { name: 'Printing', text: 'Four-color printing using professional equipment.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or lamination.' },
        { name: 'Precision Cutting', text: 'Ensure accurate dimensions.' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'メニューのサイズ、内容、デザインデータを確認します。' },
        { name: '印刷', text: 'プロの設備を使用した4色印刷。' },
        { name: '表面加工', text: 'マット、グロス、またはラミネーション加工を選択します。' },
        { name: '精密裁断', text: '正確な寸法を保証します。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'outdoor-vinyl-banners': {
    slug: 'outdoor-vinyl-banners',
    keywords: {
      'zh-hk': '戶外燈布噴繪,香港戶外燈布噴繪,戶外燈布噴繪印刷,香港印刷,印刷即日速遞送貨,戶外橫額,戶外banner,防水橫額,防曬banner,大型戶外橫額,建築地盤橫額',
      en: 'outdoor vinyl banners,outdoor vinyl banners printing hong kong, hong kong outdoor vinyl banners',
      ja: '屋外バナー,香港屋外,屋外バナー印刷',
    },
    h1Suffix: {
      'zh-hk': '專業戶外燈布噴繪服務 | 智印港',
      en: 'Professional Outdoor Vinyl Banners | ZprintPro',
      ja: 'プロ屋外バナー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '大型戶外燈布，防水防曬，耐候性強，支持印刷即日速遞送貨。適合戶外廣告牌、建築圍板。智印港提供專業的戶外燈布噴繪服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Large outdoor vinyl banners, waterproof and UV-resistant, strong weather resistance. ZprintPro offers professional Outdoor Vinyl Banners services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '大型屋外ビニールバナー、防水・UV耐性、強い耐候性。 ZprintProは高品質な素材と先進的な印刷技術を使用した屋外バナーサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '橫幅的最大尺寸可以做到多大？', a: '我們支持最寬5米的無縫拼接，長度不限。' },
        { q: '戶外橫幅防曬防水嗎？', a: '是的。我們使用戶外專用燈布和防水油墨，可承受風吹日曬。' },
        { q: '橫幅的交貨時間？', a: '標準3-5個工作日。大幅面可能需要額外時間。' },
      ],
      'en': [
        { q: 'What is the maximum banner size?', a: 'We support up to 5 meters wide with seamless拼接. Length is unlimited.' },
        { q: 'Are outdoor banners waterproof and UV-resistant?', a: 'Yes. We use outdoor-grade vinyl and waterproof ink that withstands wind and sun.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Large format may require additional time.' },
      ],
      'ja': [
        { q: '最大サイズは？', a: '最広5メートルの継ぎ目なし拼接に対応。長さは無制限です。' },
        { q: '屋外バナーは防水・UV耐性がありますか？', a: 'はい。屋外専用ビニールと防水インクを使用し、風雨に耐えられます。' },
        { q: '納期は？', a: '標準3〜5営業日。大判の場合は追加時間が必要な場合があります。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認橫幅尺寸、解析度和設計稿。' },
        { name: '輸出印刷', text: '使用大判噴繪機進行高精度輸出。' },
        { name: '裁切/包邊', text: '根據需求裁切並包邊或打孔。' },
        { name: '質檢包裝', text: '檢查色彩和尺寸，合格後捲軸包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm banner size, resolution, and design files.' },
        { name: 'Large Format Printing', text: 'High-precision output using large format inkjet printer.' },
        { name: 'Cutting/Hemming', text: 'Cut and hem or punch holes as required.' },
        { name: 'QC & Packaging', text: 'Check color and dimensions, then roll and package for shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'バナーのサイズ、解像度、デザインデータを確認します。' },
        { name: '大判印刷', text: '大判インクジェットプリンターで高精度出力します。' },
        { name: '裁断・ヘミング', text: '必要に応じて裁断し、ヘミングまたは穴あけを行います。' },
        { name: '品質検査・梱包', text: '色と寸法を検査し、巻き取って梱包出荷します。' },
      ],
    },
  },
  'roll-up-banners': {
    slug: 'roll-up-banners',
    keywords: {
      'zh-hk': '易拉架,易拉架印刷,易拉寶,易拉架制作,便攜橫額,展覽易拉架,活動易拉架,易拉架設計,易拉架香港,易拉架訂造,易拉架連設計,易拉架快速制作,易拉架報價',
      'en': 'roll up banners,roll up banner printing,retractable banners,pull up banners,portable banners,exhibition roll up banners,event roll up banners,roll up banner design,roll up banner hong kong,custom roll up banners,roll up stand banners,rollup banner printing',
      'ja': 'ロールアップバナー,ロールアップバナー印刷,巻き取りバナー,持ち運びバナー,展示会用ロールアップバナー,イベントロールアップバナー,ロールアップバナーデザイン,ロールアップバナー香港,オーダーメイドロールアップバナー',
    },
    h1Suffix: {
      'zh-hk': '專業易拉寶服務 | 智印港',
      en: 'Professional Roll-up Banners | ZprintPro',
      ja: 'プロロールアップバナー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '便攜易拉寶展架，安裝簡便，支持印刷即日速遞送貨。展會、路演必備。智印港提供專業的易拉寶服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Portable roll-up banner stands, easy to install. Essential for exhibitions and roadshows. ZprintPro offers professional Roll-up Banners services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'ポータブルロールアップバナースタンド、設置簡単。展示会やロードショーに必須。 ZprintProは高品質な素材と先進的な印刷技術を使用したロールアップバナーサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '橫幅的最大尺寸可以做到多大？', a: '我們支持最寬5米的無縫拼接，長度不限。' },
        { q: '戶外橫幅防曬防水嗎？', a: '是的。我們使用戶外專用燈布和防水油墨，可承受風吹日曬。' },
        { q: '橫幅的交貨時間？', a: '標準3-5個工作日。大幅面可能需要額外時間。' },
      ],
      'en': [
        { q: 'What is the maximum banner size?', a: 'We support up to 5 meters wide with seamless拼接. Length is unlimited.' },
        { q: 'Are outdoor banners waterproof and UV-resistant?', a: 'Yes. We use outdoor-grade vinyl and waterproof ink that withstands wind and sun.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Large format may require additional time.' },
      ],
      'ja': [
        { q: '最大サイズは？', a: '最広5メートルの継ぎ目なし拼接に対応。長さは無制限です。' },
        { q: '屋外バナーは防水・UV耐性がありますか？', a: 'はい。屋外専用ビニールと防水インクを使用し、風雨に耐えられます。' },
        { q: '納期は？', a: '標準3〜5営業日。大判の場合は追加時間が必要な場合があります。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認橫幅尺寸、解析度和設計稿。' },
        { name: '輸出印刷', text: '使用大判噴繪機進行高精度輸出。' },
        { name: '裁切/包邊', text: '根據需求裁切並包邊或打孔。' },
        { name: '質檢包裝', text: '檢查色彩和尺寸，合格後捲軸包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm banner size, resolution, and design files.' },
        { name: 'Large Format Printing', text: 'High-precision output using large format inkjet printer.' },
        { name: 'Cutting/Hemming', text: 'Cut and hem or punch holes as required.' },
        { name: 'QC & Packaging', text: 'Check color and dimensions, then roll and package for shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'バナーのサイズ、解像度、デザインデータを確認します。' },
        { name: '大判印刷', text: '大判インクジェットプリンターで高精度出力します。' },
        { name: '裁断・ヘミング', text: '必要に応じて裁断し、ヘミングまたは穴あけを行います。' },
        { name: '品質検査・梱包', text: '色と寸法を検査し、巻き取って梱包出荷します。' },
      ],
    },
  },
  'adhesive-banners': {
    slug: 'adhesive-banners',
    keywords: {
      'zh-hk': '背膠噴繪,香港背膠噴繪,背膠噴繪印刷,香港印刷,背膠橫額,自粘橫額,貼紙橫額,牆身橫額,玻璃橫額,可移除橫額',
      en: 'adhesive banners,adhesive banners printing hong kong, hong kong adhesive banners',
      ja: '粘着バナー,香港粘着,粘着バナー印刷',
    },
    h1Suffix: {
      'zh-hk': '專業背膠噴繪服務 | 智印港',
      en: 'Professional Adhesive Banners | ZprintPro',
      ja: 'プロ粘着バナー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '自帶背膠，可直接粘貼於牆面或玻璃。適合店鋪裝飾、活動佈置。智印港提供專業的背膠噴繪服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Self-adhesive, can be directly applied to walls or glass. ZprintPro offers professional Adhesive Banners services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '自己粘着、壁やガラスに直接貼付可能。 ZprintProは高品質な素材と先進的な印刷技術を使用した粘着バナーサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '橫幅的最大尺寸可以做到多大？', a: '我們支持最寬5米的無縫拼接，長度不限。' },
        { q: '戶外橫幅防曬防水嗎？', a: '是的。我們使用戶外專用燈布和防水油墨，可承受風吹日曬。' },
        { q: '橫幅的交貨時間？', a: '標準3-5個工作日。大幅面可能需要額外時間。' },
      ],
      'en': [
        { q: 'What is the maximum banner size?', a: 'We support up to 5 meters wide with seamless拼接. Length is unlimited.' },
        { q: 'Are outdoor banners waterproof and UV-resistant?', a: 'Yes. We use outdoor-grade vinyl and waterproof ink that withstands wind and sun.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Large format may require additional time.' },
      ],
      'ja': [
        { q: '最大サイズは？', a: '最広5メートルの継ぎ目なし拼接に対応。長さは無制限です。' },
        { q: '屋外バナーは防水・UV耐性がありますか？', a: 'はい。屋外専用ビニールと防水インクを使用し、風雨に耐えられます。' },
        { q: '納期は？', a: '標準3〜5営業日。大判の場合は追加時間が必要な場合があります。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認橫幅尺寸、解析度和設計稿。' },
        { name: '輸出印刷', text: '使用大判噴繪機進行高精度輸出。' },
        { name: '裁切/包邊', text: '根據需求裁切並包邊或打孔。' },
        { name: '質檢包裝', text: '檢查色彩和尺寸，合格後捲軸包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm banner size, resolution, and design files.' },
        { name: 'Large Format Printing', text: 'High-precision output using large format inkjet printer.' },
        { name: 'Cutting/Hemming', text: 'Cut and hem or punch holes as required.' },
        { name: 'QC & Packaging', text: 'Check color and dimensions, then roll and package for shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'バナーのサイズ、解像度、デザインデータを確認します。' },
        { name: '大判印刷', text: '大判インクジェットプリンターで高精度出力します。' },
        { name: '裁断・ヘミング', text: '必要に応じて裁断し、ヘミングまたは穴あけを行います。' },
        { name: '品質検査・梱包', text: '色と寸法を検査し、巻き取って梱包出荷します。' },
      ],
    },
  },
  'vehicle-wraps': {
    slug: 'vehicle-wraps',
    keywords: {
      'zh-hk': '車身貼紙,車身廣告貼紙,車貼印刷,車身包膜,廣告車貼,貨車車身貼,巴士車身廣告,車身貼設計,車身貼香港,汽車貼紙印刷,車身廣告制作,全車貼紙,局部車身貼',
      'en': 'vehicle wraps,car wrap printing,vehicle graphics,van wraps,car sticker printing,commercial vehicle wraps,truck wraps,bus advertising wraps,vehicle wrap design,vehicle wrap hong kong,fleet vehicle wraps,partial car wraps',
      'ja': 'カーラッピング,車両ラップ,車体広告,カーステッカー印刷,商用車ラッピング,トラックラッピング,バス広告ラッピング,カーラップデザイン,カーラップ香港,フリートラッピング',
    },
    h1Suffix: {
      'zh-hk': '專業車身廣告服務 | 智印港',
      en: 'Professional Vehicle Wraps | ZprintPro',
      ja: 'プロカーラッピング | ZprintPro',
    },
    longDescription: {
      'zh-hk': '專用車身貼紙，耐候性強，移除不留痕。流動廣告，曝光率高。智印港提供專業的車身廣告服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Specialized vehicle wrap vinyl, strong weather resistance, no residue when removed. ZprintPro offers professional Vehicle Wraps services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '専用車体ラップビニール、強い耐候性、剥がしても残りません。 ZprintProは高品質な素材と先進的な印刷技術を使用したカーラッピングサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '橫幅的最大尺寸可以做到多大？', a: '我們支持最寬5米的無縫拼接，長度不限。' },
        { q: '戶外橫幅防曬防水嗎？', a: '是的。我們使用戶外專用燈布和防水油墨，可承受風吹日曬。' },
        { q: '橫幅的交貨時間？', a: '標準3-5個工作日。大幅面可能需要額外時間。' },
      ],
      'en': [
        { q: 'What is the maximum banner size?', a: 'We support up to 5 meters wide with seamless拼接. Length is unlimited.' },
        { q: 'Are outdoor banners waterproof and UV-resistant?', a: 'Yes. We use outdoor-grade vinyl and waterproof ink that withstands wind and sun.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Large format may require additional time.' },
      ],
      'ja': [
        { q: '最大サイズは？', a: '最広5メートルの継ぎ目なし拼接に対応。長さは無制限です。' },
        { q: '屋外バナーは防水・UV耐性がありますか？', a: 'はい。屋外専用ビニールと防水インクを使用し、風雨に耐えられます。' },
        { q: '納期は？', a: '標準3〜5営業日。大判の場合は追加時間が必要な場合があります。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認橫幅尺寸、解析度和設計稿。' },
        { name: '輸出印刷', text: '使用大判噴繪機進行高精度輸出。' },
        { name: '裁切/包邊', text: '根據需求裁切並包邊或打孔。' },
        { name: '質檢包裝', text: '檢查色彩和尺寸，合格後捲軸包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm banner size, resolution, and design files.' },
        { name: 'Large Format Printing', text: 'High-precision output using large format inkjet printer.' },
        { name: 'Cutting/Hemming', text: 'Cut and hem or punch holes as required.' },
        { name: 'QC & Packaging', text: 'Check color and dimensions, then roll and package for shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'バナーのサイズ、解像度、デザインデータを確認します。' },
        { name: '大判印刷', text: '大判インクジェットプリンターで高精度出力します。' },
        { name: '裁断・ヘミング', text: '必要に応じて裁断し、ヘミングまたは穴あけを行います。' },
        { name: '品質検査・梱包', text: '色と寸法を検査し、巻き取って梱包出荷します。' },
      ],
    },
  },
  'mesh-banners': {
    slug: 'mesh-banners',
    keywords: {
      'zh-hk': '網孔橫額,透風橫額,戶外網布橫額,防風橫額印刷,工地圍欄橫額,大型網孔橫額,建築地盤橫額,工程橫額,網布橫額香港,透氣橫額制作,網眼橫額印刷,戶外防風橫額',
      'en': 'mesh banners,perforated banners,windproof banners,outdoor mesh banners,construction site banners,building site banners,scaffold banners,large mesh banners,mesh banner printing hong kong,wind permeable banners,mesh vinyl banners',
      'ja': 'メッシュバナー,パンチングバナー,防風バナー,屋外メッシュバナー,建設現場バナー,足場バナー,大型メッシュバナー,メッシュバナー印刷,風通しバナー,メッシュビニールバナー',
    },
    h1Suffix: {
      'zh-hk': '專業網格布噴繪服務 | 智印港',
      en: 'Professional Mesh Banners | ZprintPro',
      ja: 'プロメッシュバナー | ZprintPro',
    },
    longDescription: {
      'zh-hk': '網格設計，透光透風。適合大型戶外廣告、建築圍板。智印港提供專業的網格布噴繪服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Mesh design, light and air permeable. Perfect for large outdoor advertising. ZprintPro offers professional Mesh Banners services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'メッシュデザイン、光と空気を通す。大型屋外広告に最適。 ZprintProは高品質な素材と先進的な印刷技術を使用したメッシュバナーサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '橫幅的最大尺寸可以做到多大？', a: '我們支持最寬5米的無縫拼接，長度不限。' },
        { q: '戶外橫幅防曬防水嗎？', a: '是的。我們使用戶外專用燈布和防水油墨，可承受風吹日曬。' },
        { q: '橫幅的交貨時間？', a: '標準3-5個工作日。大幅面可能需要額外時間。' },
      ],
      'en': [
        { q: 'What is the maximum banner size?', a: 'We support up to 5 meters wide with seamless拼接. Length is unlimited.' },
        { q: 'Are outdoor banners waterproof and UV-resistant?', a: 'Yes. We use outdoor-grade vinyl and waterproof ink that withstands wind and sun.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Large format may require additional time.' },
      ],
      'ja': [
        { q: '最大サイズは？', a: '最広5メートルの継ぎ目なし拼接に対応。長さは無制限です。' },
        { q: '屋外バナーは防水・UV耐性がありますか？', a: 'はい。屋外専用ビニールと防水インクを使用し、風雨に耐えられます。' },
        { q: '納期は？', a: '標準3〜5営業日。大判の場合は追加時間が必要な場合があります。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認橫幅尺寸、解析度和設計稿。' },
        { name: '輸出印刷', text: '使用大判噴繪機進行高精度輸出。' },
        { name: '裁切/包邊', text: '根據需求裁切並包邊或打孔。' },
        { name: '質檢包裝', text: '檢查色彩和尺寸，合格後捲軸包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm banner size, resolution, and design files.' },
        { name: 'Large Format Printing', text: 'High-precision output using large format inkjet printer.' },
        { name: 'Cutting/Hemming', text: 'Cut and hem or punch holes as required.' },
        { name: 'QC & Packaging', text: 'Check color and dimensions, then roll and package for shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'バナーのサイズ、解像度、デザインデータを確認します。' },
        { name: '大判印刷', text: '大判インクジェットプリンターで高精度出力します。' },
        { name: '裁断・ヘミング', text: '必要に応じて裁断し、ヘミングまたは穴あけを行います。' },
        { name: '品質検査・梱包', text: '色と寸法を検査し、巻き取って梱包出荷します。' },
      ],
    },
  },
  'catalog-printing': {
    slug: 'catalog-printing',
    keywords: {
      'zh-hk': '畫冊印刷,香港畫冊,香港印刷,印刷即日速遞送貨,目錄印刷,產品目錄,公司目錄,商品目錄,精裝目錄,企業目錄',
      en: 'catalog printing,catalog  printing hong kong, hong kong catalog ',
      ja: 'カタログ印刷,香港カタログ,カタログ印刷',
    },
    h1Suffix: {
      'zh-hk': '專業畫冊印刷服務 | 智印港',
      en: 'Professional Catalog Printing | ZprintPro',
      ja: 'プロカタログ印刷 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '高級畫冊，色彩還原度高，支持印刷即日速遞送貨。適合產品目錄、企業年報、藝術作品集。智印港提供專業的畫冊印刷服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Premium catalogs with high color accuracy. Perfect for product catalogs, annual reports. ZprintPro offers professional Catalog Printing services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '高級カタログ、高い色再現性。製品カタログ、年次報告書に最適。 ZprintProは高品質な素材と先進的な印刷技術を使用したカタログ印刷サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '書籍的最小訂購量是多少？', a: '一般為100本起訂，畫冊和精裝書建議200本起。' },
        { q: '支持哪些裝訂方式？', a: '我們支持騎馬釘、無線膠裝、精裝、線圈裝等多種裝訂方式。' },
        { q: '書籍的交貨時間？', a: '標準7-10個工作日。精裝書可能需要10-15天。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Catalogs and hardcover books recommended from 200 pieces.' },
        { q: 'What binding options do you support?', a: 'We support saddle-stitch, perfect binding, hardcover, and spiral binding.' },
        { q: 'What is the delivery time?', a: 'Standard 7-10 business days. Hardcover books may take 10-15 days.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100部から。画集や精装本は200部から推奨します。' },
        { q: '対応している綴じ方は？', a: '騎馬綴じ、無線綴じ、精装、线圈装など様々な綴じ方に対応しています。' },
        { q: '納期は？', a: '標準7〜10営業日。精装本は10〜15日かかる場合があります。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認書籍尺寸、頁數和裝訂方式。' },
        { name: '內頁印刷', text: '進行內頁四色印刷。' },
        { name: '封面印刷', text: '進行封面印刷和表面處理。' },
        { name: '裁切/摺頁', text: '將紙張裁切並摺疊成書頁。' },
        { name: '裝訂', text: '根據選擇進行騎馬釘、無線膠裝或精裝。' },
        { name: '質檢包裝', text: '檢查頁碼順序和裝訂質量，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm book size, page count, and binding method.' },
        { name: 'Inner Page Printing', text: 'Four-color printing of inner pages.' },
        { name: 'Cover Printing', text: 'Cover printing and surface finishing.' },
        { name: 'Cutting/Folding', text: 'Cut and fold paper into book pages.' },
        { name: 'Binding', text: 'Saddle-stitch, perfect binding, or hardcover as selected.' },
        { name: 'QC & Packaging', text: 'Check page order and binding quality before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '書籍のサイズ、ページ数、綴じ方を確認します。' },
        { name: '中面印刷', text: '中面の4色印刷を行います。' },
        { name: '表紙印刷', text: '表紙の印刷と表面加工を行います。' },
        { name: '裁断・折り畳み', text: '紙を裁断し、書ページに折り畳みます。' },
        { name: '綴じ', text: '騎馬綴じ、無線綴じ、または精装の綴じを行います。' },
        { name: '品質検査・梱包', text: 'ページ順序と綴じ質を検査し、出荷します。' },
      ],
    },
  },
  'saddle-stitch-booklets': {
    slug: 'saddle-stitch-booklets',
    keywords: {
      'zh-hk': '騎釘書刊印刷,騎馬釘小冊子,騎釘書制作,騎釘書訂造,騎釘刊物,騎釘宣傳冊,騎釘書設計,騎釘書香港,騎釘書報價,騎釘書速印,騎釘書少量印刷,騎釘書裝訂',
      'en': 'saddle stitch booklet printing,saddle stitch binding,saddle stitch booklets,saddle stitched brochures,saddle stitch booklet design,saddle stitch booklet hong kong,saddle stitch booklet quote,saddle stitch printing service,saddle stitch pamphlet printing,saddle stitched catalogs',
      'ja': '中綴じ小冊子印刷,中綴じ製本,中綴じ小冊子,中綴じパンフレット,中綴じ小冊子デザイン,中綴じ小冊子香港,中綴じ小冊子見積もり,中綴じ印刷サービス',
    },
    h1Suffix: {
      'zh-hk': '專業騎馬釘小冊子服務 | 智印港',
      en: 'Professional Saddle Stitch Booklets | ZprintPro',
      ja: 'プロ中綴じ冊子 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '經濟裝訂方式，適合頁數較少的冊子，支持印刷即日速遞送貨。產品說明書、活動手冊首選。智印港提供專業的騎馬釘小冊子服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Economical binding method, perfect for booklets with fewer pages. ZprintPro offers professional Saddle Stitch Booklets services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '経済的な製本方法、ページ数の少ない冊子に最適。 ZprintProは高品質な素材と先進的な印刷技術を使用した中綴じ冊子サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '書籍的最小訂購量是多少？', a: '一般為100本起訂，畫冊和精裝書建議200本起。' },
        { q: '支持哪些裝訂方式？', a: '我們支持騎馬釘、無線膠裝、精裝、線圈裝等多種裝訂方式。' },
        { q: '書籍的交貨時間？', a: '標準7-10個工作日。精裝書可能需要10-15天。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Catalogs and hardcover books recommended from 200 pieces.' },
        { q: 'What binding options do you support?', a: 'We support saddle-stitch, perfect binding, hardcover, and spiral binding.' },
        { q: 'What is the delivery time?', a: 'Standard 7-10 business days. Hardcover books may take 10-15 days.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100部から。画集や精装本は200部から推奨します。' },
        { q: '対応している綴じ方は？', a: '騎馬綴じ、無線綴じ、精装、线圈装など様々な綴じ方に対応しています。' },
        { q: '納期は？', a: '標準7〜10営業日。精装本は10〜15日かかる場合があります。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認書籍尺寸、頁數和裝訂方式。' },
        { name: '內頁印刷', text: '進行內頁四色印刷。' },
        { name: '封面印刷', text: '進行封面印刷和表面處理。' },
        { name: '裁切/摺頁', text: '將紙張裁切並摺疊成書頁。' },
        { name: '裝訂', text: '根據選擇進行騎馬釘、無線膠裝或精裝。' },
        { name: '質檢包裝', text: '檢查頁碼順序和裝訂質量，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm book size, page count, and binding method.' },
        { name: 'Inner Page Printing', text: 'Four-color printing of inner pages.' },
        { name: 'Cover Printing', text: 'Cover printing and surface finishing.' },
        { name: 'Cutting/Folding', text: 'Cut and fold paper into book pages.' },
        { name: 'Binding', text: 'Saddle-stitch, perfect binding, or hardcover as selected.' },
        { name: 'QC & Packaging', text: 'Check page order and binding quality before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '書籍のサイズ、ページ数、綴じ方を確認します。' },
        { name: '中面印刷', text: '中面の4色印刷を行います。' },
        { name: '表紙印刷', text: '表紙の印刷と表面加工を行います。' },
        { name: '裁断・折り畳み', text: '紙を裁断し、書ページに折り畳みます。' },
        { name: '綴じ', text: '騎馬綴じ、無線綴じ、または精装の綴じを行います。' },
        { name: '品質検査・梱包', text: 'ページ順序と綴じ質を検査し、出荷します。' },
      ],
    },
  },
  'perfect-bound-books': {
    slug: 'perfect-bound-books',
    keywords: {
      'zh-hk': '膠裝書印刷,無線膠裝書,膠裝書制作,膠裝書訂造,膠裝書籍,膠裝畫冊,膠裝書設計,膠裝書香港,膠裝書報價,膠裝書速印,膠裝書少量印刷,膠裝書平裝,膠裝書質量',
      'en': 'perfect bound book printing,perfect bound book binding,perfect bound books,perfect bound book design,perfect bound book hong kong,perfect bound book quote,perfect bound book printing service,softcover book printing,perfect binding books,paperback book printing',
      'ja': '中綴じ本印刷,无线綴じ本,中綴じ本制作,中綴じ本デザイン,中綴じ本香港,中綴じ本見積もり,中綴じ本印刷サービス,ソフトカバー本印刷,ペーパーバック印刷',
    },
    h1Suffix: {
      'zh-hk': '專業無線膠裝書籍服務 | 智印港',
      en: 'Professional Perfect Bound Books | ZprintPro',
      ja: 'プロ無線綴じ本 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '平整書脊，可印刷書名。適合頁數較多的書籍、雜誌。智印港提供專業的無線膠裝書籍服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Flat spine, can print book title. Perfect for books and magazines with more pages. ZprintPro offers professional Perfect Bound Books services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '平らな背表紙、書名を印刷可能。ページ数の多い本や雑誌に最適。 ZprintProは高品質な素材と先進的な印刷技術を使用した無線綴じ本サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '書籍的最小訂購量是多少？', a: '一般為100本起訂，畫冊和精裝書建議200本起。' },
        { q: '支持哪些裝訂方式？', a: '我們支持騎馬釘、無線膠裝、精裝、線圈裝等多種裝訂方式。' },
        { q: '書籍的交貨時間？', a: '標準7-10個工作日。精裝書可能需要10-15天。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Catalogs and hardcover books recommended from 200 pieces.' },
        { q: 'What binding options do you support?', a: 'We support saddle-stitch, perfect binding, hardcover, and spiral binding.' },
        { q: 'What is the delivery time?', a: 'Standard 7-10 business days. Hardcover books may take 10-15 days.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100部から。画集や精装本は200部から推奨します。' },
        { q: '対応している綴じ方は？', a: '騎馬綴じ、無線綴じ、精装、线圈装など様々な綴じ方に対応しています。' },
        { q: '納期は？', a: '標準7〜10営業日。精装本は10〜15日かかる場合があります。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認書籍尺寸、頁數和裝訂方式。' },
        { name: '內頁印刷', text: '進行內頁四色印刷。' },
        { name: '封面印刷', text: '進行封面印刷和表面處理。' },
        { name: '裁切/摺頁', text: '將紙張裁切並摺疊成書頁。' },
        { name: '裝訂', text: '根據選擇進行騎馬釘、無線膠裝或精裝。' },
        { name: '質檢包裝', text: '檢查頁碼順序和裝訂質量，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm book size, page count, and binding method.' },
        { name: 'Inner Page Printing', text: 'Four-color printing of inner pages.' },
        { name: 'Cover Printing', text: 'Cover printing and surface finishing.' },
        { name: 'Cutting/Folding', text: 'Cut and fold paper into book pages.' },
        { name: 'Binding', text: 'Saddle-stitch, perfect binding, or hardcover as selected.' },
        { name: 'QC & Packaging', text: 'Check page order and binding quality before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '書籍のサイズ、ページ数、綴じ方を確認します。' },
        { name: '中面印刷', text: '中面の4色印刷を行います。' },
        { name: '表紙印刷', text: '表紙の印刷と表面加工を行います。' },
        { name: '裁断・折り畳み', text: '紙を裁断し、書ページに折り畳みます。' },
        { name: '綴じ', text: '騎馬綴じ、無線綴じ、または精装の綴じを行います。' },
        { name: '品質検査・梱包', text: 'ページ順序と綴じ質を検査し、出荷します。' },
      ],
    },
  },
  'hardcover-books': {
    slug: 'hardcover-books',
    keywords: {
      'zh-hk': '硬皮書印刷,精裝書印刷,硬皮書制作,精裝書訂造,畫冊印刷,相冊印刷,紀念冊印刷,硬皮書香港,精裝書設計,硬皮書報價,高級精裝書,硬皮書少量印刷,硬皮書速印',
      'en': 'hardcover book printing,hardcover book binding,premium book printing,photo book printing,coffee table book printing,commemorative book printing,hardcover book design,hardcover book hong kong,hardcover book quote,hardcover book printing service,hardcover book small quantity',
      'ja': 'ハードカバー本印刷,上製本印刷,高級本印刷,写真集印刷,記念冊印刷,ハードカバー本デザイン,ハードカバー本香港,ハードカバー本見積もり,ハードカバー本印刷サービス',
    },
    h1Suffix: {
      'zh-hk': '專業精裝書籍服務 | 智印港',
      en: 'Professional Hardcover Books | ZprintPro',
      ja: 'プロ上製本 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '硬殼精裝，高檔耐用。適合珍藏版書籍、企業年鑑。智印港提供專業的精裝書籍服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Hardcover binding, luxurious and durable. Perfect for collector\ ZprintPro offers professional Hardcover Books services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '上製本装丁、豪華で耐久性あり。愛蔵版、企業年鑑に最適。 ZprintProは高品質な素材と先進的な印刷技術を使用した上製本サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '書籍的最小訂購量是多少？', a: '一般為100本起訂，畫冊和精裝書建議200本起。' },
        { q: '支持哪些裝訂方式？', a: '我們支持騎馬釘、無線膠裝、精裝、線圈裝等多種裝訂方式。' },
        { q: '書籍的交貨時間？', a: '標準7-10個工作日。精裝書可能需要10-15天。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Catalogs and hardcover books recommended from 200 pieces.' },
        { q: 'What binding options do you support?', a: 'We support saddle-stitch, perfect binding, hardcover, and spiral binding.' },
        { q: 'What is the delivery time?', a: 'Standard 7-10 business days. Hardcover books may take 10-15 days.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100部から。画集や精装本は200部から推奨します。' },
        { q: '対応している綴じ方は？', a: '騎馬綴じ、無線綴じ、精装、线圈装など様々な綴じ方に対応しています。' },
        { q: '納期は？', a: '標準7〜10営業日。精装本は10〜15日かかる場合があります。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認書籍尺寸、頁數和裝訂方式。' },
        { name: '內頁印刷', text: '進行內頁四色印刷。' },
        { name: '封面印刷', text: '進行封面印刷和表面處理。' },
        { name: '裁切/摺頁', text: '將紙張裁切並摺疊成書頁。' },
        { name: '裝訂', text: '根據選擇進行騎馬釘、無線膠裝或精裝。' },
        { name: '質檢包裝', text: '檢查頁碼順序和裝訂質量，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm book size, page count, and binding method.' },
        { name: 'Inner Page Printing', text: 'Four-color printing of inner pages.' },
        { name: 'Cover Printing', text: 'Cover printing and surface finishing.' },
        { name: 'Cutting/Folding', text: 'Cut and fold paper into book pages.' },
        { name: 'Binding', text: 'Saddle-stitch, perfect binding, or hardcover as selected.' },
        { name: 'QC & Packaging', text: 'Check page order and binding quality before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '書籍のサイズ、ページ数、綴じ方を確認します。' },
        { name: '中面印刷', text: '中面の4色印刷を行います。' },
        { name: '表紙印刷', text: '表紙の印刷と表面加工を行います。' },
        { name: '裁断・折り畳み', text: '紙を裁断し、書ページに折り畳みます。' },
        { name: '綴じ', text: '騎馬綴じ、無線綴じ、または精装の綴じを行います。' },
        { name: '品質検査・梱包', text: 'ページ順序と綴じ質を検査し、出荷します。' },
      ],
    },
  },
  'spiral-notebooks': {
    slug: 'spiral-notebooks',
    keywords: {
      'zh-hk': '鐵圈筆記簿印刷,線圈筆記本,鐵圈本制作,線圈簿印刷,螺旋裝訂筆記本,鐵圈筆記簿訂造,鐵圈本設計,鐵圈本香港,鐵圈本報價,鐵圈本速印,鐵圈本少量印刷,學校筆記簿,公司筆記簿',
      'en': 'spiral notebook printing,spiral bound notebooks,wire bound notebooks,coil notebook printing,spiral notebook design,spiral notebook hong kong,spiral notebook quote,spiral notebook printing service,custom spiral notebooks,promotional notebooks',
      'ja': 'スパイラルノート印刷,ワイヤー綴じノート,コイルノート印刷,スパイラルノートデザイン,スパイラルノート香港,スパイラルノート見積もり,オーダーメイドスパイラルノート,販促ノート',
    },
    h1Suffix: {
      'zh-hk': '專業線圈筆記本服務 | 智印港',
      en: 'Professional Spiral Notebooks | ZprintPro',
      ja: 'プロリングノート | ZprintPro',
    },
    longDescription: {
      'zh-hk': '線圈裝訂，可180度平攤。適合筆記本、工作手冊。智印港提供專業的線圈筆記本服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Spiral binding, can lay flat at 180 degrees. Perfect for notebooks, workbooks. ZprintPro offers professional Spiral Notebooks services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'スパイラル製本、180度に開く。ノート、ワークブックに最適。 ZprintProは高品質な素材と先進的な印刷技術を使用したリングノートサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '書籍的最小訂購量是多少？', a: '一般為100本起訂，畫冊和精裝書建議200本起。' },
        { q: '支持哪些裝訂方式？', a: '我們支持騎馬釘、無線膠裝、精裝、線圈裝等多種裝訂方式。' },
        { q: '書籍的交貨時間？', a: '標準7-10個工作日。精裝書可能需要10-15天。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Catalogs and hardcover books recommended from 200 pieces.' },
        { q: 'What binding options do you support?', a: 'We support saddle-stitch, perfect binding, hardcover, and spiral binding.' },
        { q: 'What is the delivery time?', a: 'Standard 7-10 business days. Hardcover books may take 10-15 days.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100部から。画集や精装本は200部から推奨します。' },
        { q: '対応している綴じ方は？', a: '騎馬綴じ、無線綴じ、精装、线圈装など様々な綴じ方に対応しています。' },
        { q: '納期は？', a: '標準7〜10営業日。精装本は10〜15日かかる場合があります。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認書籍尺寸、頁數和裝訂方式。' },
        { name: '內頁印刷', text: '進行內頁四色印刷。' },
        { name: '封面印刷', text: '進行封面印刷和表面處理。' },
        { name: '裁切/摺頁', text: '將紙張裁切並摺疊成書頁。' },
        { name: '裝訂', text: '根據選擇進行騎馬釘、無線膠裝或精裝。' },
        { name: '質檢包裝', text: '檢查頁碼順序和裝訂質量，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm book size, page count, and binding method.' },
        { name: 'Inner Page Printing', text: 'Four-color printing of inner pages.' },
        { name: 'Cover Printing', text: 'Cover printing and surface finishing.' },
        { name: 'Cutting/Folding', text: 'Cut and fold paper into book pages.' },
        { name: 'Binding', text: 'Saddle-stitch, perfect binding, or hardcover as selected.' },
        { name: 'QC & Packaging', text: 'Check page order and binding quality before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '書籍のサイズ、ページ数、綴じ方を確認します。' },
        { name: '中面印刷', text: '中面の4色印刷を行います。' },
        { name: '表紙印刷', text: '表紙の印刷と表面加工を行います。' },
        { name: '裁断・折り畳み', text: '紙を裁断し、書ページに折り畳みます。' },
        { name: '綴じ', text: '騎馬綴じ、無線綴じ、または精装の綴じを行います。' },
        { name: '品質検査・梱包', text: 'ページ順序と綴じ質を検査し、出荷します。' },
      ],
    },
  },
  'business-envelopes': {
    slug: 'business-envelopes',
    keywords: {
      'zh-hk': '公司信封,香港公司,公司信封印刷,香港印刷,印刷即日速遞送貨,商務信封,企業信封,公文信封,信封信紙套裝,印有logo信封',
      en: 'business envelopes,business envelopes printing hong kong, hong kong business envelopes',
      ja: 'ビジネス封筒,香港ビジネス,ビジネス封筒印刷',
    },
    h1Suffix: {
      'zh-hk': '專業公司信封服務 | 智印港',
      en: 'Professional Business Envelopes | ZprintPro',
      ja: 'プロビジネス封筒 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '定制公司信封，印上Logo和地址，支持印刷即日速遞送貨。專業形象，商務必備。智印港提供專業的公司信封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Custom business envelopes with logo and address. Professional image, essential for business. ZprintPro offers professional Business Envelopes services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'カスタムビジネス封筒、ロゴと住所を印刷。プロフェッショナルなイメージ。 ZprintProは高品質な素材と先進的な印刷技術を使用したビジネス封筒サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '信封的最小訂購量是多少？', a: '一般為500個起訂，彩色和特殊材質需1000個起。' },
        { q: '可以定制信封的尺寸嗎？', a: '可以。我們支持各種國際標準尺寸和完全定制尺寸。' },
        { q: '信封的交貨時間？', a: '標準5-7個工作日。急件可安排3日快印。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 500 pieces minimum. Colored and specialty materials require 1000 pieces.' },
        { q: 'Can I customize envelope sizes?', a: 'Yes. We support various international standard sizes and fully custom sizes.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Rush 3-day service available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に500個から。カラー素材は1000個から。' },
        { q: '封筒のサイズカスタマイズは可能？', a: 'はい。各種国際標準サイズと完全カスタムサイズに対応しています。' },
        { q: '納期は？', a: '標準5〜7営業日。急行3日対応も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認信封尺寸、紙張和印刷設計。' },
        { name: '印刷', text: '進行四色印刷或專色印刷。' },
        { name: '模切壓痕', text: '使用刀模進行模切和壓痕。' },
        { name: '摺疊粘合', text: '將紙張摺疊成信封形並粘合。' },
        { name: '質檢包裝', text: '檢查尺寸和粘合牢固度，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm envelope size, paper, and printing design.' },
        { name: 'Printing', text: 'Four-color or spot color printing.' },
        { name: 'Die Cutting & Creasing', text: 'Die cut and crease using the die.' },
        { name: 'Folding & Gluing', text: 'Fold paper into envelope shape and glue.' },
        { name: 'QC & Packaging', text: 'Check dimensions and glue adhesion before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '封筒のサイズ、用紙、印刷デザインを確認します。' },
        { name: '印刷', text: '4色印刷または専色印刷を行います。' },
        { name: 'ダイカット・圧線', text: 'ダイを使用してカットと圧線を行います。' },
        { name: '折り畳み・接着', text: '紙を封筒の形に折り畳み、接着します。' },
        { name: '品質検査・梱包', text: '寸法と接着強度を検査し、出荷します。' },
      ],
    },
  },
  'colored-envelopes': {
    slug: 'colored-envelopes',
    keywords: {
      'zh-hk': '彩色信封,香港彩色,彩色信封印刷,香港印刷,印刷即日速遞送貨,顏色信封,紅色信封,金色信封,藍色信封,特色信封',
      en: 'colored envelopes,colored envelopes printing hong kong, hong kong colored envelopes',
      ja: 'カラー封筒,香港カラー,カラー封筒印刷',
    },
    h1Suffix: {
      'zh-hk': '專業彩色信封服務 | 智印港',
      en: 'Professional Colored Envelopes | ZprintPro',
      ja: 'プロカラー封筒 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '彩色印刷，視覺吸引力強，支持印刷即日速遞送貨。適合邀請函、賀卡、營銷郵件。智印港提供專業的彩色信封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Colorful printing, strong visual appeal. Perfect for invitations, greeting cards. ZprintPro offers professional Colored Envelopes services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'カラフルな印刷、強い視覚的アピール。招待状、グリーティングカードに最適。 ZprintProは高品質な素材と先進的な印刷技術を使用したカラー封筒サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '信封的最小訂購量是多少？', a: '一般為500個起訂，彩色和特殊材質需1000個起。' },
        { q: '可以定制信封的尺寸嗎？', a: '可以。我們支持各種國際標準尺寸和完全定制尺寸。' },
        { q: '信封的交貨時間？', a: '標準5-7個工作日。急件可安排3日快印。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 500 pieces minimum. Colored and specialty materials require 1000 pieces.' },
        { q: 'Can I customize envelope sizes?', a: 'Yes. We support various international standard sizes and fully custom sizes.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Rush 3-day service available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に500個から。カラー素材は1000個から。' },
        { q: '封筒のサイズカスタマイズは可能？', a: 'はい。各種国際標準サイズと完全カスタムサイズに対応しています。' },
        { q: '納期は？', a: '標準5〜7営業日。急行3日対応も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認信封尺寸、紙張和印刷設計。' },
        { name: '印刷', text: '進行四色印刷或專色印刷。' },
        { name: '模切壓痕', text: '使用刀模進行模切和壓痕。' },
        { name: '摺疊粘合', text: '將紙張摺疊成信封形並粘合。' },
        { name: '質檢包裝', text: '檢查尺寸和粘合牢固度，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm envelope size, paper, and printing design.' },
        { name: 'Printing', text: 'Four-color or spot color printing.' },
        { name: 'Die Cutting & Creasing', text: 'Die cut and crease using the die.' },
        { name: 'Folding & Gluing', text: 'Fold paper into envelope shape and glue.' },
        { name: 'QC & Packaging', text: 'Check dimensions and glue adhesion before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '封筒のサイズ、用紙、印刷デザインを確認します。' },
        { name: '印刷', text: '4色印刷または専色印刷を行います。' },
        { name: 'ダイカット・圧線', text: 'ダイを使用してカットと圧線を行います。' },
        { name: '折り畳み・接着', text: '紙を封筒の形に折り畳み、接着します。' },
        { name: '品質検査・梱包', text: '寸法と接着強度を検査し、出荷します。' },
      ],
    },
  },
  'large-envelopes': {
    slug: 'large-envelopes',
    keywords: {
      'zh-hk': '大型信封印刷,大信封訂造,A4信封,文件信封印刷,大碼信封,大型公文封,大信封設計,大信封香港,大信封報價,大信封速印,大信封少量印刷,商業大信封,牛皮大信封',
      'en': 'large envelope printing,custom large envelopes,A4 envelopes,document envelopes,big envelopes,large business envelopes,large envelope design,large envelopes hong kong,large envelope quote,large envelope printing service,commercial large envelopes,kraft large envelopes',
      'ja': '大判封筒印刷,大きい封筒,A4封筒,書類封筒印刷,ビッグ封筒,大型ビジネス封筒,大判封筒デザイン,大判封筒香港,大判封筒見積もり,大判封筒印刷サービス',
    },
    h1Suffix: {
      'zh-hk': '專業大號信封服務 | 智印港',
      en: 'Professional Large Envelopes | ZprintPro',
      ja: 'プロ大判封筒 | ZprintPro',
    },
    longDescription: {
      'zh-hk': 'A4尺寸大信封，可裝入文件、合同。辦公室必備。智印港提供專業的大號信封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'A4 size large envelopes, can hold documents and contracts. Office essential. ZprintPro offers professional Large Envelopes services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'A4サイズの大きな封筒、書類や契約書を入れられます。オフィスに必須。 ZprintProは高品質な素材と先進的な印刷技術を使用した大判封筒サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '信封的最小訂購量是多少？', a: '一般為500個起訂，彩色和特殊材質需1000個起。' },
        { q: '可以定制信封的尺寸嗎？', a: '可以。我們支持各種國際標準尺寸和完全定制尺寸。' },
        { q: '信封的交貨時間？', a: '標準5-7個工作日。急件可安排3日快印。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 500 pieces minimum. Colored and specialty materials require 1000 pieces.' },
        { q: 'Can I customize envelope sizes?', a: 'Yes. We support various international standard sizes and fully custom sizes.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Rush 3-day service available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に500個から。カラー素材は1000個から。' },
        { q: '封筒のサイズカスタマイズは可能？', a: 'はい。各種国際標準サイズと完全カスタムサイズに対応しています。' },
        { q: '納期は？', a: '標準5〜7営業日。急行3日対応も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認信封尺寸、紙張和印刷設計。' },
        { name: '印刷', text: '進行四色印刷或專色印刷。' },
        { name: '模切壓痕', text: '使用刀模進行模切和壓痕。' },
        { name: '摺疊粘合', text: '將紙張摺疊成信封形並粘合。' },
        { name: '質檢包裝', text: '檢查尺寸和粘合牢固度，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm envelope size, paper, and printing design.' },
        { name: 'Printing', text: 'Four-color or spot color printing.' },
        { name: 'Die Cutting & Creasing', text: 'Die cut and crease using the die.' },
        { name: 'Folding & Gluing', text: 'Fold paper into envelope shape and glue.' },
        { name: 'QC & Packaging', text: 'Check dimensions and glue adhesion before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '封筒のサイズ、用紙、印刷デザインを確認します。' },
        { name: '印刷', text: '4色印刷または専色印刷を行います。' },
        { name: 'ダイカット・圧線', text: 'ダイを使用してカットと圧線を行います。' },
        { name: '折り畳み・接着', text: '紙を封筒の形に折り畳み、接着します。' },
        { name: '品質検査・梱包', text: '寸法と接着強度を検査し、出荷します。' },
      ],
    },
  },
  'pearl-envelopes': {
    slug: 'pearl-envelopes',
    keywords: {
      'zh-hk': '珠光信封印刷,珍珠紙信封,珠光紙信封,閃亮信封,高貴信封印刷,珠光信封訂造,珠光信封設計,珠光信封香港,珠光信封報價,珠光信封速印,珠光信封少量印刷,喜帖信封,邀請函信封',
      'en': 'pearl envelope printing,pearl paper envelopes,shimmer envelopes,luxury pearl envelopes,metallic pearl envelopes,pearl envelope design,pearl envelopes hong kong,pearl envelope quote,pearl envelope printing service,pearl finish envelopes,wedding invitation envelopes',
      'ja': 'パール封筒印刷,パール紙封筒,キラキラ封筒,高級パール封筒,メタリックパール封筒,パール封筒デザイン,パール封筒香港,パール封筒見積もり,パール封筒印刷サービス',
    },
    h1Suffix: {
      'zh-hk': '專業珠光信封服務 | 智印港',
      en: 'Professional Pearl Envelopes | ZprintPro',
      ja: 'プロパール封筒 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '珠光紙張，閃耀質感。適合婚禮邀請、高端活動。智印港提供專業的珠光信封服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Pearl paper, shimmering quality. Perfect for wedding invitations, high-end events. ZprintPro offers professional Pearl Envelopes services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: 'パール紙、輝く質感。結婚式の招待状、高級イベントに最適。 ZprintProは高品質な素材と先進的な印刷技術を使用したパール封筒サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '信封的最小訂購量是多少？', a: '一般為500個起訂，彩色和特殊材質需1000個起。' },
        { q: '可以定制信封的尺寸嗎？', a: '可以。我們支持各種國際標準尺寸和完全定制尺寸。' },
        { q: '信封的交貨時間？', a: '標準5-7個工作日。急件可安排3日快印。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 500 pieces minimum. Colored and specialty materials require 1000 pieces.' },
        { q: 'Can I customize envelope sizes?', a: 'Yes. We support various international standard sizes and fully custom sizes.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Rush 3-day service available.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に500個から。カラー素材は1000個から。' },
        { q: '封筒のサイズカスタマイズは可能？', a: 'はい。各種国際標準サイズと完全カスタムサイズに対応しています。' },
        { q: '納期は？', a: '標準5〜7営業日。急行3日対応も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認信封尺寸、紙張和印刷設計。' },
        { name: '印刷', text: '進行四色印刷或專色印刷。' },
        { name: '模切壓痕', text: '使用刀模進行模切和壓痕。' },
        { name: '摺疊粘合', text: '將紙張摺疊成信封形並粘合。' },
        { name: '質檢包裝', text: '檢查尺寸和粘合牢固度，合格後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm envelope size, paper, and printing design.' },
        { name: 'Printing', text: 'Four-color or spot color printing.' },
        { name: 'Die Cutting & Creasing', text: 'Die cut and crease using the die.' },
        { name: 'Folding & Gluing', text: 'Fold paper into envelope shape and glue.' },
        { name: 'QC & Packaging', text: 'Check dimensions and glue adhesion before shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: '封筒のサイズ、用紙、印刷デザインを確認します。' },
        { name: '印刷', text: '4色印刷または専色印刷を行います。' },
        { name: 'ダイカット・圧線', text: 'ダイを使用してカットと圧線を行います。' },
        { name: '折り畳み・接着', text: '紙を封筒の形に折り畳み、接着します。' },
        { name: '品質検査・梱包', text: '寸法と接着強度を検査し、出荷します。' },
      ],
    },
  },
  'exercise-books': {
    slug: 'exercise-books',
    keywords: {
      'zh-hk': '練習簿印刷,學生練習簿,作業簿印刷,學校簿册,練習簿訂造,練習簿設計,練習簿香港,練習簿報價,練習簿速印,練習簿少量印刷,印刷練習簿,定制練習簿,學校練習簿',
      'en': 'exercise book printing,student exercise books,workbook printing,school exercise books,custom exercise books,exercise book design,exercise books hong kong,exercise book quote,exercise book printing service,printed exercise books,school workbooks',
      'ja': '練習帳印刷,生徒用練習帳,ワークブック印刷,学校用練習帳,カスタム練習帳,練習帳デザイン,練習帳香港,練習帳見積もり,練習帳印刷サービス,学校ワークブック',
    },
    h1Suffix: {
      'zh-hk': '專業作業簿印刷服務 | 智印港',
      en: 'Professional Exercise Books | ZprintPro',
      ja: 'プロワークブック印刷 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '學校作業簿，可定制封面和內頁格式，支持印刷即日速遞送貨。適合中小學、補習社。智印港提供專業的作業簿印刷服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'School exercise books, customizable cover and inner page formats. Perfect for schools. ZprintPro offers professional Exercise Books services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '学校のワークブック、カスタマイズ可能な表紙と内側ページ形式。小中校、塾に最適。 ZprintProは高品質な素材と先進的な印刷技術を使用したワークブック印刷サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '校園印刷的最小訂購量是多少？', a: '一般為100本/張起訂，學校批量訂單可享受優惠價格。' },
        { q: '支持學校採購流程嗎？', a: '支持。我們提供報價單、發票和送貨單，符合學校採購要求。' },
        { q: '校園印刷的交貨時間？', a: '標準5-7個工作日。開學季為旺季，建議提前預訂。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 books/sheets minimum. School bulk orders enjoy discounted pricing.' },
        { q: 'Do you support school procurement processes?', a: 'Yes. We provide quotations, invoices, and delivery notes meeting school requirements.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Back-to-school season is peak, advance booking recommended.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100冊/枚から。学校の大口注文は特別価格が適用されます。' },
        { q: '学校の調達プロセスに対応していますか？', a: 'はい。見積書、領収書、納品書を発行し、学校の調達要件を満たしています。' },
        { q: '納期は？', a: '標準5〜7営業日。新学期前は繁忙期なので事前予約を推奨します。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認作業簿/證書的尺寸、內容和設計稿。' },
        { name: '印刷生產', text: '使用專業印刷機進行印刷。' },
        { name: '表面處理', text: '可選啞膠、光膠或過膠等工藝。' },
        { name: '裁切/裝訂', text: '精密裁切並進行裝訂（如適用）。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm exercise book/certificate size, content, and design.' },
        { name: 'Printing', text: 'Professional printing using appropriate equipment.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or lamination.' },
        { name: 'Cutting/Binding', text: 'Precision cutting and binding (if applicable).' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'ノート/証明書のサイズ、内容、デザインを確認します。' },
        { name: '印刷', text: '適切な設備を使用したプロ印刷。' },
        { name: '表面加工', text: 'マット、グロス、またはラミネーション加工を選択します。' },
        { name: '裁断・綴じ', text: '精密裁断と綴じ（該当する場合）を行います。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'certificates': {
    slug: 'certificates',
    keywords: {
      'zh-hk': '證書印刷,畢業證書,獎狀印刷,榮譽證書,結業證書,證書制作,證書訂造,證書設計,證書香港,證書報價,證書速印,證書少量印刷,學校證書,公司證書',
      'en': 'certificate printing,graduation certificates,award certificates,honor certificates,completion certificates,certificate design,certificates hong kong,certificate quote,certificate printing service,custom certificates,school certificates,diploma printing',
      'ja': '賞状印刷,卒業証書,表彰状,栄誉賞状,修了証書,賞状デザイン,賞状香港,賞状見積もり,賞状印刷サービス,オーダーメイド賞状,学校賞状,卒業証書印刷',
    },
    h1Suffix: {
      'zh-hk': '專業證書印刷服務 | 智印港',
      en: 'Professional Certificates | ZprintPro',
      ja: 'プロ賞状印刷 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '精美證書，配合燙金、壓紋等工藝，支持印刷即日速遞送貨。畢業證書、獎狀、資格證明。智印港提供專業的證書印刷服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Exquisite certificates with foil stamping, embossing and other processes. ZprintPro offers professional Certificates services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '精巧な賞状、箔押し・エンボスなどの加工付き。卒業証書、賞状、資格証明。 ZprintProは高品質な素材と先進的な印刷技術を使用した賞状印刷サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '校園印刷的最小訂購量是多少？', a: '一般為100本/張起訂，學校批量訂單可享受優惠價格。' },
        { q: '支持學校採購流程嗎？', a: '支持。我們提供報價單、發票和送貨單，符合學校採購要求。' },
        { q: '校園印刷的交貨時間？', a: '標準5-7個工作日。開學季為旺季，建議提前預訂。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 books/sheets minimum. School bulk orders enjoy discounted pricing.' },
        { q: 'Do you support school procurement processes?', a: 'Yes. We provide quotations, invoices, and delivery notes meeting school requirements.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Back-to-school season is peak, advance booking recommended.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100冊/枚から。学校の大口注文は特別価格が適用されます。' },
        { q: '学校の調達プロセスに対応していますか？', a: 'はい。見積書、領収書、納品書を発行し、学校の調達要件を満たしています。' },
        { q: '納期は？', a: '標準5〜7営業日。新学期前は繁忙期なので事前予約を推奨します。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認作業簿/證書的尺寸、內容和設計稿。' },
        { name: '印刷生產', text: '使用專業印刷機進行印刷。' },
        { name: '表面處理', text: '可選啞膠、光膠或過膠等工藝。' },
        { name: '裁切/裝訂', text: '精密裁切並進行裝訂（如適用）。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm exercise book/certificate size, content, and design.' },
        { name: 'Printing', text: 'Professional printing using appropriate equipment.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or lamination.' },
        { name: 'Cutting/Binding', text: 'Precision cutting and binding (if applicable).' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'ノート/証明書のサイズ、内容、デザインを確認します。' },
        { name: '印刷', text: '適切な設備を使用したプロ印刷。' },
        { name: '表面加工', text: 'マット、グロス、またはラミネーション加工を選択します。' },
        { name: '裁断・綴じ', text: '精密裁断と綴じ（該当する場合）を行います。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'school-flyers': {
    slug: 'school-flyers',
    keywords: {
      'zh-hk': '學校單張印刷,學校宣傳單張,教育機構傳單,招生單張,校園宣傳單,學校活動傳單,學校單張設計,學校單張香港,學校單張報價,學校單張速印,學校單張少量印刷,補習社傳單,學校通告印刷',
      'en': 'school flyer printing,school flyers,educational flyers,student recruitment flyers,campus flyers,school event flyers,school flyer design,school flyers hong kong,school flyer quote,school flyer printing service,tuition center flyers,school notice printing',
      'ja': '学校チラシ印刷,学校案内チラシ,教育機関チラシ,生徒募集チラシ,キャンパスチラシ,学校イベントチラシ,学校チラシデザイン,学校チラシ香港,学校チラシ見積もり',
    },
    h1Suffix: {
      'zh-hk': '專業學校單張服務 | 智印港',
      en: 'Professional School Flyers | ZprintPro',
      ja: 'プロ学校チラシ | ZprintPro',
    },
    longDescription: {
      'zh-hk': '學校通告、活動宣傳單張。經濟實惠，大量印刷。智印港提供專業的學校單張服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'School notices, event promotional flyers. Economical, bulk printing. ZprintPro offers professional School Flyers services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '学校の通知、イベント宣伝チラシ。経済的、大量印刷。 ZprintProは高品質な素材と先進的な印刷技術を使用した学校チラシサービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '校園印刷的最小訂購量是多少？', a: '一般為100本/張起訂，學校批量訂單可享受優惠價格。' },
        { q: '支持學校採購流程嗎？', a: '支持。我們提供報價單、發票和送貨單，符合學校採購要求。' },
        { q: '校園印刷的交貨時間？', a: '標準5-7個工作日。開學季為旺季，建議提前預訂。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 books/sheets minimum. School bulk orders enjoy discounted pricing.' },
        { q: 'Do you support school procurement processes?', a: 'Yes. We provide quotations, invoices, and delivery notes meeting school requirements.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Back-to-school season is peak, advance booking recommended.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100冊/枚から。学校の大口注文は特別価格が適用されます。' },
        { q: '学校の調達プロセスに対応していますか？', a: 'はい。見積書、領収書、納品書を発行し、学校の調達要件を満たしています。' },
        { q: '納期は？', a: '標準5〜7営業日。新学期前は繁忙期なので事前予約を推奨します。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認作業簿/證書的尺寸、內容和設計稿。' },
        { name: '印刷生產', text: '使用專業印刷機進行印刷。' },
        { name: '表面處理', text: '可選啞膠、光膠或過膠等工藝。' },
        { name: '裁切/裝訂', text: '精密裁切並進行裝訂（如適用）。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm exercise book/certificate size, content, and design.' },
        { name: 'Printing', text: 'Professional printing using appropriate equipment.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or lamination.' },
        { name: 'Cutting/Binding', text: 'Precision cutting and binding (if applicable).' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'ノート/証明書のサイズ、内容、デザインを確認します。' },
        { name: '印刷', text: '適切な設備を使用したプロ印刷。' },
        { name: '表面加工', text: 'マット、グロス、またはラミネーション加工を選択します。' },
        { name: '裁断・綴じ', text: '精密裁断と綴じ（該当する場合）を行います。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
  'textbooks': {
    slug: 'textbooks',
    keywords: {
      'zh-hk': '課本印刷,教科書印刷,教材印刷,學校課本,課本制作,課本訂造,課本設計,課本香港,課本報價,課本速印,課本少量印刷,印刷課本,定制課本,補充練習印刷',
      'en': 'textbook printing,school textbook printing,educational material printing,custom textbooks,textbook design,textbooks hong kong,textbook quote,textbook printing service,printed textbooks,workbook printing,supplementary exercise printing',
      'ja': '教科書印刷,学校教科書印刷,教材印刷,カスタム教科書,教科書デザイン,教科書香港,教科書見積もり,教科書印刷サービス,ワークブック印刷,補助教材印刷',
    },
    h1Suffix: {
      'zh-hk': '專業教科書印刷服務 | 智印港',
      en: 'Professional Textbooks | ZprintPro',
      ja: 'プロ教科書印刷 | ZprintPro',
    },
    longDescription: {
      'zh-hk': '教材、教科書印刷。專業排版，品質保證。智印港提供專業的教科書印刷服務，採用高品質材料和先進印刷技術，確保每一件產品都達到最高標準。我們支持靈活起訂量和快速交貨，滿足香港企業的各種印刷需求。',
      en: 'Teaching materials, textbook printing. Professional typesetting, quality guaranteed. ZprintPro offers professional Textbooks services using high-quality materials and advanced printing technology. We support flexible minimum orders and fast delivery to meet the needs of Hong Kong businesses.',
      ja: '教材、教科書の印刷。プロの組版、品質保証。 ZprintProは高品質な素材と先進的な印刷技術を使用した教科書印刷サービスを提供しています。柔軟な最小発注数と迅速な納品で、香港企業の様々な印刷ニーズにお応えします。',
    },
    faq: {
      'zh-hk': [
        { q: '校園印刷的最小訂購量是多少？', a: '一般為100本/張起訂，學校批量訂單可享受優惠價格。' },
        { q: '支持學校採購流程嗎？', a: '支持。我們提供報價單、發票和送貨單，符合學校採購要求。' },
        { q: '校園印刷的交貨時間？', a: '標準5-7個工作日。開學季為旺季，建議提前預訂。' },
      ],
      'en': [
        { q: 'What is the minimum order quantity?', a: 'Generally 100 books/sheets minimum. School bulk orders enjoy discounted pricing.' },
        { q: 'Do you support school procurement processes?', a: 'Yes. We provide quotations, invoices, and delivery notes meeting school requirements.' },
        { q: 'What is the delivery time?', a: 'Standard 5-7 business days. Back-to-school season is peak, advance booking recommended.' },
      ],
      'ja': [
        { q: '最小発注数は？', a: '一般的に100冊/枚から。学校の大口注文は特別価格が適用されます。' },
        { q: '学校の調達プロセスに対応していますか？', a: 'はい。見積書、領収書、納品書を発行し、学校の調達要件を満たしています。' },
        { q: '納期は？', a: '標準5〜7営業日。新学期前は繁忙期なので事前予約を推奨します。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認作業簿/證書的尺寸、內容和設計稿。' },
        { name: '印刷生產', text: '使用專業印刷機進行印刷。' },
        { name: '表面處理', text: '可選啞膠、光膠或過膠等工藝。' },
        { name: '裁切/裝訂', text: '精密裁切並進行裝訂（如適用）。' },
        { name: '質檢包裝', text: 'QC檢驗後包裝出貨。' },
      ],
      'en': [
        { name: 'Design Review', text: 'Confirm exercise book/certificate size, content, and design.' },
        { name: 'Printing', text: 'Professional printing using appropriate equipment.' },
        { name: 'Surface Finishing', text: 'Optional matte, glossy, or lamination.' },
        { name: 'Cutting/Binding', text: 'Precision cutting and binding (if applicable).' },
        { name: 'QC & Packaging', text: 'Quality inspection before packaging and shipping.' },
      ],
      'ja': [
        { name: 'デザイン確認', text: 'ノート/証明書のサイズ、内容、デザインを確認します。' },
        { name: '印刷', text: '適切な設備を使用したプロ印刷。' },
        { name: '表面加工', text: 'マット、グロス、またはラミネーション加工を選択します。' },
        { name: '裁断・綴じ', text: '精密裁断と綴じ（該当する場合）を行います。' },
        { name: '品質検査・梱包', text: '品質検査後に梱包出荷します。' },
      ],
    },
  },
};

export function getProductSeo(slug: string): ProductSeoData | undefined {
  return allProductSeo[slug];
}
