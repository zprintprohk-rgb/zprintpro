// Rewrite sku-seo-data.ts en.title/description per 2026-07 US CTR task.
// Usage: node scripts/rewrite-sku-en-seo.cjs [--write]
const fs = require('fs');
const path = require('path');

const SKU_FILE = path.join(__dirname, '..', 'src', 'data', 'sku-seo-data.ts');
const PROD_FILE = path.join(__dirname, '..', 'src', 'data', 'products.ts');
const WRITE = process.argv.includes('--write');

// ---- load products.ts basePrice_en by slug ----
const prodSrc = fs.readFileSync(PROD_FILE, 'utf-8');
const priceBySlug = {};
const slugRe = /slug:\s*'([^']+)'/g;
const matches = [];
let m;
while ((m = slugRe.exec(prodSrc))) matches.push([m[1], m.index]);
for (let i = 0; i < matches.length; i++) {
  const [slug, idx] = matches[i];
  const end = i + 1 < matches.length ? matches[i + 1][1] : prodSrc.length;
  const window = prodSrc.slice(idx, end);
  const pm = window.match(/basePrice_en:\s*([\d.]+)/);
  if (pm && !(slug in priceBySlug)) priceBySlug[slug] = parseFloat(pm[1]);
}

// ---- load sku-seo-data.ts object ----
const skuSrc = fs.readFileSync(SKU_FILE, 'utf-8');
const marker = 'export const skuSeoData: Record<string, SkuSeoEntry> = ';
const start = skuSrc.indexOf(marker);
if (start < 0) throw new Error('marker not found');
const objStart = skuSrc.indexOf('{', start + marker.length);
const objEnd = skuSrc.lastIndexOf('};');
const objText = skuSrc.slice(objStart, objEnd + 1);
const data = eval('(' + objText + ')');

const BANNED = /名片|咭片|名刺|business[\s-]?card/i;
const HOOK_OK = /from \$|Free Shipping|Free Design|Free US Ship|No Minimum/;

const stats = { SKIP: [], OK: [], REWRITTEN: [] };
const replacements = []; // [oldJsonString, newJsonString] for textual patch

function fmtPrice(p) {
  return p % 1 === 0 ? String(p) : String(p).replace(/0+$/, '').replace(/\.$/, '');
}

const STOP = new Set(['for', 'and', '&', 'the', 'with', 'of', 'in', 'a']);
function cleanCore(c) {
  const w = c.split(/\s+/).filter(Boolean);
  while (w.length > 1 && STOP.has(w[w.length - 1].toLowerCase())) w.pop();
  return w.join(' ');
}
function buildTitle(core, price) {
  const hook = price != null ? `from $${fmtPrice(price)}` : 'Free Shipping $99+';
  const join = c => price != null ? `${c} ${hook} | ZprintPro` : `${c} | ${hook} | ZprintPro`;
  core = cleanCore(core);
  // candidate cores in priority order
  const candidates = [core];
  const forIdx = core.search(/\s+for\s+/i);
  if (forIdx > 0) candidates.push(cleanCore(core.slice(0, forIdx)));
  for (const c of [...candidates]) {
    if (/^custom\s+/i.test(c)) candidates.push(cleanCore(c.replace(/^custom\s+/i, '')));
  }
  for (const c of candidates) {
    const t = join(c);
    if (t.length <= 60) return t;
  }
  const words = candidates[candidates.length - 1].split(/\s+/);
  while (words.length > 1) {
    words.pop();
    const t = join(cleanCore(words.join(' ')));
    if (t.length <= 60) return t;
  }
  return join('Custom Printing').slice(0, 60);
}

for (const [slug, entry] of Object.entries(data)) {
  const nameStr = Object.values(entry.name || {}).join(' ');
  const kwStr = JSON.stringify(entry.seo?.en?.keywords || []) + JSON.stringify(entry.seo?.['zh-hk']?.keywords || []) + JSON.stringify(entry.seo?.ja?.keywords || []);
  if (slug.includes('business-card') || BANNED.test(nameStr) || BANNED.test(kwStr)) {
    stats.SKIP.push(slug);
    continue;
  }
  const en = entry.seo?.en;
  if (!en) { stats.SKIP.push(slug + ' (no-en)'); continue; }

  const oldTitle = en.title;
  let action = 'OK';
  let newTitle = oldTitle;

  if (!HOOK_OK.test(oldTitle)) {
    action = 'REWRITTEN';
    const core = oldTitle.replace(/\s*\|\s*ZprintPro\s*$/i, '').split('|')[0].trim();
    newTitle = buildTitle(core, priceBySlug[slug]);
    en.title = newTitle;
    replacements.push([JSON.stringify(oldTitle), JSON.stringify(newTitle)]);
  }

  // description
  let desc = en.description || '';
  const oldDesc = desc;
  if (/Hong Kong|香港/.test(desc)) {
    desc = desc.replace(/Hong Kong/g, 'the US').replace(/香港/g, 'the US');
    if (!/DHL|2-4 day/i.test(desc)) desc += ' DHL 2-4 day US delivery.';
    action = 'REWRITTEN';
  }
  if (!/Free/i.test(desc) && desc.length < 130) {
    const add = ' Free design, free US shipping $99+.';
    if (/\|\s*ZprintPro\s*$/.test(desc)) desc = desc.replace(/\s*\|\s*ZprintPro\s*$/, add + ' | ZprintPro');
    else desc += add;
    action = 'REWRITTEN';
  }
  if (desc !== oldDesc) {
    en.description = desc;
    replacements.push([JSON.stringify(oldDesc), JSON.stringify(desc)]);
  }

  if (action === 'OK') stats.OK.push(slug);
  else stats.REWRITTEN.push({ slug, oldTitle, newTitle, descChanged: desc !== oldDesc });
}

// ---- report ----
console.log('=== SKIP (禁区) ===');
stats.SKIP.forEach(s => console.log('  SKIP:', s));
console.log('\n=== OK (已合格) ===');
stats.OK.forEach(s => console.log('  OK:', s));
console.log('\n=== REWRITTEN ===');
stats.REWRITTEN.forEach(r => {
  console.log(`  REWRITTEN: ${r.slug}${r.descChanged ? ' (desc too)' : ''}`);
  console.log(`    old: ${r.oldTitle}`);
  console.log(`    new: ${r.newTitle}  [${r.newTitle.length} chars]`);
});
console.log(`\nTOTAL: skip=${stats.SKIP.length} ok=${stats.OK.length} rewritten=${stats.REWRITTEN.length}`);

// over-length check (only titles we actually rewrote)
const over = stats.REWRITTEN.filter(r => r.newTitle !== r.oldTitle && r.newTitle.length > 60);
if (over.length) console.log('!! OVER 60:', over.map(r => r.slug));

// banned residue check on changed entries
const residue = stats.REWRITTEN.filter(r => /Hong Kong|Shenzhen|香港|深圳/.test(r.newTitle) || /Hong Kong|Shenzhen|香港|深圳/.test(data[r.slug].seo.en.description));
if (residue.length) console.log('!! RESIDUE:', residue.map(r => r.slug));
else console.log('Residue check: clean (changed entries).');

if (WRITE) {
  // textual patch: replace each old JSON string literal with the new one, preserving file formatting
  let out = skuSrc;
  let applied = 0, failed = [];
  for (const [oldJ, newJ] of replacements) {
    if (oldJ === newJ) continue;
    const idx = out.indexOf(oldJ);
    if (idx < 0) { failed.push(oldJ.slice(0, 60)); continue; }
    out = out.slice(0, idx) + newJ + out.slice(idx + oldJ.length);
    applied++;
  }
  if (failed.length) {
    console.log('!! FAILED replacements:', failed.length, failed);
    process.exit(1);
  }
  fs.writeFileSync(SKU_FILE, out, 'utf-8');
  console.log(`\nWRITTEN: ${SKU_FILE} (${applied} textual replacements)`);
} else {
  console.log('\n(dry-run, no file written)');
}
