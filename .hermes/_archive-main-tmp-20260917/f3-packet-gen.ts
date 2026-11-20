/* F3 ja 数据包生成器: 99 个 ja 薄内容 SKU → .hermes/f3-packets/<slug>.json
   数据源: products.ts ja 字段 + conversion ja + GSC ja 查询 + 现有 ja body 事实 + FAQ ja + RegionalContent ja */
import * as fs from 'fs';
import * as path from 'path';
import { products, categories } from '../src/data/products';
import { getConversionBlocks } from '../src/data/category-conversion-blocks';
import { skuSeoData } from '../src/data/sku-seo-data';
import { coreProductFAQMap } from '../src/data/product-faqs';

// ja 词数 (Intl.Segmenter 词粒度)
const jaWc = (s: string): number => {
  if (!s) return 0;
  const seg = new Intl.Segmenter('ja', { granularity: 'word' });
  return [...seg.segment(s.replace(/\*\*[^*]+\*\*/g, ''))].filter((x) => x.isWordLike).length;
};
const OUT = path.resolve(__dirname, 'f3-packets');
fs.mkdirSync(OUT, { recursive: true });

// GSC ja 查询
const gsc = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'enja28d-queries.json'), 'utf8')).ja as { query: string; imp: number; pos: number }[];

// query → 品类关键词映射 (ja)
const CAT_KEYS: [string, string[]][] = [
  ['stickers', ['ステッカー', 'シール', 'ラベル']],
  ['flyers', ['チラシ', 'フライヤー', 'ビラ']],
  ['packaging', ['パッケージ', '箱', 'ボックス', '化粧']],
  ['posters', ['ポスター']],
  ['paper-bags', ['紙袋', 'バッグ']],
  ['books', ['冊子', 'カタログ', '製本', '本', '印刷製本', '中綴じ', '無線綴じ']],
  ['calendars', ['カレンダー', '暦']],
  ['educational', ['教材', '教科書', '卒業', 'アルバム', 'テキスト']],
  ['japan-doujin', ['同人', 'コミケ', '缶バッジ', 'バッジ']],
  ['menus', ['メニュー', 'メニュ】']],
  ['banners', ['バナー', '懸垂']],
  ['red-packets', ['ポチ袋', '紅包', 'お年玉']],
  ['greeting-cards', ['グリーティングカード', '年賀状', 'カード']],
  ['wedding-invitations', ['ウェディング', '招待状', '結婚式']],
  ['place-cards', ['席札', 'ネームカード', 'テーブルカード']],
];
const catGscWords = (cat: string): { query: string; imp: number; pos: number }[] => {
  const keys = CAT_KEYS.find(([c]) => c === cat)?.[1] ?? [];
  return gsc.filter((q) => keys.some((k) => q.query.includes(k)));
};

// 统一 ja 区域性锚点 (既有口径, 禁改; 源 = RegionalContent.tsx ja + RegionalCta ja + TrustBadgeBlock JA_*)
const REGIONAL_JA = {
  trustSignals: '品質管理徹底（QCチェック体制）· 納期厳守（航空便3-5日）· 日本語サポート対応 · ISO9001認証取得',
  shipping: '深圳から日本へ国際配送（航空便3-5日、税関対応可）· DHL/FedEx追跡番号付き · 日本全国対応',
  pricingNote: '表示価格はHKDです。日本円（JPY）でのお見積もりも対応可能です。追加料金なしの工場直送価格をご提供します。',
  contactCta: 'お見積もり依頼（日本語対応）',
  expertIntro: '智印港（ZprintPro）は、彩龍印刷が運営する国際印刷サービスブランドです。深圳自社工場から、DHL Express で日本を含む全世界へ高品質印刷を輸出しています。日本市場特有の品質基準への適合、厳密な納期管理、日本語対応スタッフによる丁寧なサポートで、深圳から日本への高品質印刷輸出を実現します。',
  leadTime: '標準納期 5-7 営業日（急ぎは即日対応も可能）',
};

const RULES = [
  '只许从 4 个真实数据源组装: ① 本包 product 的 nameJa/descriptionJa/specs/features/price_range/minQuantity ② 本包 category 的 conversion orderFlow 场景 (若有, ja 版) ③ 现有 ja body 的事实 (数字只能用它已含的) ④ 本包 GSC ja 词自然织入 1-2 次',
  '禁止编造: 数字/认证/交期/客户名/行业事实 (价格只能用 price_range, 交期只能用 REGIONAL_JA.leadTime/conversion 已有口径 3-5日/2-4日等)',
  '禁止跨 SKU 复制同一段文字 — 每个 SKU 组装结果必须唯一 (同品类相邻 SKU 也禁整段雷同)',
  '字数: 新 body ≥ 180 ja 词 (用 Intl.Segmenter 的 ja 词粒度计数, 大致 = 350-500 日文字符; 含 FAQ 段); 结构 = 引言段 + 场景段 2-3 段 (含品类 GSC ja 词自然出现 1-2 次) + 材質/規格段 (从 specs/features 事实转日文散文) + 収費/納期段 (用 price_range/minQuantity + 既有納期口径) + **FAQ** 段 (2-3 问, 从 FAQ ja 数据改写, 禁新数字) + 結尾 CTA 段',
  '段落用 \\n\\n 分隔; FAQ 段用 **FAQ** 开头, 问题用 **Q1: ...** 加答案 (日文)',
  '原稿仕様: 収費/納期段后加一段以「原稿仕様：」开头 (可含 解像度300DPI/CMYK/塗り足し3mm/フォントアウトライン化, 以及「デザインデータがない場合は、無料レイアウトサービスを提供します。」结尾)',
  'ja 内容红线: 不出现 名片/business card (§0.0); 不出现「深圳」「中国」「深セン」「China」作供应商前缀 (可用「アジアの自社工場」); 不出现简体中文句子 (日文漢字 OK, 但不得整句简体中文); 品牌只用「ZprintPro」(不写 ジープリント/智印港)',
  '不要修改 title/description/h1/keywords — 只产出 body',
  '输出 JSON: {"slug": "<slug>", "body": "<完整 ja body>"}',
];

let ts = '';
for (const p of products) {
  const b = skuSeoData?.[p.slug]?.seo?.ja?.body;
  if (jaWc(b) >= 180) continue;
  const cat = categories.find((c) => c.slug === p.category_slug);
  const conv = getConversionBlocks(p.category_slug, 'ja');
  const gscWords = catGscWords(p.category_slug);
  const faqs = (coreProductFAQMap[p.category_slug] || coreProductFAQMap['educational'] || [])
    .map((f: { question: Record<string, string>; answer: Record<string, string> }) => ({
      q: f.question['ja'] || f.question['zh-hk'],
      a: f.answer['ja'] || f.answer['zh-hk'],
    }))
    .slice(0, 4);
  const packet = {
    slug: p.slug,
    name_ja: (p as any).nameJa || (p as any).title_ja || skuSeoData?.[p.slug]?.name?.ja || p.slug,
    category_slug: p.category_slug,
    category_name_ja: cat?.nameJa || cat?.name || p.category_slug,
    current_body_ja: b || '',
    current_body_words: jaWc(b),
    product: {
      descriptionJa: (p as any).descriptionJa || '',
      price_range: p.price_range,
      minQuantity: p.minQuantity,
      specs: p.specs || {},
      materials: (p as any).materials || '',
      features: p.features || [],
    },
    category_conversion_ja: conv?.orderFlow
      ? { title: conv.orderFlow.title, steps: conv.orderFlow.steps.map((s) => ({ title: s.title, desc: s.desc })) }
      : null,
    faq_ja: faqs,
    category_gsc_words_ja: gscWords.map((q) => `${q.query} (imp ${q.imp}, pos ${q.pos})`),
    regional_ja: REGIONAL_JA,
    rules: RULES,
  };
  fs.writeFileSync(path.join(OUT, `${p.slug}.json`), JSON.stringify(packet, null, 1), 'utf8');
  ts += `${p.slug}\n`;
}
const files = fs.readdirSync(OUT).filter((f) => f.endsWith('.json'));
console.log(`packets: ${files.length}`);
const byCat: Record<string, string[]> = {};
for (const f of files) {
  const p = JSON.parse(fs.readFileSync(path.join(OUT, f), 'utf8'));
  (byCat[p.category_slug] ||= []).push(p.slug);
}
for (const [c, l] of Object.entries(byCat)) console.log(`  ${c} (${l.length}): ${l.join(',')}`);
