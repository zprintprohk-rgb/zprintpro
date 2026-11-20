#!/usr/bin/env node
/* 只读: T 批 (title/schema 面) 精确清单 —— 枚举全部剩余品牌违规点
 * 来源: (a) 双品牌形态 (b) BRAND_LOCALE_MISMATCH 真阳性 (zh-hk 字段内 ZprintPro / ja 字段内 智印港 等)
 * 输出: .hermes/title-batch-T-manifest.json (file/line/form/locale/before)
 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-main-tmp';
const OUT = 'F:\\zprintpro-main-tmp\\.hermes\\title-batch-T-manifest.json';
const common = require(path.join(ROOT, 'scripts', 'guards', 'common.js'));

const DUAL = /智印港\s*ZprintPro|智印港\s*\|\s*ZprintPro|ZprintPro\s*智印港|ジープリント\s*ZprintPro|ZprintPro\s*ジープリント|智印港\s*ジープリント/g;
const LONE = [ { re: /ZprintPro/g, badIn: ['zh-hk'] }, { re: /智印港/g, badIn: ['en', 'ja'] }, { re: /ジープリント/g, badIn: ['zh-hk', 'en'] } ];
const EXTS = /\.(ts|tsx|js|json|html)$/;

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (!['node_modules', '.next', '.git', '.open-new'].includes(e.name)) walk(p); }
    else if (EXTS.test(e.name)) files.push(p);
  }
})(path.join(ROOT, 'src'));

const items = [];
for (const f of files) {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  const raw = fs.readFileSync(f, 'utf8');
  const lines = raw.split(/\r?\n/);
  lines.forEach((line, idx) => {
    // (a) 双品牌
    DUAL.lastIndex = 0; let m;
    while ((m = DUAL.exec(line)) !== null) {
      items.push({ file: rel, line: idx + 1, form: m[0], kind: 'dual', locale: common.resolveLocale(raw, raw.split(/\r?\n/).slice(0, idx).join('\n').length + m.index, f) || '?' });
    }
    // (b) 单品牌跨 locale
    for (const t of LONE) {
      t.re.lastIndex = 0;
      while ((m = t.re.exec(line)) !== null) {
        const absIdx = raw.split(/\r?\n/).slice(0, idx).join('\n').length + (idx ? 1 : 0) + m.index;
        const loc = common.resolveLocale(raw, absIdx, f);
        if (loc && t.badIn.includes(loc)) {
          // 避免与 (a) 重复
          const dup = items.some(x => x.file === rel && x.line === idx + 1 && x.form.includes(m[0]));
          if (!dup) items.push({ file: rel, line: idx + 1, form: m[0], kind: 'lone-mismatch', locale: loc });
        }
      }
    }
  });
}
const byFile = {};
items.forEach(i => { byFile[i.file] = (byFile[i.file] || 0) + 1; });
fs.writeFileSync(OUT, JSON.stringify({ at: new Date().toISOString(), total: items.length, byFile, items }, null, 1), 'utf8');
console.log(`T 批清单: ${items.length} 处 / ${Object.keys(byFile).length} 文件 -> ${OUT}`);
Object.entries(byFile).sort((a, b) => b[1] - a[1]).forEach(([f, n]) => console.log(`  ${String(n).padStart(4)}  ${f}`));
console.log('\n按 kind:', JSON.stringify(items.reduce((a, x) => (a[x.kind] = (a[x.kind] || 0) + 1, a), {})));
console.log('按 locale:', JSON.stringify(items.reduce((a, x) => (a[x.locale] = (a[x.locale] || 0) + 1, a), {})));
