// moq10-diag2.ts — 第 2 輪打點：dump 真實樣本，修正兩類誤配
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const src = fs.readFileSync(path.join(ROOT, 'src/data/products.ts'), 'utf-8');
const lines = src.split(/\r?\n/);

console.log('=== A. 為何 slug 行 = 115 而非 99？dump 被匹配的行（非 minQuantity 配對者）===');
const SLUG_RE = /(^|[^A-Za-z_])slug:\s*'([^']+)'/;
let n = 0;
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  if (/^\s*(\/\/|\*|\/\*)/.test(l)) continue;
  const m = l.match(SLUG_RE);
  if (m) {
    n++;
    const indent = l.match(/^\s*/)![0].length;
    if (m[1] !== '' || indent !== 4) {
      console.log(`  L${i + 1} 前置字元=${JSON.stringify(m[1])} 縮排=${indent} slug=${m[2]}`);
      console.log(`      ${l.trim().slice(0, 100)}`);
    }
  }
}
console.log(`  總匹配 = ${n}`);

console.log('\n=== B. 「100 枚から」/「100 MOQ」真實樣本 dump（驗證 ja_MOQ 正則）===');
const samples: { re: RegExp; label: string }[] = [
  { re: /\d+\s*枚\s*(?:から|〜|~)?/g, label: '枚型' },
  { re: /\d+\s*冊\s*(?:から|〜|~)?/g, label: '冊型' },
  { re: /\d+\s*(?:MOQ|copies|Copies)/g, label: 'en MOQ型' },
];
const dump = new Map<string, Set<string>>();
for (const { label } of samples) dump.set(label, new Set());
for (const l of lines) {
  for (const { re, label } of samples) {
    for (const m of l.match(re) || []) dump.get(label)!.add(m.replace(/\s+/g, ' ').trim());
  }
}
for (const [label, set] of dump) {
  const arr = [...set];
  console.log(`  ${label} (${arr.length} 種): ${arr.slice(0, 25).join(' | ')}`);
}

console.log('\n=== C. L8274 附近 slug 欄位真名（婚宴枱卡）===');
for (let i = 8268; i < 8290; i++) {
  const l = lines[i];
  if (/slug/i.test(l)) console.log(`  L${i + 1}: ${l.trim().slice(0, 110)}`);
}
