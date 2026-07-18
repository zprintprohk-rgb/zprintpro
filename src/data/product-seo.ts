/**
 * 5 大核心 SKU 的 SEO 元数据集中管理
 */

import { Locale } from '@/types/locale';
import { SEOMetadata } from '@/types/seo';

export const coreProductSEO: Record<string, Record<Locale, SEOMetadata>> = {
  stickers: {
    'zh-hk': {
      title: '防水貼紙印刷 香港 | 透明/PVC/燙金貼紙 少批量定制 | ZprintPro 智印雲',
      description: '香港專業貼紙印刷服務，防水貼紙、透明貼紙、PVC貼紙、燙金貼紙少批量起訂。九龍/港島/新界即日可取，產品包裝貼紙一站式定制。',
      canonical: 'https://zprintpro.com/zh-hk/products/stickers',
      ogImage: 'https://zprintpro.com/images/hero/stickers-zh-hk.webp',
      ogType: 'product',
      locale: 'zh-hk',
      keywords: ['防水貼紙 香港', '透明貼紙', 'PVC貼紙', '燙金貼紙', '少批量貼紙印刷', '產品包裝貼紙', '九龍 貼紙', '港島 貼紙'],
    },
    'en': {
      title: 'Custom Waterproof Stickers | Die Cut, Clear, Foil | ZprintPro',
      description: 'Premium custom sticker printing, factory-direct. Waterproof, die cut, clear vinyl, hologram, and foil stickers. Bulk & small orders. Fast shipping to US/UK/AU.',
      canonical: 'https://zprintpro.com/en/products/stickers',
      ogImage: 'https://zprintpro.com/images/hero/stickers-en.webp',
      ogType: 'product',
      locale: 'en',
      keywords: ['waterproof stickers usa', 'die cut stickers custom', 'clear vinyl stickers', 'hologram stickers', 'foil stickers', 'bulk sticker printing', 'sticker packaging'],
    },
    'ja': {
      title: '防水シール印刷 香港 | 透明/箔押し/和紙シール 少ロット対応 | ZprintPro',
      description: '香港の高品質シール印刷サービス。防水シール、透明シール、箔押しシール、和紙シールに対応。少ロットから承り、日本へ国際配送。',
      canonical: 'https://zprintpro.com/ja/products/stickers',
      ogImage: 'https://zprintpro.com/images/hero/stickers-ja.webp',
      ogType: 'product',
      locale: 'ja',
      keywords: ['防水シール 香港', '透明シール', '箔押しシール', '和紙シール', '少ロット シール', 'シール印刷 オーダー', 'パッケージング シール'],
    },
  },
  flyers: {
    'zh-hk': {
      title: 'A5傳單印刷 香港 | 宣傳單張派發 即日取 | 燙金傳單定制 | ZprintPro',
      description: '香港專業傳單印刷服務，A5/A4宣傳單張、燙金傳單、摺頁傳單少批量起訂。港島/九龍/新界即日可取，配合派發策略一站式解決。',
      canonical: 'https://zprintpro.com/zh-hk/products/flyers',
      ogImage: 'https://zprintpro.com/images/hero/flyers-zh-hk.webp',
      ogType: 'product',
      locale: 'zh-hk',
      keywords: ['A5傳單印刷 港島', '宣傳單張派發 九龍', '燙金傳單 奢侈品', '少批量傳單', '即日取傳單', '香港傳單印刷', '摺頁傳單'],
    },
    'en': {
      title: 'Flyer Printing | Same Day A5/A4 Leaflets | ZprintPro',
      description: 'Professional flyer and leaflet printing, factory-direct. A5/A4, folded, foil-stamped flyers for events and promotions. Same-day production available. Fast shipping to US/UK/AU.',
      canonical: 'https://zprintpro.com/en/products/flyers',
      ogImage: 'https://zprintpro.com/images/hero/flyers-en.webp',
      ogType: 'product',
      locale: 'en',
      keywords: ['flyer printing same day', 'leaflet printing uk cheap', 'A5 flyer printing', 'foil flyers', 'event flyers usa', 'same day leaflet printing'],
    },
    'ja': {
      title: 'チラシ印刷 香港 | A5/A4 即日対応 少ロット | ZprintPro',
      description: '香港のプロフェッショナルチラシ印刷サービス。A5/A4チラシ、折りパンフレット、箔押しチラシに対応。即日納品可能。日本へ国際配送。',
      canonical: 'https://zprintpro.com/ja/products/flyers',
      ogImage: 'https://zprintpro.com/images/hero/flyers-ja.webp',
      ogType: 'product',
      locale: 'ja',
      keywords: ['チラシ印刷 即日 香港', '少ロット チラシ オーダー', 'A5チラシ印刷', '箔押しチラシ', 'イベントチラシ', 'パンフレット印刷'],
    },
  },
  'packaging-boxes': {
    'zh-hk': {
      title: '磁吸禮盒 香港 定制 | 環保包裝盒/化妝品盒 燙金 | ZprintPro',
      description: '香港專業包裝盒定制服務，磁吸禮盒、環保包裝盒、化妝品盒燙金工藝。新界/九龍/港島即日打樣，FSC認證紙張，品牌包裝一站式解決。',
      canonical: 'https://zprintpro.com/zh-hk/products/packaging-boxes',
      ogImage: 'https://zprintpro.com/images/hero/packaging-zh-hk.webp',
      ogType: 'product',
      locale: 'zh-hk',
      keywords: ['磁吸禮盒 香港 定制', '環保包裝盒 新界', '化妝品盒 燙金 九龍', '禮品盒定制', '品牌包裝盒', '小批量包裝盒', 'FSC包裝盒'],
    },
    'en': {
      title: 'Custom Packaging Boxes | Rigid, Eco Gift Boxes | ZprintPro',
      description: 'Custom packaging box printing, factory-direct. Rigid boxes, eco-friendly gift boxes, cosmetic packaging with foil stamping. Same-day sampling. Fast shipping to US/UK/AU.',
      canonical: 'https://zprintpro.com/en/products/packaging-boxes',
      ogImage: 'https://zprintpro.com/images/hero/packaging-en.webp',
      ogType: 'product',
      locale: 'en',
      keywords: ['rigid box packaging usa', 'eco friendly gift boxes uk', 'custom packaging boxes', 'cosmetic box printing', 'gift box wholesale', 'magnetic closure box'],
    },
    'ja': {
      title: '箱包装 オーダーメイド 香港 | ギフトボックス/化粧品箱 | ZprintPro',
      description: '香港の高品質箱包装オーダーメイドサービス。ギフトボックス、化粧品箱、エコ包装に対応。箔押し・UV加工。即日サンプル。日本へ国際配送。',
      canonical: 'https://zprintpro.com/ja/products/packaging-boxes',
      ogImage: 'https://zprintpro.com/images/hero/packaging-ja.webp',
      ogType: 'product',
      locale: 'ja',
      keywords: ['ギフトボックス オーダーメイド 香港', '箱包装 オーダー', '化粧品箱 印刷', 'エコ包装箱', 'マグネット蓋箱', 'ブランド包装'],
    },
  },
  posters: {
    'zh-hk': {
      title: 'A2海報印刷 香港 | 戶外防水海報/展覽海報燙金 | ZprintPro',
      description: '香港專業海報印刷服務，A2/A1/A0海報、戶外防水海報、展覽海報燙金工藝。九龍/港島/新界即日可取，Backdrop背景板、PP裱貼一站式解決。',
      canonical: 'https://zprintpro.com/zh-hk/products/posters',
      ogImage: 'https://zprintpro.com/images/hero/posters-zh-hk.webp',
      ogType: 'product',
      locale: 'zh-hk',
      keywords: ['A2海報印刷 香港', '戶外防水海報 九龍', '展覽海報 燙金', 'A1海報印刷', 'Backdrop背景板', 'PP裱貼海報', '海報派發'],
    },
    'en': {
      title: 'Poster Printing | A2/A1 Outdoor Waterproof | ZprintPro',
      description: 'Professional poster printing, factory-direct. A2/A1/A0 posters, outdoor waterproof, exhibition backdrops, PP lamination. Same-day production available. Fast shipping to US/UK/AU.',
      canonical: 'https://zprintpro.com/en/products/posters',
      ogImage: 'https://zprintpro.com/images/hero/posters-en.webp',
      ogType: 'product',
      locale: 'en',
      keywords: ['A1 poster printing usa', 'outdoor posters australia', 'exhibition backdrop printing', 'waterproof poster printing', 'same day poster printing', 'PP laminated posters'],
    },
    'ja': {
      title: 'ポスター印刷 香港 | A2/A1 防水/展示会用 | ZprintPro',
      description: '香港のプロフェッショナルポスター印刷サービス。A2/A1/A0ポスター、屋外用防水ポスター、展示会用バックドロップ、PPラミネート対応。即日納品可能。',
      canonical: 'https://zprintpro.com/ja/products/posters',
      ogImage: 'https://zprintpro.com/images/hero/posters-ja.webp',
      ogType: 'product',
      locale: 'ja',
      keywords: ['ポスター印刷 防水 香港', 'A2ポスター印刷', '屋外ポスター 印刷', '展示会バックドロップ', 'PPラミネートポスター', '即日ポスター印刷'],
    },
  },
  'paper-bags': {
    'zh-hk': {
      title: '環保紙袋 香港 定制 | 牛皮紙袋/禮品紙袋燙金 | ZprintPro',
      description: '香港專業紙袋印刷服務，環保紙袋、牛皮紙袋、禮品紙袋燙金工藝。九龍/港島/新界即日可取，FSC認證環保紙張，品牌紙袋一站式定制。',
      canonical: 'https://zprintpro.com/zh-hk/products/paper-bags',
      ogImage: 'https://zprintpro.com/images/hero/paper-bags-zh-hk.webp',
      ogType: 'product',
      locale: 'zh-hk',
      keywords: ['環保紙袋 香港 定制', '牛皮紙袋 九龍 少量', '禮品紙袋 燙金 港島', 'FSC紙袋', '品牌紙袋印刷', '手提紙袋定制', '小批量紙袋'],
    },
    'en': {
      title: 'Custom Paper Bags | Eco Kraft, Gift Bags | ZprintPro',
      description: 'Custom paper bag printing, factory-direct. Eco-friendly kraft bags, gift bags with foil stamping, retail shopping bags. FSC-certified paper. Fast shipping to US/UK/AU.',
      canonical: 'https://zprintpro.com/en/products/paper-bags',
      ogImage: 'https://zprintpro.com/images/hero/paper-bags-en.webp',
      ogType: 'product',
      locale: 'en',
      keywords: ['eco paper bags wholesale usa', 'kraft paper bags uk custom', 'custom paper bags', 'gift bag printing', 'retail shopping bags', 'foil stamped paper bags'],
    },
    'ja': {
      title: '紙袋印刷 香港 | エコ/クラフト/ギフト袋 少ロット | ZprintPro',
      description: '香港の高品質紙袋印刷サービス。エコ紙袋、クラフト紙袋、ギフト袋の箔押し加工に対応。FSC認証紙使用。少ロットから承り、日本へ国際配送。',
      canonical: 'https://zprintpro.com/ja/products/paper-bags',
      ogImage: 'https://zprintpro.com/images/hero/paper-bags-ja.webp',
      ogType: 'product',
      locale: 'ja',
      keywords: ['紙袋 オーダーメイド 和紙', 'エコ紙袋 印刷', 'クラフト紙袋 オーダー', 'ギフト袋 箔押し', 'ブランド紙袋', '少ロット 紙袋'],
    },
  },
};

export function getProductSeo(slug: string): Record<Locale, SEOMetadata> | undefined {
  // 优先返回核心分类 SEO
  if (coreProductSEO[slug]) return coreProductSEO[slug];
  // Fallback 到全量 SKU SEO 数据（78 个）
  // 详情页用 getProductSeoSlugs() + getProductSeoEntry() 拿到完整信息
  return undefined;
}
