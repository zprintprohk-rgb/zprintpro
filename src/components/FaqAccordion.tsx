'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
  applicable: string[];
  notApplicable: string[];
}

interface FaqCategory {
  id: string;
  label: string;
  scope: string;
  faqs: FaqItem[];
}

interface FaqAccordionProps {
  categories: FaqCategory[];
  /** Optional: 控制默认展开第几类 (0-indexed) */
  defaultOpenCategory?: number;
  /** Optional: 控制默认展开某类下第几题 (0-indexed) */
  defaultOpenFaq?: number;
}

/**
 * FaqAccordion 组件 - 24h SLA FAQ 折叠面板
 * 2026-08-25 P0 #5 拍板 (K3 8/24 19:03 拍板 24h SLA 适用条款, 8/25 P0 #5 实施)
 *
 * 特性:
 * - 类别 + FAQ 双层折叠
 * - 适用 / 不适用条件分类展示
 * - 国际化 (3 locale 共享)
 * - 可访问 (键盘 + 屏幕阅读器)
 */
export default function FaqAccordion({
  categories,
  defaultOpenCategory = 0,
  defaultOpenFaq = 0,
}: FaqAccordionProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(
    categories[defaultOpenCategory]?.id || categories[0]?.id || null
  );
  const [openFaq, setOpenFaq] = useState<string | null>(
    categories[defaultOpenCategory]?.faqs[defaultOpenFaq]
      ? `${categories[defaultOpenCategory].id}-${defaultOpenFaq}`
      : null
  );

  return (
    <div className="space-y-4">
      {categories.map((category) => {
        const isCategoryOpen = openCategory === category.id;
        return (
          <div
            key={category.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            {/* Category Header */}
            <button
              onClick={() => setOpenCategory(isCategoryOpen ? null : category.id)}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
              aria-expanded={isCategoryOpen}
              aria-controls={`faq-cat-${category.id}`}
            >
              <div className="text-left">
                <h3 className="text-base md:text-lg font-bold text-[#333333]">
                  {category.label}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mt-1">{category.scope}</p>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  isCategoryOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Category Body */}
            {isCategoryOpen && (
              <div id={`faq-cat-${category.id}`} className="border-t border-gray-100">
                {category.faqs.map((faq, faqIdx) => {
                  const faqKey = `${category.id}-${faqIdx}`;
                  const isFaqOpen = openFaq === faqKey;
                  return (
                    <div key={faqKey} className="border-b border-gray-100 last:border-b-0">
                      <button
                        onClick={() => setOpenFaq(isFaqOpen ? null : faqKey)}
                        className="w-full flex items-start justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                        aria-expanded={isFaqOpen}
                        aria-controls={`faq-${faqKey}`}
                      >
                        <span className="text-sm font-semibold text-[#2873F5] pr-4 flex-1">
                          {faq.question}
                        </span>
                        <svg
                          className={`w-4 h-4 text-gray-400 shrink-0 mt-0.5 transition-transform ${
                            isFaqOpen ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isFaqOpen && (
                        <div id={`faq-${faqKey}`} className="px-4 pb-4 space-y-3">
                          <p className="text-sm text-[#444444] leading-relaxed">{faq.answer}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                              <p className="text-xs font-semibold text-green-800 mb-2">
                                適用條件 / Applicable
                              </p>
                              <ul className="space-y-1">
                                {faq.applicable.map((item, i) => (
                                  <li key={i} className="text-xs text-green-700 leading-relaxed">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                              <p className="text-xs font-semibold text-orange-800 mb-2">
                                不適用條件 / Not Applicable
                              </p>
                              <ul className="space-y-1">
                                {faq.notApplicable.map((item, i) => (
                                  <li key={i} className="text-xs text-orange-700 leading-relaxed">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
