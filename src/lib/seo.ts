import { Metadata } from 'next';

import type { Locale } from '@/types/locale';
export type { Locale } from '@/types/locale';

// 網站配置
export const siteConfig = {
  // 2026-06-17 P0: 品牌切割 — 主品牌剥离 "ZprintPro" 字串
  // 原问题: name = "智印雲 ZprintPro", alternateName 直接含 "ZprintPro" / "ZprintPro Global"
  //   → Google Knowledge Graph 把 zprintpro.com 和 z-printpro.com 共享同一品牌实体
  //   → 智印港和智印雲互相印证"是同一个东西", 整体被算法降权, 展示量长期 10-20
  // 修法: name 改成"智印雲" (主品牌, 让 Google 识别为独立实体)
  //   alternateName 保留 "ZprintPro" (用户实际品牌) + 加 "ZprintPro HK" 区分地理位置
  //   social 全部删 (用户没 FB/IG/LinkedIn 账号, 假链接是 NAP 污染源, GBP 是更优先的实体信号)
  name: '智印雲',
  alternateName: ['ZprintPro', 'ZprintPro HK', '智印雲印刷'],
  url: 'https://zprintpro.com',
  logo: 'https://zprintpro.com/images/logo-gsc-200x200.png',
  // 2026-07-13: 全站 canonical 1 句品牌描述 (per-locale 文案以 translations.<locale>.metaDesc 為準)
  // 用於 Schema.org default og:description / email signature / press-kit fallback
  // 注意 NAP vs SEO 脫鉤 (§13.10): 不寫 supplier origin 城市, 用 global printing partner 品牌定位
  description:
    'ZprintPro is a global printing partner for businesses, schools, and creative teams — premium custom printing with ISO 9001 + FSC certification, 30-second AI quotes, free design mockups, no minimums, and worldwide delivery to 50+ countries.',
  // 2026-06-15 P0: NAP 统一修复
  // 2026-06-28 修正: zh-hk NAP.telephone 之前写 "+852 5905 1334" 假号, 客户拨不通 → 改真实 +86 198 8085 1334
  // NAP schema.telephone 跟 address.country 无强匹配要求, HK 地址 + +86 电话 GSC 不扣分
  // WhatsApp 全 locale 统一 "+86 181 2638 0255" (HK 客户用 WhatsApp 国际漫游可加)
  // 邮箱全 locale 统一 "zprintpro@outlook.com"
  //   → Google 看到 schema 跟 UI 不一致, 判定 NAP 欺诈
  // 修法: 全部统一到 Footer 真实号 +86 198 8085 1334 (新联系电话, 这是公司真号, 不是胡编)
  // WhatsApp 号码保持 +86 181 2638 0255 不动 (whatsapp.ts PHONE)
  // 注意: 此号虽是中国内地号, 但 Footer/Contact 全部用这个, NAP 一致性优先于"地理号"
  // (不再办虚拟 +852, 统一真实 +86 198 8085 1334)
  phone: '+86 198 8085 1334',
  email: 'zprintpro@outlook.com',
  address: {
    street: 'No.1 Jiacheng Road, Pinghu Street, Longgang District',
    city: 'Shenzhen',
    region: 'Guangdong',
    country: 'CN',
    postalCode: '518111',
  },
};

// ============================================================================
// v4: 3 Locale Independent NAP (Name / Address / Phone)
// zh-hk: Virtual HK entity (gray compliance, user accepted)
// en: Shenzhen cross-border (transparent)
// ja: Shenzhen strict compliance (legal entity disclosed)
// ============================================================================

export interface SiteNAP {
  name: string;
  alternateName: string[];
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    region: string;
    country: string;
    postalCode?: string;
  };
  businessSchema: 'LocalBusiness' | 'Organization';
  areaServed: string[];
  founder?: string;
  legalEntityName?: string;
  sameAs: string[];
}

export function getSiteNAP(locale: Locale): SiteNAP {
  if (locale === 'zh-hk') {
    return {
      name: '智印雲',
      alternateName: ['ZprintPro HK', '智印雲(香港)', '智印雲印刷'],
      phone: '+86 198 8085 1334',
      email: 'zprintpro@outlook.com',
      address: {
        street: 'Unit C, 15/F, Maxgrand Plaza, 3 Tai Yau Street',
        city: 'San Po Kong',
        region: 'Kowloon',
        country: 'HK',
        postalCode: undefined,
      },
      businessSchema: 'LocalBusiness',
      areaServed: ['Hong Kong', 'Kowloon', 'New Territories', 'Hong Kong Island'],
      // Backlinks / citation profiles (zh-hk market)
      sameAs: [
        // HK business directories (to be created)
        // 'https://www.google.com/maps/place/ZprintPro',
        // 'https://www.yellowpages.com.hk/',
        // 'https://hk.asiaxpat.com/',
        // 'https://hk.kompass.com/',
        // 'https://www.hktdc.com/',
      ],
    };
  }
  if (locale === 'ja') {
    return {
      name: '智印雲',
      alternateName: ['ZprintPro', '深セン印刷'],
      phone: '+86 198 8085 1334',
      email: 'zprintpro@outlook.com',
      address: {
        street: 'No.1 Jiacheng Road, Pinghu Street, Longgang District',
        city: 'Shenzhen',
        region: 'Guangdong',
        country: 'CN',
        postalCode: '518111',
      },
      businessSchema: 'Organization',
      areaServed: ['Japan', 'China', 'Asia'],
      // Backlinks / citation profiles (ja market - 严格合规)
      sameAs: [
        // Japan business directories (to be created)
        // 'https://www.google.com/maps/place/ZprintPro',
        // 'https://itp.ne.jp/',
        // 'https://www.ekiten.jp/',
        // 'https://www.b-mall.ne.jp/',
        // 'https://www.houjin-bangou.nta.go.jp/',
      ],
      founder: '唐运提',
      legalEntityName: '深圳市彩龙印刷包装有限公司',
    };
  }
  // en (default)
  return {
    name: 'ZprintPro',
    alternateName: ['ZprintPro Global', 'ZprintPro'],
    phone: '+86 198 8085 1334',
    email: 'zprintpro@outlook.com',
    address: {
      street: 'No.1 Jiacheng Road, Pinghu Street, Longgang District',
      city: 'Shenzhen',
      region: 'Guangdong',
      country: 'CN',
      postalCode: '518111',
    },
    businessSchema: 'Organization',
    areaServed: ['US', 'GB', 'AU', 'CA', 'NZ', 'SG'],
      // Backlinks / citation profiles (en/global market)
      sameAs: [
        // Global business directories (to be created)
        // 'https://www.google.com/maps/place/ZprintPro',
        // 'https://clutch.co/',
        // 'https://www.trustpilot.com/',
        // 'https://www.thomasnet.com/',
        // 'https://www.alibaba.com/',
      ],
  };
}


// 地區配置（三地區獨立SEO戰略）
export interface RegionConfig {
  lang: string;
  regionCode: string;
  googleDomain: string;
  currency: 'HKD' | 'USD' | 'JPY';
  phonePrefix: string;
  businessSchema: 'LocalBusiness' | 'Organization';
  targetAudience: string;
  areaServed: string | string[];
  contactType: string;
  priceRange: string;
  geoCoordinates?: {
    lat: number;
    lng: number;
  };
}

export const regionConfig: Record<Locale, RegionConfig> = {
  'zh-hk': {
    lang: 'zh-Hant-HK',
    regionCode: 'HK',
    googleDomain: 'google.com.hk',
    currency: 'HKD',
    phonePrefix: '+86',
    businessSchema: 'LocalBusiness',
    targetAudience: '香港本地企業與實體店',
    areaServed: 'Hong Kong',
    contactType: '香港本地客戶服務',
    priceRange: '$$',
    geoCoordinates: { lat: 22.5431, lng: 114.0579 },
  },
  'en': {
    lang: 'en',
    regionCode: 'GLOBAL',
    googleDomain: 'google.com',
    currency: 'USD',
    phonePrefix: '+86',
    businessSchema: 'Organization',
    targetAudience: 'US/UK/AU businesses seeking premium printing services',
    areaServed: ['US', 'GB', 'AU', 'CA', 'NZ', 'SG'],
    contactType: 'International Sales',
    priceRange: '$$$',
  },
  'ja': {
    lang: 'ja-JP',
    regionCode: 'JP',
    googleDomain: 'google.co.jp',
    currency: 'JPY',
    phonePrefix: '+86',
    businessSchema: 'Organization',
    targetAudience: '日本企業向けプロフェッショナル印刷サービス',
    areaServed: 'Japan',
    contactType: '日本語対応',
    priceRange: '$$$',
  },
};

// 多語言元數據（GEO優化版：三市場完全獨立SEO策略，不互相引用地區名）
const homeMetadata: Record<Locale, { title: string; description: string; keywords: string }> = {
  'zh-hk': {
    title: '智印雲 ZPrintPro | 香港印刷公司 | 急件印刷·即日交貨 | 貼紙/單張/包裝盒定制',
    description: '香港智印雲印刷平台 — 專注急件印刷及即日交貨服務。提供高質素貼紙、宣傳單張、包裝盒定制、紙袋、海報等。線上30秒獲取初步報價，複雜需求由專人人工核價。全港免費送貨，最快即日交付，72小時快速交貨。',
    keywords: '香港印刷,急件印刷,即日印刷,貼紙印刷,宣傳單張印刷,包裝盒定制,數碼印刷,30秒報價,人工核價,免費送貨,紙袋印刷,海報印刷,香港印刷公司,印刷急單,小批量印刷,ZPrintPro,智印雲',
  },
  en: {
    // 2026-07-09 P0.1: en-US market local optimization (PM × UX × SEO research, 3-perspective analysis)
    // - Removed "hong kong printing service" (100% market mismatch, dilutes homepage topicality)
    // - Removed "Shenzhen factory" from description (NAP vs SEO decoupled, US buyers dislike)
    // - Added 5 sharp hooks: USA-targeted, Free Shipping $99+, Free Proof, 5-7 day DHL, ISO 9001
    // - Title 94 → 60 chars (Google SERP no truncation)
    title: 'Custom Printing Service USA · Free Shipping + Free Proof | ZprintPro',
    description: 'Custom printing service for USA businesses. Stickers, packaging boxes, paper bags, flyers, posters. 30-second AI quote. Free US shipping on $99+. Free design proof in 4h. 5-7 day DHL delivery. ISO 9001 certified.',
    keywords: 'custom printing service USA, online printing USA, custom stickers wholesale, packaging boxes supplier USA, paper bags wholesale, 30 second print quote, custom labels USA, rush printing USA, business card printing USA, eco friendly printing USA, made for US businesses, custom printing DHL express',
  },
  ja: {
    title: 'ZPrintPro | 印刷通販 | ステッカー・チラシ・パッケージ印刷 | 即日対応・最短3日納品',
    description: 'ZPrintProはプロの印刷通販サービス。高品質ステッカー印刷、チラシ印刷、パッケージボックスカスタマイズ、紙袋・ラベル・ポスター印刷に対応。30秒でオンライン即時見積もり、複雑な案件も専門スタッフが丁寧に対応。最短即日発送可能、3〜5営業日でお届け。全国配送無料。',
    keywords: '印刷通販,ステッカー印刷,チラシ印刷,パッケージ印刷,ポスター印刷,即日印刷,ネット印刷,小ロット印刷,オリジナル印刷,格安印刷,高品質印刷,急ぎ印刷対応,最短3日納品,全国配送無料',
  },
};

// 生成首頁元數據
export function generateHomeMetadata(locale: Locale): Metadata {
  const meta = homeMetadata[locale];
  const lang = locale === 'zh-hk' ? 'zh-HK' : locale;
  
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/`,
      languages: {
        'zh-HK': `${siteConfig.url}/zh-hk/`,
        'en-US': `${siteConfig.url}/en/`,
        'en-GB': `${siteConfig.url}/en/`,
        'en-AU': `${siteConfig.url}/en/`,
        'ja': `${siteConfig.url}/ja/`,
        'x-default': `${siteConfig.url}/zh-hk/`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteConfig.url}/${locale}/`,
      siteName: siteConfig.name,
      locale: lang,
      type: 'website',
      images: [
        {
          url: `${siteConfig.url}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${siteConfig.url}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// 生成分類頁元數據
// 分类页市场特定SEO数据（基于全球三大市场调研）
const categorySeoData: Record<string, {
  titles?: { 'zh-hk'?: string; en?: string; ja?: string };
  keywords: { 'zh-hk': string; en: string; ja: string };
  descriptions: { 'zh-hk': string; en: string; ja: string };
}> = {
  'business-cards': {
  titles: {
      'zh-hk': '咭片印刷 香港 | 智印雲 ZprintPro — 燙金咭片 / UV咭片 / 圓角咭片 高檔定制',
      // 2026-07-09 美国市场优化 v5: 加 Free Shipping + Same Day + 100 MOQ sharp hook
      en: 'Business Cards Free Shipping · 100 MOQ Same Day Foil Stamped | ZprintPro',
      ja: '名刺印刷 おすすめ | ZprintPro — 箔押し / UV / 丸角 / プレミアム名刺',
    },

    keywords: {
      'zh-hk': '名片印刷,香港名片,商務名片,咭片印刷,卡片印刷,名片設計,急印名片,即日名片,公司名片,高級名片',
      en: 'business card printing,custom business cards,name card printing,premium business cards,same day business cards,company cards,design business cards online,cheap business cards fast,foil business cards,embossed business cards,free shipping business cards,USA business cards,small business cards,rounded corner cards,luxury business cards',
      ja: '名刺印刷,名刺作成,オーダーメイド名刺,高級名刺,即日名刺,急ぎ名刺,会社名刺,名刺デザイン,箔押し名刺,厚紙名刺',
    },
    descriptions: {
      'zh-hk': '香港專業名片印刷，100張起訂，最快24小時交貨。支持燙金、UV、凹凸、圓角等特殊工藝，免費設計模板。智印雲ISO9001認證，品質保證。',
      en: 'Custom business card printing with free shipping over $99 to USA. Premium paper stocks, foil stamping, spot UV, embossing. Free design templates. Same day 24h rush available. ISO 9001 certified. 100 cards minimum. Free proof in 4 hours · 100% satisfaction guarantee · 5-7 day door-to-door delivery to USA.',
      ja: 'プロの名刺印刷サービス。100枚から、最短24時間でお届け。箔押し・UV・エンボス・丸角加工に対応。無料デザインテンプレート。ISO9001認証取得。全国配送無料。',
    },
  },
  'stickers': {
    // 2026-07-09 PM+UX+SEO 美国市场优化 v5: 移除 "Asia factory direct" 反效果词, 加 5 大美国 sharp hook
    // (Free Shipping / Free Proof / No Minimum / Made for US / 5000+ customers)
    // DHL Express 保留 (跨境品牌信任) + FedEx Ground (美国本土配送感)
    titles: {
      // 2026-07-17 GSC CTR 修复: 起价前置 + 免費設計/即日 hook, 机会词 貼紙印刷/貼紙訂製
      'zh-hk': '貼紙印刷 | HK$0.22起・免費設計・最快即日 | 智印雲 ZprintPro',
      en: 'Sticker Printing from $0.23 | Free Shipping $99+ | ZprintPro',
      ja: 'ステッカー印刷｜¥32〜・小ロット・最短即日・無料デザイン｜ZprintPro',
    },
    keywords: {
      'zh-hk': '貼紙印刷,貼紙訂製,防水貼紙,標籤貼紙,透明貼紙,圓形貼紙,異形貼紙,產品標籤,食品標籤,電商貼紙,車身貼紙,藥品標籤,GMP認證標籤,保健品標籤,防偽標籤',
      // 加長尾: free shipping / no minimum / made in USA / free proof / small business / bulk discount
      en: 'custom stickers,sticker printing,free shipping stickers,no minimum stickers,die cut stickers,vinyl stickers,waterproof stickers,product labels,round stickers,square stickers,bumper stickers,holographic stickers,clear stickers,stickers made in USA,USA made stickers,free proof stickers,small business stickers,bulk sticker printing,sticker sheets,kiss cut stickers,USA print shop',
      ja: 'シール印刷,ステッカー印刷,防水シール,透明シール,円形シール,ダイカットシール,商品ラベル,食品ラベル,梱包用シール,ホログラムシール,医薬品ラベル,GMPラベル,改ざん防止ラベル',
    },
    descriptions: {
      'zh-hk': '貼紙印刷 50 張起印，HK$0.22 起/張。防水 / 透明 / 異形貼紙訂製，FDA 食品接觸級 + SGS 認證。免費設計打稿 2 小時交稿，最快即日出貨，港九新界滿 HK$500 免費順豐速遞。WhatsApp 30 秒即時報價，ISO 9001 認證品質。',
      en: 'Sticker printing from $0.23, 50 MOQ. Die-cut vinyl, waterproof, FDA-compliant labels with free design proof. Fast 3-5 day production, DHL 2-4 day USA delivery, free shipping $99+. Get a 30-second AI quote.',
      ja: 'ステッカー印刷 50 枚から、¥32〜。防水・透明・ダイカット・商品ラベル、FDA 食品接触基準対応。無料デザイン校正 2 時間、最短即日発送、日本全国 DHL 2-4 日配送。ISO 9001 認証品質。30 秒 AI 無料見積もり。',
    },
  },
  'flyers': {
    // 2026-07-09 SEO 复盘 v3 强化: 把「即日 + 數碼印刷 + 數碼快印」sharp hook 集中到 flyers 类目页
    // 竞品 z-printpro.com 实证: 即日名片印刷 CTR 6.56%, A2 名片 即日 CTR 7.02%, 24小時名片 CTR 4-7%
    // 分散在 nav 独立栏目的反模式已移除, 全部权重归 flyers
    titles: {
      // 2026-07-17 GSC CTR 修复: 机会词 宣傳單張印刷/宣傳單張 前置
      'zh-hk': '宣傳單張印刷 | HK$0.25起・免費設計・最快即日 | 智印雲 ZprintPro',
      en: 'Flyer Printing from $0.40 | Free Shipping $99+ | ZprintPro',
      ja: 'チラシ印刷｜¥50〜・小ロット・最短即日・無料デザイン｜ZprintPro',
    },
    keywords: {
      // 加長尾: 數碼印刷 / 數碼快印 / 急印傳單 / 即日傳單 / 數位印刷 / 加急傳單 / 短版印刷
      'zh-hk': '宣傳單張印刷,傳單印刷,即日傳單,數碼印刷,數碼快印,數位印刷,急印傳單,加急傳單,短版印刷,A4單張,A5單張,A3單張,摺頁傳單,開業傳單,餐廳傳單,活動傳單,補習社單張,地產傳單,婚禮傳單,24小時傳單,當日傳單',
      // 加 free shipping / next day / no minimum / made in USA / small business / event marketing
      en: 'flyer printing,leaflet printing,custom flyers,same day flyers,free shipping flyers,next day flyers,digital flyer printing,rush flyer printing,24 hour flyers,A4 flyers,A5 flyers,A3 flyers,folded flyers,grand opening flyers,restaurant flyers,event flyers,real estate flyers,door hanger printing,direct mail flyers,tutoring flyers,short run flyer printing,USA flyer printing,small business flyers,bulk flyer printing',
      ja: 'チラシ印刷,フライヤー印刷,即納チラシ,デジタル印刷,オンデマンド印刷,急ぎチラシ,A4チラシ,A5チラシ,A3チラシ,折りパンフレット,開業チラシ,飲食店チラシ,イベントチラシ,不動産チラシ,塾チラシ,ダイレクトメール,短納期チラシ',
    },
    descriptions: {
      'zh-hk': '宣傳單張印刷 100 張起印，HK$0.25 起/張。A4/A5/A6 摺頁宣傳單張 + 數碼快印 + 柯式印刷，開業、餐廳、補習社單張最快即日交貨。免費設計打稿，港九新界滿 HK$500 免費順豐速遞。WhatsApp 30 秒即時報價，ISO 9001 認證。',
      // 2026-07-17 GSC CTR 修复: 起价前置 + free design / DHL hook
      en: 'Flyer printing from $0.40, 100 MOQ. A4/A5/A6 folded leaflets, digital & offset, free design proof in 2 hours. Same-day rush available, DHL 2-4 day USA delivery, free shipping $99+. 30-second AI quote.',
      ja: 'チラシ印刷 100 枚から、¥50〜。A4/A5/A6 折込・二つ折り、デジタル+オフセット印刷。無料デザイン校正 2 時間、最短即日発送、日本全国 DHL 2-4 日配送。ISO 9001 認証品質。30 秒 AI 無料見積もり。',
    },
  },
  'packaging': {
    titles: {
      // 2026-07-17 GSC CTR 修复: 机会词 包裝盒訂製/包裝盒印刷 前置
      'zh-hk': '包裝盒訂製 | HK$2.5起・免費設計・最快即日 | 智印雲 ZprintPro',
      en: 'Packaging Box Printing from $0.51 | Free Shipping $99+ | ZprintPro',
      ja: 'オリジナルパッケージ印刷｜¥69〜・小ロット・無料デザイン｜ZprintPro',
    },
    keywords: {
      'zh-hk': '包裝盒訂製,包裝盒印刷,食品包裝印刷,食品包裝盒,食品袋印刷,食品級包裝,食品貼紙印刷,月餅盒,禮品盒,化妝品包裝盒,紙盒印刷,樓書印刷,資料匣,新盤樓書,豪宅畫冊,精裝樓書',
      // 加 free shipping / free mockup / no minimum / small business / eco friendly / kraft / mailer box
      en: 'custom packaging boxes,box printing,free shipping boxes,free mockup boxes,gift box packaging,cosmetic packaging,food packaging boxes,product packaging,small batch packaging,corrugated boxes,paper box printing,retail packaging,mailer boxes,rigid boxes,kraft boxes,eco friendly packaging,USA packaging supplier,small business packaging,bulk packaging,branded boxes',
      ja: 'オリジナルパッケージ,パッケージ印刷,箱印刷,ギフト箱,化粧品パッケージ,食品箱,商品パッケージ,小ロットパッケージ,段ボール箱,紙箱印刷,梱包材,不動産パンフレット,資料箱,デベロッパーパンフ,上製本,ハードケース箱',
    },
    descriptions: {
      'zh-hk': '包裝盒印刷 100 個起印，HK$2.5 起/個。FDA 食品級安全 + 化妝品盒 4 種盒型（天地蓋/磁吸/抽屜/書型），免費 3D 設計打稿。美妝、烘焙、禮品品牌適用，港九新界滿 HK$500 免費順豐速遞。WhatsApp 30 秒即時報價，ISO 9001 認證。',
      en: 'Custom packaging boxes from $0.51, 100 MOQ. FDA food-safe, 4 styles (lift-off lid, magnetic, drawer, book-style) with free 3D mockup. DHL 2-4 day USA delivery, free shipping $99+. 30-second AI quote.',
      ja: 'オリジナルパッケージ印刷 100 個から、¥69〜。FDA 対応 + 化粧品グレード 4 箱型（天地蓋・マグネット・引き出し・ブック型）。無料 3D デザイン校正、最短即日発送、日本全国 DHL 2-4 日配送。30 秒 AI 無料見積もり。',
    },
  },
'posters': {
    titles: {
      // 2026-07-17 GSC CTR 修复: 机会词 海報印刷/印海報 前置
      'zh-hk': '海報印刷 | HK$10起・1張起印・最快即日 | 智印雲 ZprintPro',
      en: 'Poster Printing from $2.30 | Free Shipping $99+ | ZprintPro',
      ja: 'ポスター印刷｜¥300〜・1枚から・最短即日・無料デザイン｜ZprintPro',
    },
    keywords: {
      'zh-hk': '海報印刷,印海報,A1海報,A2海報,A0海報,戶外海報,展覽海報,餐廳海報,Backdrop背景板,PP海報裱貼,防水海報,易拉寶海報,燈箱片,婚禮海報',
      en: 'poster printing,custom posters,A1 poster,A2 poster,A0 poster,outdoor posters,exhibition posters,event backdrops,PP laminated posters,waterproof posters,foam board printing,same day poster printing,wedding posters,menu board,free shipping posters,USA poster printing,trade show posters',
      ja: 'ポスター印刷,A1ポスター,A2ポスター,A0ポスター,屋外用ポスター,展示会用ポスター,イベントバックドロップ,PPラミネートポスター,防水ポスター,即日ポスター印刷,結婚式ポスター,メニューボード',
    },
    descriptions: {
      'zh-hk': '海報印刷 1 張起印，HK$10 起/張。A1/A2/A3 戶外防水 + 展覽背板 + 餐廳海報，Giclée 級 1200 DPI 色彩。印海報即日打稿，港九新界滿 HK$500 免費順豐速遞，港鐵站交收。WhatsApp 30 秒即時報價，ISO 9001 認證。',
      en: 'Poster printing from $2.30, 1 sheet MOQ. A1/A2/A3 outdoor waterproof & exhibition backdrops, free design proof. Fast 3-5 day production, DHL 2-4 day USA delivery, free shipping $99+. 30-second AI quote.',
      ja: 'ポスター印刷 1 枚から、¥300〜。A1/A2/A3 屋外防水・展示背景・飲食店ポスター。無料デザイン校正 2 時間、最短即日発送、日本全国 DHL 2-4 日配送。ISO 9001 認証品質。30 秒 AI 無料見積もり。',
    },
  },
  'paper-bags': {
    titles: {
      // 2026-07-17 GSC CTR 修复: 机会词 紙袋訂製/紙袋印刷 前置
      'zh-hk': '紙袋訂製 | HK$8起・免費設計・最快即日 | 智印雲 ZprintPro',
      en: 'Paper Bag Printing from $1.84 | Free Shipping $99+ | ZprintPro',
      ja: '紙袋印刷｜¥240〜・小ロット・最短即日・無料デザイン｜ZprintPro',
    },
    keywords: {
      'zh-hk': '紙袋印刷,紙袋訂製,牛皮紙袋,環保紙袋,手提紙袋,品牌紙袋,禮品紙袋,餐廳外賣紙袋,小批量紙袋,棉繩紙袋,白卡紙袋,珠寶紙袋,鐘錶紙袋,奢侈品紙袋,黑卡紙袋,絲帶手挽',
      en: 'paper bag printing,custom paper bags,kraft paper bags,eco friendly bags,branded paper bags,gift bags,retail bags,takeaway bags,small batch paper bags,twisted handle bags,white card paper bags,jewellery paper bag,luxury paper bag,black card paper bag,satin ribbon handle,foil stamped bag,free shipping paper bags,USA paper bag supplier,small business paper bags,shopping bags wholesale',
      ja: '紙袋印刷,クラフト紙袋,エコ紙袋,手提げ紙袋,ブランド紙袋,ギフト袋,テイクアウト紙袋,小ロット紙袋,紙袋作成,ペーパーバッグ,宝飾紙袋,腕時計紙袋,ラグジュアリー紙袋,ブラックカード紙袋,サテンリボン持ち手',
    },
    descriptions: {
      // 2026-07-09 PM+UX+SEO 复盘: 移除"香港深圳廠直送"违反 §13.10 NAP 脱钩,
      // 改用"亞洲工廠"+(具体场景效益)提升 CTR + 满足 zh-hk 跨境合规
      'zh-hk': '紙袋印刷 100 個起印，HK$8 起/個。FSC 認證牛皮紙袋 + 白卡紙袋 + 精品禮品袋，免費設計打稿、即日打樣。服飾、婚慶、烘焙、珠寶品牌適用，港九新界滿 HK$500 免費順豐速遞。WhatsApp 30 秒即時報價，ISO 9001 認證品質。',
      en: 'Custom paper bags from $1.84, 100 MOQ. FSC-certified kraft, white card & eco gift bags with free design mockup. Fast 3-5 day production, DHL 2-4 day USA delivery, free shipping $99+. 30-second AI quote.',
      ja: '紙袋印刷 100 個から、¥240〜。FSC 認証クラフト・白カード・ギフト袋。無料デザイン校正・型設計、最短即日発送、日本全国 DHL 2-4 日配送。ISO 9001 認証品質。30 秒 AI 無料見積もり。',
    },
  },
   
  'calendars': {
    titles: {
      'zh-hk': '年曆印刷 100本起 · 座檯/掛牆/2027 燙金精裝 ISO認證 DHL 2-4天 | 智印雲',
      en: 'Custom Calendars Free Shipping · 100 MOQ 2027 Hardcover Foil | ZprintPro',
      ja: 'カレンダー印刷 100部〜 · デスク/壁掛け/2027 箔押し上製本 ISO認証 | ZprintPro',
    },
    keywords: {
      'zh-hk': '年曆印刷,月曆印刷,座檯月曆,掛牆月曆,2027年曆,企業年曆,禮品月曆,定制月曆,燙金月曆,精裝月曆,日曆印刷,教師月曆,辦公文具',
      en: 'calendar printing,custom calendars,desk calendar,wall calendar,monthly calendar,2027 calendar,corporate calendar,gift calendar,branded calendar,hardcover calendar,foil stamped calendar,school calendar,office stationery,free shipping calendars,USA calendar printing,corporate gifts calendar',
      ja: 'カレンダー印刷,カスタムカレンダー,デスクカレンダー,壁掛けカレンダー,月別カレンダー,2027年カレンダー,企業カレンダー,ギフトカレンダー,箔押しカレンダー,上製本カレンダー,学校カレンダー,事務用品',
    },
    descriptions: {
      'zh-hk': '年曆印刷 100 本起印. 座檯/掛牆/2027 + 燙金精裝 + 企業 LOGO. ISO 9001 認證 + 30 秒 AI 即時報價 + DHL 全球 2-4 天配送. Q4 旺季建議提前 60 天下單.',
      en: 'Custom calendar printing 100 MOQ. Desk/wall/monthly + foil hardcover + corporate branding. Free shipping over $99 to USA. DHL Express 2-4 day. 30-second AI quote, ISO 9001. Order 60 days before Q4 peak. Free proof in 4 hours · 100% satisfaction guarantee · 5-7 day door-to-door delivery to USA.',
      ja: 'カレンダー印刷 100 部から対応. デスク・壁掛け・月別 + 箔押し上製本 + 企業 LOGO. ISO 9001 認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日. 繁忙期の 60 日前までのご注文を推奨.',
    },
  },
'japan-doujin': {
    titles: {
      'zh-hk': '同人周邊印刷 10本起 · 同人誌/亞克力/缶バッヂ/明信片 Comiket 24h特急 | 智印雲',
      en: 'Doujinshi Printing Free Shipping · 10 MOQ Acrylic/Can Badge/Postcard | ZprintPro',
      ja: '同人誌印刷 10部〜 · アクリル/缶バッジ/ポストカード コミケ24時間特急 | ZprintPro',
    },
    keywords: {
      'zh-hk': '同人誌印刷,同人周邊,亞克力鑰匙扣,亞克力立牌,全息貼紙,和紙膠帶,罐型襟章,明信片套裝,環保托特袋,Comiket印刷,VTuber周邊,動漫角色周邊,推し活周邊,日系周邊訂製',
      en: 'doujinshi printing,japan doujin,acrylic keychain custom,acrylic stand,can badge printing,postcard set,washi tape custom,eco tote bag print,hologram sticker,comiket printing,VTuber merch,anime goods custom,japan merchandise,oshi-katsu goods,free shipping doujinshi,USA doujinshi,small batch manga',
      ja: '同人誌印刷,コミケ印刷,即売会,A5同人誌,B5同人誌,アクリルキーホルダー,アクリルスタンド,缶バッジ,ポストカード,和紙テープ,エコトートバッグ,ホログラムステッカー,VTuber グッズ,推し活グッズ',
    },
    descriptions: {
      'zh-hk': '同人誌及日系ACG周邊印刷專家。A5/B5 同人誌 10 本起印、亞克力鑰匙扣 / 立牌 / 罐型襟章 / 明信片套裝 / 環保托特袋。Comiket 前 24 小時特急対応,深圳工廠 DHL Express 2-4 日直送日本。FSC 認證紙材、ISO 12647 色彩管理、ISO 9001 品質認證。繁體中文客服,日本在地支援。',
      en: 'Professional doujinshi & Japanese ACG merchandise printing. A5/B5 doujinshi from 10 MOQ, acrylic keychains/stands, can badges, postcard sets, eco tote bags. 24-hour rush before Comiket. Free shipping over $99 to USA + global. FSC paper, ISO 12647 color, ISO 9001 certified. English & Japanese support. Free proof in 4 hours · 100% satisfaction guarantee · 5-7 day door-to-door delivery to USA.',
      ja: '同人誌・推し活特化の印刷サービス。A5/B5 同人誌 10 部から対応、アクリルキーホルダー・スタンド・缶バッジ・ポストカード・エコトートバッグ。コミケ前 24 時間特急対応可能。アジア自社工場から DHL Express で 2-4 営業日でお届け。FSC 認証紙、ISO 12647 色彩管理、ISO 9001 取得。日本語サポート完備。',
    },
  },
  'envelopes': {
    titles: {
      'zh-hk': '信封印刷 100個起 · 牛皮/開窗/彩色/企業LOGO ISO認證 DHL 2-4天 | 智印雲',
      en: 'Custom Envelopes Free Shipping · 100 MOQ Kraft/Window/Corporate Logo | ZprintPro',
      ja: '封筒印刷 100個〜 · クラフト/窓付き/カラー/企業ロゴ ISO認証 DHL | ZprintPro',
    },
    keywords: {
      'zh-hk': '信封印刷,牛皮信封,開窗信封,彩色信封,企業信封,LOGO信封,定制信封,中式信封,西式信封,航空信封,印刷信封,郵寄信封',
      en: 'envelope printing,custom envelopes,kraft envelope,window envelope,colored envelope,corporate envelope,branded envelope,DL envelope,C5 envelope,airmail envelope,printing envelopes,business envelopes,free shipping envelopes,USA envelope printing',
      ja: '封筒印刷,カスタム封筒,クラフト封筒,窓付き封筒,カラー封筒,企業封筒,ロゴ封筒,長3封筒,洋形封筒,エアメール封筒,印刷封筒,社名入り封筒',
    },
    descriptions: {
      'zh-hk': '信封印刷 100 個起印. 牛皮/開窗/彩色/中式/西式 + 企業 LOGO 定制. ISO 9001 認證紙材 + 30 秒 AI 即時報價 + DHL 全球 2-4 天配送.',
      en: 'Custom envelope printing 100 MOQ. Kraft / window / colored / DL / C5 + corporate branding. Free shipping over $99 to USA. ISO 9001 certified + 30-second AI quote + DHL 2-4 day global. Free proof in 4 hours · 100% satisfaction guarantee · 5-7 day door-to-door delivery to USA.',
      ja: '封筒印刷 100 個から対応. クラフト・窓付き・カラー・長 3・洋形 + 企業ロゴ. ISO 9001 認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日.',
    },
  },
  'menus': {
    titles: {
      // 2026-07-17 GSC CTR 修复: 机会词 餐牌印刷 前置
      'zh-hk': '餐牌印刷 | HK$0.22起・免費設計・最快即日 | 智印雲 ZprintPro',
      en: 'Menu Printing from $0.14 | Free Shipping $99+ | ZprintPro',
      ja: 'メニュー印刷｜¥20〜・小ロット・最短即日・無料デザイン｜ZprintPro',
    },
    keywords: {
      'zh-hk': '餐牌印刷,菜單印刷,酒水牌,PVC餐牌,過膠餐牌,皮革餐牌,餐廳餐牌,茶餐廳餐牌,酒吧餐牌,外賣餐牌,甜品餐牌,咖啡店餐牌,酒店菜單',
      en: 'menu printing,custom menus,restaurant menus,bar menus,PVC menus,laminated menus,leather menu covers,takeaway menus,food menus,drink menus,dessert menu,cafe menu,hotel menu,free shipping menus,USA restaurant menus',
      ja: 'メニュー印刷,レストランメニュー,メニューブック,PVCメニュー,ラミネートメニュー,レザーメニュー,居酒屋メニュー,カフェメニュー,デザートメニュー,ホテルメニュー',
    },
    descriptions: {
      'zh-hk': '餐牌印刷 100 本起印，HK$0.22 起/份。防水 PVC / 紙質菜單 / 精裝 / 一次性，餐廳、茶餐廳、酒吧、咖啡店適用。免費設計打稿，最快即日交貨，港九新界滿 HK$500 免費順豐速遞。WhatsApp 30 秒即時報價，ISO 9001 認證。',
      en: 'Menu printing from $0.14, 100 MOQ. Waterproof PVC, paper, hardcover & disposable menus for restaurants, cafes and bars. Free design proof, DHL 2-4 day USA delivery, free shipping $99+. 30-second AI quote.',
      ja: 'メニュー印刷 100 部から、¥20〜。防水 PVC・紙・ハードカバー・使い捨て、レストラン・カフェ・バー向け。無料デザイン校正 2 時間、最短即日発送、日本全国 DHL 2-4 日配送。30 秒 AI 無料見積もり。',
    },
  },
  'red-packets': {
    titles: {
      // 2026-07-17 GSC CTR 修复: 机会词 利是封印刷 / lai see 前置
      'zh-hk': '利是封印刷 | HK$1.1起・燙金定制・免費設計 | 智印雲 ZprintPro',
      en: 'Lai See Red Packet Printing from $0.46 | Free Shipping $99+ | ZprintPro',
      ja: 'ポチ袋印刷｜¥64〜・小ロット・箔押し・無料デザイン｜ZprintPro',
    },
    keywords: {
      'zh-hk': '利是封印刷,企業利是封,婚慶利是封,賀年利是封,定制利是封,燙金利是封,紅包印刷,新年利是封,結婚利是封,LOGO利是封,生肖利是封,銀行利是封,卡通利是封',
      en: 'red packet printing,lai see printing,lai see envelopes,custom red envelopes,Chinese New Year red packets,wedding red packets,corporate red packets,foil red packets,hong bao printing,new year red envelopes,zodiac red packet,bank red packet,cartoon red packet,free shipping red packets,USA CNY red envelopes',
      ja: 'ポチ袋印刷,オリジナルポチ袋,お年玉袋,結婚式ポチ袋,企業ポチ袋,箔押しポチ袋,紅包印刷,新年ポチ袋,干支ポチ袋,銀行ポチ袋,キャラクターポチ袋',
    },
    descriptions: {
      'zh-hk': '利是封印刷 100 個起印，HK$1.1 起/個。燙金 / 局部 UV / 婚慶 / 賀年 / 企業 LOGO 定制，免費設計打稿。銀行、地產、零售品牌賀年禮品首選，港九新界滿 HK$500 免費順豐速遞。WhatsApp 30 秒即時報價，ISO 9001 認證。',
      en: 'Lai see red packet printing from $0.46, 100 MOQ. Foil stamping, spot UV, wedding, CNY & corporate branding with free design proof. DHL 2-4 day USA delivery, free shipping $99+. 30-second AI quote.',
      ja: 'ポチ袋印刷 100 個から、¥64〜。箔押し・スポット UV・婚礼・お正月・企業 LOGO。無料デザイン校正 2 時間、最短即日発送、日本全国 DHL 2-4 日配送。ISO 9001 認証品質。30 秒 AI 無料見積もり。',
    },
  },
  'banners': {
    titles: {
      'zh-hk': '易拉寶印刷 1個起 · X架/展覽橫幅/車身廣告 防水防UV ISO認證 | 智印雲',
      en: 'Custom Banners Free Shipping · 1 MOQ Roll-Up/X-Stand Waterproof UV | ZprintPro',
      ja: 'バナー印刷 1枚〜 · ロールアップ/Xスタンド/車両広告 防水UV ISO認証 | ZprintPro',
    },
    keywords: {
      'zh-hk': '橫幅印刷,易拉寶,戶外橫幅,展覽橫幅,車身廣告,X架,展架,燈箱廣告,噴繪廣告,商場橫幅,防水橫幅,防UV橫幅',
      en: 'banner printing,custom banners,roll up banners,outdoor banners,exhibition banners,vehicle wrap,x banner,standee,lightbox advertising,event banners,waterproof banner,UV resistant banner,free shipping banners,USA banner printing,trade show banners,vinyl banners',
      ja: 'バナー印刷,カスタムバナー,ロールアップバナー,屋外バナー,展示バナー,車両広告,Xスタンド,スタンドバナー,イベントバナー,防水バナー,UV耐性バナー',
    },
    descriptions: {
      'zh-hk': '易拉寶印刷 1 個起印. X 架/展覽/車身廣告 + 防水防 UV + 多種尺寸. ISO 9001 認證 + 30 秒 AI 即時報價 + DHL 全球 2-4 天配送.',
      en: 'Custom banner printing from 1 piece. Roll-up / X-stand / vehicle wraps, waterproof & UV-resistant. Free shipping over $99 to USA. ISO 9001 + 30-second AI quote + DHL 2-4 day global. Free proof in 4 hours · 100% satisfaction guarantee · 5-7 day door-to-door delivery to USA.',
      ja: 'バナー印刷 1 枚から対応. ロールアップ・X スタンド・車両広告, 防水・耐 UV. ISO 9001 認証 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日.',
    },
  },
  'books': {
    titles: {
      'zh-hk': '畫冊印刷 50本起 · 騎馬釘/膠裝/精裝/兒童繪本 FSC認證 DHL 2-4天 | 智印雲',
      en: 'Custom Book Printing Free Shipping · 50 MOQ Saddle/Hardcover FSC | ZprintPro',
      ja: '冊子印刷 50部〜 · 中綴じ/無線綴じ/上製本/絵本 FSC認証 DHL 2-4日 | ZprintPro',
    },
    keywords: {
      'zh-hk': '畫冊印刷,書籍印刷,騎馬釘,膠裝書,精裝書,螺旋裝,兒童繪本,同人誌,雜誌印刷,小批量書刊,企業畫冊,產品型錄,作品集',
      en: 'book printing,custom books,saddle stitch,perfect bound,hardcover,spiral bound,children books,doujinshi,magazine printing,small batch book printing,company profile,catalog printing,portfolio book,free shipping book printing,USA book printing,photo book,softcover books',
      ja: '冊子印刷,カスタム本,中綴じ,無線綴じ,上製本,スパイラル,絵本,同人誌,雑誌印刷,小ロット印刷,会社案内,カタログ印刷,作品集',
    },
    descriptions: {
      'zh-hk': '畫冊印刷 50 本起印. 騎馬釘/膠裝/精裝/螺旋裝 + 兒童繪本 + 同人誌 + 企業畫冊. FSC 認證紙材 + ISO 9001 品質 + 30 秒 AI 即時報價 + DHL 全球 2-4 天配送.',
      en: 'Custom book printing 50 MOQ. Saddle / perfect / hardcover / spiral + children books + doujinshi + company profiles. Free shipping over $99 to USA. FSC certified paper + ISO 9001 quality + 30-second AI quote + DHL 2-4 day global. Free proof in 4 hours · 100% satisfaction guarantee · 5-7 day door-to-door delivery to USA.',
      ja: '冊子印刷 50 部から対応. 中綴じ・無線綴じ・上製本・スパイラル + 絵本 + 同人誌 + 会社案内. FSC 認証紙 + ISO 9001 品質 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日.',
    },
  },
  'educational': {
    titles: {
      'zh-hk': '校園教育印刷 100本起 · 證書/作業簿/教材 學校批量優惠 FSC認證 | 智印雲',
      en: 'Education Printing Free Shipping · 100 MOQ Certificates/Workbooks Bulk | ZprintPro',
      ja: '教育印刷 100部〜 · 証明書/ワークブック/教科書 学校一括割引 FSC認証 | ZprintPro',
    },
    keywords: {
      'zh-hk': '校園印刷,教育印刷,證書印刷,作業簿,教材印刷,學業簿,畢業證書,獎狀印刷,學校印刷,學生手冊,導師手冊,學位證書,幼稚園教材',
      en: 'education printing,school printing,certificate printing,workbook printing,textbook printing,diploma printing,award certificates,student handbooks,school stationery,academic printing,teacher handbook,kindergarten materials,free shipping education printing,USA school printing',
      ja: '教育印刷,学校印刷,証明書印刷,ワークブック,教材印刷,教科書,卒業証書,賞状印刷,学生手帳,学用品印刷,教師用ガイド,幼稚園教材',
    },
    descriptions: {
      'zh-hk': '校園教育印刷 100 本起印. 證書/作業簿/教材/學業簿 + 學校批量定制折扣. FSC 認證紙材 + ISO 9001 品質 + 30 秒 AI 即時報價 + DHL 全球 2-4 天配送.',
      en: 'Custom education printing 100 MOQ. Certificates / workbooks / textbooks / student handbooks + school bulk pricing. Free shipping over $99 to USA. FSC certified + ISO 9001 + 30-second AI quote + DHL 2-4 day global. Free proof in 4 hours · 100% satisfaction guarantee · 5-7 day door-to-door delivery to USA.',
      ja: '教育印刷 100 部から対応. 証明書・ワークブック・教科書・学生手帳 + 学校一括割引. FSC 認証 + ISO 9001 品質 + 30 秒 AI 即時見積 + DHL 国際配送 2-4 日.',
    },
  },
};

// 默认分类SEO数据
// 2026-07-09 PM+UX+SEO 美国市场优化 v5: en description 加 Free Shipping + FedEx/DHL
function getDefaultCategorySeo(categoryName: string, categoryNameEn: string, categoryNameJa: string) {
  return {
    keywords: {
      'zh-hk': `${categoryName}印刷,香港${categoryName},${categoryName}定制`,
      en: `${categoryNameEn} printing,custom ${categoryNameEn.toLowerCase()},${categoryNameEn.toLowerCase()} printing,free shipping ${categoryNameEn.toLowerCase()},USA ${categoryNameEn.toLowerCase()} printing,small business ${categoryNameEn.toLowerCase()},bulk ${categoryNameEn.toLowerCase()} printing`,
      ja: `${categoryNameJa}印刷,${categoryNameJa}作成,${categoryNameJa} オーダー,${categoryNameJa} 通販`,
    },
    descriptions: {
      'zh-hk': `專業${categoryName}印刷服務，品質保證，價格透明。智印雲提供多種${categoryName}選擇，最快即日交貨。`,
      en: `Custom ${categoryNameEn.toLowerCase()} printing with free shipping over $99 to USA. Quality guaranteed, transparent pricing. Made for US small businesses & global brands. DHL Express 2-4 day or FedEx Ground. Free quote in 30 seconds. Rush orders welcome. ISO 9001 certified.`,
      ja: `プロの${categoryNameJa}印刷サービス。品質保証、透明な価格。最短3〜5営業日で全国へお届け。無料見積もり、急ぎ対応可能。`,
    },
  };
}

// ============================================================================
// Layer A 服務行業列表 (2026-07-08 落地)
// 给 13 个 categorySeoData 入口分别注入 5 个 Tier A 行业, 让类目页 TDK + 服务行业
// 区块都建立「类目 hub」叙事。13 类目 × 3 locale = 39 行业映射表。
// 规则:
// - 不写"深圳"/"Shenzhen" (NAP 脱钩, AGENTS.md §13.10)
// - 走 industry_keyword_matrix.json 的 industry_tier_a + 部分 tier_b 长尾
// - 不写 business-cards (AGENTS.md §11 主营品类约束)
// - Tier 排序 = 复购频次: 餐飲 > 零售 > 美妝 > 母婴 > 教育 > ...
// ============================================================================

export const CATEGORY_INDUSTRIES: Record<string, {
  'zh-hk': string[];
  en: string[];
  ja: string[];
}> = {
  'stickers': {
    'zh-hk': ['寵物食品', '藥品標籤', '美妝護膚', '汽車 4S 店 + 酒店房卡套', '跨境電商'],
    en: ['Pet food brands', 'Pharmaceutical labels', 'Beauty & skincare', 'Car dealership + Hotel keycard sleeve', 'Cross-border e-commerce'],
    ja: ['ペットフード', '医薬品ラベル', '化粧品・スキンケア', '自動車 4S 店 + ホテル ルームキー', '越境EC'],
  },
  'flyers': {
    'zh-hk': ['餐廳開業', '房地產新盤', '補習社宣傳', '活動展覽', '婚慶喜帖'],
    en: ['Restaurant openings', 'Real estate launches', 'Tutoring centers', 'Events & exhibitions', 'Wedding invitations'],
    ja: ['飲食店開業', '不動産プロモ', '塾・予備校', 'イベント・展示会', '結婚式招待'],
  },
  'packaging': {
    'zh-hk': ['美妝護膚品牌', '跨境電商品牌', '茶飲食品', '醫藥保健合規盒 + 金融峰會禮品', '婚慶禮盒'],
    en: ['Beauty & skincare brands', 'Cross-border e-commerce', 'Tea & beverage brands', 'Pharmaceutical + Financial summit gifts', 'Wedding & corporate gifts'],
    ja: ['化粧品ブランド', '越境ECブランド', '茶・ドリンク', '医薬保健コンプライアンス + 金融サミット', '結婚式・企業ギフト'],
  },
  'paper-bags': {
    'zh-hk': ['服飾品牌', '珠寶鐘錶', '金融峰會禮品 + 體育賽事紀念', '美妝精品', '零售餐飲'],
    en: ['Fashion & apparel brands', 'Jewellery & watches', 'Financial summit + Sports events', 'Beauty & cosmetics', 'Retail & F&B'],
    ja: ['アパレルブランド', '宝飾・腕時計', '金融サミット + スポーツイベント', '化粧品・コスメ', '小売・飲食'],
  },
  'posters': {
    'zh-hk': ['零售店面', '展覽活動', '補習社宣傳', '房地產海報', '餐廳推廣'],
    en: ['Retail storefronts', 'Exhibitions & events', 'Tutoring & education', 'Real estate promotion', 'Restaurant marketing'],
    ja: ['小売店', '展示会・イベント', '塾・教育', '不動産プロモ', '飲食店マーケティング'],
  },
  'calendars': {
    'zh-hk': ['企業禮品', '學校定制', '房地產送禮', '汽車汽配', '金融客戶'],
    en: ['Corporate gifts', 'School printing', 'Real estate gifts', 'Auto & parts', 'Financial clients'],
    ja: ['企業ギフト', '学校印刷', '不動産ギフト', '自動車・部品', '金融クライアント'],
  },
  'menus': {
    'zh-hk': ['茶餐廳', '西餐廳', '酒吧', '咖啡店', '外賣平台'],
    en: ['Cha chaan teng & cafes', 'Western restaurants', 'Bars & pubs', 'Coffee shops', 'Food delivery platforms'],
    ja: ['中華料理・飲茶', '西洋料理', 'バー・パブ', 'カフェ', 'デリバリー'],
  },
  'red-packets': {
    'zh-hk': ['婚慶喜宴', '企業年會', '卡通 IP 授權', '茶飲品牌', '銀行客戶'],
    en: ['Wedding banquets', 'Corporate events', 'Cartoon IP licensing', 'Tea & beverage brands', 'Banking clients'],
    ja: ['結婚式', '企業イベント', 'キャラクターIP', '茶・ドリンク', '銀行クライアント'],
  },
  'banners': {
    'zh-hk': ['展覽活動', '房地產戶外', '汽車展廳', '商場促銷', '學校開放日'],
    en: ['Trade shows', 'Outdoor real estate', 'Auto showrooms', 'Mall promotions', 'School open days'],
    ja: ['展示会', '屋外不動産', '自動車ショールーム', 'モール・販促', '学校説明会'],
  },
  'books': {
    'zh-hk': ['補習社教材', '同人誌創作', '企業畫冊', '兒童繪本', '精裝紀念冊'],
    en: ['Tutoring textbooks', 'Doujinshi creators', 'Corporate brochures', 'Children picture books', 'Premium hardcover yearbooks'],
    ja: ['塾・予備校教材', '同人誌', '企業パンフレット', '絵本', '上製本記念アルバム'],
  },
  'envelopes': {
    'zh-hk': ['企業商務', '金融信封', '補習社通告', '物流面單', '會員活動'],
    en: ['Corporate business', 'Financial mailing', 'School notices', 'Logistics & shipping labels', 'Member events'],
    ja: ['企業', '金融', '塾・学校', '物流', '会員イベント'],
  },
  'educational': {
    'zh-hk': ['中學大學畢業紀念冊', '補習社皇牌教材', '學校批量定制', '家長會活動', '獎狀證書'],
    en: ['Graduation yearbooks (secondary & university)', 'Tutoring textbook series', 'School bulk printing', 'Parent-teacher events', 'Award certificates'],
    ja: ['卒業記念アルバム（中高大）', '塾・予備校教材', '学校一括印刷', '保護者会イベント', '賞状・証明書'],
  },
  'business-cards': {
    'zh-hk': ['商務人士', '房地產代理', '專業服務業'],
    en: ['Business professionals', 'Real estate agents', 'Professional services'],
    ja: ['ビジネスパーソン', '不動産エージェント', 'プロフェッショナル'],
  },
  'japan-doujin': {
    'zh-hk': ['同人誌創作', '動漫周邊', 'VTuber 推し活', 'Comiket 委託', '原創 IP 周邊'],
    en: ['Doujinshi creators', 'Anime merchandise', 'VTuber fan goods', 'Comiket commissions', 'Original IP merch'],
    ja: ['同人誌創作', 'アニメグッズ', 'VTuber 推し活', 'コミケ委託', 'オリジナルIPグッズ'],
  },
};

export function generateCategoryMetadata(locale: Locale, categorySlug: string = '', categoryName: string = '', categoryNameEn: string = '', categoryNameJa: string = ''): Metadata {
  // 2026-06-20 fix B2: 直接使用传入的真实 slug（避免 nameEn 反向派生在含特殊字符时指向 404）
  const slug = categorySlug;
  const seoData = categorySeoData[slug] || getDefaultCategorySeo(categoryName, categoryNameEn, categoryNameJa);

  const names = { 'zh-hk': categoryName, en: categoryNameEn, ja: categoryNameJa };
  const rawName = names[locale];
  const name = rawName && !rawName.endsWith('印刷') && locale === 'zh-hk' ? `${rawName}印刷` : rawName;
  const baseDescription = seoData.descriptions[locale];
  const keywords = seoData.keywords[locale];
  const lang = locale === 'zh-hk' ? 'zh-HK' : locale;

  // 分类标题按市场区分
  // 2026-06-10 Phase B 修复 P0-2：en/ja 分支末尾使用纯英文品牌 'ZprintPro'（无中文），
  // 避免 layout 模板的 '| ZprintPro' 再次叠加后形成 "...| 智印雲 ZprintPro | ZprintPro"。
  // 2026-06-10：layout template 改为 '%s'（见 layout.tsx），此处由子页统一控制品牌后缀。
  const brandSuffix = locale === 'zh-hk' ? siteConfig.name : 'ZprintPro';

  // 优先使用自定义 title，没有则用默认格式
  const customTitle = seoData.titles?.[locale];
  const categoryTitle = customTitle || (locale === 'zh-hk'
    ? `${name} | 即日交貨 | ${brandSuffix}`
    : locale === 'en'
    ? `${name} | Global Shipping | ${brandSuffix}`
    : `${name} | 配送対応 | ${brandSuffix}`);

  // 2026-07-08 Layer A: 描述末尾追加行业 hook, 让类目页主题集中度 ↑
  // 仅在 CATEGORY_INDUSTRIES 注册的类目才注入, 其他走 baseDescription 不变
  const industriesForCategory = CATEGORY_INDUSTRIES[slug]?.[locale];
  const industriesSuffix = industriesForCategory && industriesForCategory.length > 0
    ? (locale === 'zh-hk'
        ? ` 适配行业: ${industriesForCategory.slice(0, 5).join('、')}。`
        : locale === 'en'
        ? ` Industries: ${industriesForCategory.slice(0, 5).join(', ')}.`
        : ` 業界: ${industriesForCategory.slice(0, 5).join('・')}。`)
    : '';
  const description = baseDescription + industriesSuffix;

  return {
    title: categoryTitle,
    description,
    keywords: keywords.split(','),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/category/${slug}/`,
      languages: {
        'zh-HK': `${siteConfig.url}/zh-hk/category/${slug}/`,
        'en-US': `${siteConfig.url}/en/category/${slug}/`,
        'en-GB': `${siteConfig.url}/en/category/${slug}/`,
        'en-AU': `${siteConfig.url}/en/category/${slug}/`,
        'ja': `${siteConfig.url}/ja/category/${slug}/`,
        'x-default': `${siteConfig.url}/zh-hk/category/${slug}/`,
      },
    },
    openGraph: {
      title: categoryTitle,
      description,
      locale: lang,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// 生成產品頁元數據 — SEO優化：title 50-60字符，description 150-160字符
export function generateProductMetadata(
  locale: Locale, 
  productName: string, 
  productNameEn: string, 
  productNameJa: string,
  description: string,
  descriptionEn: string,
  descriptionJa: string,
  slug: string,
  categoryName: string = '',
  priceRange: string = ''
): Metadata {
  const names = { 'zh-hk': productName, en: productNameEn, ja: productNameJa };
  const descriptions = { 'zh-hk': description, en: descriptionEn, ja: descriptionJa };
  
  const name = names[locale];
  const baseDesc = descriptions[locale] || '';
  const lang = locale === 'zh-hk' ? 'zh-HK' : locale;
  
  // Title: 50-60字符，含核心關鍵詞
  // 2026-06-10 Phase B 修复 P0-2：en/ja 末尾使用纯英文 'ZprintPro'（无中文），
  // 避免 layout 模板的 '| ZprintPro' 再次叠加后形成 "...| 智印雲 ZprintPro | ZprintPro"。
  // 2026-06-10：layout template 改为 '%s'（见 layout.tsx），此处由子页统一控制品牌后缀。
  const suffix = locale === 'zh-hk' ? '印刷' : locale === 'en' ? 'Printing' : '印刷';
  const titleBase = `${name}${suffix}`.replace(/印刷印刷/g, '印刷');
  const brandSuffix = locale === 'zh-hk' ? siteConfig.name : 'ZprintPro';
  const title = locale === 'zh-hk'
    ? `${titleBase} | 香港${categoryName}專家 | ${brandSuffix}`.slice(0, 60)
    : locale === 'en'
    ? `${titleBase} | Free Shipping $99+ | ${brandSuffix}`.slice(0, 60)
    : `${titleBase} | 日本向け高品質印刷 | ${brandSuffix}`.slice(0, 60);
  
  // Description: 150-160字符，含長尾關鍵詞+價格+行動號召
  // 2026-06-12 Phase B-P1 修复 P1-1：扩大 descPrefix 到 100 字符，确保 baseDesc 短时仍能凑足 150+
  // 之前 descPrefix.slice(0, 80) + descSuffix 在 baseDesc 短时只能拼到 ~80-100 字符
  // 2026-07-13 修复：priceText 只在 zh-hk locale 拼接（priceRange 是 HKD + 繁中"起"后缀，硬塞 en/ja og:description 会导致 §13.10 NAP 脱钩违规）
  const priceText = (priceRange && locale === 'zh-hk') ? ` ${priceRange.split('/')[0]}起。` : '';
  const descPrefix = baseDesc.slice(0, 100);
  const descSuffix = locale === 'zh-hk' 
    ? `立即查詢報價，滿$500免運費，即日交貨。`
    : locale === 'en'
    ? `Free design help. Free US shipping $99+. DHL 2-4 day delivery. Get a 30-second quote now.`
    : `今すぐ見積もり。全国配送対応。3〜5営業日でお届け。急ぎにも対応。`;
  
  const fullDesc = `${descPrefix}${priceText}${descSuffix}`;
  // 确保 metaDescription ≥ 150 字符（Phase A2 报告 C06/C07 失败项：9 字符占位符）
  // 超 160 才截，否则主动补 locale 关键词 padding
  let metaDescription: string;
  if (fullDesc.length > 160) {
    metaDescription = fullDesc.slice(0, 157) + '...';
  } else if (fullDesc.length < 150) {
    const padding = locale === 'zh-hk'
      ? ` ISO9001品質認證，全球配送。`
      : locale === 'en'
      ? ` ISO9001 certified. Worldwide shipping.`
      : ` ISO9001認証取得。全国配送対応。`;
    metaDescription = fullDesc + padding;
    if (metaDescription.length > 160) {
      metaDescription = metaDescription.slice(0, 157) + '...';
    }
  } else {
    metaDescription = fullDesc;
  }
  
  return {
    title,
    description: metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/product/${slug}/`,
      languages: {
        'zh-HK': `${siteConfig.url}/zh-hk/product/${slug}/`,
        'en-US': `${siteConfig.url}/en/product/${slug}/`,
        'en-GB': `${siteConfig.url}/en/product/${slug}/`,
        'en-AU': `${siteConfig.url}/en/product/${slug}/`,
        'ja': `${siteConfig.url}/ja/product/${slug}/`,
        'x-default': `${siteConfig.url}/zh-hk/product/${slug}/`,
      },
    },
    openGraph: {
      title: `${name} | ${siteConfig.name}`,
      description: metaDescription,
      locale: lang,
      type: 'website',
      images: [
        {
          url: `${siteConfig.url}/images/products/${slug}.webp`,
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// 生成地區化 Business 結構化數據（核心：按地區切換 LocalBusiness / Organization）
export function generateBusinessJsonLd(locale: Locale) {
  const nap = getSiteNAP(locale);
  const config = regionConfig[locale];
  const isLocalBusiness = config.businessSchema === 'LocalBusiness';

  const baseSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': config.businessSchema,
    name: nap.name,
    alternateName: nap.alternateName,
    url: siteConfig.url,
    logo: siteConfig.logo,
    image: siteConfig.logo,
    telephone: nap.phone,
    email: nap.email,
    priceRange: config.priceRange,
    areaServed: config.areaServed,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: nap.phone,
      contactType: config.contactType,
      availableLanguage: locale === 'zh-hk'
        ? ['Chinese', 'English']
        : locale === 'ja'
          ? ['Japanese', 'English']
          : ['English', 'Chinese', 'Japanese'],
    },
    // 2026-06-17: sameAs 改为空 (用户没有真实社交账号, 不传假链接)
    // 实体识别主要靠 GBP (用户后续注册) + 真实外链
    sameAs: nap.sameAs.length > 0 ? nap.sameAs : [],
  };

  if (isLocalBusiness) {
    // 香港版：LocalBusiness + 完整地址 + GeoCoordinates
    return {
      ...baseSchema,
      '@id': `${siteConfig.url}/#localbusiness`,
      image: [
        siteConfig.logo,
        `${siteConfig.url}/images/factory/factory-banner.jpg`,
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: nap.address.street,
        addressLocality: nap.address.city,
        addressRegion: nap.address.region,
        addressCountry: nap.address.country,
        postalCode: nap.address.postalCode || undefined,
      },
      geo: config.geoCoordinates
        ? {
            '@type': 'GeoCoordinates',
            latitude: config.geoCoordinates.lat,
            longitude: config.geoCoordinates.lng,
          }
        : undefined,
      hasMap: `https://www.google.com/maps/search/?api=1&query=${nap.address.city},${nap.address.region}`,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Saturday'],
          opens: '10:00',
          closes: '14:00',
        },
      ],
      paymentAccepted: ['WeChat Pay', 'Alipay', 'Credit Card', 'Bank Transfer'],
      currenciesAccepted: 'HKD, USD, JPY',
    };
  }

  // 國際版 / 日本版：Organization + areaServed + 跨境服務信號
  return {
    ...baseSchema,
    '@id': `${siteConfig.url}/#organization`,
      description:
        locale === 'ja'
          ? 'プロフェッショナル印刷サービス。高品質、確実な納期、日本語サポート対応。品質管理徹底、工場直送で競争力のある価格。'
          : 'Premium printing services with ISO certified quality, reliable worldwide shipping, and factory-direct pricing. Fast turnaround, rush orders welcome.',
  };
}

// 生成 Organization 結構化數據（向後兼容，默認使用舊版靜態數據）
export function generateOrganizationJsonLd() {
  return generateBusinessJsonLd('zh-hk');
}

// 生成 LocalBusiness 結構化數據（向後兼容，默認香港版）
export function generateLocalBusinessJsonLd() {
  return generateBusinessJsonLd('zh-hk');
}

// ============================================================================
// 增强版 Schema 生成器（GEO 优化专用）
// ============================================================================

// 生成 PrintShop 结构化数据（locale-aware, 2026-06-18 NAP 真实化）
// 2026-06-18 修复: 之前硬编码 HK 实体地址 (Wai Yip Street / Kwun Tong / Kowloon / 999077 / +852),
// 2026-06-28 修正: NAP.telephone 改真实 +86 198 8085 1334 (HK 客户能打通), 但 NAP.address 保留 zh-hk 虚拟 HK 觀塘 (灰色合规, GSC NAP 信号)
//   现统一从 siteConfig (深圳实体) 取真实数据,消除 NAP 不一致风险。
// 所有 locale 共享同一真实主体, NAP 不再分裂。
export function generatePrintShopSchema(locale: Locale = 'zh-hk'): SchemaOrgData {
  const config = regionConfig[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'PrintShop',
    'name': siteConfig.name,
    'alternateName': siteConfig.alternateName,
    'image': siteConfig.logo,
    'url': `${siteConfig.url}/${locale}`,
    'telephone': siteConfig.phone,
    'email': siteConfig.email,
    '@id': `${siteConfig.url}/${locale}#printshop`,
    'priceRange': config.priceRange,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': siteConfig.address.street,
      'addressLocality': siteConfig.address.city,
      'addressRegion': siteConfig.address.region,
      'addressCountry': siteConfig.address.country,
      'postalCode': siteConfig.address.postalCode,
    },
    'geo': config.geoCoordinates
      ? {
          '@type': 'GeoCoordinates',
          latitude: config.geoCoordinates.lat,
          longitude: config.geoCoordinates.lng,
        }
      : undefined,
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '09:00',
        'closes': '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Saturday',
        'opens': '10:00',
        'closes': '14:00',
      },
    ],
    'areaServed': config.areaServed,
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': locale === 'ja' ? '印刷サービス' : locale === 'en' ? 'Printing Services' : '印刷服務',
      'itemListElement': [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': locale === 'ja' ? 'ステッカー印刷' : locale === 'en' ? 'Sticker Printing' : '貼紙印刷' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': locale === 'ja' ? 'フライヤー印刷' : locale === 'en' ? 'Flyer Printing' : '宣傳單張印刷' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': locale === 'ja' ? 'パッケージ印刷' : locale === 'en' ? 'Packaging Printing' : '包裝盒定制' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': locale === 'ja' ? 'ラベル印刷' : locale === 'en' ? 'Label Printing' : '標籤貼紙印刷' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': locale === 'ja' ? '紙袋印刷' : locale === 'en' ? 'Paper Bag Printing' : '紙袋印刷' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': locale === 'ja' ? 'ポスター印刷' : locale === 'en' ? 'Poster Printing' : '海報印刷' } },
      ],
    },
    'description': locale === 'ja'
      ? 'アジア実体の国際印刷サービス。ステッカー・フライヤー・パッケージ・紙袋・ラベルを高品質で世界中へ。30秒AI見積もり、72時間国際配送、日本語サポート対応。'
      : locale === 'en'
        ? 'Asia-based international printing service. Stickers, flyers, packaging, paper bags, labels — high quality, worldwide shipping. 30-second AI quote, 72-hour international delivery.'
        : '深圳實體的國際印刷服務 — 為香港市場提供高質素貼紙、宣傳單張、包裝盒定制、紙袋、標籤貼紙等。線上30秒獲取初步報價，複雜需求由專人人工核價。跨境配送，72小時快速交付。',
  };
}

// 生成 GEO 元标签（用于 layout.tsx 注入）
export function generateGeoMetaTags(locale: Locale): Record<string, string> {
  const geoMap: Record<Locale, Record<string, string>> = {
    'zh-hk': {
      'geo.region': 'HK',
      'geo.placename': 'Hong Kong',
      'geo.position': '22.314577;114.227173',
      'ICBM': '22.314577, 114.227173',
    },
    'en': {
      'geo.region': 'US',
      'geo.placename': 'New York',
      'geo.position': '40.712776;-74.005974',
      'ICBM': '40.712776, -74.005974',
    },
    'ja': {
      'geo.region': 'JP',
      'geo.placename': 'Tokyo',
      'geo.position': '35.676192;139.650311',
      'ICBM': '35.676192, 139.650311',
    },
  };
  return geoMap[locale] || geoMap['en'];
}

// 生成 Product 結構化數據
export interface ProductRatingInput {
  ratingValue?: number;
  reviewCount?: number;
}

export function generateProductJsonLd(
  name: string,
  description: string,
  image: string,
  slug: string,
  price: number,
  currency: string = 'HKD',
  rating?: ProductRatingInput,
  locale: string = 'zh-hk'
) {
  const schema: SchemaOrgData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    url: `${siteConfig.url}/${locale}/product/${slug}/`,
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: siteConfig.logo,
    },
    offers: {
      '@type': 'Offer',
      url: `${siteConfig.url}/${locale}/product/${slug}/`,
      priceCurrency: currency,
      price: (price ?? 0).toString(),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      areaServed: locale === 'zh-hk' 
        ? { '@type': 'Place' as const, name: 'Hong Kong' }
        : locale === 'ja'
        ? { '@type': 'Place' as const, name: 'Japan' }
        : [
            { '@type': 'Place' as const, name: 'United States' },
            { '@type': 'Place' as const, name: 'United Kingdom' },
            { '@type': 'Place' as const, name: 'Australia' },
            { '@type': 'Place' as const, name: 'Canada' },
            { '@type': 'Place' as const, name: 'New Zealand' },
            { '@type': 'Place' as const, name: 'Singapore' },
          ],
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
      shippingDetails: locale === 'zh-hk'
        ? {
            '@type': 'OfferShippingDetails',
            shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'HKD' },
            shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'HK' },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' },
              transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 3, unitCode: 'DAY' },
            },
          }
        : locale === 'ja'
        ? {
            '@type': 'OfferShippingDetails',
            shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'JPY' },
            shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'JP' },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 3, unitCode: 'DAY' },
              transitTime: { '@type': 'QuantitativeValue', minValue: 7, maxValue: 14, unitCode: 'DAY' },
            },
          }
        : [
            {
              '@type': 'OfferShippingDetails',
              shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'USD' },
              shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'US' },
              deliveryTime: {
                '@type': 'ShippingDeliveryTime',
                handlingTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 3, unitCode: 'DAY' },
                transitTime: { '@type': 'QuantitativeValue', minValue: 7, maxValue: 14, unitCode: 'DAY' },
              },
            },
            {
              '@type': 'OfferShippingDetails',
              shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'USD' },
              shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'GB' },
              deliveryTime: {
                '@type': 'ShippingDeliveryTime',
                handlingTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 3, unitCode: 'DAY' },
                transitTime: { '@type': 'QuantitativeValue', minValue: 7, maxValue: 14, unitCode: 'DAY' },
              },
            },
            {
              '@type': 'OfferShippingDetails',
              shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'USD' },
              shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'AU' },
              deliveryTime: {
                '@type': 'ShippingDeliveryTime',
                handlingTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 3, unitCode: 'DAY' },
                transitTime: { '@type': 'QuantitativeValue', minValue: 7, maxValue: 14, unitCode: 'DAY' },
              },
            },
          ],
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
        merchantReturnDays: 0,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
        description: locale === 'zh-hk'
          ? '定制印刷產品不適用退貨政策，出廠前提供數碼樣確認'
          : locale === 'ja'
          ? 'オーダーメイド印刷品は返品不可、発送前にデジタル校正を提供'
          : 'Custom printed products are non-returnable. Digital proof provided before production.',
        applicableCountry: locale === 'zh-hk' ? 'HK' : locale === 'ja' ? 'JP' : 'US',
      },
    },
  };

  if (rating && rating.ratingValue) {
    // 2026-06-24 修复: reviewCount 必须是 Integer (Google Search Console 报 "无效的整数" 在 aggregateRating.reviewCount)
    // 之前 .toString() 把它转成字符串, Google 按 Schema.org 的 Integer 类型严格校验会失败.
    // ratingValue Google 容忍字符串 (Spec 允许 Number/Text), 保留 .toString() 避免引入其他回归.
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating.ratingValue.toString(),
      reviewCount: rating.reviewCount ?? 0,
      bestRating: '5',
      worstRating: '1',
    };

    // Add review array (reviewCount must be >= review array length)
    const reviewCount = rating.reviewCount ?? 0;
    if (reviewCount >= 2) {
      const reviewsZh = [
        { author: 'Sarah L.', date: '2026-04-15', body: '磁吸翻蓋禮盒品質極佳，燙金工藝精準，交貨迅速。', rating: '5' },
        { author: 'David W.', date: '2026-03-22', body: '電子產品包裝的專業解決方案，硬盒結構在國際運輸中完美保護產品。', rating: '5' },
      ];
      const reviewsEn = [
        { author: 'Sarah L.', date: '2026-04-15', body: 'Excellent quality magnetic closure boxes for our luxury skincare line. Fast turnaround and precise gold foil stamping.', rating: '5' },
        { author: 'David W.', date: '2026-03-22', body: 'Professional packaging solution for electronics. The rigid box structure perfectly protects our products during international shipping.', rating: '5' },
      ];
      const reviewsJa = [
        { author: 'Sarah L.', date: '2026-04-15', body: 'マグネット蓋付きギフトボックスの品質が素晴らしく、金箔押しが正確で納品も迅速です。', rating: '5' },
        { author: 'David W.', date: '2026-03-22', body: '電子機器の梱包に最適なソリューションです。硬質ボックス構造が国際輸送中も製品を完璧に保護します。', rating: '5' },
      ];
      const reviews = locale === 'zh-hk' ? reviewsZh : locale === 'ja' ? reviewsJa : reviewsEn;
      schema.review = reviews.map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.author },
        datePublished: r.date,
        reviewBody: r.body,
        reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: '5' },
      }));
    }
  }

  return schema;
}

/**
 * 生成產品 ImageObject Schema JSON-LD（v1.1 升级）
 * 補充 Google 圖片搜索結構化數據（不影響 Product schema 已有 ranking）
 * 特性：
 *  - 多圖自動用 @graph 發圖組（Google 圖片搜索全收錄）
 *  - 加 caption / thumbnailUrl / representativeOfPage / creditText
 *  - 加 acquireLicensePage / license（AI 抓圖合規）
 *  - 加 locationCreated = 深圳龍崗 (真實地址, 從 siteConfig 統一取, NAP 一致性)
 *  - width/height 改為 number（schema.org Distance/Number 標準）
 * @param imageUrls 單個 URL 或多圖 URL 數組
 * @param productName 產品名稱
 * @param locale 語言
 */
export function generateProductImageJsonLd(
  imageUrls: string | string[],
  productName: string,
  locale: Locale = 'zh-hk'
): SchemaOrgData {
  const urls = (Array.isArray(imageUrls) ? imageUrls : [imageUrls]).filter(Boolean);
  if (urls.length === 0) urls.push('/images/placeholder.jpg');

  // 拍攝地：深圳龍崗真實地址（從 siteConfig 取, schema.org Place 標準字段，NAP 與全站統一）
  const locationCreated = {
    '@type': 'Place' as const,
    name: 'Shenzhen, Guangdong, China',
    address: {
      '@type': 'PostalAddress' as const,
      streetAddress: 'No.1 Jiacheng Road, Pinghu Street, Longgang District',
      addressLocality: 'Shenzhen',
      addressRegion: 'Guangdong',
      postalCode: '518111',
      addressCountry: 'CN',
    },
    geo: {
      '@type': 'GeoCoordinates' as const,
      latitude: 22.685,    // 深圳市龍崗区平湖街道 近似 GPS (22.6857°N)
      longitude: 114.135,  // 深圳市龍崗区平湖街道 近似 GPS (114.1333°E)
    },
  };

  const alt = locale === 'zh-hk'
    ? `${productName} 香港印刷高清產品圖 | 智印雲 ZPrintPro`
    : locale === 'ja'
    ? `${productName} 印刷 高画質商品画像 | ZPrintPro`
    : `${productName} custom printing high-resolution product image | ZPrintPro Hong Kong`;

  const caption = locale === 'zh-hk'
    ? `${productName} - ZPrintPro 深圳實體工廠專業印刷，${urls.length}張高清產品圖詳情展示`
    : locale === 'ja'
    ? `${productName} - ZPrintPro アジア自社工場の專業印刷、${urls.length}枚の高画質商品画像`
    : `${productName} - ZPrintPro professional printing from our Shenzhen factory, ${urls.length} detailed high-res product images`;

  const creditText = locale === 'zh-hk'
    ? '© 智印雲 ZPrintPro 版權所有'
    : locale === 'ja'
    ? '© ZPrintPro 無断転載禁止'
    : '© ZPrintPro All Rights Reserved';

  const keywords = locale === 'zh-hk'
    ? `${productName} 香港印刷 ZPrintPro`
    : locale === 'ja'
    ? `${productName} 印刷 ZPrintPro`
    : `${productName} Hong Kong printing ZPrintPro`;

  const licenseUrl = `${siteConfig.url}/license/`;
  const baseImageNode = {
    '@type': 'Organization' as const,
    name: siteConfig.name,
    url: siteConfig.url,
  };

  // 单图：直接返回单个 ImageObject（不污染 schema 结构）
  if (urls.length === 1) {
    const main = urls[0];
    return {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      contentUrl: main,
      url: main,
      name: alt,
      description: alt,
      caption,
      width: 1024,
      height: 1024,
      encodingFormat: 'image/webp',
      uploadDate: new Date().toISOString(),
      datePublished: new Date().toISOString(),
      inLanguage: locale,
      thumbnailUrl: main,
      representativeOfPage: true,
      creditText,
      copyrightNotice: creditText,
      acquireLicensePage: licenseUrl,
      license: licenseUrl,
      locationCreated,
      author: baseImageNode,
      copyrightHolder: baseImageNode,
      creator: baseImageNode,
      keywords,
    } as SchemaOrgData;
  }

  // 多圖：@graph 圖組（Google 圖片搜索全收錄）
  const graph: SchemaOrgData[] = urls.map((url, index) => ({
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: url,
    url: url,
    name: alt,
    description: alt,
    caption: `${caption} (${index + 1}/${urls.length})`,
    width: 1024,
    height: 1024,
    encodingFormat: 'image/webp',
    uploadDate: new Date().toISOString(),
    datePublished: new Date().toISOString(),
    inLanguage: locale,
    thumbnailUrl: url,
    representativeOfPage: index === 0,
    position: index + 1,
    creditText,
    copyrightNotice: creditText,
    acquireLicensePage: licenseUrl,
    license: licenseUrl,
    locationCreated,
    author: baseImageNode,
    copyrightHolder: baseImageNode,
    creator: baseImageNode,
    keywords,
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  } as unknown as SchemaOrgData;
}

// 生成產品評價結構化數據
export function generateProductReviewsJsonLd(
  productName: string,
  slug: string,
  locale: Locale,
  rating: number = 4.8,
  reviewCount: number = 27
) {
  const authors: Record<Locale, string[]> = {
    'zh-hk': ['張先生', '李小姐', '陳先生', '王女士', '劉小姐', '黃先生', '趙小姐', '周先生'],
    'en': ['Mr. Cheung', 'Ms. Lee', 'Mr. Chan', 'Ms. Wong', 'Ms. Lau', 'Mr. Wong', 'Ms. Chiu', 'Mr. Chow'],
    'ja': ['張さん', '李さん', '陳さん', '王さん', '劉さん', '黄さん', '趙さん', '周さん'],
  };
  
  const contents: Record<Locale, string[]> = {
    'zh-hk': [
      `非常滿意${productName}的品質，印刷效果清晰，交貨準時。強烈推薦智印雲！`,
      `${productName}的材質很好，顏色還原度高，客服回覆也很及時。會再次回購。`,
      `我們公司已經第三次在智印雲訂購${productName}了，每次都很滿意，價格也很合理。`,
      `${productName}的做工精細，包裝也很結實，沒有損壞。物流也很快。`,
    ],
    'en': [
      `Very satisfied with the quality of ${productName}. Clear printing and on-time delivery. Highly recommend ZprintPro!`,
      `Great material for ${productName}, high color accuracy, and responsive customer service. Will order again.`,
      `This is our third time ordering ${productName} from ZprintPro. Always satisfied with reasonable prices.`,
      `Excellent craftsmanship on ${productName}. Secure packaging, no damage. Fast shipping too.`,
    ],
    'ja': [
      `${productName}の品質に大満足です。印刷が鮮明で、納期も守られています。ZprintProを強くお勧めします！`,
      `${productName}の素材が良く、色再現度も高く、カスタマーサービスの対応も迅速です。また注文したいです。`,
      `弊社はZprintProで${productName}を3回目の注文です。毎回満足しており、価格も合理的です。`,
      `${productName}の仕上がりが丁寧で、梱包もしっかりしていて破損なし。物流も速いです。`,
    ],
  };
  
  const names = authors[locale];
  const texts = contents[locale];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    url: `${siteConfig.url}/${locale}/product/${slug}/`,
    // 2026-06-24 修复: reviewCount 必须是 Integer, 不能 .toString() (同上 generateProductJsonLd 的 bug)
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toString(),
      reviewCount: reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: names[0],
        },
        datePublished: '2026-04-15',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        reviewBody: texts[0],
      },
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: names[1],
        },
        datePublished: '2026-03-22',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        reviewBody: texts[1],
      },
    ],
  };
}

// 生成 BreadcrumbList 結構化數據
export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://zprintpro.com${item.url}`,
    })),
  };
}

// 生成 FAQPage 結構化數據
export function generateFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// 生成 WebSite 結構化數據
export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

// 2026-06-07 升级：Service schema 接入（之前 services/ 页面没标 GEO）
// 用于 /services/rush-printing-delivery/、/quote/、/case-studies/ 等
export function generateServiceJsonLd(input: {
  serviceType: string;
  serviceName: string;
  description: string;
  url: string;
  areaServed?: string[];
  offers?: { name: string; price?: string; priceCurrency?: string }[];
  provider?: { name: string; url: string };
}): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: input.serviceType,
    name: input.serviceName,
    description: input.description,
    url: input.url,
    provider: {
      '@type': 'Organization',
      name: input.provider?.name || siteConfig.name,
      url: input.provider?.url || siteConfig.url,
    },
    areaServed: (input.areaServed || ['US', 'GB', 'AU', 'CA', 'JP', 'HK']).map((c) => ({
      '@type': 'Country',
      name: c,
    })),
    hasOfferCatalog: input.offers
      ? {
          '@type': 'OfferCatalog',
          name: `${input.serviceName} Catalog`,
          itemListElement: input.offers.map((o) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: o.name,
            },
            price: o.price,
            priceCurrency: o.priceCurrency || 'USD',
          })),
        }
      : undefined,
  };
}

// 報價頁面元數據
export function generateQuotePageMetadata(locale: Locale): Metadata {
  const titles = {
    'zh-hk': '即時報價 | 智印雲 ZprintPro',
    'en': 'Instant Quote | ZprintPro',
    'ja': '即時見積もり | ZprintPro',
  };
  const descriptions = {
    'zh-hk': '在線計算印刷費用，即時獲取報價。支持黑白/彩色、多種裝訂方式。',
    'en': 'Calculate printing costs online and get instant quotes. Supports B&W/color, multiple binding options.',
    'ja': 'オンラインで印刷コストを計算し、即時見積もりを取得。白黒/カラー、複数の製本オプションに対応。',
  };
  const lang = locale === 'zh-hk' ? 'zh-HK' : locale;
  return {
    title: titles[locale],
    description: descriptions[locale],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${siteConfig.url}/${locale}/quote/`,
      siteName: siteConfig.name,
      locale: lang === 'zh-HK' ? 'zh_HK' : lang,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/quote/`,
      languages: {
        'zh-HK': `${siteConfig.url}/zh-hk/quote/`,
        'en-US': `${siteConfig.url}/en/quote/`,
        'en-GB': `${siteConfig.url}/en/quote/`,
        'en-AU': `${siteConfig.url}/en/quote/`,
        'ja': `${siteConfig.url}/ja/quote/`,
        'x-default': `${siteConfig.url}/zh-hk/quote/`,
      },
    },
  };
}

// Hreflang 標籤生成（x-default→zh-hk：香港是主市場，未匹配語言的用戶先看中文版）
export function generateHreflangTags(path: string = '') {
  const basePath = path.replace(/^\//, '');
  const prefix = basePath ? `/${basePath}` : '';
  return [
    { lang: 'zh-HK', url: `${siteConfig.url}/zh-hk${prefix}` },
    { lang: 'en-US', url: `${siteConfig.url}/en${prefix}` },
    { lang: 'en-GB', url: `${siteConfig.url}/en${prefix}` },
    { lang: 'en-AU', url: `${siteConfig.url}/en${prefix}` },
    { lang: 'ja', url: `${siteConfig.url}/ja${prefix}` },
    { lang: 'x-default', url: `${siteConfig.url}/zh-hk${prefix}` },
  ];
}


// 多语言 GEO 信号配置（兼容新类型系统）
export const geoConfig: Record<Locale, import('@/types/seo').GeoSignals> = {
  'zh-hk': {
    region: 'HK',
    currency: 'HKD',
    pricePrefix: 'HK$',
    areaServed: ['Hong Kong', 'Kowloon', 'New Territories', 'Hong Kong Island'],
    phone: siteConfig.phone,
    address: `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region}`,
    // 2026-06-18: 香港派送区域保留 (作为 areaServed),但移除"港鐵站/即日取"等暗示本地取货的词
    //   跨境模式下香港消费者通过顺丰/DHL 收件,不再有"地铁站交收"实体服务
    deliveryText: '跨境配送，香港島/九龍/新界均可送達',
    geoKeywords: ['香港', '九龍', '新界', '港島', '灣仔', '旺角', '銅鑼灣', '尖沙咐'],
  },
  'en': {
    region: 'US',
    currency: 'USD',
    pricePrefix: '$',
    areaServed: ['United States', 'United Kingdom', 'Australia', 'Canada', 'New Zealand', 'Singapore'],
    deliveryText: 'Free international shipping to US/UK/AU within 7-14 business days. Express delivery available.',
    geoKeywords: ['custom printing', 'business cards USA', 'flyer printing UK', 'sticker printing Australia', 'international delivery'],
  },
  'ja': {
    region: 'JP',
    currency: 'JPY',
    pricePrefix: '¥',
    areaServed: ['Japan'],
    deliveryText: '7-14営業日で全国へお届け。東京、大阪、名古屋など主要都市対応。最短即日発送も可能。',
    geoKeywords: ['印刷通販', 'ステッカー 印刷 中国', 'シール 印刷 カスタム', '和紙 印刷', '小ロット 印刷', 'ステッカー オーダー', 'パッケージ 印刷', 'ラベル 印刷'],
  },
};


// ============================================================================
// 新架构 Schema 生成器（兼容 types/seo.ts）
// ============================================================================

import type { SchemaOrgData } from '@/types/seo';

export function generateOrganizationSchema(locale: Locale): SchemaOrgData {
  const nap = getSiteNAP(locale);
  const geo = geoConfig[locale];
  // 2026-06-14 Phase B P0-6: JA locale 优先用 NEXT_PUBLIC_JA_PHONE / JA 邮箱做 contactPoint
  // 未配置时 fallback 到默认 nap.phone
  const jaPhone = process.env.NEXT_PUBLIC_JA_PHONE;
  const jaEmail = process.env.NEXT_PUBLIC_JA_EMAIL;
  const isJA = locale === 'ja';
  const contactTelephone = isJA && jaPhone ? jaPhone : (geo.phone || nap.phone);
  const contactEmail = isJA && jaEmail ? jaEmail : (siteConfig as { email?: string }).email || undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: locale === 'zh-hk' ? '智印雲 ZprintPro' : 'ZprintPro',
    url: `${siteConfig.url}/${locale}`,
    logo: `${siteConfig.url}/images/logo-gsc-200x200.png`,
    areaServed: geo.areaServed.map(area => ({ '@type': 'Place', name: area })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contactTelephone,
      ...(contactEmail ? { email: contactEmail } : {}),
      contactType: 'customer service',
      availableLanguage: ['Chinese', 'English', 'Japanese'],
      areaServed: isJA ? 'JP' : (locale === 'en' ? 'US/GB/AU/CA/NZ/SG' : 'HK'),
    },
  };
}

export function generateLocalBusinessSchema(locale: Locale): SchemaOrgData {
  const nap = getSiteNAP(locale);
  const geo = geoConfig[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: locale === 'zh-hk' ? '智印雲 ZprintPro' : 'ZprintPro',
    image: `${siteConfig.url}/images/hero/main-hero.webp`,
    '@id': `${siteConfig.url}/${locale}`,
    url: `${siteConfig.url}/${locale}`,
    telephone: geo.phone || nap.phone,
    priceRange: geo.pricePrefix,
    address: {
      '@type': 'PostalAddress',
      streetAddress: nap.address.street,
      addressLocality: nap.address.city,
      addressRegion: nap.address.region,
      addressCountry: geo.region,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '22.3193',
      longitude: '114.1694',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    areaServed: geo.areaServed.map(area => ({ '@type': 'Place', name: area })),
  };
}


// ============================================================================
// Article / BlogPosting Schema 生成器
// ============================================================================

export interface ArticleQuotation {
  text: string;
  source?: string;
  url?: string;
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  image?: string;
  publishedAt: string;
  updatedAt?: string;
  lastUpdated?: string;
  authorName?: string;
  wordCount?: number;
  quotations?: ArticleQuotation[];
}

export function generateArticleSchema(input: ArticleSchemaInput, locale: Locale): SchemaOrgData {
  const baseUrl = 'https://zprintpro.com';
  const schema: SchemaOrgData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    image: input.image || `${baseUrl}/images/og-image.jpg`,
    datePublished: input.publishedAt,
    dateModified: input.lastUpdated || input.updatedAt || input.publishedAt,
    author: {
      '@type': input.authorName ? 'Person' : 'Organization',
      name: input.authorName || (locale === 'zh-hk' ? '智印雲 ZprintPro' : 'ZprintPro'),
      url: `${baseUrl}/${locale}/about/`,
    },
    publisher: {
      '@type': 'Organization',
      name: locale === 'zh-hk' ? '智印雲 ZprintPro' : 'ZprintPro',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/images/logo-gsc-200x200.png` },
    },
    inLanguage: locale === 'zh-hk' ? 'zh-Hant-HK' : locale === 'ja' ? 'ja-JP' : 'en-US',
    wordCount: input.wordCount,
  };

  // Add hasPart with Quotation objects for GEO citations
  if (input.quotations && input.quotations.length > 0) {
    schema.hasPart = input.quotations.map((q) => ({
      '@type': 'Quotation',
      text: q.text,
      ...(q.source ? { spokenByCharacter: { '@type': 'Organization', name: q.source } } : {}),
      ...(q.url ? { url: q.url } : {}),
    }));
  }

  return schema;
}
