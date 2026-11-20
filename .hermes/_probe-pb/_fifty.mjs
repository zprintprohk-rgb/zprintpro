import fs from 'fs';
const T = 'F:/zprintpro-nextjs/.hermes/staging/self-publishing-content.zhhk-ja.json';
const E = 'F:/zprintpro-nextjs/.hermes/staging/self-publishing-content.json';
const loc = JSON.parse(fs.readFileSync(T, 'utf8'));
const en = JSON.parse(fs.readFileSync(E, 'utf8'));
const show = (label, s) => {
  for (const m of String(s).matchAll(/.{0,26}50.{0,26}/g)) console.log(' ', label, JSON.stringify(m[0]));
};
console.log('--- EN ---');
show('en.title', en.title.en); show('en.desc', en.description.en); show('en.excerpt', en.excerpt.en); show('en.content', en.content.en);
for (const l of ['zh-hk', 'ja']) {
  console.log('--- ' + l + ' ---');
  show('title', loc.title[l]); show('desc', loc.description[l]); show('excerpt', loc.excerpt[l]); show('content', loc.content[l]);
}
/* explicit: the disputed 50-copy saddle-stitch MOQ must not be quoted anywhere */
for (const l of ['zh-hk', 'ja']) {
  const c = loc.content[l];
  console.log(l, 'mentions 50 本/部 as an MOQ:', /50\s*(本|部)\s*(起|から|MOQ)|MOQ[^。]{0,10}50/.test(c));
}
