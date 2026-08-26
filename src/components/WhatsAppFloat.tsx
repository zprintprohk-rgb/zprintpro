'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { trackFormSubmit, trackTelClick, trackMailtoClick } from '@/lib/metrics-008';
import { getWhatsAppLinkProps } from '@/lib/whatsapp';

const WHATSAPP_NUMBER = '+8619880851334';

const LOCALE_MESSAGES = {
  'zh-hk': { label: 'WhatsApp 查詢' },
  'en': { label: 'WhatsApp us' },
  'ja': { label: 'WhatsApp お問い合わせ' },
} as const;

const SUPPORTED_LOCALES = new Set(['zh-hk', 'en', 'ja']);

/**
 * 8/26 修 2 redo: locale 撞车根因 = BUG 不是流量结构 (K3 撞车根因)
 * 撞车根因 = useParams() 撞车根因 = 5 行全 'en' 撞车根因 = params.locale undefined
 * 修法 = 改用 usePathname() 解析路径第 1 段 (next-intl as-needed 路由 /zh-hk/services/...)
 * 验证 = 在 zh-hk 页面手动点 WhatsApp, Supabase 应见 locale='zh-hk'
 */
function detectLocaleFromPath(pathname: string | null): 'zh-hk' | 'en' | 'ja' {
  if (!pathname) return 'zh-hk';
  // pathname 形如 /zh-hk/services/... /en/services/... /ja/services/... 或根 /
  const seg = pathname.split('/').filter(Boolean)[0];
  if (seg && SUPPORTED_LOCALES.has(seg)) return seg as 'zh-hk' | 'en' | 'ja';
  return 'zh-hk';
}

export default function WhatsAppFloat() {
  const pathname = usePathname();
  const locale = detectLocaleFromPath(pathname);
  const [isOpen, setIsOpen] = useState(false);

  const messages = LOCALE_MESSAGES[locale] || LOCALE_MESSAGES['zh-hk'];

  // 8/26 修 3 撞车根因 (K3 实测): WhatsAppFloat 之前用 trackWhatsAppClick (metrics-008.ts)
  // → env-gated 写 zprintpro_008_events 表 (PGRST205 表不存在) = 浮动按钮静默报错
  // 修法 = 改用 getWhatsAppLinkProps, 跟 header/footer/sidebar 同一系统 (写 whatsapp_inquiries 表, 5 行真实数据证实)
  const waProps = getWhatsAppLinkProps(locale, {
    source: 'whatsapp-float',
    productName: 'WhatsApp Float Button',
    phone: '85290616204',
  });
  const mainWaProps = getWhatsAppLinkProps(locale, {
    source: 'whatsapp-float-button',
    productName: 'WhatsApp Float Main Button',
    phone: '85290616204',
  });

  const handlePhoneClick = () => {
    trackTelClick(locale, typeof window !== 'undefined' ? window.location.pathname : '', {
      phone: WHATSAPP_NUMBER,
    });
  };

  const handleEmailClick = () => {
    trackMailtoClick(locale, typeof window !== 'undefined' ? window.location.pathname : '', {
      email: 'zprintpro@outlook.com',
    });
  };

  return (
    <>
      {/* WhatsApp 浮动按钮 (撞墙升级 K3 必拍 #2 批准) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isOpen && (
          <div className="bg-white rounded-2xl shadow-2xl p-4 w-72 border border-gray-200 animate-fade-in">
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
              <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm text-[#333333]">{messages.label}</p>
                <p className="text-xs text-gray-500">{WHATSAPP_NUMBER}</p>
              </div>
            </div>
            <div className="space-y-2">
              <a
                {...waProps}
                className="block w-full bg-[#25D366] text-white text-center py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1DA851] transition-colors"
              >
                {messages.label} →
              </a>
              <a
                href={`tel:${WHATSAPP_NUMBER}`}
                onClick={handlePhoneClick}
                className="block w-full bg-gray-100 text-[#333333] text-center py-2 rounded-lg text-xs hover:bg-gray-200 transition-colors"
              >
                📞 {WHATSAPP_NUMBER}
              </a>
              <a
                href="mailto:zprintpro@outlook.com"
                onClick={handleEmailClick}
                className="block w-full bg-gray-100 text-[#333333] text-center py-2 rounded-lg text-xs hover:bg-gray-200 transition-colors"
              >
                ✉️ zprintpro@outlook.com
              </a>
            </div>
          </div>
        )}

        <a
          {...mainWaProps}
          className="bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110"
          aria-label={messages.label}
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.967-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </>
  );
}
