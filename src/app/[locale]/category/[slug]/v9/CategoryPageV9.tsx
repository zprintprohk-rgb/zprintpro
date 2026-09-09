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
import { RegionalContent, RegionalCta, RegionalTrustBadges } from '@/components/seo/RegionalContent';
import { SpecFinderV9 } from './SpecFinderV9';

const normalizeTitle = (s: string): string => s.replace(/\s+/g, ' ').trim();

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
  const moqLine = anchor
    ? anchor.sub
    : locale === 'zh-hk'
      ? `${product.minQuantity}${unitWord || '件'}起訂 · 量大更優`
      : `${product.minQuantity} MOQ`;

  return (
    <article className="bg-white border border-[#E5E7EB] rounded-[14px] overflow-hidden flex flex-col shadow-[0_1px_3px_rgba(16,24,40,0.07)] transition-[box-shadow,border-color] duration-200 hover:border-[#C9D6F2] hover:shadow-[0_8px_24px_rgba(40,115,245,0.09)]">
      <a href={`${localePrefix}/product/${product.slug}/`} className="block relative [aspect-ratio:1/1] bg-[#F3F3F3] overflow-hidden before:content-[''] before:absolute before:z-[2] before:w-3 before:h-3 before:top-2 before:left-2 before:pointer-events-none before:border-t-[1.5px] before:border-l-[1.5px] before:border-[rgba(31,41,55,0.55)] after:content-[''] after:absolute after:z-[2] after:w-3 after:h-3 after:bottom-2 after:right-2 after:pointer-events-none after:border-b-[1.5px] after:border-r-[1.5px] after:border-[rgba(31,41,55,0.55)]">
        {product.isHot && (
          <span className="absolute top-2.5 left-2.5 z-[3] bg-[#1B3163] text-white text-[12.5px] font-bold px-2.5 py-1 rounded-[5px] tracking-[0.05em]">
            熱賣
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
          {product.specs?.material && <span className="whitespace-nowrap mr-2.5">[材質] {product.specs.material}</span>}
          <span className="whitespace-nowrap mr-2.5">[起訂] {product.minQuantity} {unitWord ? unitWord.replace('/', '') : '件'}</span>
        </div>
        <div className="flex items-baseline gap-1.5 h-8 whitespace-nowrap">
          <span className="font-mono text-[27px] font-bold text-[#F87314] tracking-[-0.02em]">{fromPrice}</span>
          <span className="text-[14px] text-[#6B7280]">{anchor ? anchor.unitLabel : ''}{locale === 'zh-hk' ? '起' : ''}</span>
        </div>
        <div className="text-[13.5px] text-[#6B7280] h-[1.6em] whitespace-nowrap overflow-hidden text-ellipsis mb-3.5">{moqLine}</div>
        <a
          href={`${localePrefix}/product/${product.slug}/`}
          className="mt-auto block text-center bg-[#2873F5] text-white font-bold text-[15.5px] py-[13px] rounded-[9px] hover:bg-[#1E5FD1] transition-colors"
        >
          立即訂購
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
  pageH1,
  products,
}: {
  locale: Locale;
  slug: string;
  categoryName: string;
  pageH1: string;
  products: Product[];
}) {
  const localePrefix = `/${locale}`;
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

  const bannerImage = `/images/hero/hero-sticker-${locale}.webp`;
  const minBase = products.reduce((m, p) => Math.min(m, p.basePrice), Number.POSITIVE_INFINITY);
  const mrailPrice = Number.isFinite(minBase) ? `HK$${minBase.toFixed(2)}` : '';
  const usCol = compare ? compare.columns.length - 1 : -1;

  const bannerCaps = ['免費打樣', '即日交貨', 'ISO9001 認證', '全港順豐速遞'];

  return (
    <main className="bg-white text-[#1F2937] text-[17.5px] leading-[1.75] pb-16 sm:pb-0">
      {/* ═══ 藍本 .bc 麵包屑 ═══ */}
      <div className="max-w-[1320px] mx-auto px-6 py-3.5 text-[13px] text-[#6B7280]">
        <a href={`${localePrefix}/`} className="text-[#6B7280] hover:text-[#2873F5]">首頁</a>
        {' / '}
        <span>{categoryName}</span>
      </div>

      {/* ═══ 藍本 .bn Banner — 左 H1 + 右分類主圖（H1 逐字 = customH1Map） ═══ */}
      <section className="relative overflow-hidden text-white bg-[linear-gradient(165deg,#244780_0%,#1B3163_52%,#152649_100%)]">
        <div className="relative z-[1] max-w-[1320px] mx-auto px-6 py-12 grid gap-11 items-center lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div>
            <h1 className="text-[clamp(26px,2.8vw,38px)] font-extrabold tracking-[-0.01em] leading-[1.35]">{pageH1}</h1>
            <p className="mt-3 text-[17.5px] text-white/85">專業品質，價格透明，快速交貨</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {bannerCaps.map((cap) => (
                <span key={cap} className="inline-flex items-center gap-[7px] bg-white/10 border border-white/20 backdrop-blur-[2px] px-[15px] py-2 rounded-full text-[14px] font-semibold">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="#FFD9BC" strokeWidth="2" aria-hidden="true"><path d="M20 7L9 18l-5-5" /></svg>
                  {cap}
                </span>
              ))}
            </div>
          </div>
          <div className="relative rounded-[18px] overflow-hidden border border-white/25 shadow-[0_20px_50px_rgba(10,20,45,0.45)] [aspect-ratio:4/3]">
            <Image src={bannerImage} alt={`${categoryName}全品類實拍`} fill className="object-cover" unoptimized priority sizes="(max-width: 1024px) 100vw, 560px" />
            <div className="absolute left-3.5 bottom-3.5 bg-[rgba(21,38,73,0.82)] text-white font-mono text-[12.5px] tracking-[0.06em] px-3 py-1.5 rounded-[7px] backdrop-blur-[3px]">
              STICKER PRINTING · HK
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 藍本 .main — 凍結左欄 + 右欄 ═══ */}
      <div className="max-w-[1320px] mx-auto px-6 pt-9 pb-20 grid gap-9 items-start lg:grid-cols-[248px_minmax(0,1fr)]">
        {/* 左側分類欄（凍結區: 生產沿用現有組件） */}
        <aside className="lg:sticky lg:top-[88px]">
          <CategorySidebar locale={locale} currentCategorySlug={slug} />
        </aside>

        {/* 右欄 */}
        <div>
          {/* 1. 3 個直接答案（數據: conversion quickAnswers） */}
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

          {/* 2. 產品網格（K3 拍板: SKU 優先; 數據: products.ts 同源） */}
          <section className="mb-16">
            <Eyebrow>Sticker Printing · {products.length} 款規格</Eyebrow>
            <SectionTitle>{categoryName} — <em className="not-italic text-[#F87314]">{products.length} 款規格任選</em></SectionTitle>
            <p className="text-[#6B7280] text-[16px] mt-2 max-w-[680px]">共 {products.length} 款產品</p>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5 mt-6">
              {products.map((p) => (
                <V9ProductCard key={p.sku_code} product={p} locale={locale} />
              ))}
            </div>

            {/* 3. SpecFinder 緊湊版（K3 拍板: 網格之後的挽回工具） */}
            <SpecFinderV9 locale={locale} waUrl={waUrl} />
          </section>

          {/* 4. 核心競爭優勢（數據: seo.coreAdvantages） */}
          <section className="mb-16">
            <Eyebrow>Why ZprintPro</Eyebrow>
            <SectionTitle>{advantages.length > 0 ? seo.coreAdvantages?.title : '核心競爭優勢'}</SectionTitle>
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
            <SectionTitle>{materialTable?.title ?? '材質工藝詳解'}</SectionTitle>
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
            <SectionTitle>{seo.specialOptions?.title ?? '特殊加工選項'}</SectionTitle>
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
            <SectionTitle>{seo.techSpecs?.title ?? '技術參數詳解'}</SectionTitle>
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
            <Eyebrow>Local Service · 香港</Eyebrow>
            <SectionTitle>{seo.serviceNodes?.title ?? '本地化服務節點'}</SectionTitle>
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
              <SectionTitle>服務行業與應用場景</SectionTitle>
              <p className="text-[#6B7280] text-[16px] mt-2 max-w-[680px]">針對每個品類，我們整理了最常見的行業場景與對應方案。點擊了解詳情。</p>
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
                          {card.tier === 'A' ? '主力行業' : '次鋪行業'}
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
                        <a href={`${localePrefix}/blog/${card.blogSlug}/`} className="text-[15px] font-bold text-[#2873F5] hover:underline">查看完整方案 →</a>
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
              <SectionTitle>常見問題</SectionTitle>
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

          {/* 15. 頁底 CTA（付款/回覆時效口徑 = 既有數據: 轉數快/24 小時內回覆） */}
          <section className="mb-16">
            <div className="bg-white border border-[#E5E7EB] rounded-[20px] p-8 sm:p-12 text-center shadow-[0_1px_3px_rgba(16,24,40,0.07)]">
              <h3 className="text-[clamp(22px,2.6vw,29px)] font-extrabold mb-2.5">WhatsApp 直接詢價 · 30 秒發需求</h3>
              <p className="text-[#6B7280] text-[16px] mb-6">WhatsApp 詢價後銀行轉賬 / 轉數快 FPS / 支付寶香港 · 24 小時內回覆</p>
              <div className="flex gap-3.5 justify-center flex-wrap">
                <a href={quoteUrl} className="inline-flex items-center gap-2 bg-[#F87314] text-white font-bold text-[16.5px] px-[34px] py-[15px] rounded-[11px] shadow-[0_8px_22px_rgba(248,115,20,0.3)] hover:brightness-95">
                  立即獲取報價
                </a>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold text-[16.5px] px-[34px] py-[15px] rounded-[11px] hover:brightness-95">
                  WhatsApp 查詢
                </a>
              </div>
            </div>
          </section>

          {/* 地區化內容（沿用現有組件與文案, 內容零改動） */}
          <div className="pb-4">
            <div className="bg-[linear-gradient(180deg,#ffffff,rgba(239,246,255,0.5))] rounded-3xl border border-blue-100 p-8 md:p-12 space-y-8">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-[#333333] mb-5">為何選擇智印港？</h3>
                <RegionalTrustBadges locale={locale} />
              </div>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-blue-100/60">
                <p className="text-gray-600 text-base md:text-lg leading-relaxed text-center">
                  <RegionalContent locale={locale} type="expertIntro" />
                </p>
              </div>
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
        </div>
      </div>

      {/* 移動端吸底報價軌（藍本 .mrail; 價格 = products.ts basePrice 最低值） */}
      <div className="flex sm:hidden fixed left-0 right-0 bottom-0 z-[60] bg-white border-t border-[#E5E7EB] px-3.5 py-2.5 gap-2.5 items-center shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <span className="font-mono font-bold text-[#F87314] text-[16px] whitespace-nowrap">{mrailPrice} 起</span>
        <a href={quoteUrl} className="flex-1 text-center bg-[#F87314] text-white font-bold text-[13.5px] py-[11px] rounded-[9px]">30 秒報價</a>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-[#25D366] text-white font-bold text-[13.5px] py-[11px] rounded-[9px]">WhatsApp</a>
      </div>
    </main>
  );
}
