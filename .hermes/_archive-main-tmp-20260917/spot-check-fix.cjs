#!/usr/bin/env node
/* 只读: 改后抽查 (关键行 + 畸形扫描) */
const fs = require('fs');
const ROOT = 'F:\\zprintpro-main-tmp\\';
const CHECKS = [
  ['src/lib/seo.ts', [22, 23, 24, 25, 26, 1342, 1354, 1621]],
  ['src/app/[locale]/layout.tsx', [40, 41, 42, 43, 52, 53, 54]],
  ['src/lib/seo/schema-extensions.ts', [439, 603]],
  ['src/components/layout/Footer.tsx', [26, 80]],
  ['src/lib/metadata.ts', [36, 72]],
  ['src/app/[locale]/press-kit/page.tsx', [18, 23, 33, 47, 141]],
];
for (const [rel, lns] of CHECKS) {
  const lines = fs.readFileSync(ROOT + rel.replace(/\//g, '\\'), 'utf8').split(/\r?\n/);
  console.log(`\n--- ${rel} ---`);
  lns.forEach(n => console.log(`  L${n}: ${(lines[n - 1] || '(空)').trim().slice(0, 130)}`));
}
// 畸形扫描
const DUAL = /智印港\s*ZprintPro|智印港\s*\|\s*ZprintPro|ジープリント\s*ZprintPro|ZprintPro\s*智印港/g;
const BAD = [/\|\s*\|/, /智印港智印港/, /ZprintProZprintPro/, /ジープリントジープリント/, /智印港\s+、/, /ZprintPro\s+、/];
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = dir + '\\' + e.name;
    if (e.isDirectory()) { if (!['node_modules', '.next', '.git', '.open-next'].includes(e.name)) walk(p, out); }
    else if (/\.(ts|tsx|js|mjs|cjs|json|html)$/.test(e.name)) out.push(p);
  }
  return out;
}
let total = 0; const per = {};
const badHits = [];
for (const f of [...walk(ROOT + 'src'), ...walk(ROOT + 'messages')]) {
  const t = fs.readFileSync(f, 'utf8');
  const n = (t.match(DUAL) || []).length;
  if (n) { total += n; per[f.replace(ROOT, '').replace(/\\/g, '/')] = n; }
  const ls = t.split(/\r?\n/);
  ls.forEach((l, i) => {
    if (!DUAL.test(l)) { DUAL.lastIndex = 0; return; }
    DUAL.lastIndex = 0;
    BAD.forEach(re => { if (re.test(l)) badHits.push(`${f.replace(ROOT, '')}:${i + 1} ${re} :: ${l.trim().slice(0, 90)}`); });
  });
}
console.log(`\n=== 改后全局双品牌: ${total} 处 (改前 440) ===`);
Object.entries(per).sort((a, b) => b[1] - a[1]).forEach(([f, n]) => console.log(`  ${String(n).padStart(4)}  ${f}`));
console.log(`\n=== 畸形行扫描: ${badHits.length} 处 ===`);
badHits.slice(0, 15).forEach(h => console.log('  ' + h));
