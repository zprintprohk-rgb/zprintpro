import fs from 'fs';

// 1) PLP H1 来源 (page.tsx 里 pageH1 的推导)
const page = fs.readFileSync('src/app/[locale]/category/[slug]/page.tsx', 'utf8').split('\n');
page.forEach((l, i) => {
  if (/pageH1|h1|customerTitle|bannerTitle/.test(l) && i < 420) {
    const t = l.trim();
    if (t.length > 2 && !t.startsWith('//')) console.log(`page.tsx:${i + 1}: ${t.slice(0, 130)}`);
  }
});

// 2) 食品包装 SKU (sku-seo-data 顶层键 + 食品类)
const sku = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const keyRe = /^  "([a-z0-9-]+)":\s*\{/gm;
const keys: string[] = [];
let m;
while ((m = keyRe.exec(sku))) keys.push(m[1]);
console.log('\nsku-seo-data 顶层键数:', keys.length);
console.log('含 food / 食品 的键:', keys.filter((k) => /food/i.test(k)).join(', ') || '(键名无 food)');
// 找含「食品包裝印刷訂製」的条目归属键
const idx = sku.indexOf('食品包裝印刷訂製');
const before = sku.slice(0, idx);
const lastKey = [...before.matchAll(/^  "([a-z0-9-]+)":\s*\{/gm)].pop();
console.log('「食品包裝印刷訂製」所属键:', lastKey ? lastKey[1] : '?');
console.log('上下文:', sku.slice(idx - 60, idx + 120).replace(/\s+/g, ' '));
