'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import { useSearchParams } from 'next/navigation'; // 静态导出不能用 useSearchParams，改用 window.location
import { Send, Paperclip, CheckCircle, AlertCircle, Upload, X, Loader2 } from 'lucide-react';
import { categories, products, getProductBySlug } from '@/data/products';
import { trackContactFormSubmit } from '@/lib/analytics';

const quoteSchema = z.object({
  name: z.string().optional(),
  phone: z.string().min(1, '請輸入聯絡電話'),
  email: z.string().min(1, '請輸入電郵地址').email('請輸入有效的電郵地址'),
  category: z.string().optional(),
  quantity: z.string().optional(),
  size: z.string().optional(),
  message: z.string().min(1, '請輸入留言內容'),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

interface QuoteFormProps {
  locale?: 'zh-hk' | 'en' | 'ja';
}

export function QuoteForm({ locale = 'zh-hk' }: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [productSlug, setProductSlug] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setProductSlug(params.get('product'));
    }
  }, []);

  const prefillProduct = productSlug ? getProductBySlug(productSlug) : null;
  const prefillCategory = prefillProduct
    ? (locale === 'zh-hk' ? prefillProduct.name : locale === 'en' ? (prefillProduct.nameEn || prefillProduct.name) : (prefillProduct.nameJa || prefillProduct.name))
    : '';

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      category: prefillCategory,
      quantity: prefillProduct?.minQuantity ? String(prefillProduct.minQuantity) : '',
      size: '',
      message: prefillProduct
        ? (locale === 'zh-hk'
            ? `我想查詢 ${prefillProduct.name} 的報價，請提供更多詳情。`
            : locale === 'en'
            ? `I would like to get a quote for ${prefillProduct.nameEn || prefillProduct.name}. Please provide more details.`
            : `${prefillProduct.nameJa || prefillProduct.name}の見積もりをお願いしたいです。詳細を教えてください。`)
        : '',
    },
  });

  useEffect(() => {
    if (prefillCategory) {
      form.setValue('category', prefillCategory);
    }
    if (prefillProduct?.minQuantity) {
      form.setValue('quantity', String(prefillProduct.minQuantity));
    }
    const msg = prefillProduct
      ? (locale === 'zh-hk'
          ? `我想查詢 ${prefillProduct.name} 的報價，請提供更多詳情。`
          : locale === 'en'
          ? `I would like to get a quote for ${prefillProduct.nameEn || prefillProduct.name}. Please provide more details.`
          : `${prefillProduct.nameJa || prefillProduct.name}の見積もりをお願いしたいです。詳細を教えてください。`)
      : '';
    if (msg) {
      form.setValue('message', msg);
    }
  }, [prefillCategory, prefillProduct, form, locale]);

  const labels = {
    'zh-hk': {
      contactInfo: '聯絡資訊',
      printNeeds: '印刷需求',
      messageAttach: '留言與附件',
      name: '姓名',
      namePlaceholder: '請輸入您的姓名（選填）',
      phone: '聯絡電話',
      phonePlaceholder: '請輸入手提電話（例如：5123 4567）',
      email: '電郵地址',
      emailPlaceholder: '請輸入常用電郵地址（報價以郵件回覆）',
      emailNote: '報價將以郵件回覆，請確保郵箱可用',
      category: '產品類型',
      categoryPlaceholder: '請選擇產品類型',
      quantity: '印刷數量',
      quantityPlaceholder: '例如：500張、1000個',
      size: '尺寸規格',
      sizePlaceholder: '例如：A4、90×54mm',
      message: '留言內容',
      messagePlaceholder: '請詳細說明印刷需求：例如品類、紙質、工藝要求、交貨時間等...',
      attachment: '附件上傳',
      attachmentNote: '拖拽設計稿至此，或點擊上傳',
      submit: '提交詢價',
      submitting: '發送中...',
      successTitle: '詢價已提交！',
      successDesc: '我們已收到您的需求，將在24小時內以郵件回覆報價。',
      submitAgain: '再次提交',
      required: '必填',
      fileTooLarge: '單個檔案不能超過10MB',
      maxFiles: '最多只能上傳5個檔案',
    },
    en: {
      contactInfo: 'Contact Information',
      printNeeds: 'Printing Requirements',
      messageAttach: 'Message & Attachments',
      name: 'Name',
      namePlaceholder: 'Your name (optional)',
      phone: 'Phone Number',
      phonePlaceholder: 'Enter your phone number',
      email: 'Email Address',
      emailPlaceholder: 'Your email (quote will be sent here)',
      emailNote: 'Quote will be sent via email',
      category: 'Product Type',
      categoryPlaceholder: 'Select product type',
      quantity: 'Quantity',
      quantityPlaceholder: 'e.g. 500 pcs, 1000 pcs',
      size: 'Size / Specs',
      sizePlaceholder: 'e.g. A4, 90×54mm',
      message: 'Message',
      messagePlaceholder: 'Please describe your printing needs: product type, paper, finishing, delivery time...',
      attachment: 'Attachment Upload',
      attachmentNote: 'Drag & drop design files, or click to upload',
      submit: 'Submit Inquiry',
      submitting: 'Sending...',
      successTitle: 'Inquiry Submitted!',
      successDesc: 'We have received your request and will reply with a quote within 24 hours.',
      submitAgain: 'Submit Another',
      required: 'Required',
      fileTooLarge: 'Each file must not exceed 10MB',
      maxFiles: 'Maximum 5 files allowed',
    },
    ja: {
      contactInfo: '連絡先情報',
      printNeeds: '印刷のご要望',
      messageAttach: 'メッセージと添付ファイル',
      name: 'お名前',
      namePlaceholder: 'お名前（任意）',
      phone: '電話番号',
      phonePlaceholder: '電話番号を入力',
      email: 'メールアドレス',
      emailPlaceholder: 'メールアドレス（見積もりをこちらに送信）',
      emailNote: '見積もりはメールで送信します',
      category: '製品タイプ',
      categoryPlaceholder: '製品タイプを選択',
      quantity: '数量',
      quantityPlaceholder: '例：500枚、1000個',
      size: 'サイズ・仕様',
      sizePlaceholder: '例：A4、90×54mm',
      message: 'メッセージ',
      messagePlaceholder: '印刷のご要望を詳しくご記入ください：製品、紙質、加工、納期など...',
      attachment: 'ファイル添付',
      attachmentNote: 'ドラッグ&ドロップでデザインファイルをアップロード',
      submit: 'お見積もり依頼',
      submitting: '送信中...',
      successTitle: '依頼を送信しました！',
      successDesc: '24時間以内にメールで見積もりをご返信いたします。',
      submitAgain: '再度依頼する',
      required: '必須',
      fileTooLarge: '各ファイルは10MB以下にしてください',
      maxFiles: '最大5ファイルまでアップロード可能です',
    },
  }[locale];

  const t = labels;

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const valid = selected.filter((f) => {
      if (f.size > 10 * 1024 * 1024) {
        alert(t.fileTooLarge);
        return false;
      }
      return true;
    });
    setFiles((prev) => {
      const combined = [...prev, ...valid];
      if (combined.length > 5) {
        alert(t.maxFiles);
        return prev;
      }
      return combined;
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [t]);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = new FormData();
      formData.append('name', data.name || '');
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('category', data.category || '');
      formData.append('quantity', data.quantity || '');
      formData.append('size', data.size || '');
      formData.append('message', data.message);
      formData.append('locale', locale);
      files.forEach((file) => formData.append('attachments', file));

      const res = await fetch('/api/send-quote-email', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (result.success) {
        trackContactFormSubmit(files.length > 0);
        setSubmitStatus('success');
        form.reset();
        setFiles([]);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-700 mb-2">{t.successTitle}</h3>
        <p className="text-green-600 mb-6">{t.successDesc}</p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
        >
          {t.submitAgain}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      {/* ===== 聯絡資訊 ===== */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">1</span>
          </div>
          <h3 className="text-lg font-bold text-[#333333]">{t.contactInfo}</h3>
        </div>

        <div className="space-y-5">
          {/* 姓名 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t.name}
            </label>
            <input
              {...form.register('name')}
              type="text"
              placeholder={t.namePlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2873F5] focus:ring-2 focus:ring-[#2873F5]/20 outline-none transition-all text-base"
            />
          </div>

          {/* 電話 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t.phone} <span className="text-red-500">*</span>
            </label>
            <input
              {...form.register('phone')}
              type="tel"
              placeholder={t.phonePlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2873F5] focus:ring-2 focus:ring-[#2873F5]/20 outline-none transition-all text-base"
            />
            {form.formState.errors.phone && (
              <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          {/* 電郵 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t.email} <span className="text-red-500">*</span>
            </label>
            <input
              {...form.register('email')}
              type="email"
              placeholder={t.emailPlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2873F5] focus:ring-2 focus:ring-[#2873F5]/20 outline-none transition-all text-base"
            />
            <p className="mt-1 text-xs text-gray-400">{t.emailNote}</p>
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {form.formState.errors.email.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ===== 印刷需求 ===== */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
            <span className="text-amber-600 font-bold text-sm">2</span>
          </div>
          <h3 className="text-lg font-bold text-[#333333]">{t.printNeeds}</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* 產品類型 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.category}</label>
            <select
              {...form.register('category')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2873F5] focus:ring-2 focus:ring-[#2873F5]/20 outline-none transition-all text-base bg-white"
            >
              <option value="">{t.categoryPlaceholder}</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.name}>
                  {locale === 'zh-hk' ? cat.name : locale === 'en' ? (cat.nameEn || cat.name) : (cat.nameJa || cat.name)}
                </option>
              ))}
            </select>
          </div>

          {/* 數量 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.quantity}</label>
            <input
              {...form.register('quantity')}
              type="text"
              placeholder={t.quantityPlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2873F5] focus:ring-2 focus:ring-[#2873F5]/20 outline-none transition-all text-base"
            />
          </div>

          {/* 尺寸 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.size}</label>
            <input
              {...form.register('size')}
              type="text"
              placeholder={t.sizePlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2873F5] focus:ring-2 focus:ring-[#2873F5]/20 outline-none transition-all text-base"
            />
          </div>
        </div>
      </div>

      {/* ===== 留言與附件 ===== */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
            <span className="text-purple-600 font-bold text-sm">3</span>
          </div>
          <h3 className="text-lg font-bold text-[#333333]">{t.messageAttach}</h3>
        </div>

        <div className="space-y-5">
          {/* 留言 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {t.message} <span className="text-red-500">*</span>
            </label>
            <textarea
              {...form.register('message')}
              rows={5}
              placeholder={t.messagePlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2873F5] focus:ring-2 focus:ring-[#2873F5]/20 outline-none transition-all text-base resize-none"
            />
            {form.formState.errors.message && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {form.formState.errors.message.message}
              </p>
            )}
          </div>

          {/* 附件上傳 — 拖拽區 (2026-06-08 美化) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.attachment}</label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.ai,.psd,.png,.jpg,.jpeg,.zip,.rar"
                className="hidden"
                onChange={handleFileChange}
              />
              <Upload className="text-3xl text-slate-300 mx-auto mb-2 w-8 h-8" />
              <p className="text-sm font-medium text-slate-700">{t.attachmentNote}</p>
              <p className="text-xs text-slate-400 mt-1">PDF / AI / PSD / PNG / JPG（單個最大10MB，最多5個檔案）</p>
            </div>

            {files.length > 0 && (
              <div className="mt-3 space-y-2">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Paperclip className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-600 truncate">{file.name}</span>
                      <span className="text-xs text-gray-400 flex-shrink-0">({(file.size / 1024 / 1024).toFixed(1)}MB)</span>
                    </div>
                    <button type="button" onClick={() => removeFile(idx)} className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0">
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 提交按鈕 */}
      <div className="flex flex-col items-center gap-4">
        {submitStatus === 'error' && (
          <div className="flex items-center gap-2 text-red-500 bg-red-50 px-4 py-2 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-medium">發送失敗，請稍後重試</span>
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto md:min-w-[280px] py-4 px-10 bg-gradient-to-r from-[#2873F5] to-[#1E5FD1] hover:from-[#1E5FD1] hover:to-[#2873F5] text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          {isSubmitting ? t.submitting : t.submit}
        </button>
      </div>
    </form>
  );
}
