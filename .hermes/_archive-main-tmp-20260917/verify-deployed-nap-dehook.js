// verify-deployed-nap-dehook.js
const fs = require('fs');
const zh = fs.readFileSync('C:/Users/Administrator/.local/share/opencode/tool-output/tool_f46d257b2001Lq33Q0HH88kDaS', 'utf8');
const ja = fs.readFileSync('C:/Users/Administrator/.local/share/opencode/tool-output/tool_f46d257d5001UZ2ZDRFnHS3hNF', 'utf8');

const count = (s, re) => (s.match(re) || []).length;

console.log('=== zh-hk home (deploy 75ee93f) ===');
console.log('  POLLUTION (should be 0):');
console.log('    美国 $99 = ' + count(zh, /美國\s*\$\s*99/g));
console.log('    美国订单 = ' + count(zh, /美國訂單/g));
console.log('    送达美国 = ' + count(zh, /送達美國/g));
console.log('    为何美国 = ' + count(zh, /為何美國/g));
console.log('  NEW (should be >=1):');
console.log('    港九新界免费速递 = ' + count(zh, /港九新界免費速遞/g));
console.log('    顺丰本地速递 = ' + count(zh, /順豐本地速遞/g));
console.log('    首次落单免费基本设计 = ' + count(zh, /首次落單免費基本設計/g));
console.log('    全球企业信赖 = ' + count(zh, /全球企業信賴/g));

console.log('');
console.log('=== ja home (deploy 75ee93f) ===');
console.log('  POLLUTION (should be 0):');
console.log('    米国 $99 = ' + count(ja, /米国\s*\$\s*99/g));
console.log('    米国注文 = ' + count(ja, /米国注文/g));
console.log('    ドアツードア配送 = ' + count(ja, /ドア・ツー・ドア配送/g));
console.log('    なぜ米国 = ' + count(ja, /なぜ米国/g));
console.log('  NEW (should be >=1):');
console.log('    日本全国送料無料 = ' + count(ja, /日本全国送料無料/g));
console.log('    ヤマト運輸 = ' + count(ja, /ヤマト運輸/g));
console.log('    沖縄北海道 = ' + count(ja, /沖縄・北海道/g));
console.log('    全注文対応 = ' + count(ja, /全注文対応/g));
console.log('    グローバル企業 = ' + count(ja, /グローバル企業/g));

console.log('');
const zhOk = count(zh, /美國\s*\$\s*99/g) === 0 && count(zh, /美國訂單/g) === 0 && count(zh, /送達美國/g) === 0 && count(zh, /為何美國/g) === 0 && count(zh, /港九新界免費速遞/g) >= 1;
const jaOk = count(ja, /米国\s*\$\s*99/g) === 0 && count(ja, /米国注文/g) === 0 && count(ja, /ドア・ツー・ドア配送/g) === 0 && count(ja, /なぜ米国/g) === 0 && count(ja, /日本全国送料無料/g) >= 1;
console.log('=== VERDICT ===');
console.log('zh-hk: ' + (zhOk ? 'PASS' : 'FAIL'));
console.log('ja:     ' + (jaOk ? 'PASS' : 'FAIL'));
console.log('commit: 75ee93f');