// .hermes/_regen_diff.cjs — 对比 preview 与现网 sku-seo-data.ts，列出变化 slug
const fs = require('fs');
const cur = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const pre = fs.readFileSync('.hermes/_regen-merge-preview.ts', 'utf8');
const keys = [...cur.matchAll(/^\s{2}"([a-z0-9-]+)": \{/gm)].map(m => m[1]);
const block = (t, k) => {
  const i = t.indexOf(`"${k}": {`);
  if (i < 0) return '';
  const j = t.indexOf('\n  "', i + 5);
  return t.slice(i, j > 0 ? j : t.length);
};
const diffs = [];
for (const k of keys) {
  const a = block(cur, k), b = block(pre, k);
  if (a !== b) {
    // 找出差异字段
    const fields = ['title', 'description', 'h1', 'keywords'];
    const hit = fields.filter(f => {
      const ra = new RegExp(`"${f}": ("(?:[^"\\\\]|\\\\.)*"|\\[[^\\]]*\\])`, 'g');
      const va = [...a.matchAll(ra)].map(m => m[1]).join('|');
      const vb = [...b.matchAll(ra)].map(m => m[1]).join('|');
      return va !== vb;
    });
    diffs.push({ slug: k, fields: hit.join(',') });
  }
}
console.log('changed blocks:', diffs.length);
diffs.forEach(d => console.log(`  ${d.slug} :: ${d.fields}`));
