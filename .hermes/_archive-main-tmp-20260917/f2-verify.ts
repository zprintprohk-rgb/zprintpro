/* F2 验收: 63 en body 注入后核验 (字数/红线/唯一性/结构) */
import { products } from '../src/data/products';
import { skuSeoData } from '../src/data/sku-seo-data';

const wc = (s: string) => (s || '').trim().split(/\s+/).filter(Boolean).length;
const thin: { slug: string; words: number }[] = [];
const banned: string[] = [];
const shenzhen: string[] = [];
const noFaq: string[] = [];
let total = 0, min = 9999;
for (const p of products) {
  const b = skuSeoData?.[p.slug]?.seo?.en?.body;
  const n = wc(b);
  if (n < 180) thin.push({ slug: p.slug, words: n });
  if (b) {
    total++; if (n < min) min = n;
    const low = b.toLowerCase();
    if (/(business\s*card|name\s*card|\u540d\u7247|\u5495\u7247|\u540d\u523a)/.test(low)) banned.push(p.slug);
    if (/\u6df1\u5733|shenzhen/.test(low)) shenzhen.push(p.slug);
    if (!/\*\*Q1[\s:：]/.test(b)) noFaq.push(p.slug);
  }
}
console.log(`en body ≥1: ${total}/99, <180: ${thin.length}`, thin);
console.log('名片红线:', banned.length ? banned : '(clean)');
console.log('深圳词:', shenzhen.length ? shenzhen : '(clean)');
console.log('缺 **Q1 起始 FAQ:', noFaq.length ? noFaq : '(all have)');
console.log('min words:', min);

// 跨 SKU 唯一性: 25 字符可见片段重复
const frag = new Map<string, string[]>();
for (const p of products) {
  const b = skuSeoData?.[p.slug]?.seo?.en?.body;
  if (!b) continue;
  const clean = b.replace(/\*\*[^*]+\*\*/g, '').replace(/\s+/g, ' ');
  for (let i = 0; i + 25 <= clean.length; i += 1) {
    const f = clean.slice(i, i + 25);
    if (/^[a-z ]+$/i.test(f) && f.trim().length >= 20) {
      const arr = frag.get(f) || [];
      arr.push(p.slug);
      frag.set(f, arr);
    }
  }
}
const dups = [...frag.entries()].filter(([, v]) => new Set(v).size >= 2);
console.log('跨 SKU 25 字重复片段:', dups.length ? dups.slice(0, 10).map(([f, v]) => `${f.slice(0, 25)} ← ${[...new Set(v)].join('/')}`) : '(clean)');
