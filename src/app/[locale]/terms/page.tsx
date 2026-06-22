import { Metadata } from 'next';
import { Locale, siteConfig } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { generateTermsPageJsonLd } from '@/lib/seo/schema-extensions';

interface TermsPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '服務條款 | 智印雲 ZprintPro',
    description: '智印雲服務條款與細則。',
    h1: '服務條款',
    lastUpdated: '最後更新日期',
    lastUpdatedDate: '2026年6月18日',
    intro: '歡迎使用智印雲 ZprintPro 服務。當您瀏覽本網站、下單購買或使用本網站任何服務時，即代表您同意以下條款。請仔細閱讀。',
    sections: [
      {
        title: '1. 服務範圍',
        body: '智印雲 ZprintPro 提供跨境印刷服務，包括貼紙、紙袋、包裝盒、海報、宣傳單張等度身訂製印刷產品。具體產品規格、價格及交貨時間以各商品頁面標示為準。',
      },
      {
        title: '2. 訂單與付款',
        body: '所有訂單須於確認稿件及完成付款後方為正式成立。我們接受信用卡（VISA / Mastercard / JCB / AMEX）、Alipay、WeChat Pay、PayPal 及銀行轉帳（預付）。',
      },
      {
        title: '3. 校稿確認',
        body: '出貨前我們會提供 PDF 色彩校稿供您確認。校稿一經確認，即代表您同意該稿件內容，將進入印刷流程。確認後如需修改，可能產生額外費用。',
      },
      {
        title: '4. 交貨時間',
        body: '校稿確認後 3-7 個工作日完成印刷及出貨，再經 DHL / FedEx 國際速遞配送至目的地。海外配送時間視目的地而定，一般為 2-7 個工作天。',
      },
      {
        title: '5. 退換貨政策',
        body: '度身訂製印刷商品性質上原則上不退換。若到貨時發現破損、污損或與訂單不符，可於收貨 7 日內聯絡我們安排免費重印或全額退款。',
      },
      {
        title: '6. 知識產權',
        body: '您保證所提供之印刷稿件擁有合法之知識產權或已獲授權使用。智印雲 ZprintPro 對因侵犯第三方知識產權而引起之糾紛概不負責。',
      },
      {
        title: '7. 責任限制',
        body: '智印雲 ZprintPro 對因不可抗力（包括但不限於天災、戰爭、疫情、海關扣押、運輸延誤等）造成之延誤或損失，僅負責重印或退款，不承擔其他間接損失。',
      },
      {
        title: '8. 適用法律及爭議解決',
        body: '本條款適用中華人民共和國法律。因本服務引起之爭議，雙方應先友好協商解決；協商不成時，提交深圳市人民法院訴訟解決。',
      },
      {
        title: '9. 條款修改',
        body: '智印雲 ZprintPro 保留隨時修改本條款之權利。修改後將於本頁公布，並標示最後更新日期。',
      },
      {
        title: '10. 聯絡我們',
        body: '如對本服務條款有任何疑問，歡迎電郵至 zprintpro@outlook.com。',
      },
    ],
  },
  en: {
    title: 'Terms of Service | ZprintPro',
    description: 'ZprintPro terms of service.',
    h1: 'Terms of Service',
    lastUpdated: 'Last updated',
    lastUpdatedDate: 'June 18, 2026',
    intro: 'Welcome to ZprintPro. By browsing our site, placing an order, or using any of our services, you agree to the following terms. Please read them carefully.',
    sections: [
      {
        title: '1. Scope of Service',
        body: 'ZprintPro provides cross-border printing services, including custom stickers, paper bags, packaging boxes, posters, flyers, and other made-to-order print products. Specific product specifications, pricing, and delivery times are shown on each product page.',
      },
      {
        title: '2. Orders and Payment',
        body: 'All orders become effective only after artwork confirmation and payment completion. We accept credit cards (VISA / Mastercard / JCB / AMEX), Alipay, WeChat Pay, PayPal, and bank wire transfer (prepayment).',
      },
      {
        title: '3. Proof Approval',
        body: 'A PDF color proof is provided for your approval before shipment. Once approved, the artwork enters the production stage. Modifications after approval may incur additional fees.',
      },
      {
        title: '4. Delivery',
        body: 'Production and shipment complete within 3-7 business days after proof approval, followed by DHL / FedEx international express delivery. International delivery times vary by destination, typically 2-7 business days.',
      },
      {
        title: '5. Returns and Exchanges',
        body: 'Custom-printed products are generally non-returnable. If items arrive damaged, defective, or do not match your order, please contact us within 7 days of receipt for a free reprint or full refund.',
      },
      {
        title: '6. Intellectual Property',
        body: 'You warrant that the artwork you provide is legally owned by you or properly licensed. ZprintPro is not responsible for disputes arising from third-party IP infringement.',
      },
      {
        title: '7. Limitation of Liability',
        body: 'For delays or losses caused by force majeure (including but not limited to natural disasters, war, pandemics, customs holds, and shipping delays), ZprintPro\'s responsibility is limited to reprint or refund; we do not assume other indirect losses.',
      },
      {
        title: '8. Governing Law and Dispute Resolution',
        body: 'These terms are governed by the laws of the People\'s Republic of China. Disputes should first be resolved through friendly negotiation; failing that, they will be submitted to the Shenzhen People\'s Court for litigation.',
      },
      {
        title: '9. Modifications',
        body: 'ZprintPro reserves the right to modify these terms at any time. Updates will be posted on this page with the latest revision date.',
      },
      {
        title: '10. Contact',
        body: 'For any questions about these terms, please email zprintpro@outlook.com.',
      },
    ],
  },
  ja: {
    title: '利用規約 | ZprintPro',
    description: 'ZprintProの利用規約。',
    h1: '利用規約',
    lastUpdated: '最終更新日',
    lastUpdatedDate: '2026年6月18日',
    intro: 'ZprintPro へようこそ。本サイトの閲覧、注文、サービス利用をもって、以下の利用規約に同意したものとみなされます。よくお読みください。',
    sections: [
      {
        title: '1. サービス範囲',
        body: 'ZprintPro は、ステッカー、紙袋、 package、poster、flyer など、オーダーメイド印刷製品の越境印刷サービスを提供します。具体的な仕様、料金、納期は各商品ページに記載の通りです。',
      },
      {
        title: '2. 注文と支払い',
        body: 'すべての注文は、原稿確認と支払い完了後に正式に成立します。クレジットカード（VISA / Mastercard / JCB / AMEX）、Alipay、WeChat Pay、PayPal、銀行振込（前払い）をご利用いただけます。',
      },
      {
        title: '3. 校正確認',
        body: '出荷前に PDF 校正データを提供し、ご確認いただきます。校正確認後の修正は追加料金が発生する場合があります。',
      },
      {
        title: '4. 納期',
        body: '校正確認後 3-7 営業日で印刷・出荷し、DHL / FedEx 国際速達で配送します。海外配送は目的地により異なり、通常 2-7 営業日です。',
      },
      {
        title: '5. 返品・交換',
        body: 'オーダーメイド印刷商品は性質上返品不可。到着時に破損・汚損・注文との相違がある場合のみ、受領後 7 日以内のご連絡で再印刷または全額返金いたします。',
      },
      {
        title: '6. 知的財産権',
        body: 'お客様が提供する印刷原稿について、合法的な知的財産権または使用許諾をお持ちであることを保証していただきます。ZprintPro は第三者知的財産権侵害に起因する紛争について責任を負いません。',
      },
      {
        title: '7. 責任制限',
        body: '不可抗力（天災、戦争、感染症、税関保留、輸送遅延等）による遅延・損失について、ZprintPro の責任は再印刷または返金額に限定され、その他の間接的損失は負いかねます。',
      },
      {
        title: '8. 準拠法及び紛争解決',
        body: '本利用規約は中華人民共和国法に準拠します。本サービスに起因する紛争は、まず友好的協議により解決し、協議が成立しない場合は深圳市人民法院に訴訟を提起するものとします。',
      },
      {
        title: '9. 利用規約の変更',
        body: 'ZprintPro は本利用規約を随時変更する権利を有します。変更後は本ページに掲載し、最終更新日を明記します。',
      },
      {
        title: '10. お問い合わせ',
        body: '本利用規約に関するご質問は zprintpro@outlook.com までお寄せください。',
      },
    ],
  },
};

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = translations[locale];
  return {
    title: t.title,
    description: t.description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/terms/`,
    },
  };
}

export default function TermsPage({ params }: TermsPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];
  // 2026-06-12 Phase B-P1 修复 P1-4: TermsOfService schema
  const termsUrl = `${siteConfig.url}/${locale}/terms/`;
  const termsJsonLd = generateTermsPageJsonLd(locale, termsUrl, t.description);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <JsonLd data={termsJsonLd} />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#333333] mb-8">{t.h1}</h1>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6 text-gray-700">
          <p className="text-sm text-gray-500">
            {t.lastUpdated}: {t.lastUpdatedDate}
          </p>
          <p className="leading-relaxed">{t.intro}</p>
          {t.sections.map((section, idx) => (
            <section key={idx}>
              <h2 className="text-lg font-semibold text-[#333333] mb-2">
                {section.title}
              </h2>
              <p className="leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
