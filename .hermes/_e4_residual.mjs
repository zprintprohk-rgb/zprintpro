// E4 precise residual verification — is the ANCHOR INSTANCE itself a valid <a>, and do other occurrences have legitimate separate contexts?
import fs from 'node:fs';

const zine = fs.readFileSync('.hermes/_e4_zine.html', 'utf8');
const pdp = fs.readFileSync('.hermes/_e4_pdp.html', 'utf8');

function checkContext(body, anchorFull, phrase, label) {
  // 1) exact anchor present
  const anchorOk = body.includes(anchorFull);
  console.log(`[${label}] exact anchor ${anchorOk ? 'OK' : 'FAIL'}: ${anchorFull.slice(0, 70)}...`);
  // 2) count all occurrences of phrase
  let idx = 0, total = 0, inAnchor = 0;
  while ((idx = body.indexOf(phrase, idx)) >= 0) {
    total++;
    // is it inside an <a> that closes after it?
    const before = body.slice(Math.max(0, idx - 60), idx);
    const after = body.slice(idx + phrase.length, idx + phrase.length + 200);
    const opens = before.lastIndexOf('<a');
    const closesBefore = before.lastIndexOf('</a>');
    const closesAfter = after.indexOf('</a>');
    const isInAnchor = opens >= 0 && (closesBefore < opens) && (closesAfter >= 0);
    if (isInAnchor) inAnchor++;
    else {
      const ctx = body.slice(Math.max(0, idx - 70), idx + 90).replace(/\s+/g, ' ');
      console.log(`  [plain occurrence #${total}] ctx: ...${ctx}...`);
    }
    idx += phrase.length;
  }
  console.log(`[${label}] phrase total=${total} | inside-anchor=${inAnchor} | plain=${total - inAnchor}`);
  return { total, inAnchor, plain: total - inAnchor };
}

console.log('=== ZINE PAGE (E4-1) ===');
checkContext(zine, '<a href="/en/product/doujinshi-printing/">doujin circles</a>', 'doujin circles', 'E4-1 zine->PDP');

console.log('\n=== PDP PAGE (E4-2 + E4-3) ===');
checkContext(pdp, '<a href="/en/blog/zine-small-batch-booklet-printing-guide/">Saddle Stitch</a>', 'Saddle Stitch', 'E4-2 PDP->zine');
checkContext(pdp, '<a href="/en/blog/comiket-printing-prep-guide/">before Comiket</a>', 'before Comiket', 'E4-3 PDP->comiket');
