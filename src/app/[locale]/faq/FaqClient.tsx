'use client';

import { useState, useMemo } from 'react';
import { Search, Mail, Phone, ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

interface FaqClientProps {
  items: FaqItem[];
  t: {
    searchPlaceholder: string;
    noResults: string;
    contactCta: string;
    contactDesc: string;
    email: string;
    phone: string;
  };
}

const categoryColors: Record<string, string> = {
  '訂購': 'bg-blue-50 text-blue-600',
  'Ordering': 'bg-blue-50 text-blue-600',
  '注文': 'bg-blue-50 text-blue-600',
  '付款': 'bg-emerald-50 text-emerald-600',
  'Payment': 'bg-emerald-50 text-emerald-600',
  '支払い': 'bg-emerald-50 text-emerald-600',
  '送貨': 'bg-orange-50 text-orange-600',
  'Shipping': 'bg-orange-50 text-orange-600',
  '配送': 'bg-orange-50 text-orange-600',
  '品質': 'bg-purple-50 text-purple-600',
  'Quality': 'bg-purple-50 text-purple-600',
  '產品': 'bg-pink-50 text-pink-600',
  'Product': 'bg-pink-50 text-pink-600',
  '製品': 'bg-pink-50 text-pink-600',
  '設計': 'bg-cyan-50 text-cyan-600',
  'Design': 'bg-cyan-50 text-cyan-600',
  'デザイン': 'bg-cyan-50 text-cyan-600',
  '文件': 'bg-gray-50 text-gray-600',
  'Files': 'bg-gray-50 text-gray-600',
  'ファイル': 'bg-gray-50 text-gray-600',
  '退換': 'bg-red-50 text-red-600',
  'Returns': 'bg-red-50 text-red-600',
  '返品': 'bg-red-50 text-red-600',
};

export default function FaqClient({ items, t }: FaqClientProps) {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter((item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q));
  }, [search, items]);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#2873F5]/30 focus:border-[#2873F5] transition-all shadow-sm"
          />
        </div>
      </div>

      {/* FAQ Items */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filtered.map((item, idx) => {
          const isOpen = openIndex === idx;
          const catColor = categoryColors[item.category] || 'bg-gray-50 text-gray-600';
          return (
            <div
              key={idx}
              className={`bg-white rounded-xl border transition-all duration-200 ${isOpen ? 'border-[#2873F5]/30 shadow-md shadow-[#2873F5]/5' : 'border-gray-100 hover:border-gray-200'}`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-start gap-3 px-5 py-4 text-left"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#2873F5] text-white text-xs flex items-center justify-center font-bold mt-0.5">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-md ${catColor}`}>
                      {item.category}
                    </span>
                    <h3 className={`font-semibold text-lg ${isOpen ? 'text-[#2873F5]' : 'text-[#333333]'}`}>
                      {item.q}
                    </h3>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#2873F5]' : ''}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-5 pb-4 pt-0">
                  <div className="pl-10 border-l-2 border-[#2873F5]/20">
                    <p className="text-base text-gray-600 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-400 mb-4">{t.noResults}</p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <a href={`mailto:${t.email}`} className="flex items-center gap-1.5 text-[#2873F5] hover:underline">
              <Mail className="w-4 h-4" />
              {t.email}
            </a>
            <a href={`tel:${t.phone.replace(/\D/g, '')}`} className="flex items-center gap-1.5 text-[#2873F5] hover:underline">
              <Phone className="w-4 h-4" />
              {t.phone}
            </a>
          </div>
        </div>
      )}

      {/* Bottom Contact */}
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl border border-gray-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-[#333333] text-sm">{t.contactCta}</p>
          <p className="text-xs text-gray-500">{t.contactDesc}</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a href={`mailto:${t.email}`} className="flex items-center gap-1.5 text-[#2873F5] hover:underline">
            <Mail className="w-4 h-4" />
            {t.email}
          </a>
          <a href={`tel:${t.phone.replace(/\D/g, '')}`} className="flex items-center gap-1.5 text-[#2873F5] hover:underline">
            <Phone className="w-4 h-4" />
            {t.phone}
          </a>
        </div>
      </div>
    </>
  );
}
