/* F3 验收: 63 ja body 注入后核验 (ja 词数/红线/唯一性/结构) */
import { products } from '../src/data/products';
import { skuSeoData } from '../src/data/sku-seo-data';

const jaWc = (s: string): number => {
  if (!s) return 0;
  const seg = new Intl.Segmenter('ja', { granularity: 'word' });
  return [...seg.segment(s.replace(/\*\*[^*]+\*\*/g, ''))].filter((x) => x.isWordLike).length;
};
const thin: { slug: string; words: number }[] = [];
const banned: string[] = [];
const cnPrefix: string[] = [];
const brandBad: string[] = [];
const noFaq: string[] = [];
const noSpec: string[] = [];
let total = 0, min = 9999;
for (const p of products) {
  const b = skuSeoData?.[p.slug]?.seo?.ja?.body;
  const n = jaWc(b);
  if (!b) { thin.push({ slug: p.slug, words: 0 }); continue; }
  total++; if (n < min) min = n;
  if (n < 180) thin.push({ slug: p.slug, words: n });
  const low = b.toLowerCase();
  if (/(business\s*card|name\s*card|\u540d\u7247|\u5495\u7247|\u540d\u523a)/.test(low)) banned.push(p.slug);
  if (/\u6df1\u5733|\u4e2d\u56fd|\u6df1\u30bb\u30f3|shenzhen|china/.test(low)) cnPrefix.push(p.slug);
  if (/\u30b8\u30fc\u30d7\u30ea\u30f3\u30c8|\u667a\u5370\u6e2f/.test(b)) brandBad.push(p.slug);
  if (!/\*\*Q1[\s:：]/.test(b)) noFaq.push(p.slug);
  if (!/原稿仕様/.test(b)) noSpec.push(p.slug);
}
console.log(`ja body ≥1: ${total}/99, <180: ${thin.length}`, thin.slice(0, 70));
console.log('min words:', min);
console.log('名片红线:', banned.length ? banned : '(clean)');
console.log('深圳/中国/深セン:', cnPrefix.length ? cnPrefix : '(clean)');
console.log('品牌混用(ジープリント/智印港):', brandBad.length ? brandBad : '(clean)');
console.log('缺 **Q1 FAQ:', noFaq.length ? noFaq : '(all have)');
console.log('缺 原稿仕様段:', noSpec.length ? noSpec : '(all have)');

// 跨 SKU 唯一性: 25 字符可见片段重复 (日文片段)
const frag = new Map<string, string[]>();
for (const p of products) {
  const b = skuSeoData?.[p.slug]?.seo?.ja?.body;
  if (!b) continue;
  const clean = b.replace(/\*\*[^*]+\*\*/g, '').replace(/\s+/g, '');
  for (let i = 0; i + 25 <= clean.length; i += 1) {
    const f = clean.slice(i, i + 25);
    const arr = frag.get(f) || [];
    arr.push(p.slug);
    frag.set(f, arr);
  }
}
const dups = [...frag.entries()].filter(([, v]) => new Set(v).size >= 2);
console.log('跨 SKU 25 字重复片段:', dups.length ? dups.slice(0, 10).map(([f, v]) => `${f} ← ${[...new Set(v)].join('/')}`) : '(clean)');
