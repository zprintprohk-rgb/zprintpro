/**
 * Category Pillar Content — SEO支柱内容组件 v2
 * 极致 SEO + GEO 优化：核心优势、材质表格、工艺选项、技术参数、服务节点、FAQ
 * 支持 FAQPage Schema 结构化数据
 */

import { categorySeoContent, getDefaultCategoryContent } from '@/data/category-seo-content';

interface CategoryPillarContentProps {
  locale: string;
  categorySlug: string;
}

// 生成 FAQPage JSON-LD Schema
export function generateFaqSchema(locale: string, categorySlug: string) {
  const data = categorySeoContent[categorySlug]?.[locale as 'zh-hk' | 'en' | 'ja'] 
    || getDefaultCategoryContent(categorySlug, locale);
  
  if (!data.faq || data.faq.length === 0) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function CategoryPillarContent({ locale, categorySlug }: CategoryPillarContentProps) {
  const data = categorySeoContent[categorySlug]?.[locale as 'zh-hk' | 'en' | 'ja'] 
    || getDefaultCategoryContent(categorySlug, locale);
  
  const isZh = locale === 'zh-hk';
  const isJa = locale === 'ja';
  
  // Section label translations
  const t = {
    coreAdvantages: isZh ? '核心競爭優勢' : isJa ? '核心競争優位' : 'Why Choose ZprintPro',
    materialTable: isZh ? '材質工藝詳解' : isJa ? '材質・工法ガイド' : 'Materials & Craftsmanship',
    specialOptions: isZh ? '特殊加工選項' : isJa ? '特殊加工オプション' : 'Special Finishing Options',
    techSpecs: isZh ? '技術參數詳解' : isJa ? '技術仕様' : 'Technical Specifications',
    serviceNodes: isZh ? '本地化服務節點' : isJa ? 'ローカルサービス拠点' : 'Local Service Points',
    buyingGuide: isZh ? '選購指南' : isJa ? '選び方ガイド' : 'Buying Guide',
    faqTitle: isZh ? '常見問題' : isJa ? 'よくある質問' : 'Frequently Asked Questions',
  };

  return (
    <section className="bg-white border-t">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* H2 主标题 */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight">
          {data.h2}
        </h2>
        
        {/* ===== 核心竞争优势 ===== */}
        {data.coreAdvantages && (
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 border-l-4 border-[#2873F5] pl-4">
              {data.coreAdvantages.title || t.coreAdvantages}
            </h3>
            <div className="space-y-8">
              {data.coreAdvantages.items.map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-5 md:p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {item.heading}
                  </h4>
                  <ul className="space-y-2">
                    {item.points.map((point, pidx) => (
                      <li key={pidx} className="flex items-start gap-2 text-gray-600 text-sm md:text-base leading-relaxed">
                        <span className="text-[#F87314] mt-1 flex-shrink-0">●</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* ===== 材质工艺详解表格 ===== */}
        {data.materialTable && (
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 border-l-4 border-[#2873F5] pl-4">
              {data.materialTable.title || t.materialTable}
            </h3>
            {data.materialTable.subtitle && (
              <p className="text-gray-500 mb-4 text-sm md:text-base pl-5">{data.materialTable.subtitle}</p>
            )}
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm md:text-base">
                <thead>
                  <tr className="bg-gradient-to-r from-[#2873F5] to-[#1E5FD1] text-white">
                    {data.materialTable.columns.map((col, idx) => (
                      <th key={idx} className="text-left px-4 py-3 font-semibold whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.materialTable.rows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-medium text-gray-900">{row.material}</td>
                      <td className="px-4 py-3 text-gray-600">{row.features}</td>
                      <td className="px-4 py-3 text-gray-600">{row.scenarios}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* ===== 特殊加工选项 ===== */}
        {data.specialOptions && (
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 border-l-4 border-[#2873F5] pl-4">
              {data.specialOptions.title || t.specialOptions}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.specialOptions.items.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">{item.name}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* ===== 技术参数 ===== */}
        {data.techSpecs && (
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 border-l-4 border-[#2873F5] pl-4">
              {data.techSpecs.title || t.techSpecs}
            </h3>
            <div className="bg-gray-50 rounded-xl p-5 md:p-6 space-y-3">
              {data.techSpecs.items.map((spec, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                  <span className="font-semibold text-gray-900 sm:w-28 flex-shrink-0">{spec.label}</span>
                  <span className="text-gray-600 text-sm md:text-base">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* ===== 本地化服务节点 ===== */}
        {data.serviceNodes && (
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 border-l-4 border-[#2873F5] pl-4">
              {data.serviceNodes.title || t.serviceNodes}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.serviceNodes.items.map((node, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 p-5">
                  <h4 className="font-semibold text-[#2873F5] mb-2">{node.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{node.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* ===== 选购指南 ===== */}
        {data.buyingGuide && (
          <div className="mb-12">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-[#2873F5] pl-4">
              {data.buyingGuide.title || t.buyingGuide}
            </h3>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
              {data.buyingGuide.paragraphs.map((p, idx) => (
                <p key={idx} className="leading-relaxed text-sm md:text-base">{p}</p>
              ))}
            </div>
          </div>
        )}
        
        {/* ===== FAQ 区域 ===== */}
        {data.faq && data.faq.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
              {t.faqTitle}
            </h3>
            <div className="space-y-4">
              {data.faq.map((item, index) => (
                <details
                  key={index}
                  className="group bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-900 pr-4">{item.q}</span>
                    <span className="text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 text-sm md:text-base leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
