/**
 * FAQPage JSON-LD schema 生成工具
 * 2026-08-25 P0 #5 拍板 (K3 8/24 19:03 拍板 24h SLA FAQ 适用条款, 8/25 P0 #5 实施, P2 #11 SEO 优化用)
 *
 * 配套 Google Search Central FAQPage structured data 规范
 * https://developers.google.com/search/docs/appearance/structured-data/faqpage
 */

interface FaqItem {
  question: string;
  answer: string;
  applicable?: string[];
  notApplicable?: string[];
}

interface FaqCategory {
  id: string;
  label: string;
  scope: string;
  faqs: FaqItem[];
}

interface FaqSchemaOptions {
  /** 页面 URL (用于 mainEntity @id) */
  pageUrl: string;
  /** Schema 范围: 全 categories 或单 category */
  categories: FaqCategory[];
  /** 语言区域 (zh-HK / en / ja-JP) */
  inLanguage: string;
}

/**
 * 生成 FAQPage JSON-LD schema 对象
 * @example
 * const schema = generateFaqSchema({
 *   pageUrl: 'https://zprintpro.com/zh-hk/about/',
 *   categories: faqData.categories,
 *   inLanguage: 'zh-HK'
 * });
 * // <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 */
export function generateFaqSchema({ pageUrl, categories, inLanguage }: FaqSchemaOptions) {
  // 扁平化所有 categories.faqs 为单层 questions 数组
  const questions = categories.flatMap((category) =>
    category.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    }))
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faqpage`,
    url: pageUrl,
    inLanguage,
    mainEntity: questions,
  };
}
