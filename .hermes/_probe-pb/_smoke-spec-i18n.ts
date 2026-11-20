/**
 * Step 4 端到端煙測 (真跑, 非靜態): 用 tsx 載入 data 層 + 映射, 逐 SKU 逐欄驗證三語渲染取值
 * 用法: npx tsx .hermes/_probe-pb/_smoke-spec-i18n.ts
 */
import { products } from '../../src/data/products';
import { SPEC_I18N, localizeSpecValue, localizeSpecs } from '../../src/data/product-specs-i18n';

const CJK = /[\u3400-\u9FFF\uF900-\uFAFF]/;
const FIELDS = ['material', 'printMethod', 'finishing'] as const;

let skuN = 0, fieldN = 0, miss = 0, enCjk: string[] = [], jaSame: string[] = [], zhChanged: string[] = [];
for (const p of products) {
  if (!p.specs) continue;
  skuN++;
  for (const f of FIELDS) {
    const raw = p.specs[f];
    if (!raw) continue;
    fieldN++;
    if (!SPEC_I18N[raw]) { miss++; console.log('  ✗ 未命中映射: ' + p.slug + '.' + f + ' = ' + raw); }
    const zh = localizeSpecValue(raw, 'zh-hk');
    const en = localizeSpecValue(raw, 'en');
    const ja = localizeSpecValue(raw, 'ja');
    if (zh !== raw) zhChanged.push(p.slug + '.' + f);
    if (CJK.test(en)) enCjk.push(p.slug + '.' + f + ' -> ' + en);
    if (!ja || ja === raw) jaSame.push(p.slug + '.' + f);
  }
}

// 抽樣印出
const sample = products.find(p => p.slug === 'premium-greeting-cards')!;
console.log('--- 樣本 premium-greeting-cards (material/printMethod/finishing) ---');
for (const f of FIELDS) {
  const raw = sample.specs![f]!;
  console.log(`  ${f}:`);
  console.log(`    zh-hk: ${localizeSpecValue(raw, 'zh-hk')}`);
  console.log(`    en   : ${localizeSpecValue(raw, 'en')}`);
  console.log(`    ja   : ${localizeSpecValue(raw, 'ja')}`);
}
console.log('--- size 欄 (無映射, 必須 fallback 原文) ---');
console.log('  zh-hk: ' + localizeSpecValue(sample.specs!.size, 'zh-hk'));
console.log('  en   : ' + localizeSpecValue(sample.specs!.size, 'en'));
console.log('  ja   : ' + localizeSpecValue(sample.specs!.size, 'ja'));
console.log('  未知值 fallback 測試: ' + JSON.stringify(localizeSpecValue('完全未收錄的字串', 'en')));
console.log('  空值測試: ' + JSON.stringify(localizeSpecValue(undefined, 'en')));
const batch = localizeSpecs(sample.specs, 'en');
console.log('  localizeSpecs(en) keys: ' + Object.keys(batch).join(','));

console.log('\n=== 統計 ===');
console.log('  映射條目: ' + Object.keys(SPEC_I18N).length);
console.log('  掃過 SKU(含 specs): ' + skuN + ' / 欄位: ' + fieldN);
console.log('  未命中映射: ' + miss);
console.log('  en 值含 CJK: ' + enCjk.length);
enCjk.slice(0, 5).forEach(x => console.log('     ' + x));
console.log('  ja 值 = 原文(未翻譯): ' + jaSame.length + (jaSame.length ? ' -> ' + jaSame.slice(0, 5).join(', ') : ''));
console.log('  zh-hk 值 ≠ 原文: ' + zhChanged.length);
const ok = miss === 0 && enCjk.length === 0 && jaSame.length === 0 && zhChanged.length === 0 && fieldN === 285;
console.log(ok ? '\n✅ 煙測通過 (285 欄位: zh-hk 逐字不變 / en 零中文 / ja 全數本地化)' : '\n❌ 煙測未通過');
process.exit(ok ? 0 : 1);
