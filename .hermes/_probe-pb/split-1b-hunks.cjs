'use strict';
/**
 * N3(a) 按 hunk 拆分: 只把 1-B 相關 hunk 暫存進 index, 不動工作區
 * 機制: git diff → 按 hunk 的 old-start 行號篩選 → git apply --cached
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const P = 'F:\\zprintpro-nextjs';
const PAGE = 'src/app/[locale]/product/[slug]/page.tsx';
const CARD = 'src/components/category/CategoryProductCard.tsx';
const ONE_B_HUNKS = [45, 565, 590];   // 1-B 的三個 hunk (old-start, 實測值)

function diff(file) {
  return execFileSync('git', ['diff', '--', file], { cwd: P, encoding: 'utf8', maxBuffer: 1 << 26 });
}
/** 把 diff 切成 { header, hunks[] } */
function split(d) {
  const lines = d.split('\n');
  const header = [];
  const hunks = [];
  let cur = null;
  for (const l of lines) {
    if (l.startsWith('@@')) {
      if (cur) hunks.push(cur);
      cur = [l];
    } else if (cur) cur.push(l);
    else header.push(l);
  }
  if (cur) hunks.push(cur);
  return { header: header.join('\n'), hunks };
}
function oldStart(hunk) {
  const m = hunk[0].match(/^@@ -(\d+)/);
  return m ? Number(m[1]) : -1;
}

const page = split(diff(PAGE));
const card = split(diff(CARD));
console.log('=== page.tsx hunks ===');
page.hunks.forEach(h => {
  console.log('  @@ old-start ' + oldStart(h) + ' | ' + h[0].slice(0, 62) + ' | 行數 ' + h.length);
  h.filter(x => x.startsWith('+') && !x.startsWith('+++')).slice(0, 3).forEach(x => console.log('       ' + x.replace(/\s+/g, ' ').slice(0, 118)));
});
console.log('=== CategoryProductCard.tsx hunks ===');
card.hunks.forEach(h => console.log('  @@ old-start ' + oldStart(h) + ' | ' + h[0].slice(0, 70) + ' | 行數 ' + h.length));

const pageKeep = page.hunks.filter(h => ONE_B_HUNKS.includes(oldStart(h)));
console.log('\n保留 page.tsx hunk: ' + pageKeep.map(oldStart).join(', ') + ' (共 ' + pageKeep.length + '/' + page.hunks.length + ')');
if (pageKeep.length !== ONE_B_HUNKS.length) { console.error('❌ 保留數不符, 中止'); process.exit(1); }

const patch =
  page.header + '\n' + pageKeep.map(h => h.join('\n')).join('\n') + '\n' +
  card.header + '\n' + card.hunks.map(h => h.join('\n')).join('\n') + '\n';

const pf = P + '\\.hermes\\_probe-pb\\_step5a-1b.patch';
fs.writeFileSync(pf, patch, 'utf8');
console.log('patch 已寫: ' + pf + ' (' + patch.length + ' B)');
