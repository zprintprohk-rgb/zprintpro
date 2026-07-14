/**
 * H1 builder for product pages.
 * 2026-07-14 P0 优化 v2:
 * - 60 字符阈值（Google H1 最佳实践，比 v1 的 80 字符更保守）
 * - 模板 v2: ${title} · ${kw} · ${卖点} · 香港${cat}專家 · 智印雲
 *   (替代 v1: ${title} | ${kw1} | ${kw2} | 香港${cat}專家 | 智印雲 — 解决 kw1/kw2 类目堆叠)
 * - SHARP_HOOKS_MAP: 按 cat 配 1 个卖点短语（100張起 / 48h 出貨 / Free Shipping）
 * - dedup 仍然保留（防 productTitle 与 kw/hook 重复）
 */

export type Locale = 'zh-hk' | 'en' | 'ja';

/**
 * 主 KW (产品类型) + 副 KW (sharp hook / 工艺 / 卖点)
 * 来源：sku-seo-data.ts 中 68 个目标 SKU 5043 已吸收关键词的 freq top 1+1 (人工挑)
 * 仅 zh-hk locale 用。en/ja 在第二轮。
 */
export const CAT_KW_MAP_ZH_HK: Record<string, [string, string]> = {
  stickers:     ['防水貼紙', '不干膠'],
  flyers:       ['宣傳單張', 'A4單張'],
  packaging:    ['禮品盒', '瓦楞紙盒'],
  posters:      ['展覽海報', '防水海報'],
  'paper-bags': ['牛皮紙袋', '環保紙袋'],
  banners:      ['易拉寶', '即日取噴繪'],
  envelopes:    ['牛皮信封', '開窗信封'],
  calendars:    ['桌曆', '企業年曆'],
  'red-packets':['燙金利是封', '春聯'],
  educational:  ['練習冊', 'A4練習冊'],
  books:        ['無線膠裝', '騎馬釘'],
};

/**
 * SHARP_HOOKS_MAP: 按 cat 配 1 个卖点短语 (4-6 字)
 * 目标：差异化价值（不只是堆类目词）
 * 优先级: 工艺/速度/MOQ/材质/服务
 */
export const SHARP_HOOKS_MAP_ZH_HK: Record<string, string> = {
  stickers:     '100張起印',
  flyers:       '即日交貨',
  packaging:    '免費打樣',
  posters:      '防水材質',
  'paper-bags': '環保材質',
  banners:      '含安裝',
  envelopes:    '企業定制',
  calendars:    '2027年曆',
  'red-packets':'燙金工藝',
  educational:  '校徽定制',
  books:        '膠裝精裝',
};

/**
 * 兜底：cat slug 在 CAT_KW_MAP_ZH_HK 中找不到时使用（数据缺失防护）
 */
export const DEFAULT_KW_MAP_ZH_HK: Record<string, [string, string]> = {
  stickers:     ['貼紙', '印刷'],
  flyers:       ['單張', '設計'],
  packaging:    ['包裝', '定制'],
  posters:      ['海報', '印刷'],
  'paper-bags': ['紙袋', '環保'],
  banners:      ['橫額', '噴繪'],
  envelopes:    ['信封', '定制'],
  calendars:    ['月曆', '企業'],
  'red-packets':['利是封', '燙金'],
  educational:  ['練習冊', '印刷'],
  books:        ['書籍', '裝訂'],
  'business-cards': ['咭片', '印刷'],  // §11 禁区，仅作 fallback（不应触发）
  'japan-doujin':   ['同人誌', '印刷'],
  menus:        ['菜單', '印刷'],
  'gift-boxes': ['禮盒', '定制'],
};

export const DEFAULT_HOOK_ZH_HK: Record<string, string> = {
  stickers:     '小批量',
  flyers:       '24小時',
  packaging:    '燙金工藝',
  posters:      '高清',
  'paper-bags': '100個起',
  banners:      '即日取',
  envelopes:    '燙金',
  calendars:    '企業年曆',
  'red-packets':'春節限定',
  educational:  '校園專用',
  books:        '精裝膠裝',
  'business-cards': '咭片',
  'japan-doujin':   '同人誌',
  menus:        '餐牌',
  'gift-boxes': '定制',
};

const MAX_H1_CHARS = 60;  // v2: 从 80 收紧到 60 (Google H1 最佳实践推荐)

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getKw(catSlug: string): [string, string] {
  return CAT_KW_MAP_ZH_HK[catSlug] || DEFAULT_KW_MAP_ZH_HK[catSlug] || ['產品', '印刷'];
}

function getHook(catSlug: string): string {
  return SHARP_HOOKS_MAP_ZH_HK[catSlug] || DEFAULT_HOOK_ZH_HK[catSlug] || '香港印刷';
}

/**
 * 去重：如果 productTitle 已包含主 KW 或 hook，从 productTitle 中移除避免 H1 重复
 * 但保留主 KW 在 productTitle 中的语义（如果整个 title 等于 KW，就保留原 title）
 */
function dedupTitle(title: string, kw: string, hook: string): string {
  const re = new RegExp(`(${escapeRegExp(kw)}|${escapeRegExp(hook)})`, 'g');
  const deduped = title.replace(re, '').replace(/\s*[|·・]\s*/g, ' · ').replace(/\s+/g, ' ').trim();
  // 如果去重后太短（< 50% 原长），保留原 title（让 H1 重复 KW 比让 H1 失去产品名更好）
  if (deduped.length < title.length * 0.5) return title;
  return deduped || title;
}

/**
 * Build H1 for zh-hk product page. v2 模板.
 *
 * 模板优先级（按字符长度降级）:
 *   1. ${title} · ${kw} · ${hook} · 香港${cat}專家 · 智印雲   (理想, <= 60 chars)
 *   2. ${title} · ${kw} · 香港${cat}專家 · 智印雲              (去 hook)
 *   3. ${title} · ${kw} · 智印雲                              (去「專家」)
 *
 * @param productTitle   - 来自 product.name (zh-hk, 已经过 .split('|')[0] 短名化)
 * @param categoryName   - 来自 getCategoryName(category, 'zh-hk')
 * @param catSlug        - 来自 product.category_slug
 */
export function buildProductH1ZhHk(
  productTitle: string,
  categoryName: string,
  catSlug: string
): string {
  const [kw] = getKw(catSlug);
  const hook = getHook(catSlug);
  const title = dedupTitle(productTitle, kw, hook);

  const variant1 = `${title} · ${kw} · ${hook} · 香港${categoryName}專家 · 智印雲`;
  if (variant1.length <= MAX_H1_CHARS) return variant1;

  const variant2 = `${title} · ${kw} · 香港${categoryName}專家 · 智印雲`;
  if (variant2.length <= MAX_H1_CHARS) return variant2;

  const variant3 = `${title} · ${kw} · 智印雲`;
  return variant3;
}
