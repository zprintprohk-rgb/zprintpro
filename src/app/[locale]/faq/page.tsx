import { Metadata } from 'next';
import { Locale, siteConfig, generateFaqJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import Image from 'next/image';

interface FaqPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '幫助中心 | 智印港 ZprintPro',
    description: '智印港印刷服務幫助中心，包括落單須知、付款方式、送貨安排及常見問題解答。',
    h1: '幫助中心',
    subtitle: '快速找到您需要的答案',
    sections: {
      order: { title: '落單須知', icon: '📋' },
      payment: { title: '支付方式', icon: '💳' },
      contact: { title: '客服聯絡', icon: '📞' },
      faq: { title: '常見問題', icon: '❓' },
    },
    orderNotes: [
      { label: '訂單生效時限', content: '所有訂單自下單後 1 個工作天內起計（以確定稿件及成功付款為準），不包括加工或送貨時間。' },
      { label: '文件上傳要求', content: '請上傳 PDF / AI / PSD 檔案，並確保：預留 3mm 出血位、使用 CMYK 色彩模式、文字已轉曲。' },
      { label: '色彩與樣本', content: '網上圖示僅供參考。如對色彩要求嚴格，建議申請實物打樣（收費另計）。' },
      { label: '裁切精度', content: '裁切誤差可能出現 ±1 mm，屬正常範圍，恕不補印。' },
    ],
    paymentMethods: {
      intro: '我們支持多種支付方式，方便香港及海外客戶：',
      methods: [
        { name: '銀行轉帳', desc: '香港本地銀行轉帳，支持各大銀行' },
        { name: 'PayPal', desc: '支持全球付款，安全快捷' },
        { name: '信用卡', desc: '支持 Visa / MasterCard' },
        { name: 'Airwallex', desc: '企業客戶在線支付' },
        { name: '微信支付', desc: '內地客戶可使用微信掃碼支付' },
        { name: '支付寶', desc: '內地客戶可使用支付寶掃碼支付' },
      ],
      qrNotice: '使用微信 / 支付寶付款',
      qrReminder: '付款後請電郵至 Z-printpro@outlook.com，附上付款證明及訂單編號',
      qrWarning: '⚠️ 僅限 ZprintPro 客戶付款使用，付款後請務必發送郵件確認',
    },
    contactInfo: {
      email: '電郵：Z-printpro@outlook.com',
      phone: '電話：+86 181 2638 0255',
      hours: '辦公時間：週一至五 9:00–18:00',
      whatsapp: 'WhatsApp 查詢：+86 181 2638 0255',
    },
  },
  en: {
    title: 'Help Center | ZprintPro',
    description: 'ZprintPro Help Center - ordering guide, payment methods, shipping info and FAQs.',
    h1: 'Help Center',
    subtitle: 'Find answers to common questions',
    sections: {
      order: { title: 'Ordering Guide', icon: '📋' },
      payment: { title: 'Payment Methods', icon: '💳' },
      contact: { title: 'Contact Us', icon: '📞' },
      faq: { title: 'FAQ', icon: '❓' },
    },
    orderNotes: [
      { label: 'Order Effective Time', content: 'All orders are effective within 1 business day after placement (subject to artwork confirmation and successful payment), excluding processing or delivery time.' },
      { label: 'File Upload Requirements', content: 'Please upload PDF / AI / PSD files and ensure: 3mm bleed area, CMYK color mode, and text converted to outlines.' },
      { label: 'Color & Samples', content: 'Online images are for reference only. For strict color requirements, please request a physical proof (additional charges apply).' },
      { label: 'Cutting Precision', content: 'Cutting tolerance of ±1 mm is normal and will not be reprinted.' },
    ],
    paymentMethods: {
      intro: 'We support multiple payment methods for Hong Kong and international customers:',
      methods: [
        { name: 'Bank Transfer', desc: 'Hong Kong local bank transfer, supporting major banks' },
        { name: 'PayPal', desc: 'Global payments, safe and fast' },
        { name: 'Credit Card', desc: 'Visa / MasterCard accepted' },
        { name: 'Airwallex', desc: 'Online payment for corporate clients' },
        { name: 'WeChat Pay', desc: 'Mainland China customers can scan QR code to pay' },
        { name: 'Alipay', desc: 'Mainland China customers can scan QR code to pay' },
      ],
      qrNotice: 'WeChat Pay / Alipay QR Code',
      qrReminder: 'After payment, please email Z-printpro@outlook.com with proof of payment and order number',
      qrWarning: '⚠️ For ZprintPro customers only. Please email confirmation after payment',
    },
    contactInfo: {
      email: 'Email: Z-printpro@outlook.com',
      phone: 'Phone: +86 181 2638 0255',
      hours: 'Office Hours: Mon-Fri 9:00–18:00 (CST)',
      whatsapp: 'WhatsApp: +86 181 2638 0255',
    },
  },
  ja: {
    title: 'ヘルプセンター | ZprintPro',
    description: 'ZprintProヘルプセンター - 注文ガイド、支払い方法、配送情報、よくある質問。',
    h1: 'ヘルプセンター',
    subtitle: 'よくある質問への回答',
    sections: {
      order: { title: '注文ガイド', icon: '📋' },
      payment: { title: '支払い方法', icon: '💳' },
      contact: { title: 'お問い合わせ', icon: '📞' },
      faq: { title: 'よくある質問', icon: '❓' },
    },
    orderNotes: [
      { label: '注文有効期限', content: 'すべての注文は発注後1営業日以内に有効となります（原稿確定および入金確認をもって完了）。加工・配送時間は含まれません。' },
      { label: 'ファイルアップロード要件', content: 'PDF / AI / PSDファイルをアップロードしてください。3mmの裁ち落とし、CMYKカラーモード、文字の轮廓化を必ず行ってください。' },
      { label: '色合いと見本', content: 'オンライン画像は参考のみです。色合いに厳密なご要望がある場合は、実物打ち出しをご依頼ください（別途料金）。' },
      { label: '裁断精度', content: '裁断誤差±1 mmは正常範囲内です。再印刷はいたしかねます。' },
    ],
    paymentMethods: {
      intro: '香港および海外のお客様に対応した複数の支払い方法をご用意しています：',
      methods: [
        { name: '銀行振込', desc: '香港の地元銀行振込、主要銀行に対応' },
        { name: 'PayPal', desc: '世界規模の決済、安全かつ迅速' },
        { name: 'クレジットカード', desc: 'Visa / MasterCard対応' },
        { name: 'Airwallex', desc: '法人様のオンライン決済' },
        { name: 'WeChat Pay', desc: '中国大陸のお客様はQRコード決済が可能' },
        { name: 'Alipay', desc: '中国大陸のお客様はQRコード決済が可能' },
      ],
      qrNotice: 'WeChat Pay / Alipay QRコード',
      qrReminder: 'お支払い後、Z-printpro@outlook.com まで領収書と注文番号をメールでお送りください',
      qrWarning: '⚠️ ZprintProのお客様専用です。お支払い後は必ずメールでご確認ください',
    },
    contactInfo: {
      email: 'メール：Z-printpro@outlook.com',
      phone: '電話：+86 181 2638 0255',
      hours: '営業時間：月曜〜金曜 9:00–18:00（中国時間）',
      whatsapp: 'WhatsApp：+86 181 2638 0255',
    },
  },
};

const faqs: Record<string, { q: string; a: string }[]> = {
  'zh-hk': [
    { q: '最低訂購量是多少？', a: '大部分產品最低訂購量為100件，部分產品如名片最低50盒起訂。具體請查看各產品頁面。' },
    { q: '交貨時間需要多久？', a: '標準交貨時間為3-5個工作日。急件服務最快可即日交貨，需額外收取加急費用。' },
    { q: '支持哪些付款方式？', a: '我們支持銀行轉帳、PayPal、信用卡、Airwallex、微信支付及支付寶。企業客戶可申請月結帳戶。' },
    { q: '可以免費送貨嗎？', a: '訂單滿HK$500可享受免費送貨服務（香港地區）。未滿$500收取$50運費。海外訂單享國際免運。' },
    { q: '如何確保印刷品質？', a: '我們採用德國海德堡印刷機，配合專業色彩管理系統。每批訂單均經過QC檢驗後出貨。' },
    { q: '可以定制尺寸嗎？', a: '當然可以。我們支持完全定制尺寸、形狀和材質。請聯繫我們的銷售團隊獲取報價。' },
    { q: '提供設計服務嗎？', a: '是的，我們提供專業設計服務。簡單設計修改免費，完整設計方案另行報價。' },
    { q: '訂單可以取消或修改嗎？', a: '確認打樣前可免費修改。進入印刷流程後，修改可能產生額外費用。詳情請參閱我們的條款。' },
  ],
  en: [
    { q: 'What is the minimum order quantity?', a: 'Most products have a minimum order of 100 pieces. Business cards start from 50 boxes. Check each product page for details.' },
    { q: 'How long does delivery take?', a: 'Standard delivery is 3-5 business days. Rush orders can be same-day with additional fees.' },
    { q: 'What payment methods do you accept?', a: 'We accept bank transfer, PayPal, credit cards, Airwallex, WeChat Pay and Alipay. Corporate clients can apply for monthly billing.' },
    { q: 'Is free shipping available?', a: 'Free shipping for orders over HK$500 (Hong Kong area). Orders under $500 have a $50 delivery fee. International orders enjoy free shipping.' },
    { q: 'How do you ensure print quality?', a: 'We use Heidelberg printing presses with professional color management. Every batch is QC inspected before shipping.' },
    { q: 'Can I customize sizes?', a: 'Absolutely. We support fully custom sizes, shapes, and materials. Contact our sales team for a quote.' },
    { q: 'Do you offer design services?', a: 'Yes, we offer professional design services. Simple modifications are free; full design services are quoted separately.' },
    { q: 'Can I cancel or modify my order?', a: 'Free modifications before proof approval. Changes after printing starts may incur additional fees.' },
  ],
  ja: [
    { q: '最低発注数は？', a: 'ほとんどの製品は最低100個から。名刺は最低50箱から。詳細は各製品ページをご確認ください。' },
    { q: '納期はどのくらい？', a: '標準納期は3〜5営業日。急ぎの場合は当日配送も可能（追加料金がかかります）。' },
    { q: '支払い方法は？', a: '銀行振込、PayPal、クレジットカード、Airwallex、WeChat Pay、Alipayをご利用いただけます。法人様は月締め申請可能です。' },
    { q: '送料無料はありますか？', a: 'HK$500以上のご注文で香港地区送料無料。$500未満は$50の送料がかかります。海外注文は国際送料無料です。' },
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
      canonical: `${siteConfig.url}/${locale}/faq/`,
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

        {/* 落单须知 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#333333] mb-6 flex items-center gap-2">
            <span>{t.sections.order.icon}</span> {t.sections.order.title}
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {t.orderNotes.map((note, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2873F5] text-white text-xs flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#333333] text-sm mb-1">{note.label}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{note.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 支付方式 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#333333] mb-6 flex items-center gap-2">
            <span>{t.sections.payment.icon}</span> {t.sections.payment.title}
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <p className="text-gray-600 mb-6">{t.paymentMethods.intro}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {t.paymentMethods.methods.map((method, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <span className="text-lg">{['🏦', '💰', '💳', '🌐', '💚', '🔵'][idx]}</span>
                  <div>
                    <h3 className="font-semibold text-[#333333] text-sm">{method.name}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">{method.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 微信/支付宝二维码区域 */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-semibold text-[#333333] mb-4">{t.paymentMethods.qrNotice}</h3>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-40 h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center p-2">
                    WeChat Pay<br />QR Code<br />（请上传<br />payment-wechat.jpg）
                  </div>
                  <span className="text-sm font-medium text-[#07C160]">WeChat Pay</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-40 h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center p-2">
                    Alipay<br />QR Code<br />（请上传<br />payment-alipay.jpg）
                  </div>
                  <span className="text-sm font-medium text-[#1677FF]">Alipay</span>
                </div>
                <div className="flex-1 bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-800 text-sm font-medium mb-2">{t.paymentMethods.qrReminder}</p>
                  <p className="text-amber-700 text-xs">{t.paymentMethods.qrWarning}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 客服联络 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#333333] mb-6 flex items-center gap-2">
            <span>{t.sections.contact.icon}</span> {t.sections.contact.title}
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                <span className="text-xl">📧</span>
                <span className="text-gray-700 text-sm">{t.contactInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                <span className="text-xl">📱</span>
                <span className="text-gray-700 text-sm">{t.contactInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                <span className="text-xl">🕐</span>
                <span className="text-gray-700 text-sm">{t.contactInfo.hours}</span>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
                <span className="text-xl">💬</span>
                <span className="text-gray-700 text-sm">{t.contactInfo.whatsapp}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 常见问题 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[#333333] mb-6 flex items-center gap-2">
            <span>{t.sections.faq.icon}</span> {t.sections.faq.title}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {items.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-[#333333] mb-2">Q: {item.q}</h3>
                <p className="text-gray-600 leading-relaxed">A: {item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
