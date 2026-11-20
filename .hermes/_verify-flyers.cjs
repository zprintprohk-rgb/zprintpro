const fs = require('fs');
const ptxt = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf8');
const slugIdx = [...ptxt.matchAll(/(?:^|[^_\w])slug: '([a-z0-9-]+)',/g)];
const prod = {};
for (let i = 0; i < slugIdx.length; i++) {
  const slug = slugIdx[i][1];
  const start = slugIdx[i].index;
  const end = i + 1 < slugIdx.length ? slugIdx[i + 1].index : ptxt.length;
  const block = ptxt.slice(start, Math.min(end, start + 4000));
  const grab = (k) => { const m = block.match(new RegExp(`\\b${k}:\\s*'((?:[^'\\\\]|\\\\.)*)'`)); return m ? m[1] : undefined; };
  const grabNum = (k) => { const m = block.match(new RegExp(`\\b${k}:\\s*(\\d+(?:\\.\\d+)?)`)); return m ? Number(m[1]) : undefined; };
  prod[slug] = { name: grab('name'), nameEn: grab('nameEn'), nameJa: grab('nameJa'), minQ: grabNum('minQuantity'), bpe: grabNum('basePrice_en'), bpj: grabNum('basePrice_ja'), bp: grabNum('basePrice') };
}
for (const s of ['a4-flyers', 'a5-flyers', 'eco-flyers', 'graduation-yearbook', 'small-batch-stickers']) {
  console.log('===', s, JSON.stringify(prod[s]));
}
// GSC queries for these
const g = JSON.parse(fs.readFileSync('F:/zprintpro-nextjs/.hermes/gsc-2026-09-18/extract.json', 'utf8'));
const queries = g.new.combo_28d['查询数'];
const BRAND_RE = /智印港|ZprintPro|zprintpro|ジープリント/i;
for (const w of ['a5 flyer', 'a4 flyer', 'eco flyer', 'yearbook', 'holiday flyer', 'graduation']) {
  const hits = queries.filter((q) => q['热门查询'] && !BRAND_RE.test(q['热门查询']) && q['热门查询'].toLowerCase().includes(w)).sort((a, b) => (b['展示'] || 0) - (a['展示'] || 0));
  console.log('--- GSC', w, hits.length ? hits.slice(0, 6).map((h) => `${h['热门查询']} imp=${h['展示']} clk=${h['点击次数']} pos=${h['排名']}`).join(' | ') : '(none)');
}
