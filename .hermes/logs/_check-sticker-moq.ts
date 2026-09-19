// .hermes/logs/_check-sticker-moq.ts — 貼紙子品類 MOQ 全面盤點（供 K3 映射裁決）
import fs from 'node:fs';

console.log('=== 1. price-tables/stickers.json 結構 ===');
const raw = fs.readFileSync('src/data/price-tables/stickers.json', 'utf8');
const j = JSON.parse(raw);
console.log(`  頂層鍵: ${Object.keys(j).join(', ')}`);
const configs = j.configs ?? j.variants ?? [];
console.log(`  configs 數: ${Array.isArray(configs) ? configs.length : '(非陣列)'}`);
if (Array.isArray(configs)) {
  configs.forEach((c: any, i: number) => {
    const tiers = c.tiers ?? c.quantities ?? c.prices ?? [];
    const qs = Array.isArray(tiers)
      ? tiers.map((t: any) => (typeof t === 'object' ? (t.qty ?? t.quantity ?? t.q) : t)).slice(0, 9)
      : Object.keys(tiers).slice(0, 9);
    console.log(`    [${i}] ${String(c.name ?? c.id ?? c.size ?? '?').slice(0, 46)} | 價階=${JSON.stringify(qs)}`);
  });
}

console.log('\n=== 2. 各貼紙 SKU：真值 vs 文案宣稱 ===');
const lines = fs.readFileSync('src/data/products.ts', 'utf8').split(/\r?\n/);
const slugs = [
  'waterproof-stickers',
  'transparent-stickers',
  'removable-stickers',
  'small-batch-stickers',
  'die-cut-stickers',
  'foil-stickers',
  'security-stickers',
  'fluorescent-stickers',
];
for (const s of slugs) {
  const i = lines.findIndex((l) => l.includes(`slug: '${s}'`) && /^ {4}slug:/.test(l));
  if (i < 0) {
    console.log(`  ${s}: 🔴 找不到`);
    continue;
  }
  let mq = '';
  for (let k = i; k < i + 90 && k < lines.length; k++) {
    const m = lines[k].match(/^\s*minQuantity:\s*(\d+)/);
    if (m) {
      mq = m[1];
      break;
    }
  }
  // 收集該 SKU 區塊內所有「N 張起印 / N 個起印」宣稱
  const claims = new Set<string>();
  for (let k = i; k < i + 90 && k < lines.length; k++) {
    if (k > i && /^ {4}slug:/.test(lines[k])) break;
    for (const m of lines[k].matchAll(/(\d+)\s*[張個]\s*起(?:印|訂)?/g)) claims.add(m[1]);
  }
  const flag = claims.size && !claims.has(mq) ? '🔴 不一致' : '✓';
  console.log(
    `  ${flag} ${s.padEnd(24)} 真值=${String(mq).padStart(4)}  文案宣稱=[${[...claims].join(', ') || '無'}]`
  );
}

console.log('\n=== 3. 品類頁文案宣稱的 100（category-seo-content.ts）===');
const cat = fs.readFileSync('src/data/category-seo-content.ts', 'utf8').split(/\r?\n/);
cat.forEach((l, i) => {
  if (/貼紙/.test(l) && /\d+\s*[個張]\s*起/.test(l)) {
    for (const m of l.matchAll(/(\d+)\s*[個張]\s*起/g)) {
      console.log(`  L${i + 1}: 「${m[0]}」 ← ${l.trim().slice(0, 100)}`);
    }
  }
});
