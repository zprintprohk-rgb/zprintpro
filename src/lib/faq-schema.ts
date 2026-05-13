/**
 * FAQ Schema 生成器
 * 用于产品页拿 Position 0
 */

import { Locale } from '@/types/locale';
import { SchemaOrgData } from '@/types/seo';

export interface FAQItem {
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
}

export function generateFAQSchema(faqs: FAQItem[], locale: Locale): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question[locale],
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer[locale],
      },
    })),
  };
}
