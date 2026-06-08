// 搜索辅助模块 (2026-06-08 抽出)
// 1. 简繁字符映射 (TRAD_SIMP_PAIRS)
// 2. 业务别名 (BUSINESS_ALIASES) — 香港/大陆/日语业务词互通
// 3. searchAll(query) — 同时返回产品 + 分类 (用于 typeahead dropdown)
//
// 设计: 不引 OpenCC 大依赖, 用轻量映射表 (90+ 字符 + 8 业务别名)
import { products, categories, type Product, type Category } from './products';

// 简繁字符映射 [繁体, 简体]
export const TRAD_SIMP_PAIRS: Array<[string, string]> = [
  ['宣', '宣'], ['傳', '传'], ['單', '单'], ['張', '张'], ['圖', '图'], ['個', '个'], ['們', '们'],
  ['時', '时'], ['間', '间'], ['價', '价'], ['錢', '钱'], ['銀', '银'], ['紙', '纸'], ['樣', '样'],
  ['現', '现'], ['實', '实'], ['話', '话'], ['語', '语'], ['車', '车'], ['馬', '马'], ['鳥', '鸟'],
  ['魚', '鱼'], ['龍', '龙'], ['門', '门'], ['開', '开'], ['關', '关'], ['長', '长'],
  ['遠', '远'], ['東', '东'], ['顏', '颜'], ['紅', '红'], ['藍', '蓝'], ['黃', '黄'],
  ['綠', '绿'], ['產', '产'], ['業', '业'], ['電', '电'], ['腦', '脑'],
  ['網', '网'], ['絡', '络'], ['設', '设'], ['計', '计'], ['劃', '划'], ['專', '专'],
  ['購', '购'], ['買', '买'], ['賣', '卖'], ['質', '质'], ['標', '标'], ['準', '准'],
  ['訂', '订'], ['貨', '货'], ['據', '据'], ['處', '处'], ['員', '员'],
  ['廠', '厂'], ['機', '机'], ['備', '备'], ['裝', '装'],
  ['製', '制'], ['創', '创'], ['藝', '艺'], ['術', '术'],
  ['學', '学'], ['習', '习'], ['書', '书'], ['報', '报'], ['雜', '杂'], ['誌', '志'],
  ['貼', '贴'], ['盒', '盒'], ['袋', '袋'], ['戶', '户'], ['服', '服'], ['務', '务'],
  ['聯', '联'], ['應', '应'], ['該', '该'], ['當', '当'], ['為', '为'], ['種', '种'], ['類', '类'],
  ['選', '选'], ['擇', '择'], ['滿', '满'], ['費', '费'],
  ['經', '经'], ['驗', '验'],
];

// 业务别名 (2026-06-08 添加, 修 香港/大陆/日语 业务词互通)
// 格式: [原词, 别名1, 别名2, ...] — 任意别名都能匹配到原词
// 例: 用户搜 "名片" → 系统视同 "咭片" (HK) / "名刺" (JP)
export const BUSINESS_ALIASES: Array<{ primary: string; aliases: string[] }> = [
  // 业务卡 (HK: 咭片 / CN: 名片 / JP: 名刺) — 全部互通
  { primary: '咭片', aliases: ['名片', '名刺', 'card', 'cards', 'business card', 'business cards', '名卡', '卡片'] },
  { primary: '名片', aliases: ['咭片', '名刺', 'card', 'cards', 'business card', '名卡'] },
  { primary: '名刺', aliases: ['咭片', '名片', 'card', 'cards', 'business card'] },
  // 宣传单张 (HK: 宣傳單張 / CN: 宣传单张 / JP: チラシ) — 已有字符映射, 增 aliases 兜底
  { primary: '宣傳單張', aliases: ['flyer', 'flyers', 'leaflet', 'leaflets', '传单', '宣傳單', '宣傳'] },
  { primary: '宣传单张', aliases: ['flyer', 'flyers', 'leaflet', '传单', '宣传单'] },
  { primary: 'チラシ', aliases: ['flyer', 'flyers', 'leaflet', '宣傳單張', '宣传单张'] },
  // 贴纸 (HK: 貼紙 / CN: 贴纸 / JP: ステッカー) — 字符映射已 cover 貼↔贴
  { primary: '貼紙', aliases: ['sticker', 'stickers', 'label', 'labels', '贴纸', 'ラベル'] },
  { primary: '贴纸', aliases: ['sticker', 'stickers', 'label', 'labels', '貼紙'] },
  // 包装盒
  { primary: '包裝盒', aliases: ['packaging', 'box', 'boxes', '包装盒', '盒子'] },
  { primary: '包装盒', aliases: ['packaging', 'box', 'boxes', '包裝盒'] },
  // 海报
  { primary: '海報', aliases: ['poster', 'posters', '海报'] },
  { primary: '海报', aliases: ['poster', 'posters', '海報'] },
];

// 内存索引: 别名 → 主词
const aliasToPrimary = new Map<string, string>();
for (const grp of BUSINESS_ALIASES) {
  // 主词自身可作为查询
  aliasToPrimary.set(grp.primary.toLowerCase(), grp.primary);
  for (const a of grp.aliases) {
    aliasToPrimary.set(a.toLowerCase(), grp.primary);
  }
}

// 简→繁 (查找 char 在 mapping 的 [t,s] 中, 找 s 等于 char 的 t)
const TRAD_FROM_SIMP = new Map(TRAD_SIMP_PAIRS.map(([t, s]) => [s, t]));
// 繁→简
const SIMP_FROM_TRAD = new Map(TRAD_SIMP_PAIRS);

export function toSimplified(s: string): string {
  return s.split('').map((c) => SIMP_FROM_TRAD.get(c) || c).join('');
}

export function toTraditional(s: string): string {
  return s.split('').map((c) => TRAD_FROM_SIMP.get(c) || c).join('');
}

// 取得 query 的所有等价形式 (含 简体/繁体/所有业务别名)
// 返回数组, 用于"任一等价形式命中即匹配"
export function getQueryVariants(query: string): string[] {
  const variants = new Set<string>();
  const lower = query.toLowerCase();
  variants.add(lower);
  variants.add(toSimplified(lower));
  variants.add(toTraditional(lower));

  // 业务别名: 查 aliasToPrimary, 拿到主词, 再对主词做简繁变换
  const primary = aliasToPrimary.get(lower);
  if (primary) {
    variants.add(primary.toLowerCase());
    variants.add(toSimplified(primary).toLowerCase());
    variants.add(toTraditional(primary).toLowerCase());
    // 主词的所有 aliases (除原 query 外) 也加入 — 比如搜 "名片", 也匹配 "sticker" 不合理, 只加主词的等价
    // 这里只加主词本身, 避免别名爆炸
  }

  return Array.from(variants).filter((v) => v.length > 0);
}

// 匹配单个字段 (任一变体命中即返回 true)
function matchField(field: string | undefined | null, variants: string[]): boolean {
  if (!field) return false;
  const lower = field.toLowerCase();
  return variants.some((v) => v.length > 0 && lower.includes(v));
}

export interface SearchHit {
  type: 'product' | 'category';
  // product
  slug?: string;
  category_slug?: string;
  sku_code?: string;
  name?: string;
  nameEn?: string;
  nameJa?: string;
  description?: string;
  descriptionEn?: string;
  descriptionJa?: string;
  description_zh?: string;
  price_range?: string;
  isHot?: boolean;
  isNew?: boolean;
  // category
}

export interface SearchResult {
  products: Product[];
  categories: Category[];
  total: number;
}

// 搜索产品 (含 description / slug / category 字段 + 简繁互通)
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];
  const variants = getQueryVariants(lowerQuery);

  return products.filter((p) => {
    const fields = [
      p.name, p.nameEn, p.nameJa, p.sku_code,
      p.description, p.descriptionEn, p.descriptionJa, p.description_zh,
      p.slug, p.category_slug, p.category,
    ];
    for (const f of fields) {
      if (matchField(f, variants)) return true;
    }
    return false;
  });
}

// 搜索分类 (按 locale 相关的 name 字段匹配)
export function searchCategories(query: string): Category[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];
  const variants = getQueryVariants(lowerQuery);

  return categories.filter((c) => {
    const fields = [c.name, c.nameEn, c.nameJa, c.name_zh, c.name_en, c.name_ja, c.slug];
    for (const f of fields) {
      if (matchField(f, variants)) return true;
    }
    return false;
  });
}

// 统一入口 — 一次调用同时返回 products + categories (用于 typeahead dropdown)
export function searchAll(query: string, options?: { productLimit?: number; categoryLimit?: number }): SearchResult {
  const matchedProducts = searchProducts(query);
  const matchedCategories = searchCategories(query);

  return {
    products: matchedProducts.slice(0, options?.productLimit ?? 30),
    categories: matchedCategories.slice(0, options?.categoryLimit ?? 5),
    total: matchedProducts.length + matchedCategories.length,
  };
}
