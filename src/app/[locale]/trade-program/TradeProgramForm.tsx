'use client';

/**
 * TradeProgramForm — B2B Trade Program 申请表单 (P1.2)
 * 5 字段: fullName / email / company / website (optional) / useCase / monthlyVolume
 * 提交 → /api/trade-apply → persist + ops notification
 * 成功后显示绿勾 + 7 天等待
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
      const res = await fetch('/api/trade-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Application failed');
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
