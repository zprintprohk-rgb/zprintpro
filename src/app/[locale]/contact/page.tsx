import { Metadata } from "next";
import Link from "next/link";
import { Locale, siteConfig, generateBusinessJsonLd, generateLocalBusinessSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { generateContactPageJsonLd } from "@/lib/seo/schema-extensions";
import { ContactFormWrapper } from "./ContactFormWrapper";
import { generateWhatsAppLink } from "@/lib/whatsapp";

interface ContactPageProps {
  params: { locale: string };
}

const translations = {
  "zh-hk": {
    title: "聯絡我們 · 免費獲取報價 | 智印雲 ZprintPro",
    description: "聯絡智印雲專業印刷團隊，填寫表單獲取免費報價。電話：+86 198 8085 1334 / WhatsApp +8619880851334 (24小時即時回覆)",
    h1: "聯絡我們 · 免費獲取報價",
    subtitle: "填寫表單或 WhatsApp 聯繫，24小時內回覆",
    quoteTitle: "免費獲取報價",
    quoteSubtitle: "1分鐘提交需求，專屬顧問極速回覆",
    promiseSecure: "資料嚴格保密",
    promiseNoSpam: "無騷擾跟進",
    promiseVolume: "量大價優",
    name: "唐先生",
    role: "銷售經理｜智印雲",
    phone: "電話 / WhatsApp",
    email: "電郵",
    website: "官網",
    addressLabel: "辦公室地址",
    addressValue: "香港九龍新蒲崗大有街3號萬廣大廈15樓C室",
    cta: "立即 WhatsApp 查詢",
    qrCaption: "掃碼即聊",
    online: "在線",
    responseTime: "平均回覆 < 5 分鐘",
    quickContact: "快速聯絡",
    officeHours: "辦公時間",
    officeHoursValue: "週一至週五 09:00 - 18:00",
    whatsappLabel: "WhatsApp",
    trustTitle: "客戶信賴",
    trustServed: "已服務 500+ 企業",
    trustYears: "10+ 年印刷經驗",
    trustDelivery: "72h 全球配送",
    trustCountries: "覆蓋 30+ 國家",
    viewOnMap: "在 Google Maps 查看",
    getDirections: "規劃路線",
    visitUs: "蒞臨參觀",
    features: ["24小時內回覆", "免費設計諮詢", "專屬客戶經理", "量大價優"],
    orScan: "或掃碼",
    altPayTitle: "如不便在線付款?",
    altPayDesc: "海外客戶可使用支付寶閃速收款跨境匯款,9 大跨境匯款 APP 支援",
    altPayCta: "查看所有付款方式",
    altPayQrCaption: "唐运提 (智印雲法人) 官方收款碼",
  },
  en: {
    title: "Free Custom Printing Quote · 30s Response | ZprintPro USA / UK / AU",
    description: "Get a free custom printing quote in 30 seconds. Stickers, packaging boxes, business cards, books, posters. 72h global delivery to US / UK / AU / CA. WhatsApp +1-style support. No setup fees.",
    h1: "Free Custom Printing Quote",
    subtitle: "Fill the form or WhatsApp us, reply within 24h",
    quoteTitle: "Get Your Free Quote",
    quoteSubtitle: "Submit in 1 minute, personal advisor responds fast",
    promiseSecure: "Data strictly confidential",
    promiseNoSpam: "No spam follow-up",
    promiseVolume: "Volume discounts",
    name: "Mr. Tang",
    role: "Sales Manager | ZprintPro",
    phone: "Phone / WhatsApp",
    email: "Email",
    website: "Website",
    addressLabel: "Office Address",
    addressValue: "No.1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen, Guangdong 518111 · Shenzhen Cailong Printing & Packaging Co., Ltd.",
    cta: "Chat on WhatsApp Now",
    qrCaption: "Scan to chat",
    online: "Online",
    responseTime: "Avg reply < 5 min",
    quickContact: "Quick Contact",
    officeHours: "Office Hours",
    officeHoursValue: "Mon - Fri 09:00 - 18:00",
    whatsappLabel: "WhatsApp",
    trustTitle: "Trusted by Clients",
    trustServed: "500+ companies served",
    trustYears: "10+ years printing",
    trustDelivery: "72h global delivery",
    trustCountries: "30+ countries covered",
    viewOnMap: "View on Google Maps",
    getDirections: "Get Directions",
    visitUs: "Visit Us",
    features: ["24h response", "Free design consult", "Dedicated manager", "Volume pricing"],
    orScan: "or scan",
    altPayTitle: "Can't pay online easily?",
    altPayDesc: "Overseas clients can use Alipay Flash Collect for cross-border remittance — 9 providers supported.",
    altPayCta: "See all payment methods",
    altPayQrCaption: "Official QR by Mr. Tang (founder)",
  },
  ja: {
    title: "無料お見積もり · 30秒返信 | 智印雲 ZprintPro",
    description: "印刷の無料お見積もりはZprintProへ。ステッカー、包装箱、名刺、書籍、ポスター。72時間グローバル配送。WhatsAppで今すぐお問い合わせください。",
    h1: "無料お見積もり",
    subtitle: "フォームまたはWhatsAppでお問い合わせ、24時間以内に返信",
    quoteTitle: "無料お見積もり",
    quoteSubtitle: "1分で送信、専属アドバイザーが迅速に対応",
    promiseSecure: "データ厳格保密",
    promiseNoSpam: "迷惑フォローアップなし",
    promiseVolume: "大量割引",
    name: "唐 様",
    role: "セールスマネージャー｜ZprintPro",
    phone: "電話 / WhatsApp",
    email: "メール",
    website: "ウェブサイト",
    addressLabel: "オフィス住所",
    addressValue: "広東省深圳市龍崗区平湖街道嘉城路1号（518111）· 深圳市彩龍印刷包装有限公司",
    cta: "WhatsAppで相談",
    qrCaption: "スキャンしてチャット",
    online: "オンライン",
    responseTime: "平均返信 < 5分",
    quickContact: "クイック連絡",
    officeHours: "営業時間",
    officeHoursValue: "月〜金 09:00 - 18:00",
    whatsappLabel: "WhatsApp",
    trustTitle: "お客様の信頼",
    trustServed: "500社以上にサービス提供",
    trustYears: "10年以上の印刷経験",
    trustDelivery: "72時間グローバル配送",
    trustCountries: "30カ国以上対応",
    viewOnMap: "Google Mapsで見る",
    getDirections: "ルート案内",
    visitUs: "ご来社",
    features: ["24時間以内返信", "無料デザイン相談", "専属マネージャー", "大量割引"],
    orScan: "またはスキャン",
    altPayTitle: "オンライン決済が不便ですか？",
    altPayDesc: "海外のお客様は支付宝フラッシュ送金でクロスボーダー送金可能 — 9 機関対応。",
    altPayCta: "すべてのお支払い方法を見る",
    altPayQrCaption: "唐运提 (創業者) 公式 QR",
  },
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const t = translations[params.locale as keyof typeof translations];
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `${siteConfig.url}/${params.locale}/contact/`,
      languages: {
        "zh-HK": `${siteConfig.url}/zh-hk/contact/`,
        "en": `${siteConfig.url}/en/contact/`,
        "ja": `${siteConfig.url}/ja/contact/`,
        "x-default": `${siteConfig.url}/zh-hk/contact/`,
      },
    },
  };
}

export default function ContactPage({ params }: ContactPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];
  const businessJsonLd = generateBusinessJsonLd(locale);
  const contactPageUrl = `${siteConfig.url}/${locale}/contact/`;
  const contactPageJsonLd = generateContactPageJsonLd(locale, contactPageUrl, t.description);
  const localBusinessJsonLd = generateLocalBusinessSchema(locale);
  const localePrefix = `/${locale}`;

  return (
    <main className="min-h-screen bg-gray-50 py-12 md:py-16">
      {/* 2026-06-28 fix(contact-500): next 14.2 + Edge Runtime 在连续 3 个独立 <JsonLd> + dangerouslySetInnerHTML 时 streaming 末尾抛错。
          改用 home 同款 1 个 <JsonLd data={[array]}> 形式（home 200 ✅）。 */}
      <JsonLd data={[businessJsonLd, contactPageJsonLd, localBusinessJsonLd]} />
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#333333] mb-3">{t.h1}</h1>
          <p className="text-gray-500 text-lg">{t.subtitle}</p>
        </div>

        {/* Trust Bar - 4 metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 md:mb-10">
          {[
            { value: t.trustServed, icon: "🏢" },
            { value: t.trustYears, icon: "📅" },
            { value: t.trustDelivery, icon: "🚀" },
            { value: t.trustCountries, icon: "🌍" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-sm font-semibold text-[#333333]">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Quote Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-2">{t.quoteTitle}</h2>
                <p className="text-slate-500">{t.quoteSubtitle}</p>
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 mt-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden="true">🔒</span>
                    <span>{t.promiseSecure}</span>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden="true">💬</span>
                    <span>{t.promiseNoSpam}</span>
                  </span>
                  <span className="text-slate-300">|</span>
                  <span className="inline-flex items-center gap-1.5">
                    <span aria-hidden="true">🎁</span>
                    <span>{t.promiseVolume}</span>
                  </span>
                </div>
              </div>
              <ContactFormWrapper locale={locale} />
            </div>
          </div>

          {/* RIGHT: Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Person Card */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
              <div className="h-20 bg-gradient-to-r from-[#2873F5] via-[#4F46E5] to-[#7C3AED] relative">
                <div className="absolute -bottom-8 left-6 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-white shadow-lg">
                  {t.name.charAt(0)}
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-2 border-white"></span>
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1">
                  <span className="text-white text-[11px] font-medium">{t.quickContact}</span>
                </div>
              </div>

              <div className="px-6 pt-12 pb-6">
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-[#333333] flex items-center gap-2">
                    {t.name}
                    <span className="text-[10px] font-semibold bg-blue-50 text-[#2873F5] px-2 py-0.5 rounded-full uppercase tracking-wide">verified</span>
                  </h2>
                  <p className="text-gray-500 text-sm mt-0.5">{t.role}</p>
                  <p className="text-xs text-emerald-500 font-medium mt-1.5 flex items-center gap-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    {t.online}
                    <span className="text-gray-300 mx-0.5">·</span>
                    {t.responseTime}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {t.features.map((f) => (
                    <span key={f} className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-xs font-medium">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="space-y-2.5">
                  <a href="tel:+8619880851334" className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50/50 to-transparent hover:from-blue-50 hover:to-blue-50/50 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-[#2873F5] flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-200">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-400">{t.phone}</div>
                      <div className="text-sm font-semibold text-[#333333] group-hover:text-[#2873F5] transition-colors">+86 198 8085 1334</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-[#2873F5] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>

                  <a href="mailto:zprintpro@outlook.com" className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-orange-50/50 to-transparent hover:from-orange-50 hover:to-orange-50/50 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-[#F87314] flex items-center justify-center flex-shrink-0 shadow-sm shadow-orange-200">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-400">{t.email}</div>
                      <div className="text-sm font-semibold text-[#333333] group-hover:text-[#F87314] transition-colors">zprintpro@outlook.com</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-[#F87314] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>

                {/* WhatsApp CTA + QR */}
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <a
                    href={generateWhatsAppLink(locale, { source: "contact" })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-200 group"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    {t.cta}
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </a>

                  {/* QR Code - enlarged to 140x140 */}
                  <div className="flex items-center gap-4 mt-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="relative w-[140px] h-[140px] bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center shadow-sm group/qr flex-shrink-0">
                      <img src="/whatsapp-qr.jpg" alt="WhatsApp QR Code | ZprintPro" width="132" height="132" className="object-contain transition-transform duration-300 group-hover/qr:scale-105" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#333333] mb-1">{t.orScan}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2 flex-shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        {t.qrCaption} · {t.responseTime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Card - simplified */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
              <div className="p-5">
                <h3 className="text-base font-bold text-[#333333] mb-1 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#2873F5]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                  {t.visitUs}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-1">{t.addressValue}</p>
                <p className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {t.officeHoursValue}
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=No.1+Jiacheng+Road+Pinghu+Street+Longgang+District+Shenzhen+Guangdong+518111"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#2873F5] hover:bg-[#1E5BD6] text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                    {t.viewOnMap}
                  </a>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=22.5431,114.0579"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border-2 border-[#2873F5] text-[#2873F5] hover:bg-blue-50 text-sm font-medium rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                    {t.getDirections}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2026-07-03 Cross-border remittance payment block
            - For overseas clients unable to pay via bank wire / WeChat / Alipay
            - Static QR reference; not an inline checkout payment */}
        <section className="mt-8 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white border border-indigo-200 rounded-2xl overflow-hidden flex items-center justify-center shadow-md flex-shrink-0">
              <img
                src={locale === 'zh-hk' ? '/images/payment/shansu-collect-zh-hk.png' : '/images/payment/shansu-collect-en.png'}
                alt="Alipay Flash Collect QR"
                width={140}
                height={140}
                className="object-contain w-full h-full"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
                <span>Alipay Flash Collect</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-[#333333] mb-2">{t.altPayTitle}</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">{t.altPayDesc}</p>
              <p className="text-xs text-gray-500 mb-4">{t.altPayQrCaption}</p>
              <Link
                href={`${localePrefix}/payment-methods/`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2873F5] hover:bg-[#1E5BD6] text-white text-sm font-semibold rounded-lg transition-colors"
              >
                {t.altPayCta}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}