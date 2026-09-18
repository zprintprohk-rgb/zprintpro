/** 回退门童 #20 的注册 + 基线改动 (路径级, per §6.4; 保留 guard 文件本身供人工/后续接专用基线通道) */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const REG = path.join(ROOT, 'scripts/check-regression-guard.js');
const BASE = path.join(ROOT, '.hermes/brand-baseline.json');

// 1) 注册回退
let reg = fs.readFileSync(REG, 'utf8');
const before = reg.length;
reg = reg.replace(/\n\s*metaDescription: require\(path\.join\(GUARDS_DIR, 'meta-description-guard\.js'\)\),/, '');
reg = reg.replace(/\n\s*metaDescription: '门童 #20[^']*',/, '');
fs.writeFileSync(REG, reg, 'utf8');
console.log('注册回退: ' + before + ' → ' + reg.length + ' B');
console.log('  残留 metaDescription 注册: ' + /metaDescription:\s*require/.test(reg));
console.log('  残留 门童 #20 label: ' + /门童 #20/.test(reg));

// 2) 基线回退
const base = JSON.parse(fs.readFileSync(BASE, 'utf8'));
const DELTA = { 'src/data/blog-data/zh-hk.json': 9, 'src/data/blog-data/en.json': 56, 'src/data/blog-data/ja.json': 9, 'src/data/sku-seo-data.ts': 44, 'src/data/products.ts': 1, 'src/data/category-seo-content.ts': 1 };
for (const [f, n] of Object.entries(DELTA)) {
  if (base.perFile[f] === undefined) { console.log('  ⚠ ' + f + ' 不在基线中, 跳过'); continue; }
  const before2 = base.perFile[f];
  base.perFile[f] = Math.max(0, before2 - n);
  if (base.perFile[f] === 0) delete base.perFile[f];
  console.log('  ' + f + ': ' + before2 + ' → ' + (base.perFile[f] ?? '(移除)'));
}
fs.writeFileSync(BASE, JSON.stringify(base, null, 2) + '\n', 'utf8');
console.log('基线文件数: ' + Object.keys(base.perFile).length);
