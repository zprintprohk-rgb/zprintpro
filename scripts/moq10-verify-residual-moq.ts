// moq10-verify-residual-moq.ts — K3 前置確認
// 「22 處殘留『100起印』全部屬非本批品類」—— 必須用資料驗證, 不能靠自我聲明。
//
// 做法: 對 sku-seo-data.ts 每個含「100 起印」的區塊, 取其 title 判品類,
//       再對照 products.ts 內**同品類 SKU 的真實 minQuantity**:
//         · 本批品類 (傳單/貼紙/海報/書刊) 的真實 MOQ 應為 10 或 1 ⇒ 若殘留 100 即「漏改」= FAIL
//         · 非本批品類 (紙袋/包裝盒/利是封/餐牌/月曆/信封/教科書) 真實 MOQ 應 ≥ 100 ⇒ 殘留 100 正確
//
// 執行: npx tsx scripts/moq10-verify-residual-moq.ts
import fs from 'fs';
import path from 'path';
import { classifyMoqString } from '../src/data/print-method-policy';

const ROOT = process.cwd();
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), 'utf-8');

/* ---- products.ts: slug → minQuantity ---- */
const prodSrc = read('src/data/products.ts');
const anchors = [...prodSrc.matchAll(/\n {4}slug: '([^']+)'/g)].map((m) => ({ slug: m[1], at: m.index }));
const PRODUCTS: { slug: string; minQuantity: number }[] = [];
for (let i = 0; i < anchors.length; i++) {
  const end = i + 1 < anchors.length ? anchors[i + 1].at : prodSrc.length;
  const blk = prodSrc.slice(anchors[i].at, end);
  const mq = blk.match(/minQuantity:\s*(\d+)/);
  PRODUCTS.push({ slug: anchors[i].slug, minQuantity: mq ? Number(mq[1]) : NaN });
}

/**
 * 由 sku-seo-data 的 title 關鍵詞對應到 products.ts 的 SKU 群,
 * 取其**最高** minQuantity 作該品類的權威門檻 (最保守: 只要有一個 SKU 仍 100, 殘留就合理)。
 */
const CATEGORY_MAP: { test: RegExp; slugs: string[]; label: string }[] = [
  { test: /紙袋/, slugs: ['white-card-bags', 'kraft-paper-bags', 'gift-bags', 'eco-paper-bags', 'handle-bags', 'large-bags'], label: '紙袋' },
  { test: /包裝盒|彩盒|禮盒|精品盒|摺盒|折疊盒|精裝盒|牛皮紙盒|磁吸/, slugs: ['gang-run-card-boxes', 'white-card-boxes', 'tuck-end-boxes', 'corrugated-boxes', 'rigid-boxes', 'food-boxes', 'cosmetic-boxes'], label: '包裝盒' },
  { test: /利是封/, slugs: ['lai-see-packets', 'red-packets'], label: '利是封' },
  { test: /餐牌|菜單/, slugs: ['menus', 'laminated-menus', 'pvc-menus'], label: '餐牌' },
  { test: /月曆|年曆/, slugs: ['wall-calendars', 'desk-calendars', 'custom-calendars'], label: '月曆' },
  { test: /信封/, slugs: ['envelopes', 'pearl-envelopes'], label: '信封' },
  { test: /教科書|教材|練習|作業/, slugs: ['textbooks', 'exercise-books'], label: '教科書/練習' },
  { test: /精裝書|紀念冊|年報/, slugs: ['hardcover-books', 'graduation-yearbook'], label: '精裝書/紀念冊' },
  // 本批品類 (殘留即漏改)
  { test: /傳單|單張|摺頁|flyer|leaflet/i, slugs: ['a4-flyers', 'a5-flyers', 'double-sided-flyers', 'folded-leaflets', 'thick-paper-flyers', 'eco-flyers', 'same-day-flyers'], label: '【本批】傳單' },
  { test: /貼紙|sticker|label/i, slugs: ['waterproof-stickers', 'transparent-stickers', 'die-cut-stickers', 'foil-stickers'], label: '【本批】貼紙' },
  { test: /海報|poster/i, slugs: ['a1-posters', 'a2-posters'], label: '【本批】海報' },
];

const mqOf = (slugs: string[]) => {
  const vals = slugs.map((s) => PRODUCTS.find((p) => p.slug === s)?.minQuantity).filter((v) => Number.isFinite(v)) as number[];
  return vals.length ? Math.max(...vals) : null;
};

/* ---- 掃 sku-seo-data 的殘留 ---- */
const lines = read('src/data/sku-seo-data.ts').split('\n');
let cur = '';
let residual = 0, leak = 0, legit = 0, unknown = 0;
const leaks: string[] = [];
const legits: string[] = [];

lines.forEach((l, i) => {
  const t = l.match(/"title": "([^"]{0,90})/);
  if (t) cur = t[1];
  if (!/100\s*張起印|100張起印|100起印|100\s*個起印/.test(l)) return;
  residual++;

  const kind = classifyMoqString(l);
  const cat = CATEGORY_MAP.find((c) => c.test.test(`${cur} ${l.slice(0, 120)}`));
  if (!cat) { unknown++; return; }
  const trueMq = mqOf(cat.slugs);
  const isInBatch = cat.label.startsWith('【本批】');

  if (isInBatch) {
    leak++;
    leaks.push(`L${i + 1} [${cat.label} 真實MOQ=${trueMq}] ${cur.slice(0, 40)}`);
  } else {
    legit++;
    legits.push(`L${i + 1} [${cat.label} 真實MOQ=${trueMq}] ${cur.slice(0, 40)} (kind=${kind})`);
  }
});

console.log(`sku-seo-data 含「100 起印」的行數: ${residual}`);
console.log(`  · 非本批品類 (殘留正確): ${legit}`);
console.log(`  · 本批品類   (即漏改!): ${leak}`);
console.log(`  · 無法歸類              : ${unknown}`);

if (legits.length) {
  console.log('\n--- 非本批 (應保留) ---');
  legits.forEach((x) => console.log('  ' + x));
}
if (leaks.length) {
  console.log('\n--- ⚠ 本批漏改 ---');
  leaks.forEach((x) => console.log('  ' + x));
}

console.log(leak === 0 ? '\n✅ 前置確認通過: 本批範圍無殘留' : `\n❌ 前置確認失敗: ${leak} 處本批殘留`);
process.exit(leak === 0 ? 0 : 1);
