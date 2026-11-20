/* F2 en 数据包生成器: 63 个 en 薄内容 SKU → .hermes/f2-packets/<slug>.json
   数据源: products.ts + category-conversion-blocks en + GSC en 查询 + 现有 en body */
import * as fs from 'fs';
import * as path from 'path';
import { products, categories } from '../src/data/products';
import { getConversionBlocks } from '../src/data/category-conversion-blocks';
import { skuSeoData } from '../src/data/sku-seo-data';

const wc = (s: string) => (s || '').trim().split(/\s+/).filter(Boolean).length;
const OUT = path.resolve(__dirname, 'f2-packets');
fs.mkdirSync(OUT, { recursive: true });

// GSC en 查询 (imp≥3)
const gsc = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'enja28d-queries.json'), 'utf8')).en as { query: string; imp: number; pos: number }[];

// query → category 关键词映射
const CAT_KEYS: [string, string[]][] = [
  ['stickers', ['sticker', 'label printing', 'foil stickers']],
  ['flyers', ['flyer']],
  ['packaging', ['box', 'packaging', 'mailer']],
  ['posters', ['poster']],
  ['paper-bags', ['paper bag', 'bag']],
  ['books', ['booklet', 'catalog', 'catalogue', 'book']],
  ['calendars', ['calendar']],
  ['educational', ['textbook', 'certificate', 'yearbook', 'workbook', 'school']],
  ['japan-doujin', ['doujinshi', 'comiket', '同人']],
  ['menus', ['menu']],
  ['banners', ['banner', 'vinyl']],
  ['red-packets', ['red packet', 'red envelope', 'hongbao', '利是']],
  ['greeting-cards', ['greeting', 'card']],
  ['wedding-invitations', ['wedding', 'invitation', 'save the date']],
  ['place-cards', ['place card', 'escort', 'table card', 'name tag']],
];
const catGscWords = (cat: string): { query: string; imp: number; pos: number }[] => {
  const keys = CAT_KEYS.find(([c]) => c === cat)?.[1] ?? [];
  return gsc.filter((q) => keys.some((k) => q.query.toLowerCase().includes(k)));
};

// 统一 en 区域性锚点 (既有口径, 禁改)
const REGIONAL_EN = {
  trust: 'ISO 9001 certified production · 30-second AI quote · free digital proof · no setup fees · free design mockup',
  shipping: 'DHL Express / FedEx 3-5 days to the USA, 2-4 days to Japan · free shipping on US orders over $99 · worldwide delivery to 50+ countries',
  cta: 'Ready to order? Get a free digital proof within 1 hour — WhatsApp +86 198 8085 1334 or click the "30-second AI quote" button on the page.',
};

const RULES = [
  '只许从 4 个真实数据源组装: ① 本包 product 的 descriptionEn/specs/features/price_range/minQuantity ② 本包 category 的 conversion orderFlow 场景 (若有) ③ 现有 en body 的事实 (数字只能用它已含的) ④ 本包 GSC 词自然织入 1-2 次',
  '禁止编造: 数字/认证/交期/客户名/行业事实 (价格只能用 price_range, 交期只能用 body/conversion 已有口径 3-5 天/2-4 天等)',
  '禁止跨 SKU 复制同一段文字 — 每个 SKU 组装结果必须唯一 (同品类相邻 SKU 也禁整段雷同)',
  '字数: 新 body ≥ 180 词 (英文词数, 含 FAQ 段); 结构 = 引言段 + 场景段 2-3 段 (含品类 GSC 词自然出现 1-2 次) + 材質/規格段 (从 specs/features 事实转英文散文) + 收費/交期段 (用 price_range/minQuantity + 已有交期口径) + **FAQ** 段 (2-3 问, 从现有 FAQ/事实改写, 禁新数字) + 結尾 CTA 段',
  '段落用 \\n\\n 分隔; FAQ 段用 **FAQ** 开头, 问题用 **Q1: ...** 加答案',
  'en 内容红线: 不出现 名片/business card (§0.0); 不出现「深圳」/「Shenzhen」作供应商前缀 (可用 "Asia factory"); 不出现简体中文; 不写 "Hong Kong" 作目标市场词',
  '不要修改 title/description/h1/keywords — 只产出 body',
  '输出 JSON: {"slug": "<slug>", "body": "<完整 en body>"}',
];

let ts = '';
for (const p of products) {
  const b = skuSeoData?.[p.slug]?.seo?.en?.body;
  if (wc(b) >= 180) continue;
  const cat = categories.find((c) => c.slug === p.category_slug);
  const conv = getConversionBlocks(p.category_slug, 'en');
  const gscWords = catGscWords(p.category_slug);
  const packet = {
    slug: p.slug,
    name_en: skuSeoData?.[p.slug]?.name?.en || (p as any).nameEn || p.slug,
    category_slug: p.category_slug,
    category_name_en: cat?.nameEn || cat?.name || p.category_slug,
    current_body_en: b || '',
    current_body_words: wc(b),
    product: {
      descriptionEn: (p as any).descriptionEn || '',
      price_range: p.price_range,
      minQuantity: p.minQuantity,
      specs: p.specs || {},
      materials: (p as any).materials || '',
      features: p.features || [],
    },
    category_conversion_en: conv?.orderFlow
      ? { title: conv.orderFlow.title, steps: conv.orderFlow.steps.map((s) => ({ title: s.title, desc: s.desc })) }
      : null,
    category_gsc_words_en: gscWords.map((q) => `${q.query} (imp ${q.imp}, pos ${q.pos})`),
    regional_en: REGIONAL_EN,
    rules: RULES,
  };
  fs.writeFileSync(path.join(OUT, `${p.slug}.json`), JSON.stringify(packet, null, 1), 'utf8');
  ts += `${p.slug}\n`;
}
const files = fs.readdirSync(OUT).filter((f) => f.endsWith('.json'));
console.log(`packets: ${files.length}`);
// 分组输出 (供 subagent 派发)
const byCat: Record<string, string[]> = {};
for (const f of files) {
  const p = JSON.parse(fs.readFileSync(path.join(OUT, f), 'utf8'));
  (byCat[p.category_slug] ||= []).push(p.slug);
}
for (const [c, l] of Object.entries(byCat)) console.log(`  ${c} (${l.length}): ${l.join(',')}`);
