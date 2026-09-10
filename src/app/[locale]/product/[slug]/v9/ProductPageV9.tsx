/**
 * PDP v9.1 — 防水貼紙樣板路由渲染層（zh-hk 門控，僅 /zh-hk/product/waterproof-stickers/）
 * 藍本: design/pdp-v9.html 逐 section 映射；頁眉/頁腳沿用現有組件（凍結區）
 * 數據全部取自現有數據源（內容零改動）：
 *   - Hero/meta/規格: products.ts（sku_code/minQuantity/specs/features）
 *   - 價格階梯: price-data.generated.ts 真實檔位（getPriceTableForSlug）
 *   - 產品詳情 5 手風琴: products-content.ts longDescription 按 <h3> 切分（內容逐字節不變）
 *   - 場景長文: sku-seo-data.ts body（交稿規範段落拆為側欄規格卡，其餘逐字渲染）
 *   - 6 步流程: category-conversion-blocks orderFlow（與 PLP 同源）
 *   - FAQ: product-faqs coreProductFAQMap；相關產品: getProductsByCategory 同源邏輯
 * 執行卡: 2026-09-09-autoclaw-plp-pdp-v91-execution-card.md (v1.3) 鎖定點 1-5
 */
import Image from 'next/image';
import { Locale } from '@/lib/seo';
import {
  Product,
  getProductDisplayTitle,
  getProductsByCategory,
} from '@/data/products';
import { getProductImages, getProductMainImage } from '@/lib/product-image';
import { getDisplayAnchor } from '@/lib/pricing';
import { getPriceTableForSlug } from '@/lib/price-injector';
import { getConversionBlocks, buildWhatsAppUrl } from '@/data/category-conversion-blocks';
import { GalleryV9 } from './GalleryV9';
import { TrustBadgeBlock } from '@/app/[locale]/category/[slug]/v9/TrustBadgeBlock';

const normalizeTitle = (s: string): string => s.replace(/\s+/g, ' ').trim();

export function ProductPageV9({
  locale,
  product,
  productTitle,
  productDescription,
  h1,
  faqItems,
  longDesc,
  skuBody,
  factoryImage,
}: {
  locale: Locale;
  product: Product;
  productTitle: string;
  productDescription: string;
  h1: string;
  faqItems: { q: string; a: string }[];
  longDesc: string;
  skuBody: string;
  factoryImage: string;
}) {
  const localePrefix = `/${locale}`;
  const galleryImages = getProductImages(product, locale).length
    ? getProductImages(product, locale)
    : [getProductMainImage(product, locale)].filter(Boolean) as string[];

  const anchor = getDisplayAnchor(product.slug, locale);

  /* 價格階梯（真實檔位） */
  const table = getPriceTableForSlug('waterproof-stickers');
  const cfg = table ? table.configs?.[Math.max(0, table.defaultConfigIndex ?? 0)] ?? table.configs?.[0] : undefined;
  const tiers = cfg?.tiers ?? [];
  const rows = tiers.map((t) => ({ qty: t.qty, total: t.priceHKD, unit: t.qty > 0 ? t.priceHKD / t.qty : 0 }));
  const unitMax = rows.length ? Math.max(...rows.map((r) => r.unit)) : 1;
  const unitMin = rows.length ? Math.min(...rows.map((r) => r.unit)) : 1;
  const bestRow = rows.find((r) => r.unit === unitMin) ?? rows[rows.length - 1];
  const topRow = rows[rows.length - 1];
  const savePct = unitMax > 0 ? Math.round((1 - unitMin / unitMax) * 100) : 0;

  const conv = getConversionBlocks('stickers', locale);
  const waTemplate = conv?.whatsappTemplates?.[0]?.message ?? '';
  const waUrl = buildWhatsAppUrl(waTemplate);
  const quoteUrl = `${localePrefix}/quote/`;
  const rushUrl = `${localePrefix}/services/rush-printing-delivery/`;

  /* 產品詳情: longDescription 按 <h3> 切分為手風琴（內容逐字節不變）
     修訂輪4 渲染層定向 transform（數據層凍結不動, 僅 v9 門控頁生效, 唐總指令）:
     ① 剔除重複的品牌介紹尾段（段內 DHL 句自我重複, 且與頁尾信任模塊重複）
     ② 已服務本地客戶: 客戶類型增補「政府部門及學校」 */
  const V9_STRIP_PARA = '<p><em>智印港 (ZprintPro) 為彩龍印刷旗下國際印刷服務品牌，深圳自設廠房，DHL Express / FedEx 全球 2-4 天配送。DHL Express 全球 2-4 天配送。FSC 認證紙材、ISO 12647 色彩管理、ISO 9001 品質認證。</em></p>';
  const V9_CLEAN_DESC = (longDesc ?? '')
    .split(V9_STRIP_PARA).join('')
    .split('咖啡店提供貼紙印製服務').join('咖啡店、政府部門及學校提供貼紙印製服務');
  const detailSections: { title: string; html: string }[] = [];
  V9_CLEAN_DESC.split(/<h3>/).forEach((part) => {
    if (!part.trim()) return;
    const end = part.indexOf('</h3>');
    if (end === -1) {
      detailSections.push({ title: '', html: part });
      return;
    }
    detailSections.push({ title: part.slice(0, end).trim(), html: part.slice(end + 5) });
  });

  /* 場景長文: sku-seo body 分段；交稿規範段拆為側欄規格卡（文字全部來自 body 本身） */
  const paras = (skuBody ?? '').split('\n\n').map((p) => p.trim()).filter(Boolean);
  const bodyLead = paras[0] ?? '';
  const specPara = paras.find((p) => p.startsWith('交稿規範：'));
  const bodyMain = paras.filter((p) => p !== specPara);
  const noteIdx = specPara ? specPara.indexOf('如未有設計檔案') : -1;
  const specNote = noteIdx >= 0 ? specPara!.slice(noteIdx) : '';
  const specRows: [string, string][] = [
    ['解析度', '300 DPI'],
    ['色彩模式', 'CMYK'],
    ['出血', '3 mm'],
    ['字體', '外框化'],
    ['免費數碼打稿', '1 小時內'],
  ];

  /* 相關產品（與 RelatedProducts 同源選取邏輯） */
  const related = getProductsByCategory(product.category_slug)
    .filter((p) => p.sku_code !== product.sku_code)
    .slice(0, 4);

  const metaRows: [string, string][] = [
    [product.sku_code, '產品編號'],
    [`${product.minQuantity} 張`, '最低訂購量'],
    ['5-7 天', '標準交期'],
    ['不滿意免費重印', '品質保證'],
    ['港九新界順豐', '滿$500包郵'],
  ];

  const proofImages: [string, string, string][] = [
    [factoryImage, '印刷', '海德堡柯式印刷機組'],
    ['/images/factory/factory-color-chart.webp', '品控', 'ICC 色彩管理 · 對色實景'],
    ['/images/factory/factory-weigang-uv.webp', '不乾膠專用', '輪轉 UV 印刷機 · 貼紙標籤專線'],
  ];

  const renderBodyPara = (p: string, key: string) => {
    if (p === '**常見問題**') {
      return <p key={key} className="font-bold text-[#1F2937] mt-7 mb-3 text-[17px]">常見問題</p>;
    }
    if (p.startsWith('**Q')) {
      const clean = p.replace(/\*\*/g, '');
      const nl = clean.indexOf('\n');
      const q = nl >= 0 ? clean.slice(0, nl).trim() : clean.trim();
      const a = nl >= 0 ? clean.slice(nl + 1).trim() : '';
      return (
        <div key={key} className="mt-4">
          <p className="font-bold text-[#1F2937] text-[16.5px] mb-1.5">{q}</p>
          {a && <p className="text-[#3A4250] text-[16px] leading-[1.85] mb-3">{a}</p>}
        </div>
      );
    }
    if (p.startsWith('準備落單')) {
      return <p key={key} className="bg-[#FEF1E6] border-l-4 border-[#F87314] rounded-r-xl px-5 py-4 font-semibold text-[#1F2937] text-[16.5px] leading-[1.85]">{p}</p>;
    }
    return <p key={key} className="text-[#3A4250] text-[16.5px] leading-[1.9] text-justify mb-4">{p}</p>;
  };

  return (
    <main className="bg-white text-[#1F2937] text-[17.5px] leading-[1.75] pb-16 sm:pb-0">
      {/* ═══ 藍本 .bc 麵包屑（修訂輪3: PDP banner 撤回, 恢復原白底麵包屑條） ═══ */}
      <div className="max-w-[1320px] mx-auto px-6 py-3.5 text-[13px] text-[#6B7280]">
        <a href={`${localePrefix}/`} className="text-[#6B7280] hover:text-[#2873F5]">首頁</a>
        {' / '}
        <a href={`${localePrefix}/category/${product.category_slug}/`} className="text-[#6B7280] hover:text-[#2873F5]">貼紙印刷</a>
        {' / '}
        <span>{productTitle}</span>
      </div>

      {/* ═══ 藍本 .hero 首屏: 左相冊 + 右決策區 ═══ */}
      <section className="max-w-[1320px] mx-auto px-6 pt-2 pb-12 grid gap-11 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <GalleryV9 images={galleryImages} alt={productTitle} />

        <div>
          {/* 即日徽章（沿用現有 RushDeliveryBadge 文案） */}
          <div className="inline-flex items-center gap-2 bg-[#FEF1E6] border-l-4 border-[#F87314] rounded-[0_10px_10px_0] px-[15px] py-2.5 text-[14.5px] font-bold text-[#EA580C] mb-3.5">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
            <span>印刷即日速遞送貨</span>
            <span className="font-normal text-[#EA580C]/80">| 今天下單 · 明天 12 點前到</span>
          </div>

          <h1 className="text-[clamp(23px,2.4vw,30px)] font-extrabold leading-[1.4] tracking-[-0.01em]">{h1}</h1>
          <p className="mt-2.5 text-[15.5px] text-[#6B7280] leading-[1.75]">{productDescription}</p>

          {/* 價格盒 */}
          <div className="mt-6 bg-[#FFF7ED] border border-[#FED7AA] rounded-[14px] p-5">
            <div className="text-[13px] font-semibold text-[#EA580C] uppercase tracking-[0.1em] mb-1">
              {anchor ? `每個低至 · ${anchor.big}` : product.price_range}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-[clamp(27px,3vw,38px)] font-bold text-[#F87314] tracking-[-0.02em]">{anchor ? anchor.big : product.price_range}</span>
              <span className="text-[14px] text-[#6B7280]">{anchor ? `${anchor.unitLabel}起` : ''}</span>
            </div>
            {!anchor && (
              <div className="text-[13.5px] text-[#6B7280] mt-1.5 font-medium">
                {topRow ? `${topRow.qty.toLocaleString('en-US')} 張起批 · 整批 HK$${topRow.total}` : '實價按規格報價'}
              </div>
            )}
            <div className="text-[13.5px] text-[#6B7280] mt-0.5">{anchor ? anchor.sub : '滿$500包郵'}</div>
          </div>

          {/* meta 行 */}
          <dl className="mt-4 border-t border-[#E5E7EB]">
            {metaRows.map(([val, label]) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-[#E5E7EB] text-[14.5px]">
                <span className="text-[#6B7280]">{label}</span>
                <span className="font-mono font-semibold text-[#1F2937]">{val}</span>
              </div>
            ))}
          </dl>

          {/* CTA 行 */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <a href={quoteUrl} className="text-center bg-[#F87314] text-white font-bold text-[16px] py-[15px] rounded-[10px] shadow-[0_8px_22px_rgba(248,115,20,0.3)] hover:brightness-95">
              30 秒 AI 報價
            </a>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-center bg-[#25D366] text-white font-bold text-[16px] py-[15px] rounded-[10px] hover:brightness-95">
              WhatsApp 即時查詢
            </a>
          </div>

          {/* trust 三點（文案 = 既有信任聲明） */}
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[13.5px] text-[#6B7280]">
            <li className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />深圳自有工廠</li>
            <li className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />免費設計</li>
            <li className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />免費打樣</li>
            <li className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />送貨上門</li>
            <li className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />100%滿意保證</li>
          </ul>
        </div>
      </section>

      {/* ═══ 藍本 .ladder 價格階梯（真實檔位數據）+ .rail 側欄（修訂輪8 #4: 按第四張圖藍本效果重做 — 橙色大數字+標題行+28px 橫條+虛線分隔+最抵標籤+規格右上註） ═══ */}
      <section className="max-w-[1320px] mx-auto px-6 mb-16">
        <div className="flex items-center gap-2.5 text-[14px] font-bold tracking-[0.14em] text-[#2873F5] uppercase mb-2.5">
          <span className="inline-block w-[22px] h-[3px] bg-[#F87314] rounded-[2px]" aria-hidden="true" />
          Price Ladder · 參考價
        </div>
        <h2 className="text-[clamp(23px,2.6vw,30px)] font-extrabold tracking-[-0.01em] leading-[1.3] mb-5">
          訂得越多，<em className="not-italic text-[#F87314]">每張越平</em>
        </h2>
        <div className="grid gap-9 lg:grid-cols-[minmax(0,15fr)_minmax(0,7fr)] items-stretch">
          <div>
            <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-6 sm:p-7 shadow-[0_1px_3px_rgba(16,24,40,0.07)] flex flex-col h-full">
              <div className="flex items-end justify-between gap-5 mb-6">
                <div>
                  <div className="font-mono text-[clamp(34px,4vw,52px)] font-bold text-[#F87314] tracking-[-0.03em] leading-none">{savePct}%</div>
                  <div className="text-[15px] font-bold text-[#1F2937] mt-2">訂 {bestRow ? bestRow.qty.toLocaleString('en-US') : '1,000'} 張 vs {rows[0] ? rows[0].qty.toLocaleString('en-US') : '50'} 張 · 每張慳幾</div>
                </div>
                {cfg?.label?.['zh-hk'] && (
                  <div className="hidden sm:block text-[13px] text-[#6B7280] text-right max-w-[260px] leading-[1.7]">{cfg.label['zh-hk']}</div>
                )}
              </div>
              <div>
                {rows.map((r) => (
                  <div key={r.qty} className="relative grid grid-cols-[88px_1fr_150px] gap-4 items-center py-[11px] border-b border-dashed border-[#EBECEF] last:border-b-0">
                    {r.unit === unitMin && (
                      <span className="absolute right-0 top-[-9px] bg-[#F87314] text-white text-[12px] font-bold px-[9px] py-[2px] rounded-full">最抵</span>
                    )}
                    <span className="font-mono font-bold text-[15.5px] text-right whitespace-nowrap">{r.qty} 張</span>
                    <span className="relative h-[28px] bg-[#F3F4F6] rounded-[6px] overflow-hidden">
                      <span
                        className={`absolute left-0 top-0 bottom-0 rounded-[6px] min-w-[8px] ${r.unit === unitMin ? 'bg-[#F87314]' : 'bg-[#2873F5]'}`}
                        style={{ width: `${Math.max(8, Math.round((r.unit / unitMax) * 100))}%` }}
                      />
                    </span>
                    <span className="text-right whitespace-nowrap">
                      <span className={`font-mono font-bold text-[18px] ${r.unit === unitMin ? 'text-[#F87314]' : 'text-[#1F2937]'}`}>HK${r.unit.toFixed(2)}</span>
                      <span className="text-[13px] text-[#6B7280]">/張 · 整批 ${r.total}</span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[13.5px] text-[#6B7280] mt-3.5">參考價 · 最終以 WhatsApp 正式報價為準</p>
            </div>
          </div>
          <div className="bg-white border border-[#E5E7EB] rounded-[18px] p-6 sm:p-7 self-stretch lg:sticky lg:top-[88px] shadow-[0_10px_30px_rgba(17,24,39,0.08)] flex flex-col justify-between h-full">
            <div className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#2873F5] mb-2">即時報價</div>
            <div className="font-mono text-[26px] font-bold text-[#F87314] leading-tight">{anchor ? anchor.big : product.price_range}<span className="text-[14px] font-normal text-[#6B7280]">{anchor ? `${anchor.unitLabel}起` : ''}</span></div>
            <div className="text-[13.5px] text-[#6B7280] mt-1 mb-4">{bestRow ? `${bestRow.qty.toLocaleString('en-US')} 張整批 HK$${bestRow.total}` : ''}</div>
            <dl className="border-t border-[#F0F1F3]">
              <div className="flex justify-between py-2.5 border-b border-[#F0F1F3] text-[14px]"><dt className="text-[#6B7280]">標準交期</dt><dd className="font-semibold">5-7 天</dd></div>
              <div className="flex justify-between py-2.5 border-b border-[#F0F1F3] text-[14px] font-bold"><dt className="text-[#6B7280] font-normal">即日急件</dt><dd className="font-bold">今天下單 · 明天 12 點前到</dd></div>
              <div className="flex justify-between py-2.5 border-b border-[#F0F1F3] text-[14px]"><dt className="text-[#6B7280]">滿 HK$500</dt><dd className="font-semibold">港九新界免運</dd></div>
            </dl>
            <div className="grid gap-2.5 mt-5">
              <a href={quoteUrl} className="text-center bg-[#F87314] text-white font-bold text-[15.5px] py-3 rounded-[10px] hover:brightness-95">30 秒 AI 報價</a>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-center bg-[#25D366] text-white font-bold text-[15.5px] py-3 rounded-[10px] hover:brightness-95">WhatsApp 即時查詢</a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 服務承諾一體色塊（修訂輪8 #5: 三塊合併為一條皇家藏青大色塊，內含三部分內容；即日急件橙色塊整體可點，鏈接即日印刷服務） ═══ */}
      <section className="max-w-[1320px] mx-auto px-6 mb-16">
        <div
          className="rounded-[18px] p-6 sm:p-8 md:p-9 text-white"
          style={{ background: 'var(--color-royal-navy-grad)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 14px 30px rgba(15,31,61,0.24)' }}
        >
          <div className="grid gap-6 md:grid-cols-[1fr_1fr_320px]">
            <div className="p-5">
              <div className="font-extrabold text-[19px] mb-1.5 text-white">標準 5-7 天</div>
              <p className="text-[15px] text-white/90 leading-[1.65]">HP Indigo 15K B2 數碼產線 · 提交檔案後 1 小時內免費數碼打稿 · 平均 2.3 天出貨，急單即日出貨</p>
            </div>
            <div className="p-5">
              <div className="font-extrabold text-[19px] mb-1.5 text-white">DHL 全球 2-4 天</div>
              <p className="text-[15px] text-white/90 leading-[1.65]">順豐香港本地送貨 · 港島/九龍/新界 24 小時達 · DHL 全球 2-4 日</p>
            </div>
            <a href={rushUrl} className="block bg-[#F87314] rounded-[14px] p-5 group">
              <div className="font-extrabold text-[19px] mb-1.5 text-white">即日急件</div>
              <p className="text-[15px] text-white/95 leading-[1.65]">今天下單 · 明天 12 點前到 · 前往即日印刷服務 →</p>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ 藍本 .det 產品詳情手風琴（longDescription 逐字節內容） ═══ */}
      <section className="max-w-[1320px] mx-auto px-6 mb-16">
        <div className="flex items-center gap-2.5 text-[14px] font-bold tracking-[0.14em] text-[#2873F5] uppercase mb-2.5">
          <span className="inline-block w-[22px] h-[3px] bg-[#F87314] rounded-[2px]" aria-hidden="true" />
          Product Details
        </div>
        <h2 className="text-[clamp(23px,2.6vw,30px)] font-extrabold tracking-[-0.01em] leading-[1.3] mb-5">產品詳情</h2>
        <div>
          {detailSections.map((s, i) => (
            <details key={s.title || `sec-${i}`} className="group bg-white border border-[#E5E7EB] rounded-xl mb-2.5 shadow-[0_1px_3px_rgba(16,24,40,0.07)]" open={i === 0}>
              {s.title && (
                <summary className="cursor-pointer list-none px-[22px] py-[19px] font-bold text-[20px] flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
                  {s.title}
                  <span className="font-mono text-[22px] text-[#2873F5] transition-transform duration-200 group-open:rotate-45 shrink-0">+</span>
                </summary>
              )}
              <div className="px-[22px] pb-6 text-[#3A4250] text-[16px] leading-[1.85] [&_h3]:hidden [&_p]:mb-3 [&_ul]:mb-3 [&_li]:list-disc [&_li]:ml-6 [&_li]:mb-1 [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_table]:text-[15px] [&_th]:border [&_th]:border-[#E5E7EB] [&_th]:bg-[#F3F4F6] [&_th]:p-2.5 [&_th]:text-left [&_td]:border [&_td]:border-[#E5E7EB] [&_td]:p-2.5 [&_tr:nth-child(even)]:bg-[#F8FAFD]">
                <div dangerouslySetInnerHTML={{ __html: s.html }} />
              </div>
            </details>
          ))}
          {/* 規格參數 + 產品特點（products.ts specs/features 數據） */}
          <details className="group bg-white border border-[#E5E7EB] rounded-xl mb-2.5 shadow-[0_1px_3px_rgba(16,24,40,0.07)]">
            <summary className="cursor-pointer list-none px-[22px] py-[19px] font-bold text-[20px] flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
              規格參數
              <span className="font-mono text-[22px] text-[#2873F5] transition-transform duration-200 group-open:rotate-45 shrink-0">+</span>
            </summary>
            <div className="px-[22px] pb-6 text-[#3A4250] text-[16px] leading-[1.85]">
              {product.specs && (
                <dl className="mb-4">
                  {Object.entries(product.specs).map(([k, v]) => (
                    v ? (
                      <div key={k} className="grid grid-cols-[128px_1fr] gap-4 py-2.5 border-b border-[#F0F1F3] text-[15.5px]">
                        <dt className="font-bold text-[#1F2937]">{k}</dt>
                        <dd className="text-[#6B7280]">{v}</dd>
                      </div>
                    ) : null
                  ))}
                </dl>
              )}
              {product.features && (
                <ul>
                  {product.features.map((f) => (
                    <li key={f} className="list-disc ml-6 mb-1">{f}</li>
                  ))}
                </ul>
              )}
            </div>
          </details>
        </div>
      </section>

      {/* ═══ 藍本 .proof 工廠品控實證帶（工廠實拍 = 信任要素, 執行卡 §5③ 禁刪） ═══ */}
      <section className="max-w-[1320px] mx-auto px-6 mb-16">
        <div className="grid gap-4 lg:grid-cols-3">
          {proofImages.map(([src, tag, caption]) => (
            <figure key={src} className="relative rounded-[18px] overflow-hidden border border-[#E5E7EB] bg-[#F3F3F3]">
              <div className="relative [aspect-ratio:4/3]">
                <Image src={src} alt={caption} fill className="object-cover" unoptimized loading="lazy" sizes="(max-width: 1024px) 100vw, 420px" />
              </div>
              <figcaption className="absolute left-3.5 bottom-3.5 right-3.5 flex items-center gap-2.5 bg-[rgba(21,38,73,0.82)] text-white rounded-[9px] px-3.5 py-2.5 backdrop-blur-[3px]">
                <span className="font-mono text-[11.5px] font-bold tracking-[0.06em] bg-[#F87314] rounded-[5px] px-1.5 py-0.5 shrink-0">{tag}</span>
                <span className="text-[13.5px] font-semibold">{caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ═══ 藍本 .steps 6 步落單流程（數據: conversion orderFlow, 與 PLP 同源） ═══ */}
      {conv?.orderFlow && (
        <section className="max-w-[1320px] mx-auto px-6 mb-16 bg-[#F2F6FF] rounded-[22px] p-7 sm:p-8 lg:p-9">
          <h2 className="text-[clamp(23px,2.6vw,30px)] font-extrabold tracking-[-0.01em] leading-[1.3] text-center mb-7">{conv.orderFlow.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {conv.orderFlow.steps.map((s, i) => (
              <div key={s.title} className="relative px-3.5 text-center">
                {i < conv!.orderFlow!.steps.length - 1 && (
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

      {/* ═══ 藍本 .ufs 適用場景與檔案規格（sku-seo body 逐字; 交稿規範拆側欄卡） ═══ */}
      <section className="max-w-[1320px] mx-auto px-6 mb-16">
        <div className="flex items-center gap-2.5 text-[14px] font-bold tracking-[0.14em] text-[#2873F5] uppercase mb-2.5">
          <span className="inline-block w-[22px] h-[3px] bg-[#F87314] rounded-[2px]" aria-hidden="true" />
          Use Cases &amp; File Specs
        </div>
        <h2 className="text-[clamp(23px,2.6vw,30px)] font-extrabold tracking-[-0.01em] leading-[1.3] mb-5">適用場景與檔案規格</h2>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <p className="text-[19px] text-[#1F2937] font-semibold leading-[1.85] mb-5 pb-5 border-b-2 border-[#1F2937]">{bodyLead}</p>
            {bodyMain.map((p, i) => renderBodyPara(p, `p-${i}`))}
          </div>
          <aside className="self-start lg:sticky lg:top-[88px]">
            <div className="bg-[#F2F6FF] border border-[#E5E7EB] rounded-[14px] p-[18px]">
              <b className="block text-[16.5px] mb-2.5">交稿規範</b>
              <dl>
                {specRows.map(([v, k]) => (
                  <div key={k} className="flex justify-between items-center py-2 border-b border-[#E5E7EB] text-[15px]">
                    <span className="text-[#6B7280]">{k}</span>
                    <span className="font-mono font-semibold text-[#1F2937]">{v}</span>
                  </div>
                ))}
              </dl>
              <p className="text-[14px] text-[#6B7280] leading-[1.75] mt-3.5">{specNote}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* ═══ 為何選擇智印港 — 皇家藏青色塊（修訂輪4: PDP 用 navy 變體; PLP 保持 light; 組件復用 TrustBadgeBlock） ═══ */}
      <TrustBadgeBlock variant="navy" />

      {/* ═══ FAQ（數據: coreProductFAQMap, 藍本手風琴樣式） ═══ */}
      {faqItems.length > 0 && (
        <section className="max-w-[1320px] mx-auto px-6 mb-16">
          <div className="flex items-center gap-2.5 text-[14px] font-bold tracking-[0.14em] text-[#2873F5] uppercase mb-2.5">
            <span className="inline-block w-[22px] h-[3px] bg-[#F87314] rounded-[2px]" aria-hidden="true" />
            FAQ
          </div>
          <h2 className="text-[clamp(23px,2.6vw,30px)] font-extrabold tracking-[-0.01em] leading-[1.3] mb-5">常見問題</h2>
          <div>
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

      {/* ═══ 頁底 CTA（修訂輪4: 皇家藏青色塊底色 + 上移至相關產品之前） ═══ */}
      <section className="max-w-[1320px] mx-auto px-6 mb-16">
        <div
          className="rounded-[20px] p-8 sm:p-12 text-center"
          style={{ background: 'var(--color-royal-navy-grad)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 14px 30px rgba(15,31,61,0.24)' }}
        >
          <h3 className="text-[clamp(22px,2.6vw,29px)] font-extrabold mb-2.5 text-white">準備落單？1 小時免費打稿</h3>
          <p className="text-white/80 text-[16px] mb-6">WhatsApp 客服 +86 198 8085 1334 或點擊「30 秒 AI 報價」· 24 小時內回覆 · 免費設計諮詢</p>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <a href={quoteUrl} className="inline-flex items-center gap-2 bg-[#F87314] text-white font-bold text-[16.5px] px-[34px] py-[15px] rounded-[11px] shadow-[0_8px_22px_rgba(248,115,20,0.3)] hover:brightness-95">30 秒 AI 報價</a>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold text-[16.5px] px-[34px] py-[15px] rounded-[11px] hover:brightness-95">WhatsApp 即時查詢</a>
          </div>
        </div>
      </section>

      {/* ═══ 藍本 .related 相關產品（同源選取邏輯, 藍本卡片樣式） ═══ */}
      {related.length > 0 && (
        <section className="max-w-[1320px] mx-auto px-6 mb-16">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[clamp(23px,2.6vw,30px)] font-extrabold tracking-[-0.01em] leading-[1.3]">相關產品</h2>
            <a href={`${localePrefix}/category/${product.category_slug}/`} className="text-[15px] font-bold text-[#2873F5] hover:underline">查看全部 →</a>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p) => {
              const a = getDisplayAnchor(p.slug, locale);
              return (
                <article key={p.sku_code} className="bg-white border border-[#E5E7EB] rounded-[14px] overflow-hidden shadow-[0_1px_3px_rgba(16,24,40,0.07)] transition-[box-shadow,border-color] duration-200 hover:border-[#C9D6F2] hover:shadow-[0_8px_24px_rgba(40,115,245,0.09)]">
                  <a href={`${localePrefix}/product/${p.slug}/`} className="block relative [aspect-ratio:1/1] bg-[#F3F3F3] overflow-hidden">
                    <Image src={getProductMainImage(p, locale)} alt={normalizeTitle(getProductDisplayTitle(p, locale))} fill className="object-cover" unoptimized loading="lazy" sizes="(max-width: 1024px) 50vw, 320px" />
                  </a>
                  <div className="p-3.5 pb-4">
                    <h3 className="text-[15.5px] font-bold leading-[1.5] h-12 overflow-hidden line-clamp-2 mb-1.5">
                      <a href={`${localePrefix}/product/${p.slug}/`} className="hover:text-[#2873F5]">{normalizeTitle(getProductDisplayTitle(p, locale))}</a>
                    </h3>
                    <div className="font-mono text-[16px] font-bold text-[#F87314]">
                      {a ? a.big : p.price_range}
                      <span className="text-[13px] font-normal text-[#6B7280]">{a ? `${a.unitLabel}起` : ''}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* 移動端吸底報價軌（藍本 .mrail; 價格 = 真實檔位錨點） */}
      <div className="flex sm:hidden fixed left-0 right-0 bottom-0 z-[60] bg-white border-t border-[#E5E7EB] px-3.5 py-2.5 gap-2.5 items-center shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <span className="whitespace-nowrap">
          <span className="font-mono font-bold text-[#F87314] text-[16px]">{anchor ? anchor.big : product.price_range}</span>
          <span className="text-[12.5px] text-[#6B7280]">{bestRow ? ` · ${bestRow.qty.toLocaleString('en-US')} 張整批 HK$${bestRow.total}` : ''}</span>
        </span>
        <a href={quoteUrl} className="flex-1 text-center bg-[#F87314] text-white font-bold text-[13.5px] py-[11px] rounded-[9px]">30 秒報價</a>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-[#25D366] text-white font-bold text-[13.5px] py-[11px] rounded-[9px]">WhatsApp</a>
      </div>
    </main>
  );
}
