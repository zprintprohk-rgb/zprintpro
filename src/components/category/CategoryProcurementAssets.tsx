/**
 * CategoryProcurementAssets — 獨特採購資產區 (2026-11-25, ASSET-20261030-PACKAGING-PROCUREMENT-ASSETS)
 * 數據: src/data/procurement-assets.ts (§十二 三項可做資產: PDF 入稿檢查清單 / 學校採購清單 / 紙袋報價尺寸模板)
 * 形態: 在線檢查清單 / 輸入表 (非下載文件 — §十二「最低可用形態」, 刀模下載維持 BLOCKED)
 * 掛載: CategoryPageV9 §11 選購指南之後; 僅 books / educational / japan-doujin / posters / paper-bags 顯示
 * 約束: server component 無 'use client' (門童 #30: Client 組件禁渲染 JSON-LD — 本組件不含 JSON-LD, 純展示)
 */
import { Locale } from '@/lib/seo';
import { getProcurementAssets } from '@/data/procurement-assets';

export function CategoryProcurementAssets({ locale, categorySlug }: { locale: Locale; categorySlug: string }) {
  const assets = getProcurementAssets(locale, categorySlug);
  if (assets.length === 0) return null;

  return (
    <>
      {assets.map((a) => (
        <section key={a.id} className="mb-16">
          {/* Eyebrow 與 V9 版式同源 (CategoryPageV9 Eyebrow) */}
          <div className="flex items-center gap-2.5 text-[14px] font-bold tracking-[0.14em] text-[#2873F5] uppercase mb-2.5">
            <span className="inline-block w-[22px] h-[3px] bg-[#F87314] rounded-[2px]" aria-hidden="true" />
            {a.eyebrow}
          </div>
          {/* SectionTitle 與 V9 版式同源 */}
          <h2 className="text-[clamp(23px,2.6vw,30px)] font-extrabold tracking-[-0.01em] leading-[1.3]">{a.title}</h2>
          <p className="mt-4 text-[16.5px] text-[#3A4250] leading-[1.9]">{a.intro}</p>

          <ol className="mt-6 space-y-3 list-none">
            {a.rows.map((r, i) => (
              <li
                key={r.label}
                className="bg-white border border-[#E5E7EB] rounded-xl px-5 py-4 shadow-[0_1px_3px_rgba(16,24,40,0.07)]"
              >
                <div className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1B3163] text-white text-[13px] font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-bold text-[16px] text-[#1F2937]">{r.label}</div>
                    <div className="text-[15.5px] text-[#444444] leading-[1.85] mt-1">{r.value}</div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {a.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {a.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="inline-flex items-center rounded-full border border-[#E5E7EB] bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[#1B3163] hover:border-[#2873F5] hover:text-[#2873F5] transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}

          <p className="mt-4 text-[13.5px] text-[#6B7280] leading-[1.8]">{a.footnote}</p>
        </section>
      ))}
    </>
  );
}
