'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import { useSearchParams } from 'next/navigation'; // 静态导出不能用 useSearchParams，改用 window.location
import { Send, Paperclip, CheckCircle, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import { categories, products, getProductBySlug } from '@/data/products';
import { trackContactFormSubmit } from '@/lib/analytics';
import { generateQuoteRef, generateQuoteSheetLink, generateWhatsAppLink, type QuoteSheetContext } from '@/lib/whatsapp';
import { trackQuoteSubmit, trackQuoteSubmitSuccess, trackQuoteSubmitError } from '@/lib/tracking';
import { getAttribution } from '@/lib/attribution';
import { QuoteTrustBar } from './QuoteTrustBar';

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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'fallback'>('idle');
  const [lastSheet, setLastSheet] = useState<QuoteSheetContext | null>(null);
  const [files, setFiles] = useState<File[]>([]);
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
      messageAttach: '留言與設計稿',
      name: '姓名',
      namePlaceholder: '請輸入您的姓名（選填）',
      phone: '聯絡電話',
      phonePlaceholder: '請輸入手提電話（例如：5123 4567）',
      // 2026-11-19 K3 指令: 紅色粗字 — 必須填手提電話, 固網收不到 WhatsApp
      phoneNote: '請務必填寫手提電話號碼，以便透過 WhatsApp 即時聯絡您（固網電話無法接收 WhatsApp 訊息）',
      email: '電郵地址 (必填)',
      emailPlaceholder: '請輸入常用電郵地址（報價以郵件回覆）',
      emailNote: '報價將通過此電郵回覆, 請務必確認電郵地址正確無誤',
      // 2026-11-19 K3 指令: 紅色粗字 — 回覆郵件可能進垃圾郵件資料夾
      spamNote: '報價回覆郵件可能會被誤判為垃圾郵件，請務必同時檢查垃圾郵件資料夾，以免錯過報價回覆',
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
      // 2026-11-19 K3 拍板: 移除附件上傳模組 (Supabase user-uploads 桶無建置記錄 + uploadToSupabase 類型白名單缺口 + supabase.co 主網絡不可達)
      // 改為 WhatsApp/電郵傳稿指引 — 檔案直達 K3 手機/郵箱, 零靜默丟失
      attachmentGuideTitle: '有設計稿或參考圖？',
      attachmentGuideBody: '為確保您的檔案 100% 送達，請透過 WhatsApp 直接發送（推薦，急單優先處理），或電郵至 zprintpro@outlook.com 並註明您的聯絡電話，以便對應詢盤。',
      attachmentGuideWhatsapp: 'WhatsApp 發送設計稿',
      submit: '獲取免費報價 →',
      submitting: '發送中...',
      successTitle: '✅ 詢價已提交！',
      successDesc: '我們已收到您的需求, 將於 2 小時內通過電郵回覆完整報價單。\n\n請確認上方填寫的電郵地址正確無誤, 我們的回覆會發送到該電郵。\n\n如未在 2 小時內收到回覆, 請檢查垃圾郵件箱, 或直接發郵件至 zprintpro@outlook.com。',
      submitAgain: '再次提交',
      required: '必填',
      fileTooLarge: '單個檔案不能超過10MB',
      maxFiles: '最多只能上傳5個檔案',
      socialProof: '已服務 15,000+ 企業及品牌｜Google 評價 4.9★',
      privacyNote: '您提交的資料僅用於報價，絕不用於其他用途',
      flowLabel: '提交需求 → 2 小時內收報價 → 確認下單生產',
      submitNote: '無需註冊・無需信用卡',
      whatsappShortcut: '急單？直接 WhatsApp 我們',
      trustItems: [
        { icon: 'clock', label: '2 小時內回覆報價' },
        { icon: 'check', label: '免費報價・無隱藏收費' },
        { icon: 'factory', label: '深圳自設廠房・15+ 年印刷經驗' },
        { icon: 'truck', label: '指定產品即日速遞' },
      ],
    },
    en: {
      contactInfo: 'Contact Information',
      printNeeds: 'Printing Requirements',
      messageAttach: 'Message & Design Files',
      name: 'Name',
      namePlaceholder: 'Your name (optional)',
      phone: 'Phone Number',
      phonePlaceholder: 'Enter your phone number',
      phoneNote: 'Please provide a mobile (cell) number, not a landline, so we can reach you on WhatsApp — landlines cannot receive WhatsApp messages.',
      email: 'Email Address (required)',
      emailPlaceholder: 'Your email (quote will be sent here)',
      emailNote: 'We will reply to your quote via this email — please double-check it is correct.',
      spamNote: 'Our quote reply email may be filtered into your spam/junk folder — please also check your spam folder so you do not miss our reply.',
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
      attachmentGuideTitle: 'Have design files or reference images?',
      attachmentGuideBody: 'To make sure your files always reach us, send them directly via WhatsApp (recommended — rush orders get priority), or email zprintpro@outlook.com with your phone number so we can match your inquiry.',
      attachmentGuideWhatsapp: 'Send files via WhatsApp',
      submit: 'Get My Free Quote →',
      submitting: 'Sending...',
      successTitle: '✅ Inquiry Submitted!',
      successDesc: 'We have received your request and will reply with a full quote via EMAIL within 2 hours.\n\nPlease confirm the email address above is correct — that is where our reply will go.\n\nIf you do not hear back within 2 hours, please check your spam/junk folder, or email us directly at zprintpro@outlook.com.',
      submitAgain: 'Submit Another',
      required: 'Required',
      fileTooLarge: 'Each file must not exceed 10MB',
      maxFiles: 'Maximum 5 files allowed',
      socialProof: 'Trusted by 15,000+ businesses in 100+ countries | 4.9★ on Google',
      privacyNote: 'Your submission is used only for quotation purposes and never for other uses.',
      flowLabel: 'Submit your needs → Receive a quote within 2 hours → Confirm production',
      submitNote: 'No signup, no credit card',
      whatsappShortcut: 'In a hurry? Chat on WhatsApp',
      trustItems: [
        { icon: 'clock', label: 'Quote within 2 hours' },
        { icon: 'check', label: 'Free quote, no hidden fees' },
        { icon: 'factory', label: 'Own factory in Asia, 15+ years' },
        { icon: 'truck', label: 'DHL/FedEx 2-4 day delivery' },
      ],
    },
    ja: {
      contactInfo: '連絡先情報',
      printNeeds: '印刷のご要望',
      messageAttach: 'メッセージとデザインファイル',
      name: 'お名前',
      namePlaceholder: 'お名前（任意）',
      phone: '電話番号',
      phonePlaceholder: '電話番号を入力',
      phoneNote: 'WhatsAppで即時にご連絡するため、必ず携帯電話番号（固定電話ではなく）をご記入ください',
      email: 'メールアドレス（必須）',
      emailPlaceholder: 'メールアドレス（見積もりをこちらに送信）',
      emailNote: '見積もりはメールでお送りします。メールアドレスが正しいことをご確認ください。',
      spamNote: 'お見積りの返信メールが迷惑メールフォルダに振り分けられる場合があります。送信後は迷惑メールフォルダも必ずご確認ください',
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
      attachmentGuideTitle: 'デザインファイルや参考画像をお持ちですか？',
      attachmentGuideBody: 'ファイルを確実に受け取れるよう、WhatsAppで直接お送りください（推奨・特急のご注文を優先対応）。またはお電話番号を明記のうえ、zprintpro@outlook.com までメールでお送りください。',
      attachmentGuideWhatsapp: 'WhatsAppでファイルを送る',
      submit: '無料見積もりを取得 →',
      submitting: '送信中...',
      successTitle: '✅ 依頼を送信しました！',
      successDesc: 'ご依頼を受領しました。2時間以内にメールで見積もりをご返信いたします。\n\n上記のメールアドレスが正しいことをご確認ください。返信はそのメールアドレスにお送りします。\n\n2時間以内に返信がない場合は、迷惑メールフォルダをご確認いただくか、zprintpro@outlook.com まで直接ご連絡ください。',
      submitAgain: '再度依頼する',
      required: '必須',
      fileTooLarge: '各ファイルは10MB以下にしてください',
      maxFiles: '最大5ファイルまでアップロード可能です',
      socialProof: '世界100カ国以上・15,000社以上の実績｜Google評価4.9★',
      privacyNote: 'ご提出いただいた情報は見積もりのためにのみ使用し、他用途には使用しません。',
      flowLabel: '要件を送信 → 2時間以内に見積もりを受領 → 生産確認',
      submitNote: '登録不要・カード不要',
      whatsappShortcut: '急ぎの方は WhatsApp で直接ご連絡',
      trustItems: [
        { icon: 'clock', label: '2時間以内に見積回答' },
        { icon: 'check', label: '見積無料・追加料金なし' },
        { icon: 'factory', label: '自社工場・15年以上の実績' },
        { icon: 'truck', label: 'DHL・FedExで2〜4日お届け' },
      ],
    },
  }[locale];

  const t = labels;

  // P0-2 修復（2026-07-17）：成功頁 WhatsApp 加速 + 失敗降級文案
  const ops = {
    'zh-hk': {
      successWhatsapp: '急單？WhatsApp 傳報價單，優先處理',
      fallbackTitle: '系統繁忙，未能直接提交',
      fallbackDesc: '已為您自動打開 WhatsApp，報價內容已填好，發送後我們 2 小時內回覆。如未打開，請點下方按鈕。',
      fallbackCta: 'WhatsApp 發送報價單',
    },
    en: {
      successWhatsapp: 'In a hurry? Send the quote sheet on WhatsApp for priority handling',
      fallbackTitle: 'System busy — could not submit directly',
      fallbackDesc: 'We opened WhatsApp with everything pre-filled. Send it and we will reply within 2 hours. If it did not open, tap the button below.',
      fallbackCta: 'Send Quote via WhatsApp',
    },
    ja: {
      successWhatsapp: 'お急ぎの方はWhatsAppで見積もり依頼を送信（優先対応）',
      fallbackTitle: 'システムが混み合い、直接送信できませんでした',
      fallbackDesc: '入力内容を反映したWhatsAppを開きました。送信いただければ2時間以内にご返信します。開かない場合は下のボタンをご利用ください。',
      fallbackCta: 'WhatsAppで見積もりを送る',
    },
  }[locale];

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // 2026-08-29 K3 拍板: 询盘提交意图 (Supabase tracking_events 009)
    trackQuoteSubmit(productSlug || undefined);

    // 結構化報價單上下文（成功頁 WhatsApp 加速 CTA / 失敗降級共用）
    const productName =
      data.category || prefillCategory ||
      (locale === 'ja' ? '一般お問い合わせ' : locale === 'en' ? 'General Inquiry' : '一般查詢');
    const sheet: QuoteSheetContext = {
      ref: generateQuoteRef(),
      name: data.name || undefined,
      phone: data.phone,
      email: data.email,
      productName,
      size: data.size || undefined,
      quantity: data.quantity || undefined,
      message: data.message,
      source: 'quote-form',
    };
    setLastSheet(sheet);

    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        throw new Error('Supabase not configured');
      }

      // 動態引入：避免 supabase 模塊級 createClient 在 edge SSR 階段被評估
      const { supabase, uploadToSupabase } = await import('@/lib/supabase');

      // 附件 best-effort 上傳（單個失敗不阻塞主流程）
      let fileNote = '';
      if (files.length > 0) {
        const urls: string[] = [];
        for (const file of files) {
          try {
            const r = await uploadToSupabase(file, 'user-uploads', 'quote-attachments');
            urls.push(r.url);
          } catch {
            // 單個附件失敗繼續，主流程不受影響
          }
        }
        fileNote = urls.length > 0
          ? `\n附件：${urls.join(' , ')}`
          : `\n附件（未能上傳，請經 WhatsApp/電郵補發）：${files.map((f) => f.name).join('、')}`;
      }

      const quantityNum = parseInt((data.quantity || '').replace(/[^\d]/g, ''), 10) || 0;

      // Lane O 归因留底 (v10 P0-3): 业务表也留一行 UTM, K3 在 quotes 表可直接看到来源车道
      const attr = getAttribution();
      const utmNote = attr.utmSource
        ? `\nUTM: ${attr.utmSource}/${attr.utmMedium || '-'}/${attr.utmCampaign || '-'}/${attr.utmContent || '-'}`
        : '';

      const { error } = await supabase.from('quotes').insert({
        customer_name: data.name || data.phone,
        customer_email: data.email,
        customer_phone: data.phone,
        product_id: productSlug || 'general-inquiry',
        product_name: productName,
        quantity: quantityNum,
        size: data.size || null,
        design_notes: `[${sheet.ref}] ${data.message}${fileNote}${utmNote}`,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
      });
      if (error) throw error;

      // V3.6 双写 (008) - 度量层, 跨 session 关联 + 归因 + 状态机
      // 动态 import: fire-and-forget, 失败不影响主流程 (Supabase 已落库)
      import('@/lib/quote-tracking').then(({ trackQuoteRequest }) => {
        trackQuoteRequest({
          source: 'quote-form',
          locale,
          customerName: data.name,
          customerEmail: data.email,
          customerPhone: data.phone,
          productSlug: productSlug || undefined,
          productName: productName,
          category: data.category || undefined,
          quantity: data.quantity || undefined,
          size: data.size || undefined,
          message: `[${sheet.ref}] ${data.message}${fileNote}`,
        }).catch(() => { /* 度量失败不影响主流程 */ });
      });

      // 2026-07-20 P0-3 fix v3: 自有 API 路由 + Resend 发信 (FormSubmit → outlook 被微软静默丢弃, 已证实)
      // fire-and-forget, 失败不影响主流程 (Supabase 已落库)
      try {
        await fetch('/api/quote-notify/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ref: sheet.ref,
            name: data.name || '',
            phone: data.phone,
            email: data.email,
            product: productName,
            quantity: data.quantity || '',
            size: data.size || '',
            message: data.message + fileNote,
            locale,
            referrer: document.referrer || '',
          }),
        });
      } catch {
        // 通知失败不影响询盘主流程
      }

      trackContactFormSubmit(files.length > 0);
      // 2026-08-29 K3 拍板: 询盘成功 (Supabase tracking_events 009, 0 PII, ref 跟 008 关联)
      trackQuoteSubmitSuccess(sheet.ref, productSlug || undefined);
      setSubmitStatus('success');
      form.reset();
      setFiles([]);
    } catch {
      // 降級通道：自動打開 WhatsApp，報價單已預填，不讓用戶白填
      window.open(generateQuoteSheetLink(locale, sheet), '_blank', 'noopener,noreferrer');
      setSubmitStatus('fallback');
      // 2026-08-29 K3 拍板: 询盘失败 (Supabase tracking_events 009, 错误类型, 0 PII)
      trackQuoteSubmitError('whatsapp-fallback');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <>
        <div className="rounded-2xl border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-700 mb-2">{t.successTitle}</h3>
        <p className="text-green-600 mb-6">{t.successDesc}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {lastSheet && (
            <a
              href={generateQuoteSheetLink(locale, lastSheet)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[#25D366] hover:bg-[#1EBE5B] text-white rounded-lg font-medium transition-colors"
            >
              {ops.successWhatsapp}
            </a>
          )}
          <button
            onClick={() => setSubmitStatus('idle')}
            className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            {t.submitAgain}
          </button>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} data-cf-analytics="contact_quote_submit" className="space-y-6">
      <div className="space-y-3">
        <QuoteTrustBar items={t.trustItems} />
        <p className="text-center text-[13px] font-medium text-slate-500">{t.socialProof}</p>
      </div>

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
            {/* 2026-11-19 K3 指令: 紅色粗字 — 必須留手提電話, 否則 WhatsApp 聯絡不了 (contact 頁專屬, QuoteForm 僅 contact 使用) */}
            <p className="mt-1.5 flex items-start gap-1.5 text-[13px] font-bold text-red-600">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              <span>{t.phoneNote}</span>
            </p>
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
            <p className="mt-1 flex items-start gap-1.5 text-xs text-gray-400"><svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#F87314]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg><span>{t.emailNote}</span></p>
            {/* 2026-11-19 K3 指令: 紅色粗字 — 報價回覆可能進垃圾郵件, 提醒客戶查收 */}
            <p className="mt-1 flex items-start gap-1.5 text-[13px] font-bold text-red-600">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
              <span>{t.spamNote}</span>
            </p>
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

          {/* 2026-11-19 K3 拍板: 附件上傳模組移除 — Supabase user-uploads 桶無建置記錄 +
              uploadToSupabase 類型白名單不含 ai/psd/zip/rar + supabase.co 主網絡實測不可達 (HTTP 000),
              上傳結果 K3 永遠收不到 → 改為 WhatsApp/電郵傳稿指引 (檔案直達, 零靜默丟失) */}
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
            <p className="text-sm font-bold text-[#333333] mb-1.5 flex items-center gap-1.5">
              <Paperclip className="w-4 h-4 text-[#2873F5] flex-shrink-0" /> {t.attachmentGuideTitle}
            </p>
            <p className="text-[13px] text-gray-600 leading-relaxed">{t.attachmentGuideBody}</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              <a
                href={generateWhatsAppLink(locale, { source: 'contact-attachment-guide' })}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] text-white text-[13px] font-bold px-3 py-2 hover:brightness-105 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" /> {t.attachmentGuideWhatsapp}
              </a>
              <a
                href="mailto:zprintpro@outlook.com"
                className="inline-flex items-center rounded-lg border border-gray-200 bg-white text-[13px] font-semibold text-gray-700 px-3 py-2 hover:border-[#2873F5] hover:text-[#2873F5] transition-colors"
              >
                zprintpro@outlook.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 提交按鈕 */}
      <div className="flex flex-col items-center gap-4">
        {submitStatus === 'fallback' && (
          <div className="w-full rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-center space-y-3">
            <p className="text-amber-700 font-bold flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5" /> {ops.fallbackTitle}
            </p>
            <p className="text-amber-600 text-sm">{ops.fallbackDesc}</p>
            {lastSheet && (
              <a
                href={generateQuoteSheetLink(locale, lastSheet)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#25D366] hover:bg-[#1EBE5B] text-white rounded-lg font-bold transition-colors"
              >
                {ops.fallbackCta}
              </a>
            )}
          </div>
        )}

        <a
          href={generateWhatsAppLink(locale, { source: 'quote-form' })}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
        >
          <MessageCircle className="w-4 h-4" />
          {t.whatsappShortcut}
        </a>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto md:min-w-[280px] py-4 px-10 bg-gradient-to-r from-[#2873F5] to-[#1E5FD1] hover:from-[#1E5FD1] hover:to-[#2873F5] text-white rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          {isSubmitting ? t.submitting : t.submit}
        </button>

        <p className="text-center text-[12.5px] text-slate-500">{t.submitNote}</p>
        <div className="w-full rounded-xl bg-slate-50 px-4 py-3 text-center">
          <p className="text-[12.5px] font-semibold text-slate-700">🔒 {t.privacyNote}</p>
          <p className="mt-1 text-[12.5px] text-slate-500">{t.flowLabel}</p>
        </div>
      </div>
    </form>
    </>
  );
}
