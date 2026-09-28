/**
 * 真实客户评价数据源 — Schema.org Review / AggregateRating 唯一真值来源
 *
 * 背景 (K3 2026-08-04 P0-2 裁决 + AGENTS.md §0.23 数据诚信红线):
 *   - 站内 0 真实 Trustpilot / Google Reviews 集成时, 禁止编造 aggregateRating / review
 *     (曾删 schema-extensions.ts 假 aggregateRating 块 + case-studies 假 Review 块,
 *      generateProductReviewsJsonLd 假数据死代码已在 2026-09-29 移除)。
 *   - Google Rich Results 报告「未填写字段 aggregateRating / review」(449 项) 属
 *     ENHANCEMENT 级提示: 缺它只是不显示星级, 不影响商品摘要展示;
 *     填假数据反而触发 Google 人工处置 (整站富媒体降权) 风险。
 *
 * 使用规则 (唯一合法写入路径):
 *   1. 只收录**真实**客户评价 (WhatsApp / 邮件 / Trustpilot / Google Customer Reviews 等),
 *      每条必须有 author + date + rating + body + source + consent: true (客户同意公开展示)。
 *   2. 不得编造姓名 / 日期 / 评分 / 文案 — 违反 §0.23 即整批作废。
 *   3. 接入路径: `getProductReviews()` / `getProductAggregateRating()` 已被
 *      PDP JSON-LD 与 merchant-feed 自动消费 — 填入真实数据后无需再改渲染层。
 *   4. 聚合口径: 按 locale 独立聚合 (评价正文语言 = 页面语言), 不做跨语混算。
 *
 * 当前状态: 0 条真实评价 (截至 2026-09-29, 待 K3 提供 WhatsApp/邮件真实反馈或接入
 * Google Customer Reviews 后按下方格式填充)。
 */

export interface ProductReviewEntry {
  /** 真实客户署名 (须客户同意公开) */
  author: string;
  /** ISO yyyy-mm-dd */
  date: string;
  /** 1-5 整数 */
  rating: number;
  /** 可选短标题 */
  title?: string;
  /** 评价正文 (客户原话或经客户确认的整理稿) */
  body: string;
  source: 'whatsapp' | 'email' | 'trustpilot' | 'google-customer-reviews';
  /** 客户已同意公开展示 */
  consent: true;
}

export type ReviewLocale = 'zh-hk' | 'en' | 'ja';

export interface ProductReviewsByLocale {
  'zh-hk': ProductReviewEntry[];
  en: ProductReviewEntry[];
  ja: ProductReviewEntry[];
}

/**
 * slug → 各语种真实评价。
 * 示例格式 (有真实评价后按此添加, 不要编造):
 *   'kraft-paper-bags': {
 *     en: [
 *       { author: 'Anna B.', date: '2026-08-14', rating: 5,
 *         title: 'Great kraft bags',
 *         body: 'Ordered 1,000 kraft bags for our bakery — quality and turnaround were excellent.',
 *         source: 'whatsapp', consent: true },
 *     ],
 *   },
 */
export const productReviews: Record<string, Partial<ProductReviewsByLocale>> = {};

/** 取某产品某语种的真实评价 (无则空数组) */
export function getProductReviews(slug: string, locale: ReviewLocale): ProductReviewEntry[] {
  return productReviews[slug]?.[locale] ?? [];
}

/**
 * 取某产品某语种的聚合评分 (无评价返回 null → 渲染层自动跳过 aggregateRating)。
 * 仅按该语种评价聚合, 保证 reviewCount 与页面可见/声明的评价一致 (Google 校验口径)。
 */
export function getProductAggregateRating(
  slug: string,
  locale: ReviewLocale
): { ratingValue: number; reviewCount: number } | null {
  const reviews = getProductReviews(slug, locale);
  if (reviews.length === 0) return null;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const ratingValue = Math.round((sum / reviews.length) * 10) / 10; // 保留 1 位小数
  return { ratingValue, reviewCount: reviews.length };
}
