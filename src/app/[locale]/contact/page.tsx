import { Metadata } from 'next';
import { Locale, siteConfig, generateBusinessJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { ContactFormWrapper } from './ContactFormWrapper';
import Image from 'next/image';
import { generateWhatsAppLink } from '@/lib/whatsapp';

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
    addressLabel: '辦公室地址',
    addressValue: '香港九龍觀塘偉業街182號 成運工業大廈',
    mapTitle: '我們的位置',
    cta: '立即 WhatsApp 查詢',
    qrCaption: '掃碼即時查詢',
    quoteTitle: '免費獲取報價',
    quoteSubtitle: '填寫下方表單，我們將在24小時內以郵件回覆專屬報價',
    features: ['24小時內回覆', '免費設計諮詢', '專屬客戶經理', '量大價優'],
    online: '線上客服',
    responseTime: '平均回覆 < 5 分鐘',
    quickContact: '快速聯絡',
    viewOnMap: '在 Google Maps 查看 →',
    getDirections: '規劃路線',
    visitUs: '蒞臨參觀',
    officeHours: '辦公時間',
    officeHoursValue: '週一至週五 09:00 - 18:00',
    whatsappLabel: 'WhatsApp',
  },
  en: {
    title: 'Free Custom Printing Quote · 30s Response | ZprintPro USA / UK / AU',
    description: 'Get a free custom printing quote in 30 seconds. Stickers, packaging boxes, business cards, books, posters. 72h global delivery to US / UK / AU / CA. WhatsApp +1-style support. No setup fees.',
    h1: 'Contact Us · Get a Free Printing Quote',
    subtitle: 'Reply within 30 minutes · 24h global delivery to 50+ countries',
    name: 'Mr. Tang',
    role: 'Sales Manager | ZprintPro',
    phone: 'Phone / WhatsApp',
    email: 'Email',
    website: 'Website',
    addressLabel: 'Office Address',
    addressValue: '182 Wai Yip Street, Kwun Tong, Kowloon, Hong Kong',
    mapTitle: 'Our Location',
    cta: 'WhatsApp Us Now',
    qrCaption: 'Scan to chat instantly',
    quoteTitle: 'Get a Free Quote',
    quoteSubtitle: 'Fill out the form below and we will send you a customized quote via email within 24 hours',
    features: ['Reply within 24h', 'Free design consultation', 'Dedicated account manager', 'Volume discounts'],
    online: 'Online now',
    responseTime: 'Avg. reply < 5 min',
    quickContact: 'Quick Contact',
    viewOnMap: 'View on Google Maps →',
    getDirections: 'Get Directions',
    visitUs: 'Visit Us',
    officeHours: 'Office Hours',
    officeHoursValue: 'Mon - Fri 09:00 - 18:00',
    whatsappLabel: 'WhatsApp',
  },
  ja: {
    title: 'お問い合わせ · 無料お見積もり | ZprintPro',
    description: 'ZprintProのプロ印刷チームにお問い合わせください。フォームに記入して無料見積もりを取得。電話/WhatsApp: +86 181 2638 0255',
    h1: 'お問い合わせ · 無料お見積もり',
    subtitle: 'フォーム記入またはWhatsAppで、24時間以内に返信',
    name: 'タン氏',
    role: '営業マネージャー | ZPrintPro',
    phone: '電話 / WhatsApp',
    email: 'メール',
    website: '公式サイト',
    addressLabel: '事務所住所',
    addressValue: '香港九龍観塘偉業街182号 成運工業ビル',
    mapTitle: 'アクセス',
    cta: '今すぐWhatsAppで問い合わせ',
    qrCaption: 'QRコードで即時問い合わせ',
    quoteTitle: '無料お見積もり',
    quoteSubtitle: '以下のフォームにご記入いただければ、24時間以内にメールで専用の見積もりをご返信いたします',
    features: ['24時間以内に返信', '無料デザイン相談', '専任担当者', '大口割引'],
    online: 'オンライン',
    responseTime: '平均返信 < 5 分',
    quickContact: 'クイック連絡先',
    viewOnMap: 'Google マップで見る →',
    getDirections: 'ルート案内',
    visitUs: 'ご来社',
    officeHours: '営業時間',
    officeHoursValue: '月〜金 09:00 - 18:00',
    whatsappLabel: 'WhatsApp',
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
              <ContactFormWrapper locale={locale} />
            </div>
          </div>

          {/* RIGHT: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Person Card (2026-06-08 美化升级) */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
              {/* 顶部品牌色 banner */}
              <div className="h-20 bg-gradient-to-r from-[#2873F5] via-[#4F46E5] to-[#7C3AED] relative">
                <div className="absolute -bottom-6 left-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F87314] to-[#EA580C] flex items-center justify-center text-white text-2xl font-bold ring-4 ring-white shadow-lg">
                  {t.name.charAt(0)}
                </div>
                {/* 在线状态绿点 */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </span>
                  <span className="text-white text-[11px] font-medium">{t.online}</span>
                </div>
              </div>

              <div className="px-6 pt-9 pb-6">
                {/* 姓名 + 角色 */}
                <div className="mb-5">
                  <h2 className="text-xl font-bold text-[#333333] flex items-center gap-2">
                    {t.name}
                    <span className="text-[10px] font-semibold bg-blue-50 text-[#2873F5] px-2 py-0.5 rounded-full uppercase tracking-wide">verified</span>
                  </h2>
                  <p className="text-gray-500 text-sm mt-0.5">{t.role}</p>
                  <p className="text-xs text-green-600 font-medium mt-1.5 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    {t.responseTime}
                  </p>
                </div>

                {/* 联系方式 3 列 (icon 彩色方块 + label + value) */}
                <div className="space-y-2.5">
                  {/* Phone */}
                  <a href="tel:+8618126380255" className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50/50 to-transparent hover:from-blue-50 hover:to-blue-50/50 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-[#2873F5] flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-200">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{t.phone}</div>
                      <div className="text-sm font-semibold text-[#333333] group-hover:text-[#2873F5] transition-colors">+86 181 2638 0255</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-[#2873F5] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                  </a>

                  {/* Email */}
                  <a href="mailto:Zprintpro@outlook.com" className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-orange-50/50 to-transparent hover:from-orange-50 hover:to-orange-50/50 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-[#F87314] flex items-center justify-center flex-shrink-0 shadow-sm shadow-orange-200">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{t.email}</div>
                      <div className="text-sm font-semibold text-[#333333] group-hover:text-[#F87314] transition-colors truncate">Zprintpro@outlook.com</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-[#F87314] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                  </a>

                  {/* Website */}
                  <a href="https://www.zprintpro.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50/50 to-transparent hover:from-purple-50 hover:to-purple-50/50 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-[#7C3AED] flex items-center justify-center flex-shrink-0 shadow-sm shadow-purple-200">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{t.website}</div>
                      <div className="text-sm font-semibold text-[#333333] group-hover:text-[#7C3AED] transition-colors truncate">www.zprintpro.com</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-[#7C3AED] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  </a>
                </div>

                {/* WhatsApp CTA 按钮 (更醒目) */}
                <a
                  href={generateWhatsAppLink(locale, { source: 'contact' })}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#25D366] via-[#20BD5C] to-[#128C7E] text-white font-semibold py-3.5 px-4 rounded-xl hover:shadow-lg hover:shadow-green-500/30 transition-all group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  {t.cta}
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/></svg>
                </a>

                {/* WhatsApp 二维码 (精致边框) */}
                <div className="mt-5 flex flex-col items-center gap-2 pt-5 border-t border-gray-100">
                  <div className="relative w-[128px] h-[128px] bg-white border-2 border-gray-100 rounded-2xl overflow-hidden flex items-center justify-center shadow-md">
                    <Image
                      src="/whatsapp-qr.jpg"
                      alt="WhatsApp QR Code | ZprintPro"
                      width={120}
                      height={120}
                      className="object-contain"
                      loading="lazy"
                    />
                    {/* 4 角装饰 */}
                    <span className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#25D366] rounded-tl-md"></span>
                    <span className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#25D366] rounded-tr-md"></span>
                    <span className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#25D366] rounded-bl-md"></span>
                    <span className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#25D366] rounded-br-md"></span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">{t.qrCaption}</p>
                </div>
              </div>
            </div>

            {/* Address & Map Card (2026-06-08 升级: 静态地图 SVG + Google Maps 跳转) */}
            {/* 之前: OpenStreetMap iframe (因 x-frame-options: DENY + frame-src CSP 限制 + OSM 域 fetch failed) */}
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
              {/* 地图区域 (静态 SVG 地图 + 红点 marker) */}
              <div className="relative h-[220px] bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 overflow-hidden">
                {/* 模拟地图背景: 街道网格 + 河流 + 街区 */}
                <svg viewBox="0 0 600 220" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                  {/* 河流 (维多利亚港简化) */}
                  <path d="M0,140 Q150,120 300,150 T600,160" stroke="#93C5FD" strokeWidth="18" fill="none" opacity="0.6"/>
                  <path d="M0,140 Q150,120 300,150 T600,160" stroke="#60A5FA" strokeWidth="2" fill="none" opacity="0.4"/>
                  {/* 主街道 (横) */}
                  <line x1="0" y1="60" x2="600" y2="50" stroke="#D1D5DB" strokeWidth="3" opacity="0.5"/>
                  <line x1="0" y1="100" x2="600" y2="95" stroke="#D1D5DB" strokeWidth="2" opacity="0.4"/>
                  <line x1="0" y1="180" x2="600" y2="190" stroke="#D1D5DB" strokeWidth="2" opacity="0.4"/>
                  {/* 主街道 (竖) */}
                  <line x1="150" y1="0" x2="160" y2="220" stroke="#D1D5DB" strokeWidth="3" opacity="0.5"/>
                  <line x1="350" y1="0" x2="340" y2="220" stroke="#D1D5DB" strokeWidth="2" opacity="0.4"/>
                  <line x1="480" y1="0" x2="490" y2="220" stroke="#D1D5DB" strokeWidth="2" opacity="0.4"/>
                  {/* 街区色块 */}
                  <rect x="50" y="20" width="80" height="30" fill="#FEF3C7" opacity="0.5" rx="2"/>
                  <rect x="200" y="20" width="100" height="30" fill="#D1FAE5" opacity="0.5" rx="2"/>
                  <rect x="50" y="160" width="80" height="40" fill="#FCE7F3" opacity="0.5" rx="2"/>
                  <rect x="200" y="160" width="100" height="40" fill="#E0E7FF" opacity="0.5" rx="2"/>
                  <rect x="380" y="170" width="90" height="30" fill="#FEF3C7" opacity="0.5" rx="2"/>
                  {/* 标签 */}
                  <text x="200" y="40" fontSize="9" fill="#6B7280" opacity="0.6">觀塘</text>
                  <text x="50" y="190" fontSize="9" fill="#6B7280" opacity="0.6">九龍灣</text>
                  <text x="380" y="195" fontSize="9" fill="#6B7280" opacity="0.6">牛頭角</text>
                  {/* 中心点 (公司位置) - 红色 pulse 圆 */}
                  <circle cx="340" cy="100" r="20" fill="#EF4444" opacity="0.2">
                    <animate attributeName="r" values="20;30;20" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="340" cy="100" r="8" fill="#EF4444"/>
                  <circle cx="340" cy="100" r="4" fill="#fff"/>
                  {/* 工厂图标 */}
                  <g transform="translate(326, 88)">
                    <rect x="0" y="6" width="28" height="16" fill="#fff" stroke="#333" strokeWidth="1.2" rx="1"/>
                    <path d="M0,6 L0,2 L4,2 L4,6 M8,6 L8,2 L12,2 L12,6 M16,6 L16,2 L20,2 L20,6" fill="#fff" stroke="#333" strokeWidth="1.2"/>
                    <rect x="11" y="14" width="6" height="8" fill="#333"/>
                  </g>
                </svg>
                {/* 顶部 "Live Map" 标签 */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span className="text-[11px] font-semibold text-gray-700">Kwun Tong</span>
                </div>
                {/* 右上角坐标 */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1 text-[10px] font-mono text-gray-500 shadow-sm">
                  22.3115°N · 114.2240°E
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-base font-bold text-[#333333] mb-1 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#2873F5]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                  {t.visitUs}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-1">{t.addressValue}</p>
                <p className="text-xs text-gray-500 mb-4 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  {t.officeHoursValue}
                </p>

                {/* 双按钮: 查看地图 + 规划路线 */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=182+Wai+Yip+Street+Kwun+Tong+Hong+Kong"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#2873F5] hover:bg-[#1E5BD6] text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                    {t.viewOnMap.replace(' →', '')}
                  </a>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=22.3115,114.2240"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border-2 border-[#2873F5] text-[#2873F5] hover:bg-blue-50 text-sm font-medium rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
                    {t.getDirections}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
