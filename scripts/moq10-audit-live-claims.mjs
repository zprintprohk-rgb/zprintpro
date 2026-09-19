// moq10-audit-live-claims.mjs — 全面盤點源碼內仍寫 100 起印的「客戶可見」字串, 並標示所屬 SKU
import fs from 'fs';
import path from 'path';

const PATTERNS = [/100\s*張起印/g, /100張起印/g, /100\s*張起(?!印)/g, /100\s*個起印/g, /100\s*本起印/g];

const files = [];
function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(f.name) && !/\.bak/.test(f.name)) files.push(p);
  }
}
walk('src');

const byFile = new Map();
for (const f of files) {
  const s = fs.readFileSync(f, 'utf-8');
  let n = 0;
  for (const p of PATTERNS) { const m = s.match(p); if (m) n += m.length; p.lastIndex = 0; }
  if (n) byFile.set(f, n);
}
console.log('=== 仍含「100 起印」類字串的檔案 ===');
for (const [f, n] of [...byFile.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)} × ${f}`);
}

// 針對 products.ts / sku-seo-data.ts 逐 SKU 細列
console.log('\n=== products.ts 逐 SKU ===');
{
  const s = fs.readFileSync('src/data/products.ts', 'utf-8');
  const anchors = [...s.matchAll(/\n {4}slug: '([^']+)'/g)].map((m) => ({ slug: m[1], at: m.index }));
  for (let i = 0; i < anchors.length; i++) {
    const end = i + 1 < anchors.length ? anchors[i + 1].at : s.length;
    const b = s.slice(anchors[i].at, end);
    let n = 0;
    for (const p of PATTERNS) { const m = b.match(p); if (m) n += m.length; }
    if (n) console.log(`  ${anchors[i].slug}: ${n} 處`);
  }
}
