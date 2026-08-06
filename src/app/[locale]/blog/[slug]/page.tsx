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
import { getBlogCover, getBlogPostMetaBySlug } from '@/data/blog-posts';
import { products, getProductTitle, getProductDescription, getProductDisplayTitle, getProductBySlug } from '@/data/products';
import { getTopSkuByCategory, getRelatedByCategory, inferBlogCategory } from '@/lib/popularity';
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
    author: '智印港印刷專家',
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
      title: '智印港印刷公司簡介：專業設備與一站式印刷服務',
      description: '智印港擁有海德堡6+1印刷機、HP數碼印刷機、馬天尼膠裝線等先進設備，提供從設計到印刷到後加工的一站式服務，服務香港及大灣區客戶超過15年。',
      date: '2024-06-01', category: '公司新聞',
      content: '',
    },
    'sticker-guide': {
      title: '香港貼紙印刷完全指南：材質、工藝與應用場景详解',
      description: '深入了解香港貼紙印刷的各種材質選擇、表面處理工藝以及不同場景的應用建議。智印港專家為您詳解防水貼紙、透明貼紙、燙金貼紙等熱門選項。',
      date: '2024-04-15', category: '貼紙知識',
      content: '',
    },
    'business-card-design': {
      title: '貼紙設計的10個黃金法則：打造令人難忘的品牌形象',
      description: '從排版到色彩搭配，掌握貼紙設計的核心技巧。智印港設計專家分享10個黃金法則，助您打造令人印象深刻的品牌貼紙。',
      date: '2024-04-10', category: '貼紙知識',
      content: '',
    },
    'packaging-trends': {
      title: '2024包裝盒設計趨勢解析：讓產品在貨架上脫穎而出',
      description: '探索2024年最新包裝盒設計趨勢，從極簡主義到環保材質。智印港為您解析如何讓產品包裝成為品牌最佳代言人。',
      date: '2024-04-05', category: '包裝知識',
      content: '',
    },
    'cmyk-guide': {
      title: 'CMYK vs RGB：印刷色彩模式完全詳解',
      description: '理解CMYK和RGB色彩模式的區別，確保您的設計在印刷時呈現最佳效果。智印港印刷專家為您詳解色彩管理。',
      date: '2024-03-28', category: '印刷工藝',
      content: '',
    },
    'paper-materials': {
      title: '印刷紙材選擇指南：從銅版紙到特種紙',
      description: '不同紙材的特性與適用場景分析，幫助您為項目選擇最合適的印刷紙張。智印港300+種紙材任您選擇。',
      date: '2024-03-20', category: '印刷工藝',
      content: '',
    },
    'eco-printing': {
      title: '環保印刷：企業ESG與可持續包裝的未來',
      description: '了解環保印刷材料和工藝，為地球和品牌形象雙贏做出選擇。智印港助您實現綠色印刷目標。',
      date: '2024-03-15', category: '行業趨勢',
      content: '',
    },
    'hong-kong-printing-guide': { title: 'Custom Sticker & Packaging Printing Guide for US Small Business | MOQ, Materials, FedEx Ground 5-7 Day', description: 'Complete guide to custom stickers, packaging boxes, and labels for US small business. Compare vinyl/PVC/Kraft/clear materials, 50-1000 MOQ, Free shipping over $99, FedEx Ground 5-7 day or DHL Express 2-4 day, ISO 9001 certified factory-direct pricing.', date: '2024-05-20', category: 'Printing Guide', content: '' },
    'design-file-specs': {
      title: '印刷文件設計規範：出血位、分辨率、色彩模式一次搞懂',
      description: '從出血位設置到色彩模式轉換，這篇指南將幫助設計師和企業避免最常見的印刷文件錯誤，確保印刷成品完美無瑕。',
      date: '2024-05-15', category: '設計技巧',
      content: '',
    },
    'brand-materials-checklist': {
      title: '企業品牌物料清單：從貼紙到展架的全套印刷方案',
      description: '無論是初創企業還是品牌升級，這份完整的品牌物料印刷清單將幫助您系統化地規劃所有印刷需求，確保品牌形象的一致性。',
      date: '2024-05-10', category: '品牌建設',
      content: '',
    },
    'mtr-advertising-specs': { title: 'Event Poster & Trade Show Print Specs for US B2B | Sizes, Paper, Finishes, FedEx 2-Day', description: 'Event poster and trade show print specs for US B2B and conference organizers. Standard sizes (A3/A2/A1/A0/24x36"), paper (gloss/matte/PP/canvas), finishing (lamination/hole/grommet), bulk 50-1000 runs, FedEx 2-Day or DHL Express 2-4 day from Asia factory.', date: '2024-05-05', category: 'Printing Guide', content: '' },
    'flyer-printing-guide': { title: 'Custom Flyer Printing Guide for US Small Business: Sizes, Paper, Design | Free Shipping $99+', description: 'Custom flyer printing guide for US small business. Standard sizes (4x6 / 5x7 / 8.5x11 / A4), paper (glossy/matte/recycled/silk), finishing (UV coating/lamination/folding), 25-5000 MOQ, Free shipping over $99 USA, 3-5 day turnaround from Asia factory.', date: '2026-07-02', category: 'Printing Guide', content: '' },
    'food-packaging-printing-guide': {
      title: '食品包裝印刷完全指南：材質、安全認證與設計實務',
      description: '食品級包裝印刷點樣揀？從牛皮紙盒到食品級淋膜，食品安全認證到設計實務，智印港為您拆解食品包裝印刷的每個關鍵環節。',
      date: '2026-07-02', category: '包裝知識',
      content: '',
    },
    'paper-bag-printing-guide': {
      title: '香港紙袋印刷完全指南：材質、尺寸、手挽與設計趨勢',
      description: '從牛皮紙、白卡紙到禮品紙袋，從手挽、提繩到設計工藝，智印港為您拆解香港紙袋印刷的每個關鍵環節，助您打造高質感品牌包裝。',
      date: '2026-07-02', category: '包裝知識',
      content: '',
    },
    'poster-printing-guide': { title: 'Custom Poster Printing Guide for US Events & Retail: Sizes, Paper, Finishes | Free Shipping', description: 'Custom poster printing guide for US event organizers and retail. Standard sizes (A3/A2/A1/A0/18x24"/24x36"), paper (gloss/matte/PP film/canvas), finishing (UV/lamination/edge tape), 25-1000 MOQ, Free shipping over $99 USA, 3-5 day turnaround from Asia factory.', date: '2026-07-02', category: 'Printing Guide', content: '' },
    'sticker-guide': { title: 'Complete Sticker Printing Guide: Materials, Finishes & Applications', description: 'Deep dive into sticker material choices, surface treatments, and application scenarios.', date: '2024-04-15', category: 'Sticker Guide', content: '' },
    'business-card-design': { title: '10 Golden Rules for Sticker Design', description: 'Master the core techniques of sticker design.', date: '2024-04-10', category: 'Sticker Guide', content: '' },
    'packaging-trends': { title: '2024 Packaging Design Trends Analysis', description: 'Explore latest packaging design trends.', date: '2024-04-05', category: 'Packaging Guide', content: '' },
    'cmyk-guide': { title: 'CMYK vs RGB: Complete Guide to Print Color Modes', description: 'Understand color modes for optimal print results.', date: '2024-03-28', category: 'Printing Techniques', content: '' },
    'paper-materials': { title: 'Paper Selection Guide: From Art Paper to Specialty Stock', description: 'Analysis of different paper characteristics.', date: '2024-03-20', category: 'Printing Techniques', content: '' },
    'eco-printing': { title: 'Eco-Friendly Printing: The Future of Sustainable Packaging', description: 'Learn about eco-friendly printing materials.', date: '2024-03-15', category: 'Industry Trends', content: '' },
    'hong-kong-printing-guide': { title: 'Hong Kong Printing Company Guide: HK Island, Kowloon & NT', description: 'Compare printing companies across Hong Kong from pricing to quality to find your ideal partner.', date: '2024-05-20', category: 'Hong Kong Local', content: '' },
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

    // 2026-07-04 純文字深度博客: Restaurant Opening Flyer (Tier A × P0 flyers) — 純文字・無圖
    // 2026-07-05 fix (NAP vs SEO 内容脱钩): zh-hk 用户市场 = 香港 (保留 HK 视角);
    // en/ja 用户市场 = US/UK/AU/JP, 标题硬塞"Shenzhen Printing" = 机械翻译, 无认同感.
    // a38dc93 之前判断"en/ja 保留深圳 supplier origin"是错的——supplier origin 应在正文 (DHL/全球配送) 提及.
    // 改为全球通用卖点 (size/paper/design turnaround) — 与 §13.10 本地化铁律一致.
    'restaurant-opening-flyer-printing-guide': {
      title: 'Restaurant Opening Flyer Printing Guide: Sizes, Paper & Design Tips | ZprintPro',
      description: 'Opening a new restaurant? A premium flyer decides whether walk-in customers remember your shop. From 50-200 small batches to 5,000 bulk prints, 3-day turnaround, DHL 2-4 day global delivery from Asia factory.',
      date: '2026-07-04', category: 'Restaurant Flyer',
      content: '',
    },

    // 2026-07-06 v4 純文字深度ブログ: ペットフードステッカー (Tier A × P0 stickers) — 純文字・無図
    'pet-food-sticker-printing-guide': {
      title: 'Pet Food Sticker Printing Guide: Waterproof, Food-Safe Labels | ZprintPro',
      description: 'Pet food and pet care brand owners — waterproof and oil-resistant, FDA-compliant label materials. 1,000 to 100,000-piece runs, 5-7 working day delivery from Asia factory.',
      date: '2026-07-06', category: 'Pet Stickers',
      content: '',
    },

    // 2026-07-06 v4 純文字深度ブログ: アパレルショッピングバッグ (Tier A × P0 paper-bags) — 純文字・無図
    'apparel-shopping-bag-printing-guide': {
      title: 'Apparel Shopping Bag Printing Guide: Materials, Sizes & Logo Tips | ZprintPro',
      description: 'Apparel and fashion brand owners — kraft, white card, handle materials compared. 500-piece small batches to 100,000 bulk, 5-10 working day delivery from Asia factory.',
      date: '2026-07-06', category: 'Apparel Bags',
      content: '',
    },

    // 2026-07-06 v4 純文字深度ブログ: 越境EC配送箱 (Tier A × P0 packaging) — 純文字・無図
    'cross-border-ecommerce-shipping-box-guide': {
      title: 'Cross-Border E-commerce Shipping Box Guide: DHL 2-4 Day Delivery | ZprintPro',
      description: 'Shopify, Amazon FBA and DTC brand owners — durable 3-ply corrugated, DHL/FedEx compatible, small to bulk runs, 3-7 working day delivery from Asia factory, FSC-certified materials.',
      date: '2026-07-06', category: 'Cross-Border E-commerce',
      content: '',
    },

    // 2026-07-07 v4 純文字深度ブログ: Cosmetics Packaging Box (Tier A × P0 packaging) — 純文字・無図
    // Q-002 deployed today, completing P0 100%
    'cosmetics-packaging-box-printing-guide': {
      title: 'Custom Cosmetics Packaging Box Guide: Materials, Structure & Branding | ZprintPro',
      description: 'Skincare, serum, mask and perfume brand owners — premium custom packaging box decides the 3-second shelf purchase. Lid-base, book-style, magnetic boxes, 50-10,000 piece runs, 5-10 working day delivery from Asia factory.',
      date: '2026-07-07', category: 'Cosmetics Packaging',
      content: '',
    },

    // 2026-07-07 v4 純文字深度ブログ: Tea & Beverage Gift Box (Tier A × P0 packaging) — 純文字・無図
    'tea-beverage-gift-box-printing-guide': {
      title: 'Tea & Beverage Gift Box Printing Guide: Loose Leaf, Bubble Tea & E-commerce | ZprintPro',
      description: 'Bubble tea, loose-leaf tea e-commerce, and Chinese tea gift box brand owners — premium tea gift box drives repeat purchase. FDA-certified food-grade inner liner, 100-50,000 piece runs, 5-10 working day delivery from Asia factory.',
      date: '2026-07-07', category: 'Tea Gift Box',
      content: '',
    },

    // 2026-07-07 v4 純文字深度ブログ: Wedding Favor Bag (Tier A × P0 paper-bags) — 純文字・無図
    'wedding-favor-bag-printing-guide': {
      title: 'Wedding Favor Bag & Invitation Printing Guide 2026: Materials & Personalization | ZprintPro',
      description: 'Engaged couples, wedding planners, and venues — premium wedding favor bags and invitations set the first impression for guests. Satin ribbon handles, foil stamping, personalized names, 100-3,000 small-batch orders, 5-10 working day delivery from Asia factory.',
      date: '2026-07-07', category: 'Wedding Favor Bag',
      content: '',
    },

    // 2026-07-08 v4 純文字深度ブログ: Retail Poster (P1 unlock × 零售精品) — 純文字・無図
    'retail-shop-poster-printing-guide': {
      title: 'Retail Shop Poster Printing Guide 2026: Sizes, Paper & Display Tips | ZprintPro',
      description: 'Boutique, brand pop-up store, and mall retail owners — premium in-store posters decide customer dwell time and conversion. ZprintPro supplies 10-1,000 piece runs, A3/A2/A1/A0 full sizes, waterproof PP film, 3-5 working day delivery from Asia factory.',
      date: '2026-07-08', category: 'Retail Poster',
      content: '',
    },

    // 2026-07-08 v4 純文字深度ブログ: Restaurant Menu (P1 unlock × 餐飲外賣) — 純文字・無図
    'restaurant-menu-printing-guide': {
      title: 'Restaurant Menu Printing Guide 2026: Waterproof, Fold & Material Tips | ZprintPro',
      description: 'Restaurant, cafe, dessert shop, and banquet owners — premium menu is the last gate before order and brand identity. ZprintPro supplies 50-5,000 piece runs, waterproof PP lamination, hardcover, disposable menus, 5-7 working day delivery from Asia factory.',
      date: '2026-07-08', category: 'Restaurant Menu',
      content: '',
    },

    // 2026-07-08 v4 純文字深度ブログ: Wedding Red Packet (P1 unlock × 婚慶) — 純文字・無図
    'wedding-red-packet-printing-guide': {
      title: 'Wedding Red Packet Printing Guide 2026: Materials, Personalization & Bulk | ZprintPro',
      description: 'Engaged couples, wedding planners, and venues — premium wedding red packets set the first impression for guests. ZprintPro supplies 100-10,000 piece custom orders with foil-stamped couple names, personalized blessings, 5-10 working day delivery from Asia factory.',
      date: '2026-07-08', category: 'Wedding Red Packet',
      content: '',
    },

    // 2026-07-14 v4 daily-content-evolve: 3 blogs P0/P0/P1 (en locale)
    'baby-product-label-sticker-printing-guide': {
      title: "Baby Product Sticker Printing Guide: FDA Food-Safe Labels for US Infant Brands | ZprintPro",
      description: "US infant formula, baby food, baby skincare, and maternal nutrition brand owners: an FDA-compliant, BPA-free, freezer-safe label decides whether your product passes Whole Foods / Target / BuyBuy Baby shelf review and wins mom-trust on Instagram. ZprintPro prints 500 to 100,000-piece runs, 5-7 business day production, with free design mockup and Free Shipping over $99 to US ZIP codes.",
      date: '2026-07-14', category: 'Baby Stickers',
      content: '',
    },
    'ecommerce-shipping-bag-printing-guide': {
      title: "E-commerce Shipping Bag Printing Guide: Tamper-Evident & Waterproof Mailers for US Brands | ZprintPro",
      description: "US Amazon FBA, Shopify, Etsy, and 3PL warehouse brand owners: a premium printed shipping bag with tamper-evident seal, tracking barcode, and return label decides unboxing experience and return rate. ZprintPro prints 1,000-200,000 piece runs with waterproof kraft, custom brand printing, peel-and-stick adhesive, and Free Shipping over $99 to US ZIP codes.",
      date: '2026-07-14', category: 'Shipping Mailer',
      content: '',
    },
    'media-merchandise-box-printing-guide': {
      title: "Media Franchise Collector Box Printing Guide: Limited Edition, Pre-Order & Convention-Exclusive Boxes for US Fans | ZprintPro",
      description: "US entertainment IP studios, anime brands, Comic-Con exhibitors, and limited-edition collectible companies: a premium IP merchandise box decides fan loyalty, secondary share rate, and aftermarket premium. ZprintPro prints drawer-style boxes, magnetic closure boxes, limited-edition numbering, UV spot + foil logo for the global media franchise market. 100-10,000 piece runs, 7-15 business day production.",
      date: '2026-07-14', category: 'Media Merchandise',
      content: '',
    },
    // 2026-07-15 daily-content-evolve: Q-017/018/019 new blogs
    'thick-paper-flyer-printing-restaurant-takeout-guide': { title: "Thick Paper Flyer Printing Guide - Restaurant Menu Inserts & Takeout for US Food Service | ZprintPro", description: "US restaurant chains, ghost kitchens, and QSR owners: a 250gsm thick paper flyer with logo + weekly special + QR code is the cheapest repeat-customer driver. ZprintPro supplies 200gsm to 400gsm full-range stocks, 100-piece test runs to 200,000-piece chain rollouts.", date: '2026-07-15', category: 'Thick Paper Flyer', content: '' },
    'magnetic-closure-gift-box-ecommerce-brand-guide': { title: "Magnetic Closure Gift Box Guide - Cross-Border E-commerce Premium Packaging for US DTC Brands | ZprintPro", description: "US Shopify, Amazon FBA, Etsy, Kickstarter, subscription box DTC brands: magnetic closure box with crisp snap + foil logo is the fastest premium differentiator. ZprintPro supplies 100-piece trials to 50,000-piece rollouts.", date: '2026-07-15', category: 'Magnetic Gift Box', content: '' },
    'folding-box-cosmetics-brand-eco-friendly-guide': { title: "Folding Box Printing Guide - Eco-Friendly Cosmetics Brand Packaging for US Skincare & Beauty | ZprintPro", description: "US skincare, serum, sheet mask, lipstick, makeup brands: 5 eco-friendly folding box materials. FSC certified + soy ink + recyclable mark. 500-piece from $0.13/box, 5-10 business day production.", date: '2026-07-15', category: 'Eco Folding Box', content: '' },
    'restaurant-opening-flyer-printing-guide': {
      title: '餐廳開業傳單印刷指南 · 香港餐飲旺季速遞方案 | 智印港 ZprintPro',
      description: '香港新餐廳開業如何用 A4 傳單吸客？本文整理旺季速遞、紙張選擇、單／雙面印刷、摺疊款實戰策略，附 4 條餐飲東主常見 FAQ，協助茶餐廳／私房菜／外賣小店精準觸及街坊與上班族。',
      date: '2026-07-16', category: '餐飲外賣',
      content: '',
    },
    'cosmetics-packaging-box-printing-guide': {
      title: '化妝品包裝盒定制指南 · 護膚品牌結構與材質全攻略 | 智印港 ZprintPro',
      description: '護膚品新品牌如何揀包裝盒？比較天地盒、磁吸盒、摺疊盒 3 大結構，分析銅版紙、灰板、密度板等材質特性，附 4 條品牌創辦人常見 FAQ，協助 100-10,000 件 MOQ 精準控成本。',
      date: '2026-07-16', category: '美妝護膚',
      content: '',
    },
    'pet-food-sticker-printing-guide': {
      title: '香港寵物食品品牌貼紙印刷指南 · 防水防油 FDA 認證 | 智印港 ZprintPro',
      description: '寵物食品新品牌點樣印合格標籤？比較防水貼紙、防油貼紙、透明貼紙 3 種材質，分析 FDA 食品級認證、BPA-free 油墨、QR Code 追溯系統，附 4 條品牌創辦人 FAQ，協助 100-10,000 件 MOQ。',
      date: '2026-07-16', category: '寵物',
      content: '',
    },

    // 2026-07-20 v4 daily-content-evolve: 3 NEW Tier C 行业博客 (zh-hk locale titles)
    'religious-ceremony-printing-guide': {
      title: '香港宗教禮儀印刷指南 · 教堂寺廟殯儀禮盒感謝袋定制 | 智印港 ZprintPro',
      description: '香港教堂／佛寺／道觀／殯儀館宗教場地印刷攻略：1200g 灰板硬盒 + 緞帶手挽 + 燙金十字架、250g 銅版紙啞面、350g 白卡紙訃聞，4 條場地負責人 FAQ，50-500 套精準下單。',
      date: '2026-07-20', category: '宗教文化',
      content: '',
    },
    'industrial-nameplate-printing-guide': {
      title: '工業設備銘牌 / GHS 危險標籤印刷指南 · UL 認證 + ANSI Z535 標準 | 智印港 ZprintPro',
      description: '工業 4.0 設備銘牌 / GHS 危險化學品標籤 / UL 認證銘板 / ANSI Z535 警示標籤完整攻略：5 種材質（聚酯 PET / 聚酰亞胺 PI / 陽極氧化鋁 ANODIZED / 不鏽鋼 SUS / PVC 反光）+ 3M 9448A / VHB 4910 黏膠 + 4 條工業採購 FAQ。',
      date: '2026-07-20', category: '工業機械',
      content: '',
    },
    'construction-material-sample-book-printing-guide': {
      title: '建築裝飾材料樣板手冊印刷指南 · 瓷磚石材窗簾色卡定制 | 智印港 ZprintPro',
      description: '建築裝飾材料供應商必睇：5 種裝訂方式（騎馬釘／精裝／蝴蝶裝／活頁夾／卡片盒）+ 真材實料樣辦夾層 + 4 條建材供應商 FAQ，協助 50-500 本精準下單。',
      date: '2026-07-20', category: '建築工程',
      content: '',
    },
    // 2026-07-21 v7 daily-content-evolve: Q-004 apparel shopping bag — paper-bags × 服裝 (Tier A) — 純文字・v7 報價型 (5 檔實價)
    'apparel-shopping-bag-printing-guide': {
      title: '香港服裝品牌紙袋印刷指南 · 環保購物袋品牌升級 | 智印港 ZprintPro',
      description: '香港時裝、潮牌、買手店老闆必睇。一個高質感的品牌紙袋決定客人會否在 IG 打卡分享。智印港為本地時裝品牌提供白卡紙、黃牛皮、棉繩、絲帶、燙金、UV 局部全系列紙袋印刷,500-100,000 枚小至大批量,5-10 個工作天交付,順豐本地 + DHL 全球 2-4 天到貨,5 檔實價。',
      date: '2026-07-21', category: '服裝紙袋',
      content: '',
    },

    // 2026-07-23 v7 daily-content-evolve: Q-GR-01 香港拼版彩盒指南 (K3 7/23 插队 priority_boost=3) — packaging × 零售精品 (Tier A) — 純文字・v7 報價型
    'gang-run-card-boxes-hk-guide': {
      title: '香港拼版白卡彩盒印刷指南 · 免刀模費直降40%的預算首選 | 智印港 ZprintPro',
      description: '香港零售精品店、美妝小店、文創 IP 周邊、禮品小店老闆必睇。拼版白卡彩盒固定刀模共用,免刀模費 + 免排版費,成本直降 40-60%,500-10,000 枚小至大批量,8-15 天交期,4 種紙材 + 3 種盒型 + 8 檔標準尺寸,覆蓋 95% 香港零售場景,5 檔實價。',
      date: '2026-07-23', category: '拼版彩盒',
      content: '',
    },

    // 2026-08-05 v8 daily-content-evolve: A1/A2/A3 海報尺寸指南 (GSC 7d ~60 imps, posters × 尺寸長尾)
    'poster-size-guide': {
      title: 'A1 A2 A3 海報尺寸指南：印刷尺寸對照表・應用場景・紙材選擇 | 智印港 ZprintPro',
      description: 'A1 / A2 / A3 海報尺寸點樣揀？本文整理三種尺寸對照表（mm / cm / 英吋）、零售・展會・戶外場景應用建議、紙材與防水工藝選擇，附 4 條常見 FAQ，協助 10-1,000 張小至大批量落單，3-5 個工作天交付。',
      date: '2026-08-05', category: '海報印刷',
      content: '',
    },
    'a5-vs-a6-flyer-size': {
      title: 'A5 定 A6 傳單？尺寸對照・用途揀法・印刷成本全攻略 | 智印港 ZprintPro',
      description: 'A5（148×210mm）定 A6（105×148mm）傳單點揀？本文整理尺寸對照表（mm/cm/吋）、餐飲外賣・零售・展會派發場景建議、印刷成本差距同摺疊方案，附 4 條 FAQ，協助 50-10,000 張精準落單，3-5 個工作天交付。',
      date: '2026-08-06', category: '傳單印刷',
      content: '',
    },
  },

    // 2026-07-27 v4.1 weekly-meta-refresh: T6-FI-006 金融證券 1st 覆蓋 (Tier B × P0 paper-bags)
    'financial-institution-gift-bag-printing-guide': {
      title: '香港金融機構禮品袋印刷指南 · 銀行卡套 + 信用卡開卡禮盒定制 | 智印港 ZprintPro',
      description: '香港銀行、信用卡中心、券商、基金公司、保險公司客戶禮品袋完整攻略。1200g 灰板硬盒 + 燙金銀行 logo + RFID 防偽卡套 + 緞帶手挽，附 4 條金融採購 FAQ，協助 100-5,000 套精準下單。',
      date: '2026-07-27', category: '金融證券',
      content: '',
    },
    // 2026-07-27 v4.1 weekly-meta-refresh: T7-RP-007 房地產 3rd SKU 拓點 (Tier B × P0 posters)
    'real-estate-floor-plan-poster-printing-guide': {
      title: '香港新盤樓盤戶型海報印刷指南 · A1/A2 防水戶型圖 + 售樓處佈局 | 智印港 ZprintPro',
      description: '香港新盤樓書、售樓處示範單位、房地產代理分店必備：5 種尺寸（A1/A2/A3/B1/B2）+ 5 種材質（防水 PP 膜 / 啞面銅版紙 / 合成紙 / 啞面膠膜 / 戶外油畫布）+ 4 條地產代理 FAQ，協助 10-500 張精準下單。',
      date: '2026-07-27', category: '房地產',
      content: '',
    },
    // 2026-08-05 v8 daily-content-evolve: 月曆印刷 (GSC 97 imps rank 46.31, calendars × Tier A) — 純文字・無図
    'calendar-printing-guide': {
      title: '月曆印刷指南 2027：掛牆年曆 / 桌曆尺寸・紙材・交期全攻略 | 智印港 ZprintPro',
      description: '2027 年年曆採購季開始！8-10 月落單享批量折扣。掛牆年曆 A3/A2、桌曆 A5、迷你月曆 50 本起印，銅版紙 + 過膠 + 線圈裝訂，3-5 天交期，48 小時急單。',
      date: '2026-08-05', category: '印刷工藝',
      content: '',
    },

  // 2026-07-20 v4 daily-content-evolve: NEW posts.en block (之前 page.tsx 没有 en 块, en locale H1 走 fallback slug 不友好, 现新建)
  en: {
    'religious-ceremony-printing-guide': {
      title: 'Religious Ceremony Printing Guide: Custom Church / Temple / Memorial Boxes & Gift Bags | ZprintPro',
      description: 'US religious organizations, churches, temples, and funeral homes: 3 ceremony types, 5 material options (250g art paper / 1200g grayboard / 350g white card / 200g Vellum / kraft paper), 4 organization-leader FAQs, 50-500 sets, Free Shipping over $99 USA, 5-7 business day production, No minimum 50 sets.',
      date: '2026-07-20', category: 'Religious Ceremony',
      content: '',
    },
    'industrial-nameplate-printing-guide': {
      title: 'Industrial Equipment Nameplate & GHS Hazard Label Printing Guide: UL Certified + ANSI Z535 Standard | ZprintPro',
      description: 'US industrial equipment manufacturers, chemical plants, and machinery exporters: 5 nameplate materials (PET / Polyimide / Anodized Aluminum / Stainless Steel / PVC reflective), 3 certification standards (UL / GHS / ANSI Z535), 4 industrial procurement FAQs, 100-50,000 pieces, Free Shipping over $99 USA.',
      date: '2026-07-20', category: 'Industrial Nameplate',
      content: '',
    },
    'construction-material-sample-book-printing-guide': {
      title: 'Construction Material Sample Book Printing Guide: Tile, Stone, Curtain, Flooring Color Card Custom | ZprintPro',
      description: 'US construction material suppliers, interior designers, and building product brands: 5 binding styles (saddle stitch / perfect bound / hardcover / butterfly / loose-leaf), 4 print finishes, 4 supplier FAQs, 50-500 copies, Free Shipping over $99 USA, 5-7 business day production, No minimum 50 copies.',
      date: '2026-07-20', category: 'Construction Sample Book',
      content: '',
    },
    // 2026-07-23 v7 daily-content-evolve: Q-GR-01 gang-run card boxes (en locale) — packaging × retail 零售精品 (US-target)
    'gang-run-card-boxes-hk-guide': {
      title: 'Gang-Run Card Boxes Guide: No Die-Cut Fee, 40-60% Cheaper | ZprintPro',
      description: 'US retail boutique, skincare, IP merchandise, and gift brand owners — gang-run white card boxes with shared standard die-cuts, NO die-cut fee, NO setup fee, 40-60% lower unit cost, 100-10,000 piece runs, 8-15 day production, 4 paper stocks + 3 box styles + 8 standard sizes, 5-tier pricing, Free Shipping over $99 USA, Free Design Mockup, 100 MOQ starter.',
      date: '2026-07-23', category: 'Gang-Run Boxes',
      content: '',
    },
    // 2026-08-05 v8 daily-content-evolve: A1/A2/A3 Poster Size Guide (GSC 7d ~60 imps)
    'poster-size-guide': {
      title: 'A1 A2 A3 Poster Size Guide: Dimensions Chart, Uses & Paper Choices | ZprintPro',
      description: 'A1, A2 and A3 poster sizes compared — exact dimensions in mm / cm / inches, best use cases for retail, trade shows and outdoor, paper & waterproof finish choices, 4 FAQs, 10-1,000 piece runs, 3-5 day production from Asia factory.',
      date: '2026-08-05', category: 'Poster Printing',
      content: '',
    },
    'a5-vs-a6-flyer-size': {
      title: 'A5 vs A6 Flyer Size: Dimensions, Use Cases & Print Cost Comparison | ZprintPro',
      description: 'A5 vs A6 flyer size: exact dimensions in mm & inches, use cases for restaurants, retail and direct mail, cost gap, folding options, 4 FAQs, 50-10k piece runs.',
      date: '2026-08-06', category: 'Flyer Printing',
      content: '',
    },
  },

    // 2026-07-27 v4.1 weekly-meta-refresh: T6-FI-006 (en US) — paper-bags × Financial Institution
    'financial-institution-gift-bag-printing-guide': {
      title: 'Financial Institution Gift Bag Printing Guide: Bank Kits & Credit Card Welcome Boxes for US Financial Brands | ZprintPro',
      description: 'US banks, credit card issuers, brokerages, mutual funds, and insurance company client gift bags — 1200g grayboard rigid box + foil logo + RFID anti-counterfeit card sleeve + satin ribbon handle, 4 finance procurement FAQs, 100-5,000 set small-to-bulk runs, Free Shipping over $99 USA, Free design mockup, 100 MOQ starter, 5-10 business day production, Made for USA financial industry.',
      date: '2026-07-27', category: 'Financial Institution',
      content: '',
    },
    // 2026-07-27 v4.1 weekly-meta-refresh: T7-RP-007 (en US) — posters × Real Estate
    'real-estate-floor-plan-poster-printing-guide': {
      title: 'Real Estate Floor Plan Poster Printing Guide: A1/A2 Waterproof Layout Prints for US Property Developers | ZprintPro',
      description: 'US new development sales galleries, model homes, real estate agency branches — 5 standard sizes (A1/A2/A3/B1/B2), 5 materials (waterproof PP film / matte art paper / synthetic paper / matte laminate / outdoor canvas), 4 real estate agent FAQs, 10-500 piece small-to-bulk runs, Free Shipping over $99 USA, 5-7 business day production, 100 MOQ starter, Made for USA property market.',
      date: '2026-07-27', category: 'Real Estate',
      content: '',
    },
    // 2026-08-05 v8 daily-content-evolve: 2027 Calendar Printing Guide (GSC 97 imps, calendars × Tier A) — 純文字
    'calendar-printing-guide': {
      title: '2027 Calendar Printing Guide: Wall & Desk Calendar Sizes, Paper & Ordering | ZprintPro',
      description: '2027 calendar season is here! Wall calendars A3/A2, desk A5, mini giveaways — 50-piece MOQ, art paper + lamination + wire-O binding, 3-5 day production, 48h rush, Free Shipping $99+ USA.',
      date: '2026-08-05', category: 'Printing Techniques',
      content: '',
    },

  ja: {
    'company-intro': { title: 'ZprintPro会社概要：専門設備とワンストップ印刷サービス', description: 'ZprintProはハイデルベルグ6+1印刷機、HPデジタル印刷機、マルティニ製本ラインなどの先進設備を保有し、ワンストップ印刷サービスを提供しています。', date: '2024-06-01', category: '会社ニュース', content: '' },
    'sticker-guide': { title: 'ステッカー印刷完全ガイド：材質、加工と応用場面', description: 'ステッカーの材質選び、表面加工、応用場面について深く理解しましょう。', date: '2024-04-15', category: 'ステッカー知識', content: '' },
    'business-card-design': { title: 'ステッカーデザインの10の黄金法則', description: 'レイアウトから配色まで、ステッカーデザインの核心技術をマスターしましょう。', date: '2024-04-10', category: 'ステッカー知識', content: '' },
    'packaging-trends': { title: '2024年パッケージデザイントレンド解析', description: '最新のパッケージデザイントレンドを探ります。', date: '2024-04-05', category: '包装知識', content: '' },
    'cmyk-guide': { title: 'CMYK vs RGB：印刷カラーモード完全解説', description: 'CMYKとRGBの違いを理解し、最適な印刷結果を得ましょう。', date: '2024-03-28', category: '印刷技術', content: '' },
    'paper-materials': { title: '印刷用紙選択ガイド：アート紙から特殊紙まで', description: '異なる紙の特性を分析し、最適な用紙を選びましょう。', date: '2024-03-20', category: '印刷技術', content: '' },
    'eco-printing': { title: 'エコ印刷：持続可能な包装の未来', description: '地球とブランドの両方のために、エコ印刷について学びましょう。', date: '2024-03-15', category: '業界トレンド', content: '' },
    'hong-kong-printing-guide': { title: 'オリジナルステッカー・パッケージ印刷ガイド：小ロット・短納期・データ入稿 | ZprintPro', description: 'オリジナルステッカー・パッケージ・印刷物の完全ガイド。素材（ビニール・PVC・クラフト・透明・箔押し）・小ロット（30枚〜）・短納期（最短3日出荷）・全国送料込み・DHL国際配送対応。中小企業・D2Cブランド・同人サークル向け。', date: '2024-05-20', category: '印刷知識', content: '' },
    'design-file-specs': { title: '印刷用デザインファイル仕様', description: '裁ち落とし、解像度、カラーモードについて学びましょう。', date: '2024-05-15', category: 'デザインチップ', content: '' },
    'brand-materials-checklist': { title: '企業ブランド物料チェックリスト', description: 'ステッカーから展示物まで、ブランド構築に必要な印刷物料を確認しましょう。', date: '2024-05-10', category: 'ブランディング', content: '' },
    'mtr-advertising-specs': { title: 'イベントポスター・展示パネル印刷仕様：サイズ・用紙・加工・短納期 | ZprintPro', description: 'イベントポスター・展示パネル・展示会の印刷仕様。標準サイズ（A3/A2/A1/A0/24x36インチ）・用紙（光沢・マット・PP・キャンバス）・加工（UVラミネート・穴あけ・グロメット）・短納期（3日〜7日出荷）・DHL国際配送対応。展示会主催・イベント企画会社向け。', date: '2024-05-05', category: '印刷知識', content: '' },
    'flyer-printing-guide': { title: 'オリジナルチラシ印刷ガイド：サイズ・用紙・デザイン・配布戦略 | 小ロット対応', description: 'オリジナルチラシ印刷完全ガイド。標準サイズ（A4・A5・B5・A6）・用紙（コート紙・マット紙・上質紙・再生紙）・加工（両面印刷・折り・PP加工）・小ロット対応（30枚〜5000枚）・短納期（3日〜7日出荷）。飲食店・小売・不動産・イベント主催者向け。', date: '2026-07-02', category: '印刷知識', content: '' },
    'food-packaging-printing-guide': {
      title: '食品パッケージ印刷完全ガイド：素材、安全認証、設計',
      description: '食品グレード包装印刷の全て — クラフト箱から食品対応ラミネート、認証、設計のベストプラクティスまで徹底解説。',
      date: '2026-07-02', category: '包装知識',
      content: '',
    },
    'paper-bag-printing-guide': { title: 'オリジナル紙袋印刷完全ガイド：素材・サイズ・持ち手と2026年トレンド | 小ロット対応', description: 'クラフト紙袋、白カード紙袋、ギフト紙袋、エコバッグまで、日本の boutique・カフェ・小売向けに紙袋印刷を徹底解説。30枚〜、短納期（3日〜7日出荷）、全国送料込み。', date: '2026-07-02', category: '包装知識', content: '' },
    'poster-printing-guide': { title: 'オリジナルポスター印刷ガイド：サイズ・用紙・加工・デザイン | 短納期対応', description: 'オリジナルポスター印刷完全ガイド。標準サイズ（A3・A2・A1・A0・B1・B2）・用紙（光沢紙・マット紙・合成紙・耐水PP・キャンバス）・加工（UVラミネート・PP加工・周囲テープ）・短納期（3日〜7日出荷）。イベント主催・展示会・小売店・不動産向け。', date: '2026-07-02', category: '印刷知識', content: '' },

    // 2026-07-04 純文字深度ブログ: レストラン開業チラシ (Tier A × P0 flyers) — 純文字・無図
    'restaurant-opening-flyer-printing-guide': {
      title: 'レストラン開業チラシ印刷ガイド：サイズ・用紙・デザインの徹底解説 | ZprintPro',
      description: '飲食店開業を応援。高品質チラシが walk-in 顧客の記憶に残るかどうかを決める。50-200枚小ロットから5,000枚大量注文まで、3営業日納品、アジア工場からDHL 2-4日全世界配送。',
      date: '2026-07-04', category: '飲食チラシ',
      content: '',
    },

    // 2026-07-06 v4 純文字深度ブログ: ペットフードステッカー (Tier A × P0 stickers) — 純文字・無図
    'pet-food-sticker-printing-guide': {
      title: 'ペットフードブランドステッカー印刷ガイド：防水・FDA準拠ラベル | ZprintPro',
      description: 'ペットフード・ペット用品ブランド向け。防水・耐油・FDA準拠素材、1000枚〜100,000枚量産まで小〜大ロット対応、5-7営業日納品。',
      date: '2026-07-06', category: 'ペットステッカー',
      content: '',
    },

    // 2026-07-06 v4 純文字深度ブログ: アパレルショッピングバッグ (Tier A × P0 paper-bags) — 純文字・無図
    'apparel-shopping-bag-printing-guide': {
      title: 'アパレルブランドショッピングバッグ印刷ガイド：素材・サイズ・ロゴ | ZprintPro',
      description: 'アパレル・ファッションブランド向けショッピングバッグ完全解説。クラフト紙・白カード・ハンドル素材別、500枚小ロットから10万枚量産、5-10営業日納品。',
      date: '2026-07-06', category: 'アパレルバッグ',
      content: '',
    },

    // 2026-07-06 v4 純文字深度ブログ: 越境EC配送箱 (Tier A × P0 packaging) — 純文字・無図
    'cross-border-ecommerce-shipping-box-guide': {
      title: '越境EC配送箱カスタムガイド：DHL 2-4日配送・ロゴ印刷 | ZprintPro',
      description: '越境EC・Shopify・Amazon FBAブランド向け配送箱完全攻略。丈夫な3層構造、DHL/FedEx互換、小〜大ロット対応、3-7営業日納品、認証取得済み素材。',
      date: '2026-07-06', category: '越境EC配送',
      content: '',
    },

    // 2026-07-07 v4 純文字深度ブログ: 化粧品パッケージ箱 (Tier A × P0 packaging) — 純文字・無図
    // Q-002 が本日デプロイ、P0 100% 完成
    'cosmetics-packaging-box-printing-guide': {
      title: '化粧品パッケージ箱カスタムガイド：素材・構造・ブランディング | ZprintPro',
      description: 'スキンケア・美容液・香水ブランドオーナー様へ。上質なパッケージ箱が棚前 3秒の購買決定を決める。天地蓋箱・ブック型・マグネット式全シリーズ、50-10,000個小〜大ロット、5-10営業日納品。',
      date: '2026-07-07', category: '化粧品パッケージ',
      content: '',
    },

    // 2026-07-07 v4 純文字深度ブログ: 茶・ドリンクギフトボックス (Tier A × P0 packaging) — 純文字・無図
    'tea-beverage-gift-box-printing-guide': {
      title: '茶・ドリンクギフトボックス印刷ガイド：リーフ・タピオカ・ECブランド向け | ZprintPro',
      description: 'タピオカ店、リーフティーEC、中華茶ギフトボックスブランドオーナー様へ。FDA 認証食品グレード内装 100-50,000個、5-10営業日納品。',
      date: '2026-07-07', category: '茶ギフトボックス',
      content: '',
    },

    // 2026-07-07 v4 純文字深度ブログ: ウェディング ギフトバッグ (Tier A × P0 paper-bags) — 純文字・無図
    'wedding-favor-bag-printing-guide': {
      title: 'ウェディング ギフトバッグ・招待状印刷ガイド2026：素材・サイズ・パーソナライズ | ZprintPro',
      description: 'ご婚約カップル・ウェディングプランナー・式場様へ。2026辰年ブライダルシーズン向け、サテンリボン持ち手・箔押し・新郎新婦名パーソナライズ、100-3,000個小ロット、5-10営業日納品。',
      date: '2026-07-07', category: 'ウェディングバッグ',
      content: '',
    },

    // 2026-07-08 v4 純文字深度ブログ: 小売ポスター (P1 unlock × 零售精品) — 純文字・無図
    'retail-shop-poster-printing-guide': {
      title: '小売・セレクトショップ ポスター印刷ガイド2026：サイズ・用紙・ディスプレイ | ZprintPro',
      description: 'ブティック・ブランド pop-up・モール小売オーナー様へ。高品質店内ポスターが顧客滞在時間とコンバージョンを決める。ZprintProは10-1,000枚小〜大ロット、A3/A2/A1/A0 全サイズ、防水 PP フィルム、3-5営業日納品。',
      date: '2026-07-08', category: '小売ポスター',
      content: '',
    },

    // 2026-07-08 v4 純文字深度ブログ: レストランメニュー (P1 unlock × 餐飲外賣) — 純文字・無図
    'restaurant-menu-printing-guide': {
      title: 'レストランメニュー印刷ガイド2026：防水・折りたたみ・素材 | ZprintPro',
      description: 'レストラン・カフェ・デザート店・宴会オーナー様へ。高品質メニューが注文決定の最後の関門でありブランドアイデンティティの延長。ZprintProは50-5,000枚小〜大ロット、防水 PP ラミネート・ハードカバー・使い捨て紙メニュー全シリーズ、5-7営業日納品。',
      date: '2026-07-08', category: 'レストランメニュー',
      content: '',
    },

    // 2026-07-08 v4 純文字深度ブログ: ウエディング レッド packet (P1 unlock × 婚慶) — 純文字・無図
    'wedding-red-packet-printing-guide': {
      title: 'ウエディング レッド packet 印刷ガイド2026：素材・パーソナライズ・大量印刷 | ZprintPro',
      description: 'ご婚約カップル・ウェディングプランナー・式場様へ。2026辰年ブライダルシーズン、精致な結婚祝儀袋がゲストの第一印象を決める。ZprintProは100-10,000個カスタムオーダー対応、箔押し新郎新婦名・パーソナライズ祝福・繁体字工芸、5-10営業日納品。',
      date: '2026-07-08', category: 'ウエディング祝儀',
      content: '',
    },

    // 2026-07-14 v4 daily-content-evolve: 3 blogs P0/P0/P1 (ja locale)
    'baby-product-label-sticker-printing-guide': { title: "ベビー用品ステッカー印刷ガイド：FDA食品衛生ラベル 日本向け | ZprintPro", description: "日本の粉ミルク・ベビーフード・赤ちゃんスキンケア・マタニティ栄養ブランドオーナー様へ。FDA 準拠・BPA-free・冷凍対応ラベルが shelf 審査とママ世代 SNS 信頼を獲得。ZprintProは 500〜100,000 枚小〜大ロット、5-7 営業日納品、$99 以上無料配送、DHL 国際配送対応。", date: '2026-07-14', category: 'ベビーステッカー', content: '' },
    'ecommerce-shipping-bag-printing-guide': { title: "EC配送袋印刷ガイド：防水・改ざん防止 日本物流向け | ZprintPro", description: "日本の Amazon FBA・Shopify・Etsy・3PL 倉庫ブランドオーナー様へ。改ざん防止シール・追跡バーコード・返品ラベル付きの高品質印刷配送袋が、開封体験と返品率を決定。ZprintProは防水クラフト・カスタム印刷・剥離粘着で 1,000〜200,000 個小〜大ロット、5-10 営業日納品、$99 以上無料配送、全国送料込み。", date: '2026-07-14', category: '配送袋', content: '' },
    'media-merchandise-box-printing-guide': { title: "メディアフランチャイズ コレクターズボックス印刷ガイド：限定版・予約・日本ファン向け | ZprintPro", description: "日本の映像 IP スタジオ・アニメブランド・Comic-Con 出展者・限定版コレクティブ会社向け。高品質 IP グッズボックスがファンロイヤルティ・二次拡散率・中古市場プレミアムを決定。ZprintProは引出し式・マグネット式・限定ナンバー印刷・UV スポット + 箔押しロゴでグローバルメディアフランチャイズ市場に 100-10,000 個小〜大ロット、7-15 営業日納品対応。", date: '2026-07-14', category: '映像IPグッズ', content: '' },
    // 2026-07-15 daily-content-evolve: Q-017/018/019 new blogs (ja locale)
    'thick-paper-flyer-printing-restaurant-takeout-guide': { title: "厚紙チラシ印刷ガイド - 飲食店メニュー・テイクアウト向け完全解説 | ZprintPro", description: "日本のレストラン・居酒屋・カフェ・テイクアウト专卖店様へ。200gsm〜400gsm 全規格厚紙チラシ、100 枚試刷から 200,000 枚チェーン展開まで対応、4 営業日国内生産、$99 以上で全国無料配送。", date: '2026-07-15', category: '厚紙チラシ', content: '' },
    'magnetic-closure-gift-box-ecommerce-brand-guide': { title: "マグネット式ギフト ボックス カスタムガイド - 越境EC・DTC ブランド向けプレミアム包装 | ZprintPro", description: "日本の Shopify、Amazon FBA、Etsy、Kickstarter、Subscription Box DTC ブランドオーナー様へ。100 個 Kickstarter 試作から 50,000 個チェーン展開まで対応、5-10 営業日生産。", date: '2026-07-15', category: 'マグネット ボックス', content: '' },
    'folding-box-cosmetics-brand-eco-friendly-guide': { title: "折り畳み箱 カスタム ガイド - 化粧品・スキンケア ブランド向けエコ包装 | ZprintPro", description: "日本のスキンケア、美容液、シート マスク、口紅、メイク、手作り化粧品ブランドオーナー様へ。5 素材折り畳み箱、FSC 認証 + 大豆インク + リサイクル マーク完備。", date: '2026-07-15', category: 'エコ 折り畳み箱', content: '' },
    'restaurant-opening-flyer-printing-guide': {
      title: 'レストラン開業チラシ印刷ガイド · サイズ・用紙・短期納品 | ZprintPro',
      description: '新規オープンする飲食店向けに、A4 チラシのサイズ、用紙（128/157/250gsm）、両面印刷、折り加工を解説。店内飲食とテイクアウト両方に対応した 4 つの FAQ 付きで、香港・日本・東南アジア市場向け。',
      date: '2026-07-16', category: '餐飲外賣',
      content: '',
    },
    'cosmetics-packaging-box-printing-guide': {
      title: '化粧品パッケージ箱カスタムガイド · 素材・構造・ブランディング | ZprintPro',
      description: 'スキンケアブランド向けに、天地箱・マグネット式・折り箱の 3 構造を比較。素材（コート紙・グレー板・密度板）、印刷加工、最低発注数量まで解説。ブランド創業者からよくある質問 4 件付き。',
      date: '2026-07-16', category: '美妝護膚',
      content: '',
    },
    'pet-food-sticker-printing-guide': {
      title: 'ペットフードステッカー印刷ガイド：防水・FDA 準拠ラベル素材 | ZprintPro',
      description: 'ペットフードブランドの FDA 準拠ラベル印刷方法を解説。防水・透明・ダイカットの 3 素材比較、BPA フリーインク、QR コードトレーサビリティ、ブランド創業者 FAQ 4 件付きで、グローバル市場向け MOQ 戦略も。',
      date: '2026-07-16', category: '寵物',
      content: '',
    },

    // 2026-07-20 v4 daily-content-evolve: 3 NEW Tier C 行业ブログ (ja locale titles)
    'religious-ceremony-printing-guide': {
      title: '宗教儀式印刷ガイド：教会・寺院・メモリアル ボックス＆ギフト バッグ カスタム | ZprintPro',
      description: '日本の宗教団体、教会、寺院、葬儀場向け宗教儀式印刷：3 つの儀式タイプ、5 種類素材（250g コート紙 / 1200g グレー ボード / 350g ホワイト カード / 200g ベラム / クラフト紙）、4 つの団体責任者 FAQ、50-500 セット、$99 以上で全国無料配送、5-7 営業日生産。',
      date: '2026-07-20', category: '宗教儀式',
      content: '',
    },
    'industrial-nameplate-printing-guide': {
      title: '工業設備銘板 / GHS 危険ラベル印刷ガイド：UL 認証 + ANSI Z535 規格 | ZprintPro',
      description: '日本の工業設備メーカー、化学工場、機械輸出業者向け：5 種類の銘板素材（PET / ポリイミド / 陽極酸化アルミ / ステンレス鋼 / PVC 再帰反射）、3 つの認証規格（UL / GHS / ANSI Z535）、4 つの工業調達 FAQ、100-50,000 個小〜大ロット、$99 以上で全国無料配送。',
      date: '2026-07-20', category: '工業銘板',
      content: '',
    },
    'construction-material-sample-book-printing-guide': {
      title: '建築装飾材料サンプルブック印刷ガイド：タイル・石材・カーテン・フローリング カラー カード カスタム | ZprintPro',
      description: '日本の建築装飾材料サプライヤー向け：5 つの製本方式（骑马钉 / 無線胶装 / 上製本 / バタフライ / ルーズリーフ）、4 つの印刷仕上げ、4 つのサプライヤー FAQ、50-500 部小〜大ロット、$99 以上で全国無料配送、5-7 営業日生産。',
      date: '2026-07-20', category: '建築サンプル ブック',
      content: '',
    },

    // 2026-07-23 v7 daily-content-evolve: Q-GR-01 gang-run card boxes (ja locale) — packaging × 小売 (沖縄/北海道/ヤマト運輸)
    'gang-run-card-boxes-hk-guide': {
      title: '合版ホワイトカードボックス印刷ガイド：型代不要で40-60%削減 | ZprintPro',
      description: '日本の小売ブティック、スキンケア、IP 商品、ギフトブランドオーナー様へ。合版ホワイトカードボックス、固定型代共用で型代不要・版代不要、40-60% コスト削減、100-10,000 個小〜大ロット、8-15 日生産、4 種素材 + 3 種箱型 + 8 標準サイズで 95% 日本小売シーンカバー、5 段階実価格、沖縄・北海道含む全国送料無料、ヤマト運輸 1-3 日納品。',
      date: '2026-07-23', category: '合版ホワイトカードボックス',
      content: '',
    },
    // 2026-07-27 v4.1 weekly-meta-refresh: T6-FI-006 (ja 日本) — paper-bags × 金融機関
    'financial-institution-gift-bag-printing-guide': {
      title: '金融機関ギフトバッグ印刷ガイド：銀行キット・クレジットカードウェリカムボックス 日本金融業界向け | ZprintPro',
      description: '日本の銀行、クレジットカード会社、証券会社、投資信託会社、保険会社のクライアントギフトバッグ：1200g グレー ボード リジッド ボックス + 箔押しロゴ + RFID 偽造防止カード スリーブ + サテン リボン ハンドル、4 つの金融調達 FAQ、100-5,000 セット、$99 以上で全国無料配送、5-10 営業日生産、100 セット minimum、Made for USA 金融業界対応。',
      date: '2026-07-27', category: '金融機関',
      content: '',
    },
    // 2026-07-27 v4.1 weekly-meta-refresh: T7-RP-007 (ja 日本) — posters × 不動産
    'real-estate-floor-plan-poster-printing-guide': {
      title: '不動産フロアプラン ポスター印刷ガイド：A1/A2 防水レイアウト図 日本デベロッパー向け | ZprintPro',
      description: '日本の新築マンション モデルルーム、不動産仲介店舗、分譲マンション ギャラリー必備：5 種類サイズ（A1/A2/A3/B1/B2）、5 種類素材（防水 PP フィルム / マット コート紙 / 合成紙 / マット ラミネート / 屋外キャンバス）、4 つの不動産エージェント FAQ、10-500 枚、$99 以上で全国無料配送、5-7 営業日生産、100 枚 minimum、Made for USA 不動産市場対応。',
      date: '2026-07-27', category: '不動産',
      content: '',
    },
    // 2026-08-05 v8 daily-content-evolve: 2027年カレンダー印刷ガイド (GSC 97 imps) — 純文字・無図
    'calendar-printing-guide': {
      title: '2027年カレンダー印刷ガイド：壁掛け・卓上サイズ・用紙・納期完全解説 | ZprintPro',
      description: '2027年カレンダー発注シーズン到来！壁掛け A3/A2、卓上 A5、ミニ 50部から。コート紙+PP加工+ツインワイヤー綴じ、3-5営業日生産、最短48時間、全国送料無料。',
      date: '2026-08-05', category: '印刷技術',
      content: '',
    },

    // 2026-08-05 v8 daily-content-evolve: A1/A2/A3 ポスターサイズガイド (GSC 7d ~60 imps)
    'poster-size-guide': {
      title: 'A1 A2 A3 ポスターサイズガイド：寸法早見表・用途・用紙選び | ZprintPro',
      description: 'A1・A2・A3 ポスターサイズを徹底比較。寸法（mm / cm / インチ）早見表、小売・展示会・屋外での用途別選び方、用紙と防水加工の選び方、よくある質問 4 件、10-1,000 枚小〜大ロット、3-5 営業日生産。',
      date: '2026-08-05', category: 'ポスター印刷',
      content: '',
    },
    'a5-vs-a6-flyer-size': {
      title: 'A5 と A6 チラシのサイズ比較：寸法・用途・印刷コスト | ZprintPro',
      description: 'A5 と A6 チラシのサイズを徹底比較。寸法（mm / インチ）早見表、飲食・小売・イベントでの用途別選び方、印刷コスト差と折り加工、よくある質問 4 件、50〜10,000 枚の小〜大ロット対応。',
      date: '2026-08-06', category: 'チラシ印刷',
      content: '',
    },
  }
};

// 2026-07-05 修：补 packaging-box-custom-guide（之前 src/data/blog-data 已加 content，但 articleSlugs 缺位导致 generateStaticParams 不生成该 slug → Post not found）
// 2026-07-06 手动补救: weekly-meta-refresh 11:00 session LLM API GOAWAY 崩了, 手动补 3 篇 Tier B 博客 (Tier B 行业 × P0 品类), 需同步加到 articleSlugs
const articleSlugs = ['company-intro', 'hong-kong-printing-guide', 'design-file-specs', 'brand-materials-checklist', 'mtr-advertising-specs', 'sticker-guide', 'business-card-design', 'packaging-trends', 'cmyk-guide', 'paper-materials', 'eco-printing', 'flyer-printing-guide', 'food-packaging-printing-guide', 'paper-bag-printing-guide', 'poster-printing-guide', 'restaurant-opening-flyer-printing-guide', 'packaging-box-custom-guide', 'pet-food-sticker-printing-guide', 'apparel-shopping-bag-printing-guide', 'cross-border-ecommerce-shipping-box-guide', 'real-estate-brochure-box-printing-guide', 'pharmaceutical-label-printing-guide', 'jewellery-shopping-bag-printing-guide', 'cosmetics-packaging-box-printing-guide', 'tea-beverage-gift-box-printing-guide', 'wedding-favor-bag-printing-guide', 'retail-shop-poster-printing-guide', 'restaurant-menu-printing-guide', 'wedding-red-packet-printing-guide', 'product-label-printing-guide', 'graduation-yearbook-printing-guide', 'ip-character-sticker-printing-guide', 'trade-show-banner-printing-guide', 'wedding-invitation-envelope-printing-guide', 'doujin-circle-printing-guide', 'hotel-amenity-sticker-printing-guide',
  'finance-summit-gift-bag-printing-guide',
  'marathon-event-poster-printing-guide',
  'car-dealership-amenity-sticker-printing-guide',
    'hotel-keycard-sleeve-printing-guide',
  'baby-product-label-sticker-printing-guide',
  'ecommerce-shipping-bag-printing-guide',
  'media-merchandise-box-printing-guide',
  // 2026-07-16 v4 daily-content-evolve add 3 (Q-001/002/003)
  'restaurant-opening-flyer-printing-guide',
  'cosmetics-packaging-box-printing-guide',
  'pet-food-sticker-printing-guide',
  // 2026-07-16 fix: Q-017/018/019 daily blog routing (之前 42ddb10/e1bda86 failed, 根因 = articleSlugs 缺位)
  'thick-paper-flyer-printing-restaurant-takeout-guide',
  'magnetic-closure-gift-box-ecommerce-brand-guide',
  'folding-box-cosmetics-brand-eco-friendly-guide',
  // 2026-07-20 v4 daily-content-evolve: 3 NEW Tier C 行业博客 (宗教文化 / 工業機械 / 建築工程 — 7-15 cron P2 unlock 已写, 7-20 cron 转写未铺行业)
  'religious-ceremony-printing-guide',
  'industrial-nameplate-printing-guide',
  'construction-material-sample-book-printing-guide',
  'baby-food-packaging-box-printing-guide',
  'real-estate-flyer-printing-guide',
  'medical-device-packaging-box-guide',
  'auto-parts-shopping-bag-printing-guide',
  'sports-merchandise-gift-box-printing-guide',
  // 2026-07-23 v7 daily-content-evolve: Q-GR-01 香港拼版彩盒指南 (K3 7/23 插队 priority_boost=3) — packaging × 零售精品
  'gang-run-card-boxes-hk-guide',
  // 2026-07-24 v8 M3 任务卡: Q-GR-02 (en 美国) + Q-GR-03 (ja 日本) — packaging × 跨境電商 + 美妝護膚
  'custom-card-boxes-small-batch-usa',
  'cosmetic-card-boxes-gang-run-japan',
  // 2026-07-27 v4.1 weekly-meta-refresh: T6-FI-006 + T7-RP-007
  'financial-institution-gift-bag-printing-guide',
  'real-estate-floor-plan-poster-printing-guide',
  // 2026-08-05 v8 daily-content-evolve: 月曆印刷 (calendar-printing-guide) + 8/4 遗留补位 (same-day-flyers)
  'calendar-printing-guide',
  'same-day-flyers-printing-hong-kong-guide',
  // 2026-08-05 v8 daily-content-evolve: A1/A2/A3 海報尺寸指南
  'poster-size-guide',
  'a5-vs-a6-flyer-size', // 2026-08-06 v8 daily: A5 vs A6 傳單尺寸
];
const guideSlugs = getAllBuyingGuideSlugs();
const clusterSlugs = getAllClusterSlugs();
const allSlugs = [...articleSlugs, ...guideSlugs, ...clusterSlugs];

function getPostData(locale: Locale, slug: string) {
  // 2026-07-06 fix: 优先检查 buying-guide (9 个 SEO 重要资产)
  // 之前 bug: blog-posts.ts meta 命中时 (categoryKey='buying-guide') 走 JSON 路径,
  // 但 src/data/blog-data/*.json 没有 buying-guide slugs → content 空 → 27 页面全部 prose 空白
  // 修复: buying-guide 优先, 用 buying-guides.ts 的完整 title/desc/content/keywords/relatedProducts
  const guide = getBuyingGuideBySlug(slug);
  if (guide) {
    // meta (blog-posts.ts) 的 title 在 buying-guide 上有时更新更频繁 (NAP 脱钩修正),
    // 优先 meta.title[locale] > guide.title[locale]
    const meta = getBlogPostMetaBySlug(slug);
    return {
      title: meta?.title?.[locale] || guide.title[locale],
      description: guide.description[locale],
      date: guide.date,
      category: guide.category[locale],
      content: guide.content[locale],
      keywords: Array.isArray(guide.keywords[locale]) ? guide.keywords[locale].join(',') : guide.keywords[locale],
      isBuyingGuide: true,
      linkedProducts: guide.relatedProducts || [],
    };
  }
  // 2026-07-05 fix: 优先从 blog-posts.ts meta 拿 title/desc/date/category
  // 修 H1 显示 slug bug — legacyPost 缺失 (如 packaging-box-custom-guide) 时
  // legacyPost=undefined → src.title=undefined → fallback 到 slug 字符串
  const meta = getBlogPostMetaBySlug(slug);
  const legacyPost = posts[locale]?.[slug];
  // 2026-07-04 修复：content 改为从 src/data/blog-data JSON 读
  // 改写：legacyPost 不存在时也走 JSON fallback（en block 缺失时也救场）
  const jsonEntry = blogContentsByLocale[locale]?.[slug];
  if (meta || legacyPost || jsonEntry) {
    let content = getContentFromJson(locale, slug);
    // Fallback: legacy inline content (用于过渡期)
    if (!content && legacyPost) content = legacyPost.content || '';
    // Apply content transformations
    content = content.replace(/href="\/product\//g, `href="/${locale}/product/`);
    content = content.replace(/href="\/(en|ja)\/product\//g, `href="/${locale}/product/`);
    content = content.replace(/href="\/category\//g, `href="/${locale}/category/`);
    content = content.replace(/href="\/(en|ja)\/category\//g, `href="/${locale}/category/`);

    // 2026-07-05 fix: 优先级 meta (本地化标题) > legacyPost > slug fallback
    const title = meta?.title?.[locale] || legacyPost?.title || (jsonEntry && jsonEntry.content ? slug : '');
    const description = meta?.description?.[locale] || legacyPost?.description || '';
    const date = meta?.date || legacyPost?.date || '2024-01-01';
    const category = meta?.categoryKey || legacyPost?.category || '';
    return {
      title,
      description,
      date,
      category,
      content,
      keywords: '',
      isBuyingGuide: false,
      linkedProducts: [] as string[],
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

  // Sidebar 14 条热门产品 — K3 8/4 11:02 拍板
  // Q1=C: 用 GSC 数据 (popularity.ts matrix.json priority_boost 8/6 周三跑出后自动填)
  // Q2=A: CSS marquee 14 条全 DOM, 5 visible
  const hotProducts = getTopSkuByCategory(14);

  // 2026-08-05 K3 14:50 紧急 DEBUG (bc7cd62 验证揭露): post.title?.[locale] 永远是 undefined
  // 因为 getPostData() 返回的 post.title 已经是 string (locale-specific), 不是 Record<Locale, string>
  // post.categoryKey 也不存在 (getPostData 没返回这字段)
  // 真正根因: getPostData 用了 meta?.title?.[locale] 已经是 string, 我之前用 post.title?.[locale] = string[locale] = undefined
  // 真修法: 直接用 post.title (string) + 智能判断 category

  // 1) 智能推断 finalBlogCat (按 K3 14:20 拍板: 跟 blog 标题核心产品类目相同)
  // - post.title: 已经 getPostData 处理好的 locale-specific string
  // - post.category: getPostData 返回的 category (可能是 product slug 'paper-bags' 或中文 '印刷知識' 或 legacy 字符串)
  // 修法: 优先 trust post.category 如果是 13 个有效 product category_slug 之一
  //       否则 fallback 跑 inferBlogCategory (title 关键词推断)
  // 2026-08-05 15:30 K3 P0 修复: blogCat 必须在 if/else 双分支都定义, 否则 DEBUG marker 引用 ReferenceError → 19/24 blog 500
  const validProductCategorySlugs = ['paper-bags','flyers','stickers','packaging','posters','books','menus','envelopes','calendars','red-packets','banners','educational','japan-doujin'];
  let finalBlogCat: string;
  let blogCat: string | undefined;  // hoisted: 避免 JSX 引用时 ReferenceError
  if (post.category && validProductCategorySlugs.includes(post.category)) {
    // post.category 是有效 product category_slug (meta path 来自 BlogPostMeta.categoryKey)
    blogCat = post.category;
    finalBlogCat = post.category;
  } else {
    // post.category 是中文/英文字符串 (buying-guide path 来自 guide.category[locale])
    //    跑 inferBlogCategory title 关键词推断 (zh-hk/en/ja 标题都含类目关键词)
    blogCat = inferBlogCategory({
      title: post.title,  // string 不是 Record<Locale, string> (getPostData 已处理)
      category: post.category,
    });
    finalBlogCat = blogCat;
  }
  const linkedProducts = getRelatedByCategory(finalBlogCat, 4);
  // 2026-08-05 15:30 K3 P0 修复: 移除 DEBUG marker (避免后续改 scope 又踩雷, 验证流程跑独立 Python 脚本)

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
                  {/* 2026-08-05 15:30 K3 P0 修复: DEBUG marker 移除, 验证走独立 Python 脚本 */}
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
                            alt={getProductDisplayTitle(product, locale)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="text-sm font-bold text-[#333333] line-clamp-2 group-hover:text-[#2873F5] transition-colors">
                            {getProductDisplayTitle(product, locale)}
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
              {/* 2026-08-04 K3 拍板 Q2=A: CSS marquee 14 条全 DOM, 5 visible
                  14 类各 1 条 top SKU (popularity.ts), 全部在 DOM 让 Googlebot 抓全 14 link
                  (K3 评估: 比 B 静态 5 条多 9 link 内链传递)
                  2026-08-05 K3 12:24 拍板 B: 滚动太快, 改 3 visible + 滚动更慢
                  - h-[400px] (3 visible, 每条 ~130px 含图+标题+描述+价格)
                  - animationDuration: 14*2.5=35s → 14*5=70s (慢 2x, 用户能看清 1 条)
                  - 14 条总数保留 (SEO 内链 + 全部 13 类非贺卡类目 1 条 top SKU, K3 8/4 决策不受影响)
                  2026-08-05 K3 14:00 拍板 C: 窗口高度加高 2 倍 + 标题字号放大 1.5 倍
                  - h-[400px] → h-[800px] (3 visible → 6 visible, 用户一眼看到 6 个 SKU 选择)
                  - 标题 text-[11px] → text-[17px] (11 × 1.5 ≈ 17, 整 17px 适配 sidebar 280px 宽度)
                  - 14 条全 DOM 保留 (SEO 内链 + 13 类非贺卡类目 top SKU 不变) */}
              <div
                className="overflow-hidden h-[800px] relative"
                style={{ maskImage: 'linear-gradient(to bottom, black 0%, black 95%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 95%, transparent 100%)' }}
              >
                <div className="marquee-vertical space-y-5" style={{ animationDuration: `${hotProducts.length * 5}s` }}>
                  {[...hotProducts, ...hotProducts].map((product, idx) => (
                    <Link
                      key={`${product.sku_code}-${idx}`}
                      href={`${localePrefix}/product/${product.slug}/`}
                      className="group block"
                    >
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-50 mb-3">
                        <Image
                          src={getProductMainImage(product, locale)}
                          alt={getProductDisplayTitle(product, locale)}
                          width={300}
                          height={225}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          unoptimized
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      {/* 2026-08-05 K3 12:24 拍板: 标题用 getProductDisplayTitle (长尾词+核心词版) 替代 getProductTitle (短名版)
                          e.g. flyer blog sidebar 显示 "A4宣傳單張印刷 100張起印 HK$0.3/張 雙面彩印 | 智印港 ZprintPro" 而不是 "A4宣傳單張"
                          line-clamp-1 + 字号小 11px + sidebar 240-280px 宽度, 强制单行展示 (不再截断)
                          2026-08-05 K3 14:00 拍板: 标题字号放大 1.5 倍 (11px → 17px) 配合 6 visible
                          (整 17px 适配 sidebar 280px 宽度, line-clamp-1 单行, 长尾词标题"·品质保证·智印港" 仍能展示) */}
                      <h4 className="text-[17px] font-semibold text-[#333333] group-hover:text-[#2873F5] transition-colors line-clamp-1 leading-tight">
                        {getProductDisplayTitle(product, locale)}
                      </h4>
                      {/* K3 11:13 拍板: 2 行小字 描述 */}
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {getProductDescription(product, locale)}
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
      </div>
    </main>
  );
}
