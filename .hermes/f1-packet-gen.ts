/* F1 数据包生成器: .hermes/f1-packets/<slug>.json
   用法: npx tsx .hermes/f1-packet-gen.ts */
import { products } from '../src/data/products';
import { skuSeoData } from '../src/data/sku-seo-data';
import * as fs from 'fs';

const cjk = (s: string) => (s || '').replace(/\*\*[^*]+\*\*/g, '').replace(/\s+/g, '').length;

// 品类 → GSC 高潜词 (hk 28d, 9/10 决策数据实证; rank 20-50 + imp>=15)
const GSC_WORDS: Record<string, string[]> = {
  posters: ['海報印刷(161,pos25)', '印海報(137,pos25)', 'poster 印刷(70,pos23)', '海報與印刷(33,pos18)'],
  stickers: ['貼紙印刷(153,pos31)', '貼紙(74,pos48)', '戶外貼紙(73,pos17)', '透明貼(66,pos24)', '貼紙訂製(53,pos25)', '可移貼紙(43,pos16)', '防水貼紙(40,pos16)'],
  flyers: ['宣傳單張(130,pos36)', '宣傳單張印刷(129,pos30)', '摺頁印刷(45,pos36)'],
  packaging: ['包裝盒印刷(69,pos37)', '包裝盒訂製(64,pos31)', '紙盒印刷(63,pos38)', '紙盒訂製(62,pos43)', '食品包裝訂製(54,pos16)', '禮盒訂製(45,pos39)', '包裝食品 裡印(32,pos17)'],
  calendars: ['月曆印刷(132,pos19)', '月歷印刷(62,pos17)', '月曆訂製(62,pos28)', '訂制月曆(49,pos27)'],
  'paper-bags': ['訂做紙袋(67,pos19)', '印刷紙袋(60,pos15)', '紙袋訂製(59,pos22)'],
  books: ['騎馬釘(68,pos27)', '騎馬釘印刷(63,pos23)', '印書(63,pos31)', '騎馬釘書刊(63,pos36)'],
  'red-packets': ['利是封印刷(70,pos30)', '訂製利是封(33,pos26)', '利是封訂製(31,pos30)'],
  banners: ['車身廣告(65,pos51)', '易拉寶(66,pos?)'],
  menus: ['餐牌印刷(imp<15, 未达标)', '菜單印刷(imp<15)'],
  envelopes: ['信封印刷(imp<15)', '訂製信封(imp<15)'],
  'greeting-cards': ['賀卡印刷(imp<15)', '感謝卡(imp<15)'],
  'wedding-invitations': ['喜帖印刷(imp<15)', '結婚請柬(imp<15)'],
  'place-cards': ['枱卡(imp<15)', '座位卡(imp<15)'],
  educational: ['證書印刷(pos11, CTR全站最高12.5%, 9/3实证)', '月曆訂製(62,pos28)'],
  'japan-doujin': ['同人印刷(imp<15)', 'コミケ 印刷(52, ja pos41)'],
};

const REGIONAL_ZH = {
  trustSignals: '深圳自有工廠 · 順豐香港本地派送 (48小時) · 24小時報價 · ISO9001認證',
  shipping: '順豐香港本地送貨 · 港島/九龍/新界 48小時達 · DHL 全球 2-4 日',
  pricingNote: '以上價格以港幣（HKD）計算。量大價優，歡迎致電查詢批量報價。',
  expertIntro: '智印港（ZprintPro）為彩龍印刷旗下國際印刷服務品牌，深圳自有工廠，服務日本及全球客戶。提供 IP 保護、ISO 認證品質保證，以及全球物流支援。',
};

const RULES = [
  '只许从 4 个真实数据源组装: ①本包 description/specs/materials/price_range/minQuantity ②category 现有文案与本包 category 行业场景 ③现有 body 内 FAQ 答案改写为场景句 ④category GSC 词(自然织入, 禁堆砌)',
  '禁止编造: 数字/认证/交期/客户名/行业事实 (价格只能用 price_range, 交期只能用交稿規範里的 3-5 天等已有口径)',
  '禁止跨 SKU 复制同一段文字: 每个 SKU 组装结果必须唯一 (同品类相邻 SKU 也禁止整段雷同)',
  '字数: 新 body ≥ 300 字 (中文, 不含 **加粗** 标记); 结构 = 场景段(2-3 段, 含品类 GSC 词自然出现 1-2 次) + 交稿規範段(照抄现有交稿規範句, 无则按本包 specs) + 收费段(用 price_range/minQuantity)',
  '简体转繁体: 全部输出繁体中文 (香港用法)',
  '段落用 \\n\\n 分隔; 不要写 **常見問題** 部分 (FAQ 由模板单独渲染)',
  '不要修改 title/description/keywords — 只产出 body',
];

fs.mkdirSync('.hermes/f1-packets', { recursive: true });
const queue = JSON.parse(fs.readFileSync('.hermes/f1-zhhk-queue.json', 'utf8')).queue;
let n = 0;
for (const q of queue) {
  const p = products.find((x) => x.slug === q.slug)!;
  const seo = skuSeoData[q.slug];
  const pkt = {
    slug: q.slug,
    name_zh: seo?.name?.['zh-hk'] ?? (p as any).name ?? q.slug,
    category_slug: p.category_slug,
    current_body_len: q.bodyLen,
    current_body: seo?.seo?.['zh-hk']?.body ?? '',
    product: {
      description: (p as any).description ?? '',
      description_zh: (p as any).description_zh ?? '',
      price_range: p.price_range,
      minQuantity: p.minQuantity,
      specs: (p as any).specs ?? '',
      materials: (p as any).materials ?? '',
      title_zh: (p as any).title_zh ?? '',
    },
    category_gsc_words: GSC_WORDS[p.category_slug] ?? [],
    regional_zh: REGIONAL_ZH,
    rules: RULES,
  };
  fs.writeFileSync(`.hermes/f1-packets/${q.slug}.json`, JSON.stringify(pkt, null, 1), 'utf8');
  n++;
}
console.log('packets written:', n);

// 分组输出 (按品类, 供 subagent 分批)
const byCat: Record<string, string[]> = {};
for (const q of queue) (byCat[q.category_slug] ||= []).push(q.slug);
console.log('分组:', JSON.stringify(byCat));
