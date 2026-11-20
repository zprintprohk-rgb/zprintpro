'use strict';
// ① print-method-policy.ts 是真 mojibake 還是 console 假象? ② 21:24 cron commit 究竟提交了什麼?
const fs = require('fs');
const { execFileSync } = require('child_process');
const ROOT = 'F:\\zprintpro-nextjs';

const f = ROOT + '\\src\\data\\print-method-policy.ts';
const buf = fs.readFileSync(f);
const s = buf.toString('utf8');
console.log('=== print-method-policy.ts ===');
console.log('  bytes=' + buf.length + '  BOM=' + (buf[0] === 0xEF) + '  CRLF=' + /\r\n/.test(s));
const cjk = (s.match(/[\u4e00-\u9fff]/g) || []).length;
// mojibake 特徵: 大量罕用漢字 (如 鍗 鎷 鈽) 或 U+FFFD
const suspicious = (s.match(/[\uFFFD]|鍗|鎷|鈽|銆|鏂|鐨|涓|寮|绗|璇/g) || []).length;
const kana = (s.match(/[\u3040-\u30ff]/g) || []).length;
console.log('  正常 CJK 字數=' + cjk + ' | mojibake 特徵字數=' + suspicious + ' | 假名=' + kana);
console.log('  ⇒ 判定: ' + (suspicious > 20 ? '★ 真 mojibake (雙重編碼污染)' : '✅ UTF-8 正常 (console 顯示假象)'));
console.log('  首行: ' + s.split('\n')[1]);

console.log('\n=== 21:24 cron commit 77ee701c 提交了什麼 ===');
try {
  const st = execFileSync('git', ['show', '--stat', '--format=%h %s', '77ee701c'], { cwd: ROOT, encoding: 'utf8' });
  console.log(st.split('\n').slice(0, 14).join('\n'));
} catch (e) { console.log('  ' + e.message); }

console.log('\n=== 21:24 cron commit b1b3900a ===');
try {
  const st = execFileSync('git', ['show', '--stat', '--format=%h %s', 'b1b3900a'], { cwd: ROOT, encoding: 'utf8' });
  console.log(st.split('\n').slice(0, 12).join('\n'));
} catch (e) { console.log('  ' + e.message); }

console.log('\n=== 那 3 個 src 改動是否曾出現在任何 commit? ===');
for (const p of ['src/data/print-method-policy.ts', 'src/components/category/CategoryProductCard.tsx']) {
  try {
    const out = execFileSync('git', ['log', '--oneline', '-3', '--', p], { cwd: ROOT, encoding: 'utf8' }).trim();
    console.log('  ' + p + ' -> ' + (out ? out.split('\n').join(' | ') : '★ 從未提交 (無歷史)'));
  } catch (e) { console.log('  ' + p + ' -> 查詢失敗'); }
}
