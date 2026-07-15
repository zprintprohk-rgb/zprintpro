/**
 * Unified Blog Posts Metadata (2026-06-25)
 *
 * Single source of truth for /blog/ list page + /blog/[slug]/ detail page.
 * Replaces the previous hardcoded slug arrays in BlogContent.tsx (caused
 * subcategory counts to all read 0) and the legacy `posts` object in
 * [slug]/page.tsx.
 *
 * 20 articles total:
 *   - 9 Buying Guides (from @/data/buying-guides.ts)  鈫?categoryKey='buying-guide'
 *   - 11 Legacy Posts (from [slug]/page.tsx posts)    鈫?categoryKey from real category
 *
 * Note: full article content (HTML strings) still lives in:
 *   - buying-guides.ts (for the 9 guides)
 *   - [slug]/page.tsx  (legacy `posts` object for the 10 legacy articles)
 * Use `getBlogPostMetaBySlug(slug)` for metadata here, and the respective
 * `getBuyingGuideBySlug(slug)` / `legacyPosts[locale][slug].content` for body.
 */

import { Locale } from '@/lib/seo';

export type BlogCategoryKey =
  | 'company-news'
  | 'sticker'
  | 'card'
  | 'packaging'
  | 'printing'
  | 'design'
  | 'branding'
  | 'hongkong'
  | 'trends'
  | 'flyers'
  | 'food-packaging'
  | 'paper-bags'
  | 'posters'
  | 'restaurant-flyer'
  | 'buying-guide'
  | 'menus'
  | 'red-packets'
  | 'cross-border'
  | 'education'
  | 'creator-ip'
  | 'banners'
  | 'wedding-envelope'
  | 'japan-doujin';

export type BlogPostSource = 'buying-guide' | 'legacy';

export interface BlogPostMeta {
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  date: string;
  categoryKey: BlogCategoryKey;
  /**
   * Cover image per locale. Optional since 2026-07-04 鈥?姣忔棩 SEO 娣卞害鍗氬 (no-image)
   * 涓嶅啓 cover,UI 浼氳烦杩?hero 鍥炬覆鏌?绾枃瀛楄緭鍑恒€傚綋 cover 缂哄け鎴栦负绌哄瓧绗︿覆鏃?
   * getBlogCover 杩斿洖 '',UI 鐢ㄦ鍒ゅ畾鏄惁娓叉煋 hero銆?
   */
  cover?: Record<Locale, string>;
  source: BlogPostSource;
}

export const defaultCover: Record<Locale, string> = {
  'zh-hk': '/images/blog/zh-hk/sticker-guide.webp',
  en: '/images/blog/zh-hk/sticker-guide.webp',
  ja: '/images/blog/zh-hk/sticker-guide.webp',
};

// =============================================================================
// 9 BUYING GUIDES  (categoryKey='buying-guide', dates 2025-01~02)
// =============================================================================

const bgBusinessCard: BlogPostMeta = {
  slug: 'business-card-buying-guide',
  categoryKey: 'buying-guide',
  source: 'buying-guide',
  date: '2025-01-15',
  title: {
    'zh-hk': '鍚嶇墖鍗板埛閬歌臣瀹屽叏鎸囧崡锛氭潗璩€佸伐钘濄€佸児鏍间竴娆℃悶鎳?,
    en: 'Business Card Buying Guide: Materials, Finishes & Pricing Explained',
    ja: '鍚嶅埡鍗板埛閬搞伋鏂瑰畬鍏ㄣ偓銈ゃ儔锛氭潗璩€佸姞宸ャ€佷尽鏍笺倰寰瑰簳瑙ｈ',
  },
  excerpt: {
    'zh-hk': '寰?00g閵呯増绱欏埌400g鍘氱礄銆佸緸鐕欓噾鍒板眬閮║V锛岄娓悕鐗囧嵃鍒烽伕璩煎叏鏀荤暐銆傛櫤鍗伴洸鍗板埛灏堝鐐烘偍鎷嗚В鏉愯唱銆佸伐钘濊垏鍍规牸銆?,
    en: 'From 300g art paper to 400g thick stock, from foil stamping to spot UV 鈥?a complete guide to choosing business cards in Hong Kong.',
    ja: '300g銈兗銉堢礄銇嬨倝400g鍘氱礄銇俱仹銆佺當鎶笺仐銇嬨倝灞€閮║V銇俱仹鈥旈娓悕鍒哄嵃鍒枫伄閬搞伋鏂瑰畬鍏ㄣ偓銈ゃ儔銆?,
  },
  cover: {
    'zh-hk': '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-zh-hk.webp',
    en: '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-en.webp',
    ja: '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-ja.webp',
  },
};

const bgSticker: BlogPostMeta = {
  slug: 'sticker-buying-guide',
  categoryKey: 'buying-guide',
  source: 'buying-guide',
  date: '2025-01-15',
  title: {
    'zh-hk': '璨肩礄鍗板埛閬歌臣瀹屽叏鎸囧崡锛氭潗璩€佸舰鐙€銆佺敤閫斿叏瑙ｆ瀽',
    en: 'Sticker Buying Guide: Materials, Shapes & Applications Explained',
    ja: '銈广儐銉冦偒銉煎嵃鍒烽伕銇虫柟瀹屽叏銈偆銉夛細鏉愯唱銆佸舰鐘躲€佺敤閫斻倰寰瑰簳瑙ｈ',
  },
  excerpt: {
    'zh-hk': '闃叉按璨肩礄銆侀€忔槑璨肩礄銆佺暟褰㈡ā鍒囪布绱欍€佺嚈閲戣布绱?..闈㈠皪鐪惧閬告搰濡備綍涓嬫墜锛熸櫤鍗伴洸鐐烘偍鏁寸悊棣欐腐璨肩礄鍗板埛鐨勫畬鏁撮伕璩兼敾鐣ャ€?,
    en: 'Waterproof, transparent, die-cut, foil stickers 鈥?a complete guide to choosing the right sticker type for your needs.',
    ja: '闃叉按銈广儐銉冦偒銉笺€侀€忔槑銈广儐銉冦偒銉笺€併儉銈ゃ偒銉冦儓銈广儐銉冦偒銉笺€佺當鎶笺仐銈广儐銉冦偒銉尖€斻亗銇仧銇儖銉笺偤銇渶閬┿仾銈广儐銉冦偒銉奸伕銇虫柟銈偆銉夈€?,
  },
  cover: {
    'zh-hk': '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-zh-hk.webp',
    en: '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-en.webp',
    ja: '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-ja.webp',
  },
};

const bgFlyer: BlogPostMeta = {
  slug: 'flyer-buying-guide',
  categoryKey: 'buying-guide',
  source: 'buying-guide',
  date: '2025-01-15',
  title: {
    'zh-hk': '鍌冲柈鍗板埛閬歌臣瀹屽叏鎸囧崡锛氬昂瀵搞€佺礄璩€佹懞娉曞叏鏀荤暐',
    en: 'Flyer Printing Buying Guide: Sizes, Paper & Folding Options',
    ja: '銉併儵銈峰嵃鍒烽伕銇虫柟瀹屽叏銈偆銉夛細銈点偆銈恒€佺敤绱欍€佹姌銈婃柟銈掑竟搴曡В瑾?,
  },
  excerpt: {
    'zh-hk': 'A4鍌冲柈銆丄5鍌冲柈銆佸皪鎽恒€佷笁鎽洪爜...鍌冲柈鍗板埛榛炴ǎ鎻€锛熸櫤鍗伴洸鐐烘偍鏁寸悊棣欐腐鍌冲柈鍗板埛鐨勫畬鏁撮伕璩兼敾鐣ャ€?,
    en: 'A4 flyers, A5 flyers, bi-fold, tri-fold 鈥?a complete guide to choosing flyer printing in Hong Kong for maximum marketing impact.',
    ja: 'A4銉併儵銈枫€丄5銉併儵銈枫€佷簩銇ゆ姌銈娿€佷笁銇ゆ姌銈娾€旈娓儊銉┿偡鍗板埛銇伕銇虫柟瀹屽叏銈偆銉夈€?,
  },
  cover: {
    'zh-hk': '/images/products/seedream-webp/zprintpro-flyers-a4-flyers-zh-hk-1.webp',
    en: '/images/products/seedream-webp/zprintpro-flyers-a4-flyers-en-1.webp',
    ja: '/images/products/seedream-webp/zprintpro-flyers-a4-flyers-ja-1.webp',
  },
};

const bgPackaging: BlogPostMeta = {
  slug: 'packaging-buying-guide',
  categoryKey: 'buying-guide',
  source: 'buying-guide',
  date: '2025-01-15',
  title: {
    'zh-hk': '鍖呰鐩掑畾鍒堕伕璩煎畬鍏ㄦ寚鍗楋細鐩掑瀷銆佹潗璩€佸伐钘濅竴娆℃悶鎳?,
    en: 'Packaging Box Buying Guide: Styles, Materials & Finishes',
    ja: '銉戙儍銈便兗銈哥閬搞伋鏂瑰畬鍏ㄣ偓銈ゃ儔锛氱鍨嬨€佹潗璩€佸姞宸ャ倰寰瑰簳瑙ｈ',
  },
  excerpt: {
    'zh-hk': '绂搧鐩掋€佸揩閬炵洅銆佸寲濡濆搧鐩掋€侀鍝佺洅...鍖呰鐩掗粸妯ｆ弨锛熸櫤鍗伴洸鐐烘偍鏁寸悊棣欐腐鍖呰鐩掑畾鍒剁殑瀹屾暣閬歌臣鏀荤暐銆?,
    en: 'Gift boxes, shipping boxes, cosmetic boxes, food boxes 鈥?a complete guide to custom packaging in Hong Kong.',
    ja: '銈儠銉堛儨銉冦偗銈广€侀厤閫佺銆佸寲绮у搧绠便€侀鍝佺鈥旈娓儜銉冦偙銉笺偢鍗板埛銇伕銇虫柟瀹屽叏銈偆銉夈€?,
  },
  cover: {
    'zh-hk': '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-zh-hk-1.webp',
    en: '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-en-1.webp',
    ja: '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-ja-1.webp',
  },
};

const bgPoster: BlogPostMeta = {
  slug: 'poster-buying-guide',
  categoryKey: 'buying-guide',
  source: 'buying-guide',
  date: '2025-01-15',
  title: {
    'zh-hk': '娴峰牨鍗板埛閬歌臣瀹屽叏鎸囧崡锛氬昂瀵搞€佺礄璩€佺敤閫斿叏瑙ｆ瀽',
    en: 'Poster Printing Buying Guide: Sizes, Paper & Applications',
    ja: '銉濄偣銈裤兗鍗板埛閬搞伋鏂瑰畬鍏ㄣ偓銈ゃ儔锛氥偟銈ゃ偤銆佺敤绱欍€佺敤閫斻倰寰瑰簳瑙ｈ',
  },
  excerpt: {
    'zh-hk': 'A1娴峰牨銆丄2娴峰牨銆佹埗澶栨捣鍫便€佽棟琛撴捣鍫?..娴峰牨鍗板埛榛炴ǎ鎻€锛熸櫤鍗伴洸鐐烘偍鏁寸悊棣欐腐娴峰牨鍗板埛鐨勫畬鏁撮伕璩兼敾鐣ャ€?,
    en: 'A1 posters, A2 posters, outdoor posters, art posters 鈥?a complete guide to poster printing in Hong Kong.',
    ja: 'A1銉濄偣銈裤兗銆丄2銉濄偣銈裤兗銆佸眿澶栥儩銈广偪銉笺€併偄銉笺儓銉濄偣銈裤兗鈥旈娓儩銈广偪銉煎嵃鍒枫伄閬搞伋鏂瑰畬鍏ㄣ偓銈ゃ儔銆?,
  },
  cover: {
    'zh-hk': '/images/products/seedream-webp/zprintpro-posters-a2-posters-zh-hk-1.webp',
    en: '/images/products/seedream-webp/zprintpro-posters-a2-posters-en-1.webp',
    ja: '/images/products/seedream-webp/zprintpro-posters-a2-posters-ja-1.webp',
  },
};

const bgPaperBag: BlogPostMeta = {
  slug: 'paper-bag-buying-guide',
  categoryKey: 'buying-guide',
  source: 'buying-guide',
  date: '2025-01-15',
  title: {
    'zh-hk': '绱欒鍗板埛閬歌臣瀹屽叏鎸囧崡锛氱礄璩€佸昂瀵搞€佹墜鎸藉叏鏀荤暐',
    en: 'Paper Bag Printing Buying Guide: Materials, Sizes & Handles',
    ja: '绱欒鍗板埛閬搞伋鏂瑰畬鍏ㄣ偓銈ゃ儔锛氭潗璩€併偟銈ゃ偤銆佹寔銇℃墜銈掑竟搴曡В瑾?,
  },
  excerpt: {
    'zh-hk': '鐗涚毊绱欒銆佺櫧鍗＄礄琚嬨€佺Ξ鍝佺礄琚?..绱欒鍗板埛榛炴ǎ鎻€锛熸櫤鍗伴洸鐐烘偍鏁寸悊棣欐腐绱欒鍗板埛鐨勫畬鏁撮伕璩兼敾鐣ャ€?,
    en: 'Kraft bags, white card bags, gift bags 鈥?a complete guide to paper bag printing in Hong Kong.',
    ja: '銈儵銉曘儓琚嬨€佺櫧鍗＄礄琚嬨€併偖銉曘儓琚嬧€旈娓礄琚嬪嵃鍒枫伄閬搞伋鏂瑰畬鍏ㄣ偓銈ゃ儔銆?,
  },
  cover: {
    'zh-hk': '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-zh-hk-1.webp',
    en: '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-en-1.webp',
    ja: '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-ja-1.webp',
  },
};

const bgBanner: BlogPostMeta = {
  slug: 'banner-buying-guide',
  categoryKey: 'buying-guide',
  source: 'buying-guide',
  date: '2025-02-01',
  title: {
    'zh-hk': '鍣寸躬寤ｅ憡閬歌臣瀹屽叏鎸囧崡锛歑灞曟灦銆佹槗鎷夊銆佽儗鏅澘鍏ㄦ敾鐣?,
    en: 'Banner Printing Buying Guide: X-Stands, Roll-ups & Backdrops',
    ja: '銉愩儕銉煎嵃鍒烽伕銇虫柟瀹屽叏銈偆銉夛細X銈广偪銉炽儔銆併儹銉笺儷銈儍銉椼€佽儗鏅澘銈掑竟搴曡В瑾?,
  },
  excerpt: {
    'zh-hk': 'X灞曟灦銆佹槗鎷夊銆佽儗鏅澘銆佹埗澶栧ぇ姗箙...鍣寸躬寤ｅ憡榛炴ǎ鎻€锛熸櫤鍗伴洸鐐烘偍鏁寸悊棣欐腐鍣寸躬寤ｅ憡鐨勫畬鏁撮伕璩兼敾鐣ャ€?,
    en: 'X-stands, roll-ups, backdrops, outdoor banners 鈥?a complete guide to banner printing in Hong Kong.',
    ja: 'X銈广偪銉炽儔銆併儹銉笺儷銈儍銉椼€佽儗鏅澘銆佸眿澶栨í鏂箷鈥旈娓儛銉娿兗鍗板埛銇伕銇虫柟瀹屽叏銈偆銉夈€?,
  },
  cover: {
    'zh-hk': '/images/products/seedream-webp/zprintpro-banners-roll-up-banners-zh-hk.webp',
    en: '/images/products/seedream-webp/zprintpro-banners-roll-up-banners-en.webp',
    ja: '/images/products/seedream-webp/zprintpro-banners-roll-up-banners-ja.webp',
  },
};

const bgBook: BlogPostMeta = {
  slug: 'book-buying-guide',
  categoryKey: 'buying-guide',
  source: 'buying-guide',
  date: '2025-02-05',
  title: {
    'zh-hk': '鏇哥睄鍗板埛閬歌臣瀹屽叏鎸囧崡锛氳瑷傛柟寮忋€佺礄寮点€佸皝闈㈠伐钘濆叏鏀荤暐',
    en: 'Book Printing Buying Guide: Binding, Paper & Cover Finishes',
    ja: '鏇哥睄鍗板埛閬搞伋鏂瑰畬鍏ㄣ偓銈ゃ儔锛氳＝鏈柟寮忋€佺礄銆佽〃绱欏姞宸ャ倰寰瑰簳瑙ｈ',
  },
  excerpt: {
    'zh-hk': '楱庨Μ閲樸€佽啝瑁濄€佺簿瑁?..鏇哥睄鍗板埛榛炴ǎ鎻€锛熸櫤鍗伴洸鐐烘偍鏁寸悊棣欐腐鏇哥睄鍗板埛鐨勫畬鏁撮伕璩兼敾鐣ャ€?,
    en: 'Saddle-stitch, perfect binding, hardcover 鈥?a complete guide to book printing in Hong Kong.',
    ja: '涓洞銇樸€佺劇绶氱洞銇樸€佷笂瑁芥湰鈥旈娓浉绫嶅嵃鍒枫伄閬搞伋鏂瑰畬鍏ㄣ偓銈ゃ儔銆?,
  },
  cover: {
    'zh-hk': '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-zh-hk-1.webp',
    en: '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-en-1.webp',
    ja: '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-ja-1.webp',
  },
};

const bgMenu: BlogPostMeta = {
  slug: 'menu-buying-guide',
  categoryKey: 'buying-guide',
  source: 'buying-guide',
  date: '2025-02-10',
  title: {
    'zh-hk': '椁愮墝鍗板埛閬歌臣瀹屽叏鎸囧崡锛氭潗璩€佸伐钘濄€佽€愮敤搴﹀叏鏀荤暐',
    en: 'Menu Printing Buying Guide: Materials, Finishes & Durability',
    ja: '銉°儖銉ャ兗鍗板埛閬搞伋鏂瑰畬鍏ㄣ偓銈ゃ儔锛氭潗璩€佸姞宸ャ€佽€愪箙鎬с倰寰瑰簳瑙ｈ',
  },
  excerpt: {
    'zh-hk': 'PVC椁愮墝銆侀亷鑶犻鐗屻€佺‖鑶犲銆佺毊闈╅鐗?..椁愮墝鍗板埛榛炴ǎ鎻€锛熸櫤鍗伴洸鐐烘偍鏁寸悊棣欐腐椁愮墝鍗板埛鐨勫畬鏁撮伕璩兼敾鐣ャ€?,
    en: 'PVC menus, laminated menus, hard sleeves, leather menus 鈥?a complete guide to menu printing in Hong Kong.',
    ja: 'PVC銉°儖銉ャ兗銆併儵銉熴儘銉笺儓銉°儖銉ャ兗銆佺‖璩偙銉笺偣銆侀潻銉°儖銉ャ兗鈥旈娓儭銉嬨儱銉煎嵃鍒枫伄閬搞伋鏂瑰畬鍏ㄣ偓銈ゃ儔銆?,
  },
  cover: {
    'zh-hk': '/images/products/seedream-webp/zprintpro-menus-pvc-menus-zh-hk-1.webp',
    en: '/images/products/seedream-webp/zprintpro-menus-pvc-menus-en-1.webp',
    ja: '/images/products/seedream-webp/zprintpro-menus-pvc-menus-ja-1.webp',
  },
};

// =============================================================================
// 10 LEGACY POSTS  (from [slug]/page.tsx `posts` object, dates 2024-03~06)
// =============================================================================

const lpCompanyIntro: BlogPostMeta = {
  slug: 'company-intro',
  categoryKey: 'company-news',
  source: 'legacy',
  date: '2024-06-01',
  title: {
    'zh-hk': '鏅哄嵃闆插嵃鍒峰叕鍙哥啊浠嬶細灏堟キ瑷倷鑸囦竴绔欏紡鍗板埛鏈嶅嫏',
    en: 'About ZprintPro: Professional Equipment & One-Stop Printing Services',
    ja: 'ZprintPro浼氱ぞ姒傝锛氬皞闁€瑷倷銇ㄣ儻銉炽偣銉堛儍銉楀嵃鍒枫偟銉笺儞銈?,
  },
  excerpt: {
    'zh-hk': '鏅哄嵃闆叉搧鏈夋捣寰峰牎6+1鍗板埛姗熴€丠P鏁哥⒓鍗板埛姗熴€侀Μ澶╁凹鑶犺绶氱瓑鍏堥€茶ō鍌欙紝鎻愪緵寰炶ō瑷堝埌鍗板埛鍒板緦鍔犲伐鐨勪竴绔欏紡鏈嶅嫏銆?,
    en: 'ZprintPro features Heidelberg 6+1 printing presses, HP digital printers, and Martini perfect binding lines for full-service printing solutions.',
    ja: 'ZprintPro銇儚銈ゃ儑銉儥銉偘6+1鍗板埛姗熴€丠P銉囥偢銈裤儷鍗板埛姗熴€併優銉儐銈ｃ儖瑁芥湰銉┿偆銉炽仾銇┿伄鍏堥€茶ō鍌欍倰淇濇湁銇椼€併儻銉炽偣銉堛儍銉楀嵃鍒枫偟銉笺儞銈广倰鎻愪緵銇椼仸銇勩伨銇欍€?,
  },
  cover: {
    'zh-hk': '/images/blog/zh-hk/company-intro.webp',
    en: '/images/blog/en/company-intro.webp',
    ja: '/images/blog/ja/company-intro.webp',
  },
};

const lpStickerGuide: BlogPostMeta = {
  slug: 'sticker-guide',
  categoryKey: 'sticker',
  source: 'legacy',
  date: '2024-04-15',
  title: {
    'zh-hk': '棣欐腐璨肩礄鍗板埛瀹屽叏鎸囧崡锛氭潗璩€佸伐钘濊垏鎳夌敤鍫存櫙瑭宠В',
    en: 'Complete Sticker Printing Guide: Materials, Finishes & Applications',
    ja: '棣欐腐銈广儐銉冦偒銉煎嵃鍒峰畬鍏ㄣ偓銈ゃ儔锛氭潗璩€佸姞宸ャ€佸繙鐢ㄣ偡銉笺兂銈掕┏瑙?,
  },
  excerpt: {
    'zh-hk': '娣卞叆浜嗚В棣欐腐璨肩礄鍗板埛鐨勫悇绋潗璩伕鎿囥€佽〃闈㈣檿鐞嗗伐钘濅互鍙婁笉鍚屽牬鏅殑鎳夌敤寤鸿銆傛櫤鍗伴洸灏堝鐐烘偍瑭宠В闃叉按銆侀€忔槑銆佺嚈閲戠瓑鐔遍杸閬搁爡銆?,
    en: 'Deep dive into sticker material choices, surface treatments, and application scenarios.',
    ja: '棣欐腐銈广儐銉冦偒銉煎嵃鍒枫伄妲樸€呫仾鏉愯唱閬告姙銆佽〃闈㈠嚘鐞嗐€佸繙鐢ㄣ偡銉笺兂銈掕┏銇椼亸瑙ｈ銆?,
  },
  cover: {
    'zh-hk': '/images/blog/zh-hk/sticker-guide.webp',
    en: '/images/blog/en/sticker-guide.webp',
    ja: '/images/blog/ja/sticker-guide.webp',
  },
};

const lpBusinessCardDesign: BlogPostMeta = {
  slug: 'business-card-design',
  categoryKey: 'card',
  source: 'legacy',
  date: '2024-04-10',
  title: {
    'zh-hk': '鍚嶇墖瑷▓鐨?0鍊嬮粌閲戞硶鍓囷細鎵撻€犱护浜洪洠蹇樼殑灏堟キ褰㈣薄',
    en: '10 Golden Rules for Business Card Design',
    ja: '鍚嶅埡銉囥偠銈ゃ兂銇?0銇粍閲戞硶鍓囷細鍗拌薄銇畫銈嬨儣銉儠銈с儍銈枫儳銉娿儷銈ゃ儭銉笺偢銈掍綔銈?,
  },
  excerpt: {
    'zh-hk': '寰炴帓鐗堝埌鑹插僵鎼厤锛屾帉鎻″悕鐗囪ō瑷堢殑鏍稿績鎶€宸с€傛櫤鍗伴洸瑷▓灏堝鍒嗕韩10鍊嬮粌閲戞硶鍓囷紝鍔╂偍鎵撻€犱护浜哄嵃璞℃繁鍒荤殑灏堟キ鍚嶇墖銆?,
    en: 'Master the core techniques of business card design.',
    ja: '銉偆銈偊銉堛亱銈夎壊銇祫銇垮悎銈忋仜銇俱仹銆佸悕鍒恒儑銈躲偆銉炽伄涓牳銉嗐偗銉嬨儍銈倰銉炪偣銈裤兗銆?,
  },
  cover: {
    'zh-hk': '/images/blog/zh-hk/business-card-design.webp',
    en: '/images/blog/en/business-card-design.webp',
    ja: '/images/blog/ja/business-card-design.webp',
  },
};

const lpPackagingTrends: BlogPostMeta = {
  slug: 'packaging-trends',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2024-04-05',
  title: {
    'zh-hk': '2024鍖呰鐩掕ō瑷堣定鍕㈣В鏋愶細璁撶敘鍝佸湪璨ㄦ灦涓婅劔绌庤€屽嚭',
    en: '2024 Packaging Design Trends Analysis',
    ja: '2024銉戙儍銈便兗銈搞儨銉冦偗銈广儑銈躲偆銉炽儓銉兂銉夎В鏋?,
  },
  excerpt: {
    'zh-hk': '鎺㈢储2024骞存渶鏂板寘瑁濈洅瑷▓瓒ㄥ嫝锛屽緸妤电啊涓荤京鍒扮挵淇濇潗璩€傛櫤鍗伴洸鐐烘偍瑙ｆ瀽濡備綍璁撶敘鍝佸寘瑁濇垚鐐哄搧鐗屾渶浣充唬瑷€浜恒€?,
    en: 'Explore latest packaging design trends.',
    ja: '2024骞存渶鏂般儜銉冦偙銉笺偢銉溿儍銈偣銉囥偠銈ゃ兂銉堛儸銉炽儔銈掓帰銈嬨€?,
  },
  cover: {
    'zh-hk': '/images/blog/blog-packaging-trends-zh-hk.webp',
    en: '/images/blog/blog-sticker-guide-en.webp',
    ja: '/images/blog/blog-sticker-guide-ja.webp',
  },
};

const lpCmykGuide: BlogPostMeta = {
  slug: 'cmyk-guide',
  categoryKey: 'printing',
  source: 'legacy',
  date: '2024-03-28',
  title: {
    'zh-hk': 'CMYK vs RGB锛氬嵃鍒疯壊褰╂ā寮忓畬鍏ㄨ┏瑙?,
    en: 'CMYK vs RGB: Complete Guide to Print Color Modes',
    ja: 'CMYK vs RGB锛氬嵃鍒枫偒銉┿兗銉兗銉夊畬鍏ㄨ┏瑙?,
  },
  excerpt: {
    'zh-hk': '鐞嗚ВCMYK鍜孯GB鑹插僵妯″紡鐨勫崁鍒ワ紝纰轰繚鎮ㄧ殑瑷▓鍦ㄥ嵃鍒锋檪鍛堢従鏈€浣虫晥鏋溿€傛櫤鍗伴洸鍗板埛灏堝鐐烘偍瑭宠В鑹插僵绠＄悊銆?,
    en: 'Understand color modes for optimal print results.',
    ja: 'CMYK銇≧GB銈儵銉笺儮銉笺儔銇仌銇勩倰鐞嗚В銇椼€佸嵃鍒枫仹鏈€閬┿仾鍔规灉銈掑緱銈嬨€?,
  },
  cover: {
    'zh-hk': '/images/blog/blog-sticker-guide-zh-hk.webp',
    en: '/images/blog/blog-business-card-design-en-3.webp',
    ja: '/images/blog/blog-business-card-design-ja-3.webp',
  },
};

const lpPaperMaterials: BlogPostMeta = {
  slug: 'paper-materials',
  categoryKey: 'printing',
  source: 'legacy',
  date: '2024-03-20',
  title: {
    'zh-hk': '鍗板埛绱欐潗閬告搰鎸囧崡锛氬緸閵呯増绱欏埌鐗圭ó绱?,
    en: 'Paper Selection Guide: From Art Paper to Specialty Stock',
    ja: '鍗板埛绱欐潗閬告姙銈偆銉夛細銈炽兗銉堢礄銇嬨倝鐗规畩绱欍伨銇?,
  },
  excerpt: {
    'zh-hk': '涓嶅悓绱欐潗鐨勭壒鎬ц垏閬╃敤鍫存櫙鍒嗘瀽锛屽公鍔╂偍鐐洪爡鐩伕鎿囨渶鍚堥仼鐨勫嵃鍒风礄寮点€傛櫤鍗伴洸300+绋礄鏉愪换鎮ㄩ伕鎿囥€?,
    en: 'Analysis of different paper characteristics.',
    ja: '鐣般仾銈嬬礄鏉愩伄鐗规€с仺閬╃敤銈枫兗銉炽伄鍒嗘瀽銆?,
  },
  cover: {
    'zh-hk': '/images/blog/blog-packaging-trends-zh-hk.webp',
    en: '/images/blog/blog-sticker-guide-en.webp',
    ja: '/images/blog/blog-sticker-guide-ja.webp',
  },
};

const lpEcoPrinting: BlogPostMeta = {
  slug: 'eco-printing',
  categoryKey: 'trends',
  source: 'legacy',
  date: '2024-03-15',
  title: {
    'zh-hk': '鐠颁繚鍗板埛锛氫紒妤璄SG鑸囧彲鎸佺簩鍖呰鐨勬湭渚?,
    en: 'Eco-Friendly Printing: The Future of Sustainable Packaging',
    ja: '銈ㄣ偝鍗板埛锛氫紒妤伄ESG銇ㄦ寔缍氬彲鑳姐仾銉戙儍銈便兗銈搞伄鏈潵',
  },
  excerpt: {
    'zh-hk': '浜嗚В鐠颁繚鍗板埛鏉愭枡鍜屽伐钘濓紝鐐哄湴鐞冨拰鍝佺墝褰㈣薄闆欒磸鍋氬嚭閬告搰銆傛櫤鍗伴洸鍔╂偍瀵︾従缍犺壊鍗板埛鐩銆?,
    en: 'Learn about eco-friendly printing materials.',
    ja: '銈ㄣ偝鍗板埛鏉愭枡銇ㄥ伐绋嬨倰鐞嗚В銇椼€佸湴鐞冦仺銉栥儵銉炽儔銈ゃ儭銉笺偢銇弻璧倰閬告姙銆?,
  },
  cover: {
    'zh-hk': '/images/blog/blog-packaging-trends-zh-hk-2.webp',
    en: '/images/blog/blog-sticker-guide-en-2.webp',
    ja: '/images/blog/blog-sticker-guide-ja-2.webp',
  },
};

const lpHKPrintingGuide: BlogPostMeta = {
  slug: 'hong-kong-printing-guide',
  categoryKey: 'hongkong',
  source: 'legacy',
  date: '2024-05-20',
  title: {
    'zh-hk': '棣欐腐鍗板埛鍏徃閬告搰瀹屽叏鎸囧崡锛氳濉樸€佷節榫嶃€佹柊鐣屽摢瑁℃渶鍙潬锛?,
    en: 'Custom Sticker & Packaging Printing Guide for US Small Business | MOQ, Materials, FedEx Ground 5-7 Day',
    ja: '銈儶銈搞儕銉偣銉嗐儍銈兗銉汇儜銉冦偙銉笺偢鍗板埛銈偆銉夛細灏忋儹銉冦儓銉荤煭绱嶆湡銉汇儑銉笺偪鍏ョ | ZprintPro',
  },
  excerpt: {
    'zh-hk': '娣卞叆姣旇純棣欐腐瑙€濉樸€佷節榫嶃€佹柊鐣岀殑鍗板埛鍏徃锛屽緸鍍规牸銆佸搧璩€佷氦璨ㄩ€熷害鍒板鎴惰鍍癸紝骞偍鎵惧埌鏈€閬╁悎鐨勫嵃鍒峰悎浣滃ぅ浼淬€?,
    en: 'Complete guide to custom stickers, packaging boxes, and labels for US small business. Compare vinyl/PVC/Kraft/clear materials, 50-1000 MOQ, Free shipping over $99, FedEx Ground 5-7 day or DHL Express 2-4 day, ISO 9001 certified factory-direct pricing.',
    ja: '銈儶銈搞儕銉偣銉嗐儍銈兗銉汇儜銉冦偙銉笺偢銉诲嵃鍒风墿銇畬鍏ㄣ偓銈ゃ儔銆傜礌鏉愶紙銉撱儖銉笺儷銉籔VC銉汇偗銉┿儠銉堛兓閫忔槑銉荤當鎶笺仐锛夈兓灏忋儹銉冦儓锛?0鏋氥€滐級銉荤煭绱嶆湡锛堟渶鐭?鏃ュ嚭鑽凤級銉诲叏鍥介€佹枡杈笺伩銉籇HL鍥介殯閰嶉€佸蹇溿€備腑灏忎紒妤兓D2C銉栥儵銉炽儔銉诲悓浜恒偟銉笺偗銉悜銇戙€?,
  },
  cover: {
    'zh-hk': '/images/blog/blog-sticker-guide-zh-hk.webp',
    en: '/images/blog/blog-sticker-guide-en-2.webp',
    ja: '/images/blog/blog-sticker-guide-ja-2.webp',
  },
};

const lpDesignFileSpecs: BlogPostMeta = {
  slug: 'design-file-specs',
  categoryKey: 'design',
  source: 'legacy',
  date: '2024-05-15',
  title: {
    'zh-hk': '鍗板埛鏂囦欢瑷▓瑕忕瘎锛氬嚭琛€浣嶃€佸垎杈ㄧ巼銆佽壊褰╂ā寮忎竴娆℃悶鎳?,
    en: 'Print File Design Specifications: Bleed, Resolution & Color Modes',
    ja: '鍗板埛銉曘偂銈ゃ儷銉囥偠銈ゃ兂浠曟',
  },
  excerpt: {
    'zh-hk': '寰炲嚭琛€浣嶈ō缃埌鑹插僵妯″紡杞夋彌锛岄€欑瘒鎸囧崡灏囧公鍔╄ō瑷堝斧鍜屼紒妤伩鍏嶆渶甯歌鐨勫嵃鍒锋枃浠堕尟瑾ゃ€?,
    en: 'Master bleed settings, resolution requirements, and color mode conversions for perfect prints.',
    ja: '銉栥儶銉笺儔銆佽В鍍忓害銆併偒銉┿兗銉兗銉夈伄澶夋彌銈掋優銈广偪銉笺€?,
  },
  cover: {
    'zh-hk': '/images/blog/blog-sticker-guide-zh-hk-2.webp',
    en: '/images/blog/blog-sticker-guide-en-3.webp',
    ja: '/images/blog/blog-sticker-guide-ja-3.webp',
  },
};

const lpBrandChecklist: BlogPostMeta = {
  slug: 'brand-materials-checklist',
  categoryKey: 'branding',
  source: 'legacy',
  date: '2024-05-10',
  title: {
    'zh-hk': '浼佹キ鍝佺墝鐗╂枡娓呭柈锛氬緸鍚嶇墖鍒板睍鏋剁殑鍏ㄥ鍗板埛鏂规',
    en: 'Corporate Brand Materials Checklist: From Cards to Displays',
    ja: '浼佹キ銉栥儵銉炽儔璩囨潗銉併偋銉冦偗銉偣銉?,
  },
  excerpt: {
    'zh-hk': '鐒¤珫鏄垵鍓典紒妤倓鏄搧鐗屽崌绱氾紝閫欎唤瀹屾暣鐨勫搧鐗岀墿鏂欏嵃鍒锋竻鍠皣骞姪鎮ㄧ郴绲卞寲鍦拌鍔冩墍鏈夊嵃鍒烽渶姹傘€?,
    en: 'A complete checklist of printed brand materials for startups and brand refreshes.',
    ja: '銈广偪銉笺儓銈儍銉椼亱銈夈儢銉┿兂銉夈儶銉嬨儱銉笺偄銉伨銇с€佸畬鍏ㄣ仾鍗板埛璩囨潗銉併偋銉冦偗銉偣銉堛€?,
  },
  cover: {
    'zh-hk': '/images/blog/blog-business-card-design-zh-hk.webp',
    en: '/images/blog/blog-business-card-design-en.webp',
    ja: '/images/blog/blog-business-card-design-ja.webp',
  },
};

const lpMtrSpecs: BlogPostMeta = {
  slug: 'mtr-advertising-specs',
  categoryKey: 'hongkong',
  source: 'legacy',
  date: '2024-05-05',
  title: {
    'zh-hk': '娓惖寤ｅ憡鍗板埛瑕忔牸鍏ㄨВ鏋愶細娓扯绶氥€佽濉樼窔銆佽崈鐏ｇ窔鎶曟斁鎸囧崡',
    en: 'Event Poster & Trade Show Print Specs for US B2B | Sizes, Paper, Finishes, FedEx 2-Day',
    ja: '銈ゃ儥銉炽儓銉濄偣銈裤兗銉诲睍绀恒儜銉嶃儷鍗板埛浠曟锛氥偟銈ゃ偤銉荤敤绱欍兓鍔犲伐銉荤煭绱嶆湡 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '瑭崇窗瑙ｆ瀽娓惖鍚勭窔璺唬鍛婁綅鐨勫嵃鍒疯鏍笺€佸昂瀵歌姹傚拰鎶曟斁绛栫暐锛屽姪鎮ㄥ湪棣欐腐鏈€绻佸繖鐨勪氦閫氱恫绲′腑绮炬簴瑙搁仈鐩瀹㈡埗銆?,
    en: 'Event poster and trade show print specs for US B2B and conference organizers. Standard sizes (A3/A2/A1/A0/24x36"), paper (gloss/matte/PP/canvas), finishing (lamination/hole/grommet), bulk 50-1000 runs, FedEx 2-Day or DHL Express 2-4 day from Asia factory.',
    ja: '銈ゃ儥銉炽儓銉濄偣銈裤兗銉诲睍绀恒儜銉嶃儷銉诲睍绀轰細銇嵃鍒蜂粫妲樸€傛婧栥偟銈ゃ偤锛圓3/A2/A1/A0/24x36銈ゃ兂銉侊級銉荤敤绱欙紙鍏夋并銉汇優銉冦儓銉籔P銉汇偔銉ｃ兂銉愩偣锛夈兓鍔犲伐锛圲V銉┿儫銉嶃兗銉堛兓绌淬亗銇戙兓銈般儹銉°儍銉堬級銉荤煭绱嶆湡锛?鏃ャ€?鏃ュ嚭鑽凤級銉籇HL鍥介殯閰嶉€佸蹇溿€傚睍绀轰細涓诲偓銉汇偆銉欍兂銉堜紒鐢讳細绀惧悜銇戙€?,
  },
  cover: {
    'zh-hk': '/images/blog/blog-business-card-design-zh-hk-2.webp',
    en: '/images/blog/blog-business-card-design-en-2.webp',
    ja: '/images/blog/blog-business-card-design-ja-2.webp',
  },
};

const lpFlyerPrintingGuide: BlogPostMeta = {
  slug: 'flyer-printing-guide',
  categoryKey: 'printing',
  source: 'legacy',
  date: '2026-07-02',
  title: {
    'zh-hk': '棣欐腐鍌冲柈鍗板埛瀹屽叏鎸囧崡锛氬昂瀵搞€佺礄璩€佽ō瑷堝埌娲剧櫦鍏ㄦ敾鐣?,
    en: 'Custom Flyer Printing Guide for US Small Business: Sizes, Paper, Design | Free Shipping $99+',
    ja: '銈儶銈搞儕銉儊銉┿偡鍗板埛銈偆銉夛細銈点偆銈恒兓鐢ㄧ礄銉汇儑銈躲偆銉炽兓閰嶅竷鎴︾暐 | 灏忋儹銉冦儓瀵惧繙',
  },
  excerpt: {
    'zh-hk': '寰濧4鍌冲柈銆丄5鍌冲柈鍒颁笁鎽哄偝鍠紝鏉愯唱寰為妳鐗堢礄鍒版浉绱欙紝鏅哄嵃闆茬偤鎮ㄦ媶瑙ｉ娓偝鍠嵃鍒风殑灏哄閬告搰銆佺礄璩皪姣斻€佽ō瑷堣榛炶垏娲剧櫦绛栫暐銆?,
    en: 'Custom flyer printing guide for US small business. Standard sizes (4x6 / 5x7 / 8.5x11 / A4), paper (glossy/matte/recycled/silk), finishing (UV coating/lamination/folding), 25-5000 MOQ, Free shipping over $99 USA, 3-5 day turnaround from Asia factory.',
    ja: '銈儶銈搞儕銉儊銉┿偡鍗板埛瀹屽叏銈偆銉夈€傛婧栥偟銈ゃ偤锛圓4銉籄5銉籅5銉籄6锛夈兓鐢ㄧ礄锛堛偝銉笺儓绱欍兓銉炪儍銉堢礄銉讳笂璩礄銉诲啀鐢熺礄锛夈兓鍔犲伐锛堜浮闈㈠嵃鍒枫兓鎶樸倞銉籔P鍔犲伐锛夈兓灏忋儹銉冦儓瀵惧繙锛?0鏋氥€?000鏋氾級銉荤煭绱嶆湡锛?鏃ャ€?鏃ュ嚭鑽凤級銆傞２椋熷簵銉诲皬澹层兓涓嶅嫊鐢ｃ兓銈ゃ儥銉炽儓涓诲偓鑰呭悜銇戙€?,
  },
  cover: {
    'zh-hk': '/images/blog/zh-hk/flyer-printing-guide.webp',
    en: '/images/blog/en/flyer-printing-guide.webp',
    ja: '/images/blog/ja/flyer-printing-guide.webp',
  },
};

const lpFoodPackagingGuide: BlogPostMeta = {
  slug: 'food-packaging-printing-guide',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2026-07-02',
  title: {
    'zh-hk': '椋熷搧鍖呰鍗板埛瀹屽叏鎸囧崡锛氭潗璩€佸畨鍏ㄣ€佹硶瑕忚垏瑷▓瀵﹀嫏',
    en: 'Food Packaging Printing Guide: Materials, Safety & Compliance',
    ja: '椋熷搧銉戙儍銈便兗銈稿嵃鍒峰畬鍏ㄣ偓銈ゃ儔锛氭潗璩€佸畨鍏ㄦ€с€佹硶瑕忓埗銇ㄣ儑銈躲偆銉冲疅鍕?,
  },
  excerpt: {
    'zh-hk': '椋熷搧绱氬寘瑁濆嵃鍒烽粸妯ｆ弨锛熷緸鐗涚毊绱欑洅鍒伴鍝佺礆娣嬭啘锛岄鍝佸畨鍏ㄨ獚璀夊埌瑷▓瀵﹀嫏锛屾櫤鍗伴洸鐐烘偍鎷嗚В椋熷搧鍖呰鍗板埛鐨勬瘡鍊嬮棞閸电挵绡€銆?,
    en: 'Food-grade packaging printing essentials 鈥?from kraft boxes to food-safe lamination, certifications to design best practices.',
    ja: '椋熷搧銈般儸銉笺儔銉戙儍銈便兗銈稿嵃鍒枫伄閬搞伋鏂光€斻偗銉┿儠銉堢礄绠便亱銈夐鍝佸蹇溿儵銉熴儘銉笺儓銆佽獚瑷笺亱銈夈儑銈躲偆銉冲疅鍕欍伨銇у竟搴曡В瑾€?,
  },
  cover: {
    'zh-hk': '/images/blog/zh-hk/food-packaging-printing-guide.webp',
    en: '/images/blog/en/food-packaging-printing-guide.webp',
    ja: '/images/blog/ja/food-packaging-printing-guide.webp',
  },
};

const lpPaperBagPrintingGuide: BlogPostMeta = {
  slug: 'paper-bag-printing-guide',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2026-07-02',
  title: {
    'zh-hk': '棣欐腐绱欒鍗板埛瀹屽叏鎸囧崡锛氭潗璩€佸昂瀵搞€佹墜鎸借垏瑷▓瓒ㄥ嫝',
    en: 'Paper Bag Printing Guide: Materials, Sizes, Handles & Design Trends',
    ja: '銈儶銈搞儕銉礄琚嬪嵃鍒峰畬鍏ㄣ偓銈ゃ儔锛氱礌鏉愩兓銈点偆銈恒兓鎸併仭鎵嬨仺2026骞淬儓銉兂銉?| 灏忋儹銉冦儓瀵惧繙',
  },
  excerpt: {
    'zh-hk': '鐗涚毊绱欒銆佺櫧鍗＄礄琚嬨€佺Ξ鍝佺礄琚嬨€佺挵淇濈礄琚?..绱欒鍗板埛榛炴ǎ鎻€锛熸櫤鍗伴洸鐐烘偍鎷嗚В棣欐腐绱欒鍗板埛鐨勬潗璩€佸昂瀵搞€佹墜鎸介伕鎿囪垏瑷▓瓒ㄥ嫝銆?,
    en: 'Kraft bags, white card bags, gift bags, eco bags 鈥?a complete guide to paper bag printing in Hong Kong.',
    ja: '銈儵銉曘儓绱欒銆佺櫧銈兗銉夌礄琚嬨€併偖銉曘儓绱欒銆併偍銈炽儛銉冦偘銇俱仹銆佹棩鏈伄 boutique銉汇偒銉曘偋銉诲皬澹插悜銇戙伀绱欒鍗板埛銈掑竟搴曡В瑾€?0鏋氥€溿€佺煭绱嶆湡锛?鏃ャ€?鏃ュ嚭鑽凤級銆佸叏鍥介€佹枡杈笺伩銆?,
  },
  cover: {
    'zh-hk': '/images/blog/zh-hk/paper-bag-printing-guide.webp',
    en: '/images/blog/en/paper-bag-printing-guide.webp',
    ja: '/images/blog/ja/paper-bag-printing-guide.webp',
  },
};


const lpPosterPrintingGuide: BlogPostMeta = {
  slug: 'poster-printing-guide',
  categoryKey: 'printing',
  source: 'legacy',
  date: '2026-07-02',
  title: {
    'zh-hk': '棣欐腐娴峰牨鍗板埛瀹屽叏鎸囧崡锛氬昂瀵搞€佺礄璩€佸伐钘濊垏瑷▓瑕侀粸',
    en: 'Custom Poster Printing Guide for US Events & Retail: Sizes, Paper, Finishes | Free Shipping',
    ja: '銈儶銈搞儕銉儩銈广偪銉煎嵃鍒枫偓銈ゃ儔锛氥偟銈ゃ偤銉荤敤绱欍兓鍔犲伐銉汇儑銈躲偆銉?| 鐭磵鏈熷蹇?,
  },
  excerpt: {
    'zh-hk': '寰濧3鍒癆0锛屽緸閵呯増绱欏埌PP鑶犵墖锛屽緸娴峰牨绛掑寘瑁濆埌鎵归噺浜よ波锛屾櫤鍗伴洸鐐烘偍鎷嗚В棣欐腐娴峰牨鍗板埛鐨勫昂瀵搁伕鎿囥€佺礄璩皪姣斻€佸伐钘濋伕闋呰垏瑷▓瑕侀粸銆?,
    en: 'Custom poster printing guide for US event organizers and retail. Standard sizes (A3/A2/A1/A0/18x24"/24x36"), paper (gloss/matte/PP film/canvas), finishing (UV/lamination/edge tape), 25-1000 MOQ, Free shipping over $99 USA, 3-5 day turnaround from Asia factory.',
    ja: '銈儶銈搞儕銉儩銈广偪銉煎嵃鍒峰畬鍏ㄣ偓銈ゃ儔銆傛婧栥偟銈ゃ偤锛圓3銉籄2銉籄1銉籄0銉籅1銉籅2锛夈兓鐢ㄧ礄锛堝厜娌㈢礄銉汇優銉冦儓绱欍兓鍚堟垚绱欍兓鑰愭按PP銉汇偔銉ｃ兂銉愩偣锛夈兓鍔犲伐锛圲V銉┿儫銉嶃兗銉堛兓PP鍔犲伐銉诲懆鍥层儐銉笺儣锛夈兓鐭磵鏈燂紙3鏃ャ€?鏃ュ嚭鑽凤級銆傘偆銉欍兂銉堜富鍌兓灞曠ず浼氥兓灏忓２搴椼兓涓嶅嫊鐢ｅ悜銇戙€?,
  },
  cover: {
    'zh-hk': '/images/blog/zh-hk/poster-printing-guide.webp',
    en: '/images/blog/en/poster-printing-guide.webp',
    ja: '/images/blog/ja/poster-printing-guide.webp',
  },
};

const lpPackagingBoxCustomGuide: BlogPostMeta = {
  slug: 'packaging-box-custom-guide',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2026-07-03',
  // 2026-07-05 fix (NAP vs SEO 鍐呭鑴遍挬): zh-hk 鐢ㄦ埛甯傚満 = 棣欐腐 (淇濈暀 HK 瑙嗚);
  // en/ja 鐢ㄦ埛甯傚満 = US/UK/AU/JP, 鏍囬閲岀‖濉?in Hong Kong / 棣欐腐" = 鏈烘缈昏瘧, 鏃犺鍚屾劅.
  // en: 鍏ㄧ悆閫氱敤 + 寮鸿皟"6 鐩掑瀷瀵规瘮 + 2026 鏈€鏂?; ja: 寮鸿皟"6 銇ゃ伄绠卞瀷寰瑰簳姣旇純"
  title: {
    'zh-hk': '棣欐腐鍖呰鐩掕▊瑁藉畬鍏ㄦ寚鍗楋細鐩掑瀷銆佹潗璩€佸伐钘濊垏闋愮畻鎺у埗',
    en: 'Custom Packaging Box Guide 2026: 6 Box Styles, Materials & Finishes Compared | ZprintPro',
    ja: '銉戙儍銈便兗銈哥銈偣銈裤儬瀹屽叏銈偆銉?026锛?銇ゃ伄绠卞瀷銉荤礌鏉愩兓鍔犲伐銈掑竟搴曟瘮杓?| ZprintPro',
  },
  excerpt: {
    'zh-hk': '寰炲ぉ鍦扮洅鍒伴姗熺洅锛屽緸鐧藉崱绱欏埌鐗圭ó绱欙紝寰炵嚈閲戝埌鎿婂嚫鈥斺€旀櫤鍗伴洸鐐烘偍鎷嗚В棣欐腐鍖呰鐩掕▊瑁界殑鐩掑瀷閬告搰銆佺礄鏉愬皪姣斻€佸伐钘濇惌閰嶈垏闋愮畻鎺у埗绛栫暐锛屽姪鎮ㄧ敤鍚堢悊鎴愭湰鎵撻€犲搧鐗屽皥灞寘瑁濄€?,
    en: 'Lid-base, book-style, drawer, mailer, magnetic 鈥?6 main box styles compared side by side. Pick the right box for your brand and budget, with paper tier and finish recommendations.',
    ja: '澶╁湴钃嬬銉汇儢銉冦偗鍨嬨兓寮曘亶鍑恒仐绠便兓銉°兗銉儕銉肩銉汇優銈般儘銉冦儓寮忊€斺€?銇ゃ伄涓昏绠卞瀷銈掓í涓︺伋銇у竟搴曟瘮杓冦€傘儢銉┿兂銉夈仺浜堢畻銇悎銇ｃ仧绠便倰銆佺礌鏉愩仺鍔犲伐銇彁妗堛仺銇ㄣ倐銇亰灞娿亼銆?,
  },
  cover: {
    'zh-hk': '/images/blog/zh-hk/sticker-guide.webp',
    en: '/images/blog/en/sticker-guide.webp',
    ja: '/images/blog/ja/sticker-guide.webp',
  },
};

// 2026-07-04 v2 绱旀枃瀛楁繁搴﹀崥瀹?(no cover, no inline img) 鈥?Tier A 琛屾キ 脳 P0 flyers 椤炵洰
const lpRestaurantOpeningFlyer: BlogPostMeta = {
  slug: 'restaurant-opening-flyer-printing-guide',
  categoryKey: 'flyers',
  source: 'legacy',
  date: '2026-07-04',
  title: {
    // 2026-07-05 fix (NAP vs SEO 鍐呭鑴遍挬): zh-hk 鐢ㄦ埛甯傚満 = 棣欐腐 (淇濈暀 HK 瑙嗚);
    // en/ja 鐢ㄦ埛甯傚満 = US/UK/AU/JP, 鏍囬纭"Shenzhen Printing / 娣卞湷鍗板埛" = 鏈烘缈昏瘧, 鏃犺鍚屾劅.
    // a38dc93 涔嬪墠鍒ゆ柇"en/ja 淇濈暀娣卞湷 supplier origin"鏄敊鐨勨€斺€攕upplier origin 搴斿湪姝ｆ枃 (DHL/鍏ㄧ悆閰嶉€? 鎻愬強,
    // 涓嶅簲濉炴爣棰樹富鍏抽敭璇嶅墠闈? 鏀逛负鍏ㄧ悆閫氱敤 + 寮鸿皟鍗栫偣 (size/paper/design)
    'zh-hk': '椁愬怀闁嬫キ鍌冲柈鍗板埛瀹屽叏鏀荤暐 路 2026 棣欐腐椁愰２闁嬫キ鏃哄 | 鏅哄嵃闆?ZprintPro',
    en: 'Restaurant Opening Flyer Printing Guide: Sizes, Paper & Design Tips | ZprintPro',
    ja: '銉偣銉堛儵銉抽枊妤儊銉┿偡鍗板埛銈偆銉夛細銈点偆銈恒兓鐢ㄧ礄銉汇儑銈躲偆銉炽伄寰瑰簳瑙ｈ | ZprintPro',
  },
  excerpt: {
    'zh-hk': '2026 骞撮娓椋查枊妤椇瀛?涓€寮甸珮璩礌鍌冲柈姹哄畾瀹汉鏄惁瑷樺緱浣犵殑搴椼€傛櫤鍗伴洸鐐洪娓寤宠€侀梿鎻愪緵 50-200 寮靛皬鎵归噺鍒?5,000 寮靛ぇ鎵归噺鍌冲柈鍗板埛,3 鍊嬪伐浣滃ぉ浜ゆ湡,DHL 鍏ㄧ悆 2-4 澶╁埌璨?闋嗚睈鏈湴鍚屾棩鍙栬波銆?,
    en: 'Opening a new restaurant? A premium flyer decides whether walk-ins remember your shop. From 50-200 small batches to 5,000 bulk prints, 3-day turnaround, DHL 2-4 day global delivery from Asia factory.',
    ja: '鏂拌銈兗銉椼兂椋查搴楁銇搞€傞珮鍝佽唱銉併儵銈枫亴 walk-in 椤у銇鎲躲伀娈嬨倠銇嬨仼銇嗐亱銈掓焙銈併倠銆?0-200鏋氬皬銉儍銉堛亱銈?,000鏋氬ぇ鎵规敞銇俱仹銆?鍠舵キ鏃ョ磵鍝併€併偄銈搞偄宸ュ牬銇嬨倝 DHL 2-4鏃ュ叏涓栫晫閰嶉€併€?,
  },
  // 鏁呮剰涓嶅啓 cover 瀛楁 鈥?绱旀枃瀛楀崥瀹?(v2 纭害鏉?2026-07-04)
  // getBlogCover 妫€娴?meta.cover 涓?undefined 鏃惰繑鍥?'',page.tsx 鎹璺宠繃 hero 鍥炬覆鏌?
};

// 2026-07-06 v4 绱旀枃瀛楁繁搴﹀崥瀹?(no cover) 鈥?Tier A 瀵电墿 脳 P0 stickers 椤炵洰
const lpPetFoodSticker: BlogPostMeta = {
  slug: 'pet-food-sticker-printing-guide',
  categoryKey: 'sticker',
  source: 'legacy',
  date: '2026-07-06',
  title: {
    // NAP vs SEO 鑴遍挬: zh-hk = 棣欐腐鏈湴鍫存櫙瑭?(MTR/闋嗚睈/Pet Mart); en/ja = 鍏ㄧ悆閫氱敤 (waterproof/FDA/material)
    'zh-hk': '棣欐腐瀵电墿椋熷搧鍝佺墝璨肩礄鍗板埛鎸囧崡 路 闃叉按闃叉补 FDA 瑾嶈瓑 | 鏅哄嵃闆?ZprintPro',
    en: 'Pet Food Brand Sticker Printing Guide: Waterproof, Food-Safe Labels | ZprintPro',
    ja: '銉氥儍銉堛儠銉笺儔銈广儐銉冦偒銉煎嵃鍒枫偓銈ゃ儔锛氶槻姘淬兓FDA婧栨嫚銉┿儥銉礌鏉?| ZprintPro',
  },
  excerpt: {
    'zh-hk': '2026 骞撮娓鐗╁競鍫磋妯＄獊鐮?35 鍎?瀵电墿椋熷搧銆佷繚鍋ュ搧銆侀浂椋熷搧鐗岀埈鐩告帹鏂般€備竴寮甸珮璩礌銆侀槻姘撮槻娌圭殑瀵电墿椋熷搧璨肩礄姹哄畾璨ㄦ灦杞夊寲鐜囥€傛櫤鍗伴洸鐐洪娓湰鍦板強璺ㄥ瀵电墿鍝佺墝鎻愪緵 FDA 瑾嶈瓑椋熷搧绱氳布绱?1,000-100,000 鏋氬皬鑷冲ぇ鎵归噺,5-7 鍊嬪伐浣滃ぉ,DHL 鍏ㄧ悆 2-4 澶╁埌璨ㄣ€?,
    en: 'Pet food, treat, supplement brand owners 鈥?premium waterproof and food-safe stickers decide shelf conversion. FDA-compliant label materials, 1,000 to 100,000-piece runs, 5-7 working day delivery from Asia factory with DHL 2-4 day global shipping.',
    ja: '銉氥儍銉堛儠銉笺儔銉汇亰銈勩仱銉汇偟銉椼儶銉°兂銉堛儢銉┿兂銉夈偑銉笺儕銉兼銇搞€傞槻姘淬兓椋熷搧琛涚敓鍩烘簴婧栨嫚銈广儐銉冦偒銉笺亴妫氬墠杌㈡彌鐜囥倰姹恒倎銈嬨€侳DA 婧栨嫚绱犳潗銆?,000銆?00,000鏋氬皬銆滃ぇ銉儍銉堛€?-7鍠舵キ鏃ョ磵鍝併€丏HL 2-4鏃ュ叏涓栫晫閰嶉€併€?,
  },
};

// 2026-07-06 v4 绱旀枃瀛楁繁搴﹀崥瀹?(no cover) 鈥?Tier A 鏈嶈 脳 P0 paper-bags 椤炵洰
const lpApparelShoppingBag: BlogPostMeta = {
  slug: 'apparel-shopping-bag-printing-guide',
  categoryKey: 'paper-bags',
  source: 'legacy',
  date: '2026-07-06',
  title: {
    'zh-hk': '棣欐腐鏈嶈鍝佺墝绱欒鍗板埛鎸囧崡 路 鐠颁繚璩肩墿琚嬪搧鐗屽崌绱?| 鏅哄嵃闆?ZprintPro',
    en: 'Apparel Brand Shopping Bag Printing Guide: Materials, Sizes & Logo Tips | ZprintPro',
    ja: '銈儜銉儷銉栥儵銉炽儔銈枫儳銉冦償銉炽偘銉愩儍銈板嵃鍒枫偓銈ゃ儔锛氱礌鏉愩兓銈点偆銈恒兓銉偞 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '鏈嶈銆佹疆鐗屻€佽卜鎵嬪簵鑰侀梿蹇呯潎銆傚緸鐧藉崱绱欏埌榛冪墰鐨€佸緸妫夌供鍒扮挡甯舵墜鎸姐€佸緸鐕欓噾鍒?UV 灞€閮?涓€鍊嬮珮璩劅鐨勫搧鐗岀礄琚嬫焙瀹氬浜烘槸鍚︽渻鍦?Instagram 鎵撳崱銆傛櫤鍗伴洸鐐烘檪瑁濆搧鐗屾彁渚?500-100,000 鏋氬皬鑷冲ぇ鎵归噺绱欒,5-10 鍊嬪伐浣滃ぉ浜や粯銆?,
    en: 'Apparel, streetwear, and boutique owners 鈥?a premium branded shopping bag decides whether customers post on Instagram. Kraft, white card, cotton rope handles, foil stamping, 500-100,000 piece runs, 5-10 working day delivery from Asia factory.',
    ja: '銈儜銉儷銉汇偣銉堛儶銉笺儓銈︺偋銈兓銈汇儸銈儓銈枫儳銉冦儣銈兗銉娿兗妲樸伕銆傘儣銉儫銈儬鎰熴伄銇傘倠銉栥儵銉炽儔銈枫儳銉冦償銉炽偘銉愩儍銈般亴 Instagram 鎶曠銈掓焙銈併倠銆傘偗銉┿儠銉堢礄銉荤櫧銈兗銉夈兓缍裤儹銉笺儣鎸併仭鎵嬨兓绠旀娂銇椼€?00銆?00,000鏋氬蹇溿€?-10鍠舵キ鏃ョ磵鍝併€?,
  },
};

// 2026-07-06 v4 绱旀枃瀛楁繁搴﹀崥瀹?(no cover) 鈥?Tier A 璺ㄥ闆诲晢 脳 P0 packaging 椤炵洰
const lpCrossBorderShipping: BlogPostMeta = {
  slug: 'cross-border-ecommerce-shipping-box-guide',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2026-07-06',
  title: {
    'zh-hk': '璺ㄥ闆诲晢蹇仦鐩掑嵃鍒锋寚鍗?路 DHL 鍏ㄧ悆 2-4 澶╅€侀仈 | 鏅哄嵃闆?ZprintPro',
    en: 'Cross-Border E-commerce Shipping Box Guide: DHL 2-4 Day Global Delivery | ZprintPro',
    ja: '瓒婂EC閰嶉€佺銈偣銈裤儬銈偆銉夛細DHL 2-4鏃ャ偘銉兗銉愩儷閰嶉€?| ZprintPro',
  },
  excerpt: {
    'zh-hk': 'Shopify銆丄mazon FBA銆佺崹绔嬬珯璩ｅ蹇呯潎銆備竴鍊嬮珮璩礌銆佸嵃鍒风簿缇庣殑蹇仦鐩掓焙瀹氬鎴堕枊绠遍珨椹楀拰鍥炶臣鐜囥€傛櫤鍗伴洸鎻愪緵 3 灞?B 鐡︽鎶楀绲愭銆丏HL/FedEx/UPS 鍏ㄥ吋瀹瑰昂瀵搞€丗SC 瑾嶈瓑绱欐潗,500-50,000 鍊嬪皬鑷冲ぇ鎵归噺,3-7 鍊嬪伐浣滃ぉ浜や粯銆?,
    en: 'Shopify, Amazon FBA, and DTC brand owners 鈥?a premium printed shipping box decides unboxing experience and repeat purchase. Durable 3-ply B-flute, DHL/FedEx/UPS-compatible sizes, FSC-certified materials, 500-50,000 piece runs, 3-7 working day delivery from Asia factory.',
    ja: 'Shopify銆丄mazon FBA銆佺嫭绔嬬郴 EC 銉栥儵銉炽儔銈兗銉娿兗妲樸伕銆傘儣銉儫銈儬鎰熴伄銇傘倠閰嶉€佺銇岄枊灏佷綋楱撱仺銉償銉笺儓鐜囥倰姹恒倎銈嬨€?灞?B 銉曘儷銉笺儓鑰愬湩妲嬮€犮€丏HL/FedEx/UPS 浜掓彌銈点偆銈恒€丗SC 瑾嶈绱犳潗銆?00銆?0,000鍊嬪皬銆滃ぇ銉儍銉堛€?-7鍠舵キ鏃ョ磵鍝併€?,
  },
};

// 2026-07-07 v4 绱旀枃瀛楁繁搴﹀崥瀹?(no cover) 鈥?Tier A 缇庡璀疯啔 脳 P0 packaging 椤炵洰
// (Q-002, was queued since 2026-07-04, deployed today)
const lpCosmeticsPackagingBox: BlogPostMeta = {
  slug: 'cosmetics-packaging-box-printing-guide',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2026-07-07',
  title: {
    'zh-hk': '鍖栧鍝佸寘瑁濈洅瀹氬埗鎸囧崡 路 璀疯啔鍝佺墝绲愭鑸囨潗璩叏鏀荤暐 | 鏅哄嵃闆?ZprintPro',
    en: 'Custom Cosmetics Packaging Box Guide: Materials, Structure & Branding | ZprintPro',
    ja: '鍖栫钵鍝併儜銉冦偙銉笺偢绠便偒銈广偪銉犮偓銈ゃ儔锛氱礌鏉愩兓妲嬮€犮兓銉栥儵銉炽儑銈ｃ兂銈?| ZprintPro',
  },
  excerpt: {
    'zh-hk': '棣欐腐缇庡璀疯啔鍝佺墝銆侀潰鑶溿€佺簿鑿恫銆侀姘磋€侀梿蹇呯潎銆備竴鍊嬬祼妲嬬簿鑹€佸嵃鍒风簿缇庣殑鍖栧鍝佸寘瑁濈洅姹哄畾璨ㄦ灦涓婄殑 3 绉掕臣璨锋焙瀹氥€傛櫤鍗伴洸鐐洪娓強璺ㄥ缇庡鍝佺墝鎻愪緵澶╁湴鐩掋€佹浉鍨嬬洅銆佺鍚哥洅鍏ㄧ郴鍒楀畾鍒?50-10,000 鍊嬪皬鑷冲ぇ鎵归噺,5-10 鍊嬪伐浣滃ぉ浜や粯銆?,
    en: 'Skincare, serum, mask, perfume brand owners 鈥?a well-structured custom cosmetics packaging box decides the 3-second shelf purchase. ZprintPro supplies lid-base, book-style, and magnetic boxes, 50-10,000 piece runs, 5-10 working day delivery from Asia factory with DHL 2-4 day global shipping.',
    ja: '銈广偔銉炽偙銈兓缇庡娑层兓銉炪偣銈兓棣欐按銉栥儵銉炽儔銈兗銉娿兗妲樸伕銆傜簿宸с仾妲嬮€犮仺绮剧編鍗板埛銇寲绮у搧銉戙儍銈便兗銈哥銇屾鍓?3绉掋伄璩艰卜姹哄畾銈掓焙銈併倠銆傚ぉ鍦拌搵绠便兓銉栥儍銈瀷銉汇優銈般儘銉冦儓寮忓叏銈枫儶銉笺偤瀵惧繙銆?0-10,000鍊嬪皬銆滃ぇ銉儍銉堛€?-10鍠舵キ鏃ョ磵鍝併€?,
  },
};

// 2026-07-07 v4 绱旀枃瀛楁繁搴﹀崥瀹?(no cover) 鈥?Tier A 鑼堕２椋熷搧 脳 P0 packaging 椤炵洰
// (Q-006, NEW)
const lpTeaBeverageGiftBox: BlogPostMeta = {
  slug: 'tea-beverage-gift-box-printing-guide',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2026-07-07',
  title: {
    'zh-hk': '棣欐腐鑼堕２鍝佺墝绂洅鍗板埛鎸囧崡 路 鎵嬫悥銆佷腑鑼躲€佽尪钁夐浕鍟嗛仼鐢?| 鏅哄嵃闆?ZprintPro',
    en: 'Tea & Beverage Gift Box Printing Guide: Loose Leaf, Bubble Tea & E-commerce Brands | ZprintPro',
    ja: '鑼躲兓銉夈儶銉炽偗銈儠銉堛儨銉冦偗銈瑰嵃鍒枫偓銈ゃ儔锛氥儶銉笺儠銉嗐偅銉笺兓銈裤償銈偒銉籈C銉栥儵銉炽儔鍚戙亼 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '鎵嬫悥椋插搧搴椼€佽尪钁夐浕鍟嗐€佷腑寮忚尪绂洅鍝佺墝鑰侀梿蹇呯潎銆備竴鍊嬫湁璩劅鐨勮尪椋插搧鐗岀Ξ鐩掓焙瀹氬鎴跺洖璩煎強绡€鏃ラ€佺Ξ棣栭伕銆傛櫤鍗伴洸鐐洪娓湰鍦板強璺ㄥ鑼堕２鍝佺墝鎻愪緵 100-50,000 鍊嬮鍝佺礆鍏цク绂洅瀹氬埗,FDA 瑾嶈瓑绱欐潗,5-10 鍊嬪伐浣滃ぉ浜や粯銆?,
    en: 'Bubble tea shops, loose-leaf tea e-commerce, and Chinese tea gift box brand owners 鈥?a premium tea gift box decides repeat purchase and seasonal gifting. ZprintPro supplies 100-50,000 piece FDA-certified food-grade inner liner gift boxes, 5-10 working day delivery from Asia factory.',
    ja: '銈裤償銈偒搴椼€併儶銉笺儠銉嗐偅銉?EC銆佷腑鑿尪銈儠銉堛儨銉冦偗銈广儢銉┿兂銉夈偑銉笺儕銉兼銇搞€備笂璩劅銇傘倠鑼躲偖銉曘儓銉溿儍銈偣銇屻儶銉斻兗銉堛仺瀛ｇ瘈銈儠銉堛倰姹恒倎銈嬨€侳DA 瑾嶈椋熷搧銈般儸銉笺儔鍐呰 100-50,000鍊嬪皬銆滃ぇ銉儍銉堛€?-10鍠舵キ鏃ョ磵鍝併€?,
  },
};

// 2026-07-07 v4 绱旀枃瀛楁繁搴﹀崥瀹?(no cover) 鈥?Tier A 濠氭叾 脳 P0 paper-bags 椤炵洰
// (Q-007, NEW)
const lpWeddingFavorBag: BlogPostMeta = {
  slug: 'wedding-favor-bag-printing-guide',
  categoryKey: 'paper-bags',
  source: 'legacy',
  date: '2026-07-07',
  title: {
    'zh-hk': '棣欐腐濠氭叾鍠滃笘 / 濠氱Ξ绂鍗板埛鎸囧崡 路 2026 濠氬珌鏃哄蹇呭倷 | 鏅哄嵃闆?ZprintPro',
    en: 'Wedding Favor Bag & Invitation Printing Guide 2026: Materials, Sizes & Personalization | ZprintPro',
    ja: '銈︺偋銉囥偅銉炽偘 銈儠銉堛儛銉冦偘銉绘嫑寰呯姸鍗板埛銈偆銉?026锛氱礌鏉愩兓銈点偆銈恒兓銉戙兗銈姐儕銉┿偆銈?| ZprintPro',
  },
  excerpt: {
    'zh-hk': '婧栨柊浜恒€佸绂当绫屽斧銆佸鏈冨牬鍦板繀鐫囥€?026 榫嶅勾绲愬鏃哄,涓€鍊嬫湁璩劅鐨勫绂Ξ琚嬨€佸枩甯栥€佷即鎵嬬Ξ琚嬫焙瀹氳硴瀹㈢殑绗竴鍗拌薄銆傛櫤鍗伴洸鐐洪娓鎱跺競鍫存彁渚?100-3,000 鍊嬪皬鎵归噺瀹氬埗,绲插付鎵嬫尳銆佺嚈閲戙€佸€嬫€у寲鏂颁汉濮撳悕,5-10 鍊嬪伐浣滃ぉ浜や粯銆?,
    en: 'Engaged couples, wedding planners, and venues 鈥?premium wedding favor bags and invitations set the first impression for guests. ZprintPro supplies 100-3,000 small-batch custom orders with satin ribbon handles, foil stamping, and personalized names, 5-10 working day delivery from Asia factory.',
    ja: '銇斿绱勩偒銉冦儣銉€併偊銈с儑銈ｃ兂銈般儣銉┿兂銉娿兗銆佸紡鍫存銇搞€?026杈板勾銉栥儵銈ゃ儉銉偡銉笺偤銉炽€佷笂璩劅銇亗銈嬨偖銉曘儓銉愩儍銈般仺鎷涘緟鐘躲亴銈层偣銉堛伄绗竴鍗拌薄銈掓焙銈併倠銆傘偟銉嗐兂銉儨銉虫寔銇℃墜銉荤當鎶笺仐銉绘柊閮庢柊濠﹀悕銉戙兗銈姐儕銉┿偆銈恒€?00-3,000鍊嬪皬銉儍銉堛€?-10鍠舵キ鏃ョ磵鍝併€?,
  },
};

// 2026-07-08 v4 绱旀枃瀛楁繁搴﹀崥瀹?(no cover) 鈥?P1 unlock 闁嬪
// Q-P1-01 (posters 脳 闆跺敭绮惧搧)
const lpRetailPoster: BlogPostMeta = {
  slug: 'retail-shop-poster-printing-guide',
  categoryKey: 'posters',
  source: 'legacy',
  date: '2026-07-08',
  title: {
    'zh-hk': '棣欐腐闆跺敭绮惧搧搴楁捣鍫卞嵃鍒锋寚鍗?路 2026 闁嬬獥瀛ｆ獢鏈熷繀鍌?| 鏅哄嵃闆?ZprintPro',
    en: 'Retail Shop Poster Printing Guide 2026: Sizes, Paper & Display Tips | ZprintPro',
    ja: '灏忓２銉汇偦銉偗銉堛偡銉с儍銉?銉濄偣銈裤兗鍗板埛銈偆銉?026锛氥偟銈ゃ偤銉荤敤绱欍兓銉囥偅銈广儣銉偆 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '闆跺敭绮惧搧搴椼€佸搧鐗?pop-up store銆佸晢鍫村揩闁冨簵涓荤悊浜哄繀鐫囥€備竴鍊嬮珮璩礌鐨勫簵鍏ф捣鍫辨焙瀹氶¨瀹㈤€楃暀鏅傞枔鑸囬姺鍞綁鍖栥€傛櫤鍗伴洸鐐洪娓浂鍞競鍫存彁渚?10-1,000 寮靛皬鑷冲ぇ鎵归噺娴峰牨鍗板埛,A3/A2/A1/A0 鍏ㄥ昂瀵?+ 闃叉按 PP 鑶犵墖,3-5 鍊嬪伐浣滃ぉ浜や粯銆?,
    en: 'Boutique, brand pop-up store, and mall retail owners 鈥?premium in-store posters decide customer dwell time and conversion. ZprintPro supplies 10-1,000 piece runs, A3/A2/A1/A0 full sizes, waterproof PP film options, 3-5 working day delivery from Asia factory.',
    ja: '銉栥儐銈ｃ儍銈兓銉栥儵銉炽儔 pop-up銉汇儮銉笺儷灏忓２銈兗銉娿兗妲樸伕銆傞珮鍝佽唱搴楀唴銉濄偣銈裤兗銇岄¨瀹㈡粸鍦ㄦ檪闁撱仺銈炽兂銉愩兗銈搞儳銉炽倰姹恒倎銈嬨€俍printPro銇?0-1,000鏋氬皬銆滃ぇ銉儍銉堛€丄3/A2/A1/A0 鍏ㄣ偟銈ゃ偤銆侀槻姘?PP 銉曘偅銉儬銆?-5鍠舵キ鏃ョ磵鍝併€?,
  },
};

// Q-P1-02 (menus 脳 椁愰２澶栬常)
const lpRestaurantMenu: BlogPostMeta = {
  slug: 'restaurant-menu-printing-guide',
  categoryKey: 'menus',
  source: 'legacy',
  date: '2026-07-08',
  title: {
    'zh-hk': '棣欐腐椁愬怀鑿滃柈鍗板埛鎸囧崡 路 2026 椁愰２鏃哄闃叉按闃叉补棣栭伕 | 鏅哄嵃闆?ZprintPro',
    en: 'Restaurant Menu Printing Guide 2026: Waterproof, Fold & Material Tips | ZprintPro',
    ja: '銉偣銉堛儵銉炽儭銉嬨儱銉煎嵃鍒枫偓銈ゃ儔2026锛氶槻姘淬兓鎶樸倞銇熴仧銇裤兓绱犳潗 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '椁愬怀鑰侀梿銆佸挅鍟″簵銆佺敎鍝佸簵銆侀厭妯撳繀鐫囥€備竴鍊嬮珮璩礌鐨勮彍鍠槸椤у涓嬪柈姹哄畾鐨勬渶寰屼竴闂?涔熸槸鍝佺墝褰㈣薄鐨勫欢浼搞€傛櫤鍗伴洸鐐洪娓椋插競鍫存彁渚?50-5,000 寮靛皬鑷冲ぇ鎵归噺鑿滃柈鍗板埛,闃叉按 PP 閬庤啝 / 纭毊绮捐 / 绱欏肪寮忔媼妫勮彍鍠叏绯诲垪,5-7 鍊嬪伐浣滃ぉ浜や粯銆?,
    en: 'Restaurant, cafe, dessert shop, and banquet owners 鈥?a premium menu is the last gate before order and an extension of brand identity. ZprintPro supplies 50-5,000 piece runs, waterproof PP lamination, hardcover, and disposable paper menus, 5-7 working day delivery from Asia factory.',
    ja: '銉偣銉堛儵銉炽兓銈儠銈с兓銉囥偠銉笺儓搴椼兓瀹翠細銈兗銉娿兗妲樸伕銆傞珮鍝佽唱銉°儖銉ャ兗銇屾敞鏂囨焙瀹氥伄鏈€寰屻伄闁㈤杸銇с亗銈娿儢銉┿兂銉夈偄銈ゃ儑銉炽儐銈ｃ儐銈ｃ伄寤堕暦銆俍printPro銇?0-5,000鏋氬皬銆滃ぇ銉儍銉堛€侀槻姘?PP 銉┿儫銉嶃兗銉堛兓銉忋兗銉夈偒銉愩兗銉讳娇銇勬崹銇︾礄銉°儖銉ャ兗鍏ㄣ偡銉兗銈恒€?-7鍠舵キ鏃ョ磵鍝併€?,
  },
};

// Q-P1-03 (red-packets 脳 濠氭叾)
const lpWeddingRedPacket: BlogPostMeta = {
  slug: 'wedding-red-packet-printing-guide',
  categoryKey: 'red-packets',
  source: 'legacy',
  date: '2026-07-08',
  title: {
    'zh-hk': '棣欐腐濠氱Ξ鍒╂槸灏佸嵃鍒锋寚鍗?路 2026 榫嶅勾濠氬珌鏃哄蹇呭倷 | 鏅哄嵃闆?ZprintPro',
    en: 'Wedding Red Packet Printing Guide 2026: Materials, Personalization & Bulk | ZprintPro',
    ja: '銈︺偍銉囥偅銉炽偘 銉儍銉?packet 鍗板埛銈偆銉?026锛氱礌鏉愩兓銉戙兗銈姐儕銉┿偆銈恒兓澶ч噺鍗板埛 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '婧栨柊浜恒€佸绂当绫屽斧銆佸鏈冨牬鍦板繀鐫囥€?026 榫嶅勾绲愬鏃哄,涓€濂楃簿缇庣殑濠氱Ξ鍒╂槸灏佹焙瀹氳硴瀹㈠皪濠氱Ξ鐨勭涓€鍗拌薄銆傛櫤鍗伴洸鐐洪娓鎱跺競鍫存彁渚?100-10,000 鍊嬪皬鑷冲ぇ鎵归噺瀹氬埗,鐕欓噾鏂颁汉濮撳悕銆佸€嬫€у寲绁濈瑾炪€佺箒楂斾腑鏂囧伐钘?5-10 鍊嬪伐浣滃ぉ浜や粯銆?,
    en: 'Engaged couples, wedding planners, and venues 鈥?premium wedding red packets set the first impression for guests. ZprintPro supplies 100-10,000 piece custom orders with foil-stamped couple names, personalized blessings, 5-10 working day delivery from Asia factory.',
    ja: '銇斿绱勩偒銉冦儣銉兓銈︺偋銉囥偅銉炽偘銉椼儵銉炽儕銉笺兓寮忓牬妲樸伕銆?026杈板勾銉栥儵銈ゃ儉銉偡銉笺偤銉炽€佺簿鑷淬仾绲愬绁濆剙琚嬨亴銈层偣銉堛伄绗竴鍗拌薄銈掓焙銈併倠銆俍printPro銇?00-10,000鍊嬨偒銈广偪銉犮偑銉笺儉銉煎蹇溿€佺當鎶笺仐鏂伴儙鏂板│鍚嶃兓銉戙兗銈姐儕銉┿偆銈虹绂忋兓绻佷綋瀛楀伐鑺搞€?-10鍠舵キ鏃ョ磵鍝併€?,
  },
};

// =============================================================================
// 2026-07-06 weekly-meta-refresh: Tier B 琛屼笟 + P0 categories 绾枃瀛楁繁搴﹀崥瀹?
// (鎵嬪姩琛ユ晳: 11:00 weekly cron 璺戜絾 session LLM API GOAWAY 宕╀簡, 0 浜у嚭)
// =============================================================================

const lpRealEstateBrochureBox: BlogPostMeta = {
  slug: 'real-estate-brochure-box-printing-guide',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2026-07-06',
  title: {
    'zh-hk': '棣欐腐鏂扮洡妯撴浉鍗板埛鎸囧崡 路 璞畢璩囨枡鍖ｈ垏纭毊鐣唺瀹氬埗 | 鏅哄嵃闆?ZprintPro',
    en: 'Real Estate Brochure & Property Box Printing Guide: Materials, Finishes & Luxury Tips | ZprintPro',
    ja: '涓嶅嫊鐢ｃ儜銉炽儠銉儍銉堛兓璩囨枡绠便偒銈广偪銉犲嵃鍒枫偓銈ゃ儔锛氱礌鏉愩兓鍔犲伐銉婚珮绱氭劅婕斿嚭 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '鐧煎睍鍟嗐€佷腑浠嬨€侀爡鐩瓥灞曟柟蹇呯潎銆備竴鏈珮璩礌鐨勬〒鏇?+ 涓€鍊嬬‖鐨硣鏂欏專姹哄畾婧栬卜瀹跺皪闋呯洰鐨勭涓€鍗拌薄銆傛櫤鍗伴洸鐐洪娓湴鐢㈠晢鎻愪緵楱庨Μ閲樸€佽啝瑁濄€佺簿瑁濇〒鏇?+ 纭澶╁湴钃嬭硣鏂欏專,100-5,000 濂楀皬鑷冲ぇ鎵归噺,5-10 鍊嬪伐浣滃ぉ浜や粯,DHL 鍏ㄧ悆 2-4 澶╅厤閫併€?,
    en: 'Property developers, agencies, and showroom curators 鈥?a premium brochure + rigid property box decides the first impression with serious buyers. ZprintPro delivers saddle stitch, perfect bound, hardcover brochures + rigid telescopic boxes, 100-5,000 piece runs, 5-10 working day delivery, DHL 2-4 day worldwide shipping.',
    ja: '銉囥儥銉儍銉戙兗銉讳徊浠嬨兓銈枫儳銉笺儷銉笺儬閬嬪柖鑰呮銇搞€傘儣銉儫銈儬銉戙兂銉曘儸銉冦儓锛嬨儚銉笺儔銈便兗銈硅硣鏂欑銇屾湰姘椼仹璩煎叆妞滆◣銇欍倠椤у銇搞伄绗竴鍗拌薄銈掓焙銈併倠銆備腑缍淬仒銉荤劇绶氱洞銇樸兓涓婅＝鏈紜銉忋兗銉夈偙銉笺偣澶╁湴钃嬬銆?00-5,000銈汇儍銉堝蹇溿€?-10鍠舵キ鏃ョ磵鍝併€丏HL 2-4鏃ュ浗闅涢厤閫併€?,
  },
};

const lpPharmaceuticalLabel: BlogPostMeta = {
  slug: 'pharmaceutical-label-printing-guide',
  categoryKey: 'sticker',
  source: 'legacy',
  date: '2026-07-06',
  title: {
    'zh-hk': '棣欐腐钘ュ搧妯欑堡鍗板埛鎸囧崡 路 GMP 瑾嶈瓑 + 闃插伣杩芥函纰煎畾鍒?| 鏅哄嵃闆?ZprintPro',
    en: 'Pharmaceutical Label Printing Guide: GMP-Grade, FDA/EMA Compliance & Tamper-Evident | ZprintPro',
    ja: '鍖昏柆鍝併儵銉欍儷鍗板埛銈偆銉夛細GMP婧栨嫚銉籉DA/EMA瀵惧繙銉绘敼銇栥倱闃叉 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '钘ュ粻銆佷繚鍋ュ搧鍝佺墝銆佽嚚搴婅│椹楁妲嬪繀鐫囥€備竴寮电鍚?GMP 瑕忕瘎銆佸彲杩芥函銆侀槻鍋界殑钘ュ搧妯欑堡鐩存帴褰遍熆瑷诲唺瀵╂壒銆傛櫤鍗伴洸鎻愪緵 FDA 21 CFR / EU GMP Annex 15 鍚堣妯欑堡,1,000-500,000 鏋氬皬鑷冲ぇ鎵归噺,7-15 鍊嬪伐浣滃ぉ浜や粯,DHL 鍏ㄧ悆 2-4 澶╅厤閫併€?,
    en: 'Pharma manufacturers, supplement brands, and clinical trial operators 鈥?a GMP-compliant, traceable, tamper-evident label decides regulatory approval. ZprintPro delivers FDA 21 CFR / EU GMP Annex 15 compliant labels, 1,000-500,000 piece runs, 7-15 working day delivery, DHL 2-4 day shipping.',
    ja: '瑁借柆浼氱ぞ銉汇偟銉椼儶銉°兂銉堛儢銉┿兂銉夈兓鑷ㄥ簥瑭﹂〒姗熼枹妲樸伕銆侴MP婧栨嫚銉汇儓銉兗銈点儢銉兓鏀广仏銈撻槻姝儵銉欍儷銇屾壙瑾嶅鏌汇伄閸点€侳DA 21 CFR / EU GMP Annex 15婧栨嫚銉┿儥銉倰鎻愪緵銆?,000-500,000鏋氬蹇溿€?-15鍠舵キ鏃ョ磵鍝併€丏HL 2-4鏃ュ浗闅涢厤閫併€?,
  },
};

const lpJewelleryShoppingBag: BlogPostMeta = {
  slug: 'jewellery-shopping-bag-printing-guide',
  categoryKey: 'paper-bags',
  source: 'legacy',
  date: '2026-07-06',
  title: {
    'zh-hk': '棣欐腐鐝犲閻橀尪鍝佺墝绱欒鍗板埛鎸囧崡 路 榛戝崱鐕欓噾 + 绲插付鎵嬫尳瀹氬埗 | 鏅哄嵃闆?ZprintPro',
    en: 'Jewellery & Watch Brand Paper Bag Printing Guide: Black Card, Foil & Satin Ribbon | ZprintPro',
    ja: '瀹濋＞銉昏厱鏅傝▓銉栥儵銉炽儔绱欒鍗板埛銈偆銉夛細銉栥儵銉冦偗銈兗銉夈兓绠旀娂銇椼兓銈点儐銉炽儶銉溿兂 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '鐝犲閻橀尪鍝佺墝銆佽卜鎵嬪簵銆佸ア渚堝搧缍撻姺鍟嗗繀鐫囥€備竴鍊嬮珮璩劅鐨勫搧鐗岀礄琚嬫焙瀹氬浜洪洟闁嬪簵寰岀殑 1 灏忔檪鏇濆厜銆傛櫤鍗伴洸鐐虹彔瀵堕悩閷跺搧鐗屾彁渚涢粦鍗＄礄銆佺櫧鍗＄礄銆佺嚈閲戙€乁V 灞€閮ㄣ€佺挡甯舵墜鎸藉叏濂楃礄琚嬪畾鍒?200-50,000 鏋氬皬鑷冲ぇ鎵归噺,7-15 鍊嬪伐浣滃ぉ浜や粯,DHL 鍏ㄧ悆 2-4 澶╅厤閫併€?,
    en: 'Jewellery, watch, and luxury boutique owners 鈥?a premium branded paper bag decides the 1-hour post-purchase exposure. ZprintPro delivers black card, white card, foil stamping, spot UV, satin ribbon handles, 200-50,000 piece runs, 7-15 working day delivery, DHL 2-4 day shipping.',
    ja: '瀹濋＞銉昏厱鏅傝▓銉汇儵銈般偢銉ャ偄銉兗銉栥儐銈ｃ儍銈偑銉笺儕銉兼銇搞€傘儣銉儫銈儬鎰熴伄銇傘倠銉栥儵銉炽儔绱欒銇岃臣鍏ュ緦1鏅傞枔銇湶鍑恒倰姹恒倎銈嬨€俍printPro銇儢銉┿儍銈偒銉笺儔銉汇儧銉偆銉堛偒銉笺儔銉荤當鎶笺仐銉汇偣銉濄儍銉圲V銉汇偟銉嗐兂銉儨銉虫寔銇℃墜銈掓彁渚涖€?00-50,000鏋氬蹇溿€?-15鍠舵キ鏃ョ磵鍝併€丏HL 2-4鏃ュ浗闅涢厤閫併€?,
  },
};

// =============================================================================
// 2026-07-09 v4 daily-content-evolve add 3 (Q-P1-04 + Q-008 + Q-009 new)
const lpProductLabel: BlogPostMeta = {
  slug: 'product-label-printing-guide',
  categoryKey: 'cross-border',
  source: 'legacy',
  date: '2026-07-09',
  title: {
    'zh-hk': '璺ㄥ闆诲晢鐢㈠搧妯欑堡鍗板埛鎸囧崡 路 GS1 姊濈⒓ + FDA 瑾嶈瓑 SKU 妯欒布 | 鏅哄嵃闆?ZprintPro',
    en: 'Amazon FBA Product Label Printing: GS1 UPC Barcodes, FDA-Compliant SKU Labels for US Sellers | ZprintPro',
    ja: '瓒婂EC瑁藉搧銉┿儥銉嵃鍒枫偓銈ゃ儔锛欸S1 銉愩兗銈炽兗銉夈兓FDA 婧栨嫚 SKU 銉┿儥銉?| 鏅哄嵃闆?ZprintPro',
  },
  excerpt: {
    'zh-hk': '浜為Μ閬?FBA銆丼hopify 鐛ㄧ珛绔欍€丒tsy銆侀€熻常閫氳常瀹跺繀鐫囥€備竴寮靛悎瑕忕殑 SKU 鐢㈠搧妯欑堡姹哄畾骞冲彴瀵╂牳閫氶亷鐜囪垏璨峰绗竴鍗拌薄銆傛櫤鍗伴洸鐐鸿法澧冮浕鍟嗘彁渚?GS1 EAN/UPC 姊濈⒓ + FDA 椋熷搧绱氭潗璩?+ 闃叉按闃叉挄 SKU 妯欒布,1,000-500,000 鏋氬皬鑷冲ぇ鎵归噺,5-7 鍊嬪伐浣滃ぉ浜や粯銆?,
    en: 'Amazon US FBA, Etsy, Shopify, and DTC brand owners 鈥?a compliant UPC barcode, FDA-compliant, FNSKU-ready product label decides whether your shipment clears Amazon\'s Sort Center or sits stuck. ZprintPro prints GS1 UPC, FNSKU, Country of Origin, Prop 65 / CPSC / CPSIA labels for US-bound inventory in 1,000-500,000 piece runs, 5-7 business day production.',
    ja: 'Amazon FBA銆丼hopify 鐙珛 station銆丒tsy銆丄liExpress 銈汇儵銉笺伕銆傘偝銉炽儣銉┿偆銈兂銈归仼鍚堛伄 SKU 銉┿儥銉亴銉椼儵銉冦儓銉曘偐銉笺儬瀵╂熁閫氶亷鐜囥仺绗竴鍗拌薄銈掓焙瀹氥€傛櫤鍗伴洸銇?GS1 EAN/UPC 銉愩兗銈炽兗銉夈€丗DA 椋熷搧琛涚敓绱犳潗銆侀槻姘磋€愯 SKU 銉┿儥銉倰 1,000-500,000 鏋氳妯°仹 5-7 鍠舵キ鏃ョ磵鍝併€?,
  },
};

const lpGraduationYearbook: BlogPostMeta = {
  slug: 'graduation-yearbook-printing-guide',
  categoryKey: 'education',
  source: 'legacy',
  date: '2026-07-09',
  title: {
    'zh-hk': '鐣㈡キ绱€蹇靛唺鍗板埛鎸囧崡 路 棣欐腐涓澶у闄㈡牎瀹氬埗鏂规 | 鏅哄嵃闆?ZprintPro',
    en: 'US High School Yearbook Printing Guide: Class of 2026 Binding Styles, Cover Designs & Sponsor Ad Pages | ZprintPro',
    ja: '鍗掓キ瑷樺康銈儷銉愩儬鍗板埛銈偆銉夛細瑁芥湰銉荤敤绱欍兓銉戙兗銈姐儕銉┿偆銈哄畬鍏ㄨВ瑾?| 鏅哄嵃闆?ZprintPro',
  },
  excerpt: {
    'zh-hk': '涓銆佸ぇ瀛搞€佽缈掔ぞ銆佸湅闅涘鏍°€佸闀锋渻蹇呯潎銆備竴鏈珮璩礌鐨勭暍妤磤蹇靛唺鏄鐢熸檪浠ｇ殑姘告亞鍥炴喍,涔熸槸鏍″弸缍茬怠鍑濊仛鐨勮捣榛炪€傛櫤鍗伴洸鐐洪娓暀鑲插競鍫存彁渚涢◣棣嚇 / 鑶犺 / 绮捐涓夌ó瑁濊▊ + 鍊嬩汉鐝礆鐓х墖 + 甯暦椤岃 + 瀛告牎 logo 鍏ㄩ爜瀹㈣＝鍖栨柟妗?50-500 鏈皬鎵归噺,5-10 鍊嬪伐浣滃ぉ浜や粯銆?,
    en: 'High school yearbook advisors, senior class officers, JROTC, booster clubs, homeschool co-ops 鈥?a US yearbook that wins a Columbia Scholastic Press Association Crown Award or NSPA Pacemaker costs US$8-22 per copy with ads. ZprintPro prints saddle stitch, perfect bound, and Smyth-sewn hardcover yearbooks in 50-2,000 copy runs in 5-10 business days.',
    ja: '涓鏍°€佸ぇ瀛︺€佷簣鍌欐牎銆併偆銉炽偪銉笺儕銈枫儳銉娿儷銈广偗銉笺儷銆丳TA 銇搞€傞珮鍝佽唱鍗掓キ瑷樺康銈儷銉愩儬銇案閬犮伄鎬濄亜鍑恒仺鍚岀獡銉嶃儍銉堛儻銉笺偗褰㈡垚銇捣鐐广€傛櫤鍗伴洸銇腑缍淬仒 / 鐒＄窔缍淬仒 / 涓婅＝鏈伄 3 绋瑁呬竵 + 銈儵銈瑰啓鐪?+ 鏁欏摗銉°儍銈汇兗銈?+ 瀛︽牎銉偞鍏ㄩ潰銈偣銈裤優銈ゃ偤銈?50-500 閮ㄥ皬銉儍銉堛仹 5-10 鍠舵キ鏃ョ磵鍝併€?,
  },
};

const lpIpCharacterSticker: BlogPostMeta = {
  slug: 'ip-character-sticker-printing-guide',
  categoryKey: 'creator-ip',
  source: 'legacy',
  date: '2026-07-09',
  title: {
    'zh-hk': '鏂囧壍IP瑙掕壊閫犲瀷璨肩礄鍗板埛鎸囧崡 路 棣欐腐鍚屼汉鍝佺墝妯″垏瀹氬埗鏂规 | 鏅哄嵃闆?ZprintPro',
    en: 'Custom Die-Cut Sticker Printing for US Creators, Etsy Sellers & Small Brands: Shapes, Premium Materials & Etsy US SEO | ZprintPro',
    ja: 'IP 銈儯銉┿偗銈裤兗鍨嬫姕銇嶃偣銉嗐儍銈兗鍗板埛銈偆銉夛細銈偣銈裤儬褰㈢姸銉荤礌鏉愩兓宸ユ硶銇叏瑙ｈ | 鏅哄嵃闆?ZprintPro',
  },
  excerpt: {
    'zh-hk': '鎻掔暙甯€佹极鐣銆佹枃鍓靛搧鐗屻€乂Tuber銆佸嫊婕懆閭婅ō瑷堝斧蹇呯潎銆備竴寮垫サ鍏疯鲸璀樺害鐨?IP 瑙掕壊閫犲瀷璨肩礄姹哄畾鍝佺墝绮夌挡蹇犺獱搴﹁垏鍟嗗搧婧㈠児鑳藉姏銆傛櫤鍗伴洸鐐洪娓強璺ㄥ鏂囧壍甯傚牬鎻愪緵浠绘剰褰㈢媭妯″垏 + UV 鍗板埛 + 澶氭潗璩?+ 鐕欓噾宸ヨ棟鍏ㄥ瀹氬埗,100-100,000 鏋氬皬鑷冲ぇ鎵归噺,5-7 鍊嬪伐浣滃ぉ浜や粯銆?,
    en: 'Etsy US shop owners, Comic-Con Artist Alley creators, TikTok-Instagram side hustlers, US small brand founders 鈥?a high-margin die-cut sticker shop runs on Etsy US SEO ranking signals, US$0.30-1.50 per-sticker COGS, and USPS-friendly packaging. ZprintPro prints holographic, glow, foil, and matte vinyl die-cut stickers for 100-100,000 piece runs in 5-7 business days.',
    ja: '銈ゃ儵銈广儓銉兗銈裤兗銉绘极鐢诲銉汇偗銉偍銈ゃ偪銉笺儢銉┿兂銉夈兓VTuber銉汇偄銉嬨儭鍛ㄨ竞銉囥偠銈ゃ儕銉笺伕銆傝獚鐭ュ害銇珮銇?IP 銈儯銉┿偗銈裤兗鍨嬨偣銉嗐儍銈兗銇屻儠銈°兂銉偆銉ゃ儷銉嗐偅銇ㄥ晢鍝併儣銉儫銈儬銈掓焙瀹氥€傛櫤鍗伴洸銇换鎰忓舰鐘跺瀷鎶溿亶銆乁V 鍗板埛銆佽鏁扮礌鏉愩€佺當鎶笺仐宸ユ硶銈?100-100,000 鏋氳妯°仹 5-7 鍠舵キ鏃ョ磵鍝併€丏HL 鍥介殯閰嶉€佸蹇溿€?,
  },
};

// 2026-07-10 v4 daily-content-evolve P2 unlock (matrix P0/P1 100% 楗卞拰鍚?SKILL.md 搂3.8 P2 fallback)
// Q-P2-01 (banners 脳 璺ㄥ闆诲晢)
const lpTradeShowBanner: BlogPostMeta = {
  slug: 'trade-show-banner-printing-guide',
  categoryKey: 'banners',
  source: 'legacy',
  date: '2026-07-10',
  title: {
    'zh-hk': '棣欐腐璨挎槗灞曟槗鎷夊鍗板埛鎸囧崡 路 璺ㄥ闆诲晢鍝佺墝灞曟渻浣堝眬 | 鏅哄嵃闆?ZprintPro',
    en: 'Trade Show Banner Printing Guide 2026: Retractable, Backdrop & USA Shipping | ZprintPro',
    ja: '灞曠ず浼氥儛銉娿兗鍗板埛銈偆銉?026锛氥儹銉笺儷銈儍銉椼兓銉愩儍銈儔銉儍銉椼兓鐭湡绱嶅搧 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '璺ㄥ闆诲晢銆丄mazon 璩ｅ銆丒tsy 鍓典綔鑰呫€丆omic-Con 鍚屼汉鏀や綅銆佸搧鐗?pop-up 涓荤悊浜哄繀鐫囥€備竴鍊嬮珮璩礌鏄撴媺瀵舵焙瀹氬睍浣?3 绉掔涓€鍗拌薄銆傛櫤鍗伴洸鎻愪緵 100-2,000 濂?Roll-up 鏄撴媺瀵?+ X 鍨嬪睍鏋?+ 鑳屾澘鑸炲彴鍏ㄥ瀹氬埗,3-7 鍊嬪伐浣滃ぉ浜や粯,闋嗚睈鏈湴娓節鏂扮晫 + DHL 鍏ㄧ悆閰嶉€併€?,
    en: 'US small business owners, Etsy / Shopify brands, Comic-Con / Anime Expo exhibitors 鈥?a premium retractable or backdrop banner decides booth traffic and brand recall. Free design, 100 MOQ, 5-7 business day production, free shipping over US$99, DHL Express 2-4 day delivery to US ZIP codes.',
    ja: '绫冲浗涓皬浼佹キ銉籈tsy/Shopify 銉栥儵銉炽儔銉籆omic-Con / Anime Expo 鍑哄睍鑰呭悜銇戙€傞珮鍝佽唱銉兗銉偄銉冦儣銉愩儕銉?/ 銉愩儍銈儔銉儍銉椼亴銉栥兗銈瑰嫊鍝°仺銉栥儵銉炽儔鎯宠捣銈掓焙瀹氥€傜劇鏂欍儑銈躲偆銉炽兓100 MOQ銉?-7 鍠舵キ鏃ョ敓鐢ｃ兓US$99 浠ヤ笂鐒℃枡閰嶉€併兓DHL Express 2-4 鏃ョ背鍥介厤閫併€?,
  },
};

// Q-P2-02 (envelopes 脳 濠氭叾)
const lpWeddingEnvelope: BlogPostMeta = {
  slug: 'wedding-invitation-envelope-printing-guide',
  categoryKey: 'wedding-envelope',
  source: 'legacy',
  date: '2026-07-10',
  title: {
    'zh-hk': '棣欐腐濠氱Ξ閭€璜嬩俊灏佸嵃鍒锋寚鍗?路 2026 榫嶅勾濠氬珌鏃哄蹇呭倷 | 鏅哄嵃闆?ZprintPro',
    en: 'Wedding Invitation Envelope Printing Guide 2026: Pearl, Foil-Lined & Custom Sizes | ZprintPro',
    ja: '銈︺偍銉囥偅銉炽偘鎷涘緟鐘跺皝绛掑嵃鍒枫偓銈ゃ儔2026锛氥儜銉笺儷銉荤當鎶笺仐鍐呭伌銉汇偒銈广偪銉犮偟銈ゃ偤 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '婧栨柊浜恒€佸绂当绫屽斧銆侀厭搴楀鏈冨牬鍦板繀鐫囥€備竴鍊嬬簿绶诲槄濠氱Ξ閭€璜嬩俊灏佹焙瀹氳硴瀹㈠皪濠氱Ξ鍢呯涓€鍗拌薄銆傛櫤鍗伴洸鐐洪娓鎱跺競鍫存彁渚涚弽鐝犵櫧銆佽薄鐗欑櫧銆佺嚈閲戝収瑗€佺帿鐟伴噾闁冪矇绛?6 澶ф潗璩?DL / A7 / C6 / 鑷▊灏哄鍏ㄥ瀹氬埗,100-3,000 鍊嬪皬鎵归噺,5-10 鍊嬪伐浣滃ぉ浜や粯,闋嗚睈鏈湴娓節鏂扮晫鍏嶉亱璨汇€?,
    en: 'Engaged couples, wedding planners, stationery designers 鈥?premium pearl, foil-lined, custom-sized wedding invitation envelopes set the first impression. Free design, 100 MOQ, 5-10 business day production, DHL Express 2-4 day global shipping.',
    ja: '銇斿绱勩偒銉冦儣銉兓銈︺偋銉囥偅銉炽偘銉椼儵銉炽儕銉笺兓銈广儐銉笺偡銉с儕銉兗銉囥偠銈ゃ儕銉煎悜銇戙€備笂璩儜銉笺儷銉荤當鎶笺仐鍐呭伌銉汇偒銈广偪銉犮偟銈ゃ偤灏佺瓛銇岀涓€鍗拌薄銈掓焙瀹氥€傜劇鏂欍儑銈躲偆銉炽兓100 MOQ銉?-10 鍠舵キ鏃ョ敓鐢ｃ兓DHL Express 鍥介殯閰嶉€佸蹇溿€?,
  },
};

// Q-P2-03 (japan-doujin 脳 鏂囧壍IP)
const lpDoujinCircle: BlogPostMeta = {
  slug: 'doujin-circle-printing-guide',
  categoryKey: 'japan-doujin',
  source: 'legacy',
  date: '2026-07-10',
  title: {
    'zh-hk': '鍚屼汉瑾?/ 鍚屼汉鍛ㄩ倞鍗板埛鎸囧崡 路 棣欐腐鍓典綔鑰呭皬鎵归噺瀹氬埗 | 鏅哄嵃闆?ZprintPro',
    en: 'Doujin Circle Printing Guide: Small-Batch Booklets, Fast Turnaround & Premium Quality for Indie Creators | ZprintPro',
    ja: '鍚屼汉瑾屽嵃鍒枫偓銈ゃ儔锛氬皬銉儍銉堛兓灏戦儴鏁般兓楂樺搧璩蹇溿兓鐭磵鏈?| ZprintPro',
  },
  excerpt: {
    'zh-hk': '鎻掔暙甯€佹极鐣銆丆omic-Con 鍚屼汉鏀や綅銆乂Tuber 鍛ㄩ倞瑷▓甯€佹枃鍓靛搧鐗屽繀鐫囥€備竴鏈珮璩礌鍚屼汉瑾屾焙瀹氬搧鐗岃鲸璀樺害鑸囩矇绲插繝瑾犲害銆傛櫤鍗伴洸鐐洪娓悓浜哄競鍫存彁渚?30 鏈捣鍗?+ 5 澶ц瑷?+ 鐕欓噾灏侀潰 + 5-7 鍊嬪伐浣滃ぉ浜や粯,DHL 鍏ㄧ悆 2-4 澶╅厤閫佽嚦 Comiket銆丄nime Expo 绛夊湅闅涙椿鍕曟渻鍫淬€?,
    en: 'Indie comic creators, zine makers, Comic-Con Artist Alley exhibitors, indie game studios 鈥?premium small-batch doujin booklet printing with 30-copy MOQ, 5-7 business day production, free design mockup, and DHL Express global shipping.',
    ja: '鍚屼汉浣滃銉粃ine 浣滃銉籆omic-Con Artist Alley 鍑哄睍鑰呫兓銈ゃ兂銉囥偅銉笺偛銉笺儬銈广偪銈搞偑鍚戙亼銆傘儣銉儫銈儬鍚屼汉瑾屽嵃鍒?30 閮?MOQ銉?-7 鍠舵キ鏃ョ敓鐢ｃ兓鐒℃枡銉囥偠銈ゃ兂銉儍銈偄銉冦儣銉籇HL Express 鍥介殯閰嶉€佸蹇溿€?,
  },
};

// Q-010 (stickers 脳 閰掑簵姘戝) - 2026-07-13 daily
const lpHotelAmenitySticker: BlogPostMeta = {
  slug: 'hotel-amenity-sticker-printing-guide',
  categoryKey: 'sticker',
  source: 'legacy',
  date: '2026-07-13',
  title: {
    'zh-hk': '閰掑簵姘戝杩庤硴璨肩礄鍗板埛鎸囧崡 路 琛屾潕妯欑堡 / 鎴垮崱濂?/ 瀹㈢敤鍝佸畾鍒?| 鏅哄嵃闆?ZprintPro',
    en: 'Hotel & Resort Amenity Sticker Printing Guide: Luggage Tags, Welcome Kits & Branded Service for US Properties | ZprintPro',
    ja: '銉涖儐銉兓銉偩銉笺儓 銈儭銉嬨儐銈ｃ偣銉嗐儍銈兗鍗板埛銈偆銉夛細鑽风墿銈裤偘銉汇偊銈с儷銈儬銈儍銉堛兓銉偞銈广儐銉冦偒銉?| 鏅哄嵃闆?ZprintPro',
  },
  excerpt: {
    'zh-hk': '棣欐腐閰掑簵妤€佸崐宄躲€佹床闅涖€佹倕姒曞簞銆佺簿鍝侀厭搴楀悓 B&B 姘戝蹇呯潎銆?00 鍊嬭捣鍗?+ 闃叉按 PVC + 鐕欓噾 logo + 闋嗚睈鏈湴閰嶉€?+ 5-7 鍊嬪伐浣滃ぉ浜よ波銆?,
    en: 'US hotels, B&Bs, Airbnb hosts, resorts, spa properties: Free Shipping $99+ Continental US, 100 MOQ, Free Design Mockup, waterproof PVC + foil logo, 5-7 business day delivery.',
    ja: '銉涖儐銉兓鏃呴え銉绘皯娉娿偑銉笺儕銉煎悜銇戙€?00 鍊嬨亱銈夊皬銉儍銉?+ 闃叉按 PVC + 绠旀娂銇椼儹銈?+ 鏃ユ湰鍏ㄥ浗 2-4 鏃ラ厤閫?+ 娌栫竸銉诲寳娴烽亾銈傚悓鏂欓噾銆?,
  },
};

// Q-011 (paper-bags 脳 閲戣瀺璀夊埜) - 2026-07-13 weekly
const lpFinanceSummitGiftBag: BlogPostMeta = {
  slug: 'finance-summit-gift-bag-printing-guide',
  categoryKey: 'paper-bags',
  source: 'legacy',
  date: '2026-07-13',
  title: {
    'zh-hk': '棣欐腐閲戣瀺宄版渻绂搧琚嬪嵃鍒锋寚鍗?路 閵€琛岃病瀵岀鐞嗘椿鍕曡磰鍔╁晢绱欒瀹氬埗 | 鏅哄嵃闆?ZprintPro',
    en: 'Financial Summit Gift Bag Printing Guide: FSC, Foil Logo & VIP Bags for US Wealth Management | ZprintPro',
    ja: '閲戣瀺銈点儫銉冦儓 銈儠銉堛儛銉冦偘鍗板埛銈偆銉夛細FSC瑾嶈銉荤當鎶笺仐銉籚IP銉愩儍銈?鏃ユ湰銈︺偋銉偣銉汇優銉嶃偢銉°兂銉堝悜銇?| 鏅哄嵃闆?ZprintPro',
  },
  excerpt: {
    'zh-hk': '棣欐腐閲戣瀺姗熸銆侀妧琛屻€佽病瀵岀鐞嗗叕鍙搞€佸埜鍟嗐€佷繚闅叕鍙搞€佸鏃忚睛鍏蹇呯潎銆侳SC 瑾嶈瓑鐠颁繚鐗涚毊绱欒锛?00 鍊嬭捣鍗帮紝鐕欓噾 logo锛屾腐涔濅腑鐠?IFC / 鐏ｄ粩 / 閲戦悩鏈湴閫熼仦锛?-7 鍊嬪伐浣滃ぉ浜よ波銆?,
    en: 'US banks, wealth management firms, broker-dealers, insurance carriers, family offices: FSC-certified kraft + white card + magnetic closure, 100 MOQ, foil-stamped logo, 5-7 business day delivery to US ZIP codes.',
    ja: '鏃ユ湰銇妧琛屻€併偊銈с儷銈广兓銉炪儘銈搞儭銉炽儓浼氱ぞ銆佽鍒镐細绀俱€佷繚闄轰細绀俱€併儠銈°儫銉兗銈儠銈ｃ偣鍚戙亼銆侳SC 瑾嶈銈儵銉曘儓銉荤櫧銈兗銉夈兓纾佺煶銈儹銉笺偢銉ｃ兗銆?00 鍊嬨亱銈夊皬銉儍銉堝蹇溿€?-7 鍠舵キ鏃ョ敓鐢ｃ€佸叏鍥介€佹枡鐒℃枡銆?,
  },
};

// Q-012 (posters 脳 楂旇偛璩戒簨) - 2026-07-13 weekly
const lpMarathonEventPoster: BlogPostMeta = {
  slug: 'marathon-event-poster-printing-guide',
  categoryKey: 'posters',
  source: 'legacy',
  date: '2026-07-13',
  title: {
    'zh-hk': '棣媺鏉捐辰浜嬫捣鍫卞嵃鍒锋寚鍗?路 闃叉按 A1/A2 璺戞墜鍖?+ 璧疯窇鎷遍杸 | 鏅哄嵃闆?ZprintPro',
    en: 'Marathon Event Poster Printing Guide: Waterproof A1/A2 Race Posters, Runner Packets & Start-Line Arches | ZprintPro',
    ja: '銉炪儵銈姐兂澶т細銉濄偣銈裤兗鍗板埛銈偆銉夛細闃叉按 A1/A2 銉兗銈广儩銈广偪銉笺兓銉┿兂銉娿兗銉戙偙銉冦儓銉汇偣銈裤兗銉堛偄銉笺儊 | 鏅哄嵃闆?ZprintPro',
  },
  excerpt: {
    'zh-hk': '棣欐腐娓ｆ墦棣媺鏉俱€佽棣€佸崐棣媺鏉俱€佸鐣岀敯寰戝繀鐫囥€?00 寮佃捣鍗帮紝A1/A2 闃叉按 PP + 13oz 鎴跺鐕堝竷璧疯窇鎷遍杸锛岄爢璞愭湰鍦版腐涔濇柊鐣屽厤閬嬭不锛?-5 鍊嬪伐浣滃ぉ浜よ波銆?,
    en: 'US race directors, running clubs, charity foundations: 100 MOQ, waterproof A1/A2 + 13oz vinyl start arches, runner packet inserts, sponsor recognition walls, 3-5 business day delivery to US ZIP codes.',
    ja: '鏃ユ湰銇儸銉笺偣銉囥偅銉偗銈裤兗銆併儵銉炽儖銉炽偘銈儵銉栥€併儊銉ｃ儶銉嗐偅璨″洠鍚戙亼銆?00 鏋氥亱銈夊蹇溿€侀槻姘?A1/A2 + 13oz 銉撱儖銉笺儷 銈广偪銉笺儓銈兗銉併€併儵銉炽儕銉笺儜銈便儍銉堟尶鍏ョ墿銆?-5 鍠舵キ鏃ョ敓鐢ｃ€佸叏鍥介€佹枡鐒℃枡銆?,
  },
};

// T-B-04 (stickers 脳 姹借粖姹介厤) - 2026-07-13 weekly
const lpCarDealershipAmenitySticker: BlogPostMeta = {
  slug: 'car-dealership-amenity-sticker-printing-guide',
  categoryKey: 'sticker',
  source: 'legacy',
  date: '2026-07-13',
  title: {
    'zh-hk': '姹借粖 4S 搴?/ 浜屾墜杌婅璨肩礄鍗板埛鎸囧崡 路 闃叉按 PVC 瑭﹂杌婅韩璨?+ 鏈嶅嫏鎻愰啋 | 鏅哄嵃闆?ZprintPro',
    en: 'Car Dealership Amenity Sticker Printing Guide: Waterproof PVC, Test Drive Decals & Service Reminders for US Auto Industry | ZprintPro',
    ja: '鑷嫊杌娿儑銈ｃ兗銉┿兗 銈儭銉嬨儐銈ｃ偣銉嗐儍銈兗鍗板埛銈偆銉夛細闃叉按 PVC銉昏│涔椼儑銈兗銉兓銈点兗銉撱偣娉ㄦ剰鍠氳捣 鏃ユ湰鑷嫊杌婃キ鐣屽悜銇?| 鏅哄嵃闆?ZprintPro',
  },
  excerpt: {
    'zh-hk': '棣欐腐 4S 搴椼€佷簩鎵嬭粖琛屻€佹苯杌婄編瀹广€佽吉鑳庝腑蹇冦€佺董淇伐鍫村繀鐫囥€?00 寮佃捣鍗帮紝闃叉按 PVC + 閫忔槑 BOPP + 鑰愭补 PVC锛岄爢璞愭湰鍦版腐涔濇柊鐣屽厤閬嬭不锛?-5 鍊嬪伐浣滃ぉ浜よ波銆?,
    en: 'US car dealerships, auto body shops, tire centers, quick lubes, EV brand experience studios: 100 MOQ, waterproof PVC + transparent BOPP + oil-resistant vinyl, 3-5 business day delivery to US ZIP codes.',
    ja: '鏃ユ湰銇嚜鍕曡粖銉囥偅銉笺儵銉笺€侀垜閲戝瑁呭伐鍫淬€併偪銈ゃ儰銈汇兂銈裤兗銆丵uick Lube銆丒V 銉栥儵銉炽儔浣撻〒銈广偪銈搞偑鍚戙亼銆?00 鏋氥亱銈夊蹇溿€侀槻姘?PVC + 閫忔槑 BOPP + 鑰愭补銉撱儖銉笺儷銆?-5 鍠舵キ鏃ョ敓鐢ｃ€佸叏鍥介€佹枡鐒℃枡銆?,
  },
};

// T-B-09 (stickers 脳 閰掑簵鎷撻粸) - 2026-07-13 weekly
const lpHotelKeycardSleeve: BlogPostMeta = {
  slug: 'hotel-keycard-sleeve-printing-guide',
  categoryKey: 'sticker',
  source: 'legacy',
  date: '2026-07-13',
  title: {
    'zh-hk': '閰掑簵鎴垮崱濂?+ 琛屾潕鐗屽嵃鍒锋寚鍗?路 杌熻Ц鍟為潰 + 鐕欓噾 logo 瀹㈢敤鍝佸寘瑁?| 鏅哄嵃闆?ZprintPro',
    en: 'Hotel Key Card Sleeve & Luggage Tag Printing Guide: Soft-Touch Matte, Foil Logo & Glass Welcome Signs for US Hospitality | ZprintPro',
    ja: '銉涖儐銉?銉兗銉犮偔銉?銈广儶銉笺儢銉昏嵎鐗┿偪銈板嵃鍒枫偓銈ゃ儔锛氥偨銉曘儓銈裤儍銉併優銉冦儓銉荤當鎶笺仐銉汇偓銉┿偣 銈︺偋銉偒銉?鏃ユ湰銉涖儐銉キ鐣屽悜銇?| 鏅哄嵃闆?ZprintPro',
  },
  excerpt: {
    'zh-hk': '棣欐腐浜旀槦绱氶厭搴椼€佺簿鍝侀厭搴椼€丅&B 姘戝銆丄irbnb 鐭蹇呯潎銆?00 寮佃捣鍗帮紝杌熻Ц鍟為潰 PVC + 鐕欓噾绠?+ 灞€閮?UV锛岄爢璞愭湰鍦版腐涔濇柊鐣屽厤閬嬭不锛?-5 鍊嬪伐浣滃ぉ浜よ波銆?,
    en: 'US five-star hotels, boutique hotels, B&Bs, Airbnb hosts, resort spas: 100 MOQ, soft-touch matte PVC + foil + spot UV, room key sleeves, luggage tags, turn-down seals, 3-5 business day delivery to US ZIP codes.',
    ja: '鏃ユ湰銇簲銇ゆ槦銉涖儐銉€併儢銉嗐偅銉冦偗銉涖儐銉€丅&B銆佹皯娉娿€併儶銈俱兗銉堛偣銉戝悜銇戙€?00 鏋氥亱銈夊蹇溿€併偨銉曘儓銈裤儍銉併優銉冦儓 PVC + 绠旀娂銇?+ 銈广儩銉冦儓 UV銆併儷銉笺儬銈兗 銈广儶銉笺儢銆佽嵎鐗┿偪銈般€?-5 鍠舵キ鏃ョ敓鐢ｃ€佸叏鍥介€佹枡鐒℃枡銆?,
  },
};

// 2026-07-14 v4 daily-content-evolve (3 blogs P0/P0/P1): Tier A 姣嶅 + 鐗╂祦蹇仦 + Tier C 褰辫IP 鏂拌妤娆¤钃?
// - lpBabyProductLabel: stickers 脳 姣嶅 (Q-014 new)
// - lpEcommerceShippingBag: paper-bags 脳 鐗╂祦蹇仦 (Q-015 new)
// - lpMediaMerchandiseBox: packaging 脳 褰辫IP (Q-016 new) 鈥?Tier C 琛屾キ棣栨瑕嗚搵
const lpBabyProductLabel: BlogPostMeta = {
  slug: 'baby-product-label-sticker-printing-guide',
  categoryKey: 'sticker',
  source: 'legacy',
  date: '2026-07-14',
  title: {
    'zh-hk': "姣嶅鍝佺墝璨肩礄鍗板埛鎸囧崡 路 瀣板厭椋熷搧绱氬畨鍏ㄦ绫ゅ畾鍒?| 鏅哄嵃闆?ZprintPro",
    en: "Baby Product Sticker Printing Guide: FDA Food-Safe Labels for US Infant Brands | ZprintPro",
    ja: "銉欍儞銉肩敤鍝併偣銉嗐儍銈兗鍗板埛銈偆銉夛細FDA椋熷搧琛涚敓銉┿儥銉?鏃ユ湰鍚戙亼 | ZprintPro",
  },
  excerpt: {
    'zh-hk': "瀣板厭濂剁矇銆佸骞煎厭娲楄銆佸瀵惰紨椋熴€佸瓡鐢㈠│鐕熼鍝佸搧鐗屽繀鐫囥€備竴寮甸€氶亷 FDA 瑾嶈瓑鐨勯鍝佺礆璨肩礄鐩存帴褰遍熆璨ㄦ灦鎺ュ彈搴﹁垏濯藉缇ら珨淇′换銆傛櫤鍗伴洸鐐烘瘝瀣板搧鐗屾彁渚?BPA-free 椋熷搧绱氭潗璩?+ 闃叉挄鐮?+ 鑰愬喎钘?+ 闃叉按闃叉补妯欑堡,500-100,000 鏋氬皬鑷冲ぇ鎵归噺,5-7 鍊嬪伐浣滃ぉ浜や粯銆?,
    en: "US infant formula, baby food, baby skincare, and maternal nutrition brand owners: an FDA-compliant, BPA-free, freezer-safe label decides whether your product passes Whole Foods / Target / BuyBuy Baby shelf review and wins mom-trust on Instagram. ZprintPro prints 500 to 100,000-piece runs, 5-7 business day production, with free design mockup and Free Shipping over $99 to US ZIP codes.",
    ja: "鏃ユ湰銇矇銉熴儷銈兓銉欍儞銉笺儠銉笺儔銉昏丹銇°們銈撱偣銈兂銈便偄銉汇優銈裤儖銉嗐偅鏍勯銉栥儵銉炽儔銈兗銉娿兗妲樸伕銆侳DA 婧栨嫚銉籅PA-free銉诲喎鍑嶅蹇溿儵銉欍儷銇?shelf 瀵╂熁銇ㄣ優銉炰笘浠?SNS 淇￠牸銈掓焙瀹氥€傛櫤鍗伴洸銇?500銆?00,000 鏋氬皬銆滃ぇ銉儍銉堛€?-7 鍠舵キ鏃ョ磵鍝併€?99 浠ヤ笂鐒℃枡閰嶉€併€丏HL 鍥介殯閰嶉€佸蹇溿€?,
  },
};

const lpEcommerceShippingBag: BlogPostMeta = {
  slug: 'ecommerce-shipping-bag-printing-guide',
  categoryKey: 'paper-bags',
  source: 'legacy',
  date: '2026-07-14',
  title: {
    'zh-hk': "璺ㄥ闆诲晢蹇仦琚嬪嵃鍒锋寚鍗?路 闃叉按鐮村琚?+ 鍏ㄧ悆娲鹃€?| 鏅哄嵃闆?ZprintPro",
    en: "E-commerce Shipping Bag Printing Guide: Tamper-Evident & Waterproof Mailers for US Brands | ZprintPro",
    ja: "EC閰嶉€佽鍗板埛銈偆銉夛細闃叉按銉绘敼銇栥倱闃叉 鏃ユ湰鐗╂祦鍚戙亼 | ZprintPro",
  },
  excerpt: {
    'zh-hk': "浜為Μ閬?FBA銆丼hopify 鐛ㄧ珛绔欍€丒tsy 璩ｅ銆佽法澧冪墿娴佸叕鍙稿繀鐫囥€備竴鍊嬮珮璩礌銆佸嵃鍒风簿缇庛€佸叿鍌欑牬澹炴€у皝鍙ｇ殑蹇仦琚嬫焙瀹氬鎴堕枊绠遍珨椹楀拰閫€璨ㄧ巼銆傛櫤鍗伴洸鐐鸿法澧冮浕鍟嗘彁渚涢槻姘寸牬澹炶銆佽嚜绮樺皝鍙ｃ€佸嵃鍒峰搧鐗?logo + 杩借工纰?+ 閫€璨ㄦ绫ゅ叏濂楀畾鍒?1,000-200,000 鍊嬪皬鑷冲ぇ鎵归噺,5-10 鍊嬪伐浣滃ぉ浜や粯銆?,
    en: "US Amazon FBA, Shopify, Etsy, and 3PL warehouse brand owners: a premium printed shipping bag with tamper-evident seal, tracking barcode, and return label decides unboxing experience and return rate. ZprintPro prints 1,000-200,000 piece runs with waterproof kraft, custom brand printing, peel-and-stick adhesive, and Free Shipping over $99 to US ZIP codes.",
    ja: "鏃ユ湰銇?Amazon FBA銉籗hopify銉籈tsy銉?PL 鍊夊韩銉栥儵銉炽儔銈兗銉娿兗妲樸伕銆傛敼銇栥倱闃叉銈枫兗銉兓杩借贰銉愩兗銈炽兗銉夈兓杩斿搧銉┿儥銉粯銇嶃伄楂樺搧璩嵃鍒烽厤閫佽銇屻€侀枊灏佷綋楱撱仺杩斿搧鐜囥倰姹哄畾銆傛櫤鍗伴洸銇槻姘淬偗銉┿儠銉堛兓銈偣銈裤儬鍗板埛銉诲墺闆㈢矘鐫€銇?1,000銆?00,000 鍊嬪皬銆滃ぇ銉儍銉堛€?-10 鍠舵キ鏃ョ磵鍝併€?99 浠ヤ笂鐒℃枡閰嶉€併€佸叏鍥介€佹枡杈笺伩銆?,
  },
};

const lpThickPaperFlyer: BlogPostMeta = {
  slug: 'thick-paper-flyer-printing-restaurant-takeout-guide',
  categoryKey: 'flyers',
  source: 'legacy',
  date: '2026-07-15',
  title: {
    'zh-hk': '鍘氱礄鍌冲柈鍗板埛鎸囧崡 路 棣欐腐椁愬怀澶栬常鍠嫉鍘氱礄閬告潗鏀荤暐 | 鏅哄嵃闆?ZprintPro',
    'en': 'Thick Paper Flyer Printing Guide 路 Restaurant Menu Inserts & Takeout for US Food Service | ZprintPro',
    'ja': '鍘氱礄銉併儵銈峰嵃鍒枫偓銈ゃ儔 路 椋查搴椼儭銉嬨儱銉笺兓銉嗐偆銈偄銈︺儓鍚戙亼瀹屽叏瑙ｈ | ZprintPro',
  },
  excerpt: {
    'zh-hk': '棣欐腐椁愬怀鏃哄鍓嶅繀鐫囥€?00g-400g 鍏ㄨ鏍煎帤绱欏偝鍠?5,000 寮?250g 閵呯増绱?A4 闆欓潰鍥涜壊 + 闆欓潰閬庤啝 HK$0.65/寮?璧枫€?00 寮佃捣鍗?5-7 鍊嬪伐浣滃ぉ浜よ波,闋嗚睈鏈湴娲鹃€佹腐涔濇柊鐣屻€?,
    'en': 'US restaurant chains, ghost kitchens, and QSR owners: a 250gsm thick paper flyer with logo + weekly special + QR code + loyalty stamp is the cheapest repeat-customer driver. ZprintPro supplies 200gsm to 400gsm full-range stocks, 100-piece test runs to 200,000-piece chain rollouts, 4-day USA production, Free Shipping over $99 to all US ZIP codes.',
    'ja': '鏃ユ湰銇儸銈广儓銉┿兂銉诲眳閰掑眿銉汇偒銉曘偋銉汇儐銈ゃ偗銈偊銉堝皞闁€搴椼兓銉囥儶銉愩儶銉笺偔銉冦儊銉虫銇搞€?00gsm銆?00gsm 鍏ㄨ鏍煎帤绱欍儊銉┿偡銆?00 鏋氳│鍒枫亱銈?200,000 鏋氥儊銈с兗銉冲睍闁嬨伨銇у蹇溿€? 鍠舵キ鏃ュ浗鍐呯敓鐢ｃ€?99 浠ヤ笂銇у叏鍥界劇鏂欓厤閫併€併儰銉炪儓閬嬭几銉籇HL 鍥介殯閰嶉€佸蹇溿€?,
  },
};
const lpMagneticClosureGiftBox: BlogPostMeta = {
  slug: 'magnetic-closure-gift-box-ecommerce-brand-guide',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2026-07-15',
  title: {
    'zh-hk': '纾佸惛绂洅瀹氬埗鎸囧崡 路 璺ㄥ闆诲晢鍝佺墝鍗囩礆鍖呰鏂规 | 鏅哄嵃闆?ZprintPro',
    'en': 'Magnetic Closure Gift Box Guide 路 Cross-Border E-commerce Premium Packaging for US DTC Brands | ZprintPro',
    'ja': '銉炪偘銉嶃儍銉堝紡銈儠銉?銉溿儍銈偣 銈偣銈裤儬銈偆銉?路 瓒婂EC銉籇TC 銉栥儵銉炽儔鍚戙亼銉椼儸銉熴偄銉犲寘瑁?| ZprintPro',
  },
  excerpt: {
    'zh-hk': '浜為Μ閬?FBA銆丼hopify 鐛ㄧ珛绔欍€丒tsy 鎵嬩綔搴椼€並ickstarter 缇ょ溇鍕熻硣銆佽▊闁辩洅 DTC 鍝佺墝蹇呯潎銆?57g 鐏版澘 + 128g 闆欓妳绱欑鍚哥Ξ鐩?500 鍊?350脳250脳100mm 澶╁湴钃?+ 瑙告劅鍟炶啝 + 鐕欓噾 logo + EVA 鍏ф墭 HK$22/鍊?璧?DHL 鍏ㄧ悆 2-4 鏃ラ€侀仈,DDP 瀹岀▍鍒伴杸銆?,
    'en': 'US Shopify, Amazon FBA, Etsy, Kickstarter, subscription box DTC brands: magnetic closure box with crisp snap + foil logo + soft-touch lamination is the fastest premium differentiator. ZprintPro supplies 100-piece Kickstarter trials to 50,000-piece chain rollouts, 5-10 business day production, DHL 2-4 day USA delivery, DDP duty-paid door-to-door.',
    'ja': '鏃ユ湰銇?Shopify銆丄mazon FBA銆丒tsy銆並ickstarter銆丼ubscription Box DTC 銉栥儵銉炽儔銈兗銉娿兗妲樸伕銆?00 鍊?Kickstarter 瑭︿綔銇嬨倝 50,000 鍊嬨儊銈с兗銉冲睍闁嬨伨銇у蹇溿€?57gsm 銈般儸銉?銉溿兗銉?+ 128gsm 銈兗銉堢礄 / 鐗规畩绱?銉炪偘銉嶃儍銉?銉溿儍銈偣銆?-10 鍠舵キ鏃ョ敓鐢ｃ€丏HL 2-4 鏃ュ浗鍐呴厤閫併€併儰銉炪儓閬嬭几銉籇HL 鍥介殯閰嶉€佸蹇溿€?,
  },
};
const lpFoldingBoxCosmetics: BlogPostMeta = {
  slug: 'folding-box-cosmetics-brand-eco-friendly-guide',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2026-07-15',
  title: {
    'zh-hk': '鎶樼枈鐩掑畾鍒舵寚鍗?路 缇庡璀疯啔鍝佺墝鐠颁繚鍖呰鏀荤暐 | 鏅哄嵃闆?ZprintPro',
    'en': 'Folding Box Printing Guide 路 Eco-Friendly Cosmetics Brand Packaging for US Skincare & Beauty | ZprintPro',
    'ja': '鎶樸倞鐣炽伩绠?銈偣銈裤儬 銈偆銉?路 鍖栫钵鍝併兓銈广偔銉炽偙銈?銉栥儵銉炽儔鍚戙亼銈ㄣ偝鍖呰 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '缇庡璀疯啔鍝佺墝銆侀潰鑶滃搧鐗屻€佺簿鑿恫鍝佺墝銆佸彛绱呭搧鐗屻€佸僵濡濆搧鐗屻€佹墜浣滆鑶氬搧鍝佺墝蹇呯潎銆?00g 鐗涘崱 / 350g 鐧藉崱 / 400g 闆欓潰鐧藉崱 / 300g 鍐嶇敓绱?/ 350g 榛戝崱 5 娆炬姌鐤婄洅鏉愯唱,FSC 瑾嶈瓑 + 澶ц眴娌瑰ⅷ + 鍙洖鏀舵瑾屽叏濂?500 鍊?130脳60脳25mm 鎶樼枈鐩?+ 4 鑹?CMYK + 鍟為潰閬庤啝 HK$0.85/鍊?璧枫€?,
    'en': 'US skincare, serum, sheet mask, lipstick, makeup brands: 5 eco-friendly folding box materials 鈥?300gsm kraft / 350gsm white card / 400gsm duplex / 300gsm recycled / 350gsm black card. FSC certified + soy ink + recyclable mark, 500-piece 130脳60脳25mm from $0.13/box, 5-10 business day production, DHL 2-4 day USA delivery.',
    'ja': '鏃ユ湰銇偣銈兂銈便偄銆佺編瀹规恫銆併偡銉笺儓 銉炪偣銈€佸彛绱呫€併儭銈ゃ偗銆佹墜浣溿倞鍖栫钵鍝併儢銉┿兂銉夈偑銉笺儕銉兼銇搞€? 绱犳潗鎶樸倞鐣炽伩绠?300gsm 銈儵銉曘儓 / 350gsm 鐧姐偒銉笺儔 / 400gsm 涓￠潰鐧姐偒銉笺儔 / 300gsm 鍐嶇敓绱?/ 350gsm 榛掋偒銉笺儔銆侳SC 瑾嶈 + 澶ц眴銈ゃ兂銈?+ 銉偟銈ゃ偗銉?銉炪兗銈畬鍌欍€?00 鍊?130脳60脳25mm 1 鍊?20 鍐嗐€溿€?,
  },
};

const lpMediaMerchandiseBox: BlogPostMeta = {
  slug: 'media-merchandise-box-printing-guide',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2026-07-14',
  title: {
    'zh-hk': "褰辫IP鍛ㄩ倞绂洅鍗板埛鎸囧崡 路 棣欐腐鍝佺墝褰辫糠闆嗛珨鍥炴喍瀹氬埗 | 鏅哄嵃闆?ZprintPro",
    en: "Media Franchise Collector Box Printing Guide: Limited Edition, Pre-Order & Convention-Exclusive Boxes for US Fans | ZprintPro",
    ja: "銉°儑銈ｃ偄銉曘儵銉炽儊銉ｃ偆銈?銈炽儸銈偪銉笺偤銉溿儍銈偣鍗板埛銈偆銉夛細闄愬畾鐗堛兓浜堢磩銉绘棩鏈儠銈°兂鍚戙亼 | ZprintPro",
  },
  excerpt: {
    'zh-hk': "褰辫 IP 宸ヤ綔瀹ゃ€佸嫊婕搧鐗屻€丆omic-Con 鍙冨睍鍟嗐€侀檺閲忕増鏀惰棌鍝佸叕鍙稿繀鐫囥€備竴鍊嬮珮璩劅鐨?IP 鍛ㄩ倞绂洅姹哄畾绮夌挡蹇犺獱搴︺€佷簩娆″偝鎾巼鍜屼簩鎵嬪競鍫存孩鍍广€傛櫤鍗伴洸鐐哄叏鐞冨奖瑕?IP 甯傚牬鎻愪緵鎶藉睖寮忕Ξ鐩掋€佺鍚哥洅銆侀檺閲忓簭铏熷嵃鍒枫€乁V 灞€閮?+ 鐕欓噾 logo 鍏ㄥ瀹氬埗,100-10,000 鍊嬪皬鑷冲ぇ鎵归噺,7-15 鍊嬪伐浣滃ぉ浜や粯銆?,
    en: "US entertainment IP studios, anime brands, Comic-Con exhibitors, and limited-edition collectible companies: a premium IP merchandise box decides fan loyalty, secondary share rate, and aftermarket premium. ZprintPro prints drawer-style boxes, magnetic closure boxes, limited-edition numbering, UV spot + foil logo for the global media franchise market. 100-10,000 piece runs, 7-15 business day production.",
    ja: "鏃ユ湰銇槧鍍?IP 銈广偪銈搞偑銉汇偄銉嬨儭銉栥儵銉炽儔銉籆omic-Con 鍑哄睍鑰呫兓闄愬畾鐗堛偝銉偗銉嗐偅銉栦細绀惧悜銇戙€傞珮鍝佽唱 IP 銈般儍銈恒儨銉冦偗銈广亴銉曘偂銉炽儹銈ゃ儰銉儐銈ｃ兓浜屾鎷℃暎鐜囥兓涓彜甯傚牬銉椼儸銉熴偄銉犮倰姹哄畾銆傛櫤鍗伴洸銇紩鍑恒仐寮忋兓銉炪偘銉嶃儍銉堝紡銉婚檺瀹氥儕銉炽儛銉煎嵃鍒枫兓UV 銈广儩銉冦儓 + 绠旀娂銇椼儹銈淬仹銈般儹銉笺儛銉儭銉囥偅銈儠銉┿兂銉併儯銈ゃ偤甯傚牬銇?100-10,000 鍊嬪皬銆滃ぇ銉儍銉堛€?-15 鍠舵キ鏃ョ磵鍝佸蹇溿€?,
  },
};

// Unified list (42 articles)
// =============================================================================

export const blogPosts: BlogPostMeta[] = [
  // Buying guides (9)
  bgBusinessCard,
  bgSticker,
  bgFlyer,
  bgPackaging,
  bgPoster,
  bgPaperBag,
  bgBanner,
  bgBook,
  bgMenu,
  // Legacy posts (11)
  lpCompanyIntro,
  lpStickerGuide,
  lpBusinessCardDesign,
  lpPackagingTrends,
  lpCmykGuide,
  lpPaperMaterials,
  lpEcoPrinting,
  lpHKPrintingGuide,
  lpDesignFileSpecs,
  lpBrandChecklist,
  lpMtrSpecs,
  lpFlyerPrintingGuide,
  lpFoodPackagingGuide,
  lpPaperBagPrintingGuide,
  lpPosterPrintingGuide,
  lpPackagingBoxCustomGuide,
  // 2026-07-04 v2: 绱旀枃瀛楁繁搴﹀崥瀹笂绶?
  lpRestaurantOpeningFlyer,
  // 2026-07-06 v4: 鍗婂勾鍘嬬府閼界煶鐗堟瘡澶?3 绡囧崥瀹?(P0 categories 脳 Tier A industries)
  // - lpPetFoodSticker: stickers 脳 瀵电墿 (Q-003)
  // - lpApparelShoppingBag: paper-bags 脳 鏈嶈 (Q-004)
  // - lpCrossBorderShipping: packaging 脳 璺ㄥ闆诲晢 (Q-005)
  lpPetFoodSticker,
  lpApparelShoppingBag,
  lpCrossBorderShipping,
  // 2026-07-06 v3 weekly-meta-refresh (鎵嬪姩琛ユ晳: 11:00 weekly cron 璺戜簡浣?session LLM API GOAWAY 宕╀簡, 0 浜у嚭; 鐜板湪鎵嬪姩琛?3 绡?Tier B)
  // - lpRealEstateBrochureBox: packaging 脳 鎴垮湴鐢?(Tier B T1)
  // - lpPharmaceuticalLabel: stickers 脳 閱棩淇濆仴 (Tier B T2)
  // - lpJewelleryShoppingBag: paper-bags 脳 鐝犲閻橀尪 (Tier B T3)
  lpRealEstateBrochureBox,
  lpPharmaceuticalLabel,
  lpJewelleryShoppingBag,
  // 2026-07-07 v4 daily-content-evolve (3 blogs): P0 100% (Q-002) + 鏂拌妤?(Q-006/007)
  // - lpCosmeticsPackagingBox: packaging 脳 缇庡璀疯啔 (Q-002) 鈥?瑁滃畬 P0 鍏?8
  // - lpTeaBeverageGiftBox: packaging 脳 鑼堕２椋熷搧 (Q-006) 鈥?鏂拌妤?
  // - lpWeddingFavorBag: paper-bags 脳 濠氭叾 (Q-007) 鈥?鏂拌妤?
  lpCosmeticsPackagingBox,
  lpTeaBeverageGiftBox,
  lpWeddingFavorBag,
  // 2026-07-08 v4 daily-content-evolve (3 blogs): P1 unlock 闁嬪 (matrix 4 P1 鎺掗殜)
  // - lpRetailPoster: posters 脳 闆跺敭绮惧搧 (Q-P1-01) 鈥?P1 unlock 绗?1 绡?
  // - lpRestaurantMenu: menus 脳 椁愰２澶栬常 (Q-P1-02) 鈥?鍚岃妤?menu 瑁滃畬
  // - lpWeddingRedPacket: red-packets 脳 濠氭叾 (Q-P1-03) 鈥?濠氭叾琛屾キ绗?2 绡?
  lpRetailPoster,
  lpRestaurantMenu,
  lpWeddingRedPacket,
  // 2026-07-09 v4 daily-content-evolve (3 blogs): Q-P1-04 鏀跺熬 + P1 瑁滃畬 (Q-008) + 鏂拌妤?(Q-009 new)
  // - lpProductLabel: stickers 脳 璺ㄥ闆诲晢 (Q-P1-04) 鈥?GSC high_potential 椋熷搧鍖呰瑷傝＝ 48 imps rank 22.88 鍛戒腑瑁滃畬
  // - lpGraduationYearbook: educational 脳 鏁欒偛鍩硅〒 (Q-008) 鈥?P1 瑁滃畬
  // - lpIpCharacterSticker: stickers 脳 鏂囧壍IP (Q-009 new) 鈥?鏂拌妤?Tier A
  lpProductLabel,
  lpGraduationYearbook,
  lpIpCharacterSticker,
  // 2026-07-10 v4 daily-content-evolve P2 unlock (3 P2 blogs)
  lpTradeShowBanner,
  lpWeddingEnvelope,
  lpDoujinCircle,
  // 2026-07-13 daily-content-evolve Tier B 鎷撻粸 (閰掑簵姘戝)
  lpHotelAmenitySticker,
  // 2026-07-13 weekly-meta-refresh Tier B 鎷撻粸 (閲戣瀺璀夊埜 / 楂旇偛璩戒簨 / 姹借粖姹介厤 / 閰掑簵鎷撻粸)
  lpFinanceSummitGiftBag,
  lpMarathonEventPoster,
  lpCarDealershipAmenitySticker,
  lpHotelKeycardSleeve,
  // 2026-07-14 v4 daily-content-evolve add 3 (Q-014/015/016 new)
  lpBabyProductLabel,
  lpEcommerceShippingBag,
  lpMediaMerchandiseBox,
  // 2026-07-15 v4 daily-content-evolve add 3 (Q-017/018/019 NEW P0 SKU)
  lpThickPaperFlyer,
  lpMagneticClosureGiftBox,
  lpFoldingBoxCosmetics,
];

// =============================================================================
// Helpers
// =============================================================================

export function getBlogPostMetaBySlug(slug: string): BlogPostMeta | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogPostSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function getBlogPostsByCategory(categoryKey: BlogCategoryKey): BlogPostMeta[] {
  return blogPosts.filter((p) => p.categoryKey === categoryKey);
}

/**
 * Resolve cover image for a slug in a given locale.
 * 2026-07-04 淇锛氳繑鍥炵┖瀛楃涓?'' 琛ㄧず"鏃犲皝闈㈠浘",UI 鎹璺宠繃 hero 娓叉煋銆?
 * 鑰佸崥瀹?(鏈?cover 瀛楁) 浠嶈蛋榛樿 fallback;鏂版瘡鏃ュ崥瀹?(鏃?cover 瀛楁) 杩斿洖 ''銆?
 */
export function getBlogCover(slug: string, locale: Locale): string {
  const meta = getBlogPostMetaBySlug(slug);
  if (!meta || !meta.cover) return ''; // 鏃犲皝闈?鈫?绾枃瀛楀崥瀹?
  return meta.cover[locale] || meta.cover['zh-hk'] || defaultCover[locale];
}