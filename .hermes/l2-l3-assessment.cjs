/**
 * ② minQuantity 只读影响评估 + ③ sku-seo-data.ts ↔ CSV 不一致根因定位
 * 全程只读, 不写任何文件
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

// ================= ③ 根因 =================
console.log('='.repeat(98));
console.log('【③】sku-seo-data.ts ↔ CSV 不一致根因定位');
console.log('='.repeat(98));

const ts = read('src/data/sku-seo-data.ts');
const csv = read('zprintpro-sku-seo-data.csv');

// CSV 用 TAB 分隔（表头实测为 1 列 = TAB 未拆）
const csvLines = csv.split(/\r?\n/).filter((l) => l.trim());
const csvHeader = csvLines[0].split('\t');
const csvSlugs = new Set();
for (const line of csvLines.slice(1)) {
  const cols = line.split('\t');
  const slug = (cols[3] || '').trim();
  if (slug) csvSlugs.add(slug);
}
console.log('CSV 列数(按 TAB): ' + csvHeader.length);
console.log('CSV 数据行: ' + (csvLines.length - 1) + ' / 唯一 Slug: ' + csvSlugs.size);

// .ts 的 SKU 键（顶层对象键）
const tsKeys = [...new Set([...ts.matchAll(/^  '([a-z0-9][a-z0-9-]{4,})':\s*\{/gm)].map((m) => m[1]))];
console.log('.ts 顶层 SKU 键: ' + tsKeys.length);

const onlyTs = tsKeys.filter((s) => !csvSlugs.has(s));
const onlyCsv = [...csvSlugs].filter((s) => !tsKeys.includes(s));
console.log('\n只在 .ts 存在 (CSV 无): ' + onlyTs.length);
console.log('  ' + onlyTs.slice(0, 30).join(', '));
console.log('\n只在 CSV 存在 (.ts 无): ' + onlyCsv.length);
console.log('  ' + onlyCsv.slice(0, 20).join(', '));

// 生成器：读几个源? 写出哪里?
const gen = read('scripts/csv-to-sku-seo.mjs');
console.log('\n--- 生成器 scripts/csv-to-sku-seo.mjs 实测 ---');
const genInputs = [...gen.matchAll(/['"]([^'"]*\.(?:csv|json|ts))['"]/g)].map((m) => m[1]);
console.log('  引用的输入文件: ' + (genInputs.join(' | ') || '(无)'));;
console.log('  写出目标表达式: ' + ([...gen.matchAll(/(?:writeFileSync|createWriteStream)\(\s*([^,)]+)/g)].map((m) => m[1].trim()).join(' | ')));
const mergeRe = /merge|existing|readFileSync\(.*sku-seo-data|Object\.assign|\.\.\./;
console.log('  是否读取既有 .ts 做合并: ' + mergeRe.test(gen));
console.log('  行数: ' + gen.split('\n').length);

// ================= ② minQuantity 影响评估 =================
console.log('\n' + '='.repeat(98));
console.log('【②】minQuantity 只读影响评估 — 全调用点扫描');
console.log('='.repeat(98));

const walk = (d, out = []) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|mjs|js|cjs)$/.test(e.name)) out.push(p);
  }
  return out;
};
const files = walk(path.join(ROOT, 'src')).concat(walk(path.join(ROOT, 'scripts')));
const hits = [];
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  if (!/minQuantity/.test(c)) continue;
  const lines = c.split('\n');
  lines.forEach((l, i) => {
    if (/minQuantity/.test(l)) {
      hits.push({ f: f.replace(ROOT + path.sep, '').replace(/\\/g, '/'), line: i + 1, txt: l.trim().slice(0, 150) });
    }
  });
}
const byFile = {};
hits.forEach((h) => { byFile[h.f] = (byFile[h.f] || 0) + 1; });
console.log('\n调用点分布 (文件 → 行数):');
Object.entries(byFile).sort((a, b) => b[1] - a[1]).forEach(([f, n]) => console.log('  ' + String(n).padStart(3) + '  ' + f));
console.log('\n非数据文件（= 真正的逻辑调用点）:');
const DATA_ONLY = /^src\/data\//;
Object.entries(byFile).filter(([f]) => !DATA_ONLY.test(f)).forEach(([f, n]) => console.log('  ' + String(n).padStart(3) + '  ' + f));
console.log('\n逻辑调用点明细:');
hits.filter((h) => !DATA_ONLY.test(h.f)).slice(0, 40).forEach((h) => console.log('  ' + h.f + ':' + h.line + '  ' + h.txt));
