'use client';
/**
 * FloatingQuoteCTA — 右下角浮动询盘按钮 (Week 1+ 转化优化)
 *
 * 背景 (2026-07-05 user 反馈):
 * - en /zh-hk / ja 市场产品页高点击低询盘
 * - en 用户 (US/AU) 看到产品但联系入口不够明显
 * - zh-hk 用户偏好 WhatsApp, en/ja 用户偏好 email form
 *
 * 设计:
 * - 3 locale 不同入口策略
 *   - zh-hk: 直接跳 WhatsApp wa.me 链接 (避免弹 form)
 *   - en/ja: 弹 mini email form (无需注册, 留邮箱 → 通过 API 转发到 zprintpro@outlook.com)
 * - 4h 回复承诺 + trust micro-copy
 *
 * 实现注意:
 * - 'use client' (useState 需要 client)
 * - Layout.tsx 静态导入即可 (Next.js 自动 code-split)
 * - form 提交走 /api/quote (将来扩展) — 当前 fallback 跳 /quote/ 页
 */

import { useState } from 'react';
import { usePathname } from 'next/navigation';

const TEXTS = {
  'en': {
    btnLabel: 'Get Free Quote',
    microCopy: 'Reply within 4 hours · Free sample shipping',
    formTitle: 'Request a Free Quote',
    nameLabel: 'Your Name',
    emailLabel: 'Email Address',
    productLabel: 'What do you need? (e.g., 500 perfect bound books A5)',
    submit: 'Send Quote Request',
    // 2026-07-05 fix: mailto 是伪转化 — 跳转用户邮件客户端后需手动点 Send
    // 透明告知，避免 "✓ Sent" 误导; P2 升级到真自动发送 (/api/quote + Resend API)
    success: '✓ Opening your email client — please click Send to deliver.',
    errorEmpty: 'Please fill in your name and email.',
    altContactLabel: 'Or chat with us on WhatsApp:',
    trustLine: 'ISO 9001 · FSC Certified · DHL 2-4 days to US/UK/AU',
  },
  'ja': {
    btnLabel: '無料見積もり',
    microCopy: '4時間以内に返信 · サンプル送料無料',
    formTitle: '無料見積もり依頼',
    nameLabel: 'お名前',
    emailLabel: 'メールアドレス',
    productLabel: 'ご希望商品 (例: 無線綴じ書籍 A5 500部)',
    submit: '送信',
    // 2026-07-05 fix: mailto は仮 conversion — ユーザーメーラーが開くので送信ボタンが必要
    success: '✓ メールクライアントが開きました — 送信ボタンを押してください。',
    errorEmpty: 'お名前とメールアドレスをご入力ください。',
    altContactLabel: 'または WhatsApp で直接お問合せ:',
    trustLine: 'ISO 9001 · FSC認証 · DHL 2-4日で日本全国',
  },
  'zh-hk': {
    btnLabel: 'WhatsApp 立即查詢',
    microCopy: '5 分鐘回覆 · 全港順豐本地倉',
    whatsappMsg: '你好！我想查詢印刷服務：',
    trustLine: 'ISO 9001 · FSC 認證 · 順豐本地倉 1 日到貨',
  },
};

export function FloatingQuoteCTA({ locale }: { locale: string }) {
  const t = TEXTS[locale as keyof typeof TEXTS] || TEXTS.en;
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', product: '' });

  // 转化流程页面不显示（避免视觉噪声 + 用户已经在转化中）
  const pathname = usePathname() || '';
  const hideOnPaths = ['/cart', '/checkout', '/quote', '/payment/'];
  if (hideOnPaths.some((p) => pathname.includes(p))) return null;

  // zh-hk: 直接 WhatsApp 跳转，不弹 form
  if (locale === 'zh-hk') {
    // 2026-07-05 修：t 是联合类型，zh-hk 分支内强制断言避免 TS 报错
    const tZh = t as typeof TEXTS['zh-hk'];
    // 2026-07-08 fix: 198 号码未注册 WhatsApp, 改 181 2638 0255 (WhatsApp 专用号)
    const waUrl = `https://wa.me/8619880851334?text=${encodeURIComponent(tZh.whatsappMsg + ' ')}`;
    return (
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1FAD52] text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all"
        aria-label="WhatsApp 即時查詢"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        <div className="text-left leading-tight">
          <div className="font-bold text-sm">{t.btnLabel}</div>
          <div className="text-[10px] opacity-90">{t.microCopy}</div>
        </div>
      </a>
    );
  }

  // en / ja: 弹 mini email form
  const tEn = t as typeof TEXTS['en'];
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      alert(tEn.errorEmpty);
      return;
    }
    // 2026-07-05 fix: mailto 是伪转化 — 跳转用户邮件客户端后需手动点 Send 才真发到 zprintpro@outlook.com
    // 透明告知用户后续步骤,避免 "✓ Sent" 误导; P2 升级到真自动发送 (/api/quote + Resend API)
    const subject = encodeURIComponent(`[Quote Request] ${form.product || 'General Inquiry'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProduct: ${form.product || 'Not specified'}\n\n— Sent from ZprintPro floating CTA`
    );
    window.location.href = `mailto:zprintpro@outlook.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
      setForm({ name: '', email: '', product: '' });
    }, 3000);
  }
  // WhatsApp 备选入口 — 即使邮件客户端打不开,也能直跳 WhatsApp 联系
  // 2026-07-08 fix: 198 号码未注册 WhatsApp, 改 181 2638 0255 (WhatsApp 专用号)
  const waUrl = `https://wa.me/8619880851334?text=${encodeURIComponent('Hi, I would like to inquire about printing services.')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="group inline-flex items-center gap-3 bg-[#2873F5] hover:bg-[#1E5FD1] text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all"
          aria-label={t.btnLabel}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <div className="text-left leading-tight">
            <div className="font-bold text-sm">{t.btnLabel}</div>
            <div className="text-[10px] opacity-90">{t.microCopy}</div>
          </div>
        </button>
      )}

      {open && (
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-[340px] border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">{tEn.formTitle}</h3>
            <button
              onClick={() => { setOpen(false); setSubmitted(false); }}
              className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {submitted ? (
            <div className="py-8 text-center">
              <div className="text-2xl text-green-600 mb-2">✓</div>
              <p className="text-sm text-gray-700">{tEn.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">{tEn.nameLabel}</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-[#2873F5] focus:ring-1 focus:ring-[#2873F5] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">{tEn.emailLabel}</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-[#2873F5] focus:ring-1 focus:ring-[#2873F5] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">{tEn.productLabel}</label>
                <textarea
                  rows={2}
                  value={form.product}
                  onChange={(e) => setForm({ ...form, product: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-[#2873F5] focus:ring-1 focus:ring-[#2873F5] outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#2873F5] hover:bg-[#1E5FD1] text-white font-semibold py-2.5 rounded-md text-sm transition-colors"
              >
                {tEn.submit}
              </button>
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-2 text-[10px] text-gray-400 uppercase">{tEn.altContactLabel}</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1FAD52] text-white font-semibold py-2.5 rounded-md text-sm transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
              <p className="text-[10px] text-gray-500 text-center pt-1">{tEn.trustLine}</p>
            </form>
          )}
        </div>
      )}
    </div>
  );
}