/**
 * HowToGuide — 印刷下单流程指南
 * 含 HowTo JSON-LD Schema（itemScope itemType="https://schema.org/HowTo"）
 * 5 步流程，可视化时间轴
 */

import { Locale } from '@/types/locale';
import { JsonLd } from '@/components/JsonLd';
import { ClipboardList, Upload as UploadIcon, CheckCircle2, Package, Truck } from 'lucide-react';

interface HowToGuideProps {
  locale?: Locale;
}

const I18N: Record<Locale, { title: string; subtitle: string; steps: Array<{ name: string; text: string }> }> = {
  'zh-hk': {
    title: '如何訂購印刷產品？',
    subtitle: '從規格選擇到收貨的完整 5 步流程',
    steps: [
      { name: '選擇規格', text: '在報價計算器中選擇尺寸、材質、數量、印後工藝，30秒獲得估算價格。' },
      { name: '上傳設計稿', text: '支持 PDF、AI、PSD、PNG、JPG 格式（最大 50MB），系統自動印前預檢。' },
      { name: '確認報價', text: '客服將在 24 小時內確認最終價格（含運費、稅費），並提供付款方式。' },
      { name: '生產印刷', text: '確認訂單後 1-2 個工作天完成生產，急件可當天完成。' },
      { name: '送達收貨', text: '香港本地即日送達；海外 3-7 個工作天全球配送。' },
    ],
  },
  en: {
    title: 'How to Order Custom Printing?',
    subtitle: '5 steps from spec to delivery',
    steps: [
      { name: 'Choose Specs', text: 'Use the quote calculator to pick size, material, quantity, and finish. Get an estimate in 30 seconds.' },
      { name: 'Upload Design', text: 'PDF, AI, PSD, PNG, JPG supported (up to 50MB). System runs automatic preflight check.' },
      { name: 'Confirm Quote', text: 'Our team confirms final pricing (including shipping and tax) within 24 hours.' },
      { name: 'Production', text: 'Production takes 1-2 business days. Same-day rush available for urgent jobs.' },
      { name: 'Delivery', text: 'Same-day production at our Asia facility. 2-4 business day DHL delivery for US orders.' },
    ],
  },
  ja: {
    title: '印刷の注文方法',
    subtitle: '仕様選択から納品までの 5 ステップ',
    steps: [
      { name: '仕様選択', text: '見積もり計算機でサイズ、素材、数量、加工を選び、30秒で概算価格を取得。' },
      { name: 'デザインアップロード', text: 'PDF、AI、PSD、PNG、JPG 対応（最大50MB）。システムが自動で印刷適性チェック。' },
      { name: '見積もり確認', text: '24時間以内に最終価格（送料・税込み）と支払い方法をご案内。' },
      { name: '生産・印刷', text: '確認後 1-2 営業日で生産完了。緊急時は当日対応可能。' },
      { name: 'お届け', text: '香港現地は即日配送。海外は 3-7 営業日でグローバル配送。' },
    ],
  },
};

const ICONS = [ClipboardList, UploadIcon, CheckCircle2, Package, Truck];

export function HowToGuide({ locale = 'en' }: HowToGuideProps) {
  const t = I18N[locale] || I18N.en;

  // 生成 HowTo JSON-LD
  const howtoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: t.title,
    step: t.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };

  return (
    <section
      itemScope
      itemType="https://schema.org/HowTo"
      className="space-y-6"
      aria-label={t.title}
    >
      <JsonLd data={howtoJsonLd} />

      <div className="text-center max-w-2xl mx-auto">
        <h2 itemProp="name" className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{t.title}</h2>
        <p className="text-slate-500">{t.subtitle}</p>
      </div>

      <ol className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {t.steps.map((step, i) => {
          const Icon = ICONS[i] || ClipboardList;
          return (
            <li
              key={i}
              itemProp="step"
              itemScope
              itemType="https://schema.org/HowToStep"
              className="relative bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs text-slate-400 font-mono">STEP {i + 1}</span>
              </div>
              <h3 itemProp="name" className="font-semibold text-slate-900 mb-1.5 text-sm">{step.name}</h3>
              <p itemProp="text" className="text-xs text-slate-600 leading-relaxed">{step.text}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
