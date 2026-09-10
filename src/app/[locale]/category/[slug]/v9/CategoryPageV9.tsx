/**
 * PLP v9.1 — 貼紙印刷樣板路由渲染層（zh-hk 門控，僅 /zh-hk/category/stickers/）
 * 藍本: design/plp-v9.html 逐 section 映射；頁眉/左側分類欄/頁腳沿用現有組件（凍結區）
 * 數據全部取自現有數據源（內容零改動）：
 *   - 快速答案/數據徽章/渠道比較/6步流程/新FAQ/WhatsApp 模板: category-conversion-blocks.ts
 *   - 核心優勢/材質表/特殊加工/技術參數/服務節點/選購指南/FAQ: category-seo-content.ts
 *   - 產品卡: products.ts + pricing 錨點 helpers（與現有 CategoryProductCard 同源）
 *   - 行業場景: CategoryIndustries 同源數據（getIndustryCards）
 * 執行卡: 2026-09-09-autoclaw-plp-pdp-v91-execution-card.md (v1.3) 鎖定點 1-5
 */
import Image from 'next/image';
import { Locale } from '@/lib/seo';
import { Product, getProductDisplayTitle } from '@/data/products';
import { CategorySidebar } from '@/components/category/CategorySidebar';
import {
  getConversionBlocks,
  buildWhatsAppUrl,
} from '@/data/category-conversion-blocks';
import {
  categorySeoContent,
  getDefaultCategoryContent,
} from '@/data/category-seo-content';
import { getIndustryCards } from '@/components/category/CategoryIndustries';
import {
  getDisplayAnchor,
  convertToFromPrice,
  getPriceUnitWord,
} from '@/lib/pricing';
import { getProductMainImage } from '@/lib/product-image';
import { SpecFinderV9, SpecFinderOptions } from './SpecFinderV9';
import { TrustBadgeBlock } from './TrustBadgeBlock';

const normalizeTitle = (s: string): string => s.replace(/\s+/g, ' ').trim();

/* ---------- v9.2.1 B2 (2026-09-10): per-locale 模板文案 ----------
   zh-hk 值 = 定型页逐字不变 (B1 蓝本); en 值复用现有条目:
   CategoryProductCard en (hot/orderNow/moqSuffix/viewMore) · page.tsx en bannerTitle ·
   ProductWhyChooseUs en (Free Sample/Same-Day Delivery) · RegionalContent en (DHL Express) ·
   faq/page.tsx en (FAQs) · RegionalCta en (Get Instant Quote); 无现成源的功能性 UI 标签
   (SpecFinder 文案/部分 fallback) 为新 UI 元素最小 en 标签, 列报告已知偏差待老板复核。 */
interface V9Strings {
  hot: string;
  materialTag: string;
  moqTag: string;
  fromSuffix: string;
  orderNow: string;
  moqLine: (q: number, u: string) => string;
  bannerCaps: string[];
  bannerSubtitle: string;
  home: string;
  bannerAlt: (name: string) => string;
  specCountWord: string;
  specsChooseWord: string;
  fallbackCore: string;
  fallbackMaterial: string;
  fallbackFinishing: string;
  fallbackTech: string;
  serviceEyebrow: string;
  fallbackService: string;
  industriesTitle: string;
  industriesSub: string;
  tierA: string;
  tierB: string;
  viewFull: string;
  faqTitle: string;
  ctaHeading: string;
  ctaSub: string;
  getQuote: string;
  whatsapp: string;
  mrailPriceLabel: (p: string) => string;
  mrailCta: string;
  specMaterialPrefix: string;
  qtyLabel: (q: number) => string;
}
const V9T: Record<'zh-hk' | 'en' | 'ja', V9Strings> = {
  'zh-hk': {
    hot: '熱賣',
    materialTag: '[材質]',
    moqTag: '[起訂]',
    fromSuffix: '起',
    orderNow: '立即訂購',
    moqLine: (q, u) => `${q}${u || '件'}起訂 · 量大更優`,
    bannerCaps: ['免費打樣', '即日交貨', 'ISO9001 認證', '全港順豐速遞'],
    bannerSubtitle: '專業品質，價格透明，快速交貨',
    home: '首頁',
    bannerAlt: (name) => `${name}全品類實拍`,
    specCountWord: '款規格',
    specsChooseWord: '款規格任選',
    fallbackCore: '核心競爭優勢',
    fallbackMaterial: '材質工藝詳解',
    fallbackFinishing: '特殊加工選項',
    fallbackTech: '技術參數詳解',
    serviceEyebrow: 'Local Service · 香港',
    fallbackService: '本地化服務節點',
    industriesTitle: '服務行業與應用場景',
    industriesSub: '針對每個品類，我們整理了最常見的行業場景與對應方案。點擊了解詳情。',
    tierA: '主力行業',
    tierB: '次鋪行業',
    viewFull: '查看完整方案 →',
    faqTitle: '常見問題',
    ctaHeading: 'WhatsApp 直接詢價 · 30 秒發需求',
    ctaSub: 'WhatsApp 詢價後銀行轉賬 / 微信 / 支付寶香港 / PayPal · 24 小時內回覆',
    getQuote: '立即獲取報價',
    whatsapp: 'WhatsApp 查詢',
    mrailPriceLabel: (p) => `${p} 起`,
    mrailCta: '30 秒報價',
    specMaterialPrefix: '材質：',
    qtyLabel: (q) => `${q} 起`,
  },
  en: {
    hot: 'Hot',
    materialTag: '[Material]',
    moqTag: '[MOQ]',
    fromSuffix: '',
    orderNow: 'Order Now',
    moqLine: (q) => `${q} MOQ`,
    bannerCaps: ['Free Sample', 'Same-Day Delivery', 'ISO9001 Certified', 'DHL Express Global'],
    bannerSubtitle: 'Professional quality, transparent pricing, fast delivery',
    home: 'Home',
    bannerAlt: (name) => `${name} Full-Range Showcase`,
    specCountWord: 'Specs',
    specsChooseWord: 'Specs to Choose',
    fallbackCore: 'Core Advantages',
    fallbackMaterial: 'Materials & Craftsmanship',
    fallbackFinishing: 'Special Finishing Options',
    fallbackTech: 'Technical Specifications',
    serviceEyebrow: 'Local Service',
    fallbackService: 'Local Service Points',
    industriesTitle: 'Industries & Applications',
    industriesSub: 'Common industry scenarios with matching solutions for every category. Click for details.',
    tierA: 'Key Industry',
    tierB: 'Secondary',
    viewFull: 'View More →',
    faqTitle: 'FAQs',
    ctaHeading: 'WhatsApp Direct Quote · 30s Request',
    ctaSub: 'Pay after quote via Bank Transfer / WeChat Pay / Alipay / PayPal · reply within 24h',
    getQuote: 'Get Instant Quote',
    whatsapp: 'WhatsApp Us',
    mrailPriceLabel: (p) => `from ${p}`,
    mrailCta: '30s Quote',
    specMaterialPrefix: 'Material: ',
    qtyLabel: (q) => `From ${q}`,
  },
  /* v9.2.1 B3 (2026-09-10): ja 列 — 复用站内现有 ja 条目 (CategoryProductCard ja / page.tsx ja bannerTitle L309 /
     ProductWhyChooseUs ja / RegionalContent ja / faq 页「よくある質問」schema-extensions L752 / RegionalCta ja L54/60);
     UI 骨架标签 (材質/最小注文/コア競争力等) 为 ja 新最小功能标签, 列 B3 报告已知偏差 */
  ja: {
    hot: '人気',
    materialTag: '[材質]',
    moqTag: '[最小注文]',
    fromSuffix: '〜',
    orderNow: '今すぐ注文',
    moqLine: (q, u) => `${q}${u || '枚'}〜`,
    bannerCaps: ['無料サンプル', '即日納品', 'ISO9001認証', 'DHL速達'],
    bannerSubtitle: 'プロ品質、透明な価格、迅速な納品',
    home: 'ホーム',
    bannerAlt: (name) => `${name}の全ラインナップ印刷見本`,
    specCountWord: '種類',
    specsChooseWord: '種類から選べる',
    fallbackCore: 'コア競争力',
    fallbackMaterial: '素材と加工',
    fallbackFinishing: '特殊加工オプション',
    fallbackTech: '技術仕様',
    serviceEyebrow: 'Local Service',
    fallbackService: '国内対応サービス',
    industriesTitle: '導入事例と業界シーン',
    industriesSub: 'カテゴリごとに、よくある業界シーンと対応プランをまとめました。詳しくはクリック。',
    tierA: '主要業界',
    tierB: 'サブ業界',
    viewFull: '詳しく見る →',
    faqTitle: 'よくある質問',
    ctaHeading: 'WhatsAppで直接お問い合わせ · 30秒で依頼',
    ctaSub: '見積もり後、銀行振込 / WeChat Pay / Alipay / PayPal で決済 · 24時間以内に返信',
    getQuote: '無料お見積もり',
    whatsapp: 'WhatsAppで相談',
    mrailPriceLabel: (p) => `${p}〜`,
    mrailCta: '30秒見積もり',
    specMaterialPrefix: '材質：',
    qtyLabel: (q) => `${q}〜`,
  },
};

/* ---------- 通用小件（藍本 .eyebrow / h2.st / .sec-sub） ---------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 text-[14px] font-bold tracking-[0.14em] text-[#2873F5] uppercase mb-2.5">
      <span className="inline-block w-[22px] h-[3px] bg-[#F87314] rounded-[2px]" aria-hidden="true" />
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[clamp(23px,2.6vw,30px)] font-extrabold tracking-[-0.01em] leading-[1.3]">{children}</h2>;
}

/* ---------- 產品卡（藍本 .pcard，數據與現有 CategoryProductCard 同源） ---------- */

function V9ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const localePrefix = `/${locale}`;
  const imageSrc = getProductMainImage(product, locale);
  const anchor = getDisplayAnchor(product.slug, locale);
  const fromPrice = anchor
    ? anchor.big
    : convertToFromPrice(product.price_range, locale, product.category_slug, product.slug);
  const unitWord = getPriceUnitWord(product.price_range);
  // 门控保证运行时 locale ∈ {zh-hk, en, ja} (B3)
  const t9 = V9T[locale as 'zh-hk' | 'en' | 'ja'];
  const moqLine = anchor
    ? anchor.sub
    : t9.moqLine(product.minQuantity, unitWord);

  return (
    <article className="bg-white border border-[#E5E7EB] rounded-[14px] overflow-hidden flex flex-col shadow-[0_1px_3px_rgba(16,24,40,0.07)] transition-[box-shadow,border-color] duration-200 hover:border-[#C9D6F2] hover:shadow-[0_8px_24px_rgba(40,115,245,0.09)]">
      <a href={`${localePrefix}/product/${product.slug}/`} className="block relative [aspect-ratio:1/1] bg-[#F3F3F3] overflow-hidden before:content-[''] before:absolute before:z-[2] before:w-3 before:h-3 before:top-2 before:left-2 before:pointer-events-none before:border-t-[1.5px] before:border-l-[1.5px] before:border-[rgba(31,41,55,0.55)] after:content-[''] after:absolute after:z-[2] after:w-3 after:h-3 after:bottom-2 after:right-2 after:pointer-events-none after:border-b-[1.5px] after:border-r-[1.5px] after:border-[rgba(31,41,55,0.55)]">
        {product.isHot && (
          <span className="absolute top-2.5 left-2.5 z-[3] bg-[#F87314] text-white text-[12.5px] font-bold px-2.5 py-1 rounded-[5px] tracking-[0.05em]">
            {t9.hot}
          </span>
        )}
        <Image
          src={imageSrc}
          alt={normalizeTitle(getProductDisplayTitle(product, locale))}
          fill
          className="object-cover"
          unoptimized
          loading="lazy"
          sizes="(max-width: 1024px) 50vw, 420px"
        />
      </a>
      <div className="p-[18px] pt-[18px] pb-5 flex flex-col flex-1">
        <h3 className="text-[16.5px] font-bold leading-[1.5] h-12 overflow-hidden line-clamp-2 mb-2.5">
          <a href={`${localePrefix}/product/${product.slug}/`} className="hover:text-[#2873F5]">
            {normalizeTitle(getProductDisplayTitle(product, locale))}
          </a>
        </h3>
        <div className="font-mono text-[13px] text-[#6B7280] tracking-[0.02em] h-[2.6em] overflow-hidden leading-[1.5] mb-3">
          {product.specs?.material && <span className="whitespace-nowrap mr-2.5">{t9.materialTag} {product.specs.material}</span>}
          <span className="whitespace-nowrap mr-2.5">{t9.moqTag} {product.minQuantity} {unitWord ? unitWord.replace('/', '') : '件'}</span>
        </div>
        <div className="flex items-baseline gap-1.5 h-8 whitespace-nowrap">
          <span className="font-mono text-[27px] font-bold text-[#F87314] tracking-[-0.02em]">{fromPrice}</span>
          <span className="text-[14px] text-[#6B7280]">{anchor ? anchor.unitLabel : ''}{t9.fromSuffix}</span>
        </div>
        <div className="text-[13.5px] text-[#6B7280] h-[1.6em] whitespace-nowrap overflow-hidden text-ellipsis mb-3.5">{moqLine}</div>
        <a
          href={`${localePrefix}/product/${product.slug}/`}
          className="mt-auto block text-center bg-[#2873F5] text-white font-bold text-[15.5px] py-[13px] rounded-[9px] hover:bg-[#1E5FD1] transition-colors"
        >
          {t9.orderNow}
        </a>
      </div>
    </article>
  );
}

/* ---------- 主組件 ---------- */

export function CategoryPageV9({
  locale,
  slug,
  categoryName,
  categoryNameEn,
  pageH1,
  products,
}: {
  locale: Locale;
  slug: string;
  categoryName: string;
  categoryNameEn: string;
  pageH1: string;
  products: Product[];
}) {
  const localePrefix = `/${locale}`;
  // 门控保证运行时 locale ∈ {zh-hk, en, ja} (B3)
  const t9 = V9T[locale as 'zh-hk' | 'en' | 'ja'];
  const conv = getConversionBlocks(slug, locale);
  const seo =
    categorySeoContent[slug]?.[locale as 'zh-hk' | 'en' | 'ja'] ??
    getDefaultCategoryContent(slug, locale);

  const quickAnswers = conv?.quickAnswers ?? [];
  const socialProof = conv?.socialProof ?? [];
  const compare = conv?.comparisonTable;
  const orderFlow = conv?.orderFlow;
  const waTemplate = conv?.whatsappTemplates?.[0]?.message ?? '';
  const waUrl = buildWhatsAppUrl(waTemplate);
  const quoteUrl = `${localePrefix}/quote/`;

  const faqItems = [...(conv?.newFaqs ?? []), ...(seo.faq ?? [])];
  const advantages = seo.coreAdvantages?.items ?? [];
  const materialTable = seo.materialTable;
  const specialOptions = seo.specialOptions?.items ?? [];
  const techSpecs = seo.techSpecs?.items ?? [];
  const serviceNodes = seo.serviceNodes?.items ?? [];
  const industryCards = getIndustryCards(slug, locale);
  const guide = seo.buyingGuide;
  const guideLead = guide?.paragraphs?.[0] ?? '';
  const guideKey = guide?.paragraphs?.find((p) => p.startsWith('行業場景速配')) ?? '';
  const guideBody = (guide?.paragraphs ?? []).filter((p) => p !== guideLead && p !== guideKey);

  // B1 泛化 (2026-09-10): hero 圖按真實文件名映射 (ls public/images/hero/ 實證, 禁止編造圖名)。
  // 占位: greeting-cards / japan-doujin / wedding-invitations / place-cards 無對應圖 → 橙系占位漸變 (v9.2.1 裁决4 护栏3: 占位同步换橙, 注释声明保留)。
  const V9_HERO_BASE: Record<string, string> = {
    stickers: 'hero-sticker',
    flyers: 'hero-flyer',
    packaging: 'hero-gift-box',
    'paper-bags': 'hero-kraft-bag',
    posters: 'hero-poster',
    banners: 'hero-banners',
    books: 'hero-books',
    educational: 'hero-educational',
    envelopes: 'hero-envelopes',
    calendars: 'hero-calendars',
    'red-packets': 'hero-red-packets',
    menus: 'hero-menus',
  };
  const heroBase = V9_HERO_BASE[slug];
  const bannerImage = heroBase ? `/images/hero/${heroBase}-${locale}.webp` : null;
  const minBase = products.reduce((m, p) => Math.min(m, p.basePrice), Number.POSITIVE_INFINITY);
  const mrailPrice = Number.isFinite(minBase) ? `HK$${minBase.toFixed(2)}` : '';
  const usCol = compare ? compare.columns.length - 1 : -1;

  // B1 泛化: 產品網格 eyebrow — stickers 保持藍本「Sticker Printing」(定型頁逐像素不變),
  // 其餘類目用各分類現有 nameEn (products.ts 註冊, 內容零改寫)。
  // B3: ja 一律用 ja 類目名 (getCategoryName ja, 如「ステッカー印刷」), 不用英文 eyebrow。
  const gridEyebrow = locale === 'ja' ? categoryName : slug === 'stickers' ? 'Sticker Printing' : categoryNameEn;

  // B1 泛化: 非 stickers 類目由 products 實數據派生 SpecFinder 材質/數量選項 (內容零編造)。
  // stickers 不傳 options → SpecFinderV9 沿用硬編碼默認, 定型頁不變。
  const specOptions: SpecFinderOptions | undefined =
    slug === 'stickers'
      ? undefined
      : (() => {
          const seen = new Set<string>();
          const materials: { label: string; slug: string }[] = [];
          for (const p of products) {
            const m = p.specs?.material;
            if (m && !seen.has(m)) {
              seen.add(m);
              materials.push({ label: `${t9.specMaterialPrefix}${m}`, slug: p.slug });
            }
          }
          const qtySeen = new Set<number>();
          const quantities: string[] = [];
          for (const p of products) {
            if (!qtySeen.has(p.minQuantity)) {
              qtySeen.add(p.minQuantity);
              quantities.push(t9.qtyLabel(p.minQuantity));
            }
          }
          quantities.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
          return { materials, quantities, defaultSlug: products[0]?.slug ?? 'waterproof-stickers' };
        })();

  const bannerCaps = t9.bannerCaps;

  return (
    <main className="bg-white text-[#1F2937] text-[17.5px] leading-[1.75] pb-16 sm:pb-0">
      {/* ═══ Banner — 同導航欄寬 1320px 居中 + 與首頁輪播圖同高 (h-300/md-400); H1 真實疊圖（遮罩保對比度, 非 CSS 隱藏） ═══ */}
      <section className="max-w-[1320px] mx-auto">
        <div
          className="relative overflow-hidden h-[300px] md:h-[400px] text-white"
          style={{ backgroundImage: 'var(--color-orange-grad)' }}
        >
          {bannerImage && (
            <Image
              src={bannerImage}
              alt={t9.bannerAlt(categoryName)}
              fill
              className="object-cover"
              unoptimized
              priority
              sizes="(max-width: 1320px) 100vw, 1320px"
            />
          )}
          {/* 對比度遮罩（token: --color-orange-grad-overlay, v9.2.1 裁决4: 藏青→橙系）: 左深右淺, 保證 H1/麵包屑可讀 */}
          <div aria-hidden="true" className="absolute inset-0" style={{ background: 'var(--color-orange-grad-overlay)' }} />
          <div className="relative z-[1] h-full flex flex-col justify-center px-6 md:px-10">
            <nav aria-label="breadcrumb" className="text-[13px] text-white/75 mb-4">
              <a href={`${localePrefix}/`} className="hover:text-white transition-colors underline decoration-white/40 underline-offset-4">{t9.home}</a>
              <span className="mx-2">/</span>
              <span className="text-white">{categoryName}</span>
            </nav>
            <h1 className="text-[clamp(24px,2.5vw,34px)] font-extrabold tracking-[-0.01em] leading-[1.3] max-w-[820px] drop-shadow-sm">{pageH1}</h1>
            <p className="mt-2.5 text-[16.5px] text-white/85">{t9.bannerSubtitle}</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {bannerCaps.map((cap) => (
                <span key={cap} className="inline-flex items-center gap-[7px] bg-white/15 border border-white/30 backdrop-blur-[2px] px-[15px] py-2 rounded-full text-[14px] font-semibold">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="#FFE8D6" strokeWidth="2" aria-hidden="true"><path d="M20 7L9 18l-5-5" /></svg>
                  {cap}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 藍本 .main — 凍結左欄 + 右欄 ═══ */}
      <div className="max-w-[1320px] mx-auto px-6 pt-9 pb-20 grid gap-9 items-start lg:grid-cols-[248px_minmax(0,1fr)]">
        {/* 左側分類欄（凍結區: 生產沿用現有組件; sticky 偏移與首頁 WhyChooseUs 同源 110px, 避讓 sticky 導航; 修訂輪3: 撤回滾動容器/手風琴, 恢復輪1 樣式） */}
        <aside className="lg:sticky lg:top-[110px]">
          <CategorySidebar locale={locale} currentCategorySlug={slug} />
        </aside>

        {/* 右欄 */}
        <div>
          {/* 1. 3 個直接答案（數據: conversion quickAnswers） */}
          {quickAnswers.length > 0 && (
          <section className="mb-16">
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {quickAnswers.map((a) => (
                <div key={a.q} className="bg-white border border-[#E5E7EB] rounded-[14px] px-[18px] pt-[18px] pb-4 shadow-[0_1px_3px_rgba(16,24,40,0.07)]">
                  <div className="font-bold text-[16px] mb-2 flex gap-2 items-baseline">
                    <span className="font-mono text-[12px] font-bold text-white bg-[#2873F5] rounded-[5px] px-1.5 py-0.5 shrink-0 -translate-y-px">Q</span>
                    {a.q}
                  </div>
                  <p className="text-[15px] text-[#6B7280] leading-[1.7]">{a.a}</p>
                </div>
              ))}
            </div>
          </section>
          )}

          {/* 2. 產品網格（K3 拍板: SKU 優先; 數據: products.ts 同源） */}
          <section className="mb-16">
            <Eyebrow>{gridEyebrow} · {products.length} {t9.specCountWord}</Eyebrow>
            <SectionTitle>{categoryName} — <em className="not-italic text-[#F87314]">{products.length} {t9.specsChooseWord}</em></SectionTitle>
            {/* v9.2.1 裁决3 (K3 9/10 15:19): 產品計數行删除 — H2+eyebrow 已含数量, 三重重复纯噪音 (全 16 分类) */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5 mt-6">
              {products.map((p) => (
                <V9ProductCard key={p.sku_code} product={p} locale={locale} />
              ))}
            </div>

            {/* 3. SpecFinder 緊湊版（K3 拍板: 網格之後的挽回工具） */}
            <SpecFinderV9 locale={locale} waUrl={waUrl} options={specOptions} />
          </section>

          {/* 4. 核心競爭優勢（數據: seo.coreAdvantages） */}
          <section className="mb-16">
            <Eyebrow>Why ZprintPro</Eyebrow>
            <SectionTitle>{advantages.length > 0 ? seo.coreAdvantages?.title : t9.fallbackCore}</SectionTitle>
            <div className="border-t border-[#E5E7EB] mt-5">
              {advantages.map((adv, i) => (
                <div key={adv.heading} className="grid lg:grid-cols-[88px_1fr] gap-4 lg:gap-6 py-[30px] border-b border-[#E5E7EB]">
                  <div className="font-mono text-2xl lg:text-[36px] font-bold text-[#F87314] tracking-[-0.03em] leading-[1.1]">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="text-[19px] font-extrabold mb-2">{adv.heading.replace(/^\d+\.\s*/, '')}</h3>
                    <ul>
                      {adv.points.map((pt) => (
                        <li key={pt} className="text-[16px] text-[#444444] pl-[18px] relative mb-1.5 before:content-[''] before:absolute before:left-0 before:top-[0.62em] before:w-2 before:h-2 before:rounded-[2px] before:bg-[#2873F5]">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. 材質工藝詳解（數據: seo.materialTable） */}
          <section className="mb-16 bg-[#F2F6FF] rounded-[22px] p-7 sm:p-8 lg:p-9">
            <Eyebrow>Materials</Eyebrow>
            <SectionTitle>{materialTable?.title ?? t9.fallbackMaterial}</SectionTitle>
            {materialTable?.subtitle && <p className="text-[#6B7280] text-[16px] mt-2 max-w-[680px]">{materialTable.subtitle}</p>}
            {materialTable && (
              <div className="overflow-hidden rounded-[14px] shadow-[0_1px_3px_rgba(16,24,40,0.07)] border border-[#E5E7EB] mt-5">
                <table className="w-full border-collapse text-[15.5px] bg-white [&_tbody_tr:nth-child(even)]:bg-[#F8FAFD]">
                  <thead>
                    <tr>
                      {materialTable.columns.map((c) => (
                        <th key={c} className="bg-[#1B3163] text-white text-left px-[18px] py-3.5 text-[15px] font-bold">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {materialTable.rows.map((r) => (
                      <tr key={r.material}>
                        <td className="px-[18px] py-[13px] border-b border-[#F0F1F3] align-top font-bold whitespace-nowrap">{r.material}</td>
                        <td className="px-[18px] py-[13px] border-b border-[#F0F1F3] align-top">{r.features}</td>
                        <td className="px-[18px] py-[13px] border-b border-[#F0F1F3] align-top font-mono text-[#6B7280]">{r.scenarios}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* 6. 特殊加工選項（數據: seo.specialOptions；藍本 85%/62% 統計行無數據來源, 依 §0.23 不上） */}
          <section className="mb-16">
            <Eyebrow>Finishing</Eyebrow>
            <SectionTitle>{seo.specialOptions?.title ?? t9.fallbackFinishing}</SectionTitle>
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 mt-5">
              {specialOptions.map((o) => (
                <div key={o.name} className="bg-white border border-[#E5E7EB] rounded-[14px] p-[18px] shadow-[0_1px_3px_rgba(16,24,40,0.07)]">
                  <h4 className="text-[17px] font-extrabold mb-[7px]">{o.name}</h4>
                  <p className="text-[15px] text-[#6B7280] leading-[1.65]">{o.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 7. 技術參數詳解（數據: seo.techSpecs） */}
          <section className="mb-16 bg-[#F2F6FF] rounded-[22px] p-7 sm:p-8 lg:p-9">
            <Eyebrow>Specifications</Eyebrow>
            <SectionTitle>{seo.techSpecs?.title ?? t9.fallbackTech}</SectionTitle>
            <dl className="grid gap-x-10 lg:grid-cols-2 bg-white border border-[#E5E7EB] rounded-[14px] px-[26px] py-2 shadow-[0_1px_3px_rgba(16,24,40,0.07)] mt-5">
              {techSpecs.map((s) => (
                <div key={s.label} className="grid grid-cols-[118px_1fr] gap-4 py-4 border-b border-[#F0F1F3] text-[15.5px]">
                  <dt className="font-bold text-[#1F2937]">{s.label}</dt>
                  <dd className="text-[#6B7280]">{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* 8. 本地化服務節點（數據: seo.serviceNodes） */}
          <section className="mb-16">
            <Eyebrow>{t9.serviceEyebrow}</Eyebrow>
            <SectionTitle>{seo.serviceNodes?.title ?? t9.fallbackService}</SectionTitle>
            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 mt-5">
              {serviceNodes.map((n, i) => (
                <div key={n.title} className="bg-white border border-[#E5E7EB] rounded-[14px] p-5 shadow-[0_1px_3px_rgba(16,24,40,0.07)]">
                  <div className="w-11 h-11 rounded-xl bg-[#2873F5] flex items-center justify-center mb-3">
                    <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] stroke-white fill-none" strokeWidth="1.8" aria-hidden="true">
                      {i === 0 && <><path d="M12 21s-7-5.5-7-11a7 7 0 0114 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>}
                      {i === 1 && <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9h10M7 13h6" /></>}
                      {i === 2 && <><path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" /><path d="M9 12l2 2 4-4" /></>}
                    </svg>
                  </div>
                  <h4 className="text-[17px] font-extrabold mb-[7px]">{n.title}</h4>
                  <p className="text-[15px] text-[#6B7280] leading-[1.65]">{n.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 9. 服務行業與應用場景（數據: CategoryIndustries 同源 getIndustryCards） */}
          {industryCards.length > 0 && (
            <section className="mb-16 bg-[#F2F6FF] rounded-[22px] p-7 sm:p-8 lg:p-9">
              <Eyebrow>Industries</Eyebrow>
              <SectionTitle>{t9.industriesTitle}</SectionTitle>
              <p className="text-[#6B7280] text-[16px] mt-2 max-w-[680px]">{t9.industriesSub}</p>
              <div className="grid gap-4 lg:grid-cols-2 mt-5">
                {industryCards.map((card, i) => (
                  <div key={`${card.industryName}-${i}`} className="bg-white border border-[#E5E7EB] rounded-[14px] p-[22px] shadow-[0_1px_3px_rgba(16,24,40,0.07)] flex gap-[18px]">
                    <div className="font-mono text-[13px] font-bold text-[#2873F5] border-[1.5px] border-[#2873F5] rounded-lg w-[34px] h-[34px] flex items-center justify-center shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h4 className="text-[17.5px] font-extrabold mb-2">
                        {card.industryName}
                        <span className="text-[12.5px] font-bold text-[#EA580C] bg-[#FEF1E6] rounded-[5px] px-2 py-0.5 ml-2 inline-block align-middle">
                          {card.tier === 'A' ? t9.tierA : t9.tierB}
                        </span>
                      </h4>
                      <ul className="mb-2.5">
                        {card.scenarios.map((s) => (
                          <li key={s} className="text-[15px] text-[#444444] pl-4 relative mb-1 before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-[7px] before:h-[7px] before:rounded-full before:bg-[#2873F5]">
                            {s}
                          </li>
                        ))}
                      </ul>
                      {card.covered && card.blogSlug && (
                        <a href={`${localePrefix}/blog/${card.blogSlug}/`} className="text-[15px] font-bold text-[#2873F5] hover:underline">{t9.viewFull}</a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 10. 數據徽章帶（數據: conversion socialProof） */}
          {socialProof.length > 0 && (
            <section className="mb-16">
              <div className="bg-[linear-gradient(165deg,#244780_0%,#1B3163_52%,#152649_100%)] rounded-[20px] text-white px-8 lg:px-10 py-11 grid grid-cols-2 lg:grid-cols-4 gap-6">
                {socialProof.map((s) => (
                  <div key={s.stat} className="text-center">
                    <div className="font-mono text-[clamp(28px,3vw,40px)] font-bold tracking-[-0.03em] leading-tight">{s.stat}</div>
                    <div className="text-[13px] text-white/70 mt-1.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 11. 選購指南（數據: seo.buyingGuide, 逐字） */}
          {guide && (
            <section className="mb-16">
              <Eyebrow>Buying Guide</Eyebrow>
              <SectionTitle>{guide.title}</SectionTitle>
              <div className="max-w-[80ch] mt-5">
                {guideLead && (
                  <p className="mb-6 pb-5 border-b-2 border-[#1F2937] text-[19px] text-[#1F2937] font-semibold leading-[1.85] [&::first-letter]:text-[3.2em] [&::first-letter]:font-extrabold [&::first-letter]:text-[#2873F5] [&::first-letter]:float-left [&::first-letter]:leading-[0.9] [&::first-letter]:mr-3 [&::first-letter]:mt-1.5">
                    {guideLead}
                  </p>
                )}
                {guideBody.map((p) => (
                  <p key={p.slice(0, 24)} className="mb-5 text-[17px] text-[#3A4250] leading-[1.9] text-justify">{p}</p>
                ))}
                {guideKey && (
                  <p className="bg-[#FEF1E6] border-l-4 border-[#F87314] rounded-r-xl px-5 py-4 text-[#1F2937] font-semibold text-[17px] leading-[1.9]">{guideKey}</p>
                )}
                {guide.links && guide.links.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {guide.links.map((l) => (
                      <a key={l.href} href={l.href} className="inline-flex items-center rounded-full border border-[#E5E7EB] bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[#1B3163] hover:border-[#2873F5] hover:text-[#2873F5] transition-colors">
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* 12. FAQ（數據: conversion newFaqs + seo.faq = 藍本 14 條） */}
          {faqItems.length > 0 && (
            <section className="mb-16">
              <Eyebrow>FAQ</Eyebrow>
              <SectionTitle>{t9.faqTitle}</SectionTitle>
              <div className="mt-5">
                {faqItems.map((f, i) => (
                  <details key={f.q} className="group bg-white border border-[#E5E7EB] rounded-xl mb-2.5 shadow-[0_1px_3px_rgba(16,24,40,0.07)]" open={i === 0}>
                    <summary className="cursor-pointer list-none px-[22px] py-[19px] font-bold text-[16.5px] flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="font-mono text-[22px] text-[#2873F5] transition-transform duration-200 group-open:rotate-45 shrink-0">+</span>
                    </summary>
                    <div className="px-[22px] pb-5 text-[15.5px] text-[#444444] leading-[1.85]">{f.a}</div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* 13. 6 步落單流程（數據: conversion orderFlow） */}
          {orderFlow && (
            <section className="mb-16 bg-[#F2F6FF] rounded-[22px] p-7 sm:p-8 lg:p-9">
              <Eyebrow>How to Order</Eyebrow>
              <SectionTitle>{orderFlow.title}</SectionTitle>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mt-7">
                {orderFlow.steps.map((s, i) => (
                  <div key={s.title} className="relative px-3.5 text-center">
                    {i < orderFlow.steps.length - 1 && (
                      <span aria-hidden="true" className="absolute top-6 left-[calc(50%+30px)] right-[calc(-50%+30px)] border-t-2 border-dashed border-[#C9D6F2]" />
                    )}
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-[#2873F5] text-[#2873F5] font-mono font-bold text-lg flex items-center justify-center mx-auto mb-3 relative z-[1]">
                      {i + 1}
                    </div>
                    <b className="block text-[15.5px] mb-1.5">{s.title}</b>
                    <p className="text-[14px] text-[#6B7280] leading-[1.6]">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 14. 渠道比較表（數據: conversion comparisonTable） */}
          {compare && (
            <section className="mb-16">
              <Eyebrow>Compare</Eyebrow>
              <SectionTitle>{compare.title}</SectionTitle>
              <div className="overflow-x-auto mt-5">
                <div className="min-w-[640px] overflow-hidden rounded-[14px] shadow-[0_1px_3px_rgba(16,24,40,0.07)] border border-[#E5E7EB]">
                  <table className="w-full border-separate border-spacing-0 text-[15.5px] bg-white">
                    <thead>
                      <tr>
                        {compare.columns.map((c, ci) => (
                          <th key={c} className={`px-[18px] py-3.5 text-left text-[15px] border-b border-[#F0F1F3] ${ci === usCol ? 'bg-[#F87314] text-white font-extrabold' : 'bg-[#F3F4F6] font-bold text-[#1F2937]'}`}>{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {compare.rows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, ci) => (
                            <td key={ci} className={`px-[18px] py-3.5 text-left border-b border-[#F0F1F3] align-top ${ci === 0 ? 'font-bold text-[#1F2937] whitespace-nowrap' : ''} ${ci === usCol ? 'bg-[#FEF1E6] font-semibold' : ''}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {compare.note && <p className="text-[12.5px] text-[#6B7280] mt-2.5">{compare.note}</p>}
            </section>
          )}

          {/* 15. 頁底 CTA（修訂輪3: 皇家藏青色塊底色; 付款清單按唐總指定口徑, PayPal 正確拼寫） */}
          <section className="mb-16">
            <div
              className="rounded-[20px] p-8 sm:p-12 text-center"
              style={{ background: 'var(--color-royal-navy-grad)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 14px 30px rgba(15,31,61,0.24)' }}
            >
              <h3 className="text-[clamp(22px,2.6vw,29px)] font-extrabold mb-2.5 text-white">{t9.ctaHeading}</h3>
              <p className="text-white/80 text-[16px] mb-6">{t9.ctaSub}</p>
              <div className="flex gap-3.5 justify-center flex-wrap">
                <a href={quoteUrl} className="inline-flex items-center gap-2 bg-[#F87314] text-white font-bold text-[16.5px] px-[34px] py-[15px] rounded-[11px] shadow-[0_8px_22px_rgba(248,115,20,0.3)] hover:brightness-95">
                  {t9.getQuote}
                </a>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold text-[16.5px] px-[34px] py-[15px] rounded-[11px] hover:brightness-95">
                  {t9.whatsapp}
                </a>
              </div>
            </div>
          </section>

          {/* 為何選擇智印港 — 信任色塊（組件復用: TrustBadgeBlock, 与 PDP 同源; B2: 传 locale, en 走现有条目） */}
          <TrustBadgeBlock locale={locale} />
        </div>
      </div>

      {/* 移動端吸底報價軌（藍本 .mrail; 價格 = products.ts basePrice 最低值） */}
      <div className="flex sm:hidden fixed left-0 right-0 bottom-0 z-[60] bg-white border-t border-[#E5E7EB] px-3.5 py-2.5 gap-2.5 items-center shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <span className="font-mono font-bold text-[#F87314] text-[16px] whitespace-nowrap">{t9.mrailPriceLabel(mrailPrice)}</span>
        <a href={quoteUrl} className="flex-1 text-center bg-[#F87314] text-white font-bold text-[13.5px] py-[11px] rounded-[9px]">{t9.mrailCta}</a>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-[#25D366] text-white font-bold text-[13.5px] py-[11px] rounded-[9px]">WhatsApp</a>
      </div>
    </main>
  );
}
