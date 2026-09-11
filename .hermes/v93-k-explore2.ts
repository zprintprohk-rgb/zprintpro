import { coreProductFAQMap, packagingBoxesFAQs } from '../src/data/product-faqs';

// 1) coreProductFAQMap 里是否有食品包装键
const keys = Object.keys(coreProductFAQMap as Record<string, unknown>);
console.log('coreProductFAQMap 键数:', keys.length);
console.log('食品相关:', keys.filter((k) => /food|食品/i.test(k)).join(', ') || '(无)');
console.log('前 12 键:', keys.slice(0, 12).join(', '));

// 2) packagingBoxesFAQs 里是否有「膠袋」相关
const pb = packagingBoxesFAQs as Record<string, Array<{ question?: Record<string, string>; answer?: Record<string, string> }>>;
console.log('\npackagingBoxesFAQs 键:', Object.keys(pb).slice(0, 6).join(', '));
for (const [loc, list] of Object.entries(pb)) {
  if (!Array.isArray(list)) continue;
  const hit = list.filter((f) => JSON.stringify(f).includes('膠袋') || JSON.stringify(f).includes('胶袋'));
  console.log(`  [${loc}] FAQ ${list.length} 条, 含「膠袋」${hit.length} 条`);
}
