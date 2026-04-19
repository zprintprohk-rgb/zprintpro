import { Metadata } from 'next';
import { Locale, siteConfig, generateFaqJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

interface FaqPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '常見問題 | 智印港 ZprintPro',
    description: '智印港印刷服務常見問題解答，包括訂購流程、交貨時間、付款方式等。',
    h1: '常見問題',
    subtitle: '快速找到您需要的答案',
  },
  en: {
    title: 'FAQ | ZprintPro',
    description: 'Frequently asked questions about ZprintPro printing services, including ordering, delivery, and payment.',
    h1: 'FAQ',
    subtitle: 'Find answers to common questions',
  },
  ja: {
    title: 'よくある質問 | ZprintPro',
    description: 'ZprintPro印刷サービスに関するよくある質問と回答。',
    h1: 'よくある質問',
    subtitle: 'よくある質問への回答',
  },
};

const faqs: Record<string, { q: string; a: string }[]> = {
  'zh-hk': [
    { q: '最低訂購量是多少？', a: '大部分產品最低訂購量為100件，部分產品如名片最低50盒起訂。具體請查看各產品頁面。' },
    { q: '交貨時間需要多久？', a: '標準交貨時間為3-5個工作日。急件服務最快可即日交貨，需額外收取加急費用。' },
    { q: '支持哪些付款方式？', a: '我們支持銀行轉帳、PayPal、信用卡及Airwallex在線支付。企業客戶可申請月結帳戶。' },
    { q: '可以免費送貨嗎？', a: '訂單滿HK$500可享受免費送貨服務（香港地區）。未滿$500收取$50運費。' },
    { q: '如何確保印刷品質？', a: '我們採用德國海德堡印刷機，配合專業色彩管理系統。每批訂單均經過QC檢驗後出貨。' },
    { q: '可以定制尺寸嗎？', a: '當然可以。我們支持完全定制尺寸、形狀和材質。請聯繫我們的銷售團隊獲取報價。' },
    { q: '提供設計服務嗎？', a: '是的，我們提供專業設計服務。簡單設計修改免費，完整設計方案另行報價。' },
    { q: '訂單可以取消或修改嗎？', a: '確認打樣前可免費修改。進入印刷流程後，修改可能產生額外費用。詳情請參閱我們的條款。' },
  ],
  en: [
    { q: 'What is the minimum order quantity?', a: 'Most products have a minimum order of 100 pieces. Business cards start from 50 boxes. Check each product page for details.' },
    { q: 'How long does delivery take?', a: 'Standard delivery is 3-5 business days. Rush orders can be same-day with additional fees.' },
    { q: 'What payment methods do you accept?', a: 'We accept bank transfer, PayPal, credit cards, and Airwallex. Corporate clients can apply for monthly billing.' },
    { q: 'Is free shipping available?', a: 'Free shipping for orders over HK$500 (Hong Kong area). Orders under $500 have a $50 delivery fee.' },
    { q: 'How do you ensure print quality?', a: 'We use Heidelberg printing presses with professional color management. Every batch is QC inspected before shipping.' },
    { q: 'Can I customize sizes?', a: 'Absolutely. We support fully custom sizes, shapes, and materials. Contact our sales team for a quote.' },
    { q: 'Do you offer design services?', a: 'Yes, we offer professional design services. Simple modifications are free; full design services are quoted separately.' },
    { q: 'Can I cancel or modify my order?', a: 'Free modifications before proof approval. Changes after printing starts may incur additional fees.' },
  ],
  ja: [
    { q: '最低発注数は？', a: 'ほとんどの製品は最低100個から。名刺は最低50箱から。詳細は各製品ページをご確認ください。' },
    { q: '納期はどのくらい？', a: '標準納期は3〜5営業日。急ぎの場合は当日配送も可能（追加料金がかかります）。' },
    { q: '支払い方法は？', a: '銀行振込、PayPal、クレジットカード、Airwallexをご利用いただけます。法人様は月締め申請可能です。' },
    { q: '送料無料はありますか？', a: 'HK$500以上のご注文で香港地区送料無料。$500未満は$50の送料がかかります。' },
    { q: '印刷品質をどう保証しますか？', a: 'ハイデルベルグ印刷機とプロのカラーマネジメントを使用。出荷前に全ロットQC検査を実施しています。' },
    { q: 'サイズのカスタマイズは可能？', a: 'はい、完全カスタムサイズ・形状・材質に対応しています。お見積もりは営業チームまで。' },
    { q: 'デザインサービスはありますか？', a: 'はい、プロのデザインサービスを提供しています。簡単な修正は無料、完全デザインは別途見積もり。' },
    { q: '注文のキャンセル・変更は可能？', a: '校正承認前は無料で変更可能。印刷開始後の変更は追加料金が発生する場合があります。' },
  ],
};

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: FaqPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = translations[locale];
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale === 'zh-hk' ? '' : locale + '/'}faq/`,
      languages: {
        'zh-Hant-HK': `${siteConfig.url}/faq/`,
        'en': `${siteConfig.url}/en/faq/`,
        'ja-JP': `${siteConfig.url}/ja/faq/`,
        'x-default': `${siteConfig.url}/en/faq/`,
      },
    },
  };
}

export default function FaqPage({ params }: FaqPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];
  const items = faqs[locale] || faqs['zh-hk'];

  const faqJsonLd = generateFaqJsonLd(
    items.map((item) => ({ question: item.q, answer: item.a }))
  );

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <JsonLd data={faqJsonLd} />
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">{t.h1}</h1>
          <p className="text-gray-500 text-lg">{t.subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-[#333333] mb-2">Q: {item.q}</h3>
              <p className="text-gray-600 leading-relaxed">A: {item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
