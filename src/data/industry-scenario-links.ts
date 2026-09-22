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
    // 2026-09-22 SKU 压缩: mesh-banners 下架 → outdoor-vinyl-banners 承接
    school_event: { sku: 'outdoor-vinyl-banners' },
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
    // 2026-09-23 SKU 压缩: can-badge 下架 (非业务范围) → doujinshi-printing 承接 (同人周邊主线)
    anime_goods: { sku: 'doujinshi-printing' },
    vtuber: { sku: 'doujinshi-printing' },
    comiket: { sku: 'postcard-set' },
    original_ip: { sku: 'eco-tote-bag' },
  },

  /**
   * `business-cards` ＝ 指向賀卡的**別名 key**（K3 2026-09-20 方案 B 第 3 步新增）。
   *
   * ⚠️ 為什麼必須新增：本表與 SCENARIO_INDUSTRY_NAMES 原本**只列 13 個類別**、
   *   一致地不含 business-cards（屬設計排除）。若不新增，CategoryIndustries /
   *   CategorySharpHooks 的該區塊渲染時 `resolveScenarioHref()` 會落空 →
   *   卡片取不到連結（與本輪 banners key 命名不一致造成的失效同型）。
   * 場景 → 賀卡 SKU（依各場景文案的工藝特徵）：
   *   birthday「燙金祝福語」→ foil-greeting-cards
   *   holiday「珠光紙 · 局部 UV」→ premium-greeting-cards
   *   thankyou「棉紙質感 · 燙金 LOGO」→ premium-greeting-cards
   */
  'business-cards': {
    birthday: { sku: 'foil-greeting-cards' },
    holiday: { sku: 'premium-greeting-cards' },
    thankyou: { sku: 'premium-greeting-cards' },
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


/**
 * 场景行业名 (3 语言) —— 与 SCENARIO_LINKS 同 key, 构成场景的**唯一权威注册表**
 *
 * 为什么并入本文件 (2026-09-17, 修位置索引错配的第二层):
 *   旧实现行业名来自 seo.ts 的 CATEGORY_INDUSTRIES[], 场景来自 categoryIndustryScenarios[],
 *   两者靠**位置**配对, 且 tier 用 `i < 5 ? 'A' : 'B'` 硬编码 —— 三重位置假设:
 *     1. scenarios.filter(tier) 剔除 tier B 项 → tier A 列表索引相对原数组前移 (posters 错位)
 *     2. CATEGORY_INDUSTRIES 的顺序 与 scenarios 的 priority 顺序在 stickers/paper-bags/packaging 本就不同
 *     3. i<5 硬编码 tier, 但各品类 tier A 数量不同 (4/3/3/4…)
 *   结果: 卡片标题与场景文案不符 (如 stickers「藥品標籤」显示「燙金 LOGO · 啞光質感」文案)。
 *   现改为 **key 驱动**: 行业名 + 场景文案 + tier + 链接 全部由同一 key 取, 位置无关。
 */
export const SCENARIO_INDUSTRY_NAMES: Record<string, Record<string, {
  'zh-hk': string; en: string; ja: string;
}>> = {
  stickers: {
    pet_food:  { 'zh-hk': '寵物食品', en: 'Pet food brands', ja: 'ペットフード' },
    pharma:    { 'zh-hk': '藥品標籤', en: 'Pharmaceutical labels', ja: '医薬品ラベル' },
    beauty:    { 'zh-hk': '美妝護膚', en: 'Beauty & skincare', ja: '化粧品・スキンケア' },
    ecommerce: { 'zh-hk': '跨境電商', en: 'Cross-border e-commerce', ja: '越境EC' },
    beverage:  { 'zh-hk': '飲料品牌', en: 'Beverage brands', ja: '飲料ブランド' },
  },
  flyers: {
    restaurant:  { 'zh-hk': '餐廳開業', en: 'Restaurant openings', ja: '飲食店開業' },
    real_estate: { 'zh-hk': '房地產新盤', en: 'Real estate launches', ja: '不動産プロモ' },
    education:   { 'zh-hk': '補習社宣傳', en: 'Tutoring centers', ja: '塾・予備校' },
    events:      { 'zh-hk': '活動展覽', en: 'Events & exhibitions', ja: 'イベント・展示会' },
    wedding:     { 'zh-hk': '婚慶喜帖', en: 'Wedding invitations', ja: '結婚式招待' },
  },
  packaging: {
    beauty:       { 'zh-hk': '美妝護膚品牌', en: 'Beauty & skincare brands', ja: '化粧品ブランド' },
    ecommerce:    { 'zh-hk': '跨境電商品牌', en: 'Cross-border e-commerce', ja: '越境ECブランド' },
    tea_beverage: { 'zh-hk': '茶飲食品', en: 'Tea & beverage brands', ja: '茶・ドリンク' },
    real_estate:  { 'zh-hk': '房地產禮盒', en: 'Real estate gifts', ja: '不動産ギフト' },
  },
  'paper-bags': {
    apparel:   { 'zh-hk': '服飾品牌', en: 'Fashion & apparel brands', ja: 'アパレルブランド' },
    jewellery: { 'zh-hk': '珠寶鐘錶', en: 'Jewellery & watches', ja: '宝飾・腕時計' },
    wedding:   { 'zh-hk': '婚慶禮品袋', en: 'Wedding favor bags', ja: '結婚式ギフトバッグ' },
    bakery:    { 'zh-hk': '烘焙食品', en: 'Bakery & food brands', ja: 'ベーカリー・食品' },
  },
  posters: {
    retail:     { 'zh-hk': '零售店面', en: 'Retail storefronts', ja: '小売店' },
    exhibition: { 'zh-hk': '展覽活動', en: 'Exhibitions & events', ja: '展示会・イベント' },
    property:   { 'zh-hk': '房地產新盤', en: 'Real estate promotion', ja: '不動産プロモ' },
    restaurant: { 'zh-hk': '餐廳推廣', en: 'Restaurant marketing', ja: '飲食店プロモ' },
    education:  { 'zh-hk': '補習社宣傳', en: 'Tutoring & education', ja: '塾・教育' },
  },
  menus: {
    restaurant: { 'zh-hk': '茶餐廳', en: 'Cha chaan teng & cafes', ja: '茶餐廳・カフェ' },
    cafe:       { 'zh-hk': '咖啡店', en: 'Coffee shops', ja: 'コーヒーショップ' },
    bar:        { 'zh-hk': '酒吧', en: 'Bars & pubs', ja: 'バー・居酒屋' },
  },
  'red-packets': {
    wedding:   { 'zh-hk': '婚慶喜宴', en: 'Wedding banquets', ja: '結婚式・披露宴' },
    corporate: { 'zh-hk': '企業年會', en: 'Corporate events', ja: '企業イベント' },
    ip:        { 'zh-hk': '卡通 IP 授權', en: 'Cartoon IP licensing', ja: 'キャラクターIP' },
  },
  calendars: {
    corporate_gift: { 'zh-hk': '企業禮品', en: 'Corporate gifts', ja: '企業ギフト' },
    school:         { 'zh-hk': '學校定制', en: 'School printing', ja: '学校向け' },
    realestate:     { 'zh-hk': '房地產送禮', en: 'Real estate gifts', ja: '不動産ギフト' },
    auto:           { 'zh-hk': '汽車汽配', en: 'Auto & parts', ja: '自動車・部品' },
    finance:        { 'zh-hk': '金融客戶', en: 'Financial clients', ja: '金融機関' },
  },
  banners: {
    trade_show:     { 'zh-hk': '展覽活動', en: 'Trade shows', ja: '展示会' },
    outdoor_ad:     { 'zh-hk': '戶外廣告', en: 'Outdoor advertising', ja: '屋外広告' },
    auto_showroom:  { 'zh-hk': '汽車展廳', en: 'Auto showrooms', ja: '自動車ショールーム' },
    mall_promo:     { 'zh-hk': '商場促銷', en: 'Mall promotions', ja: '商業施設プロモ' },
    school_event:   { 'zh-hk': '學校開放日', en: 'School open days', ja: '学校オープンデー' },
  },
  books: {
    tutoring_textbook: { 'zh-hk': '補習社教材', en: 'Tutoring textbooks', ja: '塾・教材' },
    doujin:            { 'zh-hk': '同人誌創作', en: 'Doujinshi creators', ja: '同人誌制作' },
    corp_brochure:     { 'zh-hk': '企業畫冊', en: 'Corporate brochures', ja: '企業パンフレット' },
    children_book:     { 'zh-hk': '兒童繪本', en: 'Children picture books', ja: '絵本' },
    yearbook:          { 'zh-hk': '精裝紀念冊', en: 'Premium hardcover yearbooks', ja: '記念誌・上製本' },
  },
  envelopes: {
    corp_business: { 'zh-hk': '企業商務', en: 'Corporate business', ja: '企業向け' },
    finance_mail:  { 'zh-hk': '金融信封', en: 'Financial mailing', ja: '金融郵便' },
    school_notice: { 'zh-hk': '補習社通告', en: 'School notices', ja: '塾・学校通知' },
    logistics:     { 'zh-hk': '物流面單', en: 'Logistics & shipping', ja: '物流・送り状' },
    member_event:  { 'zh-hk': '會員活動', en: 'Member events', ja: '会員イベント' },
  },
  educational: {
    graduation:   { 'zh-hk': '中學大學畢業紀念冊', en: 'Graduation yearbooks', ja: '卒業記念誌' },
    workbook:     { 'zh-hk': '補習社皇牌教材', en: 'Tutoring textbook series', ja: '塾教材シリーズ' },
    school_bulk:  { 'zh-hk': '學校批量定制', en: 'School bulk printing', ja: '学校一括発注' },
    pta_event:    { 'zh-hk': '家長會活動', en: 'Parent-teacher events', ja: '保護者会' },
    certificates: { 'zh-hk': '獎狀證書', en: 'Award certificates', ja: '賞状・証明書' },
  },
  'japan-doujin': {
    doujinshi:   { 'zh-hk': '同人誌創作', en: 'Doujinshi creators', ja: '同人誌制作' },
    anime_goods: { 'zh-hk': '動漫周邊', en: 'Anime merchandise', ja: 'アニメグッズ' },
    vtuber:      { 'zh-hk': 'VTuber 推活', en: 'VTuber fan goods', ja: 'VTuber 推し活' },
    comiket:     { 'zh-hk': 'Comiket 委託', en: 'Comiket commissions', ja: 'コミケ委託' },
    original_ip: { 'zh-hk': '原創 IP 周邊', en: 'Original IP merch', ja: 'オリジナルIP' },
  },

  /**
   * `business-cards` ＝ 指向賀卡的**別名 key**（K3 2026-09-20 方案 B 第 3 步新增）。
   * 若不新增，`getScenarioIndustryName()` 對該類別會落空 → 卡片無行業名
   * （CategorySharpHooks 以 `industries[idx]` 取用，落空即整卡不渲染）。
   * 名稱依場景定位：生日＝個人化問候；節日／感謝＝企業與品牌批量。
   */
  'business-cards': {
    birthday: { 'zh-hk': '生日問候', en: 'Birthday greetings', ja: 'バースデー挨拶' },
    holiday:  { 'zh-hk': '節日企業派發', en: 'Corporate holiday mailings', ja: '法人向け季節挨拶' },
    thankyou: { 'zh-hk': '品牌隨盒卡', en: 'Brand insert cards', ja: 'ブランド同梱カード' },
  },
};

/** 取某场景的行业名 (3 语言), 缺失时回退空串 */
export function getScenarioIndustryName(
  categorySlug: string,
  scenarioKey: string,
  locale: 'zh-hk' | 'en' | 'ja'
): string {
  return SCENARIO_INDUSTRY_NAMES[categorySlug]?.[scenarioKey]?.[locale] || '';
}
