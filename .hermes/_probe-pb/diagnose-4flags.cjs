'use strict';
// 診斷 4 個 ★FAIL 是真缺陷還是我的量測 bug
const fs = require('fs');
const D = 'F:\\zprintpro-nextjs\\.hermes\\staging\\';
const en = JSON.parse(fs.readFileSync(D + 'self-publishing-content.json', 'utf8'));
const zj = JSON.parse(fs.readFileSync(D + 'self-publishing-content.zhhk-ja.json', 'utf8'));

const nums = s => [...new Set((s.match(/\d[\d,.]*/g) || []))];
const enNums = new Set(nums(en.content.en + en.title.en + en.description.en));

console.log('=== ① 數字診斷 ===');
console.log('en 稿數字集合中含 207 者: ' + [...enNums].filter(n => n.includes('207')).join(' | ') || '(無)');
console.log('en 稿數字集合中含 99 者 : ' + [...enNums].filter(n => n.includes('99')).join(' | ') || '(無)');
for (const loc of ['zh-hk', 'ja']) {
  const c = zj.content[loc];
  for (const n of ['207.94', '99']) {
    const idx = c.indexOf(n);
    if (idx >= 0) console.log(`  ${loc} 出現 ${n}: …${c.slice(Math.max(0, idx - 45), idx + 18).replace(/\s+/g, ' ')}…`);
    else console.log(`  ${loc} 未出現 ${n}`);
  }
}
console.log('\nen 稿實際寫法 (搜 US$207 / 207.94):');
const i = en.content.en.indexOf('207.94');
console.log('  ' + (i >= 0 ? '…' + en.content.en.slice(i - 90, i + 20).replace(/\s+/g, ' ') + '…' : 'en 稿竟無 207.94！'));

console.log('\n=== ② 我的簡體字集誤收的「繁簡同形字」 ===');
const test = { '出': '繁簡同形 (出)', '算': '繁簡同形 (算)', '用': '繁簡同形 (用)', '件': '繁簡同形 (件)', '写': '日文新字體 (写真) 正確' };
for (const [ch, why] of Object.entries(test)) console.log('  ' + ch + ' -> ' + why);
console.log('\n⇒ 判定: 前 4 項若為「繁簡同形」則屬我方誤報; 写 若為日文新字體亦屬誤報。');
