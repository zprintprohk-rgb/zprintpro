// moq10-find-missing-minqty.ts — 找出缺 minQuantity 的產品 SKU
import fs from 'fs';

const lines = fs.readFileSync('src/data/products.ts', 'utf-8').split(/\r?\n/);
const slugs: { slug: string; line: number }[] = [];
lines.forEach((l, i) => {
  const m = l.match(/^ {4}slug: '([^']+)'/);
  if (m) slugs.push({ slug: m[1], line: i + 1 });
});

const missing: string[] = [];
const has: { slug: string; line: number; mq: number }[] = [];
slugs.forEach((s, idx) => {
  const end = idx + 1 < slugs.length ? slugs[idx + 1].line - 1 : lines.length;
  let mq: number | undefined;
  for (let i = s.line - 1; i < end; i++) {
    const m = lines[i].match(/^\s*minQuantity:\s*(\d+)/);
    if (m) {
      mq = Number(m[1]);
      break;
    }
  }
  if (mq === undefined) missing.push(`${s.slug} (L${s.line})`);
  else has.push({ slug: s.slug, line: s.line, mq });
});

console.log(`產品 slug 總數: ${slugs.length}`);
console.log(`有 minQuantity: ${has.length}`);
console.log(`缺 minQuantity: ${missing.length}`);
missing.forEach((m) => console.log(`  - ${m}`));

console.log('\nminQuantity 分佈:');
const dist = new Map<number, number>();
for (const h of has) dist.set(h.mq, (dist.get(h.mq) ?? 0) + 1);
for (const [k, v] of [...dist].sort((a, b) => a[0] - b[0])) console.log(`  ${String(k).padStart(5)} → ${v} 個 SKU`);
