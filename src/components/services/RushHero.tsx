// 2026-08-26 K3 拍板 (autoclaw 设计稿 verbatim 视觉优化): h1 56px 800 + lead 700 + section 104px 大留白 + btn 16px/30px + 工厂图全屏
// 数据来源: .cluster/rush-page-20260826/deliverable-A-rush-page.html (488 行) + K3 15:09 上传附件
// 撞墙 = M3 自主 (K3 当前 turn 拍板 = 1 次回复 = §0.22 撞墙豁免)

import { generateWhatsAppLink } from '@/lib/whatsapp';
import type { Locale } from '@/lib/seo';

type Props = { locale: Locale };

const i18n = (locale: Locale) => {
  const dict = {
    'zh-hk': {
      crumb: '首頁 / 服務 / 即日速遞',
      eyebrow: '通宵達旦・翌日送達',
      h1: '即日印刷・即日急件 — 今晚 6 點前落單，聽日中午 12 點前到',
      lead: '傳單 / 海報 / 貼紙 / 紙袋 100 張起印 · CMYK 全彩 · 全港配送（順豐送貨上門 / 合作點交收）',
      trust: ['30 秒 AI 報價', '自營工廠直印', '順豐翌日中午前送達', '每日 18:00 截單'],
      primaryCta: 'WhatsApp 即時報價',
      primaryText: '我想諗單即日印刷',
      ghostCta: '致電 +86 198 8085 1334',
    },
    en: {
      crumb: 'Home / Services / Same-Day Delivery',
      eyebrow: 'Overnight Print & Delivery',
      h1: 'Same-Day Printing & Rush — Order by 6pm, Delivered Next-Day 12pm',
      lead: 'Flyers / Posters / Stickers / Paper bags 100+ MOQ · CMYK full color · Island-wide SF Express door-to-door / partner location pickup',
      trust: ['30-sec AI quote', 'In-house factory direct', 'SF Express next-day by noon', 'Daily 6PM cut-off'],
      primaryCta: 'WhatsApp Instant Quote',
      primaryText: 'I want a same-day print quote',
      ghostCta: 'Call +86 198 8085 1334',
    },
    ja: {
      crumb: 'ホーム / サービス / 当日配送',
      eyebrow: '徹夜印刷・翌日配送',
      h1: '当日印刷・当日特急 — 18時までの注文で翌日12時前にお届け',
      lead: 'チラシ / ポスター / ステッカー / 紙袋 100枚〜 · CMYKフルカラー · 全域 SF Express 配送 / 提携先受取',
      trust: ['30秒AI見積もり', '自社工場直接印刷', 'SF翌日午前中配送', '毎日18時締切'],
      primaryCta: 'WhatsApp 即時見積もり',
      primaryText: '当日印刷の見積もり希望',
      ghostCta: '電話 +86 198 8085 1334',
    },
  } as const;
  return dict[locale];
};

export default function RushHero({ locale }: Props) {
  const d = i18n(locale);
  const waHref = generateWhatsAppLink(locale as 'zh-hk' | 'en' | 'ja', {
    productName: locale === 'zh-hk' ? '急單確認' : locale === 'ja' ? '急ぎの注文' : 'Rush Order',
    source: 'rush-printing',
    extra: d.primaryText,
  });

  return (
    <section
      className="relative w-full text-white overflow-hidden bg-[#0F1F3D]"
      aria-label="即日印刷服務"
      data-section="rush-hero"
    >
      {/* 加工厂图全屏 (K3 11:02 授权 viewport 满宽) + 深色遮罩 brightness .42 + 渐变叠加 (autoclaw design) */}
      <img
        src="/images/factory/factory-hero.webp"
        alt={`即日印刷-${locale === 'zh-hk' ? '智印港印刷車間' : locale === 'ja' ? '智印港工場' : 'ZprintPro factory floor'}-智印港 ZprintPro`}
        width={1600}
        height={1127}
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.42)' }}
      />
      <link rel="preload" as="image" href="/images/factory/factory-hero.webp" />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg,rgba(15,31,61,.25),rgba(15,31,61,.55) 55%,#0F1F3D)',
        }}
      />

      {/* 1320px 容器 (K3 §1 修复要求, 既有模式 1320px, K3 8/26 11:02 授权 hero 加工厂图全屏) */}
      <div className="relative z-10 max-w-[1120px] mx-auto px-6 pt-[72px] pb-[104px]">
        {/* K3 15:39 拍板: 删 hero 内的 crumb (上方 layout.tsx 已渲染全站 breadcrumb) */}
        {/* autoclaw L207 设计的 crumb 视觉冗余, layout.tsx BreadcrumbNav 替代 */}

        <p className="inline-flex items-center gap-2 bg-[#F87314] text-white text-[13px] font-semibold tracking-wider px-3 py-1 rounded-full mb-4 uppercase">
          {d.eyebrow}
        </p>

        {/* h1 大字 (clamp 30-56px, font-weight 800, max-w 860) */}
        <h1 className="text-[clamp(30px,4.6vw,56px)] font-extrabold max-w-[860px] leading-[1.2] tracking-tight">
          {d.h1}
        </h1>

        {/* lead 中等字号 (clamp 16-20px, max-w 700, font-weight 500) */}
        <p className="text-[clamp(16px,2vw,20px)] text-white/90 mt-[18px] max-w-[700px] font-medium leading-[1.6]">
          {d.lead}
        </p>

        {/* 信任条 (gap-x 26px, 14.5px) */}
        <ul className="flex flex-wrap gap-x-[26px] gap-y-2 my-[30px] mb-9 text-[14.5px] text-white/95 font-medium">
          {d.trust.map((t) => (
            <li key={t} className="flex items-center gap-2 list-none">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F87314"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="flex-none"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {t}
            </li>
          ))}
        </ul>

        {/* CTA 主橙 + 副白边 (btn 16px/30px font 17px, primary shadow orange) */}
        <div className="flex flex-wrap gap-4">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            data-event="whatsapp_click"
            data-source="rush-printing"
            data-locale={locale}
            className="inline-flex items-center justify-center gap-2 bg-[#F87314] hover:bg-[#E56203] text-white font-bold rounded-xl px-[30px] py-4 text-[17px] transition-transform active:translate-y-px"
            style={{ boxShadow: '0 8px 24px rgba(248,115,20,.32)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.5 7.5 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.4z" />
            </svg>
            {d.primaryCta}
          </a>
          <a
            href="tel:+8619880851334"
            data-event="tel_click"
            data-source="rush-printing"
            data-locale={locale}
            className="inline-flex items-center justify-center gap-2 bg-transparent text-white border-[1.5px] border-white/70 hover:border-white hover:bg-white/10 font-bold rounded-xl px-[30px] py-4 text-[17px] transition-transform active:translate-y-px"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 2z" />
            </svg>
            {d.ghostCta}
          </a>
        </div>
      </div>
    </section>
  );
}
