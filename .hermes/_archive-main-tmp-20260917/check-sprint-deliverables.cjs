#!/usr/bin/env node
/* 只读: D8-D13 交付物在库核查 (blog-data 三语 slug 是否已存在) + GSC 数据新鲜度 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-main-tmp';
const BD = path.join(ROOT, 'src', 'data', 'blog-data');
const keys = {};
for (const loc of ['zh-hk', 'en', 'ja']) keys[loc] = Object.keys(JSON.parse(fs.readFileSync(path.join(BD, loc + '.json'), 'utf8')));
console.log('blog-data 条目数:', Object.entries(keys).map(([k, v]) => `${k}=${v.length}`).join(' '));
const want = [
  ['D8 食品包裝完全指南 (zh-hk)', 'zh-hk', /food-packaging/],
  ['D9 月曆訂製指南 (zh-hk)', 'zh-hk', /calendar/],
  ['D10 利是封設計指南 (zh-hk)', 'zh-hk', /red-packet|lai-see|packet/],
  ['D11 Small Batch Sticker (en)', 'en', /small-batch|sticker/],
  ['D12 China Catalog (en)', 'en', /catalog/],
  ['D13 クラフト紙パッケージ (ja)', 'ja', /kraft|クラフト/],
];
for (const [name, loc, re] of want) {
  const hit = keys[loc].filter(k => re.test(k));
  console.log(`  ${hit.length ? '✅' : '❌'} ${name} → ${hit.slice(0, 4).join(', ') || '(未找到)'}`);
}
console.log('\n== GSC 数据新鲜度 ==');
const gdir = path.join(ROOT, 'GSC数据');
if (fs.existsSync(gdir)) {
  fs.readdirSync(gdir).filter(f => /fresh|index/.test(f)).sort().slice(-6).forEach(f => {
    const st = fs.statSync(path.join(gdir, f));
    console.log(`   ${st.mtime.toISOString().slice(0, 16)}  ${f}  ${(st.size / 1024).toFixed(0)}KB`);
  });
} else console.log('   (无 GSC数据 目录)');
