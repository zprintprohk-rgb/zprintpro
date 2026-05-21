import { Metadata } from 'next';
import { Locale, siteConfig, generateBusinessJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { QuoteForm } from '@/components/quote/QuoteForm';

interface ContactPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '聯絡我們 · 免費獲取報價 | 智印云 ZprintPro',
    description: '聯絡智印云專業印刷團隊，填寫表單獲取免費報價。電話/WhatsApp: +86 181 2638 0255',
    h1: '聯絡我們 · 免費獲取報價',
    subtitle: '填寫表單或 WhatsApp 聯繫，24小時內回覆',
    name: '唐先生',
    role: '銷售經理｜智印云',
    phone: '電話 / WhatsApp',
    email: '電郵',
    website: '官網',
    hours: '營業時間',
    hoursValue: '星期一至六 09:00 - 21:00',
    addressLabel: '地址',
    addressValue: '香港九龍觀塘偉業街182號 成運工業大廈',
    mapTitle: '我們的位置',
    cta: '立即 WhatsApp 查詢',
    quoteTitle: '免費獲取報價',
    quoteSubtitle: '填寫下方表單，我們將在24小時內以郵件回覆專屬報價',
    features: ['24小時內回覆', '免費設計諮詢', '專屬客戶經理', '量大價優'],
  },
  en: {
    title: 'Contact Us · Get a Free Quote | ZprintPro',
    description: 'Contact ZprintPro professional printing team, fill out the form for a free quote. Phone/WhatsApp: +86 181 2638 0255',
    h1: 'Contact Us · Get a Free Quote',
    subtitle: 'Fill out the form or WhatsApp us, reply within 24 hours',
    name: 'Mr. Tang',
    role: 'Sales Manager | ZprintPro',
    phone: 'Phone / WhatsApp',
    email: 'Email',
    website: 'Website',
    hours: 'Business Hours',
    hoursValue: 'Mon-Sat 09:00 - 21:00',
    addressLabel: 'Address',
    addressValue: '182 Wai Yip Street, Kwun Tong, Kowloon, Hong Kong',
    mapTitle: 'Our Location',
    cta: 'WhatsApp Us Now',
    quoteTitle: 'Get a Free Quote',
    quoteSubtitle: 'Fill out the form below and we will send you a customized quote via email within 24 hours',
    features: ['Reply within 24h', 'Free design consultation', 'Dedicated account manager', 'Volume discounts'],
  },
  ja: {
    title: 'お問い合わせ · 無料お見積もり | ZprintPro',
    description: 'ZprintProのプロ印刷チームにお問い合わせください。フォームに記入して無料見積もりを取得。電話/WhatsApp: +86 181 2638 0255',
    h1: 'お問い合わせ · 無料お見積もり',
    subtitle: 'フォーム記入またはWhatsAppで、24時間以内に返信',
    name: 'タン氏',
    role: '営業マネージャー | ZprintPro',
    phone: '電話 / WhatsApp',
    email: 'メール',
    website: '公式サイト',
    hours: '営業時間',
    hoursValue: '月曜〜土曜 09:00 - 21:00',
    addressLabel: '住所',
    addressValue: '香港九龍観塘偉業街182号 成運工業ビル',
    mapTitle: 'アクセス',
    cta: '今すぐWhatsAppで問い合わせ',
    quoteTitle: '無料お見積もり',
    quoteSubtitle: '以下のフォームにご記入いただければ、24時間以内にメールで専用の見積もりをご返信いたします',
    features: ['24時間以内に返信', '無料デザイン相談', '専任担当者', '大口割引'],
  },
};

export async function generateStaticParams() {
  return [{ locale: 'zh-hk' }, { locale: 'en' }, { locale: 'ja' }];
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const t = translations[locale];
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/contact/`,
      languages: {
        'zh-HK': `${siteConfig.url}/contact/`,
        'en': `${siteConfig.url}/en/contact/`,
        'ja': `${siteConfig.url}/ja/contact/`,
        'x-default': `${siteConfig.url}/zh-hk/contact/`,
      },
    },
  };
}

export default function ContactPage({ params }: ContactPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];
  const businessJsonLd = generateBusinessJsonLd(locale);

  return (
    <main className="min-h-screen bg-gray-50 py-12 md:py-16">
      <JsonLd data={businessJsonLd} />
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">{t.h1}</h1>
          <p className="text-gray-500 text-lg">{t.subtitle}</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Quote Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-2">{t.quoteTitle}</h2>
                <p className="text-gray-500">{t.quoteSubtitle}</p>
                <div className="flex flex-wrap justify-center gap-2.5 mt-4">
                  {t.features.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <QuoteForm locale={locale} />
            </div>
          </div>

          {/* RIGHT: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Person */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 bg-[#2873F5] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#333333]">{t.name}</h2>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 font-medium w-20 shrink-0">{t.phone}</span>
                  <a href="tel:+8618126380255" className="text-[#2873F5] hover:underline font-medium">+86 181 2638 0255</a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 font-medium w-20 shrink-0">{t.email}</span>
                  <a href="mailto:Zprintpro@outlook.com" className="text-[#2873F5] hover:underline">Zprintpro@outlook.com</a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 font-medium w-20 shrink-0">{t.website}</span>
                  <a href="https://www.zprintpro.com" target="_blank" rel="noopener noreferrer" className="text-[#2873F5] hover:underline">www.zprintpro.com</a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gray-400 font-medium w-20 shrink-0">{t.hours}</span>
                  <span className="text-gray-700">{t.hoursValue}</span>
                </div>
              </div>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/8618126380255"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {t.cta}
              </a>
            </div>

            {/* Address & Map */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 pb-3">
                <h3 className="text-base font-bold text-[#333333] mb-2">{t.addressLabel}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{t.addressValue}</p>
              </div>
              <div className="px-1 pb-1">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.4178!2d114.224!3d22.3105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE4JzM3LjgiTiAxMTTCsDEzJzI2LjQiRQ!5e0!3m2!1szh-TW!2shk!4v1700000000000"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ZprintPro Office Location"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
