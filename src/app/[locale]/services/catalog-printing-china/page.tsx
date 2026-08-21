import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Factory, Zap, Package, Truck, Award, ShieldCheck, ChevronRight, Check } from 'lucide-react';
import { Locale, generateServiceJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { generateWhatsAppLink } from '@/lib/whatsapp';

export function generateStaticParams() {
  return [
    { locale: 'zh-hk' },
    { locale: 'en' },
    { locale: 'ja' },
  ];
}

type Props = {
  params: { locale: Locale };
};

const metaMap: Record<string, { title: string; desc: string; keywords: string }> = {
  'zh-hk': {
    title: 'China Catalog Printing | 50 MOQ + Shenzhen Factory + DHL 2-4 Days | 智印港 ZprintPro',
    desc: 'China catalog printing from Shenzhen factory, 50 MOQ, free file check, 24h quote, DHL 2-4 day global delivery. Catalog, brochure, magazine, lookbook, wholesale bulk pricing. 30-second AI quote. ISO 9001 + FSC certified.',
    keywords: 'china catalog printing,china printing factory,print catalog china,bulk catalog printing,wholesale catalog printing,cheap catalog printing,shenzhen printing factory,asia printing factory,low moq catalog printing,catalog printing 100,fast catalog printing,catalog printing usa,catalog printing europe,catalog printing uk,custom catalog printing,booklet printing china',
  },
  'en': {
    title: 'China Catalog Printing | 50 MOQ + Shenzhen Factory + DHL 2-4 Days | ZprintPro',
    desc: 'China catalog printing from Shenzhen factory, 50 MOQ, free file check, 24h quote, DHL 2-4 day global delivery. Catalog, brochure, magazine, lookbook, wholesale bulk pricing. 30-second AI quote. ISO 9001 + FSC certified. Save 30-40% vs Western printers.',
    keywords: 'china catalog printing,china printing factory,print catalog china,bulk catalog printing,wholesale catalog printing,cheap catalog printing,shenzhen printing factory,asia printing factory,low moq catalog printing,catalog printing 100,fast catalog printing,catalog printing usa,catalog printing europe,catalog printing uk,custom catalog printing,booklet printing china,magazine printing china,brochure printing china,lookbook printing china',
  },
  'ja': {
    title: '中国カタログ印刷｜50部から・深セン工場・DHL 2-4日｜ZprintPro',
    desc: '中国深セン工場からのカタログ印刷、50部から対応、無料ファイルチェック、24時間見積もり、DHL国際配送2-4日。カタログ・パンフレット・雑誌・ルックブック・大量卸価格。30秒AI無料見積もり。ISO 9001 + FSC認証。',
    keywords: '中国カタログ印刷,中国印刷工場,深セン印刷工場,大量カタログ印刷,卸売カタログ印刷,安いカタログ印刷,小ロットカタログ印刷,カタログ印刷 50部,即納カタログ印刷,カタログ印刷 アメリカ,カタログ印刷 ヨーロッパ,カスタムカタログ印刷,冊子印刷 中国',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  if (!['zh-hk', 'en', 'ja'].includes(locale)) notFound();
  const m = metaMap[locale];
  return {
    title: m.title,
    description: m.desc,
    keywords: m.keywords,
    alternates: {
      canonical: `https://zprintpro.com/${locale}/services/catalog-printing-china/`,
      languages: {
        'zh-HK': 'https://zprintpro.com/zh-hk/services/catalog-printing-china/',
        'en': 'https://zprintpro.com/en/services/catalog-printing-china/',
        'ja': 'https://zprintpro.com/ja/services/catalog-printing-china/',
        'x-default': 'https://zprintpro.com/zh-hk/services/catalog-printing-china/',
      },
    },
  };
}

const T: Record<string, {
  heroTitle: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  h2_advantage: string;
  advantageIntro: string;
  hammerA_title: string;
  hammerA_desc: string;
  hammerA_items: string[];
  hammerB_title: string;
  hammerB_desc: string;
  hammerB_items: string[];
  hammerC_title: string;
  hammerC_desc: string;
  hammerC_items: string[];
  h2_keywords: string;
  keywordsIntro: string;
  keyword_clusters: Array<{ kw: string; intent: string; volume: string }>;
  h2_pricing: string;
  pricingIntro: string;
  pricing_table: Array<{ qty: string; price: string; perUnit: string; turnaround: string }>;
  h2_trust: string;
  trustItems: Array<{ title: string; desc: string }>;
  h2_compare: string;
  compareIntro: string;
  compareHeaders: string[];
  compareRows: Array<{ feature: string; us: string; qin: string; usBetter: boolean }>;
  h2_faq: string;
  faqs: Array<{ q: string; a: string }>;
  h2_cta: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
  altBanner: string;
  altFactory: string;
  altCatalog1: string;
  altCatalog2: string;
  altCatalog3: string;
  trustBadge1: string;
  trustBadge2: string;
  trustBadge3: string;
  trustBadge4: string;
  kwClusterLabel: string;
  volumeLabel: string;
  intentLabel: string;
  unitLabel: string;
  turnaroundLabel: string;
  fromLabel: string;
  featureLabel: string;
  usLabel: string;
  qinLabel: string;
  qa_intro: string;
}> = {
  'zh-hk': {
    heroTitle: 'China Catalog Printing — Shenzhen Factory Direct, 50 MOQ, DHL 2-4 Days',
    heroSubtitle: '從深圳工廠直送全球嘅 catalog / brochure / magazine / lookbook 印刷, 50 本起印, 30 秒 AI 即時報價, ISO 9001 + FSC 認證. 對比歐美印刷廠慳 30-40%.',
    ctaPrimary: 'WhatsApp 19880851334 即時報價',
    ctaSecondary: '查看材料樣本',
    h2_advantage: '三錘碾壓：30 秒 AI 報價 / MOQ 50 / DHL 2-4 天',
    advantageIntro: '對標 QinPrinting 上海 (Trustpilot 4.9/327 條), 我方三錘碾壓歐美傳統印刷廠:',
    hammerA_title: '錘 1 · 30 秒 AI 即時報價',
    hammerA_desc: '傳統工廠 24 小時人工報價, 旺季延遲 3-5 天. 我方 30 秒 AI 報價, 365×24 即時.',
    hammerA_items: ['30 秒即時報價 (vs 24 小時人工)', '365×24 不打烊 (vs 工作日 9-6)', '報價含運費稅費 (vs 後加隱藏費用)'],
    hammerB_title: '錘 2 · MOQ 50 + 免費打樣',
    hammerB_desc: 'QinPrinting MOQ 100, 歐美工廠 MOQ 500-1000. 我方 MOQ 50 + 免費 file check, 新品試產零門檻.',
    hammerB_items: ['MOQ 50 本 (vs 100 本)', '免費 file check (vs 收費 $50/次)', '5 天數碼打樣 (vs 7-10 天)'],
    hammerC_title: '錘 3 · DHL 2-4 天全球直送',
    hammerC_desc: '深圳直飛香港 24 小時, DHL 2-4 天到美國/英國/澳洲. 歐美傳統工廠 3-10 天.',
    hammerC_items: ['DHL Express 2-4 天 (vs 3-10 天)', 'DDP 完稅到門 (vs 收件人自付稅)', '深圳直發 (vs 中轉倉延遲)'],
    h2_keywords: 'China Catalog Printing 5 大關鍵詞集群',
    keywordsIntro: '我方一頁網盡 china catalog 印刷 5 大變體詞 + bulk/wholesale 集群, 一次著陸 = 多詞命中:',
    keyword_clusters: [
      { kw: 'china catalog printing', intent: '跨境大單 (主詞)', volume: '~32 imps/週' },
      { kw: 'china printing factory', intent: '尋源意圖明確', volume: '~18 imps/週' },
      { kw: 'shenzhen printing factory', intent: '產地直擊', volume: '~12 imps/週' },
      { kw: 'bulk catalog printing', intent: 'B2B 批量', volume: '~14 imps/週' },
      { kw: 'wholesale catalog printing', intent: 'B2B 批發', volume: '~10 imps/週' },
    ],
    h2_pricing: '4 檔實價表 (50-1000 本)',
    pricingIntro: '對比 QinPrinting 省 30-40%, 對比歐美省 50-60%. 透明定價, 報價含運費 + 完稅 (DDP):',
    pricing_table: [
      { qty: '50 本', price: 'HK$ 1,250', perUnit: 'HK$ 25 / 本', turnaround: '5 天' },
      { qty: '100 本', price: 'HK$ 1,800', perUnit: 'HK$ 18 / 本', turnaround: '5 天' },
      { qty: '300 本', price: 'HK$ 3,900', perUnit: 'HK$ 13 / 本', turnaround: '7 天' },
      { qty: '1000 本', price: 'HK$ 11,000', perUnit: 'HK$ 11 / 本', turnaround: '10 天' },
    ],
    h2_trust: '信任錘：深圳工廠實拍 + 質量保證',
    trustItems: [
      { title: 'ISO 9001 認證', desc: '深圳工廠通過 ISO 9001:2015 質量管理體系認證, 16 年印刷經驗' },
      { title: 'FSC 認證紙張', desc: '所有紙張 FSC 認證, 可持續森林採購, 歐美品牌首選' },
      { title: 'FDA 食品級油墨', desc: '大豆油墨 + 食品級油墨可選, 化妝品 / 食品 catalog 適用' },
      { title: 'DDP 完稅到門', desc: '深圳直發 DHL Express 2-4 天, 收件人零稅務負擔 (DDP 預付)' },
    ],
    h2_compare: '我方 vs 歐美工廠 vs QinPrinting 對比',
    compareIntro: '一頁看清三個選項的核心差異 — 跨境大單決勝於這 5 個指標:',
    compareHeaders: ['指標', 'ZprintPro (深圳)', '歐美本地工廠'],
    compareRows: [
      { feature: '報價速度', us: '30 秒 AI 報價', qin: '24-72 小時人工', usBetter: true },
      { feature: '最低起印量 (MOQ)', us: '50 本', qin: '500-1000 本', usBetter: true },
      { feature: '單本成本 (100 本)', us: 'HK$ 18 / 本 (US$2.30)', qin: 'US$5-8 / 本', usBetter: true },
      { feature: '全球配送', us: 'DHL 2-4 天 DDP', qin: '本地配送 5-10 天', usBetter: true },
      { feature: '樣書打樣', us: '免費 5 天', qin: '收費 $50-200 / 次', usBetter: true },
    ],
    h2_faq: '常見問題 (FAQ)',
    faqs: [
      { q: '深圳工廠品質點樣保證？', a: '深圳工廠 16 年印刷經驗, ISO 9001:2015 認證, FSC 紙張認證, FDA 食品級油墨. 每批出貨前 100% QC 抽樣, 損壞率 < 0.5%. 出貨影片可即時提供.' },
      { q: 'MOQ 真係 50 本？', a: '係, 50 本起印, 採用柯式數碼混合印刷. 1000 本以上純柯式印刷, 單價更低. 樣書打樣可低至 1 本 (按成本收費).' },
      { q: '從深圳運去美國要幾耐？要交稅嗎？', a: 'DHL Express 2-4 個工作天到達美國 / 英國 / 澳洲. DDP (Delivered Duty Paid) 完稅到門, 收件人零稅務負擔, 唔需要額外付關稅或 VAT.' },
      { q: '可以先打樣確認再批量生產嗎？', a: '可以, 5 天數碼打樣 (1-3 本), 確認滿意後批量生產可全額抵扣. 樣書費用透明, 比歐美便宜 80%.' },
    ],
    h2_cta: '即刻開始 — 30 秒 AI 即時報價',
    ctaTitle: 'WhatsApp 19880851334 報價',
    ctaDesc: '提交尺寸 + 頁數 + 數量 → 30 秒 AI 即時報價 + 5 天打樣確認 + DHL 2-4 天全球直送',
    ctaButton: 'WhatsApp 19880851334 即時報價',
    altBanner: 'China Catalog Printing — Shenzhen Factory Direct Banner | ZprintPro',
    altFactory: 'Shenzhen Printing Factory 16 Year ISO 9001 Workshop | ZprintPro',
    altCatalog1: 'A4 Saddle Stitch Catalog 100pcs Glossy Art Paper | ZprintPro China Printing',
    altCatalog2: 'Square 210x210mm Lookbook Perfect Bound 50pcs Premium | ZprintPro China Catalog',
    altCatalog3: 'A5 Brochure 300pcs Bulk Wholesale | ZprintPro China Printing Factory',
    trustBadge1: 'ISO 9001 認證',
    trustBadge2: 'FSC 紙張',
    trustBadge3: 'DDP 完稅',
    trustBadge4: 'DHL 2-4 天',
    kwClusterLabel: '關鍵詞',
    volumeLabel: '週展示',
    intentLabel: '搜索意圖',
    unitLabel: '單價',
    turnaroundLabel: '交期',
    fromLabel: '起',
    featureLabel: '指標',
    usLabel: 'ZprintPro (深圳)',
    qinLabel: '歐美本地工廠',
    qa_intro: '以下是我們客戶最常問的問題, 希望幫你快速做決定. WhatsApp 19880851334 即時查詢.',
  },
  'en': {
    heroTitle: 'China Catalog Printing — Shenzhen Factory Direct, 50 MOQ, DHL 2-4 Days',
    heroSubtitle: 'Catalog / brochure / magazine / lookbook printing from our Shenzhen factory, 50 MOQ, 30-second AI quote, ISO 9001 + FSC certified. Save 30-40% vs Western printers.',
    ctaPrimary: 'WhatsApp 19880851334 for instant quote',
    ctaSecondary: 'Request material samples',
    h2_advantage: 'Three Hammers: 30s AI Quote / 50 MOQ / DHL 2-4 Days',
    advantageIntro: 'Benchmarked against QinPrinting Shanghai (Trustpilot 4.9/327 reviews), our three hammers crush Western printers:',
    hammerA_title: 'Hammer 1 · 30-Second AI Instant Quote',
    hammerA_desc: 'Traditional factories quote in 24 hours (3-5 days in peak season). Our 30-second AI quote is always on, 365×24.',
    hammerA_items: ['30-second quote (vs 24-hour manual)', '365×24 always-on (vs 9-6 weekdays)', 'Quote includes shipping + duty (vs hidden fees)'],
    hammerB_title: 'Hammer 2 · 50 MOQ + Free File Check',
    hammerB_desc: 'QinPrinting MOQ 100, Western factories MOQ 500-1000. We offer 50 MOQ + free file check — zero barrier for new product testing.',
    hammerB_items: ['50 pcs MOQ (vs 100 pcs)', 'Free file check (vs $50/charge)', '5-day digital proof (vs 7-10 days)'],
    hammerC_title: 'Hammer 3 · DHL 2-4 Days Global Delivery',
    hammerC_desc: 'Shenzhen direct to Hong Kong 24 hours, DHL 2-4 days to US/UK/AU. Western printers need 3-10 days.',
    hammerC_items: ['DHL Express 2-4 days (vs 3-10 days)', 'DDP duty pre-paid (vs recipient pays)', 'Shenzhen direct (vs transit warehouse)'],
    h2_keywords: '5 China Catalog Printing Keyword Clusters',
    keywordsIntro: 'One landing page covers all 5 China catalog printing variants + bulk/wholesale — single page, multi-keyword capture:',
    keyword_clusters: [
      { kw: 'china catalog printing', intent: 'Cross-border bulk (primary)', volume: '~32 imps/week' },
      { kw: 'china printing factory', intent: 'Sourcing intent clear', volume: '~18 imps/week' },
      { kw: 'shenzhen printing factory', intent: 'Origin-targeted', volume: '~12 imps/week' },
      { kw: 'bulk catalog printing', intent: 'B2B bulk order', volume: '~14 imps/week' },
      { kw: 'wholesale catalog printing', intent: 'B2B wholesale', volume: '~10 imps/week' },
    ],
    h2_pricing: '4-Tier Real Pricing (50-1000 pcs)',
    pricingIntro: 'Save 30-40% vs QinPrinting, 50-60% vs Western printers. Transparent pricing with shipping + duty included (DDP):',
    pricing_table: [
      { qty: '50 pcs', price: 'US$ 160', perUnit: 'US$ 3.20 / pc', turnaround: '5 days' },
      { qty: '100 pcs', price: 'US$ 230', perUnit: 'US$ 2.30 / pc', turnaround: '5 days' },
      { qty: '300 pcs', price: 'US$ 500', perUnit: 'US$ 1.67 / pc', turnaround: '7 days' },
      { qty: '1000 pcs', price: 'US$ 1,410', perUnit: 'US$ 1.41 / pc', turnaround: '10 days' },
    ],
    h2_trust: 'Trust Hammer: Shenzhen Factory + Quality Guarantee',
    trustItems: [
      { title: 'ISO 9001 Certified', desc: 'Shenzhen factory certified ISO 9001:2015, 16 years of printing experience, 100% QC sampling before shipment.' },
      { title: 'FSC Certified Paper', desc: 'All paper FSC certified, sustainable forestry, top choice for European and US brands.' },
      { title: 'FDA Food-Grade Ink', desc: 'Soy-based ink + food-grade ink options available for cosmetics / food catalog.' },
      { title: 'DDP Duty Pre-Paid', desc: 'Shenzhen direct DHL Express 2-4 days, recipient zero tax burden (DDP pre-paid).' },
    ],
    h2_compare: 'Us vs Western Printers vs QinPrinting Comparison',
    compareIntro: 'See the core difference in 5 indicators — cross-border bulk orders win on these metrics:',
    compareHeaders: ['Indicator', 'ZprintPro (Shenzhen)', 'Western Local Factory'],
    compareRows: [
      { feature: 'Quote Speed', us: '30s AI quote', qin: '24-72h manual', usBetter: true },
      { feature: 'Minimum Order (MOQ)', us: '50 pcs', qin: '500-1000 pcs', usBetter: true },
      { feature: 'Per-Unit Cost (100 pcs)', us: 'US$ 2.30 / pc', qin: 'US$ 5-8 / pc', usBetter: true },
      { feature: 'Global Delivery', us: 'DHL 2-4 days DDP', qin: 'Local 5-10 days', usBetter: true },
      { feature: 'Sample Proofing', us: 'Free 5 days', qin: 'Paid $50-200 / time', usBetter: true },
    ],
    h2_faq: 'Frequently Asked Questions',
    faqs: [
      { q: 'How is Shenzhen factory quality guaranteed?', a: 'Shenzhen factory has 16 years of printing experience, ISO 9001:2015 certified, FSC paper certified, FDA food-grade ink. 100% QC sampling before each shipment, damage rate < 0.5%. Shipping video available on request.' },
      { q: 'Is the MOQ really 50 pcs?', a: 'Yes, 50 pcs MOQ with offset + digital hybrid printing. 1000+ pcs uses pure offset printing for lower unit cost. Sample proofing as low as 1 pc (at cost).' },
      { q: 'How long does shipping from Shenzhen to USA take? Any duty?', a: 'DHL Express 2-4 business days to US / UK / AU. DDP (Delivered Duty Paid) means recipient pays zero tax — no separate customs or VAT charges.' },
      { q: 'Can I get a sample proof before bulk production?', a: 'Yes, 5-day digital proofing (1-3 pcs), and the sample cost is fully deductible from bulk production. Sample cost is 80% cheaper than Western printers.' },
    ],
    h2_cta: 'Get Started — 30-Second AI Instant Quote',
    ctaTitle: 'WhatsApp 19880851334 for Quote',
    ctaDesc: 'Submit dimensions + page count + quantity → 30-second AI instant quote + 5-day sample proof + DHL 2-4 day global delivery',
    ctaButton: 'WhatsApp 19880851334 for instant quote',
    altBanner: 'China Catalog Printing — Shenzhen Factory Direct Banner | ZprintPro',
    altFactory: 'Shenzhen Printing Factory 16 Year ISO 9001 Workshop | ZprintPro',
    altCatalog1: 'A4 Saddle Stitch Catalog 100pcs Glossy Art Paper | ZprintPro China Printing',
    altCatalog2: 'Square 210x210mm Lookbook Perfect Bound 50pcs Premium | ZprintPro China Catalog',
    altCatalog3: 'A5 Brochure 300pcs Bulk Wholesale | ZprintPro China Printing Factory',
    trustBadge1: 'ISO 9001',
    trustBadge2: 'FSC Paper',
    trustBadge3: 'DDP Duty',
    trustBadge4: 'DHL 2-4d',
    kwClusterLabel: 'Keyword',
    volumeLabel: 'Weekly Imps',
    intentLabel: 'Search Intent',
    unitLabel: 'Unit',
    turnaroundLabel: 'Turnaround',
    fromLabel: 'from',
    featureLabel: 'Indicator',
    usLabel: 'ZprintPro (Shenzhen)',
    qinLabel: 'Western Local Factory',
    qa_intro: 'Below are the questions our customers ask most. We hope this helps you decide quickly. WhatsApp 19880851334 for instant inquiry.',
  },
  'ja': {
    heroTitle: '中国カタログ印刷｜深セン工場直送・50部から・DHL 2-4日',
    heroSubtitle: '深セン工場から直接お届けするカタログ・パンフレット・雑誌・ルックブック印刷, 50部から対応, 30秒AI無料見積もり, ISO 9001 + FSC認証. 欧米印刷工場より30-40%安い.',
    ctaPrimary: 'WhatsApp 19880851334 で即時見積',
    ctaSecondary: '素材サンプル請求',
    h2_advantage: '三つの強み：30秒AI見積もり・50部から・DHL 2-4日',
    advantageIntro: 'QinPrinting上海（Trustpilot 4.9/327件）をベンチマークに, 当社の三つの強みが欧米印刷工場を圧倒:',
    hammerA_title: '強み1・30秒AI即時見積もり',
    hammerA_desc: '従来工場は24時間手動見積もり, 繁忙期は3-5日遅延. 当社30秒AI見積もりは365×24対応.',
    hammerA_items: ['30秒即時見積もり（vs 24時間手動）', '365×24無休（vs 平日9-18）', '見積もりは配送料+税込み（vs 隠れた追加料金）'],
    hammerB_title: '強み2・50部から+無料ファイルチェック',
    hammerB_desc: 'QinPrinting MOQ 100, 欧米工場 MOQ 500-1000. 当社 50部から+無料ファイルチェック, 新商品テストのハードルがゼロ.',
    hammerB_items: ['50部から（vs 100部）', '無料ファイルチェック（vs 有料$50/回）', '5日間デジタル校正（vs 7-10日）'],
    hammerC_title: '強み3・DHL 2-4日全世界直送',
    hammerC_desc: '深センから香港へ24時間, DHL 2-4日で米国/英国/オーストラリアへ. 欧米従来工場は3-10日.',
    hammerC_items: ['DHL Express 2-4日（vs 3-10日）', 'DDP関税込み（vs 受取人払い）', '深セン直送（vs 経由倉庫）'],
    h2_keywords: '中国カタログ印刷 5大キーワードクラスター',
    keywordsIntro: '1ページで中国カタログ印刷 5大バリエーション+バルク/ホールセールを網羅, 1ランディング=複数キーワード獲得:',
    keyword_clusters: [
      { kw: '中国カタログ印刷', intent: '越境大口（主キーワード）', volume: '～32 imp/週' },
      { kw: '中国印刷工場', intent: 'ソーシング明確', volume: '～18 imp/週' },
      { kw: '深セン印刷工場', intent: '産地直撃', volume: '～12 imp/週' },
      { kw: '大量カタログ印刷', intent: 'B2Bバルク', volume: '～14 imp/週' },
      { kw: '卸売カタログ印刷', intent: 'B2Bホールセール', volume: '～10 imp/週' },
    ],
    h2_pricing: '4段階リアル価格（50-1000部）',
    pricingIntro: 'QinPrintingより30-40%安い, 欧米より50-60%安い. 配送料+関税込み透明価格（DDP）:',
    pricing_table: [
      { qty: '50部', price: 'HK$ 1,250', perUnit: 'HK$ 25 / 部', turnaround: '5日' },
      { qty: '100部', price: 'HK$ 1,800', perUnit: 'HK$ 18 / 部', turnaround: '5日' },
      { qty: '300部', price: 'HK$ 3,900', perUnit: 'HK$ 13 / 部', turnaround: '7日' },
      { qty: '1000部', price: 'HK$ 11,000', perUnit: 'HK$ 11 / 部', turnaround: '10日' },
    ],
    h2_trust: '信頼の証：深セン工場実写+品質保証',
    trustItems: [
      { title: 'ISO 9001認証', desc: '深セン工場は ISO 9001:2015 認証, 16年の印刷経験, 出荷前 100% QC サンプリング.' },
      { title: 'FSC認証紙', desc: '全紙FSC認証, 持続可能な森林調達, 欧米ブランド第一選択.' },
      { title: 'FDA食品グレードインク', desc: '大豆インク+食品グレードインクオプション, 化粧品/食品カタログ対応.' },
      { title: 'DDP関税込み', desc: '深セン直送DHL Express 2-4日, 受取人税負担ゼロ（DDP前払い）.' },
    ],
    h2_compare: '当社 vs 欧米工場 vs QinPrinting 比較',
    compareIntro: '5つの指標で違いを一目で — 越境大口受注はこれらの指標で勝敗が決まる:',
    compareHeaders: ['指標', 'ZprintPro（深セン）', '欧米ローカル工場'],
    compareRows: [
      { feature: '見積もり速度', us: '30秒AI見積もり', qin: '24-72時間手動', usBetter: true },
      { feature: '最低発注量 (MOQ)', us: '50部', qin: '500-1000部', usBetter: true },
      { feature: '単価 (100部)', us: 'HK$ 18 / 部', qin: 'HK$ 38-62 / 部', usBetter: true },
      { feature: '全世界配送', us: 'DHL 2-4日 DDP', qin: 'ローカル 5-10日', usBetter: true },
      { feature: 'サンプル校正', us: '無料5日', qin: '有料$50-200 / 回', usBetter: true },
    ],
    h2_faq: 'よくある質問 (FAQ)',
    faqs: [
      { q: '深セン工場の品質はどのように保証されていますか？', a: '深セン工場は16年の印刷経験, ISO 9001:2015認証, FSC紙認証, FDA食品グレードインク. 出荷前100% QCサンプリング, 破損率 < 0.5%. 出荷動画も即時提供可能.' },
      { q: '本当にMOQ 50部からですか？', a: 'はい, 50部から対応, オフセット+デジタルハイブリッド印刷. 1000部以上は純粋オフセット印刷で単価さらに低下. サンプル校正は1部から（実費）対応可能.' },
      { q: '深センから米国への配送時間は？関税はかかりますか？', a: 'DHL Express 2-4営業日で米国/英国/オーストラリアへ. DDP（Delivered Duty Paid）関税込みで受取人税負担ゼロ, 別途関税やVATの支払い不要.' },
      { q: '量産前にサンプル校正は可能ですか？', a: 'はい, 5日間デジタル校正（1-3部）, サンプル費用は量産費から全額控除可能. サンプル費用は欧米より80%安い.' },
    ],
    h2_cta: '今すぐ始める — 30秒AI即時見積もり',
    ctaTitle: 'WhatsApp 19880851334 で見積もり',
    ctaDesc: 'サイズ+ページ数+数量を送信 → 30秒AI即時見積もり + 5日サンプル校正 + DHL 2-4日全世界直送',
    ctaButton: 'WhatsApp 19880851334 で即時見積',
    altBanner: '中国カタログ印刷 — 深セン工場直送バナー | ZprintPro',
    altFactory: '深セン印刷工場16年ISO 9001ワークショップ | ZprintPro',
    altCatalog1: 'A4中綴じカタログ100部光沢アート紙 | ZprintPro中国印刷',
    altCatalog2: '正方形210x210mmルックブック無線綴じ50部プレミアム | ZprintPro中国カタログ',
    altCatalog3: 'A5パンフレット300部大量卸売 | ZprintPro中国印刷工場',
    trustBadge1: 'ISO 9001',
    trustBadge2: 'FSC紙',
    trustBadge3: 'DDP関税込み',
    trustBadge4: 'DHL 2-4日',
    kwClusterLabel: 'キーワード',
    volumeLabel: '週間imp',
    intentLabel: '検索意図',
    unitLabel: '単価',
    turnaroundLabel: '納期',
    fromLabel: 'から',
    featureLabel: '指標',
    usLabel: 'ZprintPro（深セン）',
    qinLabel: '欧米ローカル工場',
    qa_intro: '以下はお客様からのよくある質問です. 迅速なご決定にお役立てください. WhatsApp 19880851334 で即時お問い合わせ.',
  },
};

export default function CatalogPrintingChinaPage({ params }: Props) {
  const { locale } = params;
  if (!['zh-hk', 'en', 'ja'].includes(locale)) notFound();
  const t = T[locale];
  const localePrefix = `/${locale}`;

  // JSON-LD: Service + Product + FAQPage
  const serviceJsonLd = generateServiceJsonLd({
    serviceType: 'China Catalog Printing',
    serviceName: t.heroTitle,
    description: t.heroSubtitle,
    url: `${localePrefix}/services/catalog-printing-china/`,
    areaServed: locale === 'en' ? ['US', 'GB', 'AU', 'CA'] : locale === 'ja' ? ['JP'] : ['HK', 'MO'],
    offers: [
      { name: '50 pcs Custom Catalog from Shenzhen Factory' },
      { name: '100 pcs Custom Catalog from Shenzhen Factory' },
      { name: '300 pcs Bulk Catalog from Shenzhen Factory' },
      { name: '1000 pcs Wholesale Catalog from Shenzhen Factory' },
    ],
  });
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: t.heroTitle,
    description: t.heroSubtitle,
    brand: { '@type': 'Brand', name: 'ZprintPro' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: locale === 'en' ? 'USD' : 'HKD',
      lowPrice: locale === 'en' ? '160' : '1250',
      highPrice: locale === 'en' ? '1410' : '11000',
      offerCount: 4,
    },
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={productJsonLd} />
      <JsonLd data={faqJsonLd} />

      <main className="min-h-screen bg-gray-50">
        {/* Hero 横幅 + 三锤 */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 md:py-20">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              {[t.trustBadge1, t.trustBadge2, t.trustBadge3, t.trustBadge4].map((b, i) => (
                <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                  {b}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center mb-4 leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-base md:text-lg text-gray-600 text-center max-w-3xl mx-auto mb-8 leading-relaxed">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href={generateWhatsAppLink(locale, { source: 'services-catalog-china', productName: t.heroTitle })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold py-4 px-8 rounded-full text-base md:text-lg transition-colors shadow-lg"
              >
                💬 {t.ctaPrimary}
              </a>
              <a
                href="#material-samples"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-8 rounded-full text-base md:text-lg border-2 border-gray-200 transition-colors"
              >
                📦 {t.ctaSecondary}
              </a>
            </div>

            <div className="mt-10">
              <img
                src="/images/services/catalog-printing-china-hero.webp"
                alt={t.altBanner}
                className="w-full h-auto rounded-2xl shadow-xl"
                width={1320}
                height={600}
                loading="eager"
              />
            </div>
          </div>
        </section>

        {/* 三锤碾压 */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-3">
              {t.h2_advantage}
            </h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">{t.advantageIntro}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Zap, title: t.hammerA_title, desc: t.hammerA_desc, items: t.hammerA_items, color: 'blue' },
                { icon: Package, title: t.hammerB_title, desc: t.hammerB_desc, items: t.hammerB_items, color: 'orange' },
                { icon: Truck, title: t.hammerC_title, desc: t.hammerC_desc, items: t.hammerC_items, color: 'green' },
              ].map((hammer, i) => {
                const Icon = hammer.icon;
                const colorMap: Record<string, string> = {
                  blue: 'bg-blue-50 border-blue-200 text-blue-700',
                  orange: 'bg-orange-50 border-orange-200 text-orange-700',
                  green: 'bg-green-50 border-green-200 text-green-700',
                };
                return (
                  <div key={i} className={`rounded-2xl p-6 border-2 ${colorMap[hammer.color]}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white">
                        <Icon className="w-6 h-6" />
                      </span>
                      <h3 className="text-lg font-bold">{hammer.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed mb-4">{hammer.desc}</p>
                    <ul className="space-y-2">
                      {hammer.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 关键词集群 5 大变体 */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-3">
              {t.h2_keywords}
            </h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">{t.keywordsIntro}</p>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-600 to-orange-500 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">{t.kwClusterLabel}</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">{t.intentLabel}</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">{t.volumeLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.keyword_clusters.map((kw, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{kw.kw}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{kw.intent}</td>
                      <td className="px-4 py-3 text-sm text-right font-mono text-gray-900">{kw.volume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4 档实价表 */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-3">
              {t.h2_pricing}
            </h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">{t.pricingIntro}</p>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
                <thead className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">{locale === 'en' ? 'Quantity' : '数量'}</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">{locale === 'en' ? 'Total Price' : '总价'}</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">{t.unitLabel}</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">{t.turnaroundLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.pricing_table.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-orange-50">
                      <td className="px-4 py-3 text-base font-bold text-gray-900">{row.qty}</td>
                      <td className="px-4 py-3 text-base font-bold text-right text-orange-600">{row.price}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-700">{row.perUnit}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-700">{row.turnaround}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 信任锤 — 深圳工厂 + 质量保证 */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-10">
              {t.h2_trust}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/images/services/shenzhen-factory-16-year.webp"
                  alt={t.altFactory}
                  className="w-full h-64 object-cover"
                  width={660}
                  height={400}
                  loading="lazy"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.trustItems.map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-5 h-5 text-green-600" />
                      <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 我方 vs 欧美 vs QinPrinting 对比 */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-3">
              {t.h2_compare}
            </h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">{t.compareIntro}</p>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    {t.compareHeaders.map((h, i) => (
                      <th key={i} className="px-4 py-3 text-left text-sm font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.compareRows.map((row, i) => (
                    <tr key={i} className={`border-b border-gray-100 last:border-0 ${row.usBetter ? 'bg-green-50' : ''}`}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.feature}</td>
                      <td className="px-4 py-3 text-sm font-bold text-green-700">{row.us}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 line-through">{row.qin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-3">
              {t.h2_faq}
            </h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">{t.qa_intro}</p>

            <div className="max-w-3xl mx-auto space-y-4">
              {t.faqs.map((f, i) => (
                <details key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 group">
                  <summary className="font-bold text-gray-900 cursor-pointer flex items-center justify-between">
                    <span className="text-base">{f.q}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 内部链接 — 关键词集群 / 类目 / PDP / Blog */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Catalog 类目页 + Books 类目页 + Packaging 类目页 */}
              <Link href={`${localePrefix}/category/books/`} className="block bg-blue-50 hover:bg-blue-100 rounded-2xl p-6 border-2 border-blue-200 transition-colors">
                <h3 className="text-lg font-bold text-blue-900 mb-2">📚 {locale === 'en' ? 'Books & Catalog Category' : locale === 'ja' ? 'カタログ・書籍カテゴリ' : '書冊 / Catalog 印刷類目'}</h3>
                <p className="text-sm text-blue-700">{locale === 'en' ? 'Saddle stitch / perfect bound / wire-O / hardcover — 50 MOQ' : locale === 'ja' ? '中綴じ・無線綴じ・Wire-O・上製本 — 50部から' : '騎馬釘 / 膠裝 / Wire-O / 精裝 — 50 本起'}</p>
              </Link>
              <Link href={`${localePrefix}/category/packaging/`} className="block bg-orange-50 hover:bg-orange-100 rounded-2xl p-6 border-2 border-orange-200 transition-colors">
                <h3 className="text-lg font-bold text-orange-900 mb-2">📦 {locale === 'en' ? 'Packaging Boxes' : locale === 'ja' ? 'パッケージ箱' : '包裝盒'}</h3>
                <p className="text-sm text-orange-700">{locale === 'en' ? 'Custom mailer boxes + gift boxes — 50 MOQ' : locale === 'ja' ? 'カスタムメーラーボックス+ギフトボックス — 50部から' : '訂製郵寄盒 + 禮品盒 — 50 個起'}</p>
              </Link>
              <Link href={`${localePrefix}/category/flyers/`} className="block bg-green-50 hover:bg-green-100 rounded-2xl p-6 border-2 border-green-200 transition-colors">
                <h3 className="text-lg font-bold text-green-900 mb-2">📄 {locale === 'en' ? 'Flyers & Brochures' : locale === 'ja' ? 'チラシ・パンフレット' : '傳單 / Brochure'}</h3>
                <p className="text-sm text-green-700">{locale === 'en' ? 'Flyers + brochures + leaflets — 100 MOQ' : locale === 'ja' ? 'チラシ+パンフレット+リーフレット — 100枚から' : '傳單 + Brochure + Leaflet — 100 張起'}</p>
              </Link>
            </div>
          </div>
        </section>

        {/* 3 张 catalog 样图 (V3.10 alt 规则: {主词} - {规格} | {品牌}) */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-10">
              {locale === 'en' ? 'Catalog Sample Gallery — 3 Recent Batches' : locale === 'ja' ? 'カタログサンプルギャラリー — 最近の3バッチ' : 'Catalog 樣本圖庫 — 最近 3 批次'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl overflow-hidden shadow-md bg-white">
                <img src="/images/services/catalog-a4-saddle-100pc.webp" alt={t.altCatalog1} className="w-full h-64 object-cover" width={400} height={400} loading="lazy" />
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-900">A4 Saddle Stitch 100pcs</p>
                  <p className="text-xs text-gray-500">{locale === 'en' ? 'Glossy art paper, 4C+4C' : locale === 'ja' ? '光沢アート紙, 4C+4C' : '光銅紙 4C+4C'}</p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md bg-white">
                <img src="/images/services/catalog-lookbook-50pc.webp" alt={t.altCatalog2} className="w-full h-64 object-cover" width={400} height={400} loading="lazy" />
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-900">Square 210×210mm Lookbook 50pcs</p>
                  <p className="text-xs text-gray-500">{locale === 'en' ? 'Perfect bound, premium matte' : locale === 'ja' ? '無線綴じ, プレミアムマット' : '膠裝 高檔啞面'}</p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-md bg-white">
                <img src="/images/services/brochure-a5-300pc.webp" alt={t.altCatalog3} className="w-full h-64 object-cover" width={400} height={400} loading="lazy" />
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-900">A5 Brochure 300pcs Bulk</p>
                  <p className="text-xs text-gray-500">{locale === 'en' ? 'Wholesale pricing, fold + saddle' : locale === 'ja' ? '卸売価格, 折+中綴じ' : '批發價 折頁 + 騎馬釘'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-orange-500">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
              {t.h2_cta}
            </h2>
            <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto">{t.ctaDesc}</p>
            <a
              href={generateWhatsAppLink(locale, { source: 'services-catalog-china-cta', productName: t.ctaTitle })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#25D366] font-bold py-4 px-10 rounded-full text-base md:text-lg transition-colors shadow-lg"
            >
              💬 {t.ctaButton}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
