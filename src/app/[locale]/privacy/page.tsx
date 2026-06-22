import { Metadata } from 'next';
import { Locale, siteConfig } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { generatePrivacyPageJsonLd } from '@/lib/seo/schema-extensions';

interface PrivacyPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '隱私政策 | 智印雲 ZprintPro',
    description: '智印雲隱私政策，說明我們如何收集、使用和保護您的個人資料。',
    h1: '隱私政策',
    lastUpdated: '最後更新日期',
    lastUpdatedDate: '2026年6月18日',
    intro: '智印雲 ZprintPro 致力於保護您的個人私隱。本政策說明我們如何收集、使用、儲存及保護您於本網站提供的個人資料。',
    sections: [
      {
        title: '1. 我們收集的資料',
        body: '當您瀏覽本網站、下單購買或聯絡客服時，我們可能會收集以下資料：姓名、聯絡電話、電郵地址、收貨地址、付款相關資料（由付款服務商處理，本網站不保存信用卡資料）、瀏覽器類型、IP 位址及 Cookies 資料。',
      },
      {
        title: '2. 資料使用目的',
        body: '您提供的個人資料將用於：處理訂單及配送、提供客戶服務、發送訂單狀態通知、優化網站體驗、符合法律法規之披露要求。我們絕不會將您的個人資料出售或出租予第三方。',
      },
      {
        title: '3. 資料保存與保護',
        body: '我們採用業界標準之 SSL 加密傳輸及安全儲存機制保護您的個人資料。資料保存期限以業務需要及法律要求為準。',
      },
      {
        title: '4. Cookies 使用',
        body: '本網站使用必要 Cookies 維持登入狀態及購物車功能，並使用分析 Cookies 改善網站體驗。您可於瀏覽器設定中關閉 Cookies，但部分功能可能受影響。',
      },
      {
        title: '5. 您的權利',
        body: '您有權查閱、更正或要求刪除您提供之個人資料。如需行使相關權利，請電郵至 zprintpro@outlook.com。',
      },
      {
        title: '6. 跨境資料傳輸',
        body: '因業務運作需要，您的個人資料可能於中華人民共和國、香港、日本或其他服務所在地之間傳輸及處理。我們將確保傳輸過程符合適用之資料保護法規。',
      },
      {
        title: '7. 政策更新',
        body: '本政策可能不時更新。更新後將於本頁公布，並標示最後更新日期。',
      },
      {
        title: '8. 聯絡我們',
        body: '如對本隱私政策或您的個人資料有任何疑問，歡迎電郵至 zprintpro@outlook.com。',
      },
    ],
  },
  en: {
    title: 'Privacy Policy | ZprintPro',
    description: 'ZprintPro privacy policy explaining how we collect, use, and protect your personal data.',
    h1: 'Privacy Policy',
    lastUpdated: 'Last updated',
    lastUpdatedDate: 'June 18, 2026',
    intro: 'ZprintPro is committed to protecting your privacy. This policy explains how we collect, use, store, and protect your personal data when you use our website.',
    sections: [
      {
        title: '1. Information We Collect',
        body: 'When you browse our website, place an order, or contact customer support, we may collect: name, phone number, email address, shipping address, payment-related data (processed by payment providers; we do not store credit card data), browser type, IP address, and Cookies data.',
      },
      {
        title: '2. How We Use Your Data',
        body: 'Your personal data is used to: process orders and arrange delivery, provide customer service, send order status notifications, improve site experience, and comply with legal disclosure requirements. We will never sell or rent your personal data to third parties.',
      },
      {
        title: '3. Storage and Protection',
        body: 'We use industry-standard SSL encryption and secure storage to protect your personal data. Data is retained for as long as needed for business or legal purposes.',
      },
      {
        title: '4. Cookies',
        body: 'Our site uses essential Cookies to maintain login state and shopping cart functions, and analytics Cookies to improve the site experience. You can disable Cookies in your browser, but some features may be affected.',
      },
      {
        title: '5. Your Rights',
        body: 'You have the right to access, correct, or request deletion of your personal data. To exercise these rights, please email zprintpro@outlook.com.',
      },
      {
        title: '6. Cross-Border Data Transfers',
        body: 'Your personal data may be transferred and processed between China, Hong Kong, Japan, or other service locations to support our operations. We ensure transfers comply with applicable data protection laws.',
      },
      {
        title: '7. Policy Updates',
        body: 'This policy may be updated from time to time. Updates will be posted on this page with the latest revision date.',
      },
      {
        title: '8. Contact',
        body: 'For any questions about this privacy policy or your personal data, please email zprintpro@outlook.com.',
      },
    ],
  },
  ja: {
    title: 'プライバシーポリシー | ZprintPro',
    description: 'ZprintProのプライバシーポリシー。個人情報の収集、使用、保護について説明します。',
    h1: 'プライバシーポリシー',
    lastUpdated: '最終更新日',
    lastUpdatedDate: '2026年6月18日',
    intro: 'ZprintProはお客様の個人情報保護に取り組んでいます。本ポリシーでは、当サイトご利用時に個人情報がどのように収集・使用・保管・保護されるかを説明します。',
    sections: [
      {
        title: '1. 収集する情報',
        body: '当サイトの閲覧、注文、カスタマーサポートへのご連絡時に、以下の情報を収集する場合があります：氏名、電話番号、メールアドレス、送付先住所、決済関連情報（決済サービス提供者により処理され、当サイトはクレジットカード情報を保存しません）、ブラウザの種類、IPアドレス、Cookie情報。',
      },
      {
        title: '2. 情報の利用目的',
        body: 'お客様の個人情報は、注文処理・配送、カスタマーサービス提供、注文状況の通知送信、サイト体験の改善、法的開示要件への遵守のために使用されます。第三者への販売・賃貸は一切行いません。',
      },
      {
        title: '3. 保管と保護',
        body: '業界標準のSSL暗号化と安全な保管メカニズムで個人情報を保護します。保管期間は業務および法令上の必要性に基づきます。',
      },
      {
        title: '4. Cookieの使用',
        body: '本サイトはログイン状態とカート機能を維持するために必須Cookieを、サイト体験改善のために分析Cookieを使用します。ブラウザ設定でCookieを無効にすることも可能ですが、一部機能が影響を受ける場合があります。',
      },
      {
        title: '5. お客様の権利',
        body: 'お客様は、ご提供の個人情報の閲覧、訂正、削除を要求する権利を有します。権利行使は zprintpro@outlook.com までご連絡ください。',
      },
      {
        title: '6. 越境データ転送',
        body: '業務運営上、お客様の個人情報が中華人民共和国、香港、日本、その他のサービス拠点間で転送・処理される場合があります。適用されるデータ保護法令に準拠します。',
      },
      {
        title: '7. ポリシーの更新',
        body: '本ポリシーは随時更新される場合があります。更新は本ページに掲載し、最終更新日を明記します。',
      },
      {
        title: '8. お問い合わせ',
        body: '本プライバシーポリシーや個人情報に関するお問い合わせは、zprintpro@outlook.com までお寄せください。',
      },
    ],
  },
};

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = translations[locale];
  return {
    title: t.title,
    description: t.description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/privacy/`,
    },
  };
}

export default function PrivacyPage({ params }: PrivacyPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];
  // 2026-06-12 Phase B-P1 修复 P1-4: PrivacyPolicy schema
  const privacyUrl = `${siteConfig.url}/${locale}/privacy/`;
  const privacyJsonLd = generatePrivacyPageJsonLd(locale, privacyUrl, t.description);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <JsonLd data={privacyJsonLd} />
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
