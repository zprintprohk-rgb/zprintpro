// 导出目标槽位当前 title/desc 全文（精确替换用）
const fs = require('fs');
const src = fs.readFileSync('F:/zprintpro-nextjs/src/data/sku-seo-data.ts', 'utf8');

// 粗解析：按 "slug": { 块切分（sku-seo-data.ts 为 JSON5 风格对象，键带引号）
const targets = {
  'waterproof-stickers': ['zh-hk', 'ja'],
  'foil-stickers': ['zh-hk'],
  'die-cut-stickers': ['zh-hk'],
  'exercise-books': ['zh-hk', 'en'],
  'certificates': ['zh-hk'],
  'business-envelopes': ['zh-hk', 'en'],
  'adhesive-banners': ['zh-hk'],
  'pvc-menus': ['en', 'ja'],
  'textbooks': ['en', 'ja'],
  'a5-flyers': ['en'],
  'saddle-stitch-booklets': ['ja'],
  'eco-paper-bags': ['ja'],
  'double-sided-flyers': ['ja'],
  'catalog-printing': ['ja'],
  'doujinshi-printing': ['zh-hk'],
};

const out = {};
for (const [slug, locales] of Object.entries(targets)) {
  const i = src.indexOf(`"${slug}": {`);
  if (i < 0) { out[slug] = 'MISSING'; continue; }
  // 找该 slug 块的结束（下一个顶格 "xxx": { 或文件尾）
  const rest = src.slice(i);
  const nextM = rest.slice(10).match(/\n  "[a-z0-9-]+": \{/);
  const block = nextM ? rest.slice(0, nextM.index + 10) : rest.slice(0, 60000);
  out[slug] = {};
  for (const loc of locales) {
    const li = block.indexOf(`"${loc}": {`);
    if (li < 0) { out[slug][loc] = 'LOC-MISSING'; continue; }
    const lblock = block.slice(li, li + 20000);
    const dm = lblock.match(/"description": "((?:[^"\\]|\\.)*)"/);
    const tm = lblock.match(/"title": "((?:[^"\\]|\\.)*)"/);
    out[slug][loc] = {
      title: tm ? JSON.parse(`"${tm[1]}"`) : null,
      description: dm ? JSON.parse(`"${dm[1]}"`) : null,
    };
  }
}
fs.writeFileSync('F:/zprintpro-nextjs/.hermes/_desc-dump.json', JSON.stringify(out, null, 2), 'utf8');
console.log(JSON.stringify(out, null, 2));
