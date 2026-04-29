import { Metadata } from 'next';
import { Locale, siteConfig, generateFaqJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import FaqClient from './FaqClient';

interface FaqPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '常見問題 | 智印港 ZprintPro',
    description: '智印港印刷服務常見問題解答，包括訂購流程、交貨時間、付款方式、送貨安排等。',
    h1: '常見問題',
    subtitle: '快速找到您需要的答案',
    searchPlaceholder: '輸入關鍵詞搜尋問題...',
    noResults: '找不到相關問題，請嘗試其他關鍵詞或聯絡客服。',
    contactCta: '仍有疑問？',
    contactDesc: '歡迎聯絡我們的客服團隊',
    email: 'zprintpro@outlook.com',
    phone: '+86 181 2638 0255',
  },
  en: {
    title: 'FAQ | ZprintPro',
    description: 'Frequently asked questions about ZprintPro printing services, including ordering, delivery, payment, and shipping.',
    h1: 'FAQ',
    subtitle: 'Find answers to common questions',
    searchPlaceholder: 'Search questions...',
    noResults: 'No matching questions found. Try different keywords or contact us.',
    contactCta: 'Still have questions?',
    contactDesc: 'Contact our customer service team',
    email: 'zprintpro@outlook.com',
    phone: '+86 181 2638 0255',
  },
  ja: {
    title: 'よくある質問 | ZprintPro',
    description: 'ZprintPro印刷サービスに関するよくある質問と回答。注文、納期、支払い、配送について。',
    h1: 'よくある質問',
    subtitle: 'よくある質問への回答',
    searchPlaceholder: 'キーワードで検索...',
    noResults: '該当する質問が見つかりません。別のキーワードを試すか、お問い合わせください。',
    contactCta: 'ご質問がございますか？',
    contactDesc: 'カスタマーサービスまでお問い合わせください',
    email: 'zprintpro@outlook.com',
    phone: '+86 181 2638 0255',
  },
};

const faqs: Record<string, { q: string; a: string; category: string }[]> = {
  'zh-hk': [
    { q: '最低訂購量是多少？', a: '大部分產品最低訂購量為100件，部分產品如名片最低50盒起訂。具體請查看各產品頁面或聯絡客服查詢。', category: '訂購' },
    { q: '交貨時間需要多久？', a: '標準交貨時間為3-5個工作日。急件服務最快可即日交貨，需額外收取加急費用。實際交貨時間視產品類型及數量而定。', category: '訂購' },
    { q: '支持哪些付款方式？', a: '我們支持微信支付及支付寶付款。付款後請務必將付款證明（截圖）電郵至 zprintpro@outlook.com，並註明訂單編號，以便我們核對。', category: '付款' },
    { q: '付款後為什麼要發郵件確認？', a: '由於微信及支付寶收款碼均為內地賬戶，付款後系統不會自動通知我們。您必須發送電郵附上付款證明及訂單編號，客服才能在1個工作天內確認收款並開始處理訂單。', category: '付款' },
    { q: '可以免費送貨嗎？', a: '訂單滿HK$500可享受免費送貨服務（香港地區）。未滿$500收取$50運費。海外訂單享國際免運，由DHL/FedEx配送。', category: '送貨' },
    { q: '送貨時間是什麼時候？', a: '送貨時間一般為星期一至五上午9:00至下午6:00。星期六、日及公眾假期不設送貨服務。偏遠地區可能需要額外時間。', category: '送貨' },
    { q: '如何確保印刷品質？', a: '我們採用德國海德堡印刷機，配合專業色彩管理系統。每批訂單均經過QC檢驗後出貨。如對色彩要求嚴格，建議申請實物打樣（收費另計）。', category: '品質' },
    { q: '可以定制尺寸嗎？', a: '當然可以。我們支持完全定制尺寸、形狀和材質。請聯繫我們的銷售團隊獲取報價。', category: '產品' },
    { q: '提供設計服務嗎？', a: '是的，我們提供專業設計服務。簡單設計修改免費，完整設計方案另行報價。經本公司做稿或改稿，稿件擁有權屬本公司所有，只提供jpg圖檔校對。', category: '設計' },
    { q: '訂單可以取消或修改嗎？', a: '確認打樣前可免費修改。進入印刷流程後，修改可能產生額外費用。一旦開始印刷，訂單不可取消。', category: '訂購' },
    { q: '文件有什麼格式要求？', a: '請上傳PDF / AI / PSD檔案，並確保：預留3mm出血位、使用CMYK色彩模式、文字已轉曲（Outlined）。更多詳情請參閱幫助中心的排版及色彩指引。', category: '文件' },
    { q: '什麼情況下可以退貨？', a: '如印刷品存在明顯品質問題（非客戶稿件錯誤），請於收貨後3個工作天內聯絡客服。客戶自來稿件，當顏色及文字完全正確的話，不能以其他理由退貨。', category: '退換' },
  ],
  en: [
    { q: 'What is the minimum order quantity?', a: 'Most products have a minimum order of 100 pieces. Business cards start from 50 boxes. Check each product page or contact us for details.', category: 'Ordering' },
    { q: 'How long does delivery take?', a: 'Standard delivery is 3-5 business days. Rush orders can be same-day with additional fees. Actual time depends on product type and quantity.', category: 'Ordering' },
    { q: 'What payment methods do you accept?', a: 'We accept WeChat Pay and Alipay. After payment, please email the proof (screenshot) to zprintpro@outlook.com with your order number for verification.', category: 'Payment' },
    { q: 'Why do I need to email after payment?', a: 'Because both WeChat and Alipay QR codes are mainland China accounts, the system does not automatically notify us. You must send an email with payment proof and order number so our team can confirm receipt within 1 business day.', category: 'Payment' },
    { q: 'Is free shipping available?', a: 'Free shipping for orders over HK$500 (Hong Kong area). Orders under $500 have a $50 delivery fee. International orders enjoy free shipping via DHL/FedEx.', category: 'Shipping' },
    { q: 'What are the delivery hours?', a: 'Delivery is generally Mon-Fri 9:00-18:00. No delivery on weekends or public holidays. Remote areas may require additional time.', category: 'Shipping' },
    { q: 'How do you ensure print quality?', a: 'We use Heidelberg printing presses with professional color management. Every batch is QC inspected before shipping. For strict color requirements, request a physical proof (extra charges apply).', category: 'Quality' },
    { q: 'Can I customize sizes?', a: 'Absolutely. We support fully custom sizes, shapes, and materials. Contact our sales team for a quote.', category: 'Product' },
    { q: 'Do you offer design services?', a: 'Yes, we offer professional design services. Simple modifications are free; full design services are quoted separately. Artwork created by us remains our property; JPG proofs only.', category: 'Design' },
    { q: 'Can I cancel or modify my order?', a: 'Free modifications before proof approval. Changes after printing starts may incur additional fees. Once printing begins, orders cannot be cancelled.', category: 'Ordering' },
    { q: 'What are the file format requirements?', a: 'Please upload PDF / AI / PSD files with 3mm bleed, CMYK color mode, and text converted to outlines. See our Help Center for detailed typography and color guidelines.', category: 'Files' },
    { q: 'When can I return items?', a: 'If there are obvious quality issues (not due to customer artwork errors), please contact us within 3 business days of receipt. For customer-supplied artwork, if colors and text are correct, returns will not be accepted for other reasons.', category: 'Returns' },
  ],
  ja: [
    { q: '最低発注数は？', a: 'ほとんどの製品は最低100個から。名刺は最低50箱から。詳細は各製品ページをご確認いただくか、お問い合わせください。', category: '注文' },
    { q: '納期はどのくらい？', a: '標準納期は3〜5営業日。急ぎの場合は当日配送も可能（追加料金がかかります）。実際の納期は製品タイプと数量によります。', category: '注文' },
    { q: '支払い方法は？', a: 'WeChat Pay、Alipayをご利用いただけます。お支払い後、領収書（スクリーンショット）を zprintpro@outlook.com までお送りください。', category: '支払い' },
    { q: '支払い後にメール確認が必要な理由は？', a: 'WeChatとAlipayのQRコードはいずれも中国本土のアカウントのため、自動的に通知されません。領収書と注文番号を添付したメールを送信していただくと、1営業日以内に入金確認いたします。', category: '支払い' },
    { q: '送料無料はありますか？', a: 'HK$500以上のご注文で香港地区送料無料。$500未満は$50の送料がかかります。海外注文はDHL/FedExで国際送料無料です。', category: '配送' },
    { q: '配送時間帯は？', a: '月曜〜金曜 9:00-18:00です。土日・祝日は配送いたしません。遠隔地は追加時間がかかる場合があります。', category: '配送' },
    { q: '印刷品質をどう保証しますか？', a: 'ハイデルベルグ印刷機とプロのカラーマネジメントを使用。出荷前に全ロットQC検査を実施。色合いに厳密なご要望がある場合は実物打ち出しをご依頼ください（別途料金）。', category: '品質' },
    { q: 'サイズのカスタマイズは可能？', a: 'はい、完全カスタムサイズ・形状・材質に対応しています。お見積もりは営業チームまで。', category: '製品' },
    { q: 'デザインサービスはありますか？', a: 'はい、プロのデザインサービスを提供しています。簡単な修正は無料、完全デザインは別途見積もり。当社で作成した原稿の所有権は当社に帰属し、JPG校正データのみ提供します。', category: 'デザイン' },
    { q: '注文のキャンセル・変更は可能？', a: '校正承認前は無料で変更可能。印刷開始後の変更は追加料金が発生する場合があります。印刷開始後のキャンセルはお受けできません。', category: '注文' },
    { q: 'ファイルのフォーマット要件は？', a: 'PDF / AI / PSDファイルをアップロードしてください。3mmの裁ち落とし、CMYKカラーモード、文字の輪郭化が必要です。詳細はヘルプセンターをご覧ください。', category: 'ファイル' },
    { q: 'どのような場合に返品できますか？', a: '明らかな品質問題（お客様の原稿ミスではない場合）がある場合、受取後3営業日以内にご連絡ください。お客様の原稿の場合、色と文字が正しければ他の理由での返品はお受けできません。', category: '返品' },
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
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">{t.h1}</h1>
          <p className="text-gray-500 text-lg">{t.subtitle}</p>
        </div>
        <FaqClient items={items} t={t} />
      </div>
    </main>
  );
}
