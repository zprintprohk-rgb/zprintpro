import { Metadata } from 'next';
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
      { title: '品質保證', desc: 'ISO 9001質量管理體系認證，海德堡四色柯式印刷，ICC色彩管理，Delta E ≤3色彩誤差控制。從印前到印後，每個環節均有專人檢查。' },
      { title: '快速交付', desc: '數碼印刷當日可取，柯式印刷3–5天交貨。順豐速遞覆蓋香港全區，大批量可安排專車直送。緊急訂單專人跟進，確保準時交付。' },
      { title: '專業服務', desc: '免費設計諮詢、免費刀模設計、免費色彩校樣。專屬客戶經理一對一跟進，從報價到交付全程無憂。' },
    ],
    teamTitle: '專業團隊',
    teams: [
      { title: '創始人', desc: '擁有15年印刷行業經驗，曾服務於國際頂級印刷集團，精通色彩管理與印前工藝。' },
      { title: '印前工程師', desc: '平均8年經驗，專注於AI／PDF文件檢查、刀模設計、ICC色彩配置與數碼打樣。' },
      { title: '客戶服務團隊', desc: '流利粵語、英語、普通話及日語，提供24小時內回覆承諾，協助客戶解決從報價到售後的所有問題。' },
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

    processSteps: [
      { step: '1', title: '上傳檔案', desc: 'AI 自動檢查 PDF 解析度、出血區、色彩模式。30 秒內報價，無需註冊。' },
      { step: '2', title: '免費設計', desc: '不擅長設計？我們提供免費刀模線製作、色彩校樣、版面微調。' },
      { step: '3', title: '打樣確認', desc: '數碼打樣 24 小時內，柯式打樣 3-5 個工作日。確認後立即進入生產。' },
      { step: '4', title: '印刷生產', desc: '海德堡 4 色柯式 + HP Indigo 數碼印刷，ISO 9001 認證，Delta E ≤3 色彩控制。' },
      { step: '5', title: '全球送達', desc: '順豐速遞覆蓋香港全境，DHL/FedEx 全球 2-4 天直達。1000 本起享批量優惠價。' }
    ],

    testimonialTitle: '客戶評價',

    testimonialSubtitle: '我們服務的 12 大行業 · 累計 1,000+ 企業客戶信賴',

    industries: [
      { iconKey: 'fnb', name: '餐飲外賣', desc: '餐廳及外賣平台' },
      { iconKey: 'retail', name: '零售精品', desc: '實體店及品牌專櫃' },
      { iconKey: 'ecommerce', name: '跨境電商', desc: 'DTC 品牌及亞馬遜 FBA' },
      { iconKey: 'beauty', name: '美妝護膚', desc: '護膚品及化妝品' },
      { iconKey: 'education', name: '教育培訓', desc: '學校及培訓機構' },
      { iconKey: 'wedding', name: '婚慶活動', desc: '婚禮及商務活動' },
      { iconKey: 'creator', name: '文創 IP', desc: '設計師及藝術家' },
      { iconKey: 'pet', name: '寵物行業', desc: '寵物食品及用品' },
      { iconKey: 'baby', name: '母嬰產品', desc: '嬰幼兒及孕產' },
      { iconKey: 'beverage', name: '茶飲食品', desc: '茶莊及食品品牌' },
      { iconKey: 'logistics', name: '物流快遞', desc: '快遞面單及物流' },
      { iconKey: 'apparel', name: '服裝鞋帽', desc: '時尚及運動品牌' }
    ],

    imageSlotFactory: '工廠車間 / 設備全景 (K3 拍圖後替換)',

    imageSlotTeam: '團隊真人工作場景 (K3 拍圖後替換)',
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
      { title: 'Quality Assurance', desc: 'ISO 9001 + FSC certified. Heidelberg 4-color offset + HP Indigo digital printing. ICC color management with Delta E ≤3 control. Every order inspected by dedicated prepress and postpress teams before shipping.' },
      { title: 'Fast Global Delivery', desc: 'Digital printing ships in 24 hours. Offset printing delivers in 3–5 business days. Worldwide express shipping to 50+ countries. Free shipping on selected products to US / UK / AU / CA. Volume orders include dedicated freight forwarding.' },
      { title: 'Professional Service', desc: 'Free design consultation, free die-cut design, free color proofing. Dedicated English-speaking account manager assigned to every order. From quote to delivery — no setup fees, no hidden charges.' },
    ],
    teamTitle: 'Our Team',
    teams: [
      { title: 'Founder', desc: '15 years of printing industry experience, formerly with top international printing groups, expert in color management and prepress processes.' },
      { title: 'Prepress Engineers', desc: 'Average 8 years experience, specializing in AI/PDF file checking, die-cut design, ICC color profiling, and digital proofing.' },
      { title: 'Customer Service', desc: 'Fluent English-speaking team (Mandarin, Cantonese, Japanese available). 24-hour response commitment, dedicated WhatsApp support at +8619880851334. Assisting clients from quote to after-sales.' },
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

    processSteps: [
      { step: '1', title: 'Upload Artwork', desc: 'AI auto-checks PDF resolution, bleed zones, color mode. Quote in 30 seconds, no signup required.' },
      { step: '2', title: 'Free Design Support', desc: 'Not a designer? We provide free die-cut line creation, color proofing, and layout tweaks.' },
      { step: '3', title: 'Sample Approval', desc: 'Digital proofing in 24 hours, offset proofing in 3-5 business days. Production starts after your approval.' },
      { step: '4', title: 'Production', desc: 'Heidelberg 4-color offset + HP Indigo digital. ISO 9001 certified, Delta E ≤3 color control.' },
      { step: '5', title: 'Global Delivery', desc: 'SF Express covers all of Hong Kong, DHL/FedEx delivers worldwide in 2-4 days. Volume pricing on 1000+ units.' }
    ],

    testimonialTitle: 'Client Testimonials',

    testimonialSubtitle: '12 industry segments served · 1,000+ business clients trusted us',

    industries: [
      { iconKey: 'fnb', name: 'Food & Beverage', desc: 'Restaurants & delivery platforms' },
      { iconKey: 'retail', name: 'Retail & Boutique', desc: 'Brick-and-mortar stores & counters' },
      { iconKey: 'ecommerce', name: 'Cross-border E-com', desc: 'DTC brands & Amazon FBA' },
      { iconKey: 'beauty', name: 'Beauty & Skincare', desc: 'Skincare & cosmetics' },
      { iconKey: 'education', name: 'Education & Training', desc: 'Schools & training institutes' },
      { iconKey: 'wedding', name: 'Weddings & Events', desc: 'Weddings & corporate events' },
      { iconKey: 'creator', name: 'Creator IP', desc: 'Designers & artists' },
      { iconKey: 'pet', name: 'Pet Industry', desc: 'Pet food & supplies' },
      { iconKey: 'baby', name: 'Baby & Maternity', desc: 'Baby & pregnancy products' },
      { iconKey: 'beverage', name: 'Tea & Beverage', desc: 'Tea brands & F&B' },
      { iconKey: 'logistics', name: 'Logistics', desc: 'Shipping labels & logistics' },
      { iconKey: 'apparel', name: 'Apparel & Footwear', desc: 'Fashion & sports brands' }
    ],

    imageSlotFactory: 'Factory floor / equipment panorama (K3 replace after photo capture)',

    imageSlotTeam: 'Team real work scenes (K3 replace after photo capture)',
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
      { title: '品質保証', desc: 'ISO 9001品質管理システム認証、ハイデルベルク4色オフセット印刷、ICCカラーマネジメント、Delta E ≤3の色彩誤差管理。印前から印後まで、各工程に専任者が検査を行います。' },
      { title: '迅速な納品', desc: 'デジタル印刷は当日受取可能、オフセット印刷は3～5日で納品。顺丰速遞は香港全域をカバーし、大口注文は専用トラック直送も可能です。' },
      { title: '専門的なサービス', desc: '無料デザイン相談、無料型抜き設計、無料カラープルーフ。専任のアカウントマネージャーが見積もりから納品までワンストップでサポートします。' },
    ],
    teamTitle: '専門チーム',
    teams: [
      { title: '創業者', desc: '印刷業界15年の経験。国際トップ印刷グループでの勤務経験があり、色彩管理と印前工程に精通。' },
      { title: '印前エンジニア', desc: '平均8年の経験。AI／PDFファイルチェック、型抜き設計、ICCカラープロファイリング、デジタル校正を専門としています。' },
      { title: 'カスタマーサービス', desc: '広東語、英語、北京語、日本語が堪能。24時間以内の返信を約束し、見積もりからアフターサービスまですべての問題を解決します。' },
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

    processSteps: [
      { step: '1', title: 'ファイルアップロード', desc: 'AI が PDF 解像度・塗り足し・カラーモードを自動チェック。30 秒で見積もり、登録不要。' },
      { step: '2', title: '無料デザインサポート', desc: 'デザインに自信がなくても安心。無料型抜きライン作成、色校正、レイアウト微調整を提供。' },
      { step: '3', title: 'サンプル確認', desc: 'デジタル校正 24 時間、オフセット校正 3-5 営業日。確認後すぐ生産開始。' },
      { step: '4', title: '印刷生産', desc: 'ハイデルベルク 4 色オフセット + HP Indigo デジタル。ISO 9001 認証、Delta E ≤3 色彩管理。' },
      { step: '5', title: '世界配送', desc: '顺丰速运は香港全域をカバー、DHL/FedEx は世界 2-4 日直送。1000 部以上で批量割引。' }
    ],

    testimonialTitle: 'お客様の声',

    testimonialSubtitle: '12 業種のクライアントにサービス提供 · 累計 1,000 社以上',

    industries: [
      { iconKey: 'fnb', name: '飲食・テイクアウト', desc: 'レストラン・出前プラットフォーム' },
      { iconKey: 'retail', name: '小売・精品', desc: '実店舗・ブランドカウンター' },
      { iconKey: 'ecommerce', name: '越境 EC', desc: 'DTC ブランド・Amazon FBA' },
      { iconKey: 'beauty', name: '美容・スキンケア', desc: 'スキンケア・化粧品' },
      { iconKey: 'education', name: '教育・研修', desc: '学校・研修機関' },
      { iconKey: 'wedding', name: '結婚・イベント', desc: '結婚式・企業イベント' },
      { iconKey: 'creator', name: 'クリエイター IP', desc: 'デザイナー・アーティスト' },
      { iconKey: 'pet', name: 'ペット業界', desc: 'ペットフード・用品' },
      { iconKey: 'baby', name: 'ベビー・マタニティ', desc: '乳幼児・妊産婦向け' },
      { iconKey: 'beverage', name: 'お茶・飲料', desc: 'お茶ブランド・食品' },
      { iconKey: 'logistics', name: '物流・配送', desc: '配送ラベル・物流' },
      { iconKey: 'apparel', name: 'アパレル・靴', desc: 'ファッション・スポーツ' }
    ],

    imageSlotFactory: '工場現場・設備全景 (K3 撮影後に差し替え)',

    imageSlotTeam: 'チームの実業務シーン (K3 撮影後に差し替え)',
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
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Cards' } },
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

        {/* Core Advantages */}
        <section className="py-16 md:py-20 bg-gray-50">
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
            {/* 2026-08-08 K3 14:43 拍板: 工厂图 + 团队图 2 个 placeholder 暂时不显示 (K3 还没拍图) */}
            {/* K3 拍图后改 SHOW_FACTORY_IMAGE_SLOTS = true, 并把 <svg> 替换为 <img src="/images/about/factory-panorama.jpg" /> + <img src="/images/about/team-workshop.jpg" /> */}
            {false && (
              <div className="mt-10 grid md:grid-cols-2 gap-4">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <p className="text-sm font-medium">{t.imageSlotFactory}</p>
                    <p className="text-xs mt-1">{'<!-- K3: replace <svg> with <img src="/images/about/factory-panorama.jpg" alt="ZprintPro factory floor" /> -->'}</p>
                  </div>
                </div>
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <p className="text-sm font-medium">{t.imageSlotTeam}</p>
                    <p className="text-xs mt-1">{'<!-- K3: replace <svg> with <img src="/images/about/team-workshop.jpg" alt="ZprintPro team" /> -->'}</p>
                  </div>
                </div>
              </div>
            )}
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
        {/* Certifications */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-10 text-center">{t.certTitle}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {t.certs.map((cert, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#333333]">{cert.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{cert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
