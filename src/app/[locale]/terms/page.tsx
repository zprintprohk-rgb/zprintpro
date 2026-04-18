import { Metadata } from 'next';
import { Locale, siteConfig } from '@/lib/seo';

interface TermsPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '服務條款 | 智印港 ZprintPro',
    description: '智印港服務條款與細則。',
    h1: '服務條款',
  },
  en: {
    title: 'Terms of Service | ZprintPro',
    description: 'ZprintPro terms of service.',
    h1: 'Terms of Service',
  },
  ja: {
    title: '利用規約 | ZprintPro',
    description: 'ZprintProの利用規約。',
    h1: '利用規約',
  },
};

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = translations[locale];
  return {
    title: t.title,
    description: t.description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${siteConfig.url}/${locale === 'zh-hk' ? '' : locale + '/'}terms/`,
    },
  };
}

export default function TermsPage({ params }: TermsPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-8">{t.h1}</h1>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6 text-gray-600">
          <p>Last updated: April 2024</p>
          <p>By using ZprintPro services, you agree to these terms. Please read them carefully.</p>
          <p>(Full terms content to be provided.)</p>
        </div>
      </div>
    </main>
  );
}
