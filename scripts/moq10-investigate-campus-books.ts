// moq10-investigate-campus-books.ts — 查校園教育 + 書刊品類的 minQuantity 與品類頁宣稱現況
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const src = fs.readFileSync(path.join(ROOT, 'src/data/products.ts'), 'utf-8');
const anchors = [...src.matchAll(/\n {4}slug: '([^']+)'/g)].map((m) => ({ slug: m[1], at: m.index }));

const TARGET_CATS = new Set(['educational', 'books']);
console.log('=== 校園教育 / 書刊 品類全部 SKU ===');
for (let i = 0; i < anchors.length; i++) {
  const end = i + 1 < anchors.length ? anchors[i + 1].at : src.length;
  const b = src.slice(anchors[i].at, end);
  const cat = (b.match(/category_slug:\s*'([^']+)'/) || [])[1];
  if (!cat || !TARGET_CATS.has(cat)) continue;
  const mq = (b.match(/minQuantity:\s*(\d+)/) || [])[1];
  const pr = (b.match(/price_range:\s*'([^']*)'/) || [])[1];
  const qs = b.match(/quantities:\s*\[([\s\S]*?)\]/);
  const q0 = qs ? (qs[1].match(/value:\s*(\d+)/) || [])[1] : 'NO-BLOCK';
  console.log(`  [${cat}] ${anchors[i].slug.padEnd(24)} minQ=${String(mq).padEnd(5)} qty0=${String(q0).padEnd(6)} ${pr}`);
}

console.log('\n=== 品類頁的 MOQ 宣稱 (category-seo-content.ts) ===');
const seo = fs.readFileSync(path.join(ROOT, 'src/data/category-seo-content.ts'), 'utf-8');
for (const key of ['educational', 'books', 'saddle']) {
  const re = new RegExp(`'${key}'\\s*:\\s*\\{`, 'g');
  let m: RegExpExecArray | null;
  let count = 0;
  while ((m = re.exec(seo)) && count < 2) {
    const seg = seo.slice(m.index, m.index + 2500);
    const hits = [...seg.matchAll(/(\d+)\s*(本|張|個)\s*起/g)].slice(0, 6);
    if (hits.length) {
      console.log(`  [${key}] ${hits.map((h) => h[0]).join(' | ')}`);
      count++;
    }
  }
}

console.log('\n=== 騎馬釘品類頁 / 校園品類頁 檔案 ===');
for (const p of ['src/app/[locale]/category/[slug]/page.tsx']) {
  const t = fs.readFileSync(path.join(ROOT, p), 'utf-8');
  for (const n of ['saddle', 'educational', '校園', '騎馬釘']) {
    const i = t.indexOf(n);
    if (i >= 0) console.log(`  ${p} 含「${n}」@${i}`);
  }
}
