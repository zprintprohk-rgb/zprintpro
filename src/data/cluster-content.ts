/**
 * 内容集群元数据管理
 * 3 大支柱页 + 9 篇集群文章
 */

import { Locale } from '@/types/locale';

export interface ClusterArticle {
  slug: string;
  displayName: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  pillarSlug: string;
  linkedProducts: string[];
  keywords: Record<Locale, string[]>;
}

export interface PillarPage {
  slug: string;
  displayName: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  linkedSku: string;
}

export const pillarPages: PillarPage[] = [
  {
    slug: 'guide/stickers',
    displayName: {
      'zh-hk': '貼紙印刷完全指南',
      'en': 'Complete Sticker Printing Guide',
      'ja': 'シール印刷完全ガイド',
    },
    title: {
      'zh-hk': '貼紙印刷完全指南',
      'en': 'Complete Sticker Printing Guide',
      'ja': 'シール印刷完全ガイド',
    },
    description: {
      'zh-hk': '從材質選擇到工藝應用，全面了解香港貼紙印刷的專業知識。防水貼紙、透明貼紙、PVC貼紙、燙金貼紙一次搞懂。',
      'en': 'From material selection to finishing techniques, master the art of custom sticker printing. Waterproof, clear vinyl, PVC, and foil stickers explained.',
      'ja': '素材選びから加工技術まで、香港のシール印刷を完全マスター。防水シール、透明シール、PVCシール、箔押しシールを徹底解説。',
    },
    linkedSku: 'stickers',
  },
  {
    slug: 'guide/flyers',
    displayName: {
      'zh-hk': '宣傳單張印刷攻略',
      'en': 'Flyer Printing Masterclass',
      'ja': 'チラシ印刷マスターガイド',
    },
    title: {
      'zh-hk': '宣傳單張印刷攻略',
      'en': 'Flyer Printing Masterclass',
      'ja': 'チラシ印刷マスターガイド',
    },
    description: {
      'zh-hk': '傳單設計、印刷工藝到派發策略，打造高轉化率的宣傳單張。A5傳單、燙金傳單、摺頁傳單實戰指南。',
      'en': 'From design to print to distribution strategy, create high-converting flyers. A5, foil-stamped, and folded leaflet masterclass.',
      'ja': 'デザインから印刷、配布戦略まで、高いコンバージョンを実現するチラシづくり。A5チラシ、箔押しチラシ、折りパンフレットの実践ガイド。',
    },
    linkedSku: 'flyers',
  },
  {
    slug: 'guide/packaging',
    displayName: {
      'zh-hk': '品牌包裝完全指南',
      'en': 'Brand Packaging Guide',
      'ja': 'ブランド包装完全ガイド',
    },
    title: {
      'zh-hk': '品牌包裝完全指南',
      'en': 'Brand Packaging Guide',
      'ja': 'ブランド包装完全ガイド',
    },
    description: {
      'zh-hk': '從磁吸禮盒到環保紙袋，打造令人難忘的品牌包裝體驗。包裝設計、材質選擇、工藝應用全攻略。',
      'en': 'From rigid gift boxes to eco paper bags, create unforgettable brand packaging experiences. Design, materials, and finishing techniques.',
      'ja': '化粧箱からエコ紙袋まで、忘れられないブランド包装体験を創造。デザイン、素材、加工技術の完全ガイド。',
    },
    linkedSku: 'packaging-boxes',
  },
];

export const clusterArticles: ClusterArticle[] = [
  // 支柱页1：stickers 集群
  {
    slug: 'blog/sticker-materials',
    displayName: {
      'zh-hk': '防水貼紙材質比較：PVC vs 合成紙',
      'en': 'Waterproof Sticker Materials: PVC vs Synthetic Paper',
      'ja': '防水シール素材比較：PVCと合成紙',
    },
    title: {
      'zh-hk': '防水貼紙材質比較：PVC vs 合成紙',
      'en': 'Waterproof Sticker Materials: PVC vs Synthetic Paper',
      'ja': '防水シール素材比較：PVCと合成紙',
    },
    description: {
      'zh-hk': '深入比較防水貼紙的兩大主流材質：PVC貼紙與合成紙貼紙。從防水性、耐UV、成本到適用場景，助你選出最適合產品包裝的貼紙材質。',
      'en': 'Deep comparison of two mainstream waterproof sticker materials: PVC vs synthetic paper. From water resistance to UV durability to cost, find the best fit for your product packaging.',
      'ja': '防水シールの2大主流素材、PVCと合成紙を徹底比較。防水性、UV耐性、コストから最適なパッケージングシールを選びましょう。',
    },
    pillarSlug: 'guide/stickers',
    linkedProducts: ['stickers', 'posters'],
    keywords: {
      'zh-hk': ['PVC貼紙', '合成紙貼紙', '防水貼紙材質', '產品包裝貼紙'],
      'en': ['PVC stickers', 'synthetic paper stickers', 'waterproof sticker materials', 'product packaging stickers'],
      'ja': ['PVCシール', '合成紙シール', '防水シール素材', 'パッケージングシール'],
    },
  },
  {
    slug: 'blog/sticker-packaging-design',
    displayName: {
      'zh-hk': '產品包裝貼紙設計策略',
      'en': 'Product Packaging Sticker Design',
      'ja': '商品包装シールデザイン戦略',
    },
    title: {
      'zh-hk': '產品包裝貼紙設計的 5 個關鍵技巧',
      'en': '5 Key Tips for Product Packaging Sticker Design',
      'ja': 'パッケージングシールデザイン5つのコツ',
    },
    description: {
      'zh-hk': '產品包裝貼紙不僅是標籤，更是品牌的第一印象。從色彩心理學到燙金工藝，5個關鍵技巧讓你的貼紙在貨架上脫穎而出。',
      'en': 'Product packaging stickers are more than labels—they are your brand\'s first impression. From color psychology to foil stamping, 5 key tips to make your stickers stand out on shelves.',
      'ja': 'パッケージングシールはラベル以上のもの。ブランドの第一印象を左右します。色彩心理学から箔押し加工まで、シェルフで目立つ5つのコツ。',
    },
    pillarSlug: 'guide/stickers',
    linkedProducts: ['stickers', 'packaging-boxes'],
    keywords: {
      'zh-hk': ['產品包裝貼紙設計', '燙金貼紙設計', '品牌貼紙設計'],
      'en': ['packaging sticker design', 'foil sticker design', 'brand sticker design'],
      'ja': ['パッケージングシールデザイン', '箔押しシールデザイン', 'ブランドシールデザイン'],
    },
  },
  {
    slug: 'blog/clear-vs-matte-stickers',
    displayName: {
      'zh-hk': '透明貼紙 vs 霧面貼紙',
      'en': 'Clear vs Matte Stickers',
      'ja': '透明シール vs マットシール',
    },
    title: {
      'zh-hk': '透明貼紙與霧面貼紙選擇指南',
      'en': 'Clear vs Matte Stickers: Which to Choose?',
      'ja': '透明シールとマットシールの選び方',
    },
    description: {
      'zh-hk': '透明貼紙營造「無標籤」高級感，霧面貼紙則減少反光提升質感。兩者適用場景大不同，一文搞懂如何為你的產品選擇最適合的貼紙類型。',
      'en': 'Clear stickers create a "no-label" premium look, while matte stickers reduce glare for enhanced texture. Their ideal use cases differ significantly—learn which suits your product best.',
      'ja': '透明シールは「ラベルなし」の高級感を、マットシールは反射を抑えた質感を演出。それぞれの最適な使用場面を解説します。',
    },
    pillarSlug: 'guide/stickers',
    linkedProducts: ['stickers'],
    keywords: {
      'zh-hk': ['透明貼紙', '霧面貼紙', '貼紙選擇指南'],
      'en': ['clear stickers', 'matte stickers', 'sticker selection guide'],
      'ja': ['透明シール', 'マットシール', 'シール選び方'],
    },
  },
  // 支柱页2：flyers 集群
  {
    slug: 'blog/flyer-sizes-compared',
    displayName: {
      'zh-hk': 'A5 vs A6 傳單尺寸效果比較',
      'en': 'A5 vs A6 Flyer Comparison',
      'ja': 'A5 vs A6 チラシサイズ比較',
    },
    title: {
      'zh-hk': 'A5 vs A6 傳單尺寸效果比較',
      'en': 'A5 vs A6 Flyer Sizes: Impact on ROI',
      'ja': 'チラシサイズ比較：A5とA6の効果',
    },
    description: {
      'zh-hk': '傳單尺寸直接影響派發效果與成本。A5傳單適合詳細資訊展示，A6傳單則適合快速派發。從ROI角度分析兩者的最佳應用場景。',
      'en': 'Flyer size directly impacts distribution effectiveness and cost. A5 flyers suit detailed information, while A6 flyers excel at rapid handouts. Analyze the best use cases from an ROI perspective.',
      'ja': 'チラシサイズは配布効果とコストに直接影響。A5は詳細情報に、A6は素早い配布に適しています。ROIの観点から最適な使用場面を分析します。',
    },
    pillarSlug: 'guide/flyers',
    linkedProducts: ['flyers', 'posters'],
    keywords: {
      'zh-hk': ['A5傳單尺寸', 'A6傳單尺寸', '傳單ROI', '傳單效果比較'],
      'en': ['A5 flyer size', 'A6 flyer size', 'flyer ROI', 'flyer comparison'],
      'ja': ['A5チラシサイズ', 'A6チラシサイズ', 'チラシROI', 'チラシ比較'],
    },
  },
  {
    slug: 'blog/flyer-distribution-strategy',
    displayName: {
      'zh-hk': '傳單派發策略與印刷配合指南',
      'en': 'Flyer Distribution Strategy',
      'ja': 'チラシ配布戦略と印刷の連携',
    },
    title: {
      'zh-hk': '傳單派發策略與印刷配合指南',
      'en': 'Flyer Distribution Strategy & Print Coordination',
      'ja': 'チラシ配布戦略と印刷の連携',
    },
    description: {
      'zh-hk': '高效的宣傳單張派發需要策略配合。從目標區域選擇、時段配合到傳單設計，打造高轉化率的傳單派發計劃。',
      'en': 'Effective flyer distribution requires strategic coordination. From target area selection to timing alignment to flyer design, build a high-conversion distribution plan.',
      'ja': '効果的なチラシ配布には戦略的な連携が必要。ターゲットエリア選定からタイミング調整、デザインまで、高コンバージョンの配布計画を構築します。',
    },
    pillarSlug: 'guide/flyers',
    linkedProducts: ['flyers'],
    keywords: {
      'zh-hk': ['傳單派發策略', '宣傳單張派發', '傳單印刷配合'],
      'en': ['flyer distribution strategy', 'leaflet distribution', 'flyer print coordination'],
      'ja': ['チラシ配布戦略', 'パンフレット配布', 'チラシ印刷連携'],
    },
  },
  {
    slug: 'blog/foil-flyers-industry',
    displayName: {
      'zh-hk': '燙金傳單行業應用',
      'en': 'Foil Flyer Industry Applications',
      'ja': '箔押しチラシの業界応用',
    },
    title: {
      'zh-hk': '燙金傳單適合什麼行業？',
      'en': 'Foil Flyers: Best Industries for Luxury Print',
      'ja': '箔押しチラシが適した業種は？',
    },
    description: {
      'zh-hk': '燙金傳單能瞬間提升品牌檔次，但並非所有行業都適合。分析奢侈品、美容護膚、高端餐飲等行業使用燙金傳單的最佳實踐。',
      'en': 'Foil flyers instantly elevate brand perception, but not all industries benefit equally. Analyze best practices for luxury, beauty, fine dining, and financial services.',
      'ja': '箔押しチラシはブランドイメージを瞬時に向上させますが、すべての業種に同様に効果があるわけではありません。ラグジュアリー、ビューティー、高級飲食のベストプラクティスを分析します。',
    },
    pillarSlug: 'guide/flyers',
    linkedProducts: ['flyers', 'paper-bags'],
    keywords: {
      'zh-hk': ['燙金傳單行業', '燙金傳單應用', '高端傳單設計'],
      'en': ['foil flyer industries', 'foil flyer applications', 'luxury flyer design'],
      'ja': ['箔押しチラシ業種', '箔押しチラシ応用', '高級チラシデザイン'],
    },
  },
  // 支柱页3：packaging 集群
  {
    slug: 'blog/rigid-vs-folding-boxes',
    displayName: {
      'zh-hk': '磁吸禮盒與摺疊盒成本比較',
      'en': 'Rigid Box vs Folding Carton',
      'ja': '箱包装の種類とコスト比較',
    },
    title: {
      'zh-hk': '磁吸禮盒與摺疊盒成本比較',
      'en': 'Rigid Box vs Folding Carton: Cost Breakdown',
      'ja': '箱包装の種類とコスト比較',
    },
    description: {
      'zh-hk': '磁吸禮盒（Rigid Box）與摺疊盒（Folding Carton）在成本、質感、運輸效率上各有優劣。從品牌定位與預算出發，選出最適合的包裝盒類型。',
      'en': 'Rigid boxes and folding cartons each have pros and cons in cost, texture, and shipping efficiency. Choose the best packaging type based on brand positioning and budget.',
      'ja': '化粧箱と組み立て箱は、コスト、質感、配送効率にそれぞれ長所と短所があります。ブランドポジショニングと予算に基づいて最適な包装タイプを選びましょう。',
    },
    pillarSlug: 'guide/packaging',
    linkedProducts: ['packaging-boxes'],
    keywords: {
      'zh-hk': ['磁吸禮盒成本', '摺疊盒成本', '包裝盒比較', '禮盒定制'],
      'en': ['rigid box cost', 'folding carton cost', 'packaging box comparison', 'gift box custom'],
      'ja': ['化粧箱コスト', '組み立て箱コスト', '包装箱比較', 'ギフト箱オーダー'],
    },
  },
  {
    slug: 'blog/eco-paper-bag-gsm',
    displayName: {
      'zh-hk': '環保紙袋趨勢與克重選擇指南',
      'en': 'Eco Paper Bag Trends & GSM Selection',
      'ja': 'エコ紙袋のトレンドと厚さ選び',
    },
    title: {
      'zh-hk': '環保紙袋趨勢與克重選擇指南',
      'en': 'Eco Paper Bag Trends & GSM Selection Guide',
      'ja': 'エコ紙袋のトレンドと厚さ選び',
    },
    description: {
      'zh-hk': '環保紙袋已成為品牌ESG策略的重要一環。從FSC認證到克重選擇（120gsm-350gsm），一文搞懂如何打造既環保又耐用的品牌紙袋。',
      'en': 'Eco paper bags have become a key part of brand ESG strategies. From FSC certification to GSM selection (120gsm-350gsm), learn how to create eco-friendly yet durable branded bags.',
      'ja': 'エコ紙袋はブランドのESG戦略の重要な一部となっています。FSC認証から厚さ選び（120gsm-350gsm）まで、環境に優しく耐久性のあるブランド紙袋の作り方を解説します。',
    },
    pillarSlug: 'guide/packaging',
    linkedProducts: ['paper-bags'],
    keywords: {
      'zh-hk': ['環保紙袋趨勢', '紙袋克重選擇', 'FSC紙袋', '品牌紙袋'],
      'en': ['eco paper bag trends', 'paper bag GSM selection', 'FSC paper bags', 'branded paper bags'],
      'ja': ['エコ紙袋トレンド', '紙袋厚さ選び', 'FSC紙袋', 'ブランド紙袋'],
    },
  },
  {
    slug: 'blog/packaging-color-psychology',
    displayName: {
      'zh-hk': '包裝設計色彩心理學',
      'en': 'Packaging Color Psychology',
      'ja': 'パッケージデザインの色彩心理学',
    },
    title: {
      'zh-hk': '包裝設計色彩心理學',
      'en': 'Packaging Color Psychology for Brands',
      'ja': 'パッケージデザインの色彩心理学',
    },
    description: {
      'zh-hk': '色彩直接影響消費者的購買決策。從紅色的促銷效應到黑色的奢華感，分析不同行業的包裝色彩策略，助你選出最能打動目標客戶的包裝配色。',
      'en': 'Color directly influences consumer purchasing decisions. From red\'s promotional effect to black\'s luxury appeal, analyze packaging color strategies across industries to choose the palette that resonates with your target audience.',
      'ja': '色彩は消費者の購買決定に直接影響します。赤のプロモーション効果から黒のラグジュアリー感まで、業種別のパッケージ色彩戦略を分析し、ターゲット層に響く配色を選びましょう。',
    },
    pillarSlug: 'guide/packaging',
    linkedProducts: ['packaging-boxes', 'paper-bags'],
    keywords: {
      'zh-hk': ['包裝色彩心理學', '品牌包裝配色', '包裝設計策略'],
      'en': ['packaging color psychology', 'brand packaging colors', 'packaging design strategy'],
      'ja': ['パッケージ色彩心理学', 'ブランド包装配色', 'パッケージデザイン戦略'],
    },
  },
];
