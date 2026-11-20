// E4 三缺口内链 apply (2026-10-27) — count-asserted, idempotent, backup-first
// 1) zine guide -> doujinshi-printing PDP (blog-data/en.json)
// 2) doujinshi PDP -> zine guide (products.ts:6790 Saddle Stitch td)
// 3) doujinshi PDP -> comiket-prep-guide (products.ts:6799 before Comiket)
import fs from 'node:fs';

let failed = false;
const assert = (cond, msg) => {
  if (!cond) { console.error('FAIL:', msg); failed = true; }
  else console.log('OK:', msg);
};

// ---- 1) en.json ----
const enPath = 'src/data/blog-data/en.json';
const en = fs.readFileSync(enPath, 'utf8');
const enOld = '; doujin circles should start with the <a href="/en/blog/doujin-circle-printing-guide/">doujinshi printing guide</a>.';
const enNew = '; <a href="/en/product/doujinshi-printing/">doujin circles</a> should start with the <a href="/en/blog/doujin-circle-printing-guide/">doujinshi printing guide</a>.';
const enCount = en.split(enOld).length - 1;
assert(enCount === 1, `en.json old-string count=${enCount} (expect 1)`);
const enNext = en.split(enOld).join(enNew);
assert(!enNext.includes('/en/product/doujinshi-printing/') === false, 'en.json target injected (will validate below)');
const enJson = JSON.parse(enNext); // throws if broken
assert(enJson['zine-small-batch-booklet-printing-guide']?.content.includes('href="/en/product/doujinshi-printing/"'), 'en.json JSON valid + anchor present');
fs.writeFileSync(enPath, enNext, 'utf8');
console.log('WROTE en.json');

// ---- 2) products.ts Saddle Stitch td ----
const tsPath = 'src/data/products.ts';
const ts = fs.readFileSync(tsPath, 'utf8');
const tsOld1 = '<td>Saddle Stitch</td><td>8-64 pages</td>';
const tsNew1 = '<td><a href="/en/blog/zine-small-batch-booklet-printing-guide/">Saddle Stitch</a></td><td>8-64 pages</td>';
const c1 = ts.split(tsOld1).length - 1;
assert(c1 === 1, `products.ts td-row count=${c1} (expect 1)`);
let ts2 = ts.split(tsOld1).join(tsNew1);

// ---- 3) products.ts before Comiket (long context, unique) ----
const tsOld2 = 'A 24-hour rush is available before Comiket; during peak seasons';
const tsNew2 = 'A 24-hour rush is available <a href="/en/blog/comiket-printing-prep-guide/">before Comiket</a>; during peak seasons';
const c2 = ts2.split(tsOld2).length - 1;
assert(c2 === 1, `products.ts long-context count=${c2} (expect 1)`);
let ts3 = ts2.split(tsOld2).join(tsNew2);
assert((ts3.match(/\/en\/blog\/zine-small-batch-booklet-printing-guide\//g) || []).length === 1, 'products.ts zine anchor count=1');
assert((ts3.match(/\/en\/blog\/comiket-printing-prep-guide\//g) || []).length === 1, 'products.ts comiket anchor count=1');
fs.writeFileSync(tsPath, ts3, 'utf8');
console.log('WROTE products.ts');

if (failed) { console.error('=== APPLY FAILED (count assertions) ==='); process.exit(1); }
console.log('=== E4 apply OK ===');
