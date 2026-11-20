/**
 * Step 5 (A) — 孤儿交付物 zh-hk/en/ja 输出对照模拟 (改前 vs 改后)
 * 精确复刻 CategoryProductCard.tsx 的 moqLine 表达式与 PDP page.tsx 的 minOrder 行。
 * 用法: npx tsx .hermes/_probe-pb/_step5-churn-sim.ts
 */
import { products } from '../../src/data/products';
import { getDisplayAnchor, getPriceUnitWord } from '../../src/lib/pricing';
import { getDisplayMinOrder, isDigitalLineBook } from '../../src/data/print-method-policy';
import type { Locale } from '../../src/types/locale';

const T: Record<string, { moqSuffix: string; volumeNote: string }> = {
  'zh-hk': { moqSuffix: '起訂', volumeNote: '量大更優' },
  en: { moqSuffix: 'MOQ', volumeNote: 'Volume pricing' },
  ja: { moqSuffix: '〜', volumeNote: '大口割引' },
};
const LOCALES: Locale[] = ['zh-hk', 'en', 'ja'];

function oldMoqLine(p: any, locale: string): string {
  const t = T[locale];
  const anchor = getDisplayAnchor(p.slug, locale);
  const unitWord = getPriceUnitWord(p.price_range);
  if (anchor) return anchor.sub;
  if (locale === 'zh-hk') return `${p.minQuantity}${unitWord || '件'}${t.moqSuffix} · ${t.volumeNote}`;
  if (locale === 'ja') return `${p.minQuantity}個${t.moqSuffix} · ${t.volumeNote}`;
  return `${t.moqSuffix} ${p.minQuantity} · ${t.volumeNote}`;
}
function newMoqLine(p: any, locale: string): string {
  if (isDigitalLineBook(p.slug)) return getDisplayMinOrder(locale, p.slug, p.minQuantity);
  return oldMoqLine(p, locale);
}

const SLUGS = ['catalog-printing', 'perfect-bound-books', 'hardcover-books', 'spiral-notebooks'];

console.log('=== (A) 品类页产品卡 moqLine: 改前 -> 改后 (仅数码线书刊 4 SKU) ===');
let changed = 0;
for (const s of SLUGS) {
  const p = products.find((x: any) => x.slug === s)!;
  for (const loc of LOCALES) {
    const a = oldMoqLine(p, loc), b = newMoqLine(p, loc);
    const flag = a === b ? '  同' : '★变';
    if (a !== b) changed++;
    console.log(`[${loc}] ${s}\n   before: ${a}\n   after : ${b}   ${flag}`);
  }
}
console.log(`\n>>> 4 SKU × 3 locale = 12 栏位, 实际变更 = ${changed}`);

console.log('\n=== PDP 价格卡「起訂量」行: 改前 -> 改后 ===');
let changed2 = 0;
for (const s of SLUGS) {
  const p = products.find((x: any) => x.slug === s)!;
  for (const loc of LOCALES) {
    const a = String(p.minQuantity), b = getDisplayMinOrder(loc, s, p.minQuantity);
    if (a !== b) changed2++;
    console.log(`[${loc}] ${s}: "${a}" -> "${b}"${a === b ? '  同' : '  ★变'}`);
  }
}
console.log(`\n>>> 12 栏位, 实际变更 = ${changed2}`);

console.log('\n=== 回归: 数码线名单之外的 SKU 在改动前后必须逐字相同 (全站 × 3 locale) ===');
let leak = 0, checked = 0, changedSku = new Set<string>();
for (const p of products as any[]) {
  for (const loc of LOCALES) {
    checked++;
    const a = oldMoqLine(p, loc), b = newMoqLine(p, loc);
    const pd = String(p.minQuantity) !== getDisplayMinOrder(loc, p.slug, p.minQuantity);
    if (a !== b || pd) {
      if (isDigitalLineBook(p.slug)) { changedSku.add(p.slug); continue; } // 预期内
      leak++;
      console.log(`  ❌ 名单外变更: ${p.slug} [${loc}]\n     card before: ${a}\n     card after : ${b}\n     pdp before: ${p.minQuantity}\n     pdp after : ${getDisplayMinOrder(loc, p.slug, p.minQuantity)}`);
    }
  }
}
console.log(`>>> 检查 ${checked} 栏位 (全站 ${(products as any[]).length} SKU × 3 locale)`);
console.log(`>>> 名单外变更 = ${leak} (必须 = 0)`);
console.log(`>>> 预期内变更 SKU = ${[...changedSku].join(', ')} (${changedSku.size} 个, 应 = 4)`);
console.log(`>>> 事实源 products.ts minQuantity 是否被本档触碰: 需另以 git diff 核对 (本档只读)`);
