/**
 * 核心产品 SEO 数据
 * 包含 FAQ、长描述、关键词、印刷流程等 E-E-A-T 内容
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
}

export const coreProductSeo: Record<string, ProductSeoData> = {
  'premium-business-cards': {
    slug: 'premium-business-cards',
    keywords: {
      'zh-hk': '名片印刷,香港名片,商務名片定制,快印名片,咭片印刷',
      en: 'business card printing Hong Kong, premium business cards, custom name cards, rush business cards',
      ja: '名刺印刷,香港名刺,高級名刺,オーダーメイド名刺,急ぎ名刺',
    },
    h1Suffix: {
      'zh-hk': '香港頂級商務名片定制專家',
      en: 'Premium Business Card Printing Hong Kong',
      ja: '香港高級名刺印刷のプロ',
    },
    longDescription: {
      'zh-hk': `在競爭激烈的香港商業環境中，一張質感非凡的名片是您品牌的第一張臉。智印港深知這一點，因此我們提供多種高級紙張選擇，包括350gsm的剛古紙、觸感細膩的荷蘭白卡以及奢華的棉絨紙。我們的名片印刷服務不僅注重材質，更在工藝上精益求精。無論是彰顯尊貴的燙金工藝，還是增加立體觸感的局部UV，我們都能為您完美呈現。此外，我們理解時間就是金錢，因此特別推出24小時快印服務，確保您的急單也能準時交付。`,
      en: `In Hong Kong's competitive business environment, a premium business card is your brand's first impression. ZprintPro offers a wide range of high-quality paper options including 350gsm Conqueror paper, Dutch white card with delicate texture, and luxurious cotton paper. Our business card printing service focuses not only on material quality but also on exquisite craftsmanship. Whether it's foil stamping that exudes luxury or spot UV that adds dimensional texture, we deliver perfection. We also offer 24-hour rush printing because we understand that time is money.`,
      ja: `香港の競争激しいビジネス環境において、高品質な名刺はブランドの第一印象です。ZprintProは350gsmのコンカラー紙、繊細な質感のオランダ白カード、豪華なコットン紙など、多様な高級紙をご用意しています。名刺印刷サービスは素材の品質だけでなく、精巧な職人技にもこだわっています。格式高い箔押し加工や、立体的な触感を追加する局部UVも完璧にお届けします。`,
    },
    faq: {
      'zh-hk': [
        { q: '名片印刷的起訂量是多少？', a: '我們支持靈活起訂，最低僅需100張。對於數碼打樣，我們也提供50張的小量服務，讓您在大批量印刷前確認效果。' },
        { q: '名片印刷需要多長時間？', a: '標準交貨時間為3-5個工作日。如需急件，可選擇24小時快印服務（需額外費用）。' },
        { q: '你們支持哪些紙張材質？', a: '我們提供300g銅版紙、350g剛古紙、荷蘭白卡、棉紙、合成紙等多種材質，滿足不同檔次需求。' },
        { q: '名片設計文件有什麼要求？', a: '請提供AI、PSD、PDF或高解析度JPG/PNG文件，解析度至少300dpi，並預留3mm出血位。' },
      ],
      en: [
        { q: 'What is the minimum order quantity for business cards?', a: 'We support flexible ordering with a minimum of just 100 cards. For digital proofing, we also offer a small batch of 50 cards so you can verify the quality before bulk printing.' },
        { q: 'How long does business card printing take?', a: 'Standard delivery is 3-5 business days. For rush orders, we offer 24-hour express printing (additional fees apply).' },
        { q: 'What paper materials do you support?', a: 'We offer 300g glossy art paper, 350g Conqueror paper, Dutch white card, cotton paper, synthetic paper, and more to meet different quality needs.' },
        { q: 'What are the design file requirements?', a: 'Please provide AI, PSD, PDF, or high-resolution JPG/PNG files at 300dpi minimum, with 3mm bleed area.' },
      ],
      ja: [
        { q: '名刺印刷の最小発注数は？', a: '柔軟な発注に対応しており、最低100枚から承ります。デジタル校正用に50枚の少量サービスもご用意しています。' },
        { q: '名刺印刷の納期は？', a: '標準納期は3〜5営業日です。急ぎの場合は24時間急行印刷も可能です（追加料金がかかります）。' },
        { q: '対応している紙の種類は？', a: '300gコート紙、350gコンカラー紙、オランダ白カード、コットン紙、合成紙など、様々な紙質をご用意しています。' },
        { q: 'デザインファイルの要件は？', a: 'AI、PSD、PDF、または高解像度JPG/PNG（最低300dpi）をご用意ください。3mmの bleed（裁ち落とし）を含めてください。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '客戶提供設計稿，我們的專業團隊進行文件檢查，確保色彩模式和解析度符合印刷標準。' },
        { name: '數碼打樣', text: '根據需求提供數碼樣或傳統打樣，讓客戶在批量生產前確認顏色和效果。' },
        { name: '印刷生產', text: '採用德國海德堡印刷機進行四色印刷，配合專業色彩管理，確保色彩準確還原。' },
        { name: '表面處理', text: '根據選擇的工藝進行啞膠、光膠、局部UV或燙金等表面處理。' },
        { name: '裁切成品', text: '使用精密裁切設備，確保每張名片尺寸精準，邊緣整齊。' },
        { name: '質檢包裝', text: '每批產品經過QC檢驗後，使用專用包裝盒保護，確保運輸過程中不受損。' },
      ],
      en: [
        { name: 'Design Review', text: 'Our professional team checks your design files to ensure color mode and resolution meet printing standards.' },
        { name: 'Digital Proofing', text: 'We provide digital or traditional proofing based on your needs, allowing you to confirm colors and effects before mass production.' },
        { name: 'Printing Production', text: 'Using Heidelberg presses with professional color management to ensure accurate color reproduction.' },
        { name: 'Surface Finishing', text: 'Matte lamination, glossy lamination, spot UV, or foil stamping based on your selected process.' },
        { name: 'Precision Cutting', text: 'Precision cutting equipment ensures accurate dimensions and clean edges for every card.' },
        { name: 'QC & Packaging', text: 'Each batch undergoes QC inspection before being packed in protective boxes for safe transport.' },
      ],
      ja: [
        { name: 'デザイン確認', text: 'お客様のデザインデータを専門チームがチェックし、カラーモードと解像度が印刷基準を満たしているか確認します。' },
        { name: 'デジタル校正', text: 'ご要望に応じてデジタル校正または伝統的な校正を提供し、量産前に色と効果を確認できます。' },
        { name: '印刷生産', text: 'ハイデルベルグ印刷機とプロのカラーマネジメントを使用し、正確な色再現を実現します。' },
        { name: '表面加工', text: 'マットラミネーション、グロスラミネーション、局部UV、箔押しなど、選択された加工を施します。' },
        { name: '精密裁断', text: '精密裁断設備により、各名刺の寸法と端の仕上がりを正確に保証します。' },
        { name: '品質検査・梱包', text: '全ロットをQC検査後、専用箱に梱包し、輸送中の損傷を防ぎます。' },
      ],
    },
    relatedBlogSlug: 'business-card-design',
  },
  'foil-business-cards': {
    slug: 'foil-business-cards',
    keywords: {
      'zh-hk': '燙金名片,金屬色名片,奢華名片,燙印工藝,香港燙金',
      en: 'foil stamped business cards, metallic business cards, luxury name cards, gold foil printing Hong Kong',
      ja: '箔押し名刺,メタリック名刺,高級名刺,ゴールド foil,香港 箔押し',
    },
    h1Suffix: {
      'zh-hk': '奢華燙金名片定制服務',
      en: 'Luxury Foil Stamped Business Cards',
      ja: '豪華箔押し名刺印刷',
    },
    longDescription: {
      'zh-hk': `想要在众多名片中脱颖而出？燙金工藝是您的不二之選。這種傳統的凸版印刷工藝，通過高溫將金屬箔壓印在紙張表面，形成強烈的凹凸質感。在香港，無論是律師樓、會計師事務所還是高端地產代理，都偏愛使用燙金名片來展示其專業與權威。智印港提供專業的燙金服務，無論是單面燙金還是雙面燙金，我們都能精準對位，確保每一處細節都完美無瑕。`,
      en: `Want to stand out from the crowd? Foil stamping is your best choice. This traditional letterpress technique uses heat to press metallic foil onto paper, creating a strong embossed texture. In Hong Kong, law firms, accounting practices, and high-end real estate agencies all prefer foil-stamped business cards to showcase their professionalism and authority. ZprintPro offers expert foil stamping services with precise registration for single-sided or double-sided applications.`,
      ja: `群衆の中で目立ちたいですか？箔押し加工が最適です。この伝統的な活版印刷技法は、熱で金属箔を紙に圧着し、強い凹凸の質感を生み出します。香港では、法律事務所、会計事務所、高級不動産代理店などが、専門性と権威を示すために箔押し名刺を好んで使用しています。`,
    },
    faq: {
      'zh-hk': [
        { q: '燙金工藝有幾種顏色可選？', a: '除了經典的亮金和亮銀，我們還提供啞金、紅金、古銅色以及各種Pantone專色電化鋁，滿足您品牌的特定色調需求。' },
        { q: '燙金名片可以燙雙面嗎？', a: '可以。我們支持單面燙金、雙面燙金，以及正面燙金+背面燙銀的組合效果。' },
        { q: '燙金名片的紙張有什麼要求？', a: '建議使用350g以上的厚紙，表面平滑度高的紙張燙金效果更好。我們推薦剛古紙或荷蘭白卡。' },
        { q: '燙金名片的交貨時間？', a: '燙金工藝需要額外製版時間，標準交貨為5-7個工作日。急件可安排3日快印。' },
      ],
      en: [
        { q: 'How many foil colors are available?', a: 'Besides classic bright gold and silver, we also offer matte gold, rose gold, bronze, and various Pantone spot color foils to match your brand colors.' },
        { q: 'Can foil stamping be done on both sides?', a: 'Yes. We support single-sided, double-sided foil stamping, and combinations like gold front + silver back.' },
        { q: 'What paper requirements are there for foil cards?', a: 'We recommend 350gsm+ thick paper with smooth surface for best foil results. Conqueror paper or Dutch white card are ideal.' },
        { q: 'What is the delivery time for foil business cards?', a: 'Foil stamping requires additional plate-making time. Standard delivery is 5-7 business days. Rush orders available in 3 days.' },
      ],
      ja: [
        { q: '箔押しの色は何種類ありますか？', a: '定番の輝く金・銀の他、マットゴールド、ローズゴールド、ブロンズ、各種Pantone専色箔もご用意しています。' },
        { q: '両面箔押しは可能ですか？', a: 'はい。片面箔押し、両面箔押し、表金・裏銀の組み合わせにも対応しています。' },
        { q: '箔押し名刺の紙の要件は？', a: '350g以上の厚紙で、表面が滑らかな紙が最適です。コンカラー紙やオランダ白カードを推奨します。' },
        { q: '箔押し名刺の納期は？', a: '版作成に追加時間が必要で、標準納期は5〜7営業日です。急行注文は3日対応可能です。' },
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
      en: [
        { name: 'Design Review', text: 'Confirm foil placement, pattern, and color. Create dedicated foil stamping plate.' },
        { name: 'Plate Making', text: 'Create high-precision copper foil stamping plate based on design.' },
        { name: 'Test Stamping', text: 'Conduct test stamping, adjust temperature and pressure for perfect results.' },
        { name: 'Bulk Production', text: 'Use automatic foil stamping machine for bulk production with precise registration.' },
        { name: 'QC & Packaging', text: 'Inspect foil adhesion and gloss, then package for delivery.' },
      ],
      ja: [
        { name: 'デザイン確認', text: '箔押し位置、パターン、色を確認し、専用の箔押し版を作成します。' },
        { name: '版作成', text: 'デザインに基づき高精度の銅箔押し版を作成します。' },
        { name: '試し押し', text: '試し押しを行い、温度と圧力を調整して完璧な効果を実現します。' },
        { name: '量産', text: '自動箔押し機で量産し、各枚を精密に位置合わせします。' },
        { name: '品質検査・梱包', text: '箔の密着性と光沢を検査し、合格後に梱包出荷します。' },
      ],
    },
    relatedBlogSlug: 'business-card-design',
  },
  'spot-uv-business-cards': {
    slug: 'spot-uv-business-cards',
    keywords: {
      'zh-hk': '局部UV名片,凸字名片,紋理名片,特殊工藝名片,光油名片',
      en: 'spot UV business cards, embossed business cards, textured name cards, special finish cards',
      ja: '局部UV名刺,エンボス名刺,テクスチャ名刺,特殊加工名刺',
    },
    h1Suffix: {
      'zh-hk': '創意局部UV名片設計',
      en: 'Creative Spot UV Business Cards',
      ja: 'クリエイティブ局部UV名刺',
    },
    longDescription: {
      'zh-hk': `局部UV（Spot UV）是一種極具現代感的印刷工藝。它通過在名片的特定圖案（如Logo、邊框或文字）上覆蓋一層透明的高光油墨，使其在啞面底紙上形成鮮明的對比。這種工藝不僅增加了名片的視覺層次感，更帶來了獨特的指尖觸感。在香港的創意設計、時尚品牌和科技初創公司中，局部UV名片非常流行。智印港擁有先進的過油機，確保UV塗層均勻、不粘花，為您打造極具設計感的商務名片。`,
      en: `Spot UV is a highly modern printing technique. By applying a transparent glossy coating to specific areas of the business card (such as logos, borders, or text), it creates striking contrast against a matte background. This process not only adds visual depth but also provides a unique tactile experience. Spot UV business cards are very popular among creative design studios, fashion brands, and tech startups in Hong Kong. ZprintPro uses advanced coating machines to ensure uniform UV application without sticking.`,
      ja: `局部UVは非常にモダンな印刷技法です。名刺の特定の部分（ロゴ、枠線、文字など）に透明な光沢コーティングを施し、マットな背景と鮮やかなコントラストを生み出します。視覚的な奥行きを加えるだけでなく、独特の触覚体験も提供します。`,
    },
    faq: {
      'zh-hk': [
        { q: '局部UV會很容易刮花嗎？', a: '優質的局部UV塗層經過紫外線固化，硬度非常高，耐磨性極佳。只要不是刻意用尖銳物體刮擦，日常使用中非常耐用。' },
        { q: '局部UV可以和其他工藝同時使用嗎？', a: '可以。局部UV經常與啞膠、燙金等工藝搭配使用，創造更豐富的視覺效果。' },
        { q: '局部UV的設計有什麼注意事項？', a: '局部UV區域建議不要太細小（最小0.5mm），否則可能影響效果。建議與大面積啞面形成對比。' },
      ],
      en: [
        { q: 'Is spot UV easily scratched?', a: 'High-quality spot UV coating is cured with ultraviolet light, making it very hard and wear-resistant. It is highly durable in daily use unless deliberately scratched with sharp objects.' },
        { q: 'Can spot UV be combined with other finishes?', a: 'Yes. Spot UV is often combined with matte lamination, foil stamping, and other processes for richer visual effects.' },
        { q: 'What are the design considerations for spot UV?', a: 'Spot UV areas should not be too small (minimum 0.5mm) as it may affect the result. It works best when contrasting with large matte areas.' },
      ],
      ja: [
        { q: '局部UVは傷つきやすいですか？', a: '高品質の局部UVコーティングは紫外線硬化により非常に硬く、耐摩耗性に優れています。' },
        { q: '他の加工と組み合わせられますか？', a: 'はい。局部UVはマットラミネーションや箔押しなどと組み合わせて使用することが一般的です。' },
        { q: 'デザイン上の注意点は？', a: '局部UV部分はあまり細かくしないよう（最小0.5mm）、大きなマット面との対比が効果的です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '印刷底紋', text: '先印刷名片的底色和圖案，通常使用啞面處理。' },
        { name: 'UV版製作', text: '根據需要上UV的區域製作專用UV版。' },
        { name: '局部上光', text: '在指定區域精準塗布UV光油，形成高光效果。' },
        { name: '紫外線固化', text: '通過UV燈照射，使光油瞬間固化，形成耐磨塗層。' },
        { name: '質檢', text: '檢查UV層均勻度和光澤度，確保無氣泡、不粘花。' },
      ],
      en: [
        { name: 'Base Printing', text: 'Print the base color and pattern of the card, usually with matte finish.' },
        { name: 'UV Plate Making', text: 'Create dedicated UV plate for areas requiring gloss coating.' },
        { name: 'Spot Coating', text: 'Precisely apply UV varnish to designated areas for glossy effect.' },
        { name: 'UV Curing', text: 'Instant curing via UV lamp exposure, creating a wear-resistant coating.' },
        { name: 'Quality Check', text: 'Inspect UV layer uniformity and gloss, ensuring no bubbles or sticking.' },
      ],
      ja: [
        { name: '下地印刷', text: '名刺の下地とパターンを印刷し、通常はマット仕上げにします。' },
        { name: 'UV版作成', text: '光沢コーティングが必要な領域用の専用UV版を作成します。' },
        { name: '局部コーティング', text: '指定領域にUVワニスを精密に塗布し、光沢効果を出します。' },
        { name: 'UV硬化', text: 'UVランプ照射によりワニスを瞬時に硬化させ、耐摩耗コーティングを形成します。' },
        { name: '品質検査', text: 'UV層の均一性と光沢を検査し、気泡やべたつきがないことを確認します。' },
      ],
    },
    relatedBlogSlug: 'business-card-design',
  },
  'rounded-corner-cards': {
    slug: 'rounded-corner-cards',
    keywords: {
      'zh-hk': '圓角名片,安全名片,創意名片,異形切割,香港名片',
      en: 'rounded corner business cards, safe edge cards, creative name cards, die cut cards',
      ja: '丸角名刺,安全名刺,クリエイティブ名刺,ダイカット名刺',
    },
    h1Suffix: {
      'zh-hk': '時尚圓角名片定制',
      en: 'Stylish Rounded Corner Business Cards',
      ja: 'スタイリッシュ丸角名刺',
    },
    longDescription: {
      'zh-hk': `圓角名片（Rounded Corner Cards）在香港越來越受歡迎，它打破了傳統直角名片的刻板印象。圓潤的邊角不僅在視覺上顯得更加親和、現代，而且在實際使用中，圓角名片更不容易刮傷其他卡片或錢包內襯，拿在手裡也更加舒適。這種設計特別適合注重用戶體驗的品牌，如瑜伽工作室、兒童教育機構、精品咖啡店以及各類設計工作室。智印港提供標準圓角和大圓角（Fillet）兩種選擇，配合高品質紙張，讓您的品牌更具人情味。`,
      en: `Rounded corner business cards are gaining popularity in Hong Kong, breaking away from the rigid impression of traditional right-angle cards. The smooth edges not only look more approachable and modern visually, but are also less likely to scratch other cards or wallet linings in practical use, making them more comfortable to hold. This design is especially suitable for brands that prioritize user experience, such as yoga studios, children's education centers, boutique coffee shops, and design studios. ZprintPro offers standard and large fillet corner options paired with high-quality paper.`,
      ja: `丸角名刺は香港で人気が高まっており、従来の直角名刺の硬い印象を打ち破ります。滑らかな角は視覚的に親しみやすくモダンに見えるだけでなく、実際の使用時に他の名刺や財布の裏地を傷つけにくく、持ちやすさも向上します。`,
    },
    faq: {
      'zh-hk': [
        { q: '圓角名片的最小圓角半徑是多少？', a: '我們標準的圓角半徑為2mm或3mm。如果您需要更大的圓角設計，我們也可以根據您的文件進行定制切割（Die-cut），但需注意過大的圓角可能會影響印刷機的傳輸。' },
        { q: '圓角名片可以搭配其他工藝嗎？', a: '當然可以。圓角設計可以與燙金、局部UV、啞膠等任何工藝自由組合。' },
        { q: '圓角名片的價格會更貴嗎？', a: '圓角切割需要額外的裁切工序，價格會比普通直角名片略高約10-15%，但帶來的品質提升絕對值得。' },
      ],
      en: [
        { q: 'What is the minimum corner radius?', a: 'Our standard corner radius is 2mm or 3mm. If you need larger corners, we can do custom die-cutting, but very large radii may affect machine handling.' },
        { q: 'Can rounded corners be combined with other finishes?', a: 'Absolutely. Rounded corners can be freely combined with foil stamping, spot UV, matte lamination, or any other process.' },
        { q: 'Are rounded corner cards more expensive?', a: 'Rounded corners require additional cutting steps, costing about 10-15% more than standard right-angle cards, but the quality improvement is well worth it.' },
      ],
      ja: [
        { q: '最小の丸角半径は？', a: '標準の丸角半径は2mmまたは3mmです。より大きな丸角が必要な場合はカスタムダイカットも可能です。' },
        { q: '他の加工と組み合わせられますか？', a: 'はい。丸角は箔押し、局部UV、マットラミネーションなどとの自由な組み合わせが可能です。' },
        { q: '丸角名刺は高くなりますか？', a: '追加の裁断工程が必要なため、標準の直角名刺より10〜15%高くなりますが、品質向上は十分に価値があります。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認圓角半徑和裁切位置。' },
        { name: '印刷生產', text: '進行四色印刷和表面處理。' },
        { name: '圓角裁切', text: '使用專用圓角刀模進行精準裁切。' },
        { name: '質檢包裝', text: '檢查圓角光滑度和尺寸精度。' },
      ],
      en: [
        { name: 'Design Review', text: 'Confirm corner radius and cutting positions.' },
        { name: 'Printing', text: 'Four-color printing and surface finishing.' },
        { name: 'Corner Cutting', text: 'Precision cutting with dedicated rounded corner die.' },
        { name: 'QC & Packaging', text: 'Inspect corner smoothness and dimensional accuracy.' },
      ],
      ja: [
        { name: 'デザイン確認', text: '丸角半径と裁断位置を確認します。' },
        { name: '印刷', text: '4色印刷と表面加工を行います。' },
        { name: '丸角裁断', text: '専用の丸角ダイで精密に裁断します。' },
        { name: '品質検査・梱包', text: '丸角の滑らかさと寸法精度を検査します。' },
      ],
    },
    relatedBlogSlug: 'business-card-design',
  },
  'waterproof-stickers': {
    slug: 'waterproof-stickers',
    keywords: {
      'zh-hk': '防水貼紙,耐用貼紙,戶外貼紙,食品標籤,香港貼紙印刷',
      en: 'waterproof stickers, durable labels, outdoor stickers, food labels, Hong Kong sticker printing',
      ja: '防水ステッカー,耐久ラベル,屋外ステッカー,食品ラベル,香港 ステッカー印刷',
    },
    h1Suffix: {
      'zh-hk': '專業防水貼紙印刷專家',
      en: 'Professional Waterproof Sticker Printing',
      ja: 'プロ防水ステッカー印刷',
    },
    longDescription: {
      'zh-hk': `防水貼紙是產品標籤和戶外宣傳的首選材質。採用合成紙或PET材質，配合防水膠水，能夠承受雨水浸泡、油污接觸和紫外線照射而不褪色、不脫落。在香港的潮濕氣候中，防水貼紙尤其重要。智印港的防水貼紙採用日本進口合成紙，膠水經過特殊配方處理，即使在冰櫃、浴室或戶外環境中也能長期保持粘性和色彩鮮豔。無論是食品包裝、化妝品標籤、電子產品貼紙還是戶外廣告，我們的防水貼紙都能完美勝任。`,
      en: `Waterproof stickers are the top choice for product labels and outdoor advertising. Made with synthetic paper or PET material and waterproof adhesive, they can withstand rain immersion, oil contact, and UV exposure without fading or peeling. In Hong Kong's humid climate, waterproof stickers are especially important. ZprintPro uses imported Japanese synthetic paper with specially formulated adhesive that maintains stickiness and color vibrancy even in refrigerators, bathrooms, or outdoor environments.`,
      ja: `防水ステッカーは製品ラベルや屋外広告の首选素材です。合成紙またはPET素材と防水接着剤を使用し、雨に浸かっても、油に触れても、紫外線に晒されても色褪せや剥がれがありません。`,
    },
    faq: {
      'zh-hk': [
        { q: '防水貼紙真的可以泡水嗎？', a: '是的，我們的防水貼紙採用合成紙+防水膠水，可承受短時間浸泡。適合冰櫃、浴室等潮濕環境使用。' },
        { q: '防水貼紙的最小訂購量是多少？', a: '一般為100張起訂，部分特殊工藝需500張起。' },
        { q: '防水貼紙可以模切成任意形狀嗎？', a: '可以。我們支持圓形、方形、異形等各種模切形狀，甚至複雜的鏤空設計。' },
        { q: '防水貼紙的交貨時間多久？', a: '標準3-5個工作日，急件可安排即日交貨。' },
      ],
      en: [
        { q: 'Can waterproof stickers really be submerged in water?', a: 'Yes. Our waterproof stickers use synthetic paper with waterproof adhesive and can withstand short-term immersion. Suitable for refrigerators, bathrooms, and other humid environments.' },
        { q: 'What is the minimum order quantity?', a: 'Generally 100 pieces minimum. Some special processes require 500 pieces.' },
        { q: 'Can waterproof stickers be die-cut into any shape?', a: 'Yes. We support circular, square, custom die-cut shapes, and even complex镂空 designs.' },
        { q: 'What is the delivery time?', a: 'Standard 3-5 business days. Rush same-day delivery available.' },
      ],
      ja: [
        { q: '防水ステッカーは本当に水に浸かっても大丈夫？', a: 'はい。合成紙と防水接着剤を使用しており、短時間の浸水に耐えられます。' },
        { q: '最小発注数は？', a: '一般的に100枚から。特殊加工の場合は500枚から。' },
        { q: '任意の形状にダイカットできますか？', a: 'はい。円形、方形、異形、複雑な镂空デザインも対応可能です。' },
        { q: '納期はどのくらい？', a: '標準3〜5営業日。急行の当日配送も可能です。' },
      ],
    },
    processSteps: {
      'zh-hk': [
        { name: '設計確認', text: '確認貼紙尺寸、形狀和設計稿。' },
        { name: '印刷生產', text: '使用耐水油墨進行四色印刷，確保色彩鮮豔持久。' },
        { name: '覆膜保護', text: '可選光膜或啞膜覆膜，增加耐磨性和防水性。' },
        { name: '模切成型', text: '使用激光刀模進行精準模切。' },
        { name: '質檢包裝', text: '進行防水測試和粘性測試，合格後包裝出貨。' },
      ],
      en: [
        { name: 'Design Review', text: 'Confirm sticker size, shape, and design files.' },
        { name: 'Printing', text: 'Four-color printing with water-resistant ink for long-lasting vibrant colors.' },
        { name: 'Lamination', text: 'Optional glossy or matte lamination for enhanced durability and water resistance.' },
        { name: 'Die Cutting', text: 'Precision die-cutting with laser die for accurate shapes.' },
        { name: 'QC & Packaging', text: 'Waterproof and adhesion testing before packaging and shipping.' },
      ],
      ja: [
        { name: 'デザイン確認', text: 'ステッカーのサイズ、形状、デザインデータを確認します。' },
        { name: '印刷', text: '耐水インクで4色印刷し、長持ちする鮮やかな色を実現します。' },
        { name: 'ラミネーション', text: 'グロスまたはマットラミネーションで耐久性と防水性を向上させます。' },
        { name: 'ダイカット', text: 'レーザーダイで精密に形状を裁断します。' },
        { name: '品質検査・梱包', text: '防水性と粘着性テストを実施し、合格後に梱包出荷します。' },
      ],
    },
    relatedBlogSlug: 'sticker-guide',
  },
};

export function getProductSeo(slug: string): ProductSeoData | undefined {
  return coreProductSeo[slug];
}
