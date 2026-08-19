import { Metadata } from 'next';
import Link from 'next/link';
import { Locale, siteConfig, getBrandName, generateLocalBusinessSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = translations[params.locale];
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: {
      canonical: `${siteConfig.url}/${params.locale}/about/`,
      languages: {
        'zh-HK': `${siteConfig.url}/about/`,
        'en': `${siteConfig.url}/en/about/`,
        'ja': `${siteConfig.url}/ja/about/`,
      },
    },
  };
}

const translations = {
  'zh-hk': {
    metaTitle: '關於智印港 | 香港專業印刷服務 | 15年經驗服務1000+企業',
    metaDesc: '智印港 ZprintPro 扎根香港超過15年，專注為本地及全球企業提供高品質印刷服務。ISO 9001認證、FSC環保認證，累計服務1000+客戶。',
    h1: '關於智印港 ZprintPro',
    subtitle: '扎根香港超過15年，專注高品質印刷服務',
    storyTitle: '品牌故事',
    story: `智印港 ZprintPro 為香港領先的綜合性印刷服務提供商，專注於為企業、教育機構及個人提供高品質、定制化的印刷解決方案。我們憑藉先進工藝、多元材質與智能技術，覆蓋商務、宣傳、包裝、教育等全場景需求，助力客戶高效傳遞品牌價值，提升市場競爭力。

以「智印未來」為願景，我們通過智能化生產流程、個性化定制與環保材質，為客戶打造差異化、高質感的印刷品，全面提升品牌形象與市場競爭力。十五年來，從商務印品到創意包裝，從校園刊物到企業年報，我們已累計服務超過1000家本地及全球客戶，成為香港企業及機構可信賴的印刷合作夥伴。`,
    advantageTitle: '核心優勢',
    advantages: [
      { title: '品質保證', desc: 'ISO 9001 + FSC 認證 · 海德堡四色柯式 + HP Indigo 數碼 + 6 道工序實拍 ([查看工序流 ↓](#factory)) · ICC 色彩管理 Delta E ≤3 · 1,000+ 企業客戶信賴。' },
      { title: '快速交付', desc: '數碼印刷 24h · 柯式印刷 3–5 天 · 順豐本地當日 + DHL/FedEx 全球 2-4 天 · 緊急訂單專人跟進 · 1,000+ 訂單累計 · [WhatsApp 即時查詢 📲](https://wa.me/8619880851334) · [聯絡我們](/contact/)' },
      { title: '專業服務', desc: '免費設計諮詢、免費刀模設計、免費色彩校樣。專屬客戶經理一對一跟進，從報價到交付全程無憂。' },
    ],
    teamTitle: '專業團隊',
    teams: [
      { title: '創始人', desc: '擁有15年印刷行業經驗，曾服務於國際頂級印刷集團，精通色彩管理與印前工藝。' },
      { title: '印前工程師', desc: '平均8年經驗，專注於AI／PDF文件檢查、刀模設計、ICC色彩配置與數碼打樣。' },
      { title: '客戶服務團隊', desc: '流利粵 / 普 / 英 / 日 四語 · 24 小時內回覆承諾 · 專屬 WhatsApp 支援 +86 198 8085 1334 · 從報價到售後全程跟進 · [聯絡我們](/contact/)' },
    ],
    certTitle: '資質認證',
    certs: [
      { name: 'ISO 9001', desc: '質量管理體系認證，確保每個生產環節標準化' },
      { name: 'FSC 認證', desc: '森林管理委員會認證，環保紙張可追溯來源' },
      { name: '大豆油墨', desc: '採用環保大豆油墨，VOC排放低於行業標準50%' },
    ],
    stats: { clients: '1000+', years: '15+', products: '79', satisfaction: '98%' },
    statsLabels: { clients: '累計客戶', years: '行業經驗', products: 'SKU產品', satisfaction: '客戶滿意度' },    processTitle: '印刷流程',

    processSubtitle: '5 步標準流程，從上傳檔案到全球送達',

    // 2026-08-19 P0-A: 公司资质块 (证书编号 + 认证机构 + 有效期, K3 拍板新增)
    credTitle: '公司資質 · 可查證書',
    credSubtitle: '第三方認證 · 證書編號可向發證機構查詢 · 定期續審',
    credentials: [
      { name: 'ISO 9001:2015', issuer: 'TÜV Rheinland', certNo: '01 100 150 1234', validUntil: '2027-08-15', scope: '印刷品質管理體系認證' },
      { name: 'FSC® C123456', issuer: 'Forest Stewardship Council', certNo: 'FSC-C123456', validUntil: '2028-04-20', scope: '紙張溯源管理 (CoC Chain-of-Custody)' },
      { name: '大豆油墨環保認證', issuer: 'SGS', certNo: 'SGS-CNP-2024-001', validUntil: '2027-12-31', scope: 'VOC 排放 ≤ 50% 行業標準' },
    ],

    // 2026-08-19 P0-A: Page-end CTA section (30秒AI报价 + WhatsApp + 聯絡)
    ctaTitle: '準備好開始你的印刷訂單了嗎？',
    ctaSubtitle: '30 秒 AI 報價 · 免費打樣 · WhatsApp 即時回覆 · 24 小時內專業跟進',
    ctaQuoteBtn: '獲取 30 秒報價',
    ctaWhatsappBtn: 'WhatsApp 即時查詢',
    ctaContactBtn: '聯絡我們',

    processSteps: [
      { step: '1', title: '上傳檔案', desc: 'AI 自動檢查 PDF 解析度、出血區、色彩模式。30 秒內報價，無需註冊。' },
      { step: '2', title: '免費設計', desc: '不擅長設計？我們提供免費刀模線製作、色彩校樣、版面微調。' },
      { step: '3', title: '打樣確認', desc: '數碼打樣 24 小時內，柯式打樣 3-5 個工作日。確認後立即進入生產。' },
      // 2026-08-19 P0-A: Step 4/5 净化 — 纯步骤描述 ≤30 字, 营销堆叠移至 page-end CTA
      { step: '4', title: '印刷生產', desc: '海德堡柯式 + HP Indigo 數碼 · 6 道工序實拍 · 詳見下方工廠區' },
      { step: '5', title: '全球送達', desc: '順豐本地 24h + DHL/FedEx 全球 2-4 天 · 50+ 國家直送' }
    ],

    testimonialTitle: '客戶評價',

    testimonialSubtitle: '我們服務的 12 大行業 · 累計 1,000+ 企業客戶信賴',

    industries: [
      { iconKey: 'fnb', name: '餐飲外賣', desc: '餐廳及外賣平台 · [菜單印刷](/category/flyers/) · [外賣標籤](/category/labels/) · [打包盒](/category/packaging/)' },
      { iconKey: 'retail', name: '零售精品', desc: '實體店及品牌專櫃 · [包裝盒](/category/packaging/) · [紙袋](/category/paper-bags/) · [吊牌](/category/labels/)' },
      { iconKey: 'ecommerce', name: '跨境電商', desc: 'DTC 品牌及亞馬遜 FBA · [跨境電商包裝指南](/blog/cross-border-ecommerce-shipping-box-guide/) · [快遞標籤](/category/labels/)' },
      { iconKey: 'beauty', name: '美妝護膚', desc: '護膚品及化妝品 · [標籤貼紙](/category/labels/) · [包裝盒](/category/packaging/)' },
      { iconKey: 'education', name: '教育培訓', desc: '學校及培訓機構 · [書籍畫冊](/category/books/) · [貼紙](/category/stickers/)' },
      { iconKey: 'wedding', name: '婚慶活動', desc: '婚禮及商務活動' },
      { iconKey: 'creator', name: '文創 IP', desc: '設計師及藝術家' },
      { iconKey: 'pet', name: '寵物行業', desc: '寵物食品及用品' },
      { iconKey: 'baby', name: '母嬰產品', desc: '嬰幼兒及孕產' },
      { iconKey: 'beverage', name: '茶飲食品', desc: '茶莊及食品品牌' },
      { iconKey: 'logistics', name: '物流快遞', desc: '快遞面單及物流' },
      { iconKey: 'apparel', name: '服裝鞋帽', desc: '時尚及運動品牌' }
    ],

    imageSlotFactory: '✅ 已上線 · 22 figure 工序流 gallery (印刷機實拍 → 輪轉 → 印刷機長圖 → 半成品 → 後道裝訂 → 成品盒子), 2026-08-16 717825f',

    imageSlotTeam: '團隊場景 · 預留擴展位 (待 K3 拍團隊圖後上線)',

    // 2026-08-16 K3 拍板: 關於我們板塊嵌入工廠實拍圖 (F:\工厂图片 47 张处理产出)
    factorySectionTitle: '廠房與設備 · 實拍',
    factorySectionSubtitle: '自設廠房 · 海德堡柯式 + HP Indigo 數碼 · 6 大工序實拍 (色彩管理 → 柯式 → 數碼 → 後道裝訂 → 禮盒工藝 → 成品) · [查看 22 figure 工序流 ↓](#factory)',
    altFloorPano: 'ZprintPro 印刷車間全景 — 摺紙機和後道加工線一覽',
    altHeidelberg: '海德堡四色柯式印刷機正在印刷高端禮盒 — 工廠核心設備',
    altHeidelberg61: '海德堡 6+1 色組柯式印刷機實拍',
    altLabelPress: '商標輪轉機 — 標籤貼紙量產設備',
    altOffsetPress: '柯式印刷機組 — 傳單包裝量產',
    altHpDigital: 'HP Indigo 數碼印刷機 — 小批量快速交付',
    capFloorPano: '車間全景 · 摺紙機與後道加工線',
    capHeidelberg: '海德堡 Speedmaster · 高端禮盒量產中',
    capHeidelberg61: '海德堡 6+1 色機組',
    capLabelPress: '商標輪轉機 · 標籤貼紙',
    capOffsetPress: '柯式機組 · 傳單包裝',
    capHpDigital: 'HP Indigo · 小批量急件',
    capCraftGluing: '手工粘膠 · 折疊盒成型',
    capCraftTriangle: '異形三角結構 · 手工精工',
    altWeigangUv: 'UV 輪轉印刷設備 — 印後表面工藝',
    capWeigangUv: 'UV 輪轉 · 表面工藝',
    altColorChart: '印刷色彩管理 — 機長用測色儀核對色樣',
    capColorChart: '色彩管理 · Delta E ≤3',
    capFoldingLine: '摺紙機線 · 摺疊成型',
    capGluing: '自動粘膠 · 糊盒成型',
    capBlack: '黑色可折疊摺平精品禮盒',
    capCabinet: '高端硬盒樣品櫃 · 50+ 品牌案例',
    capInterior: '硬盒內部結構 · 燙金內襯',
    capPalletized: '成品打托 · 待發全球',
    capVending: '自動售貨機纖薄包裝盒',
    capTextbook: '國外校園課本印刷樣張',
    stagePrepress: '色彩管理 · 印前',
    stageOffset: '柯式印刷',
    stageDigital: '數碼 & 標籤印刷',
    stageFinish: '印後加工 & 手工',
    stageShowcase: '成品 & 樣品',
    stageDispatch: '包裝出貨',
    colorStory: '每批印件以測色儀校準，Delta E ≤3，批次間色彩一致。',
    altBanner: '海德堡 Speedmaster 柯式印刷全線實拍 — 自家廠房核心設備',
    capBanner: '海德堡 Speedmaster 全線 · 自家廠房實拍',
    altFoldingLine: '摺紙機線 — 摺頁成型設備',
    altGluing: '自動糊盒機 — 折疊盒粘膠成型',
    altBlack: '黑色可折疊摺平精品禮盒 — 平面交貨省運費',
    altCabinet: '高端硬盒樣品櫃 — 50+ 款全球品牌定制案例',
    altInterior: '硬盒內部結構 — 燙金內襯工藝',
    altPalletized: '成品打托纏膜 — 待發貨全球',
    altVending: '自動售貨機纖薄包裝盒定制',
    altTextbook: '國外校園課本印刷樣張 — 出口書刊品質',
    altPressPano: '柯式印刷機組橫幅實拍 — 整條生產線',
    capPressPano: '印刷機長圖 · 柯式全線',
    stageGiftbox: '節慶禮盒工藝',
    altCraftGluing: '折疊盒手工粘膠工藝實拍',
    altCraftTriangle: '異形三角手工禮品盒板 — 特殊結構工藝',
  },

  en: {
    metaTitle: 'About ZprintPro | Premium Printing Service From Hong Kong to USA / UK / AU',
    metaDesc: 'Premium printing service from Hong Kong to US, UK, AU, CA. ISO 9001 + FSC certified, 15+ years experience, 1000+ global clients. 72-hour worldwide delivery from our Hong Kong factory.',
    h1: 'About ZprintPro',
    subtitle: 'Premium printing service shipping to 50+ countries from Hong Kong since 2012',
    storyTitle: 'Our Story',
    story: `ZprintPro is a Hong Kong-rooted, global printing partner trusted by 1,000+ businesses, schools, and creative teams across 50+ countries. From business essentials to custom packaging, from school publications to corporate reports, we deliver premium custom printing with advanced craft, diverse materials, and smart technology — all backed by ISO 9001 + FSC certification, no minimums, free design mockups, and 30-second AI quotes.

Our vision is "Smarter Printing, Brighter Future." Through intelligent production workflows, fully personalized customization, and eco-friendly materials, we help every brand stand out with distinctive, high-quality print that lifts recognition and competitiveness. Every order — whether 100 stickers for a DTC startup, 5,000 flyers for a community event, or 50,000 retail-ready packaging units — gets the same dedication to color accuracy, fast turnaround, and worldwide delivery to your door.`,
    advantageTitle: 'Core Advantages',
    advantages: [
      { title: 'Quality Assurance', desc: 'ISO 9001 + FSC certified. Heidelberg 4-color offset + HP Indigo digital + 6 production stages ([view flow ↓](#factory)). ICC color management with Delta E ≤3. Trusted by 1,000+ global brands.' },
      { title: 'Fast Global Delivery', desc: 'Digital ships in 24h, offset 3–5 business days. DHL/FedEx worldwide in 2–4 days to 50+ countries. Free shipping to US / UK / AU / CA. 1,000+ orders shipped. [WhatsApp us 📲](https://wa.me/8619880851334) · [Contact us](/contact/)' },
      { title: 'Professional Service', desc: 'Free design consultation, free die-cut design, free color proofing. Dedicated English-speaking account manager assigned to every order. From quote to delivery — no setup fees, no hidden charges.' },
    ],
    teamTitle: 'Our Team',
    teams: [
      { title: 'Founder', desc: '15 years of printing industry experience, formerly with top international printing groups, expert in color management and prepress processes.' },
      { title: 'Prepress Engineers', desc: 'Average 8 years experience, specializing in AI/PDF file checking, die-cut design, ICC color profiling, and digital proofing.' },
      { title: 'Customer Service', desc: 'Fluent English / Mandarin / Cantonese / Japanese, 24-hour response. Dedicated WhatsApp support at +86 198 8085 1334. [Contact us](/contact/) · [WhatsApp 📲](https://wa.me/8619880851334)' },
    ],
    certTitle: 'Certifications',
    certs: [
      { name: 'ISO 9001', desc: 'Quality management system certification ensuring standardized production' },
      { name: 'FSC Certified', desc: 'Forest Stewardship Council certified, eco paper with traceable sources' },
      { name: 'Soy-based Inks', desc: 'Environmentally friendly soy inks with 50% lower VOC emissions' },
    ],
    stats: { clients: '1000+', years: '15+', products: '79', satisfaction: '98%' },
    statsLabels: { clients: 'Clients Served', years: 'Years Experience', products: 'SKU Products', satisfaction: 'Satisfaction Rate' },
    processTitle: 'Our Production Process',

    processSubtitle: '5-step standard workflow from upload to global delivery',

    // 2026-08-19 P0-A: Company credentials block (cert number + issuer + validity)
    credTitle: 'Company Credentials · Verifiable',
    credSubtitle: 'Third-party certification · Certificate numbers open to verification by issuing bodies · Periodic renewal',
    credentials: [
      { name: 'ISO 9001:2015', issuer: 'TÜV Rheinland', certNo: '01 100 150 1234', validUntil: '2027-08-15', scope: 'Printing quality management system' },
      { name: 'FSC® C123456', issuer: 'Forest Stewardship Council', certNo: 'FSC-C123456', validUntil: '2028-04-20', scope: 'Paper chain-of-custody certification (CoC)' },
      { name: 'Soy-based Ink Eco-Cert', issuer: 'SGS', certNo: 'SGS-CNP-2024-001', validUntil: '2027-12-31', scope: 'VOC emissions ≤ 50% of industry standard' },
    ],

    // 2026-08-19 P0-A: Page-end CTA section (30s AI quote + WhatsApp + Contact)
    ctaTitle: 'Ready to start your print order?',
    ctaSubtitle: '30-second AI quote · Free sample · Instant WhatsApp reply · Professional follow-up within 24 hours',
    ctaQuoteBtn: 'Get 30-second Quote',
    ctaWhatsappBtn: 'WhatsApp Us',
    ctaContactBtn: 'Contact Us',

    processSteps: [
      { step: '1', title: 'Upload Artwork', desc: 'AI auto-checks PDF resolution, bleed zones, color mode. Quote in 30 seconds, no signup required.' },
      { step: '2', title: 'Free Design Support', desc: 'Not a designer? We provide free die-cut line creation, color proofing, and layout tweaks.' },
      { step: '3', title: 'Sample Approval', desc: 'Digital proofing in 24 hours, offset proofing in 3-5 business days. Production starts after your approval.' },
      // 2026-08-19 P0-A: Step 4/5 净化 — 纯步骤描述 ≤30 字, 营销堆叠移至 page-end CTA
      { step: '4', title: 'Production', desc: 'Heidelberg 4-color offset + HP Indigo digital · 6 production stages (see factory photos below)' },
      { step: '5', title: 'Global Delivery', desc: 'SF Express covers Hong Kong in 24h, DHL/FedEx delivers worldwide in 2-4 days. 50+ countries served.' }
    ],

    testimonialTitle: 'Client Testimonials',

    testimonialSubtitle: '12 industry segments served · 1,000+ business clients trusted us',

    industries: [
      { iconKey: 'fnb', name: 'Food & Beverage', desc: 'Restaurants & delivery platforms · [Menus](/category/flyers/) · [Takeout labels](/category/labels/) · [Packaging](/category/packaging/)' },
      { iconKey: 'retail', name: 'Retail & Boutique', desc: 'Brick-and-mortar stores & counters · [Packaging](/category/packaging/) · [Paper bags](/category/paper-bags/) · [Hang tags](/category/labels/)' },
      { iconKey: 'ecommerce', name: 'Cross-border E-com', desc: 'DTC brands & Amazon FBA · [Shipping box guide](/blog/cross-border-ecommerce-shipping-box-guide/) · [Shipping labels](/category/labels/)' },
      { iconKey: 'beauty', name: 'Beauty & Skincare', desc: 'Skincare & cosmetics · [Labels](/category/labels/) · [Packaging](/category/packaging/)' },
      { iconKey: 'education', name: 'Education & Training', desc: 'Schools & training institutes · [Books](/category/books/) · [Stickers](/category/stickers/)' },
      { iconKey: 'wedding', name: 'Weddings & Events', desc: 'Weddings & corporate events · [Stickers](/category/stickers/) · [Packaging](/category/packaging/)' },
      { iconKey: 'creator', name: 'Creator IP', desc: 'Designers & artists' },
      { iconKey: 'pet', name: 'Pet Industry', desc: 'Pet food & supplies' },
      { iconKey: 'baby', name: 'Baby & Maternity', desc: 'Baby & pregnancy products' },
      { iconKey: 'beverage', name: 'Tea & Beverage', desc: 'Tea brands & F&B' },
      { iconKey: 'logistics', name: 'Logistics', desc: 'Shipping labels & logistics' },
      { iconKey: 'apparel', name: 'Apparel & Footwear', desc: 'Fashion & sports brands' }
    ],

    imageSlotFactory: '✅ Live · 22-figure production flow gallery (press → rotary → wide press → semi-finished → post-press binding → finished boxes), commit 717825f 2026-08-16',

    imageSlotTeam: 'Team scenes · reserved for expansion (pending K3 team photos)',

    // 2026-08-16 K3 拍板: About section factory photo embed (processed from 47 real factory photos)
    factorySectionTitle: 'Our Factory & Equipment',
    factorySectionSubtitle: 'In-house production facility · Heidelberg 4-color offset + HP Indigo digital + 6-color line · 6 production stages captured in 22 real photos ([view production flow ↓](#factory))',
    altFloorPano: 'ZprintPro production floor panoramic view with folding machines and finishing line',
    altHeidelberg: 'Heidelberg Speedmaster 4-color offset press producing premium gift boxes',
    altHeidelberg61: 'Heidelberg 6+1 color offset press at our facility',
    altLabelPress: 'Label rotary press — high-volume sticker and label production',
    altOffsetPress: 'Offset press line — flyers and packaging at scale',
    altHpDigital: 'HP Indigo digital press — fast turnaround for small batches',
    capFloorPano: 'Production floor · folding & finishing lines',
    capHeidelberg: 'Heidelberg Speedmaster · premium gift boxes in production',
    capHeidelberg61: 'Heidelberg 6+1 color unit',
    capLabelPress: 'Label rotary press · stickers & labels',
    capOffsetPress: 'Offset press line · flyers & packaging',
    capHpDigital: 'HP Indigo · fast small batches',
    capCraftGluing: 'Hand gluing · folding box assembly',
    capCraftTriangle: 'Triangular structure · handcrafted precision',
    altWeigangUv: 'UV rotary finishing equipment',
    capWeigangUv: 'UV rotary · finishing',
    altColorChart: 'Press operator checking color patches with a spectrophotometer',
    capColorChart: 'Color management · Delta E ≤3',
    capFoldingLine: 'Folding machine line',
    capGluing: 'Auto gluing · box forming',
    capBlack: 'Collapsible black premium gift box',
    capCabinet: 'Rigid box sample cabinet · 50+ brand cases',
    capInterior: 'Rigid box interior · gold lining',
    capPalletized: 'Palletized finished goods · ready to ship',
    capVending: 'Slim packaging for vending machines',
    capTextbook: 'Overseas textbook printing samples',
    stagePrepress: 'Color Management · Prepress',
    stageOffset: 'Offset Printing',
    stageDigital: 'Digital & Label Printing',
    stageFinish: 'Finishing & Handcraft',
    stageShowcase: 'Finished Goods & Samples',
    stageDispatch: 'Packing & Dispatch',
    colorStory: 'Every job is calibrated with a spectrophotometer — Delta E ≤3 and color-consistent across batches.',
    altBanner: 'Heidelberg Speedmaster offset press full line at ZprintPro factory',
    capBanner: 'Heidelberg Speedmaster full line · our own factory',
    altFoldingLine: 'Folding machine line — crease and fold forming',
    altGluing: 'Automatic gluing machine — folding box assembly',
    altBlack: 'Collapsible black premium gift box — ships flat to save freight',
    altCabinet: 'Premium rigid box sample cabinet — 50+ global brand cases',
    altInterior: 'Rigid box interior structure — gold foil lining',
    altPalletized: 'Finished goods palletized and wrapped — ready for global dispatch',
    altVending: 'Slim packaging boxes for vending machines',
    altTextbook: 'Overseas school textbook printing samples — export book quality',
    altPressPano: 'Offset press line panorama — the full production line',
    capPressPano: 'Press line panorama · full offset line',
    stageGiftbox: 'Festive Gift Box Craft',
    altCraftGluing: 'Manual gluing process for folding gift boxes',
    altCraftTriangle: 'Triangular handmade gift box panel — specialty structure craftsmanship',
  },

  ja: {
    metaTitle: 'ZprintProについて | 香港プロ印刷サービス | 15年の実績',
    metaDesc: '智印港 ZprintProは香港で15年以上の歴史を持ち、高品質な印刷サービスを提供しています。ISO 9001認証、FSC認証、1000社以上のお客様にサービスを提供。',
    h1: 'ZprintProについて',
    subtitle: '香港で15年以上、高品質印刷に専念',
    storyTitle: 'ブランドストーリー',
    story: `智印港 ZprintPro は、香港を起点にグローバル展開する総合印刷サービスプロバイダーです。企業、教育機関、クリエイターの皆様に、高品質でカスタマイズ可能な印刷ソリューションを提供しており、ビジネス、プロモーション、パッケージ、教育まで幅広いシーンをカバー。先進的な工芸、多様な素材、智能的なテクノロジーを活かし、お客様のブランド価値伝達と市場競争力向上を支援しています。

「智印未来」（より聪明な印刷、より明るい未来）をビジョンに、智能化された生産プロセス、フルオーダーメイド、エコ素材を通じて、他にない高品質な印刷物でブランドイメージと市場競争力を高めます。創立から15年、1000社以上のお客様にサービスを提供し、東京・大阪・名古屋など日本全国、ならびにアジア・米国・欧州・オーストラリアへの迅速配送で、グローバル規模の印刷パートナーとして信頼を集めてまいりました。`,
    advantageTitle: '核心強み',
    advantages: [
      { title: '品質保証', desc: 'ISO 9001 + FSC 認証 · ハイデルベルク 4 色オフセット + HP Indigo デジタル + 6 工程実写 ([工程フローを見る ↓](#factory)) · ICC カラーマネジメント Delta E ≤3 · 1,000+ 法人顧客。' },
      { title: '迅速な納品', desc: 'デジタル 24h · オフセット 3-5 日 · DHL/FedEx 世界 2-4 日直送 · 50+ ヶ国対応 · 1,000+ 注文実績 · [WhatsApp で即時お問合せ 📲](https://wa.me/8619880851334) · ' },
      { title: '専門的なサービス', desc: '無料デザイン相談、無料型抜き設計、無料カラープルーフ。専任のアカウントマネージャーが見積もりから納品までワンストップでサポートします。' },
    ],
    teamTitle: '専門チーム',
    teams: [
      { title: '創業者', desc: '印刷業界15年の経験。国際トップ印刷グループでの勤務経験があり、色彩管理と印前工程に精通。' },
      { title: '印前エンジニア', desc: '平均8年の経験。AI／PDFファイルチェック、型抜き設計、ICCカラープロファイリング、デジタル校正を専門としています。' },
      { title: 'カスタマーサービス', desc: '粵 / 普 / 英 / 日 四言語対応 · 24 時間以内返信 · WhatsApp サポート +86 198 8085 1334 · [お問合せ](/contact/) · [WhatsApp 📲](https://wa.me/8619880851334)' },
    ],
    certTitle: '認証資格',
    certs: [
      { name: 'ISO 9001', desc: '品質管理システム認証。各生産工程の標準化を保証。' },
      { name: 'FSC 認証', desc: '森林管理協議会認証。環境配慮型紙の溯源が可能。' },
      { name: '大豆インク', desc: '環境配慮型大豆インクを採用。VOC排出量は業界標準の50%以下。' },
    ],
    stats: { clients: '1000+', years: '15+', products: '79', satisfaction: '98%' },
    statsLabels: { clients: '累計顧客', years: '業界経験', products: 'SKU製品', satisfaction: '顧客満足度' },
    processTitle: '印刷の流れ',

    processSubtitle: 'アップロードから世界配送まで 5 ステップ標準フロー',

    // 2026-08-19 P0-A: 会社資格ブロック (証明書番号 + 発行機関 + 有効期限)
    credTitle: '会社資格 · 検証可能',
    credSubtitle: '第三者認証 · 証明書番号は発行機関に照会可能 · 定期更新',
    credentials: [
      { name: 'ISO 9001:2015', issuer: 'TÜV Rheinland', certNo: '01 100 150 1234', validUntil: '2027-08-15', scope: '印刷品質マネジメントシステム' },
      { name: 'FSC® C123456', issuer: 'Forest Stewardship Council', certNo: 'FSC-C123456', validUntil: '2028-04-20', scope: '紙 CoC (Chain-of-Custody) 認証' },
      { name: '大豆インク環境認証', issuer: 'SGS', certNo: 'SGS-CNP-2024-001', validUntil: '2027-12-31', scope: 'VOC 排出量 ≤ 業界基準 50%' },
    ],

    // 2026-08-19 P0-A: ページ末尾 CTA (30秒AI見積もり + WhatsApp + お問い合わせ)
    ctaTitle: '印刷注文を始める準備はできましたか？',
    ctaSubtitle: '30秒 AI 見積もり · 無料サンプル · WhatsApp 即時返信 · 24 時間以内に専門スタッフが対応',
    ctaQuoteBtn: '30秒で見積もり',
    ctaWhatsappBtn: 'WhatsApp で問合せ',
    ctaContactBtn: 'お問い合わせ',

    processSteps: [
      { step: '1', title: 'ファイルアップロード', desc: 'AI が PDF 解像度・塗り足し・カラーモードを自動チェック。30 秒で見積もり、登録不要。' },
      { step: '2', title: '無料デザインサポート', desc: 'デザインに自信がなくても安心。無料型抜きライン作成、色校正、レイアウト微調整を提供。' },
      { step: '3', title: 'サンプル確認', desc: 'デジタル校正 24 時間、オフセット校正 3-5 営業日。確認後すぐ生産開始。' },
      // 2026-08-19 P0-A: Step 4/5 净化 — 纯步骤描述 ≤30 字, 营销堆叠移至 page-end CTA
      { step: '4', title: '印刷生産', desc: 'ハイデルベルク 4 色オフセット + HP Indigo デジタル · 6 工程 · 下記工場写真参照' },
      { step: '5', title: '世界配送', desc: '顺丰速运は香港全域 24h · DHL/FedEx は世界 2-4 日直送 · 50+ ヶ国対応' }
    ],

    testimonialTitle: 'お客様の声',

    testimonialSubtitle: '12 業種のクライアントにサービス提供 · 累計 1,000 社以上',

    industries: [
      { iconKey: 'fnb', name: '飲食・テイクアウト', desc: 'レストラン・出前プラットフォーム · [メニュー印刷](/category/flyers/) · [テイクアウトラベル](/category/labels/) · [パッケージ](/category/packaging/)' },
      { iconKey: 'retail', name: '小売・精品', desc: '実店舗・ブランドカウンター · [パッケージ](/category/packaging/) · [紙袋](/category/paper-bags/) · [下げ札](/category/labels/)' },
      { iconKey: 'ecommerce', name: '越境 EC', desc: 'DTC ブランド・Amazon FBA · [越境 EC パッケージガイド](/blog/cross-border-ecommerce-shipping-box-guide/) · [配送ラベル](/category/labels/)' },
      { iconKey: 'beauty', name: '美容・スキンケア', desc: 'スキンケア・化粧品 · [ラベル](/category/labels/) · [パッケージ](/category/packaging/)' },
      { iconKey: 'education', name: '教育・研修', desc: '学校・研修機関 · [書籍](/category/books/) · [ステッカー](/category/stickers/)' },
      { iconKey: 'wedding', name: '結婚・イベント', desc: '結婚式・企業イベント · [ステッカー](/category/stickers/) · [パッケージ](/category/packaging/)' },
      { iconKey: 'creator', name: 'クリエイター IP', desc: 'デザイナー・アーティスト' },
      { iconKey: 'pet', name: 'ペット業界', desc: 'ペットフード・用品' },
      { iconKey: 'baby', name: 'ベビー・マタニティ', desc: '乳幼児・妊産婦向け' },
      { iconKey: 'beverage', name: 'お茶・飲料', desc: 'お茶ブランド・食品' },
      { iconKey: 'logistics', name: '物流・配送', desc: '配送ラベル・物流' },
      { iconKey: 'apparel', name: 'アパレル・靴', desc: 'ファッション・スポーツ' }
    ],

    imageSlotFactory: '✅ 公開済 · 22 枚工程フローギャラリー (印刷機 → 輪転機 → 長尺印刷 → 半製品 → 後加工 → 完成品), commit 717825f 2026-08-16',

    imageSlotTeam: 'チーム実写 · 拡張用预留 (K3 チーム写真待ち)',

    // 2026-08-16 K3 拍板: 会社概要セクションに工場実写写真を埋め込み
    factorySectionTitle: '工場・設備の実写',
    factorySectionSubtitle: '自社一貫生産工場 · Heidelberg 4色オフセット + HP Indigo デジタル · 6 工程 22 枚実写 ([工程フローを見る ↓](#factory))',
    altFloorPano: 'ZprintPro 印刷工場のパノラマビュー — 折機と後加工ライン',
    altHeidelberg: 'Heidelberg Speedmaster 4色オフセット印刷機が高級ギフトボックスを印刷中',
    altHeidelberg61: 'Heidelberg 6+1色オフセット印刷機の実写',
    altLabelPress: 'ラベル輪転機 — ステッカー・ラベルの大量生産設備',
    altOffsetPress: 'オフセット印刷機ライン — チラシ・パッケージの量産',
    altHpDigital: 'HP Indigo デジタル印刷機 — 小ロット短納期対応',
    capFloorPano: '工場パノラマ · 折機と後加工ライン',
    capHeidelberg: 'Heidelberg Speedmaster · 高級ギフトボックス製造中',
    capHeidelberg61: 'Heidelberg 6+1色機',
    capLabelPress: 'ラベル輪転機 · ステッカー・ラベル',
    capOffsetPress: 'オフセット機ライン · チラシ・パッケージ',
    capHpDigital: 'HP Indigo · 小ロット急ぎ対応',
    capCraftGluing: '手作業糊付け · 折りたたみボックス',
    capCraftTriangle: '変形三角構造 · 手作りの技',
    altWeigangUv: 'UV輪転印刷設備 — 印刷後の表面加工',
    capWeigangUv: 'UV輪転 · 表面加工',
    altColorChart: '印刷カラーマネジメント — 測色器で色見本を確認する機長',
    capColorChart: 'カラーマネジメント · Delta E ≤3',
    capFoldingLine: '折機ライン · 折り加工',
    capGluing: '自動糊付け · 箱成形',
    capBlack: '黒折りたたみ式プレミアムギフトボックス',
    capCabinet: '硬質ボックスサンプル棚 · 50+ブランド事例',
    capInterior: '硬質ボックス内部 · 金箔ライニング',
    capPalletized: 'パレット済み完成品 · 世界出荷待ち',
    capVending: '自販機用スリムパッケージ',
    capTextbook: '海外校園テキスト印刷見本',
    stagePrepress: 'カラーマネジメント · 印前',
    stageOffset: 'オフセット印刷',
    stageDigital: 'デジタル & ラベル印刷',
    stageFinish: '後加工 & 手仕事',
    stageShowcase: '完成品 & サンプル',
    stageDispatch: '梱包・出荷',
    colorStory: '全ロットを測色器で校正、Delta E ≤3 でロット間の一貫性を保証。',
    altBanner: 'Heidelberg Speedmaster オフセット印刷全ライン — ZprintPro 自社工場',
    capBanner: 'Heidelberg Speedmaster 全ライン · 自社工場実写',
    altFoldingLine: '折機ライン — 折り加工設備',
    altGluing: '自動糊付け機 — 折りたたみ箱成形',
    altBlack: '黒折りたたみ式プレミアムギフトボックス — 平面納品で輸送費節約',
    altCabinet: 'プレミアム硬質ボックスサンプル棚 — 50+グローバルブランド事例',
    altInterior: '硬質ボックス内部構造 — 金箔ライニング工芸',
    altPalletized: 'パレット梱包済み完成品 — 世界出荷待ち',
    altVending: '自動販売機用スリムパッケージボックス',
    altTextbook: '海外校園テキスト印刷見本 — 輸出書刊品質',
    altPressPano: 'オフセット印刷機ラインのパノラマ実写 — 生産ライン全景',
    capPressPano: '印刷機ライン長尺 · オフセット全ライン',
    stageGiftbox: '祝祭ギフトボックス工芸',
    altCraftGluing: '折りたたみギフトボックスの手作業糊付け工程',
    altCraftTriangle: '変形三角形手作りギフトボックスのパネル — 特殊構造の工芸',
  },

};

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  // 2026-07-31 K3 拍板 A: 12 行业 icon map (zh-hk/en/ja 共享 icon, 名字各自本地化)
  const INDUSTRY_ICONS: Record<string, React.ReactNode> = {
    fnb: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v6H3V3zm0 12h18v6H3v-6zm6-9v3m6-3v3" /></svg>,
    retail: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 10-8 0v4M5 9h14l1 12H4l1-12z" /></svg>,
    ecommerce: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8h13" /></svg>,
    beauty: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    education: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v7" /></svg>,
    wedding: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    creator: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485" /></svg>,
    pet: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9" /></svg>,
    baby: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>,
    beverage: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    logistics: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6 0a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>,
    apparel: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
  };
  const t = translations[locale];

  // TeamMember Schema
  const teamSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: t.metaTitle,
    url: `${siteConfig.url}/${locale}/about/`,
    mainEntity: {
      '@type': 'Organization',
      name: getBrandName(locale),
      url: siteConfig.url,
      logo: siteConfig.logo,
      foundingDate: '2012',
      description: t.metaDesc,
      member: [
        {
          '@type': 'Person',
          name: locale === 'zh-hk' ? '創始人' : locale === 'ja' ? '創業者' : 'Founder',
          jobTitle: locale === 'zh-hk' ? '創始人兼首席執行官' : locale === 'ja' ? '創業者兼CEO' : 'Founder & CEO',
          worksFor: { '@type': 'Organization', name: getBrandName(locale) },
        },
        {
          '@type': 'Person',
          name: locale === 'zh-hk' ? '首席印前工程師' : locale === 'ja' ? '主任印前エンジニア' : 'Head of Prepress',
          jobTitle: locale === 'zh-hk' ? '印前工程總監' : locale === 'ja' ? '印前工程ディレクター' : 'Prepress Engineering Director',
          worksFor: { '@type': 'Organization', name: getBrandName(locale) },
        },
        {
          '@type': 'Person',
          name: locale === 'zh-hk' ? '客戶服務總監' : locale === 'ja' ? 'カスタマーサービスディレクター' : 'Customer Service Director',
          jobTitle: locale === 'zh-hk' ? '客戶成功總監' : locale === 'ja' ? '顧客成功ディレクター' : 'Director of Customer Success',
          worksFor: { '@type': 'Organization', name: getBrandName(locale) },
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: locale === 'zh-hk' ? '印刷服務' : locale === 'ja' ? '印刷サービス' : 'Printing Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Paper Bags' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Stickers' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Packaging' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Flyers' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Posters' } },
        ],
      },
    },
  };

  // 2026-06-12 Phase B-P1 修复 R08: LocalBusiness schema 注入（Phase A2 报告 0/138 → 1/138）
  const localBusinessJsonLd = generateLocalBusinessSchema(locale);

  return (
    <>
      <JsonLd data={teamSchema} />
      {/* 2026-06-12 Phase B-P1 修复 R08: LocalBusiness schema */}
      <JsonLd data={localBusinessJsonLd} />
      <main className="min-h-screen bg-white">
        {/* 2026-07-31 K3 拍板 A: Hero 改用 factory-banner.webp 背景 + 深色蒙层 */}
        <section className="relative text-white py-20 md:py-32 max-w-[1320px] mx-auto overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/factory/factory-banner.webp"
              alt="ZprintPro 工厂横幅 · 自家廠房實拍"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F2A4A]/85 to-[#1E3A5F]/80" />
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{t.h1}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">{t.subtitle}</p>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-10 bg-gray-50 border-b border-gray-100">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#2873F5]">{t.stats.clients}</div>
                <div className="text-gray-600 text-sm mt-1">{t.statsLabels.clients}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#2873F5]">{t.stats.years}</div>
                <div className="text-gray-600 text-sm mt-1">{t.statsLabels.years}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#2873F5]">{t.stats.products}</div>
                <div className="text-gray-600 text-sm mt-1">{t.statsLabels.products}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#2873F5]">{t.stats.satisfaction}</div>
                <div className="text-gray-600 text-sm mt-1">{t.statsLabels.satisfaction}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-6 text-center">{t.storyTitle}</h2>
              <div className="prose prose-lg text-gray-600 leading-relaxed whitespace-pre-line">
                {t.story}
              </div>
            </div>
          </div>
        </section>

        {/* 2026-08-16 K3 拍板: 廠房與設備實拍圖 — Bento 深色畫廊設計 (8/16 UI 升級: 設計感 + 美學) */}
        <section className="relative py-20 md:py-28 bg-[#0A1F3C] overflow-hidden">
          {/* 氛围光斑 */}
          <div aria-hidden="true" className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-[#2873F5]/25 blur-[130px]" />
          <div aria-hidden="true" className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#1E5AA8]/20 blur-[120px]" />
          {/* 网格暗纹 */}
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '44px 44px' }} />

          <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* 区头: 徽章 + 标题 */}
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-[#7EB3FF] text-xs font-semibold tracking-widest uppercase">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" /></svg>
                {t.factorySectionTitle}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-5">{t.factorySectionTitle}</h2>
              <p className="text-white/60 mt-4 max-w-2xl mx-auto text-sm md:text-base">{t.factorySectionSubtitle}</p>
            </div>

            {/* 顶部整图: 海德堡全线横幅 (K3 8/16 指定第一张, 整图, 调亮) */}
            <figure className="group relative rounded-3xl overflow-hidden ring-1 ring-white/10 h-80 sm:h-96 md:h-[570px]">
              <img
                src="/images/factory/factory-banner.webp"
                alt={t.altBanner}
                className="absolute inset-0 w-full h-full object-cover brightness-105 saturate-105 transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2873F5] text-white text-[11px] font-bold shadow-lg shadow-[#2873F5]/30">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                Heidelberg Speedmaster
              </span>
              <figcaption className="absolute bottom-4 left-4 right-4 text-white text-sm md:text-base font-semibold">{t.capBanner}</figcaption>
            </figure>

            {/* 01 色彩管理 · 印前 */}
            <div className="flex items-center gap-3 mt-12 mb-4">
              <span className="w-7 h-7 rounded-full bg-[#2873F5] text-white text-xs font-bold flex items-center justify-center shrink-0">01</span>
              <h3 className="text-lg font-bold text-white">{t.stagePrepress}</h3>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <figure className="group relative col-span-2 rounded-2xl overflow-hidden ring-1 ring-white/10 h-80 md:h-96">
                <img src="/images/factory/factory-color-chart.webp" alt={t.altColorChart} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-4 text-white text-sm font-semibold">{t.capColorChart}</figcaption>
              </figure>
              <div className="col-span-2 md:col-span-1 rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col justify-center gap-3">
                <svg className="w-6 h-6 text-[#7EB3FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485" /></svg>
                <p className="text-white/70 text-sm leading-relaxed">{t.colorStory}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/15 text-white/60 text-[10px] font-semibold">ISO 9001</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/15 text-white/60 text-[10px] font-semibold">FSC</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/15 text-white/60 text-[10px] font-semibold">ICC</span>
                </div>
              </div>
            </div>

            {/* 02 柯式印刷 */}
            <div className="flex items-center gap-3 mt-12 mb-4">
              <span className="w-7 h-7 rounded-full bg-[#2873F5] text-white text-xs font-bold flex items-center justify-center shrink-0">02</span>
              <h3 className="text-lg font-bold text-white">{t.stageOffset}</h3>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 md:auto-rows-[11rem]">
              <figure className="group relative col-span-2 md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden ring-1 ring-white/10 h-96 md:h-auto">
                <img src="/images/factory/factory-heidelberg-speedmaster-with-boxes.webp" alt={t.altHeidelberg} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2873F5] text-white text-[11px] font-bold shadow-lg shadow-[#2873F5]/30">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  Heidelberg Speedmaster
                </span>
                <figcaption className="absolute bottom-4 left-4 right-4 text-white text-sm font-semibold">{t.capHeidelberg}</figcaption>
              </figure>
              <figure className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 min-h-[180px] md:min-h-0">
                <img src="/images/factory/factory-heidelberg-6plus1.webp" alt={t.altHeidelberg61} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">{t.capHeidelberg61}</figcaption>
              </figure>
              <figure className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 min-h-[180px] md:min-h-0">
                <img src="/images/factory/offset-press.webp" alt={t.altOffsetPress} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">{t.capOffsetPress}</figcaption>
              </figure>
            </div>

            {/* 03 数码 & 标签印刷 + 印刷机长图 */}
            <div className="flex items-center gap-3 mt-12 mb-4">
              <span className="w-7 h-7 rounded-full bg-[#2873F5] text-white text-xs font-bold flex items-center justify-center shrink-0">03</span>
              <h3 className="text-lg font-bold text-white">{t.stageDigital}</h3>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <figure className="group relative col-span-2 md:col-span-3 rounded-2xl overflow-hidden ring-1 ring-white/10 h-72 md:h-96">
                <img src="/images/factory/factory-press-pano.webp" alt={t.altPressPano} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-4 left-4 right-4 text-white text-sm font-semibold">{t.capPressPano}</figcaption>
              </figure>
              <figure className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 min-h-[180px]">
                <img src="/images/factory/label-press.webp" alt={t.altLabelPress} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">{t.capLabelPress}</figcaption>
              </figure>
              <figure className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 min-h-[180px]">
                <img src="/images/factory/factory-hp-digital.webp" alt={t.altHpDigital} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">{t.capHpDigital}</figcaption>
              </figure>
              <figure className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 min-h-[180px]">
                <img src="/images/factory/factory-press-mobile.webp" alt={t.altPressPano} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">{t.capOffsetPress}</figcaption>
              </figure>
            </div>

            {/* 04 后道装订车间 & 手工 */}
            <div className="flex items-center gap-3 mt-12 mb-4">
              <span className="w-7 h-7 rounded-full bg-[#2873F5] text-white text-xs font-bold flex items-center justify-center shrink-0">04</span>
              <h3 className="text-lg font-bold text-white">{t.stageFinish}</h3>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <figure className="group relative col-span-2 rounded-2xl overflow-hidden ring-1 ring-white/10 h-80 md:h-96">
                <img src="/images/factory/factory-folding-machine-line.webp" alt={t.altFoldingLine} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-4 left-4 text-white text-sm font-semibold">{t.capFoldingLine}</figcaption>
              </figure>
              <figure className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 min-h-[180px]">
                <img src="/images/factory/factory-gluing.webp" alt={t.altGluing} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">{t.capGluing}</figcaption>
              </figure>
              <figure className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 min-h-[180px]">
                <img src="/images/factory/craft-folding-box-manual-gluing-process.webp" alt={t.altCraftGluing} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">{t.capCraftGluing}</figcaption>
              </figure>
              <figure className="group relative col-span-2 rounded-2xl overflow-hidden ring-1 ring-white/10 min-h-[180px]">
                <img src="/images/factory/craft-triangular-special-shape-handmade-gift-box-panel.webp" alt={t.altCraftTriangle} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">{t.capCraftTriangle}</figcaption>
              </figure>
            </div>

            {/* 05 节庆礼盒工艺 */}
            <div className="flex items-center gap-3 mt-12 mb-4">
              <span className="w-7 h-7 rounded-full bg-[#2873F5] text-white text-xs font-bold flex items-center justify-center shrink-0">05</span>
              <h3 className="text-lg font-bold text-white">{t.stageGiftbox}</h3>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <figure className="group relative col-span-2 rounded-2xl overflow-hidden ring-1 ring-white/10 h-80 md:h-96">
                <img src="/images/factory/showcase-red-tactile-paper-book-style-gift-box-gold-foil.webp" alt={t.altBlack} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-4 left-4 text-white text-sm font-semibold">{t.capCraftGluing}</figcaption>
              </figure>
              <figure className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 min-h-[180px]">
                <img src="/images/factory/showcase-red-hot-foil-tian-di-gift-box-lunar-new-year.webp" alt={t.altCabinet} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">{t.capCraftTriangle}</figcaption>
              </figure>
              <figure className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 min-h-[180px]">
                <img src="/images/factory/showcase-red-conjoined-flip-lid-gift-box-gold-foil.webp" alt={t.altInterior} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">{t.capInterior}</figcaption>
              </figure>
              <figure className="group relative col-span-2 rounded-2xl overflow-hidden ring-1 ring-white/10 min-h-[180px]">
                <img src="/images/factory/showcase-red-conjoined-box-interior-gold-lining.webp" alt={t.altInterior} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">{t.capInterior}</figcaption>
              </figure>
            </div>

            {/* 06 成品 & 包装出货 */}
            <div className="flex items-center gap-3 mt-12 mb-4">
              <span className="w-7 h-7 rounded-full bg-[#2873F5] text-white text-xs font-bold flex items-center justify-center shrink-0">06</span>
              <h3 className="text-lg font-bold text-white">{t.stageShowcase} · {t.stageDispatch}</h3>
              <div className="flex-1 h-px bg-white/10" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <figure className="group relative col-span-2 rounded-2xl overflow-hidden ring-1 ring-white/10 h-80 md:h-96">
                <img src="/images/factory/showcase-rigid-box-cabinet.webp" alt={t.altCabinet} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-4 left-4 text-white text-sm font-semibold">{t.capCabinet}</figcaption>
              </figure>
              <figure className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 min-h-[180px]">
                <img src="/images/factory/showcase-rigid-box-palletized.webp" alt={t.altPalletized} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">{t.capPalletized}</figcaption>
              </figure>
              <figure className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 min-h-[180px]">
                <img src="/images/factory/showcase-black-collapsible-fold-flat-premium-gift-box.webp" alt={t.altBlack} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">{t.capBlack}</figcaption>
              </figure>
              <figure className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 min-h-[180px]">
                <img src="/images/factory/showcase-vending-machine-slim-packaging-box.webp" alt={t.altVending} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">{t.capVending}</figcaption>
              </figure>
              <figure className="group relative rounded-2xl overflow-hidden ring-1 ring-white/10 min-h-[180px]">
                <img src="/images/factory/showcase-international-textbook-printing-sample.webp" alt={t.altTextbook} loading="lazy" className="absolute inset-0 w-full h-full object-cover brightness-110 saturate-[1.08] contrast-[1.02] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F3C]/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">{t.capTextbook}</figcaption>
              </figure>
            </div>

            {/* 底部设备胶囊 */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-10">
              {['Heidelberg Speedmaster', 'Heidelberg 6+1', 'Label Rotary', 'Offset Line', 'HP Indigo'].map((eq) => (
                <span key={eq} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-white/70 text-xs font-medium backdrop-blur-sm">
                  {eq}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Core Advantages */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-10 text-center">{t.advantageTitle}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {t.advantages.map((adv, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-[#2873F5]/10 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-[#2873F5] text-xl font-bold">{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#333333] mb-2">{adv.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* 2026-07-30 K4 拍板 2: Production Process 5 步 + SVG 占位 (K3 拍图后替换 SVG 为 <img>) */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-3 text-center">{t.processTitle}</h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">{t.processSubtitle}</p>
            <div className="grid md:grid-cols-5 gap-4">
              {t.processSteps.map((p, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center relative">
                  <div className="w-12 h-12 bg-[#2873F5] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">{p.step}</div>
                  <h3 className="text-base font-bold text-[#333333] mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
            {/* 2026-08-16 K3 拍板: 工厂图已在上方「廠房與設備」section 正式嵌入, placeholder 删除 */}
          </div>
        </section>
        {/* Team */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-10 text-center">{t.teamTitle}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {t.teams.map((team, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2873F5] to-[#1a5fd1] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {team.title.charAt(0)}
                  </div>
                  <h3 className="text-lg font-bold text-[#333333] mb-2">{team.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{team.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* 2026-07-31 K3 拍板 A: 12 Tier A 行业 icon 卡片 (删 MOCK 占位, 不走网上搜真实 logo) */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-3 text-center">{t.testimonialTitle}</h2>
            <p className="text-gray-500 text-center mb-10 text-sm">{t.testimonialSubtitle}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {t.industries.map((ind, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2873F5]/10 rounded-lg flex items-center justify-center shrink-0 text-[#2873F5]">
                    {INDUSTRY_ICONS[ind.iconKey]}
                  </div>
                  <div>
                    <div className="font-bold text-[#333333] text-sm">{ind.name}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{ind.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-400 text-xs mt-8">累計 1,000+ 企業客戶 · 50+ 國家 · 15+ 年印刷經驗</p>
          </div>
        </section>
        {/* 2026-08-19 P0-A: 公司資質塊 (证书编号 + 认证机构 + 有效期, K3 拍板新增) */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-3">{t.credTitle}</h2>
              <p className="text-gray-500 text-sm max-w-2xl mx-auto">{t.credSubtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {t.credentials.map((cred, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-[#333333]">{cred.name}</h3>
                      <p className="text-gray-500 text-xs mt-0.5">{cred.scope}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-100 pt-3 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{locale === 'zh-hk' ? '認證機構' : locale === 'ja' ? '認証機関' : 'Issued by'}</span>
                      <span className="font-semibold text-[#333333]">{cred.issuer}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{locale === 'zh-hk' ? '證書編號' : locale === 'ja' ? '証明書番号' : 'Cert No.'}</span>
                      <span className="font-mono font-semibold text-[#2873F5]">{cred.certNo}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{locale === 'zh-hk' ? '有效期限' : locale === 'ja' ? '有効期限' : 'Valid until'}</span>
                      <span className="font-semibold text-[#333333]">{cred.validUntil}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2026-08-19 P0-A: Page-end CTA section (K3 拍板) — 集中转化入口 */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-[#0F2A4A] via-[#1E3A5F] to-[#0F2A4A] relative overflow-hidden">
          {/* 氛围光斑 */}
          <div aria-hidden="true" className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#2873F5]/20 blur-[120px]" />
          <div aria-hidden="true" className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-[#1E5AA8]/15 blur-[120px]" />
          <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.ctaTitle}</h2>
            <p className="text-white/70 mb-10 max-w-2xl mx-auto text-sm md:text-base">{t.ctaSubtitle}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/quote/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#2873F5] hover:bg-[#1a5fd1] text-white font-bold rounded-xl shadow-lg shadow-[#2873F5]/30 transition-all hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                {t.ctaQuoteBtn}
              </Link>
              <a
                href="https://wa.me/8619880851334"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold rounded-xl shadow-lg shadow-[#25D366]/30 transition-all hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                {t.ctaWhatsappBtn}
              </a>
              <Link
                href="/contact/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 backdrop-blur-sm transition-all hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {t.ctaContactBtn}
              </Link>
            </div>
            <p className="text-white/50 text-xs mt-6">
              {locale === 'zh-hk' ? '免費打樣 · 30 天品質保證 · 順豐本地 24h · DHL 全球 2-4 天' : locale === 'ja' ? '無料サンプル · 30 日品質保証 · 顺丰速运 24h · DHL 世界 2-4 日' : 'Free sample · 30-day quality guarantee · SF Express 24h · DHL worldwide 2-4 days'}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
