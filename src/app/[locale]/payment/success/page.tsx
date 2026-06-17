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
      ? '支付成功 | ZprintPro'
      : locale === 'en'
      ? 'Payment Successful | ZprintPro'
      : '支払い完了 | ZprintPro';
  const description =
    locale === 'zh-hk'
      ? '您的付款已成功處理。感謝您選擇智印雲 ZprintPro 的專業印刷服務。'
      : locale === 'en'
      ? 'Your payment has been successfully processed. Thank you for choosing ZprintPro professional printing services.'
      : 'お支払いが正常に処理されました。ZprintProのプロフェッショナル印刷サービスをご利用いただきありがとうございます。';
  return {
    title,
    description,
    alternates: {
      canonical: `https://zprintpro.com/${locale}/payment/success/`,
      languages: {
        'zh-HK': 'https://zprintpro.com/payment/success/',
        'en': 'https://zprintpro.com/en/payment/success/',
        'ja': 'https://zprintpro.com/ja/payment/success/',
        'x-default': 'https://zprintpro.com/en/payment/success/',
      },
    },
  };
}

export default function PaymentSuccessPage({ params }: SuccessPageProps) {
  const { locale } = params;

  const messages = {
    'zh-hk': {
      heading: '支付成功',
      subheading: '感謝您的訂購！我們已收到您的付款，將盡快處理您的訂單。',
      orderLabel: '訂單編號',
      contact: '如有問題，請聯絡我們：zprintpro@outlook.com',
    },
    en: {
      heading: 'Payment Successful',
      subheading: 'Thank you for your order! We have received your payment and will process it shortly.',
      orderLabel: 'Order ID',
      contact: 'If you have any questions, please contact us at zprintpro@outlook.com',
    },
    ja: {
      heading: '支払い完了',
      subheading: 'ご注文ありがとうございます！お支払いを確認しました。順次処理いたします。',
      orderLabel: '注文番号',
      contact: 'ご不明な点がございましたら、zprintpro@outlook.com までお問い合わせください。',
    },
  }[locale as 'zh-hk' | 'en' | 'ja'];

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'Order',
    orderStatus: 'https://schema.org/OrderPaymentDue',
    merchant: {
      '@type': 'Organization',
      name: 'ZprintPro',
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
