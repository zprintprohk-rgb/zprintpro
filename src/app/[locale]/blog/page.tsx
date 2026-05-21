import { Metadata } from 'next';
import { Locale, siteConfig } from '@/lib/seo';
import BlogContent from './BlogContent';

interface BlogPageProps {
  params: { locale: string };
}

const metaTranslations: Record<string, { title: string; description: string }> = {
  'zh-hk': {
    title: '印刷知識 | 智印云 ZprintPro',
    description: '智印云印刷知識專欄，分享貼紙、名片、包裝、書刊等印刷工藝、設計技巧與行業趨勢。',
  },
  'en': {
    title: 'Printing Knowledge | ZprintPro',
    description: 'ZprintPro printing knowledge blog. Sharing insights on stickers, business cards, packaging, booklets printing techniques and design tips.',
  },
  'ja': {
    title: '印刷知識 | ZprintPro',
    description: 'ZprintPro印刷知識ブログ。ステッカー、名刺、包装、冊子などの印刷技術とデザインノウハウをご紹介。',
  },
};

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
  return <BlogContent locale={locale} />;
}
