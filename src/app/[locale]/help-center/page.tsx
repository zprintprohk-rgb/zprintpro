import { Metadata } from 'next';
import { Locale, siteConfig } from '@/lib/seo';
import HelpCenterClient from './HelpCenterClient';

interface HelpCenterPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '幫助中心 | 智印云 ZprintPro',
    description: '智印云印刷服務幫助中心，包括落單須知、做稿須知、送貨須知、排版指引、色彩指引及其他注意事項。',
  },
  en: {
    title: 'Help Center | ZprintPro',
    description: 'ZprintPro Help Center - ordering guide, artwork guidelines, shipping info, typography, color guide and other notes.',
  },
  ja: {
    title: 'ヘルプセンター | ZprintPro',
    description: 'ZprintProヘルプセンター - 注文ガイド、原稿ガイド、配送情報、排版、カラーガイド、その他の注意事項。',
  },
};

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: HelpCenterPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = translations[locale];
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/help-center/`,
      languages: {
        'zh-Hant-HK': `${siteConfig.url}/help-center/`,
        'en': `${siteConfig.url}/en/help-center/`,
        'ja-JP': `${siteConfig.url}/ja/help-center/`,
        'x-default': `${siteConfig.url}/en/help-center/`,
      },
    },
  };
}

export default function HelpCenterPage({ params }: HelpCenterPageProps) {
  const locale = params.locale as Locale;
  return <HelpCenterClient locale={locale} />;
}
