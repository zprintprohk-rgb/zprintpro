import { Metadata } from 'next';
import { Locale, siteConfig } from '@/lib/seo';
import BlogContent from './BlogContent';
// 2026-09-11 D: 阅读时长从真实正文计算 (blog-data JSON, 与详情页同源), 服务器端算好传入客户端组件
import blogContentsZhHk from '@/data/blog-data/zh-hk.json';
import blogContentsEn from '@/data/blog-data/en.json';
import blogContentsJa from '@/data/blog-data/ja.json';
// 2026-09-11 老板指令: blog 照片全用 SKU 真实图 (服务器端算好 map 传入客户端, 客户端不 import products 大树)
import { blogPosts } from '@/data/blog-posts';
import { getBlogSkuImage } from '@/lib/blog-sku-image';

interface BlogPageProps {
  params: { locale: string };
}

const metaTranslations: Record<string, { title: string; description: string }> = {
  'zh-hk': {
    title: '印刷知識 | 智印港 ZprintPro',
    description: '智印港印刷知識專欄，分享貼紙、傳單印刷、包裝、書刊等印刷工藝、設計技巧與行業趨勢。',
  },
  'en': {
    title: 'Printing Knowledge | ZprintPro',
    description: 'ZprintPro printing knowledge blog. Sharing insights on stickers, flyers, packaging, booklets printing techniques and design tips.',
  },
  'ja': {
    title: '印刷知識 | ZprintPro',
    description: 'ZprintPro印刷知識ブログ。ステッカー、チラシ、包装、冊子などの印刷技術とデザインノウハウをご紹介。',
  },
};

const blogContentsByLocale: Record<string, Record<string, { content: string }>> = {
  'zh-hk': blogContentsZhHk as Record<string, { content: string }>,
  en: blogContentsEn as Record<string, { content: string }>,
  ja: blogContentsJa as Record<string, { content: string }>,
};

/** 去除 HTML/markdown 标记后的纯文本长度 (字符数) */
function stripHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#*_>`~[\]()|!-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * D: 阅读时长 (分钟) — 真实正文计算, 不编数字
 * zh-hk 中文按 ~400 字/分钟; en/ja 按 ~200 词/分钟 (Intl.Segmenter word 粒度, ja 无空格)
 */
function computeReadMinutes(locale: string, content: string): number {
  const text = stripHtml(content);
  if (!text) return 1;
  if (locale === 'zh-hk') {
    return Math.max(1, Math.round(text.length / 400));
  }
  const seg = new Intl.Segmenter(locale === 'ja' ? 'ja' : 'en', { granularity: 'word' });
  const words = [...seg.segment(text)].filter((x) => x.isWordLike).length;
  return Math.max(1, Math.round(words / 200));
}

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const meta = metaTranslations[locale];
  const langPrefix = `${locale}/`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${siteConfig.url}/${langPrefix}blog/`,
      languages: {
        'zh-HK': `${siteConfig.url}/zh-hk/blog/`,
        'en': `${siteConfig.url}/en/blog/`,
        'ja': `${siteConfig.url}/ja/blog/`,
        'x-default': `${siteConfig.url}/zh-hk/blog/`,
      },
    },
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  const locale = params.locale as Locale;
  const contents = blogContentsByLocale[locale] || {};
  // 每篇文章阅读分钟数 — 只算列表页展示需要的字段, 纯数字 Map (可序列化 props)
  const readTimes: Record<string, number> = {};
  for (const slug of Object.keys(contents)) {
    readTimes[slug] = computeReadMinutes(locale, contents[slug]?.content || '');
  }
  // 2026-09-11 老板指令: 每篇 blog 的 SKU 真实图 (categoryKey → 产品类目 → top SKU locale 首图)
  const blogImages: Record<string, string> = {};
  for (const post of blogPosts) {
    const img = getBlogSkuImage(post.slug, locale, post.categoryKey);
    if (img) blogImages[post.slug] = img;
  }
  return <BlogContent locale={locale} readTimes={readTimes} blogImages={blogImages} />;
}
