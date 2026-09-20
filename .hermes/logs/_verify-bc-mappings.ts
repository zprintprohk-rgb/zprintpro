// .hermes/logs/_verify-bc-mappings.ts — 驗證 business-cards 兩處映射可解析（K3 方案 B 第 3 步）
import { resolveScenarioHref, getScenarioIndustryName } from '../../src/data/industry-scenario-links';

const SCENES = ['birthday', 'holiday', 'thankyou'];
const LOCALES = ['zh-hk', 'en', 'ja'] as const;

let pass = 0;
let fail = 0;
console.log('=== business-cards 三場景 × 3 語系：href 與 industryName ===\n');
for (const k of SCENES) {
  const href = resolveScenarioHref('business-cards', k, '/zh-hk');
  const okHref = typeof href === 'string' && href.length > 1 && href !== '/zh-hk';
  if (okHref) pass++;
  else fail++;
  console.log(`${okHref ? '✓' : '🔴'} [${k}] href = ${href}`);
  for (const loc of LOCALES) {
    const n = getScenarioIndustryName('business-cards', k, loc);
    const ok = !!n;
    if (ok) pass++;
    else fail++;
    console.log(`    ${ok ? '✓' : '🔴'} ${loc.padEnd(6)} industryName = ${n}`);
  }
  console.log('');
}
console.log(`結果: PASS ${pass} / FAIL ${fail}`);
process.exit(fail === 0 ? 0 : 1);
