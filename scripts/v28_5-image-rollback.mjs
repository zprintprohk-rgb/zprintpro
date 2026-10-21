#!/usr/bin/env node
/**
 * v28_5 image rollback — surgically restore IMAGE FIELDS ONLY (imagesByLocale + legacy images)
 * for given slugs from a reference commit, delete their deployed v28_5 dirs, regenerate sitemap.
 * Text fields (description/AEO/units/prices/FAQ/seoImages/imageAlt) are NEVER touched.
 *
 * Usage:
 *   node scripts/v28_5-image-rollback.mjs --slugs=a,b,c --from-commit=<sha> [--dry-run]
 *
 * Safety (§12): count assertions + shape assertions + backup; aborts before write on any mismatch.
 * Non-target slugs are byte-verified unchanged (IBL map deep-equal).
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const getArg = (k) => { const a = args.find(x => x === `--${k}` || x.startsWith(`--${k}=`)); return a ? (a.includes('=') ? a.split('=').slice(1).join('=') : true) : undefined; };
const slugs = String(getArg('slugs') || '').split(',').map(s => s.trim()).filter(Boolean);
const fromCommit = getArg('from-commit');
const dryRun = !!getArg('dry-run');
const PRODUCTS = 'src/data/products.ts';
const SITEMAP = 'public/sitemap-image.xml';
const DEST_ROOT = 'public/images/products/v28_5';
const fail = (m) => { console.error('ABORT: ' + m); process.exit(2); };
if (!slugs.length || !fromCommit) fail('usage: --slugs=a,b,c --from-commit=<sha> [--dry-run]');

const ts0 = fs.readFileSync(PRODUCTS, 'utf8');
if (ts0.charCodeAt(0) === 0xFEFF) fail('products.ts has BOM');
const oldTs = spawnSync('git', ['show', `${fromCommit}:${PRODUCTS}`], { encoding: 'utf8', shell: true, maxBuffer: 64e6 }).stdout || '';
if (!oldTs.includes('export const products')) fail(`cannot read ${fromCommit}:${PRODUCTS}`);

function scanBalanced(s, openIdx, openCh, closeCh) {
  let depth = 0, inStr = null;
  for (let i = openIdx; i < s.length; i++) {
    const c = s[i];
    if (inStr) { if (c === '\\') { i++; continue; } if (c === inStr) inStr = null; continue; }
    if (c === '\'' || c === '"' || c === '`') { inStr = c; continue; }
    if (c === openCh) depth++;
    else if (c === closeCh) { depth--; if (depth === 0) return i; }
  }
  return -1;
}
function blockOf(src, slug) {
  const start = src.indexOf(`slug: '${slug}'`);
  if (start < 0) return null;
  const re = /\bslug:\s*'[a-z0-9-]+'/g;
  re.lastIndex = start + 1;
  const m = re.exec(src);
  const endRaw = m ? m.index : src.length;
  const arrEnd = src.indexOf('\n];', start);
  return src.slice(start, arrEnd !== -1 && arrEnd < endRaw ? arrEnd : endRaw);
}
function iblSpan(block) {
  const m = block.match(/imagesByLocale:\s*\{/);
  if (!m) return null;
  const open = block.indexOf('{', m.index);
  const close = scanBalanced(block, open, '{', '}');
  return close < 0 ? null : { start: m.index, end: close + 1, text: block.slice(m.index, close + 1) };
}
function legacySpan(block) {
  const m = block.match(/(^|\n)(\s*)images:\s*\[/);
  if (!m) return null;
  const open = block.indexOf('[', m.index);
  const close = scanBalanced(block, open, '[', ']');
  return close < 0 ? null : { start: m.index, end: close + 1, text: block.slice(m.index, close + 1) };
}
function parseIbl(text) {
  const out = {};
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const m = text.match(new RegExp(`(?:['"]${loc}['"]|\\b${loc})\\s*:\\s*\\[([^\\]]*?)\\]`));
    out[loc] = m ? [...m[1].matchAll(/'([^']+)'/g)].map(x => x[1]) : [];
  }
  return out;
}
function iblMapOf(src) {
  const map = {};
  for (const m of src.matchAll(/\bslug:\s*'([a-z0-9-]+)'/g)) { const b = blockOf(src, m[1]); const s = b && iblSpan(b); if (s) map[m[1]] = parseIbl(s.text); }
  return map;
}

// --- build replacements ---
const beforeMap = iblMapOf(ts0);
let tsNew = ts0;
const plan = [];
for (const slug of slugs) {
  if (!beforeMap[slug]) fail(`${slug}: not found / no imagesByLocale in current products.ts`);
  const oldB = blockOf(oldTs, slug);
  if (!oldB) fail(`${slug}: not found in ${fromCommit}`);
  const oldI = iblSpan(oldB), oldL = legacySpan(oldB);
  if (!oldI) fail(`${slug}: no imagesByLocale in ${fromCommit}`);
  if (!oldL) fail(`${slug}: no legacy images in ${fromCommit}`);
  if (oldI.text.includes('/images/products/v28_5/')) fail(`${slug}: reference commit already contains v28_5 paths`);
  const curStart = tsNew.indexOf(`slug: '${slug}'`);
  if (curStart < 0) fail(`${slug}: vanished during rewrite`);
  const curB = blockOf(tsNew, slug);
  const curI = iblSpan(curB), curL = legacySpan(curB);
  if (!curI) fail(`${slug}: no imagesByLocale now`);
  const abs = curStart;
  const iStart = abs + curI.start, iEnd = abs + curI.end;
  let block2 = tsNew.slice(abs, abs + curB.length);
  block2 = block2.slice(0, curI.start) + oldI.text + block2.slice(curI.end);
  const l2 = legacySpan(block2);
  if (!l2) fail(`${slug}: no legacy images now`);
  block2 = block2.slice(0, l2.start) + oldL.text + block2.slice(l2.end);
  tsNew = tsNew.slice(0, abs) + block2 + tsNew.slice(abs + curB.length);
  plan.push({ slug, oldIbl: parseIbl(oldI.text), oldLegacy: oldL.text.length });
}

// --- assertions ---
if (plan.length !== slugs.length) fail(`planned=${plan.length} expected=${slugs.length}`);
const afterMap = iblMapOf(tsNew);
for (const p of plan) {
  const got = afterMap[p.slug];
  if (JSON.stringify(got) !== JSON.stringify(p.oldIbl)) fail(`${p.slug}: restored IBL != reference`);
  if (got['zh-hk'].some(u => u.includes('/v28_5/'))) fail(`${p.slug}: still v28_5 after restore`);
}
// only image spans may change: non-target blocks byte-identical; target blocks equal after swapping image spans back
const touched = new Set(slugs);
for (const [s, v] of Object.entries(beforeMap)) {
  if (touched.has(s)) continue;
  if (JSON.stringify(afterMap[s]) !== JSON.stringify(v)) fail(`non-target slug IBL changed: ${s}`);
  if (blockOf(ts0, s) !== blockOf(tsNew, s)) fail(`non-target slug block changed: ${s}`);
}
for (const p of plan) {
  const b0 = blockOf(ts0, p.slug), b1 = blockOf(tsNew, p.slug);
  const i0 = iblSpan(b0), l0 = legacySpan(b0);
  if (!i0 || !l0) fail(`${p.slug}: cannot re-extract spans`);
  // invariant: text outside the two image spans is byte-identical (other sessions' AEO/unit edits preserved)
  const strip = (b) => {
    const i = iblSpan(b), l = legacySpan(b);
    if (!i || !l) return b;
    const spans = [i, l].sort((a, c) => a.start - c.start);
    let out = '', prev = 0;
    for (const sp of spans) { out += b.slice(prev, sp.start); prev = sp.end; }
    return out + b.slice(prev);
  };
  if (strip(b1) !== strip(b0)) fail(`${p.slug}: non-image text drifted`);
}
console.log(`plan=${plan.length} slots; non-target blocks byte-identical; target blocks differ ONLY in image spans`);

if (dryRun) {
  for (const p of plan) console.log(`DRY ${p.slug}: IBL ${['zh-hk', 'en', 'ja'].map(l => l + '=' + p.oldIbl[l].length).join(' ')}`);
  console.log('DRY-RUN OK (no writes)');
  process.exit(0);
}

// --- backup + write ---
// NOTE: baseline MUST be taken BEFORE rewriting products.ts, otherwise baseline==after and the regression check is vacuous.
const gen0 = spawnSync('node', ['scripts/generate-image-sitemap.js'], { encoding: 'utf8', shell: true });
if (gen0.status !== 0) fail(`baseline sitemap gen exit=${gen0.status}`);
const baselineSet = new Set([...fs.readFileSync(SITEMAP, 'utf8').matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(x => x[1]));

const bakDir = `.hermes/_bak-v28_5-rollback-${new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14)}`;
fs.mkdirSync(bakDir, { recursive: true });
fs.writeFileSync(path.join(bakDir, 'products.ts.before'), ts0, 'utf8');
fs.writeFileSync(path.join(bakDir, 'rollback-plan.json'), JSON.stringify({ fromCommit, slugs, plan }, null, 1), 'utf8');
fs.writeFileSync(PRODUCTS, tsNew, 'utf8');
const chk = fs.readFileSync(PRODUCTS);
if (chk[0] === 0xFEFF) { fs.writeFileSync(PRODUCTS, ts0, 'utf8'); fail('BOM after write — reverted'); }
console.log(`products.ts rewritten; backup -> ${bakDir}`);

// --- delete deployed dirs ---
let removed = 0;
for (const s of slugs) {
  const d = path.join(DEST_ROOT, s);
  if (fs.existsSync(d)) {
    const n = fs.readdirSync(d).filter(f => f.toLowerCase().endsWith('.webp')).length;
    fs.rmSync(d, { recursive: true, force: true });
    removed += n;
    console.log(`removed ${d} (${n} webp)`);
  } else console.log(`skip ${d} (not deployed)`);
}
console.log(`removed ${removed} files`);

// --- sitemap: rollback regen, assert non-target zero regression, target old URLs present ---
const gen1 = spawnSync('node', ['scripts/generate-image-sitemap.js'], { encoding: 'utf8', shell: true });
if (gen1.status !== 0) fail(`sitemap gen exit=${gen1.status}`);
const xml = fs.readFileSync(SITEMAP, 'utf8');
const afterSet = new Set([...xml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(x => x[1]));
const lost = [...baselineSet].filter(u => !afterSet.has(u) && !slugs.some(s => u.includes(s)));
if (lost.length) fail(`sitemap non-target regression: ${lost.length} (e.g. ${lost.slice(0, 3).join(' | ')})`);
let missingOld = 0;
for (const p of plan) for (const l of ['zh-hk', 'en', 'ja']) for (const u of p.oldIbl[l]) if (!afterSet.has('https://zprintpro.com' + u)) missingOld++;
if (missingOld) fail(`sitemap missing ${missingOld} restored (old) image URLs`);
console.log(`sitemap OK: image:loc ${baselineSet.size} -> ${afterSet.size}; restored URLs all present; 0 non-target loss`);

console.log('\nDONE. Next: git add -A ' + DEST_ROOT + ' ' + PRODUCTS + ' ' + SITEMAP + '; commit; gate; push; probe.');
