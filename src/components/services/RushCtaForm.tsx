// 2026-08-26 K3 15:20 拍板 (autoclaw 设计稿 1120px + 15 分鐘電郵回覆承诺 区块 + form-card 包装): 修复 6f74771 容器太宽
// K3 邮件/电话必填 — 已含 (5 必填: 姓名/電郵*/電話或 WhatsApp*/產品類型*/數量*)

'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { zpTrack } from './zpTrack';
import type { Locale } from '@/lib/seo';

type Props = { locale: Locale };

const i18n = (locale: Locale) => {
  const dict = {
    'zh-hk': {
      // 顶部 15 分鐘電郵回覆承诺 区块 (K3 图 3 拍板)
      promiseTitle: '15 分鐘電郵回覆承諾',
      promiseSub: '填妥下列資料，我們 15 分鐘內以電郵回覆您。急件請直接 WhatsApp。',
      openFormBtn: '📝 填寫急件查詢表單',
      // form
      title: '即日急件，分秒必爭',
      sub: '唔使等，而家就攞報價。',
      ctaWa: 'WhatsApp 即時報價',
      ctaTel: '致電查詢',
      ctaForm: '填寫詢價表',
      name: '姓名 *',
      company: '公司（可選）',
      email: '電郵 *',
      phone: '電話或 WhatsApp *',
      product: '產品類型 *',
      qty: '數量 *',
      deadline: '期望交付時間（可選）',
      note: '備註',
      submit: '🚀 提交急件查詢',
      submitting: '提交中...',
      success: '✅ 已收到！15 分鐘內以電郵回覆',
      error: '❌ 提交失敗，請直接 WhatsApp 我們',
      productOptions: ['傳單', '海報', '貼紙', '紙袋', '畫冊', '易拉寶', '其他 / 不確定'],
    },
    en: {
      promiseTitle: '15-Min Email Reply Promise',
      promiseSub: 'Fill in the form, we reply by email within 15 minutes. For rush orders, WhatsApp us directly.',
      openFormBtn: '📝 Open Rush Inquiry Form',
      title: 'Same-day rush, every minute counts',
      sub: 'No waiting, get your quote now.',
      ctaWa: 'WhatsApp Instant Quote',
      ctaTel: 'Call for Quote',
      ctaForm: 'Fill Inquiry Form',
      name: 'Name *',
      company: 'Company (optional)',
      email: 'Email *',
      phone: 'Phone or WhatsApp *',
      product: 'Product Type *',
      qty: 'Quantity *',
      deadline: 'Expected delivery (optional)',
      note: 'Notes',
      submit: '🚀 Submit Rush Inquiry',
      submitting: 'Submitting...',
      success: '✅ Received! Reply by email within 15 minutes',
      error: '❌ Submit failed, please WhatsApp us directly',
      productOptions: ['Flyer', 'Poster', 'Sticker', 'Paper bag', 'Booklet', 'Roll-up banner', 'Other / Not sure'],
    },
    ja: {
      promiseTitle: '15 分以内にメール返信',
      promiseSub: '下記ご記入後、15 分以内にメールでご返信します。特急は直接 WhatsApp でお願いします。',
      openFormBtn: '📝 特急お問合わせフォームを開く',
      title: '当日特急、分秒必争',
      sub: '待つ必要なし、今すぐ見積もり。',
      ctaWa: 'WhatsApp 即時見積もり',
      ctaTel: '電話で問い合わせ',
      ctaForm: 'お問合わせフォーム',
      name: 'お名前 *',
      company: '会社（任意）',
      email: 'メール *',
      phone: '電話または WhatsApp *',
      product: '製品タイプ *',
      qty: '数量 *',
      deadline: 'ご期望納期（任意）',
      note: '備考',
      submit: '🚀 特急お問合わせ送信',
      submitting: '送信中...',
      success: '✅ 受付完了！15 分以内にメール返信',
      error: '❌ 送信失敗，直接 WhatsApp でご連絡ください',
      productOptions: ['チラシ', 'ポスター', 'ステッカー', '紙袋', '冊子', 'ロールアップバナー', 'その他 / 未定'],
    },
  } as const;
  return dict[locale];
};

export default function RushCtaForm({ locale }: Props) {
  const d = i18n(locale);
  const pathname = usePathname();
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: '',
    qty: '',
    deadline: '',
    note: '',
  });

  useEffect(() => {
    if (formOpen) {
      zpTrack({
        event: 'form_open',
        source: 'rush-printing',
        locale,
        extra: { pathname },
      });
    }
  }, [formOpen, locale, pathname]);

  const handleChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    // 必填校验: 姓名/電郵/電話/產品/數量
    if (!form.name || !form.email || !form.phone || !form.product || !form.qty) {
      setResult('error');
      setSubmitting(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setResult('error');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locale,
          source: 'rush-printing',
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          product_name: form.product,
          quantity: form.qty,
          deadline: form.deadline,
          note: form.note,
        }),
      });
      if (res.ok) {
        setResult('success');
        zpTrack({
          event: 'form_submit',
          source: 'rush-printing',
          locale,
          productName: form.product,
          extra: { quantity: form.qty },
        });
        setForm({
          name: '',
          company: '',
          email: '',
          phone: '',
          product: '',
          qty: '',
          deadline: '',
          note: '',
        });
      } else {
        setResult('error');
      }
    } catch {
      setResult('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="py-[104px]"
      style={{ background: 'linear-gradient(180deg,#fff 0%,#FEF1E6 100%)' }}
      id="quote"
      aria-label="即日印刷詢價"
      data-section="rush-cta-form"
    >
      {/* 1120px 容器 (autoclaw .wrap 居中) */}
      <div className="max-w-[1120px] mx-auto px-6">
        <h2 className="text-[clamp(26px,3.4vw,40px)] font-extrabold text-center text-[#111827] leading-[1.2] tracking-tight">
          {d.title}
        </h2>
        <p className="text-[#6B7280] text-base md:text-lg text-center mt-3 mb-8 leading-[1.6]">{d.sub}</p>

        {/* 15 分鐘電郵回覆承诺 区块 (K3 15:20 拍板 顶部, autoclaw form-note 模式放大) */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl px-6 py-8 md:px-10 md:py-10 text-center mb-8 border border-[#FEF1E6]" style={{ boxShadow: '0 10px 30px rgba(248,115,20,.12)' }}>
          <div className="text-5xl mb-3" aria-hidden="true">📧</div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#111827] leading-[1.2] tracking-tight">
            {d.promiseTitle}
          </h3>
          <p className="text-[#6B7280] text-base md:text-lg mt-3 leading-[1.7] max-w-xl mx-auto">
            {d.promiseSub}
          </p>
        </div>

        {!formOpen ? (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              data-event="form_open"
              data-source="rush-printing"
              data-locale={locale}
              className="bg-[#2873F5] hover:bg-[#1E5BD6] text-white font-bold rounded-xl px-8 py-4 text-[17px] transition-transform active:translate-y-px"
              style={{ boxShadow: '0 8px 24px rgba(40,115,245,.32)' }}
            >
              {d.openFormBtn}
            </button>
          </div>
        ) : (
          // form-card (autoclaw 大圆角白卡包整个 form)
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-white rounded-2xl p-6 md:p-10 border border-[#E5E7EB]"
            style={{ boxShadow: '0 10px 30px rgba(17,24,39,.06)' }}
            data-form="rush-cta"
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-[#111827] mb-1.5">{d.name}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange('name')}
                  className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-[15px] focus:ring-2 focus:ring-[#2873F5] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#111827] mb-1.5">{d.company}</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={handleChange('company')}
                  className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-[15px] focus:ring-2 focus:ring-[#2873F5] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#111827] mb-1.5">{d.email}</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange('email')}
                  className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-[15px] focus:ring-2 focus:ring-[#2873F5] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#111827] mb-1.5">{d.phone}</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange('phone')}
                  className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-[15px] focus:ring-2 focus:ring-[#2873F5] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#111827] mb-1.5">{d.product}</label>
                <select
                  required
                  value={form.product}
                  onChange={handleChange('product') as any}
                  className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-[15px] focus:ring-2 focus:ring-[#2873F5] focus:border-transparent"
                >
                  <option value="">--</option>
                  {d.productOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#111827] mb-1.5">{d.qty}</label>
                <input
                  type="text"
                  required
                  value={form.qty}
                  onChange={handleChange('qty')}
                  placeholder={locale === 'zh-hk' ? '例: 500 張' : locale === 'ja' ? '例: 500 枚' : 'e.g. 500 sheets'}
                  className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-[15px] focus:ring-2 focus:ring-[#2873F5] focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-[#111827] mb-1.5">{d.deadline}</label>
                <input
                  type="text"
                  value={form.deadline}
                  onChange={handleChange('deadline')}
                  placeholder={locale === 'zh-hk' ? '例: 2026-09-15 中午前' : locale === 'ja' ? '例: 2026-09-15 午前中' : 'e.g. by 2026-09-15 noon'}
                  className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-[15px] focus:ring-2 focus:ring-[#2873F5] focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-[#111827] mb-1.5">{d.note}</label>
                <textarea
                  rows={3}
                  value={form.note}
                  onChange={handleChange('note')}
                  className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-[15px] focus:ring-2 focus:ring-[#2873F5] focus:border-transparent"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              data-event="form_submit"
              data-source="rush-printing"
              data-locale={locale}
              className="w-full bg-[#F87314] hover:bg-[#E56203] disabled:bg-gray-400 text-white font-bold rounded-xl px-6 py-4 text-[17px] mt-5 transition-transform active:translate-y-px"
              style={{ boxShadow: '0 8px 24px rgba(248,115,20,.32)' }}
            >
              {submitting ? d.submitting : d.submit}
            </button>
            <p className="mt-4 text-sm text-[#6B7280] text-center leading-[1.6]">
              {locale === 'zh-hk' ? '提交後 15 分鐘內專人以電郵回覆' : locale === 'ja' ? '送信後 15 分以内に専門スタッフがメール返信' : 'Reply by email within 15 minutes after submission'}
            </p>

            {result === 'success' && (
              <div
                role="status"
                className="mt-4 text-center text-green-700 font-bold bg-green-50 border border-green-200 rounded-lg px-4 py-3"
              >
                {d.success}
              </div>
            )}
            {result === 'error' && (
              <div
                role="status"
                className="mt-4 text-center text-red-700 font-bold bg-red-50 border border-red-200 rounded-lg px-4 py-3"
              >
                {d.error}
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
