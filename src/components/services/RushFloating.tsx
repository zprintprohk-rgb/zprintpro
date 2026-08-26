// 2026-08-26 K3 brief §S8: 浮动元素
// 来源: deliverable-A-rush-page.html S8
// - 桌面端: 右下 WhatsApp 绿圆 (脉冲动画)
// - 移动端: 底部固定双按钮栏 (WhatsApp + 立即查价)
// 不与全局 WhatsAppFloat 冲突: 此组件只在 rush 页生效,加条件渲染或 path 检测

'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { zpTrack } from './zpTrack';
import type { Locale } from '@/lib/seo';

type Props = {
  locale: Locale;
};

export default function RushFloating({ locale }: Props) {
  const pathname = usePathname();
  const [showPulse, setShowPulse] = useState(true);

  // 仅在 rush 页生效
  const isRushPage = pathname?.endsWith('/services/rush-printing-delivery/');

  useEffect(() => {
    if (!isRushPage) return;
    // 5 秒后停止脉冲,避免视觉疲劳
    const t = setTimeout(() => setShowPulse(false), 5000);
    return () => clearTimeout(t);
  }, [isRushPage]);

  if (!isRushPage) return null;

  const waHref = generateWhatsAppLink(locale as 'zh-hk' | 'en' | 'ja', {
    productName: locale === 'zh-hk' ? '急單確認' : locale === 'ja' ? '急ぎの注文' : 'Rush Order Confirm',
    source: 'rush-printing-delivery-floating',
    extra: locale === 'zh-hk'
      ? '請填寫：\n• 產品：\n• 數量：\n• 收貨地址/港鐵站：'
      : locale === 'en'
      ? 'Please fill in:\n• Product:\n• Quantity:\n• Delivery address / MTR station:'
      : 'ご記入ください：\n• 製品：\n• 数量：\n• 配送住所/MTR駅：',
  });

  const handleWaClick = () => {
    zpTrack({
      event: 'whatsapp_click',
      source: 'rush-floating',
      locale,
      productName: 'rush',
    });
  };

  return (
    <>
      {/* 桌面端: 右下 WhatsApp 浮动圆 */}
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWaClick}
        data-event="whatsapp_click"
        data-source="rush-printing"
        data-locale={locale}
        aria-label="WhatsApp 急件確認"
        className="hidden md:flex fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#1da851] text-white w-16 h-16 rounded-full shadow-lg items-center justify-center transition-colors"
        style={{
          animation: showPulse ? 'pulse 2s infinite' : undefined,
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      {/* 移动端: 底部固定双按钮栏 */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg"
        data-section="rush-mobile-bar"
      >
        <div className="flex">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWaClick}
            data-event="whatsapp_click"
            data-source="rush-printing"
            data-locale={locale}
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold py-3 transition-colors"
          >
            💬 {locale === 'zh-hk' ? 'WhatsApp 急單' : locale === 'ja' ? 'WhatsApp 急行' : 'WhatsApp Rush'}
          </a>
          <a
            href={`tel:+8619880851334`}
            onClick={() =>
              zpTrack({
                event: 'tel_click',
                source: 'rush-floating-mobile',
                locale,
              })
            }
            data-event="tel_click"
            data-source="rush-printing"
            data-locale={locale}
            className="flex-1 flex items-center justify-center gap-2 bg-[#2873F5] hover:bg-[#1e5fd1] text-white font-bold py-3 transition-colors"
          >
            📞 {locale === 'zh-hk' ? '致電查價' : locale === 'ja' ? '電話見積' : 'Call for Quote'}
          </a>
        </div>
      </div>

      {/* Pulse 动画 keyframes (一次性内联) */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 12px rgba(37, 211, 102, 0);
          }
        }
      `}</style>
    </>
  );
}
