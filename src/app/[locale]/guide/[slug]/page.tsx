/**
 * 支柱頁 (Pillar Page) 路由
 * 3 大支柱：sticker-guide / flyer-guide / packaging-guide
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale, locales } from '@/types/locale';
import { pillars, getClustersByPillarSlug, getPillarBySlug } from '@/data/pillar-content';
import { generateArticleSchema } from '@/lib/seo';
import { createMetadata } from '@/lib/metadata';
import { JsonLd } from '@/components/JsonLd';
import { InternalLink } from '@/components/internal-link';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  locales.forEach((locale) => {
    pillars.forEach((p) => {
      params.push({ locale, slug: p.slug });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  const pillar = getPillarBySlug(slug);
  if (!pillar) return { title: 'Not Found' };
  return createMetadata(pillar.seo[locale as Locale], locale as Locale);
}

export default function PillarPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  const safeLocale = locale as Locale;
  const pillar = getPillarBySlug(slug);

  if (!pillar) {
    notFound();
  }

  const relatedClusters = getClustersByPillarSlug(slug);

  const articleSchema = generateArticleSchema(
    {
      title: pillar.title[safeLocale],
      description: pillar.description[safeLocale],
      image: pillar.image
        ? `https://zprintpro.com${pillar.image.replace('.webp', `-${safeLocale}.webp`)}`
        : 'https://zprintpro.com/images/og-image.jpg',
      publishedAt: pillar.date,
      updatedAt: pillar.date,
    },
    safeLocale
  );

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: safeLocale === 'zh-hk' ? '首頁' : safeLocale === 'en' ? 'Home' : 'ホーム',
        item: `https://zprintpro.com/${safeLocale}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pillar.title[safeLocale],
        item: `https://zprintpro.com/${safeLocale}/guide/${slug}/`,
      },
    ],
  };

  const t = {
    'zh-hk': { relatedArticles: '相關文章', readMore: '閱讀全文', backToHome: '← 返回首頁' },
    'en': { relatedArticles: 'Related Articles', readMore: 'Read Full Article', backToHome: '← Back to Home' },
    'ja': { relatedArticles: '関連記事', readMore: '全文を読む', backToHome: '← ホームに戻る' },
  }[safeLocale];

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href={`/${safeLocale}/`}
            className="text-[#2873F5] hover:underline text-sm mb-6 inline-block"
          >
            {t.backToHome}
          </a>

          <article className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-12">
            <div className="p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">
                {pillar.title[safeLocale]}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {pillar.description[safeLocale]}
              </p>
              <div
                className="prose prose-blue max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: pillar.content[safeLocale] }}
              />
            </div>
          </article>

          {/* 相關集群文章卡片 */}
          <section>
            <h2 className="text-2xl font-bold text-[#333333] mb-6">{t.relatedArticles}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedClusters.map((cluster) => (
                <div
                  key={cluster.slug}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[16/9] bg-gray-100 relative">
                    {cluster.image ? (
                      <img
                        src={cluster.image}
                        alt={cluster.title[safeLocale]}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <span className="text-sm">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#333333] mb-2 line-clamp-2">
                      {cluster.title[safeLocale]}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                      {cluster.description[safeLocale]}
                    </p>
                    <InternalLink
                      href={`/${safeLocale}/blog/${cluster.slug}`}
                      locale={safeLocale}
                      anchorText={{
                        'zh-hk': t.readMore,
                        'en': t.readMore,
                        'ja': t.readMore,
                      }}
                      className="text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
