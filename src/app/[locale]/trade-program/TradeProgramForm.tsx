'use client';

/**
 * TradeProgramForm — B2B Trade Program 申请表单 (P1.2 v2 — Formspree edge-compatible)
 * 6 字段: fullName / email / company / website (optional) / useCase / monthlyVolume
 * 提交 → Formspree 公开 form (browser 直接 POST, 无自家 API route)
 * 2026-07-09 v2: 改用 Formspree 替代 Resend (B 方案, 避免 CF Pages edge runtime 限製)
 *
 * Setup: user 在 formspree.io 注册 → 拿 form ID → 替换 FORMSPREE_FORM_ID
 * 免费 plan 50 submissions/月 (P1.2 B2B 通常低流量足够)
 */

import { useState } from 'react';
import { CheckCircle2, AlertCircle, Send, Briefcase, Globe, Building2, TrendingUp, MessageSquare } from 'lucide-react';
import { Locale } from '@/types/locale';

interface TradeProgramFormProps {
  copy: {
    fullName: string;
    email: string;
    company: string;
    website: string;
    useCase: string;
    monthlyVolume: string;
    volumeOptions: string[];
    submit: string;
    submitting: string;
    success: string;
    successSub: string;
  };
  locale: Locale;
}

// v2: Formspree 公开 form (B 方案)
// user 注册 formspree.io → 拿 form ID → 替换 placeholder
const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_TRADE_ID || 'mqkrvvzg';

export function TradeProgramForm({ copy, locale }: TradeProgramFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    company: '',
    website: '',
    useCase: '',
    monthlyVolume: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.fullName || !form.email || !form.company || !form.useCase || !form.monthlyVolume) {
      setError(locale === 'zh-hk' ? '請填寫所有必填字段' : locale === 'ja' ? '必須項目をすべてご記入ください' : 'Please fill in all required fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError(locale === 'zh-hk' ? '請輸入有效電郵' : locale === 'ja' ? '有効なメールを入力' : 'Please enter a valid email');
      return;
    }

    setSubmitting(true);

    try {
      // v2: Formspree edge-compatible (no API route, direct browser POST)
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          locale,
          _subject: `[ZprintPro Trade Program] ${form.company} (${form.email})`,
        }),
      });
      if (!res.ok) {
        throw new Error('Application failed');
      }
      setSubmitted(true);
    } catch (err) {
      setError(locale === 'zh-hk' ? '提交失敗, 請稍後再試' : locale === 'ja' ? '送信失敗。後でもう一度お試しください' : 'Submission failed, please try again');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border-2 border-emerald-300 p-8 md:p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{copy.success}</h3>
        <p className="text-sm md:text-base text-slate-600 max-w-md mx-auto">{copy.successSub}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            <Briefcase className="w-4 h-4 inline mr-1" /> {copy.fullName} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
            minLength={2}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#2873F5] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            <MessageSquare className="w-4 h-4 inline mr-1" /> {copy.email} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#2873F5] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            <Building2 className="w-4 h-4 inline mr-1" /> {copy.company} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            required
            minLength={2}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#2873F5] focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            <Globe className="w-4 h-4 inline mr-1" /> {copy.website}
          </label>
          <input
            type="url"
            name="website"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
            placeholder="https://"
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#2873F5] focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          {copy.useCase} <span className="text-red-500">*</span>
        </label>
        <textarea
          name="useCase"
          value={form.useCase}
          onChange={(e) => setForm({ ...form, useCase: e.target.value })}
          required
          minLength={10}
          rows={4}
          className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#2873F5] focus:ring-2 focus:ring-blue-100 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          <TrendingUp className="w-4 h-4 inline mr-1" /> {copy.monthlyVolume} <span className="text-red-500">*</span>
        </label>
        <select
          name="monthlyVolume"
          value={form.monthlyVolume}
          onChange={(e) => setForm({ ...form, monthlyVolume: e.target.value })}
          required
          className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#2873F5] focus:ring-2 focus:ring-blue-100 bg-white"
        >
          <option value="">--</option>
          {copy.volumeOptions.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#2873F5] hover:bg-[#1E5BD6] disabled:bg-slate-300 text-white font-bold py-3.5 px-4 rounded-xl text-base transition-colors shadow-md flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            {copy.submitting}
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            {copy.submit}
          </>
        )}
      </button>
    </form>
  );
}
