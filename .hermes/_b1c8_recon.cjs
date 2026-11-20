// .hermes/_b1c8_recon.cjs — 簇8 侦察: packaging faqSchema 共享模板清点 + outdoor 余1 + posters desc MOQ 病灶 + mailer 正文
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..');
const prodLines = fs.readFileSync(path.join(REPO, 'src/data/products.ts'), 'utf8').split(/\r?\n/);
const src = fs.readFileSync(path.join(REPO, 'src/data/sku-seo-data.ts'), 'utf8');
const csv = fs.readFileSync(path.join(REPO, 'zprintpro-sku-seo-data.csv'), 'utf8').split(/\r?\n/);

// 1) products.ts: 全部 SKU 块的 slug + faqSchema 第一问 (块边界 = next slug line / array end)
const slugIdx = [];
prodLines.forEach((ln, i) => { const m = ln.match(/^    slug: '([a-z0-9-]+)',$/); if (m) slugIdx.push([m[1], i]); });
const blocks = [];
for (let k = 0; k < slugIdx.length; k++) {
  const start = slugIdx[k][1];
  let end = prodLines.length;
  for (let i = start + 1; i < prodLines.length; i++) {
    if (prodLines[i].startsWith("    slug: '") || prodLines[i] === '  ],' || prodLines[i] === '  ]') { end = i; break; }
  }
  blocks.push({ slug: slugIdx[k][0], start, end });
}
const bySlug = {};
for (const b of blocks) {
  const seg = prodLines.slice(b.start, b.end);
  const faq = seg.find(l => l.startsWith('    faqSchema: '));
  bySlug[b.slug] = { faq: faq ? (faq.match(/"question": "([^"]{0,60})/) || [])[1] || '(unparsed)' : null, line: b.start + 1 };
}
// 统计 faqSchema 第一问分布
const qCount = {};
for (const [slug, v] of Object.entries(bySlug)) {
  if (!v.faq) continue;
  qCount[v.faq] = qCount[v.faq] || [];
  qCount[v.faq].push(slug);
}
console.log('===== faqSchema 第一问分布 (共享模板清点) =====');
for (const [q, slugs] of Object.entries(qCount).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`[${slugs.length}] ${q}`);
  console.log(`    ${slugs.join(', ')}`);
}
// 2) 无 faqSchema 的 SKU
const noFaq = Object.entries(bySlug).filter(([s, v]) => !v.faq).map(([s]) => s);
console.log('\n===== 无 faqSchema SKU =====');
console.log(noFaq.join(', ') || '(none)');
// 3) outdoor-posters 余1 + posters desc MOQ 病灶 (CSV)
console.log('\n===== CSV posters 族 desc 病灶 =====');
for (let i = 0; i < csv.length; i++) {
  const c = (csv[i] || '').split('\t');
  if (!c[3]) continue;
  if (/poster/.test(c[3])) {
    const dis = [];
    for (const [ci, pat] of [[12, '50-MOQ'], [12, '100 MOQ'], [12, '50 MOQ'], [11, '50 本'], [13, '50枚〜']]) {
      if (String(c[ci]).includes(pat)) dis.push(`col${ci}:${pat}`);
    }
    if (dis.length) console.log(`row ${i + 1} ${c[3]}: ${dis.join(' | ')}`);
  }
}
// 4) mailer SKU 正文状态
console.log('\n===== mailer 类 SKU =====');
for (let i = 0; i < csv.length; i++) {
  const c = (csv[i] || '').split('\t');
  if (c[3] && /mailer/.test(c[3])) console.log(`row ${i + 1} ${c[3]}`);
}
for (const m of src.matchAll(/"(kraft-mailer[a-z-]*|mailer-[a-z-]*)": \{(?:"[^"]*"|[^}])*?"body": "((?:[^"\\]|\\.){0,120})/g)) {
  console.log(`ts ${m[1]} body[:120]: ${m[2]}`);
}
// 5) CSV FAQ 列映射链: csv-to-sku-seo.mjs 是否消费 FAQ 列
console.log('\n===== regen 是否消费 CSV FAQ 列 =====');
const regen = fs.readFileSync(path.join(REPO, 'scripts/csv-to-sku-seo.mjs'), 'utf8');
for (const kw of ['FAQ', 'faq', 'faqs']) {
  const hits = regen.split('\n').map((l, i) => l.includes(kw) ? `L${i + 1}: ${l.trim().slice(0, 110)}` : null).filter(Boolean);
  if (hits.length) { console.log(`-- "${kw}" --`); hits.slice(0, 6).forEach(h => console.log('  ' + h)); break; }
}
// 6) outdoor-posters ts body 里的旧 desc 病灶复扫
const oi = src.indexOf('"outdoor-posters": {');
const oseg = src.slice(oi, src.indexOf('\n  },', oi));
console.log('\n===== outdoor-posters ts 病灶 =====');
for (const p of ['50 MOQ', '100 MOQ', '50 本', '7-10']) console.log(`  ${p}: ${oseg.includes(p) ? 'YES' : 'no'}`);
