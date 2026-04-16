import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';

interface SuccessPageProps {
  params: { locale: string };
}

const locales = ['zh-hk', 'en', 'ja'] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: SuccessPageProps): Promise<Metadata> {
  const { locale } = params;
  const title =
    locale === 'zh-hk'
      ? '支付成功 | ZPrintPro'
      : locale === 'en'
      ? 'Payment Successful | ZPrintPro'
      : '支払い完了 | ZPrintPro';
  return { title };
}

export default function PaymentSuccessPage({ params }: SuccessPageProps) {
  const { locale } = params;

  const messages = {
    'zh-hk': {
      heading: '支付成功',
      subheading: '感謝您的訂購！我們已收到您的付款，將盡快處理您的訂單。',
      orderLabel: '訂單編號',
      contact: '如有問題，請聯絡我們：info@zprintpro.com',
    },
    en: {
      heading: 'Payment Successful',
      subheading: 'Thank you for your order! We have received your payment and will process it shortly.',
      orderLabel: 'Order ID',
      contact: 'If you have any questions, please contact us at info@zprintpro.com',
    },
    ja: {
      heading: '支払い完了',
      subheading: 'ご注文ありがとうございます！お支払いを確認しました。順次処理いたします。',
      orderLabel: '注文番号',
      contact: 'ご不明な点がございましたら、info@zprintpro.com までお問い合わせください。',
    },
  }[locale as 'zh-hk' | 'en' | 'ja'];

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Order',
    orderStatus: 'https://schema.org/OrderPaymentDue',
    merchant: {
      '@type': 'Organization',
      name: 'ZPrintPro',
      url: 'https://zprintpro.com',
    },
  };

  return (
    <>
      <JsonLd data={jsonLdData} />
      <main className="container mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold tracking-tight">{messages.heading}</h1>
        <p className="mt-4 text-muted-foreground">{messages.subheading}</p>
        <div className="mt-8 rounded-lg border p-6">
          <p className="text-sm text-muted-foreground">{messages.orderLabel}</p>
          <p className="text-lg font-semibold">—</p>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">{messages.contact}</p>
      </main>
    </>
  );
}
