// .hermes/_patch_v9_p693.cjs
const fs = require('fs');
const p = 'src/app/[locale]/category/[slug]/v9/CategoryPageV9.tsx';
let t = fs.readFileSync(p, 'utf8');
const before = t;
t = t.replace(
  'leading-[1.9] text-justify">{p}</p>',
  'leading-[1.9] text-justify">{parseInlineLinks(p)}</p>'
);
// 排查其他裸渲染
const raw = [...t.matchAll(/\{([a-zA-Z_.]+)\}<\/p>/g)].map(m => m[1]);
console.log('changed:', t !== before);
console.log('other raw paragraph renders:', JSON.stringify([...new Set(raw)]));
fs.writeFileSync(p, t, 'utf8');
