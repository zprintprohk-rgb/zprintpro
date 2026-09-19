// moq10-map-lines.ts — 給定行號，列出其歸屬 SKU（確認區塊外命中沒有漏修）
import fs from 'fs';

const lines = fs.readFileSync('src/data/products.ts', 'utf-8').split(/\r?\n/);
const starts: { slug: string; start: number }[] = [];
lines.forEach((l, i) => {
  const m = l.match(/^ {4}slug: '([^']+)'/);
  if (m) starts.push({ slug: m[1], start: i });
});

const truth = new Map<string, number>();
starts.forEach((s, idx) => {
  const end = idx + 1 < starts.length ? starts[idx + 1].start : lines.length;
  for (let i = s.start; i < end; i++) {
    const m = lines[i].match(/^\s*minQuantity:\s*(\d+)/);
    if (m) {
      truth.set(s.slug, Number(m[1]));
      break;
    }
  }
});

const targets = process.argv.slice(2).map(Number);
for (const ln of targets) {
  let owner = '';
  for (const s of starts) if (s.start <= ln - 1) owner = s.slug;
  console.log(`L${ln} → SKU [${owner}] 真值 ${truth.get(owner) ?? '?'}`);
  console.log(`     ${lines[ln - 1].trim().slice(0, 100)}`);
}
