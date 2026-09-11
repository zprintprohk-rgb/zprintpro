/**
 * WhatsApp CTA 按钮（共享组件 · 2026-09-12 v9.5）
 *
 * 抽出目的地：`src/app/[locale]/contact/page.tsx` Hero 内既有按钮 JSX（原样式逐字保留）。
 * 原因：Blog Hero 的同类 CTA 作为 `flex flex-col` 的直接子元素被默认 `align-items: stretch`
 * 拉成整行橙色长条，与 Contact 自适应宽度按钮不一致 → 抽共享组件统一，两页同款。
 *
 * 红线遵守：文案由调用方以 label 传入（零文案改动）；埋点属性 data-event/data-source/data-locale 原样保留。
 */
import { MessageCircle } from 'lucide-react';

interface WhatsAppCtaButtonProps {
  /** WhatsApp 链接（调用方沿用各自既有 href，零行为改动） */
  href: string;
  /** 按钮文字（各页既有文案） */
  label: string;
  /** 埋点 data-source（如 blog-hero / contact-hero） */
  source: string;
  /** 埋点 data-locale */
  locale: string;
  /** 追加类名（可选） */
  className?: string;
}

export function WhatsAppCtaButton({ href, label, source, locale, className = '' }: WhatsAppCtaButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // inline-flex + self-start: 宽度随文字自适应, 即使作为 flex-col 直接子元素也不被拉伸
      className={`inline-flex self-start items-center gap-2 rounded-xl bg-[#F87314] text-white font-bold px-6 py-3 shadow-lg shadow-orange-500/30 hover:brightness-105 transition-all ${className}`}
      data-event="whatsapp_click"
      data-source={source}
      data-locale={locale}
    >
      <MessageCircle size={18} />
      {label}
    </a>
  );
}
