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
} from '@/lib/products';
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
import { Pagination } from '@/components/Pagination';
import { CategoryPillarContent, generateFaqSchema } from '@/components/CategoryPillarContent';
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

  // 分页 - 每页最多6个SKU（引流分类不赚钱，不展示太多）
  const currentPage = parseInt(searchParams.page || '1', 10);
  const productsPerPage = 12;
  const totalPages = Math.ceil(categoryProducts.length / productsPerPage);
  const paginatedProducts = categoryProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // 获取分类名称
  const categoryName = getCategoryName(category, locale);

  // 自定义 H1 映射（按 v5 doc, 10 category × 3 locale = 30 个 custom H1）
  // 主营 6 (stickers/flyers/packaging/paper-bags/red-packets/labels-as-stickers-sub) + 次要 4 (posters/banners/menus/books/educational)
  // 不优化 (P3 跳过): business-cards / calendars / envelopes / notebooks
  const customH1Map: Record<string, Record<string, string>> = {
    'packaging': {
      'zh-hk': '香港包裝盒定制 — 禮盒 / 化妝品盒 / 食品盒 / 快遞盒 / 天地蓋盒',
      'en': 'Custom Packaging Boxes — Gift / Cosmetic / Food / Mailer / Rigid Boxes',
      'ja': 'パッケージボックス カスタム — ギフト / 化粧 / 食品 / メール便 / 組み立て',
    },
    'paper-bags': {
      'zh-hk': '香港紙袋印刷定制 — 牛皮紙袋 / 白卡紙袋 / 精品紙袋 / 環保紙袋',
      'en': 'Custom Paper Bags — Kraft / White Card / Eco-Friendly / Gift Bags',
      'ja': '紙袋印刷 カスタム — クラフト / ホワイトカード / エコ / ギフト',
    },
    'flyers': {
      'zh-hk': '香港宣傳單張印刷 — A4/A5 傳單 / 摺頁 / 開業傳單 / 加急',
      'en': 'Flyer Printing — A4 / A5 / Folded Leaflets / Grand Opening / Rush',
      'ja': 'チラシ印刷 — A4 / A5 / 折込 / 開業チラシ / 急ぎ対応',
    },
    'menus': {
      'zh-hk': '香港菜單印刷 — PVC菜單 / 紙質菜單 / 精裝菜單 / 一次性菜單',
      'en': 'Custom Menu Printing — PVC / Paper / Hardcover / Disposable',
      'ja': 'メニュー印刷 カスタム — PVC / 紙 / ハードカバー / 使い捨て',
    },
    'red-packets': {
      'zh-hk': '香港紅包印刷 — 利是封 / 賀年紅包 / 燙金紅包 / 卡通紅包',
      'en': 'Red Packet Printing — Chinese New Year / Foil Stamped / Cartoon / Custom',
      'ja': '紅包印刷 — 旧正月 / 箔押し / キャラクター / カスタム',
    },
    'stickers': {
      'zh-hk': '香港貼紙印刷定制 — 防水貼紙 / 透明貼紙 / 異形貼紙 / 標籤貼紙',
      'en': 'Custom Sticker Printing — Waterproof / Transparent / Die-Cut / Product Labels',
      'ja': 'ステッカー印刷 カスタム — 防水 / 透明 / ダイカット / 商品ラベル',
    },
    'posters': {
      'zh-hk': '香港海報印刷定制 — A1/A2 海報 / 戶外海報 / 展覽海報 / 大圖輸出',
      'en': 'Custom Poster Printing — A1/A2 / Outdoor / Exhibition / Large Format',
      'ja': 'ポスター印刷 カスタム — A1/A2 / 屋外 / 展示 / 大判出力',
    },
    'banners': {
      'zh-hk': '香港橫幅印刷 — 易拉寶 / 戶外橫幅 / 展覽橫幅 / 車身廣告',
      'en': 'Custom Banner Printing — Roll-Up / Outdoor / Exhibition / Vehicle Wrap',
      'ja': 'バナー印刷 カスタム — ロールアップ / 屋外 / 展示 / 車両広告',
    },
    'books': {
      'zh-hk': '香港畫冊印刷 — 騎馬釘 / 膠裝書 / 精裝書 / 螺旋裝 / 兒童繪本',
      'en': 'Custom Book Printing — Saddle Stitch / Perfect Bound / Hardcover / Spiral / Children',
      'ja': '冊子印刷 カスタム — 中綴じ / 無線綴じ / 上製本 / スパイラル / 絵本',
    },
    'educational': {
      'zh-hk': '香港校園教育印刷 — 證書 / 作業簿 / 教材 / 學業簿',
      'en': 'Custom Education Printing — Certificates / Workbooks / Textbooks / School Stationery',
      ja: '教育印刷 カスタム — 証明書 / ワークブック / 教科書 / 学用品',
    },
    'envelopes': {
      'zh-hk': '香港信封印刷定制 — 牛皮信封 / 開窗信封 / 彩色信封 / 企業LOGO信封',
      en: 'Custom Envelope Printing — Kraft / Window / Colored / Corporate Branding',
      ja: '封筒印刷 カスタム — クラフト / 窓付き / カラー / 企業ブランディング',
    },
    'calendars': {
      'zh-hk': '香港年曆印刷定制 — 座檯年曆 / 掛曆 / 月曆 / 2027年曆 / 企業LOGO',
      en: 'Custom Calendar Printing — Desk / Wall / Monthly / 2027 / Corporate Branding',
      ja: 'カレンダー印刷 カスタム — デスク / 壁掛け / 月別 / 2027年 / 企業ロゴ',
    },
    'business-cards': {
      'zh-hk': '香港咭片印刷定制 — 燙金名片 / UV名片 / 圓角名片 / 高檔名片',
      en: 'Custom Business Card Printing — Foil Stamped / UV / Rounded Corner / Premium Cards',
      ja: '名刺印刷 カスタム — 箔押し / UV / 丸角 / プレミアム名刺',
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
  // 强制 url 走 SITE_URL 兜底，name 按 locale 切换。
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

  // 分类 Banner 背景图映射（按 locale 动态匹配 hero webp）
  const categoryBannerMap: Record<string, string> = {
    'paper-bags': 'hero-kraft-bag',
    'flyers': 'hero-flyer',
    'stickers': 'hero-sticker',
    'packaging': 'hero-gift-box',
    'posters': 'hero-poster',
    'business-cards': 'hero-business-cards',
    'banners': 'hero-banners',
    'books': 'hero-books',
    'menus': 'hero-menus',
    'envelopes': 'hero-envelopes',
    'calendars': 'hero-calendars',
    'red-packets': 'hero-red-packets',
    'educational': 'hero-educational',
  };
  const bannerBase = categoryBannerMap[slug];
  const bannerImage = bannerBase ? `/images/hero/${bannerBase}-${locale}.webp` : undefined;
  const hasBannerImage = !!bannerImage;

  return (
    <>
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

        {/* 主内容区 - 左侧分类 + 右侧产品 */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 左侧分类导航 */}
            <aside className="w-full lg:w-56 flex-shrink-0">
              <CategorySidebar locale={locale} currentCategorySlug={slug} />
            </aside>

            {/* 右侧产品列表 */}
            <div className="flex-1">
              {/* 排序栏 */}
              <div className="flex items-center justify-between mb-6 bg-white rounded-lg border border-gray-200 px-4 py-3">
                <span className="text-gray-500 text-sm">
                  {t.productsCount}
                </span>
                <select
                  className="border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-[#2873F5] focus:border-transparent bg-white"
                  defaultValue="popularity"
                >
                  <option value="popularity">{t.popularity}</option>
                  <option value="price-asc">{t.priceAsc}</option>
                  <option value="price-desc">{t.priceDesc}</option>
                </select>
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

        {/* 地區化內容區域 — CTA + 信任信號 */}
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-12">
          <div className="bg-gradient-to-b from-white to-blue-50/50 rounded-3xl border border-blue-100 p-8 md:p-12 space-y-8">
            {/* 主標題 */}
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-[#333333] mb-5">
                {locale === 'zh-hk' ? '為何選擇智印雲？' : locale === 'en' ? 'Why Choose ZprintPro?' : 'なぜZprintProを選ぶ？'}
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
  'business-cards': 'business-card-buying-guide',
  'stickers': 'sticker-buying-guide',
  'flyers': 'flyer-buying-guide',
  'packaging': 'packaging-buying-guide',
  'posters': 'poster-buying-guide',
  'paper-bags': 'paper-bag-buying-guide',
  'banners': 'banner-buying-guide',
  'books': 'book-buying-guide',
  'menus': 'menu-buying-guide',
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
        className="block bg-gradient-to-r from-[#2873F5] to-[#1E5FD1] rounded-xl p-6 md:p-8 text-white hover:shadow-lg transition-shadow"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="inline-block bg-white/20 text-white text-xs font-medium px-2 py-1 rounded mb-2">
              {t.label}
            </span>
            <h3 className="text-xl md:text-2xl font-bold">{t.title}</h3>
            <p className="text-blue-100 mt-1 text-sm md:text-base">{t.desc}</p>
          </div>
          <span className="inline-flex items-center text-white font-semibold whitespace-nowrap">
            {t.cta}
          </span>
        </div>
      </a>
    </div>
  );
}
