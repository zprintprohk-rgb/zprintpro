'use strict';
// ① 驗證 GeoFooterText.tsx 已無簡體專用字 ② 對比 photo-book 與 self-publishing 的 category 值
const fs = require('fs');
const ROOT = 'F:\\zprintpro-nextjs';
// 只收「繁體必與簡體不同形」者 (排除繁簡同形字, 免假陽性)
const SIMP = '们个为无与书车门问说时东华产国学体线标签页单价简边发对开关电话后从这来让给还两么义应该当经历众飞机场击视频听读写语词记录买卖贵贱农医乐儿长张纸费计认识种类别离继续断错谁务动员双画数际专亚达诺论约伦纽还';
const RE = new RegExp('[' + SIMP + ']', 'g');

const f = ROOT + '\\src\\components\\seo\\GeoFooterText.tsx';
const s = fs.readFileSync(f, 'utf8');
const hits = [...new Set([...s.matchAll(RE)].map(m => m[0]))];
console.log('① GeoFooterText.tsx 全檔簡體專用字: ' + (hits.length ? '★ ' + hits.join('') : '0 ✅'));

// 逐行標示仍命中的行
if (hits.length) {
  s.split('\n').forEach((l, i) => { RE.lastIndex = 0; if (RE.test(l)) console.log('   L' + (i + 1) + ': ' + l.trim().slice(0, 90)); });
}

console.log('\n② category 值對比 (blog-data JSON):');
for (const loc of ['zh-hk', 'en', 'ja']) {
  const j = JSON.parse(fs.readFileSync(`${ROOT}\\src\\data\\blog-data\\${loc}.json`, 'utf8'));
  const pb = j['photo-book-printing-guide'] || {};
  const sp = j['self-publishing-printing-guide'] || {};
  console.log(`   ${loc}: photo-book = ${JSON.stringify(pb.category)} | self-publishing = ${JSON.stringify(sp.category)}${pb.category === sp.category ? '  ✅一致' : '  ★不一致'}`);
}

console.log('\n③ blog-posts.ts 的 categoryKey:');
const ts = fs.readFileSync(ROOT + '\\src\\data\\blog-posts.ts', 'utf8');
for (const slug of ['photo-book-printing-guide', 'self-publishing-printing-guide']) {
  const i = ts.indexOf(`slug: '${slug}'`);
  const seg = ts.slice(Math.max(0, i - 400), i + 200);
  const ck = (seg.match(/categoryKey:\s*'([^']+)'/) || [])[1];
  console.log(`   ${slug}: categoryKey = ${JSON.stringify(ck)}`);
}
