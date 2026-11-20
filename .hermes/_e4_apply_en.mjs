// E4 en.json anchor apply (round 2) — exact-match with escaped double quotes
import fs from 'node:fs';
const enPath = 'src/data/blog-data/en.json';
const en = fs.readFileSync(enPath, 'utf8');
const d = JSON.parse(en);
const content = d['zine-small-batch-booklet-printing-guide'].content;

// Build old/new from the raw JSON-escaped form to guarantee match
const enOld = '; doujin circles should start with the <a href="/en/blog/doujin-circle-printing-guide/">doujinshi printing guide</a>.';
const enNew = '; <a href="/en/product/doujinshi-printing/">doujin circles</a> should start with the <a href="/en/blog/doujin-circle-printing-guide/">doujinshi printing guide</a>.';

const count = content.split(enOld).length - 1;
console.log('count:', count);
if (count !== 1) { console.error('FAIL: count != 1'); process.exit(1); }

const newContent = content.split(enOld).join(enNew);
d['zine-small-batch-booklet-printing-guide'].content = newContent;
// Validate
const out = JSON.stringify(d, null, 2) + '\n';
const outParsed = JSON.parse(out);
if (!outParsed['zine-small-batch-booklet-printing-guide'].content.includes('href="/en/product/doujinshi-printing/"')) {
  console.error('FAIL: anchor missing after write'); process.exit(1);
}
fs.writeFileSync(enPath, out, 'utf8');
console.log('WROTE en.json OK');
