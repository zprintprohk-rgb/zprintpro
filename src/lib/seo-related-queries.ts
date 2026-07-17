/**
 * GSC top 5 关键词 → 专题页 slug 映射
 * 5 个高潜力关键词（展示>50，排名20-50）长尾扩展到对应专题页
 * 保留原页面 title/description，**只追加**长尾 FAQ 块和内部链接
 *
 * 数据来源：seo-weekly-report-2026-06-01.md + auto_patch_backup.py 思路
 */

import { Locale } from '@/types/locale';

export interface RelatedQuery {
  /** 关键词原文 */
  keyword: string;
  /** 展示次数 */
  impressions: number;
  /** 当前排名 */
  rank: number;
  /** 跳转目标专题页 slug */
  targetSlug: string;
  /** 该关键词在该 locale 的长尾问句 */
  longTail: Record<Locale, string[]>;
}

export const GSC_RELATED_QUERIES: RelatedQuery[] = [
  {
    keyword: '食品包裝印刷',
    impressions: 108,
    rank: 25.45,
    targetSlug: 'food-packaging',
    longTail: {
      'zh-hk': ['食品包裝印刷需要什麼認證？', '香港哪裡有印食品包裝盒？', '食品級包裝盒最小起訂量幾多？'],
      en: ['What certifications are needed for food packaging printing?', 'Where to print food packaging boxes worldwide?', 'What is the minimum order for food-grade boxes?'],
      ja: ['食品パッケージ印刷に必要な認証は？', '食品パッケージボックスを印刷できるところは？', '食品グレードボックスの最小注文数量は？'],
    },
  },
  {
    keyword: '宣傳單張',
    impressions: 84,
    rank: 42.9,
    targetSlug: 'flyers',
    longTail: {
      'zh-hk': ['宣傳單張印刷幾錢？', 'A4 宣傳單張尺寸幾多？', '哪裡印宣傳單張最平？'],
      en: ['How much does flyer printing cost?', 'What is A4 flyer size?', 'Where is the cheapest flyer printing?'],
      ja: ['チラシ印刷の料金は？', 'A4 チラシのサイズは？', '最も安いチラシ印刷は？'],
    },
  },
  {
    keyword: '宣傳單張印刷',
    impressions: 73,
    rank: 40.42,
    targetSlug: 'flyers',
    longTail: {
      'zh-hk': ['宣傳單張 A4 銅版紙印刷幾錢？', '即日取宣傳單張服務'], 
      en: ['A4 coated paper flyer printing cost?', 'Same-day flyer pickup service'],
      ja: ['A4コート紙チラシ印刷の料金は？', '即日チラシ受取サービス'],
    },
  },
  {
    keyword: '海報印刷',
    impressions: 65,
    rank: 38.31,
    targetSlug: 'menu-printing', // 海报类归到 menu/poster 主题
    longTail: {
      'zh-hk': ['海報印刷尺寸有邊啲？', '海報用咩紙好？', 'A2 海報印刷幾錢？'],
      en: ['What poster sizes are available?', 'What paper is best for posters?', 'How much is A2 poster printing?'],
      ja: ['ポスター印刷のサイズは？', 'ポスターは何の紙がいい？', 'A2 ポスター印刷の料金は？'],
    },
  },
  {
    keyword: '印海報',
    impressions: 58,
    rank: 38.43,
    targetSlug: 'menu-printing',
    longTail: {
      'zh-hk': ['印海報邊間最平？', '印海報一張起印？', 'A1 海報印即時取'],
      en: ['Where is cheapest poster printing?', 'Single poster printing?', 'A1 poster same-day pickup'],
      ja: ['最も安いポスター印刷は？', 'ポスター1枚から印刷？', 'A1 ポスター即日受取'],
    },
  },
];

/**
 * 关键词 → 目标 slug 快速查找
 */
export function getQueriesForSlug(slug: string): RelatedQuery[] {
  return GSC_RELATED_QUERIES.filter(q => q.targetSlug === slug);
}
