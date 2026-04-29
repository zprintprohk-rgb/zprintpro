import { Metadata } from 'next';
import CartClient from './CartClient';

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;
  const titles: Record<string, string> = {
    'zh-hk': '購物車 | 智印港 ZprintPro',
    'en': 'Shopping Cart | ZprintPro',
    'ja': 'カート | ZprintPro',
  };
  return { title: titles[locale] || titles['en'] };
}

export default function CartPage({ params }: { params: { locale: string } }) {
  return <CartClient params={params} />;
}
