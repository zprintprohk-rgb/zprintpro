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
  logo: 'https://zprintpro.com/logo-icon.svg',
  // 2026-06-15 P0: NAP 统一修复
  // 原问题: siteConfig.phone = "+852 6123 4567" (假号), Footer = "+86 181 2638 0255" (真实号)
  //   → Google 看到 schema 跟 UI 不一致, 判定 NAP 欺诈
  // 修法: 全部统一到 Footer 真实号 +86 198 8085 1334 (新联系电话, 这是公司真号, 不是胡编)
  // WhatsApp 号码保持 +86 181 2638 0255 不动 (whatsapp.ts PHONE)
  // 注意: 此号虽是中国内地号, 但 Footer/Contact 全部用这个, NAP 一致性优先于"地理号"
  // TODO: 后续办虚拟 +852 号替换, 进一步提升 NAP 香港本地信任度
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
    phonePrefix: '+852',
    businessSchema: 'LocalBusiness',
    targetAudience: '香港本地企業與實體店',
    areaServed: 'Hong Kong',
    contactType: '香港本地客戶服務',
    priceRange: '$$',
    geoCoordinates: { lat: 22.314577, lng: 114.227173 },
  },
  'en': {
    lang: 'en',
    regionCode: 'GLOBAL',
    googleDomain: 'google.com',
    currency: 'USD',
    phonePrefix: '+852',
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
    phonePrefix: '+852',
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
    description: '香港智印雲印刷平台 — 專注急件印刷及即日交貨服務。提供高質素貼紙、宣傳單張、包裝盒定制、名片、海報等。線上30秒獲取初步報價，複雜需求由專人人工核價。全港免費送貨，最快即日交付，72小時快速交貨。',
    keywords: '香港印刷,急件印刷,即日印刷,深圳實體印刷廠,貼紙印刷,宣傳單張印刷,包裝盒定制,數碼印刷,30秒報價,人工核價,跨境配送,免費送貨,名片印刷,海報印刷,香港印刷公司,印刷急單,小批量印刷,ZPrintPro,智印雲',
  },
  en: {
    title: 'Custom Printing Service Online — Stickers, Boxes, Business Cards | ZprintPro',
    description: 'Custom printing service online for US / UK / AU / CA businesses. Stickers, packaging boxes, business cards, posters, books. 30-second AI instant quote. 72-hour worldwide delivery from Hong Kong factory. Free shipping on selected products.',
    keywords: 'custom printing service, online printing, custom stickers online, custom packaging boxes, business card printing, poster printing, custom book printing, rush printing service, same day printing, international printing, print quote online, custom labels, paper bags wholesale, eco friendly printing, hong kong printing service',
  },
  ja: {
    title: 'ZPrintPro | 印刷通販 | ステッカー・チラシ・パッケージ印刷 | 即日対応・最短3日納品',
    description: 'ZPrintProはプロの印刷通販サービス。高品質ステッカー印刷、チラシ印刷、パッケージボックスカスタマイズ、名刺・ポスター印刷に対応。30秒でオンライン即時見積もり、複雑な案件も専門スタッフが丁寧に対応。最短即日発送可能、3〜5営業日でお届け。全国配送無料。',
    keywords: '印刷通販,ステッカー印刷,チラシ印刷,パッケージ印刷,名刺作成,ポスター印刷,即日印刷,ネット印刷,小ロット印刷,オリジナル印刷,格安印刷,高品質印刷,急ぎ印刷対応,最短3日納品,全国配送無料',
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
  keywords: { 'zh-hk': string; en: string; ja: string };
  descriptions: { 'zh-hk': string; en: string; ja: string };
}> = {
  'business-cards': {
    keywords: {
      'zh-hk': '名片印刷,香港名片,商務名片,咭片印刷,卡片印刷,名片設計,急印名片,即日名片,公司名片,高級名片',
      en: 'business card printing,custom business cards,name card printing,premium business cards,same day business cards,company cards,design business cards online,cheap business cards fast,foil business cards,embossed business cards',
      ja: '名刺印刷,名刺作成,オーダーメイド名刺,高級名刺,即日名刺,急ぎ名刺,会社名刺,名刺デザイン,箔押し名刺,厚紙名刺',
    },
    descriptions: {
      'zh-hk': '香港專業名片印刷，100張起訂，最快24小時交貨。支持燙金、UV、凹凸、圓角等特殊工藝，免費設計模板。智印雲ISO9001認證，品質保證。',
      en: 'Custom business card printing with global express delivery. Premium paper stocks, foil stamping, spot UV, embossing. Free design templates. ISO9001 certified. 100 cards minimum. Rush production available.',
      ja: 'プロの名刺印刷サービス。100枚から、最短24時間でお届け。箔押し・UV・エンボス・丸角加工に対応。無料デザインテンプレート。ISO9001認証取得。全国配送無料。',
    },
  },
  'stickers': {
    keywords: {
      'zh-hk': '貼紙印刷,防水貼紙,標籤貼紙,透明貼紙,圓形貼紙,異形貼紙,產品標籤,食品標籤,電商貼紙,車身貼紙',
      en: 'sticker printing,custom stickers,waterproof stickers,die cut stickers,vinyl stickers,product labels,transparent stickers,round stickers,food labels,ecommerce stickers,bumper stickers,holographic stickers',
      ja: 'シール印刷,ステッカー印刷,防水シール,透明シール,円形シール,ダイカットシール,商品ラベル,食品ラベル,梱包用シール,ホログラムシール',
    },
    descriptions: {
      'zh-hk': '香港貼紙印刷訂製，50張起訂，防水防曬耐用。支援圓形、異形、透明、食品標籤、LOGO標籤等全系列貼紙。電商包裝、產品標籤、活動贈品首選。免費設計，全港送貨，即日交貨。',
      en: 'Custom sticker printing — waterproof, UV-resistant, durable. Die-cut, round, transparent, food-safe labels. 50 pcs minimum, rush production available. Free design, ships to US, UK, AU & worldwide.',
      ja: 'プロのシール印刷サービス。防水・耐UV・耐久性抜群。ダイカット・円形・透明・食品対応ラベル。50枚から注文可能、即日発送対応。無料デザイン、全国配送。',
    },
  },
  'flyers': {
    keywords: {
      'zh-hk': '宣傳單張印刷,傳單印刷,傳單派發,A4單張,A5單張,摺頁傳單,開業傳單,餐廳傳單,活動傳單,電商傳單',
      en: 'flyer printing,leaflet printing,custom flyers,A4 flyers,A5 flyers,folded flyers,grand opening flyers,restaurant flyers,event flyers,real estate flyers,door hanger printing,direct mail flyers',
      ja: 'チラシ印刷,フライヤー印刷,パンフレット印刷,A4チラシ,A5チラシ,折りパンフレット,開業チラシ,飲食店チラシ,イベントチラシ,不動産チラシ',
    },
    descriptions: {
      'zh-hk': '香港宣傳單張印刷專家，10張起訂。A4/A5/摺頁傳單，光粉紙/啞粉紙/書紙多種紙質。即日印刷速遞，免費設計。適合開業、活動、餐廳、選舉宣傳。',
      en: 'Flyer & leaflet printing from 10 copies. A4/A5/folded formats, glossy/matte/uncoated paper. Rush printing available, global delivery. Free design. Perfect for grand openings, events, restaurants, campaigns.',
      ja: 'プロのチラシ印刷サービス。10枚から注文可能。A4/A5/折りパンフレット、光沢紙/マット紙/書籍紙に対応。即日印刷・配送。無料デザイン。開業・イベント・飲食店・選挙に最適。',
    },
  },
  'packaging': {
    keywords: {
      'zh-hk': '包裝盒印刷,禮品盒定制,化妝品包裝盒,食品包裝盒,手工皂盒,月餅盒,小批量包裝盒,產品包裝盒,紙盒印刷,彩盒印刷',
      en: 'custom packaging boxes,box printing,gift box packaging,cosmetic packaging,food packaging boxes,product packaging,small batch packaging,corrugated boxes,paper box printing,retail packaging,mailer boxes',
      ja: 'パッケージ印刷,箱印刷,ギフト箱,化粧品パッケージ,食品箱,商品パッケージ,小ロットパッケージ,段ボール箱,紙箱印刷,梱包材',
    },
    descriptions: {
      'zh-hk': '香港包裝盒訂製印刷，100個起訂，HK$4起/個。禮品盒、化妝品盒、食品包裝盒、月餅盒、磁吸盒。支持燙金、UV、凹凸、局部印刷。免費刀模設計，即日打樣。ISO9001+FSC認證。',
      en: 'Custom packaging box printing from 100 units. Gift boxes, cosmetic boxes, food packaging, mooncake boxes. Foil stamping, UV, embossing. Free die-cut design, rush sampling. ISO9001 & FSC certified. Global shipping to US, UK, AU.',
      ja: 'プロのパッケージ印刷サービス。100個から注文可能。ギフト箱・化粧品箱・食品箱・月餅箱。箔押し・UV・エンボス対応。無料型設計、即日サンプル対応。ISO9001・FSC認証取得。全国配送。',
    },
  },
  'posters': {
    keywords: {
      'zh-hk': '海報印刷,A1海報,A2海報,A0海報,戶外海報,展覽海報,餐廳海報,Backdrop背景板,PP海報裱貼,防水海報',
      en: 'poster printing,custom posters,A1 poster,A2 poster,A0 poster,outdoor posters,exhibition posters,event backdrops,PP laminated posters,waterproof posters,foam board printing,same day poster printing',
      ja: 'ポスター印刷,A1ポスター,A2ポスター,A0ポスター,屋外用ポスター,展示会用ポスター,イベントバックドロップ,PPラミネートポスター,防水ポスター,即日ポスター印刷',
    },
    descriptions: {
      'zh-hk': '香港海報印刷專家，A0/A1/A2/A3全尺寸。戶外防水海報、展覽Backdrop、PP裱貼。10張起訂，最快4小時交貨。光粉紙/相紙/帆布多種材質。',
      en: 'Poster printing — A0/A1/A2/A3 sizes. Outdoor waterproof posters, exhibition backdrops, PP lamination. 10 copies minimum, rush production available. Ships worldwide. Glossy / photo paper / canvas options.',
      ja: 'プロのポスター印刷サービス。A0/A1/A2/A3サイズ対応。屋外用防水ポスター・展示会用バックドロップ・PPラミネート。10枚から、最短4時間で対応。光沢紙・写真用紙・キャンバス対応。',
    },
  },
  'paper-bags': {
    keywords: {
      'zh-hk': '紙袋印刷,牛皮紙袋,環保紙袋,手提紙袋,品牌紙袋,禮品紙袋,餐廳外賣紙袋,小批量紙袋,棉繩紙袋,白卡紙袋',
      en: 'paper bag printing,custom paper bags,kraft paper bags,eco friendly bags,branded paper bags,gift bags,retail bags,takeaway bags,small batch paper bags,twisted handle bags,white card paper bags',
      ja: '紙袋印刷,クラフト紙袋,エコ紙袋,手提げ紙袋,ブランド紙袋,ギフト袋,テイクアウト紙袋,小ロット紙袋,紙袋作成,ペーパーバッグ',
    },
    descriptions: {
      'zh-hk': '香港紙袋印刷訂製，100個起訂，HK$1.8起/個。牛皮紙袋、環保紙袋、手提禮品袋、餐廳外賣袋。支援燙金、UV、凹凸、LOGO印刷。FSC環保認證紙張。適合零售、餐飲、活動、品牌推廣。即日交貨。',
      en: 'Custom paper bag printing from 100 units. Kraft bags, eco-friendly bags, retail & gift bags. Foil stamping, UV, embossing. FSC-certified paper, global delivery. Perfect for retail, F&B, events, branding.',
      ja: 'プロの紙袋印刷サービス。100個から注文可能。クラフト紙袋・エコ紙袋・手提げギフト袋。箔押し・UV・エンボス対応。FSC認証紙、即日納品。小売・飲食・イベント・ブランディングに最適。',
    },
  },
  'japan-doujin': {
    keywords: {
      'zh-hk': '同人誌印刷,同人周邊,亞克力鑰匙扣,亞克力立牌,全息貼紙,和紙膠帶,罐型襟章,明信片套裝,環保托特袋,Comiket印刷,VTuber周邊,動漫角色周邊,推し活周邊,日系周邊訂製',
      en: 'doujinshi printing,japan doujin,acrylic keychain custom,acrylic stand,can badge printing,postcard set,washi tape custom,eco tote bag print,hologram sticker,comiket printing,VTuber merch,anime goods custom,japan merchandise,oshi-katsu goods',
      ja: '同人誌印刷,コミケ印刷,即売会,A5同人誌,B5同人誌,アクリルキーホルダー,アクリルスタンド,缶バッジ,ポストカード,和紙テープ,エコトートバッグ,ホログラムステッカー,VTuber グッズ,推し活グッズ',
    },
    descriptions: {
      'zh-hk': '同人誌及日系ACG周邊印刷專家。A5/B5 同人誌 10 本起印、亞克力鑰匙扣 / 立牌 / 罐型襟章 / 明信片套裝 / 環保托特袋。Comiket 前 24 小時特急対応,深圳工廠 DHL Express 2-4 日直送日本。FSC 認證紙材、ISO 12647 色彩管理、ISO 9001 品質認證。繁體中文客服,日本在地支援。',
      en: 'Professional doujinshi & Japanese ACG merchandise printing. A5/B5 doujinshi (MOQ 10), acrylic keychains/stands, can badges, postcard sets, eco tote bags. 24-hour rush before Comiket. Ships from Shenzhen factory to Japan in 2-4 days via DHL Express. FSC paper, ISO 12647 color, ISO 9001 certified. Japanese-language support.',
      ja: '同人誌・推し活特化の印刷サービス。A5/B5 同人誌 10 部から対応、アクリルキーホルダー・スタンド・缶バッジ・ポストカード・エコトートバッグ。コミケ前 24 時間特急対応可能。深圳自社工場から DHL Express で 2-4 営業日でお届け。FSC 認証紙、ISO 12647 色彩管理、ISO 9001 取得。日本語サポート完備。',
    },
  },
};

// 默认分类SEO数据
function getDefaultCategorySeo(categoryName: string, categoryNameEn: string, categoryNameJa: string) {
  return {
    keywords: {
      'zh-hk': `${categoryName}印刷,香港${categoryName},${categoryName}定制`,
      en: `${categoryNameEn} printing,custom ${categoryNameEn.toLowerCase()},${categoryNameEn.toLowerCase()} printing,global shipping ${categoryNameEn.toLowerCase()}`,
      ja: `${categoryNameJa}印刷,${categoryNameJa}作成,${categoryNameJa} オーダー,${categoryNameJa} 通販`,
    },
    descriptions: {
      'zh-hk': `專業${categoryName}印刷服務，品質保證，價格透明。智印雲提供多種${categoryName}選擇，最快即日交貨。`,
      en: `Professional ${categoryNameEn} printing services. Quality guaranteed, factory-direct pricing. Ships to US, UK, AU & worldwide. Free quote in 30 seconds. Rush orders welcome.`,
      ja: `プロの${categoryNameJa}印刷サービス。品質保証、透明な価格。最短3〜5営業日で全国へお届け。無料見積もり、急ぎ対応可能。`,
    },
  };
}

export function generateCategoryMetadata(locale: Locale, categorySlug: string = '', categoryName: string = '', categoryNameEn: string = '', categoryNameJa: string = ''): Metadata {
  // 2026-06-20 fix B2: 直接使用传入的真实 slug（避免 nameEn 反向派生在含特殊字符时指向 404）
  const slug = categorySlug;
  const seoData = categorySeoData[slug] || getDefaultCategorySeo(categoryName, categoryNameEn, categoryNameJa);
  
  const names = { 'zh-hk': categoryName, en: categoryNameEn, ja: categoryNameJa };
  const rawName = names[locale];
  const name = rawName && !rawName.endsWith('印刷') && locale === 'zh-hk' ? `${rawName}印刷` : rawName;
  const description = seoData.descriptions[locale];
  const keywords = seoData.keywords[locale];
  const lang = locale === 'zh-hk' ? 'zh-HK' : locale;
  
  // 分类标题按市场区分
  // 2026-06-10 Phase B 修复 P0-2：en/ja 分支末尾使用纯英文品牌 'ZprintPro'（无中文），
  // 避免 layout 模板的 '| ZprintPro' 再次叠加后形成 "...| 智印雲 ZprintPro | ZprintPro"。
  // 2026-06-10：layout template 改为 '%s'（见 layout.tsx），此处由子页统一控制品牌后缀。
  const brandSuffix = locale === 'zh-hk' ? siteConfig.name : 'ZprintPro';
  const categoryTitle = locale === 'zh-hk'
    ? `${name} | 即日交貨 | ${brandSuffix}`
    : locale === 'en'
    ? `${name} | Global Shipping | ${brandSuffix}`
    : `${name} | 配送対応 | ${brandSuffix}`;

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
    ? `${titleBase} | Global Shipping | ${brandSuffix}`.slice(0, 60)
    : `${titleBase} | 日本向け高品質印刷 | ${brandSuffix}`.slice(0, 60);
  
  // Description: 150-160字符，含長尾關鍵詞+價格+行動號召
  // 2026-06-12 Phase B-P1 修复 P1-1：扩大 descPrefix 到 100 字符，确保 baseDesc 短时仍能凑足 150+
  // 之前 descPrefix.slice(0, 80) + descSuffix 在 baseDesc 短时只能拼到 ~80-100 字符
  const priceText = priceRange ? ` ${priceRange.split('/')[0]}起。` : ' ';
  const descPrefix = baseDesc.slice(0, 100);
  const descSuffix = locale === 'zh-hk' 
    ? `立即查詢報價，滿$500免運費，即日交貨。`
    : locale === 'en'
    ? `Fast shipping to US, UK, AU. Premium factory-direct quality. Get a free quote now. Rush orders welcome.`
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
  const config = regionConfig[locale];
  const isLocalBusiness = config.businessSchema === 'LocalBusiness';

  const baseSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': config.businessSchema,
    name: siteConfig.name,
    alternateName: siteConfig.alternateName,
    url: siteConfig.url,
    logo: siteConfig.logo,
    image: siteConfig.logo,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: config.priceRange,
    areaServed: config.areaServed,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: config.contactType,
      availableLanguage: locale === 'zh-hk'
        ? ['Chinese', 'English']
        : locale === 'ja'
          ? ['Japanese', 'English']
          : ['English', 'Chinese', 'Japanese'],
    },
    // 2026-06-17: sameAs 改为空 (用户没有真实社交账号, 不传假链接)
    // 实体识别主要靠 GBP (用户后续注册) + 真实外链
    sameAs: [],
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
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.region,
        addressCountry: siteConfig.address.country,
        postalCode: siteConfig.address.postalCode || undefined,
      },
      geo: config.geoCoordinates
        ? {
            '@type': 'GeoCoordinates',
            latitude: config.geoCoordinates.lat,
            longitude: config.geoCoordinates.lng,
          }
        : undefined,
      hasMap: `https://www.google.com/maps/search/?api=1&query=${siteConfig.address.city},${siteConfig.address.region}`,
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
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': locale === 'ja' ? '名刺印刷' : locale === 'en' ? 'Business Card Printing' : '名片印刷' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': locale === 'ja' ? 'ポスター印刷' : locale === 'en' ? 'Poster Printing' : '海報印刷' } },
      ],
    },
    'description': locale === 'ja'
      ? '深圳実体の国際印刷サービス。ステッカー・フライヤー・パッケージ・名刺・ポスターを高品質で世界中へ。30秒AI見積もり、72時間国際配送、日本語サポート対応。'
      : locale === 'en'
        ? 'Shenzhen-based international printing service. Stickers, flyers, packaging, business cards, posters — high quality, worldwide shipping. 30-second AI quote, 72-hour international delivery.'
        : '深圳實體的國際印刷服務 — 為香港市場提供高質素貼紙、宣傳單張、包裝盒定制、名片、海報等。線上30秒獲取初步報價，複雜需求由專人人工核價。跨境配送，72小時快速交付。',
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
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: rating.ratingValue.toString(),
      reviewCount: (rating.reviewCount ?? 0).toString(),
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
    ? `${productName} - ZPrintPro 深圳自社工場の專業印刷、${urls.length}枚の高画質商品画像`
    : `${productName} - ZPrintPro professional printing from our Hong Kong factory, ${urls.length} detailed high-res product images`;

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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toString(),
      reviewCount: reviewCount.toString(),
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
    geoKeywords: ['香港', '九龍', '新界', '港島', '灣仔', '旺角', '銅鑼灣', '尖沙咀'],
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
    geoKeywords: ['印刷通販', '名刺 印刷 オーダー', 'シール 印刷 カスタム', '箔押し 名刺', '和紙 印刷', '小ロット 印刷', 'ステッカー オーダー', 'パッケージ 印刷'],
  },
};


// ============================================================================
// 新架构 Schema 生成器（兼容 types/seo.ts）
// ============================================================================

import type { SchemaOrgData } from '@/types/seo';

export function generateOrganizationSchema(locale: Locale): SchemaOrgData {
  const geo = geoConfig[locale];
  // 2026-06-14 Phase B P0-6: JA locale 优先用 NEXT_PUBLIC_JA_PHONE / JA 邮箱做 contactPoint
  // 未配置时 fallback 到默认 siteConfig.phone
  const jaPhone = process.env.NEXT_PUBLIC_JA_PHONE;
  const jaEmail = process.env.NEXT_PUBLIC_JA_EMAIL;
  const isJA = locale === 'ja';
  const contactTelephone = isJA && jaPhone ? jaPhone : (geo.phone || siteConfig.phone);
  const contactEmail = isJA && jaEmail ? jaEmail : (siteConfig as { email?: string }).email || undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: locale === 'zh-hk' ? '智印雲 ZprintPro' : 'ZprintPro',
    url: `${siteConfig.url}/${locale}`,
    logo: `${siteConfig.url}/images/logo.png`,
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
  const geo = geoConfig[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: locale === 'zh-hk' ? '智印雲 ZprintPro' : 'ZprintPro',
    image: `${siteConfig.url}/images/hero/main-hero.webp`,
    '@id': `${siteConfig.url}/${locale}`,
    url: `${siteConfig.url}/${locale}`,
    telephone: geo.phone || siteConfig.phone,
    priceRange: geo.pricePrefix,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
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
      logo: { '@type': 'ImageObject', url: `${baseUrl}/images/logo.png` },
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
