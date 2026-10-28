'use client';

/**
 * SKU 客戶評價区 (K3 2026-10-28 方案A · A1批)
 * - 只显示 approved 評價 (GET /api/reviews → RLS approved-only 雙保險)
 * - 提交 → pending → Supabase Studio 審核 (status: approved/rejected) → 前台可見
 * - fail-closed: API 404 (遷移未 apply / 功能未啟用) → 整段隐藏, 零视觉噪音
 * - 紅線: 不展示任何未審核内容; 不输出 aggregateRating schema (星級管线 = product-reviews.ts 唯一入口, ≥3 条真实評價才啟用)
 */
import { useEffect, useState } from 'react';

type Review = {
  author: string;
  rating: number;
  title: string | null;
  body: string;
  created_at: string;
};

type Locale = 'zh-hk' | 'en' | 'ja';

const T: Record<Locale, Record<string, string>> = {
  'zh-hk': {
    heading: '客戶評價',
    count: '條',
    empty: '暫無評價——成為第一個留下評價的客戶',
    formTitle: '留下你的評價',
    yourRating: '你的評分',
    name: '你的稱呼（可選）',
    namePlaceholder: '匿名',
    body: '評價內容（至少 10 字）',
    bodyPlaceholder: '印刷品質、交期、服務體驗……',
    consent: '我同意公開展示此評價',
    submit: '提交評價',
    submitting: '提交中……',
    done: '已提交！審核通過後會顯示在頁面',
    duplicate: '今日已提交過評價，明天再來吧',
    failed: '提交失敗，請稍後再試',
    anonymous: '匿名',
  },
  en: {
    heading: 'Customer Reviews',
    count: 'reviews',
    empty: 'No reviews yet — be the first to share your experience',
    formTitle: 'Write a review',
    yourRating: 'Your rating',
    name: 'Your name (optional)',
    namePlaceholder: 'Anonymous',
    body: 'Your review (min 10 characters)',
    bodyPlaceholder: 'Print quality, turnaround, service…',
    consent: 'I agree to have this review published',
    submit: 'Submit review',
    submitting: 'Submitting…',
    done: 'Submitted! It will appear once approved.',
    duplicate: 'You already submitted a review today — please come back tomorrow.',
    failed: 'Something went wrong, please try again later',
    anonymous: 'Anonymous',
  },
  ja: {
    heading: 'レビュー',
    count: '件',
    empty: 'まだレビューはありません。最初のレビューを書きましょう',
    formTitle: 'レビューを書く',
    yourRating: '評価',
    name: 'お名前（任意）',
    namePlaceholder: '匿名',
    body: 'レビュー本文（10文字以上）',
    bodyPlaceholder: '印刷品質・納期・対応など……',
    consent: 'このレビューの公開に同意します',
    submit: '送信する',
    submitting: '送信中……',
    done: '送信しました！承認後に表示されます',
    duplicate: '本日は既に送信済みです。また明日お越しください',
    failed: '送信に失敗しました。後でもう一度お試しください',
    anonymous: '匿名',
  },
};

function Stars({ value, size }: { value: number; size: 'sm' | 'lg' }) {
  const cls = size === 'lg' ? 'text-2xl' : 'text-base';
  return (
    <span className={`${cls} tracking-wide`} aria-label={`${value}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= value ? 'text-amber-500' : 'text-gray-300'}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function SkuReviews({ slug, locale }: { slug: string; locale: Locale }) {
  const t = T[locale] ?? T['zh-hk'];
  const [available, setAvailable] = useState<boolean | null>(null); // null = loading
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'duplicate' | 'failed'>('idle');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/api/reviews?slug=${encodeURIComponent(slug)}&locale=${locale}`);
        if (!alive) return;
        if (!res.ok) {
          setAvailable(false); // 404 = 功能未啟用 → 整段隐藏
          return;
        }
        const json = await res.json();
        if (!alive) return;
        setReviews(Array.isArray(json.reviews) ? json.reviews : []);
        setAvailable(true);
      } catch {
        if (alive) setAvailable(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [slug, locale]);

  if (available === null || available === false) return null;

  async function submit() {
    if (status === 'submitting') return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, locale, rating, author, body, consent, website: '' }),
      });
      if (res.status === 409) {
        setStatus('duplicate');
        return;
      }
      if (!res.ok) {
        setStatus('failed');
        return;
      }
      setStatus('done');
      setRating(0);
      setBody('');
      setConsent(false);
    } catch {
      setStatus('failed');
    }
  }

  const inputCls =
    'w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#1D3465]';

  return (
    <section className="mt-16 pt-10 border-t border-gray-200" aria-label={t.heading}>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 md:p-8">
        <div className="flex items-baseline gap-3 mb-5">
          <h2 className="text-xl md:text-2xl font-bold text-[#1D3465]">{t.heading}</h2>
          <span className="text-sm text-gray-500">
            {reviews.length} {t.count}
          </span>
        </div>

        {/* 評價列表 (仅 approved) */}
        {reviews.length === 0 ? (
          <p className="text-sm text-gray-500 mb-6">{t.empty}</p>
        ) : (
          <ul className="space-y-4 mb-6">
            {reviews.map((r, i) => (
              <li key={i} className="rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <span className="text-sm font-semibold text-gray-800">
                    {r.author || t.anonymous}
                  </span>
                  <Stars value={r.rating} size="sm" />
                </div>
                {r.title ? <p className="text-sm font-medium text-[#1D3465] mb-1">{r.title}</p> : null}
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{r.body}</p>
                <p className="text-xs text-gray-400 mt-1.5">{r.created_at.slice(0, 10)}</p>
              </li>
            ))}
          </ul>
        )}

        {/* 提交表单 */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-base font-semibold text-[#1D3465] mb-3">{t.formTitle}</h3>

          {status === 'done' ? (
            <p className="text-sm font-medium text-emerald-700 bg-emerald-50 rounded-xl px-4 py-3">{t.done}</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void submit();
              }}
              className="space-y-3"
            >
              {/* 蜜罐 (隐藏) */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <div>
                <p className="text-sm text-gray-600 mb-1.5">{t.yourRating}</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setRating(i)}
                      aria-label={`${i}/5`}
                      className={`text-2xl leading-none transition-colors ${i <= rating ? 'text-amber-500' : 'text-gray-300 hover:text-amber-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                maxLength={40}
                placeholder={`${t.name} · ${t.namePlaceholder}`}
                className={inputCls}
              />

              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                minLength={10}
                maxLength={1000}
                rows={4}
                required
                placeholder={t.bodyPlaceholder}
                aria-label={t.body}
                className={inputCls}
              />

              <label className="flex items-start gap-2 text-xs text-gray-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 accent-[#1D3465]"
                />
                <span>{t.consent}</span>
              </label>

              <button
                type="submit"
                disabled={status === 'submitting' || rating < 1 || body.trim().length < 10 || !consent}
                className="rounded-xl bg-[#1D3465] px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#2873F5] transition-colors"
              >
                {status === 'submitting' ? t.submitting : t.submit}
              </button>

              {status === 'duplicate' && <p className="text-xs text-amber-600">{t.duplicate}</p>}
              {status === 'failed' && <p className="text-xs text-red-600">{t.failed}</p>}
            </form>
          )}
        </div>
          </div>
      </div>
    </section>
  );
}
