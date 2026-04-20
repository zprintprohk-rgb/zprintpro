import { Metadata } from 'next';
import { Locale, siteConfig, generateBusinessJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

interface ContactPageProps {
  params: { locale: string };
}

const translations = {
  'zh-hk': {
    title: '聯絡我們 | 智印港 ZprintPro',
    description: '聯絡智印港專業印刷團隊，獲取免費報價和印刷建議。電話/WhatsApp: +86 181 2638 0255',
    h1: '聯絡我們',
    subtitle: '智印港專業團隊隨時為您服務',
    name: '唐先生',
    role: '銷售經理｜智印港',
    phone: '電話 / WhatsApp',
    email: '電郵',
    website: '官網',
    hours: '營業時間',
    hoursValue: '星期一至六 09:00 - 18:00',
    addressLabel: '地址',
    addressValue: '香港觀塘成業街16號怡生工業中心',
    mapTitle: '我們的位置',
    cta: '立即 WhatsApp 查詢',
  },
  en: {
    title: 'Contact Us | ZprintPro',
    description: 'Contact ZprintPro professional printing team for free quotes and advice. Phone/WhatsApp: +86 181 2638 0255',
    h1: 'Contact Us',
    subtitle: 'ZprintPro team is ready to assist you',
    name: 'Mr. Tang',
    role: 'Sales Manager | ZprintPro',
    phone: 'Phone / WhatsApp',
    email: 'Email',
    website: 'Website',
    hours: 'Business Hours',
    hoursValue: 'Mon-Sat 09:00 - 18:00',
    addressLabel: 'Address',
    addressValue: '16 Shing Yip Street, Kwun Tong, Kowloon, Hong Kong',
    mapTitle: 'Our Location',
    cta: 'WhatsApp Us Now',
  },
  ja: {
    title: 'お問い合わせ | ZprintPro',
    description: 'ZprintProのプロ印刷チームにお問い合わせください。電話/WhatsApp: +86 181 2638 0255',
    h1: 'お問い合わせ',
    subtitle: 'ZprintProチームがお待ちしております',
    name: 'タン氏',
    role: '営業マネージャー | ZprintPro',
    phone: '電話 / WhatsApp',
    email: 'メール',
    website: '公式サイト',
    hours: '営業時間',
    hoursValue: '月曜〜土曜 09:00 - 18:00',
    addressLabel: '住所',
    addressValue: '香港観塘成業街16号怡生工業中心',
    mapTitle: 'アクセス',
    cta: '今すぐWhatsAppで問い合わせ',
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
        'zh-Hant-HK': `${siteConfig.url}/contact/`,
        'en': `${siteConfig.url}/en/contact/`,
        'ja-JP': `${siteConfig.url}/ja/contact/`,
        'x-default': `${siteConfig.url}/en/contact/`,
      },
    },
  };
}

export default function ContactPage({ params }: ContactPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];
  const businessJsonLd = generateBusinessJsonLd(locale);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <JsonLd data={businessJsonLd} />
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">{t.h1}</h1>
          <p className="text-gray-500 text-lg">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#2873F5] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {t.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#333333]">{t.name}</h2>
                <p className="text-gray-500">{t.role}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-gray-400 font-medium w-24 shrink-0">{t.phone}</span>
                <a href="tel:+8618126380255" className="text-[#2873F5] hover:underline">+86 181 2638 0255</a>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-400 font-medium w-24 shrink-0">{t.email}</span>
                <a href="mailto:Zprintpro@outlook.com" className="text-[#2873F5] hover:underline">Zprintpro@outlook.com</a>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-400 font-medium w-24 shrink-0">{t.website}</span>
                <a href="https://www.zprintpro.com" target="_blank" rel="noopener noreferrer" className="text-[#2873F5] hover:underline">www.zprintpro.com</a>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-400 font-medium w-24 shrink-0">{t.hours}</span>
                <span className="text-gray-700">{t.hoursValue}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#2873F5] to-[#1E5FD1] rounded-xl p-8 text-white flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-3">{t.cta}</h3>
            <p className="text-white/80 mb-6">WhatsApp: +86 181 2638 0255</p>
            <a
              href="https://wa.me/8618126380255"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#2873F5] font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Address & Map Section */}
        <div className="mt-8 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-[#333333] mb-4">{t.addressLabel}</h3>
            <p className="text-gray-600 leading-relaxed mb-4">{t.addressValue}</p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>📍 {t.hoursValue}</p>
              <p>📞 +86 181 2638 0255</p>
              <p>✉️ zprintpro@outlook.com</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <h3 className="text-xl font-bold text-[#333333] p-6 pb-0">{t.mapTitle}</h3>
            <div className="p-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.4178!2d114.224!3d22.3105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE4JzM3LjgiTiAxMTTCsDEzJzI2LjQiRQ!5e0!3m2!1szh-TW!2shk!4v1700000000000"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ZprintPro Office Location"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
