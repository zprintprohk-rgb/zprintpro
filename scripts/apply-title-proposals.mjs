/**
 * apply-title-proposals.mjs — 应用 v4 补词提案 (仅精确串替换, 仅落带 50-54 的提案)
 * 前置: node scripts/title-audit-v4.mjs --emit 已生成 .hermes/reports/title-audit-2026-09-09.json
 * 安全: 只替换 sku-seo-data.ts 中逐字匹配的旧 title; 替换数≠提案数则中止
 */
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(import.meta.dirname, '..');
const rep = JSON.parse(fs.readFileSync(path.join(ROOT, '.hermes/reports/title-audit-2026-09-09.json'), 'utf8'));
const file = path.join(ROOT, 'src/data/sku-seo-data.ts');
let txt = fs.readFileSync(file, 'utf8');
let applied = 0, skipped = [];
for (const p of rep.proposals || []) {
  if (p.candEquiv < 50 || p.candEquiv > 54) { skipped.push(`${p.slug}/${p.locale} band=${p.candEquiv}`); continue; }
  if (!p.candidate || /[<>{}]/.test(p.candidate)) { skipped.push(`${p.slug}/${p.locale} bad-char`); continue; }
  const oldEsc = `"title": "${p.title.replace(/"/g, '\\"')}"`;
  const newEsc = `"title": "${p.candidate.replace(/"/g, '\\"')}"`;
  if (!txt.includes(oldEsc)) { skipped.push(`${p.slug}/${p.locale} no-match`); continue; }
  txt = txt.replace(oldEsc, newEsc);
  applied++;
}
if (applied === 0) { console.error('ABORT: 0 applied'); process.exit(1); }
fs.writeFileSync(file, txt, 'utf8');
console.log(`applied: ${applied}; skipped: ${skipped.length}`);
skipped.slice(0, 20).forEach((s) => console.log('  skip: ' + s));
