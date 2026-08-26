// 2026-08-26 K3 brief §S7: 底部大 CTA + 双必填表单
// 字段: 姓名/公司/電郵*(必填)/電話或 WhatsApp*(必填)/產品類型*(必填)/數量*(必填)/期望交付時間/備註
// 后端: POST /api/quote → src/lib/whatsapp-inquiry.ts → Supabase quote_requests (commit 3bbf10e 已实证)
// 埋点: form_submit / form_open 接 window.zpTrack

'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { zpTrack } from './zpTrack';
import type { Locale } from '@/lib/seo';

type Props = {
  locale: Locale;
};

const t = (locale: Locale) => {
  const dict = {
    'zh-hk': {
      title: '📩 15 分鐘電郵回覆承諾',
      subtitle: '填妥下列資料,我們 15 分鐘內以電郵回覆您。急件請直接 WhatsApp。',
      name: '姓名',
      company: '公司 (選填)',
      email: '電郵 *',
      phone: '電話或 WhatsApp *',
      product: '產品類型 *',
      qty: '數量 *',
      deadline: '期望交付時間 (選填)',
      note: '備註 (選填)',
      submit: '🚀 提交急件查詢',
      submitting: '提交中...',
      success: '✅ 已收到!15 分鐘內以電郵回覆',
      error: '❌ 提交失敗,請直接 WhatsApp 我們',
      productOptions: [
        '傳單 A4/A5',
        '海報 A1/A2',
        '貼紙 防水 Vinyl',
        '畫冊 騎馬釘',
        '易拉寶 80×200cm',
        '紙袋 (視乎後工)',
        '其他 / 不確定',
      ],
    },
    en: {
      title: '📩 15-Min Email Reply Promise',
      subtitle: 'Fill in below, we reply by email within 15 minutes. Rush orders please WhatsApp directly.',
      name: 'Name',
      company: 'Company (optional)',
      email: 'Email *',
      phone: 'Phone or WhatsApp *',
      product: 'Product Type *',
      qty: 'Quantity *',
      deadline: 'Expected delivery (optional)',
      note: 'Notes (optional)',
      submit: '🚀 Submit Rush Inquiry',
      submitting: 'Submitting...',
      success: '✅ Received! Email reply within 15 minutes',
      error: '❌ Submit failed, please WhatsApp us directly',
      productOptions: [
        'Flyer A4/A5',
        'Poster A1/A2',
        'Sticker waterproof vinyl',
        'Booklet saddle-stitch',
        'Roll-up banner 80×200cm',
        'Paper bag (finishing-dependent)',
        'Other / Not sure',
      ],
    },
    ja: {
      title: '📩 15 分以内にメール返信',
      subtitle: '下記ご記入後、15 分以内にメールでご返信します。特急は直接 WhatsApp でお願いします。',
      name: 'お名前',
      company: '会社 (任意)',
      email: 'メール *',
      phone: '電話または WhatsApp *',
      product: '製品タイプ *',
      qty: '数量 *',
      deadline: 'ご期望納期 (任意)',
      note: '備考 (任意)',
      submit: '🚀 特急お問合わせ送信',
      submitting: '送信中...',
      success: '✅ 受付完了!15 分以内にメール返信',
      error: '❌ 送信失敗,直接 WhatsApp でご連絡ください',
      productOptions: [
        'チラシ A4/A5',
        'ポスター A1/A2',
        'ステッカー 防水 Vinyl',
        '冊子 中綴じ',
        'ロールアップバナー 80×200cm',
        '紙袋 (後加工による)',
        'その他 / 未定',
      ],
    },
  } as const;
  return dict[locale];
};

export default function RushCtaForm({ locale }: Props) {
  const d = t(locale);
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
        source: 'rush-cta-form',
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

    // 必填校验: 電郵 + 電話 + 產品 + 數量
    if (!form.email || !form.phone || !form.product || !form.qty) {
      setResult('error');
      setSubmitting(false);
      return;
    }

    // 邮箱格式
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
          source: 'rush-cta-form',
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
          source: 'rush-cta-form',
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
      className="mb-8 md:mb-12 rounded-2xl bg-gradient-to-br from-blue-50 to-orange-50 border border-blue-100 px-6 py-10 md:px-10 md:py-14"
      data-section="rush-cta-form"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">{d.title}</h2>
      <p className="text-sm md:text-base text-gray-600 mb-6 text-center">{d.subtitle}</p>

      {!formOpen ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            data-event="form_open"
            data-source="rush-printing"
            data-locale={locale}
            className="bg-[#2873F5] hover:bg-[#1e5fd1] text-white font-bold px-8 py-4 rounded-xl shadow-md transition-colors text-base md:text-lg"
          >
            📝 {locale === 'zh-hk' ? '填寫急件查詢表單' : locale === 'ja' ? '特急お問合わせフォームを開く' : 'Open Rush Inquiry Form'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4" data-form="rush-cta">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{d.name}</label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2873F5] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{d.company}</label>
              <input
                type="text"
                value={form.company}
                onChange={handleChange('company')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2873F5] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{d.email}</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={handleChange('email')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2873F5] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{d.phone}</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={handleChange('phone')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2873F5] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">{d.product}</label>
              <select
                required
                value={form.product}
                onChange={handleChange('product') as any}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2873F5] focus:border-transparent"
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
              <label className="block text-sm font-bold text-gray-700 mb-1">{d.qty}</label>
              <input
                type="text"
                required
                value={form.qty}
                onChange={handleChange('qty')}
                placeholder={locale === 'zh-hk' ? '例: 500 張' : locale === 'ja' ? '例: 500 枚' : 'e.g. 500 sheets'}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2873F5] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">{d.deadline}</label>
            <input
              type="text"
              value={form.deadline}
              onChange={handleChange('deadline')}
              placeholder={locale === 'zh-hk' ? '例: 2026-09-15 中午前' : locale === 'ja' ? '例: 2026-09-15 午前中' : 'e.g. by 2026-09-15 noon'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2873F5] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">{d.note}</label>
            <textarea
              rows={3}
              value={form.note}
              onChange={handleChange('note')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2873F5] focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            data-event="form_submit"
            data-source="rush-printing"
            data-locale={locale}
            className="w-full bg-[#2873F5] hover:bg-[#1e5fd1] disabled:bg-gray-400 text-white font-bold px-6 py-4 rounded-xl shadow-md transition-colors text-base md:text-lg"
          >
            {submitting ? d.submitting : d.submit}
          </button>

          {result === 'success' && (
            <div className="text-center text-green-700 font-bold bg-green-50 border border-green-200 rounded-lg px-4 py-3">
              {d.success}
            </div>
          )}
          {result === 'error' && (
            <div className="text-center text-red-700 font-bold bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {d.error}
            </div>
          )}
        </form>
      )}
    </section>
  );
}
