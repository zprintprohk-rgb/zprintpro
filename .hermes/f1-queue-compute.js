#!/usr/bin/env node
/* F1 队列计算: zh-hk 左栏 (sku-seo body) < 300 字 → 补齐队列
   输出: .hermes/f1-zhhk-queue.json (slug, name, category, bodyLen, sources) */
const fs = require('fs');

const SEO_FILE = 'src/data/sku-seo-data.ts';
const PROD_FILE = 'src/data/products.ts';

function readBody(ts, slug) {
  // 定位 "slug": { ... } 顶层块, 再取 seo.zh-hk.body
  const re = new RegExp('"?' + slug + '"?\\s*:\\s*\\{', 'g');
  const m = re.exec(ts);
  if (!m) return null;
  let depth = 0, i = m.index + m[0].length - 1, start = m.index;
  for (; i < ts.length; i++) {
    if (ts[i] === '{') depth++;
    else if (ts[i] === '}') { depth--; if (depth === 0) break; }
  }
  const block = ts.slice(start, i + 1);
  const zh = block.match(/"zh-hk"\s*:\s*\{/);
  if (!zh) return null;
  const body = block.match(/"body"\s*:\s*"((?:[^"\\]|\\.)*)"/);
  const title = block.match(/"title"\s*:\s*"((?:[^"\\]|\\.)*)"/);
  return {
    body: body ? JSON.parse('"' + body[1] + '"') : '',
    title: title ? JSON.parse('"' + title[1] + '"') : '',
  };
}

function extractProducts(ts) {
  // products 数组里的对象: 提取 slug/name/category_slug/description/price_range/minQuantity/specs/materials
  const out = [];
  const re = /\{\s*slug:\s*'([a-z0-9-]+)'/g;
  let m;
  while ((m = re.exec(ts))) {
    const slug = m[1];
    const start = m.index;
    let depth = 0, i = start;
    for (; i < ts.length; i++) {
      if (ts[i] === '{') depth++;
      else if (ts[i] === '}') { depth--; if (depth === 0) break; }
    }
    const block = ts.slice(start, i + 1);
    const g = (k) => {
      const mm = block.match(new RegExp(k + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'"));
      return mm ? mm[1] : '';
    };
    out.push({
      slug,
      name: g('name'),
      category_slug: g('category_slug'),
      description: g('description'),
      price_range: g('price_range'),
      minQuantity: g('minQuantity'),
      specs: g('specs'),
      materials: g('materials'),
    });
  }
  return out;
}

const seoTs = fs.readFileSync(SEO_FILE, 'utf8');
const prodTs = fs.readFileSync(PROD_FILE, 'utf8');
const products = extractProducts(prodTs);

const queue = [];
const stats = { withEntry: 0, noEntry: 0, thin: 0, ok: 0 };
for (const p of products) {
  const seo = readBody(seoTs, p.slug);
  const body = seo ? seo.body : '';
  const len = body.replace(/\*\*[^*]+\*\*/g, '').replace(/\s/g, '').length; // CJK 字宽近似
  if (!seo) stats.noEntry++;
  else stats.withEntry++;
  if (len < 300) {
    stats.thin++;
    queue.push({
      slug: p.slug, name: p.name, category_slug: p.category_slug,
      bodyLen: len, hasEntry: !!seo,
      seoTitle: seo ? seo.title : '',
      price_range: p.price_range, minQuantity: p.minQuantity,
      description: p.description.slice(0, 120),
      specs: p.specs, materials: p.materials,
    });
  } else stats.ok++;
}
queue.sort((a, b) => a.bodyLen - b.bodyLen);
fs.writeFileSync('.hermes/f1-zhhk-queue.json', JSON.stringify({ stats, count: queue.length, queue }, null, 1), 'utf8');
console.log('products:', products.length);
console.log('stats:', JSON.stringify(stats));
console.log('队列:', queue.length, 'SKU');
const byCat = {};
for (const q of queue) byCat[q.category_slug] = (byCat[q.category_slug] || 0) + 1;
console.log('按品类:', JSON.stringify(byCat));
