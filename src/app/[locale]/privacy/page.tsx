import { Metadata } from 'next';
import { Locale, siteConfig } from '@/lib/seo';

interface PrivacyPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '隱私政策 | 智印港 ZprintPro',
    description: '智印港隱私政策，說明我們如何收集、使用和保護您的個人資料。',
    h1: '隱私政策',
  },
  en: {
    title: 'Privacy Policy | ZprintPro',
    description: 'ZprintPro privacy policy explaining how we collect, use, and protect your personal data.',
    h1: 'Privacy Policy',
  },
  ja: {
    title: 'プライバシーポリシー | ZprintPro',
    description: 'ZprintProのプライバシーポリシー。個人情報の収集、使用、保護について説明します。',
    h1: 'プライバシーポリシー',
  },
};

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = translations[locale];
  return {
    title: t.title,
    description: t.description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/privacy/`,
    },
  };
}

export default function PrivacyPage({ params }: PrivacyPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-8">{t.h1}</h1>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6 text-gray-600">
          <p>Last updated: April 2024</p>
          <p>ZprintPro is committed to protecting your privacy. This policy explains how we handle your data.</p>
          <p>(Full privacy policy content to be provided.)</p>
        </div>
      </div>
    </main>
  );
}
