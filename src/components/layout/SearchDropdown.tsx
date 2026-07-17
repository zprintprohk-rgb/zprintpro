'use client';

/**
 * SearchDropdown (2026-06-08 新增)
 * 头部搜索栏 typeahead — 输入即出结果, 不需跳转搜索页
 *
 * 功能:
 * 1. 输入 query → 250ms debounce → fetch /api/search
 * 2. 显示 分类 (顶部) + 产品 (列表) — 点击跳转
 * 3. Enter 键 或 点击 "查看全部结果" → 跳转 /search?q=...
 * 4. 点击 dropdown 外部 / Esc 键 → 关闭
 * 5. 高亮匹配关键词 (用 <mark>)
 *
 * 设计: 不引第三方库, 用原生 React hooks (useState/useEffect/useRef)
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, Loader2, ArrowRight } from 'lucide-react';
import { Locale } from '@/lib/seo';

interface SearchApiResult {
  type: 'product';
  slug: string;
  category_slug: string;
  sku_code: string;
  name: string;
  description: string;
  price_range: string;
  isHot: boolean;
  isNew: boolean;
}

interface SearchApiCategory {
  type: 'category';
  slug: string;
  name: string;
}

interface SearchApiResponse {
  query: string;
  locale: string;
  results: SearchApiResult[];
  categories: SearchApiCategory[];
  total: number;
}

interface SearchDropdownProps {
  locale: Locale;
  placeholder: string;
  searchLabel: string;
  viewAllLabel: string;
  noResultsLabel: string;
  className?: string;
  // mobile vs desktop 样式区分
  variant?: 'desktop' | 'mobile';
}

const translations = {
  'zh-hk': {
    hot: '熱門',
    new: '新品',
    viewAll: (q: string, n: number) => `查看全部 ${n} 個 "${q}" 結果`,
    noResults: '沒有相關結果, 試試其他關鍵字?',
    tryPopular: '熱門搜尋:',
  },
  en: {
    hot: 'Hot',
    new: 'New',
    viewAll: (q: string, n: number) => `View all ${n} results for "${q}"`,
    noResults: 'No results found. Try other keywords?',
    tryPopular: 'Popular:',
  },
  ja: {
    hot: '人気',
    new: '新着',
    viewAll: (q: string, n: number) => `"${q}" の検索結果 ${n}件すべてを見る`,
    noResults: '結果が見つかりません。他のキーワードをお試しください。',
    tryPopular: '人気検索:',
  },
};

const popularQueries: Record<string, string[]> = {
  'zh-hk': ['宣傳單張', '貼紙', '紙袋', '包裝盒', '標籤'],
  en: ['Flyers', 'Stickers', 'Paper Bags', 'Packaging', 'Labels'],
  ja: ['チラシ', 'ステッカー', '紙袋', 'パッケージ', 'ラベル'],
};

export function SearchDropdown({
  locale,
  placeholder,
  searchLabel,
  viewAllLabel,
  noResultsLabel,
  className = '',
  variant = 'desktop',
}: SearchDropdownProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchApiResult[]>([]);
  const [categories, setCategories] = useState<SearchApiCategory[]>([]);
  const [total, setTotal] = useState(0);
  const [highlightIdx, setHighlightIdx] = useState(-1);

  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const t = translations[locale];

  // Debounced fetch (250ms) — 用户停止输入后才请求, 减少 API 调用
  const fetchResults = useCallback(
    async (q: string) => {
      if (!q.trim()) {
        setResults([]);
        setCategories([]);
        setTotal(0);
        setIsLoading(false);
        return;
      }

      // 取消上一次未完成请求
      if (abortRef.current) abortRef.current.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(q)}&locale=${locale}`,
          { signal: ctrl.signal }
        );
        if (!res.ok) throw new Error('Search API error');
        const data: SearchApiResponse = await res.json();
        setResults(data.results);
        setCategories(data.categories);
        setTotal(data.total);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('[SearchDropdown] fetch error:', err);
          setResults([]);
          setCategories([]);
          setTotal(0);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [locale]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchResults(query);
    }, 250);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchResults]);

  // 点击外部关闭
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Escape 关闭
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen]);

  // 合并扁平列表 (categories 在前, 然后 products) — 用于键盘上下导航
  const flatItems = [
    ...categories.map((c) => ({ kind: 'category' as const, data: c })),
    ...results.map((p) => ({ kind: 'product' as const, data: p })),
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIdx((idx) => Math.min(idx + 1, flatItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIdx((idx) => Math.max(idx - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightIdx >= 0 && flatItems[highlightIdx]) {
        const item = flatItems[highlightIdx];
        const href =
          item.kind === 'category'
            ? `/${locale}/category/${item.data.slug}/`
            : `/${locale}/product/${item.data.slug}/`;
        router.push(href);
        setIsOpen(false);
      } else if (query.trim()) {
        router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
        setIsOpen(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setCategories([]);
    setTotal(0);
    setHighlightIdx(-1);
    inputRef.current?.focus();
  };

  const handlePopularClick = (q: string) => {
    setQuery(q);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  // 高亮匹配的关键词
  const highlightMatch = (text: string, q: string): React.ReactNode => {
    if (!q.trim()) return text;
    const lower = text.toLowerCase();
    const lowerQ = q.toLowerCase();
    const idx = lower.indexOf(lowerQ);
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-yellow-200 text-gray-900 font-semibold px-0.5 rounded">
          {text.slice(idx, idx + lowerQ.length)}
        </mark>
        {text.slice(idx + lowerQ.length)}
      </>
    );
  };

  const isMobile = variant === 'mobile';
  const showDropdown = isOpen && query.trim().length > 0;
  const showPopular = isOpen && query.trim().length === 0;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className={isMobile ? '' : 'flex'}>
        <div className={`relative w-full`}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setHighlightIdx(-1);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={
              isMobile
                ? 'w-full pl-4 pr-12 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2873F5] focus:ring-1 focus:ring-[#2873F5] text-sm'
                : 'w-full pl-4 pr-24 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#2873F5] focus:ring-1 focus:ring-[#2873F5] text-sm'
            }
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-20 top-0 h-full px-2 text-gray-400 hover:text-gray-600"
              aria-label="Clear"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {isLoading && (
            <div className="absolute right-20 top-0 h-full flex items-center pointer-events-none">
              <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
            </div>
          )}
          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-5 bg-[#F87314] hover:bg-[#E56203] text-white rounded-r-lg flex items-center gap-1.5 transition-colors text-sm font-medium"
            aria-label={searchLabel}
          >
            <Search className="w-4 h-4" />
            {!isMobile && <span className="hidden lg:inline">{searchLabel}</span>}
          </button>
        </div>
      </form>

      {/* === Typeahead Dropdown === */}
      {(showDropdown || showPopular) && (
        <div
          className={`absolute z-50 ${
            isMobile ? 'left-0 right-0 mt-2' : 'left-0 right-0 mt-2'
          } bg-white border border-gray-200 rounded-lg shadow-2xl overflow-hidden`}
          style={{ maxHeight: '70vh', overflowY: 'auto' }}
        >
          {/* === 热门搜索 (空 query 时显示) === */}
          {showPopular && (
            <div className="p-4">
              <div className="text-xs font-semibold text-gray-500 mb-2">
                {t.tryPopular}
              </div>
              <div className="flex flex-wrap gap-2">
                {popularQueries[locale].map((q) => (
                  <button
                    key={q}
                    onClick={() => handlePopularClick(q)}
                    className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-[#2873F5] hover:text-white text-gray-700 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* === 搜索结果 === */}
          {showDropdown && (
            <>
              {/* 分类结果 */}
              {categories.length > 0 && (
                <div className="border-b border-gray-100">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                    {locale === 'en' ? 'Categories' : locale === 'ja' ? 'カテゴリ' : '分類'}
                  </div>
                  {categories.map((cat, idx) => {
                    const flatIdx = idx;
                    return (
                      <Link
                        key={cat.slug}
                        href={`/${locale}/category/${cat.slug}/`}
                        onClick={() => setIsOpen(false)}
                        onMouseEnter={() => setHighlightIdx(flatIdx)}
                        className={`flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors ${
                          highlightIdx === flatIdx ? 'bg-gray-50' : ''
                        }`}
                      >
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-[#2873F5]/10 to-[#F87314]/10 flex items-center justify-center flex-shrink-0">
                          <Search className="w-4 h-4 text-[#2873F5]" />
                        </div>
                        <span className="text-sm text-gray-800 flex-1">
                          {highlightMatch(cat.name, query)}
                        </span>
                        <span className="text-xs text-gray-400">
                          {locale === 'en' ? 'Category' : locale === 'ja' ? 'カテゴリ' : '分類'}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* 产品结果 */}
              {results.length > 0 && (
                <div>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                    {locale === 'en' ? 'Products' : locale === 'ja' ? '製品' : '產品'}
                  </div>
                  {results.map((p, idx) => {
                    const flatIdx = categories.length + idx;
                    return (
                      <Link
                        key={p.sku_code}
                        href={`/${locale}/product/${p.slug}/`}
                        onClick={() => setIsOpen(false)}
                        onMouseEnter={() => setHighlightIdx(flatIdx)}
                        className={`flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors ${
                          highlightIdx === flatIdx ? 'bg-gray-50' : ''
                        }`}
                      >
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-[#F87314]/10 to-[#2873F5]/10 flex items-center justify-center flex-shrink-0">
                          <Search className="w-4 h-4 text-[#F87314]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-800 truncate">
                              {highlightMatch(p.name, query)}
                            </span>
                            {p.isHot && (
                              <span className="text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded">
                                {t.hot}
                              </span>
                            )}
                            {p.isNew && (
                              <span className="text-[10px] font-bold text-white bg-emerald-500 px-1.5 py-0.5 rounded">
                                {t.new}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 truncate mt-0.5">
                            {p.description}
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {p.price_range}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* 无结果 */}
              {!isLoading && results.length === 0 && categories.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-sm text-gray-500">{noResultsLabel}</p>
                </div>
              )}

              {/* 查看全部 */}
              {total > 0 && (
                <Link
                  href={`/${locale}/search?q=${encodeURIComponent(query.trim())}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-[#2873F5] border-t border-gray-100 transition-colors"
                >
                  {t.viewAll(query, total)} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
