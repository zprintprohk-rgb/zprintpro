/**
 * H1 builder for product pages.
 * 2026-07-14 v6:
 * - zh-hk: kw1→kw2 替代（不再浪费副关键词 slot）+ SKU 级 sellingPoint 动态化
 * - en: 新增 buildProductH1En() 带 sharp hooks (Free Shipping / No MOQ / Free Design)
 * - ja: 新增 buildProductH1Ja() 带日本市场卖点 (送料無料 / 100枚から / 無料デザイン)
 *
 * 最高原则（§13.13 3 Locale 内容本地化铁律）：
 * - zh-hk: 100% 繁體中文輸出（productTitle 传入简体也必须转为繁体）
 * - en: 100% English（无中文/日文残留）— target market: US/UK/AU
 * - ja: 100% 日本語（无中文/英文残留）— target market: 日本
 *
 * H1 模板:
 *   zh-hk: ${title} · ${kw} · ${hook} · 香港${cat}專家 · 智印雲  (<= 60 chars)
 *   en:    ${title} · ${hook} · ZprintPro                       (<= 70 chars)
 *   ja:    ${title} · ${hook} · ZprintPro                       (<= 70 chars)
 *
 * 60 字符阈值（Google H1 最佳实践）
 */

export type Locale = 'zh-hk' | 'en' | 'ja';

// ============================================================================
// zh-hk 数据表
// ============================================================================

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
  'japan-doujin':   '小批量印',
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

/**
 * v6 新增：SKU 级 sellingPoint 覆盖映射表 (zh-hk)
 * 当 SKU 有独特卖点时，覆盖 category 级 hook
 * 例：fruit-stickers 的卖点是「食品級」而非泛 stickers 的「100張起印」
 */
export const SKU_SELLING_POINT_ZH_HK: Record<string, string> = {
  // stickers — 食品级/透明/烫金/镭射 差异化
  'fruit-stickers': '食品級',
  'transparent-stickers': '透明底',
  'gold-foil-stickers': '燙金工藝',
  'holographic-stickers': '鐳射效果',
  'vinyl-stickers': '戶外耐用',
  'kiss-cut-stickers': '異形切割',
  'waterproof-stickers': '戶外耐用',
  'pvc-stickers': '防水材質',
  ' reflective-stickers': '反光材質',
  // packaging — 盒型差异
  'drawer-slide-gift-box': '滑軌盒',
  'magnetic-gift-box': '磁吸盒',
  'rigid-box': '硬盒定制',
  'corrugated-box': '瓦楞紙',
  'folding-carton': '摺盒定制',
  // paper-bags — 材质差异
  'large-bags': '大號容量',
  'kraft-paper-bags': '牛皮紙',
  'glossy-paper-bags': '亮面處理',
  'matte-paper-bags': '霧面處理',
  // flyers/posters — 尺寸差异
  'a4-flyers': 'A4標準',
  'a5-flyers': '雙面彩色',
  'a2-posters': '防水材質',
  'a1-posters': '高清噴繪',
  // books — 装订差异
  'perfect-binding-books': '無線膠裝',
  'saddle-stitch-books': '騎馬釘',
  'hardcover-books': '精裝硬殼',
  // calendars
  'desk-calendars': '桌曆直立',
  'wall-calendars': '高質掛畫',
  // red-packets
  'gold-foil-red-packets': '燙金工藝',
  'embossed-red-packets': '壓紋立體',
  // educational
  'exercise-books': '練習冊',
  'workbooks': '作業簿',
};

// ============================================================================
// EN 数据表 (v6 新增)
// ============================================================================

/**
 * EN sharp hooks per category — §13.15 美国市场 5 大 sharp hook 覆盖
 * Free Shipping / Free Design / No MOQ / Fast Turnaround / Made for USA
 */
export const SHARP_HOOKS_MAP_EN: Record<string, string> = {
  stickers:     'Free Design',
  flyers:       'Same-Day Print',
  packaging:    'Free Mockup',
  posters:      'No Setup Fee',
  'paper-bags': 'Eco-Friendly',
  banners:      'Free Shipping',
  envelopes:    '100 MOQ',
  calendars:    '2027 Edition',
  'red-packets':'Gold Foil',
  educational:  'School Bulk',
  books:        'Perfect Bound',
  menus:        'Laminated',
  'gift-boxes': 'Free Mockup',
  'japan-doujin':   'Short Run',
};

export const DEFAULT_HOOK_EN: Record<string, string> = {
  stickers:     'No Minimum',
  flyers:       'Free Shipping',
  packaging:    'No Setup Fee',
  posters:      'Fast Turnaround',
  'paper-bags': 'Eco-Friendly',
  banners:      'Same-Day',
  envelopes:    'No Minimum',
  calendars:    'Bulk Discount',
  'red-packets':'Gold Foil',
  educational:  'Bulk Order',
  books:        'Short Run',
  menus:        'Waterproof',
  'gift-boxes': 'Free Mockup',
  'japan-doujin':   'Short Run',
  'business-cards': 'No Minimum',
};

// ============================================================================
// JA 数据表 (v6 新增)
// ============================================================================

/**
 * JA sharp hooks per category — 日本市场卖点
 * 送料無料 / 100枚から / 無料デザイン / 即日印刷 / 少部数OK
 */
export const SHARP_HOOKS_MAP_JA: Record<string, string> = {
  stickers:     '無料デザイン',
  flyers:       '即日印刷',
  packaging:    '無料サンプル',
  posters:      '防水素材',
  'paper-bags': '環境配慮',
  banners:      '送料無料',
  envelopes:    '100枚から',
  calendars:    '2027年版',
  'red-packets':'箔押し',
  educational:  '学校向け',
  books:        '無線綴じ',
  menus:        'ラミネート',
  'gift-boxes': '無料サンプル',
  'japan-doujin':   '少部数OK',
};

export const DEFAULT_HOOK_JA: Record<string, string> = {
  stickers:     '100枚から',
  flyers:       '送料無料',
  packaging:    '無料打稿',
  posters:      '高画質',
  'paper-bags': '100枚から',
  banners:      '即日対応',
  envelopes:    '100枚から',
  calendars:    '企業向け',
  'red-packets':'春節限定',
  educational:  '学校向け',
  books:        '少部数OK',
  menus:        '防水加工',
  'gift-boxes': '無料打稿',
  'japan-doujin':   '少部数OK',
  'business-cards': '100枚から',
};

// ============================================================================
// 常量
// ============================================================================

const MAX_H1_CHARS_ZH = 60;  // Google H1 最佳实践推荐
const MAX_H1_CHARS_EN = 70;  // 英文 H1 允许稍长
const MAX_H1_CHARS_JA = 70;  // 日文 H1 允许稍长

// ============================================================================
// 工具函数
// ============================================================================

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getKw(catSlug: string): [string, string] {
  return CAT_KW_MAP_ZH_HK[catSlug] || DEFAULT_KW_MAP_ZH_HK[catSlug] || ['產品', '印刷'];
}

/**
 * zh-hk hook: 优先 SKU 级 sellingPoint, 回退 category 级 hook
 */
function getHookZh(catSlug: string, productSlug?: string): string {
  if (productSlug && SKU_SELLING_POINT_ZH_HK[productSlug]) {
    return traditionalizeZh(SKU_SELLING_POINT_ZH_HK[productSlug]);
  }
  const hook = SHARP_HOOKS_MAP_ZH_HK[catSlug] || DEFAULT_HOOK_ZH_HK[catSlug] || '香港印刷';
  return traditionalizeZh(hook);
}

function getHookEn(catSlug: string): string {
  return SHARP_HOOKS_MAP_EN[catSlug] || DEFAULT_HOOK_EN[catSlug] || 'Free Shipping';
}

function getHookJa(catSlug: string): string {
  return SHARP_HOOKS_MAP_JA[catSlug] || DEFAULT_HOOK_JA[catSlug] || '高品質印刷';
}

/**
 * 简繁体归一化：将繁体字逐字转为对应简体字，仅用于**比较去重**。
 * 不用于输出！输出必须用 traditionalizeZh()。
 */
function simplifyZh(s: string): string {
  return s
    .replace(/貼/g, '贴').replace(/紙/g, '纸').replace(/單/g, '单')
    .replace(/張/g, '张').replace(/樣/g, '样').replace(/膠/g, '胶')
    .replace(/裝/g, '装').replace(/冊/g, '册').replace(/曆/g, '历')
    .replace(/開/g, '开').replace(/環/g, '环').replace(/燙/g, '烫')
    .replace(/專/g, '专').replace(/訂/g, '订').replace(/質/g, '质')
    .replace(/貨/g, '货').replace(/運/g, '运').replace(/標/g, '标')
    .replace(/號/g, '号').replace(/規/g, '规').replace(/傳/g, '传')
    .replace(/覽/g, '览').replace(/報/g, '报').replace(/禮/g, '礼')
    .replace(/寶/g, '宝').replace(/噴/g, '喷').replace(/繪/g, '绘')
    .replace(/聯/g, '联').replace(/練/g, '练').replace(/習/g, '习')
    .replace(/無/g, '无').replace(/騎/g, '骑').replace(/馬/g, '马')
    .replace(/釘/g, '钉').replace(/廠/g, '厂').replace(/網/g, '网')
    .replace(/灣/g, '湾').replace(/體/g, '体').replace(/產/g, '产')
    .replace(/業/g, '业').replace(/廣/g, '广').replace(/東/g, '东')
    .replace(/龍/g, '龙').replace(/崗/g, '岗').replace(/區/g, '区')
    .replace(/極/g, '极').replace(/飛/g, '飞').replace(/藝/g, '艺')
    .replace(/術/g, '术').replace(/歷/g, '历').replace(/復/g, '复')
    .replace(/種/g, '种').replace(/類/g, '类').replace(/格/g, '格')
    .replace(/圖/g, '图').replace(/書/g, '书').replace(/製/g, '制')
    .replace(/廳/g, '厅').replace(/陽/g, '阳').replace(/際/g, '际')
    .replace(/驗/g, '验').replace(/護/g, '护').replace(/備/g, '备')
    .replace(/養/g, '养').replace(/營/g, '营').replace(/獲/g, '获')
    .replace(/證/g, '证').replace(/讀/g, '读').replace(/設/g, '设')
    .replace(/計/g, '计').replace(/構/g, '构').replace(/團/g, '团')
    .replace(/對/g, '对').replace(/機/g, '机').replace(/創/g, '创')
    .replace(/藥/g, '药').replace(/飲/g, '饮').replace(/飾/g, '饰')
    .replace(/農/g, '农').replace(/貿/g, '贸').replace(/鐵/g, '铁')
    .replace(/銀/g, '银').replace(/錶/g, '表').replace(/鐘/g, '钟')
    .replace(/廠/g, '厂').replace(/網/g, '网');
}

/**
 * 簡體→繁體轉換：確保 zh-hk 輸出 100% 繁體中文。
 * 這是最高原則 — zh-hk 市場不允許出現簡體字。
 *
 * 覆蓋範圍：印刷/產品/地理/公司 高頻簡體字。
 * 如果 productTitle 數據源是簡體，此函數確保輸出轉為繁體。
 */
function traditionalizeZh(s: string): string {
  return s
    // 高頻印刷/產品詞
    .replace(/贴/g, '貼').replace(/纸/g, '紙').replace(/单/g, '單')
    .replace(/张/g, '張').replace(/样/g, '樣').replace(/胶/g, '膠')
    .replace(/装/g, '裝').replace(/册/g, '冊').replace(/历/g, '曆')
    .replace(/开/g, '開').replace(/环/g, '環').replace(/烫/g, '燙')
    .replace(/专/g, '專').replace(/订/g, '訂').replace(/质/g, '質')
    .replace(/货/g, '貨').replace(/运/g, '運').replace(/标/g, '標')
    .replace(/号/g, '號').replace(/规/g, '規').replace(/传/g, '傳')
    .replace(/览/g, '覽').replace(/报/g, '報').replace(/礼/g, '禮')
    .replace(/宝/g, '寶').replace(/喷/g, '噴').replace(/绘/g, '繪')
    .replace(/联/g, '聯').replace(/练/g, '練').replace(/习/g, '習')
    .replace(/无/g, '無').replace(/骑/g, '騎').replace(/马/g, '馬')
    .replace(/钉/g, '釘').replace(/厂/g, '廠').replace(/网/g, '網')
    .replace(/湾/g, '灣').replace(/体/g, '體').replace(/产/g, '產')
    .replace(/业/g, '業').replace(/广/g, '廣').replace(/东/g, '東')
    .replace(/龙/g, '龍').replace(/岗/g, '崗').replace(/区/g, '區')
    .replace(/极/g, '極').replace(/飞/g, '飛').replace(/艺/g, '藝')
    .replace(/术/g, '術').replace(/复/g, '復').replace(/种/g, '種')
    .replace(/类/g, '類').replace(/图/g, '圖').replace(/书/g, '書')
    .replace(/制/g, '製').replace(/厅/g, '廳').replace(/阳/g, '陽')
    .replace(/际/g, '際').replace(/验/g, '驗').replace(/护/g, '護')
    .replace(/备/g, '備').replace(/养/g, '養').replace(/营/g, '營')
    .replace(/获/g, '獲').replace(/证/g, '證').replace(/读/g, '讀')
    .replace(/设/g, '設').replace(/计/g, '計').replace(/构/g, '構')
    .replace(/团/g, '團').replace(/对/g, '對').replace(/机/g, '機')
    .replace(/创/g, '創').replace(/药/g, '藥').replace(/饮/g, '飲')
    .replace(/饰/g, '飾').replace(/农/g, '農').replace(/贸/g, '貿')
    .replace(/铁/g, '鐵').replace(/银/g, '銀').replace(/钟/g, '鐘')
    // 常見異體/簡體殘留
    .replace(/个/g, '個').replace(/与/g, '與').replace(/层/g, '層')
    .replace(/门/g, '門').replace(/问/g, '問').replace(/间/g, '間')
    .replace(/国/g, '國').replace(/学/g, '學').replace(/点/g, '點')
    .replace(/电/g, '電').replace(/话/g, '話').replace(/认/g, '認')
    .replace(/长/g, '長').replace(/门/g, '門').replace(/关/g, '關')
    .replace(/总/g, '總').replace(/还/g, '還').replace(/进/g, '進')
    .replace(/过/g, '過').replace(/时/g, '時').replace(/来/g, '來')
    .replace(/动/g, '動').replace(/经/g, '經').replace(/现/g, '現')
    .replace(/场/g, '場').replace(/带/g, '帶').replace(/块/g, '塊')
    .replace(/条/g, '條').replace(/组/g, '組').replace(/编/g, '編')
    .replace(/号/g, '號').replace(/圆/g, '圓').replace(/压/g, '壓')
    .replace(/变/g, '變').replace(/头/g, '頭').replace(/实/g, '實')
    .replace(/写/g, '寫').replace(/将/g, '將').replace(/觉/g, '覺')
    .replace(/见/g, '見').replace(/购/g, '購').replace(/销/g, '銷')
    .replace(/费/g, '費').replace(/预/g, '預').replace(/项/g, '項')
    .replace(/须/g, '須').replace(/顺/g, '順').replace(/领/g, '領')
    .replace(/头/g, '頭').replace(/顾/g, '顧').replace(/验/g, '驗')
    .replace(/历/g, '曆').replace(/里/g, '裡').replace(/面/g, '麵')
    .replace(/发/g, '發').replace(/台/g, '臺').replace(/适/g, '適');
}

/**
 * v7: 检测两个字符串是否有 minLen+ 字的公共子串
 * 用于子串级别去重（不只是完全匹配）
 * 例：hasCommonSubstring('透明貼紙', '防水貼紙', 2) → true（公共子串"貼紙"）
 *     hasCommonSubstring('透明貼紙', '防水貼紙', 3) → false（无 3 字公共子串）
 */
function hasCommonSubstring(a: string, b: string, minLen: number): boolean {
  const aSimp = simplifyZh(a);
  const bSimp = simplifyZh(b);
  for (let len = minLen; len <= Math.min(aSimp.length, bSimp.length); len++) {
    for (let i = 0; i <= aSimp.length - len; i++) {
      if (bSimp.includes(aSimp.substring(i, i + len))) return true;
    }
  }
  return false;
}

// ============================================================================
// H1 Builder: zh-hk
// ============================================================================

/**
 * Build H1 for zh-hk product page. v6 模板.
 *
 * 最高原則：zh-hk H1 輸出必須 100% 繁體中文。
 * 即使 productTitle 數據源傳入簡體，traditionalizeZh() 會轉為繁體。
 *
 * v6 改进：
 * 1. kw1→kw2 替代：title 已含 kw1 → 用 kw2（不浪费副关键词 slot）
 * 2. SKU 级 sellingPoint：productSlug 传入后优先取 SKU 专属卖点
 *
 * 模板優先級（按字符長度降級）:
 *   1. ${title} · ${kw} · ${hook} · 香港${cat}專家 · 智印雲   (理想, <= 60 chars)
 *   2. ${title} · ${kw} · 香港${cat}專家 · 智印雲              (去 hook)
 *   3. ${title} · ${kw} · 智印雲                              (去「專家」)
 *
 * @param productTitle   - 來自 product.name (zh-hk, 已經過 .split('|')[0] 短名化)
 * @param categoryName   - 來自 getCategoryName(category, 'zh-hk')
 * @param catSlug        - 來自 product.category_slug
 * @param productSlug    - 來自 product.slug（v6 新增：用于 SKU 级 sellingPoint）
 */
export function buildProductH1ZhHk(
  productTitle: string,
  categoryName: string,
  catSlug: string,
  productSlug?: string
): string {
  const [kw1, kw2] = getKw(catSlug);
  const hook = getHookZh(catSlug, productSlug);

  // 最高原則：zh-hk 輸出 100% 繁體
  const title = traditionalizeZh(productTitle);
  const cat = traditionalizeZh(categoryName);

  // v8 核心去重：2+ 字子串检测（"貼紙""紙袋""信封"等 2 字词就是完全冗余）
  const titleHasKw1 = hasCommonSubstring(productTitle, kw1, 2);
  const titleHasKw2 = kw2 ? hasCommonSubstring(productTitle, kw2, 2) : false;

  let kwToUse: string;
  if (!titleHasKw1) {
    kwToUse = ` · ${kw1}`;
  } else if (kw2 && !titleHasKw2) {
    kwToUse = ` · ${kw2}`;  // kw1 与 title 有 3+ 字子串重叠 → 用 kw2
  } else {
    kwToUse = '';  // 两个 kw 都与 title 有 3+ 字重叠 → 跳过
  }

  // v7 hook 去重：2+ 字子串重叠 → 尝试 category 级 hook，仍重叠则跳过
  const kwUsed = kwToUse.replace(/^ · /, '');  // 去掉前缀 " · " 用于比较
  let hookToUse = hook;
  if (hasCommonSubstring(productTitle, hook, 2) || (kwUsed && hasCommonSubstring(kwUsed, hook, 2))) {
    const catHook = SHARP_HOOKS_MAP_ZH_HK[catSlug] || DEFAULT_HOOK_ZH_HK[catSlug] || '香港印刷';
    if (!hasCommonSubstring(productTitle, catHook, 2) && (!kwUsed || !hasCommonSubstring(kwUsed, catHook, 2))) {
      hookToUse = traditionalizeZh(catHook);
    } else {
      hookToUse = '';
    }
  }

  // v8 專家後綴去重：3 層降級
  // 1) title 含 "香港" 或 "印刷" → 用 "品質保證"（避開兩詞重複 + 品牌詞重複）
  // 2) title 與 cat 有 2+ 字重疊 → 去類目詞用 "香港印刷專家"
  // 3) 無重疊 → 保持 "香港${cat}專家"
  const titleHasCat = hasCommonSubstring(productTitle, cat, 2);
  const titleSimp = simplifyZh(productTitle);
  const titleHasHkOrPrint = titleSimp.includes('香港') || titleSimp.includes('印刷');
  const expertSuffix = titleHasHkOrPrint
    ? '品質保證'
    : (titleHasCat ? '香港印刷專家' : `香港${cat}專家`);

  const variant1 = `${title}${kwToUse}${hookToUse ? ` · ${hookToUse}` : ''} · ${expertSuffix} · 智印雲`;
  if (variant1.length <= MAX_H1_CHARS_ZH) return variant1;

  const variant2 = `${title}${kwToUse} · ${expertSuffix} · 智印雲`;
  if (variant2.length <= MAX_H1_CHARS_ZH) return variant2;

  const variant3 = `${title}${kwToUse} · 智印雲`;
  return variant3;
}

// ============================================================================
// H1 Builder: en (v6 新增)
// ============================================================================

/**
 * Build H1 for en product page.
 *
 * §13.15 美国市场优化：sharp hook 覆盖 (Free Shipping / Free Design / No MOQ)
 * §13.10 NAP 脱钩：不写 "Shenzhen Printing" / "Hong Kong"
 *
 * 模板:
 *   1. ${title} · ${hook} · ZprintPro  (理想, <= 70 chars)
 *   2. ${title} · ZprintPro            (去 hook)
 *
 * @param productTitle - 來自 product.nameEn (已短名化)
 * @param catSlug      - 來自 product.category_slug
 */
export function buildProductH1En(
  productTitle: string,
  catSlug: string
): string {
  const sellingPoint = getHookEn(catSlug);
  const regionHook = 'Global Shipping';

  // 智能截断：长标题在 "for "/" — "/"," 处截断取前半段
  let title = productTitle;
  const titleOnlyLen = title.length + ' · ZprintPro'.length; // 最短 variant
  if (titleOnlyLen > MAX_H1_CHARS_EN) {
    // 尝试在 " for " 处截断
    const forIdx = title.toLowerCase().indexOf(' for ');
    if (forIdx > 10) {
      title = title.substring(0, forIdx);
    } else {
      // 尝试在 " — " 处截断
      const dashIdx = title.indexOf(' — ');
      if (dashIdx > 10) {
        title = title.substring(0, dashIdx);
      } else {
        // 尝试在 "," 处截断
        const commaIdx = title.indexOf(',');
        if (commaIdx > 10) {
          title = title.substring(0, commaIdx);
        }
      }
    }
  }

  // 去重逻辑：如果 title 已含 sellingPoint，跳过 sellingPoint
  const titleLower = title.toLowerCase();
  const sellingPointLower = sellingPoint.toLowerCase();
  let sellingPointToUse = sellingPoint;
  if (titleLower.includes(sellingPointLower)) {
    sellingPointToUse = '';
  }

  const variant1 = `${title}${sellingPointToUse ? ` · ${sellingPointToUse}` : ''}${regionHook ? ` · ${regionHook}` : ''} · ZprintPro`;
  if (variant1.length <= MAX_H1_CHARS_EN) return variant1;

  const variant2 = `${title}${sellingPointToUse ? ` · ${sellingPointToUse}` : ''} · ZprintPro`;
  if (variant2.length <= MAX_H1_CHARS_EN) return variant2;

  const variant3 = `${title} · ZprintPro`;
  return variant3;
}

// ============================================================================
// H1 Builder: ja (v6 新增)
// ============================================================================

/**
 * Build H1 for ja product page.
 *
 * §13.10 NAP 脱钩：不写 "深圳印刷" / "中国深圳"
 * 日本市场卖点：送料無料 / 100枚から / 無料デザイン / 即日印刷
 *
 * 模板:
 *   1. ${title} · ${hook} · ZprintPro  (理想, <= 70 chars)
 *   2. ${title} · ZprintPro            (去 hook)
 *
 * @param productTitle - 來自 product.nameJa (已短名化)
 * @param catSlug      - 來自 product.category_slug
 */
export function buildProductH1Ja(
  productTitle: string,
  catSlug: string
): string {
  const sellingPoint = getHookJa(catSlug);
  const regionHook = '香港の印刷専門家';
  const title = productTitle;

  // 去重逻辑：如果 title 已含 sellingPoint，跳过 sellingPoint
  let sellingPointToUse = sellingPoint;
  if (title.includes(sellingPoint)) {
    sellingPointToUse = '';
  }

  const variant1 = `${title}${sellingPointToUse ? ` · ${sellingPointToUse}` : ''}${regionHook ? ` · ${regionHook}` : ''} · ZprintPro`;
  if (variant1.length <= MAX_H1_CHARS_JA) return variant1;

  const variant2 = `${title}${sellingPointToUse ? ` · ${sellingPointToUse}` : ''} · ZprintPro`;
  if (variant2.length <= MAX_H1_CHARS_JA) return variant2;

  const variant3 = `${title} · ZprintPro`;
  return variant3;
}
