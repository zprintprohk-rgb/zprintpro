import { Metadata } from "next";
import { Locale, siteConfig, generateBusinessJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { generateWhatsAppLink } from "@/lib/whatsapp";

interface ContactPageProps {
  params: { locale: string };
}

const translations = {
  "zh-hk": {
    title: "聯絡我們 · 免費獲取報價 | 智印雲 ZprintPro",
    description: "聯絡智印雲專業印刷團隊，填寫表單獲取免費報價。電話：+86 198 8085 1334 / WhatsApp +86 181 2638 0255",
    h1: "聯絡我們 · 免費獲取報價",
    subtitle: "WhatsApp 聯繫，24小時內回覆",
    name: "唐先生",
    role: "銷售經理｜智印雲",
    phone: "電話 / WhatsApp",
    email: "電郵",
    addressValue: "廣東省深圳市龍崗區平湖街道嘉城路1號（518111）· 深圳市彩龍印刷包裝有限公司",
    cta: "立即 WhatsApp 查詢",
  },
  en: {
    title: "Free Custom Printing Quote | ZprintPro",
    description: "Get a free custom printing quote. Stickers, packaging boxes, business cards. 72h global delivery.",
    h1: "Free Custom Printing Quote",
    subtitle: "WhatsApp us, reply within 24h",
    name: "Mr. Tang",
    role: "Sales Manager | ZprintPro",
    phone: "Phone / WhatsApp",
    email: "Email",
    addressValue: "No.1 Jiacheng Road, Pinghu Street, Longgang District, Shenzhen, Guangdong 518111",
    cta: "Chat on WhatsApp Now",
  },
  ja: {
    title: "無料お見積もり | 智印雲 ZprintPro",
    description: "印刷の無料お見積もりはZprintProへ。WhatsAppで今すぐお問い合わせください。",
    h1: "無料お見積もり",
    subtitle: "WhatsAppでお問い合わせ、24時間以内に返信",
    name: "唐 様",
    role: "セールスマネージャー｜ZprintPro",
    phone: "電話 / WhatsApp",
    email: "メール",
    addressValue: "広東省深圳市龍崗区平湖街道嘉城路1号（518111）· 深圳市彩龍印刷包装有限公司",
    cta: "WhatsAppで相談",
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
        "zh-HK": `${siteConfig.url}/contact/`,
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

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <JsonLd data={businessJsonLd} />
      <div className="max-w-[1320px] mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-4">{t.h1}</h1>
        <p className="text-center text-gray-500 mb-8">{t.subtitle}</p>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 text-center">
          <h2 className="text-xl font-bold mb-2">{t.name}</h2>
          <p className="text-gray-500 text-sm mb-2">{t.role}</p>
          <p className="text-gray-600 text-sm mb-4">{t.addressValue}</p>
          <a href="tel:+8619880851334" className="block text-blue-600 font-semibold mb-2">
            {t.phone}: +86 198 8085 1334
          </a>
          <a href="mailto:zprintpro@outlook.com" className="block text-orange-600 mb-4">
            {t.email}: zprintpro@outlook.com
          </a>
          <a
            href={generateWhatsAppLink(locale, { source: "contact" })}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-full"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </main>
  );
}