// moq10-list-skus.ts — 列出所有 SKU 的 slug/category/minQuantity（真值總表）
import fs from 'fs';

const lines = fs.readFileSync('src/data/products.ts', 'utf-8').split(/\r?\n/);
const starts: { slug: string; start: number }[] = [];
lines.forEach((l, i) => {
  const m = l.match(/^ {4}slug: '([^']+)'/);
  if (m) starts.push({ slug: m[1], start: i });
});

const rows: { slug: string; mq: string; cat: string }[] = [];
starts.forEach((s, idx) => {
  const end = idx + 1 < starts.length ? starts[idx + 1].start : lines.length;
  let mq = '';
  let cat = '';
  for (let i = s.start; i < end; i++) {
    const m = lines[i].match(/^\s*minQuantity:\s*(\d+)/);
    if (m && !mq) mq = m[1];
    const c = lines[i].match(/^\s*category:\s*'([^']+)'/);
    if (c && !cat) cat = c[1];
  }
  rows.push({ slug: s.slug, mq, cat });
});

const filter = process.argv[2];
const list = filter ? rows.filter((r) => new RegExp(filter, 'i').test(r.slug + ' ' + r.cat)) : rows;

console.log(`共 ${rows.length} 個 SKU${filter ? `，符合 /${filter}/ 者 ${list.length}` : ''}`);
for (const r of list) console.log(`  ${r.slug.padEnd(30)} minQ=${String(r.mq).padStart(5)}  cat=${r.cat}`);

console.log('\n=== 按 category 分組計數 ===');
const byCat = new Map<string, number>();
for (const r of rows) byCat.set(r.cat, (byCat.get(r.cat) ?? 0) + 1);
for (const [k, v] of [...byCat].sort()) console.log(`  ${k.padEnd(24)} ${v}`);
