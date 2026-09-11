import { Metadata } from "next";
import Link from "next/link";
import { Locale, siteConfig, generateBusinessJsonLd, generateLocalBusinessSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { generateContactPageJsonLd } from "@/lib/seo/schema-extensions";
import { ContactFormWrapper } from "./ContactFormWrapper";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { parseInlineLinks } from "@/utils/parseInlineLinks";
import { MessageCircle, Truck, Zap, Shield, Palette, Mail, Phone, Clock, ChevronDown, MapPin } from "lucide-react";
// E: FAQ 手风琴数据源 — 现有 SLA FAQ (src/data/faq/{locale}.json), 只读不改
import faqZhHk from "@/data/faq/zh-hk.json";
import faqEn from "@/data/faq/en.json";
import faqJa from "@/data/faq/ja.json";

interface ContactPageProps {
  params: { locale: string };
}

const faqByLocale: Record<string, any> = { "zh-hk": faqZhHk, en: faqEn, ja: faqJa };

const translations = {
  "zh-hk": {
    title: "聯絡我們 · 免費獲取報價 | 智印港 ZprintPro",
    description: "聯絡智印港專業印刷團隊，填寫表單獲取免費報價。電話：+86 198 8085 1334 / WhatsApp +8619880851334 (2 小時內回覆)",
    h1: "聯絡我們 · 免費獲取報價",
    // E (v9.2.3 指令原文): 副标「2 小時內回覆 · WhatsApp 即時報價」
    heroSubtitle: "2 小時內回覆 · WhatsApp 即時報價",
    slaLink: "[查看服務承諾 SLA 適用條款](/zh-hk/faq/)",
    quoteTitle: "免費獲取報價",
    quoteSubtitle: "1分鐘提交需求，專屬顧問極速回覆",
    promiseSecure: "資料嚴格保密",
    promiseNoSpam: "無騷擾跟進",
    promiseVolume: "量大價優",
    name: "唐先生",
    role: "銷售經理｜智印港",
    phone: "電話 / WhatsApp",
    email: "電郵",
    website: "官網",
    addressLabel: "辦公室地址",
    addressValue: '香港九龍新蒲崗大有街3號萬廣大廈15樓C室',
    cta: "立即 WhatsApp 查詢",
    emailCta: "電郵查詢",
    qrCaption: "掃碼即聊",
    online: "在線",
    responseTime: "2 小時內專人回覆",
    quickContact: "快速聯絡",
    officeHours: "辦公時間",
    officeHoursValue: "週一至週六 09:00 - 20:00 (GMT+8)",
    whatsapp247: "24/7 WhatsApp 即時回覆",
    support: "中國大陸 24h 響應 · 香港本地客服",
    whatsappLabel: "WhatsApp",
    trustTitle: "客戶信賴",
    trustServed: "已服務 15,000+ 客戶",
    trustYears: "15+ 年印刷經驗",
    trustDelivery: "72h 全球配送",
    trustCountries: "覆蓋 30+ 國家",
    viewOnMap: "在 Google Maps 查看",
    getDirections: "規劃路線",
    visitUs: "蒞臨參觀",
    features: ["2 小時內回覆", "免費設計諮詢", "專屬客戶經理", "量大價優"],
    orScan: "或掃碼",
    altPayTitle: "如不便在線付款?",
    altPayDesc: "海外客戶可使用支付寶閃速收款跨境匯款,9 大跨境匯款 APP 支援",
    altPayCta: "查看所有付款方式",
    altPayQrCaption: "唐运提 (智印港法人) 官方收款碼",
    whatsappBigCta: "WhatsApp 即時詢價",
    trustBand: [
      { title: "免費打樣", sub: "滿意再下單" },
      { title: "即日交貨", sub: "特急24小時" },
      { title: "ISO 9001 認證", sub: "品質管理" },
      { title: "順豐直達", sub: "全港覆蓋" },
    ],
    faqTitle: "常見問題",
    bottomCtaTitle: "免費獲取報價",
    bottomCtaBody: "1分鐘提交需求，WhatsApp 30 秒攞精準報價，2 小時內專人回覆。",
    bottomQuote: "免費報價",
    bottomWhatsApp: "WhatsApp 詢價",
  },
  en: {
    title: "Free Custom Printing Quote · 30s Response | ZprintPro USA / UK / AU",
    description: "Get a free custom printing quote in 30 seconds. Stickers, packaging boxes, paper bags, books, posters. 72h global delivery to US / UK / AU / CA. WhatsApp +1-style support. No setup fees.",
    h1: "Free Custom Printing Quote",
    heroSubtitle: "Reply within 2 hours · Instant WhatsApp quote",
    slaLink: "[View SLA Terms](/en/faq/)",
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
    emailCta: "Email Us Now",
    qrCaption: "Scan to chat",
    online: "Online",
    responseTime: "Reply within 2 hours",
    quickContact: "Quick Contact",
    officeHours: "Office Hours",
    officeHoursValue: "Mon - Sat 09:00 - 18:00 (GMT+8)",
    whatsapp247: "24/7 WhatsApp instant reply",
    support: "China mainland 24h · Hong Kong local support",
    whatsappLabel: "WhatsApp",
    trustTitle: "Trusted by Clients",
    trustServed: "15,000+ customers served",
    trustYears: "15+ years printing",
    trustDelivery: "72h global delivery",
    trustCountries: "30+ countries covered",
    viewOnMap: "View on Google Maps",
    getDirections: "Get Directions",
    visitUs: "Visit Us",
    features: ["2-hour response", "Free design consultation", "Dedicated account manager", "Volume discounts"],
    orScan: "or scan",
    altPayTitle: "Can't pay online easily?",
    altPayDesc: "Overseas clients can use Alipay Flash Collect for cross-border remittance — 9 providers supported.",
    altPayCta: "See all payment methods",
    altPayQrCaption: "Official QR by Mr. Tang (founder)",
    whatsappBigCta: "Chat on WhatsApp",
    trustBand: [
      { title: "Free Sample", sub: "Order with Confidence" },
      { title: "Same-Day Delivery", sub: "Rush 24h Available" },
      { title: "ISO-Certified Quality", sub: "ISO 9001 Manufacturing" },
      { title: "DHL Express Direct", sub: "Nationwide Coverage" },
    ],
    faqTitle: "Frequently Asked Questions",
    bottomCtaTitle: "Get Your Free Quote",
    bottomCtaBody: "Submit in 1 minute. Get a precise quote in 30 seconds on WhatsApp; reply within 2 hours.",
    bottomQuote: "Free Quote",
    bottomWhatsApp: "WhatsApp Us",
  },
  ja: {
    title: "無料お見積もり · 30秒返信 | 智印港 ZprintPro",
    description: "印刷の無料お見積もりはZprintProへ。ステッカー、包装箱、グリーティングカード、書籍、ポスター。72時間グローバル配送。WhatsAppで今すぐお問い合わせください。",
    h1: "無料お見積もり",
    heroSubtitle: "2時間以内に返信 · WhatsApp 即時見積もり",
    slaLink: "[SLA適用条件を見る](/ja/faq/)",
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
    emailCta: "メールで問い合わせ",
    qrCaption: "スキャンしてチャット",
    online: "オンライン",
    responseTime: "2時間以内に専門スタッフが返信",
    quickContact: "クイック連絡",
    officeHours: "営業時間",
    officeHoursValue: "月〜土 09:00 - 18:00 (GMT+8)",
    whatsapp247: "24時間 WhatsApp 即時対応",
    support: "中国本土 24時間対応 · 香港現地サポート",
    whatsappLabel: "WhatsApp",
    trustTitle: "お客様の信頼",
    trustServed: "15,000人以上のお客様にサービス提供",
    trustYears: "15年以上の印刷経験",
    trustDelivery: "72時間グローバル配送",
    trustCountries: "30カ国以上対応",
    viewOnMap: "Google Mapsで見る",
    getDirections: "ルート案内",
    visitUs: "ご来社",
    features: ["2時間以内返信", "無料デザイン相談", "専属マネージャー", "大量割引"],
    orScan: "またはスキャン",
    altPayTitle: "オンライン決済が不便ですか？",
    altPayDesc: "海外のお客様は支付宝フラッシュ送金でクロスボーダー送金可能 — 9 機関対応。",
    altPayCta: "すべてのお支払い方法を見る",
    altPayQrCaption: "唐运提 (創業者) 公式 QR",
    whatsappBigCta: "WhatsAppで相談",
    trustBand: [
      { title: "無料サンプル", sub: "安心の注文" },
      { title: "即日納品", sub: "特急24時間対応" },
      { title: "ISO認証品質管理", sub: "ISO 9001" },
      { title: "国際配送", sub: "日本全国対応" },
    ],
    faqTitle: "よくある質問",
    bottomCtaTitle: "無料お見積もり",
    bottomCtaBody: "1分で送信。WhatsAppで30秒の見積もり、2時間以内に専門スタッフが返信。",
    bottomQuote: "無料見積もり",
    bottomWhatsApp: "WhatsAppで見積もり",
  },
};

const trustIcons = [Palette, Zap, Shield, Truck];

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

  // E: FAQ 手风琴 — 现有 SLA FAQ 前 4 条 (2 回覆 + 2 打樣), 只读
  const faqData = faqByLocale[locale] || faqByLocale["zh-hk"];
  const faqItems: { q: string; a: string }[] = [];
  for (const ci of [0, 1]) {
    const cat = faqData?.categories?.[ci];
    if (!cat) continue;
    for (const f of (cat.faqs || []).slice(0, 2)) {
      faqItems.push({ q: f.question, a: f.answer });
      if (faqItems.length >= 4) break;
    }
  }

  return (
    <>
    <main className="min-h-screen bg-white">
      {/* 2026-06-28 fix(contact-500): 连续 3 个独立 <JsonLd> 会 streaming 末尾抛错 — 用 home 同款 1 个 <JsonLd data={[array]}> */}
      <JsonLd data={[businessJsonLd, contactPageJsonLd, localBusinessJsonLd]} />

      {/* E1 Banner — 1320px 横色块 (同导航栏宽度, 对齐 PLP wedding-invitations; 颜色不变=藏青渐变) */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative overflow-hidden min-h-[300px] md:min-h-[400px] text-white" style={{ background: "var(--color-royal-navy-grad)" }}>
          <div aria-hidden className="hidden lg:block absolute right-0 top-0 h-full w-1/2 overflow-hidden pointer-events-none">
            <div className="absolute -right-20 -top-24 w-[420px] h-[420px] rounded-full border-[3px] border-white/10" />
            <div className="absolute -right-6 -top-8 w-[300px] h-[300px] rounded-full border-2 border-white/10" />
            <div className="absolute right-44 bottom-6 w-[160px] h-[160px] rounded-full border-2 border-[#F87314]/30" />
            <div
              className="absolute inset-0 opacity-10"
              style={{ backgroundImage: "radial-gradient(circle at 30% 40%, rgba(255,255,255,.6) 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }}
            />
          </div>
          <div className="relative z-[1] h-full flex flex-col justify-center px-6 md:px-10 py-10">
            <nav aria-label="breadcrumb" className="text-[13px] text-white/75 mb-4">
              <a href={`${localePrefix}/`} className="hover:text-white transition-colors underline decoration-white/40 underline-offset-4">
                {locale === "zh-hk" ? "首頁" : locale === "ja" ? "ホーム" : "Home"}
              </a>
              <span className="mx-2">/</span>
              <span className="text-white">{locale === "zh-hk" ? "聯絡我們" : locale === "ja" ? "お問い合わせ" : "Contact"}</span>
            </nav>
            <p className="inline-flex items-center gap-2 text-[#F87314] text-[13px] font-semibold tracking-[.12em] uppercase mb-3">
              <span className="inline-block w-[22px] h-[2px] bg-[#F87314]" />
              {locale === "zh-hk" ? "免費報價・30 秒 AI" : locale === "ja" ? "無料見積もり・30秒AI" : "Free Quote · 30s AI"}
            </p>
            <h1 className="text-[clamp(24px,2.5vw,34px)] font-extrabold tracking-[-0.01em] leading-[1.3] max-w-[720px] drop-shadow-sm">{t.h1}</h1>
            <p className="mt-2.5 text-[16.5px] text-white/85 max-w-[640px] leading-relaxed">{t.heroSubtitle}</p>
            <p className="mt-2 text-white/60 text-sm underline-offset-4 [&_a]:underline [&_a]:hover:text-white">{parseInlineLinks(t.slaLink)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={generateWhatsAppLink(locale)}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#F87314] text-white font-bold px-6 py-3 shadow-lg shadow-orange-500/30 hover:brightness-105 transition-all"
                data-event="whatsapp_click" data-source="contact-hero" data-locale={locale}
              >
                <MessageCircle size={18} />
                {t.whatsappBigCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* E2 信任带 — 4 徽章 (既有文案) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10 md:mb-12">
          {t.trustBand.map((item, i) => {
            const Icon = trustIcons[i] || Shield;
            return (
              <div key={item.title} className="flex items-center gap-3 rounded-xl bg-[#F2F6FF] border border-blue-50 px-4 py-4">
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Icon className="w-5 h-5 text-[#2873F5]" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[#111827] leading-tight">{item.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* E3 双栏: 左表单 + 右联系卡 */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Quote Form (7 cols) — /api/quote 字段映射不动 */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-2">{t.quoteTitle}</h2>
                <p className="text-slate-500">{t.quoteSubtitle}</p>
              </div>
              <ContactFormWrapper locale={locale} />
            </div>
          </div>

          {/* RIGHT: Contact Card (5 cols) — WhatsApp 大按钮 / 电话 / 邮箱 / NAP / 服務時間 */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 overflow-hidden">
              {/* WhatsApp 大按钮 */}
              <a
                href={generateWhatsAppLink(locale)}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white text-base font-bold px-6 py-4 hover:brightness-105 transition-all"
                data-event="whatsapp_click" data-source="contact-whatsapp-card" data-locale={locale}
              >
                <MessageCircle size={20} />
                {t.whatsappBigCta}
              </a>

              <div className="p-6">
                {/* 联系信息 */}
                <div className="space-y-2.5">
                  <a href="tel:+8619880851334" data-cf-analytics="contact_phone_click" className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50/50 to-transparent hover:from-blue-50 hover:to-blue-50/50 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-[#2873F5] flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-200">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-400">{t.phone}</div>
                      <div className="text-sm font-semibold text-[#333333] group-hover:text-[#2873F5] transition-colors">+86 198 8085 1334</div>
                    </div>
                  </a>

                  <a href="mailto:zprintpro@outlook.com" data-cf-analytics="contact_email_click" className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-orange-50/50 to-transparent hover:from-orange-50 hover:to-orange-50/50 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-[#F87314] flex items-center justify-center flex-shrink-0 shadow-sm shadow-orange-200">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-400">{t.email}</div>
                      <div className="text-sm font-semibold text-[#333333] group-hover:text-[#F87314] transition-colors">zprintpro@outlook.com</div>
                    </div>
                  </a>
                </div>

                {/* WhatsApp QR */}
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="relative w-[140px] h-[140px] bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center shadow-sm flex-shrink-0">
                      <img src="/whatsapp-qr.jpg?v=2" alt="WhatsApp QR Code | ZprintPro" width="132" height="132" className="object-contain" loading="lazy" />
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

                {/* NAP 地址 + 服務時間 (一字不改) */}
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <h3 className="text-base font-bold text-[#333333] mb-1 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#2873F5]" />
                    {t.visitUs}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-1">{t.addressValue}</p>
                  <p className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {t.officeHoursValue}
                  </p>
                  <p className="text-xs text-emerald-600 mt-1 font-semibold" data-cf-analytics="contact_whatsapp_247_view">📲 {t.whatsapp247}</p>
                  <p className="text-xs text-gray-500 mt-0.5" data-cf-analytics="contact_support_view">{t.support}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* E4 FAQ 手风琴 — 现有 SLA FAQ 前 4 条 */}
        {faqItems.length > 0 && (
          <section className="mt-14 md:mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-6">{t.faqTitle}</h2>
            <div className="space-y-3 max-w-[860px]">
              {faqItems.map((item, i) => (
                <details key={i} className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden open:border-[#2873F5] transition-colors">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer px-5 py-4 list-none [&::-webkit-details-marker]:hidden">
                    <span className="text-[15px] font-semibold text-[#111827] leading-snug">{item.q}</span>
                    <ChevronDown className="w-5 h-5 text-[#2873F5] flex-shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 pt-1 text-gray-600 text-sm leading-relaxed">{item.a}</div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* E5 页底满版 CTA — 藏青渐变 + 橙免費報價 + 绿 WhatsApp */}
        <section className="mt-14 md:mt-16">
          <div className="rounded-2xl overflow-hidden text-white px-6 md:px-10 py-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6" style={{ background: "var(--color-royal-navy-grad)" }}>
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-white">{t.bottomCtaTitle}</h2>
              <p className="mt-2 text-white/75 text-sm md:text-base">{t.bottomCtaBody}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href={`${localePrefix}/quote/`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F87314] text-white font-bold px-6 py-3 shadow-lg shadow-orange-500/30 hover:brightness-105 transition-all"
                data-event="contact_click" data-source="contact-bottom-cta" data-locale={locale}>
                {t.bottomQuote}
              </Link>
              <a href={generateWhatsAppLink(locale)} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white font-bold px-6 py-3 shadow-lg shadow-green-500/30 hover:brightness-105 transition-all"
                data-event="whatsapp_click" data-source="contact-bottom-cta" data-locale={locale}>
                <MessageCircle size={17} />
                {t.bottomWhatsApp}
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
