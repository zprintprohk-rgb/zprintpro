const fs = require('fs');
const path = require('path');
const ROOT = 'F:/zprintpro-nextjs';
// parse price-data.generated.ts via JS evaluation
let priceRaw = fs.readFileSync(path.join(ROOT, 'src/lib/price-data.generated.ts'), 'utf8');
priceRaw = priceRaw.replace(/^import[^\n]*\n/gm, '');
const braceStart = priceRaw.indexOf('{');
let depth = 0, end = -1, inStr = false, esc = false, quote = '';
for (let i = braceStart; i < priceRaw.length; i++) {
  const c = priceRaw[i];
  if (inStr) { if (esc) { esc = false; continue; } if (c === '\\') { esc = true; continue; } if (c === quote) inStr = false; continue; }
  if (c === '"' || c === "'" || c === '`') { inStr = true; quote = c; continue; }
  if (c === '{') depth++;
  else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
}
const MAP = new Function('return ' + priceRaw.slice(braceStart, end + 1))();
// products.ts minQuantity + unit label
const prodSrc = fs.readFileSync(path.join(ROOT, 'src/data/products.ts'), 'utf8');
const anchors = [...prodSrc.matchAll(/\bslug:\s*'([a-z0-9-]+)'/g)].map((m) => ({ slug: m[1], idx: m.index }));
anchors.push({ slug: '__END__', idx: prodSrc.length });
const prod = {};
for (let i = 0; i < anchors.length - 1; i++) {
  const b = prodSrc.slice(anchors[i].idx, anchors[i + 1].idx);
  const minQ = (b.match(/\bminQuantity:\s*(\d+)/) || [])[1] || null;
  const unit = (b.match(/\bunitLabel:\s*'([^']+)'/) || [])[1] || null;
  prod[anchors[i].slug] = { minQ: minQ ? Number(minQ) : null, unit };
}
// helper: get tier qtys for a slug (default config)
function tierQtys(slug) {
  const m = MAP[slug];
  if (!m) return null;
  const ci = m.defaultConfigIndex ?? 0;
  const cfg = m.configs?.[ci];
  if (!cfg?.tiers) return null;
  return cfg.tiers.map((t) => t.qty);
}
function nextTier(slug) {
  const t = tierQtys(slug);
  if (!t) return null;
  const minQ = prod[slug]?.minQ;
  if (minQ === null || minQ === undefined) return null;
  return t.find((q) => q > minQ) ?? null;
}
console.log('=== key SKUs ===');
for (const s of ['a4-flyers', 'waterproof-stickers', 'wall-calendars', 'kraft-paper-bags', 'cosmetic-boxes', 'certificates', 'foil-stickers']) {
  const p = prod[s] || {};
  console.log(`${s}: minQ=${p.minQ} unit=${p.unit} | tiers=[${(tierQtys(s) || []).join(',')}] | nextTier=${nextTier(s)}`);
}
// coverage
const skuSlugs = Object.keys(prod).filter((s) => s !== 'flyers');
let withTable = 0, withNext = 0, noTier = [];
for (const s of skuSlugs) {
  const t = tierQtys(s);
  if (t) withTable++;
  if (nextTier(s) !== null) withNext++;
  else if (!t) noTier.push(s);
}
console.log(`\nSKU 数: ${skuSlugs.length} | 有价格表: ${withTable} | 有 nextTier: ${withNext} | 无价格表: ${noTier.length}`);
console.log('无价格表:', noTier.join(', '));
// unit label coverage
const unitCounts = {};
for (const s of skuSlugs) { const u = prod[s].unit || '(null)'; unitCounts[u] = (unitCounts[u] || 0) + 1; }
console.log('\nunitLabel 分布:', JSON.stringify(unitCounts));
