/* C3 调查: ja body 覆盖 + ja 文案源盘点 */
import { products } from '../src/data/products';
import { skuSeoData } from '../src/data/sku-seo-data';

const wc = (s: string) => (s || '').trim().split(/\s+/).filter(Boolean).length;
const thin: { slug: string; words: number }[] = [];
const noBody: string[] = [];
const banned: string[] = [];
const cnPrefix: string[] = [];
const noFaq: string[] = [];
let total = 0, min = 9999;
for (const p of products) {
  const b = skuSeoData?.[p.slug]?.seo?.ja?.body;
  const n = wc(b);
  if (!b) noBody.push(p.slug);
  else {
    total++; if (n < min) min = n;
    if (n < 180) thin.push({ slug: p.slug, words: n });
    const low = b.toLowerCase();
    if (/(business\s*card|name\s*card|\u540d\u7247|\u5495\u7247|\u540d\u523a)/.test(low)) banned.push(p.slug);
    // §13.10 ja: 深圳/中国/深セン 前缀词
    if (/\u6df1\u5733|\u4e2d\u56fd|\u6df1\u30bb\u30f3|shenzhen|china/.test(low)) cnPrefix.push(p.slug);
    if (!/\*\*Q1[\s:：]/.test(b)) noFaq.push(p.slug);
  }
}
console.log(JSON.stringify({
  total: products.length, withJa: total, noBody: noBody.length, noBodyList: noBody,
  thin: thin.length, thinList: thin.map((t) => `${t.slug}:${t.words}`),
  min, banned, cnPrefix, noFaqCount: noFaq.length
}, null, 1));

// ja 源盘点: products.ts ja 字段是否有 specs/materials/price_range
const jaSrc: string[] = [];
for (const p of products) {
  const hasSpec = !!(p as any).specs_ja || !!(p as any).specs?.ja;
  const hasDesc = !!(p as any).descriptionJa;
  const hasLong = !!(p as any).longDescriptionJa;
  if (!hasSpec && !hasDesc && !hasLong) jaSrc.push(p.slug);
}
console.log('ja 源字段缺失数 (specs/desc/longDesc 全无):', jaSrc.length, jaSrc.slice(0, 30).join(' '));
