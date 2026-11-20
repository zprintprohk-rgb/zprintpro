// 2026-08-16 23:11 K3 拍板 (Push 3 B-1): ProductLongDescription 共享 component 准备
// K3 拍板 §0.16 batch 3 skill 抽离验收复查 (2026-08-16)
// 目标: 把 src/data/products.ts 85 SKU × 3 locale = 255 处 longDescription 模板抽离到共享 component
// 当前进度: B-1 (新建 component + 共享 5 段结构), B-2 (改 Product interface + 85 SKU 调用) 留 8/17

import React from 'react';

export interface ProductLongDescriptionProps {
  /** 长描述 (含 HTML, 5 段结构) */
  html: string;
  /** locale (zh-hk / en / ja) */
  locale: 'zh-hk' | 'en' | 'ja';
  /** product slug (for anchor) */
  slug?: string;
  /** 5 段结构标识 (可选, 用于 SEO 分析) */
  sections?: {
    intro?: boolean;
    industry?: boolean;
    material?: boolean;
    design?: boolean;
    faq?: boolean;
  };
}

/**
 * 5 段结构 (per §0.16 batch 3 skill 抽离 SOP):
 * 1. <h3>引子 + <p> 核心卖点
 * 2. <h3>行业概況 + 适配行业列表
 * 3. <h3>材質工艺 + <table> 紙材/工藝對比
 * 4. <h3>設計細節 + <p> 印刷/設計建議
 * 5. <h3>常見問題 + FAQ (4 个)
 */
export function ProductLongDescription({ html, locale, slug, sections }: ProductLongDescriptionProps) {
  return (
    <div
      className="product-long-description prose prose-slate max-w-none"
      data-locale={locale}
      data-slug={slug}
      data-sections={sections ? JSON.stringify(sections) : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * 共享 5 段结构模板 (zh-hk / en / ja) - 用于 B-2 替换 85 SKU longDescription 模板字符串
 * K3 8/16 拍板: skill 抽离验收复查, 减少 ~85 SKU 重复代码
 */
export const PRODUCT_LONG_DESCRIPTION_TEMPLATES = {
  'zh-hk': {
    intro: '<h3>產品核心賣點</h3><p>{intro}</p>',
    industry: '<h3>適配行業與場景</h3><ul>{industries}</ul>',
    material: '<h3>材質與工藝對比</h3><table>{materialTable}</table>',
    design: '<h3>設計與印刷建議</h3><p>{designTip}</p>',
    faq: '<h3>常見問題</h3><div>{faqs}</div>',
  },
  'en': {
    intro: '<h3>Core Product Features</h3><p>{intro}</p>',
    industry: '<h3>Industries & Use Cases</h3><ul>{industries}</ul>',
    material: '<h3>Materials & Craft Comparison</h3><table>{materialTable}</table>',
    design: '<h3>Design & Print Recommendations</h3><p>{designTip}</p>',
    faq: '<h3>FAQ</h3><div>{faqs}</div>',
  },
  'ja': {
    intro: '<h3>製品の中核的特徴</h3><p>{intro}</p>',
    industry: '<h3>対応業界と用途</h3><ul>{industries}</ul>',
    material: '<h3>素材と工艺の比較</h3><table>{materialTable}</table>',
    design: '<h3>デザインと印刷の提案</h3><p>{designTip}</p>',
    faq: '<h3>よくある質問</h3><div>{faqs}</div>',
  },
} as const;
