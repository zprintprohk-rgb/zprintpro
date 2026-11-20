'use strict';
/**
 * 決定性判定: 數值差量是落在「標籤字串內」(可接受, 因標籤被翻譯) 還是「價格/數量欄位」(不可接受)
 * 做法: 排除 productName.* 與 configs[].label.* 的值之後, 再比對全部數值
 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';
const BAK = path.join(ROOT, '.hermes', '_bak-pricedata-20260918', 'price-data.generated.ts.before');
const NEW = path.join(ROOT, 'src', 'lib', 'price-data.generated.ts');
const oldS = fs.readFileSync(BAK, 'utf8');
const newS = fs.readFileSync(NEW, 'utf8');

/** 移除「語系字串值行」的內容, 只留 key 骨架 → 剩下的數字才是價格/結構數字 */
function stripLocaleValues(s) {
  return s.replace(/^(\s*"(?:zh-hk|en|ja)"\s*:\s*)"(?:[^"\\]|\\.)*"(,?)\s*$/gm, '$1"__L__"$2');
}
const oStripped = stripLocaleValues(oldS);
const nStripped = stripLocaleValues(newS);

const tok = s => (s.match(/-?\d+(?:\.\d+)?/g) || []);
const a = tok(oStripped), b = tok(nStripped);
let first = -1;
for (let i = 0; i < Math.max(a.length, b.length); i++) if (a[i] !== b[i]) { first = i; break; }
const sum = x => x.map(Number).filter(Number.isFinite).reduce((p, q) => p + q, 0);

console.log('=== 排除「語系標籤字串」後的數值比對 (價格/結構數字) ===');
console.log('  舊 token: ' + a.length + ' | 新 token: ' + b.length);
console.log('  首個差異位置: ' + (first < 0 ? '無 ✅ 完全一致' : first));
if (first >= 0) console.log('    舊=' + a[first] + '  新=' + b[first]);
console.log('  總和 舊=' + sum(a).toFixed(2) + ' 新=' + sum(b).toFixed(2) + (Math.abs(sum(a) - sum(b)) < 1e-6 ? '  ✅' : '  ★不一致'));
console.log('  序列一致: ' + (JSON.stringify(a) === JSON.stringify(b) ? '✅ 是' : '★ 否'));

console.log('\n=== 對照: 未排除前的差量來源 ===');
const a2 = tok(oldS), b2 = tok(newS);
console.log('  舊 ' + a2.length + ' / 新 ' + b2.length + ' (差 ' + (b2.length - a2.length) + ')');
console.log('  ⇒ 差量若僅來自標籤字串內嵌數字, 上述「排除後」比對應為 ✅');

// 找出首個差異的上下文 (未排除, 便於人工確認落在哪種欄位)
let f2 = -1;
for (let i = 0; i < Math.max(a2.length, b2.length); i++) if (a2[i] !== b2[i]) { f2 = i; break; }
if (f2 >= 0) {
  const show = (s, n) => {
    const re = /-?\d+(?:\.\d+)?/g; let m, i = 0;
    while ((m = re.exec(s)) !== null) { if (i === n) return s.slice(Math.max(0, m.index - 90), m.index + 40).replace(/\s+/g, ' '); i++; }
    return '(n/a)';
  };
  console.log('\n  舊側上下文: …' + show(oldS, f2) + '…');
  console.log('  新側上下文: …' + show(newS, f2) + '…');
}
