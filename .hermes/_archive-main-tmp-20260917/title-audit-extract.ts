/* SKU 标题提取器: products.ts title_* + sku-seo-data.ts seo title (生效值)
   用法: npx tsx .hermes/title-audit-extract.ts
   输出: .hermes/title-audit-titles.json */
import { products } from '../src/data/products';
import { skuSeoData } from '../src/data/sku-seo-data';
import * as fs from 'fs';

// 半角当量: 全角 CJK ×2, 半角 ×1 (v4 §1.1 口径)
function hw(title: string): number {
  let n = 0;
  for (const ch of title || '') {
    const c = ch.codePointAt(0)!;
    n += (c >= 0x2e80 && c <= 0x9fff) || (c >= 0xf900 && c <= 0xfaff) || (c >= 0x3000 && c <= 0x303f) ? 2 : 1;
  }
  return n;
}
// 全角 CJK 计数 (zh-hk/ja 口径 25-27)
const cjkCount = (s: string) => (s || '').replace(/[^\u4e00-\u9fff\u3400-\u4dbf\u3040-\u30ff\u3005\u3006\u30fc]/g, '').length;

const out: any[] = [];
for (const p of products) {
  const slug = p.slug;
  const seo = skuSeoData[slug];
  const t = (p as any);
  const row: any = { slug, category_slug: p.category_slug, name: t.name ?? '' };
  for (const loc of ['zh-hk', 'en', 'ja'] as const) {
    const prodTitle = (loc === 'zh-hk' ? t.title_zh : loc === 'en' ? t.title_en : t.title_ja) ?? '';
    const seoTitle = seo?.seo?.[loc]?.title ?? '';
    const effective = seoTitle || prodTitle;
    row[loc] = {
      product: prodTitle,
      seo: seoTitle,
      effective,
      hw: hw(effective),
      cjk: cjkCount(effective),
    };
  }
  out.push(row);
}
fs.writeFileSync('.hermes/title-audit-titles.json', JSON.stringify(out, null, 1), 'utf8');
// 汇总统计
const stats: any = { total: out.length };
for (const loc of ['zh-hk', 'en', 'ja'] as const) {
  const hws = out.map((r) => r[loc].hw);
  stats[loc] = {
    写满50_54: hws.filter((n) => n >= 50 && n <= 54).length,
    不足50: hws.filter((n) => n < 50).length,
    遗留55_60: hws.filter((n) => n > 54 && n <= 60).length,
    超限60: hws.filter((n) => n > 60).length,
    max: Math.max(...hws),
    min: Math.min(...hws),
  };
}
console.log(JSON.stringify(stats, null, 1));
console.log('--- zh-hk 不足50 清单 ---');
for (const r of out.filter((r) => r['zh-hk'].hw < 50)) console.log(`  ${r['zh-hk'].hw}\t${r.slug}\t${r['zh-hk'].effective.slice(0, 50)}`);
