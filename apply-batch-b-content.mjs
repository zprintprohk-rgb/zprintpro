// apply-batch-b-content.mjs
// Inject generated longDescriptionEn into products.ts.
// For each {sku, slug, content} in patches/batch-b1-content.json:
//   - find the entry block (match by id + sku_code)
//   - replace the existing longDescriptionEn: `...` with the new content
// Side effect: writes products.ts back in place (UTF-8, LF line endings).

import fs from 'node:fs';

const productsPath = 'src/data/products.ts';
const payloadPath = process.argv[2] || 'patches/batch-b1-content.json';
const dryRun = process.argv.includes('--dry-run');

const text = fs.readFileSync(productsPath, 'utf8');
const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));

// Normalize line endings to LF for SWC parser
let out = text.replace(/\r\n/g, '\n');

const stats = [];
for (const item of payload) {
  const { sku, slug, content } = item;
  // Find the entry block by sku_code
  const skuIdx = out.indexOf(`sku_code: '${sku}'`);
  if (skuIdx < 0) {
    stats.push({ sku, slug, status: 'NOT_FOUND' });
    continue;
  }
  // Find the start of the entry object containing this sku_code
  // Walk backwards to find the nearest "  {"
  let entryStart = -1;
  for (let i = skuIdx; i >= 0; i--) {
    if (out[i] === '{') {
      // Check if this is the entry-level "  {" (2-space indent + {)
      // Look at preceding chars
      const pre = out.substring(Math.max(0, i - 4), i);
      if (pre === '\n  ' || pre === '  ,' || pre.endsWith('\n  ') || pre.match(/^\n\s+,?$/)) {
        entryStart = i;
        break;
      }
    }
  }
  if (entryStart < 0) {
    // Fallback: find the "  {" line that precedes the sku_code within 200 chars
    const snippet = out.substring(Math.max(0, skuIdx - 300), skuIdx);
    const m = snippet.match(/\n  \{\n[^]*$/);
    if (m) entryStart = skuIdx - 300 + m.index + 2;
  }
  if (entryStart < 0) {
    stats.push({ sku, slug, status: 'ENTRY_NOT_FOUND' });
    continue;
  }

  // Find the end of this entry (matching closing "  }," or "  }")
  let entryEnd = -1;
  let depth = 0;
  for (let i = entryStart; i < out.length; i++) {
    if (out[i] === '{') depth++;
    else if (out[i] === '}') {
      depth--;
      if (depth === 0) {
        // Include trailing comma if present
        entryEnd = i + 1;
        if (out[entryEnd] === ',') entryEnd++;
        break;
      }
    }
  }
  if (entryEnd < 0) {
    stats.push({ sku, slug, status: 'END_NOT_FOUND' });
    continue;
  }

  const entryBlock = out.substring(entryStart, entryEnd);
  // Find the longDescriptionEn: `...` block within this entry
  // Pattern: longDescriptionEn: `...` (backtick string, can span multiple lines, no backtick inside)
  const ldPattern = /longDescriptionEn:\s*`/;
  const ldMatch = entryBlock.match(ldPattern);
  if (!ldMatch) {
    stats.push({ sku, slug, status: 'NO_LONG_DESC_EN' });
    continue;
  }

  const ldStart = entryStart + ldMatch.index;
  // Now scan from after the opening backtick to find the matching closing backtick
  let i = ldStart + ldMatch[0].length;
  let contentStart = i;
  let foundEnd = -1;
  while (i < entryEnd) {
    if (out[i] === '\\') { i += 2; continue; } // skip escaped chars
    if (out[i] === '`') { foundEnd = i; break; }
    i++;
  }
  if (foundEnd < 0) {
    stats.push({ sku, slug, status: 'UNCLOSED_BACKTICK' });
    continue;
  }

  const oldContentLen = foundEnd - contentStart;
  // Build the new content
  const newContent = content;
  // Replace
  out = out.substring(0, contentStart) + newContent + out.substring(foundEnd);
  stats.push({ sku, slug, status: 'OK', oldLen: oldContentLen, newLen: newContent.length });
}

if (dryRun) {
  console.log('=== DRY RUN ===');
  stats.forEach(s => console.log(`  ${s.sku.padEnd(10)} ${s.slug.padEnd(30)} ${s.status}${s.oldLen ? ' (' + s.oldLen + '→' + s.newLen + ')' : ''}`));
  console.log('No file written.');
} else {
  fs.writeFileSync(productsPath, out, 'utf8');
  console.log('=== APPLIED ===');
  stats.forEach(s => console.log(`  ${s.sku.padEnd(10)} ${s.slug.padEnd(30)} ${s.status}${s.oldLen ? ' (' + s.oldLen + '→' + s.newLen + ')' : ''}`));
  const ok = stats.filter(s => s.status === 'OK').length;
  const fail = stats.filter(s => s.status !== 'OK').length;
  console.log(`\n${ok} OK, ${fail} failed`);
}
