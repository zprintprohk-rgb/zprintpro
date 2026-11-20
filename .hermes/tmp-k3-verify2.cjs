const fs = require('fs');
const prod = fs.readFileSync('src/data/products.ts', 'utf8');
const i = prod.indexOf("slug: 'saddle-stitch-booklets'");
const j = prod.indexOf("    slug: '", i + 40);
const seg = prod.slice(i - 400, j);
console.log('seg len ' + seg.length);
for (const key of ['name:', 'nameEn:', 'nameJa:', 'title_zh:', 'description:', 'descriptionEn:', 'descriptionJa:', 'description_zh:', 'price_range:', 'basePrice:', 'basePrice_en:', 'basePrice_ja:', 'minQuantity:']) {
  const k = seg.indexOf('\n' + ' '.repeat(4) + key);
  if (k === -1) { console.log('  (缺) ' + key); continue; }
  const line = seg.slice(k + 1, seg.indexOf('\n', k + 1));
  const flags = [];
  if (/50[^0-9]{0,8}(本|copy|copies|冊)/.test(line)) flags.push('★50');
  if (/14-57/.test(line)) flags.push('★14-57');
  if (/6-32/.test(line)) flags.push('6-32');
  if (/1\.84/.test(line)) flags.push('1.84');
  if (/258/.test(line)) flags.push('258');
  if (/100[^0-9]{0,8}(本|copies|冊)/.test(line)) flags.push('100');
  console.log('  ' + key.padEnd(17) + ' [' + flags.join(',') + '] ' + line.trim().slice(0, 130));
}
const featIdx = seg.indexOf('features:');
console.log('\nfeatures 块:');
seg.slice(featIdx, seg.indexOf('],', featIdx)).split('\n').forEach((l) => { if (/50|100/.test(l)) console.log('   ' + l.trim()); });

console.log('\n===== saddle-stitch-booklet-printing-guide (en/ja) 相关串 =====');
for (const loc of ['en', 'ja']) {
  const arr = JSON.parse(fs.readFileSync('src/data/blog-data/' + loc + '.json', 'utf8'));
  const p = arr['saddle-stitch-booklet-printing-guide'];
  if (!p) { console.log('  (缺) ' + loc); continue; }
  for (const k of ['title', 'description', 'excerpt', 'content']) {
    const v = p[k];
    if (typeof v !== 'string') continue;
    const hits = [];
    for (const n of ['50-copy', '50 copies', '50 部', '50冊', '50 本', 'US$1.84-7.36', 'HK$14-57', '1.84-7.36', '¥258-1030']) {
      const c = v.split(n).length - 1;
      if (c) hits.push(n + '×' + c);
    }
    if (hits.length) console.log('  ' + loc + ' [' + k + '] ' + hits.join(', '));
  }
}

console.log('\n===== seo.ts alternates / languages 上下文 =====');
const seo = fs.readFileSync('src/lib/seo.ts', 'utf8');
let idx = -1;
while ((idx = seo.indexOf('alternates', idx + 1)) !== -1) {
  console.log('\n--- @' + idx + ' ---');
  console.log(seo.slice(Math.max(0, idx - 200), idx + 700).replace(/\n/g, '\\n').slice(0, 900));
}
