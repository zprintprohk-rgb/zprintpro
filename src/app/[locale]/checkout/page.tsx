import { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  const titles: Record<string, string> = {
    'zh-hk': '結算 | 智印云 ZprintPro',
    'en': 'Checkout | ZprintPro',
    'ja': 'レジ | ZprintPro',
  };
  return { title: titles[locale] || titles['en'] };
}

export default function CheckoutPage({ params }: { params: { locale: string } }) {
  return <CheckoutClient params={params} />;
}
