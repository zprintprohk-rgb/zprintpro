/**
 * 门童 #20 注册 + 存量基线登记 (K3 批准 §8 选项 A)
 * 120 条为既有缺陷(非本次引入), 按 §6.1 入存量基线「只许递减」, 不阻塞全站 commit
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const REG = path.join(ROOT, 'scripts/check-regression-guard.js');
const BASE = path.join(ROOT, '.hermes/brand-baseline.json');

// 1) 注册
let reg = fs.readFileSync(REG, 'utf8');
if (reg.includes('metaDescription:')) { console.log('已注册, 跳过'); }
else {
  reg = reg.replace(
    "  priceBand: require(path.join(GUARDS_DIR, 'price-band-guard.js')),",
    "  priceBand: require(path.join(GUARDS_DIR, 'price-band-guard.js')),\n  metaDescription: require(path.join(GUARDS_DIR, 'meta-description-guard.js')),"
  );
  reg = reg.replace(
    /(  priceBand: '[^']*',)/,
    "$1\n  metaDescription: '门童 #20 meta description 完整性 (K3 2026-09-18 批准 §8 选项 A: ① 语言错配 ② 首词/前缀重复 ③ 空 meta; 根因见 src/lib/seo.ts fullDesc 拼接 + sku-seo-data 数据)',"
  );
  fs.writeFileSync(REG, reg, 'utf8');
  console.log('✅ 已注册门童 #20');
}
const ok = reg.includes('metaDescription: require') && reg.includes('门童 #20');
console.log('注册校验: require=' + reg.includes('metaDescription: require') + ' label=' + reg.includes('门童 #20'));

// 2) 存量基线登记
const g = require(path.join(ROOT, 'scripts/guards/meta-description-guard.js'));
const hits = g.scan([]);
const per = {};
for (const h of hits) per[h.file] = (per[h.file] || 0) + 1;
console.log('\n本次命中按文件: ' + JSON.stringify(per));

const base = JSON.parse(fs.readFileSync(BASE, 'utf8'));
console.log('基线结构键: ' + Object.keys(base).join(', '));
base.perFile = base.perFile || {};
const merged = [];
for (const [f, n] of Object.entries(per)) {
  const before = base.perFile[f] || 0;
  base.perFile[f] = before + n;
  merged.push(`${f}: ${before} → ${base.perFile[f]} (+${n})`);
}
fs.writeFileSync(BASE, JSON.stringify(base, null, 2) + '\n', 'utf8');
console.log('\n基线登记:');
merged.forEach((m) => console.log('  ' + m));
console.log('基线总文件数: ' + Object.keys(base.perFile).length);
