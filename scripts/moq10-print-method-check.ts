// moq10-print-method-check.ts — P2-6 傳統膠印軟分流 邊界測試
// 執行: npx tsx scripts/moq10-print-method-check.ts
import {
  getPrintMethodAdvice,
  OFFSET_MIN_QTY,
  OFFSET_ECONOMICAL_FROM,
} from '../src/data/print-method-policy';

let pass = 0, fail = 0;
const ok = (m: string) => { pass++; console.log('  ✓ ' + m); };
const bad = (m: string) => { fail++; console.log('  ✗ ' + m); };

console.log(`常數: OFFSET_MIN_QTY=${OFFSET_MIN_QTY} OFFSET_ECONOMICAL_FROM=${OFFSET_ECONOMICAL_FROM}`);

console.log('\nA. 紙品線 (a5-flyers) 三區間');
const cases: [number, 'digital' | 'offset', boolean, boolean][] = [
  // [qty, recommended, isCrossover, suggestBumpToOffset]
  [1, 'digital', false, false],
  [9, 'digital', false, false],
  [10, 'digital', false, false],
  [99, 'digital', false, false],
  [100, 'digital', true, true],    // 過渡區起點
  [150, 'digital', true, true],
  [199, 'digital', true, true],    // 過渡區終點
  [200, 'offset', false, false],   // 膠印起點
  [500, 'offset', false, false],
  [5000, 'offset', false, false],
];
for (const [q, rec, cross, bump] of cases) {
  const a = getPrintMethodAdvice('a5-flyers', q);
  if (!a) { bad(`qty ${q}: 回 null (紙品線應該有建議)`); continue; }
  if (a.recommended === rec && a.isCrossover === cross && a.suggestBumpToOffset === bump) {
    ok(`qty ${q} → ${a.recommended}${cross ? ' (過渡區)' : ''}${bump ? ' + 提示加量' : ''}`);
  } else {
    bad(`qty ${q} → ${a.recommended}/cross=${a.isCrossover}/bump=${a.suggestBumpToOffset} (期望 ${rec}/${cross}/${bump})`);
  }
}

console.log('\nB. 數碼線書刊 (catalog-printing)');
for (const [q, rec] of [[1, 'digital'], [100, 'digital'], [199, 'digital'], [200, 'offset'], [1000, 'offset']] as [number, 'digital' | 'offset'][]) {
  const a = getPrintMethodAdvice('catalog-printing', q);
  if (a && a.recommended === rec) ok(`qty ${q} → ${a.recommended}`);
  else bad(`qty ${q} → ${a ? a.recommended : 'null'} (期望 ${rec})`);
}

console.log('\nC. 非適用品類 → null (不得顯示建議)');
for (const slug of ['gang-run-card-boxes', 'white-card-bags', 'wall-calendars', 'a1-posters', 'outdoor-vinyl-banners', 'foil-wedding-invitations']) {
  const a = getPrintMethodAdvice(slug, 500);
  if (a === null) ok(`${slug} → null (不適用, 正確)`);
  else bad(`${slug} → 竟然有建議 (${a.recommended})`);
}

console.log('\nD. 三語文案齊備');
for (const [q, tag] of [[50, '數碼'], [150, '過渡'], [500, '膠印']] as [number, string][]) {
  const a = getPrintMethodAdvice('a5-flyers', q);
  const missing = (['zh-hk', 'en', 'ja'] as const).filter((l) => !a?.note[l] || a.note[l].length < 20);
  if (missing.length === 0) ok(`qty ${q} (${tag}): 三語文案齊備`);
  else bad(`qty ${q} (${tag}): 缺 ${missing.join(',')}`);
}

console.log(`\n結果: ${pass} 通過 / ${fail} 失敗`);
process.exit(fail ? 1 : 0);
