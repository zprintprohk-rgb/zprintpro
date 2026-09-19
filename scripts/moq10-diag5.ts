// moq10-diag5.ts — 檢查 nestedSubProductRanges 實際偵測到的範圍
import fs from 'fs';

const PRODUCT_SLUG_INDENT = 4;
const lines = fs.readFileSync('src/data/products.ts', 'utf-8').split(/\r?\n/);

function nestedSubProductRanges(lines: string[]): [number, number][] {
  const ranges: [number, number][] = [];
  let i = 0;
  while (i < lines.length) {
    const m = lines[i].match(/^(\s*)category_slug:\s*'/);
    if (m && m[1].length > PRODUCT_SLUG_INDENT) {
      const start = i;
      let j = i + 1;
      while (j < lines.length) {
        const l = lines[j];
        if (l.trim() === '') {
          j++;
          continue;
        }
        const indent = (l.match(/^\s*/) || [''])[0].length;
        if (indent <= PRODUCT_SLUG_INDENT) break;
        j++;
      }
      ranges.push([start, j - 1]);
      i = j;
      continue;
    }
    i++;
  }
  return ranges;
}

const r = nestedSubProductRanges(lines);
console.log(`偵測到 ${r.length} 個嵌套範圍:`);
for (const [s, e] of r) {
  console.log(`  L${s + 1}-${e + 1}  (${e - s + 1} 行)  起始行: ${lines[s].trim().slice(0, 60)}`);
}

console.log('\nL7633 是否被覆蓋?');
console.log('  ' + (r.some(([s, e]) => 7633 - 1 >= s && 7633 - 1 <= e) ? '✓ 是' : '🔴 否'));
console.log('L7585 是否被覆蓋?');
console.log('  ' + (r.some(([s, e]) => 7585 - 1 >= s && 7585 - 1 <= e) ? '✓ 是' : '🔴 否'));

console.log('\n所有縮排 6 的 category_slug 行:');
lines.forEach((l, i) => {
  const m = l.match(/^(\s*)category_slug:\s*'([^']+)'/);
  if (m && m[1].length > 4) console.log(`  L${i + 1} [i=${m[1].length}] ${m[2]}`);
});
