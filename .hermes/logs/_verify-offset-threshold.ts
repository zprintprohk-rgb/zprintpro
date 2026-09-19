// .hermes/logs/_verify-offset-threshold.ts — 驗證膠印經濟分界點改為 300 後的行為
import { getPrintMethodAdvice, OFFSET_MIN_QTY, OFFSET_ECONOMICAL_FROM } from '../../src/data/print-method-policy';

console.log(`OFFSET_MIN_QTY=${OFFSET_MIN_QTY}  OFFSET_ECONOMICAL_FROM=${OFFSET_ECONOMICAL_FROM}`);
console.log('');
for (const q of [10, 99, 100, 199, 200, 250, 299, 300, 500]) {
  const a = getPrintMethodAdvice('a5-flyers', q);
  const tag = a ? `${a.recommended}${a.isCrossover ? ' (過渡區)' : ''}` : 'null';
  console.log(`  qty=${String(q).padStart(4)} → ${tag}`);
}
console.log('\n=== 過渡區文案抽樣（zh-hk, qty=200）===');
const a = getPrintMethodAdvice('a5-flyers', 200);
console.log('  ' + (a ? a.note['zh-hk'] : 'null'));
console.log('\n=== 邊界確認 ===');
const a299 = getPrintMethodAdvice('a5-flyers', 299);
const a300 = getPrintMethodAdvice('a5-flyers', 300);
console.log(`  299 → crossover=${a299?.isCrossover}  recommended=${a299?.recommended}`);
console.log(`  300 → crossover=${a300?.isCrossover}  recommended=${a300?.recommended}`);
