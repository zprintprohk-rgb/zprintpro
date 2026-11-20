// snapshot extractor: parse sku-seo-data.ts blocks for the 3 SKUs into JSON
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(REPO, 'src/data/sku-seo-data.ts'), 'utf8');
const SLUGS = ['display-posters', 'art-posters', 'adhesive-posters'];
const out = {};
for (const slug of SLUGS) {
  const start = src.indexOf(`  "${slug}": {`);
  if (start < 0) throw new Error('block not found: ' + slug);
  // find matching close: next line that is exactly "  }," at same level
  const rest = src.slice(start);
  const endRel = rest.indexOf('\n  },');
  const block = rest.slice(0, endRel);
  // extract seo sub-objects with a tolerant parse: locate "seo": { ... } then per-locale fields
  const out2 = {};
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const locStart = block.indexOf(`"${loc}": {`);
    const locEnd = block.indexOf('\n      },', locStart);
    const seg = block.slice(locStart, locEnd);
    function grab(field) {
      const m = seg.match(new RegExp('"' + field + '": "((?:[^"\\\\]|\\\\.)*)"'));
      return m ? m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"') : '';
    }
    out2[loc] = { title: grab('title'), description: grab('description'), h1: grab('h1'), body: grab('body') };
  }
  out[slug] = { seo: out2 };
}
fs.writeFileSync(path.join(REPO, '.hermes', '_b1c6b_ts_snapshot.json'), JSON.stringify(out));
console.log('snapshot written');
