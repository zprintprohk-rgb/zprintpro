/**
 * 支柱頁 (Pillar Page) + 集群文章路由
 * 3 大支柱：sticker-guide / flyer-guide / packaging-guide
 * 9 篇集群文章：2026-11-28 K3 拍板選項 a 後永久歸 /guide/，
 * 舊 /blog/<cluster-slug> 由 next.config.js 301 承接權重。
 *
 * 2026-11-28: 移除硬編碼 pillarQuotations（Q16 無來源統計，偽 citation 毒源，禁入 schema）。
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale, locales } from '@/types/locale';
import {
  pillars,
  getClustersByPillarSlug,
  getPillarBySlug,
  getClusterBySlug,
  getAllClusterSlugs,
  ClusterArticle,
} from '@/data/pillar-content';
import { getProductBySlug, getProductTitle } from '@/data/products';
import { generateArticleSchema } from '@/lib/seo';
import { createMetadata } from '@/lib/metadata';
import { getProductMainImage } from '@/lib/product-image';
import { JsonLd } from '@/components/JsonLd';
import { InternalLink } from '@/components/internal-link';

// 2026-10-15 A2 CPU 治理: 未知 slug 一律静态 404 (dynamicParams=false),
// 不再为扫描器/猜测 URL 做动态渲染 (此前免费层 10ms CPU 下致 1102/500)
export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  const allGuideSlugs = [...pillars.map((p) => p.slug), ...getAllClusterSlugs()];
  locales.forEach((locale) => {
    allGuideSlugs.forEach((slug) => {
      params.push({ locale, slug });
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
  const safeLocale = locale as Locale;
  const pillar = getPillarBySlug(slug);
  if (pillar) return createMetadata(pillar.seo[safeLocale], safeLocale);
  const cluster = getClusterBySlug(slug);
  if (!cluster) return { title: 'Not Found' };
  // 集群無獨立 seo 字段：title/description 直接做 meta，canonical 鎖 /guide/<slug>/
  return {
    title: cluster.title[safeLocale],
    description: cluster.description[safeLocale],
    alternates: {
      canonical: `https://zprintpro.com/${safeLocale}/guide/${slug}/`,
      languages: {
        'zh-HK': `https://zprintpro.com/zh-hk/guide/${slug}/`,
        'en': `https://zprintpro.com/en/guide/${slug}/`,
        'ja': `https://zprintpro.com/ja/guide/${slug}/`,
        'x-default': `https://zprintpro.com/zh-hk/guide/${slug}/`,
      },
    },
  };
}

export default function GuidePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  const safeLocale = locale as Locale;
  const pillar = getPillarBySlug(slug);
  // 支柱優先；非支柱 slug 嘗試集群（9 篇集群文章 2026-11-28 起歸 /guide/）
  const cluster: ClusterArticle | undefined = pillar ? undefined : getClusterBySlug(slug);

  if (!pillar && !cluster) {
    notFound();
  }

  const pageTitle = pillar ? pillar.title[safeLocale] : (cluster as ClusterArticle).title[safeLocale];
  const pageDescription = pillar
    ? pillar.description[safeLocale]
    : (cluster as ClusterArticle).description[safeLocale];
  const rawContent = pillar
    ? pillar.content[safeLocale]
    : (cluster as ClusterArticle).content[safeLocale];
  // 集群正文沿用 blog 層的 /{locale}/ 佔位符口徑（與 blog/[slug] L860 一致）
  const content = rawContent.replace(/\/{locale}\//g, `/${safeLocale}/`);
  const lastUpdated = pillar
    ? pillar.lastUpdated
    : (cluster as ClusterArticle).lastUpdated;
  const date = pillar ? pillar.date : (cluster as ClusterArticle).date;
  const image = pillar ? pillar.image : (cluster as ClusterArticle).image;
  const linkedProductSlugs =
    (pillar ? pillar.linkedProducts : (cluster as ClusterArticle).linkedProducts)?.slice(0, 4) || [];
  const relatedClusters = pillar ? getClustersByPillarSlug(slug) : [];
  const parentPillar = cluster ? getPillarBySlug(cluster.pillarSlug) : undefined;

  const wordCount = content
    ? Math.floor(content.replace(/<[^>]+>/g, '').length / 2)
    : undefined;

  const articleSchema = generateArticleSchema(
    {
      title: pageTitle,
      description: pageDescription,
      image: image
        ? `https://zprintpro.com${image.replace('.webp', `-${safeLocale}.webp`)}`
        : 'https://zprintpro.com/images/og-image.jpg',
      publishedAt: date,
      lastUpdated,
      wordCount,
    },
    safeLocale
  );

  const breadcrumbItems: { '@type': string; position: number; name: string; item: string }[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: safeLocale === 'zh-hk' ? '首頁' : safeLocale === 'en' ? 'Home' : 'ホーム',
      item: `https://zprintpro.com/${safeLocale}/`,
    },
  ];
  if (pillar) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: pageTitle,
      item: `https://zprintpro.com/${safeLocale}/guide/${slug}/`,
    });
  } else {
    // 集群：麵包屑含支柱父級（hub-spoke 層級結構）
    if (parentPillar) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: parentPillar.title[safeLocale],
        item: `https://zprintpro.com/${safeLocale}/guide/${parentPillar.slug}/`,
      });
    }
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: parentPillar ? 3 : 2,
      name: pageTitle,
      item: `https://zprintpro.com/${safeLocale}/guide/${slug}/`,
    });
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };

  const t = {
    'zh-hk': { relatedArticles: '相關文章', readMore: '閱讀全文', backToHome: '← 返回首頁', relatedProducts: '相關產品推薦' },
    'en': { relatedArticles: 'Related Articles', readMore: 'Read Full Article', backToHome: '← Back to Home', relatedProducts: 'Related Products' },
    'ja': { relatedArticles: '関連記事', readMore: '全文を読む', backToHome: '← ホームに戻る', relatedProducts: '関連製品' },
  }[safeLocale];

  const linkedProducts = linkedProductSlugs
    .map((slug: string) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href={`/${safeLocale}/`}
            className="text-[#2873F5] hover:underline text-sm mb-2 inline-block"
          >
            {t.backToHome}
          </a>
          {cluster && parentPillar && (
            <a
              href={`/${safeLocale}/guide/${parentPillar.slug}/`}
              className="text-[#2873F5] hover:underline text-sm mb-6 block"
            >
              ← {parentPillar.title[safeLocale]}
            </a>
          )}

          <article className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-12">
            <div className="p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-4">
                {pageTitle}
              </h1>
              <p className="text-lg text-gray-600 mb-2 leading-relaxed">
                {pageDescription}
              </p>
              <p className="text-sm text-gray-400 mb-8">
                {safeLocale === 'zh-hk'
                  ? `最後更新：${lastUpdated}`
                  : safeLocale === 'en'
                    ? `Last updated: ${lastUpdated}`
                    : `最終更新：${lastUpdated}`}
              </p>
              <div
                className="prose prose-blue max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </article>

          {/* 相關產品推薦 */}
          {linkedProducts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#333333] mb-6">{t.relatedProducts}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {linkedProducts.map((product: NonNullable<ReturnType<typeof getProductBySlug>>) => (
                  <a
                    key={product.slug}
                    href={`/${safeLocale}/product/${product.slug}/`}
                    className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square bg-gray-50 relative overflow-hidden">
                      <img
                        src={getProductMainImage(product, safeLocale)}
                        alt={getProductTitle(product, safeLocale)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-bold text-[#333333] line-clamp-2 group-hover:text-[#2873F5] transition-colors">
                        {getProductTitle(product, safeLocale)}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* 相關集群文章卡片（僅支柱頁展示；集群永久歸 /guide/，2026-11-28 起） */}
          {relatedClusters.length > 0 && (
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
                          decoding="async"
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
                        href={`/${safeLocale}/guide/${cluster.slug}/`}
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
          )}
        </div>
      </main>
    </>
  );
}
