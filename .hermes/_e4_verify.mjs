// E4 final verification — all three anchors
import fs from 'node:fs';

// 1) en.json zine guide -> doujinshi PDP
const d = JSON.parse(fs.readFileSync('src/data/blog-data/en.json', 'utf8'));
const zine = d['zine-small-batch-booklet-printing-guide'].content;
const a1 = zine.includes('<a href="/en/product/doujinshi-printing/">doujin circles</a>');
const ctx1 = zine.slice(zine.indexOf('catalogue printing guide</a>'), zine.indexOf('catalogue printing guide</a>') + 200);
console.log('[E4-1] zine->PDP anchor:', a1 ? 'OK' : 'FAIL');
console.log('  ctx:', ctx1);

// 2+3) products.ts
const ts = fs.readFileSync('src/data/products.ts', 'utf8');
const a2 = ts.includes('<a href="/en/blog/zine-small-batch-booklet-printing-guide/">Saddle Stitch</a>');
const a3 = ts.includes('<a href="/en/blog/comiket-printing-prep-guide/">before Comiket</a>');
console.log('[E4-2] PDP->zine anchor:', a2 ? 'OK' : 'FAIL');
console.log('[E4-3] PDP->comiket anchor:', a3 ? 'OK' : 'FAIL');

// uniqueness
const c2 = (ts.match(/\/en\/blog\/zine-small-batch-booklet-printing-guide\//g) || []).length;
const c3 = (ts.match(/\/en\/blog\/comiket-printing-prep-guide\//g) || []).length;
console.log('zine href count:', c2, '| comiket href count:', c3);

// diff summary
const ok = a1 && a2 && a3;
console.log(ok ? '=== E4 ALL OK ===' : '=== E4 FAIL ===');
process.exit(ok ? 0 : 1);
