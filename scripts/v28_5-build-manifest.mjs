// v28_5 deploy manifest builder (D0 ① 存活白名单∩映射 + 分波) — SSoT: docs/2026-10-16-image-swap-risk-and-one-week-plan.md
// Reads: _ledger CSV + src/data/products.ts (products-region slug extraction) + .hermes/geo/v28_5-gsc-tiers.json
// Writes: .hermes/geo/v28_5-deploy-manifest.json
// Usage: node scripts/v28_5-build-manifest.mjs
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// ---------- 1. live slugs from products.ts (SSoT; only inside the products array region) ----------
const ts = fs.readFileSync('src/data/products.ts', 'utf8');
const prodStart = ts.indexOf('export const products: Product[] = [');
if (prodStart < 0) { console.error('FATAL: products array not found'); process.exit(2); }
const prodEnd = ts.indexOf('\n];', prodStart);
const prodRegion = ts.slice(prodStart, prodEnd);
const prodSlugs = new Set();
for (const m of prodRegion.matchAll(/\bslug:\s*'([a-z0-9-]+)'/g)) prodSlugs.add(m[1]);
// cross-check with sku_code pairing (each product should have both)
const skuPaired = new Set();
for (const m of prodRegion.matchAll(/sku_code:\s*'([A-Z]{2,4}-\d{3})'[\s\S]{0,400}?slug:\s*'([a-z0-9-]+)'/g)) skuPaired.add(m[2]);
for (const m of prodRegion.matchAll(/slug:\s*'([a-z0-9-]+)'[\s\S]{0,400}?sku_code:\s*'[A-Z]{2,4}-\d{3}'/g)) skuPaired.add(m[1]);
const liveSlugs = [...prodSlugs].sort();
const live = new Set(liveSlugs);
const pairingGap = liveSlugs.filter(s => !skuPaired.has(s));

// ---------- 2. ledger ----------
function splitLine(line, d) {
  const out = []; let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) { if (c === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else { if (c === '"') q = true; else if (c === d) { out.push(cur); cur = ''; } else cur += c; }
  }
  out.push(cur); return out;
}
let raw = fs.readFileSync('zprintpro-en-us-images/v28_5_webp/_ledger/B_sku_consolidation.csv', 'utf8');
if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
const lines = raw.split(/\r?\n/).filter(l => l.length);
const header = splitLine(lines[0], ',');
const ix = Object.fromEntries(header.map((h, i) => [h, i]));
const rows = lines.slice(1).map(l => splitLine(l, ','));
const dirs = {};
for (const r of rows) {
  const d = (r[ix['sku']] || '').trim(); if (!/^[A-Z]{2,4}-\d{3}$/.test(d)) continue;
  const o = (dirs[d] ||= { files: 0, mids: new Set(), locales: new Set(), views: new Set(), alts: new Set(), sources: new Set(), maxKB: 0 });
  o.files++;
  const f = (r[ix['file']] || '').trim();
  const m = f.match(/^zprintpro-(.+)-(en|ja|zh-hk)-(hero|detail|variety|multi-angle)\.webp$/);
  if (m) { o.mids.add(m[1]); o.locales.add(m[2]); o.views.add(m[3]); }
  o.alts.add((r[ix['alt_text']] || '').trim());
  o.sources.add((r[ix['source']] || '').trim());
  const kb = parseFloat(r[ix['kb']] || '0'); if (kb > o.maxKB) o.maxKB = kb;
}

// ---------- 3. dir -> slug ----------
const toks = s => s.split('-').slice().sort().join('+');
function matchSlug(mid) {
  if (live.has(mid)) return [mid, 'exact'];
  const cands = [];
  for (const s of live) {
    if (mid.endsWith('-' + s) || s.endsWith('-' + mid)) cands.push([s, 'suffix']);
    else if (toks(mid) === toks(s)) cands.push([s, 'tokens']);
  }
  const pref = { exact: 0, suffix: 1, tokens: 2 };
  cands.sort((a, b) => (pref[a[1]] - pref[b[1]]) || (b[0].length - a[0].length)); // longest match wins
  return cands.length ? cands : null;
}

// ---------- 4. clusters (SSoT: .hermes/logs/b1c-queue-progress.json + SESSION_LOCK + plan v2) ----------
const CLUSTERS = {
  'waterproof-stickers': { c: 'c1-stickers', done: '2026-10-12T09:05+08:00' },
  'transparent-stickers': { c: 'c1-stickers', done: '2026-10-12T09:05+08:00' },
  'foil-stickers': { c: 'c1-stickers', done: '2026-10-12T09:05+08:00' },
  'security-stickers': { c: 'c1-stickers', done: '2026-10-12T09:05+08:00' },
  'folded-leaflets': { c: 'c3-flyers-leaflet', done: '2026-10-14T12:25+08:00' },
  'kraft-paper-bags': { c: 'c5-bags+CTR-frozen', done: '2026-10-15T21:17+08:00' },
  'eco-paper-bags': { c: 'c5-bags+CTR-frozen', done: '2026-10-15T21:17+08:00' },
  'a1-posters': { c: 'c6a-a1a2', done: '2026-10-15T23:35+08:00' },
  'a2-posters': { c: 'c6a-a1a2', done: '2026-10-15T23:35+08:00' },
  'display-posters': { c: 'c6b-posters', done: '2026-10-16T03:40+08:00' },
  'art-posters': { c: 'c6b-posters', done: '2026-10-16T03:40+08:00' },
  'adhesive-posters': { c: 'c6b-posters', done: '2026-10-16T03:40+08:00' },
  'outdoor-posters': { c: 'c8-residual', done: '2026-10-16T12:10+08:00' },
  'foil-red-packets': { c: 'c2-red-packets', done: '2026-10-15T09:20+08:00' },
  'embossed-red-packets': { c: 'c2-red-packets', done: '2026-10-15T09:20+08:00' },
  'custom-red-packets': { c: 'c2-red-packets', done: '2026-10-15T09:20+08:00' },
  'cartoon-red-packets': { c: 'c2-red-packets', done: '2026-10-15T09:20+08:00' },
  'eco-red-packets': { c: 'c2-red-packets', done: '2026-10-15T09:20+08:00' },
  'large-red-packets': { c: 'c2-red-packets', done: '2026-10-15T09:20+08:00' }
};
const CTR_FROZEN = new Set(['kraft-paper-bags', 'white-card-bags', 'gift-bags', 'eco-paper-bags', 'handle-bags', 'large-bags', 'pvc-menus', 'laminated-menus', 'hardcover-menus', 'drink-menus', 'food-boxes', 'folding-boxes']);
const RETIRED_SLUGS = ['drink-tokens', 'cafe-table-cards', 'wedding-place-cards', 'save-the-date-cards', 'wedding-seating-charts', 'wedding-suite-bundle', 'eco-tote-bag', 'postcard-set', 'fluorescent-stickers'];
const CALENDARS = new Set(['wall-calendars', 'desk-calendars', 'custom-calendars', 'mini-calendars', 'photo-frame-calendars', 'magnetic-calendars']);

function addDays(iso, d) {
  const t = new Date(iso); t.setDate(t.getDate() + d);
  return t.toISOString().slice(0, 10);
}
function windowOf(doneIso) {
  return { done: doneIso.slice(0, 10), earliest_plus5: addDays(doneIso, 5), safe_plus7: addDays(doneIso, 7) };
}

// ---------- 5. GSC tiers (plan basis = 3 single-site sum) ----------
const gsc = JSON.parse(fs.readFileSync('.hermes/geo/v28_5-gsc-tiers.json', 'utf8'));
function gscOf(slug) {
  const g = gsc.per_slug[slug];
  if (!g) return { imps: 0, clicks: 0, zh: 0, en: 0, ja: 0, tier: 'zero', note: 'not in any 28d site file' };
  const imps = g.per_site_sum;
  const tier = imps === 0 ? 'zero' : imps < 5 ? 'tail' : imps <= 100 ? 'mid' : 'head';
  return { imps, clicks: g.clicks, zh: g.imps_zh, en: g.imps_en, ja: g.imps_ja, tier, note: '' };
}

// ---------- 6. current served paths per slug + library hash maps ----------
const LIB = 'zprintpro-en-us-images/v28_5_webp';
const byteHash = new Map(); // sha256 -> [dir/file...]
const baseMap = new Map(); // basename -> [dir...]
for (const d of Object.keys(dirs)) {
  const dp = path.join(LIB, d);
  for (const f of fs.readdirSync(dp)) {
    if (!f.toLowerCase().endsWith('.webp')) continue;
    const h = crypto.createHash('sha256').update(fs.readFileSync(path.join(dp, f))).digest('hex');
    (byteHash.get(h) || byteHash.set(h, []).get(h)).push(d + '/' + f);
    (baseMap.get(f) || baseMap.set(f, []).get(f)).push(d);
  }
}
// slug blocks in products.ts
const slugIdx = [...ts.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map(m => [m[1], m.index]);
function servedPathsOf(slug) {
  const i = slugIdx.findIndex(x => x[0] === slug);
  if (i < 0) return [];
  const start = slugIdx[i][1];
  const end = i + 1 < slugIdx.length ? slugIdx[i + 1][1] : ts.length;
  const block = ts.slice(start, end);
  return [...block.matchAll(/'(\/images\/[^']+?)'/g)].map(m => m[1]);
}

// ---------- 7. wave assignment ----------
const entries = [];
const dirCodes = Object.keys(dirs).sort();
for (const d of dirCodes) {
  const o = dirs[d];
  const mid = [...o.mids].sort().join('|');
  const m = matchSlug(mid);
  const slug = m ? m[0][0] : null;
  const e = { dir: d, filename_mid: mid, slug, match_kind: m ? m[0][1] : null, files: o.files, locales: [...o.locales].sort(), views: [...o.views].sort(), maxKB: o.maxKB, sources: [...o.sources].join('+'), flags: [] };
  if (!slug) {
    e.verdict = 'exclude-retired';
    e.wave = null;
    e.note = 'filename slug = ' + mid.replace(/^[a-z-]+-/, '') + ' → 已退役 (middleware 301 / Tier1 10-12)';
    entries.push(e); continue;
  }
  e.slug_live = true;
  e.gsc = gscOf(slug);
  const cl = CLUSTERS[slug];
  e.cluster = cl ? cl.c : null;
  e.cluster_done = cl ? cl.done : null;
  e.window = cl ? windowOf(cl.done) : null;
  // current served analysis
  const sp = servedPathsOf(slug);
  let baseHits = 0, byteHits = 0, checked = 0;
  for (const p of sp) {
    const base = p.split('/').pop();
    if (!baseMap.has(base)) continue;
    checked++;
    baseHits++;
    const fp = path.join('public', p);
    if (fs.existsSync(fp)) {
      const h = crypto.createHash('sha256').update(fs.readFileSync(fp)).digest('hex');
      if (byteHash.has(h)) byteHits++;
    }
  }
  e.current_served = { image_refs: sp.length, library_named: baseHits, byte_identical: byteHits };
  // verdict & wave
  if (d.startsWith('BC-')) { e.verdict = 'defer-bc-ruling'; e.wave = 'BC-1027'; e.flags.push('seoImages.filename en/ja stickers 残留 bug ×6 随本批修'); }
  else if (CALENDARS.has(slug)) { e.verdict = 'deploy'; e.wave = 'CL-1017-with-cluster7'; e.flags.push('图随文: 簇7 内容 10-16 05:0x 已上线'); }
  else if (slug === 'doujinshi-printing') { e.verdict = 'deploy'; e.wave = 'C107-1024-with-content'; e.flags.push('图随文原则: C107 专题 10/24-25 同批; 现役图为 /images/japan/ jpg 旧族, 收益大'); }
  else if (slug === 'foil-wedding-invitations' || slug === 'wedding-thank-you-cards') { e.verdict = 'recommend-exclude'; e.wave = null; e.flags.push('Batch B 10-12 已以同名 seedream-webp 入库上线 (byte_identical=' + byteHits + '/' + baseHits + '); 与 roll-stickers 同理, 新路径重部署增益≈0; 如 K3 要路径统一可在 W7 重估'); }
  else if (cl && cl.c === 'c1-stickers') { e.verdict = 'deploy'; e.wave = 'W3-1019'; }
  else if (cl && cl.c === 'c3-flyers-leaflet') { e.verdict = 'deploy'; e.wave = 'W4-1020'; }
  else if (cl && cl.c === 'c6a-a1a2') { e.verdict = 'deploy'; e.wave = 'W5-1021'; e.flags.push('窗口校准: 完成于 10-15 23:35, +5d = 10-20 23:35 → 10/20 全日执行会早于 5 天窗, 排 10/21 (方案 W4 原定 10/20, 依 §2.3 5-7 天窗规后移 1 天)'); }
  else if (cl && (cl.c === 'c6b-posters' || cl.c === 'c8-residual')) { e.verdict = 'deploy'; e.wave = 'W7-1023'; e.flags.push('完成于 10-16 (c6b 03:40 / c8 12:10), +7d → 10/23; 方案 W4 原定 10/20 会撞 3-4 天幼窗'); }
  else if (cl && cl.c === 'c2-red-packets') { e.verdict = 'deploy'; e.wave = 'W6-1022'; e.flags.push('10-13 已原位换血(EXIF 已重注对齐 products.ts), 本次为可选新路径升级'); }
  else if (CTR_FROZEN.has(slug)) { e.verdict = 'deploy-gated'; e.wave = 'W6-1022-CTR-gated'; e.flags.push('CTR 批关联族, 10/22 首判通过才解冻; c5 kraft/eco 簇窗 10/22 同步满足'); }
  else { e.verdict = 'deploy'; e.wave = (e.gsc.tier === 'zero' || e.gsc.tier === 'tail') ? 'W1-1017' : 'W2-1018'; }
  entries.push(e);
}

// ---------- 8. summary ----------
const byWave = {};
for (const e of entries) {
  if (!e.wave) continue;
  (byWave[e.wave] ||= []).push(e);
}
const manifest = {
  schema: 'v28_5-deploy-manifest/v1',
  built_at: new Date().toISOString(),
  data_sources: [
    'zprintpro-en-us-images/v28_5_webp/_ledger/B_sku_consolidation.csv (1092 rows)',
    'src/data/products.ts (live slugs regex, count=' + liveSlugs.length + ')',
    '.hermes/geo/v28_5-gsc-tiers.json (28d 10-15 三单站档, plan basis=per_site_sum)',
    '.hermes/logs/b1c-queue-progress.json (cluster dates) + SESSION_LOCK.md + docs/2026-10-16-two-week-execution-plan-v2.md',
    '.hermes/geo/v28_5-wiring.json (wiring facts)',
    'byte-hash compare: library vs public/ served files'
  ],
  live_slugs: liveSlugs,
  retired_slugs: RETIRED_SLUGS,
  deploy_path_rule: '/images/products/v28_5/<slug>/<zprintpro-<类目>-<产品>-<locale>-<view>.webp>',
  entries
};
fs.mkdirSync('.hermes/geo', { recursive: true });
fs.writeFileSync('.hermes/geo/v28_5-deploy-manifest.json', JSON.stringify(manifest, null, 1), 'utf8');

console.log('LIVE_SLUGS=' + liveSlugs.length + ' (products-region extraction; sku_code pairing gap: ' + JSON.stringify(pairingGap) + ')');
console.log('WAVES:');
for (const w of Object.keys(byWave).sort()) {
  const list = byWave[w];
  console.log('\n== ' + w + ' (' + list.length + ') ==');
  for (const e of list) console.log(`  ${e.dir} ${e.slug} [${e.gsc ? e.gsc.tier + ' ' + e.gsc.imps + 'imps zh' + e.gsc.zh + '/en' + e.gsc.en + '/ja' + e.gsc.ja : ''}] ${e.flags.length ? ' ⚑' + e.flags.join(' ⚑') : ''}`);
}
const exc = entries.filter(e => e.verdict === 'exclude-retired');
console.log('\nEXCLUDED_RETIREDS=' + exc.length + ': ' + exc.map(e => e.dir + '(' + (e.slug || e.filename_mid) + ')').join(', '));
