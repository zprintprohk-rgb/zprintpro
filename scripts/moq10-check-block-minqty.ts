// moq10-check-block-minqty.ts — 檢查是否存在「同一 SKU 區塊內多個不同 minQuantity」（真值取值不確定）
import fs from 'fs';

const lines = fs.readFileSync('src/data/products.ts', 'utf-8').split(/\r?\n/);
const slugs: { slug: string; line: number }[] = [];
lines.forEach((l, i) => {
  const m = l.match(/^ {4}slug: '([^']+)'/);
  if (m) slugs.push({ slug: m[1], line: i + 1 });
});

console.log('=== 每 SKU 區塊的 minQuantity 集合（只列出 >1 種或 0 種者）===');
let multi = 0;
let zero = 0;
slugs.forEach((s, idx) => {
  const end = idx + 1 < slugs.length ? slugs[idx + 1].line - 1 : lines.length;
  const vals: { v: number; l: number }[] = [];
  for (let i = s.line - 1; i < end; i++) {
    const m = lines[i].match(/^\s*minQuantity:\s*(\d+)/);
    if (m) vals.push({ v: Number(m[1]), l: i + 1 });
  }
  const uniq = [...new Set(vals.map((x) => x.v))];
  if (vals.length === 0) {
    zero++;
    console.log(`  [0 種] ${s.slug} (L${s.line}) — 區塊 L${s.line}-${end}`);
  } else if (uniq.length > 1) {
    multi++;
    console.log(`  [多值] ${s.slug} (L${s.line}) → ${vals.map((x) => `${x.v}@L${x.l}`).join(', ')}`);
  }
});
console.log(`\n區塊總數 ${slugs.length} ｜ 多值 ${multi} ｜ 零值 ${zero}`);

console.log('\n=== 全檔 minQuantity 位置 vs 產品區塊歸屬 ===');
let inBlock = 0;
let outside = 0;
slugs.forEach((s, idx) => {
  const end = idx + 1 < slugs.length ? slugs[idx + 1].line - 1 : lines.length;
  for (let i = s.line - 1; i < end; i++) if (/^\s*minQuantity:\s*\d/.test(lines[i])) inBlock++;
});
lines.forEach((l, i) => {
  if (!/^\s*minQuantity:\s*\d/.test(l)) return;
  const ln = i + 1;
  const isIn = slugs.some((s, idx) => {
    const end = idx + 1 < slugs.length ? slugs[idx + 1].line - 1 : lines.length;
    return ln >= s.line && ln <= end;
  });
  if (!isIn) {
    outside++;
    console.log(`  L${ln} (區塊外): ${l.trim().slice(0, 100)}`);
  }
});
console.log(`\n區塊內 ${inBlock} ｜ 區塊外 ${outside}`);
