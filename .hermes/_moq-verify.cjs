// 复验 MoqQaBlock 派生逻辑 (node 侧镜像; 与组件同源逻辑)
const fs = require('fs');
const priceRaw = fs.readFileSync('F:/zprintpro-nextjs/src/lib/price-data.generated.ts', 'utf8').replace(/^import[^\n]*\n/gm, '');
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
function nextTier(slug, minQ) {
  const t = MAP[slug];
  const cfg = t ? (t.configs?.[Math.max(0, t.defaultConfigIndex ?? 0)] ?? t.configs?.[0]) : undefined;
  return cfg?.tiers?.find((x) => x.qty > minQ)?.qty ?? null;
}
// paper-goods coverage (isPaperGoodsSmallBatch)
const PAPER = ['a4-flyers','a5-flyers','double-sided-flyers','folded-leaflets','thick-paper-flyers','eco-flyers','same-day-flyers','school-flyers','waterproof-stickers','transparent-stickers','removable-stickers','small-batch-stickers','die-cut-stickers','foil-stickers','security-stickers','fluorescent-stickers','premium-greeting-cards','thick-greeting-cards-400g','foil-greeting-cards','spot-uv-greeting-cards','matte-greeting-cards','rounded-corner-greeting-cards'];
const prodSrc = fs.readFileSync('F:/zprintpro-nextjs/src/data/products.ts', 'utf8');
const anchors = [...prodSrc.matchAll(/\bslug:\s*'([a-z0-9-]+)'/g)].map((m) => ({ slug: m[1], idx: m.index }));
anchors.push({ slug: '__END__', idx: prodSrc.length });
const minQ = {};
for (let i = 0; i < anchors.length - 1; i++) {
  const b = prodSrc.slice(anchors[i].idx, anchors[i + 1].idx);
  const m = (b.match(/\bminQuantity:\s*(\d+)/) || [])[1];
  minQ[anchors[i].slug] = m ? Number(m) : null;
}
console.log('=== 纸品线 MOQ 块派生 (zh-hk 文案节选) ===');
for (const s of PAPER) {
  const q = minQ[s];
  const nt = nextTier(s, q);
  const zh = nt !== null
    ? `最少可以印幾張？${q} 張起印。${q} 與 ${nt - 1} 張都接…${nt} 張以上單張明顯較平，量產檔位見上表。`
    : `最少可以印幾張？${q} 張起印。…量大單張愈平，量產檔位見報價。`;
  console.log(`${s}: minQ=${q} nextTier=${nt} | ${zh.slice(0, 60)}…`);
}
