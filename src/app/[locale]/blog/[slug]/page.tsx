// @ts-nocheck — locale keys share same slug names, TS false positive for duplicate properties
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Locale, siteConfig, generateFaqJsonLd } from '@/lib/seo';
import {
  generateBlogArticleJsonLd,
  generateSpeakableJsonLd,
  standardSpeakableSelectors,
} from '@/lib/seo/schema-extensions';
import { JsonLd } from '@/components/JsonLd';
import { getBuyingGuideBySlug, getAllBuyingGuideSlugs } from '@/data/buying-guides';
import { getClusterBySlug, getAllClusterSlugs } from '@/data/pillar-content';
import { getBlogCover } from '@/data/blog-posts';
import { products, getProductTitle, getProductDescription, getProductBySlug } from '@/data/products';
import { convertPriceRangeString } from '@/lib/pricing';
import { getProductMainImage } from '@/lib/product-image';

// 2026-07-04 修复:博客正文从 posts 对象空 content (commit 98abbb2) 改为从 src/data/blog-data 读真实内容
import blogContentsZhHk from '@/data/blog-data/zh-hk.json';
import blogContentsEn from '@/data/blog-data/en.json';
import blogContentsJa from '@/data/blog-data/ja.json';

const blogContentsByLocale: Record<string, Record<string, { content: string }>> = {
  'zh-hk': blogContentsZhHk as Record<string, { content: string }>,
  en: blogContentsEn as Record<string, { content: string }>,
  ja: blogContentsJa as Record<string, { content: string }>,
};

function getContentFromJson(locale: string, slug: string): string {
  return blogContentsByLocale[locale]?.[slug]?.content ?? '';
}

interface BlogPostPageProps {
  params: { locale: string; slug: string };
}

const translations = {
  'zh-hk': {
    backToBlog: '← 返回印刷知識',
    hotProducts: '熱門產品',
    viewMore: '查詢更多',
    authorPrefix: '作者：',
    author: '智印雲印刷專家',
    published: '發布於',
    relatedProducts: '相關產品推薦',
  },
  'en': {
    backToBlog: '← Back to Blog',
    hotProducts: 'Hot Products',
    viewMore: 'View More',
    authorPrefix: 'By ',
    author: 'ZprintPro Printing Experts',
    published: 'Published',
    relatedProducts: 'Related Products',
  },
  'ja': {
    backToBlog: '← ブログに戻る',
    hotProducts: '人気製品',
    viewMore: '詳細を見る',
    authorPrefix: '執筆：',
    author: 'ZprintPro印刷専門家',
    published: '公開日',
    relatedProducts: '関連製品',
  },
};

// 文章封面图现统一在 src/data/blog-posts.ts (2026-06-25)
// 通过 getBlogCover(slug, locale) 解析

// Legacy posts (existing 10 articles per locale)
const posts: Record<string, Record<string, { title: string; description: string; date: string; category: string; content: string }>> = {
  'zh-hk': {
    'company-intro': {
      title: '智印雲印刷公司簡介：專業設備與一站式印刷服務',
      description: '智印雲擁有海德堡6+1印刷機、HP數碼印刷機、馬天尼膠裝線等先進設備，提供從設計到印刷到後加工的一站式服務，服務香港及大灣區客戶超過15年。',
      date: '2024-06-01', category: '公司新聞',
      content: '',
    },
    'sticker-guide': {
      title: '香港貼紙印刷完全指南：材質、工藝與應用場景详解',
      description: '深入了解香港貼紙印刷的各種材質選擇、表面處理工藝以及不同場景的應用建議。智印雲專家為您詳解防水貼紙、透明貼紙、燙金貼紙等熱門選項。',
      date: '2024-04-15', category: '貼紙知識',
      content: '',
    },
    'business-card-design': {
      title: '名片設計的10個黃金法則：打造令人難忘的專業形象',
      description: '從排版到色彩搭配，掌握名片設計的核心技巧。智印雲設計專家分享10個黃金法則，助您打造令人印象深刻的專業名片。',
      date: '2024-04-10', category: '名片知識',
      content: '',
    },
    'packaging-trends': {
      title: '2024包裝盒設計趨勢解析：讓產品在貨架上脫穎而出',
      description: '探索2024年最新包裝盒設計趨勢，從極簡主義到環保材質。智印雲為您解析如何讓產品包裝成為品牌最佳代言人。',
      date: '2024-04-05', category: '包裝知識',
      content: '',
    },
    'cmyk-guide': {
      title: 'CMYK vs RGB：印刷色彩模式完全詳解',
      description: '理解CMYK和RGB色彩模式的區別，確保您的設計在印刷時呈現最佳效果。智印雲印刷專家為您詳解色彩管理。',
      date: '2024-03-28', category: '印刷工藝',
      content: '',
    },
    'paper-materials': {
      title: '印刷紙材選擇指南：從銅版紙到特種紙',
      description: '不同紙材的特性與適用場景分析，幫助您為項目選擇最合適的印刷紙張。智印雲300+種紙材任您選擇。',
      date: '2024-03-20', category: '印刷工藝',
      content: '',
    },
    'eco-printing': {
      title: '環保印刷：企業ESG與可持續包裝的未來',
      description: '了解環保印刷材料和工藝，為地球和品牌形象雙贏做出選擇。智印雲助您實現綠色印刷目標。',
      date: '2024-03-15', category: '行業趨勢',
      content: '',
    },
    'hong-kong-printing-guide': {
      title: '香港印刷公司選擇完全指南：觀塘、九龍、新界哪裡最可靠？',
      description: '深入比較香港觀塘、九龍、新界的印刷公司，從價格、品質、交貨速度到客戶評價，幫您找到最適合的印刷合作夥伴。',
      date: '2024-05-20', category: '香港本地',
      content: '',
    },
    'design-file-specs': {
      title: '印刷文件設計規範：出血位、分辨率、色彩模式一次搞懂',
      description: '從出血位設置到色彩模式轉換，這篇指南將幫助設計師和企業避免最常見的印刷文件錯誤，確保印刷成品完美無瑕。',
      date: '2024-05-15', category: '設計技巧',
      content: '',
    },
    'brand-materials-checklist': {
      title: '企業品牌物料清單：從名片到展架的全套印刷方案',
      description: '無論是初創企業還是品牌升級，這份完整的品牌物料印刷清單將幫助您系統化地規劃所有印刷需求，確保品牌形象的一致性。',
      date: '2024-05-10', category: '品牌建設',
      content: '',
    },
    'mtr-advertising-specs': {
      title: '港鐵廣告印刷規格全解析：港島線、觀塘線、荃灣線投放指南',
      description: '詳細解析港鐵各線路廣告位的印刷規格、尺寸要求和投放策略，助您在香港最繁忙的交通網絡中精準觸達目標客戶。',
      date: '2024-05-05', category: '香港本地',
      content: '',
    },
    'flyer-printing-guide': {
      title: '香港傳單印刷完全指南：A4/A5 尺寸、紙質選擇與派發策略',
      description: '從 A4、A5 傳單尺寸到銅版紙、書紙材質，從設計要點到派發渠道，智印雲為您拆解香港傳單印刷的每個關鍵環節，助您用最低成本觸達最多客戶。',
      date: '2026-07-02', category: '印刷工藝',
      content: '',
    },
    'food-packaging-printing-guide': {
      title: '食品包裝印刷完全指南：材質、安全認證與設計實務',
      description: '食品級包裝印刷點樣揀？從牛皮紙盒到食品級淋膜，食品安全認證到設計實務，智印雲為您拆解食品包裝印刷的每個關鍵環節。',
      date: '2026-07-02', category: '包裝知識',
      content: '',
    },
    'paper-bag-printing-guide': {
      title: '香港紙袋印刷完全指南：材質、尺寸、手挽與設計趨勢',
      description: '從牛皮紙、白卡紙到禮品紙袋，從手挽、提繩到設計工藝，智印雲為您拆解香港紙袋印刷的每個關鍵環節，助您打造高質感品牌包裝。',
      date: '2026-07-02', category: '包裝知識',
      content: '',
    },
'poster-printing-guide': {
      title: '香港海報印刷完全指南：尺寸、紙質、工藝與設計要點',
      description: '從A3海報到A0大型海報，從銅版紙到PP膠片，從UV印刷到燙金工藝，智印雲為您拆解香港海報印刷的尺寸選擇、紙質對比、表面處理與設計要點，助您打造視覺衝擊力最強的品牌形象宣傳品。',
      date: '2026-07-02', category: '印刷知識',
      content: '',
    },'company-intro': { title: 'About ZprintPro: Professional Equipment & One-Stop Printing Services', description: 'ZprintPro features Heidelberg 6+1 printing presses, HP digital printers, and Martini perfect binding lines for full-service printing solutions.', date: '2024-06-01', category: 'Company News', content: '' },
    'sticker-guide': { title: 'Complete Sticker Printing Guide: Materials, Finishes & Applications', description: 'Deep dive into sticker material choices, surface treatments, and application scenarios.', date: '2024-04-15', category: 'Sticker Guide', content: '' },
    'business-card-design': { title: '10 Golden Rules for Business Card Design', description: 'Master the core techniques of business card design.', date: '2024-04-10', category: 'Card Guide', content: '' },
    'packaging-trends': { title: '2024 Packaging Design Trends Analysis', description: 'Explore latest packaging design trends.', date: '2024-04-05', category: 'Packaging Guide', content: '' },
    'cmyk-guide': { title: 'CMYK vs RGB: Complete Guide to Print Color Modes', description: 'Understand color modes for optimal print results.', date: '2024-03-28', category: 'Printing Techniques', content: '' },
    'paper-materials': { title: 'Paper Selection Guide: From Art Paper to Specialty Stock', description: 'Analysis of different paper characteristics.', date: '2024-03-20', category: 'Printing Techniques', content: '' },
    'eco-printing': { title: 'Eco-Friendly Printing: The Future of Sustainable Packaging', description: 'Learn about eco-friendly printing materials.', date: '2024-03-15', category: 'Industry Trends', content: '' },
    'hong-kong-printing-guide': { title: 'Hong Kong Printing Company Guide: Kwun Tong, Kowloon & NT', description: 'Compare printing companies across Hong Kong from pricing to quality to find your ideal partner.', date: '2024-05-20', category: 'Hong Kong Local', content: '' },
    'design-file-specs': { title: 'Print File Design Specifications: Bleed, Resolution & Color Modes', description: 'Master bleed settings, resolution requirements, and color mode conversions for perfect prints.', date: '2024-05-15', category: 'Design Tips', content: '' },
    'brand-materials-checklist': { title: 'Corporate Brand Materials Checklist: From Cards to Displays', description: 'A complete checklist of printed brand materials for startups and brand refreshes.', date: '2024-05-10', category: 'Branding', content: '' },
    'mtr-advertising-specs': { title: 'MTR Advertising Print Specs: Island, Kwun Tong & Tsuen Wan Lines', description: 'Detailed specifications and strategies for MTR advertising across Hong Kong.', date: '2024-05-05', category: 'Hong Kong Local', content: '' },
    'flyer-printing-guide': {
      title: 'Flyer Printing Guide: Sizes, Paper, Design & Distribution in Hong Kong',
      description: 'From A4 to A5, bi-fold to tri-fold, art paper to book paper — a complete guide to flyer printing in Hong Kong.',
      date: '2026-07-02', category: 'Printing Guide',
      content: '',
    },
    'food-packaging-printing-guide': {
      title: 'Food Packaging Printing Guide: Materials, Safety & Compliance',
      description: 'Food-grade packaging printing essentials — from kraft boxes to food-safe lamination, certifications to design best practices.',
      date: '2026-07-02', category: 'Packaging Guide',
      content: '',
    },
    'paper-bag-printing-guide': {
      title: 'Paper Bag Printing Guide: Materials, Sizes, Handles & 2026 Trends',
      description: 'Kraft bags, white card bags, gift bags, eco bags — a complete guide to paper bag printing for Hong Kong boutiques, cafés, and retail brands.',
      date: '2026-07-02', category: 'Packaging Guide',
      content: '',
    },
    'poster-printing-guide': {
      title: 'Poster Printing Guide: Sizes, Paper, Finishes & Design Tips in Hong Kong',
      description: 'From A3 to A0 posters, art paper to PP film, UV printing to foil stamping — ZprintPro breaks down poster printing sizes, paper choices, finishing options, and design tips for maximum visual impact.',
      date: '2026-07-02', category: 'Printing Guide',
      content: '',
    },

    // 2026-07-04 純文字深度博客: 餐廳開業傳單 (Tier A × P0 flyers) — 純文字・無圖
    'restaurant-opening-flyer-printing-guide': {
      title: '餐廳開業傳單印刷完全攻略 · 2026 香港餐飲開業旺季 | 智印雲 ZprintPro',
      description: '2026 年香港餐飲開業旺季,一張高質素傳單決定客人是否記得你的店。智印雲為香港餐廳老闆提供 50-200 張小批量到 5,000 張大批量傳單印刷,3 個工作天交期,DHL 全球 2-4 天到貨。',
      date: '2026-07-04', category: 'Restaurant Flyer',
      content: '',
    },

  },
  ja: {
    'company-intro': { title: 'ZprintPro会社概要：専門設備とワンストップ印刷サービス', description: 'ZprintProはハイデルベルグ6+1印刷機、HPデジタル印刷機、マルティニ製本ラインなどの先進設備を保有し、ワンストップ印刷サービスを提供しています。', date: '2024-06-01', category: '会社ニュース', content: '' },
    'sticker-guide': { title: 'ステッカー印刷完全ガイド：材質、加工と応用場面', description: 'ステッカーの材質選び、表面加工、応用場面について深く理解しましょう。', date: '2024-04-15', category: 'ステッカー知識', content: '' },
    'business-card-design': { title: '名刺デザインの10の黄金法則', description: 'レイアウトから配色まで、名刺デザインの核心技術をマスターしましょう。', date: '2024-04-10', category: '名刺知識', content: '' },
    'packaging-trends': { title: '2024年パッケージデザイントレンド解析', description: '最新のパッケージデザイントレンドを探ります。', date: '2024-04-05', category: '包装知識', content: '' },
    'cmyk-guide': { title: 'CMYK vs RGB：印刷カラーモード完全解説', description: 'CMYKとRGBの違いを理解し、最適な印刷結果を得ましょう。', date: '2024-03-28', category: '印刷技術', content: '' },
    'paper-materials': { title: '印刷用紙選択ガイド：アート紙から特殊紙まで', description: '異なる紙の特性を分析し、最適な用紙を選びましょう。', date: '2024-03-20', category: '印刷技術', content: '' },
    'eco-printing': { title: 'エコ印刷：持続可能な包装の未来', description: '地球とブランドの両方のために、エコ印刷について学びましょう。', date: '2024-03-15', category: '業界トレンド', content: '' },
    'hong-kong-printing-guide': { title: '香港印刷会社選び完全ガイド', description: '香港の観塘、九龍、新界の印刷会社を比較し、最適なパートナーを選びましょう。', date: '2024-05-20', category: '香港ローカル', content: '' },
    'design-file-specs': { title: '印刷用デザインファイル仕様', description: '裁ち落とし、解像度、カラーモードについて学びましょう。', date: '2024-05-15', category: 'デザインチップ', content: '' },
    'brand-materials-checklist': { title: '企業ブランド物料チェックリスト', description: '名刺から展示物まで、ブランド構築に必要な印刷物料を確認しましょう。', date: '2024-05-10', category: 'ブランディング', content: '' },
    'mtr-advertising-specs': { title: 'MTR広告印刷仕様', description: '港島線、観塘線、荃湾線の広告印刷規格について解説します。', date: '2024-05-05', category: '香港ローカル', content: '' },
    'flyer-printing-guide': {
      title: '香港チラシ印刷完全ガイド：サイズ、用紙、設計、配布戦略',
      description: 'A4・A5、二つ折り・三つ折り、コート紙・書籍用紙まで、香港でのチラシ印刷を徹底解説。', date: '2026-07-02', category: '印刷知識',
      content: '',
    },
    'food-packaging-printing-guide': {
      title: '食品パッケージ印刷完全ガイド：素材、安全認証、設計',
      description: '食品グレード包装印刷の全て — クラフト箱から食品対応ラミネート、認証、設計のベストプラクティスまで徹底解説。',
      date: '2026-07-02', category: '包装知識',
      content: '',
    },
    'paper-bag-printing-guide': {
      title: '香港紙袋印刷完全ガイド：素材、サイズ、持ち手と2026年トレンド',
      description: 'クラフト紙袋、白カード紙袋、ギフト紙袋、エコバッグまで、香港の boutique・カフェ・小売向けに紙袋印刷を徹底解説。',
      date: '2026-07-02', category: '包装知識',
      content: '',
    },
    'poster-printing-guide': {
      title: '香港ポスター印刷完全ガイド：サイズ、用紙、加工、デザインのポイント',
      description: 'A3からA0まで、アート紙からPPフィルムまで、UV印刷から箔押しまで—ZprintProがポスタープリントのサイズ、素材、表面加工、デザインのポイントを徹底解説。',
      date: '2026-07-02', category: '印刷知識',
      content: '',
    },

    // 2026-07-04 純文字深度ブログ: レストラン開業チラシ (Tier A × P0 flyers) — 純文字・無図
    'restaurant-opening-flyer-printing-guide': {
      title: 'レストラン開業チラシ印刷ガイド：サイズ・用紙・デザインの徹底解説 | ZprintPro',
      description: '飲食店開業を応援。高品質チラシが walk-in 顧客の記憶に残るかどうかを決める。50-200枚小ロットから5,000枚大量注文まで、3営業日納品、アジア工場からDHL 2-4日全世界配送。',
      date: '2026-07-04', category: '飲食チラシ',
      content: '',
    },

  }
};

// 2026-07-05 修：补 packaging-box-custom-guide（之前 src/data/blog-data 已加 content，但 articleSlugs 缺位导致 generateStaticParams 不生成该 slug → Post not found）
const articleSlugs = ['company-intro', 'hong-kong-printing-guide', 'design-file-specs', 'brand-materials-checklist', 'mtr-advertising-specs', 'sticker-guide', 'business-card-design', 'packaging-trends', 'cmyk-guide', 'paper-materials', 'eco-printing', 'flyer-printing-guide', 'food-packaging-printing-guide', 'paper-bag-printing-guide', 'poster-printing-guide', 'restaurant-opening-flyer-printing-guide', 'packaging-box-custom-guide'];
const guideSlugs = getAllBuyingGuideSlugs();
const clusterSlugs = getAllClusterSlugs();
const allSlugs = [...articleSlugs, ...guideSlugs, ...clusterSlugs];

function getPostData(locale: Locale, slug: string) {
  const legacyPost = posts[locale]?.[slug];
  // 2026-07-04 修复：content 改为从 src/data/blog-data JSON 读
  // 改写：legacyPost 不存在时也走 JSON fallback（en block 缺失时也救场）
  const jsonEntry = blogContentsByLocale[locale]?.[slug];
  if (legacyPost || jsonEntry) {
    let content = getContentFromJson(locale, slug);
    // Fallback: legacy inline content (用于过渡期)
    if (!content && legacyPost) content = legacyPost.content || '';
    // Apply content transformations
    content = content.replace(/href="\/product\//g, `href="/${locale}/product/`);
    content = content.replace(/href="\/(en|ja)\/product\//g, `href="/${locale}/product/`);
    content = content.replace(/href="\/category\//g, `href="/${locale}/category/`);
    content = content.replace(/href="\/(en|ja)\/category\//g, `href="/${locale}/category/`);

    // legacy 优先提供 title/desc/date/category；legacy 缺失则从 JSON 借
    const src = legacyPost || jsonEntry;
    return {
      title: src.title || (jsonEntry && jsonEntry.content ? slug : ''),
      description: src.description || '',
      date: src.date || '2024-01-01',
      category: src.category || '',
      content,
      keywords: '',
      isBuyingGuide: false,
      linkedProducts: [] as string[],
    };
  }
  const guide = getBuyingGuideBySlug(slug);
  if (guide) {
    return {
      title: guide.title[locale],
      description: guide.description[locale],
      date: guide.date,
      category: guide.category[locale],
      content: guide.content[locale],
      keywords: guide.keywords[locale],
      isBuyingGuide: true,
      linkedProducts: guide.relatedProducts || [],
    };
  }
  const cluster = getClusterBySlug(slug);
  if (cluster) {
    const content = cluster.content[locale].replace(/\/{locale}\//g, `/${locale}/`);
    return {
      title: cluster.title[locale],
      description: cluster.description[locale],
      date: cluster.date,
      category: cluster.pillarSlug,
      content,
      keywords: cluster.keywords[locale].join(','),
      isBuyingGuide: false,
      linkedProducts: cluster.linkedProducts || [],
    };
  }
  return null;
}

function getOgLocale(locale: Locale): string {
  return locale === 'zh-hk' ? 'zh_HK' : locale === 'ja' ? 'ja_JP' : 'en_US';
}

function extractFaqFromHtml(html: string): { question: string; answer: string }[] | null {
  const faqs: { question: string; answer: string }[] = [];
  const regex = /<p><strong>Q:\s*([\s\S]*?)<\/strong>\s*(?:<br\s*\/?>)\s*A:\s*([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const question = match[1].replace(/<[^>]+>/g, '').trim();
    const answer = match[2].replace(/<[^>]+>/g, '').trim();
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }
  return faqs.length > 0 ? faqs : null;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  ['zh-hk', 'en', 'ja'].forEach((locale) => {
    allSlugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  const post = getPostData(locale, params.slug);
  const langPrefix = `${locale}/`;
  const canonical = `${siteConfig.url}/${langPrefix}blog/${params.slug}/`;

  return {
    title: post?.title || 'Blog Post',
    description: post?.description || '',
    keywords: post?.keywords,
    openGraph: {
      title: post?.title || 'Blog Post',
      description: post?.description || '',
      url: canonical,
      siteName: siteConfig.name,
      locale: getOgLocale(locale),
      type: 'article',
      publishedTime: post?.date,
      modifiedTime: post?.date,
      section: post?.category,
      authors: [`https://zprintpro.com/${locale}/about/`],
      tags: post?.keywords ? post.keywords.split(',') : undefined,
      images: [
        {
          url: `${siteConfig.url}/images/articles/${params.slug}.jpg`,
          width: 1200,
          height: 630,
          alt: post?.title || 'Blog Post',
        },
      ],
    },
    alternates: {
      canonical,
      languages: {
        'zh-HK': `${siteConfig.url}/zh-hk/blog/${params.slug}/`,
        'en': `${siteConfig.url}/en/blog/${params.slug}/`,
        'ja': `${siteConfig.url}/ja/blog/${params.slug}/`,
        'x-default': `${siteConfig.url}/zh-hk/blog/${params.slug}/`,
      },
  }
};
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const locale = params.locale as Locale;
  const t = translations[locale];
  const localePrefix = `/${locale}`;
  const post = getPostData(locale, params.slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-[1320px] mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-[#333333]">Post not found</h1>
        </div>
      </main>
    );
  }

  const langPrefix = `${locale}/`;
  const canonical = `${siteConfig.url}/${langPrefix}blog/${params.slug}/`;
  const postImage = getBlogCover(params.slug, locale);

  // 2026-06-10 Phase B 修复 P0-3：使用 generateBlogArticleJsonLd（author = Person 类型，E-E-A-T 关键）
  // 旧实现：author = Organization 类型 → AI 抓取时无作者归属，信任度低。
  // 2026-07-04 修订：纯文字博客无封面时,image 字段省略(schema-extensions.ts 内部 fallback 到 og-default.jpg)
  const articleJsonLd = generateBlogArticleJsonLd(
    {
      title: post.title,
      description: post.description,
      image: postImage ? `${siteConfig.url}${postImage}` : undefined,
      publishedAt: post.date,
      updatedAt: post.date,
      url: canonical,
    },
    locale
  );

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'zh-hk' ? '首頁' : locale === 'en' ? 'Home' : 'ホーム',
        item: `${siteConfig.url}/${locale}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'zh-hk' ? '印刷知識' : locale === 'en' ? 'Blog' : 'ブログ',
        item: `${siteConfig.url}/${langPrefix}blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: canonical,
      },
    ],
  };

  // 2026-06-10 Phase B 修复 P0-3：Speakable 注入（语音 / AI 抓取）
  const speakableJsonLd = generateSpeakableJsonLd(
    standardSpeakableSelectors.blog.xpath,
    standardSpeakableSelectors.blog.cssSelector
  );

  const faqs = extractFaqFromHtml(post.content);
  const faqJsonLd = faqs ? generateFaqJsonLd(faqs) : null;

  // Hot products for sidebar
  const hotProducts = products
    .filter((p) => p.isHot)
    .sort((a, b) => b.weight_score - a.weight_score)
    .slice(0, 4);

  const linkedProductSlugs = post.linkedProducts?.slice(0, 4) || [];
  const linkedProducts = linkedProductSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={speakableJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={`${localePrefix}/blog/`} className="text-[#2873F5] hover:underline text-sm mb-6 inline-block">
          {t.backToBlog}
        </Link>

        <div className="flex gap-8 items-start">
          {/* Left: Article Content */}
          <article className="flex-1 bg-white rounded-xl border border-gray-100 overflow-hidden">
            {/* Hero Image - 仅当 postImage 非空时渲染 (2026-07-04 纯文字博客支持) */}
            {postImage && (
              <div className="aspect-[21/9] relative overflow-hidden bg-gray-100">
                <Image
                  src={postImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                />
              </div>
            )}

            <div className="p-8">
              <span className="text-xs font-medium text-[#F87314] bg-orange-50 px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <h1 className="mt-4 text-2xl md:text-3xl font-bold text-[#333333]">{post.title}</h1>
              <div className="mt-3 flex items-center gap-3 text-sm text-gray-400">
                <span>{t.published} {post.date}</span>
                <span>·</span>
                <span className="text-[#2873F5]">
                  {t.authorPrefix}{t.author}
                </span>
              </div>
              <div
                className="mt-6 prose prose-blue max-w-none text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* 相關產品推薦 */}
              {linkedProducts.length > 0 && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <h3 className="text-lg font-bold text-[#333333] mb-4">{t.relatedProducts}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {linkedProducts.map((product) => (
                      <a
                        key={product.slug}
                        href={`${localePrefix}/product/${product.slug}/`}
                        className="group bg-gray-50 rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="aspect-square bg-white relative overflow-hidden">
                          <img
                            src={getProductMainImage(product, locale)}
                            alt={getProductTitle(product, locale)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="text-sm font-bold text-[#333333] line-clamp-2 group-hover:text-[#2873F5] transition-colors">
                            {getProductTitle(product, locale)}
                          </h4>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Right: Hot Products Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
              <h3 className="text-lg font-bold text-[#333333] mb-5 pb-3 border-b border-gray-100">
                {t.hotProducts}
              </h3>
              <div className="space-y-5">
                {hotProducts.map((product) => (
                  <Link
                    key={product.sku_code}
                    href={`${localePrefix}/product/${product.slug}/`}
                    className="group block"
                  >
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-50 mb-3">
                      <Image
                        src={getProductMainImage(product, locale)}
                        alt={getProductTitle(product, locale)}
                        width={300}
                        height={225}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        unoptimized
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <h4 className="text-sm font-semibold text-[#333333] group-hover:text-[#2873F5] transition-colors line-clamp-2">
                      {getProductTitle(product, locale)}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {getProductDescription(product, locale).slice(0, 50)}...
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-[#F87314] font-bold">
                        {convertPriceRangeString(product.price_range, locale, product.category_slug, product.slug).split('-')[0]}
                      </span>
                      <span className="text-xs px-3 py-1 border border-[#2873F5] text-[#2873F5] rounded-full group-hover:bg-[#2873F5] group-hover:text-white transition-colors">
                        {t.viewMore}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
