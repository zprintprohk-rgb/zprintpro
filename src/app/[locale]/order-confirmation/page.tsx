import { Metadata } from 'next';
import { Suspense } from 'react';
import OrderConfirmationClient from './OrderConfirmationClient';

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  const titles: Record<string, string> = {
    'zh-hk': '訂單確認 | 智印雲 ZprintPro',
    'en': 'Order Confirmation | ZprintPro',
    'ja': '注文確認 | ZprintPro',
  };
  return { title: titles[locale] || titles['en'] };
}

export default function OrderConfirmationPage({ params }: { params: { locale: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-16 text-center"><p>Loading...</p></div>}>
      <OrderConfirmationClient params={params} />
    </Suspense>
  );
}
