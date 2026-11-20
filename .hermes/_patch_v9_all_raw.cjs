// .hermes/_patch_v9_all_raw.cjs
const fs = require('fs');
const p = 'src/app/[locale]/category/[slug]/v9/CategoryPageV9.tsx';
let t = fs.readFileSync(p, 'utf8');
const targets = ['a.a', 'materialTable.subtitle', 'o.description', 'n.description', 's.desc', 'compare.note'];
let n = 0;
for (const v of targets) {
  const re = new RegExp('\\{' + v.replace('.', '\\.') + '\\}(</(?:p|span|div)>)', 'g');
  t = t.replace(re, '{parseInlineLinks(' + v + ')}$1');
  n += (t.match(new RegExp('parseInlineLinks\\(' + v.replace('.', '\\.') + '\\)', 'g')) || []).length;
}
console.log('wrapped refs:', n);
const raw2 = [...t.matchAll(/\{([a-zA-Z_.]+)\}<\/p>/g)].map(m => m[1]);
console.log('remaining raw <p>:', JSON.stringify([...new Set(raw2)]));
fs.writeFileSync(p, t, 'utf8');
