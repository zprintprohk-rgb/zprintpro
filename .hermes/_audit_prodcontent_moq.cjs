// .hermes/_audit_prodcontent_moq.cjs — products-content 每 SKU longDescription 的 MOQ 声称 vs 真值
const fs = require('fs');
const t = fs.readFileSync('src/data/products-content.ts', 'utf8');
const prod = fs.readFileSync('src/data/products.ts', 'utf8');

const truth = {};
[...prod.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)].forEach((m, i, arr) => {
  const seg = prod.slice(m.index, arr[i + 1] ? arr[i + 1].index : prod.length);
  const mq = seg.match(/minQuantity: (\d+)/);
  if (mq) truth[m[1]] = +mq[1];
});

// products-content 结构: 按 slug 键切块 (形如 "  'slug': `...`" 或对象)
const blocks = [...t.matchAll(/^  '?([a-z0-9-]+)'?:\s*`/gm)].map(m => ({ slug: m[1], off: m.index }));
console.log('blocks:', blocks.length);
const claims = [];
for (let i = 0; i < blocks.length; i++) {
  const seg = t.slice(blocks[i].off, i + 1 < blocks.length ? blocks[i + 1].off : t.length);
  const mqs = [...seg.matchAll(/(\d{1,6})\s*(?:個|張|枚|本|冊)\s*起(?:印)?/g)].map(x => +x[1]);
  const min = mqs.length ? Math.min(...mqs.filter(n => n >= 10)) : null;
  const tr = truth[blocks[i].slug];
  if (tr && min !== null && min !== tr) claims.push({ slug: blocks[i].slug, min, truth: tr, all: [...new Set(mqs)].join('/') });
}
console.log('mismatch blocks:', claims.length);
claims.slice(0, 15).forEach(c => console.log(`  ${c.slug}: 最小声称 ${c.min} vs 真值 ${c.truth} [${c.all}]`));
