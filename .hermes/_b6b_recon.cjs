// .hermes/_b6b_recon.cjs — 簇6b 三 SKU 现状侦察 (display/art/adhesive posters)
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..');
const ts = fs.readFileSync(path.join(REPO, 'src/data/sku-seo-data.ts'), 'utf8');
const tsLines = ts.split(/\r?\n/);
const prods = fs.readFileSync(path.join(REPO, 'src/data/products.ts'), 'utf8');
const csvLines = fs.readFileSync(path.join(REPO, 'zprintpro-sku-seo-data.csv'), 'utf8').split(/\r?\n/);

const SKUS = ['display-posters', 'art-posters', 'adhesive-posters'];

// 1) sku-seo-data.ts: find blocks containing slug
for (const slug of SKUS) {
  const idxs = [];
  tsLines.forEach((ln, i) => { if (ln.includes(`'${slug}'`) || ln.includes(`"${slug}"`)) idxs.push(i + 1); });
  console.log(`\n===== ${slug} ts slug-hits: ${idxs.join(',')}`);
}
// find block starts: lines with "  {" followed by slug within next 3 lines — simpler: find "seoEntries" array item boundaries by /slug: '/ at indent
const blockStarts = [];
tsLines.forEach((ln, i) => { const m = ln.match(/^  \{\s*$/); if (m) blockStarts.push(i); });
blockStarts.push(tsLines.length);
console.log('\nblock count:', blockStarts.length - 1);
for (const slug of SKUS) {
  for (let b = 0; b < blockStarts.length - 1; b++) {
    const seg = tsLines.slice(blockStarts[b], blockStarts[b + 1]).join('\n');
    if (seg.includes(`'${slug}'`)) {
      console.log(`\n----- ${slug} block lines ${blockStarts[b] + 1}-${blockStarts[b + 1]} (len ${blockStarts[b+1]-blockStarts[b]}) -----`);
      // print key fields truncated
      for (const ln of tsLines.slice(blockStarts[b], blockStarts[b + 1])) {
        const m = ln.match(/^\s{4}(title|titleZh|titleEn|titleJa|desc|descZh|descEn|descJa|h1|h1Zh|h1En|h1Ja|bodyZh|bodyEn|bodyJa|keywords|keywordsZh|keywordsEn|keywordsJa|imageAlt|imageAltZh|imageAltEn|imageAltJa|slug|name)\w*:/);
        if (m) console.log(ln.slice(0, 200));
      }
      break;
    }
  }
}

// 2) products.ts faqSchema for these SKUs: find slug block then faqSchema line presence + first question
for (const slug of SKUS) {
  const lines = prods.split(/\r?\n/);
  let start = -1;
  lines.forEach((ln, i) => { if (ln.includes(`slug: '${slug}'`)) start = i; });
  if (start < 0) { console.log(`\n${slug}: NOT FOUND in products.ts`); continue; }
  let end = start;
  let depth = 0, begun = false;
  for (let i = start; i < lines.length; i++) {
    for (const ch of lines[i]) { if (ch === '{') { depth++; begun = true; } if (ch === '}') depth--; }
    if (begun && depth <= 0) { end = i; break; }
  }
  const seg = lines.slice(start, end + 1).join('\n');
  const faqLine = lines.slice(start, end + 1).find(l => l.includes('faqSchema'));
  console.log(`\n===== ${slug} products.ts L${start + 1}-${end + 1}; faqSchema: ${faqLine ? 'YES L' + (lines.slice(start, end+1).indexOf(faqLine)+start+1) : 'NO'}`);
  if (faqLine) {
    const qs = [...faqLine.matchAll(/"question":\s*"([^"]{0,80})/g)].map(m => m[1]);
    console.log('  questions:', JSON.stringify(qs));
    const uniq = qs.join('|');
    // compare with other SKUs sharing same first question
    const sharers = [];
    let cursor = 0;
    while (true) {
      const q1 = qs[0] ? qs[0].slice(0, 40) : null;
      break;
    }
  }
  // key truth lines
  for (const ln of lines.slice(start, end + 1)) {
    if (/minQuantity|basePrice:|price_range|unitLabel|turnaround|name:|nameEn:|nameJa:/.test(ln)) console.log('  T:', ln.slice(0, 150));
  }
}

// 3) CSV rows 25/26/27 (1-based => index 24/25/26): count columns + dump col0..6 + locate desc/h1/alt columns by header
const header = csvLines[0].split('\t');
console.log('\n===== CSV header cols:', header.length);
console.log('header:', JSON.stringify(header));
for (const rn of [25, 26, 27]) {
  const cols = (csvLines[rn - 1] || '').split('\t');
  console.log(`\nrow ${rn} cols=${cols.length} slug=${cols[3]}`);
  header.forEach((h, i) => {
    if (/desc|h1|alt|keyword|title/i.test(h) && cols[i] !== undefined) {
      console.log(`  [${i}] ${h} = ${String(cols[i]).slice(0, 110)}`);
    }
  });
}
