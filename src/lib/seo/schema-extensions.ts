/**
 * SEO Schema 扩展生成器（GEO 优化专用）
 * 2026-06-10 Phase B 新增：
 *  - HowTo (工艺流程，对应主钻 4 品类)
 *  - Speakable (语音 / AI 抓取)
 *  - CategoryItemList (带 url + name 的真实产品列表)
 *  - Author (Person 类型而非 Organization)
 *
 * 与 src/lib/seo.ts 保持相同的 SchemaOrgData 类型，UTF-8 编码。
 */

import type { Locale } from '@/types/locale';
import type { SchemaOrgData } from '@/types/seo';

const SITE_URL = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SITE_URL) || 'https://zprintpro.com';

// ============================================================================
// HowTo (工艺流程) — 4 个主钻品类
// ============================================================================

export interface HowToStep {
  /** 步骤名称 (短, 1 句) */
  name: string;
  /** 步骤详细说明 */
  text: string;
  /** 可选 URL（步骤对应页面/锚点） */
  url?: string;
  /** 可选图片 URL */
  image?: string;
}

/**
 * 生成 HowTo 结构化数据
 * 参考 schema.org/HowTo 标准字段：name / description / step / totalTime
 *
 * @param name HowTo 名称（工艺名）
 * @param description 工艺描述
 * @param steps 步骤数组（每项含 name / text，可选 url / image）
 * @param locale 当前语言
 * @param totalTime ISO 8601 duration（如 "PT5D" = 5 天）
 */
export function generateHowToJsonLd(
  name: string,
  description: string,
  steps: HowToStep[],
  locale: Locale,
  totalTime?: string
): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    inLanguage: locale === 'zh-hk' ? 'zh-Hant-HK' : locale === 'ja' ? 'ja-JP' : 'en-US',
    ...(totalTime ? { totalTime } : {}),
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: s.url.startsWith('http') ? s.url : `${SITE_URL}${s.url}` } : {}),
      ...(s.image ? { image: s.image } : {}),
    })),
  };
}

/**
 * 主钻 4 品类 HowTo 步骤生成器
 * 工艺名称 + 步骤随 locale 本地化。
 */
export function getCategoryHowToSteps(
  categorySlug: string,
  locale: Locale
): { name: string; description: string; steps: HowToStep[]; totalTime: string } | null {
  // 统一品牌名（en/ja 用纯英文，避免中文泄漏）
  const brand = locale === 'zh-hk' ? '智印云' : 'ZprintPro';

  // 4 个主钻品类（按 P0 修复范围锁定）：
  // packaging / paper-bags / books / calendars
  const preset: Record<string, {
    name: Record<Locale, string>;
    description: Record<Locale, string>;
    steps: Record<Locale, { name: string; text: string }[]>;
    totalTime: string;
  }> = {
    packaging: {
      name: {
        'zh-hk': `${brand}客製化包裝盒製作工藝`,
        en: `${brand} Custom Packaging Box Production Process`,
        ja: `${brand} カスタムパッケージボックス制作工程`,
      },
      description: {
        'zh-hk': '從刀模設計到打樣到量產，5-7 個關鍵步驟完成一個客製化包裝盒。',
        en: 'From die-cut design to sampling to mass production — 5-7 key steps to complete a custom packaging box.',
        ja: '型設計からサンプル作成、量産まで5-7の重要ステップでカスタムパッケージボックスを完成。',
      },
      steps: {
        'zh-hk': [
          { name: '材料選擇', text: '挑選灰板、白卡或特種紙；常用 350g-1200g 厚度' },
          { name: '刀模設計', text: '根據盒型（天地盒、書型盒、磁吸盒）繪製刀模線並打樣確認' },
          { name: '表面印刷', text: '四色柯式印刷或數碼印刷，圖案 LOGO 精準套印' },
          { name: '覆膜工藝', text: '啞膠 / 光膠覆膜提升耐磨性，保護印刷層' },
          { name: '燙金 / UV', text: '局部燙金或 UV 上光，突出品牌細節' },
          { name: '模切成型', text: '按刀模衝壓成型，確保尺寸與折線精準' },
          { name: '品質檢驗', text: '逐個檢查色差、刮痕、成型品質後包裝出貨' },
        ],
        en: [
          { name: 'Material Selection', text: 'Choose greyboard, white card or specialty paper; typically 350g-1200g thickness.' },
          { name: 'Die-cut Design', text: 'Create die-line for box type (lid-base, book-style, magnetic closure) and confirm with sample.' },
          { name: 'Surface Printing', text: 'CMYK offset or digital printing, precise registration for logo and graphics.' },
          { name: 'Lamination', text: 'Matte or gloss lamination for wear resistance and print layer protection.' },
          { name: 'Foil Stamping / UV', text: 'Spot foil stamping or UV varnish to highlight brand details.' },
          { name: 'Die-cutting & Forming', text: 'Press to die-cut shape; ensure precise dimensions and fold lines.' },
          { name: 'Quality Inspection', text: 'Check color shift, scratches, forming quality one by one before packing.' },
        ],
        ja: [
          { name: '素材選択', text: 'グレー板紙、ホワイトカードまたは特殊紙を選択。一般的に350g-1200gの厚み。' },
          { name: '型設計', text: '箱タイプ（天地蓋式、本型、磁石式）に合わせて型線を作成しサンプルで確認。' },
          { name: '表面印刷', text: 'CMYKオフセットまたはデジタル印刷、LOGOや図柄を高精度で套印。' },
          { name: 'ラミネート加工', text: 'マットまたは光沢ラミネートで耐摩耗性を向上、印刷層を保護。' },
          { name: '箔押し / UV', text: '部分箔押しまたはUV varnishでブランドディテールを強調。' },
          { name: '型抜き成形', text: '型線通りにプレスし、寸法と折り線の精度を保証。' },
          { name: '品質検査', text: '色差、傷、成形品質を一つずつ検査してから梱包出荷。' },
        ],
      },
      totalTime: 'P7D',
    },
    'paper-bags': {
      name: {
        'zh-hk': `${brand}客製紙袋製作工藝`,
        en: `${brand} Custom Paper Bag Production Process`,
        ja: `${brand} カスタム紙袋制作工程`,
      },
      description: {
        'zh-hk': '從紙張選擇到提手安裝，6 個步驟完成一個環保紙袋。',
        en: 'From paper selection to handle installation — 6 steps to complete an eco-friendly paper bag.',
        ja: '紙選択から取っ手取り付けまで6ステップでエコ紙袋を完成。',
      },
      steps: {
        'zh-hk': [
          { name: '紙張選擇', text: 'FSC 認證牛皮紙 / 白卡紙，150g-300g 厚度可選' },
          { name: '提手選擇', text: '扭結繩、PP 繩、棉繩或緞帶，根據品牌調性決定' },
          { name: '尺寸設計', text: '小型 / 中型 / 大型 / 加大，確定寬高底厚度' },
          { name: '四色印刷', text: '單面或雙面四色印刷，支援漸層與專色' },
          { name: '覆膜處理', text: '啞膠 / 光膠覆膜，提升防水耐磨' },
          { name: '成型組裝', text: '自動糊盒機成型 + 提手打孔安裝 + 品質檢驗' },
        ],
        en: [
          { name: 'Paper Selection', text: 'FSC-certified kraft or white card paper, 150g-300g options.' },
          { name: 'Handle Selection', text: 'Twisted rope, PP rope, cotton rope or ribbon — choose by brand tone.' },
          { name: 'Size Design', text: 'Small / medium / large / extra-large, finalize width / height / bottom depth.' },
          { name: 'CMYK Printing', text: 'Single or double-sided CMYK, supports gradients and spot colors.' },
          { name: 'Lamination', text: 'Matte or gloss lamination for water and wear resistance.' },
          { name: 'Forming & Assembly', text: 'Auto folder-gluing, handle hole-punching, install handle, quality check.' },
        ],
        ja: [
          { name: '紙選択', text: 'FSC認証クラフト紙/ホワイトカード紙、150g-300gの厚みを選択可。' },
          { name: '取っ手選択', text: 'より縄、PP縄、綿縄またはリボン。ブランドイメージに合わせて決定。' },
          { name: 'サイズ設計', text: '小型/中型/大型/特大、幅・高さ・底マチを決定。' },
          { name: 'CMYK印刷', text: '片面または両面CMYK印刷、グラデーションと特色対応。' },
          { name: 'ラミネート', text: 'マットまたは光沢ラミネートで防水・耐摩耗を向上。' },
          { name: '成形組み立て', text: '自動製函機で成形、取っ手の穴あけと取り付け、品質検査。' },
        ],
      },
      totalTime: 'P5D',
    },
    books: {
      name: {
        'zh-hk': `${brand}客製化精裝書/畫冊製作工藝`,
        en: `${brand} Custom Hardcover Book / Catalog Production Process`,
        ja: `${brand} カスタム上製本/カタログ制作工程`,
      },
      description: {
        'zh-hk': '精裝書從內頁到封面到裝訂的 7 步工藝。',
        en: '7-step hardcover book process from inner pages to cover to binding.',
        ja: '上製本の中身からカバー、製本まで7ステップの工程。',
      },
      steps: {
        'zh-hk': [
          { name: '內頁排版', text: 'Adobe InDesign 排版，設定出血位 3mm，CMYK 模式' },
          { name: '封面設計', text: '封面、書脊、封底整體設計；硬殼板預留 3mm 灰板厚度' },
          { name: '內頁印刷', text: '157g-200g 銅版紙或啞粉紙四色柯式印刷' },
          { name: '封面印刷覆膜', text: '封面四色印刷 + 啞膠/光膠覆膜 + 局部 UV / 燙金' },
          { name: '摺頁配頁', text: '機器摺頁 + 人工配頁，確保頁碼順序正確' },
          { name: '鎖線膠裝', text: '鎖線 + 膠裝雙工藝，提升書本牢固度' },
          { name: '精裝成型', text: '硬殼板 + 環襯 + 書芯組合成型，最終檢驗包裝' },
        ],
        en: [
          { name: 'Inner Page Layout', text: 'Adobe InDesign layout, 3mm bleed, CMYK color mode.' },
          { name: 'Cover Design', text: 'Front / spine / back cover design; hardcover board reserves 3mm greyboard thickness.' },
          { name: 'Inner Page Printing', text: '157g-200g glossy or matte art paper CMYK offset printing.' },
          { name: 'Cover Print & Lamination', text: 'CMYK cover print + matte/gloss lamination + spot UV / foil stamping.' },
          { name: 'Folding & Collating', text: 'Machine folding + manual collating, ensure page order is correct.' },
          { name: 'Sewn Perfect Binding', text: 'Sewn + adhesive binding dual process for stronger binding.' },
          { name: 'Hardcover Forming', text: 'Hardcover board + endpapers + text block assembly, final QC and packaging.' },
        ],
        ja: [
          { name: '本文レイアウト', text: 'Adobe InDesignでレイアウト、塗り足し3mm、CMYKモード設定。' },
          { name: 'カバー設計', text: '表紙・背・裏表紙の全体設計。ハードカバーは3mmの灰板厚みを確保。' },
          { name: '本文印刷', text: '157g-200gコート紙またはマット紙でCMYKオフセット印刷。' },
          { name: 'カバー印刷ラミネート', text: 'カバーCMYK印刷+マット/光沢ラミネート+部分UV/箔押し。' },
          { name: '折り丁丁付け', text: '機械折り+手作業丁合、ページ順序を保証。' },
          { name: '糸接着製本', text: '糸+接着のW製本で耐久性を向上。' },
          { name: '上製本成形', text: 'ハードカバー+見返し+本文の組み合わせ、最终検査と梱包。' },
        ],
      },
      totalTime: 'P56D',
    },
    calendars: {
      name: {
        'zh-hk': `${brand}客製化年曆/相框年曆製作工藝`,
        en: `${brand} Custom Calendar / Photo Frame Calendar Production Process`,
        ja: `${brand} カスタムカレンダー/フォトフレームカレンダー制作工程`,
      },
      description: {
        'zh-hk': '從圖片整理到裝訂到包裝，5 步完成一個精美年曆。',
        en: 'From image preparation to binding to packaging — 5 steps to a premium calendar.',
        ja: '画像整理から製本、梱包まで5ステップで精美カレンダーを完成。',
      },
      steps: {
        'zh-hk': [
          { name: '圖片整理', text: '收集 12-36 張高解析度圖片（300dpi），按月份分組' },
          { name: '排版設計', text: '日期 / 節日 / 農曆對齊，14 頁 / 24 頁 / 36 頁規格' },
          { name: '紙張印刷', text: '銅版紙 / 啞粉紙 / 藝術紙 250g 封面 + 157g 內頁' },
          { name: '裝訂成型', text: '騎馬釘 / 膠裝 / 環裝 / 磁吸裝訂可選' },
          { name: '包裝出貨', text: '單個收縮膜或禮盒包裝，防壓出貨' },
        ],
        en: [
          { name: 'Image Preparation', text: 'Collect 12-36 high-resolution images (300dpi), grouped by month.' },
          { name: 'Layout Design', text: 'Dates / holidays / lunar calendar alignment, 14 / 24 / 36-page formats.' },
          { name: 'Paper & Printing', text: 'Art paper / matte / specialty paper — 250g cover + 157g inner pages.' },
          { name: 'Binding', text: 'Saddle-stitch / perfect / wire-o / magnetic closure binding options.' },
          { name: 'Packaging & Shipping', text: 'Individual shrink-wrap or gift box packaging, crush-resistant shipping.' },
        ],
        ja: [
          { name: '画像整理', text: '12-36枚の高解像度画像（300dpi）を収集、月別にグループ化。' },
          { name: 'レイアウト設計', text: '日付/祝日/旧暦の整合、14ページ/24ページ/36ページ仕様。' },
          { name: '紙印刷', text: 'コート紙/マット紙/特殊紙 250g表紙+157g本文。' },
          { name: '製本成形', text: '中綴じ/無線綴じ/リング綴じ/磁石式綴じを選択可。' },
          { name: '梱包出荷', text: '個別シュリンク包装またはギフトボックス包装、耐圧出荷。' },
        ],
      },
      totalTime: 'P10D',
    },
  };

  const data = preset[categorySlug];
  if (!data) return null;

  return {
    name: data.name[locale],
    description: data.description[locale],
    steps: data.steps[locale],
    totalTime: data.totalTime,
  };
}

// ============================================================================
// Speakable (语音 / AI 抓取关键)
// ============================================================================

/**
 * 生成 Speakable 结构化数据
 * 告诉 Google Assistant / AI 爬虫页面哪些 cssSelector / xpath 元素是"可朗读重点"。
 *
 * @param xpath XPath 列表（如 ["/html/head/title", "/html/body//h1"]）
 * @param cssSelectors CSS 选择器列表（如 ["#product-title", "#product-description"]）
 */
export function generateSpeakableJsonLd(
  xpath: string[],
  cssSelectors: string[] = []
): SchemaOrgData {
  const speakable: { xpath: string[]; cssSelector?: string[] } = {
    xpath: xpath.length > 0 ? xpath : ['/html/head/title', '/html/body//h1'],
  };
  if (cssSelectors.length > 0) {
    speakable.cssSelector = cssSelectors;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'SpeakableSpecification',
    ...speakable,
  } as SchemaOrgData;
}

/**
 * 标准产品页 / 分类页 / 博客页的 Speakable 通用选择器
 * 与 P0-3 任务说明一致：选 2-3 个核心 cssSelector
 */
export const standardSpeakableSelectors = {
  product: {
    cssSelector: ['#product-title', '#product-description', 'h1'],
    xpath: ['/html/head/title', '/html/body//h1'],
  },
  category: {
    cssSelector: ['h1', 'main h2'],
    xpath: ['/html/head/title', '/html/body//h1'],
  },
  blog: {
    cssSelector: ['h1', 'article p'],
    xpath: ['/html/head/title', '/html/body//h1', '/html/body//article//p'],
  },
};

// ============================================================================
// Author (Person 类型)
// ============================================================================

/**
 * 博客 / 文章 Author (Person 类型) — GEO E-E-A-T 信号
 * 修 bug：原代码 author = Organization, 应为 Person 类型（影响 AI 信任度）
 */
export interface AuthorInfo {
  name: string;
  url: string;
  sameAs?: string[];
}

export const authorByLocale: Record<Locale, AuthorInfo> = {
  'zh-hk': {
    name: '智印云印刷專家',
    url: `${SITE_URL}/zh-hk/about/`,
    sameAs: [
      'https://www.linkedin.com/company/zprintpro',
      'https://www.instagram.com/zprintpro',
    ],
  },
  en: {
    name: 'ZprintPro Printing Experts',
    url: `${SITE_URL}/en/about/`,
    sameAs: [
      'https://www.linkedin.com/company/zprintpro',
      'https://www.instagram.com/zprintpro',
    ],
  },
  ja: {
    name: 'ZprintPro印刷専門家',
    url: `${SITE_URL}/ja/about/`,
    sameAs: [
      'https://www.linkedin.com/company/zprintpro',
      'https://www.instagram.com/zprintpro',
    ],
  },
};

/**
 * 增强版 Article Schema（Person author + speakable + inLanguage）
 * 包装 src/lib/seo.ts:1201 已有的 generateArticleSchema，
 * 强制 author 是 Person 类型而不是 Organization（E-E-A-T 关键）。
 */
export interface BlogArticleInput {
  title: string;
  description: string;
  image?: string;
  publishedAt: string;
  updatedAt?: string;
  authorName?: string;
  authorUrl?: string;
  authorSameAs?: string[];
  wordCount?: number;
  inLanguage?: string;
  url: string;
}

export function generateBlogArticleJsonLd(input: BlogArticleInput, locale: Locale): SchemaOrgData {
  const author = {
    '@type': 'Person' as const,
    name: input.authorName || authorByLocale[locale].name,
    url: input.authorUrl || authorByLocale[locale].url,
    ...(input.authorSameAs || authorByLocale[locale].sameAs
      ? { sameAs: input.authorSameAs || authorByLocale[locale].sameAs }
      : {}),
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    image: input.image || `${SITE_URL}/images/og-default.jpg`,
    datePublished: input.publishedAt,
    dateModified: input.updatedAt || input.publishedAt,
    inLanguage: input.inLanguage || (locale === 'zh-hk' ? 'zh-Hant-HK' : locale === 'ja' ? 'ja-JP' : 'en-US'),
    author,
    publisher: {
      '@type': 'Organization',
      name: locale === 'zh-hk' ? '智印云 ZprintPro' : 'ZprintPro',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.png` },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': input.url,
    },
  };
}

// ============================================================================
// Category ItemList (P0-5 修复：url + name 显式兜底，强制 SITE_URL)
// ============================================================================

import type { Product } from '@/data/products';

/**
 * 生成分类页 ItemList schema
 * 修复 P0-5：url 强制 process.env.NEXT_PUBLIC_SITE_URL || 'https://zprintpro.com'
 * 每个 ListItem 含 position / url / name（name 按 locale 选 product.name / nameEn / nameJa）
 */
export function generateCategoryItemListJsonLd(
  categoryName: string,
  productList: Product[],
  locale: Locale
): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: categoryName,
    itemListElement: productList.map((product, index) => {
      const localizedName =
        locale === 'zh-hk'
          ? product.name
          : locale === 'en'
          ? product.nameEn
          : product.nameJa;
      return {
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/${locale}/product/${product.slug}/`,
        name: localizedName,
      };
    }),
  };
}

// ============================================================================
// Core Pages Schema (2026-06-12 Phase B-P1 修复 P1-4)
// ============================================================================

/**
 * 生成 ContactPage Schema JSON-LD
 * 用途：/contact/ 页面 — R08 配合 generateLocalBusinessSchema 一起注入
 * @param locale 当前语言
 * @param url 当前页面 URL（含 locale 路径）
 * @param description 页面描述（locale 本地化）
 */
export function generateContactPageJsonLd(
  locale: Locale,
  url: string,
  description: string
): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': url,
    url,
    name: locale === 'zh-hk' ? '聯絡我們' : locale === 'ja' ? 'お問い合わせ' : 'Contact Us',
    description,
    inLanguage: locale === 'zh-hk' ? 'zh-Hant-HK' : locale === 'ja' ? 'ja-JP' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: locale === 'zh-hk' ? '智印云 ZprintPro' : 'ZprintPro',
    },
    publisher: {
      '@type': 'Organization',
      name: locale === 'zh-hk' ? '智印云 ZprintPro' : 'ZprintPro',
      url: SITE_URL,
      logo: `${SITE_URL}/logo-icon.svg`,
    },
  };
}

/**
 * 生成 AboutPage Schema JSON-LD（增强版）
 * 用途：/about/ 页面 — 补充 Phase A2 报告里 R08/R09 缺失项
 * @param locale 当前语言
 * @param url 当前页面 URL
 * @param description 页面描述
 * @param foundingDate 成立日期
 */
export function generateAboutPageJsonLd(
  locale: Locale,
  url: string,
  description: string,
  foundingDate: string = '2014'
): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': url,
    url,
    name: locale === 'zh-hk' ? '關於智印云' : locale === 'ja' ? 'ZprintProについて' : 'About ZprintPro',
    description,
    inLanguage: locale === 'zh-hk' ? 'zh-Hant-HK' : locale === 'ja' ? 'ja-JP' : 'en-US',
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: locale === 'zh-hk' ? '智印云 ZprintPro' : 'ZprintPro',
      url: SITE_URL,
      logo: `${SITE_URL}/logo-icon.svg`,
      foundingDate,
      description,
    },
  };
}

/**
 * 生成通用 WebPage Schema JSON-LD
 * 用途：/terms/、/privacy/、/help/ 等核心页面包装 (Phase A2 P1-4 修复)
 * @param locale 当前语言
 * @param url 当前页面 URL
 * @param name 页面名称
 * @param description 页面描述
 * @param pageType 子类型 (默认 'WebPage', terms/privacy 用 'PrivacyPolicy' / 'TermsOfService' 时单独传)
 */
export function generateCoreWebPageJsonLd(
  locale: Locale,
  url: string,
  name: string,
  description: string,
  pageType: 'WebPage' | 'PrivacyPolicy' | 'TermsOfService' | 'ContactPage' | 'AboutPage' | 'FAQPage' = 'WebPage'
): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': pageType,
    '@id': url,
    url,
    name,
    description,
    inLanguage: locale === 'zh-hk' ? 'zh-Hant-HK' : locale === 'ja' ? 'ja-JP' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: locale === 'zh-hk' ? '智印云 ZprintPro' : 'ZprintPro',
      url: SITE_URL,
    },
  };
}

/**
 * 生成 TermsOfService Schema (用于 /terms/ 页面)
 * 是 generateCoreWebPageJsonLd 的语义化包装，明确 type=TermsOfService
 */
export function generateTermsPageJsonLd(
  locale: Locale,
  url: string,
  description: string
): SchemaOrgData {
  return generateCoreWebPageJsonLd(
    locale,
    url,
    locale === 'zh-hk' ? '使用條款' : locale === 'ja' ? '利用規約' : 'Terms of Service',
    description,
    'TermsOfService'
  );
}

/**
 * 生成 PrivacyPolicy Schema (用于 /privacy/ 页面)
 */
export function generatePrivacyPageJsonLd(
  locale: Locale,
  url: string,
  description: string
): SchemaOrgData {
  return generateCoreWebPageJsonLd(
    locale,
    url,
    locale === 'zh-hk' ? '隱私政策' : locale === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy',
    description,
    'PrivacyPolicy'
  );
}

/**
 * 生成 HelpPage Schema (用于 /help/ 页面)
 * Phase A2 报告 help 页 overall 仅 27.9（最差之一）
 */
export function generateHelpPageJsonLd(
  locale: Locale,
  url: string,
  description: string
): SchemaOrgData {
  return generateCoreWebPageJsonLd(
    locale,
    url,
    locale === 'zh-hk' ? '幫助中心' : locale === 'ja' ? 'ヘルプセンター' : 'Help Center',
    description,
    'WebPage'
  );
}

/**
 * 生成 FAQPage Wrapper (将 FAQPage 嵌入 WebPage 容器,符合 schema.org 嵌套规范)
 * Phase A2 报告 FAQ 页 overall 34.6，需要升级到 ContactPage/AboutPage 同级 schema
 */
export function generateFaqPageWrapperJsonLd(
  locale: Locale,
  url: string,
  description: string
): SchemaOrgData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': url,
    url,
    name: locale === 'zh-hk' ? '常見問題' : locale === 'ja' ? 'よくある質問' : 'Frequently Asked Questions',
    description,
    inLanguage: locale === 'zh-hk' ? 'zh-Hant-HK' : locale === 'ja' ? 'ja-JP' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
    },
  };
}
