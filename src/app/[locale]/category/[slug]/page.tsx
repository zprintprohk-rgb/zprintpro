/**
 * 产品分类页 (PLP - Product Listing Page)
 * 对标 e-print.com.hk 二级页面布局
 * 顶部 1320×300 banner → 左侧分类导航 → 右侧 3列产品卡片（最多6个SKU）
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getCategoryBySlug,
  getProductsByCategory,
  getCategoryName,
  categories,
  products
} from '@/data/products';
import {
  generateCategoryMetadata,
  generateBreadcrumbJsonLd,
  generateBusinessJsonLd,
  Locale
} from '@/lib/seo';
import {
  generateCategoryItemListJsonLd,
  generateHowToJsonLd,
  generateSpeakableJsonLd,
  getCategoryHowToSteps,
  standardSpeakableSelectors,
} from '@/lib/seo/schema-extensions';
import Image from 'next/image';
import { JsonLd } from '@/components/JsonLd';
import { CategorySidebar } from '@/components/category/CategorySidebar';
import { CategoryProductCard } from '@/components/category/CategoryProductCard';
import { CategorySortSelect } from '@/components/category/CategorySortSelect';
import { Pagination } from '@/components/Pagination';
import { CategoryPillarContent, generateFaqSchema } from '@/components/CategoryPillarContent';
import { CategoryIndustries } from '@/components/category/CategoryIndustries';
import { CategorySharpHooks } from '@/components/category/CategorySharpHooks';
import { CategoryViewTracker } from '@/components/tracking/CategoryViewTracker';
import { RegionalContent, RegionalCta, RegionalTrustBadges } from '@/components/seo/RegionalContent';

// 生成静态参数 - 13分类 × 3语言 = 39个路径
export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  const locales: Locale[] = ['zh-hk', 'en', 'ja'];
  const categorySlugs = categories.map((c) => c.slug);

  locales.forEach((locale) => {
    categorySlugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });

  return params;
}

// 生成页面元数据
export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Not Found' };
  }

  return generateCategoryMetadata(locale, category.slug, category.name, category.nameEn, category.nameJa);
}

// 分类页组件
export default function CategoryPage({
  params,
  searchParams,
}: {
  params: { locale: Locale; slug: string };
  searchParams: { page?: string; sort?: string };
}) {
  const { locale, slug } = params;
  const category = getCategoryBySlug(slug);

  // 分类不存在时返回404
  if (!category) {
    notFound();
  }

  // 获取分类下的产品
  const categoryProducts = getProductsByCategory(slug);

  // 类目名 (per locale)
  const localizedCategoryName = locale === 'zh-hk'
    ? category.name
    : locale === 'en'
      ? (category.nameEn || category.name)
      : (category.nameJa || category.name);

  // 排序 — 2026-07-13 真正接上 sort 功能 (URL ?sort=price-asc/price-desc/popularity)
  // popularity = 默认, 按 products 数组原顺序 (跟 server-side default 一致)
  // price-asc / price-desc: parse price_range 字符串取起始价数字, 转 Number 排序
  const sortKey = (searchParams.sort || 'popularity').toLowerCase();

  // 提取 price_range 起价作为排序 key (e.g. "HK$0.38-0.80/張" -> 0.38)
  // 处理 "HK$"、"US$"、"¥"、逗号分隔符 (100,000 等)
  const parseMinPrice = (priceRange: string): number => {
    const match = priceRange.match(/[\d,.]+/);
    if (!match) return 0;
    const numStr = match[0].replace(/,/g, '');
    const num = parseFloat(numStr);
    return isNaN(num) ? 0 : num;
  };

  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (sortKey === 'price-asc') {
      return parseMinPrice(a.price_range) - parseMinPrice(b.price_range);
    }
    if (sortKey === 'price-desc') {
      return parseMinPrice(b.price_range) - parseMinPrice(a.price_range);
    }
    // popularity / default: 保留 server 返回的原始顺序
    return 0;
  });

  // 分页 - 每页最多6个SKU（引流分类不赚钱，不展示太多）
  const currentPage = parseInt(searchParams.page || '1', 10);
  const productsPerPage = 12;
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // 获取分类名称
  const categoryName = getCategoryName(category, locale);

  // 自定义 H1 映射（按 v5 doc, 10 category × 3 locale = 30 个 custom H1）
  // 主营 6 (stickers/flyers/packaging/paper-bags/red-packets/labels-as-stickers-sub) + 次要 4 (posters/banners/menus/books/educational)
  // 不优化 (P3 跳过): stickers / calendars / envelopes / notebooks
  // 2026-07-09 PM+UX+SEO 美国市场优化 v5: en 全部类目 H1 加 "Free Shipping + Made for USA + FedEx/DHL" sharp hook
  const customH1Map: Record<string, Record<string, string>> = {
    'packaging': {
      'zh-hk': '香港紙盒訂製 食品包裝 — 禮盒 / 化妝品盒 / 食品盒 / 快遞盒 / 天地蓋盒',
      'en': 'Custom Packaging Boxes Made in USA · 100 MOQ Free Shipping over $99 · Small Batch Custom Boxes',
      'ja': 'クラフト紙 パッケージ印刷 カスタム — ギフト / 化粧 / 食品 / メール便 / 組み立て',
    },
    'paper-bags': {
      'zh-hk': '紙袋 牛皮紙袋訂製 100本起印 | 智印港',
      'en': 'Paper Bag Custom Kraft Paper Bag Printing | 100 MOQ | ZprintPro',
      'ja': '紙袋 クラフト紙袋オーダー | 100個から | ZprintPro',
    },
'flyers': {
      // 2026-07-09 SEO 复盘 v3: 即日 + 數碼快印前置 (吸收原本独立 nav 「即日服務」权重)
      // 2026-07-09 v5 美国市场: 加 Free Shipping + FedEx Ground + Same Day sharp hook
      'zh-hk': '宣傳單張 A5 宣傳單張印刷 100本起印 | 智印港',
      en: 'China Catalog Printing Free Shipping over $99 · 100 MOQ A4/A5 Digital + FedEx Ground · Catalog Printing China',
      ja: '香港即日チラシ印刷 — A4/A5 デジタル+オフセット / 折込 / 開業チラシ / 24時間特急',
    },
    'menus': {
      'zh-hk': '香港菜單印刷 — PVC菜單 / 紙質菜單 / 精裝菜單 / 一次性菜單',
      'en': 'Custom Menus Free Shipping · 100 MOQ Waterproof PVC + Hardcover · Made for USA Restaurants',
      'ja': 'メニュー印刷 カスタム — PVC / 紙 / ハードカバー / 使い捨て',
    },
    'red-packets': {
      // 2026-08-30 K3 12:00 拍板窗 #3 + K3 12:51 暗示 "早执行 早收益": 加 11月前就位季节军令状 + 燙金 T1 词
      'zh-hk': '香港利是封印刷定製 11月前就位 — 燙金利是封 / 賀年紅包 / 卡通利是封 / 企業LOGO',
      'en': 'Custom Lai See Red Packets · 100 MOQ Foil 11月前就位 + CNY Wedding · USA Chinese Communities',
      'ja': 'ポチ袋印刷 カスタム 11月前就位 — 箔押し / 旧正月 / キャラクター / 企業ロゴ',
    },
    'stickers': {
      'zh-hk': '貼紙 小批量貼紙印刷 100本起印 | 智印港',
      'en': 'Sticker Small Batch Sticker Printing | 100 MOQ | ZprintPro',
      'ja': 'ステッカー 小ロットステッカー印刷 | 100個から | ZprintPro',
    },
    'posters': {
      'zh-hk': '海報 A2 海報印刷 100本起印 | 智印港',
      'en': 'Poster A2 Poster Printing | 100 MOQ | ZprintPro',
      'ja': 'ポスター A2 ポスター印刷 | 100個から | ZprintPro',
    },
    'banners': {
      'zh-hk': '香港摺頁印刷 — 易拉寶 / 戶外橫幅 / 摺頁印刷 / 展覽橫幅 / 車身廣告',
      'en': 'Custom Banners Free Shipping · 1 MOQ Roll-Up X-Stand Waterproof UV · USA Trade Show',
      'ja': 'バナー印刷 カスタム — ロールアップ / 屋外 / 展示 / 車両広告',
    },
    'books': {
      'zh-hk': '香港騎馬釘小冊子印刷 — 騎馬釘 / 膠裝書 / 精裝書 / 螺旋裝 / 兒童繪本',
      'en': 'Custom Book Printing Free Shipping · 50 MOQ Saddle Hardcover Perfect Bound · USA Authors',
      'ja': '冊子印刷 カスタム — 中綴じ / 無線綴じ / 上製本 / スパイラル / 絵本',
    },
    'educational': {
      'zh-hk': '香港校園教育印刷 — 證書 / 作業簿 / 教材 / 學業簿',
      'en': 'Custom Education Printing Free Shipping · 100 MOQ Certificates/Workbooks · USA Schools',
      ja: '教育印刷 カスタム — 証明書 / ワークブック / 教科書 / 学用品',
    },
    'envelopes': {
      'zh-hk': '香港信封印刷定製 — 牛皮信封 / 開窗信封 / 彩色信封 / 企業LOGO信封',
      en: 'Custom Envelopes Free Shipping · 100 MOQ Kraft Window Colored Corporate Logo',
      ja: '封筒印刷 カスタム — クラフト / 窓付き / カラー / 企業ブランディング',
    },
    'calendars': {
      // 2026-08-30 K3 12:00 拍板窗 #3 + K3 12:51 暗示 "早执行 早收益": 加 9月最後黃金窗季节军令状 + 燙金精裝 T1 词
      'zh-hk': '香港月曆印刷定製 2027 9月最後黃金窗 — 座檯月曆 / 掛牆月曆 / 企業LOGO / 燙金精裝',
      'en': 'Custom Calendars 2027 9月最後黃金窗 · 1000 MOQ 2027 Desk Wall Hardcover Foil · USA Corporate Gifts',
      'ja': 'カレンダー印刷 2027 9月最後黃金窗 — デスク / 壁掛け / 2027年 / 箔押し上製本',
    },
    'greeting-cards': {
      'zh-hk': '賀卡 燙金賀卡印刷 100本起印 | 智印港',
      'en': 'Greeting Card Foil Greeting Card Printing | 100 MOQ | ZprintPro',
      'ja': 'グリーティングカード 箔押しグリーティングカード印刷 | 100個から | ZprintPro',
    },
    // 2026-07-09 PM+UX+SEO 复盘: japan-doujin 是 14 类目里唯一缺 customH1 的,
    // 走 fallback `categoryName` = 「同人周邊印刷」, 不够 sharp hook.
    // 加 NAP-脱钩 sharp hook: 10本起 / A5+B5 / Comiket 24h特急 / 5 周邊類型
    'japan-doujin': {
      'zh-hk': '同人周邊印刷 10本起 · A5/B5 同人誌 / 亞克力 / 缶バッジ / 明信片 Comiket 24h 特急',
      en: 'Small Batch Doujinshi Printing Free Shipping · 10 MOQ Acrylic Can Badge Postcard · USA Anime Fans',
      ja: '同人誌印刷 10部〜 USA コミッション · A5/B5 / アクリル / 缶バッジ / ポストカード コミケ 24時間特急',
    },
    'wedding-invitations': {
      'zh-hk': '喜帖 燙金喜帖印刷 100本起印 | 智印港',
      'en': 'Wedding Invitation Foil Wedding Invitation Printing | 100 MOQ | ZprintPro',
      'ja': '結婚式招待状 箔押し結婚式招待状印刷 | 100個から | ZprintPro',
    },
    'place-cards': {
      'zh-hk': '枱卡 婚宴枱卡印刷 100本起印 | 智印港',
      'en': 'Place Card Wedding Place Card Printing | 100 MOQ | ZprintPro',
      'ja': '席札 結婚式席札印刷 | 100個から | ZprintPro',
    },
  };
  const pageH1 = customH1Map[slug]?.[locale] || categoryName;

  // 面包屑数据
  const breadcrumbItems = [
    { name: locale === 'zh-hk' ? '首頁' : locale === 'en' ? 'Home' : 'ホーム', url: `https://zprintpro.com/${locale}/` },
    { name: categoryName, url: `https://zprintpro.com/${locale}/category/${slug}/` },
  ];

  // 面包屑JSON-LD
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  // Category ItemList Schema — 产品列表结构化数据
  // 2026-06-10 Phase B 修复 P0-5：改用 schema-extensions 中的 generateCategoryItemListJsonLd，
  // 强製 url 走 SITE_URL 兜底，name 按 locale 切换。
  const itemListJsonLd = generateCategoryItemListJsonLd(categoryName, categoryProducts, locale);

  // 2026-06-10 Phase B 修复 P0-3：主钻 4 品类分类页注入 HowTo + Speakable。
  // 与产品页同源：让搜索/AI 知道"分类页工艺是什么"。
  const mainDrillingCategories = ['packaging', 'paper-bags', 'books', 'calendars'];
  const categoryHowto = mainDrillingCategories.includes(slug)
    ? getCategoryHowToSteps(slug, locale)
    : null;
  const howToJsonLd = categoryHowto
    ? generateHowToJsonLd(
        categoryHowto.name,
        categoryHowto.description,
        categoryHowto.steps,
        locale,
        categoryHowto.totalTime
      )
    : null;
  const speakableJsonLd = generateSpeakableJsonLd(
    standardSpeakableSelectors.category.xpath,
    standardSpeakableSelectors.category.cssSelector
  );

  // Business Schema — 按地區切換 LocalBusiness / Organization
  const businessJsonLd = generateBusinessJsonLd(locale);

  // 翻译文本
  const translations = {
    'zh-hk': {
      productsCount: `共 ${categoryProducts.length} 款產品`,
      sortBy: '排序方式',
      priceAsc: '價格由低到高',
      priceDesc: '價格由高到低',
      popularity: '熱門程度',
      noProducts: '暫無產品',
      prev: '上一頁',
      next: '下一頁',
      bannerTitle: '專業品質，價格透明，快速交貨',
      bannerSubtitle: '香港領先的印刷服務平台',
      cta: '立即報價',
    },
    'en': {
      productsCount: `${categoryProducts.length} Products`,
      sortBy: 'Sort By',
      priceAsc: 'Price: Low to High',
      priceDesc: 'Price: High to Low',
      popularity: 'Popularity',
      noProducts: 'No products found',
      prev: 'Previous',
      next: 'Next',
      bannerTitle: 'Professional Quality, Transparent Pricing, Fast Delivery',
      bannerSubtitle: 'Hong Kong\'s Leading Printing Service Platform',
      cta: 'Get Quote',
    },
    'ja': {
      productsCount: `全 ${categoryProducts.length} 商品`,
      sortBy: '並び替え',
      priceAsc: '価格: 安い順',
      priceDesc: '価格: 高い順',
      popularity: '人気順',
      noProducts: '商品が見つかりません',
      prev: '前へ',
      next: '次へ',
      bannerTitle: 'プロ品質、透明な価格、迅速な納品',
      bannerSubtitle: '香港を代表する印刷サービスプラットフォーム',
      cta: 'お見積もり',
    },
  };

  const t = translations[locale];
  const localePrefix = `/${locale}`;

  // Sort options — 必须在 t 声明后 (依赖 t.popularity / t.priceAsc / t.priceDesc)
  const sortOptions: { value: string; label: string }[] = [
    { value: 'popularity', label: t.popularity },
    { value: 'price-asc', label: t.priceAsc },
    { value: 'price-desc', label: t.priceDesc },
  ];

  // 分类 Banner 背景图映射（按 locale 动态匹配 hero webp）
  const categoryBannerMap: Record<string, string> = {
    'paper-bags': 'hero-kraft-bag',
    'flyers': 'hero-flyer',
    'stickers': 'hero-stickers',
    'packaging': 'hero-gift-box',
    'posters': 'hero-poster',
    'banners': 'hero-banners',
    'books': 'hero-books',
    'menus': 'hero-menus',
    'envelopes': 'hero-envelopes',
    'calendars': 'hero-calendars',
    'red-packets': 'hero-red-packets',
    'educational': 'hero-educational',
    'greeting-cards': 'hero-greeting-cards',
    'wedding-invitations': 'hero-wedding-invitations',
    'place-cards': 'hero-place-cards',
  };
  const bannerBase = categoryBannerMap[slug];
  const bannerImage = bannerBase ? `/images/hero/${bannerBase}-${locale}.webp` : undefined;
  const hasBannerImage = !!bannerImage;

  return (
    <>
      {/* 2026-08-29 K3 拍板: 类目页 → category-view 事件 → tracking_events (009) */}
      <CategoryViewTracker category={localizedCategoryName} productSlug={slug} />
      {/* 结构化数据：面包屑 + 产品列表 + 本地商家 + FAQPage + HowTo + Speakable */}
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={businessJsonLd} />
      {howToJsonLd && <JsonLd data={howToJsonLd} />}
      <JsonLd data={speakableJsonLd} />
      {(() => {
        const faqSchema = generateFaqSchema(locale, slug);
        return faqSchema ? <JsonLd data={faqSchema} /> : null;
      })()}

      <main className="min-h-screen bg-gray-50">
        {/* Banner 区域 - 1320×400，紧贴导航栏，图片背景 */}
        <div className="max-w-[1320px] mx-auto">
          <div className="relative w-full h-[400px] overflow-hidden">
            {/* 背景图或渐变 */}
            {hasBannerImage ? (
              <>
                <Image
                  src={bannerImage}
                  alt={categoryName}
                  fill
                  className="object-cover object-center"
                  unoptimized
                  priority
                  sizes="1320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-r from-[#2873F5] via-[#3B82F6] to-[#1E5FD1]" />
            )}
            {/* Banner 内容 + 面包屑整合到底部 */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end">
              <div className="max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-6">
                {/* 面包屑 */}
                <nav aria-label="breadcrumb" className="text-white/80 text-sm mb-2">
                  <a href={`/${locale}/`} className="hover:text-white transition-colors">
                    {locale === 'zh-hk' ? '首頁' : locale === 'en' ? 'Home' : 'ホーム'}
                  </a>
                  <span className="mx-2">/</span>
                  <span className="text-white font-medium">{categoryName}</span>
                </nav>
                <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                  {pageH1}
                </h1>
                <p className="text-white/90 text-base md:text-lg mt-2 drop-shadow-md max-w-2xl">
                  {t.bannerTitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sharp Hook 视觉锚点 (2026-07-09 PM+UX+SEO 复盘) — banner 之后、产品列表之前
            修复 paper-bags 类目页 749 imps / 0.13% CTR 的核心问题：用户进类目页看不到"我能印什么"
            复用 CategoryIndustries 同源数据的前 3 个 Tier A 场景，紧凑呈现 */}
        <CategorySharpHooks locale={locale} categorySlug={slug} />

        {/* 主内容区 - 左侧分类 + 右侧产品 */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 左侧分类导航 */}
            <aside className="w-full lg:w-56 flex-shrink-0">
              <CategorySidebar locale={locale} currentCategorySlug={slug} />
            </aside>

            {/* 右侧产品列表 */}
            <div className="flex-1">
              {/* 排序栏 — 浅灰条（共 N 款產品 + 熱門程度下拉）+ 橙色 CTA 无缝拼接 (2026-07-18: 蓝条改 gray-100, 与首页 HowItWorks 底部灰条同款) */}
              <div className="flex items-stretch mb-4 gap-0 rounded-t-lg overflow-hidden">
                <div className="bg-gray-100 text-slate-700 px-4 py-3 flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-1 h-5 bg-gray-300 rounded-full flex-shrink-0" />
                  <span className="font-semibold text-base whitespace-nowrap">
                    {t.productsCount}
                  </span>
                  <div className="ml-auto flex items-center gap-2 min-w-0">
                    <span className="text-slate-500 text-sm whitespace-nowrap hidden sm:inline">{t.sortBy}:</span>
                    <CategorySortSelect
                      defaultValue={sortKey}
                      options={sortOptions}
                      className="bg-white hover:bg-gray-50 text-slate-700 text-sm font-medium border border-gray-300 rounded-md pl-3 pr-8 py-1 focus:outline-none focus:ring-2 focus:ring-[#2873F5]/40 cursor-pointer transition-colors appearance-none bg-no-repeat bg-right disabled:opacity-60"
                    />
                  </div>
                </div>
                <a
                  href={`/${locale}/quote/`}
                  className="bg-[#F87314] hover:bg-[#E06613] text-white font-bold px-5 py-3 flex items-center gap-1.5 whitespace-nowrap transition-colors flex-shrink-0 text-[22px] leading-none"
                >
                  {locale === 'zh-hk' ? '免費獲取報價' : locale === 'ja' ? '無料見積もり' : 'Get Free Quote'}
                  <span aria-hidden="true">→</span>
                </a>
              </div>

              {/* 产品网格 - 3列，最多12条单页显示 */}
              {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {paginatedProducts.map((product, index) => (
                    <CategoryProductCard
                      key={product.sku_code}
                      product={product}
                      locale={locale}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                  <p className="text-gray-500">{t.noProducts}</p>
                </div>
              )}

              {/* 分页 — 仅当超过12条时显示 */}
              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    locale={locale}
                    baseUrl={`/${locale}/category/${slug}/`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buying Guide CTA — 选购指南入口 */}
        <BuyingGuideCta locale={locale} categorySlug={slug} />

        {/* Pillar Content — SEO支柱内容区 */}
        <CategoryPillarContent locale={locale} categorySlug={slug} />

        {/* 行业场景卡片 (2026-07-09 PM+UX v2 优化) — 类目页 hub, cross-link 到已铺矩阵博客 */}
        <CategoryIndustries locale={locale} categorySlug={slug} />

        {/* 地區化內容區域 — CTA + 信任信號 */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-12">
          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 md:p-12 space-y-8 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
            {/* 主標題 */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#111827] mb-5">
                {locale === 'zh-hk' ? '為何選擇智印港？' : locale === 'en' ? 'Why Choose ZprintPro?' : 'なぜZprintProを選ぶ？'}
              </h3>
              <RegionalTrustBadges locale={locale} />
            </div>
            {/* 專家介紹 */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-blue-100/60">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed text-center">
                <RegionalContent locale={locale} type="expertIntro" />
              </p>
            </div>
            {/* CTA區 */}
            <div className="text-center space-y-4">
              <p className="text-base md:text-lg text-gray-500">
                <RegionalContent locale={locale} type="shipping" />
              </p>
              <RegionalCta locale={locale} />
              <p className="text-sm text-gray-400">
                <RegionalContent locale={locale} type="pricingNote" />
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

// Buying Guide CTA Component
const categoryGuideMap: Record<string, string> = {
  'stickers': 'sticker-buying-guide',
  'flyers': 'flyer-buying-guide',
  'packaging': 'packaging-buying-guide',
  'posters': 'poster-buying-guide',
  'paper-bags': 'paper-bag-buying-guide',
  'banners': 'banner-buying-guide',
  'books': 'book-buying-guide',
  'menus': 'menu-buying-guide',
  'greeting-cards': 'greeting-card-buying-guide',
  'wedding-invitations': 'wedding-invitation-buying-guide',
  'place-cards': 'place-card-buying-guide',
  // 2026-08-30 K3 12:00 拍板窗 #3 + K3 12:51 暗示 "早执行 早收益": 月曆/利是封 季节军令状跨链到 9/15 硬截止 9月最后黄金窗 + 11月前就位 blog
  'calendars': '2027-calendar-printing-complete-guide',
  'red-packets': 'wedding-red-packet-printing-guide',
};

function BuyingGuideCta({ locale, categorySlug }: { locale: Locale; categorySlug: string }) {
  const guideSlug = categoryGuideMap[categorySlug];
  const hasSpecificGuide = !!guideSlug;

  const t = {
    'zh-hk': {
      label: '選購指南',
      cta: hasSpecificGuide ? '查看完整指南 →' : '瀏覽所有指南 →',
      title: '不知道怎麼選？看看我們的專業選購指南',
      desc: hasSpecificGuide ? '從材質、工藝到價格，為您詳細拆解選購要點。' : '涵蓋全部 13 個分類，從材質、工藝到價格，專家為您詳細拆解。',
    },
    'en': {
      label: 'Buying Guide',
      cta: hasSpecificGuide ? 'Read Full Guide →' : 'Browse All Guides →',
      title: 'Not Sure What to Choose?',
      desc: hasSpecificGuide ? 'From materials to finishes to pricing, our expert guide has you covered.' : 'Covering all 13 categories — from materials to finishes to pricing, our experts have you covered.',
    },
    'ja': {
      label: '選び方ガイド',
      cta: hasSpecificGuide ? 'ガイドを読む →' : 'すべてのガイドを見る →',
      title: 'どれを選べばいいか迷っていますか？',
      desc: hasSpecificGuide ? '材質から加工、価格まで、専門家のガイドで解決。' : '13カテゴリー全てをカバー。材質から加工、価格まで、専門家が解決します。',
    },
  }[locale];

  const localePrefix = `/${locale}`;
  const href = hasSpecificGuide
    ? `${localePrefix}/blog/${guideSlug}/`
    : `${localePrefix}/blog/`;

  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <a
        href={href}
        className="group block relative isolate overflow-hidden rounded-2xl p-7 md:p-9 text-white transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_14px_30px_rgba(15,31,61,0.22)]"
        style={{
          background: 'linear-gradient(165deg, #244780 0%, #1B3163 52%, #152649 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,.12)',
        }}
      >
        <span
          aria-hidden="true"
          className="absolute -top-[70px] -right-[60px] w-[240px] h-[240px] rounded-full pointer-events-none -z-10"
          style={{ background: 'radial-gradient(circle, rgba(93,144,235,.22), transparent 68%)' }}
        />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <span className="inline-flex items-center gap-2.5 text-[13px] font-semibold tracking-[.12em] uppercase text-[#9DB8F5] mb-3">
              <span className="inline-block w-[22px] h-[2px] bg-[#F87314]" aria-hidden="true" />
              {t.label}
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{t.title}</h3>
            <p className="text-white/70 mt-1.5 text-sm md:text-base">{t.desc}</p>
          </div>
          <span className="inline-flex items-center text-white font-bold whitespace-nowrap rounded-xl bg-[#F87314] px-6 py-3 text-[15px] shadow-[0_8px_24px_rgba(248,115,20,0.32)] transition-transform duration-200 group-hover:translate-x-1">
            {t.cta}
          </span>
        </div>
      </a>
    </div>
  );
}

// CategoryIndustries moved to src/components/category/CategoryIndustries.tsx (2026-07-09 PM+UX v2)
