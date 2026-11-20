'use strict';
/** Step B-2 影响面取证: 门童 #16 (a) CUSTOMER_VISIBLE_FILES 覆盖名单 (b) 双引号静默失效规模 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const guard = require(path.join(REPO, 'scripts', 'guards', 'gsc-leak-guard.js'));

// --- (a) 覆盖名单: 直接从源码读出 ---
const src = fs.readFileSync(path.join(REPO, 'scripts', 'guards', 'gsc-leak-guard.js'), 'utf8');
const block = src.slice(src.indexOf('const CUSTOMER_VISIBLE_FILES'), src.indexOf('// GSC 后台运营黑话模式'));
console.log('=== (a) 门童 #16 CUSTOMER_VISIBLE_FILES 覆盖名单 ===');
block.split('\n').filter(l => l.trim().startsWith('/')).forEach(l => console.log('  ' + l.trim()));

// src/data 下实际存在哪些「客户可见内容档」
const dataDir = path.join(REPO, 'src', 'data');
const candidates = fs.readdirSync(dataDir, { withFileTypes: true })
  .filter(e => e.isFile() && (e.name.endsWith('.ts') || e.name.endsWith('.json')))
  .map(e => {
    const p = path.join(dataDir, e.name);
    return { name: e.name, size: fs.statSync(p).size, covered: guard.CUSTOMER_VISIBLE_FILES ? 'n/a' : 'n/a' };
  })
  .sort((a, b) => b.size - a.size);
console.log('\n=== src/data 实际档 (按大小) 与门童覆盖判断 ===');
const re = src.match(/const CUSTOMER_VISIBLE_FILES = \[([\s\S]*?)\];/)[1]
  .split('\n').map(l => l.trim()).filter(l => l.startsWith('/'))
  .map(l => new RegExp(l.replace(/^\/|\/?,?$/g, '').replace(/\\\\/g, '\\\\')));
const regexes = src.match(/\/src\[\\\/\\\\\]data[\s\S]*?\.ts\$/g) || [];
// 直接构造: 用 node 重新求值这几条正则
const CVF = eval('[' + src.match(/const CUSTOMER_VISIBLE_FILES = \[([\s\S]*?)\];/)[1] + ']');
for (const c of candidates.slice(0, 18)) {
  const rel = ('src/data/' + c.name);
  const hit = CVF.some(r => r.test(rel));
  console.log(`  ${hit ? '✅覆盖' : '❌未覆盖'}  ${c.name.padEnd(30)} ${(c.size / 1024).toFixed(0)} KB`);
}

// --- (b) 双引号静默失效规模: 统计各档 'locale': "..." 形态数 ---
console.log('\n=== (b) 双引号本地化值形态统计 (被静态看空的量) ===');
const files = ['blog-posts.ts', 'sku-seo-data.ts', 'buying-guides.ts', 'pillar-content.ts', 'products.ts', 'category-seo-content.ts'];
for (const f of files) {
  const p = path.join(dataDir, f);
  if (!fs.existsSync(p)) { console.log(`  ${f.padEnd(26)} (不存在)`); continue; }
  const t = fs.readFileSync(p, 'utf8');
  const dq = (t.match(/(?:^|\n)\s*(?:'zh-hk'|"zh-hk"|en|ja)\s*:\s*"/g) || []).length;
  const sq = (t.match(/(?:^|\n)\s*(?:'zh-hk'|"zh-hk"|en|ja)\s*:\s*'/g) || []).length;
  console.log(`  ${f.padEnd(26)} 双引号 ${String(dq).padStart(4)} 条 | 单引号 ${String(sq).padStart(4)} 条  <-- 双引号条=静默看空`);
}
