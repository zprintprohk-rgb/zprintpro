/**
 * CategoryConversionBlocks — M1 大词攻坚转化区块组件
 * 挂载于 category/[slug] 页：产品列表之后、既有 Pillar 正文之前（不改动既有内容）。
 * 数据来自 category-conversion-blocks.ts（独立、可回滚）。
 */
import Link from 'next/link';
import {
  getConversionBlocks,
  buildWhatsAppUrl,
  type CategoryConversionContent,
} from '@/data/category-conversion-blocks';

// 三语文案
const ui = {
  'zh-hk': {
    quickTitle: '3 個直接答案',
    proofTitle: '真實出單數據',
    compareTitle: '渠道比較',
    flowTitle: '落單流程',
    faqTitle: '更多常見問題',
    ctaNote: '5 分鐘內回覆 · 無在線支付，WhatsApp 詢價後銀行轉賬 / 轉數快 / 拍碼付款',
    step: '步',
  },
  en: {
    quickTitle: '3 Quick Answers',
    proofTitle: 'Real Order Data',
    compareTitle: 'Options Compared',
    flowTitle: 'How to Order',
    faqTitle: 'More FAQs',
    ctaNote: 'Replies within 5 minutes · No online payment — inquire on WhatsApp, pay by bank transfer / FPS / QR',
    step: '',
  },
  ja: {
    quickTitle: '3つのダイレクト回答',
    proofTitle: '実績データ',
    compareTitle: '選択肢の比較',
    flowTitle: 'ご注文の流れ',
    faqTitle: 'よくある質問',
    ctaNote: '5分以内に返信 · オンライン決済なし。WhatsAppで問い合わせ後、銀行振込 / FPS / QR決済',
    step: '',
  },
} as const;

export function CategoryConversionBlocks({
  locale,
  categorySlug,
}: {
  locale: string;
  categorySlug: string;
}) {
  const data: CategoryConversionContent | null = getConversionBlocks(categorySlug, locale);
  if (!data) return null;
  const t = ui[(locale as keyof typeof ui)] || ui['zh-hk'];

  return (
    <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="space-y-10">
        {/* ① 3 问快速答案 — AEO featured snippet 区 */}
        {data.quickAnswers?.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-[26px] font-bold text-[#111827] mb-5 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#F87314] rounded-full inline-block" />
              {t.quickTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.quickAnswers.map((qa, i) => (
                <div
                  key={i}
                  className="bg-amber-50 border-l-4 border-[#F87314] rounded-r-xl p-5"
                >
                  <p className="font-bold text-[15px] text-[#111827] mb-2 leading-snug">{qa.q}</p>
                  <p className="text-[14px] text-gray-700 leading-relaxed">{qa.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ② 信任状数字 */}
        {data.socialProof?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.socialProof.map((s, i) => (
              <div
                key={i}
                className="bg-white border border-blue-100 rounded-2xl p-5 text-center shadow-sm"
              >
                <div className="text-3xl md:text-[34px] font-extrabold text-[#2873F5] leading-none">
                  {s.stat}
                </div>
                <div className="text-[13px] text-gray-600 mt-2 font-medium leading-snug">{s.label}</div>
                {s.desc && <p className="text-[12px] text-gray-400 mt-1 leading-snug">{s.desc}</p>}
              </div>
            ))}
          </div>
        )}

        {/* ③ 比较表 — GEO 比较列表 */}
        {data.comparisonTable && (
          <div>
            <h2 className="text-2xl md:text-[26px] font-bold text-[#111827] mb-5 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#2873F5] rounded-full inline-block" />
              {data.comparisonTable.title || t.compareTitle}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-[14px] border-collapse">
                <thead>
                  <tr className="bg-[#2873F5] text-white">
                    {data.comparisonTable.columns.map((c, i) => (
                      <th key={i} className="px-4 py-3 text-left font-bold whitespace-nowrap">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.comparisonTable.rows.map((row, ri) => {
                    const highlight = /zprintpro|智印港/i.test(row[0] || '');
                    return (
                      <tr
                        key={ri}
                        className={
                          highlight
                            ? 'bg-amber-50 font-semibold text-[#111827]'
                            : ri % 2 === 1
                              ? 'bg-gray-50 text-gray-700'
                              : 'bg-white text-gray-700'
                        }
                      >
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-4 py-3 align-top border-t border-gray-100">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {data.comparisonTable.note && (
              <p className="text-[12.5px] text-gray-400 mt-2">{data.comparisonTable.note}</p>
            )}
          </div>
        )}

        {/* ④ 6 步落单流程 */}
        {data.orderFlow?.steps?.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-[26px] font-bold text-[#111827] mb-5 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#22c55e] rounded-full inline-block" />
              {data.orderFlow.title || t.flowTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.orderFlow.steps.map((s, i) => (
                <div key={i} className="relative bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-full bg-[#22c55e] text-white font-bold flex items-center justify-center text-[15px] flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="font-bold text-[15px] text-[#111827] leading-snug">{s.title}</span>
                  </div>
                  <p className="text-[13.5px] text-gray-600 leading-relaxed pl-11">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ⑤ 预填 WhatsApp CTA（3 场景） */}
        {data.whatsappTemplates?.length > 0 && (
          <div className="bg-gradient-to-r from-[#25D366]/10 to-emerald-50 border border-[#25D366]/30 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-[#111827]">
                  {locale === 'zh-hk'
                    ? 'WhatsApp 直接詢價 · 30 秒發需求'
                    : locale === 'ja'
                      ? 'WhatsAppで今すぐお見積もり'
                      : 'Get a Quote on WhatsApp in 30 Seconds'}
                </h3>
                <p className="text-[13.5px] text-gray-600 mt-1">{t.ctaNote}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {data.whatsappTemplates.map((w, i) => (
                  <a
                    key={i}
                    href={buildWhatsAppUrl(w.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-[15px] transition-colors ${
                      i === 0
                        ? 'bg-[#25D366] hover:bg-[#1eb858] text-white'
                        : 'bg-white hover:bg-emerald-50 text-[#128C4D] border border-[#25D366]/40'
                    }`}
                  >
                    {w.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ⑥ 新 FAQ */}
        {data.newFaqs?.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-[26px] font-bold text-[#111827] mb-5 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gray-400 rounded-full inline-block" />
              {t.faqTitle}
            </h2>
            <div className="space-y-3">
              {data.newFaqs.map((f, i) => (
                <details key={i} className="group bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
                  <summary className="font-bold text-[15px] text-[#111827] cursor-pointer list-none flex items-center justify-between gap-3">
                    <span>{f.q}</span>
                    <span className="text-[#2873F5] text-xl font-light group-open:rotate-45 transition-transform flex-shrink-0">
                      +
                    </span>
                  </summary>
                  <p className="text-[14px] text-gray-700 leading-relaxed mt-3">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CategoryConversionBlocks;
