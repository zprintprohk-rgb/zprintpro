// moq10-diag.ts — 直接打點：為何 L5690 沒被掃到
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const src = fs.readFileSync(path.join(ROOT, 'src/data/products.ts'), 'utf-8');
const lines = src.split(/\r?\n/);

console.log(`總行數: ${lines.length}`);
console.log(`L5689: ${lines[5688]?.slice(0, 80)}`);
console.log(`L5690 含 "50 本起印"? ${lines[5689]?.includes('50 本起印')}`);

// 復刻掃描器邏輯
const blockRanges: { slug: string; start: number }[] = [];
let curSlug = '';
let blockStart = 0;
lines.forEach((l, i) => {
  const s = l.match(/slug:\s*'([^']+)'/);
  if (s) {
    if (curSlug) blockRanges.push({ slug: curSlug, start: blockStart });
    curSlug = s[1];
    blockStart = i;
  }
});
if (curSlug) blockRanges.push({ slug: curSlug, start: blockStart });

console.log(`\nblockRanges: ${blockRanges.length}`);
const cat = blockRanges.find((b) => b.slug === 'catalog-printing');
console.log(`catalog-printing block start(0-based) = ${cat?.start} → 1-based L${(cat?.start ?? -1) + 1}`);

// slugForLine 對 L5690 (0-based 5689)
const i = 5689;
let back: { slug: string; start: number } | undefined;
let fwd: { slug: string; start: number } | undefined;
for (const b of blockRanges) {
  if (b.start <= i && (!back || b.start > back.start)) back = b;
  if (b.start > i && (!fwd || b.start < fwd.start)) fwd = b;
}
console.log(`slugForLine(L5690) → back=${back?.slug} (start L${(back?.start ?? -1) + 1}) fwd=${fwd?.slug}`);

// 註解行守衛是否誤殺
const line = lines[i];
console.log(`\n註解守衛 /^\\s*(\\/\\/|\\*|\\/\\*)/ 命中? ${/^\s*(\/\/|\*|\/\*)/.test(line)}`);
console.log(`行首 30 字元: ${JSON.stringify(line.slice(0, 30))}`);

// 樣式匹配
const pats: [RegExp, string][] = [
  [/(\d+)\s*本起(?:印)?/g, 'zh_本起'],
  [/(\d+)\s*張起(?:印)?/g, 'zh_張起'],
  [/(\d+)\s*冊[〜~か]?/g, 'ja_冊'],
  [/(\d+)\s*(?:MOQ|copies|Copies|pc MOQ|pcs MOQ)/g, 'en_MOQ'],
];
console.log('\nL5690 各樣式命中:');
for (const [re, kind] of pats) {
  const r = new RegExp(re.source, 'g');
  const ms = [...line.matchAll(r)].map((m) => m[1]);
  console.log(`  ${kind}: ${ms.length ? ms.join(',') : '(無)'}`);
}
