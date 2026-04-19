/**
 * Category Pillar Content — SEO支柱内容组件
 * 为6大主营分类提供丰富的教育性内容，覆盖大词+中词+长尾词
 * 基于全球三大市场调研数据构建
 */

interface CategoryPillarContentProps {
  locale: string;
  categorySlug: string;
}

// 六大核心分类的Pillar Content数据
const pillarData: Record<string, {
  'zh-hk': { h2: string; paragraphs: string[]; faq: { q: string; a: string }[] };
  en: { h2: string; paragraphs: string[]; faq: { q: string; a: string }[] };
  ja: { h2: string; paragraphs: string[]; faq: { q: string; a: string }[] };
}> = {
  'business-cards': {
    'zh-hk': {
      h2: '香港名片印刷完全指南',
      paragraphs: [
        '在香港這個國際商業中心，一張精心設計的名片不僅是聯繫方式，更是品牌形象的第一印象。智印港提供全港最專業的名片印刷服務，從標準商務名片到高級燙金名片，滿足不同行業和場合的需求。',
        '我們的名片印刷採用300g-400g高級紙張，包括銅版紙、剛古紙、荷蘭白卡和棉紙等。配合德國海德堡四色印刷機，確保色彩準確還原。可選工藝包括啞膠/光膠覆膜、局部UV、燙金燙銀、凹凸壓紋和圓角裁切。',
        '起訂量僅需100張，標準交貨3-5個工作日。如需急件，可選擇24小時快印服務，支持印刷即日速遞送貨，覆蓋香港島、九龍和新界。企業客戶可申請月結賬戶，享受專屬客服和批量優惠。',
        '無論您是初創企業、自由工作者還是跨國公司，智印港都能為您提供量身定制的名片解決方案。立即上傳設計稿或選擇我們的免費模板，開始打造專屬於您的商務名片。',
      ],
      faq: [
        { q: '名片印刷最低多少張起？', a: '100張起訂，數碼打樣可提供50張小量服務。' },
        { q: '名片最快多久可以取貨？', a: '標準3-5個工作日；24小時快印服務可即日交貨。' },
        { q: '名片支持哪些特殊工藝？', a: '燙金、燙銀、局部UV、凹凸壓紋、圓角、打孔等。' },
        { q: '名片設計文件有什麼要求？', a: 'AI/PSD/PDF格式，300dpi，CMYK色彩模式，預留3mm出血位。' },
      ],
    },
    en: {
      h2: 'The Complete Guide to Business Card Printing in Hong Kong',
      paragraphs: [
        'In Hong Kong\'s fast-paced business environment, a premium business card is your brand\'s handshake. ZprintPro offers the city\'s most comprehensive business card printing services — from standard corporate cards to luxury foil-stamped designs that leave lasting impressions.',
        'Our business cards are printed on premium 300g-400g paper stocks including glossy art paper, Conqueror, Dutch white card, and cotton paper. Using Heidelberg 4-color presses with professional color management, we ensure accurate color reproduction every time.',
        'Available finishes include matte/gloss lamination, spot UV, foil stamping (gold/silver), embossing, debossing, and rounded corners. Minimum order is just 100 cards with 3-5 business day standard delivery. Need them faster? Our 24-hour rush service covers Hong Kong Island, Kowloon, and the New Territories.',
        'Corporate clients enjoy monthly billing, dedicated account management, and volume discounts. Whether you\'re a startup founder, freelancer, or multinational corporation, ZprintPro delivers business cards that command attention.',
      ],
      faq: [
        { q: 'What is the minimum order for business cards?', a: '100 cards. Digital proofing available from 50 cards.' },
        { q: 'How fast can I get my business cards?', a: 'Standard: 3-5 business days. Rush: 24-hour same-day delivery.' },
        { q: 'What special finishes do you offer?', a: 'Foil stamping, spot UV, embossing, debossing, rounded corners.' },
        { q: 'What are the design file requirements?', a: 'AI/PSD/PDF at 300dpi, CMYK color mode, with 3mm bleed.' },
      ],
    },
    ja: {
      h2: '香港名刺印刷完全ガイド',
      paragraphs: [
        '香港という国際ビジネスセンターでは、一枚の名刺は単なる連絡先ではなく、ブランドの第一印象です。ZprintProは香港で最も専門的な名刺印刷サービスを提供しており、標準的なビジネス名刺から高級箔押し名刺まで、様々な業界や場面のニーズにお応えします。',
        '当社の名刺印刷は300g〜400gの高級紙を使用し、コート紙、コンカラー紙、オランダ白カード、コットン紙などを取り揃えています。ハイデルベルグ4色印刷機とプロのカラーマネジメントにより、正確な色彩再現を実現します。',
        '対応加工はマット/グロスラミネーション、局部UV、箔押し（金/銀）、エンボス、デボス、丸角裁切など。最小発注数は100枚から、標準納期は3〜5営業日。急ぎの場合は24時間急行サービスで、香港島・九龍・新界をカバーします。',
        '法人様は月次請求、専任担当者、大口割引をご利用いただけます。スタートアップ創業者、フリーランス、多国籍企業のいずれであっても、ZprintProが印象に残る名刺をお届けします。',
      ],
      faq: [
        { q: '名刺印刷の最小発注数は？', a: '100枚から。デジタル校正用に50枚の少量サービスもあります。' },
        { q: '名刺の最短納期は？', a: '標準：3〜5営業日。急行：24時間即日配送。' },
        { q: '対応している特殊加工は？', a: '箔押し、局部UV、エンボス、デボス、丸角裁切など。' },
        { q: 'デザインファイルの要件は？', a: 'AI/PSD/PDF、300dpi、CMYKカラーモード、3mmのbleedを含めてください。' },
      ],
    },
  },
  'stickers': {
    'zh-hk': {
      h2: '香港貼紙印刷專家 — 防水、防曬、耐用',
      paragraphs: [
        '貼紙是現代商業不可或缺的宣傳工具。無論是產品標籤、品牌貼紙還是活動宣傳，智印港都能提供專業的貼紙印刷解決方案。我們的貼紙採用PP合成紙、PVC、PET等優質材料，配合UV固化油墨，確保防水、防曬、防撕裂。',
        '我們支持多種形狀和尺寸的貼紙定制：圓形貼紙、方形貼紙、異形模切貼紙、透明貼紙、全息貼紙等。最小起訂量僅50張，適合小批量測試和大型推廣活動。食品標籤貼紙符合FDA食品安全標準，可直接用於食品包裝。',
        '電商賣家的最佳選擇 — 我們提供電商包裝貼紙、物流標籤、QR Code貼紙，支持可變數據印刷（每張不同內容）。配合我們的即日印刷速遞服務，讓您的電商運營更加高效。',
        '車身貼紙、櫥窗玻璃貼紙、地板貼紙等商業應用也一應俱全。所有貼紙均可選擇光面或啞面處理，背膠分為永久性、可移除性和超強粘性三種，滿足不同場景需求。',
      ],
      faq: [
        { q: '貼紙印刷最低多少張起？', a: '50張起訂，數碼印刷支持小批量。' },
        { q: '防水貼紙可以貼在戶外嗎？', a: '可以。我們的防水貼紙採用UV固化，可耐曬2-3年。' },
        { q: '透明貼紙和白色貼紙有什麼區別？', a: '透明貼紙背景通透，適合玻璃/瓶身；白色貼紙色彩更鮮豔。' },
        { q: '可以印不同內容的貼紙嗎？', a: '可以，支持可變數據印刷，每張內容可不同。' },
      ],
    },
    en: {
      h2: 'Custom Sticker Printing Hong Kong — Waterproof & Durable',
      paragraphs: [
        'Stickers are essential marketing tools for modern businesses. Whether for product labels, brand promotion, or event decoration, ZprintPro delivers professional sticker printing solutions. Our stickers use premium PP synthetic paper, PVC, and PET materials with UV-cured inks for waterproof, UV-resistant, and tear-proof durability.',
        'We support multiple shapes and sizes: round stickers, square stickers, die-cut custom shapes, transparent stickers, and holographic stickers. Minimum order is just 50 pieces — perfect for small batch testing or large-scale campaigns. Food-grade labels meet FDA safety standards for direct food contact.',
        'E-commerce sellers love our packaging stickers, logistics labels, and QR code stickers with variable data printing (each sticker can have unique content). Combined with our same-day printing and delivery, your e-commerce operations run smoother than ever.',
        'Car decals, window graphics, floor stickers — we handle all commercial applications. Choose glossy or matte finishes with permanent, removable, or ultra-strong adhesive options for every scenario.',
      ],
      faq: [
        { q: 'What is the minimum order for stickers?', a: '50 pieces. Digital printing supports small batches.' },
        { q: 'Can waterproof stickers be used outdoors?', a: 'Yes. Our UV-cured waterproof stickers last 2-3 years outdoors.' },
        { q: 'Transparent vs white stickers?', a: 'Transparent has see-through background for glass/bottles. White offers more vibrant colors.' },
        { q: 'Can each sticker have different content?', a: 'Yes. We support variable data printing with unique content per sticker.' },
      ],
    },
    ja: {
      h2: '香港シール印刷専門店 — 防水・耐UV・耐久性',
      paragraphs: [
        'シールは現代ビジネスに欠かせない販促ツールです。商品ラベル、ブランドステッカー、イベント宣伝など、ZprintProがプロのシール印刷ソリューションを提供します。PP合成紙、PVC、PETなどの高品質素材にUV硬化インクを使用し、防水・耐UV・耐裂性を実現します。',
        '円形シール、方形シール、ダイカット自由形状、透明シール、ホログラムシールなど、様々な形状・サイズに対応。最小発注数は50枚から、小ロットテストから大規模キャンペーンまで対応可能。食品用ラベルはFDA食品安全基準を満たし、食品包装に直接使用可能です。',
        'EC売り主に最適な梱包用シール、物流ラベル、QRコードシールもご用意。可変データ印刷（1枚ずつ内容が異なる）にも対応します。即日印刷・配送サービスと組み合わせて、EC運営をより効率的に。',
        '車用デカール、窓用グラフィック、フロアシールなどの商業用途も承ります。光沢・マット仕上げ、永久・剥がせる・超強力の3種類の粘着剤からお選びいただけます。',
      ],
      faq: [
        { q: 'シール印刷の最小発注数は？', a: '50枚から。デジタル印刷で小ロットも対応。' },
        { q: '防水シールは屋外で使えますか？', a: 'はい。UV硬化防水シールは屋外で2〜3年持ちます。' },
        { q: '透明シールと白ベースシールの違いは？', a: '透明は背景が透けてガラス・ボトルに最適。白は色がより鮮やかです。' },
        { q: '1枚ずつ内容を変えられますか？', a: 'はい。可変データ印刷で1枚ずつ異なる内容が可能です。' },
      ],
    },
  },
  'flyers': {
    'zh-hk': {
      h2: '香港宣傳單張印刷 — 10張起訂，即日交貨',
      paragraphs: [
        '宣傳單張是最直接、最有效的線下推廣工具。智印港提供全港最具性價比的宣傳單張印刷服務，A4/A5/DL尺寸，光粉紙/啞粉紙/書紙多種紙質選擇。無論是開業宣傳、活動推廣、餐廳Menu還是選舉文宣，我們都能快速高質完成。',
        '我們的單張印刷採用環保大豆油墨和德國曼羅蘭印刷機，色彩鮮豔且環保。支持單面/雙面印刷，可配合摺頁加工（對摺、三摺、四摺、Z摺）。起訂量僅10張，1,000張以上享批量折扣，最高可達5折。',
        '特別推薦我們的「傳單印刷+派發」一條龍服務。與香港多家派傳公司長期合作，可為您安排針對性的地區派發，覆蓋住宅區、商業區、學校周邊等。讓您的宣傳信息精準觸達目標客群。',
        '即日印刷速遞送貨服務確保您的急單也能準時交付。上午11點前確認稿件，當天即可出貨。全港順豐直送，香港島/九龍一般次日達，新界約1-2個工作日。',
      ],
      faq: [
        { q: '宣傳單張最低多少張起？', a: '10張起訂，1,000張以上享批量折扣。' },
        { q: '宣傳單張有哪些紙質可選？', a: '128g/157g光粉紙、128g/157g啞粉紙、100g書紙。' },
        { q: '可以幫忙設計宣傳單張嗎？', a: '可以，提供免費設計模板和專業設計服務。' },
        { q: '傳單印刷後可以幫忙派發嗎？', a: '可以，我們提供傳單印刷+派發一條龍服務。' },
      ],
    },
    en: {
      h2: 'Flyer & Leaflet Printing Hong Kong — From 10 Copies, Same Day',
      paragraphs: [
        'Flyers remain the most direct and cost-effective offline marketing tool. ZprintPro offers Hong Kong\'s best-value flyer printing with A4/A5/DL sizes on glossy, matte, or uncoated paper stocks. Whether for grand openings, event promotion, restaurant menus, or campaign materials, we deliver fast and flawlessly.',
        'Our flyer printing uses eco-friendly soy-based inks and Roland presses for vibrant, environmentally responsible output. Single or double-sided printing available with folding options (half-fold, tri-fold, gate-fold, Z-fold). Minimum order is just 10 copies, with volume discounts up to 50% on 1,000+ pieces.',
        'Ask about our "Print + Distribute" package. We partner with established flyer distribution companies across Hong Kong to target specific areas — residential districts, commercial zones, and school vicinities. Your message reaches the right audience.',
        'Our same-day rush service ensures urgent orders arrive on time. Confirm artwork by 11 AM for same-day dispatch. Island-wide SF Express delivery — Hong Kong Island and Kowloon next-day, New Territories 1-2 business days.',
      ],
      faq: [
        { q: 'What is the minimum order for flyers?', a: '10 copies. Volume discounts up to 50% on 1,000+ pieces.' },
        { q: 'What paper options are available?', a: '128g/157g glossy art paper, 128g/157g matte art paper, 100g uncoated paper.' },
        { q: 'Do you offer flyer design services?', a: 'Yes. Free design templates and professional design services available.' },
        { q: 'Can you distribute flyers after printing?', a: 'Yes. We offer print + distribution packages across Hong Kong.' },
      ],
    },
    ja: {
      h2: '香港チラシ印刷 — 10枚から、即日納品',
      paragraphs: [
        'チラシは最も直接的で費用対効果の高いオフライン販促ツールです。ZprintProは香港で最もコスパに優れたチラシ印刷サービスを提供しており、A4/A5/DLサイズ、光沢紙/マット紙/書籍紙を取り揃えています。開業宣伝、イベント告知、飲食店メニュー、選挙文宣など、迅速かつ完璧にお届けします。',
        '当社のチラシ印刷は環境に優しい大豆油インクとローランド印刷機を使用し、鮮やかで環境配慮型の仕上がりを実現します。片面/両面印刷に対応し、折り加工（二つ折り、三つ折り、観音開き、Z折り）も可能です。最小発注数は10枚から、1,000枚以上で最大50%の大口割引。',
        '「印刷＋配布」パッケージもご用意しています。香港各地の配布会社と提携し、住宅街、商業地区、学校周辺など、特定エリアをターゲットにした配布が可能です。',
        '即日急行サービスで緊急注文も対応。午前11時までにデータを確定いただければ、当日出荷可能です。全港SF Express配送 — 香港島・九龍は翌日、新界は1〜2営業日。',
      ],
      faq: [
        { q: 'チラシ印刷の最小発注数は？', a: '10枚から。1,000枚以上で最大50%の割引。' },
        { q: '紙の種類は何がありますか？', a: '128g/157g光沢紙、128g/157gマット紙、100g書籍紙。' },
        { q: 'チラシのデザインも依頼できますか？', a: 'はい。無料テンプレートとプロのデザインサービスがあります。' },
        { q: '印刷後の配布も依頼できますか？', a: 'はい。香港全域での印刷＋配布パッケージを提供しています。' },
      ],
    },
  },
  'packaging': {
    'zh-hk': {
      h2: '香港包裝盒定制 — 100個起訂，免費刀模設計',
      paragraphs: [
        '包裝盒是品牌的無聲推銷員。一個精心設計的包裝盒不僅能保護產品，更能提升品牌價值和顧客體驗。智印港提供專業的包裝盒定制服務，從禮品盒、化妝品盒到食品盒，滿足各行各業的需求。',
        '我們支持多種盒型：天地蓋盒、書型盒、抽屜盒、折疊盒、飛機盒等。紙張選擇包括白卡紙、牛皮紙、特種紙和瓦楞紙。起訂量僅100個，遠低於傳統工廠的500-1,000個起訂標準。',
        '表面加工工藝豐富：燙金/燙銀、UV局部上光、凹凸壓紋、覆膜（啞膜/光膜/觸感膜）、絲印、凹凸壓紋。我們提供免費刀模設計和3D效果預覽，讓您在生產前就能看到成品效果。',
        '所有包裝盒均可選用FSC認證環保紙張，符合國際環保標準。食品包裝盒採用食品級紙張和無毒油墨，通過SGS檢測認證。月餅盒、茶葉盒、手工皂盒等節慶禮品盒是我們的強項。',
      ],
      faq: [
        { q: '包裝盒最低多少個起訂？', a: '100個起訂，遠低於傳統工廠標準。' },
        { q: '包裝盒有哪些盒型可選？', a: '天地蓋、書型盒、抽屜盒、折疊盒、飛機盒等。' },
        { q: '可以先用環保紙張嗎？', a: '可以，所有盒型均可選FSC認證環保紙張。' },
        { q: '食品包裝盒安全嗎？', a: '安全。採用食品級紙張和無毒油墨，通過SGS認證。' },
      ],
    },
    en: {
      h2: 'Custom Packaging Box Printing Hong Kong — From 100 Units, Free Die-Cut Design',
      paragraphs: [
        'Your packaging is your silent salesman. A well-designed box doesn\'t just protect your product — it elevates your brand and enhances customer experience. ZprintPro offers professional custom packaging solutions, from gift boxes and cosmetic packaging to food-grade containers for every industry.',
        'We support multiple box styles: rigid boxes, book-style boxes, drawer boxes, folding cartons, and mailer boxes. Paper options include white card, kraft paper, specialty paper, and corrugated board. Minimum order is just 100 units — far below traditional factories\' 500-1,000 piece minimums.',
        'Finishing options include foil stamping (gold/silver), spot UV, embossing/debossing, lamination (matte/gloss/soft-touch), silk-screen printing, and window patching. We provide free die-cut design and 3D rendering previews so you can see your box before production.',
        'All packaging can use FSC-certified eco-friendly paper. Food packaging boxes use food-grade paper and non-toxic inks with SGS certification. Mooncake boxes, tea boxes, and handmade soap boxes are among our specialties.',
      ],
      faq: [
        { q: 'What is the minimum order for packaging boxes?', a: '100 units — significantly lower than traditional factory minimums.' },
        { q: 'What box styles are available?', a: 'Rigid boxes, book-style, drawer boxes, folding cartons, mailer boxes.' },
        { q: 'Can I use eco-friendly paper?', a: 'Yes. All box types available with FSC-certified eco paper.' },
        { q: 'Are food packaging boxes safe?', a: 'Yes. Food-grade paper and non-toxic inks with SGS certification.' },
      ],
    },
    ja: {
      h2: '香港パッケージ印刷 — 100個から、無料型設計',
      paragraphs: [
        'パッケージは沈黙の販売員です。よくデザインされた箱は製品を保護するだけでなく、ブランド価値を高め、顧客体験を向上させます。ZprintProはギフト箱、化粧品箱、食品箱など、あらゆる業界のニーズに応えるプロのパッケージ印刷サービスを提供します。',
        '対応箱型は化粧箱、ブック型箱、引き出し箱、組み立て箱、ダンボール箱など。紙の種類は白カード紙、クラフト紙、特殊紙、段ボールを取り揃えています。最小発注数は100個から、従来の工場の500〜1,000個という基準を大きく下回っています。',
        '加工オプションは箔押し（金/銀）、局部UV、エンボス/デボス、ラミネート（マット/グロス/ソフトタッチ）、シルク印刷、窓開けなど。無料型設計と3Dレンダリングプレビューを提供し、生産前に完成品を確認できます。',
        '全パッケージでFSC認証エコ紙を使用可能。食品パッケージは食品グレードの紙と無毒インクを使用し、SGS認証取得済み。月餅箱、茶箱、手作り石鹸箱などのギフト箱も得意としています。',
      ],
      faq: [
        { q: 'パッケージの最小発注数は？', a: '100個から。従来の工場基準を大きく下回ります。' },
        { q: '対応している箱型は？', a: '化粧箱、ブック型、引き出し箱、組み立て箱、ダンボール箱。' },
        { q: 'エコ紙は使えますか？', a: 'はい。全箱型でFSC認証エコ紙を選択可能です。' },
        { q: '食品パッケージは安全ですか？', a: 'はい。食品グレード紙と無毒インク、SGS認証済み。' },
      ],
    },
  },
  'posters': {
    'zh-hk': {
      h2: '香港海報印刷 — A0/A1/A2全尺寸，最快4小時交貨',
      paragraphs: [
        '海報是視覺傳播的王者。無論是商業展覽、活動宣傳、零售促銷還是家居裝飾，一張高品質的海報都能瞬間抓住眼球。智印港提供全港最專業的海報印刷服務，A0/A1/A2/A3全尺寸覆蓋，滿足各種場景需求。',
        '我們的海報採用進口光粉紙、相紙、帆布和PP合成紙，配合HP Indigo數碼印刷機或愛普生大幅面噴墨機，確保色彩鮮豔、層次豐富。戶外海報可選擇防水防曬材質，配合PP裱貼或背膠處理，適合長期戶外展示。',
        '展覽Backdrop背景板是我們的熱門產品，支持定制尺寸（最大3m寬），可配合桁架使用。餐廳Menu海報、電影海報、活動宣傳海報等商業應用均有豐富經驗。所有海報均可選擇光面或啞面處理。',
        '即日印刷速遞送貨服務確保您的活動不受延誤。A1海報最快4小時可取，A0海報標準1-2個工作日。配合我們的專業設計團隊，從創意到成品一站式完成。',
      ],
      faq: [
        { q: '海報有哪些尺寸可選？', a: 'A0(841×1189mm)、A1(594×841mm)、A2(420×594mm)、A3(297×420mm)。' },
        { q: '戶外海報防水嗎？', a: '防水。採用PP合成紙+防水覆膜，可耐曬1-2年。' },
        { q: 'Backdrop背景板最大做多寬？', a: '最大3米寬，可配合桁架使用。' },
        { q: '海報最快多久可以取？', a: 'A1海報最快4小時；A0海報標準1-2個工作日。' },
      ],
    },
    en: {
      h2: 'Poster Printing Hong Kong — A0/A1/A2 Sizes, 4-Hour Rush Available',
      paragraphs: [
        'Posters are the king of visual communication. Whether for trade shows, event promotion, retail sales, or home decor, a high-quality poster commands attention instantly. ZprintPro offers Hong Kong\'s most professional poster printing with full A0/A1/A2/A3 size coverage.',
        'Our posters use imported glossy art paper, photo paper, canvas, and PP synthetic paper. Paired with HP Indigo digital presses or Epson large-format inkjet printers, we deliver vibrant colors and rich detail. Outdoor posters feature waterproof, UV-resistant materials with optional PP lamination or adhesive backing for long-term display.',
        'Exhibition backdrop banners are a popular choice — custom sizes up to 3 meters wide, compatible with truss systems. Restaurant menu posters, movie posters, and event promotional materials are all within our expertise. Choose glossy or matte finishes.',
        'Our same-day rush service keeps your events on schedule. A1 posters ready in 4 hours; A0 posters in 1-2 business days. Our professional design team handles everything from creative concept to finished product.',
      ],
      faq: [
        { q: 'What poster sizes are available?', a: 'A0 (841×1189mm), A1 (594×841mm), A2 (420×594mm), A3 (297×420mm).' },
        { q: 'Are outdoor posters waterproof?', a: 'Yes. PP synthetic paper with waterproof lamination lasts 1-2 years outdoors.' },
        { q: 'What is the maximum backdrop width?', a: 'Up to 3 meters wide, compatible with truss systems.' },
        { q: 'What is the fastest turnaround for posters?', a: 'A1 posters in 4 hours; A0 posters in 1-2 business days.' },
      ],
    },
    ja: {
      h2: '香港ポスター印刷 — A0/A1/A2サイズ、最短4時間急行',
      paragraphs: [
        'ポスターは視覚伝達の王様です。展示会、イベント告知、小売販促、インテリアなど、高品質なポスターは瞬時に注目を集めます。ZprintProはA0/A1/A2/A3の全サイズに対応する香港で最も専門的なポスター印刷サービスを提供します。',
        '輸入光沢紙、写真用紙、キャンバス、PP合成紙を使用し、HP Indigoデジタル印刷機またはEpson大判インクジェットプリンターで鮮やかな色彩と豊かな階調を実現します。屋外用ポスターは防水・耐UV素材で、PPラミネートや粘着加工オプションもあり、長期屋外展示に最適です。',
        '展示会用バックドロップバナーも人気の選択肢 — 最大3メートル幅のカスタムサイズで、トラスシステムとの互換性もあります。飲食店メニューポスター、映画ポスター、イベント宣伝なども得意分野です。',
        '即日急行サービスでイベントのスケジュールを守ります。A1ポスターは最短4時間、A0ポスターは1〜2営業日。プロのデザインチームがクリエイティブコンセプトから完成品まで一括対応します。',
      ],
      faq: [
        { q: 'ポスターのサイズは？', a: 'A0(841×1189mm)、A1(594×841mm)、A2(420×594mm)、A3(297×420mm)。' },
        { q: '屋外用ポスターは防水ですか？', a: 'はい。PP合成紙+防水ラミネートで屋外1〜2年持ちます。' },
        { q: 'バックドロップの最大幅は？', a: '最大3メートル幅で、トラスシステムとの互換性あり。' },
        { q: 'ポスターの最短納期は？', a: 'A1は最短4時間。A0は1〜2営業日。' },
      ],
    },
  },
  'paper-bags': {
    'zh-hk': {
      h2: '香港紙袋印刷 — 環保FSC認證，100個起訂',
      paragraphs: [
        '在環保意識日益增強的今天，紙袋已成為零售、餐飲和活動的首選包裝。智印港提供專業的紙袋印刷服務，從簡約的牛皮紙袋到奢華的禮品袋，滿足各種品牌定位需求。',
        '我們的紙袋採用FSC認證環保紙張，包括牛皮紙、白卡紙、特種紋理紙和再生紙。提手選擇包括棉繩、紙繩、絲帶和尼龍繩。起訂量僅100個，遠低於市場平均水平。',
        '表面工藝包括燙金/燙銀、UV局部上光、凹凸壓紋、絲印和彩色印刷。我們提供免費刀模設計，支持各種尺寸和形狀的定制。無論是零售購物袋、餐飲外賣袋還是活動禮品袋，都能完美呈現。',
        '所有紙袋均可添加品牌Logo、QR Code、社交媒體信息和環保標語。配合我們的即日印刷速遞服務，讓您的品牌推廣活動更加順暢。企業客戶可申請月結賬戶和批量優惠。',
      ],
      faq: [
        { q: '紙袋最低多少個起訂？', a: '100個起訂，遠低於市場平均水平。' },
        { q: '紙袋有哪些紙張可選？', a: '牛皮紙、白卡紙、特種紋理紙、FSC再生紙。' },
        { q: '可以燙金燙銀嗎？', a: '可以。支持燙金、燙銀、UV、凹凸壓紋等工藝。' },
        { q: '紙袋是環保的嗎？', a: '是。採用FSC認證環保紙張，可100%回收。' },
      ],
    },
    en: {
      h2: 'Custom Paper Bag Printing Hong Kong — FSC Certified, From 100 Units',
      paragraphs: [
        'As environmental awareness grows, paper bags have become the packaging of choice for retail, F&B, and events. ZprintPro offers professional paper bag printing from minimalist kraft bags to luxury gift bags for every brand positioning.',
        'Our bags use FSC-certified eco-friendly paper including kraft paper, white card, specialty textured paper, and recycled paper. Handle options include cotton rope, paper rope, ribbon, and nylon. Minimum order is just 100 units — well below market averages.',
        'Finishing includes foil stamping (gold/silver), spot UV, embossing/debossing, silk-screen printing, and full-color printing. Free die-cut design with custom sizes and shapes. Whether retail shopping bags, takeaway bags, or event gift bags — we deliver perfection.',
        'All bags can feature your brand logo, QR code, social media handles, and eco-friendly messaging. Combined with our same-day rush service, your brand promotion runs smoothly. Corporate clients enjoy monthly billing and volume discounts.',
      ],
      faq: [
        { q: 'What is the minimum order for paper bags?', a: '100 units — well below market averages.' },
        { q: 'What paper options are available?', a: 'Kraft paper, white card, specialty textured paper, FSC recycled paper.' },
        { q: 'Can I add foil stamping?', a: 'Yes. Foil stamping, spot UV, embossing, and more available.' },
        { q: 'Are the paper bags eco-friendly?', a: 'Yes. FSC-certified paper, 100% recyclable.' },
      ],
    },
    ja: {
      h2: '香港紙袋印刷 — FSC認証、100個から',
      paragraphs: [
        '環境意識が高まる今日、紙袋は小売・飲食・イベントのパッケージングとして定着しています。ZprintProはミニマルなクラフト紙袋から高級ギフト袋まで、あらゆるブランドポジショニングに対応するプロの紙袋印刷サービスを提供します。',
        'FSC認証エコ紙を使用し、クラフト紙、白カード紙、特殊テクスチャ紙、再生紙を取り揃えています。持ち手は綿紐、紙紐、リボン、ナイロンからお選びいただけます。最小発注数は100個から、市場平均を大きく下回っています。',
        '加工は箔押し（金/銀）、局部UV、エンボス/デボス、シルク印刷、フルカラー印刷に対応。無料型設計でカスタムサイズ・形状も可能。小売用ショッピングバッグ、テイクアウト袋、イベント用ギフトバッグなど、あらゆる用途に最適です。',
        '全紙袋にブランドロゴ、QRコード、SNS情報、エコメッセージを印刷可能。即日急行サービスと組み合わせて、ブランドプロモーションをスムーズに。法人様は月次請求と大口割引をご利用いただけます。',
      ],
      faq: [
        { q: '紙袋の最小発注数は？', a: '100個から。市場平均を大きく下回ります。' },
        { q: '紙の種類は何がありますか？', a: 'クラフト紙、白カード紙、特殊テクスチャ紙、FSC再生紙。' },
        { q: '箔押しはできますか？', a: 'はい。箔押し、UV、エンボスなどに対応。' },
        { q: '紙袋はエコですか？', a: 'はい。FSC認証紙、100%リサイクル可能。' },
      ],
    },
  },
};

// 默认Pillar Content（非六大分类使用）
function getDefaultPillar(categorySlug: string, locale: string) {
  const nameMap: Record<string, { 'zh-hk': string; en: string; ja: string }> = {
    'books': { 'zh-hk': '書籍印刷', en: 'Book Printing', ja: '書籍印刷' },
    'banners': { 'zh-hk': '噴繪廣告', en: 'Banner Printing', ja: 'バナー印刷' },
    'menus': { 'zh-hk': '餐牌印刷', en: 'Menu Printing', ja: 'メニュー印刷' },
    'envelopes': { 'zh-hk': '信封印刷', en: 'Envelope Printing', ja: '封筒印刷' },
    'calendars': { 'zh-hk': '年曆印刷', en: 'Calendar Printing', ja: 'カレンダー印刷' },
    'red-packets': { 'zh-hk': '利是封印刷', en: 'Red Packet Printing', ja: 'ポチ袋印刷' },
    'educational': { 'zh-hk': '校園教育印刷', en: 'Educational Printing', ja: '教育印刷' },
  };
  const name = nameMap[categorySlug]?.[locale as keyof typeof nameMap[string]] || categorySlug;
  return {
    h2: locale === 'zh-hk' ? `專業${name}服務` : locale === 'en' ? `Professional ${name} Services` : `プロの${name}サービス`,
    paragraphs: [locale === 'zh-hk' ? `智印港提供專業的${name}服務，品質保證，價格透明。` : locale === 'en' ? `ZprintPro offers professional ${name} services with quality guarantee.` : `ZprintProはプロの${name}サービスを提供します。`],
    faq: [],
  };
}

export function CategoryPillarContent({ locale, categorySlug }: CategoryPillarContentProps) {
  const data = pillarData[categorySlug]?.[locale as 'zh-hk' | 'en' | 'ja'] || getDefaultPillar(categorySlug, locale);
  
  return (
    <section className="bg-white border-t">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* H2 标题 */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {data.h2}
        </h2>
        
        {/* 正文段落 */}
        <div className="prose prose-lg max-w-none text-gray-600 space-y-4 mb-10">
          {data.paragraphs.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        
        {/* FAQ 区域 */}
        {data.faq.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-6 md:p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {locale === 'zh-hk' ? '常見問題' : locale === 'en' ? 'Frequently Asked Questions' : 'よくある質問'}
            </h3>
            <div className="space-y-4">
              {data.faq.map((item, index) => (
                <details
                  key={index}
                  className="group bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-900">{item.q}</span>
                    <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
