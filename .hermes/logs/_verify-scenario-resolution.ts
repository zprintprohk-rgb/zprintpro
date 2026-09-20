// .hermes/logs/_verify-scenario-resolution.ts — 驗證映射可解析性（K3 P1）
// 只驗證實際影響渲染的兩個函式（CategoryIndustries 的資料常數未匯出，不強行改生產碼）
import { resolveScenarioHref, getScenarioIndustryName } from '../../src/data/industry-scenario-links';

const TARGETS: Record<string, string[]> = {
  posters: ['retail', 'exhibition', 'restaurant', 'property', 'education'],
  stickers: ['pet_food', 'pharma', 'beauty', 'ecommerce', 'beverage'],
  envelopes: ['corp_business', 'finance_mail', 'school_notice', 'logistics', 'member_event'],
  'business-cards': ['birthday', 'holiday', 'thankyou'],
  banners: ['trade_show', 'outdoor_ad', 'auto_showroom', 'mall_promo', 'school_event'],
};
const LOCALES = ['zh-hk', 'en', 'ja'] as const;

let pass = 0;
let fail = 0;
const problems: string[] = [];

for (const [cat, keys] of Object.entries(TARGETS)) {
  console.log(`\n═══ [${cat}] ═══`);
  for (const k of keys) {
    const href = resolveScenarioHref(cat, k, '/zh-hk');
    const okHref = typeof href === 'string' && href.length > 1 && href !== '/zh-hk';
    const names = LOCALES.map((l) => getScenarioIndustryName(cat, k, l));
    const okName = names.every((n) => !!n);
    if (okHref && okName) pass++;
    else {
      fail++;
      if (!okHref) problems.push(`[${cat}/${k}] href 落空（得到 ${JSON.stringify(href)}）`);
      if (!okName) problems.push(`[${cat}/${k}] 行業名落空`);
    }
    console.log(`  ${okHref && okName ? '✓' : '🔴'} ${k.padEnd(16)} href=${href}${okName ? '' : '  ⚠️ 行業名缺'}`);
  }
}
console.log(`\n結果: PASS ${pass} / FAIL ${fail}`);
if (problems.length) {
  console.log('\n問題:');
  for (const p of problems) console.log(`  - ${p}`);
}
process.exit(fail === 0 ? 0 : 1);
