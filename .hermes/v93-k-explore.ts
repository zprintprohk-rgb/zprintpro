import * as conv from '../src/data/category-seo-content';
import * as pf from '../src/data/product-faqs';

console.log('category-seo-content 导出:', Object.keys(conv).join(', '));
const csc = (conv as Record<string, unknown>)['categorySeoContent'] as Record<string, Record<string, unknown>>;
const pk = csc?.['packaging'];
console.log('\npackaging zh-hk 字段:', pk?.['zh-hk'] ? Object.keys(pk['zh-hk'] as object).join(', ') : 'NONE');
const e = pk?.['zh-hk'] as Record<string, unknown> | undefined;
if (e) {
  for (const k of Object.keys(e)) {
    const v = e[k];
    if (typeof v === 'string') console.log(`  ${k}: ${v.slice(0, 150)}`);
    else if (Array.isArray(v)) console.log(`  ${k}: [${v.length} 项] 首项=${JSON.stringify(v[0]).slice(0, 120)}`);
    else if (v && typeof v === 'object') console.log(`  ${k}: {${Object.keys(v as object).join(',')}}`);
  }
}

console.log('\nproduct-faqs 导出:', Object.keys(pf).join(', '));
