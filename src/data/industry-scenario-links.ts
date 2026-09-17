/**
 * 品类页「服務行業與應用場景」→ 链接目标语义映射 (2026-09-17)
 *
 * 为什么有这个文件 (第一性原理):
 *   客户在行业卡片上读到具体承诺 (如「茶飲品牌禮盒 · 天地蓋+抽屜式 · FSC 環保紙」),
 *   点「查看完整方案」= 明确声明「我要看**这个场景**的完整方案」。
 *   链接目标因此必须与该卡片承诺的语义一致。
 *
 *   旧实现的 bug: `coveredSlugs[Math.min(posInTier, coveredSlugs.length - 1)]`
 *   —— 用「Tier 内位置索引」去索引另一个独立排序的数组, 两边顺序一旦不一致就错配:
 *     packaging 映射表 = [0]化妝品盒 [1]跨境快遞盒 [2]樓盤書 [3]茶飲禮盒
 *     場景按 priority  = [0]beauty   [1]ecommerce   [2]茶飲   [3]real_estate
 *     → 茶飲(posInTier 2) 取到「樓盤書」= 客戶想印茶飲禮盒, 讀到豪宅樓書指南
 *   且 tier B 场景完全无链接 (`covered = tier === 'A'`), 19 个场景点了没反应。
 *
 * 三层降级 (语义一致性优先):
 *   1. `blog` — 该场景的专属深度指南 (最佳: 工艺/MOQ/价格/案例)
 *   2. `sku`  — 该场景可直接下单的 SKU (次佳: 客户能立刻报价下单)
 *   3. 品类页  — 保底 (由组件兜底, 永远存在, 不会 404)
 *
 *   ❌ 绝不: 指向其他场景的 blog (旧 bug 的行为)
 *
 * 维护: 新增场景时在此登记; 未登记的场景自动降级到 SKU/品类页, 不会断链。
 */

export interface ScenarioLink {
  /** 该场景的专属深度指南 (blog slug) */
  blog?: string;
  /** 该场景可直接下单的 SKU (product slug) */
  sku?: string;
}

/**
 * SCENARIO_LINKS[categorySlug][scenarioKey]
 *
 * 映射依据: 卡片文案的场景语义 → 站内最贴合的既有内容/SKU (逐一人工核对, 非位置推断)
 */
export const SCENARIO_LINKS: Record<string, Record<string, ScenarioLink>> = {
  // ── 貼紙 ──────────────────────────────────────────────
  stickers: {
    pet_food: { blog: 'pet-food-sticker-printing-guide' },      // 寵物食品 FDA 標籤
    pharma: { blog: 'pharmaceutical-label-printing-guide' },    // 藥品標籤 GMP
    beauty: { sku: 'foil-stickers' },                           // 卡片 = 燙金 LOGO · 啞光質感
    ecommerce: { blog: 'product-label-printing-guide' },        // SKU 條碼 + GS1 合規
    beverage: { sku: 'waterproof-stickers' },                   // 防水防油 (飲品冷凝)
  },

  // ── 宣傳單張 ──────────────────────────────────────────
  flyers: {
    restaurant: { blog: 'restaurant-opening-flyer-printing-guide' },
    real_estate: { blog: 'real-estate-flyer-printing-guide' },  // 新盤樓書派發 A4 摺頁
    education: { sku: 'a4-flyers' },
    events: { sku: 'same-day-flyers' },                         // 卡片 = 三日內急件趕工
    wedding: { sku: 'a5-flyers' },                              // 卡片 = 摺頁 · 資訊量大
  },

  // ── 包裝盒 ────────────────────────────────────────────
  packaging: {
    beauty: { blog: 'cosmetics-packaging-box-printing-guide' },
    ecommerce: { blog: 'cross-border-ecommerce-shipping-box-guide' },
    tea_beverage: { blog: 'tea-beverage-gift-box-printing-guide' },   // ★ 修复点: 旧实现错配到樓盤書
    real_estate: { blog: 'real-estate-brochure-box-printing-guide' }, // ★ 修复点: tier B 原本无链接
  },

  // ── 紙袋 ──────────────────────────────────────────────
  'paper-bags': {
    apparel: { blog: 'apparel-shopping-bag-printing-guide' },
    jewellery: { blog: 'jewellery-shopping-bag-printing-guide' },
    wedding: { blog: 'wedding-favor-bag-printing-guide' },      // ★ 修复点: 旧实现错配到珠寶袋
    bakery: { sku: 'kraft-paper-bags' },                        // 食品級牛皮紙袋
  },

  // ── 海報 ──────────────────────────────────────────────
  posters: {
    retail: { blog: 'retail-shop-poster-printing-guide' },
    exhibition: { sku: 'display-posters' },
    property: { blog: 'real-estate-floor-plan-poster-printing-guide' }, // ★ 修复点: tier B 原本无链接
    restaurant: { sku: 'a2-posters' },
    education: { sku: 'a1-posters' },
  },

  // ── 餐牌 ──────────────────────────────────────────────
  menus: {
    restaurant: { blog: 'restaurant-menu-printing-guide' },
    cafe: { blog: 'menu-buying-guide' },                        // ★ 修复点: 旧实现 fallback 到 restaurant
    bar: { sku: 'drink-menus' },                                // 酒水牌
  },

  // ── 利是封 ────────────────────────────────────────────
  'red-packets': {
    wedding: { blog: 'wedding-red-packet-printing-guide' },
    corporate: { sku: 'custom-red-packets' },
    ip: { sku: 'cartoon-red-packets' },
  },

  // ── 月曆 ──────────────────────────────────────────────
  calendars: {
    corporate_gift: { blog: 'calendar-printing-guide' },
    school: { blog: '2027-monthly-calendar-printing-timetable' },
    realestate: { sku: 'desk-calendars' },
    auto: { sku: 'wall-calendars' },
    finance: { sku: 'custom-calendars' },
  },

  // ── 橫幅噴繪 ──────────────────────────────────────────
  banners: {
    trade_show: { blog: 'trade-show-banner-printing-guide' },
    outdoor_ad: { sku: 'outdoor-vinyl-banners' },
    auto_showroom: { sku: 'vehicle-wraps' },
    mall_promo: { sku: 'roll-up-banners' },
    school_event: { sku: 'mesh-banners' },
  },

  // ── 書刊畫冊 ──────────────────────────────────────────
  books: {
    tutoring_textbook: { blog: 'textbook-printing-guide' },
    doujin: { blog: 'saddle-stitch-booklet-printing-guide' },   // 騎馬釘 = 同人本主流裝訂
    corp_brochure: { blog: 'catalog-printing-guide' },
    children_book: { sku: 'hardcover-books' },
    yearbook: { blog: 'graduation-yearbook-printing-guide' },
  },

  // ── 信封 ──────────────────────────────────────────────
  envelopes: {
    corp_business: { sku: 'business-envelopes' },
    finance_mail: { blog: 'large-envelope-printing-c4-c5' },
    school_notice: { sku: 'colored-envelopes' },
    logistics: { sku: 'large-envelopes' },
    member_event: { sku: 'pearl-envelopes' },
  },

  // ── 校園教育 ──────────────────────────────────────────
  educational: {
    graduation: { blog: 'graduation-yearbook-printing-guide' },
    workbook: { blog: 'school-exercise-book-printing-guide' },
    school_bulk: { blog: 'campus-education-printing-pillar-guide' },
    pta_event: { sku: 'school-flyers' },
    certificates: { sku: 'certificates' },
  },

  // ── 日本同人 ──────────────────────────────────────────
  'japan-doujin': {
    doujinshi: { sku: 'doujinshi-printing' },
    anime_goods: { sku: 'acrylic-keychain' },
    vtuber: { sku: 'can-badge' },
    comiket: { sku: 'postcard-set' },
    original_ip: { sku: 'eco-tote-bag' },
  },

  // ── 賀卡 / 喜帖 / 枱卡 (若有场景数据则自动生效) ────────
  'greeting-cards': {
    corporate: { sku: 'foil-greeting-cards' },
    wedding: { sku: 'wedding-invitations' },
  },
  'wedding-invitations': {
    wedding: { sku: 'wedding-suite-bundle' },
  },
  'place-cards': {
    wedding: { sku: 'wedding-place-cards' },
    cafe: { sku: 'cafe-table-cards' },
  },
};

/**
 * 解析某场景的最终链接 (含三层降级)
 *
 * @returns 形如 `/zh-hk/blog/xxx/` 的站内路径
 */
export function resolveScenarioHref(
  categorySlug: string,
  scenarioKey: string,
  localePrefix: string
): string {
  const link = SCENARIO_LINKS[categorySlug]?.[scenarioKey];

  // 层级 1: 场景专属深度指南
  if (link?.blog) return `${localePrefix}/blog/${link.blog}/`;
  // 层级 2: 场景可下单 SKU
  if (link?.sku) return `${localePrefix}/product/${link.sku}/`;
  // 层级 3: 品类页保底 (永不 404)
  return `${localePrefix}/category/${categorySlug}/`;
}
