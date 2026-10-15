import { Metadata } from 'next';
import { Suspense } from 'react';
import OrderConfirmationClient from './OrderConfirmationClient';

// 2026-10-15 A2 CPU 治理: 本页参数全部构建期确定, 未知参数一律静态 404 (dynamicParams=false),
// 消除 Node fallback 函数 (next-on-pages 要求动态路由全 edge, 带 fallback 即构建失败)
export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  const titles: Record<string, string> = {
    'zh-hk': '訂單確認 | 智印港 ZprintPro',
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
