/**
 * RelatedSearchQueries — 5 关键词长尾扩展组件
 * 在 SEO 专题页底部追加 GSC top 5 关键词相关长尾问句
 * 保留原页面 title/description（保护 ranking），只追加
 * 含内部链接到 /services/seo/[slug] 专题页
 */

import Link from 'next/link';
import { Locale } from '@/types/locale';
import { getQueriesForSlug } from '@/lib/seo-related-queries';

interface RelatedSearchQueriesProps {
  slug: string;
  locale: Locale;
}

const I18N: Record<Locale, { title: string; subtitle: string; impressions: string; rank: string; viewAll: string }> = {
  'zh-hk': {
    title: '相關搜索問題',
    subtitle: '用戶在 Google 搜索的熱門問題（依據 GSC 真實數據）',
    impressions: '展示',
    rank: '排名',
    viewAll: '查看完整指南',
  },
  en: {
    title: 'Related Search Queries',
    subtitle: 'Top questions from Google Search Console (real data)',
    impressions: 'Impressions',
    rank: 'Rank',
    viewAll: 'View complete guide',
  },
  ja: {
    title: '関連検索クエリ',
    subtitle: 'Google Search Console の実データに基づく人気質問',
    impressions: '表示',
    rank: '順位',
    viewAll: '完全ガイドを見る',
  },
};

export function RelatedSearchQueries({ slug, locale }: RelatedSearchQueriesProps) {
  const queries = getQueriesForSlug(slug);
  const t = I18N[locale] || I18N.en;

  if (queries.length === 0) return null;

  return (
    <section
      aria-labelledby="related-search-heading"
      className="mt-12 pt-10 border-t border-slate-200"
    >
      <h2 id="related-search-heading" className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
        {t.title}
      </h2>
      <p className="text-sm text-slate-500 mb-6">{t.subtitle}</p>

      <ul className="space-y-4">
        {queries.map((q) => (
          <li
            key={q.keyword}
            className="rounded-lg border border-slate-200 bg-white p-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="font-semibold text-slate-900 text-sm md:text-base">
                {q.keyword}
              </h3>
              <div className="text-[10px] text-slate-400 whitespace-nowrap flex-shrink-0">
                {t.impressions} {q.impressions} · {t.rank} {q.rank.toFixed(1)}
              </div>
            </div>
            <ul className="space-y-1.5 text-sm">
              {q.longTail[locale]?.slice(0, 3).map((qText, i) => (
                <li key={i} className="text-slate-600 flex items-start gap-1.5">
                  <span className="text-blue-500 mt-0.5">·</span>
                  <span>{qText}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <Link
                href={`/${locale}/services/seo/${q.targetSlug}/`}
                className="text-xs text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
              >
                {t.viewAll} &rarr;
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
